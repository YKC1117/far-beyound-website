(function(){
  // Keep the public navigation from being rewritten repeatedly during startup.
  function stabilize(){
    const desktop=document.querySelector('.desktop-nav'),mobile=document.querySelector('.drawer-links');
    if(!desktop||!mobile)return;
    let lastDesktop=desktop.innerHTML,lastMobile=mobile.innerHTML;
    const guard=(el,last)=>{const now=el.innerHTML;return now===last?last:now};
    window.__FBNavStable={desktop,mobile,get desktopHTML(){return lastDesktop},get mobileHTML(){return lastMobile},sync(){lastDesktop=guard(desktop,lastDesktop);lastMobile=guard(mobile,lastMobile)}};
    window.__FBNavStable.sync();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',stabilize,{once:true});else stabilize();
})();
