(function(){
  'use strict';
  if(window.__fbAdminProductEnhanced)return;window.__fbAdminProductEnhanced=true;
  const $=(s,p=document)=>p.querySelector(s);
  let editingId=null;
  function inject(){
    const form=$('#productAdminForm');if(!form||$('#productEnhancedFields'))return;
    const block=document.createElement('div');block.id='productEnhancedFields';
    block.innerHTML=`<div class="form-grid" style="margin-top:14px;padding-top:14px;border-top:1px solid var(--line)"><div class="field full"><label>產品圖片路徑／URL</label><input id="admin_image" placeholder="assets/images/products/example.jpg 或 https://..."></div><div class="field full"><label>產品特色（每行一項）</label><textarea id="admin_highlights" placeholder="高解析度列印&#10;工業級耐用機構&#10;支援多種連線"></textarea></div><div class="field full"><label>產品規格（每行：規格名稱 = 規格內容）</label><textarea id="admin_specs" placeholder="解析度 = 203 / 300 dpi&#10;最大列印寬度 = 104 mm"></textarea></div><div class="field full"><label>產品文件（每行：類型 | 名稱 | URL，可不填 URL）</label><textarea id="admin_files" placeholder="PDF | 產品型錄 | https://...&#10;PDF | 使用手冊 | https://..."></textarea></div></div><div class="pm-publish-box"><label class="check-field"><input id="adminPublished" type="checkbox"> 前台公開顯示這項產品</label><small>關閉後產品會保留在後台，但不會出現在產品列表、首頁精選與相關產品中。</small></div>`;
    const check=form.querySelector('.check-field');form.insertBefore(block,check);
  }
  function fill(id){
    const d=FBStore.getData(),p=d.products.find(x=>x.id===id);if(!p)return;editingId=id;
    $('#admin_image').value=p.image||'';
    $('#admin_highlights').value=(p.highlights||[]).join('\n');
    $('#admin_specs').value=(p.specs||[]).map(x=>`${x[0]} = ${x[1]}`).join('\n');
    $('#admin_files').value=(p.files||[]).map(f=>`${f.type||'PDF'} | ${f.label||''} | ${f.url||''}`).join('\n');
    $('#adminPublished').checked=p.published!==false;
  }
  function clear(){
    editingId=null;['#admin_image','#admin_highlights','#admin_specs','#admin_files'].forEach(s=>{if($(s))$(s).value=''});
    if($('#adminPublished'))$('#adminPublished').checked=false;
  }
  function parseSpecs(v){return String(v||'').split('\n').map(x=>x.trim()).filter(Boolean).map(line=>{const i=line.indexOf('=');return i<0?[line,'']:[line.slice(0,i).trim(),line.slice(i+1).trim()]})}
  function parseFiles(v){return String(v||'').split('\n').map(x=>x.trim()).filter(Boolean).map(line=>{const p=line.split('|').map(x=>x.trim());return {type:p[0]||'PDF',label:p[1]||p[0]||'文件',url:p[2]||''}})}
  function reloadAfterPublish(){
    let done=false;const go=()=>{if(done)return;done=true;setTimeout(()=>location.reload(),180)};
    window.addEventListener('farbeyound:cloudsaved',go,{once:true});
    setTimeout(()=>{if(!done&&$('#adminCloudState')?.textContent?.includes('已上傳'))go()},1600);
  }
  function saveProduct(ev){
    ev.preventDefault();
    const d=FBStore.getData();
    const current=editingId?d.products.find(x=>String(x.id)===String(editingId)):null;
    const id=$('#admin_id').value.trim(),brand=$('#admin_brand').value.trim(),name=$('#admin_name').value.trim(),category=$('#adminCategory').value;
    if(!id||!brand||!name||!category)return;
    if(!editingId&&d.products.some(x=>String(x.id)===id)){alert('這個系統識別碼已經存在，請改成其他識別碼。');$('#admin_id').focus();return}
    const product={
      ...(current||{}),
      id,category,brand,
      family:$('#admin_family').value.trim(),type:$('#admin_type').value.trim(),name,
      subtitle:$('#admin_subtitle').value.trim(),status:$('#admin_status').value.trim(),intro:$('#admin_intro').value.trim(),
      featured:!!$('#adminFeatured').checked,published:!!$('#adminPublished').checked,
      device:d.categories.find(c=>c.id===category)?.icon||current?.device||'box',
      image:$('#admin_image').value.trim(),
      highlights:$('#admin_highlights').value.split('\n').map(x=>x.trim()).filter(Boolean),
      specs:parseSpecs($('#admin_specs').value),files:parseFiles($('#admin_files').value)
    };
    if(!product.published)product.featured=false;
    if(editingId){const i=d.products.findIndex(x=>String(x.id)===String(editingId));if(i>=0)d.products[i]=product}
    else d.products.unshift(product);
    const out=FBStore.saveData(d);if(out===false)return;
    $('#adminFormPanel').classList.remove('open');reloadAfterPublish();
  }
  function style(){
    if($('#productEnhancedStyle'))return;const s=document.createElement('style');s.id='productEnhancedStyle';s.textContent='.pm-publish-box{margin:14px 0 4px;padding:11px 12px;border:1px solid #dbe8ec;border-radius:10px;background:#f7fbfc}.pm-publish-box .check-field{margin:0}.pm-publish-box small{display:block;margin:5px 0 0 25px;color:#758a95;font-size:9px;line-height:1.5}';document.head.appendChild(s)
  }
  function init(){
    if(document.body.dataset.page!=='admin')return;inject();style();
    document.addEventListener('click',e=>{const edit=e.target.closest('.edit-product');if(edit)setTimeout(()=>fill(edit.dataset.id),0);if(e.target.closest('#newProductBtn'))setTimeout(clear,0)});
    const form=$('#productAdminForm');if(form){form.onsubmit=saveProduct}
    window.addEventListener('farbeyound:datachange',()=>{if(editingId&&$('#adminFormPanel')?.classList.contains('open'))setTimeout(()=>fill(editingId),20)});
  }
  document.addEventListener('DOMContentLoaded',init,{once:true});if(document.readyState!=='loading')init();
})();