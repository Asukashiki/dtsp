<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleCancel">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ pageTitle }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="180px"
          v-loading="loading"
        >
        <!-- 地块信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-map-pin-line"></i>
              <span>{{ $t('research.environmentNewData.form.plotInfo') || 'Plot Information' }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.environmentNewData.form.plotId')" prop="plotId">
            <el-select
              v-model="formData.plotId"
              :placeholder="$t('research.environmentNewData.placeholder.plotId')"
              filterable
              clearable
              style="width: 100%"
              :loading="plotLoading"
              :disabled="isReadOnly || isAuditMode"
              @change="handlePlotChange"
            >
              <el-option
                v-for="item in plotOptions"
                :key="item.plotId"
                :label="item.plotId"
                :value="item.plotId"
              />
            </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.environmentNewData.form.batchId')" prop="batchId">
            <el-input
              v-model="formData.batchId"
              :placeholder="$t('research.environmentNewData.placeholder.batchId')"
              disabled
                />
              </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.environmentNewData.form.trialId')" prop="trialId">
            <el-input
              v-model="formData.trialId"
              :placeholder="$t('research.environmentNewData.placeholder.trialId')"
              disabled
                />
              </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- 监测站信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-base-station-line"></i>
              <span>{{ $t('research.environmentNewData.form.stationInfo') || 'Station Information' }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.environmentNewData.form.stationId')" prop="stationId">
            <el-select
              v-model="formData.stationId"
              :placeholder="$t('research.environmentNewData.placeholder.stationId')"
              filterable
              clearable
              style="width: 100%"
              :loading="dictLoading"
              :disabled="isReadOnly || isAuditMode"
            >
              <el-option
                v-for="item in options.weather_station"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.environmentNewData.form.timestamp')" prop="timestamp">
            <el-date-picker
              v-model="formData.timestamp"
              type="datetime"
              :placeholder="$t('research.environmentNewData.placeholder.timestamp')"
              format="YYYY-MM-DD HH:mm"
              value-format="YYYY-MM-DD HH:mm"
              style="width: 100%"
              :disabled="isReadOnly || isAuditMode"
              :default-value="new Date()"
                />
              </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- 测量信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-dashboard-3-line"></i>
              <span>{{ $t('research.environmentNewData.form.measurementInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.environmentNewData.form.parameterCode')" prop="parameterCode">
            <el-select
              v-model="formData.parameterCode"
              :placeholder="$t('research.environmentNewData.placeholder.parameterCode')"
              style="width: 100%"
              :disabled="isReadOnly || isAuditMode"
              @change="handleParameterCodeChange"
            >
              <el-option
                v-for="item in options.env_parameter_code || []"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <div style="display: flex; justify-content: space-between;">
                  <span>{{ item.label }}</span>
                  <span style="color: #8492a6; font-size: 12px;">{{ item.actualValue }}</span>
                </div>
              </el-option>
            </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.environmentNewData.form.value')" prop="value">
            <div class="input-with-unit">
              <el-input-number
                v-model="formData.value"
                :placeholder="$t('research.environmentNewData.placeholder.value')"
                :precision="2"
                :controls="false"
                style="width: 100%"
                :disabled="isReadOnly || isAuditMode"
              />
              <span class="unit-hint">{{ formData.unit || '-' }}</span>
            </div>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.environmentNewData.form.unit')" prop="unit">
            <el-select
              v-model="formData.unit"
              :placeholder="$t('research.environmentNewData.placeholder.unit')"
              maxlength="20"
              disabled
                />
              </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.environmentNewData.form.source')" prop="source">
            <el-select
              v-model="formData.source"
              :placeholder="$t('research.environmentNewData.placeholder.source')"
              style="width: 100%"
              :disabled="isReadOnly || isAuditMode"
            >
              <el-option label="IOT" value="IOT" />
              <el-option label="Metrology" value="metrology" />
            </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24">
                <el-form-item :label="$t('research.environmentNewData.form.remark')" prop="remark">
            <el-input
              v-model="formData.remark"
              type="textarea"
              :rows="3"
              :placeholder="$t('research.environmentNewData.placeholder.remark')"
              maxlength="500"
              show-word-limit
              :disabled="isReadOnly || isAuditMode"
                />
              </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- 审批意见 (仅在审批模式下显示) -->
        <div v-if="pageMode === 'audit'" class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-discuss-line"></i>
              <span>{{ $t('research.environmentNewData.form.approvalComment') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-row :gutter="20">
              <el-col :xs="24">
                <el-form-item :label="$t('research.environmentNewData.form.approvalComment')" prop="approvalComment">
            <el-input 
              v-model="formData.approvalComment" 
              type="textarea" 
              :rows="4" 
              :placeholder="$t('research.environmentNewData.placeholder.approvalComment')" 
              maxlength="500"
              show-word-limit
                />
              </el-form-item>
              </el-col>
            </el-row>
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
              {{ $t(`common.${button.label}`) }}
            </el-button>
        </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getEnvironmentNewDataDetail, addEnvironmentNewData, updateEnvironmentNewData, approveEnvironmentNewData, rejectEnvironmentNewData } from '@/api/environment-new-data'
import { getPlotInfoList } from '@/api/breedingData'
import { getUserInfo } from '@/utils/auth'
import { useDict } from '@/hooks/useDict'
import { useUserStore } from '@/store'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const formRef = ref(null)

/**
 * 根据工作流状态获取操作按钮
 */
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
const loading = ref(false)
const submitting = ref(false)
const plotLoading = ref(false)
const plotOptions = ref([])
const { options, loading: dictLoading, getActualValueByValue } = useDict(['weather_station', 'env_parameter_code'])

const isEdit = computed(() => !!route.params.envRecordId)

// 根据路由路径和参数判断页面模式
const pageMode = computed(() => {
  if (route.query.mode) {
    return route.query.mode
  }
  if (route.path.includes('/audit/')) {
    return 'audit'
  }
  if (route.path.includes('/detail/')) {
    return 'view'
  }
  return isEdit.value ? 'edit' : 'add'
})

const isReadOnly = computed(() => pageMode.value === 'audit' || pageMode.value === 'view')
const isAuditMode = computed(() => pageMode.value === 'audit')

// 页面标题
const pageTitle = computed(() => {
  switch (pageMode.value) {
    case 'audit':
      return t('research.environmentNewData.audit')
    case 'view':
      return t('research.environmentNewData.detail')
    case 'edit':
      return t('research.environmentNewData.edit')
    default:
      return t('research.environmentNewData.add')
  }
})

const formData = reactive({
  envRecordId: '',
  batchId: '',
  trialId: '',
  plotId: '',
  stationId: '',
  timestamp: '',
  parameterCode: '',
  value: null,
  unit: '',
  source: '',
  remark: '',
  observerId: '',
  workflowStatus: '',
  approvalComment: '' // 添加审批意见字段
})

// 观察员名称（用于显示）
const observerName = ref('')

const unitOptions = ref([
  { value: '°C', label: '°C' },
])

const rules = reactive({
  plotId: [
    { required: true, message: t('research.environmentNewData.rules.plotIdRequired') || 'Please select a plot', trigger: 'change' }
  ],
  stationId: [
    { required: true, message: t('research.environmentNewData.rules.stationIdRequired'), trigger: 'change' }
  ],
  timestamp: [
    { required: true, message: t('research.environmentNewData.rules.timestampRequired'), trigger: 'change' }
  ],
  parameterCode: [
    { required: true, message: t('research.environmentNewData.rules.parameterCodeRequired'), trigger: 'change' }
  ],
  value: [
    { required: true, message: t('research.environmentNewData.rules.valueRequired'), trigger: 'blur' }
  ],
  unit: [
    { required: true, message: t('research.environmentNewData.rules.unitRequired'), trigger: 'blur' },
    { max: 20, message: t('research.environmentNewData.rules.unitLength'), trigger: 'blur' }
  ],
  approvalComment: [
    { required: true, message: t('research.environmentNewData.rules.approvalCommentRequired') || '请填写审批意见', trigger: 'blur' }
  ]
})

// 加载地块选项
const loadPlotOptions = async () => {
  plotLoading.value = true
  try {
    const res = await getPlotInfoList({ pageNum: 1, pageSize: 1000 })
    if (res.code === 200) {
      plotOptions.value = res.rows || []
    }
  } catch (error) {
    console.error('Failed to load plot options:', error)
  } finally {
    plotLoading.value = false
  }
}

// 地块选择变化时，自动填充批次ID和试验ID
const handlePlotChange = (plotId) => {
  if (!plotId) {
    formData.batchId = ''
    formData.trialId = ''
    return
  }
  const selectedPlot = plotOptions.value.find(item => item.plotId === plotId)
  if (selectedPlot) {
    formData.batchId = selectedPlot.batchId || ''
    formData.trialId = selectedPlot.trialId || ''
  }
}

// 参数代码选择变化时，自动填充单位
const handleParameterCodeChange = (parameterCode) => {
  if (!parameterCode) {
    formData.unit = ''
    return
  }
  // 从字典的 actualValue 获取单位
  const unit = getActualValueByValue('env_parameter_code', parameterCode)
  formData.unit = unit || ''
}

// 加载详情数据
const loadDetail = async () => {
  if (!isEdit.value) return

  loading.value = true
  try {
    const res = await getEnvironmentNewDataDetail(route.params.envRecordId)
    if (res.code === 200 && res.data) {
      Object.assign(formData, res.data)
      // 设置观察员名称
      if (res.data.observerName) {
        observerName.value = res.data.observerName
      } else if (res.data.observerId) {
        // 如果后端没有返回observerName，尝试从当前用户信息获取
        try {
          const u = getUserInfo()
          if (u && u.user && u.user.id === res.data.observerId) {
            // 优先使用 name，然后是 nickName，最后是 userName
            observerName.value = u.user.name || u.user.nickName || u.user.userName || res.data.observerId
          } else {
            observerName.value = res.data.observerId
          }
        } catch (e) {
          observerName.value = res.data.observerId
        }
      }
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 取消
const handleCancel = () => {
  router.back()
}

/**
 * 处理不同按钮操作
 */
const handleAction = (action) => {
  switch (action) {
    case 'cancel':
      handleCancel()
      break
    case 'save':
      handleSubmit()
      break
    case 'approve':
      handleApprove()
      break
    case 'reject':
      handleReject()
      break
    default:
      console.warn(`Unknown action: ${action}`)
  }
}

// 提交
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()

    submitting.value = true
    const submitData = { ...formData }

    let res
    if (isEdit.value) {
      res = await updateEnvironmentNewData(submitData)
    } else {
      res = await addEnvironmentNewData(submitData)
    }

    if (res.code === 200) {
      ElMessage.success(isEdit.value ? t('research.environmentNewData.editSuccess') : t('research.environmentNewData.addSuccess'))
      router.back()
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to submit:', error)
      ElMessage.error(t('common.failed'))
    }
  } finally {
    submitting.value = false
  }
}

// 审核通过
const handleApprove = async () => {
  try {
    // 审核通过时审批意见可选，不强制验证
    const res = await approveEnvironmentNewData(formData.envRecordId, formData.approvalComment)
    if (res.code === 200) {
      ElMessage.success(t('research.environmentNewData.approveSuccess'))
      router.back()
    } else {
      ElMessage.error(t('research.environmentNewData.approveFailed'))
    }
  } catch (error) {
    console.error('Failed to approve:', error)
    ElMessage.error(t('research.environmentNewData.approveFailed'))
  }
}

// 驳回 - 驳回时应验证审批意见已填
const handleReject = async () => {
  try {
    // 驳回时必须填写审批意见
    if (!formData.approvalComment || formData.approvalComment.trim() === '') {
      ElMessage.warning(t('research.environmentNewData.rules.approvalCommentRequired') || '驳回时必须填写审批意见')
      return
    }

    const res = await rejectEnvironmentNewData(formData.envRecordId, formData.approvalComment)
    if (res.code === 200) {
      ElMessage.success(t('research.environmentNewData.rejectSuccess'))
      router.back()
    } else {
      ElMessage.error(t('research.environmentNewData.rejectFailed'))
    }
  } catch (error) {
    console.error('Failed to reject:', error)
    ElMessage.error(t('research.environmentNewData.rejectFailed'))
  }
}

onMounted(() => {
  loadPlotOptions()
  // 先设置默认值，再加载详情（这样编辑模式下会被覆盖）
  // 设置 Observer ID 为当前登录用户（仅新增时，且为空时）
  try {
    const u = getUserInfo()
    if (!isEdit.value && u && u.user && u.user.id) {
      formData.observerId = u.user.id
      // 优先使用 name，然后是 nickName，最后是 userName
      observerName.value = u.user.name || u.user.nickName || u.user.userName || u.user.id
    }
    // 设置采集时间默认值为当前时间（仅新增时）
    if (!isEdit.value && !formData.timestamp) {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      formData.timestamp = `${year}-${month}-${day} ${hours}:${minutes}`
    }
  } catch (e) {
    // ignore
  }
  // 加载详情数据（编辑模式）
  loadDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

/* 带单位的输入框容器 */
.input-with-unit {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.input-with-unit .el-input-number {
  flex: 1;
}

/* 单位提示 */
.unit-hint {
  color: #6b7280;
  font-size: 14px;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 40px;
}
</style>
