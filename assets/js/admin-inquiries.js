(()=>{
  if(document.body.dataset.page!=='admin')return;
  const ENDPOINT='https://papqrnqbfauwuipjwwdh.supabase.co/functions/v1/admin-inquiries';
  const PASS_KEY='farbeyoundInquiryPassV1';
  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const fmt=v=>{try{return new Date(v).toLocaleString('zh-TW',{hour12:false})}catch(_){return String(v||'')}};
  let lastRows=[];
  function getPass(){
    let pass=sessionStorage.getItem(PASS_KEY)||'';
    if(!pass)pass=prompt('查看網站詢問資料\n\n請輸入後台發布密碼：','')||'';
    if(pass)sessionStorage.setItem(PASS_KEY,pass);
    return pass;
  }
  function statusLabel(v){return v==='sent'?'已寄出':v==='failed'?'寄送失敗':'待處理'}
  function render(){
    const body=document.getElementById('inquiryRows');if(!body)return;
    const q=(document.getElementById('inquirySearch')?.value||'').trim().toLowerCase();
    const state=document.getElementById('inquiryEmailFilter')?.value||'';
    const rows=lastRows.filter(x=>{
      if(state&&String(x.email_status||'')!==state)return false;
      if(!q)return true;
      return [x.company,x.department,x.contact_name,x.job_title,x.subject,x.budget,x.phone,x.extension,x.mobile,x.email,x.message].some(v=>String(v||'').toLowerCase().includes(q));
    });
    const count=document.getElementById('inquiryVisibleCount');if(count)count.textContent=`顯示 ${rows.length}／${lastRows.length} 筆`;
    if(!rows.length){body.innerHTML=`<tr><td colspan="6">${lastRows.length?'沒有符合目前搜尋／篩選條件的詢問。':'目前還沒有網站詢問紀錄。'}</td></tr>`;return}
    body.innerHTML=rows.map(x=>`<tr><td>${esc(fmt(x.created_at))}</td><td><b>${esc(x.company)}</b><br><span>${esc(x.department||'')} ${esc(x.contact_name||'')}${x.job_title?'／'+esc(x.job_title):''}</span></td><td>${esc(x.subject||'一般詢問')}${x.budget?'<br><span>'+esc(x.budget)+'</span>':''}</td><td>${esc(x.phone||'')}${x.extension?' 分機 '+esc(x.extension):''}${x.mobile?'<br>'+esc(x.mobile):''}<br><a href="mailto:${esc(x.email||'')}">${esc(x.email||'')}</a></td><td><b>${esc(statusLabel(x.email_status))}</b></td><td style="min-width:220px;white-space:normal">${esc(x.message||'—')}</td></tr>`).join('');
  }
  function build(){
    if(document.getElementById('adminInquiries'))return;
    const anchor=document.getElementById('adminAnalytics')||document.getElementById('products');
    if(!anchor){setTimeout(build,100);return}
    const box=document.createElement('section');
    box.id='adminInquiries';box.className='admin-panel';
    box.innerHTML='<div class="admin-panel-head"><div><span class="eyebrow">CUSTOMER INQUIRIES</span><h2>網站詢問紀錄</h2><p>客戶從「聯絡我們」送出的資料會先安全留存在資料庫；即使 Email 通知失敗，也能在這裡查回。</p></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button id="inquiryLoad" class="btn btn-primary btn-sm" type="button">讀取最新詢問</button><button id="inquiryForget" class="btn btn-secondary btn-sm" type="button">重新驗證</button></div></div><div id="inquiryStatus" class="admin-usage-note">尚未讀取。查看客戶資料時才會要求驗證。</div><div class="admin-product-tools" style="margin:0 18px 12px"><input id="inquirySearch" type="search" placeholder="搜尋公司、姓名、電話、Email、內容…" aria-label="搜尋網站詢問"><select id="inquiryEmailFilter" aria-label="Email 通知狀態"><option value="">全部通知狀態</option><option value="sent">已寄出</option><option value="failed">寄送失敗</option></select><span id="inquiryVisibleCount" class="admin-product-count">尚未讀取</span></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>時間</th><th>公司／聯絡人</th><th>洽詢項目</th><th>聯絡方式</th><th>Email 通知</th><th>內容</th></tr></thead><tbody id="inquiryRows"><tr><td colspan="6">尚未讀取資料。</td></tr></tbody></table></div>';
    anchor.after(box);
    document.getElementById('inquiryLoad').onclick=load;
    document.getElementById('inquiryForget').onclick=()=>{sessionStorage.removeItem(PASS_KEY);document.getElementById('inquiryStatus').textContent='已清除本次瀏覽器驗證，下次讀取會重新要求密碼。'};
    document.getElementById('inquirySearch').addEventListener('input',render);
    document.getElementById('inquiryEmailFilter').addEventListener('change',render);
  }
  async function load(){
    const pass=getPass();if(!pass)return;
    const status=document.getElementById('inquiryStatus'),body=document.getElementById('inquiryRows');
    status.textContent='正在讀取最新詢問…';
    try{
      const r=await fetch(ENDPOINT+'?limit=100',{headers:{'x-admin-pass':pass},cache:'no-store'});
      if(r.status===401){sessionStorage.removeItem(PASS_KEY);throw new Error('auth')}
      if(!r.ok)throw new Error('read');
      lastRows=await r.json();
      render();
      status.textContent=lastRows.length?`已讀取 ${lastRows.length} 筆最新詢問。可使用下方搜尋與通知狀態篩選。`:'已讀取，目前沒有詢問紀錄。';
    }catch(e){
      lastRows=[];
      status.textContent=e.message==='auth'?'密碼不正確，請重新驗證。':'詢問資料讀取失敗，請稍後再試。';
      body.innerHTML='<tr><td colspan="6">目前無法載入詢問資料。</td></tr>';
      const count=document.getElementById('inquiryVisibleCount');if(count)count.textContent='讀取失敗';
    }
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',build,{once:true}):build();
})();
