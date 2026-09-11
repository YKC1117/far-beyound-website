(function(){
  if(document.body.dataset.page!=='downloads'||window.__fbDownloadsDesktopReadable)return;
  window.__fbDownloadsDesktopReadable=true;
  const style=document.createElement('style');
  style.id='fbDownloadsDesktopReadableStyle';
  style.textContent=`
  @media(min-width:981px){
    body[data-page="downloads"] .page-hero .container,
    body[data-page="downloads"] main>.section>.container{width:min(calc(100% - 72px),1180px)!important;max-width:1180px!important}
    body[data-page="downloads"] .page-hero{padding:38px 0 33px!important}
    body[data-page="downloads"] .page-hero h1{font-size:40px!important;margin:9px 0 7px!important}
    body[data-page="downloads"] .page-hero p{font-size:14px!important;line-height:1.7!important;max-width:760px!important}
    body[data-page="downloads"] main>.section{padding:30px 0 72px!important}

    body[data-page="downloads"] .download-type-wrap{padding:21px 22px 18px!important;border-radius:16px 16px 0 0!important}
    body[data-page="downloads"] .download-type-head{margin-bottom:16px!important}
    body[data-page="downloads"] .download-type-head .eyebrow{font-size:9px!important;padding:6px 8px!important}
    body[data-page="downloads"] .download-type-head h2{font-size:20px!important}
    body[data-page="downloads"] .download-type-head p{font-size:12px!important}
    body[data-page="downloads"] .download-type-grid{gap:9px!important}
    body[data-page="downloads"] .download-type-card{min-height:72px!important;padding:12px 12px 11px 48px!important;border-radius:11px!important}
    body[data-page="downloads"] .download-type-card:before{left:12px!important;width:27px!important;height:27px!important;border-radius:7px!important;font-size:7px!important}
    body[data-page="downloads"] .download-type-card b{font-size:12px!important;line-height:1.3!important}
    body[data-page="downloads"] .download-type-count{min-width:30px!important;height:22px!important;font-size:8px!important}

    body[data-page="downloads"] .download-sidebar{padding:14px 22px 16px!important;gap:8px!important;border-radius:0 0 16px 16px!important;margin-bottom:25px!important}
    body[data-page="downloads"] .download-sidebar-title{min-height:31px!important;font-size:9px!important;padding-right:12px!important}
    body[data-page="downloads"] .download-brand{min-height:34px!important;padding:8px 11px!important;font-size:10.5px!important;border-radius:8px!important}
    body[data-page="downloads"] .download-brand .brand-count{height:18px!important;font-size:7.5px!important}

    body[data-page="downloads"] .download-content-head{min-height:56px!important;margin-bottom:14px!important;padding-bottom:12px!important}
    body[data-page="downloads"] .download-content-head h2{font-size:24px!important}
    body[data-page="downloads"] .download-content-head p{font-size:11px!important}
    body[data-page="downloads"] .download-result-count{padding:6px 10px!important;font-size:9px!important}

    body[data-page="downloads"] .download-list,
    body[data-page="downloads"] .download-group{gap:12px!important}
    body[data-page="downloads"] .download-group{margin-bottom:18px!important}
    body[data-page="downloads"] .download-group-head{padding:10px 12px 10px 14px!important;margin:7px 0 2px!important}
    body[data-page="downloads"] .download-group-head span{font-size:7.5px!important}
    body[data-page="downloads"] .download-group-head h3{font-size:15px!important}
    body[data-page="downloads"] .download-group-head b{font-size:8.5px!important;padding:4px 7px!important}

    body[data-page="downloads"] .download-item{grid-template-columns:42px minmax(0,1fr) auto!important;gap:13px!important;min-height:96px!important;padding:14px 15px!important;border-radius:12px!important}
    body[data-page="downloads"] .download-icon{width:40px!important;height:40px!important;border-radius:10px!important}
    body[data-page="downloads"] .download-icon svg{width:18px!important;height:18px!important}
    body[data-page="downloads"] .download-tags{margin-bottom:5px!important;gap:5px!important}
    body[data-page="downloads"] .download-category-tag,
    body[data-page="downloads"] .download-brand-tag{font-size:7.5px!important;padding:3px 6px!important}
    body[data-page="downloads"] .download-main h3{font-size:13px!important;line-height:1.45!important;margin-bottom:4px!important}
    body[data-page="downloads"] .download-main p{font-size:9.5px!important;line-height:1.5!important;margin-bottom:5px!important}
    body[data-page="downloads"] .download-meta span{font-size:8px!important}
    body[data-page="downloads"] .download-action{min-width:86px!important;height:36px!important;padding:0 12px!important;font-size:9px!important;border-radius:8px!important}
    body[data-page="downloads"] input[type="search"]{min-height:44px!important;font-size:13px!important}
  }
  `;
  document.head.appendChild(style);
})();