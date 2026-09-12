# 萬里資訊新版官網｜正式上線架構

目前 GitHub Pages 是展示／驗收前端；**正式採用時不重新開發另一套後台**。現行 Supabase 雲端資料、Auth、RLS、Edge Functions、2FA、備份、稽核與詢問單架構直接沿用，再把前端部署到公司正式環境並切換網域。

完整 7 天切站程序請以 `MIGRATION.md` 為主。

## 1. 現行核心架構

- Frontend：目前為靜態 HTML / CSS / JavaScript，可部署到 Nginx、Apache、CDN、物件儲存靜態網站或其他正式主機。
- Cloud data：Supabase `site_state`。
- Admin Auth：Supabase Auth。
- Authorization：Owner／Admin／Editor／Viewer + 細項 permissions。
- MFA：TOTP / AAL2。
- Server actions：Supabase Edge Functions。
- Inquiry：Supabase DB 留存 + Email 通知狀態。
- Backup / Audit：Supabase DB + secure Edge Functions / RPC。
- CI：GitHub Actions，包含前台、手機、互動、舊站獨立性與 Admin Quality Gate。

因此正式上線不要求先改成 PHP／MySQL。若公司未來因既有 IT 規範必須改 MySQL，可以在正式穩定上線後另開第二階段，不應放進 7 天切站的 critical path。

## 2. 正式前端環境最低需求

- 支援 HTTPS。
- 可部署目前靜態檔案與 `assets/`。
- 可設定 301 redirect。
- 可設定 HTTP Security Headers。
- 可查看 access / error log。
- 可設定 `www` 與裸網域 canonical 行為。

Nginx 或 Apache 都可；不要求 PHP 才能上線。

## 3. 正式網域

主要網域：`far-beyound.com.tw`

切站時必須明確選一個 canonical host（建議沿用既有主要搜尋結果實際使用的 host），另一個 host 永久 301 到 canonical host。

必須同時確認：

- HTTPS 憑證。
- HTTP → HTTPS 301。
- www ↔ non-www 單一 canonical。
- canonical / hreflang / OG URL 與正式 host 一致。
- GitHub Pages 永遠維持 noindex。

## 4. 後台正式模式

正式採用後第一優先：

1. 建立公司指定第一位 Owner。
2. Owner 完成 TOTP 2FA。
3. 建立必要 Admin／Editor／Viewer。
4. 完整跑一次 Owner E2E。
5. 退出所有 shared-password 過渡發布流程。
6. 邀請／登入完成網址固定回正式網域。

正式模式下，高風險操作必須保留 server-side 權限檢查，不能只靠前端隱藏按鈕。

## 5. 客戶詢問

正式站必須維持「先留資料、再寄信」原則：

1. 表單送到 Edge Function。
2. 驗證 Origin、資料格式、honeypot、rate limit。
3. 先寫 inquiries 資料表。
4. 再寄公司信箱。
5. 寄信成功／失敗狀態回寫 DB。

採用後建議把展示期 Email relay 換成公司可管理的 SMTP／Email API；但即使寄信服務暫時異常，詢問仍不能遺失。

## 6. 正式資產與下載

- 網站執行期不得依賴舊站主機。
- 公司自行擁有的重要圖片、PDF、型錄、驅動與文件應搬到公司控制的正式儲存位置。
- 原廠 Zebra／TSC／Argox／GoDEX 等官方下載可保留外部來源；長期重要檔案仍建議鏡像。
- 大型安裝檔不強迫放 Git Repository。

`Legacy site independence` CI 必須持續通過。

## 7. 舊網址與 SEO 延續

Repository 已具自動轉址產生器：

- `tools/build_redirect_manifest.py`
- `migration/manual-redirects.csv`
- `.github/workflows/redirect-manifest.yml`

它會由舊產品 `legacyUrl` 與下載 `sourcePage` 自動建立 301 package，輸出 CSV／JSON／Nginx／Apache 格式。

硬性原則：

- 有對應新版內容的舊網址應 301 到最接近的新內容。
- 不可把全部舊產品一律導首頁。
- 不可用 JavaScript redirect 取代 server-side 301。
- 上線後持續看 404 log 與 Search Console 補漏網 URL。

## 8. SEO 上線開關

GitHub Pages 測試站維持 noindex。

正式網域上線時：

- 確認正式頁面 robots=index,follow。
- `robots.txt` 不再全站 Disallow。
- 產生／提交正式 sitemap。
- canonical 指向正式 host。
- Search Console 驗證正式網域。
- 保留 Product、Breadcrumb、NewsArticle、Organization、WebSite structured data。

## 9. 安全最低標準

正式版至少維持：

- HTTPS only。
- RLS。
- Service Role Key 不進前端 Repository。
- Owner / permissions server-side authorization。
- TOTP / AAL2。
- Session 最長時間與撤銷檢查。
- Rate limit。
- XSS escape + URL validation + Import Guard。
- CSP / Security Headers。
- 備份 checksum 與受控還原。
- Audit log。
- Repository 正式採用後改 private。

## 10. 備份與回退

切站前至少保存：

- 舊站完整檔案。
- 舊站資料庫（若有）。
- 舊 DNS 記錄。
- 新版 Supabase 備份。
- 當次上線 Commit SHA。
- 301 redirect package。

若切站後發生 major blocker，可以將 DNS 暫時切回舊站；因此正式切站前不得先刪除舊環境。

## 11. 舊網站完全斷開原則

舊網站在移轉期間只能是資料來源，不能是新版執行期依賴。

切站驗收必須假設舊主機完全離線，以下仍全部正常：

- 首頁。
- 產品與圖片。
- 產品文件。
- 下載中心。
- 系統方案。
- 案例與消息。
- 服務據點。
- 聯絡表單。
- 後台管理。

只有符合這個條件，才能真正稱為「取代舊網站」，而不是在舊網站外面包一層新版畫面。
