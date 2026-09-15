#!/usr/bin/env python3
from pathlib import Path
import re
import sys

ROOT=Path(__file__).resolve().parents[1]
admin=(ROOT/'admin.html').read_text(encoding='utf-8')
errors=[]

sources=re.findall(r'<script[^>]+src=["\']([^"\']+)',admin,re.I)
for src in sources:
    if src.startswith(('http://','https://','//')):
        continue
    path=src.split('?',1)[0].split('#',1)[0]
    if not (ROOT/path).is_file():
        errors.append(f'admin.html missing script: {path}')

try:
    guard=admin.index('admin-import-guard.js')
    cloud=admin.index('cloud-sync.js')
    if guard>cloud:
        errors.append('admin-import-guard.js must load before cloud-sync.js')
except ValueError:
    errors.append('admin import/cloud sync wiring incomplete')

# The security/runtime layer is allowed to load supporting admin modules
# dynamically, but the bootstrap itself must be present in admin.html's
# statically loaded scripts.
required_modules=[
    'admin-auth-core.js',
    'admin-access-gate.js',
    'admin-session-hardening.js',
    'admin-system-centers.js',
]
for name in required_modules:
    if name not in admin and name not in (ROOT/'assets/js/admin-session-hardening.js').read_text(encoding='utf-8'):
        errors.append(f'admin wiring missing required module: {name}')
    if not (ROOT/'assets/js'/name).is_file():
        errors.append(f'missing required admin module file: {name}')

for name in ['admin-url-validation.js','admin-self-check.js','admin-seo-center.js','admin-front-features.js','admin-brand-manager.js','admin-location-manager.js','admin-audit.js','admin-account-security-ui.js','admin-users-ui.js','admin-security-policy-ui.js','admin-security-tools.js','admin-security-clarity.js','admin-transition-status.js','admin-permissions-ui.js']:
    if not (ROOT/'assets/js'/name).is_file():
        errors.append(f'missing dynamic admin module file: {name}')

centers=(ROOT/'assets/js/admin-system-centers.js').read_text(encoding='utf-8')
for token in ['admin-url-validation.js','admin-self-check.js','admin-seo-center.js','admin-security-tools.js','admin-users-ui.js']:
    if token not in centers:
        errors.append(f'admin system loader missing: {token}')

dashboard=(ROOT/'assets/js/admin-dashboard.js').read_text(encoding='utf-8')
for token in ['FBAdminAuth.login','FBAdminAuth.verifyFactor','adminAccessCenter','adminDashboard']:
    if token not in dashboard:
        errors.append(f'admin dashboard missing core feature: {token}')

url_guard=(ROOT/'assets/js/admin-url-validation.js').read_text(encoding='utf-8')
if '.aff-home-url' not in url_guard:
    errors.append('custom home URL field is not covered by URL validation')

session=(ROOT/'assets/js/admin-session-hardening.js').read_text(encoding='utf-8')
for token in ['MAX_MS=8*60*60*1000','SERVER_CHECK_MS=2*60*1000','pageshow','noreferrer']:
    if token not in session:
        errors.append(f'session hardening missing: {token}')

self_check_path=ROOT/'assets/js/admin-self-check.js'
if self_check_path.is_file():
    self_check=self_check_path.read_text(encoding='utf-8')
    for token in ['adminSeoCenter','adminAccessCenter','adminSecurityCenter','adminBackupCenter']:
        if token not in self_check:
            errors.append(f'admin self-check missing coverage: {token}')

if errors:
    print('ADMIN_READINESS=FAIL')
    for e in errors:
        print(' -',e)
    sys.exit(1)

print('ADMIN_READINESS=PASS')
print(f'ADMIN_STATIC_SCRIPTS={len(sources)}')
print('ADMIN_DYNAMIC_MODULE_BOOTSTRAP=PASS')
print(f'ADMIN_REQUIRED_MODULES={len(required_modules)}')
