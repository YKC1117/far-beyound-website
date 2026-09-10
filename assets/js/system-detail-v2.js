(function(){
  const panels={
    sfis:{code:'SFIS',sub:'SHOP FLOOR INFORMATION SYSTEM',items:[['01','生產追溯','工單、工序、材料與製程資料'],['02','品質管控','製程防錯與檢驗資訊'],['03','即時資訊','現場進度與狀態快速掌握'],['04','設備整合','與 ERP、現場設備及資料介接']]},
    wms:{code:'WMS',sub:'WAREHOUSE MANAGEMENT SYSTEM',items:[['01','入出庫管理','收料、入庫與出貨作業'],['02','儲位管理','PDA 行動作業與儲位管理'],['03','動態盤點','庫存盤點與料帳同步'],['04','理貨配料','先進先出、配料與出貨流程']]},
    smt:{code:'SMT',sub:'MATERIAL VERIFICATION',items:[['01','發料驗證','降低工單發料錯誤'],['02','FEEDER 管理','綁定、使用與保養紀錄'],['03','上料防錯','料站與料盤刷碼驗證'],['04','生產追溯','保留上料與生產資訊']]},
    barcode:{code:'BARCODE',sub:'BARCODE INTEGRATION',items:[['01','資料識別','條碼規則與現場資料收集'],['02','設備串接','列印、掃描與行動設備整合'],['03','流程驗證','降低人工輸入與作業錯誤'],['04','系統介接','依企業既有流程進行資料串接']]}
  };
  function render(){
    document.querySelectorAll('.solution-detail').forEach(section=>{
      const key=section.id;
      const p=panels[key];
      const visual=section.querySelector('.solution-visual');
      if(!p||!visual||visual.querySelector('.system-panel'))return;
      visual.innerHTML=`<div class="system-panel"><div class="system-panel-head"><strong class="system-panel-code">${p.code}</strong><small>${p.sub}</small></div><div class="system-panel-list">${p.items.map(([n,t,d])=>`<div class="system-panel-item"><em>${n}</em><div><b>${t}</b><span>${d}</span></div></div>`).join('')}</div></div>`;
    });
  }
  document.addEventListener('DOMContentLoaded',()=>{render();setTimeout(render,100)});
  if(document.readyState!=='loading')setTimeout(render,0);
})();