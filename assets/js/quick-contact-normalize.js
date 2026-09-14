/* Canonical public quick-contact styling.
 * Keep the original compact white/navy contact UI authoritative on every public page.
 * This intentionally overrides legacy visual layers without changing contact behavior.
 */
(function(){
  'use strict';
  if(window.__fbQuickContactNormalize)return;
  window.__fbQuickContactNormalize=true;

  function install(){
    let style=document.getElementById('fbQuickContactNormalize');
    if(!style){
      style=document.createElement('style');
      style.id='fbQuickContactNormalize';
      document.head.appendChild(style);
    }
    style.textContent=`
      @media(min-width:981px){
        .quick-contact{
          position:fixed!important;right:0!important;top:52%!important;z-index:88!important;
          transform:translateY(-50%)!important;display:grid!important;grid-template-columns:1fr!important;
          gap:1px!important;padding:0!important;border:0!important;border-radius:0!important;
          overflow:visible!important;background:transparent!important;box-shadow:none!important;
          filter:drop-shadow(0 10px 24px rgba(20,44,66,.16))!important;
        }
        .quick-contact-item{
          position:relative!important;margin:0!important;padding:0!important;border:0!important;
          border-radius:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important;
        }
        .quick-contact-item+.quick-contact-item{border-top:0!important}
        .quick-contact-btn{
          width:58px!important;min-width:58px!important;height:64px!important;min-height:64px!important;
          margin:0!important;padding:0!important;border:0!important;border-left:1px solid #dbe3e8!important;
          border-radius:0!important;background:rgba(255,255,255,.97)!important;color:#17324d!important;
          display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;
          gap:5px!important;box-shadow:none!important;transform:none!important;transition:.18s ease!important;
        }
        .quick-contact-item:first-child .quick-contact-btn{border-radius:8px 0 0 0!important}
        .quick-contact-item:last-child .quick-contact-btn{border-radius:0 0 0 8px!important}
        .quick-contact-btn:hover,.quick-contact-item.is-open>.quick-contact-btn{
          background:#17324d!important;color:#fff!important;border-color:#17324d!important;
        }
        .quick-contact-btn svg{width:21px!important;height:21px!important;fill:none!important;stroke:currentColor!important;
          stroke-width:1.7!important;stroke-linecap:round!important;stroke-linejoin:round!important;display:block!important}
        .quick-contact-btn span{font-size:10px!important;line-height:1.1!important;font-weight:700!important;letter-spacing:.03em!important}
        .quick-contact .quick-phone-panel{right:67px!important;top:0!important}
        .quick-contact-item[data-back-top] .quick-contact-btn{width:58px!important;min-width:58px!important;height:64px!important;min-height:64px!important;border-radius:0!important}
      }
      @media(max-width:980px){
        .quick-contact{display:none!important}
        .mobile-contact-bar{
          position:fixed!important;left:0!important;right:0!important;bottom:0!important;z-index:90!important;
          display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:0!important;
          background:rgba(255,255,255,.98)!important;border-top:1px solid #dce4e9!important;
          border-left:0!important;border-right:0!important;border-bottom:0!important;border-radius:0!important;
          box-shadow:0 -8px 26px rgba(18,46,70,.10)!important;padding:0 0 env(safe-area-inset-bottom)!important;
          overflow:visible!important;backdrop-filter:none!important;
        }
        .mobile-contact-bar a,.mobile-contact-bar button{
          min-height:58px!important;height:58px!important;margin:0!important;padding:0!important;
          border:0!important;border-right:1px solid #e4e9ed!important;border-radius:0!important;
          background:transparent!important;color:#17324d!important;display:flex!important;align-items:center!important;
          justify-content:center!important;gap:7px!important;font:inherit!important;font-size:11px!important;font-weight:700!important;
          box-shadow:none!important;transform:none!important;
        }
        .mobile-contact-bar a:last-child{border-right:0!important}
        .mobile-contact-bar svg{width:19px!important;height:19px!important;fill:none!important;stroke:currentColor!important;
          stroke-width:1.7!important;stroke-linecap:round!important;stroke-linejoin:round!important;display:block!important}
        .mobile-contact-phone{left:14px!important;right:14px!important;bottom:calc(70px + env(safe-area-inset-bottom))!important;
          border-radius:10px!important}
        body:not([data-page="admin"]){padding-bottom:calc(58px + env(safe-area-inset-bottom))!important}
      }
    `;
  }

  function boot(){install();setTimeout(install,0);setTimeout(install,250);setTimeout(install,900)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
  window.addEventListener('load',()=>setTimeout(install,120),{once:true});
  window.addEventListener('farbeyound:datachange',()=>setTimeout(install,80));
})();
