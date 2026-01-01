<template>
  <div class="form-container">
    <div class="info-card">
      <div class="card-header">
        <div class="card-title">
          <i class="ri-add-circle-line"></i>
          <span>{{ $t('prebasicSeedProduction.add') }}</span>
        </div>
        <el-button @click="handleCancel">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
      </div>

      <div class="card-body">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="180px"
          label-position="right"
        >
          <!-- 基础信息 -->
          <div class="form-section">
            <div class="section-title">
              <i class="ri-information-line"></i>
              {{ $t('prebasicSeedProduction.form.basicInfo') }}
            </div>

            <div class="form-row">
              <el-form-item :label="$t('prebasicSeedProduction.form.produceBatchName')" prop="produceBatchName">
                <el-input
                  v-model="formData.produceBatchName"
                  :placeholder="$t('prebasicSeedProduction.placeholder.produceBatchName')"
                  clearable
                  style="width: 100%"
                />
              </el-form-item>

              <el-form-item :label="$t('prebasicSeedProduction.form.breederSeedBatchName')" prop="breederSeedBatchId">
                <el-select
                  v-model="formData.breederSeedBatchId"
                  :placeholder="$t('prebasicSeedProduction.placeholder.breederSeedBatchName')"
                  filterable
                  clearable
                  style="width: 100%"
                  @change="handleBatchChange"
                >
                  <el-option
                    v-for="batch in breederSeedBatchList"
                    :key="batch.produceBatchId"
                    :label="batch.produceBatchName"
                    :value="batch.produceBatchId"
                  >
                    <div style="display: flex; justify-content: space-between;">
                      <span>{{ batch.produceBatchName }}</span>
                      <el-tag type="success" size="small" effect="plain">
                        {{ batch.produceStatus }}
                      </el-tag>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="form-row">
              <el-form-item :label="$t('prebasicSeedProduction.form.varietyName')" prop="varietyName">
                <el-input
                  v-model="formData.varietyName"
                  disabled
                />
              </el-form-item>

              <el-form-item :label="$t('prebasicSeedProduction.form.cropType')" prop="cropType">
                <el-input
                  v-model="cropTypeLabel"
                  disabled
                />
              </el-form-item>
            </div>

            <div class="form-row">
              <el-form-item :label="$t('prebasicSeedProduction.form.time')" prop="time">
                <el-date-picker
                  v-model="formData.time"
                  type="datetime"
                  :placeholder="$t('prebasicSeedProduction.placeholder.time')"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                />
              </el-form-item>

              <el-form-item :label="$t('prebasicSeedProduction.form.landName')" prop="landId">
                <el-select
                  v-model="formData.landId"
                  :placeholder="$t('prebasicSeedProduction.placeholder.landName')"
                  filterable
                  clearable
                  style="width: 100%"
                  @change="handleLandChange"
                >
                  <el-option
                    v-for="land in landList"
                    :key="land.landId"
                    :label="land.landName"
                    :value="land.landId"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>

          <!-- 生产信息 -->
          <div class="form-section">
            <div class="section-title">
              <i class="ri-plant-line"></i>
              {{ $t('prebasicSeedProduction.form.productionInfo') }}
            </div>

            <div class="form-row">
              <el-form-item :label="$t('prebasicSeedProduction.form.operatorName')" prop="operatorName">
                <el-input
                  v-model="formData.operatorName"
                  disabled
                  style="width: 100%"
                />
              </el-form-item>

              <el-form-item :label="$t('prebasicSeedProduction.form.inputSeedQuantity')" prop="inputSeedQuantity">
                <el-input-number
                  v-model="formData.inputSeedQuantity"
                  :placeholder="$t('prebasicSeedProduction.placeholder.inputSeedQuantity')"
                  :min="0"
                  :precision="2"
                  style="width: 100%"
                />
                <div v-if="remainingQuantity !== null" class="remaining-quantity-hint">
                  <i class="ri-information-line"></i>
                  <span>{{ $t('prebasicSeedProduction.form.remainingQuantity') }}: <strong>{{ remainingQuantity }} kg</strong></span>
                </div>
              </el-form-item>
            </div>
          </div>

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
import { addPrebasicSeedProduce } from '@/api/prebasicSeed'
import { getBreedSeedProduceList, getBreedSeedProduceRemainingQuantity } from '@/api/breedSeed'
import { getLandList } from '@/api/newFarm'
import { useDict } from '@/hooks/useDict'
import { getUserInfo } from '@/utils/auth'

const { t } = useI18n()

const emit = defineEmits(['cancel', 'success'])

// 使用 useDict 获取作物类型字典
const { getLabelByValue } = useDict(['crop_type'])

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
  operatorId: currentUser?.user?.id || '',
  operatorName: currentUser?.user?.name || '',
  inputSeedQuantity: null,
  fromSeedLevel: 'Breeder',
  toSeedLevel: 'Pre-Basic'
})

// 下拉选项
const breederSeedBatchList = ref([])
const landList = ref([])
const remainingQuantity = ref(null)

// 计算属性：作物类型显示 label
const cropTypeLabel = computed(() => {
  return formData.cropType ? getLabelByValue('crop_type', formData.cropType) : ''
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
  landId: [
    { required: true, message: t('prebasicSeedProduction.rules.landIdRequired'), trigger: 'change' }
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
    console.log('Loaded breeder seed batches:', breederSeedBatchList.value.length)
  } catch (error) {
    console.error('Failed to load breeder seed batch options:', error)
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



// Breeder Seed批次选择变化时，自动填充相关信息
const handleBatchChange = async (batchId) => {
  console.log('handleBatchChange called with:', batchId)

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
  console.log('Found batch:', selectedBatch)

  if (selectedBatch) {
    formData.breederSeedBatchId = selectedBatch.produceBatchId || ''
    formData.breederSeedBatchName = selectedBatch.produceBatchName || ''
    formData.breedBatchId = selectedBatch.breedBatchId || ''
    formData.breedBatchName = selectedBatch.breedBatchName || ''
    formData.trialId = selectedBatch.trialId || ''
    formData.trialName = selectedBatch.trialName || ''
    formData.varietyId = selectedBatch.varietyId || ''
    formData.varietyName = selectedBatch.varietyName || ''
    formData.cropType = selectedBatch.cropType || ''
    
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
    if (!formData.breederSeedBatchId) {
      ElMessage.warning('Please select a breeder seed batch')
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

    // 构建提交数据，只包含有值的字段
    // 将日期格式转换为 ISO 8601 格式（后端需要）
    const timeValue = formData.time ? new Date(formData.time).toISOString() : null

    const submitData = {
      produceBatchName: formData.produceBatchName,
      breederSeedBatchId: formData.breederSeedBatchId,
      breederSeedBatchName: formData.breederSeedBatchName,
      varietyName: formData.varietyName,
      cropType: formData.cropType,
      time: timeValue,
      landId: formData.landId,
      landName: formData.landName,
      operatorName: formData.operatorName,
      inputSeedQuantity: formData.inputSeedQuantity,
      fromSeedLevel: 'Breeder',
      toSeedLevel: 'Pre-Basic'
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

    const res = await addPrebasicSeedProduce(submitData)
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
  loadBreederSeedBatchOptions()
  loadLandList()
})
</script>

<style scoped>
.form-container {
  padding: 20px 0;
}

.info-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.03) 0%, rgba(254, 221, 0, 0.03) 100%);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
}

.card-title i {
  font-size: 20px;
}

.card-body {
  padding: 30px 24px;
}

.form-section {
  margin-bottom: 30px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.05) 100%);
  border-left: 4px solid #009A44;
  margin-bottom: 20px;
  border-radius: 4px;
}

/* 两列布局 */
.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-row > .el-form-item {
  flex: 1;
  margin-bottom: 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

@media screen and (max-width: 768px) {
  :deep(.el-form-item__label) {
    text-align: left !important;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions button {
    width: 100%;
  }
  
  /* 移动端单列布局 */
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}

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
