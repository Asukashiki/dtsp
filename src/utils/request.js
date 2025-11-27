import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'

// API基础URL配置
const API_BASE_URL = import.meta.env.DEV ? '' : import.meta.env.VITE_APP_API_URL
// API认证上下文路径
const AUTH_CONTEXT = '/auth'


// 数据采集API基础URL配置
const AGRICULTURE_API_URL = import.meta.env.DEV
  ? import.meta.env.VITE_APP_LOCAL_TEST_API_URL
  : import.meta.env.VITE_APP_API_URL

// 用于防止重复提示
let isRedirecting = false

const request = axios.create({
  baseURL: API_BASE_URL + AUTH_CONTEXT,
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers['Authorization'] = `${userStore.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const userStore = useUserStore()
    const res = response.data
    // 根据实际情况调整
    if (res.code !== 200 && userStore.token) {
      
      if (res.code === 401 || res.status === 401) {
        handleUnauthorized(res.message || '登录已过期，请重新登录')
      } else if (res.code === 500) {
          handleUnauthorized(res.message || '登录已过期，请重新登录')
      } else {
        ElMessage({
          message: res.msg || '请求错误',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.msg || '请求错误'))
    } else {
      return res
    }
  },
  error => {
    // 处理HTTP错误状态码
    if (error.response) {
      const { status } = error.response
      console.log('status',status)
      // 未授权或token过期
      if (status === 401) {
        handleUnauthorized('登录已过期，请重新登录')
      } else {
        ElMessage({
          message: error.message || '请求失败',
          type: 'error',
          duration: 5 * 1000
        })
      }
    } else {
      ElMessage({
        message: '网络错误，请检查您的网络连接',
        type: 'error',
        duration: 5 * 1000
      })
    }
    
    return Promise.reject(error)
  }
)

// 统一处理未授权的情况
function handleUnauthorized(message) {
  // 防止重复提示和重复跳转
  if (isRedirecting) return
  isRedirecting = true
  
  ElMessage({
    message,
    type: 'error',
    duration: 3000
  })
  
  // 使用store中的完整登出流程
  const userStore = useUserStore()
  userStore.logoutAndRedirect(1500)
  
  // 重置标志位（虽然页面会跳转，但为了安全起见）
  setTimeout(() => {
    isRedirecting = false
  }, 3000)
}

// Create a separate request instance for data collection APIs (without /auth prefix)
const dataCollectionRequest = axios.create({
  baseURL: AGRICULTURE_API_URL,
  timeout: 10000
})

// Request interceptor for data collection
dataCollectionRequest.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor for data collection
dataCollectionRequest.interceptors.response.use(
  response => {
    const userStore = useUserStore()
    const res = response.data
    if (res.code !== 200 && userStore.token) {
      if (res.code === 401 || res.status === 401) {
        handleUnauthorized(res.message || '登录已过期，请重新登录')
      } else if (res.code === 500) {
        handleUnauthorized(res.message || '登录已过期，请重新登录')
      } else {
        ElMessage({
          message: res.msg || '请求错误',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.msg || '请求错误'))
    } else {
      return res
    }
  },
  error => {
    if (error.response) {
      const { status } = error.response
      if (status === 401) {
        handleUnauthorized('登录已过期，请重新登录')
      } else {
        ElMessage({
          message: error.message || '请求失败',
          type: 'error',
          duration: 5 * 1000
        })
      }
    } else {
      ElMessage({
        message: '网络错误，请检查您的网络连接',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export { dataCollectionRequest }
export default request 