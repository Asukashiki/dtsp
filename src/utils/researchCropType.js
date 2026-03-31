import { getDicts } from '@/api/system/dict'
import { parseI18nValue } from '@/utils/i18nHelper'

const normalizeOptionLabel = (item, locale) => parseI18nValue(item.dictLabel, locale, item.dictLabel)

export async function loadSeedCropTypeOptions(locale = 'en-US') {
  const [mainRes, subRes] = await Promise.all([
    getDicts('inventory_main_category'),
    getDicts('inventory_sub_category')
  ])

  const mainOptions = (mainRes.data || []).map(item => ({
    label: normalizeOptionLabel(item, locale),
    value: item.dictValue
  }))

  const seedMainCategory = mainOptions.find(item => String(item.value).toUpperCase() === 'SEED')
    || mainOptions.find(item => ['seed', '种子'].includes(String(item.label).trim().toLowerCase()))

  const seedMainCategoryValue = seedMainCategory?.value || 'SEED'

  return (subRes.data || [])
    .filter(item => String(item.remark) === String(seedMainCategoryValue))
    .map(item => ({
      label: normalizeOptionLabel(item, locale),
      value: item.dictValue
    }))
}

export function resolveCropTypeOption(options, value) {
  if (!value) return null
  const normalizedOptions = Array.isArray(options) ? options : []
  return normalizedOptions.find(item => String(item.value) === String(value) || String(item.label) === String(value)) || null
}

export function resolveCropTypeValue(options, value) {
  const match = resolveCropTypeOption(options, value)
  return match ? match.value : value || ''
}

export function resolveCropTypeLabel(options, value) {
  const match = resolveCropTypeOption(options, value)
  return match ? match.label : value || ''
}

export function getCropTypeDisplay(options, value) {
  return resolveCropTypeLabel(options, value) || '-'
}
