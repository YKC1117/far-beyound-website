(function () {
  const KEY = 'farbeyoundSiteDataV1';

  const defaultData = {
    site: {
      companyZh: '萬里資訊股份有限公司',
      companyEn: 'FAR-BEYOUND INFORMATION CO.',
      phones: [
        { label: '台北', value: '02-82217759' },
        { label: '台南', value: '06-2360139' }
      ],
      fax: '02-82217238',
      email: 'company@far-beyound.com.tw',
      line: '@453haosc',
      address: '新北市中和區中山路二段351號10樓之1'
    },
    categories: [
      { id: 'printers', name: '標籤條碼列印機', en: 'Label Printers', icon: 'printer', desc: '工業型、商業型、桌上型與攜帶型標籤列印設備。' },
      { id: 'scanners', name: '條碼掃描器', en: 'Barcode Scanners', icon: 'scanner', desc: '手持、無線、超耐用與固定式條碼讀取設備。' },
      { id: 'rfid', name: 'RFID 設備', en: 'RFID', icon: 'rfid', desc: 'RFID 標籤列印、編碼與識別應用設備。' },
      { id: 'mobile', name: '行動電腦', en: 'Mobile Computers', icon: 'mobile', desc: '倉儲、製造與物流現場使用的企業行動終端。' },
      { id: 'labels', name: '標籤貼紙與碳帶', en: 'Labels & Ribbons', icon: 'label', desc: '各式標籤材質、耐溫貼紙與熱轉印碳帶耗材。' },
      { id: 'printing', name: '標籤貼紙代印', en: 'Label Printing', icon: 'box', desc: '少量多樣、條碼、QR Code、水洗標等客製代印。' },
      { id: 'software', name: '標籤軟體', en: 'Label Software', icon: 'software', desc: '標籤編輯、條碼列印與企業系統整合軟體。' },
      { id: 'parts', name: '標籤機維修 / 配件', en: 'Service & Parts', icon: 'wrench', desc: '印字頭、零件、配件、檢測與專業維修服務。' }
    ],
    products: [
      {
        id: 'zebra-zt610-zt620', category: 'printers', brand: 'Zebra', family: 'ZT600 系列', type: '工業型',
        name: 'Zebra ZT610／ZT620', subtitle: '工業型條碼列印機', featured: true, status: '販售中', device: 'printer',
        intro: '面向高負載製造、倉儲與物流環境的工業級標籤列印平台，兼顧可靠度、列印速度與長時間運作。',
        highlights: ['工業級耐用機構，適合高印量環境', 'ZT610 可提供高解析列印選項', '支援多樣連線與企業管理應用'],
        specs: [['列印模式','熱轉印 / 熱感列印'],['應用','製造、倉儲、物流、電子業'],['系列','Zebra ZT600 系列'],['定位','高負載工業型標籤列印']],
        files: [{label:'產品型錄',type:'PDF'},{label:'使用手冊',type:'PDF'}]
      },
      {
        id: 'zebra-zt411-zt421', category: 'printers', brand: 'Zebra', family: 'ZT400 系列', type: '商業型',
        name: 'Zebra ZT411／ZT421', subtitle: '商業型條碼列印機', featured: true, status: '販售中', device: 'printer',
        intro: '兼具多功能、易用性與效能的中高階標籤列印系列，提供多種解析度、列印寬度與連線選項。',
        highlights: ['ZT411 4 吋、ZT421 6 吋列印寬度', '203 / 300 dpi，ZT411 另有 600 dpi 選項', '彩色觸控螢幕與多種通訊介面'],
        specs: [['解析度','203 / 300 dpi；ZT411 可選 600 dpi'],['最大列印寬度','ZT411 104 mm；ZT421 168 mm'],['碳帶標準長度','450 m'],['通訊介面','USB、RS-232、Ethernet、Bluetooth']],
        files: [{label:'產品型錄',type:'PDF'},{label:'使用手冊',type:'PDF'},{label:'快速參考指南',type:'PDF'}]
      },
      {
        id: 'zebra-ds4678-xd', category: 'scanners', brand: 'Zebra', family: 'DS4600 系列', type: '通用型',
        name: 'Zebra DS4678-XD', subtitle: '條碼掃描器', featured: true, status: '販售中', device: 'scanner',
        intro: '適合零售、製造與一般商業場域的高效條碼掃描方案。',
        highlights: ['快速讀取一維 / 二維條碼', '適合櫃台與工作站使用', '企業級穩定度與管理能力'],
        specs: [['類型','一維 / 二維條碼掃描'],['連線','依配置提供有線 / 無線方案'],['系列','Zebra DS4600 系列']],
        files: [{label:'產品型錄',type:'PDF'}]
      },
      {
        id: 'tsc-mh241-mh341-mh641', category: 'printers', brand: 'TSC', family: 'MH 系列', type: '工業型',
        name: 'TSC MH241／MH341／MH641', subtitle: '工業型條碼列印機', featured: true, status: '販售中', device: 'printer',
        intro: '功能完整的工業型條碼列印系列，適合高印量標籤製作與生產現場應用。',
        highlights: ['工業級機構設計', '多種解析度配置', '適合製造與物流工作流程'],
        specs: [['列印模式','熱轉印 / 熱感列印'],['系列','TSC MH 系列'],['應用','製造、倉儲、物流']],
        files: [{label:'產品型錄',type:'PDF'},{label:'使用手冊',type:'PDF'},{label:'快速參考指南',type:'PDF'}]
      },
      {
        id: 'argox-cx3140-pro', category: 'printers', brand: 'Argox', family: 'CX 系列', type: '桌上型',
        name: 'Argox CX-3140 PRO', subtitle: '桌上型條碼列印機', featured: true, status: '販售中', device: 'printer',
        intro: '桌面空間友善的標籤列印設備，適合零售、物流、倉儲與一般商用標示需求。',
        highlights: ['桌上型精巧設計', '支援熱轉印與熱感列印', '適合中小量標籤輸出'],
        specs: [['定位','桌上型'],['品牌','Argox'],['系列','CX 系列']],
        files: [{label:'產品型錄',type:'PDF'}]
      },
      {
        id: 'godex-g500-g530', category: 'printers', brand: 'GoDEX', family: 'G500 系列', type: '桌上型',
        name: 'GoDEX G500+／G530+', subtitle: '桌上型條碼列印機', featured: true, status: '販售中', device: 'printer',
        intro: '兼顧操作便利與實用性的桌上型標籤列印系列，適合倉儲、零售與辦公場景。',
        highlights: ['桌上型標籤列印', '適合日常條碼與標籤作業', 'GoDEX 系列軟體與工具支援'],
        specs: [['定位','桌上型'],['品牌','GoDEX'],['系列','G500 系列']],
        files: [{label:'產品型錄',type:'PDF'}]
      },
      {
        id: 'fastech-ft-yx510', category: 'scanners', brand: 'Fastech', family: 'FT-YX510', type: '通用型',
        name: 'Fastech FT-YX510', subtitle: '有線手持讀碼器', featured: true, status: '販售中', device: 'scanner',
        intro: '一般工作站與櫃台使用的有線手持條碼讀碼器。',
        highlights: ['有線手持式設計', '適合一般條碼讀取作業', '快速部署、操作簡單'],
        specs: [['類型','有線手持讀碼器'],['品牌','Fastech'],['型號','FT-YX510']],
        files: []
      },
      {
        id: 'zebra-zt411-rfid', category: 'rfid', brand: 'Zebra', family: 'ZT400 RFID 系列', type: 'RFID',
        name: 'Zebra ZT411 / ZT421 RFID', subtitle: 'RFID 條碼列印機', featured: false, status: '販售中', device: 'printer',
        intro: '將 RFID 編碼與標籤列印整合於同一設備，適合資產、物流與製造追蹤。',
        highlights: ['RFID 標籤列印與編碼', '企業資產與物流追蹤', '延伸 ZT400 系列操作體驗'],
        specs: [['類型','RFID 標籤列印 / 編碼'],['系列','Zebra ZT400 RFID 系列']],
        files: [{label:'產品型錄',type:'PDF'}]
      },
      {
        id: 'zebra-mobile-computer', category: 'mobile', brand: 'Zebra', family: 'Enterprise Mobile', type: '手持式',
        name: 'Zebra 企業行動電腦', subtitle: '手持式行動電腦', featured: false, status: '系列產品', device: 'mobile',
        intro: '供倉儲、物流、製造現場進行掃描、盤點、資料查詢與行動作業的企業終端。',
        highlights: ['企業級行動作業平台', '整合掃描與資料處理', '適合 WMS / SFIS 工作流程'],
        specs: [['類型','企業手持式行動電腦'],['應用','倉儲、物流、製造']],
        files: []
      },
      {
        id: 'label-materials', category: 'labels', brand: '耗材', family: '標籤耗材', type: '標籤',
        name: '各式標籤貼紙', subtitle: '標籤材質與客製規格', featured: false, status: '客製', device: 'label',
        intro: '提供銅版紙、熱感紙、特多龍、珠光紙、耐高溫標籤與多種客製標籤材質。',
        highlights: ['多種紙材與合成材質', '可依尺寸與使用環境客製', '搭配不同碳帶與列印方式'],
        specs: [['常見材質','銅版紙、熱感紙、特多龍、珠光紙'],['服務','客製尺寸 / 材質 / 印刷']],
        files: []
      }
    ],
    solutions: [
      { id:'sfis', name:'SFIS 生產管控系統', en:'Shop Floor Information System', icon:'factory', desc:'整合生管、製造、品管等現場數據，協助製程防錯、資源追蹤與即時分析。', points:['製程防錯與追溯','生產資訊即時整合','提升作業效率與品質'] },
      { id:'wms', name:'WMS 電子倉庫系統', en:'Warehouse Management System', icon:'warehouse', desc:'涵蓋入庫、出庫、移動、盤點與配料等倉儲流程，提高空間與物料管理效率。', points:['入出庫與盤點管理','先進先出與庫位控管','降低庫存與人工錯誤'] },
      { id:'smt', name:'SMT 防錯料系統', en:'SMT Material Verification', icon:'chip', desc:'針對 SMT 上料流程進行物料核對與記錄，降低混料、錯料風險並保留追溯資訊。', points:['上料防呆驗證','生產資訊留存','強化品質追溯'] }
    ],
    downloads: [
      {brand:'TSC',category:'驅動程式',name:'TSC Seagull Driver 12.4 (BarTender)',version:'12.4.0',updated:'2026-06-03',size:'46.99 MB',note:'Windows 驅動程式，適用 BarTender 標籤軟體。'},
      {brand:'TSC',category:'驅動程式',name:'TSC Linux Driver',version:'64-bit 1.2.13',updated:'2024-06-05',size:'919.85 KB',note:'Linux 64-bit 驅動程式。'},
      {brand:'TSC',category:'驅動程式',name:'TSC macOS Driver',version:'1.29',updated:'2024-06-26',size:'5 MB',note:'macOS 標籤印表機驅動。'},
      {brand:'TSC',category:'標籤編輯軟體',name:'TSC BarTender UltraLite',version:'11.5.1',updated:'2025-12-02',size:'1.36 GB',note:'標籤設計與列印軟體。'},
      {brand:'TSC',category:'工具程式',name:'TSC Console PC',version:'3.5.0.5',updated:'2026-08-12',size:'25.27 MB',note:'TSC 印表機管理與設定工具。'},
      {brand:'TSC',category:'工具程式',name:'Diagnostic Tool',version:'1.63',updated:'2018-04-10',size:'746 KB',note:'印表機設定與診斷工具。'},
      {brand:'Zebra',category:'驅動程式',name:'Zebra Printer Driver',version:'依原廠最新版',updated:'—',size:'外部下載',note:'正式版將連接公司檔案空間或原廠下載位置。'},
      {brand:'Argox',category:'驅動程式',name:'Argox Printer Driver',version:'依原廠最新版',updated:'—',size:'外部下載',note:'正式版將連接公司檔案空間或原廠下載位置。'},
      {brand:'GoDEX',category:'驅動程式',name:'GoDEX Printer Driver',version:'依原廠最新版',updated:'—',size:'外部下載',note:'正式版將連接公司檔案空間或原廠下載位置。'},
      {brand:'TOSHIBA',category:'驅動程式',name:'TOSHIBA Printer Driver',version:'依原廠最新版',updated:'—',size:'外部下載',note:'正式版將連接公司檔案空間或原廠下載位置。'},
      {brand:'SATO',category:'驅動程式',name:'SATO Printer Driver',version:'依原廠最新版',updated:'—',size:'外部下載',note:'正式版將連接公司檔案空間或原廠下載位置。'},
      {brand:'Honeywell',category:'驅動程式',name:'Honeywell / Datamax / Intermec Driver',version:'依原廠最新版',updated:'—',size:'外部下載',note:'正式版將連接公司檔案空間或原廠下載位置。'},
      {brand:'遠端連線',category:'工具程式',name:'遠端連線工具',version:'TeamViewer / AnyDesk',updated:'—',size:'外部下載',note:'提供遠端技術支援使用。'},
      {brand:'Microsoft',category:'系統元件',name:'Microsoft .NET Framework',version:'依需求',updated:'—',size:'外部下載',note:'Windows 系統元件下載。'}
    ],
    news: [
      {date:'2026-04-27',type:'公司公告',title:'2026 年度萬里資訊員工旅遊公告',excerpt:'年度行程期間之服務與出貨安排公告。'},
      {date:'2026-03-24',type:'產品消息',title:'原物料價格調整公告',excerpt:'因應原物料與供應成本變化之產品價格調整資訊。'},
      {date:'2021-12-21',type:'系統消息',title:'共用印表機 0x0000011b／0x00000709 錯誤處理',excerpt:'Windows 共用印表機常見錯誤之排除說明。'},
      {date:'2021-11-09',type:'產品消息',title:'Zebra ZT411 / ZT421：多功能及穩定性佳',excerpt:'ZT400 系列產品特色與應用介紹。'},
      {date:'2021-11-05',type:'產品消息',title:'Zebra ZT610 / ZT620：堅固耐用及卓越性能',excerpt:'ZT600 系列工業型條碼列印機介紹。'}
    ],
    cases: [
      {name:'松富電子',system:'SFIS 生產現場管控系統'},
      {name:'鈺瑋',system:'SFIS 現場監控管理系統'},
      {name:'深圳高科新農技術有限公司',system:'SFIS 生產現場管控系統'},
      {name:'食品產業客戶',system:'冷凍食品出貨系統'}
    ]
  };

  function clone(v) { return JSON.parse(JSON.stringify(v)); }
  function getData() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return clone(defaultData);
  }
  function saveData(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('farbeyound:datachange'));
  }
  function resetData() {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new CustomEvent('farbeyound:datachange'));
  }
  function exportData() { return JSON.stringify(getData(), null, 2); }
  function importData(raw) {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!parsed || !Array.isArray(parsed.products) || !Array.isArray(parsed.categories)) throw new Error('資料格式不正確');
    saveData(parsed);
    return parsed;
  }

  window.FBStore = { KEY, defaultData: clone(defaultData), getData, saveData, resetData, exportData, importData };
})();
