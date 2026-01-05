# 页面重构规范指南

本文档提供页面 UI 布局重构的标准规范，确保所有页面样式统一。

> **重要说明**：
> - 本文档仅规范页面的 UI 布局和样式
> - **不要修改业务功能逻辑**，保留原有的功能代码
> - **不要修改国际化**，国际化已定义好，直接使用原本的国际化 key
> - 只修改模板结构和样式引用

---

## 一、页面类型

| 类型 | 说明 | 参考文件 |
|------|------|----------|
| 普通列表页 | 无状态标签页 | `batch/index.vue` |
| 审核列表页 | 有状态标签页（StatusTabs） | `batch/approve.vue` |
| 新增/编辑页 | 表单页面，两列布局 | `batch/form.vue` |
| 详情页 | 展示页面，两列布局 | `batch/detail.vue` |

---

## 二、普通列表页结构

```vue
<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-xxx-line"
        :title="$t('xxx.title')"
        :subtitle="$t('xxx.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片（无标题） -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('xxx.columns.field1')">
              <!-- 保留原有的输入控件 -->
            </SearchItem>
            <!-- 保留其他搜索项... -->
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('xxx.list')" icon="ri-file-list-3-line">
          <template #actions>
            <!-- 保留原有的操作按钮 -->
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('xxx.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="dataList" stripe v-loading="loading">
              <!-- 保留原有列... -->
              <el-table-column :label="$t('xxx.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="row.workflowStatus"
                    mode="list"
                    :show-audit="false"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-wrapper"><!-- 保留原有分页 --></div>
          </div>
        </InfoCard>

        <!-- 移动端卡片（如有） -->
        <div class="mobile-card-list mobile-only">
          <!-- 保留原有移动端卡片结构 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 新增引入
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

// ⚠️ 保留原有的所有业务逻辑代码，不要修改
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
```

### ActionButtons 组件使用说明

#### 组件引入（必须使用标准组件）

```javascript
// ✅ 正确 - 使用标准工作流组件
import ActionButtons from '@/components/workflow/ActionButtons.vue'

// ❌ 错误 - 不要使用自定义本地组件
import ActionButtons from './components/ActionButtons.vue'
```

#### 组件属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `workflow-status` | String | 当前行的工作流状态（S0/S1/S2/S3/S9/S10） |
| `mode` | String | 固定为 `"list"` |
| `show-audit` | Boolean | 普通列表页设为 `false`，审核列表页设为 `true` |

#### 使用示例

```vue
<!-- PC端表格操作列 -->
<el-table-column :label="$t('xxx.columns.actions')" width="240" fixed="right">
  <template #default="{ row }">
    <ActionButtons
      :workflow-status="row.workflowStatus || 'S0'"
      mode="list"
      :show-audit="false"
      @action="(action) => handleAction(row, action)" />
  </template>
</el-table-column>

<!-- 移动端卡片操作区 -->
<div class="mobile-card-footer">
  <ActionButtons
    :workflow-status="item.workflowStatus || 'S0'"
    mode="list"
    :show-audit="false"
    @action="(action) => handleAction(item, action)" />
</div>
```

#### 事件处理（必须添加）

```javascript
// 统一的动作处理方法
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
    case 'edit':
      handleEdit(row)
      break
    case 'submit':
      handleSubmitForAudit(row)  // 提交审核
      break
    case 'audit':
      handleAudit(row)           // 进入审核页面
      break
    case 'approve':
      handleApprove(row)         // 审核通过
      break
    case 'reject':
      handleReject(row)          // 审核驳回
      break
    case 'archive':
      handleArchive(row)         // 归档
      break
    case 'cancelBatch':
      handleCancelBatch(row)     // 作废
      break
  }
}
```

---

## 三、审核列表页结构（带状态标签页）

```vue
<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-list-check-2"
        :title="$t('xxx.audit.title')"
        :subtitle="$t('xxx.audit.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片（无标题） -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <!-- 保留原有搜索项... -->
          </SearchForm>
        </div>

        <!-- 列表卡片（注意：no-padding="true"） -->
        <InfoCard
          :title="$t('xxx.list')"
          icon="ri-file-list-3-line"
          :no-padding="true">
          
          <!-- 状态标签页 -->
          <StatusTabs
            v-model="activeTab"
            :tabs="tabConfig"
            @tab-change="handleTabChange" />

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="dataList" stripe v-loading="loading">
              <!-- 保留原有列... -->
              <el-table-column :label="$t('xxx.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="row.workflowStatus"
                    mode="list"
                    :is-voided-tab="activeTab === 'voided'"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-wrapper"><!-- 保留原有分页 --></div>
          </div>
        </InfoCard>

        <!-- 移动端卡片（如有） -->
      </div>
    </div>
  </div>
</template>

<script setup>
// 新增引入
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import StatusTabs from '@/components/workflow/StatusTabs.vue'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

// ⚠️ 保留原有的所有业务逻辑代码

// 标签页配置（根据实际业务调整）
const tabConfig = [
  { name: 'pendingApproval', label: 'xxx.tabs.pendingApproval', icon: 'ri-time-line' },
  { name: 'voided', label: 'xxx.tabs.voided', icon: 'ri-forbid-line' },
  { name: 'approved', label: 'xxx.tabs.approved', icon: 'ri-check-line' }
]
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
```

### StatusTabs 组件属性说明

| 属性 | 类型 | 说明 |
|------|------|------|
| `v-model` | String | 当前激活的标签页名称 |
| `tabs` | Array | 标签页配置数组 |

### 标签页配置格式

```javascript
const tabConfig = [
  {
    name: 'pendingApproval',  // 标签页唯一标识
    label: 'xxx.tabs.pendingApproval',  // 国际化 key
    icon: 'ri-time-line',  // Remix Icon 图标
    count: 5  // 可选：显示数量徽章
  }
]
```

---

## 四、新增/编辑页结构

```vue
<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ pageTitle }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" v-loading="loading">
          
          <!-- 基本信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('xxx.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <!-- 两列布局 -->
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('xxx.form.field1')" prop="field1">
                    <!-- 保留原有输入控件 -->
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('xxx.form.field2')" prop="field2">
                    <!-- 保留原有输入控件 -->
                  </el-form-item>
                </el-col>
                <!-- 更多字段... -->
              </el-row>
            </div>
          </div>

          <!-- 其他信息卡片（如有） -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-xxx-line"></i>
                <span>{{ $t('xxx.form.otherInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <!-- 保留原有内容 -->
            </div>
          </div>

          <!-- 工作流信息（编辑模式下显示） -->
          <div class="info-card" v-if="showWorkflowInfo">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-git-commit-line"></i>
                <span>{{ $t('xxx.form.workflowInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <!-- 审批意见输入框（仅在审批模式下显示） -->
              <div v-if="pageMode === 'audit'">
                <el-form-item :label="$t('xxx.form.approvalComment')" prop="approvalComment">
                  <el-input 
                    v-model="formData.approvalComment" 
                    type="textarea" 
                    :rows="4" 
                    :placeholder="$t('xxx.placeholder.approvalComment')" />
                </el-form-item>
              </div>

              <!-- 历史审批信息 -->
              <div class="mb-4">
                <h4 class="mb-3">{{ $t('xxx.form.approvalHistory') }}</h4>
                <el-table :data="approvalHistory" border stripe>
                  <el-table-column :label="$t('xxx.form.approver')" prop="approver" width="200" />
                  <el-table-column :label="$t('xxx.form.approvalTime')" prop="approvalTime" width="250" />
                  <el-table-column :label="$t('xxx.form.comment')" prop="comment" />
                </el-table>
              </div>
            </div>
          </div>

          <!-- 操作按钮区域（固定在底部） -->
          <div class="form-actions">
            <el-button v-for="button in getActionButtons()" :key="button.action"
              :type="button.type" @click="handleAction(button.action)"
              :loading="submitLoading && button.action === 'save'">
              {{ $t(`common.${button.label}`) }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
// ⚠️ 保留原有的所有业务逻辑代码

// 根据页面模式返回不同的按钮
const getActionButtons = () => {
  const mode = pageMode.value

  // 新建/编辑模式
  if (mode === 'add' || mode === 'edit') {
    return [
      { type: '', label: 'cancel', action: 'cancel' },
      { type: 'primary', label: 'save', action: 'save' }
    ]
  }

  // 审批模式
  if (mode === 'audit') {
    return [
      { type: '', label: 'cancel', action: 'cancel' },
      { type: 'success', label: 'approve', action: 'approve' },
      { type: 'danger', label: 'reject', action: 'reject' }
    ]
  }

  // 查看模式
  if (mode === 'view') {
    return [
      { type: '', label: 'cancel', action: 'cancel' },
      { type: 'primary', label: 'archive', action: 'archive' },
      { type: 'danger', label: 'void', action: 'cancelBatch' }
    ]
  }

  return [
    { type: '', label: 'cancel', action: 'cancel' },
    { type: 'primary', label: 'save', action: 'save' }
  ]
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
```

> **注意**：`.form-actions` 样式已在 `page-common.scss` 中统一定义，包含白色背景、圆角和阴影效果，无需在页面中重复定义。

### 页面模式判断逻辑

```javascript
// 根据路由路径和参数判断页面模式
const pageMode = computed(() => {
  // 优先使用 query 参数
  if (route.query.mode) {
    return route.query.mode
  }
  // 根据路由路径判断
  if (route.path.includes('/audit/')) {
    return 'audit'
  }
  if (route.path.includes('/detail/')) {
    return 'view'
  }
  // 默认逻辑
  return isEdit.value ? 'edit' : 'add'
})

const isReadOnly = computed(() => pageMode.value === 'audit' || pageMode.value === 'view')
```

---

## 五、详情页结构

```vue
<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('xxx.detail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 基本信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>{{ $t('xxx.form.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <!-- 使用 el-descriptions 两列布局展示 -->
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('xxx.form.field1')">
                {{ detailData.field1 }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('xxx.form.field2')">
                {{ detailData.field2 }}
              </el-descriptions-item>
              <!-- 更多字段... -->
            </el-descriptions>
          </div>
        </div>

        <!-- 元数据信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>{{ $t('xxx.form.metadataInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('xxx.form.createBy')">
                {{ detailData.createBy || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('xxx.form.createTime')">
                {{ detailData.createTime || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('xxx.form.updateBy')">
                {{ detailData.updateBy || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('xxx.form.updateTime')">
                {{ detailData.updateTime || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 工作流信息（使用 WorkflowInfo 组件） -->
        <WorkflowInfo
          :workflow-status="detailData.workflowStatus"
          mode="view"
          :approval-history="approvalHistory"
          :hide-for-states="['S0', 'S10']" />

        <!-- ⚠️ 注意：详情页/查看页面不显示底部操作按钮 -->
        <!-- 用户通过页面头部的返回按钮或浏览器返回 -->
      </div>
    </div>
  </div>
</template>

<script setup>
import WorkflowInfo from '@/components/workflow/WorkflowInfo.vue'

// ⚠️ 保留原有的所有业务逻辑代码
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
</style>
```

### WorkflowInfo 组件属性说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `workflow-status` | String | `''` | 当前工作流状态 |
| `mode` | String | `'view'` | 页面模式：`'add'`, `'edit'`, `'audit'`, `'view'` |
| `approval-history` | Array | `[]` | 审批历史记录 |
| `hide-for-states` | Array | `['S0', 'S10']` | 隐藏工作流信息的状态列表 |
| `v-model` | String | `''` | 审批意见（audit 模式下使用） |
| `comment-required` | Boolean | `true` | 审批意见是否必填 |

---

## 六、组件引入汇总

```javascript
// 通用组件（必须）
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'

// 工作流组件（列表页需要）
import ActionButtons from '@/components/workflow/ActionButtons.vue'

// 审核页面需要
import StatusTabs from '@/components/workflow/StatusTabs.vue'

// 详情页/表单页工作流信息
import WorkflowInfo from '@/components/workflow/WorkflowInfo.vue'
```

---

## 七、样式引入汇总

```scss
// 列表页（普通/审核）
<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>

// 表单页（新增/编辑）
<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>

// 详情页
<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
</style>
```

> **说明**：`.form-actions` 样式已在 `page-common.scss` 中统一定义，包含白色背景、圆角和阴影效果。

---

## 八、关键样式规范

| 元素 | 规范 |
|------|------|
| 页面头部高度 | 128px |
| 页面头部图标 | 80x80px, 圆角24px |
| 内容区域内边距 | 20px（底部为0） |
| 卡片间距 | 20px |
| 表格操作列宽度 | 240px |
| 表头背景色 | #E5F4EC |
| 表头字体颜色 | #009A44 |
| 表单两列布局 | `el-row :gutter="20"` + `el-col :xs="24" :sm="12"` |
| 详情两列布局 | `el-descriptions :column="2" border` |
| 操作按钮区域 | 白色背景、圆角8px、阴影效果 |

---

## 九、重构步骤

### 列表页重构

1. **修改模板结构**
   - 用 `PageHeader` 替换原有头部
   - 用 `SearchForm` + `SearchItem` 包裹搜索区域
   - 用 `InfoCard` 包裹列表区域
   - 审核页面添加 `StatusTabs`，并设置 `:no-padding="true"`
   - **操作列必须使用标准 `ActionButtons` 组件**

2. **修改 script**
   - 添加组件引入（**必须使用** `@/components/workflow/ActionButtons.vue`）
   - 添加 `handleAction` 统一处理方法
   - **保留所有原有业务逻辑**

3. **修改 style**
   - 替换为三个样式文件引入
   - 删除原有的重复样式

### 列表页操作按钮重构清单

- [ ] 引入标准 ActionButtons：`import ActionButtons from '@/components/workflow/ActionButtons.vue'`
- [ ] 删除自定义 ActionButtons 引入（如果有）
- [ ] 在表格操作列使用标准属性：`:workflow-status`、`mode="list"`、`:show-audit`
- [ ] 使用 `@action` 事件替代多个独立事件
- [ ] 添加 `handleAction` 方法统一处理所有按钮动作
- [ ] 移动端卡片也使用相同的 ActionButtons 配置

### 表单页重构

1. **修改模板结构**
   - 使用带返回按钮的页面头部
   - 用 `info-card` 包裹表单区域
   - 使用 `el-row` + `el-col` 实现两列布局
   - 底部添加 `form-actions` 操作按钮区域

2. **修改 script**
   - 添加 `pageMode` 计算属性判断页面模式
   - 添加 `getActionButtons` 方法返回不同模式的按钮
   - **保留所有原有业务逻辑**

3. **修改 style**
   - 引入 `page-common.scss`
   - 添加 `form-actions` 样式

### 详情页重构

1. **修改模板结构**
   - 使用带返回按钮的页面头部
   - 用 `info-card` 包裹内容区域
   - 使用 `el-descriptions` 实现两列展示
   - 使用 `WorkflowInfo` 组件显示工作流信息

2. **修改 script**
   - 引入 `WorkflowInfo` 组件
   - **保留所有原有业务逻辑**

3. **修改 style**
   - 引入 `page-common.scss` 和 `workflow-common.scss`

---

## 十、注意事项

### ⚠️ 不要修改

- 业务功能逻辑
- 国际化 key
- API 调用
- 数据处理逻辑
- 原有的事件处理函数
- 表单验证规则
- **不要擅自添加分块卡片**（包括：标题、字段等信息），有的话保留，没有就不要擅自添加
- **详情页不要添加编辑按钮**，详情页仅用于展示数据

### ✅ 只修改

- 模板结构（使用新组件包裹）
- 样式引入
- 组件引入
- 页面头部结构
- 操作按钮区域布局

---

## 十一、参考文件

| 类型 | 文件路径 |
|------|----------|
| 普通列表页 | `src/views/research/breeding-data/batch/index.vue` |
| 审核列表页 | `src/views/research/breeding-data/batch/approve.vue` |
| 新增/编辑页 | `src/views/research/breeding-data/batch/form.vue` |
| 详情页 | `src/views/research/breeding-data/batch/detail.vue` |
| 通用组件 | `src/components/common/` |
| 工作流组件 | `src/components/workflow/` |
| 样式文件 | `src/assets/styles/` |

---

## 十三、工作流状态与按钮配置

### 工作流状态说明

| 状态码 | 说明 | 标签类型 |
|--------|------|----------|
| S0 | 草稿 | info (灰色) |
| S1 | 待审批 | warning (橙色) |
| S2 | 审核通过 | primary (蓝色) |
| S3 | 审核驳回 | danger (红色) |
| S9 | 已归档 | danger (深红色) |
| S10 | 已作废 | danger (深红色) |

### ActionButtons 动作类型

| 动作 | 说明 | 触发场景 |
|------|------|----------|
| `view` | 查看详情 | 所有已提交/审核的记录 |
| `edit` | 编辑 | 草稿、驳回状态 |
| `submit` | 提交审核 | 草稿、驳回状态 |
| `audit` | 进入审核页面 | 待审批状态（审核列表页） |
| `approve` | 审核通过 | 待审批状态（审核页面） |
| `reject` | 审核驳回 | 待审批状态（审核页面） |
| `archive` | 归档 | 审核通过状态 |
| `cancelBatch` | 作废 | 草稿、待审批、驳回状态 |

### 列表页按钮显示规则

| 状态 | 普通列表页按钮 | 审核列表页按钮 |
|------|----------------|----------------|
| S0 (草稿) | 编辑、提交、作废 | 编辑、提交 |
| S1 (待审批) | 查看、作废 | 审核 |
| S2 (审核通过) | 查看 | 查看 |
| S3 (审核驳回) | 编辑、提交、作废 | 编辑 |
| S9 (已归档) | 查看 | 查看 |
| S10 (已作废) | 查看 | 查看 |

### 表单页按钮配置

| 模式 | 按钮 |
|------|------|
| add/edit | 取消、保存 |
| audit | 取消、通过、驳回 |
| view | 取消、归档、作废 |

### 完整实现示例

```javascript
// 提交审核
const handleSubmitForAudit = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('common.submitConfirm'),
      t('common.warning'),
      { type: 'warning' }
    )
    await submitForAudit(row.dataId)
    ElMessage.success(t('common.submitSuccess'))
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('common.submitFailed'))
    }
  }
}

// 作废
const handleCancelBatch = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('common.cancelConfirm'),
      t('common.warning'),
      { type: 'warning' }
    )
    await cancelBatch(row.dataId)
    ElMessage.success(t('common.cancelSuccess'))
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('common.cancelFailed'))
    }
  }
}
```


---

## 十四、常见问题排查

### 问题1：操作按钮颜色或样式不一致

**症状：** 列表页操作按钮的颜色、大小与其他页面不一致

**原因：**
- 使用了自定义的本地 ActionButtons 组件
- 没有使用标准的工作流 ActionButtons 组件

**解决方案：**
```javascript
// ❌ 错误
import ActionButtons from './components/ActionButtons.vue'

// ✅ 正确
import ActionButtons from '@/components/workflow/ActionButtons.vue'
```

### 问题2：按钮事件无法触发

**症状：** 点击操作按钮没有反应

**原因：**
- 使用了错误的事件绑定方式
- 缺少 `handleAction` 统一处理方法

**解决方案：**
```vue
<!-- ❌ 错误：使用多个独立事件 -->
<ActionButtons @edit="handleEdit" @view="handleView" />

<!-- ✅ 正确：使用统一的 @action 事件 -->
<ActionButtons @action="(action) => handleAction(row, action)" />
```

```javascript
// 添加统一处理方法
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
    case 'edit':
      handleEdit(row)
      break
    // ... 其他动作
  }
}
```

### 问题3：按钮显示不正确

**症状：** 某些状态下应该显示的按钮没有显示

**原因：**
- 没有正确传递 `workflow-status` 属性
- `show-audit` 属性设置错误

**解决方案：**
```vue
<!-- 确保传递正确的工作流状态 -->
<ActionButtons
  :workflow-status="row.workflowStatus || row.trialStatus || 'S0'"
  mode="list"
  :show-audit="false"
  @action="(action) => handleAction(row, action)" />
```

### 问题4：移动端按钮样式不一致

**症状：** 移动端卡片的操作按钮与PC端不一致

**原因：**
- 移动端使用了不同的按钮组件或配置

**解决方案：**
```vue
<!-- 移动端和PC端使用相同的 ActionButtons 配置 -->
<div class="mobile-card-footer">
  <ActionButtons
    :workflow-status="item.workflowStatus || 'S0'"
    mode="list"
    :show-audit="false"
    @action="(action) => handleAction(item, action)" />
</div>
```

### 问题5：缺少某些按钮动作

**症状：** 点击按钮后提示方法未定义

**原因：**
- `handleAction` 中缺少对应的 case 分支
- 缺少对应的处理方法

**解决方案：**
```javascript
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
    case 'edit':
      handleEdit(row)
      break
    case 'submit':
      handleSubmitForAudit(row)  // 确保方法存在
      break
    case 'cancelBatch':
      handleCancelBatch(row)     // 确保方法存在
      break
    // 添加所有需要的动作
  }
}
```

---

## 十五、重构检查清单

### 列表页检查清单

- [ ] 页面头部使用 `PageHeader` 组件
- [ ] 搜索区域使用 `SearchForm` + `SearchItem`
- [ ] 列表区域使用 `InfoCard` 包裹
- [ ] 审核页面使用 `StatusTabs`（如适用）
- [ ] **操作列使用标准 `ActionButtons` 组件**
- [ ] **引入路径为 `@/components/workflow/ActionButtons.vue`**
- [ ] **使用 `@action` 事件而非多个独立事件**
- [ ] **添加 `handleAction` 统一处理方法**
- [ ] 移动端卡片使用相同的 `ActionButtons` 配置
- [ ] 样式引入：`page-common.scss`、`workflow-common.scss`、`table-enhanced.scss`
- [ ] 删除原有重复的样式定义

### 表单页检查清单

- [ ] 页面头部带返回按钮
- [ ] 表单区域使用 `info-card` 包裹
- [ ] 使用 `el-row` + `el-col` 实现两列布局
- [ ] 添加 `pageMode` 计算属性
- [ ] 添加 `getActionButtons` 方法
- [ ] 底部操作按钮使用 `form-actions` 类
- [ ] 样式引入：`page-common.scss`

### 详情页检查清单

- [ ] 页面头部带返回按钮
- [ ] 内容区域使用 `info-card` 包裹
- [ ] 使用 `el-descriptions` 实现两列展示
- [ ] 使用 `WorkflowInfo` 组件显示工作流信息
- [ ] 样式引入：`page-common.scss`、`workflow-common.scss`
- [ ] 不添加编辑按钮（详情页仅展示）
