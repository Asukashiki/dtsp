import agricultureRequest, { toSnakeCase } from '../utils/agricultureRequest'

export const getStockWarehouseList = (params = {}) => {
  const requestParams = {
    pageNum: params.pageNum || 1,
    pageSize: params.pageSize || 10
  }

  if (params.warehouseCode) requestParams.warehouseCode = params.warehouseCode
  if (params.warehouseName) requestParams.warehouseName = params.warehouseName
  if (params.type) requestParams.type = params.type
  if (params.status !== undefined && params.status !== null && params.status !== '') {
    requestParams.status = params.status
  }

  return agricultureRequest({
    url: '/inventory/warehouse-manage/list',
    method: 'get',
    params: requestParams
  }).then(res => {
    if (res && Array.isArray(res.rows)) {
      res.rows = res.rows.map(item => toSnakeCase(item))
    }
    if (res.data && Array.isArray(res.data.rows)) {
      res.data.rows = res.data.rows.map(item => toSnakeCase(item))
    }
    return res
  })
}

export const getStockWarehouseDetail = (id) => {
  return agricultureRequest({
    url: `/inventory/warehouse-manage/${id}`,
    method: 'get'
  }).then(res => {
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

export const getStockListByWarehouse = (params = {}) => {
  const requestParams = {
    pageNum: params.pageNum || 1,
    pageSize: params.pageSize || 10,
    warehouseId: params.warehouseId
  }

  if (params.productId) requestParams.productId = params.productId
  if (params.mainCategory) requestParams.mainCategory = params.mainCategory
  if (params.subCategory) requestParams.subCategory = params.subCategory

  return agricultureRequest({
    url: '/inventory/stock/list',
    method: 'get',
    params: requestParams
  }).then(res => {
    if (res.rows && Array.isArray(res.rows)) {
      res.rows = res.rows.map(item => toSnakeCase(item))
    }
    return res
  })
}

export const getStockBatchList = (params = {}) => {
  const requestParams = {
    pageNum: params.pageNum || 1,
    pageSize: params.pageSize || 10,
    stockId: params.stockId
  }

  if (Array.isArray(params.stockIds) && params.stockIds.length) {
    requestParams.stockIds = params.stockIds.join(',')
  }

  if (params.warehouseId) requestParams.warehouseId = params.warehouseId
  if (params.productId) requestParams.productId = params.productId
  if (params.mainCategory) requestParams.mainCategory = params.mainCategory
  if (params.subCategory) requestParams.subCategory = params.subCategory
  if (params.batchNo) requestParams.batchNo = params.batchNo

  return agricultureRequest({
    url: '/inventory/stock/batch/list',
    method: 'get',
    params: requestParams
  }).then(res => {
    if (res.rows && Array.isArray(res.rows)) {
      res.rows = res.rows.map(item => toSnakeCase(item))
    }
    return res
  })
}
