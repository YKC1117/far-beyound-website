from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path

import requests
from bs4 import BeautifulSoup

BASE = 'https://www.far-beyound.com.tw'
OUT = Path('assets/js/legacy-solutions.js')
HEADERS = {'User-Agent': 'Mozilla/5.0 Far-Beyound website migration/2.0'}
SEEDS = [
    ('sfis', 'SFIS生產管控系統', '/system/2/5'),
    ('wms', 'WMS電子倉庫系統', '/system/3/6'),
    ('smt', 'SMT防錯料系統', '/system/4/7'),
]


def norm(value: str) -> str:
    return re.sub(r'\s+', ' ', value or '').strip()


def extract(item_id: str, title: str, path: str) -> dict:
    url = BASE + path
    response = requests.get(url, headers=HEADERS, timeout=25)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')
    lines = [norm(x) for x in soup.get_text('\n').splitlines()]
    lines = [x for x in lines if x]
    end = next((i for i, line in enumerate(lines) if line == '回列表'), len(lines))
    starts = [i for i, line in enumerate(lines[:end]) if line == title]
    if not starts:
        raise RuntimeError(f'Could not locate solution title: {title}')
    start = starts[-1]
    content = []
    for line in lines[start + 1:end]:
        if line in {'系統方案', '免費諮詢'} or line == title:
            continue
        if line.startswith('台北 02-') or line.startswith('台南 06-'):
            continue
        content.append(line)
    dedup = []
    for line in content:
        if dedup and dedup[-1] == line:
            continue
        dedup.append(line)
    if len(''.join(dedup)) < 250:
        raise RuntimeError(f'Imported solution content too short: {title}')
    return {'id': item_id, 'title': title, 'path': path, 'lines': dedup}


def main() -> None:
    items = [extract(*seed) for seed in SEEDS]
    payload = {
        'generatedAt': datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
        'source': BASE,
        'items': items,
    }
    OUT.write_text('// Generated from the current official Far-beyound website. Do not hand-edit.\nwindow.FBLegacySolutions = ' + json.dumps(payload, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
    print('OFFICIAL_SOLUTION_COUNT=', len(items))
    print('OFFICIAL_SOLUTION_LINES=', sum(len(x['lines']) for x in items))


if __name__ == '__main__':
    main()
