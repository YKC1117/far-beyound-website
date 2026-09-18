/* PRODUCTS TAIL BUNDLE — exact original order after site-social. */
/* ===== assets/js/product-resources.js ===== */
(function(){
  if(!window.FBStore || window.__fbProductResources) return;
  window.__fbProductResources = true;

  const rawGet = FBStore.getData.bind(FBStore);
  const key = v => String(v || '').trim().toLowerCase().replace(/\s+/g,'');

  FBStore.getData = function(){
    const data = rawGet();
    const map = window.FBProductDocs?.items || {};

    (data.products || []).forEach(product => {
      const imported = Array.isArray(map[product.legacyUrl]) ? map[product.legacyUrl] : [];
      if(!imported.length) return;

      const existing = Array.isArray(product.files) ? product.files : [];
      const merged = [];
      const seen = new Set();

      imported.forEach(file => {
        if(!file || !file.url) return;
        const sig = key(file.label) + '|' + key(file.url);
        if(seen.has(sig)) return;
        seen.add(sig);
        merged.push({
          label: file.label || '技術文件',
          type: file.type || (/\.pdf(?:$|\?)/i.test(file.url) ? 'PDF' : '文件'),
          url: file.url,
          source: 'official'
        });
      });

      existing.forEach(file => {
        if(!file) return;
        const sameLabel = merged.some(x => key(x.label) === key(file.label));
        if(sameLabel && !file.url) return;
        const sig = key(file.label) + '|' + key(file.url);
        if(seen.has(sig)) return;
        seen.add(sig);
        merged.push(file);
      });

      product.files = merged;
    });

    return data;
  };
})();

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


/* ===== assets/js/public-product-visibility.js ===== */
(function(){
  'use strict';
  if(window.__fbPublicProductVisibility)return;window.__fbPublicProductVisibility=true;
  if(document.body?.dataset.page==='admin')return;
  const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];
  function current(){return window.FBStore?.getData?.()||{products:[]}}
  function hiddenIds(){return new Set((current().products||[]).filter(p=>p.published===false).map(p=>String(p.id)))}
  function idFromHref(href){try{return new URL(href,location.href).searchParams.get('id')||''}catch(e){return ''}}
  function activeFilters(){const q=new URLSearchParams(location.search);return {category:q.get('category')||'all',brand:q.get('brand')||'all'}}
  function installContactStyle(){
    if(document.getElementById('fbPublicMobileContactStyle'))return;
    const s=document.createElement('style');s.id='fbPublicMobileContactStyle';s.textContent=`@media(max-width:980px){
      html body .quick-contact{position:fixed!important;left:0!important;right:0!important;bottom:0!important;top:auto!important;z-index:999!important;transform:none!important;display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;width:100%!important;gap:0!important;margin:0!important;padding:0!important;background:transparent!important;border:0!important;border-radius:0!important;overflow:visible!important;box-shadow:0 -8px 26px rgba(18,46,70,.10)!important;filter:none!important}
      html body .quick-contact .quick-contact-item{position:relative!important;margin:0!important;padding:0!important;border:0!important;min-width:0!important}
      html body .quick-contact .quick-contact-btn{width:100%!important;min-width:0!important;height:58px!important;min-height:58px!important;margin:0!important;padding:0!important;border:0!important;border-right:1px solid rgba(255,255,255,.25)!important;border-radius:0!important;color:#fff!important;background:#17324d!important;display:flex!important;align-items:center!important;justify-content:center!important;flex-direction:row!important;gap:7px!important;box-shadow:none!important;transform:none!important;text-decoration:none!important;font:inherit!important;font-size:11px!important;font-weight:700!important}
      html body .quick-contact .quick-contact-item:nth-child(1) .quick-contact-btn{background:#17324d!important}
      html body .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn{background:#06C755!important}
      html body .quick-contact .quick-contact-item:nth-child(3) .quick-contact-btn{background:#F28C28!important;border-right:0!important}
      html body .quick-contact .quick-contact-btn svg{width:19px!important;height:19px!important;fill:none!important;stroke:#fff!important;stroke-width:1.7!important;stroke-linecap:round!important;stroke-linejoin:round!important;flex:none!important}
      html body .quick-contact .quick-contact-btn .line-detail{stroke-width:1.25!important}
      html body .quick-contact .quick-phone-panel{left:14px!important;right:14px!important;bottom:70px!important;top:auto!important;width:auto!important;max-width:none!important;border-radius:10px!important;opacity:0!important;visibility:hidden!important;transform:translateY(8px)!important}
      html body .quick-contact .quick-contact-item.is-open .quick-phone-panel{opacity:1!important;visibility:visible!important;transform:none!important}
      html body .mobile-contact-bar,html body .mobile-contact-phone{display:none!important}
      html body:not([data-page="admin"]){padding-bottom:58px!important}
    }`;
    document.head.appendChild(s);
  }
  function applyCards(){
    const hidden=hiddenIds();
    $$('a[href*="product.html?id="]').forEach(a=>{
      const id=idFromHref(a.getAttribute('href')||'');if(!id)return;
      const off=hidden.has(id);
      const card=a.closest('.product-card')||a.closest('.hero-rotate-card')||a.closest('.hero-rotate-side')||a;
      if(card){const next=off?'none':'';if(card.style.display!==next)card.style.display=next}
    });
  }
  function applyProductsPage(){
    if(document.body.dataset.page!=='products')return;
    const d=current(),f=activeFilters();
    const list=(d.products||[]).filter(p=>p.published!==false&&(f.category==='all'||p.category===f.category)&&(f.brand==='all'||p.brand===f.brand));
    const count=$('#productCount');if(count){const text=`${list.length} 項產品`;if(count.textContent!==text)count.textContent=text}
    $$('#brandTabs .brand-chip').forEach(a=>{
      const u=new URL(a.href,location.href),brand=u.searchParams.get('brand')||'all';if(brand==='all'){if(a.style.display)a.style.display='';return}
      const has=(d.products||[]).some(p=>p.published!==false&&p.brand===brand&&(f.category==='all'||p.category===f.category));const next=has?'':'none';if(a.style.display!==next)a.style.display=next;
    });
    const grid=$('#productGrid');if(grid){const visible=$$('.product-card',grid).filter(x=>getComputedStyle(x).display!=='none');let empty=$('#publishedProductEmpty',grid);if(!visible.length&&!empty){empty=document.createElement('div');empty.id='publishedProductEmpty';empty.className='empty-state wide';empty.innerHTML='<b>目前沒有公開展示的產品</b><span>可切換其他分類或品牌查看，或直接聯絡我們協助確認。</span>';grid.appendChild(empty)}else if(visible.length&&empty)empty.remove()}
  }
  function applyProductPage(){
    if(document.body.dataset.page!=='product')return;
    const id=new URLSearchParams(location.search).get('id')||'';if(!id||!hiddenIds().has(id))return;
    const main=$('main');if(!main||main.dataset.unpublishedHandled)return;main.dataset.unpublishedHandled='1';
    main.innerHTML='<section class="section"><div class="container"><div class="empty-state wide" style="padding:48px 24px"><b>此產品目前暫不提供公開瀏覽</b><span>如需確認產品規格、替代機型或供貨資訊，萬里資訊可協助您進一步確認。</span><div class="product-actions" style="margin-top:18px"><a class="btn btn-primary" href="products.html">返回產品資訊</a><a class="btn btn-secondary" href="contact.html?item=%E7%94%A2%E5%93%81%E8%B3%87%E8%A8%8A%E8%A9%A2%E5%95%8F">聯絡我們</a></div></div></div></section>';
    document.title='產品資訊｜萬里資訊';
  }
  function run(){if(!window.FBStore)return false;applyCards();applyProductsPage();applyProductPage();return true}
  let scheduled=false;
  function scheduleRun(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;run()})}
  function init(){
    installContactStyle();
    run();
    const obs=new MutationObserver(mutations=>{
      if(mutations.some(m=>m.type==='childList'||m.type==='attributes'))scheduleRun();
    });
    obs.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['href']});
    window.addEventListener('farbeyound:datachange',scheduleRun);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
