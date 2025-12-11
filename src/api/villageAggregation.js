import request from '../utils/agricultureRequest'

// ==================== 村级需求汇聚接口 ====================

/**
 * 新增村级需求汇聚年度主记录
 * @param {Object} data - 主表数据 { year, sourceCode, sourceName, targetCode, targetName, status, creator, subQuantity }
 * @returns {Promise}
 */
export const createVillageDemandSummaryMain = (data) => {
  return request({
    url: '/demand/input/summary/main',
    method: 'post',
    data,
  })
}

/**
 * 查询村级需求汇聚主表列表（分页）
 * @param {Object} params - 查询参数 { page, pageSize, ... }
 * @returns {Promise}
 */
export const getVillageDemandSummaryMainList = (params) => {
  return request({
    url: '/demand/input/summary/main/list',
    method: 'get',
    params,
  })
}

/**
 * 农资需求村级汇聚统计提交
 * @param {Object} data - 汇聚参数 { sourceCode, sourceName, targetCode, targetName, year, demandSummaryId }
 * @returns {Promise}
 */
export const aggregateVillageInputDemand = (data) => {
  return request({
    url: '/seed/demand/farmer/input/aggregation',
    method: 'post',
    data,
  })
}

/**
 * 查询村级需求汇聚明细
 * @param {Object} data - 查询参数 { sourceCode, year }
 * @returns {Promise}
 */
export const getVillageAggregationDetail = (data) => {
  return request({
    url: '/seed/demand/farmer/input/getAggregation',
    method: 'post',
    data,
  })
}

/**
 * 更新村级需求汇聚主表记录（用于更新状态等）
 * @param {Object} data - 更新数据 { id, status, ... }
 * @returns {Promise}
 */
export const updateVillageDemandSummaryMain = (data) => {
  return request({
    url: '/demand/input/summary/main/update',
    method: 'post',
    data,
  })
}
