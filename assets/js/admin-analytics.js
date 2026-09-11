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
  const growth=(now,prev)=>!prev?(now>0?100:0):((now-prev)/prev)*100;
  const priority=(now,prev)=>{
    const g=growth(now,prev);
    if(now>=10 && g>=30) return {score:100,label:'優先處理',reason:'高關注＋成長快'};
    if(now>=10) return {score:85,label:'優先強化',reason:'站內關注度高'};
    if(prev>=8 && g<=-25) return {score:80,label:'檢查下滑',reason:'流量明顯下降'};
    if(now>=5 && g>=20) return {score:70,label:'值得加強',reason:'需求正在上升'};
    if(now>=5) return {score:55,label:'持續優化',reason:'已有穩定需求'};
    return {score:20,label:'先觀察',reason:'資料仍在累積'};
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

  function aggregateBrands(rows){
    const map=new Map();
    rows.forEach(x=>{
      const brand=x.brand||'未分類';
      const cur=map.get(brand)||{brand,views:0,previous_views:0,products:0};
      cur.views+=Number(x.views)||0;
      cur.previous_views+=Number(x.previous_views)||0;
      cur.products+=1;
      map.set(brand,cur);
    });
    return [...map.values()].map(x=>({...x,...priority(x.views,x.previous_views)})).sort((a,b)=>b.score-a.score||b.views-a.views);
  }

  function build(){
    const anchor=document.getElementById('adminStats');
    if(!anchor||document.getElementById('adminAnalytics')) return;
    const el=document.createElement('section');
    el.id='adminAnalytics';
    el.className='admin-panel';
    el.innerHTML=`<div class="admin-panel-head"><div><span class="eyebrow">TRAFFIC / SEO</span><h2>流量／SEO 分析</h2><p>先用站內有效瀏覽判斷品牌與商品需求；Google SEO、AI SEO 等有公司權限後再接入，不會混用或假造數據。</p></div><div><select id="analyticsPeriod"><option value="7">本週</option><option value="30" selected>近 30 天</option></select></div></div>
      <div id="analyticsSummary" class="admin-stats"></div>
      <div id="analyticsStatus" class="admin-usage-note">正在讀取統計資料…</div>
      <h3 style="margin:20px 0 10px">SEO 優先商品</h3>
      <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>品牌／商品</th><th>本期點閱</th><th>前期</th><th>變化</th><th>SEO 優先判斷</th></tr></thead><tbody id="analyticsRows"></tbody></table></div>
      <h3 style="margin:24px 0 10px">品牌排行</h3>
      <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>品牌</th><th>商品數</th><th>本期點閱</th><th>前期</th><th>變化</th><th>建議</th></tr></thead><tbody id="analyticsBrandRows"></tbody></table></div>
      <div class="admin-usage-note"><b>Google SEO：</b>尚未連接公司 Search Console / GA4 權限。<br><b>AI SEO：</b>尚未連接可驗證的 AI 導流資料，因此目前不顯示提及次數或 AI 點擊，避免誤判。</div>`;
    anchor.after(el);
    document.getElementById('analyticsPeriod').addEventListener('change',refresh);
    refresh();
  }

  async function refresh(){
    const days=Number(document.getElementById('analyticsPeriod')?.value||30);
    const status=document.getElementById('analyticsStatus');
    const body=document.getElementById('analyticsRows');
    const brandBody=document.getElementById('analyticsBrandRows');
    const sum=document.getElementById('analyticsSummary');
    if(status) status.textContent='正在讀取統計資料…';
    try{
      const rows=await load(days);
      const products=[...rows].map(x=>{
        const views=Number(x.views)||0, previous_views=Number(x.previous_views)||0;
        return {...x,views,previous_views,...priority(views,previous_views)};
      }).sort((a,b)=>b.score-a.score||b.views-a.views);
      const brands=aggregateBrands(rows);
      const total=products.reduce((n,x)=>n+x.views,0);
      const prevTotal=products.reduce((n,x)=>n+x.previous_views,0);
      const topBrand=brands[0];
      const top=products[0];
      const urgent=products.filter(x=>x.score>=80).length;
      sum.innerHTML=`<div class="admin-stat"><b>${total}</b><span>本期有效瀏覽</span></div><div class="admin-stat"><b>${pct(total,prevTotal)}</b><span>較前一期</span></div><div class="admin-stat"><b>${esc(topBrand?.brand||'—')}</b><span>優先品牌</span></div><div class="admin-stat"><b>${esc(top?.model||top?.product_id||'—')}</b><span>優先商品</span></div><div class="admin-stat"><b>${urgent}</b><span>需優先檢查項目</span></div>`;
      if(!products.length){
        body.innerHTML='<tr><td colspan="5">目前還沒有點閱資料，從統計啟用後開始累積。</td></tr>';
        brandBody.innerHTML='<tr><td colspan="6">目前還沒有品牌統計。</td></tr>';
      }else{
        body.innerHTML=products.map(x=>`<tr><td><b>${esc(x.brand||'')}</b><br><span>${esc(x.model||x.product_id)}</span></td><td>${x.views}</td><td>${x.previous_views}</td><td>${pct(x.views,x.previous_views)}</td><td><b>${esc(x.label)}</b><br><span>${esc(x.reason)}</span></td></tr>`).join('');
        brandBody.innerHTML=brands.map(x=>`<tr><td><b>${esc(x.brand)}</b></td><td>${x.products}</td><td>${x.views}</td><td>${x.previous_views}</td><td>${pct(x.views,x.previous_views)}</td><td><b>${esc(x.label)}</b><br><span>${esc(x.reason)}</span></td></tr>`).join('');
      }
      status.textContent=`已讀取近 ${days} 天資料。這裡是有效瀏覽，不等同不重複訪客；SEO 優先級是站內需求訊號，不代表 Google 排名。`;
    }catch(e){
      status.textContent='統計資料暫時讀取失敗，前台點閱記錄不受影響。';
      if(body) body.innerHTML='<tr><td colspan="5">目前無法載入統計。</td></tr>';
      if(brandBody) brandBody.innerHTML='<tr><td colspan="6">目前無法載入品牌統計。</td></tr>';
    }
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',build):build();
})();