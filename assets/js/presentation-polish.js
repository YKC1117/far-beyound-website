(function(){
  const BRAND_NAMES=['Zebra','TSC','Argox','GoDEX','Honeywell','SATO','TOSHIBA','NUMA','Fastech'];
  function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function injectStyles(){
    if(document.getElementById('fbPresentationPolish'))return;
    const s=document.createElement('style');s.id='fbPresentationPolish';s.textContent=`
      :root{--polish-shadow:0 20px 55px rgba(9,32,59,.11)}
      body{background:#f5f7fa}
      .site-header{border-bottom-color:rgba(211,222,231,.95)}
      .header-inner{height:74px}
      .brand-mark{width:46px!important;height:46px!important;transform:none!important;border-radius:12px!important}
      .brand-copy strong{font-size:21px}.brand-copy small{letter-spacing:.19em}
      .hero{min-height:575px}.hero-inner{padding:64px 0}.hero-copy h1{max-width:670px}.hero-copy>p{max-width:690px;line-height:1.8}
      .hero-trust span{display:inline-flex;align-items:center;gap:5px}
      .home-capability-band{position:relative;z-index:5;margin:-30px auto 0;width:min(calc(100% - 40px),1180px);display:grid;grid-template-columns:repeat(4,1fr);background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:var(--polish-shadow);overflow:hidden}
      .home-capability{padding:21px 23px;display:flex;gap:13px;align-items:center;border-right:1px solid #e7edf2}.home-capability:last-child{border-right:0}.home-capability i{width:39px;height:39px;display:grid;place-items:center;flex:none;border-radius:12px;background:#eaf8f6;color:var(--teal);font-style:normal;font-size:18px;font-weight:900}.home-capability b{display:block;font-size:14px}.home-capability small{display:block;color:var(--muted);font-size:10px;margin-top:1px}
      .brand-band{padding:23px 0;background:#fff;border-top:1px solid #eef2f5;border-bottom:1px solid #e5ebf0}.brand-band-inner{display:flex;align-items:center;gap:26px}.brand-band-title{min-width:130px}.brand-band-title small{display:block;color:var(--teal);font-size:9px;font-weight:900;letter-spacing:.13em}.brand-band-title b{font-size:13px}.brand-rail{display:flex;align-items:center;justify-content:space-between;gap:13px;flex:1;flex-wrap:wrap}.brand-rail span{font-weight:900;color:#52647a;font-size:13px;letter-spacing:.02em}
      .section{padding:76px 0}.section-head{margin-bottom:30px}.section-head h2{letter-spacing:-.025em}.section-head p{line-height:1.8}
      .category-card,.product-card,.solution-card,.case-pill,.contact-card,.download-item{transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease}
      .product-card{box-shadow:0 5px 18px rgba(9,32,59,.035)}.product-card:hover{box-shadow:0 20px 48px rgba(9,32,59,.12)}
      .solution-grid{grid-template-columns:repeat(4,1fr)!important}.solution-card{min-height:270px;display:flex;flex-direction:column}.solution-card p{min-height:0;flex:1}.solution-card .card-link{margin-top:auto}
      .case-pill:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(9,32,59,.08);border-color:#bddedb}
      .page-hero{padding:60px 0}.page-hero p{line-height:1.85}
      .download-content-head p{max-width:700px;color:var(--muted)}
      .site-footer{padding-top:54px}.footer-bottom{opacity:.9}
      .back-top{position:fixed;right:24px;bottom:24px;z-index:45;width:44px;height:44px;border-radius:13px;border:1px solid rgba(255,255,255,.22);background:#0b958d;color:#fff;display:grid;place-items:center;box-shadow:0 14px 30px rgba(9,32,59,.2);opacity:0;transform:translateY(12px);pointer-events:none;transition:.2s}.back-top.show{opacity:1;transform:none;pointer-events:auto}.back-top:hover{background:#087b75}
      .proposal-chip{display:inline-flex;align-items:center;gap:7px;background:rgba(23,182,167,.12);border:1px solid rgba(119,222,212,.22);color:#a6eee7;border-radius:999px;padding:6px 10px;font-size:10px;font-weight:800;margin-bottom:9px}.proposal-chip i{width:6px;height:6px;border-radius:50%;background:#64ddd1}
      @media(max-width:980px){.home-capability-band{grid-template-columns:1fr 1fr}.home-capability:nth-child(2){border-right:0}.home-capability:nth-child(-n+2){border-bottom:1px solid #e7edf2}.solution-grid{grid-template-columns:1fr 1fr!important}.brand-band-inner{display:block}.brand-band-title{margin-bottom:12px}}
      @media(max-width:680px){
        .header-inner{height:66px}.brand-mark{width:42px!important;height:42px!important}.hero{min-height:auto}.hero-inner{padding:44px 0 48px;gap:26px}.hero-copy h1{font-size:39px;margin-top:9px}.hero-copy>p{font-size:14px;margin-bottom:0}.hero-actions{margin:24px 0 18px}.hero-trust{gap:11px;margin-top:20px}.home-photo-showcase{min-height:275px!important}.home-photo-main .cap{left:12px!important;right:12px!important;bottom:12px!important}.home-capability-band{margin:-1px auto 0;width:100%;border-radius:0;border-left:0;border-right:0;box-shadow:none}.home-capability{padding:17px 15px}.home-capability i{width:35px;height:35px}.home-capability small{font-size:9px}.brand-band{padding:19px 0}.brand-rail{justify-content:flex-start;gap:9px 17px}.brand-rail span{font-size:12px}.section{padding:58px 0}.solution-grid{grid-template-columns:1fr!important}.solution-card{min-height:0}.back-top{right:15px;bottom:15px}.topbar-inner{min-height:32px}}
    `;document.head.appendChild(s);
  }
  function cleanDemoCopy(){
    const body=document.body;
    if(body.dataset.page==='home'){
      const p=[...document.querySelectorAll('.section-head p')].find(x=>x.textContent.includes('正式版可由公司後台'));
      if(p)p.textContent='依設備類型、品牌與使用場景快速找到合適方案，從選型、耗材到後續維修皆可由同一服務窗口協助。';
      const boxes=document.querySelectorAll('.console-status .status-box');
      if(boxes[2]){const b=boxes[2].querySelector('b'),s=boxes[2].querySelector('small');if(b)b.textContent='4';if(s)s.textContent='系統整合方案'}
    }
    if(body.dataset.page==='downloads'){
      const hero=document.querySelector('.page-hero p');if(hero)hero.textContent='依品牌快速找到標籤機驅動程式、標籤軟體、工具程式與技術文件。';
      const p=document.querySelector('.download-content-head p');if(p)p.textContent='選擇品牌查看目前整理的驅動、軟體、工具與文件資訊。';
    }
    document.querySelectorAll('.footer-bottom span').forEach(el=>{if(/新版網站|v0\./i.test(el.textContent))el.textContent='萬里資訊新版官網提案 · PREVIEW';});
    document.querySelectorAll('.demo-download .download-cta').forEach(el=>el.textContent='檔案資訊');
    document.querySelectorAll('.download-item .demo-download').forEach(el=>el.textContent='查看下載');
  }
  function addCapabilityBand(){
    if(document.body.dataset.page!=='home'||document.querySelector('.home-capability-band'))return;
    const hero=document.querySelector('.hero');if(!hero)return;
    const wrap=document.createElement('div');wrap.className='home-capability-band';wrap.innerHTML=`
      <a class="home-capability" href="products.html"><i>01</i><span><b>設備選型</b><small>條碼列印 · 掃描 · RFID · 行動設備</small></span></a>
      <a class="home-capability" href="products.html?category=labels"><i>02</i><span><b>標籤耗材</b><small>貼紙 · 碳帶 · 客製代印</small></span></a>
      <a class="home-capability" href="products.html?category=parts"><i>03</i><span><b>維修服務</b><small>檢測 · 零件 · 技術支援</small></span></a>
      <a class="home-capability" href="solutions.html"><i>04</i><span><b>系統整合</b><small>SFIS · WMS · SMT · 條碼整合</small></span></a>`;
    hero.insertAdjacentElement('afterend',wrap);
  }
  function addBrandBand(){
    if(document.body.dataset.page!=='home'||document.querySelector('.brand-band'))return;
    const cap=document.querySelector('.home-capability-band');if(!cap)return;
    const sec=document.createElement('section');sec.className='brand-band';sec.innerHTML=`<div class="container brand-band-inner"><div class="brand-band-title"><small>MULTI-BRAND SUPPORT</small><b>多品牌設備與耗材支援</b></div><div class="brand-rail">${BRAND_NAMES.map(x=>`<span>${esc(x)}</span>`).join('')}</div></div>`;
    cap.insertAdjacentElement('afterend',sec);
  }
  function addProposalChip(){
    if(document.body.dataset.page!=='home'||document.querySelector('.proposal-chip'))return;
    const eyebrow=document.querySelector('.hero-copy .eyebrow');if(!eyebrow)return;
    eyebrow.insertAdjacentHTML('beforebegin','<span class="proposal-chip"><i></i>企業自動識別與智慧製造整合</span>');
  }
  function addBackTop(){
    if(document.querySelector('.back-top'))return;
    const b=document.createElement('button');b.type='button';b.className='back-top';b.setAttribute('aria-label','回到頁首');b.innerHTML='↑';document.body.appendChild(b);b.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});const sync=()=>b.classList.toggle('show',scrollY>600);addEventListener('scroll',sync,{passive:true});sync();
  }
  function enhanceContact(){
    if(document.body.dataset.page!=='contact')return;
    const success=document.getElementById('formSuccess');if(success)success.innerHTML='<b>資料填寫完成</b><br>目前為網站提案環境；正式上線後此表單將直接送至公司指定信箱或後台。';
  }
  function run(){injectStyles();cleanDemoCopy();addCapabilityBand();addBrandBand();addProposalChip();addBackTop();enhanceContact()}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,100)});if(document.readyState!=='loading')setTimeout(run,0);
})();