<template>
  <div class="environment-soil-detail-container">
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
          <h1 class="page-title">{{ $t('research.dataCollection.environmentSoil.detail') }}</h1>
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
        <!-- 土壤属性 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-contrast-drop-2-line"></i>
            {{ $t('research.dataCollection.environmentSoil.form.soilProperties') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.environmentSoil.form.soilPh') }}:</span>
              <span class="value">{{ detailData.soilPh }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.environmentSoil.form.soilEc') }}:</span>
              <span class="value">{{ detailData.soilEc }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.environmentSoil.form.soilNitrogenPercent') }}:</span>
              <span class="value">{{ detailData.soilNitrogenPercent }}%</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.environmentSoil.form.soilPhosphorusPpm') }}:</span>
              <span class="value">{{ detailData.soilPhosphorusPpm }} ppm</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.environmentSoil.form.soilPotassiumPpm') }}:</span>
              <span class="value">{{ detailData.soilPotassiumPpm }} ppm</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.environmentSoil.form.soilMoisturePercent') }}:</span>
              <span class="value">{{ detailData.soilMoisturePercent }}%</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.environmentSoil.form.soilTemperatureC') }}:</span>
              <span class="value">{{ detailData.soilTemperatureC }}°C</span>
            </div>
          </div>
        </div>

        <!-- 环境数据 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-cloud-line"></i>
            {{ $t('research.dataCollection.environmentSoil.form.environmentData') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.environmentSoil.form.airTemperatureC') }}:</span>
              <span class="value">{{ detailData.airTemperatureC || '-' }}°C</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.environmentSoil.form.humidityPercent') }}:</span>
              <span class="value">{{ detailData.humidityPercent }}%</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.environmentSoil.form.windSpeedMs') }}:</span>
              <span class="value">{{ detailData.windSpeedMs }} m/s</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.environmentSoil.form.solarRadiationWm2') }}:</span>
              <span class="value">{{ detailData.solarRadiationWm2 }} W/m²</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.environmentSoil.form.rainfallMm') }}:</span>
              <span class="value">{{ detailData.rainfallMm || '-' }} mm</span>
            </div>
          </div>
        </div>

        <!-- 其他信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-map-line"></i>
            {{ $t('research.dataCollection.environmentSoil.form.otherInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.environmentSoil.form.topography') }}:</span>
              <el-tag>
                {{ $t(`research.dataCollection.environmentSoil.topography.${detailData.topography}`) }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.environmentSoil.form.waterSource') }}:</span>
              <span class="value">{{ detailData.waterSource }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.environmentSoil.form.slopePercent') }}:</span>
              <span class="value">{{ detailData.slopePercent || '-' }}%</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.environmentSoil.form.previousCrop') }}:</span>
              <span class="value">{{ detailData.previousCrop || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.environmentSoil.form.timestamp') }}:</span>
              <span class="value">{{ detailData.timestamp }}</span>
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
import { getEnvironmentSoilDetail } from '@/api/breeding'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref(null)

// 加载详情数据
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getEnvironmentSoilDetail(route.params.id)
    if (res.code === 200 && res.data) {
      detailData.value = res.data
    } else {
      ElMessage.error(t('common.loadFailed'))
      goBack()
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
    goBack()
  } finally {
    loading.value = false
  }
}

// 编辑
const handleEdit = () => {
  router.push(`/research/data-collection/environment-soil/edit/${route.params.id}`)
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
.environment-soil-detail-container {
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
