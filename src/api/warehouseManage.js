import agricultureRequest, { toSnakeCase } from '../utils/agricultureRequest'

const normalizeListResponse = (res) => {
  if (res.data && Array.isArray(res.data.rows)) {
    res.data.list = res.data.rows.map(item => toSnakeCase(item))
    res.data.total = res.data.total || 0
  } else if (res.rows && Array.isArray(res.rows)) {
    res.data = {
      list: res.rows.map(item => toSnakeCase(item)),
      total: res.total || 0
    }
  } else if (res.data && Array.isArray(res.data.list)) {
    res.data.list = res.data.list.map(item => toSnakeCase(item))
  }
  return res
}

export const listWarehouseManage = (params = {}) => {
  const requestParams = {
    pageNum: params.pageNum || 1,
    pageSize: params.pageSize || 10
  }

  if (params.warehouseCode) requestParams.warehouseCode = params.warehouseCode
  if (params.warehouseName) requestParams.warehouseName = params.warehouseName
  if (params.type) requestParams.type = params.type
  if (params.orgName) requestParams.orgName = params.orgName
  if (params.adminLevel) requestParams.adminLevel = params.adminLevel
  if (params.status) requestParams.status = params.status

  return agricultureRequest({
    url: '/inventory/warehouse-manage/list',
    method: 'get',
    params: requestParams
  }).then(normalizeListResponse)
}

export const getWarehouseManage = (id) => {
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

export const addWarehouseManage = (data) => {
  return agricultureRequest({
    url: '/inventory/warehouse-manage',
    method: 'post',
    data
  })
}

export const updateWarehouseManage = (data) => {
  return agricultureRequest({
    url: '/inventory/warehouse-manage',
    method: 'put',
    data
  })
}

export const deleteWarehouseManage = (id) => {
  return agricultureRequest({
    url: `/inventory/warehouse-manage/${id}`,
    method: 'delete'
  })
}
