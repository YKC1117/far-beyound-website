(()=>{
  if(document.body.dataset.page!=='admin')return;
  const URL='https://papqrnqbfauwuipjwwdh.supabase.co';
  const KEY='sb_publishable_dDCh9hy183BipvxCbuZdiA_qPonsyxe';
  const label=s=>({direct:'直接/站內',google:'Google 來源',bing:'Bing 來源',ai:'AI 助理導流',social:'社群導流',referral:'其他網站'}[s]||s||'未知');
  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const pct=(n,p)=>!p?(n?'新':'—'):`${Math.round((n-p)/p*100)>0?'+':''}${Math.round((n-p)/p*100)}%`;
  async function load(days){
    const r=await fetch(URL+'/rest/v1/rpc/product_analytics_source_public_summary',{method:'POST',headers:{apikey:KEY,Authorization:'Bearer '+KEY,'Content-Type':'application/json'},body:JSON.stringify({period_days:days})});
    if(!r.ok)throw new Error('HTTP '+r.status);return r.json();
  }
  function ensure(){
    const box=document.getElementById('adminAnalytics');if(!box||document.getElementById('analyticsSourcePanel'))return;
    const panel=document.createElement('div');panel.id='analyticsSourcePanel';panel.innerHTML='<h3 style="margin:24px 0 10px">流量來源</h3><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>來源</th><th>本期點閱</th><th>前期</th><th>變化</th></tr></thead><tbody id="analyticsSourceRows"><tr><td colspan="4">正在讀取來源資料…</td></tr></tbody></table></div><div id="analyticsSourceNote" class="admin-usage-note"><b>AI SEO：</b>AI 助理導流只代表可辨識的 ChatGPT、Perplexity、Claude、Gemini、Copilot 等轉介流量，不代表 AI 提及或引用次數。</div>';
    const status=document.getElementById('analyticsStatus');if(status)status.after(panel);else box.appendChild(panel);
    document.getElementById('analyticsPeriod')?.addEventListener('change',refresh);refresh();
  }
  async function refresh(){
    const days=Number(document.getElementById('analyticsPeriod')?.value||30),body=document.getElementById('analyticsSourceRows'),note=document.getElementById('analyticsSourceNote');if(!body)return;
    try{
      const rows=(await load(days)).map(x=>({...x,views:Number(x.views)||0,previous_views:Number(x.previous_views)||0}));
      body.innerHTML=rows.length?rows.map(x=>`<tr><td><b>${esc(label(x.traffic_source))}</b></td><td>${x.views}</td><td>${x.previous_views}</td><td>${pct(x.views,x.previous_views)}</td></tr>`).join(''):'<tr><td colspan="4">目前還沒有可辨識的來源資料。</td></tr>';
      const ai=rows.find(x=>x.traffic_source==='ai')?.views||0;
      note.innerHTML=`<b>AI SEO：</b>本期可辨識 AI 助理導流 <b>${ai}</b> 次。這只代表轉介流量，不等於 AI 提及／引用次數；Google 來源也不等於 Search Console 的曝光、CTR 或排名。`;
    }catch(_){body.innerHTML='<tr><td colspan="4">來源資料暫時無法載入。</td></tr>'}
  }
  const boot=()=>{if(document.getElementById('adminAnalytics'))ensure();else setTimeout(boot,100)};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();