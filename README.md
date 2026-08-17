# Okinawa Map

一個整理沖繩旅遊地點的互動式地圖，方便依分類查看店家與景點，並將地點安排進旅遊行程。

## 功能

- 依餐廳、景點與購物分類篩選地點
- 從地點卡片或地圖標記選取位置
- 自動調整地圖範圍並聚焦選取的地點
- 連結至 Google Maps、官方網站及餐廳的 Tabelog 頁面
- 支援桌面與行動裝置版面

## 技術

- React 18
- TypeScript
- Vite
- Leaflet / React Leaflet

## 開始使用

需要 Node.js 與 npm。

```bash
npm install
npm run dev
```

## 常用指令

- `npm run dev`：啟動本機開發伺服器
- `npm run build`：執行 TypeScript 檢查並建立正式版本
- `npm run preview`：預覽正式版本
- `npm run lint`：執行 ESLint
- `npm run format`：使用 Prettier 格式化程式碼
- `npm run format:check`：檢查程式碼格式

## 專案結構

- `src/App.tsx`：地圖、分類篩選與地點卡片介面
- `src/data/places.ts`：地點資料
- `app/globals.css`：全域與響應式樣式
