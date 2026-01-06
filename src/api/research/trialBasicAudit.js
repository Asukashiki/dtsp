import request from '@/utils/agricultureRequest'

// 根据环境判断使用的 API 基础 URL
const API_BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_APP_LOCAL_TEST_API_URL : ''

/**
 * 试验基础信息管理审核 API
 */

// ==================== 试验基础信息管理接口 ====================

/**
 * 提交试验审核
 * @param {string} trialId - 试验ID
 */
export function submitTrial(trialId) {
  return request({
    url: `${API_BASE_URL}/breeding/trial/submit/${trialId}`,
    method: 'post'
  })
}

/**
 * 作废试验
 * @param {string} trialId - 试验ID
 * @param {string} cancelReason - 作废原因
 */
export function cancelTrial(trialId, cancelReason) {
  return request({
    url: `${API_BASE_URL}/breeding/trial/cancel/${trialId}`,
    method: 'post',
    params: { cancelReason }
  })
}

/**
 * 归档试验
 * @param {string} trialId - 试验ID
 */
export function archiveTrial(trialId) {
  return request({
    url: `${API_BASE_URL}/breeding/trial/archive/${trialId}`,
    method: 'post'
  })
}

// ==================== 审核管理接口 ====================

/**
 * 分页查询审核列表
 * @param {Object} data - 查询条件
 */
export function getAuditList(data) {
  return request({
    url: `${API_BASE_URL}/breeding/trial/audit/list`,
    method: 'post',
    data
  })
}

/**
 * 根据ID获取审核详情
 * @param {string} id - 审核记录ID
 */
export function getAuditById(id) {
  return request({
    url: `${API_BASE_URL}/breeding/trial/audit/getById/${id}`,
    method: 'get'
  })
}

/**
 * 根据试验ID获取审核详情
 * @param {string} trialId - 试验ID
 */
export function getAuditByTrialId(trialId) {
  return request({
    url: `${API_BASE_URL}/breeding/trial/audit/getByTrialId/${trialId}`,
    method: 'get'
  })
}

/**
 * 执行审核(通过/退回)
 * @param {Object} data - 审核数据
 */
export function performAudit(data) {
  return request({
    url: `${API_BASE_URL}/breeding/trial/audit/perform`,
    method: 'post',
    data
  })
}

/**
 * 查询审核历史
 * @param {string} trialId - 试验ID
 * @param {Object} params - 分页参数
 */
export function getAuditHistory(trialId, params) {
  return request({
    url: `${API_BASE_URL}/breeding/trial/audit/history/${trialId}`,
    method: 'get',
    params
  })
}

/**
 * 作废审核记录
 * @param {string} auditId - 审核ID
 * @param {string} voidReason - 作废原因
 */
export function voidAudit(auditId, voidReason) {
  return request({
    url: `${API_BASE_URL}/breeding/trial/audit/void/${auditId}`,
    method: 'post',
    params: { voidReason }
  })
}
