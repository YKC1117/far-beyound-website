(()=>{
  if(document.body.dataset.page!=='admin'||window.__fbAdminTransitionStatus)return;
  window.__fbAdminTransitionStatus=true;

  function apply(){
    const box=document.getElementById('adminPassword');
    if(!box)return false;

    const form=document.getElementById('adminPasswordForm');
    if(form)form.hidden=false;

    let note=document.getElementById('adminTransitionSecurityNote');
    if(!note){
      note=document.createElement('div');
      note.id='adminTransitionSecurityNote';
      note.className='admin-usage-note';
      note.style.margin='16px 20px';
      box.appendChild(note);
    }
    note.innerHTML='<b>目前模式：</b>後台先維持共用發布密碼流程；Owner／個人帳號／2FA 尚未正式啟用，也不會阻擋目前後台操作。之後公司確認要升級時，再切換到個人帳號與兩步驟驗證。';
    return true;
  }

  function init(){
    if(apply())return;
    setTimeout(apply,250);
  }

  document.readyState==='loading'
    ?document.addEventListener('DOMContentLoaded',init,{once:true})
    :init();
})();