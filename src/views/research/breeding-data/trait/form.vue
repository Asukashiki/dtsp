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
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="160px" v-loading="loading">
          <!-- Basic Information -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title"><i class="ri-information-line"></i><span>Basic Information</span></div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <!-- Trait Record ID (read-only, auto-generated) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Trait Record ID">
                    <el-input v-model="formData.traitRecordId" disabled placeholder="{plot_id}-T{record_no}" />
                  </el-form-item>
                </el-col>
                <!-- Plot ID -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Plot ID" prop="plotId">
                    <el-select v-model="formData.plotId" placeholder="Please select Plot ID" filterable style="width: 100%" @change="handlePlotChange">
                      <el-option v-for="item in plotOptions" :key="item.plotId" :label="item.plotId" :value="item.plotId" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- Trial ID (read-only, auto-filled from Plot) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Trial ID">
                    <el-input v-model="formData.trialId" disabled placeholder="Auto-filled from Plot ID" />
                  </el-form-item>
                </el-col>
                <!-- Batch ID (read-only, auto-filled from Plot) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Batch ID">
                    <el-input v-model="formData.batchId" disabled placeholder="Auto-filled from Plot ID" />
                  </el-form-item>
                </el-col>
                <!-- Observation Date -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Observation Date" prop="observationDate">
                    <el-date-picker v-model="formData.observationDate" type="date" value-format="YYYY-MM-DD" style="width: 100%" placeholder="Select observation date" />
                  </el-form-item>
                </el-col>
                <!-- Growth Stage -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Growth Stage" prop="growthStage">
                    <el-select v-model="formData.growthStage" placeholder="Please select Growth Stage" style="width: 100%">
                      <el-option label="Germination" value="germination" />
                      <el-option label="Seedling" value="seedling" />
                      <el-option label="Tillering" value="tillering" />
                      <el-option label="Stem Elongation" value="stem_elongation" />
                      <el-option label="Booting" value="booting" />
                      <el-option label="Heading" value="heading" />
                      <el-option label="Flowering" value="flowering" />
                      <el-option label="Milk" value="milk" />
                      <el-option label="Dough" value="dough" />
                      <el-option label="Maturity" value="maturity" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- Trait Code -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Trait Code" prop="traitCode">
                    <el-input v-model="formData.traitCode" placeholder="Enter trait code" />
                  </el-form-item>
                </el-col>
                <!-- Trait Name -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Trait Name" prop="traitName">
                    <el-input v-model="formData.traitName" placeholder="Enter trait name" />
                  </el-form-item>
                </el-col>
                <!-- Trait Value -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Trait Value" prop="traitValue">
                    <el-input-number v-model="formData.traitValue" :precision="2" style="width: 100%" placeholder="Enter trait value" />
                  </el-form-item>
                </el-col>
                <!-- Unit -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Unit">
                    <el-input v-model="formData.unit" placeholder="Enter unit (e.g., cm, kg, %)" />
                  </el-form-item>
                </el-col>
                <!-- Observer ID (read-only) -->
                <el-col :xs="24" :sm="12">
                  <el-form-item label="Observer ID">
                    <el-input v-model="formData.observerId" disabled placeholder="Current user ID" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- Morphological -->
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

          <!-- Growth Period -->
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

          <!-- Photo Information -->
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
import { useUserStore } from '@/store/user'
import { getAgronomicTraitInfo, addAgronomicTrait, editAgronomicTrait, getPlotOptions } from '@/api/breedingData'
import { uploadFile } from '@/api/seed'
import { getFilePreviewUrl } from '@/api/file'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const formRef = ref(null)
const loading = ref(false)
const submitLoading = ref(false)
const plotOptions = ref([])
const photoFileList = ref([])

const isEdit = computed(() => !!route.params.traitId)

const formData = reactive({
  traitRecordId: '',
  plotId: '',
  trialId: '',
  batchId: '',
  observationDate: getCurrentDate(),
  growthStage: '',
  traitCode: '',
  traitName: '',
  traitValue: null,
  unit: '',
  observerId: userStore.userInfo?.user?.ID || '',
  plantHeightCm: null,
  tillerCount: null,
  spikeLengthCm: null,
  daysToEmergence: null,
  daysToTillering: null,
  daysToHeading: null,
  photoUrl: ''
})

const rules = {
  plotId: [{ required: true, message: 'Please select Plot ID', trigger: 'change' }],
  observationDate: [{ required: true, message: 'Please select Observation Date', trigger: 'change' }],
  growthStage: [{ required: true, message: 'Please select Growth Stage', trigger: 'change' }],
  traitCode: [{ required: true, message: 'Please enter Trait Code', trigger: 'blur' }],
  traitName: [{ required: true, message: 'Please enter Trait Name', trigger: 'blur' }],
  traitValue: [{ required: true, message: 'Please enter Trait Value', trigger: 'blur' }]
}

// 获取当前日期
function getCurrentDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 加载地块选项
const loadPlotOptions = async () => {
  try {
    const res = await getPlotOptions()
    plotOptions.value = res.data || []
  } catch (error) {
    console.error('Failed to load plot options:', error)
  }
}

// 地块变更处理 - 自动填充 trial_id 和 batch_id
const handlePlotChange = (plotId) => {
  const selectedPlot = plotOptions.value.find(item => item.plotId === plotId)
  if (selectedPlot) {
    formData.trialId = selectedPlot.trialId || ''
    formData.batchId = selectedPlot.batchId || ''
    // 生成 trait_record_id
    generateTraitRecordId()
  } else {
    formData.trialId = ''
    formData.batchId = ''
    formData.traitRecordId = ''
  }
}

// 生成 trait_record_id: {plot_id}-T{record_no}
const generateTraitRecordId = () => {
  if (!formData.plotId) return
  // 这里的 record_no 应该由后端生成，前端显示格式
  // 临时使用时间戳作为示例
  const recordNo = String(Date.now()).slice(-6)
  formData.traitRecordId = `${formData.plotId}-T${recordNo}`
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
    console.error('Failed to load trait info:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitLoading.value = true
  try {
    const submitData = { ...formData }

    if (isEdit.value) {
      await editAgronomicTrait(submitData)
      ElMessage.success('Trait updated successfully')
    } else {
      await addAgronomicTrait(submitData)
      ElMessage.success('Trait added successfully')
    }
    goBack()
  } catch (error) {
    console.error('Submit failed:', error)
  } finally {
    submitLoading.value = false
  }
}

const goBack = () => router.push('/research/breeding-data/trait')

onMounted(() => {
  loadPlotOptions()
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
