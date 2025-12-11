/**
 * I18n utilities for parsing and displaying multi-language fields
 * Note: This file is kept for backward compatibility.
 * New code should use @/utils/i18nHelper directly.
 */

import { useLocaleStore } from '@/store'
import { parseI18nValue, buildI18nValue, SUPPORTED_LOCALES } from '@/utils/i18nHelper'

/**
 * Get the localized text from an i18n object or JSON string
 * @param {Object|String} value - The i18n value (object or JSON string)
 * @param {String} fallbackLang - Fallback language code if current lang not found (unused, kept for compatibility)
 * @returns {String} - The localized text
 */
export function getI18nText(value, fallbackLang = 'en_US') {
  if (!value) return ''
  
  // Get current locale
  const localeStore = useLocaleStore()
  const currentLocale = localeStore.locale || 'en-US'  // zh-CN or en-US format
  
  return parseI18nValue(value, currentLocale, '')
}

/**
 * Convert i18n object to JSON string for storage
 * @param {Object} value - The i18n object
 * @returns {String} - JSON string
 */
export function toI18nJson(value) {
  if (!value) return ''
  if (typeof value === 'string') return value
  return JSON.stringify(value)
}

/**
 * Check if all required languages have values
 * @param {Object} value - The i18n object
 * @param {Array} requiredLangs - Required language codes (default: all supported languages)
 * @returns {Boolean}
 */
export function isI18nComplete(value, requiredLangs = null) {
  if (!value || typeof value !== 'object') return false
  
  // Default to all supported language keys
  const langs = requiredLangs || SUPPORTED_LOCALES.map(l => l.jsonKey)
  return langs.every(lang => value[lang] && value[lang].trim() !== '')
}

// Re-export from i18nHelper for convenience
export { parseI18nValue, buildI18nValue, SUPPORTED_LOCALES }

