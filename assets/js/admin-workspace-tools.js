(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminWorkspaceTools)return;
  window.__fbAdminWorkspaceTools=true;

  const $=(s,p=document)=>p.querySelector(s);
  const BUILD=(new URL(location.href).searchParams.get('build')||window.FB_ADMIN_BUILD||'20260916-1702').replace(/[^0-9A-Za-z._-]/g,'');

  function loadHelper(src,id){
    if(document.getElementById(id))return;
    const s=document.createElement('script');
    s.id=id;
    s.src=`${src.split('?')[0]}?v=${encodeURIComponent(BUILD)}`;
    s.defer=true;
    document.head.appendChild(s);
  }

  function resetView(){
    if(!confirm('要重設目前後台的介面偏好嗎？\n\n只會重設工作區、收合與分頁位置，不會修改產品、網站內容或下載資料。'))return;
    try{
      [
        'farbeyoundAdminWorkspaceV1','farbeyoundAdminWorkspaceV2','farbeyoundAdminFoldV4',
        'farbeyoundAdminNavGroupV1','farbeyoundAdminNavGroupV2',
        'farbeyoundAdminHomeTabV1','farbeyoundAdminContentTabV1',
        'farbeyoundPerformanceFoldV1','farbeyoundPerformanceTabV2','farbeyoundPerformanceTabV3'
      ].forEach(key=>localStorage.removeItem(key));
    }catch(_){/* ignore */}
    location.href='admin.html';
  }

  function openQuickFind(){
    if(window.FBAdminQuickFind?.open){window.FBAdminQuickFind.open();return}
    const input=$('#adminQuickFind .aqf-input');
    if(input){input.focus();return}
    document.dispatchEvent(new CustomEvent('farbeyound:quickfind'));
  }

  function goHome(){
    if(window.FBAdminWorkspace?.home){window.FBAdminWorkspace.home();return}
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function syncHomeButton(){
    const btn=$('#adminWorkspaceHome');
    if(!btn)return;
    const atHome=document.body.classList.contains('admin-workspace-home');
    btn.disabled=atHome;
    btn.title=atHome?'目前已在管理總覽':'返回管理總覽';
  }

  function build(){
    if($('#adminWorkspaceTools'))return true;
    const top=$('.admin-top');
    if(!top)return false;
    const box=document.createElement('div');
    box.id='adminWorkspaceTools';
    box.className='admin-workspace-tools';
    box.innerHTML=`
      <div class="admin-workspace-copy">
        <b>後台工作區</b>
        <span>快速切換功能，不會修改任何網站資料。桌機可直接按 Ctrl+K。</span>
      </div>
      <div class="admin-workspace-actions">
        <button type="button" class="btn btn-secondary btn-sm" id="adminWorkspaceFind">快速找功能</button>
        <button type="button" class="btn btn-secondary btn-sm" id="adminWorkspaceHome">回管理總覽</button>
        <button type="button" class="btn btn-secondary btn-sm" id="adminResetView">重設版面</button>
      </div>`;
    top.insertAdjacentElement('afterend',box);
    $('#adminWorkspaceFind').addEventListener('click',openQuickFind);
    $('#adminWorkspaceHome').addEventListener('click',goHome);
    $('#adminResetView').addEventListener('click',resetView);
    syncHomeButton();
    return true;
  }

  function style(){
    if($('#adminWorkspaceToolsStyle'))return;
    const s=document.createElement('style');
    s.id='adminWorkspaceToolsStyle';
    s.textContent=`
      .admin-workspace-tools{display:flex;align-items:center;justify-content:space-between;gap:14px;margin:0 0 12px;padding:11px 13px;border:1px solid #dfe8ec;border-radius:12px;background:#fff;box-shadow:0 4px 14px rgba(30,59,75,.035)}
      .admin-workspace-copy{display:grid;gap:2px;min-width:0}.admin-workspace-tools b{color:#294b5d;font-size:12px}.admin-workspace-tools span{color:#7b8d98;font-size:10px;line-height:1.5}.admin-workspace-actions{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}.admin-workspace-actions .btn:disabled{opacity:.48;cursor:not-allowed}
      @media(max-width:820px){.admin-workspace-tools{align-items:flex-start;flex-direction:column}.admin-workspace-actions{display:grid;grid-template-columns:1fr 1fr;width:100%;justify-content:stretch}.admin-workspace-actions .btn{width:100%}.admin-workspace-actions #adminResetView{grid-column:1/-1}}
      @media(max-width:480px){.admin-workspace-actions{grid-template-columns:1fr}}
    `;
    document.head.appendChild(s);
  }

  function observeWorkspace(){
    const body=document.body;
    if(!body||body.dataset.workspaceToolsObserver)return;
    body.dataset.workspaceToolsObserver='1';
    new MutationObserver(syncHomeButton).observe(body,{attributes:true,attributeFilter:['class']});
  }

  function boot(){
    style();
    if(!build()){setTimeout(boot,120);return}
    observeWorkspace();
    // 載入單一工作區、成效中心與營運工具；只處理後台 UI，不改正式網站資料。
    loadHelper('assets/js/admin-master-detail.js','fbAdminMasterDetailLoader');
    loadHelper('assets/js/admin-performance-ux.js','fbAdminPerformanceUxLoader');
    loadHelper('assets/js/admin-cms-ops.js','fbAdminCmsOpsLoader');
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();
