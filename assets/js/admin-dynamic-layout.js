(()=>{
  if(document.body.dataset.page!=='admin')return;
  let dynamicObserver=null;
  function addLink(container,href,text,afterHref){
    if(!container||container.querySelector(`a[href="${href}"]`))return;
    const a=document.createElement('a');a.href=href;a.textContent=text;
    const after=afterHref?container.querySelector(`a[href="${afterHref}"]`):null;
    if(after)after.after(a);else container.appendChild(a);
  }
  function loadPasswordModule(){
    if(document.querySelector('script[data-admin-password]'))return;
    const s=document.createElement('script');s.src='assets/js/admin-password.js?v=20260912-0008';s.dataset.adminPassword='1';document.body.appendChild(s);
  }
  function injectPolishStyle(){
    if(document.getElementById('adminDynamicPolish'))return;
    const s=document.createElement('style');s.id='adminDynamicPolish';s.textContent=`
      body[data-page="admin"] #adminPassword .field small{display:block;margin-top:7px;color:#718694;font-size:11px;line-height:1.55}
      body[data-page="admin"] #adminPassword .admin-usage-note b{color:#24485d}
      body[data-page="admin"] #adminPassword .admin-usage-note{line-height:1.8}
      @media(max-width:780px){
        body[data-page="admin"] .admin-section-jump{display:flex;flex-wrap:nowrap;overflow-x:auto;gap:8px;margin:0 -14px 16px;padding:4px 14px 10px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
        body[data-page="admin"] .admin-section-jump::-webkit-scrollbar{display:none}
        body[data-page="admin"] .admin-section-jump a{flex:0 0 auto;white-space:nowrap;min-width:max-content;padding:9px 13px;line-height:1.2}
        body[data-page="admin"] #adminPassword form{padding:16px!important}
        body[data-page="admin"] #adminPassword .form-grid{display:grid;grid-template-columns:1fr;gap:14px}
        body[data-page="admin"] #adminInquiries .admin-product-tools{display:grid!important;grid-template-columns:1fr;gap:8px;margin:0 14px 12px!important}
      }
    `;document.head.appendChild(s);
  }
  function polishPasswordPanel(){
    const box=document.getElementById('adminPassword');if(!box)return;
    const fields=box.querySelectorAll('.field');
    if(fields[0]){const sm=fields[0].querySelector('small');if(sm)sm.textContent='請輸入現在正在生效的後台密碼；如果剛修改過，請輸入最新密碼。'}
    if(fields[1]){const sm=fields[1].querySelector('small');if(sm)sm.textContent='8～64 個字元；英文大小寫與數字皆可使用，特殊符號可用但不強制。'}
    if(fields[2]){const sm=fields[2].querySelector('small');if(sm)sm.textContent='必須與上方新密碼完全一致；英文大小寫視為不同字元。'}
    const note=box.querySelector('.admin-usage-note');
    if(note)note.innerHTML='<b>密碼規則：</b><br>1. 長度：8～64 個字元。<br>2. 英文：可使用 A～Z、a～z，大小寫有區別；目前不強制一定同時包含大寫與小寫。<br>3. 數字：可使用 0～9，目前不強制一定包含數字。<br>4. 特殊符號：可以使用，但目前不強制。<br>5. 新密碼不可與目前密碼完全相同。<br>6. 兩次新密碼必須完全一致。<br>7. 按下儲存後仍會進入二次確認，確認完成才會真正送出。<br>8. 修改成功後，網站發布與網站詢問紀錄立即改用新密碼，舊密碼失效。';
  }
  function fixAnalyticsNote(){
    const box=document.getElementById('adminAnalytics');if(!box)return;
    [...box.querySelectorAll('.admin-usage-note')].forEach(note=>{
      if(note.id==='analyticsSourceNote')return;
      const html=note.innerHTML||'';
      if(html.includes('AI SEO：')&&html.includes('尚未連接可驗證的 AI 導流資料'))note.innerHTML=html.replace('<b>AI SEO：</b>尚未連接可驗證的 AI 導流資料，因此目前不顯示提及次數或 AI 點擊，避免誤判。','<b>AI SEO：</b>已開始記錄可辨識的 AI 助理轉介流量；AI 提及／引用次數仍需外部監測資料，兩者不混用。');
    });
  }
  function setupDynamicActive(){
    const sections=['adminAnalytics','adminInquiries','adminPassword'].map(id=>document.getElementById(id)).filter(Boolean);
    if(!sections.length||!('IntersectionObserver'in window))return;
    if(dynamicObserver)dynamicObserver.disconnect();
    dynamicObserver=new IntersectionObserver(entries=>{
      const hit=entries.filter(e=>e.isIntersecting).sort((a,b)=>Math.abs(a.boundingClientRect.top)-Math.abs(b.boundingClientRect.top))[0];
      if(!hit)return;
      document.querySelectorAll('.admin-nav a[href^="#"]').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+hit.target.id));
    },{rootMargin:'-20% 0px -68% 0px',threshold:0});
    sections.forEach(s=>dynamicObserver.observe(s));
  }
  function arrange(){
    const main=document.querySelector('.admin-main');
    const products=document.getElementById('products');
    const analytics=document.getElementById('adminAnalytics');
    const inquiries=document.getElementById('adminInquiries');
    const password=document.getElementById('adminPassword');
    if(main&&products&&analytics&&products.nextElementSibling!==analytics)products.after(analytics);
    if(main&&analytics&&inquiries&&analytics.nextElementSibling!==inquiries)analytics.after(inquiries);
    if(main&&inquiries&&password&&inquiries.nextElementSibling!==password)inquiries.after(password);
    addLink(document.querySelector('.admin-nav'),'#adminInquiries','網站詢問紀錄','#adminAnalytics');
    addLink(document.querySelector('.admin-nav'),'#adminPassword','後台密碼','#adminInquiries');
    addLink(document.querySelector('.admin-section-jump'),'#adminInquiries','網站詢問','#adminAnalytics');
    addLink(document.querySelector('.admin-section-jump'),'#adminPassword','後台密碼','#adminInquiries');
    const version=document.querySelector('.admin-version-note');if(version)version.textContent='後台介面更新：2026/09/12 00:20';
    polishPasswordPanel();fixAnalyticsNote();setupDynamicActive();
  }
  const run=()=>{injectPolishStyle();loadPasswordModule();arrange();setTimeout(arrange,150);setTimeout(arrange,600);setTimeout(arrange,1500)};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run,{once:true}):run();
  window.addEventListener('farbeyound:datachange',()=>setTimeout(arrange,100));
})();