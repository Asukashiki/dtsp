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
      {
        path: 'user',
        name: 'user',
        component: () => import('../components/userDetails.vue'),
        meta: { title: '首页', icon: 'user', requiresAuth: true }
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
  },
  // 研究与开发管理系统
  {
    path: '/research',
    name: 'ResearchSystem',
    component: () => import('../layout/ResearchLayout.vue'),
    redirect: '/research/enterprise/auth',
    meta: { requiresAuth: true },
    children: [
      // 企业注册备案
      {
        path: 'enterprise/auth',
        name: 'EnterpriseAuth',
        component: () => import('../views/research/enterprise/EnterpriseAuth.vue'),
        meta: { title: '种子企业认证', requiresAuth: true }
      },
      {
        path: 'enterprise/audit',
        name: 'EnterpriseAudit',
        component: () => import('../views/research/enterprise/EnterpriseAudit.vue'),
        meta: { title: '种子企业审核', requiresAuth: true }
      },
      // 品种管理
      {
        path: 'variety/registration',
        name: 'VarietyRegistration',
        component: () => import('../views/research/variety/VarietyRegistration.vue'),
        meta: { title: '品种登记', requiresAuth: true }
      },
      {
        path: 'variety/audit',
        name: 'VarietyAudit',
        component: () => import('../views/research/variety/VarietyAudit.vue'),
        meta: { title: '品种审核', requiresAuth: true }
      },
      {
        path: 'variety/publish',
        name: 'VarietyPublish',
        component: () => import('../views/research/variety/VarietyPublish.vue'),
        meta: { title: '品种发布', requiresAuth: true }
      },
      {
        path: 'variety/query',
        name: 'VarietyQuery',
        component: () => import('../views/research/variety/VarietyQuery.vue'),
        meta: { title: '种子信息公示', requiresAuth: true }
      }
    ]
  },
  // 农业投入品供应管理系统
  {
    path: '/input',
    name: 'InputSystem',
    component: () => import('../layout/InputLayout.vue'),
    redirect: '/input/catalog',
    meta: { requiresAuth: true },
    children: [
      // 投入品目录管理
      {
        path: 'catalog',
        name: 'InputCatalog',
        component: () => import('../views/input/catalog/index.vue'),
        meta: { title: '投入品目录管理', requiresAuth: true }
      },
      {
        path: 'catalog/add',
        name: 'InputCatalogAdd',
        component: () => import('../views/input/catalog/form.vue'),
        meta: { title: '新增投入品', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'catalog/edit/:id',
        name: 'InputCatalogEdit',
        component: () => import('../views/input/catalog/form.vue'),
        meta: { title: '编辑投入品', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'catalog/detail/:id',
        name: 'InputCatalogDetail',
        component: () => import('../views/input/catalog/detail.vue'),
        meta: { title: '投入品详情', hideInMenu: true, requiresAuth: true }
      },
      // 供应商投入品信息管理
      {
        path: 'supplier-input',
        name: 'SupplierInput',
        component: () => import('../views/input/supplier-input/index.vue'),
        meta: { title: '供应商投入品信息管理', requiresAuth: true }
      },
      // 供应商管理
      {
        path: 'supplier/auth',
        name: 'SupplierAuth',
        component: () => import('../views/input/supplier/auth.vue'),
        meta: { title: '供应商认证', requiresAuth: true }
      },
      {
        path: 'supplier/approval',
        name: 'SupplierApproval',
        component: () => import('../views/input/supplier/approval.vue'),
        meta: { title: '供应商认证审批', requiresAuth: true }
      },
      {
        path: 'supplier/info',
        name: 'SupplierInfo',
        component: () => import('../views/input/supplier/info.vue'),
        meta: { title: '供应商信息维护', requiresAuth: true }
      },
      // 库存管理
      {
        path: 'warehouse',
        name: 'Warehouse',
        component: () => import('../views/input/warehouse/index.vue'),
        meta: { title: '仓库管理', requiresAuth: true }
      },
      {
        path: 'stock-in',
        name: 'StockIn',
        component: () => import('../views/input/stock/in.vue'),
        meta: { title: '入库管理', requiresAuth: true }
      },
      {
        path: 'stock-out',
        name: 'StockOut',
        component: () => import('../views/input/stock/out.vue'),
        meta: { title: '出库管理', requiresAuth: true }
      },
      {
        path: 'storage',
        name: 'Storage',
        component: () => import('../views/input/storage/index.vue'),
        meta: { title: '存储管理', requiresAuth: true }
      },
      // 大屏和反馈
      {
        path: 'dashboard',
        name: 'InputDashboard',
        component: () => import('../views/input/dashboard/index.vue'),
        meta: { title: '大屏管理', requiresAuth: true }
      },
      {
        path: 'feedback',
        name: 'InputFeedback',
        component: () => import('../views/input/feedback/index.vue'),
        meta: { title: '信息反馈', requiresAuth: true }
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