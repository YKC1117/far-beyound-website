(function(){
  if(!window.FBStore||window.__fbLegacyDownloadMerge)return;
  window.__fbLegacyDownloadMerge=true;
  const rawGet=FBStore.getData.bind(FBStore);
  const normalize=(v='')=>String(v).toLowerCase().replace(/[’'"“”()（）\[\]{}／/\\|｜:：,，.。\-–—_\s]+/g,'').replace(/bartender/g,'bartender');
  const sameBrand=(a,b)=>{
    const x=normalize(a),y=normalize(b);
    if(x===y)return true;
    if((x.includes('honeywell')||x.includes('datamax')||x.includes('intermec'))&&(y.includes('honeywell')||y.includes('datamax')||y.includes('intermec')))return true;
    return false;
  };
  function bestLink(item,links){
    const brandLinks=links.filter(x=>sameBrand(item.brand,x.brand));
    if(!brandLinks.length)return null;
    const target=normalize(item.name);
    let exact=brandLinks.find(x=>normalize(x.name)===target);if(exact)return exact;
    const scored=brandLinks.map(x=>{
      const n=normalize(x.name);let score=0;
      if(target&&n&&(target.includes(n)||n.includes(target)))score+=80;
      const words=String(item.name).toLowerCase().match(/[a-z]+\d[\w.-]*|\d+(?:\.\d+)+|[a-z]{2,}/g)||[];
      const hay=String(x.name).toLowerCase();words.forEach(w=>{if(hay.includes(w))score+=8});
      return [score,x];
    }).sort((a,b)=>b[0]-a[0]);
    return scored[0]&&scored[0][0]>=16?scored[0][1]:null;
  }
  FBStore.getData=function(){
    const d=rawGet(),legacy=window.FBLegacyDownloads;
    if(!legacy||!Array.isArray(legacy.downloads))return d;
    const links=legacy.downloads;
    (d.downloads||[]).forEach(item=>{
      const hit=bestLink(item,links);if(!hit)return;
      item.url=hit.url||item.url||'';
      item.sourcePage=hit.sourcePage||'';
      if(!item.version&&hit.version)item.version=hit.version;
      if(!item.updated&&hit.updated)item.updated=hit.updated;
      if(!item.size&&hit.size)item.size=hit.size;
      if(!item.note&&hit.note)item.note=hit.note;
    });
    // Also keep official-site download entries that are not yet represented in the curated list.
    links.forEach(link=>{
      const exists=(d.downloads||[]).some(x=>sameBrand(x.brand,link.brand)&&normalize(x.name)===normalize(link.name));
      if(!exists)d.downloads.push({brand:link.brand,category:link.category||'下載資源',name:link.name,version:link.version||'',updated:link.updated||'',size:link.size||'',note:link.note||'',url:link.url,sourcePage:link.sourcePage,legacyOrder:link.legacyOrder});
    });
    const order=legacy.downloadOrder||[];
    d.downloads.sort((a,b)=>{const ai=order.indexOf(a.brand),bi=order.indexOf(b.brand);if(ai!==bi)return(ai<0?999:ai)-(bi<0?999:bi);const ao=Number.isFinite(a.legacyOrder)?a.legacyOrder:9999,bo=Number.isFinite(b.legacyOrder)?b.legacyOrder:9999;return ao-bo});
    return d;
  };
})();
