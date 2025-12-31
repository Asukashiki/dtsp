import agricultureRequest from '../utils/agricultureRequest'

/**
 * 原原种模块 API
 * Pre-basic Seed Module API
 */

// ==================== Pre-basic Seed 生产数据采集 ====================

/**
 * 查询生产数据列表
 * Query pre-basic seed production list
 */
export const getPrebasicSeedProduceList = (params) => {
  return agricultureRequest({
    url: '/seed/prebasic/produce/list',
    method: 'get',
    params
  })
}

/**
 * 获取生产数据详情
 * Get pre-basic seed production detail
 */
export const getPrebasicSeedProduceDetail = (produceBatchId) => {
  return agricultureRequest({
    url: `/seed/prebasic/produce/detail/${produceBatchId}`,
    method: 'get'
  })
}

/**
 * 新增生产数据
 * Add pre-basic seed production
 */
export const addPrebasicSeedProduce = (data) => {
  return agricultureRequest({
    url: '/seed/prebasic/produce/add',
    method: 'post',
    data
  })
}

/**
 * 作废批次
 * Void production batch
 */
export const voidPrebasicSeedProduce = (produceBatchId) => {
  return agricultureRequest({
    url: `/seed/prebasic/produce/void/${produceBatchId}`,
    method: 'put'
  })
}

/**
 * 提交生产结果
 * Submit production result
 */
export const addPrebasicSeedProduceResult = (data) => {
  return agricultureRequest({
    url: '/seed/prebasic/produce/result/add',
    method: 'post',
    data
  })
}

/**
 * 查询生产结果列表
 * Get result list
 */
export const getPrebasicSeedProduceResultList = (query) => {
  return agricultureRequest({
    url: '/seed/prebasic/produce/result/list',
    method: 'get',
    params: query
  })
}

/**
 * 获取生产结果详情
 * Get result detail
 */
export const getPrebasicSeedProduceResult = (resultId) => {
  return agricultureRequest({
    url: '/seed/prebasic/produce/result/' + resultId,
    method: 'get'
  })
}
