#!/usr/bin/env python3
import argparse,csv,json,re
from pathlib import Path
from urllib.parse import urlsplit,quote

LEGACY_HOSTS={'far-beyound.com.tw','www.far-beyound.com.tw'}

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

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--root',default='.')
    ap.add_argument('--out',default='migration/generated')
    ap.add_argument('--base-url',default='https://www.far-beyound.com.tw')
    args=ap.parse_args()
    root=Path(args.root); out=root/args.out; out.mkdir(parents=True,exist_ok=True)
    catalog=load_js_json(root/'assets/js/legacy-catalog.js')
    downloads=load_js_json(root/'assets/js/legacy-downloads.js')
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
    summary={'total':len(rows),'counts':counts,'base_url':base}
    (out/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(summary,ensure_ascii=False))

if __name__=='__main__': main()
