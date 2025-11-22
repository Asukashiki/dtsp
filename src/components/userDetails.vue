<template>
  <div class="user-info-container">
    <div class="user-info-wrapper">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-icon">
          <i class="ri-user-settings-line"></i>
        </div>
        <div class="header-content">
          <h1 class="page-title">{{ $t('userInfo.title') }}</h1>
          <p class="page-subtitle">{{ $t('userInfo.subtitle') }}</p>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="content-grid">
        <!-- Basic Info Card -->
        <div class="info-card basic-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-user-3-line"></i>
              <span>{{ $t('userInfo.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <div class="info-item">
              <div class="item-label">
                <i class="ri-user-line"></i>
                {{ $t('userInfo.name') }}
              </div>
              <div class="item-value">{{ localUserInfo.name || '-' }}</div>
            </div>
            <div class="info-item">
              <div class="item-label">
                <i class="ri-id-card-line"></i>
                {{ $t('userInfo.employeeId') }}
              </div>
              <div class="item-value">{{ localUserInfo.employeeId || '-' }}</div>
            </div>
            <div class="info-item">
              <div class="item-label">
                <i class="ri-building-line"></i>
                {{ $t('userInfo.department') }}
              </div>
              <div class="item-value">{{ localUserInfo.department || '-' }}</div>
            </div>
          </div>
        </div>

        <!-- Contact Info Card -->
        <div class="info-card contact-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-contacts-line"></i>
              <span>{{ $t('userInfo.contactInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <div class="info-item editable">
              <div class="item-label">
                <i class="ri-phone-line"></i>
                {{ $t('userInfo.phone') }}
              </div>
              <div class="item-value">{{ localUserInfo.phone || '-' }}</div>
              <el-button type="primary" plain size="small" @click="handleEditContact('phone')">
                <i class="ri-edit-line"></i>
                {{ $t('common.edit') }}
              </el-button>
            </div>
            <div class="info-item editable">
              <div class="item-label">
                <i class="ri-mail-line"></i>
                {{ $t('userInfo.email') }}
              </div>
              <div class="item-value">{{ localUserInfo.email || '-' }}</div>
              <el-button type="primary" plain size="small" @click="handleEditContact('email')">
                <i class="ri-edit-line"></i>
                {{ $t('common.edit') }}
              </el-button>
            </div>
          </div>
        </div>

        <!-- Security Card -->
        <div class="info-card security-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-shield-check-line"></i>
              <span>{{ $t('userInfo.accountSecurity') }}</span>
            </div>
          </div>
          <div class="card-body">
            <div class="info-item editable">
              <div class="item-label">
                <i class="ri-lock-line"></i>
                {{ $t('userInfo.password') }}
              </div>
              <div class="item-value">{{ $t('userInfo.passwordSet') }}</div>
              <el-button type="primary" plain size="small" @click="handleEditPassword">
                <i class="ri-lock-password-line"></i>
                {{ $t('userInfo.modifyPassword') }}
              </el-button>
            </div>
            <div class="info-item">
              <div class="item-label">
                <i class="ri-shield-star-line"></i>
                {{ $t('userInfo.securityLevel') }}
              </div>
              <div class="item-value">
                <span class="security-badge high">
                  <i class="ri-shield-check-line"></i>
                  {{ $t('userInfo.securityHigh') }}
                </span>
              </div>
            </div>

            <!-- Logout Button -->
            <div class="logout-section">
              <el-button type="danger" class="logout-btn" @click="handleLogout">
                <i class="ri-logout-box-line"></i>
                {{ $t('header.logout') }}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modify Contact Dialog -->
    <modify-contact
      v-model:visible="contactDialogVisible"
      :type="contactEditType"
      :current-value="contactCurrentValue"
      @confirm="handleContactUpdated"
    />

    <!-- Modify Password Dialog -->
    <modify-password
      v-model:visible="passwordDialogVisible"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessageBox } from 'element-plus'
import ModifyContact from './ModifyContact.vue'
import ModifyPassword from './ModifyPassword.vue'
import { useUserStore } from '@/store'

const { t } = useI18n()
const userStore = useUserStore()

const contactDialogVisible = ref(false)
const passwordDialogVisible = ref(false)
const contactEditType = ref('phone')
const contactCurrentValue = ref('')

const localUserInfo = reactive({
  name: '',
  employeeId: '',
  department: '',
  phone: '',
  email: ''
})

const syncUserInfo = async () => {
  try {
    await userStore.fetchUserInfo()
    const storeUserInfo = userStore.userInfo?.user || {}
    localUserInfo.name = storeUserInfo.name || ''
    localUserInfo.employeeId = storeUserInfo.employeeId || ''
    localUserInfo.department = storeUserInfo.organName || ''
    localUserInfo.phone = storeUserInfo.mobile || ''
    localUserInfo.email = storeUserInfo.email || ''
    await nextTick()
  } catch (error) {
    console.log('error', error)
  }
}

const handleEditContact = (type) => {
  contactEditType.value = type
  contactCurrentValue.value = localUserInfo[type]
  contactDialogVisible.value = true
}

const handleEditPassword = () => {
  passwordDialogVisible.value = true
}

const handleContactUpdated = async () => {
  await syncUserInfo()
}

const handleLogout = () => {
  ElMessageBox.confirm(
    t('userInfo.confirmLogout'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  )
    .then(() => {
      userStore.logoutAndRedirect()
    })
    .catch(() => {})
}

onMounted(() => {
  syncUserInfo()
})
</script>

<style scoped>
.user-info-container {
  min-height: calc(100vh - 200px);
  background: linear-gradient(to bottom, #f8fafb 0%, #ffffff 100%);
  padding: 32px 24px;
}

.user-info-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

/* Page Header */
.page-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 154, 68, 0.25);
  flex-shrink: 0;
}

.header-icon i {
  font-size: 40px;
  color: white;
}

.header-content {
  flex: 1;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  color: #009A44;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 15px;
  color: #909399;
  margin: 0;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

/* Info Card */
.info-card {
  background: white;
  border-radius: 16px;
  border: 2px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 154, 68, 0.12);
  border-color: rgba(0, 154, 68, 0.2);
}

.card-header {
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
  border-bottom: 2px solid rgba(0, 154, 68, 0.1);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #009A44;
}

.card-title i {
  font-size: 22px;
}

.card-body {
  padding: 24px;
}

/* Info Item */
.info-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.info-item:last-child {
  border-bottom: none;
}

.item-label {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
}

.item-label i {
  font-size: 18px;
  color: #009A44;
}

.item-value {
  flex: 1;
  font-size: 15px;
  color: #303133;
  font-weight: 500;
}

.info-item.editable {
  gap: 16px;
}

.info-item.editable .item-value {
  flex: 1;
  min-width: 0;
}

/* Buttons */
.info-item :deep(.el-button) {
  border-radius: 8px;
  font-weight: 600;
  border-color: #009A44;
  color: #009A44;
}

.info-item :deep(.el-button:hover) {
  background: rgba(0, 154, 68, 0.08);
  border-color: #009A44;
  color: #009A44;
}

.info-item :deep(.el-button i) {
  margin-right: 4px;
}

/* Security Badge */
.security-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.security-badge.high {
  background: rgba(0, 154, 68, 0.1);
  color: #009A44;
  border: 1px solid rgba(0, 154, 68, 0.2);
}

.security-badge i {
  font-size: 16px;
}

/* Logout Section */
.logout-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px solid rgba(0, 0, 0, 0.06);
  text-align: center;
}

.logout-btn {
  min-width: 200px;
  height: 44px;
  border-radius: 8px;
  font-weight: 600;
  background: linear-gradient(135deg, #DA121A 0%, #FF3D47 100%);
  border: none;
}

.logout-btn:hover {
  background: linear-gradient(135deg, #C10F17 0%, #DA121A 100%);
}

.logout-btn i {
  margin-right: 6px;
  font-size: 18px;
}

/* Responsive */
@media screen and (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 768px) {
  .user-info-container {
    padding: 16px;
  }

  .page-header {
    padding: 24px 20px;
    gap: 16px;
  }

  .header-icon {
    width: 64px;
    height: 64px;
  }

  .header-icon i {
    font-size: 32px;
  }

  .page-title {
    font-size: 24px;
  }

  .card-header {
    padding: 16px 20px;
  }

  .card-body {
    padding: 20px;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .info-item.editable {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .item-label {
    min-width: auto;
  }

  .item-value {
    width: 100%;
  }

  .logout-btn {
    width: 100%;
  }
}
</style>
