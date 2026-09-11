(function(){
  'use strict';
  if(window.__fbPublicProductVisibility)return;window.__fbPublicProductVisibility=true;
  if(document.body?.dataset.page==='admin')return;
  const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];
  function current(){return window.FBStore?.getData?.()||{products:[]}}
  function hiddenIds(){return new Set((current().products||[]).filter(p=>p.published===false).map(p=>String(p.id)))}
  function idFromHref(href){try{return new URL(href,location.href).searchParams.get('id')||''}catch(e){return ''}}
  function activeFilters(){const q=new URLSearchParams(location.search);return {category:q.get('category')||'all',brand:q.get('brand')||'all'}}
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
  function init(){run();setTimeout(run,80);setTimeout(run,350);const obs=new MutationObserver(()=>{clearTimeout(window.__fbPublicProductVisibilityTimer);window.__fbPublicProductVisibilityTimer=setTimeout(run,40)});obs.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['href']});window.addEventListener('farbeyound:datachange',()=>setTimeout(run,50))}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();