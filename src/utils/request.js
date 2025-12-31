import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'

// API基础URL配置
const API_BASE_URL = import.meta.env.DEV ? '' : import.meta.env.VITE_APP_API_URL
// API认证上下文路径
const AUTH_CONTEXT = '/auth'


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
    // 如果是 blob 类型的响应（文件下载），直接返回 data
    // 检查 responseType 或者 Content-Type
    const contentType = response.headers['content-type'] || ''
    const isBlob = response.config.responseType === 'blob' || 
                   contentType.includes('application/vnd.openxmlformats') ||
                   contentType.includes('application/octet-stream') ||
                   contentType.includes('application/vnd.ms-excel')
    
    if (isBlob) {
      return response.data
    }

    const userStore = useUserStore()
    const res = response.data
    // 根据实际情况调整
    if (res.code !== 200 && userStore.token) {
      
      if (res.code === 401 || res.status === 401) {
        handleUnauthorized(res.message || 'Login expired, please log in again')
      } else if (res.code === 500) {
          handleUnauthorized(res.message || 'Login expired, please log in again')
      } else {
        ElMessage({
          message: res.msg || 'Request error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.msg || 'Request error'))
    } else {
      return res
    }
  },
  error => {
    // 处理HTTP错误状态码
    if (error.response) {
      const { status, config } = error.response
      console.log('status',status)
      
      // 如果是 blob 类型的错误响应，尝试解析错误信息
      if (config && config.responseType === 'blob') {
        const reader = new FileReader()
        reader.onload = () => {
          try {
            const errorData = JSON.parse(reader.result)
            ElMessage({
              message: errorData.msg || errorData.message || 'Download failed',
              type: 'error',
              duration: 5 * 1000
            })
          } catch (e) {
            ElMessage({
              message: 'Download failed',
              type: 'error',
              duration: 5 * 1000
            })
          }
        }
        reader.readAsText(error.response.data)
        return Promise.reject(error)
      }
      
      // 未授权或token过期
      if (status === 401) {
        handleUnauthorized('Login expired, please log in again')
      } else {
        ElMessage({
          message: error.message || 'Request failed',
          type: 'error',
          duration: 5 * 1000
        })
      }
    } else {
      ElMessage({
        message: 'Network error, please check your network connection',
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

export default request 