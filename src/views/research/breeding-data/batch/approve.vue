<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
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

      

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('research.breedingData.batch.list') }}</span>
            </div>
            
          </div>


          <!-- 状态标签页 -->
        <div class="status-tabs">
          <el-tabs v-model="activeTab" @tab-change="handleTabChange">

            <el-tab-pane :label="$t('research.breedingData.batch.tabs.pendingApproval')" name="pendingApproval">
              <template #label>
                <span><i class="ri-time-line"></i> {{ $t('research.breedingData.batch.tabs.pendingApproval') }}</span>
              </template>
            </el-tab-pane>
            <el-tab-pane :label="$t('research.breedingData.batch.tabs.approved')" name="approved">
              <template #label>
                <span><i class="ri-check-line"></i> {{ $t('research.breedingData.batch.tabs.approved') }}</span>
              </template>
            </el-tab-pane>

          </el-tabs>
        </div>

          <div class="card-body">
            <!-- 搜索筛选区 -->
            <div class="search-section">
              <div class="search-item">
                <label class="search-label">{{ $t('research.breedingData.batch.columns.batchId') }}:</label>
                <el-input
                  v-model="queryParams.batchId"
                  :placeholder="$t('research.breedingData.batch.columns.batchId')"
                  clearable
                  class="search-input"
                >
                  <template #prefix><i class="ri-search-line"></i></template>
                </el-input>
              </div>
              <div class="search-item">
                <label class="search-label">{{ $t('research.breedingData.batch.columns.batchName') }}:</label>
                <el-input
                  v-model="queryParams.batchName"
                  :placeholder="$t('research.breedingData.batch.placeholder.batchName')"
                  clearable
                  class="search-input"
                />
              </div>
              <div class="search-item">
                <label class="search-label">{{ $t('research.breedingData.batch.columns.cropType') }}:</label>
                <el-select
                  v-model="queryParams.cropType"
                  :placeholder="$t('research.breedingData.batch.placeholder.cropType')"
                  clearable
                  class="filter-select"
                  :loading="dictLoading"
                >
                  <el-option v-for="item in options.crop_type" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
              <div class="search-item">
                <label class="search-label">{{ $t('research.breedingData.batch.columns.varietyName') }}:</label>
                <el-input
                  v-model="queryParams.varietyName"
                  :placeholder="$t('research.breedingData.batch.placeholder.varietyName')"
                  clearable
                  class="search-input"
                />
              </div>
              
              <div class="search-actions">
                <el-button type="primary" @click="handleQuery">
                  <i class="ri-search-line"></i>
                  {{ $t('common.search') }}
                </el-button>
                <el-button @click="handleReset">
                  <i class="ri-refresh-line"></i>
                  {{ $t('common.reset') }}
                </el-button>
              </div>
            </div>

            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table :data="dataList" stripe v-loading="loading" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" />
                <el-table-column prop="batchName" :label="$t('research.breedingData.batch.columns.batchName')" min-width="160" show-overflow-tooltip />
            <el-table-column prop="batchId" :label="$t('research.breedingData.batch.columns.batchId')" min-width="140" show-overflow-tooltip />
            <el-table-column prop="cropType" :label="$t('research.breedingData.batch.columns.cropType')" min-width="100">
              <template #default="{ row }">
                {{ getLabelByValue('crop_type', row.cropType) }}
              </template>
            </el-table-column>
            <el-table-column prop="varietyName" :label="$t('research.breedingData.batch.columns.varietyName')" min-width="120" show-overflow-tooltip />
            <el-table-column prop="objective" :label="$t('research.breedingData.batch.columns.objective')" min-width="120" show-overflow-tooltip />
                <el-table-column prop="breedingMethod" :label="$t('research.breedingData.batch.columns.breedingMethod')" min-width="100" />
                <el-table-column prop="year" :label="$t('research.breedingData.batch.columns.year')" min-width="80" />
                <el-table-column prop="workflowStatus" :label="$t('research.breedingData.batch.columns.workflowStatus')" min-width="120">
                  <template #default="{ row }">
                    <el-tag :type="getWorkflowStatusType(row.workflowStatus)" effect="plain">
                      {{ getLabelByValue('flow_status', row.workflowStatus) }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('research.breedingData.batch.columns.actions')" width="200" fixed="right">
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button 
                        v-for="button in getActionButtons(row)" 
                        :key="button.action"
                        link 
                        :type="button.type" 
                        @click="handleAction(row, button.action)">
                        <i :class="button.icon"></i>{{ button.label }}
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>

              <div class="pagination-wrapper">
                <el-pagination
                  v-model:current-page="queryParams.pageNum"
                  v-model:page-size="queryParams.pageSize"
                  :page-sizes="[10, 20, 50]"
                  :total="total"
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="getList"
                  @current-change="getList"
                />
              </div>
            </div>

            <!-- 移动端卡片 -->
            <div class="mobile-card-list mobile-only">
              <div v-for="item in dataList" :key="item.dataId" class="mobile-card">
                <div class="mobile-card-header">
                  <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
                  <div class="mobile-card-title">
                    <i class="ri-seedling-line"></i>
                    <span>{{ item.batchName }}</span>
                  </div>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.batch.columns.batchId') }}:</span>
                    <span class="value">{{ item.batchId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.batch.columns.cropType') }}:</span>
                    <span class="value">{{ getLabelByValue('crop_type', item.cropType) }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.batch.columns.varietyName') }}:</span>
                    <span class="value">{{ item.varietyName }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.batch.columns.objective') }}:</span>
                    <span class="value">{{ item.objective }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.batch.columns.breedingMethod') }}:</span>
                    <span class="value">{{ item.breedingMethod }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.batch.columns.year') }}:</span>
                    <span class="value">{{ item.year }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.batch.columns.workflowStatus') }}:</span>
                    <el-tag :type="getWorkflowStatusType(item.workflowStatus)" effect="plain" size="small">
                      {{ getLabelByValue('flow_status', item.workflowStatus) }}
                    </el-tag>
                  </div>
                </div>
                <div class="mobile-card-footer">
                  <el-button 
                    v-for="button in getActionButtons(item)" 
                    :key="button.action"
                    size="small"
                    :type="button.type === 'primary' ? 'primary' : ''" 
                    @click="handleAction(item, button.action)">
                    <i :class="button.icon"></i>{{ button.label }}
                  </el-button>
                </div>
              </div>

              <div class="pagination-wrapper">
                <el-pagination
                  v-model:current-page="queryParams.pageNum"
                  v-model:page-size="queryParams.pageSize"
                  :total="total"
                  layout="prev, pager, next"
                  small
                  @current-change="getList"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store'
import { useDict } from '@/hooks/useDict'
import {
  getBreedingBatchList,
  deleteBreedingBatch,
  submitForAudit,
  approveBatch,
  rejectBatch,
  archiveBatch,
  cancelBatch
} from '@/api/breedingData'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const userStore = useUserStore()

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const selectedIds = ref([])
const activeTab = ref('pendingApproval')

// 使用 useDict hook 获取字典数据
const { options, getLabelByValue, loading: dictLoading } = useDict([
  'crop_type',
  'flow_status'
])

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  batchId: '',
  batchName: '',
  cropType: '',
  varietyName: '',
  workflowStatus: ''
})

const getList = async () => {
  loading.value = true
  try {
    const res = await getBreedingBatchList(queryParams)
    dataList.value = res.rows || []
    total.value = res.total || 0
  } catch (error) {
    console.error('Failed to fetch list:', error)
  } finally {
    loading.value = false
  }
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleReset = () => {
  queryParams.pageNum = 1
  queryParams.pageSize = 10
  queryParams.batchId = ''
  queryParams.batchName = ''
  queryParams.cropType = ''
  queryParams.varietyName = ''
  setQueryParamsByTab(activeTab.value)
  getList()
}

const getWorkflowStatusType = (workflowStatus) => {
  const workflowStatusMap = {
    'S0': 'info',      // 草稿 - 灰色
    'S1': 'warning',   // 待审批 - 橙色
    'S2': 'primary',   // 审核通过 - 蓝色
    'S3': 'danger',    // 审核驳回 - 红色
    'S9': 'danger',    // 已作废 - 深红色
    'S10': 'danger'    // 异常 - 深红色
  }
  return workflowStatusMap[workflowStatus] || 'info'
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.dataId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.dataId)) {
      selectedIds.value.push(item.dataId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.dataId)
  }
}

const handleAdd = () => {
  router.push('/research/breeding-data/batch/add')
}

const handleView = (row) => {
  router.push({
    path: `/research/breeding-data/batch/detail/${row.dataId}`,
    query: {
      from: '/research/breeding-data/batch',
      tab: activeTab.value,
      ...queryParams
    }
  })
}

const handleEdit = (row) => {
  router.push({
    path: `/research/breeding-data/batch/edit/${row.dataId}`,
    query: {
      from: '/research/breeding-data/batch',
      tab: activeTab.value,
      ...queryParams
    }
  })
}

const handleDelete = (row) => {
  ElMessageBox.confirm(t('research.breedingData.batch.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deleteBreedingBatch(row.dataId)
    ElMessage.success(t('research.breedingData.batch.deleteSuccess'))
    getList()
  }).catch(() => {})
}

const handleBatchDelete = () => {
  ElMessageBox.confirm(t('research.breedingData.batch.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deleteBreedingBatch(selectedIds.value.join(','))
    ElMessage.success(t('research.breedingData.batch.deleteSuccess'))
    selectedIds.value = []
    getList()
  }).catch(() => {})
}

const setQueryParamsByTab = (tabName) => {
  // 根据标签页设置不同的查询参数
  switch (tabName) {
    case 'pendingApproval':
      queryParams.workflowStatus = 'S1' // 待审批
      break
    case 'approved':
      queryParams.workflowStatus = 'S2' // 审核通过
      break
    case 'completed':
      queryParams.workflowStatus = 'S8' // 已归档
      break
  }
}

const handleTabChange = (tabName) => {
  setQueryParamsByTab(tabName)
  getList()
}

const getActionButtons = (row) => {
  const workflowStatus = row.workflowStatus
  const buttons = []
  
  // 根据状态显示不同的操作按钮，并检查用户权限
  switch (workflowStatus) {
    case 'S0': // 草稿
      if (userStore.hasWorkflowStatusPermission('edit')) {
        buttons.push({ type: 'primary', action: 'edit', label: 'edit', icon: 'ri-edit-line' })
      }
      if (userStore.hasWorkflowStatusPermission('submit')) {
        buttons.push({ type: 'success', action: 'submit', label: 'submit', icon: 'ri-send-plane-line' })
      }
      break
    case 'S1': // 待审批
      if (userStore.hasWorkflowStatusPermission('approve')) {
        buttons.push({ type: 'primary', action: 'audit', label: 'audit', icon: 'ri-check-line' })
      }
      break
    case 'S2': // 审核通过
      buttons.push({ type: 'primary', action: 'view', label: 'view', icon: 'ri-eye-line' })
      if (userStore.hasWorkflowStatusPermission('archive')) {
        buttons.push({ type: 'success', action: 'archive', label: 'archive', icon: 'ri-archive-line' })
      }
      break
    case 'S3': // 审核驳回
      if (userStore.hasWorkflowStatusPermission('edit')) {
        buttons.push({ type: 'primary', action: 'edit', label: 'edit', icon: 'ri-edit-line' })
      }
      break
    case 'S9': // 已归档
      buttons.push({ type: 'primary', action: 'view', label: 'view', icon: 'ri-eye-line' })
      break
    case 'S10': // 已作废
      buttons.push({ type: 'primary', action: 'view', label: 'view', icon: 'ri-eye-line' })
      break
  }
  
  return buttons
}

const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
    case 'edit':
      handleEdit(row)
      break
    case 'audit':
      handleAudit(row)
      break
    case 'submit':
      handleSubmitForAudit(row)
      break
    case 'approve':
      handleApprove(row)
      break
    case 'reject':
      handleReject(row)
      break
    case 'archive':
      handleArchive(row)
      break
    case 'cancelBatch':
      handleCancelBatch(row)
      break
  }
}

const handleSubmitForAudit = async (row) => {
  try {
    // 检查权限
    if (!userStore.hasWorkflowStatusPermission('submit')) {
      ElMessage.error('You do not have permission to submit for audit')
      return
    }
    await ElMessageBox.confirm('Are you sure to submit for review?', 'prompt', { type: 'warning' })
    await submitForAudit(row.dataId)
    ElMessage.success('Successfully submitted for review')
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Failed to submit for review')
    }
  }
}

const handleApprove = async (row) => {
  try {
    // 检查权限
    if (!userStore.hasWorkflowStatusPermission('approve')) {
      ElMessage.error('You do not have permission to approve')
      return
    }
    await ElMessageBox.confirm('Are you sure to approve?', 'prompt', { type: 'warning' })
    await approveBatch(row.dataId)
    ElMessage.success('Successfully approved')
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Failed to approve')
    }
  }
}

const handleReject = async (row) => {
  try {
    // 检查权限
    if (!userStore.hasWorkflowStatusPermission('reject')) {
      ElMessage.error('You do not have permission to reject')
      return
    }
    await ElMessageBox.confirm('Are you sure to reject?', 'prompt', { type: 'warning' })
    await rejectBatch(row.id)
    ElMessage.success('Successfully rejected')
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Failed to reject')
    }
  }
}

const handleArchive = async (row) => {
  try {
    // 检查权限
    if (!userStore.hasWorkflowStatusPermission('archive')) {
      ElMessage.error('You do not have permission to archive')
      return
    }
    await ElMessageBox.confirm('Are you sure to archive?', 'prompt', { type: 'warning' })
    await archiveBatch(row.dataId)
    ElMessage.success('Successfully archived')
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Failed to archive')
    }
  }
}

const handleCancelBatch = async (row) => {
  try {
    // 检查权限
    if (!userStore.hasWorkflowStatusPermission('cancel')) {
      ElMessage.error('You do not have permission to cancel')
      return
    }
    await ElMessageBox.confirm('Are you sure to cancel?', 'prompt', { type: 'warning' })
    await cancelBatch(row.dataId)
    ElMessage.success('Successfully cancelled')
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Failed to cancel')
    }
  }
}

const handleAudit = (row) => {
  router.push({
    path: `/research/breeding-data/batch/audit/${row.dataId}`,
    query: {
      mode: 'audit',
      from: '/research/breeding-data/batch',
      tab: activeTab.value,
      ...queryParams
    }
  })
}

onMounted(() => {
  if (route.query.tab) {
    activeTab.value = route.query.tab
    setQueryParamsByTab(activeTab.value)
  } else {
    setQueryParamsByTab(activeTab.value)
  }
  if (route.query.batchId) {
    queryParams.batchId = route.query.batchId
  }
  if (route.query.batchName) {
    queryParams.batchName = route.query.batchName
  }
  if (route.query.cropType) {
    queryParams.cropType = route.query.cropType
  }
  if (route.query.varietyName) {
    queryParams.varietyName = route.query.varietyName
  }
  if (route.query.pageNum) {
    queryParams.pageNum = parseInt(route.query.pageNum) || 1
  }
  if (route.query.pageSize) {
    queryParams.pageSize = parseInt(route.query.pageSize) || 10
  }
  getList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.status-tabs {
  margin-bottom: 20px;
  
  :deep(.el-tabs__item) {
    font-size: 14px;
    
    i {
      margin-right: 4px;
    }
  }
}

.search-section {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;

  .search-item {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 0 0 auto;

    .search-label {
      font-size: 14px;
      color: #606266;
      white-space: nowrap;
      font-weight: 500;
    }

    .search-input {
      width: 200px;
    }

    .filter-select {
      width: 180px;
    }
  }

  .search-actions {
    display: flex;
    gap: 8px;
    margin-left: auto;

    @media (max-width: 768px) {
      margin-left: 0;
      width: 100%;

      .el-button {
        flex: 1;
      }
    }
  }

  @media (max-width: 768px) {
    .search-item {
      width: 100%;

      .search-label {
        min-width: 80px;
      }

      .search-input,
      .filter-select {
        flex: 1;
        width: auto;
      }
    }
  }
}
</style>
