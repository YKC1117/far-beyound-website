(function(){
  if(window.__fbContactYoutubeUpgrade) return;
  window.__fbContactYoutubeUpgrade = true;

  const PHONE_ROWS = [
    {label:'新北辦公室', display:'02-82217759', tel:'0282217759'},
    {label:'台南辦公室', display:'06-2360139', tel:'062360139'}
  ];

  function addStyle(){
    if(document.getElementById('fbContactYoutubeUpgradeStyle')) return;
    const style=document.createElement('style');
    style.id='fbContactYoutubeUpgradeStyle';
    style.textContent=`
      .footer-media-link{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 0;border-top:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12);text-decoration:none;color:inherit}
      .footer-media-copy{display:flex;align-items:center;gap:12px;min-width:0}.footer-media-icon{width:36px;height:36px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.24);border-radius:50%}.footer-media-icon svg{width:19px;height:19px;fill:currentColor}.footer-media-copy small{display:block;font-size:10px;letter-spacing:.12em;opacity:.68;margin-bottom:3px}.footer-media-copy b{display:block;font-size:13px}.footer-media-arrow{font-size:12px;font-weight:700;white-space:nowrap;opacity:.78}.footer-media-link:hover .footer-media-arrow{opacity:1}
      @media(max-width:680px){.footer-media-link{padding:16px 0}.footer-media-arrow{font-size:11px}}
    `;
    document.head.appendChild(style);
  }

  function upgradeMobilePhone(){
    const oldBtn=document.querySelector('[data-mobile-phone]');
    const panel=document.querySelector('.mobile-contact-phone');
    if(!oldBtn || !panel || oldBtn.dataset.clickPanelReady==='1') return;

    const btn=oldBtn.cloneNode(true);
    btn.dataset.clickPanelReady='1';
    oldBtn.replaceWith(btn);
    panel.id='mobilePhonePanel';
    panel.innerHTML=PHONE_ROWS.map(p=>`<a href="tel:${p.tel}"><span>${p.label}</span><b>${p.display}</b></a>`).join('');
    btn.setAttribute('aria-controls',panel.id);
    btn.setAttribute('aria-expanded','false');

    const close=()=>{panel.classList.remove('is-open');btn.setAttribute('aria-expanded','false')};
    btn.addEventListener('click',e=>{
      e.preventDefault();
      e.stopPropagation();
      const open=!panel.classList.contains('is-open');
      close();
      if(open){panel.classList.add('is-open');btn.setAttribute('aria-expanded','true')}
    });
    panel.addEventListener('click',e=>e.stopPropagation());
    document.addEventListener('click',close);
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  }

  function addYoutubeFooter(){
    const url=String(window.FBSocialLinks?.youtube || '').trim();
    if(!url || document.querySelector('.footer-media-link')) return;
    const footer=document.querySelector('footer');
    if(!footer) return;
    const target=footer.querySelector('.footer-bottom') || footer.lastElementChild;
    if(!target) return;

    const wrap=document.createElement('div');
    wrap.className='container footer-media-wrap';
    wrap.innerHTML=`<a class="footer-media-link" href="${url.replace(/"/g,'&quot;')}" target="_blank" rel="noopener" aria-label="萬里資訊 YouTube 頻道（另開新視窗）"><span class="footer-media-copy"><span class="footer-media-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21.2 7.1a2.8 2.8 0 0 0-2-2C17.4 4.6 12 4.6 12 4.6s-5.4 0-7.2.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.3 12a29 29 0 0 0 .5 4.9 2.8 2.8 0 0 0 2 2c1.8.5 7.2.5 7.2.5s5.4 0 7.2-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-4.9 29 29 0 0 0-.5-4.9ZM10 15.2V8.8l5.5 3.2L10 15.2Z"/></svg></span><span><small>VIDEO CHANNEL</small><b>萬里資訊 YouTube</b></span></span><span class="footer-media-arrow">前往影音頻道 →</span></a>`;
    target.parentNode.insertBefore(wrap,target);
  }

  function run(){
    addStyle();
    upgradeMobilePhone();
    addYoutubeFooter();
  }

  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,120);setTimeout(run,600)});
  if(document.readyState!=='loading')setTimeout(run,0);
})();
