(function(){
  if(window.__fbPresentationPolishLite)return;
  window.__fbPresentationPolishLite=true;

  const TAIPEI_ADDRESS='新北市中和區中山路二段351號10樓之1';
  const TAINAN_ADDRESS='台南市永康區中華路425號4樓之18';
  const mapUrl=address=>`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  function sanitizePublicText(){
    if(document.body.dataset.page==='admin')return;
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
    let node;
    while((node=walker.nextNode())){
      if(['SCRIPT','STYLE','NOSCRIPT'].includes(node.parentElement?.tagName||''))continue;
      const original=node.nodeValue||'';
      let next=original;
      replacements.forEach(([from,to])=>{next=next.split(from).join(to)});
      if(next!==original)node.nodeValue=next;
    }
  }

  function polishFooter(){
    if(document.body.dataset.page==='admin')return;
    const footer=document.querySelector('.site-footer');
    if(!footer)return;
    const data=window.FBStore?.getData?.();
    const contact=[...footer.querySelectorAll('.footer-grid>div')].find(el=>el.querySelector('h4')?.textContent.trim()==='聯絡資訊');
    if(contact&&!contact.dataset.locationPatched){
      const phones=data?.site?.phones||[
        {label:'台北',value:'02-82217759'},
        {label:'台南',value:'06-2360139'}
      ];
      const email=data?.site?.email||'company@far-beyound.com.tw';
      contact.innerHTML=`<h4>聯絡資訊</h4>${phones.map(p=>`<a href="tel:${String(p.value).replace(/-/g,'')}">${p.label} ${p.value}</a>`).join('')}<a href="mailto:${email}">${email}</a><a class="footer-location" href="${mapUrl(TAIPEI_ADDRESS)}" target="_blank" rel="noopener" aria-label="使用 Google 地圖導航至台北辦公室"><span class="footer-location-head">台北辦公室 <small>Google 導航 ↗</small></span><span class="footer-location-address">${TAIPEI_ADDRESS}</span></a><a class="footer-location" href="${mapUrl(TAINAN_ADDRESS)}" target="_blank" rel="noopener" aria-label="使用 Google 地圖導航至台南辦公室"><span class="footer-location-head">台南辦公室 <small>Google 導航 ↗</small></span><span class="footer-location-address">${TAINAN_ADDRESS}</span></a>`;
      contact.dataset.locationPatched='1';
    }
    const bottom=footer.querySelector('.footer-bottom');
    if(bottom){
      [...bottom.querySelectorAll(':scope>span')].slice(1).forEach(el=>el.remove());
    }
  }

  function cleanCopy(){
    if(document.body.dataset.page==='downloads'){
      const hero=document.querySelector('.page-hero p');
      if(hero)hero.textContent='依品牌快速找到標籤機驅動程式、標籤軟體、工具程式與技術文件。';
    }
    sanitizePublicText();
    polishFooter();
  }

  function attachBackTop(){
    if(document.body.dataset.page==='admin')return;
    const rail=document.querySelector('.quick-contact');
    if(!rail||rail.querySelector('[data-back-top]'))return;
    rail.querySelector('.back-top')?.remove();
    const item=document.createElement('div');
    item.className='quick-contact-item';
    item.dataset.backTop='1';
    item.innerHTML='<button type="button" class="quick-contact-btn" aria-label="回到頁首" title="回到頁首"><span class="quick-back-arrow" aria-hidden="true">↑</span><span>TOP</span></button>';
    item.querySelector('button')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
    rail.appendChild(item);
  }

  function contactNote(){
    if(document.body.dataset.page!=='contact')return;
    const success=document.getElementById('formSuccess');
    if(success)success.innerHTML='<b>感謝您的詢問</b><br>我們將依您提供的聯絡資料與需求內容協助確認後續。';
  }

  let refreshQueued=false;
  function refresh(){
    if(document.body.dataset.page==='admin'||refreshQueued)return;
    refreshQueued=true;
    requestAnimationFrame(()=>{
      refreshQueued=false;
      cleanCopy();
      attachBackTop();
      contactNote();
    });
  }

  function boot(){
    refresh();
    // Header / Footer / quick-contact 由其他既有腳本建立，僅再補一次，不做常駐監聽。
    setTimeout(refresh,180);
    setTimeout(refresh,650);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();

  // 後台資料同步時才重跑一次，避免監聽整棵 DOM 造成持續卡頓。
  window.addEventListener('farbeyound:datachange',()=>setTimeout(refresh,60));
})();
