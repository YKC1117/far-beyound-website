from pathlib import Path

pages_path = Path('assets/js/pages.js')
pages = pages_path.read_text(encoding='utf-8')
pages_original = pages

anchor = "  function solutionCard(s){return `<a class=\"solution-card\" href=\"solutions.html#${enc(s.id)}\"><span class=\"solution-icon\">${icon(s.icon)}</span><small>${e(s.en)}</small><h3>${e(s.name)}</h3><p>${e(s.desc)}</p><span class=\"card-link\">了解方案 ${icon('arrow')}</span></a>`}\n"
helper = anchor + "\n  function newsHref(n){\n    const direct=String(n?.id||'').trim();\n    if(direct)return `news-detail.html?id=${enc(direct)}`;\n    const title=String(n?.title||'').toLowerCase();\n    const map=[\n      [/2026.*萬里資訊.*員工旅遊|2026.*員工旅遊/,'travel-2026'],\n      [/原物料價格調整/,'material-price'],\n      [/0x0000011b.*0x00000709|共用印表機.*0x0000011b/,'printer-share-error'],\n      [/zt411.*zt421|zt421.*zt411/,'zt411-news'],\n      [/zt610.*zt620|zt620.*zt610/,'zt610-news']\n    ];\n    const hit=map.find(([re])=>re.test(title));\n    return hit?`news-detail.html?id=${enc(hit[1])}`:`contact.html?item=${enc(n?.title||'消息內容')}`;\n  }\n"
if 'function newsHref(n)' not in pages:
    if anchor not in pages:
        raise SystemExit('Could not find solutionCard anchor in assets/js/pages.js')
    pages = pages.replace(anchor, helper, 1)

old_home = '<a class="news-row" href="news.html">'
new_home = '<a class="news-row" href="${newsHref(n)}">'
if old_home in pages:
    pages = pages.replace(old_home, new_home, 1)

old_news = '<button class="text-link demo-news">閱讀內容 ${icon(\'arrow\')}</button>'
new_news = '<a class="text-link" href="${newsHref(n)}">閱讀內容 ${icon(\'arrow\')}</a>'
if old_news in pages:
    pages = pages.replace(old_news, new_news, 1)

old_handler = "; $$('.demo-news').forEach(b=>b.onclick=()=>toast('新聞內頁將於完整資料搬移階段接入'))"
if old_handler in pages:
    pages = pages.replace(old_handler, '', 1)

# Remove development/demo fallback renderers at the source. Later public polish
# remains as defense-in-depth, not as the primary implementation.
lines = []
for line in pages.splitlines():
    if "$('#productFiles').innerHTML=" in line:
        line = "    $('#productFiles').innerHTML=p.files.length?p.files.map(f=>`<a class=\"download-row\" href=\"contact.html?item=${enc((p.name||'產品')+' '+(f.label||'技術文件'))}\"><span class=\"download-icon\">${icon('download')}</span><span><small>${e(f.type)}</small><b>${e(f.label)}</b></span><span class=\"download-cta\">洽詢取得</span></a>`).join(''):'<div class=\"empty-state\"><b>需要產品文件？</b><span>如需產品型錄、手冊或技術文件，歡迎與我們聯絡索取。</span></div>';"
    elif "$$('.demo-download').forEach" in line:
        continue
    elif "$('#downloadList').innerHTML=rows.map" in line:
        line = "      $('#downloadList').innerHTML=rows.map(x=>`<div class=\"download-item\"><span class=\"download-icon\">${icon('download')}</span><div class=\"download-main\"><span class=\"tag\">${e(x.category)}</span><h3>${e(x.name)}</h3><p>${e(x.note)}</p><div class=\"download-meta\"><span>版本 ${e(x.version)}</span><span>更新 ${e(x.updated)}</span><span>${e(x.size)}</span></div></div><a class=\"btn btn-secondary btn-sm\" href=\"contact.html?item=${enc(x.name||'下載資料')}\">洽詢取得</a></div>`).join('');"
    lines.append(line)
pages = '\n'.join(lines) + ('\n' if pages.endswith('\n') else '')
pages = pages.replace('目前此分類尚未建立展示產品', '目前此分類尚無公開產品資料')
pages = pages.replace('可透過管理介面新增產品資料。', '歡迎與我們聯絡，我們將協助您確認適合的產品。')

for forbidden in ('demo-news', 'demo-download', '測試版', '測試環境尚未掛載正式檔案', '正式檔案空間尚未接入', '新聞內頁將於完整資料搬移階段接入', '正式版可由後台上傳'):
    if forbidden in pages:
        raise SystemExit(f'Customer-facing development code remains in assets/js/pages.js: {forbidden}')

if pages != pages_original:
    pages_path.write_text(pages, encoding='utf-8')
    print('Updated assets/js/pages.js: public renderers are production-facing.')
else:
    print('assets/js/pages.js public renderers already clean.')

# Public defaults must never expose development/migration wording to customers.
data_path = Path('assets/js/data.js')
data = data_path.read_text(encoding='utf-8')
data_original = data
replacements = {
    '正式版將連接公司檔案空間或原廠下載位置。': '請由下載中心取得最新版；如需協助，歡迎聯絡萬里資訊。',
    '正式版可由後台上傳型錄、手冊與快速指南。': '如需產品型錄、手冊或技術文件，歡迎聯絡萬里資訊索取。',
}
for old, new in replacements.items():
    data = data.replace(old, new)
for forbidden in ('正式版將連接公司檔案空間', '正式版可由後台上傳'):
    if forbidden in data:
        raise SystemExit(f'Customer-facing development copy remains in assets/js/data.js: {forbidden}')
if data != data_original:
    data_path.write_text(data, encoding='utf-8')
    print('Updated assets/js/data.js: removed customer-facing development wording.')
else:
    print('assets/js/data.js public copy already clean.')

# The base header/footer renderer must also be production-facing. Do not rely on
# later presentation patches to hide development labels if another script fails.
app_path = Path('assets/js/app.js')
app = app_path.read_text(encoding='utf-8')
app_original = app
app = app.replace('<span>新版網站測試環境 · v0.1</span>', '<span>萬里資訊股份有限公司</span>')
for forbidden in ('新版網站測試環境', 'Demo 網站', 'GitHub Pages 測試'):
    if forbidden in app:
        raise SystemExit(f'Customer-facing development copy remains in assets/js/app.js: {forbidden}')
if app != app_original:
    app_path.write_text(app, encoding='utf-8')
    print('Updated assets/js/app.js: base footer is production-facing.')
else:
    print('assets/js/app.js base footer already clean.')
