import agricultureRequest from '../utils/agricultureRequest'

/**
 * C1种子繁殖申请模块 API
 * C1 Seed Propagation Application Module API
 */

// ==================== 申请相关接口 ====================

/**
 * 查询申请列表（分页）
 * Query propagation application list
 */
export const getC1PropagationList = (data) => {
  return agricultureRequest({
    url: '/seed/c1-propagation/list',
    method: 'post',
    data
  })
}

/**
 * 获取申请详情
 * Get propagation application detail
 */
export const getC1PropagationById = (id) => {
  return agricultureRequest({
    url: `/seed/c1-propagation/getById/${id}`,
    method: 'get'
  })
}

/**
 * 新增申请
 * Add propagation application
 */
export const addC1Propagation = (data) => {
  return agricultureRequest({
    url: '/seed/c1-propagation/add',
    method: 'post',
    data
  })
}

/**
 * 修改申请
 * Update propagation application
 */
export const updateC1Propagation = (data) => {
  return agricultureRequest({
    url: '/seed/c1-propagation/update',
    method: 'post',
    data
  })
}

/**
 * 删除申请
 * Delete propagation application
 */
export const deleteC1Propagation = (ids) => {
  return agricultureRequest({
    url: '/seed/c1-propagation/delete',
    method: 'post',
    data: ids
  })
}

// ==================== 审核相关接口 ====================

/**
 * 查询待审核列表（分页）
 * Query pending audit list
 */
export const getC1PropagationPendingList = (data) => {
  return agricultureRequest({
    url: '/seed/c1-propagation-audit/list',
    method: 'post',
    data
  })
}

/**
 * 查询所有申请列表（分页）
 * Query all application list
 */
export const getC1PropagationAllList = (data) => {
  return agricultureRequest({
    url: '/seed/c1-propagation-audit/all-list',
    method: 'post',
    data
  })
}

/**
 * 获取审核详情
 * Get audit detail
 */
export const getC1PropagationAuditById = (id) => {
  return agricultureRequest({
    url: `/seed/c1-propagation-audit/getById/${id}`,
    method: 'get'
  })
}

/**
 * 提交审核
 * Submit audit
 */
export const auditC1Propagation = (data) => {
  return agricultureRequest({
    url: '/seed/c1-propagation-audit/audit',
    method: 'post',
    data
  })
}

// ==================== 种子选择相关接口 ====================

/**
 * 获取可用的Basic种子列表
 * 聚合OSE接收确认和批次采集两个数据源
 * Get available Basic seed list
 * Aggregates OSE receive confirm and batch collection data sources
 */
export const getAvailableBasicSeeds = (data) => {
  return agricultureRequest({
    url: '/seed/c1-propagation/available-seeds',
    method: 'post',
    data
  })
}

/**
 * 获取指定批次的可用数量
 * Get available quantity for specific batch
 */
export const getAvailableQuantity = (batchId, sourceType) => {
  return agricultureRequest({
    url: `/seed/c1-propagation/available-quantity/${batchId}`,
    method: 'get',
    params: { sourceType }
  })
}
