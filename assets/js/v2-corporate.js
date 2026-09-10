(function(){
  const LOGO='assets/images/brand/far-beyound-logo.png';
  function run(){
    document.querySelectorAll('.proposal-chip,.home-capability-band,.brand-band').forEach(el=>el.remove());
    document.querySelectorAll('.brand-mark').forEach(el=>{if(!el.querySelector('img'))el.innerHTML=`<img src="${LOGO}" alt="" decoding="sync">`});
    document.querySelectorAll('.footer-bottom span').forEach(el=>{if(/新版網站|PREVIEW|v0\./i.test(el.textContent))el.textContent='網站提案預覽環境';});
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
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,120)});
  if(document.readyState!=='loading')setTimeout(run,0);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,40));
})();
