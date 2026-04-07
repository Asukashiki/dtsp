<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        icon="ri-shield-check-line"
        :title="isEdit ? $t('research.breedingLicense.editTitle') : $t('research.breedingLicense.addTitle')"
        :subtitle="isEdit ? $t('research.breedingLicense.editSubtitle') : $t('research.breedingLicense.addSubtitle')"
        showBack
        @back="handleBack"
      />

      <div class="content-wrapper">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="200px"
          class="breeding-license-form"
          v-loading="loading"
        >
          <!-- Basic Information -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.breedingLicense.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="24">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingLicense.form.batchId')" prop="batchId">
                    <el-select
                      v-model="formData.batchId"
                      :placeholder="$t('research.breedingLicense.form.batchId')"
                      filterable
                      class="full-width"
                    >
                      <el-option
                        v-for="item in batchList"
                        :key="item.dataId"
                        :label="item.batchName"
                        :value="item.dataId"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingLicense.form.datasetId')" prop="datasetId">
                    <el-select
                      v-model="formData.datasetId"
                      :placeholder="$t('research.breedingLicense.form.datasetId')"
                      filterable
                      clearable
                      class="full-width"
                    >
                      <el-option
                        v-for="item in datasetList"
                        :key="item.id"
                        :label="item.datasetCode + ' - ' + item.varietyName"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingLicense.form.varietyName')" prop="varietyName">
                    <el-input
                      v-model="formData.varietyName"
                      :placeholder="$t('research.breedingLicense.form.varietyName')"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingLicense.form.licenseNo')" prop="licenseNo">
                    <el-input
                      v-model="formData.licenseNo"
                      :placeholder="$t('research.breedingLicense.form.licenseNo')"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingLicense.form.licenseStatus')" prop="licenseStatus">
                    <el-select
                      v-model="formData.licenseStatus"
                      :placeholder="$t('research.breedingLicense.form.licenseStatus')"
                      class="full-width"
                    >
                      <el-option :label="$t('research.breedingLicense.status.valid')" value="valid" />
                      <el-option :label="$t('research.breedingLicense.status.expired')" value="expired" />
                      <el-option :label="$t('research.breedingLicense.status.revoked')" value="revoked" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingLicense.form.approvalDate')" prop="approvalDate">
                    <el-date-picker
                      v-model="formData.approvalDate"
                      type="date"
                      :placeholder="$t('research.breedingLicense.form.datePlaceholder')"
                      value-format="YYYY-MM-DD"
                      class="full-width"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingLicense.form.validStartDate')" prop="validStartDate">
                    <el-date-picker
                      v-model="formData.validStartDate"
                      type="date"
                      :placeholder="$t('research.breedingLicense.form.datePlaceholder')"
                      value-format="YYYY-MM-DD"
                      class="full-width"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingLicense.form.validEndDate')" prop="validEndDate">
                    <el-date-picker
                      v-model="formData.validEndDate"
                      type="date"
                      :placeholder="$t('research.breedingLicense.form.datePlaceholder')"
                      value-format="YYYY-MM-DD"
                      class="full-width"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- License Information -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-paper-line"></i>
                <span>{{ $t('research.breedingLicense.form.licenseInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="24">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingLicense.form.approvalOrg')" prop="approvalOrg">
                    <el-input
                      v-model="formData.approvalOrg"
                      :placeholder="$t('research.breedingLicense.form.approvalOrg')"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24">
                  <el-form-item :label="$t('research.breedingLicense.form.certificateFile')" prop="certificateFile">
                    <el-upload
                      class="doc-upload"
                      action="#"
                      :auto-upload="false"
                      :on-change="handleFileChange"
                      :on-remove="handleRemoveFile"
                      :on-preview="handlePreviewFile"
                      :file-list="certificateFileList"
                      :limit="1"
                      accept=".pdf,.jpg,.png,.jpeg"
                      drag
                    >
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">
                        {{ $t('common.dragFile') }} <em>{{ $t('common.clickUpload') }}</em>
                      </div>
                      <template #tip>
                        <div class="el-upload__tip">
                          {{ $t('research.breedingLicense.form.fileTip') }}
                        </div>
                      </template>
                    </el-upload>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24">
                  <el-form-item :label="$t('research.breedingLicense.form.remark')" prop="remark">
                    <el-input
                      v-model="formData.remark"
                      type="textarea"
                      :rows="3"
                      :placeholder="$t('research.breedingLicense.form.remark')"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- Variety Traits -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-plant-line"></i>
                <span>{{ $t('research.breedingLicense.form.varietyTraits') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="24">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingLicense.form.minYieldPotential')" prop="minYieldPotential">
                    <el-input-number v-model="formData.minYieldPotential" :precision="2" :step="0.1" class="full-width" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingLicense.form.maxYieldPotential')" prop="maxYieldPotential">
                    <el-input-number v-model="formData.maxYieldPotential" :precision="2" :step="0.1" class="full-width" />
                  </el-form-item>
                </el-col>
                
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingLicense.form.maturityDays')" prop="maturityDays">
                    <el-input-number v-model="formData.maturityDays" :precision="0" :step="1" class="full-width" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingLicense.form.plantHeight')" prop="plantHeight">
                    <el-input-number v-model="formData.plantHeight" :precision="1" :step="1" class="full-width" />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingLicense.form.diseaseResistance')" prop="diseaseResistance">
                    <el-input v-model="formData.diseaseResistance" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingLicense.form.stressTolerance')" prop="stressTolerance">
                    <el-input v-model="formData.stressTolerance" />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24">
                  <el-form-item :label="$t('research.breedingLicense.form.grainQualityTraits')" prop="grainQualityTraits">
                    <el-input v-model="formData.grainQualityTraits" type="textarea" :rows="2" />
                  </el-form-item>
                </el-col>
                
                <el-col :xs="24" :sm="24">
                  <el-form-item :label="$t('research.breedingLicense.form.otherTraits')" prop="otherTraits">
                    <el-input v-model="formData.otherTraits" type="textarea" :rows="2" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { PageHeader } from '@/components/common'
import {
  getLicenseById,
  addLicense,
  updateLicense
} from '@/api/breedingLicense'
import { getBreedingBatchList } from '@/api/breedingData'
import { uploadFile, getFilePreviewUrl } from '@/api/file'
import { getDatasetList } from '@/api/dataset'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// Back Handler
const handleBack = () => {
  router.back()
}

// State
const loading = ref(false)
const submitting = ref(false)
const formRef = ref(null)
const batchList = ref([])
const datasetList = ref([])
const certificateFileList = ref([])

const formData = reactive({
  batchId: '',
  datasetId: '',
  varietyName: '',
  licenseNo: '',
  approvalDate: '',
  validStartDate: '',
  validEndDate: '',
  licenseStatus: 'valid',
  approvalOrg: '',
  remark: '',
  certificateFile: '',
  certificateFileName: '',
  // Traits
  minYieldPotential: null,
  maxYieldPotential: null,
  maturityDays: null,
  plantHeight: null,
  diseaseResistance: '',
  stressTolerance: '',
  grainQualityTraits: '',
  otherTraits: ''
})

// Validation Rules
const rules = computed(() => ({
  batchId: [
    { required: true, message: t('research.breedingLicense.rules.batchRequired'), trigger: 'change' }
  ],
  varietyName: [
    { required: true, message: t('research.breedingLicense.rules.varietyNameRequired') || 'Please enter variety name', trigger: 'blur' }
  ],
  licenseNo: [
    { required: true, message: t('research.breedingLicense.rules.numberRequired'), trigger: 'blur' }
  ],
  validStartDate: [
    { required: true, message: t('research.breedingLicense.rules.applyDateRequired'), trigger: 'change' }
  ],
  validEndDate: [
    { required: true, message: t('research.breedingLicense.rules.expiryDateRequired'), trigger: 'change' }
  ],
  licenseStatus: [
    { required: true, message: t('research.breedingLicense.rules.statusRequired'), trigger: 'change' }
  ],
  approvalOrg: [
    { required: true, message: t('research.breedingLicense.rules.agencyRequired'), trigger: 'blur' }
  ]
}))

const isEdit = computed(() => !!route.params.id)

// Fetch Batches
const fetchBatchList = async () => {
  try {
    const res = await getBreedingBatchList({ pageSize: 1000 })
    if (res.code === 200) {
      batchList.value = res.rows || []
    }
  } catch (error) {
    console.error('Failed to fetch batch list:', error)
  }
}

// Fetch Datasets
const fetchDatasetList = async () => {
  try {
    const res = await getDatasetList({
      pageNum: 1,
      pageSize: 1000,
      datasetStatus: 'approved'
    })
    if (res.code === 200) {
      datasetList.value = res.rows || res.data?.list || res.data || []
    }
  } catch (error) {
    console.error('Failed to fetch dataset list:', error)
  }
}

// File Upload Handler
const handleFileChange = async (file) => {
  if (!file) return

  const isLt5M = file.size / 1024 / 1024 < 5
  if (!isLt5M) {
    ElMessage.error(t('common.uploadSizeLimit', { size: '5MB' }))
    certificateFileList.value = []
    return
  }

  try {
    const res = await uploadFile(file.raw)
    if (res.code === 200) {
      formData.certificateFile = res.data.fileId
      formData.certificateFileName = file.name
      certificateFileList.value = [{
        name: file.name,
        url: res.data.url || '',
        dataId: res.data.fileId,
        fileId: res.data.fileId
      }]
      ElMessage.success(t('common.uploadSuccess'))
    } else {
      ElMessage.error(res.msg || t('common.uploadFailed'))
      certificateFileList.value = []
    }
  } catch (error) {
    console.error('Upload error:', error)
    ElMessage.error(t('common.uploadFailed'))
  }
}

// File Remove Handler
const handleRemoveFile = () => {
  certificateFileList.value = []
  formData.certificateFile = ''
  formData.certificateFileName = ''
}

// File Preview Handler
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
      // Handle certificate file
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

    // Prepare submit data
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

<style scoped lang="scss">
@use '@/assets/styles/page-common.scss' as *;

.doc-upload {
  width: 100%;
}

:deep(.el-upload) {
  width: 100%;
}

:deep(.el-upload-dragger) {
  width: 100%;
}

.full-width {
  width: 100% !important;
}

:deep(.el-date-editor.el-input),
:deep(.el-date-editor.el-input__wrapper) {
  width: 100%;
}
</style>
