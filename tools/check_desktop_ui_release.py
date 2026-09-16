from pathlib import Path

DOWNLOAD_VERSION = '20260915-2346'
PUBLIC_LOADER_VERSION = '20260915-2346'
QUICK_CONTACT_VERSION = '20260915-0946'
APPROVED_SKIN_VERSION = '20260916'


def text(path):
    return Path(path).read_text(encoding='utf-8')


downloads_html = text('downloads.html')
downloads_css = text('assets/css/downloads-redesign.css')
site_social = text('assets/js/site-social.js')
quick_authority = text('assets/js/quick-contact-authority.js')

# 下載中心：確認目前正式版快取版本與桌機可讀性規格。
assert f'assets/css/downloads-redesign.css?v={DOWNLOAD_VERSION}' in downloads_html, 'download CSS cache version is stale'
assert f'assets/js/site-social.js?v={PUBLIC_LOADER_VERSION}' in downloads_html, 'public loader cache version is stale on downloads'
assert f'assets/css/approved-skin-20260916.css?v={APPROVED_SKIN_VERSION}' in downloads_html, 'approved skin is not loaded on downloads'
assert 'max-width:1560px' in downloads_css, 'desktop download canvas was not enlarged'
assert 'grid-template-columns:320px minmax(0,1fr)' in downloads_css, 'desktop download sidebar width is stale'
assert 'min-height:146px' in downloads_css, 'desktop download result cards are still too compact'

# 快速聯絡：目前權威層為 quick-contact-authority，不再驗證已停用的舊 polish 檔。
assert f"quick-contact-authority.js?v={QUICK_CONTACT_VERSION}" in site_social, 'quick contact authority is not loaded'
for required in [
    'grid-template-columns:58px!important',
    'width:58px!important',
    'data-action="phone"',
    'data-action="line"',
    'data-action="inquiry"',
    'grid-template-columns:repeat(3,1fr)!important',
    'body:not([data-page="admin"])',
]:
    assert required in quick_authority, f'quick contact authority styling/structure missing: {required}'

print('DOWNLOAD_DESKTOP_READABILITY=PASS')
print('QUICK_CONTACT_AUTHORITY=PASS')
print('APPROVED_SKIN_LOAD=PASS')
print(f'DOWNLOAD_UI_VERSION={DOWNLOAD_VERSION}')
print(f'PUBLIC_LOADER_VERSION={PUBLIC_LOADER_VERSION}')
print(f'QUICK_CONTACT_VERSION={QUICK_CONTACT_VERSION}')
