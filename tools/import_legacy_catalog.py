from __future__ import annotations

import hashlib
import json
import mimetypes
import re
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

BASE = "https://www.far-beyound.com.tw"
OUT_JS = Path("assets/js/legacy-catalog.js")
IMG_DIR = Path("assets/images/catalog")
IMG_DIR.mkdir(parents=True, exist_ok=True)

UA = {"User-Agent": "Mozilla/5.0 (compatible; FarBeyoundSiteMigration/1.0)"}
SESSION = requests.Session()
SESSION.headers.update(UA)

# Order is intentionally identical to the current official website navigation.
SEEDS = [
    # Label printers
    ("printers", "Zebra", 0, "/product/1/5"),
    ("printers", "Argox", 1, "/product/1/6"),
    ("printers", "TSC", 2, "/product/1/22"),
    ("printers", "GoDEX", 3, "/product/1/23"),
    ("printers", "TOSHIBA", 4, "/product/1/24"),
    ("printers", "SATO", 5, "/product/1/28"),
    ("printers", "Honeywell", 6, "/product/1/29"),
    # Barcode scanners
    ("scanners", "Fastech", 0, "/product/2/90"),
    ("scanners", "Zebra", 1, "/product/2/7"),
    ("scanners", "Honeywell", 2, "/product/2/9"),
    ("scanners", "NUMA", 3, "/product/2/72"),
    ("scanners", "Datalogic", 4, "/product/2/30"),
    # RFID / mobile computer
    ("rfid", "Zebra", 0, "/product/3/10"),
    ("mobile", "Zebra", 0, "/product/4/58"),
    # Labels, ribbons, printing service, software
    ("labels", "標籤貼紙", 0, "/product/16/17"),
    ("labels", "耐溫貼紙", 1, "/product/16/92"),
    ("labels", "碳帶", 2, "/product/16/48"),
    ("printing", "代印服務", 0, "/product/20/46"),
    ("software", "標籤軟體", 0, "/product/19"),
    # Service parts
    ("parts", "Zebra", 0, "/product/65/66/71"),
    ("parts", "Argox", 1, "/product/65/68"),
    ("parts", "TSC", 2, "/product/65/67"),
    ("parts", "GoDEX", 3, "/product/65/69"),
    ("parts", "SATO", 4, "/product/65/85"),
    ("parts", "外掛紙捲架", 5, "/product/65/83/84"),
]

BRAND_ORDER = {
    "printers": ["Zebra", "Argox", "TSC", "GoDEX", "TOSHIBA", "SATO", "Honeywell"],
    "scanners": ["Fastech", "Zebra", "Honeywell", "NUMA", "Datalogic"],
    "rfid": ["Zebra"],
    "mobile": ["Zebra"],
    "labels": ["標籤貼紙", "耐溫貼紙", "碳帶"],
    "printing": ["代印服務"],
    "software": ["標籤軟體"],
    "parts": ["Zebra", "Argox", "TSC", "GoDEX", "SATO", "外掛紙捲架"],
}
DOWNLOAD_ORDER = ["Zebra", "Argox", "TSC", "GoDEX", "TOSHIBA", "SATO", "Honeywell", "遠端連線", "Microsoft"]
AGENCY_ORDER = ["Zebra", "Argox", "TSC", "GoDEX", "TOSHIBA", "SATO", "Honeywell", "Fastech", "NUMA", "Datalogic"]

DETAIL_RE = re.compile(r"^/product/(?:\d+/){3}\d+/?$")
BAD_IMAGE_WORDS = ("logo", "icon", "banner", "menu", "line", "qrcode", "loading", "footer", "header", "arrow", "search")


def get(url: str) -> requests.Response:
    last = None
    for attempt in range(4):
        try:
            r = SESSION.get(url, timeout=30)
            r.raise_for_status()
            return r
        except Exception as exc:
            last = exc
            time.sleep(1.2 * (attempt + 1))
    raise RuntimeError(f"GET failed: {url}: {last}")


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", s or "").strip()


def slug_for(url: str, category: str, name: str) -> str:
    path = urlparse(url).path.strip("/").replace("/", "-")
    h = hashlib.sha1(f"{category}|{url}".encode()).hexdigest()[:8]
    readable = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")[:45]
    return f"legacy-{readable or path}-{h}"


def parse_listing(html: str) -> list[tuple[str, str]]:
    soup = BeautifulSoup(html, "html.parser")
    out: list[tuple[str, str]] = []
    seen = set()
    for a in soup.find_all("a", href=True):
        href = urlparse(urljoin(BASE, a["href"])).path
        if not DETAIL_RE.match(href):
            continue
        url = urljoin(BASE, href)
        text = norm(a.get_text(" ", strip=True))
        if not text or url in seen:
            continue
        seen.add(url)
        out.append((url, text))
    return out


def page_title(soup: BeautifulSoup, fallback: str) -> str:
    candidates = []
    for selector in ("h1", "h2", ".product-title", ".title"):
        for el in soup.select(selector):
            t = norm(el.get_text(" ", strip=True))
            if t and "Product Information" not in t and "產品資訊" not in t:
                candidates.append(t)
    if candidates:
        return max(candidates, key=lambda x: (len(x) < 110, len(x)))
    og = soup.find("meta", property="og:title")
    if og and og.get("content"):
        return norm(og["content"].split("|")[0])
    if soup.title:
        return norm(soup.title.get_text().split("|")[0])
    return fallback


def infer_type(name: str, category: str) -> str:
    for t in ("工業型", "商業型", "桌上型", "攜帶型", "通用型", "超耐用型", "固定式", "手持式", "有線", "無線", "RFID"):
        if t in name:
            return t
    return {
        "labels": "耗材",
        "printing": "代印服務",
        "software": "軟體",
        "parts": "維修 / 配件",
        "mobile": "行動電腦",
        "rfid": "RFID",
        "scanners": "條碼掃描器",
        "printers": "標籤條碼列印機",
    }.get(category, "產品")


def infer_device(category: str) -> str:
    return {
        "printers": "printer", "scanners": "scanner", "rfid": "rfid", "mobile": "mobile",
        "labels": "label", "printing": "box", "software": "software", "parts": "wrench"
    }.get(category, "box")


def meaningful_image_candidates(soup: BeautifulSoup, detail_url: str) -> list[str]:
    urls = []
    og = soup.find("meta", property="og:image")
    if og and og.get("content"):
        urls.append(urljoin(detail_url, og["content"]))
    for img in soup.find_all("img"):
        src = img.get("data-src") or img.get("data-original") or img.get("src")
        if not src:
            continue
        u = urljoin(detail_url, src)
        low = u.lower()
        if any(w in low for w in BAD_IMAGE_WORDS):
            continue
        if not re.search(r"\.(?:png|jpe?g|webp)(?:\?|$)", low):
            continue
        urls.append(u)
    # preserve order, prefer URLs that look product/upload related
    uniq = list(dict.fromkeys(urls))
    uniq.sort(key=lambda u: (0 if any(k in u.lower() for k in ("product", "upload", "images")) else 1, len(u)))
    return uniq


def save_image(urls: list[str], slug: str) -> str:
    for u in urls[:12]:
        try:
            r = get(u)
            ctype = (r.headers.get("content-type") or "").lower()
            if not ctype.startswith("image/") or len(r.content) < 2500:
                continue
            ext = mimetypes.guess_extension(ctype.split(";")[0]) or Path(urlparse(u).path).suffix or ".jpg"
            if ext == ".jpe": ext = ".jpg"
            if ext not in (".jpg", ".jpeg", ".png", ".webp", ".gif"):
                ext = ".jpg"
            path = IMG_DIR / f"{slug}{ext}"
            path.write_bytes(r.content)
            return path.as_posix()
        except Exception:
            continue
    return ""


def parse_detail(url: str, listing_text: str, category: str, brand: str, brand_order: int, legacy_order: int) -> dict:
    try:
        html = get(url).text
        soup = BeautifulSoup(html, "html.parser")
    except Exception:
        soup = BeautifulSoup("", "html.parser")
        html = ""
    name = page_title(soup, listing_text)
    # Listing cards often contain title + series; page title is preferred.
    if len(name) > 130 or name in ("產品資訊", "Product Information"):
        name = listing_text[:120]
    status = "已停產" if ("停產" in listing_text or "停產" in html) else "販售中"
    slug = slug_for(url, category, name)

    intro = ""
    paragraphs = []
    for p in soup.find_all("p"):
        t = norm(p.get_text(" ", strip=True))
        if len(t) >= 28 and not any(x in t for x in ("Copyright", "All Rights Reserved", "萬里資訊股份有限公司")):
            paragraphs.append(t)
    if paragraphs:
        intro = max(paragraphs[:10], key=len)[:420]
    if not intro:
        intro = f"{name}，更多規格與應用資訊可洽萬里資訊。"

    # Try to keep a concise family subtitle from the listing text.
    family = listing_text.replace(name, "").strip(" -｜/")
    if len(family) > 80: family = ""
    subtype = infer_type(name + " " + listing_text, category)
    image = save_image(meaningful_image_candidates(soup, url), slug) if html else ""

    return {
        "id": slug,
        "category": category,
        "brand": brand,
        "brandOrder": brand_order,
        "legacyOrder": legacy_order,
        "family": family or brand,
        "type": subtype,
        "name": name,
        "subtitle": family or subtype,
        "featured": False,
        "status": status,
        "device": infer_device(category),
        "intro": intro,
        "highlights": [],
        "specs": [["品牌 / 分類", brand], ["原官網分類", subtype]],
        "files": [],
        "image": image,
        "legacyUrl": url,
    }


def collect_seed(category: str, brand: str, brand_order: int, path: str) -> list[dict]:
    seen_urls = set()
    entries: list[tuple[str, str]] = []
    for page in range(1, 12):
        url = urljoin(BASE, path) + ("" if page == 1 else f"?page={page}")
        try:
            found = parse_listing(get(url).text)
        except Exception as exc:
            print(f"WARN listing {url}: {exc}")
            break
        new = [(u, t) for u, t in found if u not in seen_urls]
        if not new:
            break
        for u, t in new:
            seen_urls.add(u)
            entries.append((u, t))
        print(f"{category}/{brand} page {page}: +{len(new)}")
    products = []
    for i, (url, text) in enumerate(entries):
        print(f"  [{i+1}/{len(entries)}] {brand}: {text[:80]}")
        products.append(parse_detail(url, text, category, brand, brand_order, i))
    return products


def main() -> None:
    products = []
    for category, brand, brand_order, path in SEEDS:
        products.extend(collect_seed(category, brand, brand_order, path))

    # Deduplicate only identical placement+URL; same item may legitimately appear under products and parts.
    dedup = {}
    for p in products:
        key = (p["category"], p["legacyUrl"])
        dedup.setdefault(key, p)
    products = list(dedup.values())

    payload = {
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "source": BASE,
        "brandOrder": BRAND_ORDER,
        "downloadOrder": DOWNLOAD_ORDER,
        "agencyOrder": AGENCY_ORDER,
        "products": products,
        "counts": {c: sum(1 for p in products if p["category"] == c) for c in BRAND_ORDER},
    }
    text = "// Generated from the current official Far-beyound website. Do not hand-edit.\nwindow.FBLegacyCatalog = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n"
    OUT_JS.write_text(text, encoding="utf-8")
    print("Generated", OUT_JS, "products=", len(products), "images=", sum(bool(p["image"]) for p in products))


if __name__ == "__main__":
    main()
