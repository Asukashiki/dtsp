import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/store'
import { getTokenFromUrl, getToken } from '../utils/auth'
import { ElMessage } from 'element-plus'
import farmLayoutConfig from '@/config/farm-layout.json'
import inputLayoutConfig from '@/config/input-layout.json'
import researchLayoutConfig from '@/config/research-layout.json'

// 外部登录系统URL - 在实际部署时配置正确的SSO地址
const LOGIN_URL = import.meta.env.VITE_APP_SSO_URL || 'https://sso.company.com/login'
// 当前系统的应用ID - 用于SSO系统识别来源
const APP_ID = import.meta.env.VITE_APP_ID || 'dits-platform'

const routes = [
  // OAuth2回调页面（不需要认证）
  {
    path: '/callback',
    name: 'Callback',
    component: () => import('../views/callback/index.vue'),
    meta: { requiresAuth: false }
  },
  // 打印页面（独立布局，不带侧边栏和导航）
  {
    path: '/print/seed/breeding-certification/:id',
    name: 'BreedingCertificationPrint',
    component: () => import('../views/seed/breeding-certification/print.vue'),
    meta: { title: '打印认证标签', hideInMenu: true, requiresAuth: true }
  },
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
    component: () => import('../layout/SystemLayout.vue'),
    redirect: '/research/enterprise/auth',
    meta: { requiresAuth: true, layoutConfig: researchLayoutConfig },
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
      },
      // 种子信息服务
      {
        path: 'seed/promotion',
        name: 'SeedPromotion',
        component: () => import('../views/research/seed/SeedPromotion.vue'),
        meta: { title: '种子推广信息管理', requiresAuth: true }
      },
      {
        path: 'seed/info',
        name: 'SeedInfo',
        component: () => import('../views/research/variety/VarietyQuery.vue'),
        meta: { title: '种子信息公示', requiresAuth: true }
      },
      // 育种管理
      {
        path: 'breeding/plan',
        name: 'BreedingPlan',
        component: () => import('../views/research/breeding/BreedingPlan.vue'),
        meta: { title: '育种计划管理', requiresAuth: true }
      },
      {
        path: 'breeding/material',
        name: 'BreedingMaterial',
        component: () => import('../views/research/breeding/BreedingMaterial.vue'),
        meta: { title: '育种材料登记', requiresAuth: true }
      },
      {
        path: 'breeding/tracking',
        name: 'BreedingTracking',
        component: () => import('../views/research/breeding/BreedingTracking.vue'),
        meta: { title: '育种跟踪管理', requiresAuth: true }
      },
      // 繁殖种子认证申请
      {
        path: 'seed/breeding-certification',
        name: 'BreedingCertificationList',
        component: () => import('../views/seed/breeding-certification/index.vue'),
        meta: { title: '繁殖种子认证申请', requiresAuth: true }
      },
      {
        path: 'seed/breeding-certification/add',
        name: 'BreedingCertificationAdd',
        component: () => import('../views/seed/breeding-certification/form.vue'),
        meta: { title: '新增认证申请', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'seed/breeding-certification/edit/:id',
        name: 'BreedingCertificationEdit',
        component: () => import('../views/seed/breeding-certification/form.vue'),
        meta: { title: '编辑认证申请', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'seed/breeding-certification/detail/:id',
        name: 'BreedingCertificationDetail',
        component: () => import('../views/seed/breeding-certification/detail.vue'),
        meta: { title: '认证申请详情', hideInMenu: true, requiresAuth: true }
      },
      // 繁殖种子审核
      {
        path: 'seed/breeding-audit',
        name: 'BreedingAudit',
        component: () => import('../views/seed/breeding-audit/index.vue'),
        meta: { title: '繁殖种子认证审核', requiresAuth: true }
      },
      // 种子证书颁发
      {
        path: 'seed/breeding-certificate',
        name: 'BreedingCertificate',
        component: () => import('../views/seed/breeding-certificate/index.vue'),
        meta: { title: '繁殖种子证书颁发', requiresAuth: true }
      },
      // 数据采集 - 试验基础数据采集
      {
        path: 'data-collection/trial-base',
        name: 'TrialBaseList',
        component: () => import('../views/research/data-collection/trial-base/index.vue'),
        meta: { title: '试验基础数据采集', requiresAuth: true }
      },
      {
        path: 'data-collection/trial-base/add',
        name: 'TrialBaseAdd',
        component: () => import('../views/research/data-collection/trial-base/form.vue'),
        meta: { title: '新增试验数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'data-collection/trial-base/edit/:trialId',
        name: 'TrialBaseEdit',
        component: () => import('../views/research/data-collection/trial-base/form.vue'),
        meta: { title: '编辑试验数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'data-collection/trial-base/detail/:trialId',
        name: 'TrialBaseDetail',
        component: () => import('../views/research/data-collection/trial-base/detail.vue'),
        meta: { title: '试验数据详情', hideInMenu: true, requiresAuth: true }
      },
      // 数据采集 - 农民与地块属性数据采集
      {
        path: 'data-collection/farmer-plot',
        name: 'FarmerPlotList',
        component: () => import('../views/research/data-collection/farmer-plot/index.vue'),
        meta: { title: '农民与地块属性数据采集', requiresAuth: true }
      },
      {
        path: 'data-collection/farmer-plot/add',
        name: 'FarmerPlotAdd',
        component: () => import('../views/research/data-collection/farmer-plot/form.vue'),
        meta: { title: '新增农民地块数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'data-collection/farmer-plot/edit/:id',
        name: 'FarmerPlotEdit',
        component: () => import('../views/research/data-collection/farmer-plot/form.vue'),
        meta: { title: '编辑农民地块数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'data-collection/farmer-plot/detail/:id',
        name: 'FarmerPlotDetail',
        component: () => import('../views/research/data-collection/farmer-plot/detail.vue'),
        meta: { title: '农民地块数据详情', hideInMenu: true, requiresAuth: true }
      },
      // 数据采集 - 农事记录数据采集
      {
        path: 'data-collection/farming-record',
        name: 'FarmingRecordList',
        component: () => import('../views/research/data-collection/farming-record/index.vue'),
        meta: { title: '农事记录数据采集', requiresAuth: true }
      },
      {
        path: 'data-collection/farming-record/add',
        name: 'FarmingRecordAdd',
        component: () => import('../views/research/data-collection/farming-record/form.vue'),
        meta: { title: '新增农事记录', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'data-collection/farming-record/edit/:id',
        name: 'FarmingRecordEdit',
        component: () => import('../views/research/data-collection/farming-record/form.vue'),
        meta: { title: '编辑农事记录', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'data-collection/farming-record/detail/:id',
        name: 'FarmingRecordDetail',
        component: () => import('../views/research/data-collection/farming-record/detail.vue'),
        meta: { title: '农事记录详情', hideInMenu: true, requiresAuth: true }
      },
      // 数据采集 - 农艺性状数据采集
      {
        path: 'data-collection/agronomic-trait',
        name: 'AgronomicTraitList',
        component: () => import('../views/research/data-collection/agronomic-trait/index.vue'),
        meta: { title: '农艺性状数据采集', requiresAuth: true }
      },
      {
        path: 'data-collection/agronomic-trait/add',
        name: 'AgronomicTraitAdd',
        component: () => import('../views/research/data-collection/agronomic-trait/form.vue'),
        meta: { title: '新增农艺性状数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'data-collection/agronomic-trait/edit/:id',
        name: 'AgronomicTraitEdit',
        component: () => import('../views/research/data-collection/agronomic-trait/form.vue'),
        meta: { title: '编辑农艺性状数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'data-collection/agronomic-trait/detail/:id',
        name: 'AgronomicTraitDetail',
        component: () => import('../views/research/data-collection/agronomic-trait/detail.vue'),
        meta: { title: '农艺性状数据详情', hideInMenu: true, requiresAuth: true }
      },
      // 数据采集 - 环境与土壤属性数据采集
      {
        path: 'data-collection/environment-soil',
        name: 'EnvironmentSoilList',
        component: () => import('../views/research/data-collection/environment-soil/index.vue'),
        meta: { title: '环境与土壤属性数据采集', requiresAuth: true }
      },
      {
        path: 'data-collection/environment-soil/add',
        name: 'EnvironmentSoilAdd',
        component: () => import('../views/research/data-collection/environment-soil/form.vue'),
        meta: { title: '新增环境土壤数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'data-collection/environment-soil/edit/:id',
        name: 'EnvironmentSoilEdit',
        component: () => import('../views/research/data-collection/environment-soil/form.vue'),
        meta: { title: '编辑环境土壤数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'data-collection/environment-soil/detail/:id',
        name: 'EnvironmentSoilDetail',
        component: () => import('../views/research/data-collection/environment-soil/detail.vue'),
        meta: { title: '环境土壤数据详情', hideInMenu: true, requiresAuth: true }
      },
      // 品种评估数据采集
      {
        path: 'data-collection/variety-evaluation',
        name: 'VarietyEvaluationList',
        component: () => import('../views/research/data-collection/variety-evaluation/index.vue'),
        meta: { title: '品种评估数据采集', requiresAuth: true }
      },
      {
        path: 'data-collection/variety-evaluation/add',
        name: 'VarietyEvaluationAdd',
        component: () => import('../views/research/data-collection/variety-evaluation/form.vue'),
        meta: { title: '新增品种评估数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'data-collection/variety-evaluation/edit/:id',
        name: 'VarietyEvaluationEdit',
        component: () => import('../views/research/data-collection/variety-evaluation/form.vue'),
        meta: { title: '编辑品种评估数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'data-collection/variety-evaluation/detail/:id',
        name: 'VarietyEvaluationDetail',
        component: () => import('../views/research/data-collection/variety-evaluation/detail.vue'),
        meta: { title: '品种评估数据详情', hideInMenu: true, requiresAuth: true }
      },
      // 实验室测试数据采集
      {
        path: 'data-collection/laboratory-test',
        name: 'LaboratoryTestList',
        component: () => import('../views/research/data-collection/laboratory-test/index.vue'),
        meta: { title: '实验室测试数据采集', requiresAuth: true }
      },
      {
        path: 'data-collection/laboratory-test/add',
        name: 'LaboratoryTestAdd',
        component: () => import('../views/research/data-collection/laboratory-test/form.vue'),
        meta: { title: '新增实验室测试数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'data-collection/laboratory-test/edit/:id',
        name: 'LaboratoryTestEdit',
        component: () => import('../views/research/data-collection/laboratory-test/form.vue'),
        meta: { title: '编辑实验室测试数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'data-collection/laboratory-test/detail/:id',
        name: 'LaboratoryTestDetail',
        component: () => import('../views/research/data-collection/laboratory-test/detail.vue'),
        meta: { title: '实验室测试数据详情', hideInMenu: true, requiresAuth: true }
      }
    ]
  },
  // 农业投入品供应管理系统
  {
    path: '/input',
    name: 'InputSystem',
    component: () => import('../layout/SystemLayout.vue'),
    redirect: '/input/catalog',
    meta: { requiresAuth: true, layoutConfig: inputLayoutConfig },
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
      {
        path: 'supplier/product',
        name: 'SupplierProduct',
        component: () => import('../views/input/supplier/product/index.vue'),
        meta: { title: '供应商投入品管理', requiresAuth: true }
      },
      {
        path: 'supplier/product/add',
        name: 'SupplierProductAdd',
        component: () => import('../views/input/supplier/product/form.vue'),
        meta: { title: '新增供应商投入品', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'supplier/product/edit/:id',
        name: 'SupplierProductEdit',
        component: () => import('../views/input/supplier/product/form.vue'),
        meta: { title: '编辑供应商投入品', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'supplier/product/detail/:id',
        name: 'SupplierProductDetail',
        component: () => import('../views/input/supplier/product/detail.vue'),
        meta: { title: '供应商投入品详情', hideInMenu: true, requiresAuth: true }
      },
      // 库存管理 - 仓库管理
      {
        path: 'inventory/warehouse',
        name: 'WarehouseList',
        component: () => import('../views/input/inventory/warehouse/index.vue'),
        meta: { title: '仓库管理', requiresAuth: true }
      },
      {
        path: 'inventory/warehouse/add',
        name: 'WarehouseAdd',
        component: () => import('../views/input/inventory/warehouse/form.vue'),
        meta: { title: '新增仓库', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'inventory/warehouse/edit/:id',
        name: 'WarehouseEdit',
        component: () => import('../views/input/inventory/warehouse/form.vue'),
        meta: { title: '编辑仓库', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'inventory/warehouse/detail/:id',
        name: 'WarehouseDetail',
        component: () => import('../views/input/inventory/warehouse/detail.vue'),
        meta: { title: '仓库详情', hideInMenu: true, requiresAuth: true }
      },
      // 库存管理 - 入库管理
      {
        path: 'inventory/stock-in',
        name: 'StockInList',
        component: () => import('../views/input/inventory/stock-in/index.vue'),
        meta: { title: '入库管理', requiresAuth: true }
      },
      {
        path: 'inventory/stock-in/add',
        name: 'StockInAdd',
        component: () => import('../views/input/inventory/stock-in/form.vue'),
        meta: { title: '新增入库单', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'inventory/stock-in/edit/:id',
        name: 'StockInEdit',
        component: () => import('../views/input/inventory/stock-in/form.vue'),
        meta: { title: '编辑入库单', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'inventory/stock-in/detail/:id',
        name: 'StockInDetail',
        component: () => import('../views/input/inventory/stock-in/detail.vue'),
        meta: { title: '入库单详情', hideInMenu: true, requiresAuth: true }
      },
      // 库存管理 - 出库管理
      {
        path: 'inventory/stock-out',
        name: 'StockOutList',
        component: () => import('../views/input/inventory/stock-out/index.vue'),
        meta: { title: '出库管理', requiresAuth: true }
      },
      {
        path: 'inventory/stock-out/add',
        name: 'StockOutAdd',
        component: () => import('../views/input/inventory/stock-out/form.vue'),
        meta: { title: '新增出库单', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'inventory/stock-out/detail/:id',
        name: 'StockOutDetail',
        component: () => import('../views/input/inventory/stock-out/detail.vue'),
        meta: { title: '出库单详情', hideInMenu: true, requiresAuth: true }
      },
      // 库存管理 - 库存查询
      {
        path: 'inventory/stock',
        name: 'StockList',
        component: () => import('../views/input/inventory/stock/index.vue'),
        meta: { title: '库存查询', requiresAuth: true }
      },
      {
        path: 'inventory/stock/detail/:id',
        name: 'StockDetail',
        component: () => import('../views/input/inventory/stock/detail.vue'),
        meta: { title: '库存详情', hideInMenu: true, requiresAuth: true }
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
      },
      {
        path: 'feedback/add',
        name: 'InputFeedbackAdd',
        component: () => import('../views/input/feedback/form.vue'),
        meta: { title: '提交反馈', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'feedback/edit/:id',
        name: 'InputFeedbackEdit',
        component: () => import('../views/input/feedback/form.vue'),
        meta: { title: '编辑反馈', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'feedback/detail/:id',
        name: 'InputFeedbackDetail',
        component: () => import('../views/input/feedback/detail.vue'),
        meta: { title: '反馈详情', hideInMenu: true, requiresAuth: true }
      }
    ]
  },
  // 农田管理系统
  {
    path: '/farm',
    name: 'FarmSystem',
    component: () => import('../layout/SystemLayout.vue'),
    redirect: '/farm/farmer/auth',
    meta: { requiresAuth: true, layoutConfig: farmLayoutConfig },
    children: [
      // 农民管理
      {
        path: 'farmer/auth',
        name: 'FarmerAuth',
        component: () => import('../views/farm/farmer/auth.vue'),
        meta: { title: '农民认证申请', requiresAuth: true }
      },
      {
        path: 'farmer/approval',
        name: 'FarmerApproval',
        component: () => import('../views/farm/farmer/approval.vue'),
        meta: { title: '农民认证审批', requiresAuth: true }
      },
      {
        path: 'farmer/info',
        name: 'FarmerInfo',
        component: () => import('../components/userDetails.vue'),
        meta: { title: '农民信息维护', requiresAuth: true }
      },
      // 土地信息管理
      {
        path: 'land/list',
        name: 'LandList',
        component: () => import('../views/farm/land/list.vue'),
        meta: { title: '土地信息管理', requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory('/agriculture/'),
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
    // 有 token，检查是否有用户信息
    console.log('路由守卫: 已有token，检查用户信息状态 - hasUserInfo:', userStore.hasUserInfo)

    if (!userStore.hasUserInfo) {
      console.log('路由守卫: 用户信息不存在，开始获取')
      try {
        const result = await userStore.fetchUserInfo()
        console.log('路由守卫: 用户信息获取完成:', result ? '成功' : '失败')
        console.log('路由守卫: 获取后状态 - hasUserInfo:', userStore.hasUserInfo)
      } catch (error) {
        console.error('路由守卫: 获取用户信息失败:', error)
        // 如果获取用户信息失败，可能是 token 已过期，重新登录
        userStore.logoutAndRedirect(1000)
        return next(false)
      }
    } else {
      console.log('路由守卫: 用户信息已存在，直接放行')
    }
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