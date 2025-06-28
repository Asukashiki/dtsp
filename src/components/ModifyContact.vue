<template>
  <el-dialog
    v-model="dialogVisible"
    width="520px"
    :close-on-click-modal="false"
    :before-close="handleClose"
    class="contact-dialog"
    :title="null"
  >
    <template #header>
      <div class="dialog-title">
        <img src="../assets/Title.svg" alt="标题图标" class="title-icon" />
        <span>{{ type === 'phone' ? '修改手机号' : '修改邮箱' }}</span>
      </div>
    </template>
    
    <div class="contact-form">
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <el-form-item :label="type === 'phone' ? '手机号' : '邮箱'" prop="value">
          <el-input
            v-model="form.value"
            :placeholder="type === 'phone' ? '请输入新手机号' : '请输入新邮箱'"
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
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm" :loading="loading" class="confirm-btn">确认修改</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { postUserUpdate } from '@/api/user'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'phone', // 'phone' 或 'email'
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

// 根据type类型设置不同的校验规则
const rules = computed(() => {
  const phoneValidator = (rule, value, callback) => {
    if (!value) {
      callback(new Error('请输入手机号'))
    } else if (!/^1[3-9]\d{9}$/.test(value)) {
      callback(new Error('请输入正确的手机号'))
    } else {
      callback()
    }
  }

  const emailValidator = (rule, value, callback) => {
    if (!value) {
      callback(new Error('请输入邮箱'))
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      callback(new Error('请输入正确的邮箱格式'))
    } else {
      callback()
    }
  }

  return {
    value: [
      { required: true, message: props.type === 'phone' ? '请输入手机号' : '请输入邮箱', trigger: 'blur' },
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
        isPhone ? {mobile: form.value.value }: {email: form.value.value}
      )
      if(res.code === 200) {
        ElMessage.success(props.type === 'phone' ? '手机号修改成功' : '邮箱修改成功')
        emit('confirm', form.value.value)
        handleClose()
      }
     
    } catch (error) {
      console.log('error',error)
      // ElMessage.error('修改失败，请稍后重试')
    } finally {
      loading.value = false
    }
  } catch (error) {
    // 表单验证失败
    console.log('表单验证失败', error)
  }
}
</script>

<style scoped>
.contact-form {
  padding: 0 20px;
}

.el-form :deep(.el-form-item__label) {
  font-size: 14px;
  color: #606266;
  padding-bottom: 8px;
}

.el-input :deep(.el-input__prefix) {
  margin-right: 8px;
}

.dialog-footer {
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

:deep(.el-button) {
  padding: 10px 32px;
  font-size: 14px;
  border-radius: 4px;
}

:deep(.confirm-btn) {
  background-color: #1C59E2;
  border-color: #1C59E2;
}

:deep(.confirm-btn:hover) {
  background-color: #1950cc;
  border-color: #1950cc;
}

.dialog-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.title-icon {
  width: 12px;
  height: 12px;
  margin-right: 8px;
}
</style> 