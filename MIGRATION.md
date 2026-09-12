# 萬里資訊新版官網｜7 天無縫切站移轉計畫

## 目標

公司正式採用後，以 **7 個日曆天內完成 far-beyound.com.tw 無縫取代舊站** 為硬性目標。

「無縫」的定義不是只有首頁能打開，而是：

- 舊網址盡可能以 301 導向正確新版頁面，不大量掉到首頁或 404。
- Google 舊索引、客戶書籤、LINE／Email 舊連結仍可續用。
- 產品、下載、消息、案例、服務據點與聯絡表單資料不中斷。
- 後台沿用現有 Supabase 雲端架構，不在切站週重新開發另一套 CMS。
- PC／手機／平板版面與主要互動在正式網域驗收通過。
- 正式網域啟用 HTTPS、SEO canonical、sitemap、robots、安全標頭與日誌。
- 舊站主機可完全離線，新版仍能正常運作。
- 切站失敗時保留可立即回退舊站 DNS／主機的能力。

## 現況架構（2026-09-12）

目前 GitHub Pages 是展示／驗收前台，但網站資料與後台核心已不是單機 localStorage Demo：

- 共用網站資料：Supabase `site_state`。
- 後台發布：Edge Function `site-state`，具權限判斷、版本衝突保護、URL Server-side 驗證與限流。
- 管理帳號：Supabase Auth。
- 權限：Owner／Admin／Editor／Viewer + 細項 permissions。
- 2FA：TOTP / AAL2。
- 詢問單：先寫 Supabase，再寄公司信箱。
- 備份：資料庫自動備份＋checksum＋安全還原流程。
- 稽核：登入、敏感操作與資料修改具 audit 架構。
- CI：前台完整性、互動、手機、視覺、舊站獨立性、Admin Quality Gate。

因此正式採用時的主要工作是 **部署環境切換、正式網域、Owner、資產、301 與 SEO**，不是重新開發後台。

## 切站前現在就要維持的原則

1. 前台內部連結維持相對路徑，避免綁死 GitHub Pages。
2. GitHub 展示站永遠 noindex；正式網域才允許 index。
3. 新版執行期不得依賴舊站主機；舊站只可作資料來源。
4. 所有舊產品保留 `legacyUrl`，供 301 自動產生。
5. 舊下載頁保留 `sourcePage` 與品牌資訊，供 301 自動產生。
6. 正式切換前重新擷取一次舊站最新 URL 與資產，避免最後幾天新增內容漏掉。
7. 正式上線前建立完整備份：舊站檔案、舊資料庫、DNS、SSL／憑證設定、Search Console 資料。

## 自動 301 轉址工具

Repository 已提供：

- `tools/build_redirect_manifest.py`
- `migration/manual-redirects.csv`
- `.github/workflows/redirect-manifest.yml`

工具會自動從：

- `assets/js/legacy-catalog.js` 的 `legacyUrl`
- `assets/js/legacy-downloads.js` 的 `sourcePage`

產生：

- `redirects.csv`
- `redirects.json`
- `redirects.nginx.conf`
- `redirects.apache.conf`
- `summary.json`

產品舊網址會指向：

`/product/...` → `/product.html?id=<新版產品ID>`

舊下載品牌頁會指向：

`/download/...` → `/downloads.html?brand=<品牌>`

無法自動辨識的公司頁面、活動頁、歷史文章或特殊網址補在 `migration/manual-redirects.csv`。

## 7 天執行節奏

### Day 1｜取得正式環境與完整快照

- 取得 DNS／網域控制權限。
- 取得正式主機或確認部署方式。
- 完整備份舊站檔案與資料庫。
- 匯出／擷取舊站最後一版 URL 清單。
- 執行 redirect manifest，補齊人工轉址。
- 確認公司正式管理者 Email 與第一位 Owner。

**當日完成條件：**舊站可完整復原；所有已知舊 URL 有處理策略。

### Day 2｜部署正式候選站

- 部署目前驗收通過的新版 commit。
- 正式環境先使用測試子網域或 hosts 驗收，不立即切 DNS。
- 保留現有 Supabase 資料與後台架構。
- 將公司控制的圖片、PDF、下載檔搬到正式儲存位置。
- 確認正式站不依賴舊站主機。

**當日完成條件：**關閉舊站來源仍可完整瀏覽新版。

### Day 3｜正式帳號與後台鎖定

- 建立第一位 Owner。
- 完成 TOTP 2FA。
- 建立必要 Admin／Editor／Viewer。
- 全面退出 shared-password 過渡發布流程。
- 邀請／登入回跳改為正式網域。
- 以 Owner 帳號跑完整後台 E2E。

**當日完成條件：**產品、SEO、詢問、權限、備份、還原、發布均以正式帳號運作。

### Day 4｜SEO／301／表單／下載驗收

- 套用完整 301。
- 抽查與批次檢查舊產品 URL。
- 抽查所有舊下載品牌頁。
- 驗證 canonical、OG、robots、sitemap。
- 驗證聯絡表單：資料庫留存＋公司 Email 收件。
- 驗證大型下載檔、PDF、型錄與產品文件。

**當日完成條件：**沒有系統性 404、錯誤 canonical 或表單中斷。

### Day 5｜跨裝置與壓力前驗收

- Windows Chrome／Edge。
- iPhone Safari。
- iPad Safari。
- 常用螢幕尺寸與手機橫直向。
- 首頁、產品、產品詳情、下載、聯絡、消息、案例、據點、後台逐頁驗收。
- 執行全部 GitHub Actions / Admin Quality Gate。
- Supabase Security Advisor / Performance Advisor 再掃一次。

**當日完成條件：**無 blocker，僅允許不影響上線的小型視覺瑕疵。

### Day 6｜DNS 切換與正式上線

- 將 DNS TTL 提前降低。
- 最後一次備份舊站與新版資料。
- 切換 `far-beyound.com.tw` / `www` 到新版。
- 確認 HTTPS 憑證。
- 正式網域解除 noindex／robots 封鎖。
- 提交 sitemap／Search Console。
- 驗證 301、表單、下載、後台登入。

**回退條件：**若正式網域發生重大故障、後台不可登入、表單無法留存、主要舊 URL 大量失效，立即回退 DNS 到舊站並修復後重切。

### Day 7｜觀察與收尾

- 監看 404／5xx／Edge Function 錯誤／表單失敗。
- 檢查 Search Console 抓取狀態。
- 補漏掉的 301。
- 確認公司人員可正常使用後台。
- 舊站先保留離線備份，不立即刪除。
- 完成正式切站驗收紀錄。

## 不允許拖到採用後才開發的項目

下列能力必須在展示期盡量完成並持續維護：

- 產品／品牌／分類管理。
- 下載管理與品牌／類型 query。
- 消息／案例／公司資料／據點管理。
- SEO 管理中心。
- 聯絡表單資料庫留存。
- 個人管理帳號、權限、2FA、Session。
- 備份／還原／audit。
- XSS／URL／Import Guard／RLS。
- 舊站資產獨立性。
- 301 manifest 自動產生。
- 自動 CI／Admin Quality Gate。

## 真正只能在公司採用後完成的項目

- DNS 指向與正式 SSL。
- 第一位正式 Owner 的公司指定 Email。
- 正式主機／物件儲存實際位置。
- 公司正式 SMTP／寄信 API。
- 正式 HTTP Security Headers（依主機設定）。
- Search Console 正式網域驗證與 sitemap 提交。
- 最後一版舊站 URL／資料快照。

## 上線完成的硬性驗收標準

不能只以「首頁開得起來」視為完成。至少必須全部成立：

- 正式 `www` 與裸網域 HTTPS 正常且 canonical 一致。
- 舊站已知 URL 全部屬於 301、200 或有明確人工處理；不得大量 404。
- 所有 published 產品可開啟且圖片、規格、文件正常。
- 下載品牌／類型篩選與檔案連結正常。
- 聯絡表單可留存資料並有 Email 結果狀態。
- Owner＋2FA 正常；未登入無法管理敏感資料。
- 備份可驗證 checksum，還原流程完成一次受控測試。
- GitHub Actions / Admin Quality Gate 全綠。
- Supabase Security Advisor 無未處理高風險項目。
- 舊站主機斷線後新版仍可完整運作。
- 404／500／表單／Edge Function log 在觀察期沒有系統性異常。

達到以上條件，才視為「舊網站已被新版無縫取代」。
