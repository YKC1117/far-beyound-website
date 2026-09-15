(function(){
  'use strict';
  if(window.__fbAdminUx)return;
  window.__fbAdminUx=true;

  const $=(s,p=document)=>p.querySelector(s);
  const $$=(s,p=document)=>[...p.querySelectorAll(s)];

  // 常用功能優先：成效／SEO → 詢問 → 產品 → 首頁，其餘依使用頻率往下排。
  const ORDER=[
    'adminAnalytics',
    'adminInquiries',
    'products',
    'homeHeroAdmin',
    'adminFrontFeatureManager',
    'siteControlAdmin',
    'adminBrandManager',
    'adminLocationManager',
    'contentControlAdmin',
    'siteStructureAdmin',
    'adminExtended',
    'resourceAdmin',
    'adminStats',
    'adminPassword',
    'adminAccessCenter',
    'adminSecurityCenter',
    'adminBackupCenter',
    'adminHistory',
    'adminMaintenance'
  ];

  const META={
    adminAnalytics:{step:'01',tag:'成效',hint:'Google SEO、Google Ads、AI SEO 與站內流量成效'},
    adminInquiries:{step:'02',tag:'詢問',hint:'網站客戶詢問與聯絡紀錄'},
    products:{step:'03',tag:'商品',hint:'產品資料、上下架與首頁精選'},
    homeHeroAdmin:{step:'04',tag:'首頁',hint:'首頁第一眼看到的主視覺與輪播'},
    adminFrontFeatureManager:{step:'05',tag:'前台',hint:'前台功能、版面模組與快捷工具'},
    siteControlAdmin:{step:'06',tag:'版面',hint:'控制首頁區塊與共用顯示功能'},
    adminBrandManager:{step:'07',tag:'品牌',hint:'品牌入口、分類與排序'},
    adminLocationManager:{step:'08',tag:'據點',hint:'服務據點名稱、電話、地址與顯示'},
    contentControlAdmin:{step:'09',tag:'文字',hint:'網站文字、選單、Footer 與 SEO'},
    siteStructureAdmin:{step:'10',tag:'內頁',hint:'各內頁標題、SEO 與產品分類'},
    adminExtended:{step:'11',tag:'內容',hint:'最新消息、案例與公司基本資料'},
    resourceAdmin:{step:'12',tag:'資源',hint:'下載中心與系統方案'}
  };

  // 新版介面預設只常駐最常查看的 SEO／成效區；其他需要時再展開。
  const DEFAULT_FOLDED=new Set([
    'adminInquiries','products','homeHeroAdmin','adminFrontFeatureManager','siteControlAdmin',
    'adminBrandManager','adminLocationManager','contentControlAdmin','siteStructureAdmin',
    'adminExtended','resourceAdmin'
  ]);

  const KEY='farbeyoundAdminFoldV4';
  let dirty=false;

  function read(){
    try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}
    catch(e){return {}}
  }

  function save(id,v){
    const s=read();
    s[id]=!!v;
    localStorage.setItem(KEY,JSON.stringify(s));
  }

  function folded(id){
    const s=read();
    return Object.prototype.hasOwnProperty.call(s,id)?!!s[id]:DEFAULT_FOLDED.has(id);
  }

  function adminHomeLink(){
    const logo=$('.admin-side > a.brand');
    if(!logo)return;
    logo.setAttribute('href','admin.html');
    logo.setAttribute('title','返回後台首頁');
    logo.setAttribute('aria-label','返回網站管理後台首頁');
  }

  function panelFor(id){
    const host=document.getElementById(id);
    if(!host)return null;
    if(host.matches('.admin-panel'))return host;
    return host.querySelector(':scope > .admin-panel');
  }

  function reorder(){
    const main=$('.admin-main');
    if(!main)return;
    // 管理總覽固定最前面，常用實際工作區緊接在後。
    let anchor=$('#adminDashboard')||$('.admin-usage-note')||$('.admin-section-jump')||$('.admin-top');
    ORDER.forEach(id=>{
      const el=document.getElementById(id);
      if(el&&anchor&&el.parentNode===main){
        if(anchor.nextElementSibling!==el)anchor.insertAdjacentElement('afterend',el);
        anchor=el;
      }
    });
  }

  function decorate(){
    Object.entries(META).forEach(([id,m])=>{
      const panel=panelFor(id);
      if(!panel||panel.querySelector('.admin-step-badge'))return;
      const head=panel.querySelector('.admin-panel-head > div');
      if(!head)return;
      const b=document.createElement('div');
      b.className='admin-step-badge';
      b.innerHTML=`<span>${m.step}</span><b>${m.tag}</b><small>${m.hint}</small>`;
      head.prepend(b);
    });
    panelFor('adminAnalytics')?.classList.add('admin-priority-panel');
  }

  function setFold(panel,id,v,btn){
    panel.classList.toggle('is-folded',v);
    if(btn){
      btn.setAttribute('aria-expanded',v?'false':'true');
      btn.innerHTML=v?'展開 <span>＋</span>':'收合 <span>−</span>';
    }
    save(id,v);
  }

  function collapsiblePanel(id){
    const panel=panelFor(id);
    if(!panel||panel.dataset.foldReady)return;
    const head=$('.admin-panel-head',panel);
    if(!head)return;
    panel.dataset.foldReady='1';
    let box=head.querySelector(':scope > .admin-head-actions');
    if(!box){
      box=document.createElement('div');
      box.className='admin-head-actions';
      head.appendChild(box);
    }
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='admin-fold-btn';
    btn.setAttribute('aria-label','展開或收合此管理區');
    box.appendChild(btn);
    setFold(panel,id,folded(id),btn);
    btn.onclick=()=>setFold(panel,id,!panel.classList.contains('is-folded'),btn);
  }

  function collapsibleGroup(id,title,desc){
    const host=document.getElementById(id);
    if(!host||host.dataset.groupFoldReady)return;
    host.dataset.groupFoldReady='1';
    host.classList.add('admin-lowfreq-host');
    const bar=document.createElement('div');
    bar.className='admin-group-fold';
    bar.innerHTML=`<div><b>${title}</b><small>${desc}</small></div><button type="button" class="admin-fold-btn">展開 <span>＋</span></button>`;
    host.prepend(bar);
    const btn=$('button',bar);
    const apply=v=>{
      host.classList.toggle('is-group-folded',v);
      btn.innerHTML=v?'展開 <span>＋</span>':'收合 <span>−</span>';
      btn.setAttribute('aria-expanded',v?'false':'true');
      save(id,v);
    };
    apply(folded(id));
    btn.onclick=()=>apply(!host.classList.contains('is-group-folded'));
  }

  function compact(){
    [
      'adminAnalytics','adminInquiries','products','homeHeroAdmin','adminFrontFeatureManager',
      'siteControlAdmin','adminBrandManager','adminLocationManager','contentControlAdmin','siteStructureAdmin'
    ].forEach(collapsiblePanel);
    collapsibleGroup('adminExtended','消息／案例／公司資料','低頻維護項目，更新公告、案例或公司資料時再展開。');
    collapsibleGroup('resourceAdmin','下載／系統方案','低頻維護項目，需要新增下載資源或系統方案時再展開。');
  }

  function expandTarget(id){
    const host=document.getElementById(id);
    if(!host)return;
    if(host.tagName==='DETAILS')host.open=true;
    const panel=panelFor(id);
    if(panel?.classList.contains('is-folded'))setFold(panel,id,false,panel.querySelector('.admin-fold-btn'));
    if(host.classList.contains('is-group-folded')){
      host.classList.remove('is-group-folded');
      const b=host.querySelector(':scope > .admin-group-fold .admin-fold-btn');
      if(b){
        b.innerHTML='收合 <span>−</span>';
        b.setAttribute('aria-expanded','true');
      }
      save(id,false);
    }
  }

  function prioritizeSidebar(){
    const nav=$('.admin-nav');
    const label=$('.admin-nav-label',nav||document);
    if(!nav||!label||$('#adminQuickNavSection',nav))return;

    const quick=document.createElement('div');
    quick.id='adminQuickNavSection';
    quick.className='admin-nav-section';
    quick.textContent='常用查看';
    label.insertAdjacentElement('afterend',quick);

    let anchor=quick;
    ['#adminAnalytics','#adminInquiries','#products','#homeHeroAdmin'].forEach(href=>{
      const link=nav.querySelector(`a[href="${href}"]`);
      if(!link)return;
      link.classList.toggle('admin-important',href==='#adminAnalytics');
      anchor.insertAdjacentElement('afterend',link);
      anchor=link;
    });
  }

  function nav(){
    const links=$$('.admin-nav a[href^="#"],.admin-section-jump a[href^="#"],.admin-dashboard a[href^="#"]');
    links.forEach(a=>{
      if(a.dataset.uxReady)return;
      a.dataset.uxReady='1';
      a.addEventListener('click',()=>{
        const id=(a.getAttribute('href')||'').slice(1);
        if(id)expandTarget(id);
      });
    });
  }

  function dangerous(){
    const m=document.getElementById('adminMaintenance');
    if(m&&!m.querySelector('.admin-danger-note')){
      const n=document.createElement('div');
      n.className='admin-danger-note';
      n.innerHTML='<b>重要提醒</b>此區包含清除、重設或復原類操作，可能影響目前網站資料。執行前務必確認備份與操作範圍。';
      const body=m.querySelector('.admin-maintenance-body');
      if(body)body.prepend(n);
    }
    const importLabel=$('label.btn input#importInput')?.closest('label');
    if(importLabel&&!importLabel.dataset.warnReady){
      importLabel.dataset.warnReady='1';
      importLabel.title='匯入會改變目前管理資料，請先保留現況備份。';
    }
  }

  function dirtyState(){
    if(window.__fbDirtyReady)return;
    window.__fbDirtyReady=true;
    const pill=$('#adminSaveState');
    const mark=()=>{
      dirty=true;
      if(pill){
        pill.textContent='有未儲存變更';
        pill.classList.add('dirty');
      }
    };
    document.addEventListener('input',e=>{
      if(e.target.closest('.admin-main')&&e.target.matches('input,textarea,select'))mark();
    },true);
    document.addEventListener('change',e=>{
      if(e.target.closest('.admin-main')&&e.target.matches('input,textarea,select'))mark();
    },true);
    document.addEventListener('submit',e=>{
      if(e.target.closest('.admin-main')){
        dirty=false;
        setTimeout(()=>{
          if(pill){
            pill.textContent='目前無未儲存變更';
            pill.classList.remove('dirty');
          }
        },80);
      }
    },true);
    window.addEventListener('beforeunload',e=>{
      if(!dirty)return;
      e.preventDefault();
      e.returnValue='';
    });
  }

  function safeReset(){
    const btn=$('#resetBtn');
    if(!btn||btn.dataset.safeReady)return;
    btn.dataset.safeReady='1';
    btn.onclick=()=>{
      if(!confirm('這會清除這台瀏覽器目前所有後台修改。建議先匯出備份。\n\n確定繼續？'))return;
      const typed=prompt('請輸入「恢復」確認：','');
      if(typed!=='恢復'){
        if(typed!==null)alert('文字不符，已取消。');
        return;
      }
      window.FBStore?.resetData?.();
      dirty=false;
      location.reload();
    };
  }

  function init(){
    if(document.body.dataset.page!=='admin')return;
    adminHomeLink();
    reorder();
    decorate();
    compact();
    prioritizeSidebar();
    nav();
    dangerous();
    dirtyState();
    safeReset();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
  window.addEventListener('farbeyound:datachange',()=>init());
})();