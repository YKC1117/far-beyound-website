(function(){
  'use strict';
  if(window.__fbCaseCategoryRuntime)return;window.__fbCaseCategoryRuntime=true;
  const META={
    all:{label:'全部案例',title:'客戶案例',desc:'依客戶現場需求提供系統、條碼設備與客製流程整合。'},
    sfis:{label:'SFIS',title:'SFIS 客戶案例',desc:'生產現場管控、製程防錯與追溯相關案例。'},
    wms:{label:'WMS',title:'WMS 客戶案例',desc:'倉儲、出貨與物料管理相關案例。'},
    smt:{label:'SMT',title:'SMT 客戶案例',desc:'SMT 上料防錯與物料驗證相關案例。'},
    barcode:{label:'條碼整合',title:'條碼整合客戶案例',desc:'條碼列印、掃描與現場資料整合相關案例。'}
  };
  let rendering=false,timer=null,observer=null;
  function visible(list){return(list||[]).filter(x=>x?.published!==false)}
  function kind(c){
    const explicit=String(c?.systemId||c?.category||'').toLowerCase();
    if(META[explicit]&&explicit!=='all')return explicit;
    const text=`${c?.system||''} ${c?.name||''} ${(c?.tags||[]).join(' ')}`.toLowerCase();
    if(/sfis|生產現場|現場監控/.test(text))return'sfis';
    if(/wms|倉庫|倉儲|冷凍食品|出貨系統/.test(text))return'wms';
    if(/smt|防錯料|上料/.test(text))return'smt';
    if(/條碼|barcode|掃描|讀碼/.test(text))return'barcode';
    return'other';
  }
  function active(){const raw=(new URLSearchParams(location.search).get('system')||'all').toLowerCase();return META[raw]?raw:'all'}
  function dataState(){
    const data=window.FBStore?.getData?.();if(!data)return null;
    const key=active(),all=visible(data.cases),list=key==='all'?all:all.filter(c=>kind(c)===key);
    return{key,list,names:list.map(c=>String(c.name||'')),kinds:list.map(kind)};
  }
  function ensureFilters(grid){
    let row=document.getElementById('caseSystemFilters');
    if(row)return row;
    row=document.createElement('div');row.id='caseSystemFilters';row.className='filter-row';row.style.marginBottom='22px';grid.parentNode.insertBefore(row,grid);return row;
  }
  function setHero(key){const m=META[key]||META.all,hero=document.querySelector('.page-hero');if(!hero)return;const h=hero.querySelector('h1'),p=hero.querySelector('p');if(h)h.textContent=m.title;if(p)p.textContent=m.desc}
  function card(c,i){
    const article=document.createElement('article');article.className='case-page-card';article.dataset.system=kind(c);
    const num=document.createElement('span');num.className='case-num';num.textContent='CASE '+String(i+1).padStart(2,'0');
    const h2=document.createElement('h2');h2.textContent=c.name||'';const h3=document.createElement('h3');h3.textContent=c.system||'';
    const p=document.createElement('p');p.textContent=c.desc||'依客戶現場需求進行系統與條碼設備整合。';const tags=document.createElement('div');tags.className='case-tags';
    const source=Array.isArray(c.tags)&&c.tags.length?c.tags:[META[kind(c)]?.label||'系統整合','現場系統','客製流程'];
    source.forEach(t=>{const span=document.createElement('span');span.textContent=t;tags.appendChild(span)});article.append(num,h2,h3,p,tags);return article;
  }
  function current(){
    const grid=document.getElementById('casePageGrid'),state=dataState(),filters=document.getElementById('caseSystemFilters');if(!grid||!state||!filters)return false;
    const buttons=[...filters.querySelectorAll('button[data-system]')],activeButton=filters.querySelector('button.active[data-system]');
    if(buttons.length!==Object.keys(META).length||activeButton?.dataset.system!==state.key)return false;
    const cards=[...grid.querySelectorAll(':scope > .case-page-card')];
    if(state.list.length===0)return cards.length===0&&!!grid.querySelector(':scope > .empty-state')&&document.querySelector('.page-hero h1')?.textContent===META[state.key].title;
    if(cards.length!==state.list.length||grid.querySelector(':scope > .empty-state'))return false;
    const names=cards.map(c=>c.querySelector('h2')?.textContent||''),kinds=cards.map(c=>c.dataset.system||'');
    return names.every((x,i)=>x===state.names[i])&&kinds.every((x,i)=>x===state.kinds[i])&&document.querySelector('.page-hero h1')?.textContent===META[state.key].title;
  }
  function render(){
    if(rendering)return false;const grid=document.getElementById('casePageGrid'),state=dataState();if(!grid||!state)return false;
    rendering=true;
    try{
      const filters=ensureFilters(grid);filters.replaceChildren();
      Object.entries(META).forEach(([id,m])=>{const b=document.createElement('button');b.type='button';b.className='filter-chip'+(id===state.key?' active':'');b.dataset.system=id;b.textContent=m.label;b.addEventListener('click',()=>{const sp=new URLSearchParams(location.search);if(id==='all')sp.delete('system');else sp.set('system',id);history.pushState(null,'',location.pathname+(sp.toString()?`?${sp}`:'')+location.hash);render()});filters.appendChild(b)});
      grid.replaceChildren();state.list.forEach((c,i)=>grid.appendChild(card(c,i)));
      if(!state.list.length){const empty=document.createElement('div');empty.className='empty-state wide';const b=document.createElement('b');b.textContent='目前未公開此分類案例';const s=document.createElement('span');s.textContent='可查看其他案例，或聯絡萬里資訊了解相關系統導入經驗。';empty.append(b,s);grid.appendChild(empty)}
      setHero(state.key);document.title=(META[state.key]?.title||'客戶案例')+'｜萬里資訊';return true;
    }finally{rendering=false}
  }
  function repair(){if(!current())render()}
  function queue(ms=40){clearTimeout(timer);timer=setTimeout(repair,ms)}
  function guard(){const grid=document.getElementById('casePageGrid');if(!grid||observer)return;observer=new MutationObserver(()=>{if(!rendering&&!current())queue(30)});observer.observe(grid,{childList:true,subtree:true,attributes:true,attributeFilter:['data-system','class']})}
  function boot(attempt=0){if(render()){guard();[250,800,2200].forEach(ms=>setTimeout(repair,ms));return}if(attempt<40)setTimeout(()=>boot(attempt+1),75)}
  document.addEventListener('DOMContentLoaded',()=>boot(),{once:true});window.addEventListener('load',()=>setTimeout(()=>{repair();guard()},100));window.addEventListener('popstate',render);window.addEventListener('farbeyound:datachange',()=>setTimeout(render,120));if(document.readyState!=='loading')setTimeout(()=>boot(),0);
  window.FBCaseCategories={render,repair,kind,current};
})();
