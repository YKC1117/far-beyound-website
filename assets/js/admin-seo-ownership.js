(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbSeoOwnership)return;
  window.__fbSeoOwnership=true;

  const $=(s,p=document)=>p.querySelector(s);

  function addStyle(){
    if($('#adminSeoOwnershipStyle'))return;
    const s=document.createElement('style');
    s.id='adminSeoOwnershipStyle';
    s.textContent=`
      #adminSeoOwnership{margin:14px 18px 18px;border:1px solid #dfe8ec;border-radius:14px;background:#fff;overflow:hidden}
      .aso-head{padding:15px 16px;background:#f7fafb;border-bottom:1px solid #e4ecef}.aso-head h3{margin:0 0 4px;color:#294b5d;font-size:16px}.aso-head p{margin:0;color:#6f838e;font-size:10px;line-height:1.6}
      .aso-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;padding:14px 16px}.aso-card{padding:12px;border:1px solid #e3ebee;border-radius:11px;background:#fbfcfd}.aso-card b{display:block;color:#284b5d;font-size:12px;margin-bottom:6px}.aso-card ul{margin:0;padding-left:17px;color:#5d7480;font-size:9px;line-height:1.7}
      .aso-status{margin:0 16px 14px;padding:12px;border-radius:10px;background:#f5f8fa;color:#526b78;font-size:10px;line-height:1.7}.aso-status strong{color:#2e5568}.aso-note{margin:0 16px 16px;padding:10px 12px;border-left:4px solid #3c7ea0;background:#f4f9fb;color:#526b78;font-size:9px;line-height:1.7}
      @media(max-width:980px){.aso-grid{grid-template-columns:1fr 1fr}}@media(max-width:620px){#adminSeoOwnership{margin-left:12px;margin-right:12px}.aso-grid{grid-template-columns:1fr;padding:12px}.aso-status,.aso-note{margin-left:12px;margin-right:12px}}
    `;
    document.head.appendChild(s);
  }

  function build(){
    const host=$('#adminSearchAiInsights')||$('#adminAnalytics');
    if(!host||$('#adminSeoOwnership'))return false;
    addStyle();
    const panel=document.createElement('section');
    panel.id='adminSeoOwnership';
    panel.innerHTML=`
      <div class="aso-head">
        <span class="eyebrow">IN-HOUSE SEARCH GROWTH</span>
        <h3>萬里資訊自有 SEO＋AI SEO 營運架構</h3>
        <p>目標不是把 SEO 外包掉，而是把資料、規則、報表與優化流程留在公司自己的網站後台。</p>
      </div>
      <div class="aso-grid">
        <div class="aso-card"><b>公司自己掌握</b><ul><li>頁面 SEO Title / Description</li><li>產品、品牌、案例、新聞內容</li><li>Schema / Canonical / Index 控制</li><li>站內瀏覽與來源統計</li><li>AI 品牌導流分類</li><li>期間比較、報表與改善建議</li></ul></div>
        <div class="aso-card"><b>接官方資料，不等於委外</b><ul><li>Google Search Console：官方關鍵字、曝光、CTR、排名</li><li>Google Analytics：若公司決定啟用，可補整站行為數據</li><li>各 AI 平台：能辨識 Referrer 就納入自有統計</li><li>資料仍進公司自己的後台報表</li></ul></div>
        <div class="aso-card"><b>外部公司只屬可選</b><ul><li>大量內容代寫或廣告投放</li><li>特殊公關／媒體曝光</li><li>需要人工外部連結拓展時</li><li>並非 SEO / AI SEO 基本運作的必要條件</li></ul></div>
      </div>
      <div class="aso-status"><strong>目前狀態：</strong>站內 SEO 管理、結構化資料、匿名產品瀏覽、來源統計、AI 品牌導流與期間報表已經可以由公司自主管理。Google 關鍵字的正式曝光、點擊、CTR、平均排名仍需公司授權 Search Console；這是使用 Google 官方資料，不是委託 SEO 公司。</div>
      <div class="aso-note"><b>資料原則：</b>只顯示能說明來源的真實資料。沒有 Search Console 就不假造 Google 排名；無法量測 AI 回答中的「提及次數」就不當成真實 KPI。後續若增加 AI 內容健檢、FAQ 建議、產品頁優化建議，也會沿用同一原則。</div>
    `;
    host.after(panel);
    return true;
  }

  function boot(){if(!build())setTimeout(boot,120)}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();
