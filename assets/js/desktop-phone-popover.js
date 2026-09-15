/* Desktop phone compatibility layer.
 * final-fixes.js owns the quick-contact DOM. This file only restores the
 * stable popover contract used by desktop interaction checks and legacy pages,
 * without creating a second contact rail.
 */
(function(){
  'use strict';
  if(window.__fbDesktopPhonePopoverCompat)return;
  window.__fbDesktopPhonePopoverCompat=true;

  function bind(){
    if(document.body?.dataset?.page==='admin')return false;
    const item=document.querySelector('.quick-contact-item[data-contact-phone]');
    if(!item)return false;
    const button=item.querySelector('.quick-contact-btn');
    const panel=item.querySelector('.quick-phone-panel');
    if(!button||!panel)return false;

    panel.id='fbDesktopPhonePopover';
    button.setAttribute('aria-controls',panel.id);

    const sync=()=>{
      const open=item.classList.contains('is-open');
      button.setAttribute('aria-expanded',String(open));
      panel.setAttribute('aria-hidden',String(!open));
    };
    sync();

    if(!item.dataset.desktopPopoverCompat){
      item.dataset.desktopPopoverCompat='1';
      const observer=new MutationObserver(sync);
      observer.observe(item,{attributes:true,attributeFilter:['class']});
      button.addEventListener('click',()=>requestAnimationFrame(sync));
      item.addEventListener('mouseenter',()=>requestAnimationFrame(sync));
      item.addEventListener('mouseleave',()=>requestAnimationFrame(sync));
    }
    return true;
  }

  function boot(){
    if(bind())return;
    let tries=0;
    const timer=setInterval(()=>{
      tries+=1;
      if(bind()||tries>=40)clearInterval(timer);
    },25);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
