(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminQuickFind)return;
  window.__fbAdminQuickFind=true;

  const $=(s,p=document)=>p.querySelector(s);
  const $$=(s,p=document)=>[...p.querySelectorAll(s)];
  const RECENT_KEY='farbeyoundAdminQuickFindRecentV1';
  const ITEMS=[
    {id:'adminAnalytics',label:'SEO／Google Ads／AI SEO 成效',group:'常用',keys:'seo google ads ai 流量 成效 分析'},
    {id:'adminInquiries',label:'網站詢問',group:'常用',keys:'詢問 客戶 聯絡 表單'},
    {id:'products',label:'產品管理',group:'常用',keys:'產品 商品 型號 品牌 上下架'},
    {id:'adminHomeWorkspace',label:'首頁管理',group:'常用',keys:'首頁 首屏 輪播 hero 區塊 快捷'},
    {id:'adminContentWorkspace',label:'網站內容管理',group:'網站內容',keys:'網站內容 品牌 據點 文字 內頁 消息'},
    {id:'homeHeroAdmin',label:'首頁首屏／輪播',group:'首頁管理',keys:'首頁 首屏 輪播 hero'},
    {id:'adminFrontFeatureManager',label:'前台功能／版面',group:'首頁管理',keys:'前台 功能 版面 選單 快捷'},
    {id:'siteControlAdmin',label:'首頁區塊／快速開關',group:'首頁管理',keys:'首頁 版面 開關 顯示'},
    {id:'adminBrandManager',label:'品牌管理',group:'網站內容',keys:'品牌 經銷 品牌入口'},
    {id:'adminLocationManager',label:'服務據點',group:'網站內容',keys:'據點 台北 台南 電話 地址'},
    {id:'contentControlAdmin',label:'網站文字／SEO',group:'網站內容',keys:'文字 seo footer 選單'},
    {id:'siteStructureAdmin',label:'內頁／分類',group:'網站內容',keys:'內頁 分類 標題 seo'},
    {id:'adminExtended',label:'消息／案例／公司資料',group:'網站內容',keys:'新聞 最新消息 案例 公司資料'},
    {id:'resourceAdmin',label:'下載／系統方案',group:'網站內容',keys:'下載 驅動 軟體 系統方案'},
    {id:'adminAccessCenter',label:'人員／權限',group:'系統管理',keys:'人員 帳號 權限 owner 登入'},
    {id:'adminSecurityCenter',label:'系統安全',group:'系統管理',keys:'安全 權限 2fa mfa 稽核'},
    {id:'adminBackupCenter',label:'備份／還原',group:'系統管理',keys:'備份 還原 版本 匯出 匯入'},
    {id:'adminHistory',label:'異動紀錄',group:'系統管理',keys:'歷史 紀錄 修改 稽核'},
    {id:'adminMaintenance',label:'系統維護',group:'系統管理',keys:'維護 恢復預設 重設 危險操作'}
  ];

  function style(){
    if($('#adminQuickFindStyle'))return;
    const s=document.createElement('style');
    s.id='adminQuickFindStyle';
    s.textContent=`
      .aqf-wrap{position:relative;min-width:min(360px,100%);flex:1 1 300px}.aqf-input{width:100%;min-height:38px;padding:0 48px 0 12px;border:1px solid #d7e3e8;border-radius:10px;background:#fff;color:#29495a;font-size:12px;outline:none}.aqf-input:focus{border-color:#8db7c4;box-shadow:0 0 0 3px rgba(65,145,168,.10)}.aqf-kbd{position:absolute;right:9px;top:50%;transform:translateY(-50%);padding:2px 5px;border:1px solid #dbe5e9;border-radius:5px;background:#f7fafb;color:#7b8c95;font-size:9px;font-weight:800}.aqf-results{position:absolute;left:0;right:0;top:calc(100% + 6px);z-index:150;display:none;max-height:320px;overflow:auto;padding:6px;border:1px solid #dbe6eb;border-radius:11px;background:#fff;box-shadow:0 14px 36px rgba(26,56,70,.16)}.aqf-results.open{display:block}.aqf-item,.aqf-palette-item{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;padding:10px;border:0;border-radius:9px;background:transparent;text-align:left;color:#315061;font-size:12px;cursor:pointer}.aqf-item:hover,.aqf-item.is-active,.aqf-palette-item:hover,.aqf-palette-item.is-active{background:#f0f7f9}.aqf-item small,.aqf-palette-item small{color:#84939b;font-size:10px}.aqf-empty{padding:12px;color:#82939d;font-size:11px;text-align:center}.aqf-palette{position:fixed;inset:0;z-index:12050;display:none;align-items:flex-start;justify-content:center;padding:8vh 16px 24px;background:rgba(8,25,38,.48);backdrop-filter:blur(3px)}.aqf-palette.open{display:flex}.aqf-palette-card{width:min(620px,100%);overflow:hidden;border:1px solid #dce7ec;border-radius:16px;background:#fff;box-shadow:0 28px 80px rgba(11,35,50,.28)}.aqf-palette-head{display:flex;align-items:center;gap:10px;padding:14px;border-bottom:1px solid #e5ecef}.aqf-palette-search{flex:1;min-width:0;min-height:46px;padding:0 14px;border:1px solid #d7e3e8;border-radius:11px;background:#fff;color:#29495a;font-size:16px;outline:none}.aqf-palette-search:focus{border-color:#8db7c4;box-shadow:0 0 0 3px rgba(65,145,168,.10)}.aqf-palette-close{flex:none;width:42px;height:42px;border:1px solid #d8e3e8;border-radius:10px;background:#fff;color:#547080;font-size:20px;font-weight:800;cursor:pointer}.aqf-palette-copy{padding:10px 14px 0;color:#748895;font-size:11px}.aqf-palette-results{max-height:min(58vh,500px);overflow:auto;padding:8px 10px 12px}.aqf-palette-section{padding:7px 10px 4px;color:#8396a1;font-size:10px;font-weight:800;letter-spacing:.05em}.aqf-palette-item span{display:grid;gap:2px}.aqf-palette-item b{color:#2b4e60;font-size:13px}.aqf-palette-item em{color:#8597a1;font-size:10px;font-style:normal}.admin-quickfind-open{overflow:hidden}.aqf-palette-foot{display:flex;justify-content:space-between;gap:12px;padding:10px 14px;border-top:1px solid #edf1f3;background:#fafcfd;color:#81939d;font-size:10px}.aqf-palette-foot kbd{padding:2px 5px;border:1px solid #d8e2e7;border-radius:5px;background:#fff;font:inherit;font-weight:800}
      @media(max-width:780px){.aqf-wrap{min-width:100%;order:3}.aqf-kbd{display:none}.aqf-palette{padding:calc(70px + env(safe-area-inset-top,0px)) 10px 14px;align-items:flex-start}.aqf-palette-card{border-radius:14px}.aqf-palette-results{max-height:62vh}.aqf-palette-foot{display:none}}
    `;
    document.head.appendChild(s);
  }

  function existingItems(){return ITEMS.filter(x=>document.getElementById(x.id))}
  function readRecent(){try{return JSON.parse(localStorage.getItem(RECENT_KEY)||'[]').filter(Boolean)}catch(_){return []}}
  function remember(id){
    const next=[id,...readRecent().filter(x=>x!==id)].slice(0,6);
    try{localStorage.setItem(RECENT_KEY,JSON.stringify(next))}catch(_){/* ignore */}
  }

  function expandAndGo(id){
    if(window.FBAdminWorkspace?.open){window.FBAdminWorkspace.open(id);return}
    const target=document.getElementById(id);
    if(!target)return;
    const panel=target.matches('.admin-panel')?target:target.querySelector(':scope > .admin-panel');
    const foldBtn=panel?.querySelector('.admin-fold-btn');
    if(panel?.classList.contains('is-folded'))foldBtn?.click();
    if(target.classList.contains('is-group-folded'))target.querySelector(':scope > .admin-group-fold .admin-fold-btn')?.click();
    target.scrollIntoView({behavior:'smooth',block:'start'});
    history.replaceState(null,'',`#${id}`);
  }

  function go(id){
    remember(id);
    closePalette();
    expandAndGo(id);
  }

  function filtered(q,limit=10){
    const text=String(q||'').trim().toLowerCase();
    const list=existingItems();
    if(text)return list.filter(x=>`${x.label} ${x.group} ${x.keys}`.toLowerCase().includes(text)).slice(0,limit);
    const recent=readRecent().map(id=>list.find(x=>x.id===id)).filter(Boolean);
    return [...recent,...list.filter(x=>!recent.some(r=>r.id===x.id))].slice(0,limit);
  }

  function itemHtml(x,active=false,cls='aqf-item'){
    return `<button type="button" class="${cls}${active?' is-active':''}" data-id="${x.id}"><span>${x.label}</span><small>${x.group||'開啟'}</small></button>`;
  }

  function ensurePalette(){
    if($('#aqfPalette'))return $('#aqfPalette');
    const palette=document.createElement('div');
    palette.id='aqfPalette';
    palette.className='aqf-palette';
    palette.setAttribute('role','dialog');
    palette.setAttribute('aria-modal','true');
    palette.setAttribute('aria-label','快速找後台功能');
    palette.innerHTML=`<div class="aqf-palette-card"><div class="aqf-palette-head"><input id="aqfPaletteSearch" class="aqf-palette-search" type="search" autocomplete="off" placeholder="輸入 SEO、產品、據點、備份…" aria-label="搜尋後台功能"><button id="aqfPaletteClose" class="aqf-palette-close" type="button" aria-label="關閉快速找功能">×</button></div><div class="aqf-palette-copy">快速切換工作區，不會修改任何網站資料。</div><div id="aqfPaletteResults" class="aqf-palette-results"></div><div class="aqf-palette-foot"><span><kbd>↑</kbd> <kbd>↓</kbd> 選擇　<kbd>Enter</kbd> 開啟</span><span><kbd>Esc</kbd> 關閉</span></div></div>`;
    document.body.appendChild(palette);
    const input=$('#aqfPaletteSearch',palette),results=$('#aqfPaletteResults',palette);

    const render=()=>{
      const q=input.value.trim();
      const visible=filtered(q,14);
      results.innerHTML=visible.length?visible.map((x,i)=>`<button type="button" class="aqf-palette-item${i===0?' is-active':''}" data-id="${x.id}"><span><b>${x.label}</b><em>${x.group}</em></span><small>開啟</small></button>`).join(''):'<div class="aqf-empty">找不到符合的管理功能</div>';
    };
    input.addEventListener('input',render);
    input.addEventListener('keydown',e=>{
      const buttons=$$('.aqf-palette-item',results);
      const current=buttons.findIndex(b=>b.classList.contains('is-active'));
      if(e.key==='ArrowDown'&&buttons.length){e.preventDefault();const n=(current+1)%buttons.length;buttons.forEach(b=>b.classList.remove('is-active'));buttons[n].classList.add('is-active');buttons[n].scrollIntoView({block:'nearest'});}
      else if(e.key==='ArrowUp'&&buttons.length){e.preventDefault();const n=(current-1+buttons.length)%buttons.length;buttons.forEach(b=>b.classList.remove('is-active'));buttons[n].classList.add('is-active');buttons[n].scrollIntoView({block:'nearest'});}
      else if(e.key==='Enter'&&buttons.length){e.preventDefault();buttons[current>=0?current:0].click();}
      else if(e.key==='Escape'){e.preventDefault();closePalette();}
    });
    results.addEventListener('click',e=>{const b=e.target.closest('.aqf-palette-item');if(b?.dataset.id)go(b.dataset.id)});
    $('#aqfPaletteClose',palette).addEventListener('click',closePalette);
    palette.addEventListener('click',e=>{if(e.target===palette)closePalette()});
    palette._render=render;
    return palette;
  }

  function openPalette(){
    const palette=ensurePalette();
    const input=$('#aqfPaletteSearch',palette);
    palette.classList.add('open');
    document.body.classList.add('admin-quickfind-open');
    if(input){input.value='';palette._render?.();setTimeout(()=>input.focus(),0)}
  }

  function closePalette(){
    const palette=$('#aqfPalette');
    palette?.classList.remove('open');
    document.body.classList.remove('admin-quickfind-open');
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
      visible=filtered(input.value,8);
      results.innerHTML=visible.length?visible.map((x,i)=>itemHtml(x,i===0)).join(''):'<div class="aqf-empty">找不到符合的管理功能</div>';
      results.classList.add('open');
    };

    input.addEventListener('focus',render);
    input.addEventListener('input',render);
    input.addEventListener('keydown',e=>{
      const buttons=$$('.aqf-item',results);
      const current=buttons.findIndex(b=>b.classList.contains('is-active'));
      if(e.key==='ArrowDown'&&buttons.length){e.preventDefault();const n=(current+1)%buttons.length;buttons.forEach(b=>b.classList.remove('is-active'));buttons[n].classList.add('is-active');}
      else if(e.key==='ArrowUp'&&buttons.length){e.preventDefault();const n=(current-1+buttons.length)%buttons.length;buttons.forEach(b=>b.classList.remove('is-active'));buttons[n].classList.add('is-active');}
      else if(e.key==='Enter'&&buttons.length){e.preventDefault();buttons[current>=0?current:0].click();}
      else if(e.key==='Escape'){results.classList.remove('open');input.blur();}
    });
    results.addEventListener('click',e=>{
      const b=e.target.closest('.aqf-item');
      if(!b?.dataset.id)return;
      remember(b.dataset.id);
      expandAndGo(b.dataset.id);
      results.classList.remove('open');
      input.value='';
    });
    document.addEventListener('click',e=>{if(!wrap.contains(e.target))results.classList.remove('open')});
    ensurePalette();
    window.FBAdminQuickFind={open:openPalette,close:closePalette,go};
    return true;
  }

  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){
      e.preventDefault();
      openPalette();
    }else if(e.key==='Escape'&&$('#aqfPalette')?.classList.contains('open'))closePalette();
  });

  const boot=()=>{if(!build())setTimeout(boot,150)};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();
