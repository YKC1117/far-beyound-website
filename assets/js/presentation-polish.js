(function(){
  function sanitizePublicText(){
    if(document.body.dataset.page==='admin')return;
    const replacements=[
      ['正式版可由後台上傳型錄、手冊與快速指南。','如需型錄、手冊或快速指南，歡迎聯絡我們。'],
      ['正式檔案空間尚未接入','如需此檔案，歡迎聯絡我們'],
      ['測試環境尚未掛載正式檔案','如需此檔案，歡迎聯絡我們'],
      ['新聞內頁將於完整資料搬移階段接入','更多資訊請參閱最新消息內容'],
      ['新版網站測試環境','萬里資訊股份有限公司'],
      ['網站提案預覽','萬里資訊股份有限公司'],
      ['原官網產品資料','產品資料'],
      ['新版目錄','產品目錄']
    ];
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const nodes=[];let n;while((n=walker.nextNode()))nodes.push(n);
    nodes.forEach(node=>{
      if(['SCRIPT','STYLE','NOSCRIPT'].includes(node.parentElement?.tagName||''))return;
      let text=node.nodeValue||'',next=text;
      replacements.forEach(([a,b])=>{next=next.split(a).join(b)});
      if(next!==text)node.nodeValue=next;
    });
  }
  function cleanCopy(){
    if(document.body.dataset.page==='downloads'){
      const hero=document.querySelector('.page-hero p');
      if(hero)hero.textContent='依品牌快速找到標籤機驅動程式、標籤軟體、工具程式與技術文件。';
    }
    document.querySelectorAll('.footer-bottom span').forEach(el=>{
      if(/新版網站|網站提案|預覽環境|preview|v0\./i.test(el.textContent))el.textContent='所有其他商標均為各自所有者之財產';
    });
    sanitizePublicText();
  }
  function addBackTop(){
    if(document.querySelector('.back-top'))return;
    const b=document.createElement('button');
    b.type='button';b.className='back-top';b.setAttribute('aria-label','回到頁首');b.innerHTML='↑';
    document.body.appendChild(b);b.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
    const sync=()=>b.classList.toggle('show',scrollY>650);addEventListener('scroll',sync,{passive:true});sync();
  }
  function contactNote(){
    if(document.body.dataset.page!=='contact')return;
    const success=document.getElementById('formSuccess');
    if(success)success.innerHTML='<b>感謝您的詢問</b><br>我們將依您提供的聯絡資料與需求內容協助確認後續。';
  }
  function run(){cleanCopy();addBackTop();contactNote()}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,100);setTimeout(run,700)});
  if(document.readyState!=='loading'){setTimeout(run,0);setTimeout(run,700)}
})();
