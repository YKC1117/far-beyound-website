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
  function matchExisting(products,p){
    const pk=key(p.name);
    return products.find(x=>{
      const xk=key(x.name);
      if(!pk||!xk) return false;
      return xk===pk || (xk.length>5 && pk.includes(xk)) || (pk.length>5 && xk.includes(pk));
    });
  }
  function categoryIndex(d,id){const n=(d.categories||[]).findIndex(c=>c.id===id);return n<0?999:n}
  function brandIndex(cat,brand){
    const order=window.FBLegacyCatalog?.brandOrder?.[cat]||[];
    const n=order.indexOf(brand); return n<0?999:n;
  }
  FBStore.getData=function(){
    const d=rawGet();
    const catalog=window.FBLegacyCatalog;
    if(!catalog || !Array.isArray(catalog.products)) return d;

    catalog.products.forEach(p=>{
      const found=matchExisting(d.products,p);
      if(found){
        if(p.image) found.image=p.image;
        found.brandOrder=p.brandOrder;
        found.legacyOrder=p.legacyOrder;
        found.legacyUrl=p.legacyUrl;
        if(!found.family && p.family) found.family=p.family;
      } else {
        d.products.push(JSON.parse(JSON.stringify(p)));
      }
    });

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
