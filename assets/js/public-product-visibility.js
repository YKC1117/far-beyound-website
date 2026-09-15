(function(){
  'use strict';
  if(window.__fbPublicProductVisibility)return;window.__fbPublicProductVisibility=true;
  if(document.body?.dataset.page==='admin')return;
  const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];
  function current(){return window.FBStore?.getData?.()||{products:[]}}
  function hiddenIds(){return new Set((current().products||[]).filter(p=>p.published===false).map(p=>String(p.id)))}
  function idFromHref(href){try{return new URL(href,location.href).searchParams.get('id')||''}catch(e){return ''}}
  function activeFilters(){const q=new URLSearchParams(location.search);return {category:q.get('category')||'all',brand:q.get('brand')||'all'}}
  function installContactStyle(){
    if(document.getElementById('fbPublicMobileContactStyle'))return;
    const s=document.createElement('style');s.id='fbPublicMobileContactStyle';s.textContent=`@media(max-width:980px){
      html body .quick-contact{position:fixed!important;left:0!important;right:0!important;bottom:0!important;top:auto!important;z-index:999!important;transform:none!important;display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;width:100%!important;gap:0!important;margin:0!important;padding:0!important;background:transparent!important;border:0!important;border-radius:0!important;overflow:visible!important;box-shadow:0 -8px 26px rgba(18,46,70,.10)!important;filter:none!important}
      html body .quick-contact .quick-contact-item{position:relative!important;margin:0!important;padding:0!important;border:0!important;min-width:0!important}
      html body .quick-contact .quick-contact-btn{width:100%!important;min-width:0!important;height:58px!important;min-height:58px!important;margin:0!important;padding:0!important;border:0!important;border-right:1px solid rgba(255,255,255,.25)!important;border-radius:0!important;color:#fff!important;background:#17324d!important;display:flex!important;align-items:center!important;justify-content:center!important;flex-direction:row!important;gap:7px!important;box-shadow:none!important;transform:none!important;text-decoration:none!important;font:inherit!important;font-size:11px!important;font-weight:700!important}
      html body .quick-contact .quick-contact-item:nth-child(1) .quick-contact-btn{background:#17324d!important}
      html body .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn{background:#06C755!important}
      html body .quick-contact .quick-contact-item:nth-child(3) .quick-contact-btn{background:#F28C28!important;border-right:0!important}
      html body .quick-contact .quick-contact-btn svg{width:19px!important;height:19px!important;fill:none!important;stroke:#fff!important;stroke-width:1.7!important;stroke-linecap:round!important;stroke-linejoin:round!important;flex:none!important}
      html body .quick-contact .quick-contact-btn .line-detail{stroke-width:1.25!important}
      html body .quick-contact .quick-phone-panel{left:14px!important;right:14px!important;bottom:70px!important;top:auto!important;width:auto!important;max-width:none!important;border-radius:10px!important;opacity:0!important;visibility:hidden!important;transform:translateY(8px)!important}
      html body .quick-contact .quick-contact-item.is-open .quick-phone-panel{opacity:1!important;visibility:visible!important;transform:none!important}
      html body .mobile-contact-bar,html body .mobile-contact-phone{display:none!important}
      html body:not([data-page="admin"]){padding-bottom:58px!important}
    }`;
    document.head.appendChild(s);
  }
  function applyCards(){
    const hidden=hiddenIds();
    $$('a[href*="product.html?id="]').forEach(a=>{
      const id=idFromHref(a.getAttribute('href')||'');if(!id)return;
      const off=hidden.has(id);
      const card=a.closest('.product-card')||a.closest('.hero-rotate-card')||a.closest('.hero-rotate-side')||a;
      if(card)card.style.display=off?'none':'';
    });
  }
  function applyProductsPage(){
    if(document.body.dataset.page!=='products')return;
    const d=current(),f=activeFilters();
    const list=(d.products||[]).filter(p=>p.published!==false&&(f.category==='all'||p.category===f.category)&&(f.brand==='all'||p.brand===f.brand));
    const count=$('#productCount');if(count)count.textContent=`${list.length} 項產品`;
    $$('#brandTabs .brand-chip').forEach(a=>{
      const u=new URL(a.href,location.href),brand=u.searchParams.get('brand')||'all';if(brand==='all'){a.style.display='';return}
      const has=(d.products||[]).some(p=>p.published!==false&&p.brand===brand&&(f.category==='all'||p.category===f.category));a.style.display=has?'':'none';
    });
    const grid=$('#productGrid');if(grid){const visible=$$('.product-card',grid).filter(x=>getComputedStyle(x).display!=='none');let empty=$('#publishedProductEmpty',grid);if(!visible.length&&!empty){empty=document.createElement('div');empty.id='publishedProductEmpty';empty.className='empty-state wide';empty.innerHTML='<b>目前沒有公開展示的產品</b><span>可切換其他分類或品牌查看。</span>';grid.appendChild(empty)}else if(visible.length&&empty)empty.remove()}
  }
  function applyProductPage(){
    if(document.body.dataset.page!=='product')return;
    const id=new URLSearchParams(location.search).get('id')||'';if(!id||!hiddenIds().has(id))return;
    const main=$('main');if(!main||main.dataset.unpublishedHandled)return;main.dataset.unpublishedHandled='1';
    main.innerHTML='<section class="section"><div class="container"><div class="empty-state wide" style="padding:48px 24px"><b>此產品目前未公開</b><span>產品資料仍保留於管理後台，前台暫時不提供瀏覽。</span><a class="btn btn-primary" href="products.html" style="margin-top:18px">返回產品資訊</a></div></div></section>';
    document.title='產品目前未公開｜萬里資訊';
  }
  function run(){if(!window.FBStore)return;applyCards();applyProductsPage();applyProductPage()}
  function init(){installContactStyle();run();setTimeout(run,80);setTimeout(run,350);const obs=new MutationObserver(()=>{clearTimeout(window.__fbPublicProductVisibilityTimer);window.__fbPublicProductVisibilityTimer=setTimeout(run,40)});obs.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['href']});window.addEventListener('farbeyound:datachange',()=>setTimeout(run,50))}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
