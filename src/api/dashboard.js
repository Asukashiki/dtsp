import agricultureRequest from '../utils/agricultureRequest'

/**
 * 大屏展示模块API
 */

// 获取总览数据
export const getOverview = () => {
  return agricultureRequest({
    url: '/dashboard/overview',
    method: 'get'
  })
}

// 获取供应商TOP榜单
export const getTopSuppliers = (limit = 10) => {
  return agricultureRequest({
    url: '/dashboard/top-suppliers',
    method: 'get',
    params: { limit }
  })
}

// 获取仓库统计数据
export const getWarehouseStats = () => {
  return agricultureRequest({
    url: '/dashboard/warehouse-stats',
    method: 'get'
  })
}

// 获取入库出库趋势
export const getStockTrend = (days = 7) => {
  return agricultureRequest({
    url: '/dashboard/stock-trend',
    method: 'get',
    params: { days }
  })
}

// 获取投入品类型分布
export const getInputTypeDistribution = () => {
  return agricultureRequest({
    url: '/dashboard/input-type-distribution',
    method: 'get'
  })
}

// 获取预警信息列表
export const getWarnings = (limit = 20) => {
  return agricultureRequest({
    url: '/dashboard/warnings',
    method: 'get',
    params: { limit }
  })
}

// 获取今日出入库列表
export const getTodayStock = () => {
  return agricultureRequest({
    url: '/dashboard/today-stock',
    method: 'get'
  })
}

// 获取即将过期列表
export const getExpiringSoon = (limit = 20) => {
  return agricultureRequest({
    url: '/dashboard/expiring-soon',
    method: 'get',
    params: { limit }
  })
}

// 获取库存状态分布
export const getStockStatusDistribution = () => {
  return agricultureRequest({
    url: '/dashboard/stock-status-distribution',
    method: 'get'
  })
}
