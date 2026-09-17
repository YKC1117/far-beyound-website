(function(){
  if(!window.FBStore||window.__fbLegacyDownloadMerge)return;
  window.__fbLegacyDownloadMerge=true;

  const rawGet=FBStore.getData.bind(FBStore);
  const clean=v=>String(v||'').trim();
  const normalize=v=>clean(v).toLowerCase().replace(/[’'"“”()（）\[\]{}／/\\|｜:：,，.。\-–—_\s]+/g,'');

  function readableName(item){
    const original=clean(item.name);
    if(original&&original!=='萬里資訊'&&!/SFIS生產管控系統/.test(original)&&original.length<=100)return original;
    const url=clean(item.url),low=url.toLowerCase();
    if(/zddriver-v10/.test(low))return'Zebra Windows Printer Driver v10';
    if(/zd5117/.test(low))return'Zebra Windows Printer Driver v5';
    if(/zpl-zbi2/.test(low))return'Zebra ZPL Programming Guide';
    if(/rfid3-pg/.test(low))return'Zebra RFID Programming Guide';
    try{
      const u=new URL(url),file=decodeURIComponent(u.pathname.split('/').filter(Boolean).pop()||'').replace(/\.(zip|exe|msi|dmg|pkg|pdf|rar|7z|gz|tgz|tar)$/i,'').replace(/[_-]+/g,' ').trim();
      if(file&&file.length>=4&&!/^\d+$/.test(file))return`${item.brand} ${file}`.replace(/\s+/g,' ').trim();
    }catch(_){ }
    return`${item.brand||'其他'} ${item.category||'下載資源'}`;
  }

  function cleanItem(raw){
    const item={...raw};
    item.name=readableName(item);
    if(item.note==='SFIS生產管控系統'||item.note===item.updated)item.note='';
    if(item.version&&(/兼容。|MB$|GB$|KB$/i.test(item.version)||item.version.length>45))item.version='';
    if(item.size==='0 MB')item.size='';
    return item;
  }

  FBStore.getData=function(){
    const data=rawGet(),legacy=window.FBLegacyDownloads;
    if(!legacy||!Array.isArray(legacy.downloads)||!legacy.downloads.length)return data;
    const seen=new Set();
    data.downloads=legacy.downloads.map(cleanItem).filter(item=>{
      const sig=`${normalize(item.brand)}|${normalize(item.category)}|${normalize(item.name)}|${clean(item.url)}`;
      if(!item.url||seen.has(sig))return false;
      seen.add(sig);return true;
    });
    return data;
  };
})();
