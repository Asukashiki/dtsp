import agricultureRequest from '../utils/agricultureRequest'

// ==================== 库存管理 API ====================

/**
 * 查询库存列表
 * @param {Object} params - 查询参数
 * @param {string} params.warehouseId - 仓库ID
 * @param {string} params.materialId - 投入品ID
 * @param {string} params.materialBatchId - 投入品批次ID
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 */
export const getStockList = (params = {}) => {
  return agricultureRequest({
    url: '/inventory/stock/query',
    method: 'get',
    params: {
      page: params.page || 1,
      pageSize: params.pageSize || 20,
      warehouseId: params.warehouseId || '',
    }
  })
}

/**
 * 查询库存变动日志
 * @param {Object} params - 查询参数
 * @param {string} params.warehouseId - 仓库ID
 * @param {string} params.materialId - 投入品ID
 * @param {string} params.operationType - 操作类型 (inbound/outbound)
 * @param {string} params.startDate - 开始日期
 * @param {string} params.endDate - 结束日期
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 */
export const getStockLogs = (params = {}) => {
  return agricultureRequest({
    url: '/stock/logs',
    method: 'get',
    params: {
      warehouseId: params.warehouseId || '',
      materialId: params.materialId || '',
      operationType: params.operationType || '',
      startDate: params.startDate || '',
      endDate: params.endDate || '',
      page: params.page || 1,
      pageSize: params.pageSize || 20
    }
  })
}

/**
 * 检查仓库容量
 * @param {string} warehouseId - 仓库ID
 */
export const getWarehouseCapacity = (warehouseId) => {
  return agricultureRequest({
    url: `/warehouse/${warehouseId}/capacity`,
    method: 'get'
  })
}

/**
 * 获取库存监控仪表盘数据
 */
export const getStockDashboard = () => {
  return agricultureRequest({
    url: '/stock/dashboard',
    method: 'get'
  })
}
