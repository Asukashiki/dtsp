import request from '@/utils/request'

export const postAppRegister = (params) => {
    return request({
      url: '/rbac/app/register',
      method: 'post',
      data: params
    })
  }