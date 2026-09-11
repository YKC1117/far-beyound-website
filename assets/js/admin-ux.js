(function(){
  'use strict';
  if(window.__fbAdminUx)return;window.__fbAdminUx=true;
  const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];
  const ORDER=['homeHeroAdmin','adminStats','siteControlAdmin','contentControlAdmin','siteStructureAdmin','products','adminExtended','resourceAdmin','adminMaintenance'];
  const SIDEBAR_DEFAULT=['homeHeroAdmin','siteControlAdmin','contentControlAdmin','siteStructureAdmin','products','adminExtended','resourceAdmin'];
  const META={
    homeHeroAdmin:{step:'01',tag:'最常用',hint:'首頁第一眼看到的內容與產品輪播'},
    siteControlAdmin:{step:'02',tag:'首頁',hint:'控制首頁各區塊與共用功能顯示'},
    contentControlAdmin:{step:'03',tag:'文字',hint:'網站文字、主選單、Footer 與 SEO'},
    siteStructureAdmin:{step:'04',tag:'內頁',hint:'各內頁標題、SEO 與產品分類'},
    products:{step:'05',tag:'商品',hint:'產品資料與首頁精選狀態'},
    adminExtended:{step:'06',tag:'內容',hint:'最新消息、客戶案例與公司基本資料'},
    resourceAdmin:{step:'07',tag:'資源',hint:'下載中心與系統方案'}
  };
  const LOW_FREQ=['contentControlAdmin','siteStructureAdmin','adminExtended','resourceAdmin'];
  const FOLD_KEY='farbeyoundAdminFoldV2';
  const NAV_ORDER_KEY='farbeyoundAdminNavOrderV1';
  let dirty=false;

  function readFold(){try{return JSON.parse(localStorage.getItem(FOLD_KEY)||'{}')||{}}catch(e){return {}}}
  function writeFold(id,folded){const s=readFold();s[id]=!!folded;localStorage.setItem(FOLD_KEY,JSON.stringify(s))}
  function shouldFold(id){const s=readFold();return Object.prototype.hasOwnProperty.call(s,id)?!!s[id]:LOW_FREQ.includes(id)}
  function readNavOrder(){try{const x=JSON.parse(localStorage.getItem(NAV_ORDER_KEY)||'[]');return Array.isArray(x)?x:[]}catch(e){return []}}
  function normalizedNavOrder(){const saved=readNavOrder().filter(id=>SIDEBAR_DEFAULT.includes(id));return [...saved,...SIDEBAR_DEFAULT.filter(id=>!saved.includes(id))]}
  function saveNavOrder(wrapper){const ids=$$('a[data-admin-target]',wrapper).map(a=>a.dataset.adminTarget).filter(Boolean);localStorage.setItem(NAV_ORDER_KEY,JSON.stringify(ids))}

  function reorder(){
    const main=$('.admin-main');if(!main)return;
    let anchor=$('.admin-section-jump')||$('.admin-top');
    ORDER.forEach(id=>{const el=document.getElementById(id);if(!el||!anchor)return;anchor.insertAdjacentElement('afterend',el);anchor=el});
  }

  function decorate(){
    Object.entries(META).forEach(([id,m])=>{
      const host=document.getElementById(id);if(!host)return;
      host.dataset.adminStep=m.step;
      const panel=id==='products'?host:host.querySelector(':scope > .admin-panel');
      if(panel&&!panel.querySelector('.admin-step-badge')){
        const head=panel.querySelector('.admin-panel-head > div');
        if(head){const badge=document.createElement('div');badge.className='admin-step-badge';badge.innerHTML=`<span>${m.step}</span><b>${m.tag}</b><small>${m.hint}</small>`;head.prepend(badge)}
      }
    });
    const hero=$('#homeHeroAdmin .admin-panel');if(hero)hero.classList.add('admin-priority-panel');
  }

  function setPanelFold(panel,id,folded,button){
    panel.classList.toggle('is-folded',folded);
    if(button){button.setAttribute('aria-expanded',folded?'false':'true');button.innerHTML=folded?'展開 <span>＋</span>':'收合 <span>−</span>'}
    writeFold(id,folded);
  }

  function makePanelCollapsible(id,defaultFold=false){
    const panel=$(`#${id} > .admin-panel`);if(!panel||panel.dataset.foldReady)return;
    panel.dataset.foldReady='1';
    const head=$('.admin-panel-head',panel);if(!head)return;
    const action=document.createElement('button');action.type='button';action.className='admin-fold-btn';
    const old=head.querySelector(':scope > a.btn, :scope > button.btn');
    let box=head.querySelector(':scope > .admin-head-actions');
    if(!box){box=document.createElement('div');box.className='admin-head-actions';if(old)box.appendChild(old);head.appendChild(box)}
    box.appendChild(action);
    const folded=defaultFold?shouldFold(id):false;
    setPanelFold(panel,id,folded,action);
    action.onclick=()=>setPanelFold(panel,id,!panel.classList.contains('is-folded'),action);
  }

  function makeGroupCollapsible(id,title,desc){
    const host=document.getElementById(id);if(!host||host.dataset.groupFoldReady)return;
    host.dataset.groupFoldReady='1';host.classList.add('admin-lowfreq-host');
    const bar=document.createElement('div');bar.className='admin-group-fold';
    bar.innerHTML=`<div><b>${title}</b><small>${desc}</small></div><button type="button" class="admin-fold-btn" aria-expanded="true">收合 <span>−</span></button>`;
    host.prepend(bar);
    const btn=$('button',bar);
    const apply=(folded)=>{host.classList.toggle('is-group-folded',folded);btn.setAttribute('aria-expanded',folded?'false':'true');btn.innerHTML=folded?'展開 <span>＋</span>':'收合 <span>−</span>';writeFold(id,folded)};
    apply(shouldFold(id));btn.onclick=()=>apply(!host.classList.contains('is-group-folded'));
  }

  function collapsible(){
    makePanelCollapsible('siteControlAdmin',false);
    makePanelCollapsible('contentControlAdmin',true);
    makePanelCollapsible('siteStructureAdmin',true);
    makeGroupCollapsible('adminExtended','消息／案例／公司資料','較低頻使用，需要維護公告、案例或公司基本資料時再展開。');
    makeGroupCollapsible('resourceAdmin','下載／系統方案','較低頻使用，需要更新下載資源或系統方案時再展開。');
  }

  function setAllFold(mode){
    const compact=mode==='compact';
    ['siteControlAdmin','contentControlAdmin','siteStructureAdmin'].forEach(id=>{
      const panel=$(`#${id} > .admin-panel`);if(!panel)return;
      const btn=panel.querySelector('.admin-fold-btn');
      const folded=compact?LOW_FREQ.includes(id):false;
      setPanelFold(panel,id,folded,btn);
    });
    ['adminExtended','resourceAdmin'].forEach(id=>{
      const host=document.getElementById(id),btn=host?.querySelector(':scope > .admin-group-fold .admin-fold-btn');if(!host||!btn)return;
      const folded=compact;host.classList.toggle('is-group-folded',folded);btn.setAttribute('aria-expanded',folded?'false':'true');btn.innerHTML=folded?'展開 <span>＋</span>':'收合 <span>−</span>';writeFold(id,folded);
    });
  }

  function sidebarOrder(){
    const nav=$('.admin-nav');if(!nav||nav.dataset.sortReady)return;nav.dataset.sortReady='1';
    const label=$('.admin-nav-label',nav);if(!label)return;
    const sortable=document.createElement('div');sortable.className='admin-sortable-nav';sortable.id='adminSortableNav';
    const links={};
    SIDEBAR_DEFAULT.forEach(id=>{const a=nav.querySelector(`a[href="#${id}"]`);if(a){a.dataset.adminTarget=id;links[id]=a}});
    normalizedNavOrder().forEach(id=>{if(links[id])sortable.appendChild(links[id])});
    const firstSection=$$('.admin-nav-section',nav).find(x=>x.textContent.includes('網站內容'));if(firstSection)firstSection.remove();
    label.insertAdjacentElement('afterend',sortable);

    const tools=document.createElement('div');tools.className='admin-nav-custom-tools';tools.innerHTML=`<div class="admin-nav-drag-hint">≡ 可拖曳調整左側順序</div><div><button type="button" data-nav-action="compact">精簡</button><button type="button" data-nav-action="expand">全展開</button><button type="button" data-nav-action="reset">預設排序</button></div>`;
    sortable.insertAdjacentElement('afterend',tools);

    $$('a[data-admin-target]',sortable).forEach(a=>{
      a.draggable=true;
      if(!a.querySelector('.admin-drag-handle')){const h=document.createElement('span');h.className='admin-drag-handle';h.textContent='⋮⋮';h.title='按住拖曳調整順序';a.prepend(h)}
      a.addEventListener('dragstart',e=>{a.classList.add('is-dragging');e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',a.dataset.adminTarget)});
      a.addEventListener('dragend',()=>{a.classList.remove('is-dragging');$$('.admin-nav-drop-before,.admin-nav-drop-after',sortable).forEach(x=>x.classList.remove('admin-nav-drop-before','admin-nav-drop-after'));saveNavOrder(sortable)});
      a.addEventListener('dragover',e=>{e.preventDefault();const dragging=$('.is-dragging',sortable);if(!dragging||dragging===a)return;const r=a.getBoundingClientRect(),after=e.clientY>r.top+r.height/2;$$('.admin-nav-drop-before,.admin-nav-drop-after',sortable).forEach(x=>x.classList.remove('admin-nav-drop-before','admin-nav-drop-after'));a.classList.add(after?'admin-nav-drop-after':'admin-nav-drop-before');sortable.insertBefore(dragging,after?a.nextSibling:a)});
      a.addEventListener('drop',e=>{e.preventDefault();saveNavOrder(sortable)});
    });
    tools.addEventListener('click',e=>{const b=e.target.closest('button[data-nav-action]');if(!b)return;const act=b.dataset.navAction;if(act==='compact')setAllFold('compact');if(act==='expand')setAllFold('expand');if(act==='reset'){localStorage.removeItem(NAV_ORDER_KEY);const map={};$$('a[data-admin-target]',sortable).forEach(a=>map[a.dataset.adminTarget]=a);SIDEBAR_DEFAULT.forEach(id=>map[id]&&sortable.appendChild(map[id]))}});
  }

  function expandForTarget(id){
    const host=document.getElementById(id);if(!host)return;
    const panel=host.matches('.admin-panel')?host:host.querySelector(':scope > .admin-panel');
    if(panel?.classList.contains('is-folded')){
      const btn=panel.querySelector('.admin-fold-btn');setPanelFold(panel,id,false,btn);
    }
    if(host.classList.contains('is-group-folded')){
      const btn=host.querySelector(':scope > .admin-group-fold .admin-fold-btn');
      host.classList.remove('is-group-folded');if(btn){btn.setAttribute('aria-expanded','true');btn.innerHTML='收合 <span>−</span>'}writeFold(id,false);
    }
  }

  function activeNav(){
    const navLinks=$$('.admin-nav a[href^="#"]');
    const jumpLinks=$$('.admin-section-jump a[href^="#"]');
    [...navLinks,...jumpLinks].forEach(a=>a.addEventListener('click',()=>{const id=(a.getAttribute('href')||'').slice(1);if(id)expandForTarget(id);navLinks.forEach(x=>x.classList.toggle('active',x.getAttribute('href')===a.getAttribute('href')))}));
    const sections=ORDER.map(id=>document.getElementById(id)).filter(Boolean);
    if(!('IntersectionObserver'in window))return;
    const obs=new IntersectionObserver(entries=>{const hit=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(!hit)return;navLinks.forEach(x=>x.classList.toggle('active',x.getAttribute('href')==='#'+hit.target.id))},{rootMargin:'-18% 0px -72% 0px',threshold:0});
    sections.forEach(s=>obs.observe(s));
  }

  function dirtyState(){
    const pill=$('#adminSaveState');
    const mark=()=>{dirty=true;if(pill){pill.textContent='有未儲存變更';pill.classList.add('dirty')}};
    document.addEventListener('input',e=>{if(e.target.closest('.admin-main')&&e.target.matches('input,textarea,select'))mark()},true);
    document.addEventListener('change',e=>{if(e.target.closest('.admin-main')&&e.target.matches('input,textarea,select'))mark()},true);
    document.addEventListener('submit',e=>{if(e.target.closest('.admin-main')){dirty=false;setTimeout(()=>{if(pill){pill.textContent='目前無未儲存變更';pill.classList.remove('dirty')}},50)}},true);
    window.addEventListener('beforeunload',e=>{if(!dirty)return;e.preventDefault();e.returnValue=''});
  }

  function safeReset(){
    const btn=$('#resetBtn');if(!btn||btn.dataset.safeReady)return;btn.dataset.safeReady='1';
    btn.onclick=()=>{
      if(!confirm('恢復預設會清除這台瀏覽器目前所有後台修改。\n\n建議先按「取消」，使用上方「匯出備份」保存 JSON。\n\n仍要繼續嗎？'))return;
      const typed=prompt('這是不可復原的操作。若確定要恢復，請輸入「恢復」：','');
      if(typed!=='恢復'){if(typed!==null)alert('文字不符，已取消恢復。');return}
      window.FBStore?.resetData?.();dirty=false;location.reload();
    };
  }

  function init(){
    if(document.body.dataset.page!=='admin')return;
    reorder();decorate();collapsible();sidebarOrder();safeReset();
    if(!window.__fbAdminNavReady){window.__fbAdminNavReady=true;activeNav();dirtyState()}
  }
  document.addEventListener('DOMContentLoaded',()=>{[60,250,700,1300].forEach(t=>setTimeout(init,t))});
  if(document.readyState!=='loading')[50,300,900].forEach(t=>setTimeout(init,t));
  window.addEventListener('farbeyound:datachange',()=>setTimeout(init,80));
})();