<template>
  <div class="breeding-license-form-container">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="icon-wrapper">
          <i class="ri-shield-check-line"></i>
        </div>
        <div class="header-text">
          <h1>{{ isEdit ? $t('research.breedingLicense.edit') : $t('research.breedingLicense.add') }}</h1>
          <p class="subtitle">{{ $t('research.breedingLicense.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- Form Content -->
    <div class="form-content">
      <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="200px"
          v-loading="loading"
      >
        <!-- Basic Information Section -->
        <div class="form-section">
          <h2 class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.breedingLicense.form.basicInfo') }}
          </h2>

          <el-form-item :label="$t('research.breedingLicense.form.batchId')" prop="batchId">
            <el-select
                v-model="formData.batchId"
                :placeholder="$t('research.breedingLicense.placeholder.batchId')"
                filterable
                clearable
                disabled
                style="width: 100%"
                @change="handleBatchChange"
            >
              <el-option
                  v-for="batch in batchList"
                  :key="batch.id"
                  :label="batch.batchName"
                  :value="batch.id"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('research.breedingLicense.form.datasetId')" prop="datasetId">
            <el-select
                v-model="formData.datasetId"
                :placeholder="$t('research.breedingLicense.placeholder.datasetId')"
                filterable
                clearable
                style="width: 100%"
                @change="handleDatasetChange"
            >
              <el-option
                  v-for="dataset in datasetList"
                  :key="dataset.id"
                  :label="`${dataset.datasetCode}`"
                  :value="dataset.id"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('research.breedingLicense.form.cropType')" prop="cropType">
            <el-input
                v-model="formData.cropType"
                :placeholder="$t('research.breedingLicense.placeholder.cropType')"
                clearable
                disabled
            />
          </el-form-item>

          <el-form-item :label="$t('research.breedingLicense.form.varietyName')" prop="varietyName">
            <el-input
                v-model="formData.varietyName"
                :placeholder="$t('research.breedingLicense.placeholder.varietyName')"
                clearable
                disabled
            />
          </el-form-item>
        </div>

        <!-- License Information Section -->
        <div class="form-section">
          <h2 class="section-title">
            <i class="ri-file-shield-line"></i>
            {{ $t('research.breedingLicense.form.licenseInfo') }}
          </h2>

          <el-form-item :label="$t('research.breedingLicense.form.licenseNo')" prop="licenseNo">
            <el-input
                v-model="formData.licenseNo"
                :placeholder="$t('research.breedingLicense.placeholder.licenseNo')"
                clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.breedingLicense.form.approvalOrg')" prop="approvalOrg">
            <el-input
                v-model="formData.approvalOrg"
                :placeholder="$t('research.breedingLicense.placeholder.approvalOrg')"
                clearable
            />
          </el-form-item>

          <el-form-item :label="$t('research.breedingLicense.form.approvalDate')" prop="approvalDate">
            <el-date-picker
                v-model="formData.approvalDate"
                type="date"
                :placeholder="$t('research.breedingLicense.placeholder.approvalDate')"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
            />
          </el-form-item>

          <el-form-item :label="$t('research.breedingLicense.form.validStartDate')" prop="validStartDate">
            <el-date-picker
                v-model="formData.validStartDate"
                type="date"
                :placeholder="$t('research.breedingLicense.placeholder.validStartDate')"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
            />
          </el-form-item>

          <el-form-item :label="$t('research.breedingLicense.form.validEndDate')" prop="validEndDate">
            <el-date-picker
                v-model="formData.validEndDate"
                type="date"
                :placeholder="$t('research.breedingLicense.placeholder.validEndDate')"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
            />
          </el-form-item>

          <el-form-item :label="$t('research.breedingLicense.form.certificateFile')" prop="certificateFile">
            <el-upload
                class="doc-upload"
                :http-request="handleUploadFile"
                :file-list="certificateFileList"
                :on-remove="handleRemoveFile"
                :on-preview="handlePreviewFile"
                :limit="1"
                accept=".pdf"
            >
              <el-button type="primary" link>
                <i class="ri-upload-2-line"></i>
                {{ $t('research.breedingLicense.placeholder.certificateFile') }}
              </el-button>
            </el-upload>
          </el-form-item>

          <el-form-item :label="$t('research.breedingLicense.form.licenseStatus')" prop="licenseStatus">
            <el-select
                v-model="formData.licenseStatus"
                :placeholder="$t('research.breedingLicense.placeholder.licenseStatus')"
                style="width: 100%"
            >
              <el-option :label="$t('research.breedingLicense.status.valid')" value="valid" />
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('research.breedingLicense.form.remark')" prop="remark">
            <el-input
                v-model="formData.remark"
                type="textarea"
                :rows="3"
                :placeholder="$t('research.breedingLicense.placeholder.remark')"
            />
          </el-form-item>
        </div>

        <!-- Variety Traits Section -->
        <div class="form-section">
          <h2 class="section-title">
            <i class="ri-plant-line"></i>
            {{ $t('research.breedingLicense.form.varietyTraits') }}
          </h2>

          <el-form-item :label="$t('research.breedingLicense.form.minYieldPotential')" prop="minYieldPotential">
            <el-input-number
                v-model="formData.minYieldPotential"
                :placeholder="$t('research.breedingLicense.placeholder.minYieldPotential')"
                :min="0"
                :precision="2"
                :step="0.1"
                style="width: 100%"
            />
          </el-form-item>

          <el-form-item :label="$t('research.breedingLicense.form.maxYieldPotential')" prop="maxYieldPotential">
            <el-input-number
                v-model="formData.maxYieldPotential"
                :placeholder="$t('research.breedingLicense.placeholder.maxYieldPotential')"
                :min="0"
                :precision="2"
                :step="0.1"
                style="width: 100%"
            />
          </el-form-item>

          <el-form-item :label="$t('research.breedingLicense.form.diseaseResistance')" prop="diseaseResistance">
            <el-input
                v-model="formData.diseaseResistance"
                type="textarea"
                :rows="3"
                :placeholder="$t('research.breedingLicense.placeholder.diseaseResistance')"
            />
          </el-form-item>

          <el-form-item :label="$t('research.breedingLicense.form.stressTolerance')" prop="stressTolerance">
            <el-input
                v-model="formData.stressTolerance"
                type="textarea"
                :rows="3"
                :placeholder="$t('research.breedingLicense.placeholder.stressTolerance')"
            />
          </el-form-item>

          <el-form-item :label="$t('research.breedingLicense.form.maturityDays')" prop="maturityDays">
            <el-input-number
                v-model="formData.maturityDays"
                :placeholder="$t('research.breedingLicense.placeholder.maturityDays')"
                :min="0"
                :step="1"
                style="width: 100%"
            />
          </el-form-item>

          <el-form-item :label="$t('research.breedingLicense.form.plantHeight')" prop="plantHeight">
            <el-input-number
                v-model="formData.plantHeight"
                :placeholder="$t('research.breedingLicense.placeholder.plantHeight')"
                :min="0"
                :precision="2"
                :step="1"
                style="width: 100%"
            />
          </el-form-item>

          <el-form-item :label="$t('research.breedingLicense.form.grainQualityTraits')" prop="grainQualityTraits">
            <el-input
                v-model="formData.grainQualityTraits"
                type="textarea"
                :rows="3"
                :placeholder="$t('research.breedingLicense.placeholder.grainQualityTraits')"
            />
          </el-form-item>

          <el-form-item :label="$t('research.breedingLicense.form.otherTraits')" prop="otherTraits">
            <el-input
                v-model="formData.otherTraits"
                type="textarea"
                :rows="3"
                :placeholder="$t('research.breedingLicense.placeholder.otherTraits')"
            />
          </el-form-item>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <el-button @click="handleCancel" size="large">
            <i class="ri-close-line"></i>
            {{ $t('research.breedingLicense.actions.cancel') }}
          </el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitting" size="large">
            <i class="ri-check-line"></i>
            {{ $t('research.breedingLicense.actions.submit') }}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getLicenseById, addLicense, updateLicense } from '@/api/breedingLicense'
import { getDatasetList } from '@/api/dataset'
import { uploadFile } from '@/api/seed'
import { getFilePreviewUrl } from '@/api/file'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

// State
const formRef = ref(null)
const loading = ref(false)
const submitting = ref(false)
const isEdit = computed(() => !!route.params.id)
const batchList = ref([])
const datasetList = ref([])

// Form Data
const formData = reactive({
  id: '',
  batchId: '',
  batchName: '',
  datasetId: '',
  datasetCode: '',
  cropType: '',
  varietyName: '',
  licenseNo: '',
  approvalOrg: '',
  approvalDate: '',
  validStartDate: '',
  validEndDate: '',
  certificateFile: '',
  certificateFileName: '',  // 新增:保存原始文件名
  licenseStatus: 'valid',
  remark: '',
  // Variety Traits（已存在，无需新增）
  traitsId: '',
  minYieldPotential: null,
  maxYieldPotential: null,
  diseaseResistance: '',
  stressTolerance: '',
  maturityDays: null,
  plantHeight: null,
  grainQualityTraits: '',
  otherTraits: ''
})

// 认证文件列表
const certificateFileList = ref([])

// // JSON Validator
// const validateJson = (rule, value, callback) => {
//   if (!value) {
//     callback()
//     return
//   }
//   try {
//     JSON.parse(value)
//     callback()
//   } catch (e) {
//     callback(new Error(t('research.breedingLicense.rules.jsonFormat')))
//   }
// }

// Form Rules
const formRules = computed(() => ({
  batchId: [
    { required: true, message: t('research.breedingLicense.rules.batchIdRequired'), trigger: 'change' }
  ],
  cropType: [
    { required: true, message: t('research.breedingLicense.rules.cropTypeRequired'), trigger: 'blur' }
  ],
  varietyName: [
    { required: true, message: t('research.breedingLicense.rules.varietyNameRequired'), trigger: 'blur' }
  ],
  licenseNo: [
    { required: true, message: t('research.breedingLicense.rules.licenseNoRequired'), trigger: 'blur' }
  ],
  approvalOrg: [
    { required: true, message: t('research.breedingLicense.rules.approvalOrgRequired'), trigger: 'blur' }
  ],
  approvalDate: [
    { required: true, message: t('research.breedingLicense.rules.approvalDateRequired'), trigger: 'change' }
  ],
  validStartDate: [
    { required: true, message: t('research.breedingLicense.rules.validStartDateRequired'), trigger: 'change' }
  ],
  validEndDate: [
    { required: true, message: t('research.breedingLicense.rules.validEndDateRequired'), trigger: 'change' }
  ],
  licenseStatus: [
    { required: true, message: t('research.breedingLicense.rules.licenseStatusRequired'), trigger: 'change' }
  ],
  minYieldPotential: [
    { type: 'number', min: 0, message: t('research.breedingLicense.rules.minYieldPotentialMin'), trigger: 'change' }
  ],
  maxYieldPotential: [
    { type: 'number', min: 0, message: t('research.breedingLicense.rules.maxYieldPotentialMin'), trigger: 'change' }
  ],
  diseaseResistance: [

  ],
  stressTolerance: [

  ],
  otherTraits: [

  ],
  maturityDays: [
    { type: 'number', min: 0, message: t('research.breedingLicense.rules.maturityDaysMin'), trigger: 'change' }
  ],
  plantHeight: [
    { type: 'number', min: 0, message: t('research.breedingLicense.rules.plantHeightMin'), trigger: 'change' }
  ]
}))

// Fetch Batch List (从已审核通过的数据集中获取批次信息)
const fetchBatchList = async () => {
  try {
    const res = await getDatasetList({
      pageNum: 1,
      pageSize: 1000,
      datasetStatus: 'approved' // 只获取审核通过的数据集
    })
    if (res.code === 200) {
      const datasets = res.data?.list || res.data || []
      // 从已审核通过的数据集中提取唯一的批次信息
      const batchMap = new Map()
      datasets.forEach(dataset => {
        if (dataset.batchId && !batchMap.has(dataset.batchId)) {
          batchMap.set(dataset.batchId, {
            id: dataset.batchId,
            batchName: dataset.batchName || dataset.batchId,
            cropType: dataset.cropType,
            varietyName: dataset.varietyName
          })
        }
      })
      batchList.value = Array.from(batchMap.values())
    }
  } catch (error) {
    console.error('Failed to fetch batch list:', error)
  }
}

// Fetch Dataset List (only approved ones)
const fetchDatasetList = async () => {
  try {
    const res = await getDatasetList({
      pageNum: 1,
      pageSize: 1000,
      datasetStatus: 'approved'
    })
    if (res.code === 200) {
      datasetList.value = res.data.list || []
    }
  } catch (error) {
    console.error('Failed to fetch dataset list:', error)
  }
}

// Handle Batch Change
const handleBatchChange = (batchId) => {
  const batch = batchList.value.find(b => b.id === batchId)
  if (batch) {
    formData.batchName = batch.batchName
    formData.cropType = batch.cropType || ''
    formData.varietyName = batch.varietyName || ''
  }
}

// Handle Dataset Change
const handleDatasetChange = (datasetId) => {
  const dataset = datasetList.value.find(d => d.id === datasetId)
  if (dataset) {
    formData.datasetCode = dataset.datasetCode
    formData.batchId = dataset.batchId
    formData.batchName = dataset.batchName
    formData.cropType = dataset.cropType
    formData.varietyName = dataset.varietyName
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

      const fileObj = {
        name: file.name,
        uid: file.uid,
        dataId: dataId,
        fileId: dataId,
        url: dataId
      }

      certificateFileList.value = [fileObj]
      formData.certificateFile = dataId
      formData.certificateFileName = file.name  // 保存原始文件名

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
  certificateFileList.value = []
  formData.certificateFile = ''
  formData.certificateFileName = ''
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

// Fetch License Detail
const fetchLicenseDetail = async (id) => {
  loading.value = true
  try {
    const res = await getLicenseById(id)
    if (res.code === 200) {
      Object.assign(formData, res.data)
      // 处理认证文件
      if (res.data.certificateFile) {
        const fileId = res.data.certificateFile
        const fileName = res.data.certificateFileName || (t('research.breedingLicense.form.certificateFile') + '.pdf')
        certificateFileList.value = [{
          name: fileName,
          url: fileId,
          dataId: fileId,
          fileId: fileId,
          uid: Date.now() + '-certificateFile'
        }]
      }
    } else {
      ElMessage.error(res.msg || t('common.loadFailed'))
    }
  } catch (error) {
    console.error('Failed to fetch license detail:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// Handle Submit
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()

    submitting.value = true

    // 准备提交数据
    const submitData = {
      ...formData,
      certificateFile: certificateFileList.value.length > 0
          ? (certificateFileList.value[0].dataId || certificateFileList.value[0].fileId || '')
          : '',
      certificateFileName: certificateFileList.value.length > 0
          ? certificateFileList.value[0].name
          : ''
    }

    const apiFunc = isEdit.value ? updateLicense : addLicense
    const res = await apiFunc(submitData)

    if (res.code === 200) {
      ElMessage.success(
          isEdit.value
              ? t('research.breedingLicense.message.updateSuccess')
              : t('research.breedingLicense.message.addSuccess')
      )
      router.back()
    } else {
      console.log('res',res)
      ElMessage.error(res.msg || t('common.submitFailed'))
    }
  } catch (error) {
    console.log('error',error)
    ElMessage.error(t('common.submitFailed'))
  } finally {
    submitting.value = false
  }
}

// Handle Cancel
const handleCancel = () => {
  router.back()
}

// Initialize
onMounted(async () => {
  await Promise.all([
    fetchBatchList(),
    fetchDatasetList()
  ])

  if (isEdit.value) {
    await fetchLicenseDetail(route.params.id)
  }
})
</script>

<style scoped>
.breeding-license-form-container {
  padding: 24px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

/* Page Header */
.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 50%, #FEDD00 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.icon-wrapper i {
  font-size: 48px;
  color: white;
}

.header-text h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  margin: 8px 0 0 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.95);
}

/* Form Content */
.form-content {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.form-section {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e4e7ed;
}

.form-section:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 24px 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.section-title i {
  font-size: 24px;
  color: #009A44;
}

.form-actions {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e4e7ed;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .breeding-license-form-container {
    padding: 16px;
  }

  .page-header {
    padding: 20px;
  }

  .header-content {
    gap: 12px;
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
  }

  .icon-wrapper i {
    font-size: 32px;
  }

  .header-text h1 {
    font-size: 24px;
  }

  .subtitle {
    font-size: 14px;
  }

  .form-content {
    padding: 20px;
  }

  :deep(.el-form-item__label) {
    font-size: 14px;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions .el-button {
    width: 100%;
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