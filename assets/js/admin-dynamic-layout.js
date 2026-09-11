(()=>{
  if(document.body.dataset.page!=='admin')return;
  function addLink(container,href,text,afterHref){
    if(!container||container.querySelector(`a[href="${href}"]`))return;
    const a=document.createElement('a');a.href=href;a.textContent=text;
    const after=afterHref?container.querySelector(`a[href="${afterHref}"]`):null;
    if(after)after.after(a);else container.appendChild(a);
  }
  function fixAnalyticsNote(){
    const box=document.getElementById('adminAnalytics');
    if(!box)return;
    [...box.querySelectorAll('.admin-usage-note')].forEach(note=>{
      if(note.id==='analyticsSourceNote')return;
      const html=note.innerHTML||'';
      if(html.includes('AI SEO：')&&html.includes('尚未連接可驗證的 AI 導流資料')){
        note.innerHTML=html.replace(
          '<b>AI SEO：</b>尚未連接可驗證的 AI 導流資料，因此目前不顯示提及次數或 AI 點擊，避免誤判。',
          '<b>AI SEO：</b>已開始記錄可辨識的 AI 助理轉介流量；AI 提及／引用次數仍需外部監測資料，兩者不混用。'
        );
      }
    });
  }
  function arrange(){
    const main=document.querySelector('.admin-main');
    const products=document.getElementById('products');
    const analytics=document.getElementById('adminAnalytics');
    const inquiries=document.getElementById('adminInquiries');
    if(main&&products&&analytics&&products.nextElementSibling!==analytics)products.after(analytics);
    if(main&&analytics&&inquiries&&analytics.nextElementSibling!==inquiries)analytics.after(inquiries);
    addLink(document.querySelector('.admin-nav'),'#adminInquiries','網站詢問紀錄','#adminAnalytics');
    addLink(document.querySelector('.admin-section-jump'),'#adminInquiries','網站詢問','#adminAnalytics');
    fixAnalyticsNote();
  }
  const run=()=>{arrange();setTimeout(arrange,150);setTimeout(arrange,600);setTimeout(arrange,1500)};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run,{once:true}):run();
  window.addEventListener('farbeyound:datachange',()=>setTimeout(arrange,100));
})();