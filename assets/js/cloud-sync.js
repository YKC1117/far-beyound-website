(function(){
  'use strict';
  if(window.__fbCloudSync)return;window.__fbCloudSync=true;
  const ENDPOINT='https://papqrnqbfauwuipjwwdh.supabase.co/functions/v1/site-state';
  const VERSION_KEY='farbeyoundCloudVersionV1';
  let ready=false,applyingRemote=false,publishTimer=null,publishSeq=0;
  function dataLooksUsable(d){return d&&typeof d==='object'&&!Array.isArray(d)&&Object.keys(d).length>0}
  function stamp(){return new Date().toLocaleTimeString('zh-TW',{hour12:false})}
  function status(text,state){
    if(document.body?.dataset.page!=='admin')return;
    let el=document.getElementById('adminCloudState');
    const meta=document.querySelector('.admin-top-meta');
    if(!el&&meta){el=document.createElement('span');el.id='adminCloudState';el.className='admin-save-state';meta.appendChild(el)}
    if(el){el.textContent=text;el.classList.toggle('dirty',state==='error')}
  }
  function getPass(){
    return prompt('安全確認｜每次儲存或刪除都需要驗證。\n\n請輸入後台發布密碼：','')||'';
  }
  async function pull(opts){
    opts=opts||{};status('共用資料：同步中');
    try{
      const r=await fetch(ENDPOINT,{method:'GET',cache:'no-store'});
      if(!r.ok)throw new Error('HTTP '+r.status);
      const row=await r.json();
      if(!row||!dataLooksUsable(row.data)){status('共用資料：尚未建立');return null}
      const version=row.updated_at||'';
      const current=window.FBStore?.getData?.();
      const same=JSON.stringify(current)===JSON.stringify(row.data);
      if(!same&&window.FBStore){
        applyingRemote=true;
        const original=window.FBStore.__cloudOriginalSave||window.FBStore.saveData;
        original.call(window.FBStore,row.data);
        applyingRemote=false;
        window.dispatchEvent(new CustomEvent('farbeyound:datachange',{detail:{source:'cloud'}}));
        const seen=sessionStorage.getItem(VERSION_KEY)||'';
        sessionStorage.setItem(VERSION_KEY,version);
        if(opts.allowReload!==false&&seen!==version){status('共用資料：已載入最新版本');setTimeout(()=>location.reload(),80);return row}
      }
      sessionStorage.setItem(VERSION_KEY,version);status('共用資料：已同步 '+stamp());return row;
    }catch(err){console.error('[cloud-sync] pull failed',err);status('共用資料：讀取失敗','error');return null}
  }
  async function publishNow(next,seq,pass){
    status('共用資料：正在上傳');
    try{
      const r=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','x-admin-pass':pass},body:JSON.stringify({data:next})});
      const body=await r.json().catch(()=>({}));
      if(!r.ok)throw new Error(body.error||('HTTP '+r.status));
      if(seq!==publishSeq)return;
      if(body.updated_at)sessionStorage.setItem(VERSION_KEY,body.updated_at);
      status('共用資料：已上傳 '+stamp());
      window.dispatchEvent(new CustomEvent('farbeyound:cloudsaved',{detail:{updatedAt:body.updated_at||null}}));
    }catch(err){
      console.error('[cloud-sync] publish failed',err);status('共用資料：上傳失敗','error');
      if(document.body?.dataset.page==='admin')alert('發布失敗，請確認密碼是否正確。\n\n這次修改仍保留在目前瀏覽器，可重新儲存再試一次。');
    }
  }
  function queuePublish(next,pass){
    const seq=++publishSeq;clearTimeout(publishTimer);publishTimer=setTimeout(()=>publishNow(JSON.parse(JSON.stringify(next)),seq,pass),120);
  }
  function install(){
    if(ready||!window.FBStore)return false;ready=true;
    const originalSave=window.FBStore.saveData?.bind(window.FBStore);
    if(originalSave){
      window.FBStore.__cloudOriginalSave=originalSave;
      window.FBStore.saveData=function(next){
        let pass='';
        if(!applyingRemote&&document.body?.dataset.page==='admin'){
          pass=getPass();
          if(!pass){status('共用資料：未發布','error');alert('已取消，這次修改不會儲存或發布。');return false}
        }
        const out=originalSave(next);
        if(!applyingRemote&&document.body?.dataset.page==='admin')queuePublish(next,pass);
        return out;
      };
    }
    pull({allowReload:true});
    if(document.body?.dataset.page!=='admin')setInterval(()=>pull({allowReload:true}),30000);
    return true;
  }
  function init(){if(!install())setTimeout(init,80)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  window.FBCloudSync={pull:()=>pull({allowReload:false}),publish:()=>{if(!window.FBStore)return;const pass=getPass();if(pass)queuePublish(window.FBStore.getData(),pass)},forgetPassword:()=>{}};
})();
