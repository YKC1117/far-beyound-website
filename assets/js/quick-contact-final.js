(function(){
  'use strict';
  if(window.__fbQuickContactFinalV3)return;
  window.__fbQuickContactFinalV3=true;

  const ICONS={phone:'assets/images/icons/phone-contact-mark.svg',inquiry:'assets/images/icons/inquiry-contact-mark.svg'};
  const LABELS=[['phone','電話','立即聯絡'],['line','LINE','線上諮詢'],['inquiry','詢問','留下訊息']];

  function icon(kind){
    if(kind==='line')return '<span class="qcf-line-mark" aria-hidden="true"><span>LINE</span></span>';
    return '<img class="qcf-icon" src="'+ICONS[kind]+'" alt="" aria-hidden="true">';
  }

  function buildDesktop(root){
    if(!root)return;
    const items=[...root.querySelectorAll('.quick-contact-item')].filter(x=>!x.hasAttribute('data-back-top'));
    if(items.length<3)return;
    items.slice(0,3).forEach((item,i)=>{
      const btn=item.querySelector('.quick-contact-btn');
      if(!btn)return;
      const [kind,title,sub]=LABELS[i];
      const signature=kind+'|'+title+'|'+sub;
      if(btn.dataset.qcfSignature===signature && btn.querySelector('.qcf-title'))return;
      btn.innerHTML=icon(kind)+'<span class="qcf-copy"><b class="qcf-title">'+title+'</b><small class="qcf-sub">'+sub+'</small></span>';
      btn.dataset.qcfSignature=signature;
      btn.setAttribute('aria-label',title+'｜'+sub);
    });
    const top=root.querySelector('[data-back-top] .quick-contact-btn');
    if(top && !top.querySelector('.qcf-top-arrow')){
      top.innerHTML='<span class="qcf-top-arrow" aria-hidden="true">↑</span><span class="qcf-top-label">TOP</span>';
      top.setAttribute('aria-label','回到頂端');
    }
  }

  function buildMobile(bar){
    if(!bar)return;
    const links=[...bar.querySelectorAll('a,button')].slice(0,3);
    if(links.length<3)return;
    links.forEach((el,i)=>{
      const [kind,title,sub]=LABELS[i];
      const signature=kind+'|'+title+'|'+sub;
      if(el.dataset.qcfSignature===signature && el.querySelector('.qcf-mobile-copy'))return;
      el.innerHTML=icon(kind)+'<span class="qcf-mobile-copy"><b>'+title+'</b><small>'+sub+'</small></span>';
      el.dataset.qcfSignature=signature;
      el.setAttribute('aria-label',title+'｜'+sub);
    });
  }

  function installStyle(){
    if(document.getElementById('qcfV3Style'))return;
    const s=document.createElement('style');
    s.id='qcfV3Style';
    s.textContent=`
      body:not([data-page="admin"]) .quick-contact .quick-contact-btn::before,
      body:not([data-page="admin"]) .quick-contact .quick-contact-btn::after,
      body:not([data-page="admin"]) .mobile-contact-bar a::before,
      body:not([data-page="admin"]) .mobile-contact-bar a::after{content:none!important;display:none!important;background:none!important}
      body:not([data-page="admin"]) .quick-contact .quick-contact-btn svg,
      body:not([data-page="admin"]) .quick-contact .quick-contact-btn .icon,
      body:not([data-page="admin"]) .quick-contact .quick-contact-btn>b{display:none!important}
      @media(min-width:981px){
        body:not([data-page="admin"]) .quick-contact{position:fixed!important;right:14px!important;top:50%!important;transform:translateY(-50%)!important;z-index:120!important;width:58px!important;display:flex!important;flex-direction:column!important;align-items:center!important;gap:9px!important;padding:0!important;background:transparent!important;border:0!important;box-shadow:none!important;overflow:visible!important}
        body:not([data-page="admin"]) .quick-contact .quick-contact-item{width:58px!important;height:58px!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important}
        body:not([data-page="admin"]) .quick-contact .quick-contact-btn{box-sizing:border-box!important;width:58px!important;height:58px!important;min-width:58px!important;min-height:58px!important;padding:6px 3px!important;border:0!important;border-radius:14px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important;color:#fff!important;text-decoration:none!important;overflow:hidden!important;box-shadow:0 8px 20px rgba(18,48,72,.18)!important}
        body:not([data-page="admin"]) .quick-contact .quick-contact-item:nth-child(1) .quick-contact-btn{background:#1688e8!important}
        body:not([data-page="admin"]) .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn{background:#06c755!important}
        body:not([data-page="admin"]) .quick-contact .quick-contact-item:nth-child(3) .quick-contact-btn{background:#ff7418!important}
        body:not([data-page="admin"]) .quick-contact .qcf-icon{width:25px!important;height:25px!important;flex:0 0 25px!important;display:block!important;object-fit:contain!important;filter:brightness(0) invert(1)!important}
        body:not([data-page="admin"]) .quick-contact .qcf-line-mark{width:27px!important;height:22px!important;flex:0 0 27px!important;display:flex!important;align-items:center!important;justify-content:center!important;position:relative!important;border-radius:50%!important;background:#fff!important;color:#06c755!important}
        body:not([data-page="admin"]) .quick-contact .qcf-line-mark:after{content:""!important;position:absolute!important;left:5px!important;bottom:-3px!important;width:7px!important;height:6px!important;background:#fff!important;clip-path:polygon(0 0,100% 0,0 100%)!important}
        body:not([data-page="admin"]) .quick-contact .qcf-line-mark span{font-size:7px!important;font-weight:1000!important;letter-spacing:-.08em!important;line-height:1!important}
        body:not([data-page="admin"]) .quick-contact .qcf-copy{display:flex!important;flex-direction:column!important;align-items:center!important;gap:2px!important;line-height:1!important}
        body:not([data-page="admin"]) .quick-contact .qcf-title{display:block!important;color:#fff!important;font-size:11px!important;font-weight:900!important;line-height:1!important;letter-spacing:.03em!important}
        body:not([data-page="admin"]) .quick-contact .qcf-sub{display:block!important;color:rgba(255,255,255,.92)!important;font-size:7px!important;font-weight:700!important;line-height:1!important;white-space:nowrap!important}
        body:not([data-page="admin"]) .quick-contact .quick-contact-item[data-back-top]{width:42px!important;height:42px!important;margin-top:2px!important;align-self:center!important}
        body:not([data-page="admin"]) .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn{width:42px!important;height:42px!important;min-width:42px!important;min-height:42px!important;border-radius:50%!important;background:#f7fafc!important;color:#63798a!important;border:1px solid #dce6eb!important;box-shadow:0 6px 16px rgba(18,48,72,.1)!important;gap:1px!important}
        body:not([data-page="admin"]) .qcf-top-arrow{display:block!important;font-size:15px!important;font-weight:800!important;line-height:1!important}
        body:not([data-page="admin"]) .qcf-top-label{display:block!important;font-size:6px!important;font-weight:900!important;letter-spacing:.12em!important;line-height:1!important}
      }
      @media(max-width:980px){
        body:not([data-page="admin"]) .quick-contact{display:none!important}
        body:not([data-page="admin"]) .mobile-contact-bar{position:fixed!important;left:12px!important;right:12px!important;bottom:calc(10px + env(safe-area-inset-bottom))!important;z-index:9999!important;box-sizing:border-box!important;display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:5px!important;padding:5px!important;background:rgba(255,255,255,.98)!important;border:1px solid #d6e1e7!important;border-radius:20px!important;box-shadow:0 12px 34px rgba(16,42,66,.18)!important;overflow:hidden!important;backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important}
        body:not([data-page="admin"]) .mobile-contact-bar a,body:not([data-page="admin"]) .mobile-contact-bar button{box-sizing:border-box!important;min-width:0!important;height:72px!important;min-height:72px!important;margin:0!important;padding:8px 4px!important;border:0!important;border-radius:15px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important;color:#fff!important;text-decoration:none!important;font:inherit!important;overflow:hidden!important}
        body:not([data-page="admin"]) .mobile-contact-bar a:nth-child(1){background:#1688e8!important}body:not([data-page="admin"]) .mobile-contact-bar a:nth-child(2){background:#06c755!important}body:not([data-page="admin"]) .mobile-contact-bar a:nth-child(3){background:#ff7418!important}
        body:not([data-page="admin"]) .mobile-contact-bar .qcf-icon{width:25px!important;height:25px!important;flex:0 0 25px!important;display:block!important;object-fit:contain!important;filter:brightness(0) invert(1)!important}
        body:not([data-page="admin"]) .mobile-contact-bar .qcf-line-mark{width:27px!important;height:22px!important;flex:0 0 27px!important;display:flex!important;align-items:center!important;justify-content:center!important;position:relative!important;border-radius:50%!important;background:#fff!important;color:#06c755!important}
        body:not([data-page="admin"]) .mobile-contact-bar .qcf-line-mark span{font-size:7px!important;font-weight:1000!important;letter-spacing:-.08em!important;line-height:1!important}
        body:not([data-page="admin"]) .qcf-mobile-copy{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:2px!important;line-height:1!important}
        body:not([data-page="admin"]) .qcf-mobile-copy b{display:block!important;color:#fff!important;font-size:14px!important;font-weight:900!important;line-height:1.05!important}
        body:not([data-page="admin"]) .qcf-mobile-copy small{display:block!important;color:rgba(255,255,255,.92)!important;font-size:8px!important;font-weight:700!important;line-height:1!important;white-space:nowrap!important}
        body:not([data-page="admin"]){padding-bottom:calc(94px + env(safe-area-inset-bottom))!important}
      }
    `;
    document.head.appendChild(s);
  }

  function run(){
    if(document.body?.dataset?.page==='admin')return;
    installStyle();
    buildDesktop(document.querySelector('.quick-contact'));
    buildMobile(document.querySelector('.mobile-contact-bar,#fbMobileQuick'));
  }

  function start(){
    run();
    const observer=new MutationObserver(()=>run());
    if(document.body)observer.observe(document.body,{childList:true,subtree:true});
    [100,350,800,1500,2600].forEach(t=>setTimeout(run,t));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
