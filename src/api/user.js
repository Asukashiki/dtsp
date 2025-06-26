import request from '../utils/request'

// 获取当前用户信息（OAuth2）
export function getCurrentUserInfo() {
  return request({
    url: '/oauth2/getCurrentUserInfo',
    method: 'get',
    params: {
      appId: 'INSPUR-ICD'
    }
  })
} 