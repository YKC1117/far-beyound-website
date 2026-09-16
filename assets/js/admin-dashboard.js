(()=>{
  if(document.body.dataset.page!=='admin'||window.__fbAdminDashboard)return;
  window.__fbAdminDashboard=true;

  const BUILD=(new URL(location.href).searchParams.get('build')||window.FB_ADMIN_BUILD||'20260916-1401').replace(/[^0-9A-Za-z._-]/g,'');

  const build=()=>{
    if(document.getElementById('adminDashboard'))return;
    const main=document.querySelector('.admin-main'),anchor=document.querySelector('.admin-usage-note');
    if(!main||!anchor)return;
    const s=document.createElement('section');
    s.id='adminDashboard';
    s.className='admin-dashboard';
    s.innerHTML=`
      <div class="admin-dashboard-head">
        <div>
          <span class="eyebrow">ADMIN OVERVIEW</span>
          <h2>管理總覽</h2>
          <p>常用功能集中在這裡；進入功能後，右側只保留目前正在處理的內容。</p>
        </div>
        <span class="admin-status-pill">手機／電腦同步</span>
      </div>
      <div class="admin-dashboard-feature">
        <a href="#adminAnalytics" class="seo-ai-card">
          <div><span class="eyebrow">SEARCH PERFORMANCE</span><b>SEO／Google Ads／AI SEO 成效中心</b><small>總覽、Google SEO、Google Ads、AI SEO、流量來源、技術設定分開查看。</small></div>
          <strong>查看成效 →</strong>
        </a>
      </div>
      <div class="admin-dashboard-grid">
        <a href="#adminInquiries"><b>網站詢問</b><span>客戶表單與聯絡紀錄</span></a>
        <a href="#products"><b>產品管理</b><span>產品資料、上下架、首頁精選</span></a>
        <a href="#adminHomeWorkspace"><b>首頁管理</b><span>首屏、首頁區塊、快捷功能</span></a>
        <a href="#adminContentWorkspace"><b>網站內容</b><span>品牌、據點、文字、內頁與消息</span></a>
        <a href="#resourceAdmin"><b>下載／系統方案</b><span>下載資源與系統方案內容</span></a>
        <a href="#adminAccessCenter" class="system"><b>人員／權限</b><span>帳號、權限與登入管理</span></a>
        <a href="#adminSecurityCenter" class="system"><b>系統安全</b><span>安全政策、登入活動與稽核</span></a>
        <a href="#adminBackupCenter" class="system"><b>備份／還原</b><span>版本保留與還原保護</span></a>
      </div>`;
    anchor.after(s);
  };

  const improveJumpNav=()=>{
    const jump=document.querySelector('.admin-section-jump');
    if(!jump)return;
    jump.innerHTML='<a href="#adminAnalytics">SEO／Ads／AI</a><a href="#adminInquiries">詢問</a><a href="#products">產品</a><a href="#adminHomeWorkspace">首頁管理</a><a href="#adminContentWorkspace">網站內容</a><a href="#resourceAdmin">下載／方案</a>';
  };

  const loadAdminHelper=(src,id)=>{
    if(document.getElementById(id))return;
    const s=document.createElement('script');
    s.id=id;
    s.src=`${src.split('?')[0]}?v=${encodeURIComponent(BUILD)}`;
    s.defer=true;
    document.head.appendChild(s);
  };

  const style=()=>{
    if(document.getElementById('adminDashboardStyle'))return;
    const st=document.createElement('style');
    st.id='adminDashboardStyle';
    st.textContent=`
      .admin-dashboard{margin:0 0 18px;padding:18px;border:1px solid #dfe9ee;border-radius:16px;background:#fff}
      .admin-dashboard-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:14px}
      .admin-dashboard-head h2{margin:3px 0 4px;font-size:21px}
      .admin-dashboard-head p{margin:0;color:#6a7e89;font-size:12px;line-height:1.6}
      .admin-dashboard-feature{margin-bottom:10px}
      .seo-ai-card{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:15px 16px;border:1px solid #cddfe6;border-radius:13px;background:linear-gradient(135deg,#f4fafc,#eef6f8);text-decoration:none;color:#23495b}
      .seo-ai-card b{display:block;margin-top:3px;font-size:15px}.seo-ai-card small{display:block;margin-top:5px;max-width:760px;color:#667e89;font-size:10px;line-height:1.55}.seo-ai-card strong{flex:0 0 auto;font-size:11px;color:#285e73}
      .admin-dashboard-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px}
      .admin-dashboard-grid a{display:block;padding:13px 14px;border:1px solid #e0e9ed;border-radius:12px;background:#f9fbfc;text-decoration:none;color:#244658}
      .admin-dashboard-grid a b{display:block;font-size:13px}.admin-dashboard-grid a span{display:block;margin-top:4px;color:#70838e;font-size:10px;line-height:1.4}
      .admin-dashboard-grid a.system{background:#fffafa;border-color:#eadcdc}.admin-dashboard-grid a.system b{color:#7d4545}
      @media(max-width:1100px){.admin-dashboard-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
      @media(max-width:780px){.admin-dashboard{padding:14px}.admin-dashboard-head{display:block}.seo-ai-card{display:block}.seo-ai-card strong{display:block;margin-top:10px}.admin-dashboard-grid{grid-template-columns:1fr 1fr}}
      @media(max-width:520px){.admin-dashboard-grid{grid-template-columns:1fr}}
    `;
    document.head.appendChild(st);
  };

  const run=()=>{
    style();
    build();
    improveJumpNav();
    loadAdminHelper('assets/js/admin-update-log.js','fbAdminUpdateLogLoader');
    loadAdminHelper('assets/js/admin-backup-status.js','fbAdminBackupStatusLoader');
    loadAdminHelper('assets/js/admin-current-task.js','fbAdminCurrentTaskLoader');
    loadAdminHelper('assets/js/admin-friendly.js','fbAdminFriendlyLoader');
    loadAdminHelper('assets/js/admin-workspace-tools.js','fbAdminWorkspaceToolsLoader');
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();
