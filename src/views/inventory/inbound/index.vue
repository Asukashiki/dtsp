<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        icon="ri-login-box-line"
        :title="$t('inventory.inbound.title')"
        :subtitle="$t('inventory.inbound.subtitle')"
        class="page-header-green"
      />

      <div class="content-wrapper">
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('inventory.inbound.no')">
              <el-input
                v-model="queryParams.inboundNo"
                :placeholder="$t('inventory.inbound.no')"
                clearable
                class="search-input">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('inventory.inbound.types')">
              <el-select
                v-model="queryParams.type"
                :placeholder="$t('inventory.inbound.types')"
                clearable
                class="filter-select"
                @change="handleQuery">
                <el-option :label="$t('common.all')" value="" />
                <el-option :label="$t('inventory.inbound.type.general')" value="GENERAL" />
                <el-option :label="$t('inventory.inbound.type.transfer')" value="TRANSFER" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <InfoCard
          :title="$t('inventory.inbound.list')"
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
            <el-table :data="tableData" stripe v-loading="loading">
              <el-table-column
                prop="inboundNo"
                :label="$t('inventory.inbound.no')"
                width="180"
                fixed="left"
              />
              <el-table-column
                prop="type"
                :label="$t('inventory.inbound.types')"
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
                :label="$t('inventory.inbound.warehouse')"
                width="150"
                show-overflow-tooltip
              />
              <el-table-column
                prop="bizNo"
                :label="$t('inventory.inbound.bizNo')"
                width="150"
                show-overflow-tooltip
              />
              <el-table-column
                prop="operator"
                :label="$t('inventory.inbound.operator')"
                width="120"
              />
              <el-table-column
                prop="orderDate"
                :label="$t('inventory.inbound.orderDate')"
                width="160"
              >
                <template #default="{ row }">
                  {{ formatDateTime(row.orderDate) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                :label="$t('common.status')"
                width="100"
              >
                <template #default="{ row }">
                  <el-tag :type="getStatusTag(row.status)" size="small">
                    {{ getStatusText(row.status) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('common.actions')" width="250" fixed="right">
                <template #default="{ row }">
                  <el-button
                    type="primary"
                    size="small"
                    @click="handleView(row)"
                    class="btn-green"
                  >{{ $t('common.view') }}</el-button>

                  <el-button
                    v-if="row.status === 'DRAFT' || row.status === 'SUBMITTED'"
                    type="primary"
                    size="small"
                    @click="handleEdit(row)"
                  >{{ $t('common.edit') }}</el-button>

                  <el-button
                    v-if="row.status === 'DRAFT'"
                    type="success"
                    size="small"
                    @click="handleSubmit(row)"
                  >{{ $t('common.submit') }}</el-button>

                  <el-button
                    v-if="row.status === 'SUBMITTED'"
                    type="warning"
                    size="small"
                    @click="handleAudit(row)"
                  >{{ $t('inventory.inbound.approve') }}</el-button>

                  <el-button
                    v-if="row.status === 'DRAFT'"
                    type="danger"
                    size="small"
                    @click="handleDelete(row)"
                  >{{ $t('common.delete') }}</el-button>
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
                  <i class="ri-login-box-line"></i>
                  <span>{{ item.inboundNo }}</span>
                </div>
                <el-tag :type="getStatusTag(item.status)" size="small">
                  {{ getStatusText(item.status) }}
                </el-tag>
              </div>
              <div class="mobile-card-body">
                <div class="mobile-card-row">
                  <span class="label">{{ $t('inventory.inbound.types') }}:</span>
                  <el-tag :type="getTypeTag(item.type)" size="small">
                    {{ getTypeText(item.type) }}
                  </el-tag>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('inventory.inbound.warehouse') }}:</span>
                  <span class="value">{{ item.warehouseName }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('inventory.inbound.orderDate') }}:</span>
                  <span class="value">{{ formatDateTime(item.orderDate) }}</span>
                </div>
              </div>
              <div class="mobile-card-footer">
                <el-button size="small" @click.stop="handleView(item)">{{ $t('common.view') }}</el-button>
                <el-button v-if="item.status === 'DRAFT' || item.status === 'SUBMITTED'" type="primary" size="small" @click.stop="handleEdit(item)">{{ $t('common.edit') }}</el-button>
                <el-button v-if="item.status === 'DRAFT'" type="success" size="small" @click.stop="handleSubmit(item)">{{ $t('common.submit') }}</el-button>
                <el-button v-if="item.status === 'SUBMITTED'" type="warning" size="small" @click.stop="handleAudit(item)">{{ $t('inventory.inbound.approve') }}</el-button>
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
import { getInboundList, submitInbound, auditInbound, deleteInbound } from '@/api/inventory'
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
    label: 'inventory.inbound.status.pending',
    icon: 'ri-time-line'
  },
  {
    name: 'approved',
    label: 'inventory.inbound.status.approved',
    icon: 'ri-check-line'
  }
]

const queryParams = reactive({
  page: 1,
  pageSize: 20,
  inboundNo: '',
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
    const res = await getInboundList(params)
    if (res.rows) {
      tableData.value = res.rows || []
      pagination.total = res.total || 0
    }
  } catch (error) {
    console.error('Failed to load inbound list:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleReset = () => {
  queryParams.page = 1
  queryParams.inboundNo = ''
  queryParams.type = ''
  handleTabChange(activeTab.value)
}

const handleAdd = () => {
  router.push('/inventory/inbound/add')
}

const handleView = (row) => {
  router.push(`/inventory/inbound/detail/${row.id}`)
}

const handleEdit = (row) => {
  router.push(`/inventory/inbound/edit/${row.id}`)
}

const handleSubmit = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('common.confirmSubmit'),
      t('common.warning'),
      { type: 'warning' }
    )
    await submitInbound({ id: row.id })
    ElMessage.success(t('common.submitSuccess'))
    handleQuery()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('common.submitFailed'))
    }
  }
}

const handleAudit = (row) => {
  router.push(`/inventory/inbound/detail/${row.id}?mode=audit`)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('common.confirmDelete'),
      t('common.warning'),
      { type: 'warning' }
    )
    await deleteInbound(row.id)
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
  return t(`inventory.inbound.status.${status.toLowerCase()}`)
}

const getTypeTag = (type) => {
  const map = {
    'GENERAL': '',
    'TRANSFER': 'warning'
  }
  return map[type] || ''
}

const getTypeText = (type) => {
  return t(`inventory.inbound.type.${type.toLowerCase()}`)
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
