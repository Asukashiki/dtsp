import agricultureRequest from '../utils/agricultureRequest'

// ==================== 分发单管理 API ====================

/**
 * 获取分发单下拉列表（用于入库单关联）
 * 包含 OSE→Union 和 Union→Woreda 类型的分发单
 */
export const getDistributionList = () => {
  return agricultureRequest({
    url: '/invested/distribution/list',
    method: 'get'
  })
}

/**
 * 获取分发单详情（包含明细行项）
 * @param {string} id - 分发单主表ID
 */
export const getDistributionDetail = (id) => {
  return agricultureRequest({
    url: `/invested/distribution/detail/${id}`,
    method: 'get'
  })
}
