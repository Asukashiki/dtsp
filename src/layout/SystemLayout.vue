<template>
  <div class="system-layout" :class="{ 'registration-system-layout': isRegistrationRoute }"
    :style="{ '--configured-menu-width': menuWidth }">
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
          <!-- <el-dropdown @command="handleLanguageChange">
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
          </el-dropdown> -->
          <el-dropdown @command="handleUserAction">
            <div class="user-info">
              <el-avatar :size="38" :src="userAvatar" class="user-avatar">
                {{ userName.substring(0, 1) }}
              </el-avatar>
              <div class="user-detail">
                <span class="user-name">{{ userName }}</span>
                <!-- <span class="user-role">{{ organName }}</span> -->
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <!-- <el-dropdown-item command="profile">
                  <i class="ri-user-line"></i>
                  {{ $t('header.userInfo') }}
                </el-dropdown-item> -->
                <el-dropdown-item command="logout">
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
      <div class="system-sidebar pc-only" :class="{ collapsed: isCollapsed }">
        <div class="collapse-btn" @click="toggleCollapse">
          <i :class="isCollapsed ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'"></i>
        </div>
        <div class="sidebar-menu-wrapper">
          <el-menu
            :default-active="activeMenu"
            :collapse="isCollapsed"
            :unique-opened="true"
            @select="handleMenuSelect"
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
      <div class="system-content" :class="{ collapsed: isCollapsed }">
        <!-- 全局标签页导航 -->
        <PageBreadcrumb />

        <!-- 内容容器 -->
        <div class="content-inner">
          <!-- 页面加载骨架屏 -->
          <PageLoadingOverlay />

          <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
              <component :is="Component" :key="route.path" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import { useLocaleStore } from '@/store'
import { useI18n } from 'vue-i18n'
import { parseI18nValue } from '@/utils/i18nHelper'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import PageLoadingOverlay from '@/components/common/PageLoadingOverlay.vue'

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

const isRegistrationRoute = computed(() => route.path.startsWith('/research/institution/registration'))

// 侧边栏折叠状态
const isCollapsed = ref(false)
// 移动端菜单可见状态
const mobileMenuVisible = ref(false)

// 从store获取用户信息
const userName = computed(() => userStore.userInfo?.nickName || userStore.userInfo?.userName || 'user')
const organName = computed(() => parseI18nValue(userStore.userInfo?.dept?.deptName, locale.value, 'user'))
const userAvatar = computed(() => userStore.userInfo?.avatar || '')

// 解析菜单名称 (使用统一的 i18n 解析工具)
const resolveMenuTitle = (menuName) => {
  return parseI18nValue(menuName, locale.value, menuName || '')
}

// 判断是否为外链地址
const isExternalLink = (path) => {
  return /^https?:\/\//.test(path)
}

// 将新格式菜单转换为组件需要的格式
// 新格式中子菜单的 path 已经是完整相对路径（如 system/menu），只需加前导斜杠
const transformMenu = (menu, parentPath = '') => {
  if (!menu || menu.hidden === true) return null

  // 构建完整路径：path 可能是 /system（绝对路径）或 system/menu（相对路径）或外链 http(s)://
  let fullPath = menu.path || ''
  if (!isExternalLink(fullPath)) {
    if (!fullPath.startsWith('/')) {
      fullPath = `/${fullPath}`
    }
    fullPath = fullPath.replace(/\/\//g, '/')
  }
  
  // 解析标题（从 meta.title）
  const title = menu.meta?.title ? resolveMenuTitle(menu.meta.title) : (menu.name || '')
  
  // 递归处理子菜单
  let children = null
  if (menu.children && menu.children.length > 0) {
    const transformedChildren = menu.children
      .map(child => transformMenu(child, fullPath))
      .filter(child => child !== null)
    if (transformedChildren.length > 0) {
      children = transformedChildren
    }
  }
  
  return {
    index: fullPath,
    icon: menu.meta?.icon || 'ri-file-list-line',
    title: title,
    children: children,
    component: menu.component
  }
}

// 获取当前系统的根路径
const currentSystemPath = computed(() => {
  // 从当前路由获取系统路径，如 /system, /research, /input 等
  const pathParts = route.path.split('/')
  if (pathParts.length >= 2) {
    return '/' + pathParts[1]  // 返回带 / 的系统标识
  }
  return ''
})

// 菜单列表 - 根据当前系统过滤后端返回的动态菜单（适配新格式）
const menuList = computed(() => {
  if (!userStore.menus || userStore.menus.length === 0) {
    return []
  }
  
  // 新格式：menus 已经是树形结构，path 是系统路径如 /system, /input
  const systemRoot = userStore.menus.find(menu => 
    menu.path === currentSystemPath.value
  )
  
  if (systemRoot && systemRoot.children && systemRoot.children.length > 0) {
    // 转换子菜单为组件需要的格式
    return systemRoot.children
      .map(child => transformMenu(child, systemRoot.path))
      .filter(item => item !== null)
  }
  
  return []
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

// 菜单选择（PC端和移动端共用）
const handleMenuSelect = (index) => {
  if (isExternalLink(index)) {
    window.open(index, '_blank')
  } else {
    router.push(index)
  }
}

// 移动端菜单选择
const handleMobileMenuSelect = (index) => {
  handleMenuSelect(index)
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

// 组件挂载时获取菜单数据和用户信息
onMounted(async () => {
  // 重新获取最新用户信息（确保刷新后数据是最新的）
  await userStore.fetchUserInfo()
  await userStore.getMenus()
})
</script>

<style scoped>
.system-layout {
  --system-header-height: 60px;
  --system-menu-width: var(--configured-menu-width, 280px);
  height: 100vh;
  min-width: 0;
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 顶部导航栏 */
.system-header {
  height: var(--system-header-height);
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
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1 1 auto;
  min-width: 0;
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
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
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
  min-width: 0;
  overflow: hidden;
  margin-top: var(--system-header-height);
  height: calc(100vh - var(--system-header-height));
}

/* PC端左侧菜单 */
.system-sidebar {
  width: var(--system-menu-width);
  background-color: white;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  transition: width 0.3s;
  position: fixed;
  left: 0;
  top: var(--system-header-height);
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
  min-width: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  background-color: #f0f2f5;
  margin-left: var(--system-menu-width);
  transition: margin-left 0.3s;
  display: flex;
  flex-direction: column;
}

.system-content.collapsed {
  margin-left: 64px;
}

.content-inner {
  flex: 1;
  min-width: 0;
  position: relative;
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
  .system-layout {
    --system-menu-width: min(var(--configured-menu-width, 280px), 200px);
  }

  .header-content {
    padding: 0 16px;
  }

  .system-name {
    font-size: 16px;
  }

  .system-sidebar {
    width: var(--system-menu-width);
  }

  .system-sidebar.collapsed {
    width: 64px;
  }

  .system-content {
    padding: 0;
    margin-left: var(--system-menu-width);
  }

  .system-content.collapsed {
    margin-left: 64px;
  }
}

/* 移动端 */
@media screen and (max-width: 768px) {
  .system-layout {
    --system-menu-width: 0px;
  }

  .header-content {
    padding: 0 12px;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .system-name {
    font-size: 15px;
    max-width: 240px;
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
  .system-layout {
    --system-header-height: 56px;
  }

  .system-header {
    height: var(--system-header-height);
  }

  .system-name {
    font-size: 14px;
    max-width: 180px;
  }

  .system-content {
    padding: 0;
  }
}

/* The registration reference keeps the compact mobile shell at tablet widths,
   but retains the user identity and removes the low-value home shortcut. */
@media screen and (min-width: 601px) and (max-width: 768px) {
  .registration-system-layout .header-btn {
    display: none;
  }

  .registration-system-layout .user-detail {
    display: flex;
  }

  .registration-system-layout .user-info {
    padding: 6px 12px;
    gap: 10px;
    border-radius: 10px;
  }

  .registration-system-layout .system-name {
    font-size: 18px;
    max-width: 320px;
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
