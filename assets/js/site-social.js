window.FBSocialLinks=window.FBSocialLinks||{youtube:'https://www.youtube.com/@FastechTaiwan'};
(function(){
  'use strict';

  const PUBLIC_BUILD=(()=>{
    try{return new URL(document.currentScript?.src||'',location.href).searchParams.get('v')||'20260918-0945'}
    catch(_){return'20260918-0945'}
  })();
  const asset=path=>`${path}?v=${encodeURIComponent(PUBLIC_BUILD)}`;

  function sync(){
    const d=window.FBStore?.getData?.(),site=d?.site||{};
    if(site.youtube)window.FBSocialLinks.youtube=site.youtube;
    if(site.line)window.FBSocialLinks.line=site.line;
  }

  function load(src,key){
    const base=src.split('?')[0];
    if(
      document.querySelector(`script[data-${key}]`)||
      document.querySelector(`script[src^="${base}"]`)||
      document.querySelector(`link[data-${key}]`)||
      document.querySelector(`link[href^="${base}"]`)
    )return;

    const isCss=src.endsWith('.css');
    const node=document.createElement(isCss?'link':'script');
    if(isCss){
      node.rel='stylesheet';
      node.href=src;
    }else{
      node.src=src;
      node.defer=true;
    }
    node.setAttribute(`data-${key}`,'1');
    document.head.appendChild(node);
  }

  function run(){
    sync();

    const page=document.body?.dataset?.page||'';

    /* 全站共用功能 */
    load(asset('assets/js/cloud-sync.js'),'social-cloud-sync');
    load(asset('assets/js/site-content-control.js'),'social-content');
    load(asset('assets/js/site-seo.js'),'site-seo');
    load(asset('assets/js/site-display-control.js'),'social-display');
    load(asset('assets/js/public-release-polish.js'),'public-release-polish');
    load(asset('assets/js/brand-home-guard.js'),'brand-home-guard');
    load(asset('assets/js/quick-contact-normalize.js'),'quick-contact-normalize');
    load(asset('assets/js/quick-contact-authority.js'),'quick-contact-authority');

    /* 只有有內頁 Hero 設定的頁面才載入 */
    if(['products','downloads','solutions','cases','news','about','locations','contact'].includes(page)){
      load(asset('assets/js/page-settings-control.js'),'social-pages');
    }

    /* 歷史消息資料只在消息頁使用，避免首頁額外解析整份 archive */
    if(page==='news'||page==='news-detail'){
      load(asset('assets/js/legacy-news.js'),'legacy-news');
      load(asset('assets/js/news-archive-runtime.js'),'news-archive-runtime');
    }

    /* 方案補齊只在首頁與方案頁需要 */
    if(page==='home'||page==='solutions'){
      load(asset('assets/js/solution-coverage.js'),'solution-coverage');
    }

    if(page==='cases'){
      load(asset('assets/js/case-category-runtime.js'),'case-category-runtime');
    }

    if(page==='product'){
      load(asset('assets/js/product-route-guard.js'),'product-route-guard');
    }
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',run,{once:true});
  }else{
    run();
  }

  window.addEventListener('load',()=>setTimeout(sync,120),{once:true});
  window.addEventListener('farbeyound:datachange',()=>setTimeout(sync,60));
})();


/* 2026-09-18｜產品圖片快取版本保護
   Supabase/動態渲染若仍回傳未帶版本的 catalog/products 圖片路徑，
   自動補上目前 build，避免瀏覽器沿用先前白底或舊壓縮圖片。 */
(function(){
  'use strict';
  const BUILD='20260918-1455';
  const LOCAL_IMAGE=/\/assets\/images\/(?:catalog|products)\//i;

  function normalize(img){
    const raw=img?.getAttribute?.('src')||'';
    if(!raw||raw.startsWith('data:')||raw.startsWith('blob:'))return;
    let url;
    try{url=new URL(raw,location.href)}catch(_){return}
    if(url.origin!==location.origin||!LOCAL_IMAGE.test(url.pathname))return;
    if(url.searchParams.get('v')===BUILD)return;
    url.searchParams.set('v',BUILD);
    img.setAttribute('src',url.href);
  }

  function scan(root=document){
    if(root instanceof HTMLImageElement)normalize(root);
    root.querySelectorAll?.('img[src]').forEach(normalize);
  }

  const start=()=>{
    scan();
    new MutationObserver(records=>{
      records.forEach(record=>{
        if(record.type==='attributes')normalize(record.target);
        record.addedNodes.forEach(node=>{if(node.nodeType===1)scan(node)});
      });
    }).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['src']});
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
