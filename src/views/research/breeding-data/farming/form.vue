<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack"><i class="ri-arrow-left-line"></i></el-button>
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
                <!-- Plot ID -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Plot ID" prop="plotId">
                    <el-select
                      v-model="formData.plotId"
                      placeholder="Please select Plot ID"
                      filterable
                      style="width: 100%"
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
                    />
                  </el-form-item>
                </el-col>
                <!-- Activity Type -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Activity Type" prop="activityType">
                    <el-select v-model="formData.activityType" placeholder="Please select activity type" style="width: 100%">
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
                    <el-input v-model="formData.inputName" placeholder="Enter input name (e.g., fertilizer type, pesticide name)" />
                  </el-form-item>
                </el-col>
                <!-- Quantity -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Quantity">
                    <el-input-number v-model="formData.quantity" :min="0" :precision="2" style="width: 100%" placeholder="Enter quantity" />
                  </el-form-item>
                </el-col>
                <!-- Unit -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Unit">
                    <el-select v-model="formData.unit" placeholder="Please select unit" style="width: 100%">
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
                <!-- Operation Description -->
                <el-col :xs="24">
                  <el-form-item label="Operation Description">
                    <el-input
                      v-model="formData.operationDesc"
                      type="textarea"
                      :rows="3"
                      placeholder="Enter operation description"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- Audit Information (仅编辑模式显示) -->
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
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Auditor">
                    <el-input v-model="formData.auditBy" placeholder="Enter auditor name" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Audited Time">
                    <el-date-picker
                      v-model="formData.auditTime"
                      type="datetime"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      style="width: 100%"
                      placeholder="Select audited date and time"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitLoading">{{ $t('common.save') }}</el-button>
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
import { ElMessage } from 'element-plus'
import { getFarmingRecordInfo, addFarmingRecord, editFarmingRecord, getPlotOptions } from '@/api/breedingData'
import { getFarmerOptions } from '@/api/newFarm'
import { getUserInfo } from '@/utils/auth'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const submitLoading = ref(false)
const plotOptions = ref([])
const farmerOptions = ref([])
const isEdit = computed(() => !!route.params.farmingId)

const formData = reactive({
  farmingRecordId: '',
  plotId: '',
  trialId: '',
  batchId: '',
  activityDate: null, // 初始化为null，后续在onMounted中设置默认值
  activityType: '',
  inputName: '',
  quantity: null,
  unit: '',
  operatorId: '',
  operationDesc: ''
})

const rules = {
  plotId: [{ required: true, message: 'Please select Plot ID', trigger: 'change' }],
  activityDate: [{ required: true, message: 'Please select Activity Date', trigger: 'change' }],
  activityType: [{ required: true, message: 'Please select Activity Type', trigger: 'change' }],
  operatorId: [{ required: true, message: 'Please select Operator', trigger: 'change' }]
}


// 将日期对象格式化为 'YYYY-MM-DD HH:mm:ss'
const formatNow = () => {
  const pad = (n) => (n < 10 ? `0${n}` : `${n}`)
  const d = new Date()
  const Y = d.getFullYear()
  const M = pad(d.getMonth() + 1)
  const D = pad(d.getDate())
  const h = pad(d.getHours())
  const m = pad(d.getMinutes())
  const s = pad(d.getSeconds())
  return `${Y}-${M}-${D} ${h}:${m}:${s}`
}

// 解析当前用户的可用操作员ID，优先 farmerId，其次 userId/id
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

    // 确保当前用户在选项中，以便默认值能正确显示
    const opId = resolveOperatorId()
    if (opId) {
      const exists = farmerOptions.value.some((x) => String(x.farmerId) === String(opId))
      if (!exists) {
        const ui = getUserInfo() || {}
        const displayName = ui?.userName || ''
        farmerOptions.value.unshift({ farmerId: opId, farmerName: displayName || String(opId) })
      }
      // 若为新建且尚未设置，赋默认值
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
    // 新建模式下确保activityDate有默认值
    formData.activityDate = formatNow()
    // 新建模式下默认操作员为当前用户
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

    // 自动设置操作员ID为登录用户
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
      // 新建时设置初始审核状态为S1:待审批
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

const goBack = () => {
  router.push('/research/breeding-data/farming')
}

onMounted(() => {
  loadPlotOptions()
  loadFarmerOptions()
  getInfo()

  // 确保新建模式下activityDate有默认值
  if (!isEdit.value) {
    // 延迟设置默认值，确保组件已挂载
    nextTick(() => {
      if (!formData.activityDate) {
        formData.activityDate = formatNow()
      }
      // 兜底：若未设置操作员则默认当前用户
      if (!formData.operatorId) {
        const opId = resolveOperatorId()
        if (opId) formData.operatorId = opId
      }
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
