from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path

import requests
from bs4 import BeautifulSoup

URL='https://www.far-beyound.com.tw/about'
OUT=Path('assets/js/legacy-about.js')
HEADERS={'User-Agent':'Mozilla/5.0 Far-Beyound website migration/2.0'}

def norm(v:str)->str:return re.sub(r'\s+',' ',v or '').strip()

def main()->None:
    r=requests.get(URL,headers=HEADERS,timeout=25);r.raise_for_status();soup=BeautifulSoup(r.text,'html.parser')
    lines=[line for line in (norm(x) for x in soup.get_text('\n').splitlines()) if line]
    starts=[i for i,line in enumerate(lines) if line=='ABOUT US']
    start=starts[-1]+1 if starts else 0
    end=next((i for i in range(start,len(lines)) if lines[i]=='萬里資訊股份有限公司'),len(lines))
    body=[]
    for line in lines[start:end]:
        if line in {'關於我們','關於萬里','ABOUT US','完整、優質的産品系列：'}:continue
        if line.startswith(('台北 02-','台南 06-','Copyright ©')):continue
        if 8<=len(line)<=2200:body.append(line)
    body=list(dict.fromkeys(body))
    bullet_prefixes=('系統集成類産品：','機器設備類産品：','耗材類産品：','代工產品：')
    bullets=[line for line in body if line.startswith(bullet_prefixes)]
    paragraphs=[line for line in body if line not in bullets]
    if len(paragraphs)<4:raise RuntimeError(f'Only {len(paragraphs)} company profile paragraphs imported')
    if len(bullets)<4:raise RuntimeError(f'Only {len(bullets)} company profile product groups imported')
    payload={'generatedAt':datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),'source':'official-site','paragraphs':paragraphs,'bullets':bullets}
    OUT.write_text('// Generated from the current official Far-beyound website. Do not hand-edit.\nwindow.FBLegacyAbout = '+json.dumps(payload,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
    print('OFFICIAL_ABOUT_PARAGRAPHS=',len(paragraphs));print('OFFICIAL_ABOUT_BULLETS=',len(bullets))
if __name__=='__main__':main()
