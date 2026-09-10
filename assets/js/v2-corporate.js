(function(){
  const LOGO='assets/images/brand/far-beyound-logo.png';
  function cleanPreviewArtifacts(){
    document.querySelectorAll('.download-cta').forEach(el=>{if(/測試版|preview/i.test(el.textContent))el.textContent='下載';});
    document.querySelectorAll('.empty-state').forEach(el=>{
      const b=el.querySelector('b'),s=el.querySelector('span');
      if(b&&/展示產品|展示文件/.test(b.textContent))b.textContent=b.textContent.replace('展示產品','產品').replace('展示文件','文件');
      if(s&&/正式版|管理介面|後台/.test(s.textContent))s.textContent='如需相關資料，歡迎與我們聯絡。';
    });
    document.querySelectorAll('.footer-bottom span').forEach(el=>{if(/新版網站|PREVIEW|v0\./i.test(el.textContent))el.textContent='網站提案預覽環境';});
  }
  function run(){
    document.querySelectorAll('.proposal-chip,.home-capability-band,.brand-band').forEach(el=>el.remove());
    document.querySelectorAll('.brand-mark').forEach(el=>{if(!el.querySelector('img'))el.innerHTML=`<img src="${LOGO}" alt="" decoding="sync">`});
    cleanPreviewArtifacts();
    const page=document.body.dataset.page||'';
    const items=[...document.querySelectorAll('.desktop-nav .nav-item')];
    let idx=-1;
    if(['products','product'].includes(page))idx=0;
    else if(page==='downloads')idx=1;
    else if(page==='solutions')idx=2;
    else if(page==='cases')idx=3;
    else if(['news','news-detail'].includes(page))idx=4;
    else if(['about','locations','contact','preview-guide'].includes(page))idx=5;
    items.forEach(x=>x.classList.remove('current'));
    if(items[idx])items[idx].classList.add('current');
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest?.('.demo-download');
    if(!b)return;
    e.preventDefault();e.stopImmediatePropagation();
    if(window.FB?.toast)window.FB.toast('檔案連結正在移轉整理中');
  },true);
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,120);setTimeout(run,350)});
  if(document.readyState!=='loading')setTimeout(run,0);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,40));
})();
