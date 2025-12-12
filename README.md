# Mermaid 圖表編輯器 🎨 / Mermaid Diagram Editor

[中文](#中文版) | [English](#english)

---

## 中文版

一個現代化的 **Mermaid 圖表視覺化編輯器**，提供直觀的圖形化介面來創建、編輯和美化 Mermaid 圖表，無需深入學習複雜的語法。

![Mermaid Editor](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)

### ✨ 功能特色

#### 🖥️ **雙視窗即時編輯**
- **分屏界面**：左側程式碼編輯器 + 右側即時預覽
- **即時渲染**：程式碼變更立即反映在圖表預覽中
- **語法高亮**：支援 Mermaid 語法智能提示

#### 🎨 **視覺化樣式編輯**
- **豔色調整**：透過 GUI 直接選擇鮮豔的填充色、邊框色
- **筆觸寬度**：可視化調整線條粗細
- **全域預設**：設定預設樣式應用到所有圖表元素
- **個別調整**：針對特定節點進行客製化樣式設定

#### 📁 **匯出功能**
- **SVG 下載**：將完成的圖表匯出為高品質向量圖檔
- **保持樣式**：匯出檔案完整保留所有視覺化設定

#### 🌙 **現代化界面**
- **深色主題**：專業的暗色調設計
- **響應式布局**：適配各種螢幕尺寸
- **流暢動畫**：優雅的使用者體驗

### 🛠️ 技術架構

| 技術 | 版本 | 用途 |
|------|------|------|
| **Next.js** | 14+ | React 框架 (App Router) |
| **TypeScript** | 5+ | 型別安全開發 |
| **Tailwind CSS** | 4+ | 現代化 CSS 框架 |
| **Zustand** | 5+ | 輕量級狀態管理 |
| **Mermaid.js** | 11+ | 圖表渲染引擎 |
| **React Colorful** | 5+ | 顏色選擇元件 |
| **Lucide React** | - | 圖標庫 |

### 🚀 快速開始

#### 1️⃣ **安裝依賴**
```bash
npm install
```

#### 2️⃣ **啟動開發服務器**
```bash
npm run dev
```

#### 3️⃣ **開啟應用**
在瀏覽器中訪問：[http://localhost:3000](http://localhost:3000)

### 📋 使用說明

1. **編輯程式碼**：在左側編輯器中輸入 Mermaid 語法
2. **即時預覽**：右側會立即顯示圖表渲染結果
3. **調整樣式**：使用右側工具欄的顏色選擇器選擇豔麗色彩
4. **匯出圖表**：點擊下載按鈕將圖表儲存為 SVG 檔案

### 🌐 部署

本專案已針對 **Vercel** 平台進行最佳化：

1. 將程式碼推送到 Git 倉庫 (GitHub/GitLab/Bitbucket)
2. 在 Vercel 中匯入專案
3. Vercel 會自動偵測 Next.js 並配置建置設定
4. 點擊 **Deploy** 完成部署

---

## English

A modern **Mermaid diagram visualization editor** that provides an intuitive graphical interface for creating, editing, and beautifying Mermaid diagrams without the need to learn complex syntax.

### ✨ Features

#### 🖥️ **Dual-View Real-time Editing**
- **Split-screen Interface**: Code editor on the left + Live preview on the right
- **Instant Rendering**: Code changes immediately reflected in diagram preview
- **Syntax Highlighting**: Smart Mermaid syntax support

#### 🎨 **Visual Style Editing**
- **Vibrant Color Adjustment**: GUI controls for selecting bright fill colors and border colors
- **Stroke Width**: Visual adjustment of line thickness
- **Global Defaults**: Set default styles for all diagram elements
- **Individual Customization**: Custom styling for specific nodes

#### 📁 **Export Features**
- **SVG Download**: Export finished diagrams as high-quality vector graphics
- **Style Preservation**: Exported files retain all visualization settings

#### 🌙 **Modern Interface**
- **Dark Theme**: Professional dark-themed design
- **Responsive Layout**: Adapts to various screen sizes
- **Smooth Animations**: Elegant user experience

### 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14+ | React Framework (App Router) |
| **TypeScript** | 5+ | Type-safe Development |
| **Tailwind CSS** | 4+ | Modern CSS Framework |
| **Zustand** | 5+ | Lightweight State Management |
| **Mermaid.js** | 11+ | Diagram Rendering Engine |
| **React Colorful** | 5+ | Color Picker Component |
| **Lucide React** | - | Icon Library |

### 🚀 Quick Start

#### 1️⃣ **Install Dependencies**
```bash
npm install
```

#### 2️⃣ **Run Development Server**
```bash
npm run dev
```

#### 3️⃣ **Open Application**
Navigate to: [http://localhost:3000](http://localhost:3000)

### 📋 Usage

1. **Edit Code**: Input Mermaid syntax in the left editor
2. **Live Preview**: Right side shows instant diagram rendering
3. **Adjust Styles**: Use the color picker in the toolbar to select vibrant colors
4. **Export Diagram**: Click download button to save diagram as SVG file

### 🌐 Deployment

This project is optimized for **Vercel** deployment:

1. Push code to Git repository (GitHub/GitLab/Bitbucket)
2. Import project in Vercel
3. Vercel will automatically detect Next.js and configure build settings
4. Click **Deploy** to complete deployment

---

## 📂 專案結構 / Project Structure

```
mermaid_viewer/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   │   ├── Editor.tsx      # Code editor
│   │   ├── Preview.tsx     # Diagram preview
│   │   ├── Toolbar.tsx     # Style toolbar
│   │   └── ColorPicker.tsx # Color picker
│   └── store/         # Zustand state management
└── legacy/           # Original Python version (deprecated)
```

## 📞 聯絡資訊 / Contact Information

**專案所有者 / Project Owner**: Odette  
**聯絡信箱 / Contact Email**: [parkeunyeon18@gmail.com](mailto:parkeunyeon18@gmail.com)

## 📄 授權 / License

本專案為個人開發作品，所有權歸 **Odette Liu** 所有。  
This project is a personal development work, owned by **Odette**.

---

*打造更直觀的 Mermaid 圖表編輯體驗 / Creating a more intuitive Mermaid diagram editing experience* ✨
