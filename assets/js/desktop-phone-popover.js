/* Desktop phone compatibility layer.
 * final-fixes.js owns the quick-contact DOM. This file only restores the
 * stable popover contract used by desktop interaction checks and legacy pages,
 * without creating a second contact rail.
 */
(function(){
  'use strict';
  if(window.__fbDesktopPhonePopoverCompat)return;
  window.__fbDesktopPhonePopoverCompat=true;

  let activeItem=null;
  let classObserver=null;

  function sync(item,button,panel){
    const open=item.classList.contains('is-open');
    button.setAttribute('aria-expanded',String(open));
    panel.setAttribute('aria-hidden',String(!open));
  }

  function bind(){
    if(document.body?.dataset?.page==='admin')return false;
    const rail=document.querySelector('.quick-contact');
    if(!rail)return false;
    const items=[...rail.querySelectorAll('.quick-contact-item')];
    const item=rail.querySelector('.quick-contact-item[data-contact-phone]')||items[0];
    if(!item)return false;
    if(!item.hasAttribute('data-contact-phone'))item.setAttribute('data-contact-phone','');

    const button=item.querySelector('.quick-contact-btn');
    const panel=item.querySelector('.quick-phone-panel');
    if(!button||!panel)return false;

    panel.id='fbDesktopPhonePopover';
    button.setAttribute('aria-controls',panel.id);
    sync(item,button,panel);

    if(activeItem!==item){
      if(classObserver)classObserver.disconnect();
      activeItem=item;
      classObserver=new MutationObserver(()=>sync(item,button,panel));
      classObserver.observe(item,{attributes:true,attributeFilter:['class']});
    }

    if(!item.dataset.desktopPopoverCompat){
      item.dataset.desktopPopoverCompat='1';
      const refresh=()=>requestAnimationFrame(()=>sync(item,button,panel));
      button.addEventListener('click',refresh);
      item.addEventListener('mouseenter',refresh);
      item.addEventListener('mouseleave',refresh);
    }
    return true;
  }

  function boot(){
    bind();
    const root=document.body||document.documentElement;
    const domObserver=new MutationObserver(()=>bind());
    domObserver.observe(root,{childList:true,subtree:true});
    window.addEventListener('load',bind,{once:true});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
