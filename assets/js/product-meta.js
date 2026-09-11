(function(){
  'use strict';
  if(window.__fbProductMeta)return;window.__fbProductMeta=true;
  function current(){
    if(!window.FBStore)return null;
    const id=new URLSearchParams(location.search).get('id');
    return (FBStore.getData().products||[]).find(p=>String(p.id)===String(id))||null;
  }
  function meta(name,content,property){
    if(!content)return;
    const key=property?'property':'name';
    let el=document.head.querySelector(`meta[${key}="${name}"]`);
    if(!el){el=document.createElement('meta');el.setAttribute(key,name);document.head.appendChild(el)}
    el.setAttribute('content',content);
  }
  function canonical(url){let el=document.head.querySelector('link[rel="canonical"]');if(!el){el=document.createElement('link');el.rel='canonical';document.head.appendChild(el)}el.href=url}
  function run(){
    if(document.body?.dataset.page!=='product')return;
    const p=current();if(!p||p.published===false)return;
    const label=[p.brand,p.model||p.name].filter(Boolean).join(' ');
    const title=(p.seoTitle||`${label}｜${p.subtitle||'產品資訊'}｜萬里資訊`).trim();
    const desc=(p.seoDescription||p.intro||`${label} 產品資訊、規格、特色與相關文件。`).replace(/\s+/g,' ').trim().slice(0,170);
    const pageUrl=new URL(location.pathname,location.origin);pageUrl.searchParams.set('id',p.id);
    const image=p.image?new URL(p.image,location.href).href:'';
    document.title=title;canonical(pageUrl.href);
    meta('description',desc);meta('robots','index,follow,max-image-preview:large');
    meta('og:title',title,true);meta('og:description',desc,true);meta('og:type','product',true);meta('og:url',pageUrl.href,true);if(image)meta('og:image',image,true);
    meta('twitter:card',image?'summary_large_image':'summary');meta('twitter:title',title);meta('twitter:description',desc);if(image)meta('twitter:image',image);
    const model=p.model||'';
    const hero=document.querySelector('#productHero .product-meta');
    if(hero&&model&&!hero.querySelector('.fb-product-model')){const s=document.createElement('span');s.className='fb-product-model';s.textContent=`型號 ${model}`;hero.insertBefore(s,hero.children[1]||null)}
    const bc=document.getElementById('productBreadcrumb');if(bc&&model){const b=bc.querySelector('b');if(b)b.textContent=label}
    let ld=document.getElementById('fbProductStructuredData');if(!ld){ld=document.createElement('script');ld.id='fbProductStructuredData';ld.type='application/ld+json';document.head.appendChild(ld)}
    const structured={'@context':'https://schema.org','@type':'Product',name:p.name||model,url:pageUrl.href,description:desc};
    if(model)structured.model=model;if(p.brand)structured.brand={'@type':'Brand',name:p.brand};if(image)structured.image=[image];
    ld.textContent=JSON.stringify(structured);
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(run,140),{once:true});
  window.addEventListener('load',()=>setTimeout(run,120),{once:true});
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,80));
})();