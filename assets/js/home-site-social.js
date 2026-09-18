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

  function loadHomeAux(){
    /* 首頁已直接載入 home-display-control / site-content-control，不重複注入。 */
    load(asset('assets/js/cloud-sync.js'),'social-cloud-sync');
    load(asset('assets/js/site-seo.js'),'site-seo');
    load(asset('assets/js/public-release-polish.js'),'public-release-polish');
    load(asset('assets/js/brand-home-guard.js'),'brand-home-guard');
    load(asset('assets/js/quick-contact-normalize.js'),'quick-contact-normalize');
    load(asset('assets/js/quick-contact-authority.js'),'quick-contact-authority');
    load(asset('assets/js/solution-coverage.js'),'solution-coverage');
  }

  function scheduleHomeAux(){
    const run=()=>loadHomeAux();
    if(document.readyState==='complete'){
      if('requestIdleCallback'in window)requestIdleCallback(run,{timeout:1200});
      else setTimeout(run,250);
    }else{
      window.addEventListener('load',()=>{
        if('requestIdleCallback'in window)requestIdleCallback(run,{timeout:1200});
        else setTimeout(run,250);
      },{once:true});
    }
  }

  function run(){
    sync();
    scheduleHomeAux();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',run,{once:true});
  }else{
    run();
  }

  window.addEventListener('load',()=>setTimeout(sync,120),{once:true});
  window.addEventListener('farbeyound:datachange',()=>setTimeout(sync,60));
})();
