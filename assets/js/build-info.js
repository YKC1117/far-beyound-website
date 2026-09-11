(function(){
  const BUILD='2026/09/11 16:56';
  function mount(){
    const bottom=document.querySelector('.footer-bottom');
    if(!bottom || bottom.querySelector('[data-build-info]')) return;
    const tag=document.createElement('span');
    tag.dataset.buildInfo='1';
    tag.textContent=`修改時間：${BUILD}`;
    tag.style.opacity='.72';
    tag.style.fontSize='11px';
    bottom.appendChild(tag);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount);
  else mount();
  setTimeout(mount,120);
  setTimeout(mount,500);
})();
