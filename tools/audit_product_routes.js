const fs=require('fs');
const vm=require('vm');
const path=require('path');

const ROOT=path.resolve(__dirname,'..');
const read=rel=>fs.readFileSync(path.join(ROOT,rel),'utf8');
const run=rel=>vm.runInThisContext(read(rel),{filename:rel});

global.window=global;
global.localStorage={getItem(){return null},setItem(){},removeItem(){}};
global.CustomEvent=class CustomEvent{constructor(type,init={}){this.type=type;this.detail=init.detail}};
global.location=new URL('https://example.test/products.html');
global.history={replaceState(){}};
global.document={
  readyState:'loading',
  body:{dataset:{page:'products'}},
  addEventListener(){},
  getElementById(){return null},
  querySelector(){return null},
  querySelectorAll(){return []},
  createElement(){return {style:{},setAttribute(){},appendChild(){},innerHTML:'',textContent:''}},
  head:{appendChild(){}}
};
global.addEventListener=()=>{};
global.dispatchEvent=()=>{};

const mediaText=read('assets/js/media-patch.js');
const orderBlock=(mediaText.match(/const HOME_ORDER=\[([^\]]+)\]/)||[])[1]||'';
const homeOrder=[...orderBlock.matchAll(/'([^']+)'/g)].map(m=>m[1]);
if(!homeOrder.length)throw new Error('Unable to parse HOME_ORDER');

run('assets/js/data.js');
run('assets/js/media-patch.js');
run('assets/js/legacy-catalog.js');
run('assets/js/catalog-merge.js');

const products=window.FBStore.getData().products||[];
const ids=new Set(products.map(p=>String(p.id||'')));
const missingHome=homeOrder.filter(id=>!ids.has(id));

const indexText=read('index.html');
const staticIds=[...indexText.matchAll(/product\.html\?id=([^"'&<\s]+)/g)].map(m=>decodeURIComponent(m[1]));
const missingStatic=[...new Set(staticIds)].filter(id=>!ids.has(id));

if(missingHome.length||missingStatic.length){
  console.error('PRODUCT_ROUTE_AUDIT=FAIL');
  if(missingHome.length)console.error('MISSING_HOME_ORDER='+missingHome.join(','));
  if(missingStatic.length)console.error('MISSING_STATIC_LINKS='+missingStatic.join(','));
  process.exit(1);
}

console.log('PRODUCT_ROUTE_AUDIT=PASS');
console.log('HOME_ORDER_IDS='+homeOrder.length);
console.log('STATIC_PRODUCT_LINK_IDS='+new Set(staticIds).size);
console.log('MERGED_PUBLIC_PRODUCTS='+products.length);
