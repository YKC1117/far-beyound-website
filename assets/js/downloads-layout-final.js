(function(){
  if(document.body.dataset.page!=='downloads'||window.__fbDownloadsLayoutFinal)return;
  window.__fbDownloadsLayoutFinal=true;

  function addStyle(){
    if(document.getElementById('fbDownloadsLayoutFinalStyle'))return;
    const s=document.createElement('style');
    s.id='fbDownloadsLayoutFinalStyle';
    s.textContent=`
      body[data-page="downloads"] .page-hero .container,
      body[data-page="downloads"] main>.section>.container{
        width:min(calc(100% - 56px),1100px)!important;
        max-width:1100px!important;
        margin-left:auto!important;
        margin-right:auto!important;
      }
      body[data-page="downloads"] .page-hero{padding:32px 0 29px!important}
      body[data-page="downloads"] main>.section{padding:22px 0 58px!important}
      body[data-page="downloads"] .download-type-wrap{padding:14px 16px!important;margin-bottom:10px!important}
      body[data-page="downloads"] .download-type-head{margin-bottom:10px!important}
      body[data-page="downloads"] .download-type-grid{gap:6px!important}
      body[data-page="downloads"] .download-type-card{padding:8px 11px!important}
      body[data-page="downloads"] .download-sidebar{padding:10px 12px!important;gap:6px!important}
      body[data-page="downloads"] .download-brand{padding:6px 9px!important}
      body[data-page="downloads"] .download-content-head{padding-top:6px!important;margin-bottom:6px!important}
      body[data-page="downloads"] .download-item{min-height:74px!important;padding:10px 11px!important}
      body[data-page="downloads"] .download-group{gap:7px!important;margin-bottom:10px!important}

      @media(max-width:720px){
        body[data-page="downloads"] .page-hero .container,
        body[data-page="downloads"] main>.section>.container{
          width:min(calc(100% - 28px),1100px)!important;
        }
      }
    `;
    document.head.appendChild(s);
  }

  document.addEventListener('DOMContentLoaded',addStyle,{once:true});
  if(document.readyState!=='loading')addStyle();
})();
