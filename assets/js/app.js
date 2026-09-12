(function () {
  const $ = (s, p=document) => p.querySelector(s);
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

  function renderSearch(q) {
    const box = $('#siteSearchResults'); if(!box) return;
    q=q.trim().toLowerCase();
    if(!q){box.innerHTML='<div class="search-hint">輸入型號、品牌、產品類型或系統名稱。</div>';return}
    const d=FBStore.getData();
    const products=d.products.filter(p=>[p.name,p.brand,p.family,p.subtitle,p.type,p.intro].join(' ').toLowerCase().includes(q)).slice(0,6);
    const solutions=d.solutions.filter(s=>[s.name,s.en,s.desc].join(' ').toLowerCase().includes(q)).slice(0,3);
    const news=d.news.filter(n=>[n.title,n.type,n.excerpt].join(' ').toLowerCase().includes(q)).slice(0,3);
    if(!products.length&&!solutions.length&&!news.length){box.innerHTML=`<div class="empty-state"><b>找不到「${escapeHtml(q)}」</b><span>可以改用品牌、型號或產品類別搜尋。</span></div>`;return}
    box.innerHTML = [
      ...products.map(p=>`<a class="search-result" href="product.html?id=${encodeURIComponent(p.id)}"><span class="result-icon">${icon(p.device||'box')}</span><span><small>產品 · ${p.brand}</small><b>${p.name}</b></span>${icon('chevron')}</a>`),
      ...solutions.map(s=>`<a class="search-result" href="solutions.html#${s.id}"><span class="result-icon">${icon(s.icon)}</span><span><small>系統方案</small><b>${s.name}</b></span>${icon('chevron')}</a>`),
      ...news.map(n=>`<a class="search-result" href="news.html"><span class="result-icon">${icon('software')}</span><span><small>${n.type} · ${n.date}</small><b>${n.title}</b></span>${icon('chevron')}</a>`)
    ].join('');
  }

  function escapeHtml(str=''){return String(str).replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));}
  function qs(name){return new URLSearchParams(location.search).get(name)}
  function formatDate(d){return d ? d.replaceAll('-','.') : ''}

  window.FB = { $, $$, icon, deviceVisual, escapeHtml, qs, formatDate, initCommon };
  document.addEventListener('DOMContentLoaded', initCommon);
})();
