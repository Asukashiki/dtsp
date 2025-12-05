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
                      type="date"
                      value-format="YYYY-MM-DD"
                      style="width: 100%"
                      placeholder="Select activity date"
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
                      <el-option label="kg" value="kg" />
                      <el-option label="g" value="g" />
                      <el-option label="L" value="L" />
                      <el-option label="mL" value="mL" />
                      <el-option label="bags" value="bags" />
                      <el-option label="pieces" value="pieces" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- Operator ID (read-only, current user) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Operator ID">
                    <el-input v-model="formData.operatorId" disabled placeholder="Current user ID" />
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
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
import { getFarmingRecordInfo, addFarmingRecord, editFarmingRecord, getPlotOptions } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const formRef = ref(null)
const loading = ref(false)
const submitLoading = ref(false)
const plotOptions = ref([])

const isEdit = computed(() => !!route.params.farmingId)

const formData = reactive({
  farmingRecordId: '',
  plotId: '',
  trialId: '',
  batchId: '',
  activityDate: new Date().toISOString().split('T')[0], // 默认当前日期
  activityType: '',
  inputName: '',
  quantity: null,
  unit: '',
  operatorId: userStore.userInfo?.user?.ID || '', // 当前登录用户ID
  operationDesc: ''
})

const rules = {
  plotId: [{ required: true, message: 'Please select Plot ID', trigger: 'change' }],
  activityDate: [{ required: true, message: 'Please select Activity Date', trigger: 'change' }],
  activityType: [{ required: true, message: 'Please select Activity Type', trigger: 'change' }]
}

const loadPlotOptions = async () => {
  try {
    const res = await getPlotOptions()
    plotOptions.value = res.data || []
  } catch (error) {
    console.error('Failed to load plot options:', error)
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
  if (!isEdit.value) return
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

    if (isEdit.value) {
      await editFarmingRecord(submitData)
      ElMessage.success('Farming record updated successfully')
    } else {
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
  // 确保在新增模式下设置操作员ID
  if (!isEdit.value) {
    const userId = userStore.userInfo?.user?.ID
    if (userId) {
      formData.operatorId = userId
    }
  }

  loadPlotOptions()
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
