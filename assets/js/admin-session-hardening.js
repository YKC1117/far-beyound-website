(()=>{
  if(document.body.dataset.page!=='admin'||window.__fbAdminSessionHardening)return;
  window.__fbAdminSessionHardening=true;
  const START='farbeyoundAdminAbsoluteStartV1',MAX_MS=8*60*60*1000,STAMP='後台介面更新：2026/09/12 16:08';
  const URL='https://papqrnqbfauwuipjwwdh.supabase.co',KEY='sb_publishable_dDCh9hy183BipvxCbuZdiA_qPonsyxe',SERVER_CHECK_MS=2*60*1000;
  let expiring=false,serverChecking=false,serverInvalidating=false,lastServerCheck=0;
  function frameGuard(){try{if(window.top!==window.self){document.documentElement.innerHTML='';return false}}catch{document.documentElement.innerHTML='';return false}try{if(window.opener)window.opener=null}catch{}return true}
  if(!frameGuard())return;
  function now(){return Date.now()}
  function getStart(){const n=Number(sessionStorage.getItem(START)||0);return Number.isFinite(n)&&n>0?n:0}
  function setStart(force=false){if(force||!getStart())sessionStorage.setItem(START,String(now()))}
  function clearStart(){sessionStorage.removeItem(START)}
  function auth(){return window.FBAdminAuth||null}
  function active(){return !!auth()?.session?.()?.access_token}
  function remaining(){const s=getStart();return s?Math.max(0,MAX_MS-(now()-s)):MAX_MS}
  async function expire(){if(expiring)return;expiring=true;try{await auth()?.logout?.('session_max_age')}catch{}clearStart();sanitizeSensitive();alert('此後台工作階段已達 8 小時安全上限，請重新登入並完成兩步驟驗證。');location.reload()}
  function check(){if(!active()){clearStart();return}setStart();if(remaining()<=0)expire()}
  async function invalidateServerSession(){if(serverInvalidating)return;serverInvalidating=true;clearStart();sanitizeSensitive();try{await auth()?.logout?.('session_revoked')}catch{}alert('此後台登入工作階段已失效或已在其他裝置撤銷，請重新登入並完成兩步驟驗證。');location.reload()}
  async function validateServer(force=false){if(serverChecking||!active())return;const t=now();if(!force&&t-lastServerCheck<SERVER_CHECK_MS)return;lastServerCheck=t;serverChecking=true;try{const s=auth()?.session?.(),token=s?.access_token;if(!token)return;const r=await fetch(`${URL}/functions/v1/admin-session`,{headers:{apikey:KEY,Authorization:`Bearer ${token}`},cache:'no-store'});if(r.ok)return;const b=await r.json().catch(()=>({})),err=String(b?.error||'');if(['session_revoked','inactive','unauthorized'].includes(err))await invalidateServerSession()}catch{}finally{serverChecking=false}}
  function secureLinks(root=document){root.querySelectorAll?.('a[target="_blank"]').forEach(a=>{const rel=new Set(String(a.rel||'').split(/\s+/).filter(Boolean));rel.add('noopener');rel.add('noreferrer');a.rel=[...rel].join(' ')})}
  function clearPasswords(){document.querySelectorAll('input[type="password"]').forEach(x=>{x.value=''})}
  function sanitizeSensitive(){clearPasswords();const rows=document.getElementById('inquiryRows');if(rows)rows.innerHTML='<tr><td colspan="6">尚未讀取資料。</td></tr>';const status=document.getElementById('inquiryStatus');if(status)status.textContent='尚未讀取。客戶聯絡資料屬敏感資訊。';const count=document.getElementById('inquiryVisibleCount');if(count)count.textContent='尚未讀取';const users=document.getElementById('adminUsersResult');if(users)users.replaceChildren();['#adminLoginActivity .admin-tool-result','#adminSecureAudit .admin-tool-result','#adminSecureBackups .admin-tool-result'].forEach(sel=>{const el=document.querySelector(sel);if(el){el.replaceChildren();el.hidden=true}})}
  function stamp(){const v=document.querySelector('.admin-version-note');if(v)v.textContent=STAMP}
  function note(){const h=document.querySelector('#adminSecurityCenter .admin-system-body');if(!h||document.getElementById('adminAbsoluteSessionNote'))return;const d=document.createElement('div');d.id='adminAbsoluteSessionNote';d.className='admin-setting-note';d.innerHTML='<b>工作階段保護：</b>後台登入最長連續 8 小時；另外每 2 分鐘向伺服器確認 Session 是否仍有效。即使持續操作，達上限或 Session 被撤銷後都必須重新登入＋兩步驟驗證。閒置逾時規則仍另外生效。';h.prepend(d)}
  window.addEventListener('farbeyound:adminauth',e=>{const state=String(e?.detail?.state||'');if(['login','mfa_required','mfa_verified','mfa_setup','invite'].includes(state)){setStart(state==='login'||state==='invite');lastServerCheck=0}if(['logout','idle_timeout','session_expired','session_revoked'].includes(state)){clearStart();sanitizeSensitive()}setTimeout(()=>{check();validateServer(true);stamp()},80)});
  window.addEventListener('farbeyound:datachange',()=>setTimeout(stamp,180));
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){check();validateServer(true);stamp()}});
  window.addEventListener('pageshow',e=>{if(e.persisted){location.reload();return}check();validateServer(true);stamp()});
  window.addEventListener('pagehide',clearPasswords);
  const mo=new MutationObserver(m=>{for(const x of m)for(const n of x.addedNodes)if(n.nodeType===1)secureLinks(n)});mo.observe(document.documentElement,{childList:true,subtree:true});
  secureLinks();stamp();
  [250,900,1800,3200,5000].forEach(t=>setTimeout(()=>{check();note();secureLinks();stamp();validateServer()},t));
  setInterval(()=>{check();validateServer();stamp()},60000);
})();