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
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" v-loading="loading">
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
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.batchId')" prop="batchId">
                    <el-select v-model="formData.batchId" :placeholder="$t('research.breedingData.trial.placeholder.batchId')" style="width: 100%" @change="handleBatchChange">
                      <el-option v-for="item in batchOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.trialName')" prop="trialName">
                    <el-input v-model="formData.trialName" :placeholder="$t('research.breedingData.trial.placeholder.trialName')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.cropType')" prop="cropType">
                    <el-select v-model="formData.cropType" :placeholder="$t('research.breedingData.trial.placeholder.cropType')" style="width: 100%">
                      <el-option v-for="item in cropTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.varietyName')" prop="varietyName">
                    <el-input v-model="formData.varietyName" :placeholder="$t('research.breedingData.trial.placeholder.varietyName')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.startDate')" prop="startDate">
                    <el-date-picker v-model="formData.startDate" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.season')" prop="season">
                    <el-select v-model="formData.season" :placeholder="$t('research.breedingData.trial.placeholder.season')" style="width: 100%">
                      <el-option v-for="item in seasonOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 组织信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-building-line"></i>
                <span>{{ $t('research.breedingData.trial.form.organizationInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.researchCenterId')" prop="researchCenterId">
                    <el-input v-model="formData.researchCenterId" :placeholder="$t('research.breedingData.trial.placeholder.researchCenterId')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.projectId')" prop="projectId">
                    <el-input v-model="formData.projectId" :placeholder="$t('research.breedingData.trial.placeholder.projectId')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.subProjectId')" prop="subProjectId">
                    <el-input v-model="formData.subProjectId" :placeholder="$t('research.breedingData.trial.placeholder.subProjectId')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.themeFieldId')" prop="themeFieldId">
                    <el-input v-model="formData.themeFieldId" :placeholder="$t('research.breedingData.trial.placeholder.themeFieldId')" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 位置信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-map-pin-line"></i>
                <span>{{ $t('research.breedingData.trial.form.locationInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.region')" prop="region">
                    <el-input v-model="formData.region" :placeholder="$t('research.breedingData.trial.placeholder.region')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.zone')" prop="zone">
                    <el-input v-model="formData.zone" :placeholder="$t('research.breedingData.trial.placeholder.zone')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.woreda')" prop="woreda">
                    <el-input v-model="formData.woreda" :placeholder="$t('research.breedingData.trial.placeholder.woreda')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.kebele')" prop="kebele">
                    <el-input v-model="formData.kebele" :placeholder="$t('research.breedingData.trial.placeholder.kebele')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.agriculturalEcoZone')">
                    <el-input v-model="formData.agriculturalEcoZone" :placeholder="$t('research.breedingData.trial.placeholder.agriculturalEcoZone')" />
                  </el-form-item>
                </el-col>
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
              </el-row>
            </div>
          </div>

          <!-- 代码信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-code-line"></i>
                <span>{{ $t('research.breedingData.trial.form.codeInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.activityCode')">
                    <el-input v-model="formData.activityCode" :placeholder="$t('research.breedingData.trial.placeholder.activityCode')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trial.form.kpiCode')">
                    <el-input v-model="formData.kpiCode" :placeholder="$t('research.breedingData.trial.placeholder.kpiCode')" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 关联地块 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-map-2-line"></i>
                <span>{{ $t('research.breedingData.trial.form.plotSelection') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24">
                  <el-form-item :label="$t('research.breedingData.trial.form.plotIds')">
                    <el-select v-model="formData.plotIds" multiple :placeholder="$t('research.breedingData.trial.placeholder.plotIds')" style="width: 100%">
                      <el-option v-for="item in plotOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
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
import { getTrialBasicInfo, addTrialBasic, editTrialBasic, getBatchOptions, getPlotOptions } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const submitLoading = ref(false)
const batchOptions = ref([])
const plotOptions = ref([])

const isEdit = computed(() => !!route.params.trialId)

const formData = reactive({
  trialId: '',
  trialName: '',
  batchId: '',
  cropType: '',
  varietyName: '',
  researchCenterId: '',
  projectId: '',
  subProjectId: '',
  themeFieldId: '',
  region: '',
  zone: '',
  woreda: '',
  kebele: '',
  agriculturalEcoZone: '',
  gpsLocation: '',
  startDate: '',
  activityCode: '',
  kpiCode: '',
  season: '',
  plotIds: []
})

const rules = {
  batchId: [{ required: true, message: t('research.breedingData.trial.placeholder.batchId'), trigger: 'change' }],
  trialName: [{ required: true, message: t('research.breedingData.trial.placeholder.trialName'), trigger: 'blur' }],
  cropType: [{ required: true, message: t('research.breedingData.trial.placeholder.cropType'), trigger: 'change' }],
  varietyName: [{ required: true, message: t('research.breedingData.trial.placeholder.varietyName'), trigger: 'blur' }],
  researchCenterId: [{ required: true, message: t('research.breedingData.trial.placeholder.researchCenterId'), trigger: 'blur' }],
  projectId: [{ required: true, message: t('research.breedingData.trial.placeholder.projectId'), trigger: 'blur' }],
  subProjectId: [{ required: true, message: t('research.breedingData.trial.placeholder.subProjectId'), trigger: 'blur' }],
  themeFieldId: [{ required: true, message: t('research.breedingData.trial.placeholder.themeFieldId'), trigger: 'blur' }],
  region: [{ required: true, message: t('research.breedingData.trial.placeholder.region'), trigger: 'blur' }],
  zone: [{ required: true, message: t('research.breedingData.trial.placeholder.zone'), trigger: 'blur' }],
  woreda: [{ required: true, message: t('research.breedingData.trial.placeholder.woreda'), trigger: 'blur' }],
  kebele: [{ required: true, message: t('research.breedingData.trial.placeholder.kebele'), trigger: 'blur' }],
  gpsLocation: [{ required: true, message: t('research.breedingData.trial.placeholder.gpsLocation'), trigger: 'blur' }],
  startDate: [{ required: true, message: t('common.pleaseSelect'), trigger: 'change' }],
  season: [{ required: true, message: t('research.breedingData.trial.placeholder.season'), trigger: 'change' }]
}

const cropTypeOptions = [
  { label: '水稻', value: 'rice' },
  { label: '小麦', value: 'wheat' },
  { label: '玉米', value: 'corn' },
  { label: '大豆', value: 'soybean' },
  { label: '棉花', value: 'cotton' }
]

const seasonOptions = [
  { label: '春季', value: 'spring' },
  { label: '夏季', value: 'summer' },
  { label: '秋季', value: 'autumn' },
  { label: '冬季', value: 'winter' }
]

const loadBatchOptions = async () => {
  try {
    const res = await getBatchOptions()
    batchOptions.value = res.data || []
  } catch (error) {
    console.error('获取批次选项失败:', error)
  }
}

const loadPlotOptions = async (batchId) => {
  if (!batchId) {
    plotOptions.value = []
    return
  }
  try {
    const res = await getPlotOptions(batchId)
    plotOptions.value = res.data || []
  } catch (error) {
    console.error('获取地块选项失败:', error)
  }
}

const handleBatchChange = (value) => {
  formData.plotIds = []
  loadPlotOptions(value)
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
    if (formData.batchId) {
      await loadPlotOptions(formData.batchId)
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
      await editTrialBasic(formData)
      ElMessage.success(t('research.breedingData.trial.editSuccess'))
    } else {
      await addTrialBasic(formData)
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
@import '@/assets/styles/page-common.scss';

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 24px 0;
}
</style>
