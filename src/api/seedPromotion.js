import request from '../utils/agricultureRequest'

// 根据环境判断使用的 API 基础 URL
const API_BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_APP_LOCAL_TEST_API_URL : ''

// ==================== 种子推广信息管理接口 ====================

/**
 * 查询推广内容列表
 * @param {Object} params - 查询参数
 * @param {String} params.enterpriseId - 企业ID（必填）
 * @param {String} params.title - 推广标题（可选，模糊查询）
 * @param {Number} params.pageNum - 页码（默认1）
 * @param {Number} params.pageSize - 每页数量（默认10）
 * @returns {Promise}
 */
export const getPromotionList = (params) => {
  return request({
    url: `${API_BASE_URL}/seed/promotion/list`,
    method: 'get',
    params
  })
}

/**
 * 上传推广内容（含链接生成）
 * @param {FormData} formData - 表单数据
 * formData包含字段：
 * - enterpriseId: 企业ID（必填）
 * - title: 推广标题（必填）
 * - videoFile: 视频文件（必填，仅支持MP4格式，≤100MB）
 * - promotionSummary: 推广摘要（可选）
 * - recommendedVarieties: 推荐品种（必填，多个品种用英文逗号分隔）
 * - validPeriod: 有效期天数（必填）
 * @returns {Promise}
 */
export const uploadPromotion = (formData) => {
  return request({
    url: `${API_BASE_URL}/seed/promotion/upload`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

/**
 * 访问次数更新（链接访问触发）
 * @param {String} promotionId - 推广ID（路径参数）
 * @returns {Promise}
 */
export const updateVisitCount = (promotionId) => {
  return request({
    url: `${API_BASE_URL}/seed/promotion/visit/${promotionId}`,
    method: 'post'
  })
}

/**
 * 删除推广内容
 * @param {String} promotionId - 推广ID
 * @returns {Promise}
 */
export const deletePromotion = (promotionId) => {
  return request({
    url: `${API_BASE_URL}/seed/promotion/delete/${promotionId}`,
    method: 'delete'
  })
}

/**
 * 查询推广内容详情
 * @param {String} promotionId - 推广ID
 * @returns {Promise}
 */
export const getPromotionDetail = (promotionId) => {
  return request({
    url: `${API_BASE_URL}/seed/promotion/${promotionId}`,
    method: 'get'
  })
}

// ==================== 种子品种公示查询接口 ====================

/**
 * 查询品种公示列表
 * @param {Object} params - 查询参数
 * @param {String} params.varietyName - 品种名称（可选，模糊查询）
 * @param {String} params.year - 发布年度（可选，4位数字）
 * @param {String} params.cropType - 作物类型（可选）
 * @param {Number} params.pageNum - 页码（默认1）
 * @param {Number} params.pageSize - 每页数量（默认10）
 * @returns {Promise}
 */
export const getVarietyPublicList = (params) => {
  return request({
    url: `${API_BASE_URL}/seed/variety/public/list`,
    method: 'get',
    params
  })
}

/**
 * 查询品种详情（公示）
 * @param {String} publishId - 品种发布ID（路径参数）
 * @returns {Promise}
 */
export const getVarietyPublicDetail = (publishId) => {
  return request({
    url: `${API_BASE_URL}/seed/variety/public/detail/${publishId}`,
    method: 'get'
  })
}

/**
 * 记录查询行为
 * @param {Object} data - 记录数据
 * @param {String} data.queryKeyword - 查询关键词
 * @param {String} data.ipAddress - IP地址
 * @param {Number} data.queryResultCount - 查询结果数量
 * @param {String} data.viewedPublishId - 查看的发布ID
 * @returns {Promise}
 */
export const recordQueryBehavior = (data) => {
  return request({
    url: `${API_BASE_URL}/seed/variety/public/record`,
    method: 'post',
    data
  })
}
