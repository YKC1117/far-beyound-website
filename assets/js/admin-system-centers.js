(()=>{
  'use strict';
  if(document.body?.dataset?.page!=='admin'||window.__fbAdminSystemCenters)return;
  window.__fbAdminSystemCenters=true;
  const modules=[
    'admin-url-validation.js','admin-self-check.js','admin-front-features.js','admin-brand-manager.js','admin-location-manager.js',
    'admin-audit.js','admin-seo-center.js','admin-account-security-ui.js','admin-users-ui.js','admin-security-policy-ui.js',
    'admin-security-tools.js','admin-security-clarity.js','admin-transition-status.js','admin-permissions-ui.js'
  ];
  function ensureAccessBody(){
    const box=document.getElementById('adminAccessCenter');
    if(!box)return false;
    let body=box.querySelector('.admin-system-body');
    if(!body){body=document.createElement('div');body.className='admin-system-body';box.appendChild(body)}
    return true;
  }
  function ensureCenter(id,title,desc,stats){
    if(document.getElementById(id))return true;
    const main=document.querySelector('.admin-main');
    if(!main)return false;
    const s=document.createElement('section');s.id=id;s.className='admin-panel admin-system-center';
    const statHtml=(stats||[]).map(x=>`<div class="admin-stat"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('');
    s.innerHTML=`<div class="admin-panel-head"><div><span class="eyebrow">${id==='adminSecurityCenter'?'SECURITY CENTER':'BACKUP CENTER'}</span><h2>${title}</h2><p>${desc}</p></div><span class="admin-status-pill">已建立</span></div>${statHtml?`<div class="admin-stats">${statHtml}</div>`:''}<div class="admin-system-body"></div>`;
    const after=document.getElementById(id==='adminSecurityCenter'?'adminAccessCenter':'adminSecurityCenter');
    (after?.parentNode||main).insertBefore(s,after?.nextSibling||null);
    return true;
  }
  function ensureTransitionNote(){
    if(document.getElementById('adminTransitionSecurityNote'))return true;
    const main=document.querySelector('.admin-main');if(!main)return false;
    const n=document.createElement('div');n.id='adminTransitionSecurityNote';n.className='admin-danger-note';
    n.innerHTML='<b>正式站安全過渡</b>目前仍可使用舊版資料結構，但後台登入、個人帳號、兩步驟驗證、備份、稽核與高風險操作已分區管理。';
    const anchor=document.getElementById('adminSecurityCenter');
    (anchor?.parentNode||main).insertBefore(n,anchor||null);return true;
  }
  function load(){
    modules.forEach(name=>{if(document.querySelector(`script[data-admin-system-module="${name}"]`))return;const s=document.createElement('script');s.src=`assets/js/${name}?v=20260915-system`;s.dataset.adminSystemModule=name;document.body.appendChild(s)});
  }
  function boot(){
    ensureAccessBody();
    ensureCenter('adminSecurityCenter','系統安全中心','集中處理登入保護、資安政策、登入活動與操作稽核。',[['5 次','登入失敗策略基準'],['15 分','判斷時間窗基準'],['30 分','暫時鎖定時間基準'],['60 分','Session 基準']]);
    ensureCenter('adminBackupCenter','備份／還原中心','伺服器版本、手動保留、還原前保護與安全還原流程。',[['—','自動備份保留'],['—','基準版本'],['—','手動保留'],['—','稽核保留']]);
    ensureTransitionNote();
    ensureAccessBody();
    load();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,180),{once:true});else setTimeout(boot,180);
})();
