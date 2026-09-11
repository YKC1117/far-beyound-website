(function(){
  if(!window.FBStore || window.__fbProductResources) return;
  window.__fbProductResources = true;

  const rawGet = FBStore.getData.bind(FBStore);
  const key = v => String(v || '').trim().toLowerCase().replace(/\s+/g,'');

  FBStore.getData = function(){
    const data = rawGet();
    const map = window.FBProductDocs?.items || {};

    (data.products || []).forEach(product => {
      const imported = Array.isArray(map[product.legacyUrl]) ? map[product.legacyUrl] : [];
      if(!imported.length) return;

      const existing = Array.isArray(product.files) ? product.files : [];
      const merged = [];
      const seen = new Set();

      imported.forEach(file => {
        if(!file || !file.url) return;
        const sig = key(file.label) + '|' + key(file.url);
        if(seen.has(sig)) return;
        seen.add(sig);
        merged.push({
          label: file.label || '技術文件',
          type: file.type || (/\.pdf(?:$|\?)/i.test(file.url) ? 'PDF' : '文件'),
          url: file.url,
          source: 'official'
        });
      });

      existing.forEach(file => {
        if(!file) return;
        const sameLabel = merged.some(x => key(x.label) === key(file.label));
        if(sameLabel && !file.url) return;
        const sig = key(file.label) + '|' + key(file.url);
        if(seen.has(sig)) return;
        seen.add(sig);
        merged.push(file);
      });

      product.files = merged;
    });

    return data;
  };
})();
