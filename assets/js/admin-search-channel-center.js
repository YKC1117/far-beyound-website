(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbSearchChannelCenter)return;
  window.__fbSearchChannelCenter=true;

  const $=(s,p=document)=>p.querySelector(s);

  function style(){
    if($('#adminSearchChannelCenterStyle'))return;
    const s=document.createElement('style');
    s.id='adminSearchChannelCenterStyle';
    s.textContent=`
      #adminSearchChannelCenter{margin:14px 18px 18px;padding:16px;border:1px solid #dbe7ec;border-radius:14px;background:#fff}
      .scc-head{display:flex;justify-content:space-between;gap:14px;align-items:flex-start;margin-bottom:12px}
      .scc-head h3{margin:2px 0 4px;color:#294b5d;font-size:17px}.scc-head p{margin:0;color:#6f838e;font-size:10px;line-height:1.6}
      .scc-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
      .scc-card{border:1px solid #e2eaee;border-radius:12px;padding:13px;background:#fafcfd}.scc-card h4{margin:0 0 7px;color:#294b5d;font-size:13px}.scc-card p{margin:0 0 9px;color:#5e7480;font-size:10px;line-height:1.65}.scc-card ul{margin:0;padding-left:17px;color:#526b78;font-size:9px;line-height:1.7}
      .scc-status{display:inline-block;margin-bottom:8px;padding:4px 7px;border-radius:999px;font-size:8px;font-weight:700}.scc-status.live{background:#eaf6ef;color:#28704b}.scc-status.wait{background:#fff4da;color:#825f15}.scc-status.own{background:#eef3fb;color:#355f8d}
      .scc-table-wrap{margin-top:14px;overflow:auto}.scc-table{width:100%;border-collapse:collapse;font-size:9px;min-width:760px}.scc-table th,.scc-table td{padding:9px 8px;border-bottom:1px solid #edf2f4;text-align:left;vertical-align:top}.scc-table th{background:#f8fafb;color:#627985}.scc-table td{color:#425d6b;line-height:1.55}
      .scc-note{margin-top:12px;padding:11px 12px;border-radius:10px;background:#f6f9fa;color:#5d737e;font-size:9px;line-height:1.7}
      @media(max-width:980px){.scc-grid{grid-template-columns:1fr 1fr}.scc-grid .scc-card:last-child{grid-column:1/-1}}
      @media(max-width:620px){#adminSearchChannelCenter{margin-left:12px;margin-right:12px;padding:12px}.scc-head{display:block}.scc-grid{grid-template-columns:1fr}.scc-grid .scc-card:last-child{grid-column:auto}}
    `;
    document.head.appendChild(s);
  }

  function build(){
    const analytics=$('#adminAnalytics');
    if(!analytics||$('#adminSearchChannelCenter'))return false;
    style();
    const box=document.createElement('section');
    box.id='adminSearchChannelCenter';
    box.innerHTML=`
      <div class="scc-head">
        <div><span class="eyebrow">SEARCH PERFORMANCE CENTER</span><h3>萬里資訊｜搜尋成效三軌中心</h3><p>把自然搜尋 SEO、Google Ads 與 AI SEO 分開判讀，再用同一個後台整合管理，避免把付費廣告和自然排名混在一起。</p></div>
      </div>
      <div class="scc-grid">
        <article class="scc-card"><span class="scc-status wait">待接 Google 官方資料</span><h4>Google 自然搜尋 SEO</h4><p>負責回答「沒付廣告費時，客戶在 Google 搜尋能不能找到我們」。</p><ul><li>正式來源：Google Search Console</li><li>指標：搜尋字詞、曝光、點擊、CTR、平均排名</li><li>目前狀態：後台架構已預留，但尚未串公司 Search Console</li></ul></article>
        <article class="scc-card"><span class="scc-status wait">待接 Google Ads</span><h4>Google Ads 搜尋廣告</h4><p>負責回答「公司花的廣告費，有沒有帶來有效點擊與轉換」。</p><ul><li>正式來源：Google Ads</li><li>指標：費用、曝光、點擊、CTR、CPC、轉換、轉換成本、轉換率</li><li>目前狀態：已確認現有 Looker Studio 報表屬 Google Ads；本站尚未自動串接</li></ul></article>
        <article class="scc-card"><span class="scc-status live">站內統計已啟用</span><h4>AI SEO／AI 導流</h4><p>負責回答「哪些 AI 平台真的把使用者帶進萬里資訊，以及哪些內容值得補強」。</p><ul><li>來源：網站 Referrer＋Supabase 分析後端</li><li>平台：ChatGPT、Gemini、Copilot、Perplexity、Claude、Grok 等</li><li>限制：導流不等於 AI 回答中的提及／引用次數</li></ul></article>
      </div>
      <div class="scc-table-wrap"><table class="scc-table"><thead><tr><th>系統</th><th>真正資料來源</th><th>公司自己能掌握什麼</th><th>不能亂推估的數字</th><th>後台下一步</th></tr></thead><tbody>
        <tr><td><b>自然搜尋 SEO</b></td><td>Google Search Console</td><td>頁面 SEO、產品內容、Schema、關鍵字機會、內容改善</td><td>曝光、CTR、平均排名</td><td>正式取得公司 Search Console 權限後串接</td></tr>
        <tr><td><b>Google Ads</b></td><td>Google Ads</td><td>廣告成效彙整、低效關鍵字提醒、轉換成本判讀</td><td>廣告費、CPC、轉換</td><td>取得 Google Ads 唯讀資料權限後接入</td></tr>
        <tr><td><b>AI SEO</b></td><td>網站 Referrer／站內資料；未來可擴充外部 AI 監測</td><td>AI 導流分類、熱門產品、AI 友善度、內容優先建議</td><td>AI 回答提及／引用次數</td><td>持續累積真實導流，另外建立 AI 能見度監測機制</td></tr>
      </tbody></table></div>
      <div class="scc-note"><b>資料原則：</b>三種資料來源分開保存、分開解讀。Google Ads 的「搜尋關鍵字」不等於 SEO 自然搜尋排名；Search Console 的自然搜尋數據也不等於廣告成效；AI 導流則不等於 AI 回答提及次數。後台只顯示有正式來源或可驗證的數字。</div>`;
    const status=$('#analyticsStatus');
    status?.after(box);
    return true;
  }

  const boot=()=>{if(!build())setTimeout(boot,150)};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();
