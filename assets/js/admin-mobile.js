(()=>{
  if(document.body.dataset.page!=='admin'||window.__fbAdminMobile)return;window.__fbAdminMobile=true;
  const mq=window.matchMedia('(max-width:780px)');
  const labels={homeHeroAdmin:'首頁首屏',siteControlAdmin:'首頁版面',contentControlAdmin:'文字 SEO',siteStructureAdmin:'內頁分類',products:'產品管理',adminAnalytics:'流量分析',adminInquiries:'網站詢問',adminPassword:'後台密碼',adminExtended:'消息案例',resourceAdmin:'下載系統'};
  const tabs=[['#homeHeroAdmin','⌂','首頁'],['#products','▦','產品'],['#adminAnalytics','⌁','流量'],['#adminInquiries','✉','詢問'],['#adminPassword','⚙','密碼']];
  function add(){
    if(document.querySelector('.admin-mobile-bar'))return;
    const bar=document.createElement('div');bar.className='admin-mobile-bar';bar.innerHTML='<button type="button" class="admin-mobile-menu" aria-label="開啟功能選單">☰</button><div class="admin-mobile-title"><b>網站管理中心</b><small>手機管理模式｜與電腦版同步</small></div><button type="button" class="admin-mobile-top" aria-label="回到頁首">↑</button>';
    const shade=document.createElement('div');shade.className='admin-mobile-shade';
    const nav=document.createElement('nav');nav.className='admin-mobile-tabs';nav.setAttribute('aria-label','手機後台常用功能');nav.innerHTML=tabs.map(([h,i,t])=>`<a href="${h}"><span>${i}</span>${t}</a>`).join('');
    document.body.prepend(bar);document.body.append(shade,nav);
    bar.querySelector('.admin-mobile-menu').onclick=()=>document.body.classList.toggle('admin-mobile-nav-open');
    bar.querySelector('.admin-mobile-top').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
    shade.onclick=()=>document.body.classList.remove('admin-mobile-nav-open');
    document.addEventListener('click',e=>{const a=e.target.closest('.admin-side a[href^="#"]');if(a&&mq.matches)document.body.classList.remove('admin-mobile-nav-open')});
    nav.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const id=a.getAttribute('href').slice(1);setTitle(id);document.body.classList.remove('admin-mobile-nav-open')});
  }
  function setTitle(id){const b=document.querySelector('.admin-mobile-title b');if(b)b.textContent=labels[id]||'網站管理中心'}
  function observe(){
    if(!('IntersectionObserver'in window))return;
    const els=Object.keys(labels).map(id=>document.getElementById(id)).filter(Boolean);
    const tabLinks=[...document.querySelectorAll('.admin-mobile-tabs a')];
    const obs=new IntersectionObserver(entries=>{
      const hit=entries.filter(x=>x.isIntersecting).sort((a,b)=>Math.abs(a.boundingClientRect.top)-Math.abs(b.boundingClientRect.top))[0];if(!hit)return;
      setTitle(hit.target.id);
      tabLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+hit.target.id));
    },{rootMargin:'-110px 0px -68% 0px',threshold:0});
    els.forEach(el=>obs.observe(el));
  }
  function apply(){
    document.body.classList.toggle('admin-mobile-mode',mq.matches);
    if(!mq.matches)document.body.classList.remove('admin-mobile-nav-open');
  }
  function boot(){add();apply();setTimeout(observe,800)}
  mq.addEventListener?.('change',apply);
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();
