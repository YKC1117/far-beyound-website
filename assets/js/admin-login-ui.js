(()=>{
if(document.body.dataset.page!=='admin'||window.__fbAdminLoginUI)return;
window.__fbAdminLoginUI=true;
function boot(){
 const box=document.getElementById('adminAccessCenter');
 if(!box)return;
 box.innerHTML='<details open><summary>後台登入</summary><div class="admin-login-box"><form id="adminLoginForm"><label>Email<input id="adminLoginEmail" type="email" autocomplete="username" required></label><label>密碼<input id="adminLoginPassword" type="password" autocomplete="current-password" required></label><button class="btn btn-primary" type="submit">登入後台</button><p id="adminLoginMessage" role="status"></p></form></div></details>';
 document.getElementById('adminLoginForm').addEventListener('submit',async e=>{
  e.preventDefault();const m=document.getElementById('adminLoginMessage'),b=e.currentTarget.querySelector('button');b.disabled=true;b.textContent='登入中…';m.textContent='正在驗證帳號…';
  try{const r=await window.FBAdminAuth.login(document.getElementById('adminLoginEmail').value,document.getElementById('adminLoginPassword').value);if(r&&r.mfa_required){m.textContent='帳號密碼正確，請完成兩步驟驗證。';}else{m.textContent='登入成功，正在進入後台…';setTimeout(()=>location.reload(),200)}}catch(err){m.textContent='登入失敗，請確認 Email 與密碼。'}finally{b.disabled=false;b.textContent='登入後台'}
 });
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();