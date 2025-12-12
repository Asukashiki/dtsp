import request from '../utils/agricultureRequest'

// ==================== 需求审核 API ====================

/**
 * 提交审核
 * @param {Array} ids - 需求ID列表
 * @returns {Promise}
 */
export const submitDemandAudit = (ids) => {
  return request({
    url: '/seed/demand/audit/submit',
    method: 'post',
    data: { ids }
  })
}

/**
 * 待审核需求分页查询
 * @param {Object} data - 查询参数
 * @returns {Promise}
 */
export const getPendingDemandPage = (data) => {
  return request({
    url: '/seed/demand/audit/pending/page',
    method: 'post',
    data
  })
}

/**
 * 审核通过
 * @param {Object} data - 审核参数 { ids, remark }
 * @returns {Promise}
 */
export const approveDemand = (data) => {
  return request({
    url: '/seed/demand/audit/approve',
    method: 'post',
    data
  })
}

/**
 * 审核驳回
 * @param {Object} data - 审核参数 { ids, auditOpinion, remark }
 * @returns {Promise}
 */
export const rejectDemand = (data) => {
  return request({
    url: '/seed/demand/audit/reject',
    method: 'post',
    data
  })
}

/**
 * 锁定批次
 * @param {Object} data - 锁定参数 { batchId, version }
 * @returns {Promise}
 */
export const lockBatch = (data) => {
  return request({
    url: '/seed/demand/audit/lock',
    method: 'post',
    data
  })
}

/**
 * 已审核通过需求分页查询
 * @param {Object} data - 查询参数
 * @returns {Promise}
 */
export const getApprovedDemandPage = (data) => {
  return request({
    url: '/seed/demand/audit/approved/page',
    method: 'post',
    data
  })
}

/**
 * 已通过需求汇聚数据查询
 * @param {Object} data - 查询参数 { level }
 * @returns {Promise}
 */
export const getApprovedDemandSummary = (data) => {
  return request({
    url: '/seed/demand/audit/approved/summary',
    method: 'post',
    data
  })
}
