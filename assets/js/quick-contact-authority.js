/* Public quick-contact authority layer: exactly three stable actions on desktop/mobile. */
(()=>{
  'use strict';
  if(window.__fbQuickContactAuthority)return;
  window.__fbQuickContactAuthority=true;

  const PHONE_SVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.1 3.8 9.7 3c.7-.2 1.4.2 1.7.8l1.2 2.8c.3.6.1 1.3-.1 1.7l-1.5 1.2a14 14 0 0 0 3.8 3.8l1.2-1.5c.4-.5 1.1-.7 1.7-.4l2.8 1.2c.7.3 1 .9.8 1.7l-.8 2.6c-.3.9-1.1 1.5-2 1.5C11 18.4 5.6 13 5.6 6c0-1 .6-1.9 1.5-2.2Z"/></svg>';
  const LINE_SVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 11.1c0-4.1-4.1-7.4-9.1-7.4s-9.1 3.3-9.1 7.4c0 3.7 3.2 6.8 7.6 7.3.3.1.7.2.8.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1.1 1 .6s5.3-3.1 7.2-5.3a6.7 6.7 0 0 0 1.7-5Z"/><path d="M6.8 9v4h2.4M10 9v4M11.4 13V9l2.7 4V9M18.1 9h-2.7v4h2.7M15.4 11h2.3" class="line-detail"/></svg>';
  const MAIL_SVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6.5h16v11H4z"/><path d="m4.8 7.3 7.2 5.5 7.2-5.5"/></svg>';

  const fallbackPhones=[
    {label:'新北',value:'02-82217759'},
    {label:'台南',value:'06-2360139'}
  ];

  function site(){return window.FBStore?.getData?.()?.site||{}}
  function phones(){
    const list=site().phones;
    return Array.isArray(list)&&list.length?list:fallbackPhones;
  }
  function lineUrl(){
    const url=String(site().line||'').trim();
    return /^https:\/\//i.test(url)?url:'https://line.me/R/ti/p/@453haosc';
  }
  function tel(v){return String(v||'').replace(/[^0-9+]/g,'')}

  function installStyle(){
    if(document.getElementById('fbQuickContactAuthorityStyle'))return;
    const s=document.createElement('style');
    s.id='fbQuickContactAuthorityStyle';
    s.textContent=`
      @media(min-width:981px){
        .quick-contact{position:fixed!important;right:0!important;top:52%!important;z-index:88!important;transform:translateY(-50%)!important;display:grid!important;grid-template-columns:58px!important;gap:1px!important;width:58px!important;background:transparent!important;border:0!important;border-radius:10px 0 0 10px!important;overflow:visible!important;box-shadow:0 10px 24px rgba(20,44,66,.16)!important}
        .quick-contact .quick-contact-item{position:relative!important;margin:0!important;padding:0!important;border:0!important;width:58px!important;background:transparent!important}
        .quick-contact .quick-contact-btn{width:58px!important;min-width:58px!important;height:64px!important;min-height:64px!important;margin:0!important;padding:0!important;border:0!important;border-left:1px solid rgba(255,255,255,.24)!important;border-radius:0!important;color:#fff!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important;box-shadow:none!important;transform:none!important;font:inherit!important;text-decoration:none!important;cursor:pointer!important}
        .quick-contact .quick-contact-item:first-child .quick-contact-btn{border-radius:10px 0 0 0!important}
        .quick-contact .quick-contact-item:last-child .quick-contact-btn{border-radius:0 0 0 10px!important}
        .quick-contact .quick-contact-item[data-action="phone"] .quick-contact-btn{background:#17324d!important}
        .quick-contact .quick-contact-item[data-action="line"] .quick-contact-btn{background:#06C755!important}
        .quick-contact .quick-contact-item[data-action="inquiry"] .quick-contact-btn{background:#F28C28!important}
        .quick-contact .quick-contact-btn:hover,.quick-contact .quick-contact-item.is-open>.quick-contact-btn{filter:brightness(.92)!important}
        .quick-contact .quick-contact-btn:focus-visible{outline:2px solid #fff!important;outline-offset:-4px!important}
        .quick-contact .quick-contact-btn svg{width:21px!important;height:21px!important;fill:none!important;stroke:#fff!important;stroke-width:1.7!important;stroke-linecap:round!important;stroke-linejoin:round!important;flex:none!important}
        .quick-contact .quick-contact-btn span{font-size:10px!important;line-height:1.1!important;font-weight:700!important;letter-spacing:.03em!important;color:#fff!important}
        .quick-contact .quick-phone-panel{position:absolute!important;right:67px!important;top:0!important;width:226px!important;background:#fff!important;border:1px solid #dce4e9!important;border-radius:8px!important;padding:10px!important;box-shadow:0 18px 45px rgba(16,42,67,.16)!important;opacity:0!important;visibility:hidden!important;transform:translateX(8px)!important;transition:opacity .16s ease,transform .16s ease,visibility .16s ease!important}
        .quick-contact .quick-contact-item.is-open .quick-phone-panel{opacity:1!important;visibility:visible!important;transform:none!important}
        .quick-contact .quick-phone-panel strong{display:block!important;font-size:13px!important;color:#17324d!important;padding:4px 5px 8px!important}
        .quick-contact .quick-phone-link{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:10px!important;padding:10px 9px!important;border-top:1px solid #edf1f3!important;color:#334e63!important;text-decoration:none!important;background:#fff!important}
        .quick-contact .quick-phone-link span{font-size:11px!important;color:#71808d!important}.quick-contact .quick-phone-link b{font-size:13px!important;color:#17324d!important}
        .fb-mobile-quick{display:none!important}
      }
      @media(max-width:980px){
        .quick-contact{display:none!important}.fb-mobile-quick{display:none!important}
        .mobile-contact-bar{position:fixed!important;left:0!important;right:0!important;bottom:0!important;z-index:90!important;display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:0!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:0 -8px 26px rgba(18,46,70,.10)!important;padding:0 0 env(safe-area-inset-bottom)!important;overflow:visible!important}
        .mobile-contact-bar .mobile-contact-item{min-height:58px!important;height:58px!important;margin:0!important;padding:0!important;border:0!important;border-right:1px solid rgba(255,255,255,.25)!important;border-radius:0!important;color:#fff!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;font:inherit!important;font-size:11px!important;font-weight:700!important;box-shadow:none!important;transform:none!important;text-decoration:none!important;cursor:pointer!important}
        .mobile-contact-bar .mobile-contact-item[data-action="phone"]{background:#17324d!important}
        .mobile-contact-bar .mobile-contact-item[data-action="line"]{background:#06C755!important}
        .mobile-contact-bar .mobile-contact-item[data-action="inquiry"]{background:#F28C28!important}
        .mobile-contact-bar .mobile-contact-item:last-child{border-right:0!important}
        .mobile-contact-bar svg{width:19px!important;height:19px!important;fill:none!important;stroke:#fff!important;stroke-width:1.7!important;stroke-linecap:round!important;stroke-linejoin:round!important;flex:none!important}.mobile-contact-bar .line-detail{stroke-width:1.25!important}
        .mobile-contact-phone{position:fixed!important;left:14px!important;right:14px!important;bottom:calc(70px + env(safe-area-inset-bottom))!important;z-index:91!important;background:#fff!important;border:1px solid #dce4e9!important;border-radius:10px!important;padding:8px!important;box-shadow:0 18px 48px rgba(17,43,66,.2)!important;display:none!important}.mobile-contact-phone.is-open{display:block!important}
        .mobile-contact-phone a{display:flex!important;justify-content:space-between!important;align-items:center!important;padding:13px 12px!important;text-decoration:none!important;color:#17324d!important;border-bottom:1px solid #edf1f3!important}.mobile-contact-phone a:last-child{border-bottom:0!important}.mobile-contact-phone span{font-size:12px!important;color:#71808d!important}.mobile-contact-phone b{font-size:14px!important;color:#17324d!important}
        body:not([data-page="admin"]){padding-bottom:calc(58px + env(safe-area-inset-bottom))!important}
      }`;
    document.head.appendChild(s);
  }

  function fillPhonePanel(panel){
    const list=phones();
    const signature=list.map(p=>`${p.label||''}|${p.value||''}`).join(';');
    if(panel.dataset.authorityPhones===signature)return;
    panel.innerHTML='';
    const title=document.createElement('strong');
    title.textContent='電話聯絡';
    panel.appendChild(title);
    list.forEach(p=>{
      const a=document.createElement('a');
      a.className='quick-phone-link';
      a.href='tel:'+tel(p.value);
      const s=document.createElement('span');
      s.textContent=(p.label||'')+'辦公室';
      const b=document.createElement('b');
      b.textContent=String(p.value||'');
      a.append(s,b);
      panel.appendChild(a);
    });
    panel.dataset.authorityPhones=signature;
  }

  function desktopIsCanonical(rail){
    const items=[...rail.children].filter(x=>x.classList?.contains('quick-contact-item'));
    return items.length===3&&['phone','line','inquiry'].every((x,i)=>items[i]?.dataset?.action===x);
  }

  function ensureDesktop(){
    if(document.body?.dataset?.page==='admin')return;
    let rail=document.querySelector('.quick-contact');
    if(!rail){
      rail=document.createElement('aside');
      rail.className='quick-contact';
      rail.setAttribute('aria-label','快速聯絡');
      document.body.appendChild(rail);
    }
    if(!desktopIsCanonical(rail)){
      rail.innerHTML=`<div class="quick-contact-item" data-action="phone" data-contact-phone><button type="button" class="quick-contact-btn" aria-expanded="false" aria-label="電話聯絡">${PHONE_SVG}<span>電話</span></button><div class="quick-phone-panel"></div></div><div class="quick-contact-item" data-action="line"><a class="quick-contact-btn" href="${lineUrl()}" target="_blank" rel="noopener" aria-label="LINE 客服">${LINE_SVG}<span>LINE</span></a></div><div class="quick-contact-item" data-action="inquiry"><a class="quick-contact-btn" href="contact.html#inquiryForm" aria-label="線上詢問">${MAIL_SVG}<span>詢問</span></a></div>`;
    }else{
      const line=rail.querySelector('[data-action="line"] a');
      if(line)line.href=lineUrl();
    }
    const phoneItem=rail.querySelector('[data-action="phone"]');
    const phoneBtn=phoneItem?.querySelector('button');
    const panel=phoneItem?.querySelector('.quick-phone-panel');
    if(panel)fillPhonePanel(panel);
    if(phoneItem&&phoneBtn&&!phoneBtn.dataset.authorityBound){
      phoneBtn.dataset.authorityBound='1';
      const close=()=>{phoneItem.classList.remove('is-open');phoneBtn.setAttribute('aria-expanded','false')};
      phoneBtn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const open=!phoneItem.classList.contains('is-open');close();if(open){phoneItem.classList.add('is-open');phoneBtn.setAttribute('aria-expanded','true')}});
      phoneItem.addEventListener('mouseenter',()=>{phoneItem.classList.add('is-open');phoneBtn.setAttribute('aria-expanded','true')});
      phoneItem.addEventListener('mouseleave',close);
    }
  }

  function mobileIsCanonical(bar){
    const items=[...bar.children].filter(x=>x.classList?.contains('mobile-contact-item'));
    return items.length===3&&['phone','line','inquiry'].every((x,i)=>items[i]?.dataset?.action===x);
  }

  function ensureMobile(){
    if(document.body?.dataset?.page==='admin')return;
    document.querySelectorAll('.fb-mobile-quick').forEach(x=>x.remove());
    let bar=document.querySelector('.mobile-contact-bar');
    if(!bar){
      bar=document.createElement('nav');
      bar.className='mobile-contact-bar';
      bar.setAttribute('aria-label','快速聯絡');
      document.body.appendChild(bar);
    }
    if(!mobileIsCanonical(bar)){
      bar.innerHTML=`<button class="mobile-contact-item" data-action="phone" type="button" data-mobile-phone aria-expanded="false">${PHONE_SVG}<span>撥打電話</span></button><a class="mobile-contact-item" data-action="line" href="${lineUrl()}" target="_blank" rel="noopener">${LINE_SVG}<span>LINE 詢問</span></a><a class="mobile-contact-item" data-action="inquiry" href="contact.html#inquiryForm">${MAIL_SVG}<span>線上詢問</span></a>`;
    }else{
      const line=bar.querySelector('[data-action="line"]');
      if(line)line.href=lineUrl();
    }
    let panel=document.querySelector('.mobile-contact-phone');
    if(!panel){
      panel=document.createElement('div');
      panel.className='mobile-contact-phone';
      document.body.appendChild(panel);
    }
    const list=phones();
    const signature=list.map(p=>`${p.label||''}|${p.value||''}`).join(';');
    if(panel.dataset.authorityPhones!==signature){
      panel.innerHTML='';
      list.forEach(p=>{
        const a=document.createElement('a');
        a.href='tel:'+tel(p.value);
        const s=document.createElement('span');
        s.textContent=(p.label||'')+'辦公室';
        const b=document.createElement('b');
        b.textContent=String(p.value||'');
        a.append(s,b);
        panel.appendChild(a);
      });
      panel.dataset.authorityPhones=signature;
    }
    const btn=bar.querySelector('[data-mobile-phone]');
    if(btn&&!btn.dataset.authorityBound){
      btn.dataset.authorityBound='1';
      btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const open=panel.classList.toggle('is-open');btn.setAttribute('aria-expanded',String(open))});
    }
  }

  function isCanonical(){
    if(document.body?.dataset?.page==='admin')return true;
    const rail=document.querySelector('.quick-contact');
    const bar=document.querySelector('.mobile-contact-bar');
    return !!rail&&desktopIsCanonical(rail)&&!!bar&&mobileIsCanonical(bar)&&!document.querySelector('.fb-mobile-quick');
  }

  let applying=false;
  function apply(){
    if(applying||document.body?.dataset?.page==='admin')return;
    applying=true;
    installStyle();
    ensureDesktop();
    ensureMobile();
    applying=false;
  }

  function boot(){
    apply();
    const observer=new MutationObserver(()=>{
      if(!applying&&!isCanonical())apply();
    });
    observer.observe(document.body,{childList:true,subtree:true});
    document.addEventListener('click',e=>{
      document.querySelectorAll('.quick-contact-item.is-open').forEach(x=>{if(!x.contains(e.target)){x.classList.remove('is-open');x.querySelector('button')?.setAttribute('aria-expanded','false')}});
      const panel=document.querySelector('.mobile-contact-phone');
      if(panel?.classList.contains('is-open')&&!panel.contains(e.target)&&!e.target.closest('[data-mobile-phone]')){
        panel.classList.remove('is-open');
        document.querySelector('[data-mobile-phone]')?.setAttribute('aria-expanded','false');
      }
    });
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
  window.addEventListener('farbeyound:datachange',apply);
})();
