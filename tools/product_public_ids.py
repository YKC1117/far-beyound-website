import re
import unicodedata
from urllib.parse import urlsplit

CATEGORY_SLUG={'printers':'printer','scanners':'scanner','rfid':'rfid','mobile':'mobile','labels':'labels','printing':'printing','software':'software','parts':'parts'}
HARDWARE_CATEGORIES={'printers','scanners','rfid','mobile'}

# Old listing titles are sometimes generic even though the detail page contains the exact models.
VERIFIED_PATH_IDS={
    '/product/1/22/33/181':'tsc-da210-da220',
    '/product/1/22/93/180':'tsc-alpha-3r-alpha-30r-alpha-30l-alpha-30lhc',
}


def ascii_slug(value=''):
    text=unicodedata.normalize('NFKD',str(value or '')).lower().replace('&',' and ').replace('+',' plus ')
    return re.sub(r'^-+|-+$','',re.sub(r'[^a-z0-9]+','-',text))


def normalize_model_slug(value):
    tokens=[x for x in str(value or '').split('-') if x]
    compact=[]
    for token in tokens:
        if compact and token==compact[-1]:
            continue
        if compact and token.isdigit():
            m=re.fullmatch(r'([a-z]+)(\d+)',compact[-1])
            if m:
                token=m.group(1)+token
        compact.append(token)
    return '-'.join(compact)


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
        (r'外掛紙捲架|紙捲架','roll-holder'),
        (r'列印頭|印字頭|printhead','printhead'),(r'滾軸','platen-roller'),(r'皮帶','drive-belt'),
        (r'擴充卡','expansion-card'),(r'標籤剝離器.*回捲器|剝離器.*回捲器','peeler-rewinder'),
        (r'標籤剝離.*裁刀|剝離.*裁刀','peeler-cutter'),(r'切紙器|裁刀|標籤裁刀','cutter'),
        (r'rfid模組|抗金屬模組','rfid-module'),(r'馬達','motor'),(r'碳帶軸心','ribbon-spindle'),
        (r'變壓器','power-adapter'),(r'齒輪','gear'),
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
    legacy_path=urlsplit(str(p.get('legacyUrl') or '')).path
    if legacy_path in VERIFIED_PATH_IDS:
        return VERIFIED_PATH_IDS[legacy_path]
    brand=ascii_slug(p.get('brand')); name=ascii_slug(p.get('name')); family=ascii_slug(p.get('family'))
    if p.get('category')=='software' and re.search(r'bartender',str(p.get('name') or ''),re.I): return 'software-bartender'
    if p.get('category')=='software' and re.search(r'codesoft',str(p.get('name') or ''),re.I): return 'software-codesoft'
    if not brand: return normalize_model_slug('fastech-'+service_keyword(p))
    if p.get('category')=='parts': return normalize_model_slug(brand+'-'+service_keyword(p))
    value=name
    if value and value!=brand and not value.startswith(brand+'-'): value=brand+'-'+value
    if not value and family: value=brand+'-'+family if family!=brand else family
    if not value: value=brand
    if value==brand and family and family!=brand: value=brand+'-'+family
    if value==brand: value=brand+'-'+service_keyword(p)
    return normalize_model_slug(value)


def assign_public_ids(products):
    used=set(); out=[]
    for p in products:
        root=str(p.get('publicId') or '').strip() or base_id(p)
        slug=normalize_model_slug(root)
        if slug in used: slug=normalize_model_slug(root+'-'+(CATEGORY_SLUG.get(p.get('category')) or 'product'))
        if slug in used:
            m=re.search(r'(\d+)/?$',str(p.get('legacyUrl') or ''))
            slug=normalize_model_slug(root+'-'+(m.group(1) if m else str(int(p.get('legacyOrder',0))+1)))
        n=2; base=slug
        while slug in used:
            slug=f'{base}-{n}'; n+=1
        if slug.startswith('legacy-'): raise ValueError(f'legacy public id: {slug}')
        if re.search(r'(^|-)(zebra-zebra|tsc-tsc|argox-argox|godex-godex|sato-sato)(-|$)',slug):
            raise ValueError(f'duplicated brand in public id: {slug}')
        if p.get('category') in HARDWARE_CATEGORIES:
            brand=ascii_slug(p.get('brand'))
            if not brand or not slug.startswith(brand+'-'):
                raise ValueError(f'hardware id must be brand+model: {p.get("name")} -> {slug}')
        used.add(slug); out.append((p,slug))
    return out
