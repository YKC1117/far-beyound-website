(function(){
  if(!window.FBStore || window.__fbProductCatalogUpgrade)return;
  window.__fbProductCatalogUpgrade=true;

  const products=[
    {id:'software-bartender',category:'software',brand:'Seagull Scientific',family:'BarTender Labeling',type:'標籤設計與列印軟體',name:'BarTender',subtitle:'條碼、標籤與 RFID 設計列印平台',featured:false,status:'授權軟體',device:'software',intro:'BarTender 是企業級標籤設計與列印平台，可用於建立條碼、標籤與 RFID 標記，並依版本與導入需求串接資料來源、商務系統及列印工作流程。',highlights:['支援條碼、標籤與 RFID 標記的設計與列印作業','可連接資料來源與既有企業系統，降低重複輸入','可依使用規模規劃單機列印、多人使用與企業整合情境','適合製造、倉儲、物流、零售與需要標籤追蹤的作業環境'],specs:[['原廠','Seagull Scientific'],['產品類型','條碼 / 標籤 / RFID 設計與列印軟體'],['主要應用','標籤設計、資料串接、列印管理與自動化'],['導入方式','依授權版本、使用人數與系統整合需求規劃'],['適用場景','製造、倉儲、物流、零售與企業標示作業']],files:[]},
    {id:'software-codesoft',category:'software',brand:'TEKLYNX',family:'CODESOFT',type:'條碼 / RFID 標籤軟體',name:'CODESOFT',subtitle:'進階條碼與 RFID 標籤設計軟體',featured:false,status:'授權軟體',device:'software',intro:'CODESOFT 是 TEKLYNX 的進階標籤設計軟體，著重條碼與 RFID 標籤建立、資料庫連接及企業系統整合，適合需要較複雜資料與列印流程的使用環境。',highlights:['支援進階條碼與 RFID 標籤設計','可連接資料庫與 Unicode 資料來源，支援多語系標籤需求','可與 ERP、WMS 等企業系統整合並延伸自動化列印流程','提供 Form Designer、GridField 等進階功能，實際功能依授權版本而定'],specs:[['原廠','TEKLYNX'],['產品類型','條碼 / RFID 標籤設計軟體'],['主要功能','標籤設計、資料庫連接、企業整合與進階列印'],['作業系統','Windows 10 / 11；Windows Server 支援依版本'],['導入方式','依授權版本、列印站點與系統整合需求規劃']],files:[]},
    {id:'urovo-enterprise-mobile',category:'mobile',brand:'UROVO',family:'Enterprise Mobile Computers',type:'企業行動電腦',name:'UROVO 企業行動電腦',subtitle:'倉儲、物流與現場作業行動終端系列',featured:false,status:'系列產品',device:'mobile',intro:'UROVO 提供 Android 企業行動電腦與穿戴式終端系列，可整合一維 / 二維條碼掃描，適合倉儲盤點、揀貨、物流配送、製造追蹤與零售現場作業。實際規格依選用型號而異。',highlights:['Android 企業行動作業平台，提供手持式與穿戴式產品選擇','可整合一維 / 二維條碼掃描，掃描距離與引擎依型號配置','適合庫存盤點、入出庫、揀貨、製造追蹤與物流配送','可依螢幕、鍵盤、無線通訊、耐用等級與電池需求協助選型'],specs:[['品牌','UROVO'],['產品類型','企業行動電腦 / 手持式與穿戴式終端'],['作業系統','Android（版本依型號）'],['條碼讀取','一維 / 二維（依型號與掃描引擎）'],['應用','倉儲、製造、物流、零售與現場資料收集'],['選型重點','掃描距離、鍵盤 / 觸控、通訊、耐用需求與續航力']],files:[]}
  ];

  const data=FBStore.getData();
  products.forEach(p=>{const idx=data.products.findIndex(x=>x.id===p.id);if(idx>=0)data.products[idx]={...data.products[idx],...p};else data.products.push(p)});

  const requestedId=new URLSearchParams(location.search).get('id');
  const aliases={'legacy-bartender-5382ba34':'software-bartender','legacy-codesoft-71391e24':'software-codesoft'};
  if(aliases[requestedId]){
    const source=data.products.find(x=>x.id===aliases[requestedId]);
    if(source&&!data.products.some(x=>x.id===requestedId))data.products.push({...source,id:requestedId});
  }
  FBStore.saveData(data);

  const resources={
    'software-bartender':[['BarTender 原廠產品資訊','https://www.seagullscientific.com/'],['BarTender 原廠支援中心','https://support.seagullscientific.com/hc/en-us']],
    'legacy-bartender-5382ba34':[['BarTender 原廠產品資訊','https://www.seagullscientific.com/'],['BarTender 原廠支援中心','https://support.seagullscientific.com/hc/en-us']],
    'software-codesoft':[['CODESOFT 原廠產品資訊','https://www.teklynx.com/tw-APAC/products/label-design-solutions/codesoft'],['CODESOFT 文件與下載','https://www.teklynx.com/en/products/label-design-solutions/codesoft']],
    'legacy-codesoft-71391e24':[['CODESOFT 原廠產品資訊','https://www.teklynx.com/tw-APAC/products/label-design-solutions/codesoft'],['CODESOFT 文件與下載','https://www.teklynx.com/en/products/label-design-solutions/codesoft']],
    'urovo-enterprise-mobile':[['UROVO 行動電腦產品系列','https://en.urovo.com/products/mobile/'],['UROVO 產品中心','https://en.urovo.com/Mobile/Products/index.html']]
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