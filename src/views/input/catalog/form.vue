<template>
  <div class="input-form-container">
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
            {{ isEdit ? $t('input.catalog.edit') : $t('input.catalog.add') }}
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
        <!-- 基本信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('input.catalog.form.basicInfo') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('input.catalog.form.inputName')"
                prop="input_name"
              >
                <el-input
                  v-model="formData.input_name"
                  :placeholder="$t('input.catalog.placeholder.inputName')"
                  maxlength="100"
                  show-word-limit
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('input.catalog.form.inputType')"
                prop="type"
              >
                <el-select
                  v-model="formData.type"
                  :placeholder="$t('input.catalog.placeholder.inputType')"
                  style="width: 100%"
                  @change="handleTypeChange"
                >
                  <el-option
                    :label="$t('input.catalog.type.pesticide')"
                    value="pesticide"
                  />
                  <el-option
                    :label="$t('input.catalog.type.fertilizer')"
                    value="fertilizer"
                  />
                  <el-option
                    :label="$t('input.catalog.type.seed')"
                    value="seed"
                  />
                  <el-option
                    :label="$t('input.catalog.type.other')"
                    value="other"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('input.catalog.form.agriculturalInputType')"
                prop="agricultural_input_type"
              >
                <el-input
                  v-model="formData.agricultural_input_type"
                  :placeholder="$t('input.catalog.placeholder.agriculturalInputType')"
                  maxlength="100"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('input.catalog.form.variety')"
                prop="variety"
              >
                <el-input
                  v-model="formData.variety"
                  :placeholder="$t('input.catalog.placeholder.variety')"
                  maxlength="100"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('input.catalog.form.inputSku')"
                prop="input_sku"
              >
                <el-input
                  v-model="formData.input_sku"
                  :placeholder="$t('input.catalog.placeholder.inputSku')"
                  readonly
                  maxlength="50"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="批次号"
                prop="batch_id"
              >
                <el-input
                  v-model="formData.batch_no"
                  placeholder="批次号将自动生成"
                  readonly
                  maxlength="50"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('input.catalog.form.trademark')"
                prop="trademark"
              >
                <el-input
                  v-model="formData.trademark"
                  :placeholder="$t('input.catalog.placeholder.trademark')"
                  maxlength="100"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="过期日期"
                prop="expiry_date"
              >
                <el-date-picker
                  v-model="formData.expiry_date"
                  type="date"
                  placeholder="请选择过期日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('input.catalog.form.status')"
                prop="status"
              >
                <el-radio-group v-model="formData.status">
                  <el-radio value="active">{{ $t('input.catalog.statusOptions.active') }}</el-radio>
                  <el-radio value="inactive">{{ $t('input.catalog.statusOptions.inactive') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 法规与许可信息 -->
<!--        <div class="form-section">
          <div class="section-title">
            <i class="ri-shield-check-line"></i>
            {{ $t('input.catalog.form.regulatoryInfo') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('input.catalog.form.registerCode')"
                prop="register_code"
              >
                <el-input
                  v-model="formData.register_code"
                  :placeholder="$t('input.catalog.placeholder.registerCode')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('input.catalog.form.productionLicense')"
                prop="production_license"
              >
                <el-input
                  v-model="formData.production_license"
                  :placeholder="$t('input.catalog.placeholder.productionLicense')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('input.catalog.form.productionStandard')"
                prop="production_standard"
              >
                <el-input
                  v-model="formData.production_standard"
                  :placeholder="$t('input.catalog.placeholder.productionStandard')"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>-->

        <!-- 生产与责任信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-building-line"></i>
            {{ $t('input.catalog.form.productionInfo') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('input.catalog.form.producerName')"
                prop="producer_name"
              >
                <el-input
                  v-model="formData.producer_name"
                  :placeholder="$t('input.catalog.placeholder.producerName')"
                  maxlength="200"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('input.catalog.form.producerAddress')"
                prop="producer_address"
              >
                <el-input
                  v-model="formData.producer_address"
                  :placeholder="$t('input.catalog.placeholder.producerAddress')"
                  maxlength="255"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 农药特性信息 -->
        <div v-if="formData.type === 'pesticide'" class="form-section">
          <div class="section-title">
            <i class="ri-flask-line"></i>
            {{ $t('input.catalog.pesticide.title') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.pesticide.totalIngredientContent')">
                <el-input v-model="formData.pesticide_properties.total_ingredient_content" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.pesticide.toxicityLevel')">
                <el-select
                  v-model="formData.pesticide_properties.toxicity_level"
                  style="width: 100%"
                >
                  <el-option :label="$t('input.catalog.pesticide.toxicity.micro')" value="micro" />
                  <el-option :label="$t('input.catalog.pesticide.toxicity.low')" value="low" />
                  <el-option :label="$t('input.catalog.pesticide.toxicity.medium')" value="medium" />
                  <el-option :label="$t('input.catalog.pesticide.toxicity.high')" value="high" />
                  <el-option :label="$t('input.catalog.pesticide.toxicity.severe')" value="severe" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.pesticide.targetCrops')">
                <el-input v-model="formData.pesticide_properties.target_crops" type="textarea" :rows="2" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.pesticide.controlTargets')">
                <el-input v-model="formData.pesticide_properties.control_targets" type="textarea" :rows="2" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.pesticide.applicationMethod')">
                <el-input v-model="formData.pesticide_properties.application_method" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.pesticide.dosage')">
                <el-input v-model="formData.pesticide_properties.dosage" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.pesticide.dilutionRatio')">
                <el-input v-model="formData.pesticide_properties.dilution_ratio" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.pesticide.safetyInterval')">
                <el-input-number
                  v-model="formData.pesticide_properties.safety_interval"
                  :min="0"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item :label="$t('input.catalog.pesticide.precautions')">
                <el-input v-model="formData.pesticide_properties.precautions" type="textarea" :rows="3" />
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item :label="$t('input.catalog.pesticide.firstAid')">
                <el-input v-model="formData.pesticide_properties.first_aid" type="textarea" :rows="3" />
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item :label="$t('input.catalog.pesticide.storageRequirements')">
                <el-input v-model="formData.pesticide_properties.storage_requirements" type="textarea" :rows="2" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 化肥特性信息 -->
        <div v-if="formData.type === 'fertilizer'" class="form-section">
          <div class="section-title">
            <i class="ri-plant-line"></i>
            {{ $t('input.catalog.fertilizer.title') }}
          </div>

          <el-row :gutter="24">
<!--            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.fertilizer.fertilizerType')">
                <el-input v-model="formData.fertilizer_properties.fertilizer_type" />
              </el-form-item>
            </el-col>-->

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.fertilizer.totalNutrientContent')">
                <el-input v-model="formData.fertilizer_properties.total_nutrient_content" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('input.catalog.fertilizer.nitrogenContent')">
                <el-input v-model="formData.fertilizer_properties.nitrogen_content" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('input.catalog.fertilizer.phosphorusContent')">
                <el-input v-model="formData.fertilizer_properties.phosphorus_content" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('input.catalog.fertilizer.potassiumContent')">
                <el-input v-model="formData.fertilizer_properties.potassium_content" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.fertilizer.organicMatterContent')">
                <el-input v-model="formData.fertilizer_properties.organic_matter_content" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.fertilizer.phValue')">
                <el-input v-model="formData.fertilizer_properties.ph_value" />
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item :label="$t('input.catalog.fertilizer.mediumTraceElements')">
                <el-input v-model="formData.fertilizer_properties.medium_trace_elements" type="textarea" :rows="2" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.fertilizer.suitableCrops')">
                <el-input v-model="formData.fertilizer_properties.suitable_crops" type="textarea" :rows="2" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.fertilizer.applicationPeriod')">
                <el-input v-model="formData.fertilizer_properties.application_period" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.fertilizer.applicationMethod')">
                <el-input v-model="formData.fertilizer_properties.application_method" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.fertilizer.recommendedDosage')">
                <el-input v-model="formData.fertilizer_properties.recommended_dosage" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 种子特性信息 -->
        <div v-if="formData.type === 'seed'" class="form-section">
          <div class="section-title">
            <i class="ri-seedling-line"></i>
            {{ $t('input.catalog.seed.title') }}
          </div>

          <el-row :gutter="24">
<!--            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.seed.cropType')">
                <el-input v-model="formData.seed_properties.crop_type" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.seed.varietyName')">
                <el-input v-model="formData.seed_properties.variety_name" />
              </el-form-item>
            </el-col>-->

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.seed.varietyApprovalCode')">
                <el-input v-model="formData.seed_properties.variety_approval_code" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.seed.varietySource')">
                <el-input v-model="formData.seed_properties.variety_source" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.seed.purity')">
                <el-input-number
                  v-model="formData.seed_properties.purity"
                  :min="0"
                  :max="100"
                  :precision="2"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.seed.cleanliness')">
                <el-input-number
                  v-model="formData.seed_properties.cleanliness"
                  :min="0"
                  :max="100"
                  :precision="2"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.seed.germinationRate')">
                <el-input-number
                  v-model="formData.seed_properties.germination_rate"
                  :min="0"
                  :max="100"
                  :precision="2"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('input.catalog.seed.moistureContent')">
                <el-input-number
                  v-model="formData.seed_properties.moisture_content"
                  :min="0"
                  :max="100"
                  :precision="2"
                  style="width: 100%"
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
import { getInputDetail, addInput, updateInput } from '@/api/input'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// 响应式表单布局
const isMobile = ref(window.innerWidth <= 768)
const labelWidth = computed(() => isMobile.value ? '100%' : '180px')
const labelPosition = computed(() => isMobile.value ? 'top' : 'right')

// 监听窗口大小变化
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth <= 768
})

const formRef = ref()
const submitting = ref(false)

// 判断是否为编辑模式
const isEdit = computed(() => !!route.params.id)

// 表单数据
const formData = reactive({
  input_name: '',
  type: '',
  agricultural_input_type: '',
  variety: '',
  input_sku: '',
  batch_id: '',
  expiry_date: '',
  trademark: '',
  register_code: '1',
  production_license: '1',
  production_standard: '1',
  producer_name: '',
  producer_address: '',
  status: 'active',
  pesticide_properties: {
    total_ingredient_content: '',
    toxicity_level: '',
    target_crops: '',
    control_targets: '',
    application_method: '',
    dosage: '',
    dilution_ratio: '',
    safety_interval: 0,
    precautions: '',
    first_aid: '',
    storage_requirements: ''
  },
  fertilizer_properties: {
    fertilizer_type: '',
    total_nutrient_content: '',
    nitrogen_content: '',
    phosphorus_content: '',
    potassium_content: '',
    organic_matter_content: '',
    medium_trace_elements: '',
    ph_value: '',
    suitable_crops: '',
    application_period: '',
    application_method: '',
    recommended_dosage: ''
  },
  seed_properties: {
    crop_type: '',
    variety_name: '',
    variety_approval_code: '',
    variety_source: '',
    purity: 0,
    cleanliness: 0,
    germination_rate: 0,
    moisture_content: 0
  }
})

// 表单验证规则
const rules = computed(() => ({
  input_name: [
    { required: true, message: t('input.catalog.rules.inputNameRequired'), trigger: 'blur' },
    { min: 2, max: 100, message: t('input.catalog.rules.inputNameLength'), trigger: 'blur' }
  ],
  type: [
    { required: true, message: t('input.catalog.rules.inputTypeRequired'), trigger: 'change' }
  ],
  agricultural_input_type: [
    { max: 100, message: t('input.catalog.rules.agriculturalInputTypeLength'), trigger: 'blur' }
  ],
  variety: [
    { max: 100, message: t('input.catalog.rules.varietyLength'), trigger: 'blur' }
  ],
  input_sku: [
    { required: true, message: t('input.catalog.rules.inputSkuRequired'), trigger: 'blur' },
    { min: 8, max: 50, message: t('input.catalog.rules.inputSkuLength'), trigger: 'blur' }
  ],
  trademark: [
    { required: true, message: t('input.catalog.rules.trademarkRequired'), trigger: 'blur' }
  ],
  register_code: [
    { required: true, message: t('input.catalog.rules.registerCodeRequired'), trigger: 'blur' }
  ],
  production_license: [
    { required: true, message: t('input.catalog.rules.productionLicenseRequired'), trigger: 'blur' }
  ],
  production_standard: [
    { required: true, message: t('input.catalog.rules.productionStandardRequired'), trigger: 'blur' }
  ],
  producer_name: [
    { min: 2, max: 200, message: t('input.catalog.rules.producerNameLength'), trigger: 'blur' }
  ],
  producer_address: [
    { min: 5, max: 255, message: t('input.catalog.rules.producerAddressLength'), trigger: 'blur' }
  ]
}))

// 生成SKU编码
const generateSku = () => {
  // 生成格式: ZZ-XM-XXXXXX (6位随机数字)
  const randomNumber = Math.floor(100000 + Math.random() * 900000)
  return `ZZ-XM-${randomNumber}`
}

// 类型变化处理
const handleTypeChange = () => {
  // 类型变化时可以重置特性字段
  console.log('Type changed to:', formData.type)
}

// 加载详情数据
const loadDetail = async () => {
  try {
    const res = await getInputDetail(route.params.id)
    if (res.code === 200) {
      Object.assign(formData, res.data)
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.failed'))
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate()

    submitting.value = true

    const submitData = { ...formData }

    // 根据类型只保留对应的特性数据
    if (formData.type === 'pesticide') {
      delete submitData.fertilizer_properties
      delete submitData.seed_properties
    } else if (formData.type === 'fertilizer') {
      delete submitData.pesticide_properties
      delete submitData.seed_properties
    } else if (formData.type === 'seed') {
      delete submitData.pesticide_properties
      delete submitData.fertilizer_properties
    } else {
      delete submitData.pesticide_properties
      delete submitData.fertilizer_properties
      delete submitData.seed_properties
    }

    let res
    if (isEdit.value) {
      res = await updateInput(route.params.id, submitData)
      if (res.code === 200) {
        ElMessage.success(t('input.catalog.editSuccess'))
        router.push('/input/catalog')
      }
    } else {
      res = await addInput(submitData)
      if (res.code === 200) {
        ElMessage.success(t('input.catalog.addSuccess'))
        router.push('/input/catalog')
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
  if (isEdit.value) {
    loadDetail()
  } else {
    // 新增模式下自动生成SKU
    formData.input_sku = generateSku()
    formData.register_code = generateSku()
  }
})
</script>

<style scoped>
.input-form-container {
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
  :deep(.el-textarea),
  :deep(.el-input-number) {
    width: 100% !important;
  }

  :deep(.el-radio-group) {
    display: flex;
    flex-direction: column;
    gap: 8px;
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
