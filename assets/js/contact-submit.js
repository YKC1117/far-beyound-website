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
        showStatus(`詢問已送出並安全留存${out.inquiry_id?`（編號 ${out.inquiry_id}）`:''}；Email 通知暫時未送達，公司仍可由後台資料庫查詢。`);
      }else{
        showStatus(`感謝您的詢問，資料已送出並完成留存${out.inquiry_id?`（編號 ${out.inquiry_id}）`:''}。`);
      }
      window.dispatchEvent(new CustomEvent('farbeyound:inquiry-sent',{detail:{id:out.inquiry_id||null,emailSent:out.email_sent!==false}}));
    }catch(err){
      const code=String(err&&err.message||'');
      if(code==='rate')showStatus('送出次數過於頻繁，請稍後再試。',false);
      else if(code==='validation')showStatus('資料格式有誤，請確認必填欄位、電話與 E-mail。',false);
      else showStatus('送出失敗，請稍後再試；若持續發生可直接來電或寄信聯絡。',false);
      toast(code==='rate'?'送出次數過於頻繁，請稍後再試。':'詢問送出失敗，請稍後再試。');
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
})();
