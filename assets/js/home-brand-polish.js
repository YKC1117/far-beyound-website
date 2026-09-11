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
      body[data-page="home"] .brand-wordmark{position:relative!important;min-height:104px!important;background:#fff!important;border-right:1px solid #e3ebf0!important;border-bottom:1px solid #e3ebf0!important;transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease,background .2s ease!important}
      body[data-page="home"] .brand-wordmark:hover{z-index:2!important;transform:translateY(-3px)!important;box-shadow:0 12px 28px rgba(22,50,75,.10)!important;background:#fff!important}

      /* FASTECH = company-owned brand. Use the site's official logo asset, not a text-only substitute. */
      body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech{
        z-index:3!important;
        min-height:104px!important;
        padding:17px 18px 15px 92px!important;
        display:flex!important;
        align-items:flex-end!important;
        justify-content:flex-start!important;
        text-align:left!important;
        color:#1c4f7f!important;
        font-size:13px!important;
        font-weight:760!important;
        letter-spacing:.02em!important;
        background:
          radial-gradient(circle at 87% 14%,rgba(47,179,230,.13),transparent 30%),
          linear-gradient(135deg,#ffffff 0%,#f8fcff 58%,#eef8ff 100%)!important;
        border:1px solid #65bfe7!important;
        box-shadow:0 10px 25px rgba(14,109,159,.12),inset 0 0 0 1px rgba(255,255,255,.85)!important;
        overflow:hidden!important;
      }
      body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech:before{
        content:""!important;
        position:absolute!important;
        left:20px!important;
        top:50%!important;
        width:58px!important;
        height:58px!important;
        transform:translateY(-50%)!important;
        border-radius:16px!important;
        background:#fff url('assets/images/brand/far-beyound-logo.png') center/contain no-repeat!important;
        box-shadow:0 8px 18px rgba(21,126,181,.16)!important;
      }
      body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech:after{
        content:"自有品牌  ·  OUR BRAND"!important;
        position:absolute!important;
        top:10px!important;
        right:11px!important;
        padding:5px 8px!important;
        border-radius:999px!important;
        background:linear-gradient(90deg,#0f8fd0,#1766a8)!important;
        color:#fff!important;
        font-size:8px!important;
        font-weight:800!important;
        line-height:1!important;
        letter-spacing:.08em!important;
        box-shadow:0 5px 12px rgba(18,111,166,.20)!important;
      }
      body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech:hover{
        transform:translateY(-4px)!important;
        border-color:#238ec3!important;
        box-shadow:0 16px 34px rgba(15,111,166,.18)!important;
      }
      body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech .brand-logo-img{display:none!important}

      @media(max-width:980px){
        body[data-page="home"] .brand-portfolio-head{align-items:flex-start!important;display:block!important}
        body[data-page="home"] .brand-portfolio-head>p{margin-top:9px!important}
        body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech{padding-left:82px!important}
        body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech:before{left:16px!important;width:52px!important;height:52px!important}
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
    if(card){
      card.setAttribute('aria-label','FASTECH 自有品牌｜條碼掃描設備');
      card.setAttribute('title','FASTECH 自有品牌｜條碼掃描設備');
    }
  }

  function run(){addStyle();markOwnBrand();}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,120);setTimeout(run,500)},{once:true});
  if(document.readyState!=='loading')setTimeout(run,0);
})();
