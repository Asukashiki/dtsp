import request from '../utils/agricultureRequest'

/**
 * 查询实验室测试数据列表
 * @param {Object} data 查询条件
 * @returns Promise
 */
export const getLabTestList = (data) => {
  return request({
    url: '/seed/lab-test/list',
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
    url: `/seed/lab-test/${id}`,
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
    url: '/seed/lab-test/add',
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
    url: '/seed/lab-test/edit',
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
    url: '/seed/lab-test/delete',
    method: 'post',
    data: ids
  })
}
