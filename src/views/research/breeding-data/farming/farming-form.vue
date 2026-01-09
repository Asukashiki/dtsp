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
            <h1 class="page-title">{{ isEdit ? $t('research.breedingData.farming.edit') : $t('research.breedingData.farming.add') }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="180px" v-loading="loading">
          <!-- Farming Record Information -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-list-3-line"></i>
                <span>Farming Record Information</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <!-- Farming Record ID (auto-generated, read-only) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Farming Record ID">
                    <el-input v-model="formData.farmingRecordId" disabled placeholder="{plot_id}-F{record_no}" />
                  </el-form-item>
                </el-col>
                <!-- Plot ID -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Plot ID" prop="plotId">
                    <el-select
                      v-model="formData.plotId"
                      placeholder="Please select Plot ID"
                      filterable
                      style="width: 100%"
                      @change="handlePlotChange"
                      :disabled="isAuditMode"
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
                <!-- Trial ID (read-only, auto-filled from Plot ID) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Trial ID">
                    <el-input v-model="formData.trialId" disabled placeholder="Auto-filled from Plot ID" />
                  </el-form-item>
                </el-col>
                <!-- Batch ID (read-only, auto-filled from Plot ID) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Batch ID">
                    <el-input v-model="formData.batchId" disabled placeholder="Auto-filled from Plot ID" />
                  </el-form-item>
                </el-col>
                <!-- Activity Date -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Activity Date" prop="activityDate">
                    <el-date-picker
                      v-model="formData.activityDate"
                      type="datetime"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      style="width: 100%"
                      placeholder="Select activity date and time"
                      :disabled="isAuditMode"
                    />
                  </el-form-item>
                </el-col>
                <!-- Activity Type -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Activity Type" prop="activityType">
                    <el-select v-model="formData.activityType" placeholder="Please select activity type" style="width: 100%" :disabled="isAuditMode">
                      <el-option label="Fertilizer" value="fertilizer" />
                      <el-option label="Irrigation" value="irrigation" />
                      <el-option label="Pest Control" value="pest_control" />
                      <el-option label="Weeding" value="weeding" />
                      <el-option label="Tillage" value="tillage" />
                      <el-option label="Harvest" value="harvest" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- Input Name -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Input Name">
                    <el-input v-model="formData.inputName" placeholder="Enter input name (e.g., fertilizer type, pesticide name)" :disabled="isAuditMode" />
                  </el-form-item>
                </el-col>
                <!-- Quantity -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Quantity">
                    <el-input-number v-model="formData.quantity" :min="0" :precision="2" style="width: 100%" placeholder="Enter quantity" :disabled="isAuditMode" />
                  </el-form-item>
                </el-col>
                <!-- Unit -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Unit">
                    <el-select v-model="formData.unit" placeholder="Please select unit" style="width: 100%" :disabled="isAuditMode">
                      <el-option label="Kg/ha" value="Kg/ha" />
                      <el-option label="g" value="g" />
                      <el-option label="L" value="L" />
                      <el-option label="mL" value="mL" />
                      <el-option label="bags" value="bags" />
                      <el-option label="pieces" value="pieces" />
                      <el-option label="cm" value="cm" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- Operator ID (Farmer selection) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Operator ID" prop="operatorId">
                    <el-select
                      v-model="formData.operatorId"
                      placeholder="Please select operator"
                      filterable
                      style="width: 100%"
                      :disabled="isAuditMode"
                    >
                      <el-option
                        v-for="item in farmerOptions"
                        :key="item.farmerId"
                        :label="`${item.farmerName} (${item.farmerId})`"
                        :value="String(item.farmerId)"
                      >
                        <div style="display: flex; justify-content: space-between;">
                          <span>{{ item.farmerName }}</span>
                          <span style="color: #8492a6; font-size: 13px;">{{ item.farmerId }}</span>
                        </div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- Operation Description -->
                <el-col :xs="24">
                  <el-form-item label="Operation Description">
                    <el-input
                      v-model="formData.operationDesc"
                      type="textarea"
                      :rows="3"
                      placeholder="Enter operation description"
                      :disabled="isAuditMode"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- Audit Information (Only shown in edit mode) -->
          <div class="info-card" v-if="isEdit">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-info-line"></i>
                <span>Audit Information</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Workflow Status">
                    <el-tag :type="getStatusType(formData.workflowStatus || formData.auditStatus || 'S1')">
                      {{ getLabelByValue('flow_status', formData.workflowStatus || formData.auditStatus || 'S1') }}
                    </el-tag>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Auditor (audit_by)" :prop="isAuditMode ? 'auditBy' : ''">
                    <el-input
                      v-model="formData.auditBy"
                      :disabled="!isAuditMode"
                      placeholder="Auditor will be automatically filled"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Audit Time (audit_time)">
                    <el-input
                      v-model="formData.auditTime"
                      disabled
                      placeholder="Audit time will be automatically generated"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24">
                  <el-form-item label="Remark">
                    <el-input
                      v-model="formData.remark"
                      type="textarea"
                      :rows="4"
                      disabled
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Creator">
                    <el-input v-model="formData.creator" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Created Time">
                    <el-input v-model="formData.createTime" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Modifier">
                    <el-input v-model="formData.modifier" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Modified Time">
                    <el-input v-model="formData.updateTime" disabled />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- Audit Operation Area (Only shown in audit mode) -->
          <div class="info-card" v-if="isAuditMode">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-check-line"></i>
                <span>Audit Operation</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24">
                  <el-form-item label="Audit Remark" prop="auditRemark">
                    <el-input
                      v-model="formData.auditRemark"
                      type="textarea"
                      :rows="4"
                      placeholder="Please enter audit remark (required)"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- Operation Buttons -->
          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
            <template v-if="isAuditMode">
              <el-button type="danger" @click="handleReject" :loading="submitLoading">
                <i class="ri-close-line"></i>reject
              </el-button>
              <el-button type="success" @click="handleApprove" :loading="submitLoading">
                <i class="ri-check-line"></i>approve
              </el-button>
            </template>
            <template v-else>
              <el-button type="primary" @click="handleSubmit" :loading="submitLoading">
                {{ $t('common.save') }}
              </el-button>
            </template>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getFarmingRecordInfo, addFarmingRecord, editFarmingRecord, getPlotOptions } from '@/api/breedingData'
import { auditFarmingRecord } from '@/api/farmingRecordAudit'
import { getFarmerOptions } from '@/api/newFarm'
import { getUserInfo } from '@/utils/auth'
import { useDict } from '@/hooks/useDict'
import { useUserStore } from '@/store'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const formRef = ref(null)
const loading = ref(false)
const submitLoading = ref(false)
const plotOptions = ref([])
const farmerOptions = ref([])
const { options: dictOptions, getLabelByValue } = useDict('flow_status')

// Determine tag type based on status value
const getStatusType = (status) => {
  const typeMap = {
    'S0': 'info',     // Draft
    'S1': 'warning',  // Pending Approval
    'S2': 'success',  // Approved
    'S3': 'danger',   // Rejected
    'S10': 'info'     // Invalid
  }
  return typeMap[status] || 'warning'
}

const isEdit = computed(() => !!route.params.farmingId)
const isAuditMode = computed(() => route.path.includes('farming-form'))



const formData = reactive({
  farmingRecordId: '',
  plotId: '',
  trialId: '',
  batchId: '',
  activityDate: null, // Initialize as null, will be set to default value in onMounted
  activityType: '',
  inputName: '',
  quantity: null,
  unit: '',
  operatorId: '',
  operationDesc: '',
  // Audit related fields
  workflowStatus: '',
  auditStatus: '',
  auditBy: '',
  auditor: '',
  auditTime: '',
  auditRemark: ''
})

const rules = {
  plotId: [{ required: true, message: 'Please select Plot ID', trigger: 'change' }],
  activityDate: [{ required: true, message: 'Please select Activity Date', trigger: 'change' }],
  activityType: [{ required: true, message: 'Please select Activity Type', trigger: 'change' }],
  operatorId: [{ required: true, message: 'Please select Operator', trigger: 'change' }],
  auditRemark: [
    {
      required: true,
      message: 'Please enter audit remark',
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (isAuditMode.value && (!value || value.trim() === '')) {
          callback(new Error('Audit remark is required'))
        } else {
          callback()
        }
      }
    }
  ]
}

// Format date object to 'YYYY-MM-DD HH:mm:ss'
const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// Format current date to 'YYYY-MM-DD HH:mm:ss'
const formatNow = () => {
  return formatDate(new Date())
}

// Parse current user's available operator ID, prioritize farmerId, then userId/id
const resolveOperatorId = () => {
  const ui = getUserInfo() || {}
  const candidate = ui.farmerId ?? ui.userId ?? ui.id ?? ui?.user?.userId ?? ui?.user?.id
  return candidate != null && candidate !== '' ? String(candidate) : ''
}

const loadPlotOptions = async () => {
  try {
    const res = await getPlotOptions()
    plotOptions.value = res.data || []
  } catch (error) {
    console.error('Failed to load plot options:', error)
  }
}

const loadFarmerOptions = async () => {
  try {
    const res = await getFarmerOptions()
    farmerOptions.value = res.data || []

    // Ensure current user is in options so default value can be displayed correctly
    const opId = resolveOperatorId()
    if (opId) {
      const exists = farmerOptions.value.some((x) => String(x.farmerId) === String(opId))
      if (!exists) {
        const ui = getUserInfo() || {}
        const displayName = ui?.user?.name || ''
        farmerOptions.value.unshift({ farmerId: opId, farmerName: displayName || String(opId) })
      }
      // If it's new creation and not set yet, assign default value
      if (!isEdit.value && !formData.operatorId) {
        formData.operatorId = String(opId)
      }
    }
  } catch (error) {
    console.error('Failed to load farmer options:', error)
  }
}

const handlePlotChange = (plotId) => {
  // Auto-fill trialId and batchId from selected plot
  const selectedPlot = plotOptions.value.find(item => item.plotId === plotId)
  if (selectedPlot) {
    formData.trialId = selectedPlot.trialId || ''
    formData.batchId = selectedPlot.batchId || ''
  }
}

const getInfo = async () => {
  if (!isEdit.value) {
    // Ensure activityDate has default value in new creation mode
    formData.activityDate = formatNow()
    // Default operator to current user in new creation mode
    if (!formData.operatorId) {
      const opId = resolveOperatorId()
      if (opId) formData.operatorId = opId
    }
    return
  }
  loading.value = true
  try {
    const res = await getFarmingRecordInfo(route.params.farmingId)
    Object.assign(formData, res.data)

    // If it's audit mode, automatically fill in auditor and audit time
    if (isAuditMode.value) {
      if (userStore.userInfo && userStore.userInfo.user) {
        const user = userStore.userInfo.user
        formData.auditBy = user.name || user.REALNAME || user.USERNAME || user.username || user.NAME || user.userId || ''
      }
      formData.auditTime = formatNow()
    }
  } catch (error) {
    console.error('Failed to load farming record info:', error)
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

    // Automatically set operator ID to logged-in user
    if (!submitData.operatorId) {
      const userInfo = getUserInfo()
      if (userInfo && userInfo.userId) {
        submitData.operatorId = userInfo.userId
      }
    }

    if (isEdit.value) {
      await editFarmingRecord(submitData)
      ElMessage.success('Farming record updated successfully')
    } else {
      // Set initial audit status to S1: Pending Approval for new creation
      submitData.auditStatus = 'S1'
      await addFarmingRecord(submitData)
      ElMessage.success('Farming record added successfully')
    }
    goBack()
  } catch (error) {
    console.error('Submit failed:', error)
  } finally {
    submitLoading.value = false
  }
}

const handleApprove = async () => {
  // Validate audit opinion
  if (!formData.auditRemark || formData.auditRemark.trim() === '') {
    ElMessage.error('Audit remark is required')
    return
  }

  ElMessageBox.confirm('Are you sure you want to approve this farming record?', 'Confirm Audit', {
    type: 'success',
    confirmButtonText: 'Approve',
    cancelButtonText: 'Cancel'
  }).then(async () => {
    submitLoading.value = true
    try {
      const userInfo = getUserInfo()
      await auditFarmingRecord({
        farmingId: route.params.farmingId,
        workflowStatus: 'S2',
        auditRemark: formData.auditRemark,
      })
      ElMessage.success('Record approved')
      goBack()
    } catch (error) {
      console.error('Approve failed:', error)
      ElMessage.error('Failed to approve')
    } finally {
      submitLoading.value = false
    }
  }).catch(() => {})
}

const handleReject = async () => {
  // Validate audit opinion
  if (!formData.auditRemark || formData.auditRemark.trim() === '') {
    ElMessage.error('Audit remark is required')
    return
  }

  ElMessageBox.confirm('Are you sure you want to reject this farming record?', 'Confirm Audit', {
    type: 'warning',
    confirmButtonText: 'Reject',
    cancelButtonText: 'Cancel'
  }).then(async () => {
    submitLoading.value = true
    try {
      const userInfo = getUserInfo()
      await auditFarmingRecord({
        farmingId: route.params.farmingId,
        workflowStatus: 'S3',
        auditRemark: formData.auditRemark,
      })
      ElMessage.success('Record rejected')
      goBack()
    } catch (error) {
      console.error('Reject failed:', error)
      ElMessage.error('Failed to reject')
    } finally {
      submitLoading.value = false
    }
  }).catch(() => {})
}

const goBack = () => {
  router.push('/research/breeding-data/farming/farming-index')
}

onMounted(() => {
  loadPlotOptions()
  loadFarmerOptions()
  getInfo()

  // Ensure activityDate has default value in new creation mode
  if (!isEdit.value) {
    // Delay setting default value to ensure component is mounted
    nextTick(() => {
      if (!formData.activityDate) {
        formData.activityDate = formatNow()
      }
      // Fallback: if operator is not set, default to current user
      if (!formData.operatorId) {
        const opId = resolveOperatorId()
        if (opId) formData.operatorId = opId
      }
    })
  } else if (isAuditMode.value) {
    // Initialize auditor information in audit mode
    nextTick(() => {
      if (userStore.userInfo && userStore.userInfo.user) {
        const user = userStore.userInfo.user
        formData.auditBy = user.name || user.REALNAME || user.USERNAME || user.username || user.NAME || user.userId || ''
      }
      formData.auditTime = formatNow()
    })
  }
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
