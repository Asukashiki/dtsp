import request from '../utils/agricultureRequest'

/**
 * 获取许可列表(分页)
 * @param {Object} queryDTO - 查询条件
 * @returns {Promise}
 */
export const getLicenseList = (queryDTO) => {
  return request({
    url: '/seed/license/list',
    method: 'post',
    data: queryDTO
  })
}

/**
 * 根据ID获取许可详情(包含物种特性)
 * @param {String} id - 许可ID
 * @returns {Promise}
 */
export const getLicenseById = (id) => {
  return request({
    url: `/seed/license/getById/${id}`,
    method: 'get'
  })
}

/**
 * 根据批次ID获取许可详情
 * @param {String} batchId - 批次ID
 * @returns {Promise}
 */
export const getLicenseByBatchId = (batchId) => {
  return request({
    url: `/seed/license/getByBatchId/${batchId}`,
    method: 'get'
  })
}

/**
 * 新增许可(包含物种特性)
 * @param {Object} data - 许可信息
 * @returns {Promise}
 */
export const addLicense = (data) => {
  return request({
    url: '/seed/license/add',
    method: 'post',
    data
  })
}

/**
 * 修改许可(包含物种特性)
 * @param {Object} data - 许可信息
 * @returns {Promise}
 */
export const updateLicense = (data) => {
  return request({
    url: '/seed/license/update',
    method: 'put',
    data
  })
}

/**
 * 删除许可
 * @param {Array} ids - 许可ID数组
 * @returns {Promise}
 */
export const deleteLicense = (ids) => {
  return request({
    url: '/seed/license/delete',
    method: 'delete',
    data: ids
  })
}
