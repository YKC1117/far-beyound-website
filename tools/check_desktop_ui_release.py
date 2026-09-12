from pathlib import Path

VERSION='20260912-2143'

def text(path):
    return Path(path).read_text(encoding='utf-8')

downloads_html=text('downloads.html')
downloads_css=text('assets/css/downloads-redesign.css')
site_social=text('assets/js/site-social.js')
quick=text('assets/js/quick-contact-polish.js')

assert f'assets/css/downloads-redesign.css?v={VERSION}' in downloads_html, 'download CSS cache version is stale'
assert f'assets/js/site-social.js?v={VERSION}' in downloads_html, 'public loader cache version is stale on downloads'
assert 'max-width:1560px' in downloads_css, 'desktop download canvas was not enlarged'
assert 'grid-template-columns:320px minmax(0,1fr)' in downloads_css, 'desktop download sidebar width is stale'
assert 'min-height:146px' in downloads_css, 'desktop download result cards are still too compact'
assert "quick-contact-polish.js?v=20260912-2143" in site_social, 'quick contact visual polish is not loaded'
for required in ['gap:9px!important','border-radius:12px!important','width:62px!important','background:transparent!important']:
    assert required in quick, f'quick-contact independent-card styling missing: {required}'

print('DOWNLOAD_DESKTOP_READABILITY=PASS')
print('QUICK_CONTACT_CARD_STYLE=PASS')
print(f'PUBLIC_UI_VERSION={VERSION}')
