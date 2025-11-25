import agricultureRequest from '../utils/agricultureRequest'


// ==================== 用户相关接口 ====================

/**
 * 获取用户信息
 * @param {Number} userId - 用户ID
 */
export const getUserInfo = (userId) => {
  return agricultureRequest({
    url: `/api/user/${userId}`,
    method: 'get',
  })
}

/**
 * 更新用户信息
 * @param {Object} data - 用户信息
 */
export const updateUserInfo = (data) => {
  return agricultureRequest({
   url: '/api/user/update',
    method: 'post',
    data,
  })
}

/**
 * 修改密码
 * @param {Number} userId - 用户ID
 * @param {String} newPassword - 新密码
 */
export const updatePassword = (userId, newPassword) => {
  return agricultureRequest({
    url: `/api/user/${userId}/password`,
    method: 'post',
    data: { newPassword },
  })
}

// ==================== 土地信息相关接口 ====================

/**
 * 查询土地信息列表(分页)
 * @param {Object} params - 查询参数
 * @param {String} params.landName - 地块名称(模糊查询)
 * @param {String} params.landType - 地块类型
 * @param {String} params.currentStatus - 当前状态
 * @param {String} params.adCode - 行政区划代码(模糊查询)
 * @param {String} params.farmerUserId - 所属农民用户ID
 * @param {String} params.keyword - 关键词搜索(会覆盖landName)
 * @param {Number} params.page - 页码,默认1
 * @param {Number} params.pageSize - 每页数量,默认10
 */
export const getLandList = (params) => {
  return agricultureRequest({
    url: '/api/land/list',
    method: 'get',
    params,
  })
}

/**
 * 根据用户ID获取土地列表
 * @param {Number} userId - 用户ID
 */
export const getLandListByUser = (userId) => {
  return agricultureRequest({
    url: `/api/land/user/${userId}`,
    method: 'get',
  })
}

/**
 * 添加土地信息
 * @param {Object} data - 土地信息
 */
export const addLand = (data) => {
  return agricultureRequest({
   url: '/api/land/add',
    method: 'post',
    data,
  })
}

/**
 * 更新土地信息
 * @param {Object} data - 土地信息
 */
export const updateLand = (data) => {
  return agricultureRequest({
   url: '/api/land/update',
    method: 'post',
    data,
  })
}

/**
 * 删除土地信息
 * @param {Number} landId - 土地ID
 */
export const deleteLand = (landId) => {
  return agricultureRequest({
    url: `/api/land/delete/${landId}`,
    method: 'post',
  })
}

// ==================== 农民认证相关接口 ====================

/**
 * 根据用户ID查询认证状态
 * @param {Number} userId - 用户ID
 */
export const getFarmerCertByUser = (userId) => {
  return agricultureRequest({
    url: `/api/farmer/certification/user/${userId}`,
    method: 'get',
  })
}

/**
 * 提交农民认证申请
 * @param {Object} data - 认证申请信息
 */
export const submitFarmerCert = (data) => {
  return agricultureRequest({
   url: '/api/farmer/certification/apply',
    method: 'post',
    data,
  })
}

/**
 * 获取待审批列表
 */
export const getPendingFarmerCerts = () => {
  return agricultureRequest({
   url: '/api/farmer/certification/pending',
    method: 'get',
  })
}

/**
 * 审批通过
 * @param {Number} certId - 认证ID
 * @param {Number} approverId - 审批人ID
 */
export const approveFarmerCert = (certId, approverId) => {
  return agricultureRequest({
    url: `/api/farmer/certification/${certId}/approve`,
    method: 'post',
    params: { approverId },
  })
}

/**
 * 审批驳回
 * @param {Number} certId - 认证ID
 * @param {Number} approverId - 审批人ID
 * @param {String} rejectReason - 驳回原因
 */
export const rejectFarmerCert = (certId, approverId, rejectReason) => {
  return agricultureRequest({
    url: `/api/farmer/certification/${certId}/reject`,
    method: 'post',
    params: { approverId },
    data: { rejectReason },
  })
}
