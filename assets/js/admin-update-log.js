(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminUpdateLog)return;
  window.__fbAdminUpdateLog=true;

  const $=(s,p=document)=>p.querySelector(s);

  const UPDATE_INFO={
    updatedAt:'2026/09/15 16:55',
    label:'後台更新',
    entries:[
      {time:'2026/09/15 16:55',type:'介面簡化',text:'左側導覽改成「常用／網站內容／系統管理」三大分類；右側維持單一工作區。SEO／Ads／AI 成效中心改為分頁，一次只顯示一類資料。'},
      {time:'2026/09/15 16:55',type:'更新時間',text:'修正後台更新時間跳動：畫面時間改由 admin-build.json 單一來源寫入；Dashboard 與更新紀錄不再重複覆寫時間。'},
      {time:'2026/09/15 16:46',type:'版本／快取',text:'建立後台統一 build 版本與自動快取檢查：後台入口、主要管理 JS／CSS 與動態 helper 改用同一版號；偵測新部署時自動用新 build 重新載入。'},
      {time:'2026/09/15 16:40',type:'載入修正',text:'確認右側單一工作區模組已寫入但 admin.html 仍使用舊版快取參數，已刷新入口版本並直接修正後台 Logo 連結。'},
      {time:'2026/09/15 16:31',type:'操作版型',text:'後台改為「左側選單＋右側單一工作區」模式：點選 SEO、產品、詢問、首頁、據點等功能時，右側只顯示該管理區。'},
      {time:'2026/09/15 16:23',type:'操作導覽',text:'左側後台選單新增目前所在區塊高亮提示，並加入右下角回到頂端按鈕。'},
      {time:'2026/09/15 16:22',type:'施工狀態',text:'管理總覽新增目前施工重點卡片。'},
      {time:'2026/09/15 16:20',type:'備份／救援',text:'後台新增精簡備份／救援狀態。'},
      {time:'2026/09/15 16:18',type:'維護制度',text:'新增 Repository 永久後台更新紀錄 ADMIN-CHANGELOG.md。'},
      {time:'2026/09/15 16:13',type:'更新機制',text:'後台更新時間改為單一資料來源的方向，避免不同模組顯示不同時間。'},
      {time:'2026/09/15 16:05',type:'後台功能',text:'建立後台更新紀錄機制。'},
      {time:'2026/09/15 16:02',type:'操作效率',text:'加入後台快速搜尋／跳轉，支援 Ctrl + K。'},
      {time:'2026/09/15 15:54',type:'成效中心',text:'SEO／Google Ads／AI SEO 成效中心加入主管模式與細節收合。'},
      {time:'2026/09/15 15:51',type:'操作介面',text:'新增後台操作狀態與工作區快速控制。'},
      {time:'2026/09/15 15:33',type:'版面排序',text:'常用功能重新排序，SEO／Ads／AI 成效優先。'},
      {time:'2026/09/15 15:29',type:'搜尋成效',text:'建立 Google 自然搜尋 SEO、Google Ads、AI SEO 三軌成效中心。'}
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
      #adminUpdateLog{margin:0 0 16px;border:1px solid #dfe8ec;border-radius:13px;background:#fff;overflow:hidden}
      #adminUpdateLog summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;cursor:pointer;list-style:none;color:#315366;font-size:11px;font-weight:900}
      #adminUpdateLog summary::-webkit-details-marker{display:none}
      #adminUpdateLog summary small{color:#7b8e98;font-size:9px;font-weight:700}
      #adminUpdateLog summary:after{content:'＋';font-size:15px;color:#68808d}
      #adminUpdateLog[open] summary:after{content:'−'}
      .aul-body{border-top:1px solid #edf2f4;padding:4px 14px 10px}
      .aul-row{display:grid;grid-template-columns:125px 78px 1fr;gap:10px;padding:9px 0;border-bottom:1px solid #f0f3f5;align-items:start}
      .aul-row:last-child{border-bottom:0}.aul-time{color:#70838e;font-size:9px}.aul-type{display:inline-flex;justify-content:center;padding:3px 6px;border-radius:999px;background:#eef5f7;color:#3d6879;font-size:8px;font-weight:900}.aul-text{color:#4d6674;font-size:10px;line-height:1.55}
      @media(max-width:700px){.aul-row{grid-template-columns:1fr;gap:5px}.aul-type{justify-self:start}}
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
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  setTimeout(run,500);
})();