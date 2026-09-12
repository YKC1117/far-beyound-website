(function(){
  if(window.__fbQuickContactPolish)return;
  window.__fbQuickContactPolish=true;

  function install(){
    if(document.getElementById('fbQuickContactPolishStyle'))return;
    const style=document.createElement('style');
    style.id='fbQuickContactPolishStyle';
    style.textContent=`
      @media(min-width:981px){
        .quick-contact{
          background:transparent!important;
          border:0!important;
          border-radius:0!important;
          box-shadow:none!important;
          overflow:visible!important;
          display:flex!important;
          flex-direction:column!important;
          gap:9px!important;
          padding:0!important;
        }
        .quick-contact .quick-contact-item{
          margin:0!important;
          padding:0!important;
          border:0!important;
          border-radius:12px!important;
          background:transparent!important;
          box-shadow:none!important;
          overflow:visible!important;
        }
        .quick-contact .quick-contact-item+.quick-contact-item{
          border-top:0!important;
        }
        .quick-contact .quick-contact-btn{
          display:flex!important;
          width:62px!important;
          min-width:62px!important;
          height:62px!important;
          min-height:62px!important;
          margin:0!important;
          padding:7px 5px!important;
          border:1px solid #d7e2e8!important;
          border-radius:12px!important;
          background:#fff!important;
          color:#264b63!important;
          box-shadow:0 7px 20px rgba(22,55,78,.09)!important;
          overflow:hidden!important;
          transition:transform .16s ease,border-color .16s ease,background .16s ease,color .16s ease,box-shadow .16s ease!important;
        }
        .quick-contact .quick-contact-btn:hover,
        .quick-contact .quick-contact-btn:focus-visible{
          transform:translateY(-2px)!important;
          border-color:#9fc1cf!important;
          background:#f7fbfc!important;
          color:#0f7690!important;
          box-shadow:0 11px 26px rgba(22,55,78,.14)!important;
        }
        .quick-contact .quick-contact-btn:focus-visible{
          outline:2px solid rgba(21,149,177,.35)!important;
          outline-offset:3px!important;
        }
        .quick-contact .quick-contact-btn svg,
        .quick-contact .quick-contact-btn .icon{
          flex:0 0 auto!important;
        }
        .quick-contact .quick-contact-btn span{
          line-height:1.12!important;
        }
        .quick-contact .quick-contact-item:first-child .quick-contact-btn,
        .quick-contact .quick-contact-item:last-child .quick-contact-btn{
          border-radius:12px!important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
