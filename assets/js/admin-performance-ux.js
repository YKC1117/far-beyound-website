(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminPerformanceUx)return;
  window.__fbAdminPerformanceUx=true;

  const $=(s,p=document)=>p.querySelector(s);
  const KEY='farbeyoundPerformanceTabV2';

  const SECTIONS=[
    {id:'adminSearchChannelCenter',title:'成效總覽',desc:'Google SEO、Google Ads、AI SEO 三軌重點'},
    {id:'adminSearchAiInsights',title:'AI／搜尋摘要',desc:'期間比較、AI 導流、熱門內容與資料可信度'},
    {id:'analyticsSourcePanel',title:'流量來源',desc:'Google、Bing、AI、社群與其他網站來源'},
    {id:'adminSeoOwnership',title:'SEO 架構',desc:'公司自主管理、官方資料與外部服務界線'},
    {id:'adminSeoCenter',title:'SEO 設定',desc:'Title、Description、OG、索引與頁面設定'}
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
      .apu-managed>.apu-section-bar{display:none!important}
      #analyticsSourcePanel.apu-managed,#adminSeoOwnership.apu-managed,#adminSeoCenter.apu-managed{border:1px solid #dfe8ec!important;border-radius:12px!important;background:#fff!important;overflow:hidden}
      @media(max-width:700px){#adminPerformanceWorkspace{margin-left:12px;margin-right:12px}.apu-workspace-copy{align-items:flex-start;flex-direction:column}.apu-tabs{display:grid;grid-template-columns:1fr 1fr;width:100%}.apu-tab{width:100%}}
    `;
    document.head.appendChild(s);
  }

  function existing(){return SECTIONS.filter(item=>document.getElementById(item.id))}

  function preferred(){
    const saved=localStorage.getItem(KEY)||'';
    return existing().some(x=>x.id===saved)?saved:(existing()[0]?.id||'');
  }

  function activate(id){
    existing().forEach(item=>{
      const el=document.getElementById(item.id);
      el?.classList.add('apu-managed');
      el?.classList.toggle('apu-active',item.id===id);
    });
    document.querySelectorAll('.apu-tab[data-target]').forEach(btn=>{
      const active=btn.dataset.target===id;
      btn.classList.toggle('active',active);
      btn.setAttribute('aria-selected',active?'true':'false');
    });
    if(id)localStorage.setItem(KEY,id);
  }

  function workspace(){
    const host=$('#adminAnalytics');
    if(!host)return false;
    const head=host.querySelector('.admin-panel-head');
    if(!head)return false;

    let box=$('#adminPerformanceWorkspace');
    if(!box){
      box=document.createElement('div');
      box.id='adminPerformanceWorkspace';
      head.after(box);
    }

    const items=existing();
    box.innerHTML=`
      <div class="apu-workspace-copy">
        <div><b>成效中心</b><span>一次只看一類資料，畫面保持單純。</span></div>
        <small>需要哪一類再點開，不再全部堆在同一頁。</small>
      </div>
      <div class="apu-tabs" role="tablist" aria-label="成效中心分類">
        ${items.map(item=>`<button type="button" class="apu-tab" data-target="${item.id}" role="tab" aria-selected="false" title="${item.desc}">${item.title}</button>`).join('')}
      </div>`;

    box.onclick=e=>{
      const btn=e.target.closest('.apu-tab[data-target]');
      if(btn)activate(btn.dataset.target);
    };
    activate(preferred());
    return true;
  }

  function run(){
    style();
    existing().forEach(item=>document.getElementById(item.id)?.classList.add('apu-managed'));
    workspace();
  }

  function boot(){
    run();
    let tries=0;
    const timer=setInterval(()=>{
      run();
      tries++;
      if(existing().length>=SECTIONS.length||tries>80)clearInterval(timer);
    },200);
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();