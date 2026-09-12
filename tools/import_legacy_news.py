from __future__ import annotations

import json
import re
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

BASE = 'https://www.far-beyound.com.tw'
NEWS_URL = BASE + '/news'
OUT = Path('assets/js/legacy-news.js')
UA = 'FarBeyoundMigrationAudit/1.0 (+https://www.far-beyound.com.tw/)'
CATEGORY_NAMES = {'1': '產品消息', '2': '系統消息', '3': '公司公告'}

KNOWN_SLUGS = [
    (re.compile(r'2026.*員工旅遊'), 'travel-2026'),
    (re.compile(r'原物料價格調整'), 'material-price'),
    (re.compile(r'共用印表機.*0x0000011b.*0x00000709', re.I), 'printer-share-error'),
    (re.compile(r'zt411.*zt421|zt421.*zt411', re.I), 'zt411-news'),
    (re.compile(r'zt610.*zt620|zt620.*zt610', re.I), 'zt610-news'),
]

DROP_LINE_PATTERNS = [
    re.compile(r'^(首頁|產品資訊|系統方案|成功案例|下載服務|最新消息|關於萬里|聯絡我們)$'),
    re.compile(r'^(上一頁|下一頁|返回|TOP|MENU|Copyright)', re.I),
    re.compile(r'萬里資訊股份有限公司.*版權', re.I),
    re.compile(r'^(台北|台南|新北|深圳|昆山).*(電話|TEL|FAX|地址)', re.I),
]


def clean_text(value: str) -> str:
    value = value.replace('\xa0', ' ').replace('\u3000', ' ')
    value = re.sub(r'[ \t\r\f\v]+', ' ', value)
    return value.strip()


def stable_id(category: str, old_id: str, title: str) -> str:
    for pattern, slug in KNOWN_SLUGS:
        if pattern.search(title):
            return slug
    return f'legacy-news-{category}-{old_id}'


def get(session: requests.Session, url: str) -> BeautifulSoup:
    response = session.get(url, timeout=25)
    response.raise_for_status()
    response.encoding = response.apparent_encoding or response.encoding or 'utf-8'
    return BeautifulSoup(response.text, 'html.parser')


def discover_articles(session: requests.Session) -> dict[str, dict]:
    found: dict[str, dict] = {}
    empty_pages = 0
    for page in range(1, 21):
        url = NEWS_URL if page == 1 else f'{NEWS_URL}?page={page}'
        soup = get(session, url)
        page_new = 0
        for a in soup.find_all('a', href=True):
            href = urljoin(BASE, a['href'])
            parsed = urlparse(href)
            match = re.fullmatch(r'/news/(\d+)/(\d+)/?', parsed.path)
            if not match:
                continue
            category, old_id = match.groups()
            canonical = f'{BASE}/news/{category}/{old_id}'
            if canonical in found:
                continue
            text = clean_text(a.get_text(' ', strip=True))
            found[canonical] = {
                'category': category,
                'oldId': old_id,
                'listTitle': text,
            }
            page_new += 1
        if page_new == 0:
            empty_pages += 1
        else:
            empty_pages = 0
        if page >= 3 and empty_pages >= 2:
            break
    return found


def choose_title(soup: BeautifulSoup, list_title: str) -> str:
    og = soup.find('meta', attrs={'property': 'og:title'})
    candidates = []
    if og and og.get('content'):
        candidates.append(clean_text(og['content']))
    candidates.extend(clean_text(x.get_text(' ', strip=True)) for x in soup.find_all(['h1', 'h2']))
    if list_title:
        candidates.append(clean_text(list_title))
    if soup.title:
        candidates.append(clean_text(soup.title.get_text(' ', strip=True)))
    for text in candidates:
        text = re.sub(r'\s*[｜|]\s*萬里資訊.*$', '', text).strip()
        if len(text) >= 4 and text not in {'最新消息', '萬里資訊'}:
            return text[:300]
    return clean_text(list_title)[:300]


def find_date(soup: BeautifulSoup) -> str:
    text = soup.get_text(' ', strip=True)
    match = re.search(r'(20\d{2})[./\-年]\s*(\d{1,2})[./\-月]\s*(\d{1,2})', text)
    if not match:
        return ''
    y, m, d = map(int, match.groups())
    return f'{y:04d}-{m:02d}-{d:02d}'


def likely_article_container(soup: BeautifulSoup, title: str):
    selectors = [
        'article', '.news-detail', '.news_detail', '.news-content', '.news_content',
        '.article-content', '.article_content', '.editor', '.detail-content', '.detail_content',
        'main'
    ]
    candidates = []
    for selector in selectors:
        candidates.extend(soup.select(selector))
    title_node = None
    for node in soup.find_all(['h1', 'h2', 'h3', 'div', 'span']):
        if title and title in clean_text(node.get_text(' ', strip=True)):
            title_node = node
            break
    if title_node:
        parent = title_node
        for _ in range(5):
            parent = parent.parent
            if not parent:
                break
            candidates.append(parent)
    best = None
    best_score = -10**9
    for node in candidates:
        text = clean_text(node.get_text('\n', strip=True))
        if len(text) < 60:
            continue
        score = min(len(text), 12000)
        if title and title in text:
            score += 1500
        for bad in ('產品資訊', '系統方案', '下載服務', '聯絡我們', '網站導覽'):
            score -= text.count(bad) * 120
        if len(text) > 18000:
            score -= 4000
        if score > best_score:
            best_score = score
            best = node
    return best or soup.body or soup


def body_lines(container, title: str, date: str) -> list[str]:
    for bad in container.select('script,style,noscript,nav,header,footer,aside,form,button'):
        bad.decompose()
    blocks = []
    for node in container.find_all(['p', 'li', 'h2', 'h3']):
        text = clean_text(node.get_text(' ', strip=True))
        if text:
            blocks.append(text)
    if len(' '.join(blocks)) < 80:
        blocks = [clean_text(x) for x in container.get_text('\n', strip=True).splitlines()]
    result = []
    seen = set()
    for line in blocks:
        if not line or line == title or line == date:
            continue
        if line in CATEGORY_NAMES.values():
            continue
        if any(p.search(line) for p in DROP_LINE_PATTERNS):
            continue
        if len(line) > 2500:
            line = line[:2500].rstrip() + '…'
        key = re.sub(r'\s+', '', line)
        if len(key) < 2 or key in seen:
            continue
        seen.add(key)
        result.append(line)
    return result[:80]


def excerpt_from(body: list[str], fallback: str = '') -> str:
    useful = [x for x in body if len(x) >= 12]
    text = ' '.join(useful[:2]) or fallback
    text = clean_text(text)
    return (text[:177].rstrip() + '…') if len(text) > 180 else text


def parse_article(session: requests.Session, url: str, seed: dict) -> dict:
    soup = get(session, url)
    title = choose_title(soup, seed.get('listTitle', ''))
    date = find_date(soup)
    category = seed['category']
    old_id = seed['oldId']
    container = likely_article_container(soup, title)
    body = body_lines(container, title, date)
    return {
        'id': stable_id(category, old_id, title),
        'date': date,
        'type': CATEGORY_NAMES.get(category, '最新消息'),
        'title': title,
        'excerpt': excerpt_from(body, seed.get('listTitle', '')),
        'body': body,
        'legacyUrl': url,
        'legacyCategory': category,
        'legacyId': old_id,
    }


def main() -> None:
    session = requests.Session()
    session.headers.update({'User-Agent': UA, 'Accept-Language': 'zh-TW,zh;q=0.9'})
    seeds = discover_articles(session)
    if len(seeds) < 10:
        raise SystemExit(f'Only discovered {len(seeds)} legacy news articles; refusing to overwrite output.')

    items = []
    errors = []
    for url, seed in sorted(seeds.items(), key=lambda kv: (int(kv[1]['category']), int(kv[1]['oldId']))):
        try:
            item = parse_article(session, url, seed)
            if not item['title']:
                raise ValueError('missing title')
            items.append(item)
        except Exception as exc:
            errors.append(f'{url}: {exc}')

    if len(items) < max(10, int(len(seeds) * 0.85)):
        raise SystemExit('Too many article parse failures:\n' + '\n'.join(errors[:20]))

    items.sort(key=lambda x: (x.get('date', ''), int(x.get('legacyId') or 0)), reverse=True)
    payload = {
        'source': NEWS_URL,
        'items': items,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    encoded = json.dumps(payload, ensure_ascii=False, separators=(',', ':'))
    OUT.write_text('window.FBLegacyNews=' + encoded + ';\n', encoding='utf-8')
    print(f'Imported {len(items)} legacy news articles ({len(errors)} parse errors).')
    for error in errors:
        print('WARN', error)


if __name__ == '__main__':
    main()
