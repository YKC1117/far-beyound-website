# 萬里資訊新版官網（展示版）

這個 repository 是萬里資訊新版官網的前台、內容模型與正式部署基礎。GitHub Pages 僅作為目前預覽環境；正式採用後可移植到公司租用的主機、網域與 MySQL / MariaDB。

## 目前已完成

- 首頁 RWD 與正式產品圖片整合
- 8 大產品／服務分類
- 多層產品入口、品牌篩選、產品列表與產品詳細頁
- 下載中心與品牌快速入口
- SFIS / WMS / SMT / 條碼整合系統方案
- 客戶案例
- 最新消息與文章內頁
- 關於我們、服務據點、聯絡表單
- 全站搜尋
- 桌機 Mega Menu / 下拉式導覽
- 手機折疊式多層導覽
- 公司 LOGO、代表產品圖與 favicon 本地化
- 首頁能力帶、多品牌支援帶、回頂端按鈕與目前頁導覽高亮
- 測試管理介面：產品、下載、系統方案、消息、案例與公司資料維護
- JSON 匯入 / 匯出
- 正式 MySQL 資料庫 Schema
- 正式主機遷移規劃與 301 Redirect 架構
- GitHub Actions 自動語法、連結與視覺 Smoke Test

## 後台與資料同步

開啟 `admin.html`。

目前資料流程不是單純 localStorage：

1. `data.js` 以 localStorage 作為瀏覽器端資料快取與離線 fallback。
2. `cloud-sync.js` 透過 Supabase Edge Function `site-state` 讀寫共用資料。
3. 後台編輯並發布後，資料會送到 Supabase；成功後同步更新版本資訊。
4. 公開頁載入時會拉取共用資料，並在非後台頁面每 30 秒檢查一次更新。
5. 若雲端暫時無法連線，前端保留目前可用的本地資料，不因同步失敗而讓網站無法顯示。
6. JSON 匯入／匯出仍保留作為管理與備份工具。

Supabase 目前同時承擔共用資料、Auth、權限、Edge Functions、詢問單、備份與稽核等正式架構能力；詳細上線架構請見 `PRODUCTION.md`。

## 正式部署方向

- 前台：保留目前靜態 HTML / CSS / JavaScript，可部署到公司正式主機或 CDN
- 雲端資料：Supabase `site_state`
- 後台驗證與權限：Supabase Auth / RLS / permissions
- Server actions：Supabase Edge Functions
- 檔案：公司控制的正式 storage 或合適的物件儲存
- SSL：Let's Encrypt / 主機商 SSL
- SEO：canonical、sitemap、robots、Open Graph、結構化資料
- 舊站轉移：建立舊網址對應表並設 301 Redirect

未來若公司 IT 規範要求 MySQL / MariaDB，可另開第二階段遷移，不是目前正式站運作的必要前提。

## 目前定位

此版可作為主管瀏覽新版方向與操作流程的展示版本。正式上線前仍需完成所有舊站產品／文件資料移轉、正式表單寄送、登入權限、正式檔案空間與網域切換。

最後 UI 修正（實圖 LOGO、手機首屏縮短、導覽高亮）已掛載至公開頁面，並重新執行視覺驗收。
