import agricultureRequest from '../utils/agricultureRequest'

/**
 * C1繁殖批次相关API
 */

// 获取C1繁殖批次分页列表
export const getC1BreedingBatchList = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-batch/list',
    method: 'post',
    data
  })
}

// 根据ID获取C1繁殖批次详情
export const getC1BreedingBatchById = (id) => {
  return agricultureRequest({
    url: `/seed/c1-breeding-batch/getById/${id}`,
    method: 'get'
  })
}

// 新增C1繁殖批次
export const addC1BreedingBatch = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-batch/add',
    method: 'post',
    data
  })
}

// 更新C1繁殖批次
export const updateC1BreedingBatch = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-batch/update',
    method: 'post',
    data
  })
}

// 删除C1繁殖批次
export const deleteC1BreedingBatch = (ids) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-batch/delete',
    method: 'post',
    data: ids
  })
}

// 获取已审核通过的繁殖申请列表（供选择批次号使用）
export const getApprovedPropagations = () => {
  return agricultureRequest({
    url: '/seed/c1-breeding-batch/approved-propagations',
    method: 'get'
  })
}

// ========== C1跟踪记录 ==========

// 获取C1跟踪记录列表
export const getC1TrackingList = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-tracking/list',
    method: 'post',
    data
  })
}

// 根据ID获取C1跟踪记录详情
export const getC1TrackingById = (id) => {
  return agricultureRequest({
    url: `/seed/c1-breeding-tracking/getById/${id}`,
    method: 'get'
  })
}

// 新增C1跟踪记录
export const addC1Tracking = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-tracking/add',
    method: 'post',
    data
  })
}

// 更新C1跟踪记录
export const updateC1Tracking = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-tracking/update',
    method: 'post',
    data
  })
}

// 删除C1跟踪记录
export const deleteC1Tracking = (ids) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-tracking/delete',
    method: 'post',
    data: ids
  })
}

// ========== C1检测记录 ==========

// 获取C1检测记录列表
export const getC1TestList = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-test/list',
    method: 'post',
    data
  })
}

// 根据ID获取C1检测记录详情
export const getC1TestById = (id) => {
  return agricultureRequest({
    url: `/seed/c1-breeding-test/getById/${id}`,
    method: 'get'
  })
}

// 新增C1检测记录
export const addC1Test = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-test/add',
    method: 'post',
    data
  })
}

// 更新C1检测记录
export const updateC1Test = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-test/update',
    method: 'post',
    data
  })
}

// 删除C1检测记录
export const deleteC1Test = (ids) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-test/delete',
    method: 'post',
    data: ids
  })
}

// ========== C1繁殖批次审核 ==========

// 审核通过
export const approveC1Batch = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-batch/approve',
    method: 'post',
    data
  })
}

// 审核驳回
export const rejectC1Batch = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-batch/reject',
    method: 'post',
    data
  })
}

// 获取已审核通过的批次列表（供证书颁发使用）
export const getApprovedC1BatchList = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-batch/approved-list',
    method: 'post',
    data
  })
}

// 记录打印
export const recordC1BatchPrint = (id) => {
  return agricultureRequest({
    url: `/seed/c1-breeding-batch/record-print/${id}`,
    method: 'post'
  })
}

// 检查规则是否满足条件
export const checkRule = (dictCode, value) => {
  return agricultureRequest({
    url: `/seed/rulesInfo/checkRule`,
    method: 'get',
    params: { dictCode, value }
  })
}
