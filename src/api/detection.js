import agricultureRequest from '../utils/agricultureRequest'

/**
 * 通用种子检测API
 * 支持Basic和C1两个阶段的田间检测和实验室检测
 */

// ==================== 批次选择 ====================

/**
 * 获取用于检测的批次列表（Basic + C1）
 */
export const getBatchesForDetection = () => {
  return agricultureRequest({
    url: '/seed/batch/list-for-detection',
    method: 'get'
  })
}

// ==================== 田间检测 Tracking ====================

/**
 * 获取田间检测记录列表
 * @param {Object} data - {batchId, seedClass, pageNum, pageSize}
 */
export const getTrackingList = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-tracking/list',
    method: 'post',
    data
  })
}

/**
 * 根据ID获取田间检测记录详情
 * @param {String} id - 记录ID
 */
export const getTrackingById = (id) => {
  return agricultureRequest({
    url: `/seed/c1-breeding-tracking/getById/${id}`,
    method: 'get'
  })
}

/**
 * 新增田间检测记录
 * @param {Object} data - 记录数据（包含seedClass字段）
 */
export const addTracking = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-tracking/add',
    method: 'post',
    data
  })
}

/**
 * 更新田间检测记录
 * @param {Object} data - 记录数据（包含id和seedClass字段）
 */
export const updateTracking = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-tracking/update',
    method: 'post',
    data
  })
}

/**
 * 删除田间检测记录
 * @param {Array<String>} ids - 记录ID数组
 */
export const deleteTracking = (ids) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-tracking/delete',
    method: 'post',
    data: ids
  })
}

export const submitTracking = (id) => {
  return agricultureRequest({
    url: `/seed/c1-breeding-tracking/submit/${id}`,
    method: 'post'
  })
}

export const approveTracking = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-tracking/approve',
    method: 'post',
    data
  })
}

export const rejectTracking = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-tracking/reject',
    method: 'post',
    data
  })
}

// ==================== 实验室检测 Test ====================

/**
 * 获取实验室检测记录列表
 * @param {Object} data - {batchId, seedClass, pageNum, pageSize}
 */
export const getTestList = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-test/list',
    method: 'post',
    data
  })
}

/**
 * 根据ID获取实验室检测记录详情
 * @param {String} id - 记录ID
 */
export const getTestById = (id) => {
  return agricultureRequest({
    url: `/seed/c1-breeding-test/getById/${id}`,
    method: 'get'
  })
}

/**
 * 新增实验室检测记录
 * @param {Object} data - 记录数据（包含seedClass字段）
 */
export const addTest = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-test/add',
    method: 'post',
    data
  })
}

/**
 * 更新实验室检测记录
 * @param {Object} data - 记录数据（包含id和seedClass字段）
 */
export const updateTest = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-test/update',
    method: 'post',
    data
  })
}

/**
 * 删除实验室检测记录
 * @param {Array<String>} ids - 记录ID数组
 */
export const deleteTest = (ids) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-test/delete',
    method: 'post',
    data: ids
  })
}

export const submitTest = (id) => {
  return agricultureRequest({
    url: `/seed/c1-breeding-test/submit/${id}`,
    method: 'post'
  })
}

export const approveTest = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-test/approve',
    method: 'post',
    data
  })
}

export const rejectTest = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-test/reject',
    method: 'post',
    data
  })
}

// ==================== 规则检查 ====================

/**
 * 获取所有检测类型
 */
export const getInspectionTypes = () => {
  return agricultureRequest({
    url: '/seed/rulesInfo/inspectionTypes',
    method: 'get'
  })
}

/**
 * 根据检测类型获取规则列表
 */
export const getRulesByType = (inspectionType) => {
  return agricultureRequest({
    url: '/seed/rulesInfo/listByType',
    method: 'get',
    params: { inspectionType }
  })
}

/**
 * 检查检测值是否符合规则
 * @param {String} dictCode - 字典代码
 * @param {Number} value - 检测值
 */
export const checkRule = (dictCode, value) => {
  return agricultureRequest({
    url: '/seed/rulesInfo/checkRule',
    method: 'get',
    params: { dictCode, value }
  })
}
