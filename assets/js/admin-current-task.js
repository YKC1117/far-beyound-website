(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminCurrentTask)return;
  window.__fbAdminCurrentTask=true;

  const $=(s,p=document)=>p.querySelector(s);

  function style(){
    if($('#adminCurrentTaskStyle'))return;
    const s=document.createElement('style');
    s.id='adminCurrentTaskStyle';
    s.textContent=`
      #adminCurrentTask{margin:0 0 16px;padding:12px 14px;border:1px solid #dfe8ec;border-radius:12px;background:#fff;display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center}
      .act-badge{display:inline-flex;align-items:center;justify-content:center;min-width:42px;height:28px;padding:0 8px;border-radius:999px;background:#eaf6f8;color:#1f7185;font-size:9px;font-weight:900}
      .act-copy{min-width:0}.act-copy b{display:block;color:#315366;font-size:11px}.act-copy span{display:block;margin-top:3px;color:#748793;font-size:9px;line-height:1.5}
      .act-link{white-space:nowrap;text-decoration:none;color:#315f73;font-size:9px;font-weight:900}
      @media(max-width:700px){#adminCurrentTask{grid-template-columns:auto 1fr}.act-link{grid-column:1/-1;padding-left:54px}}
    `;
    document.head.appendChild(s);
  }

  function build(){
    if($('#adminCurrentTask'))return;
    const anchor=$('#adminBackupStatus')||$('#adminUpdateLog')||$('#adminFriendlyStatus')||$('#adminDashboard');
    if(!anchor)return;
    const box=document.createElement('div');
    box.id='adminCurrentTask';
    box.innerHTML=`<span class="act-badge">進行中</span><div class="act-copy"><b>目前施工重點：SEO／Google Ads／AI SEO 成效中心＋後台操作整理</b><span>先把常用資訊、更新紀錄、備份與成效入口整理好；Google 官方資料串接等公司授權後再接，不先填假資料。</span></div><a class="act-link" href="#adminAnalytics">前往成效中心 →</a>`;
    anchor.insertAdjacentElement('afterend',box);
  }

  function run(){style();build()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  setTimeout(run,500);
})();
