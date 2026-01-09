<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ isAudit ? $t('research.dataCollection.laboratoryTest.auditTitle') :
              $t('research.dataCollection.laboratoryTest.detail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <template v-if="detailData">
          <!-- 基本信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.dataCollection.laboratoryTest.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.batchId')">
                  {{ detailData.batchId }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.trialId')">
                  {{ detailData.trialId }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 样本信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-test-tube-line"></i>
                <span>{{ $t('research.dataCollection.laboratoryTest.form.sampleInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.sampleId')">
                  {{ detailData.sampleId }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.sampleType')">
                  {{ detailData.sampleType || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 实验参数信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-flask-line"></i>
                <span>{{ $t('research.dataCollection.laboratoryTest.form.paramInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.labParameter')">
                  {{ detailData.labParameter || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.resultValue')">
                  {{ detailData.resultValue || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 测试数据卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-bar-chart-line"></i>
                <span>{{ $t('research.dataCollection.laboratoryTest.form.testData') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.germinationRate')">
                  <span class="highlight-value">{{ detailData.germinationRate }}%</span>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.purityPercent')">
                  {{ detailData.purityPercent }}%
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.moistureContentPercent')">
                  {{ detailData.moistureContentPercent }}%
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.proteinPercent')">
                  {{ detailData.proteinPercent }}%
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.toxinLevelPpm')">
                  {{ detailData.toxinLevelPpm || '-' }} PPM
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 健康与追溯卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-heart-pulse-line"></i>
                <span>{{ $t('research.dataCollection.laboratoryTest.form.healthTraceability') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.seedHealthFindings')" :span="2">
                  {{ detailData.seedHealthFindings || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.traceabilityLink')">
                  {{ detailData.traceabilityLink || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.labReportFile')">
                  <span v-if="detailData.labReportFile" class="file-link" @click="handlePreviewFile(detailData.labReportFile)">
                    <i class="ri-file-pdf-line"></i>
                    {{ detailData.labReportFileName || $t('research.dataCollection.laboratoryTest.form.labReportFile') }}
                  </span>
                  <span v-else>-</span>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 检测信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-calendar-check-line"></i>
                <span>{{ $t('research.dataCollection.laboratoryTest.form.testingInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.testStatus')">
                  <el-tag
                    :type="detailData.passFailFlag === 'true' || detailData.passFailFlag === true ? 'success' : (detailData.passFailFlag === 'false' || detailData.passFailFlag === false ? 'danger' : 'info')">
                    {{ detailData.passFailFlag === 'true' || detailData.passFailFlag === true ? 'Pass' :
                      (detailData.passFailFlag === 'false' || detailData.passFailFlag === false ? 'Fail' : '-') }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.testDate')">
                  {{ detailData.testDate || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('common.createdBy')">
                  {{ detailData.createdByName || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('common.createdTime')">
                  {{ detailData.createdTime || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 审核操作卡片 (待审核状态显示) -->
          <div v-if="isAudit && activeTab === 'pendingApproval'" class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-shield-check-line"></i>
                <span>{{ $t('research.dataCollection.laboratoryTest.auditOpinion') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-form :model="auditForm" label-position="top">
                <el-form-item :label="$t('research.dataCollection.laboratoryTest.auditOpinion')">
                  <el-input v-model="auditForm.auditOpinion" type="textarea" :rows="4"
                    :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.auditOpinion')" />
                </el-form-item>
              </el-form>
              <div class="form-actions">
                <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
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
          </div>

          <!-- 审核结果卡片 (已审核/已作废状态显示) -->
          <div v-else-if="activeTab !== 'pendingApproval'" class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-history-line"></i>
                <span>{{ $t('research.dataCollection.laboratoryTest.auditInfo') || 'Audit Information' }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('common.approver')">
                  {{ detailData.approveByName || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('common.approveTime')">
                  {{ detailData.approveTime || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.auditOpinion')" :span="2">
                  {{ detailData.auditOpinion || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getFilePreviewUrl } from '@/api/file'

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

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';

/* 高亮值样式 */
.highlight-value {
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
</style>
