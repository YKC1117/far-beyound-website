(()=>{
  'use strict';
  if(document.body.dataset.page!=='admin'||window.__fbAdminStaticUi)return;
  window.__fbAdminStaticUi=true;
  function bind(){
    const g=document.getElementById('adminPreviewGroup'),b=document.getElementById('adminPreviewToggle');
    if(b&&g&&!b.dataset.bound){b.dataset.bound='1';b.addEventListener('click',()=>{const open=g.classList.toggle('open');b.setAttribute('aria-expanded',open?'true':'false');const s=b.querySelector('span');if(s)s.textContent=open?'−':'＋'})}
    const close=document.getElementById('adminFormClose2'),panel=document.getElementById('adminFormPanel');
    if(close&&panel&&!close.dataset.bound){close.dataset.bound='1';close.addEventListener('click',()=>panel.classList.remove('open'))}
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',bind,{once:true}):bind();
})();