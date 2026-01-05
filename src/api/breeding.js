 import agricultureRequest from '../utils/agricultureRequest'

/**
 * 育种管理 API
 * Breeding Management API
 */

// ==================== 育种计划管理 ====================

/**
 * 获取育种计划列表
 * Get breeding plan list
 */
export const getBreedingPlanList = (params) => {
  return agricultureRequest({
    url: '/breeding/plan/list',
    method: 'get',
    params
  })
}

/**
 * 获取育种计划详情
 * Get breeding plan detail
 */
export const getBreedingPlanDetail = (planId) => {
  return agricultureRequest({
    url: `/breeding/plan/${planId}`,
    method: 'get'
  })
}

/**
 * 新增育种计划
 * Add breeding plan
 */
export const addBreedingPlan = (data) => {
  return agricultureRequest({
    url: '/breeding/plan',
    method: 'post',
    data
  })
}

/**
 * 更新育种计划
 * Update breeding plan
 */
export const updateBreedingPlan = (planId, data) => {
  return agricultureRequest({
    url: `/breeding/plan/${planId}`,
    method: 'put',
    data
  })
}

/**
 * 删除育种计划
 * Delete breeding plan
 */
export const deleteBreedingPlan = (planId) => {
  return agricultureRequest({
    url: `/breeding/plan/${planId}`,
    method: 'delete'
  })
}

// ==================== 育种材料登记 ====================

/**
 * 获取育种材料登记列表
 * Get breeding material list
 */
export const getBreedingMaterialList = (params) => {
  return agricultureRequest({
    url: '/breeding/material/list',
    method: 'get',
    params
  })
}

/**
 * 获取育种材料详情
 * Get breeding material detail
 */
export const getBreedingMaterialDetail = (materialId) => {
  return agricultureRequest({
    url: `/breeding/material/${materialId}`,
    method: 'get'
  })
}

/**
 * 新增育种材料登记
 * Add breeding material registration
 */
export const addBreedingMaterial = (data) => {
  return agricultureRequest({
    url: '/breeding/material',
    method: 'post',
    data
  })
}

/**
 * 更新育种材料登记
 * Update breeding material registration
 */
export const updateBreedingMaterial = (materialId, data) => {
  return agricultureRequest({
    url: `/breeding/material/${materialId}`,
    method: 'put',
    data
  })
}

/**
 * 删除育种材料登记
 * Delete breeding material registration
 */
export const deleteBreedingMaterial = (materialId) => {
  return agricultureRequest({
    url: `/breeding/material/${materialId}`,
    method: 'delete'
  })
}

// ==================== 育种跟踪管理 ====================

/**
 * 获取育种跟踪记录列表
 * Get breeding tracking list
 */
export const getBreedingTrackingList = (params) => {
  return agricultureRequest({
    url: '/breeding/tracking/list',
    method: 'get',
    params
  })
}

/**
 * 获取育种跟踪记录详情
 * Get breeding tracking detail
 */
export const getBreedingTrackingDetail = (trackingId) => {
  return agricultureRequest({
    url: `/breeding/tracking/${trackingId}`,
    method: 'get'
  })
}

/**
 * 新增育种跟踪记录
 * Add breeding tracking record
 */
export const addBreedingTracking = (data) => {
  return agricultureRequest({
    url: '/breeding/tracking',
    method: 'post',
    data
  })
}

/**
 * 更新育种跟踪记录
 * Update breeding tracking record
 */
export const updateBreedingTracking = (trackingId, data) => {
  return agricultureRequest({
    url: `/breeding/tracking/${trackingId}`,
    method: 'put',
    data
  })
}

/**
 * 删除育种跟踪记录
 * Delete breeding tracking record
 */
export const deleteBreedingTracking = (trackingId) => {
  return agricultureRequest({
    url: `/breeding/tracking/${trackingId}`,
    method: 'delete'
  })
}

// ==================== 通用接口 ====================

/**
 * 获取育种批次列表（用于下拉选择）
 * Get breeding batch list (for dropdown)
 */
export const getBreedingBatchList = () => {
  return agricultureRequest({
    url: '/breeding/batch/list',
    method: 'get'
  })
}

/**
 * 获取作物类型列表（用于下拉选择）
 * Get crop type list (for dropdown)
 */
export const getCropTypeList = () => {
  return agricultureRequest({
    url: '/common/cropTypes',
    method: 'get'
  })
}

// ==================== 数据采集模块 Data Collection ====================

// ==================== 1. 试验基础数据采集 ====================

/**
 * 查询试验基础数据列表
 * Query trial base data list
 */
export const getTrialBaseList = (data) => {
  return agricultureRequest({
    url: '/seed/trial/base/list',
    method: 'post',
    data
  })
}

/**
 * 获取试验基础数据详情
 * Get trial base data detail
 */
export const getTrialBaseDetail = (trialId) => {
  return agricultureRequest({
    url: `/seed/trial/base/${trialId}`,
    method: 'get'
  })
}

/**
 * 新增试验基础数据
 * Add trial base data
 */
export const addTrialBase = (data) => {
  return agricultureRequest({
    url: '/seed/trial/base/add',
    method: 'post',
    data
  })
}

/**
 * 修改试验基础数据
 * Edit trial base data
 */
export const editTrialBase = (data) => {
  return agricultureRequest({
    url: '/seed/trial/base/edit',
    method: 'post',
    data
  })
}

/**
 * 删除试验基础数据
 * Delete trial base data
 */
export const deleteTrialBase = (trialIds) => {
  return agricultureRequest({
    url: '/seed/trial/base/delete',
    method: 'post',
    data: trialIds
  })
}

// ==================== 2. 农民与地块属性数据采集 ====================

/**
 * 查询农民与地块数据列表
 * Query farmer plot data list
 */
export const getFarmerPlotList = (data) => {
  return agricultureRequest({
    url: '/seed/farmer/plot/list',
    method: 'post',
    data
  })
}

/**
 * 获取农民与地块数据详情
 * Get farmer plot data detail
 */
export const getFarmerPlotDetail = (dataId) => {
  return agricultureRequest({
    url: `/seed/farmer/plot/${dataId}`,
    method: 'get'
  })
}

/**
 * 新增农民与地块数据
 * Add farmer plot data
 */
export const addFarmerPlot = (data) => {
  return agricultureRequest({
    url: '/seed/farmer/plot/add',
    method: 'post',
    data
  })
}

/**
 * 修改农民与地块数据
 * Edit farmer plot data
 */
export const editFarmerPlot = (data) => {
  return agricultureRequest({
    url: '/seed/farmer/plot/edit',
    method: 'post',
    data
  })
}

/**
 * 删除农民与地块数据
 * Delete farmer plot data
 */
export const deleteFarmerPlot = (dataIds) => {
  return agricultureRequest({
    url: '/seed/farmer/plot/delete',
    method: 'post',
    data: dataIds
  })
}

// ==================== 3. 农事记录数据采集 ====================

/**
 * 查询农事记录列表
 * Query farming record list
 */
export const getFarmingRecordList = (data) => {
  return agricultureRequest({
    url: '/seed/farming/record/list',
    method: 'post',
    data
  })
}

/**
 * 获取农事记录详情
 * Get farming record detail
 */
export const getFarmingRecordDetail = (dataId) => {
  return agricultureRequest({
    url: `/seed/farming/record/${dataId}`,
    method: 'get'
  })
}

/**
 * 新增农事记录
 * Add farming record
 */
export const addFarmingRecord = (data) => {
  return agricultureRequest({
    url: '/seed/farming/record/add',
    method: 'post',
    data
  })
}

/**
 * 修改农事记录
 * Edit farming record
 */
export const editFarmingRecord = (data) => {
  return agricultureRequest({
    url: '/seed/farming/record/edit',
    method: 'post',
    data
  })
}

/**
 * 删除农事记录
 * Delete farming record
 */
export const deleteFarmingRecord = (dataIds) => {
  return agricultureRequest({
    url: '/seed/farming/record/delete',
    method: 'post',
    data: dataIds
  })
}

// ==================== 4. 农艺性状数据采集 ====================

/**
 * 查询农艺性状数据列表
 * Query agronomic trait data list
 */
export const getAgronomicTraitList = (data) => {
  return agricultureRequest({
    url: '/seed/agronomic/trait/list',
    method: 'post',
    data
  })
}

/**
 * 获取农艺性状数据详情
 * Get agronomic trait data detail
 */
export const getAgronomicTraitDetail = (dataId) => {
  return agricultureRequest({
    url: `/seed/agronomic/trait/${dataId}`,
    method: 'get'
  })
}

/**
 * 新增农艺性状数据
 * Add agronomic trait data
 */
export const addAgronomicTrait = (data) => {
  return agricultureRequest({
    url: '/seed/agronomic/trait/add',
    method: 'post',
    data
  })
}

/**
 * 修改农艺性状数据
 * Edit agronomic trait data
 */
export const editAgronomicTrait = (data) => {
  return agricultureRequest({
    url: '/seed/agronomic/trait/edit',
    method: 'post',
    data
  })
}

/**
 * 删除农艺性状数据
 * Delete agronomic trait data
 */
export const deleteAgronomicTrait = (dataIds) => {
  return agricultureRequest({
    url: '/seed/agronomic/trait/delete',
    method: 'post',
    data: dataIds
  })
}

// ==================== 5. 环境与土壤属性数据采集 ====================

/**
 * 查询环境与土壤数据列表
 * Query environment soil data list
 */
export const getEnvironmentSoilList = (data) => {
  return agricultureRequest({
    url: '/seed/environment/soil/list',
    method: 'post',
    data
  })
}

/**
 * 获取环境与土壤数据详情
 * Get environment soil data detail
 */
export const getEnvironmentSoilDetail = (dataId) => {
  return agricultureRequest({
    url: `/seed/environment/soil/${dataId}`,
    method: 'get'
  })
}

/**
 * 新增环境与土壤数据
 * Add environment soil data
 */
export const addEnvironmentSoil = (data) => {
  return agricultureRequest({
    url: '/seed/environment/soil/add',
    method: 'post',
    data
  })
}

/**
 * 修改环境与土壤数据
 * Edit environment soil data
 */
export const editEnvironmentSoil = (data) => {
  return agricultureRequest({
    url: '/seed/environment/soil/edit',
    method: 'post',
    data
  })
}

/**
 * 删除环境与土壤数据
 * Delete environment soil data
 */
export const deleteEnvironmentSoil = (dataIds) => {
  return agricultureRequest({
    url: '/seed/environment/soil/delete',
    method: 'post',
    data: dataIds
  })
}

// ==================== 6. 品种评估数据采集 ====================

/**
 * 查询品种评估数据列表
 * Query variety evaluation data list
 */
export const getVarietyEvaluationList = (data) => {
  return agricultureRequest({
    url: '/seed/variety/evaluation/list',
    method: 'post',
    data
  })
}

/**
 * 获取品种评估数据详情
 * Get variety evaluation data detail
 */
export const getVarietyEvaluationDetail = (dataId) => {
  return agricultureRequest({
    url: `/seed/variety/evaluation/${dataId}`,
    method: 'get'
  })
}

/**
 * 新增品种评估数据
 * Add variety evaluation data
 */
export const addVarietyEvaluation = (data) => {
  return agricultureRequest({
    url: '/seed/variety/evaluation/add',
    method: 'post',
    data
  })
}

/**
 * 修改品种评估数据
 * Edit variety evaluation data
 */
export const editVarietyEvaluation = (data) => {
  return agricultureRequest({
    url: '/seed/variety/evaluation/edit',
    method: 'post',
    data
  })
}

/**
 * 删除品种评估数据
 * Delete variety evaluation data
 */
export const deleteVarietyEvaluation = (dataIds) => {
  return agricultureRequest({
    url: '/seed/variety/evaluation/delete',
    method: 'post',
    data: dataIds
  })
}

// ==================== 7. 实验室测试数据采集 ====================

/**
 * 查询实验室测试数据列表
 * Query laboratory test data list
 */
export const getLaboratoryTestList = (data) => {
  return agricultureRequest({
    url: '/seed/laboratory/test/list',
    method: 'post',
    data
  })
}

/**
 * 获取实验室测试数据详情
 * Get laboratory test data detail
 */
export const getLaboratoryTestDetail = (dataId) => {
  return agricultureRequest({
    url: `/seed/laboratory/test/${dataId}`,
    method: 'get'
  })
}

/**
 * 新增实验室测试数据
 * Add laboratory test data
 */
export const addLaboratoryTest = (data) => {
  return agricultureRequest({
    url: '/seed/laboratory/test/add',
    method: 'post',
    data
  })
}

/**
 * 修改实验室测试数据
 * Edit laboratory test data
 */
export const editLaboratoryTest = (data) => {
  return agricultureRequest({
    url: '/seed/laboratory/test/edit',
    method: 'post',
    data
  })
}

/**
 * 删除实验室测试数据
 * Delete laboratory test data
 */
export const deleteLaboratoryTest = (dataIds) => {
  return agricultureRequest({
    url: '/seed/laboratory/test/delete',
    method: 'post',
    data: dataIds
  })
}

// ==================== 8. 繁殖批次信息采集 ====================

/**
 * 查询繁殖批次列表
 * Query breeding batch list
 */
export const getBreedingBatchPageList = (data) => {
  return agricultureRequest({
    url: '/seed/breeding/batch/page',
    method: 'post',
    data
  })
}

/**
 * 查询繁殖批次列表（不分页）
 * Query breeding batch list without pagination
 */
export const getBreedingBatchPageListAll = (data) => {
  return agricultureRequest({
    url: '/seed/breeding/batch/list',
    method: 'post',
    data
  })
}

/**
 * 获取繁殖批次详情
 * Get breeding batch detail
 */
export const getBreedingBatchPageDetail = (id) => {
  return agricultureRequest({
    url: '/seed/breeding/batch/detail',
    method: 'get',
    params: { id }
  })
}

/**
 * 新增繁殖批次
 * Add breeding batch
 */
export const addBreedingBatchPage = (data) => {
  return agricultureRequest({
    url: '/seed/breeding/batch/add',
    method: 'post',
    data
  })
}

/**
 * 修改繁殖批次
 * Update breeding batch
 */
export const updateBreedingBatchPage = (data) => {
  return agricultureRequest({
    url: '/seed/breeding/batch/update',
    method: 'post',
    data
  })
}

/**
 * 删除繁殖批次
 * Delete breeding batch
 */
export const deleteBreedingBatchPage = (ids) => {
  return agricultureRequest({
    url: '/seed/breeding/batch/delete',
    method: 'post',
    data: ids
  })
}

// ==================== 9. 繁殖跟踪信息采集 ====================

/**
 * 查询繁殖跟踪列表
 * Query breeding tracking list
 */
export const getBreedingTrackingPageList = (data) => {
  return agricultureRequest({
    url: '/seed/breeding/tracking/page',
    method: 'post',
    data
  })
}

/**
 * 查询繁殖跟踪列表（不分页）
 * Query breeding tracking list without pagination
 */
export const getBreedingTrackingPageListAll = (data) => {
  return agricultureRequest({
    url: '/seed/breeding/tracking/list',
    method: 'post',
    data
  })
}

/**
 * 获取繁殖跟踪详情
 * Get breeding tracking detail
 */
export const getBreedingTrackingPageDetail = (id) => {
  return agricultureRequest({
    url: '/seed/breeding/tracking/detail',
    method: 'get',
    params: { id }
  })
}

/**
 * 新增繁殖跟踪
 * Add breeding tracking
 */
export const addBreedingTrackingPage = (data) => {
  return agricultureRequest({
    url: '/seed/breeding/tracking/add',
    method: 'post',
    data
  })
}

/**
 * 修改繁殖跟踪
 * Update breeding tracking
 */
export const updateBreedingTrackingPage = (data) => {
  return agricultureRequest({
    url: '/seed/breeding/tracking/update',
    method: 'post',
    data
  })
}

/**
 * 删除繁殖跟踪
 * Delete breeding tracking
 */
export const deleteBreedingTrackingPage = (ids) => {
  return agricultureRequest({
    url: '/seed/breeding/tracking/delete',
    method: 'post',
    data: ids
  })
}

// ==================== 10. 繁殖检测信息采集 ====================

/**
 * 查询繁殖检测列表
 * Query breeding test list
 */
export const getBreedingTestPageList = (data) => {
  return agricultureRequest({
    url: '/seed/breeding/test/page',
    method: 'post',
    data
  })
}

// ==================== 11. OSE 繁殖批次信息数据采集 ====================

/**
 * 查询OSE繁殖批次采集列表
 * Query OSE batch collection list
 */
export const getOseBatchCollectionList = (params) => {
  return agricultureRequest({
    url: '/seed/ose/batch/collection/list',
    method: 'get',
    params
  })
}

/**
 * 获取OSE繁殖批次采集详情
 * Get OSE batch collection detail
 */
export const getOseBatchCollectionDetail = (id) => {
  return agricultureRequest({
    url: `/seed/ose/batch/collection/${id}`,
    method: 'get'
  })
}

/**
 * 新增OSE繁殖批次采集
 * Add OSE batch collection
 */
export const addOseBatchCollection = (data) => {
  return agricultureRequest({
    url: '/seed/ose/batch/collection/add',
    method: 'post',
    data
  })
}

/**
 * 修改OSE繁殖批次采集
 * Update OSE batch collection
 */
export const updateOseBatchCollection = (data) => {
  return agricultureRequest({
    url: '/seed/ose/batch/collection/update',
    method: 'post',
    data
  })
}

/**
 * 删除OSE繁殖批次采集
 * Delete OSE batch collection
 */
export const deleteOseBatchCollection = (ids) => {
  return agricultureRequest({
    url: '/seed/ose/batch/collection/delete',
    method: 'post',
    data: ids
  })
}

/**
 * 查询繁殖检测列表（不分页）
 * Query breeding test list without pagination
 */
export const getBreedingTestPageListAll = (data) => {
  return agricultureRequest({
    url: '/seed/breeding/test/list',
    method: 'post',
    data
  })
}

/**
 * 获取繁殖检测详情
 * Get breeding test detail
 */
export const getBreedingTestPageDetail = (id) => {
  return agricultureRequest({
    url: '/seed/breeding/test/detail',
    method: 'get',
    params: { id }
  })
}

/**
 * 新增繁殖检测
 * Add breeding test
 */
export const addBreedingTestPage = (data) => {
  return agricultureRequest({
    url: '/seed/breeding/test/add',
    method: 'post',
    data
  })
}

/**
 * 修改繁殖检测
 * Update breeding test
 */
export const updateBreedingTestPage = (data) => {
  return agricultureRequest({
    url: '/seed/breeding/test/update',
    method: 'post',
    data
  })
}

/**
 * 删除繁殖检测
 * Delete breeding test
 */
export const deleteBreedingTestPage = (ids) => {
  return agricultureRequest({
    url: '/seed/breeding/test/delete',
    method: 'post',
    data: ids
  })
}
