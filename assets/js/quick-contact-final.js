(function(){
  if(window.__fbQuickContactFinalV2)return;
  window.__fbQuickContactFinalV2=true;

  const ICONS={
    phone:'assets/images/icons/phone-contact-mark.svg',
    inquiry:'assets/images/icons/inquiry-contact-mark.svg'
  };

  function makeIcon(kind){
    if(kind==='line')return '<span class="qcf-line-mark" aria-hidden="true">LINE</span>';
    return '<img class="qcf-icon" src="'+ICONS[kind]+'" alt="" aria-hidden="true">';
  }

  function transformDesktop(root){
    if(!root||root.dataset.qcfBuilt==='1')return;
    const items=[...root.querySelectorAll('.quick-contact-item')].filter(el=>!el.hasAttribute('data-back-top'));
    if(items.length<3)return;
    const labels=[['phone','電話','立即聯絡'],['line','LINE','線上諮詢'],['inquiry','詢問','留下訊息']];
    items.slice(0,3).forEach((item,i)=>{
      const btn=item.querySelector('.quick-contact-btn'); if(!btn)return;
      const [kind,title,sub]=labels[i];
      btn.innerHTML=makeIcon(kind)+'<span class="qcf-title">'+title+'</span><span class="qcf-sub">'+sub+'</span>';
      btn.setAttribute('aria-label',title+'｜'+sub);
    });
    const top=root.querySelector('[data-back-top] .quick-contact-btn');
    if(top){top.innerHTML='<span class="qcf-top-arrow">↑</span><span class="qcf-top-label">TOP</span>';top.setAttribute('aria-label','回到頂端')}
    root.dataset.qcfBuilt='1';
  }

  function transformMobile(bar){
    if(!bar||bar.dataset.qcfBuilt==='1')return;
    const links=[...bar.querySelectorAll('a,button')].slice(0,3);
    if(links.length<3)return;
    const labels=[['phone','電話','立即聯絡我們'],['line','LINE','線上即時諮詢'],['inquiry','詢問','留下訊息']];
    links.forEach((el,i)=>{
      const [kind,title,sub]=labels[i];
      el.innerHTML=makeIcon(kind)+'<span class="qcf-mobile-copy"><b>'+title+'</b><small>'+sub+'</small></span>';
      el.setAttribute('aria-label',title+'｜'+sub);
    });
    bar.dataset.qcfBuilt='1';
  }

  function install(){
    if(document.getElementById('qcfV2Style'))return;
    const style=document.createElement('style');
    style.id='qcfV2Style';
    style.textContent=`
      .quick-contact .qcf-icon,.mobile-contact-bar .qcf-icon{display:block!important;width:26px!important;height:26px!important;object-fit:contain!important;filter:brightness(0) invert(1)!important;flex:0 0 26px!important}
      .qcf-line-mark{display:flex!important;align-items:center!important;justify-content:center!important;width:27px!important;height:23px!important;border-radius:50%!important;background:#fff!important;color:#06c755!important;font-size:7px!important;font-weight:1000!important;letter-spacing:-.05em!important;position:relative!important;flex:0 0 27px!important}
      .qcf-line-mark:after{content:"";position:absolute;bottom:-3px;left:6px;border-width:4px 4px 0 0;border-style:solid;border-color:#fff transparent transparent transparent;transform:rotate(-12deg)}
      @media(min-width:981px){
        .quick-contact{position:fixed!important;right:14px!important;top:50%!important;transform:translateY(-50%)!important;z-index:120!important;display:flex!important;flex-direction:column!important;align-items:center!important;gap:9px!important;width:58px!important;padding:0!important;background:none!important;border:0!important;box-shadow:none!important}
        .quick-contact .quick-contact-item{display:block!important;width:58px!important;height:58px!important;margin:0!important;padding:0!important;border:0!important;background:none!important;box-shadow:none!important}
        .quick-contact .quick-contact-btn{box-sizing:border-box!important;width:58px!important;height:58px!important;min-width:58px!important;min-height:58px!important;margin:0!important;padding:7px 4px!important;border:0!important;border-radius:14px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important;color:#fff!important;text-decoration:none!important;overflow:hidden!important;box-shadow:0 8px 20px rgba(18,48,72,.18)!important}
        .quick-contact .quick-contact-item:nth-child(1) .quick-contact-btn{background:#1688e8!important}
        .quick-contact .quick-contact-item:nth-child(2) .quick-contact-btn{background:#06c755!important}
        .quick-contact .quick-contact-item:nth-child(3) .quick-contact-btn{background:#ff7418!important}
        .quick-contact .qcf-title{display:block!important;color:#fff!important;font-size:11px!important;font-weight:900!important;line-height:1!important;letter-spacing:.03em!important}
        .quick-contact .qcf-sub{display:block!important;color:rgba(255,255,255,.9)!important;font-size:7px!important;font-weight:700!important;line-height:1!important;white-space:nowrap!important}
        .quick-contact .quick-contact-item[data-back-top]{width:42px!important;height:42px!important;margin-top:2px!important;align-self:center!important}
        .quick-contact .quick-contact-item[data-back-top] .quick-contact-btn{width:42px!important;height:42px!important;min-width:42px!important;min-height:42px!important;border-radius:50%!important;background:#f7fafc!important;color:#63798a!important;border:1px solid #dce6eb!important;box-shadow:0 6px 16px rgba(18,48,72,.1)!important;gap:1px!important}
        .quick-contact .qcf-top-arrow{display:block!important;font-size:15px!important;font-weight:800!important;line-height:1!important;color:#63798a!important}
        .quick-contact .qcf-top-label{display:block!important;font-size:6px!important;font-weight:900!important;letter-spacing:.12em!important;line-height:1!important;color:#63798a!important}
      }
      @media(max-width:980px){
        .quick-contact{display:none!important}
        .mobile-contact-bar{position:fixed!important;left:12px!important;right:12px!important;bottom:calc(10px + env(safe-area-inset-bottom))!important;z-index:9999!important;box-sizing:border-box!important;display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:5px!important;padding:5px!important;background:rgba(255,255,255,.98)!important;border:1px solid #d6e1e7!important;border-radius:20px!important;box-shadow:0 12px 34px rgba(16,42,66,.18)!important;overflow:hidden!important;backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important}
        .mobile-contact-bar a,.mobile-contact-bar button{box-sizing:border-box!important;min-width:0!important;height:72px!important;min-height:72px!important;margin:0!important;padding:8px 5px!important;border:0!important;border-radius:15px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important;color:#fff!important;text-decoration:none!important;font:inherit!important;box-shadow:0 4px 10px rgba(16,42,66,.08)!important;overflow:hidden!important}
        .mobile-contact-bar a:first-child{background:#1688e8!important}.mobile-contact-bar a:nth-child(2){background:#06c755!important}.mobile-contact-bar a:nth-child(3){background:#ff7418!important}
        .mobile-contact-bar .qcf-icon{width:25px!important;height:25px!important;flex:0 0 25px!important}
        .mobile-contact-bar .qcf-line-mark{width:27px!important;height:23px!important;flex:0 0 27px!important}
        .qcf-mobile-copy{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:2px!important;line-height:1!important}
        .qcf-mobile-copy b{display:block!important;color:#fff!important;font-size:14px!important;font-weight:950!important;line-height:1.05!important;letter-spacing:.02em!important}
        .qcf-mobile-copy small{display:block!important;color:rgba(255,255,255,.9)!important;font-size:8px!important;font-weight:700!important;line-height:1!important;white-space:nowrap!important}
        body:not([data-page="admin"]){padding-bottom:calc(94px + env(safe-area-inset-bottom))!important}
      }
    `;
    document.head.appendChild(style);

    const run=()=>{
      transformDesktop(document.querySelector('.quick-contact'));
      transformMobile(document.querySelector('.mobile-contact-bar'));
    };
    run();
    const observer=new MutationObserver(()=>{
      run();
      if(document.querySelector('.quick-contact[data-qcf-built="1"]')&&document.querySelector('.mobile-contact-bar[data-qcf-built="1"]'))observer.disconnect();
    });
    observer.observe(document.body,{childList:true,subtree:true});
    setTimeout(run,120);setTimeout(run,500);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
