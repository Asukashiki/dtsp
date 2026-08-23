<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        icon="ri-stack-line"
        :title="$t('input.inventory.stockQuery.title')"
        :subtitle="$t('input.inventory.stockQuery.subtitle')" />

      <div class="content-wrapper">
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('input.inventory.stockQuery.filters.warehouseCode')">
              <el-input
                v-model="filters.warehouseCode"
                :placeholder="$t('input.inventory.stockQuery.placeholders.warehouseCode')"
                clearable
                class="search-input"
                @keyup.enter="handleSearch">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('input.inventory.stockQuery.filters.warehouseName')">
              <el-input
                v-model="filters.warehouseName"
                :placeholder="$t('input.inventory.stockQuery.placeholders.warehouseName')"
                clearable
                class="search-input"
                @keyup.enter="handleSearch" />
            </SearchItem>

            <SearchItem :label="$t('input.inventory.stockQuery.filters.status')">
              <el-select
                v-model="filters.status"
                :placeholder="$t('input.inventory.stockQuery.placeholders.status')"
                clearable
                class="search-input">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <InfoCard :title="$t('input.inventory.stockQuery.list')" icon="ri-file-list-3-line">
          <div class="table-wrapper pc-only">
            <el-table v-loading="loading" :data="tableData" stripe class="stock-query-table">
              <el-table-column prop="warehouse_code" :label="$t('input.inventory.stockQuery.columns.warehouseCode')" min-width="150" show-overflow-tooltip />
              <el-table-column prop="warehouse_name" :label="$t('input.inventory.stockQuery.columns.warehouseName')" min-width="180" show-overflow-tooltip />
              <el-table-column prop="org_name" :label="$t('input.inventory.stockQuery.columns.orgName')" min-width="180" show-overflow-tooltip />
              <el-table-column prop="location" :label="$t('input.inventory.stockQuery.columns.location')" min-width="180" show-overflow-tooltip />
              <el-table-column :label="$t('input.inventory.stockQuery.columns.stockQty')" min-width="140" align="right">
                <template #default="{ row }">
                  {{ formatStockQty(row.stock_qty) }}
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('input.inventory.stockQuery.columns.status')"
                min-width="140"
                align="center"
                header-align="center"
                class-name="status-column"
              >
                <template #default="{ row }">
                  <el-tag class="status-tag" :type="getStatusTag(row.status)" size="small">
                    {{ getStatusLabel(row.status) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('input.inventory.stockQuery.columns.actions')" width="160" fixed="right">
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button class="action-btn action-btn-view" size="small" @click="handleView(row)">
                      <i class="ri-eye-line"></i>
                      <span class="btn-text">{{ $t('common.view') }}</span>
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="pagination.pageNum"
                v-model:page-size="pagination.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="pagination.total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handlePageChange" />
            </div>
          </div>

          <div class="mobile-card-list mobile-only" v-loading="loading">
            <div v-for="item in tableData" :key="item.id" class="warehouse-card">
              <div class="card-header">
                <div class="warehouse-info">
                  <h3 class="warehouse-name">{{ item.warehouse_name }}</h3>
                  <div class="warehouse-code">{{ item.warehouse_code }}</div>
                </div>
                <div class="card-tags">
                  <el-tag :type="getStatusTag(item.status)" size="small">
                    {{ getStatusLabel(item.status) }}
                  </el-tag>
                </div>
              </div>
              <div class="card-body">
                <div class="info-row">
                  <span class="info-label">{{ $t('input.inventory.stockQuery.columns.orgName') }}</span>
                  <span class="info-value">{{ item.org_name || '-' }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">{{ $t('input.inventory.stockQuery.columns.location') }}</span>
                  <span class="info-value">{{ item.location || '-' }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">{{ $t('input.inventory.stockQuery.columns.stockQty') }}</span>
                  <span class="info-value">{{ formatStockQty(item.stock_qty) }}</span>
                </div>
              </div>
              <div class="card-footer">
                <el-button class="action-btn action-btn-view" size="small" @click="handleView(item)">
                  <i class="ri-eye-line"></i>
                  <span class="btn-text">{{ $t('common.view') }}</span>
                </el-button>
              </div>
            </div>

            <div v-if="tableData.length === 0 && !loading" class="empty-state">
              <i class="ri-inbox-line"></i>
              <p>{{ $t('home.noData') }}</p>
            </div>

            <div class="mobile-pagination">
              <el-pagination
                v-model:current-page="pagination.pageNum"
                :total="pagination.total"
                :page-size="pagination.pageSize"
                layout="prev, pager, next"
                small
                @current-change="handlePageChange" />
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getStockWarehouseList } from '@/api/stockQuery'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])

const filters = reactive({
  warehouseCode: '',
  warehouseName: '',
  status: ''
})

const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

const statusOptions = computed(() => ([
  { value: '0', label: t('input.inventory.warehouse.status.enabled') },
  { value: '1', label: t('input.inventory.warehouse.status.disabled') },
  { value: '2', label: t('input.inventory.warehouse.operatingStatusOptions.maintenance') }
]))

const formatStockQty = (value) => {
  const qty = value === null || value === undefined || value === '' ? 0 : Number(value)
  if (Number.isNaN(qty)) return `0 ${t('input.inventory.stockQuery.units.kg')}`
  return `${qty} ${t('input.inventory.stockQuery.units.kg')}`
}

const getStatusLabel = (value) => {
  if (value === '0') return t('input.inventory.warehouse.status.enabled')
  if (value === '1') return t('input.inventory.warehouse.status.disabled')
  if (value === '2') return t('input.inventory.warehouse.operatingStatusOptions.maintenance')
  return value || '-'
}

const getStatusTag = (value) => {
  if (value === '0') return 'success'
  if (value === '1') return 'info'
  if (value === '2') return 'warning'
  return 'info'
}

const fetchList = async () => {
  loading.value = true
  try {
    const res = await getStockWarehouseList({
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      warehouseCode: filters.warehouseCode,
      warehouseName: filters.warehouseName,
      status: filters.status
    })

    if (res && res.rows) {
      tableData.value = res.rows || []
      pagination.total = res.total || 0
    } else if (res && res.data && Array.isArray(res.data.rows)) {
      tableData.value = res.data.rows
      pagination.total = res.data.total || 0
    } else {
      tableData.value = []
      pagination.total = 0
    }
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.pageNum = 1
  fetchList()
}

const handleReset = () => {
  filters.warehouseCode = ''
  filters.warehouseName = ''
  filters.status = ''
  pagination.pageNum = 1
  fetchList()
}

const handlePageChange = (page) => {
  pagination.pageNum = page
  fetchList()
}

const handleSizeChange = (size) => {
  pagination.pageSize = size
  pagination.pageNum = 1
  fetchList()
}

const handleView = (row) => {
  router.push(`/inventory/stock-query/detail/${row.id}`)
}

onMounted(() => {
  fetchList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

:deep(.stock-query-table .status-column .cell) {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  white-space: nowrap;
}

:deep(.stock-query-table .status-tag) {
  display: inline-flex;
  align-items: center;
  max-width: none;
  white-space: nowrap;
}

:deep(.card-tags .status-tag) {
  display: inline-flex;
  flex: 0 0 auto;
  max-width: 100%;
  white-space: nowrap;
}
</style>
