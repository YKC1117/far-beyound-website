(()=>{
  if(document.body.dataset.page!=='admin') return;
  const SUPABASE_URL='https://papqrnqbfauwuipjwwdh.supabase.co';
  const KEY='sb_publishable_dDCh9hy183BipvxCbuZdiA_qPonsyxe';

  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const pct=(now,prev)=>{
    if(!prev) return now>0?'新':'—';
    const n=Math.round(((now-prev)/prev)*100);
    return `${n>0?'+':''}${n}%`;
  };
  const verdict=(now,prev)=>{
    if(now>=10 && (!prev || now>=prev*1.3)) return ['高關注','優先強化'];
    if(prev>=8 && now<=prev*.75) return ['流量下滑','檢查內容/排名'];
    if(now>=5) return ['有需求','持續優化'];
    return ['資料累積中','先觀察'];
  };

  async function load(days){
    const r=await fetch(`${SUPABASE_URL}/rest/v1/rpc/product_analytics_public_summary`,{
      method:'POST',
      headers:{apikey:KEY,Authorization:`Bearer ${KEY}`,'Content-Type':'application/json'},
      body:JSON.stringify({period_days:days})
    });
    if(!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  }

  function build(){
    const anchor=document.getElementById('adminStats');
    if(!anchor||document.getElementById('adminAnalytics')) return;
    const el=document.createElement('section');
    el.id='adminAnalytics';
    el.className='admin-panel';
    el.innerHTML=`<div class="admin-panel-head"><div><span class="eyebrow">TRAFFIC / SEO</span><h2>流量／SEO 分析</h2><p>查看品牌與商品有效瀏覽，協助判斷 SEO 優先順序。資料自啟用統計後開始累積。</p></div><div><select id="analyticsPeriod"><option value="7">本週</option><option value="30" selected>近 30 天</option></select></div></div><div id="analyticsSummary" class="admin-stats"></div><div id="analyticsStatus" class="admin-usage-note">正在讀取統計資料…</div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>品牌／商品</th><th>本期點閱</th><th>前期</th><th>變化</th><th>SEO 判斷</th></tr></thead><tbody id="analyticsRows"></tbody></table></div><div class="admin-usage-note"><b>AI SEO：</b>目前先保留欄位與接口；未取得公司 GA4 / Search Console 權限前，不會假裝有 AI 導流或 Google 搜尋數據。</div>`;
    anchor.after(el);
    document.getElementById('analyticsPeriod').addEventListener('change',refresh);
    refresh();
  }

  async function refresh(){
    const days=Number(document.getElementById('analyticsPeriod')?.value||30);
    const status=document.getElementById('analyticsStatus');
    const body=document.getElementById('analyticsRows');
    const sum=document.getElementById('analyticsSummary');
    if(status) status.textContent='正在讀取統計資料…';
    try{
      const rows=await load(days);
      const sorted=[...rows].sort((a,b)=>(b.views||0)-(a.views||0));
      const total=sorted.reduce((n,x)=>n+(Number(x.views)||0),0);
      const brands={};
      sorted.forEach(x=>{const b=x.brand||'未分類'; brands[b]=(brands[b]||0)+(Number(x.views)||0)});
      const topBrand=Object.entries(brands).sort((a,b)=>b[1]-a[1])[0];
      const top=sorted[0];
      sum.innerHTML=`<div class="admin-stat"><b>${total}</b><span>本期有效瀏覽</span></div><div class="admin-stat"><b>${esc(topBrand?.[0]||'—')}</b><span>熱門品牌</span></div><div class="admin-stat"><b>${esc(top?.model||top?.product_id||'—')}</b><span>熱門商品</span></div>`;
      if(!sorted.length){
        body.innerHTML='<tr><td colspan="5">目前還沒有點閱資料，從統計啟用後開始累積。</td></tr>';
      }else{
        body.innerHTML=sorted.map(x=>{
          const [tag,tip]=verdict(Number(x.views)||0,Number(x.previous_views)||0);
          return `<tr><td><b>${esc(x.brand||'')}</b><br><span>${esc(x.model||x.product_id)}</span></td><td>${Number(x.views)||0}</td><td>${Number(x.previous_views)||0}</td><td>${pct(Number(x.views)||0,Number(x.previous_views)||0)}</td><td><b>${tag}</b><br><span>${tip}</span></td></tr>`;
        }).join('');
      }
      status.textContent=`已讀取近 ${days} 天資料；點閱為有效瀏覽，不等同於不重複訪客。`;
    }catch(e){
      status.textContent='統計資料暫時讀取失敗，前台點閱記錄不受影響。';
      if(body) body.innerHTML='<tr><td colspan="5">目前無法載入統計。</td></tr>';
    }
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',build):build();
})();