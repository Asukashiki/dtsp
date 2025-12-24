<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-test-tube-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.trial.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.breedingData.trial.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('research.breedingData.trial.list') }}</span>
            </div>
            <div class="header-actions">
              <!-- <el-button type="danger" :disabled="selectedIds.length === 0" @click="handleBatchDelete">
                <i class="ri-delete-bin-line"></i>
                {{ $t('common.batchDelete') }}
              </el-button> -->
              <el-button type="primary" @click="handleAdd">
                <i class="ri-add-line"></i>
                {{ $t('research.breedingData.trial.add') }}
              </el-button>
            </div>
          </div>

          <div class="card-body">
            <!-- 搜索筛选区 -->
            <div class="search-section">
              <div class="search-item">
                <label class="search-label">{{ $t('research.breedingData.trial.columns.trialId') }}:</label>
                <el-input
                  v-model="queryParams.trialId"
                  :placeholder="$t('research.breedingData.trial.placeholder.trialId')"
                  clearable
                  class="search-input"
                />
              </div>
              <div class="search-item">
                <label class="search-label">{{ $t('research.breedingData.trial.columns.batchId') }}:</label>
                <el-select
                  v-model="queryParams.batchId"
                  :placeholder="$t('research.breedingData.trial.placeholder.batchId')"
                  clearable
                  class="filter-select"
                >
                  <el-option v-for="item in batchOptions" :key="item.batchId" :label="item.batchName" :value="item.batchId" />
                </el-select>
              </div>
              <div class="search-item">
                <label class="search-label">{{ $t('research.breedingData.trial.columns.trialName') }}:</label>
                <el-input
                  v-model="queryParams.trialName"
                  :placeholder="$t('research.breedingData.trial.placeholder.trialName')"
                  clearable
                  class="search-input"
                />
              </div>
              <div class="search-item">
                <label class="search-label">{{ $t('research.breedingData.trial.columns.season') }}:</label>
                <el-select
                  v-model="queryParams.season"
                  :placeholder="$t('research.breedingData.trial.placeholder.season')"
                  clearable
                  class="filter-select"
                >
                  <el-option v-for="item in seasonOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
              <div class="search-item">
                <label class="search-label">{{ $t('research.breedingData.trial.columns.auditStatus') }}:</label>
                <el-select
                  v-model="queryParams.auditStatus"
                  :placeholder="$t('research.breedingData.trial.placeholder.auditStatus')"
                  clearable
                  class="filter-select"
                >
                  <el-option 
                    v-for="item in dictOptions.flow_status" 
                    :key="item.value" 
                    :label="item.label" 
                    :value="item.value" 
                  />
                </el-select>
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
                <el-table-column prop="trialId" :label="$t('research.breedingData.trial.columns.trialId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="trialName" :label="$t('research.breedingData.trial.columns.trialName')" min-width="160" show-overflow-tooltip />
                <el-table-column prop="batchId" :label="$t('research.breedingData.trial.columns.batchId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="locationId" show-overflow-tooltip :label="$t('research.breedingData.trial.columns.locationId')" min-width="120" />
                <el-table-column prop="year" :label="$t('research.breedingData.trial.columns.year')" min-width="100" />
                <el-table-column prop="season" :label="$t('research.breedingData.trial.columns.season')" min-width="100" />
                <el-table-column prop="designType" :label="$t('research.breedingData.trial.columns.designType')" min-width="140" />
                <el-table-column prop="replications" :label="$t('research.breedingData.trial.columns.replications')" min-width="100" />
                <el-table-column prop="trialStatus" :label="$t('research.breedingData.trial.columns.workflowStatus')" width="120" align="center">
                  <template #default="{ row }">
                    <StatusTag :status="row.trialStatus || row.workflowStatus || 'S0'" />
                  </template>
                </el-table-column>
                <el-table-column :label="$t('research.breedingData.trial.columns.status')" width="120" align="center">
                  <template #default="{ row }">
                    {{ getTrialStatusText(row) }}
                  </template>
                </el-table-column>
                <el-table-column prop="createdName" :label="$t('research.breedingData.trial.columns.createdName')" min-width="120" show-overflow-tooltip />
                <el-table-column prop="createTime" :label="$t('research.breedingData.trial.columns.createTime')" min-width="160" show-overflow-tooltip />
                <el-table-column :label="$t('research.breedingData.trial.columns.actions')" width="300" fixed="right">
                  <template #default="{ row }">
                    <ActionButtons :trial="row" @edit="handleEdit" @view="handleView" @submit="handleSubmit" @cancel="handleCancel" />
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
              <div v-for="item in dataList" :key="item.trialId" class="mobile-card">
                <div class="mobile-card-header">
                  <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
                  <div class="mobile-card-title">
                    <i class="ri-flask-line"></i>
                    <span>{{ item.trialName }}</span>
                  </div>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.trial.columns.trialId') }}:</span>
                    <span class="value">{{ item.trialId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.trial.columns.batchId') }}:</span>
                    <span class="value">{{ item.batchId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.trial.columns.locationId') }}:</span>
                    <span class="value">{{ item.locationId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.trial.columns.year') }}:</span>
                    <span class="value">{{ item.year }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.trial.columns.season') }}:</span>
                    <span class="value">{{ item.season }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.trial.columns.designType') }}:</span>
                    <span class="value">{{ item.designType }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.trial.columns.replications') }}:</span>
                    <span class="value">{{ item.replications }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.trial.columns.auditStatus') }}:</span>
                    <span class="value">{{ item.trialStatus || item.workflowStatus }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.trial.columns.status') }}:</span>
                    <span class="value">{{ getTrialStatusText(item) }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.trial.columns.createdName') }}:</span>
                    <span class="value">{{ item.createdName || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.trial.columns.createTime') }}:</span>
                    <span class="value">{{ item.createTime || '-' }}</span>
                  </div>
                </div>
                <div class="mobile-card-footer">
                  <el-button size="small" @click="handleView(item)">
                    <i class="ri-eye-line"></i>{{ $t('common.view') }}
                  </el-button>
                  <el-button size="small" type="primary" @click="handleEdit(item)">
                    <i class="ri-edit-line"></i>{{ $t('common.edit') }}
                  </el-button>
                  <el-button size="small" type="danger" @click="handleDelete(item)">
                    <i class="ri-delete-bin-line"></i>{{ $t('common.delete') }}
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

    <!-- 作废原因对话框 -->
    <ReasonDialog
      v-model="reasonDialogVisible"
      :title="t('research.trialBasicAudit.action.cancelReason')"
      :label="t('research.trialBasicAudit.form.cancelReason')"
      :placeholder="t('research.trialBasicAudit.form.cancelReasonPlaceholder')"
      @confirm="handleCancelConfirm"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getTrialBasicList, deleteTrialBasic, getBatchOptions } from '@/api/breedingData'
import { submitTrial, cancelTrial } from '@/api/research/trialBasicAudit'
import { useDict } from '@/hooks/useDict'
import StatusTag from './components/StatusTag.vue'
import ActionButtons from './components/ActionButtons.vue'
import ReasonDialog from './components/ReasonDialog.vue'

const router = useRouter()
const { t } = useI18n()

// 获取审核状态字典数据
const { options: dictOptions } = useDict(['flow_status'], {
  
})

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const selectedIds = ref([])
const batchOptions = ref([])

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  trialId: '',
  batchId: '',
  trialName: '',
  season: '',
  auditStatus: ''
})

const seasonOptions = [
  { label: 'Spring', value: 'spring' },
  { label: 'Summer', value: 'summer' },
  { label: 'Autumn', value: 'autumn' },
  { label: 'Winter', value: 'winter' }
]

const getList = async () => {
  loading.value = true
  try {
    const res = await getTrialBasicList(queryParams)
    dataList.value = res.rows || []
    total.value = res.total || 0
  } catch (error) {
    console.error('获取列表失败:', error)
  } finally {
    loading.value = false
  }
}

const loadBatchOptions = async () => {
  try {
    const res = await getBatchOptions()
    batchOptions.value = res.data || []
  } catch (error) {
    console.error('获取批次选项失败:', error)
  }
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleReset = () => {
  queryParams.pageNum = 1
  queryParams.pageSize = 10
  queryParams.trialId = ''
  queryParams.batchId = ''
  queryParams.trialName = ''
  queryParams.season = ''
  queryParams.auditStatus = ''
  getList()
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.trialId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.trialId)) {
      selectedIds.value.push(item.trialId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.trialId)
  }
}

const handleAdd = () => {
  router.push('/research/breeding-data/trial/add')
}

const handleView = (row) => {
  router.push(`/research/breeding-data/trial/detail/${row.trialId}`)
}

const handleEdit = (row) => {
  router.push(`/research/breeding-data/trial/edit/${row.trialId}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(t('research.breedingData.trial.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deleteTrialBasic(row.trialId)
    ElMessage.success(t('research.breedingData.trial.deleteSuccess'))
    getList()
  }).catch(() => {})
}

const handleBatchDelete = () => {
  ElMessageBox.confirm(t('research.breedingData.trial.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deleteTrialBasic(selectedIds.value.join(','))
    ElMessage.success(t('research.breedingData.trial.deleteSuccess'))
    selectedIds.value = []
    getList()
  }).catch(() => {})
}

// 提交审核
const handleSubmit = async (row) => {
  ElMessageBox.confirm(
    t('research.trialBasicAudit.action.submitConfirm'),
    t('common.warning'),
    {
      type: 'warning',
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel')
    }
  ).then(async () => {
    try {
      await submitTrial(row.trialId)
      ElMessage.success(t('research.trialBasicAudit.action.submitSuccess'))
      getList()
    } catch (error) {
      console.error('提交审核失败:', error)
    }
  }).catch(() => {})
}

// 作废
const reasonDialogVisible = ref(false)
const currentTrialId = ref('')

const handleCancel = (row) => {
  currentTrialId.value = row.trialId
  reasonDialogVisible.value = true
}

const handleCancelConfirm = async (reason) => {
  try {
    await cancelTrial(currentTrialId.value, reason)
    ElMessage.success(t('research.trialBasicAudit.action.cancelSuccess'))
    reasonDialogVisible.value = false
    getList()
  } catch (error) {
    console.error('作废失败:', error)
  }
}

onMounted(() => {
  loadBatchOptions()
  getList()
})

/**
 * 显示用状态（业务映射）：
 * - 审核通过(S2) => completed
 * - 审核中(S1)   => Active
 * 其他状态返回 "-"
 */
const getTrialStatusText = (row) => {
  const s = row?.workflowStatus || row?.trialStatus
  if (s === 'S2') return 'completed'
  if (s === 'S1') return 'Active'
  return '-'
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

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
  }
}

@media (max-width: 768px) {
  .search-section {
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

    .search-actions {
      margin-left: 0;
      width: 100%;

      .el-button {
        flex: 1;
      }
    }
  }
}
</style>
