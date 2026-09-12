(()=>{
  if(document.body.dataset.page!=='admin'||window.__fbAdminSecurityTools)return;
  window.__fbAdminSecurityTools=true;
  const BASE='https://papqrnqbfauwuipjwwdh.supabase.co/functions/v1/';
  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  function fmt(v){if(!v)return '—';try{return new Date(v).toLocaleString('zh-TW',{hour12:false})}catch{return String(v)}}
  function sourceLabel(v){return ({automatic:'自動備份',baseline:'基準版本',manual:'手動保留',pre_restore:'還原前保護'})[v]||v||'—'}
  async function call(path,method='GET',body){
    const s=window.FBAdminAuth?.session?.();if(!s?.access_token)throw new Error('login_required');
    const r=await fetch(BASE+path,{method,headers:{Authorization:`Bearer ${s.access_token}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});
    const b=await r.json().catch(()=>({}));if(!r.ok)throw new Error(b.error||'request_failed');return b
  }
  function audit(){
    const h=document.querySelector('#adminSecurityCenter .admin-system-body');if(!h||document.getElementById('adminSecureAudit'))return;
    const x=document.createElement('section');x.id='adminSecureAudit';x.className='admin-tool-block';
    x.innerHTML='<div class="admin-tool-head"><div><b>操作稽核</b><small>只有具備「查看稽核」權限的個人帳號可以讀取。</small></div><button class="btn btn-secondary btn-sm" type="button">讀取紀錄</button></div><div class="admin-tool-result" hidden></div>';
    h.appendChild(x);const btn=x.querySelector('button'),out=x.querySelector('.admin-tool-result');
    btn.onclick=async()=>{btn.disabled=true;try{const b=await call('admin-audit-secure'),rows=b.rows||[];out.hidden=false;out.innerHTML=rows.length?`<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>時間</th><th>操作者</th><th>角色</th><th>動作</th><th>項目</th><th>結果</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(fmt(r.created_at))}</td><td><b>${esc(r.actor_name||'系統')}</b><br><span>${esc(r.actor_email||'')}</span></td><td>${esc(r.actor_role||'—')}</td><td>${esc(r.action||'—')}</td><td>${esc(r.target||'—')}</td><td>${r.success===false?'<b class="admin-red">失敗</b>':'成功'}</td></tr>`).join('')}</tbody></table></div>`:'<div class="admin-tool-empty">目前尚無稽核紀錄。</div>'}catch(e){out.hidden=false;out.innerHTML=`<div class="admin-tool-empty">${e.message==='login_required'?'請先到「人員／權限管理」登入個人帳號。':'目前帳號沒有查看稽核權限，或資料暫時無法讀取。'}</div>`}finally{btn.disabled=false;btn.textContent='重新讀取'}}
  }
  function backups(){
    const h=document.querySelector('#adminBackupCenter .admin-system-body');if(!h||document.getElementById('adminSecureBackups'))return;
    const x=document.createElement('section');x.id='adminSecureBackups';x.className='admin-tool-block';
    x.innerHTML='<div class="admin-tool-head"><div><b>伺服器版本</b><small>自動備份採 100 份循環保留：第 101 份開始會依序淘汰最舊的「自動備份」。基準版本、手動保留與還原前保護版本不列入這 100 份，也不會被循環清除。正式還原需要備份／還原權限、二次確認與個人密碼重新驗證。</small></div><button class="btn btn-secondary btn-sm" type="button">讀取版本</button></div><div class="admin-tool-result" hidden></div>';
    h.appendChild(x);const btn=x.querySelector('button'),out=x.querySelector('.admin-tool-result');btn.onclick=()=>loadBackups(btn,out)
  }
  async function loadBackups(btn,out){
    btn.disabled=true;
    try{
      const b=await call('admin-backups-secure'),rows=b.rows||[];out.hidden=false;
      out.innerHTML=rows.length?`<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>建立時間</th><th>來源</th><th>原因</th><th>完整性碼</th><th>還原</th></tr></thead><tbody>${rows.map(r=>`<tr data-backup="${Number(r.id)}"><td>${esc(fmt(r.created_at))}</td><td>${esc(sourceLabel(r.source))}</td><td>${esc(r.reason||'—')}</td><td><code>${esc(String(r.checksum||'').slice(0,18))}${r.checksum?'…':''}</code></td><td>${r.restored_at?`已於 ${esc(fmt(r.restored_at))} 還原`:`<button type="button" class="btn btn-danger-soft btn-sm admin-restore-backup">還原此版</button>`}</td></tr>`).join('')}</tbody></table></div>`:'<div class="admin-tool-empty">目前尚無伺服器備份。</div>';
      out.querySelectorAll('.admin-restore-backup').forEach(b=>b.onclick=restore)
    }catch(e){out.hidden=false;out.innerHTML=`<div class="admin-tool-empty">${e.message==='login_required'?'請先登入個人帳號。':'目前帳號沒有備份／還原權限，或資料暫時無法讀取。'}</div>`}
    finally{btn.disabled=false;btn.textContent='重新讀取'}
  }
  async function restore(e){
    const tr=e.currentTarget.closest('tr'),id=Number(tr.dataset.backup);
    if(!confirm('重要：還原會覆蓋目前網站資料。\n\n系統會自動保留還原前版本。確定要繼續嗎？'))return;
    const typed=prompt('請輸入「還原」完成第二次確認：','');if(typed!=='還原'){if(typed!==null)alert('確認文字不符，已取消。');return}
    const pass=await window.FBAdminReauth?.ask?.('重新驗證｜備份還原','還原會覆蓋目前網站資料，請輸入你目前的個人帳號密碼完成最後身分確認。');if(!pass)return;
    const btn=e.currentTarget;btn.disabled=true;btn.textContent='還原中…';
    try{await call('admin-backups-secure','POST',{action:'restore',backup_id:id,current_password:pass});alert('還原完成。網站資料已回到選定版本，頁面將重新載入。');location.reload()}
    catch(err){alert(err.message==='login_required'?'請先登入個人帳號。':err.message==='reauth_failed'?'個人帳號密碼驗證失敗，未執行還原。':'還原失敗：目前帳號可能沒有權限，或版本已不存在。');btn.disabled=false;btn.textContent='還原此版'}
  }
  function style(){
    if(document.getElementById('adminSecurityToolsStyle'))return;
    const s=document.createElement('style');s.id='adminSecurityToolsStyle';
    s.textContent='.admin-tool-block{margin-top:16px;padding-top:16px;border-top:1px solid #e3ebef}.admin-tool-head{display:flex;align-items:center;justify-content:space-between;gap:12px}.admin-tool-head b,.admin-tool-head small{display:block}.admin-tool-head small{margin-top:3px;color:#70848f;font-size:10px;line-height:1.6}.admin-tool-result{margin-top:12px}.admin-tool-empty{padding:14px;border-radius:10px;background:#f6f9fa;color:#677d89;font-size:11px}.admin-red{color:#b42323}@media(max-width:780px){.admin-tool-head{align-items:stretch;flex-direction:column}.admin-tool-head .btn{width:100%;min-height:44px}.admin-tool-result .admin-table{min-width:760px}}';document.head.appendChild(s)
  }
  function init(){style();audit();backups()}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',()=>[1800,3000].forEach(t=>setTimeout(init,t)),{once:true}):[900,2200].forEach(t=>setTimeout(init,t))
})();