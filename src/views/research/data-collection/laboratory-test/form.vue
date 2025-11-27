<template>
  <div class="laboratory-test-form-container">
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
            {{ isEdit ? $t('research.dataCollection.laboratoryTest.edit') : $t('research.dataCollection.laboratoryTest.add') }}
          </h1>
        </div>
        <div class="header-right"></div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form
        ref="formRef"
        v-loading="loading"
        :model="formData"
        :rules="rules"
        label-position="right"
        label-width="200px"
        class="lab-form"
      >
        <!-- 样本信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-test-tube-line"></i>
            {{ $t('research.dataCollection.laboratoryTest.form.sampleInfo') }}
          </div>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.sampleId')" prop="sampleId">
            <el-input
              v-model="formData.sampleId"
              :placeholder="$t('common.pleaseEnter')"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.sampleCondition')" prop="sampleCondition">
            <el-input
              v-model="formData.sampleCondition"
              :placeholder="$t('common.pleaseEnter')"
              clearable
            />
          </el-form-item>
        </div>

        <!-- 测试数据 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-bar-chart-line"></i>
            {{ $t('research.dataCollection.laboratoryTest.form.testData') }}
          </div>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.germinationRate')" prop="germinationRate">
            <el-input-number
              v-model="formData.germinationRate"
              :placeholder="$t('common.pleaseEnter')"
              :min="0"
              :max="100"
              :precision="2"
              :controls="false"
              style="width: 100%"
            />
            <span class="unit-hint">%</span>
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.purityPercent')" prop="purityPercent">
            <el-input-number
              v-model="formData.purityPercent"
              :placeholder="$t('common.pleaseEnter')"
              :min="0"
              :max="100"
              :precision="2"
              :controls="false"
              style="width: 100%"
            />
            <span class="unit-hint">%</span>
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.moistureContentPercent')" prop="moistureContentPercent">
            <el-input-number
              v-model="formData.moistureContentPercent"
              :placeholder="$t('common.pleaseEnter')"
              :min="0"
              :max="100"
              :precision="2"
              :controls="false"
              style="width: 100%"
            />
            <span class="unit-hint">%</span>
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.proteinPercent')" prop="proteinPercent">
            <el-input-number
              v-model="formData.proteinPercent"
              :placeholder="$t('common.pleaseEnter')"
              :min="0"
              :max="100"
              :precision="2"
              :controls="false"
              style="width: 100%"
            />
            <span class="unit-hint">%</span>
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.toxinLevelPpm')" prop="toxinLevelPpm">
            <el-input-number
              v-model="formData.toxinLevelPpm"
              :placeholder="$t('common.pleaseEnter')"
              :min="0"
              :precision="2"
              :controls="false"
              style="width: 100%"
            />
            <span class="unit-hint">PPM</span>
          </el-form-item>
        </div>

        <!-- 健康与追溯 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-heart-pulse-line"></i>
            {{ $t('research.dataCollection.laboratoryTest.form.healthTraceability') }}
          </div>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.seedHealthFindings')" prop="seedHealthFindings">
            <el-input
              v-model="formData.seedHealthFindings"
              type="textarea"
              :rows="3"
              :placeholder="$t('common.pleaseEnter')"
            />
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.traceabilityLink')" prop="traceabilityLink">
            <el-input
              v-model="formData.traceabilityLink"
              :placeholder="$t('common.pleaseEnter')"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.labReportFile')" prop="labReportFile">
            <el-input
              v-model="formData.labReportFile"
              :placeholder="$t('common.pleaseEnter')"
              clearable
            >
              <template #append>
                <el-button icon="ri-folder-line">{{ $t('common.browse') }}</el-button>
              </template>
            </el-input>
          </el-form-item>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">
            {{ $t('common.cancel') }}
          </el-button>
          <el-button type="primary" @click="handleSubmit">
            <i class="ri-save-line"></i>
            {{ $t('common.save') }}
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
import { getLaboratoryTestDetail, addLaboratoryTest, editLaboratoryTest } from '@/api/breeding'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const isEdit = computed(() => !!route.params.id)

const formData = reactive({
  sampleId: '',
  sampleCondition: '',
  germinationRate: null,
  purityPercent: null,
  moistureContentPercent: null,
  proteinPercent: null,
  toxinLevelPpm: null,
  seedHealthFindings: '',
  traceabilityLink: '',
  labReportFile: ''
})

const rules = computed(() => ({
  sampleId: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.sampleIdRequired'), trigger: 'blur' }
  ],
  sampleCondition: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.sampleConditionRequired'), trigger: 'blur' }
  ],
  germinationRate: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.germinationRateRequired'), trigger: 'blur' }
  ],
  purityPercent: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.purityPercentRequired'), trigger: 'blur' }
  ],
  moistureContentPercent: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.moistureContentPercentRequired'), trigger: 'blur' }
  ],
  proteinPercent: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.proteinPercentRequired'), trigger: 'blur' }
  ],
  seedHealthFindings: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.seedHealthFindingsRequired'), trigger: 'blur' }
  ],
  traceabilityLink: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.traceabilityLinkRequired'), trigger: 'blur' }
  ]
}))

// 加载详情数据
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getLaboratoryTestDetail(route.params.id)
    if (res.code === 200 && res.data) {
      Object.assign(formData, res.data)
    } else {
      ElMessage.error(t('common.loadFailed'))
      goBack()
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
    goBack()
  } finally {
    loading.value = false
  }
}

// 提交表单
const handleSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return

    loading.value = true
    try {
      const apiFunc = isEdit.value ? editLaboratoryTest : addLaboratoryTest
      const res = await apiFunc(formData)
      if (res.code === 200) {
        ElMessage.success(t(isEdit.value ? 'common.updateSuccess' : 'common.addSuccess'))
        goBack()
      } else {
        ElMessage.error(res.msg || t('common.operationFailed'))
      }
    } catch (error) {
      console.error('Failed to submit:', error)
      ElMessage.error(t('common.operationFailed'))
    } finally {
      loading.value = false
    }
  })
}

// 返回
const goBack = () => {
  router.back()
}

// 初始化
onMounted(() => {
  if (isEdit.value) {
    loadDetail()
  }
})
</script>

<style scoped>
.laboratory-test-form-container {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  margin: -24px -24px 24px -24px;
}

.header-content {
  max-width: 1000px;
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
  max-width: 1000px;
  margin: 0 auto;
}

.lab-form {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 表单分节 */
.form-section {
  margin-bottom: 32px;
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

/* 单位提示 */
.unit-hint {
  margin-left: 8px;
  color: #6b7280;
  font-size: 14px;
}

/* 操作按钮 */
.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.form-actions .el-button {
  min-width: 120px;
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 16px;
  }

  .lab-form {
    padding: 20px 16px;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 12px;
  }

  .page-title {
    font-size: 16px;
  }

  .lab-form {
    padding: 16px 12px;
    border-radius: 8px;
  }

  .lab-form :deep(.el-form-item) {
    margin-bottom: 20px;
  }

  .lab-form :deep(.el-form-item__label) {
    text-align: left;
    display: block;
    line-height: 1.5;
    margin-bottom: 8px;
    padding: 0;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  }

  .lab-form :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }

  .section-title {
    font-size: 15px;
    margin-bottom: 16px;
    padding-bottom: 10px;
  }

  .section-title i {
    font-size: 18px;
  }

  .unit-hint {
    font-size: 13px;
  }

  .form-actions {
    flex-direction: column;
    padding-top: 20px;
  }

  .form-actions .el-button {
    width: 100%;
    min-width: auto;
  }

  .form-actions .el-button:first-child {
    order: 2;
  }

  .form-actions .el-button:last-child {
    order: 1;
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

  .lab-form {
    padding: 12px 8px;
  }

  .lab-form :deep(.el-form-item) {
    margin-bottom: 16px;
  }

  .lab-form :deep(.el-form-item__label) {
    font-size: 13px;
    margin-bottom: 6px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }

  .unit-hint {
    font-size: 12px;
  }
}
</style>
