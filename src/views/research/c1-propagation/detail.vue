<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.c1Propagation.detail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 机构信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-building-line"></i>
              {{ $t('research.c1Propagation.form.basicInfo') }}
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.c1Propagation.form.applicantOrgType')">
                {{ $t(`research.c1Propagation.orgType.${detailData.applicantOrgType}`) }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1Propagation.form.applicantOrgName')">
                {{ detailData.applicantOrgName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1Propagation.form.applicantOrgId')">
                {{ detailData.applicantOrgId }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1Propagation.columns.authId')" v-if="detailData.authId">
                {{ detailData.authId }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 繁殖信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-plant-line"></i>
              {{ $t('research.c1Propagation.form.propagationInfo') }}
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.c1Propagation.form.propagationBatchId')">
                {{ detailData.propagationBatchId }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1Propagation.sourceType')" v-if="detailData.sourceType">
                <el-tag :type="detailData.sourceType === 'OSE_RECEIVE' ? 'success' : 'primary'" size="small">
                  {{ detailData.sourceType === 'OSE_RECEIVE' ? $t('research.c1Propagation.sourceOseReceive') :
                    $t('research.c1Propagation.sourceOseBatch') }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1Propagation.form.cropType')">
                {{ getLabelByValue('crop_type', detailData.cropType) }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1Propagation.form.varietyName')">
                {{ detailData.varietyName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1Propagation.form.applyDate')">
                {{ detailData.applyDate }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1Propagation.form.demandQuantity')">
                {{ detailData.demandQuantity || '-' }} kg
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1Propagation.form.fromSeedType')">
                {{ detailData.fromSeedType || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1Propagation.form.toSeedType')">
                {{ detailData.toSeedType || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1Propagation.form.applyDescription')" :span="2">
                {{ detailData.applyDescription || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 审核信息(如果已审核) -->
        <div class="info-card" v-if="detailData.applyStatus !== 'pending'">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-checkbox-circle-line"></i>
              {{ $t('research.c1Propagation.form.auditInfo') }}
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.c1Propagation.form.auditResult')">
                <el-tag :type="detailData.auditResult === 'approved' ? 'success' : 'danger'">
                  {{ $t(`research.c1Propagation.auditResult.${detailData.auditResult}`) }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1Propagation.form.auditor')">
                {{ detailData.auditor || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1Propagation.form.auditOrg')">
                {{ detailData.auditOrg || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1Propagation.form.auditTime')">
                {{ detailData.auditTime || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1Propagation.form.auditOpinion')" :span="2">
                {{ detailData.auditOpinion || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 操作人信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-user-line"></i>
              {{ $t('research.c1Propagation.form.operatorInfo') }}
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.c1Propagation.form.operator')">
                {{ detailData.operator || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1Propagation.form.operationOrg')">
                {{ detailData.operationOrg || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1Propagation.form.operationTime')">
                {{ detailData.operationTime || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.c1Propagation.form.createdTime')">
                {{ detailData.createdTime || '-' }}
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
import { getC1PropagationById } from '@/api/c1Propagation'
import { useDict } from '@/hooks/useDict'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// 使用 useDict hook 获取字典数据
const { getLabelByValue } = useDict(['crop_type'])

// 数据状态
const loading = ref(false)
const detailData = ref({})

// 获取状态类型
const getStatusType = (status) => {
  const types = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return types[status] || 'info'
}

// 加载详情数据
const getInfo = async () => {
  loading.value = true
  try {
    const res = await getC1PropagationById(route.params.id)
    if (res.code === 200 && res.data) {
      detailData.value = res.data
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  getInfo()
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/page-common.scss';
</style>
