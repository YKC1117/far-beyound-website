(function(){
  if(document.body.dataset.page!=='downloads'||window.__fbDownloadsDesktopReadable)return;
  window.__fbDownloadsDesktopReadable=true;
  const style=document.createElement('style');
  style.id='fbDownloadsDesktopReadableStyle';
  style.textContent=`
  @media(min-width:981px){
    body[data-page="downloads"]{background:#f3f6f8!important}

    /* Comfortable desktop canvas */
    body[data-page="downloads"] .page-hero .container,
    body[data-page="downloads"] main>.section>.container{
      width:min(calc(100% - 64px),1280px)!important;
      max-width:1280px!important;
    }
    body[data-page="downloads"] .page-hero{
      padding:48px 0 40px!important;
      background:linear-gradient(180deg,#ffffff 0%,#f9fbfc 100%)!important;
    }
    body[data-page="downloads"] .page-hero .eyebrow{font-size:11px!important;letter-spacing:.18em!important}
    body[data-page="downloads"] .page-hero h1{
      margin:9px 0 11px!important;
      font-size:46px!important;
      line-height:1.15!important;
      letter-spacing:-.035em!important;
    }
    body[data-page="downloads"] .page-hero p{
      max-width:820px!important;
      font-size:16px!important;
      line-height:1.75!important;
      color:#637786!important;
    }
    body[data-page="downloads"] main>.section{padding:38px 0 84px!important}

    /* Download type chooser: large, descriptive cards */
    body[data-page="downloads"] .download-type-wrap{
      margin:0 0 26px!important;
      padding:26px 28px 28px!important;
      border:1px solid #dbe4e9!important;
      border-radius:17px!important;
      background:#fff!important;
      box-shadow:0 8px 28px rgba(24,57,80,.055)!important;
    }
    body[data-page="downloads"] .download-type-wrap:before{display:none!important}
    body[data-page="downloads"] .download-type-head{
      display:flex!important;
      align-items:flex-end!important;
      justify-content:space-between!important;
      gap:26px!important;
      margin:0 0 20px!important;
    }
    body[data-page="downloads"] .download-type-head>div{display:block!important}
    body[data-page="downloads"] .download-type-head .eyebrow{
      display:block!important;
      margin-bottom:6px!important;
      padding:0!important;
      background:none!important;
      font-size:10px!important;
      letter-spacing:.16em!important;
      color:#138aa5!important;
    }
    body[data-page="downloads"] .download-type-head h2{
      margin:0!important;
      font-size:25px!important;
      line-height:1.3!important;
      color:#17344e!important;
    }
    body[data-page="downloads"] .download-type-head p{
      max-width:430px!important;
      margin:0!important;
      font-size:14px!important;
      line-height:1.65!important;
      color:#748692!important;
      text-align:right!important;
    }
    body[data-page="downloads"] .download-type-grid{
      display:grid!important;
      grid-template-columns:repeat(3,minmax(0,1fr))!important;
      gap:12px!important;
    }
    body[data-page="downloads"] .download-type-card{
      position:relative!important;
      display:flex!important;
      flex-direction:column!important;
      align-items:flex-start!important;
      justify-content:flex-start!important;
      width:100%!important;
      min-height:126px!important;
      padding:18px 48px 18px 18px!important;
      border:1px solid #dce5ea!important;
      border-radius:13px!important;
      background:#fbfcfd!important;
      color:#274c64!important;
      text-align:left!important;
      box-shadow:none!important;
      transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease,background .16s ease!important;
    }
    body[data-page="downloads"] .download-type-card:before{display:none!important}
    body[data-page="downloads"] .download-type-card small{
      display:block!important;
      margin:0 0 6px!important;
      font-size:10px!important;
      line-height:1.3!important;
      font-weight:850!important;
      letter-spacing:.1em!important;
      color:#1590ab!important;
    }
    body[data-page="downloads"] .download-type-card b{
      display:block!important;
      margin:0 0 7px!important;
      font-size:17px!important;
      line-height:1.35!important;
      font-weight:780!important;
      color:inherit!important;
      white-space:normal!important;
    }
    body[data-page="downloads"] .download-type-card>span:not(.download-type-count){
      display:block!important;
      margin:0!important;
      font-size:12.5px!important;
      line-height:1.55!important;
      color:#748692!important;
    }
    body[data-page="downloads"] .download-type-count{
      position:absolute!important;
      top:16px!important;
      right:15px!important;
      display:inline-flex!important;
      align-items:center!important;
      justify-content:center!important;
      min-width:31px!important;
      height:25px!important;
      margin:0!important;
      padding:0 8px!important;
      border-radius:999px!important;
      background:#eaf0f4!important;
      color:#607786!important;
      font-size:10px!important;
      font-weight:800!important;
    }
    body[data-page="downloads"] .download-type-card:hover{
      transform:translateY(-2px)!important;
      border-color:#a9c2ce!important;
      background:#fff!important;
      box-shadow:0 9px 20px rgba(24,58,82,.08)!important;
    }
    body[data-page="downloads"] .download-type-card.active{
      background:linear-gradient(135deg,#173f5f,#1c5879)!important;
      border-color:#173f5f!important;
      color:#fff!important;
      box-shadow:0 10px 24px rgba(23,63,95,.17)!important;
    }
    body[data-page="downloads"] .download-type-card.active small,
    body[data-page="downloads"] .download-type-card.active>span:not(.download-type-count){color:#dceaf1!important}
    body[data-page="downloads"] .download-type-card.active .download-type-count{background:rgba(255,255,255,.15)!important;color:#fff!important}

    /* Main layout: brand navigation on the left, downloads on the right */
    body[data-page="downloads"] .download-layout{
      display:grid!important;
      grid-template-columns:245px minmax(0,1fr)!important;
      gap:24px!important;
      align-items:start!important;
    }
    body[data-page="downloads"] .download-sidebar{
      position:sticky!important;
      top:92px!important;
      display:flex!important;
      flex-direction:column!important;
      align-items:stretch!important;
      flex-wrap:nowrap!important;
      gap:7px!important;
      margin:0!important;
      padding:20px!important;
      border:1px solid #dbe4e9!important;
      border-radius:15px!important;
      background:#fff!important;
      box-shadow:0 7px 22px rgba(24,57,80,.045)!important;
      overflow:visible!important;
    }
    body[data-page="downloads"] .download-sidebar-title{
      display:block!important;
      min-height:0!important;
      margin:0 0 7px!important;
      padding:0 0 13px!important;
      border:0!important;
      border-bottom:1px solid #e4eaee!important;
      font-size:11px!important;
      line-height:1.4!important;
      font-weight:850!important;
      letter-spacing:.12em!important;
      color:#6f8390!important;
      white-space:normal!important;
    }
    body[data-page="downloads"] .download-brand{
      display:flex!important;
      align-items:center!important;
      justify-content:space-between!important;
      gap:10px!important;
      width:100%!important;
      min-height:45px!important;
      margin:0!important;
      padding:10px 12px!important;
      border:1px solid transparent!important;
      border-radius:9px!important;
      background:#f4f7f9!important;
      color:#405f72!important;
      font-size:13px!important;
      line-height:1.35!important;
      font-weight:720!important;
      text-align:left!important;
      white-space:normal!important;
    }
    body[data-page="downloads"] .download-brand:hover{
      background:#fff!important;
      border-color:#bbced7!important;
      color:#173f5f!important;
    }
    body[data-page="downloads"] .download-brand.active{
      background:#173f5f!important;
      border-color:#173f5f!important;
      color:#fff!important;
    }
    body[data-page="downloads"] .download-brand .brand-count{
      flex:0 0 auto!important;
      display:inline-flex!important;
      align-items:center!important;
      justify-content:center!important;
      min-width:28px!important;
      height:23px!important;
      padding:0 7px!important;
      border-radius:999px!important;
      background:#e3ebef!important;
      color:#657b89!important;
      font-size:10px!important;
      line-height:1!important;
      font-weight:800!important;
    }
    body[data-page="downloads"] .download-brand.active .brand-count{background:rgba(255,255,255,.16)!important;color:#fff!important}

    body[data-page="downloads"] .download-layout>div{
      min-width:0!important;
      padding:24px 25px 28px!important;
      border:1px solid #dbe4e9!important;
      border-radius:15px!important;
      background:#fff!important;
      box-shadow:0 7px 22px rgba(24,57,80,.045)!important;
    }

    /* Result heading */
    body[data-page="downloads"] .download-content-head{
      display:grid!important;
      grid-template-columns:minmax(0,1fr) auto!important;
      gap:6px 18px!important;
      min-height:0!important;
      margin:0 0 20px!important;
      padding:0 0 18px!important;
      border-bottom:1px solid #dce5ea!important;
    }
    body[data-page="downloads"] .download-content-head .eyebrow{display:none!important}
    body[data-page="downloads"] .download-content-head h2{
      margin:0!important;
      font-size:29px!important;
      line-height:1.3!important;
      letter-spacing:-.025em!important;
      color:#17344e!important;
    }
    body[data-page="downloads"] .download-content-head p{
      grid-column:1/-1!important;
      margin:0!important;
      font-size:13.5px!important;
      line-height:1.6!important;
      color:#778995!important;
    }
    body[data-page="downloads"] .download-result-count{
      align-self:center!important;
      margin:0!important;
      padding:7px 11px!important;
      border:1px solid #d8e3e8!important;
      border-radius:999px!important;
      background:#f5f8fa!important;
      color:#587181!important;
      font-size:11px!important;
      line-height:1!important;
      font-weight:800!important;
    }

    /* One clear reading column instead of tiny two-column cards */
    body[data-page="downloads"] .download-list{
      display:block!important;
    }
    body[data-page="downloads"] .download-group{
      display:grid!important;
      grid-template-columns:1fr!important;
      gap:11px!important;
      margin:0 0 28px!important;
    }
    body[data-page="downloads"] .download-group:last-child{margin-bottom:0!important}
    body[data-page="downloads"] .download-group-head{
      grid-column:1!important;
      display:flex!important;
      align-items:center!important;
      justify-content:space-between!important;
      gap:18px!important;
      margin:0 0 1px!important;
      padding:11px 14px!important;
      border:0!important;
      border-left:4px solid #1595b1!important;
      border-radius:7px!important;
      background:#eef5f7!important;
      color:#17344e!important;
    }
    body[data-page="downloads"] .download-group-head span{
      font-size:9px!important;
      line-height:1.3!important;
      letter-spacing:.14em!important;
      color:#158ba5!important;
    }
    body[data-page="downloads"] .download-group-head h3{
      margin:2px 0 0!important;
      font-size:18px!important;
      line-height:1.3!important;
      color:#17344e!important;
    }
    body[data-page="downloads"] .download-group-head b{
      flex:0 0 auto!important;
      padding:5px 8px!important;
      border:1px solid #d7e2e7!important;
      border-radius:999px!important;
      background:#fff!important;
      font-size:10px!important;
      color:#6d818e!important;
      font-weight:800!important;
    }

    body[data-page="downloads"] .download-item{
      position:relative!important;
      display:grid!important;
      grid-template-columns:54px minmax(0,1fr) 112px!important;
      gap:17px!important;
      align-items:center!important;
      min-height:126px!important;
      margin:0!important;
      padding:18px 18px!important;
      border:1px solid #dde6eb!important;
      border-radius:12px!important;
      background:#fff!important;
      box-shadow:0 2px 8px rgba(24,57,80,.025)!important;
      overflow:hidden!important;
    }
    body[data-page="downloads"] .download-item:before{
      content:""!important;
      position:absolute!important;
      left:0!important;
      top:16px!important;
      bottom:16px!important;
      width:3px!important;
      border-radius:3px!important;
      background:#d8e7ed!important;
    }
    body[data-page="downloads"] .download-item:hover{
      transform:none!important;
      border-color:#b5cad4!important;
      background:#fcfeff!important;
      box-shadow:0 7px 18px rgba(24,59,82,.06)!important;
    }
    body[data-page="downloads"] .download-item:hover:before{background:#1595b1!important}
    body[data-page="downloads"] .download-icon{
      width:50px!important;
      height:50px!important;
      border-radius:11px!important;
      background:#edf6f8!important;
      color:#148ba5!important;
      border:1px solid #d9e9ef!important;
    }
    body[data-page="downloads"] .download-icon svg{width:22px!important;height:22px!important}
    body[data-page="downloads"] .download-main{min-width:0!important}
    body[data-page="downloads"] .download-tags{
      display:flex!important;
      flex-wrap:wrap!important;
      gap:6px!important;
      margin:0 0 7px!important;
    }
    body[data-page="downloads"] .download-category-tag,
    body[data-page="downloads"] .download-brand-tag{
      display:inline-flex!important;
      margin:0!important;
      padding:4px 7px!important;
      border-radius:5px!important;
      font-size:9.5px!important;
      line-height:1.2!important;
      font-weight:850!important;
      letter-spacing:.02em!important;
    }
    body[data-page="downloads"] .download-main h3{
      margin:0 0 5px!important;
      font-size:17px!important;
      line-height:1.45!important;
      font-weight:760!important;
      color:#17344e!important;
    }
    body[data-page="downloads"] .download-main p{
      display:block!important;
      overflow:visible!important;
      margin:0 0 7px!important;
      font-size:13px!important;
      line-height:1.55!important;
      color:#748692!important;
    }
    body[data-page="downloads"] .download-meta{
      display:flex!important;
      flex-wrap:wrap!important;
      gap:6px 13px!important;
    }
    body[data-page="downloads"] .download-meta span{
      font-size:11px!important;
      line-height:1.45!important;
      color:#8b99a3!important;
    }
    body[data-page="downloads"] .download-action{
      justify-self:end!important;
      display:inline-flex!important;
      align-items:center!important;
      justify-content:center!important;
      min-width:108px!important;
      height:43px!important;
      padding:0 15px!important;
      border:1px solid #173f5f!important;
      border-radius:8px!important;
      background:#173f5f!important;
      color:#fff!important;
      font-size:12px!important;
      line-height:1!important;
      font-weight:800!important;
      white-space:nowrap!important;
    }
    body[data-page="downloads"] .download-action:hover{background:#0f5a7e!important;border-color:#0f5a7e!important;color:#fff!important}
    body[data-page="downloads"] .download-empty{
      padding:54px 26px!important;
      border:1px dashed #c7d6dd!important;
      border-radius:12px!important;
      background:#f9fbfc!important;
      font-size:14px!important;
      line-height:1.7!important;
      color:#6c808d!important;
    }
    body[data-page="downloads"] .download-empty b{font-size:17px!important;color:#17344e!important}
  }

  @media(min-width:981px) and (max-width:1160px){
    body[data-page="downloads"] .download-type-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
    body[data-page="downloads"] .download-layout{grid-template-columns:215px minmax(0,1fr)!important;gap:18px!important}
    body[data-page="downloads"] .download-layout>div{padding:21px!important}
    body[data-page="downloads"] .download-item{grid-template-columns:48px minmax(0,1fr) 104px!important;gap:14px!important;padding:16px!important}
  }
  `;
  document.head.appendChild(style);
})();