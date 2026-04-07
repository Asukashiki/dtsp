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
            <h1 class="page-title">{{ t('research.trialBasicAudit.audit.detail.title') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 试验信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-text-line"></i>
              <span>{{ t('research.trialBasicAudit.audit.detail.trialInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
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
            </el-descriptions>
          </div>
        </div>

        <!-- 提交信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-user-line"></i>
              <span>{{ t('research.trialBasicAudit.audit.detail.submitInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="t('research.trialBasicAudit.audit.list.submitter')">
                {{ auditData.submitterName }}
              </el-descriptions-item>
              <el-descriptions-item :label="t('research.trialBasicAudit.audit.list.submitTime')">
                {{ formatDate(auditData.submitTime) }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 审核信息卡片(如果已审核) -->
        <div v-if="auditData.auditorName" class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-checkbox-circle-line"></i>
              <span>{{ t('research.trialBasicAudit.audit.detail.auditInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="t('research.trialBasicAudit.audit.list.auditor')">
                {{ auditData.auditorName }}
              </el-descriptions-item>
              <el-descriptions-item :label="t('research.trialBasicAudit.audit.list.auditTime')">
                {{ formatDate(auditData.auditTime) }}
              </el-descriptions-item>
              <el-descriptions-item
                v-if="auditData.auditOpinion"
                :label="t('research.trialBasicAudit.form.auditOpinion')"
                :span="2"
              >
                {{ auditData.auditOpinion }}
              </el-descriptions-item>
              <el-descriptions-item
                v-if="auditData.rejectReason"
                :label="t('research.trialBasicAudit.form.rejectReason')"
                :span="2"
              >
                {{ auditData.rejectReason }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 审核操作卡片(仅待审核状态且非只读) -->
        <div v-if="auditData.auditStatus === 'S1' && !isReadonly" class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-edit-line"></i>
              <span>{{ t('research.trialBasicAudit.audit.detail.auditAction') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-form ref="auditFormRef" :model="auditForm" :rules="auditRules" label-width="140px">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="24">
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
                </el-col>
                <el-col :xs="24" :sm="24">
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
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <!-- 操作按钮区域（仅审核模式显示） -->
        <div v-if="auditData.auditStatus === 'S1' && !isReadonly" class="form-actions">
          <el-button @click="goBack">
            {{ t('research.trialBasicAudit.action.return') }}
          </el-button>
          <el-button type="success" @click="handleApprove">
            {{ t('research.trialBasicAudit.action.approve') }}
          </el-button>
          <el-button type="danger" @click="handleReject">
            {{ t('research.trialBasicAudit.action.reject') }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getAuditById, performAudit } from '@/api/research/trialBasicAudit'
import StatusTag from '../trial/components/StatusTag.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

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

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
</style>
