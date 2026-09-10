# 萬里資訊新版官網（測試開發版）

這個 repository 是新版官網的前台與資料結構原型，目標不是拋棄式 Demo，而是作為後續正式網站的可移植基礎。

## 目前已完成

- 首頁（RWD）
- 多層產品入口與產品列表
- 通用產品詳細頁
- 下載中心
- SFIS / WMS / SMT 系統方案
- 最新消息
- 聯絡表單流程驗證
- 全站搜尋
- Demo 管理介面：產品新增 / 修改 / 刪除
- JSON 匯入 / 匯出
- GitHub Pages 相容的相對路徑

## 測試後台

開啟 `admin.html`。

GitHub Pages 不提供伺服器資料庫，因此目前編輯資料儲存在瀏覽器 localStorage。這可以展示真實操作流程，且資料可匯出 JSON。正式部署時，將把相同資料模型接到 MySQL / MariaDB，並加入登入、權限、檔案上傳與後端 API。

## 正式部署方向

- 前台：保留目前 HTML / CSS / JS，可直接部署在一般 Linux 主機
- 後台：PHP / Laravel 或等價框架
- 資料庫：MySQL / MariaDB
- 檔案：主機 storage 或獨立物件儲存
- SSL：Let's Encrypt / 主機商 SSL
- SEO：正式上線時補 canonical、sitemap、robots、Open Graph、結構化資料
- 舊站轉移：保留舊網址對應表並設 301 Redirect

## 測試方式

可直接開 `index.html`，或以本機 Web Server 啟動：

```bash
python -m http.server 8080
```

再開啟 `http://localhost:8080/`。
