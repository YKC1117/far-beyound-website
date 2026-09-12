from pathlib import Path
import re

VERSION = "20260912-2038"
PATTERNS = [
    (re.compile(r'assets/js/site-social\.js\?v=[^"\']+'), f'assets/js/site-social.js?v={VERSION}'),
    (re.compile(r'assets/js/catalog-merge\.js\?v=[^"\']+'), f'assets/js/catalog-merge.js?v={VERSION}'),
    (re.compile(r'assets/js/product-catalog-upgrade\.js\?v=[^"\']+'), f'assets/js/product-catalog-upgrade.js?v={VERSION}'),
    (re.compile(r'assets/js/home-guide-final\.js\?v=[^"\']+'), f'assets/js/home-guide-final.js?v={VERSION}'),
]

changed = []
for path in sorted(Path('.').rglob('*.html')):
    if any(part in {'.git', 'node_modules'} for part in path.parts):
        continue
    text = path.read_text(encoding='utf-8')
    new = text
    for pattern,replacement in PATTERNS:
        new = pattern.sub(replacement,new)
    if new != text:
        path.write_text(new, encoding='utf-8')
        changed.append(str(path))

print(f'Updated {len(changed)} HTML files to public release {VERSION}')
for item in changed:
    print(' -', item)
