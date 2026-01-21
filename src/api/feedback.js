import agricultureRequest from '../utils/agricultureRequest'

// ==================== 反馈管理 API ====================

/**
 * 查询反馈列表
 * @param {Object} params - 查询参数
 * @param {number} params.pageNum - 页码，默认1
 * @param {number} params.pageSize - 每页数量，默认10
 * @param {string} params.feedbackType - 反馈类型(0-投诉/1-建议/2-咨询/3-故障报告/4-其他)
 * @param {string} params.status - 状态(0-待处理/1-处理中/2-已完成/3-已关闭)
 * @param {string} params.priority - 优先级(0-低/1-中/2-高/3-紧急)
 * @param {string} params.handlerId - 处理人ID
 * @param {string} params.keyword - 关键词(搜索标题、内容、反馈编号)
 * @param {string} params.startTime - 开始时间(格式: yyyy-MM-dd HH:mm:ss)
 * @param {string} params.endTime - 结束时间(格式: yyyy-MM-dd HH:mm:ss)
 */
export const getFeedbackList = (params = {}) => {
  const requestParams = {
    pageNum: params.pageNum || params.page || 1,
    pageSize: params.pageSize || 10
  }

  if (params.feedbackType !== undefined && params.feedbackType !== null && params.feedbackType !== '') {
    requestParams.feedbackType = params.feedbackType
  }
  if (params.status !== undefined && params.status !== null && params.status !== '') {
    requestParams.status = params.status
  }
  if (params.priority !== undefined && params.priority !== null && params.priority !== '') {
    requestParams.priority = params.priority
  }
  if (params.handlerId) requestParams.handlerId = params.handlerId
  if (params.keyword || params.contentKeyword) requestParams.contentKeyword = params.keyword || params.contentKeyword
  if (params.startTime) requestParams.startTime = params.startTime
  if (params.endTime) requestParams.endTime = params.endTime

  return agricultureRequest({
    url: '/feedback/list',
    method: 'get',
    params: requestParams
  })
}

/**
 * 获取反馈详情
 * @param {number} feedbackId - 反馈ID
 */
export const getFeedbackDetail = (feedbackId) => {
  return agricultureRequest({
    url: `/feedback/${feedbackId}`,
    method: 'get'
  })
}

/**
 * 提交反馈
 * @param {Object} data - 反馈数据
 * @param {string} data.feedbackType - 反馈类型(0-投诉/1-建议/2-咨询/3-故障报告/4-其他)
 * @param {string} data.title - 反馈标题(最大200字符)
 * @param {string} data.content - 反馈内容
 * @param {string} data.inputName - 投入品名称
 * @param {string} data.supplierName - 供应商名称
 * @param {string} data.contactName - 联系人姓名(最大100字符)
 * @param {string} data.contactPhone - 联系电话(最大20字符)
 * @param {string} data.contactEmail - 联系邮箱(最大100字符)
 * @param {string} data.priority - 优先级(0-低/1-中/2-高/3-紧急)，默认0
 * @param {string} data.remark - 备注(最大500字符)
 */
export const submitFeedback = (data) => {
  return agricultureRequest({
    url: '/feedback',
    method: 'post',
    data
  })
}

/**
 * 修改反馈
 * @param {Object} data - 反馈数据
 * @param {number} data.feedbackId - 反馈ID
 * @param {string} data.feedbackType - 反馈类型
 * @param {string} data.title - 反馈标题
 * @param {string} data.content - 反馈内容
 * @param {string} data.inputName - 投入品名称
 * @param {string} data.supplierName - 供应商名称
 * @param {string} data.attachments - 附件
 * @param {string} data.contactName - 联系人姓名
 * @param {string} data.contactPhone - 联系电话
 * @param {string} data.contactEmail - 联系邮箱
 * @param {string} data.priority - 优先级
 * @param {string} data.remark - 备注
 */
export const updateFeedback = (data) => {
  return agricultureRequest({
    url: '/feedback',
    method: 'put',
    data
  })
}

/**
 * 删除反馈
 * @param {number} feedbackId - 反馈ID
 */
export const deleteFeedback = (feedbackId) => {
  return agricultureRequest({
    url: `/feedback/${feedbackId}`,
    method: 'delete'
  })
}

/**
 * 批量删除反馈
 * @param {Array<number>} feedbackIds - 反馈ID数组
 */
export const batchDeleteFeedback = (feedbackIds) => {
  return agricultureRequest({
    url: `/feedback/batch/${feedbackIds.join(',')}`,
    method: 'delete'
  })
}

/**
 * 添加反馈回复
 * @param {Object} data - 回复数据
 * @param {number} data.feedbackId - 反馈ID
 * @param {string} data.content - 回复内容
 * @param {string} data.attachments - 附件(逗号分隔)
 */
export const addFeedbackReply = (data) => {
  return agricultureRequest({
    url: '/feedback/reply',
    method: 'post',
    data
  })
}
