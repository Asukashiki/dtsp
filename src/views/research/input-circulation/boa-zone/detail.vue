<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('inputCirculation.releaseDetail') }}</h1>
          </div>
        </div>
      </div>

      <div class="content-wrapper" v-loading="loading">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>{{ $t('inputCirculation.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('inputCirculation.releaseId')">
                {{ displayMain('releaseId', 'release_id') }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.releaseName')">
                {{ displayMain('releaseName', 'release_name') }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.zoneId')">
                {{ displayMain('zoneId', 'zone_id') }}
              </el-descriptions-item>
              <el-descriptions-item label="source_organization">
                {{ displayMain('sourceOrganization', 'source_organization') }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.releaseYear')">
                {{ displayMain('releaseYear', 'release_year') }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('inputCirculation.releaseDate')">
                {{ displayMain('releaseDate', 'release_date') }}
              </el-descriptions-item>
              <el-descriptions-item label="allocation_type">
                {{ getAllocationTypeLabel(getMainField('allocationType', 'allocation_type')) }}
              </el-descriptions-item>
              <el-descriptions-item label="approved_by">
                {{ displayMain('approvedBy', 'approved_by') }}
              </el-descriptions-item>
              <el-descriptions-item label="approval_date">
                {{ displayMain('approvalDate', 'approval_date') }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-attachment-2"></i>
              <span>Attachment Information</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="1" border>
              <el-descriptions-item label="minute_file">
                <template v-if="minuteFileUrl">
                  <el-link :href="minuteFileUrl" target="_blank" type="primary">
                    {{ minuteFileName }}
                  </el-link>
                </template>
                <template v-else>-</template>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-list-check-line"></i>
              <span>{{ $t('inputCirculation.demandSelectionTitle') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-table :data="demandList" border v-loading="demandLoading">
              <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputType')" min-width="150">
                <template #default="{ row }">
                  {{ getMainCategoryLabel(row.inputType) }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputCategory')" min-width="150">
                <template #default="{ row }">
                  {{ getSubCategoryLabel(row.inputCategory) }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('farmerDemand.form.variety')" prop="variety" min-width="150">
                <template #default="{ row }">
                  {{ row.variety || '-' }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('farmerDemand.form.season')" prop="season" min-width="140">
                <template #default="{ row }">
                  {{ formatSeason(row.season) }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('districtAggregation.detailDialog.columns.totalQuantity')" prop="totalQuantity" min-width="120" />
            </el-table>
          </div>
        </div>

        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-line"></i>
              <span>{{ $t('inputCirculation.detailInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-table :data="detailData.details" border>
              <el-table-column type="index" width="80" />
              <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputType')" min-width="180">
                <template #default="{ row }">
                  {{ getMainCategoryLabel(row.inputType) }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('districtAggregation.detailDialog.columns.inputCategory')" min-width="180">
                <template #default="{ row }">
                  {{ getSubCategoryLabel(row.inputCategory) }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('farmerDemand.form.variety')" prop="variety" min-width="160">
                <template #default="{ row }">
                  {{ row.variety || '-' }}
                </template>
              </el-table-column>
              <el-table-column prop="season" :label="$t('farmerDemand.form.season')" min-width="160">
                <template #default="{ row }">
                  {{ formatSeason(row.season) }}
                </template>
              </el-table-column>
              <el-table-column prop="demandQuantity" :label="$t('inputCirculation.demandQuantity')" min-width="140" />
              <el-table-column prop="currentStock" :label="$t('inputCirculation.currentStock')" min-width="140" />
              <el-table-column prop="quantity" :label="$t('inputCirculation.quantity')" min-width="180" />
              <el-table-column :label="$t('inputCirculation.unit')" min-width="140">
                <template #default="{ row }">
                  {{ getUnitLabel(row.unit) }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('inputCirculation.outWarehouse')" min-width="180">
                <template #default="{ row }">
                  {{ row.outWarehouseName || row.outWarehouseCode || '-' }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getBoaZoneReleaseDetail, getDeptCategoryStock } from '@/api/inputCirculation'
import { getTownAggregationDetail } from '@/api/villageAggregation'
import { getDicts } from '@/api/system/dict'
import { parseI18nValue } from '@/utils/i18nHelper'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const detailData = ref({ main: {}, details: [] })
const demandList = ref([])
const demandLoading = ref(false)
const mainCategoryOptions = ref([])
const subCategoryOptions = ref([])
const unitOptions = ref([])

const allocationTypeOptions = [
  { label: 'Planned', value: 'Planned' },
  { label: 'Emergency', value: 'Emergency' },
  { label: 'Redistribution', value: 'Redistribution' }
]

const getMainField = (camelKey, snakeKey = camelKey) => {
  const main = detailData.value.main || {}
  const value = main[camelKey] ?? main[snakeKey]
  return value === undefined || value === null ? '' : value
}

const displayMain = (camelKey, snakeKey = camelKey) => {
  const value = getMainField(camelKey, snakeKey)
  return value === '' ? '-' : value
}

const getAllocationTypeLabel = (value) => {
  if (!value) return '-'
  const matched = allocationTypeOptions.find(item => item.value === value || item.label === value)
  return matched?.label || value
}

const getFileNameFromPath = (filePath = '') => {
  if (!filePath) return ''
  const normalizedPath = String(filePath).split('?')[0]
  return normalizedPath.split('/').pop() || normalizedPath.split('\\').pop() || 'attachment'
}

const minuteFileUrl = computed(() => getMainField('minuteFile', 'minute_file'))
const minuteFileName = computed(() => {
  const name = getMainField('minuteFileName', 'minute_file_name')
  return name || getFileNameFromPath(minuteFileUrl.value)
})

const getMainCategoryLabel = (value) => {
  if (!value) return '-'
  const match = mainCategoryOptions.value.find(item => String(item.value) === String(value) || item.label === value)
  return match?.label || value
}

const getSubCategoryLabel = (value) => {
  if (!value) return '-'
  const match = subCategoryOptions.value.find(item => String(item.value) === String(value) || item.label === value)
  return match?.label || value
}

const getUnitLabel = (value) => {
  if (!value) return '-'
  const match = unitOptions.value.find(item => String(item.value) === String(value) || String(item.label) === String(value))
  return match?.label || value
}

const SEASON_LABEL_MAP = {
  '1': 'Summer',
  '2': 'Spring',
  '3': 'Irrigation'
}

const formatSeason = (season) => {
  const normalizedSeason = String(season || '').trim()
  return SEASON_LABEL_MAP[normalizedSeason] || '-'
}

const getNormalizedSeasonCode = (season) => String(season || '').trim()
const getNormalizedDemandValue = (value) => String(value || '').trim()

const matchesDemandValue = (demandValue, targetValue, targetLabel) => {
  const normalizedDemand = getNormalizedDemandValue(demandValue)
  const normalizedTarget = getNormalizedDemandValue(targetValue)
  const normalizedLabel = getNormalizedDemandValue(targetLabel)
  return normalizedDemand === normalizedTarget || normalizedDemand === normalizedLabel
}

const findMatchedDemand = (inputType, inputCategory, variety = '', season = '') => {
  if (!inputType || !inputCategory) return null

  const inputTypeLabel = getMainCategoryLabel(inputType)
  const inputCategoryLabel = getSubCategoryLabel(inputCategory)
  const normalizedSeason = getNormalizedSeasonCode(season)
  const normalizedVariety = (variety || '').trim()

  return demandList.value.find(d => {
    const demandSeason = getNormalizedSeasonCode(d.season || d.seasonCode || d.season_code)
    const demandVariety = (d.variety || '').trim()
    return matchesDemandValue(d.inputType, inputType, inputTypeLabel) &&
      matchesDemandValue(d.inputCategory, inputCategory, inputCategoryLabel) &&
      (!normalizedSeason || demandSeason === normalizedSeason) &&
      (!normalizedVariety || !demandVariety || demandVariety === normalizedVariety)
  }) || null
}

const loadCategoryOptions = async () => {
  try {
    const [mainRes, subRes, unitRes] = await Promise.all([
      getDicts('inventory_main_category'),
      getDicts('inventory_sub_category'),
      getDicts('inventory_unit_new')
    ])

    mainCategoryOptions.value = (mainRes.data || []).map(item => ({
      label: parseI18nValue(item.dictLabel, locale.value, item.dictLabel),
      value: item.dictValue
    }))

    subCategoryOptions.value = (subRes.data || []).map(item => ({
      label: parseI18nValue(item.dictLabel, locale.value, item.dictLabel),
      value: item.dictValue,
      parentValue: item.remark
    }))

    unitOptions.value = (unitRes.data || []).map(item => ({
      label: parseI18nValue(item.dictLabel, locale.value, item.dictLabel),
      value: item.dictValue
    }))
  } catch (error) {
    console.error('Failed to load category options:', error)
  }
}

const normalizeStockItem = (item) => {
  if (!item) return null
  return {
    mainCategory: item.mainCategory ?? item.main_category ?? '',
    subCategory: item.subCategory ?? item.sub_category ?? '',
    productName: item.productName ?? item.product_name ?? '',
    availableQty: item.availableQty ?? item.available_qty ?? item.availableQuantity ?? 0
  }
}

const findMatchedStockItem = (items, inputTypeLabel, inputCategoryLabel, variety) => {
  const normalizedVariety = (variety || '').trim()
  return (items || [])
    .map(normalizeStockItem)
    .find(item => item &&
      item.mainCategory === inputTypeLabel &&
      item.subCategory === inputCategoryLabel &&
      (!normalizedVariety || !item.productName.trim() || item.productName.trim() === normalizedVariety))
}

const fetchCurrentStock = async () => {
  const deptId = userStore.userInfo?.deptId || userStore.userInfo?.user?.deptId
  if (!deptId) return

  const detailsWithStock = await Promise.all(detailData.value.details.map(async (detail) => {
    if (!detail.inputType || !detail.inputCategory || !detail.variety) {
      return { ...detail, currentStock: 0 }
    }

    try {
      const inputTypeLabel = getMainCategoryLabel(detail.inputType)
      const inputCategoryLabel = getSubCategoryLabel(detail.inputCategory)
      const res = await getDeptCategoryStock(deptId, inputTypeLabel, inputCategoryLabel, detail.variety)
      if (res.code === 200 && Array.isArray(res.data)) {
        const matched = findMatchedStockItem(res.data, inputTypeLabel, inputCategoryLabel, detail.variety)
        return { ...detail, currentStock: matched?.availableQty ?? 0 }
      }
    } catch (error) {
      console.error('Failed to fetch stock:', error)
    }

    return { ...detail, currentStock: 0 }
  }))

  detailData.value.details = detailsWithStock
}

const updateDemandQuantity = () => {
  detailData.value.details = detailData.value.details.map(detail => {
    const matchedDemand = findMatchedDemand(detail.inputType, detail.inputCategory, detail.variety, detail.season)
    return {
      ...detail,
      demandQuantity: matchedDemand?.totalQuantity || detail.demandQuantity || 0,
      season: detail.season || matchedDemand?.season || matchedDemand?.seasonCode || matchedDemand?.season_code || ''
    }
  })
}

const loadDemandList = async (regionCode) => {
  demandLoading.value = true
  try {
    const year = getMainField('releaseYear', 'release_year') || new Date().getFullYear().toString()
    const response = await getTownAggregationDetail({ sourceCode: regionCode, year })
    if (response.code === 200) {
      demandList.value = response.data || []
    }
  } catch (error) {
    console.error('Failed to load demand list:', error)
  } finally {
    demandLoading.value = false
  }
}

const normalizeDetails = (list) => {
  if (!Array.isArray(list)) return []
  return list.map(item => ({
    ...item,
    inputType: item.inputType ?? item.input_type,
    inputCategory: item.inputCategory ?? item.input_category,
    season: item.season || item.seasonCode || item.season_code || '',
    variety: item.variety || '',
    varietyId: item.varietyId || item.variety_id || item.productId || item.product_id || '',
    demandQuantity: item.demandQuantity ?? item.demand_quantity,
    unitPrice: item.unitPrice ?? item.unit_price,
    currentStock: item.currentStock ?? item.current_stock,
    maxQuantity: item.maxQuantity ?? item.max_quantity,
    outWarehouseCode: item.outWarehouseCode ?? item.out_warehouse_code,
    outWarehouseName: item.outWarehouseName ?? item.out_warehouse_name,
    inWarehouseCode: item.inWarehouseCode ?? item.in_warehouse_code,
    inWarehouseName: item.inWarehouseName ?? item.in_warehouse_name
  }))
}

const fetchDetail = async () => {
  loading.value = true
  try {
    const response = await getBoaZoneReleaseDetail(route.params.id)
    if (response.code === 200) {
      const data = response.data || {}
      const rawDetails = data.details || data.detailList || []
      detailData.value = {
        main: data.main || {},
        details: normalizeDetails(rawDetails)
      }

      const regionCode = getMainField('zoneId', 'zone_id')
      if (regionCode) {
        await loadDemandList(regionCode)
      }
      updateDemandQuantity()
      await fetchCurrentStock()
    }
  } catch (error) {
    ElMessage.error(t('common.queryFailed'))
  } finally {
    loading.value = false
  }
}

const handleBack = () => router.back()

onMounted(async () => {
  await loadCategoryOptions()
  await fetchDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
