from pathlib import Path

path = Path('assets/js/pages.js')
text = path.read_text(encoding='utf-8')
original = text

anchor = "  function solutionCard(s){return `<a class=\"solution-card\" href=\"solutions.html#${enc(s.id)}\"><span class=\"solution-icon\">${icon(s.icon)}</span><small>${e(s.en)}</small><h3>${e(s.name)}</h3><p>${e(s.desc)}</p><span class=\"card-link\">了解方案 ${icon('arrow')}</span></a>`}\n"
helper = anchor + "\n  function newsHref(n){\n    const direct=String(n?.id||'').trim();\n    if(direct)return `news-detail.html?id=${enc(direct)}`;\n    const title=String(n?.title||'').toLowerCase();\n    const map=[\n      [/2026.*萬里資訊.*員工旅遊|2026.*員工旅遊/,'travel-2026'],\n      [/原物料價格調整/,'material-price'],\n      [/0x0000011b.*0x00000709|共用印表機.*0x0000011b/,'printer-share-error'],\n      [/zt411.*zt421|zt421.*zt411/,'zt411-news'],\n      [/zt610.*zt620|zt620.*zt610/,'zt610-news']\n    ];\n    const hit=map.find(([re])=>re.test(title));\n    return hit?`news-detail.html?id=${enc(hit[1])}`:`contact.html?item=${enc(n?.title||'消息內容')}`;\n  }\n"
if 'function newsHref(n)' not in text:
    if anchor not in text:
        raise SystemExit('Could not find solutionCard anchor in assets/js/pages.js')
    text = text.replace(anchor, helper, 1)

old_home = '<a class="news-row" href="news.html">'
new_home = '<a class="news-row" href="${newsHref(n)}">'
if old_home in text:
    text = text.replace(old_home, new_home, 1)

old_news = '<button class="text-link demo-news">閱讀內容 ${icon(\'arrow\')}</button>'
new_news = '<a class="text-link" href="${newsHref(n)}">閱讀內容 ${icon(\'arrow\')}</a>'
if old_news in text:
    text = text.replace(old_news, new_news, 1)

old_handler = "; $$('.demo-news').forEach(b=>b.onclick=()=>toast('新聞內頁將於完整資料搬移階段接入'))"
if old_handler in text:
    text = text.replace(old_handler, '', 1)

if 'demo-news' in text:
    raise SystemExit('demo-news remains in assets/js/pages.js after patch')

if text != original:
    path.write_text(text, encoding='utf-8')
    print('Updated assets/js/pages.js: news links now use real destinations.')
else:
    print('assets/js/pages.js already uses real news links.')
