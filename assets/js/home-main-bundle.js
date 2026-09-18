/* HOME MAIN BUNDLE — existing production scripts concatenated in current execution order. site-social remains direct for release-gate visibility. */

/* ===== assets/js/app.js ===== */
(function () {
  const $ = (s, p=document) => p.querySelector(s);
  const PUBLIC_BUILD = (() => {
    try { return new URL(document.currentScript?.src || '', location.href).searchParams.get('v') || '20260918-0915'; }
    catch (_) { return '20260918-0915'; }
  })();
  const $$ = (s, p=document) => [...p.querySelectorAll(s)];

  const icons = {
    printer:'<path d="M7 7V3h10v4"/><rect x="5" y="13" width="14" height="8" rx="1"/><path d="M5 17H3v-7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v7h-2"/><path d="M17 17H7"/><circle cx="17" cy="10.5" r=".6" fill="currentColor" stroke="none"/>',
    scanner:'<path d="M7 3h10l1 7-5 2v8a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-7l3-2-4-1z"/><path d="m10 7 5 1"/>',
    rfid:'<path d="M4 9a8 8 0 0 1 8-6"/><path d="M4 15a8 8 0 0 0 8 6"/><path d="M8 10a4 4 0 0 1 4-3"/><path d="M8 14a4 4 0 0 0 4 3"/><circle cx="13" cy="12" r="1.5"/><path d="M15 12h6M19 9v6"/>',
    mobile:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M10 5h4M10 18h4"/><rect x="9" y="8" width="6" height="7" rx="1"/>',
    label:'<path d="M3 7V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9z"/><circle cx="8" cy="8" r="1.5"/>',
    box:'<path d="m4 7 8-4 8 4-8 4z"/><path d="M4 7v10l8 4 8-4V7M12 11v10"/>',
    software:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01M8 13h8M8 16h5"/>',
    wrench:'<path d="M14.7 6.3a4 4 0 0 0-5-5l2.4 2.4-2.8 2.8-2.4-2.4a4 4 0 0 0 5 5l7.1 7.1a2 2 0 1 1-2.8 2.8l-7.1-7.1"/>',
    factory:'<path d="M3 21V9l6 3V9l6 3V5h6v16z"/><path d="M7 21v-4h3v4M16 9h2"/>',
    warehouse:'<path d="m3 10 9-6 9 6v11H3z"/><path d="M7 21v-7h10v7M9 17h6"/>',
    chip:'<rect x="7" y="7" width="10" height="10" rx="1"/><path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4"/><rect x="10" y="10" width="4" height="4" rx=".5"/>',
    download:'<path d="M12 3v12M8 11l4 4 4-4"/><path d="M5 20h14"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    phone:'<path d="M6 3h4l2 5-3 2a14 14 0 0 0 5 5l2-3 5 2v4a3 3 0 0 1-3 3C9.7 21 3 14.3 3 6a3 3 0 0 1 3-3z"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    close:'<path d="m6 6 12 12M18 6 6 18"/>',
    chevron:'<path d="m9 6 6 6-6 6"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>'
  };

  function icon(name, cls='') {
    return `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[name] || icons.box}</svg>`;
  }

  function header() {
    const d = FBStore.getData();
    const cats = d.categories.slice(0,8);
    return `
      <div class="topbar">
        <div class="container topbar-inner">
          <span>企業條碼、自動識別與智慧製造整合</span>
          <div class="topbar-contact">
            ${d.site.phones.map(p=>`<a href="tel:${p.value.replace(/-/g,'')}">${p.label} ${p.value}</a>`).join('<span>•</span>')}
            <a class="line-link" href="https://line.me/R/ti/p/${encodeURIComponent(d.site.line)}" target="_blank" rel="noreferrer">LINE ${d.site.line}</a>
          </div>
        </div>
      </div>
      <header class="site-header">
        <div class="container header-inner">
          <a href="index.html" class="brand" aria-label="萬里資訊首頁">
            <span class="brand-mark"><i></i><i></i><i></i></span>
            <span class="brand-copy"><strong>萬里資訊</strong><small>FAR-BEYOUND</small></span>
          </a>
          <nav class="desktop-nav" aria-label="主要導覽">
            <div class="nav-item has-mega">
              <a href="products.html">產品資訊 <span class="nav-caret">⌄</span></a>
              <div class="mega-menu">
                <div class="mega-head">
                  <div><span class="eyebrow">PRODUCT INFORMATION</span><h3>產品與服務</h3></div>
                  <a href="products.html" class="text-link">查看所有產品 ${icon('arrow')}</a>
                </div>
                <div class="mega-grid">
                  ${cats.map(c=>`<a href="products.html?category=${c.id}" class="mega-card"><span class="mini-icon">${icon(c.icon)}</span><span><b>${c.name}</b><small>${c.en}</small></span></a>`).join('')}
                </div>
              </div>
            </div>
            <a href="downloads.html">下載服務</a>
            <a href="solutions.html">系統方案</a>
            <a href="cases.html">客戶案例</a>
            <a href="news.html">最新消息</a>
            <a href="contact.html">聯絡我們</a>
          </nav>
          <div class="header-actions">
            <button class="icon-btn search-trigger" aria-label="搜尋">${icon('search')}</button>
            <a href="contact.html" class="btn btn-primary btn-sm">免費諮詢</a>
            <button class="icon-btn mobile-menu-trigger" aria-label="開啟選單">${icon('menu')}</button>
          </div>
        </div>
      </header>
      <div class="mobile-drawer" aria-hidden="true">
        <div class="mobile-drawer-panel">
          <div class="drawer-head"><b>網站選單</b><button class="icon-btn mobile-menu-close">${icon('close')}</button></div>
          <div class="drawer-links">
            <a href="index.html">首頁</a><a href="products.html">產品資訊</a><a href="downloads.html">下載服務</a><a href="solutions.html">系統方案</a><a href="cases.html">客戶案例</a><a href="news.html">最新消息</a><a href="about.html">關於我們</a><a href="locations.html">服務據點</a><a href="contact.html">聯絡我們</a>
          </div>
          <div class="drawer-contact">${d.site.phones.map(p=>`<a href="tel:${p.value.replace(/-/g,'')}">${icon('phone')} ${p.label} ${p.value}</a>`).join('')}</div>
        </div>
      </div>
      <div class="search-overlay" aria-hidden="true">
        <div class="search-dialog">
          <div class="search-head"><div><span class="eyebrow">SITE SEARCH</span><h2>搜尋產品與內容</h2></div><button class="icon-btn search-close">${icon('close')}</button></div>
          <label class="search-field">${icon('search')}<input id="siteSearchInput" type="search" placeholder="例如：ZT411、TSC、RFID、WMS" autocomplete="off"></label>
          <div id="siteSearchResults" class="search-results"><div class="search-hint">輸入型號、品牌、產品類型或系統名稱。</div></div>
        </div>
      </div>`;
  }

  function footer() {
    const d = FBStore.getData();
    return `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="brand brand-light"><span class="brand-mark"><i></i><i></i><i></i></span><span class="brand-copy"><strong>萬里資訊</strong><small>FAR-BEYOUND</small></span></a>
            <p>條碼列印、掃描、RFID、企業行動設備與智慧製造系統整合，協助企業建立穩定且可追蹤的現場作業流程。</p>
          </div>
          <div><h4>產品服務</h4><a href="products.html?category=printers">標籤條碼列印機</a><a href="products.html?category=scanners">條碼掃描器</a><a href="products.html?category=rfid">RFID 設備</a><a href="products.html?category=parts">維修與配件</a></div>
          <div><h4>支援資源</h4><a href="downloads.html">下載服務</a><a href="solutions.html">系統方案</a><a href="cases.html">客戶案例</a><a href="news.html">最新消息</a><a href="about.html">關於我們</a><a href="locations.html">服務據點</a><a href="contact.html">免費諮詢</a></div>
          <div><h4>聯絡資訊</h4>${d.site.phones.map(p=>`<a href="tel:${p.value.replace(/-/g,'')}">${p.label} ${p.value}</a>`).join('')}<a href="mailto:${d.site.email}">${d.site.email}</a><span>${d.site.address}</span></div>
        </div>
        <div class="container footer-bottom"><span>© ${new Date().getFullYear()} ${d.site.companyEn}. All Rights Reserved.</span><span>萬里資訊股份有限公司</span></div>
      </footer>`;
  }

  function deviceVisual(type='printer', brand='FAR-BEYOUND', label='DEVICE') {
    const art = {
      printer:`<svg viewBox="0 0 320 240" role="img" aria-label="印表機示意圖"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#e8edf3"/><stop offset="1" stop-color="#c9d3df"/></linearGradient></defs><path d="M70 55h178l18 28v108H70z" fill="url(#g)"/><path d="M92 45h132l24 18H70z" fill="#f8fafc"/><path d="M70 83h196v36H70z" fill="#1f2937"/><rect x="83" y="90" width="45" height="23" rx="4" fill="#14b8a6"/><rect x="148" y="125" width="83" height="55" rx="4" fill="#111827"/><path d="M160 180h60v35h-60z" fill="#fff"/><path d="M172 188h36M172 195h29M172 202h34" stroke="#111827" stroke-width="3"/><circle cx="245" cy="101" r="5" fill="#22c55e"/></svg>`,
      scanner:`<svg viewBox="0 0 320 240"><path d="M113 38h88l16 25-33 64-6 80h-55l7-85-35-23z" fill="#dce3eb"/><path d="M113 38h88l10 17h-107z" fill="#111827"/><path d="m103 55 108 0-27 72-54-5-35-23z" fill="#263241"/><rect x="126" y="64" width="58" height="35" rx="5" fill="#0f172a"/><path d="M136 78h38" stroke="#ef4444" stroke-width="4"/><path d="M130 122h54l-3 36h-55z" fill="#111827"/></svg>`,
      mobile:`<svg viewBox="0 0 320 240"><rect x="105" y="24" width="112" height="192" rx="16" fill="#1f2937"/><rect x="116" y="42" width="90" height="105" rx="7" fill="#dff4f2"/><rect x="132" y="58" width="58" height="9" rx="3" fill="#14b8a6"/><rect x="128" y="78" width="66" height="48" rx="5" fill="#fff"/><path d="M137 88h48M137 98h37M137 108h44" stroke="#94a3b8" stroke-width="4"/><circle cx="161" cy="177" r="18" fill="#334155"/><path d="M161 165v24M149 177h24" stroke="#94a3b8" stroke-width="3"/></svg>`,
      label:`<svg viewBox="0 0 320 240"><path d="M70 70h128l53 50-78 72H70z" fill="#e7edf4"/><circle cx="104" cy="104" r="14" fill="#fff"/><path d="M130 98h65M130 112h47M98 146h98" stroke="#334155" stroke-width="8"/><path d="M208 81l43 39-78 72" fill="none" stroke="#14b8a6" stroke-width="9"/></svg>`,
      box:`<svg viewBox="0 0 320 240"><path d="m160 35 98 52-98 53-98-53z" fill="#e6edf4"/><path d="m62 87 98 53v77L62 164z" fill="#cbd5e1"/><path d="m258 87-98 53v77l98-53z" fill="#dbe4ec"/><path d="m118 65 98 52" stroke="#14b8a6" stroke-width="8"/></svg>`
    };
    return `<div class="device-visual"><div class="device-art">${art[type] || art.printer}</div><div class="device-tag"><span>${brand}</span><b>${label}</b></div></div>`;
  }

  function initCommon() {
    const h = $('#siteHeader'), f = $('#siteFooter');
    if (h) h.innerHTML = header();
    if (f) f.innerHTML = footer();

    const drawer = $('.mobile-drawer');
    $('.mobile-menu-trigger')?.addEventListener('click', ()=>{drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');document.body.classList.add('no-scroll')});
    $('.mobile-menu-close')?.addEventListener('click', closeDrawer);
    drawer?.addEventListener('click', e=>{if(e.target===drawer) closeDrawer()});
    function closeDrawer(){drawer?.classList.remove('open');drawer?.setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll')}

    const overlay = $('.search-overlay');
    $$('.search-trigger').forEach(b=>b.addEventListener('click', ()=>{overlay.classList.add('open'); overlay.setAttribute('aria-hidden','false'); document.body.classList.add('no-scroll'); setTimeout(()=>$('#siteSearchInput')?.focus(),80)}));
    $('.search-close')?.addEventListener('click', closeSearch);
    overlay?.addEventListener('click',e=>{if(e.target===overlay) closeSearch()});
    function closeSearch(){overlay?.classList.remove('open');overlay?.setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll')}

    $('#siteSearchInput')?.addEventListener('input', e=>renderSearch(e.target.value));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDrawer();closeSearch()}});

    let lastY=0;
    window.addEventListener('scroll', ()=>{
      const sh = $('.site-header');
      if (!sh) return;
      sh.classList.toggle('scrolled', window.scrollY > 8);
      lastY=window.scrollY;
    }, {passive:true});
  }

  let searchCatalogPromise=null;

  function loadSearchScript(src, marker) {
    const base=src.split('?')[0];
    if(document.querySelector(`script[src^="${base}"]`)) return Promise.resolve();
    return new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src=src;
      script.dataset[marker]='1';
      script.onload=resolve;
      script.onerror=()=>reject(new Error(`Failed to load ${base}`));
      document.head.appendChild(script);
    });
  }

  function ensureSearchCatalog() {
    if(window.FBLegacyCatalog&&window.__fbLegacyCatalogMerge) return Promise.resolve();
    if(searchCatalogPromise) return searchCatalogPromise;
    searchCatalogPromise=loadSearchScript(`assets/js/legacy-catalog.js?v=${encodeURIComponent(PUBLIC_BUILD)}`,'searchCatalog')
      .then(()=>loadSearchScript(`assets/js/catalog-merge.js?v=${encodeURIComponent(PUBLIC_BUILD)}`,'searchCatalogMerge'))
      .catch(err=>{
        searchCatalogPromise=null;
        console.error('[site-search] catalog lazy-load failed',err);
      });
    return searchCatalogPromise;
  }

  async function renderSearch(q) {
    const box = $('#siteSearchResults'); if(!box) return;
    q=q.trim().toLowerCase();
    if(!q){box.innerHTML='<div class="search-hint">輸入型號、品牌、產品類型或系統名稱。</div>';return}

    /* 完整產品目錄只在使用者實際搜尋時才載入，避免每個公開頁先解析大型舊目錄。 */
    if(!window.FBLegacyCatalog){
      box.innerHTML='<div class="search-hint">正在載入完整產品目錄…</div>';
      await ensureSearchCatalog();
      const input=$('#siteSearchInput');
      if(input&&input.value.trim().toLowerCase()!==q) return;
    }

    const d=FBStore.getData();
    const products=d.products.filter(p=>[p.name,p.brand,p.family,p.subtitle,p.type,p.intro].join(' ').toLowerCase().includes(q)).slice(0,6);
    const solutions=d.solutions.filter(s=>[s.name,s.en,s.desc].join(' ').toLowerCase().includes(q)).slice(0,3);
    const news=d.news.filter(n=>[n.title,n.type,n.excerpt].join(' ').toLowerCase().includes(q)).slice(0,3);
    if(!products.length&&!solutions.length&&!news.length){box.innerHTML=`<div class="empty-state"><b>找不到「${escapeHtml(q)}」</b><span>可以改用品牌、型號或產品類別搜尋。</span></div>`;return}
    box.innerHTML = [
      ...products.map(p=>`<a class="search-result" href="product.html?id=${encodeURIComponent(p.id)}"><span class="result-icon">${icon(p.device||'box')}</span><span><small>產品 · ${escapeHtml(p.brand)}</small><b>${escapeHtml(p.name)}</b></span>${icon('chevron')}</a>`),
      ...solutions.map(s=>`<a class="search-result" href="solutions.html#${encodeURIComponent(s.id)}"><span class="result-icon">${icon(s.icon)}</span><span><small>系統方案</small><b>${escapeHtml(s.name)}</b></span>${icon('chevron')}</a>`),
      ...news.map(n=>`<a class="search-result" href="news.html"><span class="result-icon">${icon('software')}</span><span><small>${escapeHtml(n.type)} · ${escapeHtml(n.date)}</small><b>${escapeHtml(n.title)}</b></span>${icon('chevron')}</a>`)
    ].join('');
  }

  function escapeHtml(str=''){return String(str).replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));}
  function qs(name){return new URLSearchParams(location.search).get(name)}
  function formatDate(d){return d ? d.replaceAll('-','.') : ''}

  window.FB = { $, $$, icon, deviceVisual, escapeHtml, qs, formatDate, initCommon };
  document.addEventListener('DOMContentLoaded', initCommon);
})();


/* ===== assets/js/pages.js ===== */
(function(){
  const { $, $, icon, deviceVisual, escapeHtml, qs, formatDate } = FB;

  const e = v => escapeHtml(v == null ? '' : String(v));
  const enc = v => encodeURIComponent(v == null ? '' : String(v));

  function catCard(c){return `<a class="category-card" href="products.html?category=${enc(c.id)}"><span class="category-icon">${icon(c.icon)}</span><span class="category-body"><small>${e(c.en)}</small><h3>${e(c.name)}</h3><p>${e(c.desc)}</p></span><span class="category-arrow">${icon('arrow')}</span></a>`}
  function productCard(p){return `<a class="product-card" href="product.html?id=${enc(p.id)}"><div class="product-card-visual">${deviceVisual(p.device,p.brand,p.family)}</div><div class="product-card-body"><div class="product-meta"><span>${e(p.brand)}</span><span>${e(p.type)}</span></div><h3>${e(p.name)}</h3><p>${e(p.subtitle)}</p><div class="card-link">查看產品 ${icon('arrow')}</div></div></a>`}
  function solutionCard(s){return `<a class="solution-card" href="solutions.html#${enc(s.id)}"><span class="solution-icon">${icon(s.icon)}</span><small>${e(s.en)}</small><h3>${e(s.name)}</h3><p>${e(s.desc)}</p><span class="card-link">了解方案 ${icon('arrow')}</span></a>`}

  function newsHref(n){
    const direct=String(n?.id||'').trim();
    if(direct)return `news-detail.html?id=${enc(direct)}`;
    const title=String(n?.title||'').toLowerCase();
    const map=[
      [/2026.*萬里資訊.*員工旅遊|2026.*員工旅遊/,'travel-2026'],
      [/原物料價格調整/,'material-price'],
      [/0x0000011b.*0x00000709|共用印表機.*0x0000011b/,'printer-share-error'],
      [/zt411.*zt421|zt421.*zt411/,'zt411-news'],
      [/zt610.*zt620|zt620.*zt610/,'zt610-news']
    ];
    const hit=map.find(([re])=>re.test(title));
    return hit?`news-detail.html?id=${enc(hit[1])}`:`contact.html?item=${enc(n?.title||'消息內容')}`;
  }

  function home(){
    const d=FBStore.getData();
    $('#homeCategories').innerHTML=d.categories.map(catCard).join('');
    $('#homeProducts').innerHTML=d.products.filter(p=>p.featured).slice(0,6).map(productCard).join('');
    $('#homeSolutions').innerHTML=d.solutions.map(solutionCard).join('');
    $('#homeNews').innerHTML=d.news.slice(0,4).map((n,i)=>`<a class="news-row" href="${newsHref(n)}"><div class="news-date"><b>${e(String(n.date||'').slice(8))}</b><span>${e(String(n.date||'').slice(0,7).replace('-',' / '))}</span></div><div class="news-copy"><div><span class="tag">${e(n.type)}</span>${i===0?'<span class="tag tag-new">NEW</span>':''}</div><h3>${e(n.title)}</h3><p>${e(n.excerpt)}</p></div>${icon('arrow')}</a>`).join('');
    if($('#caseStrip'))$('#caseStrip').innerHTML=d.cases.map(c=>`<a href="cases.html" class="case-pill"><span>${e(c.name)}</span><b>${e(c.system)}</b></a>`).join('');
  }

  function products(){
    const d=FBStore.getData(); const active=qs('category')||'all'; const brand=qs('brand')||'all';
    $('#categoryTabs').innerHTML=[`<a class="filter-chip ${active==='all'?'active':''}" href="products.html">全部產品</a>`,...d.categories.map(c=>`<a class="filter-chip ${active===c.id?'active':''}" href="products.html?category=${enc(c.id)}">${e(c.name)}</a>`)].join('');
    const brands=[...new Set(d.products.filter(p=>active==='all'||p.category===active).map(p=>p.brand))].sort();
    $('#brandTabs').innerHTML=[`<a class="brand-chip ${brand==='all'?'active':''}" href="products.html${active!=='all'?`?category=${enc(active)}`:''}">全部品牌</a>`,...brands.map(b=>{const sp=new URLSearchParams(); if(active!=='all')sp.set('category',active);sp.set('brand',b);return `<a class="brand-chip ${brand===b?'active':''}" href="products.html?${sp}">${e(b)}</a>`})].join('');
    const list=d.products.filter(p=>(active==='all'||p.category===active)&&(brand==='all'||p.brand===brand));
    const cat=d.categories.find(c=>c.id===active);
    $('#productPageTitle').textContent=cat?cat.name:'產品資訊';
    $('#productPageSubtitle').textContent=cat?cat.desc:'從標籤列印、掃描、RFID 到行動設備與耗材，依現場需求選擇合適的設備與方案。';
    $('#productCount').textContent=`${list.length} 項產品`;
    $('#productGrid').innerHTML=list.length?list.map(productCard).join(''):'<div class="empty-state wide"><b>目前此分類尚無公開產品資料</b><span>歡迎與我們聯絡，我們將協助您確認適合的產品。</span></div>';
  }

  function product(){
    const d=FBStore.getData(); const id=qs('id'); const p=window.FBFindProduct?FBFindProduct(d.products,id):d.products.find(x=>x.id===id); if(!p)return; const c=d.categories.find(x=>x.id===p.category);
    document.title=`${String(p.name||'')}｜萬里資訊`;
    $('#productBreadcrumb').innerHTML=`<a href="index.html">首頁</a><span>/</span><a href="products.html">產品資訊</a><span>/</span><a href="products.html?category=${enc(c?.id||'')}">${e(c?.name||'')}</a><span>/</span><b>${e(p.name)}</b>`;
    $('#productHero').innerHTML=`<div class="product-detail-visual">${deviceVisual(p.device,p.brand,p.family)}</div><div class="product-detail-copy"><div class="product-meta"><span>${e(p.brand)}</span><span>${e(p.type)}</span><span class="status-dot">${e(p.status)}</span></div><h1>${e(p.name)}</h1><h2>${e(p.subtitle)}</h2><p>${e(p.intro)}</p><div class="product-actions"><a class="btn btn-primary" href="contact.html?item=${enc(p.name)}">洽詢此產品</a>${p.files.length?`<a class="btn btn-secondary" href="#downloads">文件下載</a>`:''}</div></div>`;
    $('#productHighlights').innerHTML=p.highlights.map(x=>`<li>${icon('check')}<span>${e(x)}</span></li>`).join('');
    $('#specTable').innerHTML=p.specs.map(([k,v])=>`<div class="spec-row"><dt>${e(k)}</dt><dd>${e(v)}</dd></div>`).join('');
    $('#productFiles').innerHTML=p.files.length?p.files.map(f=>`<a class="download-row" href="contact.html?item=${enc((p.name||'產品')+' '+(f.label||'技術文件'))}"><span class="download-icon">${icon('download')}</span><span><small>${e(f.type)}</small><b>${e(f.label)}</b></span><span class="download-cta">洽詢取得</span></a>`).join(''):'<div class="empty-state"><b>需要產品文件？</b><span>如需產品型錄、手冊或技術文件，歡迎與我們聯絡索取。</span></div>';
    const related=d.products.filter(x=>x.id!==p.id&&(x.category===p.category||x.brand===p.brand)).slice(0,3);
    $('#relatedProducts').innerHTML=related.map(productCard).join('');
  }

  function downloads(){
    if(!$('#downloadBrands')) return;
    const d=FBStore.getData(); const brands=[...new Set(d.downloads.map(x=>x.brand))]; let active=qs('brand')||brands[0]||'';
    $('#downloadBrands').innerHTML=brands.map(b=>`<button class="download-brand ${active===b?'active':''}" data-brand="${e(b)}">${e(b)}</button>`).join('');
    function draw(){
      $('.download-brand').forEach(b=>b.classList.toggle('active',b.dataset.brand===active));
      const rows=d.downloads.filter(x=>x.brand===active);
      $('#downloadTitle').textContent=active;
      $('#downloadList').innerHTML=rows.map(x=>`<div class="download-item"><span class="download-icon">${icon('download')}</span><div class="download-main"><span class="tag">${e(x.category)}</span><h3>${e(x.name)}</h3><p>${e(x.note)}</p><div class="download-meta"><span>版本 ${e(x.version)}</span><span>更新 ${e(x.updated)}</span><span>${e(x.size)}</span></div></div><a class="btn btn-secondary btn-sm" href="contact.html?item=${enc(x.name||'下載資料')}">洽詢取得</a></div>`).join('');
    }
    $('.download-brand').forEach(b=>b.addEventListener('click',()=>{active=b.dataset.brand;draw()})); draw();
  }

  function solutions(){
    const d=FBStore.getData();
    $('#solutionNav').innerHTML=d.solutions.map(s=>`<a href="#${enc(s.id)}">${icon(s.icon)}<span><small>${e(s.en)}</small><b>${e(s.name)}</b></span></a>`).join('');
    $('#solutionSections').innerHTML=d.solutions.map((s,i)=>`<section id="${e(s.id)}" class="solution-detail ${i%2?'reverse':''}"><div class="solution-visual"><span class="solution-icon xl">${icon(s.icon)}</span><div class="visual-grid"><i></i><i></i><i></i><i></i></div><small>FAR-BEYOUND SYSTEM</small></div><div class="solution-copy"><span class="eyebrow">${e(s.en)}</span><h2>${e(s.name)}</h2><p>${e(s.desc)}</p><ul>${s.points.map(x=>`<li>${icon('check')}<span>${e(x)}</span></li>`).join('')}</ul><a class="btn btn-primary" href="contact.html?item=${enc(s.name)}">洽詢系統方案</a></div></section>`).join('');
  }

  function news(){
    const d=FBStore.getData(); const types=['全部',...new Set(d.news.map(n=>n.type))]; let active='全部';
    $('#newsFilters').innerHTML=types.map(t=>`<button class="filter-chip ${t===active?'active':''}" data-type="${e(t)}">${e(t)}</button>`).join('');
    function draw(){const list=d.news.filter(n=>active==='全部'||n.type===active);$('#newsList').innerHTML=list.map((n,i)=>`<article class="news-card"><div class="news-card-date"><b>${e(String(n.date||'').slice(8))}</b><span>${e(String(n.date||'').slice(0,7).replace('-',' / '))}</span></div><div><div><span class="tag">${e(n.type)}</span>${i===0&&active==='全部'?'<span class="tag tag-new">NEW</span>':''}</div><h2>${e(n.title)}</h2><p>${e(n.excerpt)}</p><a class="text-link" href="${newsHref(n)}">閱讀內容 ${icon('arrow')}</a></div></article>`).join('')}
    $('#newsFilters button').forEach(b=>b.onclick=()=>{active=b.dataset.type;$('#newsFilters button').forEach(x=>x.classList.toggle('active',x===b));draw()});draw();
  }

  function contact(){
    const d=FBStore.getData(); const item=qs('item')||'';
    $('#contactCards').innerHTML=d.site.phones.map(p=>`<a class="contact-card" href="tel:${e(String(p.value||'').replace(/[^0-9+]/g,''))}">${icon('phone')}<span><small>${e(p.label)}辦公室</small><b>${e(p.value)}</b></span></a>`).join('')+`<a class="contact-card" href="mailto:${e(d.site.email)}">${icon('mail')}<span><small>E-mail</small><b>${e(d.site.email)}</b></span></a>`;
    if(item){
      const subject=$('#subject');
      if(subject && ![...subject.options].some(o=>o.value===item))subject.add(new Option(item,item,true,true));
      else if(subject)subject.value=item;
    }
    const sent=qs('sent'), error=qs('error'), email=qs('email');
    if(sent==='1'){
      const box=$('#formSuccess');
      if(box){box.textContent=email==='0'?'詢問資料已安全保存；Email 通知暫時未送達，公司仍可由資料庫查詢此筆紀錄。':'感謝您的詢問，資料已送出並完成留存。';box.classList.add('show');}
      history.replaceState(null,'',location.pathname+location.hash);
    }else if(error){
      const msg=error==='rate'?'送出次數過於頻繁，請稍後再試。':'送出失敗，請確認資料後再試；若持續發生可直接來電或寄信聯絡。';
      toast(msg);
      history.replaceState(null,'',location.pathname+location.hash);
    }
    $('#contactForm').addEventListener('submit',ev=>{
      ev.preventDefault();
      const form=ev.currentTarget;
      const required=$('#contactForm [required]'); const bad=required.find(x=>!x.value.trim());
      if(bad){bad.focus();toast('請先完成必填欄位');return}
      const fd=new FormData(form);
      if(String(fd.get('website')||'').trim())return;
      const subjectText=String(fd.get('subject')||'一般詢問').trim()||'一般詢問';
      const company=String(fd.get('company')||'').trim();
      const contactName=String(fd.get('contact_name')||'').trim();
      const mailSubject=`網站洽詢｜${subjectText}${company?`｜${company}`:''}`;
      const body=[
        '萬里資訊您好：','',
        `服務單位：${company}`,
        `部門：${String(fd.get('department')||'').trim()}`,
        `姓名：${contactName}`,
        `職稱：${String(fd.get('job_title')||'').trim()}`,
        `電話：${String(fd.get('phone')||'').trim()}`,
        `分機：${String(fd.get('extension')||'').trim()}`,
        `手機：${String(fd.get('mobile')||'').trim()}`,
        `E-mail：${String(fd.get('email')||'').trim()}`,
        `洽詢項目：${subjectText}`,
        `預算範圍：${String(fd.get('budget')||'').trim()}`,'',
        '需求說明：',String(fd.get('message')||'').trim()
      ].join('\n');
      const btn=$('#contactForm button[type="submit"]');
      if(btn){btn.disabled=true;btn.textContent='開啟郵件程式…'}
      const box=$('#formSuccess');
      if(box){box.textContent=`已建立寄給 ${d.site.email} 的詢問郵件草稿，請在郵件程式中確認後按「寄出」。`;box.classList.add('show')}
      location.href=`mailto:${d.site.email}?subject=${enc(mailSubject)}&body=${enc(body)}`;
      setTimeout(()=>{if(btn){btn.disabled=false;btn.textContent='送出詢問'}},1200);
    });
  }

  function admin(){
    let d=FBStore.getData(); let editing=null;
    const fields=['id','brand','family','type','name','subtitle','status','intro'];
    function refresh(){
      d=FBStore.getData();
      $('#adminStats').innerHTML=`<div class="stat-card"><small>產品</small><b>${d.products.length}</b><span>PRODUCTS</span></div><div class="stat-card"><small>分類</small><b>${d.categories.length}</b><span>CATEGORIES</span></div><div class="stat-card"><small>下載項目</small><b>${d.downloads.length}</b><span>DOWNLOADS</span></div><div class="stat-card"><small>最新消息</small><b>${d.news.length}</b><span>NEWS</span></div>`;
      $('#adminProductRows').innerHTML=d.products.map(p=>`<tr><td><span class="admin-brand">${e(p.brand)}</span></td><td><b>${e(p.name)}</b><small>${e(p.subtitle)}</small></td><td>${e(d.categories.find(c=>c.id===p.category)?.name||p.category)}</td><td><span class="status-badge">${e(p.status)}</span></td><td><button class="icon-text edit-product" data-id="${e(p.id)}">編輯</button><button class="icon-text danger delete-product" data-id="${e(p.id)}">刪除</button></td></tr>`).join('');
      $('#adminCategory').innerHTML=d.categories.map(c=>`<option value="${e(c.id)}">${e(c.name)}</option>`).join('');
      $('.edit-product').forEach(b=>b.onclick=()=>startEdit(b.dataset.id));
      $('.delete-product').forEach(b=>b.onclick=()=>deleteProduct(b.dataset.id));
    }
    function startEdit(id){editing=id; const p=d.products.find(x=>x.id===id); if(!p)return; fields.forEach(f=>{const el=$(`#admin_${f}`); if(el)el.value=p[f]||''}); $('#adminCategory').value=p.category; $('#adminFeatured').checked=!!p.featured; $('#formTitle').textContent='編輯產品'; $('#adminFormPanel').classList.add('open'); $('#admin_name').focus();}
    function newProduct(){editing=null; $('#productAdminForm').reset(); $('#admin_id').value=`product-${Date.now()}`; $('#admin_status').value='販售中'; $('#formTitle').textContent='新增產品'; $('#adminFormPanel').classList.add('open'); $('#admin_name').focus();}
    function closeForm(){$('#adminFormPanel').classList.remove('open')}
    function deleteProduct(id){if(!confirm('確定刪除此測試產品？'))return; d.products=d.products.filter(x=>x.id!==id);FBStore.saveData(d);refresh();toast('產品已從此瀏覽器測試資料刪除')}
    $('#productAdminForm').onsubmit=ev=>{ev.preventDefault();const form={};fields.forEach(f=>form[f]=$(`#admin_${f}`).value.trim());form.category=$('#adminCategory').value;form.featured=$('#adminFeatured').checked;form.device=d.categories.find(c=>c.id===form.category)?.icon||'box';form.highlights=editing?(d.products.find(x=>x.id===editing)?.highlights||[]):['可由正式後台維護產品特色','支援產品分類與品牌管理','資料結構可移植至正式資料庫'];form.specs=editing?(d.products.find(x=>x.id===editing)?.specs||[]):[['品牌',form.brand],['系列',form.family],['類型',form.type]];form.files=editing?(d.products.find(x=>x.id===editing)?.files||[]):[];if(editing){const idx=d.products.findIndex(x=>x.id===editing);d.products[idx]={...d.products[idx],...form}}else d.products.unshift(form);FBStore.saveData(d);closeForm();refresh();toast('已儲存，可回前台查看變更')};
    $('#newProductBtn').onclick=newProduct; $('#adminFormClose').onclick=closeForm; $('#adminFormPanel').onclick=ev=>{if(ev.target.id==='adminFormPanel')closeForm()};
    $('#exportBtn').onclick=()=>{const blob=new Blob([FBStore.exportData()],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='far-beyound-site-data.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('JSON 已匯出')};
    $('#importInput').onchange=async ev=>{const file=ev.target.files[0];if(!file)return;try{FBStore.importData(await file.text());refresh();toast('JSON 已匯入')}catch(err){toast('匯入失敗：'+err.message)}ev.target.value=''};
    $('#resetBtn').onclick=()=>{if(!confirm('確定恢復內建測試資料？'))return;FBStore.resetData();refresh();toast('已恢復預設資料')};
    refresh();
  }

  function toast(text){let t=$('#siteToast');if(!t){t=document.createElement('div');t.id='siteToast';t.className='site-toast';document.body.appendChild(t)}t.textContent=text;t.classList.add('show');clearTimeout(window.__fbtoast);window.__fbtoast=setTimeout(()=>t.classList.remove('show'),2600)}

  document.addEventListener('DOMContentLoaded',()=>{
    const page=document.body.dataset.page;
    if(page==='home')home(); if(page==='products')products(); if(page==='product')product(); if(page==='downloads')downloads(); if(page==='solutions')solutions(); if(page==='news')news(); if(page==='contact')contact(); if(page==='admin')admin();
  });
  window.FBPages={toast};
})();

/* ===== assets/js/media-patch.js ===== */
(function(){
  const LOGO='assets/images/brand/far-beyound-logo.png';
  const PRODUCT_ID_ALIASES={
    'honeywell-xenon-1900-1902':'honeywell-xenon-1900-c-1902-c',
    'argox-cx3140-pro':'argox-cx-3140-pro',
    'godex-g500-g530':'godex-g500-plus-g530-plus'
  };
  const publicProductId=id=>PRODUCT_ID_ALIASES[String(id||'')]||String(id||'');
  window.FBPublicProductId=publicProductId;
  const IMAGES={
    'zebra-zt610-zt620':'assets/images/products/zebra-zt610-zt620.jpg?v=20260918-1455',
    'zebra-zt411-zt421':'assets/images/products/zebra-zt411-zt421.png?v=20260918-1455',
    'zebra-ds4678-xd':'assets/images/products/zebra-ds4678-xd.jpg?v=20260918-1455',
    'honeywell-xenon-1900-1902':'assets/images/products/honeywell-xenon-1900-1902.png?v=20260918-1455',
    'tsc-mh241-mh341-mh641':'assets/images/products/tsc-mh241-mh341-mh641.png?v=20260918-1455',
    'tsc-tx610':'assets/images/products/tsc-tx610.png?v=20260918-1455',
    'argox-cx3140-pro':'assets/images/products/argox-cx3140-pro.jpg?v=20260918-1455',
    'godex-g500-g530':'assets/images/products/godex-g500-g530.png?v=20260918-1455',
    'godex-gx4200i-gx4300i-gx4600i':'assets/images/products/godex-gx4200i-gx4300i-gx4600i.jpg?v=20260918-1455',
    'fastech-ft-yx510':'assets/images/products/fastech-ft-yx510.jpg?v=20260918-1455'
  };

  const HOME_ORDER=['zebra-zt610-zt620','zebra-ds4678-xd','zebra-zt411-zt421','honeywell-xenon-1900-1902','argox-cx3140-pro','tsc-mh241-mh341-mh641','tsc-tx610','godex-gx4200i-gx4300i-gx4600i','godex-g500-g530','fastech-ft-yx510'];

  const EXTRA_PRODUCTS=[
    {
      id:'honeywell-xenon-1900-1902',category:'scanners',brand:'Honeywell',family:'Xenon 1900 系列',type:'通用型',
      name:'Honeywell Xenon 1900-C／1902-C',subtitle:'一維／二維影像式條碼掃描器',featured:true,status:'販售中',device:'scanner',
      intro:'Xenon 1900 系列採用影像式掃描技術，兼顧條碼讀取速度、景深與低品質條碼辨識；1900-C 為有線機型，1902-C 為藍牙無線機型。',
      highlights:['一維、二維、堆疊條碼與特定 OCR 讀取','1902-C 提供 Bluetooth 無線連線與最長約 14 小時工作時間','可讀取高密度條碼與行動裝置螢幕上的二維碼'],
      specs:[['掃描元件','1280 × 800 像素影像式掃描'],['通訊介面','USB、Keyboard Wedge、RS232、IBM 46xx'],['無線範圍','1902-C：Bluetooth Class 2，視線約 10 m'],['防護／耐用','IP41；可承受 1.8 m 跌落測試'],['尺寸','99 × 64 × 165 mm']],
      files:[{label:'產品型錄',type:'PDF'},{label:'使用手冊',type:'PDF'},{label:'快速參考指南',type:'PDF'}]
    },
    {
      id:'tsc-tx610',category:'printers',brand:'TSC',family:'TX 系列',type:'桌上型',
      name:'TSC TX610',subtitle:'600 dpi 高解析桌上型條碼列印機',featured:true,status:'販售中',device:'printer',
      intro:'TX610 為高解析 4 吋桌上型標籤列印機，600 dpi 適合精緻小標籤、珠寶、電子產品與高密度產品標示。',
      highlights:['600 dpi 高解析度列印','最快 102 mm/s，最大列印寬度 106 mm','300 m 碳帶、USB／Ethernet／RS-232／USB Host 與 3.5 吋彩色螢幕'],
      specs:[['解析度','600 dpi'],['最大列印速度','102 mm/s'],['最大列印寬度','106 mm'],['碳帶長度','300 m，1 吋軸心'],['記憶體','128 MB Flash / 128 MB SDRAM'],['尺寸','332 × 226 × 200 mm']],
      files:[{label:'產品型錄',type:'PDF'},{label:'使用手冊',type:'PDF'},{label:'快速參考指南',type:'PDF'}]
    },
    {
      id:'godex-gx4200i-gx4300i-gx4600i',category:'printers',brand:'GoDEX',family:'GX 系列',type:'工業型',
      name:'GoDEX GX4200i／GX4300i／GX4600i',subtitle:'工業型條碼列印機',featured:true,status:'販售中',device:'printer',
      intro:'GoDEX GX 系列為工業型條碼列印平台，提供不同解析度配置，適合製造、倉儲與大量標籤輸出環境。',
      highlights:['GX4200i／GX4300i／GX4600i 多解析度系列','適合製造、倉儲與物流高印量作業','GoDEX 驅動、GoLabel 與管理工具支援'],
      specs:[['型號','GX4200i / GX4300i / GX4600i'],['尺寸','465 × 263 × 310 mm'],['重量','13.6 kg'],['列印模式','熱轉列印 / 熱感列印'],['解析度','GX4200i 203 dpi / GX4300i 300 dpi / GX4600i 600 dpi'],['最大列印速度','406.4 / 304.8 / 203.2 mm/s'],['最大列印寬度','108 / 105.7 / 105.6 mm'],['紙張寬度','25.4 – 118 mm'],['碳帶長度','450 m，1 吋軸心'],['記憶體','256 MB Flash / 256 MB SDRAM；顯示螢幕 16 GB'],['通訊介面','USB 2.0、RS-232、10/100 Mbps Ethernet、USB Host ×3']],
      files:[{label:'產品型錄',type:'PDF'},{label:'使用手冊',type:'PDF'}]
    }
  ];

  const DOWNLOAD_REPLACEMENTS=[
    {brand:'Zebra',category:'驅動程式',name:'Windows Printer Driver v10',version:'10.5.1.27619',updated:'2024-04-26',size:'31.9 MB',note:'ZebraDesigner 3 與其他 Windows 應用程式建議使用。適用 Windows 10 / 11。'},
    {brand:'Zebra',category:'驅動程式',name:'Zebra Seagull driver 2024.1 (BarTender)',version:'2024.1',updated:'2024-02-22',size:'93.6 MB',note:'使用 BarTender 標籤軟體時可安裝的 Zebra Seagull 驅動。'},
    {brand:'Zebra',category:'標籤編輯軟體',name:'ZebraDesigner 3',version:'3-322649',updated:'2023-02',size:'192 MB',note:'包含 ZebraDesigner Essentials 3 與 Professional 3。'},
    {brand:'Argox',category:'驅動程式',name:'Argox Seagull driver 2024.1 (BarTender)',version:'2024.1',updated:'2024-02-22',size:'91 MB',note:'適用 Windows 7 / 8 / 8.1 / 10 / 11 與多版本 Windows Server。'},
    {brand:'Argox',category:'標籤編輯軟體',name:'BarTender UltraLite 2022 R6',version:'206587',updated:'2022-01-28',size:'953 MB',note:'Argox 搭配使用的 BarTender UltraLite 標籤編輯軟體。'},
    {brand:'GoDEX',category:'驅動程式',name:'GoDEX Seagull driver 2024.1 (BarTender)',version:'2024.1',updated:'2024-02-22',size:'90.4 MB',note:'適用 Windows 7 / 8 / 8.1 / 10 / 11 與 Windows Server。'},
    {brand:'GoDEX',category:'標籤編輯軟體',name:'GoLabel II',version:'2.1.4',updated:'2026-03-03',size:'207 MB',note:'GoDEX 標籤設計與列印軟體，支援 Windows 7 / 10 / 11。'},
    {brand:'GoDEX',category:'工具程式',name:'GoUtility',version:'1.2.1',updated:'2023-07-24',size:'37.2 MB',note:'GoDEX 印表機管理與設定工具。'},
    {brand:'TOSHIBA',category:'驅動程式',name:'TOSHIBA_TEC Seagull driver 2024.1 (BarTender)',version:'2024.1',updated:'2024-02-22',size:'58.7 MB',note:'TOSHIBA TEC 條碼列印機 BarTender 驅動程式。'},
    {brand:'SATO',category:'驅動程式',name:'SATO Seagull driver 2024.1 (BarTender)',version:'2024.1',updated:'2024-02-22',size:'92.5 MB',note:'SATO 條碼列印機 BarTender 驅動程式。'},
    {brand:'SATO',category:'標籤編輯軟體',name:'SATO NiceLabel',version:'10.6.8',updated:'2024-08-08',size:'29.3 MB',note:'SATO NiceLabel 編輯軟體使用之相關套件。'},
    {brand:'Honeywell',category:'驅動程式',name:'Honeywell / Datamax / Intermec Seagull driver',version:'2023.4',updated:'2024-02-22',size:'61.1 MB',note:'適用 Datamax、Datamax-O’Neil、Honeywell、Intermec、O’Neil。'}
  ];

  if(window.FBStore && !window.__fbOfficialDataPatch){
    window.__fbOfficialDataPatch=true;
    const rawGet=FBStore.getData.bind(FBStore);
    FBStore.getData=function(){
      const d=rawGet();
      EXTRA_PRODUCTS.forEach(p=>{if(!d.products.some(x=>x.id===p.id)) d.products.push(JSON.parse(JSON.stringify(p)))});
      if(!d.solutions.some(x=>x.id==='barcode')) d.solutions.push({id:'barcode',name:'條碼整合系統',en:'Barcode Integration System',icon:'scanner',desc:'整合條碼列印、掃描設備與企業作業流程，建立資料採集、標示與追蹤的一致入口。',points:['條碼列印與掃描設備整合','與 ERP / WMS / 生產流程串接','降低人工輸入與作業錯誤']});
      d.products.forEach(p=>{if(HOME_ORDER.includes(p.id))p.featured=true});
      const orderMap=new Map(HOME_ORDER.map((id,i)=>[id,i]));
      d.products.sort((a,b)=>(orderMap.has(a.id)?orderMap.get(a.id):1000)-(orderMap.has(b.id)?orderMap.get(b.id):1000));
      DOWNLOAD_REPLACEMENTS.forEach(item=>{
        if(!d.downloads.some(x=>x.brand===item.brand && x.name===item.name)) d.downloads.push(JSON.parse(JSON.stringify(item)));
      });
      return d;
    };
  }

  const esc=v=>window.FB?.escapeHtml?FB.escapeHtml(v==null?'':String(v)):String(v==null?'':v).replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));
  function imageIdForTitle(text=''){
    const checks=[['ZT610','zebra-zt610-zt620'],['ZT620','zebra-zt610-zt620'],['ZT411','zebra-zt411-zt421'],['ZT421','zebra-zt411-zt421'],['DS4678','zebra-ds4678-xd'],['Xenon 1900','honeywell-xenon-1900-1902'],['MH241','tsc-mh241-mh341-mh641'],['MH341','tsc-mh241-mh341-mh641'],['MH641','tsc-mh241-mh341-mh641'],['TX610','tsc-tx610'],['CX-3140','argox-cx3140-pro'],['G500+','godex-g500-g530'],['G530+','godex-g500-g530']];
    const hit=checks.find(([n])=>text.includes(n));return hit?hit[1]:null;
  }
  function productPhoto(src,alt,brand=''){return `<div class="real-product-media"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" referrerpolicy="no-referrer"><span>${esc(brand)}</span></div>`}
  function fallbackVisual(p){return window.FB?.deviceVisual?FB.deviceVisual(p.device,esc(p.brand),esc(p.family)):''}
  function homeProductCard(p){const src=IMAGES[p.id];const publicId=publicProductId(p.id);return `<a class="product-card" href="product.html?id=${encodeURIComponent(publicId)}"><div class="product-card-visual">${src?productPhoto(src,p.name,p.brand):fallbackVisual(p)}</div><div class="product-card-body"><div class="product-meta"><span>${esc(p.brand)}</span><span>${esc(p.type)}</span></div><h3>${esc(p.name)}</h3><p>${esc(p.subtitle)}</p><div class="card-link">查看產品 ${FB.icon('arrow')}</div></div></a>`}

  function injectStyle(){
    if(document.getElementById('fbMediaPatchStyle'))return;
    const st=document.createElement('style');st.id='fbMediaPatchStyle';st.textContent=`
.brand-mark{background:#fff!important;border:1px solid #e1e7ed!important;overflow:hidden!important;padding:3px!important;box-shadow:0 8px 22px rgba(15,23,42,.12)!important}.brand-mark i{display:none!important}.brand-mark img{display:block;width:100%;height:100%;object-fit:contain;border-radius:9px}.real-product-media{position:relative;width:100%;height:100%;display:grid;place-items:center;background:transparent;overflow:hidden}.real-product-media img{width:88%;height:88%;object-fit:contain;transition:transform .22s ease;mix-blend-mode:multiply}.product-card:hover .real-product-media img{transform:scale(1.045)}.real-product-media span{position:absolute;left:14px;bottom:12px;background:rgba(7,24,45,.9);color:white;border-radius:999px;padding:5px 9px;font-size:10px;font-weight:900;letter-spacing:.08em}.product-detail-visual .real-product-media img{width:92%;height:92%}.home-photo-showcase{height:100%;min-height:390px;display:grid;grid-template-columns:1.25fr .75fr;gap:12px;padding:12px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.13);border-radius:24px;box-shadow:0 26px 70px rgba(0,0,0,.24);backdrop-filter:blur(12px)}.home-photo-main,.home-photo-side{min-width:0}.home-photo-main{position:relative;border-radius:18px;overflow:hidden;background:white;display:grid;place-items:center}.home-photo-main img{width:94%;height:94%;object-fit:contain}.home-photo-main .cap{position:absolute;left:18px;right:18px;bottom:16px;padding:12px 14px;border-radius:13px;background:rgba(7,24,45,.88);color:white}.home-photo-main .cap small{display:block;color:#9fe6df;font-weight:800;letter-spacing:.08em}.home-photo-main .cap b{display:block;font-size:18px;margin-top:2px}.home-photo-side{display:grid;grid-template-rows:1fr 1fr;gap:12px}.home-photo-tile{position:relative;border-radius:18px;overflow:hidden;background:white;display:grid;place-items:center}.home-photo-tile img{width:90%;height:86%;object-fit:contain}.home-photo-tile b{position:absolute;left:10px;bottom:9px;background:rgba(7,24,45,.86);color:#fff;padding:5px 8px;border-radius:8px;font-size:10px}.brand-showcase{padding:34px 0;background:#fff;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.brand-showcase .brand-list{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.brand-badge{min-height:72px;border:1px solid #e2e8f0;border-radius:14px;background:#f8fafc;display:grid;place-items:center;text-align:center;font-size:17px;font-weight:900;color:#26384d;letter-spacing:.02em}.about-band{padding:70px 0;background:linear-gradient(135deg,#07182d,#0d3151);color:#fff}.about-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:48px;align-items:center}.about-grid h2{font-size:38px;margin:7px 0 14px}.about-grid p{color:#bdd0e3;margin:0}.about-points{display:grid;grid-template-columns:1fr 1fr;gap:12px}.about-point{padding:18px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);border-radius:15px}.about-point b{display:block;font-size:20px}.about-point span{display:block;color:#9fb6cd;font-size:12px;margin-top:4px}.location-mini-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin:22px 0 0}.location-mini{background:white;border:1px solid var(--line);border-radius:16px;padding:20px}.location-mini small{display:block;color:var(--teal);font-weight:900;letter-spacing:.08em}.location-mini b{display:block;font-size:22px;margin:4px 0}.location-mini span{display:block;color:var(--muted);font-size:13px}.official-note{font-size:11px;color:#8493a3;margin-top:10px}@media(max-width:900px){.brand-showcase .brand-list{grid-template-columns:repeat(3,1fr)}.about-grid{grid-template-columns:1fr}}@media(max-width:680px){.home-photo-showcase{min-height:330px;grid-template-columns:1fr}.home-photo-side{display:none}.location-mini-grid{grid-template-columns:1fr}.real-product-media img{width:92%;height:92%}.brand-showcase .brand-list{grid-template-columns:repeat(2,1fr)}.about-points{grid-template-columns:1fr}.about-grid h2{font-size:31px}}`;
    document.head.appendChild(st);
  }
  function patchLogo(){document.querySelectorAll('.brand-mark').forEach(el=>{el.innerHTML=`<img src="${LOGO}" alt="" referrerpolicy="no-referrer">`;el.setAttribute('title','萬里資訊')})}
  function patchCards(){document.querySelectorAll('.product-card').forEach(card=>{const title=card.querySelector('h3')?.textContent||'';const id=imageIdForTitle(title),src=id&&IMAGES[id];const holder=card.querySelector('.product-card-visual');if(src&&holder){const brand=card.querySelector('.product-meta span')?.textContent||'';holder.innerHTML=productPhoto(src,title,brand)}})}
  function patchProductDetail(){const id=new URLSearchParams(location.search).get('id');const src=id&&IMAGES[id],holder=document.querySelector('.product-detail-visual');if(src&&holder){const title=document.querySelector('.product-detail-copy h1')?.textContent||id;const brand=document.querySelector('.product-meta span')?.textContent||'';holder.innerHTML=productPhoto(src,title,brand)}}
  function patchHomeHero(){if(document.body.dataset.page!=='home')return;const box=document.querySelector('.hero-console');if(!box)return;box.innerHTML=`<div class="home-photo-showcase"><div class="home-photo-main"><img src="${IMAGES['zebra-zt610-zt620']}" alt="Zebra ZT610 / ZT620 工業型條碼列印機" referrerpolicy="no-referrer"><div class="cap"><small>INDUSTRIAL LABELING</small><b>Zebra ZT600 系列</b></div></div><div class="home-photo-side"><div class="home-photo-tile"><img src="${IMAGES['zebra-ds4678-xd']}" alt="Zebra DS4678-XD" referrerpolicy="no-referrer"><b>條碼掃描</b></div><div class="home-photo-tile"><img src="${IMAGES['tsc-mh241-mh341-mh641']}" alt="TSC MH241 系列" referrerpolicy="no-referrer"><b>工業列印</b></div></div></div>`}
  function patchHomeProducts(){if(document.body.dataset.page!=='home')return;const grid=document.getElementById('homeProducts');if(!grid)return;const d=FBStore.getData();const list=HOME_ORDER.map(id=>d.products.find(p=>p.id===id)).filter(Boolean);grid.innerHTML=list.map(homeProductCard).join('')}
  function injectBrandShowcase(){if(document.body.dataset.page!=='home'||document.getElementById('brandShowcase'))return;const productSection=document.getElementById('homeProducts')?.closest('.section');if(!productSection)return;const sec=document.createElement('section');sec.id='brandShowcase';sec.className='brand-showcase';sec.innerHTML=`<div class="container"><div class="section-head"><div><span class="eyebrow">BRAND INFORMATION</span><h2>合作品牌</h2></div><p>涵蓋條碼列印、掃描、行動設備與周邊應用的多品牌產品線。</p></div><div class="brand-list">${['Zebra','TSC','Argox','GoDEX','Honeywell','TOSHIBA','SATO','Datalogic','NUMA','Fastech'].map(x=>`<div class="brand-badge">${x}</div>`).join('')}</div></div>`;productSection.after(sec)}
  function injectAbout(){if(document.body.dataset.page!=='home'||document.getElementById('aboutBand'))return;const cats=document.getElementById('homeCategories')?.closest('.section');if(!cats)return;const sec=document.createElement('section');sec.id='aboutBand';sec.className='about-band';sec.innerHTML=`<div class="container about-grid"><div><span class="eyebrow">FAR-BEYOUND INFORMATION</span><h2>從設備選型到現場系統整合</h2><p>萬里資訊提供標籤條碼列印機、掃描器、RFID、企業行動設備、標籤耗材與維修服務，並延伸至 SFIS、WMS、SMT 等現場資訊化方案。新版網站將產品、技術資源與服務窗口整合在同一個入口。</p></div><div class="about-points"><div class="about-point"><b>台北＋台南</b><span>服務據點與技術支援</span></div><div class="about-point"><b>8 大類別</b><span>設備、耗材、軟體與維修</span></div><div class="about-point"><b>多品牌整合</b><span>Zebra / TSC / Argox / GoDEX 等</span></div><div class="about-point"><b>系統導入</b><span>SFIS / WMS / SMT</span></div></div></div>`;cats.after(sec)}
  function patchContact(){if(document.body.dataset.page!=='contact')return;const firstSection=document.querySelector('main .section');if(!firstSection||document.getElementById('serviceLocations'))return;const wrap=document.createElement('section');wrap.className='section section-white';wrap.id='serviceLocations';wrap.innerHTML=`<div class="container"><div class="section-head"><div><span class="eyebrow">SERVICE LOCATIONS</span><h2>服務據點</h2></div><p>台北與台南據點提供設備、耗材與技術服務。</p></div><div class="location-mini-grid"><div class="location-mini"><small>台北總公司</small><b>02-82217759</b><span>新北市中和區中山路二段351號10樓之1</span><span>傳真 02-82217238</span></div><div class="location-mini"><small>台南分公司</small><b>06-2360139</b><span>台南市永康區中華路425號4樓之18</span><span>傳真 06-2367896</span></div></div></div>`;firstSection.parentNode.insertBefore(wrap,firstSection)}
  function bumpVersion(){document.querySelectorAll('.footer-bottom span').forEach(el=>{if(el.textContent.includes('新版網站測試環境'))el.textContent='新版網站測試環境 · v0.3 · 官方資料整合版 · 修改時間 2026-09-11 18:04'})}
  function run(){injectStyle();patchLogo();patchHomeHero();patchHomeProducts();patchCards();patchProductDetail();injectAbout();injectBrandShowcase();patchContact();bumpVersion()}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,120)});window.addEventListener('farbeyound:datachange',()=>setTimeout(run,80));
})();

/* ===== assets/js/nav-menu.js ===== */
(function(){
  const slugMap={'2026 年度萬里資訊員工旅遊公告':'travel-2026','原物料價格調整公告':'material-price','共用印表機 0x0000011b／0x00000709 錯誤處理':'printer-share-error','Zebra ZT411 / ZT421：多功能及穩定性佳':'zt411-news','Zebra ZT610 / ZT620：堅固耐用及卓越性能':'zt610-news'};
  const esc=v=>String(v??'').replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const uniq=a=>[...new Set((a||[]).filter(Boolean))];
  const caret=()=>'<span class="nav-drop-caret" aria-hidden="true">⌄</span>';
  const item=(href,title,sub='')=>`<a class="subnav-link" href="${href}"><span><b>${esc(title)}</b>${sub?`<small>${esc(sub)}</small>`:''}</span><span class="subnav-arrow">→</span></a>`;
  const panel=(title,en,body,href,label='查看全部')=>`<div class="subnav-panel"><div class="subnav-panel-head"><div><small>${esc(en)}</small><b>${esc(title)}</b></div><a href="${href}">${esc(label)} →</a></div><div class="subnav-grid">${body}</div></div>`;
  function sets(d){return{cats:(d.categories||[]).filter(x=>x.visible!==false).slice(0,8),brands:uniq((d.downloads||[]).filter(x=>x.published!==false).map(x=>x.brand)),solutions:(d.solutions||[]).filter(x=>x.published!==false),cases:(d.cases||[]).filter(x=>x.published!==false).slice(0,6),news:(d.news||[]).filter(x=>x.published!==false).slice(0,5)}}
  function desktopNav(d){const{cats,brands,solutions,cases,news}=sets(d);return `<div class="nav-item has-mega"><a href="products.html">產品資訊 ${caret()}</a><div class="mega-menu"><div class="mega-head"><div><span class="eyebrow">PRODUCT INFORMATION</span><h3>產品與服務</h3></div><a href="products.html" class="text-link">查看所有產品 →</a></div><div class="mega-grid">${cats.map(c=>`<a href="products.html?category=${encodeURIComponent(c.id)}" class="mega-card"><span class="nav-mega-symbol">${esc((c.name||'').slice(0,1))}</span><span><b>${esc(c.name)}</b><small>${esc(c.en||'')}</small></span></a>`).join('')}</div></div></div><div class="nav-item has-subnav"><a href="solutions.html">系統方案 ${caret()}</a>${panel('系統方案','SYSTEM SOLUTIONS',solutions.map(s=>item(`solutions.html#${encodeURIComponent(s.id)}`,s.name,s.en||'')).join(''),'solutions.html')}</div><div class="nav-item has-subnav"><a href="cases.html">客戶案例 ${caret()}</a>${panel('客戶案例','OUR CASES',cases.map(c=>item('cases.html',c.name,c.system||'')).join(''),'cases.html')}</div><div class="nav-item has-subnav"><a href="news.html">最新消息 ${caret()}</a>${panel('最新消息','LATEST NEWS',news.map(n=>{const s=n.slug||slugMap[n.title];return item(s?`news-detail.html?id=${s}`:'news.html',n.title,`${n.date||''} · ${n.type||''}`)}).join(''),'news.html')}</div><div class="nav-item has-subnav"><a href="downloads.html">下載服務 ${caret()}</a>${panel('下載服務','DOWNLOAD CENTER',brands.map(b=>item(`downloads.html?brand=${encodeURIComponent(b)}`,b,'驅動、軟體、工具與文件')).join(''),'downloads.html')}</div><div class="nav-item has-subnav"><a href="about.html">公司資訊 ${caret()}</a>${panel('公司資訊','ABOUT FAR-BEYOUND',[item('about.html','關於我們','公司與服務介紹'),item('locations.html','服務據點','台北、台南與中國服務資訊'),item('contact.html','聯絡我們','產品、耗材與系統洽詢')].join(''),'about.html','了解萬里資訊')}</div>`}
  function mobileNav(d){const{cats,brands,solutions,cases,news}=sets(d);const group=(t,h,l)=>`<details class="mobile-nav-group"><summary><span>${t}</span><span>＋</span></summary><div class="mobile-nav-sub"><a class="mobile-nav-all" href="${h}">查看全部 ${t}</a>${l}</div></details>`;return `<a href="index.html">首頁</a>${group('產品資訊','products.html',cats.map(c=>`<a href="products.html?category=${encodeURIComponent(c.id)}">${esc(c.name)}</a>`).join(''))}${group('系統方案','solutions.html',solutions.map(s=>`<a href="solutions.html#${encodeURIComponent(s.id)}">${esc(s.name)}</a>`).join(''))}${group('客戶案例','cases.html',cases.map(c=>`<a href="cases.html">${esc(c.name)}<small>${esc(c.system||'')}</small></a>`).join(''))}${group('最新消息','news.html',news.map(n=>{const s=n.slug||slugMap[n.title];return `<a href="${s?`news-detail.html?id=${s}`:'news.html'}">${esc(n.title)}</a>`}).join(''))}${group('下載服務','downloads.html',brands.map(b=>`<a href="downloads.html?brand=${encodeURIComponent(b)}">${esc(b)}</a>`).join(''))}${group('公司資訊','about.html',`<a href="about.html">關於我們</a><a href="locations.html">服務據點</a><a href="contact.html">聯絡我們</a>`)}`}
  function markCurrent(el){const p=document.body.dataset.page||'',target={products:'products.html',product:'products.html',downloads:'downloads.html',solutions:'solutions.html',cases:'cases.html',news:'news.html','news-detail':'news.html',about:'about.html',locations:'about.html',contact:'about.html','preview-guide':'about.html'}[p]||'';[...el.children].forEach(n=>{const a=n.querySelector(':scope > a'),h=(a?.getAttribute('href')||'').split('?')[0].split('#')[0],on=!!target&&h===target;n.classList.toggle('current',on);a?.classList.toggle('current',on);on?a?.setAttribute('aria-current','page'):a?.removeAttribute('aria-current')})}
  function styles(){if(document.getElementById('navEnhancedStyles'))return;const s=document.createElement('style');s.id='navEnhancedStyles';s.textContent='.desktop-nav>.nav-item{position:relative}.desktop-nav>.nav-item.has-mega{position:static}.nav-drop-caret{margin-left:6px;color:var(--muted);font-size:13px;transition:transform .18s}.has-subnav:hover>a .nav-drop-caret,.has-subnav:focus-within>a .nav-drop-caret,.has-mega:hover>a .nav-drop-caret{transform:rotate(180deg)}.subnav-panel{position:absolute;top:calc(100% - 1px);left:50%;width:430px;transform:translate(-50%,10px);background:#fff;border:1px solid var(--line);border-radius:0 0 18px 18px;box-shadow:0 24px 60px rgba(9,32,59,.18);padding:18px;opacity:0;visibility:hidden;pointer-events:none;transition:.18s;z-index:80}.has-subnav:hover>.subnav-panel,.has-subnav:focus-within>.subnav-panel{opacity:1;visibility:visible;pointer-events:auto;transform:translate(-50%,0)}.subnav-panel-head{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:1px solid #e8edf2;padding:0 3px 12px;margin-bottom:10px}.subnav-panel-head>div{display:grid}.subnav-panel-head small{font-size:9px;letter-spacing:.15em;color:var(--teal);font-weight:900}.subnav-panel-head b{font-size:18px}.subnav-panel-head>a{font-size:11px;font-weight:900;color:var(--teal)}.subnav-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}.subnav-link{min-width:0;padding:10px 11px;border-radius:10px;display:flex;justify-content:space-between;align-items:center;gap:10px;border:1px solid transparent;background:#fbfcfd}.subnav-link:hover{background:#f0faf8;border-color:#cde9e5}.subnav-link>span:first-child{display:grid;min-width:0}.subnav-link b{font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.subnav-link small{font-size:9px;color:var(--muted);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.subnav-arrow{color:var(--teal);font-size:13px}.nav-mega-symbol{width:38px;height:38px;border-radius:10px;background:var(--soft);color:var(--teal);display:grid!important;place-items:center;font-weight:900;font-size:15px;flex:none}.mobile-nav-group{border-bottom:1px solid #e6edf2}.mobile-nav-group summary{list-style:none;padding:15px 0;display:flex;justify-content:space-between;align-items:center;font-weight:900;cursor:pointer}.mobile-nav-group summary::-webkit-details-marker{display:none}.mobile-nav-group[open] summary span:last-child{transform:rotate(45deg)}.mobile-nav-group summary span:last-child{transition:.16s;color:var(--teal)}.mobile-nav-sub{display:grid;padding:0 0 12px 12px}.drawer-links .mobile-nav-sub a{padding:9px 10px!important;font-size:12px!important;color:#607286!important;border:0!important}.drawer-links .mobile-nav-sub a:hover{background:#f2f7f8!important;color:var(--teal)!important}.drawer-links .mobile-nav-sub a small{display:block;font-size:9px;color:#8a98a7;margin-top:2px}.drawer-links .mobile-nav-all{font-weight:900!important;color:var(--teal)!important}@media(max-width:1180px) and (min-width:981px){.desktop-nav>a,.nav-item>a{padding-left:9px!important;padding-right:9px!important;font-size:12px!important}.header-inner{gap:15px!important}.header-actions .btn{display:none}.subnav-panel{width:390px}}';document.head.appendChild(s)}
  function apply(){const d=window.FBStore?.getData?.(),desktop=document.querySelector('.desktop-nav'),mobile=document.querySelector('.drawer-links');if(!d||!desktop||!mobile)return false;styles();const dh=desktopNav(d),mh=mobileNav(d);if(desktop.innerHTML!==dh)desktop.innerHTML=dh;if(mobile.innerHTML!==mh)mobile.innerHTML=mh;markCurrent(desktop);return true}
  function loadScript(src,key){if(document.querySelector(`script[data-${key}]`))return;const s=document.createElement('script');s.src=src;s.setAttribute('data-'+key,'1');document.body.appendChild(s)}
  function start(){loadScript('assets/js/cloud-sync.js?v=20260912-0824','cloud-sync');loadScript('assets/js/front-url-guard.js?v=20260912-0819','front-url-guard');loadScript('assets/js/page-settings-control.js?v=20260912-0818','page-settings-control');loadScript('assets/js/search-visibility.js?v=20260912-0834','search-visibility');loadScript('assets/js/front-location-control.js?v=20260912-0839','front-location-control');loadScript('assets/js/front-feature-control.js?v=20260912-0903','front-feature-control');loadScript('assets/js/public-managed-content.js?v=20260912-0858','public-managed-content');loadScript('assets/js/front-brand-control.js?v=20260912-0810','front-brand-control');apply();requestAnimationFrame(apply)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  window.addEventListener('farbeyound:datachange',()=>requestAnimationFrame(apply));
})();

/* ===== assets/js/presentation-polish.js ===== */
(function(){
  let sanitizing=false;
  const TAIPEI_ADDRESS='新北市中和區中山路二段351號10樓之1';
  const TAINAN_ADDRESS='台南市永康區中華路425號4樓之18';
  const mapUrl=address=>`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  function sanitizePublicText(){
    if(document.body.dataset.page==='admin'||sanitizing)return;
    sanitizing=true;
    const replacements=[
      ['正式版可由後台上傳型錄、手冊與快速指南。','如需型錄、手冊或快速指南，歡迎聯絡我們。'],
      ['正式檔案空間尚未接入','如需此檔案，歡迎聯絡我們'],
      ['測試環境尚未掛載正式檔案','如需此檔案，歡迎聯絡我們'],
      ['新聞內頁將於完整資料搬移階段接入','更多資訊請參閱最新消息內容'],
      ['新版網站測試環境','萬里資訊股份有限公司'],
      ['網站提案預覽','萬里資訊股份有限公司'],
      ['原官網產品資料','產品資料'],
      ['新版目錄','產品目錄'],
      ['正式版','']
    ];
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const nodes=[];let n;while((n=walker.nextNode()))nodes.push(n);
    nodes.forEach(node=>{
      if(['SCRIPT','STYLE','NOSCRIPT'].includes(node.parentElement?.tagName||''))return;
      let text=node.nodeValue||'',next=text;
      replacements.forEach(([a,b])=>{next=next.split(a).join(b)});
      if(next!==text)node.nodeValue=next;
    });
    sanitizing=false;
  }

  function styles(){
    if(document.body.classList.contains('fb-approved-skin-20260916'))return;
    if(document.getElementById('fbPresentationPolish'))return;
    const st=document.createElement('style');st.id='fbPresentationPolish';st.textContent=`
      :root{--fb-ink:#17344a;--fb-muted:#687d8c;--fb-line:#dfe8ed;--fb-soft:#f5f8fa;--fb-accent:#087d96}
      body[data-page]:not([data-page="admin"]){background:#f6f9fb;color:var(--fb-ink)}
      .site-header{background:rgba(255,255,255,.94)!important;border-bottom-color:rgba(198,213,222,.72)!important;box-shadow:0 2px 18px rgba(19,49,68,.045)!important}
      .header-inner{height:78px!important}
      .brand-copy strong{color:#17344a!important;font-weight:850!important}
      .brand-copy small{color:#8294a0!important}
      .desktop-nav>.nav-item>a,.desktop-nav>a{color:#294b60!important}
      .desktop-nav>.nav-item>a:hover,.desktop-nav>a:hover,.desktop-nav>.nav-item.current>a,.desktop-nav>a.current{color:#087d96!important}
      .header-actions .btn{border-radius:10px!important;font-weight:800!important}
      .hero-actions .btn{box-shadow:0 8px 20px rgba(15,52,73,.10)}
      .hero-actions .btn-secondary{box-shadow:none!important}
      .section{padding:88px 0!important}
      .section-head{margin-bottom:38px!important}
      .section-head h2{font-weight:800!important;letter-spacing:-.035em!important}
      .section-head p{line-height:1.9!important}
      .v5-credibility{box-shadow:0 1px 0 rgba(17,52,72,.03)}
      .v5-cred-item{min-height:108px!important;display:flex!important;align-items:center!important}
      .v5-cred-key{font-weight:850!important}
      .v5-cred-copy{gap:3px!important}
      .category-card,.product-card,.solution-card,.v5-case-card{box-shadow:0 10px 28px rgba(20,55,75,.055)!important}
      .category-card:hover,.product-card:hover,.solution-card:hover,.v5-case-card:hover{box-shadow:0 20px 42px rgba(20,55,75,.11)!important}
      .product-card-visual{height:248px!important}
      .product-card-body{padding:22px!important}
      .product-card h3{font-weight:800!important;letter-spacing:-.02em!important}
      .solution-card{min-height:260px!important}
      .v5-case-card{padding:26px!important}
      .v5-case-card h3{font-weight:800!important;letter-spacing:-.02em!important}
      .news-row{padding:20px 10px!important}
      .news-row:hover{border-radius:10px!important;background:#f9fbfc!important}
      .cta-band{box-shadow:0 18px 45px rgba(18,57,76,.14)!important}
      .footer-location{width:100%;display:grid!important;gap:2px!important;margin:7px 0!important;padding:9px 10px!important;border:1px solid rgba(255,255,255,.10);border-radius:9px;transition:.18s;background:rgba(255,255,255,.025)}
      .footer-location:hover{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.2)}
      .footer-location-head{display:flex!important;align-items:center;justify-content:space-between;width:100%;margin:0!important;color:#fff!important;font-size:11px!important;font-weight:800}
      .footer-location-head small{color:#78ded5;font-size:9px;font-weight:800}
      .footer-location-address{display:block!important;margin:0!important;color:#afc0d1!important;font-size:11px!important;line-height:1.55}
      .footer-bottom{justify-content:flex-start!important}
      .quick-back-arrow{display:block;font-size:22px;line-height:20px;font-weight:700;margin-top:-2px}
      @media(max-width:980px){
        .header-inner{height:68px!important}
        .section{padding:64px 0!important}
        .section-head{margin-bottom:28px!important;align-items:flex-start!important}
        .section-head p{line-height:1.75!important}
        .v5-cred-item{min-height:96px!important}
        .product-card-visual{height:220px!important}
        .solution-card{min-height:0!important}
        .cta-band{margin-bottom:24px!important}
      }
      @media(max-width:680px){
        .container{width:min(calc(100% - 32px),1180px)!important}
        .section{padding:54px 0!important}
        .section-head h2{font-size:30px!important}
        .section-head p{font-size:12px!important}
        .v5-cred-item{padding:16px 13px!important}
        .product-card-visual{height:205px!important}
        .product-card-body{padding:18px!important}
        .news-row{grid-template-columns:64px 1fr 22px!important;gap:11px!important;padding:16px 5px!important}
        .news-date b{font-size:21px!important}
        .cta-band{border-radius:18px!important;padding:28px 22px!important}
        .cta-band h2{font-size:23px!important;line-height:1.35!important}
        .cta-band p{font-size:12px!important;line-height:1.75!important}
        .footer-location{padding:9px!important}.footer-location-address{font-size:10px!important}
      }
    `;document.head.appendChild(st);
  }

  function polishFooter(){
    if(document.body.dataset.page==='admin')return;
    const footer=document.querySelector('.site-footer');if(!footer)return;
    const d=window.FBStore?.getData?.();
    const contact=[...footer.querySelectorAll('.footer-grid>div')].find(el=>el.querySelector('h4')?.textContent.trim()==='聯絡資訊');
    if(contact&&!contact.dataset.locationPatched){
      const phones=(d?.site?.phones||[{label:'台北',value:'02-82217759'},{label:'台南',value:'06-2360139'}]);
      const email=d?.site?.email||'company@far-beyound.com.tw';
      contact.innerHTML=`<h4>聯絡資訊</h4>${phones.map(p=>`<a href="tel:${String(p.value).replace(/-/g,'')}">${p.label} ${p.value}</a>`).join('')}<a href="mailto:${email}">${email}</a><a class="footer-location" href="${mapUrl(TAIPEI_ADDRESS)}" target="_blank" rel="noopener" aria-label="使用 Google 地圖導航至台北辦公室"><span class="footer-location-head">台北辦公室 <small>Google 導航 ↗</small></span><span class="footer-location-address">${TAIPEI_ADDRESS}</span></a><a class="footer-location" href="${mapUrl(TAINAN_ADDRESS)}" target="_blank" rel="noopener" aria-label="使用 Google 地圖導航至台南辦公室"><span class="footer-location-head">台南辦公室 <small>Google 導航 ↗</small></span><span class="footer-location-address">${TAINAN_ADDRESS}</span></a>`;
      contact.dataset.locationPatched='1';
    }
    const bottom=footer.querySelector('.footer-bottom');
    if(bottom){[...bottom.querySelectorAll(':scope>span')].slice(1).forEach(el=>el.remove())}
  }

  function cleanCopy(){
    if(document.body.dataset.page==='downloads'){
      const hero=document.querySelector('.page-hero p');
      if(hero)hero.textContent='依品牌快速找到標籤機驅動程式、標籤軟體、工具程式與技術文件。';
    }
    polishFooter();
    sanitizePublicText();
  }

  function watchPublicCopy(){
    if(document.body.dataset.page==='admin'||window.__fbCopyObserver)return;
    window.__fbCopyObserver=true;
    const ob=new MutationObserver(()=>queueMicrotask(()=>{sanitizePublicText();polishFooter()}));
    ob.observe(document.body,{childList:true,subtree:true,characterData:true});
  }

  function attachBackTop(){
    if(document.body.dataset.page==='admin')return;
    const rail=document.querySelector('.quick-contact');
    if(!rail||rail.querySelector('[data-back-top]'))return;
    const old=rail.querySelector('.back-top');if(old)old.remove();
    const item=document.createElement('div');item.className='quick-contact-item';item.dataset.backTop='1';
    item.innerHTML='<button type="button" class="quick-contact-btn" aria-label="回到頁首" title="回到頁首"><span class="quick-back-arrow" aria-hidden="true">↑</span><span>TOP</span></button>';
    item.querySelector('button').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
    rail.appendChild(item);
  }

  function contactNote(){
    if(document.body.dataset.page!=='contact')return;
    const success=document.getElementById('formSuccess');
    if(success)success.innerHTML='<b>感謝您的詢問</b><br>我們將依您提供的聯絡資料與需求內容協助確認後續。';
  }

  function run(){styles();cleanCopy();watchPublicCopy();attachBackTop();contactNote()}
  document.addEventListener('DOMContentLoaded',run,{once:true});
  if(document.readyState!=='loading')run();
})();


/* ===== assets/js/final-fixes.js ===== */
(function(){
  const LOGO='assets/images/brand/far-beyound-logo.png';
  const ICONS={
    phone:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.1 3.8 9.7 3c.7-.2 1.4.2 1.7.8l1.2 2.8c.3.6.1 1.3-.4 1.7l-1.5 1.2a14 14 0 0 0 3.8 3.8l1.2-1.5c.4-.5 1.1-.7 1.7-.4l2.8 1.2c.7.3 1 .9.8 1.7l-.8 2.6c-.3.9-1.1 1.5-2 1.5C11 18.4 5.6 13 5.6 6c0-1 .6-1.9 1.5-2.2Z"/></svg>',
    line:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 11.1c0-4.1-4.1-7.4-9.1-7.4s-9.1 3.3-9.1 7.4c0 3.7 3.2 6.8 7.6 7.3.3.1.7.2.8.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1.1 1 .6s5.3-3.1 7.2-5.3a6.7 6.7 0 0 0 1.7-5Z"/><path d="M6.8 9v4h2.4M10 9v4M11.4 13V9l2.7 4V9M18.1 9h-2.7v4h2.7M15.4 11h2.3" class="line-detail"/></svg>',
    mail:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6.5h16v11H4z"/><path d="m4.8 7.3 7.2 5.5 7.2-5.5"/></svg>',
    download:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M8 11l4 4 4-4"/><path d="M5 20h14"/></svg>'
  };
  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const params=()=>new URLSearchParams(location.search);
  function style(){if(document.getElementById('fbFinalFixes'))return;const s=document.createElement('style');s.id='fbFinalFixes';s.textContent=`
    .brand-mark{display:grid!important;place-items:center!important;overflow:hidden!important;background:#fff!important;padding:2px!important}.brand-mark img{display:block;width:100%;height:100%;object-fit:contain;border-radius:9px}
    .desktop-nav .nav-group.current>a,.desktop-nav>a.current{color:var(--teal)}.desktop-nav .nav-group.current>a:after,.desktop-nav>a.current:after{transform:scaleX(1)}
    .quick-contact{position:fixed;right:0;top:52%;z-index:88;transform:translateY(-50%);display:grid;gap:1px;filter:drop-shadow(0 10px 24px rgba(20,44,66,.16))}.quick-contact-item{position:relative}.quick-contact-btn{width:58px;min-height:64px;border:0;border-left:1px solid #dbe3e8;background:rgba(255,255,255,.97);color:#17324d;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;cursor:pointer;text-decoration:none;font:inherit;transition:.18s ease;backdrop-filter:blur(12px)}.quick-contact-item:first-child .quick-contact-btn{border-radius:8px 0 0 0}.quick-contact-item:last-child .quick-contact-btn{border-radius:0 0 0 8px}.quick-contact-btn:hover,.quick-contact-item.is-open>.quick-contact-btn{background:#17324d;color:#fff}.quick-contact-btn svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.quick-contact-btn .line-detail{fill:none;stroke:currentColor;stroke-width:1.25}.quick-contact-btn span{font-size:10px;line-height:1.1;font-weight:700;letter-spacing:.03em}.quick-phone-panel{position:absolute;right:67px;top:0;width:226px;background:#fff;border:1px solid #dce4e9;border-radius:8px;padding:10px;box-shadow:0 18px 45px rgba(16,42,67,.16);opacity:0;visibility:hidden;transform:translateX(8px);transition:.18s ease}.quick-contact-item.is-open .quick-phone-panel{opacity:1;visibility:visible;transform:none}.quick-phone-panel:after{content:"";position:absolute;right:-6px;top:25px;width:11px;height:11px;background:#fff;border-top:1px solid #dce4e9;border-right:1px solid #dce4e9;transform:rotate(45deg)}.quick-phone-panel strong{display:block;font-size:13px;color:#17324d;padding:4px 5px 8px}.quick-phone-link{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 9px;border-top:1px solid #edf1f3;color:#334e63;text-decoration:none}.quick-phone-link span{font-size:11px;color:#71808d}.quick-phone-link b{font-size:13px;color:#17324d}.quick-phone-link:hover{background:#f6f9fa}.mobile-contact-bar{display:none}
    .product-support-card{border:1px solid #dde5ea;background:#f7f9fa;padding:20px 22px}.product-support-card b{display:block;color:#17324d;font-size:15px;margin-bottom:7px}.product-support-card p{margin:0 0 15px;color:#617383;font-size:12px;line-height:1.8}.product-support-actions{display:flex;flex-wrap:wrap;gap:8px}.product-support-actions a{display:inline-flex;align-items:center;gap:7px;padding:9px 12px;border:1px solid #ccd8df;background:#fff;color:#17324d;text-decoration:none;font-size:11px;font-weight:700}.product-support-actions a:first-child{background:#17324d;border-color:#17324d;color:#fff}.product-support-actions svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.7}.product-files-link{display:grid!important;grid-template-columns:auto 1fr auto;align-items:center;gap:12px;text-decoration:none;color:inherit}.product-files-link .download-icon svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.7}.product-not-found{padding:90px 0 120px;text-align:center}.product-not-found .eyebrow{display:block;margin-bottom:12px}.product-not-found h1{font-size:34px;color:#17324d;margin:0 0 12px}.product-not-found p{color:#667989;margin:0 0 24px}.product-not-found .btn{display:inline-flex}
    @media(max-width:980px){.quick-contact{display:none}.mobile-contact-bar{position:fixed;left:0;right:0;bottom:0;z-index:90;display:grid;grid-template-columns:repeat(3,1fr);background:rgba(255,255,255,.98);border-top:1px solid #dce4e9;box-shadow:0 -8px 26px rgba(18,46,70,.10);padding-bottom:env(safe-area-inset-bottom)}.mobile-contact-bar a,.mobile-contact-bar button{min-height:58px;border:0;border-right:1px solid #e4e9ed;background:transparent;color:#17324d;display:flex;align-items:center;justify-content:center;gap:7px;text-decoration:none;font:inherit;font-size:11px;font-weight:700}.mobile-contact-bar a:last-child{border-right:0}.mobile-contact-bar svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.mobile-contact-bar .line-detail{stroke-width:1.25}.mobile-contact-phone{position:fixed;left:14px;right:14px;bottom:calc(70px + env(safe-area-inset-bottom));z-index:91;background:#fff;border:1px solid #dce4e9;border-radius:10px;padding:8px;box-shadow:0 18px 48px rgba(17,43,66,.2);display:none}.mobile-contact-phone.is-open{display:block}.mobile-contact-phone a{display:flex;justify-content:space-between;align-items:center;padding:13px 12px;text-decoration:none;color:#17324d;border-bottom:1px solid #edf1f3}.mobile-contact-phone a:last-child{border-bottom:0}.mobile-contact-phone span{font-size:12px;color:#71808d}.mobile-contact-phone b{font-size:14px}body:not([data-page="admin"]){padding-bottom:calc(58px + env(safe-area-inset-bottom))}}
    @media(max-width:680px){.home-photo-showcase{min-height:215px!important;height:215px!important;padding:9px!important}.home-photo-main img{width:84%!important;height:84%!important}.home-photo-main .cap{padding:9px 11px!important}.home-photo-main .cap b{font-size:15px!important}.hero-copy h1{font-size:36px!important}.hero-trust{font-size:10px!important}.proposal-chip{font-size:9px!important}.home-capability{min-height:76px}.brand-copy strong{font-size:18px!important}.product-support-card{padding:17px}.product-support-actions{display:grid}.product-support-actions a{justify-content:center}}
  `;document.head.appendChild(s)}
  function logo(){document.querySelectorAll('.brand-mark').forEach(el=>{if(el.querySelector('img'))return;el.innerHTML=`<img src="${LOGO}" alt="萬里資訊" decoding="sync">`})}
  function quickContact(){
    if(document.body.dataset.page==='admin'||document.querySelector('.quick-contact'))return;
    const desktop=document.createElement('aside');desktop.className='quick-contact';desktop.setAttribute('aria-label','快速聯絡');desktop.innerHTML=`
      <div class="quick-contact-item" data-contact-phone><button type="button" class="quick-contact-btn" aria-expanded="false" aria-label="電話聯絡">${ICONS.phone}<span>電話</span></button><div class="quick-phone-panel"><strong>電話聯絡</strong><a class="quick-phone-link" href="tel:0282217759"><span>新北辦公室</span><b>02-82217759</b></a><a class="quick-phone-link" href="tel:062360139"><span>台南辦公室</span><b>06-2360139</b></a></div></div>
      <div class="quick-contact-item"><a class="quick-contact-btn" href="https://line.me/R/ti/p/@453haosc" target="_blank" rel="noopener" aria-label="LINE 客服">${ICONS.line}<span>LINE</span></a></div>
      <div class="quick-contact-item"><a class="quick-contact-btn" href="contact.html#inquiryForm" aria-label="我要詢問">${ICONS.mail}<span>詢問</span></a></div>`;
    document.body.appendChild(desktop);
    const phoneItem=desktop.querySelector('[data-contact-phone]'),phoneBtn=phoneItem.querySelector('button');
    const closePhone=()=>{phoneItem.classList.remove('is-open');phoneBtn.setAttribute('aria-expanded','false')};
    phoneBtn.addEventListener('click',e=>{e.stopPropagation();const open=!phoneItem.classList.contains('is-open');closePhone();if(open){phoneItem.classList.add('is-open');phoneBtn.setAttribute('aria-expanded','true')}});
    phoneItem.addEventListener('mouseenter',()=>{phoneItem.classList.add('is-open');phoneBtn.setAttribute('aria-expanded','true')});
    phoneItem.addEventListener('mouseleave',closePhone);document.addEventListener('click',e=>{if(!phoneItem.contains(e.target))closePhone()});
    const mobile=document.createElement('nav');mobile.className='mobile-contact-bar';mobile.setAttribute('aria-label','快速聯絡');mobile.innerHTML=`<button type="button" data-mobile-phone aria-expanded="false">${ICONS.phone}<span>撥打電話</span></button><a href="https://line.me/R/ti/p/@453haosc" target="_blank" rel="noopener">${ICONS.line}<span>LINE 詢問</span></a><a href="contact.html#inquiryForm">${ICONS.mail}<span>線上詢問</span></a>`;document.body.appendChild(mobile);
    const mobilePanel=document.createElement('div');mobilePanel.className='mobile-contact-phone';mobilePanel.innerHTML=`<a href="tel:0282217759"><span>新北辦公室</span><b>02-82217759</b></a><a href="tel:062360139"><span>台南辦公室</span><b>06-2360139</b></a>`;document.body.appendChild(mobilePanel);
    const mobileBtn=mobile.querySelector('[data-mobile-phone]');mobileBtn.addEventListener('click',()=>{const open=mobilePanel.classList.toggle('is-open');mobileBtn.setAttribute('aria-expanded',String(open))});
  }
  function productNotFound(){const main=document.querySelector('main');if(!main)return;document.title='找不到產品｜萬里資訊';main.innerHTML=`<div class="container product-not-found"><span class="eyebrow">PRODUCT INFORMATION</span><h1>找不到此產品</h1><p>此產品網址可能已更新，請回到完整產品目錄重新選擇。</p><a class="btn btn-primary" href="products.html">返回產品資訊</a></div>`}
  function verifiedBasicSpecs(p,catName){return `<div class="spec-row"><dt>品牌</dt><dd>${esc(p.brand||'—')}</dd></div><div class="spec-row"><dt>產品名稱</dt><dd>${esc(p.name||'—')}</dd></div><div class="spec-row"><dt>產品分類</dt><dd>${esc(catName)}</dd></div><div class="spec-row"><dt>產品類型</dt><dd>${esc(p.type||p.family||'—')}</dd></div>`}
  function productPageQuality(){
    if(document.body.dataset.page!=='product'||!window.FBStore)return;
    const d=FBStore.getData(),id=params().get('id')||'',p=d.products.find(x=>x.id===id);if(!p){productNotFound();return}
    const cat=d.categories.find(c=>c.id===p.category),catName=cat?.name||'產品資訊';
    let meta=document.querySelector('meta[name="description"]');if(!meta){meta=document.createElement('meta');meta.name='description';document.head.appendChild(meta)}meta.content=(p.intro||`${p.brand} ${p.name}｜${catName}。歡迎洽詢產品規格、選配與相關技術資料。`).replace(/\s+/g,' ').slice(0,155);
    const hi=document.getElementById('productHighlights');if(hi&&(!Array.isArray(p.highlights)||!p.highlights.length||/原官網產品資料|持續補充/.test(hi.textContent))){const block=hi.closest('.detail-block');if(block?.querySelector('.eyebrow'))block.querySelector('.eyebrow').textContent='PRODUCT INFORMATION';if(block?.querySelector('h2'))block.querySelector('h2').textContent='產品資訊';hi.innerHTML=`<li><span>✓</span><span>品牌：${esc(p.brand||'—')}</span></li><li><span>✓</span><span>分類：${esc(catName)}</span></li><li><span>✓</span><span>如需完整規格、選配或相容性確認，歡迎聯絡萬里資訊。</span></li>`}
    const specs=document.getElementById('specTable');const sparseSpecs=!Array.isArray(p.specs)||p.specs.length<3||p.specs.some(row=>/原官網|品牌\s*\/\s*分類/.test(String(row?.[0]||'')));if(specs&&sparseSpecs){const block=specs.closest('.detail-block');if(block?.querySelector('.eyebrow'))block.querySelector('.eyebrow').textContent='BASIC INFORMATION';if(block?.querySelector('h2'))block.querySelector('h2').textContent='基本資料';specs.innerHTML=verifiedBasicSpecs(p,catName)}
    const files=document.getElementById('productFiles');if(files){const valid=Array.isArray(p.files)?p.files:[];if(valid.length){files.innerHTML=valid.map(f=>{const label=esc(f.label||'產品文件'),type=esc(f.type||'文件');return f.url?`<a class="download-row product-files-link" href="${esc(f.url)}" target="_blank" rel="noopener"><span class="download-icon">${ICONS.download}</span><span><small>${type}</small><b>${label}</b></span><span class="download-cta">開啟</span></a>`:`<a class="download-row product-files-link" href="contact.html?item=${encodeURIComponent(p.name)}"><span class="download-icon">${ICONS.download}</span><span><small>${type}</small><b>${label}</b></span><span class="download-cta">洽詢取得</span></a>`}).join('')}else{files.innerHTML=`<div class="product-support-card"><b>需要產品型錄、驅動或操作資料？</b><p>請提供品牌與型號，我們可協助確認適用的產品資料與下載來源。</p><div class="product-support-actions"><a href="https://line.me/R/ti/p/@453haosc" target="_blank" rel="noopener">${ICONS.line} LINE 詢問</a><a href="contact.html?item=${encodeURIComponent(p.name)}">${ICONS.mail} 線上詢問</a></div></div>`}}
  }
  function contactProductPrefill(){if(document.body.dataset.page!=='contact')return;const item=params().get('item'),select=document.getElementById('subject');if(!item||!select)return;const existing=[...select.options].find(o=>o.value===item||o.textContent===item);if(existing){select.value=existing.value;return}const option=document.createElement('option');option.value=`產品洽詢｜${item}`;option.textContent=`產品洽詢｜${item}`;option.selected=true;select.appendChild(option)}
  function run(){style();logo();quickContact();contactProductPrefill();productPageQuality()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  window.addEventListener('farbeyound:datachange',run);
})();


/* ===== assets/js/v3-refinement.js ===== */
(function(){
  const DOWNLOAD_ORDER=['Zebra','Argox','TSC','GoDEX','TOSHIBA','SATO','Honeywell','遠端連線','Microsoft'];
  const BRAND_LOGOS={
    zebra:'assets/images/brands/zebra.png',argox:'assets/images/brands/argox.png',tsc:'assets/images/brands/tsc.png',godex:'assets/images/brands/godex.png',toshiba:'assets/images/brands/toshiba.png',sato:'assets/images/brands/sato.png',honeywell:'assets/images/brands/honeywell.png',fastech:'assets/images/brands/fastech.svg',numa:'assets/images/brands/numa.png',datalogic:'assets/images/brands/datalogic.png'
  };
  function applyBrandIdentity(){
    document.querySelectorAll('.brand-copy strong').forEach(el=>{if(!el.querySelector('.brand-reg'))el.insertAdjacentHTML('beforeend','<sup class="brand-reg" aria-label="registered trademark">®</sup>')});
    document.querySelectorAll('.header-inner .brand-copy small').forEach(el=>{el.textContent='FAR-BEYOUND INFORMATION'});
    document.querySelectorAll('.footer-brand .brand-copy small').forEach(el=>{el.textContent='FAR-BEYOUND INFORMATION'});
  }
  function brandFromHref(el){try{return new URL(el.href,location.href).searchParams.get('brand')||''}catch(e){return ''}}
  function upgradeBrandPortfolio(){
    const note=document.querySelector('.brand-portfolio-head>p');if(note)note.textContent='多品牌設備選型、耗材供應與技術服務';
    document.querySelectorAll('.brand-portfolio .brand-wordmark').forEach(a=>{
      if(a.dataset.logoReady==='1')return;
      const name=(brandFromHref(a)||a.textContent||'').trim(),key=name.toLowerCase().replace(/[^a-z0-9]/g,'');
      let src=BRAND_LOGOS[key],alt=name;
      if(key==='honeywell'&&a.closest('.brand-family')&&!a.closest('.brand-family').classList.contains('scanner')){src='assets/images/brands/datamax-oneil.png';alt='Honeywell (Datamax / Intermec)'}
      if(!src)return;
      a.dataset.logoReady='1';a.setAttribute('aria-label',name+' 產品');
      const img=document.createElement('img');img.className='brand-logo-img';img.src=src;img.alt=alt;img.loading='eager';img.decoding='async';
      const label=document.createElement('span');label.className='brand-logo-label';label.textContent=name;a.replaceChildren(img,label);
    });
  }
  function upgradeProductMega(){
    const menu=document.querySelector('.nav-item.has-mega .mega-menu');if(!menu||menu.dataset.v3==='1')return;menu.dataset.v3='1';
    const brandLinks=(category,brands)=>brands.map(b=>`<a href="products.html?category=${category}&brand=${encodeURIComponent(b[0])}"><span>${b[1]||b[0]}</span></a>`).join('');
    const categoryLinks=(items)=>items.map(x=>`<a href="products.html?category=${x[0]}"><span>${x[1]}</span></a>`).join('');
    menu.innerHTML=`<div class="mega-head"><div><span class="eyebrow">PRODUCT INFORMATION</span><h3>產品與品牌</h3></div><a href="products.html" class="text-link">完整產品目錄 →</a></div><div class="v3-product-mega"><div class="v3-mega-group"><div class="v3-mega-title"><span>01</span><div><strong>標籤條碼列印機</strong><small>LABEL PRINTERS</small></div></div><div class="v3-mega-links">${brandLinks('printers',[['Zebra'],['Argox'],['TSC'],['GoDEX'],['TOSHIBA'],['SATO'],['Honeywell','Honeywell (Datamax/Intermec)']])}</div></div><div class="v3-mega-group"><div class="v3-mega-title"><span>02</span><div><strong>條碼掃描器</strong><small>BARCODE SCANNERS</small></div></div><div class="v3-mega-links">${brandLinks('scanners',[['Fastech'],['Zebra'],['Honeywell'],['NUMA'],['Datalogic']])}</div></div><div class="v3-mega-group"><div class="v3-mega-title"><span>03</span><div><strong>自動識別設備</strong><small>AUTO ID</small></div></div><div class="v3-mega-links">${categoryLinks([['rfid','RFID 設備'],['mobile','行動電腦'],['labels','標籤貼紙與碳帶']])}</div></div><div class="v3-mega-group"><div class="v3-mega-title"><span>04</span><div><strong>服務與軟體</strong><small>SERVICE</small></div></div><div class="v3-mega-links">${categoryLinks([['printing','標籤貼紙代印'],['software','標籤軟體'],['parts','標籤機維修 / 配件']])}</div></div></div>`;
  }
  function orderIndex(name){let n=name;if(n.startsWith('Honeywell'))n='Honeywell';if(n.startsWith('遠端連線'))n='遠端連線';const i=DOWNLOAD_ORDER.indexOf(n);return i<0?999:i}
  function fixDownloadNavigation(){
    document.querySelectorAll('.subnav-panel').forEach(panel=>{const links=[...panel.querySelectorAll('.subnav-link')].filter(a=>a.href.includes('downloads.html?brand='));if(!links.length)return;const grid=links[0].parentElement;links.sort((a,b)=>orderIndex(brandFromHref(a))-orderIndex(brandFromHref(b))).forEach(a=>grid.appendChild(a))});
    document.querySelectorAll('.mobile-nav-group').forEach(group=>{if(!group.querySelector('summary')?.textContent.includes('下載服務'))return;const box=group.querySelector('.mobile-nav-sub');if(!box)return;const links=[...box.querySelectorAll('a')].filter(a=>a.href.includes('downloads.html?brand='));links.sort((a,b)=>orderIndex(brandFromHref(a))-orderIndex(brandFromHref(b))).forEach(a=>box.appendChild(a))});
  }
  function compactHome(){
    if(document.body.dataset.page!=='home')return;
    document.getElementById('brandShowcase')?.remove();document.getElementById('aboutBand')?.remove();
    const categoryGrid=document.getElementById('homeCategories');categoryGrid?.closest('section')?.remove();
    const grid=document.getElementById('homeProducts');if(grid)[...grid.children].slice(6).forEach(x=>x.remove());
    const news=document.getElementById('homeNews');if(news)[...news.children].slice(3).forEach(x=>x.remove());
  }
  function cleanFooter(){document.querySelectorAll('.footer-bottom span').forEach((el,i)=>{if(i===1||/測試|提案|PREVIEW|v0\./i.test(el.textContent))el.textContent='所有其他商標均為各自所有者之財產'})}
  function run(){applyBrandIdentity();upgradeProductMega();fixDownloadNavigation();compactHome();upgradeBrandPortfolio();cleanFooter()}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,150);setTimeout(run,450);setTimeout(run,800)});
  if(document.readyState!=='loading')setTimeout(run,0);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,100));
})();


/* ===== assets/js/v5-showcase.js ===== */
(function(){
  const PAGE_META={
    products:['標籤列印','條碼掃描','RFID','行動電腦','耗材與維修'],
    product:['產品規格','技術文件','設備洽詢'],
    solutions:['SFIS','WMS','SMT','條碼整合'],
    cases:['製造現場','倉儲管理','流程整合'],
    news:['公司公告','產品消息','系統消息'],
    downloads:['驅動程式','工具程式','標籤軟體','技術文件'],
    about:['1992 成立','台北','台南','AUTO ID'],
    locations:['台北總公司','台南分公司','技術服務'],
    contact:['設備','耗材','維修','系統整合']
  };

  function runtimeFixes(){
    if(document.getElementById('v5RuntimeFixes'))return;
    const style=document.createElement('style');
    style.id='v5RuntimeFixes';
    style.textContent=`
      .mobile-contact-phone{display:none!important}
      @media(max-width:980px){.mobile-contact-phone.is-open{display:block!important}}
    `;
    document.head.appendChild(style);
  }

  function pageMeta(){
    const page=document.body.dataset.page||'';
    const items=PAGE_META[page];
    const hero=document.querySelector('.page-hero .container');
    if(!items||!hero||hero.querySelector('.v5-page-meta'))return;
    const row=document.createElement('div');
    row.className='v5-page-meta';
    row.setAttribute('aria-label','服務重點');
    row.innerHTML=items.map(x=>`<span>${x}</span>`).join('');
    hero.appendChild(row);
  }

  function createSearchTools(placeholder){
    const tools=document.createElement('div');
    tools.className='v5-catalog-tools';
    tools.innerHTML=`<div class="v5-search-wrap"><input class="v5-catalog-search" type="search" autocomplete="off" inputmode="search" placeholder="${placeholder}" aria-label="${placeholder}"></div><span class="v5-search-status" aria-live="polite"></span><button class="v5-search-clear" type="button">清除搜尋</button>`;
    return tools;
  }

  function productSearch(){
    if(document.body.dataset.page!=='products')return;
    const grid=document.getElementById('productGrid');
    const head=document.querySelector('.catalog-head');
    if(!grid||!head)return;
    let tools=document.querySelector('.v5-catalog-tools[data-kind="products"]');
    if(!tools){
      tools=createSearchTools('搜尋品牌、型號或產品名稱');
      tools.dataset.kind='products';
      head.after(tools);
    }
    const input=tools.querySelector('.v5-catalog-search');
    const status=tools.querySelector('.v5-search-status');
    const clear=tools.querySelector('.v5-search-clear');
    const count=document.getElementById('productCount');

    function apply(){
      const q=(input.value||'').trim().toLocaleLowerCase('zh-Hant');
      const cards=[...grid.querySelectorAll('.product-card')];
      let visible=0;
      cards.forEach(card=>{
        const hay=(card.textContent||'').toLocaleLowerCase('zh-Hant');
        const show=!q||hay.includes(q);
        card.hidden=!show;
        if(show)visible++;
      });
      let empty=grid.querySelector('.v5-no-results');
      if(q&&cards.length&&visible===0){
        if(!empty){empty=document.createElement('div');empty.className='v5-no-results';grid.appendChild(empty)}
        empty.textContent=`找不到「${input.value.trim()}」相關產品，可改用品牌或型號關鍵字搜尋。`;
      }else if(empty){empty.remove()}
      status.textContent=q?`顯示 ${visible} / ${cards.length} 項`:`共 ${cards.length} 項產品`;
      if(count)count.textContent=q?`${visible} 項符合`:`${cards.length} 項產品`;
      clear.hidden=!q;
    }

    if(!tools.dataset.bound){
      input.addEventListener('input',apply);
      input.addEventListener('keydown',e=>{if(e.key==='Escape'){input.value='';apply();input.blur()}});
      clear.addEventListener('click',()=>{input.value='';apply();input.focus()});
      document.addEventListener('keydown',e=>{
        if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!/input|textarea|select/i.test(document.activeElement?.tagName||'')){
          e.preventDefault();input.focus();
        }
      });
      const observer=new MutationObserver(()=>requestAnimationFrame(apply));
      observer.observe(grid,{childList:true});
      tools.dataset.bound='1';
    }
    apply();
  }

  function downloadSearch(){
    if(document.body.dataset.page!=='downloads')return;
    const list=document.getElementById('downloadList');
    const head=document.querySelector('.download-content-head');
    if(!list||!head)return;
    let tools=document.querySelector('.v5-download-tools');
    if(!tools){
      tools=createSearchTools('搜尋驅動、軟體或版本');
      tools.classList.remove('v5-catalog-tools');
      tools.classList.add('v5-download-tools');
      head.appendChild(tools);
    }
    const input=tools.querySelector('.v5-catalog-search');
    const status=tools.querySelector('.v5-search-status');
    const clear=tools.querySelector('.v5-search-clear');

    function apply(){
      const q=(input.value||'').trim().toLocaleLowerCase('zh-Hant');
      const rows=[...list.querySelectorAll('.download-item')];
      let visible=0;
      rows.forEach(row=>{
        const show=!q||(row.textContent||'').toLocaleLowerCase('zh-Hant').includes(q);
        row.hidden=!show;if(show)visible++;
      });
      status.textContent=q?`顯示 ${visible} / ${rows.length} 項`:`目前 ${rows.length} 項`;
      clear.hidden=!q;
    }
    if(!tools.dataset.bound){
      input.addEventListener('input',apply);
      input.addEventListener('keydown',e=>{if(e.key==='Escape'){input.value='';apply();input.blur()}});
      clear.addEventListener('click',()=>{input.value='';apply();input.focus()});
      new MutationObserver(()=>requestAnimationFrame(apply)).observe(list,{childList:true});
      tools.dataset.bound='1';
    }
    apply();
  }

  function heroMeta(){
    if(document.body.dataset.page!=='home')return;
    const copy=document.querySelector('.hero.v2-home-hero .hero-copy');
    if(!copy||copy.querySelector('.v5-hero-meta'))return;
    const meta=document.createElement('div');
    meta.className='v5-hero-meta';
    meta.innerHTML='<span>SINCE 1992</span><span>AUTO ID · SMART MANUFACTURING</span>';
    copy.prepend(meta);
  }

  function corporateWording(){
    document.querySelectorAll('a,button').forEach(el=>{
      if(el.textContent.trim()==='免費諮詢')el.textContent='需求洽詢';
    });
  }

  function labelExternalLinks(){
    document.querySelectorAll('a[target="_blank"]').forEach(a=>{
      if(!a.getAttribute('aria-label')&&a.textContent.trim())a.setAttribute('aria-label',`${a.textContent.trim()}（另開新視窗）`);
    });
  }

  function run(){
    runtimeFixes();
    document.documentElement.classList.add('v5-ready');
    heroMeta();
    pageMeta();
    productSearch();
    downloadSearch();
    corporateWording();
    labelExternalLinks();
  }

  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,180);setTimeout(run,850)});
  if(document.readyState!=='loading')setTimeout(run,30);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,120));
})();


/* ===== assets/js/site-display-control.js ===== */
(function(){'use strict';const DEFAULT={showCredibility:false,showBrandPortfolio:true,showServiceStrip:true,showCategories:true,showFeaturedProducts:true,showSolutions:true,showCases:true,showNews:true,showCta:true,showHeroTrust:true,showHeaderSearch:true,showHeaderConsult:true,showFloatingContact:true,ctaTitle:'有設備、耗材、維修或系統需求？',ctaText:'提供品牌、型號或使用情境，我們可協助確認適合的產品、耗材與服務方向。',ctaButton:'聯絡萬里資訊',ctaUrl:'contact.html'};const cfg=()=>Object.assign({},DEFAULT,(window.FBStore?.getData?.().siteDisplay||{}));function visible(el,on){if(el)el.style.display=on?'':'none'}function service(on){const guide=document.querySelector('.fb-home-guide'),legacy=document.querySelector('.v2-service-strip');if(guide)visible(guide,on);if(legacy&&!guide)visible(legacy,on)}function loadFeatureManager(){if(document.querySelector('script[data-front-feature-control]'))return;const s=document.createElement('script');s.src='assets/js/front-feature-control.js?v=20260915-1125';s.dataset.frontFeatureControl='1';document.body.appendChild(s)}function apply(){if(!window.FBStore)return false;const c=cfg();if(document.body.dataset.page==='home'){visible(document.querySelector('.v5-credibility'),c.showCredibility);visible(document.querySelector('.brand-portfolio'),c.showBrandPortfolio);service(c.showServiceStrip);visible(document.querySelector('.hero-trust'),c.showHeroTrust);visible(document.querySelector('#homeCategories')?.closest('.section'),c.showCategories);visible(document.querySelector('#homeProducts')?.closest('.section'),c.showFeaturedProducts);visible(document.querySelector('#homeSolutions')?.closest('.section'),c.showSolutions);visible(document.querySelector('.v5-case-section'),c.showCases);visible(document.querySelector('#homeNews')?.closest('.section'),c.showNews);const cta=document.querySelector('.cta-band');visible(cta,c.showCta);if(cta){const h=cta.querySelector('h2'),p=cta.querySelector('p'),a=cta.querySelector('a');if(h)h.textContent=c.ctaTitle;if(p)p.textContent=c.ctaText;if(a){a.textContent=c.ctaButton;a.href=c.ctaUrl||'contact.html'}}}visible(document.querySelector('.header-actions .search-trigger'),c.showHeaderSearch);visible(document.querySelector('.header-actions .btn-primary'),c.showHeaderConsult);loadFeatureManager();return true}function boot(){if(apply())return;setTimeout(boot,80)}document.addEventListener('DOMContentLoaded',boot,{once:true});window.addEventListener('farbeyound:datachange',apply)})();


/* ===== assets/js/site-content-control.js ===== */
(function(){'use strict';const DEFAULT={seoTitle:'萬里資訊｜條碼設備、自動識別與系統整合',seoDescription:'萬里資訊提供標籤條碼列印機、條碼掃描器、RFID、行動電腦、標籤耗材、維修與智慧製造系統整合服務。',navProducts:'產品資訊',navDownloads:'下載服務',navSolutions:'系統方案',navCases:'客戶案例',navNews:'最新消息',navContact:'聯絡我們',navCompany:'公司資訊',consultText:'免費諮詢',footerIntro:'條碼列印、掃描、RFID、企業行動設備與智慧製造系統整合，協助企業建立穩定且可追蹤的現場作業流程。',homeBrandTitle:'代理與經銷品牌',homeBrandDesc:'多品牌設備選型、耗材供應與技術服務',homeCategoriesTitle:'產品與服務',homeCategoriesDesc:'依設備類型快速進入完整目錄，從硬體、耗材、軟體到維修服務集中查找。',homeFeaturedTitle:'代表產品',homeFeaturedLink:'查看完整產品目錄 →',homeSolutionsTitle:'系統方案',homeSolutionsDesc:'依生產、倉儲、SMT 防錯與條碼應用需求，提供可與現場流程整合的系統方案。',homeCasesTitle:'客戶案例',homeCasesLink:'查看所有案例 →',homeNewsTitle:'最新消息',homeNewsLink:'查看所有消息 →',service1Title:'設備與產品',service1Text:'列印機・掃描器・RFID・行動電腦',service1Url:'products.html',service2Title:'標籤與耗材',service2Text:'標籤貼紙・碳帶・客製代印',service2Url:'products.html?category=labels',service3Title:'維修與技術支援',service3Text:'設備檢測・零件・現場服務',service3Url:'products.html?category=parts',service4Title:'系統整合',service4Text:'SFIS・WMS・SMT・條碼整合',service4Url:'solutions.html'};const cfg=()=>Object.assign({},DEFAULT,(window.FBStore?.getData?.().siteContent||{}));const setText=(el,val)=>{if(el&&val!=null)el.textContent=val};function setMeta(name,content){let m=document.querySelector(`meta[name="${name}"]`);if(!m){m=document.createElement('meta');m.name=name;document.head.appendChild(m)}m.content=content||''}function setAnchorLabel(a,label){if(!a||label==null)return;const elementChildren=[...a.children];if(!elementChildren.length){a.textContent=label;return}const textNodes=[...a.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE);if(textNodes.length){textNodes[0].textContent=label+' ';textNodes.slice(1).forEach(n=>n.textContent='')}else a.insertBefore(document.createTextNode(label+' '),a.firstChild)}
function applyNav(c){const d=window.FBStore?.getData?.()||{},f=d.siteDisplay?.frontFeatures||{};if(!Array.isArray(f.navItems)){const labels={'products.html':c.navProducts,'downloads.html':c.navDownloads,'solutions.html':c.navSolutions,'cases.html':c.navCases,'news.html':c.navNews,'contact.html':c.navContact,'about.html':c.navCompany||'公司資訊'};document.querySelectorAll('.desktop-nav > a,.desktop-nav > .nav-item > a').forEach(a=>{const href=(a.getAttribute('href')||'').split('?')[0].split('#')[0],label=labels[href];if(label)setAnchorLabel(a,label)})}if(!f.consult)setText(document.querySelector('.header-actions .btn-primary'),c.consultText)}
function applyFooter(c){setText(document.querySelector('.footer-brand p'),c.footerIntro)}function applyHome(c){if(document.body.dataset.page!=='home')return;setText(document.querySelector('.brand-portfolio-title h2'),c.homeBrandTitle);setText(document.querySelector('.brand-portfolio-head>p'),c.homeBrandDesc);const cats=document.querySelector('#homeCategories')?.closest('.section');setText(cats?.querySelector('.section-head h2'),c.homeCategoriesTitle);setText(cats?.querySelector('.section-head>p'),c.homeCategoriesDesc);const featured=document.querySelector('#homeProducts')?.closest('.section');setText(featured?.querySelector('.section-head h2'),c.homeFeaturedTitle);setText(featured?.querySelector('.section-head .text-link'),c.homeFeaturedLink);const sols=document.querySelector('#homeSolutions')?.closest('.section');setText(sols?.querySelector('.section-head h2'),c.homeSolutionsTitle);setText(sols?.querySelector('.section-head>p'),c.homeSolutionsDesc);const cases=document.querySelector('.v5-case-section');setText(cases?.querySelector('.section-head h2'),c.homeCasesTitle);setText(cases?.querySelector('.section-head .text-link'),c.homeCasesLink);const news=document.querySelector('#homeNews')?.closest('.section');setText(news?.querySelector('.section-head h2'),c.homeNewsTitle);setText(news?.querySelector('.section-head .text-link'),c.homeNewsLink);const items=[...document.querySelectorAll('.v2-service-strip .v2-service-item')],svc=[[c.service1Title,c.service1Text,c.service1Url],[c.service2Title,c.service2Text,c.service2Url],[c.service3Title,c.service3Text,c.service3Url],[c.service4Title,c.service4Text,c.service4Url]];items.forEach((x,i)=>{setText(x.querySelector('b'),svc[i]?.[0]);setText(x.querySelector('small'),svc[i]?.[1]);if(svc[i]?.[2])x.href=svc[i][2]})}
function apply(){if(!window.FBStore)return false;const c=cfg();if(c.seoTitle)document.title=c.seoTitle;setMeta('description',c.seoDescription);applyNav(c);applyFooter(c);applyHome(c);return true}
function boot(){if(apply())return;setTimeout(boot,80)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
window.addEventListener('farbeyound:datachange',apply)})();

/* ===== assets/js/contact-youtube-upgrade.js ===== */
(function(){if(window.__fbContactYoutubeUpgrade)return;window.__fbContactYoutubeUpgrade=true;function data(){const d=window.FBStore?.getData?.()||{},site=d.site||{};return{phones:Array.isArray(site.phones)?site.phones:[],youtube:String(site.youtube||window.FBSocialLinks?.youtube||'').trim()}}function tel(v){return String(v||'').replace(/[^0-9+]/g,'')}function loadMobileExperience(){if(document.querySelector('link[data-mobile-experience]'))return;const l=document.createElement('link');l.rel='stylesheet';l.href='assets/css/mobile-experience.css?v=20260911b';l.dataset.mobileExperience='1';document.head.appendChild(l)}function addStyle(){if(document.getElementById('fbContactYoutubeUpgradeStyle'))return;const s=document.createElement('style');s.id='fbContactYoutubeUpgradeStyle';s.textContent='.footer-media-link{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 0;border-top:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12);text-decoration:none;color:inherit}.footer-media-copy{display:flex;align-items:center;gap:12px;min-width:0}.footer-media-icon{width:36px;height:36px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.24);border-radius:50%}.footer-media-icon svg{width:19px;height:19px;fill:currentColor}.footer-media-copy small{display:block;font-size:10px;letter-spacing:.12em;opacity:.68;margin-bottom:3px}.footer-media-copy b{display:block;font-size:13px}.footer-media-arrow{font-size:12px;font-weight:700;white-space:nowrap;opacity:.78}@media(max-width:680px){.footer-media-link{padding:16px 0}.footer-media-arrow{font-size:11px}}';document.head.appendChild(s)}function upgradeMobilePhone(){const old=document.querySelector('[data-mobile-phone]'),panel=document.querySelector('.mobile-contact-phone');if(!old||!panel||old.dataset.clickPanelReady==='1')return;const btn=old.cloneNode(true);btn.dataset.clickPanelReady='1';old.replaceWith(btn);const label=btn.querySelector('span');if(label)label.textContent='電話';btn.setAttribute('aria-label','電話聯絡');panel.id='mobilePhonePanel';panel.innerHTML='';data().phones.forEach(p=>{const a=document.createElement('a');a.href='tel:'+tel(p.value);const s=document.createElement('span'),b=document.createElement('b');s.textContent=(p.label||'')+'辦公室';b.textContent=p.value||'';a.append(s,b);panel.appendChild(a)});btn.setAttribute('aria-controls',panel.id);btn.setAttribute('aria-expanded','false');const close=()=>{panel.classList.remove('is-open');btn.setAttribute('aria-expanded','false')};btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const open=!panel.classList.contains('is-open');close();if(open){panel.classList.add('is-open');btn.setAttribute('aria-expanded','true')}});panel.addEventListener('click',e=>e.stopPropagation());document.addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}function addYoutubeFooter(){const url=data().youtube,old=document.querySelector('.footer-media-wrap');if(!url){old?.remove();return}if(old){const a=old.querySelector('a');if(a)a.href=url;return}const footer=document.querySelector('footer'),target=footer?.querySelector('.footer-bottom')||footer?.lastElementChild;if(!footer||!target)return;const wrap=document.createElement('div');wrap.className='container footer-media-wrap';const a=document.createElement('a');a.className='footer-media-link';a.href=url;a.target='_blank';a.rel='noopener';a.setAttribute('aria-label','萬里資訊 YouTube 頻道（另開新視窗）');a.innerHTML='<span class="footer-media-copy"><span class="footer-media-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21.2 7.1a2.8 2.8 0 0 0-2-2C17.4 4.6 12 4.6 12 4.6s-5.4 0-7.2.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.3 12a29 29 0 0 0 .5 4.9 2.8 2.8 0 0 0 2 2c1.8.5 7.2.5 7.2.5s5.4 0 7.2-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-4.9 29 29 0 0 0-.5-4.9ZM10 15.2V8.8l5.5 3.2L10 15.2Z"/></svg></span><span><small>VIDEO CHANNEL</small><b>萬里資訊 YouTube</b></span></span><span class="footer-media-arrow">前往影音頻道 →</span>';wrap.appendChild(a);target.parentNode.insertBefore(wrap,target)}function run(){loadMobileExperience();addStyle();upgradeMobilePhone();addYoutubeFooter()}document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,160);setTimeout(run,700)});if(document.readyState!=='loading')setTimeout(run,0);window.addEventListener('farbeyound:datachange',()=>setTimeout(run,120))})();

/* ===== assets/js/desktop-phone-popover.js ===== */
/* Desktop phone interaction authority.
 * final-fixes.js builds the quick-contact DOM; this file owns the final
 * desktop phone accessibility/state contract so hover and click never cancel
 * each other during the same pointer interaction.
 */
(function(){
  'use strict';
  if(window.__fbDesktopPhonePopoverCompat)return;
  window.__fbDesktopPhonePopoverCompat=true;

  document.body?.classList.add('fb-public-ready');

  let activeItem=null;
  let classObserver=null;
  const COLORS=['#17324d','#06C755','#F28C28'];

  function stabilizeHero(){
    if(document.body?.dataset?.page!=='home')return;
    const data=window.FBStore?.getData?.();
    if(!data)return;
    data.homeHero=Object.assign({},data.homeHero||{}, {autoplay:false});
  }

  function lockRail(rail){
    rail.style.setProperty('overflow','visible','important');
    [...rail.querySelectorAll('.quick-contact-btn')].slice(0,3).forEach((button,index)=>{
      button.style.setProperty('background',COLORS[index],'important');
      button.style.setProperty('color','#fff','important');
      button.style.setProperty('transition','none','important');
      button.querySelectorAll('svg').forEach(svg=>svg.style.setProperty('stroke','#fff','important'));
      button.querySelectorAll('span,b,small').forEach(node=>node.style.setProperty('color','#fff','important'));
    });
  }

  function normalizePhonePanel(panel){
    const links=[...panel.querySelectorAll('a[href^="tel:"]')];
    const expected=[
      {label:'新北辦公室',number:'02-82217759',href:'tel:0282217759'},
      {label:'台南辦公室',number:'06-2360139',href:'tel:062360139'}
    ];
    expected.forEach((info,index)=>{
      const link=links[index];
      if(!link)return;
      link.href=info.href;
      const label=link.querySelector('span');
      const number=link.querySelector('b');
      if(label)label.textContent=info.label;
      if(number)number.textContent=info.number;
    });
  }

  function sync(item,button,panel){
    const open=item.classList.contains('is-open');
    button.setAttribute('aria-expanded',String(open));
    panel.setAttribute('aria-hidden',String(!open));
    panel.style.setProperty('display','block','important');
    panel.style.setProperty('visibility',open?'visible':'hidden','important');
    panel.style.setProperty('opacity',open?'1':'0','important');
    panel.style.setProperty('transform',open?'none':'translateX(8px)','important');
    panel.style.setProperty('pointer-events',open?'auto':'none','important');
    panel.style.setProperty('z-index','120','important');
  }

  function openPhone(item,button,panel){
    item.classList.add('is-open');
    sync(item,button,panel);
  }

  function closePhone(item,button,panel){
    item.classList.remove('is-open');
    sync(item,button,panel);
  }

  function bind(){
    if(document.body?.dataset?.page==='admin')return false;
    document.body?.classList.add('fb-public-ready');
    const rail=document.querySelector('.quick-contact');
    if(!rail)return false;
    lockRail(rail);

    const items=[...rail.querySelectorAll('.quick-contact-item')];
    const item=rail.querySelector('.quick-contact-item[data-contact-phone]')||items[0];
    if(!item)return false;
    if(!item.hasAttribute('data-contact-phone'))item.setAttribute('data-contact-phone','');

    const button=item.querySelector('.quick-contact-btn');
    const panel=item.querySelector('.quick-phone-panel');
    if(!button||!panel)return false;

    panel.id='fbDesktopPhonePopover';
    button.setAttribute('aria-controls',panel.id);
    normalizePhonePanel(panel);
    sync(item,button,panel);

    if(activeItem!==item){
      if(classObserver)classObserver.disconnect();
      activeItem=item;
      classObserver=new MutationObserver(()=>sync(item,button,panel));
      classObserver.observe(item,{attributes:true,attributeFilter:['class']});
    }

    if(!item.dataset.desktopPopoverCompat){
      item.dataset.desktopPopoverCompat='1';

      /* hoverState only previews the card. Once the user clicks, clickState
       * takes priority until the pointer leaves, so the second click can close
       * the card without mouseenter immediately reopening it. */
      let clickState=null;
      let openedByHover=false;

      button.addEventListener('click',e=>{
        e.preventDefault();
        e.stopImmediatePropagation();

        if(openedByHover){
          clickState=true;
          openedByHover=false;
          openPhone(item,button,panel);
          return;
        }

        if(clickState===true||item.classList.contains('is-open')){
          clickState=false;
          closePhone(item,button,panel);
          return;
        }

        clickState=true;
        openPhone(item,button,panel);
      },true);

      item.addEventListener('mouseenter',()=>{
        if(clickState===false)return;
        if(clickState===null)openedByHover=true;
        openPhone(item,button,panel);
      });

      item.addEventListener('mouseleave',()=>{
        clickState=null;
        openedByHover=false;
        closePhone(item,button,panel);
      });

      document.addEventListener('click',e=>{
        if(item.contains(e.target))return;
        clickState=null;
        openedByHover=false;
        closePhone(item,button,panel);
      });

      document.addEventListener('keydown',e=>{
        if(e.key!=='Escape')return;
        clickState=false;
        openedByHover=false;
        closePhone(item,button,panel);
      });
    }
    return true;
  }

  function boot(){
    stabilizeHero();
    if(bind())return;

    const root=document.body||document.documentElement;
    const domObserver=new MutationObserver(()=>{
      if(bind())domObserver.disconnect();
    });
    domObserver.observe(root,{childList:true,subtree:true});
    setTimeout(()=>domObserver.disconnect(),1500);
  }

  stabilizeHero();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
  window.addEventListener('load',()=>{document.body?.classList.add('fb-public-ready');stabilizeHero();bind()},{once:true});
  window.addEventListener('farbeyound:datachange',()=>{stabilizeHero();requestAnimationFrame(bind)});
})();


/* ===== assets/js/home-late-runtime.js ===== */
(function(){
  'use strict';
  if(window.__fbHomeLateRuntime)return;
  window.__fbHomeLateRuntime=true;

  const current=document.currentScript;
  const build=(()=>{
    try{return new URL(current?.src||'',location.href).searchParams.get('v')||'20260918-1030'}
    catch(_){return'20260918-1030'}
  })();

  function assets(){
    const node=document.getElementById('homeLateRuntimeAssets');
    if(!node)return[];
    try{
      const list=JSON.parse(node.textContent||'[]');
      return Array.isArray(list)?list.filter(Boolean):[];
    }catch(err){
      console.error('[home-late-runtime] invalid asset manifest',err);
      return[];
    }
  }

  function load(src){
    return new Promise(resolve=>{
      const base=String(src).split('?')[0];
      if(document.querySelector(`script[src^="${base}"]`)){resolve();return}
      const script=document.createElement('script');
      script.src=`${base}?v=${encodeURIComponent(build)}`;
      script.async=false;
      script.onload=resolve;
      script.onerror=()=>{console.error('[home-late-runtime] failed',base);resolve()};
      document.body.appendChild(script);
    });
  }

  async function run(){
    for(const src of assets())await load(src);
  }

  function schedule(){
    const start=()=>run();
    if('requestIdleCallback'in window)requestIdleCallback(start,{timeout:1200});
    else setTimeout(start,250);
  }

  if(document.readyState==='complete')schedule();
  else window.addEventListener('load',schedule,{once:true});
})();
