(()=>{
  'use strict';
  if(window.__fbAdminCacheGuard)return;
  window.__fbAdminCacheGuard=true;

  const MANIFEST='assets/data/admin-build.json';
  const BUILD_KEY='farbeyoundAdminBuild';
  const UI_KEY='farbeyoundAdminUiSchema';
  const SELF_SRC=document.currentScript?.src||'';

  const normalize=value=>String(value||'').replace(/[^0-9A-Za-z._-]/g,'');
  const currentBuild=()=>normalize(new URL(location.href).searchParams.get('build'));
  const staticBuild=()=>{
    try{return normalize(new URL(SELF_SRC,location.href).searchParams.get('v'))}
    catch(_){return ''}
  };

  // 入口 HTML 已帶正式 build 時，先提供給後續動態載入器使用；manifest 回來後再以正式資料校正。
  const entryBuild=staticBuild();
  if(entryBuild)window.FB_ADMIN_BUILD=entryBuild;

  function renderVersion(manifest){
    const note=document.querySelector('.admin-version-note');
    const updatedAt=String(manifest?.updatedAt||'').trim();
    if(!note||!updatedAt)return;
    const text=`後台更新：${updatedAt}`;
    if(note.textContent!==text)note.textContent=text;
    note.title='此時間取自後台正式版本檔，代表最近一次已記錄的後台更新。';
    note.dataset.versionReady='1';
  }

  function resetUiPreferences(){
    [
      'farbeyoundAdminWorkspaceV1','farbeyoundAdminWorkspaceV2',
      'farbeyoundAdminFoldV4','farbeyoundPerformanceFoldV1',
      'farbeyoundPerformanceTabV2','farbeyoundPerformanceTabV3',
      'farbeyoundAdminNavGroupV1','farbeyoundAdminNavGroupV2',
      'farbeyoundAdminHomeTabV1','farbeyoundAdminContentTabV1'
    ].forEach(key=>localStorage.removeItem(key));
  }

  function applyManifest(manifest){
    const build=normalize(manifest?.build);
    const uiSchema=normalize(manifest?.uiSchema);
    if(!build)return;

    window.FB_ADMIN_BUILD=build;
    window.FB_ADMIN_BUILD_INFO=Object.freeze({
      build,
      uiSchema,
      updatedAt:String(manifest?.updatedAt||'').trim()
    });
    document.documentElement.dataset.adminBuild=build;
    renderVersion(manifest);
    window.dispatchEvent(new CustomEvent('farbeyound:adminbuild',{detail:window.FB_ADMIN_BUILD_INFO}));

    const oldUi=localStorage.getItem(UI_KEY)||'';
    if(uiSchema&&oldUi!==uiSchema){
      // 只重設後台介面偏好，不碰產品、內容或正式網站資料。
      resetUiPreferences();
      localStorage.setItem(UI_KEY,uiSchema);
    }

    const urlBuild=currentBuild();
    const htmlBuild=staticBuild();
    const savedBuild=localStorage.getItem(BUILD_KEY)||'';
    localStorage.setItem(BUILD_KEY,build);

    // 入口 HTML 本身已是目前 build 時，不再為了補網址參數重載一次，避免畫面閃動。
    if(urlBuild===build||htmlBuild===build)return;

    // 只有偵測到入口 HTML / 資源版本確實落後時才重新載入。
    const next=new URL(location.href);
    next.searchParams.set('build',build);
    next.searchParams.set('_refresh',Date.now().toString(36));
    if(savedBuild!==build||htmlBuild!==build)location.replace(next.toString());
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
  setInterval(check,60000);
  window.addEventListener('focus',check);
})();
