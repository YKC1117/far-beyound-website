(function(){
  if(window.__fbPublicFirstPaint)return;
  window.__fbPublicFirstPaint=true;

  const style=document.createElement('style');
  style.id='fbPublicFirstPaintStyle';
  style.textContent=`
    /* Public pages must never be fully masked. Keep them visible while shared JS enhances the shell. */
    body:not([data-page="admin"]){visibility:visible!important;opacity:1!important;transition:none!important}
    body:not([data-page="admin"]):not(.fb-public-stable){visibility:visible!important;opacity:1!important}
    body.fb-public-stable{visibility:visible!important;opacity:1!important}

    /* First-paint geometry for the floating contact rail. */
    @media(min-width:981px){
      body:not([data-page="admin"]) .quick-contact{
        position:fixed!important;right:22px!important;top:50%!important;
        transform:translateY(-50%)!important;z-index:120!important;
        display:flex!important;flex-direction:column!important;align-items:center!important;
        gap:10px!important;padding:10px!important;width:94px!important;
        box-sizing:border-box!important;background:rgba(247,250,252,.76)!important;
        border:1px solid rgba(207,219,226,.9)!important;border-radius:25px!important;
        box-shadow:0 18px 46px rgba(17,43,66,.12)!important;
        backdrop-filter:blur(18px)!important;-webkit-backdrop-filter:blur(18px)!important;
      }
      body:not([data-page="admin"]) .quick-contact .quick-contact-item{margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important}
      body:not([data-page="admin"]) .quick-contact .quick-contact-btn{
        width:72px!important;height:72px!important;min-width:72px!important;min-height:72px!important;
        display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;
        gap:6px!important;padding:8px!important;border:1px solid #dce6eb!important;border-radius:17px!important;
        background:#fff!important;color:#284c63!important;box-shadow:0 6px 18px rgba(17,43,66,.08)!important;
      }
      body:not([data-page="admin"]) .quick-contact .quick-contact-btn svg{width:27px!important;height:27px!important;flex:0 0 27px!important}
      body:not([data-page="admin"]) .quick-contact .quick-contact-btn span{font-size:12px!important;line-height:1!important;font-weight:800!important;letter-spacing:.08em!important}
      body:not([data-page="admin"]) .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn svg{display:none!important}
      body:not([data-page="admin"]) .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn::before{content:"";display:block;width:31px!important;height:31px!important;flex:0 0 31px!important;background:url("assets/images/icons/line-official-mark.svg") center/contain no-repeat!important}
      body:not([data-page="admin"]) .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn b{display:none!important}
      body:not([data-page="admin"]) .quick-contact .quick-contact-item[data-back-top]{margin-top:2px!important;padding-top:9px!important;border-top:1px solid rgba(190,205,214,.65)!important}
      body:not([data-page="admin"]) .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn{width:48px!important;height:48px!important;min-width:48px!important;min-height:48px!important;border-radius:999px!important;background:rgba(249,252,253,.9)!important;color:#728694!important;box-shadow:0 4px 12px rgba(17,43,66,.06)!important;gap:2px!important}
      body:not([data-page="admin"]) .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn b{font-size:12px!important;line-height:1!important}
      body:not([data-page="admin"]) .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn span{font-size:7px!important;line-height:1!important;letter-spacing:.12em!important}
    }
  `;
  document.head.appendChild(style);

  function reveal(){
    const body=document.body;
    if(!body||body.dataset.page==='admin')return;
    requestAnimationFrame(()=>body.classList.add('fb-public-stable'));
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',()=>setTimeout(reveal,180),{once:true});
  }else{
    setTimeout(reveal,180);
  }
  window.addEventListener('load',()=>setTimeout(reveal,120),{once:true});
})();
