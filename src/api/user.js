import request from '../utils/request'
import authRequest from '../utils/authRequest'

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

const AUTH_BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_APP_AGRICULTURE_API_URL : ''

// OAuth2授权码登录
export const oauth2LoginWithCode = (code, redirectUri, grantType) => {
  const data = {
    code,
    redirectUri,
    grantType
  }
  return (import.meta.env.DEV
    ? request({
    url: AUTH_BASE_URL + '/ucif/oauth/codeLogin',
    headers: {
      isToken: false,
      repeatSubmit: false
    },
    method: 'post',
    data: data
  }) 
  : authRequest({
    url: '/ucif/oauth/codeLogin',
    headers: {
      isToken: false,
      repeatSubmit: false
    },
    method: 'post',
    data: data
  }))
} 
