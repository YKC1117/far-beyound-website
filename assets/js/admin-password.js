(()=>{
  if(document.body.dataset.page!=='admin')return;
  const ENDPOINT='https://papqrnqbfauwuipjwwdh.supabase.co/functions/v1/admin-password';
  const BOOT='https://papqrnqbfauwuipjwwdh.supabase.co/functions/v1/admin-owner-bootstrap';
  function issues(v){v=String(v||'');const x=[];if(v.length<16||v.length>64)x.push('長度需為 16～64 個字元');if(!/[A-Z]/.test(v))x.push('至少 1 個英文大寫字母');if(!/[a-z]/.test(v))x.push('至少 1 個英文小寫字母');if(!/[0-9]/.test(v))x.push('至少 1 個數字');if(!/[^A-Za-z0-9\s]/.test(v))x.push('至少 1 個特殊符號');return x}
  async function legacyState(){try{const r=await fetch(BOOT,{cache:'no-store'}),b=await r.json().catch(()=>({}));return b.needs_owner===true}catch{return true}}
  function build(){
    if(document.getElementById('adminPassword'))return;
    const anchor=document.getElementById('adminInquiries')||document.getElementById('adminAnalytics')||document.getElementById('products');
    if(!anchor){setTimeout(build,100);return}
    const box=document.createElement('section');box.id='adminPassword';box.className='admin-panel';
    box.innerHTML='<div class="admin-panel-head"><div><span class="eyebrow">ADMIN SECURITY</span><h2>共用發布密碼</h2><p>只供尚未建立首位 Owner 前的過渡設定。正式個人帳號啟用後會自動停用。</p></div></div><form id="adminPasswordForm" style="padding:20px 22px"><div class="form-grid"><div class="field"><label>目前密碼 *</label><input id="adminPasswordCurrent" type="password" required autocomplete="current-password"><small>請輸入現在真正生效中的共用發布密碼。</small></div><div class="field"><label>新密碼 *</label><input id="adminPasswordNew" type="password" required minlength="16" maxlength="64" autocomplete="new-password"><small>16～64 個字元；需同時包含英文大寫、英文小寫、數字及特殊符號。</small></div><div class="field"><label>再次輸入新密碼 *</label><input id="adminPasswordConfirm" type="password" required minlength="16" maxlength="64" autocomplete="new-password"><small>必須與上方新密碼完全一致。</small></div></div><div class="admin-danger-note" style="margin:14px 0"><b>重要提醒</b>不要使用生日、電話、公司名稱、姓名、常見單字或與其他服務重複的密碼。建立首位 Owner 後，共用發布密碼會退出正式管理流程。</div><div class="admin-usage-note" style="margin:14px 0"><b>密碼規則：</b><br>1. 長度 16～64 個字元。<br>2. 必須包含英文大寫、英文小寫、數字與特殊符號。<br>3. 新密碼不得與目前密碼相同。<br>4. 兩次新密碼必須完全一致。</div><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><button class="btn btn-primary btn-sm" type="submit">更改共用密碼</button><span id="adminPasswordStatus" class="admin-save-state">尚未修改</span></div></form><div id="adminPasswordRetired" class="admin-usage-note" style="margin:16px 20px" hidden><b>已停用：</b>公司已啟用正式個人帳號。後續登入、發布與敏感操作改用個人帳號＋二維碼兩步驟驗證，共用發布密碼不再提供修改。</div>';
    anchor.after(box);document.getElementById('adminPasswordForm').addEventListener('submit',changePassword);syncState()
  }
  async function syncState(){const active=await legacyState(),form=document.getElementById('adminPasswordForm'),retired=document.getElementById('adminPasswordRetired');if(!form||!retired)return;form.hidden=!active;retired.hidden=active}
  async function changePassword(ev){
    ev.preventDefault();const current=document.getElementById('adminPasswordCurrent').value,next=document.getElementById('adminPasswordNew').value,confirm=document.getElementById('adminPasswordConfirm').value,status=document.getElementById('adminPasswordStatus'),btn=ev.currentTarget.querySelector('button[type="submit"]');
    const bad=issues(next);if(bad.length){status.textContent='新密碼未符合安全規則';status.classList.add('dirty');alert('密碼未符合安全規則：\n\n• '+bad.join('\n• '));return}if(next!==confirm){status.textContent='兩次新密碼不一致';status.classList.add('dirty');return}if(current===next){status.textContent='新密碼不能與目前密碼相同';status.classList.add('dirty');return}
    btn.disabled=true;btn.textContent='修改中…';status.textContent='正在驗證目前密碼…';status.classList.remove('dirty');
    try{const r=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({current_password:current,new_password:next})}),out=await r.json().catch(()=>({}));if(!r.ok||!out.ok){if(out.error==='unauthorized')throw new Error('auth');if(out.error==='same_password')throw new Error('same');if(out.error==='legacy_disabled')throw new Error('retired');if(out.error==='password_policy')throw new Error('policy');throw new Error('failed')}ev.currentTarget.reset();status.textContent='密碼已更新';status.classList.remove('dirty');alert('後台共用發布密碼已更新。')}
    catch(e){const code=String(e&&e.message||'');if(code==='retired'){status.textContent='共用密碼已停用';await syncState()}else status.textContent=code==='auth'?'目前密碼不正確':code==='same'?'新密碼不能與目前密碼相同':code==='policy'?'新密碼未符合安全規則':'密碼修改失敗，請稍後再試';status.classList.add('dirty')}
    finally{btn.disabled=false;btn.textContent='更改共用密碼'}
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',build,{once:true}):build();
})();