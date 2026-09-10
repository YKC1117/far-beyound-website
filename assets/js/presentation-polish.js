(function(){
  let sanitizing=false;
  const TAIPEI_ADDRESS='新北市中和區中山路二段351號10樓之1';
  const TAINAN_ADDRESS='台南市永康區中華路425號4樓之18';
  const mapUrl=address=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

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
    if(document.getElementById('fbPresentationPolish'))return;
    const st=document.createElement('style');st.id='fbPresentationPolish';st.textContent=`
      .footer-location{width:100%;display:grid!important;gap:2px!important;margin:7px 0!important;padding:9px 10px!important;border:1px solid rgba(255,255,255,.10);border-radius:9px;transition:.18s;background:rgba(255,255,255,.025)}
      .footer-location:hover{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.2)}
      .footer-location-head{display:flex!important;align-items:center;justify-content:space-between;width:100%;margin:0!important;color:#fff!important;font-size:11px!important;font-weight:800}
      .footer-location-head small{color:#78ded5;font-size:9px;font-weight:800}
      .footer-location-address{display:block!important;margin:0!important;color:#afc0d1!important;font-size:11px!important;line-height:1.55}
      .footer-bottom{justify-content:flex-start!important}
      .quick-back-arrow{display:block;font-size:22px;line-height:20px;font-weight:700;margin-top:-2px}
      @media(max-width:680px){.footer-location{padding:9px!important}.footer-location-address{font-size:10px!important}}
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
    const ob=new MutationObserver(()=>queueMicrotask(()=>{sanitizePublicText();polishFooter();attachBackTop()}));
    ob.observe(document.body,{childList:true,subtree:true,characterData:true});
  }

  function attachBackTop(){
    if(document.body.dataset.page==='admin')return;
    document.querySelectorAll('.back-top').forEach(el=>el.remove());
    const rail=document.querySelector('.quick-contact');
    if(!rail||rail.querySelector('[data-back-top]'))return;
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
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,100);setTimeout(run,700);setTimeout(run,1800)});
  if(document.readyState!=='loading'){setTimeout(run,0);setTimeout(run,700);setTimeout(run,1800)}
})();
