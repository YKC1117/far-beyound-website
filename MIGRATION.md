# 正式主機移植原則

1. 所有前台網址目前使用相對路徑，避免綁死 GitHub Pages 網址。
2. 產品、分類、下載、新聞、系統方案目前集中於 `assets/js/data.js`，正式版轉為資料庫資料表。
3. `admin.html` 的 UI 流程可保留，但 localStorage 改成登入後呼叫 API。
4. 大型驅動 / PDF 不放 GitHub，正式版改存 `/storage/downloads` 或物件儲存空間。
5. 正式切換 `far-beyound.com.tw` 前，先建立舊網址 → 新網址的 301 對照表。
6. 正式環境需啟用 HTTPS、備份、權限、表單防濫用與伺服器日誌。
