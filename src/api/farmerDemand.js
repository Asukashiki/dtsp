import request from '../utils/agricultureRequest'

// 新增农民需求
export const addFarmerDemand = (data) => {
  return request({
    url: '/seed/demand/farmer/add',
    method: 'post',
    data
  })
}

// 修改农民需求
export const updateFarmerDemand = (data) => {
  return request({
    url: '/seed/demand/farmer/update',
    method: 'post',
    data
  })
}


export const updateAuditFarmerDemand = (data) => {
  return request({
    url: '/seed/demand/farmer/updateAudit',
    method: 'post',
    data
  })
}


// 农民需求详情
export const getFarmerDemandDetail = (id) => {
  return request({
    url: '/seed/demand/farmer/detail',
    method: 'get',
    params: { id }
  })
}

// 农民需求分页查询
export const getFarmerDemandPage = (data) => {
  return request({
    url: '/seed/demand/farmer/page',
    method: 'post',
    data
  })
}

// 删除农民需求
export const deleteFarmerDemand = (id) => {
  return request({
    url: '/seed/demand/farmer/delete',
    method: 'post',
    data: { id }
  })
}

// 提交审核
export const submitForAudit = (data) => {
  return request({
    url: '/seed/demand/audit/submit',
    method: 'post',
    data
  })
}

// 根据farmerId获取农民需求
export const getFarmerDemandByFarmerId = (farmerId, params = {}) => {
  return request({
    url: '/seed/demand/farmer/getByFarmerId',
    method: 'get',
    params: { farmerId, ...params }
  })
}
