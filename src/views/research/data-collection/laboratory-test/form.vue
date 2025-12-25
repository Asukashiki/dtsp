<template>
  <div class="laboratory-test-form-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-left">
        <div class="back-btn" link @click="goBack">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </div>
      </div>
      <div class="header-content">
        <h1 class="page-title">
          {{ isEdit ? $t('research.dataCollection.laboratoryTest.edit') :
            $t('research.dataCollection.laboratoryTest.add') }}
        </h1>
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



          <!-- 关联地块（用于报表关联样本）
          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.plotId') || '地块编号'" prop="plotId">
            <el-select
              v-model="formData.plotId"
              :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.plotId') || '请选择地块'"
              filterable
              clearable
              style="width: 100%"
              :loading="plotLoading"
            >
              <el-option v-for="p in plotOptions" :key="p.plotId" :label="p.plotId" :value="p.plotId" />
            </el-select>
          </el-form-item> -->

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.sampleType')" prop="sampleType">
            <el-select
              v-model="formData.sampleType"
              :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.sampleType')"
              filterable
              clearable
              style="width: 100%"
              @change="onSampleTypeChange"
            >
              <el-option v-for="opt in sampleTypeOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.labParameter')" prop="labParameter">
            <el-select
              v-model="formData.labParameter"
              :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.labParameter')"
              :disabled="!formData.sampleType"
              filterable
              clearable
              style="width: 100%"
              @change="onLabParameterChange"
            >
              <el-option v-for="param in labParameterOptions" :key="param.value" :label="param.label" :value="param.value" />
            </el-select>
          </el-form-item>

          <!-- 新增：预期范围（自动填充，只读） -->
          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.expectedRange') || '预期范围'">
            <el-input :model-value="expectedRangeText" disabled readonly />
          </el-form-item>

          <!-- 实验结果值（随参数动态渲染） -->
          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.resultValue')" prop="resultValue">
            <!-- pH：0-14，精度1 -->
            <template v-if="currentParamRule && currentParamRule.key === 'pH'">
              <el-input-number v-model="formData.resultValue" :min="0" :max="14" :precision="1" :controls="false" style="width: 100%" />
            </template>
            <!-- 含百分比的参数（moisture、protein） -->
            <template v-else-if="currentParamRule && currentParamRule.unit === '%'">
              <div class="input-with-unit">
                <el-input-number v-model="formData.resultValue" :min="0" :max="100" :precision="2" :controls="false" style="width: 100%" />
                <span class="unit-hint">%</span>
              </div>
            </template>
            <!-- EC，默认 0-100 -->
            <template v-else-if="currentParamRule && currentParamRule.key === 'EC'">
              <div class="input-with-unit">
                <el-input-number v-model="formData.resultValue" :min="0" :precision="2" :controls="false" style="width: 100%" />
                <span class="unit-hint">mS/cm</span>
              </div>
            </template>
            <!-- 其他（如 NPK、mycotoxin），先用文本输入兜底 -->
            <template v-else>
              <el-input v-model="formData.resultValue" :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.resultValue')" clearable />
            </template>
          </el-form-item>


        </div>

        <!-- 测试数据 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-bar-chart-line"></i>
            {{ $t('research.dataCollection.laboratoryTest.form.testInfo') }}
          </div>

          <!-- Test Status（自动计算，只读） -->
          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.testStatus')" prop="passFailFlag">
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
              disabled
              v-model="formData.testOrganization"
              :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.testOrganization')"
              clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.dataCollection.laboratoryTest.form.testerName')" prop="testerName">
            <el-input
              disabled
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
import { getUserInfo } from '@/utils/auth'
import { getPlotInfoList } from '@/api/breedingData'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const isEdit = computed(() => !!route.params.id)

// 下拉选项数据
const trialOptions = ref([])
const plotOptions = ref([])
const plotLoading = ref(false)

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
  plotId: '', // 关联地块ID
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

// 样本类型/参数/预期范围映射
const sampleTypeOptions = [
  { value: 'grain', label: 'Grain' },
  { value: 'leaf_tissue', label: 'Leaf Tissue' },
  { value: 'nutrient_analysis', label: 'Nutrient Analysis' }
]

const SAMPLE_SCHEMA = {
  soil: ['pH', 'NPK', 'moisture', 'EC', 'mycotoxin'],
  grain: ['moisture', 'protein', 'mycotoxin', 'EC', 'pH'],
  leaf_tissue: ['NPK', 'moisture', 'protein', 'EC', 'pH'],
  water: ['pH', 'EC', 'mycotoxin'],
  nutrient_analysis: ['NPK', 'protein', 'moisture', 'EC', 'pH']
}

const PARAM_RULES = {
  'pH': { key: 'pH', type: 'range', min: 5.5, max: 7.5 },
  'moisture': { key: 'moisture', type: 'lt', max: 13, unit: '%' },
  'protein': { key: 'protein', type: 'percent', unit: '%' },
  'EC': { key: 'EC', type: 'number', unit: 'mS/cm' },
  'mycotoxin': { key: 'mycotoxin', type: 'number', unit: 'PPM' },
  'NPK': { key: 'NPK', type: 'text' }
}

const labParameterOptions = computed(() => {
  const list = SAMPLE_SCHEMA[formData.sampleType] || []
  return list.map(k => ({ value: k, label: k }))
})

const currentParamRule = computed(() => {
  return PARAM_RULES[formData.labParameter] || null
})

const expectedRangeText = computed(() => {
  const r = currentParamRule.value
  if (!r) return '-'
  if (r.type === 'range') return `${r.min} - ${r.max}`
  if (r.type === 'lt') return `< ${r.max}${r.unit || ''}`
  return '-'
})

const onSampleTypeChange = () => {
  formData.labParameter = ''
  formData.resultValue = ''
  formData.passFailFlag = null
}

const onLabParameterChange = () => {
  formData.resultValue = ''
  formData.passFailFlag = null
}

const rules = computed(() => ({
  batchId: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.batchIdRequired'), trigger: 'blur' }
  ],
  trialId: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.trialIdRequired'), trigger: 'blur' }
  ],
  plotId: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.plotIdRequired') || '请选择地块', trigger: 'change' }
  ],
  sampleId: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.sampleIdRequired'), trigger: 'blur' }
  ],

  sampleType: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.sampleTypeRequired') || '请选择样本类型', trigger: 'change' }
  ],
  labParameter: [
    { required: true, message: t('research.dataCollection.laboratoryTest.rules.labParameterRequired') || '请选择实验参数', trigger: 'change' }
  ],
  resultValue: [
    { validator: (rule, value, cb) => {
      const r = currentParamRule.value
      if (!r) return cb()
      if (r.key === 'pH') {
        const v = Number(value)
        if (isNaN(v) || v < 0 || v > 14) return cb(new Error('pH范围 0-14'))
      }
      if (r.unit === '%') {
        const v = Number(value)
        if (isNaN(v) || v < 0 || v > 100) return cb(new Error('百分比范围 0-100'))
      }
      cb()
    }, trigger: ['blur','change'] }
  ],
  // germinationRate: [
  //   { required: true, message: t('research.dataCollection.laboratoryTest.rules.germinationRateRequired'), trigger: 'blur' }
  // ],
  // purityPercent: [
  //   { required: true, message: t('research.dataCollection.laboratoryTest.rules.purityPercentRequired'), trigger: 'blur' }
  // ],
  // moistureContentPercent: [
  //   { required: true, message: t('research.dataCollection.laboratoryTest.rules.moistureContentPercentRequired'), trigger: 'blur' }
  // ],
  // proteinPercent: [
  //   { required: true, message: t('research.dataCollection.laboratoryTest.rules.proteinPercentRequired'), trigger: 'blur' }
  // ],
  // seedHealthFindings: [
  //   { required: true, message: t('research.dataCollection.laboratoryTest.rules.seedHealthFindingsRequired'), trigger: 'blur' }
  // ],
  // traceabilityLink: [
  //   { required: true, message: t('research.dataCollection.laboratoryTest.rules.traceabilityLinkRequired'), trigger: 'blur' }
  // ],
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

// 监听参数与结果，基于规则计算 Pass/Fail
watch(
  () => [formData.labParameter, formData.resultValue],
  () => {
    const r = currentParamRule.value
    if (!r) {
      formData.passFailFlag = null
      return
    }
    const v = Number(formData.resultValue)
    if (formData.resultValue === '' || formData.resultValue === null || isNaN(v)) {
      formData.passFailFlag = null
      return
    }
    if (r.type === 'range') {
      formData.passFailFlag = (v >= r.min && v <= r.max) ? 'true' : 'false'
      return
    }
    if (r.type === 'lt') {
      formData.passFailFlag = (v < r.max) ? 'true' : 'false'
      return
    }
    // 其他类型不生成通过/失败标识
    formData.passFailFlag = null
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
  // 加载地块选项
  const loadPlots = async () => {
    plotLoading.value = true
    try {
      const res = await getPlotInfoList({ pageNum: 1, pageSize: 1000 })
      if (res.code === 200) {
        plotOptions.value = res.rows || []
      }
    } catch (e) {
      console.error('Failed to load plot options:', e)
    } finally {
      plotLoading.value = false
    }
  }
  loadPlots()

  if (isEdit.value) {
    // 编辑模式：加载详情
    loadDetail()
  } else {
    // 新增模式：生成UUID作为样本编号
    formData.sampleId = generateUUID()

    // 默认检测信息：检测人员、检测机构、检测日期
    try {
      const currentUser = getUserInfo()
      const user = currentUser && currentUser.user ? currentUser.user : {}
      if (!formData.testerName && user.name) {
        formData.testerName = user.name
      }
      if (!formData.testOrganization && (user.organName || user.organ_name)) {
        formData.testOrganization = user.organName || user.organ_name
      }
    } catch (e) {
      // 忽略从本地获取用户信息的异常
    }
    if (!formData.testDate) {
      const d = new Date()
      const yyyy = d.getFullYear()
      const mm = String(d.getMonth() + 1).padStart(2, '0')
      const dd = String(d.getDate()).padStart(2, '0')
      formData.testDate = `${yyyy}-${mm}-${dd}`
    }
  }
})
</script>

<style scoped>
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
