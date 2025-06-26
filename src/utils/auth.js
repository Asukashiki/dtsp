/**
 * 认证相关的工具函数
 */

// 从URL中获取token
export function getTokenFromUrl() {
  // 检查URL hash中是否包含token
  const hash = window.location.hash
  if (hash && hash.includes('token=')) {
    return hash.split('token=')[1].split('&')[0]
  }
  
  // 检查URL查询参数中是否包含token
  const urlParams = new URLSearchParams(window.location.search)
  const tokenParam = urlParams.get('token')
  if (tokenParam) {
    return tokenParam
  }
  
  return null
}

// 清除URL中的hash
export function clearUrlHash() {
  // 获取当前URL的基本部分（不包含hash和查询参数）
  const url = window.location.href.split('#')[0].split('?')[0];
  // 获取查询参数（如果有）
  const search = window.location.search;
  // 使用history API替换当前URL，保留查询参数但移除hash
  window.history.replaceState(null, '', url + search);
}

// 从localStorage中获取token
export function getToken() {
  return localStorage.getItem('token')
}

// 设置token到localStorage
export function setToken(token) {
  localStorage.setItem('token', token)
}

// 从localStorage中移除token
export function removeToken() {
  localStorage.removeItem('token')
}

// 获取用户信息
export function getUserInfo() {
  const userInfoStr = localStorage.getItem('userInfo')
  return userInfoStr ? JSON.parse(userInfoStr) : {}
}

// 设置用户信息
export function setUserInfo(userInfo) {
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

// 移除用户信息
export function removeUserInfo() {
  localStorage.removeItem('userInfo')
} 