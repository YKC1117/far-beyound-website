/* INNER AUX BUNDLE — shared modules previously injected one-by-one by nav-menu/site-social. */

/* ===== assets/js/front-url-guard.js ===== */
(()=>{'use strict';if(window.__fbFrontUrlGuard)return;window.__fbFrontUrlGuard=true;function safe(raw){const v=String(raw||'').trim();if(!v||v==='#')return true;if(v.startsWith('#'))return true;if(/^\/(?!\/)/.test(v))return true;if(/^[a-z0-9_.-]+\.html(?:[?#].*)?$/i.test(v))return true;if(/^(?:\.\/|\.\.\/)[^\s]*$/i.test(v))return true;if(/^(?:https?:|mailto:|tel:)/i.test(v))return true;return false}function block(a){const h=a.getAttribute('href')||'';if(safe(h))return;a.dataset.blockedHref=h;a.setAttribute('href','#');a.removeAttribute('target');a.removeAttribute('rel');a.title='此連結格式已被網站安全規則封鎖';a.classList.add('fb-unsafe-link')}function protect(root=document){if(root.matches?.('a[href]'))block(root);root.querySelectorAll?.('a[href]').forEach(block)}function style(){if(document.getElementById('fbUrlGuardStyle'))return;const s=document.createElement('style');s.id='fbUrlGuardStyle';s.textContent='.fb-unsafe-link{opacity:.55!important;cursor:not-allowed!important}';document.head.appendChild(s)}function run(){style();protect()}document.addEventListener('DOMContentLoaded',()=>setTimeout(run,280));window.addEventListener('load',()=>setTimeout(run,180));window.addEventListener('farbeyound:datachange',()=>setTimeout(run,140));new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.nodeType===1)protect(n)}).observe(document.documentElement,{subtree:true,childList:true});document.addEventListener('click',e=>{const a=e.target.closest?.('a[href]');if(a&&!safe(a.getAttribute('href'))){e.preventDefault();e.stopImmediatePropagation();alert('此連結格式不符合網站安全規則，已阻止開啟。')}},true);window.FBUrlSafety={isSafe:safe,protect};})();

/* ===== assets/js/page-settings-control.js ===== */
(()=>{'use strict';if(window.__fbPageSettingsControl)return;window.__fbPageSettingsControl=true;
const DEFAULTS={products:{title:'產品資訊',subtitle:'提供條碼列印、掃描、RFID、行動設備、標籤耗材與維修相關產品資訊。',seoTitle:'產品資訊｜萬里資訊',seoDescription:'萬里資訊產品資訊：標籤條碼列印機、掃描器、RFID、行動電腦、標籤耗材與維修配件。'},downloads:{title:'下載服務',subtitle:'依產品品牌與類型快速找到驅動程式、工具、手冊與相關下載資源。',seoTitle:'下載服務｜萬里資訊',seoDescription:'萬里資訊下載中心，提供條碼設備驅動程式、工具、手冊與相關資源。'},solutions:{title:'系統方案',subtitle:'依生產、倉儲、SMT 與條碼應用需求，提供可與現場流程整合的系統方案。',seoTitle:'系統方案｜萬里資訊',seoDescription:'萬里資訊提供 SFIS、WMS、SMT 防錯與條碼系統整合方案。'},cases:{title:'客戶案例',subtitle:'了解萬里資訊在生產、倉儲、條碼與系統整合上的實際應用案例。',seoTitle:'客戶案例｜萬里資訊',seoDescription:'萬里資訊客戶案例與系統導入經驗。'},news:{title:'最新消息',subtitle:'產品、系統、公司與服務相關最新資訊。',seoTitle:'最新消息｜萬里資訊',seoDescription:'萬里資訊最新消息、產品資訊與公司公告。'},about:{title:'關於萬里資訊',subtitle:'專注企業條碼、自動識別設備、耗材、維修與智慧製造系統整合。',seoTitle:'關於我們｜萬里資訊',seoDescription:'認識萬里資訊與企業條碼、自動識別及系統整合服務。'},locations:{title:'服務據點',subtitle:'台北與台南服務據點，提供設備、耗材與技術服務窗口。',seoTitle:'服務據點｜萬里資訊',seoDescription:'萬里資訊台北與台南服務據點資訊。'},contact:{title:'聯絡我們',subtitle:'設備、耗材、維修或系統需求，歡迎與萬里資訊聯絡。',seoTitle:'聯絡我們｜萬里資訊',seoDescription:'聯絡萬里資訊，洽詢條碼設備、耗材、維修與系統整合服務。'}};
function meta(content){let m=document.querySelector('meta[name="description"]');if(!m){m=document.createElement('meta');m.name='description';document.head.appendChild(m)}m.content=content||''}
function apply(){const page=document.body.dataset.page;if(!DEFAULTS[page]||!window.FBStore)return;const d=FBStore.getData(),cfg=Object.assign({},DEFAULTS[page],d.pageSettings?.[page]||{});if(cfg.seoTitle)document.title=cfg.seoTitle;if(cfg.seoDescription!=null)meta(cfg.seoDescription);let hero=document.querySelector('.page-hero')||document.querySelector('.downloads-hero');if(!hero)return;if(page==='products'&&new URLSearchParams(location.search).get('category'))return;const h=hero.querySelector('h1'),p=hero.querySelector('p');if(h&&cfg.title)h.textContent=cfg.title;if(p&&cfg.subtitle!=null)p.textContent=cfg.subtitle}
document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,220));window.addEventListener('load',()=>setTimeout(apply,120));window.addEventListener('farbeyound:datachange',()=>setTimeout(apply,100));window.FBPageSettings={apply};})();

/* ===== assets/js/search-visibility.js ===== */
(()=>{if(window.__fbSearchVisibility)return;window.__fbSearchVisibility=true;function bind(){const input=document.getElementById('siteSearchInput');if(!input||input.dataset.fbSearchVisibility)return;input.dataset.fbSearchVisibility='1';input.addEventListener('input',()=>{setTimeout(()=>{const d=window.FBStore?.getData?.();const box=document.getElementById('siteSearchResults');if(!d||!box)return;box.querySelectorAll('a.search-result').forEach(a=>{const href=a.getAttribute('href')||'';if(href.startsWith('product.html?id=')){const id=new URL(href,location.href).searchParams.get('id');const p=(d.products||[]).find(x=>String(x.id)===String(id));if(p?.published===false)a.remove()}else if(href.startsWith('solutions.html#')){const id=decodeURIComponent(href.split('#')[1]||'');const s=(d.solutions||[]).find(x=>String(x.id)===id);if(s?.published===false)a.remove()}else if(href.startsWith('news')){const title=a.querySelector('b')?.textContent||'';const n=(d.news||[]).find(x=>String(x.title||'')===title);if(n?.published===false)a.remove()}})},0)})}document.addEventListener('DOMContentLoaded',()=>setTimeout(bind,250));window.addEventListener('load',()=>setTimeout(bind,150));})();

/* ===== assets/js/front-location-control.js ===== */
(()=>{'use strict';if(window.__fbFrontLocationControl)return;window.__fbFrontLocationControl=true;const DEFAULT=[{id:'taipei',type:'TAIPEI HEAD OFFICE',name:'萬里資訊股份有限公司－台北總公司',phone:'02-82217759',fax:'02-82217238',address:'新北市中和區中山路二段351號10樓之1',email:'company@far-beyound.com.tw',primary:true,enabled:true},{id:'tainan',type:'TAINAN OFFICE',name:'萬里資訊股份有限公司－台南分公司',phone:'06-2360139',fax:'06-2367896',address:'台南市永康區中華路425號4樓之18',email:'company@far-beyound.com.tw',primary:true,enabled:true},{id:'shenzhen',type:'SHENZHEN',name:'永卓欣科技有限公司－深圳總公司',phone:'400-822-9366',fax:'0755-27128610',address:'深圳市光明區新湖街道樓村社區中泰路6號H棟3層B區',email:'',primary:false,enabled:true},{id:'kunshan',type:'KUNSHAN',name:'永卓欣科技有限公司－昆山分公司',phone:'0512-57761759',fax:'0512-57775286',address:'昆山市虹橋新村123號',email:'',primary:false,enabled:true}];function value(d){const x=d.site?.locations;return Array.isArray(x)?x:DEFAULT}function pair(dl,k,v){if(!v)return;const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=k;dd.textContent=v;dl.append(dt,dd)}function apply(){if(document.body.dataset.page!=='locations')return;const d=window.FBStore?.getData?.();const box=document.querySelector('.location-grid');if(!d||!box)return;box.innerHTML='';value(d).filter(x=>x.enabled!==false).forEach(x=>{const card=document.createElement('article');card.className='location-card'+(x.primary?' primary':'');const type=document.createElement('span');type.className='loc-type';type.textContent=x.type||'SERVICE LOCATION';const h=document.createElement('h2');h.textContent=x.name||'服務據點';const dl=document.createElement('dl');pair(dl,'電話',x.phone);pair(dl,'傳真',x.fax);pair(dl,'地址',x.address);pair(dl,'E-mail',x.email);card.append(type,h,dl);box.appendChild(card)});if(!box.children.length){const p=document.createElement('p');p.textContent='目前沒有顯示中的服務據點。';box.appendChild(p)}}document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,260));window.addEventListener('load',()=>setTimeout(apply,160));window.addEventListener('farbeyound:datachange',()=>setTimeout(apply,100));window.FBLocationControl={apply,defaults:DEFAULT};})();

/* ===== assets/js/front-feature-control.js ===== */
(()=>{'use strict';if(window.__fbFrontFeatureControl)return;window.__fbFrontFeatureControl=true;
const DEFAULT_NAV=[{id:'products',label:'產品資訊',url:'products.html',enabled:true,desktop:true,mobile:true},{id:'solutions',label:'系統方案',url:'solutions.html',enabled:true,desktop:true,mobile:true},{id:'cases',label:'客戶案例',url:'cases.html',enabled:true,desktop:true,mobile:true},{id:'news',label:'最新消息',url:'news.html',enabled:true,desktop:true,mobile:true},{id:'downloads',label:'下載服務',url:'downloads.html',enabled:true,desktop:true,mobile:true},{id:'company',label:'公司資訊',url:'about.html',enabled:true,desktop:true,mobile:true}];
const DEFAULT_QUICK=[{id:'phone',label:'電話',icon:'☎',kind:'phones',url:'',enabled:true,desktop:true,mobile:true},{id:'line',label:'LINE',icon:'L',kind:'link',url:'https://line.me/R/ti/p/@453haosc',enabled:true,desktop:true,mobile:true},{id:'inquiry',label:'詢問',icon:'✉',kind:'link',url:'contact.html#inquiryForm',enabled:true,desktop:true,mobile:true}];
const DEFAULT_FOOTER_PRODUCTS=[{id:'fp1',label:'標籤條碼列印機',url:'products.html?category=printers',enabled:true},{id:'fp2',label:'條碼掃描器',url:'products.html?category=scanners',enabled:true},{id:'fp3',label:'RFID 設備',url:'products.html?category=rfid',enabled:true},{id:'fp4',label:'維修與配件',url:'products.html?category=parts',enabled:true}];
const DEFAULT_FOOTER_SUPPORT=[{id:'fs1',label:'下載服務',url:'downloads.html',enabled:true},{id:'fs2',label:'系統方案',url:'solutions.html',enabled:true},{id:'fs3',label:'客戶案例',url:'cases.html',enabled:true},{id:'fs4',label:'最新消息',url:'news.html',enabled:true},{id:'fs5',label:'關於我們',url:'about.html',enabled:true},{id:'fs6',label:'服務據點',url:'locations.html',enabled:true},{id:'fs7',label:'免費諮詢',url:'contact.html',enabled:true}];
const HOME_BASE=[{id:'hero',label:'首頁首屏／輪播',kind:'builtin',enabled:true},{id:'credibility',label:'公司資訊列',kind:'builtin',enabled:false},{id:'service',label:'服務快速導覽',kind:'builtin',enabled:true},{id:'brands',label:'代理與經銷品牌',kind:'builtin',enabled:true},{id:'categories',label:'產品與服務分類',kind:'builtin',enabled:true},{id:'featured',label:'代表產品',kind:'builtin',enabled:true},{id:'solutions',label:'系統方案',kind:'builtin',enabled:true},{id:'cases',label:'客戶案例',kind:'builtin',enabled:true},{id:'news',label:'最新消息',kind:'builtin',enabled:true},{id:'cta',label:'底部行動呼籲',kind:'builtin',enabled:true}];
const HOME_SELECTORS={hero:'.hero.v2-home-hero',credibility:'.v5-credibility',brands:'.brand-portfolio',categories:'#homeCategories',featured:'#homeProducts',solutions:'#homeSolutions',cases:'.v5-case-section',news:'#homeNews',cta:'.cta-band'};const baseHref=v=>String(v||'').split('?')[0].split('#')[0];
function legacyHome(d){const s=d.siteDisplay||{},m={credibility:s.showCredibility===true,brands:s.showBrandPortfolio!==false,service:s.showServiceStrip!==false,categories:s.showCategories!==false,featured:s.showFeaturedProducts!==false,solutions:s.showSolutions!==false,cases:s.showCases!==false,news:s.showNews!==false,cta:s.showCta!==false};return HOME_BASE.map(x=>({...x,enabled:x.id==='hero'?true:(m[x.id]??x.enabled)}))}
function config(){const d=window.FBStore?.getData?.()||{},f=d.siteDisplay?.frontFeatures||{};return{site:d.site||{},categories:d.categories||[],navItems:Array.isArray(f.navItems)?f.navItems:DEFAULT_NAV,quickActions:Array.isArray(f.quickActions)?f.quickActions:DEFAULT_QUICK,mobileQuickEnabled:f.mobileQuickEnabled!==false,showFloating:d.siteDisplay?.showFloatingContact!==false,consult:Object.assign({label:'免費諮詢',url:'contact.html'},f.consult||{}),footerProducts:Array.isArray(f.footerProducts)?f.footerProducts:DEFAULT_FOOTER_PRODUCTS,footerSupport:Array.isArray(f.footerSupport)?f.footerSupport:DEFAULT_FOOTER_SUPPORT,footerProductTitle:f.footerProductTitle||'產品服務',footerSupportTitle:f.footerSupportTitle||'支援資源',homeSections:Array.isArray(f.homeSections)?f.homeSections:legacyHome(d)}}
function topAnchor(node){return node?.matches?.('a')?node:node?.querySelector?.(':scope > a')}function setTopLabel(node,label,url){const a=topAnchor(node);if(!a)return node;a.href=url||'#';const caret=a.querySelector('.nav-drop-caret');if(caret){[...a.childNodes].filter(n=>n.nodeType===3).forEach(n=>n.remove());a.insertBefore(document.createTextNode((label||'未命名')+' '),caret)}else a.textContent=label||'未命名';return node}
function renderNav(c){const desktop=document.querySelector('.desktop-nav'),mobile=document.querySelector('.drawer-links');if(desktop){const rich=new Map;[...desktop.children].forEach(n=>{const a=topAnchor(n);if(a)rich.set(baseHref(a.getAttribute('href')),n.cloneNode(true))});desktop.innerHTML='';c.navItems.filter(x=>x.enabled!==false&&x.desktop!==false).forEach(x=>{const node=rich.get(baseHref(x.url))?.cloneNode(true);if(node)desktop.appendChild(setTopLabel(node,x.label,x.url));else{const a=document.createElement('a');a.href=x.url||'#';a.textContent=x.label||'未命名';desktop.appendChild(a)}})}if(mobile){const rich=new Map;[...mobile.children].forEach(n=>{if(n.matches('details')){const all=n.querySelector('.mobile-nav-all');if(all)rich.set(baseHref(all.getAttribute('href')),n.cloneNode(true))}else if(n.matches('a'))rich.set(baseHref(n.getAttribute('href')),n.cloneNode(true))});mobile.innerHTML='<a href="index.html">首頁</a>';c.navItems.filter(x=>x.enabled!==false&&x.mobile!==false).forEach(x=>{const node=rich.get(baseHref(x.url))?.cloneNode(true);if(node?.matches('details')){const sum=node.querySelector('summary span:first-child'),all=node.querySelector('.mobile-nav-all');if(sum)sum.textContent=x.label||'未命名';if(all){all.href=x.url||'#';all.textContent='查看全部 '+(x.label||'')}mobile.appendChild(node)}else{const a=node?.matches?.('a')?node:document.createElement('a');a.href=x.url||'#';a.textContent=x.label||'未命名';mobile.appendChild(a)}})}}
function external(a,url){if(/^https?:/i.test(url||'')){a.target='_blank';a.rel='noopener'}}function phoneLinks(c,cls=''){return(c.site.phones||[]).map(p=>{const a=document.createElement('a');a.className=cls;a.href='tel:'+String(p.value||'').replace(/[^0-9+]/g,'');const s=document.createElement('span');s.textContent=(p.label||'')+'辦公室';const b=document.createElement('b');b.textContent=p.value||'';a.append(s,b);return a})}function quickContent(el,icon,label,labelTag='small'){const b=document.createElement('b');b.textContent=icon||'•';const s=document.createElement(labelTag);s.textContent=label||'';el.append(b,s)}
function renderQuick(c){if(window.__fbQuickContactAuthority||document.querySelector('.quick-contact'))return;document.querySelectorAll('.mobile-contact-bar,.mobile-contact-phone').forEach(x=>x.remove());let rail=document.querySelector('.quick-contact');if(!rail){rail=document.createElement('aside');rail.className='quick-contact';document.body.appendChild(rail)}rail.innerHTML='';rail.style.display=c.showFloating?'':'none';c.quickActions.filter(x=>x.enabled!==false&&x.desktop!==false).forEach(x=>{const item=document.createElement('div');item.className='quick-contact-item';if(x.kind==='phones'){const btn=document.createElement('button');btn.type='button';btn.className='quick-contact-btn';quickContent(btn,x.icon||'☎',x.label||'電話');const p=document.createElement('div');p.className='quick-phone-panel';const t=document.createElement('strong');t.textContent='電話聯絡';p.appendChild(t);phoneLinks(c,'quick-phone-link').forEach(a=>p.appendChild(a));item.append(btn,p);btn.onclick=e=>{e.stopPropagation();item.classList.toggle('is-open')}}else{const a=document.createElement('a');a.className='quick-contact-btn';a.href=x.url||'#';external(a,x.url);quickContent(a,x.icon,x.label);item.appendChild(a)}rail.appendChild(item)});let mobile=document.getElementById('fbMobileQuick');if(!mobile){mobile=document.createElement('nav');mobile.id='fbMobileQuick';mobile.className='fb-mobile-quick';document.body.appendChild(mobile)}mobile.innerHTML='';mobile.hidden=!c.showFloating||!c.mobileQuickEnabled;c.quickActions.filter(x=>x.enabled!==false&&x.mobile!==false).forEach(x=>{const a=document.createElement('a');if(x.kind==='phones'){const first=(c.site.phones||[])[0];a.href=first?'tel:'+String(first.value||'').replace(/[^0-9+]/g,''):'#'}else{a.href=x.url||'#';external(a,x.url)}quickContent(a,x.icon||(x.kind==='phones'?'☎':'•'),x.label,'span');mobile.appendChild(a)})}
function renderConsult(c){const a=document.querySelector('.header-actions .btn-primary');if(a){a.textContent=c.consult.label||'免費諮詢';a.href=c.consult.url||'contact.html';external(a,c.consult.url)}}function setFooterLinks(box,title,items){if(!box)return;box.innerHTML='';const h=document.createElement('h4');h.textContent=title;box.appendChild(h);items.filter(x=>x.enabled!==false).forEach(x=>{const a=document.createElement('a');a.href=x.url||'#';a.textContent=x.label||'未命名';external(a,x.url);box.appendChild(a)})}function renderFooter(c){const grid=document.querySelector('.site-footer .footer-grid');if(!grid||grid.children.length<4)return;setFooterLinks(grid.children[1],c.footerProductTitle,c.footerProducts);setFooterLinks(grid.children[2],c.footerSupportTitle,c.footerSupport)}
function builtinNode(id){if(id==='service')return document.querySelector('.fb-home-guide')||document.querySelector('.v2-service-strip');const sel=HOME_SELECTORS[id];if(!sel)return null;const n=document.querySelector(sel);return['categories','featured','solutions','news'].includes(id)?n?.closest('.section'):n}function customNode(x){let n=document.querySelector(`[data-fb-home-custom="${CSS.escape(String(x.id||''))}"]`);if(!n){n=document.createElement('section');n.className='section section-white fb-home-custom';n.dataset.fbHomeCustom=String(x.id||'');n.innerHTML='<div class="container"><div class="section-head"><div><span class="eyebrow">CUSTOM CONTENT</span><h2></h2></div><p></p></div><div class="fb-home-custom-action"><a class="btn btn-primary"></a></div></div>'}const h=n.querySelector('h2'),p=n.querySelector('.section-head>p'),a=n.querySelector('a');if(h)h.textContent=x.title||x.label||'自訂內容';if(p)p.textContent=x.text||'';if(a){a.textContent=x.buttonLabel||'了解更多';a.href=x.url||'#';a.style.display=x.buttonLabel&&x.url?'':'none';external(a,x.url)}return n}function renderHome(c){if(document.body.dataset.page!=='home')return;const main=document.querySelector('main');if(!main)return;const keep=new Set(c.homeSections.filter(x=>x.kind==='custom').map(x=>String(x.id)));document.querySelectorAll('[data-fb-home-custom]').forEach(n=>{if(!keep.has(n.dataset.fbHomeCustom))n.remove()});const desired=[];c.homeSections.forEach(x=>{const n=x.kind==='custom'?customNode(x):builtinNode(x.id);if(!n)return;n.style.display=x.enabled===false?'none':'';desired.push(n)});const current=[...main.children].filter(n=>desired.includes(n));const sameOrder=current.length===desired.length&&desired.every((n,i)=>current[i]===n);if(!sameOrder){const fragment=document.createDocumentFragment();desired.forEach(n=>fragment.appendChild(n));main.appendChild(fragment)}}
function categoryId(a){try{return new URL(a.href,location.href).searchParams.get('category')||''}catch{return''}}function applyCategoryVisibility(c){const hidden=new Set(c.categories.filter(x=>x.visible===false).map(x=>String(x.id)));const selectors=['#homeCategories a.category-card','.mega-menu a[href*="category="]','.mobile-nav-sub a[href*="category="]','#categoryTabs a[href*="category="]'];document.querySelectorAll(selectors.join(',')).forEach(a=>{a.style.display=hidden.has(categoryId(a))?'none':''})}
function style(){if(document.getElementById('fbFrontFeatureStyle'))return;const s=document.createElement('style');s.id='fbFrontFeatureStyle';s.textContent='.quick-contact-btn b{font-size:14px;line-height:1}.quick-contact-btn small{font-size:9px;line-height:1.1}.fb-home-custom .fb-home-custom-action{margin-top:16px}.fb-mobile-quick{display:none}@media(max-width:780px){.quick-contact{display:none!important}.fb-mobile-quick:not([hidden]){position:fixed;left:10px;right:10px;bottom:max(10px,env(safe-area-inset-bottom));z-index:92;display:grid;grid-auto-flow:column;grid-auto-columns:1fr;border:1px solid #d9e3e8;border-radius:14px;background:rgba(255,255,255,.98);box-shadow:0 10px 30px rgba(17,43,67,.16);overflow:hidden;backdrop-filter:blur(10px)}.fb-mobile-quick a{display:grid;place-items:center;gap:2px;min-height:54px;padding:5px;text-decoration:none;color:#26485c;font-size:9px;font-weight:800;border-right:1px solid #e7edef}.fb-mobile-quick a:last-child{border-right:0}.fb-mobile-quick a b{color:#148da7;font-size:13px}.site-footer{padding-bottom:74px}}';document.head.appendChild(s)}
function apply(){if(!window.FBStore)return false;style();const c=config();renderNav(c);renderQuick(c);renderConsult(c);renderFooter(c);renderHome(c);applyCategoryVisibility(c);return true}
function boot(){if(apply())return;setTimeout(boot,80)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
window.addEventListener('farbeyound:datachange',apply);
document.addEventListener('click',e=>{document.querySelectorAll('.quick-contact-item.is-open').forEach(x=>{if(!x.contains(e.target))x.classList.remove('is-open')})});
window.FBFrontFeatures={apply,defaults:{navItems:DEFAULT_NAV,quickActions:DEFAULT_QUICK,footerProducts:DEFAULT_FOOTER_PRODUCTS,footerSupport:DEFAULT_FOOTER_SUPPORT,homeSections:HOME_BASE}}})();

/* ===== assets/js/public-managed-content.js ===== */
(()=>{'use strict';if(window.__fbPublicManagedContent)return;window.__fbPublicManagedContent=true;const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];const NEWS_SLUG={'2026年度萬里資訊員工旅遊公告':'travel-2026','2026 年度萬里資訊員工旅遊公告':'travel-2026','原物料價格調整公告':'material-price','共用印表機 0x0000011b／0x00000709 錯誤處理':'printer-share-error','解決辦法-無法使用共用印表機0x0000011b與0x00000709等錯誤':'printer-share-error','Zebra ZT411 / ZT421：多功能及穩定性佳':'zt411-news','Zebra ZT411 / ZT421 標籤列印機 ，多功能及穩定性佳':'zt411-news','Zebra ZT610 / ZT620：堅固耐用及卓越性能':'zt610-news','Zebra ZT610 / ZT620 工業型標籤列印機 堅固耐用及卓越的性能':'zt610-news'};function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n}function visible(list){return(list||[]).filter(x=>x?.published!==false)}function newsHref(n){const slug=n.slug||NEWS_SLUG[String(n.title||'').trim()];return slug?'news-detail.html?id='+encodeURIComponent(slug):'news.html'}
function categoryId(href){try{return new URL(href||'',location.href).searchParams.get('category')||''}catch{return''}}function categories(d){const allowed=new Set((d.categories||[]).filter(x=>x.visible!==false).map(x=>String(x.id)));$$('#homeCategories .category-card').forEach(a=>{a.style.display=allowed.has(categoryId(a.getAttribute('href'))) ? '' : 'none'});$$('#categoryTabs .filter-chip').forEach(a=>{const id=categoryId(a.getAttribute('href'));a.style.display=!id||allowed.has(id)?'':'none'})}
function contactOptions(d){if(document.body.dataset.page!=='contact')return;const select=$('#subject');if(!select)return;const requested=new URLSearchParams(location.search).get('item')||select.value||'',labels=[...(d.categories||[]).filter(x=>x.visible!==false).map(x=>x.name).filter(Boolean),...visible(d.solutions).map(x=>x.name).filter(Boolean),'其他需求'];select.innerHTML='';const first=document.createElement('option');first.value='';first.textContent='請選擇洽詢項目';select.appendChild(first);[...new Set(labels)].forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;select.appendChild(o)});if(requested){if(![...select.options].some(o=>o.value===requested)){const o=document.createElement('option');o.value=requested;o.textContent=requested;select.appendChild(o)}select.value=requested}}
function homeNews(d){const box=$('#homeNews');if(!box)return;box.innerHTML='';visible(d.news).slice(0,4).forEach((n,i)=>{const a=el('a','news-row');a.href=newsHref(n);const date=el('div','news-date'),day=el('b','',String(n.date||'').slice(8)),month=el('span','',String(n.date||'').slice(0,7).replace('-',' / '));date.append(day,month);const copy=el('div','news-copy'),tags=el('div'),tag=el('span','tag',n.type||'消息');tags.appendChild(tag);if(i===0)tags.appendChild(el('span','tag tag-new','NEW'));copy.append(tags,el('h3','',n.title||''),el('p','',n.excerpt||''));a.append(date,copy,el('span','','→'));box.appendChild(a)})}
function homeCases(d){const box=$('.v5-case-grid');if(!box)return;box.innerHTML='';visible(d.cases).slice(0,4).forEach((c,i)=>{const a=el('a','v5-case-card');a.href='cases.html';a.append(el('span','v5-case-no',String(i+1).padStart(2,'0')),el('small','',c.system||'CASE'),el('h3','',c.name||''),el('p','',c.desc||c.system||''),el('span','v5-case-link','查看案例 →'));box.appendChild(a)})}
function homeSolutions(d){const allowed=new Set(visible(d.solutions).map(x=>String(x.id)));$$('#homeSolutions .solution-card').forEach(a=>{let id='';try{id=decodeURIComponent((a.getAttribute('href')||'').split('#')[1]||'')}catch{}a.style.display=allowed.has(id)?'':'none'})}
function newsPage(d){if(document.body.dataset.page!=='news')return;const filters=$('#newsFilters'),list=$('#newsList');if(!filters||!list)return;const all=visible(d.news),types=['全部',...new Set(all.map(n=>n.type).filter(Boolean))];let active='全部';function draw(){list.innerHTML='';all.filter(n=>active==='全部'||n.type===active).forEach((n,i)=>{const card=el('article','news-card'),date=el('div','news-card-date');date.append(el('b','',String(n.date||'').slice(8)),el('span','',String(n.date||'').slice(0,7).replace('-',' / ')));const body=el('div'),tagbox=el('div');tagbox.appendChild(el('span','tag',n.type||'消息'));if(i===0&&active==='全部')tagbox.appendChild(el('span','tag tag-new','NEW'));body.append(tagbox,el('h2','',n.title||''),el('p','',n.excerpt||''));const link=el('a','text-link','閱讀內容 →');link.href=newsHref(n);body.appendChild(link);card.append(date,body);list.appendChild(card)})}filters.innerHTML='';types.forEach(t=>{const b=el('button','filter-chip'+(t===active?' active':''),t);b.type='button';b.onclick=()=>{active=t;$$('button',filters).forEach(x=>x.classList.toggle('active',x===b));draw()};filters.appendChild(b)});draw()}
function newsDetail(d){if(document.body.dataset.page!=='news-detail')return;const slug=new URLSearchParams(location.search).get('id')||'',n=visible(d.news).find(x=>(x.slug||NEWS_SLUG[String(x.title||'').trim()])===slug);if(!n)return;document.title=(n.seoTitle||n.title||'最新消息')+'｜萬里資訊';const type=$('#articleType'),date=$('#articleDate'),title=$('#articleTitle'),lead=$('#articleLead'),body=$('#articleBody');if(type)type.textContent=n.type||'消息';if(date)date.textContent=n.date||'';if(title)title.textContent=n.title||'';if(lead)lead.textContent=n.excerpt||'';if(body){body.innerHTML='';String(n.body||n.excerpt||'').split(/\n{2,}/).filter(Boolean).forEach(t=>body.appendChild(el('p','',t)));const a=el('a','article-back','← 返回最新消息');a.href='news.html';body.appendChild(a)}}
function casesPage(d){if(document.body.dataset.page!=='cases')return;const box=$('#casePageGrid');if(!box)return;box.innerHTML='';visible(d.cases).forEach((c,i)=>{const card=el('article','case-page-card');card.append(el('span','case-num','CASE '+String(i+1).padStart(2,'0')),el('h2','',c.name||''),el('h3','',c.system||''),el('p','',c.desc||'依客戶現場需求進行系統與條碼設備整合。'));const tags=el('div','case-tags');(Array.isArray(c.tags)&&c.tags.length?c.tags:['條碼整合','現場系統','客製流程']).forEach(t=>tags.appendChild(el('span','',t)));card.appendChild(tags);box.appendChild(card)})}
function solutionsPage(d){if(document.body.dataset.page!=='solutions')return;const allowed=new Set(visible(d.solutions).map(x=>String(x.id)));$$('#solutionNav a').forEach(a=>{const id=decodeURIComponent((a.getAttribute('href')||'').replace(/^#/,''));a.style.display=allowed.has(id)?'':'none'});$$('#solutionSections>section[id]').forEach(s=>s.style.display=allowed.has(s.id)?'':'none')}
function apply(){const d=window.FBStore?.getData?.();if(!d)return;categories(d);contactOptions(d);if(document.body.dataset.page==='home'){homeNews(d);homeCases(d);homeSolutions(d)}newsPage(d);newsDetail(d);casesPage(d);solutionsPage(d)}document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,260));window.addEventListener('load',()=>setTimeout(apply,180));window.addEventListener('farbeyound:datachange',()=>setTimeout(apply,120));window.FBManagedContent={apply};})();

/* ===== assets/js/front-brand-control.js ===== */
(()=>{'use strict';if(window.__fbFrontBrandControl)return;window.__fbFrontBrandControl=true;const DEFAULT=[{id:'printers',label:'標籤列印設備',en:'LABEL PRINTERS',items:[{label:'Zebra',url:'products.html?category=printers&brand=Zebra',enabled:true},{label:'Argox',url:'products.html?category=printers&brand=Argox',enabled:true},{label:'TSC',url:'products.html?category=printers&brand=TSC',enabled:true},{label:'GoDEX',url:'products.html?category=printers&brand=GoDEX',enabled:true},{label:'TOSHIBA',url:'products.html?category=printers&brand=TOSHIBA',enabled:true},{label:'SATO',url:'products.html?category=printers&brand=SATO',enabled:true},{label:'Honeywell',url:'products.html?category=printers&brand=Honeywell',enabled:true}]},{id:'scanners',label:'條碼掃描設備',en:'BARCODE SCANNERS',items:[{label:'Fastech',url:'products.html?category=scanners&brand=Fastech',enabled:true},{label:'Zebra',url:'products.html?category=scanners&brand=Zebra',enabled:true},{label:'Honeywell',url:'products.html?category=scanners&brand=Honeywell',enabled:true},{label:'NUMA',url:'products.html?category=scanners&brand=NUMA',enabled:true},{label:'Datalogic',url:'products.html?category=scanners&brand=Datalogic',enabled:true}]}];function cfg(){const d=window.FBStore?.getData?.()||{},x=d.siteDisplay?.brandPortfolio;return{custom:Array.isArray(x?.groups),groups:Array.isArray(x?.groups)?x.groups:DEFAULT}}function external(a,url){if(/^https?:/i.test(url||'')){a.target='_blank';a.rel='noopener'}}function slug(v){return String(v||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}function apply(){if(document.body.dataset.page!=='home')return;const c=cfg();if(!c.custom)return;const root=document.querySelector('.brand-portfolio .container');if(!root)return;root.querySelectorAll('.brand-family').forEach(x=>x.remove());c.groups.filter(g=>g.enabled!==false).forEach(g=>{const fam=document.createElement('div');fam.className='brand-family'+(String(g.id||'').toLowerCase().includes('scanner')?' scanner':'');const label=document.createElement('div');label.className='brand-family-label';label.append(document.createTextNode(g.label||'品牌分類'));const small=document.createElement('small');small.textContent=g.en||'';label.appendChild(small);const marks=document.createElement('div');marks.className='brand-wordmarks';(g.items||[]).filter(x=>x.enabled!==false).forEach(x=>{const a=document.createElement('a');const s=slug(x.label);a.className='brand-wordmark'+(s?' '+s:'');a.href=x.url||'#';a.textContent=x.label||'品牌';external(a,x.url);marks.appendChild(a)});fam.append(label,marks);root.appendChild(fam)})}document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,300));window.addEventListener('load',()=>setTimeout(apply,220));window.addEventListener('farbeyound:datachange',()=>setTimeout(apply,120));window.FBBrandControl={apply,defaults:DEFAULT};})();

/* ===== assets/js/site-content-control.js ===== */
(function(){'use strict';const DEFAULT={seoTitle:'萬里資訊｜條碼設備、自動識別與系統整合',seoDescription:'萬里資訊提供標籤條碼列印機、條碼掃描器、RFID、行動電腦、標籤耗材、維修與智慧製造系統整合服務。',navProducts:'產品資訊',navDownloads:'下載服務',navSolutions:'系統方案',navCases:'客戶案例',navNews:'最新消息',navContact:'聯絡我們',navCompany:'公司資訊',consultText:'免費諮詢',footerIntro:'條碼列印、掃描、RFID、企業行動設備與智慧製造系統整合，協助企業建立穩定且可追蹤的現場作業流程。',homeBrandTitle:'代理與經銷品牌',homeBrandDesc:'多品牌設備選型、耗材供應與技術服務',homeCategoriesTitle:'產品與服務',homeCategoriesDesc:'依設備類型快速進入完整目錄，從硬體、耗材、軟體到維修服務集中查找。',homeFeaturedTitle:'代表產品',homeFeaturedLink:'查看完整產品目錄 →',homeSolutionsTitle:'系統方案',homeSolutionsDesc:'依生產、倉儲、SMT 防錯與條碼應用需求，提供可與現場流程整合的系統方案。',homeCasesTitle:'客戶案例',homeCasesLink:'查看所有案例 →',homeNewsTitle:'最新消息',homeNewsLink:'查看所有消息 →',service1Title:'設備與產品',service1Text:'列印機・掃描器・RFID・行動電腦',service1Url:'products.html',service2Title:'標籤與耗材',service2Text:'標籤貼紙・碳帶・客製代印',service2Url:'products.html?category=labels',service3Title:'維修與技術支援',service3Text:'設備檢測・零件・現場服務',service3Url:'products.html?category=parts',service4Title:'系統整合',service4Text:'SFIS・WMS・SMT・條碼整合',service4Url:'solutions.html'};const cfg=()=>Object.assign({},DEFAULT,(window.FBStore?.getData?.().siteContent||{}));const setText=(el,val)=>{if(el&&val!=null)el.textContent=val};function setMeta(name,content){let m=document.querySelector(`meta[name="${name}"]`);if(!m){m=document.createElement('meta');m.name=name;document.head.appendChild(m)}m.content=content||''}function setAnchorLabel(a,label){if(!a||label==null)return;const elementChildren=[...a.children];if(!elementChildren.length){a.textContent=label;return}const textNodes=[...a.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE);if(textNodes.length){textNodes[0].textContent=label+' ';textNodes.slice(1).forEach(n=>n.textContent='')}else a.insertBefore(document.createTextNode(label+' '),a.firstChild)}
function applyNav(c){const d=window.FBStore?.getData?.()||{},f=d.siteDisplay?.frontFeatures||{};if(!Array.isArray(f.navItems)){const labels={'products.html':c.navProducts,'downloads.html':c.navDownloads,'solutions.html':c.navSolutions,'cases.html':c.navCases,'news.html':c.navNews,'contact.html':c.navContact,'about.html':c.navCompany||'公司資訊'};document.querySelectorAll('.desktop-nav > a,.desktop-nav > .nav-item > a').forEach(a=>{const href=(a.getAttribute('href')||'').split('?')[0].split('#')[0],label=labels[href];if(label)setAnchorLabel(a,label)})}if(!f.consult)setText(document.querySelector('.header-actions .btn-primary'),c.consultText)}
function applyFooter(c){setText(document.querySelector('.footer-brand p'),c.footerIntro)}function applyHome(c){if(document.body.dataset.page!=='home')return;setText(document.querySelector('.brand-portfolio-title h2'),c.homeBrandTitle);setText(document.querySelector('.brand-portfolio-head>p'),c.homeBrandDesc);const cats=document.querySelector('#homeCategories')?.closest('.section');setText(cats?.querySelector('.section-head h2'),c.homeCategoriesTitle);setText(cats?.querySelector('.section-head>p'),c.homeCategoriesDesc);const featured=document.querySelector('#homeProducts')?.closest('.section');setText(featured?.querySelector('.section-head h2'),c.homeFeaturedTitle);setText(featured?.querySelector('.section-head .text-link'),c.homeFeaturedLink);const sols=document.querySelector('#homeSolutions')?.closest('.section');setText(sols?.querySelector('.section-head h2'),c.homeSolutionsTitle);setText(sols?.querySelector('.section-head>p'),c.homeSolutionsDesc);const cases=document.querySelector('.v5-case-section');setText(cases?.querySelector('.section-head h2'),c.homeCasesTitle);setText(cases?.querySelector('.section-head .text-link'),c.homeCasesLink);const news=document.querySelector('#homeNews')?.closest('.section');setText(news?.querySelector('.section-head h2'),c.homeNewsTitle);setText(news?.querySelector('.section-head .text-link'),c.homeNewsLink);const items=[...document.querySelectorAll('.v2-service-strip .v2-service-item')],svc=[[c.service1Title,c.service1Text,c.service1Url],[c.service2Title,c.service2Text,c.service2Url],[c.service3Title,c.service3Text,c.service3Url],[c.service4Title,c.service4Text,c.service4Url]];items.forEach((x,i)=>{setText(x.querySelector('b'),svc[i]?.[0]);setText(x.querySelector('small'),svc[i]?.[1]);if(svc[i]?.[2])x.href=svc[i][2]})}
function apply(){if(!window.FBStore)return false;const c=cfg();if(c.seoTitle)document.title=c.seoTitle;setMeta('description',c.seoDescription);applyNav(c);applyFooter(c);applyHome(c);return true}
function boot(){if(apply())return;setTimeout(boot,80)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
window.addEventListener('farbeyound:datachange',apply)})();

/* ===== assets/js/site-seo.js ===== */
(()=>{'use strict';if(window.__fbSiteSeoReady)return;window.__fbSiteSeoReady=true;const P={home:['index.html','首頁','萬里資訊｜條碼設備、自動識別與系統整合','萬里資訊提供標籤條碼列印機、條碼掃描器、RFID、行動電腦、標籤耗材、維修與智慧製造系統整合服務。'],products:['products.html','產品資訊','條碼設備與產品資訊｜萬里資訊','標籤條碼列印機、條碼掃描器、RFID、行動電腦、標籤耗材、列印軟體、維修零件與配件資訊。'],downloads:['downloads.html','下載服務','下載服務｜驅動程式、工具與產品文件｜萬里資訊','查找條碼列印機、掃描器與相關設備的驅動程式、工具軟體、型錄、手冊與技術文件。'],solutions:['solutions.html','系統方案','系統方案｜SFIS、WMS、SMT 與條碼整合｜萬里資訊','提供 SFIS 生產現場管控、WMS 倉儲管理、SMT 防錯與條碼自動識別等企業系統整合方案。'],cases:['cases.html','客戶案例','客戶案例｜條碼與智慧製造導入實績｜萬里資訊','查看生產現場、倉儲物流、條碼應用與系統整合的客戶案例與導入方向。'],news:['news.html','最新消息','最新消息｜萬里資訊','萬里資訊最新產品、服務、活動、系統與技術資訊。'],about:['about.html','關於我們','關於萬里資訊｜條碼、自動識別與系統整合服務','認識萬里資訊股份有限公司，以及條碼設備、自動識別、耗材、維修與企業系統整合服務。'],locations:['locations.html','服務據點','服務據點｜萬里資訊','萬里資訊服務據點與聯絡資訊，提供條碼設備、耗材、維修與系統整合服務諮詢。'],contact:['contact.html','聯絡我們','聯絡我們｜設備、耗材、維修與系統需求｜萬里資訊','有條碼設備、標籤耗材、設備維修或系統整合需求，歡迎聯絡萬里資訊取得協助。']};const c=(v,n=220)=>String(v||'').replace(/\s+/g,' ').trim().slice(0,n);function m(n,v,p=false){if(v==null)return;let e=document.head.querySelector(`meta[${p?'property':'name'}="${n}"]`);if(!e){e=document.createElement('meta');e.setAttribute(p?'property':'name',n);document.head.appendChild(e)}e.content=String(v)}function l(rel,href,lang=''){let q=`link[rel="${rel}"]${lang?`[hreflang="${lang}"]`:''}`,e=document.head.querySelector(q);if(!e){e=document.createElement('link');e.rel=rel;if(lang)e.hreflang=lang;document.head.appendChild(e)}e.href=href}function abs(v){try{return v?new URL(v,location.href).href:''}catch{return''}}function ld(id,data){let e=document.getElementById(id);if(!e){e=document.createElement('script');e.id=id;e.type='application/ld+json';document.head.appendChild(e)}e.textContent=JSON.stringify(data)}function commonMeta(title,desc,canonical,img,preview,index=true,type='website'){document.title=title;m('description',desc);m('robots',preview?'noindex,nofollow,noarchive':(index?'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1':'noindex,follow'));l('canonical',canonical);l('alternate',canonical,'zh-Hant-TW');l('alternate',canonical,'x-default');m('og:site_name','萬里資訊',true);m('og:locale','zh_TW',true);m('og:type',type,true);m('og:title',title,true);m('og:description',desc,true);m('og:url',canonical,true);if(img)m('og:image',img,true);m('twitter:card',img?'summary_large_image':'summary');m('twitter:title',title);m('twitter:description',desc);if(img)m('twitter:image',img)}function newsDetail(data,preview){const slug=new URLSearchParams(location.search).get('id')||'',titleText=c(document.getElementById('articleTitle')?.textContent,140),lead=c(document.getElementById('articleLead')?.textContent,200),date=c(document.getElementById('articleDate')?.textContent,30),type=c(document.getElementById('articleType')?.textContent,40);if(!slug||!titleText||titleText.includes('讀取消息中'))return false;const title=c(titleText+'｜萬里資訊',80),desc=lead||c(titleText+'｜萬里資訊最新消息',180),u=new URL('news-detail.html',location.href);u.searchParams.set('id',slug);const canonical=u.href,img=abs(data.seo?.defaultOgImage||'assets/images/brand/far-beyound-logo.png');commonMeta(title,desc,canonical,img,preview,true,'article');const home=new URL('index.html',location.href).href,news=new URL('news.html',location.href).href,org={'@type':'Organization',name:data.site?.companyZh||'萬里資訊股份有限公司',url:home};ld('fbArticleStructuredData',{'@context':'https://schema.org','@type':'NewsArticle',headline:titleText,description:desc,datePublished:date||undefined,dateModified:date||undefined,articleSection:type||undefined,mainEntityOfPage:{'@type':'WebPage','@id':canonical},author:org,publisher:org});ld('fbBreadcrumbStructuredData',{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'首頁',item:home},{'@type':'ListItem',position:2,name:'最新消息',item:news},{'@type':'ListItem',position:3,name:titleText,item:canonical}]});return true}function run(){if(!window.FBStore||['product','admin'].includes(document.body?.dataset.page))return;const k=document.body?.dataset.page,data=FBStore.getData()||{},preview=location.hostname==='ykc1117.github.io';if(k==='news-detail'){newsDetail(data,preview);return}const d=P[k];if(!d)return;const cfg=data.seo?.pages?.[k]||{},legacy=data.siteContent||{},title=c(cfg.title||(k==='home'?legacy.seoTitle:'')||d[2],80),desc=c(cfg.description||(k==='home'?legacy.seoDescription:'')||d[3]),u=new URL(d[0],location.href);u.search='';u.hash='';const canonical=u.href,img=abs(cfg.ogImage||data.seo?.defaultOgImage||'assets/images/brand/far-beyound-logo.png');commonMeta(title,desc,canonical,img,preview,cfg.index!==false);const site=data.site||{},home=new URL('index.html',location.href).href;if(k==='home'){const tel=(site.phones||[]).map(x=>x.value).filter(Boolean),same=[];const yt=site.youtube||window.FBSocialLinks?.youtube;if(yt)same.push(yt);ld('fbOrganizationStructuredData',{'@context':'https://schema.org','@type':'Organization','@id':home+'#organization',name:site.companyZh||'萬里資訊股份有限公司',alternateName:site.companyEn||undefined,url:home,logo:abs('assets/images/brand/far-beyound-logo.png'),email:site.email||undefined,telephone:tel[0]||undefined,address:site.address?{'@type':'PostalAddress',streetAddress:site.address,addressCountry:'TW'}:undefined,sameAs:same.length?same:undefined});ld('fbWebsiteStructuredData',{'@context':'https://schema.org','@type':'WebSite','@id':home+'#website',url:home,name:'萬里資訊',inLanguage:'zh-Hant-TW',publisher:{'@id':home+'#organization'}});document.getElementById('fbBreadcrumbStructuredData')?.remove()}else{document.getElementById('fbOrganizationStructuredData')?.remove();document.getElementById('fbWebsiteStructuredData')?.remove();ld('fbBreadcrumbStructuredData',{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'首頁',item:home},{'@type':'ListItem',position:2,name:d[1],item:canonical}]})}}function go(){[0,160,600,1300].forEach(t=>setTimeout(run,t))}document.addEventListener('DOMContentLoaded',go,{once:true});if(document.readyState!=='loading')go();window.addEventListener('farbeyound:datachange',()=>setTimeout(run,80));})();

/* ===== assets/js/site-display-control.js ===== */
(function(){'use strict';const DEFAULT={showCredibility:false,showBrandPortfolio:true,showServiceStrip:true,showCategories:true,showFeaturedProducts:true,showSolutions:true,showCases:true,showNews:true,showCta:true,showHeroTrust:true,showHeaderSearch:true,showHeaderConsult:true,showFloatingContact:true,ctaTitle:'有設備、耗材、維修或系統需求？',ctaText:'提供品牌、型號或使用情境，我們可協助確認適合的產品、耗材與服務方向。',ctaButton:'聯絡萬里資訊',ctaUrl:'contact.html'};const cfg=()=>Object.assign({},DEFAULT,(window.FBStore?.getData?.().siteDisplay||{}));function visible(el,on){if(el)el.style.display=on?'':'none'}function service(on){const guide=document.querySelector('.fb-home-guide'),legacy=document.querySelector('.v2-service-strip');if(guide)visible(guide,on);if(legacy&&!guide)visible(legacy,on)}function loadFeatureManager(){if(document.querySelector('script[data-front-feature-control]'))return;const s=document.createElement('script');s.src='assets/js/front-feature-control.js?v=20260915-1125';s.dataset.frontFeatureControl='1';document.body.appendChild(s)}function apply(){if(!window.FBStore)return false;const c=cfg();if(document.body.dataset.page==='home'){visible(document.querySelector('.v5-credibility'),c.showCredibility);visible(document.querySelector('.brand-portfolio'),c.showBrandPortfolio);service(c.showServiceStrip);visible(document.querySelector('.hero-trust'),c.showHeroTrust);visible(document.querySelector('#homeCategories')?.closest('.section'),c.showCategories);visible(document.querySelector('#homeProducts')?.closest('.section'),c.showFeaturedProducts);visible(document.querySelector('#homeSolutions')?.closest('.section'),c.showSolutions);visible(document.querySelector('.v5-case-section'),c.showCases);visible(document.querySelector('#homeNews')?.closest('.section'),c.showNews);const cta=document.querySelector('.cta-band');visible(cta,c.showCta);if(cta){const h=cta.querySelector('h2'),p=cta.querySelector('p'),a=cta.querySelector('a');if(h)h.textContent=c.ctaTitle;if(p)p.textContent=c.ctaText;if(a){a.textContent=c.ctaButton;a.href=c.ctaUrl||'contact.html'}}}visible(document.querySelector('.header-actions .search-trigger'),c.showHeaderSearch);visible(document.querySelector('.header-actions .btn-primary'),c.showHeaderConsult);loadFeatureManager();return true}function boot(){if(apply())return;setTimeout(boot,80)}document.addEventListener('DOMContentLoaded',boot,{once:true});window.addEventListener('farbeyound:datachange',apply)})();


/* ===== assets/js/public-release-polish.js ===== */
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
    return data?.products?.find?.(p=>String(p.id)===id)||null;
  }

  function polishProductFiles(){
    if(document.body.dataset.page!=='product')return;
    const box=document.getElementById('productFiles');
    if(!box)return;
    const p=currentProduct();
    if(!p)return;
    const files=Array.isArray(p.files)?p.files:[];
    if(!files.length){
      if(box.querySelector('[data-release-empty="1"]'))return;
      box.innerHTML='<div class="empty-state" data-release-empty="1"><b>需要產品文件？</b><span>如需產品型錄、使用手冊或技術文件，歡迎與我們聯絡索取。</span><a class="btn btn-secondary btn-sm" href="contact.html?item='+encodeURIComponent(p.name||'產品文件')+'">聯絡我們</a></div>';
      return;
    }
    const signature=JSON.stringify(files.map(f=>[f?.label||'',f?.type||'',f?.url||'']));
    if(box.dataset.releaseSignature===signature && !box.querySelector('.demo-download'))return;
    box.dataset.releaseSignature=signature;
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
      a.href=slug?('news-detail.html?id='+encodeURIComponent(slug)):'contact.html?item='+encodeURIComponent(title||'消息內容');
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

  let cleaning=false;
  function run(){
    if(cleaning)return;
    cleaning=true;
    try{
      polishProductFiles();
      polishDownloadFallback();
      polishHomeNews();
      polishNewsList();
      cleanCustomerFacingCopy();
    }finally{
      cleaning=false;
    }
  }

  function observeDynamic(){
    const configs=[
      ['newsList',()=>document.querySelector('#newsList .demo-news')&&run()],
      ['downloadList',()=>document.querySelector('#downloadList .demo-download')&&run()],
      ['productFiles',run],
      ['homeNews',run]
    ];
    configs.forEach(([id,fn])=>{
      const el=document.getElementById(id);
      if(!el||el.dataset.releaseObserved==='1')return;
      el.dataset.releaseObserved='1';
      let queued=false;
      const observer=new MutationObserver(()=>{
        if(queued||cleaning)return;
        queued=true;
        setTimeout(()=>{queued=false;fn();},0);
      });
      observer.observe(el,{childList:true,subtree:true});
    });
  }

  function boot(){run();observeDynamic();setTimeout(()=>{run();observeDynamic();},80);setTimeout(()=>{run();observeDynamic();},450);}
  document.addEventListener('DOMContentLoaded',boot,{once:true});
  window.addEventListener('load',()=>setTimeout(boot,120));
  window.addEventListener('farbeyound:datachange',()=>setTimeout(boot,120));
  if(document.readyState!=='loading')setTimeout(boot,0);
})();


/* ===== assets/js/brand-home-guard.js ===== */
(()=>{'use strict';
if(window.__fbBrandHomeGuard)return;
window.__fbBrandHomeGuard=true;
const HOME='https://ykc1117.github.io/far-beyound-website/';
function apply(){
  document.querySelectorAll('#siteHeader a.brand,#siteFooter a.brand').forEach(a=>{
    a.setAttribute('href',HOME);
    a.setAttribute('data-home-brand','1');
  });
  if(!document.getElementById('fbBrandHomeGuardStyle')){
    const s=document.createElement('style');
    s.id='fbBrandHomeGuardStyle';
    s.textContent='.site-header .brand{position:relative;z-index:60!important;pointer-events:auto!important}.site-header .brand>*{pointer-events:none!important}';
    document.head.appendChild(s);
  }
}
document.addEventListener('click',e=>{
  const a=e.target.closest?.('a[data-home-brand]');
  if(!a)return;
  e.preventDefault();
  e.stopImmediatePropagation();
  window.location.assign(HOME);
},true);
window.addEventListener('DOMContentLoaded',()=>setTimeout(apply,0));
window.addEventListener('load',()=>setTimeout(apply,0));
window.addEventListener('farbeyound:datachange',()=>setTimeout(apply,0));
})();


/* ===== assets/js/quick-contact-normalize.js ===== */
/* Canonical public quick-contact styling. */
(function(){'use strict';if(window.__fbQuickContactNormalize)return;window.__fbQuickContactNormalize=true;function install(){let style=document.getElementById('fbQuickContactNormalize');if(!style){style=document.createElement('style');style.id='fbQuickContactNormalize';document.head.appendChild(style)}style.textContent=`@media(min-width:981px){.quick-contact{position:fixed!important;right:0!important;top:52%!important;z-index:88!important;transform:translateY(-50%)!important;display:grid!important;grid-template-columns:1fr!important;gap:1px!important;padding:0!important;border:0!important;border-radius:10px 0 0 10px!important;overflow:hidden!important;background:transparent!important;box-shadow:0 10px 24px rgba(20,44,66,.16)!important}.quick-contact-item{margin:0!important;padding:0!important;border:0!important}.quick-contact-btn{width:58px!important;min-width:58px!important;height:64px!important;min-height:64px!important;margin:0!important;padding:0!important;border:0!important;border-left:1px solid rgba(255,255,255,.24)!important;border-radius:0!important;color:#fff!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important;box-shadow:none!important}.quick-contact-item:nth-child(1) .quick-contact-btn{background:#17324d!important}.quick-contact-item:nth-child(2) .quick-contact-btn{background:#06C755!important}.quick-contact-item:nth-child(3) .quick-contact-btn{background:#F28C28!important}.quick-contact-btn:hover,.quick-contact-item.is-open>.quick-contact-btn{filter:brightness(.92)!important}.quick-contact-btn svg{width:21px!important;height:21px!important;fill:none!important;stroke:#fff!important;stroke-width:1.7!important;stroke-linecap:round!important;stroke-linejoin:round!important}.quick-contact-btn span{font-size:10px!important;line-height:1.1!important;font-weight:700!important;color:#fff!important}.quick-contact .quick-phone-panel{right:67px!important;top:0!important}}@media(max-width:980px){.quick-contact{display:none!important}.mobile-contact-bar{position:fixed!important;left:0!important;right:0!important;bottom:0!important;z-index:90!important;display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:0!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:0 -8px 26px rgba(18,46,70,.10)!important;padding:0 0 env(safe-area-inset-bottom)!important;overflow:hidden!important}.mobile-contact-bar a,.mobile-contact-bar button{min-height:58px!important;height:58px!important;margin:0!important;padding:0!important;border:0!important;border-right:1px solid rgba(255,255,255,.25)!important;border-radius:0!important;color:#fff!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;font-size:11px!important;font-weight:700!important}.mobile-contact-bar a:nth-child(1),.mobile-contact-bar button:nth-child(1){background:#17324d!important}.mobile-contact-bar a:nth-child(2),.mobile-contact-bar button:nth-child(2){background:#06C755!important}.mobile-contact-bar a:nth-child(3),.mobile-contact-bar button:nth-child(3){background:#F28C28!important}.mobile-contact-bar a:last-child{border-right:0!important}.mobile-contact-bar svg{width:19px!important;height:19px!important;fill:none!important;stroke:#fff!important;stroke-width:1.7!important;stroke-linecap:round!important;stroke-linejoin:round!important}.mobile-contact-phone{left:14px!important;right:14px!important;bottom:calc(70px + env(safe-area-inset-bottom))!important;border-radius:10px!important}body:not([data-page="admin"]){padding-bottom:calc(58px + env(safe-area-inset-bottom))!important}}`;}function boot(){install()}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();window.addEventListener('load',install,{once:true})})();


/* ===== assets/js/quick-contact-authority.js ===== */
/* Public quick-contact authority layer: exactly three stable actions on desktop/mobile. */
(()=>{
  'use strict';
  if(window.__fbQuickContactAuthority)return;
  window.__fbQuickContactAuthority=true;

  const PHONE_SVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.1 3.8 9.7 3c.7-.2 1.4.2 1.7.8l1.2 2.8c.3.6.1 1.3-.1 1.7l-1.5 1.2a14 14 0 0 0 3.8 3.8l1.2-1.5c.4-.5 1.1-.7 1.7-.4l2.8 1.2c.7.3 1 .9.8 1.7l-.8 2.6c-.3.9-1.1 1.5-2 1.5C11 18.4 5.6 13 5.6 6c0-1 .6-1.9 1.5-2.2Z"/></svg>';
  const LINE_SVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 11.1c0-4.1-4.1-7.4-9.1-7.4s-9.1 3.3-9.1 7.4c0 3.7 3.2 6.8 7.6 7.3.3.1.7.2.8.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1.1 1 .6s5.3-3.1 7.2-5.3a6.7 6.7 0 0 0 1.7-5Z"/><path d="M6.8 9v4h2.4M10 9v4M11.4 13V9l2.7 4V9M18.1 9h-2.7v4h2.7M15.4 11h2.3" class="line-detail"/></svg>';
  const MAIL_SVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6.5h16v11H4z"/><path d="m4.8 7.3 7.2 5.5 7.2-5.5"/></svg>';

  const fallbackPhones=[
    {label:'新北',value:'02-82217759'},
    {label:'台南',value:'06-2360139'}
  ];

  function site(){return window.FBStore?.getData?.()?.site||{}}
  function phones(){
    const list=site().phones;
    return Array.isArray(list)&&list.length?list:fallbackPhones;
  }
  function lineUrl(){
    const url=String(site().line||'').trim();
    return /^https:\/\//i.test(url)?url:'https://line.me/R/ti/p/@453haosc';
  }
  function tel(v){return String(v||'').replace(/[^0-9+]/g,'')}

  function installStyle(){
    if(document.getElementById('fbQuickContactAuthorityStyle'))return;
    const s=document.createElement('style');
    s.id='fbQuickContactAuthorityStyle';
    s.textContent=`
      @media(min-width:981px){
        .quick-contact{position:fixed!important;right:0!important;top:52%!important;z-index:88!important;transform:translateY(-50%)!important;display:grid!important;grid-template-columns:58px!important;gap:1px!important;width:58px!important;background:transparent!important;border:0!important;border-radius:10px 0 0 10px!important;overflow:visible!important;box-shadow:0 10px 24px rgba(20,44,66,.16)!important}
        .quick-contact .quick-contact-item{position:relative!important;margin:0!important;padding:0!important;border:0!important;width:58px!important;background:transparent!important}
        .quick-contact .quick-contact-btn{width:58px!important;min-width:58px!important;height:64px!important;min-height:64px!important;margin:0!important;padding:0!important;border:0!important;border-left:1px solid rgba(255,255,255,.24)!important;border-radius:0!important;color:#fff!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important;box-shadow:none!important;transform:none!important;font:inherit!important;text-decoration:none!important;cursor:pointer!important}
        .quick-contact .quick-contact-item:first-child .quick-contact-btn{border-radius:10px 0 0 0!important}
        .quick-contact .quick-contact-item:last-child .quick-contact-btn{border-radius:0 0 0 10px!important}
        .quick-contact .quick-contact-item[data-action="phone"] .quick-contact-btn{background:#17324d!important}
        .quick-contact .quick-contact-item[data-action="line"] .quick-contact-btn{background:#06C755!important}
        .quick-contact .quick-contact-item[data-action="inquiry"] .quick-contact-btn{background:#F28C28!important}
        .quick-contact .quick-contact-btn:hover,.quick-contact .quick-contact-item.is-open>.quick-contact-btn{filter:brightness(.92)!important}
        .quick-contact .quick-contact-btn:focus-visible{outline:2px solid #fff!important;outline-offset:-4px!important}
        .quick-contact .quick-contact-btn svg{width:21px!important;height:21px!important;fill:none!important;stroke:#fff!important;stroke-width:1.7!important;stroke-linecap:round!important;stroke-linejoin:round!important;flex:none!important}
        .quick-contact .quick-contact-btn span{font-size:10px!important;line-height:1.1!important;font-weight:700!important;letter-spacing:.03em!important;color:#fff!important}
        .quick-contact .quick-phone-panel{position:absolute!important;right:67px!important;top:0!important;width:226px!important;background:#fff!important;border:1px solid #dce4e9!important;border-radius:8px!important;padding:10px!important;box-shadow:0 18px 45px rgba(16,42,67,.16)!important;opacity:0!important;visibility:hidden!important;transform:translateX(8px)!important;transition:opacity .16s ease,transform .16s ease,visibility .16s ease!important}
        .quick-contact .quick-contact-item.is-open .quick-phone-panel{opacity:1!important;visibility:visible!important;transform:none!important}
        .quick-contact .quick-phone-panel strong{display:block!important;font-size:13px!important;color:#17324d!important;padding:4px 5px 8px!important}
        .quick-contact .quick-phone-link{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:10px!important;padding:10px 9px!important;border-top:1px solid #edf1f3!important;color:#334e63!important;text-decoration:none!important;background:#fff!important}
        .quick-contact .quick-phone-link span{font-size:11px!important;color:#71808d!important}.quick-contact .quick-phone-link b{font-size:13px!important;color:#17324d!important}
        .fb-mobile-quick{display:none!important}
      }
      @media(max-width:980px){
        .quick-contact{display:none!important}.fb-mobile-quick{display:none!important}
        .mobile-contact-bar{position:fixed!important;left:0!important;right:0!important;bottom:0!important;z-index:90!important;display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:0!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:0 -8px 26px rgba(18,46,70,.10)!important;padding:0 0 env(safe-area-inset-bottom)!important;overflow:visible!important}
        .mobile-contact-bar .mobile-contact-item{min-height:58px!important;height:58px!important;margin:0!important;padding:0!important;border:0!important;border-right:1px solid rgba(255,255,255,.25)!important;border-radius:0!important;color:#fff!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;font:inherit!important;font-size:11px!important;font-weight:700!important;box-shadow:none!important;transform:none!important;text-decoration:none!important;cursor:pointer!important}
        .mobile-contact-bar .mobile-contact-item[data-action="phone"]{background:#17324d!important}
        .mobile-contact-bar .mobile-contact-item[data-action="line"]{background:#06C755!important}
        .mobile-contact-bar .mobile-contact-item[data-action="inquiry"]{background:#F28C28!important}
        .mobile-contact-bar .mobile-contact-item:last-child{border-right:0!important}
        .mobile-contact-bar svg{width:19px!important;height:19px!important;fill:none!important;stroke:#fff!important;stroke-width:1.7!important;stroke-linecap:round!important;stroke-linejoin:round!important;flex:none!important}.mobile-contact-bar .line-detail{stroke-width:1.25!important}
        .mobile-contact-phone{position:fixed!important;left:14px!important;right:14px!important;bottom:calc(70px + env(safe-area-inset-bottom))!important;z-index:91!important;background:#fff!important;border:1px solid #dce4e9!important;border-radius:10px!important;padding:8px!important;box-shadow:0 18px 48px rgba(17,43,66,.2)!important;display:none!important}.mobile-contact-phone.is-open{display:block!important}
        .mobile-contact-phone a{display:flex!important;justify-content:space-between!important;align-items:center!important;padding:13px 12px!important;text-decoration:none!important;color:#17324d!important;border-bottom:1px solid #edf1f3!important}.mobile-contact-phone a:last-child{border-bottom:0!important}.mobile-contact-phone span{font-size:12px!important;color:#71808d!important}.mobile-contact-phone b{font-size:14px!important;color:#17324d!important}
        body:not([data-page="admin"]){padding-bottom:calc(58px + env(safe-area-inset-bottom))!important}
      }`;
    document.head.appendChild(s);
  }

  function fillPhonePanel(panel){
    const list=phones();
    const signature=list.map(p=>`${p.label||''}|${p.value||''}`).join(';');
    if(panel.dataset.authorityPhones===signature)return;
    panel.innerHTML='';
    const title=document.createElement('strong');
    title.textContent='電話聯絡';
    panel.appendChild(title);
    list.forEach(p=>{
      const a=document.createElement('a');
      a.className='quick-phone-link';
      a.href='tel:'+tel(p.value);
      const s=document.createElement('span');
      s.textContent=(p.label||'')+'辦公室';
      const b=document.createElement('b');
      b.textContent=String(p.value||'');
      a.append(s,b);
      panel.appendChild(a);
    });
    panel.dataset.authorityPhones=signature;
  }

  function desktopIsCanonical(rail){
    const items=[...rail.children].filter(x=>x.classList?.contains('quick-contact-item'));
    return items.length===3&&['phone','line','inquiry'].every((x,i)=>items[i]?.dataset?.action===x);
  }

  function ensureDesktop(){
    if(document.body?.dataset?.page==='admin')return;
    let rail=document.querySelector('.quick-contact');
    if(!rail){
      rail=document.createElement('aside');
      rail.className='quick-contact';
      rail.setAttribute('aria-label','快速聯絡');
      document.body.appendChild(rail);
    }
    if(!desktopIsCanonical(rail)){
      rail.innerHTML=`<div class="quick-contact-item" data-action="phone" data-contact-phone><button type="button" class="quick-contact-btn" aria-expanded="false" aria-label="電話聯絡">${PHONE_SVG}<span>電話</span></button><div class="quick-phone-panel"></div></div><div class="quick-contact-item" data-action="line"><a class="quick-contact-btn" href="${lineUrl()}" target="_blank" rel="noopener" aria-label="LINE 客服">${LINE_SVG}<span>LINE</span></a></div><div class="quick-contact-item" data-action="inquiry"><a class="quick-contact-btn" href="contact.html#inquiryForm" aria-label="線上詢問">${MAIL_SVG}<span>詢問</span></a></div>`;
    }else{
      const line=rail.querySelector('[data-action="line"] a');
      if(line)line.href=lineUrl();
    }
    const phoneItem=rail.querySelector('[data-action="phone"]');
    const phoneBtn=phoneItem?.querySelector('button');
    const panel=phoneItem?.querySelector('.quick-phone-panel');
    if(panel)fillPhonePanel(panel);
    if(phoneItem&&phoneBtn&&!phoneBtn.dataset.authorityBound){
      phoneBtn.dataset.authorityBound='1';
      const close=()=>{phoneItem.classList.remove('is-open');phoneBtn.setAttribute('aria-expanded','false')};
      phoneBtn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const open=!phoneItem.classList.contains('is-open');close();if(open){phoneItem.classList.add('is-open');phoneBtn.setAttribute('aria-expanded','true')}});
      phoneItem.addEventListener('mouseenter',()=>{phoneItem.classList.add('is-open');phoneBtn.setAttribute('aria-expanded','true')});
      phoneItem.addEventListener('mouseleave',close);
    }
  }

  function mobileIsCanonical(bar){
    const items=[...bar.children].filter(x=>x.classList?.contains('mobile-contact-item'));
    return items.length===3&&['phone','line','inquiry'].every((x,i)=>items[i]?.dataset?.action===x);
  }

  function ensureMobile(){
    if(document.body?.dataset?.page==='admin')return;
    document.querySelectorAll('.fb-mobile-quick').forEach(x=>x.remove());
    let bar=document.querySelector('.mobile-contact-bar');
    if(!bar){
      bar=document.createElement('nav');
      bar.className='mobile-contact-bar';
      bar.setAttribute('aria-label','快速聯絡');
      document.body.appendChild(bar);
    }
    if(!mobileIsCanonical(bar)){
      bar.innerHTML=`<button class="mobile-contact-item" data-action="phone" type="button" data-mobile-phone aria-expanded="false">${PHONE_SVG}<span>撥打電話</span></button><a class="mobile-contact-item" data-action="line" href="${lineUrl()}" target="_blank" rel="noopener">${LINE_SVG}<span>LINE 詢問</span></a><a class="mobile-contact-item" data-action="inquiry" href="contact.html#inquiryForm">${MAIL_SVG}<span>線上詢問</span></a>`;
    }else{
      const line=bar.querySelector('[data-action="line"]');
      if(line)line.href=lineUrl();
    }
    let panel=document.querySelector('.mobile-contact-phone');
    if(!panel){
      panel=document.createElement('div');
      panel.className='mobile-contact-phone';
      document.body.appendChild(panel);
    }
    const list=phones();
    const signature=list.map(p=>`${p.label||''}|${p.value||''}`).join(';');
    if(panel.dataset.authorityPhones!==signature){
      panel.innerHTML='';
      list.forEach(p=>{
        const a=document.createElement('a');
        a.href='tel:'+tel(p.value);
        const s=document.createElement('span');
        s.textContent=(p.label||'')+'辦公室';
        const b=document.createElement('b');
        b.textContent=String(p.value||'');
        a.append(s,b);
        panel.appendChild(a);
      });
      panel.dataset.authorityPhones=signature;
    }
    const btn=bar.querySelector('[data-mobile-phone]');
    if(btn&&!btn.dataset.authorityBound){
      btn.dataset.authorityBound='1';
      btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const open=panel.classList.toggle('is-open');btn.setAttribute('aria-expanded',String(open))});
    }
  }

  function isCanonical(){
    if(document.body?.dataset?.page==='admin')return true;
    const rail=document.querySelector('.quick-contact');
    const bar=document.querySelector('.mobile-contact-bar');
    return !!rail&&desktopIsCanonical(rail)&&!!bar&&mobileIsCanonical(bar)&&!document.querySelector('.fb-mobile-quick');
  }

  let applying=false;
  function apply(){
    if(applying||document.body?.dataset?.page==='admin')return;
    applying=true;
    installStyle();
    ensureDesktop();
    ensureMobile();
    applying=false;
  }

  function boot(){
    apply();
    const observer=new MutationObserver(()=>{
      if(!applying&&!isCanonical())apply();
    });
    observer.observe(document.body,{childList:true,subtree:true});
    document.addEventListener('click',e=>{
      document.querySelectorAll('.quick-contact-item.is-open').forEach(x=>{if(!x.contains(e.target)){x.classList.remove('is-open');x.querySelector('button')?.setAttribute('aria-expanded','false')}});
      const panel=document.querySelector('.mobile-contact-phone');
      if(panel?.classList.contains('is-open')&&!panel.contains(e.target)&&!e.target.closest('[data-mobile-phone]')){
        panel.classList.remove('is-open');
        document.querySelector('[data-mobile-phone]')?.setAttribute('aria-expanded','false');
      }
    });
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
  window.addEventListener('farbeyound:datachange',apply);
})();

