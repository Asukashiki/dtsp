import agricultureRequest from '../utils/agricultureRequest'

/**
 * 入库管理 API
 */

/**
 * 查询入库单列表
 * @param {Object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 * @param {string} params.inboundStatus - 入库状态
 * @param {string} params.inboundType - 入库类型
 * @param {string} params.inboundOrderId - 入库单ID
 * @param {string} params.warehouseId - 仓库ID
 * @param {string} params.startDate - 开始日期
 * @param {string} params.endDate - 结束日期
 */
export const getInboundOrderList = (params) => {
  return agricultureRequest({
    url: '/inventory/inbound/orders',
    method: 'get',
    params
  })
}

/**
 * 获取入库单详情
 * @param {string} inboundOrderId - 入库单ID
 */
export const getInboundOrderDetail = (inboundOrderId) => {
  return agricultureRequest({
    url: `/inventory/inbound/orders/${inboundOrderId}`,
    method: 'get'
  })
}

/**
 * 创建入库单
 * @param {Object} data - 入库单数据
 */
export const createInboundOrder = (data) => {
  return agricultureRequest({
    url: '/inventory/inbound/orders',
    method: 'post',
    data
  })
}

/**
 * 审核入库单
 * @param {string} inboundOrderId - 入库单ID
 * @param {Object} data - 审核数据
 */
export const auditInboundOrder = (inboundOrderId, data) => {
  return agricultureRequest({
    url: `/inventory/inbound/orders/${inboundOrderId}/audit`,
    method: 'put',
    data
  })
}

/**
 * 执行入库（入库确认）
 * @param {string} inboundOrderId - 入库单ID
 * @param {Object} data - 入库数据
 */
export const confirmInbound = (inboundOrderId, data) => {
  return agricultureRequest({
    url: `/inventory/inbound/orders/${inboundOrderId}/confirm`,
    method: 'put',
    data
  })
}

/**
 * 取消入库单
 * @param {string} inboundOrderId - 入库单ID
 * @param {string} operator - 操作人
 */
export const cancelInboundOrder = (inboundOrderId, operator) => {
  return agricultureRequest({
    url: `/inventory/inbound/orders/${inboundOrderId}/cancel`,
    method: 'put',
    params: { operator }
  })
}

/**
 * 统计入库单数量
 * @param {string} warehouseId - 仓库ID
 */
export const getInboundOrderCount = (warehouseId) => {
  return agricultureRequest({
    url: '/inventory/inbound/orders/count',
    method: 'get',
    params: { warehouseId }
  })
}

/**
 * 查询待审核入库单数量
 * @param {string} warehouseId - 仓库ID
 */
export const getPendingInboundCount = (warehouseId) => {
  return agricultureRequest({
    url: '/inventory/inbound/orders/pending/count',
    method: 'get',
    params: { warehouseId }
  })
}

/**
 * 按状态统计入库单
 * @param {string} warehouseId - 仓库ID
 */
export const getInboundStatsByStatus = (warehouseId) => {
  return agricultureRequest({
    url: '/inventory/inbound/orders/stats/status',
    method: 'get',
    params: { warehouseId }
  })
}

/**
 * 按入库类型统计
 * @param {Object} params - 查询参数
 */
export const getInboundStatsByType = (params) => {
  return agricultureRequest({
    url: '/inventory/inbound/orders/stats/type',
    method: 'get',
    params
  })
}
