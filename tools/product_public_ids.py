import re
import unicodedata

CATEGORY_SLUG={'printers':'printer','scanners':'scanner','rfid':'rfid','mobile':'mobile','labels':'labels','printing':'printing','software':'software','parts':'parts'}
HARDWARE_CATEGORIES={'printers','scanners','rfid','mobile'}


def ascii_slug(value=''):
    text=unicodedata.normalize('NFKD',str(value or '')).lower().replace('&',' and ')
    return re.sub(r'^-+|-+$','',re.sub(r'[^a-z0-9]+','-',text))


def service_keyword(p):
    name=str(p.get('name') or '')
    text=' '.join(str(p.get(k) or '') for k in ('name','family','type'))
    checks=[
        (r'bartender','bartender'),(r'codesoft','codesoft'),
        (r'全樹脂碳帶','resin-ribbon'),(r'半[臘蠟]半樹脂碳帶','wax-resin-ribbon'),(r'全[臘蠟]碳帶','wax-ribbon'),
        (r'彩色碳帶','color-ribbon'),(r'銅版標籤紙','coated-label'),(r'染色標籤紙','color-label'),
        (r'反銀龍|消銀龍','silver-label'),(r'珠光紙','pearl-label'),(r'白色特多龍','white-polyester-label'),
        (r'熱感紙|熱感貼紙','thermal-label'),(r'透明麗龍|透明特多龍','clear-label'),(r'紙卡|吊牌','hang-tag'),
        (r'hifi','hifi-label'),(r'易碎紙','fragile-label'),(r'防偽貼紙','security-label'),
        (r'外掛紙捲架|紙捲架','roll-holder'),(r'列印頭|印字頭|printhead','printhead'),
    ]
    for pattern,slug in checks:
        if re.search(pattern,text,re.I): return slug
    if re.search(r'聚醯亞胺|\bpi\b',text,re.I):
        bits=['pi']; m=re.search(r'(\d+)\s*番',name)
        if m: bits.append(m.group(1))
        if '抗靜電' in text: bits.append('antistatic')
        elif '亮面' in text: bits.append('gloss')
        elif '霧面' in text: bits.append('matte')
        if '助焊劑' in text: bits.append('flux')
        return '-'.join(bits)
    if '水洗標' in text or '布標' in text:
        return 'garment-label-printing' if p.get('category')=='printing' else 'wash-label'
    if p.get('category')=='printing':
        if '物流' in text or '流通' in text: return 'logistics-label-printing'
        if any(x in text for x in ('食品','美容','藥品','彩妝')): return 'product-label-printing'
        return 'label-printing'
    return ascii_slug(name) or CATEGORY_SLUG.get(p.get('category')) or 'product'


def base_id(p):
    brand=ascii_slug(p.get('brand')); name=ascii_slug(p.get('name')); family=ascii_slug(p.get('family'))
    if p.get('category')=='software' and re.search(r'bartender',str(p.get('name') or ''),re.I): return 'software-bartender'
    if p.get('category')=='software' and re.search(r'codesoft',str(p.get('name') or ''),re.I): return 'software-codesoft'
    if not brand: return 'fastech-'+service_keyword(p)
    if p.get('category')=='parts' and (not name or name==brand): return brand+'-'+service_keyword(p)
    value=name
    if value and value!=brand and not value.startswith(brand+'-'): value=brand+'-'+value
    if not value and family: value=brand+'-'+family if family!=brand else family
    if not value: value=brand
    if value==brand and family and family!=brand: value=brand+'-'+family
    if value==brand:
        value=brand+'-'+service_keyword(p)
    return re.sub(r'-+','-',value).strip('-')


def assign_public_ids(products):
    used=set(); out=[]
    for p in products:
        root=str(p.get('publicId') or '').strip() or base_id(p)
        slug=root
        if slug in used: slug=root+'-'+(CATEGORY_SLUG.get(p.get('category')) or 'product')
        if slug in used:
            m=re.search(r'(\d+)/?$',str(p.get('legacyUrl') or ''))
            slug=root+'-'+(m.group(1) if m else str(int(p.get('legacyOrder',0))+1))
        n=2; base=slug
        while slug in used:
            slug=f'{base}-{n}'; n+=1
        if slug.startswith('legacy-'): raise ValueError(f'legacy public id: {slug}')
        if p.get('category') in HARDWARE_CATEGORIES:
            brand=ascii_slug(p.get('brand'))
            if not brand or not slug.startswith(brand+'-'):
                raise ValueError(f'hardware id must be brand+model: {p.get("name")} -> {slug}')
        used.add(slug); out.append((p,slug))
    return out
