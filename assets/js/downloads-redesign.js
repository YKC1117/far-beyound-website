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
    if(/驅動|driver|seagull/.test(c)||/\bdriver\b|printer driver|macos driver|linux driver/.test(s))return'drivers';
    if(/標籤編輯軟體|標籤軟體|label software/.test(c)||/bartender|zebradesigner|argobar|labeling software|designer/.test(s))return'software';
    if(/工具程式|utility|utilities|tool/.test(c)||/printer tool|font utility|console pc|configuration tool|diagnostic/.test(s))return'tools';
    if(/指令手冊|操作手冊|手冊|文件|manual|guide/.test(c)||/programming guide|command manual|reference guide|user guide|datasheet|型錄|技術文件|指令/.test(s))return'manuals';
    if(/遠端連線|microsoft|遠端|remote|anydesk|teamviewer/.test(s))return'remote';
    return'other';
  }
  const typeName=id=>TYPES.find(t=>t.id===id)?.name||'其他下載';

  function init(){
    if(!window.FBStore)return;
    let data=FBStore.getData();
    let items=(data.downloads||[]).filter(x=>x.published!==false).slice();
    let brands=[...new Set(items.map(x=>x.brand).filter(Boolean))];
    const params=new URLSearchParams(location.search),requestedBrand=String(params.get('brand')||'').trim();
    let activeType='all',activeBrand=brands.includes(requestedBrand)?requestedBrand:'all',query='',filterStage=activeBrand==='all'?'type':'brand';
    const typeBox=document.getElementById('downloadTypeFilters'),brandBox=document.getElementById('downloadBrandFilters'),listBox=document.getElementById('downloadResults'),countBox=document.getElementById('downloadCount'),titleBox=document.getElementById('downloadResultsTitle'),descBox=document.getElementById('downloadResultsDesc'),search=document.getElementById('downloadSearch');
    if(!typeBox||!brandBox||!listBox||!countBox||!titleBox||!descBox||!search)return;
    const typeSection=typeBox.closest('.filter-section'),brandSection=brandBox.closest('.filter-section'),filterTitle=typeSection?.querySelector('.filter-title');
    if(brandSection)brandSection.style.display='none';

    function matches(x){const q=query.trim().toLowerCase();return(activeType==='all'||typeOf(x)===activeType)&&(activeBrand==='all'||x.brand===activeBrand)&&(!q||textOf(x).includes(q))}
    const filtered=()=>items.filter(matches);
    const countType=id=>items.filter(x=>(id==='all'||typeOf(x)===id)&&(activeBrand==='all'||x.brand===activeBrand)&&(!query.trim()||textOf(x).includes(query.trim().toLowerCase()))).length;
    const countBrand=b=>items.filter(x=>(b==='all'||x.brand===b)&&(activeType==='all'||typeOf(x)===activeType)&&(!query.trim()||textOf(x).includes(query.trim().toLowerCase()))).length;
    const btn=(label,count,active,attr,value,extra='')=>`<button class="filter-btn ${active?'active':''} ${extra}" ${attr}="${esc(value)}"><span>${esc(label)}</span><span class="count">${count}</span></button>`;

    function renderFilters(){
      if(filterStage==='type'||(activeType==='all'&&activeBrand==='all')){
        if(filterTitle)filterTitle.textContent='下載類型';
        typeBox.classList.remove('brand-step');
        typeBox.innerHTML=TYPES.filter(t=>t.id==='all'||items.some(x=>typeOf(x)===t.id)).map(t=>btn(t.name,countType(t.id),activeType===t.id,'data-type',t.id)).join('');
        typeBox.querySelectorAll('[data-type]').forEach(b=>b.onclick=()=>{activeType=b.dataset.type;activeBrand='all';filterStage=activeType==='all'?'type':'brand';render()});
        return;
      }
      if(filterTitle)filterTitle.textContent=activeType==='all'?'選擇品牌':`${typeName(activeType)}｜選擇品牌`;
      typeBox.classList.add('brand-step');
      const availableBrands=brands.filter(b=>countBrand(b)>0);
      typeBox.innerHTML=`<button class="filter-back" type="button" data-back-type>← 返回下載類型</button>${btn('全部品牌',countBrand('all'),activeBrand==='all','data-brand','all','all-brands')}${availableBrands.map(b=>btn(b,countBrand(b),activeBrand===b,'data-brand',b)).join('')}`;
      typeBox.querySelector('[data-back-type]').onclick=()=>{activeType='all';activeBrand='all';filterStage='type';render()};
      typeBox.querySelectorAll('[data-brand]').forEach(b=>b.onclick=()=>{activeBrand=b.dataset.brand;render()});
    }

    function card(x){
      const meta=[];
      if(x.version)meta.push(`版本 ${esc(x.version)}`);
      if(x.updated)meta.push(`更新 ${esc(x.updated)}`);
      if(x.size)meta.push(esc(x.size));
      const href=String(x.url||'').trim();
      const action=href?'檔案下載':'洽詢取得';
      const target=href?' target="_blank" rel="noopener noreferrer"':'';
      const link=href||`contact.html?item=${encodeURIComponent(String(x.name||'下載資料')+' 檔案索取')}`;
      return `<article class="download-card"><div class="download-card-icon">DL</div><div class="download-card-main"><div class="download-card-tags"><span class="download-tag type">${esc(typeName(typeOf(x)))}</span><span class="download-tag">${esc(x.brand||'其他')}</span></div><h3>${esc(x.name||'下載資源')}</h3>${x.note?`<p>${esc(x.note)}</p>`:''}${meta.length?`<div class="download-meta">${meta.map(m=>`<span>${m}</span>`).join('')}</div>`:''}</div><a class="download-btn" href="${esc(link)}"${target}>${action}</a></article>`;
    }
    const group=(name,rows)=>`<section class="download-group"><div class="download-group-title"><h3>${esc(name)}</h3><span>${rows.length} 項</span></div><div class="download-card-list">${rows.map(card).join('')}</div></section>`;

    function renderList(){
      const rows=filtered();
      countBox.textContent=`共 ${rows.length} 項`;
      const typeLabel=activeType==='all'?'全部類型':typeName(activeType);
      titleBox.textContent=activeBrand==='all'?typeLabel:`${activeBrand}｜${typeLabel}`;
      if(query.trim())descBox.textContent=`搜尋「${query.trim()}」的結果`;
      else if(activeBrand!=='all'&&activeType==='all')descBox.textContent=`目前顯示 ${activeBrand} 的全部下載資源。`;
      else if(activeType==='all')descBox.textContent='下載資料直接沿用公司原官網目前提供的品牌、分類與下載來源。';
      else if(activeBrand==='all')descBox.textContent='已選擇下載類型，請再選擇品牌，或查看此類型全部品牌。';
      else descBox.textContent=`目前顯示 ${activeBrand} 的${typeLabel}。`;
      if(!rows.length){listBox.innerHTML='<div class="download-empty"><b>沒有找到符合條件的下載項目</b><span>請返回下載類型或調整搜尋關鍵字。</span></div>';return}
      if(activeType==='all')listBox.innerHTML=TYPES.filter(t=>t.id!=='all').map(t=>{const r=rows.filter(x=>typeOf(x)===t.id);return r.length?group(t.name,r):''}).join('');
      else if(activeBrand==='all')listBox.innerHTML=brands.map(b=>{const r=rows.filter(x=>x.brand===b);return r.length?group(b,r):''}).join('');
      else listBox.innerHTML=`<div class="download-card-list">${rows.map(card).join('')}</div>`;
    }
    function render(){renderFilters();renderList()}
    function refreshData(){
      data=FBStore.getData();items=(data.downloads||[]).filter(x=>x.published!==false).slice();brands=[...new Set(items.map(x=>x.brand).filter(Boolean))];
      if(activeBrand!=='all'&&!brands.includes(activeBrand)){activeBrand='all';filterStage=activeType==='all'?'type':'brand'}
      render();
    }
    search.addEventListener('input',()=>{query=search.value;render()});
    window.addEventListener('farbeyound:datachange',()=>setTimeout(refreshData,0));
    render();
  }

  document.addEventListener('DOMContentLoaded',()=>setTimeout(init,30),{once:true});
  if(document.readyState!=='loading')setTimeout(init,30);
})();
