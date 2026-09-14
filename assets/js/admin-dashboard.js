(()=>{
if(document.body.dataset.page!=='admin'||window.__fbAdminDashboard)return;window.__fbAdminDashboard=true;
const loaded=new Set();
function load(src,key){if(loaded.has(key)||document.querySelector('script[data-'+key+']'))return;loaded.add(key);const s=document.createElement('script');s.src=src;s.setAttribute('data-'+key,'1');document.body.appendChild(s)}
function once(){
 if(document.querySelector('.admin-dashboard-root'))return;
 const main=document.querySelector('main')||document.body;
 const root=document.createElement('section');root.className='admin-dashboard-root';root.innerHTML='<div class="admin-dashboard-card"><strong>萬里資訊｜管理後台</strong><span>系統功能已載入</span></div>';
 main.insertBefore(root,main.firstChild);
 const status=document.querySelector('.admin-status');if(status)status.textContent='正式管理介面';
 const stamp=document.querySelector('.admin-version-note');if(stamp)stamp.textContent='後台介面更新：2026/09/14 09:55';
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',once,{once:true});else once();
setTimeout(()=>{load('assets/js/admin-security.js?v=20260914-0955','admin-security');load('assets/js/admin-ui.js?v=20260914-0955','admin-ui')},300);
})();
