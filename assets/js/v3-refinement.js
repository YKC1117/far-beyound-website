(function(){
  function applyBrandIdentity(){
    document.querySelectorAll('.brand-copy strong').forEach(el=>{
      if(!el.querySelector('.brand-reg')) el.insertAdjacentHTML('beforeend','<sup class="brand-reg" aria-label="registered trademark">®</sup>');
    });
    document.querySelectorAll('.header-inner .brand-copy small').forEach(el=>{el.textContent='FAR-BEYOUND INFORMATION'});
    document.querySelectorAll('.footer-brand .brand-copy small').forEach(el=>{el.textContent='FAR-BEYOUND INFORMATION'});
  }
  function compactHome(){
    if(document.body.dataset.page!=='home') return;
    document.getElementById('brandShowcase')?.remove();
    document.getElementById('aboutBand')?.remove();
    const grid=document.getElementById('homeProducts');
    if(grid){[...grid.children].slice(6).forEach(x=>x.remove())}
    const news=document.getElementById('homeNews');
    if(news){[...news.children].slice(3).forEach(x=>x.remove())}
  }
  function cleanFooter(){
    document.querySelectorAll('.footer-bottom span').forEach((el,i)=>{
      if(i===1 || /測試|提案|PREVIEW|v0\./i.test(el.textContent)) el.textContent='所有其他商標均為各自所有者之財產';
    });
  }
  function run(){applyBrandIdentity();compactHome();cleanFooter()}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,150);setTimeout(run,450)});
  if(document.readyState!=='loading')setTimeout(run,0);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,100));
})();
