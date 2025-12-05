import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/store'
import i18n from '@/i18n'

// 农业模块API基础URL配置
const AGRICULTURE_API_URL =  import.meta.env.VITE_APP_AGRICULTURE_API_URL

// 用于防止重复提示
let isRedirecting = false

// 获取国际化翻译函数
const t = (key) => {
  return i18n.global.t(key)
}

// 检测字符串是否包含中文字符
const containsChinese = (str) => {
  if (!str || typeof str !== 'string') return false
  return /[\u4e00-\u9fa5]/.test(str)
}

// 获取安全的错误消息（不包含中文）
const getSafeErrorMessage = (message, fallbackKey = 'common.error.operationFailed') => {
  if (!message || containsChinese(message)) {
    return t(fallbackKey)
  }
  return message
}

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
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
agricultureRequest.interceptors.response.use(
  response => {
    // 如果是 blob 类型的响应（文件下载），直接返回整个 response
    if (response.config.responseType === 'blob') {
      return response
    }

    const res = response.data

    // 处理blob类型响应（文件下载）
    if (response.config.responseType === 'blob') {
      return res
    }

    // 处理 status: 401 的情况（token 无效）
    if (res.status === 401) {
      const safeMsg = getSafeErrorMessage(res.message, 'common.error.unauthorized')
      handleUnauthorized(safeMsg)
      return Promise.reject(new Error(safeMsg))
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

    if ((res.code === 401 || res.status === 401) && userStore.token) {
      const safeMsg = getSafeErrorMessage(res.msg, 'common.error.unauthorized')
      handleUnauthorized(safeMsg)
      return Promise.reject(new Error(safeMsg))
    }

    // 其他业务错误 - 使用弹窗显示详细错误信息
    const rawMessage = res.msg || res.message || ''
    const errorMessage = getSafeErrorMessage(rawMessage, 'common.error.operationFailed')

    // 如果错误信息较长或包含换行，使用 MessageBox 显示
    if (errorMessage.length > 50 || errorMessage.includes('\n')) {
      ElMessageBox.alert(errorMessage, t('common.error.title'), {
        confirmButtonText: t('common.confirm'),
        type: 'error',
        dangerouslyUseHTMLString: false
      })
    } else {
      // 简短错误信息使用 Message 显示
      ElMessage({
        message: errorMessage,
        type: 'error',
        duration: 3000
      })
    }

    return Promise.reject(new Error(errorMessage))
  },
  error => {
      console.error('Response error:', error)

    // 处理HTTP错误状态码
    if (error.response) {
      const { status, data } = error.response

      if (status === 401) {
        handleUnauthorized(t('common.error.unauthorized'))
      } else if (status === 404) {
        ElMessage({
          message: t('common.error.notFound'),
          type: 'error',
          duration: 3000
        })
      } else if (status === 500) {
        // 服务器错误使用弹窗显示详细信息
        const rawMsg = data?.msg || data?.message || ''
        const errorMsg = getSafeErrorMessage(rawMsg, 'common.error.serverError')
        ElMessageBox.alert(errorMsg, t('common.error.serverError'), {
          confirmButtonText: t('common.confirm'),
          type: 'error',
          dangerouslyUseHTMLString: false
        })
      } else {
        // 其他HTTP错误
        const rawMsg = data?.msg || data?.message || error.message || ''
        const errorMsg = getSafeErrorMessage(rawMsg, 'common.error.requestFailed')
        if (errorMsg.length > 50 || errorMsg.includes('\n')) {
          ElMessageBox.alert(errorMsg, t('common.error.requestFailed'), {
            confirmButtonText: t('common.confirm'),
            type: 'error',
            dangerouslyUseHTMLString: false
          })
        } else {
          ElMessage({
            message: errorMsg,
            type: 'error',
            duration: 3000
          })
        }
      }
    } else if (error.code === 'ECONNABORTED') {
      ElMessage({
        message: t('common.error.timeout'),
        type: 'error',
        duration: 3000
      })
    } else {
      ElMessage({
        message: t('common.error.networkError'),
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
