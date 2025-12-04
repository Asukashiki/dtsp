import agricultureRequest from '../utils/agricultureRequest'

/**
 * 投入品流通管理 API
 * Input Circulation Management API
 */

// ==================== 投入品配额查看 ====================

/**
 * 获取投入品配额列表
 * Get input quota list
 */
export const getInputQuotaList = (params) => {
  return agricultureRequest({
    url: '/invested/quota/list',
    method: 'get',
    params
  })
}

/**
 * 获取投入品配额详情
 * Get input quota detail
 */
export const getInputQuotaDetail = (id) => {
  return agricultureRequest({
    url: `/invested/quota/detail/${id}`,
    method: 'get'
  })
}

// ==================== OSE分发种子到Union ====================

/**
 * 获取OSE分发单列表
 * Get OSE release list
 */
export const getOseReleaseList = (params) => {
  return agricultureRequest({
    url: '/invested/release/ose/list',
    method: 'get',
    params
  })
}

/**
 * 新增OSE分发单
 * Add OSE release
 */
export const addOseRelease = (data) => {
  return agricultureRequest({
    url: '/invested/release/ose/add',
    method: 'post',
    data
  })
}

/**
 * 编辑OSE分发单
 * Edit OSE release
 */
export const editOseRelease = (data) => {
  return agricultureRequest({
    url: '/invested/release/ose/edit',
    method: 'put',
    data
  })
}

/**
 * 获取OSE分发单详情
 * Get OSE release detail
 */
export const getOseReleaseDetail = (id) => {
  return agricultureRequest({
    url: `/invested/release/ose/detail/${id}`,
    method: 'get'
  })
}

/**
 * 删除OSE分发单
 * Delete OSE release
 */
export const deleteOseRelease = (ids) => {
  return agricultureRequest({
    url: `/invested/release/ose/delete/${ids}`,
    method: 'delete'
  })
}

// ==================== Union接收确认 ====================

/**
 * 获取Union接收确认列表
 * Get Union receive list
 */
export const getUnionReceiveList = (params) => {
  return agricultureRequest({
    url: '/invested/receive/union/list',
    method: 'get',
    params
  })
}

/**
 * Union确认接收
 * Confirm Union receive
 */
export const confirmUnionReceive = (id, data) => {
  return agricultureRequest({
    url: `/invested/receive/union/confirm/${id}`,
    method: 'put',
    data
  })
}

/**
 * 获取Union接收详情
 * Get Union receive detail
 */
export const getUnionReceiveDetail = (id) => {
  return agricultureRequest({
    url: `/invested/receive/union/detail/${id}`,
    method: 'get'
  })
}

// ==================== Union分发投入品到Woreda ====================

/**
 * 获取Union分发单列表
 * Get Union release list
 */
export const getUnionReleaseList = (params) => {
  return agricultureRequest({
    url: '/invested/release/union/list',
    method: 'get',
    params
  })
}

/**
 * 新增Union分发单
 * Add Union release
 */
export const addUnionRelease = (data) => {
  return agricultureRequest({
    url: '/invested/release/union/add',
    method: 'post',
    data
  })
}

/**
 * 编辑Union分发单
 * Edit Union release
 */
export const editUnionRelease = (data) => {
  return agricultureRequest({
    url: '/invested/release/union/edit',
    method: 'post',
    data
  })
}

/**
 * 获取Union分发单详情
 * Get Union release detail
 */
export const getUnionReleaseDetail = (id) => {
  return agricultureRequest({
    url: `/invested/release/union/detail/${id}`,
    method: 'get'
  })
}

/**
 * 删除Union分发单
 * Delete Union release
 */
export const deleteUnionRelease = (ids) => {
  return agricultureRequest({
    url: `/invested/release/union/delete/${ids}`,
    method: 'get'
  })
}

// ==================== Woreda接收确认 ====================

/**
 * 获取Woreda接收确认列表
 * Get Woreda receive list
 */
export const getWoredaReceiveList = (params) => {
  return agricultureRequest({
    url: '/invested/receive/woreda/list',
    method: 'get',
    params
  })
}

/**
 * Woreda确认接收
 * Confirm Woreda receive
 */
export const confirmWoredaReceive = (id, params) => {
  return agricultureRequest({
    url: `/invested/receive/woreda/confirm/${id}`,
    method: 'post',
    params
  })
}

/**
 * 获取Woreda接收详情
 * Get Woreda receive detail
 */
export const getWoredaReceiveDetail = (id) => {
  return agricultureRequest({
    url: `/invested/receive/woreda/detail/${id}`,
    method: 'get'
  })
}

// ==================== Woreda分发投入品到农民 ====================

/**
 * 获取农民分发单列表
 * Get farmer release list
 */
export const getFarmerReleaseList = (params) => {
  return agricultureRequest({
    url: '/invested/release/farmer/list',
    method: 'get',
    params
  })
}

/**
 * 新增农民分发单
 * Add farmer release
 */
export const addFarmerRelease = (data) => {
  return agricultureRequest({
    url: '/invested/release/farmer/add',
    method: 'post',
    data
  })
}

/**
 * 编辑农民分发单
 * Edit farmer release
 */
export const editFarmerRelease = (data) => {
  return agricultureRequest({
    url: '/invested/release/farmer/edit',
    method: 'post',
    data
  })
}

/**
 * 获取农民分发单详情
 * Get farmer release detail
 */
export const getFarmerReleaseDetail = (id) => {
  return agricultureRequest({
    url: `/invested/release/farmer/detail/${id}`,
    method: 'get'
  })
}

/**
 * 删除农民分发单
 * Delete farmer release
 */
export const deleteFarmerRelease = (ids) => {
  return agricultureRequest({
    url: `/invested/release/farmer/delete/${ids}`,
    method: 'get'
  })
}
