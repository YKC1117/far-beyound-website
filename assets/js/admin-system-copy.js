(()=>{
  if(document.body.dataset.page!=='admin'||window.__fbAdminSystemCopy)return;
  window.__fbAdminSystemCopy=true;
  function patch(){
    const access=document.getElementById('adminAccessCenter');
    const security=document.getElementById('adminSecurityCenter');
    const backup=document.getElementById('adminBackupCenter');
    if(access){const p=access.querySelector('summary .admin-panel-head p');if(p)p.textContent='個人帳號、角色、細項權限與 QR Code 兩步驟驗證；平常不需要展開。';const pill=access.querySelector('summary .admin-status-pill');if(pill)pill.textContent='個人帳號＋QR 2FA';const note=access.querySelector('.admin-system-body>.admin-usage-note');if(note)note.innerHTML='<b>使用說明：</b>Owner／Admin／Editor／Viewer 只是預設角色，仍可依人員個別調整權限。正式個人帳號登入必須完成 QR Code TOTP 兩步驟驗證；Owner 建議另綁定備用驗證器。'}
    if(security){const p=security.querySelector('summary .admin-panel-head p');if(p)p.textContent='登入限制、AAL2、登入活動、操作稽核與可調整的資安政策。';const pill=security.querySelector('summary .admin-status-pill');if(pill)pill.textContent='AAL2 保護已啟用';const note=security.querySelector('.admin-system-body>.admin-usage-note');if(note)note.innerHTML='<b>已建立：</b>RLS、16～64 字元強密碼、QR Code TOTP、AAL2、登入失敗鎖定、閒置逾時、登入活動、操作稽核、Owner 防誤刪與敏感操作重新驗證。登入限制、備份份數與稽核保留天數可由資安管理權限調整；2FA 與敏感操作重新驗證固定開啟。'}
    if(backup){const p=backup.querySelector('summary .admin-panel-head p');if(p)p.textContent='修改前自動留版本；需要查版本或復原時再展開。';const note=backup.querySelector('.admin-system-body>.admin-usage-note');if(note)note.innerHTML='<b>循環規則：</b>自動備份最多保留設定份數；目前為 100 份。超過上限後，系統會從最舊的自動備份開始依序淘汰，新版本持續補入。基準版本、手動保留與還原前保護不列入自動輪替。<br><b>使用說明：</b>伺服器備份受 RLS、個人權限與 AAL2 保護；正式還原還會要求個人密碼重新驗證。'}
    document.querySelectorAll('.admin-nav a[href="#adminPassword"]').forEach(a=>a.textContent='共用發布密碼');
  }
  const init=()=>[200,700,1500,2800,4200].forEach(t=>setTimeout(patch,t));
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();