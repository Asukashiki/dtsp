import request from '../utils/agricultureRequest'

/**
 * 查询产量数据列表
 * @param {Object} data 查询条件
 * @returns Promise
 */
export const getYieldDataList = (data) => {
  return request({
    url: '/seed/yield-data/list',
    method: 'post',
    data
  })
}

/**
 * 获取产量数据详情
 * @param {String} id 主键ID
 * @returns Promise
 */
export const getYieldDataDetail = (id) => {
  return request({
    url: `/seed/yield-data/${id}`,
    method: 'get'
  })
}

/**
 * 新增产量数据
 * @param {Object} data 产量数据
 * @returns Promise
 */
export const addYieldData = (data) => {
  return request({
    url: '/seed/yield-data/add',
    method: 'post',
    data
  })
}

/**
 * 修改产量数据
 * @param {Object} data 产量数据
 * @returns Promise
 */
export const updateYieldData = (data) => {
  return request({
    url: '/seed/yield-data/edit',
    method: 'post',
    data
  })
}

/**
 * 删除产量数据
 * @param {Array} ids 主键数组
 * @returns Promise
 */
export const deleteYieldData = (ids) => {
  return request({
    url: '/seed/yield-data/delete',
    method: 'post',
    data: ids
  })
}
