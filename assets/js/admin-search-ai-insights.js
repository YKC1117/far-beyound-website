(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbSearchAiInsights)return;
  window.__fbSearchAiInsights=true;

  const ENDPOINT='https://papqrnqbfauwuipjwwdh.supabase.co/functions/v1/admin-analytics-secure';
  const $=(s,p=document)=>p.querySelector(s);
  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const pct=(n,p)=>!p?(n?'新':'—'):`${Math.round((n-p)/p*100)>0?'+':''}${Math.round((n-p)/p*100)}%`;

  const AI_PLATFORMS=[
    {key:'chatgpt',label:'ChatGPT / OpenAI',domains:['chatgpt.com','openai.com']},
    {key:'gemini',label:'Google Gemini',domains:['gemini.google.com']},
    {key:'copilot',label:'Microsoft Copilot',domains:['copilot.microsoft.com']},
    {key:'perplexity',label:'Perplexity',domains:['perplexity.ai']},
    {key:'claude',label:'Claude',domains:['claude.ai']},
    {key:'grok',label:'Grok',domains:['grok.com','x.ai']},
    {key:'you',label:'You.com',domains:['you.com']}
  ];

  function platformOf(row){
    const host=String(row?.referrer_domain||row?.domain||row?.source_domain||'').toLowerCase();
    if(!host)return row?.traffic_source==='ai'?'unknown':'';
    const hit=AI_PLATFORMS.find(p=>p.domains.some(d=>host===d||host.endsWith('.'+d)));
    return hit?.key||(row?.traffic_source==='ai'?'other':'');
  }

  function ensurePeriods(){
    const sel=$('#analyticsPeriod');
    if(!sel||sel.dataset.extendedPeriods==='1')return;
    sel.dataset.extendedPeriods='1';
    const current=sel.value||'30';
    sel.innerHTML='\n      <option value="7">本週｜近 7 天</option>\n      <option value="30">本月｜近 30 天</option>\n      <option value="90">本季｜近 90 天</option>\n      <option value="180">半年｜近 180 天</option>\n      <option value="365">一年｜近 365 天</option>';
    sel.value=['7','30','90','180','365'].includes(current)?current:'30';
  }

  function addStyle(){
    if($('#adminSearchAiInsightsStyle'))return;
    const s=document.createElement('style');
    s.id='adminSearchAiInsightsStyle';
    s.textContent=`
      #adminSearchAiInsights{margin:14px 18px 18px;border:1px solid #dfe8ec;border-radius:14px;background:#fff;overflow:hidden}
      .sai-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;padding:15px 16px;background:#f7fafb;border-bottom:1px solid #e4ecef}
      .sai-head h3{margin:0 0 4px;color:#294b5d;font-size:16px}.sai-head p{margin:0;color:#6f838e;font-size:10px;line-height:1.6}
      .sai-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px;padding:14px 16px}
      .sai-card{padding:12px;border:1px solid #e3ebee;border-radius:11px;background:#fbfcfd}.sai-card b{display:block;color:#25495a;font-size:18px}.sai-card span{display:block;margin-top:3px;color:#748892;font-size:9px;line-height:1.45}
      .sai-block{padding:0 16px 14px}.sai-block h4{margin:4px 0 9px;color:#36596a;font-size:12px}.sai-table{width:100%;border-collapse:collapse;font-size:10px}.sai-table th,.sai-table td{padding:9px 8px;border-bottom:1px solid #edf2f4;text-align:left}.sai-table th{color:#657b86;background:#fafcfd}.sai-table td{color:#375363}
      .sai-note{margin:0 16px 16px;padding:12px 13px;border-radius:10px;background:#f5f8fa;color:#5e7480;font-size:10px;line-height:1.7}.sai-note b{color:#385565}
      .sai-warning{margin:0 16px 14px;padding:10px 12px;border:1px solid #f0d69b;border-left:4px solid #d69c23;border-radius:10px;background:#fff9eb;color:#755a1c;font-size:10px;line-height:1.6}
      @media(max-width:980px){.sai-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.sai-head{flex-direction:column}}
      @media(max-width:620px){#adminSearchAiInsights{margin-left:12px;margin-right:12px}.sai-grid{grid-template-columns:1fr 1fr;padding:12px}.sai-block{padding-left:12px;padding-right:12px}.sai-note,.sai-warning{margin-left:12px;margin-right:12px}.sai-table{min-width:560px}.sai-table-wrap{overflow:auto}}
    `;
    document.head.appendChild(s);
  }

  async function load(days){
    const s=window.FBAdminAuth?.session?.();
    if(!s?.access_token)throw new Error('login_required');
    const r=await fetch(`${ENDPOINT}?period_days=${days}`,{headers:{Authorization:`Bearer ${s.access_token}`},cache:'no-store'});
    const b=await r.json().catch(()=>({}));
    if(!r.ok)throw new Error(b.error||'read_failed');
    return b;
  }

  function aggregatePlatforms(rows){
    const map=new Map(AI_PLATFORMS.map(p=>[p.key,{key:p.key,label:p.label,views:0,previous_views:0}]));
    map.set('other',{key:'other',label:'其他 AI',views:0,previous_views:0});
    map.set('unknown',{key:'unknown',label:'AI（來源未細分）',views:0,previous_views:0});
    rows.forEach(row=>{
      if(row?.traffic_source!=='ai'&&!platformOf(row))return;
      const key=platformOf(row)||'unknown';
      const x=map.get(key)||map.get('other');
      x.views+=Number(row.views)||0;
      x.previous_views+=Number(row.previous_views)||0;
    });
    return [...map.values()].filter(x=>x.views||x.previous_views).sort((a,b)=>b.views-a.views);
  }

  function build(){
    const analytics=$('#adminAnalytics');
    if(!analytics||$('#adminSearchAiInsights'))return false;
    addStyle();
    ensurePeriods();
    const panel=document.createElement('section');
    panel.id='adminSearchAiInsights';
    panel.innerHTML=`
      <div class="sai-head">
        <div><span class="eyebrow">SEARCH / AI VISIBILITY</span><h3>Google 關鍵字＋AI SEO 成效總覽</h3><p>主管版：先看趨勢、來源與建議；技術設定保留在下方 SEO 管理中心。</p></div>
        <button id="saiRefresh" class="btn btn-secondary btn-sm" type="button">重新整理</button>
      </div>
      <div id="saiSummary" class="sai-grid">
        <div class="sai-card"><b>—</b><span>本期有效瀏覽</span></div>
        <div class="sai-card"><b>—</b><span>AI 助理導流</span></div>
        <div class="sai-card"><b>待串接</b><span>Google Search Console 關鍵字</span></div>
        <div class="sai-card"><b>待累積</b><span>AI 品牌來源</span></div>
      </div>
      <div class="sai-warning"><b>Google 關鍵字：</b>目前尚未連接公司 Google Search Console，因此不顯示虛構的曝光、CTR、平均排名或關鍵字名次。正式串接後，這裡才會呈現 Google 官方搜尋資料。</div>
      <div class="sai-block"><h4>AI 品牌導流</h4><div class="sai-table-wrap"><table class="sai-table"><thead><tr><th>AI 平台</th><th>本期導流</th><th>前期</th><th>變化</th><th>資料狀態</th></tr></thead><tbody id="saiAiRows"><tr><td colspan="5">尚未讀取資料。</td></tr></tbody></table></div></div>
      <div class="sai-note"><b>資料統計來源：</b><br>①「有效瀏覽／產品熱門度」來自網站產品頁自己的匿名瀏覽事件統計，並以 30 分鐘同產品冷卻避免短時間重複計數。<br>②「Google／Bing／AI／社群導流」依瀏覽器提供的 Referrer 網域分類，資料送至目前網站分析後端彙總。<br>③「ChatGPT、Gemini、Copilot、Perplexity、Claude、Grok 等 AI 品牌」只有在 Referrer 能辨識來源網域時才能細分；無法辨識時會列為「AI（來源未細分）」。<br>④「Google 關鍵字曝光、點擊、CTR、平均排名」必須以公司 Google Search Console 為準，目前尚未串接。<br>⑤「AI 提及／引用萬里資訊」與「AI 導流」是不同指標；目前只統計可辨識的導流，不把未量測的 AI 回答提及次數當成真實數據。</div>
    `;
    const status=$('#analyticsStatus');
    status?.after(panel);
    $('#saiRefresh').addEventListener('click',refresh);
    $('#analyticsPeriod')?.addEventListener('change',()=>setTimeout(refresh,80));
    window.addEventListener('farbeyound:adminauth',refresh);
    setTimeout(refresh,500);
    return true;
  }

  async function refresh(){
    ensurePeriods();
    const days=Number($('#analyticsPeriod')?.value||30),sum=$('#saiSummary'),body=$('#saiAiRows');
    if(!sum||!body)return;
    body.innerHTML='<tr><td colspan="5">正在讀取統計資料…</td></tr>';
    try{
      const data=await load(days),products=Array.isArray(data.rows)?data.rows:[],sources=Array.isArray(data.sources)?data.sources:[];
      const total=products.reduce((n,x)=>n+(Number(x.views)||0),0);
      const prev=products.reduce((n,x)=>n+(Number(x.previous_views)||0),0);
      const aiRows=sources.filter(x=>x.traffic_source==='ai'||platformOf(x));
      const ai=aiRows.reduce((n,x)=>n+(Number(x.views)||0),0);
      const aiPrev=aiRows.reduce((n,x)=>n+(Number(x.previous_views)||0),0);
      const platforms=aggregatePlatforms(aiRows);
      const named=platforms.filter(x=>!['unknown','other'].includes(x.key));
      sum.innerHTML=`
        <div class="sai-card"><b>${total}</b><span>本期有效瀏覽｜較前期 ${esc(pct(total,prev))}</span></div>
        <div class="sai-card"><b>${ai}</b><span>AI 助理導流｜較前期 ${esc(pct(ai,aiPrev))}</span></div>
        <div class="sai-card"><b>待串接</b><span>Google Search Console 關鍵字</span></div>
        <div class="sai-card"><b>${named.length||0}</b><span>本期可辨識 AI 品牌數</span></div>`;
      body.innerHTML=platforms.length?platforms.map(x=>`<tr><td><b>${esc(x.label)}</b></td><td>${x.views}</td><td>${x.previous_views}</td><td>${esc(pct(x.views,x.previous_views))}</td><td>${x.key==='unknown'?'Referrer 未提供品牌細節':'Referrer 可辨識'}</td></tr>`).join(''):'<tr><td colspan="5">本期尚無可辨識 AI 導流資料。</td></tr>';
    }catch(err){
      const login=String(err?.message||'')==='login_required'||String(err?.message||'')==='unauthorized';
      sum.innerHTML=`<div class="sai-card"><b>—</b><span>本期有效瀏覽</span></div><div class="sai-card"><b>—</b><span>AI 助理導流</span></div><div class="sai-card"><b>待串接</b><span>Google Search Console 關鍵字</span></div><div class="sai-card"><b>—</b><span>AI 品牌來源</span></div>`;
      body.innerHTML=`<tr><td colspan="5">${login?'請登入具備「流量分析」權限的個人帳號後查看真實統計。':'統計資料目前無法讀取。'}</td></tr>`;
    }
  }

  function boot(){if(!build())setTimeout(boot,120)}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();
