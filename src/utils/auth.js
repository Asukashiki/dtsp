/**
 * 认证相关的工具函数
 */
import { getLogout } from '@/api/user'
import { parseI18nValue, localeToJsonKey } from './i18nHelper'

/**
 * 获取登录模式配置
 * @returns {string} 'sso' 或 'system'
 */
export function getLoginMode() {
  return import.meta.env.VITE_APP_LOGIN_MODE || 'system'
}

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
 * 从URL中提取授权码（OAuth2 Authorization Code Flow）
 * 支持两种格式：
 * 1. Hash中的code: http://example.com/#/callback?code=xxx
 * 2. 查询参数中的code: http://example.com/?code=xxx
 * @returns {string|null} 返回授权码字符串，如果没有则返回null
 */
export function getCodeFromUrl() {
  // 首先检查URL查询参数中是否包含code
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  if (code) return code

  // 检查hash中是否包含查询参数
  const hash = window.location.hash
  if (hash && hash.includes('?')) {
    const hashQuery = hash.split('?')[1]
    const hashParams = new URLSearchParams(hashQuery)
    return hashParams.get('code')
  }

  return null
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

/**
 * 解析部门名称（处理 JSON 字符串格式，支持国际化）
 */
function parseDeptName(deptName) {
  if (!deptName) return ''
  const locale = localStorage.getItem('i18n_locale') || 'zh-CN'
  return parseI18nValue(deptName, locale)
}

/**
 * 获取用户的组织名称（支持国际化）
 * @returns {string} 组织名称
 */
export function getUserOrgName() {
  const userInfo = getUserInfo()
  return parseDeptName(userInfo.deptName) || ''
}

/**
 * 获取用户的组织ID
 * @returns {string} 组织ID
 */
export function getUserOrgId() {
  const userInfo = getUserInfo()
  return userInfo.deptId  || ''
}

export function redirectToLogin() {
  const loginMode = getLoginMode()

  if (loginMode === 'sso') {
    // SSO模式：跳转到OAuth2授权服务器
    const isDev = import.meta.env.DEV
    const OAUTH2_SERVER = isDev
      ? import.meta.env.VITE_APP_OAUTH2_SERVER
      : location.origin
    const OAUTH2_BASE_API = import.meta.env.VITE_APP_OAUTH2_BASE_API
    const OAUTH2_SERVER_CODE_GENERATE = import.meta.env.VITE_APP_OAUTH2_SERVER_CODE_GENERATE
    const OAUTH2_TYPE = import.meta.env.VITE_APP_OAUTH2_TYPE
    const OAUTH2_CALLBACK = import.meta.env.VITE_APP_OAUTH2_CALLBACK
    const CLIENT_ID = import.meta.env.VITE_APP_OAUTH2_CLIENT_ID

    // 构建回调地址
    const redirectUrl = window.location.origin + window.location.pathname + '#' + OAUTH2_CALLBACK

    // 构建OAuth2授权码流程URL
    const authUrl = `${OAUTH2_SERVER}${OAUTH2_BASE_API}${OAUTH2_SERVER_CODE_GENERATE}?${OAUTH2_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}`

    window.location.href = authUrl
  } else {
    // System模式：跳转到本地登录页
    // window.location.hash = '/login' 会保留当前的 base path (如 /agriculture/)
    // 结果将是 http://host:port/agriculture/#/login
    window.location.hash = '/login'
  }
}