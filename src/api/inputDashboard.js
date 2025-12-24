import agricultureRequest from '../utils/agricultureRequest'

/**
 * 农业投入品大屏 API
 * Input Dashboard API
 */

/**
 * 获取概览统计数据
 * @param {string} year - 年份（可选）
 */
export const getDashboardOverview = (year) => {
  return agricultureRequest({
    url: '/input/dashboard/overview',
    method: 'get',
    params: { year }
  })
}

/**
 * 获取需求汇聚统计
 * @param {string} year - 年份（可选）
 * @param {string} groupBy - 分组方式: type/region
 */
export const getDemandSummary = (year, groupBy = 'type') => {
  return agricultureRequest({
    url: '/input/dashboard/demand-summary',
    method: 'get',
    params: { year, groupBy }
  })
}

/**
 * 获取分配进度数据
 * @param {string} year - 年份（可选）
 */
export const getAllocationProgress = (year) => {
  return agricultureRequest({
    url: '/input/dashboard/allocation-progress',
    method: 'get',
    params: { year }
  })
}

/**
 * 获取流通状态数据
 * @param {string} year - 年份（可选）
 */
export const getCirculationStatus = (year) => {
  return agricultureRequest({
    url: '/input/dashboard/circulation-status',
    method: 'get',
    params: { year }
  })
}

/**
 * 获取供应商排行
 * @param {number} limit - 数量限制，默认10
 */
export const getTopSuppliers = (limit = 10) => {
  return agricultureRequest({
    url: '/input/dashboard/top-suppliers',
    method: 'get',
    params: { limit }
  })
}

/**
 * 获取最新动态
 * @param {number} limit - 数量限制，默认20
 */
export const getRecentActivities = (limit = 20) => {
  return agricultureRequest({
    url: '/input/dashboard/recent-activities',
    method: 'get',
    params: { limit }
  })
}

/**
 * 一次性获取所有大屏数据
 * @param {string} year - 年份（可选）
 */
export const getAllDashboardData = (year) => {
  return agricultureRequest({
    url: '/input/dashboard/all',
    method: 'get',
    params: { year }
  })
}
