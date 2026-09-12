(function(){
  'use strict';
  if(window.__fbCloudSync)return;window.__fbCloudSync=true;
  const ENDPOINT='https://papqrnqbfauwuipjwwdh.supabase.co/functions/v1/site-state';
  const VERSION_KEY='farbeyoundCloudVersionV1',DATA_KEY='farbeyoundSiteDataV1';
  let ready=false,applyingRemote=false,publishTimer=null,publishSeq=0,publishAbort=null,pendingBaseRaw=undefined,sharedPromptPromise=null;
  function dataLooksUsable(d){return d&&typeof d==='object'&&!Array.isArray(d)&&Object.keys(d).length>0}
  function stamp(){return new Date().toLocaleTimeString('zh-TW',{hour12:false})}
  function clone(v){return JSON.parse(JSON.stringify(v))}
  function status(text,state){
    if(document.body?.dataset.page!=='admin')return;
    let el=document.getElementById('adminCloudState');const meta=document.querySelector('.admin-top-meta');
    if(!el&&meta){el=document.createElement('span');el.id='adminCloudState';el.className='admin-save-state';meta.appendChild(el)}
    if(el){el.textContent=text;el.classList.toggle('dirty',state==='error')}
  }
  function sharedModal(){
    let root=document.getElementById('fbSharedPublishAuth');if(root)return root;
    const st=document.createElement('style');st.id='fbSharedPublishAuthStyle';st.textContent='.fb-publish-auth{position:fixed;inset:0;z-index:10060;display:none;place-items:center;padding:18px;background:rgba(7,24,45,.62);backdrop-filter:blur(5px)}.fb-publish-auth.open{display:grid}.fb-publish-auth-card{width:min(430px,100%);background:#fff;border-radius:16px;padding:20px;box-shadow:0 26px 70px rgba(0,0,0,.28)}.fb-publish-auth-card h3{margin:0 0 6px;color:#17384b}.fb-publish-auth-card p{margin:0 0 14px;color:#6c808c;font-size:12px;line-height:1.6}.fb-publish-auth-card label{display:block;font-size:11px;font-weight:800;color:#385565}.fb-publish-auth-card input{box-sizing:border-box;width:100%;min-height:44px;margin-top:6px;padding:10px 12px;border:1px solid #cfdde3;border-radius:10px;font-size:16px}.fb-publish-auth-actions{display:flex;gap:8px;margin-top:14px}.fb-publish-auth-actions .btn{flex:1}';document.head.appendChild(st);
    root=document.createElement('div');root.id='fbSharedPublishAuth';root.className='fb-publish-auth';root.setAttribute('aria-hidden','true');root.innerHTML='<form class="fb-publish-auth-card"><h3>發布密碼驗證</h3><p>尚未使用個人管理帳號時，每次修改都需要共用發布密碼。密碼只用於本次驗證，不會保存在瀏覽器。</p><label>後台發布密碼<input type="password" autocomplete="current-password" required maxlength="256"></label><div class="fb-publish-auth-actions"><button class="btn btn-primary" type="submit">確認並發布</button><button class="btn btn-secondary" type="button">取消</button></div></form>';document.body.appendChild(root);return root;
  }
  function askSharedPassword(){
    if(sharedPromptPromise)return sharedPromptPromise;
    sharedPromptPromise=new Promise(resolve=>{
      const root=sharedModal(),form=root.querySelector('form'),input=root.querySelector('input'),cancel=root.querySelector('button[type="button"]');
      const done=value=>{input.value='';root.classList.remove('open');root.setAttribute('aria-hidden','true');form.onsubmit=null;cancel.onclick=null;resolve(value)};
      form.onsubmit=e=>{e.preventDefault();done(input.value||'')};cancel.onclick=()=>done('');root.classList.add('open');root.setAttribute('aria-hidden','false');setTimeout(()=>input.focus(),20);
    }).finally(()=>{sharedPromptPromise=null});return sharedPromptPromise;
  }
  async function authForPublish(){
    try{
      const auth=window.FBAdminAuth,s=auth?.session?.();
      if(s?.access_token){const refreshed=await auth.refresh?.().catch(()=>null),latest=refreshed||auth.session?.()||s;if(latest?.access_token)return{token:latest.access_token}}
    }catch(_){ }
    const pass=await askSharedPassword();return pass?{pass}:null;
  }
  async function pull(opts){
    opts=opts||{};status('共用資料：同步中');
    try{
      const r=await fetch(ENDPOINT,{method:'GET',cache:'no-store'});if(!r.ok)throw new Error('HTTP '+r.status);const row=await r.json();
      if(!row||!dataLooksUsable(row.data)){status('共用資料：尚未建立');return null}
      const version=row.updated_at||'',current=window.FBStore?.getData?.(),same=JSON.stringify(current)===JSON.stringify(row.data);
      if(!same&&window.FBStore){applyingRemote=true;const original=window.FBStore.__cloudOriginalSave||window.FBStore.saveData;original.call(window.FBStore,row.data);applyingRemote=false;window.dispatchEvent(new CustomEvent('farbeyound:datachange',{detail:{source:'cloud'}}));const seen=sessionStorage.getItem(VERSION_KEY)||'';sessionStorage.setItem(VERSION_KEY,version);if(opts.allowReload!==false&&seen!==version){status('共用資料：已載入最新版本');setTimeout(()=>location.reload(),80);return row}}
      sessionStorage.setItem(VERSION_KEY,version);status('共用資料：已同步 '+stamp());return row;
    }catch(err){console.error('[cloud-sync] pull failed',err);status('共用資料：讀取失敗','error');return null}
  }
  function rollback(reason){
    if(pendingBaseRaw===undefined)return;const raw=pendingBaseRaw;pendingBaseRaw=undefined;
    try{if(raw){const prev=JSON.parse(raw),original=window.FBStore?.__cloudOriginalSave;if(original){applyingRemote=true;original.call(window.FBStore,prev);applyingRemote=false;window.dispatchEvent(new CustomEvent('farbeyound:datachange',{detail:{source:'cloud-rollback',reason}}));return}}}catch(e){console.error('[cloud-sync] rollback failed',e)}
    pull({allowReload:false});
  }
  async function publishNow(next,seq,auth,rollbackOnFail=true){
    if(seq!==publishSeq)return;status('共用資料：正在上傳');publishAbort?.abort();const controller=new AbortController();publishAbort=controller;
    try{
      const headers={'Content-Type':'application/json'};if(auth?.token)headers.Authorization=`Bearer ${auth.token}`;else if(auth?.pass)headers['x-admin-pass']=auth.pass;else throw new Error('cancelled');
      const r=await fetch(ENDPOINT,{method:'POST',headers,body:JSON.stringify({data:next}),signal:controller.signal});const body=await r.json().catch(()=>({}));
      if(!r.ok){const e=new Error(body.error||('HTTP '+r.status));e.detail=body;throw e}if(seq!==publishSeq)return;
      pendingBaseRaw=undefined;if(body.updated_at)sessionStorage.setItem(VERSION_KEY,body.updated_at);status('共用資料：已上傳 '+stamp());window.dispatchEvent(new CustomEvent('farbeyound:cloudsaved',{detail:{updatedAt:body.updated_at||null}}));
    }catch(err){if(err.name==='AbortError'||seq!==publishSeq)return;console.error('[cloud-sync] publish failed',err);status('共用資料：上傳失敗，已還原','error');if(rollbackOnFail)rollback(err.message);if(document.body?.dataset.page==='admin'){let msg='發布失敗，這次修改已還原，沒有只留在目前瀏覽器。';if(err.message==='personal_login_required')msg='後台已啟用個人管理帳號，請先登入個人帳號再修改。這次修改已還原。';else if(err.message==='forbidden')msg=`目前個人帳號沒有此項目的修改權限${err.detail?.scope?'（'+err.detail.scope+'）':''}。這次修改已還原。`;else if(err.message==='unauthorized')msg='發布密碼驗證失敗，這次修改已還原。';alert(msg)}
    }
  }
  async function preparePublish(next,seq,rollbackOnFail=true){
    const auth=await authForPublish();if(seq!==publishSeq)return;if(!auth){status('共用資料：已取消','error');if(rollbackOnFail)rollback('cancelled');if(document.body?.dataset.page==='admin')alert('已取消，這次修改已還原，不會發布。');return}
    clearTimeout(publishTimer);publishTimer=setTimeout(()=>publishNow(clone(next),seq,auth,rollbackOnFail),100);
  }
  function queuePublish(next,rollbackOnFail=true){const seq=++publishSeq;preparePublish(clone(next),seq,rollbackOnFail);return seq}
  function install(){
    if(ready||!window.FBStore)return false;ready=true;const originalSave=window.FBStore.saveData?.bind(window.FBStore);
    if(originalSave){window.FBStore.__cloudOriginalSave=originalSave;window.FBStore.saveData=function(next){if(applyingRemote||document.body?.dataset.page!=='admin')return originalSave(next);if(pendingBaseRaw===undefined)pendingBaseRaw=localStorage.getItem(DATA_KEY);const out=originalSave(next);queuePublish(next,true);return out}}
    pull({allowReload:true});if(document.body?.dataset.page!=='admin')setInterval(()=>pull({allowReload:true}),30000);return true;
  }
  function init(){if(!install())setTimeout(init,80)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  window.FBCloudSync={pull:()=>pull({allowReload:false}),publish:()=>{if(!window.FBStore)return;queuePublish(window.FBStore.getData(),false)},forgetPassword:()=>{}};
})();
