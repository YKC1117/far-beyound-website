(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminPerformanceUx)return;
  window.__fbAdminPerformanceUx=true;

  const $=(s,p=document)=>p.querySelector(s);
  const KEY='farbeyoundPerformanceTabV3';
  const MODULE_IDS=new Set(['adminSearchChannelCenter','adminSearchAiInsights','analyticsSourcePanel','adminSeoOwnership','adminSeoCenter','adminPerformanceWorkspace','adminPerformanceBase']);
  const VIEWS=[
    {id:'overview',title:'總覽',desc:'站內成效＋Google SEO／Ads／AI SEO 三軌摘要'},
    {id:'google-seo',title:'Google SEO',desc:'自然搜尋資料來源、Search Console 與 SEO 管理重點'},
    {id:'google-ads',title:'Google Ads',desc:'廣告花費、點擊、轉換與關鍵字成效'},
    {id:'ai-seo',title:'AI SEO',desc:'AI 導流、熱門內容與 AI 能見度相關資訊'},
    {id:'traffic',title:'流量來源',desc:'Google、Bing、AI、社群與其他來源'},
    {id:'technical',title:'技術設定',desc:'SEO 架構、Title、Description、OG、索引與技術設定'}
  ];

  function style(){
    if($('#adminPerformanceUxStyle'))return;
    const s=document.createElement('style');
    s.id='adminPerformanceUxStyle';
    s.textContent=`
      #adminPerformanceWorkspace{margin:14px 18px 12px;padding:12px;border:1px solid #dbe6eb;border-radius:12px;background:#f8fbfc}
      .apu-workspace-copy{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-bottom:10px}.apu-workspace-copy>div{display:grid;gap:2px}.apu-workspace-copy b{font-size:11px;color:#315366}.apu-workspace-copy span{font-size:9px;color:#748793}.apu-workspace-copy small{font-size:8px;color:#8a9aa3}
      .apu-tabs{display:flex;gap:6px;flex-wrap:wrap}.apu-tab{min-height:34px;padding:0 11px;border:1px solid #d6e2e7;border-radius:9px;background:#fff;color:#526a78;font-size:9px;font-weight:900;cursor:pointer}.apu-tab:hover{background:#f3f8fa;border-color:#bdd1d9}.apu-tab.active{background:#2f6073;border-color:#2f6073;color:#fff;box-shadow:0 5px 14px rgba(47,96,115,.15)}
      .apu-managed{display:none!important;margin-top:0!important}.apu-managed.apu-active{display:block!important}
      #adminPerformanceBase{margin:0;padding:0}.apu-technical-stack{display:grid;gap:12px}
      #analyticsSourcePanel.apu-managed,#adminSeoOwnership.apu-managed,#adminSeoCenter.apu-managed{border:1px solid #dfe8ec!important;border-radius:12px!important;background:#fff!important;overflow:hidden}
      #adminSearchChannelCenter.apu-scc-google-seo .scc-grid,#adminSearchChannelCenter.apu-scc-google-ads .scc-grid,#adminSearchChannelCenter.apu-scc-ai-seo .scc-grid{grid-template-columns:1fr!important}
      #adminSearchChannelCenter.apu-scc-google-seo .scc-card:not(:nth-child(1)),#adminSearchChannelCenter.apu-scc-google-ads .scc-card:not(:nth-child(2)),#adminSearchChannelCenter.apu-scc-ai-seo .scc-card:not(:nth-child(3)){display:none!important}
      #adminSearchChannelCenter.apu-scc-google-seo .scc-table tbody tr:not(:nth-child(1)),#adminSearchChannelCenter.apu-scc-google-ads .scc-table tbody tr:not(:nth-child(2)),#adminSearchChannelCenter.apu-scc-ai-seo .scc-table tbody tr:not(:nth-child(3)){display:none!important}
      @media(max-width:700px){#adminPerformanceWorkspace{margin-left:12px;margin-right:12px}.apu-workspace-copy{align-items:flex-start;flex-direction:column}.apu-tabs{display:grid;grid-template-columns:1fr 1fr;width:100%}.apu-tab{width:100%}}
      @media(max-width:420px){.apu-tabs{grid-template-columns:1fr}}
    `;
    document.head.appendChild(s);
  }

  function ensureBase(){
    const host=$('#adminAnalytics');
    if(!host)return null;
    let base=$('#adminPerformanceBase');
    if(!base){base=document.createElement('div');base.id='adminPerformanceBase';host.querySelector('.admin-panel-head')?.after(base)}
    [...host.children].forEach(el=>{
      if(el===base||el.classList.contains('admin-panel-head')||MODULE_IDS.has(el.id))return;
      base.appendChild(el);
    });
    return base;
  }

  function allManaged(){
    const out=[];
    ['adminPerformanceBase','adminSearchChannelCenter','adminSearchAiInsights','analyticsSourcePanel','adminSeoOwnership','adminSeoCenter'].forEach(id=>{const el=document.getElementById(id);if(el)out.push(el)});
    return out;
  }

  function clearSccModes(){
    const scc=$('#adminSearchChannelCenter');
    if(!scc)return;
    scc.classList.remove('apu-scc-google-seo','apu-scc-google-ads','apu-scc-ai-seo');
  }

  function targets(view){
    if(view==='overview')return ['adminPerformanceBase','adminSearchChannelCenter'];
    if(view==='google-seo')return ['adminSearchChannelCenter'];
    if(view==='google-ads')return ['adminSearchChannelCenter'];
    if(view==='ai-seo')return document.getElementById('adminSearchAiInsights')?['adminSearchAiInsights']:['adminSearchChannelCenter'];
    if(view==='traffic')return ['analyticsSourcePanel'];
    if(view==='technical')return ['adminSeoOwnership','adminSeoCenter'];
    return ['adminPerformanceBase','adminSearchChannelCenter'];
  }

  function activate(view,save=true){
    if(!VIEWS.some(x=>x.id===view))view='overview';
    ensureBase();
    allManaged().forEach(el=>{el.classList.add('apu-managed');el.classList.remove('apu-active')});
    clearSccModes();
    targets(view).forEach(id=>document.getElementById(id)?.classList.add('apu-active'));
    const scc=$('#adminSearchChannelCenter');
    if(scc&&['google-seo','google-ads'].includes(view))scc.classList.add(`apu-scc-${view}`);
    if(scc&&view==='ai-seo'&&!document.getElementById('adminSearchAiInsights'))scc.classList.add('apu-scc-ai-seo');
    document.querySelectorAll('.apu-tab[data-view]').forEach(btn=>{
      const active=btn.dataset.view===view;btn.classList.toggle('active',active);btn.setAttribute('aria-selected',active?'true':'false');
    });
    if(save)localStorage.setItem(KEY,view);
  }

  function workspace(){
    const host=$('#adminAnalytics');
    if(!host)return false;
    const head=host.querySelector('.admin-panel-head');
    if(!head)return false;
    ensureBase();
    let box=$('#adminPerformanceWorkspace');
    if(!box){box=document.createElement('div');box.id='adminPerformanceWorkspace';head.after(box)}
    box.innerHTML=`<div class="apu-workspace-copy"><div><b>SEO／Ads／AI 成效中心</b><span>先選要看的資料，畫面一次只保留一個主題。</span></div><small>Google 官方資料未串接前不顯示假數字。</small></div><div class="apu-tabs" role="tablist" aria-label="成效中心分類">${VIEWS.map(v=>`<button type="button" class="apu-tab" data-view="${v.id}" role="tab" aria-selected="false" title="${v.desc}">${v.title}</button>`).join('')}</div>`;
    box.onclick=e=>{const btn=e.target.closest('.apu-tab[data-view]');if(btn)activate(btn.dataset.view)};
    const saved=localStorage.getItem(KEY)||'overview';activate(VIEWS.some(x=>x.id===saved)?saved:'overview',false);
    return true;
  }

  function run(){style();ensureBase();allManaged().forEach(el=>el.classList.add('apu-managed'));workspace()}

  function boot(){
    run();let tries=0;
    const timer=setInterval(()=>{run();tries++;if(tries>60)clearInterval(timer)},200);
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();
