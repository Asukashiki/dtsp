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
            <h1 class="page-title">{{ isEdit ? $t('research.breedingData.trial.edit') : $t('research.breedingData.trial.add') }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="160px" v-loading="loading">
          <!-- 试验基本信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.breedingData.trial.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <!-- 1. Trial ID -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.trialId')">
                    <el-input v-model="formData.trialId" disabled :placeholder="'TR-{variety_code}-{location_id}-{year}-serial'" />
                  </el-form-item>
                </el-col>
                <!-- 2. Trial Name -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.trialName')" prop="trialName">
                    <el-input v-model="formData.trialName" :placeholder="$t('research.breedingData.trial.placeholder.trialName')" />
                  </el-form-item>
                </el-col>
                <!-- 3. Breeding Batch -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.batchId')" prop="batchId">
                    <el-select
                      v-model="formData.batchId"
                      :placeholder="$t('research.breedingData.trial.placeholder.batchId')"
                      filterable
                      style="width: 100%"
                      @change="handleBatchChange"
                    >
                      <el-option
                        v-for="item in batchOptions"
                        :key="item.batchId"
                        :label="item.batchId"
                        :value="item.batchId"
                      >
                        <div style="display: flex; justify-content: space-between;">
                          <span>{{ item.batchId }}</span>
                          <el-tag :type="getStatusType(item.status)" size="small" effect="plain">
                            {{ item.status }}
                          </el-tag>
                        </div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 4. Crop Type -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.cropType')" prop="cropType">
                    <el-input v-model="formData.cropType" disabled :placeholder="$t('research.breedingData.trial.placeholder.cropType')" />
                  </el-form-item>
                </el-col>
                <!-- 5. Variety Name -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.varietyName')" prop="varietyName">
                    <el-input v-model="formData.varietyName" disabled :placeholder="$t('research.breedingData.trial.placeholder.varietyName')" />
                  </el-form-item>
                </el-col>
                <!-- 6. Location ID -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.locationId')" prop="locationId">
                    <el-input v-model="formData.locationId" :placeholder="$t('research.breedingData.trial.placeholder.locationId')" />
                  </el-form-item>
                </el-col>
                <!-- 7. Year -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.year')" prop="year">
                    <el-date-picker v-model="formData.year" type="year" value-format="YYYY" style="width: 100%" :placeholder="$t('research.breedingData.trial.placeholder.year')" />
                  </el-form-item>
                </el-col>
                <!-- 8. Season -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.season')" prop="season">
                    <el-select v-model="formData.season" :placeholder="$t('research.breedingData.trial.placeholder.season')" style="width: 100%">
                      <el-option v-for="item in seasonOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 9. GPS Location -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.gpsLocation')" prop="gpsLocation">
                    <el-input v-model="formData.gpsLocation" :placeholder="$t('research.breedingData.trial.placeholder.gpsLocation')">
                      <template #append>
                        <el-button @click="getCurrentLocation">
                          <i class="ri-map-pin-line"></i>
                        </el-button>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <!-- 10. Design Type -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.designType')" prop="designType">
                    <el-select v-model="formData.designType" :placeholder="$t('research.breedingData.trial.placeholder.designType')" style="width: 100%">
                      <el-option v-for="item in designTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 11. Replications -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.replications')" prop="replications">
                    <el-input-number v-model="formData.replications" :min="1" :max="10" :placeholder="$t('research.breedingData.trial.placeholder.replications')" style="width: 100%" />
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
import { getTrialBasicInfo, addTrialBasic, editTrialBasic, getBatchOptions } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const submitLoading = ref(false)
const batchOptions = ref([])

const isEdit = computed(() => !!route.params.trialId)

const formData = reactive({
  trialId: '',
  batchId: '',
  trialName: '',
  locationId: '',
  gpsLocation: '',
  season: '',
  year: '',
  designType: '',
  replications: 1,
  cropType: '',
  varietyName: ''
})

const rules = {
  batchId: [{ required: true, message: t('research.breedingData.trial.placeholder.batchId'), trigger: 'change' }],
  trialName: [{ required: true, message: t('research.breedingData.trial.placeholder.trialName'), trigger: 'blur' }],
  locationId: [{ required: true, message: t('research.breedingData.trial.placeholder.locationId'), trigger: 'blur' }],
  season: [{ required: true, message: t('research.breedingData.trial.placeholder.season'), trigger: 'change' }],
  year: [{ required: true, message: t('research.breedingData.trial.placeholder.year'), trigger: 'change' }],
  designType: [{ required: true, message: t('research.breedingData.trial.placeholder.designType'), trigger: 'change' }],
  replications: [{ required: true, message: t('research.breedingData.trial.placeholder.replications'), trigger: 'blur' }]
}

const seasonOptions = [
  { label: 'Spring', value: 'spring' },
  { label: 'Summer', value: 'summer' },
  { label: 'Autumn', value: 'autumn' },
  { label: 'Winter', value: 'winter' }
]

const designTypeOptions = [
  { label: 'RCBD', value: 'RCBD' },
  { label: 'CRD', value: 'CRD' },
  { label: 'Latin Square', value: 'Latin_Square' },
  { label: 'Split Plot', value: 'Split_Plot' },
  { label: 'Alpha Lattice', value: 'Alpha_Lattice' }
]

const loadBatchOptions = async () => {
  try {
    const res = await getBatchOptions()
    // 仅显示已批准和进行中的批次
    batchOptions.value = (res.data || []).filter(item =>
      item.status === 'approved' || item.status === 'ongoing'
    )
  } catch (error) {
    console.error('获取批次选项失败:', error)
  }
}

const getStatusType = (status) => {
  const statusMap = {
    'approved': 'success',
    'ongoing': 'warning'
  }
  return statusMap[status] || 'info'
}

const handleBatchChange = (batchId) => {
  // 根据选择的批次自动填充 cropType
  const selectedBatch = batchOptions.value.find(item => item.batchId === batchId)
  if (selectedBatch) {
    formData.cropType = selectedBatch.cropType || ''
    formData.varietyName = selectedBatch.varietyName || ''
  }
}

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      formData.gpsLocation = `${position.coords.latitude},${position.coords.longitude}`
    }, () => {
      ElMessage.warning(t('common.locationFailed'))
    })
  } else {
    ElMessage.warning(t('common.locationNotSupported'))
  }
}

const getInfo = async () => {
  if (!isEdit.value) return
  loading.value = true
  try {
    const res = await getTrialBasicInfo(route.params.trialId)
    Object.assign(formData, res.data)
    if (formData.year) {
      formData.year = String(formData.year)
    }
  } catch (error) {
    console.error('获取详情失败:', error)
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
      await editTrialBasic(submitData)
      ElMessage.success(t('research.breedingData.trial.editSuccess'))
    } else {
      await addTrialBasic(submitData)
      ElMessage.success(t('research.breedingData.trial.addSuccess'))
    }
    goBack()
  } catch (error) {
    console.error('提交失败:', error)
  } finally {
    submitLoading.value = false
  }
}

const goBack = () => {
  router.push('/research/breeding-data/trial')
}

onMounted(() => {
  loadBatchOptions()
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
