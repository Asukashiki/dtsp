<template>
  <div class="laboratory-test-detail-container">
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
          <h1 class="page-title">{{ $t('research.dataCollection.laboratoryTest.detail') }}</h1>
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
            {{ $t('research.dataCollection.laboratoryTest.form.basicInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.batchId') }}:</span>
              <span class="value">{{ detailData.batchId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.trialId') }}:</span>
              <span class="value">{{ detailData.trialId }}</span>
            </div>
          </div>
        </div>

        <!-- 样本信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-test-tube-line"></i>
            {{ $t('research.dataCollection.laboratoryTest.form.sampleInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.sampleId') }}:</span>
              <span class="value">{{ detailData.sampleId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.sampleCondition') }}:</span>
              <el-tag>{{ detailData.sampleCondition }}</el-tag>
            </div>
            <!-- <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.plotId') || '地块编号' }}:</span>
              <span class="value">{{ detailData.plotId || '-' }}</span>
            </div> -->
          </div>
        </div>

        <!-- 实验参数信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-flask-line"></i>
            {{ $t('research.dataCollection.laboratoryTest.form.paramInfo') || '实验参数' }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.sampleType') }}:</span>
              <span class="value">{{ detailData.sampleType || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.labParameter') }}:</span>
              <span class="value">{{ detailData.labParameter || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.expectedRange') || '预期范围' }}:</span>
              <span class="value">{{ expectedRangeText }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.resultValue') }}:</span>
              <span class="value">{{ detailData.resultValue || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.passFailFlag') }}:</span>
              <span class="value">
                <el-tag :type="passFlag === true ? 'success' : (passFlag === false ? 'danger' : 'info')">
                  {{ passFlag === true ? 'Pass' : (passFlag === false ? 'Fail' : '-') }}
                </el-tag>
              </span>
            </div>
          </div>
        </div>

        <!-- 测试数据 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-bar-chart-line"></i>
            {{ $t('research.dataCollection.laboratoryTest.form.testData') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.germinationRate') }}:</span>
              <span class="value highlight">{{ detailData.germinationRate }}%</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.purityPercent') }}:</span>
              <span class="value">{{ detailData.purityPercent }}%</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.moistureContentPercent') }}:</span>
              <span class="value">{{ detailData.moistureContentPercent }}%</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.proteinPercent') }}:</span>
              <span class="value">{{ detailData.proteinPercent }}%</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.toxinLevelPpm') }}:</span>
              <span class="value">{{ detailData.toxinLevelPpm || '-' }} PPM</span>
            </div>
          </div>
        </div>

        <!-- 健康与追溯 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-heart-pulse-line"></i>
            {{ $t('research.dataCollection.laboratoryTest.form.healthTraceability') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item full-width">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.seedHealthFindings') }}:</span>
              <span class="value">{{ detailData.seedHealthFindings }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.traceabilityLink') }}:</span>
              <span class="value">{{ detailData.traceabilityLink }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.labReportFile') }}:</span>
              <span v-if="detailData.labReportFile" class="value file-link" @click="handlePreviewFile(detailData.labReportFile)">
                <i class="ri-file-pdf-line"></i>
                {{ detailData.labReportFileName || $t('research.dataCollection.laboratoryTest.form.labReportFile') }}
              </span>
              <span v-else class="value">-</span>
            </div>
          </div>
        </div>

        <!-- 检测信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-calendar-check-line"></i>
            {{ $t('research.dataCollection.laboratoryTest.form.testingInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.testDate') }}:</span>
              <span class="value">{{ detailData.testDate || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.testOrganization') }}:</span>
              <span class="value">{{ detailData.testOrganization || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.testerName') }}:</span>
              <span class="value">{{ detailData.testerName || '-' }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getLabTestDetail } from '@/api/labTest'
import { getFilePreviewUrl } from '@/api/file'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref(null)

const PARAM_RULES = {
  'pH': { key: 'pH', type: 'range', min: 5.5, max: 7.5 },
  'moisture': { key: 'moisture', type: 'lt', max: 13, unit: '%' },
  'protein': { key: 'protein', type: 'percent', unit: '%' },
  'EC': { key: 'EC', type: 'number', unit: 'mS/cm' },
  'mycotoxin': { key: 'mycotoxin', type: 'number', unit: 'PPM' },
  'NPK': { key: 'NPK', type: 'text' }
}

const expectedRangeText = computed(() => {
  if (!detailData.value) return '-'
  const rule = PARAM_RULES[detailData.value.labParameter]
  if (!rule) return '-'
  if (rule.type === 'range') return `${rule.min} - ${rule.max}`
  if (rule.type === 'lt') return `< ${rule.max}${rule.unit || ''}`
  return '-'
})

const passFlag = computed(() => {
  if (!detailData.value) return null
  const rule = PARAM_RULES[detailData.value.labParameter]
  const raw = detailData.value.resultValue
  if (!rule || raw === undefined || raw === null || raw === '') return null
  const v = Number(raw)
  if (isNaN(v)) return null
  if (rule.type === 'range') return v >= rule.min && v <= rule.max
  if (rule.type === 'lt') return v < rule.max
  return null
})

// 加载详情数据
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getLabTestDetail(route.params.id)
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

// 文件预览处理
const handlePreviewFile = async (fileId) => {
  if (!fileId) return

  try {
    const res = await getFilePreviewUrl(fileId)
    if (res.code === 200 && res.msg) {
      window.open(res.msg, '_blank')
    } else {
      ElMessage.error(t('common.previewFailed'))
    }
  } catch (error) {
    console.error('Failed to preview file:', error)
    ElMessage.error(t('common.failed'))
  }
}

// 编辑
const handleEdit = () => {
  router.push({ name: 'BreedingLabTestEdit', params: { id: route.params.id } })
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
.laboratory-test-detail-container {
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

/* 文件链接样式 */
.file-link {
  color: #009A44 !important;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s;
}

.file-link:hover {
  color: #007a36 !important;
  text-decoration: underline;
}

.file-link i {
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
