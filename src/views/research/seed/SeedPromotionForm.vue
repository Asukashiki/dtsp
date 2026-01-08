<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader icon="ri-upload-cloud-2-line" :title="$t('research.seedPromotion.uploadContent')" shadow show-back
        @back="handleBack" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="180px" v-loading="loading">
          <InfoCard :title="$t('common.basicInfo')" icon="ri-information-line">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item :label="$t('research.seedPromotion.form.title')" prop="title">
                  <el-input v-model="formData.title" :placeholder="$t('research.seedPromotion.placeholder.title')"
                    clearable />
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item :label="$t('research.seedPromotion.form.videoFile')" prop="videoFile">
                  <el-upload ref="uploadRef" class="video-uploader" :auto-upload="false" :limit="1"
                    :on-change="handleVideoChange" :on-remove="handleVideoRemove" :before-upload="beforeVideoUpload"
                    accept=".mp4" drag>
                    <div class="upload-content">
                      <i class="ri-movie-line upload-icon"></i>
                      <div class="el-upload__text">
                        {{ $t('research.seedPromotion.form.selectVideo') }}
                      </div>
                      <div class="el-upload__tip">
                        {{ $t('research.seedPromotion.form.videoTips') }}
                      </div>
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item :label="$t('research.seedPromotion.form.recommendedVarieties')"
                  prop="recommendedVarieties">
                  <el-input v-model="formData.recommendedVarieties"
                    :placeholder="$t('research.seedPromotion.placeholder.recommendedVarieties')" clearable />
                  <div class="form-tip">
                    {{ $t('research.seedPromotion.form.varietiesTips') }}
                  </div>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item :label="$t('research.seedPromotion.form.validPeriod')" prop="validPeriod">
                  <el-input-number v-model="formData.validPeriod" :min="1" :max="365"
                    :placeholder="$t('research.seedPromotion.placeholder.validPeriod')" style="width: 100%" />
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item :label="$t('research.seedPromotion.form.promotionSummary')" prop="promotionSummary">
                  <el-input v-model="formData.promotionSummary" type="textarea" :rows="4"
                    :placeholder="$t('research.seedPromotion.placeholder.promotionSummary')" clearable />
                </el-form-item>
              </el-col>
            </el-row>
          </InfoCard>

          <div class="form-actions">
            <el-button @click="handleBack">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" :loading="submitting" @click="handleSubmit">
              {{ $t('common.submit') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { uploadPromotion } from '@/api/seedPromotion'
import { useUserStore } from '@/store'
import { PageHeader, InfoCard } from '@/components/common'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const loading = ref(false)
const submitting = ref(false)
const formRef = ref(null)
const uploadRef = ref(null)

const formData = ref({
  title: '',
  videoFile: null,
  recommendedVarieties: '',
  validPeriod: 90,
  promotionSummary: ''
})

const rules = computed(() => ({
  title: [
    { required: true, message: t('research.seedPromotion.rules.titleRequired'), trigger: 'blur' }
  ],
  videoFile: [
    { required: true, message: t('research.seedPromotion.rules.videoRequired'), trigger: 'change' }
  ],
  recommendedVarieties: [
    { required: true, message: t('research.seedPromotion.rules.varietiesRequired'), trigger: 'blur' }
  ],
  validPeriod: [
    { required: true, message: t('research.seedPromotion.rules.validPeriodRequired'), trigger: 'blur' },
    { type: 'number', min: 1, message: t('research.seedPromotion.rules.validPeriodFormat'), trigger: 'blur' }
  ]
}))

const handleVideoChange = (file) => {
  formData.value.videoFile = file.raw
  if (formRef.value) {
    formRef.value.validateField('videoFile')
  }
}

const handleVideoRemove = () => {
  formData.value.videoFile = null
}

const beforeVideoUpload = (file) => {
  const isMP4 = file.type === 'video/mp4'
  if (!isMP4) {
    ElMessage.error(t('research.seedPromotion.messages.videoFormatError'))
    return false
  }
  const isLt100M = file.size / 1024 / 1024 < 100
  if (!isLt100M) {
    ElMessage.error(t('research.seedPromotion.messages.videoSizeExceeded'))
    return false
  }
  return true
}

const handleBack = () => {
  router.back()
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()

    const formDataToSend = new FormData()
    formDataToSend.append('enterpriseId', userStore.userInfo?.enterpriseId || 'ENT1A3B5C7D9E8F7890')
    formDataToSend.append('title', formData.value.title)
    formDataToSend.append('videoFile', formData.value.videoFile)
    formDataToSend.append('recommendedVarieties', formData.value.recommendedVarieties)
    formDataToSend.append('validPeriod', formData.value.validPeriod)
    if (formData.value.promotionSummary) {
      formDataToSend.append('promotionSummary', formData.value.promotionSummary)
    }

    submitting.value = true
    const response = await uploadPromotion(formDataToSend)

    if (response.code === 200) {
      ElMessage.success(t('research.seedPromotion.messages.uploadSuccess'))
      handleBack()
    } else {
      ElMessage.error(response.msg || t('research.seedPromotion.messages.uploadFailed'))
    }
  } catch (error) {
    if (error !== false) {
      console.error('Failed to upload promotion:', error)
      ElMessage.error(t('research.seedPromotion.messages.uploadFailed'))
    }
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/page-common.scss';

.video-uploader {
  width: 100%;

  :deep(.el-upload) {
    width: 100%;
  }

  :deep(.el-upload-dragger) {
    width: 100%;
    padding: 40px 20px;
    background-color: #f8fafc;
    border: 2px dashed #e2e8f0;
    transition: all 0.3s;

    &:hover {
      border-color: var(--el-color-primary);
      background-color: #f0fdf4;
    }
  }

  .upload-content {
    text-align: center;

    .upload-icon {
      font-size: 56px;
      color: var(--el-color-primary);
      margin-bottom: 16px;
      display: block;
    }

    .el-upload__text {
      font-size: 15px;
      color: #475569;
      margin-bottom: 8px;
    }

    .el-upload__tip {
      font-size: 13px;
      color: #94a3b8;
      line-height: 1.6;
    }
  }
}

.form-tip {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 6px;
}
</style>
