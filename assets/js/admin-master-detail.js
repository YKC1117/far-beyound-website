(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminMasterDetail)return;
  window.__fbAdminMasterDetail=true;

  const $=(s,p=document)=>p.querySelector(s);
  const $$=(s,p=document)=>[...p.querySelectorAll(s)];
  const KEY='farbeyoundAdminWorkspaceV1';
  const GROUP_KEY='farbeyoundAdminNavGroupV1';

  const WORKSPACES=[
    {id:'adminAnalytics',label:'SEO／Ads／AI 成效',group:'common'},
    {id:'adminInquiries',label:'網站詢問',group:'common'},
    {id:'products',label:'產品管理',group:'common'},
    {id:'homeHeroAdmin',label:'首頁管理',group:'content'},
    {id:'adminFrontFeatureManager',label:'前台功能／版面',group:'content'},
    {id:'siteControlAdmin',label:'首頁版面／開關',group:'content'},
    {id:'adminBrandManager',label:'品牌管理',group:'content'},
    {id:'adminLocationManager',label:'服務據點',group:'content'},
    {id:'contentControlAdmin',label:'網站文字／SEO',group:'content'},
    {id:'siteStructureAdmin',label:'內頁／分類',group:'content'},
    {id:'adminExtended',label:'消息／案例／公司資料',group:'content'},
    {id:'resourceAdmin',label:'下載／系統方案',group:'content'},
    {id:'adminSecurityCenter',label:'系統安全',group:'system'},
    {id:'adminBackupCenter',label:'備份／還原',group:'system'},
    {id:'adminHistory',label:'異動紀錄',group:'system'},
    {id:'adminMaintenance',label:'系統維護',group:'system'}
  ];

  const GROUPS=[
    {key:'common',label:'常用',desc:'成效、詢問、產品'},
    {key:'content',label:'網站內容',desc:'首頁、品牌、據點、文字'},
    {key:'system',label:'系統管理',desc:'安全、備份、紀錄'}
  ];

  function style(){
    if($('#adminMasterDetailStyle'))return;
    const s=document.createElement('style');
    s.id='adminMasterDetailStyle';
    s.textContent=`
      body.admin-workspace-mode .admin-main{max-width:100%}
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
      .amd-current{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 14px;padding:11px 13px;border:1px solid #dce7ec;border-radius:12px;background:#f8fbfc;color:#526b78;font-size:10px}
      .amd-current b{color:#2d5063;font-size:11px}.amd-current button{flex:none;min-height:30px;padding:0 9px;border:1px solid #d5e1e6;border-radius:8px;background:#fff;color:#526b78;font-size:9px;font-weight:900;cursor:pointer}
      .amd-simple-nav{display:grid;gap:7px;margin-top:8px}.amd-simple-home{display:flex!important;margin-bottom:2px!important;background:rgba(255,255,255,.055)!important;border:1px solid rgba(255,255,255,.08)}.amd-simple-home.active{background:#fff!important;color:#143047!important}
      .amd-nav-group{border:1px solid rgba(255,255,255,.09);border-radius:11px;overflow:hidden;background:rgba(255,255,255,.025)}
      .amd-nav-group-btn{width:100%;min-height:44px;padding:9px 11px;border:0;background:transparent;color:#eef6fa;display:flex;align-items:center;justify-content:space-between;gap:9px;text-align:left;cursor:pointer}
      .amd-nav-group-btn>span:first-child{display:grid;gap:1px}.amd-nav-group-btn b{font-size:12px}.amd-nav-group-btn small{color:#86a7ba;font-size:9px;font-weight:600}.amd-nav-group-btn i{font-style:normal;color:#8fb1c7;font-size:16px}
      .amd-nav-items{display:none;padding:0 5px 6px}.amd-nav-group.open .amd-nav-items{display:grid;gap:3px}.amd-nav-group.open .amd-nav-group-btn{background:rgba(255,255,255,.05)}
      .amd-nav-items .admin-nav-section{display:none!important}.amd-nav-items a{min-height:38px!important;padding:7px 9px!important;font-size:11px!important;color:#c8dbe6!important}.amd-nav-items a.active{color:#143047!important}
      .admin-nav> .admin-nav-section:not(#adminQuickNavSection),#adminQuickNavSection{display:none!important}
      @media(max-width:780px){.amd-current{align-items:flex-start;flex-direction:column}.amd-current button{width:100%}.amd-simple-nav{margin-top:6px}}
    `;
    document.head.appendChild(s);
  }

  function allExisting(){return WORKSPACES.map(x=>document.getElementById(x.id)).filter(Boolean)}
  function itemFor(id){return WORKSPACES.find(x=>x.id===id)}

  function setNavActive(id){
    $$('.admin-nav a').forEach(a=>a.classList.remove('active'));
    if(id==='home'){$('#adminWorkspaceHomeLink')?.classList.add('active');return}
    $(`.admin-nav a[href="#${CSS.escape(id)}"]`)?.classList.add('active');
  }

  function openGroup(key,save=true){
    $$('.amd-nav-group').forEach(group=>{
      const open=group.dataset.group===key;
      group.classList.toggle('open',open);
      group.querySelector('.amd-nav-group-btn')?.setAttribute('aria-expanded',open?'true':'false');
      const icon=group.querySelector('.amd-nav-group-btn i');
      if(icon)icon.textContent=open?'−':'＋';
    });
    if(save&&key)localStorage.setItem(GROUP_KEY,key);
  }

  function currentBar(id){
    let bar=$('#adminWorkspaceCurrent');
    if(!bar){
      bar=document.createElement('div');
      bar.id='adminWorkspaceCurrent';
      bar.className='amd-current';
      $('.admin-top')?.insertAdjacentElement('afterend',bar);
    }
    if(!bar)return;
    if(id==='home'){
      bar.innerHTML='<div><b>目前：管理總覽</b><div>左側先選分類，再選功能；右側只顯示正在使用的內容。</div></div>';
      return;
    }
    const item=itemFor(id);
    bar.innerHTML=`<div><b>目前：${item?.label||id}</b><div>只顯示目前功能，其他管理內容暫時隱藏。</div></div><button type="button" data-amd-home>返回總覽</button>`;
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
    const item=itemFor(id);
    if(item?.group)openGroup(item.group);
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
    a.className='amd-simple-home';
    a.textContent='管理總覽';
    label.insertAdjacentElement('afterend',a);
    a.addEventListener('click',e=>{e.preventDefault();activate('home')});
  }

  function simpleSidebar(){
    const nav=$('.admin-nav'),label=$('.admin-nav-label',nav||document);
    if(!nav||!label)return false;
    let simple=$('#amdSimpleNav');
    if(!simple){
      simple=document.createElement('div');
      simple.id='amdSimpleNav';
      simple.className='amd-simple-nav';
      label.insertAdjacentElement('afterend',simple);
      const home=$('#adminWorkspaceHomeLink');
      if(home)simple.appendChild(home);
      GROUPS.forEach(group=>{
        const box=document.createElement('div');
        box.className='amd-nav-group';
        box.dataset.group=group.key;
        box.innerHTML=`<button type="button" class="amd-nav-group-btn" aria-expanded="false"><span><b>${group.label}</b><small>${group.desc}</small></span><i>＋</i></button><div class="amd-nav-items"></div>`;
        simple.appendChild(box);
        box.querySelector('.amd-nav-group-btn').addEventListener('click',()=>openGroup(group.key));
      });
    }

    WORKSPACES.forEach(item=>{
      const link=nav.querySelector(`a[href="#${CSS.escape(item.id)}"]`);
      const target=simple.querySelector(`.amd-nav-group[data-group="${item.group}"] .amd-nav-items`);
      if(link&&target&&link.parentElement!==target)target.appendChild(link);
    });

    const saved=localStorage.getItem(GROUP_KEY)||'common';
    if(!simple.querySelector('.amd-nav-group.open'))openGroup(GROUPS.some(g=>g.key===saved)?saved:'common',false);
    return true;
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

  function run(){style();sidebarHome();simpleSidebar();initial()}
  intercept();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  setTimeout(()=>{sidebarHome();simpleSidebar();initial()},900);
  setTimeout(()=>simpleSidebar(),1800);

  window.FBAdminWorkspace={open:id=>activate(id),home:()=>activate('home')};
})();