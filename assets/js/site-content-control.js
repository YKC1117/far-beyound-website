(function(){
  'use strict';
  const DEFAULT={
    seoTitle:'萬里資訊｜條碼設備、自動識別與系統整合',
    seoDescription:'萬里資訊提供標籤條碼列印機、條碼掃描器、RFID、行動電腦、標籤耗材、維修與智慧製造系統整合服務。',
    navProducts:'產品資訊',navDownloads:'下載服務',navSolutions:'系統方案',navCases:'客戶案例',navNews:'最新消息',navContact:'聯絡我們',navCompany:'公司資訊',consultText:'免費諮詢',
    footerIntro:'條碼列印、掃描、RFID、企業行動設備與智慧製造系統整合，協助企業建立穩定且可追蹤的現場作業流程。',
    homeBrandTitle:'代理與經銷品牌',homeBrandDesc:'多品牌設備選型、耗材供應與技術服務',
    homeCategoriesTitle:'產品與服務',homeCategoriesDesc:'依設備類型快速進入完整目錄，從硬體、耗材、軟體到維修服務集中查找。',
    homeFeaturedTitle:'代表產品',homeFeaturedLink:'查看完整產品目錄 →',
    homeSolutionsTitle:'系統方案',homeSolutionsDesc:'依生產、倉儲、SMT 防錯與條碼應用需求，提供可與現場流程整合的系統方案。',
    homeCasesTitle:'客戶案例',homeCasesLink:'查看所有案例 →',
    homeNewsTitle:'最新消息',homeNewsLink:'查看所有消息 →',
    service1Title:'設備與產品',service1Text:'列印機・掃描器・RFID・行動電腦',
    service2Title:'標籤與耗材',service2Text:'標籤貼紙・碳帶・客製代印',
    service3Title:'維修與技術支援',service3Text:'設備檢測・零件・現場服務',
    service4Title:'系統整合',service4Text:'SFIS・WMS・SMT・條碼整合'
  };
  const cfg=()=>Object.assign({},DEFAULT,(window.FBStore?.getData?.().siteContent||{}));
  const setText=(el,val)=>{if(el&&val!=null)el.textContent=val};
  function setMeta(name,content){let m=document.querySelector(`meta[name="${name}"]`);if(!m){m=document.createElement('meta');m.name=name;document.head.appendChild(m)}m.content=content||''}
  function setAnchorLabel(a,label){
    if(!a||label==null)return;
    const elementChildren=[...a.children];
    if(!elementChildren.length){a.textContent=label;return}
    const textNodes=[...a.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE);
    if(textNodes.length){textNodes[0].textContent=label+' ';textNodes.slice(1).forEach(n=>n.textContent='')}
    else a.insertBefore(document.createTextNode(label+' '),a.firstChild);
  }
  function applyNav(c){
    const labels={
      'products.html':c.navProducts,
      'downloads.html':c.navDownloads,
      'solutions.html':c.navSolutions,
      'cases.html':c.navCases,
      'news.html':c.navNews,
      'contact.html':c.navContact,
      'about.html':c.navCompany||'公司資訊'
    };
    document.querySelectorAll('.desktop-nav > a,.desktop-nav > .nav-item > a').forEach(a=>{
      const href=(a.getAttribute('href')||'').split('?')[0].split('#')[0];
      const label=labels[href];
      if(label)setAnchorLabel(a,label);
    });
    setText(document.querySelector('.header-actions .btn-primary'),c.consultText);
  }
  function applyFooter(c){setText(document.querySelector('.footer-brand p'),c.footerIntro)}
  function applyHome(c){if(document.body.dataset.page!=='home')return;
    setText(document.querySelector('.brand-portfolio-title h2'),c.homeBrandTitle);setText(document.querySelector('.brand-portfolio-head>p'),c.homeBrandDesc);
    const cats=document.querySelector('#homeCategories')?.closest('.section');setText(cats?.querySelector('.section-head h2'),c.homeCategoriesTitle);setText(cats?.querySelector('.section-head>p'),c.homeCategoriesDesc);
    const featured=document.querySelector('#homeProducts')?.closest('.section');setText(featured?.querySelector('.section-head h2'),c.homeFeaturedTitle);setText(featured?.querySelector('.section-head .text-link'),c.homeFeaturedLink);
    const sols=document.querySelector('#homeSolutions')?.closest('.section');setText(sols?.querySelector('.section-head h2'),c.homeSolutionsTitle);setText(sols?.querySelector('.section-head>p'),c.homeSolutionsDesc);
    const cases=document.querySelector('.v5-case-section');setText(cases?.querySelector('.section-head h2'),c.homeCasesTitle);setText(cases?.querySelector('.section-head .text-link'),c.homeCasesLink);
    const news=document.querySelector('#homeNews')?.closest('.section');setText(news?.querySelector('.section-head h2'),c.homeNewsTitle);setText(news?.querySelector('.section-head .text-link'),c.homeNewsLink);
    const items=[...document.querySelectorAll('.v2-service-strip .v2-service-item')];
    const svc=[[c.service1Title,c.service1Text],[c.service2Title,c.service2Text],[c.service3Title,c.service3Text],[c.service4Title,c.service4Text]];
    items.forEach((x,i)=>{setText(x.querySelector('b'),svc[i]?.[0]);setText(x.querySelector('small'),svc[i]?.[1])});
  }
  function apply(){if(!window.FBStore)return;const c=cfg();if(c.seoTitle)document.title=c.seoTitle;setMeta('description',c.seoDescription);applyNav(c);applyFooter(c);applyHome(c)}
  document.addEventListener('DOMContentLoaded',()=>{apply();setTimeout(apply,100);setTimeout(apply,450)});
  window.addEventListener('load',()=>setTimeout(apply,100));
  window.addEventListener('farbeyound:datachange',()=>setTimeout(apply,30));
})();
