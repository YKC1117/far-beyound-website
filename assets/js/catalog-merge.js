(function(){
  if(!window.FBStore || window.__fbLegacyCatalogMerge) return;
  window.__fbLegacyCatalogMerge = true;

  const rawGet = FBStore.getData.bind(FBStore);
  const COMMON = ['工業型條碼列印機','商業型條碼列印機','桌上型條碼列印機','攜帶型標籤條碼列印機','標籤條碼列印機','條碼列印機','條碼掃描器','工業型','商業型','桌上型','攜帶型','通用型','超耐用型','固定式'];
  const CATEGORY_SLUG={printers:'printer',scanners:'scanner',rfid:'rfid',mobile:'mobile',labels:'labels',printing:'printing',software:'software',parts:'parts'};
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
  function publicSlugBase(p){
    const brand=asciiSlug(p.brand);
    const name=asciiSlug(p.name);
    const family=asciiSlug(p.family);
    const category=CATEGORY_SLUG[p.category]||asciiSlug(p.category)||'product';
    let base=name;
    if(base && brand && base!==brand && !base.startsWith(brand+'-')) base=`${brand}-${base}`;
    if(!base && family) base=brand&&family!==brand?`${brand}-${family}`:family;
    if(!base) base=brand||category;
    if(base===brand && family && family!==brand) base=`${brand}-${family}`;
    if(!brand && !base.startsWith(category+'-')) base=`${category}-${base}`;
    if(base===brand || base===category){
      const tail=(String(p.legacyUrl||'').match(/(\d+)\/?$/)||[])[1]||String((p.legacyOrder??0)+1);
      base=`${base}-${tail}`;
    }
    return base.replace(/-+/g,'-').replace(/^-+|-+$/g,'')||`product-${(p.legacyOrder??0)+1}`;
  }
  function assignPublicSlugs(items){
    const used=new Set();
    items.forEach(p=>{
      const base=publicSlugBase(p);
      let slug=base;
      if(used.has(slug)) slug=`${base}-${CATEGORY_SLUG[p.category]||asciiSlug(p.category)||'product'}`;
      if(used.has(slug)){
        const tail=(String(p.legacyUrl||'').match(/(\d+)\/?$/)||[])[1]||String((p.legacyOrder??0)+1);
        slug=`${base}-${tail}`;
      }
      const root=slug;let n=2;while(used.has(slug))slug=`${root}-${n++}`;
      p.slug=slug;used.add(slug);
      // Official items expose the readable brand/model slug as their public id.
      // sourceId retains the imported/curated identifier for migration diagnostics.
      if(p.legacyUrl){p.sourceId=p.id;p.id=slug;}
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
    const official=enrichOfficial(catalog.products,existing);
    // Keep only products explicitly created from the demo admin in addition to the official inventory.
    const custom=existing.filter(x=>/^product-\d+$/.test(String(x.id||'')));
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
