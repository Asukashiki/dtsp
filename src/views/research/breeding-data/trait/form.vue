<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack"><i class="ri-arrow-left-line"></i></el-button>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('research.breedingData.trait.edit') : $t('research.breedingData.trait.add') }}</h1>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" v-loading="loading">
          <div class="info-card">
            <div class="card-header">
              <div class="card-title"><i class="ri-information-line"></i><span>{{ $t('research.breedingData.trait.form.basicInfo') }}</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trait.form.batchId')" prop="batchId">
                    <el-select v-model="formData.batchId" :placeholder="$t('research.breedingData.trait.placeholder.batchId')" style="width: 100%" @change="handleBatchChange">
                      <el-option v-for="item in batchOptions" :key="item.batchId" :label="item.batchName" :value="item.batchId" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trait.form.trialId')" prop="trialId">
                    <el-select v-model="formData.trialId" :placeholder="$t('research.breedingData.trait.placeholder.trialId')" style="width: 100%">
                      <el-option v-for="item in trialOptions" :key="item.trialId" :label="item.trialName" :value="item.trialId" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trait.form.recordTime')" prop="recordTime">
                    <el-date-picker v-model="formData.recordTime" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="info-card">
            <div class="card-header">
              <div class="card-title"><i class="ri-ruler-line"></i><span>{{ $t('research.breedingData.trait.form.morphological') }}</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trait.form.plantHeightCm')">
                    <el-input-number v-model="formData.plantHeightCm" :min="0" :precision="2" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trait.form.tillerCount')">
                    <el-input-number v-model="formData.tillerCount" :min="0" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trait.form.spikeLengthCm')">
                    <el-input-number v-model="formData.spikeLengthCm" :min="0" :precision="2" style="width: 100%" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="info-card">
            <div class="card-header">
              <div class="card-title"><i class="ri-calendar-line"></i><span>{{ $t('research.breedingData.trait.form.growthPeriod') }}</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trait.form.daysToEmergence')">
                    <el-input-number v-model="formData.daysToEmergence" :min="0" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trait.form.daysToTillering')">
                    <el-input-number v-model="formData.daysToTillering" :min="0" style="width: 100%" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.breedingData.trait.form.daysToHeading')">
                    <el-input-number v-model="formData.daysToHeading" :min="0" style="width: 100%" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="info-card">
            <div class="card-header">
              <div class="card-title"><i class="ri-image-line"></i><span>{{ $t('research.breedingData.trait.form.photoInfo') }}</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24">
                  <el-form-item :label="$t('research.breedingData.trait.form.photoUrl')">
                    <el-upload
                      class="photo-upload"
                      :http-request="handleUploadPhoto"
                      :file-list="photoFileList"
                      :on-remove="handleRemovePhoto"
                      :on-preview="handlePreviewPhoto"
                      :limit="1"
                      accept="image/*"
                      list-type="picture"
                    >
                      <el-button type="primary" link>
                        <i class="ri-upload-2-line"></i>
                        {{ $t('common.upload') }}
                      </el-button>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="form-actions">
            <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitLoading">{{ $t('common.save') }}</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getAgronomicTraitInfo, addAgronomicTrait, editAgronomicTrait, getBatchOptions, getTrialOptions } from '@/api/breedingData'
import { uploadFile } from '@/api/seed'
import { getFilePreviewUrl } from '@/api/file'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const submitLoading = ref(false)
const batchOptions = ref([])
const trialOptions = ref([])
const photoFileList = ref([])

const isEdit = computed(() => !!route.params.traitId)

const formData = reactive({
  traitId: '',
  batchId: '',
  trialId: '',
  recordTime: '',
  plantHeightCm: null,
  tillerCount: null,
  spikeLengthCm: null,
  daysToEmergence: null,
  daysToTillering: null,
  daysToHeading: null,
  photoUrl: ''
})

const rules = {
  batchId: [{ required: true, message: t('research.breedingData.trait.placeholder.batchId'), trigger: 'change' }],
  trialId: [{ required: true, message: t('research.breedingData.trait.placeholder.trialId'), trigger: 'change' }],
  recordTime: [{ required: true, message: t('common.pleaseSelect'), trigger: 'change' }]
}

const loadBatchOptions = async () => {
  try {
    const res = await getBatchOptions()
    batchOptions.value = res.data || []
  } catch (error) {
    console.error('获取批次选项失败:', error)
  }
}

const loadTrialOptions = async (batchId) => {
  if (!batchId) {
    trialOptions.value = []
    return
  }
  try {
    const res = await getTrialOptions(batchId)
    trialOptions.value = res.data || []
  } catch (error) {
    console.error('获取试验选项失败:', error)
  }
}

const handleBatchChange = (value) => {
  formData.trialId = ''
  loadTrialOptions(value)
}

// 照片上传处理
const handleUploadPhoto = async (options) => {
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

      photoFileList.value = [fileObj]
      formData.photoUrl = dataId

      ElMessage.success(t('common.uploadSuccess'))
    } else {
      ElMessage.error(res.msg || t('common.uploadFailed'))
    }
  } catch (error) {
    console.error('Upload error:', error)
    ElMessage.error(t('common.uploadFailed'))
  }
}

// 照片移除处理
const handleRemovePhoto = () => {
  photoFileList.value = []
  formData.photoUrl = ''
}

// 照片预览处理
const handlePreviewPhoto = async (file) => {
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
    console.error('Failed to preview photo:', error)
    ElMessage.error(t('common.failed'))
  }
}

const getInfo = async () => {
  if (!isEdit.value) return
  loading.value = true
  try {
    const res = await getAgronomicTraitInfo(route.params.traitId)
    Object.assign(formData, res.data)
    if (formData.batchId) {
      await loadTrialOptions(formData.batchId)
    }
    // 处理照片
    if (res.data.photoUrl) {
      const fileId = res.data.photoUrl
      photoFileList.value = [{
        name: t('research.breedingData.trait.form.photoUrl'),
        url: fileId,
        dataId: fileId,
        fileId: fileId,
        uid: Date.now() + '-photo'
      }]
    }
  } catch (error) {
    console.error('获取详情失败:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitLoading.value = true
  try {
    if (isEdit.value) {
      await editAgronomicTrait(formData)
      ElMessage.success(t('research.breedingData.trait.editSuccess'))
    } else {
      await addAgronomicTrait(formData)
      ElMessage.success(t('research.breedingData.trait.addSuccess'))
    }
    goBack()
  } catch (error) {
    console.error('提交失败:', error)
  } finally {
    submitLoading.value = false
  }
}

const goBack = () => router.push('/research/breeding-data/trait')

onMounted(() => {
  loadBatchOptions()
  getInfo()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 24px 0;
}

.photo-upload {
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
