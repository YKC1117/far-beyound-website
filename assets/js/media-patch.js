(function(){
  const LOGO='assets/images/brand/far-beyound-logo.png';
  const IMAGES={
    'zebra-zt610-zt620':'assets/images/products/zebra-zt610-zt620.jpg',
    'zebra-zt411-zt421':'assets/images/products/zebra-zt411-zt421.png',
    'zebra-ds4678-xd':'assets/images/products/zebra-ds4678-xd.jpg',
    'honeywell-xenon-1900-1902':'assets/images/products/honeywell-xenon-1900-1902.png',
    'tsc-mh241-mh341-mh641':'assets/images/products/tsc-mh241-mh341-mh641.png',
    'tsc-tx610':'assets/images/products/tsc-tx610.png',
    'argox-cx3140-pro':'assets/images/products/argox-cx3140-pro.jpg',
    'godex-g500-g530':'assets/images/products/godex-g500-g530.png'
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
      const replaceBrands=new Set(['Zebra','Argox','GoDEX','TOSHIBA','SATO','Honeywell']);
      d.downloads=d.downloads.filter(x=>!replaceBrands.has(x.brand)).concat(DOWNLOAD_REPLACEMENTS);
      return d;
    };
  }

  function imageIdForTitle(text=''){
    const checks=[['ZT610','zebra-zt610-zt620'],['ZT620','zebra-zt610-zt620'],['ZT411','zebra-zt411-zt421'],['ZT421','zebra-zt411-zt421'],['DS4678','zebra-ds4678-xd'],['Xenon 1900','honeywell-xenon-1900-1902'],['MH241','tsc-mh241-mh341-mh641'],['MH341','tsc-mh241-mh341-mh641'],['MH641','tsc-mh241-mh341-mh641'],['TX610','tsc-tx610'],['CX-3140','argox-cx3140-pro'],['G500+','godex-g500-g530'],['G530+','godex-g500-g530']];
    const hit=checks.find(([n])=>text.includes(n));return hit?hit[1]:null;
  }
  function productPhoto(src,alt,brand=''){return `<div class="real-product-media"><img src="${src}" alt="${alt}" loading="lazy" referrerpolicy="no-referrer"><span>${brand}</span></div>`}
  function fallbackVisual(p){return window.FB?.deviceVisual?FB.deviceVisual(p.device,p.brand,p.family):''}
  function homeProductCard(p){const src=IMAGES[p.id];return `<a class="product-card" href="product.html?id=${encodeURIComponent(p.id)}"><div class="product-card-visual">${src?productPhoto(src,p.name,p.brand):fallbackVisual(p)}</div><div class="product-card-body"><div class="product-meta"><span>${p.brand}</span><span>${p.type}</span></div><h3>${p.name}</h3><p>${p.subtitle}</p><div class="card-link">查看產品 ${FB.icon('arrow')}</div></div></a>`}

  function injectStyle(){
    if(document.getElementById('fbMediaPatchStyle'))return;
    const st=document.createElement('style');st.id='fbMediaPatchStyle';st.textContent=`
.brand-mark{background:#fff!important;border:1px solid #e1e7ed!important;overflow:hidden!important;padding:3px!important;box-shadow:0 8px 22px rgba(15,23,42,.12)!important}.brand-mark i{display:none!important}.brand-mark img{display:block;width:100%;height:100%;object-fit:contain;border-radius:9px}.real-product-media{position:relative;width:100%;height:100%;display:grid;place-items:center;background:linear-gradient(145deg,#fff,#f4f7f9);overflow:hidden}.real-product-media img{width:88%;height:88%;object-fit:contain;transition:transform .22s ease;mix-blend-mode:multiply}.product-card:hover .real-product-media img{transform:scale(1.045)}.real-product-media span{position:absolute;left:14px;bottom:12px;background:rgba(7,24,45,.9);color:white;border-radius:999px;padding:5px 9px;font-size:10px;font-weight:900;letter-spacing:.08em}.product-detail-visual .real-product-media img{width:92%;height:92%}.home-photo-showcase{height:100%;min-height:390px;display:grid;grid-template-columns:1.25fr .75fr;gap:12px;padding:12px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.13);border-radius:24px;box-shadow:0 26px 70px rgba(0,0,0,.24);backdrop-filter:blur(12px)}.home-photo-main,.home-photo-side{min-width:0}.home-photo-main{position:relative;border-radius:18px;overflow:hidden;background:white;display:grid;place-items:center}.home-photo-main img{width:94%;height:94%;object-fit:contain}.home-photo-main .cap{position:absolute;left:18px;right:18px;bottom:16px;padding:12px 14px;border-radius:13px;background:rgba(7,24,45,.88);color:white}.home-photo-main .cap small{display:block;color:#9fe6df;font-weight:800;letter-spacing:.08em}.home-photo-main .cap b{display:block;font-size:18px;margin-top:2px}.home-photo-side{display:grid;grid-template-rows:1fr 1fr;gap:12px}.home-photo-tile{position:relative;border-radius:18px;overflow:hidden;background:white;display:grid;place-items:center}.home-photo-tile img{width:90%;height:86%;object-fit:contain}.home-photo-tile b{position:absolute;left:10px;bottom:9px;background:rgba(7,24,45,.86);color:#fff;padding:5px 8px;border-radius:8px;font-size:10px}.brand-showcase{padding:34px 0;background:#fff;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.brand-showcase .brand-list{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.brand-badge{min-height:72px;border:1px solid #e2e8f0;border-radius:14px;background:#f8fafc;display:grid;place-items:center;text-align:center;font-size:17px;font-weight:900;color:#26384d;letter-spacing:.02em}.about-band{padding:70px 0;background:linear-gradient(135deg,#07182d,#0d3151);color:#fff}.about-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:48px;align-items:center}.about-grid h2{font-size:38px;margin:7px 0 14px}.about-grid p{color:#bdd0e3;margin:0}.about-points{display:grid;grid-template-columns:1fr 1fr;gap:12px}.about-point{padding:18px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);border-radius:15px}.about-point b{display:block;font-size:20px}.about-point span{display:block;color:#9fb6cd;font-size:12px;margin-top:4px}.location-mini-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin:22px 0 0}.location-mini{background:white;border:1px solid var(--line);border-radius:16px;padding:20px}.location-mini small{display:block;color:var(--teal);font-weight:900;letter-spacing:.08em}.location-mini b{display:block;font-size:22px;margin:4px 0}.location-mini span{display:block;color:var(--muted);font-size:13px}.official-note{font-size:11px;color:#8493a3;margin-top:10px}@media(max-width:900px){.brand-showcase .brand-list{grid-template-columns:repeat(3,1fr)}.about-grid{grid-template-columns:1fr}}@media(max-width:680px){.home-photo-showcase{min-height:330px;grid-template-columns:1fr}.home-photo-side{display:none}.location-mini-grid{grid-template-columns:1fr}.real-product-media img{width:92%;height:92%}.brand-showcase .brand-list{grid-template-columns:repeat(2,1fr)}.about-points{grid-template-columns:1fr}.about-grid h2{font-size:31px}}`;
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
  function bumpVersion(){document.querySelectorAll('.footer-bottom span').forEach(el=>{if(el.textContent.includes('新版網站測試環境'))el.textContent='新版網站測試環境 · v0.3 · 官方資料整合版'})}
  function run(){injectStyle();patchLogo();patchHomeHero();patchHomeProducts();patchCards();patchProductDetail();injectAbout();injectBrandShowcase();patchContact();bumpVersion()}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,120)});window.addEventListener('farbeyound:datachange',()=>setTimeout(run,80));
})();