import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store'
import { getTokenFromUrl, getToken } from '../utils/auth'
import { ElMessage } from 'element-plus'

// 外部登录系统URL - 在实际部署时配置正确的SSO地址
const LOGIN_URL = import.meta.env.VITE_APP_SSO_URL || 'https://sso.company.com/login'
// 当前系统的应用ID - 用于SSO系统识别来源
const APP_ID = import.meta.env.VITE_APP_ID || 'dits-platform'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../layout/Layout.vue'),
    redirect: '/home',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/home/Home.vue'),
        meta: { title: '首页', icon: 'home', requiresAuth: true }
      },
      {
        path: 'application',
        name: 'Application',
        component: () => import('../views/application/index.vue'),
        meta: { title: '应用注册申请', icon: 'application', requiresAuth: true }
      },
      {
        path: 'knowledge',
        name: 'Knowledge',
        component: () => import('../views/knowledge/index.vue'),
        meta: { title: '知识中心', icon: 'knowledge', requiresAuth: true }
      },
      {
        path: 'dataList',
        name: 'DataList',
        component: () => import('../views/home/components/dataList.vue'),
        meta: { title: '系统公告', hideInMenu: true, requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  
  // 检查是否需要身份验证
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth !== false)
  
  if (!requiresAuth) {
    return next()
  }
  const userStore = useUserStore()
  
  // 1. 先判断 URL 上有没有 token
  const urlToken = getTokenFromUrl()
  
  // 2. 判断 localStorage 有没有 token
  const storedToken = getToken()
  
  // 3. 处理不同情况
  if (urlToken) {
    userStore.setToken(urlToken)
    try {
      await userStore.fetchUserInfo()
      // 同时处理hash方式和查询参数方式的token
      if (window.location.hash.includes('token=') || window.location.search.includes('token=')) {
        window.history.replaceState(null, '', window.location.pathname)
        return next('/home')
      }
      
    } catch (error) {
      console.log('error',error)
      redirectToLogin(to.fullPath, userStore)
      return next(false)
    }
  } else if(!storedToken) {
    redirectToLogin(to.fullPath, userStore)
    return next(false)
  } else {
    next()
  }
})

function redirectToLogin(fullPath, userStore) {
  ElMessage({
    message: '请先登录后再访问此页面',
    type: 'warning',
    duration: 1000
  })
  userStore.logoutAndRedirect(1000)
}

export default router 