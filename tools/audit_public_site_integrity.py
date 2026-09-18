from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_PAGES = [
    '404.html', 'about.html', 'cases.html', 'contact.html', 'downloads.html',
    'index.html', 'locations.html', 'news-detail.html', 'news.html',
    'preview-guide.html', 'product.html', 'products.html', 'solutions.html',
]
BUMP_TEXT = (ROOT / 'tools' / 'bump_public_release.py').read_text(encoding='utf-8')
VERSION_MATCH = re.search(r'VERSION\s*=\s*["\']([^"\']+)', BUMP_TEXT)
RELEASE_VERSION = VERSION_MATCH.group(1) if VERSION_MATCH else ''
SKIN = f'assets/css/approved-skin-20260916.css?v={RELEASE_VERSION}'
SKIN_CLASS = 'fb-approved-skin-20260916'


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: list[str] = []
        self.refs: list[tuple[str, str]] = []
        self.body_classes: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = dict(attrs)
        if data.get('id'):
            self.ids.append(str(data['id']))
        if tag == 'body' and data.get('class'):
            self.body_classes.update(str(data['class']).split())
        for key in ('href', 'src'):
            value = data.get(key)
            if value:
                self.refs.append((key, str(value)))


def local_target(page: Path, value: str) -> Path | None:
    if re.match(r'^(?:https?:|mailto:|tel:|data:|javascript:|#|//)', value, re.I):
        return None
    clean = unquote(value.split('#', 1)[0].split('?', 1)[0])
    if not clean:
        return None
    return (ROOT / clean.lstrip('/')) if value.startswith('/') else (page.parent / clean)


def require_text(path: str, needles: list[str], errors: list[str]) -> None:
    target = ROOT / path
    if not target.is_file():
        errors.append(f'missing UX guard file: {path}')
        return
    text = target.read_text(encoding='utf-8')
    for needle in needles:
        if needle not in text:
            errors.append(f'{path}: missing required UX guard: {needle}')


def main() -> None:
    errors: list[str] = []
    checked_refs = 0

    for rel in PUBLIC_PAGES:
        page = ROOT / rel
        if not page.is_file():
            errors.append(f'missing public page: {rel}')
            continue
        text = page.read_text(encoding='utf-8')
        parser = PageParser()
        parser.feed(text)

        duplicates = sorted({item for item in parser.ids if parser.ids.count(item) > 1})
        if duplicates:
            errors.append(f'{rel}: duplicate ids: {duplicates}')
        if SKIN not in text:
            errors.append(f'{rel}: approved skin stylesheet missing')
        if SKIN_CLASS not in parser.body_classes:
            errors.append(f'{rel}: approved skin body class missing')

        for _, value in parser.refs:
            target = local_target(page, value)
            if target is None:
                continue
            checked_refs += 1
            if not target.exists():
                errors.append(f'{rel}: missing local reference: {value}')

    # Customer-facing UX guards: direct downloads must be probed before navigation,
    # failed sources must degrade to an in-site file request, and unavailable products
    # or inquiry messages must not expose internal administration wording.
    require_text(
        'assets/js/downloads-redesign.js',
        ['data-direct-download', 'probe=1', '索取檔案', 'download-file'],
        errors,
    )
    visibility = ROOT / 'assets/js/public-product-visibility.js'
    if visibility.is_file():
        visibility_text = visibility.read_text(encoding='utf-8')
        if '產品資料仍保留於管理後台' in visibility_text:
            errors.append('public-product-visibility.js: internal admin wording exposed to customers')
        for phrase in ['此產品目前暫不提供公開瀏覽', '聯絡我們']:
            if phrase not in visibility_text:
                errors.append(f'public-product-visibility.js: missing customer-safe unavailable state: {phrase}')
    else:
        errors.append('missing UX guard file: assets/js/public-product-visibility.js')

    contact_submit = ROOT / 'assets/js/contact-submit.js'
    if contact_submit.is_file():
        contact_text = contact_submit.read_text(encoding='utf-8')
        for internal_phrase in ['後台資料庫', '管理後台']:
            if internal_phrase in contact_text:
                errors.append(f'contact-submit.js: internal wording exposed to customers: {internal_phrase}')
        for phrase in ['資料已成功送出', '需求已完成留存']:
            if phrase not in contact_text:
                errors.append(f'contact-submit.js: missing customer-safe inquiry state: {phrase}')
    else:
        errors.append('missing UX guard file: assets/js/contact-submit.js')

    js_errors: list[str] = []
    for path in sorted((ROOT / 'assets' / 'js').glob('*.js')):
        result = subprocess.run(['node', '--check', str(path)], capture_output=True, text=True)
        if result.returncode:
            js_errors.append(path.relative_to(ROOT).as_posix())
    if js_errors:
        errors.append('JavaScript syntax errors: ' + ', '.join(js_errors))

    # Product-route integrity: every homepage/static product href must resolve
    # after the same public catalog merge used by product.html.
    route_audit = subprocess.run(
        ['node', str(ROOT / 'tools' / 'audit_product_routes.js')],
        capture_output=True,
        text=True,
    )
    if route_audit.returncode:
        detail = (route_audit.stdout + '\n' + route_audit.stderr).strip()
        errors.append('product route audit failed: ' + detail)

    # Keep the source media patch and every shipped bundle in sync.
    media_guard = '.product-card-visual .real-product-media{background:transparent}'
    media_img_guard = '.product-card-visual .real-product-media img{width:82%;height:82%}'
    for media_path in [
        'assets/js/media-patch.js',
        'assets/js/home-main-bundle.js',
        'assets/js/inner-pre-bundle.js',
        'assets/js/products-pre-bundle.js',
        'assets/js/product-pre-bundle.js',
        'assets/js/inner-generic-bundle.js',
        'assets/js/solutions-bundle.js',
    ]:
        require_text(media_path, [media_guard, media_img_guard], errors)

    # Homepage product-image surface must stay transparent. This guards against
    # older bundle/source rules reintroducing the visible white rectangle.
    home_bundle = (ROOT / 'assets/css/home-bundle.css').read_text(encoding='utf-8')
    approved_skin = (ROOT / 'assets/css/approved-skin-20260916.css').read_text(encoding='utf-8')
    forbidden_home_surfaces = [
        '.v2-stage-main,.v2-stage-side>a{transition:border-color .22s ease,box-shadow .22s ease,transform .22s ease;background:#fff!important}',
        'body[data-page="home"] .hero-rotate-side img{width:100%;height:142px;object-fit:contain;background:#fff;padding:10px}',
        'background: #eef0ed !important;',
    ]
    for forbidden in forbidden_home_surfaces:
        if forbidden in home_bundle or forbidden in approved_skin:
            errors.append('homepage product white-frame rule returned: ' + forbidden)

    require_text(
        'assets/css/approved-skin-20260916.css',
        [
            '/* 2026-09-18｜首頁商品圖白框防回歸',
            'html body.fb-approved-skin-20260916[data-page="home"] .product-card-visual .real-product-media,',
            'background: transparent !important;',
        ],
        errors,
    )

    css_missing: list[str] = []
    for path in sorted((ROOT / 'assets' / 'css').glob('*.css')):
        text = path.read_text(encoding='utf-8', errors='ignore')
        for raw in re.findall(r'url\(([^)]+)\)', text):
            value = raw.strip().strip('"\'')
            if not value or re.match(r'^(?:data:|https?:|#|//)', value, re.I):
                continue
            clean = unquote(value.split('#', 1)[0].split('?', 1)[0])
            target = path.parent / clean
            if not target.exists():
                css_missing.append(f'{path.relative_to(ROOT).as_posix()} -> {value}')
    if css_missing:
        errors.append('missing CSS resources: ' + '; '.join(css_missing))

    if errors:
        print('PUBLIC_SITE_INTEGRITY=FAIL')
        for error in errors:
            print('ERROR:', error)
        raise SystemExit(1)

    print('PUBLIC_SITE_INTEGRITY=PASS')
    print(f'PUBLIC_PAGES={len(PUBLIC_PAGES)}')
    print(f'LOCAL_REFERENCES_CHECKED={checked_refs}')
    print(f'JS_SYNTAX_FILES={len(list((ROOT / "assets" / "js").glob("*.js")))}')
    print(f'CSS_FILES={len(list((ROOT / "assets" / "css").glob("*.css")))}')
    print('PUBLIC_UX_GUARDS=PASS')


if __name__ == '__main__':
    main()
