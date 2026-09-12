(function(){
  if(window.__fbPublicReleasePolish)return;
  window.__fbPublicReleasePolish=true;
  if(document.body?.dataset?.page==='admin')return;

  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeHref=value=>{
    const s=String(value||'').trim();
    if(!s)return '';
    if(/^(?:javascript|vbscript|data):/i.test(s))return '';
    if(/^(?:https?:|mailto:|tel:)/i.test(s))return s;
    if(/^\/?(?:[A-Za-z0-9._~!$&'()*+,;=:@%/-]+)(?:\?[A-Za-z0-9._~!$&'()*+,;=:@%/?-]*)?(?:#[A-Za-z0-9._~!$&'()*+,;=:@%/?-]*)?$/.test(s))return s;
    return '';
  };
  const norm=v=>String(v||'').replace(/\s+/g,' ').trim().toLowerCase();
  const newsMap=[
    [/2026.*萬里資訊.*員工旅遊|2026.*員工旅遊/, 'travel-2026'],
    [/原物料價格調整/, 'material-price'],
    [/0x0000011b.*0x00000709|共用印表機.*0x0000011b/, 'printer-share-error'],
    [/zt411.*zt421|zt421.*zt411/, 'zt411-news'],
    [/zt610.*zt620|zt620.*zt610/, 'zt610-news']
  ];

  function newsSlug(title){
    const t=norm(title);
    const hit=newsMap.find(([re])=>re.test(t));
    return hit?hit[1]:'';
  }

  function currentProduct(){
    const id=new URLSearchParams(location.search).get('id')||'';
    const data=window.FBStore?.getData?.();
    return data?.products?.find?.(p=>String(p.id)===id) || null;
  }

  function polishProductFiles(){
    if(document.body.dataset.page!=='product')return;
    const box=document.getElementById('productFiles');
    if(!box)return;
    const p=currentProduct();
    if(!p)return;
    const files=Array.isArray(p.files)?p.files:[];
    if(!files.length){
      box.innerHTML='<div class="empty-state"><b>需要產品文件？</b><span>如需產品型錄、使用手冊或技術文件，歡迎與我們聯絡索取。</span><a class="btn btn-secondary btn-sm" href="contact.html?item='+encodeURIComponent(p.name||'產品文件')+'">聯絡我們</a></div>';
      return;
    }
    box.innerHTML=files.map(file=>{
      const label=esc(file?.label||'技術文件');
      const type=esc(file?.type||'文件');
      const href=safeHref(file?.url);
      if(href){
        return '<a class="download-row" href="'+esc(href)+'" target="_blank" rel="noopener noreferrer"><span class="download-icon">↗</span><span><small>'+type+'</small><b>'+label+'</b></span><span class="download-cta">開啟文件</span></a>';
      }
      return '<a class="download-row" href="contact.html?item='+encodeURIComponent((p.name||'產品')+' '+(file?.label||'技術文件'))+'"><span class="download-icon">↗</span><span><small>'+type+'</small><b>'+label+'</b></span><span class="download-cta">洽詢取得</span></a>';
    }).join('');
  }

  function polishDownloadFallback(){
    if(document.body.dataset.page!=='downloads')return;
    const data=window.FBStore?.getData?.();
    if(!data)return;
    document.querySelectorAll('#downloadList .demo-download').forEach(btn=>{
      const name=String(btn.dataset.file||'').trim();
      const item=(data.downloads||[]).find(x=>String(x.name||'').trim()===name);
      const href=safeHref(item?.url);
      const a=document.createElement('a');
      a.className=btn.className.replace(/\bdemo-download\b/g,'').trim();
      a.textContent=href?'檔案下載':'洽詢取得';
      a.href=href||('contact.html?item='+encodeURIComponent(name||'下載資料'));
      if(href){a.target='_blank';a.rel='noopener noreferrer';}
      btn.replaceWith(a);
    });
  }

  function polishHomeNews(){
    document.querySelectorAll('#homeNews .news-row').forEach(row=>{
      const title=row.querySelector('h3')?.textContent||'';
      const slug=newsSlug(title);
      if(slug)row.href='news-detail.html?id='+encodeURIComponent(slug);
    });
  }

  function polishNewsList(){
    if(document.body.dataset.page!=='news')return;
    document.querySelectorAll('#newsList .news-card').forEach(card=>{
      const title=card.querySelector('h2')?.textContent||'';
      const slug=newsSlug(title);
      const old=card.querySelector('.demo-news');
      if(!old)return;
      const a=document.createElement('a');
      a.className='text-link';
      a.href=slug?('news-detail.html?id='+encodeURIComponent(slug)):'news.html';
      a.innerHTML=old.innerHTML||'閱讀內容 →';
      old.replaceWith(a);
    });
  }

  function cleanCustomerFacingCopy(){
    const replacements=[
      ['測試環境尚未掛載正式檔案','如需此文件，歡迎與我們聯絡索取。'],
      ['正式檔案空間尚未接入','如需此下載資源，歡迎與我們聯絡索取。'],
      ['新聞內頁將於完整資料搬移階段接入','完整內容整理中，您可直接與我們聯絡。'],
      ['正式版可由後台上傳型錄、手冊與快速指南。','如需產品型錄、手冊或技術文件，歡迎與我們聯絡索取。'],
      ['目前此分類尚未建立展示產品','目前此分類尚無公開產品資料'],
      ['可透過管理介面新增產品資料。','歡迎與我們聯絡，我們將協助您確認適合的產品。']
    ];
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const nodes=[];let node;
    while((node=walker.nextNode()))nodes.push(node);
    nodes.forEach(n=>{
      let text=n.nodeValue||'';
      replacements.forEach(([from,to])=>{if(text.includes(from))text=text.replaceAll(from,to)});
      if(text.trim()==='測試版')text=text.replace('測試版','洽詢取得');
      n.nodeValue=text;
    });
  }

  function run(){
    polishProductFiles();
    polishDownloadFallback();
    polishHomeNews();
    polishNewsList();
    cleanCustomerFacingCopy();
  }

  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,80);setTimeout(run,450);},{once:true});
  window.addEventListener('load',()=>setTimeout(run,120));
  window.addEventListener('farbeyound:datachange',()=>setTimeout(run,120));
  if(document.readyState!=='loading')setTimeout(run,0);
})();
