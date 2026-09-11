(function(){
  if(document.body.dataset.page!=='home'||window.__fbHomeBrandPolish)return;
  window.__fbHomeBrandPolish=true;

  const GUIDE_ITEMS=[
    {
      no:'01',title:'標籤條碼列印機',en:'LABEL PRINTERS',desc:'工業型、桌上型與行動型標籤列印設備，依印量、解析度與作業環境協助選型。',
      brands:['Zebra','Argox','TSC','GoDEX','TOSHIBA','SATO','Honeywell'],
      href:'products.html?category=printers',primary:'查看列印設備',secondaryHref:'contact.html',secondary:'詢問選型',icon:'printer'
    },
    {
      no:'02',title:'列印耗材',en:'LABELS & RIBBONS',desc:'標籤紙、碳帶與客製規格，可依材質、尺寸、黏性及實際使用環境協助搭配。',
      brands:['各式標籤紙','碳帶','客製規格'],
      href:'products.html?category=labels',primary:'查看耗材',secondaryHref:'contact.html',secondary:'耗材詢問',icon:'label'
    },
    {
      no:'03',title:'標籤編輯軟體',en:'LABEL SOFTWARE',desc:'正版授權、安裝設定與導入服務，協助建立條碼、標籤格式及列印作業流程。',
      brands:['BarTender','CodeSoft'],
      href:'products.html?category=software',primary:'了解軟體',secondaryHref:'downloads.html',secondary:'下載服務',icon:'software'
    },
    {
      no:'04',title:'條碼掃描器',en:'BARCODE SCANNERS',desc:'一維、二維、有線與無線掃描設備，依條碼類型、距離與現場環境選擇適合機種。',
      brands:['FASTECH','Zebra','NUMA','Honeywell','Datalogic'],
      href:'products.html?category=scanners',primary:'查看掃描設備',secondaryHref:'downloads.html',secondary:'下載服務',icon:'scanner'
    },
    {
      no:'05',title:'行動裝置 PDA',en:'MOBILE COMPUTERS',desc:'適用倉儲盤點、物流、生產與現場作業的企業行動終端與資料收集設備。',
      brands:['Zebra','UROVO'],
      href:'products.html?category=mobile',primary:'查看行動裝置',secondaryHref:'contact.html',secondary:'需求詢問',icon:'mobile'
    }
  ];

  const ICONS={
    printer:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8V3h10v5M7 17h10v4H7zM5 16H3v-6h18v6h-2M17 12h.01"/></svg>',
    label:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h10l6 7-6 7H4zM8 9h.01M8 13h8M8 16h5"/></svg>',
    software:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4zM4 9h16M8 4v5M8 14h4M8 17h8"/></svg>',
    scanner:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v5H7zM9 8v4l-3 2v7h12v-9l-3-4M3 12v-2h3M21 12v-2h-3M9 16h6"/></svg>',
    mobile:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10v20H7zM10 5h4M10 18h4M10 9h4v5h-4z"/></svg>'
  };

  function addStyle(){
    if(document.getElementById('fbHomeBrandPolishStyle'))return;
    const s=document.createElement('style');
    s.id='fbHomeBrandPolishStyle';
    s.textContent=`
      body[data-page="home"] .v2-service-strip{display:none!important}

      /* Homepage quick service guide — formal corporate version */
      .fb-home-guide{padding:62px 0 58px;background:#f6f9fb;border-bottom:1px solid #e5edf2}
      .fb-home-guide-head{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,470px);gap:42px;align-items:end;margin-bottom:26px}
      .fb-home-guide-kicker{display:block;margin-bottom:9px;font-size:10px;line-height:1;font-weight:800;letter-spacing:.2em;color:#078fad}
      .fb-home-guide-head h2{margin:0;color:#17344e;font-size:31px;line-height:1.2;letter-spacing:-.035em;font-weight:780}
      .fb-home-guide-head p{margin:0;color:#667d8f;font-size:13px;line-height:1.8}
      .fb-home-guide-note{display:inline-flex;align-items:center;gap:8px;margin-top:14px;color:#48667c;font-size:11px;font-weight:700}
      .fb-home-guide-note:before{content:"";width:7px;height:7px;border-radius:50%;background:#16a1c4;box-shadow:0 0 0 4px rgba(22,161,196,.10)}

      .fb-service-cards{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));background:#fff;border:1px solid #dfe8ee;box-shadow:0 16px 42px rgba(28,60,84,.06)}
      .fb-service-card{position:relative;min-width:0;min-height:360px;padding:25px 22px 22px;border-right:1px solid #e3ebf0;background:#fff;display:flex;flex-direction:column;transition:transform .18s ease,box-shadow .18s ease,background .18s ease}
      .fb-service-card:last-child{border-right:0}
      .fb-service-card:before{content:"";position:absolute;left:0;right:0;top:0;height:3px;background:#173f5f;transform:scaleX(0);transform-origin:left;transition:transform .2s ease}
      .fb-service-card:hover{z-index:2;transform:translateY(-4px);box-shadow:0 18px 34px rgba(26,61,88,.10);background:#fbfdff}
      .fb-service-card:hover:before{transform:scaleX(1)}
      .fb-service-card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:21px}
      .fb-service-icon{width:42px;height:42px;display:grid;place-items:center;color:#176487;background:#eef7fa;border:1px solid #d6e9f0}
      .fb-service-icon svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.55;stroke-linecap:round;stroke-linejoin:round}
      .fb-service-no{font-size:10px;line-height:1;font-weight:800;letter-spacing:.12em;color:#9aabb7}
      .fb-service-card h3{margin:0;color:#17344e;font-size:20px;line-height:1.35;letter-spacing:-.02em;font-weight:760}
      .fb-service-en{display:block;margin-top:7px;color:#8a9daa;font-size:8px;line-height:1;font-weight:800;letter-spacing:.16em}
      .fb-service-desc{margin:17px 0 0;color:#667b8b;font-size:12px;line-height:1.75;min-height:64px}
      .fb-service-tags{display:flex;flex-wrap:wrap;align-content:flex-start;gap:7px;margin:20px 0 22px;padding-top:18px;border-top:1px solid #edf1f4}
      .fb-service-tag{display:inline-flex;align-items:center;min-height:28px;padding:5px 9px;border:1px solid #dce5ea;background:#fff;color:#35566c;font-size:9px;font-weight:750;letter-spacing:.035em;line-height:1.2}
      .fb-service-tag.is-own{border-color:#b7dce9;background:#f0f9fc;color:#0b7e9f}
      .fb-service-actions{display:flex;flex-direction:column;gap:8px;margin-top:auto}
      .fb-service-primary,.fb-service-secondary{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:39px;padding:9px 11px;text-decoration:none;font-size:10px;font-weight:800;letter-spacing:.03em;transition:background .16s ease,border-color .16s ease,color .16s ease}
      .fb-service-primary{background:#173f5f;color:#fff;border:1px solid #173f5f}
      .fb-service-primary:hover{background:#0e5478;border-color:#0e5478}
      .fb-service-secondary{background:#fff;color:#45657a;border:1px solid #d9e3e9}
      .fb-service-secondary:hover{color:#173f5f;border-color:#a9c4d2;background:#f8fbfd}
      .fb-service-arrow{font-size:13px;line-height:1}

      .fb-process-panel{margin-top:24px;padding:28px 30px 29px;background:#12324d;color:#fff;display:grid;grid-template-columns:240px minmax(0,1fr);gap:36px;align-items:center}
      .fb-process-intro small{display:block;margin-bottom:7px;color:#6ed1e6;font-size:9px;font-weight:800;letter-spacing:.18em}
      .fb-process-intro h3{margin:0;font-size:22px;line-height:1.3;font-weight:760;letter-spacing:-.02em}
      .fb-process-intro p{margin:10px 0 0;color:#aabcc9;font-size:11px;line-height:1.7}
      .fb-process-steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0}
      .fb-process-step{position:relative;min-width:0;padding:3px 25px 3px 25px;border-left:1px solid rgba(255,255,255,.14)}
      .fb-process-step:first-child{border-left:0;padding-left:0}
      .fb-process-step span{display:block;margin-bottom:8px;color:#72d0e4;font-size:9px;font-weight:800;letter-spacing:.13em}
      .fb-process-step b{display:block;color:#fff;font-size:14px;line-height:1.35;font-weight:760}
      .fb-process-step p{margin:6px 0 0;color:#a9bcc8;font-size:10px;line-height:1.6}
      .fb-process-step:not(:last-child):after{content:"→";position:absolute;right:-8px;top:17px;color:#6a8799;font-size:14px}

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

      /* FASTECH own-brand tile */
      body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech{position:relative!important;min-height:104px!important;padding:0!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:left!important;color:#16324b!important;background:linear-gradient(145deg,#ffffff 0%,#f8fcff 100%)!important;border-right:1px solid #d4e5ee!important;border-bottom:1px solid #d4e5ee!important;box-shadow:inset 3px 0 0 #1595c5!important;overflow:hidden!important}
      body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech:hover{z-index:3!important;background:linear-gradient(145deg,#ffffff 0%,#f2faff 100%)!important;border-color:#b9dce9!important;box-shadow:inset 3px 0 0 #1595c5,0 10px 26px rgba(19,87,126,.10)!important}
      body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech:before,body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech:after{content:none!important;display:none!important}
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

      @media(max-width:1180px){
        .fb-service-cards{grid-template-columns:repeat(3,minmax(0,1fr))}.fb-service-card{border-bottom:1px solid #e3ebf0}.fb-service-card:nth-child(3){border-right:0}.fb-service-card:nth-child(4),.fb-service-card:nth-child(5){min-height:330px}.fb-process-panel{grid-template-columns:200px minmax(0,1fr);gap:24px}.fb-process-step{padding-left:18px;padding-right:18px}
      }
      @media(max-width:980px){
        .fb-home-guide{padding:48px 0}.fb-home-guide-head{grid-template-columns:1fr;gap:13px;align-items:start}.fb-service-cards{grid-template-columns:repeat(2,minmax(0,1fr))}.fb-service-card{min-height:330px!important}.fb-service-card:nth-child(2n){border-right:0}.fb-service-card:nth-child(3){border-right:1px solid #e3ebf0}.fb-service-card:last-child{grid-column:1/-1;border-right:0;min-height:285px!important}.fb-process-panel{grid-template-columns:1fr;gap:22px}.fb-process-steps{grid-template-columns:repeat(2,minmax(0,1fr));row-gap:22px}.fb-process-step:nth-child(3){border-left:0;padding-left:0}.fb-process-step:nth-child(2):after{display:none}
        body[data-page="home"] .brand-portfolio-head{align-items:flex-start!important;display:block!important}body[data-page="home"] .brand-portfolio-head>p{margin-top:9px!important}.fb-own-brand-main{gap:10px}.fb-own-brand-logo{width:52px!important;height:52px!important;max-width:52px!important;max-height:52px!important;flex-basis:52px}.fb-own-brand-copy strong{font-size:15px}
      }
      @media(max-width:680px){
        .fb-home-guide{padding:38px 0 42px}.fb-home-guide-head h2{font-size:26px}.fb-service-cards{display:block;border-bottom:0;box-shadow:none;background:transparent}.fb-service-card{min-height:0!important;margin-bottom:11px;border:1px solid #dfe8ee!important;padding:22px 19px;background:#fff}.fb-service-card:last-child{min-height:0!important}.fb-service-desc{min-height:0}.fb-service-actions{display:grid;grid-template-columns:1fr 1fr}.fb-process-panel{margin-top:18px;padding:24px 20px}.fb-process-steps{display:block}.fb-process-step,.fb-process-step:first-child,.fb-process-step:nth-child(3){padding:15px 0 15px 36px!important;border-left:0;border-top:1px solid rgba(255,255,255,.12)}.fb-process-step:first-child{border-top:0}.fb-process-step:before{content:attr(data-step);position:absolute;left:0;top:17px;color:#72d0e4;font-size:9px;font-weight:800}.fb-process-step span{display:none}.fb-process-step:not(:last-child):after{display:none}
        body[data-page="home"] .brand-portfolio{padding:34px 0 38px!important}body[data-page="home"] .brand-portfolio-title{display:block!important}body[data-page="home"] .brand-portfolio-title h2{margin-top:5px!important;font-size:24px!important}body[data-page="home"] .brand-family.scanner .brand-wordmark.fastech{min-width:220px!important}
      }
    `;
    document.head.appendChild(s);
  }

  function buildGuide(){
    if(document.querySelector('.fb-home-guide'))return;
    const anchor=document.querySelector('.brand-portfolio');
    if(!anchor)return;

    const section=document.createElement('section');
    section.className='fb-home-guide';
    section.setAttribute('aria-labelledby','fbQuickGuideTitle');
    section.innerHTML=`
      <div class="container">
        <div class="fb-home-guide-head">
          <div>
            <span class="fb-home-guide-kicker">QUICK SERVICE GUIDE</span>
            <h2 id="fbQuickGuideTitle">快速找到適合的設備與服務</h2>
            <span class="fb-home-guide-note">不知道型號也沒關係，先從需求類別開始即可</span>
          </div>
          <p>依您的列印、耗材、軟體、掃描或行動作業需求快速進入對應服務；如規格尚未確認，也可直接聯絡我們協助選型。</p>
        </div>
        <div class="fb-service-cards">
          ${GUIDE_ITEMS.map(item=>`<article class="fb-service-card">
            <div class="fb-service-card-top"><span class="fb-service-icon">${ICONS[item.icon]||''}</span><span class="fb-service-no">${item.no}</span></div>
            <h3>${item.title}</h3><span class="fb-service-en">${item.en}</span>
            <p class="fb-service-desc">${item.desc}</p>
            <div class="fb-service-tags">${item.brands.map(x=>`<span class="fb-service-tag${x==='FASTECH'?' is-own':''}">${x}</span>`).join('')}</div>
            <div class="fb-service-actions">
              <a class="fb-service-primary" href="${item.href}"><span>${item.primary}</span><span class="fb-service-arrow">→</span></a>
              <a class="fb-service-secondary" href="${item.secondaryHref}"><span>${item.secondary}</span><span class="fb-service-arrow">→</span></a>
            </div>
          </article>`).join('')}
        </div>
        <div class="fb-process-panel" aria-label="萬里資訊服務流程">
          <div class="fb-process-intro"><small>SERVICE PROCESS</small><h3>從需求到後續支援</h3><p>清楚四步驟，讓設備採購、耗材搭配與技術服務更容易開始。</p></div>
          <div class="fb-process-steps">
            <div class="fb-process-step" data-step="01"><span>STEP 01</span><b>確認需求</b><p>提供用途、設備或現場情況，不必先知道完整型號。</p></div>
            <div class="fb-process-step" data-step="02"><span>STEP 02</span><b>選型與資料</b><p>協助確認產品、耗材、軟體或下載資料。</p></div>
            <div class="fb-process-step" data-step="03"><span>STEP 03</span><b>報價與測試</b><p>依需求提供報價，必要時安排實機或耗材測試。</p></div>
            <div class="fb-process-step" data-step="04"><span>STEP 04</span><b>導入與支援</b><p>提供設定、維修、耗材補充與後續技術服務。</p></div>
          </div>
        </div>
      </div>`;
    anchor.parentNode.insertBefore(section,anchor);
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

  function run(){addStyle();buildGuide();markOwnBrand();}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,120);setTimeout(run,500)},{once:true});
  if(document.readyState!=='loading')setTimeout(run,0);
})();
