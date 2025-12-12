/**
 * 统一的国际化 JSON 解析工具
 * 支持动态语言配置，不硬编码语言代码
 * 
 * 用于解析数据库中存储的国际化 JSON 格式数据：
 * {"zh_CN": "中文值", "en_US": "English value", "am_ET": "አማርኛ"}
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * 获取支持的语言列表
 * 可以从配置或 i18n 实例中获取
 */
export const SUPPORTED_LOCALES = [
  { code: 'en-US', label: 'English', jsonKey: 'en_US' },
  { code: 'zh-CN', label: '简体中文', jsonKey: 'zh_CN' },
  // 未来可添加更多语言
  // { code: 'am-ET', label: 'አማርኛ', jsonKey: 'am_ET' },
  // { code: 'om-ET', label: 'Afaan Oromoo', jsonKey: 'om_ET' },
]

/**
 * 将 i18n locale (如 zh-CN) 转换为 JSON key (如 zh_CN)
 */
export function localeToJsonKey(locale) {
  const found = SUPPORTED_LOCALES.find(l => l.code === locale)
  if (found) return found.jsonKey
  
  // 回退：将 - 替换为 _
  return locale.replace(/-/g, '_')
}

/**
 * 将 JSON key (如 zh_CN) 转换为 i18n locale (如 zh-CN)
 */
export function jsonKeyToLocale(jsonKey) {
  const found = SUPPORTED_LOCALES.find(l => l.jsonKey === jsonKey)
  if (found) return found.code
  
  // 回退：将 _ 替换为 -
  return jsonKey.replace(/_/g, '-')
}

/**
 * 解析国际化 JSON 字符串或对象
 * @param {string|object} value - JSON 字符串或已解析的对象
 * @param {string} locale - 当前语言 (如 zh-CN)
 * @param {string} fallback - 解析失败时的回退值
 * @returns {string} - 解析后的值
 */
export function parseI18nValue(value, locale, fallback = '') {
  if (!value) return fallback
  
  // 如果是字符串，尝试解析 JSON
  let obj = value
  if (typeof value === 'string') {
    // 如果不是 JSON 格式，直接返回
    if (!value.startsWith('{')) {
      return value
    }
    try {
      obj = JSON.parse(value)
    } catch {
      return value
    }
  }
  
  // 如果不是对象，返回原值
  if (typeof obj !== 'object' || obj === null) {
    return String(value)
  }
  
  // 获取 JSON key
  const jsonKey = localeToJsonKey(locale)
  
  // 按优先级查找值
  if (obj[jsonKey] !== undefined) {
    return obj[jsonKey]
  }
  
  // 回退顺序：en_US -> zh_CN -> 第一个可用值 -> fallback
  if (obj['en_US'] !== undefined) return obj['en_US']
  if (obj['zh_CN'] !== undefined) return obj['zh_CN']
  
  // 返回第一个可用的值
  const keys = Object.keys(obj)
  if (keys.length > 0) {
    return obj[keys[0]]
  }
  
  return fallback
}

/**
 * 检查值是否为国际化 JSON 格式
 */
export function isI18nValue(value) {
  if (!value || typeof value !== 'string') return false
  if (!value.startsWith('{')) return false
  
  try {
    const obj = JSON.parse(value)
    // 检查是否包含任何支持的语言 key
    return SUPPORTED_LOCALES.some(l => obj[l.jsonKey] !== undefined)
  } catch {
    return false
  }
}

/**
 * 从国际化 JSON 中提取各语言值
 * @param {string} value - JSON 字符串
 * @returns {object} - { zh_CN: '...', en_US: '...', ... }
 */
export function extractI18nValues(value) {
  const result = {}
  SUPPORTED_LOCALES.forEach(l => {
    result[l.jsonKey] = ''
  })
  
  if (!value) return result
  
  if (typeof value === 'string' && value.startsWith('{')) {
    try {
      const obj = JSON.parse(value)
      SUPPORTED_LOCALES.forEach(l => {
        result[l.jsonKey] = obj[l.jsonKey] || ''
      })
    } catch {
      // 解析失败，返回空值
    }
  }
  
  return result
}

/**
 * 构建国际化 JSON 字符串
 * @param {object} values - { zh_CN: '...', en_US: '...', ... }
 * @returns {string} - JSON 字符串
 */
export function buildI18nValue(values) {
  const obj = {}
  SUPPORTED_LOCALES.forEach(l => {
    if (values[l.jsonKey] !== undefined && values[l.jsonKey] !== '') {
      obj[l.jsonKey] = values[l.jsonKey]
    }
  })
  return JSON.stringify(obj)
}

/**
 * useI18nLabel Hook
 * 用于在组件中解析国际化标签
 * 
 * @returns {{ resolveLabel: Function, currentJsonKey: ComputedRef<string> }}
 * 
 * @example
 * const { resolveLabel } = useI18nLabel()
 * const title = resolveLabel(menu.menuName)
 */
export function useI18nLabel() {
  const { locale } = useI18n()
  
  const currentJsonKey = computed(() => localeToJsonKey(locale.value))
  
  /**
   * 解析标签值
   * @param {string} value - 原始值（可能是 JSON 或普通字符串）
   * @param {string} fallback - 回退值
   */
  const resolveLabel = (value, fallback = '') => {
    return parseI18nValue(value, locale.value, fallback)
  }
  
  return {
    resolveLabel,
    currentJsonKey,
    locale
  }
}

export default {
  SUPPORTED_LOCALES,
  localeToJsonKey,
  jsonKeyToLocale,
  parseI18nValue,
  isI18nValue,
  extractI18nValues,
  buildI18nValue,
  useI18nLabel
}
