import request from '@/utils/agricultureRequest'

// 根据环境判断使用的 API 基础 URL
const API_BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_APP_LOCAL_TEST_API_URL : ''

// 根据用户ID获取用户信息
export function getUserInfoById(userId) {
    return request({ url: `/ucif/account/getUserInfo`, method: 'get', params: { userId } })
}

// ============ 育种批次管理 ============
export function getBreedingBatchList(params) {
    return request({ url: `${API_BASE_URL}/breeding/batch/list`, method: 'get', params })
}

export function getBreedingBatchInfo(dataId) {
    return request({ url: `${API_BASE_URL}/breeding/batch/getInfo`, method: 'get', params: { dataId } })
}

export function addBreedingBatch(data) {
    return request({ url: `${API_BASE_URL}/breeding/batch/add`, method: 'post', data })
}

export function editBreedingBatch(data) {
    return request({ url: `${API_BASE_URL}/breeding/batch/edit`, method: 'post', data })
}

export function deleteBreedingBatch(dataIds) {
    console.log(dataIds);
    return request({ url: `${API_BASE_URL}/breeding/batch/remove`, method: 'get', params: { dataIds } })
}

export function getBreedingBatchOptions() {
    return request({ url: `${API_BASE_URL}/breeding/batch/options`, method: 'get' })
}

// 批次下拉选项别名
export function getBatchOptions() {
    return getBreedingBatchOptions()
}

// ============ 状态流转相关API ============
// 提交审核
export function submitForAudit(dataId) {
    return request({ url: `${API_BASE_URL}/breeding/batch/submitAudit`, method: 'post', data: { dataId } })
}

// 审核通过
export function approveBatch(breedingBatchDTO) {
    return request({ url: `${API_BASE_URL}/breeding/batch/approve`, method: 'post', data: breedingBatchDTO })
}

// 审核驳回
export function rejectBatch(breedingBatchDTO) {
    return request({ url: `${API_BASE_URL}/breeding/batch/reject`, method: 'post', data: breedingBatchDTO })
}

// 归档
export function archiveBatch(dataId) {
    return request({ url: `${API_BASE_URL}/breeding/batch/archive`, method: 'post', data: { dataId } })
}

// 作废
export function cancelBatch(dataId) {
    return request({ url: `${API_BASE_URL}/breeding/batch/cancel`, method: 'post', data: { dataId } })
}

// ============ 地块及播种信息管理 ============
export function getPlotInfoList(params) {
    return request({ url: `${API_BASE_URL}/breeding/plot/list`, method: 'get', params })
}

export function getPlotInfo(plotId) {
    return request({ url: `${API_BASE_URL}/breeding/plot/getInfo`, method: 'get', params: { plotId } })
}

export function addPlotInfo(data) {
    return request({ url: `${API_BASE_URL}/breeding/plot/add`, method: 'post', data })
}

export function editPlotInfo(data) {
    return request({ url: `${API_BASE_URL}/breeding/plot/edit`, method: 'post', data })
}

export function deletePlotInfo(plotIds) {
    return request({ url: `${API_BASE_URL}/breeding/plot/remove`, method: 'get', params: { plotIds } })
}

export function getPlotsByBatch(batchId) {
    return request({ url: `${API_BASE_URL}/breeding/plot/listByBatch`, method: 'get', params: { batchId } })
}

export function getPlotOptions(batchId, trialId) {
    const params = {}
    if (batchId) params.batchId = batchId
    if (trialId) params.trialId = trialId
    return request({ url: `${API_BASE_URL}/breeding/plot/options`, method: 'get', params })
}

// ============ 试验基础信息管理 ============
export function getTrialBasicList(params) {
    return request({ url: `${API_BASE_URL}/breeding/trial/list`, method: 'get', params })
}

export function getTrialBasicInfo(trialId) {
    return request({ url: `${API_BASE_URL}/breeding/trial/getInfo`, method: 'get', params: { trialId } })
}

export function addTrialBasic(data) {
    return request({ url: `${API_BASE_URL}/breeding/trial/add`, method: 'post', data })
}

export function editTrialBasic(data) {
    return request({ url: `${API_BASE_URL}/breeding/trial/edit`, method: 'post', data })
}

export function deleteTrialBasic(trialIds) {
    return request({ url: `${API_BASE_URL}/breeding/trial/remove`, method: 'get', params: { trialIds } })
}

export function getTrialOptions(batchId) {
    return request({ url: `${API_BASE_URL}/breeding/trial/options`, method: 'get', params: { batchId } })
}

// ============ 农艺性状数据 ============
export function getAgronomicTraitList(params) {
    return request({ url: `${API_BASE_URL}/breeding/trait/list`, method: 'get', params })
}

export function getAgronomicTraitInfo(traitId) {
    return request({ url: `${API_BASE_URL}/breeding/trait/getInfo`, method: 'get', params: { traitId } })
}

export function addAgronomicTrait(data) {
    return request({ url: `${API_BASE_URL}/breeding/trait/add`, method: 'post', data })
}

export function editAgronomicTrait(data) {
    return request({ url: `${API_BASE_URL}/breeding/trait/edit`, method: 'post', data })
}

export function deleteAgronomicTrait(traitIds) {
    return request({ url: `${API_BASE_URL}/breeding/trait/remove`, method: 'get', params: { traitIds } })
}

// ============ 农艺性状记录（一对多模式） ============
export function getTraitRecordList(params) {
    return request({ url: `${API_BASE_URL}/breeding/traitRecord/list`, method: 'get', params })
}

export function getTraitRecordInfo(recordId) {
    return request({ url: `${API_BASE_URL}/breeding/traitRecord/getInfo`, method: 'get', params: { recordId } })
}

export function addTraitRecord(data) {
    return request({ url: `${API_BASE_URL}/breeding/traitRecord/add`, method: 'post', data })
}

export function editTraitRecord(data) {
    return request({ url: `${API_BASE_URL}/breeding/traitRecord/edit`, method: 'post', data })
}

export function deleteTraitRecord(recordIds) {
    return request({ url: `${API_BASE_URL}/breeding/traitRecord/remove`, method: 'get', params: { recordIds } })
}

export function generateTraitRecordId(plotId) {
    return request({ url: `${API_BASE_URL}/breeding/traitRecord/generateId`, method: 'get', params: { plotId } })
}


// ============ 农事记录 ============
export function getFarmingRecordList(params) {
    return request({ url: `${API_BASE_URL}/breeding/farming/list`, method: 'get', params })
}

export function getFarmingRecordInfo(farmingId) {
    return request({ url: `${API_BASE_URL}/breeding/farming/getInfo`, method: 'get', params: { farmingId } })
}

export function addFarmingRecord(data) {
    return request({ url: `${API_BASE_URL}/breeding/farming/add`, method: 'post', data })
}

export function editFarmingRecord(data) {
    return request({ url: `${API_BASE_URL}/breeding/farming/edit`, method: 'post', data })
}

export function deleteFarmingRecord(farmingIds) {
    return request({ url: `${API_BASE_URL}/breeding/farming/remove`, method: 'get', params: { farmingIds } })
}

// ============ 环境属性数据 ============
export function getEnvironmentDataList(params) {
    return request({ url: `${API_BASE_URL}/breeding/environment/list`, method: 'get', params })
}

export function getEnvironmentDataInfo(envId) {
    return request({ url: `${API_BASE_URL}/breeding/environment/getInfo`, method: 'get', params: { envId } })
}

export function addEnvironmentData(data) {
    return request({ url: `${API_BASE_URL}/breeding/environment/add`, method: 'post', data })
}

export function editEnvironmentData(data) {
    return request({ url: `${API_BASE_URL}/breeding/environment/edit`, method: 'post', data })
}

export function deleteEnvironmentData(envIds) {
    return request({ url: `${API_BASE_URL}/breeding/environment/remove`, method: 'get', params: { envIds } })
}

// ============ 研究中心管理 ============
export function getLocationMasterList(params) {
    return request({ url: `${API_BASE_URL}/seed/locationMaster/page`, method: 'post', data: params })
}

export function getLocationMasterInfo(locationId) {
    return request({ url: `${API_BASE_URL}/seed/locationMaster/detail`, method: 'get', params: { locationId } })
}

export function addLocationMaster(data) {
    return request({ url: `${API_BASE_URL}/seed/locationMaster/add`, method: 'post', data })
}

export function editLocationMaster(data) {
    return request({ url: `${API_BASE_URL}/seed/locationMaster/update`, method: 'post', data })
}

export function deleteLocationMaster(locationIds) {
    return request({ url: `${API_BASE_URL}/seed/locationMaster/delete`, method: 'get', params: { locationId: locationIds } })
}

export function getLocationMasterOptions() {
    return request({ url: `${API_BASE_URL}/seed/locationMaster/list`, method: 'post', data: {} })
}
