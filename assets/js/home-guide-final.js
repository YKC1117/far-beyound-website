(function(){
  if(document.body.dataset.page!=='home'||window.__fbHomeGuideFinal)return;
  window.__fbHomeGuideFinal=true;

  const ORDER=['標籤條碼列印機','列印耗材','條碼掃描器','標籤編輯軟體','行動裝置 PDA'];

  function apply(){
    const guide=document.querySelector('.fb-home-guide');
    const cards=guide?.querySelector('.fb-service-cards');
    if(!guide||!cards)return false;

    const byTitle=new Map([...cards.querySelectorAll('.fb-service-card')].map(card=>[
      card.querySelector('h3')?.textContent.trim(),card
    ]));

    ORDER.forEach((title,index)=>{
      const card=byTitle.get(title);
      if(!card)return;
      const no=card.querySelector('.fb-service-no');
      if(no)no.textContent=String(index+1).padStart(2,'0');
      cards.appendChild(card);
    });

    const heading=guide.querySelector('#fbQuickGuideTitle');
    if(heading)heading.textContent='快速找到適合的產品與服務';

    const desc=guide.querySelector('.fb-home-guide-head > p');
    if(desc)desc.textContent='依您的列印、耗材、掃描、軟體或行動作業需求快速進入對應服務；如規格尚未確認，也可直接聯絡我們協助選型。';

    return true;
  }

  function run(){
    if(apply())return;
    setTimeout(apply,80);
    setTimeout(apply,250);
    setTimeout(apply,600);
  }

  document.addEventListener('DOMContentLoaded',run,{once:true});
  if(document.readyState!=='loading')run();
})();
