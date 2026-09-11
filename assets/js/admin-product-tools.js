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
  function apply(){
    const body=$('#adminProductRows');if(!body)return;
    const q=($('#adminProductSearch')?.value||'').trim().toLowerCase();
    const cat=$('#adminProductCategoryFilter')?.value||'';
    const featured=!!$('#adminProductFeaturedOnly')?.checked;
    const d=data(),byId=new Map(d.products.map(p=>[String(p.id),p]));
    let shown=0;
    [...body.rows].forEach(row=>{
      const id=row.querySelector('.edit-product')?.dataset.id||'';
      const p=byId.get(String(id));
      const hay=p?[p.id,p.brand,p.family,p.type,p.name,p.subtitle,p.status,p.intro].join(' ').toLowerCase():row.textContent.toLowerCase();
      const ok=(!q||hay.includes(q))&&(!cat||p?.category===cat)&&(!featured||!!p?.featured);
      row.hidden=!ok;if(ok)shown++;
    });
    const total=d.products.length,c=$('#adminProductVisibleCount');if(c)c.textContent=`顯示 ${shown}／${total} 項`;
    const empty=$('#adminProductFilterEmpty');if(empty)empty.hidden=shown!==0;
  }
  function init(){
    if(document.body.dataset.page!=='admin')return;
    const body=$('#adminProductRows');if(!body)return;
    fillCategories();
    ['adminProductSearch','adminProductCategoryFilter','adminProductFeaturedOnly'].forEach(id=>{const el=$('#'+id);if(el&&!el.dataset.bound){el.dataset.bound='1';el.addEventListener(id==='adminProductSearch'?'input':'change',apply)}});
    const clear=$('#adminProductFilterClear');if(clear&&!clear.dataset.bound){clear.dataset.bound='1';clear.onclick=()=>{if($('#adminProductSearch'))$('#adminProductSearch').value='';if($('#adminProductCategoryFilter'))$('#adminProductCategoryFilter').value='';if($('#adminProductFeaturedOnly'))$('#adminProductFeaturedOnly').checked=false;apply()}};
    if(!body.dataset.watch){body.dataset.watch='1';new MutationObserver(()=>setTimeout(apply,0)).observe(body,{childList:true,subtree:true})}
    apply();
  }
  document.addEventListener('DOMContentLoaded',()=>[80,350,900].forEach(t=>setTimeout(init,t)));
  window.addEventListener('farbeyound:datachange',()=>setTimeout(()=>{fillCategories();apply()},60));
})();