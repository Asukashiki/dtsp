<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        icon="ri-stack-line"
        :title="$t('input.inventory.stockQuery.detailTitle')"
        :show-back="true"
        @back="handleBack" />

      <div class="content-wrapper">
        <InfoCard :title="$t('input.inventory.stockQuery.sections.warehouseInfo')" icon="ri-home-gear-line">
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('input.inventory.stockQuery.columns.warehouseCode')">{{ warehouseDetail.warehouse_code || '-' }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.inventory.stockQuery.columns.warehouseName')">{{ warehouseDetail.warehouse_name || '-' }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.inventory.stockQuery.columns.orgName')">{{ warehouseDetail.org_name || '-' }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.inventory.stockQuery.columns.location')">{{ warehouseDetail.location || '-' }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.inventory.stockQuery.columns.status')">{{ getStatusLabel(warehouseDetail.status) }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.inventory.stockQuery.columns.updateTime')">{{ warehouseDetail.update_time || '-' }}</el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <InfoCard :title="$t('input.inventory.stockQuery.sections.stockList')" icon="ri-file-list-3-line">
          <el-tabs v-model="activeTab" class="stock-tabs" @tab-change="handleTabChange">
            <el-tab-pane
              v-for="item in stockGroups"
              :key="item.key"
              :label="item.label"
              :name="item.key">
              <el-table v-loading="batchLoading" :data="batchList" stripe>
                <el-table-column prop="batch_no" :label="$t('input.inventory.stockQuery.columns.batchNo')" min-width="160" show-overflow-tooltip />
                <el-table-column prop="expire_date" :label="$t('input.inventory.stockQuery.columns.expireDate')" min-width="160" :formatter="formatDateTime" />
                <el-table-column prop="qty" :label="$t('input.inventory.stockQuery.columns.qty')" min-width="120" align="right" />
                <el-table-column prop="stock_status" :label="$t('input.inventory.stockQuery.columns.stockStatus')" min-width="120" />
              </el-table>
            </el-tab-pane>
          </el-tabs>
          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="batchPagination.pageNum"
              v-model:page-size="batchPagination.pageSize"
              :page-sizes="[10, 20, 50, 100]"
              :total="batchPagination.total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleBatchSizeChange"
              @current-change="handleBatchPageChange" />
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getStockBatchList, getStockListByWarehouse, getStockWarehouseDetail } from '@/api/stockQuery'
import { PageHeader, InfoCard } from '@/components/common'
import { useDict } from '@/hooks/useDict'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const warehouseId = route.params.id

const warehouseDetail = reactive({})
const stockList = ref([])
const stockGroups = ref([])
const activeTab = ref('')
const batchList = ref([])

const stockLoading = ref(false)
const batchLoading = ref(false)

const batchPagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

const batchQuery = reactive({
  stockId: null
})

const batchStockIds = ref([])

const { options: dictOptions } = useDict(['inventory_main_category', 'inventory_sub_category'])
const mainCategoryOptions = computed(() => dictOptions.value.inventory_main_category || [])
const subCategoryOptions = computed(() => dictOptions.value.inventory_sub_category || [])

const getMainCategoryLabel = (value) => {
  const match = mainCategoryOptions.value.find(item => String(item.value) === String(value))
  return match ? match.label : value || '-'
}

const getSubCategoryLabel = (value) => {
  const match = subCategoryOptions.value.find(item => String(item.value) === String(value))
  return match ? match.label : value || '-'
}

const buildStockGroups = (list) => {
  const groupMap = new Map()
  list.forEach(item => {
    const mainLabel = getMainCategoryLabel(item.main_category)
    const subLabel = getSubCategoryLabel(item.sub_category)
    const label = `${mainLabel}-${subLabel}`
    const key = `${item.main_category || ''}-${item.sub_category || ''}`
    if (!groupMap.has(key)) {
      groupMap.set(key, { key, label, items: [] })
    }
    groupMap.get(key).items.push(item)
  })
  const result = Array.from(groupMap.values())
  stockGroups.value = result
  if (!activeTab.value && result.length > 0) {
    activeTab.value = result[0].key
    const firstGroup = result[0]
    batchStockIds.value = firstGroup.items.map(item => item.id)
    batchQuery.stockId = firstGroup.items[0]?.id || null
    batchPagination.pageNum = 1
    loadBatch()
  }
}

watch(() => [mainCategoryOptions.value.length, subCategoryOptions.value.length], () => {
  if (stockList.value.length) {
    buildStockGroups(stockList.value)
  }
})

const getStatusLabel = (value) => {
  if (value === '0') return t('input.inventory.warehouse.status.enabled')
  if (value === '1') return t('input.inventory.warehouse.status.disabled')
  if (value === '2') return t('input.inventory.warehouse.operatingStatusOptions.maintenance')
  return value || '-'
}

const formatDateTime = (_row, _column, value) => {
  if (!value) return '-'
  if (typeof value === 'string' && value.trim()) {
    const trimmed = value.trim()
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed
    const parsed = new Date(trimmed)
    if (!Number.isNaN(parsed.getTime())) {
      const pad = (num) => String(num).padStart(2, '0')
      return `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())} ${pad(parsed.getHours())}:${pad(parsed.getMinutes())}:${pad(parsed.getSeconds())}`
    }
    return trimmed
  }
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return String(value)
  const pad = (num) => String(num).padStart(2, '0')
  return `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())} ${pad(parsed.getHours())}:${pad(parsed.getMinutes())}:${pad(parsed.getSeconds())}`
}

const loadWarehouse = async () => {
  const res = await getStockWarehouseDetail(warehouseId)
  if (res && res.data) {
    Object.assign(warehouseDetail, res.data)
  }
}

const loadStock = async () => {
  stockLoading.value = true
  try {
    const res = await getStockListByWarehouse({ warehouseId })
    if (res && res.rows) {
      stockList.value = res.rows || []
    } else if (res && res.data && Array.isArray(res.data.rows)) {
      stockList.value = res.data.rows
    } else {
      stockList.value = []
    }
    buildStockGroups(stockList.value)
  } finally {
    stockLoading.value = false
  }
}

const loadBatch = async () => {
  if (!batchQuery.stockId && batchStockIds.value.length === 0) {
    batchList.value = []
    batchPagination.total = 0
    return
  }
  batchLoading.value = true
  try {
    const res = await getStockBatchList({
      stockId: batchQuery.stockId,
      stockIds: batchStockIds.value,
      pageNum: batchPagination.pageNum,
      pageSize: batchPagination.pageSize
    })

    if (res && res.rows) {
      batchList.value = res.rows || []
      batchPagination.total = res.total || 0
    } else if (res && res.data && Array.isArray(res.data.rows)) {
      batchList.value = res.data.rows
      batchPagination.total = res.data.total || 0
    } else {
      batchList.value = []
      batchPagination.total = 0
    }
  } finally {
    batchLoading.value = false
  }
}

const handleTabChange = (key) => {
  const group = stockGroups.value.find(item => item.key === key)
  batchStockIds.value = group ? group.items.map(item => item.id) : []
  batchQuery.stockId = group && group.items.length ? group.items[0].id : null
  batchPagination.pageNum = 1
  loadBatch()
}

const handleBatchPageChange = (page) => {
  batchPagination.pageNum = page
  loadBatch()
}

const handleBatchSizeChange = (size) => {
  batchPagination.pageSize = size
  batchPagination.pageNum = 1
  loadBatch()
}

const handleBack = () => {
  router.push('/inventory/stock-query')
}

onMounted(async () => {
  await loadWarehouse()
  await loadStock()
})

watch(activeTab, (value) => {
  if (value && stockGroups.value.length) {
    handleTabChange(value)
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
