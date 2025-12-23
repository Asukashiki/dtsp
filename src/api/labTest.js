import request from '../utils/agricultureRequest'

/**
 * 查询实验室测试数据列表
 * @param {Object} data 查询条件
 * @returns Promise
 */
export const getLabTestList = (data) => {
  return request({
    url: '/seed/laboratory/test/list',
    method: 'post',
    data
  })
}

/**
 * 获取实验室测试数据详情
 * @param {String} id 主键ID
 * @returns Promise
 */
export const getLabTestDetail = (id) => {
  return request({
    url: `/seed/laboratory/test/${id}`,
    method: 'get'
  })
}

/**
 * 新增实验室测试数据
 * @param {Object} data 实验室测试数据
 * @returns Promise
 */
export const addLabTest = (data) => {
  return request({
    url: '/seed/laboratory/test/add',
    method: 'post',
    data
  })
}

/**
 * 修改实验室测试数据
 * @param {Object} data 实验室测试数据
 * @returns Promise
 */
export const updateLabTest = (data) => {
  return request({
    url: '/seed/laboratory/test/edit',
    method: 'post',
    data
  })
}

/**
 * 删除实验室测试数据
 * @param {Array} ids 主键数组
 * @returns Promise
 */
export const deleteLabTest = (ids) => {
  return request({
    url: '/seed/laboratory/test/delete',
    method: 'post',
    data: ids
  })
}

/**
 * 提交审核
 * @param {Object} data 包含dataId
 * @returns Promise
 */
export const submitLabTest = (data) => {
  return request({
    url: '/seed/laboratory/test/submit',
    method: 'post',
    data
  })
}

/**
 * 审核通过
 * @param {Object} data 包含dataId和auditOpinion
 * @returns Promise
 */
export const approveLabTest = (data) => {
  return request({
    url: '/seed/laboratory/test/approve',
    method: 'post',
    data
  })
}

/**
 * 审核退回
 * @param {Object} data 包含dataId和auditOpinion
 * @returns Promise
 */
export const rejectLabTest = (data) => {
  return request({
    url: '/seed/laboratory/test/reject',
    method: 'post',
    data
  })
}

/**
 * 归档
 * @param {Object} data 包含dataId
 * @returns Promise
 */
export const archiveLabTest = (data) => {
  return request({
    url: '/seed/laboratory/test/archive',
    method: 'post',
    data
  })
}

/**
 * 作废数据
 * @param {Object} data 包含dataId
 * @returns Promise
 */
export const cancelLabTest = (data) => {
  return request({
    url: '/seed/laboratory/test/cancel',
    method: 'post',
    data
  })
}

/**
 * 作废审核记录
 * @param {Object} data 包含dataId
 * @returns Promise
 */
export const cancelLabTestAudit = (data) => {
  return request({
    url: '/seed/laboratory/test/audit/cancel',
    method: 'post',
    data
  })
}

/**
 * 查询审核列表
 * @param {Object} data 查询条件
 * @returns Promise
 */
export const getLabTestAuditList = (data) => {
  return request({
    url: '/seed/laboratory/test/audit/list',
    method: 'post',
    data
  })
}
