<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('research.breedingData.batch.edit') : $t('research.breedingData.batch.add') }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" v-loading="loading || dictLoading">
          <!-- 批次基本信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.breedingData.batch.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.batchName')" prop="batchName">
                    <el-input v-model="formData.batchName" :placeholder="$t('research.breedingData.batch.placeholder.batchName')" :disabled="isReadOnly" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.batchId')">
                    <el-input v-model="formData.batchId" disabled :placeholder="'B_{cropType}_{year}_000001'" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.cropType')" prop="cropType">
                    <el-select 
                      v-model="formData.cropType" 
                      :placeholder="$t('research.breedingData.batch.placeholder.cropType')" 
                      style="width: 100%" 
                      @change="handleCropTypeChange" 
                      :disabled="isReadOnly"
                      v-loading="dictLoading"
                    >
                      <el-option 
                        v-for="item in options.crop_type" 
                        :key="item.value" 
                        :label="item.label" 
                        :value="item.value" 
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.varietyCode')" prop="varietyCode">
                    <el-input v-model="formData.varietyCode" :placeholder="$t('research.breedingData.batch.placeholder.varietyCode')" :disabled="isReadOnly" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.varietyName')" prop="varietyName">
                    <el-input v-model="formData.varietyName" :placeholder="$t('research.breedingData.batch.placeholder.varietyName')" :disabled="isReadOnly" />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.breedingMethod')" prop="breedingMethod">
                    <el-select v-model="formData.breedingMethod" :placeholder="$t('research.breedingData.batch.placeholder.breedingMethod')" style="width: 100%" :disabled="isReadOnly">
                      <el-option v-for="item in breedingMethodOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.year')" prop="year">
                    <div class="w-full">
                      <el-date-picker
                        v-model="formData.year"
                        type="year"
                        value-format="YYYY"
                        style="width: 100%"
                        :placeholder="$t('research.breedingData.batch.placeholder.year')"
                        :disabled-date="disablePastYears"
                        :disabled="isReadOnly"
                      />
                      <div class="mt-1 text-xs text-gray-500">
                        {{ $t('research.breedingData.batch.hint.yearNoPastSeasonLogic') }}
                      </div>
                    </div>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.germplasmSource')" prop="germplasmSource">
                    <el-select v-model="formData.germplasmSource" :placeholder="$t('research.breedingData.batch.placeholder.germplasmSource')" style="width: 100%" :disabled="isReadOnly">
                      <el-option v-for="item in germplasmSourceOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.parentalSeedSource')" prop="parentalSeedSource">
                    <el-input v-model="formData.parentalSeedSource" :placeholder="$t('research.breedingData.batch.placeholder.parentalSeedSource')" :disabled="isReadOnly" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.objective')" prop="objective">
                    <el-input v-model="formData.objective" :placeholder="$t('research.breedingData.batch.placeholder.objective')" :disabled="isReadOnly" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.status')" prop="status">
                    <el-select v-model="formData.status" :placeholder="$t('research.breedingData.batch.placeholder.status')" style="width: 100%" disabled>
                      <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.workflowStatus')" prop="workflowStatus">
                    <el-input :value="getLabelByValue('flow_status', formData.workflowStatus)" disabled style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24">
                    <el-form-item :label="$t('research.breedingData.batch.form.remarks')">
                      <el-input v-model="formData.remarks" type="textarea" :rows="3" :placeholder="$t('research.breedingData.batch.placeholder.remarks')" :disabled="isReadOnly" />
                    </el-form-item>
                  </el-col>
              </el-row>
            </div>
          </div>

          <!-- 元数据信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.breedingData.batch.form.metadataInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.createBy')">
                    <el-input v-model="formData.createBy" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.createTime')">
                    <el-input v-model="formData.createTime" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.updateBy')">
                    <el-input v-model="formData.updateBy" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.updateTime')">
                    <el-input v-model="formData.updateTime" disabled />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 工作流信息 -->
          <div class="info-card" v-if="showWorkflowInfo">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-git-commit-line"></i>
                <span>{{ $t('research.breedingData.batch.form.workflowInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <!-- 审批意见输入框（仅在审批模式下显示） -->
              <div v-if="pageMode === 'audit'">
                <el-form-item :label="$t('research.breedingData.batch.form.approvalComment')" prop="approvalComment">
                  <el-input 
                    v-model="formData.approvalComment" 
                    type="textarea" 
                    :rows="4" 
                    :placeholder="$t('research.breedingData.batch.placeholder.approvalComment')" 
                  />
                </el-form-item>
              </div>

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

          <!-- 操作按钮 -->
          <div class="form-actions">
            <el-button 
              v-for="button in getActionButtons()" 
              :key="button.action"
              :type="button.type" 
              @click="handleAction(button.action)"
              :loading="submitLoading && button.action === 'save'">
              {{ button.label }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getBreedingBatchInfo, addBreedingBatch, editBreedingBatch, submitForAudit, approveBatch, rejectBatch, archiveBatch, cancelBatch } from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'
import { useUserStore } from '@/store'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// 使用 useDict hook 获取字典数据
const { options, getLabelByValue, loading: dictLoading } = useDict([
  'crop_type',
  'flow_status'
])

const formRef = ref(null)
const loading = ref(false)
const submitLoading = ref(false)
const userStore = useUserStore()

const isEdit = computed(() => !!route.params.dataId)
const pageMode = computed(() => route.query.mode || (isEdit.value ? 'edit' : 'add'))
const isReadOnly = computed(() => pageMode.value === 'audit' || pageMode.value === 'view')

// 控制工作流信息部分的显示：仅在非草稿和非新建状态下显示
const showWorkflowInfo = computed(() => {
  // 新建模式下不显示
  if (!isEdit.value && pageMode.value === 'add') {
    return false
  }
  // 草稿状态(S0)和作废状态(S10)不显示
  return !['S0', 'S10'].includes(formData.workflowStatus)
})

// 审批历史记录
const approvalHistory = ref([])

const formData = reactive({
  dataId: '',
  batchId: '',
  cropType: '',
  varietyCode: '',
  varietyName: '',
  breedingMethod: '',
  batchName: '',
  year: '',
  germplasmSource: '',
  parentalSeedSource: '',
  objective: '',
  status: 'Ongoing', // 新增的状态字段，默认值为 Ongoing
  workflowStatus: 'S0', // 默认草稿状态
  remarks: '',
  // 元数据字段
  createBy: '',
  createTime: '',
  updateBy: '',
  updateTime: '',
  // 审批意见字段
  approvalComment: ''
})

const rules = {
  cropType: [{ required: true, message: t('research.breedingData.batch.placeholder.cropType'), trigger: 'change' }],
  varietyCode: [{ required: true, message: t('research.breedingData.batch.placeholder.varietyCode'), trigger: 'blur' }],
  varietyName: [{ required: true, message: t('research.breedingData.batch.placeholder.varietyName'), trigger: 'blur' }],
  breedingMethod: [{ required: true, message: t('research.breedingData.batch.placeholder.breedingMethod'), trigger: 'change' }],
  batchName: [{ required: true, message: t('research.breedingData.batch.placeholder.batchName'), trigger: 'blur' }],
  year: [
    { required: true, message: t('research.breedingData.batch.placeholder.year'), trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback()
          return
        }
        const currentYear = new Date().getFullYear()
        const selectedYear = parseInt(value)
        if (selectedYear < currentYear) {
          callback(new Error(t('research.breedingData.batch.validation.yearNotLessThanCurrent')))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  workflowStatus: [{ required: true, message: t('research.breedingData.batch.placeholder.workflowStatus'), trigger: 'change' }],
  germplasmSource: [{ required: true, message: t('research.breedingData.batch.placeholder.germplasmSource'), trigger: 'change' }],
  parentalSeedSource: [{ required: true, message: t('research.breedingData.batch.placeholder.parentalSeedSource'), trigger: 'blur' }],
  objective: [{ required: true, message: t('research.breedingData.batch.placeholder.objective'), trigger: 'blur' }],
  status: [{ required: true, message: t('research.breedingData.batch.placeholder.status'), trigger: 'change' }],
  approvalComment: [{ required: true, message: t('research.breedingData.batch.placeholder.approvalComment'), trigger: 'blur' }]
}

const breedingMethodOptions = [
  { label: 'hybridization', value: 'hybridization' },
  { label: 'mutagenesis', value: 'mutagenesis' },
  { label: 'molecular', value: 'molecular' },
  { label: 'selection', value: 'selection' },
  { label: 'wide_cross', value: 'wide_cross' }
]

const germplasmSourceOptions = [
  { label: 'Ethiopian', value: 'Ethiopian' },
  { label: 'International Center for Agricultural Research in the Dry Areas (ICARDA)', value: 'ICARDA' },
  { label: 'International Maize and Wheat Improvement Center (CIMMYT)', value: 'CIMMYT' },
  { label: 'International Rice Research Institute (IRRI)', value: 'IRRI' },
  { label: 'International Institute of Tropical Agriculture (IITA)', value: 'IITA' },
  { label: 'World Bank', value: 'World Bank' },
  { label: 'CGIAR', value: 'CGIAR' },
  { label: 'FAO', value: 'FAO' },
  { label: 'Local Research Center', value: 'Local Research Center' },
  { label: 'Private Company', value: 'Private Company' }
]

const statusOptions = [
  { label: 'Ongoing', value: 'Ongoing' },
  { label: 'Finished', value: 'Finished' }
]

const getActionButtons = () => {
  const workflowStatus = formData.workflowStatus
  const mode = pageMode.value
  
  // 新建/编辑模式
  if (mode === 'add' || mode === 'edit') {
    return [
      { type: '', label: 'cancel', action: 'cancel' },
      { type: 'primary', label: 'save', action: 'save' }
    ]
  }
  
  // 审批模式
  if (mode === 'audit') {
    return [
      { type: '', label: 'cancel', action: 'cancel' },
      { type: 'success', label: 'approve', action: 'approve' },
      { type: 'danger', label: 'reject', action: 'reject' }
    ]
  }
  
  // 查看模式（已审批/已归档/作废状态）
  if (mode === 'view') {
    return [
      { type: '', label: 'cancel', action: 'cancel' },
      { type: 'primary', label: 'archive', action: 'archive' },
      { type: 'danger', label: 'cancelBatch', action: 'cancelBatch' }
    ]
  }
  
  // 默认按钮
  return [
    { type: '', label: 'cancel', action: 'cancel' },
    { type: 'primary', label: 'save', action: 'save' }
  ]
}

const handleAction = (action) => {
  switch (action) {
    case 'cancel':
      goBack()
      break
    case 'save':
      handleSubmit()
      break
    case 'submit':
      handleSubmitForAudit()
      break
    case 'approve':
      handleApprove()
      break
    case 'reject':
      handleReject()
      break
    case 'archive':
      handleArchive()
      break
    case 'cancelBatch':
      handleCancelBatch()
      break
  }
}

const handleSubmitForAudit = async () => {
  try {
    await submitForAudit(formData.dataId)
    ElMessage.success(t('research.breedingData.batch.submitForAuditSuccess'))
    goBack()
  } catch (error) {
    ElMessage.error(t('research.breedingData.batch.submitForAuditError'))
  }
}

const handleApprove = async () => {
  // 验证表单，特别是审批意见字段
  const valid = await formRef.value.validateField('approvalComment').catch(() => false)
  if (!valid) return

  try {
    // 构造包含审批意见的完整DTO对象
    const breedingBatchDTO = {
      ...formData,
      approvalComment: formData.approvalComment ? {
        comment: formData.approvalComment
      } : null
    };
    
    await approveBatch(breedingBatchDTO)
    ElMessage.success(t('research.breedingData.batch.approveSuccess'))
    goBack()
  } catch (error) {
    ElMessage.error(t('research.breedingData.batch.approveError'))
  }
}

const handleReject = async () => {
  // 验证表单，特别是审批意见字段
  const valid = await formRef.value.validateField('approvalComment').catch(() => false)
  if (!valid) return

  try {
    // 构造包含审批意见的完整DTO对象
    const breedingBatchDTO = {
      ...formData,
      approvalComment: formData.approvalComment ? {
        comment: formData.approvalComment
      } : null
    };
    
    await rejectBatch(breedingBatchDTO)
    ElMessage.success(t('research.breedingData.batch.rejectSuccess'))
    goBack()
  } catch (error) {
    ElMessage.error(t('research.breedingData.batch.rejectError'))
  }
}

const handleArchive = async () => {
  try {
    await archiveBatch(formData.dataId)
    ElMessage.success(t('research.breedingData.batch.archiveSuccess'))
    goBack()
  } catch (error) {
    ElMessage.error(t('research.breedingData.batch.archiveError'))
  }
}

const handleCancelBatch = async () => {
  try {
    await cancelBatch(formData.id)
    ElMessage.success(t('research.breedingData.batch.cancelSuccess'))
    goBack()
  } catch (error) {
    ElMessage.error(t('research.breedingData.batch.cancelError'))
  }
}

const getInfo = async () => {
  if (!isEdit.value) {
    // 新增模式下设置默认状态为草稿
    formData.status='Ongoing'
    formData.workflowsStatus = 'S0'
    
    // 设置创建人和创建时间的默认值
    if (userStore.userInfo && userStore.userInfo.user) {
      const user = userStore.userInfo.user
      formData.createBy = user.name || ''
    }
    
    // 设置创建时间为当前系统时间
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    formData.createTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    
    return
  }
  loading.value = true
  try {
    // 获取包含审批意见的详细信息
    const res = await getBreedingBatchInfo(route.params.dataId)
    Object.assign(formData, res.data)
    if (formData.year) {
      formData.year = String(formData.year)
    }
    
    // 设置审批历史记录
    if (res.data.approvalComments) {
      approvalHistory.value = res.data.approvalComments.map(comment => ({
        approver: comment.approverName,
        approvalTime: comment.approvalTime,
        comment: comment.comment
      }))
    }
    
    // 在编辑模式下更新修改人和修改时间
    if (userStore.userInfo && userStore.userInfo.user) {
      const user = userStore.userInfo.user
      formData.updateBy = user.name || ''
    }
    
    // 设置修改时间为当前系统时间
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    formData.updateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  } catch (error) {
    console.error('Failed to fetch details:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitLoading.value = true
  try {
    const submitData = { ...formData }
    if (submitData.year) {
      submitData.year = parseInt(submitData.year)
    }

    if (isEdit.value) {
      await editBreedingBatch(submitData)
      ElMessage.success(t('research.breedingData.batch.editSuccess'))
    } else {
      await addBreedingBatch(submitData)
      ElMessage.success(t('research.breedingData.batch.addSuccess'))
    }
    goBack()
  } catch (error) {
    console.error('Failed to submit:', error)
  } finally {
    submitLoading.value = false
  }
}

const handleCropTypeChange = () => {
  // 自动生成 batchId
  generateBatchId()
}

// 生成 batchId: B_${cropType}_${year}_serial(6位)
const generateBatchId = () => {
  // 编辑模式下不自动生成
  if (isEdit.value) return

  const { cropType, year } = formData

  if (!cropType || !year) {
    formData.batchId = ''
    return
  }

  // 生成6位流水号（这里暂时使用随机数，实际应该从后端获取最新的流水号）
  const serial = String(Math.floor(Math.random() * 1000000)).padStart(6, '0')
  formData.batchId = `B_${cropType}_${year}_${serial}`
}

const goBack = () => {
  router.push('/research/breeding-data/batch')
}

// 监听年份变化，自动生成 batchId
watch(() => formData.year, () => {
  generateBatchId()
})

// 禁用过去年份（遵循日期逻辑：不允许早于当前年）
const disablePastYears = (date) => {
  if (!date) return false
  const currentYear = new Date().getFullYear()
  return date.getFullYear() < currentYear
}

onMounted(() => {
  getInfo()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 24px 0;
}
</style>
