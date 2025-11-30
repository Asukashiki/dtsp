<template>
  <div class="certification-detail-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <el-button link @click="goBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </div>
        <div class="header-center">
          <h1 class="page-title">{{ $t('seed.breedingCertification.detail') }}</h1>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="handleEdit">
            <i class="ri-edit-line"></i>
            {{ $t('common.edit') }}
          </el-button>
        </div>
      </div>
    </div>

    <!-- 详情区域 -->
    <div v-loading="loading" class="detail-wrapper">
      <template v-if="detailData">
        <!-- 认证申请信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-file-text-line"></i>
            {{ $t('seed.breedingCertification.form.certificationInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.authId') }}:</span>
              <span class="value">{{ detailData.authId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.breedingBatchId') }}:</span>
              <span class="value">{{ detailData.breedingBatchId || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.applyOrgName') }}:</span>
              <span class="value">{{ detailData.applyOrgName || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.applyOrgId') }}:</span>
              <span class="value">{{ detailData.applyOrgId || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.recordDate') }}:</span>
              <span class="value">{{ detailData.recordDate || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.cropType') }}:</span>
              <el-tag v-if="detailData.cropType" type="success">
                {{ $t(`seed.breedingCertification.cropTypes.${detailData.cropType}`) }}
              </el-tag>
              <span v-else class="value">-</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.varietyName') }}:</span>
              <span class="value">{{ detailData.varietyName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.recordStatus') }}:</span>
              <el-tag :type="getStatusTag(detailData.recordStatus)">
                {{ $t(`seed.breedingCertification.recordStatus.${detailData.recordStatus}`) }}
              </el-tag>
            </div>
          </div>
        </div>

        <!-- 品种信息 -->
        <div v-if="detailData.varietyInfo" class="detail-section">
          <div class="section-title">
            <i class="ri-seedling-line"></i>
            {{ $t('seed.breedingCertification.form.varietyInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.varietyCode') }}:</span>
              <span class="value">{{ detailData.varietyInfo.varietyCode }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.species') }}:</span>
              <span class="value">{{ detailData.varietyInfo.species }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.genus') }}:</span>
              <span class="value">{{ detailData.varietyInfo.genus }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.family') }}:</span>
              <span class="value">{{ detailData.varietyInfo.family }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.breedingMethod') }}:</span>
              <span class="value" v-if="detailData.varietyInfo.breedingMethod">
                {{ $t(`seed.breedingCertification.breedingMethods.${detailData.varietyInfo.breedingMethod}`) }}
              </span>
              <span v-else class="value">-</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.breedingYear') }}:</span>
              <span class="value">{{ detailData.varietyInfo.breedingYear }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('seed.breedingCertification.form.pedigree') }}:</span>
              <span class="value text-block">{{ detailData.varietyInfo.pedigree }}</span>
            </div>
          </div>
        </div>

        <!-- 技术性状信息 -->
        <div v-if="detailData.technicalTrait" class="detail-section">
          <div class="section-title">
            <i class="ri-bar-chart-line"></i>
            {{ $t('seed.breedingCertification.form.technicalTrait') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.minYieldPotential') }}:</span>
              <span class="value">{{ detailData.technicalTrait.minYieldPotential }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.maxYieldPotential') }}:</span>
              <span class="value">{{ detailData.technicalTrait.maxYieldPotential }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.maturityPeriod') }}:</span>
              <span class="value">{{ detailData.technicalTrait.maturityPeriod }} {{ $t('common.days') }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.plantHeight') }}:</span>
              <span class="value">{{ detailData.technicalTrait.plantHeight }} CM</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.diseaseResistance') }}:</span>
              <span class="value">{{ detailData.technicalTrait.diseaseResistance }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.stressResistance') }}:</span>
              <span class="value">{{ detailData.technicalTrait.stressResistance }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('seed.breedingCertification.form.grainQualityTrait') }}:</span>
              <span class="value text-block">{{ detailData.technicalTrait.grainQualityTrait }}</span>
            </div>
          </div>
        </div>

        <!-- 试验与性能信息 -->
        <div v-if="detailData.trialPerformance" class="detail-section">
          <div class="section-title">
            <i class="ri-flask-line"></i>
            {{ $t('seed.breedingCertification.form.trialPerformance') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.trialLocation') }}:</span>
              <span class="value">{{ detailData.trialPerformance.trialLocation }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.trialYear') }}:</span>
              <span class="value">{{ detailData.trialPerformance.trialYear }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.averageYield') }}:</span>
              <span class="value">{{ detailData.trialPerformance.averageYield }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.stabilityScore') }}:</span>
              <span class="value">{{ detailData.trialPerformance.stabilityScore }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('seed.breedingCertification.form.trialReport') }}:</span>
              <span class="value">{{ detailData.trialPerformance.trialReport }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('seed.breedingCertification.form.photo') }}:</span>
              <span class="value">{{ detailData.trialPerformance.photo }}</span>
            </div>
          </div>
        </div>

        <!-- 监管信息 -->
        <div v-if="detailData.supervision" class="detail-section">
          <div class="section-title">
            <i class="ri-shield-check-line"></i>
            {{ $t('seed.breedingCertification.form.supervision') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.approvalNumber') }}:</span>
              <span class="value">{{ detailData.supervision.approvalNumber }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.approvalOrganization') }}:</span>
              <span class="value">{{ detailData.supervision.approvalOrganization }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.form.approvalDate') }}:</span>
              <span class="value">{{ detailData.supervision.approvalDate }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('seed.breedingCertification.form.certificationDocument') }}:</span>
              <span class="value">{{ detailData.supervision.certificationDocument }}</span>
            </div>
          </div>
        </div>

        <!-- 审核信息 -->
        <div v-if="detailData.auditResult" class="detail-section">
          <div class="section-title">
            <i class="ri-file-list-3-line"></i>
            {{ $t('seed.breedingCertification.audit.auditInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.audit.result') }}:</span>
              <el-tag :type="getStatusTag(detailData.auditResult)">
                {{ $t(`seed.breedingCertification.recordStatus.${detailData.auditResult}`) }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.audit.auditor') }}:</span>
              <span class="value">{{ detailData.auditor || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.audit.auditTime') }}:</span>
              <span class="value">{{ detailData.auditTime || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.audit.auditOrg') }}:</span>
              <span class="value">{{ detailData.auditorOrgName || '-' }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('seed.breedingCertification.audit.comment') }}:</span>
              <span class="value text-block">{{ detailData.auditComment || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 打印信息 -->
        <div v-if="detailData.printCount" class="detail-section">
          <div class="section-title">
            <i class="ri-printer-line"></i>
            {{ $t('seed.breedingCertification.print.printInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.print.printCount') }}:</span>
              <span class="value">{{ detailData.printCount }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('seed.breedingCertification.print.lastPrintTime') }}:</span>
              <span class="value">{{ detailData.lastPrintTime || '-' }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getBreedingCertificationDetail } from '@/api/seed'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref(null)

// 获取状态标签颜色
const getStatusTag = (status) => {
  const statusMap = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
    draft: 'info'
  }
  return statusMap[status] || 'info'
}

// 加载详情数据
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getBreedingCertificationDetail(route.params.id)
    if (res.code === 200) {
      detailData.value = res.data
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.failed'))
    goBack()
  } finally {
    loading.value = false
  }
}

// 编辑
const handleEdit = () => {
  router.push(`/research/seed/breeding-certification/edit/${route.params.id}`)
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  loadDetail()
})
</script>

<style scoped>
.certification-detail-container {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  margin: -24px -24px 24px -24px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left,
.header-right {
  flex: 1;
}

.header-center {
  flex: 2;
  text-align: center;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #1f2937;
}

/* 详情区域 */
.detail-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

/* 详情分节 */
.detail-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 20px;
}

/* 详情网格 */
.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-item .label {
  font-weight: 500;
  color: #6b7280;
  min-width: 140px;
  flex-shrink: 0;
}

.detail-item .value {
  color: #1f2937;
  flex: 1;
}

.detail-item .value.text-block {
  white-space: pre-wrap;
  line-height: 1.6;
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 16px;
  }

  .detail-section {
    padding: 20px 16px;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 12px;
    flex-wrap: wrap;
  }

  .header-left,
  .header-center,
  .header-right {
    flex: auto;
  }

  .header-left {
    order: 1;
  }

  .header-center {
    order: 2;
    width: 100%;
    margin-top: 8px;
    text-align: left;
  }

  .header-right {
    order: 3;
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 50;
  }

  .header-right .el-button {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    padding: 0;
    background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
    border: none;
    box-shadow: 0 4px 16px rgba(0, 154, 68, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-right .el-button i {
    font-size: 24px;
    margin-right: 0;
  }

  .header-right .el-button span {
    display: none;
  }

  .header-left .el-button {
    font-size: 14px;
  }

  .page-title {
    font-size: 16px;
  }

  .detail-section {
    padding: 16px 12px;
    margin-bottom: 12px;
    border-radius: 8px;
  }

  .section-title {
    font-size: 15px;
    margin-bottom: 16px;
    padding-bottom: 10px;
  }

  .section-title i {
    font-size: 18px;
  }

  /* 单列布局 */
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .detail-item.full-width {
    grid-column: 1;
  }

  .detail-item {
    flex-direction: column;
    gap: 6px;
    padding: 12px;
    background: rgba(0, 154, 68, 0.02);
    border-radius: 8px;
    border-left: 3px solid #009A44;
  }

  .detail-item .label {
    min-width: auto;
    font-size: 13px;
    color: #009A44;
    font-weight: 600;
  }

  .detail-item .value {
    font-size: 14px;
    color: #303133;
  }

  .detail-item .value.text-block {
    font-size: 13px;
    line-height: 1.6;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    margin: -8px -8px 8px -8px;
  }

  .header-content {
    padding: 10px 8px;
  }

  .page-title {
    font-size: 15px;
  }

  .header-right .el-button {
    width: 48px;
    height: 48px;
    bottom: 16px;
    right: 16px;
  }

  .header-right .el-button i {
    font-size: 20px;
  }

  .detail-section {
    padding: 12px 8px;
    margin-bottom: 8px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }

  .detail-grid {
    gap: 12px;
  }

  .detail-item {
    padding: 10px;
  }

  .detail-item .label {
    font-size: 12px;
  }

  .detail-item .value {
    font-size: 13px;
  }

  .detail-item .value.text-block {
    font-size: 12px;
  }
}
</style>
