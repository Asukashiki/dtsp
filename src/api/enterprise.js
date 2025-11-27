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
