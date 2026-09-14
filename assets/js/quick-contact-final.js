(function(){
  if(window.__fbQuickContactFinal)return;
  window.__fbQuickContactFinal=true;
  function install(){
    if(document.getElementById('fbQuickContactFinalStyle'))return;
    const style=document.createElement('style');
    style.id='fbQuickContactFinalStyle';
    style.textContent=`
      /* Premium desktop contact rail */
      @media(min-width:981px){
        .quick-contact{
          position:fixed!important;
          right:22px!important;
          top:50%!important;
          transform:translateY(-50%)!important;
          z-index:120!important;
          display:flex!important;
          flex-direction:column!important;
          align-items:center!important;
          gap:9px!important;
          padding:10px!important;
          width:auto!important;
          background:rgba(255,255,255,.78)!important;
          border:1px solid rgba(198,211,220,.9)!important;
          border-radius:24px!important;
          box-shadow:0 18px 48px rgba(17,43,66,.14),0 3px 12px rgba(17,43,66,.06)!important;
          backdrop-filter:blur(18px)!important;
          -webkit-backdrop-filter:blur(18px)!important;
          overflow:visible!important;
        }
        .quick-contact .quick-contact-item{
          margin:0!important;
          padding:0!important;
          border:0!important;
          background:transparent!important;
          box-shadow:none!important;
          overflow:visible!important;
        }
        .quick-contact .quick-contact-item+.quick-contact-item{border-top:0!important}
        .quick-contact .quick-contact-btn{
          position:relative!important;
          display:flex!important;
          flex-direction:column!important;
          align-items:center!important;
          justify-content:center!important;
          width:72px!important;
          min-width:72px!important;
          height:72px!important;
          min-height:72px!important;
          margin:0!important;
          padding:8px 5px!important;
          border:1px solid transparent!important;
          border-radius:17px!important;
          background:rgba(255,255,255,.92)!important;
          color:#294c62!important;
          box-shadow:0 5px 16px rgba(20,49,70,.07)!important;
          overflow:hidden!important;
          gap:5px!important;
          transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease,background .18s ease,color .18s ease!important;
        }
        .quick-contact .quick-contact-btn:hover,
        .quick-contact .quick-contact-btn:focus-visible{
          transform:translateY(-3px)!important;
          border-color:rgba(19,132,154,.22)!important;
          background:#fff!important;
          color:#087b91!important;
          box-shadow:0 11px 26px rgba(20,49,70,.14)!important;
        }
        .quick-contact .quick-contact-btn:focus-visible{
          outline:2px solid rgba(13,135,158,.25)!important;
          outline-offset:3px!important;
        }
        .quick-contact .quick-contact-btn svg,
        .quick-contact .quick-contact-btn .icon{
          width:27px!important;
          height:27px!important;
          flex:0 0 27px!important;
          color:currentColor!important;
        }
        .quick-contact .quick-contact-btn span{
          display:block!important;
          line-height:1!important;
          font-size:12px!important;
          font-weight:800!important;
          letter-spacing:.08em!important;
          color:currentColor!important;
        }
        .quick-contact .quick-contact-item[data-contact-phone] .quick-contact-btn svg{width:26px!important;height:26px!important}

        /* LINE：只顯示官方圖樣，不再同時顯示重複的英文字母。 */
        .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn svg{display:none!important}
        .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn::before{
          content:"";
          width:31px!important;
          height:31px!important;
          flex:0 0 31px!important;
          display:block!important;
          background:url("assets/images/icons/line-official-mark.svg") center/contain no-repeat!important;
        }
        .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn b{
          display:none!important;
        }

        /* TOP：明確降級為輔助操作。 */
        .quick-contact .quick-contact-item[data-back-top]{
          margin-top:2px!important;
          padding-top:9px!important;
          border-top:1px solid rgba(190,205,214,.65)!important;
          border-radius:0!important;
        }
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn{
          width:48px!important;
          min-width:48px!important;
          height:48px!important;
          min-height:48px!important;
          padding:5px!important;
          border-radius:999px!important;
          border-color:#dce6eb!important;
          background:rgba(248,251,252,.86)!important;
          color:#708494!important;
          box-shadow:0 4px 12px rgba(20,49,70,.06)!important;
          gap:2px!important;
        }
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn:hover,
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn:focus-visible{
          transform:none!important;
          color:#426477!important;
          background:#fff!important;
          box-shadow:0 6px 15px rgba(20,49,70,.09)!important;
        }
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn b{
          font-size:12px!important;
          line-height:1!important;
          font-weight:800!important;
        }
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn span{
          font-size:7px!important;
          line-height:1!important;
          letter-spacing:.12em!important;
        }
      }

      /* Mobile：固定底部改成乾淨的三入口工具列。 */
      @media(max-width:980px){
        .quick-contact{display:none!important}
        .mobile-contact-bar{
          position:fixed!important;
          left:12px!important;
          right:12px!important;
          bottom:10px!important;
          z-index:120!important;
          display:grid!important;
          grid-template-columns:repeat(3,1fr)!important;
          padding:5px!important;
          background:rgba(255,255,255,.94)!important;
          border:1px solid rgba(203,216,224,.95)!important;
          border-radius:18px!important;
          box-shadow:0 12px 34px rgba(17,43,66,.14)!important;
          backdrop-filter:blur(16px)!important;
          -webkit-backdrop-filter:blur(16px)!important;
        }
        .mobile-contact-bar a,.mobile-contact-bar button{
          min-height:54px!important;
          border:0!important;
          border-right:1px solid #e5ecef!important;
          border-radius:13px!important;
          background:transparent!important;
          color:#294c62!important;
          display:flex!important;
          align-items:center!important;
          justify-content:center!important;
          gap:6px!important;
          text-decoration:none!important;
          font:inherit!important;
          font-size:12px!important;
          font-weight:800!important;
        }
        .mobile-contact-bar a:last-child{border-right:0!important}
        .mobile-contact-bar a:active{background:#f2f8f9!important}
        .mobile-contact-bar svg{width:22px!important;height:22px!important;fill:none!important;stroke:currentColor!important;stroke-width:1.8!important;stroke-linecap:round!important;stroke-linejoin:round!important}
        .mobile-contact-bar a:nth-child(2) svg{display:none!important}
        .mobile-contact-bar a:nth-child(2)::before{
          content:"";
          width:24px!important;
          height:24px!important;
          display:block!important;
          flex:0 0 24px!important;
          background:url("assets/images/icons/line-official-mark.svg") center/contain no-repeat!important;
        }
        .mobile-contact-phone{
          position:fixed!important;
          left:14px!important;
          right:14px!important;
          bottom:calc(78px + env(safe-area-inset-bottom))!important;
          z-index:121!important;
          background:rgba(255,255,255,.97)!important;
          border:1px solid #dce6eb!important;
          border-radius:16px!important;
          padding:8px!important;
          box-shadow:0 18px 48px rgba(17,43,66,.18)!important;
          display:none!important;
        }
        .mobile-contact-phone.is-open{display:block!important}
        .mobile-contact-phone a{display:flex!important;justify-content:space-between!important;align-items:center!important;padding:13px 12px!important;text-decoration:none!important;color:#17324d!important;border-bottom:1px solid #edf1f3!important}
        .mobile-contact-phone a:last-child{border-bottom:0!important}
        .mobile-contact-phone span{font-size:12px!important;color:#71808d!important}
        .mobile-contact-phone b{font-size:14px!important}
        body:not([data-page="admin"]){padding-bottom:calc(76px + env(safe-area-inset-bottom))!important}
      }
    `;
    document.head.appendChild(style);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
