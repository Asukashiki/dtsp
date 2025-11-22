<template>
  <div class="header">
    <div class="header-content">
      <!-- Logo 区域 -->
      <div class="header-left">
        <div class="logo">
          <div class="logo-icon-wrapper">
            <i class="ri-plant-line logo-icon"></i>
          </div>
          <div class="logo-text">
            <h1 class="platform-title">{{ $t('footer.platformNameShort') }}</h1>
            <span class="platform-subtitle">Oromia Agriculture</span>
          </div>
        </div>
      </div>

      <!-- 导航菜单 -->
      <div class="header-center">
        <div
          v-for="(item, index) in translatedNavItems"
          :key="index"
          class="nav-item"
          :class="{ active: activeIndex === index }"
          @click="handleNavClick(index, item.path)"
        >
          {{ item.title }}
          <div class="nav-indicator" v-if="activeIndex === index"></div>
        </div>
      </div>

      <!-- 右侧功能区 -->
      <div class="header-right">
        <!-- 语言切换按钮 -->
        <div class="language-switcher" @click="toggleLanguage">
          <i class="ri-translate-2"></i>
          <span class="language-text">{{ currentLanguageLabel }}</span>
        </div>

        <div class="user-info" @click="toUser">
          <el-avatar :size="38" :src="userAvatar" class="user-avatar">
            {{ userName.substring(0, 1) }}
          </el-avatar>
          <div class="user-detail">
            <span class="user-name">{{ userName }}</span>
            <span class="user-role">
              {{ organName }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore, useLocaleStore } from '@/store'
import { useI18n } from 'vue-i18n'
import UserDetails from './userDetails.vue'

const props = defineProps({
  navItems: {
    type: Array,
    default: () => [
      { title: '首页', path: '/home', i18nKey: 'header.home' },
      { title: '用户身份认证', path: '/identity', i18nKey: 'header.identity' },
    ]
  }
})

const emit = defineEmits(['navChange'])
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const localeStore = useLocaleStore()
const { t, locale } = useI18n()

const activeIndex = ref(0)
const userDetailsVisible = ref(false)
const userDetailsInfo = ref({
  name: '',
  employeeId: '',
  department: '',
  phone: '',
  email: '',
  lastPasswordChange: ''
})

// 从store获取用户信息
const userName = computed(() => userStore.userInfo?.user?.name || '用户')
const organName = computed(() => userStore.userInfo?.user?.organName || '访客')
const userAvatar = computed(() => userStore.userInfo?.avatar || '')

// 当前语言标签
const currentLanguageLabel = computed(() => {
  return localeStore.currentLocale === 'zh-CN' ? '中文' : 'English'
})

// 翻译后的导航项
const translatedNavItems = computed(() => {
  return props.navItems.map(item => ({
    ...item,
    title: item.i18nKey ? t(item.i18nKey) : item.title
  }))
})

// 根据当前路由计算激活的菜单索引
const activeNavIndex = computed(() => {
  const currentPath = route.path
  const index = props.navItems.findIndex(item => item.path === currentPath)
  return index >= 0 ? index : 0
})

onMounted(() => {
  // 初始化激活的菜单项
  activeIndex.value = activeNavIndex.value
  // 从store获取用户详情信息
  updateUserDetails()
  // 同步 i18n locale
  locale.value = localeStore.currentLocale
})

// 监听路由变化，更新激活的菜单项
watch(
  () => route.path,
  (newPath) => {
    const index = props.navItems.findIndex(item => item.path === newPath)
    if (index >= 0) {
      activeIndex.value = index
    }
  }
)

// 监听语言变化
watch(
  () => localeStore.currentLocale,
  (newLocale) => {
    locale.value = newLocale
  }
)

// 更新用户详情信息方法
const updateUserDetails = () => {
  const userInfo = userStore.userInfo?.user || {}
  userDetailsInfo.value = {
    name: userInfo.name || '',
    employeeId: userInfo.employeeId || '',
    department: userInfo.organName || '',
    phone: userInfo.mobile || '',
    email: userInfo.email || '',
    lastPasswordChange: userInfo.lastPasswordChange || ''
  }
}

const handleNavClick = (index, path) => {
  activeIndex.value = index
  emit('navChange', index, path)
  router.push(path)
}

// 用户下拉菜单命令处理
const handleUserCommand = (command) => {
  switch (command) {
    case 'userInfo':
      userDetailsVisible.value = true
      break
    case 'modifyPassword':
      // TODO: 打开修改密码对话框
      console.log('修改密码')
      break
    case 'logout':
      userStore.logoutAndRedirect()
      break
  }
}

// 切换语言
const toggleLanguage = () => {
  const newLocale = localeStore.toggleLocale()
  locale.value = newLocale
}

const toUser = () => {
  router.push('/user')
}

</script>

<style scoped>
.header {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  width: 100%;
  box-shadow: 0 2px 12px rgba(0, 154, 68, 0.15);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
}

.header-content {
  width: 100%;
  max-width: 1400px;
  padding: 0 32px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: 0 auto;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.02);
}

.logo-icon-wrapper {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.logo-icon {
  font-size: 26px;
  color: #FEDD00;
}

.logo-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.platform-title {
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin: 0;
  letter-spacing: 0.5px;
  line-height: 1.2;
}

.platform-subtitle {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.header-center {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 60px;
}

.nav-item {
  padding: 0 24px;
  height: 72px;
  line-height: 72px;
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px 8px 0 0;
}

.nav-item:hover {
  color: #FEDD00;
  background: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  color: white;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.15);
}

.nav-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: #FEDD00;
  border-radius: 2px 2px 0 0;
  animation: slideIn 0.3s ease-out;
  box-shadow: 0 2px 8px rgba(254, 221, 0, 0.4);
}

@keyframes slideIn {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 60%;
    opacity: 1;
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.language-switcher {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.language-switcher:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.language-switcher i {
  font-size: 18px;
  color: #FEDD00;
}

.language-text {
  font-size: 13px;
  font-weight: 600;
  color: white;
  min-width: 50px;
  text-align: center;
}

.user-dropdown {
  height: 100%;
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 12px;
  transition: all 0.3s ease;
  gap: 10px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.user-info:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.user-avatar {
  background: linear-gradient(135deg, #FEDD00 0%, #FFE94D 100%);
  color: #009A44;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(254, 221, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.user-detail {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  font-size: 14px;
  color: white;
  font-weight: 600;
  line-height: 1.2;
}

.user-role {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 4px;
  line-height: 1.2;
}

.user-role i {
  font-size: 14px;
  transition: transform 0.3s ease;
}

.user-info:hover .user-role i {
  transform: translateY(2px);
}

/* Dropdown 样式优化 */
:deep(.el-dropdown-menu__item) {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  transition: all 0.3s ease;
}

:deep(.el-dropdown-menu__item i) {
  font-size: 18px;
  color: #606266;
}

:deep(.el-dropdown-menu__item:hover) {
  background: rgba(0, 154, 68, 0.08);
  color: #009A44;
}

:deep(.el-dropdown-menu__item:hover i) {
  color: #009A44;
}

.ml-2 {
  margin-left: 8px;
}

/* 响应式调整 */
@media screen and (max-width: 1440px) {
  .header-content {
    max-width: 1200px;
  }

  .header-center {
    margin-left: 40px;
  }
}

@media screen and (max-width: 1200px) {
  .header-center {
    margin-left: 30px;
  }

  .nav-item {
    padding: 0 18px;
    font-size: 14px;
  }

  .platform-title {
    font-size: 16px;
  }
}

@media screen and (max-width: 768px) {
  .platform-subtitle {
    display: none;
  }

  .header-center {
    margin-left: 20px;
  }

  .nav-item {
    padding: 0 12px;
    font-size: 13px;
  }

  .user-detail {
    display: none;
  }

  .language-text {
    display: none;
  }

  .language-switcher {
    padding: 8px;
  }
}

:deep(.user-details-overlay) {
  z-index: 2000 !important;
}
</style>
