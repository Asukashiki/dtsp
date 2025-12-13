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
                    <el-input v-model="formData.trialId" disabled :placeholder="'T_{cropType}_{year}_000001'" />
                  </el-form-item>
                </el-col>
                <!-- 2. Trial Name -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.trialName')" prop="trialName">
                    <el-input v-model="formData.trialName" :placeholder="$t('research.breedingData.trial.placeholder.trialName')" />
                  </el-form-item>
                </el-col>
                <!-- 3. Batch Id -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Batch Id" prop="batchId">
                    <el-select
                      v-model="formData.batchId"
                      placeholder="Please select Batch Id"
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
                          <!-- <el-tag :type="getStatusType(item.status)" size="small" effect="plain">
                            {{ item.status }}
                          </el-tag> -->
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
                <!-- 5. Variety Code -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Variety Code">
                    <el-input v-model="formData.varietyCode" disabled placeholder="Auto-filled from Batch Id" />
                  </el-form-item>
                </el-col>
                <!-- 6. Variety Name -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.varietyName')" prop="varietyName">
                    <el-input v-model="formData.varietyName" disabled :placeholder="$t('research.breedingData.trial.placeholder.varietyName')" />
                  </el-form-item>
                </el-col>
                <!-- 7. Location ID -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.locationId')" prop="locationId">
                    <el-select
                      v-model="formData.locationId"
                      :placeholder="$t('research.breedingData.trial.placeholder.locationId')"
                      filterable
                      style="width: 100%"
                      @change="handleLocationChange"
                    >
                      <el-option
                        v-for="item in locationOptions"
                        :key="item.locationId"
                        :label="`${item.locationName} (${item.locationId})`"
                        :value="item.locationId"
                      >
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                          <span>{{ item.locationName }}</span>
                          <span style="color: #8492a6; font-size: 13px;">{{ item.region }} - {{ item.zone }}</span>
                        </div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 8. GPS Location (只读,自动填充) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.gpsLocation')" prop="gpsLocation">
                    <el-input
                      v-model="formData.gpsLocation"
                      disabled
                      :placeholder="$t('research.breedingData.trial.placeholder.gpsLocation')"
                    >
                      <template #prepend>
                        <i class="ri-map-pin-line"></i>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <!-- 9. Year -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.year')" prop="year">
                    <el-date-picker v-model="formData.year" type="year" value-format="YYYY" style="width: 100%" :placeholder="$t('research.breedingData.trial.placeholder.year')" />
                  </el-form-item>
                </el-col>
                <!-- 10. Season -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.season')" prop="season">
                    <el-select v-model="formData.season" :placeholder="$t('research.breedingData.trial.placeholder.season')" style="width: 100%">
                      <el-option v-for="item in seasonOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 11. Design Type -->
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.designType')" prop="designType">
                    <el-select v-model="formData.designType" :placeholder="$t('research.breedingData.trial.placeholder.designType')" style="width: 100%">
                      <el-option v-for="item in designTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 12. Replications -->
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
            <el-button type="primary" @click="handleSave" :loading="saveLoading">{{ $t('common.save') }}</el-button>
            <el-button v-if="canSubmit" type="success" @click="handleSubmitAudit" :loading="submitLoading">
              {{ $t('research.trialBasicAudit.action.submit') }}
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { getTrialBasicInfo, addTrialBasic, editTrialBasic, getBatchOptions, getLocationMasterOptions } from '@/api/breedingData'
import { submitTrial } from '@/api/research/trialBasicAudit'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const saveLoading = ref(false)
const submitLoading = ref(false)
const batchOptions = ref([])
const locationOptions = ref([])

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
  varietyCode: '',
  varietyName: '',
  trialStatus: 'S0' // 默认草稿状态
})

// 判断是否可以提交审核 (草稿状态 S0 或 已退回状态 S3)
const canSubmit = computed(() => {
  const status = formData.trialStatus || 'S0'
  return status === 'S0' || status === 'S3'
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
      item.status === "S2"
    )
  } catch (error) {
    console.error('获取批次选项失败:', error)
  }
}

const loadLocationOptions = async () => {
  try {
    const res = await getLocationMasterOptions()
    locationOptions.value = res.data || []
  } catch (error) {
    console.error('获取研究中心选项失败:', error)
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
  // 根据选择的批次自动填充 cropType, varietyCode, varietyName
  const selectedBatch = batchOptions.value.find(item => item.batchId === batchId)
  if (selectedBatch) {
    formData.cropType = selectedBatch.cropType || ''
    formData.varietyCode = selectedBatch.varietyCode || ''
    formData.varietyName = selectedBatch.varietyName || ''
  }
  // 批次变更时重新生成试验ID
  generateTrialId()
}

const handleLocationChange = (locationId) => {
  // 根据选择的研究中心自动填充 GPS Location
  const selectedLocation = locationOptions.value.find(item => item.locationId === locationId)
  if (selectedLocation) {
    // 组合经纬度为GPS Location格式
    if (selectedLocation.latitude && selectedLocation.longitude) {
      formData.gpsLocation = `${selectedLocation.latitude},${selectedLocation.longitude}`
    } else {
      formData.gpsLocation = ''
    }
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

// 保存草稿
const handleSave = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  saveLoading.value = true
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
    console.error('保存失败:', error)
  } finally {
    saveLoading.value = false
  }
}

// 提交审核
const handleSubmitAudit = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  ElMessageBox.confirm(
    t('research.trialBasicAudit.action.submitConfirm'),
    t('common.warning'),
    {
      type: 'warning',
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel')
    }
  ).then(async () => {
    submitLoading.value = true
    try {
      console.log(formData,'formData')
      const submitData = { ...formData }
      if (submitData.year) {
        submitData.year = parseInt(submitData.year)
      }

      // 先保存数据
      let trialId = formData.trialId
      if (isEdit.value) {
        await editTrialBasic(submitData)
      } else {
        const res = await addTrialBasic(submitData)
        trialId = res.data // 后端返回的trialId直接在data字段中
        formData.trialId = trialId
      }

      // 再提交审核
      await submitTrial(trialId)
      ElMessage.success(t('research.trialBasicAudit.action.submitSuccess'))
      goBack()
    } catch (error) {
      console.error('提交审核失败:', error)
    } finally {
      submitLoading.value = false
    }
  }).catch(() => {})
}

// 生成 trialId: T_${cropType}_${year}_serial(6位)
const generateTrialId = () => {
  // 编辑模式下不自动生成
  if (isEdit.value) return

  const { cropType, year } = formData

  if (!cropType || !year) {
    formData.trialId = ''
    return
  }

  // 生成6位流水号（这里暂时使用随机数，实际应该从后端获取最新的流水号）
  const serial = String(Math.floor(Math.random() * 1000000)).padStart(6, '0')
  formData.trialId = `T_${cropType}_${year}_${serial}`

  console.log(formData.trialId,'formData.trialId')
}

const goBack = () => {
  router.push('/research/breeding-data/trial')
}

// 监听年份变化，自动生成试验ID
watch(() => formData.year, () => {
  generateTrialId()
})

onMounted(() => {
  loadBatchOptions()
  loadLocationOptions()
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
