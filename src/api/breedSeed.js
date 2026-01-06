import agricultureRequest from '../utils/agricultureRequest'

/**
 * 育种家种子模块 API
 * Breeder Seed Module API
 */

// ==================== Breeder Seed 生产数据采集 ====================

/**
 * 查询生产数据列表
 * Query breeder seed production list
 */
export const getBreedSeedProduceList = (params) => {
  return agricultureRequest({
    url: '/seed/breed/produce/list',
    method: 'get',
    params
  })
}

/**
 * 获取生产数据详情
 * Get breeder seed production detail
 */
export const getBreedSeedProduceDetail = (breedSeedProduceBatchId) => {
  return agricultureRequest({
    url: `/seed/breed/produce/detail/${breedSeedProduceBatchId}`,
    method: 'get'
  })
}

/**
 * 获取生产批次的剩余量（用于实时查询）
 * Get remaining quantity of production batch (returns detail with remainingQuantity)
 */
export const getBreedSeedProduceRemainingQuantity = (breedSeedProduceBatchId) => {
  return agricultureRequest({
    url: `/seed/breed/produce/remaining/${breedSeedProduceBatchId}`,
    method: 'get'
  })
}

/**
 * 新增生产数据
 * Add breeder seed production
 */
export const addBreedSeedProduce = (data) => {
  return agricultureRequest({
    url: '/seed/breed/produce/add',
    method: 'post',
    data
  })
}

/**
 * 删除生产数据
 * Delete breeder seed production
 */
export const deleteBreedSeedProduce = (breedSeedProduceBatchId) => {
  return agricultureRequest({
    url: '/seed/breed/produce/delete',
    method: 'get',
    params: { breedSeedProduceBatchId }
  })
}

/**
 * 提交生产结果
 * Submit production result
 */
export const addBreedSeedProduceResult = (data) => {
  return agricultureRequest({
    url: '/seed/breed/produce/result/add',
    method: 'post',
    data
  })
}

/**
 * 查询生产结果列表
 * Get result list
 */
export const getBreedSeedProduceResultList = (query) => {
  return agricultureRequest({
    url: '/seed/breed/produce/result/list',
    method: 'get',
    params: query
  })
}

/**
 * 获取生产结果详情
 * Get result detail
 */
export const getBreedSeedProduceResult = (resultId) => {
  return agricultureRequest({
    url: '/seed/breed/produce/result/' + resultId,
    method: 'get'
  })
}

/**
 * 删除生产结果
 * Delete result
 */
export const deleteBreedSeedProduceResult = (resultIds) => {
  return agricultureRequest({
    url: '/seed/breed/produce/result/' + resultIds,
    method: 'delete'
  })
}

// ==================== Breeder Seed 分发数据 ====================

/**
 * 查询分发数据列表
 * Query breeder seed distribution list
 */
export const getBreedSeedDistributeList = (params) => {
  return agricultureRequest({
    url: '/seed/breed/distribute/list',
    method: 'get',
    params
  })
}

/**
 * 新增分发数据
 * Add breeder seed distribution
 */
export const addBreedSeedDistribute = (data) => {
  return agricultureRequest({
    url: '/seed/breed/distribute/add',
    method: 'post',
    data
  })
}

// ==================== OSE维护 ====================

/**
 * 查询OSE列表
 * Query OSE list
 */
export const getOseList = (params) => {
  return agricultureRequest({
    url: '/seed/ose/list',
    method: 'get',
    params
  })
}

/**
 * 获取OSE详情
 * Get OSE detail
 */
export const getOseDetail = (oseId) => {
  return agricultureRequest({
    url: `/seed/ose/detail/${oseId}`,
    method: 'get'
  })
}

/**
 * 新增OSE信息
 * Add OSE information
 */
export const addOse = (data) => {
  return agricultureRequest({
    url: '/seed/ose/add',
    method: 'post',
    data
  })
}

/**
 * 更新OSE信息
 * Update OSE information
 */
export const updateOse = (oseId, data) => {
  return agricultureRequest({
    url: `/seed/ose/update/${oseId}`,
    method: 'put',
    data
  })
}

/**
 * 删除OSE信息
 * Delete OSE information
 */
export const deleteOse = (oseId) => {
  return agricultureRequest({
    url: `/seed/ose/delete/${oseId}`,
    method: 'delete'
  })
}

// ==================== OSE接收确认 ====================

/**
 * 查询接收确认列表
 * Query OSE receive confirmation list
 */
export const getOseReceiveConfirmList = (params) => {
  return agricultureRequest({
    url: '/seed/ose/receive/confirm/list',
    method: 'get',
    params
  })
}

/**
 * OSE确认接收
 * OSE confirm receive
 */
export const confirmOseReceive = (receiveConfirmId, data) => {
  return agricultureRequest({
    url: `/seed/ose/receive/confirm/${receiveConfirmId}`,
    method: 'put',
    data
  })
}

// ==================== 品种相关 ====================

/**
 * 获取已发布品种列表
 * Get published variety list
 */
export const getVarietyPublishList = (params) => {
  return agricultureRequest({
    url: '/seed/variety/publish/list',
    method: 'get',
    params
  })
}
