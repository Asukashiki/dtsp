<template>
  <div class="dataset-audit-review-container">
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
          <h1 class="page-title">{{ $t('research.datasetAudit.title') }}</h1>
        </div>
        <div class="header-right"></div>
      </div>
    </div>

    <!-- 详情区域 -->
    <div v-loading="loading" class="detail-wrapper">
      <template v-if="detailData">
        <!-- 基础信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.datasetAudit.form.basicInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetAudit.form.datasetCode') }}:</span>
              <span class="value highlight">{{ detailData.datasetCode || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetAudit.form.datasetStatus') }}:</span>
              <el-tag :type="getDatasetStatusType(detailData.datasetStatus)">
                {{ $t(`research.datasetCompilation.status.${detailData.datasetStatus}`) }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetAudit.form.trialId') }}:</span>
              <span class="value">{{ detailData.trialId || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetAudit.form.versionNo') }}:</span>
              <span class="value">{{ detailData.versionNo || '1.0' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetAudit.form.cropType') }}:</span>
              <span class="value">{{ detailData.cropType || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetAudit.form.varietyName') }}:</span>
              <span class="value">{{ detailData.varietyName || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetAudit.form.recordCount') }}:</span>
              <span class="value">{{ detailData.recordCount || 0 }}</span>
            </div>
          </div>
        </div>

        <!-- 数据统计 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-bar-chart-line"></i>
            {{ $t('research.datasetAudit.form.dataStatistics') }}
          </div>
          <div class="statistics-grid">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-flask-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetAudit.columns.trialCount') }}</div>
                <div class="stat-value">{{ detailData.trialCount || 0 }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-plant-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetAudit.columns.fieldDataCount') }}</div>
                <div class="stat-value">{{ detailData.fieldDataCount || 0 }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-temp-hot-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetAudit.columns.envDataCount') }}</div>
                <div class="stat-value">{{ detailData.envDataCount || 0 }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-test-tube-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetAudit.columns.labTestCount') }}</div>
                <div class="stat-value">{{ detailData.labTestCount || 0 }}</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="ri-bar-chart-box-line"></i>
              </div>
              <div class="stat-content">
                <div class="stat-label">{{ $t('research.datasetAudit.columns.yieldDataCount') }}</div>
                <div class="stat-value">{{ detailData.yieldDataCount || 0 }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 编制信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-user-line"></i>
            {{ $t('research.datasetAudit.form.compilationInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetAudit.form.compiledBy') }}:</span>
              <span class="value">{{ detailData.compiledByName || detailData.compiledBy || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetAudit.form.compiledAt') }}:</span>
              <span class="value">{{ detailData.compiledAt || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 提交信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-send-plane-line"></i>
            {{ $t('research.datasetAudit.form.submitInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetAudit.form.submitTime') }}:</span>
              <span class="value">{{ detailData.submitTime }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetAudit.form.submitterName') }}:</span>
              <span class="value">{{ detailData.submitterName || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 审核信息 (已审核时显示) -->
        <div v-if="detailData.auditStatus && detailData.auditStatus !== 'pending'" class="detail-section">
          <div class="section-title">
            <i class="ri-shield-check-line"></i>
            {{ $t('research.datasetAudit.form.auditInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetAudit.form.auditStatus') }}:</span>
              <el-tag :type="getAuditStatusType(detailData.auditStatus)">
                {{ $t(`research.datasetAudit.auditStatus.${detailData.auditStatus}`) }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetAudit.form.lockedFlag') }}:</span>
              <el-tag :type="detailData.lockedFlag === 1 ? 'danger' : 'success'">
                <i :class="detailData.lockedFlag === 1 ? 'ri-lock-line' : 'ri-lock-unlock-line'"></i>
                {{ detailData.lockedFlag === 1 ? $t('research.datasetAudit.form.locked') : $t('research.datasetAudit.form.unlocked') }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetAudit.form.auditTime') }}:</span>
              <span class="value">{{ detailData.auditTime || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.datasetAudit.form.auditorName') }}:</span>
              <span class="value">{{ detailData.auditorName || '-' }}</span>
            </div>
            <div v-if="detailData.auditOpinion" class="detail-item full-width">
              <span class="label">{{ $t('research.datasetAudit.form.auditOpinion') }}:</span>
              <span class="value">{{ detailData.auditOpinion }}</span>
            </div>
          </div>
        </div>

        <!-- 审核表单 (待审核时显示) -->
        <div v-if="!detailData.auditStatus || detailData.auditStatus === 'pending'" class="detail-section audit-form-section">
          <div class="section-title">
            <i class="ri-shield-check-line"></i>
            {{ $t('research.datasetAudit.form.auditInfo') }}
          </div>

          <el-form
            ref="auditFormRef"
            :model="auditForm"
            :rules="auditRules"
            label-position="top"
            class="audit-form"
          >
            <el-form-item :label="$t('research.datasetAudit.form.auditOpinion')" prop="auditOpinion">
              <el-input
                v-model="auditForm.auditOpinion"
                type="textarea"
                :rows="4"
                :placeholder="$t('research.datasetAudit.placeholder.auditOpinion')"
                maxlength="1000"
                show-word-limit
              />
            </el-form-item>

            <!-- 锁定数据集开关 -->
            <el-form-item :label="$t('research.datasetAudit.form.lockDataset')">
              <div class="lock-dataset-control">
                <el-switch
                  v-model="auditForm.lockedFlag"
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#DA121A"
                  inactive-color="#009A44"
                  size="large"
                >
                  <template #active-action>
                    <i class="ri-lock-line"></i>
                  </template>
                  <template #inactive-action>
                    <i class="ri-lock-unlock-line"></i>
                  </template>
                </el-switch>
                <span class="lock-label">
                  {{ auditForm.lockedFlag === 1 ? $t('research.datasetAudit.form.locked') : $t('research.datasetAudit.form.unlocked') }}
                </span>
              </div>
              <div class="lock-tip">
                <i class="ri-information-line"></i>
                {{ $t('research.datasetAudit.form.lockDatasetTip') }}
              </div>
            </el-form-item>

            <div class="audit-actions">
              <el-button
                type="success"
                size="large"
                :loading="submitting"
                @click="handleApprove"
              >
                <i class="ri-check-line"></i>
                {{ $t('research.datasetAudit.actions.approve') }}
              </el-button>
              <el-button
                type="warning"
                size="large"
                :loading="submitting"
                @click="handleNeedsRevision"
              >
                <i class="ri-edit-line"></i>
                {{ $t('research.datasetAudit.actions.needsRevision') }}
              </el-button>
              <el-button
                type="danger"
                size="large"
                :loading="submitting"
                @click="handleReject"
              >
                <i class="ri-close-line"></i>
                {{ $t('research.datasetAudit.actions.reject') }}
              </el-button>
            </div>
          </el-form>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getDatasetById } from '@/api/dataset'
import { getAuditByDatasetId, performAudit } from '@/api/datasetAudit'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const submitting = ref(false)
const detailData = ref(null)
const auditFormRef = ref(null)

const auditForm = reactive({
  datasetId: '',
  auditStatus: '',
  auditOpinion: '',
  lockedFlag: 0  // 默认不锁定
})

// 审核表单验证规则
const auditRules = computed(() => ({
  auditOpinion: [
    {
      validator: (_rule, value, callback) => {
        if (auditForm.auditStatus === 'rejected' && !value) {
          callback(new Error(t('research.datasetAudit.rules.auditOpinionRequired')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}))

// 获取数据集状态类型
const getDatasetStatusType = (status) => {
  const typeMap = {
    draft: '',
    submitted: 'info',
    reviewing: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return typeMap[status] || ''
}

// 获取审核状态类型
const getAuditStatusType = (status) => {
  const typeMap = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
    needs_revision: 'warning'
  }
  return typeMap[status] || ''
}

// 加载详情数据
const loadDetail = async () => {
  loading.value = true
  try {
    // 加载数据集详情
    const datasetRes = await getDatasetById(route.params.id)
    if (datasetRes.code === 200 && datasetRes.data) {
      detailData.value = datasetRes.data
      auditForm.datasetId = datasetRes.data.id

      // 尝试加载审核信息
      try {
        const auditRes = await getAuditByDatasetId(route.params.id)
        if (auditRes.code === 200 && auditRes.data) {
          const auditData = auditRes.data
          Object.assign(detailData.value, {
            auditStatus: auditData.auditStatus || auditData.audit_status || 'pending',
            auditTime: auditData.auditTime || auditData.audit_time || '-',
            auditorName: auditData.auditorName || auditData.auditor_name || '-',
            auditOpinion: auditData.auditOpinion || auditData.audit_opinion || '',
            lockedFlag: auditData.lockedFlag !== null && auditData.lockedFlag !== undefined ? auditData.lockedFlag : 0
          })
        }
      } catch (error) {
        // 审核记录可能不存在,忽略错误
        console.log('No audit record found')
      }
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

// 审核通过
const handleApprove = async () => {
  try {
    await ElMessageBox.confirm(
      t('research.datasetAudit.approveConfirm'),
      t('common.confirm'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'success'
      }
    )

    submitting.value = true
    auditForm.auditStatus = 'approved'

    const res = await performAudit(auditForm)
    if (res.code === 200) {
      ElMessage.success(t('research.datasetAudit.message.approveSuccess'))
      goBack()
    } else {
      ElMessage.error(res.msg || t('common.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to approve:', error)
      ElMessage.error(t('common.operationFailed'))
    }
  } finally {
    submitting.value = false
  }
}

// 审核驳回
const handleReject = async () => {
  // 驳回时必须填写审核意见
  if (!auditForm.auditOpinion) {
    ElMessage.warning(t('research.datasetAudit.message.rejectOpinionRequired'))
    return
  }

  try {
    await ElMessageBox.confirm(
      t('research.datasetAudit.rejectConfirm'),
      t('common.confirm'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    submitting.value = true
    auditForm.auditStatus = 'rejected'

    const res = await performAudit(auditForm)
    if (res.code === 200) {
      ElMessage.success(t('research.datasetAudit.message.rejectSuccess'))
      goBack()
    } else {
      ElMessage.error(res.msg || t('common.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to reject:', error)
      ElMessage.error(t('common.operationFailed'))
    }
  } finally {
    submitting.value = false
  }
}

// 需要修订
const handleNeedsRevision = async () => {
  // 标记需要修订时必须填写修订意见
  if (!auditForm.auditOpinion) {
    ElMessage.warning(t('research.datasetAudit.message.needsRevisionOpinionRequired'))
    return
  }

  try {
    await ElMessageBox.confirm(
      t('research.datasetAudit.needsRevisionConfirm'),
      t('common.confirm'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    submitting.value = true
    auditForm.auditStatus = 'needs_revision'

    const res = await performAudit(auditForm)
    if (res.code === 200) {
      ElMessage.success(t('research.datasetAudit.message.needsRevisionSuccess'))
      goBack()
    } else {
      ElMessage.error(res.msg || t('common.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to mark as needs revision:', error)
      ElMessage.error(t('common.operationFailed'))
    }
  } finally {
    submitting.value = false
  }
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
.dataset-audit-review-container {
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

/* 统计卡片网格 */
.statistics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.stat-card {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 1px solid #86efac;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon i {
  font-size: 24px;
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #009A44;
  line-height: 1;
}

/* 审核表单 */
.audit-form-section {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  border: 2px solid #fbbf24;
}

.audit-form {
  margin-top: 20px;
}

/* 锁定数据集控件 */
.lock-dataset-control {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.lock-label {
  font-size: 16px;
  font-weight: 500;
  color: #1f2937;
}

.lock-tip {
  margin-top: 8px;
  padding: 8px 12px;
  background: #f0f9ff;
  border-left: 3px solid #009A44;
  border-radius: 4px;
  font-size: 13px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 8px;
}

.lock-tip i {
  font-size: 16px;
  color: #009A44;
  flex-shrink: 0;
}

.audit-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
}

.audit-actions .el-button {
  min-width: 160px;
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
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 12px;
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

  .audit-actions {
    flex-direction: column;
  }

  .audit-actions .el-button {
    width: 100%;
    min-width: auto;
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
