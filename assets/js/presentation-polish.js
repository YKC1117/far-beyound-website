(function(){
  function cleanCopy(){
    if(document.body.dataset.page==='downloads'){
      const hero=document.querySelector('.page-hero p');
      if(hero)hero.textContent='依品牌快速找到標籤機驅動程式、標籤軟體、工具程式與技術文件。';
    }
    document.querySelectorAll('.footer-bottom span').forEach(el=>{
      if(/新版網站|網站提案|預覽環境|preview|v0\./i.test(el.textContent))el.textContent='所有其他商標均為各自所有者之財產';
    });
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
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,100)});
  if(document.readyState!=='loading')setTimeout(run,0);
})();
