(function(){
  if(window.__fbQuickContactFinal)return;
  window.__fbQuickContactFinal=true;
  function install(){
    if(document.getElementById('fbQuickContactFinalStyle'))return;
    const style=document.createElement('style');
    style.id='fbQuickContactFinalStyle';
    style.textContent=`
      @media(min-width:981px){
        .quick-contact{position:fixed!important;right:18px!important;top:50%!important;transform:translateY(-50%)!important;z-index:120!important;display:flex!important;flex-direction:column!important;align-items:center!important;gap:10px!important;padding:0!important;width:auto!important;background:transparent!important;border:0!important;box-shadow:none!important;backdrop-filter:none!important;overflow:visible!important}
        .quick-contact .quick-contact-item{margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important}
        .quick-contact .quick-contact-btn{position:relative!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;width:70px!important;min-width:70px!important;height:70px!important;min-height:70px!important;margin:0!important;padding:7px 5px!important;border:0!important;border-radius:15px!important;background:#fff!important;color:#294c62!important;box-shadow:0 8px 22px rgba(17,43,66,.13),0 2px 5px rgba(17,43,66,.05)!important;overflow:hidden!important;gap:5px!important;transition:transform .18s ease,box-shadow .18s ease,filter .18s ease!important}
        .quick-contact .quick-contact-btn:hover,.quick-contact .quick-contact-btn:focus-visible{transform:translateY(-2px)!important;box-shadow:0 12px 26px rgba(17,43,66,.18),0 3px 7px rgba(17,43,66,.06)!important;filter:brightness(1.02)!important}
        .quick-contact .quick-contact-btn:focus-visible{outline:2px solid rgba(13,135,158,.25)!important;outline-offset:3px!important}
        .quick-contact .quick-contact-btn svg,.quick-contact .quick-contact-btn .icon{width:28px!important;height:28px!important;flex:0 0 28px!important;color:currentColor!important}
        .quick-contact .quick-contact-btn span{display:block!important;line-height:1!important;font-size:13px!important;font-weight:800!important;letter-spacing:.04em!important;color:#fff!important}
        .quick-contact .quick-contact-item:nth-child(1) .quick-contact-btn{background:#1688e8!important;color:#fff!important}
        .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn{background:#08b95b!important;color:#fff!important}
        .quick-contact .quick-contact-item:nth-child(3) .quick-contact-btn{background:#ff7418!important;color:#fff!important}
        .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn svg{display:none!important}
        .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn::before{content:"";width:29px!important;height:29px!important;flex:0 0 29px!important;display:block!important;background:url("assets/images/icons/line-official-mark.svg") center/contain no-repeat!important}
        .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn b{display:none!important}
        .quick-contact .quick-contact-item[data-back-top]{margin-top:4px!important;padding-top:10px!important;border-top:0!important;border-radius:0!important;width:44px!important}
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn{width:44px!important;min-width:44px!important;height:44px!important;min-height:44px!important;padding:4px!important;border-radius:999px!important;border:1px solid #e0e8ed!important;background:#f7fafc!important;color:#647886!important;box-shadow:0 6px 16px rgba(17,43,66,.08)!important;gap:1px!important}
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn:hover,.quick-contact .quick-contact-item[data-back-top] .quick-contact-btn:focus-visible{transform:none!important;color:#405f70!important;background:#fff!important;box-shadow:0 8px 18px rgba(17,43,66,.11)!important}
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn b{font-size:11px!important;line-height:1!important;font-weight:800!important}
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn span{font-size:6px!important;line-height:1!important;letter-spacing:.1em!important;color:#647886!important}
      }
      @media(max-width:980px){
        .quick-contact{display:none!important}
        .mobile-contact-bar{position:fixed!important;left:12px!important;right:12px!important;bottom:10px!important;z-index:120!important;display:grid!important;grid-template-columns:repeat(3,1fr)!important;padding:5px!important;background:rgba(255,255,255,.96)!important;border:1px solid rgba(203,216,224,.95)!important;border-radius:18px!important;box-shadow:0 12px 34px rgba(17,43,66,.14)!important;backdrop-filter:blur(16px)!important;-webkit-backdrop-filter:blur(16px)!important}
        .mobile-contact-bar a,.mobile-contact-bar button{min-height:58px!important;border:0!important;border-right:1px solid #e5ecef!important;border-radius:13px!important;background:transparent!important;color:#294c62!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;text-decoration:none!important;font:inherit!important;font-size:13px!important;font-weight:800!important}
        .mobile-contact-bar a:last-child{border-right:0!important}.mobile-contact-bar a:active{background:#f2f8f9!important}
        .mobile-contact-bar svg{width:26px!important;height:26px!important;fill:none!important;stroke:currentColor!important;stroke-width:1.8!important;stroke-linecap:round!important;stroke-linejoin:round!important}
        .mobile-contact-bar a:nth-child(2) svg{display:none!important}
        .mobile-contact-bar a:nth-child(2)::before{content:"";width:28px!important;height:28px!important;display:block!important;flex:0 0 28px!important;background:url("assets/images/icons/line-official-mark.svg") center/contain no-repeat!important}
        .mobile-contact-phone{position:fixed!important;left:14px!important;right:14px!important;bottom:calc(78px + env(safe-area-inset-bottom))!important;z-index:121!important;background:rgba(255,255,255,.98)!important;border:1px solid #dce6eb!important;border-radius:16px!important;padding:8px!important;box-shadow:0 18px 48px rgba(17,43,66,.18)!important;display:none!important}
        .mobile-contact-phone.is-open{display:block!important}.mobile-contact-phone a{display:flex!important;justify-content:space-between!important;align-items:center!important;padding:13px 12px!important;text-decoration:none!important;color:#17324d!important;border-bottom:1px solid #edf1f3!important}.mobile-contact-phone a:last-child{border-bottom:0!important}.mobile-contact-phone span{font-size:12px!important;color:#71808d!important}.mobile-contact-phone b{font-size:14px!important}
        body:not([data-page="admin"]){padding-bottom:calc(80px + env(safe-area-inset-bottom))!important}
      }
    `;
    document.head.appendChild(style);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
