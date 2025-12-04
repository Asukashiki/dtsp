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

---

## 组件设计模式

### 1. 页面头部 (Page Header)

**使用场景**: 所有主要页面的顶部标题区域

**结构模式**:
```vue
<div class="page-header">
  <div class="header-icon">
    <i class="ri-[icon-name]"></i>
  </div>
  <div class="header-content">
    <h1 class="page-title">{{ $t('section.title') }}</h1>
    <p class="page-subtitle">{{ $t('section.subtitle') }}</p>
  </div>
</div>
```

**样式规范**:
```css
.page-header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
  margin-bottom: 40px;
}

.header-icon {
  width: 80px;
  height: 64px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0, 154, 68, 0.25);
  flex-shrink: 0;
}

.header-icon i {
  font-size: 40px;
  color: white;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  color: #009A44;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 15px;
  color: #909399;
  margin: 0;
}
```

### 2. 信息卡片 (Info Card)

**使用场景**: 用于展示信息分组、功能模块

**结构模式**:
```vue
<div class="info-card">
  <div class="card-header">
    <div class="card-title">
      <i class="ri-[icon-name]"></i>
      <span>{{ $t('card.title') }}</span>
    </div>
  </div>
  <div class="card-body">
    <!-- 卡片内容 -->
  </div>
</div>
```

**样式规范**:
```css
.info-card {
  background: white;
  border-radius: 16px;
  border: 2px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 154, 68, 0.12);
  border-color: rgba(0, 154, 68, 0.2);
}

.card-header {
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
  border-bottom: 2px solid rgba(0, 154, 68, 0.1);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #009A44;
}

.card-title i {
  font-size: 22px;
}

.card-body {
  padding: 24px;
}
```

### 3. 信息项 (Info Item)

**使用场景**: 卡片内的单个信息字段展示

**结构模式**:
```vue
<div class="info-item">
  <div class="item-label">
    <i class="ri-[icon-name]"></i>
    {{ $t('field.label') }}
  </div>
  <div class="item-value">{{ value || '-' }}</div>
</div>

<!-- 可编辑的信息项 -->
<div class="info-item editable">
  <div class="item-label">
    <i class="ri-[icon-name]"></i>
    {{ $t('field.label') }}
  </div>
  <div class="item-value">{{ value || '-' }}</div>
  <el-button type="primary" plain size="small" @click="handleEdit">
    <i class="ri-edit-line"></i>
    {{ $t('common.edit') }}
  </el-button>
</div>
```

**样式规范**:
```css
.info-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.info-item:last-child {
  border-bottom: none;
}

.item-label {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
}

.item-label i {
  font-size: 18px;
  color: #009A44;
}

.item-value {
  flex: 1;
  font-size: 15px;
  color: #303133;
  font-weight: 500;
}

.info-item.editable {
  gap: 16px;
}

.info-item :deep(.el-button) {
  border-radius: 8px;
  font-weight: 600;
  border-color: #009A44;
  color: #009A44;
}

.info-item :deep(.el-button:hover) {
  background: rgba(0, 154, 68, 0.08);
  border-color: #009A44;
  color: #009A44;
}
```

### 4. 对话框 (Dialog)

**使用场景**: 修改信息、确认操作等弹窗

**结构模式**:
```vue
<el-dialog
  v-model="dialogVisible"
  width="560px"
  :close-on-click-modal="false"
  :before-close="handleClose"
  class="custom-dialog"
>
  <template #header>
    <div class="dialog-header">
      <div class="header-icon">
        <i class="ri-[icon-name]"></i>
      </div>
      <div class="header-title">
        {{ $t('dialog.title') }}
      </div>
    </div>
  </template>

  <!-- 对话框内容 -->
  <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
    <!-- 表单项 -->
  </el-form>

  <template #footer>
    <div class="dialog-footer">
      <el-button @click="handleCancel" size="large">
        {{ $t('common.cancel') }}
      </el-button>
      <el-button type="primary" @click="handleConfirm" :loading="loading" class="confirm-btn" size="large">
        <i class="ri-check-line"></i>
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </template>
</el-dialog>
```

**样式规范**:
```css
/* Dialog Header */
:deep(.el-dialog__header) {
  padding: 24px 24px 20px;
  margin: 0;
  border-bottom: 2px solid rgba(0, 154, 68, 0.1);
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
}

.dialog-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.25);
}

.header-icon i {
  font-size: 24px;
  color: white;
}

.header-title {
  font-size: 20px;
  font-weight: 700;
  color: #009A44;
}

/* Dialog Body */
:deep(.el-dialog__body) {
  padding: 32px 24px;
}

/* Dialog Footer */
:deep(.el-dialog__footer) {
  padding: 20px 24px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.dialog-footer {
  display: flex;
  justify-content: center;
  gap: 12px;
}

:deep(.el-button) {
  min-width: 120px;
  border-radius: 8px;
  font-weight: 600;
}

.confirm-btn {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border: none;
}

.confirm-btn:hover {
  background: linear-gradient(135deg, #008038 0%, #009A44 100%);
}

.confirm-btn i {
  margin-right: 4px;
}

/* Dialog */
:deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}
```

### 5. 表单输入 (Form Input)

**样式规范**:
```css
:deep(.el-form-item) {
  margin-bottom: 24px;
}

:deep(.el-form-item__label) {
  font-size: 15px;
  font-weight: 600;
  color: #606266;
  padding-bottom: 10px;
}

:deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1) inset;
  transition: all 0.3s ease;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #009A44 inset;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #009A44 inset;
}

:deep(.el-input__prefix) {
  color: #009A44;
  font-size: 18px;
}
```

### 6. 按钮系统

**主要按钮**:
```css
/* 绿色主按钮 */
.primary-btn {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  color: white;
}

.primary-btn:hover {
  background: linear-gradient(135deg, #008038 0%, #009A44 100%);
}

/* 红色危险按钮 */
.danger-btn {
  background: linear-gradient(135deg, #DA121A 0%, #FF3D47 100%);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  color: white;
}

.danger-btn:hover {
  background: linear-gradient(135deg, #C10F17 0%, #DA121A 100%);
}

/* 描边按钮 */
.outline-btn {
  border-color: #009A44;
  color: #009A44;
  border-radius: 8px;
  font-weight: 600;
  background: transparent;
}

.outline-btn:hover {
  background: rgba(0, 154, 68, 0.08);
  border-color: #009A44;
  color: #009A44;
}
```

---

## 响应式设计规范

### 断点定义
```css
/* 移动端 */
@media screen and (max-width: 768px) {
  /* 页面头部 */
  .page-header {
    padding: 24px 20px;
    gap: 16px;
  }

  .header-icon {
    width: 64px;
    height: 64px;
  }

  .header-icon i {
    font-size: 32px;
  }

  .page-title {
    font-size: 24px;
  }

  /* 卡片 */
  .card-header {
    padding: 16px 20px;
  }

  .card-body {
    padding: 20px;
  }

  /* 信息项 */
  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .info-item.editable {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .item-label {
    min-width: auto;
  }

  /* 对话框 */
  :deep(.el-dialog) {
    width: 90% !important;
  }

  .dialog-footer {
    flex-direction: column;
  }

  :deep(.el-button) {
    width: 100%;
  }
}

/* 平板 */
@media screen and (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 国际化规范

### Vue I18n 使用模式

**在模板中使用**:
```vue
<template>
  <div class="page-title">{{ $t('section.title') }}</div>
  <div class="page-subtitle">{{ $t('section.subtitle') }}</div>
</template>
```

**在脚本中使用**:
```javascript
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 在函数中使用
const errorMessage = t('userInfo.phoneFormat')
```

**表单验证中使用**:
```javascript
const rules = computed(() => ({
  phone: [
    { required: true, message: t('userInfo.enterNewPhone'), trigger: 'blur' },
    { validator: phoneValidator, trigger: 'blur' }
  ]
}))
```

### 翻译文件结构

**zh-CN.js / en-US.js**:
```javascript
export default {
  common: {
    confirm: '确认',
    cancel: '取消',
    edit: '编辑',
    // ...
  },

  [moduleName]: {
    title: '标题',
    subtitle: '副标题',
    [fieldName]: '字段名',
    // ...
  }
}
```

---

## 常用图标映射 (Remix Icon)

### 功能图标
```javascript
const iconMap = {
  // 用户相关
  user: 'ri-user-line',
  userSettings: 'ri-user-settings-line',
  userInfo: 'ri-user-3-line',

  // 身份认证
  identity: 'ri-shield-user-line',
  password: 'ri-lock-password-line',
  security: 'ri-shield-check-line',

  // 联系方式
  phone: 'ri-phone-line',
  email: 'ri-mail-line',

  // 信息类型
  department: 'ri-building-line',
  employeeId: 'ri-id-card-line',

  // 操作
  edit: 'ri-edit-line',
  delete: 'ri-delete-bin-line',
  check: 'ri-check-line',
  close: 'ri-close-line',

  // 系统
  home: 'ri-home-line',
  notification: 'ri-notification-3-line',
  todo: 'ri-time-line',
  done: 'ri-checkbox-circle-line',

  // 农业相关
  farm: 'ri-plant-line',
  seed: 'ri-seedling-line',
  data: 'ri-database-2-line',
  chart: 'ri-bar-chart-line',
}
```

---

## 通用组件代码模板

### 完整页面组件模板
```vue
<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-icon">
          <i class="ri-[icon-name]"></i>
        </div>
        <div class="header-content">
          <h1 class="page-title">{{ $t('module.title') }}</h1>
          <p class="page-subtitle">{{ $t('module.subtitle') }}</p>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="content-grid">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-[icon-name]"></i>
              <span>{{ $t('module.cardTitle') }}</span>
            </div>
          </div>
          <div class="card-body">
            <!-- Card content -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// State
const loading = ref(false)

// Methods
const fetchData = async () => {
  loading.value = true
  try {
    // Fetch logic
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.page-container {
  min-height: calc(100vh - 200px);
  background: linear-gradient(to bottom, #f8fafb 0%, #ffffff 100%);
  padding: 32px 24px;
}

.page-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

/* Page Header */
.page-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 154, 68, 0.25);
  flex-shrink: 0;
}

.header-icon i {
  font-size: 40px;
  color: white;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  color: #009A44;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 15px;
  color: #909399;
  margin: 0;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

/* Info Card */
.info-card {
  background: white;
  border-radius: 16px;
  border: 2px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 154, 68, 0.12);
  border-color: rgba(0, 154, 68, 0.2);
}

.card-header {
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
  border-bottom: 2px solid rgba(0, 154, 68, 0.1);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #009A44;
}

.card-title i {
  font-size: 22px;
}

.card-body {
  padding: 24px;
}

/* Responsive */
@media screen and (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 768px) {
  .page-container {
    padding: 16px;
  }

  .page-header {
    padding: 24px 20px;
    gap: 16px;
  }

  .header-icon {
    width: 64px;
    height: 64px;
  }

  .header-icon i {
    font-size: 32px;
  }

  .page-title {
    font-size: 24px;
  }

  .card-header {
    padding: 16px 20px;
  }

  .card-body {
    padding: 20px;
  }
}
</style>
```

### 对话框组件模板
```vue
<template>
  <el-dialog
    v-model="dialogVisible"
    width="560px"
    :close-on-click-modal="false"
    :before-close="handleClose"
    class="custom-dialog"
  >
    <template #header>
      <div class="dialog-header">
        <div class="header-icon">
          <i class="ri-[icon-name]"></i>
        </div>
        <div class="header-title">
          {{ $t('dialog.title') }}
        </div>
      </div>
    </template>

    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      class="dialog-form"
    >
      <el-form-item :label="$t('form.field')" prop="field">
        <el-input
          v-model="form.field"
          :placeholder="$t('form.placeholder')"
          size="large"
        >
          <template #prefix>
            <i class="ri-[icon-name]"></i>
          </template>
        </el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose" size="large">
          {{ $t('common.cancel') }}
        </el-button>
        <el-button type="primary" @click="handleConfirm" :loading="loading" class="confirm-btn" size="large">
          <i class="ri-check-line"></i>
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const { t } = useI18n()
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible', 'confirm'])
const dialogVisible = ref(props.visible)
const loading = ref(false)
const formRef = ref(null)

const form = ref({
  field: ''
})

const rules = computed(() => ({
  field: [
    { required: true, message: t('form.required'), trigger: 'blur' }
  ]
}))

watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val
    if (val) {
      resetForm()
    }
  }
)

watch(
  () => dialogVisible.value,
  (val) => {
    emit('update:visible', val)
  }
)

const handleClose = () => {
  dialogVisible.value = false
  formRef.value?.resetFields()
}

const handleConfirm = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true
    try {
      // API call
      ElMessage.success(t('common.success'))
      emit('confirm', form.value)
      handleClose()
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  } catch (error) {
    console.log('Validation failed', error)
  }
}

const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  form.value = { field: '' }
}
</script>

<style scoped>
/* Dialog Header */
:deep(.el-dialog__header) {
  padding: 24px 24px 20px;
  margin: 0;
  border-bottom: 2px solid rgba(0, 154, 68, 0.1);
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
}

.dialog-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.25);
}

.header-icon i {
  font-size: 24px;
  color: white;
}

.header-title {
  font-size: 20px;
  font-weight: 700;
  color: #009A44;
}

/* Dialog Body */
:deep(.el-dialog__body) {
  padding: 32px 24px;
}

.dialog-form {
  padding: 0;
}

:deep(.el-form-item) {
  margin-bottom: 24px;
}

:deep(.el-form-item__label) {
  font-size: 15px;
  font-weight: 600;
  color: #606266;
  padding-bottom: 10px;
}

:deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1) inset;
  transition: all 0.3s ease;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #009A44 inset;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #009A44 inset;
}

:deep(.el-input__prefix) {
  color: #009A44;
  font-size: 18px;
}

/* Dialog Footer */
:deep(.el-dialog__footer) {
  padding: 20px 24px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.dialog-footer {
  display: flex;
  justify-content: center;
  gap: 12px;
}

:deep(.el-button) {
  min-width: 120px;
  border-radius: 8px;
  font-weight: 600;
}

.confirm-btn {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border: none;
}

.confirm-btn:hover {
  background: linear-gradient(135deg, #008038 0%, #009A44 100%);
}

.confirm-btn i {
  margin-right: 4px;
}

/* Dialog */
:deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

/* Responsive */
@media screen and (max-width: 768px) {
  :deep(.el-dialog) {
    width: 90% !important;
  }

  .dialog-footer {
    flex-direction: column;
  }

  :deep(.el-button) {
    width: 100%;
  }
}
</style>
```

---

## 开发流程和最佳实践

### 1. 新页面开发流程
1. **添加翻译**: 先在 `zh-CN.js` 和 `en-US.js` 中添加所有需要的翻译键
2. **复制模板**: 使用页面组件模板作为起点
3. **应用主题**: 使用设计系统中定义的颜色和样式
4. **实现逻辑**: 添加数据获取、表单验证等业务逻辑
5. **测试响应式**: 在不同屏幕尺寸下测试布局
6. **测试国际化**: 切换语言确保所有文本都已翻译

### 2. 表单验证最佳实践
```javascript
// 使用 computed 确保验证消息响应语言变化
const rules = computed(() => ({
  field: [
    { required: true, message: t('form.fieldRequired'), trigger: 'blur' },
    { validator: customValidator, trigger: 'blur' }
  ]
}))

// 自定义验证器
const customValidator = (rule, value, callback) => {
  if (!value) {
    callback(new Error(t('form.fieldRequired')))
  } else if (!pattern.test(value)) {
    callback(new Error(t('form.fieldInvalid')))
  } else {
    callback()
  }
}
```

### 3. API 调用模式
```javascript
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true

    try {
      const res = await apiCall(form.value)
      if (res.code === 200) {
        ElMessage.success(t('common.success'))
        emit('confirm', form.value)
        handleClose()
      }
    } catch (error) {
      console.error(error)
      // ElMessage.error(t('common.failed'))
    } finally {
      loading.value = false
    }
  } catch (error) {
    console.log('Validation failed', error)
  }
}
```

### 4. 状态管理 (Pinia)
```javascript
import { useUserStore } from '@/store'

const userStore = useUserStore()

// 获取用户信息
await userStore.fetchUserInfo()
const userInfo = userStore.userInfo?.user || {}

// 更新用户信息
userStore.setUserInfo(updatedInfo)

// 登出
userStore.logoutAndRedirect()
```

---

## 已实现页面清单

### 核心页面
- ✅ **Header.vue** - 导航栏 (绿色主题、国际化、下拉菜单)
- ✅ **Footer.vue** - 页脚 (农业主题、联系信息)
- ✅ **Home.vue** - 首页 (英雄区、系统入口、操作指南)

### 身份认证模块
- ✅ **identity/index.vue** - 身份认证主页
- ✅ **identity/farmer.vue** - 农民认证
- ✅ **identity/supplier.vue** - 供应商认证
- ✅ **identity/buyer.vue** - 收购商认证

### 用户信息模块
- ✅ **userDetails.vue** - 用户信息页面 (完整页面布局)
- ✅ **ModifyContact.vue** - 修改联系方式对话框
- ✅ **ModifyPassword.vue** - 修改密码对话框

### 数据列表
- ✅ **dataList.vue** - 系统公告/待办/已办列表

---

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
