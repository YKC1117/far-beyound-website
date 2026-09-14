(()=>{'use strict';
if(window.__fbQuickContactHotfix)return;
window.__fbQuickContactHotfix=true;
const INQUIRY='assets/images/icons/inquiry-contact-mark.svg?v=20260914-2010';
function run(){
  document.querySelectorAll('.quick-contact .quick-contact-item:nth-child(3) .qcf-icon,.mobile-contact-bar a:nth-child(3) .qcf-icon,.mobile-contact-bar button:nth-child(3) .qcf-icon').forEach(img=>{
    if(!img.src.includes('inquiry-contact-mark.svg'))img.src=INQUIRY;
  });
}
function start(){
  run();
  [100,350,800,1500,2600].forEach(t=>setTimeout(run,t));
  if(document.body)new MutationObserver(()=>run()).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
