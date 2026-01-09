<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack"><i class="ri-arrow-left-line"></i></el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('trait-audit.detailTitle') }}</h1>
          </div>
        </div>
      </div>

      <!-- 详情区域 -->
      <div class="content-wrapper" v-loading="loading">
        <template v-if="detailData">
        <!-- 基本信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>{{ $t('trait-audit.cards.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('trait.recordId')">{{ detailData.recordId || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('trait.plotId')">{{ detailData.plotId || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('trait.trialId')">{{ detailData.trialId || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('trait.batchId')">{{ detailData.batchId || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('trait.observationDate')">{{ detailData.observationDate || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('trait.growthStage')">
                {{ getLabelByValue('growth_cycle', detailData.growthStage) || detailData.growthStage || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('trait.observerId')">{{ getUserName(detailData.observerId) }}</el-descriptions-item>
              <el-descriptions-item :label="$t('trait.columns.status')">
                <el-tag type="info" v-if="detailData.status">
                  {{ getLabelByValue('flow_status', detailData.status) || detailData.status }}
                </el-tag>
                <span v-else>-</span>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('trait.remarks')" :span="2">{{ detailData.remarks || '-' }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 性状明细 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-list-check"></i>
              <span>{{ $t('trait-audit.cards.traitDetails') }}</span>
              <el-tag type="success" style="margin-left: 12px;">{{ detailData.traitCount || 0 }} {{ $t('trait-audit.cards.traitDetails') }}</el-tag>
            </div>
          </div>
          <div class="card-body">
            <!-- PC端表格 -->
            <div class="pc-only">
              <el-table :data="detailData.detailList" border stripe v-if="detailData.detailList && detailData.detailList.length > 0">
                <el-table-column type="index" label="#" width="60" align="center" />
                <el-table-column :label="$t('trait-audit.traitName')" min-width="200">
                  <template #default="{ row }">
                    {{ getLabelByValue('agronomic_trait_name', row.traitCode) || row.traitName || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="traitCode" :label="$t('trait-audit.traitCode')" width="120" />
                <el-table-column prop="traitValue" :label="$t('trait-audit.traitValue')" width="120" align="right" />
                <el-table-column prop="unit" :label="$t('trait-audit.unit')" width="120" />
              </el-table>
              <el-empty v-else :description="$t('trait-audit.noTraits')" />
            </div>

            <!-- 移动端卡片 -->
            <div class="mobile-only">
              <div v-if="detailData.detailList && detailData.detailList.length > 0" class="trait-detail-list">
                <div v-for="(item, index) in detailData.detailList" :key="item.detailId" class="trait-detail-card">
                  <div class="trait-detail-header">
                    <span class="trait-number">#{{ index + 1 }}</span>
                    <span class="trait-name">{{ getLabelByValue('agronomic_trait_name', item.traitCode) || item.traitName || '-' }}</span>
                  </div>
                  <div class="trait-detail-body">
                    <div class="detail-row">
                      <span class="label">{{ $t('trait-audit.traitCode') }}:</span>
                      <span class="value">{{ item.traitCode }}</span>
                    </div>
                    <div class="detail-row">
                      <span class="label">{{ $t('trait-audit.traitValue') }}:</span>
                      <span class="value value-highlight">{{ item.traitValue }} <span class="unit">{{ item.unit }}</span></span>
                    </div>
                  </div>
                </div>
              </div>
              <el-empty v-else :description="$t('trait-audit.noTraits')" />
            </div>
          </div>
        </div>

        <!-- 照片信息 -->
        <div class="info-card" v-if="detailData.photoUrl">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-image-line"></i>
              <span>{{ $t('trait-audit.cards.photoInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="1" border>
              <el-descriptions-item :label="$t('trait.photoUrl')">
                <el-image :src="previewPhotoUrl" fit="contain" style="width: 200px; height: 150px" :preview-src-list="[previewPhotoUrl]" />
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 系统信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-time-line"></i>
              <span>{{ $t('trait-audit.cards.systemInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('trait-audit.createBy')">{{ getUserName(detailData.createBy) }}</el-descriptions-item>
              <el-descriptions-item :label="$t('trait-audit.createTime')">{{ detailData.createTime || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('trait-audit.updateBy')">{{ getUserName(detailData.updateBy) }}</el-descriptions-item>
              <el-descriptions-item :label="$t('trait-audit.updateTime')">{{ detailData.updateTime || '-' }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 审核信息 (已审核时显示) -->
        <div v-if="detailData.auditStatus && detailData.auditStatus !== 'pending'" class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-shield-check-line"></i>
              <span>{{ $t('trait-audit.cards.auditInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('trait-audit.auditStatus') }}:</span>
              <el-tag :type="getTraitAuditStatusType(detailData.auditStatus)">
                {{ detailData.auditStatus === 'approved' ? $t('trait-audit.status.approved') : $t('trait-audit.status.rejected') }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('trait-audit.auditTime') }}:</span>
              <span class="value">{{ detailData.auditTime || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('trait-audit.auditorName') }}:</span>
              <span class="value">{{ detailData.auditorName || '-' }}</span>
            </div>
            <div v-if="detailData.auditOpinion" class="detail-item full-width">
              <span class="label">{{ $t('trait-audit.auditOpinion') }}:</span>
              <span class="value">{{ detailData.auditOpinion }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 审核表单 (待审核时显示) -->
        <div v-if="!detailData.auditStatus || detailData.auditStatus === 'pending'" class="info-card audit-form-section">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-shield-check-line"></i>
              <span>{{ $t('trait-audit.cards.auditInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-form
              ref="auditFormRef"
              :model="auditForm"
              :rules="auditRules"
              label-position="top"
              class="audit-form"
            >
              <el-form-item :label="$t('trait-audit.auditOpinion')" prop="auditOpinion">
                <el-input
                  v-model="auditForm.auditOpinion"
                  type="textarea"
                  :rows="4"
                  :placeholder="$t('trait-audit.auditOpinionPlaceholder')"
                  maxlength="1000"
                  show-word-limit
                />
              </el-form-item>

              <div class="audit-actions">
                <el-button
                  type="success"
                  size="large"
                  :loading="submitting"
                  @click="handleApprove"
                >
                  <i class="ri-check-line"></i>
                  {{ $t('trait-audit.approveBtn') }}
                </el-button>
                <el-button
                  type="danger"
                  size="large"
                  :loading="submitting"
                  @click="handleReject"
                >
                  <i class="ri-close-line"></i>
                  {{ $t('trait-audit.rejectBtn') }}
                </el-button>
              </div>
            </el-form>
          </div>
        </div>
      </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useDict } from '@/hooks/useDict'
import {
  getTraitRecordInfo,
  getUserInfoById,
  getAgronomicTraitAuditByTraitId,
  performAgronomicTraitAudit,
  submitTraitRecordAudit
} from '@/api/breedingData'
import { getFilePreviewUrl } from '@/api/file'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { getLabelByValue } = useDict(['flow_status', 'agronomic_trait_name', 'growth_cycle'])

// 状态变量
const loading = ref(false)
const submitting = ref(false)
const detailData = ref(null)
const auditFormRef = ref(null)
const userNames = ref({})

// 审核表单
const auditForm = reactive({
  traitId: '',
  auditStatus: '',
  auditOpinion: ''
})

// 审核表单验证规则
const auditRules = computed(() => ({
  auditOpinion: [
    {
      validator: (_rule, value, callback) => {
        if (auditForm.auditStatus === 'rejected' && !value) {
          callback(new Error(t('trait-audit.rules.opinionRequired')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}))

// 照片预览URL
const previewPhotoUrl = computed(() => {
  if (!detailData.value?.photoUrl) return ''
  if (detailData.value.photoUrl.startsWith('http')) {
    return detailData.value.photoUrl
  }
  return detailData.value.photoUrl
})

// 审核状态标签类型映射
const getTraitAuditStatusType = (status) => {
  const typeMap = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return typeMap[status] || ''
}

// 加载用户名
const loadUserNames = async () => {
  const userIds = [
    detailData.value?.createBy,
    detailData.value?.updateBy,
    detailData.value?.auditBy,
    detailData.value?.observerId
  ].filter(id => id && !userNames.value[id])

  for (const userId of userIds) {
    try {
      const res = await getUserInfoById(userId)
      if (res.code === 200 && res.data) {
        userNames.value[userId] = res.data.nickName || res.data.userName || userId
      }
    } catch (error) {
      console.error(`Failed to load user info for ${userId}:`, error)
      userNames.value[userId] = userId
    }
  }
}

// 获取用户显示名
const getUserName = (userId) => {
  if (!userId) return '-'
  return userNames.value[userId] || userId
}

// 加载详情数据
const loadDetail = async () => {
  loading.value = true
  try {
    const traitId = route.params.traitId || route.query.traitId
    if (!traitId) {
      ElMessage.error(t('trait-audit.message.missingTraitId'))
      goBack()
      return
    }
    auditForm.traitId = traitId

    // 加载性状详情
    const traitRes = await getTraitRecordInfo(traitId)
    if (traitRes.code === 200 && traitRes.data) {
      detailData.value = traitRes.data
      await loadUserNames()
      // 处理照片预览
      if (detailData.value.photoUrl && !detailData.value.photoUrl.startsWith('http')) {
        try {
          const previewRes = await getFilePreviewUrl(detailData.value.photoUrl)
          if (previewRes.code === 200) {
            detailData.value.photoUrl = previewRes.msg
          }
        } catch (error) {
          console.error('Failed to get photo preview URL:', error)
        }
      }
    } else {
      ElMessage.error(t('trait-audit.message.loadFailed'))
      goBack()
      return
    }

    // 加载审核信息
    try {
      const auditRes = await getAgronomicTraitAuditByTraitId(traitId)
      if (auditRes.code === 200 && auditRes.data) {
        const auditInfo = auditRes.data
        Object.assign(detailData.value, {
          auditStatus: auditInfo.auditStatus || 'pending',
          auditTime: auditInfo.auditTime || '-',
          auditorName: auditInfo.auditorName || auditInfo.auditor_name || '-',
          auditOpinion: auditInfo.auditOpinion || auditInfo.audit_opinion || ''
        })
      }
    } catch (error) {
      console.log(t('trait-audit.log.noAuditRecord'))
      detailData.value.auditStatus = 'pending'
    }
  } catch (error) {
    console.error(t('trait-audit.log.loadDetailFailed'), error)
    ElMessage.error(t('trait-audit.message.loadFailed'))
    goBack()
  } finally {
    loading.value = false
  }
}

// 审核通过
const handleApprove = async () => {
  try {
    await ElMessageBox.confirm(
        t('trait-audit.confirm.approve'),
        t('common.confirm'),
        {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'success'
        }
    )

    submitting.value = true
    auditForm.auditStatus = 'approved'
    const res = await performAgronomicTraitAudit(auditForm)
    if (res.code === 200) {
      ElMessage.success(t('trait-audit.message.approveSuccess'))
      goBack()
    } else {
      ElMessage.error(res.msg || t('trait-audit.message.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(t('trait-audit.log.approveFailed'), error)
      ElMessage.error(t('trait-audit.message.operationFailed'))
    }
  } finally {
    submitting.value = false
  }
}

// 审核驳回
const handleReject = async () => {
  if (!auditForm.auditOpinion) {
    ElMessage.warning(t('trait-audit.rules.opinionRequired'))
    return
  }

  try {
    await ElMessageBox.confirm(
        t('trait-audit.confirm.reject'),
        t('common.confirm'),
        {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        }
    )

    submitting.value = true
    auditForm.auditStatus = 'rejected'
    const res = await performAgronomicTraitAudit(auditForm)
    if (res.code === 200) {
      ElMessage.success(t('trait-audit.message.rejectSuccess'))
      goBack()
    } else {
      ElMessage.error(res.msg || t('trait-audit.message.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(t('trait-audit.log.rejectFailed'), error)
      ElMessage.error(t('trait-audit.message.operationFailed'))
    }
  } finally {
    submitting.value = false
  }
}

// 提交审核流程
const handleSubmitAudit = async () => {
  try {
    const traitId = route.params.traitId || route.query.traitId
    await ElMessageBox.confirm(
        t('trait-audit.confirm.submit'),
        t('common.confirm'),
        {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'info'
        }
    )
    const res = await submitTraitRecordAudit(traitId)
    if (res.code === 200) {
      ElMessage.success(t('trait-audit.message.submitSuccess'))
      await loadDetail()
    } else {
      ElMessage.error(res.msg || t('trait-audit.message.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error(t('trait-audit.log.submitFailed'), error)
      ElMessage.error(t('trait-audit.message.operationFailed'))
    }
  }
}

// 返回上一页
const goBack = () => {
  router.back()
}

// 初始化加载
onMounted(() => {
  loadDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';

/* 审核表单样式 */
.audit-form-section {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  // border: 2px solid #fbbf24;
}

.audit-form {
  margin-top: 20px;
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

/* 性状明细移动端样式 */
.trait-detail-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.trait-detail-card {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 16px;
  background: #f9fafb;
}

.trait-detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e4e7ed;
}

.trait-number {
  font-weight: 600;
  color: #009A44;
  font-size: 16px;
  min-width: 30px;
}

.trait-name {
  font-weight: 500;
  color: #303133;
  font-size: 15px;
  flex: 1;
}

.trait-detail-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.detail-row .label {
  color: #606266;
}

.detail-row .value {
  color: #303133;
  font-weight: 500;
}

.value-highlight {
  color: #009A44;
  font-size: 16px;
}

.unit {
  color: #8492a6;
  font-size: 13px;
  margin-left: 4px;
}

/* 响应式适配 */
.pc-only {
  display: block;
}

.mobile-only {
  display: none;
}

@media screen and (max-width: 768px) {
  .pc-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }

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

  .audit-actions {
    flex-direction: column;
  }

  .audit-actions .el-button {
    width: 100%;
    min-width: auto;
  }
}
</style>