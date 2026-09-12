(()=>{
  if(document.body.dataset.page!=='admin'||window.__fbAdminMfaCompat)return;
  window.__fbAdminMfaCompat=true;
  const URL='https://papqrnqbfauwuipjwwdh.supabase.co';
  const KEY='sb_publishable_dDCh9hy183BipvxCbuZdiA_qPonsyxe';
  async function ready(){
    if(!window.FBAdminAuth){setTimeout(ready,80);return}
    window.FBAdminAuth.factors=async()=>{
      let s=window.FBAdminAuth.session?.();if(!s?.access_token)throw new Error('no_session');
      s=await window.FBAdminAuth.refresh?.()||s;
      const r=await fetch(`${URL}/auth/v1/factors`,{headers:{apikey:KEY,Authorization:`Bearer ${s.access_token}`},cache:'no-store'}),b=await r.json().catch(()=>({}));
      if(!r.ok)throw new Error(b.error_code||b.message||'factor_read_failed');
      const raw=b?.data||b||{};if(Array.isArray(raw))return raw;if(Array.isArray(raw.all))return raw.all;
      const out=[];for(const k of ['totp','phone','webauthn'])if(Array.isArray(raw[k]))out.push(...raw[k]);return out
    };
    const baseVerify=window.FBAdminAuth.verifyFactor?.bind(window.FBAdminAuth);
    if(baseVerify)window.FBAdminAuth.verifyFactor=async(...args)=>{
      const before=window.FBAdminAuth.assurance?.()||'aal1',out=await baseVerify(...args),after=window.FBAdminAuth.assurance?.()||'aal1';
      if(before!=='aal2'&&after==='aal2'){
        const s=window.FBAdminAuth.session?.();
        if(s?.access_token)fetch(`${URL}/functions/v1/admin-login-event`,{method:'POST',headers:{apikey:KEY,Authorization:`Bearer ${s.access_token}`,'Content-Type':'application/json'},body:JSON.stringify({event_type:'login_success'})}).catch(()=>{})
      }
      return out
    }
  }
  ready()
})();