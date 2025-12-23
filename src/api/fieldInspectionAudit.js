import request from '../utils/agricultureRequest'

// 根据环境判断使用的 API 基础 URL
const API_BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_APP_LOCAL_TEST_API_URL : ''

/**
 * 获取待审核的田间检验数据列表
 * @param {Object} params 查询参数
 * @returns Promise
 */
export const getFieldInspectionAuditList = (params) => {
    return request({
        url: `${API_BASE_URL}/seed/field-inspection/list`,
        method: 'get',
        params
    })
}

/**
 * 获取地块下拉选项
 * @returns Promise
 */
export const getPlotSelectList = () => {
    return request({
        url: `${API_BASE_URL}/seed/field-inspection/plot/selectList`,
        method: 'get'
    })
}

/**
 * 获取批次下拉选项
 * @returns Promise
 */
export const getBatchSelectList = () => {
    return request({
        url: `${API_BASE_URL}/seed/field-inspection/batch/selectList`,
        method: 'get'
    })
}

/**
 * 获取田间检验数据详情（用于审核页面展示）
 * @param {String} id 主键ID
 * @returns Promise
 */
export const getFieldInspectionAuditInfo = (id) => {
    return request({
        url: `${API_BASE_URL}/seed/field-inspection/audit/${id}`,
        method: 'get'
    })
}

/**
 * 同意审核
 * @param {Object} data 审核数据
 * @returns Promise
 */
export const approveFieldInspection = (data) => {
    return request({
        url: `${API_BASE_URL}/seed/field-inspection/approve`,
        method: 'post',
        data
    })
}

/**
 * 不同意审核（退回）
 * @param {Object} data 审核数据
 * @returns Promise
 */
export const rejectFieldInspection = (data) => {
    return request({
        url: `${API_BASE_URL}/seed/field-inspection/reject`,
        method: 'post',
        data
    })
}

/**
 * 作废（取消审核通过）
 * @param {Object} data 审核数据
 * @returns Promise
 */
export const voidFieldInspection = (data) => {
    return request({
        url: `${API_BASE_URL}/seed/field-inspection/void`,
        method: 'post',
        data
    })
}