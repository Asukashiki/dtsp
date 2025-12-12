import request from '../utils/agricultureRequest'

// ==================== 农资汇聚统计管理接口 ====================

/**
 * 查询农资汇聚统计列表（分页）
 * @param {Object} params - 查询参数
 * @returns {Promise}
 */
export const getInputSummaryList = (params) => {
  return request({
    url: '/demand/input/summary/list',
    method: 'get',
    params
  })
}

/**
 * 查询农资汇聚统计详情
 * @param {String} id - 汇聚统计记录ID
 * @returns {Promise}
 */
export const getInputSummaryDetail = (id) => {
  return request({
    url: `/demand/input/summary/${id}`,
    method: 'get'
  })
}

/**
 * 添加农资汇聚统计
 * @param {Object} data - 汇聚统计数据
 * @returns {Promise}
 */
export const addInputSummary = (data) => {
  return request({
    url: '/demand/input/summary',
    method: 'post',
    data
  })
}

/**
 * 更新农资汇聚统计
 * @param {Object} data - 汇聚统计数据
 * @returns {Promise}
 */
export const updateInputSummary = (data) => {
  return request({
    url: '/demand/input/summary/update',
    method: 'post',
    data
  })
}

/**
 * 删除农资汇聚统计
 * @param {String} id - 记录ID
 * @returns {Promise}
 */
export const deleteInputSummary = (id) => {
  return request({
    url: `/demand/input/summary/delete/${id}`,
    method: 'post'
  })
}

/**
 * 批量删除农资汇聚统计
 * @param {Array} ids - 记录ID列表
 * @returns {Promise}
 */
export const batchDeleteInputSummary = (ids) => {
  return request({
    url: '/demand/input/summary/batchDelete',
    method: 'post',
    data: ids
  })
}

// ==================== 农民需求管理接口 ====================

/**
 * 农资需求汇聚统计
 * @param {Object} data - 汇聚参数 { sourceCode, sourceName, targetCode, targetName }
 * @returns {Promise}
 */
// export const aggregateInputDemand = (data) => {
//   return request({
//     url: '/seed/demand/farmer/input/aggregation',
//     method: 'post',
//     data
//   })
// }
