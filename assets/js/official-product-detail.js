(function(){
  if(document.body.dataset.page!=='product'||window.__fbOfficialProductDetail)return;
  window.__fbOfficialProductDetail=true;
  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function render(){
    if(!window.FBStore)return;
    const id=new URLSearchParams(location.search).get('id')||'';
    const products=FBStore.getData().products||[];const product=(window.FBFindProduct?FBFindProduct(products,id):products.find(item=>String(item.id)===id));if(product?.published===false)return;
    if(!product)return;

    if(product.image){
      const visual=document.querySelector('#productHero .product-detail-visual');
      if(visual)visual.innerHTML=`<div class="official-product-photo"><img src="${esc(product.image)}" alt="${esc(product.name||'產品圖片')}"></div>`;
    }

    const description=Array.isArray(product.description)?product.description.filter(Boolean):[];
    const highlightBox=document.getElementById('productHighlights');
    if(description.length&&highlightBox){
      const block=highlightBox.closest('.detail-block');
      const heading=block?.querySelector('h2');
      const eyebrow=block?.querySelector('.eyebrow');
      if(heading)heading.textContent='產品介紹';
      if(eyebrow)eyebrow.textContent='PRODUCT INFORMATION';
      highlightBox.classList.add('official-product-description');
      highlightBox.innerHTML=description.map(line=>`<li>${esc(line)}</li>`).join('');
      const highlights=Array.isArray(product.highlights)?product.highlights.filter(Boolean):[];
      if(highlights.length){
        highlightBox.insertAdjacentHTML('beforeend',`<li class="official-feature-heading">產品特色</li>${highlights.map(line=>`<li class="official-feature-item">${esc(line)}</li>`).join('')}`);
      }
    }

    const box=document.getElementById('productFiles');
    if(box){
      const files=Array.isArray(product.files)?product.files:[];
      box.innerHTML=files.length?files.map(file=>{
        const href=String(file.url||'').trim();
        const target=href?' target="_blank" rel="noopener noreferrer"':'';
        const link=href||`contact.html?item=${encodeURIComponent((product.name||'產品')+' '+(file.label||'技術文件'))}`;
        return `<a class="download-row" href="${esc(link)}"${target}><span class="download-icon">${window.FB?.icon?FB.icon('download'):'↓'}</span><span><small>${esc(file.type||'文件')}</small><b>${esc(file.label||'技術文件')}</b></span><span class="download-cta">${href?'開啟文件':'洽詢取得'}</span></a>`;
      }).join(''):'<div class="empty-state"><b>需要產品文件？</b><span>原公司官網目前沒有提供此產品的公開文件，可與我們聯絡確認。</span></div>';
    }
  }

  document.addEventListener('DOMContentLoaded',()=>setTimeout(render,80),{once:true});
  window.addEventListener('farbeyound:datachange',()=>setTimeout(render,80));
  if(document.readyState!=='loading')setTimeout(render,80);
})();
