(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminInquiries)return;
  window.__fbAdminInquiries=true;

  const ENDPOINT='https://papqrnqbfauwuipjwwdh.supabase.co/functions/v1/admin-inquiries';
  const $=(s,p=document)=>p.querySelector(s);
  const $$=(s,p=document)=>[...p.querySelectorAll(s)];
  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const fmt=v=>{try{return new Date(v).toLocaleString('zh-TW',{hour12:false})}catch(_){return String(v||'')}};
  const tel=v=>String(v||'').replace(/[^0-9+]/g,'');
  let lastRows=[];
  let legacyPending=null;

  function legacyPassword(){
    if(legacyPending)return legacyPending;
    legacyPending=new Promise(resolve=>{
      let root=$('#inquiryLegacyAuth');
      if(!root){
        root=document.createElement('div');
        root.id='inquiryLegacyAuth';
        root.className='inquiry-legacy-auth';
        root.innerHTML='<form class="inquiry-legacy-card"><h3>查看詢問資料</h3><p>首位 Owner 尚未建立時可暫用共用後台密碼。密碼只用於本次讀取，不會存入瀏覽器。</p><input type="password" autocomplete="current-password" aria-label="後台發布密碼" required maxlength="256"><div class="inquiry-legacy-actions"><button class="btn btn-primary" type="submit">驗證並讀取</button><button class="btn btn-secondary" type="button">取消</button></div></form>';
        document.body.appendChild(root);
      }
      const form=$('form',root),input=$('input',root),cancel=$('button[type="button"]',root);
      const done=v=>{input.value='';root.classList.remove('open');form.onsubmit=null;cancel.onclick=null;resolve(v)};
      form.onsubmit=e=>{e.preventDefault();done(input.value||'')};
      cancel.onclick=()=>done('');
      root.classList.add('open');
      setTimeout(()=>input.focus(),20);
    }).finally(()=>{legacyPending=null});
    return legacyPending;
  }

  function statusLabel(v){
    return v==='sent'?'已寄出':v==='failed'?'寄送失敗':'待處理';
  }

  function contactHtml(x){
    const parts=[];
    const phone=String(x.phone||'').trim();
    const mobile=String(x.mobile||'').trim();
    const email=String(x.email||'').trim();
    if(phone){
      const number=tel(phone);
      parts.push(`<a class="inquiry-contact-link" href="${number?'tel:'+esc(number):'#'}">${esc(phone)}${x.extension?' 分機 '+esc(x.extension):''}</a>`);
    }
    if(mobile){
      const number=tel(mobile);
      parts.push(`<a class="inquiry-contact-link" href="${number?'tel:'+esc(number):'#'}">${esc(mobile)}</a>`);
    }
    if(email)parts.push(`<a class="inquiry-contact-link" href="mailto:${esc(email)}">${esc(email)}</a>`);
    return parts.length?`<div class="inquiry-contact-stack">${parts.join('')}</div>`:'—';
  }

  function summary(){
    const box=$('#inquirySummary');
    if(!box)return;
    const sent=lastRows.filter(x=>x.email_status==='sent').length;
    const failed=lastRows.filter(x=>x.email_status==='failed').length;
    const pending=lastRows.length-sent-failed;
    box.innerHTML=`
      <button type="button" data-email-filter=""><b>${lastRows.length}</b><span>全部詢問</span></button>
      <button type="button" data-email-filter="sent"><b>${sent}</b><span>Email 已寄出</span></button>
      <button type="button" data-email-filter="failed" class="${failed?'warn':''}"><b>${failed}</b><span>寄送失敗</span></button>
      <button type="button" data-email-filter="pending"><b>${pending}</b><span>待處理通知</span></button>`;
    $$('[data-email-filter]',box).forEach(btn=>btn.addEventListener('click',()=>{
      const filter=$('#inquiryEmailFilter');
      if(filter){filter.value=btn.dataset.emailFilter||'';render()}
    }));
  }

  function filteredRows(){
    const q=($('#inquirySearch')?.value||'').trim().toLowerCase();
    const state=$('#inquiryEmailFilter')?.value||'';
    const contact=$('#inquiryContactFilter')?.value||'';
    const sort=$('#inquirySort')?.value||'newest';
    const rows=lastRows.filter(x=>{
      if(state&&String(x.email_status||'')!==state)return false;
      if(contact==='phone'&&!String(x.phone||'').trim())return false;
      if(contact==='mobile'&&!String(x.mobile||'').trim())return false;
      if(contact==='email'&&!String(x.email||'').trim())return false;
      if(!q)return true;
      return [x.company,x.department,x.contact_name,x.job_title,x.subject,x.budget,x.phone,x.extension,x.mobile,x.email,x.message].some(v=>String(v||'').toLowerCase().includes(q));
    });
    rows.sort((a,b)=>{
      if(sort==='oldest')return new Date(a.created_at)-new Date(b.created_at);
      if(sort==='company')return String(a.company||'').localeCompare(String(b.company||''),'zh-Hant');
      if(sort==='contact')return String(a.contact_name||'').localeCompare(String(b.contact_name||''),'zh-Hant');
      return new Date(b.created_at)-new Date(a.created_at);
    });
    return rows;
  }

  function render(){
    const body=$('#inquiryRows');
    if(!body)return;
    const rows=filteredRows();
    const count=$('#inquiryVisibleCount');
    if(count)count.textContent=`顯示 ${rows.length}／${lastRows.length} 筆`;
    if(!rows.length){
      body.innerHTML=`<tr><td colspan="7">${lastRows.length?'沒有符合目前搜尋／篩選條件的詢問。':'目前還沒有網站詢問紀錄。'}</td></tr>`;
      window.dispatchEvent(new CustomEvent('farbeyound:inquiries-rendered'));
      return;
    }
    body.innerHTML=rows.map(x=>`<tr data-inquiry-id="${esc(x.id)}"><td>${esc(fmt(x.created_at))}</td><td><b>${esc(x.company)}</b><br><span>${esc(x.department||'')} ${esc(x.contact_name||'')}${x.job_title?'／'+esc(x.job_title):''}</span></td><td>${esc(x.subject||'一般詢問')}${x.budget?'<br><span>'+esc(x.budget)+'</span>':''}</td><td>${contactHtml(x)}</td><td><span class="inquiry-status ${esc(x.email_status||'pending')}">${esc(statusLabel(x.email_status))}</span></td><td class="inquiry-message-cell">${esc(x.message||'—')}</td><td><button type="button" class="btn btn-secondary btn-sm inquiry-detail" data-id="${esc(x.id)}">查看詳情</button></td></tr>`).join('');
    $$('.inquiry-detail',body).forEach(btn=>btn.addEventListener('click',()=>openDetail(btn.dataset.id)));
    window.dispatchEvent(new CustomEvent('farbeyound:inquiries-rendered'));
  }

  async function copyText(text,label){
    try{
      await navigator.clipboard.writeText(text);
      alert(`${label}已複製。`);
    }catch(_){
      prompt(`請複製${label}：`,text);
    }
  }

  function openDetail(id){
    const x=lastRows.find(row=>String(row.id)===String(id));
    if(!x)return;
    const root=$('#inquiryDetailModal');
    if(!root)return;
    const title=$('#inquiryDetailTitle');
    const body=$('#inquiryDetailBody');
    const copy=$('#inquiryDetailCopy');
    if(title)title.textContent=x.company||'詢問詳情';
    if(body)body.innerHTML=`
      <div class="inquiry-detail-grid">
        <div><small>收到時間</small><b>${esc(fmt(x.created_at))}</b></div>
        <div><small>Email 通知</small><b>${esc(statusLabel(x.email_status))}</b></div>
        <div><small>公司</small><b>${esc(x.company||'—')}</b></div>
        <div><small>部門／聯絡人</small><b>${esc([x.department,x.contact_name,x.job_title].filter(Boolean).join('／')||'—')}</b></div>
        <div><small>洽詢項目</small><b>${esc(x.subject||'一般詢問')}</b></div>
        <div><small>預算</small><b>${esc(x.budget||'—')}</b></div>
      </div>
      <div class="inquiry-detail-block"><small>聯絡方式</small>${contactHtml(x)}</div>
      <div class="inquiry-detail-block"><small>詢問內容</small><p>${esc(x.message||'—')}</p></div>
      ${x.source_url?`<div class="inquiry-detail-block"><small>來源頁面</small><p class="inquiry-source">${esc(x.source_url)}</p></div>`:''}`;
    if(copy)copy.onclick=()=>{
      const text=[
        `公司：${x.company||''}`,
        `聯絡人：${[x.department,x.contact_name,x.job_title].filter(Boolean).join('／')}`,
        `電話：${x.phone||''}${x.extension?' 分機 '+x.extension:''}`,
        `手機：${x.mobile||''}`,
        `Email：${x.email||''}`,
        `洽詢：${x.subject||'一般詢問'}`,
        `內容：${x.message||''}`
      ].join('\n');
      copyText(text,'聯絡資料');
    };
    root.classList.add('open');
    root.setAttribute('aria-hidden','false');
    document.body.classList.add('inquiry-detail-open');
    setTimeout(()=>$('#inquiryDetailClose')?.focus(),20);
  }

  function closeDetail(){
    const root=$('#inquiryDetailModal');
    if(!root)return;
    root.classList.remove('open');
    root.setAttribute('aria-hidden','true');
    document.body.classList.remove('inquiry-detail-open');
  }

  function resetFilters(){
    if($('#inquirySearch'))$('#inquirySearch').value='';
    if($('#inquiryEmailFilter'))$('#inquiryEmailFilter').value='';
    if($('#inquiryContactFilter'))$('#inquiryContactFilter').value='';
    if($('#inquirySort'))$('#inquirySort').value='newest';
    render();
  }

  function injectStyle(){
    if($('#inquiryManagerStyle'))return;
    const st=document.createElement('style');
    st.id='inquiryManagerStyle';
    st.textContent=`
      .inquiry-legacy-auth{position:fixed;inset:0;z-index:10070;display:none;place-items:center;padding:18px;background:rgba(7,24,45,.62);backdrop-filter:blur(5px)}
      .inquiry-legacy-auth.open{display:grid}.inquiry-legacy-card{width:min(420px,100%);padding:20px;border-radius:16px;background:#fff;box-shadow:0 26px 70px rgba(0,0,0,.28)}
      .inquiry-legacy-card h3{margin:0 0 6px}.inquiry-legacy-card p{margin:0 0 14px;color:#6c808c;font-size:12px;line-height:1.6}.inquiry-legacy-card input{box-sizing:border-box;width:100%;min-height:44px;padding:10px 12px;border:1px solid #cfdde3;border-radius:10px;font-size:16px}.inquiry-legacy-actions{display:flex;gap:8px;margin-top:12px}.inquiry-legacy-actions .btn{flex:1}
      .inquiry-summary{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px;padding:0 18px 12px}.inquiry-summary button{display:flex;flex-direction:column;gap:2px;align-items:flex-start;padding:11px 12px;border:1px solid #dce8ec;border-radius:11px;background:#fff;color:#496470;text-align:left;cursor:pointer}.inquiry-summary button:hover{border-color:#aacbd4;background:#f7fbfc}.inquiry-summary button.warn{border-color:#f0cfaa;background:#fff9f1}.inquiry-summary b{font-size:18px;color:#244f61}.inquiry-summary span{font-size:10px;font-weight:800}
      #adminInquiries .admin-product-tools{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.inquiry-tool-grow{flex:1 1 250px;min-width:190px}.inquiry-status{display:inline-flex;padding:4px 8px;border-radius:999px;background:#f1f5f7;color:#59717d;font-size:10px;font-weight:900;white-space:nowrap}.inquiry-status.sent{background:#eaf8f1;color:#23744e}.inquiry-status.failed{background:#fff0ed;color:#a34232}.inquiry-message-cell{max-width:360px;white-space:normal;line-height:1.6}
      .inquiry-detail-modal{position:fixed;inset:0;z-index:10090;display:none;place-items:center;padding:20px;background:rgba(8,25,39,.62);backdrop-filter:blur(5px)}.inquiry-detail-modal.open{display:grid}.inquiry-detail-card{width:min(720px,100%);max-height:min(82vh,760px);overflow:auto;border-radius:18px;background:#fff;box-shadow:0 28px 80px rgba(0,0,0,.28)}.inquiry-detail-head{position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:16px 18px;border-bottom:1px solid #e3ecef;background:#fff}.inquiry-detail-head h3{margin:0;color:#244f61}.inquiry-detail-head button{min-width:42px}.inquiry-detail-body{padding:18px}.inquiry-detail-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.inquiry-detail-grid>div,.inquiry-detail-block{padding:12px;border:1px solid #e1eaee;border-radius:11px;background:#f9fbfc}.inquiry-detail-grid small,.inquiry-detail-block>small{display:block;margin-bottom:5px;color:#80919a;font-size:10px;font-weight:800}.inquiry-detail-grid b{display:block;color:#314f5d;overflow-wrap:anywhere}.inquiry-detail-block{margin-top:10px}.inquiry-detail-block p{margin:0;color:#3f5864;line-height:1.75;white-space:pre-wrap;overflow-wrap:anywhere}.inquiry-source{font-size:11px}.inquiry-detail-actions{display:flex;justify-content:flex-end;gap:8px;padding:0 18px 18px}.inquiry-detail-open{overflow:hidden}
      @media(max-width:820px){.inquiry-summary{grid-template-columns:repeat(2,minmax(0,1fr));padding:0 12px 12px}.inquiry-summary button{min-height:64px}.inquiry-summary b{font-size:17px}#adminInquiries .admin-product-tools{padding-inline:12px!important}.inquiry-tool-grow{flex-basis:100%;width:100%}.inquiry-message-cell{max-width:none}.inquiry-detail-modal{align-items:end;padding:0}.inquiry-detail-card{width:100%;max-height:88vh;border-radius:18px 18px 0 0}.inquiry-detail-head{padding:14px 15px}.inquiry-detail-body{padding:14px}.inquiry-detail-grid{grid-template-columns:1fr}.inquiry-detail-actions{position:sticky;bottom:0;padding:10px 14px calc(10px + env(safe-area-inset-bottom));background:#fff;border-top:1px solid #e3ecef}.inquiry-detail-actions .btn{flex:1;min-height:44px}}
    `;
    document.head.appendChild(st);
  }

  function buildDetail(){
    if($('#inquiryDetailModal'))return;
    const root=document.createElement('div');
    root.id='inquiryDetailModal';
    root.className='inquiry-detail-modal';
    root.setAttribute('role','dialog');
    root.setAttribute('aria-modal','true');
    root.setAttribute('aria-hidden','true');
    root.setAttribute('aria-labelledby','inquiryDetailTitle');
    root.innerHTML='<div class="inquiry-detail-card"><div class="inquiry-detail-head"><h3 id="inquiryDetailTitle">詢問詳情</h3><button id="inquiryDetailClose" class="btn btn-secondary btn-sm" type="button" aria-label="關閉">關閉</button></div><div id="inquiryDetailBody" class="inquiry-detail-body"></div><div class="inquiry-detail-actions"><button id="inquiryDetailCopy" class="btn btn-secondary" type="button">複製聯絡資料</button><button id="inquiryDetailDone" class="btn btn-primary" type="button">完成查看</button></div></div>';
    document.body.appendChild(root);
    $('#inquiryDetailClose',root).addEventListener('click',closeDetail);
    $('#inquiryDetailDone',root).addEventListener('click',closeDetail);
    root.addEventListener('click',e=>{if(e.target===root)closeDetail()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&root.classList.contains('open'))closeDetail()});
  }

  function build(){
    if($('#adminInquiries'))return;
    const anchor=$('#adminAnalytics')||$('#products');
    if(!anchor){setTimeout(build,100);return}
    injectStyle();
    buildDetail();
    const box=document.createElement('section');
    box.id='adminInquiries';
    box.className='admin-panel';
    box.innerHTML=`
      <div class="admin-panel-head">
        <div><span class="eyebrow">CUSTOMER INQUIRIES</span><h2>網站詢問紀錄</h2><p>客戶表單會先安全留存在資料庫；正式個人帳號建立後，只允許具備「網站詢問」權限的人員讀取。</p></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap"><button id="inquiryLoad" class="btn btn-primary btn-sm" type="button">讀取最新詢問</button><button id="inquiryAccess" class="btn btn-secondary btn-sm" type="button">帳號／權限</button></div>
      </div>
      <div id="inquiryStatus" class="admin-usage-note">尚未讀取。客戶聯絡資料屬敏感資訊，不會在頁面載入時自動讀取。</div>
      <div id="inquirySummary" class="inquiry-summary" aria-label="詢問摘要"></div>
      <div class="admin-product-tools" style="margin:0 18px 12px">
        <input id="inquirySearch" class="inquiry-tool-grow" type="search" placeholder="搜尋公司、姓名、電話、Email、內容…" aria-label="搜尋網站詢問">
        <select id="inquiryEmailFilter" aria-label="Email 通知狀態"><option value="">全部通知狀態</option><option value="sent">已寄出</option><option value="failed">寄送失敗</option><option value="pending">待處理</option></select>
        <select id="inquiryContactFilter" aria-label="聯絡方式"><option value="">全部聯絡方式</option><option value="phone">有市話</option><option value="mobile">有手機</option><option value="email">有 Email</option></select>
        <select id="inquirySort" aria-label="排序方式"><option value="newest">最新優先</option><option value="oldest">最舊優先</option><option value="company">公司名稱</option><option value="contact">聯絡人姓名</option></select>
        <button id="inquiryClear" class="btn btn-secondary btn-sm" type="button">清除條件</button>
        <span id="inquiryVisibleCount" class="admin-product-count">尚未讀取</span>
      </div>
      <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>時間</th><th>公司／聯絡人</th><th>洽詢項目</th><th>聯絡方式</th><th>Email 通知</th><th>內容</th><th>操作</th></tr></thead><tbody id="inquiryRows"><tr><td colspan="7">尚未讀取資料。</td></tr></tbody></table></div>`;
    anchor.after(box);
    $('#inquiryLoad').addEventListener('click',load);
    $('#inquiryAccess').addEventListener('click',()=>{
      const x=$('#adminAccessCenter');
      if(x?.tagName==='DETAILS')x.open=true;
      x?.scrollIntoView({behavior:'smooth',block:'start'});
    });
    $('#inquirySearch').addEventListener('input',render);
    $('#inquiryEmailFilter').addEventListener('change',render);
    $('#inquiryContactFilter').addEventListener('change',render);
    $('#inquirySort').addEventListener('change',render);
    $('#inquiryClear').addEventListener('click',resetFilters);
  }

  async function load(){
    const status=$('#inquiryStatus');
    const body=$('#inquiryRows');
    const loadBtn=$('#inquiryLoad');
    if(loadBtn){loadBtn.disabled=true;loadBtn.textContent='讀取中…'}
    status.textContent='正在確認權限並讀取最新詢問…';
    try{
      const headers={};
      let s=window.FBAdminAuth?.session?.();
      if(s?.access_token){
        const refreshed=await window.FBAdminAuth.refresh?.().catch(()=>null);
        s=refreshed||window.FBAdminAuth.session?.()||s;
        headers.Authorization=`Bearer ${s.access_token}`;
      }else{
        const pass=await legacyPassword();
        if(!pass){status.textContent='已取消讀取。';return}
        headers['x-admin-pass']=pass;
      }
      const r=await fetch(ENDPOINT+'?limit=200',{headers,cache:'no-store'});
      const payload=await r.json().catch(()=>null);
      if(!r.ok)throw new Error(payload?.error||'read');
      lastRows=Array.isArray(payload)?payload:[];
      summary();
      render();
      status.textContent=lastRows.length?`已讀取 ${lastRows.length} 筆最新詢問。可搜尋、篩選、排序，點「查看詳情」可完整查看內容。`:'已讀取，目前沒有詢問紀錄。';
    }catch(e){
      lastRows=[];
      summary();
      const msg=e.message==='personal_login_required'?'已啟用個人後台帳號，請先登入並確認具備「網站詢問」權限。':e.message==='forbidden'?'目前登入帳號沒有「網站詢問」權限。':e.message==='mfa_required'?'目前安全政策要求雙重驗證，完成 2FA 後才能讀取詢問資料。':e.message==='rate_limited'?'密碼嘗試次數過多，請稍後再試。':e.message==='unauthorized'?'驗證失敗，未讀取任何客戶資料。':'詢問資料讀取失敗，請稍後再試。';
      status.textContent=msg;
      body.innerHTML='<tr><td colspan="7">目前無法載入詢問資料。</td></tr>';
      const count=$('#inquiryVisibleCount');
      if(count)count.textContent='讀取失敗';
    }finally{
      if(loadBtn){loadBtn.disabled=false;loadBtn.textContent='重新讀取最新詢問'}
    }
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',build,{once:true}):build();
})();
