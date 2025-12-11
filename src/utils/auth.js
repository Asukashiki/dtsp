/**
 * 认证相关的工具函数
 */
import {getLogout } from '@/api/user'

// 移除不再使用的 OAuth2 相关函数


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


export function redirectToLogin() {
  // 直接跳转到本地登录页
  // window.location.hash = '/login' 会保留当前的 base path (如 /agriculture/)
  // 结果将是 http://host:port/agriculture/#/login
  window.location.hash = '/login'
} 