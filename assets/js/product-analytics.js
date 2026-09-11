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

  function sourceInfo(){
    let host='';
    try{host=document.referrer?new URL(document.referrer).hostname.toLowerCase():''}catch(_){host=''}
    if(!host||host===location.hostname.toLowerCase())return {referrer_domain:'',traffic_source:'direct'};
    const ai=['chatgpt.com','openai.com','perplexity.ai','claude.ai','gemini.google.com','copilot.microsoft.com','you.com'];
    if(ai.some(d=>host===d||host.endsWith('.'+d)))return {referrer_domain:host.slice(0,180),traffic_source:'ai'};
    if(/(^|\.)google\./.test(host))return {referrer_domain:host.slice(0,180),traffic_source:'google'};
    if(host==='bing.com'||host.endsWith('.bing.com'))return {referrer_domain:host.slice(0,180),traffic_source:'bing'};
    if(['facebook.com','instagram.com','line.me','liff.line.me','linkedin.com','x.com','twitter.com'].some(d=>host===d||host.endsWith('.'+d)))return {referrer_domain:host.slice(0,180),traffic_source:'social'};
    return {referrer_domain:host.slice(0,180),traffic_source:'referral'};
  }

  function cooldownKey(id){return 'fbProductView:'+id}
  function inCooldown(id){
    try{return Date.now()-Number(localStorage.getItem(cooldownKey(id))||0)<30*60*1000}catch(_){return false}
  }
  function markCounted(id){try{localStorage.setItem(cooldownKey(id),String(Date.now()))}catch(_){}}

  async function track(){
    const p=currentProduct();if(!p||p.published===false||inCooldown(p.id))return;
    try{
      const source=sourceInfo();
      const r=await fetch(PROJECT+'/rest/v1/product_pageviews',{
        method:'POST',keepalive:true,
        headers:{'apikey':KEY,'Authorization':'Bearer '+KEY,'Content-Type':'application/json','Prefer':'return=minimal'},
        body:JSON.stringify({product_id:String(p.id).slice(0,160),brand:String(p.brand||'').slice(0,120),model:inferModel(p),referrer_domain:source.referrer_domain,traffic_source:source.traffic_source})
      });
      if(r.ok)markCounted(p.id);
    }catch(_){/* analytics must never block the page; failed views may retry later */}
  }

  document.addEventListener('DOMContentLoaded',()=>setTimeout(track,700),{once:true});
  if(document.readyState!=='loading')setTimeout(track,700);
})();