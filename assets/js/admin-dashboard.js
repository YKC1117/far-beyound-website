(()=>{
  if(document.body.dataset.page!=='admin'||window.__fbAdminDashboard)return;
  window.__fbAdminDashboard=true;

  const setStamp=()=>{
    const v=document.querySelector('.admin-version-note');
    if(!v)return;
    const info=window.FBAdminUpdateInfo;
    if(info?.updatedAt){
      v.textContent=`${info.label||'後台更新'}：${info.updatedAt}`;
      v.title='此時間代表後台最近一次功能、資料、分析、介面或系統設定更新。';
    }else{
      v.textContent='後台更新：讀取中…';
      v.title='後台更新時間由更新紀錄模組統一提供。';
    }
  };

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
          <p>常用成效、客戶詢問與產品管理優先；低頻設定預設收合，需要時再展開。</p>
        </div>
        <span class="admin-status-pill">手機／電腦同步</span>
      </div>
      <div class="admin-dashboard-feature">
        <a href="#adminAnalytics" class="seo-ai-card">
          <div><span class="eyebrow">SEARCH PERFORMANCE</span><b>Google SEO＋Google Ads＋AI SEO 成效中心</b><small>常用入口：看週／月／季／半年／年成效、AI 品牌導流、熱門產品、資料來源與後續 Search Console／Google Ads 官方資料串接。</small></div>
          <strong>查看成效 →</strong>
        </a>
      </div>
      <div class="admin-dashboard-grid">
        <a href="#adminInquiries"><b>網站詢問</b><span>客戶表單與聯絡紀錄</span></a>
        <a href="#products"><b>產品管理</b><span>產品資料、上下架、精選</span></a>
        <a href="#homeHeroAdmin"><b>首頁管理</b><span>首屏、輪播與首頁內容</span></a>
        <a href="#adminFrontFeatureManager"><b>前台功能／版面</b><span>首頁排序、選單、快捷工具、頁尾</span></a>
        <a href="#adminBrandManager"><b>品牌管理</b><span>品牌分類、品牌入口與排序</span></a>
        <a href="#adminLocationManager"><b>服務據點</b><span>名稱、電話、地址與顯示</span></a>
        <a href="#contentControlAdmin"><b>網站內容／SEO</b><span>文字、選單、Footer 與 SEO 基礎設定</span></a>
        <a href="#adminSecurityCenter" class="system"><b>系統安全</b><span>權限、2FA、資安、備份與還原</span></a>
      </div>`;
    anchor.after(s);
  };

  const improveJumpNav=()=>{
    const jump=document.querySelector('.admin-section-jump');
    if(!jump)return;
    let link=jump.querySelector('[data-seo-ai-jump]');
    if(!link){
      link=document.createElement('a');
      link.href='#adminAnalytics';
      link.dataset.seoAiJump='1';
      link.textContent='SEO／Ads／AI';
    }
    const first=jump.querySelector('a');
    first?jump.insertBefore(link,first):jump.appendChild(link);
    const old=jump.querySelector('a[href="#adminAnalytics"]:not([data-seo-ai-jump])');
    old?.remove();
  };

  const loadAdminHelper=(src,id)=>{
    if(document.getElementById(id))return;
    const s=document.createElement('script');
    s.id=id;
    s.src=src;
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
      .admin-dashboard-grid a.system{background:#fff7f7;border-color:#efcece}.admin-dashboard-grid a.system b{color:#a52b2b}
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
    loadAdminHelper('assets/js/admin-update-log.js?v=20260915-1640','fbAdminUpdateLogLoader');
    loadAdminHelper('assets/js/admin-backup-status.js?v=20260915-1620','fbAdminBackupStatusLoader');
    loadAdminHelper('assets/js/admin-current-task.js?v=20260915-1622','fbAdminCurrentTaskLoader');
    loadAdminHelper('assets/js/admin-friendly.js?v=20260915-1540','fbAdminFriendlyLoader');
    loadAdminHelper('assets/js/admin-workspace-tools.js?v=20260915-1540','fbAdminWorkspaceToolsLoader');
    setTimeout(setStamp,80);
    setTimeout(setStamp,500);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();
