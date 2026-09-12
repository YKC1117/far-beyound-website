(function(){
  if(!window.FBStore || window.__fbLegacyCatalogMerge) return;
  window.__fbLegacyCatalogMerge = true;

  const rawGet = FBStore.getData.bind(FBStore);
  const COMMON = ['工業型條碼列印機','商業型條碼列印機','桌上型條碼列印機','攜帶型標籤條碼列印機','標籤條碼列印機','條碼列印機','條碼掃描器','工業型','商業型','桌上型','攜帶型','通用型','超耐用型','固定式'];
  const CATEGORY_SLUG={printers:'printer',scanners:'scanner',rfid:'rfid',mobile:'mobile',labels:'labels',printing:'printing',software:'software',parts:'parts'};
  const FASTECH_FALLBACK={labels:'label',printing:'label-printing',software:'label-software',parts:'printer-parts',rfid:'rfid',mobile:'mobile',printers:'printer',scanners:'scanner'};
  const CURATED_IDS=new Set(['software-bartender','software-codesoft','urovo-enterprise-mobile','legacy-bartender-5382ba34','legacy-codesoft-71391e24']);
  function key(v=''){
    let s=String(v).toLowerCase().replace(/[／/|｜・·()（）\-\s]/g,'');
    COMMON.forEach(x=>{s=s.replace(x.toLowerCase().replace(/[／/|｜・·()（）\-\s]/g,''),'')});
    return s;
  }
  function isMatch(a,b){
    const ak=key(a),bk=key(b);
    if(!ak||!bk)return false;
    return ak===bk || (ak.length>5&&bk.includes(ak)) || (bk.length>5&&ak.includes(bk));
  }
  function asciiSlug(v=''){
    return String(v).normalize('NFKD').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  }
  function fastechKeyword(p){
    const name=String(p.name||''), text=[p.name,p.family,p.type].filter(Boolean).join(' ');
    if(/bartender/i.test(text))return 'bartender';
    if(/codesoft/i.test(text))return 'codesoft';
    if(/聚醯亞胺|\bpi\b/i.test(text)){
      const bits=['pi'];
      const num=name.match(/(\d+)\s*番/);if(num)bits.push(num[1]);
      if(/抗靜電/.test(text))bits.push('antistatic');
      else if(/亮面/.test(text))bits.push('gloss');
      else if(/霧面/.test(text))bits.push('matte');
      if(/助焊劑/.test(text))bits.push('flux');
      return bits.join('-');
    }
    if(/全樹脂碳帶/.test(text))return 'resin-ribbon';
    if(/半[臘蠟]半樹脂碳帶/.test(text))return 'wax-resin-ribbon';
    if(/全[臘蠟]碳帶/.test(text))return 'wax-ribbon';
    if(/彩色碳帶/.test(text))return 'color-ribbon';
    if(/銅版標籤紙/.test(text))return 'coated-label';
    if(/染色標籤紙/.test(text))return 'color-label';
    if(/反銀龍|消銀龍/.test(text))return 'silver-label';
    if(/珠光紙/.test(text))return 'pearl-label';
    if(/白色特多龍/.test(text))return 'white-polyester-label';
    if(/熱感紙|熱感貼紙/.test(text))return 'thermal-label';
    if(/透明麗龍|透明特多龍/.test(text))return 'clear-label';
    if(/紙卡|吊牌/.test(text))return 'hang-tag';
    if(/hifi/i.test(text))return 'hifi-label';
    if(/易碎紙/.test(text))return 'fragile-label';
    if(/水洗標|布標/.test(text))return p.category==='printing'?'garment-label-printing':'wash-label';
    if(/防偽貼紙/.test(text))return 'security-label';
    if(p.category==='printing'){
      if(/物流|流通/.test(text))return 'logistics-label-printing';
      if(/食品|美容|藥品|彩妝/.test(text))return 'product-label-printing';
      return 'label-printing';
    }
    if(/外掛紙捲架|紙捲架/.test(text))return 'roll-holder';
    if(/列印頭|印字頭|printhead/i.test(text))return 'printhead';
    if(/維修/.test(text))return 'printer-service';
    if(/配件|零件/.test(text))return 'printer-parts';
    const asciiName=asciiSlug(name);
    if(asciiName)return asciiName;
    return FASTECH_FALLBACK[p.category]||CATEGORY_SLUG[p.category]||'product';
  }
  function publicSlugBase(p){
    const brand=asciiSlug(p.brand);
    const name=asciiSlug(p.name);
    const family=asciiSlug(p.family);
    const category=CATEGORY_SLUG[p.category]||asciiSlug(p.category)||'product';
    if(!brand){
      return `fastech-${fastechKeyword(p)}`.replace(/-+/g,'-').replace(/^-+|-+$/g,'');
    }
    let base=name;
    if(base && base!==brand && !base.startsWith(brand+'-')) base=`${brand}-${base}`;
    if(!base && family) base=family!==brand?`${brand}-${family}`:family;
    if(!base) base=brand||category;
    if(base===brand && family && family!==brand) base=`${brand}-${family}`;
    if(base===brand || base===category){
      const tail=(String(p.legacyUrl||'').match(/(\d+)\/?$/)||[])[1]||String((p.legacyOrder??0)+1);
      base=`${base}-${tail}`;
    }
    return base.replace(/-+/g,'-').replace(/^-+|-+$/g,'')||`product-${(p.legacyOrder??0)+1}`;
  }
  function assignPublicSlugs(items){
    const used=new Set();
    items.forEach(p=>{
      if(CURATED_IDS.has(String(p.id||''))){used.add(p.id);return;}
      const base=String(p.publicId||'').trim()||publicSlugBase(p);
      let slug=base;
      if(used.has(slug)) slug=`${base}-${CATEGORY_SLUG[p.category]||asciiSlug(p.category)||'product'}`;
      if(used.has(slug)){
        const tail=(String(p.legacyUrl||'').match(/(\d+)\/?$/)||[])[1]||String((p.legacyOrder??0)+1);
        slug=`${base}-${tail}`;
      }
      const root=slug;let n=2;while(used.has(slug))slug=`${root}-${n++}`;
      p.slug=slug;used.add(slug);
      // Public URLs use only the readable canonical id. Imported and earlier curated ids remain aliases.
      if(p.legacyUrl){
        if(!p.sourceId)p.sourceId=p.id;
        p.id=slug;
      }
    });
  }
  function categoryIndex(d,id){const n=(d.categories||[]).findIndex(c=>c.id===id);return n<0?999:n}
  function brandIndex(cat,brand){
    const order=window.FBLegacyCatalog?.brandOrder?.[cat]||[];
    const n=order.indexOf(brand); return n<0?999:n;
  }
  function enrichOfficial(catalogProducts,existing){
    const used=new Set();
    return catalogProducts.map(source=>{
      const p=JSON.parse(JSON.stringify(source));
      const idx=existing.findIndex((x,i)=>!used.has(i) && x.category===p.category && x.brand===p.brand && isMatch(x.name,p.name));
      if(idx<0)return p;
      used.add(idx);
      const curated=existing[idx];
      // The official catalog is authoritative for placement/order/source/image.
      // Earlier hand-curated records only enrich copy/specs/files/featured status.
      return {
        ...p,
        id: curated.id || p.id,
        sourceId: p.id,
        curatedId: curated.id || '',
        name: curated.name || p.name,
        subtitle: curated.subtitle || p.subtitle,
        family: curated.family || p.family,
        type: curated.type || p.type,
        status: curated.status || p.status,
        device: curated.device || p.device,
        intro: curated.intro || p.intro,
        highlights: curated.highlights?.length ? curated.highlights : p.highlights,
        specs: curated.specs?.length ? curated.specs : p.specs,
        files: curated.files?.length ? curated.files : p.files,
        featured: !!curated.featured,
        image: p.image || curated.image || '',
        category: p.category,
        brand: p.brand,
        brandOrder: p.brandOrder,
        legacyOrder: p.legacyOrder,
        legacyUrl: p.legacyUrl
      };
    });
  }
  FBStore.getData=function(){
    const d=rawGet();
    const catalog=window.FBLegacyCatalog;
    if(!catalog || !Array.isArray(catalog.products)) return d;

    const existing=(d.products||[]).slice();
    const official=enrichOfficial(catalog.products,existing).filter(p=>!((p.category==='software'&&/bartender|codesoft/i.test(String(p.name||'')))||String(p.brand||'').toUpperCase()==='UROVO'));
    // Keep products explicitly created from the demo admin and curated product pages that fill gaps in the old website catalog.
    const custom=existing.filter(x=>/^product-\d+$/.test(String(x.id||''))||CURATED_IDS.has(String(x.id||'')));
    d.products=[...official,...custom];

    d.products.sort((a,b)=>{
      const ca=categoryIndex(d,a.category), cb=categoryIndex(d,b.category);
      if(ca!==cb) return ca-cb;
      const ba=Number.isFinite(a.brandOrder)?a.brandOrder:brandIndex(a.category,a.brand);
      const bb=Number.isFinite(b.brandOrder)?b.brandOrder:brandIndex(b.category,b.brand);
      if(ba!==bb) return ba-bb;
      const oa=Number.isFinite(a.legacyOrder)?a.legacyOrder:9999;
      const ob=Number.isFinite(b.legacyOrder)?b.legacyOrder:9999;
      return oa-ob;
    });
    assignPublicSlugs(d.products);
    return d;
  };

  window.FBOfficialOrder={
    brandOrder:()=>window.FBLegacyCatalog?.brandOrder||{
      printers:['Zebra','Argox','TSC','GoDEX','TOSHIBA','SATO','Honeywell'],
      scanners:['Fastech','Zebra','Honeywell','NUMA','Datalogic'],
      rfid:['Zebra'],mobile:['Zebra'],labels:['標籤貼紙','耐溫貼紙','碳帶'],printing:['代印服務'],software:['標籤軟體'],parts:['Zebra','Argox','TSC','GoDEX','SATO','外掛紙捲架']
    },
    agency:()=>window.FBLegacyCatalog?.agencyOrder||['Zebra','Argox','TSC','GoDEX','TOSHIBA','SATO','Honeywell','Fastech','NUMA','Datalogic'],
    downloads:()=>window.FBLegacyCatalog?.downloadOrder||['Zebra','Argox','TSC','GoDEX','TOSHIBA','SATO','Honeywell','遠端連線','Microsoft']
  };
})();