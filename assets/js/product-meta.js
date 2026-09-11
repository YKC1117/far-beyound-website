(function(){
  'use strict';
  if(window.__fbProductMeta)return;window.__fbProductMeta=true;
  function esc(v){return String(v==null?'':v)}
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
  function run(){
    if(document.body?.dataset.page!=='product')return;
    const p=current();if(!p||p.published===false)return;
    const title=(p.seoTitle||`${[p.brand,p.model||p.name].filter(Boolean).join(' ')}｜${p.subtitle||'產品資訊'}｜萬里資訊`).trim();
    const desc=(p.seoDescription||p.intro||`${p.brand||''} ${p.model||p.name||''} 產品資訊、規格與特色。`).replace(/\s+/g,' ').trim().slice(0,170);
    document.title=title;
    meta('description',desc);
    meta('og:title',title,true);meta('og:description',desc,true);meta('og:type','product',true);
    const model=p.model||'';
    const hero=document.querySelector('#productHero .product-meta');
    if(hero&&model&&!hero.querySelector('.fb-product-model')){
      const s=document.createElement('span');s.className='fb-product-model';s.textContent=`型號 ${model}`;hero.insertBefore(s,hero.children[1]||null);
    }
    const bc=document.getElementById('productBreadcrumb');
    if(bc&&model){const b=bc.querySelector('b');if(b&&!b.textContent.includes(model))b.textContent=`${p.brand||''} ${model}`.trim()}
    let ld=document.getElementById('fbProductStructuredData');
    if(!ld){ld=document.createElement('script');ld.id='fbProductStructuredData';ld.type='application/ld+json';document.head.appendChild(ld)}
    ld.textContent=JSON.stringify({'@context':'https://schema.org','@type':'Product',name:p.name||model,model:model||undefined,brand:p.brand?{'@type':'Brand',name:p.brand}:undefined,description:desc,image:p.image?new URL(p.image,location.href).href:undefined,url:location.href});
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(run,120),{once:true});
  window.addEventListener('load',()=>setTimeout(run,100),{once:true});
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,80));
})();