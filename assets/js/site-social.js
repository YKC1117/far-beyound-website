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
