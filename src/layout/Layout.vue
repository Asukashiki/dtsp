<template>
  <div class="app-container" :class="{'home-page': isHomePage}">
    <Header @navChange="handleNavChange" class="fixed-header" />
    <div class="main-content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/store'

const route = useRoute()
const userStore = useUserStore()

// 判断当前是否为首页
const isHomePage = computed(() => {
  return route.path === '/' || route.path === '/home'
})

const handleNavChange = (index, path) => {
  // 导航变化时的处理逻辑
  console.log('导航切换:', index, path)
}

// 确保用户信息已加载
onMounted(async () => {
  console.log('Layout mounted - token:', !!userStore.token, 'hasUserInfo:', userStore.hasUserInfo)

  // 如果有 token 但没有用户信息，主动获取
  if (userStore.token && !userStore.hasUserInfo) {
    console.log('Layout: 检测到有token但无用户信息，开始获取')
    try {
      const result = await userStore.fetchUserInfo()
      console.log('Layout: 用户信息获取结果:', result ? '成功' : '失败')
    } catch (error) {
      console.error('Layout: 获取用户信息失败:', error)
    }
  } else if (userStore.hasUserInfo) {
    console.log('Layout: 用户信息已存在，无需重新获取')
  } else {
    console.log('Layout: 无token，跳过用户信息获取')
  }
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  width: 100%;
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
  /* padding-top: 64px; 为固定的Header留出空间 */
  position: relative; /* 添加相对定位 */
}

/* 只在home路径下显示背景图 */
.home-page {
  background-image: url('../assets/background.png');
  background-size: 100% 600px; /* 限制背景图高度为600px */
  background-position: top center;
  background-repeat: no-repeat;
  position: relative;
  z-index: 0; /* 确保背景图在最底层 */
}

.fixed-header {
  /* position: fixed; */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.main-content {
  flex: 1;
  width: 100%;
  overflow-y: auto;
  padding-top: 24px;
  position: relative; /* 添加相对定位 */
  z-index: 1; /* 确保内容在背景之上 */
}

.main-content:has(.knowledge-container) {
  padding-top: 0;
}

.app-container:has(.knowledge-container) .footer {
    background-color: #2c3e50 !important;
    color: #fff !important;
    padding: 20px 0 !important;
    width: 100% !important;
    margin-top: 0;
  }

  
.app-container:has(.knowledge-container) .main-content {
    flex: none;
  }
</style> 