<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack"><i class="ri-arrow-left-line"></i></el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.batch.detail') }}</h1>
          </div>
        </div>
      </div>

      <div class="content-wrapper" v-loading="loading">
        <!-- 批次基本信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-information-line"></i><span>{{ $t('research.breedingData.batch.form.basicInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.batchName')">{{ detailData.batchName }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.batchId')">{{ detailData.batchId }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.cropType')">{{ displayCropType }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.varietyName')">{{ detailData.varietyName }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.varietyCode')">{{ detailData.varietyCode }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.breedingMethod')">{{ detailData.breedingMethod }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.year')">{{ detailData.year }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.germplasmSource')">{{ detailData.germplasmSource || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.parentalSeedSource')">{{ detailData.parentalSeedSource || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.objective')">{{ detailData.objective || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.status')">{{ detailData.status || '-' }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 元数据信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-information-line"></i><span>{{ $t('research.breedingData.batch.form.metadataInfo') }}</span></div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.createBy')">{{ detailData.createBy || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.createTime')">{{ detailData.createTime || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.updateBy')">{{ detailData.updateBy || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.updateTime')">{{ detailData.updateTime || '-' }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 工作流信息 -->
        <div class="info-card" v-if="showWorkflowInfo">
          <div class="card-header">
            <div class="card-title"><i class="ri-git-commit-line"></i><span>{{ $t('research.breedingData.batch.form.workflowInfo') }}</span></div>
          </div>
          <div class="card-body">
            <!-- 历史审批信息 -->
            <div class="mb-4">
              <h4 class="mb-3">{{ $t('research.breedingData.batch.form.approvalHistory') }}</h4>
              <el-table :data="approvalHistory" border stripe>
                <el-table-column :label="$t('research.breedingData.batch.form.approver')" prop="approver" width="200" />
                <el-table-column :label="$t('research.breedingData.batch.form.approvalTime')" prop="approvalTime" width="250" />
                <el-table-column :label="$t('research.breedingData.batch.form.comment')" prop="comment" />
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getBreedingBatchInfo, submitForAudit, approveBatch, rejectBatch, archiveBatch, cancelBatch } from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const loading = ref(false)
const detailData = ref({})

// 审批历史记录
const approvalHistory = ref([])

// 使用 useDict hook 获取字典数据
const { getLabelByValue } = useDict(['crop_type', 'flow_status'])

// 计算属性：显示作物种类名称
const displayCropType = computed(() => {
  return getLabelByValue('crop_type', detailData.value.cropType) || detailData.value.cropType
})

// 状态标签映射函数
const getWorkflowStatusLabel = (workflowStatus) => {
  return getLabelByValue('flow_status', workflowStatus) || workflowStatus
}

// 控制工作流信息部分的显示：仅在非草稿和非新建状态下显示
const showWorkflowInfo = computed(() => {
  // 草稿状态(S0)和作废状态(S10)不显示
  return !['S0', 'S10'].includes(detailData.value.workflowStatus)
})

const getInfo = async () => {
  loading.value = true
  try {
    const res = await getBreedingBatchInfo(route.params.dataId)
    detailData.value = res.data || {}
    
    // 设置审批历史记录
    if (res.data && res.data.approvalComments) {
      approvalHistory.value = res.data.approvalComments.map(comment => ({
        approver: comment.approverName,
        approvalTime: comment.approvalTime,
        comment: comment.comment
      }))
    }
  } finally {
    loading.value = false
  }
}

const handleEdit = () => router.push(`/research/breeding-data/batch/edit/${route.params.dataId}`)
const goBack = () => router.push('/research/breeding-data/batch')

// 处理状态流转操作
const handleAction = async (action) => {
  try {
    switch (action) {
      case 'submit':
        await handleSubmitForAudit()
        break
      case 'approve':
        await handleApprove()
        break
      case 'reject':
        await handleReject()
        break
      case 'archive':
        await handleArchive()
        break
      case 'cancel':
        await handleCancelBatch()
        break
      case 'edit':
        handleEdit()
        break
    }
  } catch (error) {
      ElMessage.error('Operation failed: ' + (error.message || 'Unknown error'))
  }
}

// 提交审核
const handleSubmitForAudit = async () => {
  await ElMessageBox.confirm(t('research.breedingData.batch.confirm.submitForReview'), t('research.breedingData.batch.prompt'), {
    confirmButtonText: t('research.breedingData.batch.confirmButton'),
    cancelButtonText: t('research.breedingData.batch.cancelButton'),
    type: 'warning'
  })
  
  await submitForAudit(detailData.value.dataId)
  ElMessage.success(t('research.breedingData.batch.success.submitForReview'))
  await getInfo()
}

// 审核通过
const handleApprove = async () => {
  await ElMessageBox.confirm(t('research.breedingData.batch.confirm.approve'), t('research.breedingData.batch.prompt'), {
    confirmButtonText: t('research.breedingData.batch.confirmButton'),
    cancelButtonText: t('research.breedingData.batch.cancelButton'),
    type: 'warning'
  })
  
  await approveBatch(detailData.value.dataId)
  ElMessage.success(t('research.breedingData.batch.success.approve')) 
  await getInfo()
}

// 审核驳回
const handleReject = async () => {
  await ElMessageBox.confirm(t('research.breedingData.batch.confirm.reject'), t('research.breedingData.batch.prompt'), {
    confirmButtonText: t('research.breedingData.batch.confirmButton'),
    cancelButtonText: t('research.breedingData.batch.cancelButton'),
    type: 'warning'
  })
  
  await rejectBatch(detailData.value.dataId)
  ElMessage.success(t('research.breedingData.batch.success.reject'))
  await getInfo()
}

// 归档
const handleArchive = async () => {
  await ElMessageBox.confirm(t('research.breedingData.batch.confirm.archive'), t('research.breedingData.batch.prompt'), {
    confirmButtonText: t('research.breedingData.batch.confirmButton'), 
    cancelButtonText: t('research.breedingData.batch.cancelButton'),
    type: 'warning'
  })
  
  await archiveBatch(detailData.value.dataId)
  ElMessage.success(t('research.breedingData.batch.success.archive'))
  await getInfo()
}

// 作废
const handleCancelBatch = async () => {
  await ElMessageBox.confirm(t('research.breedingData.batch.confirm.cancel'), t('research.breedingData.batch.warning'), {
    confirmButtonText: t('research.breedingData.batch.confirmButton'),   
    cancelButtonText: t('research.breedingData.batch.cancelButton'),   
    type: 'error'
  })
  
  await cancelBatch(detailData.value.dataId)
  ElMessage.success(t('research.breedingData.batch.success.cancel'))
  await getInfo()
}

onMounted(() => getInfo())
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
