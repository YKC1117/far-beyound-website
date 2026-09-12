(()=>{
  if(window.FBAdminReauth)return;
  let pending=null;
  function style(){
    if(document.getElementById('adminReauthStyle'))return;
    const s=document.createElement('style');s.id='adminReauthStyle';
    s.textContent=`.admin-reauth-overlay{position:fixed;inset:0;z-index:10050;display:none;place-items:center;padding:18px;background:rgba(7,24,45,.62);backdrop-filter:blur(5px)}.admin-reauth-overlay.open{display:grid}.admin-reauth-card{width:min(430px,100%);background:#fff;border-radius:16px;padding:20px;box-shadow:0 26px 70px rgba(0,0,0,.28)}.admin-reauth-card h3{margin:0 0 6px;color:#17384b}.admin-reauth-card p{margin:0 0 14px;color:#6c808c;font-size:12px;line-height:1.6}.admin-reauth-card label{display:block;font-size:11px;font-weight:800;color:#385565}.admin-reauth-card input{box-sizing:border-box;width:100%;min-height:44px;margin-top:6px;padding:10px 12px;border:1px solid #cfdde3;border-radius:10px;font-size:16px}.admin-reauth-actions{display:flex;gap:8px;margin-top:14px}.admin-reauth-actions .btn{flex:1}@media(max-width:780px){.admin-reauth-card{padding:17px}.admin-reauth-actions{display:grid;grid-template-columns:1fr 1fr}.admin-reauth-actions .btn{min-height:44px}}`;
    document.head.appendChild(s);
  }
  function ensure(){
    style();let root=document.getElementById('adminReauthOverlay');if(root)return root;
    root=document.createElement('div');root.id='adminReauthOverlay';root.className='admin-reauth-overlay';root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');root.setAttribute('aria-hidden','true');
    root.innerHTML=`<form class="admin-reauth-card" id="adminReauthForm"><h3 id="adminReauthTitle">重新驗證身分</h3><p id="adminReauthDesc">此操作會影響後台安全或資料，請輸入你目前的個人帳號密碼。</p><label>目前個人帳號密碼<input id="adminReauthPassword" type="password" autocomplete="current-password" required minlength="8" maxlength="256"></label><div class="admin-reauth-actions"><button class="btn btn-primary" type="submit">確認並繼續</button><button class="btn btn-secondary" id="adminReauthCancel" type="button">取消</button></div></form>`;
    document.body.appendChild(root);
    const close=value=>{document.getElementById('adminReauthPassword').value='';root.classList.remove('open');root.setAttribute('aria-hidden','true');const done=pending;pending=null;done?.(value)};
    document.getElementById('adminReauthForm').addEventListener('submit',e=>{e.preventDefault();const value=document.getElementById('adminReauthPassword').value;if(!value)return;close(value)});
    document.getElementById('adminReauthCancel').onclick=()=>close(null);
    root.addEventListener('click',e=>{if(e.target===root)close(null)});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&root.classList.contains('open'))close(null)});
    root._close=close;return root;
  }
  function ask(title='重新驗證身分',desc='此操作會影響後台安全或資料，請輸入你目前的個人帳號密碼。'){
    const root=ensure();if(pending)root._close?.(null);
    document.getElementById('adminReauthTitle').textContent=title;document.getElementById('adminReauthDesc').textContent=desc;
    root.classList.add('open');root.setAttribute('aria-hidden','false');
    setTimeout(()=>document.getElementById('adminReauthPassword')?.focus(),30);
    return new Promise(resolve=>{pending=resolve});
  }
  window.FBAdminReauth={ask};
})();
