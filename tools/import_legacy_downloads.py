from __future__ import annotations

import json
import re
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

BASE = "https://www.far-beyound.com.tw"
PAGES = [
    ("Zebra", 1),
    ("Argox", 2),
    ("TSC", 9),
    ("GoDEX", 12),
    ("TOSHIBA", 13),
    ("SATO", 14),
    ("Honeywell", 15),
    ("遠端連線", 24),
    ("Microsoft", 44),
]
CATEGORIES = ["驅動程式", "標籤編輯軟體", "工具程式", "指令手冊", "操作手冊", "遠端連線軟體", "Microsoft"]
META_PREFIXES = ("更新日期", "版本", "適用於", "Windows", "Windows Server", "For Linux", "Compatible with")
SIZE_RE = re.compile(r"^\s*[\d.]+\s*(?:KB|MB|GB|Bytes?)\s*$", re.I)
DATE_RE = re.compile(r"更新日期\s*[:：]?\s*([0-9]{4}[-/.][0-9]{1,2}[-/.][0-9]{1,2})")
VERSION_RE = re.compile(r"版本\s*[:：]?\s*([^\n]+)")

session = requests.Session()
session.headers.update({"User-Agent": "Mozilla/5.0 (compatible; FarBeyoundSiteMigration/1.0)"})


def clean(v: str) -> str:
    return re.sub(r"\s+", " ", (v or "")).strip()


def nearest_block(a):
    fallback = a.parent
    for anc in a.parents:
        if getattr(anc, "name", None) in {"body", "html"}:
            break
        text = clean(anc.get_text("\n", strip=True))
        downloads = sum("檔案下載" in clean(x.get_text(" ", strip=True)) for x in anc.find_all("a"))
        if downloads == 1 and len(text) <= 2600 and any(k in text for k in ("更新日期", "版本", "適用於")):
            return anc
        fallback = anc
    return fallback


def preceding_category(a) -> str:
    for node in a.find_all_previous(string=True, limit=80):
        t = clean(str(node))
        if t in CATEGORIES:
            return t
    return "其他"


def item_from_anchor(brand: str, page_url: str, a, order: int) -> dict:
    block = nearest_block(a)
    lines = []
    for s in block.stripped_strings:
        t = clean(str(s))
        if t and t not in lines:
            lines.append(t)

    category = preceding_category(a)
    excluded = {"檔案下載", "download", brand, category}
    candidates = []
    for t in lines:
        if t in excluded or t in CATEGORIES:
            continue
        if t.startswith(META_PREFIXES) or SIZE_RE.match(t):
            continue
        if len(t) > 180:
            continue
        candidates.append(t)

    name = candidates[0] if candidates else clean(a.get("title") or a.get("download") or "下載檔案")
    text = "\n".join(lines)
    m = DATE_RE.search(text)
    updated = m.group(1).replace("/", "-").replace(".", "-") if m else ""
    vm = VERSION_RE.search(text)
    version = clean(vm.group(1)) if vm else ""
    size = next((t for t in reversed(lines) if SIZE_RE.match(t)), "")

    note = ""
    if name in lines:
        idx = lines.index(name)
        for t in lines[idx + 1 :]:
            if t in CATEGORIES or t == "檔案下載" or t.startswith(META_PREFIXES) or SIZE_RE.match(t):
                continue
            if 5 <= len(t) <= 160:
                note = t
                break

    href = urljoin(page_url, a.get("href") or "")
    return {
        "brand": brand,
        "category": category,
        "name": name,
        "version": version,
        "updated": updated,
        "size": size,
        "note": note,
        "url": href,
        "sourcePage": page_url,
        "legacyOrder": order,
    }


def crawl() -> list[dict]:
    items: list[dict] = []
    for brand, page_id in PAGES:
        page_url = f"{BASE}/download/{page_id}"
        r = session.get(page_url, timeout=40)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "html.parser")
        anchors = [a for a in soup.find_all("a", href=True) if "檔案下載" in clean(a.get_text(" ", strip=True))]
        print(f"{brand}: {len(anchors)} download links")
        for i, a in enumerate(anchors):
            item = item_from_anchor(brand, page_url, a, i)
            if not item["url"]:
                continue
            items.append(item)
            print(f"  {i+1:02d}. {item['name']} -> {item['url']}")
    return items


def main() -> None:
    items = crawl()
    if len(items) < 20:
        raise RuntimeError(f"Only {len(items)} download links were found; importer result is suspicious")
    payload = {
        "source": BASE,
        "downloadOrder": [x[0] for x in PAGES],
        "count": len(items),
        "downloads": items,
    }
    out = Path("assets/js/legacy-downloads.js")
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("window.FBLegacyDownloads=" + json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print(f"TOTAL_DOWNLOAD_LINKS={len(items)}")


if __name__ == "__main__":
    main()
