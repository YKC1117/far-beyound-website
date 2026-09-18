(function(){
  'use strict';

  const IMAGES={
    'zebra-zt610-zt620':'assets/images/products/zebra-zt610-zt620.jpg',
    'zebra-zt411-zt421':'assets/images/products/zebra-zt411-zt421.png',
    'zebra-ds4678-xd':'assets/images/products/zebra-ds4678-xd.jpg',
    'honeywell-xenon-1900-1902':'assets/images/products/honeywell-xenon-1900-1902.png',
    'tsc-mh241-mh341-mh641':'assets/images/products/tsc-mh241-mh341-mh641.png',
    'tsc-tx610':'assets/images/products/tsc-tx610.png',
    'argox-cx3140-pro':'assets/images/products/argox-cx3140-pro.jpg',
    'godex-g500-g530':'assets/images/products/godex-g500-g530.png',
    'godex-gx4200i-gx4300i-gx4600i':'assets/images/products/godex-gx4200i-gx4300i-gx4600i.jpg',
    'fastech-ft-yx510':'assets/images/products/fastech-ft-yx510.jpg'
  };

  const HOME_ORDER=[
    'zebra-zt610-zt620',
    'zebra-ds4678-xd',
    'zebra-zt411-zt421',
    'honeywell-xenon-1900-1902',
    'argox-cx3140-pro',
    'tsc-mh241-mh341-mh641',
    'tsc-tx610',
    'godex-gx4200i-gx4300i-gx4600i',
    'godex-g500-g530',
    'fastech-ft-yx510'
  ];

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

  if(window.FBStore&&!window.__fbOfficialDataPatch){
    window.__fbOfficialDataPatch=true;
    const rawGet=FBStore.getData.bind(FBStore);
    FBStore.getData=function(){
      const d=rawGet();
      EXTRA_PRODUCTS.forEach(p=>{
        if(!d.products.some(x=>x.id===p.id)){
          d.products.push(JSON.parse(JSON.stringify(p)));
        }
      });
      if(!d.solutions.some(x=>x.id==='barcode')){
        d.solutions.push({
          id:'barcode',
          name:'條碼整合系統',
          en:'Barcode Integration System',
          icon:'scanner',
          desc:'整合條碼列印、掃描設備與企業作業流程，建立資料採集、標示與追蹤的一致入口。',
          points:['條碼列印與掃描設備整合','與 ERP / WMS / 生產流程串接','降低人工輸入與作業錯誤']
        });
      }
      d.products.forEach(p=>{
        if(HOME_ORDER.includes(p.id))p.featured=true;
      });
      const orderMap=new Map(HOME_ORDER.map((id,i)=>[id,i]));
      d.products.sort((a,b)=>
        (orderMap.has(a.id)?orderMap.get(a.id):1000)-
        (orderMap.has(b.id)?orderMap.get(b.id):1000)
      );
      return d;
    };
  }

  const esc=v=>window.FB?.escapeHtml
    ? FB.escapeHtml(v==null?'':String(v))
    : String(v==null?'':v).replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));

  function productPhoto(src,alt,brand=''){
    return `<div class="real-product-media"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" referrerpolicy="no-referrer"><span>${esc(brand)}</span></div>`;
  }

  function fallbackVisual(p){
    return window.FB?.deviceVisual?FB.deviceVisual(p.device,esc(p.brand),esc(p.family)):'';
  }

  function homeProductCard(p){
    const src=IMAGES[p.id];
    return `<a class="product-card" href="product.html?id=${encodeURIComponent(p.id)}"><div class="product-card-visual">${src?productPhoto(src,p.name,p.brand):fallbackVisual(p)}</div><div class="product-card-body"><div class="product-meta"><span>${esc(p.brand)}</span><span>${esc(p.type)}</span></div><h3>${esc(p.name)}</h3><p>${esc(p.subtitle)}</p><div class="card-link">查看產品 ${FB.icon('arrow')}</div></div></a>`;
  }

  function injectStyle(){
    if(document.getElementById('fbMediaPatchStyle'))return;
    const st=document.createElement('style');
    st.id='fbMediaPatchStyle';
    st.textContent=`
      .real-product-media{position:relative;width:100%;height:100%;display:grid;place-items:center;background:linear-gradient(145deg,#fff,#f4f7f9);overflow:hidden}
      .real-product-media img{width:88%;height:88%;object-fit:contain;transition:transform .22s ease;mix-blend-mode:multiply}
      .product-card:hover .real-product-media img{transform:scale(1.045)}
      .real-product-media span{position:absolute;left:14px;bottom:12px;background:rgba(7,24,45,.9);color:white;border-radius:999px;padding:5px 9px;font-size:10px;font-weight:900;letter-spacing:.08em}
      @media(max-width:680px){.real-product-media img{width:92%;height:92%}}
    `;
    document.head.appendChild(st);
  }

  function patchHomeProducts(){
    const grid=document.getElementById('homeProducts');
    if(!grid||!window.FBStore)return;
    const d=FBStore.getData();
    const list=HOME_ORDER.map(id=>d.products.find(p=>p.id===id)).filter(Boolean);
    grid.innerHTML=list.map(homeProductCard).join('');
  }

  function run(){
    injectStyle();
    patchHomeProducts();
  }

  document.addEventListener('DOMContentLoaded',()=>{
    run();
    setTimeout(run,120);
  });
  if(document.readyState!=='loading')setTimeout(run,0);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,80));
})();