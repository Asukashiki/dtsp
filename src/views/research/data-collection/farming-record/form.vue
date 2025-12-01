<template>
  <div class="farming-record-form-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <el-button link @click="goBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </div>
        <div class="header-center">
          <h1 class="page-title">
            {{ isEdit ? $t('research.dataCollection.farmingRecord.edit') : $t('research.dataCollection.farmingRecord.add') }}
          </h1>
        </div>
        <div class="header-right"></div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-width="labelWidth"
        :label-position="labelPosition"
      >
        <!-- 基础信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.dataCollection.farmingRecord.form.basicInfo') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                label="育种批次"
                prop="batchId"
              >
                <el-select
                  v-model="formData.batchId"
                  placeholder="请选择育种批次"
                  style="width: 100%"
                >
                  <el-option
                    v-for="batch in batchOptions"
                    :key="batch.batchId"
                    :label="batch.batchName"
                    :value="batch.batchId"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="试验"
                prop="trialId"
              >
                <el-input
                  v-model="formData.trialId"
                  placeholder="请输入试验ID"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="操作类型"
                prop="managementPractice"
              >
                <el-select
                  v-model="formData.managementPractice"
                  placeholder="请选择操作类型"
                  style="width: 100%"
                >
                  <el-option label="Planting" value="planting" />
                  <el-option label="Fertilization" value="fertilization" />
                  <el-option label="Irrigation" value="irrigation" />
                  <el-option label="Weeding" value="weeding" />
                  <el-option label="Pest Control" value="pest.control" />
                  <el-option label="Harvesting" value="harvesting" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 管理信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-plant-line"></i>
            {{ $t('research.dataCollection.farmingRecord.form.managementInfo') }}
          </div>

          <el-row :gutter="24">
            <!-- 肥料信息 -->
            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.farmingRecord.form.fertilizerType')"
                prop="fertilizerType"
              >
                <el-input
                  v-model="formData.fertilizerType"
                  :placeholder="$t('research.dataCollection.farmingRecord.placeholder.fertilizerType')"
                  maxlength="100"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.farmingRecord.form.fertilizerRateKg')"
                prop="fertilizerRateKg"
              >
                <el-input-number
                  v-model="formData.fertilizerRateKg"
                  :min="0"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.farmingRecord.placeholder.fertilizerRateKg')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.farmingRecord.form.ureaRateKg')"
                prop="ureaRateKg"
              >
                <el-input-number
                  v-model="formData.ureaRateKg"
                  :min="0"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.farmingRecord.placeholder.ureaRateKg')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <!-- 农药信息 -->
            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.farmingRecord.form.pesticideType')"
                prop="pesticideType"
              >
                <el-input
                  v-model="formData.pesticideType"
                  :placeholder="$t('research.dataCollection.farmingRecord.placeholder.pesticideType')"
                  maxlength="100"
                />
              </el-form-item>
            </el-col>

            <!-- 灌溉信息 -->
            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.farmingRecord.form.irrigationType')"
                prop="irrigationType"
              >
                <el-input
                  v-model="formData.irrigationType"
                  :placeholder="$t('research.dataCollection.farmingRecord.placeholder.irrigationType')"
                  maxlength="100"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.farmingRecord.form.irrigationFrequency')"
                prop="irrigationFrequency"
              >
                <el-input-number
                  v-model="formData.irrigationFrequency"
                  :min="0"
                  :placeholder="$t('research.dataCollection.farmingRecord.placeholder.irrigationFrequency')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <!-- 除草信息 -->
            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.farmingRecord.form.weedingDate')"
                prop="weedingDate"
              >
                <el-date-picker
                  v-model="formData.weedingDate"
                  type="date"
                  :placeholder="$t('research.dataCollection.farmingRecord.placeholder.weedingDate')"
                  style="width: 100%"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.farmingRecord.form.herbicideUsed')"
                prop="herbicideUsed"
              >
                <el-input
                  v-model="formData.herbicideUsed"
                  :placeholder="$t('research.dataCollection.farmingRecord.placeholder.herbicideUsed')"
                  maxlength="100"
                />
              </el-form-item>
            </el-col>

            <!-- 种子来源 -->
            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.farmingRecord.form.seedSource')"
                prop="seedSource"
              >
                <el-input
                  v-model="formData.seedSource"
                  :placeholder="$t('research.dataCollection.farmingRecord.placeholder.seedSource')"
                  maxlength="100"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">
            {{ $t('common.cancel') }}
          </el-button>
          <el-button
            type="primary"
            :loading="submitting"
            @click="handleSubmit"
          >
            {{ $t('common.submit') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getFarmingRecordDetail, addFarmingRecord, editFarmingRecord } from '@/api/breeding'
import { getBreedingBatchOptions } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// 响应式表单布局
const isMobile = ref(window.innerWidth <= 768)
const labelWidth = computed(() => isMobile.value ? '100%' : '180px')
const labelPosition = computed(() => isMobile.value ? 'top' : 'right')

// 监听窗口大小变化
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth <= 768
})

const formRef = ref()
const submitting = ref(false)
const batchOptions = ref([])

// 判断是否为编辑模式
const isEdit = computed(() => !!route.params.id)

// 表单数据
const formData = reactive({
  batchId: '',
  trialId: '',
  managementPractice: '',
  fertilizerType: '',
  fertilizerRateKg: null,
  ureaRateKg: null,
  pesticideType: '',
  irrigationType: '',
  irrigationFrequency: null,
  weedingDate: '',
  herbicideUsed: '',
  seedSource: ''
})

// 表单验证规则
const rules = computed(() => ({
  batchId: [
    { required: true, message: '请选择育种批次', trigger: 'change' }
  ],
  trialId: [
    { required: true, message: '请输入试验ID', trigger: 'blur' }
  ],
  managementPractice: [
    { required: true, message: t('research.dataCollection.farmingRecord.rules.managementPracticeRequired'), trigger: 'change' }
  ],
  fertilizerRateKg: [
    { type: 'number', message: t('research.dataCollection.farmingRecord.rules.fertilizerRateKgFormat'), trigger: 'blur' }
  ],
  ureaRateKg: [
    { type: 'number', message: t('research.dataCollection.farmingRecord.rules.ureaRateKgFormat'), trigger: 'blur' }
  ],
  irrigationFrequency: [
    { type: 'number', message: t('research.dataCollection.farmingRecord.rules.irrigationFrequencyFormat'), trigger: 'blur' }
  ]
}))

// 加载育种批次选项
const loadBatchOptions = async () => {
  try {
    const res = await getBreedingBatchOptions()
    if (res.code === 200) {
      batchOptions.value = res.data || []
    }
  } catch (error) {
    console.error('Failed to load batch options:', error)
  }
}

// 加载详情数据
const loadDetail = async () => {
  try {
    const res = await getFarmingRecordDetail(route.params.id)
    if (res.code === 200 && res.data) {
      Object.assign(formData, res.data)
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value.validate()

    submitting.value = true

    const submitData = { ...formData }

    let res
    if (isEdit.value) {
      submitData.dataId = route.params.id
      res = await editFarmingRecord(submitData)
      if (res.code === 200) {
        ElMessage.success(t('research.dataCollection.farmingRecord.editSuccess'))
        router.push('/research/data-collection/farming-record')
      }
    } else {
      res = await addFarmingRecord(submitData)
      if (res.code === 200) {
        ElMessage.success(t('research.dataCollection.farmingRecord.addSuccess'))
        router.push('/research/data-collection/farming-record')
      }
    }
  } catch (error) {
    console.error('Form validation failed or submit error:', error)
  } finally {
    submitting.value = false
  }
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  loadBatchOptions()
  if (isEdit.value) {
    loadDetail()
  }
})
</script>

<style scoped>
.farming-record-form-container {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  margin: -24px -24px 24px -24px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left,
.header-right {
  flex: 1;
}

.header-center {
  flex: 2;
  text-align: center;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #1f2937;
}

/* 表单区域 */
.form-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 表单分节 */
.form-section {
  margin-bottom: 32px;
}

.form-section:last-of-type {
  margin-bottom: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 20px;
}

/* 操作按钮 */
.form-actions {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: center;
  gap: 16px;
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 16px;
  }

  .form-wrapper {
    padding: 24px 16px;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 12px;
  }

  .header-left .el-button {
    font-size: 14px;
  }

  .page-title {
    font-size: 16px;
  }

  .header-right {
    display: none;
  }

  .form-wrapper {
    padding: 16px 12px;
    border-radius: 0;
    box-shadow: none;
  }

  .form-section {
    margin-bottom: 24px;
  }

  .section-title {
    font-size: 15px;
    margin-bottom: 16px;
    padding-bottom: 10px;
  }

  .section-title i {
    font-size: 18px;
  }

  /* 单列布局 */
  :deep(.el-row) {
    display: block !important;
  }

  :deep(.el-col) {
    max-width: 100% !important;
    margin-bottom: 0 !important;
  }

  :deep(.el-form-item) {
    margin-bottom: 18px;
  }

  :deep(.el-form-item__label) {
    text-align: left !important;
    padding: 0 0 8px 0 !important;
    line-height: 1.4 !important;
    font-size: 14px;
  }

  :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }

  :deep(.el-input),
  :deep(.el-select),
  :deep(.el-date-picker),
  :deep(.el-input-number) {
    width: 100% !important;
  }

  .form-actions {
    margin-top: 24px;
    padding-top: 20px;
    flex-direction: column;
    gap: 12px;
  }

  .form-actions .el-button {
    width: 100%;
    margin: 0;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    margin: -8px -8px 8px -8px;
  }

  .header-content {
    padding: 10px 8px;
  }

  .page-title {
    font-size: 15px;
  }

  .form-wrapper {
    padding: 12px 8px;
  }

  .form-section {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }

  :deep(.el-form-item) {
    margin-bottom: 16px;
  }

  :deep(.el-form-item__label) {
    font-size: 13px;
  }
}
</style>
