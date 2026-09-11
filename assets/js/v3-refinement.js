(function(){
  const DOWNLOAD_ORDER=['Zebra','Argox','TSC','GoDEX','TOSHIBA','SATO','Honeywell','遠端連線','Microsoft'];
  const BRAND_LOGOS={
    zebra:'assets/images/brands/zebra.png',argox:'assets/images/brands/argox.png',tsc:'assets/images/brands/tsc.png',godex:'assets/images/brands/godex.png',toshiba:'assets/images/brands/toshiba.png',sato:'assets/images/brands/sato.png',honeywell:'assets/images/brands/honeywell.png',fastech:'assets/images/brands/fastech.svg',numa:'assets/images/brands/numa.png',datalogic:'assets/images/brands/datalogic.png'
  };
  function applyBrandIdentity(){
    document.querySelectorAll('.brand-copy strong').forEach(el=>{if(!el.querySelector('.brand-reg'))el.insertAdjacentHTML('beforeend','<sup class="brand-reg" aria-label="registered trademark">®</sup>')});
    document.querySelectorAll('.header-inner .brand-copy small').forEach(el=>{el.textContent='FAR-BEYOUND INFORMATION'});
    document.querySelectorAll('.footer-brand .brand-copy small').forEach(el=>{el.textContent='FAR-BEYOUND INFORMATION'});
  }
  function brandFromHref(el){try{return new URL(el.href,location.href).searchParams.get('brand')||''}catch(e){return ''}}
  function upgradeBrandPortfolio(){
    const note=document.querySelector('.brand-portfolio-head>p');if(note)note.textContent='多品牌設備選型、耗材供應與技術服務';
    document.querySelectorAll('.brand-portfolio .brand-wordmark').forEach(a=>{
      if(a.dataset.logoReady==='1')return;
      const name=(brandFromHref(a)||a.textContent||'').trim(),key=name.toLowerCase().replace(/[^a-z0-9]/g,'');
      let src=BRAND_LOGOS[key],alt=name;
      if(key==='honeywell'&&a.closest('.brand-family')&&!a.closest('.brand-family').classList.contains('scanner')){src='assets/images/brands/datamax-oneil.png';alt='Honeywell (Datamax / Intermec)'}
      if(!src)return;
      a.dataset.logoReady='1';a.setAttribute('aria-label',name+' 產品');
      const img=document.createElement('img');img.className='brand-logo-img';img.src=src;img.alt=alt;img.loading='eager';img.decoding='async';
      const label=document.createElement('span');label.className='brand-logo-label';label.textContent=name;a.replaceChildren(img,label);
    });
  }
  function upgradeProductMega(){
    const menu=document.querySelector('.nav-item.has-mega .mega-menu');if(!menu||menu.dataset.v3==='1')return;menu.dataset.v3='1';
    const brandLinks=(category,brands)=>brands.map(b=>`<a href="products.html?category=${category}&brand=${encodeURIComponent(b[0])}"><span>${b[1]||b[0]}</span></a>`).join('');
    const categoryLinks=(items)=>items.map(x=>`<a href="products.html?category=${x[0]}"><span>${x[1]}</span></a>`).join('');
    menu.innerHTML=`<div class="mega-head"><div><span class="eyebrow">PRODUCT INFORMATION</span><h3>產品與品牌</h3></div><a href="products.html" class="text-link">完整產品目錄 →</a></div><div class="v3-product-mega"><div class="v3-mega-group"><div class="v3-mega-title"><span>01</span><div><strong>標籤條碼列印機</strong><small>LABEL PRINTERS</small></div></div><div class="v3-mega-links">${brandLinks('printers',[['Zebra'],['Argox'],['TSC'],['GoDEX'],['TOSHIBA'],['SATO'],['Honeywell','Honeywell (Datamax/Intermec)']])}</div></div><div class="v3-mega-group"><div class="v3-mega-title"><span>02</span><div><strong>條碼掃描器</strong><small>BARCODE SCANNERS</small></div></div><div class="v3-mega-links">${brandLinks('scanners',[['Fastech'],['Zebra'],['Honeywell'],['NUMA'],['Datalogic']])}</div></div><div class="v3-mega-group"><div class="v3-mega-title"><span>03</span><div><strong>自動識別設備</strong><small>AUTO ID</small></div></div><div class="v3-mega-links">${categoryLinks([['rfid','RFID 設備'],['mobile','行動電腦'],['labels','標籤貼紙與碳帶']])}</div></div><div class="v3-mega-group"><div class="v3-mega-title"><span>04</span><div><strong>服務與軟體</strong><small>SERVICE</small></div></div><div class="v3-mega-links">${categoryLinks([['printing','標籤貼紙代印'],['software','標籤軟體'],['parts','標籤機維修 / 配件']])}</div></div></div>`;
  }
  function orderIndex(name){let n=name;if(n.startsWith('Honeywell'))n='Honeywell';if(n.startsWith('遠端連線'))n='遠端連線';const i=DOWNLOAD_ORDER.indexOf(n);return i<0?999:i}
  function fixDownloadNavigation(){
    document.querySelectorAll('.subnav-panel').forEach(panel=>{const links=[...panel.querySelectorAll('.subnav-link')].filter(a=>a.href.includes('downloads.html?brand='));if(!links.length)return;const grid=links[0].parentElement;links.sort((a,b)=>orderIndex(brandFromHref(a))-orderIndex(brandFromHref(b))).forEach(a=>grid.appendChild(a))});
    document.querySelectorAll('.mobile-nav-group').forEach(group=>{if(!group.querySelector('summary')?.textContent.includes('下載服務'))return;const box=group.querySelector('.mobile-nav-sub');if(!box)return;const links=[...box.querySelectorAll('a')].filter(a=>a.href.includes('downloads.html?brand='));links.sort((a,b)=>orderIndex(brandFromHref(a))-orderIndex(brandFromHref(b))).forEach(a=>box.appendChild(a))});
  }
  function compactHome(){
    if(document.body.dataset.page!=='home')return;
    document.getElementById('brandShowcase')?.remove();document.getElementById('aboutBand')?.remove();
    const categoryGrid=document.getElementById('homeCategories');categoryGrid?.closest('section')?.remove();
    const grid=document.getElementById('homeProducts');if(grid)[...grid.children].slice(6).forEach(x=>x.remove());
    const news=document.getElementById('homeNews');if(news)[...news.children].slice(3).forEach(x=>x.remove());
  }
  function cleanFooter(){document.querySelectorAll('.footer-bottom span').forEach((el,i)=>{if(i===1||/測試|提案|PREVIEW|v0\./i.test(el.textContent))el.textContent='所有其他商標均為各自所有者之財產'})}
  function run(){applyBrandIdentity();upgradeProductMega();fixDownloadNavigation();compactHome();upgradeBrandPortfolio();cleanFooter()}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,150);setTimeout(run,450);setTimeout(run,800)});
  if(document.readyState!=='loading')setTimeout(run,0);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,100));
})();
