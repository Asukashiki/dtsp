<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-flow-chart"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('input.quota.allocation.title') }}</h1>
            <p class="page-subtitle">{{ $t('input.quota.allocation.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('input.quota.allocation.list') }}</span>
            </div>
            <div class="header-actions">
              <el-button type="danger" :disabled="selectedIds.length === 0" @click="handleBatchDelete">
                <i class="ri-delete-bin-line"></i>
                {{ $t('common.batchDelete') }}
              </el-button>
              <el-button type="primary" @click="handleAdd">
                <i class="ri-add-line"></i>
                {{ $t('input.quota.allocation.add') }}
              </el-button>
            </div>
          </div>

          <div class="card-body">
            <!-- Search Section -->
            <div class="search-section">
              <el-select
                v-model="queryParams.year"
                :placeholder="$t('input.quota.allocation.placeholder.year')"
                clearable
                class="filter-select"
                @change="handleQuery"
              >
                <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" />
              </el-select>
              <el-select
                v-model="queryParams.categoryId"
                :placeholder="$t('input.quota.allocation.placeholder.category')"
                clearable
                class="filter-select"
                @change="handleQuery"
              >
                <el-option
                  v-for="item in categoryOptions"
                  :key="item.value"
                  :label="$t(`input.quota.category.${item.label}`)"
                  :value="item.value"
                />
              </el-select>
              <el-select
                v-model="queryParams.fromDivisionLevel"
                :placeholder="$t('input.quota.allocation.placeholder.level')"
                clearable
                class="filter-select"
                @change="handleQuery"
              >
                <el-option
                  v-for="item in divisionLevelOptions"
                  :key="item.value"
                  :label="$t(`input.quota.allocation.level.${item.label}`)"
                  :value="item.value"
                />
              </el-select>
              <el-select
                v-model="queryParams.allocationStatus"
                :placeholder="$t('input.quota.allocation.placeholder.status')"
                clearable
                class="filter-select"
                @change="handleQuery"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="$t(`input.quota.allocation.status.${item.label}`)"
                  :value="item.value"
                />
              </el-select>
            </div>

            <!-- PC Table -->
            <div class="table-wrapper pc-only">
              <el-table :data="dataList" stripe v-loading="loading" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" />
                <el-table-column prop="allocationName" :label="$t('input.quota.allocation.columns.allocationName')" min-width="250" show-overflow-tooltip />
                <el-table-column prop="year" :label="$t('input.quota.allocation.columns.year')" width="100" />
                <el-table-column prop="categoryName" :label="$t('input.quota.allocation.columns.category')" width="120" />
                <el-table-column prop="fromDivisionName" :label="$t('input.quota.allocation.columns.fromDivision')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="toDivisionName" :label="$t('input.quota.allocation.columns.toDivision')" min-width="140" show-overflow-tooltip>
                  <template #default="{ row }">
                    {{ row.toDivisionName || row.toFarmerName || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="allocatedQuota" :label="$t('input.quota.allocation.columns.allocatedQuota')" width="120" align="right">
                  <template #default="{ row }">
                    <span class="quota-amount">{{ formatNumber(row.allocatedQuota) }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="remainingQuota" :label="$t('input.quota.allocation.columns.remainingQuota')" width="120" align="right">
                  <template #default="{ row }">
                    <span class="quota-remaining">{{ formatNumber(row.remainingQuota) }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="allocationStatus" :label="$t('input.quota.allocation.columns.status')" width="120">
                  <template #default="{ row }">
                    <el-tag :type="getStatusType(row.allocationStatus)" size="small">
                      {{ row.allocationStatusName }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="operateTime" :label="$t('input.quota.allocation.columns.operateTime')" width="160" />
                <el-table-column :label="$t('common.actions')" width="200" fixed="right">
                  <template #default="{ row }">
                    <div class="action-buttons">
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
              <div v-for="item in dataList" :key="item.allocationId" class="mobile-card">
                <div class="mobile-card-header">
                  <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
                  <div class="mobile-card-title">
                    <i class="ri-flow-chart"></i>
                    <span>{{ item.year }} - {{ item.categoryName }}</span>
                  </div>
                  <el-tag :type="getStatusType(item.allocationStatus)" size="small">
                    {{ item.allocationStatusName }}
                  </el-tag>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('input.quota.allocation.columns.fromDivision') }}:</span>
                    <span class="value">{{ item.fromDivisionName }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('input.quota.allocation.columns.toDivision') }}:</span>
                    <span class="value">{{ item.toDivisionName || item.toFarmerName || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('input.quota.allocation.columns.allocatedQuota') }}:</span>
                    <span class="value quota-amount">{{ formatNumber(item.allocatedQuota) }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('input.quota.allocation.columns.remainingQuota') }}:</span>
                    <span class="value quota-remaining">{{ formatNumber(item.remainingQuota) }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('input.quota.allocation.columns.operateTime') }}:</span>
                    <span class="value">{{ item.operateTime }}</span>
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getQuotaAllocationPage, deleteQuotaAllocation } from '@/api/quota'
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
  fromDivisionId: '',
  fromDivisionLevel: null,
  allocationStatus: null,
  operatorDivisionId: userStore.userInfo?.divisionId || ''
})

// Generate year options
const yearOptions = ref([])
const currentYear = new Date().getFullYear()
for (let i = 0; i < 6; i++) {
  yearOptions.value.push(currentYear + i)
}

// Category options
const categoryOptions = [
  { label: 'seed', value: '1' },
  { label: 'fertilizer', value: '2' },
  { label: 'pesticide', value: '3' },
  { label: 'other', value: '4' }
]

// Division level options
const divisionLevelOptions = [
  { label: 'region', value: 1 },
  { label: 'zone', value: 2 },
  { label: 'worede', value: 3 },
  { label: 'kebele', value: 4 }
]

// Status options
const statusOptions = [
  { label: 'notAllocated', value: 0 },
  { label: 'partiallyAllocated', value: 1 },
  { label: 'completed', value: 2 }
]

const getStatusType = (status) => {
  const types = {
    0: 'info',
    1: 'warning',
    2: 'success'
  }
  return types[status] || 'info'
}

const getList = async () => {
  loading.value = true
  try {
    const res = await getQuotaAllocationPage(queryParams)
    if (res.code === 200) {
      dataList.value = res.data.records || []
      total.value = res.data.total || 0
    }
  } catch (error) {
    console.error('Failed to get allocation list:', error)
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
  selectedIds.value = selection.map(item => item.allocationId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.allocationId)) {
      selectedIds.value.push(item.allocationId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.allocationId)
  }
}

const handleAdd = () => {
  router.push('/input/allocate/quota-allocation/add')
}

const handleView = (row) => {
  router.push(`/input/allocate/quota-allocation/detail/${row.allocationId}`)
}

const handleEdit = (row) => {
  router.push(`/input/allocate/quota-allocation/edit/${row.allocationId}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    t('input.quota.allocation.deleteConfirm'),
    t('common.warning'),
    {
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await deleteQuotaAllocation({
        allocationId: row.allocationId,
        operatorId: userStore.userInfo?.userId,
        operatorDivisionId: userStore.userInfo?.divisionId
      })
      if (res.code === 200) {
        ElMessage.success(t('input.quota.allocation.deleteSuccess'))
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
    t('input.quota.allocation.batchDeleteConfirm'),
    t('common.warning'),
    {
      type: 'warning'
    }
  ).then(async () => {
    try {
      for (const allocationId of selectedIds.value) {
        await deleteQuotaAllocation({
          allocationId,
          operatorId: userStore.userInfo?.userId,
          operatorDivisionId: userStore.userInfo?.divisionId
        })
      }
      ElMessage.success(t('input.quota.allocation.deleteSuccess'))
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

.quota-remaining {
  font-weight: 600;
  color: var(--el-color-success);
}
</style>
