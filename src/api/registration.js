import request from '../utils/agricultureRequest'


// ==================== Union/Cooperative注册管理 API ====================

/**
 * 新增注册申请
 * @param {Object} data - 注册申请数据
 */
export const addRegistration = (data) => {
  return request({
    url: '/seed/registration/add',
    method: 'post',
    data
  })
}

/**
 * 更新注册申请
 * @param {Object} data - 注册申请数据
 */
export const updateRegistration = (data) => {
  return request({
    url: '/seed/registration/update',
    method: 'post',
    data
  })
}

/**
 * 提交注册申请
 * @param {string} id - 机构ID
 * @param {number} version - 版本号
 */
export const submitRegistration = (id, version) => {
  return request({
    url: '/seed/registration/submit',
    method: 'post',
    data: { id, version }
  })
}

/**
 * 获取注册申请详情
 * @param {string} id - 机构ID
 */
export const getRegistrationDetail = (id) => {
  return request({
    url: '/seed/registration/detail',
    method: 'get',
    params: { id }
  })
}

/**
 * 分页查询注册申请列表
 * @param {Object} params - 查询参数
 * @param {number} params.pageNum - 页码
 * @param {number} params.pageSize - 每页数量
 * @param {string} params.enterpriseName - 机构名称(模糊查询)
 * @param {string} params.orgType - 机构类型(union/cooperative)
 * @param {string} params.applicationStatus - 申请状态
 * @param {string} params.inputTypes - 投入品类型
 * @param {string} params.woreda - Woreda
 * @param {string} params.zone - Zone
 * @param {string} params.createdTimeStart - 创建时间开始
 * @param {string} params.createdTimeEnd - 创建时间结束
 */
export const getRegistrationPage = (params) => {
  return request({
    url: '/seed/registration/page',
    method: 'post',
    data: params
  })
}

/**
 * 删除注册申请
 * @param {string} id - 机构ID
 */
export const deleteRegistration = (id) => {
  return request({
    url: '/seed/registration/delete',
    method: 'post',
    params: { id }
  })
}

// ==================== 注册审核 API ====================

/**
 * 分页查询待审核列表
 * @param {Object} params - 查询参数
 * @param {number} params.pageNum - 页码
 * @param {number} params.pageSize - 每页数量
 * @param {string} params.enterpriseName - 机构名称(模糊查询)
 * @param {string} params.orgType - 机构类型
 * @param {string} params.createdTimeStart - 申请时间开始
 * @param {string} params.createdTimeEnd - 申请时间结束
 */
export const getRegistrationAuditPage = (params) => {
  return request({
    url: '/seed/registration/audit/page',
    method: 'post',
    data: params
  })
}

/**
 * 审核通过
 * @param {string} id - 机构ID
 * @param {number} version - 版本号
 * @param {string} remark - 备注
 */
export const approveRegistration = (id, version, remark) => {
  return request({
    url: '/seed/registration/audit/approve',
    method: 'post',
    data: { id, version, remark }
  })
}

/**
 * 审核驳回
 * @param {string} id - 机构ID
 * @param {number} version - 版本号
 * @param {string} auditOpinion - 审核意见
 * @param {string} remark - 备注
 */
export const rejectRegistration = (id, version, auditOpinion, remark) => {
  return request({
    url: '/seed/registration/audit/reject',
    method: 'post',
    data: { id, version, auditOpinion, remark }
  })
}

/**
 * 查询审核记录列表
 * @param {string} enterpriseId - 机构ID
 */
export const getAuditRecordList = (enterpriseId) => {
  return request({
    url: '/seed/registration/audit/list',
    method: 'get',
    params: { enterpriseId }
  })
}
