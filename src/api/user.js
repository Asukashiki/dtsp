import request from '../utils/request'

// 获取当前用户信息（OAuth2）
export const getCurrentUserInfo = () => {
  return request({
    url: '/oauth2/getCurrentUserInfo',
    method: 'get',
    params: {
      appId: 'INSPUR-ICD'
    }
  })
} 

export const postUserUpdate = (params) => {
  return request({
    url: '/user/update',
    method: 'post',
    data: params 
  })
} 

export const postResetPassword = (params) => {
  return request({
    url: '/oauth2/resetPassword',
    method: 'post',
    data: params 
  })
} 

export const getLogout = () => {
  return request({
    url: '/oauth2/logout',
    method: 'get'
  })
} 
