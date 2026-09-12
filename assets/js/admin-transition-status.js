(()=>{
  if(document.body.dataset.page!=='admin'||window.__fbAdminTransitionStatus)return;
  window.__fbAdminTransitionStatus=true;
  const BOOT='https://papqrnqbfauwuipjwwdh.supabase.co/functions/v1/admin-owner-bootstrap';
  async function state(){try{const r=await fetch(BOOT,{cache:'no-store',headers:{Accept:'application/json'}}),b=await r.json().catch(()=>({}));return r.ok&&typeof b.needs_owner==='boolean'?b.needs_owner:null}catch{return null}}
  async function apply(){const box=document.getElementById('adminPassword');if(!box)return;const form=document.getElementById('adminPasswordForm');if(form)form.hidden=true;let note=document.getElementById('adminTransitionSecurityNote');if(!note){note=document.createElement('div');note.id='adminTransitionSecurityNote';note.className='admin-usage-note';note.style.margin='16px 20px';box.appendChild(note)}const needs=await state();const h=box.querySelector('h2'),p=box.querySelector('.admin-panel-head p');if(h)h.textContent='共用發布驗證狀態';if(p)p.textContent='只保留首次 Owner 建立前的發布驗證；線上變更入口已停用。';if(needs===true)note.innerHTML='<b>過渡模式：</b>目前尚未建立正式 Owner。共用發布驗證只用於網站發布與首次 Owner 建立，兩條路徑都有失敗次數限制。公司採用後請優先建立 Owner＋QR 兩步驟驗證。';else if(needs===false)note.innerHTML='<b>正式模式：</b>個人管理帳號已啟用，共用發布驗證已退出正式管理流程。';else note.innerHTML='<b>狀態暫時無法確認：</b>請檢查網路後重新載入；系統不會因此重新開放舊的線上變更入口。'}
  function init(){[100,600,1500,3000].forEach(t=>setTimeout(apply,t))}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();