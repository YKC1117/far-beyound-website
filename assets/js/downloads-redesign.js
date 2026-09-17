(function(){
  if(document.body.dataset.page!=='downloads'||window.__fbDownloadsRedesign)return;
  window.__fbDownloadsRedesign=true;
  const TYPES=[{id:'all',name:'全部類型'},{id:'drivers',name:'驅動程式'},{id:'software',name:'標籤軟體'},{id:'tools',name:'工具程式'},{id:'manuals',name:'手冊與文件'},{id:'remote',name:'遠端與系統'},{id:'other',name:'其他下載'}];
  const DOWNLOAD_GATEWAY='https://papqrnqbfauwuipjwwdh.supabase.co/functions/v1/download-file';
  const DIRECT_FILE=/\.(?:zip|exe|msi|dmg|pkg|pdf|rar|7z|gz|tgz|tar)(?:$|[?#])/i;
  const SPECIAL_DIRECT=[/^https:\/\/fs\.tscprinters\.com\/(?:[^/]+\/)?dl\/\d+\/\d+(?:[?#]|$)/i,/^https:\/\/download\.anydesk\.com\//i];
  const verifiedDownloads=new Set();
  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const textOf=x=>`${x.category||''} ${x.name||''} ${x.note||''} ${x.brand||''}`.toLowerCase();
  function typeOf(x){const c=String(x.category||'').toLowerCase(),s=textOf(x);if(/驅動|driver|seagull/.test(c)||/\bdriver\b|printer driver|macos driver|linux driver/.test(s))return'drivers';if(/標籤編輯軟體|標籤軟體|label software/.test(c)||/bartender|zebradesigner|argobar|labeling software|designer/.test(s))return'software';if(/工具程式|utility|utilities|tool/.test(c)||/printer tool|font utility|console pc|configuration tool|diagnostic/.test(s))return'tools';if(/指令手冊|手冊|文件|manual|guide/.test(c)||/programming guide|command manual|reference guide|user guide|datasheet|型錄|技術文件|指令/.test(s))return'manuals';if(/遠端連線|microsoft|遠端|remote|anydesk|teamviewer/.test(s))return'remote';return'other'}
  function typeName(id){return TYPES.find(t=>t.id===id)?.name||'其他下載'}
  function safeDownload(item){
    const name=String(item.name||'下載資料');
    const fallback=`contact.html?item=${encodeURIComponent(name+' 檔案索取')}`;
    const url=String(item.url||'').trim();
    if(!url)return {href:fallback,fallback,action:'索取檔案',direct:false};
    const signed=/[?&](?:Policy|Signature|Key-Pair-Id|Expires)=/i.test(url);
    const direct=!signed&&(DIRECT_FILE.test(url)||SPECIAL_DIRECT.some(re=>re.test(url)));
    if(direct){
      const sp=new URLSearchParams({src:url,name:String(item.name||'download')});
      return {href:`${DOWNLOAD_GATEWAY}?${sp.toString()}`,fallback,action:'直接下載',direct:true};
    }
    return {href:fallback,fallback,action:'索取檔案',direct:false};
  }
  function init(){
    if(!window.FBStore)return;
    const data=FBStore.getData(),items=(data.downloads||[]).filter(x=>x.published!==false).slice(),brands=[...new Set(items.map(x=>x.brand).filter(Boolean))];
    const params=new URLSearchParams(location.search),requestedBrand=String(params.get('brand')||'').trim();
    let activeType='all',activeBrand=brands.includes(requestedBrand)?requestedBrand:'all',query='',filterStage=activeBrand==='all'?'type':'brand';
    const typeBox=document.getElementById('downloadTypeFilters'),brandBox=document.getElementById('downloadBrandFilters'),listBox=document.getElementById('downloadResults'),countBox=document.getElementById('downloadCount'),titleBox=document.getElementById('downloadResultsTitle'),descBox=document.getElementById('downloadResultsDesc'),search=document.getElementById('downloadSearch');
    if(!typeBox||!brandBox||!listBox||!countBox||!titleBox||!descBox||!search)return;
    const typeSection=typeBox.closest('.filter-section'),brandSection=brandBox.closest('.filter-section'),filterTitle=typeSection?.querySelector('.filter-title');
    if(brandSection)brandSection.classList.add('legacy-brand-section');
    function matches(x){const q=query.trim().toLowerCase();return(activeType==='all'||typeOf(x)===activeType)&&(activeBrand==='all'||x.brand===activeBrand)&&(!q||textOf(x).includes(q))}
    function filtered(){return items.filter(matches)}
    function countType(id){return items.filter(x=>(id==='all'||typeOf(x)===id)&&(activeBrand==='all'||x.brand===activeBrand)&&(!query.trim()||textOf(x).includes(query.trim().toLowerCase()))).length}
    function countBrand(b){return items.filter(x=>(b==='all'||x.brand===b)&&(activeType==='all'||typeOf(x)===activeType)&&(!query.trim()||textOf(x).includes(query.trim().toLowerCase()))).length}
    function btn(label,count,active,attr,value,extra=''){return `<button class="filter-btn ${active?'active':''} ${extra}" ${attr}="${esc(value)}"><span>${esc(label)}</span><span class="count">${count}</span></button>`}
    function renderFilters(){
      if(brandSection)brandSection.style.display='none';
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
      const link=safeDownload(x),availability=link.direct?'可直接下載':'協助提供';
      const directAttrs=link.direct?` data-direct-download="1" data-fallback-href="${esc(link.fallback)}"`:'';
      return `<article class="download-card"><div class="download-card-icon">DL</div><div class="download-card-main"><div class="download-card-tags"><span class="download-tag type">${esc(typeName(typeOf(x)))}</span><span class="download-tag">${esc(x.brand||'其他')}</span><span class="download-tag">${availability}</span></div><h3>${esc(x.name||'下載資源')}</h3>${x.note?`<p>${esc(x.note)}</p>`:''}${meta.length?`<div class="download-meta">${meta.map(m=>`<span>${m}</span>`).join('')}</div>`:''}</div><a class="download-btn" href="${esc(link.href)}"${directAttrs}>${link.action}</a></article>`
    }
    function group(name,rows){return `<section class="download-group"><div class="download-group-title"><h3>${esc(name)}</h3><span>${rows.length} 項</span></div><div class="download-card-list">${rows.map(card).join('')}</div></section>`}
    function renderList(){
      const rows=filtered();countBox.textContent=`共 ${rows.length} 項`;const typeLabel=activeType==='all'?'全部類型':typeName(activeType);titleBox.textContent=activeBrand==='all'?typeLabel:`${activeBrand}｜${typeLabel}`;
      if(query.trim())descBox.textContent=`搜尋「${query.trim()}」的結果`;
      else if(activeBrand!=='all'&&activeType==='all')descBox.textContent=`目前顯示 ${activeBrand} 的全部下載資源，可返回下載類型重新篩選。`;
      else if(activeType==='all')descBox.textContent='先選擇下載類型，再進一步選擇品牌；可直接下載的檔案會先自動確認可用性。';
      else if(activeBrand==='all')descBox.textContent='已選擇下載類型，請再選擇品牌，或查看此類型全部品牌。';
      else descBox.textContent=`目前顯示 ${activeBrand} 的${typeLabel}。`;
      if(!rows.length){listBox.innerHTML='<div class="download-empty"><b>沒有找到符合條件的下載項目</b><span>請返回下載類型或調整搜尋關鍵字。</span></div>';return}
      if(activeType==='all')listBox.innerHTML=TYPES.filter(t=>t.id!=='all').map(t=>{const r=rows.filter(x=>typeOf(x)===t.id);return r.length?group(t.name,r):''}).join('');
      else if(activeBrand==='all')listBox.innerHTML=brands.map(b=>{const r=rows.filter(x=>x.brand===b);return r.length?group(b,r):''}).join('');
      else listBox.innerHTML=`<div class="download-card-list">${rows.map(card).join('')}</div>`;
    }
    function render(){renderFilters();renderList()}
    search.addEventListener('input',()=>{query=search.value;render()});
    listBox.addEventListener('click',async event=>{
      const link=event.target.closest('a[data-direct-download="1"]');
      if(!link)return;
      event.preventDefault();
      if(link.dataset.busy==='1')return;
      const href=link.href,fallback=link.dataset.fallbackHref||'contact.html?item=%E4%B8%8B%E8%BC%89%E8%B3%87%E6%96%99%E6%AA%94%E6%A1%88%E7%B4%A2%E5%8F%96';
      if(verifiedDownloads.has(href)){location.href=href;return}
      const original=link.textContent;
      link.dataset.busy='1';
      link.setAttribute('aria-disabled','true');
      link.textContent='確認檔案中…';
      try{
        const probeUrl=`${href}${href.includes('?')?'&':'?'}probe=1`;
        const response=await fetch(probeUrl,{method:'GET',headers:{Accept:'application/json'}});
        if(!response.ok)throw new Error('download_probe_failed');
        const result=await response.json().catch(()=>null);
        if(!result?.ok)throw new Error('download_probe_failed');
        verifiedDownloads.add(href);
        link.textContent='開始下載…';
        location.href=href;
        setTimeout(()=>{link.dataset.busy='';link.removeAttribute('aria-disabled');link.textContent=original},1600);
      }catch(_){
        link.dataset.busy='';
        link.removeAttribute('aria-disabled');
        link.removeAttribute('data-direct-download');
        link.href=fallback;
        link.textContent='索取檔案';
        window.FBPages?.toast?.('此檔案目前無法直接下載，已切換為檔案索取，可由萬里資訊協助提供。');
      }
    });
    render();
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(init,30),{once:true});
  if(document.readyState!=='loading')setTimeout(init,30);
})();