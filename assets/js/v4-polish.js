(function(){
  const MAPS={
    '台北總公司':'新北市中和區中山路二段351號10樓之1',
    '台南分公司':'台南市永康區中華路425號4樓之18'
  };
  const mapUrl=address=>`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  let navObserver=null;
  let navApplying=false;

  function currentNav(){
    if(document.body.dataset.page==='admin'||navApplying)return;
    navApplying=true;
    const page=document.body.dataset.page||'';
    const targets={
      products:['products.html'],product:['products.html'],
      downloads:['downloads.html'],solutions:['solutions.html'],cases:['cases.html'],
      news:['news.html'],'news-detail':['news.html'],
      about:['about.html'],locations:['locations.html','about.html'],contact:['contact.html','about.html'],'preview-guide':['about.html']
    }[page]||[];
    const nav=document.querySelector('.desktop-nav');
    if(!nav){navApplying=false;return}
    const nodes=[...nav.children];
    nodes.forEach(node=>{
      node.classList.remove('current');
      const a=node.matches('a')?node:node.querySelector(':scope > a');
      a?.classList.remove('current');
      a?.removeAttribute('aria-current');
    });
    let active=null;
    for(const target of targets){
      active=nodes.find(node=>{
        const a=node.matches('a')?node:node.querySelector(':scope > a');
        const href=(a?.getAttribute('href')||'').split('?')[0].split('#')[0];
        return href===target;
      });
      if(active)break;
    }
    if(active){
      const a=active.matches('a')?active:active.querySelector(':scope > a');
      active.classList.add('current');
      a?.classList.add('current');
      a?.setAttribute('aria-current','page');
    }
    navApplying=false;
  }

  function observeNav(){
    const nav=document.querySelector('.desktop-nav');
    if(!nav||navObserver)return;
    navObserver=new MutationObserver(mutations=>{
      if(mutations.some(m=>m.type==='childList'))requestAnimationFrame(currentNav);
    });
    navObserver.observe(nav,{childList:true,subtree:true});
  }

  function locationLinks(){
    if(document.body.dataset.page!=='contact')return;
    document.querySelectorAll('#serviceLocations .location-mini').forEach(card=>{
      if(card.querySelector('.location-mini-action'))return;
      const label=card.querySelector('small')?.textContent.trim()||'';
      const address=MAPS[label];
      if(!address)return;
      card.classList.add('is-map-link');
      const a=document.createElement('a');
      a.className='location-mini-action';
      a.href=mapUrl(address);
      a.target='_blank';
      a.rel='noopener';
      a.setAttribute('aria-label',`${label} Google 地圖導航`);
      a.textContent='Google 導航 ↗';
      card.appendChild(a);
    });
  }

  function externalLinkSafety(){
    document.querySelectorAll('a[target="_blank"]').forEach(a=>{
      const rel=new Set((a.getAttribute('rel')||'').split(/\s+/).filter(Boolean));
      rel.add('noopener');
      a.setAttribute('rel',[...rel].join(' '));
    });
  }

  function run(){currentNav();observeNav();locationLinks();externalLinkSafety()}
  document.addEventListener('DOMContentLoaded',()=>{
    setTimeout(run,40);
    setTimeout(run,420);
    setTimeout(run,1100);
    setTimeout(run,2200);
  });
  if(document.readyState!=='loading')setTimeout(run,40);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,120));
})();
