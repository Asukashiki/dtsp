import agricultureRequest from '../utils/agricultureRequest'

/**
 * 批次管理 API
 */

/**
 * 查询可用批次列表
 * @param {Object} params - 查询参数
 */
export const getBatchList = (params) => {
  return agricultureRequest({
    url: '/inventory/batch/list',
    method: 'get',
    params
  })
}

/**
 * 生成批次号
 * @param {Object} params - 参数
 */
export const generateBatch = (params) => {
  return agricultureRequest({
    url: '/inventory/batch/generate',
    method: 'post',
    params
  })
}

/**
 * 生成二维码
 * @param {Object} params - 参数
 */
export const generateQRCode = (params) => {
  return agricultureRequest({
    url: '/inventory/batch/qrcode/generate',
    method: 'post',
    params
  })
}

/**
 * 解析二维码
 * @param {string} qrCode - 二维码字符串
 */
export const parseQRCode = (qrCode) => {
  return agricultureRequest({
    url: '/inventory/batch/qrcode/parse',
    method: 'get',
    params: { qrCode }
  })
}

/**
 * 校验批次是否有效
 * @param {Object} params - 参数
 */
export const validateBatch = (params) => {
  return agricultureRequest({
    url: '/inventory/batch/validate',
    method: 'get',
    params
  })
}

/**
 * 查询批次追溯信息
 * @param {string} materialBatchId - 批次ID
 */
export const getBatchTrace = (materialBatchId) => {
  return agricultureRequest({
    url: '/inventory/batch/trace',
    method: 'get',
    params: { materialBatchId }
  })
}

/**
 * 根据批次ID查询批次信息
 * @param {string} materialBatchId - 批次ID
 */
export const getBatchInfo = (materialBatchId) => {
  return agricultureRequest({
    url: `/inventory/batch/${materialBatchId}`,
    method: 'get'
  })
}

/**
 * 批量生成批次号
 * @param {Object} params - 参数
 */
export const generateBatchBulk = (params) => {
  return agricultureRequest({
    url: '/inventory/batch/generate/batch',
    method: 'post',
    params
  })
}
