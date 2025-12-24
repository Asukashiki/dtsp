<template>
  <div class="feedback-form-page">
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
          <h1 class="page-title">{{ isEdit ? $t('input.feedback.edit') : $t('input.feedback.add') }}</h1>
        </div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div class="form-wrapper">
      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="feedback-form">
        <!-- 基本信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-information-line"></i>
            <h3>{{ $t('input.feedback.form.basicInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('input.feedback.form.feedbackType')" prop="feedbackType">
              <el-select v-model="formData.feedbackType" :placeholder="$t('input.feedback.placeholder.feedbackType')" class="full-width">
                <el-option :label="$t('input.feedback.type.complaint')" value="0" />
                <el-option :label="$t('input.feedback.type.suggestion')" value="1" />
                <el-option :label="$t('input.feedback.type.inquiry')" value="2" />
                <el-option :label="$t('input.feedback.type.fault')" value="3" />
                <el-option :label="$t('input.feedback.type.other')" value="4" />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('input.feedback.form.priority')" prop="priority">
              <el-select v-model="formData.priority" :placeholder="$t('input.feedback.placeholder.priority')" class="full-width">
                <el-option :label="$t('input.feedback.priority.low')" value="0" />
                <el-option :label="$t('input.feedback.priority.medium')" value="1" />
                <el-option :label="$t('input.feedback.priority.high')" value="2" />
                <el-option :label="$t('input.feedback.priority.urgent')" value="3" />
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('input.feedback.form.title')" prop="title" class="full-width-item">
              <el-input
                v-model="formData.title"
                :placeholder="$t('input.feedback.placeholder.title')"
                maxlength="200"
                show-word-limit
                clearable
              />
            </el-form-item>

            <el-form-item :label="$t('input.feedback.form.content')" prop="content" class="full-width-item">
              <el-input
                v-model="formData.content"
                :placeholder="$t('input.feedback.placeholder.content')"
                type="textarea"
                :rows="6"
                maxlength="2000"
                show-word-limit
                clearable
              />
            </el-form-item>

            <el-form-item :label="$t('input.feedback.form.inputName')" prop="inputName">
              <el-input
                v-model="formData.inputName"
                :placeholder="$t('input.feedback.placeholder.inputName')"
                clearable
              />
            </el-form-item>

            <el-form-item :label="$t('input.feedback.form.supplierName')" prop="supplierName">
              <el-input
                v-model="formData.supplierName"
                :placeholder="$t('input.feedback.placeholder.supplierName')"
                clearable
              />
            </el-form-item>

            <el-form-item :label="$t('input.feedback.form.remark')" prop="remark" class="full-width-item">
              <el-input
                v-model="formData.remark"
                :placeholder="$t('input.feedback.placeholder.remark')"
                type="textarea"
                :rows="3"
                maxlength="500"
                show-word-limit
                clearable
              />
            </el-form-item>
          </div>
        </div>

        <!-- 联系信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-contacts-line"></i>
            <h3>{{ $t('input.feedback.form.contactInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('input.feedback.form.contactName')" prop="contactName">
              <el-input
                v-model="formData.contactName"
                :placeholder="$t('input.feedback.placeholder.contactName')"
                maxlength="100"
                clearable
              />
            </el-form-item>

            <el-form-item :label="$t('input.feedback.form.contactPhone')" prop="contactPhone">
              <el-input
                v-model="formData.contactPhone"
                :placeholder="$t('input.feedback.placeholder.contactPhone')"
                maxlength="20"
                clearable
              />
            </el-form-item>

            <el-form-item :label="$t('input.feedback.form.contactEmail')" prop="contactEmail" class="full-width-item">
              <el-input
                v-model="formData.contactEmail"
                :placeholder="$t('input.feedback.placeholder.contactEmail')"
                maxlength="100"
                clearable
              />
            </el-form-item>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="goBack">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" :loading="submitLoading" @click="handleSubmit">
            {{ $t('common.submit') }}
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
import { getFeedbackDetail, submitFeedback, updateFeedback } from '@/api/feedback'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const submitLoading = ref(false)
const isEdit = computed(() => route.path.includes('/edit/'))
const feedbackId = computed(() => route.params.id)

const formData = reactive({
  feedbackType: '',
  title: '',
  content: '',
  inputName: '',
  supplierName: '',
  contactName: '',
  contactPhone: '',
  contactEmail: '',
  priority: '0', // 默认为低优先级
  remark: ''
})

// 电话号码验证器
const validatePhone = (rule, value, callback) => {
  if (!value) {
    callback()
    return
  }
  const phoneRegex = /^[0-9+\-\s()]+$/
  if (!phoneRegex.test(value)) {
    callback(new Error(t('input.feedback.rules.contactPhoneFormat')))
  } else {
    callback()
  }
}

// 邮箱验证器
const validateEmail = (rule, value, callback) => {
  if (!value) {
    callback()
    return
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) {
    callback(new Error(t('input.feedback.rules.contactEmailFormat')))
  } else {
    callback()
  }
}

const rules = computed(() => ({
  feedbackType: [
    { required: true, message: t('input.feedback.rules.feedbackTypeRequired'), trigger: 'change' }
  ],
  title: [
    { required: true, message: t('input.feedback.rules.titleRequired'), trigger: 'blur' },
    { max: 200, message: t('input.feedback.rules.titleLength'), trigger: 'blur' }
  ],
  content: [
    { required: true, message: t('input.feedback.rules.contentRequired'), trigger: 'blur' }
  ],
  contactName: [
    { required: true, message: t('input.feedback.rules.contactNameRequired'), trigger: 'blur' },
    { max: 100, message: t('input.feedback.rules.contactNameLength'), trigger: 'blur' }
  ],
  contactPhone: [
    { required: true, message: t('input.feedback.rules.contactPhoneRequired'), trigger: 'blur' },
    { max: 20, message: t('input.feedback.rules.contactPhoneLength'), trigger: 'blur' },
    { validator: validatePhone, trigger: 'blur' }
  ],
  contactEmail: [
    { max: 100, message: t('input.feedback.rules.contactEmailLength'), trigger: 'blur' },
    { validator: validateEmail, trigger: 'blur' }
  ],
  remark: [
    { max: 500, message: t('input.feedback.rules.remarkLength'), trigger: 'blur' }
  ]
}))

// 返回
const goBack = () => {
  router.back()
}

// 加载数据
const loadData = async () => {
  if (!isEdit.value) return

  try {
    const res = await getFeedbackDetail(feedbackId.value)
    if (res.code === 200 && res.data) {
      Object.assign(formData, {
        feedbackType: res.data.feedbackType || '',
        title: res.data.title || '',
        content: res.data.content || '',
        inputName: res.data.inputName || '',
        supplierName: res.data.supplierName || '',
        contactName: res.data.contactName || '',
        contactPhone: res.data.contactPhone || '',
        contactEmail: res.data.contactEmail || '',
        priority: res.data.priority || '0',
        remark: res.data.remark || ''
      })
    }
  } catch (error) {
    console.error('Failed to load feedback detail:', error)
    ElMessage.error(t('common.loadFailed'))
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    submitLoading.value = true

    const data = {
      feedbackType: formData.feedbackType,
      title: formData.title,
      content: formData.content,
      inputName: formData.inputName || undefined,
      supplierName: formData.supplierName || undefined,
      contactName: formData.contactName || undefined,
      contactPhone: formData.contactPhone || undefined,
      contactEmail: formData.contactEmail || undefined,
      priority: formData.priority,
      remark: formData.remark || undefined
    }

    if (isEdit.value) {
      data.feedbackId = parseInt(feedbackId.value)
      const res = await updateFeedback(data)
      if (res.code === 200) {
        ElMessage.success(t('input.feedback.editSuccess'))
        setTimeout(() => router.back(), 1000)
      }
    } else {
      const res = await submitFeedback(data)
      if (res.code === 200) {
        ElMessage.success(t('input.feedback.addSuccess'))
        setTimeout(() => router.back(), 1000)
      }
    }
  } catch (error) {
    if (error !== false) { // 不是表单验证错误
      console.error('Form submission error:', error)
    }
  } finally {
    submitLoading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.feedback-form-page {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: white;
  padding: 16px 0;
  margin: -24px 0 24px 0;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.header-right {
  justify-content: flex-end;
}

.header-center {
  text-align: center;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

/* 表单区域 */
.form-wrapper {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-block {
  margin-bottom: 32px;
}

.block-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f2f5;
}

.block-header i {
  font-size: 20px;
  color: #009A44;
}

.block-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.full-width-item {
  grid-column: 1 / -1;
}

.full-width {
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #f0f2f5;
  margin-top: 24px;
}

/* 响应式设计 */
@media screen and (max-width: 1024px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 0 16px;
    grid-template-columns: auto 1fr;
    gap: 16px;
  }

  .header-right {
    display: none;
  }

  .header-center {
    text-align: left;
  }

  .page-title {
    font-size: 18px;
  }

  .form-wrapper {
    padding: 16px;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions .el-button {
    width: 100%;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 0 12px;
  }

  .page-title {
    font-size: 16px;
  }

  .form-wrapper {
    padding: 12px;
  }
}
</style>
