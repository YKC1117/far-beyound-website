(function(){
  'use strict';

  function renderProductNotFound(){
    if(document.body?.dataset.page !== 'product' || !window.FBStore) return;

    const id = new URLSearchParams(location.search).get('id');
    const products = FBStore.getData().products || [];
    const product = window.FBFindProduct ? FBFindProduct(products,id) : products.find(item => String(item.id) === String(id));
    if(product) return;

    document.title = '找不到產品｜萬里資訊';

    const breadcrumb = document.getElementById('productBreadcrumb');
    const hero = document.getElementById('productHero');
    const detailGrid = document.querySelector('.detail-grid');
    const related = document.querySelector('.related.section');

    if(breadcrumb){
      breadcrumb.innerHTML = '<a href="index.html">首頁</a><span>/</span><a href="products.html">產品資訊</a><span>/</span><b>找不到產品</b>';
    }

    if(hero){
      hero.innerHTML = '<div class="empty-state wide"><b>找不到此產品</b><span>此產品網址可能已更新、產品資料已調整，或網址內容不完整。</span><div class="product-actions"><a class="btn btn-primary" href="products.html">返回產品總覽</a><a class="btn btn-secondary" href="contact.html?item=%E7%94%A2%E5%93%81%E8%B3%87%E8%A8%8A%E8%A9%A2%E5%95%8F">聯絡我們</a></div></div>';
    }

    if(detailGrid) detailGrid.hidden = true;
    if(related) related.hidden = true;
  }

  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(renderProductNotFound, 0);
  }, {once:true});

  window.addEventListener('farbeyound:datachange', function(){
    setTimeout(renderProductNotFound, 0);
  });
})();
