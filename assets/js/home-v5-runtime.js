(function(){
  'use strict';

  function runtimeFixes(){
    if(document.getElementById('v5RuntimeFixes'))return;
    const style=document.createElement('style');
    style.id='v5RuntimeFixes';
    style.textContent=`
      .mobile-contact-phone{display:none!important}
      @media(max-width:980px){.mobile-contact-phone.is-open{display:block!important}}
    `;
    document.head.appendChild(style);
  }

  function heroMeta(){
    const copy=document.querySelector('.hero.v2-home-hero .hero-copy');
    if(!copy||copy.querySelector('.v5-hero-meta'))return;
    const meta=document.createElement('div');
    meta.className='v5-hero-meta';
    meta.innerHTML='<span>SINCE 1992</span><span>AUTO ID · SMART MANUFACTURING</span>';
    copy.prepend(meta);
  }

  function corporateWording(){
    document.querySelectorAll('a,button').forEach(el=>{
      if(el.textContent.trim()==='免費諮詢')el.textContent='需求洽詢';
    });
  }

  function labelExternalLinks(){
    document.querySelectorAll('a[target="_blank"]').forEach(a=>{
      if(!a.getAttribute('aria-label')&&a.textContent.trim()){
        a.setAttribute('aria-label',`${a.textContent.trim()}（另開新視窗）`);
      }
    });
  }

  function run(){
    runtimeFixes();
    document.documentElement.classList.add('v5-ready');
    heroMeta();
    corporateWording();
    labelExternalLinks();
  }

  document.addEventListener('DOMContentLoaded',()=>{
    run();
    setTimeout(run,180);
    setTimeout(run,850);
  });
  if(document.readyState!=='loading')setTimeout(run,30);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,120));
})();