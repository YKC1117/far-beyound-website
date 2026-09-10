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
