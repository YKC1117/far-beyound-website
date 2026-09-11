(()=>{
  if(document.body.dataset.page!=='admin')return;
  function addLink(container,href,text,afterHref){
    if(!container||container.querySelector(`a[href="${href}"]`))return;
    const a=document.createElement('a');a.href=href;a.textContent=text;
    const after=afterHref?container.querySelector(`a[href="${afterHref}"]`):null;
    if(after)after.after(a);else container.appendChild(a);
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
  }
  const run=()=>{arrange();setTimeout(arrange,150);setTimeout(arrange,600);setTimeout(arrange,1500)};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',run,{once:true}):run();
  window.addEventListener('farbeyound:datachange',()=>setTimeout(arrange,100));
})();