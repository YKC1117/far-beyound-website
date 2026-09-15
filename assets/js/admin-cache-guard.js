(()=>{
  'use strict';
  if(window.__fbAdminCacheGuard)return;
  window.__fbAdminCacheGuard=true;

  const MANIFEST='assets/data/admin-build.json';
  const BUILD_KEY='farbeyoundAdminBuild';
  const UI_KEY='farbeyoundAdminUiSchema';

  const normalize=value=>String(value||'').replace(/[^0-9A-Za-z._-]/g,'');
  const currentBuild=()=>normalize(new URL(location.href).searchParams.get('build'));

  function applyManifest(manifest){
    const build=normalize(manifest?.build);
    const uiSchema=normalize(manifest?.uiSchema);
    if(!build)return;

    window.FB_ADMIN_BUILD=build;
    document.documentElement.dataset.adminBuild=build;

    const oldUi=localStorage.getItem(UI_KEY)||'';
    if(uiSchema&&oldUi!==uiSchema){
      // 只重設後台介面偏好，不碰產品、內容或正式網站資料。
      localStorage.removeItem('farbeyoundAdminWorkspaceV1');
      localStorage.removeItem('farbeyoundAdminFoldV4');
      localStorage.setItem(UI_KEY,uiSchema);
    }

    const urlBuild=currentBuild();
    const savedBuild=localStorage.getItem(BUILD_KEY)||'';
    localStorage.setItem(BUILD_KEY,build);

    if(urlBuild===build)return;

    // 發現部署版本不同時，改用帶 build 參數的新入口重新載入，避免 HTML / JS / CSS 混用舊快取。
    const next=new URL(location.href);
    next.searchParams.set('build',build);
    next.searchParams.set('_refresh',Date.now().toString(36));
    if(savedBuild!==build||urlBuild!==build)location.replace(next.toString());
  }

  function check(){
    const url=`${MANIFEST}?_=${Date.now()}`;
    fetch(url,{cache:'no-store',credentials:'same-origin'})
      .then(r=>r.ok?r.json():Promise.reject(new Error(`HTTP ${r.status}`)))
      .then(applyManifest)
      .catch(()=>{
        // 無法取得版本檔時不阻斷後台，保留目前頁面可操作。
        document.documentElement.dataset.adminBuildCheck='offline';
      });
  }

  check();
  // 開著後台工作時也會定期發現新部署，不必靠人工 Ctrl+F5。
  setInterval(check,60000);
  window.addEventListener('focus',check);
})();
