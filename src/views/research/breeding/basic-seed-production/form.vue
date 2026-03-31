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
            <h1 class="page-title">{{ $t('basicSeedProduction.add') }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="180px">
          <!-- 基本信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('basicSeedProduction.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('basicSeedProduction.form.produceBatchName')" prop="produceBatchName">
                    <el-input
                      v-model="formData.produceBatchName"
                      :placeholder="$t('basicSeedProduction.placeholder.produceBatchName')"
                      clearable />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('basicSeedProduction.form.prebasicSeedBatchName')" prop="prebasicSeedBatchId">
                    <el-select
                      v-model="formData.prebasicSeedBatchId"
                      :placeholder="$t('basicSeedProduction.placeholder.prebasicSeedBatchName')"
                      filterable
                      clearable
                      style="width: 100%"
                      @change="handleBatchChange">
                      <el-option
                        v-for="batch in prebasicSeedBatchList"
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
              </el-row>

              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('basicSeedProduction.form.varietyName')" prop="varietyName">
                    <el-input v-model="formData.varietyName" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('basicSeedProduction.form.cropType')" prop="cropType">
                    <el-input v-model="cropTypeLabel" disabled />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('basicSeedProduction.form.time')" prop="time">
                    <el-date-picker
                      v-model="formData.time"
                      type="datetime"
                      :placeholder="$t('basicSeedProduction.placeholder.time')"
                      format="YYYY-MM-DD HH:mm:ss"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('basicSeedProduction.form.landName')" prop="landId">
                    <el-select
                      v-model="formData.landId"
                      :placeholder="$t('basicSeedProduction.placeholder.landName')"
                      filterable
                      clearable
                      style="width: 100%"
                      @change="handleLandChange">
                      <el-option
                        v-for="land in landList"
                        :key="land.landId"
                        :label="land.landName"
                        :value="land.landId" />
                    </el-select>
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
                <span>{{ $t('basicSeedProduction.form.productionInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('basicSeedProduction.form.operatorName')" prop="operatorName">
                    <el-input v-model="formData.operatorName" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('basicSeedProduction.form.inputSeedQuantity')" prop="inputSeedQuantity">
                    <el-input-number
                      v-model="formData.inputSeedQuantity"
                      :placeholder="$t('basicSeedProduction.placeholder.inputSeedQuantity')"
                      :min="0"
                      :precision="2"
                      style="width: 100%" />
                    <div v-if="remainingQuantity !== null" class="remaining-quantity-hint">
                      <i class="ri-information-line"></i>
                      <span>{{ $t('basicSeedProduction.form.remainingQuantity') }}: <strong>{{ remainingQuantity }} kg</strong></span>
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
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { addBasicSeedProduce } from '@/api/basicSeed'
import { getPrebasicSeedProduceList } from '@/api/prebasicSeed'
import { getLandList } from '@/api/newFarm'
import { getUserInfo } from '@/utils/auth'
import { loadSeedCropTypeOptions, resolveCropTypeValue, resolveCropTypeLabel, getCropTypeDisplay } from '@/utils/researchCropType'

const { t, locale } = useI18n()

const emit = defineEmits(['cancel', 'success'])
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
  prebasicSeedBatchId: '',
  prebasicSeedBatchName: '',
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
  operatorName: currentUser?.userName || '',
  inputSeedQuantity: null,
  fromSeedLevel: 'Pre-Basic',
  toSeedLevel: 'Basic'
})

// 下拉选项
const prebasicSeedBatchList = ref([])
const landList = ref([])
const remainingQuantity = ref(null)

// 计算属性：作物类型显示 label
const cropTypeLabel = computed(() => {
  return formData.cropType ? getCropTypeDisplay(cropTypeOptions.value, formData.cropType) : ''
})

// 表单验证规则
const rules = computed(() => ({
  produceBatchName: [
    { required: true, message: t('basicSeedProduction.rules.produceBatchNameRequired'), trigger: 'blur' }
  ],
  prebasicSeedBatchId: [
    { required: true, message: t('basicSeedProduction.rules.prebasicSeedBatchIdRequired'), trigger: 'change' }
  ],
  time: [
    { required: true, message: t('basicSeedProduction.rules.timeRequired'), trigger: 'change' }
  ],
  landId: [
    { required: true, message: t('basicSeedProduction.rules.landIdRequired'), trigger: 'change' }
  ],
  operatorName: [
    { required: true, message: t('basicSeedProduction.rules.operatorNameRequired'), trigger: 'blur' }
  ],
  inputSeedQuantity: [
    { required: true, message: t('basicSeedProduction.rules.inputSeedQuantityRequired'), trigger: 'blur' },
    { type: 'number', min: 0.01, message: t('basicSeedProduction.rules.inputSeedQuantityMin'), trigger: 'blur' }
  ]
}))

// 加载PreBasic Seed批次选项
const loadPrebasicSeedBatchOptions = async () => {
  try {
    const params = {
      pageNum: 1,
      pageSize: 1000,
      produceStatus: 'Finished',
      toSeedLevel: 'Pre-Basic'
    }
    const res = await getPrebasicSeedProduceList(params)
    prebasicSeedBatchList.value = res.rows || []
    console.log('Loaded prebasic seed batches:', prebasicSeedBatchList.value.length)
  } catch (error) {
    console.error('Failed to load prebasic seed batch options:', error)
  }
}

// 加载地块列表
const loadLandList = async () => {
  try {
    const res = await getLandList({ pageNum: 1, pageSize: 1000 })
    if (res.code === 200 && res.rows) {
      landList.value = res.rows.map(item => ({
        landId: item.landId,
        landName: item.landName
      }))
      console.log('Loaded lands:', landList.value.length)
    }
  } catch (error) {
    console.error('Failed to load land list:', error)
  }
}

// PreBasic Seed批次选择变化时，自动填充相关信息
const handleBatchChange = async (batchId) => {
  console.log('handleBatchChange called with:', batchId)

  if (!batchId) {
    formData.prebasicSeedBatchId = ''
    formData.prebasicSeedBatchName = ''
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

  const selectedBatch = prebasicSeedBatchList.value.find(item => item.produceBatchId === batchId)
  console.log('Found batch:', selectedBatch)

  if (selectedBatch) {
    formData.prebasicSeedBatchId = selectedBatch.produceBatchId || ''
    formData.prebasicSeedBatchName = selectedBatch.produceBatchName || ''
    formData.breedBatchId = selectedBatch.breedBatchId || ''
    formData.breedBatchName = selectedBatch.breedBatchName || ''
    formData.trialId = selectedBatch.trialId || ''
    formData.trialName = selectedBatch.trialName || ''
    formData.varietyId = selectedBatch.varietyId || ''
    formData.varietyName = selectedBatch.varietyName || ''
    formData.cropType = resolveCropTypeValue(cropTypeOptions.value, selectedBatch.cropType || '')
    
    // 获取剩余数量（从 PreBasic 的生产结果中获取）
    try {
      const { getPrebasicSeedProduceResultList } = await import('@/api/prebasicSeed')
      const resultRes = await getPrebasicSeedProduceResultList({
        produceBatchId: batchId,
        pageNum: 1,
        pageSize: 1
      })
      
      if (resultRes.code === 200 && resultRes.rows && resultRes.rows.length > 0) {
        const result = resultRes.rows[0]
        remainingQuantity.value = result.remainingQuantity || 0
        console.log('Remaining quantity:', remainingQuantity.value)
      } else {
        // 如果没有生产结果，使用产出数量
        remainingQuantity.value = selectedBatch.produceSeedQuantity || 0
      }
    } catch (error) {
      console.error('Failed to load remaining quantity:', error)
      // 出错时使用产出数量作为备选
      remainingQuantity.value = selectedBatch.produceSeedQuantity || 0
    }
  }
}

// 地块选择变化时，记录地块名称
const handleLandChange = (landId) => {
  console.log('handleLandChange called with:', landId)

  if (!landId) {
    formData.landId = ''
    formData.landName = ''
    return
  }

  const selected = landList.value.find(item => item.landId === landId)
  if (selected) {
    formData.landId = selected.landId
    formData.landName = selected.landName
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate()

    // 验证必填的ID字段
    if (!formData.prebasicSeedBatchId) {
      ElMessage.warning('Please select a pre-basic seed batch')
      return
    }
    if (!formData.landId) {
      ElMessage.warning('Please select a land')
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
      prebasicSeedBatchId: formData.prebasicSeedBatchId,
      prebasicSeedBatchName: formData.prebasicSeedBatchName,
      varietyName: formData.varietyName,
      cropType: resolveCropTypeLabel(cropTypeOptions.value, formData.cropType),
      time: timeValue,
      landId: formData.landId,
      landName: formData.landName,
      operatorName: formData.operatorName,
      inputSeedQuantity: formData.inputSeedQuantity,
      fromSeedLevel: 'Pre-Basic',
      toSeedLevel: 'Basic'
    }

    // 只有当字段有值时才添加到提交数据中
    if (formData.breedBatchId) {
      submitData.breedBatchId = formData.breedBatchId
    }
    if (formData.breedBatchName) {
      submitData.breedBatchName = formData.breedBatchName
    }
    if (formData.trialId) {
      submitData.trialId = formData.trialId
    }
    if (formData.trialName) {
      submitData.trialName = formData.trialName
    }
    if (formData.varietyId) {
      submitData.varietyId = formData.varietyId
    }
    if (formData.operatorId) {
      submitData.operatorId = formData.operatorId
    }

    console.log('Submitting data:', submitData)

    const res = await addBasicSeedProduce(submitData)
    if (res.code === 200) {
      ElMessage.success(t('common.submitSuccess'))
      emit('success')
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
  emit('cancel')
}

// 组件挂载时加载数据
onMounted(() => {
  loadSeedCropTypeOptions(locale.value).then((options) => {
    cropTypeOptions.value = options
    loadPrebasicSeedBatchOptions()
    loadLandList()
  }).catch((error) => {
    console.error('Failed to load crop type options:', error)
    loadPrebasicSeedBatchOptions()
    loadLandList()
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

  i {
    color: #009A44;
    font-size: 16px;
  }

  strong {
    color: #009A44;
    font-weight: 600;
  }
}
</style>
