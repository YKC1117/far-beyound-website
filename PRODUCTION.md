# 萬里資訊新版官網｜正式上線架構

目前 GitHub Pages 是展示／驗收環境。前台頁面、資料欄位、路由與資產目錄會沿用到正式站；正式上線時新增後端、MySQL、登入權限與檔案儲存，不重做前台視覺。

## 1. 正式環境建議

- Web Server：Nginx 或 Apache
- PHP：8.2+
- Database：MySQL 8 / MariaDB 10.6+
- SSL：Let's Encrypt
- 檔案儲存：主機磁碟或 S3 相容物件儲存
- 網域：far-beyound.com.tw
- Repository：正式採用後改 private

一般 Linux 虛擬主機只要支援 PHP 8.2、MySQL、HTTPS 與排程備份即可部署；不綁 GitHub Pages。

## 2. 目錄策略

```text
/public                 對外網站根目錄
  index.html / *.html   前台頁面（可逐步轉 PHP template）
  assets/
    css/
    js/
    images/
  uploads/              小型公開圖片與 PDF（若採本機儲存）
/api                    正式後端 API
/admin                  正式登入後台
/database/schema.sql    MySQL Schema
/storage                非公開暫存、log、備份
```

大型驅動、BarTender 安裝檔等不進 Git Repository。正式下載項目只在資料庫保存檔案 URL、版本、日期與容量；檔案本體放主機下載區或物件儲存。

## 3. 資料表

`database/schema.sql` 已預先包含：

- site_settings
- admins
- brands
- categories（支援多層分類）
- products
- product_images
- product_highlights
- product_specs
- product_files
- downloads
- solutions / solution_points
- news
- customer_cases
- inquiries
- redirects
- audit_logs

這些欄位對應現在 GitHub Pages Demo 的產品、下載、系統方案、消息、案例、聯絡表單與管理需求。

## 4. 正式後台最低需求

### 產品管理
- 新增／修改／刪除／上下架
- 品牌與多層分類
- 型號、系列、產品類型、狀態
- 產品介紹、特色、規格表
- 主圖與多圖上傳／排序
- 型錄、手冊、快速指南
- 首頁精選與排序

### 下載中心
- 品牌、分類、名稱、版本、更新日期、容量
- 上傳檔案或填外部下載 URL
- 上下架與排序

### 內容管理
- 系統方案
- 客戶案例
- 最新消息
- 公司基本資料／服務據點

### 詢問單
- 接收網站聯絡表單
- 新件／處理中／完成狀態
- E-mail 通知
- 後台查詢與匯出

## 5. 從 GitHub Pages 搬到正式主機

1. 公司確認新版內容與功能。
2. 租用正式主機並建立 MySQL。
3. 匯入 `database/schema.sql`。
4. 將目前前台與 `assets/` 部署到正式主機。
5. 建立 API 與登入後台，把目前 FBStore 資料欄位接到 MySQL。
6. 上傳產品圖片與正式下載檔；大型檔案放獨立下載空間。
7. 整理舊站所有 URL，建立 `redirects` 301 對照。
8. 在測試子網域完成 PC／手機／平板驗收。
9. 備份舊站與 DNS 設定。
10. 將 far-beyound.com.tw 指向新主機，安裝 SSL。
11. 解除正式站 robots 封鎖，送出 sitemap，確認 Search Console。
12. 觀察 404、表單、下載、SEO 與伺服器 log。

## 6. 目前 GitHub Pages 與正式站差異

GitHub Pages 不能執行 PHP / MySQL，所以目前管理後台以瀏覽器 localStorage + JSON 匯入／匯出示範資料維護流程。正式版會將同一組資料概念改接 API / MySQL；前台版型與使用流程保留。

GitHub Pages 測試站目前使用 `robots.txt: Disallow: /`，避免尚未核准的新版被搜尋引擎收錄。正式切站時才移除此限制。

## 7. 備份

建議正式環境：
- MySQL：每日自動備份，保留至少 14～30 天
- uploads：每日增量備份
- 程式：Git private repository
- 每次大量資料修改或上版前：手動建立可還原快照

## 8. 安全

- 管理後台密碼只存 `password_hash`
- 全站 HTTPS
- 表單加 CSRF、Rate Limit、Honeypot / CAPTCHA（視垃圾訊息量）
- 上傳檔限制副檔名、MIME、大小並重新命名
- 後台操作寫入 audit_logs
- production `.env` 不提交到 Git

## 9. 舊網站完全斷開原則（硬性要求）

舊網站 `www.far-beyound.com.tw` 在移轉期間只允許作為「資料來源」，不得成為新版網站的執行期依賴。

- 可以從舊網站擷取文字、產品資料、圖片、型錄、手冊與下載資訊。
- 圖片、PDF、公司自行提供的文件與其他必須長期保留的資產，擷取後必須存到新版主機、公司控制的物件儲存或其他可長期管理的空間。
- 新版前台不得以 `img/src`、`script/src`、`link/href`、CSS `url()`、JavaScript `fetch()` 或下載按鈕直接依賴舊網站主機。
- 第三方原廠官方來源（例如 Zebra、TSC、Argox、GoDEX 等）可作為外部來源，但它們與舊網站主機必須完全分離；重要文件若需保證長期可用，正式上線前仍應鏡像到公司控制的儲存空間。
- 舊網址可以暫時保留為匯入比對用的 metadata／識別欄位，但不能拿來載入資源或導覽。
- 切站驗收必須以「舊網站主機完全離線」為假設，首頁、產品圖片、產品文件、下載中心、聯絡方式、系統方案、案例與新聞都要正常。

Repository 內的 `tools/audit_legacy_independence.py` 與 GitHub Actions `Legacy site independence` 會自動檢查公開網站是否又出現舊主機的執行期依賴；檢查失敗時不得視為可上線版本。
