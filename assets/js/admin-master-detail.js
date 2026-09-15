(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminMasterDetail)return;
  window.__fbAdminMasterDetail=true;

  const $=(s,p=document)=>p.querySelector(s);
  const $$=(s,p=document)=>[...p.querySelectorAll(s)];
  const KEY='farbeyoundAdminWorkspaceV1';

  const WORKSPACES=[
    {id:'adminAnalytics',label:'SEO／Ads／AI 成效'},
    {id:'adminInquiries',label:'網站詢問'},
    {id:'products',label:'產品管理'},
    {id:'homeHeroAdmin',label:'首頁管理'},
    {id:'adminFrontFeatureManager',label:'前台功能／版面'},
    {id:'siteControlAdmin',label:'首頁版面／開關'},
    {id:'adminBrandManager',label:'品牌管理'},
    {id:'adminLocationManager',label:'服務據點'},
    {id:'contentControlAdmin',label:'網站文字／SEO'},
    {id:'siteStructureAdmin',label:'內頁／分類'},
    {id:'adminExtended',label:'消息／案例／公司資料'},
    {id:'resourceAdmin',label:'下載／系統方案'},
    {id:'adminSecurityCenter',label:'系統安全'},
    {id:'adminBackupCenter',label:'備份／還原'},
    {id:'adminHistory',label:'異動紀錄'},
    {id:'adminMaintenance',label:'系統維護'}
  ];

  function style(){
    if($('#adminMasterDetailStyle'))return;
    const s=document.createElement('style');
    s.id='adminMasterDetailStyle';
    s.textContent=`
      body.admin-workspace-mode .admin-main{max-width:100%;}
      body.admin-workspace-mode .admin-dashboard,
      body.admin-workspace-mode #adminFriendlyStatus,
      body.admin-workspace-mode #adminUpdateLog,
      body.admin-workspace-mode #adminBackupStatus,
      body.admin-workspace-mode #adminCurrentFocus{display:none!important}
      body.admin-workspace-mode.admin-workspace-home .admin-dashboard,
      body.admin-workspace-mode.admin-workspace-home #adminFriendlyStatus,
      body.admin-workspace-mode.admin-workspace-home #adminUpdateLog,
      body.admin-workspace-mode.admin-workspace-home #adminBackupStatus,
      body.admin-workspace-mode.admin-workspace-home #adminCurrentFocus{display:block!important}
      body.admin-workspace-mode .admin-workspace-hidden{display:none!important}
      body.admin-workspace-mode .admin-workspace-active{display:block!important;margin-top:0!important}
      body.admin-workspace-mode .admin-section-jump{display:none!important}
      .amd-home-link{margin-bottom:4px!important;background:rgba(255,255,255,.055)!important;border:1px solid rgba(255,255,255,.08)}
      .amd-home-link.active{background:#fff!important;color:#143047!important}
      .amd-current{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 14px;padding:11px 13px;border:1px solid #dce7ec;border-radius:12px;background:#f8fbfc;color:#526b78;font-size:10px}
      .amd-current b{color:#2d5063;font-size:11px}.amd-current button{flex:none;min-height:30px;padding:0 9px;border:1px solid #d5e1e6;border-radius:8px;background:#fff;color:#526b78;font-size:9px;font-weight:900;cursor:pointer}
      @media(max-width:780px){.amd-current{align-items:flex-start;flex-direction:column}.amd-current button{width:100%}}
    `;
    document.head.appendChild(s);
  }

  function allExisting(){return WORKSPACES.map(x=>document.getElementById(x.id)).filter(Boolean)}

  function setNavActive(id){
    $$('.admin-nav a').forEach(a=>a.classList.remove('active'));
    if(id==='home'){$('#adminWorkspaceHomeLink')?.classList.add('active');return}
    const link=$(`.admin-nav a[href="#${CSS.escape(id)}"]`);
    link?.classList.add('active');
  }

  function currentBar(id){
    let bar=$('#adminWorkspaceCurrent');
    if(!bar){
      bar=document.createElement('div');
      bar.id='adminWorkspaceCurrent';
      bar.className='amd-current';
      const anchor=$('.admin-top');
      anchor?.insertAdjacentElement('afterend',bar);
    }
    if(!bar)return;
    if(id==='home'){
      bar.innerHTML='<div><b>目前：管理總覽</b><div>從左側選單選一個功能，右側只顯示該工作區。</div></div>';
      return;
    }
    const item=WORKSPACES.find(x=>x.id===id);
    bar.innerHTML=`<div><b>目前：${item?.label||id}</b><div>右側只顯示這個管理區，減少整頁往下捲動。</div></div><button type="button" data-amd-home>返回總覽</button>`;
    bar.querySelector('[data-amd-home]')?.addEventListener('click',()=>activate('home',{pushHash:false}));
  }

  function activate(id,{pushHash=true}={}){
    document.body.classList.add('admin-workspace-mode');
    document.body.classList.toggle('admin-workspace-home',id==='home');
    allExisting().forEach(el=>{
      const active=id!=='home'&&el.id===id;
      el.classList.toggle('admin-workspace-active',active);
      el.classList.toggle('admin-workspace-hidden',!active);
      if(active){
        el.classList.remove('is-group-folded');
        const panel=el.matches('.admin-panel')?el:el.querySelector(':scope > .admin-panel');
        if(panel?.classList.contains('is-folded'))panel.querySelector('.admin-fold-btn')?.click();
        if(el.tagName==='DETAILS')el.open=true;
      }
    });
    setNavActive(id);
    currentBar(id);
    localStorage.setItem(KEY,id);
    if(pushHash){
      if(id==='home')history.replaceState(null,'',location.pathname+location.search);
      else history.replaceState(null,'',`#${id}`);
    }
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function sidebarHome(){
    const nav=$('.admin-nav'),label=$('.admin-nav-label',nav||document);
    if(!nav||!label||$('#adminWorkspaceHomeLink'))return;
    const a=document.createElement('a');
    a.id='adminWorkspaceHomeLink';
    a.href='#';
    a.className='amd-home-link';
    a.textContent='管理總覽';
    label.insertAdjacentElement('afterend',a);
    a.addEventListener('click',e=>{e.preventDefault();activate('home')});
  }

  function intercept(){
    document.addEventListener('click',e=>{
      const quick=e.target.closest('.aqf-item[data-id]');
      if(quick?.dataset.id){activate(quick.dataset.id);return}
      const a=e.target.closest('a[href^="#"]');
      if(!a)return;
      const id=(a.getAttribute('href')||'').slice(1);
      if(!id||!WORKSPACES.some(x=>x.id===id))return;
      e.preventDefault();
      activate(id);
    },true);
  }

  function initial(){
    const hash=(location.hash||'').slice(1);
    const saved=localStorage.getItem(KEY)||'';
    const id=WORKSPACES.some(x=>x.id===hash&&document.getElementById(x.id))?hash:
      WORKSPACES.some(x=>x.id===saved&&document.getElementById(x.id))?saved:'home';
    activate(id,{pushHash:false});
  }

  function run(){style();sidebarHome();initial()}
  intercept();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  setTimeout(()=>{sidebarHome();initial()},900);

  window.FBAdminWorkspace={open:id=>activate(id),home:()=>activate('home')};
})();
