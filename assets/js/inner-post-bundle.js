/* INNER POST BUNDLE — shared UI runtime in current production order. */

/* ===== assets/js/pages.js ===== */
(function(){
  const { $, $$, icon, deviceVisual, escapeHtml, qs, formatDate } = FB;

  const e = v => escapeHtml(v == null ? '' : String(v));
  const enc = v => encodeURIComponent(v == null ? '' : String(v));

  function catCard(c){return `<a class="category-card" href="products.html?category=${enc(c.id)}"><span class="category-icon">${icon(c.icon)}</span><span class="category-body"><small>${e(c.en)}</small><h3>${e(c.name)}</h3><p>${e(c.desc)}</p></span><span class="category-arrow">${icon('arrow')}</span></a>`}
  function productCard(p){return `<a class="product-card" href="product.html?id=${enc(p.id)}"><div class="product-card-visual">${deviceVisual(p.device,p.brand,p.family)}</div><div class="product-card-body"><div class="product-meta"><span>${e(p.brand)}</span><span>${e(p.type)}</span></div><h3>${e(p.name)}</h3><p>${e(p.subtitle)}</p><div class="card-link">查看產品 ${icon('arrow')}</div></div></a>`}
  function solutionCard(s){return `<a class="solution-card" href="solutions.html#${enc(s.id)}"><span class="solution-icon">${icon(s.icon)}</span><small>${e(s.en)}</small><h3>${e(s.name)}</h3><p>${e(s.desc)}</p><span class="card-link">了解方案 ${icon('arrow')}</span></a>`}

  function newsHref(n){
    const direct=String(n?.id||'').trim();
    if(direct)return `news-detail.html?id=${enc(direct)}`;
    const title=String(n?.title||'').toLowerCase();
    const map=[
      [/2026.*萬里資訊.*員工旅遊|2026.*員工旅遊/,'travel-2026'],
      [/原物料價格調整/,'material-price'],
      [/0x0000011b.*0x00000709|共用印表機.*0x0000011b/,'printer-share-error'],
      [/zt411.*zt421|zt421.*zt411/,'zt411-news'],
      [/zt610.*zt620|zt620.*zt610/,'zt610-news']
    ];
    const hit=map.find(([re])=>re.test(title));
    return hit?`news-detail.html?id=${enc(hit[1])}`:`contact.html?item=${enc(n?.title||'消息內容')}`;
  }

  function home(){
    const d=FBStore.getData();
    $('#homeCategories').innerHTML=d.categories.map(catCard).join('');
    $('#homeProducts').innerHTML=d.products.filter(p=>p.featured).slice(0,6).map(productCard).join('');
    $('#homeSolutions').innerHTML=d.solutions.map(solutionCard).join('');
    $('#homeNews').innerHTML=d.news.slice(0,4).map((n,i)=>`<a class="news-row" href="${newsHref(n)}"><div class="news-date"><b>${e(String(n.date||'').slice(8))}</b><span>${e(String(n.date||'').slice(0,7).replace('-',' / '))}</span></div><div class="news-copy"><div><span class="tag">${e(n.type)}</span>${i===0?'<span class="tag tag-new">NEW</span>':''}</div><h3>${e(n.title)}</h3><p>${e(n.excerpt)}</p></div>${icon('arrow')}</a>`).join('');
    if($('#caseStrip'))$('#caseStrip').innerHTML=d.cases.map(c=>`<a href="cases.html" class="case-pill"><span>${e(c.name)}</span><b>${e(c.system)}</b></a>`).join('');
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
    $('#productGrid').innerHTML=list.length?list.map(productCard).join(''):'<div class="empty-state wide"><b>目前此分類尚無公開產品資料</b><span>歡迎與我們聯絡，我們將協助您確認適合的產品。</span></div>';
  }

  function product(){
    const d=FBStore.getData(); const p=d.products.find(x=>x.id===qs('id'))||d.products[0]; const c=d.categories.find(x=>x.id===p.category);
    document.title=`${String(p.name||'')}｜萬里資訊`;
    $('#productBreadcrumb').innerHTML=`<a href="index.html">首頁</a><span>/</span><a href="products.html">產品資訊</a><span>/</span><a href="products.html?category=${enc(c?.id||'')}">${e(c?.name||'')}</a><span>/</span><b>${e(p.name)}</b>`;
    $('#productHero').innerHTML=`<div class="product-detail-visual">${deviceVisual(p.device,p.brand,p.family)}</div><div class="product-detail-copy"><div class="product-meta"><span>${e(p.brand)}</span><span>${e(p.type)}</span><span class="status-dot">${e(p.status)}</span></div><h1>${e(p.name)}</h1><h2>${e(p.subtitle)}</h2><p>${e(p.intro)}</p><div class="product-actions"><a class="btn btn-primary" href="contact.html?item=${enc(p.name)}">洽詢此產品</a>${p.files.length?`<a class="btn btn-secondary" href="#downloads">文件下載</a>`:''}</div></div>`;
    $('#productHighlights').innerHTML=p.highlights.map(x=>`<li>${icon('check')}<span>${e(x)}</span></li>`).join('');
    $('#specTable').innerHTML=p.specs.map(([k,v])=>`<div class="spec-row"><dt>${e(k)}</dt><dd>${e(v)}</dd></div>`).join('');
    $('#productFiles').innerHTML=p.files.length?p.files.map(f=>`<a class="download-row" href="contact.html?item=${enc((p.name||'產品')+' '+(f.label||'技術文件'))}"><span class="download-icon">${icon('download')}</span><span><small>${e(f.type)}</small><b>${e(f.label)}</b></span><span class="download-cta">洽詢取得</span></a>`).join(''):'<div class="empty-state"><b>需要產品文件？</b><span>如需產品型錄、手冊或技術文件，歡迎與我們聯絡索取。</span></div>';
    const related=d.products.filter(x=>x.id!==p.id&&(x.category===p.category||x.brand===p.brand)).slice(0,3);
    $('#relatedProducts').innerHTML=related.map(productCard).join('');
  }

  function downloads(){
    if(!$('#downloadBrands')) return;
    const d=FBStore.getData(); const brands=[...new Set(d.downloads.map(x=>x.brand))]; let active=qs('brand')||brands[0]||'';
    $('#downloadBrands').innerHTML=brands.map(b=>`<button class="download-brand ${active===b?'active':''}" data-brand="${e(b)}">${e(b)}</button>`).join('');
    function draw(){
      $$('.download-brand').forEach(b=>b.classList.toggle('active',b.dataset.brand===active));
      const rows=d.downloads.filter(x=>x.brand===active);
      $('#downloadTitle').textContent=active;
      $('#downloadList').innerHTML=rows.map(x=>`<div class="download-item"><span class="download-icon">${icon('download')}</span><div class="download-main"><span class="tag">${e(x.category)}</span><h3>${e(x.name)}</h3><p>${e(x.note)}</p><div class="download-meta"><span>版本 ${e(x.version)}</span><span>更新 ${e(x.updated)}</span><span>${e(x.size)}</span></div></div><a class="btn btn-secondary btn-sm" href="contact.html?item=${enc(x.name||'下載資料')}">洽詢取得</a></div>`).join('');
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
    function draw(){const list=d.news.filter(n=>active==='全部'||n.type===active);$('#newsList').innerHTML=list.map((n,i)=>`<article class="news-card"><div class="news-card-date"><b>${e(String(n.date||'').slice(8))}</b><span>${e(String(n.date||'').slice(0,7).replace('-',' / '))}</span></div><div><div><span class="tag">${e(n.type)}</span>${i===0&&active==='全部'?'<span class="tag tag-new">NEW</span>':''}</div><h2>${e(n.title)}</h2><p>${e(n.excerpt)}</p><a class="text-link" href="${newsHref(n)}">閱讀內容 ${icon('arrow')}</a></div></article>`).join('')}
    $$('#newsFilters button').forEach(b=>b.onclick=()=>{active=b.dataset.type;$$('#newsFilters button').forEach(x=>x.classList.toggle('active',x===b));draw()});draw();
  }

  function contact(){
    const d=FBStore.getData(); const item=qs('item')||'';
    $('#contactCards').innerHTML=d.site.phones.map(p=>`<a class="contact-card" href="tel:${e(String(p.value||'').replace(/[^0-9+]/g,''))}">${icon('phone')}<span><small>${e(p.label)}辦公室</small><b>${e(p.value)}</b></span></a>`).join('')+`<a class="contact-card" href="mailto:${e(d.site.email)}">${icon('mail')}<span><small>E-mail</small><b>${e(d.site.email)}</b></span></a>`;
    if(item){
      const subject=$('#subject');
      if(subject && ![...subject.options].some(o=>o.value===item))subject.add(new Option(item,item,true,true));
      else if(subject)subject.value=item;
    }
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
      ev.preventDefault();
      const form=ev.currentTarget;
      const required=$$('#contactForm [required]'); const bad=required.find(x=>!x.value.trim());
      if(bad){bad.focus();toast('請先完成必填欄位');return}
      const fd=new FormData(form);
      if(String(fd.get('website')||'').trim())return;
      const subjectText=String(fd.get('subject')||'一般詢問').trim()||'一般詢問';
      const company=String(fd.get('company')||'').trim();
      const contactName=String(fd.get('contact_name')||'').trim();
      const mailSubject=`網站洽詢｜${subjectText}${company?`｜${company}`:''}`;
      const body=[
        '萬里資訊您好：','',
        `服務單位：${company}`,
        `部門：${String(fd.get('department')||'').trim()}`,
        `姓名：${contactName}`,
        `職稱：${String(fd.get('job_title')||'').trim()}`,
        `電話：${String(fd.get('phone')||'').trim()}`,
        `分機：${String(fd.get('extension')||'').trim()}`,
        `手機：${String(fd.get('mobile')||'').trim()}`,
        `E-mail：${String(fd.get('email')||'').trim()}`,
        `洽詢項目：${subjectText}`,
        `預算範圍：${String(fd.get('budget')||'').trim()}`,'',
        '需求說明：',String(fd.get('message')||'').trim()
      ].join('\n');
      const btn=$('#contactForm button[type="submit"]');
      if(btn){btn.disabled=true;btn.textContent='開啟郵件程式…'}
      const box=$('#formSuccess');
      if(box){box.textContent=`已建立寄給 ${d.site.email} 的詢問郵件草稿，請在郵件程式中確認後按「寄出」。`;box.classList.add('show')}
      location.href=`mailto:${d.site.email}?subject=${enc(mailSubject)}&body=${enc(body)}`;
      setTimeout(()=>{if(btn){btn.disabled=false;btn.textContent='送出詢問'}},1200);
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

/* ===== assets/js/nav-menu.js ===== */
(function(){
  const slugMap={'2026 年度萬里資訊員工旅遊公告':'travel-2026','原物料價格調整公告':'material-price','共用印表機 0x0000011b／0x00000709 錯誤處理':'printer-share-error','Zebra ZT411 / ZT421：多功能及穩定性佳':'zt411-news','Zebra ZT610 / ZT620：堅固耐用及卓越性能':'zt610-news'};
  const esc=v=>String(v??'').replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const uniq=a=>[...new Set((a||[]).filter(Boolean))];
  const caret=()=>'<span class="nav-drop-caret" aria-hidden="true">⌄</span>';
  const item=(href,title,sub='')=>`<a class="subnav-link" href="${href}"><span><b>${esc(title)}</b>${sub?`<small>${esc(sub)}</small>`:''}</span><span class="subnav-arrow">→</span></a>`;
  const panel=(title,en,body,href,label='查看全部')=>`<div class="subnav-panel"><div class="subnav-panel-head"><div><small>${esc(en)}</small><b>${esc(title)}</b></div><a href="${href}">${esc(label)} →</a></div><div class="subnav-grid">${body}</div></div>`;
  function sets(d){return{cats:(d.categories||[]).filter(x=>x.visible!==false).slice(0,8),brands:uniq((d.downloads||[]).filter(x=>x.published!==false).map(x=>x.brand)),solutions:(d.solutions||[]).filter(x=>x.published!==false),cases:(d.cases||[]).filter(x=>x.published!==false).slice(0,6),news:(d.news||[]).filter(x=>x.published!==false).slice(0,5)}}
  function desktopNav(d){const{cats,brands,solutions,cases,news}=sets(d);return `<div class="nav-item has-mega"><a href="products.html">產品資訊 ${caret()}</a><div class="mega-menu"><div class="mega-head"><div><span class="eyebrow">PRODUCT INFORMATION</span><h3>產品與服務</h3></div><a href="products.html" class="text-link">查看所有產品 →</a></div><div class="mega-grid">${cats.map(c=>`<a href="products.html?category=${encodeURIComponent(c.id)}" class="mega-card"><span class="nav-mega-symbol">${esc((c.name||'').slice(0,1))}</span><span><b>${esc(c.name)}</b><small>${esc(c.en||'')}</small></span></a>`).join('')}</div></div></div><div class="nav-item has-subnav"><a href="solutions.html">系統方案 ${caret()}</a>${panel('系統方案','SYSTEM SOLUTIONS',solutions.map(s=>item(`solutions.html#${encodeURIComponent(s.id)}`,s.name,s.en||'')).join(''),'solutions.html')}</div><div class="nav-item has-subnav"><a href="cases.html">客戶案例 ${caret()}</a>${panel('客戶案例','OUR CASES',cases.map(c=>item('cases.html',c.name,c.system||'')).join(''),'cases.html')}</div><div class="nav-item has-subnav"><a href="news.html">最新消息 ${caret()}</a>${panel('最新消息','LATEST NEWS',news.map(n=>{const s=n.slug||slugMap[n.title];return item(s?`news-detail.html?id=${s}`:'news.html',n.title,`${n.date||''} · ${n.type||''}`)}).join(''),'news.html')}</div><div class="nav-item has-subnav"><a href="downloads.html">下載服務 ${caret()}</a>${panel('下載服務','DOWNLOAD CENTER',brands.map(b=>item(`downloads.html?brand=${encodeURIComponent(b)}`,b,'驅動、軟體、工具與文件')).join(''),'downloads.html')}</div><div class="nav-item has-subnav"><a href="about.html">公司資訊 ${caret()}</a>${panel('公司資訊','ABOUT FAR-BEYOUND',[item('about.html','關於我們','公司與服務介紹'),item('locations.html','服務據點','台北、台南與中國服務資訊'),item('contact.html','聯絡我們','產品、耗材與系統洽詢')].join(''),'about.html','了解萬里資訊')}</div>`}
  function mobileNav(d){const{cats,brands,solutions,cases,news}=sets(d);const group=(t,h,l)=>`<details class="mobile-nav-group"><summary><span>${t}</span><span>＋</span></summary><div class="mobile-nav-sub"><a class="mobile-nav-all" href="${h}">查看全部 ${t}</a>${l}</div></details>`;return `<a href="index.html">首頁</a>${group('產品資訊','products.html',cats.map(c=>`<a href="products.html?category=${encodeURIComponent(c.id)}">${esc(c.name)}</a>`).join(''))}${group('系統方案','solutions.html',solutions.map(s=>`<a href="solutions.html#${encodeURIComponent(s.id)}">${esc(s.name)}</a>`).join(''))}${group('客戶案例','cases.html',cases.map(c=>`<a href="cases.html">${esc(c.name)}<small>${esc(c.system||'')}</small></a>`).join(''))}${group('最新消息','news.html',news.map(n=>{const s=n.slug||slugMap[n.title];return `<a href="${s?`news-detail.html?id=${s}`:'news.html'}">${esc(n.title)}</a>`}).join(''))}${group('下載服務','downloads.html',brands.map(b=>`<a href="downloads.html?brand=${encodeURIComponent(b)}">${esc(b)}</a>`).join(''))}${group('公司資訊','about.html',`<a href="about.html">關於我們</a><a href="locations.html">服務據點</a><a href="contact.html">聯絡我們</a>`)}`}
  function markCurrent(el){const p=document.body.dataset.page||'',target={products:'products.html',product:'products.html',downloads:'downloads.html',solutions:'solutions.html',cases:'cases.html',news:'news.html','news-detail':'news.html',about:'about.html',locations:'about.html',contact:'about.html','preview-guide':'about.html'}[p]||'';[...el.children].forEach(n=>{const a=n.querySelector(':scope > a'),h=(a?.getAttribute('href')||'').split('?')[0].split('#')[0],on=!!target&&h===target;n.classList.toggle('current',on);a?.classList.toggle('current',on);on?a?.setAttribute('aria-current','page'):a?.removeAttribute('aria-current')})}
  function styles(){if(document.getElementById('navEnhancedStyles'))return;const s=document.createElement('style');s.id='navEnhancedStyles';s.textContent='.desktop-nav>.nav-item{position:relative}.desktop-nav>.nav-item.has-mega{position:static}.nav-drop-caret{margin-left:6px;color:var(--muted);font-size:13px;transition:transform .18s}.has-subnav:hover>a .nav-drop-caret,.has-subnav:focus-within>a .nav-drop-caret,.has-mega:hover>a .nav-drop-caret{transform:rotate(180deg)}.subnav-panel{position:absolute;top:calc(100% - 1px);left:50%;width:430px;transform:translate(-50%,10px);background:#fff;border:1px solid var(--line);border-radius:0 0 18px 18px;box-shadow:0 24px 60px rgba(9,32,59,.18);padding:18px;opacity:0;visibility:hidden;pointer-events:none;transition:.18s;z-index:80}.has-subnav:hover>.subnav-panel,.has-subnav:focus-within>.subnav-panel{opacity:1;visibility:visible;pointer-events:auto;transform:translate(-50%,0)}.subnav-panel-head{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:1px solid #e8edf2;padding:0 3px 12px;margin-bottom:10px}.subnav-panel-head>div{display:grid}.subnav-panel-head small{font-size:9px;letter-spacing:.15em;color:var(--teal);font-weight:900}.subnav-panel-head b{font-size:18px}.subnav-panel-head>a{font-size:11px;font-weight:900;color:var(--teal)}.subnav-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}.subnav-link{min-width:0;padding:10px 11px;border-radius:10px;display:flex;justify-content:space-between;align-items:center;gap:10px;border:1px solid transparent;background:#fbfcfd}.subnav-link:hover{background:#f0faf8;border-color:#cde9e5}.subnav-link>span:first-child{display:grid;min-width:0}.subnav-link b{font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.subnav-link small{font-size:9px;color:var(--muted);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.subnav-arrow{color:var(--teal);font-size:13px}.nav-mega-symbol{width:38px;height:38px;border-radius:10px;background:var(--soft);color:var(--teal);display:grid!important;place-items:center;font-weight:900;font-size:15px;flex:none}.mobile-nav-group{border-bottom:1px solid #e6edf2}.mobile-nav-group summary{list-style:none;padding:15px 0;display:flex;justify-content:space-between;align-items:center;font-weight:900;cursor:pointer}.mobile-nav-group summary::-webkit-details-marker{display:none}.mobile-nav-group[open] summary span:last-child{transform:rotate(45deg)}.mobile-nav-group summary span:last-child{transition:.16s;color:var(--teal)}.mobile-nav-sub{display:grid;padding:0 0 12px 12px}.drawer-links .mobile-nav-sub a{padding:9px 10px!important;font-size:12px!important;color:#607286!important;border:0!important}.drawer-links .mobile-nav-sub a:hover{background:#f2f7f8!important;color:var(--teal)!important}.drawer-links .mobile-nav-sub a small{display:block;font-size:9px;color:#8a98a7;margin-top:2px}.drawer-links .mobile-nav-all{font-weight:900!important;color:var(--teal)!important}@media(max-width:1180px) and (min-width:981px){.desktop-nav>a,.nav-item>a{padding-left:9px!important;padding-right:9px!important;font-size:12px!important}.header-inner{gap:15px!important}.header-actions .btn{display:none}.subnav-panel{width:390px}}';document.head.appendChild(s)}
  function apply(){const d=window.FBStore?.getData?.(),desktop=document.querySelector('.desktop-nav'),mobile=document.querySelector('.drawer-links');if(!d||!desktop||!mobile)return false;styles();const dh=desktopNav(d),mh=mobileNav(d);if(desktop.innerHTML!==dh)desktop.innerHTML=dh;if(mobile.innerHTML!==mh)mobile.innerHTML=mh;markCurrent(desktop);return true}
  function loadScript(src,key){if(document.querySelector(`script[data-${key}]`))return;const s=document.createElement('script');s.src=src;s.setAttribute('data-'+key,'1');document.body.appendChild(s)}
  function start(){loadScript('assets/js/cloud-sync.js?v=20260912-0824','cloud-sync');loadScript('assets/js/front-url-guard.js?v=20260912-0819','front-url-guard');loadScript('assets/js/page-settings-control.js?v=20260912-0818','page-settings-control');loadScript('assets/js/search-visibility.js?v=20260912-0834','search-visibility');loadScript('assets/js/front-location-control.js?v=20260912-0839','front-location-control');loadScript('assets/js/front-feature-control.js?v=20260912-0903','front-feature-control');loadScript('assets/js/public-managed-content.js?v=20260912-0858','public-managed-content');loadScript('assets/js/front-brand-control.js?v=20260912-0810','front-brand-control');apply();requestAnimationFrame(apply)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  window.addEventListener('farbeyound:datachange',()=>requestAnimationFrame(apply));
})();

/* ===== assets/js/catalog-ui.js ===== */
(function(){
  function esc(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
  function qs(k){return new URLSearchParams(location.search).get(k)}
  function idFromCard(card){try{return new URL(card.href,location.href).searchParams.get('id')}catch(e){return ''}}
  function imageMarkup(p){if(!p?.image)return '';return `<div class="official-product-photo"><img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy"><span>${esc(p.brand)}</span></div>`}
  function getBrandOrder(category,d){
    const map=window.FBOfficialOrder?.brandOrder?.()||{};
    if(category!=='all'&&map[category])return map[category];
    const agency=window.FBOfficialOrder?.agency?.()||[];
    if(agency.length)return agency;
    const all=[];(d.categories||[]).forEach(c=>(map[c.id]||[]).forEach(b=>{if(!all.includes(b))all.push(b)}));return all;
  }
  function sortProducts(list,d){
    const cats=(d.categories||[]).map(c=>c.id),map=window.FBOfficialOrder?.brandOrder?.()||{};
    return list.slice().sort((a,b)=>{const ca=cats.indexOf(a.category),cb=cats.indexOf(b.category);if(ca!==cb)return(ca<0?999:ca)-(cb<0?999:cb);const bo=map[a.category]||[],ba=Number.isFinite(a.brandOrder)?a.brandOrder:bo.indexOf(a.brand),bb=Number.isFinite(b.brandOrder)?b.brandOrder:bo.indexOf(b.brand);if(ba!==bb)return(ba<0?999:ba)-(bb<0?999:bb);return(Number.isFinite(a.legacyOrder)?a.legacyOrder:9999)-(Number.isFinite(b.legacyOrder)?b.legacyOrder:9999)})
  }
  function patchProductCards(d){document.querySelectorAll('.product-card').forEach(card=>{const p=d.products.find(x=>x.id===idFromCard(card)),holder=card.querySelector('.product-card-visual');if(p?.image&&holder)holder.innerHTML=imageMarkup(p)})}
  function productsPage(){
    if(document.body.dataset.page!=='products')return;
    const d=FBStore.getData(),active=qs('category')||'all',brand=qs('brand')||'all',order=getBrandOrder(active,d);
    let available=[...new Set(d.products.filter(p=>active==='all'||p.category===active).map(p=>p.brand))];
    if(active==='all'&&window.FBOfficialOrder?.agency){const agency=window.FBOfficialOrder.agency();available=agency.filter(b=>available.includes(b))}
    available.sort((a,b)=>{const ai=order.indexOf(a),bi=order.indexOf(b);return(ai<0?999:ai)-(bi<0?999:bi)});
    const tabs=document.getElementById('brandTabs');
    if(tabs){const base=active==='all'?'products.html':`products.html?category=${encodeURIComponent(active)}`;tabs.innerHTML=`<a class="brand-chip ${brand==='all'?'active':''}" href="${base}">全部品牌</a>`+available.map(b=>{const sp=new URLSearchParams();if(active!=='all')sp.set('category',active);sp.set('brand',b);return `<a class="brand-chip ${brand===b?'active':''}" href="products.html?${sp.toString()}">${esc(b)}</a>`}).join('')}
    const filtered=sortProducts(d.products.filter(p=>(active==='all'||p.category===active)&&(brand==='all'||p.brand===brand)),d),grid=document.getElementById('productGrid');
    if(grid){const nodes=new Map([...grid.querySelectorAll('.product-card')].map(el=>[idFromCard(el),el]));filtered.forEach(p=>{const el=nodes.get(p.id);if(el)grid.appendChild(el)})}
    patchProductCards(d);
  }
  function productPage(){
    if(document.body.dataset.page!=='product')return;
    const d=FBStore.getData(),id=qs('id'),p=d.products.find(x=>x.id===id);if(!p)return;
    const holder=document.querySelector('.product-detail-visual');if(p.image&&holder)holder.innerHTML=imageMarkup(p);patchProductCards(d);
    const hi=document.getElementById('productHighlights');
    if(hi&&(!p.highlights||!p.highlights.length))hi.innerHTML='';
  }
  function downloadOrder(){
    if(document.body.dataset.page!=='downloads')return;
    const d=FBStore.getData(),order=window.FBOfficialOrder?.downloads?.()||[],holder=document.getElementById('downloadBrands');if(!holder)return;
    const buttons=[...holder.querySelectorAll('[data-brand]')];buttons.sort((a,b)=>{const ai=order.indexOf(a.dataset.brand),bi=order.indexOf(b.dataset.brand);return(ai<0?999:ai)-(bi<0?999:bi)}).forEach(b=>holder.appendChild(b));
  }
  function run(){if(!window.FBStore)return;const d=FBStore.getData();productsPage();productPage();downloadOrder();patchProductCards(d)}
  document.addEventListener('DOMContentLoaded',()=>{setTimeout(run,30);setTimeout(run,250)});if(document.readyState!=='loading')setTimeout(run,30);window.addEventListener('farbeyound:datachange',()=>setTimeout(run,80));
})();


/* ===== assets/js/presentation-polish.js ===== */
(function(){
  let sanitizing=false;
  const TAIPEI_ADDRESS='新北市中和區中山路二段351號10樓之1';
  const TAINAN_ADDRESS='台南市永康區中華路425號4樓之18';
  const mapUrl=address=>`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  function sanitizePublicText(){
    if(document.body.dataset.page==='admin'||sanitizing)return;
    sanitizing=true;
    const replacements=[
      ['正式版可由後台上傳型錄、手冊與快速指南。','如需型錄、手冊或快速指南，歡迎聯絡我們。'],
      ['正式檔案空間尚未接入','如需此檔案，歡迎聯絡我們'],
      ['測試環境尚未掛載正式檔案','如需此檔案，歡迎聯絡我們'],
      ['新聞內頁將於完整資料搬移階段接入','更多資訊請參閱最新消息內容'],
      ['新版網站測試環境','萬里資訊股份有限公司'],
      ['網站提案預覽','萬里資訊股份有限公司'],
      ['原官網產品資料','產品資料'],
      ['新版目錄','產品目錄'],
      ['正式版','']
    ];
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const nodes=[];let n;while((n=walker.nextNode()))nodes.push(n);
    nodes.forEach(node=>{
      if(['SCRIPT','STYLE','NOSCRIPT'].includes(node.parentElement?.tagName||''))return;
      let text=node.nodeValue||'',next=text;
      replacements.forEach(([a,b])=>{next=next.split(a).join(b)});
      if(next!==text)node.nodeValue=next;
    });
    sanitizing=false;
  }

  function styles(){
    if(document.body.classList.contains('fb-approved-skin-20260916'))return;
    if(document.getElementById('fbPresentationPolish'))return;
    const st=document.createElement('style');st.id='fbPresentationPolish';st.textContent=`
      :root{--fb-ink:#17344a;--fb-muted:#687d8c;--fb-line:#dfe8ed;--fb-soft:#f5f8fa;--fb-accent:#087d96}
      body[data-page]:not([data-page="admin"]){background:#f6f9fb;color:var(--fb-ink)}
      .site-header{background:rgba(255,255,255,.94)!important;border-bottom-color:rgba(198,213,222,.72)!important;box-shadow:0 2px 18px rgba(19,49,68,.045)!important}
      .header-inner{height:78px!important}
      .brand-copy strong{color:#17344a!important;font-weight:850!important}
      .brand-copy small{color:#8294a0!important}
      .desktop-nav>.nav-item>a,.desktop-nav>a{color:#294b60!important}
      .desktop-nav>.nav-item>a:hover,.desktop-nav>a:hover,.desktop-nav>.nav-item.current>a,.desktop-nav>a.current{color:#087d96!important}
      .header-actions .btn{border-radius:10px!important;font-weight:800!important}
      .hero-actions .btn{box-shadow:0 8px 20px rgba(15,52,73,.10)}
      .hero-actions .btn-secondary{box-shadow:none!important}
      .section{padding:88px 0!important}
      .section-head{margin-bottom:38px!important}
      .section-head h2{font-weight:800!important;letter-spacing:-.035em!important}
      .section-head p{line-height:1.9!important}
      .v5-credibility{box-shadow:0 1px 0 rgba(17,52,72,.03)}
      .v5-cred-item{min-height:108px!important;display:flex!important;align-items:center!important}
      .v5-cred-key{font-weight:850!important}
      .v5-cred-copy{gap:3px!important}
      .category-card,.product-card,.solution-card,.v5-case-card{box-shadow:0 10px 28px rgba(20,55,75,.055)!important}
      .category-card:hover,.product-card:hover,.solution-card:hover,.v5-case-card:hover{box-shadow:0 20px 42px rgba(20,55,75,.11)!important}
      .product-card-visual{height:248px!important}
      .product-card-body{padding:22px!important}
      .product-card h3{font-weight:800!important;letter-spacing:-.02em!important}
      .solution-card{min-height:260px!important}
      .v5-case-card{padding:26px!important}
      .v5-case-card h3{font-weight:800!important;letter-spacing:-.02em!important}
      .news-row{padding:20px 10px!important}
      .news-row:hover{border-radius:10px!important;background:#f9fbfc!important}
      .cta-band{box-shadow:0 18px 45px rgba(18,57,76,.14)!important}
      .footer-location{width:100%;display:grid!important;gap:2px!important;margin:7px 0!important;padding:9px 10px!important;border:1px solid rgba(255,255,255,.10);border-radius:9px;transition:.18s;background:rgba(255,255,255,.025)}
      .footer-location:hover{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.2)}
      .footer-location-head{display:flex!important;align-items:center;justify-content:space-between;width:100%;margin:0!important;color:#fff!important;font-size:11px!important;font-weight:800}
      .footer-location-head small{color:#78ded5;font-size:9px;font-weight:800}
      .footer-location-address{display:block!important;margin:0!important;color:#afc0d1!important;font-size:11px!important;line-height:1.55}
      .footer-bottom{justify-content:flex-start!important}
      .quick-back-arrow{display:block;font-size:22px;line-height:20px;font-weight:700;margin-top:-2px}
      @media(max-width:980px){
        .header-inner{height:68px!important}
        .section{padding:64px 0!important}
        .section-head{margin-bottom:28px!important;align-items:flex-start!important}
        .section-head p{line-height:1.75!important}
        .v5-cred-item{min-height:96px!important}
        .product-card-visual{height:220px!important}
        .solution-card{min-height:0!important}
        .cta-band{margin-bottom:24px!important}
      }
      @media(max-width:680px){
        .container{width:min(calc(100% - 32px),1180px)!important}
        .section{padding:54px 0!important}
        .section-head h2{font-size:30px!important}
        .section-head p{font-size:12px!important}
        .v5-cred-item{padding:16px 13px!important}
        .product-card-visual{height:205px!important}
        .product-card-body{padding:18px!important}
        .news-row{grid-template-columns:64px 1fr 22px!important;gap:11px!important;padding:16px 5px!important}
        .news-date b{font-size:21px!important}
        .cta-band{border-radius:18px!important;padding:28px 22px!important}
        .cta-band h2{font-size:23px!important;line-height:1.35!important}
        .cta-band p{font-size:12px!important;line-height:1.75!important}
        .footer-location{padding:9px!important}.footer-location-address{font-size:10px!important}
      }
    `;document.head.appendChild(st);
  }

  function polishFooter(){
    if(document.body.dataset.page==='admin')return;
    const footer=document.querySelector('.site-footer');if(!footer)return;
    const d=window.FBStore?.getData?.();
    const contact=[...footer.querySelectorAll('.footer-grid>div')].find(el=>el.querySelector('h4')?.textContent.trim()==='聯絡資訊');
    if(contact&&!contact.dataset.locationPatched){
      const phones=(d?.site?.phones||[{label:'台北',value:'02-82217759'},{label:'台南',value:'06-2360139'}]);
      const email=d?.site?.email||'company@far-beyound.com.tw';
      contact.innerHTML=`<h4>聯絡資訊</h4>${phones.map(p=>`<a href="tel:${String(p.value).replace(/-/g,'')}">${p.label} ${p.value}</a>`).join('')}<a href="mailto:${email}">${email}</a><a class="footer-location" href="${mapUrl(TAIPEI_ADDRESS)}" target="_blank" rel="noopener" aria-label="使用 Google 地圖導航至台北辦公室"><span class="footer-location-head">台北辦公室 <small>Google 導航 ↗</small></span><span class="footer-location-address">${TAIPEI_ADDRESS}</span></a><a class="footer-location" href="${mapUrl(TAINAN_ADDRESS)}" target="_blank" rel="noopener" aria-label="使用 Google 地圖導航至台南辦公室"><span class="footer-location-head">台南辦公室 <small>Google 導航 ↗</small></span><span class="footer-location-address">${TAINAN_ADDRESS}</span></a>`;
      contact.dataset.locationPatched='1';
    }
    const bottom=footer.querySelector('.footer-bottom');
    if(bottom){[...bottom.querySelectorAll(':scope>span')].slice(1).forEach(el=>el.remove())}
  }

  function cleanCopy(){
    if(document.body.dataset.page==='downloads'){
      const hero=document.querySelector('.page-hero p');
      if(hero)hero.textContent='依品牌快速找到標籤機驅動程式、標籤軟體、工具程式與技術文件。';
    }
    polishFooter();
    sanitizePublicText();
  }

  function watchPublicCopy(){
    if(document.body.dataset.page==='admin'||window.__fbCopyObserver)return;
    window.__fbCopyObserver=true;
    const ob=new MutationObserver(()=>queueMicrotask(()=>{sanitizePublicText();polishFooter()}));
    ob.observe(document.body,{childList:true,subtree:true,characterData:true});
  }

  function attachBackTop(){
    if(document.body.dataset.page==='admin')return;
    const rail=document.querySelector('.quick-contact');
    if(!rail||rail.querySelector('[data-back-top]'))return;
    const old=rail.querySelector('.back-top');if(old)old.remove();
    const item=document.createElement('div');item.className='quick-contact-item';item.dataset.backTop='1';
    item.innerHTML='<button type="button" class="quick-contact-btn" aria-label="回到頁首" title="回到頁首"><span class="quick-back-arrow" aria-hidden="true">↑</span><span>TOP</span></button>';
    item.querySelector('button').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
    rail.appendChild(item);
  }

  function contactNote(){
    if(document.body.dataset.page!=='contact')return;
    const success=document.getElementById('formSuccess');
    if(success)success.innerHTML='<b>感謝您的詢問</b><br>我們將依您提供的聯絡資料與需求內容協助確認後續。';
  }

  function run(){styles();cleanCopy();watchPublicCopy();attachBackTop();contactNote()}
  document.addEventListener('DOMContentLoaded',run,{once:true});
  if(document.readyState!=='loading')run();
})();


/* ===== assets/js/final-fixes.js ===== */
(function(){
  const LOGO='assets/images/brand/far-beyound-logo.png';
  const ICONS={
    phone:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.1 3.8 9.7 3c.7-.2 1.4.2 1.7.8l1.2 2.8c.3.6.1 1.3-.4 1.7l-1.5 1.2a14 14 0 0 0 3.8 3.8l1.2-1.5c.4-.5 1.1-.7 1.7-.4l2.8 1.2c.7.3 1 .9.8 1.7l-.8 2.6c-.3.9-1.1 1.5-2 1.5C11 18.4 5.6 13 5.6 6c0-1 .6-1.9 1.5-2.2Z"/></svg>',
    line:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 11.1c0-4.1-4.1-7.4-9.1-7.4s-9.1 3.3-9.1 7.4c0 3.7 3.2 6.8 7.6 7.3.3.1.7.2.8.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1.1 1 .6s5.3-3.1 7.2-5.3a6.7 6.7 0 0 0 1.7-5Z"/><path d="M6.8 9v4h2.4M10 9v4M11.4 13V9l2.7 4V9M18.1 9h-2.7v4h2.7M15.4 11h2.3" class="line-detail"/></svg>',
    mail:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6.5h16v11H4z"/><path d="m4.8 7.3 7.2 5.5 7.2-5.5"/></svg>',
    download:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M8 11l4 4 4-4"/><path d="M5 20h14"/></svg>'
  };
  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const params=()=>new URLSearchParams(location.search);
  function style(){if(document.getElementById('fbFinalFixes'))return;const s=document.createElement('style');s.id='fbFinalFixes';s.textContent=`
    .brand-mark{display:grid!important;place-items:center!important;overflow:hidden!important;background:#fff!important;padding:2px!important}.brand-mark img{display:block;width:100%;height:100%;object-fit:contain;border-radius:9px}
    .desktop-nav .nav-group.current>a,.desktop-nav>a.current{color:var(--teal)}.desktop-nav .nav-group.current>a:after,.desktop-nav>a.current:after{transform:scaleX(1)}
    .quick-contact{position:fixed;right:0;top:52%;z-index:88;transform:translateY(-50%);display:grid;gap:1px;filter:drop-shadow(0 10px 24px rgba(20,44,66,.16))}.quick-contact-item{position:relative}.quick-contact-btn{width:58px;min-height:64px;border:0;border-left:1px solid #dbe3e8;background:rgba(255,255,255,.97);color:#17324d;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;cursor:pointer;text-decoration:none;font:inherit;transition:.18s ease;backdrop-filter:blur(12px)}.quick-contact-item:first-child .quick-contact-btn{border-radius:8px 0 0 0}.quick-contact-item:last-child .quick-contact-btn{border-radius:0 0 0 8px}.quick-contact-btn:hover,.quick-contact-item.is-open>.quick-contact-btn{background:#17324d;color:#fff}.quick-contact-btn svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.quick-contact-btn .line-detail{fill:none;stroke:currentColor;stroke-width:1.25}.quick-contact-btn span{font-size:10px;line-height:1.1;font-weight:700;letter-spacing:.03em}.quick-phone-panel{position:absolute;right:67px;top:0;width:226px;background:#fff;border:1px solid #dce4e9;border-radius:8px;padding:10px;box-shadow:0 18px 45px rgba(16,42,67,.16);opacity:0;visibility:hidden;transform:translateX(8px);transition:.18s ease}.quick-contact-item.is-open .quick-phone-panel{opacity:1;visibility:visible;transform:none}.quick-phone-panel:after{content:"";position:absolute;right:-6px;top:25px;width:11px;height:11px;background:#fff;border-top:1px solid #dce4e9;border-right:1px solid #dce4e9;transform:rotate(45deg)}.quick-phone-panel strong{display:block;font-size:13px;color:#17324d;padding:4px 5px 8px}.quick-phone-link{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 9px;border-top:1px solid #edf1f3;color:#334e63;text-decoration:none}.quick-phone-link span{font-size:11px;color:#71808d}.quick-phone-link b{font-size:13px;color:#17324d}.quick-phone-link:hover{background:#f6f9fa}.mobile-contact-bar{display:none}
    .product-support-card{border:1px solid #dde5ea;background:#f7f9fa;padding:20px 22px}.product-support-card b{display:block;color:#17324d;font-size:15px;margin-bottom:7px}.product-support-card p{margin:0 0 15px;color:#617383;font-size:12px;line-height:1.8}.product-support-actions{display:flex;flex-wrap:wrap;gap:8px}.product-support-actions a{display:inline-flex;align-items:center;gap:7px;padding:9px 12px;border:1px solid #ccd8df;background:#fff;color:#17324d;text-decoration:none;font-size:11px;font-weight:700}.product-support-actions a:first-child{background:#17324d;border-color:#17324d;color:#fff}.product-support-actions svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.7}.product-files-link{display:grid!important;grid-template-columns:auto 1fr auto;align-items:center;gap:12px;text-decoration:none;color:inherit}.product-files-link .download-icon svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.7}.product-not-found{padding:90px 0 120px;text-align:center}.product-not-found .eyebrow{display:block;margin-bottom:12px}.product-not-found h1{font-size:34px;color:#17324d;margin:0 0 12px}.product-not-found p{color:#667989;margin:0 0 24px}.product-not-found .btn{display:inline-flex}
    @media(max-width:980px){.quick-contact{display:none}.mobile-contact-bar{position:fixed;left:0;right:0;bottom:0;z-index:90;display:grid;grid-template-columns:repeat(3,1fr);background:rgba(255,255,255,.98);border-top:1px solid #dce4e9;box-shadow:0 -8px 26px rgba(18,46,70,.10);padding-bottom:env(safe-area-inset-bottom)}.mobile-contact-bar a,.mobile-contact-bar button{min-height:58px;border:0;border-right:1px solid #e4e9ed;background:transparent;color:#17324d;display:flex;align-items:center;justify-content:center;gap:7px;text-decoration:none;font:inherit;font-size:11px;font-weight:700}.mobile-contact-bar a:last-child{border-right:0}.mobile-contact-bar svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.mobile-contact-bar .line-detail{stroke-width:1.25}.mobile-contact-phone{position:fixed;left:14px;right:14px;bottom:calc(70px + env(safe-area-inset-bottom));z-index:91;background:#fff;border:1px solid #dce4e9;border-radius:10px;padding:8px;box-shadow:0 18px 48px rgba(17,43,66,.2);display:none}.mobile-contact-phone.is-open{display:block}.mobile-contact-phone a{display:flex;justify-content:space-between;align-items:center;padding:13px 12px;text-decoration:none;color:#17324d;border-bottom:1px solid #edf1f3}.mobile-contact-phone a:last-child{border-bottom:0}.mobile-contact-phone span{font-size:12px;color:#71808d}.mobile-contact-phone b{font-size:14px}body:not([data-page="admin"]){padding-bottom:calc(58px + env(safe-area-inset-bottom))}}
    @media(max-width:680px){.home-photo-showcase{min-height:215px!important;height:215px!important;padding:9px!important}.home-photo-main img{width:84%!important;height:84%!important}.home-photo-main .cap{padding:9px 11px!important}.home-photo-main .cap b{font-size:15px!important}.hero-copy h1{font-size:36px!important}.hero-trust{font-size:10px!important}.proposal-chip{font-size:9px!important}.home-capability{min-height:76px}.brand-copy strong{font-size:18px!important}.product-support-card{padding:17px}.product-support-actions{display:grid}.product-support-actions a{justify-content:center}}
  `;document.head.appendChild(s)}
  function logo(){document.querySelectorAll('.brand-mark').forEach(el=>{if(el.querySelector('img'))return;el.innerHTML=`<img src="${LOGO}" alt="萬里資訊" decoding="sync">`})}
  function quickContact(){
    if(document.body.dataset.page==='admin'||document.querySelector('.quick-contact'))return;
    const desktop=document.createElement('aside');desktop.className='quick-contact';desktop.setAttribute('aria-label','快速聯絡');desktop.innerHTML=`
      <div class="quick-contact-item" data-contact-phone><button type="button" class="quick-contact-btn" aria-expanded="false" aria-label="電話聯絡">${ICONS.phone}<span>電話</span></button><div class="quick-phone-panel"><strong>電話聯絡</strong><a class="quick-phone-link" href="tel:0282217759"><span>新北辦公室</span><b>02-82217759</b></a><a class="quick-phone-link" href="tel:062360139"><span>台南辦公室</span><b>06-2360139</b></a></div></div>
      <div class="quick-contact-item"><a class="quick-contact-btn" href="https://line.me/R/ti/p/@453haosc" target="_blank" rel="noopener" aria-label="LINE 客服">${ICONS.line}<span>LINE</span></a></div>
      <div class="quick-contact-item"><a class="quick-contact-btn" href="contact.html#inquiryForm" aria-label="我要詢問">${ICONS.mail}<span>詢問</span></a></div>`;
    document.body.appendChild(desktop);
    const phoneItem=desktop.querySelector('[data-contact-phone]'),phoneBtn=phoneItem.querySelector('button');
    const closePhone=()=>{phoneItem.classList.remove('is-open');phoneBtn.setAttribute('aria-expanded','false')};
    phoneBtn.addEventListener('click',e=>{e.stopPropagation();const open=!phoneItem.classList.contains('is-open');closePhone();if(open){phoneItem.classList.add('is-open');phoneBtn.setAttribute('aria-expanded','true')}});
    phoneItem.addEventListener('mouseenter',()=>{phoneItem.classList.add('is-open');phoneBtn.setAttribute('aria-expanded','true')});
    phoneItem.addEventListener('mouseleave',closePhone);document.addEventListener('click',e=>{if(!phoneItem.contains(e.target))closePhone()});
    const mobile=document.createElement('nav');mobile.className='mobile-contact-bar';mobile.setAttribute('aria-label','快速聯絡');mobile.innerHTML=`<button type="button" data-mobile-phone aria-expanded="false">${ICONS.phone}<span>撥打電話</span></button><a href="https://line.me/R/ti/p/@453haosc" target="_blank" rel="noopener">${ICONS.line}<span>LINE 詢問</span></a><a href="contact.html#inquiryForm">${ICONS.mail}<span>線上詢問</span></a>`;document.body.appendChild(mobile);
    const mobilePanel=document.createElement('div');mobilePanel.className='mobile-contact-phone';mobilePanel.innerHTML=`<a href="tel:0282217759"><span>新北辦公室</span><b>02-82217759</b></a><a href="tel:062360139"><span>台南辦公室</span><b>06-2360139</b></a>`;document.body.appendChild(mobilePanel);
    const mobileBtn=mobile.querySelector('[data-mobile-phone]');mobileBtn.addEventListener('click',()=>{const open=mobilePanel.classList.toggle('is-open');mobileBtn.setAttribute('aria-expanded',String(open))});
  }
  function productNotFound(){const main=document.querySelector('main');if(!main)return;document.title='找不到產品｜萬里資訊';main.innerHTML=`<div class="container product-not-found"><span class="eyebrow">PRODUCT INFORMATION</span><h1>找不到此產品</h1><p>此產品網址可能已更新，請回到完整產品目錄重新選擇。</p><a class="btn btn-primary" href="products.html">返回產品資訊</a></div>`}
  function verifiedBasicSpecs(p,catName){return `<div class="spec-row"><dt>品牌</dt><dd>${esc(p.brand||'—')}</dd></div><div class="spec-row"><dt>產品名稱</dt><dd>${esc(p.name||'—')}</dd></div><div class="spec-row"><dt>產品分類</dt><dd>${esc(catName)}</dd></div><div class="spec-row"><dt>產品類型</dt><dd>${esc(p.type||p.family||'—')}</dd></div>`}
  function productPageQuality(){
    if(document.body.dataset.page!=='product'||!window.FBStore)return;
    const d=FBStore.getData(),id=params().get('id')||'',p=d.products.find(x=>x.id===id);if(!p){productNotFound();return}
    const cat=d.categories.find(c=>c.id===p.category),catName=cat?.name||'產品資訊';
    let meta=document.querySelector('meta[name="description"]');if(!meta){meta=document.createElement('meta');meta.name='description';document.head.appendChild(meta)}meta.content=(p.intro||`${p.brand} ${p.name}｜${catName}。歡迎洽詢產品規格、選配與相關技術資料。`).replace(/\s+/g,' ').slice(0,155);
    const hi=document.getElementById('productHighlights');if(hi&&(!Array.isArray(p.highlights)||!p.highlights.length||/原官網產品資料|持續補充/.test(hi.textContent))){const block=hi.closest('.detail-block');if(block?.querySelector('.eyebrow'))block.querySelector('.eyebrow').textContent='PRODUCT INFORMATION';if(block?.querySelector('h2'))block.querySelector('h2').textContent='產品資訊';hi.innerHTML=`<li><span>✓</span><span>品牌：${esc(p.brand||'—')}</span></li><li><span>✓</span><span>分類：${esc(catName)}</span></li><li><span>✓</span><span>如需完整規格、選配或相容性確認，歡迎聯絡萬里資訊。</span></li>`}
    const specs=document.getElementById('specTable');const sparseSpecs=!Array.isArray(p.specs)||p.specs.length<3||p.specs.some(row=>/原官網|品牌\s*\/\s*分類/.test(String(row?.[0]||'')));if(specs&&sparseSpecs){const block=specs.closest('.detail-block');if(block?.querySelector('.eyebrow'))block.querySelector('.eyebrow').textContent='BASIC INFORMATION';if(block?.querySelector('h2'))block.querySelector('h2').textContent='基本資料';specs.innerHTML=verifiedBasicSpecs(p,catName)}
    const files=document.getElementById('productFiles');if(files){const valid=Array.isArray(p.files)?p.files:[];if(valid.length){files.innerHTML=valid.map(f=>{const label=esc(f.label||'產品文件'),type=esc(f.type||'文件');return f.url?`<a class="download-row product-files-link" href="${esc(f.url)}" target="_blank" rel="noopener"><span class="download-icon">${ICONS.download}</span><span><small>${type}</small><b>${label}</b></span><span class="download-cta">開啟</span></a>`:`<a class="download-row product-files-link" href="contact.html?item=${encodeURIComponent(p.name)}"><span class="download-icon">${ICONS.download}</span><span><small>${type}</small><b>${label}</b></span><span class="download-cta">洽詢取得</span></a>`}).join('')}else{files.innerHTML=`<div class="product-support-card"><b>需要產品型錄、驅動或操作資料？</b><p>請提供品牌與型號，我們可協助確認適用的產品資料與下載來源。</p><div class="product-support-actions"><a href="https://line.me/R/ti/p/@453haosc" target="_blank" rel="noopener">${ICONS.line} LINE 詢問</a><a href="contact.html?item=${encodeURIComponent(p.name)}">${ICONS.mail} 線上詢問</a></div></div>`}}
  }
  function contactProductPrefill(){if(document.body.dataset.page!=='contact')return;const item=params().get('item'),select=document.getElementById('subject');if(!item||!select)return;const existing=[...select.options].find(o=>o.value===item||o.textContent===item);if(existing){select.value=existing.value;return}const option=document.createElement('option');option.value=`產品洽詢｜${item}`;option.textContent=`產品洽詢｜${item}`;option.selected=true;select.appendChild(option)}
  function run(){style();logo();quickContact();contactProductPrefill();productPageQuality()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  window.addEventListener('farbeyound:datachange',run);
})();


/* ===== assets/js/v2-corporate.js ===== */
(function(){
  const LOGO='assets/images/brand/far-beyound-logo.png';
  function cleanPreviewArtifacts(){
    document.querySelectorAll('.download-cta').forEach(el=>{if(/測試版|preview/i.test(el.textContent))el.textContent='下載';});
    document.querySelectorAll('.empty-state').forEach(el=>{
      const b=el.querySelector('b'),s=el.querySelector('span');
      if(b&&/展示產品|展示文件/.test(b.textContent))b.textContent=b.textContent.replace('展示產品','產品').replace('展示文件','文件');
      if(s&&/正式版|管理介面|後台/.test(s.textContent))s.textContent='如需相關資料，歡迎與我們聯絡。';
    });
    document.querySelectorAll('.footer-bottom span').forEach(el=>{
      if(/新版網站|PREVIEW|v0\.|網站提案預覽環境/i.test(el.textContent))el.textContent='企業條碼與自動識別整合服務';
    });
  }
  function run(){
    document.querySelectorAll('.proposal-chip,.home-capability-band,.brand-band').forEach(el=>el.remove());
    document.querySelectorAll('.brand-mark').forEach(el=>{if(!el.querySelector('img'))el.innerHTML=`<img src="${LOGO}" alt="" decoding="sync">`});
    cleanPreviewArtifacts();
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest?.('.demo-download');
    if(!b)return;
    e.preventDefault();e.stopImmediatePropagation();
    if(window.FB?.toast)window.FB.toast('檔案連結正在移轉整理中');
  },true);
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,120);setTimeout(run,350)});
  if(document.readyState!=='loading')setTimeout(run,0);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,40));
})();


/* ===== assets/js/v3-refinement.js ===== */
(function(){
  const DOWNLOAD_ORDER=['Zebra','Argox','TSC','GoDEX','TOSHIBA','SATO','Honeywell','遠端連線','Microsoft'];
  const BRAND_LOGOS={
    zebra:'assets/images/brands/zebra.png',argox:'assets/images/brands/argox.png',tsc:'assets/images/brands/tsc.png',godex:'assets/images/brands/godex.png',toshiba:'assets/images/brands/toshiba.png',sato:'assets/images/brands/sato.png',honeywell:'assets/images/brands/honeywell.png',fastech:'assets/images/brands/fastech.svg',numa:'assets/images/brands/numa.png',datalogic:'assets/images/brands/datalogic.png'
  };
  function applyBrandIdentity(){
    document.querySelectorAll('.brand-copy strong').forEach(el=>{if(!el.querySelector('.brand-reg'))el.insertAdjacentHTML('beforeend','<sup class="brand-reg" aria-label="registered trademark">®</sup>')});
    document.querySelectorAll('.header-inner .brand-copy small').forEach(el=>{el.textContent='FAR-BEYOUND INFORMATION'});
    document.querySelectorAll('.footer-brand .brand-copy small').forEach(el=>{el.textContent='FAR-BEYOUND INFORMATION'});
  }
  function brandFromHref(el){try{return new URL(el.href,location.href).searchParams.get('brand')||''}catch(e){return ''}}
  function upgradeBrandPortfolio(){
    const note=document.querySelector('.brand-portfolio-head>p');if(note)note.textContent='多品牌設備選型、耗材供應與技術服務';
    document.querySelectorAll('.brand-portfolio .brand-wordmark').forEach(a=>{
      if(a.dataset.logoReady==='1')return;
      const name=(brandFromHref(a)||a.textContent||'').trim(),key=name.toLowerCase().replace(/[^a-z0-9]/g,'');
      let src=BRAND_LOGOS[key],alt=name;
      if(key==='honeywell'&&a.closest('.brand-family')&&!a.closest('.brand-family').classList.contains('scanner')){src='assets/images/brands/datamax-oneil.png';alt='Honeywell (Datamax / Intermec)'}
      if(!src)return;
      a.dataset.logoReady='1';a.setAttribute('aria-label',name+' 產品');
      const img=document.createElement('img');img.className='brand-logo-img';img.src=src;img.alt=alt;img.loading='eager';img.decoding='async';
      const label=document.createElement('span');label.className='brand-logo-label';label.textContent=name;a.replaceChildren(img,label);
    });
  }
  function upgradeProductMega(){
    const menu=document.querySelector('.nav-item.has-mega .mega-menu');if(!menu||menu.dataset.v3==='1')return;menu.dataset.v3='1';
    const brandLinks=(category,brands)=>brands.map(b=>`<a href="products.html?category=${category}&brand=${encodeURIComponent(b[0])}"><span>${b[1]||b[0]}</span></a>`).join('');
    const categoryLinks=(items)=>items.map(x=>`<a href="products.html?category=${x[0]}"><span>${x[1]}</span></a>`).join('');
    menu.innerHTML=`<div class="mega-head"><div><span class="eyebrow">PRODUCT INFORMATION</span><h3>產品與品牌</h3></div><a href="products.html" class="text-link">完整產品目錄 →</a></div><div class="v3-product-mega"><div class="v3-mega-group"><div class="v3-mega-title"><span>01</span><div><strong>標籤條碼列印機</strong><small>LABEL PRINTERS</small></div></div><div class="v3-mega-links">${brandLinks('printers',[['Zebra'],['Argox'],['TSC'],['GoDEX'],['TOSHIBA'],['SATO'],['Honeywell','Honeywell (Datamax/Intermec)']])}</div></div><div class="v3-mega-group"><div class="v3-mega-title"><span>02</span><div><strong>條碼掃描器</strong><small>BARCODE SCANNERS</small></div></div><div class="v3-mega-links">${brandLinks('scanners',[['Fastech'],['Zebra'],['Honeywell'],['NUMA'],['Datalogic']])}</div></div><div class="v3-mega-group"><div class="v3-mega-title"><span>03</span><div><strong>自動識別設備</strong><small>AUTO ID</small></div></div><div class="v3-mega-links">${categoryLinks([['rfid','RFID 設備'],['mobile','行動電腦'],['labels','標籤貼紙與碳帶']])}</div></div><div class="v3-mega-group"><div class="v3-mega-title"><span>04</span><div><strong>服務與軟體</strong><small>SERVICE</small></div></div><div class="v3-mega-links">${categoryLinks([['printing','標籤貼紙代印'],['software','標籤軟體'],['parts','標籤機維修 / 配件']])}</div></div></div>`;
  }
  function orderIndex(name){let n=name;if(n.startsWith('Honeywell'))n='Honeywell';if(n.startsWith('遠端連線'))n='遠端連線';const i=DOWNLOAD_ORDER.indexOf(n);return i<0?999:i}
  function fixDownloadNavigation(){
    document.querySelectorAll('.subnav-panel').forEach(panel=>{const links=[...panel.querySelectorAll('.subnav-link')].filter(a=>a.href.includes('downloads.html?brand='));if(!links.length)return;const grid=links[0].parentElement;links.sort((a,b)=>orderIndex(brandFromHref(a))-orderIndex(brandFromHref(b))).forEach(a=>grid.appendChild(a))});
    document.querySelectorAll('.mobile-nav-group').forEach(group=>{if(!group.querySelector('summary')?.textContent.includes('下載服務'))return;const box=group.querySelector('.mobile-nav-sub');if(!box)return;const links=[...box.querySelectorAll('a')].filter(a=>a.href.includes('downloads.html?brand='));links.sort((a,b)=>orderIndex(brandFromHref(a))-orderIndex(brandFromHref(b))).forEach(a=>box.appendChild(a))});
  }
  function compactHome(){
    if(document.body.dataset.page!=='home')return;
    document.getElementById('brandShowcase')?.remove();document.getElementById('aboutBand')?.remove();
    const categoryGrid=document.getElementById('homeCategories');categoryGrid?.closest('section')?.remove();
    const grid=document.getElementById('homeProducts');if(grid)[...grid.children].slice(6).forEach(x=>x.remove());
    const news=document.getElementById('homeNews');if(news)[...news.children].slice(3).forEach(x=>x.remove());
  }
  function cleanFooter(){document.querySelectorAll('.footer-bottom span').forEach((el,i)=>{if(i===1||/測試|提案|PREVIEW|v0\./i.test(el.textContent))el.textContent='所有其他商標均為各自所有者之財產'})}
  function run(){applyBrandIdentity();upgradeProductMega();fixDownloadNavigation();compactHome();upgradeBrandPortfolio();cleanFooter()}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,150);setTimeout(run,450);setTimeout(run,800)});
  if(document.readyState!=='loading')setTimeout(run,0);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,100));
})();


/* ===== assets/js/v4-polish.js ===== */
(function(){
  const MAPS={
    '台北總公司':'新北市中和區中山路二段351號10樓之1',
    '台南分公司':'台南市永康區中華路425號4樓之18'
  };
  const mapUrl=address=>`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  let navObserver=null;
  let navApplying=false;

  function desiredNavNode(nav){
    const page=document.body.dataset.page||'';
    const targets={
      products:['products.html'],product:['products.html'],
      downloads:['downloads.html'],solutions:['solutions.html'],cases:['cases.html'],
      news:['news.html'],'news-detail':['news.html'],
      about:['about.html'],locations:['locations.html','about.html'],contact:['contact.html','about.html'],'preview-guide':['about.html']
    }[page]||[];
    const nodes=[...nav.children];
    for(const target of targets){
      const found=nodes.find(node=>{
        const a=node.matches('a')?node:node.querySelector(':scope > a');
        const href=(a?.getAttribute('href')||'').split('?')[0].split('#')[0];
        return href===target;
      });
      if(found)return found;
    }
    return null;
  }

  function currentNav(){
    if(document.body.dataset.page==='admin'||navApplying)return;
    const nav=document.querySelector('.desktop-nav');
    if(!nav)return;
    const active=desiredNavNode(nav);
    if(!active)return;
    const nodes=[...nav.children];
    const activeLink=active.matches('a')?active:active.querySelector(':scope > a');
    const alreadyCorrect=active.classList.contains('current')&&activeLink?.getAttribute('aria-current')==='page'&&nodes.every(node=>node===active||!node.classList.contains('current'));
    if(alreadyCorrect)return;

    navApplying=true;
    nodes.forEach(node=>{
      const a=node.matches('a')?node:node.querySelector(':scope > a');
      const should=node===active;
      node.classList.toggle('current',should);
      a?.classList.toggle('current',should);
      if(should)a?.setAttribute('aria-current','page');
      else a?.removeAttribute('aria-current');
    });
    navApplying=false;
  }

  function observeNav(){
    const nav=document.querySelector('.desktop-nav');
    if(!nav)return;
    if(navObserver)navObserver.disconnect();
    navObserver=new MutationObserver(mutations=>{
      if(navApplying)return;
      if(mutations.some(m=>m.type==='childList'||m.type==='attributes'))requestAnimationFrame(currentNav);
    });
    navObserver.observe(nav,{childList:true,subtree:true,attributes:true,attributeFilter:['class','aria-current']});
  }

  function locationLinks(){
    if(document.body.dataset.page!=='contact')return;
    document.querySelectorAll('#serviceLocations .location-mini').forEach(card=>{
      if(card.querySelector('.location-mini-action'))return;
      const label=card.querySelector('small')?.textContent.trim()||'';
      const address=MAPS[label];
      if(!address)return;
      card.classList.add('is-map-link');
      const a=document.createElement('a');
      a.className='location-mini-action';
      a.href=mapUrl(address);
      a.target='_blank';
      a.rel='noopener';
      a.setAttribute('aria-label',`${label} Google 地圖導航`);
      a.textContent='Google 導航 ↗';
      card.appendChild(a);
    });
  }

  function externalLinkSafety(){
    document.querySelectorAll('a[target="_blank"]').forEach(a=>{
      const rel=new Set((a.getAttribute('rel')||'').split(/\s+/).filter(Boolean));
      rel.add('noopener');
      a.setAttribute('rel',[...rel].join(' '));
    });
  }

  function run(){currentNav();observeNav();locationLinks();externalLinkSafety()}
  document.addEventListener('DOMContentLoaded',()=>{
    setTimeout(run,40);
    setTimeout(currentNav,420);
    setTimeout(currentNav,1100);
    setTimeout(currentNav,2200);
  });
  if(document.readyState!=='loading')setTimeout(run,40);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,120));
})();


/* ===== assets/js/v5-showcase.js ===== */
(function(){
  const PAGE_META={
    products:['標籤列印','條碼掃描','RFID','行動電腦','耗材與維修'],
    product:['產品規格','技術文件','設備洽詢'],
    solutions:['SFIS','WMS','SMT','條碼整合'],
    cases:['製造現場','倉儲管理','流程整合'],
    news:['公司公告','產品消息','系統消息'],
    downloads:['驅動程式','工具程式','標籤軟體','技術文件'],
    about:['1992 成立','台北','台南','AUTO ID'],
    locations:['台北總公司','台南分公司','技術服務'],
    contact:['設備','耗材','維修','系統整合']
  };

  function runtimeFixes(){
    if(document.getElementById('v5RuntimeFixes'))return;
    const style=document.createElement('style');
    style.id='v5RuntimeFixes';
    style.textContent=`
      .mobile-contact-phone{display:none!important}
      @media(max-width:980px){.mobile-contact-phone.is-open{display:block!important}}
    `;
    document.head.appendChild(style);
  }

  function pageMeta(){
    const page=document.body.dataset.page||'';
    const items=PAGE_META[page];
    const hero=document.querySelector('.page-hero .container');
    if(!items||!hero||hero.querySelector('.v5-page-meta'))return;
    const row=document.createElement('div');
    row.className='v5-page-meta';
    row.setAttribute('aria-label','服務重點');
    row.innerHTML=items.map(x=>`<span>${x}</span>`).join('');
    hero.appendChild(row);
  }

  function createSearchTools(placeholder){
    const tools=document.createElement('div');
    tools.className='v5-catalog-tools';
    tools.innerHTML=`<div class="v5-search-wrap"><input class="v5-catalog-search" type="search" autocomplete="off" inputmode="search" placeholder="${placeholder}" aria-label="${placeholder}"></div><span class="v5-search-status" aria-live="polite"></span><button class="v5-search-clear" type="button">清除搜尋</button>`;
    return tools;
  }

  function productSearch(){
    if(document.body.dataset.page!=='products')return;
    const grid=document.getElementById('productGrid');
    const head=document.querySelector('.catalog-head');
    if(!grid||!head)return;
    let tools=document.querySelector('.v5-catalog-tools[data-kind="products"]');
    if(!tools){
      tools=createSearchTools('搜尋品牌、型號或產品名稱');
      tools.dataset.kind='products';
      head.after(tools);
    }
    const input=tools.querySelector('.v5-catalog-search');
    const status=tools.querySelector('.v5-search-status');
    const clear=tools.querySelector('.v5-search-clear');
    const count=document.getElementById('productCount');

    function apply(){
      const q=(input.value||'').trim().toLocaleLowerCase('zh-Hant');
      const cards=[...grid.querySelectorAll('.product-card')];
      let visible=0;
      cards.forEach(card=>{
        const hay=(card.textContent||'').toLocaleLowerCase('zh-Hant');
        const show=!q||hay.includes(q);
        card.hidden=!show;
        if(show)visible++;
      });
      let empty=grid.querySelector('.v5-no-results');
      if(q&&cards.length&&visible===0){
        if(!empty){empty=document.createElement('div');empty.className='v5-no-results';grid.appendChild(empty)}
        empty.textContent=`找不到「${input.value.trim()}」相關產品，可改用品牌或型號關鍵字搜尋。`;
      }else if(empty){empty.remove()}
      status.textContent=q?`顯示 ${visible} / ${cards.length} 項`:`共 ${cards.length} 項產品`;
      if(count)count.textContent=q?`${visible} 項符合`:`${cards.length} 項產品`;
      clear.hidden=!q;
    }

    if(!tools.dataset.bound){
      input.addEventListener('input',apply);
      input.addEventListener('keydown',e=>{if(e.key==='Escape'){input.value='';apply();input.blur()}});
      clear.addEventListener('click',()=>{input.value='';apply();input.focus()});
      document.addEventListener('keydown',e=>{
        if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!/input|textarea|select/i.test(document.activeElement?.tagName||'')){
          e.preventDefault();input.focus();
        }
      });
      const observer=new MutationObserver(()=>requestAnimationFrame(apply));
      observer.observe(grid,{childList:true});
      tools.dataset.bound='1';
    }
    apply();
  }

  function downloadSearch(){
    if(document.body.dataset.page!=='downloads')return;
    const list=document.getElementById('downloadList');
    const head=document.querySelector('.download-content-head');
    if(!list||!head)return;
    let tools=document.querySelector('.v5-download-tools');
    if(!tools){
      tools=createSearchTools('搜尋驅動、軟體或版本');
      tools.classList.remove('v5-catalog-tools');
      tools.classList.add('v5-download-tools');
      head.appendChild(tools);
    }
    const input=tools.querySelector('.v5-catalog-search');
    const status=tools.querySelector('.v5-search-status');
    const clear=tools.querySelector('.v5-search-clear');

    function apply(){
      const q=(input.value||'').trim().toLocaleLowerCase('zh-Hant');
      const rows=[...list.querySelectorAll('.download-item')];
      let visible=0;
      rows.forEach(row=>{
        const show=!q||(row.textContent||'').toLocaleLowerCase('zh-Hant').includes(q);
        row.hidden=!show;if(show)visible++;
      });
      status.textContent=q?`顯示 ${visible} / ${rows.length} 項`:`目前 ${rows.length} 項`;
      clear.hidden=!q;
    }
    if(!tools.dataset.bound){
      input.addEventListener('input',apply);
      input.addEventListener('keydown',e=>{if(e.key==='Escape'){input.value='';apply();input.blur()}});
      clear.addEventListener('click',()=>{input.value='';apply();input.focus()});
      new MutationObserver(()=>requestAnimationFrame(apply)).observe(list,{childList:true});
      tools.dataset.bound='1';
    }
    apply();
  }

  function heroMeta(){
    if(document.body.dataset.page!=='home')return;
    const copy=document.querySelector('.hero.v2-home-hero .hero-copy');
    if(!copy||copy.querySelector('.v5-hero-meta'))return;
    const meta=document.createElement('div');
    meta.className='v5-hero-meta';
    meta.innerHTML='<span>SINCE 1992</span><span>AUTO ID · SMART MANUFACTURING</span>';
    copy.prepend(meta);
  }

  function corporateWording(){
    document.querySelectorAll('a,button').forEach(el=>{
      if(el.textContent.trim()==='免費諮詢')el.textContent='需求洽詢';
    });
  }

  function labelExternalLinks(){
    document.querySelectorAll('a[target="_blank"]').forEach(a=>{
      if(!a.getAttribute('aria-label')&&a.textContent.trim())a.setAttribute('aria-label',`${a.textContent.trim()}（另開新視窗）`);
    });
  }

  function run(){
    runtimeFixes();
    document.documentElement.classList.add('v5-ready');
    heroMeta();
    pageMeta();
    productSearch();
    downloadSearch();
    corporateWording();
    labelExternalLinks();
  }

  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,180);setTimeout(run,850)});
  if(document.readyState!=='loading')setTimeout(run,30);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,120));
})();


/* ===== assets/js/interaction-upgrade.js ===== */
(function(){
  'use strict';

  const NEWS_SLUGS={
    '2026年度萬里資訊員工旅遊公告':'travel-2026',
    '2026 年度萬里資訊員工旅遊公告':'travel-2026',
    '原物料價格調整公告':'material-price',
    '共用印表機 0x0000011b／0x00000709 錯誤處理':'printer-share-error',
    '解決辦法-無法使用共用印表機0x0000011b與0x00000709等錯誤':'printer-share-error',
    'Zebra ZT411 / ZT421：多功能及穩定性佳':'zt411-news',
    'Zebra ZT411 / ZT421 標籤列印機 ，多功能及穩定性佳':'zt411-news',
    'Zebra ZT610 / ZT620：堅固耐用及卓越性能':'zt610-news',
    'Zebra ZT610 / ZT620 工業型標籤列印機 堅固耐用及卓越的性能':'zt610-news'
  };

  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function addStyle(){
    if(document.getElementById('interactionUpgradeStyle'))return;
    const s=document.createElement('style');
    s.id='interactionUpgradeStyle';
    s.textContent=`
      .hero-trust a{color:inherit;text-decoration:none;position:relative;transition:color .16s ease}
      .hero-trust a:hover,.hero-trust a:focus-visible{color:var(--v5-cyan,#148da7)}
      .hero-trust a:focus-visible,.v5-cred-item.interactive:focus-visible,.scope-card.interactive:focus-visible,.case-page-card.interactive:focus-visible,.news-card.interactive:focus-visible,.location-card a:focus-visible,.product-image-zoom:focus-visible{outline:2px solid var(--v5-cyan,#148da7);outline-offset:3px}
      a.v5-cred-item{color:inherit;text-decoration:none;position:relative;transition:background .16s ease}
      a.v5-cred-item:hover{background:#173b58}
      a.v5-cred-item:after{content:'→';position:absolute;right:16px;top:14px;color:#6fb9c8;font-size:12px;opacity:0;transform:translateX(-3px);transition:.16s ease}
      a.v5-cred-item:hover:after{opacity:1;transform:none}
      a.scope-card{display:block;color:inherit;text-decoration:none;position:relative;transition:background .16s ease,border-color .16s ease}
      a.scope-card:hover{background:#f5f9fa}
      a.scope-card:after{content:'了解更多 →';display:block;margin-top:14px;color:var(--v5-cyan,#148da7);font-size:10px;font-weight:700}
      a.case-page-card{color:inherit;text-decoration:none;position:relative;transition:background .16s ease,box-shadow .16s ease}
      a.case-page-card:hover{background:#f7fafb;box-shadow:inset 0 -2px 0 var(--v5-cyan,#148da7)}
      .case-page-link{display:inline-flex;margin-top:14px;color:var(--v5-cyan,#148da7);font-size:10px;font-weight:700}
      a.news-card{color:inherit;text-decoration:none;cursor:pointer;transition:background .16s ease,border-color .16s ease}
      a.news-card:hover{background:#f7fafb}
      a.news-card .text-link{pointer-events:none}
      .location-card dd a{color:inherit;text-decoration:none;border-bottom:1px solid transparent;transition:color .16s ease,border-color .16s ease}
      .location-card dd a:hover{color:var(--v5-cyan,#148da7);border-bottom-color:currentColor}
      .location-card dd a[href^='https://www.google.com/maps']{display:inline-flex;align-items:center;gap:5px}
      .location-card dd a[href^='https://www.google.com/maps']:after{content:'↗';font-size:10px;color:var(--v5-cyan,#148da7)}
      .product-detail-visual{position:relative}
      .product-image-zoom{position:absolute;right:12px;bottom:12px;z-index:3;display:inline-flex;align-items:center;gap:6px;min-height:34px;padding:0 10px;border:1px solid #d6e0e6;background:rgba(255,255,255,.94);color:#17324d;font:inherit;font-size:10px;font-weight:700;cursor:pointer;box-shadow:0 5px 16px rgba(17,43,67,.08)}
      .product-image-zoom:hover{border-color:#9bb8c5;background:#fff;color:var(--v5-cyan,#148da7)}
      .product-lightbox{position:fixed;inset:0;z-index:9999;display:none;place-items:center;padding:28px;background:rgba(8,25,39,.88)}
      .product-lightbox.is-open{display:grid}
      .product-lightbox-inner{position:relative;width:min(900px,96vw);height:min(720px,86vh);display:grid;place-items:center;background:#fff;padding:32px;border-radius:4px}
      .product-lightbox img{max-width:100%;max-height:100%;object-fit:contain}
      .product-lightbox-close{position:absolute;right:10px;top:10px;width:38px;height:38px;border:1px solid #d4dee4;background:#fff;color:#17324d;font-size:22px;line-height:1;cursor:pointer}
      @media(max-width:680px){.v5-cred-item.interactive:after{display:none}.product-image-zoom{right:8px;bottom:8px}.product-lightbox{padding:14px}.product-lightbox-inner{padding:24px 12px 16px}}
    `;
    document.head.appendChild(s);
  }

  function replaceWithLink(el,href,className){
    if(!el||el.tagName==='A')return el;
    const a=document.createElement('a');
    [...el.attributes].forEach(attr=>a.setAttribute(attr.name,attr.value));
    a.href=href;
    if(className)a.classList.add(className);
    a.innerHTML=el.innerHTML;
    el.replaceWith(a);
    return a;
  }

  function homeTrust(){
    const wrap=document.querySelector('.hero-trust');
    if(!wrap||wrap.dataset.interactive==='1')return;
    const targets=['products.html','products.html?category=labels','products.html?category=parts','solutions.html'];
    [...wrap.children].forEach((el,i)=>replaceWithLink(el,targets[i]||'products.html'));
    wrap.dataset.interactive='1';
  }

  function credibility(){
    const items=[...document.querySelectorAll('.v5-credibility .v5-cred-item')];
    if(!items.length)return;
    const targets=['about.html','locations.html','products.html','solutions.html'];
    items.forEach((el,i)=>{
      const a=replaceWithLink(el,targets[i]||'about.html','interactive');
      if(a)a.setAttribute('aria-label',`${a.textContent.trim()}－查看相關內容`);
    });
  }

  function aboutScope(){
    if(document.body.dataset.page!=='about')return;
    const targets=['products.html','products.html?category=labels','products.html?category=parts','solutions.html'];
    document.querySelectorAll('.service-scope .scope-card').forEach((el,i)=>replaceWithLink(el,targets[i]||'products.html','interactive'));
  }

  function caseTarget(card){
    const txt=(card.textContent||'').toLowerCase();
    if(txt.includes('sfis'))return 'solutions.html#sfis';
    if(txt.includes('wms')||txt.includes('倉儲')||txt.includes('出貨'))return 'solutions.html#wms';
    if(txt.includes('smt'))return 'solutions.html#smt';
    return 'solutions.html#barcode';
  }

  function caseCards(){
    if(document.body.dataset.page!=='cases')return;
    document.querySelectorAll('#casePageGrid .case-page-card').forEach(card=>{
      if(card.tagName==='A')return;
      const a=replaceWithLink(card,caseTarget(card),'interactive');
      if(a&&!a.querySelector('.case-page-link'))a.insertAdjacentHTML('beforeend','<span class="case-page-link">了解相關方案 →</span>');
    });
  }

  function newsHref(card){
    const existing=card.querySelector('a[href*="news-detail.html"]');
    if(existing)return existing.getAttribute('href');
    const title=card.querySelector('h2,h3')?.textContent.trim()||'';
    const slug=NEWS_SLUGS[title];
    return slug?`news-detail.html?id=${encodeURIComponent(slug)}`:'';
  }

  function upgradeNewsCard(card){
    if(!card||card.tagName==='A')return;
    const href=newsHref(card);if(!href)return;
    const a=document.createElement('a');
    [...card.attributes].forEach(attr=>a.setAttribute(attr.name,attr.value));
    a.classList.add('interactive');a.href=href;
    a.innerHTML=card.innerHTML;
    a.querySelectorAll('a').forEach(inner=>{
      const span=document.createElement('span');
      [...inner.attributes].forEach(attr=>{if(attr.name!=='href'&&attr.name!=='target'&&attr.name!=='rel')span.setAttribute(attr.name,attr.value)});
      span.innerHTML=inner.innerHTML;inner.replaceWith(span);
    });
    const oldButton=a.querySelector('button.demo-news');
    if(oldButton){const span=document.createElement('span');span.className='text-link';span.innerHTML=oldButton.innerHTML;oldButton.replaceWith(span)}
    card.replaceWith(a);
  }

  function newsCards(){
    if(document.body.dataset.page==='news')document.querySelectorAll('#newsList .news-card').forEach(upgradeNewsCard);
    if(document.body.dataset.page==='home'){
      document.querySelectorAll('#homeNews .news-row').forEach(row=>{
        const title=row.querySelector('h3')?.textContent.trim()||'';
        const slug=NEWS_SLUGS[title];
        if(slug)row.href=`news-detail.html?id=${encodeURIComponent(slug)}`;
      });
    }
  }

  function locations(){
    if(document.body.dataset.page!=='locations')return;
    document.querySelectorAll('.location-card dl').forEach(dl=>{
      const kids=[...dl.children];
      for(let i=0;i<kids.length-1;i++){
        const dt=kids[i],dd=kids[i+1];
        if(dt.tagName!=='DT'||dd.tagName!=='DD'||dd.querySelector('a'))continue;
        const label=dt.textContent.trim(),value=dd.textContent.trim();let href='';
        if(label==='電話')href='tel:'+value.replace(/[^\d+]/g,'');
        else if(label.toLowerCase().includes('e-mail'))href='mailto:'+value;
        else if(label==='地址')href='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(value);
        if(href){
          const a=document.createElement('a');a.href=href;a.textContent=value;
          if(href.startsWith('https://')){a.target='_blank';a.rel='noopener';a.setAttribute('aria-label',value+'－開啟 Google Maps 導航')}
          dd.replaceChildren(a);
        }
      }
    });
  }

  function productLightbox(){
    if(document.body.dataset.page!=='product')return;
    const visual=document.querySelector('.product-detail-visual');
    const img=visual?.querySelector('img');
    if(!visual||!img||visual.querySelector('.product-image-zoom'))return;
    const btn=document.createElement('button');btn.type='button';btn.className='product-image-zoom';btn.innerHTML='⌕ 放大圖片';btn.setAttribute('aria-label','放大產品圖片');visual.appendChild(btn);
    let box=document.querySelector('.product-lightbox');
    if(!box){
      box=document.createElement('div');box.className='product-lightbox';box.setAttribute('aria-hidden','true');box.innerHTML='<div class="product-lightbox-inner" role="dialog" aria-modal="true" aria-label="產品圖片預覽"><button type="button" class="product-lightbox-close" aria-label="關閉圖片預覽">×</button><img alt=""></div>';document.body.appendChild(box);
    }
    const preview=box.querySelector('img'),close=box.querySelector('.product-lightbox-close');
    const open=()=>{preview.src=img.currentSrc||img.src;preview.alt=img.alt||'產品圖片';box.classList.add('is-open');box.setAttribute('aria-hidden','false');close.focus()};
    const shut=()=>{box.classList.remove('is-open');box.setAttribute('aria-hidden','true');btn.focus()};
    btn.addEventListener('click',open);close.addEventListener('click',shut);box.addEventListener('click',e=>{if(e.target===box)shut()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&box.classList.contains('is-open'))shut()});
  }

  function run(){
    addStyle();homeTrust();credibility();aboutScope();caseCards();newsCards();locations();productLightbox();
  }

  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,120);setTimeout(run,500);setTimeout(run,1000)});
  if(document.readyState!=='loading')setTimeout(run,20);
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,100));
  const observer=new MutationObserver(()=>requestAnimationFrame(()=>{caseCards();newsCards();productLightbox()}));
  document.addEventListener('DOMContentLoaded',()=>observer.observe(document.body,{childList:true,subtree:true}),{once:true});
})();


/* Load shared aux controls after DOMContentLoaded; HTML markers suppress old per-file injections. */
(function(){
  const current=document.currentScript;
  const build=(()=>{try{return new URL(current?.src||'',location.href).searchParams.get('v')||'20260918-1010'}catch(_){return'20260918-1010'}})();
  const load=()=>{if(document.querySelector('script[data-inner-aux-bundle]'))return;const s=document.createElement('script');s.src='assets/js/inner-aux-bundle.js?v='+encodeURIComponent(build);s.setAttribute('data-inner-aux-bundle','1');document.body.appendChild(s)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
})();
