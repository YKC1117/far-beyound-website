(()=>{
  if(document.body.dataset.page!=='admin')return;
  const ENDPOINT='https://papqrnqbfauwuipjwwdh.supabase.co/functions/v1/admin-password';
  function issues(v){v=String(v||'');const x=[];if(v.length<16||v.length>64)x.push('長度需為 16～64 個字元');if(!/[A-Z]/.test(v))x.push('至少 1 個英文大寫字母');if(!/[a-z]/.test(v))x.push('至少 1 個英文小寫字母');if(!/[0-9]/.test(v))x.push('至少 1 個數字');if(!/[^A-Za-z0-9\s]/.test(v))x.push('至少 1 個特殊符號');return x}
  function build(){
    if(document.getElementById('adminPassword'))return;
    const anchor=document.getElementById('adminInquiries')||document.getElementById('adminAnalytics')||document.getElementById('products');
    if(!anchor){setTimeout(build,100);return}
    const box=document.createElement('section');box.id='adminPassword';box.className='admin-panel';
    box.innerHTML='<div class="admin-panel-head"><div><span class="eyebrow">ADMIN SECURITY</span><h2>後台密碼</h2><p>共用發布密碼屬過渡機制；正式個人帳號建立後，應優先使用個人帳號＋兩步驟驗證。</p></div></div><form id="adminPasswordForm" style="padding:20px 22px"><div class="form-grid"><div class="field"><label>目前密碼 *</label><input id="adminPasswordCurrent" type="password" required autocomplete="current-password"><small>請輸入現在真正生效中的共用發布密碼。</small></div><div class="field"><label>新密碼 *</label><input id="adminPasswordNew" type="password" required minlength="16" maxlength="64" autocomplete="new-password"><small>16～64 個字元；需同時包含英文大寫、英文小寫、數字及特殊符號。</small></div><div class="field"><label>再次輸入新密碼 *</label><input id="adminPasswordConfirm" type="password" required minlength="16" maxlength="64" autocomplete="new-password"><small>必須與上方新密碼完全一致。</small></div></div><div class="admin-danger-note" style="margin:14px 0"><b>重要提醒</b>不要使用生日、電話、公司名稱、姓名、常見單字或與其他服務重複的密碼。建議由密碼管理工具產生並保存。</div><div class="admin-usage-note" style="margin:14px 0"><b>密碼規則：</b><br>1. 長度 16～64 個字元。<br>2. 必須包含英文大寫、英文小寫、數字與特殊符號。<br>3. 新密碼不得與目前密碼相同。<br>4. 兩次新密碼必須完全一致。<br>5. 正式個人帳號建立後，敏感操作改以個人帳號與兩步驟驗證為主。</div><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><button class="btn btn-primary btn-sm" type="submit">更改後台密碼</button><span id="adminPasswordStatus" class="admin-save-state">尚未修改</span></div></form>';
    anchor.after(box);document.getElementById('adminPasswordForm').addEventListener('submit',changePassword)
  }
  async function changePassword(ev){
    ev.preventDefault();const current=document.getElementById('adminPasswordCurrent').value,next=document.getElementById('adminPasswordNew').value,confirm=document.getElementById('adminPasswordConfirm').value,status=document.getElementById('adminPasswordStatus'),btn=ev.currentTarget.querySelector('button[type="submit"]');
    const bad=issues(next);if(bad.length){status.textContent='新密碼未符合安全規則';status.classList.add('dirty');alert('密碼未符合安全規則：\n\n• '+bad.join('\n• '));return}if(next!==confirm){status.textContent='兩次新密碼不一致';status.classList.add('dirty');return}if(current===next){status.textContent='新密碼不能與目前密碼相同';status.classList.add('dirty');return}
    btn.disabled=true;btn.textContent='修改中…';status.textContent='正在驗證目前密碼…';status.classList.remove('dirty');
    try{const r=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({current_password:current,new_password:next})}),out=await r.json().catch(()=>({}));if(!r.ok||!out.ok){if(out.error==='unauthorized')throw new Error('auth');if(out.error==='same_password')throw new Error('same');throw new Error('failed')}ev.currentTarget.reset();status.textContent='密碼已更新';status.classList.remove('dirty');alert('後台共用發布密碼已更新。')}
    catch(e){const code=String(e&&e.message||'');status.textContent=code==='auth'?'目前密碼不正確':code==='same'?'新密碼不能與目前密碼相同':'密碼修改失敗，請稍後再試';status.classList.add('dirty')}
    finally{btn.disabled=false;btn.textContent='更改後台密碼'}
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',build,{once:true}):build();
})();