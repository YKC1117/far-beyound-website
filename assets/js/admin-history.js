(function(){
'use strict';
if(window.__fbAdminHistory)return;window.__fbAdminHistory=true;
const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];
const KEY='farbeyoundAdminHistoryV1',MAX=8;
let restoring=false;
function read(){try{const x=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(x)?x:[]}catch(e){return []}}
function write(v){localStorage.setItem(KEY,JSON.stringify(v.slice(0,MAX)))}
function clone(v){return JSON.parse(JSON.stringify(v))}
function sig(v){try{return JSON.stringify(v)}catch(e){return ''}}
function labelNow(){return new Date().toLocaleString('zh-TW',{hour12:false})}
function toast(t){window.FBPages?.toast?FBPages.toast(t):alert(t)}
function snapshot(reason='自動備份',data){if(!window.FBStore)return;const d=clone(data||FBStore.getData());const s=sig(d),list=read();if(list[0]?.sig===s)return;list.unshift({id:Date.now(),time:labelNow(),reason,sig:s,data:d});write(list);render()}
function wrapStore(){if(!window.FBStore||FBStore.__historyWrapped)return;FBStore.__historyWrapped=true;const save=FBStore.saveData?.bind(FBStore);if(save){FBStore.saveData=function(next){if(!restoring)try{snapshot('修改前自動備份',FBStore.getData())}catch(e){}return save(next)}}}
function restore(id){const item=read().find(x=>String(x.id)===String(id));if(!item)return;if(!confirm(`確定還原到 ${item.time} 的資料？\n\n目前資料會先保留一份還原前備份。`))return;try{snapshot('還原前備份',FBStore.getData());restoring=true;FBStore.saveData(clone(item.data));restoring=false;toast('已還原指定版本');setTimeout(()=>location.reload(),150)}catch(e){restoring=false;alert('還原失敗：'+e.message)}}
function remove(id){write(read().filter(x=>String(x.id)!==String(id)));render()}
function render(){const host=$('#adminHistory');if(!host)return;const list=read();host.innerHTML=`<details class="admin-panel admin-history-panel"><summary><span><b>變更紀錄／還原</b><small>自動保留最近 ${MAX} 個版本，誤改時可以退回上一版。</small></span><span>${list.length} 個版本</span></summary><div class="admin-history-body"><div class="admin-history-actions"><button type="button" id="historySnapshot" class="btn btn-secondary btn-sm">建立手動備份點</button><button type="button" id="historyClear" class="btn btn-secondary btn-sm" ${list.length?'':'disabled'}>清除紀錄</button></div><div class="admin-history-list">${list.length?list.map(x=>`<div class="admin-history-row"><div><b>${x.time}</b><small>${x.reason||'備份'}</small></div><div><button type="button" class="icon-text history-restore" data-id="${x.id}">還原</button><button type="button" class="icon-text danger history-delete" data-id="${x.id}">刪除</button></div></div>`).join(''):'<div class="admin-history-empty">目前還沒有變更紀錄。第一次儲存設定後會自動開始保留。</div>'}</div></div></details>`;
$('#historySnapshot')?.addEventListener('click',()=>{snapshot('手動備份點');toast('已建立備份點')});$('#historyClear')?.addEventListener('click',()=>{if(confirm('確定清除所有後台變更紀錄？這不會刪除目前網站資料。')){localStorage.removeItem(KEY);render()}});$$('.history-restore',host).forEach(b=>b.onclick=()=>restore(b.dataset.id));$$('.history-delete',host).forEach(b=>b.onclick=()=>remove(b.dataset.id));}
function init(){if(document.body.dataset.page!=='admin'||!window.FBStore)return;wrapStore();render()}
document.addEventListener('DOMContentLoaded',()=>setTimeout(init,80));if(document.readyState!=='loading')setTimeout(init,80);
})();