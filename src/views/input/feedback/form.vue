<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ isEdit ? $t('input.feedback.edit') : $t('input.feedback.add') }}</h1>
          </div>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="content-wrapper">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" class="w-full">
          <!-- 基本信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('input.feedback.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.feedback.form.feedbackType')" prop="feedbackType">
                    <el-select v-model="formData.feedbackType" :placeholder="$t('input.feedback.placeholder.feedbackType')" style="width: 100%">
                      <el-option :label="$t('input.feedback.type.complaint')" value="0" />
                      <el-option :label="$t('input.feedback.type.suggestion')" value="1" />
                      <el-option :label="$t('input.feedback.type.inquiry')" value="2" />
                      <el-option :label="$t('input.feedback.type.fault')" value="3" />
                      <el-option :label="$t('input.feedback.type.other')" value="4" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.feedback.form.priority')" prop="priority">
                    <el-select v-model="formData.priority" :placeholder="$t('input.feedback.placeholder.priority')" style="width: 100%">
                      <el-option :label="$t('input.feedback.priority.low')" value="0" />
                      <el-option :label="$t('input.feedback.priority.medium')" value="1" />
                      <el-option :label="$t('input.feedback.priority.high')" value="2" />
                      <el-option :label="$t('input.feedback.priority.urgent')" value="3" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24">
                  <el-form-item :label="$t('input.feedback.form.title')" prop="title">
                    <el-input
                      v-model="formData.title"
                      :placeholder="$t('input.feedback.placeholder.title')"
                      maxlength="200"
                      show-word-limit
                      clearable />
                  </el-form-item>
                </el-col>

                <el-col :xs="24">
                  <el-form-item :label="$t('input.feedback.form.content')" prop="content">
                    <el-input
                      v-model="formData.content"
                      :placeholder="$t('input.feedback.placeholder.content')"
                      type="textarea"
                      :rows="6"
                      maxlength="2000"
                      show-word-limit
                      clearable />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.feedback.form.inputName')" prop="inputName">
                    <el-input v-model="formData.inputName" :placeholder="$t('input.feedback.placeholder.inputName')" clearable />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.feedback.form.supplierName')" prop="supplierName">
                    <el-input v-model="formData.supplierName" :placeholder="$t('input.feedback.placeholder.supplierName')" clearable />
                  </el-form-item>
                </el-col>

                <el-col :xs="24">
                  <el-form-item :label="$t('input.feedback.form.remark')" prop="remark">
                    <el-input
                      v-model="formData.remark"
                      :placeholder="$t('input.feedback.placeholder.remark')"
                      type="textarea"
                      :rows="3"
                      maxlength="500"
                      show-word-limit
                      clearable />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 联系信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-contacts-line"></i>
                <span>{{ $t('input.feedback.form.contactInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.feedback.form.contactName')" prop="contactName">
                    <el-input v-model="formData.contactName" :placeholder="$t('input.feedback.placeholder.contactName')" maxlength="100" clearable />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('input.feedback.form.contactPhone')" prop="contactPhone">
                    <el-input v-model="formData.contactPhone" :placeholder="$t('input.feedback.placeholder.contactPhone')" maxlength="20" clearable />
                  </el-form-item>
                </el-col>
                <el-col :xs="24">
                  <el-form-item :label="$t('input.feedback.form.contactEmail')" prop="contactEmail">
                    <el-input v-model="formData.contactEmail" :placeholder="$t('input.feedback.placeholder.contactEmail')" maxlength="100" clearable />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <!-- 操作按钮（固定在底部） -->
          <div class="form-actions">
            <el-button
              v-for="button in getActionButtons()"
              :key="button.action"
              :type="button.type"
              :loading="submitLoading && button.action === 'submit'"
              @click="handleAction(button.action)">
              {{ $t(`common.${button.label}`) }}
            </el-button>
          </div>
        </el-form>
      </div>
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

// 底部按钮配置（仅 UI）
const getActionButtons = () => ([
  { type: '', label: 'cancel', action: 'cancel' },
  { type: 'primary', label: 'submit', action: 'submit' }
])

const handleAction = (action) => {
  switch (action) {
    case 'cancel':
      goBack()
      break
    case 'submit':
      handleSubmit()
      break
  }
}

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

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
