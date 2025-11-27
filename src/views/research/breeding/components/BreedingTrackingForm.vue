<template>
  <div class="form-container">
    <div class="form-header">
      <div class="form-title">
        <i class="ri-map-pin-line"></i>
        <span>{{ isView ? $t('research.breeding.tracking.detail') : (trackingData ? $t('research.breeding.tracking.edit') : $t('research.breeding.tracking.add')) }}</span>
      </div>
      <el-button @click="handleCancel">
        <i class="ri-close-line"></i>
        {{ $t('common.back') }}
      </el-button>
    </div>

    <div class="form-body">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="160px"
        :disabled="isView"
      >
        <!-- 基础信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.breeding.tracking.form.basicInfo') }}
          </div>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.tracking.form.trackingId')" prop="trackingId">
                <el-input v-model="formData.trackingId" :placeholder="$t('research.breeding.tracking.placeholder.trackingId')" disabled />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.tracking.form.batchId')" prop="batchId">
                <el-select v-model="formData.batchId" :placeholder="$t('research.breeding.tracking.placeholder.batchId')" style="width: 100%">
                  <el-option v-for="batch in batchList" :key="batch.batchId" :label="batch.batchName" :value="batch.batchId" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.tracking.form.stageName')" prop="stageName">
                <el-select v-model="formData.stageName" :placeholder="$t('research.breeding.tracking.placeholder.stageName')" style="width: 100%">
                  <el-option v-for="stage in stageNames" :key="stage.value" :label="stage.label" :value="stage.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.tracking.form.stageCompletionDate')" prop="stageCompletionDate">
                <el-date-picker
                  v-model="formData.stageCompletionDate"
                  type="date"
                  :placeholder="$t('research.breeding.tracking.placeholder.stageCompletionDate')"
                  style="width: 100%"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 跟踪信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-map-pin-2-line"></i>
            {{ $t('research.breeding.tracking.form.trackingInfo') }}
          </div>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.tracking.form.location')" prop="location">
                <el-input v-model="formData.location" :placeholder="$t('research.breeding.tracking.placeholder.location')" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.tracking.form.coordinates')" prop="coordinates">
                <el-input v-model="formData.coordinates" :placeholder="$t('research.breeding.tracking.placeholder.coordinates')">
                  <template #prepend>
                    <i class="ri-map-pin-line"></i>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 产量信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-plant-line"></i>
            {{ $t('research.breeding.tracking.form.yieldInfo') }}
          </div>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.tracking.form.expectedYield')" prop="expectedYield">
                <el-input v-model.number="formData.expectedYield" :placeholder="$t('research.breeding.tracking.placeholder.expectedYield')" type="number" step="0.1">
                  <template #append>kg</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.tracking.form.actualYield')" prop="actualYield">
                <el-input v-model.number="formData.actualYield" :placeholder="$t('research.breeding.tracking.placeholder.actualYield')" type="number" step="0.1">
                  <template #append>kg</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 质量信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-shield-check-line"></i>
            {{ $t('research.breeding.tracking.form.qualityInfo') }}
          </div>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.tracking.form.fieldInspectionScore')" prop="fieldInspectionScore">
                <el-input v-model.number="formData.fieldInspectionScore" :placeholder="$t('research.breeding.tracking.placeholder.fieldInspectionScore')" type="number" step="0.1">
                  <template #append>{{ $t('research.breeding.tracking.placeholder.fieldInspectionScore') }}</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item :label="$t('research.breeding.tracking.form.diseaseObservation')">
            <el-input
              v-model="formData.diseaseObservation"
              type="textarea"
              :rows="4"
              :placeholder="$t('research.breeding.tracking.placeholder.diseaseObservation')"
            />
          </el-form-item>
        </div>

        <!-- 记录信息 -->
        <div v-if="isView && trackingData" class="form-section">
          <div class="section-title">
            <i class="ri-user-line"></i>
            记录信息
          </div>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.tracking.form.recorder')">
                <el-input v-model="formData.recorder" disabled />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.tracking.form.recordTime')">
                <el-input v-model="formData.recordTime" disabled />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.tracking.form.updateTime')">
                <el-input v-model="formData.updateTime" disabled />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 操作按钮 -->
        <div v-if="!isView" class="form-actions">
          <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitting">
            {{ $t('research.breeding.tracking.actions.submit') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { addBreedingTracking, editBreedingTracking } from '@/api/enterprise'
import { mockBatchList, mockStageNames } from '@/mock/breedingData'

const { t } = useI18n()
const emit = defineEmits(['cancel', 'success'])

const props = defineProps({
  trackingData: {
    type: Object,
    default: null
  },
  isView: {
    type: Boolean,
    default: false
  }
})

// 表单引用
const formRef = ref(null)
const submitting = ref(false)

// 辅助数据
const batchList = ref(mockBatchList)
const stageNames = ref(mockStageNames)

// 表单数据
const formData = reactive({
  trackingId: 'TRK' + new Date().getTime(),
  batchId: '',
  stageName: '',
  location: '',
  coordinates: '',
  expectedYield: null,
  actualYield: null,
  fieldInspectionScore: null,
  diseaseObservation: '',
  stageCompletionDate: '',
  recorder: '',
  recordTime: '',
  updateTime: ''
})

// 自定义验证器 - 产量格式
const validateYield = (rule, value, callback) => {
  if (value && (value < 0 || isNaN(value))) {
    callback(new Error(rule.field === 'expectedYield'
      ? t('research.breeding.tracking.rules.expectedYieldFormat')
      : t('research.breeding.tracking.rules.actualYieldFormat')))
  } else {
    callback()
  }
}

// 自定义验证器 - 田间评分格式
const validateScore = (rule, value, callback) => {
  if (value && (value < 0 || value > 5 || isNaN(value))) {
    callback(new Error(t('research.breeding.tracking.rules.fieldInspectionScoreFormat')))
  } else {
    callback()
  }
}

// 表单验证规则
const formRules = computed(() => ({
  batchId: [
    { required: true, message: t('research.breeding.tracking.rules.batchIdRequired'), trigger: 'change' }
  ],
  stageName: [
    { required: true, message: t('research.breeding.tracking.rules.stageNameRequired'), trigger: 'change' }
  ],
  location: [
    { required: true, message: t('research.breeding.tracking.rules.locationRequired'), trigger: 'blur' }
  ],
  expectedYield: [
    { required: true, message: t('research.breeding.tracking.rules.expectedYieldRequired'), trigger: 'blur' },
    { validator: validateYield, trigger: 'blur' }
  ],
  actualYield: [
    { validator: validateYield, trigger: 'blur' }
  ],
  fieldInspectionScore: [
    { validator: validateScore, trigger: 'blur' }
  ]
}))

// 初始化表单数据
const initFormData = () => {
  if (props.trackingData) {
    Object.assign(formData, props.trackingData)
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    submitting.value = true

    const submitData = { ...formData }

    // 调用API保存数据
    let res
    if (props.trackingData && props.trackingData.trackingId) {
      // 编辑模式
      submitData.trackingId = props.trackingData.trackingId
      res = await editBreedingTracking(submitData)
    } else {
      // 新增模式
      res = await addBreedingTracking(submitData)
    }

    if (res.code === 200) {
      ElMessage.success(props.trackingData ? t('research.breeding.tracking.editSuccess') : t('research.breeding.tracking.addSuccess'))
      emit('success')
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    console.error('Form submission failed:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    submitting.value = false
  }
}

// 取消
const handleCancel = () => {
  emit('cancel')
}

// 初始化
onMounted(() => {
  initFormData()
})
</script>

<style scoped>
.form-container {
  background: white;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e8f5e9;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
}

.form-title {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-title i {
  font-size: 22px;
}

.form-body {
  padding: 24px;
}

.form-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e8f5e9;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 20px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #e8f5e9;
}

/* 响应式 */
@media screen and (max-width: 768px) {
  .form-header {
    padding: 16px;
  }

  .form-body {
    padding: 16px;
  }

  :deep(.el-form-item__label) {
    width: 100% !important;
    text-align: left;
    margin-bottom: 8px;
  }

  :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions .el-button {
    width: 100%;
  }
}
</style>
