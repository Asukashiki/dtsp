<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        icon="ri-logout-box-line"
        :title="$t('inventory.outbound.title')"
        :subtitle="$t('inventory.outbound.subtitle')"
        class="page-header-green"
      />

      <div class="content-wrapper">
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('inventory.outbound.no')">
              <el-input
                v-model="queryParams.outboundNo"
                :placeholder="$t('inventory.outbound.no')"
                clearable
                class="search-input">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('inventory.outbound.types')">
              <el-select
                v-model="queryParams.type"
                :placeholder="$t('inventory.outbound.types')"
                clearable
                class="filter-select"
                @change="handleQuery">
                <el-option :label="$t('common.all')" value="" />
                <el-option :label="$t('inventory.outbound.type.general')" value="GENERAL" />
                <el-option :label="$t('inventory.outbound.type.transfer')" value="TRANSFER" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <InfoCard
          :title="$t('inventory.outbound.list')"
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
            <el-table :data="tableData" stripe v-loading="loading" class="outbound-table">
              <el-table-column
                prop="outboundNo"
                :label="$t('inventory.outbound.no')"
                width="180"
                fixed="left"
              />
              <el-table-column
                prop="type"
                :label="$t('inventory.outbound.types')"
                width="120"
              >
                <template #default="{ row }">
                  <el-tag :type="getTypeTag(row.type)" size="small">
                    {{ getTypeText(row.type) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="warehouseName"
                :label="$t('inventory.outbound.warehouse')"
                width="150"
                show-overflow-tooltip
              />
              <el-table-column
                prop="receiver"
                :label="$t('inventory.outbound.receiver')"
                width="120"
                show-overflow-tooltip
              />
<!--              <el-table-column
                prop="bizNo"
                :label="$t('inventory.outbound.bizNo')"
                width="150"
                show-overflow-tooltip
              />-->
              <el-table-column
                prop="operator"
                :label="$t('inventory.outbound.operator')"
                width="120"
              />
              <el-table-column
                prop="orderDate"
                :label="$t('inventory.outbound.orderDate')"
                width="160"
              >
                <template #default="{ row }">
                  {{ formatDateTime(row.orderDate) }}
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
                width="400"
                fixed="right"
                align="center"
                class-name="outbound-actions-column"
              >
                <template #default="{ row }">
                  <div class="action-buttons outbound-action-buttons">
                    <el-button class="action-btn action-btn-view" size="small" @click="handleView(row)"><i class="ri-eye-line"></i><span class="btn-text">{{ $t('common.view') }}</span></el-button>
                    <el-button v-if="row.status === 'DRAFT' || row.status === 'SUBMITTED'" class="action-btn action-btn-edit" type="primary" size="small" @click="handleEdit(row)"><i class="ri-edit-line"></i><span class="btn-text">{{ $t('common.edit') }}</span></el-button>
                    <el-button v-if="row.status === 'DRAFT'" class="action-btn action-btn-submit" type="success" size="small" @click="handleSubmit(row)"><i class="ri-checkbox-circle-line"></i><span class="btn-text">{{ $t('common.submit') }}</span></el-button>
                    <el-button v-if="row.status === 'SUBMITTED'" class="action-btn action-btn-audit" type="primary" size="small" @click="handleAudit(row)"><i class="ri-check-line"></i><span class="btn-text">{{ $t('inventory.outbound.approve') }}</span></el-button>
                    <el-button v-if="row.status === 'DRAFT' || row.status === 'SUBMITTED'" class="action-btn action-btn-delete" type="danger" size="small" @click="handleDelete(row)"><i class="ri-delete-bin-line"></i><span class="btn-text">{{ $t('common.delete') }}</span></el-button>
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
                  <i class="ri-logout-box-line"></i>
                  <span>{{ item.outboundNo }}</span>
                </div>
                <el-tag :type="getStatusTag(item.status)" size="small">
                  {{ getStatusText(item.status) }}
                </el-tag>
              </div>
              <div class="mobile-card-body">
                <div class="mobile-card-row">
                  <span class="label">{{ $t('inventory.outbound.types') }}:</span>
                  <el-tag :type="getTypeTag(item.type)" size="small">
                    {{ getTypeText(item.type) }}
                  </el-tag>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('inventory.outbound.warehouse') }}:</span>
                  <span class="value">{{ item.warehouseName }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('inventory.outbound.orderDate') }}:</span>
                  <span class="value">{{ formatDateTime(item.orderDate) }}</span>
                </div>
              </div>
              <div class="mobile-card-footer">
                <el-button class="action-btn action-btn-view" size="small" @click.stop="handleView(item)"><i class="ri-eye-line"></i><span class="btn-text">{{ $t('common.view') }}</span></el-button>
                <el-button v-if="item.status === 'DRAFT' || item.status === 'SUBMITTED'" class="action-btn action-btn-edit" type="primary" size="small" @click.stop="handleEdit(item)"><i class="ri-edit-line"></i><span class="btn-text">{{ $t('common.edit') }}</span></el-button>
                <el-button v-if="item.status === 'DRAFT'" class="action-btn action-btn-submit" type="success" size="small" @click.stop="handleSubmit(item)"><i class="ri-checkbox-circle-line"></i><span class="btn-text">{{ $t('common.submit') }}</span></el-button>
                <el-button v-if="item.status === 'SUBMITTED'" class="action-btn action-btn-audit" type="primary" size="small" @click.stop="handleAudit(item)"><i class="ri-check-line"></i><span class="btn-text">{{ $t('inventory.outbound.approve') }}</span></el-button>
                <el-button v-if="item.status === 'DRAFT' || item.status === 'SUBMITTED'" class="action-btn action-btn-delete" type="danger" size="small" @click.stop="handleDelete(item)"><i class="ri-delete-bin-line"></i><span class="btn-text">{{ $t('common.delete') }}</span></el-button>
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getOutboundList, submitOutbound, auditOutbound, deleteOutbound } from '@/api/inventory'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import StatusTabs from '@/components/workflow/StatusTabs.vue'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])
const activeTab = ref('all')

const tabConfig = [
  {
    name: 'all',
    label: 'common.all',
    icon: 'ri-list-check'
  },
  {
    name: 'pendingApproval',
    label: 'inventory.outbound.status.pending',
    icon: 'ri-time-line'
  },
  {
    name: 'approved',
    label: 'inventory.outbound.status.approved',
    icon: 'ri-check-line'
  }
]

const queryParams = reactive({
  page: 1,
  pageSize: 20,
  outboundNo: '',
  type: '',
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
    const res = await getOutboundList(params)
    if (res.rows) {
      tableData.value = res.rows || []
      pagination.total = res.total || 0
    }
  } catch (error) {
    console.error('Failed to load outbound list:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleReset = () => {
  queryParams.page = 1
  queryParams.outboundNo = ''
  queryParams.type = ''
  handleTabChange(activeTab.value)
}

const handleAdd = () => {
  router.push('/inventory/outbound/add')
}

const handleView = (row) => {
  router.push(`/inventory/outbound/detail/${row.id}`)
}

const handleEdit = (row) => {
  router.push(`/inventory/outbound/edit/${row.id}`)
}

const handleSubmit = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('common.confirmSubmit'),
      t('common.warning'),
      { type: 'warning' }
    )
    await submitOutbound({ id: row.id })
    ElMessage.success(t('common.submitSuccess'))
    handleQuery()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('common.submitFailed'))
    }
  }
}

const handleAudit = (row) => {
  router.push(`/inventory/outbound/detail/${row.id}?mode=audit`)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('common.confirmDelete'),
      t('common.warning'),
      { type: 'warning' }
    )
    await deleteOutbound(row.id)
    ElMessage.success(t('common.deleteSuccess'))
    handleQuery()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('common.deleteFailed'))
    }
  }
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
  return t(`inventory.outbound.status.${status.toLowerCase()}`)
}

const getTypeTag = (type) => {
  const map = {
    'GENERAL': '',
    'TRANSFER': 'warning'
  }
  return map[type] || ''
}

const getTypeText = (type) => {
  return t(`inventory.outbound.type.${type.toLowerCase()}`)
}

onMounted(() => {
  handleTabChange(activeTab.value)
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

:deep(.page-header-green) {
  background-color: #009A44 !important;
  color: white !important;

  .title, .subtitle, .ri-icon {
    color: white !important;
  }
}

.action-buttons {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: nowrap;
  width: max-content;
}

// Keep desktop outbound actions in one row inside the fixed right column.
// Mobile cards use their own wrapping footer below.
:deep(.outbound-actions-column .cell) {
  overflow: visible;
  white-space: nowrap;
}

.outbound-action-buttons {
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

:deep(.outbound-table .status-column .cell) {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  white-space: nowrap;
}

:deep(.outbound-table .status-tag) {
  display: inline-flex;
  align-items: center;
  max-width: none;
  white-space: nowrap;
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

.btn-green {
  background-color: #009A44;
  border-color: #009A44;
  color: white;

  &:hover {
    background-color: #007a36;
    border-color: #007a36;
  }
}
</style>
