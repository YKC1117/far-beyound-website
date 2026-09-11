(function(){
  'use strict';
  if(window.__fbDesktopPhonePopover) return;
  window.__fbDesktopPhonePopover=true;

  const phones=[
    {label:'新北辦公室',display:'02-82217759',tel:'0282217759'},
    {label:'台南辦公室',display:'06-2360139',tel:'062360139'}
  ];

  function addStyle(){
    if(document.getElementById('fbDesktopPhonePopoverStyle')) return;
    const s=document.createElement('style');
    s.id='fbDesktopPhonePopoverStyle';
    s.textContent=`
      @media(min-width:981px){
        .quick-contact-item[data-contact-phone] .quick-phone-panel{display:none!important}
        #fbDesktopPhonePopover{position:fixed;right:72px;top:52%;z-index:9998;width:238px;background:#fff;border:1px solid #dce4e9;border-radius:10px;padding:10px;box-shadow:0 18px 48px rgba(17,43,66,.22);opacity:0;visibility:hidden;pointer-events:none;transform:translate(10px,-50%);transition:opacity .16s ease,transform .16s ease,visibility .16s ease}
        #fbDesktopPhonePopover.is-open{opacity:1;visibility:visible;pointer-events:auto;transform:translate(0,-50%)}
        #fbDesktopPhonePopover:after{content:'';position:absolute;right:-6px;top:50%;width:11px;height:11px;background:#fff;border-top:1px solid #dce4e9;border-right:1px solid #dce4e9;transform:translateY(-50%) rotate(45deg)}
        #fbDesktopPhonePopover .fb-phone-title{display:block;padding:3px 8px 9px;color:#6e7f8d;font-size:12px;font-weight:700;letter-spacing:.04em}
        #fbDesktopPhonePopover a{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 9px;border-top:1px solid #edf1f3;color:#17324d;text-decoration:none;border-radius:5px}
        #fbDesktopPhonePopover a:hover{background:#f4f8f9}
        #fbDesktopPhonePopover a span{font-size:11px;color:#71808d}
        #fbDesktopPhonePopover a b{font-size:14px;font-variant-numeric:tabular-nums}
      }
      @media(max-width:980px){#fbDesktopPhonePopover{display:none!important}}
    `;
    document.head.appendChild(s);
  }

  function ensurePopover(){
    let pop=document.getElementById('fbDesktopPhonePopover');
    if(pop) return pop;
    pop=document.createElement('div');
    pop.id='fbDesktopPhonePopover';
    pop.setAttribute('role','dialog');
    pop.setAttribute('aria-label','電話聯絡');
    pop.setAttribute('aria-hidden','true');
    pop.innerHTML=`<span class="fb-phone-title">請選擇辦公室</span>${phones.map(p=>`<a href="tel:${p.tel}"><span>${p.label}</span><b>${p.display}</b></a>`).join('')}`;
    document.body.appendChild(pop);
    return pop;
  }

  function phoneButton(){
    return document.querySelector('.quick-contact-item[data-contact-phone] .quick-contact-btn');
  }

  function setOpen(open){
    const pop=ensurePopover();
    const btn=phoneButton();
    pop.classList.toggle('is-open',open);
    pop.setAttribute('aria-hidden',open?'false':'true');
    if(btn) btn.setAttribute('aria-expanded',open?'true':'false');
  }

  function isOpen(){
    return ensurePopover().classList.contains('is-open');
  }

  function bind(){
    if(window.__fbDesktopPhonePopoverBound) return;
    window.__fbDesktopPhonePopoverBound=true;

    document.addEventListener('click',function(e){
      const btn=e.target.closest?.('.quick-contact-item[data-contact-phone] .quick-contact-btn');
      if(btn && window.matchMedia('(min-width:981px)').matches){
        e.preventDefault();
        e.stopImmediatePropagation();
        setOpen(!isOpen());
        return;
      }
      const pop=e.target.closest?.('#fbDesktopPhonePopover');
      if(pop){
        e.stopPropagation();
        return;
      }
      if(isOpen()) setOpen(false);
    },true);

    document.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});
    window.addEventListener('resize',()=>{if(!window.matchMedia('(min-width:981px)').matches)setOpen(false)});
  }

  function run(){
    addStyle();
    ensurePopover();
    bind();
    const btn=phoneButton();
    if(btn){
      btn.setAttribute('aria-controls','fbDesktopPhonePopover');
      if(!isOpen()) btn.setAttribute('aria-expanded','false');
    }
  }

  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,100);setTimeout(run,500)});
  if(document.readyState!=='loading') setTimeout(run,0);
})();
