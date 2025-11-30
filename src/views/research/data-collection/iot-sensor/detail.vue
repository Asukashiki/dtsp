<template>
  <div class="iot-sensor-detail-page">
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
          <h1 class="page-title">{{ $t('research.iotSensor.detail') }}</h1>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="handleEdit">
            <i class="ri-edit-line"></i>
            <span class="btn-text">{{ $t('common.edit') }}</span>
          </el-button>
        </div>
      </div>
    </div>

    <!-- 详情区域 -->
    <div v-loading="loading" class="detail-wrapper">
      <template v-if="detailData">
        <!-- 基本信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('input.catalog.form.basicInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.iotSensor.form.iotId') }}:</span>
              <span class="value">{{ detailData.iotId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.iotSensor.form.iotName') }}:</span>
              <span class="value">{{ detailData.iotName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.iotSensor.form.iotType') }}:</span>
              <el-tag :type="getTypeTag(detailData.iotType)">
                {{ getTypeName(detailData.iotType) }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.iotSensor.form.manufacturer') }}:</span>
              <span class="value">{{ detailData.manufacturer }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.iotSensor.form.firmwareVersion') }}:</span>
              <span class="value">{{ detailData.firmwareVersion }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.iotSensor.form.calibrationDate') }}:</span>
              <span class="value">{{ detailData.calibrationDate }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.iotSensor.form.batteryStatus') }}:</span>
              <span class="value" :class="getBatteryClass(detailData.batteryStatus)">{{ detailData.batteryStatus || '-' }}</span>
            </div>
            <div class="detail-item full-width" v-if="detailData.remark">
              <span class="label">{{ $t('research.iotSensor.form.remark') }}:</span>
              <span class="value">{{ detailData.remark }}</span>
            </div>
          </div>
        </div>

        <!-- 登记信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-user-line"></i>
            {{ $t('research.iotSensor.registrationInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.iotSensor.columns.createBy') }}:</span>
              <span class="value">{{ detailData.createBy || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.iotSensor.columns.orgName') }}:</span>
              <span class="value">{{ detailData.orgName || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.iotSensor.columns.createTime') }}:</span>
              <span class="value">{{ detailData.createTime || '-' }}</span>
            </div>
            <div class="detail-item" v-if="detailData.updateTime">
              <span class="label">{{ $t('research.iotSensor.columns.updateTime') }}:</span>
              <span class="value">{{ detailData.updateTime }}</span>
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
import { getIotSensorDetail } from '@/api/iot-sensor'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref(null)
const dataId = route.params.id

// 获取传感器类型标签
const getTypeTag = (type) => {
  const typeMap = {
    '01': 'danger',
    '02': 'info',
    '03': 'warning',
    '04': '',
    '05': 'success',
    '99': 'info'
  }
  return typeMap[type] || ''
}

// 获取传感器类型名称
const getTypeName = (type) => {
  const typeMap = {
    '01': t('research.iotSensor.type.temperature'),
    '02': t('research.iotSensor.type.humidity'),
    '03': t('research.iotSensor.type.light'),
    '04': t('research.iotSensor.type.soil'),
    '05': t('research.iotSensor.type.gas'),
    '99': t('research.iotSensor.type.other')
  }
  return typeMap[type] || '-'
}

// 获取电池状态样式
const getBatteryClass = (status) => {
  if (!status) return ''
  const percentage = parseInt(status)
  if (isNaN(percentage)) return ''
  if (percentage >= 60) return 'battery-good'
  if (percentage >= 30) return 'battery-medium'
  return 'battery-low'
}

// 返回
const goBack = () => {
  router.back()
}

// 编辑
const handleEdit = () => {
  router.push(`/research/data-collection/iot-sensor/edit/${dataId}`)
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getIotSensorDetail(dataId)
    if (res.code === 200) {
      detailData.value = res.data
    }
  } catch (error) {
    console.error('Failed to load sensor detail:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.iot-sensor-detail-page {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: white;
  padding: 16px 0;
  margin: -24px 0 24px 0;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.header-right {
  justify-content: flex-end;
}

.header-center {
  text-align: center;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

/* 详情区域 */
.detail-wrapper {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.detail-section {
  margin-bottom: 32px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f2f5;
}

.section-title i {
  font-size: 20px;
  color: #009A44;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-item .label {
  font-size: 14px;
  color: #909399;
  flex-shrink: 0;
  min-width: 120px;
}

.detail-item .value {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
  flex: 1;
}

/* 电池状态样式 */
.battery-good {
  color: #67c23a !important;
  font-weight: 500;
}

.battery-medium {
  color: #e6a23c !important;
  font-weight: 500;
}

.battery-low {
  color: #f56c6c !important;
  font-weight: 500;
}

/* 响应式设计 */
@media screen and (max-width: 1024px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .detail-item.full-width {
    grid-column: auto;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 0 16px;
    grid-template-columns: auto 1fr;
    gap: 16px;
  }

  .header-right {
    display: none;
  }

  .header-center {
    text-align: left;
  }

  .page-title {
    font-size: 18px;
  }

  .detail-wrapper {
    padding: 16px;
  }

  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .detail-item .label {
    min-width: auto;
  }

  .btn-text {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 0 12px;
  }

  .page-title {
    font-size: 16px;
  }

  .detail-wrapper {
    padding: 12px;
  }
}
</style>
