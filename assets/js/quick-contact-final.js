(function(){
  if(window.__fbQuickContactFinal)return;
  window.__fbQuickContactFinal=true;
  function install(){
    if(document.getElementById('fbQuickContactFinalStyle'))return;
    const style=document.createElement('style');
    style.id='fbQuickContactFinalStyle';
    style.textContent=`
      @media(min-width:981px){
        .quick-contact .quick-contact-btn{width:86px!important;min-width:86px!important;height:86px!important;min-height:86px!important;padding:9px 7px!important;gap:7px!important}
        .quick-contact .quick-contact-btn svg,.quick-contact .quick-contact-btn .icon{width:34px!important;height:34px!important;flex-basis:34px!important}
        .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn::before{width:36px!important;height:36px!important;flex-basis:36px!important}
        .quick-contact .quick-contact-btn span{font-size:15px!important;font-weight:800!important}
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn{width:48px!important;min-width:48px!important;height:48px!important;min-height:48px!important}
      }
      @media(max-width:980px){
        .mobile-contact-bar a,.mobile-contact-bar button{min-height:62px!important;gap:8px!important;font-size:13px!important;font-weight:800!important}
        .mobile-contact-bar svg{width:26px!important;height:26px!important}
        .mobile-contact-bar a:nth-child(2)::before{width:28px!important;height:28px!important;flex-basis:28px!important}
      }
    `;
    document.head.appendChild(style);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
