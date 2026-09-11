(function(){
  if(document.body.dataset.page!=='downloads'||window.__fbDownloadsBeautify)return;
  window.__fbDownloadsBeautify=true;

  function addStyle(){
    if(document.getElementById('fbDownloadsBeautifyStyle'))return;
    const s=document.createElement('style');
    s.id='fbDownloadsBeautifyStyle';
    s.textContent=`
      body[data-page="downloads"]{background:#f5f8fa!important}
      body[data-page="downloads"] .page-hero{position:relative;overflow:hidden;padding:70px 0 66px!important;background:linear-gradient(135deg,#f8fbfd 0%,#eef5f9 55%,#f9fcfe 100%)!important;border-bottom:1px solid #dce6ec!important}
      body[data-page="downloads"] .page-hero:before{content:"";position:absolute;width:440px;height:440px;border:58px solid rgba(35,152,194,.07);border-radius:50%;right:-140px;top:-240px}
      body[data-page="downloads"] .page-hero:after{content:"DOWNLOAD";position:absolute;right:5%;bottom:-22px;font-size:86px;font-weight:800;letter-spacing:.08em;color:rgba(20,64,95,.035);pointer-events:none}
      body[data-page="downloads"] .page-hero .container{position:relative;z-index:1}
      body[data-page="downloads"] .page-hero .eyebrow{display:inline-flex;padding:6px 9px;border-radius:999px;background:#e9f5f9;color:#0b8eaa!important;font-size:9px!important;font-weight:800!important;letter-spacing:.16em!important}
      body[data-page="downloads"] .page-hero h1{margin:12px 0 12px!important;font-size:46px!important;letter-spacing:-.04em!important;color:#16324b!important}
      body[data-page="downloads"] .page-hero p{max-width:700px!important;font-size:14px!important;line-height:1.9!important;color:#64798a!important}

      body[data-page="downloads"] main>.section{padding:44px 0 76px!important;background:#f5f8fa!important}
      body[data-page="downloads"] .download-type-wrap{margin:0 0 28px!important;padding:26px!important;background:#fff!important;border:1px solid #dfe8ee!important;border-radius:18px!important;box-shadow:0 12px 32px rgba(27,59,83,.06)!important}
      body[data-page="downloads"] .download-type-head{align-items:center!important;margin-bottom:20px!important}
      body[data-page="downloads"] .download-type-head .eyebrow{font-size:9px!important;letter-spacing:.16em!important;color:#1493b0!important}
      body[data-page="downloads"] .download-type-head h2{margin-top:6px!important;font-size:24px!important;letter-spacing:-.025em!important;font-weight:760!important;color:#18354e!important}
      body[data-page="downloads"] .download-type-head p{max-width:430px!important;text-align:right!important;color:#7a8e9d!important;font-size:11px!important;line-height:1.7!important}

      body[data-page="downloads"] .download-type-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:12px!important}
      body[data-page="downloads"] .download-type-card{position:relative;min-height:132px!important;padding:18px 18px 16px!important;border:1px solid #e1e9ee!important;border-radius:14px!important;background:linear-gradient(180deg,#fff,#fbfdfe)!important;box-shadow:0 4px 14px rgba(30,66,93,.035)!important;overflow:hidden!important}
      body[data-page="downloads"] .download-type-card:before{content:"";position:absolute;left:0;top:0;width:4px;height:100%;background:transparent;transition:.18s ease}
      body[data-page="downloads"] .download-type-card:hover{transform:translateY(-2px)!important;border-color:#a9cbd8!important;box-shadow:0 10px 22px rgba(26,76,104,.08)!important;background:#fff!important}
      body[data-page="downloads"] .download-type-card.active{border-color:#63b7d0!important;background:linear-gradient(145deg,#f8fdff,#f0f9fc)!important;box-shadow:0 10px 24px rgba(25,126,164,.10)!important}
      body[data-page="downloads"] .download-type-card.active:before{background:linear-gradient(#16a0c0,#226fa9)!important}
      body[data-page="downloads"] .download-type-card small{color:#148da7!important;font-size:8px!important;letter-spacing:.16em!important}
      body[data-page="downloads"] .download-type-card b{font-size:15px!important;color:#173650!important;margin:8px 0 7px!important}
      body[data-page="downloads"] .download-type-card>span:not(.download-type-count){font-size:10px!important;line-height:1.65!important;color:#7c8d9a!important}
      body[data-page="downloads"] .download-type-count{align-self:flex-start!important;margin-top:12px!important;padding:4px 7px!important;border-radius:999px!important;background:#edf4f7!important;color:#496a7d!important;font-size:9px!important}

      body[data-page="downloads"] .download-layout{display:grid!important;grid-template-columns:210px minmax(0,1fr)!important;gap:24px!important;align-items:start!important}
      body[data-page="downloads"] .download-sidebar{position:sticky!important;top:92px!important;padding:18px!important;border:1px solid #dfe7ec!important;border-radius:16px!important;background:#fff!important;box-shadow:0 8px 24px rgba(25,58,82,.05)!important}
      body[data-page="downloads"] .download-sidebar-title{padding:2px 4px 12px!important;font-size:9px!important;letter-spacing:.15em!important;color:#8193a0!important}
      body[data-page="downloads"] .download-brand{display:flex!important;align-items:center!important;justify-content:space-between!important;float:none!important;margin:4px 0!important;padding:10px 11px!important;border:0!important;border-radius:10px!important;background:transparent!important;color:#526a7b!important;font-size:11px!important;font-weight:650!important;transition:.16s ease!important}
      body[data-page="downloads"] .download-brand:hover{background:#f2f7f9!important;color:#173650!important}
      body[data-page="downloads"] .download-brand.active{background:linear-gradient(90deg,#173650,#225b7d)!important;color:#fff!important;box-shadow:0 7px 16px rgba(25,72,101,.16)!important}
      body[data-page="downloads"] .download-brand .brand-count{float:none!important;display:inline-grid!important;place-items:center!important;min-width:24px!important;height:22px!important;padding:0 6px!important;border-radius:999px!important;background:#eef3f6!important;color:#728693!important;font-size:9px!important}
      body[data-page="downloads"] .download-brand.active .brand-count{background:rgba(255,255,255,.14)!important;color:#fff!important}

      body[data-page="downloads"] .download-content-head{padding:2px 2px 18px!important;margin:0 0 16px!important;border-bottom:1px solid #dde6eb!important}
      body[data-page="downloads"] .download-content-head .eyebrow{font-size:9px!important;letter-spacing:.16em!important;color:#1191ad!important}
      body[data-page="downloads"] .download-content-head h2{margin:6px 0 7px!important;font-size:30px!important;letter-spacing:-.03em!important;color:#173650!important}
      body[data-page="downloads"] .download-content-head p{margin:0!important;font-size:11px!important;color:#7b8d9a!important}
      body[data-page="downloads"] .download-result-count{margin-top:12px!important;padding:5px 9px!important;border-radius:999px!important;background:#eaf4f7!important;color:#3e6c7f!important}

      body[data-page="downloads"] .download-group{margin-bottom:28px!important}
      body[data-page="downloads"] .download-group-head{padding:11px 14px 12px!important;margin-bottom:10px!important;border:0!important;border-radius:12px!important;background:linear-gradient(90deg,#173650,#244f6d)!important;color:#fff!important}
      body[data-page="downloads"] .download-group-head span{color:#81d0df!important;font-size:8px!important}
      body[data-page="downloads"] .download-group-head h3{margin-top:4px!important;color:#fff!important;font-size:16px!important}
      body[data-page="downloads"] .download-group-head b{color:#bfd0da!important;font-size:9px!important}

      body[data-page="downloads"] .download-item{display:grid!important;grid-template-columns:48px minmax(0,1fr) auto!important;gap:16px!important;align-items:center!important;margin:0 0 10px!important;padding:17px 18px!important;border:1px solid #e0e8ed!important;border-radius:14px!important;background:#fff!important;box-shadow:0 4px 14px rgba(28,63,89,.035)!important;transition:.16s ease!important}
      body[data-page="downloads"] .download-item:hover{transform:translateY(-1px)!important;border-color:#bdd3dc!important;box-shadow:0 10px 22px rgba(28,77,102,.07)!important}
      body[data-page="downloads"] .download-icon{width:44px!important;height:44px!important;display:grid!important;place-items:center!important;border-radius:12px!important;background:linear-gradient(145deg,#eef8fb,#e6f3f8)!important;color:#148da7!important}
      body[data-page="downloads"] .download-icon svg{width:21px!important;height:21px!important}
      body[data-page="downloads"] .download-main h3{margin:4px 0 4px!important;font-size:14px!important;line-height:1.5!important;color:#173650!important}
      body[data-page="downloads"] .download-main p{margin:0 0 7px!important;color:#788b99!important;font-size:10px!important;line-height:1.65!important}
      body[data-page="downloads"] .download-tags{margin:0 0 4px!important;gap:5px!important}
      body[data-page="downloads"] .download-category-tag,body[data-page="downloads"] .download-brand-tag{margin:0!important;padding:4px 7px!important;border-radius:999px!important;font-size:8px!important}
      body[data-page="downloads"] .download-category-tag{background:#e9f7f8!important;color:#0b7e86!important}
      body[data-page="downloads"] .download-brand-tag{background:#eef2f5!important;color:#607687!important}
      body[data-page="downloads"] .download-meta{gap:10px!important}
      body[data-page="downloads"] .download-meta span{font-size:9px!important;color:#8a9aa6!important}
      body[data-page="downloads"] .download-action{min-width:92px!important;height:38px!important;padding:0 14px!important;border-radius:9px!important;border-color:#b7ccd6!important;background:#fff!important;color:#214c68!important;font-size:10px!important;font-weight:750!important}
      body[data-page="downloads"] .download-action:hover{background:#173650!important;border-color:#173650!important;color:#fff!important}
      body[data-page="downloads"] .download-empty{padding:54px 24px!important;border-radius:16px!important;border:1px dashed #cddbe2!important;background:#fff!important}

      @media(max-width:1100px){body[data-page="downloads"] .download-type-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}}
      @media(max-width:900px){
        body[data-page="downloads"] .download-type-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
        body[data-page="downloads"] .download-layout{grid-template-columns:1fr!important}
        body[data-page="downloads"] .download-sidebar{position:static!important;display:flex!important;gap:8px!important;overflow-x:auto!important;padding:12px!important}
        body[data-page="downloads"] .download-sidebar-title{display:none!important}
        body[data-page="downloads"] .download-brand{min-width:max-content!important;margin:0!important}
      }
      @media(max-width:680px){
        body[data-page="downloads"] .page-hero{padding:48px 0 46px!important}
        body[data-page="downloads"] .page-hero h1{font-size:36px!important}
        body[data-page="downloads"] main>.section{padding-top:26px!important}
        body[data-page="downloads"] .download-type-wrap{padding:18px!important;border-radius:14px!important}
        body[data-page="downloads"] .download-type-head{display:block!important}
        body[data-page="downloads"] .download-type-head p{text-align:left!important;margin-top:8px!important}
        body[data-page="downloads"] .download-type-grid{display:flex!important;overflow-x:auto!important;gap:9px!important}
        body[data-page="downloads"] .download-type-card{min-width:210px!important}
        body[data-page="downloads"] .download-item{grid-template-columns:42px 1fr!important;padding:14px!important}
        body[data-page="downloads"] .download-item>.btn{grid-column:2!important;justify-self:start!important;margin-top:3px!important}
      }
    `;
    document.head.appendChild(s);
  }

  function run(){addStyle();}
  document.addEventListener('DOMContentLoaded',()=>{setTimeout(run,90);setTimeout(run,450)},{once:true});
  if(document.readyState!=='loading')setTimeout(run,90);
})();
