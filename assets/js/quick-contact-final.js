(function(){
  if(window.__fbQuickContactFinal)return;
  window.__fbQuickContactFinal=true;
  function install(){
    if(document.getElementById('fbQuickContactFinalStyle'))return;
    const style=document.createElement('style');
    style.id='fbQuickContactFinalStyle';
    style.textContent=`
      /* Premium contact rail — compact, high contrast, no content obstruction. */
      @media(min-width:981px){
        .quick-contact{position:fixed!important;right:14px!important;top:50%!important;transform:translateY(-50%)!important;z-index:120!important;display:flex!important;flex-direction:column!important;align-items:center!important;gap:8px!important;padding:0!important;width:auto!important;background:transparent!important;border:0!important;box-shadow:none!important;overflow:visible!important}
        .quick-contact .quick-contact-item{margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important}
        .quick-contact .quick-contact-btn{position:relative!important;width:58px!important;min-width:58px!important;height:58px!important;min-height:58px!important;padding:6px 4px!important;border:0!important;border-radius:14px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important;color:#fff!important;box-shadow:0 7px 18px rgba(16,42,66,.17)!important;overflow:hidden!important;text-decoration:none!important;transition:transform .16s ease,box-shadow .16s ease,filter .16s ease!important}
        .quick-contact .quick-contact-btn:hover{transform:translateY(-2px)!important;filter:brightness(1.035)!important;box-shadow:0 10px 23px rgba(16,42,66,.22)!important}
        .quick-contact .quick-contact-item:nth-child(1) .quick-contact-btn{background:#1688e8!important}
        .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn{background:#06c755!important}
        .quick-contact .quick-contact-item:nth-child(3) .quick-contact-btn{background:#ff7418!important}
        .quick-contact .quick-contact-btn svg,.quick-contact .quick-contact-btn .icon,.quick-contact .quick-contact-btn b{display:none!important}
        .quick-contact .quick-contact-btn span{display:block!important;margin:0!important;color:#fff!important;font-size:10px!important;font-weight:900!important;line-height:1!important;letter-spacing:.04em!important}
        .quick-contact .quick-contact-item:nth-child(1) .quick-contact-btn:before{content:"";width:27px!important;height:27px!important;display:block!important;background:url("assets/images/icons/phone-contact-mark.svg") center/contain no-repeat!important;filter:brightness(0) invert(1)!important}
        .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn:before{content:"";width:28px!important;height:28px!important;display:block!important;background:url("assets/images/icons/line-official-mark.svg") center/contain no-repeat!important}
        .quick-contact .quick-contact-item:nth-child(3) .quick-contact-btn:before{content:"";width:27px!important;height:27px!important;display:block!important;background:url("assets/images/icons/inquiry-contact-mark.svg") center/contain no-repeat!important;filter:brightness(0) invert(1)!important}
        .quick-contact .quick-contact-item[data-back-top]{margin-top:2px!important;width:40px!important}
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn{width:40px!important;min-width:40px!important;height:40px!important;min-height:40px!important;padding:4px!important;border-radius:999px!important;background:#f7fafc!important;border:1px solid #dce5ea!important;color:#647886!important;box-shadow:0 5px 14px rgba(16,42,66,.09)!important;gap:1px!important}
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn b{display:block!important;font-size:10px!important;line-height:1!important;font-weight:800!important}
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn span{font-size:5px!important;color:#647886!important;letter-spacing:.1em!important}
      }

      /* Mobile: premium three-action dock based on the approved mockup. */
      @media(max-width:980px){
        .quick-contact{display:none!important}
        .mobile-contact-bar{position:fixed!important;left:12px!important;right:12px!important;bottom:calc(9px + env(safe-area-inset-bottom))!important;z-index:9999!important;display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:4px!important;padding:4px!important;background:rgba(255,255,255,.97)!important;border:1px solid #d8e3e9!important;border-radius:18px!important;box-shadow:0 12px 34px rgba(16,42,66,.18)!important;overflow:hidden!important;backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important}
        .mobile-contact-bar a,.mobile-contact-bar button{position:relative!important;min-width:0!important;height:68px!important;min-height:68px!important;padding:8px 8px!important;border:0!important;border-radius:14px!important;display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:center!important;gap:9px!important;color:#fff!important;text-decoration:none!important;font:inherit!important;box-shadow:none!important;overflow:hidden!important;transition:transform .15s ease,filter .15s ease!important}
        .mobile-contact-bar a:first-child{background:#1688e8!important}
        .mobile-contact-bar a:nth-child(2){background:#06c755!important}
        .mobile-contact-bar a:nth-child(3){background:#ff7418!important}
        .mobile-contact-bar a:active{transform:scale(.985)!important;filter:brightness(.95)!important}
        .mobile-contact-bar a svg,.mobile-contact-bar a b{display:none!important}
        .mobile-contact-bar a:before{content:"";display:block!important;flex:0 0 30px!important;width:30px!important;height:30px!important;background-position:center!important;background-repeat:no-repeat!important;background-size:contain!important}
        .mobile-contact-bar a:first-child:before{background-image:url("assets/images/icons/phone-contact-mark.svg")!important;filter:brightness(0) invert(1)!important}
        .mobile-contact-bar a:nth-child(2):before{background-image:url("assets/images/icons/line-official-mark.svg")!important}
        .mobile-contact-bar a:nth-child(3):before{background-image:url("assets/images/icons/inquiry-contact-mark.svg")!important;filter:brightness(0) invert(1)!important}
        .mobile-contact-bar a:after{white-space:pre-line;text-align:left;font-weight:900;line-height:1.08;letter-spacing:.02em;color:#fff}
        .mobile-contact-bar a:first-child:after{content:"電話\\A立即聯絡我們";font-size:14px!important}
        .mobile-contact-bar a:nth-child(2):after{content:"LINE\\A線上即時諮詢";font-size:14px!important}
        .mobile-contact-bar a:nth-child(3):after{content:"詢問\\A留下訊息";font-size:14px!important}
        body:not([data-page="admin"]){padding-bottom:calc(92px + env(safe-area-inset-bottom))!important}
        .mobile-contact-phone{position:fixed!important;left:14px!important;right:14px!important;bottom:calc(88px + env(safe-area-inset-bottom))!important;z-index:10000!important;background:rgba(255,255,255,.98)!important;border:1px solid #dce6eb!important;border-radius:16px!important;padding:8px!important;box-shadow:0 18px 48px rgba(17,43,66,.18)!important;display:none!important}
        .mobile-contact-phone.is-open{display:block!important}
        .mobile-contact-phone a{display:flex!important;justify-content:space-between!important;align-items:center!important;padding:13px 12px!important;text-decoration:none!important;color:#17324d!important;border-bottom:1px solid #edf1f3!important}
        .mobile-contact-phone a:last-child{border-bottom:0!important}
        .mobile-contact-phone span{font-size:12px!important;color:#71808d!important}
        .mobile-contact-phone b{font-size:14px!important}
      }
    `;
    document.head.appendChild(style);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
