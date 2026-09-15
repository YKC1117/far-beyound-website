(()=>{
  if(document.body.dataset.page!=='admin'||window.__fbAdminDashboard)return;
  window.__fbAdminDashboard=true;

  const ADMIN_STAMP='後台介面版本：2026/09/15 15:20（非正式網站發布時間）';
  const setStamp=()=>{const v=document.querySelector('.admin-version-note');if(v)v.textContent=ADMIN_STAMP};

  // 主管常用功能放前面，技術性功能留在各管理區內。
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
          <p>日常內容、Google SEO、AI SEO、客戶成效與系統安全集中管理；主管可先看成效，再進入細項設定。</p>
        </div>
        <span class="admin-status-pill">手機／電腦同步</span>
      </div>
      <div class="admin-dashboard-feature">
        <a href="#adminAnalytics" class="seo-ai-card">
          <div><span class="eyebrow">SEARCH PERFORMANCE</span><b>Google SEO＋AI SEO 成效中心</b><small>看週／月／季／半年／年成效、AI 品牌導流、熱門產品與資料來源；Google 關鍵字正式數據預留 Search Console 串接。</small></div>
          <strong>查看成效 →</strong>
        </a>
      </div>
      <div class="admin-dashboard-grid">
        <a href="#homeHeroAdmin"><b>首頁管理</b><span>首屏、輪播與首頁內容</span></a>
        <a href="#products"><b>產品管理</b><span>產品資料、上下架、精選</span></a>
        <a href="#adminFrontFeatureManager"><b>前台功能／版面</b><span>首頁排序、選單、快捷工具、頁尾</span></a>
        <a href="#adminBrandManager"><b>品牌管理</b><span>品牌分類、品牌入口與排序</span></a>
        <a href="#adminLocationManager"><b>服務據點</b><span>名稱、電話、地址與顯示</span></a>
        <a href="#adminInquiries"><b>網站詢問</b><span>客戶表單與聯絡紀錄</span></a>
        <a href="#adminAnalytics"><b>流量／成效分析</b><span>站內需求、來源、SEO／AI SEO 報表</span></a>
        <a href="#adminSecurityCenter" class="system"><b>系統安全</b><span>權限、2FA、資安、備份與還原</span></a>
      </div>`;
    anchor.after(s);
  };

  const improveJumpNav=()=>{
    const jump=document.querySelector('.admin-section-jump');
    if(!jump||jump.querySelector('[data-seo-ai-jump]'))return;
    const link=document.createElement('a');
    link.href='#adminAnalytics';
    link.dataset.seoAiJump='1';
    link.textContent='SEO／AI SEO';
    const inquiry=jump.querySelector('a[href="#adminInquiries"]');
    inquiry?inquiry.after(link):jump.appendChild(link);
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

  const run=()=>{style();build();improveJumpNav();setStamp()};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();
