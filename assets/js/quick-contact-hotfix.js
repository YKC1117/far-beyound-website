(()=>{'use strict';
if(window.__fbQuickContactHotfix)return;
window.__fbQuickContactHotfix=true;
const INQUIRY='assets/images/icons/inquiry-contact-mark.svg?v=20260914-1955';
function run(){
  document.querySelectorAll('.quick-contact .quick-contact-item:nth-child(3) .qcf-icon,.mobile-contact-bar a:nth-child(3) .qcf-icon').forEach(img=>{
    if(!img.src.includes('inquiry-contact-mark.svg?v=20260914-1955'))img.src=INQUIRY;
  });
  document.querySelectorAll('.mobile-contact-bar button:first-child').forEach(btn=>{
    btn.style.setProperty('background','#1688e8','important');
    btn.style.setProperty('color','#fff','important');
  });
}
document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,150);setTimeout(run,700);setTimeout(run,1600)});
window.addEventListener('load',run);
})();
