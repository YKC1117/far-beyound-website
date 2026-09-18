/* HOME LATE BUNDLE — late assets concatenated in manifest order; product-docs remains direct because it contains legacy-source mapping data audited separately. */

/* ===== assets/js/v2-corporate.js ===== */
(function(){
  const LOGO='assets/images/brand/far-beyound-logo.png';
  function cleanPreviewArtifacts(){
    document.querySelectorAll('.download-cta').forEach(el=>{if(/測試版|preview/i.test(el.textContent))el.textContent='下載';});
    document.querySelectorAll('.empty-state').forEach(el=>{
      const b=el.querySelector('b'),s=el.querySelector('span');
      if(b&&/展示產品|展示文件/.test(b.textContent))b.textContent=b.textContent.replace('展示產品','產品').replace('展示文件','文件');
      if(s&&/正式版|管理介面|後台/.test(s.textContent))s.textContent='如需相關資料，歡迎與我們聯絡。';
    });
    document.querySelectorAll('.footer-bottom span').forEach(el=>{
      if(/新版網站|PREVIEW|v0\.|網站提案預覽環境/i.test(el.textContent))el.textContent='企業條碼與自動識別整合服務';
    });
  }
  function run(){
    document.querySelectorAll('.proposal-chip,.home-capability-band,.brand-band').forEach(el=>el.remove());
    document.querySelectorAll('.brand-mark').forEach(el=>{if(!el.querySelector('img'))el.innerHTML=`<img src="${LOGO}" alt="" decoding="sync">`});
    cleanPreviewArtifacts();
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest?.('.demo-download');
    if(!b)return;
    e.preventDefault();e.stopImmediatePropagation();
    if(window.FB?.toast)window.FB.toast('檔案連結正在移轉整理中');
  },true);
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,120);setTimeout(run,350)});
  if(document.readyState!=='loading')setTimeout(run,0);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,40));
})();


/* ===== assets/js/catalog-ui.js ===== */
(function(){
  function esc(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
  function qs(k){return new URLSearchParams(location.search).get(k)}
  function idFromCard(card){try{return new URL(card.href,location.href).searchParams.get('id')}catch(e){return ''}}
  function imageMarkup(p){if(!p?.image)return '';return `<div class="official-product-photo"><img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy"><span>${esc(p.brand)}</span></div>`}
  function getBrandOrder(category,d){
    const map=window.FBOfficialOrder?.brandOrder?.()||{};
    if(category!=='all'&&map[category])return map[category];
    const agency=window.FBOfficialOrder?.agency?.()||[];
    if(agency.length)return agency;
    const all=[];(d.categories||[]).forEach(c=>(map[c.id]||[]).forEach(b=>{if(!all.includes(b))all.push(b)}));return all;
  }
  function sortProducts(list,d){
    const cats=(d.categories||[]).map(c=>c.id),map=window.FBOfficialOrder?.brandOrder?.()||{};
    return list.slice().sort((a,b)=>{const ca=cats.indexOf(a.category),cb=cats.indexOf(b.category);if(ca!==cb)return(ca<0?999:ca)-(cb<0?999:cb);const bo=map[a.category]||[],ba=Number.isFinite(a.brandOrder)?a.brandOrder:bo.indexOf(a.brand),bb=Number.isFinite(b.brandOrder)?b.brandOrder:bo.indexOf(b.brand);if(ba!==bb)return(ba<0?999:ba)-(bb<0?999:bb);return(Number.isFinite(a.legacyOrder)?a.legacyOrder:9999)-(Number.isFinite(b.legacyOrder)?b.legacyOrder:9999)})
  }
  function patchProductCards(d){document.querySelectorAll('.product-card').forEach(card=>{const p=d.products.find(x=>x.id===idFromCard(card)),holder=card.querySelector('.product-card-visual');if(p?.image&&holder)holder.innerHTML=imageMarkup(p)})}
  function productsPage(){
    if(document.body.dataset.page!=='products')return;
    const d=FBStore.getData(),active=qs('category')||'all',brand=qs('brand')||'all',order=getBrandOrder(active,d);
    let available=[...new Set(d.products.filter(p=>active==='all'||p.category===active).map(p=>p.brand))];
    if(active==='all'&&window.FBOfficialOrder?.agency){const agency=window.FBOfficialOrder.agency();available=agency.filter(b=>available.includes(b))}
    available.sort((a,b)=>{const ai=order.indexOf(a),bi=order.indexOf(b);return(ai<0?999:ai)-(bi<0?999:bi)});
    const tabs=document.getElementById('brandTabs');
    if(tabs){const base=active==='all'?'products.html':`products.html?category=${encodeURIComponent(active)}`;tabs.innerHTML=`<a class="brand-chip ${brand==='all'?'active':''}" href="${base}">全部品牌</a>`+available.map(b=>{const sp=new URLSearchParams();if(active!=='all')sp.set('category',active);sp.set('brand',b);return `<a class="brand-chip ${brand===b?'active':''}" href="products.html?${sp.toString()}">${esc(b)}</a>`}).join('')}
    const filtered=sortProducts(d.products.filter(p=>(active==='all'||p.category===active)&&(brand==='all'||p.brand===brand)),d),grid=document.getElementById('productGrid');
    if(grid){const nodes=new Map([...grid.querySelectorAll('.product-card')].map(el=>[idFromCard(el),el]));filtered.forEach(p=>{const el=nodes.get(p.id);if(el)grid.appendChild(el)})}
    patchProductCards(d);
  }
  function productPage(){
    if(document.body.dataset.page!=='product')return;
    const d=FBStore.getData(),id=qs('id'),p=d.products.find(x=>x.id===id);if(!p)return;
    const holder=document.querySelector('.product-detail-visual');if(p.image&&holder)holder.innerHTML=imageMarkup(p);patchProductCards(d);
    const hi=document.getElementById('productHighlights');
    if(hi&&(!p.highlights||!p.highlights.length))hi.innerHTML='';
  }
  function downloadOrder(){
    if(document.body.dataset.page!=='downloads')return;
    const d=FBStore.getData(),order=window.FBOfficialOrder?.downloads?.()||[],holder=document.getElementById('downloadBrands');if(!holder)return;
    const buttons=[...holder.querySelectorAll('[data-brand]')];buttons.sort((a,b)=>{const ai=order.indexOf(a.dataset.brand),bi=order.indexOf(b.dataset.brand);return(ai<0?999:ai)-(bi<0?999:bi)}).forEach(b=>holder.appendChild(b));
  }
  function run(){if(!window.FBStore)return;const d=FBStore.getData();productsPage();productPage();downloadOrder();patchProductCards(d)}
  document.addEventListener('DOMContentLoaded',()=>{setTimeout(run,30);setTimeout(run,250)});if(document.readyState!=='loading')setTimeout(run,30);window.addEventListener('farbeyound:datachange',()=>setTimeout(run,80));
})();


/* ===== assets/js/v4-polish.js ===== */
(function(){
  const MAPS={
    '台北總公司':'新北市中和區中山路二段351號10樓之1',
    '台南分公司':'台南市永康區中華路425號4樓之18'
  };
  const mapUrl=address=>`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  let navObserver=null;
  let navApplying=false;

  function desiredNavNode(nav){
    const page=document.body.dataset.page||'';
    const targets={
      products:['products.html'],product:['products.html'],
      downloads:['downloads.html'],solutions:['solutions.html'],cases:['cases.html'],
      news:['news.html'],'news-detail':['news.html'],
      about:['about.html'],locations:['locations.html','about.html'],contact:['contact.html','about.html'],'preview-guide':['about.html']
    }[page]||[];
    const nodes=[...nav.children];
    for(const target of targets){
      const found=nodes.find(node=>{
        const a=node.matches('a')?node:node.querySelector(':scope > a');
        const href=(a?.getAttribute('href')||'').split('?')[0].split('#')[0];
        return href===target;
      });
      if(found)return found;
    }
    return null;
  }

  function currentNav(){
    if(document.body.dataset.page==='admin'||navApplying)return;
    const nav=document.querySelector('.desktop-nav');
    if(!nav)return;
    const active=desiredNavNode(nav);
    if(!active)return;
    const nodes=[...nav.children];
    const activeLink=active.matches('a')?active:active.querySelector(':scope > a');
    const alreadyCorrect=active.classList.contains('current')&&activeLink?.getAttribute('aria-current')==='page'&&nodes.every(node=>node===active||!node.classList.contains('current'));
    if(alreadyCorrect)return;

    navApplying=true;
    nodes.forEach(node=>{
      const a=node.matches('a')?node:node.querySelector(':scope > a');
      const should=node===active;
      node.classList.toggle('current',should);
      a?.classList.toggle('current',should);
      if(should)a?.setAttribute('aria-current','page');
      else a?.removeAttribute('aria-current');
    });
    navApplying=false;
  }

  function observeNav(){
    const nav=document.querySelector('.desktop-nav');
    if(!nav)return;
    if(navObserver)navObserver.disconnect();
    navObserver=new MutationObserver(mutations=>{
      if(navApplying)return;
      if(mutations.some(m=>m.type==='childList'||m.type==='attributes'))requestAnimationFrame(currentNav);
    });
    navObserver.observe(nav,{childList:true,subtree:true,attributes:true,attributeFilter:['class','aria-current']});
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
    setTimeout(currentNav,420);
    setTimeout(currentNav,1100);
    setTimeout(currentNav,2200);
  });
  if(document.readyState!=='loading')setTimeout(run,40);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,120));
})();


/* ===== assets/js/interaction-upgrade.js ===== */
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


/* ===== assets/js/product-resources.js ===== */
(function(){
  if(!window.FBStore || window.__fbProductResources) return;
  window.__fbProductResources = true;

  const rawGet = FBStore.getData.bind(FBStore);
  const key = v => String(v || '').trim().toLowerCase().replace(/\s+/g,'');

  FBStore.getData = function(){
    const data = rawGet();
    const map = window.FBProductDocs?.items || {};

    (data.products || []).forEach(product => {
      const imported = Array.isArray(map[product.legacyUrl]) ? map[product.legacyUrl] : [];
      if(!imported.length) return;

      const existing = Array.isArray(product.files) ? product.files : [];
      const merged = [];
      const seen = new Set();

      imported.forEach(file => {
        if(!file || !file.url) return;
        const sig = key(file.label) + '|' + key(file.url);
        if(seen.has(sig)) return;
        seen.add(sig);
        merged.push({
          label: file.label || '技術文件',
          type: file.type || (/\.pdf(?:$|\?)/i.test(file.url) ? 'PDF' : '文件'),
          url: file.url,
          source: 'official'
        });
      });

      existing.forEach(file => {
        if(!file) return;
        const sameLabel = merged.some(x => key(x.label) === key(file.label));
        if(sameLabel && !file.url) return;
        const sig = key(file.label) + '|' + key(file.url);
        if(seen.has(sig)) return;
        seen.add(sig);
        merged.push(file);
      });

      product.files = merged;
    });

    return data;
  };
})();


/* ===== assets/js/home-brand-polish.js ===== */
(function(){
  if(document.body.dataset.page!=='home'||window.__fbHomeBrandPolish)return;
  window.__fbHomeBrandPolish=true;

  const GUIDE_ITEMS=[
    {
      no:'01',title:'標籤條碼列印機',en:'LABEL PRINTERS',desc:'工業型、桌上型與行動型標籤列印設備，依印量、解析度與作業環境協助選型。',
      brands:['Zebra','Argox','TSC','GoDEX','TOSHIBA','SATO','Honeywell'],
      href:'products.html?category=printers',primary:'查看列印設備',secondaryHref:'contact.html',secondary:'詢問選型',icon:'printer'
    },
    {
      no:'02',title:'列印耗材',en:'LABELS & RIBBONS',desc:'標籤紙、碳帶與客製規格，可依材質、尺寸、黏性及實際使用環境協助搭配。',
      brands:['各式標籤紙','碳帶','客製規格'],
      href:'products.html?category=labels',primary:'查看耗材',secondaryHref:'contact.html',secondary:'耗材詢問',icon:'label'
    },
    {
      no:'03',title:'標籤編輯軟體',en:'LABEL SOFTWARE',desc:'正版授權、安裝設定與導入服務，協助建立條碼、標籤格式及列印作業流程。',
      brands:['BarTender','CodeSoft'],
      href:'products.html?category=software',primary:'了解軟體',secondaryHref:'downloads.html',secondary:'下載服務',icon:'software'
    },
    {
      no:'04',title:'條碼掃描器',en:'BARCODE SCANNERS',desc:'一維、二維、有線與無線掃描設備，依條碼類型、距離與現場環境選擇適合機種。',
      brands:['FASTECH','Zebra','NUMA','Honeywell','Datalogic'],
      href:'products.html?category=scanners',primary:'查看掃描設備',secondaryHref:'downloads.html',secondary:'下載服務',icon:'scanner'
    },
    {
      no:'05',title:'行動裝置 PDA',en:'MOBILE COMPUTERS',desc:'適用倉儲盤點、物流、生產與現場作業的企業行動終端與資料收集設備。',
      brands:['Zebra','UROVO'],
      href:'products.html?category=mobile',primary:'查看行動裝置',secondaryHref:'contact.html',secondary:'需求詢問',icon:'mobile'
    }
  ];

  const ICONS={
    printer:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8V3h10v5M7 17h10v4H7zM5 16H3v-6h18v6h-2M17 12h.01"/></svg>',
    label:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h10l6 7-6 7H4zM8 9h.01M8 13h8M8 16h5"/></svg>',
    software:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4zM4 9h16M8 4v5M8 14h4M8 17h8"/></svg>',
    scanner:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v5H7zM9 8v4l-3 2v7h12v-9l-3-4M3 12v-2h3M21 12v-2h-3M9 16h6"/></svg>',
    mobile:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10v20H7zM10 5h4M10 18h4M10 9h4v5h-4z"/></svg>'
  };

  function addStyle(){
    if(document.getElementById('fbHomeBrandPolishStyle'))return;
    const s=document.createElement('style');
    s.id='fbHomeBrandPolishStyle';
    s.textContent=`
      body[data-page="home"] .v2-service-strip{display:none!important}

      /* Homepage quick service guide — formal corporate version */
      .fb-home-guide{padding:62px 0 58px;background:#f6f9fb;border-bottom:1px solid #e5edf2}
      .fb-home-guide-head{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,470px);gap:42px;align-items:end;margin-bottom:26px}
      .fb-home-guide-kicker{display:block;margin-bottom:9px;font-size:10px;line-height:1;font-weight:800;letter-spacing:.2em;color:#078fad}
      .fb-home-guide-head h2{margin:0;color:#17344e;font-size:31px;line-height:1.2;letter-spacing:-.035em;font-weight:780}
      .fb-home-guide-head p{margin:0;color:#667d8f;font-size:13px;line-height:1.8}
      .fb-home-guide-note{display:inline-flex;align-items:center;gap:8px;margin-top:14px;color:#48667c;font-size:11px;font-weight:700}
      .fb-home-guide-note:before{content:"";width:7px;height:7px;border-radius:50%;background:#16a1c4;box-shadow:0 0 0 4px rgba(22,161,196,.10)}

      .fb-service-cards{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));background:#fff;border:1px solid #dfe8ee;box-shadow:0 16px 42px rgba(28,60,84,.06)}
      .fb-service-card{position:relative;min-width:0;min-height:360px;padding:25px 22px 22px;border-right:1px solid #e3ebf0;background:#fff;display:flex;flex-direction:column;transition:transform .18s ease,box-shadow .18s ease,background .18s ease}
      .fb-service-card:last-child{border-right:0}
      .fb-service-card:before{content:"";position:absolute;left:0;right:0;top:0;height:3px;background:#173f5f;transform:scaleX(0);transform-origin:left;transition:transform .2s ease}
      .fb-service-card:hover{z-index:2;transform:translateY(-4px);box-shadow:0 18px 34px rgba(26,61,88,.10);background:#fbfdff}
      .fb-service-card:hover:before{transform:scaleX(1)}
      .fb-service-card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:21px}
      .fb-service-icon{width:42px;height:42px;display:grid;place-items:center;color:#176487;background:#eef7fa;border:1px solid #d6e9f0}
      .fb-service-icon svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.55;stroke-linecap:round;stroke-linejoin:round}
      .fb-service-no{font-size:10px;line-height:1;font-weight:800;letter-spacing:.12em;color:#9aabb7}
      .fb-service-card h3{margin:0;color:#17344e;font-size:20px;line-height:1.35;letter-spacing:-.02em;font-weight:760}
      .fb-service-en{display:block;margin-top:7px;color:#8a9daa;font-size:8px;line-height:1;font-weight:800;letter-spacing:.16em}
      .fb-service-desc{margin:17px 0 0;color:#667b8b;font-size:12px;line-height:1.75;min-height:64px}
      .fb-service-tags{display:flex;flex-wrap:wrap;align-content:flex-start;gap:7px;margin:20px 0 22px;padding-top:18px;border-top:1px solid #edf1f4}
      .fb-service-tag{display:inline-flex;align-items:center;min-height:28px;padding:5px 9px;border:1px solid #dce5ea;background:#fff;color:#35566c;font-size:9px;font-weight:750;letter-spacing:.035em;line-height:1.2}
      .fb-service-tag.is-own{border-color:#b7dce9;background:#f0f9fc;color:#0b7e9f}
      .fb-service-actions{display:flex;flex-direction:column;gap:8px;margin-top:auto}
      .fb-service-primary,.fb-service-secondary{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:39px;padding:9px 11px;text-decoration:none;font-size:10px;font-weight:800;letter-spacing:.03em;transition:background .16s ease,border-color .16s ease,color .16s ease}
      .fb-service-primary{background:#173f5f;color:#fff;border:1px solid #173f5f}
      .fb-service-primary:hover{background:#0e5478;border-color:#0e5478}
      .fb-service-secondary{background:#fff;color:#45657a;border:1px solid #d9e3e9}
      .fb-service-secondary:hover{color:#173f5f;border-color:#a9c4d2;background:#f8fbfd}
      .fb-service-arrow{font-size:13px;line-height:1}

      .fb-process-panel{margin-top:24px;padding:28px 30px 29px;background:#12324d;color:#fff;display:grid;grid-template-columns:240px minmax(0,1fr);gap:36px;align-items:center}
      .fb-process-intro small{display:block;margin-bottom:7px;color:#6ed1e6;font-size:9px;font-weight:800;letter-spacing:.18em}
      .fb-process-intro h3{margin:0;font-size:22px;line-height:1.3;font-weight:760;letter-spacing:-.02em}
      .fb-process-intro p{margin:10px 0 0;color:#aabcc9;font-size:11px;line-height:1.7}
      .fb-process-steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0}
      .fb-process-step{position:relative;min-width:0;padding:3px 25px 3px 25px;border-left:1px solid rgba(255,255,255,.14)}
      .fb-process-step:first-child{border-left:0;padding-left:0}
      .fb-process-step span{display:block;margin-bottom:8px;color:#72d0e4;font-size:9px;font-weight:800;letter-spacing:.13em}
      .fb-process-step b{display:block;color:#fff;font-size:14px;line-height:1.35;font-weight:760}
      .fb-process-step p{margin:6px 0 0;color:#a9bcc8;font-size:10px;line-height:1.6}
      .fb-process-step:not(:last-child):after{content:"→";position:absolute;right:-8px;top:17px;color:#6a8799;font-size:14px}

      body[data-page="home"] .brand-portfolio{padding:46px 0 50px!important;background:linear-gradient(180deg,#fff 0%,#fbfdff 100%)!important}
      body[data-page="home"] .brand-portfolio-head{display:flex!important;align-items:flex-end!important;justify-content:space-between!important;gap:28px!important;margin-bottom:24px!important}
      body[data-page="home"] .brand-portfolio-title{gap:16px!important}
      body[data-page="home"] .brand-portfolio-title small{font-size:10px!important;letter-spacing:.18em!important;color:#0c92b0!important;font-weight:800!important}
      body[data-page="home"] .brand-portfolio-title h2{font-size:28px!important;letter-spacing:-.03em!important;font-weight:760!important;color:#16324b!important}
      body[data-page="home"] .brand-portfolio-head>p{font-size:12px!important;color:#7a8d9d!important;margin:0!important}

      body[data-page="home"] .brand-family{min-height:104px!important;border-top:1px solid #e3ebf0!important;border-left:1px solid #e3ebf0!important;background:#fff!important;overflow:visible!important}
      body[data-page="home"] .brand-family+.brand-family{border-top:0!important}
      body[data-page="home"] .brand-family-label{min-height:104px!important;padding:0 18px!important;display:flex!important;flex-direction:column!important;justify-content:center!important;background:linear-gradient(145deg,#f6f9fb,#f1f6f9)!important;color:#213f57!important;font-size:13px!important;font-weight:760!important;line-height:1.35!important;border-right:1px solid #e3ebf0!important;border-bottom:1px solid #e3ebf0!important}
      body[data-page="home"] .brand-family-label small{margin-top:7px!important;font-size:8px!important;letter-spacing:.11em!important;color:#92a4b2!important;font-weight:800!important}
      body[data-page="home"] .brand-wordmarks{overflow:visible!important}
      body[data-page="home"] .brand-wordmark{position:relative!important;min-height:104px!important;background:#fff!important;border-right:1px solid #e3ebf0!important;border-bottom:1px solid #e3ebf0!important;transition:background .18s ease,border-color .18s ease,box-shadow .18s ease!important}
      body[data-page="home"] .brand-wordmark:hover{z-index:2!important;transform:none!important;box-shadow:0 9px 24px rgba(22,50,75,.08)!important;background:#fff!important}

      /* FASTECH own-brand tile */
      body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech{position:relative!important;min-height:104px!important;padding:0!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:left!important;color:#16324b!important;background:linear-gradient(145deg,#ffffff 0%,#f8fcff 100%)!important;border-right:1px solid #d4e5ee!important;border-bottom:1px solid #d4e5ee!important;box-shadow:inset 3px 0 0 #1595c5!important;overflow:hidden!important}
      body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech:hover{z-index:3!important;background:linear-gradient(145deg,#ffffff 0%,#f2faff 100%)!important;border-color:#b9dce9!important;box-shadow:inset 3px 0 0 #1595c5,0 10px 26px rgba(19,87,126,.10)!important}
      body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech:before,body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech:after{content:none!important;display:none!important}
      body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech>.brand-logo-img{display:none!important}
      .fb-own-brand-card{position:relative;width:100%;height:104px;display:flex;align-items:center;justify-content:center;padding:18px 18px 13px;box-sizing:border-box}
      .fb-own-brand-badge{position:absolute;right:12px;top:10px;display:inline-flex;align-items:center;gap:5px;padding:3px 7px;border:1px solid #acd9e9;border-radius:999px;background:#f4fbfe;color:#177fa7;font-size:8px;font-weight:800;letter-spacing:.08em;line-height:1.2;white-space:nowrap}
      .fb-own-brand-badge:before{content:"";width:5px;height:5px;border-radius:50%;background:#18a5d6}
      .fb-own-brand-main{display:flex;align-items:center;justify-content:center;gap:14px;width:100%;padding-top:7px}
      .fb-own-brand-logo{display:block!important;width:58px!important;height:58px!important;max-width:58px!important;max-height:58px!important;object-fit:contain!important;flex:0 0 58px;border-radius:13px;box-shadow:0 5px 14px rgba(23,83,119,.10)}
      .fb-own-brand-copy{display:flex;flex-direction:column;min-width:0;line-height:1.2}
      .fb-own-brand-copy strong{font-family:Arial,'Noto Sans TC',sans-serif;font-size:17px;font-weight:800;letter-spacing:.08em;color:#163c5d}
      .fb-own-brand-copy span{margin-top:5px;font-size:10px;font-weight:700;color:#47677e;letter-spacing:.03em}
      .fb-own-brand-copy small{margin-top:3px;font-size:7px;font-weight:700;color:#9aabb7;letter-spacing:.13em}

      @media(max-width:1180px){
        .fb-service-cards{grid-template-columns:repeat(3,minmax(0,1fr))}.fb-service-card{border-bottom:1px solid #e3ebf0}.fb-service-card:nth-child(3){border-right:0}.fb-service-card:nth-child(4),.fb-service-card:nth-child(5){min-height:330px}.fb-process-panel{grid-template-columns:200px minmax(0,1fr);gap:24px}.fb-process-step{padding-left:18px;padding-right:18px}
      }
      @media(max-width:980px){
        .fb-home-guide{padding:48px 0}.fb-home-guide-head{grid-template-columns:1fr;gap:13px;align-items:start}.fb-service-cards{grid-template-columns:repeat(2,minmax(0,1fr))}.fb-service-card{min-height:330px!important}.fb-service-card:nth-child(2n){border-right:0}.fb-service-card:nth-child(3){border-right:1px solid #e3ebf0}.fb-service-card:last-child{grid-column:1/-1;border-right:0;min-height:285px!important}.fb-process-panel{grid-template-columns:1fr;gap:22px}.fb-process-steps{grid-template-columns:repeat(2,minmax(0,1fr));row-gap:22px}.fb-process-step:nth-child(3){border-left:0;padding-left:0}.fb-process-step:nth-child(2):after{display:none}
        body[data-page="home"] .brand-portfolio-head{align-items:flex-start!important;display:block!important}body[data-page="home"] .brand-portfolio-head>p{margin-top:9px!important}.fb-own-brand-main{gap:10px}.fb-own-brand-logo{width:52px!important;height:52px!important;max-width:52px!important;max-height:52px!important;flex-basis:52px}.fb-own-brand-copy strong{font-size:15px}
      }
      @media(max-width:680px){
        .fb-home-guide{padding:38px 0 42px}.fb-home-guide-head h2{font-size:26px}.fb-service-cards{display:block;border-bottom:0;box-shadow:none;background:transparent}.fb-service-card{min-height:0!important;margin-bottom:11px;border:1px solid #dfe8ee!important;padding:22px 19px;background:#fff}.fb-service-card:last-child{min-height:0!important}.fb-service-desc{min-height:0}.fb-service-actions{display:grid;grid-template-columns:1fr 1fr}.fb-process-panel{margin-top:18px;padding:24px 20px}.fb-process-steps{display:block}.fb-process-step,.fb-process-step:first-child,.fb-process-step:nth-child(3){padding:15px 0 15px 36px!important;border-left:0;border-top:1px solid rgba(255,255,255,.12)}.fb-process-step:first-child{border-top:0}.fb-process-step:before{content:attr(data-step);position:absolute;left:0;top:17px;color:#72d0e4;font-size:9px;font-weight:800}.fb-process-step span{display:none}.fb-process-step:not(:last-child):after{display:none}
        body[data-page="home"] .brand-portfolio{padding:34px 0 38px!important}body[data-page="home"] .brand-portfolio-title{display:block!important}body[data-page="home"] .brand-portfolio-title h2{margin-top:5px!important;font-size:24px!important}body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech{min-width:220px!important}
      }
    `;
    document.head.appendChild(s);
  }

  function buildGuide(){
    if(document.querySelector('.fb-home-guide'))return;
    const anchor=document.querySelector('.brand-portfolio');
    if(!anchor)return;

    const section=document.createElement('section');
    section.className='fb-home-guide';
    section.setAttribute('aria-labelledby','fbQuickGuideTitle');
    section.innerHTML=`
      <div class="container">
        <div class="fb-home-guide-head">
          <div>
            <span class="fb-home-guide-kicker">QUICK SERVICE GUIDE</span>
            <h2 id="fbQuickGuideTitle">快速找到適合的設備與服務</h2>
            <span class="fb-home-guide-note">不知道型號也沒關係，先從需求類別開始即可</span>
          </div>
          <p>依您的列印、耗材、軟體、掃描或行動作業需求快速進入對應服務；如規格尚未確認，也可直接聯絡我們協助選型。</p>
        </div>
        <div class="fb-service-cards">
          ${GUIDE_ITEMS.map(item=>`<article class="fb-service-card">
            <div class="fb-service-card-top"><span class="fb-service-icon">${ICONS[item.icon]||''}</span><span class="fb-service-no">${item.no}</span></div>
            <h3>${item.title}</h3><span class="fb-service-en">${item.en}</span>
            <p class="fb-service-desc">${item.desc}</p>
            <div class="fb-service-tags">${item.brands.map(x=>`<span class="fb-service-tag${x==='FASTECH'?' is-own':''}">${x}</span>`).join('')}</div>
            <div class="fb-service-actions">
              <a class="fb-service-primary" href="${item.href}"><span>${item.primary}</span><span class="fb-service-arrow">→</span></a>
              <a class="fb-service-secondary" href="${item.secondaryHref}"><span>${item.secondary}</span><span class="fb-service-arrow">→</span></a>
            </div>
          </article>`).join('')}
        </div>
        <div class="fb-process-panel" aria-label="萬里資訊服務流程">
          <div class="fb-process-intro"><small>SERVICE PROCESS</small><h3>從需求到後續支援</h3><p>清楚四步驟，讓設備採購、耗材搭配與技術服務更容易開始。</p></div>
          <div class="fb-process-steps">
            <div class="fb-process-step" data-step="01"><span>STEP 01</span><b>確認需求</b><p>提供用途、設備或現場情況，不必先知道完整型號。</p></div>
            <div class="fb-process-step" data-step="02"><span>STEP 02</span><b>選型與資料</b><p>協助確認產品、耗材、軟體或下載資料。</p></div>
            <div class="fb-process-step" data-step="03"><span>STEP 03</span><b>報價與測試</b><p>依需求提供報價，必要時安排實機或耗材測試。</p></div>
            <div class="fb-process-step" data-step="04"><span>STEP 04</span><b>導入與支援</b><p>提供設定、維修、耗材補充與後續技術服務。</p></div>
          </div>
        </div>
      </div>`;
    anchor.parentNode.insertBefore(section,anchor);
  }

  function markOwnBrand(){
    const card=document.querySelector('.brand-family.scanner .brand-wordmark.fastech');
    if(!card)return;
    card.setAttribute('aria-label','FASTECH 自有品牌｜條碼掃描設備');
    card.setAttribute('title','FASTECH 自有品牌｜條碼掃描設備');
    if(card.dataset.ownBrandReady==='1')return;
    card.dataset.ownBrandReady='1';
    card.innerHTML=`<span class="fb-own-brand-card"><span class="fb-own-brand-badge">自有品牌</span><span class="fb-own-brand-main"><img class="fb-own-brand-logo" src="assets/images/brand/far-beyound-logo.png" alt="FASTECH"><span class="fb-own-brand-copy"><strong>FASTECH</strong><span>條碼掃描設備</span><small>BARCODE SCANNERS</small></span></span></span>`;
  }

  function run(){addStyle();buildGuide();markOwnBrand();}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,120);setTimeout(run,500)},{once:true});
  if(document.readyState!=='loading')setTimeout(run,0);
})();


/* ===== assets/js/home-guide-final.js ===== */
(function(){
  if(document.body.dataset.page!=='home'||window.__fbHomeGuideFinal)return;
  window.__fbHomeGuideFinal=true;

  const ORDER=['標籤條碼列印機','列印耗材','條碼掃描器','標籤編輯軟體','行動裝置 PDA'];

  const TAG_LINKS={
    '標籤條碼列印機':{
      'Zebra':'products.html?category=printers&brand=Zebra',
      'Argox':'products.html?category=printers&brand=Argox',
      'TSC':'products.html?category=printers&brand=TSC',
      'GoDEX':'products.html?category=printers&brand=GoDEX',
      'TOSHIBA':'products.html?category=printers&brand=TOSHIBA',
      'SATO':'products.html?category=printers&brand=SATO',
      'Honeywell':'products.html?category=printers&brand=Honeywell'
    },
    '列印耗材':{
      '各式標籤紙':'products.html?category=labels',
      '碳帶':'products.html?category=labels',
      '客製規格':'contact.html?item=%E8%80%97%E6%9D%90%E5%AE%A2%E8%A3%BD%E8%A6%8F%E6%A0%BC'
    },
    '條碼掃描器':{
      'FASTECH':'products.html?category=scanners&brand=Fastech',
      'Zebra':'products.html?category=scanners&brand=Zebra',
      'NUMA':'products.html?category=scanners&brand=NUMA',
      'Honeywell':'products.html?category=scanners&brand=Honeywell',
      'Datalogic':'products.html?category=scanners&brand=Datalogic'
    },
    '標籤編輯軟體':{
      'BarTender':'product.html?id=software-bartender',
      'CodeSoft':'product.html?id=software-codesoft'
    },
    '行動裝置 PDA':{
      'Zebra':'products.html?category=mobile&brand=Zebra',
      'UROVO':'product.html?id=urovo-dt66-ct48c-dt50-dt40-rt40s'
    }
  };

  function addStyle(){
    if(document.getElementById('fbHomeGuideFinalStyle'))return;
    const style=document.createElement('style');
    style.id='fbHomeGuideFinalStyle';
    style.textContent=`
      body[data-page="home"] .fb-service-card:before{background:#173f5f!important;transform:scaleX(0)!important;transform-origin:left center!important;opacity:0!important}
      body[data-page="home"] .fb-service-card:hover:before,body[data-page="home"] .fb-service-card:focus-within:before{transform:scaleX(1)!important;opacity:1!important}
      body[data-page="home"] .fb-service-tags{gap:7px!important}
      body[data-page="home"] .fb-service-tag,body[data-page="home"] .fb-service-tag-link{box-sizing:border-box!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:30px!important;padding:6px 10px!important;border:1px solid #d9e4ea!important;border-radius:4px!important;background:#fff!important;color:#35566c!important;font-size:9px!important;font-weight:760!important;letter-spacing:.025em!important;line-height:1.2!important;text-decoration:none!important;cursor:pointer!important;transition:background .18s ease,border-color .18s ease,color .18s ease,transform .18s ease,box-shadow .18s ease!important}
      body[data-page="home"] .fb-service-tag.is-own,body[data-page="home"] .fb-service-tag-link.is-own{border-color:#d9e4ea!important;background:#fff!important;color:#35566c!important}
      body[data-page="home"] .fb-service-tag-link:hover{border-color:#adc6d3!important;background:#f3f8fb!important;color:#173f5f!important;transform:translateY(-1px)!important;box-shadow:0 4px 10px rgba(25,61,86,.06)!important}
      body[data-page="home"] .fb-service-tag-link:focus-visible{outline:2px solid #1596b4!important;outline-offset:2px!important}
      body[data-page="home"] .fb-service-tag-link:active{transform:translateY(0)!important;background:#eaf3f7!important}
      body[data-page="home"] .fb-service-title-row{display:flex!important;align-items:center!important;flex-wrap:wrap!important;gap:8px!important}
      body[data-page="home"] .fb-service-title-row h3{margin:0!important}
      body[data-page="home"] .fb-service-primary,body[data-page="home"] .fb-service-secondary{border-radius:2px!important}
      @media(max-width:680px){body[data-page="home"] .fb-service-tag,body[data-page="home"] .fb-service-tag-link{min-height:32px!important;padding:7px 11px!important;font-size:10px!important}}
    `;
    document.head.appendChild(style);
  }

  function makeTagsClickable(card,title){
    const map=TAG_LINKS[title]||{};
    const tags=card.querySelector('.fb-service-tags');
    if(!tags)return;
    [...tags.querySelectorAll('.fb-service-tag')].forEach(tag=>{
      if(tag.tagName==='A')return;
      const label=tag.textContent.trim();
      const href=map[label];
      if(!href)return;
      const link=document.createElement('a');
      link.className='fb-service-tag-link';link.href=href;link.textContent=label;
      link.setAttribute('aria-label',`${title}：${label}`);link.title=`查看 ${label}`;tag.replaceWith(link);
    });
    tags.querySelectorAll('.fb-service-tag-link,.fb-service-tag').forEach(el=>el.classList.remove('is-own'));
  }

  function removeOwnBrandBadge(card){card.querySelectorAll('.fb-service-own-badge').forEach(el=>el.remove())}

  function apply(){
    addStyle();
    const guide=document.querySelector('.fb-home-guide');
    const cards=guide?.querySelector('.fb-service-cards');
    if(!guide||!cards)return false;
    const byTitle=new Map([...cards.querySelectorAll('.fb-service-card')].map(card=>[card.querySelector('h3')?.textContent.trim(),card]));
    const desired=ORDER.map((title,index)=>{
      const card=byTitle.get(title);
      if(!card)return null;
      const no=card.querySelector('.fb-service-no');if(no)no.textContent=String(index+1).padStart(2,'0');
      makeTagsClickable(card,title);removeOwnBrandBadge(card);return card;
    }).filter(Boolean);
    const current=[...cards.querySelectorAll(':scope > .fb-service-card')];
    const sameOrder=current.length===desired.length&&desired.every((card,index)=>current[index]===card);
    if(!sameOrder){const fragment=document.createDocumentFragment();desired.forEach(card=>fragment.appendChild(card));cards.appendChild(fragment)}
    const heading=guide.querySelector('#fbQuickGuideTitle');if(heading&&heading.textContent!=='快速找到適合的產品與服務')heading.textContent='快速找到適合的產品與服務';
    const desc=guide.querySelector('.fb-home-guide-head > p');const text='依您的列印、耗材、掃描、軟體或行動作業需求快速進入對應服務；如規格尚未確認，也可直接聯絡我們協助選型。';if(desc&&desc.textContent!==text)desc.textContent=text;
    return true;
  }

  function run(){
    if(apply())return;
    const observer=new MutationObserver(()=>{if(apply())observer.disconnect()});
    observer.observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();

/* ===== assets/js/home-hero-carousel.js ===== */
(function(){'use strict';if(window.__fbHomeHeroCarousel)return;window.__fbHomeHeroCarousel=true;const DEFAULT={enabled:true,autoplay:true,interval:3500,showControls:true,showCredibility:false,eyebrow:'萬里資訊股份有限公司',title:'企業條碼設備與\n自動識別整合服務',accentLine:1,intro:'從標籤列印、條碼掃描、RFID、企業行動電腦，到標籤耗材、設備維修與現場系統整合，依實際作業需求提供完整服務。',primaryText:'查看產品資訊',primaryUrl:'products.html',secondaryText:'了解系統方案',secondaryUrl:'solutions.html',trustItems:[{label:'設備選型',url:'products.html',enabled:true},{label:'耗材供應',url:'products.html?category=labels',enabled:true},{label:'維修支援',url:'products.html?category=parts',enabled:true},{label:'系統整合',url:'solutions.html',enabled:true}],productIds:['zebra-zt610-zt620','fastech-ft-yx510','zebra-zt411-zt421','zebra-ds4678-xd','honeywell-xenon-1900-1902','tsc-mh241-mh341-mh641']};const IMAGES={'zebra-zt610-zt620':'assets/images/products/zebra-zt610-zt620.jpg?v=20260918-1455','zebra-zt411-zt421':'assets/images/products/zebra-zt411-zt421.png?v=20260918-1455','zebra-ds4678-xd':'assets/images/products/zebra-ds4678-xd.jpg?v=20260918-1455','fastech-ft-yx510':'assets/images/products/fastech-ft-yx510.jpg?v=20260918-1455','honeywell-xenon-1900-1902':'assets/images/products/honeywell-xenon-1900-1902.png?v=20260918-1455','tsc-mh241-mh341-mh641':'assets/images/products/tsc-mh241-mh341-mh641.png?v=20260918-1455','tsc-tx610':'assets/images/products/tsc-tx610.png?v=20260918-1455','argox-cx3140-pro':'assets/images/products/argox-cx3140-pro.jpg?v=20260918-1455','godex-g500-g530':'assets/images/products/godex-g500-g530.png?v=20260918-1455','godex-gx4200i-gx4300i-gx4600i':'assets/images/products/godex-gx4200i-gx4300i-gx4600i.jpg?v=20260918-1455'};const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const cfg=()=>{const c=Object.assign({},DEFAULT,(window.FBStore?.getData?.().homeHero||{}));c.trustItems=Array.isArray(c.trustItems)?c.trustItems:DEFAULT.trustItems;return c};const productMap=()=>new Map((window.FBStore?.getData?.().products||[]).map(p=>[p.id,p]));const photo=p=>IMAGES[p.id]||p.image||'';let index=0,timer=null;
function patchCopy(c){const hero=document.querySelector('.hero.v2-home-hero');if(!hero)return;const eyebrow=hero.querySelector('.hero-copy .eyebrow');if(eyebrow)eyebrow.textContent=c.eyebrow||DEFAULT.eyebrow;const h1=hero.querySelector('.hero-copy h1');if(h1){const lines=String(c.title||DEFAULT.title).split(/\n/);h1.innerHTML=lines.map((x,i)=>i===Number(c.accentLine||1)?`<em>${esc(x)}</em>`:esc(x)).join('<br>')}const intro=hero.querySelector('.hero-copy>p');if(intro)intro.textContent=c.intro||DEFAULT.intro;const buttons=hero.querySelectorAll('.hero-actions a');if(buttons[0]){buttons[0].textContent=c.primaryText||DEFAULT.primaryText;buttons[0].href=c.primaryUrl||DEFAULT.primaryUrl}if(buttons[1]){buttons[1].textContent=c.secondaryText||DEFAULT.secondaryText;buttons[1].href=c.secondaryUrl||DEFAULT.secondaryUrl}}
function patchTrust(c){const box=document.querySelector('.hero-trust');if(!box)return;box.innerHTML='';c.trustItems.filter(x=>x.enabled!==false).forEach(x=>{const a=document.createElement('a');a.href=x.url||'#';const s=document.createElement('span');s.textContent=x.label||'未命名';a.appendChild(s);box.appendChild(a)})}
function patchCredibility(c){const strip=document.querySelector('.v5-credibility');if(strip)strip.style.display=c.showCredibility?'block':'none'}function selected(c){const map=productMap();const ids=(c.productIds||DEFAULT.productIds).filter(id=>map.has(id)&&map.get(id)?.published!==false);return ids.map(id=>map.get(id)).filter(Boolean)}function tile(p,kind){const src=photo(p),priority=kind==='main'?'loading="eager" fetchpriority="high"':'loading="lazy" fetchpriority="low"',img=src?`<img src="${esc(src)}" alt="${esc(p.name||'產品')}" ${priority} decoding="async">`:'<div class="home-hero-fallback">PRODUCT</div>';if(kind==='main')return `<a class="v2-stage-main hero-rotate-card is-entering" href="product.html?id=${encodeURIComponent(p.id)}"><span class="v2-stage-label">${esc((p.type||'PRODUCT').toUpperCase())}</span>${img}<span class="v2-stage-caption"><small>${esc(p.subtitle||p.type||'產品')}</small><b>${esc(p.name||'產品')}</b></span></a>`;return `<a class="hero-rotate-side is-entering" href="product.html?id=${encodeURIComponent(p.id)}">${img}<span><small>${esc(p.brand||'')}</small>${esc(p.name||'產品')}</span></a>`}
function renderStage(){const c=cfg(),box=document.querySelector('.v2-hero-products');if(!box)return;if(!c.enabled){box.style.display='';return}box.style.display='';const list=selected(c);if(!list.length){box.style.display='none';return}index=((index%list.length)+list.length)%list.length;const p0=list[index],p1=list[(index+1)%list.length],p2=list[(index+2)%list.length];const controls=c.showControls&&list.length>1?`<div class="hero-rotate-controls"><button type="button" data-hero-prev aria-label="上一個產品">‹</button><div class="hero-rotate-dots">${list.map((_,i)=>`<button type="button" data-hero-dot="${i}" class="${i===index?'active':''}" aria-label="切換到第 ${i+1} 個產品"></button>`).join('')}</div><button type="button" data-hero-next aria-label="下一個產品">›</button></div>`:'';box.innerHTML=`${tile(p0,'main')}<div class="v2-stage-side">${tile(p1,'side')}${tile(p2,'side')}</div>${controls}`;box.querySelector('[data-hero-prev]')?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();index--;renderStage();restart()});box.querySelector('[data-hero-next]')?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();index++;renderStage();restart()});box.querySelectorAll('[data-hero-dot]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();index=+b.dataset.heroDot;renderStage();restart()}));box.onmouseenter=()=>stop();box.onmouseleave=()=>start()}
function stop(){if(timer){clearInterval(timer);timer=null}}function start(){stop();const c=cfg(),list=selected(c);if(!c.enabled||!c.autoplay||list.length<2)return;timer=setInterval(()=>{index++;renderStage()},Math.max(2500,Number(c.interval)||3500))}function restart(){start()}function run(){if(document.body.dataset.page!=='home')return;const c=cfg();patchCopy(c);patchTrust(c);patchCredibility(c);renderStage();start()}let initialReady=false;function launch(){if(initialReady)return;initialReady=true;run()}function scheduleInitial(){const task=()=>launch();if('requestIdleCallback'in window)requestIdleCallback(task,{timeout:900});else setTimeout(task,250)}if(document.readyState==='complete')scheduleInitial();else window.addEventListener('load',scheduleInitial,{once:true});window.addEventListener('farbeyound:datachange',()=>{index=0;if(initialReady)run()})})();

/* ===== assets/js/public-product-visibility.js ===== */
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
    const id=new URLSearchParams(location.search).get('id')||'';if(!id||!hiddenIds().has(id))return;
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

