from pathlib import Path
import re

VERSION = "20260918-1010"
PATTERNS = [
    # 所有公開頁本地 JavaScript 使用同一個 release version，避免跨頁混用舊快取。
    (re.compile(r'(assets/js/[^"\']+\.js)(?:\?v=[^"\']+)?'), rf'\1?v={VERSION}'),
    (re.compile(r'assets/css/downloads-redesign\.css\?v=[^"\']+'), f'assets/css/downloads-redesign.css?v={VERSION}'),
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
