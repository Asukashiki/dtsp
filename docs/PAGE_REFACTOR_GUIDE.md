# 页面重构规范指南

本文档提供页面 UI 布局重构的标准规范，确保所有页面样式统一。

> **重要说明**：
> - 本文档仅规范页面的 UI 布局和样式
> - **不要修改业务功能逻辑**，保留原有的功能代码
> - **不要修改国际化**，国际化已定义好
> - 只修改模板结构和样式引用

---

## 一、页面类型

| 类型 | 说明 | 参考文件 |
|------|------|----------|
| 普通列表页 | 无状态标签页 | `batch/index.vue` |
| 审核列表页 | 有状态标签页（StatusTabs） | `batch/approve.vue` |
| 新增/编辑页 | 表单页面，两列布局 | - |
| 详情页 | 展示页面，两列布局 | - |

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
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <!-- 保留原有的 el-table，只修改操作列 -->
            <el-table ...>
              <!-- 保留原有列... -->
              <el-table-column :label="$t('xxx.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="row.workflowStatus"
                    mode="list"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-wrapper"><!-- 保留原有分页 --></div>
          </div>
        </InfoCard>

        <!-- 保留原有的移动端卡片（如有） -->
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
            <el-table ...>
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

        <!-- 保留原有的移动端卡片（如有） -->
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

---

## 四、新增/编辑页结构

```vue
<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        icon="ri-xxx-line"
        :title="$t('xxx.add')"
        :subtitle="$t('xxx.addSubtitle')">
        <template #actions>
          <el-button class="back-btn" @click="handleBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </template>
      </PageHeader>

      <div class="content-wrapper">
        <InfoCard :title="$t('xxx.basicInfo')" icon="ri-information-line">
          <!-- 保留原有表单，使用两列布局 -->
          <el-form ...>
            <div class="form-row">
              <!-- 每行两个表单项 -->
            </div>
          </el-form>
        </InfoCard>

        <!-- 保留原有的其他卡片... -->

        <div class="form-actions">
          <!-- 保留原有操作按钮 -->
        </div>
      </div>
    </div>
  </div>
</template>
```

---

## 五、详情页结构

```vue
<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        icon="ri-xxx-line"
        :title="$t('xxx.detail')"
        :subtitle="$t('xxx.detailSubtitle')">
        <template #actions>
          <el-button class="back-btn" @click="handleBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </template>
      </PageHeader>

      <div class="content-wrapper">
        <InfoCard :title="$t('xxx.basicInfo')" icon="ri-information-line">
          <!-- 两列布局展示 -->
          <div class="detail-row">
            <div class="detail-item">
              <span class="detail-label">{{ $t('xxx.field1') }}</span>
              <span class="detail-value">{{ detail.field1 }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">{{ $t('xxx.field2') }}</span>
              <span class="detail-value">{{ detail.field2 }}</span>
            </div>
          </div>
        </InfoCard>

        <!-- 保留原有的其他卡片... -->
      </div>
    </div>
  </div>
</template>
```

---

## 六、组件引入

```javascript
// 通用组件（必须）
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'

// 工作流组件（列表页需要）
import ActionButtons from '@/components/workflow/ActionButtons.vue'

// 审核页面需要
import StatusTabs from '@/components/workflow/StatusTabs.vue'
```

---

## 七、样式引入

```scss
<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
```

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

---

## 九、重构步骤

1. **修改模板结构**
   - 用 `PageHeader` 替换原有头部
   - 用 `SearchForm` + `SearchItem` 包裹搜索区域
   - 用 `InfoCard` 包裹列表区域
   - 审核页面添加 `StatusTabs`

2. **修改 script**
   - 添加组件引入
   - **保留所有原有业务逻辑**

3. **修改 style**
   - 替换为三个样式文件引入
   - 删除原有的重复样式

---

## 十、注意事项

⚠️ **不要修改**：
- 业务功能逻辑
- 国际化 key
- API 调用
- 数据处理逻辑
- 原有的事件处理函数

✅ **只修改**：
- 模板结构（使用新组件包裹）
- 样式引入
- 组件引入

---

## 十一、参考文件

- 普通列表页：`src/views/research/breeding-data/batch/index.vue`
- 审核列表页：`src/views/research/breeding-data/batch/approve.vue`
- 通用组件：`src/components/common/`
- 工作流组件：`src/components/workflow/`
- 样式文件：`src/assets/styles/`
