<template>
  <div class="yield-data-detail-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <el-button link @click="handleBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </div>
        <div class="header-center">
          <h1 class="page-title">{{ $t('research.dataCollection.yieldData.detail') }}</h1>
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
        <!-- 基础信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.dataCollection.yieldData.form.basicInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.batchId') }}:</span>
              <span class="value">{{ detailData.batchId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.trialId') }}:</span>
              <span class="value">{{ detailData.trialId }}</span>
            </div>
            <!-- <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.harvestDate') }}:</span>
              <span class="value">{{ detailData.harvestDate }}</span>
            </div> -->
          </div>
        </div>

        <!-- 地块信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-map-pin-line"></i>
            {{ $t('research.dataCollection.yieldData.form.plotInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.plotId') }}:</span>
              <span class="value">{{ detailData.plotId }}</span>
            </div>
            <!-- <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.plotAreaM2') }}:</span>
              <span class="value">{{ detailData.plotAreaM2 }} m²</span>
            </div> -->
          </div>
        </div>

        <!-- 产量信息 -->
        <!-- <div class="detail-section">
          <div class="section-title">
            <i class="ri-bar-chart-box-line"></i>
            {{ $t('research.dataCollection.yieldData.form.yieldInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.grainWeightKg') }}:</span>
              <span class="value">{{ detailData.grainWeightKg }} kg</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.yieldQtPerHa') }}:</span>
              <span class="value highlight">{{ detailData.yieldQtPerHa }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.moistureContent') }}:</span>
              <span class="value">{{ detailData.moistureContent }}%</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.recorderName') }}:</span>
              <span class="value">{{ detailData.recorderName || '-' }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.remark') }}:</span>
              <span class="value">{{ detailData.remark || '-' }}</span>
            </div>
          </div>
        </div> -->

        <!-- 检验信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-file-search-line"></i>
            {{ $t('research.dataCollection.yieldData.form.inspectionInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.inspectionDate') }}:</span>
              <span class="value">{{ detailData.inspectionDate || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.inspectionType') }}:</span>
              <span class="value">{{ detailData.inspectionType || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.scoreCode') }}:</span>
              <span class="value">{{ detailData.scoreCode || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.scoreValue') }}:</span>
              <span class="value">{{ detailData.scoreValue || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 操作信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-user-line"></i>
            {{ $t('research.dataCollection.yieldData.form.operatorInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.createBy') }}:</span>
              <span class="value">{{ detailData.createdByName || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.createTime') }}:</span>
              <span class="value">{{ detailData.createdTime }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getYieldDataDetail } from '@/api/yieldData'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref(null)

// 加载详情
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getYieldDataDetail(route.params.id)
    if (res.code === 200 && res.data) {
      detailData.value = res.data
    } else {
      ElMessage.error(t('common.loadFailed'))
      handleBack()
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
    handleBack()
  } finally {
    loading.value = false
  }
}

const handleBack = () => {
  router.back()
}

const handleEdit = () => {
  router.push({ name: 'FieldInspectionEdit', params: { id: route.params.id } })
}

onMounted(() => {
  loadDetail()
})
</script>

<style scoped>
.yield-data-detail-container {
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
  flex-direction: column;
}

.detail-item .label {
  font-weight: 500;
  color: #6b7280;
  min-width: 160px;
  flex-shrink: 0;
}

.detail-item.full-width .label {
  min-width: auto;
  margin-bottom: 8px;
}

.detail-item .value {
  color: #1f2937;
  flex: 1;
}

.detail-item .value.highlight {
  color: #009A44;
  font-weight: 600;
  font-size: 16px;
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

  .detail-item.full-width {
    grid-column: auto;
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

  .detail-item .value.highlight {
    font-size: 15px;
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

  .detail-item .value.highlight {
    font-size: 14px;
  }
}
</style>
