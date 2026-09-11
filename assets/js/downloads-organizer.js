(function(){
  if(document.body.dataset.page!=='downloads'||window.__fbDownloadsOrganizer)return;
  window.__fbDownloadsOrganizer=true;

  const TYPE_DEFS=[
    {id:'drivers',name:'驅動程式',en:'DRIVERS',desc:'Windows、macOS、Linux 與 Seagull 等列印驅動'},
    {id:'software',name:'標籤軟體',en:'LABEL SOFTWARE',desc:'BarTender、ZebraDesigner 與標籤編輯軟體'},
    {id:'tools',name:'工具程式',en:'UTILITIES',desc:'Printer Tool、Console、設定與診斷工具'},
    {id:'manuals',name:'手冊與技術文件',en:'MANUALS',desc:'指令手冊、Programming Guide 與技術文件'},
    {id:'remote',name:'遠端與系統工具',en:'REMOTE / SYSTEM',desc:'遠端連線、Microsoft 與其他系統工具'},
    {id:'other',name:'其他下載',en:'OTHER',desc:'其他相關軟體與下載資源'}
  ];

  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const textOf=x=>`${x.category||''} ${x.name||''} ${x.note||''} ${x.brand||''}`.toLowerCase();

  function typeOf(x){
    const c=String(x.category||'').toLowerCase(),s=textOf(x);
    if(/驅動|driver|seagull/.test(c)||/\bdriver\b|printer driver|macos driver|linux driver/.test(s))return 'drivers';
    if(/標籤編輯軟體|標籤軟體|label software/.test(c)||/bartender|zebradesigner|argobar|labeling software|label software|designer/.test(s))return 'software';
    if(/工具程式|utility|utilities|tool/.test(c)||/printer tool|printer utility|font utility|console pc|configuration tool|setup utilities|setup utility/.test(s))return 'tools';
    if(/指令手冊|手冊|文件|manual|guide/.test(c)||/programming guide|command manual|manual|reference guide|user guide|datasheet|data sheet|型錄|技術文件|指令/.test(s))return 'manuals';
    if(/遠端連線|microsoft|遠端|remote|anydesk|teamviewer/.test(s))return 'remote';
    if(/zebradesigner|bartender|argobar/.test(s))return 'software';
    return 'other';
  }

  function addStyle(){
    if(document.getElementById('fbDownloadsOrganizerStyle'))return;
    const s=document.createElement('style');
    s.id='fbDownloadsOrganizerStyle';
    s.textContent=`
      .download-type-wrap{margin-bottom:30px}.download-type-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:14px}.download-type-head h2{margin:3px 0 0;font-size:22px;color:#17324d}.download-type-head p{margin:0;color:#71808d;font-size:12px}
      .download-type-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.download-type-card{min-height:105px;padding:15px 16px;border:1px solid #dce4e9;background:#fff;color:#17324d;text-align:left;cursor:pointer;transition:.16s ease;display:flex;flex-direction:column;justify-content:space-between}.download-type-card:hover{border-color:#9cbac5;background:#f8fbfc}.download-type-card.active{border-color:#17324d;box-shadow:inset 0 -3px 0 #148da7;background:#f7fafb}.download-type-card small{font-size:9px;letter-spacing:.12em;color:#148da7;font-weight:800}.download-type-card b{display:block;font-size:14px;margin:2px 0 4px}.download-type-card span{font-size:10px;color:#71808d;line-height:1.5}.download-type-count{align-self:flex-end;margin-top:8px;font-size:10px!important;color:#17324d!important;font-weight:800}
      .download-sidebar-title{display:block;padding:3px 3px 10px;font-size:10px;letter-spacing:.12em;color:#758693;font-weight:800}.download-brand{width:100%;text-align:left}.download-brand .brand-count{float:right;color:#8494a0;font-size:10px;font-weight:600}.download-brand.active .brand-count{color:inherit}
      .download-content-head{margin-bottom:18px}.download-content-head .download-result-count{display:inline-flex;margin-top:10px;padding:4px 8px;background:#eef4f6;color:#557080;font-size:10px;font-weight:700}
      .download-group{margin:0 0 26px}.download-group-head{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:0 2px 10px;border-bottom:2px solid #17324d;margin-bottom:2px}.download-group-head span{font-size:10px;letter-spacing:.12em;color:#148da7;font-weight:800}.download-group-head h3{margin:2px 0 0;font-size:17px;color:#17324d}.download-group-head b{font-size:10px;color:#71808d;font-weight:700}
      .download-item{border-radius:0!important}.download-item .download-main h3{font-size:14px}.download-item .download-brand-tag{display:inline-flex;margin-left:5px;padding:3px 7px;border-radius:999px;background:#edf3f6;color:#607585;font-size:9px;font-weight:800}.download-item .download-category-tag{display:inline-flex;padding:3px 7px;border-radius:999px;background:#eaf7f6;color:#0b7f78;font-size:9px;font-weight:800}.download-item .download-tags{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:6px}.download-empty{padding:45px 20px;text-align:center;border:1px solid #dce4e9;background:#fff;color:#667a89}.download-empty b{display:block;color:#17324d;margin-bottom:4px}
      @media(max-width:900px){.download-type-grid{grid-template-columns:repeat(2,1fr)}}
      @media(max-width:680px){.download-type-head{display:block}.download-type-head p{margin-top:5px}.download-type-grid{display:flex;overflow-x:auto;gap:8px;padding-bottom:5px;scroll-snap-type:x proximity}.download-type-card{min-width:200px;min-height:98px;scroll-snap-align:start}.download-layout{display:block!important}.download-sidebar{display:flex!important;gap:7px;overflow-x:auto;margin-bottom:20px;padding-bottom:5px}.download-sidebar-title{display:none}.download-brand{width:auto!important;min-width:max-content}.download-group-head h3{font-size:15px}.download-item{align-items:flex-start!important}.download-item>.btn{min-width:max-content}}
    `;
    document.head.appendChild(s);
  }

  function rowHtml(x){
    const type=TYPE_DEFS.find(t=>t.id===typeOf(x))||TYPE_DEFS.at(-1);
    const meta=[];
    if(x.version)meta.push(`版本 ${esc(x.version)}`);
    if(x.updated)meta.push(`更新 ${esc(x.updated)}`);
    if(x.size)meta.push(esc(x.size));
    const action=x.url
      ? `<a class="btn btn-secondary btn-sm download-action" data-quality-done="1" href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">檔案下載</a>`
      : `<a class="btn btn-secondary btn-sm download-action" data-quality-done="1" href="contact.html?item=${encodeURIComponent(x.name||'下載資料')}">洽詢取得</a>`;
    return `<div class="download-item"><span class="download-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12M8 11l4 4 4-4M5 20h14"/></svg></span><div class="download-main"><div class="download-tags"><span class="download-category-tag">${esc(type.name)}</span><span class="download-brand-tag">${esc(x.brand||'其他')}</span></div><h3>${esc(x.name||'下載資源')}</h3>${x.note?`<p>${esc(x.note)}</p>`:''}${meta.length?`<div class="download-meta">${meta.map(m=>`<span>${m}</span>`).join('')}</div>`:''}</div>${action}</div>`;
  }

  function groupHtml(name,en,items){
    return `<section class="download-group"><div class="download-group-head"><div><span>${esc(en)}</span><h3>${esc(name)}</h3></div><b>${items.length} 項</b></div>${items.map(rowHtml).join('')}</section>`;
  }

  function init(){
    if(!window.FBStore)return;
    addStyle();
    const data=FBStore.getData(),items=(data.downloads||[]).slice();
    const brands=[...new Set(items.map(x=>x.brand).filter(Boolean))];
    const params=new URLSearchParams(location.search);
    let activeType=params.get('type')||'all';
    let activeBrand=params.get('brand')||'all';
    if(!TYPE_DEFS.some(t=>t.id===activeType)&&activeType!=='all')activeType='all';
    if(!brands.includes(activeBrand)&&activeBrand!=='all')activeBrand='all';

    const layout=document.querySelector('.download-layout');
    if(!layout)return;
    let typeWrap=document.querySelector('.download-type-wrap');
    if(!typeWrap){
      typeWrap=document.createElement('div');
      typeWrap.className='download-type-wrap';
      layout.parentNode.insertBefore(typeWrap,layout);
    }

    const brandBox=document.getElementById('downloadBrands');
    const listBox=document.getElementById('downloadList');
    const title=document.getElementById('downloadTitle');
    const head=title?.closest('.download-content-head');
    const headP=head?.querySelector('p');
    if(!brandBox||!listBox||!title)return;

    function filtered(){return items.filter(x=>(activeType==='all'||typeOf(x)===activeType)&&(activeBrand==='all'||x.brand===activeBrand));}
    function countType(id){return items.filter(x=>(id==='all'||typeOf(x)===id)&&(activeBrand==='all'||x.brand===activeBrand)).length;}
    function countBrand(brand){return items.filter(x=>(brand==='all'||x.brand===brand)&&(activeType==='all'||typeOf(x)===activeType)).length;}
    function setUrl(){const p=new URLSearchParams();if(activeType!=='all')p.set('type',activeType);if(activeBrand!=='all')p.set('brand',activeBrand);history.replaceState(null,'',`${location.pathname}${p.toString()?`?${p}`:''}${location.hash}`);}

    function renderFilters(){
      const availableTypes=TYPE_DEFS.filter(t=>items.some(x=>typeOf(x)===t.id));
      typeWrap.innerHTML=`<div class="download-type-head"><div><span class="eyebrow">DOWNLOAD CATEGORY</span><h2>先選擇下載類型</h2></div><p>依需求分類，再搭配品牌快速找到檔案。</p></div><div class="download-type-grid"><button class="download-type-card ${activeType==='all'?'active':''}" data-type="all"><small>ALL DOWNLOADS</small><b>全部分類</b><span>依分類分段顯示所有可用下載</span><span class="download-type-count">${countType('all')} 項</span></button>${availableTypes.map(t=>`<button class="download-type-card ${activeType===t.id?'active':''}" data-type="${t.id}"><small>${t.en}</small><b>${t.name}</b><span>${t.desc}</span><span class="download-type-count">${countType(t.id)} 項</span></button>`).join('')}</div>`;
      typeWrap.querySelectorAll('[data-type]').forEach(b=>b.addEventListener('click',()=>{activeType=b.dataset.type;render();setUrl();}));

      brandBox.innerHTML=`<span class="download-sidebar-title">BRAND 品牌</span><button class="download-brand ${activeBrand==='all'?'active':''}" data-brand="all">全部品牌 <span class="brand-count">${countBrand('all')}</span></button>${brands.filter(b=>countBrand(b)>0).map(b=>`<button class="download-brand ${activeBrand===b?'active':''}" data-brand="${esc(b)}">${esc(b)} <span class="brand-count">${countBrand(b)}</span></button>`).join('')}`;
      brandBox.querySelectorAll('[data-brand]').forEach(b=>b.addEventListener('click',()=>{activeBrand=b.dataset.brand;render();setUrl();}));
    }

    function renderList(){
      const rows=filtered(),typeDef=TYPE_DEFS.find(t=>t.id===activeType);
      if(activeType==='all'&&activeBrand==='all')title.textContent='全部下載資源';
      else if(activeType!=='all'&&activeBrand==='all')title.textContent=typeDef?.name||'下載資源';
      else if(activeType==='all')title.textContent=`${activeBrand} 下載資源`;
      else title.textContent=`${activeBrand}｜${typeDef?.name||'下載資源'}`;
      if(headP)headP.textContent=activeType==='all'?'已依下載類型整理，可再選擇品牌縮小範圍。':'目前只顯示所選類型，可再使用左側品牌篩選。';
      let count=head?.querySelector('.download-result-count');
      if(!count){count=document.createElement('span');count.className='download-result-count';head?.appendChild(count);}if(count)count.textContent=`共 ${rows.length} 項`;

      if(!rows.length){listBox.innerHTML='<div class="download-empty"><b>目前沒有符合條件的下載項目</b><span>可切換其他分類或品牌查看。</span></div>';return;}
      if(activeType==='all'){
        listBox.innerHTML=TYPE_DEFS.map(t=>{const group=rows.filter(x=>typeOf(x)===t.id);return group.length?groupHtml(t.name,t.en,group):'';}).join('');
      }else if(activeBrand==='all'){
        listBox.innerHTML=brands.map(b=>{const group=rows.filter(x=>x.brand===b);return group.length?groupHtml(b,'BRAND DOWNLOAD',group):'';}).join('');
      }else{
        listBox.innerHTML=rows.map(rowHtml).join('');
      }
    }

    function render(){renderFilters();renderList();}
    render();setUrl();
  }

  document.addEventListener('DOMContentLoaded',()=>setTimeout(init,40),{once:true});
  if(document.readyState!=='loading')setTimeout(init,40);
})();
