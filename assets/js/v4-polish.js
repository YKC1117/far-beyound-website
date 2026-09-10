(function(){
  const MAPS={
    '台北總公司':'新北市中和區中山路二段351號10樓之1',
    '台南分公司':'台南市永康區中華路425號4樓之18'
  };
  const mapUrl=address=>`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  function currentNav(){
    if(document.body.dataset.page==='admin')return;
    const page=document.body.dataset.page||'';
    const href={
      products:'products.html',product:'products.html',
      solutions:'solutions.html',cases:'cases.html',
      news:'news.html','news-detail':'news.html',
      downloads:'downloads.html',
      about:'about.html',locations:'about.html',contact:'about.html','preview-guide':'about.html'
    }[page];
    const items=[...document.querySelectorAll('.desktop-nav > .nav-item')];
    items.forEach(item=>{
      item.classList.remove('current');
      item.querySelector(':scope > a')?.removeAttribute('aria-current');
    });
    if(!href)return;
    const active=items.find(item=>(item.querySelector(':scope > a')?.getAttribute('href')||'').split('?')[0]===href);
    if(active){
      active.classList.add('current');
      active.querySelector(':scope > a')?.setAttribute('aria-current','page');
    }
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

  function run(){currentNav();locationLinks();externalLinkSafety()}
  document.addEventListener('DOMContentLoaded',()=>{
    setTimeout(run,40);
    setTimeout(run,420);
    setTimeout(run,1100);
  });
  if(document.readyState!=='loading')setTimeout(run,40);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,120));
})();
