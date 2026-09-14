/* Public quick-contact authority layer.
 * The public site has legacy feature-control code that rebuilds the contact rail.
 * Keep the original final-fixes contact UI authoritative after every rebuild.
 */
(()=>{
  'use strict';
  if(window.__fbQuickContactAuthority)return;
  window.__fbQuickContactAuthority=true;

  const PHONE_SVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.1 3.8 9.7 3c.7-.2 1.4.2 1.7.8l1.2 2.8c.3.6.1 1.3-.1 1.7l-1.5 1.2a14 14 0 0 0 3.8 3.8l1.2-1.5c.4-.5 1.1-.7 1.7-.4l2.8 1.2c.7.3 1 .9.8 1.7l-.8 2.6c-.3.9-1.1 1.5-2 1.5C11 18.4 5.6 13 5.6 6c0-1 .6-1.9 1.5-2.2Z"/></svg>';
  const LINE_SVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 11.1c0-4.1-4.1-7.4-9.1-7.4s-9.1 3.3-9.1 7.4c0 3.7 3.2 6.8 7.6 7.3.3.1.7.2.8.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1.1 1 .6s5.3-3.1 7.2-5.3a6.7 6.7 0 0 0 1.7-5Z"/><path d="M6.8 9v4h2.4M10 9v4M11.4 13V9l2.7 4V9M18.1 9h-2.7v4h2.7M15.4 11h2.3" class="line-detail"/></svg>';
  const MAIL_SVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6.5h16v11H4z"/><path d="m4.8 7.3 7.2 5.5 7.2-5.5"/></svg>';

  function phones(){
    const site=window.FBStore?.getData?.()?.site||{};
    return Array.isArray(site.phones)&&site.phones.length?site.phones:[{label:'新北',value:'02-82217759'},{label:'台南',value:'06-2360139'}];
  }
  function tel(v){return String(v||'').replace(/[^0-9+]/g,'')}

  function installStyle(){
    let s=document.getElementById('fbQuickContactAuthorityStyle');
    if(s)return;
    s=document.createElement('style');
    s.id='fbQuickContactAuthorityStyle';
    s.textContent=`
      @media(min-width:981px){
        .quick-contact{position:fixed!important;right:0!important;top:52%!important;z-index:88!important;transform:translateY(-50%)!important;display:grid!important;gap:1px!important;width:auto!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;filter:drop-shadow(0 10px 24px rgba(20,44,66,.16))!important}
        .quick-contact .quick-contact-item{position:relative!important;margin:0!important;padding:0!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important}
        .quick-contact .quick-contact-btn{width:58px!important;min-width:58px!important;height:64px!important;min-height:64px!important;margin:0!important;padding:0!important;border:0!important;border-left:1px solid #dbe3e8!important;border-radius:0!important;background:rgba(255,255,255,.97)!important;color:#17324d!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important;box-shadow:none!important;transform:none!important;font:inherit!important}
        .quick-contact .quick-contact-item:first-child .quick-contact-btn{border-radius:8px 0 0 0!important}
        .quick-contact .quick-contact-item:last-child .quick-contact-btn{border-radius:0 0 0 8px!important}
        .quick-contact .quick-contact-btn:hover,.quick-contact .quick-contact-item.is-open>.quick-contact-btn{background:#17324d!important;color:#fff!important;border-color:#17324d!important}
        .quick-contact .quick-contact-btn svg{width:21px!important;height:21px!important;fill:none!important;stroke:currentColor!important;stroke-width:1.7!important;stroke-linecap:round!important;stroke-linejoin:round!important}
        .quick-contact .quick-contact-btn b{font-size:10px!important;line-height:1.1!important;font-weight:700!important;letter-spacing:.03em!important}
        .quick-contact .quick-contact-btn small{font-size:10px!important;line-height:1.1!important;font-weight:700!important;letter-spacing:.03em!important}
        .quick-contact .quick-phone-panel{right:67px!important;top:0!important}
        .fb-mobile-quick{display:none!important}
      }
      @media(max-width:980px){
        .quick-contact{display:none!important}
        .fb-mobile-quick{display:none!important}
        .mobile-contact-bar{position:fixed!important;left:0!important;right:0!important;bottom:0!important;z-index:90!important;display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:0!important;background:rgba(255,255,255,.98)!important;border-top:1px solid #dce4e9!important;border-left:0!important;border-right:0!important;border-bottom:0!important;border-radius:0!important;box-shadow:0 -8px 26px rgba(18,46,70,.10)!important;padding:0 0 env(safe-area-inset-bottom)!important;overflow:visible!important}
        .mobile-contact-bar a,.mobile-contact-bar button{min-height:58px!important;height:58px!important;margin:0!important;padding:0!important;border:0!important;border-right:1px solid #e4e9ed!important;border-radius:0!important;background:transparent!important;color:#17324d!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;font:inherit!important;font-size:11px!important;font-weight:700!important;box-shadow:none!important;transform:none!important}
        .mobile-contact-bar a:last-child{border-right:0!important}
        .mobile-contact-bar svg{width:19px!important;height:19px!important;fill:none!important;stroke:currentColor!important;stroke-width:1.7!important;stroke-linecap:round!important;stroke-linejoin:round!important}
        body:not([data-page="admin"]){padding-bottom:calc(58px + env(safe-area-inset-bottom))!important}
      }
    `;
    document.head.appendChild(s);
  }

  function buildMobile(){
    if(document.body?.dataset?.page==='admin')return;
    document.querySelectorAll('.fb-mobile-quick').forEach(x=>x.remove());
    let bar=document.querySelector('.mobile-contact-bar');
    if(!bar){
      bar=document.createElement('nav');
      bar.className='mobile-contact-bar';
      bar.setAttribute('aria-label','快速聯絡');
      bar.innerHTML='<button type="button" data-mobile-phone aria-expanded="false">'+PHONE_SVG+'<span>撥打電話</span></button><a href="https://line.me/R/ti/p/@453haosc" target="_blank" rel="noopener">'+LINE_SVG+'<span>LINE 詢問</span></a><a href="contact.html#inquiryForm">'+MAIL_SVG+'<span>線上詢問</span></a>';
      document.body.appendChild(bar);
    }
    let panel=document.querySelector('.mobile-contact-phone');
    if(!panel){panel=document.createElement('div');panel.className='mobile-contact-phone';document.body.appendChild(panel)}
    panel.innerHTML=phones().map(p=>'<a href="tel:'+tel(p.value)+'"><span>'+(p.label||'')+'辦公室</span><b>'+String(p.value||'')+'</b></a>').join('');
    const btn=bar.querySelector('[data-mobile-phone]');
    if(btn&&!btn.dataset.authorityBound){
      btn.dataset.authorityBound='1';
      btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const open=panel.classList.toggle('is-open');btn.setAttribute('aria-expanded',String(open))});
    }
  }

  function normalizeDesktop(){
    const rail=document.querySelector('.quick-contact');
    if(!rail)return;
    rail.querySelectorAll('.quick-contact-btn').forEach(btn=>{
      btn.style.setProperty('background','rgba(255,255,255,.97)','important');
      btn.style.setProperty('color','#17324d','important');
      btn.style.setProperty('width','58px','important');
      btn.style.setProperty('min-width','58px','important');
      btn.style.setProperty('height','64px','important');
      btn.style.setProperty('min-height','64px','important');
      btn.style.setProperty('border-radius','0','important');
      btn.style.setProperty('display','flex','important');
      btn.style.setProperty('flex-direction','column','important');
      btn.style.setProperty('align-items','center','important');
      btn.style.setProperty('justify-content','center','important');
      btn.style.setProperty('gap','5px','important');
      btn.style.setProperty('box-shadow','none','important');
    });
    const items=rail.querySelectorAll('.quick-contact-item');
    items[0]?.querySelector('.quick-contact-btn')?.style.setProperty('border-radius','8px 0 0 0','important');
    items[items.length-1]?.querySelector('.quick-contact-btn')?.style.setProperty('border-radius','0 0 0 8px','important');
  }

  function apply(){installStyle();buildMobile();normalizeDesktop()}
  const observer=new MutationObserver(()=>{clearTimeout(window.__fbQuickAuthorityTimer);window.__fbQuickAuthorityTimer=setTimeout(apply,30)});
  function boot(){apply();[180,650,1100,1600,2400].forEach(t=>setTimeout(apply,t));observer.observe(document.body,{childList:true,subtree:true})}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
  window.addEventListener('load',()=>setTimeout(apply,200),{once:true});
  window.addEventListener('farbeyound:datachange',()=>setTimeout(apply,100));
})();
