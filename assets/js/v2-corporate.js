(function(){
  const LOGO='assets/images/brand/far-beyound-logo.png';
  function cleanPreviewArtifacts(){
    document.querySelectorAll('.download-cta').forEach(el=>{if(/測試版|preview/i.test(el.textContent))el.textContent='下載';});
    document.querySelectorAll('.empty-state').forEach(el=>{
      const b=el.querySelector('b'),s=el.querySelector('span');
      if(b&&/展示產品|展示文件/.test(b.textContent))b.textContent=b.textContent.replace('展示產品','產品').replace('展示文件','文件');
      if(s&&/正式版|管理介面|後台/.test(s.textContent))s.textContent='如需相關資料，歡迎與我們聯絡。';
    });
    document.querySelectorAll('.footer-bottom span').forEach(el=>{
      if(/新版網站|PREVIEW|v0\.|網站提案預覽環境/i.test(el.textContent))el.textContent='企業條碼與自動識別整合服務';
    });
  }
  function syncCurrentNav(){
    const page=document.body.dataset.page||'';
    const targets={
      products:['products.html'],product:['products.html'],
      downloads:['downloads.html'],solutions:['solutions.html'],cases:['cases.html'],
      news:['news.html'],'news-detail':['news.html'],
      about:['about.html'],locations:['locations.html','about.html'],contact:['contact.html','about.html'],'preview-guide':['about.html']
    }[page]||[];
    const nav=document.querySelector('.desktop-nav');
    if(!nav)return;
    const nodes=[...nav.children];
    nodes.forEach(node=>{
      const a=node.matches('a')?node:node.querySelector(':scope > a');
      const href=(a?.getAttribute('href')||'').split('?')[0].split('#')[0];
      const active=targets.includes(href);
      node.classList.toggle('current',active);
      a?.classList.toggle('current',active);
      if(active)a?.setAttribute('aria-current','page');else a?.removeAttribute('aria-current');
    });
  }
  function run(){
    document.querySelectorAll('.proposal-chip,.home-capability-band,.brand-band').forEach(el=>el.remove());
    document.querySelectorAll('.brand-mark').forEach(el=>{if(!el.querySelector('img'))el.innerHTML=`<img src="${LOGO}" alt="" decoding="sync">`});
    cleanPreviewArtifacts();
    syncCurrentNav();
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest?.('.demo-download');
    if(!b)return;
    e.preventDefault();e.stopImmediatePropagation();
    if(window.FB?.toast)window.FB.toast('檔案連結正在移轉整理中');
  },true);
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,120);setTimeout(run,350);setTimeout(syncCurrentNav,1000)});
  if(document.readyState!=='loading')setTimeout(run,0);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,40));
})();
