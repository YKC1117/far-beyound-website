(function(){
  if(!window.FBStore||!window.FBLegacyCatalog||window.__fbOfficialSourceAuthority)return;
  window.__fbOfficialSourceAuthority=true;

  const rawGet=FBStore.getData.bind(FBStore);
  const sourceById=new Map((window.FBLegacyCatalog.products||[]).map(item=>[String(item.id||''),item]));
  const docs=window.FBProductDocs?.items||{};
  const clone=value=>JSON.parse(JSON.stringify(value));

  function officialFiles(source){
    const embedded=Array.isArray(source?.files)?source.files.filter(file=>file&&file.url):[];
    const imported=Array.isArray(docs[source?.legacyUrl])?docs[source.legacyUrl].filter(file=>file&&file.url):[];
    const rows=[...embedded,...imported],seen=new Set(),out=[];
    rows.forEach(file=>{
      const sig=`${String(file.label||'').trim().toLowerCase()}|${String(file.url||'').trim()}`;
      if(!file.url||seen.has(sig))return;
      seen.add(sig);
      out.push({label:file.label||'技術文件',type:file.type||(/\.pdf(?:$|[?#])/i.test(file.url)?'PDF':'文件'),url:file.url,source:'official'});
    });
    return out;
  }

  function hasUsefulSpecs(specs){
    return Array.isArray(specs)&&specs.length&&!(specs.length===2&&specs.some(row=>row?.[0]==='原官網分類'));
  }

  FBStore.getData=function(){
    const data=rawGet();
    (data.products||[]).forEach(product=>{
      const source=sourceById.get(String(product.sourceId||''));
      if(!source)return;
      product.name=source.name||product.name;
      product.category=source.category||product.category;
      product.brand=source.brand||product.brand;
      product.family=source.family||product.family;
      product.type=source.type||product.type;
      product.subtitle=source.subtitle||product.subtitle;
      product.status=source.status||product.status;
      product.device=source.device||product.device;
      product.intro=source.intro||product.intro;
      if(Array.isArray(source.highlights)&&source.highlights.length)product.highlights=clone(source.highlights);
      if(hasUsefulSpecs(source.specs))product.specs=clone(source.specs);
      if(source.image)product.image=source.image;
      const files=officialFiles(source);
      if(files.length)product.files=files;
      product.officialSource=true;
    });
    return data;
  };
})();
