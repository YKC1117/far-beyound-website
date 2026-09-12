(()=>{
  'use strict';
  if(window.__fbProductRouteGuard)return;window.__fbProductRouteGuard=true;
  function setRobots(){let m=document.querySelector('meta[name="robots"]');if(!m){m=document.createElement('meta');m.name='robots';document.head.appendChild(m)}m.content='noindex,follow'}
  function renderMissing(){
    document.title='找不到產品｜萬里資訊';setRobots();
    const hero=document.getElementById('productHero');
    if(hero){hero.textContent='';const box=document.createElement('div');box.className='empty-state wide';const title=document.createElement('b');title.textContent='找不到此產品';const note=document.createElement('span');note.textContent='此產品網址可能已更新，請返回產品資訊重新選擇，或聯絡萬里資訊協助確認。';const link=document.createElement('a');link.className='btn btn-primary';link.href='products.html';link.textContent='返回產品資訊';box.append(title,note,link);hero.appendChild(box)}
    document.querySelectorAll('.detail-grid,.related').forEach(el=>{el.hidden=true});
  }
  function run(attempt=0){
    if(document.body?.dataset.page!=='product')return;
    const data=window.FBStore?.getData?.();if(!data){if(attempt<30)setTimeout(()=>run(attempt+1),60);return}
    const id=new URLSearchParams(location.search).get('id')||'';
    const found=(data.products||[]).some(p=>String(p.id||'')===id);
    if(!found)renderMissing();
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(run,40),{once:true});
  window.addEventListener('load',()=>setTimeout(run,120),{once:true});
})();
