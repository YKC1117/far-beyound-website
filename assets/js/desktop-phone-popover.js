(function(){
  'use strict';
  if(window.__fbDesktopPhonePopover) return;
  window.__fbDesktopPhonePopover=true;

  const FALLBACK_PHONES=[
    {label:'新北辦公室',display:'02-82217759',tel:'0282217759'},
    {label:'台南辦公室',display:'06-2360139',tel:'062360139'}
  ];
  let repairQueued=false;

  function normalizeLabel(raw=''){
    const label=String(raw||'').trim();
    if(!label)return '辦公室';
    if(label==='台北'||label==='台北辦公室'||label==='新北')return '新北辦公室';
    if(label==='台南')return '台南辦公室';
    return /辦公室|總公司|分公司|服務處/.test(label)?label:`${label}辦公室`;
  }

  function currentPhones(){
    try{
      const rows=window.FBStore?.getData?.()?.site?.phones;
      if(Array.isArray(rows)&&rows.length){
        return rows.filter(p=>p&&p.value).map(p=>({
          label:normalizeLabel(p.label),
          display:String(p.value||'').trim(),
          tel:String(p.value||'').replace(/[^0-9+]/g,'')
        })).filter(p=>p.tel);
      }
    }catch(_){ }
    return FALLBACK_PHONES;
  }

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
        .quick-contact-item[data-back-top] .quick-contact-btn b{font-size:19px;line-height:1;font-weight:700}
      }
      @media(max-width:980px){#fbDesktopPhonePopover{display:none!important}}
    `;
    document.head.appendChild(s);
  }

  function ensurePopover(){
    let pop=document.getElementById('fbDesktopPhonePopover');
    if(!pop){
      pop=document.createElement('div');
      pop.id='fbDesktopPhonePopover';
      pop.setAttribute('role','dialog');
      pop.setAttribute('aria-label','電話聯絡');
      pop.setAttribute('aria-hidden','true');
      document.body.appendChild(pop);
    }
    const phones=currentPhones();
    const sig=JSON.stringify(phones);
    if(pop.dataset.phoneSignature!==sig){
      pop.dataset.phoneSignature=sig;
      pop.innerHTML=`<span class="fb-phone-title">請選擇辦公室</span>${phones.map(p=>`<a href="tel:${p.tel}"><span>${p.label}</span><b>${p.display}</b></a>`).join('')}`;
    }
    return pop;
  }

  function tagPhoneItem(){
    const rail=document.querySelector('.quick-contact');
    if(!rail)return null;
    let item=rail.querySelector('.quick-contact-item[data-contact-phone]');
    if(!item){
      item=[...rail.querySelectorAll('.quick-contact-item')].find(x=>x.querySelector('button.quick-contact-btn')&&!x.hasAttribute('data-back-top'))||null;
      if(item)item.setAttribute('data-contact-phone','');
    }
    const btn=item?.querySelector('.quick-contact-btn');
    if(btn){
      btn.setAttribute('aria-controls','fbDesktopPhonePopover');
      if(!btn.hasAttribute('aria-expanded'))btn.setAttribute('aria-expanded','false');
      btn.setAttribute('aria-label','電話聯絡');
    }
    return item;
  }

  function ensureBackTop(){
    const rail=document.querySelector('.quick-contact');
    if(!rail||rail.querySelector('[data-back-top]'))return;
    document.querySelectorAll('.back-top').forEach(x=>x.remove());
    const item=document.createElement('div');
    item.className='quick-contact-item';
    item.setAttribute('data-back-top','');
    item.innerHTML='<button type="button" class="quick-contact-btn" aria-label="返回頁首" title="返回頁首"><b aria-hidden="true">↑</b><span>TOP</span></button>';
    item.querySelector('button').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
    rail.appendChild(item);
  }

  function ensureMobilePhone(){
    const mobile=document.getElementById('fbMobileQuick');
    if(!mobile)return;
    mobile.classList.add('mobile-contact-bar');
    mobile.setAttribute('aria-label','快速聯絡');
    let phoneBtn=mobile.querySelector('[data-mobile-phone]');
    if(!phoneBtn){
      const phoneLink=[...mobile.querySelectorAll('a[href^="tel:"]')][0];
      if(phoneLink){
        const btn=document.createElement('button');
        btn.type='button';
        btn.dataset.mobilePhone='';
        btn.innerHTML=phoneLink.innerHTML;
        btn.setAttribute('aria-expanded','false');
        btn.setAttribute('aria-controls','fbCompatMobilePhonePanel');
        phoneLink.replaceWith(btn);
        phoneBtn=btn;
      }
    }
    if(!phoneBtn)return;
    let panel=document.getElementById('fbCompatMobilePhonePanel');
    if(!panel){
      panel=document.createElement('div');
      panel.id='fbCompatMobilePhonePanel';
      panel.className='mobile-contact-phone';
      document.body.appendChild(panel);
    }
    const phones=currentPhones();
    const sig=JSON.stringify(phones);
    if(panel.dataset.phoneSignature!==sig){
      panel.dataset.phoneSignature=sig;
      panel.innerHTML=phones.map(p=>`<a href="tel:${p.tel}"><span>${p.label}</span><b>${p.display}</b></a>`).join('');
    }
    if(phoneBtn.dataset.compatBound!=='1'){
      phoneBtn.dataset.compatBound='1';
      phoneBtn.addEventListener('click',e=>{
        e.preventDefault();
        e.stopPropagation();
        const open=!panel.classList.contains('is-open');
        panel.classList.toggle('is-open',open);
        phoneBtn.setAttribute('aria-expanded',open?'true':'false');
      });
    }
  }

  function phoneButton(){
    tagPhoneItem();
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

  function repair(){
    repairQueued=false;
    if(document.body?.dataset?.page==='admin')return;
    addStyle();
    ensurePopover();
    tagPhoneItem();
    ensureBackTop();
    ensureMobilePhone();
  }

  function queueRepair(){
    if(repairQueued)return;
    repairQueued=true;
    setTimeout(repair,0);
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
      const mobileBtn=e.target.closest?.('[data-mobile-phone]');
      const mobilePanel=e.target.closest?.('#fbCompatMobilePhonePanel');
      if(mobileBtn||mobilePanel)return;
      const pop=e.target.closest?.('#fbDesktopPhonePopover');
      if(pop){
        e.stopPropagation();
        return;
      }
      if(isOpen()) setOpen(false);
      const panel=document.getElementById('fbCompatMobilePhonePanel');
      const mb=document.querySelector('[data-mobile-phone]');
      if(panel?.classList.contains('is-open')){
        panel.classList.remove('is-open');
        mb?.setAttribute('aria-expanded','false');
      }
    },true);

    document.addEventListener('keydown',e=>{
      if(e.key!=='Escape')return;
      setOpen(false);
      const panel=document.getElementById('fbCompatMobilePhonePanel');
      panel?.classList.remove('is-open');
      document.querySelector('[data-mobile-phone]')?.setAttribute('aria-expanded','false');
    });
    window.addEventListener('resize',()=>{if(!window.matchMedia('(min-width:981px)').matches)setOpen(false)});
  }

  function observe(){
    if(window.__fbDesktopPhoneCompatObserver||!document.body)return;
    window.__fbDesktopPhoneCompatObserver=true;
    new MutationObserver(ms=>{
      if(ms.some(m=>m.type==='childList'))queueRepair();
    }).observe(document.body,{childList:true,subtree:true});
  }

  function run(){
    if(document.body?.dataset?.page==='admin')return;
    repair();
    bind();
    observe();
  }

  document.addEventListener('DOMContentLoaded',()=>{run();[120,350,800,1600,2600].forEach(t=>setTimeout(repair,t))});
  if(document.readyState!=='loading'){setTimeout(run,0);[150,700,1500].forEach(t=>setTimeout(repair,t))}
  window.addEventListener('farbeyound:datachange',()=>setTimeout(repair,120));
})();
