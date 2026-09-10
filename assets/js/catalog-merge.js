(function(){
  if(!window.FBStore || window.__fbLegacyCatalogMerge) return;
  window.__fbLegacyCatalogMerge = true;

  const rawGet = FBStore.getData.bind(FBStore);
  const COMMON = ['工業型條碼列印機','商業型條碼列印機','桌上型條碼列印機','攜帶型標籤條碼列印機','標籤條碼列印機','條碼列印機','條碼掃描器','工業型','商業型','桌上型','攜帶型','通用型','超耐用型','固定式'];
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
