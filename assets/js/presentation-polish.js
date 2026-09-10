(function(){
  function cleanCopy(){
    if(document.body.dataset.page==='downloads'){
      const hero=document.querySelector('.page-hero p');
      if(hero)hero.textContent='依品牌快速找到標籤機驅動程式、標籤軟體、工具程式與技術文件。';
    }
    document.querySelectorAll('.footer-bottom span').forEach(el=>{if(/新版網站|v0\./i.test(el.textContent))el.textContent='網站提案預覽環境';});
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
    if(success)success.innerHTML='<b>資料填寫完成</b><br>目前為網站提案預覽環境；正式上線後表單將送至公司指定信箱或管理後台。';
  }
  function run(){cleanCopy();addBackTop();contactNote()}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,100)});
  if(document.readyState!=='loading')setTimeout(run,0);
})();
