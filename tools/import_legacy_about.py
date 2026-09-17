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
SKIP={'關於我們','關於萬里','ABOUT US','首頁','產品資訊','系統方案','下載服務','成功案例','最新消息','聯絡我們','免費諮詢','萬里資訊股份有限公司','Far-beyound informational Co.','Follow us','所有其他商標均為各自所有者之財產'}

def norm(v:str)->str:return re.sub(r'\s+',' ',v or '').strip()

def main()->None:
    r=requests.get(URL,headers=HEADERS,timeout=25);r.raise_for_status();soup=BeautifulSoup(r.text,'html.parser')
    paragraphs=[];bullets=[]
    for el in soup.find_all(['p','li']):
        if el.find_parent(['nav','header','footer']):continue
        text=norm(el.get_text(' ',strip=True))
        if not text or text in SKIP or text.startswith(('台北 02-','台南 06-','Copyright ©')):continue
        if len(text)>2200:continue
        if el.name=='li':bullets.append(text)
        elif len(text)>=20:paragraphs.append(text)
    paragraphs=list(dict.fromkeys(paragraphs));bullets=list(dict.fromkeys(bullets))
    if len(paragraphs)<4:raise RuntimeError(f'Only {len(paragraphs)} company profile paragraphs imported')
    payload={'generatedAt':datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),'source':'official-site','paragraphs':paragraphs,'bullets':bullets}
    OUT.write_text('// Generated from the current official Far-beyound website. Do not hand-edit.\nwindow.FBLegacyAbout = '+json.dumps(payload,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
    print('OFFICIAL_ABOUT_PARAGRAPHS=',len(paragraphs));print('OFFICIAL_ABOUT_BULLETS=',len(bullets))
if __name__=='__main__':main()
