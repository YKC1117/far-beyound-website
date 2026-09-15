(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminMobileCms)return;
  window.__fbAdminMobileCms=true;

  const $=(s,p=document)=>p.querySelector(s);
  const $$=(s,p=document)=>[...p.querySelectorAll(s)];
  const mq=window.matchMedia('(max-width:820px)');

  function currentLabel(){
    const active=$('.admin-nav a.active');
    if(active?.textContent?.trim())return active.textContent.trim();
    const bar=$('#adminWorkspaceCurrent b');
    if(bar?.textContent)return bar.textContent.replace(/^目前：/,'').trim();
    return '網站管理';
  }

  function saveText(){
    return $('#adminSaveState')?.textContent?.trim()||'目前無未儲存變更';
  }

  function refreshMobileBar(){
    const title=$('#amcMobileTitle b'),state=$('#amcMobileTitle small'),box=$('#amcMobileTitle');
    if(title)title.textContent=currentLabel();
    if(state)state.textContent=saveText();
    box?.classList.toggle('dirty',/未儲存|變更/.test(saveText())&&!/無未儲存/.test(saveText()));
  }

  function closeNav(){
    document.body.classList.remove('admin-mobile-nav-open');
    $('#amcMobileMenu')?.setAttribute('aria-expanded','false');
  }

  function openNav(){
    if(!mq.matches)return;
    document.body.classList.add('admin-mobile-nav-open');
    $('#amcMobileMenu')?.setAttribute('aria-expanded','true');
  }

  function toggleNav(){
    document.body.classList.contains('admin-mobile-nav-open')?closeNav():openNav();
  }

  function buildMobileChrome(){
    if($('#amcMobileBar'))return;
    const bar=document.createElement('div');
    bar.id='amcMobileBar';
    bar.className='amc-mobile-bar';
    bar.innerHTML='<button id="amcMobileMenu" class="amc-mobile-menu" type="button" aria-expanded="false" aria-controls="adminMobileNav"><i>☰</i><span>功能</span></button><div id="amcMobileTitle" class="amc-mobile-title"><b>網站管理</b><small>目前無未儲存變更</small></div><a class="amc-mobile-preview" href="index.html" target="_blank" rel="noopener noreferrer">前台</a>';
    const backdrop=document.createElement('button');
    backdrop.type='button';
    backdrop.id='amcMobileBackdrop';
    backdrop.className='amc-mobile-backdrop';
    backdrop.setAttribute('aria-label','關閉功能選單');
    document.body.prepend(backdrop);
    document.body.prepend(bar);
    const side=$('.admin-side');
    if(side)side.id=side.id||'adminMobileNav';
    $('#amcMobileMenu').addEventListener('click',toggleNav);
    backdrop.addEventListener('click',closeNav);
    $$('.admin-nav a').forEach(a=>a.addEventListener('click',()=>{if(mq.matches)setTimeout(closeNav,40)}));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav()});
    refreshMobileBar();
  }

  function cardize(table){
    if(!table)return;
    const headers=$$('thead th',table).map(th=>th.textContent.trim());
    $$('tbody tr',table).forEach(row=>{
      [...row.cells].forEach((cell,i)=>{
        cell.dataset.adminLabel=headers[i]||`欄位 ${i+1}`;
      });
    });
  }

  function cardizeTables(){
    cardize($('#products .admin-table'));
    cardize($('#adminInquiries .admin-table'));
  }

  function decorateLinks(){
    $$('#adminInquiries a[href^="mailto:"]').forEach(a=>{
      a.setAttribute('title','點一下直接寄信');
      a.setAttribute('rel','noopener');
    });
  }

  function enhanceProductTools(){
    const tools=$('#products .admin-product-tools');
    if(!tools||tools.dataset.mobileCmsReady)return;
    tools.dataset.mobileCmsReady='1';
    const search=$('#adminProductSearch');
    if(search){search.setAttribute('enterkeyhint','search');search.setAttribute('autocomplete','off')}
    const btn=$('#newProductBtn');
    if(btn)btn.textContent='＋ 新增產品';
  }

  function enhanceInquiryTools(){
    const tools=$('#adminInquiries .admin-product-tools');
    if(!tools||tools.dataset.mobileCmsReady)return;
    tools.dataset.mobileCmsReady='1';
    const search=$('#inquirySearch');
    if(search){search.setAttribute('enterkeyhint','search');search.setAttribute('autocomplete','off')}
  }

  function applyMode(){
    document.body.classList.toggle('admin-mobile-cms',mq.matches);
    if(!mq.matches)closeNav();
    refreshMobileBar();
  }

  function observe(){
    const root=$('.admin-main')||document.body;
    let timer=0;
    const mo=new MutationObserver(()=>{
      clearTimeout(timer);
      timer=setTimeout(()=>{
        cardizeTables();
        decorateLinks();
        enhanceProductTools();
        enhanceInquiryTools();
        refreshMobileBar();
      },80);
    });
    mo.observe(root,{childList:true,subtree:true,attributes:true,attributeFilter:['class','hidden']});
    const state=$('#adminSaveState');
    if(state)new MutationObserver(refreshMobileBar).observe(state,{childList:true,characterData:true,subtree:true,attributes:true});
  }

  function init(){
    buildMobileChrome();
    applyMode();
    cardizeTables();
    decorateLinks();
    enhanceProductTools();
    enhanceInquiryTools();
    observe();
    mq.addEventListener?.('change',applyMode);
    window.addEventListener('resize',applyMode,{passive:true});
    window.addEventListener('hashchange',()=>setTimeout(refreshMobileBar,60));
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();
