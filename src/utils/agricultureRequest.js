import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'

// 农业模块API基础URL配置
const AGRICULTURE_API_URL = import.meta.env.DEV
  ? import.meta.env.VITE_APP_AGRICULTURE_API_URL
  : import.meta.env.VITE_APP_API_URL

// 用于防止重复提示
let isRedirecting = false

const agricultureRequest = axios.create({
  baseURL: AGRICULTURE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
agricultureRequest.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`
    }
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
agricultureRequest.interceptors.response.use(
  response => {
    const res = response.data

    // 处理 status: 401 的情况（token 无效）
    if (res.status === 401) {
      handleUnauthorized(res.message || '登录已过期，请重新登录')
      return Promise.reject(new Error(res.message || '未授权'))
    }

    // 成功响应
    if (res.code === 200) {
      return res
    }

    if(Array.isArray(res)){
      return {
        code: 200,
        data: res
      }
    }

    // 处理业务错误
    const userStore = useUserStore()

    if (res.code === 401 && userStore.token) {
      handleUnauthorized(res.msg || res.message || '登录已过期，请重新登录')
      return Promise.reject(new Error(res.msg || res.message || '未授权'))
    }

    // 其他业务错误
    ElMessage({
      message: res.msg || res.message || '操作失败',
      type: 'error',
      duration: 3000
    })

    return Promise.reject(new Error(res.msg || res.message || '操作失败'))
  },
  error => {
    console.error('响应错误:', error)

    // 处理HTTP错误状态码
    if (error.response) {
      const { status, data } = error.response

      if (status === 401) {
        handleUnauthorized('登录已过期，请重新登录')
      } else if (status === 404) {
        ElMessage({
          message: '请求的资源不存在',
          type: 'error',
          duration: 3000
        })
      } else if (status === 500) {
        ElMessage({
          message: data?.msg || '服务器错误，请稍后重试',
          type: 'error',
          duration: 3000
        })
      } else {
        ElMessage({
          message: data?.msg || error.message || '请求失败',
          type: 'error',
          duration: 3000
        })
      }
    } else if (error.code === 'ECONNABORTED') {
      ElMessage({
        message: '请求超时，请检查网络连接',
        type: 'error',
        duration: 3000
      })
    } else {
      ElMessage({
        message: '网络错误，请检查您的网络连接',
        type: 'error',
        duration: 3000
      })
    }

    return Promise.reject(error)
  }
)

// 统一处理未授权的情况
function handleUnauthorized(message) {
  if (isRedirecting) return
  isRedirecting = true

  ElMessage({
    message,
    type: 'error',
    duration: 2000
  })

  const userStore = useUserStore()
  userStore.logoutAndRedirect(1500)

  setTimeout(() => {
    isRedirecting = false
  }, 3000)
}

// 数据转换工具：下划线转驼峰
export function toCamelCase(obj) {
  if (!obj || typeof obj !== 'object') return obj

  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCase(item))
  }

  const result = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
      result[camelKey] = toCamelCase(obj[key])
    }
  }
  return result
}

// 数据转换工具：驼峰转下划线
export function toSnakeCase(obj) {
  if (!obj || typeof obj !== 'object') return obj

  if (Array.isArray(obj)) {
    return obj.map(item => toSnakeCase(item))
  }

  const result = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
      result[snakeKey] = toSnakeCase(obj[key])
    }
  }
  return result
}

export default agricultureRequest
