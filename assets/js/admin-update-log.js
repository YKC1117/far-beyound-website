(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminUpdateLog)return;
  window.__fbAdminUpdateLog=true;

  const $=(s,p=document)=>p.querySelector(s);

  // 後台更新時間與更新紀錄只在這裡維護，避免不同模組各自寫時間造成不同步。
  const UPDATE_INFO={
    updatedAt:'2026/09/15 16:13',
    label:'後台更新',
    entries:[
      {time:'2026/09/15 16:13',type:'更新機制',text:'後台更新時間改為單一資料來源；往後上方時間與更新紀錄會一起連動，避免不同模組顯示不同時間。'},
      {time:'2026/09/15 16:05',type:'後台功能',text:'建立後台更新紀錄機制；上方時間改為「後台更新」，往後介面、功能、分析、資料管理等後台異動都統一記錄。'},
      {time:'2026/09/15 16:02',type:'操作效率',text:'加入後台快速搜尋／跳轉，支援 Ctrl + K；並正式載入操作狀態、成效中心收合與快速搜尋模組。'},
      {time:'2026/09/15 15:54',type:'成效中心',text:'SEO／Google Ads／AI SEO 成效中心加入主管模式、全部展開與收合細節；低頻資料預設收合。'},
      {time:'2026/09/15 15:51',type:'操作介面',text:'新增後台操作狀態與工作區快速控制，顯示未儲存、同步、已發布與失敗狀態。'},
      {time:'2026/09/15 15:33',type:'版面排序',text:'常用功能重新排序，SEO／Ads／AI 成效優先；低頻管理區預設收合。'},
      {time:'2026/09/15 15:29',type:'搜尋成效',text:'建立 Google 自然搜尋 SEO、Google Ads、AI SEO 三軌成效中心，三種資料來源分開判讀。'}
    ]
  };

  // 其他後台模組若需要顯示更新時間，一律讀這份資料。
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
      .aul-row:last-child{border-bottom:0}
      .aul-time{color:#70838e;font-size:9px}
      .aul-type{display:inline-flex;justify-content:center;padding:3px 6px;border-radius:999px;background:#eef5f7;color:#3d6879;font-size:8px;font-weight:900}
      .aul-text{color:#4d6674;font-size:10px;line-height:1.55}
      @media(max-width:700px){.aul-row{grid-template-columns:1fr;gap:5px}.aul-type{justify-self:start}}
    `;
    document.head.appendChild(s);
  }

  function stamp(){
    const v=$('.admin-version-note');
    if(!v)return;
    v.textContent=`${UPDATE_INFO.label}：${UPDATE_INFO.updatedAt}`;
    v.title='此時間代表後台最近一次功能、介面、分析、資料管理或系統設定更新，不是正式網站發布時間。';
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

  function run(){style();stamp();build()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  setTimeout(run,500);
})();
