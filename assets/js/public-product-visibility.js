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
    const products=current().products||[];
    $('a[href*="product.html?id="]').forEach(a=>{
      const id=idFromHref(a.getAttribute('href')||'');if(!id)return;
      const product=window.FBFindProduct?FBFindProduct(products,id):products.find(p=>String(p.id)===String(id));
      const off=product?.published===false;
      const card=a.closest('.product-card')||a.closest('.hero-rotate-card')||a.closest('.hero-rotate-side')||a;
      if(card){const next=off?'none':'';if(card.style.display!==next)card.style.display=next}
    });
  }
  function applyProductsPage(){
    if(document.body.dataset.page!=='products')return;
    const d=current(),f=activeFilters();
    const list=(d.products||[]).filter(p=>p.published!==false&&(f.category==='all'||p.category===f.category)&&(f.brand==='all'||p.brand===f.brand));
    const count=$('#productCount');if(count){const text=`${list.length} 項產品`;if(count.textContent!==text)count.textContent=text}
    $$('#brandTabs .brand-chip').forEach(a=>{
      const u=new URL(a.href,location.href),brand=u.searchParams.get('brand')||'all';if(brand==='all'){if(a.style.display)a.style.display='';return}
      const has=(d.products||[]).some(p=>p.published!==false&&p.brand===brand&&(f.category==='all'||p.category===f.category));const next=has?'':'none';if(a.style.display!==next)a.style.display=next;
    });
    const grid=$('#productGrid');if(grid){const visible=$$('.product-card',grid).filter(x=>getComputedStyle(x).display!=='none');let empty=$('#publishedProductEmpty',grid);if(!visible.length&&!empty){empty=document.createElement('div');empty.id='publishedProductEmpty';empty.className='empty-state wide';empty.innerHTML='<b>目前沒有公開展示的產品</b><span>可切換其他分類或品牌查看，或直接聯絡我們協助確認。</span>';grid.appendChild(empty)}else if(visible.length&&empty)empty.remove()}
  }
  function applyProductPage(){
    if(document.body.dataset.page!=='product')return;
    const id=new URLSearchParams(location.search).get('id')||'';if(!id)return;const products=current().products||[];const product=window.FBFindProduct?FBFindProduct(products,id):products.find(p=>String(p.id)===String(id));if(!product||product.published!==false)return;
    const main=$('main');if(!main||main.dataset.unpublishedHandled)return;main.dataset.unpublishedHandled='1';
    main.innerHTML='<section class="section"><div class="container"><div class="empty-state wide" style="padding:48px 24px"><b>此產品目前暫不提供公開瀏覽</b><span>如需確認產品規格、替代機型或供貨資訊，萬里資訊可協助您進一步確認。</span><div class="product-actions" style="margin-top:18px"><a class="btn btn-primary" href="products.html">返回產品資訊</a><a class="btn btn-secondary" href="contact.html?item=%E7%94%A2%E5%93%81%E8%B3%87%E8%A8%8A%E8%A9%A2%E5%95%8F">聯絡我們</a></div></div></div></section>';
    document.title='產品資訊｜萬里資訊';
  }
  function run(){if(!window.FBStore)return false;applyCards();applyProductsPage();applyProductPage();return true}
  let scheduled=false;
  function scheduleRun(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;run()})}
  function init(){
    installContactStyle();
    run();
    const obs=new MutationObserver(mutations=>{
      if(mutations.some(m=>m.type==='childList'||m.type==='attributes'))scheduleRun();
    });
    obs.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['href']});
    window.addEventListener('farbeyound:datachange',scheduleRun);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
