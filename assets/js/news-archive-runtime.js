(function(){
  'use strict';
  if(window.__fbNewsArchiveRuntime)return;
  window.__fbNewsArchiveRuntime=true;

  const e=v=>window.FB?.escapeHtml?FB.escapeHtml(v==null?'':String(v)):String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const enc=v=>encodeURIComponent(v==null?'':String(v));
  const norm=v=>String(v||'').toLowerCase().replace(/[\s／/：:，,。．.!！?？()（）\-]/g,'');
  const curated=new Set(['travel-2026','material-price','printer-share-error','zt411-news','zt610-news']);

  function current(){
    try{return window.FBStore?.getData?.()?.news||[]}catch(_){return []}
  }
  function legacy(){return Array.isArray(window.FBLegacyNews?.items)?window.FBLegacyNews.items:[]}
  function usableBody(v){return Array.isArray(v)?v.filter(Boolean):typeof v==='string'&&v.trim()?[v.trim()]:[]}

  function merge(){
    const old=legacy().map(x=>({...x,body:usableBody(x.body)}));
    const used=new Set();
    const merged=current().map((n,index)=>{
      const hit=old.find(x=>{
        if(n.id&&x.id===n.id)return true;
        if(String(n.date||'')&&String(n.date||'')===String(x.date||'')&&String(n.type||'')===String(x.type||''))return true;
        return norm(n.title)===norm(x.title);
      });
      if(hit)used.add(hit.id);
      const out={...(hit||{}),...n};
      out.id=String(n.id||hit?.id||`news-${String(n.date||'').replace(/[^0-9]/g,'')}-${index+1}`);
      out.body=usableBody(n.body).length?usableBody(n.body):usableBody(hit?.body);
      out.legacyUrl=n.legacyUrl||hit?.legacyUrl||'';
      out.excerpt=n.excerpt||hit?.excerpt||'';
      return out;
    });
    old.forEach(x=>{if(!used.has(x.id)&&!merged.some(n=>n.id===x.id))merged.push(x)});
    return merged.sort((a,b)=>String(b.date||'').localeCompare(String(a.date||''))||String(b.id||'').localeCompare(String(a.id||'')));
  }

  function all(){return merge()}
  function find(id){return all().find(x=>String(x.id)===String(id||''))||null}
  function href(n){return `news-detail.html?id=${enc(n.id)}`}

  function renderHome(){
    const box=document.getElementById('homeNews');
    if(!box)return;
    box.innerHTML=all().slice(0,4).map((n,i)=>`<a class="news-row" href="${href(n)}"><div class="news-date"><b>${e(String(n.date||'').slice(8))}</b><span>${e(String(n.date||'').slice(0,7).replace('-',' / '))}</span></div><div class="news-copy"><div><span class="tag">${e(n.type||'最新消息')}</span>${i===0?'<span class="tag tag-new">NEW</span>':''}</div><h3>${e(n.title)}</h3><p>${e(n.excerpt)}</p></div>${window.FB?.icon?FB.icon('arrow'):'→'}</a>`).join('');
  }

  function renderList(){
    const listBox=document.getElementById('newsList'), filters=document.getElementById('newsFilters');
    if(!listBox||!filters)return;
    const items=all();
    const types=['全部',...new Set(items.map(n=>String(n.type||'最新消息')).filter(Boolean))];
    const requested=new URLSearchParams(location.search).get('type')||'全部';
    let active=types.includes(requested)?requested:'全部';
    const draw=()=>{
      const list=items.filter(n=>active==='全部'||n.type===active);
      listBox.innerHTML=list.map((n,i)=>`<article class="news-card"><div class="news-card-date"><b>${e(String(n.date||'').slice(8))}</b><span>${e(String(n.date||'').slice(0,7).replace('-',' / '))}</span></div><div><div><span class="tag">${e(n.type||'最新消息')}</span>${i===0&&active==='全部'?'<span class="tag tag-new">NEW</span>':''}</div><h2>${e(n.title)}</h2><p>${e(n.excerpt)}</p><a class="text-link" href="${href(n)}">閱讀內容 ${window.FB?.icon?FB.icon('arrow'):'→'}</a></div></article>`).join('');
      if(!list.length)listBox.innerHTML='<div class="empty-state wide"><b>目前沒有此分類的消息</b><span>您可以查看其他分類，或聯絡萬里資訊取得最新資訊。</span></div>';
      filters.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.type===active));
    };
    filters.innerHTML=types.map(t=>`<button class="filter-chip ${t===active?'active':''}" data-type="${e(t)}">${e(t)}</button>`).join('');
    filters.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
      active=b.dataset.type||'全部';
      const sp=new URLSearchParams(location.search);
      if(active==='全部')sp.delete('type');else sp.set('type',active);
      history.replaceState(null,'',location.pathname+(sp.toString()?`?${sp}`:'')+location.hash);
      draw();
    }));
    draw();
  }

  function historicalNotice(article){
    const year=Number(String(article.date||'').slice(0,4));
    if(!year||year>=2025)return null;
    const box=document.createElement('div');
    box.className='notice';
    box.textContent=`歷史資訊提醒：本文發布於 ${article.date}，內容可能因產品、系統版本或政策調整而變更；如需最新資訊，請聯絡萬里資訊確認。`;
    return box;
  }

  function noindex(){
    let meta=document.querySelector('meta[name="robots"]');
    if(!meta){meta=document.createElement('meta');meta.name='robots';document.head.appendChild(meta)}
    meta.content='noindex,follow';
  }

  function renderDetail(){
    if(document.body?.dataset?.page!=='news-detail')return;
    const id=new URLSearchParams(location.search).get('id')||'';
    if(!id)return;
    const article=find(id);
    const body=document.getElementById('articleBody');
    if(!body)return;
    // Keep the five curated article layouts already authored in news-detail.html.
    if(curated.has(id)&&article){
      const notice=historicalNotice(article);
      if(notice&&!body.querySelector('[data-history-notice]')){notice.dataset.historyNotice='1';body.prepend(notice)}
      return;
    }
    if(!article){
      noindex();
      document.title='找不到此消息｜萬里資訊';
      const title=document.getElementById('articleTitle'),lead=document.getElementById('articleLead'),type=document.getElementById('articleType'),date=document.getElementById('articleDate');
      if(type)type.textContent='最新消息';if(date)date.textContent='';if(title)title.textContent='找不到此消息';if(lead)lead.textContent='此消息可能已更新或調整。';
      body.replaceChildren();
      const p=document.createElement('p');p.textContent='您可以返回最新消息，或直接聯絡萬里資訊取得協助。';
      const a=document.createElement('a');a.className='btn btn-primary';a.href='news.html';a.textContent='返回最新消息';
      body.append(p,a);return;
    }
    document.title=`${article.title}｜萬里資訊`;
    const type=document.getElementById('articleType'),date=document.getElementById('articleDate'),title=document.getElementById('articleTitle'),lead=document.getElementById('articleLead');
    if(type)type.textContent=article.type||'最新消息';if(date)date.textContent=article.date||'';if(title)title.textContent=article.title||'';if(lead)lead.textContent=article.excerpt||'';
    body.replaceChildren();
    const notice=historicalNotice(article);if(notice)body.appendChild(notice);
    usableBody(article.body).forEach(line=>{const p=document.createElement('p');p.textContent=line;body.appendChild(p)});
    const back=document.createElement('a');back.className='article-back';back.href='news.html';back.textContent='← 返回最新消息';body.appendChild(back);
  }

  let lastSignature='';
  function render(){
    if(!window.FBStore||!window.FBLegacyNews)return false;
    const items=all();
    const sig=items.map(x=>`${x.id}|${x.date}|${x.title}`).join('\n');
    if(sig!==lastSignature||document.body?.dataset?.page==='news-detail'){
      lastSignature=sig;renderHome();renderList();renderDetail();
    }
    window.dispatchEvent(new CustomEvent('farbeyound:newsarchive',{detail:{count:items.length}}));
    return true;
  }

  function boot(attempt=0){
    if(render())return;
    if(attempt<40)setTimeout(()=>boot(attempt+1),75);
  }
  document.addEventListener('DOMContentLoaded',()=>boot(),{once:true});
  window.addEventListener('load',()=>setTimeout(()=>boot(),80));
  window.addEventListener('farbeyound:datachange',()=>setTimeout(()=>render(),80));
  if(document.readyState!=='loading')setTimeout(()=>boot(),0);
  window.FBNewsCatalog={all,find,render};
})();
