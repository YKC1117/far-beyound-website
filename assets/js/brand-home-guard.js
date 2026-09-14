(()=>{'use strict';
if(window.__fbBrandHomeGuard)return;
window.__fbBrandHomeGuard=true;
const HOME='https://ykc1117.github.io/far-beyound-website/';
function apply(){
  document.querySelectorAll('#siteHeader a.brand,#siteFooter a.brand').forEach(a=>{
    a.setAttribute('href',HOME);
    a.setAttribute('data-home-brand','1');
  });
  if(!document.getElementById('fbBrandHomeGuardStyle')){
    const s=document.createElement('style');
    s.id='fbBrandHomeGuardStyle';
    s.textContent='.site-header .brand{position:relative;z-index:60!important;pointer-events:auto!important}.site-header .brand>*{pointer-events:none!important}';
    document.head.appendChild(s);
  }
}
document.addEventListener('click',e=>{
  const a=e.target.closest?.('a[data-home-brand]');
  if(!a)return;
  e.preventDefault();
  e.stopImmediatePropagation();
  window.location.assign(HOME);
},true);
window.addEventListener('DOMContentLoaded',()=>setTimeout(apply,0));
window.addEventListener('load',()=>setTimeout(apply,0));
window.addEventListener('farbeyound:datachange',()=>setTimeout(apply,0));
})();
