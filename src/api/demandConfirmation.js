import request from '@/utils/request'

export const getDemandConfirmationList = (params) => {
  return request({
    url: '/agriculture/demand/confirmation/list',
    method: 'get',
    params
  })
}

export const getDemandConfirmationDetail = (id) => {
  return request({
    url: `/agriculture/demand/confirmation/${id}`,
    method: 'get'
  })
}

export const getDemandConfirmationByActors = (params) => {
  return request({
    url: '/agriculture/demand/confirmation/byActors',
    method: 'get',
    params
  })
}

export const addDemandConfirmation = (data) => {
  return request({
    url: '/agriculture/demand/confirmation',
    method: 'post',
    data
  })
}

export const deleteDemandConfirmation = (id) => {
  return request({
    url: `/agriculture/demand/confirmation/${id}`,
    method: 'delete'
  })
}

export const batchDeleteDemandConfirmation = (ids) => {
  return request({
    url: '/agriculture/demand/confirmation/batch',
    method: 'delete',
    data: ids
  })
}
