<template>
  <div class="form-container">
    <div class="info-card">
      <div class="card-header">
        <div class="card-title">
          <i class="ri-file-list-3-line"></i>
          <span>{{ $t('prebasicSeedProductionResult.add') }}</span>
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
          <!-- Production Selection -->
          <div class="form-section">
            <div class="section-title">
              <i class="ri-seedling-line"></i>
              {{ $t('prebasicSeedProductionResult.form.batchInfo') }}
            </div>

            <div class="form-row">
              <el-form-item :label="$t('prebasicSeedProductionResult.form.produceBatchId')" prop="produceBatchId">
                <el-select
                  v-model="formData.produceBatchId"
                  :placeholder="$t('prebasicSeedProductionResult.placeholder.produceBatchId')"
                  filterable
                  clearable
                  style="width: 100%"
                  @change="handleBatchChange"
                >
                  <el-option
                    v-for="batch in batchList"
                    :key="batch.produceBatchId"
                    :label="batch.produceBatchName"
                    :value="batch.produceBatchId"
                  >
                    <div style="display: flex; align-items: center;">
                      <span>{{ batch.produceBatchName }}</span>
                      <span style="color: #909399; font-size: 13px; margin-left: 8px;">(ID: {{ batch.produceBatchId }})</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item :label="$t('prebasicSeedProductionResult.form.varietyName')" prop="varietyName">
                <el-input v-model="formData.varietyName" disabled />
              </el-form-item>
            </div>

            <div class="form-row">
              <el-form-item :label="$t('prebasicSeedProductionResult.form.breedBatchName')" prop="breedBatchName">
                <el-input v-model="formData.breedBatchName" disabled />
              </el-form-item>

              <el-form-item :label="$t('prebasicSeedProductionResult.form.trialName')" prop="trialName">
                <el-input v-model="formData.trialName" disabled />
              </el-form-item>
            </div>
            
            <div class="form-row">
              <el-form-item :label="$t('prebasicSeedProductionResult.form.fromSeedLevel')" prop="fromSeedLevel">
                <el-input v-model="formData.fromSeedLevel" disabled />
              </el-form-item>
              
              <el-form-item :label="$t('prebasicSeedProductionResult.form.toSeedLevel')" prop="toSeedLevel">
                <el-input v-model="formData.toSeedLevel" disabled />
              </el-form-item>
            </div>
            
            <div class="form-row">
              <el-form-item :label="$t('prebasicSeedProductionResult.form.cropType')" prop="cropType">
                <el-input
                  v-model="cropTypeLabel"
                  disabled
                />
              </el-form-item>
            </div>
          </div>

          <!-- Result Data -->
          <div class="form-section">
            <div class="section-title">
              <i class="ri-scales-3-line"></i>
              {{ $t('prebasicSeedProductionResult.form.resultInfo') }}
            </div>

            <div class="form-row">
              <el-form-item :label="$t('prebasicSeedProductionResult.form.outputQuantity')" prop="outputQuantity">
                <el-input-number
                  v-model="formData.outputQuantity"
                  :min="0"
                  :precision="2"
                  style="width: 100%"
                  :placeholder="$t('prebasicSeedProductionResult.placeholder.outputQuantity')"
                />
              </el-form-item>
              
              <el-form-item :label="$t('prebasicSeedProductionResult.form.operator')">
                <el-input v-model="operatorName" disabled />
              </el-form-item>
            </div>
            
            <div class="form-row">
               <el-form-item :label="$t('prebasicSeedProductionResult.form.collectionDate')" prop="collectionDate">
                <el-date-picker
                  v-model="formData.collectionDate"
                  type="datetime"
                  :placeholder="$t('prebasicSeedProductionResult.placeholder.collectionDate')"
                  style="width: 100%"
                />
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
import { addPrebasicSeedProduceResult, getPrebasicSeedProduceList } from '@/api/prebasicSeed'
import { useUserStore } from '@/store'
import { useDict } from '@/hooks/useDict'

const { t } = useI18n()
const emit = defineEmits(['cancel', 'success'])
const userStore = useUserStore()

// 使用 useDict 获取作物类型字典
const { getLabelByValue } = useDict(['crop_type'])

const operatorName = computed(() => {
  const info = userStore.userInfo
  const user = info.user || info
  return user?.nickName || user?.userName || user?.name || '-'
})

// 计算属性：作物类型显示 label
const cropTypeLabel = computed(() => {
  return formData.cropType ? getLabelByValue('crop_type', formData.cropType) : ''
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
    { required: true, message: t('prebasicSeedProductionResult.rules.produceBatchIdRequired'), trigger: 'change' }
  ],
  outputQuantity: [
    { required: true, message: t('prebasicSeedProductionResult.rules.outputQuantityRequired'), trigger: 'blur' },
    { type: 'number', min: 0, message: t('prebasicSeedProductionResult.rules.outputQuantityMin'), trigger: 'blur' }
  ],
  collectionDate: [
    { required: true, message: t('prebasicSeedProductionResult.rules.collectionDateRequired'), trigger: 'change' }
  ]
}))

const loadBatchList = async () => {
  try {
    const res = await getPrebasicSeedProduceList({ pageNum: 1, pageSize: 1000 })
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
    
    const res = await addPrebasicSeedProduceResult(submitData)
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

  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .form-actions {
    flex-direction: column-reverse;
  }
  
  .form-actions button {
    width: 100%;
  }
}
</style>
