<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
    <div class="max-w-5xl mx-auto">
      <!-- Page Header -->
      <div class="flex items-center gap-4 md:gap-6 mb-8 p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-gray-100 bg-gradient-to-br from-green-50/50 to-yellow-50/30">
        <div class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-600 to-green-500 rounded-2xl flex items-center justify-center shadow-xl shadow-green-500/25 flex-shrink-0">
          <i class="ri-user-settings-line text-3xl md:text-4xl text-white"></i>
        </div>
        <div class="flex-1">
          <h1 class="text-2xl md:text-3xl font-bold text-green-600 mb-1">{{ $t('userInfo.title') }}</h1>
          <p class="text-sm md:text-base text-gray-500">{{ $t('userInfo.subtitle') }}</p>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Basic Info Card -->
        <div class="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-green-200">
          <div class="px-6 py-4 bg-gradient-to-r from-green-50 to-yellow-50/30 border-b-2 border-green-100">
            <div class="flex items-center gap-3 text-lg font-bold text-green-600">
              <i class="ri-user-3-line text-xl"></i>
              <span>{{ $t('userInfo.basicInfo') }}</span>
            </div>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex items-center py-3 border-b border-gray-100 last:border-b-0">
              <div class="flex items-center gap-2 min-w-[100px] md:min-w-[120px] text-sm font-medium text-gray-500">
                <i class="ri-user-line text-green-600 text-lg"></i>
                {{ $t('userInfo.name') }}
              </div>
              <div class="flex-1 text-base font-medium text-gray-800">{{ localUserInfo.name || '-' }}</div>
            </div>
            <!-- <div class="flex items-center py-3 border-b border-gray-100 last:border-b-0">
              <div class="flex items-center gap-2 min-w-[100px] md:min-w-[120px] text-sm font-medium text-gray-500">
                <i class="ri-id-card-line text-green-600 text-lg"></i>
                {{ $t('userInfo.employeeId') }}
              </div>
              <div class="flex-1 text-base font-medium text-gray-800 truncate">{{ localUserInfo.employeeId || '-' }}</div>
            </div> -->
            <div class="flex items-center py-3 last:border-b-0">
              <div class="flex items-center gap-2 min-w-[100px] md:min-w-[120px] text-sm font-medium text-gray-500">
                <i class="ri-building-line text-green-600 text-lg"></i>
                {{ $t('userInfo.department') }}
              </div>
              <div class="flex-1 text-base font-medium text-gray-800">{{ localUserInfo.department || '-' }}</div>
            </div>
          </div>
        </div>

        <!-- Contact Info Card -->
        <div class="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-green-200">
          <div class="px-6 py-4 bg-gradient-to-r from-green-50 to-yellow-50/30 border-b-2 border-green-100">
            <div class="flex items-center gap-3 text-lg font-bold text-green-600">
              <i class="ri-contacts-line text-xl"></i>
              <span>{{ $t('userInfo.contactInfo') }}</span>
            </div>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex flex-wrap items-center gap-3 py-3 border-b border-gray-100">
              <div class="flex items-center gap-2 min-w-[100px] md:min-w-[120px] text-sm font-medium text-gray-500">
                <i class="ri-phone-line text-green-600 text-lg"></i>
                {{ $t('userInfo.phone') }}
              </div>
              <div class="flex-1 text-base font-medium text-gray-800">{{ localUserInfo.phone || '-' }}</div>
              <button 
                @click="handleEditContact('phone')"
                class="px-3 py-1.5 text-sm font-medium text-green-600 border border-green-500 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-1"
              >
                <i class="ri-edit-line"></i>
                {{ $t('common.edit') }}
              </button>
            </div>
            <div class="flex flex-wrap items-center gap-3 py-3">
              <div class="flex items-center gap-2 min-w-[100px] md:min-w-[120px] text-sm font-medium text-gray-500">
                <i class="ri-mail-line text-green-600 text-lg"></i>
                {{ $t('userInfo.email') }}
              </div>
              <div class="flex-1 text-base font-medium text-gray-800 truncate">{{ localUserInfo.email || '-' }}</div>
              <button 
                @click="handleEditContact('email')"
                class="px-3 py-1.5 text-sm font-medium text-green-600 border border-green-500 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-1"
              >
                <i class="ri-edit-line"></i>
                {{ $t('common.edit') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Security Card - Full Width -->
        <div class="lg:col-span-2 bg-white rounded-2xl border-2 border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-green-200">
          <div class="px-6 py-4 bg-gradient-to-r from-green-50 to-yellow-50/30 border-b-2 border-green-100">
            <div class="flex items-center gap-3 text-lg font-bold text-green-600">
              <i class="ri-shield-check-line text-xl"></i>
              <span>{{ $t('userInfo.accountSecurity') }}</span>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-wrap items-center gap-3 py-3 border-b md:border-b-0 border-gray-100">
                <div class="flex items-center gap-2 min-w-[100px] md:min-w-[120px] text-sm font-medium text-gray-500">
                  <i class="ri-lock-line text-green-600 text-lg"></i>
                  {{ $t('userInfo.password') }}
                </div>
                <div class="flex-1 text-base font-medium text-gray-800">{{ $t('userInfo.passwordSet') }}</div>
                <button 
                  @click="handleEditPassword"
                  class="px-3 py-1.5 text-sm font-medium text-green-600 border border-green-500 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-1"
                >
                  <i class="ri-lock-password-line"></i>
                  {{ $t('userInfo.modifyPassword') }}
                </button>
              </div>
              <div class="flex items-center gap-3 py-3">
                <div class="flex items-center gap-2 min-w-[100px] md:min-w-[120px] text-sm font-medium text-gray-500">
                  <i class="ri-shield-star-line text-green-600 text-lg"></i>
                  {{ $t('userInfo.securityLevel') }}
                </div>
                <div class="flex-1">
                  <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-600 rounded-full text-sm font-semibold border border-green-200">
                    <i class="ri-shield-check-line"></i>
                    {{ $t('userInfo.securityHigh') }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Logout Button -->
            <div class="mt-8 pt-6 border-t-2 border-gray-100 text-center">
              <button 
                @click="handleLogout"
                class="min-w-[200px] px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-500/25 hover:shadow-red-500/40 flex items-center justify-center gap-2 mx-auto"
              >
                <i class="ri-logout-box-line text-lg"></i>
                {{ $t('header.logout') }}
              </button>
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
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessageBox } from 'element-plus'
import ModifyContact from './ModifyContact.vue'
import ModifyPassword from './ModifyPassword.vue'
import { useUserStore } from '@/store'

const { t, locale } = useI18n()
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

// 解析国际化标签
const resolveI18nLabel = (label) => {
  try {
    if (!label) return ''
    if (typeof label === 'string' && label.startsWith('{')) {
      const names = JSON.parse(label)
      const lang = locale.value === 'zh-CN' ? 'zh_CN' : 'en_US'
      return names[lang] || names['zh_CN'] || label
    }
    return label
  } catch (e) {
    return label
  }
}

const syncUserInfo = async () => {
  try {
    await userStore.fetchUserInfo()
    const storeUserInfo = userStore.userInfo || {}
    localUserInfo.name = storeUserInfo.nickName || storeUserInfo.userName || ''
    localUserInfo.employeeId = storeUserInfo.userId || ''
    localUserInfo.department = resolveI18nLabel(storeUserInfo.dept?.deptName) || ''
    localUserInfo.phone = storeUserInfo.phoneNumber || ''
    localUserInfo.email = storeUserInfo.email || ''
    await nextTick()
  } catch (error) {
    console.log('error', error)
  }
}

// 监听语言变化，重新解析部门名称
watch(locale, () => {
  const storeUserInfo = userStore.userInfo || {}
  localUserInfo.department = resolveI18nLabel(storeUserInfo.dept?.deptName) || ''
})

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
