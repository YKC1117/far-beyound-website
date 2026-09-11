(function(){
  'use strict';
  if(window.__fbAdminProductTools)return;window.__fbAdminProductTools=true;
  const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];
  function data(){return window.FBStore?.getData?.()||{products:[],categories:[]}}
  function fillCategories(){
    const sel=$('#adminProductCategoryFilter');if(!sel)return;
    const current=sel.value,d=data();
    sel.innerHTML='<option value="">全部分類</option>'+d.categories.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
    if([...sel.options].some(o=>o.value===current))sel.value=current;
  }
  function ensurePublishFilter(){
    const tools=$('.admin-product-tools');if(!tools||$('#adminProductPublishFilter'))return;
    const sel=document.createElement('select');sel.id='adminProductPublishFilter';sel.setAttribute('aria-label','依上下架狀態篩選');sel.innerHTML='<option value="">全部狀態</option><option value="published">只看上架</option><option value="hidden">只看下架</option>';
    const featured=$('#adminProductFeaturedOnly');featured?.insertAdjacentElement('beforebegin',sel);
  }
  function apply(){
    const body=$('#adminProductRows');if(!body)return;
    const q=($('#adminProductSearch')?.value||'').trim().toLowerCase();
    const cat=$('#adminProductCategoryFilter')?.value||'';
    const publish=$('#adminProductPublishFilter')?.value||'';
    const featured=!!$('#adminProductFeaturedOnly')?.checked;
    const d=data(),byId=new Map(d.products.map(p=>[String(p.id),p]));let shown=0;
    [...body.rows].forEach(row=>{
      const id=row.querySelector('.edit-product')?.dataset.id||row.dataset.productId||'';
      const p=byId.get(String(id));const isPublished=p?.published!==false;
      const hay=p?[p.id,p.brand,p.family,p.type,p.name,p.subtitle,p.status,p.intro].join(' ').toLowerCase():row.textContent.toLowerCase();
      const publishOk=!publish||(publish==='published'?isPublished:!isPublished);
      const ok=(!q||hay.includes(q))&&(!cat||p?.category===cat)&&publishOk&&(!featured||!!p?.featured);
      row.hidden=!ok;if(ok)shown++;
    });
    const total=d.products.length,c=$('#adminProductVisibleCount');if(c)c.textContent=`顯示 ${shown}／${total} 項`;
    const empty=$('#adminProductFilterEmpty');if(empty)empty.hidden=shown!==0;
  }
  function productFromRow(row){const id=row?.querySelector('.edit-product')?.dataset.id||row?.dataset.productId||'';return data().products.find(p=>String(p.id)===String(id))||null}
  function reloadAfterPublish(){let done=false;const go=()=>{if(done)return;done=true;setTimeout(()=>location.reload(),180)};window.addEventListener('farbeyound:cloudsaved',go,{once:true});setTimeout(()=>{if(!done&&$('#adminCloudState')?.textContent?.includes('已上傳'))go()},1600)}
  function saveAndRefresh(d){const out=FBStore.saveData(d);if(out===false)return false;reloadAfterPublish();return true}
  function uniqueCopyId(base,list){let root=(String(base||'product')+'-copy').replace(/[^a-zA-Z0-9_-]+/g,'-'),id=root,n=2;while(list.some(p=>String(p.id)===id))id=root+'-'+n++;return id}
  function toggleFeatured(p){
    const d=data(),item=d.products.find(x=>String(x.id)===String(p.id));if(!item)return;
    if(item.published===false){alert('此產品目前已下架。\n\n請先上架產品，再設定為首頁精選。');return}
    const next=!item.featured;if(!confirm(`${next?'加入':'移出'}首頁精選？\n\n${item.brand||''} ${item.name||item.id}\n\n儲存時會要求輸入發布密碼。`))return;
    item.featured=next;saveAndRefresh(d);
  }
  function togglePublished(p){
    const d=data(),item=d.products.find(x=>String(x.id)===String(p.id));if(!item)return;
    const next=item.published===false;
    const name=`${item.brand||''} ${item.name||item.id}`.trim();
    const msg=next?`確定要上架這項產品？\n\n「${name}」\n\n上架後會重新出現在前台產品列表。`:`確定要下架這項產品？\n\n「${name}」\n\n下架後資料仍保留在後台，但前台不再顯示；首頁精選也會自動取消。`;
    if(!confirm(msg+'\n\n儲存時會要求輸入發布密碼。'))return;
    item.published=next;if(!next)item.featured=false;saveAndRefresh(d);
  }
  function duplicateProduct(p){
    const d=data(),item=d.products.find(x=>String(x.id)===String(p.id));if(!item)return;
    if(!confirm(`確定複製這項產品？\n\n${item.brand||''} ${item.name||item.id}\n\n系統會建立一份「下架中的副本」，方便先修改完成再上架。`))return;
    const copy=JSON.parse(JSON.stringify(item));copy.id=uniqueCopyId(item.id,d.products);copy.name=(item.name||item.id)+'（副本）';copy.featured=false;copy.published=false;
    const i=d.products.findIndex(x=>String(x.id)===String(item.id));d.products.splice(i+1,0,copy);saveAndRefresh(d);
  }
  function deleteProduct(p,row){
    const d=data(),i=d.products.findIndex(x=>String(x.id)===String(p.id));if(i<0)return;
    const name=`${p.brand||''} ${p.name||p.id}`.trim();
    if(!confirm(`確定要刪除這項產品？\n\n「${name}」\n\n刪除後會同步到共用網站；若誤刪，可從「變更紀錄／還原」找回。`))return;
    d.products.splice(i,1);if(saveAndRefresh(d)&&row)row.style.opacity='.45';
  }
  function decorate(){
    const body=$('#adminProductRows');if(!body)return;const d=data();
    [...body.rows].forEach(row=>{
      const p=productFromRow(row);if(!p)return;row.dataset.productId=p.id;
      const isPublished=p.published!==false;
      const status=row.cells?.[3];if(status){status.querySelectorAll('.pm-state-wrap').forEach(x=>x.remove());status.insertAdjacentHTML('beforeend',`<div class="pm-state-wrap"><span class="pm-pill ${isPublished?'published':'hidden'}">${isPublished?'前台顯示':'已下架'}</span>${p.featured?'<span class="pm-pill on">首頁精選</span>':''}</div>`)}
      const cell=row.cells?.[row.cells.length-1];if(!cell)return;
      cell.querySelector('.pm-actions')?.remove();
      const box=document.createElement('span');box.className='pm-actions';box.innerHTML=`<a class="icon-text" href="product.html?id=${encodeURIComponent(p.id)}" target="_blank">預覽</a><button type="button" class="icon-text pm-publish">${isPublished?'下架':'上架'}</button><button type="button" class="icon-text pm-featured">${p.featured?'取消精選':'首頁精選'}</button><button type="button" class="icon-text pm-copy">複製</button>`;cell.insertBefore(box,cell.firstChild);
      $('.pm-publish',box).onclick=e=>{e.stopPropagation();togglePublished(p)};$('.pm-featured',box).onclick=e=>{e.stopPropagation();toggleFeatured(p)};$('.pm-copy',box).onclick=e=>{e.stopPropagation();duplicateProduct(p)};
      if(![...cell.querySelectorAll('button')].some(b=>b.textContent.trim().includes('刪除'))){const b=document.createElement('button');b.type='button';b.className='icon-text danger pm-delete';b.textContent='刪除';cell.appendChild(b)}
    });
    let sum=$('#pmSummary');const panel=$('#products');if(panel&&!sum){sum=document.createElement('div');sum.id='pmSummary';sum.className='pm-summary';panel.querySelector('.admin-panel-head')?.insertAdjacentElement('afterend',sum)}
    const published=d.products.filter(p=>p.published!==false).length,hidden=d.products.length-published;
    if(sum)sum.innerHTML=`<span><b>${d.products.length}</b> 項產品</span><span><b>${published}</b> 項上架</span><span><b>${hidden}</b> 項下架</span><span><b>${d.products.filter(p=>p.featured&&p.published!==false).length}</b> 項首頁精選</span><small>建議：先下架修改，確認完成後再上架。</small>`;
  }
  function humanizeForm(){
    const id=$('#admin_id');if(id){const l=id.closest('.field')?.querySelector('label');if(l)l.textContent='系統識別碼（通常不用改） *';id.placeholder='例如 zebra-zt411'}
    const st=$('#admin_status');if(st){const l=st.closest('.field')?.querySelector('label');if(l)l.textContent='產品狀態／備註';st.placeholder='例如：熱銷、現貨、詢價'}
    const f=$('#productAdminForm');if(f&&!$('#pmFormHelp',f)){const n=document.createElement('div');n.id='pmFormHelp';n.className='pm-form-help';n.textContent='新產品預設先下架。建議內容確認完成後再上架；每次儲存或上下架都需要輸入發布密碼。';f.insertBefore(n,f.firstChild)}
  }
  function style(){if($('#pmStyle'))return;const s=document.createElement('style');s.id='pmStyle';s.textContent='.pm-actions{display:inline-flex;gap:6px;align-items:center;margin-right:6px;flex-wrap:wrap}.pm-actions button{background:none;border:0;padding:0;cursor:pointer}.pm-state-wrap{display:flex;gap:4px;flex-wrap:wrap;margin-top:4px}.pm-pill{display:inline-block;padding:3px 7px;border-radius:999px;background:#f1f5f7;color:#71838d;font-size:9px;font-weight:900}.pm-pill.on,.pm-pill.published{background:#eaf8f1;color:#23744e}.pm-pill.hidden{background:#fff1e8;color:#9a5a20}.pm-summary{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:10px 18px;border-bottom:1px solid #edf1f3;background:#fafcfd;color:#657985;font-size:10px}.pm-summary span{padding:4px 8px;border:1px solid #e1e9ed;border-radius:8px;background:#fff}.pm-summary b{color:#23485a}.pm-summary small{margin-left:auto}.pm-form-help{margin:0 0 14px;padding:10px 12px;border:1px solid #e1ecef;border-radius:10px;background:#f4f9fb;color:#58717e;font-size:10px;line-height:1.6}';document.head.appendChild(s)}
  function captureDelete(e){const btn=e.target.closest?.('#products button');if(!btn||btn.classList.contains('pm-featured')||btn.classList.contains('pm-copy')||btn.classList.contains('pm-publish')||!btn.textContent.trim().includes('刪除'))return;const row=btn.closest('tr'),p=productFromRow(row);if(!p)return;e.preventDefault();e.stopImmediatePropagation();deleteProduct(p,row)}
  function init(){
    if(document.body.dataset.page!=='admin')return;const body=$('#adminProductRows');if(!body)return;style();humanizeForm();ensurePublishFilter();fillCategories();decorate();
    ['adminProductSearch','adminProductCategoryFilter','adminProductPublishFilter','adminProductFeaturedOnly'].forEach(id=>{const el=$('#'+id);if(el&&!el.dataset.bound){el.dataset.bound='1';el.addEventListener(id==='adminProductSearch'?'input':'change',apply)}});
    const clear=$('#adminProductFilterClear');if(clear&&!clear.dataset.bound){clear.dataset.bound='1';clear.onclick=()=>{if($('#adminProductSearch'))$('#adminProductSearch').value='';if($('#adminProductCategoryFilter'))$('#adminProductCategoryFilter').value='';if($('#adminProductPublishFilter'))$('#adminProductPublishFilter').value='';if($('#adminProductFeaturedOnly'))$('#adminProductFeaturedOnly').checked=false;apply()}};
    if(!body.dataset.watch){body.dataset.watch='1';new MutationObserver(()=>setTimeout(()=>{decorate();apply()},0)).observe(body,{childList:true,subtree:true})}
    if(!document.body.dataset.pmDeleteBound){document.body.dataset.pmDeleteBound='1';document.addEventListener('click',captureDelete,true)}
    apply();
  }
  document.addEventListener('DOMContentLoaded',()=>[100,380,900].forEach(t=>setTimeout(init,t)));
  window.addEventListener('farbeyound:datachange',()=>setTimeout(()=>{ensurePublishFilter();fillCategories();decorate();apply()},60));
})();