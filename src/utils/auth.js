/**
 * 认证相关的工具函数
 */
import {getLogout } from '@/api/user'

/**
 * 从URL中提取token
 * 支持两种格式：
 * 1. Hash中的token: http://example.com/#token=xxx
 * 2. 查询参数中的token: http://example.com/?token=xxx
 * @returns {string|null} 返回token字符串，如果没有则返回null
 */
export function getTokenFromUrl() {
  // 优先检查URL hash中是否包含token（OAuth2 Implicit Flow常用方式）
  const hash = window.location.hash
  if (hash && hash.includes('token=')) {
    const tokenMatch = hash.match(/token=([^&]+)/)
    return tokenMatch ? tokenMatch[1] : null
  }
  
  // 其次检查URL查询参数中是否包含token
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('token')
}

/**
 * 从localStorage中获取token
 * @returns {string|null} token字符串，如果不存在则返回null
 */
export function getToken() {
  return localStorage.getItem('token')
}

/**
 * 设置token到localStorage
 * @param {string} token - 需要存储的token字符串
 */
export function setToken(token) {
  localStorage.setItem('token', token)
}

/**
 * 从localStorage中移除token
 */
export function removeToken() {
  localStorage.removeItem('token')
}

/**
 * 获取用户信息
 * @returns {Object} 用户信息对象，如果不存在则返回空对象
 */
export function getUserInfo() {
  const userInfoStr = localStorage.getItem('userInfo')
  return userInfoStr ? JSON.parse(userInfoStr) : {}
}

/**
 * 设置用户信息到localStorage
 * @param {Object} userInfo - 用户信息对象
 */
export function setUserInfo(userInfo) {
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

/**
 * 从localStorage中移除用户信息
 */
export function removeUserInfo() {
  localStorage.removeItem('userInfo')
}


export async function redirectToLogin() {
  const isDev = import.meta.env.DEV
  const LOGIN_URL = isDev ? import.meta.env.VITE_APP_API_URL : location.origin
  const redirectUrl = window.location.origin + '/ditp/'
  
  // 构建OAuth2授权URL
  const authUrl = `${LOGIN_URL}/auth/oauth2/authorize?response_type=token&client_id=icd&redirect_uri=${redirectUrl}`
  
  window.location.href = authUrl
} 