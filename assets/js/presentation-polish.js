(function(){
  let sanitizing=false;
  const TAIPEI_ADDRESS='新北市中和區中山路二段351號10樓之1';
  const TAINAN_ADDRESS='台南市永康區中華路425號4樓之18';
  const mapUrl=address=>`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  function sanitizePublicText(){
    if(document.body.dataset.page==='admin'||sanitizing)return;
    sanitizing=true;
    const replacements=[
      ['正式版可由後台上傳型錄、手冊與快速指南。','如需型錄、手冊或快速指南，歡迎聯絡我們。'],
      ['正式檔案空間尚未接入','如需此檔案，歡迎聯絡我們'],
      ['測試環境尚未掛載正式檔案','如需此檔案，歡迎聯絡我們'],
      ['新聞內頁將於完整資料搬移階段接入','更多資訊請參閱最新消息內容'],
      ['新版網站測試環境','萬里資訊股份有限公司'],
      ['網站提案預覽','萬里資訊股份有限公司'],
      ['原官網產品資料','產品資料'],
      ['新版目錄','產品目錄'],
      ['正式版','']
    ];
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const nodes=[];let n;while((n=walker.nextNode()))nodes.push(n);
    nodes.forEach(node=>{
      if(['SCRIPT','STYLE','NOSCRIPT'].includes(node.parentElement?.tagName||''))return;
      let text=node.nodeValue||'',next=text;
      replacements.forEach(([a,b])=>{next=next.split(a).join(b)});
      if(next!==text)node.nodeValue=next;
    });
    sanitizing=false;
  }

  function styles(){
    if(document.body.classList.contains('fb-approved-skin-20260916'))return;
    if(document.getElementById('fbPresentationPolish'))return;
    const st=document.createElement('style');st.id='fbPresentationPolish';st.textContent=`
      :root{--fb-ink:#17344a;--fb-muted:#687d8c;--fb-line:#dfe8ed;--fb-soft:#f5f8fa;--fb-accent:#087d96}
      body[data-page]:not([data-page="admin"]){background:#f6f9fb;color:var(--fb-ink)}
      .site-header{background:rgba(255,255,255,.94)!important;border-bottom-color:rgba(198,213,222,.72)!important;box-shadow:0 2px 18px rgba(19,49,68,.045)!important}
      .header-inner{height:78px!important}
      .brand-copy strong{color:#17344a!important;font-weight:850!important}
      .brand-copy small{color:#8294a0!important}
      .desktop-nav>.nav-item>a,.desktop-nav>a{color:#294b60!important}
      .desktop-nav>.nav-item>a:hover,.desktop-nav>a:hover,.desktop-nav>.nav-item.current>a,.desktop-nav>a.current{color:#087d96!important}
      .header-actions .btn{border-radius:10px!important;font-weight:800!important}
      .hero-actions .btn{box-shadow:0 8px 20px rgba(15,52,73,.10)}
      .hero-actions .btn-secondary{box-shadow:none!important}
      .section{padding:88px 0!important}
      .section-head{margin-bottom:38px!important}
      .section-head h2{font-weight:800!important;letter-spacing:-.035em!important}
      .section-head p{line-height:1.9!important}
      .v5-credibility{box-shadow:0 1px 0 rgba(17,52,72,.03)}
      .v5-cred-item{min-height:108px!important;display:flex!important;align-items:center!important}
      .v5-cred-key{font-weight:850!important}
      .v5-cred-copy{gap:3px!important}
      .category-card,.product-card,.solution-card,.v5-case-card{box-shadow:0 10px 28px rgba(20,55,75,.055)!important}
      .category-card:hover,.product-card:hover,.solution-card:hover,.v5-case-card:hover{box-shadow:0 20px 42px rgba(20,55,75,.11)!important}
      .product-card-visual{height:248px!important}
      .product-card-body{padding:22px!important}
      .product-card h3{font-weight:800!important;letter-spacing:-.02em!important}
      .solution-card{min-height:260px!important}
      .v5-case-card{padding:26px!important}
      .v5-case-card h3{font-weight:800!important;letter-spacing:-.02em!important}
      .news-row{padding:20px 10px!important}
      .news-row:hover{border-radius:10px!important;background:#f9fbfc!important}
      .cta-band{box-shadow:0 18px 45px rgba(18,57,76,.14)!important}
      .footer-location{width:100%;display:grid!important;gap:2px!important;margin:7px 0!important;padding:9px 10px!important;border:1px solid rgba(255,255,255,.10);border-radius:9px;transition:.18s;background:rgba(255,255,255,.025)}
      .footer-location:hover{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.2)}
      .footer-location-head{display:flex!important;align-items:center;justify-content:space-between;width:100%;margin:0!important;color:#fff!important;font-size:11px!important;font-weight:800}
      .footer-location-head small{color:#78ded5;font-size:9px;font-weight:800}
      .footer-location-address{display:block!important;margin:0!important;color:#afc0d1!important;font-size:11px!important;line-height:1.55}
      .footer-bottom{justify-content:flex-start!important}
      .quick-back-arrow{display:block;font-size:22px;line-height:20px;font-weight:700;margin-top:-2px}
      @media(max-width:980px){
        .header-inner{height:68px!important}
        .section{padding:64px 0!important}
        .section-head{margin-bottom:28px!important;align-items:flex-start!important}
        .section-head p{line-height:1.75!important}
        .v5-cred-item{min-height:96px!important}
        .product-card-visual{height:220px!important}
        .solution-card{min-height:0!important}
        .cta-band{margin-bottom:24px!important}
      }
      @media(max-width:680px){
        .container{width:min(calc(100% - 32px),1180px)!important}
        .section{padding:54px 0!important}
        .section-head h2{font-size:30px!important}
        .section-head p{font-size:12px!important}
        .v5-cred-item{padding:16px 13px!important}
        .product-card-visual{height:205px!important}
        .product-card-body{padding:18px!important}
        .news-row{grid-template-columns:64px 1fr 22px!important;gap:11px!important;padding:16px 5px!important}
        .news-date b{font-size:21px!important}
        .cta-band{border-radius:18px!important;padding:28px 22px!important}
        .cta-band h2{font-size:23px!important;line-height:1.35!important}
        .cta-band p{font-size:12px!important;line-height:1.75!important}
        .footer-location{padding:9px!important}.footer-location-address{font-size:10px!important}
      }
    `;document.head.appendChild(st);
  }

  function polishFooter(){
    if(document.body.dataset.page==='admin')return;
    const footer=document.querySelector('.site-footer');if(!footer)return;
    const d=window.FBStore?.getData?.();
    const contact=[...footer.querySelectorAll('.footer-grid>div')].find(el=>el.querySelector('h4')?.textContent.trim()==='聯絡資訊');
    if(contact&&!contact.dataset.locationPatched){
      const phones=(d?.site?.phones||[{label:'台北',value:'02-82217759'},{label:'台南',value:'06-2360139'}]);
      const email=d?.site?.email||'company@far-beyound.com.tw';
      contact.innerHTML=`<h4>聯絡資訊</h4>${phones.map(p=>`<a href="tel:${String(p.value).replace(/-/g,'')}">${p.label} ${p.value}</a>`).join('')}<a href="mailto:${email}">${email}</a><a class="footer-location" href="${mapUrl(TAIPEI_ADDRESS)}" target="_blank" rel="noopener" aria-label="使用 Google 地圖導航至台北辦公室"><span class="footer-location-head">台北辦公室 <small>Google 導航 ↗</small></span><span class="footer-location-address">${TAIPEI_ADDRESS}</span></a><a class="footer-location" href="${mapUrl(TAINAN_ADDRESS)}" target="_blank" rel="noopener" aria-label="使用 Google 地圖導航至台南辦公室"><span class="footer-location-head">台南辦公室 <small>Google 導航 ↗</small></span><span class="footer-location-address">${TAINAN_ADDRESS}</span></a>`;
      contact.dataset.locationPatched='1';
    }
    const bottom=footer.querySelector('.footer-bottom');
    if(bottom){[...bottom.querySelectorAll(':scope>span')].slice(1).forEach(el=>el.remove())}
  }

  function cleanCopy(){
    if(document.body.dataset.page==='downloads'){
      const hero=document.querySelector('.page-hero p');
      if(hero)hero.textContent='依品牌快速找到標籤機驅動程式、標籤軟體、工具程式與技術文件。';
    }
    polishFooter();
    sanitizePublicText();
  }

  function watchPublicCopy(){
    if(document.body.dataset.page==='admin'||window.__fbCopyObserver)return;
    window.__fbCopyObserver=true;
    const ob=new MutationObserver(()=>queueMicrotask(()=>{sanitizePublicText();polishFooter()}));
    ob.observe(document.body,{childList:true,subtree:true,characterData:true});
  }

  function attachBackTop(){
    if(document.body.dataset.page==='admin')return;
    const rail=document.querySelector('.quick-contact');
    if(!rail||rail.querySelector('[data-back-top]'))return;
    const old=rail.querySelector('.back-top');if(old)old.remove();
    const item=document.createElement('div');item.className='quick-contact-item';item.dataset.backTop='1';
    item.innerHTML='<button type="button" class="quick-contact-btn" aria-label="回到頁首" title="回到頁首"><span class="quick-back-arrow" aria-hidden="true">↑</span><span>TOP</span></button>';
    item.querySelector('button').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
    rail.appendChild(item);
  }

  function contactNote(){
    if(document.body.dataset.page!=='contact')return;
    const success=document.getElementById('formSuccess');
    if(success)success.innerHTML='<b>感謝您的詢問</b><br>我們將依您提供的聯絡資料與需求內容協助確認後續。';
  }

  function run(){styles();cleanCopy();watchPublicCopy();attachBackTop();contactNote()}
  document.addEventListener('DOMContentLoaded',run,{once:true});
  if(document.readyState!=='loading')run();
})();
