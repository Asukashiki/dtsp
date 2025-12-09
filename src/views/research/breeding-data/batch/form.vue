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
            <h1 class="page-title">{{ isEdit ? $t('research.breedingData.batch.edit') : $t('research.breedingData.batch.add') }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" v-loading="loading">
          <!-- 批次基本信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.breedingData.batch.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.batchId')">
                    <el-input v-model="formData.batchId" disabled :placeholder="'BRD-{variety_code}-{year}-serial'" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.cropType')" prop="cropType">
                    <el-select v-model="formData.cropType" :placeholder="$t('research.breedingData.batch.placeholder.cropType')" style="width: 100%" @change="handleCropTypeChange">
                      <el-option v-for="item in cropTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.varietyName')" prop="varietyName">
                    <el-select v-model="formData.varietyName" :placeholder="$t('research.breedingData.batch.placeholder.varietyName')" style="width: 100%" @change="handleVarietyChange">
                      <el-option
                        v-for="item in varietyOptions"
                        :key="item.code"
                        :label="`${item.name} (${item.code})`"
                        :value="item.name"
                      >
                        <span>{{ item.name }} ({{ item.code }})</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.breedingMethod')" prop="breedingMethod">
                    <el-select v-model="formData.breedingMethod" :placeholder="$t('research.breedingData.batch.placeholder.breedingMethod')" style="width: 100%">
                      <el-option v-for="item in breedingMethodOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.batchName')" prop="batchName">
                    <el-input v-model="formData.batchName" :placeholder="$t('research.breedingData.batch.placeholder.batchName')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.year')" prop="year">
                    <el-date-picker v-model="formData.year" type="year" value-format="YYYY" style="width: 100%" :placeholder="$t('research.breedingData.batch.placeholder.year')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.status')" prop="status">
                    <el-input v-model="formData.status" disabled style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24">
                  <el-form-item :label="$t('research.breedingData.batch.form.remarks')">
                    <el-input v-model="formData.remarks" type="textarea" :rows="3" :placeholder="$t('research.breedingData.batch.placeholder.remarks')" />
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
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getBreedingBatchInfo, addBreedingBatch, editBreedingBatch } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const submitLoading = ref(false)

const isEdit = computed(() => !!route.params.dataId)

const formData = reactive({
  dataId: '',
  batchId: '',
  cropType: '',
  varietyCode: '',
  varietyName: '',
  breedingMethod: '',
  batchName: '',
  year: '',
  status: 'ongoing',
  remarks: ''
})

const rules = {
  cropType: [{ required: true, message: t('research.breedingData.batch.placeholder.cropType'), trigger: 'change' }],
  varietyCode: [{ required: true, message: t('research.breedingData.batch.placeholder.varietyCode'), trigger: 'blur' }],
  varietyName: [{ required: true, message: t('research.breedingData.batch.placeholder.varietyName'), trigger: 'blur' }],
  breedingMethod: [{ required: true, message: t('research.breedingData.batch.placeholder.breedingMethod'), trigger: 'change' }],
  batchName: [{ required: true, message: t('research.breedingData.batch.placeholder.batchName'), trigger: 'blur' }],
  year: [{ required: true, message: t('research.breedingData.batch.placeholder.year'), trigger: 'change' }],
  status: [{ required: true, message: t('research.breedingData.batch.placeholder.status'), trigger: 'change' }]
}

const cropTypeOptions = [
  { label: 'wheat', value: 'wheat' },
  { label: 'corn', value: 'corn' },
  { label: 'soybean', value: 'soybean' },
  { label: 'cotton', value: 'cotton' }
]

const cropVarietyData = {
  wheat: [
    { code: 'WH001', name: 'Winter Wheat A1' },
    { code: 'WH002', name: 'Spring Wheat B2' },
    { code: 'WH003', name: 'Durum Wheat C3' }
  ],
  corn: [
    { code: 'CN001', name: 'Sweet Corn X1' },
    { code: 'CN002', name: 'Field Corn Y2' },
    { code: 'CN003', name: 'Popcorn Z3' }
  ],
  soybean: [
    { code: 'SB001', name: 'Glycine Max P1' },
    { code: 'SB002', name: 'Roundup Ready Q2' },
    { code: 'SB003', name: 'Non-GMO R3' }
  ],
  cotton: [
    { code: 'CT001', name: 'Upland Cotton M1' },
    { code: 'CT002', name: 'Pima Cotton N2' },
    { code: 'CT003', name: 'Egyptian Cotton O3' }
  ]
}

const varietyOptions = ref([])

const breedingMethodOptions = [
  { label: 'hybridization', value: 'hybridization' },
  { label: 'mutagenesis', value: 'mutagenesis' },
  { label: 'molecular', value: 'molecular' },
  { label: 'selection', value: 'selection' },
  { label: 'wide_cross', value: 'wide_cross' }
]

const getInfo = async () => {
  if (!isEdit.value) {
    // 新增模式下设置默认状态为ongoing
    formData.status = 'ongoing'
    return
  }
  loading.value = true
  try {
    const res = await getBreedingBatchInfo(route.params.dataId)
    Object.assign(formData, res.data)
    if (formData.year) {
      formData.year = String(formData.year)
    }
    // 根据作物类型初始化品种选项
    if (formData.cropType && cropVarietyData[formData.cropType]) {
      varietyOptions.value = cropVarietyData[formData.cropType]
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
      await editBreedingBatch(submitData)
      ElMessage.success(t('research.breedingData.batch.editSuccess'))
    } else {
      await addBreedingBatch(submitData)
      ElMessage.success(t('research.breedingData.batch.addSuccess'))
    }
    goBack()
  } catch (error) {
    console.error('提交失败:', error)
  } finally {
    submitLoading.value = false
  }
}

const handleCropTypeChange = (value) => {
  // 清空品种选择
  formData.varietyCode = ''
  formData.varietyName = ''

  // 更新品种选项
  if (value && cropVarietyData[value]) {
    varietyOptions.value = cropVarietyData[value]
  } else {
    varietyOptions.value = []
  }
}

const handleVarietyChange = (value) => {
  // 根据选择的品种名称自动填充品种代码
  const selectedVariety = varietyOptions.value.find(item => item.name === value)
  if (selectedVariety) {
    formData.varietyCode = selectedVariety.code
  }
}

const goBack = () => {
  router.push('/research/breeding-data/batch')
}

onMounted(() => {
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
