<template>
  <el-drawer
    :model-value="visible"
    @update:model-value="$emit('update:visible', $event)"
    title="个人信息"
    :size="450"
    destroy-on-close
    direction="rtl"
    class="user-details-drawer user-details-overlay"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :z-index="2000"
  >
    <div class="user-details">
      <div class="details-section">
        <div class="section-title">基本信息</div>
        <div class="info-item basic-info-item">
          <div class="info-label">姓名</div>
          <div class="info-value">{{ userInfo.name }}</div>
        </div>
        <div class="info-item basic-info-item">
          <div class="info-label">工号</div>
          <div class="info-value">{{ userInfo.employeeId }}</div>
        </div>
        <div class="info-item basic-info-item">
          <div class="info-label">所属部门</div>
          <div class="info-value">{{ userInfo.department }}</div>
        </div>
      </div>

      <div class="details-section">
        <div class="section-title">联系方式</div>
        <div class="info-item">
          <div class="info-label">
            <i class="ri-phone-line"></i> 
            手机
          </div>
          <div class="info-value">{{ userInfo.phone }}</div>
          <div class="info-action" @click="handleEditContact('phone')">修改</div>
        </div>
        <div class="info-item">
          <div class="info-label">
            <i class="ri-mail-line"></i> 
            邮箱
          </div>
          <div class="info-value">{{ userInfo.email }}</div>
          <div class="info-action nowrap" @click="handleEditContact('email')">修改</div>
        </div>
      </div>

      <div class="details-section">
        <div class="section-title">账户安全</div>
        <div class="info-item">
          <div class="info-label">
            <i class="ri-lock-line"></i> 
            登录密码
          </div>
          <div class="info-value">已设置</div>
          <div class="info-action" @click="handleEditSecurity('password')">修改密码</div>
        </div>
        <div class="info-item">
          <div class="info-label">
            <i class="ri-shield-check-line"></i> 
            安全等级
          </div>
          <div class="info-value">
            <div class="security-level">
              <span class="security-high">高</span>
            </div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-label">
            <i class="ri-history-line"></i> 
            上次修改时间
          </div>
          <div class="info-value">{{ userInfo.lastPasswordChange }}</div>
        </div>
      </div>
    </div>
    
    <!-- 引入修改密码弹窗 -->
    <ModifyPassword 
      v-model:visible="passwordDialogVisible" 
      @confirm="handlePasswordChanged" 
    />

    <!-- 引入修改联系方式弹窗 -->
    <ModifyContact
      v-model:visible="contactDialogVisible"
      :type="contactEditType"
      :current-value="contactCurrentValue"
      @confirm="handleContactChanged"
    />
  </el-drawer>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import ModifyPassword from './ModifyPassword.vue'
import ModifyContact from './ModifyContact.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  userInfo: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['update:visible', 'edit'])
const passwordDialogVisible = ref(false)
const contactDialogVisible = ref(false)
const contactEditType = ref('phone')
const contactCurrentValue = ref('')

const handleClose = () => {
  emit('update:visible', false)
}

const handleEditContact = (type) => {
  contactEditType.value = type
  contactCurrentValue.value = props.userInfo[type]
  contactDialogVisible.value = true
}

const handleContactChanged = (newValue) => {
  emit('edit', { 
    type: contactEditType.value, 
    value: newValue 
  })
}

const handleEditSecurity = (type) => {
  if (type === 'password') {
    passwordDialogVisible.value = true
  }
}

const handlePasswordChanged = (success) => {
  if (success) {
    // 更新上次修改密码时间
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const formattedDate = `${year}年${month}月${day}日`
    
    // 这里实际项目中应该通知父组件更新userInfo
    emit('edit', { 
      type: 'passwordChanged',
      value: formattedDate
    })
  }
}
</script>

<style>
/* 全局样式，解决黑色边框问题 */
.el-drawer__header {
    padding: 10px 0 0 20px;
}

/* .el-drawer__title {
  font-size: 16px !important;
  font-weight: 600 !important;
  text-align: left !important;
  margin: 0 !important;
  padding: 0 !important;
} */

/* .el-drawer__close-btn {
  position: static !important;
  transform: none !important;
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
  -webkit-tap-highlight-color: transparent !important;
  background-color: transparent !important;
  appearance: none !important;
  -webkit-appearance: none !important;
} */

.el-drawer * {
  -webkit-tap-highlight-color: transparent !important;
}

/* 移动端点击高亮问题 */
* {
  -webkit-tap-highlight-color: transparent !important;
}

/* 修复移动端点击闪烁问题 */
html, body {
  -webkit-tap-highlight-color: transparent !important;
}

input, button, a, div {
  -webkit-tap-highlight-color: transparent !important;
  outline: none !important;
}
</style>

<style scoped>
.user-details {
  padding: 0 16px;
}

.details-section {
  margin-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 16px;
}

.details-section:last-child {
  border-bottom: none;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16px;
}

.info-item {
  display: flex;
  margin-bottom: 16px;
  align-items: center;
}

.basic-info-item {
  flex-direction: column;
  align-items: flex-start;
}

.basic-info-item .info-label {
  margin-bottom: 8px;
}

.basic-info-item .info-value {
  padding-left: 0;
}

.info-label {
  width: 120px;
  color: #606266;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.info-label i {
  margin-right: 4px;
  font-size: 16px;
}

.info-value {
  flex: 1;
  color: #303133;
  font-size: 14px;
}

.info-action {
  color: #1c59e2;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}

.info-action:hover {
  opacity: 0.8;
}

.nowrap {
  white-space: nowrap;
}

.security-level {
  display: inline-flex;
  align-items: center;
}

.security-high {
  color: #67c23a;
  background-color: rgba(103, 194, 58, 0.1);
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 12px;
}

/* 全局清除点击效果 */
:deep(.user-details-drawer) * {
  -webkit-tap-highlight-color: transparent !important;
}
</style>
