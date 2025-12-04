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
            <h1 class="page-title">{{ $t('quota.stateQuota.allocateTitle') }}</h1>
            <p class="page-subtitle">{{ $t('quota.stateQuota.allocateSubtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="content-wrapper" v-loading="loading">
        <!-- Quota Summary Card -->
        <div class="info-card summary-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-pie-chart-line"></i>
              <span>{{ $t('quota.stateQuota.quotaSummary') }}</span>
            </div>
          </div>
          <div class="card-body">
            <div class="summary-grid">
              <div class="summary-item">
                <span class="label">{{ $t('quota.stateQuota.columns.quotaName') }}</span>
                <span class="value">{{ quotaInfo.quotaName }}</span>
              </div>
              <div class="summary-item">
                <span class="label">{{ $t('quota.stateQuota.columns.year') }}</span>
                <span class="value">{{ quotaInfo.year }}</span>
              </div>
              <div class="summary-item">
                <span class="label">{{ $t('quota.stateQuota.columns.category') }}</span>
                <span class="value">{{ quotaInfo.categoryName }}</span>
              </div>
              <div class="summary-item">
                <span class="label">{{ $t('quota.stateQuota.columns.totalQuota') }}</span>
                <span class="value quota-total">{{ formatNumber(quotaInfo.totalQuota) }}</span>
              </div>
              <div class="summary-item">
                <span class="label">{{ $t('quota.allocation.columns.totalAllocated') }}</span>
                <span class="value quota-allocated">{{ formatNumber(allocationSummary.totalAllocated || 0) }}</span>
              </div>
              <div class="summary-item">
                <span class="label">{{ $t('quota.allocation.columns.remainingQuota') }}</span>
                <span class="value quota-remaining">{{ formatNumber(allocationSummary.remainingQuota || quotaInfo.totalQuota) }}</span>
              </div>
            </div>
            <div class="progress-bar-container">
              <el-progress
                :percentage="allocationSummary.progressPercent || 0"
                :status="getProgressStatus(allocationSummary.progressPercent)"
                :stroke-width="16"
              />
            </div>
          </div>
        </div>

        <!-- Allocation Form Card -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-share-forward-line"></i>
              <span>{{ $t('quota.allocation.allocateToZones') }}</span>
            </div>
            <div class="header-actions">
              <el-button type="primary" @click="addAllocationRow">
                <i class="ri-add-line"></i>
                {{ $t('quota.allocation.addZone') }}
              </el-button>
            </div>
          </div>
          <div class="card-body">
            <!-- Allocation Table -->
            <el-table :data="allocationItems" stripe border>
              <el-table-column type="index" width="60" :label="$t('common.index')" />
              <el-table-column :label="$t('quota.allocation.columns.toDivision')" min-width="200">
                <template #default="{ row, $index }">
                  <el-input
                    v-model="row.toDivisionId"
                    :placeholder="$t('quota.allocation.placeholder.toDivisionId')"
                    @blur="validateDivision(row, $index)"
                  >
                    <template #prepend>
                      <span>Zone ID</span>
                    </template>
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('quota.allocation.columns.toDivisionName')" min-width="150">
                <template #default="{ row }">
                  <el-input
                    v-model="row.toDivisionName"
                    :placeholder="$t('quota.allocation.placeholder.toDivisionName')"
                  />
                </template>
              </el-table-column>
              <el-table-column :label="$t('quota.allocation.columns.existingAllocation')" width="140">
                <template #default="{ row }">
                  <span class="quota-existing">{{ formatNumber(row.existingQuota || 0) }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('quota.allocation.columns.newAllocation')" width="180">
                <template #default="{ row }">
                  <el-input-number
                    v-model="row.allocatedQuota"
                    :min="0"
                    :max="remainingQuota + (row.existingQuota || 0)"
                    :precision="2"
                    :controls="false"
                    style="width: 100%"
                    @change="calculateTotal"
                  />
                </template>
              </el-table-column>
              <el-table-column :label="$t('common.actions')" width="80" fixed="right">
                <template #default="{ $index }">
                  <el-button link type="danger" @click="removeAllocationRow($index)">
                    <i class="ri-delete-bin-line"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- Allocation Summary -->
            <div class="allocation-summary">
              <div class="summary-row">
                <span class="label">{{ $t('quota.allocation.totalNewAllocation') }}:</span>
                <span class="value" :class="{ 'over-limit': totalNewAllocation > remainingQuota }">
                  {{ formatNumber(totalNewAllocation) }}
                </span>
              </div>
              <div class="summary-row">
                <span class="label">{{ $t('quota.allocation.remainingAfterAllocation') }}:</span>
                <span class="value" :class="{ 'negative': (remainingQuota - totalNewAllocation) < 0 }">
                  {{ formatNumber(remainingQuota - totalNewAllocation) }}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="form-actions">
              <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
              <el-button
                type="primary"
                @click="handleSubmit"
                :loading="submitLoading"
                :disabled="!canSubmit"
              >
                {{ $t('quota.allocation.confirmAllocation') }}
              </el-button>
            </div>
          </div>
        </div>

        <!-- Existing Allocations Card -->
        <div class="info-card" v-if="existingAllocations.length > 0">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-history-line"></i>
              <span>{{ $t('quota.allocation.existingAllocations') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-table :data="existingAllocations" stripe>
              <el-table-column prop="toDivisionId" :label="$t('quota.allocation.columns.toDivision')" min-width="120" />
              <el-table-column prop="toDivisionName" :label="$t('quota.allocation.columns.toDivisionName')" min-width="150" />
              <el-table-column prop="allocatedQuota" :label="$t('quota.allocation.columns.allocatedQuota')" width="140" align="right">
                <template #default="{ row }">
                  <span class="quota-amount">{{ formatNumber(row.allocatedQuota) }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('quota.allocation.columns.subProgress')" width="150">
                <template #default="{ row }">
                  <el-progress
                    :percentage="row.subAllocationProgress || 0"
                    :stroke-width="8"
                    :status="getProgressStatus(row.subAllocationProgress)"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="operateTime" :label="$t('quota.allocation.columns.operateTime')" width="160" />
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getStateAnnualQuotaDetail,
  getQuotaAllocationSummary,
  batchAllocateQuota
} from '@/api/quota'
import { useUserStore } from '@/store/user'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const quotaId = route.params.quotaId
const loading = ref(false)
const submitLoading = ref(false)

const quotaInfo = reactive({
  quotaId: '',
  quotaName: '',
  year: null,
  categoryId: '',
  categoryName: '',
  totalQuota: 0,
  operatorId: '',
  operatorDivisionId: ''
})

const allocationSummary = reactive({
  totalAllocated: 0,
  remainingQuota: 0,
  progressPercent: 0,
  allocations: []
})

const existingAllocations = ref([])
const allocationItems = ref([])

const remainingQuota = computed(() => {
  return allocationSummary.remainingQuota || quotaInfo.totalQuota || 0
})

const totalNewAllocation = computed(() => {
  return allocationItems.value.reduce((sum, item) => {
    return sum + (item.allocatedQuota || 0)
  }, 0)
})

const canSubmit = computed(() => {
  if (allocationItems.value.length === 0) return false
  if (totalNewAllocation.value <= 0) return false
  if (totalNewAllocation.value > remainingQuota.value) return false

  // Check all items have valid toDivisionId
  return allocationItems.value.every(item =>
    item.toDivisionId && item.allocatedQuota > 0
  )
})

const loadQuotaInfo = async () => {
  loading.value = true
  try {
    const divisionId = userStore.userInfo?.divisionId || ''

    // Load quota details
    const quotaRes = await getStateAnnualQuotaDetail(quotaId, divisionId)
    if (quotaRes.code === 200 && quotaRes.data) {
      Object.assign(quotaInfo, quotaRes.data)
    }

    // Load allocation summary
    const summaryRes = await getQuotaAllocationSummary(quotaId, divisionId)
    if (summaryRes.code === 200 && summaryRes.data) {
      Object.assign(allocationSummary, summaryRes.data)
      existingAllocations.value = summaryRes.data.allocations || []
    }
  } catch (error) {
    console.error('Failed to load quota info:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const addAllocationRow = () => {
  allocationItems.value.push({
    toDivisionId: '',
    toDivisionName: '',
    allocatedQuota: 0,
    existingQuota: 0
  })
}

const removeAllocationRow = (index) => {
  allocationItems.value.splice(index, 1)
}

const validateDivision = (row, index) => {
  // Check if division already exists in allocation list
  const duplicate = allocationItems.value.find((item, i) =>
    i !== index && item.toDivisionId === row.toDivisionId && row.toDivisionId
  )
  if (duplicate) {
    ElMessage.warning(t('quota.allocation.duplicateDivision'))
    row.toDivisionId = ''
    return
  }

  // Check if division already has existing allocation
  const existing = existingAllocations.value.find(a => a.toDivisionId === row.toDivisionId)
  if (existing) {
    row.existingQuota = existing.allocatedQuota
    row.toDivisionName = existing.toDivisionName
  }
}

const calculateTotal = () => {
  // This will trigger reactivity update
}

const handleSubmit = async () => {
  if (!canSubmit.value) {
    ElMessage.warning(t('quota.allocation.invalidAllocation'))
    return
  }

  const validItems = allocationItems.value.filter(item =>
    item.toDivisionId && item.allocatedQuota > 0
  )

  if (validItems.length === 0) {
    ElMessage.warning(t('quota.allocation.noValidItems'))
    return
  }

  // Get division ID from user store or quota info
  const divisionId = userStore.userInfo?.divisionId || quotaInfo.operatorDivisionId || ''
  const userId = userStore.userInfo?.userId || quotaInfo.operatorId || ''

  if (!divisionId) {
    ElMessage.error(t('common.userInfoMissing'))
    return
  }

  ElMessageBox.confirm(
    t('quota.allocation.confirmAllocationMsg', { count: validItems.length, total: formatNumber(totalNewAllocation.value) }),
    t('common.confirm'),
    { type: 'warning' }
  ).then(async () => {
    submitLoading.value = true
    try {
      const data = {
        quotaId: quotaId,
        year: quotaInfo.year,
        categoryId: quotaInfo.categoryId,
        fromDivisionId: divisionId,
        fromDivisionLevel: 1, // State level
        totalReceivedQuota: quotaInfo.totalQuota,
        operatorId: userId,
        operatorDivisionId: divisionId,
        items: validItems.map(item => ({
          toDivisionId: item.toDivisionId,
          toDivisionName: item.toDivisionName,
          allocatedQuota: item.allocatedQuota
        }))
      }

      const res = await batchAllocateQuota(data)
      if (res.code === 200) {
        ElMessage.success(t('quota.allocation.allocateSuccess'))
        goBack()
      } else {
        ElMessage.error(res.msg || t('common.saveFailed'))
      }
    } catch (error) {
      console.error('Allocation failed:', error)
      ElMessage.error(t('common.saveFailed'))
    } finally {
      submitLoading.value = false
    }
  }).catch(() => {})
}

const goBack = () => {
  router.push('/input/allocate/state-quota')
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

onMounted(() => {
  if (quotaId) {
    loadQuotaInfo()
  } else {
    ElMessage.error('Missing quota ID')
    goBack()
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.summary-card {
  margin-bottom: 20px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 4px;

  .label {
    font-size: 13px;
    color: #909399;
  }

  .value {
    font-size: 16px;
    font-weight: 500;
    color: #303133;
  }
}

.quota-total {
  color: var(--el-color-primary) !important;
  font-size: 18px !important;
}

.quota-allocated {
  color: var(--el-color-warning) !important;
}

.quota-remaining {
  color: var(--el-color-success) !important;
  font-size: 18px !important;
}

.quota-existing {
  color: #909399;
}

.quota-amount {
  font-weight: 600;
  color: var(--el-color-primary);
}

.progress-bar-container {
  margin-top: 16px;
}

.allocation-summary {
  margin-top: 20px;
  padding: 16px;
  background-color: #f5f7fa;
  border-radius: 8px;

  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;

    &:not(:last-child) {
      border-bottom: 1px dashed #dcdfe6;
    }

    .label {
      font-size: 14px;
      color: #606266;
    }

    .value {
      font-size: 18px;
      font-weight: 600;
      color: var(--el-color-primary);

      &.over-limit {
        color: var(--el-color-danger);
      }

      &.negative {
        color: var(--el-color-danger);
      }
    }
  }
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 24px 0;
}
</style>
