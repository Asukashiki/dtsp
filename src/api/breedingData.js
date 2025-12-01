import request from '../utils/agricultureRequest'

// ============ 育种批次管理 ============
export function getBreedingBatchList(params) {
  return request({ url: '/breeding/batch/list', method: 'get', params })
}

export function getBreedingBatchInfo(dataId) {
  return request({ url: '/breeding/batch/getInfo', method: 'get', params: { dataId } })
}

export function addBreedingBatch(data) {
  return request({ url: '/breeding/batch/add', method: 'post', data })
}

export function editBreedingBatch(data) {
  return request({ url: '/breeding/batch/edit', method: 'put', data })
}

export function deleteBreedingBatch(dataIds) {
  return request({ url: '/breeding/batch/remove', method: 'delete', params: { dataIds } })
}

export function getBreedingBatchOptions() {
  return request({ url: '/breeding/batch/options', method: 'get' })
}

// 批次下拉选项别名
export function getBatchOptions() {
  return getBreedingBatchOptions()
}

// ============ 地块及播种信息管理 ============
export function getPlotInfoList(params) {
  return request({ url: '/breeding/plot/list', method: 'get', params })
}

export function getPlotInfo(groundId) {
  return request({ url: '/breeding/plot/getInfo', method: 'get', params: { groundId } })
}

export function addPlotInfo(data) {
  return request({ url: '/breeding/plot/add', method: 'post', data })
}

export function editPlotInfo(data) {
  return request({ url: '/breeding/plot/edit', method: 'put', data })
}

export function deletePlotInfo(groundIds) {
  return request({ url: '/breeding/plot/remove', method: 'delete', params: { groundIds } })
}

export function getPlotsByBatch(batchId) {
  return request({ url: '/breeding/plot/listByBatch', method: 'get', params: { batchId } })
}

export function getPlotOptions(batchId, trialId) {
  const params = {}
  if (batchId) params.batchId = batchId
  if (trialId) params.trialId = trialId
  return request({ url: '/breeding/plot/options', method: 'get', params })
}

// ============ 试验基础信息管理 ============
export function getTrialBasicList(params) {
  return request({ url: '/breeding/trial/list', method: 'get', params })
}

export function getTrialBasicInfo(trialId) {
  return request({ url: '/breeding/trial/getInfo', method: 'get', params: { trialId } })
}

export function addTrialBasic(data) {
  return request({ url: '/breeding/trial/add', method: 'post', data })
}

export function editTrialBasic(data) {
  return request({ url: '/breeding/trial/edit', method: 'put', data })
}

export function deleteTrialBasic(trialIds) {
  return request({ url: '/breeding/trial/remove', method: 'delete', params: { trialIds } })
}

export function getTrialOptions(batchId) {
  return request({ url: '/breeding/trial/options', method: 'get', params: { batchId } })
}

// ============ 农艺性状数据 ============
export function getAgronomicTraitList(params) {
  return request({ url: '/breeding/trait/list', method: 'get', params })
}

export function getAgronomicTraitInfo(traitId) {
  return request({ url: '/breeding/trait/getInfo', method: 'get', params: { traitId } })
}

export function addAgronomicTrait(data) {
  return request({ url: '/breeding/trait/add', method: 'post', data })
}

export function editAgronomicTrait(data) {
  return request({ url: '/breeding/trait/edit', method: 'put', data })
}

export function deleteAgronomicTrait(traitIds) {
  return request({ url: '/breeding/trait/remove', method: 'delete', params: { traitIds } })
}

// ============ 农事记录 ============
export function getFarmingRecordList(params) {
  return request({ url: '/breeding/farming/list', method: 'get', params })
}

export function getFarmingRecordInfo(farmingId) {
  return request({ url: '/breeding/farming/getInfo', method: 'get', params: { farmingId } })
}

export function addFarmingRecord(data) {
  return request({ url: '/breeding/farming/add', method: 'post', data })
}

export function editFarmingRecord(data) {
  return request({ url: '/breeding/farming/edit', method: 'put', data })
}

export function deleteFarmingRecord(farmingIds) {
  return request({ url: '/breeding/farming/remove', method: 'delete', params: { farmingIds } })
}

// ============ 环境属性数据 ============
export function getEnvironmentDataList(params) {
  return request({ url: '/breeding/environment/list', method: 'get', params })
}

export function getEnvironmentDataInfo(envId) {
  return request({ url: '/breeding/environment/getInfo', method: 'get', params: { envId } })
}

export function addEnvironmentData(data) {
  return request({ url: '/breeding/environment/add', method: 'post', data })
}

export function editEnvironmentData(data) {
  return request({ url: '/breeding/environment/edit', method: 'put', data })
}

export function deleteEnvironmentData(envIds) {
  return request({ url: '/breeding/environment/remove', method: 'delete', params: { envIds } })
}
