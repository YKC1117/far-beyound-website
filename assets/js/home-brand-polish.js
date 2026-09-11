(function(){
  if(document.body.dataset.page!=='home'||window.__fbHomeBrandPolish)return;
  window.__fbHomeBrandPolish=true;

  function addStyle(){
    if(document.getElementById('fbHomeBrandPolishStyle'))return;
    const s=document.createElement('style');
    s.id='fbHomeBrandPolishStyle';
    s.textContent=`
      body[data-page="home"] .brand-portfolio{padding:46px 0 50px!important;background:linear-gradient(180deg,#fff 0%,#fbfdff 100%)!important}
      body[data-page="home"] .brand-portfolio-head{display:flex!important;align-items:flex-end!important;justify-content:space-between!important;gap:28px!important;margin-bottom:24px!important}
      body[data-page="home"] .brand-portfolio-title{gap:16px!important}
      body[data-page="home"] .brand-portfolio-title small{font-size:10px!important;letter-spacing:.18em!important;color:#0c92b0!important;font-weight:800!important}
      body[data-page="home"] .brand-portfolio-title h2{font-size:28px!important;letter-spacing:-.03em!important;font-weight:760!important;color:#16324b!important}
      body[data-page="home"] .brand-portfolio-head>p{font-size:12px!important;color:#7a8d9d!important;margin:0!important}

      body[data-page="home"] .brand-family{min-height:104px!important;border-top:1px solid #e3ebf0!important;border-left:1px solid #e3ebf0!important;background:#fff!important;overflow:visible!important}
      body[data-page="home"] .brand-family+.brand-family{border-top:0!important}
      body[data-page="home"] .brand-family-label{min-height:104px!important;padding:0 18px!important;display:flex!important;flex-direction:column!important;justify-content:center!important;background:linear-gradient(145deg,#f6f9fb,#f1f6f9)!important;color:#213f57!important;font-size:13px!important;font-weight:760!important;line-height:1.35!important;border-right:1px solid #e3ebf0!important;border-bottom:1px solid #e3ebf0!important}
      body[data-page="home"] .brand-family-label small{margin-top:7px!important;font-size:8px!important;letter-spacing:.11em!important;color:#92a4b2!important;font-weight:800!important}
      body[data-page="home"] .brand-wordmarks{overflow:visible!important}
      body[data-page="home"] .brand-wordmark{position:relative!important;min-height:104px!important;background:#fff!important;border-right:1px solid #e3ebf0!important;border-bottom:1px solid #e3ebf0!important;transition:background .18s ease,border-color .18s ease,box-shadow .18s ease!important}
      body[data-page="home"] .brand-wordmark:hover{z-index:2!important;transform:none!important;box-shadow:0 9px 24px rgba(22,50,75,.08)!important;background:#fff!important}

      /* FASTECH own-brand tile — deliberately restrained so it fits the brand grid. */
      body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech{
        position:relative!important;
        min-height:104px!important;
        padding:0!important;
        display:flex!important;
        align-items:center!important;
        justify-content:center!important;
        text-align:left!important;
        color:#16324b!important;
        background:linear-gradient(145deg,#ffffff 0%,#f8fcff 100%)!important;
        border-right:1px solid #d4e5ee!important;
        border-bottom:1px solid #d4e5ee!important;
        box-shadow:inset 3px 0 0 #1595c5!important;
        overflow:hidden!important;
      }
      body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech:hover{
        z-index:3!important;
        background:linear-gradient(145deg,#ffffff 0%,#f2faff 100%)!important;
        border-color:#b9dce9!important;
        box-shadow:inset 3px 0 0 #1595c5,0 10px 26px rgba(19,87,126,.10)!important;
      }
      body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech:before,
      body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech:after{content:none!important;display:none!important}
      body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech>.brand-logo-img{display:none!important}

      .fb-own-brand-card{position:relative;width:100%;height:104px;display:flex;align-items:center;justify-content:center;padding:18px 18px 13px;box-sizing:border-box}
      .fb-own-brand-badge{position:absolute;right:12px;top:10px;display:inline-flex;align-items:center;gap:5px;padding:3px 7px;border:1px solid #acd9e9;border-radius:999px;background:#f4fbfe;color:#177fa7;font-size:8px;font-weight:800;letter-spacing:.08em;line-height:1.2;white-space:nowrap}
      .fb-own-brand-badge:before{content:"";width:5px;height:5px;border-radius:50%;background:#18a5d6}
      .fb-own-brand-main{display:flex;align-items:center;justify-content:center;gap:14px;width:100%;padding-top:7px}
      .fb-own-brand-logo{display:block!important;width:58px!important;height:58px!important;max-width:58px!important;max-height:58px!important;object-fit:contain!important;flex:0 0 58px;border-radius:13px;box-shadow:0 5px 14px rgba(23,83,119,.10)}
      .fb-own-brand-copy{display:flex;flex-direction:column;min-width:0;line-height:1.2}
      .fb-own-brand-copy strong{font-family:Arial,'Noto Sans TC',sans-serif;font-size:17px;font-weight:800;letter-spacing:.08em;color:#163c5d}
      .fb-own-brand-copy span{margin-top:5px;font-size:10px;font-weight:700;color:#47677e;letter-spacing:.03em}
      .fb-own-brand-copy small{margin-top:3px;font-size:7px;font-weight:700;color:#9aabb7;letter-spacing:.13em}

      @media(max-width:980px){
        body[data-page="home"] .brand-portfolio-head{align-items:flex-start!important;display:block!important}
        body[data-page="home"] .brand-portfolio-head>p{margin-top:9px!important}
        .fb-own-brand-main{gap:10px}.fb-own-brand-logo{width:52px!important;height:52px!important;max-width:52px!important;max-height:52px!important;flex-basis:52px}.fb-own-brand-copy strong{font-size:15px}
      }
      @media(max-width:680px){
        body[data-page="home"] .brand-portfolio{padding:34px 0 38px!important}
        body[data-page="home"] .brand-portfolio-title{display:block!important}
        body[data-page="home"] .brand-portfolio-title h2{margin-top:5px!important;font-size:24px!important}
        body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech{min-width:220px!important}
      }
    `;
    document.head.appendChild(s);
  }

  function markOwnBrand(){
    const card=document.querySelector('.brand-family.scanner .brand-wordmark.fastech');
    if(!card)return;
    card.setAttribute('aria-label','FASTECH 自有品牌｜條碼掃描設備');
    card.setAttribute('title','FASTECH 自有品牌｜條碼掃描設備');
    if(card.dataset.ownBrandReady==='1')return;
    card.dataset.ownBrandReady='1';
    card.innerHTML=`<span class="fb-own-brand-card"><span class="fb-own-brand-badge">自有品牌</span><span class="fb-own-brand-main"><img class="fb-own-brand-logo" src="assets/images/brand/far-beyound-logo.png" alt="FASTECH"><span class="fb-own-brand-copy"><strong>FASTECH</strong><span>條碼掃描設備</span><small>BARCODE SCANNERS</small></span></span></span>`;
  }

  function run(){addStyle();markOwnBrand();}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,120);setTimeout(run,500)},{once:true});
  if(document.readyState!=='loading')setTimeout(run,0);
})();
