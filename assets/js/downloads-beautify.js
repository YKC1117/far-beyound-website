(function(){
  if(document.body.dataset.page!=='downloads'||window.__fbDownloadsBeautify)return;
  window.__fbDownloadsBeautify=true;

  function addStyle(){
    if(document.getElementById('fbDownloadsBeautifyStyle'))return;
    const s=document.createElement('style');
    s.id='fbDownloadsBeautifyStyle';
    s.textContent=`
      body[data-page="downloads"]{background:#f6f8fa!important;color:#17344e}

      /* compact page hero */
      body[data-page="downloads"] .page-hero{padding:38px 0 34px!important;background:#fff!important;border-bottom:1px solid #e3e9ed!important}
      body[data-page="downloads"] .page-hero:before,body[data-page="downloads"] .page-hero:after{display:none!important}
      body[data-page="downloads"] .page-hero .eyebrow{display:block!important;padding:0!important;background:none!important;color:#138eaa!important;font-size:9px!important;font-weight:800!important;letter-spacing:.18em!important}
      body[data-page="downloads"] .page-hero h1{margin:8px 0 7px!important;font-size:36px!important;line-height:1.15!important;letter-spacing:-.04em!important;color:#17344e!important}
      body[data-page="downloads"] .page-hero p{margin:0!important;max-width:760px!important;font-size:12px!important;line-height:1.7!important;color:#6f8291!important}
      body[data-page="downloads"] main>.section{padding:26px 0 64px!important;background:#f6f8fa!important}

      /* filter panel */
      body[data-page="downloads"] .download-type-wrap{margin:0 0 12px!important;padding:16px 18px!important;background:#fff!important;border:1px solid #dfe6eb!important;border-radius:12px!important;box-shadow:0 4px 16px rgba(26,58,81,.035)!important}
      body[data-page="downloads"] .download-type-head{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:18px!important;margin:0 0 12px!important}
      body[data-page="downloads"] .download-type-head>div{display:flex!important;align-items:center!important;gap:12px!important}
      body[data-page="downloads"] .download-type-head .eyebrow{font-size:8px!important;letter-spacing:.16em!important;color:#1591ad!important;white-space:nowrap!important}
      body[data-page="downloads"] .download-type-head h2{margin:0!important;font-size:16px!important;line-height:1.2!important;font-weight:760!important;color:#17344e!important}
      body[data-page="downloads"] .download-type-head p{margin:0!important;font-size:10px!important;color:#81909b!important;text-align:right!important}

      body[data-page="downloads"] .download-type-grid{display:flex!important;flex-wrap:wrap!important;gap:7px!important}
      body[data-page="downloads"] .download-type-card{min-height:0!important;width:auto!important;padding:9px 12px!important;border:1px solid #dce5ea!important;border-radius:8px!important;background:#fff!important;box-shadow:none!important;display:inline-flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;gap:8px!important;color:#36556b!important;transition:.15s ease!important}
      body[data-page="downloads"] .download-type-card:before{display:none!important}
      body[data-page="downloads"] .download-type-card small,body[data-page="downloads"] .download-type-card>span:not(.download-type-count){display:none!important}
      body[data-page="downloads"] .download-type-card b{display:block!important;margin:0!important;font-size:11px!important;line-height:1!important;color:inherit!important;font-weight:720!important;white-space:nowrap!important}
      body[data-page="downloads"] .download-type-count{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:25px!important;height:20px!important;margin:0!important;padding:0 6px!important;border-radius:999px!important;background:#eef3f6!important;color:#6e8290!important;font-size:8px!important;font-weight:800!important;line-height:1!important}
      body[data-page="downloads"] .download-type-card:hover{transform:none!important;background:#f7fafc!important;border-color:#afc5d1!important}
      body[data-page="downloads"] .download-type-card.active{background:#173f5f!important;border-color:#173f5f!important;color:#fff!important;box-shadow:none!important}
      body[data-page="downloads"] .download-type-card.active .download-type-count{background:rgba(255,255,255,.15)!important;color:#fff!important}

      /* brand filter becomes horizontal instead of a left sidebar */
      body[data-page="downloads"] .download-layout{display:grid!important;grid-template-columns:1fr!important;gap:12px!important;align-items:start!important}
      body[data-page="downloads"] .download-sidebar{position:static!important;top:auto!important;display:flex!important;align-items:center!important;flex-wrap:wrap!important;gap:7px!important;margin:0!important;padding:12px 14px!important;border:1px solid #dfe6eb!important;border-radius:10px!important;background:#fff!important;box-shadow:none!important;overflow:visible!important}
      body[data-page="downloads"] .download-sidebar-title{display:inline-flex!important;align-items:center!important;min-height:30px!important;padding:0 8px 0 2px!important;margin:0 2px 0 0!important;border-right:1px solid #e5ebef!important;font-size:8px!important;letter-spacing:.13em!important;color:#83939e!important;white-space:nowrap!important}
      body[data-page="downloads"] .download-brand{width:auto!important;min-width:0!important;margin:0!important;padding:7px 10px!important;border:1px solid #e0e7eb!important;border-radius:999px!important;background:#fff!important;color:#4c6678!important;font-size:10px!important;font-weight:680!important;line-height:1!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;white-space:nowrap!important}
      body[data-page="downloads"] .download-brand:hover{background:#f5f9fb!important;border-color:#b9ccd6!important;color:#173f5f!important}
      body[data-page="downloads"] .download-brand.active{background:#173f5f!important;border-color:#173f5f!important;color:#fff!important;box-shadow:none!important}
      body[data-page="downloads"] .download-brand .brand-count{float:none!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:20px!important;height:18px!important;padding:0 5px!important;border-radius:999px!important;background:#eef3f6!important;color:#758793!important;font-size:8px!important;line-height:1!important}
      body[data-page="downloads"] .download-brand.active .brand-count{background:rgba(255,255,255,.15)!important;color:#fff!important}

      /* compact result header */
      body[data-page="downloads"] .download-content-head{display:flex!important;align-items:center!important;flex-wrap:wrap!important;gap:8px 12px!important;margin:2px 0 8px!important;padding:8px 2px 10px!important;border-bottom:1px solid #dde5ea!important}
      body[data-page="downloads"] .download-content-head .eyebrow{display:none!important}
      body[data-page="downloads"] .download-content-head h2{margin:0!important;font-size:20px!important;line-height:1.25!important;letter-spacing:-.02em!important;color:#17344e!important}
      body[data-page="downloads"] .download-content-head p{margin:0!important;font-size:10px!important;color:#84939e!important}
      body[data-page="downloads"] .download-result-count{margin:0 0 0 auto!important;padding:4px 8px!important;border-radius:999px!important;background:#eaf2f5!important;color:#587383!important;font-size:9px!important;font-weight:750!important}

      /* dense two-column download listing */
      body[data-page="downloads"] .download-list{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important;align-items:start!important}
      body[data-page="downloads"] .download-group{grid-column:1/-1!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important;margin:0 0 12px!important}
      body[data-page="downloads"] .download-group-head{grid-column:1/-1!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:16px!important;margin:4px 0 0!important;padding:8px 10px!important;border:0!important;border-left:3px solid #1595b1!important;border-radius:0!important;background:#eef4f7!important;color:#17344e!important}
      body[data-page="downloads"] .download-group-head span{font-size:7px!important;letter-spacing:.14em!important;color:#1591ad!important}
      body[data-page="downloads"] .download-group-head h3{margin:2px 0 0!important;font-size:13px!important;color:#17344e!important;line-height:1.25!important}
      body[data-page="downloads"] .download-group-head b{font-size:8px!important;color:#768996!important}

      body[data-page="downloads"] .download-item{display:grid!important;grid-template-columns:34px minmax(0,1fr) auto!important;gap:10px!important;align-items:center!important;min-height:78px!important;margin:0!important;padding:11px 12px!important;border:1px solid #e0e7eb!important;border-radius:9px!important;background:#fff!important;box-shadow:none!important;transition:border-color .15s ease,background .15s ease!important}
      body[data-page="downloads"] .download-item:hover{transform:none!important;border-color:#b9ced8!important;background:#fcfeff!important;box-shadow:none!important}
      body[data-page="downloads"] .download-icon{width:32px!important;height:32px!important;border-radius:7px!important;background:#edf6f8!important;color:#148da7!important}
      body[data-page="downloads"] .download-icon svg{width:16px!important;height:16px!important}
      body[data-page="downloads"] .download-main{min-width:0!important}
      body[data-page="downloads"] .download-tags{display:flex!important;gap:4px!important;flex-wrap:wrap!important;margin:0 0 4px!important}
      body[data-page="downloads"] .download-category-tag,body[data-page="downloads"] .download-brand-tag{margin:0!important;padding:2px 5px!important;border-radius:999px!important;font-size:7px!important;line-height:1.2!important;font-weight:800!important}
      body[data-page="downloads"] .download-category-tag{background:#e9f6f7!important;color:#0a7f87!important}
      body[data-page="downloads"] .download-brand-tag{background:#eef2f4!important;color:#657985!important}
      body[data-page="downloads"] .download-main h3{margin:0 0 3px!important;font-size:11px!important;line-height:1.4!important;color:#17344e!important;font-weight:730!important}
      body[data-page="downloads"] .download-main p{display:-webkit-box!important;-webkit-line-clamp:1!important;-webkit-box-orient:vertical!important;overflow:hidden!important;margin:0 0 4px!important;font-size:8px!important;line-height:1.45!important;color:#87949d!important}
      body[data-page="downloads"] .download-meta{display:flex!important;gap:7px!important;flex-wrap:wrap!important}
      body[data-page="downloads"] .download-meta span{font-size:7px!important;color:#9aa6ae!important}
      body[data-page="downloads"] .download-action{min-width:72px!important;height:30px!important;padding:0 9px!important;border-radius:7px!important;border:1px solid #b8cbd4!important;background:#fff!important;color:#234d67!important;font-size:8px!important;font-weight:800!important;white-space:nowrap!important}
      body[data-page="downloads"] .download-action:hover{background:#173f5f!important;border-color:#173f5f!important;color:#fff!important}
      body[data-page="downloads"] .download-empty{grid-column:1/-1!important;padding:42px 22px!important;border:1px dashed #cad7de!important;border-radius:10px!important;background:#fff!important;text-align:center!important}

      @media(max-width:1050px){
        body[data-page="downloads"] .download-list,body[data-page="downloads"] .download-group{grid-template-columns:1fr!important}
      }
      @media(max-width:760px){
        body[data-page="downloads"] .page-hero{padding:30px 0 28px!important}
        body[data-page="downloads"] .page-hero h1{font-size:31px!important}
        body[data-page="downloads"] main>.section{padding-top:18px!important}
        body[data-page="downloads"] .download-type-wrap{padding:13px!important}
        body[data-page="downloads"] .download-type-head{display:block!important;margin-bottom:10px!important}
        body[data-page="downloads"] .download-type-head>div{display:block!important}
        body[data-page="downloads"] .download-type-head .eyebrow{margin-bottom:5px!important}
        body[data-page="downloads"] .download-type-head p{margin-top:6px!important;text-align:left!important}
        body[data-page="downloads"] .download-type-grid{flex-wrap:nowrap!important;overflow-x:auto!important;padding-bottom:3px!important;-webkit-overflow-scrolling:touch!important}
        body[data-page="downloads"] .download-type-card{flex:0 0 auto!important}
        body[data-page="downloads"] .download-sidebar{flex-wrap:nowrap!important;overflow-x:auto!important;padding:10px!important;-webkit-overflow-scrolling:touch!important}
        body[data-page="downloads"] .download-sidebar-title{display:none!important}
        body[data-page="downloads"] .download-content-head{display:grid!important;grid-template-columns:1fr auto!important}
        body[data-page="downloads"] .download-content-head p{grid-column:1/-1!important}
        body[data-page="downloads"] .download-result-count{grid-column:2!important;grid-row:1!important}
        body[data-page="downloads"] .download-item{grid-template-columns:30px minmax(0,1fr)!important;min-height:0!important;padding:10px!important}
        body[data-page="downloads"] .download-action{grid-column:2!important;justify-self:start!important;margin-top:3px!important}
      }
    `;
    document.head.appendChild(s);
  }

  function run(){addStyle();}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,120)},{once:true});
  if(document.readyState!=='loading')setTimeout(run,0);
})();
