(function(){
  if(window.__fbRuntimeCleanup)return;
  window.__fbRuntimeCleanup=true;

  const LEGACY_VISUAL_STYLE_IDS=[
    'fbHomeBrandPolishStyle',
    'fbHomeGuideFinalStyle',
    'fbPresentationPolish'
  ];

  function removeLegacyVisualStyles(){
    LEGACY_VISUAL_STYLE_IDS.forEach(id=>document.getElementById(id)?.remove());
  }

  function scheduleCleanup(){
    removeLegacyVisualStyles();
    [40,180,700,1500].forEach(delay=>setTimeout(removeLegacyVisualStyles,delay));
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',scheduleCleanup,{once:true});
  }else{
    scheduleCleanup();
  }

  // 只監看 head 新增節點，不再監看整個 body；若舊腳本重新塞入視覺 style，立即移除。
  if(document.head){
    const observer=new MutationObserver(mutations=>{
      for(const mutation of mutations){
        for(const node of mutation.addedNodes){
          if(node.nodeType===1&&LEGACY_VISUAL_STYLE_IDS.includes(node.id))node.remove();
        }
      }
    });
    observer.observe(document.head,{childList:true});
  }

  window.addEventListener('farbeyound:datachange',()=>setTimeout(removeLegacyVisualStyles,120));
})();
