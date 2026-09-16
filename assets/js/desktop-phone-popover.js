/* Desktop phone interaction authority.
 * final-fixes.js normally builds the quick-contact DOM. This file owns the
 * final desktop phone structure/accessibility/state contract and repairs a
 * partially rebuilt contact rail without introducing a permanent body-wide
 * observer.
 */
(function(){
  'use strict';
  if(window.__fbDesktopPhonePopoverCompat)return;
  window.__fbDesktopPhonePopoverCompat=true;

  document.body?.classList.add('fb-public-ready');

  let activeItem=null;
  let classObserver=null;
  const COLORS=['#17324d','#06C755','#F28C28'];
  const PHONE_ICON='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.1 3.8 9.7 3c.7-.2 1.4.2 1.7.8l1.2 2.8c.3.6.1 1.3-.4 1.7l-1.5 1.2a14 14 0 0 0 3.8 3.8l1.2-1.5c.4-.5 1.1-.7 1.7-.4l2.8 1.2c.7.3 1 .9.8 1.7l-.8 2.6c-.3.9-1.1 1.5-2 1.5C11 18.4 5.6 13 5.6 6c0-1 .6-1.9 1.5-2.2Z"/></svg>';
  const EXPECTED_PHONES=[
    {label:'新北辦公室',number:'02-82217759',href:'tel:0282217759'},
    {label:'台南辦公室',number:'06-2360139',href:'tel:062360139'}
  ];

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

  function phonePanelMarkup(){
    return `<strong>電話聯絡</strong>${EXPECTED_PHONES.map(info=>`<a class="quick-phone-link" href="${info.href}"><span>${info.label}</span><b>${info.number}</b></a>`).join('')}`;
  }

  function findPhoneItem(rail){
    return rail.querySelector('.quick-contact-item[data-contact-phone]')||
      [...rail.querySelectorAll('.quick-contact-item')].find(item=>{
        const button=item.querySelector('.quick-contact-btn');
        const label=(button?.getAttribute('aria-label')||button?.textContent||'').trim();
        return /電話|撥打/.test(label)||!!item.querySelector('a[href^="tel:"]');
      })||null;
  }

  function ensurePhoneStructure(rail){
    let item=findPhoneItem(rail);
    if(!item){
      item=document.createElement('div');
      item.className='quick-contact-item';
      item.dataset.contactPhone='';
      item.innerHTML=`<button type="button" class="quick-contact-btn" aria-expanded="false" aria-label="電話聯絡">${PHONE_ICON}<span>電話</span></button><div class="quick-phone-panel">${phonePanelMarkup()}</div>`;
      rail.prepend(item);
    }else{
      item.dataset.contactPhone='';
    }

    let button=item.querySelector('.quick-contact-btn');
    if(!button){
      button=document.createElement('button');
      button.type='button';
      button.className='quick-contact-btn';
      button.setAttribute('aria-expanded','false');
      button.setAttribute('aria-label','電話聯絡');
      button.innerHTML=`${PHONE_ICON}<span>電話</span>`;
      item.prepend(button);
    }

    let panel=item.querySelector('.quick-phone-panel');
    if(!panel){
      panel=document.createElement('div');
      panel.className='quick-phone-panel';
      panel.innerHTML=phonePanelMarkup();
      item.appendChild(panel);
    }

    const existingLinks=[...panel.querySelectorAll('a[href^="tel:"]')];
    if(existingLinks.length<2){
      panel.innerHTML=phonePanelMarkup();
    }

    return {item,button,panel};
  }

  function normalizePhonePanel(panel){
    const links=[...panel.querySelectorAll('a[href^="tel:"]')];
    EXPECTED_PHONES.forEach((info,index)=>{
      let link=links[index];
      if(!link){
        link=document.createElement('a');
        link.className='quick-phone-link';
        panel.appendChild(link);
      }
      link.classList.add('quick-phone-link');
      link.href=info.href;
      let label=link.querySelector('span');
      let number=link.querySelector('b');
      if(!label){label=document.createElement('span');link.prepend(label)}
      if(!number){number=document.createElement('b');link.appendChild(number)}
      label.textContent=info.label;
      number.textContent=info.number;
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

  function openPhone(item,button,panel){
    item.classList.add('is-open');
    sync(item,button,panel);
  }

  function closePhone(item,button,panel){
    item.classList.remove('is-open');
    sync(item,button,panel);
  }

  function bind(){
    if(document.body?.dataset?.page==='admin')return false;
    document.body?.classList.add('fb-public-ready');
    const rail=document.querySelector('.quick-contact');
    if(!rail)return false;

    const {item,button,panel}=ensurePhoneStructure(rail);
    lockRail(rail);

    panel.id='fbDesktopPhonePopover';
    button.setAttribute('aria-controls',panel.id);
    button.setAttribute('aria-haspopup','dialog');
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

      let clickState=null;
      let openedByHover=false;

      button.addEventListener('click',e=>{
        e.preventDefault();
        e.stopImmediatePropagation();

        if(openedByHover){
          clickState=true;
          openedByHover=false;
          openPhone(item,button,panel);
          return;
        }

        if(clickState===true||item.classList.contains('is-open')){
          clickState=false;
          closePhone(item,button,panel);
          return;
        }

        clickState=true;
        openPhone(item,button,panel);
      },true);

      item.addEventListener('mouseenter',()=>{
        if(clickState===false)return;
        if(clickState===null)openedByHover=true;
        openPhone(item,button,panel);
      });

      item.addEventListener('mouseleave',()=>{
        clickState=null;
        openedByHover=false;
        closePhone(item,button,panel);
      });

      document.addEventListener('click',e=>{
        if(item.contains(e.target))return;
        clickState=null;
        openedByHover=false;
        closePhone(item,button,panel);
      });

      document.addEventListener('keydown',e=>{
        if(e.key!=='Escape')return;
        clickState=false;
        openedByHover=false;
        closePhone(item,button,panel);
      });
    }
    return true;
  }

  function retryBind(){
    [0,80,240,700,1400].forEach(delay=>setTimeout(()=>{
      stabilizeHero();
      bind();
    },delay));
  }

  function boot(){
    stabilizeHero();
    if(bind()){
      retryBind();
      return;
    }

    // 僅在初始 1.5 秒等待 quick-contact 建立；成功後立即停止，避免整頁長期監聽造成卡頓。
    const root=document.body||document.documentElement;
    const domObserver=new MutationObserver(()=>{
      if(bind())domObserver.disconnect();
    });
    domObserver.observe(root,{childList:true,subtree:true});
    setTimeout(()=>domObserver.disconnect(),1500);
    retryBind();
  }

  stabilizeHero();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
  window.addEventListener('load',()=>{document.body?.classList.add('fb-public-ready');retryBind()},{once:true});
  window.addEventListener('farbeyound:datachange',()=>requestAnimationFrame(retryBind));
})();
