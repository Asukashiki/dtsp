import request from '../utils/agricultureRequest'

/**
 * 查询审核列表(待审核/已审核数据集)
 * @param {Object} data 查询参数
 * @returns Promise
 */
export const getAuditList = (data) => {
  return request({
    url: '/seed/dataset/audit/list',
    method: 'post',
    data
  })
}

/**
 * 根据ID查询审核详情
 * @param {String} id 审核记录ID
 * @returns Promise
 */
export const getAuditById = (id) => {
  return request({
    url: `/seed/dataset/audit/getById/${id}`,
    method: 'get'
  })
}

/**
 * 根据数据集ID查询审核详情
 * @param {String} datasetId 数据集ID
 * @returns Promise
 */
export const getAuditByDatasetId = (datasetId) => {
  return request({
    url: `/seed/dataset/audit/getByDatasetId/${datasetId}`,
    method: 'get'
  })
}

/**
 * 执行审核(通过/驳回)
 * @param {Object} data 审核信息
 * @returns Promise
 */
export const performAudit = (data) => {
  return request({
    url: '/seed/dataset/audit/perform',
    method: 'post',
    data
  })
}

/**
 * 查询审核历史记录
 * @param {String} datasetId 数据集ID
 * @returns Promise
 */
export const getAuditHistory = (datasetId) => {
  return request({
    url: `/seed/dataset/audit/history/${datasetId}`,
    method: 'get'
  })
}
