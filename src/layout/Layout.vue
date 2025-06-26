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
import { computed } from 'vue'

const route = useRoute()

// 判断当前是否为首页
const isHomePage = computed(() => {
  return route.path === '/' || route.path === '/home'
})

const handleNavChange = (index, path) => {
  // 导航变化时的处理逻辑
  console.log('导航切换:', index, path)
}
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
</style> 