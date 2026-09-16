(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminWorkspaceTools)return;
  window.__fbAdminWorkspaceTools=true;

  const $=(s,p=document)=>p.querySelector(s);
  const KEEP_OPEN=new Set(['adminAnalytics']);
  const BUILD=(new URL(location.href).searchParams.get('build')||window.FB_ADMIN_BUILD||'20260916-0947').replace(/[^0-9A-Za-z._-]/g,'');

  function loadHelper(src,id){
    if(document.getElementById(id))return;
    const s=document.createElement('script');
    s.id=id;
    s.src=`${src.split('?')[0]}?v=${encodeURIComponent(BUILD)}`;
    s.defer=true;
    document.head.appendChild(s);
  }

  function buttonState(btn,open){
    btn.setAttribute('aria-expanded',open?'true':'false');
    btn.innerHTML=open?'收合 <span>−</span>':'展開 <span>＋</span>';
  }

  function collapseHost(host){
    if(!host||KEEP_OPEN.has(host.id))return;
    if(host.matches('.admin-panel')){
      host.classList.add('is-folded');
      const btn=host.querySelector(':scope > .admin-panel-head .admin-fold-btn');
      if(btn)buttonState(btn,false);
      return;
    }
    const panel=host.querySelector(':scope > .admin-panel');
    if(panel){
      panel.classList.add('is-folded');
      const btn=panel.querySelector(':scope > .admin-panel-head .admin-fold-btn');
      if(btn)buttonState(btn,false);
    }
    if(host.classList.contains('admin-lowfreq-host')){
      host.classList.add('is-group-folded');
      const btn=host.querySelector(':scope > .admin-group-fold .admin-fold-btn');
      if(btn)buttonState(btn,false);
    }
  }

  function openHost(host){
    if(!host)return;
    if(host.tagName==='DETAILS')host.open=true;
    if(host.matches('.admin-panel')){
      host.classList.remove('is-folded');
      const btn=host.querySelector(':scope > .admin-panel-head .admin-fold-btn');
      if(btn)buttonState(btn,true);
    }
    const panel=host.querySelector(':scope > .admin-panel');
    if(panel){
      panel.classList.remove('is-folded');
      const btn=panel.querySelector(':scope > .admin-panel-head .admin-fold-btn');
      if(btn)buttonState(btn,true);
    }
    if(host.classList.contains('admin-lowfreq-host')){
      host.classList.remove('is-group-folded');
      const btn=host.querySelector(':scope > .admin-group-fold .admin-fold-btn');
      if(btn)buttonState(btn,true);
    }
  }

  function allManageHosts(){
    const ids=['adminAnalytics','adminInquiries','products','homeHeroAdmin','adminFrontFeatureManager','siteControlAdmin','adminBrandManager','adminLocationManager','contentControlAdmin','siteStructureAdmin','adminExtended','resourceAdmin','adminPassword','adminAccessCenter','adminSecurityCenter','adminBackupCenter','adminHistory','adminMaintenance'];
    return ids.map(id=>document.getElementById(id)).filter(Boolean);
  }

  function compactView(){
    allManageHosts().forEach(collapseHost);
    openHost(document.getElementById('adminAnalytics'));
    document.getElementById('adminAnalytics')?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function expandAll(){allManageHosts().forEach(openHost);}

  function resetView(){
    try{localStorage.removeItem('farbeyoundAdminFoldV4');}catch(_){/* ignore */}
    location.reload();
  }

  function build(){
    if($('#adminWorkspaceTools'))return true;
    const top=$('.admin-top');
    if(!top)return false;
    const box=document.createElement('div');
    box.id='adminWorkspaceTools';
    box.className='admin-workspace-tools';
    box.innerHTML=`
      <div>
        <b>後台工作區</b>
        <span>左側選功能，右側只顯示目前工作區。</span>
      </div>
      <div class="admin-workspace-actions">
        <button type="button" class="btn btn-secondary btn-sm" id="adminCompactView">只看常用</button>
        <button type="button" class="btn btn-secondary btn-sm" id="adminResetView">重設版面</button>
      </div>`;
    top.insertAdjacentElement('afterend',box);
    $('#adminCompactView').addEventListener('click',compactView);
    $('#adminResetView').addEventListener('click',resetView);
    return true;
  }

  function style(){
    if($('#adminWorkspaceToolsStyle'))return;
    const s=document.createElement('style');
    s.id='adminWorkspaceToolsStyle';
    s.textContent=`
      .admin-workspace-tools{display:flex;align-items:center;justify-content:space-between;gap:14px;margin:0 0 12px;padding:10px 12px;border:1px solid #dfe8ec;border-radius:12px;background:#fff}
      .admin-workspace-tools>div:first-child{display:grid;gap:2px}.admin-workspace-tools b{color:#294b5d;font-size:11px}.admin-workspace-tools span{color:#7b8d98;font-size:9px}.admin-workspace-actions{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}
      @media(max-width:720px){.admin-workspace-tools{align-items:flex-start;flex-direction:column}.admin-workspace-actions{width:100%;justify-content:flex-start}.admin-workspace-actions .btn{flex:1 1 auto}}
    `;
    document.head.appendChild(s);
  }

  function boot(){
    style();
    if(!build())setTimeout(boot,120);
    // 真正載入單一工作區、成效中心分頁與營運匯出工具；避免檔案存在但入口未執行。
    loadHelper('assets/js/admin-master-detail.js','fbAdminMasterDetailLoader');
    loadHelper('assets/js/admin-performance-ux.js','fbAdminPerformanceUxLoader');
    loadHelper('assets/js/admin-cms-ops.js','fbAdminCmsOpsLoader');
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();