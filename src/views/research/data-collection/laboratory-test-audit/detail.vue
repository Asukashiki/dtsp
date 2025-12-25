<template>
  <div class="laboratory-test-audit-detail">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-left">
        <div class="back-btn" @click="goBack">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </div>
        <div class="header-content">
          <h1 class="page-title">{{ isAudit ? $t('research.dataCollection.laboratoryTest.auditTitle') :
            $t('research.dataCollection.laboratoryTest.detail') }}</h1>
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
          </div>
        </div>

        <!-- 实验参数信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-flask-line"></i>
            {{ $t('research.dataCollection.laboratoryTest.form.paramInfo') }}
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
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.resultValue') }}:</span>
              <span class="value">{{ detailData.resultValue || '-' }}</span>
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

        <!-- 检测信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-calendar-check-line"></i>
            {{ $t('research.dataCollection.laboratoryTest.form.testingInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.testStatus') }}:</span>
              <span class="value">
                <el-tag
                  :type="detailData.passFailFlag === 'true' || detailData.passFailFlag === true ? 'success' : (detailData.passFailFlag === 'false' || detailData.passFailFlag === false ? 'danger' : 'info')">
                  {{ detailData.passFailFlag === 'true' || detailData.passFailFlag === true ? 'Pass' :
                    (detailData.passFailFlag === 'false' || detailData.passFailFlag === false ? 'Fail' : '-') }}
                </el-tag>
              </span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.testDate') }}:</span>
              <span class="value">{{ detailData.testDate || '-' }}</span>
            </div>
          </div>
          <div class="detail-grid" style="margin-top: 20px;">
            <div class="detail-item">
              <span class="label">{{ $t('common.createdBy') }}:</span>
              <span class="value">{{ detailData.createdByName || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('common.createdTime') }}:</span>
              <span class="value">{{ detailData.createdTime || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 审核操作 (待审核状态显示) -->
        <div v-if="isAudit && activeTab === 'S1'" class="detail-section audit-section">
          <div class="section-title">
            <i class="ri-shield-check-line"></i>
            {{ $t('research.dataCollection.laboratoryTest.auditOpinion') }}
          </div>
          <el-form :model="auditForm" label-position="top">
            <el-form-item :label="$t('research.dataCollection.laboratoryTest.auditOpinion')">
              <el-input v-model="auditForm.auditOpinion" type="textarea" :rows="4"
                :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.auditOpinion')" />
            </el-form-item>
          </el-form>
          <div class="audit-actions">
            <el-button type="danger" plain @click="handleReject" :loading="submitting">
              <i class="ri-close-circle-line"></i>
              {{ $t('research.dataCollection.laboratoryTest.reject') }}
            </el-button>
            <el-button type="success" @click="handleApprove" :loading="submitting">
              <i class="ri-checkbox-circle-line"></i>
              {{ $t('research.dataCollection.laboratoryTest.approve') }}
            </el-button>
          </div>
        </div>

        <!-- 审核结果 (已审核/已取消状态显示) -->
        <div v-else-if="activeTab !== 'S1'" class="detail-section status-section">
          <div class="section-title">
            <i class="ri-history-line"></i>
            {{ $t('research.dataCollection.laboratoryTest.auditInfo') || 'Audit Information' }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('common.approver') }}:</span>
              <span class="value">{{ detailData.approveByName || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('common.approveTime') }}:</span>
              <span class="value">{{ detailData.approveTime || '-' }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('research.dataCollection.laboratoryTest.auditOpinion') }}:</span>
              <span class="value">{{ detailData.auditOpinion || '-' }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps({
  detailData: {
    type: Object,
    required: true
  },
  activeTab: {
    type: String,
    required: true
  },
  isAudit: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['back', 'approve', 'reject'])
const { t } = useI18n()
const loading = ref(false)
const submitting = ref(false)

const auditForm = reactive({
  auditOpinion: ''
})

const goBack = () => {
  emit('back')
}

const handleApprove = async () => {
  try {
    await ElMessageBox.confirm(t('research.dataCollection.laboratoryTest.approveConfirm'), t('common.confirm'), {
      type: 'warning'
    })
    emit('approve', { dataId: props.detailData.dataId, auditOpinion: auditForm.auditOpinion })
  } catch (error) {
    // User canceled
  }
}

const handleReject = async () => {
  if (!auditForm.auditOpinion || !auditForm.auditOpinion.trim()) {
    ElMessage.warning(t('research.dataCollection.laboratoryTest.rejectOpinionRequired'))
    return
  }
  try {
    await ElMessageBox.confirm(t('research.dataCollection.laboratoryTest.rejectConfirm'), t('common.confirm'), {
      type: 'warning'
    })
    emit('reject', { dataId: props.detailData.dataId, auditOpinion: auditForm.auditOpinion })
  } catch (error) {
    // User canceled
  }
}
</script>

<style scoped>
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
  min-width: 140px;
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

/* 审核操作区 */
.audit-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.audit-actions .el-button {
  min-width: 120px;
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .detail-item {
    flex-direction: column;
    gap: 4px;
  }

  .detail-item .label {
    min-width: auto;
    font-size: 13px;
  }

  .audit-actions {
    flex-direction: column;
  }

  .audit-actions .el-button {
    width: 100%;
    margin-left: 0 !important;
  }
}
</style>
