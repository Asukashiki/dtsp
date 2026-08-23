<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        icon="ri-shield-check-line"
        :title="$t('stockCheckReview.title')"
        class="page-header-green"
      />

      <div class="content-wrapper">
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('stockCheck.fields.warehouseName')">
              <el-input
                v-model="query.warehouseId"
                :placeholder="$t('stockCheck.fields.warehouseName')"
                clearable
                class="search-input">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>
            <SearchItem :label="$t('stockCheck.fields.checkStatus')">
              <el-select
                v-model="query.checkStatus"
                :placeholder="$t('stockCheck.fields.checkStatus')"
                clearable
                class="filter-select"
                @change="handleQuery">
                <el-option :label="$t('common.all')" value="" />
                <el-option :label="$t('stockCheck.status.DRAFT')" value="DRAFT" />
                <el-option :label="$t('stockCheck.status.PENDING')" value="PENDING" />
                <el-option :label="$t('stockCheck.status.APPROVED')" value="APPROVED" />
                <el-option :label="$t('stockCheck.status.REJECTED')" value="REJECTED" />
                <el-option :label="$t('stockCheck.status.ADJUSTED')" value="ADJUSTED" />
                <el-option :label="$t('stockCheck.status.CANCELLED')" value="CANCELLED" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <InfoCard
          :title="$t('stockCheckReview.title')"
          icon="ri-file-list-3-line"
          :no-padding="true">

          <div class="table-wrapper pc-only">
            <el-table
              :data="tableData"
              stripe
              v-loading="loading"
              class="stock-check-review-table"
            >
              <el-table-column
                prop="checkId"
                :label="$t('stockCheck.fields.checkId')"
                width="160"
                fixed="left"
              >
                <template #default="{ row }">
                  <el-link type="primary" :underline="false" @click="handleView(row)">
                    {{ row.checkId }}
                  </el-link>
                </template>
              </el-table-column>
              <el-table-column
                prop="checkDate"
                :label="$t('stockCheck.fields.checkDate')"
                width="120"
              />
              <el-table-column
                prop="warehouseName"
                :label="$t('stockCheck.fields.warehouseName')"
                width="160"
                show-overflow-tooltip
              />
              <el-table-column
                prop="checkerName"
                :label="$t('stockCheck.fields.checkerName')"
                width="100"
              />
              <el-table-column
                prop="totalItems"
                :label="$t('stockCheck.fields.totalItems')"
                width="90"
              />
              <el-table-column
                prop="diffItems"
                :label="$t('stockCheck.fields.diffItems')"
                width="110"
              >
                <template #default="{ row }">
                  <span v-if="row.diffItems > 0" class="text-[#DA121A] font-bold">
                    {{ row.diffItems }}
                  </span>
                  <span v-else>{{ row.diffItems }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="checkStatus"
                :label="$t('stockCheck.fields.checkStatus')"
                width="160"
                align="center"
                header-align="center"
                class-name="stock-status-column"
              >
                <template #default="{ row }">
                  <el-tag
                    class="stock-status-tag"
                    :type="getStatusTag(row.checkStatus)"
                    size="small"
                  >
                    {{ getStatusText(row.checkStatus) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('common.actions')"
                width="220"
                fixed="right"
                align="center"
                header-align="center"
                class-name="stock-check-action-column"
              >
                <template #default="{ row }">
                  <div class="stock-check-actions">
                    <el-button
                      type="primary"
                      link
                      size="small"
                      @click="handleView(row)"
                    >{{ $t('stockCheck.actions.view') }}</el-button>

                    <el-button
                      v-if="['DRAFT', 'PENDING'].includes(row.checkStatus)"
                      type="warning"
                      link
                      size="small"
                      @click="handleReview(row)"
                    >{{ $t('stockCheck.actions.review') }}</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="query.pageNum"
                v-model:page-size="query.pageSize"
                :total="total"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                @current-change="handleQuery"
                @size-change="handleQuery"
              />
            </div>
          </div>
          
          <div class="mobile-card-list mobile-only">
            <div
              v-for="item in tableData"
              :key="item.checkId"
              class="mobile-card"
              @click="handleView(item)"
            >
              <div class="mobile-card-header">
                <div class="mobile-card-title">
                  <i class="ri-shield-check-line"></i>
                  <span>{{ item.checkId }}</span>
                </div>
                <el-tag :type="getStatusTag(item.checkStatus)" size="small">
                  {{ getStatusText(item.checkStatus) }}
                </el-tag>
              </div>
              <div class="mobile-card-body">
                <div class="mobile-card-row">
                  <span class="label">{{ $t('stockCheck.fields.warehouseName') }}:</span>
                  <span class="value">{{ item.warehouseName }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('stockCheck.fields.checkDate') }}:</span>
                  <span class="value">{{ item.checkDate }}</span>
                </div>
              </div>
              <div class="mobile-card-footer">
                <el-button size="small" @click.stop="handleView(item)">{{ $t('stockCheck.actions.view') }}</el-button>
                <el-button v-if="['DRAFT', 'PENDING'].includes(item.checkStatus)" type="warning" size="small" @click.stop="handleReview(item)">{{ $t('stockCheck.actions.review') }}</el-button>
              </div>
            </div>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="query.pageNum"
                :total="total"
                :page-size="query.pageSize"
                layout="prev, pager, next"
                small
                @current-change="handleQuery"
              />
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getStockCheckList } from '@/api/stockCheck'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])
const total = ref(0)

const query = reactive({
  warehouseId: '',
  checkStatus: 'PENDING',
  startDate: '',
  endDate: '',
  pageNum: 1,
  pageSize: 10
})

const handleQuery = async () => {
  loading.value = true
  try {
    const res = await getStockCheckList(query)
    const list = res.data?.list || res.data?.records || res.rows || res.records || []
    tableData.value = list
    total.value = res.data?.total || res.total || 0
  } catch (error) {
    console.error('Failed to load stock check review list:', error)
  } finally {
    loading.value = false
  }
}

const handleReset = () => {
  query.pageNum = 1
  query.warehouseId = ''
  query.checkStatus = 'PENDING'
  query.startDate = ''
  query.endDate = ''
  handleQuery()
}

const handleView = (row) => {
  // 详情页复用盘点录入的详情
  router.push(`/inventory/stock-check/detail/${row.checkId}`)
}

const handleReview = (row) => {
  router.push(`/inventory/stock-check-review/review/${row.checkId}`)
}

const getStatusTag = (status) => {
  const map = {
    'DRAFT': 'info',
    'PENDING': 'warning',
    'APPROVED': 'success',
    'REJECTED': 'danger',
    'ADJUSTED': 'success',
    'CANCELLED': 'info'
  }
  return map[status] || ''
}

const getStatusText = (status) => {
  return t(`stockCheck.status.${status}`)
}

onMounted(() => {
  handleQuery()
})
</script>

<style lang="scss" scoped>
/* Keep the fixed action column stable when the optional review action is shown. */
:deep(.stock-check-review-table .stock-check-action-column .cell) {
  padding: 8px 12px;
  overflow: visible;
}

.stock-check-actions {
  display: flex;
  width: max-content;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  flex-wrap: nowrap;

  :deep(.el-button) {
    flex: 0 0 auto;
    width: auto;
    min-width: 64px !important;
    height: 32px !important;
    min-height: 32px !important;
    margin: 0 !important;
    padding: 0 10px !important;
    font-size: 13px !important;
    line-height: 1 !important;
    text-decoration: none !important;
    white-space: nowrap;
  }
}
</style>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

:deep(.page-header-green) {
  background-color: #009A44 !important;
  color: white !important;

  .title, .subtitle, .ri-icon {
    color: white !important;
  }
}

:deep(.stock-check-review-table .el-table__header th) {
  white-space: nowrap;
}

// Keep the full status tag visible inside the table cell.
:deep(.stock-check-review-table .stock-status-column .cell) {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  white-space: nowrap;
}

:deep(.stock-check-review-table .stock-status-tag) {
  display: inline-flex;
  align-items: center;
  max-width: none;
  white-space: nowrap;
}
</style>
