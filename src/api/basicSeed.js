import agricultureRequest from '../utils/agricultureRequest'

/**
 * 原种模块 API
 * Basic Seed Module API
 */

// ==================== Basic Seed 生产数据采集 ====================

/**
 * 查询生产数据列表
 * Query basic seed production list
 */
export const getBasicSeedProduceList = (params) => {
  return agricultureRequest({
    url: '/seed/basic/produce/list',
    method: 'get',
    params
  })
}

/**
 * 获取生产数据详情
 * Get basic seed production detail
 */
export const getBasicSeedProduceDetail = (produceBatchId) => {
  return agricultureRequest({
    url: `/seed/basic/produce/detail/${produceBatchId}`,
    method: 'get'
  })
}

/**
 * 新增生产数据
 * Add basic seed production
 */
export const addBasicSeedProduce = (data) => {
  return agricultureRequest({
    url: '/seed/basic/produce/add',
    method: 'post',
    data
  })
}

/**
 * 作废批次
 * Void production batch
 */
export const voidBasicSeedProduce = (produceBatchId) => {
  return agricultureRequest({
    url: `/seed/basic/produce/void/${produceBatchId}`,
    method: 'put'
  })
}

/**
 * 提交生产结果
 * Submit production result
 */
export const addBasicSeedProduceResult = (data) => {
  return agricultureRequest({
    url: '/seed/basic/produce/result/add',
    method: 'post',
    data
  })
}

/**
 * 查询生产结果列表
 * Get result list
 */
export const getBasicSeedProduceResultList = (query) => {
  return agricultureRequest({
    url: '/seed/basic/produce/result/list',
    method: 'get',
    params: query
  })
}

/**
 * 获取生产结果详情
 * Get result detail
 */
export const getBasicSeedProduceResult = (resultId) => {
  return agricultureRequest({
    url: '/seed/basic/produce/result/' + resultId,
    method: 'get'
  })
}
