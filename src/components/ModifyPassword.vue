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
    
    <div class="password-form">
      <div class="form-item">
        <div class="form-label">当前密码</div>
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
      </div>
      
      <div class="form-item">
        <div class="form-label">新密码</div>
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
      </div>
      
      <div class="form-item">
        <div class="form-label">确认新密码</div>
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
      </div>
    </div>
    
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

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible', 'confirm'])

const dialogVisible = ref(props.visible)
const loading = ref(false)

const form = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

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
  form.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
}

// 密码验证规则
const validatePassword = (password) => {
  // 至少包含一位数字和一位字母，长度不少于8位
  const pattern = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/
  return pattern.test(password)
}

const handleConfirm = () => {
  // 表单验证
  if (!form.value.currentPassword) {
    ElMessage.warning('请输入当前密码')
    return
  }
  
  if (!form.value.newPassword) {
    ElMessage.warning('请输入新密码')
    return
  }
  
  if (!validatePassword(form.value.newPassword)) {
    ElMessage.warning('密码应至少包含一位数字和一位字母，且不少于8位')
    return
  }
  
  if (!form.value.confirmPassword) {
    ElMessage.warning('请确认新密码')
    return
  }
  
  if (form.value.newPassword !== form.value.confirmPassword) {
    ElMessage.error('两次输入的密码不一致')
    return
  }
  
  if (form.value.currentPassword === form.value.newPassword) {
    ElMessage.warning('新密码不能与当前密码相同')
    return
  }
  
  // 模拟提交
  loading.value = true
  setTimeout(() => {
    loading.value = false
    ElMessage.success('密码修改成功')
    resetForm()
    emit('confirm', true)
    emit('update:visible', false)
  }, 1000)
}
</script>

<style scoped>
.password-form {
  padding: 0 20px;
}

.form-item {
  margin-bottom: 24px;
}

.form-label {
  font-size: 14px;
  color: #606266;
  margin-bottom: 8px;
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