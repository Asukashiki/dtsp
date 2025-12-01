import request from '../utils/agricultureRequest'

/**
 * 查询育种数据集列表
 * @param {Object} data 查询参数
 * @returns Promise
 */
export const getDatasetList = (data) => {
  return request({
    url: '/seed/dataset/list',
    method: 'post',
    data
  })
}

/**
 * 根据ID查询育种数据集详情
 * @param {String} id 数据集ID
 * @returns Promise
 */
export const getDatasetById = (id) => {
  return request({
    url: `/seed/dataset/getById/${id}`,
    method: 'get'
  })
}

/**
 * 新增育种数据集
 * @param {Object} data 数据集信息
 * @returns Promise
 */
export const addDataset = (data) => {
  return request({
    url: '/seed/dataset/add',
    method: 'post',
    data
  })
}

/**
 * 修改育种数据集
 * @param {Object} data 数据集信息
 * @returns Promise
 */
export const updateDataset = (data) => {
  return request({
    url: '/seed/dataset/update',
    method: 'post',
    data
  })
}

/**
 * 删除育种数据集
 * @param {Array} ids 数据集ID数组
 * @returns Promise
 */
export const deleteDataset = (ids) => {
  return request({
    url: '/seed/dataset/delete',
    method: 'post',
    data: ids
  })
}

/**
 * 提交审核
 * @param {String} id 数据集ID
 * @returns Promise
 */
export const submitDataset = (id) => {
  return request({
    url: `/seed/dataset/submit/${id}`,
    method: 'post'
  })
}

/**
 * 统计数据集各项数据记录数
 * @param {String} batchId 育种批次ID
 * @returns Promise
 */
export const statisticsData = (batchId) => {
  return request({
    url: `/seed/dataset/statistics/${batchId}`,
    method: 'get'
  })
}
