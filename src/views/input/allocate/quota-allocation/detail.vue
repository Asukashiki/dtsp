<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('input.quota.allocation.detail') }}</h1>
          </div>
        </div>
        <div class="header-actions">
          <el-button type="primary" @click="handleEdit">
            <i class="ri-edit-line"></i>{{ $t('common.edit') }}
          </el-button>
        </div>
      </div>

      <div class="content-wrapper" v-loading="loading">
        <!-- Basic Information -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>{{ $t('input.quota.allocation.form.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.allocationName')" :span="2">
                {{ detailData.allocationName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.year')">
                {{ detailData.year || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.category')">
                {{ detailData.categoryName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.fromDivision')">
                {{ detailData.fromDivisionName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.fromLevel')">
                {{ getLevelName(detailData.fromDivisionLevel) }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.toDivision')">
                {{ detailData.toDivisionName || detailData.toFarmerName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.parentDivision')">
                {{ detailData.fromParentDivisionName || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- Quota Details -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-pie-chart-line"></i>
              <span>{{ $t('input.quota.allocation.form.quotaDetails') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.quotaName')">
                {{ detailData.quotaName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.totalReceived')">
                <span class="quota-amount">{{ formatNumber(detailData.totalReceivedQuota) }}</span>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.allocatedQuota')">
                <span class="quota-amount">{{ formatNumber(detailData.allocatedQuota) }}</span>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.totalAllocated')">
                <span class="quota-amount">{{ formatNumber(detailData.totalAllocatedQuota) }}</span>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.remainingQuota')">
                <span class="quota-remaining">{{ formatNumber(detailData.remainingQuota) }}</span>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.status')">
                <el-tag :type="getStatusType(detailData.allocationStatus)" size="small">
                  {{ detailData.allocationStatusName }}
                </el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- Operator Information -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-user-line"></i>
              <span>{{ $t('input.quota.allocation.form.operatorInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.operator')">
                {{ detailData.operatorName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.operatorDivision')">
                {{ detailData.operatorDivisionName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.operateTime')">
                {{ detailData.operateTime || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.progressUpdateTime')">
                {{ detailData.progressUpdateTime || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.createTime')">
                {{ detailData.createTime || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.updateTime')">
                {{ detailData.updateTime || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.modifier')" v-if="detailData.modifierId">
                {{ detailData.modifierName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('input.quota.allocation.columns.modifierDivision')" v-if="detailData.modifierId">
                {{ detailData.modifierDivisionName || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getQuotaAllocationDetail } from '@/api/quota'
import { useUserStore } from '@/store/user'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const loading = ref(false)
const detailData = ref({})

const getInfo = async () => {
  loading.value = true
  try {
    const res = await getQuotaAllocationDetail(
      route.params.allocationId,
      userStore.userInfo?.divisionId || ''
    )
    if (res.code === 200) {
      detailData.value = res.data || {}
    } else {
      ElMessage.error(res.msg || t('common.loadFailed'))
    }
  } catch (error) {
    console.error('Failed to get allocation detail:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const getLevelName = (level) => {
  const levels = {
    1: t('input.quota.allocation.level.region'),
    2: t('input.quota.allocation.level.zone'),
    3: t('input.quota.allocation.level.worede'),
    4: t('input.quota.allocation.level.kebele')
  }
  return levels[level] || '-'
}

const getStatusType = (status) => {
  const types = {
    0: 'info',
    1: 'warning',
    2: 'success'
  }
  return types[status] || 'info'
}

const handleEdit = () => {
  router.push(`/input/allocate/quota-allocation/edit/${route.params.allocationId}`)
}

const goBack = () => {
  router.push('/input/allocate/quota-allocation')
}

const formatNumber = (num) => {
  if (num == null) return '-'
  return Number(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

onMounted(() => {
  getInfo()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.quota-amount {
  font-weight: 600;
  color: var(--el-color-primary);
  font-size: 16px;
}

.quota-remaining {
  font-weight: 600;
  color: var(--el-color-success);
  font-size: 16px;
}
</style>
