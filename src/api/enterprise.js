import request from '../utils/agricultureRequest'

// 根据环境判断使用的 API 基础 URL
const API_BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_APP_LOCAL_TEST_API_URL : ''

/**
 * 提交企业认证申请
 * @param {Object} data - 企业认证申请数据
 * @returns {Promise}
 */
export const submitEnterpriseCertify = (data) => {
  return request({
    url: `${API_BASE_URL}/seed/enterprise/certify/submit`,
    method: 'post',
    data
  })
}

/**
 * 查询企业认证详情
 * @param {String} - 企业ID
 * @returns {Promise}
 */
export const getEnterpriseCertifyDetail = () => {
  return request({
    url: `${API_BASE_URL}/seed/enterprise/certify/info`,
    method: 'get'
  })
}

/**
 * 保存企业认证申请草稿
 * @param {Object} data - 企业认证申请数据
 * @returns {Promise}
 */
export const saveEnterpriseCertifyDraft = (data) => {
  return request({
    url: `${API_BASE_URL}/seed/enterprise/certify/save`,
    method: 'post',
    data
  })
}

/**
 * 单文件上传
 * @param {FormData} formData - 包含文件的 FormData
 * @returns {Promise}
 */
export const uploadFile = (formData) => {
  return request({
    url: `${API_BASE_URL}/doc/upload`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

/**
 * 多文件上传
 * @param {FormData} formData - 包含多个文件的 FormData
 * @returns {Promise}
 */
export const uploadFiles = (formData) => {
  return request({
    url: `${API_BASE_URL}/doc/uploads`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

/**
 * 文件下载
 * @param {String} fileId - 文件ID
 * @returns {Promise}
 */
export const downloadFile = (fileId) => {
  return request({
    url: `${API_BASE_URL}/doc/download`,
    method: 'get',
    params: { fileId },
    responseType: 'blob'
  })
}

/**
 * 获取文件预览链接
 * @param {String} fileId - 文件ID
 * @returns {Promise}
 */
export const getFilePreviewUrl = (fileId) => {
  return request({
    url: `${API_BASE_URL}/doc/preview/${fileId}`,
    method: 'get'
  })
}

/**
 * 处理企业审核（通过/驳回）
 * @param {Object} data - 审核数据
 * @param {String} data.enterpriseId - 企业唯一标识
 * @param {Number} data.auditResult - 审核结果：1-通过/2-驳回
 * @param {String} data.auditOpinion - 审核意见
 * @param {String} data.rejectReason - 驳回原因（驳回时必填）
 * @param {String} data.auditor - 审核人
 * @param {String} data.auditStage - 审核阶段：Initial review/re-review/final review
 * @returns {Promise}
 */
export const handleEnterpriseAudit = (data) => {
  return request({
    url: `${API_BASE_URL}/seed/enterprise/audit/handle`,
    method: 'post',
    data
  })
}

/**
 * 查询企业审核列表
 * @param {Object} params - 查询参数
 * @param {String} params.enterpriseName - 企业名称（可选）
 * @param {Number} params.certificationStatus - 认证状态（可选）
 * @returns {Promise}
 */
export const getEnterpriseAuditList = (params) => {
  return request({
    url: `${API_BASE_URL}/seed/enterprise/audit/list`,
    method: 'get',
    params
  })
}

// ==================== 品种登记接口 ====================

/**
 * 提交品种登记申请
 * @param {Object} data - 品种登记申请数据
 * @returns {Promise}
 */
export const submitVarietyRegistration = (data) => {
  return request({
    url: `${API_BASE_URL}/seed/variety/registration/submit`,
    method: 'post',
    data
  })
}

/**
 * 查询品种登记列表
 * @param {Object} params - 查询参数
 * @param {String} params.varietyName - 品种名称（可选）
 * @param {String} params.enterpriseName - 企业名称（可选）
 * @param {String} params.recordType - 备案类型（可选）
 * @returns {Promise}
 */
export const getVarietyRegistrationList = (params) => {
  return request({
    url: `${API_BASE_URL}/seed/variety/registration/list`,
    method: 'get',
    params
  })
}

/**
 * 查询品种登记详情
 * @param {String} registrationId - 登记ID
 * @returns {Promise}
 */
export const getVarietyRegistrationDetail = (registrationId) => {
  return request({
    url: `${API_BASE_URL}/seed/variety/registration/${registrationId}`,
    method: 'get'
  })
}

// ==================== 品种审核接口 ====================

/**
 * 处理品种审核（通过/驳回）
 * @param {Object} data - 审核数据
 * @param {String} data.registrationId - 登记申请唯一标识
 * @param {String} data.enterpriseId - 企业唯一标识
 * @param {String} data.varietyName - 品种名称
 * @param {Number} data.auditResult - 审核结果：1-通过/2-驳回
 * @param {String} data.auditOpinion - 审核意见
 * @param {String} data.rejectReason - 驳回原因（驳回时必填）
 * @param {String} data.auditor - 审核人
 * @param {String} data.auditStage - 审核阶段：初审/复审/终审
 * @returns {Promise}
 */
export const handleVarietyAudit = (data) => {
  return request({
    url: `${API_BASE_URL}/seed/variety/audit/handle`,
    method: 'post',
    data
  })
}

/**
 * 查询品种审核列表
 * @param {Object} params - 查询参数
 * @param {String} params.varietyName - 品种名称（可选）
 * @param {Number} params.auditResult - 审核结果（可选）
 * @returns {Promise}
 */
export const getVarietyAuditList = (params) => {
  return request({
    url: `${API_BASE_URL}/seed/variety/audit/list`,
    method: 'get',
    params
  })
}

/**
 * 查询待审核品种列表
 * @param {Object} params - 查询参数
 * @param {String} params.varietyName - 品种名称（可选）
 * @returns {Promise}
 */
export const getPendingVarietyAuditList = (params) => {
  return request({
    url: `${API_BASE_URL}/seed/variety/audit/list`,
    method: 'get',
    params
  })
}

// ==================== 品种发布接口 ====================

/**
 * 发布品种
 * @param {Object} data - 发布数据
 * @param {String} data.registrationId - 登记申请唯一标识
 * @param {String} data.varietyName - 品种名称
 * @param {String} data.cropType - 作物类型
 * @param {String} data.publishDate - 发布日期
 * @param {String} data.publishDept - 发布主管部门
 * @param {String} data.decisionExplanation - 决策说明
 * @param {String} data.publicDescription - 公开描述
 * @param {String} data.recommendedRegion - 推荐地区
 * @param {String} data.sowingGuide - 播种指南
 * @param {Number} data.publishStatus - 公示状态：1-公示中
 * @param {String} data.publisher - 发布人
 * @returns {Promise}
 */
export const publishVariety = (data) => {
  return request({
    url: `${API_BASE_URL}/seed/variety/publish/handle`,
    method: 'post',
    data
  })
}

/**
 * 查询已发布品种列表
 * @param {Object} params - 查询参数
 * @param {String} params.varietyName - 品种名称（可选）
 * @param {String} params.cropType - 作物类型（可选）
 * @param {Number} params.publishStatus - 公示状态（可选）
 * @returns {Promise}
 */
export const getPublishedVarietyList = (params) => {
  return request({
    url: `${API_BASE_URL}/seed/variety/publish/list`,
    method: 'get',
    params
  })
}

/**
 * 查询品种发布详情
 * @param {String} publishId - 发布ID
 * @returns {Promise}
 */
export const getVarietyPublishDetail = (publishId) => {
  return request({
    url: `${API_BASE_URL}/seed/variety/publish/${publishId}`,
    method: 'get'
  })
}

/**
 * 下架品种
 * @param {String} publishId - 发布ID
 * @returns {Promise}
 */
export const unpublishVariety = (publishId) => {
  return request({
    url: `${API_BASE_URL}/seed/variety/publish/unpublish/${publishId}`,
    method: 'post'
  })
}

// ==================== 育种计划管理接口 ====================

/**
 * 新增育种计划
 * @param {Object} data - 育种计划数据
 * @returns {Promise}
 */
export const addBreedingPlan = (data) => {
  return request({
    url: `${API_BASE_URL}/rest/system/breedingPlan/add`,
    method: 'post',
    data
  })
}

/**
 * 查询育种计划列表
 * @param {Object} params - 查询参数
 * @returns {Promise}
 */
export const getBreedingPlanList = (params) => {
  return request({
    url: `${API_BASE_URL}/rest/system/breedingPlan/list`,
    method: 'get',
    params
  })
}

/**
 * 查询育种计划详情
 * @param {String} planId - 计划ID
 * @returns {Promise}
 */
export const getBreedingPlanDetail = (planId) => {
  return request({
    url: `${API_BASE_URL}/rest/system/breedingPlan/info/${planId}`,
    method: 'get'
  })
}

/**
 * 编辑育种计划
 * @param {Object} data - 育种计划数据
 * @returns {Promise}
 */
export const editBreedingPlan = (data) => {
  return request({
    url: `${API_BASE_URL}/rest/system/breedingPlan/edit`,
    method: 'put',
    data
  })
}

/**
 * 删除育种计划
 * @param {String} planId - 计划ID
 * @returns {Promise}
 */
export const removeBreedingPlan = (planId) => {
  return request({
    url: `${API_BASE_URL}/rest/system/breedingPlan/remove/${planId}`,
    method: 'delete'
  })
}

// ==================== 育种材料登记接口 ====================

/**
 * 新增育种材料登记
 * @param {Object} data - 育种材料数据
 * @returns {Promise}
 */
export const addBreedingMaterial = (data) => {
  return request({
    url: `${API_BASE_URL}/rest/system/breedingMaterial/add`,
    method: 'post',
    data
  })
}

/**
 * 查询育种材料列表
 * @param {Object} params - 查询参数
 * @returns {Promise}
 */
export const getBreedingMaterialList = (params) => {
  return request({
    url: `${API_BASE_URL}/rest/system/breedingMaterial/list`,
    method: 'get',
    params
  })
}

/**
 * 查询育种材料详情
 * @param {String} materialId - 材料ID
 * @returns {Promise}
 */
export const getBreedingMaterialDetail = (materialId) => {
  return request({
    url: `${API_BASE_URL}/rest/system/breedingMaterial/info/${materialId}`,
    method: 'get'
  })
}

/**
 * 编辑育种材料
 * @param {Object} data - 育种材料数据
 * @returns {Promise}
 */
export const editBreedingMaterial = (data) => {
  return request({
    url: `${API_BASE_URL}/rest/system/breedingMaterial/edit`,
    method: 'put',
    data
  })
}

/**
 * 删除育种材料
 * @param {String} materialId - 材料ID
 * @returns {Promise}
 */
export const removeBreedingMaterial = (materialId) => {
  return request({
    url: `${API_BASE_URL}/rest/system/breedingMaterial/remove/${materialId}`,
    method: 'delete'
  })
}

// ==================== 育种跟踪管理接口 ====================

/**
 * 新增育种跟踪记录
 * @param {Object} data - 育种跟踪数据
 * @returns {Promise}
 */
export const addBreedingTracking = (data) => {
  return request({
    url: `${API_BASE_URL}/rest/system/breedingTracking/add`,
    method: 'post',
    data
  })
}

/**
 * 查询育种跟踪记录列表
 * @param {Object} params - 查询参数
 * @returns {Promise}
 */
export const getBreedingTrackingList = (params) => {
  return request({
    url: `${API_BASE_URL}/rest/system/breedingTracking/list`,
    method: 'get',
    params
  })
}

/**
 * 查询育种跟踪记录详情
 * @param {String} trackingId - 跟踪ID
 * @returns {Promise}
 */
export const getBreedingTrackingDetail = (trackingId) => {
  return request({
    url: `${API_BASE_URL}/rest/system/breedingTracking/info/${trackingId}`,
    method: 'get'
  })
}

/**
 * 编辑育种跟踪记录
 * @param {Object} data - 育种跟踪数据
 * @returns {Promise}
 */
export const editBreedingTracking = (data) => {
  return request({
    url: `${API_BASE_URL}/rest/system/breedingTracking/edit`,
    method: 'put',
    data
  })
}

/**
 * 删除育种跟踪记录
 * @param {String} trackingId - 跟踪ID
 * @returns {Promise}
 */
export const removeBreedingTracking = (trackingId) => {
  return request({
    url: `${API_BASE_URL}/rest/system/breedingTracking/remove/${trackingId}`,
    method: 'delete'
  })
}
