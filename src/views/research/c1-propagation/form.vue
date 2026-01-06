<template>
  <div class="form-container">
    <div class="info-card">
      <div class="card-header">
        <div class="card-title">
          <i class="ri-add-circle-line"></i>
          <span>{{ isEdit ? $t('research.c1Propagation.edit') : $t('research.c1Propagation.add') }}</span>
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
          label-width="280px"
          label-position="right"
        >
          <!-- 机构信息 -->
          <div class="form-section">
            <div class="section-title">
              <i class="ri-building-line"></i>
              {{ $t('research.c1Propagation.form.basicInfo') }}
            </div>

            <el-form-item :label="$t('research.c1Propagation.form.applicantOrgType')" prop="applicantOrgType">
              <el-select
                v-model="formData.applicantOrgType"
                :placeholder="$t('research.c1Propagation.placeholder.applicantOrgType')"
                style="width: 100%"
                @change="handleOrgTypeChange"
              >
                <el-option label="Union" value="union" />
                <el-option label="OSE" value="ose" />
                <el-option label="Private Multiplier" value="privateMultiplier" />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('research.c1Propagation.form.applicantOrgName')" prop="applicantOrgName">
              <el-input
                v-model="formData.applicantOrgName"
                :placeholder="$t('research.c1Propagation.placeholder.applicantOrgName')"
              />
            </el-form-item>

            <el-form-item :label="$t('research.c1Propagation.form.applicantOrgId')" prop="applicantOrgId">
              <el-input
                v-model="formData.applicantOrgId"
                :placeholder="$t('research.c1Propagation.placeholder.applicantOrgId')"
              />
            </el-form-item>
          </div>

          <!-- 繁殖信息 -->
          <div class="form-section">
            <div class="section-title">
              <i class="ri-plant-line"></i>
              {{ $t('research.c1Propagation.form.propagationInfo') }}
            </div>

            <el-form-item :label="$t('research.c1Propagation.form.propagationBatchId')" prop="propagationBatchId">
              <BasicSeedSelector
                ref="seedSelectorRef"
                v-model="formData.propagationBatchId"
                :placeholder="$t('research.c1Propagation.selectBasicSeed')"
                @seed-selected="handleSeedSelected"
              />
            </el-form-item>

            <el-form-item :label="$t('research.c1Propagation.form.cropType')" prop="cropType">
              <el-select
                v-model="formData.cropType"
                :placeholder="$t('research.c1Propagation.placeholder.cropType')"
                disabled
                style="width: 100%"
              >
                <el-option
                  v-for="item in options.crop_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('research.c1Propagation.form.varietyName')" prop="varietyName">
              <el-input
                v-model="formData.varietyName"
                :placeholder="$t('research.c1Propagation.placeholder.varietyName')"
                disabled
              />
            </el-form-item>

            <!-- <el-form-item :label="$t('research.c1Propagation.form.varietyCode')">
              <el-input
                v-model="formData.varietyCode"
                :placeholder="$t('research.c1Propagation.placeholder.varietyCode')"
                disabled
              />
            </el-form-item>

            <el-form-item :label="$t('research.c1Propagation.form.species')">
              <el-input
                v-model="formData.species"
                :placeholder="$t('research.c1Propagation.placeholder.species')"
              />
            </el-form-item> -->

            <el-form-item :label="$t('research.c1Propagation.form.applyDate')">
              <el-date-picker
                v-model="formData.applyDate"
                type="date"
                :placeholder="$t('research.c1Propagation.placeholder.applyDate')"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>

            <el-form-item :label="$t('research.c1Propagation.form.applyDescription')">
              <el-input
                v-model="formData.applyDescription"
                type="textarea"
                :rows="4"
                :placeholder="$t('research.c1Propagation.placeholder.applyDescription')"
              />
            </el-form-item>

            <el-form-item :label="$t('research.c1Propagation.form.demandQuantity')" prop="demandQuantity">
              <div style="display: flex; align-items: center; width: 100%;">
                <el-input-number
                  v-model="formData.demandQuantity"
                  :placeholder="$t('research.c1Propagation.placeholder.demandQuantity')"
                  controls-position="right"
                  style="flex: 1; max-width: 300px;"
                  :min="1"
                  :max="selectedSeed ? maxAvailableQuantity : undefined"
                  :disabled="!selectedSeed"
                />
                <span v-if="selectedSeed" style="margin-left: 12px; color: #909399; font-size: 14px; white-space: nowrap;">
                  {{ $t('research.c1Propagation.unit') }}: kg
                  <span style="margin-left: 8px; color: #67c23a; font-weight: 500;">
                    {{ $t('research.c1Propagation.maxAvailable') }}: {{ maxAvailableQuantity }} kg
                  </span>
                </span>
                <span v-else style="margin-left: 12px; color: #f56c6c; font-size: 14px;">
                  {{ $t('research.c1Propagation.selectBasicSeed') }}
                </span>
              </div>
            </el-form-item>

            <el-form-item :label="$t('research.c1Propagation.form.fromSeedType')" prop="fromSeedType">
              <el-select
                v-model="formData.fromSeedType"
                :placeholder="$t('research.c1Propagation.placeholder.fromSeedType')"
                style="width: 100%"
              >
                <el-option label="Pre-Basic" value="Pre-Basic" />
                <el-option label="Basic" value="Basic" />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('research.c1Propagation.form.toSeedType')" prop="toSeedType">
              <el-select
                v-model="formData.toSeedType"
                :placeholder="$t('research.c1Propagation.placeholder.toSeedType')"
                style="width: 100%"
              >
                <el-option label="Basic" value="Basic" />
                <el-option label="C1" value="C1" />
              </el-select>
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
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { addC1Propagation, updateC1Propagation } from '@/api/c1Propagation'
import { getUserInfo } from '@/utils/auth'
import { useDict } from '@/hooks/useDict'
import BasicSeedSelector from './BasicSeedSelector.vue'

const { t } = useI18n()

// 使用 useDict hook 获取字典数据
const { options } = useDict(['crop_type'])

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false
  },
  editData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['cancel', 'success'])

// 表单状态
const formRef = ref(null)
const seedSelectorRef = ref(null)
const submitting = ref(false)
const selectedSeed = ref(null)
const maxAvailableQuantity = ref(999999) // 初始化为一个大值，避免 min > max 错误

// 表单数据
const formData = reactive({
  id: '',
  applicantOrgType: '',
  applicantOrgName: '',
  applicantOrgId: '',
  propagationBatchId: '',
  sourceType: '', // 新增：数据来源类型
  cropType: '',
  varietyName: '',
  varietyCode: '',
  species: '',
  applyDate: '',
  applyDescription: '',
  demandQuantity: null,
  fromSeedType: 'Basic', // 默认为 Basic
  toSeedType: 'C1' // 默认为 C1
})

// 作物类型映射
const cropTypeMap = {
  'wheat': 'Wheat',
  'corn': 'Maize',
  'rice': 'Rice',
  'soybean': 'Soybean',
  'cotton': 'Cotton',
  'teff': 'Teff',
  'sorghum': 'Sorghum',
  'barley': 'Barley'
}

// 表单验证规则
const rules = computed(() => ({
  applicantOrgType: [
    { required: true, message: t('research.c1Propagation.rules.applicantOrgTypeRequired'), trigger: 'change' }
  ],
  applicantOrgName: [
    { required: true, message: t('research.c1Propagation.rules.applicantOrgNameRequired'), trigger: 'blur' }
  ],
  applicantOrgId: [
    { required: true, message: t('research.c1Propagation.rules.applicantOrgIdRequired'), trigger: 'blur' }
  ],
  propagationBatchId: [
    { required: true, message: t('research.c1Propagation.rules.propagationBatchIdRequired'), trigger: 'change' }
  ],
  cropType: [
    { required: true, message: t('research.c1Propagation.rules.cropTypeRequired'), trigger: 'change' }
  ],
  varietyName: [
    { required: true, message: t('research.c1Propagation.rules.varietyNameRequired'), trigger: 'blur' }
  ],
  demandQuantity: [
    { required: true, message: t('research.c1Propagation.rules.demandQuantityRequired'), trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error(t('research.c1Propagation.rules.demandQuantityRequired')))
        } else if (value < 1) {
          callback(new Error(t('research.c1Propagation.rules.demandQuantityMinRequired')))
        } else if (selectedSeed.value && value > maxAvailableQuantity.value) {
          callback(new Error(t('research.c1Propagation.rules.demandQuantityExceedMax', { max: maxAvailableQuantity.value })))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  fromSeedType: [
    { required: true, message: t('research.c1Propagation.rules.fromSeedTypeRequired'), trigger: 'change' }
  ],
  toSeedType: [
    { required: true, message: t('research.c1Propagation.rules.toSeedTypeRequired'), trigger: 'change' }
  ]
}))

// 处理种子选择
const handleSeedSelected = (seed) => {
  selectedSeed.value = seed

  if (seed) {
    // 提取 batchId 和 sourceType
    const [batchId, sourceType] = formData.propagationBatchId.split('|')

    // 更新表单数据
    formData.propagationBatchId = batchId
    formData.sourceType = sourceType
    formData.cropType = seed.cropType || ''
    formData.varietyName = seed.varietyName || ''
    formData.varietyCode = seed.varietyCode || ''

    // 设置最大可用数量
    maxAvailableQuantity.value = seed.availableQuantity || 0

    // 如果当前需求数量超过可用数量，自动调整
    if (formData.demandQuantity && formData.demandQuantity > maxAvailableQuantity.value) {
      formData.demandQuantity = maxAvailableQuantity.value
    }
  } else {
    // 清空选择
    formData.propagationBatchId = ''
    formData.sourceType = ''
    formData.cropType = ''
    formData.varietyName = ''
    formData.varietyCode = ''
    maxAvailableQuantity.value = 999999 // 重置为大值
    formData.demandQuantity = null
  }
}

// 移除旧的批次加载和变更逻辑
// const loadBatchList = ...
// const handleBatchChange = ...

// 监听编辑数据变化
watch(() => props.editData, (newVal) => {
  if (newVal && props.isEdit) {
    Object.keys(formData).forEach(key => {
      if (newVal[key] !== undefined) {
        formData[key] = newVal[key]
      }
    })

    // 如果是编辑模式，需要组合 batchId 和 sourceType
    if (newVal.propagationBatchId && newVal.sourceType) {
      formData.propagationBatchId = `${newVal.propagationBatchId}|${newVal.sourceType}`

      // 标记为已选择种子，避免输入框被禁用
      selectedSeed.value = {
        batchId: newVal.propagationBatchId,
        sourceType: newVal.sourceType
      }
    }
  }
}, { immediate: true })

// 初始化（不再需要加载批次列表）
onMounted(() => {
  // loadBatchList() // 已移除
})

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    submitting.value = true

    const submitData = { ...formData }

    // 确保 batchId 和 sourceType 正确分离
    if (submitData.propagationBatchId && submitData.propagationBatchId.includes('|')) {
      const [batchId, sourceType] = submitData.propagationBatchId.split('|')
      submitData.propagationBatchId = batchId
      submitData.sourceType = sourceType
    }

    let res
    if (props.isEdit) {
      res = await updateC1Propagation(submitData)
    } else {
      res = await addC1Propagation(submitData)
    }

    if (res.code === 200) {
      ElMessage.success(props.isEdit ? t('research.c1Propagation.updateSuccess') : t('research.c1Propagation.addSuccess'))
      emit('success')
    } else {
      ElMessage.error(res.msg || t('common.submitFailed'))
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

// 机构类型变更时自动填充机构名称与ID（使用当前登录用户信息）
const handleOrgTypeChange = (value) => {
  const currentUser = getUserInfo()
  if (currentUser && currentUser.user) {
    formData.applicantOrgName = currentUser.user.organName || ''
    formData.applicantOrgId = currentUser.user.organCode || ''
  } else {
    formData.applicantOrgName = ''
    formData.applicantOrgId = ''
  }
}

// 取消
const handleCancel = () => {
  emit('cancel')
}
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
}
</style>

