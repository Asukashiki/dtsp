import request from '@/utils/request'

export const postAppRegister = (params) => {
    return request({
      url: '/rbac/app/register',
      method: 'post',
      data: params
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