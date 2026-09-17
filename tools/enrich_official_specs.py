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


def page_lines(url: str) -> list[str]:
    response = requests.get(url, headers=HEADERS, timeout=22)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    return [line for line in (norm(x) for x in soup.get_text('\n').splitlines()) if line]


def find_spec_start(lines: list[str], after: int = 0) -> int:
    for i in range(after, len(lines)):
        if lines[i] == '規格':
            return i
    for i in range(after, len(lines)):
        if lines[i] == '產品規格':
            return i
    return -1


def extract_intro(lines: list[str]) -> tuple[list[str], list[str]]:
    intro_positions = [i for i, line in enumerate(lines) if line == '產品介紹']
    if not intro_positions:
        return [], []
    start = intro_positions[-1] + 1
    end = find_spec_start(lines, start)
    if end < 0:
        end = min(len(lines), start + 80)
    description, highlights = [], []
    for line in lines[start:end]:
        if line in NOISE or line in STOP_MARKERS or line.startswith('Copyright ©'):
            continue
        if line.startswith(('•', '●')):
            text = norm(re.sub(r'^[•●]\s*', '', line))
            if text:
                highlights.append(text)
        elif 3 <= len(line) <= 1200:
            description.append(line)
    dedup_desc = []
    for line in description:
        if line not in dedup_desc[-4:]:
            dedup_desc.append(line)
    dedup_high = list(dict.fromkeys(highlights))
    return dedup_desc[:30], dedup_high[:20]


def extract_specs(lines: list[str]) -> list[list[str]]:
    start = find_spec_start(lines)
    if start < 0:
        return []
    section = []
    for line in lines[start + 1:start + 180]:
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
    results = {}

    def fetch(product: dict):
        url = str(product.get('legacyUrl') or '')
        if not url:
            return url, {'specs': [], 'description': [], 'highlights': []}
        try:
            lines = page_lines(url)
            description, highlights = extract_intro(lines)
            return url, {'specs': extract_specs(lines), 'description': description, 'highlights': highlights}
        except Exception as exc:
            print('WARN', url, type(exc).__name__, str(exc)[:120])
            return url, {'specs': [], 'description': [], 'highlights': []}

    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = [pool.submit(fetch, product) for product in products]
        for future in as_completed(futures):
            url, result = future.result()
            if url:
                results[url] = result

    spec_products = spec_rows = intro_products = 0
    for product in products:
        result = results.get(str(product.get('legacyUrl') or ''), {})
        specs = result.get('specs') or []
        description = result.get('description') or []
        highlights = result.get('highlights') or []
        if specs:
            product['specs'] = specs
            spec_products += 1
            spec_rows += len(specs)
        if description:
            product['description'] = description
            product['intro'] = ' '.join(description[:3])[:900]
            intro_products += 1
        if highlights:
            product['highlights'] = highlights

    if spec_products < 60:
        raise RuntimeError(f'Only {spec_products} product pages yielded specification rows; refusing incomplete enrichment')
    if intro_products < 60:
        raise RuntimeError(f'Only {intro_products} product pages yielded official introductions; refusing incomplete enrichment')

    text = '// Generated from the current official Far-beyound website. Do not hand-edit.\nwindow.FBLegacyCatalog = ' + json.dumps(catalog, ensure_ascii=False, indent=2) + ';\n'
    CATALOG.write_text(text, encoding='utf-8')
    print(f'OFFICIAL_SPEC_PRODUCTS={spec_products}')
    print(f'OFFICIAL_SPEC_ROWS={spec_rows}')
    print(f'OFFICIAL_INTRO_PRODUCTS={intro_products}')


if __name__ == '__main__':
    main()
