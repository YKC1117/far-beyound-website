(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminQuickFind)return;
  window.__fbAdminQuickFind=true;

  const $=(s,p=document)=>p.querySelector(s);
  const $$=(s,p=document)=>[...p.querySelectorAll(s)];
  const ITEMS=[
    {id:'adminAnalytics',label:'SEO／Google Ads／AI SEO 成效',keys:'seo google ads ai 流量 成效 分析'},
    {id:'adminInquiries',label:'網站詢問',keys:'詢問 客戶 聯絡 表單'},
    {id:'products',label:'產品管理',keys:'產品 商品 型號 品牌 上下架'},
    {id:'homeHeroAdmin',label:'首頁首屏／輪播',keys:'首頁 首屏 輪播 hero'},
    {id:'adminFrontFeatureManager',label:'前台功能／版面',keys:'前台 功能 版面 選單 快捷'},
    {id:'siteControlAdmin',label:'首頁版面／快速開關',keys:'首頁 版面 開關 顯示'},
    {id:'adminBrandManager',label:'品牌管理',keys:'品牌 經銷 品牌入口'},
    {id:'adminLocationManager',label:'服務據點',keys:'據點 台北 台南 電話 地址'},
    {id:'contentControlAdmin',label:'網站文字／SEO',keys:'文字 seo footer 選單'},
    {id:'siteStructureAdmin',label:'內頁／分類',keys:'內頁 分類 標題 seo'},
    {id:'adminExtended',label:'消息／案例／公司資料',keys:'新聞 最新消息 案例 公司資料'},
    {id:'resourceAdmin',label:'下載／系統方案',keys:'下載 驅動 軟體 系統方案'},
    {id:'adminSecurityCenter',label:'系統安全',keys:'安全 權限 2fa 備份'},
    {id:'adminHistory',label:'異動紀錄',keys:'歷史 紀錄 修改'}
  ];

  function style(){
    if($('#adminQuickFindStyle'))return;
    const s=document.createElement('style');
    s.id='adminQuickFindStyle';
    s.textContent=`
      .aqf-wrap{position:relative;min-width:min(360px,100%);flex:1 1 300px}.aqf-input{width:100%;min-height:38px;padding:0 38px 0 12px;border:1px solid #d7e3e8;border-radius:10px;background:#fff;color:#29495a;font-size:11px;outline:none}.aqf-input:focus{border-color:#8db7c4;box-shadow:0 0 0 3px rgba(65,145,168,.10)}.aqf-kbd{position:absolute;right:9px;top:50%;transform:translateY(-50%);padding:2px 5px;border:1px solid #dbe5e9;border-radius:5px;background:#f7fafb;color:#7b8c95;font-size:8px;font-weight:800}.aqf-results{position:absolute;left:0;right:0;top:calc(100% + 6px);z-index:150;display:none;max-height:320px;overflow:auto;padding:6px;border:1px solid #dbe6eb;border-radius:11px;background:#fff;box-shadow:0 14px 36px rgba(26,56,70,.16)}.aqf-results.open{display:block}.aqf-item{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;padding:9px 10px;border:0;border-radius:8px;background:transparent;text-align:left;color:#315061;font-size:10px;cursor:pointer}.aqf-item:hover,.aqf-item.is-active{background:#f0f7f9}.aqf-item small{color:#84939b;font-size:8px}.aqf-empty{padding:12px;color:#82939d;font-size:10px;text-align:center}@media(max-width:780px){.aqf-wrap{min-width:100%;order:3}.aqf-kbd{display:none}}
    `;
    document.head.appendChild(s);
  }

  function expandAndGo(id){
    const target=document.getElementById(id);
    if(!target)return;
    const panel=target.matches('.admin-panel')?target:target.querySelector(':scope > .admin-panel');
    const foldBtn=panel?.querySelector('.admin-fold-btn');
    if(panel?.classList.contains('is-folded'))foldBtn?.click();
    if(target.classList.contains('is-group-folded'))target.querySelector(':scope > .admin-group-fold .admin-fold-btn')?.click();
    target.scrollIntoView({behavior:'smooth',block:'start'});
    history.replaceState(null,'',`#${id}`);
  }

  function build(){
    const actions=$('.admin-actions');
    if(!actions||$('#adminQuickFind'))return false;
    style();
    const wrap=document.createElement('div');
    wrap.id='adminQuickFind';
    wrap.className='aqf-wrap';
    wrap.innerHTML=`<input class="aqf-input" type="search" autocomplete="off" placeholder="快速找後台功能，例如 SEO、產品、據點…" aria-label="快速找後台功能"><span class="aqf-kbd">Ctrl K</span><div class="aqf-results" role="listbox"></div>`;
    actions.prepend(wrap);
    const input=$('.aqf-input',wrap),results=$('.aqf-results',wrap);
    let visible=[];

    const render=()=>{
      const q=input.value.trim().toLowerCase();
      visible=ITEMS.filter(x=>document.getElementById(x.id)).filter(x=>!q||`${x.label} ${x.keys}`.toLowerCase().includes(q)).slice(0,8);
      results.innerHTML=visible.length?visible.map((x,i)=>`<button type="button" class="aqf-item${i===0?' is-active':''}" data-id="${x.id}"><span>${x.label}</span><small>開啟</small></button>`).join(''):'<div class="aqf-empty">找不到符合的管理功能</div>';
      results.classList.add('open');
    };

    input.addEventListener('focus',render);
    input.addEventListener('input',render);
    input.addEventListener('keydown',e=>{
      const buttons=$$('.aqf-item',results);
      const current=buttons.findIndex(b=>b.classList.contains('is-active'));
      if(e.key==='ArrowDown'&&buttons.length){e.preventDefault();const n=(current+1)%buttons.length;buttons.forEach(b=>b.classList.remove('is-active'));buttons[n].classList.add('is-active');}
      else if(e.key==='ArrowUp'&&buttons.length){e.preventDefault();const n=(current-1+buttons.length)%buttons.length;buttons.forEach(b=>b.classList.remove('is-active'));buttons[n].classList.add('is-active');}
      else if(e.key==='Enter'&&buttons.length){e.preventDefault();(buttons[current>=0?current:0]).click();}
      else if(e.key==='Escape'){results.classList.remove('open');input.blur();}
    });
    results.addEventListener('click',e=>{
      const b=e.target.closest('.aqf-item');
      if(!b)return;
      expandAndGo(b.dataset.id);
      results.classList.remove('open');
      input.value='';
    });
    document.addEventListener('click',e=>{if(!wrap.contains(e.target))results.classList.remove('open')});
    document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();input.focus();render();}});
    return true;
  }

  const boot=()=>{if(!build())setTimeout(boot,150)};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();
