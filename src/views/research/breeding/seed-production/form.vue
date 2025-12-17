<template>
  <div class="form-container">
    <div class="info-card">
      <div class="card-header">
        <div class="card-title">
          <i class="ri-add-circle-line"></i>
          <span>{{ $t('research.breeding.seed.production.add') }}</span>
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
              {{ $t('research.breeding.seed.production.form.basicInfo') }}
            </div>

            <div class="form-row">
              <el-form-item :label="$t('research.breeding.seed.production.form.produceBatchName')" prop="produceBatchName">
                <el-input
                  v-model="formData.produceBatchName"
                  :placeholder="$t('research.breeding.seed.production.placeholder.produceBatchName')"
                  clearable
                  style="width: 100%"
                />
              </el-form-item>

              <el-form-item :label="$t('research.breeding.seed.production.form.breedBatchName')" prop="breedBatchName">
                <el-select
                  v-model="formData.breedBatchName"
                  :placeholder="$t('research.breeding.seed.production.placeholder.breedBatchName')"
                  filterable
                  clearable
                  style="width: 100%"
                  @change="handleBatchChange"
                >
                  <el-option
                    v-for="batch in breedBatchList"
                    :key="batch.batchId"
                    :label="batch.batchName"
                    :value="batch.batchId"
                  >
                    <div style="display: flex; justify-content: space-between;">
                      <span>{{ batch.batchName }}</span>
                      <el-tag type="success" size="small" effect="plain">
                        {{ batch.status }}
                      </el-tag>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="form-row">
              <el-form-item :label="$t('research.breeding.seed.production.form.trialName')" prop="trialName">
              <el-select
                v-model="formData.trialId"
                :placeholder="$t('research.breeding.seed.production.placeholder.trialName')"
                filterable
                clearable
                style="width: 100%"
                @change="handleTrialChange"
              >
                <el-option
                  v-for="trial in trialList"
                  :key="trial.trialId"
                  :label="trial.trialName"
                  :value="trial.trialId"
                />
              </el-select>
            </el-form-item>

              <el-form-item :label="$t('research.breeding.seed.production.form.varietyName')" prop="varietyName">
                <el-input
                  v-model="formData.varietyName"
                  disabled
                  :placeholder="$t('research.breeding.seed.production.placeholder.varietyName')"
                />
              </el-form-item>
            </div>

            <div class="form-row">
              <el-form-item :label="$t('research.breeding.seed.production.form.fromSeedLevel')" prop="fromSeedLevel">
                <el-select
                  v-model="formData.fromSeedLevel"
                  :placeholder="$t('research.breeding.seed.production.placeholder.fromSeedLevel')"
                  clearable
                  style="width: 100%"
                  @change="handleSeedLevelChange"
                >
                  <el-option label="Breeder" value="Breeder" />
                  <el-option label="Pre-Basic" value="Pre-Basic" />
                </el-select>
              </el-form-item>

              <el-form-item :label="$t('research.breeding.seed.production.form.toSeedLevel')" prop="toSeedLevel">
                <el-select
                  v-model="formData.toSeedLevel"
                  :placeholder="$t('research.breeding.seed.production.placeholder.toSeedLevel')"
                  clearable
                  style="width: 100%"
                  :disabled="!formData.fromSeedLevel"
                >
                  <el-option
                    v-for="option in toSeedLevelOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </el-form-item>
            </div>

            <div class="form-row">
              <el-form-item :label="$t('research.breeding.seed.production.form.time')" prop="time">
                <el-date-picker
                  v-model="formData.time"
                  type="datetime"
                  :placeholder="$t('research.breeding.seed.production.placeholder.time')"
                  format="YYYY-MM-DD HH:mm:ss"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                />
              </el-form-item>

              <el-form-item :label="$t('research.breeding.seed.production.form.landName')" prop="landName">
                <el-select
                  v-model="formData.landName"
                  :placeholder="$t('research.breeding.seed.production.placeholder.landName')"
                  filterable
                  clearable
                  style="width: 100%"
                  @change="handleLandChange"
                >
                  <el-option
                    v-for="land in landList"
                    :key="land.landId"
                    :label="land.landName"
                    :value="land.landName"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>

          <!-- 生产信息 -->
          <div class="form-section">
            <div class="section-title">
              <i class="ri-plant-line"></i>
              {{ $t('research.breeding.seed.production.form.productionInfo') }}
            </div>

            <div class="form-row">
              <el-form-item :label="$t('research.breeding.seed.production.form.inputSeedQuantity')" prop="inputSeedQuantity">
                <el-input-number
                  v-model="formData.inputSeedQuantity"
                  :placeholder="$t('research.breeding.seed.production.placeholder.inputSeedQuantity')"
                  :min="0"
                  :precision="2"
                  style="width: 100%"
                />
              </el-form-item>
              
              <!-- 占位元素，保持布局一致性 -->
              <div></div>
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
import { addBreedSeedProduce, getVarietyPublishList } from '@/api/breedSeed'
import { getLandList } from '@/api/newFarm'
import { getBreedingBatchList , getTrialBasicList} from '@/api/breedingData'

const { t } = useI18n()

const emit = defineEmits(['cancel', 'success'])

// 表单状态
const formRef = ref(null)
const submitting = ref(false)

// 表单数据
const formData = reactive({
  produceBatchName: '',
  breedBatchId: '',
  breedBatchName: '',
  trialId: '',
  trialName: '',
  varietyId: '',
  varietyName: '',
  cropType: '',
  time: '',
  landId: '',
  landName: '',
  inputSeedQuantity: null,
  fromSeedLevel: '',
  toSeedLevel: ''
})

// 种子等级联动规则
const toSeedLevelOptions = ref([])

// 下拉选项
const breedBatchList = ref([])
const varietyList = ref([])
const landList = ref([])
const trialList = ref([])

// 表单验证规则
const rules = computed(() => ({
  breedBatchId: [
    { required: true, message: t('research.breeding.seed.production.rules.breedBatchIdRequired'), trigger: 'change' }
  ],
  varietyName: [
    { required: true, message: t('research.breeding.seed.production.rules.varietyNameRequired'), trigger: 'change' }
  ],
  fromSeedLevel: [
    { required: true, message: t('research.breeding.seed.production.rules.fromSeedLevelRequired'), trigger: 'change' }
  ],
  toSeedLevel: [
    { required: true, message: t('research.breeding.seed.production.rules.toSeedLevelRequired'), trigger: 'change' }
  ],
  time: [
    { required: true, message: t('research.breeding.seed.production.rules.timeRequired'), trigger: 'change' }
  ],
  landName: [
    { required: true, message: t('research.breeding.seed.production.rules.landNameRequired'), trigger: 'change' }
  ],
  inputSeedQuantity: [
    { required: true, message: t('research.breeding.seed.production.rules.inputSeedQuantityRequired'), trigger: 'blur' },
    { type: 'number', min: 0.01, message: t('research.breeding.seed.production.rules.inputSeedQuantityMin'), trigger: 'blur' }
  ]
}))

// 加载批次选项
const loadBatchOptions = async () => {
  try {
    // 参数
    const params = {
      pageNum: 1,
      pageSize: 1000,
      status: 'Finished'
    }
    const res = await getBreedingBatchList(params)
    // 格式化数据用于下拉框：使用batchName作为标签，batchId作为值
    breedBatchList.value = (res.rows || []).map(item => ({
      ...item,
      label: item.batchName,
      value: item.batchId
    }))
    console.log('Loaded batches:', breedBatchList.value.length, breedBatchList.value)
  } catch (error) {
    console.error('Failed to load batch options:', error)
  }
}

// 加载品种列表
const loadVarietyList = async () => {
  try {
    const res = await getVarietyPublishList({ pageNum: 1, pageSize: 1000 })
    console.log('Variety API response:', res)

    if (res.code === 200 && res.rows) {
      varietyList.value = res.rows.map(item => ({
        varietyId: item.publishId,
        varietyName: item.varietyName,
        cropType: item.cropType
      }))
      console.log('Loaded varieties:', varietyList.value.length, varietyList.value)
    } else {
      console.warn('No variety data:', res)
    }
  } catch (error) {
    console.error('Failed to load variety list:', error)
  }
}

// 加载地块列表
const loadLandList = async () => {
  try {
    const res = await getLandList({ pageNum: 1, pageSize: 1000 })
    console.log('Land API response:', res)

    if (res.code === 200 && res.rows) {
      landList.value = res.rows.map(item => ({
        landId: item.landId,
        landName: item.landName
      }))
      console.log('Loaded lands:', landList.value.length, landList.value)
    } else {
      console.warn('No land data:', res)
    }
  } catch (error) {
    console.error('Failed to load land list:', error)
  }
}

// 加载实验数据
const loadTrialData = async (batchId) => {
  try {
    const params = {
      pageNum: 1,
      pageSize: 1000,
      batchId: batchId
    }
    const res = await getTrialBasicList(params)
    // 格式化数据用于下拉框：使用trialName作为标签，trialId作为值
    trialList.value = (res.rows || []).map(item => ({
      ...item,
      label: item.trialName,
      value: item.trialId
    }))
    console.log('Loaded trial data:', trialList.value.length, trialList.value)
  } catch (error) {
    console.error('Failed to load trial options:', error)
  }
}

// 批次选择变化时，自动填充品种信息和作物类型
const handleBatchChange = (batchId) => {
  console.log('handleBatchChange called with:', batchId)
  console.log('Current breedBatchList:', breedBatchList.value)

  if (!batchId) {
    formData.breedBatchId = ''
    formData.breedBatchName = ''
    formData.trialId = ''
    formData.trialName = ''
    formData.varietyId = ''
    formData.varietyName = ''
    formData.cropType = ''
    trialList.value = []
    console.log('Cleared batch related fields')
    return
  }

  const selectedBatch = breedBatchList.value.find(item => item.batchId === batchId)
  console.log('Found batch:', selectedBatch)

  if (selectedBatch) {
    formData.breedBatchId = selectedBatch.batchId || ''
    formData.breedBatchName = selectedBatch.batchName || ''
    formData.varietyId = selectedBatch.varietyCode || ''
    formData.varietyName = selectedBatch.varietyName || ''
    formData.cropType = selectedBatch.cropType || ''
    
    // 加载实验数据
    loadTrialData(selectedBatch.batchId)
    
    console.log('Updated formData:', {
      breedBatchId: formData.breedBatchId,
      breedBatchName: formData.breedBatchName,
      varietyId: formData.varietyId,
      varietyName: formData.varietyName,
      cropType: formData.cropType
    })
  } else {
    console.warn('Batch not found:', batchId)
    formData.breedBatchId = ''
    formData.breedBatchName = ''
    formData.trialId = ''
    formData.trialName = ''
    formData.varietyId = ''
    formData.varietyName = ''
    formData.cropType = ''
    trialList.value = []
  }
}

// 地块选择变化时，根据地块名称查找并记录landId
const handleLandChange = (landName) => {
  console.log('handleLandChange called with:', landName)
  console.log('Current landList:', landList.value)

  if (!landName) {
    formData.landId = ''
    console.log('Cleared land fields')
    return
  }

  const selected = landList.value.find(item => item.landName === landName)
  console.log('Found land:', selected)

  if (selected) {
    formData.landId = selected.landId
    console.log('Updated formData:', {
      landId: formData.landId,
      landName: formData.landName
    })
  } else {
    console.warn('Land not found:', landName)
    console.warn('Available lands:', landList.value.map(l => l.landName))
    formData.landId = ''
  }
}

// 种子等级联动规则
const handleSeedLevelChange = (value) => {
  // 清空目标种子等级
  formData.toSeedLevel = ''
  
  // 根据源种子等级设置目标种子等级可选值
  if (value === 'Breeder') {
    toSeedLevelOptions.value = [{ label: 'Pre-Basic', value: 'Pre-Basic' }]
  } else if (value === 'Pre-Basic') {
    toSeedLevelOptions.value = [{ label: 'Basic', value: 'Basic' }]
  } else {
    toSeedLevelOptions.value = []
  }
}

// 试验选择变化时，根据试验ID查找并记录试验名称
const handleTrialChange = (trialId) => {
  console.log('handleTrialChange called with:', trialId)
  console.log('Current trialList:', trialList.value)

  if (!trialId) {
    formData.trialId = ''
    formData.trialName = ''
    console.log('Cleared trial fields')
    return
  }

  const selected = trialList.value.find(item => item.trialId === trialId)
  console.log('Found trial:', selected)

  if (selected) {
    formData.trialId = selected.trialId
    formData.trialName = selected.trialName
    console.log('Updated formData:', {
      trialId: formData.trialId,
      trialName: formData.trialName
    })
  } else {
    console.warn('Trial not found:', trialId)
    console.warn('Available trials:', trialList.value.map(t => t.trialName))
    formData.trialId = ''
    formData.trialName = ''
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate()

    // 验证必填的ID字段
    if (!formData.varietyName) {
      ElMessage.warning('Please select a breeding batch first to populate variety information')
      console.error('varietyName is empty, breedBatchId:', formData.breedBatchId)
      return
    }
    if (!formData.landId) {
      ElMessage.warning('Please select a land first')
      console.error('landId is empty, landName:', formData.landName)
      return
    }

    submitting.value = true

    // 提交数据，包含从接口读取的完整字段
    const submitData = {
      produceBatchName: formData.produceBatchName,
      breedBatchId: formData.breedBatchId,
      breedBatchName: formData.breedBatchName,
      trialId: formData.trialId,
      trialName: formData.trialName,
      varietyId: formData.varietyId,
      varietyName: formData.varietyName,
      cropType: formData.cropType,
      time: formData.time,
      landId: formData.landId,
      landName: formData.landName,
      inputSeedQuantity: formData.inputSeedQuantity,
      fromSeedLevel: formData.fromSeedLevel,
      toSeedLevel: formData.toSeedLevel
    }

    console.log('Submitting data:', submitData)

    const res = await addBreedSeedProduce(submitData)
    if (res.code === 200) {
      ElMessage.success(t('common.submitSuccess'))
      emit('success')
    }
  } catch (error) {
    if (error !== false) {
      console.error('Failed to submit:', error)
      ElMessage.error(t('common.submitFailed'))
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
  loadBatchOptions()
  loadVarietyList()
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
</style>
