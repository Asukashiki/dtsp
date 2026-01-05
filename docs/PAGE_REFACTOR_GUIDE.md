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

### ActionButtons 组件属性说明（列表页）

| 属性 | 类型 | 说明 |
|------|------|------|
| `workflow-status` | String | 当前行的工作流状态 |
| `mode` | String | 固定为 `"list"` |
| `show-audit` | Boolean | 普通列表页设为 `false`，审核列表页设为 `true` |

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
   - 操作列使用 `ActionButtons` 组件

2. **修改 script**
   - 添加组件引入
   - **保留所有原有业务逻辑**

3. **修改 style**
   - 替换为三个样式文件引入
   - 删除原有的重复样式

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

## 十二、工作流状态说明

| 状态码 | 说明 | 标签类型 |
|--------|------|----------|
| S0 | 草稿 | info (灰色) |
| S1 | 待审批 | warning (橙色) |
| S2 | 审核通过 | primary (蓝色) |
| S3 | 审核驳回 | danger (红色) |
| S9 | 已归档 | danger (深红色) |
| S10 | 已作废 | danger (深红色) |

---

## 十三、按钮配置说明

### 列表页按钮（根据工作流状态自动显示）

| 状态 | 普通列表页按钮 | 审核列表页按钮 |
|------|----------------|----------------|
| S0 (草稿) | 编辑、提交、作废 | 编辑、提交 |
| S1 (待审批) | 查看、作废 | 审核 |
| S2 (审核通过) | 查看 | 查看 |
| S3 (审核驳回) | 编辑、提交、作废 | 编辑 |
| S9 (已归档) | 查看 | 查看 |
| S10 (已作废) | 查看 | 查看 |

### 表单页按钮

| 模式 | 按钮 |
|------|------|
| add/edit | 取消、保存 |
| audit | 取消、通过、驳回 |
| view | 取消、归档、作废 |
