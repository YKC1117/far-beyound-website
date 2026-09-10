(function(){
  if(document.body.dataset.page!=='downloads'||window.__fbDownloadsQuality)return;
  window.__fbDownloadsQuality=true;
  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize=(v='')=>String(v).toLowerCase().replace(/[’'"“”()（）\[\]{}／/\\|｜:：,，.。\-–—_\s]+/g,'');
  function currentItems(){
    if(!window.FBStore)return [];
    const d=FBStore.getData(),active=document.querySelector('#downloadBrands [data-brand].active')?.dataset.brand||document.getElementById('downloadTitle')?.textContent.trim()||'';
    return (d.downloads||[]).filter(x=>x.brand===active);
  }
  function patch(){
    const rows=[...document.querySelectorAll('#downloadList .download-item')],items=currentItems();
    rows.forEach(row=>{
      const title=row.querySelector('h3')?.textContent.trim()||'',item=items.find(x=>normalize(x.name)===normalize(title))||items.find(x=>normalize(x.name).includes(normalize(title))||normalize(title).includes(normalize(x.name)));
      const old=row.querySelector('.demo-download,.download-action,.btn:last-child');
      if(!old||old.dataset.qualityDone==='1')return;
      const a=document.createElement('a');a.className='btn btn-secondary btn-sm download-action';a.dataset.qualityDone='1';
      if(item?.url){a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='檔案下載';a.setAttribute('aria-label',`${title} 檔案下載`)}
      else{a.href=`contact.html?item=${encodeURIComponent(title||'下載資料')}`;a.textContent='洽詢取得';a.setAttribute('aria-label',`${title} 洽詢取得`)}
      old.replaceWith(a);
    });
  }
  const observer=new MutationObserver(()=>setTimeout(patch,20));
  function run(){patch();const list=document.getElementById('downloadList');if(list)observer.observe(list,{childList:true,subtree:true});document.getElementById('downloadBrands')?.addEventListener('click',()=>setTimeout(patch,80))}
  document.addEventListener('DOMContentLoaded',()=>{setTimeout(run,80);setTimeout(patch,850)});if(document.readyState!=='loading')setTimeout(run,80);
})();
