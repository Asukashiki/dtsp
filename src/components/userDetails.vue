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
          <div class="info-value">{{ localUserInfo.name }}</div>
        </div>
        <div class="info-item basic-info-item">
          <div class="info-label">工号</div>
          <div class="info-value">{{ localUserInfo.employeeId }}</div>
        </div>
        <div class="info-item basic-info-item">
          <div class="info-label">所属部门</div>
          <div class="info-value">{{ localUserInfo.department }}</div>
        </div>
      </div>

      <div class="details-section">
        <div class="section-title">联系方式</div>
        <div class="info-item">
          <div class="info-label">
            <i class="ri-phone-line"></i> 
            手机
          </div>
          <div class="info-value">{{ localUserInfo.phone }}</div>
          <div class="info-action" @click="handleEditContact('phone')">修改</div>
        </div>
        <div class="info-item">
          <div class="info-label">
            <i class="ri-mail-line"></i> 
            邮箱
          </div>
          <div class="info-value">{{ localUserInfo.email }}</div>
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
        <!-- <div class="info-item"> -->
          <!-- <div class="info-label">
            <i class="ri-history-line"></i> 
            上次修改时间
          </div> -->
          <!-- <div class="info-value">{{ localUserInfo.lastPasswordChange }}</div> -->
        <!-- </div> -->
        <div class="logout-container">
          <el-button type="danger" @click="handleLogout" class="logout-btn">退出登录</el-button>
        </div>
      </div>
    </div>
    
    <!-- 引入修改密码弹窗 -->
    <ModifyPassword 
      v-model:visible="passwordDialogVisible"
    />

    <!-- 引入修改联系方式弹窗 -->
    <ModifyContact
      v-model:visible="contactDialogVisible"
      :type="contactEditType"
      @confirm="handleMessage"
      :current-value="contactCurrentValue"
    />
  </el-drawer>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, reactive, nextTick } from 'vue'
import { ElMessageBox } from 'element-plus'
import ModifyPassword from './ModifyPassword.vue'
import ModifyContact from './ModifyContact.vue'
import { useUserStore } from '@/store'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  userInfo: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:visible', 'confirm'])
const passwordDialogVisible = ref(false)
const contactDialogVisible = ref(false)
const contactEditType = ref('phone')
const contactCurrentValue = ref('')
const userStore = useUserStore()

// 创建本地响应式数据存储用户信息
const localUserInfo = reactive({
  name: '',
  employeeId: '',
  department: '',
  phone: '',
  email: '',
  lastPasswordChange: ''
})

// 从store和props同步用户信息到本地
const syncUserInfo = async () => {
  try {
    await userStore.fetchUserInfo()
    const storeUserInfo = userStore.userInfo?.user || {}
    localUserInfo.name = storeUserInfo.name || props.userInfo.name || ''
    localUserInfo.employeeId = storeUserInfo.employeeId || props.userInfo.employeeId || ''
    localUserInfo.department = storeUserInfo.organName || props.userInfo.department || ''
    localUserInfo.phone = storeUserInfo.mobile || props.userInfo.phone || ''
    localUserInfo.email = storeUserInfo.email || props.userInfo.email || ''
    
    // 确保视图更新
    await nextTick()
  } catch (error) {
    console.log('error',error)
  }
}

// 监听visible变化，当抽屉打开时同步用户信息
watch(() => props.visible, async (isVisible) => {
  if (isVisible) {
    await syncUserInfo()
  }
}, { immediate: true })

const handleClose = () => {
  emit('update:visible', false)
}

// 处理ModifyContact组件的confirm事件
const handleMessage = async (data) => {
  try {
    await syncUserInfo()
  } catch (error) {
    console.error('处理用户信息更新失败', error)
  }
}

const handleEditContact = (type) => {
  contactEditType.value = type
  contactCurrentValue.value = localUserInfo[type]
  contactDialogVisible.value = true
}

const handleEditSecurity = (type) => {
  if (type === 'password') {
    passwordDialogVisible.value = true
  }
}

const handleLogout = () => {
  ElMessageBox.confirm(
    '确定要退出登录吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      userStore.logoutAndRedirect()
    })
    .catch(() => {
      // 用户取消操作，不做任何处理
    })
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

.logout-btn:hover {
  opacity: 0.8;
}

.logout-container {
  text-align: center;
}
</style>
