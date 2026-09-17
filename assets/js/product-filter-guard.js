(function(){
  'use strict';

  if(document.body?.dataset.page !== 'products' || !window.FBStore) return;

  const data = FBStore.getData();
  const params = new URLSearchParams(location.search);
  const requestedCategory = String(params.get('category') || '').trim();
  const requestedBrand = String(params.get('brand') || '').trim();
  let changed = false;

  const categoryValid = !requestedCategory || data.categories.some(category => String(category.id) === requestedCategory);
  if(!categoryValid){
    params.delete('category');
    params.delete('brand');
    changed = true;
  }else if(requestedBrand){
    const brands = new Set(
      (data.products || [])
        .filter(product => !requestedCategory || String(product.category) === requestedCategory)
        .map(product => String(product.brand || ''))
        .filter(Boolean)
    );
    if(!brands.has(requestedBrand)){
      params.delete('brand');
      changed = true;
    }
  }

  if(changed){
    const query = params.toString();
    const cleanUrl = `${location.pathname}${query ? `?${query}` : ''}${location.hash || ''}`;
    history.replaceState(null, '', cleanUrl);
  }
})();
