<template>
  <div class="dataset-detail-container">
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
                    <h1 class="page-title">{{ $t('research.datasetCompilation.detail') }}</h1>
        </div>
        <div class="header-right">
          <el-button
            v-if="detailData && (detailData.datasetStatus === 'draft' || detailData.datasetStatus === 'rejected')"
            type="primary"
            @click="handleEdit"
          >
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
            {{ $t('research.datasetCompilation.form.basicInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.columns.datasetCode') }}:</span>
              <span class="value">{{ detailData.datasetCode || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.status') }}:</span>
              <el-tag :type="getStatusType(detailData.status || detailData.datasetStatus)">
                {{ getStatusLabel(detailData.status || detailData.datasetStatus) }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.trialId') }}:</span>
              <span class="value">{{ detailData.trialId || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.batchId') }}:</span>
              <span class="value">{{ detailData.batchId || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.versionNo') }}:</span>
              <span class="value">{{ detailData.versionNo || '1.0' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.recordCount') }}:</span>
              <span class="value">{{ detailData.recordCount || 0 }}</span>
            </div>
            <!-- <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.batchName') }}:</span>
              <span class="value">{{ detailData.batchName || '-' }}</span>
            </div> -->
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.cropType') }}:</span>
              <span class="value">{{ detailData.cropType || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.varietyName') }}:</span>
              <span class="value">{{ detailData.varietyName || '-' }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('research.datasetCompilation.form.remark') }}:</span>
              <span class="value">{{ detailData.remark || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 编制信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-user-line"></i>
            {{ $t('research.datasetCompilation.form.compilationInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.compiledBy') }}:</span>
              <span class="value">{{ detailData.compiledByName || detailData.compiledBy || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.compiledAt') }}:</span>
              <span class="value">{{ detailData.compiledAt || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 数据统计 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-bar-chart-line"></i>
            {{ $t('research.datasetCompilation.form.statisticsInfo') }}
          </div>
          <div class="statistics-grid">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-flask-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetCompilation.form.trialCount') }}</div>
                <div class="stat-value">{{ detailData.trialCount || 0 }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-plant-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetCompilation.form.fieldDataCount') }}</div>
                <div class="stat-value">{{ detailData.fieldDataCount || 0 }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-temp-hot-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetCompilation.form.envDataCount') }}</div>
                <div class="stat-value">{{ detailData.envDataCount || 0 }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-test-tube-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetCompilation.form.labTestCount') }}</div>
                <div class="stat-value">{{ detailData.labTestCount || 0 }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-bar-chart-box-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetCompilation.form.yieldDataCount') }}</div>
                <div class="stat-value">{{ detailData.yieldDataCount || 0 }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 提交信息 -->
        <div v-if="detailData.submitTime" class="detail-section">
          <div class="section-title">
            <i class="ri-send-plane-line"></i>
            {{ $t('research.datasetCompilation.form.submitInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.submitTime') }}:</span>
              <span class="value">{{ detailData.submitTime }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.submitBy') }}:</span>
              <span class="value">{{ detailData.submitByName || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.submitOrgName') }}:</span>
              <span class="value">{{ detailData.submitOrgName || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 审核信息 -->
        <div v-if="detailData.auditTime" class="detail-section">
          <div class="section-title">
            <i class="ri-shield-check-line"></i>
            {{ $t('research.datasetCompilation.form.auditInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.auditTime') }}:</span>
              <span class="value">{{ detailData.auditTime }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.auditBy') }}:</span>
              <span class="value">{{ detailData.auditByName || '-' }}</span>
            </div>
            <div v-if="detailData.auditOpinion" class="detail-item full-width">
              <span class="label">{{ $t('research.datasetCompilation.form.auditOpinion') }}:</span>
              <span class="value">{{ detailData.auditOpinion }}</span>
            </div>
          </div>
        </div>

        <!-- 创建信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-time-line"></i>
            {{ $t('research.datasetCompilation.form.creationInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.createdTime') }}:</span>
              <span class="value">{{ detailData.createdTime }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.createdBy') }}:</span>
              <span class="value">{{ detailData.createdByName || '-' }}</span>
            </div>
            <div v-if="detailData.updatedTime" class="detail-item">
              <span class="label">{{ $t('research.datasetCompilation.form.updatedTime') }}:</span>
              <span class="value">{{ detailData.updatedTime }}</span>
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
import { getDatasetById } from '@/api/dataset'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref(null)

// 获取状态类型
const getStatusType = (status) => {
  const statusLower = (status || '').toLowerCase()
  const typeMap = {
    draft: '',
    submitted: 'info',
    reviewing: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return typeMap[statusLower] || ''
}

// 获取状态标签
const getStatusLabel = (status) => {
  if (!status) return '-'
  const statusLower = status.toLowerCase()

  const labelMap = {
    draft: t('research.datasetCompilation.status.draft'),
    submitted: t('research.datasetCompilation.status.submitted'),
    reviewing: t('research.datasetCompilation.status.reviewing'),
    approved: t('research.datasetCompilation.status.approved'),
    rejected: t('research.datasetCompilation.status.rejected')
  }
  return labelMap[statusLower] || status
}

// 加载详情数据
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getDatasetById(route.params.id)
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
  router.push({ name: 'DatasetCompilationEdit', params: { id: route.params.id } })
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
.dataset-detail-container {
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

/* 统计卡片网格 */
.statistics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-card {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 1px solid #86efac;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
}

.stat-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon i {
  font-size: 28px;
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #009A44;
  line-height: 1;
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

  .statistics-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
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

  .statistics-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .stat-card {
    padding: 12px;
  }

  .stat-icon {
    width: 40px;
    height: 40px;
  }

  .stat-icon i {
    font-size: 20px;
  }

  .stat-label {
    font-size: 12px;
  }

  .stat-value {
    font-size: 20px;
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

  .stat-card {
    padding: 10px;
  }

  .stat-icon {
    width: 36px;
    height: 36px;
  }

  .stat-icon i {
    font-size: 18px;
  }

  .stat-label {
    font-size: 11px;
  }

  .stat-value {
    font-size: 18px;
  }
}
</style>
