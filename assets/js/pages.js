(function(){
  const { $, $$, icon, deviceVisual, escapeHtml, qs, formatDate } = FB;

  function catCard(c){return `<a class="category-card" href="products.html?category=${c.id}"><span class="category-icon">${icon(c.icon)}</span><span class="category-body"><small>${c.en}</small><h3>${c.name}</h3><p>${c.desc}</p></span><span class="category-arrow">${icon('arrow')}</span></a>`}
  function productCard(p){return `<a class="product-card" href="product.html?id=${encodeURIComponent(p.id)}"><div class="product-card-visual">${deviceVisual(p.device,p.brand,p.family)}</div><div class="product-card-body"><div class="product-meta"><span>${p.brand}</span><span>${p.type}</span></div><h3>${p.name}</h3><p>${p.subtitle}</p><div class="card-link">查看產品 ${icon('arrow')}</div></div></a>`}
  function solutionCard(s){return `<a class="solution-card" href="solutions.html#${s.id}"><span class="solution-icon">${icon(s.icon)}</span><small>${s.en}</small><h3>${s.name}</h3><p>${s.desc}</p><span class="card-link">了解方案 ${icon('arrow')}</span></a>`}

  function home(){
    const d=FBStore.getData();
    $('#homeCategories').innerHTML=d.categories.map(catCard).join('');
    $('#homeProducts').innerHTML=d.products.filter(p=>p.featured).slice(0,6).map(productCard).join('');
    $('#homeSolutions').innerHTML=d.solutions.map(solutionCard).join('');
    $('#homeNews').innerHTML=d.news.slice(0,4).map((n,i)=>`<a class="news-row" href="news.html"><div class="news-date"><b>${n.date.slice(8)}</b><span>${n.date.slice(0,7).replace('-',' / ')}</span></div><div class="news-copy"><div><span class="tag">${n.type}</span>${i===0?'<span class="tag tag-new">NEW</span>':''}</div><h3>${n.title}</h3><p>${n.excerpt}</p></div>${icon('arrow')}</a>`).join('');
    $('#caseStrip').innerHTML=d.cases.map(c=>`<a href="cases.html" class="case-pill"><span>${c.name}</span><b>${c.system}</b></a>`).join('');
  }

  function products(){
    const d=FBStore.getData(); const active=qs('category')||'all'; const brand=qs('brand')||'all';
    $('#categoryTabs').innerHTML=[`<a class="filter-chip ${active==='all'?'active':''}" href="products.html">全部產品</a>`,...d.categories.map(c=>`<a class="filter-chip ${active===c.id?'active':''}" href="products.html?category=${c.id}">${c.name}</a>`)].join('');
    const brands=[...new Set(d.products.filter(p=>active==='all'||p.category===active).map(p=>p.brand))].sort();
    $('#brandTabs').innerHTML=[`<a class="brand-chip ${brand==='all'?'active':''}" href="products.html${active!=='all'?`?category=${active}`:''}">全部品牌</a>`,...brands.map(b=>{const sp=new URLSearchParams(); if(active!=='all')sp.set('category',active);sp.set('brand',b);return `<a class="brand-chip ${brand===b?'active':''}" href="products.html?${sp}">${b}</a>`})].join('');
    const list=d.products.filter(p=>(active==='all'||p.category===active)&&(brand==='all'||p.brand===brand));
    const cat=d.categories.find(c=>c.id===active);
    $('#productPageTitle').textContent=cat?cat.name:'產品資訊';
    $('#productPageSubtitle').textContent=cat?cat.desc:'從標籤列印、掃描、RFID 到行動設備與耗材，依現場需求選擇合適的設備與方案。';
    $('#productCount').textContent=`${list.length} 項產品`;
    $('#productGrid').innerHTML=list.length?list.map(productCard).join(''):'<div class="empty-state wide"><b>目前此分類尚未建立展示產品</b><span>可透過管理介面新增產品資料。</span></div>';
  }

  function product(){
    const d=FBStore.getData(); const p=d.products.find(x=>x.id===qs('id'))||d.products[0]; const c=d.categories.find(x=>x.id===p.category);
    document.title=`${p.name}｜萬里資訊`;
    $('#productBreadcrumb').innerHTML=`<a href="index.html">首頁</a><span>/</span><a href="products.html">產品資訊</a><span>/</span><a href="products.html?category=${c?.id||''}">${c?.name||''}</a><span>/</span><b>${p.name}</b>`;
    $('#productHero').innerHTML=`<div class="product-detail-visual">${deviceVisual(p.device,p.brand,p.family)}</div><div class="product-detail-copy"><div class="product-meta"><span>${p.brand}</span><span>${p.type}</span><span class="status-dot">${p.status}</span></div><h1>${p.name}</h1><h2>${p.subtitle}</h2><p>${p.intro}</p><div class="product-actions"><a class="btn btn-primary" href="contact.html?item=${encodeURIComponent(p.name)}">洽詢此產品</a>${p.files.length?`<a class="btn btn-secondary" href="#downloads">文件下載</a>`:''}</div></div>`;
    $('#productHighlights').innerHTML=p.highlights.map(x=>`<li>${icon('check')}<span>${x}</span></li>`).join('');
    $('#specTable').innerHTML=p.specs.map(([k,v])=>`<div class="spec-row"><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`).join('');
    $('#productFiles').innerHTML=p.files.length?p.files.map((f,i)=>`<button class="download-row demo-download" data-file="${escapeHtml(f.label)}"><span class="download-icon">${icon('download')}</span><span><small>${f.type}</small><b>${escapeHtml(f.label)}</b></span><span class="download-cta">測試版</span></button>`).join(''):'<div class="empty-state"><b>此產品目前沒有展示文件</b><span>正式版可由後台上傳型錄、手冊與快速指南。</span></div>';
    $$('.demo-download').forEach(b=>b.addEventListener('click',()=>toast(`${b.dataset.file}：測試環境尚未掛載正式檔案`)));
    const related=d.products.filter(x=>x.id!==p.id&&(x.category===p.category||x.brand===p.brand)).slice(0,3);
    $('#relatedProducts').innerHTML=related.map(productCard).join('');
  }

  function downloads(){
    const d=FBStore.getData(); const brands=[...new Set(d.downloads.map(x=>x.brand))]; let active=qs('brand')||brands[0]||'';
    $('#downloadBrands').innerHTML=brands.map(b=>`<button class="download-brand ${active===b?'active':''}" data-brand="${escapeHtml(b)}">${escapeHtml(b)}</button>`).join('');
    function draw(){
      $$('.download-brand').forEach(b=>b.classList.toggle('active',b.dataset.brand===active));
      const rows=d.downloads.filter(x=>x.brand===active);
      $('#downloadTitle').textContent=active;
      $('#downloadList').innerHTML=rows.map(x=>`<div class="download-item"><span class="download-icon">${icon('download')}</span><div class="download-main"><span class="tag">${escapeHtml(x.category)}</span><h3>${escapeHtml(x.name)}</h3><p>${escapeHtml(x.note)}</p><div class="download-meta"><span>版本 ${escapeHtml(x.version)}</span><span>更新 ${escapeHtml(x.updated)}</span><span>${escapeHtml(x.size)}</span></div></div><button class="btn btn-secondary btn-sm demo-download" data-file="${escapeHtml(x.name)}">檔案下載</button></div>`).join('');
      $$('.demo-download').forEach(b=>b.addEventListener('click',()=>toast(`${b.dataset.file}：正式檔案空間尚未接入`)));
    }
    $$('.download-brand').forEach(b=>b.addEventListener('click',()=>{active=b.dataset.brand;draw()})); draw();
  }

  function solutions(){
    const d=FBStore.getData();
    $('#solutionNav').innerHTML=d.solutions.map(s=>`<a href="#${s.id}">${icon(s.icon)}<span><small>${s.en}</small><b>${s.name}</b></span></a>`).join('');
    $('#solutionSections').innerHTML=d.solutions.map((s,i)=>`<section id="${s.id}" class="solution-detail ${i%2?'reverse':''}"><div class="solution-visual"><span class="solution-icon xl">${icon(s.icon)}</span><div class="visual-grid"><i></i><i></i><i></i><i></i></div><small>FAR-BEYOUND SYSTEM</small></div><div class="solution-copy"><span class="eyebrow">${s.en}</span><h2>${s.name}</h2><p>${s.desc}</p><ul>${s.points.map(x=>`<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul><a class="btn btn-primary" href="contact.html?item=${encodeURIComponent(s.name)}">洽詢系統方案</a></div></section>`).join('');
  }

  function news(){
    const d=FBStore.getData(); const types=['全部',...new Set(d.news.map(n=>n.type))]; let active='全部';
    $('#newsFilters').innerHTML=types.map(t=>`<button class="filter-chip ${t===active?'active':''}" data-type="${t}">${t}</button>`).join('');
    function draw(){const list=d.news.filter(n=>active==='全部'||n.type===active);$('#newsList').innerHTML=list.map((n,i)=>`<article class="news-card"><div class="news-card-date"><b>${n.date.slice(8)}</b><span>${n.date.slice(0,7).replace('-',' / ')}</span></div><div><div><span class="tag">${n.type}</span>${i===0&&active==='全部'?'<span class="tag tag-new">NEW</span>':''}</div><h2>${n.title}</h2><p>${n.excerpt}</p><button class="text-link demo-news">閱讀內容 ${icon('arrow')}</button></div></article>`).join(''); $$('.demo-news').forEach(b=>b.onclick=()=>toast('新聞內頁將於完整資料搬移階段接入'))}
    $$('#newsFilters button').forEach(b=>b.onclick=()=>{active=b.dataset.type;$$('#newsFilters button').forEach(x=>x.classList.toggle('active',x===b));draw()});draw();
  }

  function contact(){
    const d=FBStore.getData(); const item=qs('item')||'';
    $('#contactCards').innerHTML=d.site.phones.map(p=>`<a class="contact-card" href="tel:${p.value.replace(/-/g,'')}">${icon('phone')}<span><small>${p.label}辦公室</small><b>${p.value}</b></span></a>`).join('')+`<a class="contact-card" href="mailto:${d.site.email}">${icon('mail')}<span><small>E-mail</small><b>${d.site.email}</b></span></a>`;
    if(item) $('#subject').value=item;
    $('#contactForm').addEventListener('submit',e=>{e.preventDefault(); const required=$$('#contactForm [required]'); const bad=required.find(x=>!x.value.trim()); if(bad){bad.focus();toast('請先完成必填欄位');return} $('#formSuccess').classList.add('show'); $('#contactForm').reset();});
  }

  function admin(){
    let d=FBStore.getData(); let editing=null;
    const fields=['id','brand','family','type','name','subtitle','status','intro'];
    function refresh(){
      d=FBStore.getData();
      $('#adminStats').innerHTML=`<div class="stat-card"><small>產品</small><b>${d.products.length}</b><span>PRODUCTS</span></div><div class="stat-card"><small>分類</small><b>${d.categories.length}</b><span>CATEGORIES</span></div><div class="stat-card"><small>下載項目</small><b>${d.downloads.length}</b><span>DOWNLOADS</span></div><div class="stat-card"><small>最新消息</small><b>${d.news.length}</b><span>NEWS</span></div>`;
      $('#adminProductRows').innerHTML=d.products.map(p=>`<tr><td><span class="admin-brand">${escapeHtml(p.brand)}</span></td><td><b>${escapeHtml(p.name)}</b><small>${escapeHtml(p.subtitle)}</small></td><td>${escapeHtml(d.categories.find(c=>c.id===p.category)?.name||p.category)}</td><td><span class="status-badge">${escapeHtml(p.status)}</span></td><td><button class="icon-text edit-product" data-id="${p.id}">編輯</button><button class="icon-text danger delete-product" data-id="${p.id}">刪除</button></td></tr>`).join('');
      $('#adminCategory').innerHTML=d.categories.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
      $$('.edit-product').forEach(b=>b.onclick=()=>startEdit(b.dataset.id));
      $$('.delete-product').forEach(b=>b.onclick=()=>deleteProduct(b.dataset.id));
    }
    function startEdit(id){editing=id; const p=d.products.find(x=>x.id===id); if(!p)return; fields.forEach(f=>{const el=$(`#admin_${f}`); if(el)el.value=p[f]||''}); $('#adminCategory').value=p.category; $('#adminFeatured').checked=!!p.featured; $('#formTitle').textContent='編輯產品'; $('#adminFormPanel').classList.add('open'); $('#admin_name').focus();}
    function newProduct(){editing=null; $('#productAdminForm').reset(); $('#admin_id').value=`product-${Date.now()}`; $('#admin_status').value='販售中'; $('#formTitle').textContent='新增產品'; $('#adminFormPanel').classList.add('open'); $('#admin_name').focus();}
    function closeForm(){$('#adminFormPanel').classList.remove('open')}
    function deleteProduct(id){if(!confirm('確定刪除此測試產品？'))return; d.products=d.products.filter(x=>x.id!==id);FBStore.saveData(d);refresh();toast('產品已從此瀏覽器測試資料刪除')}
    $('#productAdminForm').onsubmit=e=>{e.preventDefault();const form={};fields.forEach(f=>form[f]=$(`#admin_${f}`).value.trim());form.category=$('#adminCategory').value;form.featured=$('#adminFeatured').checked;form.device=d.categories.find(c=>c.id===form.category)?.icon||'box';form.highlights=editing?(d.products.find(x=>x.id===editing)?.highlights||[]):['可由正式後台維護產品特色','支援產品分類與品牌管理','資料結構可移植至正式資料庫'];form.specs=editing?(d.products.find(x=>x.id===editing)?.specs||[]):[['品牌',form.brand],['系列',form.family],['類型',form.type]];form.files=editing?(d.products.find(x=>x.id===editing)?.files||[]):[];if(editing){const idx=d.products.findIndex(x=>x.id===editing);d.products[idx]={...d.products[idx],...form}}else d.products.unshift(form);FBStore.saveData(d);closeForm();refresh();toast('已儲存，可回前台查看變更')};
    $('#newProductBtn').onclick=newProduct; $('#adminFormClose').onclick=closeForm; $('#adminFormPanel').onclick=e=>{if(e.target.id==='adminFormPanel')closeForm()};
    $('#exportBtn').onclick=()=>{const blob=new Blob([FBStore.exportData()],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='far-beyound-site-data.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('JSON 已匯出')};
    $('#importInput').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{FBStore.importData(await file.text());refresh();toast('JSON 已匯入')}catch(err){toast('匯入失敗：'+err.message)}e.target.value=''};
    $('#resetBtn').onclick=()=>{if(!confirm('確定恢復內建測試資料？'))return;FBStore.resetData();refresh();toast('已恢復預設資料')};
    refresh();
  }

  function toast(text){let t=$('#siteToast');if(!t){t=document.createElement('div');t.id='siteToast';t.className='site-toast';document.body.appendChild(t)}t.textContent=text;t.classList.add('show');clearTimeout(window.__fbtoast);window.__fbtoast=setTimeout(()=>t.classList.remove('show'),2600)}

  document.addEventListener('DOMContentLoaded',()=>{
    const page=document.body.dataset.page;
    if(page==='home')home(); if(page==='products')products(); if(page==='product')product(); if(page==='downloads')downloads(); if(page==='solutions')solutions(); if(page==='news')news(); if(page==='contact')contact(); if(page==='admin')admin();
  });
  window.FBPages={toast};
})();
