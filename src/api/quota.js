import request from '@/utils/request'

// ==================== State Annual Quota Management ====================

/**
 * Get state annual quota page list
 * @param {Object} params - Query parameters
 * @returns {Promise}
 */
export function getStateAnnualQuotaPage(params) {
  return request({
    url: '/api/quota/state-annual/page',
    method: 'get',
    params
  })
}

/**
 * Get state annual quota detail
 * @param {String} quotaId - Quota ID
 * @param {String} operatorDivisionId - Operator division ID
 * @returns {Promise}
 */
export function getStateAnnualQuotaDetail(quotaId, operatorDivisionId) {
  return request({
    url: '/api/quota/state-annual/detail',
    method: 'get',
    params: { quotaId, operatorDivisionId }
  })
}

/**
 * Add state annual quota
 * @param {Object} data - Quota data
 * @returns {Promise}
 */
export function addStateAnnualQuota(data) {
  return request({
    url: '/api/quota/state-annual/add',
    method: 'post',
    data
  })
}

/**
 * Update state annual quota
 * @param {Object} data - Quota data
 * @returns {Promise}
 */
export function updateStateAnnualQuota(data) {
  return request({
    url: '/api/quota/state-annual/update',
    method: 'post',
    data
  })
}

/**
 * Delete state annual quota
 * @param {Object} data - Delete data
 * @returns {Promise}
 */
export function deleteStateAnnualQuota(data) {
  return request({
    url: '/api/quota/state-annual/delete',
    method: 'post',
    data
  })
}

// ==================== Quota Allocation Management ====================

/**
 * Get quota allocation page list
 * @param {Object} params - Query parameters
 * @returns {Promise}
 */
export function getQuotaAllocationPage(params) {
  return request({
    url: '/api/quota/allocation/page',
    method: 'get',
    params
  })
}

/**
 * Get quota allocation detail
 * @param {String} allocationId - Allocation ID
 * @param {String} operatorDivisionId - Operator division ID
 * @returns {Promise}
 */
export function getQuotaAllocationDetail(allocationId, operatorDivisionId) {
  return request({
    url: '/api/quota/allocation/detail',
    method: 'get',
    params: { allocationId, operatorDivisionId }
  })
}

/**
 * Add quota allocation
 * @param {Object} data - Allocation data
 * @returns {Promise}
 */
export function addQuotaAllocation(data) {
  return request({
    url: '/api/quota/allocation/add',
    method: 'post',
    data
  })
}

/**
 * Update quota allocation
 * @param {Object} data - Allocation data
 * @returns {Promise}
 */
export function updateQuotaAllocation(data) {
  return request({
    url: '/api/quota/allocation/update',
    method: 'post',
    data
  })
}

/**
 * Delete quota allocation
 * @param {Object} data - Delete data
 * @returns {Promise}
 */
export function deleteQuotaAllocation(data) {
  return request({
    url: '/api/quota/allocation/delete',
    method: 'post',
    data
  })
}
