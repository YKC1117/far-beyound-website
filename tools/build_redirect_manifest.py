#!/usr/bin/env python3
import argparse,csv,json,re
from pathlib import Path
from urllib.parse import urlsplit,quote

LEGACY_HOSTS={'far-beyound.com.tw','www.far-beyound.com.tw'}
NEWS_CATEGORIES={'1':'產品消息','2':'系統消息','3':'公司公告'}

def load_js_json(path:Path):
    text=path.read_text(encoding='utf-8-sig').strip()
    pos=text.find('=')
    if pos<0: raise ValueError(f'{path}: missing assignment')
    raw=text[pos+1:].strip()
    if raw.endswith(';'): raw=raw[:-1].rstrip()
    return json.loads(raw)

def legacy_path(url:str):
    u=urlsplit(str(url or '').strip())
    if u.hostname not in LEGACY_HOSTS: return None
    return u.path or '/'

def add(rows,source,target,kind,label=''):
    source=(source or '').strip(); target=(target or '').strip()
    if not source.startswith('/') or not target.startswith('/'):
        raise ValueError(f'invalid redirect: {source!r} -> {target!r}')
    rows.append({'source':source,'target':target,'status':301,'kind':kind,'label':label})

def target_page(target:str)->str:
    return urlsplit(target).path.lstrip('/') or 'index.html'

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--root',default='.')
    ap.add_argument('--out',default='migration/generated')
    ap.add_argument('--base-url',default='https://www.far-beyound.com.tw')
    args=ap.parse_args()
    root=Path(args.root); out=root/args.out; out.mkdir(parents=True,exist_ok=True)
    catalog=load_js_json(root/'assets/js/legacy-catalog.js')
    downloads=load_js_json(root/'assets/js/legacy-downloads.js')
    news=load_js_json(root/'assets/js/legacy-news.js')
    rows=[]

    for p in catalog.get('products',[]):
        src=legacy_path(p.get('legacyUrl'))
        pid=str(p.get('id') or '').strip()
        if src and pid:
            add(rows,src,'/product.html?id='+quote(pid,safe='-_.'),'product',p.get('name',''))

    grouped={}
    for d in downloads.get('downloads',[]):
        src=legacy_path(d.get('sourcePage'))
        brand=str(d.get('brand') or '').strip()
        if src and brand: grouped.setdefault(src,set()).add(brand)
    for src,brands in grouped.items():
        if len(brands)!=1:
            raise ValueError(f'{src}: multiple download brands {sorted(brands)}')
        brand=next(iter(brands))
        add(rows,src,'/downloads.html?brand='+quote(brand,safe='-_.'),'download',brand)

    news_items=news.get('items') or []
    for item in news_items:
        src=str(item.get('legacyPath') or '').strip()
        nid=str(item.get('id') or '').strip()
        title=str(item.get('title') or '').strip()
        if not re.fullmatch(r'/news/\d+/\d+',src):
            raise ValueError(f'invalid legacy news path: {src!r}')
        if not nid:
            raise ValueError(f'{src}: missing news id')
        add(rows,src,'/news-detail.html?id='+quote(nid,safe='-_.'),'news',title)

    add(rows,'/news','/news.html','news-category','所有消息')
    for old_id,label in NEWS_CATEGORIES.items():
        add(rows,f'/news/{old_id}','/news.html?type='+quote(label,safe='-_.'),'news-category',label)

    manual=root/'migration/manual-redirects.csv'
    if manual.exists():
        with manual.open(encoding='utf-8-sig',newline='') as f:
            for r in csv.DictReader(f):
                if not (r.get('source') or '').strip(): continue
                add(rows,r['source'],r['target'],r.get('kind','manual'),r.get('label',''))

    merged={}
    for r in rows:
        old=merged.get(r['source'])
        if old and old['target']!=r['target']:
            raise ValueError(f'conflicting redirect {r["source"]}: {old["target"]} vs {r["target"]}')
        merged[r['source']]=r
    rows=sorted(merged.values(),key=lambda r:(r['kind'],r['source']))

    if not any(r['kind']=='product' for r in rows): raise ValueError('no product redirects generated')
    if not any(r['kind']=='download' for r in rows): raise ValueError('no download redirects generated')
    generated_news=[r for r in rows if r['kind']=='news']
    if len(generated_news)!=len(news_items):
        raise ValueError(f'news redirect coverage mismatch: {len(generated_news)} redirects for {len(news_items)} imported articles')
    news_sources={r['source'] for r in generated_news}
    missing=[str(x.get('legacyPath') or '') for x in news_items if str(x.get('legacyPath') or '') not in news_sources]
    if missing:
        raise ValueError('missing news redirects: '+', '.join(missing))

    missing_targets=[]
    for r in rows:
        page=target_page(r['target'])
        if page.endswith('.html') and not (root/page).is_file():
            missing_targets.append(f'{r["source"]} -> {r["target"]}')
    if missing_targets:
        raise ValueError('redirect targets missing from new site: '+', '.join(missing_targets[:20]))

    with (out/'redirects.csv').open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=['source','target','status','kind','label']);w.writeheader();w.writerows(rows)
    (out/'redirects.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    base=args.base_url.rstrip('/')
    nginx=['# Generated. Review before production cutover.']
    apache=['# Generated. Requires mod_alias. Review before production cutover.']
    for r in rows:
        target=base+r['target']
        nginx.append(f'location = {r["source"]} {{ return 301 {target}; }}')
        apache.append(f'Redirect 301 {r["source"]} {target}')
    (out/'redirects.nginx.conf').write_text('\n'.join(nginx)+'\n',encoding='utf-8')
    (out/'redirects.apache.conf').write_text('\n'.join(apache)+'\n',encoding='utf-8')
    counts={}
    for r in rows: counts[r['kind']]=counts.get(r['kind'],0)+1
    summary={'total':len(rows),'counts':counts,'base_url':base,'news_imported':len(news_items),'news_covered':len(generated_news)}
    (out/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(summary,ensure_ascii=False))

if __name__=='__main__': main()
