/**
 * 认证相关的工具函数
 */
import {getLogout } from '@/api/user'
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

// 重定向到登录页
export async function redirectToLogin() {
  const isDev = import.meta.env.DEV
  const LOGIN_URL = isDev ? import.meta.env.VITE_APP_API_URL : location.origin
  // const redirectUrl = encodeURIComponent(window.location.href)
  const url = window.location
  const redirectUrl = url.origin + url.pathname
  window.location.href = `${LOGIN_URL}/auth/oauth2/authorize?response_type=token&client_id=icd&redirect_uri=${redirectUrl}`
} 