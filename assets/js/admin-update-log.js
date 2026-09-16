(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminUpdateLog)return;
  window.__fbAdminUpdateLog=true;

  const $=(s,p=document)=>p.querySelector(s);
  const UPDATE_INFO={
    updatedAt:'2026/09/16 14:14',
    label:'後台更新',
    entries:[
      {time:'2026/09/16 14:14',type:'介面一致性',text:'管理總覽、SEO／Ads／AI 成效中心、產品管理與網站詢問納入同一套後台字級與間距規格；同步提高桌機與手機的小字、標籤、表格與操作按鈕可讀性。'},
      {time:'2026/09/16 14:01',type:'介面一致性',text:'新增後台 UI Design System，統一主標題、區塊標題、說明文字、按鈕、表格、狀態標籤與系統管理卡片的字級與間距。'},
      {time:'2026/09/16 14:01',type:'系統安全',text:'重整系統安全中心：四張安全基準卡片改為數值＋標籤層級，狀態說明改成可掃讀重點，資安政策、登入活動與操作稽核同步整理桌機與手機版。'},
      {time:'2026/09/16 14:01',type:'RWD',text:'系統管理摘要卡桌機四欄、平板兩欄、手機單欄／雙欄依寬度切換；手機表單字級提升避免 iPhone 聚焦時自動放大。'},
      {time:'2026/09/16 09:47',type:'產品管理',text:'新增「匯出已選產品 CSV」，沿用產品批次勾選狀態，只匯出實際勾選的產品。'},
      {time:'2026/09/16 09:47',type:'驗收／版本',text:'後台 QA 加入桌機與 390px 手機的已選產品匯出工具檢查，入口與動態模組統一升級。'},
      {time:'2026/09/15 23:54',type:'網站詢問',text:'新增依目前搜尋與篩選結果匯出詢問 CSV。'},
      {time:'2026/09/15 23:54',type:'產品管理',text:'新增依目前產品搜尋與篩選結果匯出產品 CSV。'},
      {time:'2026/09/15 20:16',type:'手機後台',text:'新增手機專用管理列與抽屜式功能選單，產品與詢問管理改為手機友善版面。'},
      {time:'2026/09/15 19:45',type:'介面強化',text:'首頁、網站內容、系統管理與 SEO／Ads／AI 成效中心改為單一工作區＋分頁。'},
      {time:'2026/09/15 17:13',type:'載入修正',text:'修正單一工作區與成效中心模組檔案存在但入口未真正載入的問題。'}
    ]
  };

  window.FBAdminUpdateInfo=Object.freeze({
    updatedAt:UPDATE_INFO.updatedAt,
    label:UPDATE_INFO.label,
    entries:UPDATE_INFO.entries.map(x=>Object.freeze({...x}))
  });

  function style(){
    if($('#adminUpdateLogStyle'))return;
    const s=document.createElement('style');
    s.id='adminUpdateLogStyle';
    s.textContent=`
      #adminUpdateLog{margin:0 0 16px;border:1px solid #dfe8ec;border-radius:14px;background:#fff;overflow:hidden}
      #adminUpdateLog summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;cursor:pointer;list-style:none;color:#315366;font-size:14px;font-weight:800}
      #adminUpdateLog summary::-webkit-details-marker{display:none}
      #adminUpdateLog summary small{color:#718692;font-size:12px;font-weight:650}
      #adminUpdateLog summary:after{content:'＋';font-size:18px;color:#68808d}
      #adminUpdateLog[open] summary:after{content:'−'}
      .aul-body{border-top:1px solid #edf2f4;padding:4px 16px 10px}
      .aul-row{display:grid;grid-template-columns:132px 92px 1fr;gap:12px;padding:11px 0;border-bottom:1px solid #f0f3f5;align-items:start}
      .aul-row:last-child{border-bottom:0}
      .aul-time{color:#70838e;font-size:12px;line-height:1.5}
      .aul-type{display:inline-flex;justify-content:center;padding:4px 7px;border-radius:999px;background:#eef5f7;color:#3d6879;font-size:11px;font-weight:800;line-height:1.4}
      .aul-text{color:#4d6674;font-size:13px;line-height:1.6}
      @media(max-width:700px){#adminUpdateLog summary{align-items:flex-start;flex-direction:column}.aul-row{grid-template-columns:1fr;gap:5px}.aul-type{justify-self:start}}
    `;
    document.head.appendChild(s);
  }

  function build(){
    if($('#adminUpdateLog'))return;
    const anchor=$('#adminFriendlyStatus')||$('#adminDashboard')||$('.admin-usage-note');
    if(!anchor)return;
    const box=document.createElement('details');
    box.id='adminUpdateLog';
    box.innerHTML=`<summary><span>後台更新紀錄</span><small>最近更新：${UPDATE_INFO.updatedAt}</small></summary><div class="aul-body">${UPDATE_INFO.entries.map(x=>`<div class="aul-row"><span class="aul-time">${x.time}</span><span class="aul-type">${x.type}</span><span class="aul-text">${x.text}</span></div>`).join('')}</div>`;
    anchor.insertAdjacentElement('afterend',box);
  }

  function run(){style();build()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});
  else run();
  setTimeout(run,500);
})();
