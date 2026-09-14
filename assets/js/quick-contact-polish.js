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
          align-items:center!important;
          gap:12px!important;
          padding:0!important;
          filter:drop-shadow(0 10px 24px rgba(20,44,66,.12))!important;
        }
        .quick-contact .quick-contact-item{
          margin:0!important;
          padding:0!important;
          border:0!important;
          border-radius:16px!important;
          background:transparent!important;
          box-shadow:none!important;
          overflow:visible!important;
        }
        .quick-contact .quick-contact-item+.quick-contact-item{border-top:0!important}
        .quick-contact .quick-contact-btn{
          display:flex!important;
          width:82px!important;
          min-width:82px!important;
          height:82px!important;
          min-height:82px!important;
          margin:0!important;
          padding:10px 7px!important;
          border:1px solid #d7e2e8!important;
          border-radius:16px!important;
          background:#fff!important;
          color:#264b63!important;
          box-shadow:0 8px 22px rgba(22,55,78,.11)!important;
          overflow:hidden!important;
          transition:transform .16s ease,border-color .16s ease,background .16s ease,color .16s ease,box-shadow .16s ease!important;
          gap:6px!important;
        }
        .quick-contact .quick-contact-btn:hover,
        .quick-contact .quick-contact-btn:focus-visible{
          transform:translateY(-2px)!important;
          border-color:#9fc1cf!important;
          background:#f7fbfc!important;
          color:#0f7690!important;
          box-shadow:0 12px 28px rgba(22,55,78,.15)!important;
        }
        .quick-contact .quick-contact-btn:focus-visible{
          outline:2px solid rgba(21,149,177,.35)!important;
          outline-offset:3px!important;
        }
        .quick-contact .quick-contact-btn svg,
        .quick-contact .quick-contact-btn .icon{
          width:30px!important;
          height:30px!important;
          flex:0 0 30px!important;
        }
        .quick-contact .quick-contact-btn span{
          line-height:1.12!important;
          font-size:14px!important;
          font-weight:700!important;
          letter-spacing:.02em!important;
        }
        .quick-contact .quick-contact-item[data-contact-phone] .quick-contact-btn svg{width:29px!important;height:29px!important}

        /* 使用真正的 LINE 品牌圖樣，不再用目前的英文字母線稿。 */
        .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn svg{display:none!important}
        .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn::before{
          content:"";
          width:32px!important;
          height:32px!important;
          flex:0 0 32px!important;
          display:block!important;
          background:url("assets/images/icons/line-official-mark.svg") center/contain no-repeat!important;
        }

        /* TOP 是輔助功能，不與三個主要聯絡入口搶視覺層級。 */
        .quick-contact .quick-contact-item[data-back-top]{
          margin-top:2px!important;
          border-radius:999px!important;
        }
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn{
          width:46px!important;
          min-width:46px!important;
          height:46px!important;
          min-height:46px!important;
          padding:5px!important;
          border-radius:999px!important;
          border-color:#dfe7eb!important;
          background:rgba(255,255,255,.82)!important;
          color:#607687!important;
          box-shadow:0 5px 14px rgba(22,55,78,.08)!important;
          gap:1px!important;
        }
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn:hover,
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn:focus-visible{
          transform:none!important;
          background:#fff!important;
          color:#264b63!important;
          border-color:#cbd9e0!important;
          box-shadow:0 7px 18px rgba(22,55,78,.11)!important;
        }
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn b{
          font-size:13px!important;
          line-height:1!important;
          font-weight:700!important;
        }
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn span{
          font-size:8px!important;
          line-height:1!important;
          letter-spacing:.08em!important;
          font-weight:800!important;
        }
      }

      @media(max-width:980px){
        .quick-contact{display:none!important}
        .mobile-contact-bar{
          position:fixed;
          left:0;
          right:0;
          bottom:0;
          z-index:90;
          display:grid;
          grid-template-columns:repeat(3,1fr);
          background:rgba(255,255,255,.98);
          border-top:1px solid #dce4e9;
          box-shadow:0 -8px 26px rgba(18,46,70,.10);
          padding-bottom:env(safe-area-inset-bottom);
        }
        .mobile-contact-bar a,.mobile-contact-bar button{
          min-height:58px;
          border:0;
          border-right:1px solid #e4e9ed;
          background:transparent;
          color:#17324d;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:7px;
          text-decoration:none;
          font:inherit;
          font-size:12px;
          font-weight:700;
        }
        .mobile-contact-bar a:last-child{border-right:0}
        .mobile-contact-bar svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
        .mobile-contact-bar .line-detail{stroke-width:1.25}
        .mobile-contact-bar a:nth-child(2) svg{display:none}
        .mobile-contact-bar a:nth-child(2)::before{
          content:"";
          width:24px;
          height:24px;
          display:block;
          flex:0 0 24px;
          background:url("assets/images/icons/line-official-mark.svg") center/contain no-repeat;
        }
        .mobile-contact-phone{position:fixed;left:14px;right:14px;bottom:calc(70px + env(safe-area-inset-bottom));z-index:91;background:#fff;border:1px solid #dce4e9;border-radius:10px;padding:8px;box-shadow:0 18px 48px rgba(17,43,66,.2);display:none}
        .mobile-contact-phone.is-open{display:block}
        .mobile-contact-phone a{display:flex;justify-content:space-between;align-items:center;padding:13px 12px;text-decoration:none;color:#17324d;border-bottom:1px solid #edf1f3}
        .mobile-contact-phone a:last-child{border-bottom:0}
        .mobile-contact-phone span{font-size:12px;color:#71808d}
        .mobile-contact-phone b{font-size:14px}
        body:not([data-page="admin"]){padding-bottom:calc(58px + env(safe-area-inset-bottom))}
      }
    `;
    document.head.appendChild(style);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
