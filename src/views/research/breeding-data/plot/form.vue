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
            <h1 class="page-title">{{ isEdit ? $t('research.breedingData.plot.edit') : $t('research.breedingData.plot.add') }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="160px" v-loading="loading">
          <!-- Plot Basic Information -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>Plot Basic Information</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <!-- Plot ID (auto-generated, read-only) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Plot ID">
                    <el-input v-model="formData.plotId" disabled placeholder="{trial_id}-P{replication_no}{row_no}{column_no}" />
                  </el-form-item>
                </el-col>
                <!-- Trial ID -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Trial ID" prop="trialId">
                    <el-select v-model="formData.trialId" placeholder="Please select Trial ID" filterable style="width: 100%" @change="handleTrialChange">
                      <el-option v-for="item in trialOptions" :key="item.trialId" :label="item.trialId" :value="item.trialId" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- Batch ID (read-only, auto-filled from Trial) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Batch ID">
                    <el-input v-model="formData.batchId" disabled placeholder="Auto-filled from Trial ID" />
                  </el-form-item>
                </el-col>
                <!-- Replication No -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Replication No" prop="replicationNo">
                    <el-input-number v-model="formData.replicationNo" :min="1" :max="99" style="width: 100%" placeholder="1-99" />
                  </el-form-item>
                </el-col>
                <!-- Row No -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Row No" prop="rowNo">
                    <el-input-number v-model="formData.rowNo" :min="1" :max="99" style="width: 100%" placeholder="1-99" />
                  </el-form-item>
                </el-col>
                <!-- Column No -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Column No" prop="columnNo">
                    <el-input-number v-model="formData.columnNo" :min="1" :max="99" style="width: 100%" placeholder="1-99" />
                  </el-form-item>
                </el-col>
                <!-- Variety Code (read-only, auto-filled from Trial) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Variety Code">
                    <el-input v-model="formData.varietyCode" disabled placeholder="Auto-filled from Trial ID" />
                  </el-form-item>
                </el-col>
                <!-- Plot Area (m²) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Plot Area (m²)">
                    <el-input-number v-model="formData.plotAreaM2" :min="0" :precision="2" style="width: 100%" placeholder="Area in square meters" />
                  </el-form-item>
                </el-col>
                <!-- GPS Latitude -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="GPS Latitude">
                    <el-input-number v-model="formData.gpsLat" :min="-90" :max="90" :precision="6" style="width: 100%" placeholder="Latitude" />
                  </el-form-item>
                </el-col>
                <!-- GPS Longitude -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="GPS Longitude">
                    <el-input-number v-model="formData.gpsLong" :min="-180" :max="180" :precision="6" style="width: 100%" placeholder="Longitude" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- Sowing Information -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-seedling-line"></i>
                <span>Sowing Information</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <!-- Seed Quantity (kg) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Seed Quantity (kg)">
                    <el-input-number v-model="formData.seedQuantity" :min="0" :precision="2" style="width: 100%" placeholder="Enter seed quantity in kg" />
                  </el-form-item>
                </el-col>
                <!-- Sowing Method -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Sowing Method">
                    <el-select v-model="formData.sowingMethod" placeholder="Select sowing method" style="width: 100%">
                      <el-option label="Direct Seeding" value="direct_seeding" />
                      <el-option label="Transplanting" value="transplanting" />
                      <el-option label="Broadcasting" value="broadcasting" />
                      <el-option label="Drilling" value="drilling" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- Sowing Time -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Sowing Time">
                    <el-date-picker v-model="formData.sowingTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" placeholder="Select sowing time" />
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
import { ElMessage } from 'element-plus'
import { getPlotInfo, addPlotInfo, editPlotInfo, getTrialOptions } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()

const formRef = ref(null)
const loading = ref(false)
const submitLoading = ref(false)
const trialOptions = ref([])

const isEdit = computed(() => !!route.params.plotId)

const formData = reactive({
  plotId: '',
  trialId: '',
  batchId: '',
  replicationNo: null,
  rowNo: null,
  columnNo: null,
  varietyCode: '',
  seedQuantity: null,
  sowingMethod: '',
  sowingTime: '',
  plotAreaM2: null,
  gpsLat: null,
  gpsLong: null
})

const rules = {
  trialId: [{ required: true, message: 'Please select Trial ID', trigger: 'change' }],
  replicationNo: [{ required: true, message: 'Please enter Replication No', trigger: 'blur' }],
  rowNo: [{ required: true, message: 'Please enter Row No', trigger: 'blur' }],
  columnNo: [{ required: true, message: 'Please enter Column No', trigger: 'blur' }]
}

const loadTrialOptions = async () => {
  try {
    const res = await getTrialOptions()
    trialOptions.value = (res.data || []).filter(item =>
      item.workflowStatus === "S2"
    )
  } catch (error) {
    console.error('Failed to load trial options:', error)
  }
}

const handleTrialChange = (trialId) => {
  // Auto-fill batchId and varietyCode from selected trial
  const selectedTrial = trialOptions.value.find(item => item.trialId === trialId)
  if (selectedTrial) {
    formData.batchId = selectedTrial.batchId || ''
    formData.varietyCode = selectedTrial.varietyCode || ''
  }
}

const getInfo = async () => {
  if (!isEdit.value) return
  loading.value = true
  try {
    const res = await getPlotInfo(route.params.plotId)
    Object.assign(formData, res.data)
  } catch (error) {
    console.error('Failed to load plot info:', error)
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
      await editPlotInfo(submitData)
      ElMessage.success('Plot updated successfully')
    } else {
      await addPlotInfo(submitData)
      ElMessage.success('Plot added successfully')
    }
    goBack()
  } catch (error) {
    console.error('Submit failed:', error)
  } finally {
    submitLoading.value = false
  }
}

const goBack = () => {
  router.push('/research/breeding-data/plot')
}

onMounted(() => {
  loadTrialOptions()
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
