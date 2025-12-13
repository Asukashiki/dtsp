import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/store'
import { getTokenFromUrl, getToken } from '../utils/auth'
import { ElMessage } from 'element-plus'
import farmLayoutConfig from '@/config/farm-layout.json'
import inputLayoutConfig from '@/config/input-layout.json'
import researchLayoutConfig from '@/config/research-layout.json'
import newFarmLayoutConfig from '@/config/new-farm-layout.json'

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
  // C1繁殖批次证书打印页面
  {
    path: '/print/seed/c1-breeding-certificate/:id',
    name: 'C1BreedingCertificatePrint',
    component: () => import('../views/seed/c1-breeding-certificate/print.vue'),
    meta: { title: 'C1繁殖批次证书打印', hideInMenu: true, requiresAuth: true }
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
    redirect: '/research/breeding-data/batch',
    meta: { requiresAuth: true, layoutConfig: researchLayoutConfig },
    children: [
      // ==================== 育种数据管理 ====================
      
      // 育种批次管理
      {
        path: 'breeding-data/batch',
        name: 'BreedingBatchList',
        component: () => import('../views/research/breeding-data/batch/index.vue'),
        meta: { title: '育种批次管理', requiresAuth: true }
      },
      {
        path: 'breeding-data/batch/add',
        name: 'BreedingBatchAdd',
        component: () => import('../views/research/breeding-data/batch/form.vue'),
        meta: { title: '新增育种批次', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/batch/edit/:dataId',
        name: 'BreedingBatchEdit',
        component: () => import('../views/research/breeding-data/batch/form.vue'),
        meta: { title: '编辑育种批次', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/batch/detail/:dataId',
        name: 'BreedingBatchDetail',
        component: () => import('../views/research/breeding-data/batch/detail.vue'),
        meta: { title: '育种批次详情', hideInMenu: true, requiresAuth: true }
      },
      
      // 地块及播种信息管理
      {
        path: 'breeding-data/plot',
        name: 'PlotInfoList',
        component: () => import('../views/research/breeding-data/plot/index.vue'),
        meta: { title: '地块及播种信息管理', requiresAuth: true }
      },
      {
        path: 'breeding-data/plot/add',
        name: 'PlotInfoAdd',
        component: () => import('../views/research/breeding-data/plot/form.vue'),
        meta: { title: '新增地块信息', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/plot/edit/:plotId',
        name: 'PlotInfoEdit',
        component: () => import('../views/research/breeding-data/plot/form.vue'),
        meta: { title: '编辑地块信息', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/plot/detail/:plotId',
        name: 'PlotInfoDetail',
        component: () => import('../views/research/breeding-data/plot/detail.vue'),
        meta: { title: '地块信息详情', hideInMenu: true, requiresAuth: true }
      },
      
      // 试验基础信息管理
      {
        path: 'breeding-data/trial',
        name: 'TrialBasicList',
        component: () => import('../views/research/breeding-data/trial/index.vue'),
        meta: { title: '试验基础信息管理', requiresAuth: true }
      },
      {
        path: 'breeding-data/trial/add',
        name: 'TrialBasicAdd',
        component: () => import('../views/research/breeding-data/trial/form.vue'),
        meta: { title: '新增试验信息', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/trial/edit/:trialId',
        name: 'TrialBasicEdit',
        component: () => import('../views/research/breeding-data/trial/form.vue'),
        meta: { title: '编辑试验信息', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/trial/detail/:trialId',
        name: 'TrialBasicDetail',
        component: () => import('../views/research/breeding-data/trial/detail.vue'),
        meta: { title: '试验信息详情', hideInMenu: true, requiresAuth: true }
      },
      
      // 农艺性状数据采集
      {
        path: 'breeding-data/trait',
        name: 'AgronomicTraitDataList',
        component: () => import('../views/research/breeding-data/trait/index.vue'),
        meta: { title: '农艺性状数据采集', requiresAuth: true }
      },
      {
        path: 'breeding-data/trait/add',
        name: 'AgronomicTraitDataAdd',
        component: () => import('../views/research/breeding-data/trait/form.vue'),
        meta: { title: '新增农艺性状数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/trait/edit/:traitId',
        name: 'AgronomicTraitDataEdit',
        component: () => import('../views/research/breeding-data/trait/form.vue'),
        meta: { title: '编辑农艺性状数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/trait/detail/:traitId',
        name: 'AgronomicTraitDataDetail',
        component: () => import('../views/research/breeding-data/trait/detail.vue'),
        meta: { title: '农艺性状数据详情', hideInMenu: true, requiresAuth: true }
      },
      
      // 农事记录数据采集
      {
        path: 'breeding-data/farming',
        name: 'FarmingRecordDataList',
        component: () => import('../views/research/breeding-data/farming/index.vue'),
        meta: { title: '农事记录数据采集', requiresAuth: true }
      },
      {
        path: 'breeding-data/farming/add',
        name: 'FarmingRecordDataAdd',
        component: () => import('../views/research/breeding-data/farming/form.vue'),
        meta: { title: '新增农事记录', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/farming/edit/:farmingId',
        name: 'FarmingRecordDataEdit',
        component: () => import('../views/research/breeding-data/farming/form.vue'),
        meta: { title: '编辑农事记录', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/farming/detail/:farmingId',
        name: 'FarmingRecordDataDetail',
        component: () => import('../views/research/breeding-data/farming/detail.vue'),
        meta: { title: '农事记录详情', hideInMenu: true, requiresAuth: true }
      },
      
      // 环境属性数据采集
      {
        path: 'breeding-data/environment',
        name: 'EnvironmentDataList',
        component: () => import('../views/research/breeding-data/environment/index.vue'),
        meta: { title: '环境属性数据采集', requiresAuth: true }
      },
      {
        path: 'breeding-data/environment/add',
        name: 'EnvironmentDataAdd',
        component: () => import('../views/research/breeding-data/environment/form.vue'),
        meta: { title: '新增环境数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/environment/edit/:envId',
        name: 'EnvironmentDataEdit',
        component: () => import('../views/research/breeding-data/environment/form.vue'),
        meta: { title: '编辑环境数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/environment/detail/:envId',
        name: 'EnvironmentDataDetail',
        component: () => import('../views/research/breeding-data/environment/detail.vue'),
        meta: { title: '环境数据详情', hideInMenu: true, requiresAuth: true }
      },
      
      // 田间检验数据采集
      {
        path: 'breeding-data/field-inspection',
        name: 'FieldInspection',
        component: () => import('../views/research/data-collection/yield-data/index.vue'),
        meta: { title: '田间检验数据采集', requiresAuth: true }
      },
      {
        path: 'breeding-data/field-inspection/add',
        name: 'FieldInspectionAdd',
        component: () => import('../views/research/data-collection/yield-data/form.vue'),
        meta: { title: '新增田间检验数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/field-inspection/edit/:id',
        name: 'FieldInspectionEdit',
        component: () => import('../views/research/data-collection/yield-data/form.vue'),
        meta: { title: '编辑田间检验数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/field-inspection/detail/:id',
        name: 'FieldInspectionDetail',
        component: () => import('../views/research/data-collection/yield-data/detail.vue'),
        meta: { title: '田间检验数据详情', hideInMenu: true, requiresAuth: true }
      },
      
      // 实验室测试数据采集
      {
        path: 'breeding-data/laboratory-test',
        name: 'BreedingLabTest',
        component: () => import('../views/research/data-collection/laboratory-test/index.vue'),
        meta: { title: '实验室测试数据采集', requiresAuth: true }
      },
      {
        path: 'breeding-data/laboratory-test/add',
        name: 'BreedingLabTestAdd',
        component: () => import('../views/research/data-collection/laboratory-test/form.vue'),
        meta: { title: '新增实验室测试数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/laboratory-test/edit/:id',
        name: 'BreedingLabTestEdit',
        component: () => import('../views/research/data-collection/laboratory-test/form.vue'),
        meta: { title: '编辑实验室测试数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/laboratory-test/detail/:id',
        name: 'BreedingLabTestDetail',
        component: () => import('../views/research/data-collection/laboratory-test/detail.vue'),
        meta: { title: '实验室测试数据详情', hideInMenu: true, requiresAuth: true }
      },
      
      // Breeder seed生产数据采集
      // 育种数据管理 - 育种数据集编制
      {
        path: 'breeding-data/dataset-compilation',
        name: 'DatasetCompilation',
        component: () => import('../views/research/breeding-data/dataset-compilation/index.vue'),
        meta: { title: '育种数据集编制', requiresAuth: true }
      },
      {
        path: 'breeding-data/dataset-compilation/add',
        name: 'DatasetCompilationAdd',
        component: () => import('../views/research/breeding-data/dataset-compilation/form.vue'),
        meta: { title: '新增数据集', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/dataset-compilation/edit/:id',
        name: 'DatasetCompilationEdit',
        component: () => import('../views/research/breeding-data/dataset-compilation/form.vue'),
        meta: { title: '编辑数据集', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/dataset-compilation/detail/:id',
        name: 'DatasetCompilationDetail',
        component: () => import('../views/research/breeding-data/dataset-compilation/detail.vue'),
        meta: { title: '数据集详情', hideInMenu: true, requiresAuth: true }
      },
      // 育种数据管理 - 育种数据集审核
      {
        path: 'breeding-data/dataset-audit',
        name: 'DatasetAudit',
        component: () => import('../views/research/breeding-data/dataset-audit/index.vue'),
        meta: { title: '育种数据集审核', requiresAuth: true }
      },
      {
        path: 'breeding-data/dataset-audit/review/:id',
        name: 'DatasetAuditReview',
        component: () => import('../views/research/breeding-data/dataset-audit/review.vue'),
        meta: { title: '审核数据集', hideInMenu: true, requiresAuth: true }
      },
      // 育种数据管理 - 试验基础信息管理审核
      {
        path: 'breeding-data/trial-audit',
        name: 'TrialBasicAudit',
        component: () => import('../views/research/breeding-data/trial-audit/index.vue'),
        meta: { title: '试验基础信息管理审核', requiresAuth: true }
      },
      {
        path: 'breeding-data/trial-audit/review/:id',
        name: 'TrialBasicAuditReview',
        component: () => import('../views/research/breeding-data/trial-audit/review.vue'),
        meta: { title: '审核试验', hideInMenu: true, requiresAuth: true }
      },
      // 育种数据管理 - 育种许可数据录入
      {
        path: 'breeding-data/breeding-license',
        name: 'BreedingLicense',
        component: () => import('../views/research/breeding-data/breeding-license/index.vue'),
        meta: { title: '育种许可数据录入', requiresAuth: true }
      },
      {
        path: 'breeding-data/breeding-license/add',
        name: 'BreedingLicenseAdd',
        component: () => import('../views/research/breeding-data/breeding-license/form.vue'),
        meta: { title: '新增许可', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/breeding-license/edit/:id',
        name: 'BreedingLicenseEdit',
        component: () => import('../views/research/breeding-data/breeding-license/form.vue'),
        meta: { title: '编辑许可', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding-data/breeding-license/detail/:id',
        name: 'BreedingLicenseDetail',
        component: () => import('../views/research/breeding-data/breeding-license/detail.vue'),
        meta: { title: '许可详情', hideInMenu: true, requiresAuth: true }
      },
      // 数据采集 - 试验基础数据采集
      {
        path: 'breeding/seed-production',
        name: 'SeedProduction',
        component: () => import('../views/research/breeding/seed-production/index.vue'),
        meta: { title: 'Breeder able seed生产数据采集', requiresAuth: true }
      },
      
      // Breeder seed分发数据
      {
        path: 'breeding/seed-distribution',
        name: 'SeedDistribution',
        component: () => import('../views/research/breeding/seed-distribution/index.vue'),
        meta: { title: 'Breeder able seed分发数据', requiresAuth: true }
      },
      
      // 物联网传感器维护
      {
        path: 'data-collection/iot-sensor',
        name: 'IotSensorList',
        component: () => import('../views/research/data-collection/iot-sensor/index.vue'),
        meta: { title: '物联网传感器维护', requiresAuth: true }
      },
      {
        path: 'data-collection/iot-sensor/add',
        name: 'IotSensorAdd',
        component: () => import('../views/research/data-collection/iot-sensor/form.vue'),
        meta: { title: '新增传感器', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'data-collection/iot-sensor/edit/:id',
        name: 'IotSensorEdit',
        component: () => import('../views/research/data-collection/iot-sensor/form.vue'),
        meta: { title: '编辑传感器', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'data-collection/iot-sensor/detail/:id',
        name: 'IotSensorDetail',
        component: () => import('../views/research/data-collection/iot-sensor/detail.vue'),
        meta: { title: '传感器详情', hideInMenu: true, requiresAuth: true }
      },

      // 环境监测新数据
      {
        path: 'data-collection/environment-new-data',
        name: 'EnvironmentNewDataList',
        component: () => import('../views/research/data-collection/environment-new-data/index.vue'),
        meta: { title: '环境监测数据', requiresAuth: true }
      },
      {
        path: 'data-collection/environment-new-data/add',
        name: 'EnvironmentNewDataAdd',
        component: () => import('../views/research/data-collection/environment-new-data/form.vue'),
        meta: { title: '新增环境监测数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'data-collection/environment-new-data/edit/:envRecordId',
        name: 'EnvironmentNewDataEdit',
        component: () => import('../views/research/data-collection/environment-new-data/form.vue'),
        meta: { title: '编辑环境监测数据', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'data-collection/environment-new-data/detail/:envRecordId',
        name: 'EnvironmentNewDataDetail',
        component: () => import('../views/research/data-collection/environment-new-data/detail.vue'),
        meta: { title: '环境监测数据详情', hideInMenu: true, requiresAuth: true }
      },
      // ==================== 繁殖数据管理 ====================
      
      // OSE确认接收育种家种子
      {
        path: 'breeding/ose-receive-confirm',
        name: 'OseReceiveConfirm',
        component: () => import('../views/research/breeding/ose-receive-confirm/index.vue'),
        meta: { title: 'OSE确认接收育种家种子', requiresAuth: true }
      },
      
      // 繁殖批次信息采集
      {
        path: 'breeding',
        name: 'BreedingModule',
        component: () => import('../views/research/breeding/ose-information/index.vue'),
        meta: { title: '繁殖批次信息采集', requiresAuth: true }
      },
      {
        path: 'breeding/batch/add',
        name: 'PropagationBatchAdd',
        component: () => import('../views/research/breeding/ose-information/batch-form.vue'),
        meta: { title: '新增繁殖批次', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding/batch/edit/:id',
        name: 'PropagationBatchEdit',
        component: () => import('../views/research/breeding/ose-information/batch-form.vue'),
        meta: { title: '编辑繁殖批次', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding/detail/:id',
        name: 'BreedingDetail',
        component: () => import('../views/research/breeding/ose-information/detail.vue'),
        meta: { title: '繁殖批次详情', hideInMenu: true, requiresAuth: true }
      },
      
      // 繁殖跟踪信息采集
      {
        path: 'breeding/tracking',
        name: 'BreedingTracking',
        component: () => import('../views/research/breeding-tracking/index.vue'),
        meta: { title: '繁殖跟踪信息采集', requiresAuth: true }
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
      
      // C1种子繁殖申请
      {
        path: 'c1-propagation',
        name: 'C1PropagationList',
        component: () => import('../views/research/c1-propagation/index.vue'),
        meta: { title: 'C1种子繁殖申请', requiresAuth: true }
      },
      {
        path: 'c1-propagation/add',
        name: 'C1PropagationAdd',
        component: () => import('../views/research/c1-propagation/form.vue'),
        meta: { title: '新增繁殖申请', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'c1-propagation/edit/:id',
        name: 'C1PropagationEdit',
        component: () => import('../views/research/c1-propagation/form.vue'),
        meta: { title: '编辑繁殖申请', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'c1-propagation/detail/:id',
        name: 'C1PropagationDetail',
        component: () => import('../views/research/c1-propagation/detail.vue'),
        meta: { title: '繁殖申请详情', hideInMenu: true, requiresAuth: true }
      },
      
      // C1种子繁殖申请审核
      {
        path: 'c1-propagation-audit',
        name: 'C1PropagationAuditList',
        component: () => import('../views/research/c1-propagation-audit/index.vue'),
        meta: { title: 'C1种子繁殖申请审核', requiresAuth: true }
      },
      {
        path: 'c1-propagation-audit/detail/:id',
        name: 'C1PropagationAuditDetail',
        component: () => import('../views/research/c1-propagation-audit/detail.vue'),
        meta: { title: '繁殖申请审核详情', hideInMenu: true, requiresAuth: true }
      },
      
      // C1繁殖批次管理
      {
        path: 'c1-breeding-batch',
        name: 'C1BreedingBatchList',
        component: () => import('../views/research/c1-breeding-batch/index.vue'),
        meta: { title: 'C1繁殖批次管理', requiresAuth: true }
      },
      {
        path: 'c1-breeding-batch/add',
        name: 'C1BreedingBatchAdd',
        component: () => import('../views/research/c1-breeding-batch/batch-form.vue'),
        meta: { title: '新增C1繁殖批次', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'c1-breeding-batch/edit/:id',
        name: 'C1BreedingBatchEdit',
        component: () => import('../views/research/c1-breeding-batch/batch-form.vue'),
        meta: { title: '编辑C1繁殖批次', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'c1-breeding-batch/detail/:id',
        name: 'C1BreedingBatchDetail',
        component: () => import('../views/research/c1-breeding-batch/detail.vue'),
        meta: { title: 'C1繁殖批次详情', hideInMenu: true, requiresAuth: true }
      },
      
      // 种子认证审核
      {
        path: 'seed/breeding-audit',
        name: 'BreedingAudit',
        component: () => import('../views/seed/breeding-audit/index.vue'),
        meta: { title: '种子认证审核', requiresAuth: true }
      },
      
      // 种子认证颁发
      {
        path: 'seed/breeding-certificate',
        name: 'BreedingCertificate',
        component: () => import('../views/seed/breeding-certificate/index.vue'),
        meta: { title: '种子认证颁发', requiresAuth: true }
      },
      
      // C1繁殖批次审核
      {
        path: 'c1-breeding-batch-audit',
        name: 'C1BreedingBatchAudit',
        component: () => import('../views/seed/c1-breeding-batch-audit/index.vue'),
        meta: { title: 'C1繁殖批次审核', requiresAuth: true }
      },
      
      // C1繁殖批次证书颁发
      {
        path: 'c1-breeding-certificate',
        name: 'C1BreedingCertificate',
        component: () => import('../views/seed/c1-breeding-certificate/index.vue'),
        meta: { title: 'C1繁殖批次证书颁发', requiresAuth: true }
      },
      
      // 繁殖机构注册
      {
        path: 'institution/registration',
        name: 'InstitutionRegistration',
        component: () => import('../views/research/institution/registration/index.vue'),
        meta: { title: '繁殖机构注册', requiresAuth: true }
      },
      {
        path: 'institution/approval',
        name: 'InstitutionApproval',
        component: () => import('../views/research/institution/registration/approval.vue'),
        meta: { title: '繁殖机构注册', requiresAuth: true }
      },
      {
        path: 'union/registration',
        name: 'UnionRegistration',
        component: () => import('../views/research/institution/union/UnionRegistration.vue'),
        meta: { title: '繁殖机构注册申请', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'breeding/ose-management',
        name: 'OseManagement',
        component: () => import('../views/research/institution/ose-management/index.vue'),
        meta: { title: 'OSE维护', requiresAuth: true }
      },

      // ==================== 研究中心管理 ====================
      {
        path: 'institution/research-center',
        name: 'ResearchCenter',
        component: () => import('../views/research/institution/research-center/index.vue'),
        meta: { title: '研究中心管理', requiresAuth: true }
      },
      {
        path: 'institution/research-center/add',
        name: 'ResearchCenterAdd',
        component: () => import('../views/research/institution/research-center/form.vue'),  
        meta: { title: '新增研究中心', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'institution/research-center/edit/:locationId',
        name: 'ResearchCenterEdit',
        component: () => import('../views/research/institution/research-center/form.vue'),
        meta: { title: '编辑研究中心', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'institution/research-center/detail/:locationId',
        name: 'ResearchCenterDetail',
        component: () => import('../views/research/institution/research-center/detail.vue'),
        meta: { title: '研究中心详情', hideInMenu: true, requiresAuth: true }
      },

      // ==================== 种子信息服务 ====================
      
      // 种子推广信息管理
      {
        path: 'seed/promotion',
        name: 'SeedPromotion',
        component: () => import('../views/research/seed/SeedPromotion.vue'),
        meta: { title: '种子推广信息管理', requiresAuth: true }
      },
      
      // 种子信息公示
      {
        path: 'seed/info',
        name: 'SeedInfo',
        component: () => import('../views/research/variety/VarietyQuery.vue'),
        meta: { title: '种子信息公示', requiresAuth: true }
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
      // 注册管理
      {
        path: 'registration',
        name: 'Registration',
        component: () => import('../views/input/registration/index.vue'),
        meta: { title: 'Union/Cooperative注册申请', requiresAuth: true }
      },
      {
        path: 'registration/add',
        name: 'RegistrationAdd',
        component: () => import('../views/input/registration/form.vue'),
        meta: { title: '新增注册申请', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'registration/edit/:id',
        name: 'RegistrationEdit',
        component: () => import('../views/input/registration/form.vue'),
        meta: { title: '编辑注册申请', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'registration/detail/:id',
        name: 'RegistrationDetail',
        component: () => import('../views/input/registration/detail.vue'),
        meta: { title: '注册申请详情', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'registration/approval',
        name: 'RegistrationApproval',
        component: () => import('../views/input/registration/approval.vue'),
        meta: { title: 'Union/Cooperative注册审核', requiresAuth: true }
      },
      // DA农民需求录入
      {
        path: 'demand/farmer',
        name: 'FarmerDemand',
        component: () => import('../views/input/demand/farmer/index.vue'),
        meta: { title: 'DA农民需求录入', requiresAuth: true }
      },
      {
        path: 'demand/farmer/add',
        name: 'FarmerDemandAdd',
        component: () => import('../views/input/demand/farmer/form.vue'),
        meta: { title: '新增农民需求', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'demand/farmer/edit/:id',
        name: 'FarmerDemandEdit',
        component: () => import('../views/input/demand/farmer/form.vue'),
        meta: { title: '编辑农民需求', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'demand/farmer/detail/:id',
        name: 'FarmerDemandDetail',
        component: () => import('../views/input/demand/farmer/detail.vue'),
        meta: { title: '农民需求详情', hideInMenu: true, requiresAuth: true }
      },
      // 村级需求汇聚（新页面）
      {
        path: 'demand/aggregation',
        name: 'VillageAggregation',
        component: () => import('../views/input/demand/aggregation/index.vue'),
        meta: { title: '村级需求汇聚', requiresAuth: true }
      },
      // 村级审核详情（原投入品需求审核页面，现作为详情页隐藏）
      {
        path: 'demand/audit/:year',
        name: 'VillageAuditDetail',
        component: () => import('../views/input/demand/audit/index.vue'),
        meta: { title: '村级审核详情', hideInMenu: true, requiresAuth: true }
      },
      // 镇级需求汇聚（新页面）
      {
        path: 'demand/aggregation-town',
        name: 'TownAggregation',
        component: () => import('../views/input/demand/aggregation-town/index.vue'),
        meta: { title: '镇级需求汇聚', requiresAuth: true }
      },
      // 镇级审核详情（隐藏页面，通过年度参数访问）
      {
        path: 'demand/audit-town/:year',
        name: 'TownAuditDetail',
        component: () => import('../views/input/demand/audit-town/index.vue'),
        meta: { title: '镇级审核详情', hideInMenu: true, requiresAuth: true }
      },
      // 区级需求汇聚（新页面）
      {
        path: 'demand/aggregation-district',
        name: 'DistrictAggregation',
        component: () => import('../views/input/demand/aggregation-district/index.vue'),
        meta: { title: '区级需求汇聚', requiresAuth: true }
      },
      // 区级审核详情（隐藏页面，通过年度参数访问）
      {
        path: 'demand/audit-district/:year',
        name: 'DistrictAuditDetail',
        component: () => import('../views/input/demand/audit-district/index.vue'),
        meta: { title: '区级审核详情', hideInMenu: true, requiresAuth: true }
      },
      // 州级需求汇聚（新页面）
      {
        path: 'demand/aggregation-state',
        name: 'StateAggregation',
        component: () => import('../views/input/demand/aggregation-state/index.vue'),
        meta: { title: '州级需求汇聚', requiresAuth: true }
      },
      // 州农业部查看
      {
        path: 'demand/audit-state',
        name: 'StateDemandAuditView',
        component: () => import('../views/input/demand/audit-state/index.vue'),
        meta: { title: '州农业部查看', requiresAuth: true }
      },
      {
        path: 'demand/audit/detail/:id',
        name: 'DemandAuditDetail',
        component: () => import('../views/input/demand/audit/detail.vue'),
        meta: { title: '需求审核详情', hideInMenu: true, requiresAuth: true }
      },
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
        path: 'inventory/stock-in/form',
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
      },
      // 州级年度配额管理
      {
        path: 'allocate/state-quota',
        name: 'StateAnnualQuota',
        component: () => import('../views/input/allocate/state-quota/index.vue'),
        meta: { title: '州级年度配额管理', requiresAuth: true }
      },
      {
        path: 'allocate/state-quota/add',
        name: 'StateAnnualQuotaAdd',
        component: () => import('../views/input/allocate/state-quota/form.vue'),
        meta: { title: '新增州级配额', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'allocate/state-quota/edit/:quotaId',
        name: 'StateAnnualQuotaEdit',
        component: () => import('../views/input/allocate/state-quota/form.vue'),
        meta: { title: '编辑州级配额', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'allocate/state-quota/detail/:quotaId',
        name: 'StateAnnualQuotaDetail',
        component: () => import('../views/input/allocate/state-quota/detail.vue'),
        meta: { title: '州级配额详情', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'allocate/state-quota/allocate/:quotaId',
        name: 'StateAnnualQuotaAllocate',
        component: () => import('../views/input/allocate/state-quota/allocate.vue'),
        meta: { title: '配额分配', hideInMenu: true, requiresAuth: true }
      },
      // 配额逐级分配管理
      {
        path: 'allocate/quota-allocation',
        name: 'QuotaAllocation',
        component: () => import('../views/input/allocate/quota-allocation/index.vue'),
        meta: { title: '配额逐级分配管理', requiresAuth: true }
      },
      {
        path: 'allocate/quota-allocation/add',
        name: 'QuotaAllocationAdd',
        component: () => import('../views/input/allocate/quota-allocation/form.vue'),
        meta: { title: '新增配额分配', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'allocate/quota-allocation/edit/:allocationId',
        name: 'QuotaAllocationEdit',
        component: () => import('../views/input/allocate/quota-allocation/form.vue'),
        meta: { title: '编辑配额分配', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'allocate/quota-allocation/detail/:allocationId',
        name: 'QuotaAllocationDetail',
        component: () => import('../views/input/allocate/quota-allocation/detail.vue'),
        meta: { title: '配额分配详情', hideInMenu: true, requiresAuth: true }
      },

      // ==================== 投入品流通管理 ====================

      // 投入品配额查看
      {
        path: 'input-circulation/quota',
        name: 'InputQuotaList',
        component: () => import('../views/research/input-circulation/quota/index.vue'),
        meta: { title: '投入品配额查看', requiresAuth: true }
      },
      {
        path: 'input-circulation/quota/detail/:id',
        name: 'InputQuotaDetail',
        component: () => import('../views/research/input-circulation/quota/detail.vue'),
        meta: { title: '配额详情', hideInMenu: true, requiresAuth: true }
      },

      // OSE分发种子到Union
      {
        path: 'input-circulation/ose-release',
        name: 'OseReleaseList',
        component: () => import('../views/research/input-circulation/ose-release/index.vue'),
        meta: { title: 'OSE分发种子到Union', requiresAuth: true }
      },
      {
        path: 'input-circulation/ose-release/add',
        name: 'OseReleaseAdd',
        component: () => import('../views/research/input-circulation/ose-release/form.vue'),
        meta: { title: '新增分发单', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'input-circulation/ose-release/edit/:id',
        name: 'OseReleaseEdit',
        component: () => import('../views/research/input-circulation/ose-release/form.vue'),
        meta: { title: '编辑分发单', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'input-circulation/ose-release/detail/:id',
        name: 'OseReleaseDetail',
        component: () => import('../views/research/input-circulation/ose-release/detail.vue'),
        meta: { title: '分发单详情', hideInMenu: true, requiresAuth: true }
      },

      // Union确认接收OSE分发
      {
        path: 'input-circulation/union-receive',
        name: 'UnionReceiveList',
        component: () => import('../views/research/input-circulation/union-receive/index.vue'),
        meta: { title: 'Union确认接收', requiresAuth: true }
      },
      {
        path: 'input-circulation/union-receive/confirm/:id',
        name: 'UnionReceiveConfirm',
        component: () => import('../views/research/input-circulation/union-receive/confirm.vue'),
        meta: { title: '确认接收', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'input-circulation/union-receive/detail/:id',
        name: 'UnionReceiveDetail',
        component: () => import('../views/research/input-circulation/union-receive/detail.vue'),
        meta: { title: '接收详情', hideInMenu: true, requiresAuth: true }
      },

      // Union分发投入品到Woreda
      {
        path: 'input-circulation/union-release',
        name: 'UnionReleaseList',
        component: () => import('../views/research/input-circulation/union-release/index.vue'),
        meta: { title: 'Union Distribution to Woreda', requiresAuth: true }
      },
      {
        path: 'input-circulation/union-release/add',
        name: 'UnionReleaseAdd',
        component: () => import('../views/research/input-circulation/union-release/form.vue'),
        meta: { title: '新增分发单', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'input-circulation/union-release/edit/:id',
        name: 'UnionReleaseEdit',
        component: () => import('../views/research/input-circulation/union-release/form.vue'),
        meta: { title: '编辑分发单', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'input-circulation/union-release/detail/:id',
        name: 'UnionReleaseDetail',
        component: () => import('../views/research/input-circulation/union-release/detail.vue'),
        meta: { title: '分发单详情', hideInMenu: true, requiresAuth: true }
      },

      // Woreda确认接收Union分发
      {
        path: 'input-circulation/woreda-receive',
        name: 'WoredaReceiveList',
        component: () => import('../views/research/input-circulation/woreda-receive/index.vue'),
        meta: { title: 'Woreda Receive Confirmation', requiresAuth: true }
      },
      {
        path: 'input-circulation/woreda-receive/confirm/:id',
        name: 'WoredaReceiveConfirm',
        component: () => import('../views/research/input-circulation/woreda-receive/confirm.vue'),
        meta: { title: '确认接收', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'input-circulation/woreda-receive/detail/:id',
        name: 'WoredaReceiveDetail',
        component: () => import('../views/research/input-circulation/woreda-receive/detail.vue'),
        meta: { title: '接收详情', hideInMenu: true, requiresAuth: true }
      },

      // Woreda分发投入品到农民
      {
        path: 'input-circulation/farmer-release',
        name: 'FarmerReleaseList',
        component: () => import('../views/research/input-circulation/farmer-release/index.vue'),
        meta: { title: 'Woreda Distribution to Farmer', requiresAuth: true }
      },
      {
        path: 'input-circulation/farmer-release/add',
        name: 'FarmerReleaseAdd',
        component: () => import('../views/research/input-circulation/farmer-release/form.vue'),
        meta: { title: '新增分发单', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'input-circulation/farmer-release/edit/:id',
        name: 'FarmerReleaseEdit',
        component: () => import('../views/research/input-circulation/farmer-release/form.vue'),
        meta: { title: '编辑分发单', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'input-circulation/farmer-release/detail/:id',
        name: 'FarmerReleaseDetail',
        component: () => import('../views/research/input-circulation/farmer-release/detail.vue'),
        meta: { title: '分发单详情', hideInMenu: true, requiresAuth: true }
      },

      // 农田管理系统
      // ==================== DA管理 ====================
      {
        path: 'da',
        name: 'InputDaList',
        component: () => import('../views/new-farm/da/index.vue'),
        meta: { title: 'DA管理', requiresAuth: true }
      },
      {
        path: 'da/add',
        name: 'InputDaAdd',
        component: () => import('../views/new-farm/da/form.vue'),
        meta: { title: '新增DA', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'da/edit/:id',
        name: 'InputDaEdit',
        component: () => import('../views/new-farm/da/form.vue'),
        meta: { title: '编辑DA', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'da/detail/:id',
        name: 'InputDaDetail',
        component: () => import('../views/new-farm/da/detail.vue'),
        meta: { title: 'DA详情', hideInMenu: true, requiresAuth: true }
      },

      // ==================== 农民管理 ====================
      {
        path: 'farmer',
        name: 'InputFarmerList',
        component: () => import('../views/new-farm/farmer/index.vue'),
        meta: { title: '农民管理', requiresAuth: true }
      },
      {
        path: 'farmer/add',
        name: 'InputFarmerAdd',
        component: () => import('../views/new-farm/farmer/form.vue'),
        meta: { title: '新增农民', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'farmer/edit/:id',
        name: 'InputFarmerEdit',
        component: () => import('../views/new-farm/farmer/form.vue'),
        meta: { title: '编辑农民', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'farmer/detail/:id',
        name: 'InputFarmerDetail',
        component: () => import('../views/new-farm/farmer/detail.vue'),
        meta: { title: '农民详情', hideInMenu: true, requiresAuth: true }
      },

      // ==================== 土地管理 ====================
      {
        path: 'land',
        name: 'InputLandList',
        component: () => import('../views/new-farm/land/index.vue'),
        meta: { title: '土地管理', requiresAuth: true }
      },
      {
        path: 'land/add',
        name: 'InputLandAdd',
        component: () => import('../views/new-farm/land/form.vue'),
        meta: { title: '新增土地', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'land/edit/:id',
        name: 'InputLandEdit',
        component: () => import('../views/new-farm/land/form.vue'),
        meta: { title: '编辑土地', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'land/detail/:id',
        name: 'InputLandDetail',
        component: () => import('../views/new-farm/land/detail.vue'),
        meta: { title: '土地详情', hideInMenu: true, requiresAuth: true }
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
  },
  // 农田管理系统（新版）
  {
    path: '/new-farm',
    name: 'NewFarmSystem',
    component: () => import('../layout/SystemLayout.vue'),
    redirect: '/new-farm/da',
    meta: { requiresAuth: true, layoutConfig: newFarmLayoutConfig },
    children: [
      // ==================== DA管理 ====================
      {
        path: 'da',
        name: 'NewFarmDaList',
        component: () => import('../views/new-farm/da/index.vue'),
        meta: { title: 'DA管理', requiresAuth: true }
      },
      {
        path: 'da/add',
        name: 'NewFarmDaAdd',
        component: () => import('../views/new-farm/da/form.vue'),
        meta: { title: '新增DA', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'da/edit/:id',
        name: 'NewFarmDaEdit',
        component: () => import('../views/new-farm/da/form.vue'),
        meta: { title: '编辑DA', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'da/detail/:id',
        name: 'NewFarmDaDetail',
        component: () => import('../views/new-farm/da/detail.vue'),
        meta: { title: 'DA详情', hideInMenu: true, requiresAuth: true }
      },

      // ==================== 农民管理 ====================
      {
        path: 'farmer',
        name: 'NewFarmFarmerList',
        component: () => import('../views/new-farm/farmer/index.vue'),
        meta: { title: '农民管理', requiresAuth: true }
      },
      {
        path: 'farmer/add',
        name: 'NewFarmFarmerAdd',
        component: () => import('../views/new-farm/farmer/form.vue'),
        meta: { title: '新增农民', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'farmer/edit/:id',
        name: 'NewFarmFarmerEdit',
        component: () => import('../views/new-farm/farmer/form.vue'),
        meta: { title: '编辑农民', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'farmer/detail/:id',
        name: 'NewFarmFarmerDetail',
        component: () => import('../views/new-farm/farmer/detail.vue'),
        meta: { title: '农民详情', hideInMenu: true, requiresAuth: true }
      },

      // ==================== 土地管理 ====================
      {
        path: 'land',
        name: 'NewFarmLandList',
        component: () => import('../views/new-farm/land/index.vue'),
        meta: { title: '土地管理', requiresAuth: true }
      },
      {
        path: 'land/add',
        name: 'NewFarmLandAdd',
        component: () => import('../views/new-farm/land/form.vue'),
        meta: { title: '新增土地', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'land/edit/:id',
        name: 'NewFarmLandEdit',
        component: () => import('../views/new-farm/land/form.vue'),
        meta: { title: '编辑土地', hideInMenu: true, requiresAuth: true }
      },
      {
        path: 'land/detail/:id',
        name: 'NewFarmLandDetail',
        component: () => import('../views/new-farm/land/detail.vue'),
        meta: { title: '土地详情', hideInMenu: true, requiresAuth: true }
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
