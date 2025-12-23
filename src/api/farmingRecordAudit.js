import agricultureRequest from '../utils/agricultureRequest'

/**
 * 农事记录数据采集审核 API
 * Farming Record Data Collection Audit API
 */

// ==================== 农事记录审核管理 ====================

/**
 * 查询待审核的农事记录数据列表
 * Query pending audit farming record list
 */
export const getPendingAuditList = (data) => {
  return agricultureRequest({
    url: '/seed/farming/record/audit/pending/list',
    method: 'post',
    data
  })
}

/**
 * 查询所有状态的农事记录数据列表
 * Query all status farming record list
 */
export const getAllStatusList = (data) => {
  return agricultureRequest({
    url: '/seed/farming/record/audit/all/list',
    method: 'post',
    data
  })
}

/**
 * 获取农事记录审核详情
 * Get farming record audit detail
 */
export const getFarmingRecordAuditDetail = (farmingId) => {
  return agricultureRequest({
    url: `/seed/farming/record/audit/${farmingId}`,
    method: 'get'
  })
}

/**
 * 审核农事记录数据
 * Audit farming record data
 */
export const auditFarmingRecord = (data) => {
  return agricultureRequest({
    url: '/seed/farming/record/audit/audit',
    method: 'post',
    data
  })
}

/**
 * 作废农事记录数据
 * Cancel farming record data
 */
export const cancelFarmingRecord = (farmingId) => {
  return agricultureRequest({
    url: `/seed/farming/record/audit/cancel/${farmingId}`,
    method: 'post'
  })
}

// ==================== 工作流状态字典 ====================

/**
 * 获取工作流状态字典
 * Get workflow status dictionary
 */
export const getWorkflowStatusDict = () => {
  return {
    'S1': '待审批',
    'S2': '已审批', 
    'S3': '已退回',
    'S10': '作废'
  }
}

/**
 * 获取工作流状态标签类型
 * Get workflow status tag type
 */
export const getWorkflowStatusTagType = (status) => {
  const typeMap = {
    'S1': 'warning',   // 待审批 - 橙色
    'S2': 'success',   // 已审批 - 绿色
    'S3': 'danger',    // 已退回 - 红色
    'S10': 'info'      // 作废 - 灰色
  }
  return typeMap[status] || 'info'
}