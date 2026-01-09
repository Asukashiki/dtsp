<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleCancel">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('basicSeedProductionResult.add') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="140px"
          v-loading="submitting">
          
          <!-- 批次信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-seedling-line"></i>
                <span>{{ $t('basicSeedProductionResult.form.batchInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('basicSeedProductionResult.form.produceBatchId')" prop="produceBatchId">
                    <el-select
                      v-model="formData.produceBatchId"
                      :placeholder="$t('basicSeedProductionResult.placeholder.produceBatchId')"
                      filterable
                      clearable
                      style="width: 100%"
                      @change="handleBatchChange">
                      <el-option
                        v-for="batch in batchList"
                        :key="batch.produceBatchId"
                        :label="batch.produceBatchName"
                        :value="batch.produceBatchId">
                        <div class="select-option-content">
                          <span>{{ batch.produceBatchName }}</span>
                          <span class="option-desc">(ID: {{ batch.produceBatchId }})</span>
                        </div>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('basicSeedProductionResult.form.varietyName')" prop="varietyName">
                    <el-input v-model="formData.varietyName" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('basicSeedProductionResult.form.breedBatchName')" prop="breedBatchName">
                    <el-input v-model="formData.breedBatchName" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('basicSeedProductionResult.form.trialName')" prop="trialName">
                    <el-input v-model="formData.trialName" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('basicSeedProductionResult.form.fromSeedLevel')" prop="fromSeedLevel">
                    <el-input v-model="formData.fromSeedLevel" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('basicSeedProductionResult.form.toSeedLevel')" prop="toSeedLevel">
                    <el-input v-model="formData.toSeedLevel" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('basicSeedProductionResult.form.cropType')" prop="cropType">
                    <el-input v-model="cropTypeLabel" disabled />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 结果数据 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-scales-3-line"></i>
                <span>{{ $t('basicSeedProductionResult.form.resultInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('basicSeedProductionResult.form.outputQuantity')" prop="outputQuantity">
                    <el-input-number
                      v-model="formData.outputQuantity"
                      :min="0"
                      :precision="2"
                      style="width: 100%"
                      controls-position="right"
                      :placeholder="$t('basicSeedProductionResult.placeholder.outputQuantity')" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('basicSeedProductionResult.form.collectionDate')" prop="collectionDate">
                    <el-date-picker
                      v-model="formData.collectionDate"
                      type="datetime"
                      :placeholder="$t('basicSeedProductionResult.placeholder.collectionDate')"
                      style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('basicSeedProductionResult.form.operator')">
                    <el-input v-model="operatorName" disabled />
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
import { addBasicSeedProduceResult, getBasicSeedProduceList } from '@/api/basicSeed'
import { useUserStore } from '@/store'
import { useDict } from '@/hooks/useDict'

const { t } = useI18n()
const emit = defineEmits(['cancel', 'success'])
const userStore = useUserStore()

// 使用 useDict 获取作物类型字典
const { getLabelByValue } = useDict(['crop_type'])

// 计算属性：作物类型显示 label
const cropTypeLabel = computed(() => {
  return formData.cropType ? getLabelByValue('crop_type', formData.cropType) : ''
})

const operatorName = computed(() => {
  const info = userStore.userInfo
  const user = info.user || info
  return user?.nickName || user?.userName || user?.name || '-'
})

const formRef = ref(null)
const submitting = ref(false)
const batchList = ref([])

const formData = reactive({
  produceBatchId: '',
  outputQuantity: null,
  collectionDate: new Date(),
  // Auto-filled for display
  produceBatchName: '',
  varietyName: '',
  breedBatchName: '',
  trialName: '',
  fromSeedLevel: '',
  toSeedLevel: '',
  breedBatchId: '',
  varietyId: '',
  cropType: ''
})

const rules = computed(() => ({
  produceBatchId: [
    { required: true, message: t('basicSeedProductionResult.rules.produceBatchIdRequired'), trigger: 'change' }
  ],
  outputQuantity: [
    { required: true, message: t('basicSeedProductionResult.rules.outputQuantityRequired'), trigger: 'blur' },
    { type: 'number', min: 0, message: t('basicSeedProductionResult.rules.outputQuantityMin'), trigger: 'blur' }
  ],
  collectionDate: [
    { required: true, message: t('basicSeedProductionResult.rules.collectionDateRequired'), trigger: 'change' }
  ]
}))

const loadBatchList = async () => {
  try {
    const res = await getBasicSeedProduceList({ pageNum: 1, pageSize: 1000 })
    if (res.code === 200) {
      // Filter out batches with produceStatus === 'Finished' or flowStatus === 'S10' (Voided)
      batchList.value = (res.rows || []).filter(batch => 
        batch.produceStatus !== 'Finished' && batch.flowStatus !== 'S10'
      )
    }
  } catch (error) {
    console.error('Failed to load batches:', error)
  }
}

const handleBatchChange = (batchId) => {
  if (!batchId) {
    formData.produceBatchName = ''
    formData.varietyName = ''
    formData.breedBatchName = ''
    formData.trialName = ''
    formData.fromSeedLevel = ''
    formData.toSeedLevel = ''
    formData.breedBatchId = ''
    formData.varietyId = ''
    formData.cropType = ''
    return
  }
  
  const batch = batchList.value.find(b => b.produceBatchId === batchId)
  if (batch) {
    formData.produceBatchName = batch.produceBatchName
    formData.varietyName = batch.varietyName
    formData.breedBatchName = batch.breedBatchName
    formData.trialName = batch.trialName
    formData.fromSeedLevel = batch.fromSeedLevel
    formData.toSeedLevel = batch.toSeedLevel
    formData.breedBatchId = batch.breedBatchId || ''
    formData.varietyId = batch.varietyId || ''
    formData.cropType = batch.cropType || ''
  }
}

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    submitting.value = true
    
    // Format date manually to YYYY-MM-DD HH:mm:ss
    const date = new Date(formData.collectionDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

    const submitData = {
      produceBatchId: formData.produceBatchId,
      produceBatchName: formData.produceBatchName,
      varietyName: formData.varietyName,
      breedBatchName: formData.breedBatchName,
      trialName: formData.trialName,
      fromSeedLevel: formData.fromSeedLevel,
      toSeedLevel: formData.toSeedLevel,
      breedBatchId: formData.breedBatchId,
      varietyId: formData.varietyId,
      cropType: formData.cropType,
      outputQuantity: formData.outputQuantity,
      collectionDate: formattedDate,
      operator: operatorName.value
    }
    
    const res = await addBasicSeedProduceResult(submitData)
    if (res.code === 200) {
      ElMessage.success(t('common.submitSuccess'))
      emit('success')
    }
  } catch (error) {
    console.error('Submit failed', error)
    if (error !== false) ElMessage.error(t('common.submitFailed'))
  } finally {
    submitting.value = false
  }
}

const handleCancel = () => {
  emit('cancel')
}

onMounted(() => {
  loadBatchList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.select-option-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .option-desc {
    color: #909399;
    font-size: 13px;
    margin-left: 8px;
  }
}
</style>

