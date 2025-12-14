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
        <div class="header-actions">
          <el-button 
            v-for="button in getActionButtons()" 
            :key="button.action"
            :type="button.type" 
            @click="handleAction(button.action)">
            <i :class="button.icon"></i>{{ button.label }}
          </el-button>
        </div>
      </div>

      <div class="content-wrapper" v-loading="loading">
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
              <el-descriptions-item :label="$t('research.breedingData.batch.form.breedingMethod')">{{ detailData.breedingMethod }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.year')">{{ detailData.year }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.batchSize')">{{ detailData.batchSize || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.startDate')">{{ detailData.startDate || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.expectedEndDate')">{{ detailData.expectedEndDate || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.location')">{{ detailData.location || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.parentalSeedSource')">{{ detailData.parentalSeedSource || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.objective')">{{ detailData.objective || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.breedingData.batch.form.status')">{{ getStatusLabel(detailData.status) }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBreedingBatchInfo, submitForAudit, approveBatch, rejectBatch, archiveBatch, cancelBatch } from '@/api/breedingData'
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const detailData = ref({})

// 计算属性：显示作物种类名称
const displayCropType = computed(() => {
  const cropTypeNameMap = {
    'T01': 'wheat',
    'T02': 'corn',
    'T03': 'teff'
  }
  return cropTypeNameMap[detailData.value.cropType] || detailData.value.cropType
})

// 状态标签映射函数
const getStatusLabel = (status) => {
  const statusLabelMap = {
    'S0': 'Draft',
    'S1': 'Pending Approval',
    'S2': 'Approved',
    'S3': 'Rejected',
    'S9': 'Archived',
    'S10': 'Void'
  }
  return statusLabelMap[status] || status
}

// 获取状态流转操作按钮
const getActionButtons = () => {
  const status = detailData.value.status
  const buttons = []
  
  switch (status) {
    case 'S0': // 草稿
      buttons.push(
        { label: 'Submit for review', type: 'primary', action: 'submit', icon: 'ri-send-plane-line' },
        { label: 'Edit', type: 'default', action: 'edit', icon: 'ri-edit-line' }
      )
      break
    case 'S1': // 待审核
      buttons.push(
        { label: 'Approve', type: 'success', action: 'approve', icon: 'ri-check-line' },
        { label: 'Reject', type: 'warning', action: 'reject', icon: 'ri-close-line' }
      )
      break
    case 'S2': // 审核通过
    case 'S4': // 进行中
      buttons.push(
        { label: 'Archive', type: 'info', action: 'archive', icon: 'ri-archive-line' },
        { label: 'Cancel', type: 'danger', action: 'cancel', icon: 'ri-delete-bin-line' }
      )
      break
    case 'S3': // 审核驳回
      buttons.push(
        { label: 'Submit for review', type: 'primary', action: 'submit', icon: 'ri-send-plane-line' },
        { label: 'Edit', type: 'default', action: 'edit', icon: 'ri-edit-line' }
      )
      break
    case 'S9': // 已归档
      // 已作废状态无操作

      break
    case 'S10': // 已作废
      
      break
  }
  
  return buttons
}

const getInfo = async () => {
  loading.value = true
  try {
    const res = await getBreedingBatchInfo(route.params.dataId)
    detailData.value = res.data || {}
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
  await ElMessageBox.confirm('Are you sure you want to submit for review?', 'Prompt', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
  
  await submitForAudit(detailData.value.dataId)
  ElMessage.success('Submit for review successfully')
  await getInfo()
}

// 审核通过
const handleApprove = async () => {
  await ElMessageBox.confirm('Are you sure you want to approve?', 'Prompt', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
  
  await approveBatch(detailData.value.dataId)
  ElMessage.success('Approve successfully') 
  await getInfo()
}

// 审核驳回
const handleReject = async () => {
  await ElMessageBox.confirm('Are you sure you want to reject?', 'Prompt', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
  
  await rejectBatch(detailData.value.dataId)
  ElMessage.success('Reject successfully')
  await getInfo()
}

// 归档
const handleArchive = async () => {
  await ElMessageBox.confirm('Are you sure you want to archive?', 'Prompt', {
    confirmButtonText: 'Confirm', 
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
  
  await archiveBatch(detailData.value.dataId)
  ElMessage.success('Archive successfully')
  await getInfo()
}

// 作废
const handleCancelBatch = async () => {
  await ElMessageBox.confirm('Are you sure you want to cancel? This action cannot be undone!', 'Warning', {
    confirmButtonText: 'Confirm',   
    cancelButtonText: 'Cancel',   
    type: 'error'
  })
  
  await cancelBatch(detailData.value.dataId)
  ElMessage.success('Cancel successfully')
  await getInfo()
}

onMounted(() => getInfo())
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
