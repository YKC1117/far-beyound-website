/* Desktop phone compatibility and meeting-stability layer.
 * final-fixes.js remains the DOM owner for the quick-contact rail.
 * This file keeps the desktop contact rail stable, restores the phone popover
 * contract, and disables automatic hero rotation in-memory to prevent flashes.
 */
(function(){
  'use strict';
  if(window.__fbDesktopPhonePopoverCompat)return;
  window.__fbDesktopPhonePopoverCompat=true;

  let activeItem=null;
  let classObserver=null;
  const COLORS=['#17324d','#06C755','#F28C28'];

  function stabilizeHero(){
    if(document.body?.dataset?.page!=='home')return;
    const data=window.FBStore?.getData?.();
    if(!data)return;
    data.homeHero=Object.assign({},data.homeHero||{}, {autoplay:false});
  }

  function lockRail(rail){
    rail.style.setProperty('overflow','visible','important');
    [...rail.querySelectorAll('.quick-contact-btn')].slice(0,3).forEach((button,index)=>{
      button.style.setProperty('background',COLORS[index],'important');
      button.style.setProperty('color','#fff','important');
      button.style.setProperty('transition','none','important');
      button.querySelectorAll('svg').forEach(svg=>svg.style.setProperty('stroke','#fff','important'));
      button.querySelectorAll('span,b,small').forEach(node=>node.style.setProperty('color','#fff','important'));
    });
  }

  function normalizePhonePanel(panel){
    const links=[...panel.querySelectorAll('a[href^="tel:"]')];
    const expected=[
      {label:'新北辦公室',number:'02-82217759',href:'tel:0282217759'},
      {label:'台南辦公室',number:'06-2360139',href:'tel:062360139'}
    ];
    expected.forEach((info,index)=>{
      const link=links[index];
      if(!link)return;
      link.href=info.href;
      const label=link.querySelector('span');
      const number=link.querySelector('b');
      if(label)label.textContent=info.label;
      if(number)number.textContent=info.number;
    });
  }

  function sync(item,button,panel){
    const open=item.classList.contains('is-open');
    button.setAttribute('aria-expanded',String(open));
    panel.setAttribute('aria-hidden',String(!open));
    panel.style.setProperty('display','block','important');
    panel.style.setProperty('visibility',open?'visible':'hidden','important');
    panel.style.setProperty('opacity',open?'1':'0','important');
    panel.style.setProperty('transform',open?'none':'translateX(8px)','important');
    panel.style.setProperty('pointer-events',open?'auto':'none','important');
    panel.style.setProperty('z-index','120','important');
  }

  function bind(){
    if(document.body?.dataset?.page==='admin')return false;
    const rail=document.querySelector('.quick-contact');
    if(!rail)return false;
    lockRail(rail);

    const items=[...rail.querySelectorAll('.quick-contact-item')];
    const item=rail.querySelector('.quick-contact-item[data-contact-phone]')||items[0];
    if(!item)return false;
    if(!item.hasAttribute('data-contact-phone'))item.setAttribute('data-contact-phone','');

    const button=item.querySelector('.quick-contact-btn');
    const panel=item.querySelector('.quick-phone-panel');
    if(!button||!panel)return false;

    panel.id='fbDesktopPhonePopover';
    button.setAttribute('aria-controls',panel.id);
    normalizePhonePanel(panel);
    sync(item,button,panel);

    if(activeItem!==item){
      if(classObserver)classObserver.disconnect();
      activeItem=item;
      classObserver=new MutationObserver(()=>sync(item,button,panel));
      classObserver.observe(item,{attributes:true,attributeFilter:['class']});
    }

    if(!item.dataset.desktopPopoverCompat){
      item.dataset.desktopPopoverCompat='1';
      const refresh=()=>requestAnimationFrame(()=>{lockRail(rail);normalizePhonePanel(panel);sync(item,button,panel)});
      button.addEventListener('click',refresh);
      item.addEventListener('mouseenter',refresh);
      item.addEventListener('mouseleave',refresh);
    }
    return true;
  }

  function boot(){
    stabilizeHero();
    bind();
    const root=document.body||document.documentElement;
    const domObserver=new MutationObserver(()=>bind());
    domObserver.observe(root,{childList:true,subtree:true});
    window.addEventListener('load',()=>{stabilizeHero();bind()},{once:true});
    window.addEventListener('farbeyound:datachange',()=>{stabilizeHero();requestAnimationFrame(bind)});
  }

  stabilizeHero();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
