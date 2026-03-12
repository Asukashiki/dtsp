import request from '@/utils/agricultureRequest'

const BASE = '/inventory/stock-check'

/** 获取盘点单列表（列表页） */
export const getStockCheckList = (params) =>
    request({ url: `${BASE}/list`, method: 'GET', params })

/** 获取盘点单详情（含明细） */
export const getStockCheckDetail = (checkId) =>
    request({ url: `${BASE}/${checkId}`, method: 'GET' })

/** 新建盘点单 */
export const createStockCheck = (data) =>
    request({ url: `${BASE}/create`, method: 'POST', data })

/** 编辑盘点单（仅 DRAFT / REJECTED 可操作） */
export const updateStockCheck = (checkId, data) =>
    request({ url: `${BASE}/${checkId}`, method: 'PUT', data })

/** 删除盘点单（仅 DRAFT 可操作） */
export const deleteStockCheck = (checkId) =>
    request({ url: `${BASE}/${checkId}`, method: 'DELETE' })

/** 提交盘点单 → 状态变为 PENDING */
export const submitStockCheck = (checkId) =>
    request({ url: `${BASE}/${checkId}/submit`, method: 'POST' })

/** 取消盘点单 */
export const cancelStockCheck = (checkId) =>
    request({ url: `${BASE}/${checkId}/cancel`, method: 'POST' })

/** 审核通过（审核人操作） */
export const approveStockCheck = (checkId, data) =>
    request({ url: `${BASE}/${checkId}/approve`, method: 'POST', data })

/** 审核驳回（审核人操作） */
export const rejectStockCheck = (checkId, data) =>
    request({ url: `${BASE}/${checkId}/reject`, method: 'POST', data })

/** 获取指定仓库当前库存（用于初始化盘点明细） */
export const getWarehouseInventory = (warehouseId) =>
    request({ url: `/inventory/stock/detail/${warehouseId}`, method: 'GET' })
