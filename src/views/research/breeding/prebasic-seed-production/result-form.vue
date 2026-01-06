<template>
  <div class="result-form-container">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="180px"
      label-position="right"
    >
      <div class="form-section">
        <div class="form-row">
          <el-form-item :label="$t('prebasicSeedProductionResult.form.collectionDate')" prop="collectionDate">
            <el-date-picker
              v-model="formData.collectionDate"
              type="date"
              :placeholder="$t('prebasicSeedProductionResult.placeholder.collectionDate')"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
            />
          </el-form-item>

          <el-form-item :label="$t('prebasicSeedProductionResult.form.yieldPerArea')" prop="yieldPerArea">
            <el-input-number
              v-model="formData.yieldPerArea"
              :placeholder="$t('prebasicSeedProductionResult.placeholder.yieldPerArea')"
              :min="0"
              :precision="2"
              style="width: 100%"
            />
            <span class="unit-text">kg/ha</span>
          </el-form-item>
        </div>

        <div class="form-row">
          <el-form-item :label="$t('prebasicSeedProductionResult.form.totalYield')" prop="totalYield">
            <el-input-number
              v-model="formData.totalYield"
              :placeholder="$t('prebasicSeedProductionResult.placeholder.totalYield')"
              :min="0"
              :precision="2"
              style="width: 100%"
            />
            <span class="unit-text">kg</span>
          </el-form-item>

          <el-form-item :label="$t('prebasicSeedProductionResult.form.qualityGrade')" prop="qualityGrade">
            <el-select
              v-model="formData.qualityGrade"
              :placeholder="$t('prebasicSeedProductionResult.placeholder.qualityGrade')"
              style="width: 100%"
            >
              <el-option label="A" value="A" />
              <el-option label="B" value="B" />
              <el-option label="C" value="C" />
            </el-select>
          </el-form-item>
        </div>

        <div class="form-row">
          <el-form-item :label="$t('prebasicSeedProductionResult.form.moistureContent')" prop="moistureContent">
            <el-input-number
              v-model="formData.moistureContent"
              :placeholder="$t('prebasicSeedProductionResult.placeholder.moistureContent')"
              :min="0"
              :max="100"
              :precision="2"
              style="width: 100%"
            />
            <span class="unit-text">%</span>
          </el-form-item>

          <el-form-item :label="$t('prebasicSeedProductionResult.form.purity')" prop="purity">
            <el-input-number
              v-model="formData.purity"
              :placeholder="$t('prebasicSeedProductionResult.placeholder.purity')"
              :min="0"
              :max="100"
              :precision="2"
              style="width: 100%"
            />
            <span class="unit-text">%</span>
          </el-form-item>
        </div>

        <div class="form-row">
          <el-form-item :label="$t('prebasicSeedProductionResult.form.germinationRate')" prop="germinationRate">
            <el-input-number
              v-model="formData.germinationRate"
              :placeholder="$t('prebasicSeedProductionResult.placeholder.germinationRate')"
              :min="0"
              :max="100"
              :precision="2"
              style="width: 100%"
            />
            <span class="unit-text">%</span>
          </el-form-item>

          <div></div>
        </div>

        <el-form-item :label="$t('prebasicSeedProductionResult.form.remarks')" prop="remarks">
          <el-input
            v-model="formData.remarks"
            type="textarea"
            :rows="3"
            :placeholder="$t('prebasicSeedProductionResult.placeholder.remarks')"
          />
        </el-form-item>
      </div>

      <div class="form-actions">
        <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="submitting">
          {{ $t('common.submit') }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { addPrebasicSeedProduceResult } from '@/api/prebasicSeed'

const { t } = useI18n()

const props = defineProps({
  produceBatchId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['cancel', 'success'])

// 表单状态
const formRef = ref(null)
const submitting = ref(false)

// 表单数据
const formData = reactive({
  produceBatchId: props.produceBatchId,
  collectionDate: '',
  yieldPerArea: null,
  totalYield: null,
  qualityGrade: '',
  moistureContent: null,
  purity: null,
  germinationRate: null,
  remarks: ''
})

// 表单验证规则
const rules = computed(() => ({
  collectionDate: [
    { required: true, message: t('prebasicSeedProductionResult.rules.collectionDateRequired'), trigger: 'change' }
  ],
  yieldPerArea: [
    { required: true, message: t('prebasicSeedProductionResult.rules.yieldPerAreaRequired'), trigger: 'blur' },
    { type: 'number', min: 0.01, message: t('prebasicSeedProductionResult.rules.yieldPerAreaMin'), trigger: 'blur' }
  ],
  totalYield: [
    { required: true, message: t('prebasicSeedProductionResult.rules.totalYieldRequired'), trigger: 'blur' },
    { type: 'number', min: 0.01, message: t('prebasicSeedProductionResult.rules.totalYieldMin'), trigger: 'blur' }
  ],
  qualityGrade: [
    { required: true, message: t('prebasicSeedProductionResult.rules.qualityGradeRequired'), trigger: 'change' }
  ],
  moistureContent: [
    { required: true, message: t('prebasicSeedProductionResult.rules.moistureContentRequired'), trigger: 'blur' },
    { type: 'number', min: 0, max: 100, message: t('prebasicSeedProductionResult.rules.moistureContentRange'), trigger: 'blur' }
  ],
  purity: [
    { required: true, message: t('prebasicSeedProductionResult.rules.purityRequired'), trigger: 'blur' },
    { type: 'number', min: 0, max: 100, message: t('prebasicSeedProductionResult.rules.purityRange'), trigger: 'blur' }
  ],
  germinationRate: [
    { required: true, message: t('prebasicSeedProductionResult.rules.germinationRateRequired'), trigger: 'blur' },
    { type: 'number', min: 0, max: 100, message: t('prebasicSeedProductionResult.rules.germinationRateRange'), trigger: 'blur' }
  ]
}))

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate()

    submitting.value = true

    const res = await addPrebasicSeedProduceResult(formData)
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
</script>

<style scoped>
.result-form-container {
  padding: 20px 0;
}

.form-section {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-row > .el-form-item {
  flex: 1;
  margin-bottom: 0;
  position: relative;
}

.unit-text {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #909399;
  font-size: 14px;
  pointer-events: none;
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
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>
