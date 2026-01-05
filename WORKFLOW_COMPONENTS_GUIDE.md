# Workflow Components Usage Guide

This guide demonstrates how to use the reusable workflow components created for the breeding batch module and other approval-based workflows.

## Components Overview

### 1. StatusTabs
**Location**: `@/components/workflow/StatusTabs.vue`

A reusable tab component for filtering data by workflow status.

**Features**:
- Dynamic tab configuration
- Badge support for counts
- Disabled state support
- Auto-synced with v-model
- Fully internationalized

**Props**:
```typescript
{
  modelValue: string,      // v-model binding (required)
  tabs: Array<{           // Tab configuration (required)
    name: string,         // Unique tab identifier
    label: string,        // i18n key for label
    icon: string,         // Remix icon class
    count?: number,       // Optional badge count
    disabled?: boolean    // Optional disabled state
  }>
}
```

**Events**:
- `update:modelValue`: Emitted when tab changes
- `tab-change`: Emitted with tab name when changed

**Usage Example**:

```vue
<template>
  <StatusTabs
    v-model="activeTab"
    :tabs="tabConfig"
    @tab-change="handleTabChange" />
</template>

<script setup>
import { ref } from 'vue'
import StatusTabs from '@/components/workflow/StatusTabs.vue'

const activeTab = ref('pendingApproval')

const tabConfig = [
  {
    name: 'pendingApproval',
    label: 'research.breedingData.batch.tabs.pendingApproval',
    icon: 'ri-time-line',
    count: 5  // Shows badge with count
  },
  {
    name: 'approved',
    label: 'research.breedingData.batch.tabs.approved',
    icon: 'ri-check-line',
    count: 12
  },
  {
    name: 'voided',
    label: 'research.breedingData.batch.tabs.voided',
    icon: 'ri-forbid-line',
    disabled: false
  }
]

const handleTabChange = (tabName) => {
  console.log('Tab changed to:', tabName)
  // Update query params, fetch data, etc.
}
</script>
```

---

### 2. WorkflowInfo
**Location**: `@/components/workflow/WorkflowInfo.vue`

A comprehensive workflow information card that shows approval history and optionally collects approval comments.

**Features**:
- Conditional rendering based on workflow state
- Approval comment input (audit mode)
- Approval history table
- Configurable validation
- Character limit with counter
- Empty state handling

**Props**:
```typescript
{
  workflowStatus: string,           // Current workflow status (S0-S10)
  mode: string,                     // Page mode ('add', 'edit', 'audit', 'view')
  approvalHistory: Array<{          // Approval history data
    approver: string,
    approvalTime: string,
    comment: string,
    status?: string                 // 'approved' or 'rejected'
  }>,
  modelValue: string,               // v-model for comment
  commentProp: string,              // Form validation prop name
  commentRequired: boolean,         // Whether comment is required
  maxLength: number,                // Max comment length (default: 500)
  hint: string,                     // Hint text below input
  showStatus: boolean,              // Show status column in table
  hideForStates: Array<string>      // Hide card for these states
}
```

**Events**:
- `update:modelValue`: Emitted when comment changes

**Usage Example**:

```vue
<template>
  <el-form ref="formRef" :model="formData" :rules="rules">
    <!-- Other form sections... -->

    <WorkflowInfo
      :workflow-status="formData.workflowStatus"
      :mode="pageMode"
      :approval-history="approvalHistory"
      v-model="formData.approvalComment"
      comment-prop="approvalComment"
      :comment-required="pageMode === 'audit'"
      :max-length="500"
      hint="Please provide detailed approval comments"
      :show-status="true"
      :hide-for-states="['S0', 'S10']" />
  </el-form>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import WorkflowInfo from '@/components/workflow/WorkflowInfo.vue'

const formRef = ref(null)
const pageMode = computed(() => route.query.mode || 'view')

const formData = reactive({
  workflowStatus: 'S1',
  approvalComment: ''
})

const approvalHistory = ref([
  {
    approver: 'John Doe',
    approvalTime: '2024-01-15 14:30:00',
    comment: 'Initial submission looks good',
    status: 'approved'
  },
  {
    approver: 'Jane Smith',
    approvalTime: '2024-01-16 09:15:00',
    comment: 'Minor revisions needed',
    status: 'rejected'
  }
])

const rules = {
  approvalComment: [
    {
      required: true,
      message: 'Please enter approval comments',
      trigger: 'blur'
    }
  ]
}
</script>
```

---

### 3. ActionButtons
**Location**: `@/components/workflow/ActionButtons.vue`

Intelligent action button component that dynamically renders appropriate buttons based on workflow state, page mode, and user permissions.

**Features**:
- Dynamic button configuration based on state
- Permission-aware rendering
- Loading state management
- Custom button override
- Icon + text labels
- Responsive layout

**Props**:
```typescript
{
  workflowStatus: string,        // Current workflow status (required)
  mode: string,                  // Page mode ('add', 'edit', 'audit', 'view')
  isVoidedTab: boolean,          // Special handling for voided tab
  disabled: boolean,             // Disable all buttons
  loading: boolean,              // Show loading state
  customButtons: Array<{         // Override default buttons
    type: string,                // Button type
    action: string,              // Action identifier
    label: string,               // i18n key
    icon: string                 // Remix icon class
  }>
}
```

**Events**:
- `action`: Emitted with action name when button clicked

**Usage Example**:

**In List/Table View**:
```vue
<template>
  <el-table :data="dataList">
    <!-- Other columns... -->

    <el-table-column label="Actions" width="200" fixed="right">
      <template #default="{ row }">
        <ActionButtons
          :workflow-status="row.workflowStatus"
          mode="list"
          @action="(action) => handleAction(row, action)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const handleAction = (row, action) => {
  switch (action) {
    case 'edit':
      router.push(`/batch/edit/${row.id}`)
      break
    case 'view':
      router.push(`/batch/detail/${row.id}`)
      break
    case 'submit':
      handleSubmitForAudit(row)
      break
    case 'audit':
      router.push({
        path: `/batch/audit/${row.id}`,
        query: { mode: 'audit' }
      })
      break
    case 'cancelBatch':
      handleCancelBatch(row)
      break
  }
}
</script>
```

**In Form View**:
```vue
<template>
  <el-form ref="formRef" :model="formData">
    <!-- Form fields... -->

    <ActionButtons
      :workflow-status="formData.workflowStatus"
      :mode="pageMode"
      :loading="submitLoading"
      @action="handleAction" />
  </el-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const submitLoading = ref(false)
const pageMode = computed(() => route.query.mode || 'edit')

const handleAction = async (action) => {
  switch (action) {
    case 'cancel':
      router.back()
      break
    case 'save':
      await handleSubmit()
      break
    case 'approve':
      await handleApprove()
      break
    case 'reject':
      await handleReject()
      break
  }
}
</script>
```

**Custom Button Override**:
```vue
<template>
  <ActionButtons
    workflow-status="S2"
    mode="view"
    :custom-buttons="customButtons"
    @action="handleAction" />
</template>

<script setup>
const customButtons = [
  { type: '', action: 'back', label: 'back', icon: 'ri-arrow-left-line' },
  { type: 'primary', action: 'download', label: 'download', icon: 'ri-download-line' },
  { type: 'success', action: 'export', label: 'export', icon: 'ri-file-excel-line' }
]
</script>
```

---

## Complete Integration Example

Here's a complete example showing all components working together:

```vue
<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-list-check-2"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.batch.audit.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.breedingData.batch.audit.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('research.breedingData.batch.list') }}</span>
            </div>
          </div>

          <!-- Status Tabs -->
          <StatusTabs
            v-model="activeTab"
            :tabs="tabConfig"
            @tab-change="handleTabChange" />

          <div class="card-body">
            <!-- Search Section -->
            <div class="search-section">
              <!-- Search fields... -->
            </div>

            <!-- Table -->
            <el-table :data="dataList" v-loading="loading">
              <!-- Columns... -->

              <el-table-column label="Actions" width="200" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="row.workflowStatus"
                    :mode="pageMode"
                    :is-voided-tab="activeTab === 'voided'"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import StatusTabs from '@/components/workflow/StatusTabs.vue'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const router = useRouter()
const loading = ref(false)
const dataList = ref([])
const activeTab = ref('pendingApproval')

const tabConfig = [
  {
    name: 'pendingApproval',
    label: 'research.breedingData.batch.tabs.pendingApproval',
    icon: 'ri-time-line',
    count: 5
  },
  {
    name: 'approved',
    label: 'research.breedingData.batch.tabs.approved',
    icon: 'ri-check-line',
    count: 12
  },
  {
    name: 'voided',
    label: 'research.breedingData.batch.tabs.voided',
    icon: 'ri-forbid-line'
  }
]

const handleTabChange = (tabName) => {
  // Update query params and fetch data
  fetchData()
}

const handleAction = (row, action) => {
  switch (action) {
    case 'audit':
      router.push({
        path: `/research/breeding-data/batch/audit/${row.dataId}`,
        query: { mode: 'audit' }
      })
      break
    case 'view':
      router.push(`/research/breeding-data/batch/detail/${row.dataId}`)
      break
    // ... other actions
  }
}

const fetchData = async () => {
  loading.value = true
  // Fetch data logic...
  loading.value = false
}

onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/workflow-common.scss';
</style>
```

---

## Form Page Example

```vue
<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">
              {{ isEdit ? $t('common.edit') : $t('common.add') }}
            </h1>
          </div>
        </div>
      </div>

      <!-- Form Area -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px">
          <!-- Basic Info Card -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('common.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <!-- Form fields... -->
            </div>
          </div>

          <!-- Workflow Info (conditionally shown) -->
          <WorkflowInfo
            :workflow-status="formData.workflowStatus"
            :mode="pageMode"
            :approval-history="approvalHistory"
            v-model="formData.approvalComment"
            comment-prop="approvalComment"
            :comment-required="pageMode === 'audit'" />

          <!-- Action Buttons -->
          <ActionButtons
            :workflow-status="formData.workflowStatus"
            :mode="pageMode"
            :loading="submitLoading"
            @action="handleAction" />
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import WorkflowInfo from '@/components/workflow/WorkflowInfo.vue'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const route = useRoute()
const router = useRouter()

const formRef = ref(null)
const submitLoading = ref(false)
const approvalHistory = ref([])

const isEdit = computed(() => !!route.params.id)
const pageMode = computed(() => route.query.mode || (isEdit.value ? 'edit' : 'add'))

const formData = reactive({
  workflowStatus: 'S0',
  approvalComment: ''
  // ... other fields
})

const rules = {
  // Validation rules...
}

const handleAction = async (action) => {
  switch (action) {
    case 'cancel':
      router.back()
      break
    case 'save':
      await handleSave()
      break
    case 'approve':
      await handleApprove()
      break
    case 'reject':
      await handleReject()
      break
  }
}

const handleSave = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitLoading.value = true
  try {
    // Save logic...
    router.back()
  } finally {
    submitLoading.value = false
  }
}

const handleApprove = async () => {
  // Validate approval comment
  const valid = await formRef.value.validateField('approvalComment').catch(() => false)
  if (!valid) return

  // Approve logic...
}

const handleReject = async () => {
  // Validate approval comment
  const valid = await formRef.value.validateField('approvalComment').catch(() => false)
  if (!valid) return

  // Reject logic...
}

const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/workflow-common.scss';
</style>
```

---

## Styling Integration

All components use the workflow-common.scss stylesheet. Import it in your component:

```vue
<style lang="scss" scoped>
@use '@/assets/styles/workflow-common.scss';

// Your custom styles here...
</style>
```

Or import both page-common and workflow-common:

```vue
<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';

// Your custom styles here...
</style>
```

---

## Best Practices

### 1. Component Organization
```
src/components/workflow/
├── StatusTabs.vue
├── WorkflowInfo.vue
├── ActionButtons.vue
└── README.md
```

### 2. Consistent Naming
- Use workflow state codes: S0, S1, S2, S3, S9, S10
- Use standard action names: edit, view, submit, approve, reject, archive, cancelBatch
- Use i18n keys consistently

### 3. Permission Handling
Always check permissions before showing action buttons:
```javascript
import { useUserStore } from '@/store'

const userStore = useUserStore()

if (userStore.hasWorkflowStatusPermission('approve')) {
  // Show approve button
}
```

### 4. Error Handling
```javascript
const handleAction = async (row, action) => {
  try {
    switch (action) {
      case 'submit':
        await submitForAudit(row.dataId)
        ElMessage.success('Successfully submitted')
        break
      // ...
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Operation failed')
    }
  }
}
```

### 5. Loading States
Always show loading states for async operations:
```vue
<ActionButtons
  :loading="submitLoading"
  @action="handleAction" />
```

---

## Migration Guide

To migrate existing pages to use these components:

### 1. Replace Status Tabs
**Before**:
```vue
<div class="status-tabs">
  <el-tabs v-model="activeTab" @tab-change="handleTabChange">
    <el-tab-pane name="pending">
      <template #label>
        <span><i class="ri-time-line"></i> Pending</span>
      </template>
    </el-tab-pane>
  </el-tabs>
</div>
```

**After**:
```vue
<StatusTabs
  v-model="activeTab"
  :tabs="tabConfig"
  @tab-change="handleTabChange" />
```

### 2. Replace Action Buttons
**Before**:
```vue
<el-button link type="primary" @click="handleEdit(row)">
  <i class="ri-edit-line"></i>Edit
</el-button>
<el-button link type="success" @click="handleSubmit(row)">
  <i class="ri-send-plane-line"></i>Submit
</el-button>
```

**After**:
```vue
<ActionButtons
  :workflow-status="row.workflowStatus"
  @action="(action) => handleAction(row, action)" />
```

### 3. Replace Workflow Info
**Before**:
```vue
<div class="info-card" v-if="showWorkflowInfo">
  <div class="card-header">...</div>
  <div class="card-body">
    <el-table :data="approvalHistory">...</el-table>
  </div>
</div>
```

**After**:
```vue
<WorkflowInfo
  :workflow-status="formData.workflowStatus"
  :mode="pageMode"
  :approval-history="approvalHistory"
  v-model="formData.approvalComment" />
```

---

## Troubleshooting

### Component Not Rendering
- Check that you've imported the component correctly
- Verify props are passed with correct types
- Check console for validation errors

### Buttons Not Showing
- Verify workflowStatus is set correctly
- Check user permissions in store
- Confirm mode prop matches expected value

### Tabs Not Switching
- Ensure v-model is reactive (use ref() or reactive())
- Check tab-change event handler
- Verify tab names match configuration

---

## Future Enhancements

1. **WorkflowTimeline**: Visual timeline component
2. **BatchOperations**: Bulk action component
3. **WorkflowStats**: Statistics dashboard component
4. **AdvancedFilters**: Compound filter component
5. **ExportButtons**: PDF/Excel export components
