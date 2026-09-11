(function(){
  'use strict';
  if(window.__fbAdminUx)return;window.__fbAdminUx=true;
  const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];
  const ORDER=['homeHeroAdmin','adminStats','siteControlAdmin','contentControlAdmin','siteStructureAdmin','products','adminExtended','resourceAdmin'];
  const META={
    homeHeroAdmin:{step:'01',tag:'最常用',hint:'首頁第一眼看到的內容與產品輪播'},
    siteControlAdmin:{step:'02',tag:'首頁',hint:'控制首頁各區塊與共用功能顯示'},
    contentControlAdmin:{step:'03',tag:'文字',hint:'網站文字、主選單、Footer 與 SEO'},
    siteStructureAdmin:{step:'04',tag:'內頁',hint:'各內頁標題、SEO 與產品分類'},
    products:{step:'05',tag:'商品',hint:'產品資料與首頁精選狀態'},
    adminExtended:{step:'06',tag:'內容',hint:'最新消息、客戶案例與公司基本資料'},
    resourceAdmin:{step:'07',tag:'資源',hint:'下載中心與系統方案'}
  };
  let dirty=false;
  function reorder(){
    const main=$('.admin-main');if(!main)return;
    let anchor=$('.admin-section-jump')||$('.admin-top');
    ORDER.forEach(id=>{const el=document.getElementById(id);if(!el||!anchor)return;anchor.insertAdjacentElement('afterend',el);anchor=el});
  }
  function decorate(){
    Object.entries(META).forEach(([id,m])=>{
      const host=document.getElementById(id);if(!host)return;
      host.dataset.adminStep=m.step;
      const panel=id==='products'?host:host.querySelector(':scope > .admin-panel');
      if(panel&&!panel.querySelector('.admin-step-badge')){
        const head=panel.querySelector('.admin-panel-head > div');
        if(head){const badge=document.createElement('div');badge.className='admin-step-badge';badge.innerHTML=`<span>${m.step}</span><b>${m.tag}</b><small>${m.hint}</small>`;head.prepend(badge)}
      }
    });
    const hero=$('#homeHeroAdmin .admin-panel');if(hero)hero.classList.add('admin-priority-panel');
  }
  function collapsible(){
    ['siteControlAdmin','contentControlAdmin','siteStructureAdmin'].forEach(id=>{
      const panel=$(`#${id} > .admin-panel`);if(!panel||panel.dataset.foldReady)return;
      panel.dataset.foldReady='1';
      const head=$('.admin-panel-head',panel);if(!head)return;
      const action=document.createElement('button');action.type='button';action.className='admin-fold-btn';action.setAttribute('aria-expanded','true');action.innerHTML='收合 <span>−</span>';
      const old=head.querySelector(':scope > a.btn, :scope > button.btn');
      const box=document.createElement('div');box.className='admin-head-actions';if(old)box.appendChild(old);box.appendChild(action);head.appendChild(box);
      action.onclick=()=>{const folded=panel.classList.toggle('is-folded');action.setAttribute('aria-expanded',folded?'false':'true');action.innerHTML=folded?'展開 <span>＋</span>':'收合 <span>−</span>'};
    });
  }
  function activeNav(){
    const links=$$('.admin-nav a[href^="#"]');
    links.forEach(a=>a.addEventListener('click',()=>{links.forEach(x=>x.classList.remove('active'));a.classList.add('active')}));
    const sections=ORDER.map(id=>document.getElementById(id)).filter(Boolean);
    if(!('IntersectionObserver'in window))return;
    const obs=new IntersectionObserver(entries=>{const hit=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(!hit)return;links.forEach(x=>x.classList.toggle('active',x.getAttribute('href')==='#'+hit.target.id))},{rootMargin:'-18% 0px -72% 0px',threshold:0});
    sections.forEach(s=>obs.observe(s));
  }
  function dirtyState(){
    const pill=$('#adminSaveState');
    const mark=()=>{dirty=true;if(pill){pill.textContent='有未儲存變更';pill.classList.add('dirty')}};
    document.addEventListener('input',e=>{if(e.target.closest('.admin-main')&&e.target.matches('input,textarea,select'))mark()},true);
    document.addEventListener('change',e=>{if(e.target.closest('.admin-main')&&e.target.matches('input,textarea,select'))mark()},true);
    document.addEventListener('submit',e=>{if(e.target.closest('.admin-main')){dirty=false;setTimeout(()=>{if(pill){pill.textContent='目前無未儲存變更';pill.classList.remove('dirty')}},50)}},true);
    window.addEventListener('beforeunload',e=>{if(!dirty)return;e.preventDefault();e.returnValue=''});
  }
  function init(){
    if(document.body.dataset.page!=='admin')return;
    reorder();decorate();collapsible();
    if(!window.__fbAdminNavReady){window.__fbAdminNavReady=true;activeNav();dirtyState()}
  }
  document.addEventListener('DOMContentLoaded',()=>{[60,250,700,1300].forEach(t=>setTimeout(init,t))});
  if(document.readyState!=='loading')[50,300,900].forEach(t=>setTimeout(init,t));
  window.addEventListener('farbeyound:datachange',()=>setTimeout(init,80));
})();