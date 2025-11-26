<template>
  <div class="form-container">
    <div class="form-header">
      <div class="form-title">
        <i class="ri-flask-line"></i>
        <span>{{ isView ? $t('research.breeding.plan.detail') : (planData ? $t('research.breeding.plan.edit') : $t('research.breeding.plan.add')) }}</span>
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
        <!-- 计划基本信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.breeding.plan.form.basicInfo') }}
          </div>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.plan.form.planName')" prop="planName">
                <el-input v-model="formData.planName" :placeholder="$t('research.breeding.plan.placeholder.planName')" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.plan.form.breedingYear')" prop="breedingYear">
                <el-date-picker
                  v-model="formData.breedingYear"
                  type="year"
                  :placeholder="$t('research.breeding.plan.placeholder.breedingYear')"
                  style="width: 100%"
                  value-format="YYYY"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.plan.form.batchId')" prop="batchId">
                <el-input v-model="formData.batchId" :placeholder="$t('research.breeding.plan.placeholder.batchId')" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.plan.form.plantingBase')" prop="plantingBase">
                <el-input v-model="formData.plantingBase" :placeholder="$t('research.breeding.plan.placeholder.plantingBase')" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.plan.form.cropType')" prop="cropType">
                <el-select v-model="formData.cropType" :placeholder="$t('research.breeding.plan.placeholder.cropType')" style="width: 100%">
                  <el-option v-for="crop in cropTypes" :key="crop.value" :label="crop.label" :value="crop.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.plan.form.varietyName')" prop="varietyName">
                <el-input v-model="formData.varietyName" :placeholder="$t('research.breeding.plan.placeholder.varietyName')" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.plan.form.propagationLevel')" prop="propagationLevel">
                <el-select v-model="formData.propagationLevel" :placeholder="$t('research.breeding.plan.placeholder.propagationLevel')" style="width: 100%">
                  <el-option v-for="level in propagationLevels" :key="level.value" :label="level.label" :value="level.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.plan.form.parentSeedSource')" prop="parentSeedSource">
                <el-input v-model="formData.parentSeedSource" :placeholder="$t('research.breeding.plan.placeholder.parentSeedSource')" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.plan.form.personInCharge')" prop="personInCharge">
                <el-input v-model="formData.personInCharge" :placeholder="$t('research.breeding.plan.placeholder.personInCharge')" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.plan.form.startDate')" prop="startDate">
                <el-date-picker
                  v-model="formData.startDate"
                  type="date"
                  :placeholder="$t('research.breeding.plan.placeholder.startDate')"
                  style="width: 100%"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item :label="$t('research.breeding.plan.form.endDate')" prop="endDate">
                <el-date-picker
                  v-model="formData.endDate"
                  type="date"
                  :placeholder="$t('research.breeding.plan.placeholder.endDate')"
                  style="width: 100%"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item :label="$t('research.breeding.plan.form.breedingGoal')" prop="breedingGoal">
            <el-input
              v-model="formData.breedingGoal"
              type="textarea"
              :rows="4"
              :placeholder="$t('research.breeding.plan.placeholder.breedingGoal')"
            />
          </el-form-item>

          <el-form-item :label="$t('research.breeding.plan.form.remarks')">
            <el-input
              v-model="formData.remarks"
              type="textarea"
              :rows="3"
              :placeholder="$t('research.breeding.plan.placeholder.remarks')"
            />
          </el-form-item>
        </div>

        <!-- 操作按钮 -->
        <div v-if="!isView" class="form-actions">
          <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitting">
            {{ $t('research.breeding.plan.actions.submit') }}
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
import { mockCropTypes, mockPropagationLevels } from '@/mock/breedingData'

const { t } = useI18n()
const emit = defineEmits(['cancel', 'success'])

const props = defineProps({
  planData: {
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
const cropTypes = ref(mockCropTypes)
const propagationLevels = computed(() => {
  return mockPropagationLevels.map(item => ({
    value: item.value,
    label: item.label
  }))
})

// 表单数据
const formData = reactive({
  planName: '',
  breedingYear: '',
  batchId: '',
  plantingBase: '',
  cropType: '',
  varietyName: '',
  propagationLevel: '',
  parentSeedSource: '',
  personInCharge: '',
  startDate: '',
  endDate: '',
  breedingGoal: '',
  remarks: ''
})

// 自定义验证器 - 结束时间必须晚于开始时间
const validateEndDate = (rule, value, callback) => {
  if (value && formData.startDate) {
    if (new Date(value) <= new Date(formData.startDate)) {
      callback(new Error(t('research.breeding.plan.rules.endDateAfterStart')))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 表单验证规则
const formRules = computed(() => ({
  planName: [
    { required: true, message: t('research.breeding.plan.rules.planNameRequired'), trigger: 'blur' }
  ],
  breedingYear: [
    { required: true, message: t('research.breeding.plan.rules.breedingYearRequired'), trigger: 'change' }
  ],
  batchId: [
    { required: true, message: t('research.breeding.plan.rules.batchIdRequired'), trigger: 'blur' }
  ],
  plantingBase: [
    { required: true, message: t('research.breeding.plan.rules.plantingBaseRequired'), trigger: 'blur' }
  ],
  cropType: [
    { required: true, message: t('research.breeding.plan.rules.cropTypeRequired'), trigger: 'change' }
  ],
  varietyName: [
    { required: true, message: t('research.breeding.plan.rules.varietyNameRequired'), trigger: 'blur' }
  ],
  propagationLevel: [
    { required: true, message: t('research.breeding.plan.rules.propagationLevelRequired'), trigger: 'change' }
  ],
  parentSeedSource: [
    { required: true, message: t('research.breeding.plan.rules.parentSeedSourceRequired'), trigger: 'blur' }
  ],
  personInCharge: [
    { required: true, message: t('research.breeding.plan.rules.personInChargeRequired'), trigger: 'blur' }
  ],
  startDate: [
    { required: true, message: t('research.breeding.plan.rules.startDateRequired'), trigger: 'change' }
  ],
  endDate: [
    { required: true, message: t('research.breeding.plan.rules.endDateRequired'), trigger: 'change' },
    { validator: validateEndDate, trigger: 'change' }
  ],
  breedingGoal: [
    { required: true, message: t('research.breeding.plan.rules.breedingGoalRequired'), trigger: 'blur' }
  ]
}))

// 初始化表单数据
const initFormData = () => {
  if (props.planData) {
    Object.assign(formData, props.planData)
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    submitting.value = true

    // TODO: 调用API保存数据
    // if (props.planData) {
    //   await updateBreedingPlan(props.planData.planId, formData)
    // } else {
    //   await addBreedingPlan(formData)
    // }

    // 模拟API调用
    setTimeout(() => {
      ElMessage.success(props.planData ? t('research.breeding.plan.editSuccess') : t('research.breeding.plan.addSuccess'))
      submitting.value = false
      emit('success')
    }, 1000)
  } catch (error) {
    console.error('Form validation failed:', error)
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
