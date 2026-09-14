(function(){
  function install(){
    if(document.getElementById('fbMobileContactSafe'))return;
    var s=document.createElement('style');
    s.id='fbMobileContactSafe';
    s.textContent='@media(max-width:980px){.v2-home-hero{padding-bottom:92px!important}.v2-hero-products{margin-bottom:8px!important}}';
    document.head.appendChild(s);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
