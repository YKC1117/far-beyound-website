from pathlib import Path
import re

VERSION = "20260912-2008"
PATTERN = re.compile(r'assets/js/site-social\.js\?v=[^"\']+')

changed = []
for path in sorted(Path('.').rglob('*.html')):
    if any(part in {'.git', 'node_modules'} for part in path.parts):
        continue
    text = path.read_text(encoding='utf-8')
    if 'assets/js/site-social.js' not in text:
        continue
    new = PATTERN.sub(f'assets/js/site-social.js?v={VERSION}', text)
    if new != text:
        path.write_text(new, encoding='utf-8')
        changed.append(str(path))

print(f'Updated {len(changed)} HTML files to site-social {VERSION}')
for item in changed:
    print(' -', item)
