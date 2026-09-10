(function(){
  const LOGO='assets/images/brand/far-beyound-logo.png';
  function style(){if(document.getElementById('fbFinalFixes'))return;const s=document.createElement('style');s.id='fbFinalFixes';s.textContent=`
    .brand-mark{display:grid!important;place-items:center!important;overflow:hidden!important;background:#fff!important;padding:2px!important}.brand-mark img{display:block;width:100%;height:100%;object-fit:contain;border-radius:9px}
    .desktop-nav .nav-group.current>a,.desktop-nav>a.current{color:var(--teal)}.desktop-nav .nav-group.current>a:after,.desktop-nav>a.current:after{transform:scaleX(1)}
    @media(max-width:680px){.home-photo-showcase{min-height:215px!important;height:215px!important;padding:9px!important}.home-photo-main img{width:84%!important;height:84%!important}.home-photo-main .cap{padding:9px 11px!important}.home-photo-main .cap b{font-size:15px!important}.hero-copy h1{font-size:36px!important}.hero-trust{font-size:10px!important}.proposal-chip{font-size:9px!important}.home-capability{min-height:76px}.brand-copy strong{font-size:18px!important}}
  `;document.head.appendChild(s)}
  function logo(){document.querySelectorAll('.brand-mark').forEach(el=>{if(el.querySelector('img'))return;el.innerHTML=`<img src="${LOGO}" alt="" decoding="sync">`})}
  function currentNav(){const page=document.body.dataset.page||'';const groups=[...document.querySelectorAll('.desktop-nav .nav-group')];let idx=-1;if(['products','product'].includes(page))idx=0;else if(page==='downloads')idx=1;else if(page==='solutions')idx=2;else if(page==='cases')idx=3;else if(['news','news-detail'].includes(page))idx=4;else if(['about','locations','contact','preview-guide'].includes(page))idx=5;if(groups[idx]){groups[idx].classList.add('current');groups[idx].querySelector(':scope>a')?.setAttribute('aria-current','page')}}
  function run(){style();logo();currentNav()}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,120)});if(document.readyState!=='loading')setTimeout(run,0)
})();