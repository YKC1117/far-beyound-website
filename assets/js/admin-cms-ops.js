(()=>{
  'use strict';
  if(document.body?.dataset.page!=='admin'||window.__fbAdminCmsOps)return;
  window.__fbAdminCmsOps=true;

  const $=(selector,parent=document)=>parent.querySelector(selector);
  const $$=(selector,parent=document)=>[...parent.querySelectorAll(selector)];
  const PRODUCT_CHECKS=[
    ['image','圖片'],
    ['intro','產品介紹'],
    ['highlights','產品特色'],
    ['specs','產品規格'],
    ['files','產品文件']
  ];

  function csvCell(value){
    const text=String(value??'').replace(/\r\n?/g,'\n');
    return `"${text.replace(/"/g,'""')}"`;
  }

  function dateTag(){
    const d=new Date();
    const pad=n=>String(n).padStart(2,'0');
    return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}`;
  }

  function downloadCsv(filename,headers,rows){
    const csv=[headers,...rows].map(row=>row.map(csvCell).join(',')).join('\r\n');
    const blob=new Blob(['\ufeff',csv],{type:'text/csv;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download=filename;
    a.hidden=true;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),500);
  }

  function text(cell){
    return String(cell?.innerText||cell?.textContent||'').trim().replace(/\n{3,}/g,'\n\n');
  }

  function visibleInquiryRows(){
    const body=$('#inquiryRows');
    if(!body)return [];
    return $$('tr[data-inquiry-id]',body).filter(row=>!row.hidden);
  }

  function exportInquiries(){
    const rows=visibleInquiryRows();
    if(!rows.length){
      alert('目前沒有可匯出的網站詢問。請先讀取資料，或調整搜尋／篩選條件。');
      return;
    }

    const data=rows.map(row=>{
      const cells=row.cells;
      return [
        row.dataset.inquiryId||'',
        text(cells[0]),
        text(cells[1]),
        text(cells[2]),
        text(cells[3]),
        text(cells[4]),
        text(cells[5])
      ];
    });

    downloadCsv(
      `網站詢問_目前篩選結果_${dateTag()}.csv`,
      ['詢問ID','收到時間','公司／聯絡人','洽詢項目','聯絡方式','Email通知','詢問內容'],
      data
    );
  }

  function productData(){
    return window.FBStore?.getData?.()||{products:[],categories:[]};
  }

  function productMissing(product){
    return PRODUCT_CHECKS.filter(([key])=>{
      const value=product?.[key];
      return Array.isArray(value)?!value.length:!String(value||'').trim();
    }).map(([,label])=>label);
  }

  function visibleProducts(){
    const body=$('#adminProductRows');
    if(!body)return [];
    const data=productData();
    const map=new Map((data.products||[]).map(product=>[String(product.id),product]));
    return [...body.rows]
      .filter(row=>!row.hidden)
      .map(row=>{
        const id=row.dataset.productId||$('.edit-product',row)?.dataset.id||'';
        return map.get(String(id));
      })
      .filter(Boolean);
  }

  function productUrl(id){
    try{
      return new URL(`product.html?id=${encodeURIComponent(id)}`,location.href).href;
    }catch(_){
      return `product.html?id=${encodeURIComponent(id)}`;
    }
  }

  function exportProducts(){
    const products=visibleProducts();
    if(!products.length){
      alert('目前沒有可匯出的產品。請調整產品搜尋／篩選條件後再試。');
      return;
    }

    const data=productData();
    const categories=new Map((data.categories||[]).map(category=>[String(category.id),category.name||category.id]));
    const rows=products.map(product=>[
      product.id||'',
      product.brand||'',
      product.model||'',
      categories.get(String(product.category))||product.category||'',
      product.family||'',
      product.type||'',
      product.name||'',
      product.subtitle||'',
      product.status||'',
      product.published===false?'下架':'上架',
      product.featured&&product.published!==false?'是':'否',
      productMissing(product).join('、'),
      productUrl(product.id||'')
    ]);

    downloadCsv(
      `產品清單_目前篩選結果_${dateTag()}.csv`,
      ['產品ID','品牌','型號','分類','系列','類型','產品名稱','副標題','產品狀態','前台狀態','首頁精選','缺少資料','商品網址'],
      rows
    );
  }

  function updateInquiryExportState(){
    const button=$('#inquiryExportCsv');
    if(!button)return;
    const count=visibleInquiryRows().length;
    button.disabled=!count;
    button.textContent=count?`匯出目前清單 CSV（${count}）`:'匯出目前清單 CSV';
  }

  function mountInquiryExport(){
    if($('#inquiryExportCsv'))return true;
    const toolbar=$('#adminInquiries .admin-product-tools');
    if(!toolbar)return false;
    const button=document.createElement('button');
    button.id='inquiryExportCsv';
    button.className='btn btn-secondary btn-sm admin-csv-export';
    button.type='button';
    button.textContent='匯出目前清單 CSV';
    button.disabled=true;
    button.addEventListener('click',exportInquiries);
    const count=$('#inquiryVisibleCount');
    if(count)toolbar.insertBefore(button,count);
    else toolbar.appendChild(button);
    updateInquiryExportState();
    return true;
  }

  function mountProductExport(){
    if($('#adminProductExportCsv'))return true;
    const toolbar=$('#products .admin-product-tools');
    if(!toolbar)return false;
    const button=document.createElement('button');
    button.id='adminProductExportCsv';
    button.className='btn btn-secondary btn-sm admin-csv-export';
    button.type='button';
    button.textContent='匯出目前產品 CSV';
    button.addEventListener('click',exportProducts);
    toolbar.appendChild(button);
    return true;
  }

  function injectStyle(){
    if($('#adminCmsOpsStyle'))return;
    const style=document.createElement('style');
    style.id='adminCmsOpsStyle';
    style.textContent=`
      .admin-csv-export{white-space:nowrap}
      @media(max-width:820px){
        #adminInquiries .admin-csv-export,
        #products .admin-csv-export{flex:1 1 auto;min-height:40px}
      }
    `;
    document.head.appendChild(style);
  }

  function boot(){
    injectStyle();
    const inquiryReady=mountInquiryExport();
    const productReady=mountProductExport();
    if(inquiryReady&&productReady)return;

    const root=document.querySelector('.admin-main')||document.body;
    if(!root)return;
    const observer=new MutationObserver(()=>{
      const inquiryDone=mountInquiryExport();
      const productDone=mountProductExport();
      if(inquiryDone&&productDone)observer.disconnect();
    });
    observer.observe(root,{childList:true,subtree:true});
    setTimeout(()=>observer.disconnect(),5000);
  }

  window.addEventListener('farbeyound:inquiries-rendered',updateInquiryExportState);
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();
