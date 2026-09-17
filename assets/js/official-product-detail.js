(function(){
  if(document.body.dataset.page!=='product'||window.__fbOfficialProductDetail)return;
  window.__fbOfficialProductDetail=true;
  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function render(){
    if(!window.FBStore)return;
    const id=new URLSearchParams(location.search).get('id')||'';
    const product=(FBStore.getData().products||[]).find(item=>String(item.id)===id&&item.published!==false);
    if(!product)return;

    if(product.image){
      const visual=document.querySelector('#productHero .product-detail-visual');
      if(visual)visual.innerHTML=`<div class="official-product-photo"><img src="${esc(product.image)}" alt="${esc(product.name||'產品圖片')}"></div>`;
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
