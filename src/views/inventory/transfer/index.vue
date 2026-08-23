<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        icon="ri-arrow-left-right-line"
        :title="$t('inventory.transfer.title')"
        :subtitle="$t('inventory.transfer.subtitle')"
        class="page-header-blue"
      />

      <div class="content-wrapper">
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('inventory.transfer.search.type')">
              <el-select
                v-model="queryParams.transferType"
                :placeholder="$t('inventory.transfer.search.type')"
                clearable
                class="filter-select"
                @change="handleQuery">
                <el-option :label="$t('common.all')" value="" />
                <el-option :label="$t('inventory.transfer.type.stockWarning')" value="STOCK_WARNING" />
                <el-option :label="$t('inventory.transfer.type.fullTransfer')" value="FULL_TRANSFER" />
              </el-select>
            </SearchItem>
            <SearchItem :label="$t('inventory.transfer.search.dateRange')">
              <el-date-picker
                v-model="dateRange"
                type="daterange"
                range-separator="-"
                :start-placeholder="$t('common.startDate')"
                :end-placeholder="$t('common.endDate')"
                value-format="YYYY-MM-DD"
                class="date-range-picker"
                @change="handleDateChange"
              />
            </SearchItem>
            <SearchItem :label="$t('inventory.transfer.search.outWarehouse')">
              <el-select
                v-model="queryParams.outWarehouseCode"
                :placeholder="$t('inventory.transfer.search.outWarehouse')"
                clearable
                filterable
                class="filter-select">
                <el-option v-for="item in warehouseOptions" :key="item.warehouseCode" :label="item.warehouseName" :value="item.warehouseCode" />
              </el-select>
            </SearchItem>
            <SearchItem :label="$t('inventory.transfer.search.inWarehouse')">
              <el-select
                v-model="queryParams.inWarehouseCode"
                :placeholder="$t('inventory.transfer.search.inWarehouse')"
                clearable
                filterable
                class="filter-select">
                <el-option v-for="item in warehouseOptions" :key="item.warehouseCode" :label="item.warehouseName" :value="item.warehouseCode" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <InfoCard
          :title="$t('inventory.transfer.list')"
          icon="ri-file-list-3-line"
          :no-padding="true">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('common.add') }}
            </el-button>
          </template>

          <StatusTabs
            v-model="activeTab"
            :tabs="tabConfig"
            @tab-change="handleTabChange" />

          <div class="table-wrapper pc-only">
            <el-table :data="tableData" stripe v-loading="loading" class="transfer-table">
              <el-table-column
                prop="transferType"
                :label="$t('inventory.transfer.types')"
                width="120"
              >
                <template #default="{ row }">
                  <el-tag :type="getTypeTag(row.transferType)" size="small">
                    {{ getTypeText(row.transferType) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="applyDate"
                :label="$t('inventory.transfer.applyDate')"
                width="160"
              >
                <template #default="{ row }">
                  {{ formatDateTime(row.applyDate) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="transferNo"
                :label="$t('inventory.transfer.no')"
                width="180"
              />
              <el-table-column
                prop="outWarehouseName"
                :label="$t('inventory.transfer.outWarehouse')"
                width="150"
                show-overflow-tooltip
              />
              <el-table-column
                prop="outTime"
                :label="$t('inventory.transfer.outTime')"
                width="160"
              >
                <template #default="{ row }">
                  {{ formatDateTime(row.outTime) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="applicant"
                :label="$t('inventory.transfer.applicant')"
                width="100"
              />
              <el-table-column
                prop="inWarehouseName"
                :label="$t('inventory.transfer.inWarehouse')"
                width="150"
                show-overflow-tooltip
              />
              <el-table-column
                prop="inTime"
                :label="$t('inventory.transfer.inTime')"
                width="160"
              >
                <template #default="{ row }">
                  {{ formatDateTime(row.inTime) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                :label="$t('common.status')"
                width="160"
                align="center"
                header-align="center"
                class-name="status-column"
              >
                <template #default="{ row }">
                  <el-tag class="status-tag" :type="getStatusTag(row.status)" size="small">
                    {{ getStatusText(row.status) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('common.actions')"
                width="360"
                fixed="right"
                align="center"
                class-name="transfer-actions-column"
              >
                <template #default="{ row }">
                  <div class="action-buttons transfer-action-buttons">
                    <el-button class="action-btn action-btn-view" size="small" @click="handleView(row)"><i class="ri-eye-line"></i><span class="btn-text">{{ $t('common.view') }}</span></el-button>
                    <el-button v-if="row.status === 'DRAFT'" class="action-btn action-btn-submit" type="success" size="small" @click="handleSubmit(row)"><i class="ri-checkbox-circle-line"></i><span class="btn-text">{{ $t('common.submit') }}</span></el-button>
                    <el-button v-if="row.status === 'SUBMITTED'" class="action-btn action-btn-audit" type="primary" size="small" @click="handleAudit(row)"><i class="ri-check-line"></i><span class="btn-text">{{ $t('inventory.transfer.approve') }}</span></el-button>
                    <el-button v-if="row.status === 'DRAFT'" class="action-btn action-btn-delete" type="danger" size="small" @click="handleDelete(row)"><i class="ri-delete-bin-line"></i><span class="btn-text">{{ $t('common.delete') }}</span></el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="queryParams.page"
                v-model:page-size="queryParams.pageSize"
                :total="pagination.total"
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
              :key="item.id"
              class="mobile-card"
              @click="handleView(item)"
            >
              <div class="mobile-card-header">
                <div class="mobile-card-title">
                  <i class="ri-arrow-left-right-line"></i>
                  <span>{{ item.transferNo }}</span>
                </div>
                <el-tag :type="getStatusTag(item.status)" size="small">
                  {{ getStatusText(item.status) }}
                </el-tag>
              </div>
              <div class="mobile-card-body">
                <div class="mobile-card-row">
                  <span class="label">{{ $t('inventory.transfer.types') }}:</span>
                  <el-tag :type="getTypeTag(item.transferType)" size="small">
                    {{ getTypeText(item.transferType) }}
                  </el-tag>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('inventory.transfer.outWarehouse') }}:</span>
                  <span class="value">{{ item.outWarehouseName }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('inventory.transfer.inWarehouse') }}:</span>
                  <span class="value">{{ item.inWarehouseName }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('inventory.transfer.applyDate') }}:</span>
                  <span class="value">{{ formatDateTime(item.applyDate) }}</span>
                </div>
              </div>
              <div class="mobile-card-footer">
                <el-button class="action-btn action-btn-view" size="small" @click.stop="handleView(item)"><i class="ri-eye-line"></i><span class="btn-text">{{ $t('common.view') }}</span></el-button>
                <el-button v-if="item.status === 'DRAFT'" class="action-btn action-btn-submit" type="success" size="small" @click.stop="handleSubmit(item)"><i class="ri-checkbox-circle-line"></i><span class="btn-text">{{ $t('common.submit') }}</span></el-button>
                <el-button v-if="item.status === 'SUBMITTED'" class="action-btn action-btn-audit" type="primary" size="small" @click.stop="handleAudit(item)"><i class="ri-check-line"></i><span class="btn-text">{{ $t('inventory.transfer.approve') }}</span></el-button>
                <el-button v-if="item.status === 'DRAFT'" class="action-btn action-btn-delete" type="danger" size="small" @click.stop="handleDelete(item)"><i class="ri-delete-bin-line"></i><span class="btn-text">{{ $t('common.delete') }}</span></el-button>
              </div>
            </div>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="queryParams.page"
                :total="pagination.total"
                :page-size="queryParams.pageSize"
                layout="prev, pager, next"
                small
                @current-change="handleQuery"
              />
            </div>
          </div>
        </InfoCard>
      </div>
    </div>

    <el-dialog
      v-model="auditDialogVisible"
      :title="$t('inventory.transfer.approve')"
      width="500px"
    >
      <el-form :model="auditForm" label-width="100px">
        <el-form-item :label="$t('inventory.transfer.auditComment')">
          <el-input
            v-model="auditForm.auditComment"
            type="textarea"
            :rows="3"
            :placeholder="$t('inventory.transfer.auditComment')"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="auditDialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="danger" @click="handleAuditSubmit(false)">{{ $t('inventory.transfer.reject') }}</el-button>
        <el-button type="success" @click="handleAuditSubmit(true)">{{ $t('inventory.transfer.approve') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getTransferList, deleteTransfer, auditTransfer, submitTransfer, getWarehouseOptions } from '@/api/inventory'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import StatusTabs from '@/components/workflow/StatusTabs.vue'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])
const warehouseOptions = ref([])
const activeTab = ref('all')
const dateRange = ref([])
const auditDialogVisible = ref(false)
const currentTransfer = ref(null)
const auditForm = reactive({
  auditComment: ''
})

const tabConfig = [
  {
    name: 'all',
    label: 'common.all',
    icon: 'ri-list-check'
  },
  {
    name: 'pendingApproval',
    label: 'inventory.transfer.status.pending',
    icon: 'ri-time-line'
  },
  {
    name: 'approved',
    label: 'inventory.transfer.status.approved',
    icon: 'ri-check-line'
  }
]

const queryParams = reactive({
  page: 1,
  pageSize: 20,
  transferType: '',
  startDate: '',
  endDate: '',
  outWarehouseCode: '',
  inWarehouseCode: '',
  status: ''
})

const pagination = reactive({
  page: 1,
  pageSize: 20,
  total: 0
})

const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return '-'
  if (dateTimeStr.includes('T')) {
    return dateTimeStr.replace('T', ' ')
  }
  return dateTimeStr
}

const handleDateChange = (val) => {
  if (val) {
    queryParams.startDate = val[0]
    queryParams.endDate = val[1]
  } else {
    queryParams.startDate = ''
    queryParams.endDate = ''
  }
}

const handleTabChange = (tabName) => {
  if (tabName === 'all') {
    queryParams.status = ''
  } else if (tabName === 'pendingApproval') {
    queryParams.status = 'SUBMITTED'
  } else if (tabName === 'approved') {
    queryParams.status = 'APPROVED,REJECTED'
  }
  queryParams.page = 1
  handleQuery()
}

const handleQuery = async () => {
  loading.value = true
  try {
    const params = {
      ...queryParams,
      page: queryParams.page,
      pageSize: queryParams.pageSize
    }
    const res = await getTransferList(params)
    if (res.rows) {
      tableData.value = res.rows || []
      pagination.total = res.total || 0
    }
  } catch (error) {
    console.error('Failed to load transfer list:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleReset = () => {
  queryParams.page = 1
  queryParams.transferType = ''
  queryParams.startDate = ''
  queryParams.endDate = ''
  queryParams.outWarehouseCode = ''
  queryParams.inWarehouseCode = ''
  dateRange.value = []
  handleTabChange(activeTab.value)
}

const handleAdd = () => {
  router.push('/inventory/transfer/add')
}

const handleView = (row) => {
  router.push(`/inventory/transfer/detail/${row.id}`)
}

const handleEdit = (row) => {
  router.push(`/inventory/transfer/edit/${row.id}`)
}

const handleSubmit = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('common.confirmSubmit'),
      t('common.warning'),
      { type: 'warning' }
    )
    await submitTransfer({ id: row.id })
    ElMessage.success(t('common.submitSuccess'))
    handleQuery()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('common.submitFailed'))
    }
  }
}

const handleAudit = (row) => {
  currentTransfer.value = row
  auditForm.auditComment = ''
  auditDialogVisible.value = true
}

const handleAuditSubmit = async (approved) => {
  try {
    await auditTransfer(currentTransfer.value.id, approved, auditForm.auditComment)
    ElMessage.success(t('common.submitSuccess'))
    auditDialogVisible.value = false
    handleQuery()
  } catch (error) {
    ElMessage.error(t('common.submitFailed'))
  }
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('common.confirmDelete'),
      t('common.warning'),
      { type: 'warning' }
    )
    await deleteTransfer(row.id)
    ElMessage.success(t('common.deleteSuccess'))
    handleQuery()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('common.deleteFailed'))
    }
  }
}

const loadWarehouses = () => {
  getWarehouseOptions({ status: '0' }).then(res => {
    warehouseOptions.value = res.data || []
  }).catch(() => {
    warehouseOptions.value = []
  })
}

const getStatusTag = (status) => {
  const map = {
    'DRAFT': 'info',
    'SUBMITTED': 'warning',
    'APPROVED': 'success',
    'REJECTED': 'danger'
  }
  return map[status] || ''
}

const getStatusText = (status) => {
  return t(`inventory.transfer.status.${status.toLowerCase()}`)
}

const getTypeTag = (type) => {
  const map = {
    'STOCK_WARNING': 'warning',
    'FULL_TRANSFER': 'primary'
  }
  return map[type] || ''
}

const getTypeText = (type) => {
  if (type === 'STOCK_WARNING') {
    return t('inventory.transfer.type.stockWarning')
  } else if (type === 'FULL_TRANSFER') {
    return t('inventory.transfer.type.fullTransfer')
  }
  return type
}

onMounted(() => {
  loadWarehouses()
  handleTabChange(activeTab.value)
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

:deep(.page-header-blue) {
  background-color: #1890ff !important;
  color: white !important;

  .title, .subtitle, .ri-icon {
    color: white !important;
  }
}

.btn-blue {
  background-color: #1890ff;
  border-color: #1890ff;
  color: white;

  &:hover {
    background-color: #096dd9;
    border-color: #096dd9;
  }
}

.action-buttons {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: nowrap;
  width: max-content;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 6px;
  
  i {
    font-size: 14px;
  }
  
  .btn-text {
    display: inline;
  }
}

.action-btn-view {
  background-color: #f4f4f5;
  border-color: #e4e4e7;
  color: #606266;
  
  &:hover {
    background-color: #e9e9eb;
    border-color: #d1d1d6;
    color: #383838;
  }
}

.action-btn-edit {
  background-color: #409eff;
  border-color: #409eff;
  color: white;
  
  &:hover {
    background-color: #66b1ff;
    border-color: #66b1ff;
  }
}

.action-btn-submit {
  background-color: #67c23a;
  border-color: #67c23a;
  color: white;
  
  &:hover {
    background-color: #85ce61;
    border-color: #85ce61;
  }
}

.action-btn-audit {
  background-color: #409eff;
  border-color: #409eff;
  color: white;

  &:hover {
    background-color: #66b1ff;
    border-color: #66b1ff;
  }
}

.action-btn-delete {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: white;
  
  &:hover {
    background-color: #f78989;
    border-color: #f78989;
  }
}

.mobile-card-footer {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  overflow: visible;
  padding-bottom: 8px;
}

// Keep desktop transfer actions in one row inside the fixed right column.
// Mobile cards use their own wrapping footer below.
:deep(.transfer-actions-column .cell) {
  overflow: visible;
  white-space: nowrap;
}

:deep(.transfer-table .status-column .cell) {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  white-space: nowrap;
}

:deep(.transfer-table .status-tag) {
  display: inline-flex;
  align-items: center;
  max-width: none;
  white-space: nowrap;
}

.transfer-action-buttons {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  gap: 6px;
  width: max-content;

  :deep(.el-button.action-btn) {
    flex: 0 0 auto;
    min-width: 64px !important;
    min-height: 32px !important;
    height: 32px !important;
    margin: 0 !important;
    padding: 0 10px !important;
    font-size: 13px !important;
    line-height: 1 !important;
    white-space: nowrap !important;

    i {
      margin-right: 4px;
      font-size: 14px !important;
    }
  }
}
</style>
