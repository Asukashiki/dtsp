# 页面 UI 重构规范指南

本文档提供页面 UI 布局重构的标准规范，确保所有页面样式统一。

---

## 目录

1. [重要约束](#一重要约束)
2. [页面类型概览](#二页面类型概览)
3. [组件与样式引入](#三组件与样式引入)
4. [普通列表页](#四普通列表页)
5. [审核列表页](#五审核列表页)
6. [新增/编辑页](#六新增编辑页)
7. [详情页](#七详情页)
8. [工作流状态与按钮](#八工作流状态与按钮)
9. [样式规范](#九样式规范)
10. [重构检查清单](#十重构检查清单)
11. [常见问题](#十一常见问题)

---

## 一、重要约束

### 🚫 严禁修改

| 类别 | 说明 |
|------|------|
| 业务逻辑 | 不删除/修改任何业务方法、参数、返回值 |
| 变量状态 | 不删除/修改响应式变量的初始值和类型 |
| API 调用 | 不删除/修改 API 导入和调用逻辑 |
| 事件处理 | 不修改事件处理函数逻辑和事件监听 |
| 条件渲染 | 不修改操作按钮的条件判断逻辑 |
| 国际化 | 不修改/添加国际化 key |
| 页面功能 | 详情页不添加编辑按钮，不擅自添加新功能 |

### ✅ 允许修改

| 类别 | 说明 |
|------|------|
| 模板结构 | 使用标准组件包裹（PageHeader、SearchForm、InfoCard 等） |
| 样式引入 | 替换为标准样式文件 |
| 组件引入 | 添加新的 UI 组件引入 |
| CSS 类名 | 使用标准类名（page-container、content-wrapper 等） |

---

## 二、页面类型概览

| 类型 | 说明 | 参考文件 |
|------|------|----------|
| 普通列表页 | 无状态标签页 | `batch/index.vue` |
| 审核列表页 | 有状态标签页（StatusTabs） | `batch/approve.vue` |
| 新增/编辑页 | 表单页面，两列布局 | `batch/form.vue` |
| 详情页 | 展示页面，两列布局 | `batch/detail.vue` |

---

## 三、组件与样式引入

### 组件引入

```javascript
// 通用组件
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'

// 工作流组件
import ActionButtons from '@/components/workflow/ActionButtons.vue'  // 列表页操作按钮
import StatusTabs from '@/components/workflow/StatusTabs.vue'        // 审核页状态标签
import WorkflowInfo from '@/components/workflow/WorkflowInfo.vue'    // 详情页工作流信息
```

### 样式引入

```scss
// 列表页（普通/审核）
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';

// 表单页（新增/编辑）
@use '@/assets/styles/page-common.scss';

// 详情页
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
```

---

## 四、普通列表页

### 页面结构

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
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('xxx.columns.field1')">
              <el-input v-model="queryParams.field1" class="search-input" />
            </SearchItem>
            <!-- 更多搜索项... -->
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('xxx.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('common.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="dataList" stripe v-loading="loading">
              <el-table-column type="selection" width="55" align="center" />
              <!-- 数据列... -->
              <el-table-column :label="$t('xxx.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="row.workflowStatus || 'S0'"
                    mode="list"
                    :show-audit="false"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-wrapper">
              <el-pagination ... />
            </div>
          </div>
        </InfoCard>

        <!-- 移动端卡片 -->
        <div class="mobile-card-list mobile-only">
          <!-- 移动端卡片结构... -->
        </div>
      </div>
    </div>
  </div>
</template>
```

### 事件处理

```javascript
// 统一动作处理
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
    case 'edit':
      handleEdit(row)
      break
    case 'submit':
      handleSubmitForAudit(row)
      break
    case 'cancelBatch':
      handleCancelBatch(row)
      break
  }
}
```

---

## 五、审核列表页

### 页面结构

```vue
<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        icon="ri-list-check-2"
        :title="$t('xxx.audit.title')"
        :subtitle="$t('xxx.audit.subtitle')" />

      <div class="content-wrapper">
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <!-- 搜索项... -->
          </SearchForm>
        </div>

        <!-- 注意：no-padding="true" -->
        <InfoCard :title="$t('xxx.list')" icon="ri-file-list-3-line" :no-padding="true">
          <!-- 状态标签页 -->
          <StatusTabs v-model="activeTab" :tabs="tabConfig" @tab-change="handleTabChange" />

          <div class="table-wrapper pc-only">
            <el-table :data="dataList" stripe v-loading="loading">
              <el-table-column type="selection" width="55" align="center" />
              <!-- 数据列... -->
              <el-table-column :label="$t('xxx.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="row.workflowStatus"
                    mode="list"
                    :show-audit="activeTab === 'pendingApproval'"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-wrapper">
              <el-pagination ... />
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>
```

### 标签页配置

```javascript
const tabConfig = [
  { name: 'pendingApproval', label: 'xxx.tabs.pendingApproval', icon: 'ri-time-line' },
  { name: 'approved', label: 'xxx.tabs.approved', icon: 'ri-check-line' },
  { name: 'voided', label: 'xxx.tabs.voided', icon: 'ri-forbid-line' }
]
```

| 标签页 | 说明 | 图标 | 状态码 |
|--------|------|------|--------|
| pendingApproval | 待审批 | ri-time-line | S1 |
| approved | 已审批 | ri-check-line | S2 |
| voided | 已作废 | ri-forbid-line | S10 |

**注意事项：**
- 所有审核列表页必须包含这三个标签页
- 如果后端接口暂不支持"已作废"数据查询，可以先保留标签页 UI，待接口就绪后再对接
- 如果当前页面已有"已作废"相关逻辑（如作废按钮、作废接口），必须保留并正确对接

### 标签页状态过滤

```javascript
const setQueryParamsByTab = (tabName) => {
  switch (tabName) {
    case 'pendingApproval':
      queryParams.workflowStatus = 'S1'
      break
    case 'approved':
      queryParams.workflowStatus = 'S2'
      break
    case 'voided':
      queryParams.workflowStatus = 'S10'
      break
  }
}

const handleTabChange = (tabName) => {
  setQueryParamsByTab(tabName)
  getList()
}
```

### 接口对接说明

**情况1：后端接口支持"已作废"数据查询**
```javascript
const getList = async () => {
  loading.value = true
  try {
    // 根据标签页查询不同状态的数据
    const res = await getXxxList(queryParams)
    dataList.value = res.rows || []
    total.value = res.total || 0
  } catch (error) {
    console.error('Failed to fetch list:', error)
  } finally {
    loading.value = false
  }
}
```

**情况2：后端接口暂不支持"已作废"数据查询**
```javascript
const getList = async () => {
  loading.value = true
  try {
    // 已作废标签页暂不查询数据，等待接口就绪
    if (activeTab.value === 'voided') {
      dataList.value = []
      total.value = 0
      loading.value = false
      return
    }
    
    const res = await getXxxList(queryParams)
    dataList.value = res.rows || []
    total.value = res.total || 0
  } catch (error) {
    console.error('Failed to fetch list:', error)
  } finally {
    loading.value = false
  }
}
```

---

## 六、新增/编辑页

### 页面结构

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
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px">
          <!-- 基本信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('xxx.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('xxx.form.field1')" prop="field1">
                    <el-input v-model="formData.field1" />
                  </el-form-item>
                </el-col>
                <!-- 更多字段... -->
              </el-row>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitLoading">
              {{ $t('common.save') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
```

### 页面模式判断

```javascript
const pageMode = computed(() => {
  if (route.query.mode) return route.query.mode
  if (route.path.includes('/audit/')) return 'audit'
  if (route.path.includes('/detail/')) return 'view'
  return isEdit.value ? 'edit' : 'add'
})

const isReadOnly = computed(() => ['audit', 'view'].includes(pageMode.value))
```

### 按钮配置

| 模式 | 按钮 |
|------|------|
| add / edit | 取消、保存 |
| audit | 取消、通过、驳回 |
| view | 取消、归档、作废 |

---

## 七、详情页

### 页面结构

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
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('xxx.form.field1')">
                {{ detailData.field1 }}
              </el-descriptions-item>
              <!-- 更多字段... -->
            </el-descriptions>
          </div>
        </div>

        <!-- 工作流信息 -->
        <WorkflowInfo
          :workflow-status="detailData.workflowStatus"
          mode="view"
          :approval-history="approvalHistory"
          :hide-for-states="['S0', 'S10']" />

        <!-- 详情页不显示底部操作按钮 -->
      </div>
    </div>
  </div>
</template>
```

### WorkflowInfo 组件属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| workflow-status | String | '' | 当前工作流状态 |
| mode | String | 'view' | 页面模式：add/edit/audit/view |
| approval-history | Array | [] | 审批历史记录 |
| hide-for-states | Array | ['S0', 'S10'] | 隐藏工作流信息的状态 |
| v-model | String | '' | 审批意见（audit 模式） |
| comment-required | Boolean | true | 审批意见是否必填 |

---

## 八、工作流状态与按钮

### 状态说明

| 状态码 | 说明 | 标签类型 |
|--------|------|----------|
| S0 | 草稿 | info (灰色) |
| S1 | 待审批 | warning (橙色) |
| S2 | 审核通过 | primary (蓝色) |
| S3 | 审核驳回 | danger (红色) |
| S9 | 已归档 | info (深灰) |
| S10 | 已作废 | danger (深红) |

### ActionButtons 组件

```vue
<ActionButtons
  :workflow-status="row.workflowStatus"
  mode="list"
  :show-audit="false"
  @action="(action) => handleAction(row, action)" />
```

| 属性 | 类型 | 说明 |
|------|------|------|
| workflow-status | String | 工作流状态（S0/S1/S2/S3/S9/S10） |
| mode | String | 固定为 "list" |
| show-audit | Boolean | 是否显示审核按钮 |

### 按钮显示规则

| 状态 | 普通列表页 | 审核列表页 |
|------|-----------|-----------|
| S0 (草稿) | 编辑、提交、作废 | 编辑、提交 |
| S1 (待审批) | 查看 | 审核 |
| S2 (审核通过) | 查看 | 查看 |
| S3 (审核驳回) | 编辑、提交、作废 | 编辑 |
| S9/S10 | 查看 | 查看 |

### 动作类型

| 动作 | 说明 |
|------|------|
| view | 查看详情 |
| edit | 编辑 |
| submit | 提交审核 |
| audit | 进入审核页面 |
| approve | 审核通过 |
| reject | 审核驳回 |
| archive | 归档 |
| cancelBatch | 作废 |

---

## 九、样式规范

### 布局尺寸

| 元素 | 规范 |
|------|------|
| 页面头部高度 | 128px |
| 页面头部图标 | 80×80px，圆角 24px |
| 内容区域内边距 | 20px（底部为 0） |
| 卡片间距 | 20px |

### 表格规范

| 元素 | 规范 |
|------|------|
| 复选框列宽度 | 55px（居中对齐） |
| 操作列宽度 | 240px |
| 表头背景色 | #E5F4EC |
| 表头字体颜色 | #009A44 |

### 表单规范

| 元素 | 规范 |
|------|------|
| 两列布局 | `el-row :gutter="20"` + `el-col :xs="24" :sm="12"` |
| 详情两列布局 | `el-descriptions :column="2" border` |
| 操作按钮区域 | 白色背景、圆角 8px、阴影效果 |

### 复选框列规范

> **核心原则**：复选框列用于保持页面样式统一
> - 有批量操作逻辑：完整保留所有批量操作代码
> - 无批量操作逻辑：只添加复选框列，不添加批量操作逻辑

```vue
<!-- 仅样式统一（无批量操作） -->
<el-table :data="dataList" stripe v-loading="loading">
  <el-table-column type="selection" width="55" align="center" />
  <!-- 其他列... -->
</el-table>

<!-- 有批量操作 -->
<el-table :data="dataList" @selection-change="handleSelectionChange">
  <el-table-column type="selection" width="55" align="center" />
  <!-- 其他列... -->
</el-table>
```

---

## 十、重构检查清单

### 重构前

- [ ] 已完整阅读本规范文档
- [ ] 已备份原文件或使用版本控制
- [ ] 已确认只修改样式和布局，不修改业务逻辑

### 列表页

- [ ] 使用 `PageHeader` 组件
- [ ] 使用 `SearchForm` + `SearchItem` 包裹搜索区域
- [ ] 使用 `InfoCard` 包裹列表区域
- [ ] 审核页面使用 `StatusTabs`（设置 `:no-padding="true"`）
- [ ] 操作列使用标准 `ActionButtons` 组件
- [ ] 添加 `handleAction` 统一处理方法
- [ ] 添加复选框列（width="55"，align="center"）
- [ ] 引入三个样式文件

### 表单页

- [ ] 页面头部带返回按钮
- [ ] 使用 `info-card` 包裹表单区域
- [ ] 使用 `el-row` + `el-col` 实现两列布局
- [ ] 底部使用 `form-actions` 操作按钮区域
- [ ] 引入 `page-common.scss`

### 详情页

- [ ] 页面头部带返回按钮
- [ ] 使用 `info-card` 包裹内容区域
- [ ] 使用 `el-descriptions` 实现两列展示
- [ ] 使用 `WorkflowInfo` 组件显示工作流信息
- [ ] 不添加编辑按钮
- [ ] 引入 `page-common.scss` 和 `workflow-common.scss`

### 重构后

- [ ] 所有原有业务方法都存在且未被修改
- [ ] 所有原有变量声明都完整
- [ ] 所有 API 导入都完整
- [ ] 页面功能与原页面完全一致

---

## 十一、常见问题

### 操作按钮颜色/样式不一致

**原因**：使用了自定义的本地 ActionButtons 组件

**解决**：
```javascript
// ❌ 错误
import ActionButtons from './components/ActionButtons.vue'

// ✅ 正确
import ActionButtons from '@/components/workflow/ActionButtons.vue'
```

### 按钮事件无法触发

**原因**：使用了错误的事件绑定方式

**解决**：
```vue
<!-- ❌ 错误 -->
<ActionButtons @edit="handleEdit" @view="handleView" />

<!-- ✅ 正确 -->
<ActionButtons @action="(action) => handleAction(row, action)" />
```

### 按钮显示不正确

**原因**：未正确传递 `workflow-status` 属性

**解决**：
```vue
<ActionButtons
  :workflow-status="row.workflowStatus || row.trialStatus || 'S0'"
  mode="list"
  :show-audit="false"
  @action="(action) => handleAction(row, action)" />
```

---

## 参考文件

| 类型 | 文件路径 |
|------|----------|
| 普通列表页 | `src/views/research/breeding-data/batch/index.vue` |
| 审核列表页 | `src/views/research/breeding-data/batch/approve.vue` |
| 新增/编辑页 | `src/views/research/breeding-data/batch/form.vue` |
| 详情页 | `src/views/research/breeding-data/batch/detail.vue` |
| 通用组件 | `src/components/common/` |
| 工作流组件 | `src/components/workflow/` |
| 样式文件 | `src/assets/styles/` |
