(function(){
'use strict';
if(window.__fbAdminSaveGuard)return;window.__fbAdminSaveGuard=true;
const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];
let pendingForm=null,pendingSubmitter=null;
function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function labelOf(el){
  const direct=el.closest('.field')?.querySelector('label')?.textContent||el.closest('label')?.textContent||el.getAttribute('aria-label')||el.name||el.id||'欄位';
  return direct.replace(/\s+/g,' ').replace(/\*+/g,'').trim();
}
function valueOf(el){
  if(el.type==='checkbox')return el.checked?'開啟／勾選':'關閉／未勾選';
  if(el.type==='radio')return el.checked?(el.closest('label')?.textContent||el.value):'';
  if(el.tagName==='SELECT')return el.options[el.selectedIndex]?.textContent||el.value;
  const v=String(el.value||'').trim();return v.length>140?v.slice(0,140)+'…':v;
}
function collect(form){
  return $$('input,textarea,select',form).filter(el=>{
    if(el.type==='hidden'||el.type==='file'||el.disabled)return false;
    if(el.type==='radio'&&!el.checked)return false;
    return true;
  }).map(el=>({label:labelOf(el),value:valueOf(el)})).filter(x=>x.value!=='');
}
function ensureModal(){
  if($('#adminSaveGuard'))return;
  const wrap=document.createElement('div');wrap.id='adminSaveGuard';wrap.className='admin-save-guard';wrap.setAttribute('aria-hidden','true');
  wrap.innerHTML=`<div class="admin-save-guard-backdrop" data-close-save-guard></div><section class="admin-save-guard-dialog" role="dialog" aria-modal="true" aria-labelledby="adminSaveGuardTitle"><div class="admin-save-guard-head"><div><span>SECOND CONFIRMATION</span><h2 id="adminSaveGuardTitle">修改內容</h2><p>請再次確認以下內容，確定無誤後才會正式儲存。</p></div><button type="button" class="admin-save-guard-x" data-close-save-guard aria-label="關閉">×</button></div><div id="adminSaveGuardSummary" class="admin-save-guard-summary"></div><div class="admin-save-guard-check"><label><input id="adminSaveGuardCheck" type="checkbox"> 我已確認以上修改內容正確</label></div><div class="admin-save-guard-actions"><button type="button" class="btn btn-secondary" data-close-save-guard>返回修改</button><button type="button" id="adminSaveGuardConfirm" class="btn btn-primary" disabled>確認並儲存</button></div></section>`;
  document.body.appendChild(wrap);
  $$('[data-close-save-guard]',wrap).forEach(b=>b.onclick=close);
  $('#adminSaveGuardCheck',wrap).onchange=e=>$('#adminSaveGuardConfirm',wrap).disabled=!e.target.checked;
  $('#adminSaveGuardConfirm',wrap).onclick=confirmSave;
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&wrap.classList.contains('open'))close()});
}
function open(form,submitter){
  ensureModal();pendingForm=form;pendingSubmitter=submitter||null;
  const items=collect(form),box=$('#adminSaveGuardSummary');
  box.innerHTML=items.length?items.map(x=>`<div class="admin-save-guard-row"><b>${esc(x.label)}</b><span>${esc(x.value)}</span></div>`).join(''):'<div class="admin-save-guard-empty">這次沒有可顯示的文字欄位，但仍需要二次確認後才能儲存。</div>';
  $('#adminSaveGuardCheck').checked=false;$('#adminSaveGuardConfirm').disabled=true;
  const modal=$('#adminSaveGuard');modal.classList.add('open');modal.setAttribute('aria-hidden','false');
  setTimeout(()=>$('#adminSaveGuardCheck')?.focus(),30);
}
function close(){const modal=$('#adminSaveGuard');if(modal){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}pendingForm=null;pendingSubmitter=null}
function confirmSave(){
  if(!pendingForm)return;
  const form=pendingForm,submitter=pendingSubmitter;
  form.dataset.saveGuardConfirmed='1';
  close();
  setTimeout(()=>{try{if(typeof form.requestSubmit==='function')form.requestSubmit(submitter&&submitter.form===form?submitter:undefined);else form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}))}finally{setTimeout(()=>delete form.dataset.saveGuardConfirmed,0)}},0);
}
function intercept(e){
  const form=e.target;if(!(form instanceof HTMLFormElement)||!form.closest('.admin-main, .admin-form-overlay'))return;
  if(form.dataset.saveGuardConfirmed==='1'){delete form.dataset.saveGuardConfirmed;return}
  e.preventDefault();e.stopImmediatePropagation();
  open(form,e.submitter||null);
}
function style(){if($('#adminSaveGuardStyle'))return;const s=document.createElement('style');s.id='adminSaveGuardStyle';s.textContent=`.admin-save-guard{position:fixed;inset:0;z-index:9999;display:none}.admin-save-guard.open{display:block}.admin-save-guard-backdrop{position:absolute;inset:0;background:rgba(12,27,38,.56);backdrop-filter:blur(3px)}.admin-save-guard-dialog{position:relative;width:min(640px,calc(100vw - 28px));max-height:min(78vh,720px);margin:8vh auto 0;display:flex;flex-direction:column;background:#fff;border:1px solid #d9e4e8;border-radius:18px;box-shadow:0 26px 80px rgba(9,32,46,.28);overflow:hidden}.admin-save-guard-head{display:flex;justify-content:space-between;gap:16px;padding:20px 22px 15px;border-bottom:1px solid #e8eef1}.admin-save-guard-head span{display:block;margin-bottom:4px;color:#31879a;font-size:9px;font-weight:900;letter-spacing:.12em}.admin-save-guard-head h2{margin:0;color:#203f52;font-size:22px}.admin-save-guard-head p{margin:5px 0 0;color:#738793;font-size:11px;line-height:1.55}.admin-save-guard-x{align-self:flex-start;width:34px;height:34px;border:1px solid #dbe5e9;border-radius:9px;background:#fff;color:#617581;font-size:22px;cursor:pointer}.admin-save-guard-summary{padding:12px 18px;overflow:auto;background:#f8fafb}.admin-save-guard-row{display:grid;grid-template-columns:minmax(120px,180px) 1fr;gap:14px;padding:10px 8px;border-bottom:1px solid #e6ecef}.admin-save-guard-row:last-child{border-bottom:0}.admin-save-guard-row b{color:#405c6d;font-size:10px}.admin-save-guard-row span{color:#263f4f;font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-word}.admin-save-guard-empty{padding:16px;color:#758995;font-size:11px;text-align:center}.admin-save-guard-check{padding:14px 20px 4px;background:#fff}.admin-save-guard-check label{display:flex;align-items:center;gap:9px;color:#405767;font-size:11px;font-weight:800}.admin-save-guard-check input{width:17px;height:17px}.admin-save-guard-actions{display:flex;justify-content:flex-end;gap:9px;padding:14px 20px 20px;background:#fff}.admin-save-guard-actions .btn:disabled{opacity:.45;cursor:not-allowed}@media(max-width:640px){.admin-save-guard-dialog{margin-top:3vh;max-height:92vh}.admin-save-guard-row{grid-template-columns:1fr;gap:4px}.admin-save-guard-actions{flex-direction:column-reverse}.admin-save-guard-actions .btn{width:100%}}`;document.head.appendChild(s)}
function init(){if(document.body.dataset.page!=='admin')return;style();ensureModal();document.addEventListener('submit',intercept,true)}
document.addEventListener('DOMContentLoaded',init,{once:true});if(document.readyState!=='loading')init();
})();