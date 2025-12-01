<template>
  <div class="agronomic-trait-form-container">
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
            {{ isEdit ? $t('research.dataCollection.agronomicTrait.edit') : $t('research.dataCollection.agronomicTrait.add') }}
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
            基础信息
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

            <el-col :span="24">
              <el-form-item
                label="照片"
                prop="photoUrl"
              >
                <el-upload
                  :action="uploadUrl"
                  :on-success="handlePhotoSuccess"
                  :before-upload="beforePhotoUpload"
                  :on-remove="handlePhotoRemove"
                  list-type="picture-card"
                  :limit="5"
                  :file-list="photoFileList"
                >
                  <el-icon><Plus /></el-icon>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 生长信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-plant-line"></i>
            {{ $t('research.dataCollection.agronomicTrait.form.growthInfo') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.agronomicTrait.form.plantHeightCm')"
                prop="plantHeightCm"
              >
                <el-input-number
                  v-model="formData.plantHeightCm"
                  :min="0"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.agronomicTrait.placeholder.plantHeightCm')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.agronomicTrait.form.tillerCount')"
                prop="tillerCount"
              >
                <el-input-number
                  v-model="formData.tillerCount"
                  :min="0"
                  :placeholder="$t('research.dataCollection.agronomicTrait.placeholder.tillerCount')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.agronomicTrait.form.spikeLengthCm')"
                prop="spikeLengthCm"
              >
                <el-input-number
                  v-model="formData.spikeLengthCm"
                  :min="0"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.agronomicTrait.placeholder.spikeLengthCm')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 物候期信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-calendar-line"></i>
            {{ $t('research.dataCollection.agronomicTrait.form.phenologyInfo') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.agronomicTrait.form.daysToEmergence')"
                prop="daysToEmergence"
              >
                <el-input-number
                  v-model="formData.daysToEmergence"
                  :min="0"
                  :placeholder="$t('research.dataCollection.agronomicTrait.placeholder.daysToEmergence')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.agronomicTrait.form.daysToTillering')"
                prop="daysToTillering"
              >
                <el-input-number
                  v-model="formData.daysToTillering"
                  :min="0"
                  :placeholder="$t('research.dataCollection.agronomicTrait.placeholder.daysToTillering')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.agronomicTrait.form.daysToHeading')"
                prop="daysToHeading"
              >
                <el-input-number
                  v-model="formData.daysToHeading"
                  :min="0"
                  :placeholder="$t('research.dataCollection.agronomicTrait.placeholder.daysToHeading')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.agronomicTrait.form.daysToFlowering')"
                prop="daysToFlowering"
              >
                <el-input-number
                  v-model="formData.daysToFlowering"
                  :min="0"
                  :placeholder="$t('research.dataCollection.agronomicTrait.placeholder.daysToFlowering')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.agronomicTrait.form.daysToGrainFilling')"
                prop="daysToGrainFilling"
              >
                <el-input-number
                  v-model="formData.daysToGrainFilling"
                  :min="0"
                  :placeholder="$t('research.dataCollection.agronomicTrait.placeholder.daysToGrainFilling')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.agronomicTrait.form.daysToMaturity')"
                prop="daysToMaturity"
              >
                <el-input-number
                  v-model="formData.daysToMaturity"
                  :min="0"
                  :placeholder="$t('research.dataCollection.agronomicTrait.placeholder.daysToMaturity')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 产量信息 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-bar-chart-line"></i>
            {{ $t('research.dataCollection.agronomicTrait.form.yieldInfo') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.agronomicTrait.form.lodgingScore')"
                prop="lodgingScore"
              >
                <el-input-number
                  v-model="formData.lodgingScore"
                  :min="0"
                  :placeholder="$t('research.dataCollection.agronomicTrait.placeholder.lodgingScore')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.agronomicTrait.form.biomassWeightKg')"
                prop="biomassWeightKg"
              >
                <el-input-number
                  v-model="formData.biomassWeightKg"
                  :min="0"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.agronomicTrait.placeholder.biomassWeightKg')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.agronomicTrait.form.spikeDensity')"
                prop="spikeDensity"
              >
                <el-input-number
                  v-model="formData.spikeDensity"
                  :min="0"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.agronomicTrait.placeholder.spikeDensity')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.agronomicTrait.form.grainWeightPerSpike')"
                prop="grainWeightPerSpike"
              >
                <el-input-number
                  v-model="formData.grainWeightPerSpike"
                  :min="0"
                  :precision="2"
                  :placeholder="$t('research.dataCollection.agronomicTrait.placeholder.grainWeightPerSpike')"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 健康状态 -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-heart-pulse-line"></i>
            {{ $t('research.dataCollection.agronomicTrait.form.healthInfo') }}
          </div>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.agronomicTrait.form.diseaseScore')"
                prop="diseaseScore"
              >
                <el-input
                  v-model="formData.diseaseScore"
                  type="textarea"
                  :rows="3"
                  :placeholder="$t('research.dataCollection.agronomicTrait.placeholder.diseaseScore')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                :label="$t('research.dataCollection.agronomicTrait.form.stressIndicators')"
                prop="stressIndicators"
              >
                <el-input
                  v-model="formData.stressIndicators"
                  type="textarea"
                  :rows="3"
                  :placeholder="$t('research.dataCollection.agronomicTrait.placeholder.stressIndicators')"
                />
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item
                :label="$t('research.dataCollection.agronomicTrait.form.pestObservation')"
                prop="pestObservation"
              >
                <el-input
                  v-model="formData.pestObservation"
                  type="textarea"
                  :rows="3"
                  :placeholder="$t('research.dataCollection.agronomicTrait.placeholder.pestObservation')"
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
import { Plus } from '@element-plus/icons-vue'
import { getAgronomicTraitDetail, addAgronomicTrait, editAgronomicTrait } from '@/api/breeding'
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
const photoFileList = ref([])
const uploadUrl = computed(() => import.meta.env.VITE_APP_LOCAL_TEST_API_URL + '/common/upload')

// 判断是否为编辑模式
const isEdit = computed(() => !!route.params.id)

// 表单数据
const formData = reactive({
  batchId: '',
  trialId: '',
  photoUrl: '',
  plantHeightCm: null,
  tillerCount: null,
  spikeLengthCm: null,
  daysToEmergence: null,
  daysToTillering: null,
  daysToHeading: null,
  daysToFlowering: null,
  daysToGrainFilling: null,
  daysToMaturity: null,
  lodgingScore: null,
  biomassWeightKg: null,
  spikeDensity: null,
  grainWeightPerSpike: null,
  diseaseScore: '',
  stressIndicators: '',
  pestObservation: ''
})

// 表单验证规则
const rules = computed(() => ({
  batchId: [
    { required: true, message: '请选择育种批次', trigger: 'change' }
  ],
  trialId: [
    { required: true, message: '请输入试验ID', trigger: 'blur' }
  ],
  plantHeightCm: [
    { required: true, message: t('research.dataCollection.agronomicTrait.rules.plantHeightCmRequired'), trigger: 'blur' }
  ],
  tillerCount: [
    { required: true, message: t('research.dataCollection.agronomicTrait.rules.tillerCountRequired'), trigger: 'blur' }
  ],
  spikeLengthCm: [
    { required: true, message: t('research.dataCollection.agronomicTrait.rules.spikeLengthCmRequired'), trigger: 'blur' }
  ],
  daysToEmergence: [
    { required: true, message: t('research.dataCollection.agronomicTrait.rules.daysToEmergenceRequired'), trigger: 'blur' }
  ],
  daysToTillering: [
    { required: true, message: t('research.dataCollection.agronomicTrait.rules.daysToTilleringRequired'), trigger: 'blur' }
  ],
  daysToHeading: [
    { required: true, message: t('research.dataCollection.agronomicTrait.rules.daysToHeadingRequired'), trigger: 'blur' }
  ],
  daysToFlowering: [
    { required: true, message: t('research.dataCollection.agronomicTrait.rules.daysToFloweringRequired'), trigger: 'blur' }
  ],
  daysToGrainFilling: [
    { required: true, message: t('research.dataCollection.agronomicTrait.rules.daysToGrainFillingRequired'), trigger: 'blur' }
  ],
  daysToMaturity: [
    { required: true, message: t('research.dataCollection.agronomicTrait.rules.daysToMaturityRequired'), trigger: 'blur' }
  ],
  lodgingScore: [
    { required: true, message: t('research.dataCollection.agronomicTrait.rules.lodgingScoreRequired'), trigger: 'blur' }
  ],
  biomassWeightKg: [
    { required: true, message: t('research.dataCollection.agronomicTrait.rules.biomassWeightKgRequired'), trigger: 'blur' }
  ],
  spikeDensity: [
    { required: true, message: t('research.dataCollection.agronomicTrait.rules.spikeDensityRequired'), trigger: 'blur' }
  ],
  grainWeightPerSpike: [
    { required: true, message: t('research.dataCollection.agronomicTrait.rules.grainWeightPerSpikeRequired'), trigger: 'blur' }
  ],
  diseaseScore: [
    { required: true, message: t('research.dataCollection.agronomicTrait.rules.diseaseScoreRequired'), trigger: 'blur' }
  ],
  stressIndicators: [
    { required: true, message: t('research.dataCollection.agronomicTrait.rules.stressIndicatorsRequired'), trigger: 'blur' }
  ],
  pestObservation: [
    { required: true, message: t('research.dataCollection.agronomicTrait.rules.pestObservationRequired'), trigger: 'blur' }
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

// 照片上传处理
const handlePhotoSuccess = (response, file, fileList) => {
  if (response.code === 200) {
    formData.photoUrl = response.data.url
    ElMessage.success('照片上传成功')
  }
}

const beforePhotoUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过 5MB!')
    return false
  }
  return true
}

const handlePhotoRemove = (file, fileList) => {
  if (fileList.length === 0) {
    formData.photoUrl = ''
  }
}

// 加载详情数据
const loadDetail = async () => {
  try {
    const res = await getAgronomicTraitDetail(route.params.id)
    if (res.code === 200 && res.data) {
      Object.assign(formData, res.data)
      // 如果有照片URL,初始化文件列表
      if (res.data.photoUrl) {
        photoFileList.value = [{
          name: 'photo',
          url: res.data.photoUrl
        }]
      }
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
      res = await editAgronomicTrait(submitData)
      if (res.code === 200) {
        ElMessage.success(t('research.dataCollection.agronomicTrait.editSuccess'))
        router.push('/research/data-collection/agronomic-trait')
      }
    } else {
      res = await addAgronomicTrait(submitData)
      if (res.code === 200) {
        ElMessage.success(t('research.dataCollection.agronomicTrait.addSuccess'))
        router.push('/research/data-collection/agronomic-trait')
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
.agronomic-trait-form-container {
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
  :deep(.el-textarea),
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
