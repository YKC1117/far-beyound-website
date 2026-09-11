(function(){
  'use strict';
  const DEFAULT={
    showCredibility:false,showBrandPortfolio:true,showServiceStrip:true,showCategories:true,
    showFeaturedProducts:true,showSolutions:true,showCases:true,showNews:true,showCta:true,
    showHeroTrust:true,showHeaderSearch:true,showHeaderConsult:true,showFloatingContact:true,
    ctaTitle:'有設備、耗材、維修或系統需求？',
    ctaText:'提供品牌、型號或使用情境，我們可協助確認適合的產品、耗材與服務方向。',
    ctaButton:'聯絡萬里資訊',ctaUrl:'contact.html'
  };
  const cfg=()=>Object.assign({},DEFAULT,(window.FBStore?.getData?.().siteDisplay||{}));
  function visible(el,on){if(el)el.style.display=on?'':'none'}
  function apply(){
    if(!window.FBStore)return;
    const c=cfg();
    if(document.body.dataset.page==='home'){
      visible(document.querySelector('.v5-credibility'),c.showCredibility);
      visible(document.querySelector('.brand-portfolio'),c.showBrandPortfolio);
      visible(document.querySelector('.v2-service-strip'),c.showServiceStrip);
      visible(document.querySelector('.hero-trust'),c.showHeroTrust);
      const categories=document.querySelector('#homeCategories')?.closest('.section');visible(categories,c.showCategories);
      const products=document.querySelector('#homeProducts')?.closest('.section');visible(products,c.showFeaturedProducts);
      const solutions=document.querySelector('#homeSolutions')?.closest('.section');visible(solutions,c.showSolutions);
      visible(document.querySelector('.v5-case-section'),c.showCases);
      const news=document.querySelector('#homeNews')?.closest('.section');visible(news,c.showNews);
      const cta=document.querySelector('.cta-band');visible(cta,c.showCta);
      if(cta){const h=cta.querySelector('h2'),p=cta.querySelector('p'),a=cta.querySelector('a');if(h)h.textContent=c.ctaTitle;if(p)p.textContent=c.ctaText;if(a){a.textContent=c.ctaButton;a.href=c.ctaUrl||'contact.html'}}
    }
    visible(document.querySelector('.header-actions .search-trigger'),c.showHeaderSearch);
    visible(document.querySelector('.header-actions .btn-primary'),c.showHeaderConsult);
    visible(document.querySelector('.quick-contact'),c.showFloatingContact);
  }
  document.addEventListener('DOMContentLoaded',()=>{apply();setTimeout(apply,120);setTimeout(apply,500)});
  window.addEventListener('load',()=>setTimeout(apply,100));
  window.addEventListener('farbeyound:datachange',()=>setTimeout(apply,30));
})();
