# 街口全端團隊作業說明

(本文件主要使用 GPT 生成，並增加一些手動修改，以提供更多有關作業的訊息。)

非常高興有這個機會應徵街口的全端職缺，並完成了這個有趣的作業。在此，我想透過這份
README，向大家介紹我在開發過程中使用的框架、開發方法、遇到的問題，以及想了解的事情。


---

## 如何下載並在本地運行專案

以下是如何下載此專案並在本地環境運行的步驟：

### 前置需求

- **Node.js**：請確保已安裝 Node.js
- **npm 或 yarn**：Node.js 的套件管理工具。

### 下載專案

1. **複製此儲存庫**

   ```bash
   git clone https://github.com/lulu2002/jkopay-assignment-oauth-shop-app
   ```
2. **進入專案目錄**

   ```bash
   cd jkopay-assignment-oauth-shop-app
   ```

### 安裝後端依賴項

1. **進入後端目錄**

   ```bash
   cd backend   
   ```

2. **安裝依賴項**

   ```bash
   npm install   # 或者使用 yarn install
   ```
3. **填入環境變數**

   在根目錄下創建一個 `.env` 文件，並添加必要的配置，關於 OAUTH 的設定，需要與 [OAuth伺服器](https://github.com/lulu2002/simple-oauth-server) 一致

   ```env
    JWT_SECRET=
    OAUTH_HOST=
    OAUTH_CLIENT_ID=
    OAUTH_CLIENT_SECRET=
    PORT=
    HOST=
   ```

5. **運行後端服務**

   ```bash
   npm run start:local  # 開發模式下運行
   ```

### 安裝前端依賴項

1. **開啟一個新的終端並進入前端目錄**

   ```bash
   cd frontend   
   ```

2. **安裝依賴項**

   ```bash
   npm install   # 或者使用 yarn install
   ```
3. 在根目錄下創建一個 `.env.development` 文件，並添加必要的配置，關於 OAUTH 的設定，需要與 [OAuth伺服器](https://github.com/lulu2002/simple-oauth-server) 一致

   ```env
   VITE_API_URL=http://localhost:<後端服務運行的 PORT>
   VITE_OAUTH_CLIENT_ID=<Auth Server Client ID>
   VITE_OAUTH_REDIRECT_URI=http://localhost:5000
   VITE_OAUTH_API_HOST=http://localhost:5001
   VITE_OAUTH_API_PATH=login
   ```
   
4. **運行前端應用**

   ```bash
   npm run dev   # 開發模式下運行
   ```

### 測試應用

- 在瀏覽器中訪問 `http://localhost:5000`（或終端中顯示的前端運行地址），即可查看前端應用。
- 後端 API 默認運行在 `http://localhost:<環境變數設定的 PORT>`。

---

## 開發框架

### 後端

- **語言**：TypeScript
- **執行環境**：Node.js
- **Web 框架**：Fastify
- **資料庫 ORM**：TypeORM
- **資料庫**：SQLite（用於 Demo）
- **測試框架**：Jest

### 前端

- **語言**：TypeScript
- **框架**：React.js
- **建構工具**：Vite
- **測試框架**：Jest

---

## 開發方法

### 依賴注入（DI）與測試驅動開發（TDD）

- **依賴注入（DI）**：在開發中，我採用了依賴注入的設計模式，以提高程式碼的可測試性和模組化。
- **測試驅動開發（TDD）**：透過 TDD 方法，確保功能的正確性和穩定性。使用 Jest 對前後端的元件和模組進行了單元測試。

### 清潔架構（Clean Architecture）

- **元件化設計**：使用類別（class）和介面（interface）來構建元件，實現介面隔離（Interface Segregation）。
- **控制器（Controller）**：負責路由註冊和請求處理。
- **依賴管理**：由於專案規模較小，未使用 DI 容器，而是採用了純粹的 DI 方法。

### 前端架構

- **元件（Component）**：保持元件的純粹性，使用狀態（state）和屬性（props）傳遞資料。
- **頁面（Page）**：作為組合根（Composition Root），負責組合各個元件。
- **視圖模型（ViewModel）**：處理頁面的業務邏輯，與元件解耦，方便測試和維護。
- **適配器（Adapter）**：將第三方函式庫（如 Axios）封裝，隔離對外部依賴的直接調用。

---

## 遇到的問題

### 已解決的問題

1. **需求理解的挑戰**：由於缺乏開發 OAuth 系統的經驗，剛開始對需求理解有些困惑，例如如何建立 API 供商城串接等。透過研究和實踐，最終完成了相關功能。

2. **技術的陌生**：過去主要使用 Java 和 Kotlin 進行後端開發，前端使用 Angular。這次需要使用 Node.js 和
   React.js，花費了一些時間熟悉新的框架和工具，最終成功掌握了基本的使用方法。

3. **測試環境配置**：在設定 TypeScript 和 Jest 時，遇到了模組導入的問題。需要在 `tsconfig.json` 和 Jest 配置中設定
   `moduleNameMapper`，以解決路徑映射的問題。透過調整配置，成功解決了這一問題。

4. **依賴注入的實現**：在 TypeScript 中實現 DI 遇到一些挑戰，特別是在不使用 DI 容器的情況下，需要手動管理依賴關係和物件的實例化。最終採用了純粹的
   DI 方法，成功實現了依賴管理。

### 未解決的問題

1. **前端架構的疑惑**：在 React 中如何最佳地組織程式碼，例如使用 ViewModel 模式是否符合 React 的生態和最佳實踐，有待進一步探討。

2. **部署和 CI/CD**：由於時間關係，未能設定 CI/CD 管道，僅在 Render 上進行了簡單的部署，未能展示完整的自動化部署流程。

---

## 想知道的事情

- **TypeScript 的最佳實踐**：我想了解在 TypeScript 生態系統中，是否有更符合慣例或更好的程式碼組織方式，特別是在依賴注入和清潔架構的應用上。

- **React 的程式碼組織**：對於在 React 中使用 ViewModel 模式是否合適，是否有更好的方式來處理頁面邏輯與元件的解耦，以及如何更好地符合
  React 的生態系和社區最佳實踐。

- **前後端的協作**：在實際專案中，如何更有效地進行前後端協作，特別是在接口設計、需求對齊和跨團隊溝通上，有哪些經驗和建議。

- **CI/CD 的實踐**：希望了解街口團隊在 CI/CD 方面的實踐，以及如何更好地在專案中整合自動化部署、測試和持續交付。