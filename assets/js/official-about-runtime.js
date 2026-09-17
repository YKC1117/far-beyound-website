(function(){
  if(document.body.dataset.page!=='about'||window.__fbOfficialAboutRuntime)return;
  window.__fbOfficialAboutRuntime=true;
  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render(){
    const data=window.FBLegacyAbout,grid=document.querySelector('.about-page-grid');
    if(!data||!grid)return;
    const copy=grid.firstElementChild;
    if(copy){
      copy.querySelectorAll('p,.official-about-products').forEach(node=>node.remove());
      const paragraphs=(data.paragraphs||[]).map(text=>`<p>${esc(text)}</p>`).join('');
      const bullets=(data.bullets||[]).filter(text=>text.length>18&&!/產品資訊|下載服務|系統方案|聯絡我們/.test(text));
      const products=bullets.length?`<div class="official-about-products"><h3>完整、優質的產品系列</h3><ul>${bullets.map(text=>`<li>${esc(text)}</li>`).join('')}</ul></div>`:'';
      copy.insertAdjacentHTML('beforeend',paragraphs+products);
    }
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(render,60),{once:true});
  if(document.readyState!=='loading')setTimeout(render,60);
})();
