<template>
  <el-dialog
    v-model="dialogVisible"
    width="520px"
    :close-on-click-modal="false"
    :before-close="handleClose"
    class="password-dialog"
    :title="null"
  >
    <template #header>
      <div class="dialog-title">
        <img src="../assets/Title.svg" alt="标题图标" class="title-icon" />
        <span>修改密码</span>
      </div>
    </template>
    
    <el-form 
      ref="formRef" 
      :model="form" 
      :rules="rules" 
      label-position="top"
      class="password-form"
    >
      <el-form-item prop="currentPassword" label="当前密码">
        <el-input
          v-model="form.currentPassword"
          type="password"
          placeholder="请输入当前密码"
          show-password
        >
          <template #prefix>
            <i class="ri-lock-line"></i>
          </template>
        </el-input>
      </el-form-item>
      
      <el-form-item prop="newPassword" label="新密码">
        <el-input
          v-model="form.newPassword"
          type="password"
          placeholder="请输入新密码"
          show-password
        >
          <template #prefix>
            <i class="ri-lock-password-line"></i>
          </template>
        </el-input>
      </el-form-item>
      
      <el-form-item prop="confirmPassword" label="确认新密码">
        <el-input
          v-model="form.confirmPassword"
          type="password"
          placeholder="再次输入新密码"
          show-password
        >
          <template #prefix>
            <i class="ri-shield-keyhole-line"></i>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm" :loading="loading" class="confirm-btn">确认修改</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { postResetPassword } from '@/api/user'
import { useUserStore } from '@/store'

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

// 验证新密码是否符合规则
const validateNewPassword = (rule, value, callback) => {
  // 至少包含一位数字和一位字母，长度不少于8位
  const pattern = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/
  if (!pattern.test(value)) {
    callback(new Error('密码应至少包含一位数字和一位字母，且不少于8位'))
  } else if (value === form.value.currentPassword) {
    callback(new Error('新密码不能与当前密码相同'))
  } else {
    callback()
  }
}

// 验证确认密码是否与新密码一致
const validateConfirmPassword = (rule, value, callback) => {
  if (value !== form.value.newPassword) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  currentPassword: [
    { required: true, message: '请输入当前密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { validator: validateNewPassword, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

// 监听visible属性变化
watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val
    if (val) {
      resetForm() // 打开弹窗时重置表单
    }
  }
)

// 监听对话框状态变化
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
        const userInfo = userStore.userInfo?.user || {}
        // 实际调用API
        await postResetPassword({
          userId: userInfo.ID,
          password: form.value.currentPassword,
          newPassword: form.value.newPassword,
          confirmPassword: form.value.confirmPassword
        })      
        ElMessage.success('密码修改成功')
        resetForm()
        emit('confirm', true)
        emit('update:visible', false)
      } catch (error) {
        console.error(error, error)
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped>
.password-form {
  padding: 0 20px;
}

:deep(.el-form-item) {
  margin-bottom: 24px;
}

:deep(.el-form-item__label) {
  font-size: 14px;
  color: #606266;
  padding-bottom: 0;
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