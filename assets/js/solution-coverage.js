(function(){
  'use strict';
  if(window.__fbSolutionCoverage)return;window.__fbSolutionCoverage=true;
  const CARD={id:'barcode',name:'條碼整合系統',en:'Barcode Integration',icon:'scanner',desc:'整合條碼列印、掃描、行動設備與既有資訊系統，依現場流程建立資料識別、驗證與追溯機制。',points:['條碼規則與資料識別','列印、掃描與行動設備整合','既有 ERP / WMS / SFIS 系統介接']};
  const esc=v=>window.FB?.escapeHtml?FB.escapeHtml(String(v||'')):String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon=name=>window.FB?.icon?FB.icon(name):'';
  function ensureHome(){
    const box=document.getElementById('homeSolutions');if(!box||box.querySelector('a[href="solutions.html#barcode"]'))return;
    box.insertAdjacentHTML('beforeend',`<a class="solution-card" href="solutions.html#barcode"><span class="solution-icon">${icon(CARD.icon)}</span><small>${esc(CARD.en)}</small><h3>${esc(CARD.name)}</h3><p>${esc(CARD.desc)}</p><span class="card-link">了解方案 ${icon('arrow')}</span></a>`);
  }
  function ensureSolutions(){
    const nav=document.getElementById('solutionNav'),sections=document.getElementById('solutionSections');if(!nav||!sections)return;
    if(!nav.querySelector('a[href="#barcode"]'))nav.insertAdjacentHTML('beforeend',`<a href="#barcode">${icon(CARD.icon)}<span><small>${esc(CARD.en)}</small><b>${esc(CARD.name)}</b></span></a>`);
    if(sections.querySelector('#barcode'))return;
    sections.insertAdjacentHTML('beforeend',`<section id="barcode" class="solution-detail reverse"><div class="solution-visual"><div class="system-panel"><div class="system-panel-head"><strong class="system-panel-code">BARCODE</strong><small>BARCODE INTEGRATION</small></div><div class="system-panel-list"><div class="system-panel-item"><em>01</em><div><b>資料識別</b><span>條碼規則與現場資料收集</span></div></div><div class="system-panel-item"><em>02</em><div><b>設備串接</b><span>列印、掃描與行動設備整合</span></div></div><div class="system-panel-item"><em>03</em><div><b>流程驗證</b><span>降低人工輸入與作業錯誤</span></div></div><div class="system-panel-item"><em>04</em><div><b>系統介接</b><span>依企業既有流程進行資料串接</span></div></div></div></div></div><div class="solution-copy"><span class="eyebrow">${esc(CARD.en)}</span><h2>${esc(CARD.name)}</h2><p>${esc(CARD.desc)}</p><ul>${CARD.points.map(x=>`<li>${icon('check')}<span>${esc(x)}</span></li>`).join('')}</ul><a class="btn btn-primary" href="contact.html?item=${encodeURIComponent(CARD.name)}">洽詢系統方案</a></div></section>`);
  }
  function run(){ensureHome();ensureSolutions()}
  document.addEventListener('DOMContentLoaded',()=>setTimeout(run,0),{once:true});
  window.addEventListener('load',()=>setTimeout(run,100));
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,160));
  if(document.readyState!=='loading')setTimeout(run,0);
})();
