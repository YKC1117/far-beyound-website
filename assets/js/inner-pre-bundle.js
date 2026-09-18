/* INNER PRE BUNDLE — app/media shared runtime. */

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
