# 奥罗米亚智能农业价值链大数据平台 - 重构说明

## 项目概述

本项目是为埃塞俄比亚奥罗米亚州开发的智能农业价值链大数据平台，旨在通过数字化技术提升农业生产效率，优化供应链管理，促进农业可持续发展。

## 最近更新 (2025-11-22)

### 1. 国际化支持

- ✅ 更新了中文语言包 (`src/locales/zh-CN.js`)
- ✅ 更新了英文语言包 (`src/locales/en-US.js`)
- ✅ 添加了完整的农业平台相关翻译
- ✅ 支持语言切换功能（中文/English）

### 2. UI/UX 重新设计

#### Header 组件 (`src/components/Header.vue`)
- 🎨 采用农业主题配色（绿色 #009A44 + 黄色 #FEDD00）
- 🌱 添加农业相关图标（植物图标）
- ✨ 优化视觉效果和交互动画
- 📱 完整的响应式布局支持

#### Footer 组件 (`src/components/Footer.vue`)
- 🎨 农业主题配色
- 📍 联系信息展示
- 🏷️ 平台标签（Smart Agriculture, Ethiopia, Big Data Platform）
- 📱 响应式布局

#### Home 首页 (`src/views/home/Home.vue`)
- 🏆 Hero 区域：展示平台标题和愿景
- 📢 系统公告板块：展示最新公告和动态
- 🎯 系统入口板块：7个核心系统模块
  - 系统门户
  - 研究与开发
  - 农业投入品供应
  - 生产管理
  - 采购管理
  - 产品追溯
  - 数据服务
- 📚 操作指南板块：4个文档类型
  - 用户手册
  - 农民指南
  - 供应商指南
  - API文档

### 3. 设计主题

#### 配色方案
```css
/* 主色调 - 基于埃塞俄比亚国旗 */
--primary-green: #009A44;  /* 绿色 - 代表农业和成长 */
--primary-yellow: #FEDD00; /* 黄色 - 代表丰收和希望 */
--primary-red: #DA121A;    /* 红色 - 代表活力和创新 */
```

#### 视觉特点
- 🌿 农业元素图标（植物、种子、叶子等）
- 🎨 渐变色背景提升视觉层次
- ✨ 流畅的动画效果
- 📐 卡片式布局，清晰易读
- 🎯 悬停效果增强交互体验

### 4. 技术栈

- **框架**: Vue 3 + Composition API
- **UI 组件**: Element Plus
- **样式**: Tailwind CSS + Scoped CSS
- **图标**: Remix Icon
- **国际化**: Vue I18n
- **状态管理**: Pinia
- **路由**: Vue Router

## 项目结构

```
src/
├── components/          # 公共组件
│   ├── Header.vue      # 头部导航（重构）
│   ├── Footer.vue      # 底部页脚（重构）
│   └── ...
├── views/
│   └── home/
│       ├── Home.vue    # 首页（重构）
│       └── components/
│           └── AnnouncementDetail.vue
├── locales/            # 国际化语言文件
│   ├── zh-CN.js       # 中文（更新）
│   └── en-US.js       # 英文（更新）
├── i18n/              # i18n 配置
│   └── index.js
├── api/               # API 接口
├── store/             # 状态管理
└── style.css          # 全局样式
```

## 使用指南

### 启动项目

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 语言切换

点击 Header 右上角的语言切换按钮，可在中文和英文之间切换。语言设置会保存到 localStorage。

### 响应式设计

- 桌面端 (>1200px): 完整布局
- 平板端 (768px-1200px): 优化布局
- 移动端 (<768px): 简化布局，隐藏非必要元素

## 核心功能模块

### 1. 系统门户
用户注册、登录、身份认证及信息管理

### 2. 研究与开发
品种管理、育种管理及种子信息服务

### 3. 农业投入品供应
投入品管理、库存管理及供应链追溯

### 4. 生产管理
农事记录、生产计划及作物监测

### 5. 采购管理
采购订单、供应商管理及合同管理

### 6. 产品追溯
全程追溯、质量检测及溯源查询

### 7. 数据服务
数据采集、分析展示及决策支持

## 下一步计划

- [ ] 实现各系统模块的具体功能
- [ ] 接入后端 API
- [ ] 添加数据可视化大屏
- [ ] 完善用户权限管理
- [ ] 移动端 App 开发

## 联系信息

- **项目**: Oromia Smart Agriculture Value Chain Big Data Platform
- **开发**: Inspur Software Technology Co., Ltd.
- **年份**: 2025

---

**注意**: 本项目基于文档 "Oromia Smart Agriculture Value Chain Big Data Platform Functional Requirement Specification (FRS) V1.7" 开发。
