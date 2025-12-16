/**
 * 字典数据 Hook
 * 提供统一的字典数据获取、缓存和格式化功能
 */
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getDicts } from '@/api/system/dict'
import { parseI18nValue } from '@/utils/i18nHelper'

// 全局字典缓存
const dictCache = new Map()

/**
 * 获取字典标签（支持 i18n）
 * @param {Object} item - 字典项
 * @param {String} locale - 语言代码 (zh-CN / en-US)
 * @returns {String} - 标签文本
 */
function getDictLabel(item, locale) {
  // 优先使用解析后的对象
  if (item.dictLabelObject) {
    return parseI18nValue(item.dictLabelObject, locale, item.dictLabel)
  }
  // 使用统一的国际化解析方法
  return parseI18nValue(item.dictLabel, locale, item.dictLabel || '')
}

/**
 * 字典数据 Hook
 * @param {String|String[]} dictTypes - 字典类型，单个或多个
 * @param {Object} options - 配置选项
 * @param {Boolean} options.immediate - 是否立即加载，默认 true
 * @param {Boolean} options.cache - 是否启用缓存，默认 true
 * @returns {Object} - 字典数据和工具方法
 */
export function useDict(dictTypes, hookOptions = {}) {
  const { immediate = true, cache = true } = hookOptions
  const { locale } = useI18n()
  
  // 标准化为数组
  const types = Array.isArray(dictTypes) ? dictTypes : [dictTypes]
  
  // 字典数据存储
  const dictData = ref({})
  const loading = ref(false)
  
  /**
   * 加载单个字典类型
   */
  async function loadDict(dictType) {
    // 检查缓存
    if (cache && dictCache.has(dictType)) {
      return dictCache.get(dictType)
    }
    
    try {
      const res = await getDicts(dictType)
      const data = res.data || []
      
      // 存入缓存
      if (cache) {
        dictCache.set(dictType, data)
      }
      
      return data
    } catch (error) {
      console.error(`Failed to load dict: ${dictType}`, error)
      return []
    }
  }
  
  /**
   * 加载所有字典
   */
  async function loadAllDicts() {
    loading.value = true
    try {
      const promises = types.map(async (type) => {
        const data = await loadDict(type)
        dictData.value[type] = data
      })
      await Promise.all(promises)
    } finally {
      loading.value = false
    }
  }
  
  /**
   * 刷新字典（忽略缓存）
   */
  async function refresh() {
    types.forEach(type => dictCache.delete(type))
    await loadAllDicts()
  }
  
  /**
   * 响应式的选项列表（用于模板中直接使用）
   * 返回 { dictType: [{ label, value }] } 的响应式对象
   */
  const options = computed(() => {
    const result = {}
    console.log("======",dictCache)
    for (const type of types) {
      const data = dictData.value[type] || []
      result[type] = data.map(item => ({
        label: getDictLabel(item, locale.value),
        value: item.dictValue,
        actualValue: item.actualValue,  // 实际值
        raw: item  // 保留原始数据
      }))
    }
    return result
  })
  
  /**
   * 获取指定字典类型的选项列表（用于 el-select）
   * 注意：在模板中推荐直接使用 options[dictType]
   * @param {String} dictType - 字典类型
   * @returns {Array} - [{ label, value }]
   */
  function getOptions(dictType) {
    return options.value[dictType] || []
  }
  
  /**
   * 根据值获取标签
   * @param {String} dictType - 字典类型
   * @param {String} value - 字典值
   * @returns {String} - 标签文本
   */
  function getLabelByValue(dictType, value) {
    const data = dictData.value[dictType] || []
    const item = data.find(d => d.dictValue === String(value))
    return item ? getDictLabel(item, locale.value) : value
  }
  
  /**
   * 根据值获取实际值
   * @param {String} dictType - 字典类型
   * @param {String} value - 字典值
   * @returns {String} - 实际值
   */
  function getActualValueByValue(dictType, value) {
    const data = dictData.value[dictType] || []
    const item = data.find(d => d.dictValue === String(value))
    return item ? item.actualValue : value
  }
  
  /**
   * 获取原始字典数据
   * @param {String} dictType - 字典类型
   * @returns {Array} - 原始数据列表
   */
  function getRawData(dictType) {
    return dictData.value[dictType] || []
  }
  
  // 立即加载
  if (immediate) {
    onMounted(() => {
      loadAllDicts()
    })
  }
  
  return {
    // 响应式数据
    dictData,
    loading,
    options,  // 响应式选项对象
    
    // 方法
    loadAllDicts,
    refresh,
    getOptions,
    getLabelByValue,
    getActualValueByValue,
    getRawData
  }
}

/**
 * 清除字典缓存
 * @param {String} dictType - 可选，指定类型则只清除该类型
 */
export function clearDictCache(dictType) {
  if (dictType) {
    dictCache.delete(dictType)
  } else {
    dictCache.clear()
  }
}

export default useDict
