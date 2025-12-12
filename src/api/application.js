import request from '@/utils/request'

export const postAppRegister = (params) => {
    return request({
      url: '/rbac/app/register',
      method: 'post',
      data: params
    })
  }

export const listSubRegionByCode = (params) => {
  return request({
    url: '/rbac/region/listSubRegionByCode',
    method: 'get',
    params: params
  })
}

export const listRegionNameById = (params) => {
  return request({
    url: '/rbac/region/listRegionNameById',
    method: 'get',
    params: params
  })
}

export const registerDa = (data) => {
  return request({
    url: '/rbac/user/registerDA',
    method: 'post',
    data: data
  })
}
export const getOrgansRegionByCode = (params) => {
  return request({
    url: '/rbac/organ/getOrgansByRegionCode',
    method: 'get',
    params: params
  })
}


export const allTree = (params) => {
  return request({
    url: '/rbac/organ/allTree',
    method: 'get',
    params: params
  })
}

export const getAppRecordList = (params) => {
  return request({
    url: '/rbac/app/register/list',
    method: 'post',
    data: params
  })
}

// 获取申请详情
export const getAppRecordDetail = (appId) => {
  return request({
    url: '/rbac/app/register/detail',
    method: 'get',
    params: { appId }
  })
}
