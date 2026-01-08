<template>
  <div class="system-layout">
    <!-- 顶部导航栏 -->
    <div class="system-header" :style="headerStyle">
      <div class="header-content" :class="{ 'dark-text': isYellowTheme }">
        <div class="header-left">
          <!-- 移动端菜单按钮 -->
          <div class="mobile-menu-btn" @click="toggleMobileMenu">
            <i class="ri-menu-line"></i>
          </div>
          <i :class="config.icon + ' system-icon'"></i>
          <span class="system-name">{{ $t(config.systemName) }}</span>
        </div>
        <div class="header-right">
          <el-button link class="header-btn" @click="goHome">
            <i class="ri-home-line"></i>
            <span class="btn-text">{{ $t(config.backToHome) }}</span>
          </el-button>
          <el-dropdown @command="handleLanguageChange">
            <el-button link class="header-btn">
              <i class="ri-translate"></i>
              <span class="btn-text">{{ currentLanguage }}</span>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="zh-CN">中文</el-dropdown-item>
                <el-dropdown-item command="en-US">English</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown @command="handleUserAction">
            <div class="user-info">
              <el-avatar :size="38" :src="userAvatar" class="user-avatar">
                {{ userName.substring(0, 1) }}
              </el-avatar>
              <div class="user-detail">
                <span class="user-name">{{ userName }}</span>
                <span class="user-role">{{ organName }}</span>
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  <i class="ri-user-line"></i>
                  {{ $t('header.userInfo') }}
                </el-dropdown-item>
                <el-dropdown-item command="logout" divided>
                  <i class="ri-logout-box-line"></i>
                  {{ $t('header.logout') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>

    <!-- 主体区域 -->
    <div class="system-main">
      <!-- PC端左侧菜单 -->
      <div class="system-sidebar pc-only" :class="{ collapsed: isCollapsed }" :style="!isCollapsed ? { width: menuWidth } : {}">
        <div class="collapse-btn" @click="toggleCollapse">
          <i :class="isCollapsed ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'"></i>
        </div>
        <div class="sidebar-menu-wrapper">
          <el-menu
            :default-active="activeMenu"
            :collapse="isCollapsed"
            :unique-opened="true"
            router
          >
            <template v-for="item in menuList">
              <el-sub-menu v-if="item.children" :index="item.index" :key="item.index">
                <template #title>
                  <i :class="item.icon"></i>
                  <span>{{ item.title }}</span>
                </template>
                <el-menu-item
                  v-for="child in item.children"
                  :key="child.index"
                  :index="child.index"
                >
                  <i :class="child.icon"></i>
                  <span>{{ child.title }}</span>
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="item.index" :key="item.index">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
      </div>

      <!-- 移动端抽屉菜单 -->
      <el-drawer
        v-model="mobileMenuVisible"
        direction="ltr"
        :with-header="false"
        size="280px"
        class="mobile-drawer"
      >
        <div class="mobile-menu-header" :style="headerStyle" :class="{ 'dark-text': isYellowTheme }">
          <i :class="config.icon"></i>
          <span>{{ $t(config.systemName) }}</span>
        </div>
        <el-menu
          :default-active="activeMenu"
          :unique-opened="true"
          @select="handleMobileMenuSelect"
        >
          <template v-for="item in menuList">
            <el-sub-menu v-if="item.children" :index="item.index" :key="item.index">
              <template #title>
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                v-for="child in item.children"
                :key="child.index"
                :index="child.index"
              >
                <i :class="child.icon"></i>
                <span>{{ child.title }}</span>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="item.index" :key="item.index">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-drawer>

      <!-- 右侧内容区 -->
      <div class="system-content" :class="{ collapsed: isCollapsed }" :style="!isCollapsed ? { marginLeft: menuWidth } : {}">
        <!-- 全局标签页导航 -->
        <PageBreadcrumb />

        <router-view v-slot="{ Component, route }">
          <transition name="fade" ><!-- mode="out-in"-->
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import { useLocaleStore } from '@/store'
import { useI18n } from 'vue-i18n'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const localeStore = useLocaleStore()
const { t, locale } = useI18n()

// Get config from route meta
const config = computed(() => {
  const matched = route.matched.find(r => r.meta.layoutConfig)
  return matched?.meta.layoutConfig || {}
})

// 侧边栏折叠状态
const isCollapsed = ref(false)
// 移动端菜单可见状态
const mobileMenuVisible = ref(false)

// 从store获取用户信息
const userName = computed(() => userStore.userInfo?.user?.name || 'user')
const organName = computed(() => userStore.userInfo?.user?.organName || 'user')
const userAvatar = computed(() => userStore.userInfo?.avatar || '')

// 获取用户角色列表
const userRoles = computed(() => {
  const roleStr = userStore.userInfo?.user?.LOGIN_ROLE_VALUE?.['SMART-AGR'] || ''
  return roleStr.split(',').map(r => r.trim()).filter(r => r)
})

// 检查用户是否有权限访问菜单
const hasPermission = (roles) => {
  if (!roles || roles.length === 0) return true // 没有配置角色限制，默认所有人可访问
  if (userRoles.value.includes('agri-admin')) return true // 超级管理员有所有权限
  return roles.some(role => userRoles.value.includes(role))
}

// 菜单列表（根据角色过滤）
const menuList = computed(() => {
  if (!config.value.menus) return []

  return config.value.menus.map(menu => {
    // 过滤子菜单
    const filteredChildren = menu.children
      ? menu.children
          .map(child => ({
            ...child,
            title: t(child.titleKey)
          }))
      : undefined

    // 如果父菜单有子菜单，且子菜单被过滤后为空，则不显示父菜单
    if (menu.children && (!filteredChildren || filteredChildren.length === 0)) {
      return null
    }

    return {
      ...menu,
      title: t(menu.titleKey),
      children: filteredChildren
    }
  }).filter(menu => menu !== null) // 移除被过滤掉的父菜单
})

const menuWidth =  computed(() => {
  if (!config.value.width) return '300px'
  return config.value.width
})
// 当前激活的菜单项
const activeMenu = computed(() => route.path)

// 当前语言
const currentLanguage = computed(() => {
  return localeStore.locale === 'zh-CN' ? '中文' : 'EN'
})

// 头部样式
const headerStyle = computed(() => ({
  background: config.value.headerGradient || 'linear-gradient(135deg, #009A44 0%, #00b350 100%)'
}))

// 是否是黄色主题（研究系统）
const isYellowTheme = computed(() => {
  return config.value.headerGradient?.includes('#FEDD00')
})

// 切换侧边栏折叠状态
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

// 切换移动端菜单
const toggleMobileMenu = () => {
  mobileMenuVisible.value = !mobileMenuVisible.value
}

// 移动端菜单选择
const handleMobileMenuSelect = (index) => {
  router.push(index)
  mobileMenuVisible.value = false
}

// 返回首页
const goHome = () => {
  router.push('/')
}

// 语言切换
const handleLanguageChange = (lang) => {
  localeStore.setLocale(lang)
  locale.value = lang
}

// 用户操作
const handleUserAction = (command) => {
  if (command === 'profile') {
    console.log('Open user profile')
  } else if (command === 'logout') {
    userStore.logoutAndRedirect()
  }
}
</script>

<style scoped>
.system-layout {
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 顶部导航栏 */
.system-header {
  height: 60px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  flex-shrink: 0;
}

.header-content {
  height: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
}

.header-content.dark-text .header-left,
.header-content.dark-text .header-btn,
.header-content.dark-text .user-info {
  color: #303133 !important;
}

.mobile-menu-header.dark-text {
  color: #303133 !important;
}

.mobile-menu-btn {
  display: none;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.mobile-menu-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.header-content.dark-text .mobile-menu-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.mobile-menu-btn i {
  font-size: 24px;
}

.system-icon {
  font-size: 28px;
}

.system-name {
  font-size: 18px;
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-btn {
  color: white !important;
  font-size: 14px;
  padding: 8px 12px;
}

.header-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.header-content.dark-text .header-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
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

.header-content.dark-text .user-info {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.header-content.dark-text .user-info:hover {
  background: rgba(0, 0, 0, 0.08);
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

.header-content.dark-text .user-name {
  color: #303133;
}

.user-role {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.2;
}

.header-content.dark-text .user-role {
  color: rgba(0, 0, 0, 0.6);
}

/* 主体区域 */
.system-main {
  flex: 1;
  display: flex;
  overflow: hidden;
  margin-top: 60px;
  height: calc(100vh - 60px);
}

/* PC端左侧菜单 */
.system-sidebar {
  width: 280px;
  background-color: white;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  transition: width 0.3s;
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  flex-shrink: 0;
  z-index: 50;
}

/* 菜单滚动容器 */
.sidebar-menu-wrapper {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 侧边栏滚动条样式 */
.sidebar-menu-wrapper::-webkit-scrollbar {
  width: 6px;
}

.sidebar-menu-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-menu-wrapper::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.sidebar-menu-wrapper::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.system-sidebar.collapsed {
  width: 64px;
}

.collapse-btn {
  position: absolute;
  right: -12px;
  top: 20px;
  width: 24px;
  height: 24px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.collapse-btn:hover {
  background-color: #f3f4f6;
  transform: scale(1.1);
}

.collapse-btn i {
  font-size: 16px;
  color: #6b7280;
}

.el-menu {
  border-right: none;
  padding: 16px 0;
}

.el-menu :deep(.el-sub-menu__title),
.el-menu :deep(.el-menu-item) {
  height: 48px;
  line-height: 48px;
  margin: 4px 8px;
  border-radius: 8px;
}

.el-menu :deep(.el-sub-menu__title):hover,
.el-menu :deep(.el-menu-item):hover {
  background-color: rgba(0, 154, 68, 0.1);
  color: #009A44;
}

.el-menu :deep(.el-menu-item.is-active) {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.1) 0%, rgba(0, 179, 80, 0.1) 100%);
  color: #009A44;
  font-weight: 600;
}

.el-menu :deep(.el-menu-item i),
.el-menu :deep(.el-sub-menu__title i) {
  margin-right: 8px;
  font-size: 18px;
}

/* 移动端抽屉菜单 */
.mobile-menu-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  color: white;
  font-size: 16px;
  font-weight: 600;
}

.mobile-menu-header i {
  font-size: 24px;
}

/* 右侧内容区 */
.system-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  background-color: #f0f2f5;
  margin-left: 280px;
  transition: margin-left 0.3s;
}

.system-content.collapsed {
  margin-left: 64px;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ==================== 响应式设计 ==================== */
/* 平板 */
@media screen and (max-width: 1024px) {
  .header-content {
    padding: 0 16px;
  }

  .system-name {
    font-size: 16px;
  }

  .system-sidebar {
    width: 200px;
  }

  .system-sidebar.collapsed {
    width: 64px;
  }

  .system-content {
    padding: 0;
    margin-left: 200px;
  }

  .system-content.collapsed {
    margin-left: 64px;
  }
}

/* 移动端 */
@media screen and (max-width: 768px) {
  .header-content {
    padding: 0 12px;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .header-icon {
    display: none;
  }

  .system-name {
    font-size: 15px;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .header-right {
    gap: 4px;
  }

  .header-btn {
    padding: 8px;
  }

  .btn-text {
    display: none;
  }

  .user-detail {
    display: none;
  }

  .user-info {
    padding: 6px;
  }

  /* 隐藏PC端侧边栏 */
  .pc-only {
    display: none;
  }

  .system-content {
    padding: 0;
    margin-left: 0 !important;
  }
}

/* 超小屏幕 */
@media screen and (max-width: 480px) {
  .system-header {
    height: 56px;
  }

  .system-name {
    font-size: 14px;
    max-width: 100px;
  }

  .system-content {
    padding: 0;
  }
}
</style>

<style>
/* 移动端抽屉样式（非scoped） */
.mobile-drawer .el-drawer__body {
  padding: 0;
}

.mobile-drawer .el-menu {
  border-right: none;
}

.mobile-drawer .el-menu-item,
.mobile-drawer .el-sub-menu__title {
  height: 52px;
  line-height: 52px;
  font-size: 15px;
}

.mobile-drawer .el-menu-item i,
.mobile-drawer .el-sub-menu__title i {
  font-size: 20px;
  margin-right: 12px;
}

.mobile-drawer .el-menu-item.is-active {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.1) 0%, rgba(0, 179, 80, 0.1) 100%);
  color: #009A44;
  font-weight: 600;
}

/* Dropdown 样式优化 */
.el-dropdown-menu__item {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.el-dropdown-menu__item i {
  font-size: 18px;
  color: #606266;
}

.el-dropdown-menu__item:hover {
  background: rgba(0, 154, 68, 0.08);
  color: #009A44;
}

.el-dropdown-menu__item:hover i {
  color: #009A44;
}
</style>
