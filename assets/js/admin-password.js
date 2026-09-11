(()=>{
  if(document.body.dataset.page!=='admin')return;
  const ENDPOINT='https://papqrnqbfauwuipjwwdh.supabase.co/functions/v1/admin-password';
  function build(){
    if(document.getElementById('adminPassword'))return;
    const anchor=document.getElementById('adminInquiries')||document.getElementById('adminAnalytics')||document.getElementById('products');
    if(!anchor){setTimeout(build,100);return}
    const box=document.createElement('section');
    box.id='adminPassword';box.className='admin-panel';
    box.innerHTML='<div class="admin-panel-head"><div><span class="eyebrow">ADMIN SECURITY</span><h2>後台密碼</h2><p>可直接更換後台發布／詢問紀錄使用的密碼。新密碼不會儲存在瀏覽器。</p></div></div><form id="adminPasswordForm" style="padding:20px 22px"><div class="form-grid"><div class="field"><label>目前密碼 *</label><input id="adminPasswordCurrent" type="password" required autocomplete="current-password"><small>請輸入「現在正在生效」的後台密碼；如果剛修改過，就要輸入修改後的新密碼，不是最初的預設密碼。</small></div><div class="field"><label>新密碼 *</label><input id="adminPasswordNew" type="password" required minlength="8" maxlength="64" autocomplete="new-password"><small>需 8～64 個字元，且不能與目前密碼相同。</small></div><div class="field"><label>再次輸入新密碼 *</label><input id="adminPasswordConfirm" type="password" required minlength="8" maxlength="64" autocomplete="new-password"><small>必須與上方「新密碼」完全一致。</small></div></div><div class="admin-usage-note" style="margin:14px 0"><b>密碼修改規則：</b><br>1.「目前密碼」一定要是現在真正生效中的密碼。<br>2. 新密碼需 8～64 個字元。<br>3. 新密碼不能與目前密碼相同。<br>4. 兩次新密碼必須完全一致。<br>5. 按下儲存後仍會顯示二次確認；確認完成才會送出修改。<br>6. 修改成功後，網站發布與「網站詢問紀錄」都立刻改用新密碼，舊密碼失效。</div><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><button class="btn btn-primary btn-sm" type="submit">更改後台密碼</button><span id="adminPasswordStatus" class="admin-save-state">尚未修改</span></div></form>';
    anchor.after(box);
    document.getElementById('adminPasswordForm').addEventListener('submit',changePassword);
  }
  async function changePassword(ev){
    ev.preventDefault();
    const current=document.getElementById('adminPasswordCurrent').value;
    const next=document.getElementById('adminPasswordNew').value;
    const confirm=document.getElementById('adminPasswordConfirm').value;
    const status=document.getElementById('adminPasswordStatus');
    const btn=ev.currentTarget.querySelector('button[type="submit"]');
    if(next!==confirm){status.textContent='兩次新密碼不一致，請重新確認';status.classList.add('dirty');return}
    if(next.length<8||next.length>64){status.textContent='新密碼需 8～64 個字元';status.classList.add('dirty');return}
    if(current===next){status.textContent='新密碼不能與目前密碼相同';status.classList.add('dirty');return}
    btn.disabled=true;btn.textContent='修改中…';status.textContent='正在驗證目前密碼…';status.classList.remove('dirty');
    try{
      const r=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({current_password:current,new_password:next})});
      const out=await r.json().catch(()=>({}));
      if(!r.ok||!out.ok){
        if(out.error==='unauthorized')throw new Error('auth');
        if(out.error==='password_length')throw new Error('length');
        if(out.error==='same_password')throw new Error('same');
        throw new Error('failed');
      }
      ev.currentTarget.reset();
      sessionStorage.removeItem('farbeyoundInquiryPassV1');
      status.textContent='密碼已更新，之後請使用新密碼';
      status.classList.remove('dirty');
      alert('後台密碼已更新。之後網站發布與查看詢問紀錄請使用新密碼，舊密碼已失效。');
    }catch(e){
      const code=String(e&&e.message||'');
      status.textContent=code==='auth'?'目前密碼不正確：請輸入現在正在生效的密碼；若剛修改過，請改用最新密碼':code==='length'?'新密碼需 8～64 個字元':code==='same'?'新密碼不能與目前密碼相同':'密碼修改失敗，請稍後再試';
      status.classList.add('dirty');
    }finally{btn.disabled=false;btn.textContent='更改後台密碼'}
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',build,{once:true}):build();
})();
