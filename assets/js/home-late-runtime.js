(function(){
  'use strict';
  if(window.__fbHomeLateRuntime)return;
  window.__fbHomeLateRuntime=true;

  const current=document.currentScript;
  const build=(()=>{
    try{return new URL(current?.src||'',location.href).searchParams.get('v')||'20260918-1030'}
    catch(_){return'20260918-1030'}
  })();

  function assets(){
    const node=document.getElementById('homeLateRuntimeAssets');
    if(!node)return[];
    try{
      const list=JSON.parse(node.textContent||'[]');
      return Array.isArray(list)?list.filter(Boolean):[];
    }catch(err){
      console.error('[home-late-runtime] invalid asset manifest',err);
      return[];
    }
  }

  function load(src){
    return new Promise(resolve=>{
      const base=String(src).split('?')[0];
      if(document.querySelector(`script[src^="${base}"]`)){resolve();return}
      const script=document.createElement('script');
      script.src=`${base}?v=${encodeURIComponent(build)}`;
      script.async=false;
      script.onload=resolve;
      script.onerror=()=>{console.error('[home-late-runtime] failed',base);resolve()};
      document.body.appendChild(script);
    });
  }

  async function run(){
    for(const src of assets())await load(src);
  }

  function schedule(){
    const start=()=>run();
    if('requestIdleCallback'in window)requestIdleCallback(start,{timeout:1200});
    else setTimeout(start,250);
  }

  if(document.readyState==='complete')schedule();
  else window.addEventListener('load',schedule,{once:true});
})();