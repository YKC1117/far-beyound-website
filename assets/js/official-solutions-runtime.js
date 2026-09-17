(function(){
  if(document.body.dataset.page!=='solutions'||window.__fbOfficialSolutionsRuntime)return;
  window.__fbOfficialSolutionsRuntime=true;
  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function lineHtml(line){
    const text=String(line||'').trim();
    if(!text)return'';
    if(/^[一二三四五六七八九十]+、/.test(text))return`<h3>${esc(text)}</h3>`;
    if(/^\d+[、.．]/.test(text))return`<p class="official-solution-step">${esc(text)}</p>`;
    if(/^●/.test(text))return`<p class="official-solution-bullet">${esc(text.replace(/^●\s*/,''))}</p>`;
    if(/^\(.+\)|^（.+）/.test(text))return`<h4>${esc(text)}</h4>`;
    return`<p>${esc(text)}</p>`;
  }
  function render(){
    const items=window.FBLegacySolutions?.items||[];
    items.forEach(item=>{
      const section=document.getElementById(item.id),copy=section?.querySelector('.solution-copy');
      if(!copy||copy.querySelector('.official-solution-detail'))return;
      const details=(item.lines||[]).map(lineHtml).join('');
      if(!details)return;
      copy.insertAdjacentHTML('beforeend',`<div class="official-solution-detail"><div class="official-solution-source">公司原官網方案內容</div>${details}</div>`);
    });
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(render,80),{once:true});
  if(document.readyState!=='loading')setTimeout(render,80);
})();
