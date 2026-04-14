<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleCancel">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('prebasicSeedProduction.add') }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="220px">
          <!-- 基本信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('prebasicSeedProduction.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('prebasicSeedProduction.form.produceBatchName')" prop="produceBatchName">
                    <el-input
                      v-model="formData.produceBatchName"
                      :placeholder="$t('prebasicSeedProduction.placeholder.produceBatchName')"
                      clearable />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('prebasicSeedProduction.form.breederSeedBatchName')" prop="breederSeedBatchId">
                    <el-select
                      v-model="formData.breederSeedBatchId"
                      :placeholder="$t('prebasicSeedProduction.placeholder.breederSeedBatchName')"
                      filterable
                      clearable
                      style="width: 100%"
                      @change="handleBatchChange">
                      <el-option
                        v-for="batch in breederSeedBatchList"
                        :key="batch.produceBatchId"
                        :label="batch.produceBatchName"
                        :value="batch.produceBatchId">
                        <div style="display: flex; justify-content: space-between;">
                          <span>{{ batch.produceBatchName }}</span>
                          <el-tag type="success" size="small" effect="plain">
                            {{ batch.produceStatus }}
                          </el-tag>
                        </div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('prebasicSeedProduction.form.varietyName')" prop="varietyName">
                    <el-input v-model="formData.varietyName" disabled />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('prebasicSeedProduction.form.cropType')" prop="cropType">
                    <el-input v-model="cropTypeLabel" disabled />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('prebasicSeedProduction.form.landName')" prop="landName">
                    <el-input
                      v-model="formData.landName"
                      placeholder="please input land"
                      clearable
                      style="width: 100%" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 生产信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-plant-line"></i>
                <span>{{ $t('prebasicSeedProduction.form.productionInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('prebasicSeedProduction.form.time')" prop="time">
                    <el-date-picker
                      v-model="formData.time"
                      type="datetime"
                      :placeholder="$t('prebasicSeedProduction.placeholder.time')"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      style="width: 100%" />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('prebasicSeedProduction.form.inputSeedQuantity')" prop="inputSeedQuantity">
                    <el-input-number
                      v-model="formData.inputSeedQuantity"
                      :placeholder="$t('prebasicSeedProduction.placeholder.inputSeedQuantity')"
                      :min="0"
                      :precision="2"
                      style="width: 100%" />
                    <div v-if="remainingQuantity !== null" class="remaining-quantity-hint">
                      <i class="ri-information-line"></i>
                      <span>{{ $t('prebasicSeedProduction.form.remainingQuantity') }}: <strong>{{ remainingQuantity }} kg</strong></span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="form-actions">
            <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitting">
              {{ $t('common.submit') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { addPrebasicSeedProduce } from '@/api/prebasicSeed'
import { getBreedSeedProduceList, getBreedSeedProduceRemainingQuantity } from '@/api/breedSeed'
import { getUserInfo } from '@/utils/auth'
import { loadSeedCropTypeOptions, resolveCropTypeValue, resolveCropTypeLabel, getCropTypeDisplay } from '@/utils/researchCropType'

const router = useRouter()
const { t, locale } = useI18n()
const cropTypeOptions = ref([])

// 表单状态
const formRef = ref(null)
const submitting = ref(false)

// 获取当前登录用户信息
const currentUser = getUserInfo()

// 获取当前时间（格式：YYYY-MM-DD HH:mm:ss）
const getCurrentDateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 表单数据
const formData = reactive({
  produceBatchName: '',
  breederSeedBatchId: '',
  breederSeedBatchName: '',
  breedBatchId: '',
  breedBatchName: '',
  trialId: '',
  trialName: '',
  varietyId: '',
  varietyName: '',
  cropType: '',
  time: getCurrentDateTime(),
  landId: '',
  landName: '',
  operatorId: currentUser?.userId || '',
  operatorName: currentUser.userName || '',
  inputSeedQuantity: null,
  fromSeedLevel: 'Breeder',
  toSeedLevel: 'Pre-Basic'
})

// 下拉选项
const breederSeedBatchList = ref([])
const remainingQuantity = ref(null)

// 计算属性：作物类型显示 label
const cropTypeLabel = computed(() => {
  return formData.cropType ? getCropTypeDisplay(cropTypeOptions.value, formData.cropType) : ''
})

// 表单验证规则
const rules = computed(() => ({
  produceBatchName: [
    { required: true, message: t('prebasicSeedProduction.rules.produceBatchNameRequired'), trigger: 'blur' }
  ],
  breederSeedBatchId: [
    { required: true, message: t('prebasicSeedProduction.rules.breederSeedBatchIdRequired'), trigger: 'change' }
  ],
  time: [
    { required: true, message: t('prebasicSeedProduction.rules.timeRequired'), trigger: 'change' }
  ],
  landName: [
    { required: true, message: t('prebasicSeedProduction.rules.landNameRequired'), trigger: 'blur' }
  ],
  operatorName: [
    { required: true, message: t('prebasicSeedProduction.rules.operatorNameRequired'), trigger: 'blur' }
  ],
  inputSeedQuantity: [
    { required: true, message: t('prebasicSeedProduction.rules.inputSeedQuantityRequired'), trigger: 'blur' },
    { type: 'number', min: 0.01, message: t('prebasicSeedProduction.rules.inputSeedQuantityMin'), trigger: 'blur' }
  ]
}))

// 加载Breeder Seed批次选项
const loadBreederSeedBatchOptions = async () => {
  try {
    const params = {
      pageNum: 1,
      pageSize: 1000,
      produceStatus: 'Finished',
      toSeedLevel: 'Breeder'
    }
    const res = await getBreedSeedProduceList(params)
    breederSeedBatchList.value = res.rows || []
  } catch (error) {
    console.error('Failed to load breeder seed batch options:', error)
  }
}

// Breeder Seed批次选择变化时，自动填充相关信息
const handleBatchChange = async (batchId) => {
  if (!batchId) {
    formData.breederSeedBatchId = ''
    formData.breederSeedBatchName = ''
    formData.breedBatchId = ''
    formData.breedBatchName = ''
    formData.trialId = ''
    formData.trialName = ''
    formData.varietyId = ''
    formData.varietyName = ''
    formData.cropType = ''
    remainingQuantity.value = null
    return
  }

  const selectedBatch = breederSeedBatchList.value.find(item => item.produceBatchId === batchId)

  if (selectedBatch) {
    formData.breederSeedBatchId = selectedBatch.produceBatchId || ''
    formData.breederSeedBatchName = selectedBatch.produceBatchName || ''
    formData.breedBatchId = selectedBatch.breedBatchId || ''
    formData.breedBatchName = selectedBatch.breedBatchName || ''
    formData.trialId = selectedBatch.trialId || ''
    formData.trialName = selectedBatch.trialName || ''
    formData.varietyId = selectedBatch.varietyId || ''
    formData.varietyName = selectedBatch.varietyName || ''
    formData.cropType = resolveCropTypeValue(cropTypeOptions.value, selectedBatch.cropType || '')
    
    // 获取剩余数量
    try {
      const res = await getBreedSeedProduceRemainingQuantity(batchId)
      if (res.code === 200 && res.data) {
        remainingQuantity.value = res.data.remainingQuantity || res.data.producedAmount || 0
      }
    } catch (error) {
      console.error('Failed to get remaining quantity:', error)
      remainingQuantity.value = null
    }
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate()

    formData.landName = formData.landName?.trim() || ''
    formData.landId = formData.landName

    // 验证必填的ID字段
    if (!formData.breederSeedBatchId) {
      ElMessage.warning('Please select a breeder seed batch')
      return
    }
    if (!formData.landName) {
      ElMessage.warning('Please enter land name')
      return
    }
    if (!formData.operatorName) {
      ElMessage.warning('Operator name is required')
      return
    }

    submitting.value = true

    // 构建提交数据
    const timeValue = formData.time ? new Date(formData.time).toISOString() : null

    const submitData = {
      produceBatchName: formData.produceBatchName,
      breederSeedBatchId: formData.breederSeedBatchId,
      breederSeedBatchName: formData.breederSeedBatchName,
      varietyName: formData.varietyName,
      cropType: resolveCropTypeLabel(cropTypeOptions.value, formData.cropType),
      time: timeValue,
      landId: formData.landId,
      landName: formData.landName,
      operatorName: formData.operatorName,
      inputSeedQuantity: formData.inputSeedQuantity,
      fromSeedLevel: 'Breeder',
      toSeedLevel: 'Pre-Basic'
    }

    // 只有当字段有值时才添加到提交数据中
    if (formData.breedBatchId) submitData.breedBatchId = formData.breedBatchId
    if (formData.breedBatchName) submitData.breedBatchName = formData.breedBatchName
    if (formData.trialId) submitData.trialId = formData.trialId
    if (formData.trialName) submitData.trialName = formData.trialName
    if (formData.varietyId) submitData.varietyId = formData.varietyId
    if (formData.operatorId) submitData.operatorId = formData.operatorId

    const res = await addPrebasicSeedProduce(submitData)
    if (res.code === 200) {
      ElMessage.success(t('common.submitSuccess'))
      router.back()
    } else {
      ElMessage.error(res.msg || t('common.submitFailed'))
    }
  } catch (error) {
    if (error !== false) {
      console.error('Failed to submit:', error)
      const errorMsg = error?.response?.data?.msg || error?.message || t('common.submitFailed')
      ElMessage.error(errorMsg)
    }
  } finally {
    submitting.value = false
  }
}

// 取消
const handleCancel = () => {
  router.back()
}

// 组件挂载时加载数据
onMounted(() => {
  loadSeedCropTypeOptions(locale.value).then((options) => {
    cropTypeOptions.value = options
    loadBreederSeedBatchOptions()
  }).catch((error) => {
    console.error('Failed to load crop type options:', error)
    loadBreederSeedBatchOptions()
  })
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.remaining-quantity-hint {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  padding: 8px 12px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.05) 100%);
  border-left: 3px solid #009A44;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
}

.remaining-quantity-hint i {
  color: #009A44;
  font-size: 16px;
}

.remaining-quantity-hint strong {
  color: #009A44;
  font-weight: 600;
}
</style>
