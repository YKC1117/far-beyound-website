(function(){
  if(document.body.dataset.page!=='downloads'||window.__fbDownloadsLayoutFinal)return;
  window.__fbDownloadsLayoutFinal=true;

  function addStyle(){
    if(document.getElementById('fbDownloadsLayoutFinalStyle'))return;
    const s=document.createElement('style');
    s.id='fbDownloadsLayoutFinalStyle';
    s.textContent=`
      body[data-page="downloads"]{background:#f4f7f9!important}
      body[data-page="downloads"] .page-hero .container,
      body[data-page="downloads"] main>.section>.container{
        width:min(calc(100% - 56px),1080px)!important;
        max-width:1080px!important;
        margin-left:auto!important;
        margin-right:auto!important;
      }

      /* Page heading */
      body[data-page="downloads"] .page-hero{
        padding:31px 0 27px!important;
        background:linear-gradient(180deg,#ffffff 0%,#fbfdfe 100%)!important;
        border-bottom:1px solid #e2e9ed!important;
      }
      body[data-page="downloads"] .page-hero .eyebrow{color:#138ca8!important;font-size:8px!important;letter-spacing:.2em!important}
      body[data-page="downloads"] .page-hero h1{font-size:33px!important;margin:7px 0 5px!important;color:#17344e!important}
      body[data-page="downloads"] .page-hero p{font-size:11px!important;line-height:1.65!important;color:#748692!important;max-width:680px!important}
      body[data-page="downloads"] main>.section{padding:22px 0 62px!important;background:transparent!important}

      /* One unified filter surface */
      body[data-page="downloads"] .download-type-wrap{
        position:relative!important;
        margin:0!important;
        padding:17px 18px 15px!important;
        border:1px solid #dde6eb!important;
        border-bottom:0!important;
        border-radius:14px 14px 0 0!important;
        background:#fff!important;
        box-shadow:0 7px 24px rgba(25,55,77,.045)!important;
      }
      body[data-page="downloads"] .download-type-wrap:before{
        content:"";position:absolute;left:18px;right:18px;bottom:0;height:1px;background:#edf1f4;
      }
      body[data-page="downloads"] .download-type-head{margin-bottom:12px!important;align-items:center!important}
      body[data-page="downloads"] .download-type-head>div{gap:11px!important}
      body[data-page="downloads"] .download-type-head .eyebrow{font-size:7px!important;letter-spacing:.18em!important;padding:5px 7px!important;border-radius:5px!important;background:#edf8fb!important;color:#1187a2!important}
      body[data-page="downloads"] .download-type-head h2{font-size:15px!important;font-weight:780!important;letter-spacing:-.01em!important}
      body[data-page="downloads"] .download-type-head p{font-size:9px!important;color:#8b99a3!important}

      body[data-page="downloads"] .download-type-grid{display:grid!important;grid-template-columns:repeat(6,minmax(0,1fr))!important;gap:6px!important}
      body[data-page="downloads"] .download-type-card{
        position:relative!important;
        width:100%!important;
        min-width:0!important;
        min-height:58px!important;
        padding:9px 9px 8px 36px!important;
        border:1px solid #e0e8ed!important;
        border-radius:9px!important;
        background:#fbfcfd!important;
        color:#3a586c!important;
        display:grid!important;
        grid-template-columns:minmax(0,1fr) auto!important;
        grid-template-rows:auto!important;
        align-items:center!important;
        gap:5px!important;
        box-shadow:none!important;
        transition:background .16s ease,border-color .16s ease,box-shadow .16s ease,transform .16s ease!important;
      }
      body[data-page="downloads"] .download-type-card:before{
        display:grid!important;place-items:center!important;
        position:absolute!important;left:9px!important;top:50%!important;transform:translateY(-50%)!important;
        width:20px!important;height:20px!important;border-radius:6px!important;
        background:#edf3f6!important;color:#6c8290!important;
        font-size:6px!important;font-weight:900!important;letter-spacing:.05em!important;
      }
      body[data-page="downloads"] .download-type-card[data-type="all"]:before{content:"ALL"!important}
      body[data-page="downloads"] .download-type-card[data-type="drivers"]:before{content:"DRV"!important}
      body[data-page="downloads"] .download-type-card[data-type="software"]:before{content:"APP"!important}
      body[data-page="downloads"] .download-type-card[data-type="tools"]:before{content:"UTL"!important}
      body[data-page="downloads"] .download-type-card[data-type="manuals"]:before{content:"DOC"!important}
      body[data-page="downloads"] .download-type-card[data-type="remote"]:before{content:"SYS"!important}
      body[data-page="downloads"] .download-type-card[data-type="other"]:before{content:"ETC"!important}
      body[data-page="downloads"] .download-type-card small,
      body[data-page="downloads"] .download-type-card>span:not(.download-type-count){display:none!important}
      body[data-page="downloads"] .download-type-card b{margin:0!important;font-size:9px!important;line-height:1.25!important;font-weight:760!important;white-space:normal!important}
      body[data-page="downloads"] .download-type-count{
        min-width:22px!important;height:18px!important;margin:0!important;padding:0 5px!important;
        background:#eef3f6!important;color:#7b8d98!important;font-size:7px!important;border-radius:999px!important;
      }
      body[data-page="downloads"] .download-type-card:hover{
        transform:translateY(-1px)!important;background:#fff!important;border-color:#b8cbd5!important;box-shadow:0 5px 12px rgba(32,69,94,.06)!important;
      }
      body[data-page="downloads"] .download-type-card.active{
        background:linear-gradient(135deg,#173f5f,#1d5678)!important;border-color:#173f5f!important;color:#fff!important;box-shadow:0 6px 14px rgba(23,63,95,.14)!important;
      }
      body[data-page="downloads"] .download-type-card.active:before{background:rgba(255,255,255,.13)!important;color:#fff!important}
      body[data-page="downloads"] .download-type-card.active .download-type-count{background:rgba(255,255,255,.13)!important;color:#fff!important}

      /* Brand row attaches to the same filter surface */
      body[data-page="downloads"] .download-layout{display:grid!important;grid-template-columns:1fr!important;gap:0!important;align-items:start!important}
      body[data-page="downloads"] .download-sidebar{
        position:static!important;top:auto!important;
        display:flex!important;align-items:center!important;flex-wrap:wrap!important;gap:6px!important;
        margin:0 0 18px!important;padding:11px 18px 13px!important;
        border:1px solid #dde6eb!important;border-top:0!important;border-radius:0 0 14px 14px!important;
        background:#fff!important;box-shadow:0 10px 26px rgba(25,55,77,.045)!important;overflow:visible!important;
      }
      body[data-page="downloads"] .download-sidebar-title{
        display:inline-flex!important;align-items:center!important;min-height:27px!important;
        padding:0 10px 0 0!important;margin:0 3px 0 0!important;border-right:1px solid #e3e9ed!important;
        font-size:7px!important;letter-spacing:.15em!important;color:#8a99a3!important;white-space:nowrap!important;
      }
      body[data-page="downloads"] .download-brand{
        width:auto!important;min-width:0!important;margin:0!important;padding:6px 9px!important;
        border:1px solid transparent!important;border-radius:7px!important;background:#f3f6f8!important;color:#536c7d!important;
        font-size:9px!important;font-weight:700!important;line-height:1!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;white-space:nowrap!important;
        transition:.15s ease!important;
      }
      body[data-page="downloads"] .download-brand:hover{background:#fff!important;border-color:#cbd9e0!important;color:#173f5f!important}
      body[data-page="downloads"] .download-brand.active{background:#173f5f!important;border-color:#173f5f!important;color:#fff!important;box-shadow:none!important}
      body[data-page="downloads"] .download-brand .brand-count{
        float:none!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:18px!important;height:16px!important;padding:0 4px!important;
        border-radius:999px!important;background:#e7edf1!important;color:#798b97!important;font-size:7px!important;line-height:1!important;
      }
      body[data-page="downloads"] .download-brand.active .brand-count{background:rgba(255,255,255,.14)!important;color:#fff!important}

      /* Results toolbar */
      body[data-page="downloads"] .download-content-head{
        min-height:45px!important;display:flex!important;align-items:center!important;flex-wrap:wrap!important;gap:7px 10px!important;
        margin:0 0 10px!important;padding:0 2px 9px!important;border-bottom:1px solid #dce5ea!important;
      }
      body[data-page="downloads"] .download-content-head .eyebrow{display:none!important}
      body[data-page="downloads"] .download-content-head h2{margin:0!important;font-size:18px!important;line-height:1.2!important;letter-spacing:-.025em!important;color:#17344e!important}
      body[data-page="downloads"] .download-content-head p{margin:0!important;font-size:9px!important;color:#8998a2!important}
      body[data-page="downloads"] .download-result-count{
        margin:0 0 0 auto!important;padding:5px 8px!important;border:1px solid #dbe5ea!important;border-radius:999px!important;
        background:#fff!important;color:#5f7888!important;font-size:8px!important;font-weight:780!important;
      }

      /* Group heading */
      body[data-page="downloads"] .download-list{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:9px!important;align-items:start!important}
      body[data-page="downloads"] .download-group{grid-column:1/-1!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:9px!important;margin:0 0 13px!important}
      body[data-page="downloads"] .download-group-head{
        grid-column:1/-1!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:16px!important;
        margin:5px 0 1px!important;padding:7px 9px 7px 11px!important;border:0!important;border-left:3px solid #1595b1!important;border-radius:7px!important;
        background:linear-gradient(90deg,#edf5f8 0%,rgba(237,245,248,.3) 70%,transparent 100%)!important;color:#17344e!important;
      }
      body[data-page="downloads"] .download-group-head span{font-size:6px!important;letter-spacing:.16em!important;color:#1591ad!important}
      body[data-page="downloads"] .download-group-head h3{margin:1px 0 0!important;font-size:12px!important;color:#17344e!important;line-height:1.2!important}
      body[data-page="downloads"] .download-group-head b{padding:3px 6px!important;border-radius:999px!important;background:#fff!important;border:1px solid #dbe5ea!important;font-size:7px!important;color:#718591!important;font-weight:750!important}

      /* Resource cards */
      body[data-page="downloads"] .download-item{
        position:relative!important;display:grid!important;grid-template-columns:35px minmax(0,1fr) auto!important;gap:10px!important;align-items:center!important;
        min-height:77px!important;margin:0!important;padding:11px 11px 11px 12px!important;
        border:1px solid #dfe7ec!important;border-radius:11px!important;background:#fff!important;
        box-shadow:0 2px 8px rgba(22,52,75,.025)!important;
        transition:border-color .16s ease,box-shadow .16s ease,transform .16s ease!important;
        overflow:hidden!important;
      }
      body[data-page="downloads"] .download-item:before{
        content:"";position:absolute;left:0;top:10px;bottom:10px;width:2px;border-radius:2px;background:#dce8ed;transition:background .16s ease;
      }
      body[data-page="downloads"] .download-item:hover{
        transform:translateY(-1px)!important;border-color:#b9cdd7!important;background:#fff!important;box-shadow:0 7px 18px rgba(24,59,82,.065)!important;
      }
      body[data-page="downloads"] .download-item:hover:before{background:#1595b1}
      body[data-page="downloads"] .download-icon{
        width:34px!important;height:34px!important;border-radius:9px!important;background:linear-gradient(145deg,#edf7fa,#e5f1f5)!important;color:#1285a0!important;
        border:1px solid #dbeaf0!important;
      }
      body[data-page="downloads"] .download-icon svg{width:15px!important;height:15px!important}
      body[data-page="downloads"] .download-main{min-width:0!important}
      body[data-page="downloads"] .download-tags{display:flex!important;gap:4px!important;flex-wrap:wrap!important;margin:0 0 4px!important}
      body[data-page="downloads"] .download-category-tag,
      body[data-page="downloads"] .download-brand-tag{margin:0!important;padding:2px 5px!important;border-radius:4px!important;font-size:6px!important;line-height:1.25!important;font-weight:850!important;letter-spacing:.02em!important}
      body[data-page="downloads"] .download-category-tag{background:#e9f6f7!important;color:#0a7f87!important}
      body[data-page="downloads"] .download-brand-tag{background:#f0f3f5!important;color:#657985!important}
      body[data-page="downloads"] .download-main h3{margin:0 0 3px!important;font-size:10px!important;line-height:1.4!important;color:#17344e!important;font-weight:760!important}
      body[data-page="downloads"] .download-main p{display:-webkit-box!important;-webkit-line-clamp:1!important;-webkit-box-orient:vertical!important;overflow:hidden!important;margin:0 0 3px!important;font-size:7px!important;line-height:1.4!important;color:#8b98a1!important}
      body[data-page="downloads"] .download-meta{display:flex!important;gap:6px!important;flex-wrap:wrap!important}
      body[data-page="downloads"] .download-meta span{font-size:6px!important;color:#9aa6ae!important}
      body[data-page="downloads"] .download-action{
        min-width:72px!important;height:30px!important;padding:0 9px!important;border-radius:7px!important;border:1px solid #173f5f!important;
        background:#173f5f!important;color:#fff!important;font-size:7px!important;font-weight:820!important;white-space:nowrap!important;box-shadow:none!important;
      }
      body[data-page="downloads"] .download-action:hover{background:#0f587c!important;border-color:#0f587c!important;color:#fff!important;transform:none!important}
      body[data-page="downloads"] .download-empty{grid-column:1/-1!important;padding:38px 20px!important;border:1px dashed #cad7de!important;border-radius:11px!important;background:#fff!important;text-align:center!important}

      @media(max-width:1050px){
        body[data-page="downloads"] .download-type-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}
        body[data-page="downloads"] .download-list,body[data-page="downloads"] .download-group{grid-template-columns:1fr!important}
      }
      @media(max-width:760px){
        body[data-page="downloads"] .page-hero .container,
        body[data-page="downloads"] main>.section>.container{width:min(calc(100% - 28px),1080px)!important}
        body[data-page="downloads"] .page-hero{padding:27px 0 24px!important}
        body[data-page="downloads"] .page-hero h1{font-size:29px!important}
        body[data-page="downloads"] main>.section{padding-top:16px!important}
        body[data-page="downloads"] .download-type-wrap{padding:13px 12px 12px!important}
        body[data-page="downloads"] .download-type-head{display:block!important;margin-bottom:10px!important}
        body[data-page="downloads"] .download-type-head>div{display:flex!important;align-items:center!important}
        body[data-page="downloads"] .download-type-head p{margin-top:6px!important;text-align:left!important}
        body[data-page="downloads"] .download-type-grid{display:flex!important;flex-wrap:nowrap!important;overflow-x:auto!important;padding-bottom:3px!important;-webkit-overflow-scrolling:touch!important}
        body[data-page="downloads"] .download-type-card{flex:0 0 145px!important;min-height:54px!important}
        body[data-page="downloads"] .download-sidebar{flex-wrap:nowrap!important;overflow-x:auto!important;padding:10px 12px!important;-webkit-overflow-scrolling:touch!important;margin-bottom:14px!important}
        body[data-page="downloads"] .download-sidebar-title{display:none!important}
        body[data-page="downloads"] .download-content-head{display:grid!important;grid-template-columns:1fr auto!important}
        body[data-page="downloads"] .download-content-head p{grid-column:1/-1!important}
        body[data-page="downloads"] .download-result-count{grid-column:2!important;grid-row:1!important}
        body[data-page="downloads"] .download-item{grid-template-columns:31px minmax(0,1fr)!important;min-height:0!important;padding:10px!important}
        body[data-page="downloads"] .download-action{grid-column:2!important;justify-self:start!important;margin-top:3px!important}
      }
    `;
    document.head.appendChild(s);
  }

  document.addEventListener('DOMContentLoaded',addStyle,{once:true});
  if(document.readyState!=='loading')addStyle();
})();
