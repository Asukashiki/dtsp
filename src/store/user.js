import { defineStore } from 'pinia'
import { getCurrentUserInfo } from '../api/user'
import { 
  getToken, 
  setToken, 
  removeToken, 
  getUserInfo, 
  setUserInfo, 
  removeUserInfo 
} from '../utils/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken() || '',
    userInfo: getUserInfo() || {}
  }),
  
  getters: {
    isLogin: (state) => !!state.token,
    hasToken: (state) => !!state.token,
    hasUserInfo: (state) => !!state.userInfo && Object.keys(state.userInfo).length > 0
  },
  
  actions: {
    setToken(token) {
      this.token = token
      setToken(token)
    },
    
    setUserInfo(userInfo) {
      this.userInfo = userInfo
      setUserInfo(userInfo)
    },
    
    logout() {
      this.token = ''
      this.userInfo = {}
      removeToken()
      removeUserInfo()
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