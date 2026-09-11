(function(){
  if(document.body.dataset.page!=='downloads'||window.__fbDownloadsRedesign)return;
  window.__fbDownloadsRedesign=true;

  const TYPES=[
    {id:'all',name:'全部類型'},
    {id:'drivers',name:'驅動程式'},
    {id:'software',name:'標籤軟體'},
    {id:'tools',name:'工具程式'},
    {id:'manuals',name:'手冊與文件'},
    {id:'remote',name:'遠端與系統'},
    {id:'other',name:'其他下載'}
  ];
  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const textOf=x=>`${x.category||''} ${x.name||''} ${x.note||''} ${x.brand||''}`.toLowerCase();
  function typeOf(x){
    const c=String(x.category||'').toLowerCase(),s=textOf(x);
    if(/驅動|driver|seagull/.test(c)||/\bdriver\b|printer driver|macos driver|linux driver/.test(s))return 'drivers';
    if(/標籤編輯軟體|標籤軟體|label software/.test(c)||/bartender|zebradesigner|argobar|labeling software|designer/.test(s))return 'software';
    if(/工具程式|utility|utilities|tool/.test(c)||/printer tool|font utility|console pc|configuration tool|diagnostic/.test(s))return 'tools';
    if(/指令手冊|手冊|文件|manual|guide/.test(c)||/programming guide|command manual|reference guide|user guide|datasheet|型錄|技術文件|指令/.test(s))return 'manuals';
    if(/遠端連線|microsoft|遠端|remote|anydesk|teamviewer/.test(s))return 'remote';
    return 'other';
  }
  function typeName(id){return TYPES.find(t=>t.id===id)?.name||'其他下載'}
  function init(){
    if(!window.FBStore)return;
    const data=FBStore.getData();
    const items=(data.downloads||[]).slice();
    const brands=[...new Set(items.map(x=>x.brand).filter(Boolean))];
    let activeType='all',activeBrand='all',query='';

    const typeBox=document.getElementById('downloadTypeFilters');
    const brandBox=document.getElementById('downloadBrandFilters');
    const listBox=document.getElementById('downloadResults');
    const countBox=document.getElementById('downloadCount');
    const titleBox=document.getElementById('downloadResultsTitle');
    const descBox=document.getElementById('downloadResultsDesc');
    const search=document.getElementById('downloadSearch');
    if(!typeBox||!brandBox||!listBox||!countBox||!titleBox||!descBox||!search)return;

    function matches(x){
      const q=query.trim().toLowerCase();
      return (activeType==='all'||typeOf(x)===activeType)&&(activeBrand==='all'||x.brand===activeBrand)&&(!q||textOf(x).includes(q));
    }
    function filtered(){return items.filter(matches)}
    function countType(id){return items.filter(x=>(id==='all'||typeOf(x)===id)&&(activeBrand==='all'||x.brand===activeBrand)&&(!query.trim()||textOf(x).includes(query.trim().toLowerCase()))).length}
    function countBrand(b){return items.filter(x=>(b==='all'||x.brand===b)&&(activeType==='all'||typeOf(x)===activeType)&&(!query.trim()||textOf(x).includes(query.trim().toLowerCase()))).length}
    function btn(label,count,active,attr,value){return `<button class="filter-btn ${active?'active':''}" ${attr}="${esc(value)}"><span>${esc(label)}</span><span class="count">${count}</span></button>`}
    function renderFilters(){
      typeBox.innerHTML=TYPES.filter(t=>t.id==='all'||items.some(x=>typeOf(x)===t.id)).map(t=>btn(t.name,countType(t.id),activeType===t.id,'data-type',t.id)).join('');
      brandBox.innerHTML=btn('全部品牌',countBrand('all'),activeBrand==='all','data-brand','all')+brands.filter(b=>countBrand(b)>0).map(b=>btn(b,countBrand(b),activeBrand===b,'data-brand',b)).join('');
      typeBox.querySelectorAll('[data-type]').forEach(b=>b.onclick=()=>{activeType=b.dataset.type;render()});
      brandBox.querySelectorAll('[data-brand]').forEach(b=>b.onclick=()=>{activeBrand=b.dataset.brand;render()});
    }
    function card(x){
      const meta=[]; if(x.version)meta.push(`版本 ${esc(x.version)}`); if(x.updated)meta.push(`更新 ${esc(x.updated)}`); if(x.size)meta.push(esc(x.size));
      const href=x.url?esc(x.url):`contact.html?item=${encodeURIComponent(x.name||'下載資料')}`;
      const action=x.url?'檔案下載':'洽詢取得';
      return `<article class="download-card"><div class="download-card-icon">DL</div><div class="download-card-main"><div class="download-card-tags"><span class="download-tag type">${esc(typeName(typeOf(x)))}</span><span class="download-tag">${esc(x.brand||'其他')}</span></div><h3>${esc(x.name||'下載資源')}</h3>${x.note?`<p>${esc(x.note)}</p>`:''}${meta.length?`<div class="download-meta">${meta.map(m=>`<span>${m}</span>`).join('')}</div>`:''}</div><a class="download-btn" href="${href}" ${x.url?'target="_blank" rel="noopener noreferrer"':''}>${action}</a></article>`
    }
    function group(name,rows){return `<section class="download-group"><div class="download-group-title"><h3>${esc(name)}</h3><span>${rows.length} 項</span></div><div class="download-card-list">${rows.map(card).join('')}</div></section>`}
    function renderList(){
      const rows=filtered();
      countBox.textContent=`共 ${rows.length} 項`;
      const typeLabel=activeType==='all'?'全部類型':typeName(activeType);
      titleBox.textContent=activeBrand==='all'?typeLabel:`${activeBrand}｜${typeLabel}`;
      descBox.textContent=query.trim()?`搜尋「${query.trim()}」的結果`:'選擇類型或品牌，可快速縮小下載範圍。';
      if(!rows.length){listBox.innerHTML='<div class="download-empty"><b>沒有找到符合條件的下載項目</b><span>請調整品牌、類型或搜尋關鍵字。</span></div>';return}
      if(activeType==='all'){
        listBox.innerHTML=TYPES.filter(t=>t.id!=='all').map(t=>{const r=rows.filter(x=>typeOf(x)===t.id);return r.length?group(t.name,r):''}).join('');
      }else if(activeBrand==='all'){
        listBox.innerHTML=brands.map(b=>{const r=rows.filter(x=>x.brand===b);return r.length?group(b,r):''}).join('');
      }else listBox.innerHTML=`<div class="download-card-list">${rows.map(card).join('')}</div>`;
    }
    function render(){renderFilters();renderList()}
    search.addEventListener('input',()=>{query=search.value;render()});
    render();
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(init,30),{once:true});
  if(document.readyState!=='loading')setTimeout(init,30);
})();
