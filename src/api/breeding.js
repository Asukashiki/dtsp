import request from '../utils/request'

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
  return request({
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
  return request({
    url: `/breeding/plan/${planId}`,
    method: 'get'
  })
}

/**
 * 新增育种计划
 * Add breeding plan
 */
export const addBreedingPlan = (data) => {
  return request({
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
  return request({
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
  return request({
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
  return request({
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
  return request({
    url: `/breeding/material/${materialId}`,
    method: 'get'
  })
}

/**
 * 新增育种材料登记
 * Add breeding material registration
 */
export const addBreedingMaterial = (data) => {
  return request({
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
  return request({
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
  return request({
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
  return request({
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
  return request({
    url: `/breeding/tracking/${trackingId}`,
    method: 'get'
  })
}

/**
 * 新增育种跟踪记录
 * Add breeding tracking record
 */
export const addBreedingTracking = (data) => {
  return request({
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
  return request({
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
  return request({
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
  return request({
    url: '/breeding/batch/list',
    method: 'get'
  })
}

/**
 * 获取作物类型列表（用于下拉选择）
 * Get crop type list (for dropdown)
 */
export const getCropTypeList = () => {
  return request({
    url: '/common/cropTypes',
    method: 'get'
  })
}
