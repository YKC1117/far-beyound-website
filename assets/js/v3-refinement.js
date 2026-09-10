(function(){
  const DOWNLOAD_ORDER=['Zebra','Argox','TSC','GoDEX','TOSHIBA','SATO','Honeywell','遠端連線','Microsoft'];
  function applyBrandIdentity(){
    document.querySelectorAll('.brand-copy strong').forEach(el=>{
      if(!el.querySelector('.brand-reg')) el.insertAdjacentHTML('beforeend','<sup class="brand-reg" aria-label="registered trademark">®</sup>');
    });
    document.querySelectorAll('.header-inner .brand-copy small').forEach(el=>{el.textContent='FAR-BEYOUND INFORMATION'});
    document.querySelectorAll('.footer-brand .brand-copy small').forEach(el=>{el.textContent='FAR-BEYOUND INFORMATION'});
  }
  function upgradeProductMega(){
    const menu=document.querySelector('.nav-item.has-mega .mega-menu');
    if(!menu||menu.dataset.v3==='1')return;
    menu.dataset.v3='1';
    const links=(category,brands)=>brands.map(b=>`<a href="products.html?category=${category}&brand=${encodeURIComponent(b[0])}">${b[1]||b[0]}</a>`).join('');
    menu.innerHTML=`<div class="mega-head"><div><span class="eyebrow">PRODUCT INFORMATION</span><h3>產品與品牌</h3></div><a href="products.html" class="text-link">完整產品目錄 →</a></div><div class="v3-product-mega"><div class="v3-mega-group"><strong>標籤條碼列印機</strong><small>LABEL PRINTERS</small><div class="v3-mega-links">${links('printers',[['Zebra'],['Argox'],['TSC'],['GoDEX'],['TOSHIBA'],['SATO'],['Honeywell','Honeywell (Datamax/Intermec)']])}</div></div><div class="v3-mega-group"><strong>條碼掃描器</strong><small>BARCODE SCANNERS</small><div class="v3-mega-links">${links('scanners',[['Fastech'],['Zebra'],['Honeywell'],['NUMA'],['Datalogic']])}</div></div><div class="v3-mega-group"><strong>自動識別設備</strong><small>AUTO ID</small><div class="v3-mega-minor"><a href="products.html?category=rfid">RFID 設備</a><a href="products.html?category=mobile">行動電腦</a><a href="products.html?category=labels">標籤貼紙與碳帶</a></div></div><div class="v3-mega-group"><strong>服務與軟體</strong><small>SERVICE</small><div class="v3-mega-minor"><a href="products.html?category=printing">標籤貼紙代印</a><a href="products.html?category=software">標籤軟體</a><a href="products.html?category=parts">標籤機維修 / 配件</a></div></div></div>`;
  }
  function brandFromHref(el){
    try{return new URL(el.href,location.href).searchParams.get('brand')||''}catch(e){return ''}
  }
  function orderIndex(name){
    let n=name;
    if(n.startsWith('Honeywell'))n='Honeywell';
    if(n.startsWith('遠端連線'))n='遠端連線';
    const i=DOWNLOAD_ORDER.indexOf(n);return i<0?999:i;
  }
  function fixDownloadNavigation(){
    document.querySelectorAll('.subnav-panel').forEach(panel=>{
      const links=[...panel.querySelectorAll('.subnav-link')].filter(a=>a.href.includes('downloads.html?brand='));
      if(!links.length)return;
      const grid=links[0].parentElement;
      links.sort((a,b)=>orderIndex(brandFromHref(a))-orderIndex(brandFromHref(b))).forEach(a=>grid.appendChild(a));
    });
    document.querySelectorAll('.mobile-nav-group').forEach(group=>{
      if(!group.querySelector('summary')?.textContent.includes('下載服務'))return;
      const box=group.querySelector('.mobile-nav-sub');if(!box)return;
      const links=[...box.querySelectorAll('a')].filter(a=>a.href.includes('downloads.html?brand='));
      links.sort((a,b)=>orderIndex(brandFromHref(a))-orderIndex(brandFromHref(b))).forEach(a=>box.appendChild(a));
    });
  }
  function compactHome(){
    if(document.body.dataset.page!=='home') return;
    document.getElementById('brandShowcase')?.remove();
    document.getElementById('aboutBand')?.remove();
    const grid=document.getElementById('homeProducts');
    if(grid){[...grid.children].slice(6).forEach(x=>x.remove())}
    const news=document.getElementById('homeNews');
    if(news){[...news.children].slice(3).forEach(x=>x.remove())}
  }
  function cleanFooter(){
    document.querySelectorAll('.footer-bottom span').forEach((el,i)=>{
      if(i===1 || /測試|提案|PREVIEW|v0\./i.test(el.textContent)) el.textContent='所有其他商標均為各自所有者之財產';
    });
  }
  function run(){applyBrandIdentity();upgradeProductMega();fixDownloadNavigation();compactHome();cleanFooter()}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,150);setTimeout(run,450)});
  if(document.readyState!=='loading')setTimeout(run,0);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,100));
})();
