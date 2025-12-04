import agricultureRequest, { toCamelCase, toSnakeCase } from '../utils/agricultureRequest'

// ==================== 仓库管理 API ====================

/**
 * 查询仓库列表
 * @param {Object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 * @param {string} params.warehouseName - 仓库名称(模糊查询)
 * @param {string} params.warehouseType - 仓库类型(normal/cold/dangerous)
 * @param {string} params.status - 状态(0-停用/1-启用)
 * @param {number} params.supplierId - 供应商ID
 */
export const getWarehouseList = (params = {}) => {
  const requestParams = {
    page: params.page || 1,
    pageSize: params.pageSize || 10
  }

  if (params.warehouseName) requestParams.warehouseName = params.warehouseName
  if (params.warehouseType) requestParams.warehouseType = params.warehouseType
  if (params.status !== undefined && params.status !== null && params.status !== '') {
    requestParams.status = params.status
  }
  if (params.supplierId) requestParams.supplierId = params.supplierId

  return agricultureRequest({
    url: '/inventory/warehouse/list',
    method: 'get',
    params: requestParams
  }).then(res => {
    if (res.data && res.data.list) {
      res.data.list = res.data.list.map(item => toSnakeCase(item))
    }
    return res
  })
}

/**
 * 查询仓库详情
 * @param {number} warehouseId - 仓库ID
 */
export const getWarehouseDetail = (warehouseId) => {
  return agricultureRequest({
    url: `/inventory/warehouse/${warehouseId}`,
    method: 'get'
  }).then(res => {
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

/**
 * 添加仓库
 * @param {Object} data - 仓库数据
 * @param {string} data.warehouseCode - 仓库编码
 * @param {string} data.warehouseName - 仓库名称
 * @param {string} data.warehouseType - 仓库类型
 * @param {string} data.location - 仓库位置
 * @param {number} data.capacity - 仓库容量
 * @param {number} data.warehouseArea - 仓库面积
 * @param {string} data.organName - 仓库归属部门
 * @param {string} data.contactPerson - 联系人
 * @param {string} data.contactPhone - 联系电话
 * @param {string} data.siteCertificate - 场地证明材料
 * @param {string} data.remark - 备注
 */
export const addWarehouse = (data) => {
  const requestData = {
    warehouseCode: data.warehouseCode,
    warehouseName: data.warehouseName,
    warehouseType: data.warehouseType,
    location: data.location,
    capacity: data.capacity,
    warehouseArea: data.warehouseArea,
    organName: data.organName,
    contactPerson: data.contactPerson,
    contactPhone: data.contactPhone,
    siteCertificate: data.siteCertificate,
    remark: data.remark
  }

  return agricultureRequest({
    url: '/inventory/warehouse',
    method: 'post',
    data: requestData
  }).then(res => {
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

/**
 * 更新仓库
 * @param {number} warehouseId - 仓库ID
 * @param {Object} data - 仓库数据
 */
export const updateWarehouse = (data) => {
  const requestData = {
    warehouseId: data.warehouseId,
    warehouseCode: data.warehouseCode,
    warehouseName: data.warehouseName,
    warehouseType: data.warehouseType,
    location: data.location,
    capacity: data.capacity,
    warehouseArea: data.warehouseArea,
    organName: data.organName,
    contactPerson: data.contactPerson,
    contactPhone: data.contactPhone,
    siteCertificate: data.siteCertificate,
    remark: data.remark
  }

  return agricultureRequest({
    url: '/inventory/warehouse/update',
    method: 'post',
    data: requestData
  }).then(res => {
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

/**
 * 删除仓库
 * @param {number} warehouseId - 仓库ID
 */
export const deleteWarehouse = (warehouseId) => {
  return agricultureRequest({
    url: `/inventory/warehouse/delete/${warehouseId}`,
    method: 'post'
  })
}

// ==================== 入库管理 API ====================

/**
 * 查询入库单列表
 * @param {Object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 * @param {number} params.warehouseId - 仓库ID
 * @param {number} params.supplierId - 供应商ID
 * @param {string} params.type - 入库类型（0-采购/1-退货）
 * @param {string} params.status - 状态（0-未入库/1-已入库/2-作废）
 */
export const getStockInList = (params = {}) => {
  const requestParams = {
    page: params.page || 1,
    pageSize: params.pageSize || 10
  }

  if (params.warehouseId) requestParams.warehouseId = params.warehouseId
  if (params.supplierId) requestParams.supplierId = params.supplierId
  if (params.type !== undefined && params.type !== null && params.type !== '') {
    requestParams.type = params.type
  }
  if (params.status !== undefined && params.status !== null && params.status !== '') {
    requestParams.status = params.status
  }

  return agricultureRequest({
    url: '/inventory/stock-in/list',
    method: 'get',
    params: requestParams
  }).then(res => {
    if (res.data && res.data.list) {
      res.data.list = res.data.list.map(item => toSnakeCase(item))
    }
    return res
  })
}

/**
 * 查询入库单详情
 * @param {string} stockInId - 入库单号
 */
export const getStockInDetail = (stockInId) => {
  return agricultureRequest({
    url: `/inventory/stock-in/${stockInId}`,
    method: 'get'
  }).then(res => {
    if (res.data) {
      res.data = toSnakeCase(res.data)
      if (res.data.items) {
        res.data.items = res.data.items.map(item => toSnakeCase(item))
      }
    }
    return res
  })
}

/**
 * 创建入库单
 * @param {Object} data - 入库单数据
 * @param {number} data.warehouseId - 仓库ID
 * @param {number} data.supplierId - 供应商ID
 * @param {string} data.type - 入库类型(0-采购/1-退货)
 * @param {string} data.operator - 操作员
 * @param {string} data.remarks - 备注
 * @param {Array} data.items - 入库商品明细
 * @param {number} data.items[].inputId - 投入品ID
 * @param {number} data.items[].quantity - 入库数量
 * @param {string} data.items[].expiryDate - 过期日期
 * @param {string} data.items[].remarks - 商品备注
 */
export const createStockIn = (data) => {
  const requestData = {
    warehouseId: data.warehouseId,
    supplierId: data.supplierId,
    type: data.type,
    operator: data.operator,
    remarks: data.remarks,
    items: data.items.map(item => ({
      inputId: item.inputId,
      quantity: item.quantity,
      expiryDate: item.expiryDate,
      remarks: item.remarks
    }))
  }

  return agricultureRequest({
    url: '/inventory/stock-in',
    method: 'post',
    data: requestData
  }).then(res => {
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

/**
 * 确认入库
 * @param {string} stockInId - 入库单号
 */
export const confirmStockIn = (stockInId) => {
  return agricultureRequest({
    url: `/inventory/stock-in/${stockInId}/confirm`,
    method: 'post'
  })
}

/**
 * 删除入库单
 * @param {string} stockInId - 入库单号
 */
export const deleteStockIn = (stockInId) => {
  return agricultureRequest({
    url: `/inventory/stock-in/${stockInId}`,
    method: 'delete'
  })
}

// ==================== 出库管理 API ====================

/**
 * 查询出库单列表
 * @param {Object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 * @param {number} params.warehouseId - 仓库ID
 * @param {string} params.customer - 客户
 * @param {string} params.type - 出库类型（0-销售）
 * @param {string} params.status - 状态（0-未出库/1-已出库/2-作废）
 */
export const getStockOutList = (params = {}) => {
  const requestParams = {
    page: params.page || 1,
    pageSize: params.pageSize || 10
  }

  if (params.warehouseId) requestParams.warehouseId = params.warehouseId
  if (params.customer) requestParams.customer = params.customer
  if (params.type !== undefined && params.type !== null && params.type !== '') {
    requestParams.type = params.type
  }
  if (params.status !== undefined && params.status !== null && params.status !== '') {
    requestParams.status = params.status
  }

  return agricultureRequest({
    url: '/inventory/stock-out/list',
    method: 'get',
    params: requestParams
  }).then(res => {
    if (res.data && res.data.list) {
      res.data.list = res.data.list.map(item => toSnakeCase(item))
    }
    return res
  })
}

/**
 * 查询出库单详情
 * @param {string} stockOutId - 出库单号
 */
export const getStockOutDetail = (stockOutId) => {
  return agricultureRequest({
    url: `/inventory/stock-out/${stockOutId}`,
    method: 'get'
  }).then(res => {
    if (res.data) {
      res.data = toSnakeCase(res.data)
      if (res.data.items) {
        res.data.items = res.data.items.map(item => toSnakeCase(item))
      }
    }
    return res
  })
}

/**
 * 创建出库单
 * @param {Object} data - 出库单数据
 * @param {number} data.warehouseId - 仓库ID
 * @param {string} data.type - 出库类型（0-销售）
 * @param {string} data.operator - 操作员
 * @param {string} data.customer - 客户
 * @param {string} data.remark - 备注
 * @param {Array} data.items - 出库商品明细
 */
export const createStockOut = (data) => {
  const requestData = {
    warehouseId: data.warehouseId,
    type: data.type,
    operator: data.operator,
    customer: data.customer,
    remark: data.remark,
    items: data.items.map(item => ({
      inputId: item.inputId,
      batchNo: item.batchNo,
      quantity: item.quantity,
      remarks: item.remarks
    }))
  }

  return agricultureRequest({
    url: '/inventory/stock-out',
    method: 'post',
    data: requestData
  }).then(res => {
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

/**
 * 确认出库
 * @param {string} stockOutId - 出库单号
 */
export const confirmStockOut = (stockOutId) => {
  return agricultureRequest({
    url: `/inventory/stock-out/${stockOutId}/confirm`,
    method: 'post'
  })
}

/**
 * 删除出库单
 * @param {string} stockOutId - 出库单号
 */
export const deleteStockOut = (stockOutId) => {
  return agricultureRequest({
    url: `/inventory/stock-out/${stockOutId}`,
    method: 'delete'
  })
}

// ==================== 库存查询 API ====================

/**
 * 查询库存列表
 * @param {Object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 * @param {number} params.warehouseId - 仓库ID
 * @param {number} params.inputId - 投入品ID
 * @param {string} params.batchNo - 批次号
 * @param {string} params.stockStatus - 库存状态（0-正常/1-临期/2-过期）
 */
export const getInventoryList = (params = {}) => {
  const requestParams = {
    page: params.page || 1,
    pageSize: params.pageSize || 10
  }

  if (params.warehouseId) requestParams.warehouseId = params.warehouseId
  if (params.inputId) requestParams.inputId = params.inputId
  if (params.batchNo) requestParams.batchNo = params.batchNo
  if (params.stockStatus !== undefined && params.stockStatus !== null && params.stockStatus !== '') {
    requestParams.stockStatus = params.stockStatus
  }

  return agricultureRequest({
    url: '/inventory/stock/query',
    method: 'get',
    params: requestParams
  }).then(res => {
    if (res.data && res.data.list) {
      res.data.list = res.data.list.map(item => toSnakeCase(item))
    }
    return res
  })
}

/**
 * 查询库存详情
 * @param {string} inventoryId - 库存记录ID
 */
export const getInventoryDetail = (inventoryId) => {
  return agricultureRequest({
    url: `/inventory/stock/${inventoryId}`,
    method: 'get'
  }).then(res => {
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

/**
 * 查询库存预警列表
 * @param {Object} params - 查询参数
 * @param {number} params.warehouseId - 仓库ID
 * @param {string} params.warningType - 预警类型（all/nearExpiry/expired）
 */
export const getInventoryWarning = (params = {}) => {
  const requestParams = {}

  if (params.warehouseId) requestParams.warehouseId = params.warehouseId
  if (params.warningType) requestParams.warningType = params.warningType

  return agricultureRequest({
    url: '/inventory/stock/warning',
    method: 'get',
    params: requestParams
  }).then(res => {
    if (res.data && Array.isArray(res.data)) {
      res.data = res.data.map(item => toSnakeCase(item))
    }
    return res
  })
}

/**
 * 按投入品汇总库存
 * @param {Object} params - 查询参数
 * @param {number} params.warehouseId - 仓库ID
 * @param {string} params.inputType - 投入品类型
 */
export const getInventorySummaryByInput = (params = {}) => {
  const requestParams = {}

  if (params.warehouseId) requestParams.warehouseId = params.warehouseId
  if (params.inputType) requestParams.inputType = params.inputType

  return agricultureRequest({
    url: '/inventory/stock/summary/by-input',
    method: 'get',
    params: requestParams
  }).then(res => {
    if (res.data && Array.isArray(res.data)) {
      res.data = res.data.map(item => toSnakeCase(item))
    }
    return res
  })
}

/**
 * 按仓库汇总库存
 * @param {Object} params - 查询参数
 * @param {number} params.supplierId - 供应商ID
 */
export const getInventorySummaryByWarehouse = (params = {}) => {
  const requestParams = {}

  if (params.supplierId) requestParams.supplierId = params.supplierId

  return agricultureRequest({
    url: '/inventory/stock/summary/by-warehouse',
    method: 'get',
    params: requestParams
  }).then(res => {
    if (res.data && Array.isArray(res.data)) {
      res.data = res.data.map(item => toSnakeCase(item))
    }
    return res
  })
}

/**
 * 获取批次列表（用于出库选择）
 * @param {Object} params - 查询参数
 * @param {number} params.warehouseId - 仓库ID
 * @param {number} params.inputId - 投入品ID
 */
export const getBatchList = (params = {}) => {
  const requestParams = {}

  if (params.warehouseId) requestParams.warehouseId = params.warehouseId
  if (params.inputId) requestParams.inputId = params.inputId

  return agricultureRequest({
    url: '/inventory/batch/list',
    method: 'get',
    params: requestParams
  }).then(res => {
    if (res.data && Array.isArray(res.data)) {
      res.data = res.data.map(item => toSnakeCase(item))
    }
    return res
  })
}
