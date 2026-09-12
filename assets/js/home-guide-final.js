(function(){
  if(document.body.dataset.page!=='home'||window.__fbHomeGuideFinal)return;
  window.__fbHomeGuideFinal=true;

  const ORDER=['標籤條碼列印機','列印耗材','條碼掃描器','標籤編輯軟體','行動裝置 PDA'];

  const TAG_LINKS={
    '標籤條碼列印機':{
      'Zebra':'products.html?category=printers&brand=Zebra',
      'Argox':'products.html?category=printers&brand=Argox',
      'TSC':'products.html?category=printers&brand=TSC',
      'GoDEX':'products.html?category=printers&brand=GoDEX',
      'TOSHIBA':'products.html?category=printers&brand=TOSHIBA',
      'SATO':'products.html?category=printers&brand=SATO',
      'Honeywell':'products.html?category=printers&brand=Honeywell'
    },
    '列印耗材':{
      '各式標籤紙':'products.html?category=labels',
      '碳帶':'products.html?category=labels',
      '客製規格':'contact.html?item=%E8%80%97%E6%9D%90%E5%AE%A2%E8%A3%BD%E8%A6%8F%E6%A0%BC'
    },
    '條碼掃描器':{
      'FASTECH':'products.html?category=scanners&brand=Fastech',
      'Zebra':'products.html?category=scanners&brand=Zebra',
      'NUMA':'products.html?category=scanners&brand=NUMA',
      'Honeywell':'products.html?category=scanners&brand=Honeywell',
      'Datalogic':'products.html?category=scanners&brand=Datalogic'
    },
    '標籤編輯軟體':{
      'BarTender':'product.html?id=software-bartender',
      'CodeSoft':'product.html?id=software-codesoft'
    },
    '行動裝置 PDA':{
      'Zebra':'products.html?category=mobile&brand=Zebra',
      'UROVO':'product.html?id=urovo-dt66-ct48c-dt50-dt40-rt40s'
    }
  };

  function addStyle(){
    if(document.getElementById('fbHomeGuideFinalStyle'))return;
    const style=document.createElement('style');
    style.id='fbHomeGuideFinalStyle';
    style.textContent=`
      body[data-page="home"] .fb-service-card:before{background:#173f5f!important;transform:scaleX(0)!important;transform-origin:left center!important;opacity:0!important}
      body[data-page="home"] .fb-service-card:hover:before,body[data-page="home"] .fb-service-card:focus-within:before{transform:scaleX(1)!important;opacity:1!important}
      body[data-page="home"] .fb-service-tags{gap:7px!important}
      body[data-page="home"] .fb-service-tag,body[data-page="home"] .fb-service-tag-link{box-sizing:border-box!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:30px!important;padding:6px 10px!important;border:1px solid #d9e4ea!important;border-radius:4px!important;background:#fff!important;color:#35566c!important;font-size:9px!important;font-weight:760!important;letter-spacing:.025em!important;line-height:1.2!important;text-decoration:none!important;cursor:pointer!important;transition:background .18s ease,border-color .18s ease,color .18s ease,transform .18s ease,box-shadow .18s ease!important}
      body[data-page="home"] .fb-service-tag.is-own,body[data-page="home"] .fb-service-tag-link.is-own{border-color:#d9e4ea!important;background:#fff!important;color:#35566c!important}
      body[data-page="home"] .fb-service-tag-link:hover{border-color:#adc6d3!important;background:#f3f8fb!important;color:#173f5f!important;transform:translateY(-1px)!important;box-shadow:0 4px 10px rgba(25,61,86,.06)!important}
      body[data-page="home"] .fb-service-tag-link:focus-visible{outline:2px solid #1596b4!important;outline-offset:2px!important}
      body[data-page="home"] .fb-service-tag-link:active{transform:translateY(0)!important;background:#eaf3f7!important}
      body[data-page="home"] .fb-service-title-row{display:flex!important;align-items:center!important;flex-wrap:wrap!important;gap:8px!important}
      body[data-page="home"] .fb-service-title-row h3{margin:0!important}
      body[data-page="home"] .fb-service-primary,body[data-page="home"] .fb-service-secondary{border-radius:2px!important}
      @media(max-width:680px){body[data-page="home"] .fb-service-tag,body[data-page="home"] .fb-service-tag-link{min-height:32px!important;padding:7px 11px!important;font-size:10px!important}}
    `;
    document.head.appendChild(style);
  }

  function makeTagsClickable(card,title){
    const map=TAG_LINKS[title]||{};
    const tags=card.querySelector('.fb-service-tags');
    if(!tags)return;
    [...tags.querySelectorAll('.fb-service-tag')].forEach(tag=>{
      if(tag.tagName==='A')return;
      const label=tag.textContent.trim();
      const href=map[label];
      if(!href)return;
      const link=document.createElement('a');
      link.className='fb-service-tag-link';link.href=href;link.textContent=label;
      link.setAttribute('aria-label',`${title}：${label}`);link.title=`查看 ${label}`;tag.replaceWith(link);
    });
    tags.querySelectorAll('.fb-service-tag-link,.fb-service-tag').forEach(el=>el.classList.remove('is-own'));
  }

  function removeOwnBrandBadge(card){card.querySelectorAll('.fb-service-own-badge').forEach(el=>el.remove())}

  function apply(){
    addStyle();
    const guide=document.querySelector('.fb-home-guide');
    const cards=guide?.querySelector('.fb-service-cards');
    if(!guide||!cards)return false;
    const byTitle=new Map([...cards.querySelectorAll('.fb-service-card')].map(card=>[card.querySelector('h3')?.textContent.trim(),card]));
    ORDER.forEach((title,index)=>{const card=byTitle.get(title);if(!card)return;const no=card.querySelector('.fb-service-no');if(no)no.textContent=String(index+1).padStart(2,'0');makeTagsClickable(card,title);removeOwnBrandBadge(card);cards.appendChild(card)});
    const heading=guide.querySelector('#fbQuickGuideTitle');if(heading)heading.textContent='快速找到適合的產品與服務';
    const desc=guide.querySelector('.fb-home-guide-head > p');if(desc)desc.textContent='依您的列印、耗材、掃描、軟體或行動作業需求快速進入對應服務；如規格尚未確認，也可直接聯絡我們協助選型。';
    return true;
  }
  function run(){if(apply())return;setTimeout(apply,80);setTimeout(apply,250);setTimeout(apply,600)}
  document.addEventListener('DOMContentLoaded',run,{once:true});if(document.readyState!=='loading')run();
})();