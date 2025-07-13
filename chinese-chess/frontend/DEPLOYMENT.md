# 部署指南

## GitHub Pages 部署

### 錯誤修復

如果遇到權限錯誤：
```
remote: Permission to ayugioh2003/AI-100x-SE-Join-Quest.git denied to github-actions[bot].
```

請按照以下步驟操作：

### 方法 1：使用 GitHub Pages 官方 Action（推薦）

1. 到 GitHub Repository 的 Settings
2. 找到 Pages 區塊
3. Source 選擇 "GitHub Actions"
4. 使用 `.github/workflows/deploy.yml` 配置

### 方法 2：修復權限問題

1. 到 Repository Settings → Actions → General
2. 找到 "Workflow permissions"
3. 選擇 "Read and write permissions"
4. 勾選 "Allow GitHub Actions to create and approve pull requests"
5. 點擊 Save

### 方法 3：手動部署

如果自動部署仍有問題，可以手動部署：

```bash
# 在本地構建
cd chinese-chess/frontend
npm run build

# 創建部署分支
git checkout -b gh-pages
git add -f dist
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages --force

# 回到主分支
git checkout main
```

然後在 GitHub Settings → Pages 中：
- Source: Deploy from a branch
- Branch: gh-pages
- Folder: / (root)

### 檢查部署狀態

1. 到 Actions 頁面查看工作流程執行狀態
2. 成功後訪問：`https://ayugioh2003.github.io/AI-100x-SE-Join-Quest/`

## Netlify 部署（替代方案）

如果 GitHub Pages 有問題，可以使用 Netlify：

1. 訪問 [Netlify](https://netlify.com)
2. 連接 GitHub repository
3. 設定構建配置：
   - Build command: `cd chinese-chess/frontend && npm run build`
   - Publish directory: `chinese-chess/frontend/dist`
   - Base directory: `/`

## Vercel 部署（替代方案）

1. 訪問 [Vercel](https://vercel.com)
2. Import Git Repository
3. 設定配置：
   - Framework Preset: Vue.js
   - Root Directory: `chinese-chess/frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

## 本地預覽

在部署前可以先本地預覽：

```bash
cd chinese-chess/frontend
npm run build
npm run preview
```

訪問 http://localhost:4173 查看生產版本。