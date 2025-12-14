import { defineStore } from 'pinia'
import { getCurrentUserInfo, getLogout, oauth2LoginWithCode } from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  getUserInfo,
  setUserInfo,
  removeUserInfo,
  redirectToLogin
} from '@/utils/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    // 添加响应式状态，初始化时从 localStorage 读取
    _token: getToken() || '',
    _userInfo: getUserInfo() || {}
  }),

  getters: {
    token() {
      // 优先使用响应式状态，确保同步更新
      return this._token || getToken() || ''
    },
    userInfo() {
      // 优先使用响应式状态，确保同步更新
      return this._userInfo || getUserInfo() || {}
    },
    isLogin() {
      return !!this._token || !!getToken()
    },
    hasToken() {
      return !!this._token || !!getToken()
    },
    hasUserInfo() {
      const userInfo = this._userInfo || getUserInfo() || {}
      return !!userInfo && Object.keys(userInfo).length > 0
    },
    // 获取用户角色列表
    userRoles() {
      const userInfo = this._userInfo || getUserInfo() || {}
      const roleStr = userInfo.user?.LOGIN_ROLE_VALUE?.['SMART-AGR'] || ''
      return roleStr.split(',').map(r => r.trim()).filter(r => r)
    },
    // 检查用户是否有指定角色
    hasRole() {
      return (roles) => {
        if (!roles || roles.length === 0) return true
        if (this.userRoles.includes('agri-admin')) return true // 超级管理员有所有权限
        return roles.some(role => this.userRoles.includes(role))
      }
    },
    // 检查用户是否有状态操作权限
    hasStatusPermission() {
      return (statusAction) => {
        // 状态操作权限映射
        const statusPermissions = {
          'create': ['agri-admin', 'OARI', 'RC'], // 创建
          'edit': ['agri-admin', 'OARI', 'RC'], // 编辑
          'submit': ['agri-admin', 'OARI', 'RC'], // 提交审核
          'approve': ['agri-admin', 'OARI'], // 审核通过
          'reject': ['agri-admin', 'OARI'], // 审核驳回
          'archive': ['agri-admin', 'OARI'], // 归档
          'cancel': ['agri-admin', 'OARI'], // 作废
          'view': ['agri-admin', 'OARI', 'RC', 'OSE', 'Union', 'Cooperative', 'OIA'] // 查看
        }
        
        const requiredRoles = statusPermissions[statusAction] || []
        return this.hasRole(requiredRoles)
      }
    }
  },

  actions: {
    setToken(token) {
      // 先更新响应式状态，确保立即可用
      this._token = token
      // 再持久化到 localStorage
      setToken(token)
      console.log('setToken: token已保存到响应式状态和localStorage')
    },

    setUserInfo(userInfo) {
      console.log('setUserInfo: 准备保存用户信息:', userInfo)
      // 先更新响应式状态，确保立即可用
      this._userInfo = userInfo
      // 再持久化到 localStorage
      setUserInfo(userInfo)
      console.log('setUserInfo: 用户信息已保存到响应式状态和localStorage')
    },

    // 清除本地token和用户信息
    logout() {
      // 清除响应式状态
      this._token = ''
      this._userInfo = {}
      // 清除 localStorage
      removeToken()
      removeUserInfo()
    },

    async logoutAndRedirect(delay = 0) {
      try {
        await getLogout()
        this.logout()
        
        if (delay > 0) {
          setTimeout(() => {
            redirectToLogin()
          }, delay)
        } else {
          redirectToLogin()
        }
      } catch (error) {
        console.error('登出失败', error)
        this.logout()
        if (delay > 0) {
          setTimeout(() => {
            redirectToLogin()
          }, delay)
        } else {
          redirectToLogin()
        }
      }
    },

    // 获取用户信息
    async fetchUserInfo() {
      if (!this.token) {
        console.warn('fetchUserInfo: 没有token，跳过获取用户信息')
        return
      }

      console.log('fetchUserInfo: 开始获取用户信息')
      try {
        const res = await getCurrentUserInfo()
        console.log('fetchUserInfo: API响应:', JSON.stringify(res))

        if (res.code === 200 && res.data) {
          console.log('fetchUserInfo: 用户信息获取成功，准备保存')
          this.setUserInfo(res.data)
          console.log('fetchUserInfo: 用户信息已保存，hasUserInfo:', this.hasUserInfo)
          return res.data
        } else {
          console.error('fetchUserInfo: 响应格式不正确或无数据')
        }
      } catch (error) {
        console.error('fetchUserInfo: 请求失败:', error)
        throw error;
      }
    },

    // OAuth2授权码登录
    async Oauth2LoginWithCode(loginData) {
      try {
        const res = await oauth2LoginWithCode(
          loginData.code,
          loginData.redirectUri,
          loginData.grantType
        )
        console.log('OAuth2登录响应:', JSON.stringify(res))

        // 检查响应格式并提取 token
        if (res.code === 200) {
          // 尝试多种可能的 token 位置
          const token = res.token || res.data?.token || res.data?.access_token || res.access_token

          if (token) {
            console.log('Token提取成功，准备保存')
            this.setToken(token)

            // 获取用户信息
            try {
              const userInfo = await this.fetchUserInfo()
              console.log('用户信息获取成功:', userInfo ? '有数据' : '无数据')
              return true
            } catch (error) {
              console.error('获取用户信息失败:', error)
              // 即使获取用户信息失败，token 已保存，返回 true
              // 让路由守卫或 Layout 组件再次尝试
              return true
            }
          } else {
            console.error('响应中未找到 token')
            return false
          }
        }
        console.error('登录失败，响应码:', res.code)
        return false
      } catch (error) {
        console.error('OAuth2授权码登录失败', error)
        throw error
      }
    }
  }
}) 