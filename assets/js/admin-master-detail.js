(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminMasterDetail)return;
  window.__fbAdminMasterDetail=true;

  const $=(s,p=document)=>p.querySelector(s);
  const $$=(s,p=document)=>[...p.querySelectorAll(s)];
  const KEY='farbeyoundAdminWorkspaceV2';
  const GROUP_KEY='farbeyoundAdminNavGroupV2';

  const COMPOSITES=[
    {
      id:'adminHomeWorkspace',label:'首頁管理',group:'common',desc:'首屏、首頁區塊與前台快捷功能集中管理',storage:'farbeyoundAdminHomeTabV1',
      tabs:[
        {id:'homeHeroAdmin',label:'首屏／輪播',desc:'首頁第一眼看到的主視覺與輪播'},
        {id:'siteControlAdmin',label:'首頁區塊／開關',desc:'首頁區塊顯示與網站共用功能'},
        {id:'adminFrontFeatureManager',label:'快捷功能／版面',desc:'前台模組、排序與快捷工具'}
      ]
    },
    {
      id:'adminContentWorkspace',label:'網站內容',group:'content',desc:'品牌、據點、文字、內頁與消息集中管理',storage:'farbeyoundAdminContentTabV1',
      tabs:[
        {id:'adminBrandManager',label:'品牌',desc:'品牌入口、分類與排序'},
        {id:'adminLocationManager',label:'服務據點',desc:'電話、地址、營業資訊與顯示'},
        {id:'contentControlAdmin',label:'網站文字／SEO',desc:'網站文字、選單、Footer 與 SEO 基礎設定'},
        {id:'siteStructureAdmin',label:'內頁／分類',desc:'內頁標題、分類與頁面結構'},
        {id:'adminExtended',label:'消息／案例／公司資料',desc:'最新消息、案例與公司基本資料'}
      ]
    }
  ];

  const WORKSPACES=[
    {id:'adminAnalytics',label:'SEO／Ads／AI 成效',group:'common'},
    {id:'adminInquiries',label:'網站詢問',group:'common'},
    {id:'products',label:'產品管理',group:'common'},
    {id:'adminHomeWorkspace',label:'首頁管理',group:'common'},
    {id:'adminContentWorkspace',label:'網站內容',group:'content'},
    {id:'resourceAdmin',label:'下載／系統方案',group:'content'},
    {id:'adminAccessCenter',label:'人員／權限',group:'system'},
    {id:'adminSecurityCenter',label:'系統安全',group:'system'},
    {id:'adminBackupCenter',label:'備份／還原',group:'system'},
    {id:'adminHistory',label:'異動紀錄',group:'system'},
    {id:'adminMaintenance',label:'系統維護',group:'system'}
  ];

  const GROUPS=[
    {key:'common',label:'常用',desc:'成效、詢問、產品、首頁'},
    {key:'content',label:'網站內容',desc:'品牌、據點、內頁與資源'},
    {key:'system',label:'系統管理',desc:'帳號、安全、備份與紀錄'}
  ];

  const ALIAS={};
  COMPOSITES.forEach(group=>group.tabs.forEach(tab=>{ALIAS[tab.id]={parent:group.id,tab:tab.id}}));

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
      .admin-nav a[data-amd-child-link="1"]{display:none!important}
      .amd-composite-workspace{display:none;margin:0;padding:0;background:transparent}
      .amd-composite-head{margin:0 0 12px;padding:15px 16px;border:1px solid #dce7ec;border-radius:14px;background:#fff}
      .amd-composite-head h2{margin:2px 0 4px;color:#294b5d;font-size:20px}.amd-composite-head p{margin:0;color:#718591;font-size:10px;line-height:1.55}
      .amd-tabs{display:flex;gap:7px;flex-wrap:wrap;margin-top:12px}.amd-tab{min-height:36px;padding:0 12px;border:1px solid #d6e2e7;border-radius:9px;background:#fff;color:#526a78;font-size:10px;font-weight:900;cursor:pointer}.amd-tab:hover{background:#f3f8fa;border-color:#bdd1d9}.amd-tab.active{background:#2f6073;border-color:#2f6073;color:#fff;box-shadow:0 5px 14px rgba(47,96,115,.15)}
      .amd-composite-body>.amd-tab-panel{display:none!important;margin-top:0!important}.amd-composite-body>.amd-tab-panel.amd-tab-active{display:block!important}
      .amd-composite-body>.amd-tab-panel.amd-tab-active.admin-panel,.amd-composite-body>.amd-tab-panel.amd-tab-active>.admin-panel{margin-top:0!important}
      @media(max-width:780px){.amd-current{align-items:flex-start;flex-direction:column}.amd-current button{width:100%}.amd-simple-nav{margin-top:6px}.amd-composite-head{padding:13px}.amd-tabs{display:grid;grid-template-columns:1fr 1fr}.amd-tab{width:100%}}
      @media(max-width:480px){.amd-tabs{grid-template-columns:1fr}}
    `;
    document.head.appendChild(s);
  }

  const itemFor=id=>WORKSPACES.find(x=>x.id===id);
  const compositeFor=id=>COMPOSITES.find(x=>x.id===id);
  const workspaceElement=id=>document.getElementById(id);
  const allExisting=()=>WORKSPACES.map(x=>workspaceElement(x.id)).filter(Boolean);

  function ensureWorkspaceLinks(){
    const nav=$('.admin-nav'),preview=$('#adminPreviewGroup');
    if(!nav)return;
    WORKSPACES.forEach(item=>{
      let link=nav.querySelector(`a[href="#${CSS.escape(item.id)}"]`);
      if(!link){
        link=document.createElement('a');
        link.href=`#${item.id}`;
        link.textContent=item.label;
        link.dataset.amdSynthetic='1';
        preview?nav.insertBefore(link,preview):nav.appendChild(link);
      }
      if(link.dataset.amdSynthetic==='1')link.textContent=item.label;
    });
    Object.keys(ALIAS).forEach(id=>{
      nav.querySelectorAll(`a[href="#${CSS.escape(id)}"]`).forEach(a=>a.dataset.amdChildLink='1');
    });
  }

  function openPanel(host){
    if(!host)return;
    host.classList.remove('is-group-folded','admin-workspace-hidden');
    if(host.tagName==='DETAILS')host.open=true;
    const panel=host.matches('.admin-panel')?host:host.querySelector(':scope > .admin-panel');
    if(panel?.classList.contains('is-folded')){
      panel.classList.remove('is-folded');
      const btn=panel.querySelector(':scope > .admin-panel-head .admin-fold-btn');
      if(btn){btn.setAttribute('aria-expanded','true');btn.innerHTML='收合 <span>−</span>'}
    }
  }

  function preferredTab(def){
    const saved=localStorage.getItem(def.storage)||'';
    if(def.tabs.some(x=>x.id===saved&&document.getElementById(x.id)))return saved;
    return def.tabs.find(x=>document.getElementById(x.id))?.id||'';
  }

  function updateCompositeTabs(def,shell){
    const tabs=$('.amd-tabs',shell),body=$('.amd-composite-body',shell);
    if(!tabs||!body)return;
    def.tabs.forEach(tab=>{
      const child=document.getElementById(tab.id);
      if(!child)return;
      child.classList.add('amd-tab-panel');
      child.classList.remove('admin-workspace-active','admin-workspace-hidden');
      if(child.parentElement!==body)body.appendChild(child);
      if(!tabs.querySelector(`[data-amd-tab="${CSS.escape(tab.id)}"]`)){
        const btn=document.createElement('button');
        btn.type='button';btn.className='amd-tab';btn.dataset.amdTab=tab.id;btn.textContent=tab.label;btn.title=tab.desc||tab.label;
        btn.addEventListener('click',()=>activate(def.id,{subtab:tab.id,pushHash:true}));
        tabs.appendChild(btn);
      }
    });
    const active=shell.dataset.activeTab;
    if(!active||!document.getElementById(active))setCompositeTab(def.id,preferredTab(def),false,false);
  }

  function ensureComposite(def){
    const main=$('.admin-main');
    if(!main)return null;
    let shell=document.getElementById(def.id);
    if(!shell){
      shell=document.createElement('section');
      shell.id=def.id;
      shell.className='amd-composite-workspace';
      shell.innerHTML=`<div class="amd-composite-head"><span class="eyebrow">MANAGEMENT WORKSPACE</span><h2>${def.label}</h2><p>${def.desc}</p><div class="amd-tabs" role="tablist" aria-label="${def.label}分類"></div></div><div class="amd-composite-body"></div>`;
      main.appendChild(shell);
    }
    updateCompositeTabs(def,shell);
    return shell;
  }

  function ensureComposites(){COMPOSITES.forEach(ensureComposite)}

  function setCompositeTab(parentId,tabId,save=true,updateBar=true){
    const def=compositeFor(parentId),shell=document.getElementById(parentId);
    if(!def||!shell)return;
    let id=tabId;
    if(!def.tabs.some(x=>x.id===id&&document.getElementById(x.id)))id=preferredTab(def);
    shell.dataset.activeTab=id||'';
    def.tabs.forEach(tab=>{
      const child=document.getElementById(tab.id),btn=shell.querySelector(`[data-amd-tab="${CSS.escape(tab.id)}"]`);
      const active=tab.id===id;
      child?.classList.toggle('amd-tab-active',active);
      if(active)openPanel(child);
      btn?.classList.toggle('active',active);
      btn?.setAttribute('aria-selected',active?'true':'false');
    });
    if(save&&id)localStorage.setItem(def.storage,id);
    if(updateBar&&document.body.classList.contains('admin-workspace-mode')&&shell.classList.contains('admin-workspace-active'))currentBar(parentId,id);
  }

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

  function currentBar(id,subtab=''){
    let bar=$('#adminWorkspaceCurrent');
    if(!bar){bar=document.createElement('div');bar.id='adminWorkspaceCurrent';bar.className='amd-current';$('.admin-top')?.insertAdjacentElement('afterend',bar)}
    if(!bar)return;
    if(id==='home'){
      bar.innerHTML='<div><b>目前：管理總覽</b><div>左側選功能，右側只保留目前需要的管理內容。</div></div>';
      return;
    }
    const item=itemFor(id),def=compositeFor(id),tab=def?.tabs.find(x=>x.id===subtab);
    const detail=tab?`目前分頁：${tab.label}`:'只顯示目前功能，其他管理內容暫時隱藏。';
    bar.innerHTML=`<div><b>目前：${item?.label||id}</b><div>${detail}</div></div><button type="button" data-amd-home>返回總覽</button>`;
    bar.querySelector('[data-amd-home]')?.addEventListener('click',()=>activate('home',{pushHash:false}));
  }

  function activate(requested,{pushHash=true,subtab='',smooth=true}={}){
    ensureComposites();
    let id=requested;
    const alias=ALIAS[id];
    if(alias){subtab=alias.tab;id=alias.parent}
    if(id!=='home'&&!itemFor(id))id='home';

    document.body.classList.add('admin-workspace-mode');
    document.body.classList.toggle('admin-workspace-home',id==='home');
    allExisting().forEach(el=>{
      const active=id!=='home'&&el.id===id;
      el.classList.toggle('admin-workspace-active',active);
      el.classList.toggle('admin-workspace-hidden',!active);
      if(active)openPanel(el);
    });

    const def=compositeFor(id);
    if(def)setCompositeTab(id,subtab||preferredTab(def),true,false);
    const item=itemFor(id);
    if(item?.group)openGroup(item.group);
    setNavActive(id);
    currentBar(id,def?(document.getElementById(id)?.dataset.activeTab||''):'');
    localStorage.setItem(KEY,id);

    if(pushHash){
      const hash=id==='home'?'':(subtab||id);
      const next=location.pathname+location.search+(hash?`#${hash}`:'');
      history.replaceState(null,'',next);
    }
    if(smooth)window.scrollTo({top:0,behavior:'smooth'});
  }

  function sidebarHome(){
    const nav=$('.admin-nav'),label=$('.admin-nav-label',nav||document);
    if(!nav||!label||$('#adminWorkspaceHomeLink'))return;
    const a=document.createElement('a');
    a.id='adminWorkspaceHomeLink';a.href='#';a.className='amd-simple-home';a.textContent='管理總覽';
    label.insertAdjacentElement('afterend',a);
    a.addEventListener('click',e=>{e.preventDefault();activate('home')});
  }

  function simpleSidebar(){
    const nav=$('.admin-nav'),label=$('.admin-nav-label',nav||document);
    if(!nav||!label)return false;
    ensureWorkspaceLinks();
    let simple=$('#amdSimpleNav');
    if(!simple){
      simple=document.createElement('div');simple.id='amdSimpleNav';simple.className='amd-simple-nav';label.insertAdjacentElement('afterend',simple);
      const home=$('#adminWorkspaceHomeLink');if(home)simple.appendChild(home);
      GROUPS.forEach(group=>{
        const box=document.createElement('div');box.className='amd-nav-group';box.dataset.group=group.key;
        box.innerHTML=`<button type="button" class="amd-nav-group-btn" aria-expanded="false"><span><b>${group.label}</b><small>${group.desc}</small></span><i>＋</i></button><div class="amd-nav-items"></div>`;
        simple.appendChild(box);box.querySelector('.amd-nav-group-btn').addEventListener('click',()=>openGroup(group.key));
      });
    }
    WORKSPACES.forEach(item=>{
      const link=nav.querySelector(`a[href="#${CSS.escape(item.id)}"]`),target=simple.querySelector(`.amd-nav-group[data-group="${item.group}"] .amd-nav-items`);
      if(link&&target&&link.parentElement!==target)target.appendChild(link);
    });
    const saved=localStorage.getItem(GROUP_KEY)||'common';
    if(!simple.querySelector('.amd-nav-group.open'))openGroup(GROUPS.some(g=>g.key===saved)?saved:'common',false);
    return true;
  }

  function intercept(){
    document.addEventListener('click',e=>{
      const quick=e.target.closest('.aqf-item[data-id]');
      if(quick?.dataset.id){const id=quick.dataset.id;if(itemFor(id)||ALIAS[id]){e.preventDefault();activate(id);return}}
      const a=e.target.closest('a[href^="#"]');
      if(!a)return;
      const id=(a.getAttribute('href')||'').slice(1);
      if(!id||(!itemFor(id)&&!ALIAS[id]))return;
      e.preventDefault();activate(id);
    },true);
  }

  function initial(){
    ensureComposites();simpleSidebar();
    const hash=(location.hash||'').slice(1),saved=localStorage.getItem(KEY)||'';
    if(ALIAS[hash]){activate(hash,{pushHash:false,smooth:false});return}
    const id=itemFor(hash)&&workspaceElement(hash)?hash:itemFor(saved)&&workspaceElement(saved)?saved:'home';
    activate(id,{pushHash:false,smooth:false});
  }

  function run(){style();sidebarHome();ensureWorkspaceLinks();ensureComposites();simpleSidebar();initial()}
  intercept();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();

  let tries=0;
  const timer=setInterval(()=>{
    ensureWorkspaceLinks();ensureComposites();simpleSidebar();tries++;
    const ready=COMPOSITES.every(def=>def.tabs.every(tab=>document.getElementById(tab.id)));
    if(ready||tries>40)clearInterval(timer);
  },250);

  window.FBAdminWorkspace={open:(id,tab)=>activate(id,{subtab:tab||''}),home:()=>activate('home')};
})();
