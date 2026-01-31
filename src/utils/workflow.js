/**
 * 获取工作流状态对应的类型
 * @param {string} workflowStatus 工作流状态
 * @returns {string} 状态类型 (info, warning, primary, danger)
 */
export const getWorkflowStatusType = (workflowStatus) => {
  const workflowStatusMap = {
    'S0': 'info',      // 草稿 - 灰色
    'S1': 'warning',   // 待审批 - 橙色
    'S2': 'primary',   // 审核通过 - 蓝色
    'S3': 'danger',    // 审核驳回 - 红色  
    'S9': 'danger',    // 已作废 - 深红色
    'S10': 'danger',   // 异常 - 深红色
    // Common text statuses
    'pending': 'warning',
    'approved': 'success',
    'rejected': 'danger',
    'Ongoing': 'info',
    'Finished': 'success'
  }
  return workflowStatusMap[workflowStatus] || 'info'
}
