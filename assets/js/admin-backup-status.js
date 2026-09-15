(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminBackupStatus)return;
  window.__fbAdminBackupStatus=true;

  const $=(s,p=document)=>p.querySelector(s);
  const BACKUPS={
    frontend:{label:'前台穩定基準',ref:'e2feba253ec741c22412c4ff78a41577e6a3fbed'},
    backend:{label:'後台施工備份',ref:'backup/admin-20260915-1605-update-log'}
  };

  function style(){
    if($('#adminBackupStatusStyle'))return;
    const s=document.createElement('style');
    s.id='adminBackupStatusStyle';
    s.textContent=`
      #adminBackupStatus{margin:0 0 16px;padding:11px 13px;border:1px solid #dfe8ec;border-radius:12px;background:#f9fbfc;display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}
      .abs-copy{display:grid;gap:2px}.abs-copy b{color:#315366;font-size:11px}.abs-copy span{color:#738793;font-size:9px;line-height:1.45}
      .abs-refs{display:flex;gap:7px;flex-wrap:wrap}.abs-pill{padding:5px 8px;border-radius:999px;background:#fff;border:1px solid #dbe6eb;color:#506b79;font-size:8px;font-weight:800}
      @media(max-width:700px){#adminBackupStatus{align-items:flex-start;flex-direction:column}.abs-refs{width:100%}.abs-pill{max-width:100%;overflow:hidden;text-overflow:ellipsis}}
    `;
    document.head.appendChild(s);
  }

  function build(){
    if($('#adminBackupStatus'))return;
    const anchor=$('#adminUpdateLog')||$('#adminFriendlyStatus')||$('#adminDashboard');
    if(!anchor)return;
    const box=document.createElement('div');
    box.id='adminBackupStatus';
    box.innerHTML=`<div class="abs-copy"><b>備份／救援狀態</b><span>前台穩定版與後台施工版分開保留；後續若有異常可依對應節點回復。</span></div><div class="abs-refs"><span class="abs-pill">${BACKUPS.frontend.label}：${BACKUPS.frontend.ref.slice(0,8)}</span><span class="abs-pill">${BACKUPS.backend.label}：${BACKUPS.backend.ref}</span></div>`;
    anchor.insertAdjacentElement('afterend',box);
  }

  function run(){style();build()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  setTimeout(run,500);
})();
