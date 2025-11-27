<template>
  <div class="trial-detail-container">
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <el-button link @click="goBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </div>
        <div class="header-center">
          <h1 class="page-title">{{ $t('research.dataCollection.trialBase.detail') }}</h1>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="handleEdit">
            <i class="ri-edit-line"></i>
            {{ $t('common.edit') }}
          </el-button>
        </div>
      </div>
    </div>

    <div v-loading="loading" class="detail-wrapper">
      <template v-if="detailData">
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.dataCollection.trialBase.form.basicInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.trialBase.form.trialId') }}:</span>
              <span class="value">{{ detailData.trialId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.trialBase.form.cropType') }}:</span>
              <span class="value">{{ detailData.cropType }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.trialBase.form.varietyName') }}:</span>
              <span class="value">{{ detailData.varietyName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.trialBase.form.researchCenterId') }}:</span>
              <span class="value">{{ detailData.researchCenterId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.trialBase.form.programId') }}:</span>
              <span class="value">{{ detailData.programId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.trialBase.form.subProgramId') }}:</span>
              <span class="value">{{ detailData.subProgramId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.trialBase.form.thematicResearchAreaId') }}:</span>
              <span class="value">{{ detailData.thematicResearchAreaId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.trialBase.form.season') }}:</span>
              <span class="value">{{ detailData.season }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.trialBase.form.startDate') }}:</span>
              <span class="value">{{ detailData.startDate }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.trialBase.form.activityCode') }}:</span>
              <span class="value">{{ detailData.activityCode || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.trialBase.form.kpiCode') }}:</span>
              <span class="value">{{ detailData.kpiCode || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.trialBase.form.createTime') }}:</span>
              <span class="value">{{ detailData.createTime }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <div class="section-title">
            <i class="ri-map-pin-line"></i>
            {{ $t('research.dataCollection.trialBase.form.locationInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.trialBase.form.region') }}:</span>
              <span class="value">{{ detailData.region }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.trialBase.form.zone') }}:</span>
              <span class="value">{{ detailData.zone }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.trialBase.form.woreda') }}:</span>
              <span class="value">{{ detailData.woreda }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.trialBase.form.kebele') }}:</span>
              <span class="value">{{ detailData.kebele }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.trialBase.form.agroEcologicalZone') }}:</span>
              <span class="value">{{ detailData.agroEcologicalZone || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.trialBase.form.gpsLocation') }}:</span>
              <span class="value">{{ detailData.gpsLocation }}</span>
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
import { getTrialBaseDetail } from '@/api/breeding'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref(null)

const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getTrialBaseDetail(route.params.trialId)
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

const handleEdit = () => {
  router.push(`/research/data-collection/trial-base/edit/${route.params.trialId}`)
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  loadDetail()
})
</script>

<style scoped>
.trial-detail-container {
  min-height: calc(100vh - 120px);
}

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

.detail-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

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
  min-width: 160px;
  flex-shrink: 0;
}

.detail-item .value {
  color: #1f2937;
  flex: 1;
}

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
}
</style>
