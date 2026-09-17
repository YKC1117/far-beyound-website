(function(){
  'use strict';
  const ENDPOINT='https://papqrnqbfauwuipjwwdh.supabase.co/functions/v1/submit-inquiry';

  function toast(msg){
    if(window.FB&&typeof FB.toast==='function')return FB.toast(msg);
    alert(msg);
  }

  function statusBox(){return document.getElementById('formSuccess')}
  function showStatus(text,ok=true){
    const box=statusBox();
    if(!box)return;
    box.textContent=text;
    box.classList.add('show');
    box.dataset.state=ok?'success':'error';
  }
  function normalizeLegacyStatus(){
    const box=statusBox();
    if(!box)return;
    const text=String(box.textContent||'');
    if(text.includes('資料庫')||text.includes('管理後台')||text.includes('後台資料')){
      showStatus('詢問資料已完成留存，我們仍可接續協助處理您的需求。');
    }
  }

  async function submit(form){
    if(!form.checkValidity()){
      form.reportValidity();
      return;
    }
    const fd=new FormData(form);
    if(String(fd.get('website')||'').trim()){
      showStatus('感謝您的詢問。');
      return;
    }
    const btn=form.querySelector('button[type="submit"]');
    if(btn){btn.disabled=true;btn.textContent='送出中…'}
    const payload={};
    for(const [k,v] of fd.entries()) if(typeof v==='string') payload[k]=v.trim();
    payload.source_url=location.href;

    try{
      const r=await fetch(ENDPOINT,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)
      });
      const out=await r.json().catch(()=>({}));
      if(!r.ok||!out.ok){
        const code=out.error||'';
        if(code==='rate_limited')throw new Error('rate');
        if(code==='validation_failed')throw new Error('validation');
        throw new Error('submit');
      }
      form.reset();
      if(out.email_sent===false){
        showStatus(`詢問已成功送出${out.inquiry_id?`（編號 ${out.inquiry_id}）`:''}。通知信目前稍有延遲，但您的需求已完成留存，我們仍可接續協助處理。`);
      }else{
        showStatus(`感謝您的詢問，資料已成功送出${out.inquiry_id?`（編號 ${out.inquiry_id}）`:''}，我們將依需求協助確認後續。`);
      }
      window.dispatchEvent(new CustomEvent('farbeyound:inquiry-sent',{detail:{id:out.inquiry_id||null,emailSent:out.email_sent!==false}}));
    }catch(err){
      const code=String(err&&err.message||'');
      if(code==='rate')showStatus('送出次數較頻繁，請稍後再試；若需求較急可直接來電聯絡。',false);
      else if(code==='validation')showStatus('部分資料格式需要確認，請檢查必填欄位、電話與 E-mail 後再送出。',false);
      else showStatus('目前暫時無法送出，請稍後再試；若需求較急可直接來電或寄信聯絡。',false);
      toast(code==='rate'?'送出次數較頻繁，請稍後再試。':'目前暫時無法送出，請稍後再試。');
    }finally{
      if(btn){btn.disabled=false;btn.textContent='送出詢問'}
    }
  }

  document.addEventListener('submit',function(ev){
    const form=ev.target;
    if(!(form instanceof HTMLFormElement)||form.id!=='contactForm')return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    submit(form);
  },true);
  document.addEventListener('DOMContentLoaded',normalizeLegacyStatus,{once:true});
})();
