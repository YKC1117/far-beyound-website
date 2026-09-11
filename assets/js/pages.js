(function(){
  const { $, $$, icon, deviceVisual, escapeHtml, qs, formatDate } = FB;

  const e = v => escapeHtml(v == null ? '' : String(v));
  const enc = v => encodeURIComponent(v == null ? '' : String(v));

  function catCard(c){return `<a class="category-card" href="products.html?category=${enc(c.id)}"><span class="category-icon">${icon(c.icon)}</span><span class="category-body"><small>${e(c.en)}</small><h3>${e(c.name)}</h3><p>${e(c.desc)}</p></span><span class="category-arrow">${icon('arrow')}</span></a>`}
  function productCard(p){return `<a class="product-card" href="product.html?id=${enc(p.id)}"><div class="product-card-visual">${deviceVisual(p.device,p.brand,p.family)}</div><div class="product-card-body"><div class="product-meta"><span>${e(p.brand)}</span><span>${e(p.type)}</span></div><h3>${e(p.name)}</h3><p>${e(p.subtitle)}</p><div class="card-link">查看產品 ${icon('arrow')}</div></div></a>`}
  function solutionCard(s){return `<a class="solution-card" href="solutions.html#${enc(s.id)}"><span class="solution-icon">${icon(s.icon)}</span><small>${e(s.en)}</small><h3>${e(s.name)}</h3><p>${e(s.desc)}</p><span class="card-link">了解方案 ${icon('arrow')}</span></a>`}

  function home(){
    const d=FBStore.getData();
    $('#homeCategories').innerHTML=d.categories.map(catCard).join('');
    $('#homeProducts').innerHTML=d.products.filter(p=>p.featured).slice(0,6).map(productCard).join('');
    $('#homeSolutions').innerHTML=d.solutions.map(solutionCard).join('');
    $('#homeNews').innerHTML=d.news.slice(0,4).map((n,i)=>`<a class="news-row" href="news.html"><div class="news-date"><b>${e(String(n.date||'').slice(8))}</b><span>${e(String(n.date||'').slice(0,7).replace('-',' / '))}</span></div><div class="news-copy"><div><span class="tag">${e(n.type)}</span>${i===0?'<span class="tag tag-new">NEW</span>':''}</div><h3>${e(n.title)}</h3><p>${e(n.excerpt)}</p></div>${icon('arrow')}</a>`).join('');
    $('#caseStrip').innerHTML=d.cases.map(c=>`<a href="cases.html" class="case-pill"><span>${e(c.name)}</span><b>${e(c.system)}</b></a>`).join('');
  }

  function products(){
    const d=FBStore.getData(); const active=qs('category')||'all'; const brand=qs('brand')||'all';
    $('#categoryTabs').innerHTML=[`<a class="filter-chip ${active==='all'?'active':''}" href="products.html">全部產品</a>`,...d.categories.map(c=>`<a class="filter-chip ${active===c.id?'active':''}" href="products.html?category=${enc(c.id)}">${e(c.name)}</a>`)].join('');
    const brands=[...new Set(d.products.filter(p=>active==='all'||p.category===active).map(p=>p.brand))].sort();
    $('#brandTabs').innerHTML=[`<a class="brand-chip ${brand==='all'?'active':''}" href="products.html${active!=='all'?`?category=${enc(active)}`:''}">全部品牌</a>`,...brands.map(b=>{const sp=new URLSearchParams(); if(active!=='all')sp.set('category',active);sp.set('brand',b);return `<a class="brand-chip ${brand===b?'active':''}" href="products.html?${sp}">${e(b)}</a>`})].join('');
    const list=d.products.filter(p=>(active==='all'||p.category===active)&&(brand==='all'||p.brand===brand));
    const cat=d.categories.find(c=>c.id===active);
    $('#productPageTitle').textContent=cat?cat.name:'產品資訊';
    $('#productPageSubtitle').textContent=cat?cat.desc:'從標籤列印、掃描、RFID 到行動設備與耗材，依現場需求選擇合適的設備與方案。';
    $('#productCount').textContent=`${list.length} 項產品`;
    $('#productGrid').innerHTML=list.length?list.map(productCard).join(''):'<div class="empty-state wide"><b>目前此分類尚未建立展示產品</b><span>可透過管理介面新增產品資料。</span></div>';
  }

  function product(){
    const d=FBStore.getData(); const p=d.products.find(x=>x.id===qs('id'))||d.products[0]; const c=d.categories.find(x=>x.id===p.category);
    document.title=`${String(p.name||'')}｜萬里資訊`;
    $('#productBreadcrumb').innerHTML=`<a href="index.html">首頁</a><span>/</span><a href="products.html">產品資訊</a><span>/</span><a href="products.html?category=${enc(c?.id||'')}">${e(c?.name||'')}</a><span>/</span><b>${e(p.name)}</b>`;
    $('#productHero').innerHTML=`<div class="product-detail-visual">${deviceVisual(p.device,p.brand,p.family)}</div><div class="product-detail-copy"><div class="product-meta"><span>${e(p.brand)}</span><span>${e(p.type)}</span><span class="status-dot">${e(p.status)}</span></div><h1>${e(p.name)}</h1><h2>${e(p.subtitle)}</h2><p>${e(p.intro)}</p><div class="product-actions"><a class="btn btn-primary" href="contact.html?item=${enc(p.name)}">洽詢此產品</a>${p.files.length?`<a class="btn btn-secondary" href="#downloads">文件下載</a>`:''}</div></div>`;
    $('#productHighlights').innerHTML=p.highlights.map(x=>`<li>${icon('check')}<span>${e(x)}</span></li>`).join('');
    $('#specTable').innerHTML=p.specs.map(([k,v])=>`<div class="spec-row"><dt>${e(k)}</dt><dd>${e(v)}</dd></div>`).join('');
    $('#productFiles').innerHTML=p.files.length?p.files.map(f=>`<button class="download-row demo-download" data-file="${e(f.label)}"><span class="download-icon">${icon('download')}</span><span><small>${e(f.type)}</small><b>${e(f.label)}</b></span><span class="download-cta">測試版</span></button>`).join(''):'<div class="empty-state"><b>此產品目前沒有展示文件</b><span>正式版可由後台上傳型錄、手冊與快速指南。</span></div>';
    $$('.demo-download').forEach(b=>b.addEventListener('click',()=>toast(`${b.dataset.file}：測試環境尚未掛載正式檔案`)));
    const related=d.products.filter(x=>x.id!==p.id&&(x.category===p.category||x.brand===p.brand)).slice(0,3);
    $('#relatedProducts').innerHTML=related.map(productCard).join('');
  }

  function downloads(){
    const d=FBStore.getData(); const brands=[...new Set(d.downloads.map(x=>x.brand))]; let active=qs('brand')||brands[0]||'';
    $('#downloadBrands').innerHTML=brands.map(b=>`<button class="download-brand ${active===b?'active':''}" data-brand="${e(b)}">${e(b)}</button>`).join('');
    function draw(){
      $$('.download-brand').forEach(b=>b.classList.toggle('active',b.dataset.brand===active));
      const rows=d.downloads.filter(x=>x.brand===active);
      $('#downloadTitle').textContent=active;
      $('#downloadList').innerHTML=rows.map(x=>`<div class="download-item"><span class="download-icon">${icon('download')}</span><div class="download-main"><span class="tag">${e(x.category)}</span><h3>${e(x.name)}</h3><p>${e(x.note)}</p><div class="download-meta"><span>版本 ${e(x.version)}</span><span>更新 ${e(x.updated)}</span><span>${e(x.size)}</span></div></div><button class="btn btn-secondary btn-sm demo-download" data-file="${e(x.name)}">檔案下載</button></div>`).join('');
      $$('.demo-download').forEach(b=>b.addEventListener('click',()=>toast(`${b.dataset.file}：正式檔案空間尚未接入`)));
    }
    $$('.download-brand').forEach(b=>b.addEventListener('click',()=>{active=b.dataset.brand;draw()})); draw();
  }

  function solutions(){
    const d=FBStore.getData();
    $('#solutionNav').innerHTML=d.solutions.map(s=>`<a href="#${enc(s.id)}">${icon(s.icon)}<span><small>${e(s.en)}</small><b>${e(s.name)}</b></span></a>`).join('');
    $('#solutionSections').innerHTML=d.solutions.map((s,i)=>`<section id="${e(s.id)}" class="solution-detail ${i%2?'reverse':''}"><div class="solution-visual"><span class="solution-icon xl">${icon(s.icon)}</span><div class="visual-grid"><i></i><i></i><i></i><i></i></div><small>FAR-BEYOUND SYSTEM</small></div><div class="solution-copy"><span class="eyebrow">${e(s.en)}</span><h2>${e(s.name)}</h2><p>${e(s.desc)}</p><ul>${s.points.map(x=>`<li>${icon('check')}<span>${e(x)}</span></li>`).join('')}</ul><a class="btn btn-primary" href="contact.html?item=${enc(s.name)}">洽詢系統方案</a></div></section>`).join('');
  }

  function news(){
    const d=FBStore.getData(); const types=['全部',...new Set(d.news.map(n=>n.type))]; let active='全部';
    $('#newsFilters').innerHTML=types.map(t=>`<button class="filter-chip ${t===active?'active':''}" data-type="${e(t)}">${e(t)}</button>`).join('');
    function draw(){const list=d.news.filter(n=>active==='全部'||n.type===active);$('#newsList').innerHTML=list.map((n,i)=>`<article class="news-card"><div class="news-card-date"><b>${e(String(n.date||'').slice(8))}</b><span>${e(String(n.date||'').slice(0,7).replace('-',' / '))}</span></div><div><div><span class="tag">${e(n.type)}</span>${i===0&&active==='全部'?'<span class="tag tag-new">NEW</span>':''}</div><h2>${e(n.title)}</h2><p>${e(n.excerpt)}</p><button class="text-link demo-news">閱讀內容 ${icon('arrow')}</button></div></article>`).join(''); $$('.demo-news').forEach(b=>b.onclick=()=>toast('新聞內頁將於完整資料搬移階段接入'))}
    $$('#newsFilters button').forEach(b=>b.onclick=()=>{active=b.dataset.type;$$('#newsFilters button').forEach(x=>x.classList.toggle('active',x===b));draw()});draw();
  }

  function contact(){
    const d=FBStore.getData(); const item=qs('item')||'';
    $('#contactCards').innerHTML=d.site.phones.map(p=>`<a class="contact-card" href="tel:${e(String(p.value||'').replace(/[^0-9+]/g,''))}">${icon('phone')}<span><small>${e(p.label)}辦公室</small><b>${e(p.value)}</b></span></a>`).join('')+`<a class="contact-card" href="mailto:${e(d.site.email)}">${icon('mail')}<span><small>E-mail</small><b>${e(d.site.email)}</b></span></a>`;
    if(item) $('#subject').value=item;
    const sent=qs('sent'), error=qs('error'), email=qs('email');
    if(sent==='1'){
      const box=$('#formSuccess');
      if(box){box.textContent=email==='0'?'詢問資料已安全保存；Email 通知暫時未送達，公司仍可由資料庫查詢此筆紀錄。':'感謝您的詢問，資料已送出並完成留存。';box.classList.add('show');}
      history.replaceState(null,'',location.pathname+location.hash);
    }else if(error){
      const msg=error==='rate'?'送出次數過於頻繁，請稍後再試。':'送出失敗，請確認資料後再試；若持續發生可直接來電或寄信聯絡。';
      toast(msg);
      history.replaceState(null,'',location.pathname+location.hash);
    }
    $('#contactForm').addEventListener('submit',ev=>{
      const required=$$('#contactForm [required]'); const bad=required.find(x=>!x.value.trim());
      if(bad){ev.preventDefault();bad.focus();toast('請先完成必填欄位');return}
      const btn=$('#contactForm button[type="submit"]'); if(btn){btn.disabled=true;btn.textContent='送出中…'}
    });
  }

  function admin(){
    let d=FBStore.getData(); let editing=null;
    const fields=['id','brand','family','type','name','subtitle','status','intro'];
    function refresh(){
      d=FBStore.getData();
      $('#adminStats').innerHTML=`<div class="stat-card"><small>產品</small><b>${d.products.length}</b><span>PRODUCTS</span></div><div class="stat-card"><small>分類</small><b>${d.categories.length}</b><span>CATEGORIES</span></div><div class="stat-card"><small>下載項目</small><b>${d.downloads.length}</b><span>DOWNLOADS</span></div><div class="stat-card"><small>最新消息</small><b>${d.news.length}</b><span>NEWS</span></div>`;
      $('#adminProductRows').innerHTML=d.products.map(p=>`<tr><td><span class="admin-brand">${e(p.brand)}</span></td><td><b>${e(p.name)}</b><small>${e(p.subtitle)}</small></td><td>${e(d.categories.find(c=>c.id===p.category)?.name||p.category)}</td><td><span class="status-badge">${e(p.status)}</span></td><td><button class="icon-text edit-product" data-id="${e(p.id)}">編輯</button><button class="icon-text danger delete-product" data-id="${e(p.id)}">刪除</button></td></tr>`).join('');
      $('#adminCategory').innerHTML=d.categories.map(c=>`<option value="${e(c.id)}">${e(c.name)}</option>`).join('');
      $$('.edit-product').forEach(b=>b.onclick=()=>startEdit(b.dataset.id));
      $$('.delete-product').forEach(b=>b.onclick=()=>deleteProduct(b.dataset.id));
    }
    function startEdit(id){editing=id; const p=d.products.find(x=>x.id===id); if(!p)return; fields.forEach(f=>{const el=$(`#admin_${f}`); if(el)el.value=p[f]||''}); $('#adminCategory').value=p.category; $('#adminFeatured').checked=!!p.featured; $('#formTitle').textContent='編輯產品'; $('#adminFormPanel').classList.add('open'); $('#admin_name').focus();}
    function newProduct(){editing=null; $('#productAdminForm').reset(); $('#admin_id').value=`product-${Date.now()}`; $('#admin_status').value='販售中'; $('#formTitle').textContent='新增產品'; $('#adminFormPanel').classList.add('open'); $('#admin_name').focus();}
    function closeForm(){$('#adminFormPanel').classList.remove('open')}
    function deleteProduct(id){if(!confirm('確定刪除此測試產品？'))return; d.products=d.products.filter(x=>x.id!==id);FBStore.saveData(d);refresh();toast('產品已從此瀏覽器測試資料刪除')}
    $('#productAdminForm').onsubmit=ev=>{ev.preventDefault();const form={};fields.forEach(f=>form[f]=$(`#admin_${f}`).value.trim());form.category=$('#adminCategory').value;form.featured=$('#adminFeatured').checked;form.device=d.categories.find(c=>c.id===form.category)?.icon||'box';form.highlights=editing?(d.products.find(x=>x.id===editing)?.highlights||[]):['可由正式後台維護產品特色','支援產品分類與品牌管理','資料結構可移植至正式資料庫'];form.specs=editing?(d.products.find(x=>x.id===editing)?.specs||[]):[['品牌',form.brand],['系列',form.family],['類型',form.type]];form.files=editing?(d.products.find(x=>x.id===editing)?.files||[]):[];if(editing){const idx=d.products.findIndex(x=>x.id===editing);d.products[idx]={...d.products[idx],...form}}else d.products.unshift(form);FBStore.saveData(d);closeForm();refresh();toast('已儲存，可回前台查看變更')};
    $('#newProductBtn').onclick=newProduct; $('#adminFormClose').onclick=closeForm; $('#adminFormPanel').onclick=ev=>{if(ev.target.id==='adminFormPanel')closeForm()};
    $('#exportBtn').onclick=()=>{const blob=new Blob([FBStore.exportData()],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='far-beyound-site-data.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('JSON 已匯出')};
    $('#importInput').onchange=async ev=>{const file=ev.target.files[0];if(!file)return;try{FBStore.importData(await file.text());refresh();toast('JSON 已匯入')}catch(err){toast('匯入失敗：'+err.message)}ev.target.value=''};
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