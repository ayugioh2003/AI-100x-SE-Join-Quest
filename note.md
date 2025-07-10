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
│   ├── src/                    # 源代碼
│   │   ├── Product.ts
│   │   ├── OrderItem.ts
│   │   ├── Order.ts
│   │   └── OrderService.ts
│   ├── features/               # BDD 特徵文件
│   │   ├── order.feature
│   │   ├── double-eleven.feature
│   │   ├── step-definitions/   # 步驟定義
│   │   └── support/           # 測試支援文件
│   └── docss/                 # 設計文檔
│       ├── BDD.prompt
│       ├── ERD.png
│       └── OOD.png
└── (future modules)            # 未來的其他系統模組
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

### 如何運行訂單折扣模組

```bash
cd order-discount-module
npm install
npm run test:cucumber          # 運行 BDD 測試
npm run test:cucumber:details  # 顯示詳細測試報告
```

## 開發指南

每個模組都嚴格遵循 BDD 開發流程：

1. **Walking Skeleton** - 建立 Cucumber 測試框架
2. **Red-Green-Refactor** - 逐一實作場景
3. **Clean Code** - 重構和程式碼品質提升

歡迎貢獻新的系統模組，一起推進 AI × BDD 開發方法論的研究！