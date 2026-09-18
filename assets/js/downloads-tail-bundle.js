/* DOWNLOADS TAIL BUNDLE — exact original order after site-social. */
/* ===== assets/js/product-resources.js ===== */
(function(){
  if(!window.FBStore || window.__fbProductResources) return;
  window.__fbProductResources = true;

  const rawGet = FBStore.getData.bind(FBStore);
  const key = v => String(v || '').trim().toLowerCase().replace(/\s+/g,'');

  FBStore.getData = function(){
    const data = rawGet();
    const map = window.FBProductDocs?.items || {};

    (data.products || []).forEach(product => {
      const imported = Array.isArray(map[product.legacyUrl]) ? map[product.legacyUrl] : [];
      if(!imported.length) return;

      const existing = Array.isArray(product.files) ? product.files : [];
      const merged = [];
      const seen = new Set();

      imported.forEach(file => {
        if(!file || !file.url) return;
        const sig = key(file.label) + '|' + key(file.url);
        if(seen.has(sig)) return;
        seen.add(sig);
        merged.push({
          label: file.label || '技術文件',
          type: file.type || (/\.pdf(?:$|\?)/i.test(file.url) ? 'PDF' : '文件'),
          url: file.url,
          source: 'official'
        });
      });

      existing.forEach(file => {
        if(!file) return;
        const sameLabel = merged.some(x => key(x.label) === key(file.label));
        if(sameLabel && !file.url) return;
        const sig = key(file.label) + '|' + key(file.url);
        if(seen.has(sig)) return;
        seen.add(sig);
        merged.push(file);
      });

      product.files = merged;
    });

    return data;
  };
})();

/* ===== assets/js/downloads-redesign.js ===== */
(function(){
  if(document.body.dataset.page!=='downloads'||window.__fbDownloadsRedesign)return;
  window.__fbDownloadsRedesign=true;
  const TYPES=[{id:'all',name:'全部類型'},{id:'drivers',name:'驅動程式'},{id:'software',name:'標籤軟體'},{id:'tools',name:'工具程式'},{id:'manuals',name:'手冊與文件'},{id:'remote',name:'遠端與系統'},{id:'other',name:'其他下載'}];
  const DOWNLOAD_GATEWAY='https://papqrnqbfauwuipjwwdh.supabase.co/functions/v1/download-file';
  const DIRECT_FILE=/\.(?:zip|exe|msi|dmg|pkg|pdf|rar|7z|gz|tgz|tar)(?:$|[?#])/i;
  const SPECIAL_DIRECT=[/^https:\/\/fs\.tscprinters\.com\/(?:[^/]+\/)?dl\/\d+\/\d+(?:[?#]|$)/i,/^https:\/\/download\.anydesk\.com\//i];
  const verifiedDownloads=new Set();
  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const textOf=x=>`${x.category||''} ${x.name||''} ${x.note||''} ${x.brand||''}`.toLowerCase();
  function typeOf(x){const c=String(x.category||'').toLowerCase(),s=textOf(x);if(/驅動|driver|seagull/.test(c)||/\bdriver\b|printer driver|macos driver|linux driver/.test(s))return'drivers';if(/標籤編輯軟體|標籤軟體|label software/.test(c)||/bartender|zebradesigner|argobar|labeling software|designer/.test(s))return'software';if(/工具程式|utility|utilities|tool/.test(c)||/printer tool|font utility|console pc|configuration tool|diagnostic/.test(s))return'tools';if(/指令手冊|手冊|文件|manual|guide/.test(c)||/programming guide|command manual|reference guide|user guide|datasheet|型錄|技術文件|指令/.test(s))return'manuals';if(/遠端連線|microsoft|遠端|remote|anydesk|teamviewer/.test(s))return'remote';return'other'}
  function typeName(id){return TYPES.find(t=>t.id===id)?.name||'其他下載'}
  function safeDownload(item){
    const name=String(item.name||'下載資料');
    const fallback=`contact.html?item=${encodeURIComponent(name+' 檔案索取')}`;
    const url=String(item.url||'').trim();
    if(!url)return {href:fallback,fallback,action:'索取檔案',direct:false};
    const signed=/[?&](?:Policy|Signature|Key-Pair-Id|Expires)=/i.test(url);
    const direct=!signed&&(DIRECT_FILE.test(url)||SPECIAL_DIRECT.some(re=>re.test(url)));
    if(direct){
      const sp=new URLSearchParams({src:url,name:String(item.name||'download')});
      return {href:`${DOWNLOAD_GATEWAY}?${sp.toString()}`,fallback,action:'直接下載',direct:true};
    }
    return {href:fallback,fallback,action:'索取檔案',direct:false};
  }
  function init(){
    if(!window.FBStore)return;
    let data=FBStore.getData(),items=(data.downloads||[]).filter(x=>x.published!==false).slice(),brands=[...new Set(items.map(x=>x.brand).filter(Boolean))];
    const params=new URLSearchParams(location.search),requestedBrand=String(params.get('brand')||'').trim();
    let activeType='all',activeBrand=brands.includes(requestedBrand)?requestedBrand:'all',query='',filterStage=activeBrand==='all'?'type':'brand';
    const typeBox=document.getElementById('downloadTypeFilters'),brandBox=document.getElementById('downloadBrandFilters'),listBox=document.getElementById('downloadResults'),countBox=document.getElementById('downloadCount'),titleBox=document.getElementById('downloadResultsTitle'),descBox=document.getElementById('downloadResultsDesc'),search=document.getElementById('downloadSearch');
    if(!typeBox||!brandBox||!listBox||!countBox||!titleBox||!descBox||!search)return;
    const typeSection=typeBox.closest('.filter-section'),brandSection=brandBox.closest('.filter-section'),filterTitle=typeSection?.querySelector('.filter-title');
    if(brandSection)brandSection.classList.add('legacy-brand-section');
    function matches(x){const q=query.trim().toLowerCase();return(activeType==='all'||typeOf(x)===activeType)&&(activeBrand==='all'||x.brand===activeBrand)&&(!q||textOf(x).includes(q))}
    function filtered(){return items.filter(matches)}
    function countType(id){return items.filter(x=>(id==='all'||typeOf(x)===id)&&(activeBrand==='all'||x.brand===activeBrand)&&(!query.trim()||textOf(x).includes(query.trim().toLowerCase()))).length}
    function countBrand(b){return items.filter(x=>(b==='all'||x.brand===b)&&(activeType==='all'||typeOf(x)===activeType)&&(!query.trim()||textOf(x).includes(query.trim().toLowerCase()))).length}
    function btn(label,count,active,attr,value,extra=''){return `<button class="filter-btn ${active?'active':''} ${extra}" ${attr}="${esc(value)}"><span>${esc(label)}</span><span class="count">${count}</span></button>`}
    function renderFilters(){
      if(brandSection)brandSection.style.display='none';
      if(filterStage==='type'||(activeType==='all'&&activeBrand==='all')){
        if(filterTitle)filterTitle.textContent='下載類型';
        typeBox.classList.remove('brand-step');
        typeBox.innerHTML=TYPES.filter(t=>t.id==='all'||items.some(x=>typeOf(x)===t.id)).map(t=>btn(t.name,countType(t.id),activeType===t.id,'data-type',t.id)).join('');
        typeBox.querySelectorAll('[data-type]').forEach(b=>b.onclick=()=>{activeType=b.dataset.type;activeBrand='all';filterStage=activeType==='all'?'type':'brand';render()});
        return;
      }
      if(filterTitle)filterTitle.textContent=activeType==='all'?'選擇品牌':`${typeName(activeType)}｜選擇品牌`;
      typeBox.classList.add('brand-step');
      const availableBrands=brands.filter(b=>countBrand(b)>0);
      typeBox.innerHTML=`<button class="filter-back" type="button" data-back-type>← 返回下載類型</button>${btn('全部品牌',countBrand('all'),activeBrand==='all','data-brand','all','all-brands')}${availableBrands.map(b=>btn(b,countBrand(b),activeBrand===b,'data-brand',b)).join('')}`;
      typeBox.querySelector('[data-back-type]').onclick=()=>{activeType='all';activeBrand='all';filterStage='type';render()};
      typeBox.querySelectorAll('[data-brand]').forEach(b=>b.onclick=()=>{activeBrand=b.dataset.brand;render()});
    }
    function card(x){
      const meta=[];
      if(x.version)meta.push(`版本 ${esc(x.version)}`);
      if(x.updated)meta.push(`更新 ${esc(x.updated)}`);
      if(x.size)meta.push(esc(x.size));
      const link=safeDownload(x),availability=link.direct?'可直接下載':'協助提供';
      const directAttrs=link.direct?` data-direct-download="1" data-fallback-href="${esc(link.fallback)}"`:'';
      return `<article class="download-card"><div class="download-card-icon">DL</div><div class="download-card-main"><div class="download-card-tags"><span class="download-tag type">${esc(typeName(typeOf(x)))}</span><span class="download-tag">${esc(x.brand||'其他')}</span><span class="download-tag">${availability}</span></div><h3>${esc(x.name||'下載資源')}</h3>${x.note?`<p>${esc(x.note)}</p>`:''}${meta.length?`<div class="download-meta">${meta.map(m=>`<span>${m}</span>`).join('')}</div>`:''}</div><a class="download-btn" href="${esc(link.href)}"${directAttrs}>${link.action}</a></article>`
    }
    function group(name,rows){return `<section class="download-group"><div class="download-group-title"><h3>${esc(name)}</h3><span>${rows.length} 項</span></div><div class="download-card-list">${rows.map(card).join('')}</div></section>`}
    function renderList(){
      const rows=filtered();countBox.textContent=`共 ${rows.length} 項`;const typeLabel=activeType==='all'?'全部類型':typeName(activeType);titleBox.textContent=activeBrand==='all'?typeLabel:`${activeBrand}｜${typeLabel}`;
      if(query.trim())descBox.textContent=`搜尋「${query.trim()}」的結果`;
      else if(activeBrand!=='all'&&activeType==='all')descBox.textContent=`目前顯示 ${activeBrand} 的全部下載資源，可返回下載類型重新篩選。`;
      else if(activeType==='all')descBox.textContent='先選擇下載類型，再進一步選擇品牌；可直接下載的檔案會先自動確認可用性。';
      else if(activeBrand==='all')descBox.textContent='已選擇下載類型，請再選擇品牌，或查看此類型全部品牌。';
      else descBox.textContent=`目前顯示 ${activeBrand} 的${typeLabel}。`;
      if(!rows.length){listBox.innerHTML='<div class="download-empty"><b>沒有找到符合條件的下載項目</b><span>請返回下載類型或調整搜尋關鍵字。</span></div>';return}
      if(activeType==='all')listBox.innerHTML=TYPES.filter(t=>t.id!=='all').map(t=>{const r=rows.filter(x=>typeOf(x)===t.id);return r.length?group(t.name,r):''}).join('');
      else if(activeBrand==='all')listBox.innerHTML=brands.map(b=>{const r=rows.filter(x=>x.brand===b);return r.length?group(b,r):''}).join('');
      else listBox.innerHTML=`<div class="download-card-list">${rows.map(card).join('')}</div>`;
    }
    function render(){renderFilters();renderList()}
    function refreshData(){
      data=FBStore.getData();
      items=(data.downloads||[]).filter(x=>x.published!==false).slice();
      brands=[...new Set(items.map(x=>x.brand).filter(Boolean))];
      if(activeBrand!=='all'&&!brands.includes(activeBrand)){activeBrand='all';filterStage=activeType==='all'?'type':'brand'}
      render();
    }
    search.addEventListener('input',()=>{query=search.value;render()});
    listBox.addEventListener('click',async event=>{
      const link=event.target.closest('a[data-direct-download="1"]');
      if(!link)return;
      event.preventDefault();
      if(link.dataset.busy==='1')return;
      const href=link.href,fallback=link.dataset.fallbackHref||'contact.html?item=%E4%B8%8B%E8%BC%89%E8%B3%87%E6%96%99%E6%AA%94%E6%A1%88%E7%B4%A2%E5%8F%96';
      if(verifiedDownloads.has(href)){location.href=href;return}
      const original=link.textContent;
      link.dataset.busy='1';
      link.setAttribute('aria-disabled','true');
      link.textContent='確認檔案中…';
      const controller=new AbortController();
      const timeout=setTimeout(()=>controller.abort(),10000);
      try{
        const probeUrl=`${href}${href.includes('?')?'&':'?'}probe=1`;
        const response=await fetch(probeUrl,{method:'GET',headers:{Accept:'application/json'},signal:controller.signal});
        if(!response.ok)throw new Error('download_probe_failed');
        const result=await response.json().catch(()=>null);
        if(!result?.ok)throw new Error('download_probe_failed');
        verifiedDownloads.add(href);
        link.textContent='開始下載…';
        location.href=href;
        setTimeout(()=>{link.dataset.busy='';link.removeAttribute('aria-disabled');link.textContent=original},1600);
      }catch(_){
        link.dataset.busy='';
        link.removeAttribute('aria-disabled');
        link.removeAttribute('data-direct-download');
        link.href=fallback;
        link.textContent='索取檔案';
        window.FBPages?.toast?.('此檔案目前無法直接下載，已切換為檔案索取，可由萬里資訊協助提供。');
      }finally{
        clearTimeout(timeout);
      }
    });
    window.addEventListener('farbeyound:datachange',()=>setTimeout(refreshData,0));
    render();
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(init,30),{once:true});
  if(document.readyState!=='loading')setTimeout(init,30);
})();
/* INNER CONTACT BUNDLE — contact/footer runtime in original order. */

/* ===== assets/js/contact-youtube-upgrade.js ===== */
(function(){if(window.__fbContactYoutubeUpgrade)return;window.__fbContactYoutubeUpgrade=true;function data(){const d=window.FBStore?.getData?.()||{},site=d.site||{};return{phones:Array.isArray(site.phones)?site.phones:[],youtube:String(site.youtube||window.FBSocialLinks?.youtube||'').trim()}}function tel(v){return String(v||'').replace(/[^0-9+]/g,'')}function loadMobileExperience(){if(document.querySelector('link[data-mobile-experience]'))return;const l=document.createElement('link');l.rel='stylesheet';l.href='assets/css/mobile-experience.css?v=20260911b';l.dataset.mobileExperience='1';document.head.appendChild(l)}function addStyle(){if(document.getElementById('fbContactYoutubeUpgradeStyle'))return;const s=document.createElement('style');s.id='fbContactYoutubeUpgradeStyle';s.textContent='.footer-media-link{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 0;border-top:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12);text-decoration:none;color:inherit}.footer-media-copy{display:flex;align-items:center;gap:12px;min-width:0}.footer-media-icon{width:36px;height:36px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.24);border-radius:50%}.footer-media-icon svg{width:19px;height:19px;fill:currentColor}.footer-media-copy small{display:block;font-size:10px;letter-spacing:.12em;opacity:.68;margin-bottom:3px}.footer-media-copy b{display:block;font-size:13px}.footer-media-arrow{font-size:12px;font-weight:700;white-space:nowrap;opacity:.78}@media(max-width:680px){.footer-media-link{padding:16px 0}.footer-media-arrow{font-size:11px}}';document.head.appendChild(s)}function upgradeMobilePhone(){const old=document.querySelector('[data-mobile-phone]'),panel=document.querySelector('.mobile-contact-phone');if(!old||!panel||old.dataset.clickPanelReady==='1')return;const btn=old.cloneNode(true);btn.dataset.clickPanelReady='1';old.replaceWith(btn);const label=btn.querySelector('span');if(label)label.textContent='電話';btn.setAttribute('aria-label','電話聯絡');panel.id='mobilePhonePanel';panel.innerHTML='';data().phones.forEach(p=>{const a=document.createElement('a');a.href='tel:'+tel(p.value);const s=document.createElement('span'),b=document.createElement('b');s.textContent=(p.label||'')+'辦公室';b.textContent=p.value||'';a.append(s,b);panel.appendChild(a)});btn.setAttribute('aria-controls',panel.id);btn.setAttribute('aria-expanded','false');const close=()=>{panel.classList.remove('is-open');btn.setAttribute('aria-expanded','false')};btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const open=!panel.classList.contains('is-open');close();if(open){panel.classList.add('is-open');btn.setAttribute('aria-expanded','true')}});panel.addEventListener('click',e=>e.stopPropagation());document.addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}function addYoutubeFooter(){const url=data().youtube,old=document.querySelector('.footer-media-wrap');if(!url){old?.remove();return}if(old){const a=old.querySelector('a');if(a)a.href=url;return}const footer=document.querySelector('footer'),target=footer?.querySelector('.footer-bottom')||footer?.lastElementChild;if(!footer||!target)return;const wrap=document.createElement('div');wrap.className='container footer-media-wrap';const a=document.createElement('a');a.className='footer-media-link';a.href=url;a.target='_blank';a.rel='noopener';a.setAttribute('aria-label','萬里資訊 YouTube 頻道（另開新視窗）');a.innerHTML='<span class="footer-media-copy"><span class="footer-media-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21.2 7.1a2.8 2.8 0 0 0-2-2C17.4 4.6 12 4.6 12 4.6s-5.4 0-7.2.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.3 12a29 29 0 0 0 .5 4.9 2.8 2.8 0 0 0 2 2c1.8.5 7.2.5 7.2.5s5.4 0 7.2-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-4.9 29 29 0 0 0-.5-4.9ZM10 15.2V8.8l5.5 3.2L10 15.2Z"/></svg></span><span><small>VIDEO CHANNEL</small><b>萬里資訊 YouTube</b></span></span><span class="footer-media-arrow">前往影音頻道 →</span>';wrap.appendChild(a);target.parentNode.insertBefore(wrap,target)}function run(){loadMobileExperience();addStyle();upgradeMobilePhone();addYoutubeFooter()}document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,160);setTimeout(run,700)});if(document.readyState!=='loading')setTimeout(run,0);window.addEventListener('farbeyound:datachange',()=>setTimeout(run,120))})();

/* ===== assets/js/desktop-phone-popover.js ===== */
/* Desktop phone interaction authority.
 * final-fixes.js builds the quick-contact DOM; this file owns the final
 * desktop phone accessibility/state contract so hover and click never cancel
 * each other during the same pointer interaction.
 */
(function(){
  'use strict';
  if(window.__fbDesktopPhonePopoverCompat)return;
  window.__fbDesktopPhonePopoverCompat=true;

  document.body?.classList.add('fb-public-ready');

  let activeItem=null;
  let classObserver=null;
  const COLORS=['#17324d','#06C755','#F28C28'];

  function stabilizeHero(){
    if(document.body?.dataset?.page!=='home')return;
    const data=window.FBStore?.getData?.();
    if(!data)return;
    data.homeHero=Object.assign({},data.homeHero||{}, {autoplay:false});
  }

  function lockRail(rail){
    rail.style.setProperty('overflow','visible','important');
    [...rail.querySelectorAll('.quick-contact-btn')].slice(0,3).forEach((button,index)=>{
      button.style.setProperty('background',COLORS[index],'important');
      button.style.setProperty('color','#fff','important');
      button.style.setProperty('transition','none','important');
      button.querySelectorAll('svg').forEach(svg=>svg.style.setProperty('stroke','#fff','important'));
      button.querySelectorAll('span,b,small').forEach(node=>node.style.setProperty('color','#fff','important'));
    });
  }

  function normalizePhonePanel(panel){
    const links=[...panel.querySelectorAll('a[href^="tel:"]')];
    const expected=[
      {label:'新北辦公室',number:'02-82217759',href:'tel:0282217759'},
      {label:'台南辦公室',number:'06-2360139',href:'tel:062360139'}
    ];
    expected.forEach((info,index)=>{
      const link=links[index];
      if(!link)return;
      link.href=info.href;
      const label=link.querySelector('span');
      const number=link.querySelector('b');
      if(label)label.textContent=info.label;
      if(number)number.textContent=info.number;
    });
  }

  function sync(item,button,panel){
    const open=item.classList.contains('is-open');
    button.setAttribute('aria-expanded',String(open));
    panel.setAttribute('aria-hidden',String(!open));
    panel.style.setProperty('display','block','important');
    panel.style.setProperty('visibility',open?'visible':'hidden','important');
    panel.style.setProperty('opacity',open?'1':'0','important');
    panel.style.setProperty('transform',open?'none':'translateX(8px)','important');
    panel.style.setProperty('pointer-events',open?'auto':'none','important');
    panel.style.setProperty('z-index','120','important');
  }

  function openPhone(item,button,panel){
    item.classList.add('is-open');
    sync(item,button,panel);
  }

  function closePhone(item,button,panel){
    item.classList.remove('is-open');
    sync(item,button,panel);
  }

  function bind(){
    if(document.body?.dataset?.page==='admin')return false;
    document.body?.classList.add('fb-public-ready');
    const rail=document.querySelector('.quick-contact');
    if(!rail)return false;
    lockRail(rail);

    const items=[...rail.querySelectorAll('.quick-contact-item')];
    const item=rail.querySelector('.quick-contact-item[data-contact-phone]')||items[0];
    if(!item)return false;
    if(!item.hasAttribute('data-contact-phone'))item.setAttribute('data-contact-phone','');

    const button=item.querySelector('.quick-contact-btn');
    const panel=item.querySelector('.quick-phone-panel');
    if(!button||!panel)return false;

    panel.id='fbDesktopPhonePopover';
    button.setAttribute('aria-controls',panel.id);
    normalizePhonePanel(panel);
    sync(item,button,panel);

    if(activeItem!==item){
      if(classObserver)classObserver.disconnect();
      activeItem=item;
      classObserver=new MutationObserver(()=>sync(item,button,panel));
      classObserver.observe(item,{attributes:true,attributeFilter:['class']});
    }

    if(!item.dataset.desktopPopoverCompat){
      item.dataset.desktopPopoverCompat='1';

      /* hoverState only previews the card. Once the user clicks, clickState
       * takes priority until the pointer leaves, so the second click can close
       * the card without mouseenter immediately reopening it. */
      let clickState=null;
      let openedByHover=false;

      button.addEventListener('click',e=>{
        e.preventDefault();
        e.stopImmediatePropagation();

        if(openedByHover){
          clickState=true;
          openedByHover=false;
          openPhone(item,button,panel);
          return;
        }

        if(clickState===true||item.classList.contains('is-open')){
          clickState=false;
          closePhone(item,button,panel);
          return;
        }

        clickState=true;
        openPhone(item,button,panel);
      },true);

      item.addEventListener('mouseenter',()=>{
        if(clickState===false)return;
        if(clickState===null)openedByHover=true;
        openPhone(item,button,panel);
      });

      item.addEventListener('mouseleave',()=>{
        clickState=null;
        openedByHover=false;
        closePhone(item,button,panel);
      });

      document.addEventListener('click',e=>{
        if(item.contains(e.target))return;
        clickState=null;
        openedByHover=false;
        closePhone(item,button,panel);
      });

      document.addEventListener('keydown',e=>{
        if(e.key!=='Escape')return;
        clickState=false;
        openedByHover=false;
        closePhone(item,button,panel);
      });
    }
    return true;
  }

  function boot(){
    stabilizeHero();
    if(bind())return;

    const root=document.body||document.documentElement;
    const domObserver=new MutationObserver(()=>{
      if(bind())domObserver.disconnect();
    });
    domObserver.observe(root,{childList:true,subtree:true});
    setTimeout(()=>domObserver.disconnect(),1500);
  }

  stabilizeHero();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
  window.addEventListener('load',()=>{document.body?.classList.add('fb-public-ready');stabilizeHero();bind()},{once:true});
  window.addEventListener('farbeyound:datachange',()=>{stabilizeHero();requestAnimationFrame(bind)});
})();

