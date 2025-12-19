<template>
  <div class="environment-new-data-detail-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon-wrapper">
        <i class="ri-cloud-line"></i>
      </div>
      <div class="header-text">
        <h1 class="page-title">{{ $t('research.environmentNewData.detail') }}</h1>
        <p class="page-subtitle">{{ $t('research.environmentNewData.subtitle') }}</p>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper" v-loading="loading">
      <!-- 主要数据展示 -->
      <div class="value-card">
        <div class="value-main">
          <span class="value">{{ detailData.value }}</span>
          <span class="unit">{{ detailData.unit }}</span>
        </div>
        <div class="value-meta">
          <el-tag :type="getParameterTag(detailData.parameterCode)" size="large">
            {{ getParameterName(detailData.parameterCode) }}
          </el-tag>
          <span class="station-id">
            <i class="ri-base-station-line"></i>
            {{ detailData.stationId }}
          </span>
        </div>
        <div class="timestamp">
          <i class="ri-time-line"></i>
          {{ detailData.timestamp }}
        </div>
      </div>

      <!-- 基本信息 -->
      <div class="info-section">
        <h3 class="section-title">
          <i class="ri-information-line"></i>
          {{ $t('research.environmentNewData.form.basicInfo') }}
        </h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">{{ $t('research.environmentNewData.columns.envRecordId') }}</span>
            <span class="value">{{ detailData.envRecordId || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.environmentNewData.columns.batchId') }}</span>
            <span class="value">{{ detailData.batchName || detailData.batchId || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.environmentNewData.columns.trialId') }}</span>
            <span class="value">{{ detailData.trialName || detailData.trialId || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.environmentNewData.columns.plotId') }}</span>
            <span class="value">{{ detailData.plotName || detailData.plotId || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.environmentNewData.columns.source') }}</span>
            <span class="value">{{ detailData.source || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- 系统信息 -->
      <div class="info-section">
        <h3 class="section-title">
          <i class="ri-settings-3-line"></i>
          {{ $t('common.systemInfo') || 'System Information' }}
        </h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">{{ $t('research.environmentNewData.columns.createBy') }}</span>
            <span class="value">{{ detailData.createBy || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.environmentNewData.columns.createTime') }}</span>
            <span class="value">{{ detailData.createTime || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.environmentNewData.columns.updateBy') }}</span>
            <span class="value">{{ detailData.updateBy || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.environmentNewData.columns.updateTime') }}</span>
            <span class="value">{{ detailData.updateTime || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.environmentNewData.columns.auditBy') }}</span>
            <span class="value">{{ detailData.auditBy || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.environmentNewData.columns.auditTime') }}</span>
            <span class="value">{{ detailData.auditTime || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- 备注 -->
      <div class="info-section" v-if="detailData.remark">
        <h3 class="section-title">
          <i class="ri-file-text-line"></i>
          {{ $t('research.environmentNewData.form.remark') }}
        </h3>
        <div class="remark-content">
          {{ detailData.remark }}
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="detail-actions">
        <el-button @click="handleBack">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
        <el-button type="primary" @click="handleEdit">
          <i class="ri-edit-line"></i>
          {{ $t('common.edit') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getEnvironmentNewDataDetail } from '@/api/environment-new-data'
import { useDict } from '@/hooks/useDict'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { getLabelByValue } = useDict(['env_parameter_code'])

const loading = ref(false)
const detailData = reactive({
  envRecordId: '',
  trialId: '',
  trialName: '',
  batchId: '',
  batchName: '',
  plotId: '',
  plotName: '',
  stationId: '',
  timestamp: '',
  parameterCode: '',
  value: null,
  unit: '',
  source: '',
  remark: '',
  createBy: '',
  createTime: '',
  updateTime: '',
  updateBy: '',
  auditBy: '',
  auditTime: ''
})

// 获取参数类型标签
const getParameterTag = (code) => {
  const tagMap = {
    'RAIN_DAILY': 'primary',
    'TMAX': 'danger',
    'TMIN': 'info',
    'HUMIDITY': '',
    'WIND_SPEED': 'warning',
    'SOLAR_RAD': 'success'
  }
  return tagMap[code] || ''
}

// 获取参数名称（使用字典）
const getParameterName = (code) => {
  return getLabelByValue('env_parameter_code', code) || code || '-'
}

// 加载详情
const loadDetail = async () => {
  const id = route.params.envRecordId
  if (!id) return

  loading.value = true
  try {
    const res = await getEnvironmentNewDataDetail(id)
    if (res.code === 200 && res.data) {
      Object.assign(detailData, res.data)
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 返回
const handleBack = () => {
  router.back()
}

// 编辑
const handleEdit = () => {
  router.push(`/research/data-collection/environment-new-data/edit/${route.params.envRecordId}`)
}

onMounted(() => {
  loadDetail()
})
</script>

<style scoped>
.environment-new-data-detail-page {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  padding: 32px;
  margin: -24px 0 24px 0;
  border-radius: 0 0 16px 16px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.header-icon-wrapper {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  flex-shrink: 0;
}

.header-icon-wrapper i {
  font-size: 40px;
  color: white;
}

.header-text {
  flex: 1;
  color: white;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 15px;
  opacity: 0.9;
  margin: 0;
}

/* 内容区域 */
.content-wrapper {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 主要数据卡片 */
.value-card {
  background: linear-gradient(135deg, #f0f7f4 0%, #e8f5e9 100%);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  margin-bottom: 32px;
}

.value-main {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
}

.value-main .value {
  font-size: 56px;
  font-weight: 700;
  color: #009A44;
}

.value-main .unit {
  font-size: 24px;
  color: #606266;
}

.value-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 12px;
}

.station-id {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  color: #606266;
}

.timestamp {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #909399;
  font-size: 14px;
}

/* 信息区域 */
.info-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #e8f5e9;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 22px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-item .label {
  font-size: 13px;
  color: #909399;
}

.info-item .value {
  font-size: 15px;
  color: #303133;
  font-weight: 500;
}

.remark-content {
  padding: 16px;
  background: #f5f7fa;
  border-radius: 8px;
  color: #606266;
  line-height: 1.6;
  white-space: pre-wrap;
}

/* 操作按钮 */
.detail-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #e8f5e9;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
    padding: 20px 16px;
    gap: 16px;
  }

  .header-icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 12px;
  }

  .header-icon-wrapper i {
    font-size: 32px;
  }

  .page-title {
    font-size: 20px;
  }

  .page-subtitle {
    font-size: 13px;
  }

  .content-wrapper {
    padding: 16px;
  }

  .value-card {
    padding: 24px 16px;
  }

  .value-main .value {
    font-size: 40px;
  }

  .value-main .unit {
    font-size: 18px;
  }

  .value-meta {
    flex-direction: column;
    gap: 12px;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .detail-actions {
    flex-direction: column-reverse;
  }

  .detail-actions .el-button {
    width: 100%;
  }
}
</style>
