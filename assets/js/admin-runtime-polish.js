(()=>{
  if(document.body.dataset.page!=='admin'||window.__fbAdminRuntimePolish)return;
  window.__fbAdminRuntimePolish=true;
  function apply(){
    const mode=document.querySelector('.admin-mode');
    if(mode)mode.innerHTML='<b>展示／測試後台</b>目前內容修改會同步到共用測試資料；資安、備份與權限依正式公司管理標準建置。';
    const intro=document.querySelector('.admin-top h1+p');
    if(intro)intro.textContent='網站內容、產品、SEO、詢問、資安與備份集中管理；手機與電腦共用同一份資料。';
    const pill=document.querySelector('.admin-top-meta .admin-status-pill');
    if(pill)pill.textContent='展示／測試環境';
    const version=document.querySelector('.admin-version-note');
    if(version)version.textContent='後台介面更新：2026/09/12 04:22';
    const main=document.querySelector('.admin-main');
    const anchor=document.querySelector('.admin-section-jump');
    if(main&&anchor&&!document.getElementById('adminReadiness')){
      const box=document.createElement('section');
      box.id='adminReadiness';box.className='admin-panel admin-readiness';
      box.innerHTML='<div class="admin-panel-head"><div><span class="eyebrow">ADMIN OVERVIEW</span><h2>管理系統狀態</h2><p>讓主管快速看懂目前後台已具備的管理範圍與安全設計。</p></div><span class="admin-status-pill">展示版持續強化</span></div><div class="admin-stats"><div class="admin-stat"><b>跨裝置</b><span>手機／電腦同步</span></div><div class="admin-stat"><b>RLS</b><span>後端資料保護</span></div><div class="admin-stat"><b>自動</b><span>修改前備份</span></div><div class="admin-stat"><b>4 級</b><span>角色權限架構</span></div></div><div class="admin-usage-note"><b>目前展示重點：</b>網站內容管理、產品管理、詢問紀錄、流量分析、資安規則、角色權限與備份機制。尚未正式切換的個人登入功能會明確標示，不以假資料充當完成品。</div>';
      anchor.after(box);
    }
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',()=>{apply();setTimeout(apply,800);setTimeout(apply,1800)},{once:true}):apply();
})();