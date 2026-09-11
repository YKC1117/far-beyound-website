(function(){
  'use strict';
  if(window.__fbProductAnalytics)return;window.__fbProductAnalytics=true;
  const PROJECT='https://papqrnqbfauwuipjwwdh.supabase.co';
  const KEY='sb_publishable_dDCh9hy183BipvxCbuZdiA_qPonsyxe';

  function currentProduct(){
    if(document.body?.dataset.page!=='product'||!window.FBStore)return null;
    const id=new URLSearchParams(location.search).get('id');
    if(!id)return null;
    return (FBStore.getData().products||[]).find(p=>String(p.id)===String(id))||null;
  }

  function inferModel(p){
    const direct=String(p.model||'').trim();
    if(direct)return direct;
    const family=String(p.family||'').trim();
    if(family && /\d/.test(family))return family;
    const name=String(p.name||'').trim();
    const brand=String(p.brand||'').trim();
    const cleaned=name.replace(new RegExp('^'+brand.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\s*','i'),'').trim();
    if(cleaned)return cleaned.slice(0,160);
    return String(p.id||'').replace(/^legacy-/,'').replace(/^[^-]+-/,'').replace(/-/g,' ').toUpperCase().slice(0,160);
  }

  function shouldCount(id){
    try{
      const k='fbProductView:'+id,now=Date.now(),last=Number(localStorage.getItem(k)||0);
      if(now-last<30*60*1000)return false;
      localStorage.setItem(k,String(now));
      return true;
    }catch(_){return true}
  }

  async function track(){
    const p=currentProduct();if(!p||p.published===false||!shouldCount(p.id))return;
    try{
      await fetch(PROJECT+'/rest/v1/product_pageviews',{
        method:'POST',keepalive:true,
        headers:{'apikey':KEY,'Authorization':'Bearer '+KEY,'Content-Type':'application/json','Prefer':'return=minimal'},
        body:JSON.stringify({
          product_id:String(p.id).slice(0,160),
          brand:String(p.brand||'').slice(0,120),
          model:inferModel(p)
        })
      });
    }catch(_){/* analytics must never block the page */}
  }

  document.addEventListener('DOMContentLoaded',()=>setTimeout(track,700),{once:true});
  if(document.readyState!=='loading')setTimeout(track,700);
})();