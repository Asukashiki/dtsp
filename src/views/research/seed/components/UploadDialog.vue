<template>
  <el-dialog
    :model-value="modelValue"
    :title="$t('research.seedPromotion.uploadContent')"
    width="600px"
    class="upload-dialog"
    @update:model-value="handleClose"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="140px"
      class="upload-form"
    >
      <el-form-item
        :label="$t('research.seedPromotion.form.title')"
        prop="title"
      >
        <el-input
          v-model="formData.title"
          :placeholder="$t('research.seedPromotion.placeholder.title')"
          clearable
        />
      </el-form-item>

      <el-form-item
        :label="$t('research.seedPromotion.form.videoFile')"
        prop="videoFile"
      >
        <el-upload
          ref="uploadRef"
          class="video-uploader"
          :auto-upload="false"
          :limit="1"
          :on-change="handleVideoChange"
          :on-remove="handleVideoRemove"
          :before-upload="beforeVideoUpload"
          accept=".mp4"
          drag
        >
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

      <el-form-item
        :label="$t('research.seedPromotion.form.recommendedVarieties')"
        prop="recommendedVarieties"
      >
        <el-input
          v-model="formData.recommendedVarieties"
          :placeholder="$t('research.seedPromotion.placeholder.recommendedVarieties')"
          clearable
        />
        <div class="form-tip">
          {{ $t('research.seedPromotion.form.varietiesTips') }}
        </div>
      </el-form-item>

      <el-form-item
        :label="$t('research.seedPromotion.form.validPeriod')"
        prop="validPeriod"
      >
        <el-input-number
          v-model="formData.validPeriod"
          :min="1"
          :max="365"
          :placeholder="$t('research.seedPromotion.placeholder.validPeriod')"
          style="width: 100%"
        />
      </el-form-item>

      <el-form-item
        :label="$t('research.seedPromotion.form.promotionSummary')"
        prop="promotionSummary"
      >
        <el-input
          v-model="formData.promotionSummary"
          type="textarea"
          :rows="4"
          :placeholder="$t('research.seedPromotion.placeholder.promotionSummary')"
          clearable
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          type="primary"
          :loading="uploading"
          @click="handleSubmit"
        >
          {{ uploading ? $t('common.loading') : $t('common.submit') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { uploadPromotion } from '@/api/seedPromotion'
import { useUserStore } from '@/store'

const { t } = useI18n()
const userStore = useUserStore()

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'success'])

// 表单数据
const formData = ref({
  title: '',
  videoFile: null,
  recommendedVarieties: '',
  validPeriod: 90,
  promotionSummary: ''
})

// 上传状态
const uploading = ref(false)
const formRef = ref(null)
const uploadRef = ref(null)

// 表单验证规则
const rules = computed(() => ({
  title: [
    {
      required: true,
      message: t('research.seedPromotion.rules.titleRequired'),
      trigger: 'blur'
    }
  ],
  videoFile: [
    {
      required: true,
      message: t('research.seedPromotion.rules.videoRequired'),
      trigger: 'change'
    }
  ],
  recommendedVarieties: [
    {
      required: true,
      message: t('research.seedPromotion.rules.varietiesRequired'),
      trigger: 'blur'
    }
  ],
  validPeriod: [
    {
      required: true,
      message: t('research.seedPromotion.rules.validPeriodRequired'),
      trigger: 'blur'
    },
    {
      type: 'number',
      min: 1,
      message: t('research.seedPromotion.rules.validPeriodFormat'),
      trigger: 'blur'
    }
  ]
}))

// 视频文件变化
const handleVideoChange = (file, fileList) => {
  console.log('Video file changed:', file)
  formData.value.videoFile = file.raw
  // 手动触发验证
  if (formRef.value) {
    formRef.value.validateField('videoFile')
  }
}

// 移除视频文件
const handleVideoRemove = () => {
  formData.value.videoFile = null
}

// 上传前验证
const beforeVideoUpload = (file) => {
  // 检查文件格式
  const isMP4 = file.type === 'video/mp4'
  if (!isMP4) {
    ElMessage.error(t('research.seedPromotion.messages.videoFormatError'))
    return false
  }

  // 检查文件大小（100MB = 100 * 1024 * 1024 bytes）
  const isLt100M = file.size / 1024 / 1024 < 100
  if (!isLt100M) {
    ElMessage.error(t('research.seedPromotion.messages.videoSizeExceeded'))
    return false
  }

  return true
}

// 关闭对话框
const handleClose = () => {
  emit('update:modelValue', false)
  resetForm()
}

// 重置表单
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  if (uploadRef.value) {
    uploadRef.value.clearFiles()
  }
  formData.value = {
    title: '',
    videoFile: null,
    recommendedVarieties: '',
    validPeriod: 90,
    promotionSummary: ''
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    // 验证表单
    await formRef.value.validate()

    // 准备 FormData
    const formDataToSend = new FormData()
    formDataToSend.append('enterpriseId', userStore.userInfo?.enterpriseId || 'ENT1A3B5C7D9E8F7890')
    formDataToSend.append('title', formData.value.title)
    formDataToSend.append('videoFile', formData.value.videoFile)
    formDataToSend.append('recommendedVarieties', formData.value.recommendedVarieties)
    formDataToSend.append('validPeriod', formData.value.validPeriod)
    if (formData.value.promotionSummary) {
      formDataToSend.append('promotionSummary', formData.value.promotionSummary)
    }

    // 上传
    uploading.value = true
    const response = await uploadPromotion(formDataToSend)

    if (response.code === 200) {
      ElMessage.success(t('research.seedPromotion.messages.uploadSuccess'))
      emit('success')
      handleClose()
    } else {
      ElMessage.error(response.msg || t('research.seedPromotion.messages.uploadFailed'))
    }
  } catch (error) {
    if (error !== false) { // 忽略表单验证失败的错误
      console.error('Failed to upload promotion:', error)
      ElMessage.error(t('research.seedPromotion.messages.uploadFailed'))
    }
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped lang="scss">
.upload-dialog {
  :deep(.el-dialog__body) {
    padding: 20px 24px;
  }
}

.upload-form {
  .form-tip {
    font-size: 12px;
    color: #909399;
    margin-top: 4px;
    line-height: 1.5;
  }
}

.video-uploader {
  width: 100%;

  :deep(.el-upload) {
    width: 100%;
  }

  :deep(.el-upload-dragger) {
    width: 100%;
    padding: 30px 20px;
  }

  .upload-content {
    text-align: center;

    .upload-icon {
      font-size: 56px;
      color: #009A44;
      margin-bottom: 12px;
      display: block;
    }

    .el-upload__text {
      font-size: 14px;
      color: #606266;
      margin-bottom: 8px;
    }

    .el-upload__tip {
      font-size: 12px;
      color: #909399;
      line-height: 1.5;
    }
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .upload-dialog {
    :deep(.el-dialog) {
      width: 95% !important;
      margin: 0 auto;
    }
  }

  .upload-form {
    :deep(.el-form-item__label) {
      width: 100% !important;
      text-align: left;
      margin-bottom: 8px;
    }

    :deep(.el-form-item__content) {
      margin-left: 0 !important;
    }
  }
}
</style>
