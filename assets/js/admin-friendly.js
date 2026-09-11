(function(){
'use strict';
if(window.__fbAdminFriendly)return;window.__fbAdminFriendly=true;
const $=(s,p=document)=>p.querySelector(s);
const LAST_KEY='farbeyoundAdminLastPublishedV1';
let toastTimer=null;
function fmt(v){if(!v)return '尚無紀錄';const d=new Date(v);if(Number.isNaN(d.getTime()))return String(v);return d.toLocaleString('zh-TW',{hour12:false,month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'})}
function ensure(){
  if($('#adminFriendlyStatus'))return;
  const note=$('.admin-usage-note');if(!note)return;
  const box=document.createElement('section');box.id='adminFriendlyStatus';box.className='admin-friendly-status';
  box.innerHTML=`<div class="admin-friendly-main"><div><span class="admin-friendly-kicker">操作狀態</span><strong id="adminFriendlyTitle">可以開始修改</strong><p id="adminFriendlyText">修改完成後按儲存，確認異動內容後就會發布到共用測試網站。</p></div><span id="adminFriendlyLamp" class="admin-friendly-lamp ready">準備完成</span></div><div class="admin-friendly-bottom"><span>最後發布：<b id="adminFriendlyTime">${fmt(localStorage.getItem(LAST_KEY))}</b></span><div><button id="adminFriendlySync" class="btn btn-secondary btn-sm" type="button">重新讀取最新資料</button><a class="btn btn-primary btn-sm" href="index.html" target="_blank">開啟網站確認</a></div></div>`;
  note.insertAdjacentElement('afterend',box);
  $('#adminFriendlySync').addEventListener('click',async()=>{
    const b=$('#adminFriendlySync');b.disabled=true;b.textContent='同步中…';setState('syncing');
    try{await window.FBCloudSync?.pull?.();setState('ready','已重新讀取最新資料')}finally{b.disabled=false;b.textContent='重新讀取最新資料'}
  });
}
function setState(state,message){ensure();const title=$('#adminFriendlyTitle'),text=$('#adminFriendlyText'),lamp=$('#adminFriendlyLamp');if(!title||!text||!lamp)return;
  lamp.className='admin-friendly-lamp '+state;
  if(state==='dirty'){title.textContent='有內容尚未儲存';text.textContent='完成修改後按該區塊的儲存按鈕，系統只會列出真正有變更的內容供你確認。';lamp.textContent='尚未儲存'}
  else if(state==='saving'||state==='syncing'){title.textContent='正在處理';text.textContent=message||'請稍候，系統正在同步網站資料。';lamp.textContent='處理中'}
  else if(state==='saved'){title.textContent='已發布到網站';text.textContent=message||'修改已同步完成，可以按「開啟網站確認」查看結果。';lamp.textContent='已發布'}
  else if(state==='error'){title.textContent='這次沒有成功發布';text.textContent=message||'目前瀏覽器仍保留修改內容，請確認網路或發布密碼後再試一次。';lamp.textContent='需要處理'}
  else{title.textContent='可以開始修改';text.textContent=message||'修改完成後按儲存，確認異動內容後就會發布到共用測試網站。';lamp.textContent='準備完成'}
}
function toast(msg,kind='ok'){
  let t=$('#adminFriendlyToast');if(!t){t=document.createElement('div');t.id='adminFriendlyToast';t.className='admin-friendly-toast';document.body.appendChild(t)}
  t.className='admin-friendly-toast '+kind;t.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),3200)
}
function markDirty(e){if(!e.target?.closest?.('.admin-main,.admin-form-overlay'))return;if(e.target.closest('#adminFriendlyStatus'))return;setState('dirty')}
function style(){if($('#adminFriendlyStyle'))return;const s=document.createElement('style');s.id='adminFriendlyStyle';s.textContent=`.admin-friendly-status{margin:14px 0 18px;background:#fff;border:1px solid #dce8ec;border-radius:14px;box-shadow:0 7px 24px rgba(30,67,82,.06);overflow:hidden}.admin-friendly-main{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:16px 18px}.admin-friendly-kicker{display:block;color:#39869a;font-size:9px;font-weight:900;letter-spacing:.12em;margin-bottom:4px}.admin-friendly-main strong{display:block;color:#24485a;font-size:15px}.admin-friendly-main p{margin:4px 0 0;color:#738793;font-size:11px;line-height:1.55}.admin-friendly-lamp{flex:none;padding:7px 10px;border-radius:999px;font-size:10px;font-weight:900;background:#edf5f7;color:#54717e}.admin-friendly-lamp.saved,.admin-friendly-lamp.ready{background:#ecf8f2;color:#24764e}.admin-friendly-lamp.dirty{background:#fff6e5;color:#9b6a12}.admin-friendly-lamp.saving,.admin-friendly-lamp.syncing{background:#edf4ff;color:#315f9b}.admin-friendly-lamp.error{background:#fff0f0;color:#a53a3a}.admin-friendly-bottom{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 18px;border-top:1px solid #edf2f4;background:#fafcfd;color:#71838e;font-size:10px}.admin-friendly-bottom>div{display:flex;gap:7px}.admin-friendly-bottom b{color:#48606d}.admin-friendly-toast{position:fixed;right:22px;bottom:22px;z-index:10050;max-width:min(380px,calc(100vw - 28px));padding:12px 15px;border-radius:12px;background:#254b5d;color:#fff;font-size:11px;font-weight:800;box-shadow:0 14px 40px rgba(18,48,62,.25);opacity:0;transform:translateY(12px);pointer-events:none;transition:.2s}.admin-friendly-toast.show{opacity:1;transform:none}.admin-friendly-toast.error{background:#9b3b3b}@media(max-width:700px){.admin-friendly-main,.admin-friendly-bottom{align-items:flex-start;flex-direction:column}.admin-friendly-bottom>div{width:100%;flex-wrap:wrap}.admin-friendly-bottom .btn{flex:1}.admin-friendly-toast{left:14px;right:14px;bottom:14px}}`;document.head.appendChild(s)}
function init(){if(document.body.dataset.page!=='admin')return;style();ensure();document.addEventListener('input',markDirty,true);document.addEventListener('change',markDirty,true);
  window.addEventListener('farbeyound:cloudsaved',e=>{const v=e.detail?.updatedAt||new Date().toISOString();localStorage.setItem(LAST_KEY,v);const time=$('#adminFriendlyTime');if(time)time.textContent=fmt(v);setState('saved');toast('發布完成，網站已更新');});
  window.addEventListener('farbeyound:cloudstatus',e=>{const d=e.detail||{};if(d.state==='saving')setState('saving');else if(d.state==='error'){setState('error',d.message);toast('發布失敗，請再確認','error')}else if(d.state==='ready'&&d.message)setState('ready',d.message)});
}
document.addEventListener('DOMContentLoaded',init,{once:true});if(document.readyState!=='loading')init();
})();