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
          <h1 class="page-title">{{ $t('research.dataCollection.fieldInspectionAudit.detail') }}</h1>
        </div>
        <div class="header-right">
          <el-button v-if="shouldShowAuditButton" type="warning" @click="handleAudit">
            <i class="ri-file-check-line"></i>
            {{ $t('common.audit') }}
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
          </div>
        </div>

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

        <!-- 审核信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-file-check-line"></i>
            {{ $t('research.dataCollection.fieldInspectionAudit.form.auditInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.auditBy') }}:</span>
              <span class="value">{{ detailData.auditBy || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.auditTime') }}:</span>
              <span class="value">{{ detailData.auditTime || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.columns.auditStatus') }}:</span>
              <span class="value">{{ getLabelByValue('flow_status', detailData.workflowStatus) || detailData.workflowStatus || '-' }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('research.dataCollection.fieldInspectionAudit.form.auditComment') }}:</span>
              <span class="value">{{ detailData.auditRemark || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 系统信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-settings-3-line"></i>
            {{ $t('common.systemInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.createBy') }}:</span>
              <span class="value">{{ detailData.createdBy || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.createTime') }}:</span>
              <span class="value">{{ detailData.createdTime || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.updateBy') }}:</span>
              <span class="value">{{ detailData.updateBy || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.yieldData.form.updateTime') }}:</span>
              <span class="value">{{ detailData.updateTime || '-' }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getFieldInspectionAuditInfo } from '@/api/fieldInspectionAudit'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const { getLabelByValue } = useDict(['flow_status'])

const loading = ref(false)
const detailData = ref(null)

// 判断是否显示审核按钮（只在审批状态为S2或S3时显示）
const shouldShowAuditButton = computed(() => {
  if (!detailData.value) return false
  const status = detailData.value.workflowStatus
  return status === 'S1' || status === 'S3'
})

// 加载详情
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getFieldInspectionAuditInfo(route.params.id)
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




// 返回列表
const handleBack = () => {
  router.push('/research/breeding-data/field-inspection-audit')
}

// 前往审核
const handleAudit = () => {
  router.push(`/research/breeding-data/field-inspection/audit/${route.params.id}`)
}

onMounted(() => {
  loadDetail()
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/page-common.scss' as *;

.yield-data-detail-container {
  min-height: calc(100vh - 120px);
}

/* 页面头部 - 使用项目统一的渐变绿色主题 */
.page-header {
  background: linear-gradient(135deg, $primary-green 0%, #00b350 100%);
  padding: 24px 32px;
  margin: -24px -24px 24px -24px;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;

  .el-button {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    font-weight: 500;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      color: white;
    }
  }
}

.header-center {
  flex: 2;
  text-align: center;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: white;
}

.header-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;

  .el-button {
    background: rgba(255, 255, 255, 0.9);
    border: none;
    color: $primary-green;
    font-weight: 500;

    &:hover {
      background: white;
      color: $primary-green;
    }
  }
}

/* 详情区域 - 使用卡片式设计 */
.detail-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 详情分节 */
.detail-section {
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: $primary-green;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid $primary-green;
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    font-size: 20px;
  }
}

/* 详情网格布局 */
.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  background: $color-bg-light;
  border-radius: 8px;
  border: 1px solid $color-border-lighter;
  transition: all 0.3s ease;

  &:hover {
    background: rgba($primary-green, 0.05);
    border-color: $primary-green;
  }

  &.full-width {
    grid-column: 1 / -1;
  }

  .label {
    font-weight: 600;
    color: $color-text-regular;
    min-width: 140px;
    flex-shrink: 0;
    line-height: 1.5;
  }

  .value {
    flex: 1;
    color: $color-text-primary;
    line-height: 1.5;
    word-break: break-word;
  }
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .page-header {
    padding: 20px 24px;
  }

  .header-content {
    gap: 12px;
  }

  .page-title {
    font-size: 18px;
  }

  .detail-wrapper {
    padding: 20px 16px;
  }

  .detail-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .detail-item .label {
    min-width: 120px;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    padding: 16px 20px;
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .header-left,
  .header-right {
    width: 100%;
  }

  .header-center {
    width: 100%;
    text-align: left;
  }

  .header-right {
    justify-content: flex-start;
  }

  .page-title {
    font-size: 16px;
  }

  .detail-wrapper {
    padding: 16px 12px;
    border-radius: 8px;
  }

  .detail-section {
    margin-bottom: 24px;
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
    gap: 10px;
  }

  .detail-item {
    padding: 10px 12px;
    flex-direction: column;
    gap: 6px;

    .label {
      min-width: auto;
      font-size: 14px;
      color: $color-text-secondary;
    }

    .value {
      font-size: 14px;
    }
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    padding: 12px 16px;
    margin: -12px -12px 12px -12px;
  }

  .page-title {
    font-size: 15px;
  }

  .detail-wrapper {
    padding: 12px 8px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }

  .detail-item {
    padding: 8px 10px;
  }
}
</style>
