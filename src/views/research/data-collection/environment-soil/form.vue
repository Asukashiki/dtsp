<template>
  <div class="environment-soil-form-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <el-button link @click="goBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </div>
        <div class="header-center">
          <h1 class="page-title">
            {{ isEdit ? $t('research.dataCollection.environmentSoil.edit') : $t('research.dataCollection.environmentSoil.add') }}
          </h1>
        </div>
        <div class="header-right"></div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-width="labelWidth"
        :label-position="labelPosition"
      >
        <!-- 基础信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            基础信息
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                label="育种批次"
                prop="batchId"
              >
                <el-select
                  v-model="formData.batchId"
                  placeholder="请选择育种批次"
                  style="width: 100%"
                >
                  <el-option
                    v-for="batch in batchOptions"
                    :key="batch.batchId"
                    :label="batch.batchName"
                    :value="batch.batchId"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="试验"
                prop="trialId"
              >
                <el-input
                  v-model="formData.trialId"
                  placeholder="请输入试验ID"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="数据类型"
                prop="dataType"
              >
                <el-select
                  v-model="formData.dataType"
                  placeholder="请选择数据类型"
                  style="width: 100%"
                >
                  <el-option label="Temperature" value="temperature" />
                  <el-option label="Humidity" value="humidity" />
                  <el-option label="Rainfall" value="rainfall" />
                  <el-option label="Soil Moisture" value="soil.moisture" />
                  <el-option label="Light Intensity" value="light.intensity" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 土壤属性 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-contrast-drop-2-line"></i>
            {{ $t('research.dataCollection.environmentSoil.form.soilProperties') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.environmentSoil.form.soilPh')"
                prop="soilPh"
              >
                <el-input-number
                  v-model="formData.soilPh"
                  :min="0"
                  :max="14"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.environmentSoil.placeholder.soilPh')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.environmentSoil.form.soilEc')"
                prop="soilEc"
              >
                <el-input-number
                  v-model="formData.soilEc"
                  :min="0"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.environmentSoil.placeholder.soilEc')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.environmentSoil.form.soilNitrogenPercent')"
                prop="soilNitrogenPercent"
              >
                <el-input-number
                  v-model="formData.soilNitrogenPercent"
                  :min="0"
                  :max="100"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.environmentSoil.placeholder.soilNitrogenPercent')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.environmentSoil.form.soilPhosphorusPpm')"
                prop="soilPhosphorusPpm"
              >
                <el-input-number
                  v-model="formData.soilPhosphorusPpm"
                  :min="0"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.environmentSoil.placeholder.soilPhosphorusPpm')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.environmentSoil.form.soilPotassiumPpm')"
                prop="soilPotassiumPpm"
              >
                <el-input-number
                  v-model="formData.soilPotassiumPpm"
                  :min="0"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.environmentSoil.placeholder.soilPotassiumPpm')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.environmentSoil.form.soilMoisturePercent')"
                prop="soilMoisturePercent"
              >
                <el-input-number
                  v-model="formData.soilMoisturePercent"
                  :min="0"
                  :max="100"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.environmentSoil.placeholder.soilMoisturePercent')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.environmentSoil.form.soilTemperatureC')"
                prop="soilTemperatureC"
              >
                <el-input-number
                  v-model="formData.soilTemperatureC"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.environmentSoil.placeholder.soilTemperatureC')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 环境数据 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-cloud-line"></i>
            {{ $t('research.dataCollection.environmentSoil.form.environmentData') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.environmentSoil.form.airTemperatureC')"
                prop="airTemperatureC"
              >
                <el-input-number
                  v-model="formData.airTemperatureC"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.environmentSoil.placeholder.airTemperatureC')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.environmentSoil.form.humidityPercent')"
                prop="humidityPercent"
              >
                <el-input-number
                  v-model="formData.humidityPercent"
                  :min="0"
                  :max="100"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.environmentSoil.placeholder.humidityPercent')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.environmentSoil.form.windSpeedMs')"
                prop="windSpeedMs"
              >
                <el-input-number
                  v-model="formData.windSpeedMs"
                  :min="0"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.environmentSoil.placeholder.windSpeedMs')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.environmentSoil.form.solarRadiationWm2')"
                prop="solarRadiationWm2"
              >
                <el-input-number
                  v-model="formData.solarRadiationWm2"
                  :min="0"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.environmentSoil.placeholder.solarRadiationWm2')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.environmentSoil.form.rainfallMm')"
                prop="rainfallMm"
              >
                <el-input-number
                  v-model="formData.rainfallMm"
                  :min="0"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.environmentSoil.placeholder.rainfallMm')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 其他信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-map-line"></i>
            {{ $t('research.dataCollection.environmentSoil.form.otherInfo') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.environmentSoil.form.topography')"
                prop="topography"
              >
                <el-select
                  v-model="formData.topography"
                  :placeholder="$t('research.dataCollection.environmentSoil.placeholder.topography')"
                  style="width: 100%"
                >
                  <el-option
                    :label="$t('research.dataCollection.environmentSoil.topography.plain')"
                    value="plain"
                  />
                  <el-option
                    :label="$t('research.dataCollection.environmentSoil.topography.hill')"
                    value="hill"
                  />
                  <el-option
                    :label="$t('research.dataCollection.environmentSoil.topography.mountain')"
                    value="mountain"
                  />
                  <el-option
                    :label="$t('research.dataCollection.environmentSoil.topography.valley')"
                    value="valley"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.environmentSoil.form.waterSource')"
                prop="waterSource"
              >
                <el-input
                  v-model="formData.waterSource"
                  :placeholder="$t('research.dataCollection.environmentSoil.placeholder.waterSource')"
                  maxlength="100"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.environmentSoil.form.slopePercent')"
                prop="slopePercent"
              >
                <el-input-number
                  v-model="formData.slopePercent"
                  :min="0"
                  :max="100"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.environmentSoil.placeholder.slopePercent')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.environmentSoil.form.previousCrop')"
                prop="previousCrop"
              >
                <el-input
                  v-model="formData.previousCrop"
                  :placeholder="$t('research.dataCollection.environmentSoil.placeholder.previousCrop')"
                  maxlength="100"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">
            {{ $t('common.cancel') }}
          </el-button>
          <el-button
            type="primary"
            :loading="submitting"
            @click="handleSubmit"
          >
            {{ $t('common.submit') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getEnvironmentSoilDetail, addEnvironmentSoil, editEnvironmentSoil } from '@/api/breeding'
import { getBreedingBatchOptions } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// 响应式表单布局
const isMobile = ref(window.innerWidth <= 768)
const labelWidth = computed(() => isMobile.value ? '100%' : '200px')
const labelPosition = computed(() => isMobile.value ? 'top' : 'right')

// 监听窗口大小变化
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth <= 768
})

const formRef = ref()
const submitting = ref(false)
const batchOptions = ref([])

// 判断是否为编辑模式
const isEdit = computed(() => !!route.params.id)

// 表单数据
const formData = reactive({
  batchId: '',
  trialId: '',
  dataType: '',
  soilPh: null,
  soilEc: null,
  soilNitrogenPercent: null,
  soilPhosphorusPpm: null,
  soilPotassiumPpm: null,
  soilMoisturePercent: null,
  soilTemperatureC: null,
  airTemperatureC: null,
  humidityPercent: null,
  windSpeedMs: null,
  solarRadiationWm2: null,
  rainfallMm: null,
  topography: '',
  waterSource: '',
  slopePercent: null,
  previousCrop: ''
})

// 表单验证规则
const rules = computed(() => ({
  batchId: [
    { required: true, message: '请选择育种批次', trigger: 'change' }
  ],
  trialId: [
    { required: true, message: '请输入试验ID', trigger: 'blur' }
  ],
  dataType: [
    { required: true, message: '请选择数据类型', trigger: 'change' }
  ],
  soilPh: [
    { required: true, message: t('research.dataCollection.environmentSoil.rules.soilPhRequired'), trigger: 'blur' }
  ],
  soilEc: [
    { required: true, message: t('research.dataCollection.environmentSoil.rules.soilEcRequired'), trigger: 'blur' }
  ],
  soilNitrogenPercent: [
    { required: true, message: t('research.dataCollection.environmentSoil.rules.soilNitrogenPercentRequired'), trigger: 'blur' }
  ],
  soilPhosphorusPpm: [
    { required: true, message: t('research.dataCollection.environmentSoil.rules.soilPhosphorusPpmRequired'), trigger: 'blur' }
  ],
  soilPotassiumPpm: [
    { required: true, message: t('research.dataCollection.environmentSoil.rules.soilPotassiumPpmRequired'), trigger: 'blur' }
  ],
  soilMoisturePercent: [
    { required: true, message: t('research.dataCollection.environmentSoil.rules.soilMoisturePercentRequired'), trigger: 'blur' }
  ],
  soilTemperatureC: [
    { required: true, message: t('research.dataCollection.environmentSoil.rules.soilTemperatureCRequired'), trigger: 'blur' }
  ],
  humidityPercent: [
    { required: true, message: t('research.dataCollection.environmentSoil.rules.humidityPercentRequired'), trigger: 'blur' }
  ],
  windSpeedMs: [
    { required: true, message: t('research.dataCollection.environmentSoil.rules.windSpeedMsRequired'), trigger: 'blur' }
  ],
  solarRadiationWm2: [
    { required: true, message: t('research.dataCollection.environmentSoil.rules.solarRadiationWm2Required'), trigger: 'blur' }
  ],
  topography: [
    { required: true, message: t('research.dataCollection.environmentSoil.rules.topographyRequired'), trigger: 'change' }
  ],
  waterSource: [
    { required: true, message: t('research.dataCollection.environmentSoil.rules.waterSourceRequired'), trigger: 'blur' }
  ]
}))

// 加载育种批次选项
const loadBatchOptions = async () => {
  try {
    const res = await getBreedingBatchOptions()
    if (res.code === 200) {
      batchOptions.value = res.data || []
    }
  } catch (error) {
    console.error('Failed to load batch options:', error)
  }
}

// 加载详情数据
const loadDetail = async () => {
  try {
    const res = await getEnvironmentSoilDetail(route.params.id)
    if (res.code === 200 && res.data) {
      Object.assign(formData, res.data)
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate()

    submitting.value = true

    const submitData = { ...formData }

    let res
    if (isEdit.value) {
      submitData.dataId = route.params.id
      res = await editEnvironmentSoil(submitData)
      if (res.code === 200) {
        ElMessage.success(t('research.dataCollection.environmentSoil.editSuccess'))
        router.push('/research/data-collection/environment-soil')
      }
    } else {
      res = await addEnvironmentSoil(submitData)
      if (res.code === 200) {
        ElMessage.success(t('research.dataCollection.environmentSoil.addSuccess'))
        router.push('/research/data-collection/environment-soil')
      }
    }
  } catch (error) {
    console.error('Form validation failed or submit error:', error)
  } finally {
    submitting.value = false
  }
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  loadBatchOptions()
  if (isEdit.value) {
    loadDetail()
  }
})
</script>

<style scoped>
.environment-soil-form-container {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  margin: -24px -24px 24px -24px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left,
.header-right {
  flex: 1;
}

.header-center {
  flex: 2;
  text-align: center;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #1f2937;
}

/* 表单区域 */
.form-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 表单分节 */
.form-section {
  margin-bottom: 32px;
}

.form-section:last-of-type {
  margin-bottom: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 20px;
}

/* 操作按钮 */
.form-actions {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: center;
  gap: 16px;
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 16px;
  }

  .form-wrapper {
    padding: 24px 16px;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 12px;
  }

  .header-left .el-button {
    font-size: 14px;
  }

  .page-title {
    font-size: 16px;
  }

  .header-right {
    display: none;
  }

  .form-wrapper {
    padding: 16px 12px;
    border-radius: 0;
    box-shadow: none;
  }

  .form-section {
    margin-bottom: 24px;
  }

  .section-title {
    font-size: 15px;
    margin-bottom: 16px;
    padding-bottom: 10px;
  }

  .section-title i {
    font-size: 18px;
  }

  /* 单列布局 */
  :deep(.el-row) {
    display: block !important;
  }

  :deep(.el-col) {
    max-width: 100% !important;
    margin-bottom: 0 !important;
  }

  :deep(.el-form-item) {
    margin-bottom: 18px;
  }

  :deep(.el-form-item__label) {
    text-align: left !important;
    padding: 0 0 8px 0 !important;
    line-height: 1.4 !important;
    font-size: 14px;
  }

  :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }

  :deep(.el-input),
  :deep(.el-select),
  :deep(.el-input-number) {
    width: 100% !important;
  }

  .form-actions {
    margin-top: 24px;
    padding-top: 20px;
    flex-direction: column;
    gap: 12px;
  }

  .form-actions .el-button {
    width: 100%;
    margin: 0;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    margin: -8px -8px 8px -8px;
  }

  .header-content {
    padding: 10px 8px;
  }

  .page-title {
    font-size: 15px;
  }

  .form-wrapper {
    padding: 12px 8px;
  }

  .form-section {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }

  :deep(.el-form-item) {
    margin-bottom: 16px;
  }

  :deep(.el-form-item__label) {
    font-size: 13px;
  }
}
</style>
