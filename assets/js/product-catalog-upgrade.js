(function(){
  if(!window.FBStore || window.__fbProductCatalogUpgrade)return;
  window.__fbProductCatalogUpgrade=true;

  const aliases={'legacy-bartender-5382ba34':'software-bartender','legacy-codesoft-71391e24':'software-codesoft','urovo-enterprise-mobile':'urovo-dt66-ct48c-dt50-dt40-rt40s'};
  const requestedId=new URLSearchParams(location.search).get('id');
  if(aliases[requestedId]){
    const u=new URL(location.href);u.searchParams.set('id',aliases[requestedId]);history.replaceState(null,'',u.pathname+u.search+u.hash);
  }

  const products=[
    {id:'software-bartender',category:'software',brand:'BarTender',family:'BarTender Labeling',type:'標籤設計與列印軟體',name:'BarTender',subtitle:'條碼、標籤與 RFID 設計、列印及整合平台',featured:false,status:'授權軟體',device:'software',image:'assets/images/products/software-bartender.svg',intro:'BarTender 是企業用標籤設計與列印平台，可建立條碼、標籤與 RFID 標記，並依授權版本連接資料來源、建立列印表單、遠端列印與自動化整合。適合從單機標籤製作到製造、倉儲與企業系統串接等不同規模需求。',highlights:['所見即所得的標籤設計介面，可製作條碼、文字、圖形與 RFID 標記','可串接 Excel、資料庫及企業資料來源，減少人工重複輸入','依版本支援按需列印、遠端列印、REST API、File Drop 與自動化工作流程','提供 Starter、Professional、Automation、Enterprise 等不同導入層級，可依現場需求協助選型'],specs:[['原廠','BarTender / Seagull Software'],['產品類型','條碼、標籤與 RFID 設計列印平台'],['主要功能','標籤設計、資料串接、列印管理、表單與自動化整合'],['常見版本','Starter / Professional / Automation / Enterprise'],['適用場景','製造、倉儲、物流、零售、資產與產品標示'],['導入方式','依工作站數、印表機數、資料來源及整合需求規劃']],files:[]},
    {id:'software-codesoft',category:'software',brand:'TEKLYNX',family:'CODESOFT',type:'條碼 / RFID 標籤軟體',name:'CODESOFT',subtitle:'進階條碼、RFID 與企業標籤設計軟體',featured:false,status:'授權軟體',device:'software',image:'assets/images/products/software-codesoft.svg',intro:'CODESOFT 是 TEKLYNX 的進階標籤設計軟體，適合需要條碼、RFID、資料庫連接、多語系及企業系統整合的標籤作業。可配合 ERP、WMS 等既有系統，延伸到較複雜的資料與列印流程。',highlights:['支援進階條碼與 RFID 標籤設計，原廠提供超過 100 種條碼符號支援','可連接資料庫與 Unicode 資料來源，適合多語系標籤與跨地區應用','可與 ERP、WMS 等企業系統整合，並搭配 TEKLYNX 其他方案延伸自動化與追溯','提供 Form Designer、GridField、變數資料等進階功能；實際功能依授權版本而定'],specs:[['原廠','TEKLYNX'],['產品類型','條碼 / RFID 標籤軟體'],['主要功能','標籤設計、資料庫連接、多語系、企業整合與進階列印'],['條碼支援','100+ 種條碼符號（依原廠目前版本）'],['企業整合','可配合 ERP、WMS 與 TEKLYNX 自動化方案'],['導入方式','依授權版本、列印站點、資料來源與系統整合需求規劃']],files:[]},
    {id:'urovo-dt66-ct48c-dt50-dt40-rt40s',category:'mobile',brand:'UROVO',family:'Enterprise Mobile Computers',type:'企業行動電腦',name:'UROVO 企業行動電腦',subtitle:'倉儲、物流、製造與現場作業行動終端系列',featured:false,status:'系列產品',device:'mobile',image:'assets/images/products/urovo-enterprise-mobile.svg',intro:'UROVO 提供 Android 企業行動電腦與穿戴式終端，可整合一維 / 二維條碼掃描，適合倉儲盤點、入出庫、揀貨、物流配送、製造追蹤與零售現場作業。產品包含 DT66、CT48C、DT50、DT40、RT40S 等不同定位機型，實際規格依型號與配置而異。',highlights:['Android 企業行動作業平台，提供手持式與穿戴式產品選擇','可整合一維 / 二維條碼掃描，部分機型提供長距離或特殊環境掃描配置','可依觸控 / 鍵盤、5G / Wi-Fi、耐用等級、電池續航與作業環境協助選型','適合庫存盤點、入出庫、揀貨、製造追蹤、物流配送與零售資料收集'],specs:[['品牌','UROVO'],['產品類型','企業行動電腦 / 手持式與穿戴式終端'],['代表系列','DT66 / CT48C / DT50 / DT40 / RT40S'],['作業系統','Android（版本依型號）'],['條碼讀取','一維 / 二維；掃描引擎與距離依型號配置'],['應用','倉儲、製造、物流、零售與現場資料收集'],['選型重點','掃描距離、鍵盤 / 觸控、無線通訊、耐用需求與續航力']],files:[]}
  ];

  const data=FBStore.getData();
  products.forEach(p=>{const idx=data.products.findIndex(x=>x.id===p.id);if(idx>=0)data.products[idx]={...data.products[idx],...p};else data.products.push(p)});
  data.products=data.products.filter(p=>!Object.keys(aliases).includes(String(p.id||'')));
  FBStore.saveData(data);

  const resources={
    'software-bartender':[['BarTender 原廠產品資訊','https://www.bartendersoftware.com/tw/product'],['BarTender 版本與功能','https://www.bartendersoftware.com/tw/product/pricing']],
    'software-codesoft':[['CODESOFT 原廠產品資訊','https://www.teklynx.com/products/label-design-solutions/codesoft'],['TEKLYNX 標籤設計方案','https://www.teklynx.com/en/products/label-design-solutions']],
    'urovo-dt66-ct48c-dt50-dt40-rt40s':[['UROVO 行動電腦產品系列','https://en.urovo.com/products/mobile/'],['UROVO 產品中心','https://en.urovo.com/Products']]
  };

  function enhanceResources(){
    if(document.body.dataset.page!=='product')return;
    const id=new URLSearchParams(location.search).get('id');const list=resources[id];if(!list)return;
    const box=document.getElementById('productFiles');const block=document.getElementById('downloads');if(!box||!block)return;
    const title=block.querySelector('h2');if(title)title.textContent='原廠資源';
    box.innerHTML=list.map(([label,url])=>`<a class="download-row" href="${url}" target="_blank" rel="noopener"><span class="download-icon">↗</span><span><small>OFFICIAL RESOURCE</small><b>${label}</b></span><span class="download-cta">前往原廠</span></a>`).join('');
    const actions=document.querySelector('.product-actions');if(actions&&!actions.querySelector('.fb-official-resource')){const a=document.createElement('a');a.className='btn btn-secondary fb-official-resource';a.href='#downloads';a.textContent='查看原廠資源';actions.appendChild(a)}
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(enhanceResources,50),{once:true});if(document.readyState!=='loading')setTimeout(enhanceResources,80);
})();