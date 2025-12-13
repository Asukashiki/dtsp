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
                  <el-form-item :label="$t('research.breedingData.batch.form.batchName')" prop="batchName">
                    <el-input v-model="formData.batchName" :placeholder="$t('research.breedingData.batch.placeholder.batchName')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.batchId')">
                    <el-input v-model="formData.batchId" disabled :placeholder="'B_{cropType}_{year}_000001'" />
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
                  <el-form-item :label="$t('research.breedingData.batch.form.varietyCode')" prop="varietyCode">
                    <el-input v-model="formData.varietyCode" :placeholder="$t('research.breedingData.batch.placeholder.varietyCode')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.varietyName')" prop="varietyName">
                    <el-input v-model="formData.varietyName" :placeholder="$t('research.breedingData.batch.placeholder.varietyName')" />
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
                  <el-form-item :label="$t('research.breedingData.batch.form.year')" prop="year">
                    <div class="w-full">
                      <el-date-picker
                        v-model="formData.year"
                        type="year"
                        value-format="YYYY"
                        style="width: 100%"
                        :placeholder="$t('research.breedingData.batch.placeholder.year')"
                        :disabled-date="disablePastYears"
                      />
                      <div class="mt-1 text-xs text-gray-500">
                        {{ $t('research.breedingData.batch.hint.yearNoPastSeasonLogic') }}
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.parentalSeedSource')" prop="parentalSeedSource">
                    <el-input v-model="formData.parentalSeedSource" :placeholder="$t('research.breedingData.batch.placeholder.parentalSeedSource')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.batch.form.objective')" prop="objective">
                    <el-input v-model="formData.objective" :placeholder="$t('research.breedingData.batch.placeholder.objective')" />
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
  parentalSeedSource: '',
  objective: '',
  status: 'ongoing',
  remarks: ''
})

const rules = {
  cropType: [{ required: true, message: t('research.breedingData.batch.placeholder.cropType'), trigger: 'change' }],
  varietyCode: [{ required: true, message: t('research.breedingData.batch.placeholder.varietyCode'), trigger: 'blur' }],
  varietyName: [{ required: true, message: t('research.breedingData.batch.placeholder.varietyName'), trigger: 'blur' }],
  breedingMethod: [{ required: true, message: t('research.breedingData.batch.placeholder.breedingMethod'), trigger: 'change' }],
  batchName: [{ required: true, message: t('research.breedingData.batch.placeholder.batchName'), trigger: 'blur' }],
  year: [
    { required: true, message: t('research.breedingData.batch.placeholder.year'), trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback()
          return
        }
        const currentYear = new Date().getFullYear()
        const selectedYear = parseInt(value)
        if (selectedYear < currentYear) {
          callback(new Error(t('research.breedingData.batch.validation.yearNotLessThanCurrent')))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  status: [{ required: true, message: t('research.breedingData.batch.placeholder.status'), trigger: 'change' }],
  parentalSeedSource: [{ required: true, message: t('research.breedingData.batch.placeholder.parentalSeedSource'), trigger: 'blur' }],
  objective: [{ required: true, message: t('research.breedingData.batch.placeholder.objective'), trigger: 'blur' }]
}

const cropTypeOptions = [
  { label: 'wheat', value: 'T01' },
  { label: 'corn', value: 'T02' },
  { label: 'teff', value: 'T03' }
]

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
    // 新增模式默认年份为当前年份
    if (!formData.year) {
      formData.year = String(new Date().getFullYear())
    }
    return
  }
  loading.value = true
  try {
    const res = await getBreedingBatchInfo(route.params.dataId)
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

const handleCropTypeChange = () => {
  // 自动生成 batchId
  generateBatchId()
}

// 生成 batchId: B_${cropType}_${year}_serial(6位)
const generateBatchId = () => {
  // 编辑模式下不自动生成
  if (isEdit.value) return

  const { cropType, year } = formData

  if (!cropType || !year) {
    formData.batchId = ''
    return
  }

  // 生成6位流水号（这里暂时使用随机数，实际应该从后端获取最新的流水号）
  const serial = String(Math.floor(Math.random() * 1000000)).padStart(6, '0')
  formData.batchId = `B_${cropType}_${year}_${serial}`
}

const goBack = () => {
  router.push('/research/breeding-data/batch')
}

// 监听年份变化，自动生成 batchId
watch(() => formData.year, () => {
  generateBatchId()
})

// 禁用过去年份（遵循日期逻辑：不允许早于当前年）
const disablePastYears = (date) => {
  if (!date) return false
  const currentYear = new Date().getFullYear()
  return date.getFullYear() < currentYear
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
