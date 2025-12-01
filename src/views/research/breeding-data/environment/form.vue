<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack"><i class="ri-arrow-left-line"></i></el-button>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('research.breedingData.environment.edit') : $t('research.breedingData.environment.add') }}</h1>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" v-loading="loading">
          <div class="info-card">
            <div class="card-header">
              <div class="card-title"><i class="ri-information-line"></i><span>{{ $t('research.breedingData.environment.form.basicInfo') }}</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.environment.form.batchId')" prop="batchId">
                    <el-select v-model="formData.batchId" :placeholder="$t('research.breedingData.environment.placeholder.batchId')" style="width: 100%" @change="handleBatchChange">
                      <el-option v-for="item in batchOptions" :key="item.batchId" :label="item.batchName" :value="item.batchId" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.environment.form.trialId')" prop="trialId">
                    <el-select v-model="formData.trialId" :placeholder="$t('research.breedingData.environment.placeholder.trialId')" style="width: 100%" @change="handleTrialChange">
                      <el-option v-for="item in trialOptions" :key="item.trialId" :label="item.trialName" :value="item.trialId" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.environment.form.groundId')" prop="groundId">
                    <el-select v-model="formData.groundId" :placeholder="$t('research.breedingData.environment.placeholder.groundId')" style="width: 100%">
                      <el-option v-for="item in plotOptions" :key="item.groundId" :label="item.trialFieldName" :value="item.groundId" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.environment.form.dataType')" prop="dataType">
                    <el-select v-model="formData.dataType" :placeholder="$t('research.breedingData.environment.placeholder.dataType')" style="width: 100%">
                      <el-option label="soil" value="soil" />
                      <el-option label="climate" value="climate" />
                      <el-option label="water" value="water" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.environment.form.collectTime')" prop="collectTime">
                    <el-date-picker v-model="formData.collectTime" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.environment.form.dataSource')">
                    <el-input v-model="formData.dataSource" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="info-card" v-if="formData.dataType === 'soil'">
            <div class="card-header">
              <div class="card-title"><i class="ri-landscape-line"></i><span>{{ $t('research.breedingData.environment.form.soilData') }}</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.environment.form.soilPh')">
                    <el-input-number v-model="formData.soilPh" :min="0" :max="14" :precision="2" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.environment.form.soilTemperature')">
                    <el-input-number v-model="formData.soilTemperature" :precision="2" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.environment.form.soilMoisture')">
                    <el-input-number v-model="formData.soilMoisture" :min="0" :max="100" :precision="2" style="width: 100%" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="info-card" v-if="formData.dataType === 'climate'">
            <div class="card-header">
              <div class="card-title"><i class="ri-temp-hot-line"></i><span>{{ $t('research.breedingData.environment.form.climateData') }}</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.environment.form.airTemperature')">
                    <el-input-number v-model="formData.airTemperature" :precision="2" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.environment.form.airHumidity')">
                    <el-input-number v-model="formData.airHumidity" :min="0" :max="100" :precision="2" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.environment.form.rainfall')">
                    <el-input-number v-model="formData.rainfall" :min="0" :precision="2" style="width: 100%" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="info-card" v-if="formData.dataType === 'water'">
            <div class="card-header">
              <div class="card-title"><i class="ri-drop-line"></i><span>{{ $t('research.breedingData.environment.form.waterData') }}</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.environment.form.waterPh')">
                    <el-input-number v-model="formData.waterPh" :min="0" :max="14" :precision="2" style="width: 100%" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

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
import { getEnvironmentDataInfo, addEnvironmentData, editEnvironmentData, getBatchOptions, getTrialOptions, getPlotOptions } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const submitLoading = ref(false)
const batchOptions = ref([])
const trialOptions = ref([])
const plotOptions = ref([])

const isEdit = computed(() => !!route.params.envId)

const formData = reactive({
  envId: '',
  batchId: '',
  trialId: '',
  groundId: '',
  dataType: '',
  collectTime: '',
  soilPh: null,
  soilTemperature: null,
  soilMoisture: null,
  airTemperature: null,
  airHumidity: null,
  rainfall: null,
  waterPh: null,
  dataSource: ''
})

const rules = {
  batchId: [{ required: true, message: t('research.breedingData.environment.placeholder.batchId'), trigger: 'change' }],
  trialId: [{ required: true, message: t('research.breedingData.environment.placeholder.trialId'), trigger: 'change' }],
  groundId: [{ required: true, message: t('research.breedingData.environment.placeholder.groundId'), trigger: 'change' }],
  dataType: [{ required: true, message: t('research.breedingData.environment.placeholder.dataType'), trigger: 'change' }],
  collectTime: [{ required: true, message: t('common.pleaseSelect'), trigger: 'change' }]
}

const loadBatchOptions = async () => {
  try {
    const res = await getBatchOptions()
    batchOptions.value = res.data || []
  } catch (error) {
    console.error('获取批次选项失败:', error)
  }
}

const loadTrialOptions = async (batchId) => {
  if (!batchId) {
    trialOptions.value = []
    return
  }
  try {
    const res = await getTrialOptions(batchId)
    trialOptions.value = res.data || []
  } catch (error) {
    console.error('获取试验选项失败:', error)
  }
}

const loadPlotOptions = async (trialId) => {
  if (!trialId) {
    plotOptions.value = []
    return
  }
  try {
    const res = await getPlotOptions(formData.batchId, trialId)
    plotOptions.value = res.data || []
  } catch (error) {
    console.error('获取地块选项失败:', error)
  }
}

const handleBatchChange = (value) => {
  formData.trialId = ''
  formData.groundId = ''
  loadTrialOptions(value)
}

const handleTrialChange = (value) => {
  formData.groundId = ''
  loadPlotOptions(value)
}

const getInfo = async () => {
  if (!isEdit.value) return
  loading.value = true
  try {
    const res = await getEnvironmentDataInfo(route.params.envId)
    Object.assign(formData, res.data)
    if (formData.batchId) {
      await loadTrialOptions(formData.batchId)
    }
    if (formData.trialId) {
      await loadPlotOptions(formData.trialId)
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
    if (isEdit.value) {
      await editEnvironmentData(formData)
      ElMessage.success(t('research.breedingData.environment.editSuccess'))
    } else {
      await addEnvironmentData(formData)
      ElMessage.success(t('research.breedingData.environment.addSuccess'))
    }
    goBack()
  } catch (error) {
    console.error('提交失败:', error)
  } finally {
    submitLoading.value = false
  }
}

const goBack = () => router.push('/research/breeding-data/environment')

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
