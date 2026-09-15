(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminNavState)return;
  window.__fbAdminNavState=true;

  const $=(s,p=document)=>p.querySelector(s);
  const $$=(s,p=document)=>[...p.querySelectorAll(s)];
  const IDS=[
    'adminAnalytics','adminInquiries','products','homeHeroAdmin','adminFrontFeatureManager',
    'siteControlAdmin','adminBrandManager','adminLocationManager','contentControlAdmin',
    'siteStructureAdmin','adminExtended','resourceAdmin','adminSecurityCenter','adminHistory','adminMaintenance'
  ];

  function style(){
    if($('#adminNavStateStyle'))return;
    const s=document.createElement('style');
    s.id='adminNavStateStyle';
    s.textContent=`
      .admin-nav a.is-current{background:rgba(255,255,255,.12)!important;color:#fff!important;box-shadow:inset 3px 0 0 #8fd0df}
      #adminBackTop{position:fixed;right:18px;bottom:18px;z-index:1200;width:38px;height:38px;border:1px solid #d6e2e7;border-radius:12px;background:#fff;color:#315366;font-size:16px;font-weight:900;box-shadow:0 10px 28px rgba(31,63,77,.16);cursor:pointer;opacity:0;transform:translateY(8px);pointer-events:none;transition:.2s}
      #adminBackTop.show{opacity:1;transform:none;pointer-events:auto}
      #adminBackTop:hover{background:#f2f8fa}
      @media(max-width:700px){#adminBackTop{right:12px;bottom:12px}}
    `;
    document.head.appendChild(s);
  }

  function mark(id){
    $$('.admin-nav a[href^="#"]').forEach(a=>a.classList.toggle('is-current',a.getAttribute('href')===`#${id}`));
  }

  function currentFromScroll(){
    const visible=IDS.map(id=>document.getElementById(id)).filter(Boolean)
      .map(el=>({id:el.id,top:el.getBoundingClientRect().top}))
      .filter(x=>x.top<=170)
      .sort((a,b)=>b.top-a.top)[0];
    if(visible)mark(visible.id);
  }

  function backTop(){
    if($('#adminBackTop'))return;
    const b=document.createElement('button');
    b.id='adminBackTop';
    b.type='button';
    b.setAttribute('aria-label','回到後台頂端');
    b.title='回到頂端';
    b.textContent='↑';
    document.body.appendChild(b);
    b.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
    const sync=()=>b.classList.toggle('show',window.scrollY>520);
    window.addEventListener('scroll',sync,{passive:true});
    sync();
  }

  function bindClicks(){
    $$('.admin-nav a[href^="#"]').forEach(a=>{
      if(a.dataset.navStateReady)return;
      a.dataset.navStateReady='1';
      a.addEventListener('click',()=>{
        const id=(a.getAttribute('href')||'').slice(1);
        if(id)mark(id);
      });
    });
  }

  function init(){
    style();
    bindClicks();
    backTop();
    currentFromScroll();
    let raf=0;
    window.addEventListener('scroll',()=>{
      if(raf)return;
      raf=requestAnimationFrame(()=>{raf=0;currentFromScroll()});
    },{passive:true});
    const hash=location.hash.slice(1);
    if(hash)mark(hash);
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();
