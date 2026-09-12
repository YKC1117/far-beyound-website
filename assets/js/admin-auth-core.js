(()=>{
  if(window.FBAdminAuth)return;
  const URL='https://papqrnqbfauwuipjwwdh.supabase.co';
  const KEY='sb_publishable_dDCh9hy183BipvxCbuZdiA_qPonsyxe';
  const STORE='farbeyoundAdminSessionV1',INVITE='farbeyoundAdminInvitePendingV1';
  const LOGIN=`${URL}/functions/v1/admin-login`;
  const PASSWORD_MIN=16,PASSWORD_MAX=64;
  const readRaw=()=>{try{return JSON.parse(sessionStorage.getItem(STORE)||'null')}catch{return null}};
  const write=v=>{if(v)sessionStorage.setItem(STORE,JSON.stringify(v));else sessionStorage.removeItem(STORE)};
  const notify=detail=>window.dispatchEvent(new CustomEvent('farbeyound:adminauth',{detail:detail||{}}));
  const now=()=>Date.now();
  function passwordIssues(v){v=String(v||'');const x=[];if(v.length<PASSWORD_MIN||v.length>PASSWORD_MAX)x.push(`密碼長度需為 ${PASSWORD_MIN}～${PASSWORD_MAX} 個字元`);if(!/[A-Z]/.test(v))x.push('至少 1 個英文大寫字母');if(!/[a-z]/.test(v))x.push('至少 1 個英文小寫字母');if(!/[0-9]/.test(v))x.push('至少 1 個數字');if(!/[^A-Za-z0-9\s]/.test(v))x.push('至少 1 個特殊符號');return x}
  function jwtPayload(token){try{const p=String(token||'').split('.')[1];if(!p)return{};const s=p.replace(/-/g,'+').replace(/_/g,'/');return JSON.parse(decodeURIComponent(Array.from(atob(s.padEnd(Math.ceil(s.length/4)*4,'='))).map(c=>'%'+c.charCodeAt(0).toString(16).padStart(2,'0')).join('')))}catch{return{}}}
  function assurance(s=readRaw()){return jwtPayload(s?.access_token).aal||'aal1'}
  function idleExpired(s){const idle=Math.max(5,Number(s?.idle_minutes)||60)*60000,last=Number(s?.last_activity_at)||0;return !!last&&now()-last>idle}
  function clearLocal(state='logout'){write(null);sessionStorage.removeItem(INVITE);notify({state})}
  function session(){const s=readRaw();if(!s?.access_token)return null;if(idleExpired(s)){clearLocal('idle_timeout');return null}return s}
  function activity(){const s=readRaw();if(!s?.access_token||idleExpired(s))return;if(now()-(Number(s.last_activity_at)||0)<30000)return;s.last_activity_at=now();write(s)}
  ['pointerdown','keydown','touchstart'].forEach(type=>addEventListener(type,activity,{passive:true,capture:true}));

  function captureInvite(){
    const p=new URLSearchParams((location.hash||'').replace(/^#/,'')),token=p.get('access_token'),type=p.get('type');
    if(token&&(type==='invite'||type==='recovery')){
      const expiresIn=Number(p.get('expires_in')||3600);
      write({access_token:token,refresh_token:p.get('refresh_token')||'',token_type:p.get('token_type')||'bearer',expires_in:expiresIn,expires_at:Math.floor(now()/1000)+expiresIn,idle_minutes:60,last_activity_at:now()});
      sessionStorage.setItem(INVITE,type);history.replaceState(null,'',location.pathname+location.search);setTimeout(()=>notify({state:'invite'}),0);return true
    }
    return sessionStorage.getItem(INVITE)||''
  }
  captureInvite();

  async function authFetch(path,{method='GET',body,token}={}){const s=token?null:session(),access=token||s?.access_token;if(!access)throw new Error('no_session');const r=await fetch(`${URL}/auth/v1/${path}`,{method,headers:{apikey:KEY,Authorization:`Bearer ${access}`,'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body),cache:'no-store'});const b=await r.json().catch(()=>({}));if(!r.ok){const e=new Error(b.error_code||b.code||b.msg||b.message||'auth_request_failed');e.detail=b;throw e}return b}
  async function event(token,event_type){if(!token)return;await fetch(`${URL}/functions/v1/admin-login-event`,{method:'POST',headers:{apikey:KEY,Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({event_type})}).catch(()=>{})}
  async function refreshSession(s=readRaw(),touch=false){if(!s?.refresh_token)return null;if(idleExpired(s)){clearLocal('idle_timeout');return null}const expiresAt=Number(s.expires_at)||0;if(s.access_token&&expiresAt*1000-now()>120000){if(touch){s.last_activity_at=now();write(s)}return s}const r=await fetch(`${URL}/auth/v1/token?grant_type=refresh_token`,{method:'POST',headers:{apikey:KEY,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:s.refresh_token})});const b=await r.json().catch(()=>({}));if(!r.ok||!b.access_token){clearLocal('session_expired');return null}const next={...s,...b,idle_minutes:Number(s.idle_minutes)||60,last_activity_at:touch?now():(Number(s.last_activity_at)||now())};if(!next.expires_at&&next.expires_in)next.expires_at=Math.floor(now()/1000)+Number(next.expires_in);write(next);return next}

  async function login(email,password){const r=await fetch(LOGIN,{method:'POST',headers:{apikey:KEY,'Content-Type':'application/json'},body:JSON.stringify({email,password})});const b=await r.json().catch(()=>({}));if(!r.ok){const e=new Error(b.error||'login_failed');e.retry_after_seconds=Number(b.retry_after_seconds)||0;throw e}const s=b.session;if(!s?.access_token)throw new Error('login_failed');const saved={...s,last_activity_at:now()};write(saved);sessionStorage.removeItem(INVITE);const aal=assurance(saved);if(aal!=='aal2'){const p={ok:false,user:b.user||{},permissions:b.permissions||{},aal,mfa_required:true};notify({state:'mfa_required',profile:p});return p}const p=await profile(saved.access_token);notify({state:'login',profile:p});return p}
  async function profile(token){const r=await fetch(`${URL}/functions/v1/admin-session`,{headers:{apikey:KEY,Authorization:`Bearer ${token}`},cache:'no-store'}),b=await r.json().catch(()=>({}));if(!r.ok)throw new Error(b.error||'session_failed');return {...b,aal:assurance({access_token:token}),mfa_required:true}}
  async function current(){let s=session();if(!s?.access_token)return null;try{s=await refreshSession(s,true)||s;return await profile(s.access_token)}catch(e){if(e.message==='mfa_required')return{ok:false,mfa_required:true,aal:assurance(s)};if(['inactive','unauthorized'].includes(e.message))clearLocal('session_expired');return null}}

  async function setPassword(password){let s=session();if(!s?.access_token)throw new Error('no_session');const issues=passwordIssues(password);if(issues.length){const e=new Error('password_policy');e.issues=issues;throw e}s=await refreshSession(s,true)||s;const r=await fetch(`${URL}/auth/v1/user`,{method:'PUT',headers:{apikey:KEY,Authorization:`Bearer ${s.access_token}`,'Content-Type':'application/json'},body:JSON.stringify({password})});if(!r.ok)throw new Error('password_update_failed');sessionStorage.removeItem(INVITE);if(assurance(s)!=='aal2'){const p={ok:false,mfa_required:true,aal:'aal1'};notify({state:'mfa_setup',profile:p});return p}const p=await profile(s.access_token);notify({state:'login',profile:p});return p}

  async function factors(){let s=session();if(!s?.access_token)throw new Error('no_session');s=await refreshSession(s,true)||s;const u=await authFetch('user',{token:s.access_token});return Array.isArray(u.factors)?u.factors:[]}
  async function enrollTotp(){let s=session();if(!s?.access_token)throw new Error('no_session');s=await refreshSession(s,true)||s;return authFetch('factors',{method:'POST',token:s.access_token,body:{factor_type:'totp',friendly_name:'萬里資訊後台'}})}
  async function challengeFactor(factorId){let s=session();if(!s?.access_token)throw new Error('no_session');s=await refreshSession(s,true)||s;return authFetch(`factors/${encodeURIComponent(factorId)}/challenge`,{method:'POST',token:s.access_token,body:{}})}
  async function verifyFactor(factorId,code,challengeId){let s=session();if(!s?.access_token)throw new Error('no_session');s=await refreshSession(s,true)||s;let challenge=challengeId?{id:challengeId}:await challengeFactor(factorId);const out=await authFetch(`factors/${encodeURIComponent(factorId)}/verify`,{method:'POST',token:s.access_token,body:{factor_id:factorId,challenge_id:challenge.id,code:String(code||'').trim()}});if(out?.access_token){const next={...s,...out,idle_minutes:Number(s.idle_minutes)||60,last_activity_at:now()};if(!next.expires_at&&next.expires_in)next.expires_at=Math.floor(now()/1000)+Number(next.expires_in);write(next);notify({state:'mfa_verified',aal:assurance(next)})}return out}
  async function unenrollFactor(factorId){let s=session();if(!s?.access_token)throw new Error('no_session');s=await refreshSession(s,true)||s;return authFetch(`factors/${encodeURIComponent(factorId)}`,{method:'DELETE',token:s.access_token})}
  async function logout(reason='logout'){const s=readRaw();if(s?.access_token){await event(s.access_token,reason==='idle_timeout'?'idle_timeout':'logout');await fetch(`${URL}/auth/v1/logout`,{method:'POST',headers:{apikey:KEY,Authorization:`Bearer ${s.access_token}`}}).catch(()=>{})}clearLocal(reason)}
  setInterval(()=>{const s=readRaw();if(!s?.access_token)return;if(idleExpired(s)){logout('idle_timeout').catch(()=>clearLocal('idle_timeout'));return}refreshSession(s,false).catch(()=>{})},240000);
  window.FBAdminAuth={login,current,logout,setPassword,session,refresh:()=>refreshSession(readRaw(),true),invitePending:()=>!!sessionStorage.getItem(INVITE),passwordPolicy:passwordIssues,passwordMin:PASSWORD_MIN,passwordMax:PASSWORD_MAX,assurance,factors,enrollTotp,challengeFactor,verifyFactor,unenrollFactor};
})();