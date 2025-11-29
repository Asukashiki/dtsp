import agricultureRequest from '../utils/agricultureRequest'
import request from '../utils/request'

// ==================== 繁殖种子认证申请 API ====================

/**
 * 分页查询繁殖种子认证申请列表
 * @param {Object} params - 查询参数
 * @param {string} params.applyOrgName - 申请机构名称(模糊查询)
 * @param {string} params.cropType - 作物类型
 * @param {string} params.varietyName - 品种名称(模糊查询)
 * @param {string} params.recordDate - 备案日期
 * @param {number} params.pageNum - 页码
 * @param {number} params.pageSize - 每页数量
 */
export const getBreedingCertificationPage = (params = {}) => {
  return agricultureRequest({
    url: '/seed/breeding/certification/page',
    method: 'post',
    params: {
      pageNum: params.pageNum || 1,
      pageSize: params.pageSize || 10
    },
    data: {
      applyOrgName: params.applyOrgName || '',
      cropType: params.cropType || '',
      varietyName: params.varietyName || '',
      recordDate: params.recordDate || ''
    }
  })
}

/**
 * 查询繁殖种子认证申请列表(不分页)
 * @param {Object} params - 查询参数
 */
export const getBreedingCertificationList = (params = {}) => {
  return agricultureRequest({
    url: '/seed/breeding/certification/list',
    method: 'post',
    data: {
      applyOrgName: params.applyOrgName || '',
      cropType: params.cropType || '',
      varietyName: params.varietyName || '',
      recordDate: params.recordDate || ''
    }
  })
}

/**
 * 获取繁殖种子认证申请详情
 * @param {string} dataId - 数据ID
 */
export const getBreedingCertificationDetail = (dataId) => {
  return agricultureRequest({
    url: `/seed/breeding/certification/detail/${dataId}`,
    method: 'get'
  })
}

/**
 * 新增繁殖种子认证申请
 * @param {Object} data - 认证申请数据
 */
export const addBreedingCertification = (data) => {
  return agricultureRequest({
    url: '/seed/breeding/certification/add',
    method: 'post',
    data: data
  })
}

/**
 * 修改繁殖种子认证申请
 * @param {Object} data - 认证申请数据(包含dataId)
 */
export const updateBreedingCertification = (data) => {
  return agricultureRequest({
    url: '/seed/breeding/certification/update',
    method: 'post',
    data: data
  })
}

/**
 * 删除繁殖种子认证申请
 * @param {Array} dataIds - 数据ID数组
 */
export const deleteBreedingCertification = (dataIds) => {
  return agricultureRequest({
    url: '/seed/breeding/certification/delete',
    method: 'post',
    data: dataIds
  })
}

/**
 * 文件上传
 * @param {FormData} formData - 包含文件的 FormData
 */
export const uploadFile = (formData) => {
  return request({
    url: '/doc/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}
