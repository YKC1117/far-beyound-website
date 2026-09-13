(()=>{
  if(document.body.dataset.page!=='admin'||window.__fbAdminTransitionStatus)return;
  window.__fbAdminTransitionStatus=true;
  const BOOT='https://papqrnqbfauwuipjwwdh.supabase.co/functions/v1/admin-owner-bootstrap';
  async function state(){try{const r=await fetch(BOOT,{cache:'no-store',headers:{Accept:'application/json'}}),b=await r.json().catch(()=>({}));return r.ok&&typeof b.needs_owner==='boolean'?b.needs_owner:null}catch{return null}}
  async function apply(){const box=document.getElementById('adminPassword');if(!box)return;const form=document.getElementById('adminPasswordForm');if(form)form.hidden=true;let note=document.getElementById('adminTransitionSecurityNote');if(!note){note=document.createElement('div');note.id='adminTransitionSecurityNote';note.className='admin-usage-note';note.style.margin='16px 20px';box.appendChild(note)}const needs=await state();const h=box.querySelector('h2'),p=box.querySelector('.admin-panel-head p');if(h)h.textContent='網站發布驗證狀態';if(p)p.textContent='首次建立管理帳號前，系統仍保留必要的發布驗證；舊的線上變更入口已停用。';if(needs===true)note.innerHTML='<b>目前狀態：</b>尚未建立正式管理帳號。現有發布驗證僅供網站發布與首次建立管理帳號使用，並設有失敗次數限制。公司正式採用後，請優先建立個人管理帳號並完成兩步驟驗證。';else if(needs===false)note.innerHTML='<b>目前狀態：</b>個人管理帳號已啟用，舊的共用發布驗證已退出正式管理流程。';else note.innerHTML='<b>目前狀態暫時無法確認：</b>請檢查網路後重新載入；系統不會因此重新開放舊的線上變更入口。'}
  function init(){[100,600,1500,3000].forEach(t=>setTimeout(apply,t))}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();