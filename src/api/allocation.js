import request from '../utils/agricultureRequest'

// ==================== Zone Allocation Management ====================

/**
 * Get zone allocation page list
 * @param {Object} params - Query parameters
 * @returns {Promise}
 */
export function getZoneAllocationList(params) {
  return request({
    url: '/api/allocation/zone/page',
    method: 'get',
    params
  })
}

/**
 * Get zone allocation detail
 * @param {String} id - Allocation ID
 * @returns {Promise}
 */
export function getZoneAllocationDetail(id) {
  return request({
    url: '/api/allocation/zone/detail',
    method: 'get',
    params: { id }
  })
}

/**
 * Add zone allocation
 * @param {Object} data - Allocation data
 * @returns {Promise}
 */
export function addZoneAllocation(data) {
  return request({
    url: '/api/allocation/zone/add',
    method: 'post',
    data
  })
}

/**
 * Update zone allocation
 * @param {Object} data - Allocation data
 * @returns {Promise}
 */
export function editZoneAllocation(data) {
  return request({
    url: '/api/allocation/zone/update',
    method: 'post',
    data
  })
}

/**
 * Delete zone allocation
 * @param {String} id - Allocation ID
 * @returns {Promise}
 */
export function deleteZoneAllocation(id) {
  return request({
    url: '/api/allocation/zone/delete',
    method: 'post',
    data: { id }
  })
}

/**
 * Get demand data by year and zone
 * @param {Object} params - Query parameters (year, zone)
 * @returns {Promise}
 */
export function getDemandByYearAndZone(params) {
  return request({
    url: '/api/allocation/zone/demand',
    method: 'get',
    params
  })
}

// ==================== Woreda Allocation Management ====================

/**
 * Get woreda allocation page list
 * @param {Object} params - Query parameters
 * @returns {Promise}
 */
export function getWoredaAllocationList(params) {
  return request({
    url: '/api/allocation/woreda/page',
    method: 'get',
    params
  })
}

/**
 * Get woreda allocation detail
 * @param {String} id - Allocation ID
 * @returns {Promise}
 */
export function getWoredaAllocationDetail(id) {
  return request({
    url: '/api/allocation/woreda/detail',
    method: 'get',
    params: { id }
  })
}

/**
 * Add woreda allocation
 * @param {Object} data - Allocation data
 * @returns {Promise}
 */
export function addWoredaAllocation(data) {
  return request({
    url: '/api/allocation/woreda/add',
    method: 'post',
    data
  })
}

/**
 * Update woreda allocation
 * @param {Object} data - Allocation data
 * @returns {Promise}
 */
export function editWoredaAllocation(data) {
  return request({
    url: '/api/allocation/woreda/update',
    method: 'post',
    data
  })
}

/**
 * Delete woreda allocation
 * @param {String} id - Allocation ID
 * @returns {Promise}
 */
export function deleteWoredaAllocation(id) {
  return request({
    url: '/api/allocation/woreda/delete',
    method: 'post',
    data: { id }
  })
}

// ==================== Kebele Allocation Management ====================

/**
 * Get kebele allocation page list
 * @param {Object} params - Query parameters
 * @returns {Promise}
 */
export function getKebeleAllocationList(params) {
  return request({
    url: '/api/allocation/kebele/page',
    method: 'get',
    params
  })
}

/**
 * Get kebele allocation detail
 * @param {String} id - Allocation ID
 * @returns {Promise}
 */
export function getKebeleAllocationDetail(id) {
  return request({
    url: '/api/allocation/kebele/detail',
    method: 'get',
    params: { id }
  })
}

/**
 * Add kebele allocation
 * @param {Object} data - Allocation data
 * @returns {Promise}
 */
export function addKebeleAllocation(data) {
  return request({
    url: '/api/allocation/kebele/add',
    method: 'post',
    data
  })
}

/**
 * Update kebele allocation
 * @param {Object} data - Allocation data
 * @returns {Promise}
 */
export function editKebeleAllocation(data) {
  return request({
    url: '/api/allocation/kebele/update',
    method: 'post',
    data
  })
}

/**
 * Delete kebele allocation
 * @param {String} id - Allocation ID
 * @returns {Promise}
 */
export function deleteKebeleAllocation(id) {
  return request({
    url: '/api/allocation/kebele/delete',
    method: 'post',
    data: { id }
  })
}

// ==================== Farmer Allocation Management ====================

/**
 * Get farmer allocation page list
 * @param {Object} params - Query parameters
 * @returns {Promise}
 */
export function getFarmerAllocationPage(params) {
  return request({
    url: '/api/allocation/farmer/page',
    method: 'get',
    params
  })
}

/**
 * Get farmer allocation detail
 * @param {String} id - Allocation ID
 * @returns {Promise}
 */
export function getFarmerAllocationDetail(id) {
  return request({
    url: '/api/allocation/farmer/detail',
    method: 'get',
    params: { id }
  })
}

/**
 * Add farmer allocation
 * @param {Object} data - Allocation data
 * @returns {Promise}
 */
export function addFarmerAllocation(data) {
  return request({
    url: '/api/allocation/farmer/add',
    method: 'post',
    data
  })
}

/**
 * Update farmer allocation
 * @param {Object} data - Allocation data
 * @returns {Promise}
 */
export function editFarmerAllocation(data) {
  return request({
    url: '/api/allocation/farmer/update',
    method: 'post',
    data
  })
}

/**
 * Delete farmer allocation
 * @param {String} id - Allocation ID
 * @returns {Promise}
 */
export function deleteFarmerAllocation(id) {
  return request({
    url: '/api/allocation/farmer/delete',
    method: 'post',
    data: { id }
  })
}

/**
 * Get farmer demand data by farmer ID
 * @param {String} farmerId - Farmer ID
 * @param {Object} params - Additional parameters (e.g., year)
 * @returns {Promise}
 */
export function getFarmerDemandByFarmerId(farmerId, params = {}) {
  return request({
    url: '/seed/demand/farmer/getByFarmerId',
    method: 'get',
    params: { farmerId, ...params }
  })
}