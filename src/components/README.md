# ResponsiveDialog 响应式弹窗组件

一个完美适配移动端和PC端的通用弹窗组件,基于 Element Plus Dialog 封装。

## 特性

✅ **自动适配**: 根据屏幕宽度自动切换PC/移动端模式 (断点: 768px)
✅ **移动端全屏**: 移动端自动全屏显示,提供最佳操作体验
✅ **内部滚动**: 移动端弹窗内容区域独立滚动,Header/Footer 固定
✅ **平滑滚动**: 启用原生触摸滚动优化 (`-webkit-overflow-scrolling: touch`)
✅ **灵活插槽**: 支持默认内容插槽和自定义 footer 插槽
✅ **响应式监听**: 自动监听窗口大小变化,实时更新显示模式

## 使用方法

### 基础用法

```vue
<template>
  <ResponsiveDialog
    v-model="dialogVisible"
    title="弹窗标题"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <!-- 弹窗内容 -->
    <p>这是弹窗内容</p>
  </ResponsiveDialog>
</template>

<script setup>
import { ref } from 'vue'
import ResponsiveDialog from '@/components/ResponsiveDialog.vue'

const dialogVisible = ref(false)

const handleConfirm = () => {
  console.log('确认')
  dialogVisible.value = false
}

const handleCancel = () => {
  console.log('取消')
}
</script>
```

### 自定义宽度

```vue
<ResponsiveDialog
  v-model="dialogVisible"
  title="大弹窗"
  width="800px"
>
  <!-- 内容 -->
</ResponsiveDialog>
```

### 自定义按钮文本

```vue
<ResponsiveDialog
  v-model="dialogVisible"
  title="确认操作"
  confirm-text="提交"
  cancel-text="放弃"
  @confirm="handleSubmit"
>
  <!-- 内容 -->
</ResponsiveDialog>
```

### 带加载状态的确认按钮

```vue
<template>
  <ResponsiveDialog
    v-model="dialogVisible"
    title="提交表单"
    :confirm-loading="loading"
    @confirm="handleSubmit"
  >
    <el-form :model="form">
      <!-- 表单内容 -->
    </el-form>
  </ResponsiveDialog>
</template>

<script setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    await submitForm()
    dialogVisible.value = false
  } finally {
    loading.value = false
  }
}
</script>
```

### 隐藏 Footer (仅展示内容)

```vue
<ResponsiveDialog
  v-model="dialogVisible"
  title="详情查看"
  :show-footer="false"
>
  <div class="detail-content">
    <!-- 详情内容 -->
  </div>
</ResponsiveDialog>
```

### 自定义 Footer

```vue
<ResponsiveDialog
  v-model="dialogVisible"
  title="自定义操作"
>
  <p>内容</p>

  <template #footer>
    <el-button @click="handleAction1">操作1</el-button>
    <el-button @click="handleAction2">操作2</el-button>
    <el-button type="primary" @click="handleAction3">操作3</el-button>
  </template>
</ResponsiveDialog>
```

### 禁用点击遮罩关闭

```vue
<ResponsiveDialog
  v-model="dialogVisible"
  title="重要操作"
  :close-on-click-modal="false"
>
  <p>必须通过按钮关闭</p>
</ResponsiveDialog>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue (v-model) | 弹窗显示状态 | Boolean | false |
| title | 弹窗标题 | String | '' |
| width | PC端弹窗宽度 (移动端自动100vw) | String | '600px' |
| closeOnClickModal | 点击遮罩是否关闭弹窗 | Boolean | false |
| showFooter | 是否显示底部按钮 | Boolean | true |
| confirmText | 确认按钮文本 (默认使用 i18n) | String | - |
| cancelText | 取消按钮文本 (默认使用 i18n) | String | - |
| confirmLoading | 确认按钮加载状态 | Boolean | false |

## Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 弹窗显示状态变化 | (value: boolean) |
| confirm | 点击确认按钮 | - |
| cancel | 点击取消按钮 | - |
| close | 弹窗关闭时 | - |

## Slots

| 插槽名 | 说明 |
|--------|------|
| default | 弹窗内容 |
| footer | 自定义底部按钮区域 |

## 完整示例 (表单场景)

```vue
<template>
  <div>
    <el-button type="primary" @click="openDialog">
      新增数据
    </el-button>

    <ResponsiveDialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑' : '新增'"
      width="800px"
      :confirm-loading="submitLoading"
      @confirm="handleSubmit"
      @cancel="handleCancel"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
      >
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="form.remark"
                type="textarea"
                :rows="3"
                placeholder="请输入备注"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </ResponsiveDialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import ResponsiveDialog from '@/components/ResponsiveDialog.vue'

const dialogVisible = ref(false)
const isEdit = ref(false)
const submitLoading = ref(false)
const formRef = ref(null)

const form = reactive({
  name: '',
  email: '',
  remark: ''
})

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
  ]
}

const openDialog = () => {
  isEdit.value = false
  resetForm()
  dialogVisible.value = true
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    submitLoading.value = true

    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1000))

    ElMessage.success('提交成功')
    dialogVisible.value = false
  } catch (error) {
    console.log('验证失败', error)
  } finally {
    submitLoading.value = false
  }
}

const handleCancel = () => {
  resetForm()
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.remark = ''
  formRef.value?.clearValidate()
}
</script>
```

## 移动端表现

- **宽度**: 自动设置为 `100vw`
- **高度**: 全屏 (`100vh`)
- **布局**: Flexbox 三段式布局
  - Header: 固定顶部 (`flex-shrink: 0`)
  - Body: 可滚动区域 (`flex: 1`, `overflow-y: auto`)
  - Footer: 固定底部 (`flex-shrink: 0`)
- **按钮**: 横向均分 (`flex: 1`)
- **滚动**: 启用平滑滚动 (`-webkit-overflow-scrolling: touch`)

## 设计考虑

### 为什么封装?

1. **一致性**: 统一项目中所有弹窗的移动端表现
2. **可维护性**: 集中管理弹窗样式和行为逻辑
3. **开发效率**: 减少重复代码,简化移动端适配
4. **用户体验**: 确保移动端用户获得原生般的体验

### 技术实现方案

#### PC端
- 使用 **Element Plus Dialog** 原生组件
- 自定义 wrapper 实现内容区域滚动
- 最大高度限制: `calc(100vh - 240px)`

#### 移动端
- **完全自定义实现**,不依赖 Element Plus Dialog
- 使用 **Teleport** 传送到 body
- 使用 **Flexbox** 三段式布局
- Header 和 Footer 固定,Body 独立滚动
- 支持从底部滑入/滑出动画

### 关键技术点

- **响应式检测**: `window.innerWidth <= 768`
- **条件渲染**: PC/移动端渲染不同组件 (`v-if="!isMobile"` vs `v-if="isMobile"`)
- **Teleport**: 移动端弹窗传送到 body,避免 z-index 问题
- **Flexbox 布局**: `flex-direction: column` + `flex: 1` 实现可靠滚动
- **触摸优化**: `-webkit-overflow-scrolling: touch` + `overscroll-behavior: contain`
- **过渡动画**: Vue Transition 实现滑入/滑出效果
- **事件清理**: 使用 `onBeforeUnmount` 移除监听器
- **双向绑定**: 使用 `computed` 实现 `v-model`

## 注意事项

⚠️ **滚动问题**: 如果内容区域有嵌套滚动,确保只在 `.dialog-body-wrapper` 的直接子元素设置滚动
⚠️ **Form 验证**: 在 `@confirm` 事件中手动触发表单验证
⚠️ **关闭时机**: `@cancel` 事件会自动关闭弹窗,`@confirm` 需要手动关闭
⚠️ **Loading 状态**: 使用 `confirm-loading` prop 防止重复提交
