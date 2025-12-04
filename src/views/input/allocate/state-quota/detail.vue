<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('quota.stateQuota.detail') }}</h1>
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
              <span>{{ $t('quota.stateQuota.form.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('quota.stateQuota.columns.quotaName')">
                {{ detailData.quotaName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('quota.stateQuota.columns.year')">
                {{ detailData.year || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('quota.stateQuota.columns.category')">
                {{ detailData.categoryName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('quota.stateQuota.columns.totalQuota')">
                <span class="quota-amount">{{ formatNumber(detailData.totalQuota) }}</span>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- Operator Information -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-user-line"></i>
              <span>{{ $t('quota.stateQuota.form.operatorInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('quota.stateQuota.columns.operator')">
                {{ detailData.operatorName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('quota.stateQuota.columns.operatorDivision')">
                {{ detailData.operatorDivisionName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('quota.stateQuota.columns.operateTime')">
                {{ detailData.operateTime || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('quota.stateQuota.columns.createTime')">
                {{ detailData.createTime || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('quota.stateQuota.columns.modifier')" v-if="detailData.modifierId">
                {{ detailData.modifierName || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('quota.stateQuota.columns.updateTime')" v-if="detailData.modifierId">
                {{ detailData.updateTime || '-' }}
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
import { getStateAnnualQuotaDetail } from '@/api/quota'
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
    const res = await getStateAnnualQuotaDetail(
      route.params.quotaId,
      userStore.userInfo?.divisionId || ''
    )
    if (res.code === 200) {
      detailData.value = res.data || {}
    } else {
      ElMessage.error(res.msg || t('common.loadFailed'))
    }
  } catch (error) {
    console.error('Failed to get quota detail:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleEdit = () => {
  router.push(`/input/allocate/state-quota/edit/${route.params.quotaId}`)
}

const goBack = () => {
  router.push('/input/allocate/state-quota')
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
</style>
