(function(){
  if(document.body.dataset.page!=='downloads'||window.__fbDownloadsDesktopReadable)return;
  window.__fbDownloadsDesktopReadable=true;
  const style=document.createElement('style');
  style.id='fbDownloadsDesktopReadableStyle';
  style.textContent=`
  @media(min-width:981px){
    body[data-page="downloads"] .page-hero .container,
    body[data-page="downloads"] main>.section>.container{width:min(calc(100% - 64px),1280px)!important;max-width:1280px!important}
    body[data-page="downloads"] .page-hero{padding:52px 0 42px!important}
    body[data-page="downloads"] .page-hero h1{font-size:46px!important;line-height:1.15!important;margin:10px 0 12px!important}
    body[data-page="downloads"] .page-hero p{font-size:16px!important;line-height:1.75!important;max-width:820px!important}
    body[data-page="downloads"] main>.section{padding:42px 0 84px!important}

    body[data-page="downloads"] .download-type-wrap{padding:28px 30px 26px!important;border-radius:18px 18px 0 0!important}
    body[data-page="downloads"] .download-type-head{margin-bottom:22px!important}
    body[data-page="downloads"] .download-type-head .eyebrow{font-size:11px!important;padding:7px 10px!important}
    body[data-page="downloads"] .download-type-head h2{font-size:27px!important;line-height:1.3!important}
    body[data-page="downloads"] .download-type-head p{font-size:14px!important;line-height:1.65!important}
    body[data-page="downloads"] .download-type-grid{gap:13px!important}
    body[data-page="downloads"] .download-type-card{min-height:96px!important;padding:18px 16px 17px 66px!important;border-radius:13px!important}
    body[data-page="downloads"] .download-type-card:before{left:17px!important;width:36px!important;height:36px!important;border-radius:9px!important;font-size:9px!important}
    body[data-page="downloads"] .download-type-card b{font-size:15px!important;line-height:1.4!important}
    body[data-page="downloads"] .download-type-count{min-width:36px!important;height:26px!important;font-size:10px!important}

    body[data-page="downloads"] .download-sidebar{padding:18px 30px 20px!important;gap:10px!important;border-radius:0 0 18px 18px!important;margin-bottom:30px!important}
    body[data-page="downloads"] .download-sidebar-title{min-height:38px!important;font-size:11px!important;padding-right:14px!important}
    body[data-page="downloads"] .download-brand{min-height:42px!important;padding:10px 14px!important;font-size:13px!important;border-radius:9px!important}
    body[data-page="downloads"] .download-brand .brand-count{height:22px!important;font-size:9px!important}

    body[data-page="downloads"] .download-content-head{min-height:72px!important;margin-bottom:20px!important;padding-bottom:16px!important}
    body[data-page="downloads"] .download-content-head h2{font-size:31px!important;line-height:1.25!important}
    body[data-page="downloads"] .download-content-head p{font-size:14px!important;line-height:1.6!important}
    body[data-page="downloads"] .download-result-count{padding:7px 11px!important;font-size:11px!important}

    body[data-page="downloads"] .download-list,
    body[data-page="downloads"] .download-group{gap:15px!important}
    body[data-page="downloads"] .download-group{margin-bottom:24px!important}
    body[data-page="downloads"] .download-group-head{padding:13px 15px 13px 18px!important;margin:9px 0 3px!important}
    body[data-page="downloads"] .download-group-head span{font-size:9px!important}
    body[data-page="downloads"] .download-group-head h3{font-size:18px!important}
    body[data-page="downloads"] .download-group-head b{font-size:10px!important;padding:5px 8px!important}

    body[data-page="downloads"] .download-item{grid-template-columns:54px minmax(0,1fr) auto!important;gap:17px!important;min-height:122px!important;padding:19px 20px!important;border-radius:14px!important}
    body[data-page="downloads"] .download-icon{width:50px!important;height:50px!important;border-radius:11px!important}
    body[data-page="downloads"] .download-icon svg{width:22px!important;height:22px!important}
    body[data-page="downloads"] .download-tags{margin-bottom:7px!important;gap:6px!important}
    body[data-page="downloads"] .download-category-tag,
    body[data-page="downloads"] .download-brand-tag{font-size:9px!important;padding:4px 7px!important}
    body[data-page="downloads"] .download-main h3{font-size:17px!important;line-height:1.45!important;margin-bottom:6px!important}
    body[data-page="downloads"] .download-main p{font-size:13px!important;line-height:1.65!important;margin-bottom:7px!important}
    body[data-page="downloads"] .download-meta span{font-size:11px!important;line-height:1.5!important}
    body[data-page="downloads"] .download-action{min-width:108px!important;height:44px!important;padding:0 16px!important;font-size:12px!important;border-radius:9px!important}
    body[data-page="downloads"] input[type="search"]{min-height:48px!important;font-size:14px!important}
  }
  `;
  document.head.appendChild(style);
})();