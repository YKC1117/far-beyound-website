(()=>{
  if(window.FBAdminAuth)return;
  const URL='https://papqrnqbfauwuipjwwdh.supabase.co';
  const KEY='sb_publishable_dDCh9hy183BipvxCbuZdiA_qPonsyxe';
  const STORE='farbeyoundAdminSessionV1',INVITE='farbeyoundAdminInvitePendingV1';
  const LOGIN=`${URL}/functions/v1/admin-login`;
  const readRaw=()=>{try{return JSON.parse(sessionStorage.getItem(STORE)||'null')}catch{return null}};
  const write=v=>{if(v)sessionStorage.setItem(STORE,JSON.stringify(v));else sessionStorage.removeItem(STORE)};
  const notify=detail=>window.dispatchEvent(new CustomEvent('farbeyound:adminauth',{detail:detail||{}}));
  const now=()=>Date.now();
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
      sessionStorage.setItem(INVITE,type);
      history.replaceState(null,'',location.pathname+location.search);
      setTimeout(()=>notify({state:'invite'}),0);
      return true;
    }
    return sessionStorage.getItem(INVITE)||'';
  }
  captureInvite();

  async function event(token,event_type){
    if(!token)return;
    await fetch(`${URL}/functions/v1/admin-login-event`,{method:'POST',headers:{apikey:KEY,Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({event_type})}).catch(()=>{});
  }

  async function refreshSession(s=readRaw(),touch=false){
    if(!s?.refresh_token)return null;
    if(idleExpired(s)){clearLocal('idle_timeout');return null}
    const expiresAt=Number(s.expires_at)||0;
    if(s.access_token&&expiresAt*1000-now()>120000){if(touch){s.last_activity_at=now();write(s)}return s}
    const r=await fetch(`${URL}/auth/v1/token?grant_type=refresh_token`,{method:'POST',headers:{apikey:KEY,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:s.refresh_token})});
    const b=await r.json().catch(()=>({}));
    if(!r.ok||!b.access_token){clearLocal('session_expired');return null}
    const next={...s,...b,idle_minutes:Number(s.idle_minutes)||60,last_activity_at:touch?now():(Number(s.last_activity_at)||now())};
    if(!next.expires_at&&next.expires_in)next.expires_at=Math.floor(now()/1000)+Number(next.expires_in);
    write(next);return next;
  }

  async function login(email,password){
    const r=await fetch(LOGIN,{method:'POST',headers:{apikey:KEY,'Content-Type':'application/json'},body:JSON.stringify({email,password})});
    const b=await r.json().catch(()=>({}));
    if(!r.ok){const e=new Error(b.error||'login_failed');e.retry_after_seconds=Number(b.retry_after_seconds)||0;throw e}
    const s=b.session;if(!s?.access_token)throw new Error('login_failed');
    write({...s,last_activity_at:now()});sessionStorage.removeItem(INVITE);
    const p={ok:true,user:b.user||{},permissions:b.permissions||{}};
    notify({state:'login',profile:p});return p;
  }

  async function profile(token){
    const r=await fetch(`${URL}/functions/v1/admin-session`,{headers:{apikey:KEY,Authorization:`Bearer ${token}`}}),b=await r.json().catch(()=>({}));
    if(!r.ok)throw new Error(b.error||'session_failed');return b;
  }

  async function current(){
    let s=session();if(!s?.access_token)return null;
    try{s=await refreshSession(s,true)||s;const p=await profile(s.access_token);return p}catch(e){if(['inactive','unauthorized'].includes(e.message))clearLocal('session_expired');return null}
  }

  async function setPassword(password){
    let s=session();if(!s?.access_token)throw new Error('no_session');
    if(String(password||'').length<8||String(password||'').length>64)throw new Error('password_length');
    s=await refreshSession(s,true)||s;
    const r=await fetch(`${URL}/auth/v1/user`,{method:'PUT',headers:{apikey:KEY,Authorization:`Bearer ${s.access_token}`,'Content-Type':'application/json'},body:JSON.stringify({password})});
    if(!r.ok)throw new Error('password_update_failed');
    sessionStorage.removeItem(INVITE);const p=await profile(s.access_token);notify({state:'login',profile:p});return p;
  }

  async function logout(reason='logout'){
    const s=readRaw();
    if(s?.access_token){await event(s.access_token,reason==='idle_timeout'?'idle_timeout':'logout');await fetch(`${URL}/auth/v1/logout`,{method:'POST',headers:{apikey:KEY,Authorization:`Bearer ${s.access_token}`}}).catch(()=>{})}
    clearLocal(reason);
  }

  setInterval(()=>{const s=readRaw();if(!s?.access_token)return;if(idleExpired(s)){logout('idle_timeout').catch(()=>clearLocal('idle_timeout'));return}refreshSession(s,false).catch(()=>{})},240000);
  window.FBAdminAuth={login,current,logout,setPassword,session,refresh:()=>refreshSession(readRaw(),true),invitePending:()=>!!sessionStorage.getItem(INVITE)};
})();
