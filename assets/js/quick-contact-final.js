(function(){
  if(window.__fbQuickContactFinal)return;
  window.__fbQuickContactFinal=true;
  function install(){
    if(document.getElementById('fbQuickContactFinalStyle'))return;
    const style=document.createElement('style');
    style.id='fbQuickContactFinalStyle';
    style.textContent=`
      /* Premium desktop contact rail — independent floating cards */
      @media(min-width:981px){
        .quick-contact{
          position:fixed!important;right:24px!important;top:50%!important;transform:translateY(-50%)!important;
          z-index:120!important;display:flex!important;flex-direction:column!important;align-items:center!important;gap:12px!important;
          padding:0!important;width:auto!important;background:transparent!important;border:0!important;box-shadow:none!important;
          backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:visible!important;
        }
        .quick-contact .quick-contact-item{margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important}
        .quick-contact .quick-contact-btn{
          position:relative!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;
          width:82px!important;min-width:82px!important;height:82px!important;min-height:82px!important;margin:0!important;padding:10px 6px!important;
          border:1px solid rgba(215,226,232,.92)!important;border-radius:18px!important;background:rgba(255,255,255,.97)!important;
          color:#294c62!important;box-shadow:0 12px 30px rgba(17,43,66,.11),0 2px 7px rgba(17,43,66,.05)!important;overflow:hidden!important;
          gap:7px!important;transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease,color .2s ease!important;
        }
        .quick-contact .quick-contact-btn:hover,.quick-contact .quick-contact-btn:focus-visible{
          transform:translateY(-4px)!important;border-color:#b9d5df!important;background:#fff!important;color:#087b91!important;
          box-shadow:0 17px 36px rgba(17,43,66,.16),0 3px 9px rgba(17,43,66,.06)!important;
        }
        .quick-contact .quick-contact-btn:focus-visible{outline:2px solid rgba(13,135,158,.22)!important;outline-offset:4px!important}
        .quick-contact .quick-contact-btn svg,.quick-contact .quick-contact-btn .icon{width:30px!important;height:30px!important;flex:0 0 30px!important;color:currentColor!important}
        .quick-contact .quick-contact-btn span{display:block!important;line-height:1!important;font-size:13px!important;font-weight:800!important;letter-spacing:.08em!important;color:currentColor!important}
        .quick-contact .quick-contact-item[data-contact-phone] .quick-contact-btn svg{width:29px!important;height:29px!important}

        /* LINE：使用單一官方圖樣，禁止重複英文字母。 */
        .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn svg{display:none!important}
        .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn::before{
          content:"";width:35px!important;height:35px!important;flex:0 0 35px!important;display:block!important;
          background:url("assets/images/icons/line-official-mark.svg") center/contain no-repeat!important;
        }
        .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn b{display:none!important}

        /* TOP：獨立、縮小，不與三個主要入口競爭。 */
        .quick-contact .quick-contact-item[data-back-top]{margin-top:4px!important;padding-top:12px!important;border-top:1px solid #dce5ea!important;border-radius:0!important;width:48px!important}
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn{
          width:48px!important;min-width:48px!important;height:48px!important;min-height:48px!important;padding:5px!important;
          border-radius:999px!important;border-color:#dce6eb!important;background:#f8fafb!important;color:#718493!important;
          box-shadow:0 7px 18px rgba(17,43,66,.07)!important;gap:1px!important;
        }
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn:hover,.quick-contact .quick-contact-item[data-back-top] .quick-contact-btn:focus-visible{
          transform:none!important;color:#486778!important;background:#fff!important;box-shadow:0 9px 20px rgba(17,43,66,.10)!important
        }
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn b{font-size:12px!important;line-height:1!important;font-weight:800!important}
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn span{font-size:7px!important;line-height:1!important;letter-spacing:.12em!important}
      }

      /* Mobile：固定底部維持輕量三入口，並預留頁面底部空間。 */
      @media(max-width:980px){
        .quick-contact{display:none!important}
        .mobile-contact-bar{
          position:fixed!important;left:12px!important;right:12px!important;bottom:10px!important;z-index:120!important;
          display:grid!important;grid-template-columns:repeat(3,1fr)!important;padding:5px!important;background:rgba(255,255,255,.96)!important;
          border:1px solid rgba(203,216,224,.95)!important;border-radius:18px!important;box-shadow:0 12px 34px rgba(17,43,66,.14)!important;
          backdrop-filter:blur(16px)!important;-webkit-backdrop-filter:blur(16px)!important
        }
        .mobile-contact-bar a,.mobile-contact-bar button{
          min-height:54px!important;border:0!important;border-right:1px solid #e5ecef!important;border-radius:13px!important;background:transparent!important;
          color:#294c62!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;text-decoration:none!important;
          font:inherit!important;font-size:12px!important;font-weight:800!important
        }
        .mobile-contact-bar a:last-child{border-right:0!important}.mobile-contact-bar a:active{background:#f2f8f9!important}
        .mobile-contact-bar svg{width:22px!important;height:22px!important;fill:none!important;stroke:currentColor!important;stroke-width:1.8!important;stroke-linecap:round!important;stroke-linejoin:round!important}
        .mobile-contact-bar a:nth-child(2) svg{display:none!important}
        .mobile-contact-bar a:nth-child(2)::before{content:"";width:24px!important;height:24px!important;display:block!important;flex:0 0 24px!important;background:url("assets/images/icons/line-official-mark.svg") center/contain no-repeat!important}
        .mobile-contact-phone{position:fixed!important;left:14px!important;right:14px!important;bottom:calc(78px + env(safe-area-inset-bottom))!important;z-index:121!important;background:rgba(255,255,255,.98)!important;border:1px solid #dce6eb!important;border-radius:16px!important;padding:8px!important;box-shadow:0 18px 48px rgba(17,43,66,.18)!important;display:none!important}
        .mobile-contact-phone.is-open{display:block!important}.mobile-contact-phone a{display:flex!important;justify-content:space-between!important;align-items:center!important;padding:13px 12px!important;text-decoration:none!important;color:#17324d!important;border-bottom:1px solid #edf1f3!important}.mobile-contact-phone a:last-child{border-bottom:0!important}
        .mobile-contact-phone span{font-size:12px!important;color:#71808d!important}.mobile-contact-phone b{font-size:14px!important}
        body:not([data-page="admin"]){padding-bottom:calc(76px + env(safe-area-inset-bottom))!important}
      }
    `;
    document.head.appendChild(style);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
