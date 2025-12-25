<template>
  <div class="audit-review-container">
    <el-page-header @back="goBack">
      <template #content>
        <span class="page-title">{{ t('research.trialBasicAudit.audit.detail.title') }}</span>
      </template>
    </el-page-header>

    <el-card v-loading="loading" class="detail-card">
      <!-- 试验信息 -->
      <div class="section">
        <div class="section-title">
          <el-icon><Document /></el-icon>
          {{ t('research.trialBasicAudit.audit.detail.trialInfo') }}
        </div>
        <el-descriptions :column="isMobile ? 1 : 2" border>
          <el-descriptions-item :label="t('research.trialBasicAudit.list.trialId')">
            {{ trialInfo.trialId }}
          </el-descriptions-item>
          <el-descriptions-item :label="t('research.trialBasicAudit.list.trialName')">
            {{ trialInfo.trialName }}
          </el-descriptions-item>
          <el-descriptions-item :label="t('research.trialBasicAudit.audit.list.batchName')">
            {{ trialInfo.batchId }}
          </el-descriptions-item>
          <el-descriptions-item :label="t('research.trialBasicAudit.list.cropType')">
            {{ trialInfo.cropType }}
          </el-descriptions-item>
          <el-descriptions-item :label="t('research.trialBasicAudit.list.varietyName')">
            {{ trialInfo.varietyName }}
          </el-descriptions-item>
          <el-descriptions-item :label="t('research.trialBasicAudit.list.season')">
            {{ trialInfo.season }}
          </el-descriptions-item>
          <el-descriptions-item :label="t('research.trialBasicAudit.list.year')">
            {{ trialInfo.year }}
          </el-descriptions-item>
          <el-descriptions-item :label="t('research.trialBasicAudit.list.status')">
            <StatusTag :status="auditData.workflowStatus || auditData.auditStatus" type="workflow" />
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <!-- 提交信息 -->
      <div class="section">
        <div class="section-title">
          <el-icon><User /></el-icon>
          {{ t('research.trialBasicAudit.audit.detail.submitInfo') }}
        </div>
        <el-descriptions :column="isMobile ? 1 : 2" border>
          <el-descriptions-item :label="t('research.trialBasicAudit.audit.list.submitter')">
            {{ auditData.submitterName }}
          </el-descriptions-item>
          <el-descriptions-item :label="t('research.trialBasicAudit.audit.list.submitTime')">
            {{ formatDate(auditData.submitTime) }}
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <!-- 审核信息(如果已审核) -->
      <div v-if="auditData.auditorName" class="section">
        <div class="section-title">
          <el-icon><Check /></el-icon>
          {{ t('research.trialBasicAudit.audit.detail.auditInfo') }}
        </div>
        <el-descriptions :column="1" border>
          <el-descriptions-item :label="t('research.trialBasicAudit.audit.list.auditor')">
            {{ auditData.auditorName }}
          </el-descriptions-item>
          <el-descriptions-item :label="t('research.trialBasicAudit.audit.list.auditTime')">
            {{ formatDate(auditData.auditTime) }}
          </el-descriptions-item>
          <el-descriptions-item
            v-if="auditData.auditOpinion"
            :label="t('research.trialBasicAudit.form.auditOpinion')"
          >
            {{ auditData.auditOpinion }}
          </el-descriptions-item>
          <el-descriptions-item
            v-if="auditData.rejectReason"
            :label="t('research.trialBasicAudit.form.rejectReason')"
          >
            {{ auditData.rejectReason }}
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <!-- 审核操作(仅待审核状态且非只读) -->
      <div v-if="auditData.auditStatus === 'S1' && !isReadonly" class="section">
        <div class="section-title">
          <el-icon><EditPen /></el-icon>
          {{ t('research.trialBasicAudit.audit.detail.auditAction') }}
        </div>
        <el-form ref="auditFormRef" :model="auditForm" :rules="auditRules" label-width="120px">
          <el-form-item :label="t('research.trialBasicAudit.form.auditOpinion')" prop="auditOpinion">
            <el-input
              v-model="auditForm.auditOpinion"
              type="textarea"
              :rows="4"
              :placeholder="t('research.trialBasicAudit.form.auditOpinionPlaceholder')"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>
          <el-form-item :label="t('research.trialBasicAudit.form.rejectReason')" prop="rejectReason">
            <el-input
              v-model="auditForm.rejectReason"
              type="textarea"
              :rows="4"
              :placeholder="t('research.trialBasicAudit.form.rejectReasonPlaceholder')"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>
        </el-form>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <el-button @click="goBack">
          {{ t('research.trialBasicAudit.action.return') }}
        </el-button>
        <template v-if="auditData.auditStatus === 'S1' && !isReadonly">
          <el-button type="success" @click="handleApprove">
            {{ t('research.trialBasicAudit.action.approve') }}
          </el-button>
          <el-button type="danger" @click="handleReject">
            {{ t('research.trialBasicAudit.action.reject') }}
          </el-button>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Document, User, Check, EditPen } from '@element-plus/icons-vue'
import { getAuditById, performAudit } from '@/api/research/trialBasicAudit'
import StatusTag from '../trial/components/StatusTag.vue'
import { useResponsive } from '@/hooks/useResponsive'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { isMobile } = useResponsive()

// 数据
const loading = ref(false)
const auditFormRef = ref()
const auditData = ref({})
const trialInfo = ref({})
const isReadonly = computed(() => route.query.readonly === 'true')

const auditForm = reactive({
  auditOpinion: '',
  rejectReason: ''
})

// 表单验证规则
const auditRules = {
  rejectReason: [
    {
      validator: (rule, value, callback) => {
        // 仅在点击退回时验证
        callback()
      },
      trigger: 'blur'
    }
  ]
}

// 格式化日期
const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 获取审核详情
const getDetail = async () => {
  loading.value = true
  try {
    const res = await getAuditById(route.params.id)
    auditData.value = res.data || {}

    // 解析试验数据快照
    if (auditData.value.trialDataSnapshot) {
      trialInfo.value = JSON.parse(auditData.value.trialDataSnapshot)
    }
  } catch (error) {
    console.error('获取审核详情失败:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 审核通过
const handleApprove = async () => {
  try {
    await ElMessageBox.confirm(
      t('research.trialBasicAudit.message.confirmApprove'),
      t('common.warning'),
      {
        confirmButtonText: t('research.trialBasicAudit.action.confirm'),
        cancelButtonText: t('research.trialBasicAudit.action.close'),
        type: 'warning'
      }
    )

    loading.value = true
    await performAudit({
      auditId: auditData.value.auditId,
      trialId: auditData.value.trialId,
      auditStatus: 'S2',
      auditOpinion: auditForm.auditOpinion
    })

    ElMessage.success(t('research.trialBasicAudit.message.auditSuccess'))
    router.back()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('审核失败:', error)
      ElMessage.error(t('common.operationFailed'))
    }
  } finally {
    loading.value = false
  }
}

// 审核退回
const handleReject = async () => {
  if (!auditForm.rejectReason || !auditForm.rejectReason.trim()) {
    ElMessage.warning(t('research.trialBasicAudit.message.rejectReasonRequired'))
    return
  }

  try {
    await ElMessageBox.confirm(
      t('research.trialBasicAudit.message.confirmReject'),
      t('common.warning'),
      {
        confirmButtonText: t('research.trialBasicAudit.action.confirm'),
        cancelButtonText: t('research.trialBasicAudit.action.close'),
        type: 'warning'
      }
    )

    loading.value = true
    await performAudit({
      auditId: auditData.value.auditId,
      trialId: auditData.value.trialId,
      auditStatus: 'S3',
      rejectReason: auditForm.rejectReason
    })

    ElMessage.success(t('research.trialBasicAudit.message.auditSuccess'))
    router.back()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('审核失败:', error)
      ElMessage.error(t('common.operationFailed'))
    }
  } finally {
    loading.value = false
  }
}

// 返回
const goBack = () => {
  router.back()
}

onMounted(() => {
  getDetail()
})
</script>

<style scoped lang="scss">
.audit-review-container {
  padding: 20px;

  .el-page-header {
    margin-bottom: 20px;

    .page-title {
      font-size: 18px;
      font-weight: 600;
    }
  }

  .detail-card {
    .section {
      margin-bottom: 30px;

      &:last-child {
        margin-bottom: 0;
      }

      .section-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 600;
        color: #303133;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 2px solid #009A44;

        .el-icon {
          color: #009A44;
        }
      }
    }

    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ebeef5;
    }
  }
}

@media (max-width: 768px) {
  .audit-review-container {
    padding: 10px;

    .detail-card {
      .section {
        margin-bottom: 20px;
      }

      .action-buttons {
        flex-direction: column;

        .el-button {
          width: 100%;
        }
      }
    }
  }
}
</style>
