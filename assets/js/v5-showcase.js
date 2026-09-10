(function(){
  const PAGE_META={
    products:['標籤列印','條碼掃描','RFID','行動電腦','耗材與維修'],
    product:['產品規格','技術文件','設備洽詢'],
    solutions:['SFIS','WMS','SMT','條碼整合'],
    cases:['製造現場','倉儲管理','流程整合'],
    news:['公司公告','產品消息','系統消息'],
    downloads:['驅動程式','工具程式','標籤軟體','技術文件'],
    about:['1992 成立','台北','台南','AUTO ID'],
    locations:['台北總公司','台南分公司','技術服務'],
    contact:['設備','耗材','維修','系統整合']
  };

  function pageMeta(){
    const page=document.body.dataset.page||'';
    const items=PAGE_META[page];
    const hero=document.querySelector('.page-hero .container');
    if(!items||!hero||hero.querySelector('.v5-page-meta'))return;
    const row=document.createElement('div');
    row.className='v5-page-meta';
    row.setAttribute('aria-label','服務重點');
    row.innerHTML=items.map(x=>`<span>${x}</span>`).join('');
    hero.appendChild(row);
  }

  function createSearchTools(placeholder){
    const tools=document.createElement('div');
    tools.className='v5-catalog-tools';
    tools.innerHTML=`<div class="v5-search-wrap"><input class="v5-catalog-search" type="search" autocomplete="off" inputmode="search" placeholder="${placeholder}" aria-label="${placeholder}"></div><span class="v5-search-status" aria-live="polite"></span><button class="v5-search-clear" type="button">清除搜尋</button>`;
    return tools;
  }

  function productSearch(){
    if(document.body.dataset.page!=='products')return;
    const grid=document.getElementById('productGrid');
    const head=document.querySelector('.catalog-head');
    if(!grid||!head)return;
    let tools=document.querySelector('.v5-catalog-tools[data-kind="products"]');
    if(!tools){
      tools=createSearchTools('搜尋品牌、型號或產品名稱');
      tools.dataset.kind='products';
      head.after(tools);
    }
    const input=tools.querySelector('.v5-catalog-search');
    const status=tools.querySelector('.v5-search-status');
    const clear=tools.querySelector('.v5-search-clear');
    const count=document.getElementById('productCount');

    function apply(){
      const q=(input.value||'').trim().toLocaleLowerCase('zh-Hant');
      const cards=[...grid.querySelectorAll('.product-card')];
      let visible=0;
      cards.forEach(card=>{
        const hay=(card.textContent||'').toLocaleLowerCase('zh-Hant');
        const show=!q||hay.includes(q);
        card.hidden=!show;
        if(show)visible++;
      });
      let empty=grid.querySelector('.v5-no-results');
      if(q&&cards.length&&visible===0){
        if(!empty){empty=document.createElement('div');empty.className='v5-no-results';grid.appendChild(empty)}
        empty.textContent=`找不到「${input.value.trim()}」相關產品，可改用品牌或型號關鍵字搜尋。`;
      }else if(empty){empty.remove()}
      status.textContent=q?`顯示 ${visible} / ${cards.length} 項`:`共 ${cards.length} 項產品`;
      if(count)count.textContent=q?`${visible} 項符合`:`${cards.length} 項產品`;
      clear.hidden=!q;
    }

    if(!tools.dataset.bound){
      input.addEventListener('input',apply);
      input.addEventListener('keydown',e=>{if(e.key==='Escape'){input.value='';apply();input.blur()}});
      clear.addEventListener('click',()=>{input.value='';apply();input.focus()});
      document.addEventListener('keydown',e=>{
        if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!/input|textarea|select/i.test(document.activeElement?.tagName||'')){
          e.preventDefault();input.focus();
        }
      });
      const observer=new MutationObserver(()=>requestAnimationFrame(apply));
      observer.observe(grid,{childList:true});
      tools.dataset.bound='1';
    }
    apply();
  }

  function downloadSearch(){
    if(document.body.dataset.page!=='downloads')return;
    const list=document.getElementById('downloadList');
    const head=document.querySelector('.download-content-head');
    if(!list||!head)return;
    let tools=document.querySelector('.v5-download-tools');
    if(!tools){
      tools=createSearchTools('搜尋驅動、軟體或版本');
      tools.classList.remove('v5-catalog-tools');
      tools.classList.add('v5-download-tools');
      head.appendChild(tools);
    }
    const input=tools.querySelector('.v5-catalog-search');
    const status=tools.querySelector('.v5-search-status');
    const clear=tools.querySelector('.v5-search-clear');

    function apply(){
      const q=(input.value||'').trim().toLocaleLowerCase('zh-Hant');
      const rows=[...list.querySelectorAll('.download-item')];
      let visible=0;
      rows.forEach(row=>{
        const show=!q||(row.textContent||'').toLocaleLowerCase('zh-Hant').includes(q);
        row.hidden=!show;if(show)visible++;
      });
      status.textContent=q?`顯示 ${visible} / ${rows.length} 項`:`目前 ${rows.length} 項`;
      clear.hidden=!q;
    }
    if(!tools.dataset.bound){
      input.addEventListener('input',apply);
      input.addEventListener('keydown',e=>{if(e.key==='Escape'){input.value='';apply();input.blur()}});
      clear.addEventListener('click',()=>{input.value='';apply();input.focus()});
      new MutationObserver(()=>requestAnimationFrame(apply)).observe(list,{childList:true});
      tools.dataset.bound='1';
    }
    apply();
  }

  function heroMeta(){
    if(document.body.dataset.page!=='home')return;
    const copy=document.querySelector('.hero.v2-home-hero .hero-copy');
    if(!copy||copy.querySelector('.v5-hero-meta'))return;
    const meta=document.createElement('div');
    meta.className='v5-hero-meta';
    meta.innerHTML='<span>SINCE 1992</span><span>AUTO ID · SMART MANUFACTURING</span>';
    copy.prepend(meta);
  }

  function labelExternalLinks(){
    document.querySelectorAll('a[target="_blank"]').forEach(a=>{
      if(!a.getAttribute('aria-label')&&a.textContent.trim())a.setAttribute('aria-label',`${a.textContent.trim()}（另開新視窗）`);
    });
  }

  function run(){
    document.documentElement.classList.add('v5-ready');
    heroMeta();
    pageMeta();
    productSearch();
    downloadSearch();
    labelExternalLinks();
  }

  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,180);setTimeout(run,850)});
  if(document.readyState!=='loading')setTimeout(run,30);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,120));
})();
