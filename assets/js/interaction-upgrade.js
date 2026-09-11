(function(){
  'use strict';

  const NEWS_SLUGS={
    '2026年度萬里資訊員工旅遊公告':'travel-2026',
    '2026 年度萬里資訊員工旅遊公告':'travel-2026',
    '原物料價格調整公告':'material-price',
    '共用印表機 0x0000011b／0x00000709 錯誤處理':'printer-share-error',
    '解決辦法-無法使用共用印表機0x0000011b與0x00000709等錯誤':'printer-share-error',
    'Zebra ZT411 / ZT421：多功能及穩定性佳':'zt411-news',
    'Zebra ZT411 / ZT421 標籤列印機 ，多功能及穩定性佳':'zt411-news',
    'Zebra ZT610 / ZT620：堅固耐用及卓越性能':'zt610-news',
    'Zebra ZT610 / ZT620 工業型標籤列印機 堅固耐用及卓越的性能':'zt610-news'
  };

  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function addStyle(){
    if(document.getElementById('interactionUpgradeStyle'))return;
    const s=document.createElement('style');
    s.id='interactionUpgradeStyle';
    s.textContent=`
      .hero-trust a{color:inherit;text-decoration:none;position:relative;transition:color .16s ease}
      .hero-trust a:hover,.hero-trust a:focus-visible{color:var(--v5-cyan,#148da7)}
      .hero-trust a:focus-visible,.v5-cred-item.interactive:focus-visible,.scope-card.interactive:focus-visible,.case-page-card.interactive:focus-visible,.news-card.interactive:focus-visible,.location-card a:focus-visible,.product-image-zoom:focus-visible{outline:2px solid var(--v5-cyan,#148da7);outline-offset:3px}
      a.v5-cred-item{color:inherit;text-decoration:none;position:relative;transition:background .16s ease}
      a.v5-cred-item:hover{background:#173b58}
      a.v5-cred-item:after{content:'→';position:absolute;right:16px;top:14px;color:#6fb9c8;font-size:12px;opacity:0;transform:translateX(-3px);transition:.16s ease}
      a.v5-cred-item:hover:after{opacity:1;transform:none}
      a.scope-card{display:block;color:inherit;text-decoration:none;position:relative;transition:background .16s ease,border-color .16s ease}
      a.scope-card:hover{background:#f5f9fa}
      a.scope-card:after{content:'了解更多 →';display:block;margin-top:14px;color:var(--v5-cyan,#148da7);font-size:10px;font-weight:700}
      a.case-page-card{color:inherit;text-decoration:none;position:relative;transition:background .16s ease,box-shadow .16s ease}
      a.case-page-card:hover{background:#f7fafb;box-shadow:inset 0 -2px 0 var(--v5-cyan,#148da7)}
      .case-page-link{display:inline-flex;margin-top:14px;color:var(--v5-cyan,#148da7);font-size:10px;font-weight:700}
      a.news-card{color:inherit;text-decoration:none;cursor:pointer;transition:background .16s ease,border-color .16s ease}
      a.news-card:hover{background:#f7fafb}
      a.news-card .text-link{pointer-events:none}
      .location-card dd a{color:inherit;text-decoration:none;border-bottom:1px solid transparent;transition:color .16s ease,border-color .16s ease}
      .location-card dd a:hover{color:var(--v5-cyan,#148da7);border-bottom-color:currentColor}
      .location-card dd a[href^='https://www.google.com/maps']{display:inline-flex;align-items:center;gap:5px}
      .location-card dd a[href^='https://www.google.com/maps']:after{content:'↗';font-size:10px;color:var(--v5-cyan,#148da7)}
      .product-detail-visual{position:relative}
      .product-image-zoom{position:absolute;right:12px;bottom:12px;z-index:3;display:inline-flex;align-items:center;gap:6px;min-height:34px;padding:0 10px;border:1px solid #d6e0e6;background:rgba(255,255,255,.94);color:#17324d;font:inherit;font-size:10px;font-weight:700;cursor:pointer;box-shadow:0 5px 16px rgba(17,43,67,.08)}
      .product-image-zoom:hover{border-color:#9bb8c5;background:#fff;color:var(--v5-cyan,#148da7)}
      .product-lightbox{position:fixed;inset:0;z-index:9999;display:none;place-items:center;padding:28px;background:rgba(8,25,39,.88)}
      .product-lightbox.is-open{display:grid}
      .product-lightbox-inner{position:relative;width:min(900px,96vw);height:min(720px,86vh);display:grid;place-items:center;background:#fff;padding:32px;border-radius:4px}
      .product-lightbox img{max-width:100%;max-height:100%;object-fit:contain}
      .product-lightbox-close{position:absolute;right:10px;top:10px;width:38px;height:38px;border:1px solid #d4dee4;background:#fff;color:#17324d;font-size:22px;line-height:1;cursor:pointer}
      @media(max-width:680px){.v5-cred-item.interactive:after{display:none}.product-image-zoom{right:8px;bottom:8px}.product-lightbox{padding:14px}.product-lightbox-inner{padding:24px 12px 16px}}
    `;
    document.head.appendChild(s);
  }

  function replaceWithLink(el,href,className){
    if(!el||el.tagName==='A')return el;
    const a=document.createElement('a');
    [...el.attributes].forEach(attr=>a.setAttribute(attr.name,attr.value));
    a.href=href;
    if(className)a.classList.add(className);
    a.innerHTML=el.innerHTML;
    el.replaceWith(a);
    return a;
  }

  function homeTrust(){
    const wrap=document.querySelector('.hero-trust');
    if(!wrap||wrap.dataset.interactive==='1')return;
    const targets=['products.html','products.html?category=labels','products.html?category=parts','solutions.html'];
    [...wrap.children].forEach((el,i)=>replaceWithLink(el,targets[i]||'products.html'));
    wrap.dataset.interactive='1';
  }

  function credibility(){
    const items=[...document.querySelectorAll('.v5-credibility .v5-cred-item')];
    if(!items.length)return;
    const targets=['about.html','locations.html','products.html','solutions.html'];
    items.forEach((el,i)=>{
      const a=replaceWithLink(el,targets[i]||'about.html','interactive');
      if(a)a.setAttribute('aria-label',`${a.textContent.trim()}－查看相關內容`);
    });
  }

  function aboutScope(){
    if(document.body.dataset.page!=='about')return;
    const targets=['products.html','products.html?category=labels','products.html?category=parts','solutions.html'];
    document.querySelectorAll('.service-scope .scope-card').forEach((el,i)=>replaceWithLink(el,targets[i]||'products.html','interactive'));
  }

  function caseTarget(card){
    const txt=(card.textContent||'').toLowerCase();
    if(txt.includes('sfis'))return 'solutions.html#sfis';
    if(txt.includes('wms')||txt.includes('倉儲')||txt.includes('出貨'))return 'solutions.html#wms';
    if(txt.includes('smt'))return 'solutions.html#smt';
    return 'solutions.html#barcode';
  }

  function caseCards(){
    if(document.body.dataset.page!=='cases')return;
    document.querySelectorAll('#casePageGrid .case-page-card').forEach(card=>{
      if(card.tagName==='A')return;
      const a=replaceWithLink(card,caseTarget(card),'interactive');
      if(a&&!a.querySelector('.case-page-link'))a.insertAdjacentHTML('beforeend','<span class="case-page-link">了解相關方案 →</span>');
    });
  }

  function newsHref(card){
    const existing=card.querySelector('a[href*="news-detail.html"]');
    if(existing)return existing.getAttribute('href');
    const title=card.querySelector('h2,h3')?.textContent.trim()||'';
    const slug=NEWS_SLUGS[title];
    return slug?`news-detail.html?id=${encodeURIComponent(slug)}`:'';
  }

  function upgradeNewsCard(card){
    if(!card||card.tagName==='A')return;
    const href=newsHref(card);if(!href)return;
    const a=document.createElement('a');
    [...card.attributes].forEach(attr=>a.setAttribute(attr.name,attr.value));
    a.classList.add('interactive');a.href=href;
    a.innerHTML=card.innerHTML;
    a.querySelectorAll('a').forEach(inner=>{
      const span=document.createElement('span');
      [...inner.attributes].forEach(attr=>{if(attr.name!=='href'&&attr.name!=='target'&&attr.name!=='rel')span.setAttribute(attr.name,attr.value)});
      span.innerHTML=inner.innerHTML;inner.replaceWith(span);
    });
    const oldButton=a.querySelector('button.demo-news');
    if(oldButton){const span=document.createElement('span');span.className='text-link';span.innerHTML=oldButton.innerHTML;oldButton.replaceWith(span)}
    card.replaceWith(a);
  }

  function newsCards(){
    if(document.body.dataset.page==='news')document.querySelectorAll('#newsList .news-card').forEach(upgradeNewsCard);
    if(document.body.dataset.page==='home'){
      document.querySelectorAll('#homeNews .news-row').forEach(row=>{
        const title=row.querySelector('h3')?.textContent.trim()||'';
        const slug=NEWS_SLUGS[title];
        if(slug)row.href=`news-detail.html?id=${encodeURIComponent(slug)}`;
      });
    }
  }

  function locations(){
    if(document.body.dataset.page!=='locations')return;
    document.querySelectorAll('.location-card dl').forEach(dl=>{
      const kids=[...dl.children];
      for(let i=0;i<kids.length-1;i++){
        const dt=kids[i],dd=kids[i+1];
        if(dt.tagName!=='DT'||dd.tagName!=='DD'||dd.querySelector('a'))continue;
        const label=dt.textContent.trim(),value=dd.textContent.trim();let href='';
        if(label==='電話')href='tel:'+value.replace(/[^\d+]/g,'');
        else if(label.toLowerCase().includes('e-mail'))href='mailto:'+value;
        else if(label==='地址')href='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(value);
        if(href){
          const a=document.createElement('a');a.href=href;a.textContent=value;
          if(href.startsWith('https://')){a.target='_blank';a.rel='noopener';a.setAttribute('aria-label',value+'－開啟 Google Maps 導航')}
          dd.replaceChildren(a);
        }
      }
    });
  }

  function productLightbox(){
    if(document.body.dataset.page!=='product')return;
    const visual=document.querySelector('.product-detail-visual');
    const img=visual?.querySelector('img');
    if(!visual||!img||visual.querySelector('.product-image-zoom'))return;
    const btn=document.createElement('button');btn.type='button';btn.className='product-image-zoom';btn.innerHTML='⌕ 放大圖片';btn.setAttribute('aria-label','放大產品圖片');visual.appendChild(btn);
    let box=document.querySelector('.product-lightbox');
    if(!box){
      box=document.createElement('div');box.className='product-lightbox';box.setAttribute('aria-hidden','true');box.innerHTML='<div class="product-lightbox-inner" role="dialog" aria-modal="true" aria-label="產品圖片預覽"><button type="button" class="product-lightbox-close" aria-label="關閉圖片預覽">×</button><img alt=""></div>';document.body.appendChild(box);
    }
    const preview=box.querySelector('img'),close=box.querySelector('.product-lightbox-close');
    const open=()=>{preview.src=img.currentSrc||img.src;preview.alt=img.alt||'產品圖片';box.classList.add('is-open');box.setAttribute('aria-hidden','false');close.focus()};
    const shut=()=>{box.classList.remove('is-open');box.setAttribute('aria-hidden','true');btn.focus()};
    btn.addEventListener('click',open);close.addEventListener('click',shut);box.addEventListener('click',e=>{if(e.target===box)shut()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&box.classList.contains('is-open'))shut()});
  }

  function run(){
    addStyle();homeTrust();credibility();aboutScope();caseCards();newsCards();locations();productLightbox();
  }

  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,120);setTimeout(run,500);setTimeout(run,1000)});
  if(document.readyState!=='loading')setTimeout(run,20);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,100));
  const observer=new MutationObserver(()=>requestAnimationFrame(()=>{caseCards();newsCards();productLightbox()}));
  document.addEventListener('DOMContentLoaded',()=>observer.observe(document.body,{childList:true,subtree:true}),{once:true});
})();
