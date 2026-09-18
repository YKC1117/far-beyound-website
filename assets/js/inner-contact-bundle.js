/* INNER CONTACT BUNDLE — contact/footer runtime in original order. */

/* ===== assets/js/contact-youtube-upgrade.js ===== */
(function(){if(window.__fbContactYoutubeUpgrade)return;window.__fbContactYoutubeUpgrade=true;function data(){const d=window.FBStore?.getData?.()||{},site=d.site||{};return{phones:Array.isArray(site.phones)?site.phones:[],youtube:String(site.youtube||window.FBSocialLinks?.youtube||'').trim()}}function tel(v){return String(v||'').replace(/[^0-9+]/g,'')}function loadMobileExperience(){if(document.querySelector('link[data-mobile-experience]'))return;const l=document.createElement('link');l.rel='stylesheet';l.href='assets/css/mobile-experience.css?v=20260911b';l.dataset.mobileExperience='1';document.head.appendChild(l)}function addStyle(){if(document.getElementById('fbContactYoutubeUpgradeStyle'))return;const s=document.createElement('style');s.id='fbContactYoutubeUpgradeStyle';s.textContent='.footer-media-link{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 0;border-top:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12);text-decoration:none;color:inherit}.footer-media-copy{display:flex;align-items:center;gap:12px;min-width:0}.footer-media-icon{width:36px;height:36px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.24);border-radius:50%}.footer-media-icon svg{width:19px;height:19px;fill:currentColor}.footer-media-copy small{display:block;font-size:10px;letter-spacing:.12em;opacity:.68;margin-bottom:3px}.footer-media-copy b{display:block;font-size:13px}.footer-media-arrow{font-size:12px;font-weight:700;white-space:nowrap;opacity:.78}@media(max-width:680px){.footer-media-link{padding:16px 0}.footer-media-arrow{font-size:11px}}';document.head.appendChild(s)}function upgradeMobilePhone(){const old=document.querySelector('[data-mobile-phone]'),panel=document.querySelector('.mobile-contact-phone');if(!old||!panel||old.dataset.clickPanelReady==='1')return;const btn=old.cloneNode(true);btn.dataset.clickPanelReady='1';old.replaceWith(btn);const label=btn.querySelector('span');if(label)label.textContent='電話';btn.setAttribute('aria-label','電話聯絡');panel.id='mobilePhonePanel';panel.innerHTML='';data().phones.forEach(p=>{const a=document.createElement('a');a.href='tel:'+tel(p.value);const s=document.createElement('span'),b=document.createElement('b');s.textContent=(p.label||'')+'辦公室';b.textContent=p.value||'';a.append(s,b);panel.appendChild(a)});btn.setAttribute('aria-controls',panel.id);btn.setAttribute('aria-expanded','false');const close=()=>{panel.classList.remove('is-open');btn.setAttribute('aria-expanded','false')};btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const open=!panel.classList.contains('is-open');close();if(open){panel.classList.add('is-open');btn.setAttribute('aria-expanded','true')}});panel.addEventListener('click',e=>e.stopPropagation());document.addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}function addYoutubeFooter(){const url=data().youtube,old=document.querySelector('.footer-media-wrap');if(!url){old?.remove();return}if(old){const a=old.querySelector('a');if(a)a.href=url;return}const footer=document.querySelector('footer'),target=footer?.querySelector('.footer-bottom')||footer?.lastElementChild;if(!footer||!target)return;const wrap=document.createElement('div');wrap.className='container footer-media-wrap';const a=document.createElement('a');a.className='footer-media-link';a.href=url;a.target='_blank';a.rel='noopener';a.setAttribute('aria-label','萬里資訊 YouTube 頻道（另開新視窗）');a.innerHTML='<span class="footer-media-copy"><span class="footer-media-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21.2 7.1a2.8 2.8 0 0 0-2-2C17.4 4.6 12 4.6 12 4.6s-5.4 0-7.2.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.3 12a29 29 0 0 0 .5 4.9 2.8 2.8 0 0 0 2 2c1.8.5 7.2.5 7.2.5s5.4 0 7.2-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-4.9 29 29 0 0 0-.5-4.9ZM10 15.2V8.8l5.5 3.2L10 15.2Z"/></svg></span><span><small>VIDEO CHANNEL</small><b>萬里資訊 YouTube</b></span></span><span class="footer-media-arrow">前往影音頻道 →</span>';wrap.appendChild(a);target.parentNode.insertBefore(wrap,target)}function run(){loadMobileExperience();addStyle();upgradeMobilePhone();addYoutubeFooter()}document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,160);setTimeout(run,700)});if(document.readyState!=='loading')setTimeout(run,0);window.addEventListener('farbeyound:datachange',()=>setTimeout(run,120))})();

/* ===== assets/js/desktop-phone-popover.js ===== */
/* Desktop phone interaction authority.
 * final-fixes.js builds the quick-contact DOM; this file owns the final
 * desktop phone accessibility/state contract so hover and click never cancel
 * each other during the same pointer interaction.
 */
(function(){
  'use strict';
  if(window.__fbDesktopPhonePopoverCompat)return;
  window.__fbDesktopPhonePopoverCompat=true;

  document.body?.classList.add('fb-public-ready');

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

      /* hoverState only previews the card. Once the user clicks, clickState
       * takes priority until the pointer leaves, so the second click can close
       * the card without mouseenter immediately reopening it. */
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

  function boot(){
    stabilizeHero();
    if(bind())return;

    const root=document.body||document.documentElement;
    const domObserver=new MutationObserver(()=>{
      if(bind())domObserver.disconnect();
    });
    domObserver.observe(root,{childList:true,subtree:true});
    setTimeout(()=>domObserver.disconnect(),1500);
  }

  stabilizeHero();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
  window.addEventListener('load',()=>{document.body?.classList.add('fb-public-ready');stabilizeHero();bind()},{once:true});
  window.addEventListener('farbeyound:datachange',()=>{stabilizeHero();requestAnimationFrame(bind)});
})();

