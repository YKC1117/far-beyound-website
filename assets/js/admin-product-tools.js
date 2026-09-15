(function(){
'use strict';
if(window.__fbAdminProductTools)return;
window.__fbAdminProductTools=true;

const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const selectedIds=new Set();
const CHECKS=[['image','圖片'],['intro','產品介紹'],['highlights','產品特色'],['specs','產品規格'],['files','產品文件']];

function data(){return FBStore?.getData?.()||{products:[],categories:[]}}
function missing(p){return CHECKS.filter(([k])=>Array.isArray(p?.[k])?!p[k].length:!String(p?.[k]||'').trim()).map(x=>x[1])}
function complete(p){return !missing(p).length}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}

function filters(){
  const t=$('.admin-product-tools');
  if(!t)return;
  if(!$('#adminProductPublishFilter'))$('#adminProductFeaturedOnly').insertAdjacentHTML('beforebegin','<select id="adminProductPublishFilter" aria-label="產品上架狀態"><option value="">全部狀態</option><option value="published">只看上架</option><option value="hidden">只看下架</option></select>');
  if(!$('#adminProductCompletenessFilter'))$('#adminProductFeaturedOnly').insertAdjacentHTML('beforebegin','<select id="adminProductCompletenessFilter" aria-label="產品資料完整度"><option value="">全部完整度</option><option value="complete">資料完整</option><option value="incomplete">資料不完整</option></select>');
  if(!$('#adminProductModelFilter'))$('#adminProductFeaturedOnly').insertAdjacentHTML('beforebegin','<select id="adminProductModelFilter" aria-label="商品型號狀態"><option value="">全部型號狀態</option><option value="missing">型號待確認</option></select>');
}

function fillCats(){
  const s=$('#adminProductCategoryFilter');
  if(!s)return;
  const v=s.value;
  s.innerHTML='<option value="">全部分類</option>'+data().categories.map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('');
  s.value=[...s.options].some(o=>o.value===v)?v:'';
}

function batchbar(){
  if($('#pmBatchBar'))return;
  $('.admin-product-tools')?.insertAdjacentHTML('afterend','<div id="pmBatchBar" class="pm-batch-bar"><label><input id="pmSelectVisible" type="checkbox"> 選取目前顯示</label><span id="pmSelectedCount">已選 0 項</span><div class="pm-batch-actions"><button class="btn btn-secondary btn-sm" id="pmBatchPublish">批次上架</button><button class="btn btn-secondary btn-sm" id="pmBatchHide">批次下架</button><button class="btn btn-secondary btn-sm" id="pmBatchFeatured">設為首頁精選</button><button class="btn btn-secondary btn-sm" id="pmBatchUnfeatured">取消首頁精選</button><button class="btn btn-secondary btn-sm" id="pmClearSelected">取消選取</button></div></div>');
  $('#pmSelectVisible').onchange=e=>visible().forEach(r=>{const c=$('.pm-select',r);if(c){c.checked=e.target.checked;select(c)}});
  $('#pmClearSelected').onclick=()=>{selectedIds.clear();$$('.pm-select').forEach(c=>c.checked=false);updateBatch()};
  $('#pmBatchPublish').onclick=()=>batch('publish');
  $('#pmBatchHide').onclick=()=>batch('hide');
  $('#pmBatchFeatured').onclick=()=>batch('featured');
  $('#pmBatchUnfeatured').onclick=()=>batch('unfeatured');
}

function visible(){return [...($('#adminProductRows')?.rows||[])].filter(r=>!r.hidden)}
function select(c){c.checked?selectedIds.add(c.dataset.id):selectedIds.delete(c.dataset.id);updateBatch()}
function updateBatch(){
  const n=selectedIds.size;
  if($('#pmSelectedCount'))$('#pmSelectedCount').textContent=`已選 ${n} 項`;
  ['pmBatchPublish','pmBatchHide','pmBatchFeatured','pmBatchUnfeatured','pmClearSelected'].forEach(x=>{if($('#'+x))$('#'+x).disabled=!n});
}

function setQuickView(mode){
  const pub=$('#adminProductPublishFilter');
  const qual=$('#adminProductCompletenessFilter');
  const model=$('#adminProductModelFilter');
  const feat=$('#adminProductFeaturedOnly');
  if(pub)pub.value='';
  if(qual)qual.value='';
  if(model)model.value='';
  if(feat)feat.checked=false;
  if(mode==='published'&&pub)pub.value='published';
  if(mode==='hidden'&&pub)pub.value='hidden';
  if(mode==='incomplete'&&qual)qual.value='incomplete';
  if(mode==='featured'&&feat)feat.checked=true;
  if(mode==='missing-model'&&model)model.value='missing';
  apply();
}

function activeQuickView(){
  const pub=$('#adminProductPublishFilter')?.value||'';
  const qual=$('#adminProductCompletenessFilter')?.value||'';
  const model=$('#adminProductModelFilter')?.value||'';
  const feat=!!$('#adminProductFeaturedOnly')?.checked;
  if(model==='missing'&&!pub&&!qual&&!feat)return'missing-model';
  if(feat&&!pub&&!qual&&!model)return'featured';
  if(qual==='incomplete'&&!pub&&!model&&!feat)return'incomplete';
  if(pub==='published'&&!qual&&!model&&!feat)return'published';
  if(pub==='hidden'&&!qual&&!model&&!feat)return'hidden';
  if(!pub&&!qual&&!model&&!feat)return'all';
  return'';
}

function refreshQuickState(){
  const active=activeQuickView();
  $$('#pmSummary [data-product-view]').forEach(btn=>{
    const on=btn.dataset.productView===active;
    btn.classList.toggle('active',on);
    btn.setAttribute('aria-pressed',String(on));
  });
}

function apply(){
  const b=$('#adminProductRows');
  if(!b)return;
  const q=($('#adminProductSearch')?.value||'').trim().toLowerCase();
  const cat=$('#adminProductCategoryFilter')?.value||'';
  const pub=$('#adminProductPublishFilter')?.value||'';
  const qual=$('#adminProductCompletenessFilter')?.value||'';
  const modelState=$('#adminProductModelFilter')?.value||'';
  const feat=$('#adminProductFeaturedOnly')?.checked;
  const d=data();
  const map=new Map(d.products.map(p=>[String(p.id),p]));
  let n=0;
  [...b.rows].forEach(r=>{
    const p=map.get(r.dataset.productId||$('.edit-product',r)?.dataset.id);
    const on=p?.published!==false;
    const hay=p?[p.id,p.brand,p.model,p.family,p.type,p.name,p.subtitle,p.status].join(' ').toLowerCase():'';
    const ok=(!q||hay.includes(q))&&(!cat||p?.category===cat)&&(!pub||(pub==='published'?on:!on))&&(!qual||(qual==='complete'?complete(p):!complete(p)))&&(!modelState||(modelState==='missing'&&!String(p?.model||'').trim()))&&(!feat||p?.featured);
    r.hidden=!ok;
    if(ok)n++;
  });
  if($('#adminProductVisibleCount'))$('#adminProductVisibleCount').textContent=`顯示 ${n}／${d.products.length} 項`;
  if($('#adminProductFilterEmpty'))$('#adminProductFilterEmpty').hidden=!!n;
  refreshQuickState();
  updateBatch();
}

function product(r){
  const id=r?.dataset.productId||$('.edit-product',r)?.dataset.id;
  return data().products.find(p=>String(p.id)===String(id));
}

function save(d){
  const o=FBStore.saveData(d);
  if(o===false)return false;
  let done=false;
  const go=()=>{if(done)return;done=true;setTimeout(()=>location.reload(),180)};
  window.addEventListener('farbeyound:cloudsaved',go,{once:true});
  setTimeout(()=>{if($('#adminCloudState')?.textContent.includes('已上傳'))go()},1600);
  return true;
}

function toggle(p,key){
  const d=data(),x=d.products.find(y=>y.id===p.id);
  if(!x)return;
  if(key==='featured'){
    if(x.published===false)return alert('請先上架產品，再設定首頁精選。');
    const next=!x.featured;
    if(!confirm(`${next?'加入':'移出'}首頁精選？\n\n${x.brand||''} ${x.model||x.name||x.id}\n\n儲存時會要求輸入發布密碼。`))return;
    x.featured=next;
  }else{
    const next=x.published===false,miss=missing(x);
    let msg=next?`確定上架「${x.brand||''} ${x.model||x.name||x.id}」？`:`確定下架「${x.brand||''} ${x.model||x.name||x.id}」？\n\n下架後前台不再顯示，首頁精選也會自動取消。`;
    if(next&&miss.length)msg+=`\n\n目前仍缺：${miss.join('、')}`;
    if(!confirm(msg+'\n\n儲存時會要求輸入發布密碼。'))return;
    x.published=next;
    if(!next)x.featured=false;
  }
  save(d);
}

function uniqueCopyId(base,list){
  let root=`${base||'product'}-copy`,id=root,n=2;
  while(list.some(p=>String(p.id)===id))id=`${root}-${n++}`;
  return id;
}

function duplicate(p){
  const d=data(),x=d.products.find(y=>y.id===p.id);
  if(!x)return;
  if(!confirm(`確定複製「${x.brand||''} ${x.model||x.name||x.id}」？\n\n副本會先保持下架，修改完成後再上架。`))return;
  const copy=JSON.parse(JSON.stringify(x));
  copy.id=uniqueCopyId(x.id,d.products);
  copy.model=x.model?`${x.model} COPY`:'';
  copy.name=`${x.name||x.id}（副本）`;
  copy.featured=false;
  copy.published=false;
  const i=d.products.findIndex(y=>y.id===x.id);
  d.products.splice(i+1,0,copy);
  save(d);
}

async function copyUrl(p){
  const url=`${location.origin}${location.pathname.replace(/admin\.html.*$/,'')}product.html?id=${encodeURIComponent(p.id)}`;
  try{await navigator.clipboard.writeText(url);alert(`已複製商品網址：\n${url}`)}catch(e){prompt('請複製商品網址：',url)}
}

function del(p){
  const d=data(),i=d.products.findIndex(x=>x.id===p.id);
  if(i<0||!confirm(`確定刪除「${p.brand||''} ${p.model||p.name||p.id}」？\n\n刪除後會同步網站，並要求輸入發布密碼。`))return;
  d.products.splice(i,1);
  save(d);
}

function move(p,n){
  const d=data(),i=d.products.findIndex(x=>x.id===p.id),j=i+n;
  if(i<0||j<0||j>=d.products.length)return;
  [d.products[i],d.products[j]]=[d.products[j],d.products[i]];
  save(d);
}

function batch(mode){
  const d=data(),items=d.products.filter(p=>selectedIds.has(String(p.id)));
  if(!items.length)return;
  const labels={publish:'上架',hide:'下架',featured:'設為首頁精選',unfeatured:'取消首頁精選'};
  let warn='';
  if(mode==='publish'){
    const bad=items.filter(p=>missing(p).length);
    if(bad.length)warn=`\n\n其中 ${bad.length} 項資料尚未完整。`;
  }
  if(!confirm(`確定要批次${labels[mode]} ${items.length} 項產品？${warn}\n\n儲存時會要求輸入發布密碼。`))return;
  items.forEach(p=>{
    if(mode==='publish')p.published=true;
    if(mode==='hide'){p.published=false;p.featured=false}
    if(mode==='featured'&&p.published!==false)p.featured=true;
    if(mode==='unfeatured')p.featured=false;
  });
  save(d);
}

function decorate(){
  const b=$('#adminProductRows');
  if(!b)return;
  const d=data();
  [...b.rows].forEach(r=>{
    const p=product(r);
    if(!p)return;
    r.dataset.productId=p.id;
    const first=r.cells[0];
    if(first&&!$('.pm-select',first)){
      const c=document.createElement('input');
      c.type='checkbox';
      c.className='pm-select';
      c.dataset.id=p.id;
      c.setAttribute('aria-label',`選取 ${p.brand||''} ${p.model||p.name||p.id}`.trim());
      c.onchange=()=>select(c);
      first.prepend(c);
    }
    const prod=r.cells[1];
    if(prod){
      $('.pm-model-line',prod)?.remove();
      const line=document.createElement('div');
      line.className=`pm-model-line ${p.model?'':'missing'}`;
      line.textContent=p.model?`型號：${p.model}`:'舊資料｜型號待確認';
      prod.appendChild(line);
    }
    const miss=missing(p),st=r.cells[3];
    if(st){
      $$('.pm-state-wrap',st).forEach(x=>x.remove());
      st.insertAdjacentHTML('beforeend',`<div class="pm-state-wrap"><span class="pm-pill ${p.published!==false?'published':'hidden'}">${p.published!==false?'前台顯示':'已下架'}</span>${p.featured?'<span class="pm-pill on">首頁精選</span>':''}<span class="pm-pill ${miss.length?'incomplete':'complete'}">${miss.length?'缺 '+miss.length+' 項':'資料完整'}</span></div>`);
    }
    const cell=r.cells[r.cells.length-1];
    cell.querySelector('.pm-actions')?.remove();
    const a=document.createElement('span');
    a.className='pm-actions';
    a.innerHTML=`<a class="icon-text" href="product.html?id=${encodeURIComponent(p.id)}" target="_blank" rel="noopener">預覽</a><button type="button" class="icon-text pm-copyurl">複製網址</button><button type="button" class="icon-text pm-publish">${p.published!==false?'下架':'上架'}</button><button type="button" class="icon-text pm-featured">${p.featured?'取消精選':'首頁精選'}</button><button type="button" class="icon-text pm-copy">複製產品</button><button type="button" class="icon-text pm-up" aria-label="往上移動">↑</button><button type="button" class="icon-text pm-down" aria-label="往下移動">↓</button>`;
    cell.prepend(a);
    $('.pm-copyurl',a).onclick=()=>copyUrl(p);
    $('.pm-publish',a).onclick=()=>toggle(p,'published');
    $('.pm-featured',a).onclick=()=>toggle(p,'featured');
    $('.pm-copy',a).onclick=()=>duplicate(p);
    $('.pm-up',a).onclick=()=>move(p,-1);
    $('.pm-down',a).onclick=()=>move(p,1);
    const db=[...cell.querySelectorAll('button')].find(x=>x.textContent.trim()==='刪除');
    if(db)db.onclick=e=>{e.preventDefault();e.stopImmediatePropagation();del(p)};
  });

  let s=$('#pmSummary');
  if(!s){
    s=document.createElement('div');
    s.id='pmSummary';
    s.className='pm-summary';
    $('#products .admin-panel-head')?.after(s);
  }
  const on=d.products.filter(p=>p.published!==false).length;
  const bad=d.products.filter(p=>!complete(p)).length;
  const featured=d.products.filter(p=>p.featured&&p.published!==false).length;
  const modelMissing=d.products.filter(p=>!String(p.model||'').trim()).length;
  s.innerHTML=`
    <div class="pm-summary-main" aria-label="產品快速檢視">
      <button type="button" data-product-view="all"><b>${d.products.length}</b><span>全部產品</span></button>
      <button type="button" data-product-view="published"><b>${on}</b><span>上架</span></button>
      <button type="button" data-product-view="hidden"><b>${d.products.length-on}</b><span>下架</span></button>
      <button type="button" data-product-view="incomplete" class="${bad?'warn':''}"><b>${bad}</b><span>資料待補</span></button>
      <button type="button" data-product-view="featured"><b>${featured}</b><span>首頁精選</span></button>
      ${modelMissing?`<button type="button" data-product-view="missing-model" class="warn"><b>${modelMissing}</b><span>型號待確認</span></button>`:''}
    </div>
    <small>點上方數字可快速切換檢視；不會改變產品原本排序。</small>`;
  $$('[data-product-view]',s).forEach(btn=>btn.addEventListener('click',()=>setQuickView(btn.dataset.productView)));
  refreshQuickState();
}

function human(){
  const f=$('#productAdminForm');
  if(f&&!$('#pmFormHelp',f)){
    const x=document.createElement('div');
    x.id='pmFormHelp';
    x.className='pm-form-help';
    x.textContent='新增產品只要填品牌＋商品型號，商品網址會自動建立；舊產品網址不會改變。';
    f.prepend(x);
  }
  const st=$('#admin_status');
  if(st)st.placeholder='例如：熱銷、現貨、詢價';
}

function style(){
  if($('#pmStyle'))return;
  const s=document.createElement('style');
  s.id='pmStyle';
  s.textContent=`
    .pm-model-line{margin-top:4px;color:#607b88;font-size:10px;font-weight:700}.pm-model-line.missing{color:#a46c20}.pm-actions{display:inline-flex;gap:7px;flex-wrap:wrap;margin-right:6px}.pm-actions button{border:0;background:none;cursor:pointer}.pm-state-wrap{display:flex;gap:4px;flex-wrap:wrap;margin-top:4px}.pm-pill{padding:3px 7px;border-radius:999px;font-size:9px;font-weight:900;background:#f1f5f7}.pm-pill.published,.pm-pill.on,.pm-pill.complete{background:#eaf8f1;color:#23744e}.pm-pill.hidden,.pm-pill.incomplete{background:#fff3e4;color:#96601b}
    .pm-summary{padding:10px 18px;border-bottom:1px solid #e9eef1;background:#fafcfd}.pm-summary-main{display:grid;grid-template-columns:repeat(6,minmax(92px,1fr));gap:8px}.pm-summary-main button{display:flex;flex-direction:column;gap:2px;align-items:flex-start;padding:9px 10px;border:1px solid #e1e9ed;border-radius:9px;background:#fff;color:#536d79;cursor:pointer;text-align:left}.pm-summary-main button:hover,.pm-summary-main button.active{border-color:#8fbeca;background:#eef8fa}.pm-summary-main button.warn{background:#fffaf0}.pm-summary-main button.active.warn{border-color:#d4aa73;background:#fff4e2}.pm-summary-main b{font-size:16px;color:#244f61}.pm-summary-main span{font-size:9px;font-weight:900}.pm-summary>small{display:block;margin-top:7px;color:#7d9099;font-size:9px}
    .pm-batch-bar{display:flex;gap:9px;align-items:center;flex-wrap:wrap;padding:10px 18px;border-bottom:1px solid #e9eef1;background:#fafcfd;font-size:10px}.pm-batch-actions{display:flex;gap:7px;flex-wrap:wrap;align-items:center}.pm-form-help{margin-bottom:14px;padding:10px 12px;border:1px solid #dce8ec;border-radius:10px;background:#f4f9fb;color:#58717e;font-size:10px}.pm-batch-bar button:disabled{opacity:.45}
    @media(max-width:1100px){.pm-summary-main{grid-template-columns:repeat(3,minmax(0,1fr))}}
    @media(max-width:820px){.pm-summary{padding:10px 12px}.pm-summary-main{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.pm-summary-main button{min-height:58px;padding:9px}.pm-summary-main b{font-size:17px}.pm-batch-bar{align-items:stretch;padding:10px 12px}.pm-batch-bar>label,.pm-batch-bar>#pmSelectedCount{display:flex;align-items:center;min-height:36px}.pm-batch-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));width:100%}.pm-batch-actions .btn{min-height:40px;padding-inline:8px}.pm-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;width:100%;margin:0}.pm-actions .icon-text{display:flex;justify-content:center;align-items:center;min-height:38px;padding:7px 8px;border:1px solid #dce7ec!important;border-radius:8px!important;background:#fff!important;text-decoration:none!important}.pm-actions .pm-up,.pm-actions .pm-down{font-size:16px}.pm-select{width:20px;height:20px}}
  `;
  document.head.appendChild(s);
}

function init(){
  if(document.body.dataset.page!=='admin'||!$('#adminProductRows'))return;
  style();
  human();
  filters();
  batchbar();
  fillCats();
  decorate();
  ['adminProductSearch','adminProductCategoryFilter','adminProductPublishFilter','adminProductCompletenessFilter','adminProductModelFilter','adminProductFeaturedOnly'].forEach(id=>{
    const e=$('#'+id);
    if(e&&!e.dataset.bound){
      e.dataset.bound='1';
      e.addEventListener(id==='adminProductSearch'?'input':'change',apply);
    }
  });
  const clear=$('#adminProductFilterClear');
  if(clear&&!clear.dataset.bound){
    clear.dataset.bound='1';
    clear.addEventListener('click',()=>setTimeout(()=>{
      if($('#adminProductPublishFilter'))$('#adminProductPublishFilter').value='';
      if($('#adminProductCompletenessFilter'))$('#adminProductCompletenessFilter').value='';
      if($('#adminProductModelFilter'))$('#adminProductModelFilter').value='';
      if($('#adminProductFeaturedOnly'))$('#adminProductFeaturedOnly').checked=false;
      apply();
    },0));
  }
  apply();
}

document.addEventListener('DOMContentLoaded',()=>[120,450,900].forEach(t=>setTimeout(init,t)));
window.addEventListener('farbeyound:datachange',()=>setTimeout(init,80));
})();
