(()=>{
  if(document.body.dataset.page!=='admin'||window.__fbAdminSessionHardening)return;
  window.__fbAdminSessionHardening=true;
  const START='farbeyoundAdminAbsoluteStartV1',MAX_MS=8*60*60*1000,STAMP='後台介面更新：2026/09/12 14:30';
  let expiring=false;
  function frameGuard(){try{if(window.top!==window.self){document.documentElement.innerHTML='';return false}}catch{document.documentElement.innerHTML='';return false}try{if(window.opener)window.opener=null}catch{}return true}
  if(!frameGuard())return;
  function now(){return Date.now()}
  function getStart(){const n=Number(sessionStorage.getItem(START)||0);return Number.isFinite(n)&&n>0?n:0}
  function setStart(force=false){if(force||!getStart())sessionStorage.setItem(START,String(now()))}
  function clearStart(){sessionStorage.removeItem(START)}
  function auth(){return window.FBAdminAuth||null}
  function active(){return !!auth()?.session?.()?.access_token}
  function remaining(){const s=getStart();return s?Math.max(0,MAX_MS-(now()-s)):MAX_MS}
  async function expire(){if(expiring)return;expiring=true;try{await auth()?.logout?.('session_max_age')}catch{}clearStart();alert('此後台工作階段已達 8 小時安全上限，請重新登入並完成兩步驟驗證。');location.reload()}
  function check(){if(!active()){clearStart();return}setStart();if(remaining()<=0)expire()}
  function secureLinks(root=document){root.querySelectorAll?.('a[target="_blank"]').forEach(a=>{const rel=new Set(String(a.rel||'').split(/\s+/).filter(Boolean));rel.add('noopener');rel.add('noreferrer');a.rel=[...rel].join(' ')})}
  function clearPasswords(){document.querySelectorAll('input[type="password"]').forEach(x=>{x.value=''})}
  function stamp(){const v=document.querySelector('.admin-version-note');if(v)v.textContent=STAMP}
  function note(){const h=document.querySelector('#adminSecurityCenter .admin-system-body');if(!h||document.getElementById('adminAbsoluteSessionNote'))return;const d=document.createElement('div');d.id='adminAbsoluteSessionNote';d.className='admin-setting-note';d.innerHTML='<b>工作階段上限：</b>後台登入最長連續 8 小時；即使持續操作，達上限後仍會強制重新登入＋兩步驟驗證。閒置逾時規則仍另外生效。';h.prepend(d)}
  window.addEventListener('farbeyound:adminauth',e=>{const state=String(e?.detail?.state||'');if(['login','mfa_required','mfa_verified','mfa_setup','invite'].includes(state))setStart(state==='login'||state==='invite');if(['logout','idle_timeout','session_expired'].includes(state))clearStart();setTimeout(check,50)});
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')check()});
  window.addEventListener('pageshow',check);
  window.addEventListener('pagehide',clearPasswords);
  const mo=new MutationObserver(m=>{for(const x of m)for(const n of x.addedNodes)if(n.nodeType===1)secureLinks(n)});mo.observe(document.documentElement,{childList:true,subtree:true});
  secureLinks();stamp();
  [250,900,1800,3200,5000].forEach(t=>setTimeout(()=>{check();note();secureLinks();stamp()},t));
  setInterval(check,60000);
})();