window.FBSocialLinks=window.FBSocialLinks||{youtube:'https://www.youtube.com/@FastechTaiwan'};
(function(){
  'use strict';

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
    load('assets/js/cloud-sync.js?v=20260912-0824','social-cloud-sync');
    load('assets/js/site-content-control.js?v=20260912-1526','social-content');
    load('assets/js/site-seo.js?v=20260912-1526','site-seo');
    load('assets/js/site-display-control.js?v=20260915-0946','social-display');
    load('assets/js/public-release-polish.js?v=20260912-1716','public-release-polish');
    load('assets/js/brand-home-guard.js?v=20260914-1900','brand-home-guard');
    load('assets/js/quick-contact-normalize.js?v=20260915-0946','quick-contact-normalize');
    load('assets/js/quick-contact-authority.js?v=20260915-0946','quick-contact-authority');

    /* 只有有內頁 Hero 設定的頁面才載入 */
    if(['products','downloads','solutions','cases','news','about','locations','contact'].includes(page)){
      load('assets/js/page-settings-control.js?v=20260912-0818','social-pages');
    }

    /* 歷史消息資料只在消息頁使用，避免首頁額外解析整份 archive */
    if(page==='news'||page==='news-detail'){
      load('assets/js/legacy-news.js?v=20260912-1956','legacy-news');
      load('assets/js/news-archive-runtime.js?v=20260912-2005','news-archive-runtime');
    }

    /* 方案補齊只在首頁與方案頁需要 */
    if(page==='home'||page==='solutions'){
      load('assets/js/solution-coverage.js?v=20260912-1956','solution-coverage');
    }

    if(page==='cases'){
      load('assets/js/case-category-runtime.js?v=20260912-2008','case-category-runtime');
    }

    if(page==='product'){
      load('assets/js/product-route-guard.js?v=20260912-2022','product-route-guard');
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
