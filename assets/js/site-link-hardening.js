(function(){
  'use strict';
  if(window.__fbSiteLinkHardening)return;
  window.__fbSiteLinkHardening=true;

  const OFFICIAL={
    zebraWindows:'https://www.zebra.com/us/en/support-downloads/drivers-operating-systems-firmware.html',
    zebraCpclEpl:'https://www.zebra.com/us/en/support-downloads/drivers-operating-systems-firmware.html',
    godexSeagull:'https://admin.seagullscientific.com/resources/printer-drivers',
    honeywellPx240s:'https://prod-edam.honeywell.com/content/dam/honeywell-edam/sps/ppr/zh-cn/public/products/printers/industrial/px240/sps-ppr-px240s-en-ug.pdf'
  };

  function patchDownloads(){
    const list=window.FBLegacyDownloads?.downloads;
    if(!Array.isArray(list))return false;
    let changed=false;
    list.forEach(item=>{
      if(!item)return;
      if(item.name==='推薦用此驅動程式在您的標籤列印機' && item.brand==='Zebra'){
        item.url=OFFICIAL.zebraWindows;
        item.note='Zebra 官方驅動下載頁；請依印表機型號選擇適用的 ZDesigner Windows Driver。';
        changed=true;
      }
      if(item.brand==='Zebra' && item.category==='驅動程式' && item.name.indexOf('CPCL')>=0){
        item.url=OFFICIAL.zebraCpclEpl;
        item.note='Zebra 官方驅動下載頁；CPCL/EPL 舊型印表機請依原廠相容性說明選擇 ZDesigner v5。';
        changed=true;
      }
      if(item.name==='Godex Seagull driver 12.6 (Bartender)' && item.brand==='GoDEX'){
        item.url=OFFICIAL.godexSeagull;
        item.note='Seagull Scientific 官方 Drivers by Seagull 下載頁；目前 12.6 為最新系列。';
        changed=true;
      }
    });
    return changed;
  }

  function patchProductDocs(){
    const docs=window.FBProductDocs?.items;
    if(!docs)return false;
    let changed=false;
    Object.values(docs).forEach(entries=>{
      if(!Array.isArray(entries))return;
      entries.forEach(item=>{
        if(item&&item.url&&/zhaoqianht\.com/i.test(item.url)){
          item.url=OFFICIAL.honeywellPx240s;
          item.type='PDF';
          changed=true;
        }
      });
    });
    return changed;
  }

  function run(){
    patchDownloads();
    patchProductDocs();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});
  else run();
  [120,500,1200,2500].forEach(t=>setTimeout(run,t));
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,100));
})();
