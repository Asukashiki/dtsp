# 快速启动指南

## 安装依赖

由于在 WSL 环境中可能遇到文件锁定问题，建议按以下步骤操作：

### 方法 1：在 Windows PowerShell 中运行（推荐）

```powershell
# 打开 Windows PowerShell
cd D:\docs\a-work\inspur\code\2025\dtsp

# 清理并重新安装
Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue
npm install

# 启动开发服务器
npm run dev
```

### 方法 2：在 WSL 中运行

```bash
# 如果遇到删除问题，直接重新安装
cd /mnt/d/docs/a-work/inspur/code/2025/dtsp

# 尝试修复依赖
npm install --force

# 或者使用 pnpm（更推荐）
npm install -g pnpm
pnpm install
pnpm dev
```

## 测试国际化功能

启动成功后，访问 http://localhost:5173

1. **查看 Header**
   - 右上角应该有语言切换按钮（中文/English）
   - 点击可以切换语言

2. **测试功能**
   - 切换语言后，所有文本应立即更新
   - 刷新页面，语言选择应该保持

3. **用户菜单**
   - 点击右上角用户头像
   - 应显示下拉菜单：个人信息、修改密码、退出登录

## 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录

## 问题排查

### 如果遇到 rollup 错误

```bash
# 删除 node_modules 和 lock 文件
rm -rf node_modules package-lock.json

# 清理 npm 缓存
npm cache clean --force

# 重新安装
npm install
```

### 如果遇到 Tailwind CSS 错误

确保 `tailwind.config.js` 和 `postcss.config.js` 存在且配置正确。

### 如果遇到 i18n 相关错误

检查以下文件是否存在：
- `/src/i18n/index.js`
- `/src/locales/zh-CN.js`
- `/src/locales/en-US.js`
- `/src/store/locale.js`

## 开发提示

### 添加新的翻译文本

1. 编辑 `/src/locales/zh-CN.js`：
```javascript
export default {
  // ... 现有内容
  myNewSection: {
    title: '我的新标题',
    description: '我的新描述',
  }
}
```

2. 编辑 `/src/locales/en-US.js`：
```javascript
export default {
  // ... 现有内容
  myNewSection: {
    title: 'My New Title',
    description: 'My New Description',
  }
}
```

3. 在组件中使用：
```vue
<template>
  <div>
    <h1>{{ $t('myNewSection.title') }}</h1>
    <p>{{ $t('myNewSection.description') }}</p>
  </div>
</template>
```

### 在 JavaScript 中使用翻译

```vue
<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 使用
const title = computed(() => t('myNewSection.title'))
</script>
```

## 预览效果

### Header 设计
- 高度：70px
- 背景：毛玻璃效果 + 渐变
- Logo：32px，带渐变色标题
- 导航：悬浮效果 + 激活状态指示器
- 用户信息：36px 头像 + 下拉菜单
- 语言切换：图标 + 文字，悬浮动画

### Footer 设计
- 背景：深色渐变
- 图标：渐变色
- 文字：半透明白色
- 响应式布局

### 整体风格
- 现代化、简洁
- 流畅的动画效果
- 良好的可访问性
- 完整的响应式支持

---

如有问题，请查看 `INTERNATIONALIZATION_REPORT.md` 获取详细信息。
