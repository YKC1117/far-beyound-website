#!/usr/bin/env python3
"""Fail when the public site actively depends on the legacy Far-beyound host.

The legacy site may be used as an import SOURCE while it is still online, but the
new site's runtime must not fetch images, CSS, JS, documents, APIs, or navigation
from that host. Generated migration metadata may keep legacy URLs only as inert
identifiers/source references.
"""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
LEGACY_HOST = "www.far-beyound.com.tw"

SCAN = [
    *ROOT.glob("*.html"),
    *ROOT.glob("assets/css/*.css"),
    *ROOT.glob("assets/js/*.js"),
]

# These generated files intentionally retain legacy URLs only as import/source
# metadata. They must never be turned into href/src/fetch targets at runtime.
METADATA_FILES = {
    "assets/js/legacy-catalog.js",
    "assets/js/legacy-downloads.js",
    "assets/js/product-docs.js",
}

ALLOWED_METADATA_MARKERS = (
    '"legacyUrl"',
    '"sourcePage"',
    '"source"',
)

# product-docs.js uses legacy product URLs as object keys for matching imported
# records. A bare product URL key is inert and therefore allowed.
PRODUCT_DOC_KEY = re.compile(r'^\s*"https://www\.far-beyound\.com\.tw/product/[^\"]+"\s*:')

errors = []

for path in SCAN:
    rel = path.relative_to(ROOT).as_posix()
    text = path.read_text(encoding="utf-8", errors="replace")
    for lineno, line in enumerate(text.splitlines(), 1):
        if LEGACY_HOST not in line:
            continue

        if rel in METADATA_FILES:
            if any(marker in line for marker in ALLOWED_METADATA_MARKERS):
                continue
            if rel == "assets/js/product-docs.js" and PRODUCT_DOC_KEY.search(line):
                continue

        errors.append((rel, lineno, line.strip()[:260]))

if errors:
    print("ERROR: public runtime still references the legacy website host:\n")
    for rel, lineno, snippet in errors:
        print(f"- {rel}:{lineno}: {snippet}")
    print("\nImport from the old site is allowed, but copy/replace the resource so the new site works after the old host is shut down.")
    sys.exit(1)

print("OK: no active public runtime dependency on www.far-beyound.com.tw detected.")
print("Legacy URLs that remain are limited to migration/source metadata only.")
