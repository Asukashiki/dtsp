<template>
  <el-dialog
    v-model="dialogVisible"
    width="560px"
    :close-on-click-modal="false"
    :before-close="handleClose"
    class="password-dialog"
  >
    <template #header>
      <div class="dialog-header">
        <div class="header-icon">
          <i class="ri-lock-password-line"></i>
        </div>
        <div class="header-title">
          {{ $t('userInfo.modifyPassword') }}
        </div>
      </div>
    </template>

    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      class="password-form"
    >
      <el-form-item prop="currentPassword" :label="$t('userInfo.currentPassword')">
        <el-input
          v-model="form.currentPassword"
          type="password"
          :placeholder="$t('userInfo.enterCurrentPassword')"
          show-password
          size="large"
        >
          <template #prefix>
            <i class="ri-lock-line"></i>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="newPassword" :label="$t('userInfo.newPassword')">
        <el-input
          v-model="form.newPassword"
          type="password"
          :placeholder="$t('userInfo.enterNewPassword')"
          show-password
          size="large"
        >
          <template #prefix>
            <i class="ri-lock-password-line"></i>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="confirmPassword" :label="$t('userInfo.confirmPassword')">
        <el-input
          v-model="form.confirmPassword"
          type="password"
          :placeholder="$t('userInfo.enterConfirmPassword')"
          show-password
          size="large"
        >
          <template #prefix>
            <i class="ri-shield-keyhole-line"></i>
          </template>
        </el-input>
      </el-form-item>

      <div class="password-hint">
        <i class="ri-information-line"></i>
        <span>{{ $t('userInfo.passwordRule') }}</span>
      </div>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel" size="large">
          {{ $t('common.cancel') }}
        </el-button>
        <el-button type="primary" @click="handleConfirm" :loading="loading" class="confirm-btn" size="large">
          <i class="ri-check-line"></i>
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { postResetPassword } from '@/api/user'
import { useUserStore } from '@/store'

const { t } = useI18n()
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible', 'confirm'])
const dialogVisible = ref(props.visible)
const loading = ref(false)
const formRef = ref(null)
const userStore = useUserStore()

const form = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Validate new password
const validateNewPassword = (rule, value, callback) => {
  const pattern = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/
  if (!pattern.test(value)) {
    callback(new Error(t('userInfo.passwordRule')))
  } else if (value === form.value.currentPassword) {
    callback(new Error(t('userInfo.passwordNotSame')))
  } else {
    callback()
  }
}

// Validate confirm password
const validateConfirmPassword = (rule, value, callback) => {
  if (value !== form.value.newPassword) {
    callback(new Error(t('userInfo.passwordNotMatch')))
  } else {
    callback()
  }
}

const rules = computed(() => ({
  currentPassword: [{ required: true, message: t('userInfo.enterCurrentPassword'), trigger: 'blur' }],
  newPassword: [
    { required: true, message: t('userInfo.enterNewPassword'), trigger: 'blur' },
    { validator: validateNewPassword, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: t('userInfo.enterConfirmPassword'), trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}))

watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val
    if (val) {
      resetForm()
    }
  }
)

watch(
  () => dialogVisible.value,
  (val) => {
    if (!val) {
      emit('update:visible', false)
    }
  }
)

const handleClose = () => {
  resetForm()
  emit('update:visible', false)
}

const handleCancel = () => {
  resetForm()
  emit('update:visible', false)
}

const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  form.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
}

const handleConfirm = () => {
  if (!formRef.value) return

  formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true

      try {
        await postResetPassword({
          oldPassword: form.value.currentPassword,
          newPassword: form.value.newPassword
        })
        ElMessage.success(t('userInfo.modifySuccess'))
        resetForm()
        emit('update:visible', false)
        userStore.logoutAndRedirect(1000)
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped>
/* Dialog Header */
:deep(.el-dialog__header) {
  padding: 24px 24px 20px;
  margin: 0;
  border-bottom: 2px solid rgba(0, 154, 68, 0.1);
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
}

.dialog-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.25);
}

.header-icon i {
  font-size: 24px;
  color: white;
}

.header-title {
  font-size: 20px;
  font-weight: 700;
  color: #009A44;
}

/* Dialog Body */
:deep(.el-dialog__body) {
  padding: 32px 24px;
}

.password-form {
  padding: 0;
}

:deep(.el-form-item) {
  margin-bottom: 24px;
}

:deep(.el-form-item__label) {
  font-size: 15px;
  font-weight: 600;
  color: #606266;
  padding-bottom: 10px;
}

:deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1) inset;
  transition: all 0.3s ease;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #009A44 inset;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #009A44 inset;
}

:deep(.el-input__prefix) {
  color: #009A44;
  font-size: 18px;
}

/* Password Hint */
.password-hint {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(0, 154, 68, 0.05);
  border-left: 3px solid #009A44;
  border-radius: 4px;
  margin-top: -8px;
  margin-bottom: 16px;
}

.password-hint i {
  font-size: 18px;
  color: #009A44;
  margin-top: 2px;
  flex-shrink: 0;
}

.password-hint span {
  font-size: 13px;
  color: #606266;
  line-height: 1.6;
}

/* Dialog Footer */
:deep(.el-dialog__footer) {
  padding: 20px 24px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.dialog-footer {
  display: flex;
  justify-content: center;
  gap: 12px;
}

:deep(.el-button) {
  min-width: 120px;
  border-radius: 8px;
  font-weight: 600;
}

.confirm-btn {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border: none;
}

.confirm-btn:hover {
  background: linear-gradient(135deg, #008038 0%, #009A44 100%);
}

.confirm-btn i {
  margin-right: 4px;
}

/* Dialog */
:deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

/* Responsive */
@media screen and (max-width: 768px) {
  :deep(.el-dialog) {
    width: 90% !important;
  }

  .dialog-footer {
    flex-direction: column;
  }

  :deep(.el-button) {
    width: 100%;
  }
}
</style>
