/**
 * 系统参数配置 Hook
 * 用于在组件中方便地读取系统参数配置
 * 参考 RuoYi 框架的 useDict 实现，支持国际化 JSON 格式
 */
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getConfigKey } from '@/api/system/config'
import { parseI18nValue } from '@/utils/i18nHelper'

// 配置缓存，避免重复请求
const configCache = new Map()

/**
 * 获取系统配置值（原始值，不解析国际化）
 * @param {string} configKey - 配置键名
 * @returns {Promise<string>} - 配置值
 */
export async function fetchConfigValue(configKey) {
  // 检查缓存
  if (configCache.has(configKey)) {
    return configCache.get(configKey)
  }
  
  try {
    const res = await getConfigKey(configKey)
    const value = res.msg || res.data || ''
    // 存入缓存
    configCache.set(configKey, value)
    return value
  } catch (error) {
    console.error(`获取系统配置[${configKey}]失败:`, error)
    return ''
  }
}

/**
 * 清除配置缓存
 * @param {string} configKey - 配置键名，不传则清除全部
 */
export function clearConfigCache(configKey) {
  if (configKey) {
    configCache.delete(configKey)
  } else {
    configCache.clear()
  }
}

/**
 * useConfig Hook
 * 用于在组件中响应式地获取系统配置，支持国际化 JSON 格式
 * 
 * @param {string} configKey - 配置键名
 * @param {string} defaultValue - 默认值
 * @returns {{ value: Ref<string>, rawValue: Ref<string>, loading: Ref<boolean>, refresh: Function }}
 * 
 * @example
 * const { value: siteName, loading } = useConfig('sys.application.name', '系统名称')
 */
export function useConfig(configKey, defaultValue = '') {
  const { locale } = useI18n()
  
  const rawValue = ref(defaultValue)  // 原始值
  const loading = ref(true)

  // 解析后的值（响应式，随语言切换自动更新）
  const value = computed(() => {
    return parseI18nValue(rawValue.value, locale.value, defaultValue)
  })

  const refresh = async () => {
    loading.value = true
    try {
      configCache.delete(configKey)
      rawValue.value = await fetchConfigValue(configKey) || defaultValue
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    try {
      rawValue.value = await fetchConfigValue(configKey) || defaultValue
    } finally {
      loading.value = false
    }
  })

  return {
    value,      // 解析后的值（支持国际化）
    rawValue,   // 原始值
    loading,
    refresh
  }
}

/**
 * useConfigs Hook
 * 批量获取多个系统配置，支持国际化 JSON 格式
 * 
 * @param {Object} configMap - 配置键名与默认值的映射 { key: defaultValue }
 * @returns {{ configs: Ref<Object>, rawConfigs: Ref<Object>, loading: Ref<boolean>, refresh: Function, getValue: Function }}
 */
export function useConfigs(configMap) {
  const { locale } = useI18n()
  
  const rawConfigs = ref({})  // 原始值
  const loading = ref(true)

  // 初始化默认值
  Object.keys(configMap).forEach(key => {
    rawConfigs.value[key] = configMap[key]
  })

  // 解析后的值（响应式，随语言切换自动更新）
  const configs = computed(() => {
    const result = {}
    Object.keys(rawConfigs.value).forEach(key => {
      result[key] = parseI18nValue(rawConfigs.value[key], locale.value, configMap[key])
    })
    return result
  })

  const getValue = (configKey) => {
    const raw = rawConfigs.value[configKey] || configMap[configKey] || ''
    return parseI18nValue(raw, locale.value, '')
  }

  const refresh = async () => {
    loading.value = true
    try {
      Object.keys(configMap).forEach(key => configCache.delete(key))
      const keys = Object.keys(configMap)
      const results = await Promise.all(keys.map(key => fetchConfigValue(key)))
      keys.forEach((key, index) => {
        rawConfigs.value[key] = results[index] || configMap[key]
      })
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    try {
      const keys = Object.keys(configMap)
      const results = await Promise.all(keys.map(key => fetchConfigValue(key)))
      keys.forEach((key, index) => {
        rawConfigs.value[key] = results[index] || configMap[key]
      })
    } finally {
      loading.value = false
    }
  })

  return {
    configs,
    rawConfigs,
    loading,
    refresh,
    getValue
  }
}

/**
 * 常用系统配置键名常量
 */
export const CONFIG_KEYS = {
  INIT_PASSWORD: 'sys.user.initPassword',
  APP_NAME: 'sys.application.name',
  APP_VERSION: 'sys.application.version',
  UPLOAD_MAX_SIZE: 'sys.upload.maxSize',
  UPLOAD_ALLOWED_TYPES: 'sys.upload.allowedTypes',
}

export default useConfig
