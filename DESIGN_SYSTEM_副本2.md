# 奥罗米亚智能农业价值链大数据平台 - 设计系统规范

## 项目概述

**项目名称**: Oromia Smart Agriculture Value Chain Big Data Platform (奥罗米亚智能农业价值链大数据平台)
**目标**: 为埃塞俄比亚奥罗米亚州打造现代化智慧农业管理平台
**技术栈**: Vue 3 + Element Plus + Vue I18n + Pinia + Vue Router

---

## 核心设计理念

### 主题定位
- **农业主题**: 以农业、生长、收获为核心视觉概念
- **现代化**: 简洁、专业的现代化界面设计
- **国际化**: 完整的中英文双语支持
- **响应式**: 适配桌面端、平板、移动端

### 色彩系统 (基于埃塞俄比亚国旗)

#### 主色调
```css
/* 主绿色 - 代表农业、生长、希望 */
--primary-green: #009A44;
--primary-green-light: #00b350;
--primary-green-dark: #008038;

/* 辅助黄色 - 代表收获、阳光、繁荣 */
--accent-yellow: #FEDD00;

/* 辅助红色 - 代表活力、创新 */
--accent-red: #DA121A;
--accent-red-light: #FF3D47;
--accent-red-dark: #C10F17;
```

#### 中性色
```css
/* 文字颜色 */
--text-primary: #303133;
--text-regular: #606266;
--text-secondary: #909399;
--text-placeholder: #C0C4CC;

/* 背景色 */
--bg-primary: #ffffff;
--bg-secondary: #f8fafb;
--border-color: rgba(0, 0, 0, 0.06);
```

#### 渐变色使用规范
```css
/* 绿色渐变 - 用于主要按钮、图标背景 */
background: linear-gradient(135deg, #009A44 0%, #00b350 100%);

/* 绿黄渐变 - 用于页面背景、卡片头部 */
background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);

/* 红色渐变 - 用于危险操作、退出登录 */
background: linear-gradient(135deg, #DA121A 0%, #FF3D47 100%);
```

## AI 提示词模板

当需要继续开发新页面时，使用以下提示词:

```
请基于《奥罗米亚智能农业价值链大数据平台设计系统规范》(DESIGN_SYSTEM.md) 帮我设计/重构 [页面路径] 页面。

要求:
1. 使用埃塞俄比亚国旗配色方案 (绿色 #009A44, 黄色 #FEDD00, 红色 #DA121A)
2. 应用农业主题的设计风格 (绿色渐变、圆角卡片、阴影效果)
3. 完整的中英文国际化支持 (使用 vue-i18n)
4. 响应式设计 (支持移动端、平板、桌面端)
5. 使用 Vue 3 Composition API + Element Plus
6. 遵循设计系统中的组件模式 (页面头部、信息卡片、对话框等)
7. 使用 Remix Icon 图标库
8. 先添加翻译文件,再实现页面组件

页面功能: [描述页面的具体功能需求]

请参考已实现的页面 (如 userDetails.vue, ModifyPassword.vue) 的设计风格保持一致性。
```

---

## 快速参考

### 颜色变量速查
```css
--primary-green: #009A44;      /* 主绿色 */
--primary-green-light: #00b350; /* 浅绿色 */
--accent-yellow: #FEDD00;       /* 黄色 */
--accent-red: #DA121A;          /* 红色 */
```

### 常用圆角
- 小圆角: `8px` (按钮、输入框)
- 中圆角: `12px` (小图标背景)
- 大圆角: `16px` (卡片、对话框)
- 超大圆角: `20px` (页面头部图标)

### 常用阴影
- 卡片阴影: `0 4px 20px rgba(0, 0, 0, 0.06)`
- 图标阴影: `0 8px 20px rgba(0, 154, 68, 0.25)`
- Hover 阴影: `0 12px 28px rgba(0, 154, 68, 0.12)`

### 常用间距
- 页面内边距: `32px 24px`
- 卡片内边距: `24px`
- 卡片间距: `24px`
- 元素间距: `16px`

---

**版本**: v1.0
**最后更新**: 2025-11-22
**维护者**: AI Assistant
