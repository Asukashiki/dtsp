import { defineStore } from 'pinia'
import { getCurrentUserInfo, getLogout } from '@/api/user'
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
  state: () => ({}),
  
  getters: {
    token() {
      return getToken() || ''
    },
    userInfo() {
      return getUserInfo() || {}
    },
    isLogin() {
      return !!getToken()
    },
    hasToken() {
      return !!getToken()
    },
    hasUserInfo() {
      const userInfo = getUserInfo() || {}
      return !!userInfo && Object.keys(userInfo).length > 0
    }
  },
  
  actions: {
    setToken(token) {
      setToken(token)
    },
    
    setUserInfo(userInfo) {
      setUserInfo(userInfo)
    },
    
    // 清除本地token和用户信息
    logout() {
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
      if (!this.token) return

      try {
        const res = await getCurrentUserInfo()
        if (res.code === 200 && res.data) {
          this.setUserInfo(res.data)
          return res.data
        }
      } catch (error) {
        throw error;
      }
    }
  }
}) 