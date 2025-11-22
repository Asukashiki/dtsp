import { createRouter, createWebHashHistory } from 'vue-router'
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
      // 应用注册申请逻辑按需求下线，以下路由整体注释保留
      // {
      //   path: 'application',
      //   name: 'Application',
      //   redirect: '/application/record',
      //   meta: { title: '用户身份认证', icon: 'application', requiresAuth: true }
      // },
      // {
      //   path: 'application/record',
      //   name: 'ApplicationRecord',
      //   component: () => import('../views/application/recordList.vue'),
      //   meta: { title: '应用申请记录', hideInMenu: true, requiresAuth: true }
      // },
      // {
      //   path: 'application/register',
      //   name: 'ApplicationRegister',
      //   component: () => import('../views/application/index.vue'),
      //   meta: { title: '应用注册申请', hideInMenu: true, requiresAuth: true }
      // },
      // 新的用户身份认证入口页与表单页
      {
        path: 'identity',
        name: 'Identity',
        component: () => import('../views/identity/index.vue'),
        meta: { title: '用户身份认证', icon: 'user', requiresAuth: true }
      },
      {
        path: 'identity/farmer',
        name: 'IdentityFarmer',
        component: () => import('../views/identity/farmer.vue'),
        meta: { title: '农民认证申请', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'identity/supplier',
        name: 'IdentitySupplier',
        component: () => import('../views/identity/supplier.vue'),
        meta: { title: '供应商认证申请', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'identity/buyer',
        name: 'IdentityBuyer',
        component: () => import('../views/identity/buyer.vue'),
        meta: { title: '收购商认证申请', hideInMenu: true, requiresAuth: true }
      },
      // 知识中心逻辑按需求下线，以下路由整体注释保留
      // {
      //   path: 'knowledge',
      //   name: 'Knowledge',
      //   component: () => import('../views/knowledge/index.vue'),
      //   meta: { title: '知识中心', icon: 'knowledge', requiresAuth: true }
      // },
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
  history: createWebHashHistory('/ditp/'),
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
      if (window.location.hash.includes('token=') || window.location.search.includes('token=')) {
        window.history.replaceState(null, '', window.location.pathname)
        return next('/home')
      }
      
    } catch (error) {
      redirectToLogin(to.fullPath, userStore)
      return next(false)
    }
  } else if(!storedToken) {
    userStore.logoutAndRedirect(1000)
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