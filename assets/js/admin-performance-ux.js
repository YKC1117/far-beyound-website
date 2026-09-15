(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminPerformanceUx)return;
  window.__fbAdminPerformanceUx=true;

  const $=(s,p=document)=>p.querySelector(s);
  const $$=(s,p=document)=>[...p.querySelectorAll(s)];
  const KEY='farbeyoundPerformanceFoldV1';

  const SECTIONS=[
    {id:'adminSearchChannelCenter',title:'搜尋成效三軌總覽',desc:'Google SEO、Google Ads、AI SEO 的主管總覽與資料來源',open:true},
    {id:'adminSearchAiInsights',title:'AI SEO／搜尋成效摘要',desc:'期間比較、AI 品牌導流、熱門內容與資料可信度',open:true},
    {id:'analyticsSourcePanel',title:'流量來源明細',desc:'Google、Bing、AI、社群與其他網站來源比較',open:false},
    {id:'adminSeoOwnership',title:'自有 SEO／AI SEO 架構說明',desc:'公司自主管理範圍、官方資料串接與外部服務界線',open:false},
    {id:'adminSeoCenter',title:'SEO 技術設定中心',desc:'Title、Description、OG、索引與各頁 SEO 技術設定',open:false}
  ];

  function read(){
    try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}
    catch(_){return {}}
  }
  function save(id,open){
    const data=read();
    data[id]=!!open;
    localStorage.setItem(KEY,JSON.stringify(data));
  }
  function preferred(item){
    const data=read();
    return Object.prototype.hasOwnProperty.call(data,item.id)?!!data[item.id]:item.open;
  }

  function style(){
    if($('#adminPerformanceUxStyle'))return;
    const s=document.createElement('style');
    s.id='adminPerformanceUxStyle';
    s.textContent=`
      #adminPerformanceWorkspace{margin:14px 18px 10px;padding:10px 12px;border:1px solid #dbe6eb;border-radius:12px;background:#f8fbfc;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
      .apu-workspace-copy{display:grid;gap:2px}.apu-workspace-copy b{font-size:11px;color:#315366}.apu-workspace-copy span{font-size:9px;color:#748793}
      .apu-workspace-actions{display:flex;gap:6px;flex-wrap:wrap}.apu-workspace-actions button{min-height:31px;padding:0 9px;border:1px solid #d6e2e7;border-radius:8px;background:#fff;color:#526a78;font-size:9px;font-weight:800;cursor:pointer}.apu-workspace-actions button:hover{background:#f3f8fa;border-color:#bdd1d9}
      .apu-section-bar{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:11px 13px;border-bottom:1px solid #e7eef1;background:#fbfcfd}
      .apu-section-bar>div{display:grid;gap:2px}.apu-section-bar b{color:#315366;font-size:11px}.apu-section-bar small{color:#7b8e98;font-size:9px;line-height:1.4}
      .apu-section-toggle{flex:none;min-height:30px;padding:0 9px;border:1px solid #d6e2e7;border-radius:8px;background:#fff;color:#526a78;font-size:9px;font-weight:900;cursor:pointer}
      .apu-section-toggle span{margin-left:4px;font-size:13px}.apu-managed.apu-collapsed>.apu-section-bar{border-bottom:0}.apu-managed.apu-collapsed>:not(.apu-section-bar){display:none!important}
      .apu-managed{scroll-margin-top:76px}
      #analyticsSourcePanel.apu-managed,#adminSeoOwnership.apu-managed,#adminSeoCenter.apu-managed{border:1px solid #dfe8ec!important;border-radius:12px!important;background:#fff!important;overflow:hidden}
      @media(max-width:700px){#adminPerformanceWorkspace{margin-left:12px;margin-right:12px;align-items:flex-start;flex-direction:column}.apu-workspace-actions{width:100%}.apu-workspace-actions button{flex:1}.apu-section-bar{align-items:flex-start}.apu-section-bar small{max-width:220px}}
    `;
    document.head.appendChild(s);
  }

  function setOpen(el,item,open){
    el.classList.add('apu-managed');
    el.classList.toggle('apu-collapsed',!open);
    const btn=el.querySelector(':scope > .apu-section-bar .apu-section-toggle');
    if(btn){
      btn.setAttribute('aria-expanded',open?'true':'false');
      btn.innerHTML=open?'收合 <span>−</span>':'展開 <span>＋</span>';
    }
    save(item.id,open);
  }

  function decorate(item){
    const el=document.getElementById(item.id);
    if(!el||el.dataset.performanceUxReady==='1')return false;
    el.dataset.performanceUxReady='1';
    const bar=document.createElement('div');
    bar.className='apu-section-bar';
    bar.innerHTML=`<div><b>${item.title}</b><small>${item.desc}</small></div><button type="button" class="apu-section-toggle" aria-expanded="true">收合 <span>−</span></button>`;
    el.prepend(bar);
    const btn=bar.querySelector('button');
    btn.addEventListener('click',()=>setOpen(el,item,el.classList.contains('apu-collapsed')));
    setOpen(el,item,preferred(item));
    return true;
  }

  function workspace(){
    const host=$('#adminAnalytics');
    if(!host||$('#adminPerformanceWorkspace'))return false;
    const head=host.querySelector('.admin-panel-head');
    if(!head)return false;
    const box=document.createElement('div');
    box.id='adminPerformanceWorkspace';
    box.innerHTML=`<div class="apu-workspace-copy"><b>成效中心顯示</b><span>主管常看的總覽保持展開；細節與技術說明需要時再打開。</span></div><div class="apu-workspace-actions"><button type="button" data-apu="summary">主管模式</button><button type="button" data-apu="all">全部展開</button><button type="button" data-apu="compact">收合細節</button></div>`;
    head.after(box);
    box.addEventListener('click',e=>{
      const btn=e.target.closest('button[data-apu]');
      if(!btn)return;
      const mode=btn.dataset.apu;
      SECTIONS.forEach(item=>{
        const el=document.getElementById(item.id);
        if(!el)return;
        const open=mode==='all'?true:mode==='summary'?item.open:(item.id==='adminSearchChannelCenter'||item.id==='adminSearchAiInsights');
        setOpen(el,item,open);
      });
    });
    return true;
  }

  function run(){
    style();
    workspace();
    SECTIONS.forEach(decorate);
  }

  function boot(){
    run();
    let tries=0;
    const timer=setInterval(()=>{
      run();
      tries++;
      const ready=SECTIONS.filter(x=>document.getElementById(x.id)).every(x=>document.getElementById(x.id)?.dataset.performanceUxReady==='1');
      if(ready||tries>80)clearInterval(timer);
    },200);
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();
