from __future__ import annotations

import json
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import requests
from bs4 import BeautifulSoup

CATALOG = Path('assets/js/legacy-catalog.js')
HEADERS = {'User-Agent': 'Mozilla/5.0 Far-Beyound website migration/2.0'}
GROUP_HEADERS = {'規格', '產品規格', '基本規格', '耗材規格', '條碼種類', '操作環境', '認證', '選購配件規格'}
STOP_MARKERS = {'回列表', '萬里資訊股份有限公司', 'Far-beyound informational Co.'}
NOISE = {'產品介紹', '產品規格', '型錄下載', '使用手冊下載', '快速參考指南'}


def norm(value: str) -> str:
    return re.sub(r'\s+', ' ', value or '').strip()


def load_catalog() -> dict:
    raw = CATALOG.read_text(encoding='utf-8')
    match = re.search(r'window\.FBLegacyCatalog\s*=\s*(\{.*\})\s*;?\s*$', raw, re.S)
    if not match:
        raise RuntimeError('Could not parse legacy-catalog.js')
    return json.loads(match.group(1))


def extract_specs(url: str) -> list[list[str]]:
    response = requests.get(url, headers=HEADERS, timeout=22)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    lines = [norm(x) for x in soup.get_text('\n').splitlines]
    lines = [x for x in lines if x]

    start = -1
    for marker in ('規格', '產品規格'):
        try:
            idx = lines.index(marker)
        except ValueError:
            continue
        if idx > start:
            start = idx
    if start < 0:
        return []

    section = []
    for line in lines[start + 1:start + 140]:
        if line in STOP_MARKERS:
            break
        if line in NOISE or line.startswith('Copyright ©'):
            continue
        section.append(line)

    specs: list[list[str]] = []
    seen = set()
    i = 0
    while i < len(section):
        key = section[i]
        if key in GROUP_HEADERS:
            i += 1
            continue
        if i + 1 >= len(section):
            break
        value = section[i + 1]
        if value in GROUP_HEADERS:
            i += 1
            continue
        if re.fullmatch(r'\d{1,2}', value) and i + 2 < len(section):
            value = section[i + 2]
            i += 1
        if len(key) > 70 or not value or len(value) > 1800:
            i += 1
            continue
        sig = (key, value)
        if sig not in seen:
            seen.add(sig)
            specs.append([key, value])
        i += 2
    return specs[:70]


def main() -> None:
    catalog = load_catalog()
    products = catalog.get('products') or []
    results: dict[str, list[list[str]]] = {}

    def fetch(product: dict):
        url = str(product.get('legacyUrl') or '')
        if not url:
            return url, []
        try:
            return url, extract_specs(url)
        except Exception as exc:
            print('WARN', url, type(exc).__name__, str(exc)[:120])
            return url, []

    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = [pool.submit(fetch, product) for product in products]
        for future in as_completed(futures):
            url, specs = future.result()
            if url and specs:
                results[url] = specs

    enriched = 0
    rows = 0
    for product in products:
        specs = results.get(str(product.get('legacyUrl') or ''))
        if specs:
            product['specs'] = specs
            enriched += 1
            rows += len(specs)

    if enriched < 60:
        raise RuntimeError(f'Only {enriched} product pages yielded specification rows; refusing incomplete enrichment')

    text = '// Generated from the current official Far-beyound website. Do not hand-edit.\nwindow.FBLegacyCatalog = ' + json.dumps(catalog, ensure_ascii=False, indent=2) + ';\n'
    CATALOG.write_text(text, encoding='utf-8')
    print(f'OFFICIAL_SPEC_PRODUCTS={enriched}')
    print(f'OFFICIAL_SPEC_ROWS={rows}')


if __name__ == '__main__':
    main()
