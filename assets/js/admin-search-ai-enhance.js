(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbSearchAiEnhance)return;
  window.__fbSearchAiEnhance=true;
  const ENDPOINT='https://papqrnqbfauwuipjwwdh.supabase.co/functions/v1/admin-analytics-secure';
  const $=(s,p=document)=>p.querySelector(s);
  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
  let latest=null;

  async function load(){
    const session=window.FBAdminAuth?.session?.();
    if(!session?.access_token)throw new Error('login_required');
    const days=Number($('#analyticsPeriod')?.value||30);
    const r=await fetch(`${ENDPOINT}?period_days=${days}`,{headers:{Authorization:`Bearer ${session.access_token}`},cache:'no-store'});
    const b=await r.json().catch(()=>({}));
    if(!r.ok)throw new Error(b.error||'read_failed');
    latest={days,data:b,loadedAt:new Date()};
    return latest;
  }

  function quality(data){
    const rows=Array.isArray(data?.source_domains)?data.source_domains:[];
    const ai=rows.filter(x=>x.traffic_source==='ai');
    const known=ai.filter(x=>String(x.referrer_domain||'').trim()).reduce((n,x)=>n+(Number(x.views)||0),0);
    const total=ai.reduce((n,x)=>n+(Number(x.views)||0),0);
    if(!total)return {label:'尚無 AI 樣本',detail:'目前沒有可辨識 AI 導流資料，先持續累積。'};
    const rate=Math.round(known/total*100);
    return {label:`AI 來源可辨識率 ${rate}%`,detail:rate>=80?'來源品質良好，可作平台趨勢參考。':rate>=50?'部分來源無法細分平台，判讀時需保留。':'多數 AI 導流缺乏 Referrer 細節，不宜過度解讀平台占比。'};
  }

  function opportunities(data){
    const rows=(Array.isArray(data?.rows)?data.rows:[]).map(x=>({...x,views:Number(x.views)||0,previous_views:Number(x.previous_views)||0}));
    return rows.map(x=>{
      const delta=x.previous_views?Math.round((x.views-x.previous_views)/x.previous_views*100):(x.views>0?100:0);
      let label='持續觀察',reason='樣本仍在累積';
      if(x.views>=10&&delta>=30){label='優先補強內容';reason='本期關注高且成長快';}
      else if(x.views>=10){label='維持並加深內容';reason='站內關注度高';}
      else if(x.views>=5&&delta>=20){label='值得測試 SEO 內容';reason='需求正在成長';}
      else if(x.previous_views>=8&&delta<=-25){label='檢查下滑原因';reason='本期關注明顯下降';}
      return {...x,delta,label,reason};
    }).sort((a,b)=>{
      const score=x=>x.label==='優先補強內容'?4:x.label==='維持並加深內容'?3:x.label==='值得測試 SEO 內容'?2:x.label==='檢查下滑原因'?2:1;
      return score(b)-score(a)||b.views-a.views;
    }).slice(0,5);
  }

  function render(data){
    const box=$('#saiDecisionPanel');
    if(!box)return;
    const qq=quality(data),ops=opportunities(data);
    box.innerHTML=`<div class="sai-brief"><h4>資料可信度／決策提醒</h4><ul><li><b>${esc(qq.label)}</b>：${esc(qq.detail)}</li><li>Google 關鍵字正式成效仍以 Search Console 為唯一依據；目前站內瀏覽只能拿來判斷內容優先順序。</li><li>AI 平台統計代表可辨識導流，不代表 AI 回答中提及或引用萬里資訊的次數。</li></ul></div><div class="sai-block"><h4>本期內容優先建議</h4><div class="sai-table-wrap"><table class="sai-table"><thead><tr><th>品牌／產品</th><th>本期</th><th>前期</th><th>建議</th><th>原因</th></tr></thead><tbody>${ops.length?ops.map(x=>`<tr><td><b>${esc(x.brand||'')}</b><br>${esc(x.model||x.product_id||'')}</td><td>${x.views}</td><td>${x.previous_views}</td><td><b>${esc(x.label)}</b></td><td>${esc(x.reason)}</td></tr>`).join(''):'<tr><td colspan="5">目前資料不足，尚未產生優先建議。</td></tr>'}</tbody></table></div></div>`;
  }

  function exportCsv(){
    if(!latest){window.FBPages?.toast?.('請先重新整理統計資料');return;}
    const {days,data}=latest,lines=[];
    lines.push(['報表期間','資料類型','品牌/平台','產品/來源網域','本期','前期','資料來源'].map(q).join(','));
    (data.rows||[]).forEach(x=>lines.push([`近${days}天`,'產品',x.brand||'',x.model||x.product_id,x.views,x.previous_views,'網站匿名產品瀏覽事件'].map(q).join(',')));
    (data.sources||[]).forEach(x=>lines.push([`近${days}天`,'流量來源',x.traffic_source,'',x.views,x.previous_views,'站內分析後端彙總'].map(q).join(',')));
    (data.source_domains||[]).forEach(x=>lines.push([`近${days}天`,'來源網域',x.traffic_source,x.referrer_domain||'',x.views,x.previous_views,'瀏覽器 Referrer 網域明細'].map(q).join(',')));
    const blob=new Blob(['\ufeff'+lines.join('\n')],{type:'text/csv;charset=utf-8'}),a=document.createElement('a');
    a.href=URL.createObjectURL(blob);a.download=`far-beyound-search-ai-report-${days}days-${new Date().toISOString().slice(0,10)}.csv`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  }

  async function refresh(){
    try{const x=await load();render(x.data);}catch(_){const box=$('#saiDecisionPanel');if(box)box.innerHTML='<div class="sai-note"><b>資料狀態：</b>登入具備「流量分析」權限的個人帳號後，才會顯示真實決策建議。</div>';}
  }

  function build(){
    const host=$('#adminSearchAiInsights');
    if(!host||$('#saiDecisionPanel'))return false;
    const head=host.querySelector('.sai-head');
    if(head&&!$('#saiExportCsv')){const b=document.createElement('button');b.id='saiExportCsv';b.className='btn btn-secondary btn-sm';b.type='button';b.textContent='匯出成效報表 CSV';b.addEventListener('click',exportCsv);const refreshBtn=$('#saiRefresh');refreshBtn?.insertAdjacentElement('afterend',b);}
    const panel=document.createElement('div');panel.id='saiDecisionPanel';panel.innerHTML='<div class="sai-note">正在建立資料可信度與內容優先建議…</div>';
    const note=host.querySelector('.sai-note');note?note.before(panel):host.appendChild(panel);
    $('#analyticsPeriod')?.addEventListener('change',()=>setTimeout(refresh,150));
    $('#saiRefresh')?.addEventListener('click',()=>setTimeout(refresh,150));
    window.addEventListener('farbeyound:adminauth',refresh);
    setTimeout(refresh,700);
    return true;
  }

  const boot=()=>{if(!build())setTimeout(boot,150)};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();
