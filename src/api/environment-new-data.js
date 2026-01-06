import agricultureRequest from '../utils/agricultureRequest'

/**
 * 环境监测新数据 API
 * Environment New Data API
 */

/**
 * 分页查询环境监测数据列表
 * Query environment new data list with pagination
 */
export const getEnvironmentNewDataPage = (params) => {
  return agricultureRequest({
    url: '/breeding/environmentNew/list',
    method: 'get',
    params
  })
}

/**
 * 获取环境监测数据详情
 * Get environment new data detail
 */
export const getEnvironmentNewDataDetail = (envRecordId) => {
  return agricultureRequest({
    url: '/breeding/environmentNew/getInfo',
    method: 'get',
    params: { envRecordId }
  })
}

/**
 * 新增环境监测数据
 * Add environment new data
 */
export const addEnvironmentNewData = (data) => {
  return agricultureRequest({
    url: '/breeding/environmentNew/add',
    method: 'post',
    data
  })
}

/**
 * 修改环境监测数据
 * Update environment new data
 */
export const updateEnvironmentNewData = (data) => {
  return agricultureRequest({
    url: '/breeding/environmentNew/edit',
    method: 'post',
    data
  })
}

/**
 * 删除环境监测数据
 * Delete environment new data
 */
export const deleteEnvironmentNewData = (envRecordIds) => {
  return agricultureRequest({
    url: '/breeding/environmentNew/remove',
    method: 'get',
    params: { envRecordIds: envRecordIds.join(',') }
  })
}

/**
 * 提交环境监测数据审核
 * Submit environment new data for audit
 */
export const submitEnvironmentNewDataForAudit = (envRecordId) => {
  return agricultureRequest({
    url: '/breeding/environmentNew/submitForAudit',
    method: 'post',
    data: { envRecordId }
  })
}

/**
 * 审核通过环境监测数据
 * Approve environment new data
 */
export const approveEnvironmentNewData = (envRecordId, auditComment) => {
  return agricultureRequest({
    url: '/breeding/environmentNew/approve',
    method: 'post',
    data: { envRecordId, auditComment }
  })
}

/**
 * 驳回环境监测数据
 * Reject environment new data
 */
export const rejectEnvironmentNewData = (envRecordId, auditComment) => {
  return agricultureRequest({
    url: '/breeding/environmentNew/reject',
    method: 'post',
    data: { envRecordId, auditComment }
  })
}

/**
 * 批量提交环境监测数据审核
 * Batch submit environment new data for audit
 */
export const batchSubmitEnvironmentNewDataForAudit = (envRecordIds) => {
  return agricultureRequest({
    url: '/breeding/environmentNew/batchSubmitForAudit',
    method: 'post',
    data: { envRecordIds }
  })
}

/**
 * 批量审核通过环境监测数据
 * Batch approve environment new data
 */
export const batchApproveEnvironmentNewData = (envRecordIds, auditComment) => {
  return agricultureRequest({
    url: '/breeding/environmentNew/batchApprove',
    method: 'post',
    data: { envRecordIds, auditComment }
  })
}

/**
 * 批量驳回环境监测数据
 * Batch reject environment new data
 */
export const batchRejectEnvironmentNewData = (envRecordIds, auditComment) => {
  return agricultureRequest({
    url: '/breeding/environmentNew/batchReject',
    method: 'post',
    data: { envRecordIds, auditComment }
  })
}
