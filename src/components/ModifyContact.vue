<template>
  <el-dialog
    v-model="dialogVisible"
    width="520px"
    :close-on-click-modal="false"
    :before-close="handleClose"
    class="contact-dialog"
  >
    <template #header>
      <div class="dialog-header">
        <div class="header-icon">
          <i :class="type === 'phone' ? 'ri-phone-line' : 'ri-mail-line'"></i>
        </div>
        <div class="header-title">
          {{ type === 'phone' ? $t('userInfo.modifyPhone') : $t('userInfo.modifyEmail') }}
        </div>
      </div>
    </template>

    <div class="contact-form">
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-form-item
          :label="type === 'phone' ? $t('userInfo.phone') : $t('userInfo.email')"
          prop="value"
        >
          <el-input
            v-model="form.value"
            :placeholder="type === 'phone' ? $t('userInfo.enterNewPhone') : $t('userInfo.enterNewEmail')"
            size="large"
          >
            <template #prefix>
              <i :class="type === 'phone' ? 'ri-phone-line' : 'ri-mail-line'"></i>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose" size="large">
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
import { postUserUpdate } from '@/api/user'
import { useUserStore } from '@/store'

const { t } = useI18n()
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'phone',
    validator: (value) => ['phone', 'email'].includes(value)
  },
  currentValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:visible', 'confirm'])
const dialogVisible = ref(false)
const formRef = ref(null)
const form = ref({
  value: ''
})
const loading = ref(false)
const userStore = useUserStore()

const rules = computed(() => {
  const phoneValidator = (rule, value, callback) => {
    if (!value) {
      callback(new Error(t('userInfo.enterNewPhone')))
    } else if (!/^1[3-9]\d{9}$/.test(value)) {
      callback(new Error(t('userInfo.phoneFormat')))
    } else {
      callback()
    }
  }

  const emailValidator = (rule, value, callback) => {
    if (!value) {
      callback(new Error(t('userInfo.enterNewEmail')))
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      callback(new Error(t('userInfo.emailFormat')))
    } else {
      callback()
    }
  }

  return {
    value: [
      {
        required: true,
        message: props.type === 'phone' ? t('userInfo.enterNewPhone') : t('userInfo.enterNewEmail'),
        trigger: 'blur'
      },
      { validator: props.type === 'phone' ? phoneValidator : emailValidator, trigger: 'blur' }
    ]
  }
})

watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val
    if (val) {
      form.value.value = props.currentValue
    }
  }
)

watch(
  () => dialogVisible.value,
  (val) => {
    emit('update:visible', val)
  }
)

const handleClose = () => {
  dialogVisible.value = false
  formRef.value?.resetFields()
}

const handleConfirm = async () => {
  if (!formRef.value) return

  try {
    const isPhone = props.type === 'phone'
    await formRef.value.validate()
    loading.value = true
    try {
      const res = await postUserUpdate(
        isPhone
          ? { phoneNumber: form.value.value, userId: userStore.userInfo?.userId || '' }
          : { email: form.value.value, userId: userStore.userInfo?.userId || '' }
      )
      if (res.code === 200) {
        ElMessage.success(t('userInfo.modifySuccess'))
        await userStore.fetchUserInfo()
        if (userStore.userInfo) {
          if (isPhone) {
            userStore.userInfo.phoneNumber = form.value.value
          } else {
            userStore.userInfo.email = form.value.value
          }
          userStore.setUserInfo(userStore.userInfo)
        }

        emit('confirm', {
          type: props.type,
          value: form.value.value
        })

        handleClose()
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      loading.value = false
    }
  } catch (error) {
    console.log('表单验证失败', error)
  }
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

.contact-form {
  padding: 0;
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
