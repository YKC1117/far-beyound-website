(()=>{'use strict';
if(window.__fbBrandHomeGuard)return;
window.__fbBrandHomeGuard=true;
function homeHref(){
  const path=String(location.pathname||'');
  if(location.hostname==='ykc1117.github.io')return '/far-beyound-website/';
  const base=path.endsWith('/')?path:path.slice(0,path.lastIndexOf('/')+1);
  return base+'index.html';
}
function apply(){
  const href=homeHref();
  document.querySelectorAll('#siteHeader a.brand,#siteFooter a.brand').forEach(a=>{
    a.setAttribute('href',href);
    a.setAttribute('data-home-brand','1');
  });
  if(!document.getElementById('fbBrandHomeGuardStyle')){
    const s=document.createElement('style');
    s.id='fbBrandHomeGuardStyle';
    s.textContent='.site-header .brand{position:relative;z-index:60;pointer-events:auto}.site-header .brand>*{pointer-events:none}';
    document.head.appendChild(s);
  }
}
document.addEventListener('click',e=>{
  const a=e.target.closest?.('a[data-home-brand]');
  if(!a)return;
  e.preventDefault();
  location.assign(a.href);
},true);
window.addEventListener('DOMContentLoaded',()=>setTimeout(apply,0));
window.addEventListener('load',()=>setTimeout(apply,0));
window.addEventListener('farbeyound:datachange',()=>setTimeout(apply,0));
})();
