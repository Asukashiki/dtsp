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
        <!-- 基础信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.dataCollection.laboratoryTest.form.basicInfo') }}
          </div>

          <!-- 试验ID -->
          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.trialId')" prop="trialId">
            <el-select
              v-model="formData.trialId"
              :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.trialId')"
              filterable
              clearable
              style="width: 100%"
              @change="handleTrialChange"
            >
              <el-option
                v-for="item in trialOptions"
                :key="item.trialId"
                :label="`${item.trialId} - ${item.trialName}`"
                :value="item.trialId"
              />
            </el-select>
          </el-form-item>

          <!-- 批次ID（自动带出，只读） -->
          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.batchId')" prop="batchId">
            <el-input
              v-model="formData.batchId"
              :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.batchIdAuto')"
              disabled
              readonly
            >
              <template #suffix>
                <el-tooltip content="批次ID将根据试验ID自动填充" placement="top">
                  <i class="ri-information-line" style="color: #909399"></i>
                </el-tooltip>
              </template>
            </el-input>
          </el-form-item>
        </div>

        <!-- 样本信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-test-tube-line"></i>
            {{ $t('research.dataCollection.laboratoryTest.form.sampleInfo') }}
          </div>

          <!-- 样本编号（自动生成UUID，只读） -->
          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.sampleId')" prop="sampleId">
            <el-input
              v-model="formData.sampleId"
              :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.sampleId')"
              disabled
              readonly
            >
              <template #suffix>
                <el-tooltip content="样本编号自动生成" placement="top">
                  <i class="ri-barcode-line" style="color: #909399"></i>
                </el-tooltip>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.sampleStatus')" prop="sampleCondition">
            <el-input
              v-model="formData.sampleCondition"
              :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.sampleStatus')"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.sampleType')" prop="sampleType">
            <el-input
              v-model="formData.sampleType"
              :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.sampleType')"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.labParameter')" prop="labParameter">
            <el-input
              v-model="formData.labParameter"
              :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.labParameter')"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.resultValue')" prop="resultValue">
            <el-input
              v-model="formData.resultValue"
              :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.resultValue')"
              clearable
            />
          </el-form-item>

          <!-- 实验结果标识（自动计算，只读） -->
          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.passFailFlag')" prop="passFailFlag">
            <el-input
              v-model="passFailFlagDisplay"
              disabled
              readonly
            >
              <template #prefix>
                <el-tag
                  v-if="formData.passFailFlag === 'true' || formData.passFailFlag === true"
                  type="success"
                  size="small"
                >
                  Pass
                </el-tag>
                <el-tag
                  v-else-if="formData.passFailFlag === 'false' || formData.passFailFlag === false"
                  type="danger"
                  size="small"
                >
                  Fail
                </el-tag>
              </template>
              <template #suffix>
                <el-tooltip content="基于实验参数和实验结果值自动判定" placement="top">
                  <i class="ri-information-line" style="color: #909399"></i>
                </el-tooltip>
              </template>
            </el-input>
          </el-form-item>
        </div>

        <!-- 测试数据 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-bar-chart-line"></i>
            {{ $t('research.dataCollection.laboratoryTest.form.testInfo') }}
          </div>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.germinationRate')" prop="germinationRate">
            <div class="input-with-unit">
              <el-input-number
                v-model="formData.germinationRate"
                :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.germinationRate')"
                :min="0"
                :max="100"
                :precision="2"
                :controls="false"
                style="width: 100%"
              />
              <span class="unit-hint">%</span>
            </div>
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.purityPercent')" prop="purityPercent">
            <div class="input-with-unit">
              <el-input-number
                v-model="formData.purityPercent"
                :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.purityPercent')"
                :min="0"
                :max="100"
                :precision="2"
                :controls="false"
                style="width: 100%"
              />
              <span class="unit-hint">%</span>
            </div>
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.moistureContentPercent')" prop="moistureContentPercent">
            <div class="input-with-unit">
              <el-input-number
                v-model="formData.moistureContentPercent"
                :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.moistureContentPercent')"
                :min="0"
                :max="100"
                :precision="2"
                :controls="false"
                style="width: 100%"
              />
              <span class="unit-hint">%</span>
            </div>
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.proteinPercent')" prop="proteinPercent">
            <div class="input-with-unit">
              <el-input-number
                v-model="formData.proteinPercent"
                :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.proteinPercent')"
                :min="0"
                :max="100"
                :precision="2"
                :controls="false"
                style="width: 100%"
              />
              <span class="unit-hint">%</span>
            </div>
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.toxinLevelPpm')" prop="toxinLevelPpm">
            <div class="input-with-unit">
              <el-input-number
                v-model="formData.toxinLevelPpm"
                :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.toxinLevelPpm')"
                :min="0"
                :precision="2"
                :controls="false"
                style="width: 100%"
              />
              <span class="unit-hint">PPM</span>
            </div>
          </el-form-item>
        </div>

        <!-- 健康与追溯 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-heart-pulse-line"></i>
            {{ $t('research.dataCollection.laboratoryTest.form.qualityInfo') }}
          </div>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.seedHealthFindings')" prop="seedHealthFindings">
            <el-input
              v-model="formData.seedHealthFindings"
              type="textarea"
              :rows="3"
              :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.seedHealthFindings')"
            />
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.chainResponsibility')" prop="traceabilityLink">
            <el-input
              v-model="formData.traceabilityLink"
              :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.chainResponsibility')"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.labReportFile')" prop="labReportFile">
            <el-upload
              class="doc-upload"
              :http-request="handleUploadFile"
              :file-list="labReportFileList"
              :on-remove="handleRemoveFile"
              :on-preview="handlePreviewFile"
              :limit="1"
              accept=".pdf"
            >
              <el-button type="primary" link>
                <i class="ri-upload-2-line"></i>
                {{ $t('research.dataCollection.laboratoryTest.placeholder.labReportFile') }}
              </el-button>
            </el-upload>
          </el-form-item>
        </div>

        <!-- 检测信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-calendar-check-line"></i>
            {{ $t('research.dataCollection.laboratoryTest.form.testingInfo') }}
          </div>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.testDate')" prop="testDate">
            <el-date-picker
              v-model="formData.testDate"
              type="date"
              :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.testDate')"
              style="width: 100%"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.testOrganization')" prop="testOrganization">
            <el-input
              v-model="formData.testOrganization"
              :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.testOrganization')"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.testerName')" prop="testerName">
            <el-input
              v-model="formData.testerName"
              :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.testerName')"
              clearable
            />
          </el-form-item>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">
            {{ $t('common.cancel') }}
          </el-button>
          <el-button type="primary" @click="handleSubmit">
            <i class="ri-save-line"></i>
            {{ isEdit ? $t('common.save') : $t('common.add') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getLabTestDetail, addLabTest, updateLabTest } from '@/api/labTest'
import { uploadFile } from '@/api/seed'
import { getFilePreviewUrl } from '@/api/file'
import { getTrialBasicList, getTrialBasicInfo } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const isEdit = computed(() => !!route.params.id)

// 下拉选项数据
const trialOptions = ref([])

// 生成UUID的函数
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

const formData = reactive({
  batchId: '',
  trialId: '',
  sampleId: '',
  sampleCondition: '',
  sampleType: '',  // 新增：样本类型
  labParameter: '',  // 新增：实验参数
  resultValue: '',  // 新增：实验结果值
  passFailFlag: null,  // 新增：实验结果标识
  germinationRate: null,
  purityPercent: null,
  moistureContentPercent: null,
  proteinPercent: null,
  toxinLevelPpm: null,
  seedHealthFindings: '',
  traceabilityLink: '',
  labReportFile: '',
  labReportFileName: '',  // 新增:保存原始文件名
  testDate: '',
  testOrganization: '',
  testerName: ''
})

// 实验室报告文件列表
const labReportFileList = ref([])

// Pass/Fail 标识显示文本
const passFailFlagDisplay = computed(() => {
  if (formData.passFailFlag === 'true' || formData.passFailFlag === true) {
    return 'Pass'
  } else if (formData.passFailFlag === 'false' || formData.passFailFlag === false) {
    return 'Fail'
  }
  return ''
})

const rules = computed(() => ({
  batchId: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.batchIdRequired'), trigger: 'blur' }
  ],
  trialId: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.trialIdRequired'), trigger: 'blur' }
  ],
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
  ],
  testDate: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.testDateRequired'), trigger: 'change' }
  ],
  testOrganization: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.testOrganizationRequired'), trigger: 'blur' }
  ],
  testerName: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.testerNameRequired'), trigger: 'blur' }
  ]
}))

// 监听实验参数和实验结果值的变化，自动计算Pass/Fail
watch(
  () => [formData.labParameter, formData.resultValue],
  ([labParameter, resultValue]) => {
    if (labParameter && resultValue) {
      const paramValue = parseFloat(labParameter)
      const testValue = parseFloat(resultValue)

      if (!isNaN(paramValue) && !isNaN(testValue)) {
        // 如果实验结果值高于实验参数，显示Pass；否则显示Fail
        formData.passFailFlag = testValue >= paramValue ? 'true' : 'false'
      }
    }
  }
)

// 加载试验选项
const loadTrialOptions = async () => {
  try {
    const res = await getTrialBasicList({ pageNum: 1, pageSize: 1000 })
    if (res && res.rows) {
      trialOptions.value = res.rows
    }
  } catch (error) {
    console.error('Failed to load trial options:', error)
  }
}

// 处理试验ID变化 - 自动带出批次ID
const handleTrialChange = async (trialId) => {
  if (!trialId) {
    formData.batchId = ''
    return
  }

  try {
    console.log('获取试验信息，trialId:', trialId)
    const res = await getTrialBasicInfo(trialId)
    console.log('试验信息API响应:', res)

    if (res && res.data) {
      console.log('试验详细数据:', res.data)

      // 自动填充批次ID
      formData.batchId = res.data.batchId || ''
    }
  } catch (error) {
    console.error('Failed to get trial info:', error)
  }
}

// 加载详情数据
const loadDetail = async () => {
  loading.value = true
  try {
    const res = await getLabTestDetail(route.params.id)
    if (res.code === 200 && res.data) {
      Object.assign(formData, res.data)
      // 处理实验室报告文件
      if (res.data.labReportFile) {
        const fileId = res.data.labReportFile
        const fileName = res.data.labReportFileName || (t('research.dataCollection.laboratoryTest.form.labReportFile') + '.pdf')
        labReportFileList.value = [{
          name: fileName,
          url: fileId,
          dataId: fileId,
          fileId: fileId,
          uid: Date.now() + '-labReportFile'
        }]
      }
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

// 文件上传处理
const handleUploadFile = async (options) => {
  const { file } = options
  const uploadFormData = new FormData()
  uploadFormData.append('file', file)

  try {
    const res = await uploadFile(uploadFormData)
    if (res.code === 200 && res.data) {
      const fileData = res.data
      const dataId = fileData.id || fileData.dataId

      console.log('Upload response:', fileData)

      const fileObj = {
        name: file.name,
        uid: file.uid,
        dataId: dataId,
        fileId: dataId,
        url: dataId
      }

      labReportFileList.value = [fileObj]
      formData.labReportFile = dataId
      formData.labReportFileName = file.name  // 保存原始文件名

      ElMessage.success(t('common.uploadSuccess'))
    } else {
      ElMessage.error(res.msg || t('common.uploadFailed'))
    }
  } catch (error) {
    console.error('Upload error:', error)
    ElMessage.error(t('common.uploadFailed'))
  }
}

// 文件移除处理
const handleRemoveFile = () => {
  labReportFileList.value = []
  formData.labReportFile = ''
  formData.labReportFileName = ''
}

// 文件预览处理
const handlePreviewFile = async (file) => {
  if (!file.url && !file.dataId && !file.fileId) return

  try {
    let previewUrl = ''
    const pathToPreview = file.dataId || file.fileId || file.url

    if (file.url && file.url.startsWith('http')) {
      previewUrl = file.url
    } else if (pathToPreview) {
      const res = await getFilePreviewUrl(pathToPreview)
      previewUrl = res.code === 200 ? res.msg : ''
    }

    if (previewUrl) {
      window.open(previewUrl, '_blank')
    } else {
      ElMessage.error(t('common.previewFailed'))
    }
  } catch (error) {
    console.error('Failed to preview file:', error)
    ElMessage.error(t('common.failed'))
  }
}

// 提交表单
const handleSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return

    loading.value = true
    try {
      // 准备提交数据
      const submitData = {
        ...formData,
        labReportFile: labReportFileList.value.length > 0
          ? (labReportFileList.value[0].dataId || labReportFileList.value[0].fileId || '')
          : '',
        labReportFileName: labReportFileList.value.length > 0
          ? labReportFileList.value[0].name
          : ''
      }

      const apiFunc = isEdit.value ? updateLabTest : addLabTest
      const res = await apiFunc(submitData)
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
  // 加载试验选项
  loadTrialOptions()

  if (isEdit.value) {
    // 编辑模式：加载详情
    loadDetail()
  } else {
    // 新增模式：生成UUID作为样本编号
    formData.sampleId = generateUUID()
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

/* 带单位的输入框容器 */
.input-with-unit {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.input-with-unit .el-input-number {
  flex: 1;
}

/* 单位提示 */
.unit-hint {
  color: #6b7280;
  font-size: 14px;
  white-space: nowrap;
  flex-shrink: 0;
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

/* 文件上传组件样式 */
.doc-upload {
  width: 100%;
}

:deep(.el-upload) {
  width: 100%;
}

:deep(.el-upload-list) {
  margin-top: 8px;
}

:deep(.el-upload-list__item) {
  transition: all 0.3s;
  cursor: pointer;
}

:deep(.el-upload-list__item:hover) {
  background-color: #f5f7fa;
}

:deep(.el-upload-list__item-name) {
  color: #009A44;
  text-decoration: none;
}

:deep(.el-upload-list__item-name:hover) {
  color: #007a36;
  text-decoration: underline;
}
</style>
