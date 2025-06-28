<template>
  <div class="header">
    <div class="header-content">
      <div class="header-left">
        <div class="logo">
          <img src="../assets/logo.svg" alt="Logo" class="logo-icon">
          <h1 class="platform-title">数智化转型支撑平台</h1>
        </div>
      </div>
      <div class="header-center">
        <div 
          v-for="(item, index) in navItems" 
          :key="index" 
          class="nav-item"
          :class="{ active: activeIndex === index }"
          @click="handleNavClick(index, item.path)"
        >
          {{ item.title }}
          <div class="nav-indicator" v-if="activeIndex === index"></div>
        </div>
      </div>
      <div class="header-right">
        <div class="user-info" @click="showUserDetails">
          <el-avatar :size="32" :src="userAvatar" class="user-avatar">
            {{ userName.substring(0, 1) }}
          </el-avatar>
          <div class="user-detail">
            <span class="user-name">{{ userName }}</span>
            <span class="user-role">{{ organName }} <i class="ri-arrow-down-s-line"></i></span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 将UserDetails移出header-content以避免嵌套限制 -->
  </div>
  
  <!-- 将UserDetails组件放在顶层，不受header嵌套限制 -->
  <UserDetails 
    v-model:visible="userDetailsVisible"
    :user-info="userDetailsInfo" 
    @edit="handleUserDetailsEdit" 
  />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import UserDetails from './userDetails.vue'

const props = defineProps({
  navItems: {
    type: Array,
    default: () => [
      { title: '首页', path: '/home' },
      { title: '应用注册申请', path: '/application' },
      { title: '知识中心', path: '/knowledge' },
    ]
  }
})

const emit = defineEmits(['navChange'])
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

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

// 移除检查并获取用户信息的方法，仅保留更新用户详情的方法
const updateUserDetails = () => {
  // 从store获取用户详情信息
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

const showUserDetails = () => {
  userDetailsVisible.value = true
}

// const handleUserDetailsEdit = (data) => {
//   // 处理用户信息编辑
//   console.log('编辑用户信息:', data)
//   // 实际项目中可能需要调用API进行更新
// }
</script>

<style scoped>
.header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background-color: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(240, 240, 240, 0.6);
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  /* position: fixed; */
  top: 0;
  left: 0;
  z-index: 1000;
}

.header-content {
  /* max-width: 1400px; */
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.platform-title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  margin: 0;
}

.header-center {
  display: flex;
  align-items: center;
  margin-left: 60px;
}

.nav-item {
  padding: 0 30px;
  height: 64px;
  line-height: 64px;
  font-size: 16px;
  color: #606266;
  position: relative;
  cursor: pointer;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #1c59e2;
}

.nav-item.active {
  color: #1c59e2;
  font-weight: 500;
}

.nav-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #1c59e2;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 8px;
}

.user-avatar {
  background-color: #1c59e2;
  color: #fff;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-detail {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

.user-role {
  font-size: 12px;
  color: #909399;
  display: flex;
  align-items: center;
}

.user-role i {
  margin-left: 4px;
  font-size: 12px;
}

/* 响应式调整 */
@media screen and (max-width: 1440px) {
  .header-content {
    max-width: 1200px;
  }
}

@media screen and (max-width: 1200px) {
  .header-center {
    margin-left: 30px;
  }
  
  .nav-item {
    padding: 0 20px;
  }
}

@media screen and (max-width: 768px) {
  .platform-title {
    font-size: 16px;
  }
  
  .header-center {
    margin-left: 20px;
  }
  
  .nav-item {
    padding: 0 15px;
    font-size: 14px;
  }
  
  .user-detail {
    display: none;
  }
}

/* 添加这个全局样式来确保UserDetails组件在最上层 */
:deep(.user-details-overlay) {
  z-index: 2000 !important; /* 确保高于header的z-index */
}
</style> 