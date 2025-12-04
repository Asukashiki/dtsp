<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-pie-chart-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('quota.stateQuota.title') }}</h1>
            <p class="page-subtitle">{{ $t('quota.stateQuota.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('quota.stateQuota.list') }}</span>
            </div>
            <div class="header-actions">
              <el-button type="danger" :disabled="selectedIds.length === 0" @click="handleBatchDelete">
                <i class="ri-delete-bin-line"></i>
                {{ $t('common.batchDelete') }}
              </el-button>
              <el-button type="primary" @click="handleAdd">
                <i class="ri-add-line"></i>
                {{ $t('quota.stateQuota.add') }}
              </el-button>
            </div>
          </div>

          <div class="card-body">
            <!-- Search Section -->
            <div class="search-section">
              <el-select
                v-model="queryParams.year"
                :placeholder="$t('quota.stateQuota.placeholder.year')"
                clearable
                class="filter-select"
                @change="handleQuery"
              >
                <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" />
              </el-select>
              <el-select
                v-model="queryParams.categoryId"
                :placeholder="$t('quota.stateQuota.placeholder.category')"
                clearable
                class="filter-select"
                @change="handleQuery"
              >
                <el-option
                  v-for="item in categoryOptions"
                  :key="item.value"
                  :label="$t(`quota.category.${item.label}`)"
                  :value="item.value"
                />
              </el-select>
            </div>

            <!-- PC Table -->
            <div class="table-wrapper pc-only">
              <el-table :data="dataList" stripe v-loading="loading" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" />
                <el-table-column prop="quotaName" :label="$t('quota.stateQuota.columns.quotaName')" min-width="180" show-overflow-tooltip />
                <el-table-column prop="year" :label="$t('quota.stateQuota.columns.year')" width="80" />
                <el-table-column prop="categoryName" :label="$t('quota.stateQuota.columns.category')" width="100" />
                <el-table-column prop="totalQuota" :label="$t('quota.stateQuota.columns.totalQuota')" width="120" align="right">
                  <template #default="{ row }">
                    <span class="quota-amount">{{ formatNumber(row.totalQuota) }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('quota.stateQuota.columns.allocationProgress')" width="200">
                  <template #default="{ row }">
                    <div class="progress-cell">
                      <el-progress
                        :percentage="row.progressPercent || 0"
                        :status="getProgressStatus(row.progressPercent)"
                        :stroke-width="10"
                        :show-text="false"
                      />
                      <span class="progress-text">
                        {{ formatNumber(row.allocatedQuota || 0) }} / {{ formatNumber(row.totalQuota) }}
                      </span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('quota.stateQuota.columns.allocationStatus')" width="120">
                  <template #default="{ row }">
                    <el-tag :type="getStatusType(row.allocationStatus)" size="small">
                      {{ getStatusText(row.allocationStatus) }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="operateTime" :label="$t('quota.stateQuota.columns.operateTime')" width="150" />
                <el-table-column :label="$t('common.actions')" width="240" fixed="right">
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button link type="success" @click="handleAllocate(row)">
                        <i class="ri-share-forward-line"></i>{{ $t('quota.stateQuota.allocate') }}
                      </el-button>
                      <el-button link type="primary" @click="handleView(row)">
                        <i class="ri-eye-line"></i>{{ $t('common.view') }}
                      </el-button>
                      <el-button link type="primary" @click="handleEdit(row)">
                        <i class="ri-edit-line"></i>{{ $t('common.edit') }}
                      </el-button>
                      <el-button link type="danger" @click="handleDelete(row)">
                        <i class="ri-delete-bin-line"></i>{{ $t('common.delete') }}
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

            <!-- Mobile Card List -->
            <div class="mobile-card-list mobile-only">
              <div v-for="item in dataList" :key="item.quotaId" class="mobile-card">
                <div class="mobile-card-header">
                  <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
                  <div class="mobile-card-title">
                    <i class="ri-pie-chart-line"></i>
                    <span>{{ item.quotaName }}</span>
                  </div>
                  <el-tag :type="getStatusType(item.allocationStatus)" size="small">
                    {{ getStatusText(item.allocationStatus) }}
                  </el-tag>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('quota.stateQuota.columns.year') }}:</span>
                    <span class="value">{{ item.year }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('quota.stateQuota.columns.category') }}:</span>
                    <span class="value">{{ item.categoryName }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('quota.stateQuota.columns.totalQuota') }}:</span>
                    <span class="value quota-amount">{{ formatNumber(item.totalQuota) }}</span>
                  </div>
                  <div class="mobile-card-row progress-row">
                    <span class="label">{{ $t('quota.stateQuota.columns.allocationProgress') }}:</span>
                    <div class="progress-cell">
                      <el-progress
                        :percentage="item.progressPercent || 0"
                        :status="getProgressStatus(item.progressPercent)"
                        :stroke-width="8"
                      />
                    </div>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('quota.stateQuota.columns.operateTime') }}:</span>
                    <span class="value">{{ item.operateTime }}</span>
                  </div>
                </div>
                <div class="mobile-card-footer">
                  <el-button size="small" type="success" @click="handleAllocate(item)">
                    <i class="ri-share-forward-line"></i>{{ $t('quota.stateQuota.allocate') }}
                  </el-button>
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getStateAnnualQuotaPage, deleteStateAnnualQuota, getQuotaAllocationSummary } from '@/api/quota'
import { useUserStore } from '@/store/user'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const selectedIds = ref([])

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  year: null,
  categoryId: '',
  operatorDivisionId: userStore.userInfo?.divisionId || ''
})

// Generate year options (current year and next 5 years)
const yearOptions = ref([])
const currentYear = new Date().getFullYear()
for (let i = 0; i < 6; i++) {
  yearOptions.value.push(currentYear + i)
}

// Category options (seed, fertilizer, pesticide, etc.)
const categoryOptions = [
  { label: 'seed', value: '1' },
  { label: 'fertilizer', value: '2' },
  { label: 'pesticide', value: '3' },
  { label: 'other', value: '4' }
]

const getList = async () => {
  loading.value = true
  try {
    const res = await getStateAnnualQuotaPage(queryParams)
    if (res.code === 200) {
      const records = res.data.records || []
      // Fetch allocation summary for each quota
      for (const record of records) {
        try {
          const summaryRes = await getQuotaAllocationSummary(record.quotaId, queryParams.operatorDivisionId)
          if (summaryRes.code === 200 && summaryRes.data) {
            record.allocatedQuota = summaryRes.data.totalAllocated || 0
            record.remainingQuota = summaryRes.data.remainingQuota || record.totalQuota
            record.progressPercent = summaryRes.data.progressPercent || 0
            record.allocationStatus = summaryRes.data.allocationStatus || 0
          }
        } catch (e) {
          record.allocatedQuota = 0
          record.remainingQuota = record.totalQuota
          record.progressPercent = 0
          record.allocationStatus = 0
        }
      }
      dataList.value = records
      total.value = res.data.total || 0
    }
  } catch (error) {
    console.error('Failed to get quota list:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.quotaId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.quotaId)) {
      selectedIds.value.push(item.quotaId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.quotaId)
  }
}

const handleAdd = () => {
  router.push('/input/allocate/state-quota/add')
}

const handleView = (row) => {
  router.push(`/input/allocate/state-quota/detail/${row.quotaId}`)
}

const handleEdit = (row) => {
  router.push(`/input/allocate/state-quota/edit/${row.quotaId}`)
}

const handleAllocate = (row) => {
  router.push(`/input/allocate/state-quota/allocate/${row.quotaId}`)
}

const handleDelete = (row) => {
  // Check if quota has allocations
  if (row.allocatedQuota > 0) {
    ElMessage.warning(t('quota.stateQuota.cannotDeleteWithAllocations'))
    return
  }

  ElMessageBox.confirm(
    t('quota.stateQuota.deleteConfirm'),
    t('common.warning'),
    {
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await deleteStateAnnualQuota({
        quotaId: row.quotaId,
        operatorId: userStore.userInfo?.userId,
        operatorDivisionId: userStore.userInfo?.divisionId
      })
      if (res.code === 200) {
        ElMessage.success(t('quota.stateQuota.deleteSuccess'))
        getList()
      } else {
        ElMessage.error(res.msg || t('common.deleteFailed'))
      }
    } catch (error) {
      console.error('Delete failed:', error)
      ElMessage.error(t('common.deleteFailed'))
    }
  }).catch(() => {})
}

const handleBatchDelete = () => {
  ElMessageBox.confirm(
    t('quota.stateQuota.batchDeleteConfirm'),
    t('common.warning'),
    {
      type: 'warning'
    }
  ).then(async () => {
    try {
      for (const quotaId of selectedIds.value) {
        await deleteStateAnnualQuota({
          quotaId,
          operatorId: userStore.userInfo?.userId,
          operatorDivisionId: userStore.userInfo?.divisionId
        })
      }
      ElMessage.success(t('quota.stateQuota.deleteSuccess'))
      selectedIds.value = []
      getList()
    } catch (error) {
      console.error('Batch delete failed:', error)
      ElMessage.error(t('common.deleteFailed'))
    }
  }).catch(() => {})
}

const formatNumber = (num) => {
  if (num == null) return '-'
  return Number(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const getProgressStatus = (percent) => {
  if (percent >= 100) return 'success'
  if (percent >= 50) return ''
  return 'warning'
}

const getStatusType = (status) => {
  const types = {
    0: 'info',
    1: 'warning',
    2: 'success'
  }
  return types[status] || 'info'
}

const getStatusText = (status) => {
  const texts = {
    0: t('quota.allocation.status.notAllocated'),
    1: t('quota.allocation.status.partiallyAllocated'),
    2: t('quota.allocation.status.completed')
  }
  return texts[status] || t('quota.allocation.status.notAllocated')
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.quota-amount {
  font-weight: 600;
  color: var(--el-color-primary);
}

.progress-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;

  .el-progress {
    width: 100%;
  }

  .progress-text {
    font-size: 12px;
    color: #666;
    text-align: center;
  }
}

.progress-row {
  flex-direction: column;
  align-items: flex-start;

  .progress-cell {
    width: 100%;
    margin-top: 4px;
  }
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
</style>
