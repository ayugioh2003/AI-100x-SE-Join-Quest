# 專案結構說明

這個 Repository 包含多個使用 BDD (行為驅動開發) 方式實作的系統模組：

```
AI-100x-SE-Join-Quest/
├── README.md                    # 主專案說明
├── .gitignore                   # Git 忽略規則
├── note.md                      # 專案結構說明
├── order-discount-module/       # 訂單折扣模組
│   ├── package.json            # 依賴管理
│   ├── tsconfig.json           # TypeScript 配置
│   ├── cucumber.js             # Cucumber 配置
│   ├── cucumber-report.html    # Cucumber 測試報告
│   ├── cucumber-report.json    # Cucumber 測試報告 JSON
│   ├── show-cucumber-report.js # 報告顯示工具
│   ├── src/                    # 源代碼
│   │   ├── Product.ts
│   │   ├── OrderItem.ts
│   │   ├── Order.ts
│   │   └── OrderService.ts
│   ├── features/               # BDD 特徵文件
│   │   ├── order.feature
│   │   ├── double-eleven.feature
│   │   ├── step-definitions/   # 步驟定義
│   │   │   ├── order.steps.ts
│   │   │   └── double-eleven.steps.ts
│   │   └── support/           # 測試支援文件
│   │       └── world.ts
│   └── docs/                  # 設計文檔
│       ├── BDD.prompt
│       ├── ERD.png
│       ├── OOD.png
│       ├── OCP-Refactor.prompt
│       ├── example.feature
│       └── ooad.asta
├── chinese-chess/              # 中國象棋模組
│   ├── package.json           # 依賴管理
│   ├── tsconfig.json          # TypeScript 配置
│   ├── cucumber.js            # Cucumber 配置
│   ├── jest.config.js         # Jest 測試配置
│   ├── todo.md               # 開發任務清單
│   ├── cucumber-report.html  # Cucumber 測試報告
│   ├── src/                   # 後端源代碼
│   │   ├── ChessGameService.ts
│   │   └── models/           # 遊戲模型
│   │       ├── ChessBoard.ts
│   │       ├── ChessGame.ts
│   │       ├── Move.ts
│   │       ├── MoveResult.ts
│   │       ├── Position.ts
│   │       ├── enums.ts
│   │       └── pieces/       # 棋子類別
│   ├── frontend/             # Vue.js 前端
│   │   ├── package.json
│   │   ├── vite.config.ts    # Vite 配置
│   │   ├── DEPLOYMENT.md     # 部署說明
│   │   ├── cucumber-report.html # 前端測試報告
│   │   ├── dist/            # 構建產物
│   │   ├── public/          # 靜態資源
│   │   ├── src/
│   │   │   ├── App.vue
│   │   │   ├── main.ts
│   │   │   ├── components/   # Vue 組件
│   │   │   │   └── game/    # 遊戲相關組件
│   │   │   ├── game-logic/   # 遊戲邏輯
│   │   │   ├── stores/       # Pinia 狀態管理
│   │   │   ├── services/     # 服務層
│   │   │   ├── types/        # TypeScript 類型定義
│   │   │   ├── router/       # 路由配置
│   │   │   └── views/        # 頁面視圖
│   │   └── features/        # 前端 BDD 測試
│   ├── features/            # 後端 BDD 特徵文件
│   │   ├── chess.feature
│   │   └── step-definitions/ # 步驟定義
│   └── docs/               # 設計文檔
│       ├── BDD.prompt
│       ├── ClassDiagram.md
│       ├── ERD.md
│       └── chess.feature
└── .github/                # GitHub Actions
    └── workflows/
        └── deploy.yml      # 部署工作流程
```

## 已完成的模組

### 1. 訂單折扣模組 (order-discount-module)

電商訂單定價促銷系統，展示 AI x BDD 開發流程的完整實踐。

**功能特色：**
- ✅ 基本訂單計算
- ✅ 門檻折扣（滿額減）
- ✅ 化妝品買一送一促銷
- ✅ 雙十一大量購買折扣（同商品每 10 件享 20% 折扣）
- ✅ 多重促銷疊加

**技術棧：**
- TypeScript
- Cucumber.js (BDD 測試框架)
- Jest (單元測試)
- Chai (斷言庫)

**測試結果：** 12 scenarios 全部通過，49 個測試步驟

### 2. 中國象棋模組 (chinese-chess)

全功能中國象棋遊戲系統，包含完整的前後端實作。

**功能特色：**
- ✅ 完整的象棋規則實作
- ✅ 各種棋子的移動邏輯（將、士、象、馬、車、炮、兵）
- ✅ 遊戲狀態管理（進行中、將軍、將死、和棋）
- ✅ Vue.js 互動式前端界面
- ✅ 音效系統
- ✅ 響應式設計

**技術棧：**
- 後端：TypeScript, Cucumber.js, Jest
- 前端：Vue.js 3, TypeScript, Pinia, Vite
- 測試：BDD (Cucumber), Unit Tests
- 部署：GitHub Pages

### 如何運行各模組

#### 訂單折扣模組
```bash
cd order-discount-module
npm install
npm run test:cucumber          # 運行 BDD 測試
npm run test:cucumber:details  # 顯示詳細測試報告
```

#### 中國象棋模組
```bash
# 後端測試
cd chinese-chess
npm install
npm run test:cucumber

# 前端開發
cd chinese-chess/frontend
npm install
npm run dev                    # 啟動開發服務器
npm run build                  # 構建產品版本
```

## 開發指南

每個模組都嚴格遵循 BDD 開發流程：

1. **Walking Skeleton** - 建立 Cucumber 測試框架
2. **Red-Green-Refactor** - 逐一實作場景
3. **Clean Code** - 重構和程式碼品質提升
