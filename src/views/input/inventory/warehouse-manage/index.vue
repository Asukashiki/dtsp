<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        icon="ri-home-gear-line"
        :title="$t('input.inventory.warehouseManage.title')"
        :subtitle="$t('input.inventory.warehouseManage.subtitle')" />

      <div class="content-wrapper">
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('input.inventory.warehouseManage.form.warehouseCode')">
              <el-input
                v-model="filters.warehouseCode"
                :placeholder="$t('input.inventory.warehouseManage.placeholder.warehouseCode')"
                clearable
                class="search-input"
                @keyup.enter="handleSearch">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('input.inventory.warehouseManage.form.warehouseName')">
              <el-input
                v-model="filters.warehouseName"
                :placeholder="$t('input.inventory.warehouseManage.placeholder.warehouseName')"
                clearable
                class="search-input"
                @keyup.enter="handleSearch" />
            </SearchItem>

            <SearchItem :label="$t('input.inventory.warehouseManage.form.type')">
              <el-select
                v-model="filters.type"
                :placeholder="$t('input.inventory.warehouseManage.placeholder.type')"
                clearable
                class="search-input">
                <el-option
                  v-for="item in warehouseTypeOptions"
                  :key="item.value"
                  :label="$t(item.label)"
                  :value="item.value" />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('input.inventory.warehouseManage.form.status')">
              <el-select
                v-model="filters.status"
                :placeholder="$t('input.inventory.warehouseManage.placeholder.status')"
                clearable
                class="search-input">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="$t(item.label)"
                  :value="item.value" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <InfoCard :title="$t('input.inventory.warehouseManage.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('common.add') }}
            </el-button>
          </template>

          <div class="table-wrapper pc-only">
            <el-table v-loading="loading" :data="tableData" stripe>
              <el-table-column prop="warehouse_code" :label="$t('input.inventory.warehouseManage.columns.warehouseCode')" min-width="160" fixed="left" show-overflow-tooltip />
              <el-table-column prop="warehouse_name" :label="$t('input.inventory.warehouseManage.columns.warehouseName')" min-width="180" show-overflow-tooltip />
              <el-table-column :label="$t('input.inventory.warehouseManage.columns.type')" min-width="130" align="center">
                <template #default="{ row }">
                  <el-tag :type="getWarehouseTypeTag(row.type)" size="small">
                    {{ getWarehouseTypeLabel(row.type) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('input.inventory.warehouseManage.columns.storeType')" min-width="130" align="center">
                <template #default="{ row }">
                  {{ getStoreTypeLabel(row.store_type) }}
                </template>
              </el-table-column>
              <el-table-column prop="org_name" :label="$t('input.inventory.warehouseManage.columns.orgName')" min-width="180" show-overflow-tooltip />
              <el-table-column :label="$t('input.inventory.warehouseManage.columns.adminLevel')" min-width="130" align="center">
                <template #default="{ row }">
                  {{ getAdminLevelLabel(row.admin_level) }}
                </template>
              </el-table-column>
              <el-table-column prop="parent_warehouse_name" :label="$t('input.inventory.warehouseManage.columns.parentWarehouseName')" min-width="160" show-overflow-tooltip>
                <template #default="{ row }">
                  {{ row.parent_warehouse_name || '-' }}
                </template>
              </el-table-column>
              <el-table-column prop="location" :label="$t('input.inventory.warehouseManage.columns.location')" min-width="180" show-overflow-tooltip />
              <el-table-column prop="address" :label="$t('input.inventory.warehouseManage.columns.address')" min-width="220" show-overflow-tooltip />
              <el-table-column :label="$t('input.inventory.warehouseManage.columns.capacity')" min-width="120" align="right">
                <template #default="{ row }">
                  {{ formatCapacity(row.capacity) }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('input.inventory.warehouseManage.columns.status')" min-width="110" align="center">
                <template #default="{ row }">
                  <el-tag :type="row.status === '1' ? 'success' : 'info'" size="small">
                    {{ row.status === '1' ? $t('input.inventory.warehouseManage.status.enabled') : $t('input.inventory.warehouseManage.status.disabled') }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="update_time" :label="$t('input.inventory.warehouseManage.columns.updateTime')" min-width="170" show-overflow-tooltip />
              <el-table-column :label="$t('input.inventory.warehouseManage.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button class="action-btn action-btn-view" size="small" @click="handleView(row)">
                      <i class="ri-eye-line"></i>
                      <span class="btn-text">{{ $t('common.view') }}</span>
                    </el-button>
                    <el-button class="action-btn action-btn-edit" type="primary" size="small" @click="handleEdit(row)">
                      <i class="ri-edit-line"></i>
                      <span class="btn-text">{{ $t('common.edit') }}</span>
                    </el-button>
                    <el-button class="action-btn action-btn-delete" type="danger" size="small" @click="handleDelete(row)">
                      <i class="ri-delete-bin-line"></i>
                      <span class="btn-text">{{ $t('common.delete') }}</span>
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
        </InfoCard>

        <div class="mobile-card-list mobile-only" v-loading="loading">
          <div v-for="item in tableData" :key="item.id" class="warehouse-card">
            <div class="card-header">
              <div class="warehouse-info">
                <h3 class="warehouse-name">{{ item.warehouse_name }}</h3>
                <div class="warehouse-code">{{ item.warehouse_code }}</div>
              </div>
              <div class="card-tags">
                <el-tag :type="getWarehouseTypeTag(item.type)" size="small">{{ getWarehouseTypeLabel(item.type) }}</el-tag>
                <el-tag :type="item.status === '1' ? 'success' : 'info'" size="small">
                  {{ item.status === '1' ? $t('input.inventory.warehouseManage.status.enabled') : $t('input.inventory.warehouseManage.status.disabled') }}
                </el-tag>
              </div>
            </div>

            <div class="card-body">
              <div class="info-row">
                <span class="info-label">{{ $t('input.inventory.warehouseManage.columns.orgName') }}</span>
                <span class="info-value">{{ item.org_name || '-' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">{{ $t('input.inventory.warehouseManage.columns.location') }}</span>
                <span class="info-value">{{ item.location || '-' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">{{ $t('input.inventory.warehouseManage.columns.capacity') }}</span>
                <span class="info-value">{{ formatCapacity(item.capacity) }}</span>
              </div>
            </div>

            <div class="card-footer">
              <el-button class="action-btn action-btn-view" size="small" @click="handleView(item)">
                <i class="ri-eye-line"></i>
                <span class="btn-text">{{ $t('common.view') }}</span>
              </el-button>
              <el-button class="action-btn action-btn-edit" type="primary" size="small" @click="handleEdit(item)">
                <i class="ri-edit-line"></i>
                <span class="btn-text">{{ $t('common.edit') }}</span>
              </el-button>
              <el-button class="action-btn action-btn-delete" type="danger" size="small" @click="handleDelete(item)">
                <i class="ri-delete-bin-line"></i>
                <span class="btn-text">{{ $t('common.delete') }}</span>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { deleteWarehouseManage, listWarehouseManage } from '@/api/warehouseManage'
import { InfoCard, PageHeader, SearchForm, SearchItem } from '@/components/common'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const { t } = useI18n()

// 使用字典获取仓库类型
const { options: dictOptions, loading: dictLoading } = useDict(['warehouse_type'])

const loading = ref(false)
const tableData = ref([])

const filters = reactive({
  warehouseCode: '',
  warehouseName: '',
  type: '',
  status: ''
})

const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

// 仓库类型选项从字典获取
const warehouseTypeOptions = computed(() => dictOptions.value.warehouse_type || [])

const storeTypeOptions = [
  { value: 'PHYSICAL', label: 'input.inventory.warehouseManage.storeTypeOptions.physical' },
  { value: 'VIRTUAL', label: 'input.inventory.warehouseManage.storeTypeOptions.virtual' }
]

const adminLevelOptions = [
  { value: 'PROVINCE', label: 'input.inventory.warehouseManage.adminLevelOptions.province' },
  { value: 'CITY', label: 'input.inventory.warehouseManage.adminLevelOptions.city' },
  { value: 'COUNTY', label: 'input.inventory.warehouseManage.adminLevelOptions.county' },
  { value: 'TOWN', label: 'input.inventory.warehouseManage.adminLevelOptions.town' },
  { value: 'VILLAGE', label: 'input.inventory.warehouseManage.adminLevelOptions.village' }
]

const statusOptions = [
  { value: '1', label: 'input.inventory.warehouseManage.status.enabled' },
  { value: '0', label: 'input.inventory.warehouseManage.status.disabled' }
]

const findLabel = (options, value) => {
  const match = options.find(item => item.value === value)
  return match ? t(match.label) : value || '-'
}

// 仓库类型标签获取 - 字典数据的label已经是翻译后的文本
const getWarehouseTypeLabel = (value) => {
  const match = warehouseTypeOptions.value.find(item => item.value === value)
  return match ? match.label : value || '-'
}
const getStoreTypeLabel = value => findLabel(storeTypeOptions, value)
const getAdminLevelLabel = value => findLabel(adminLevelOptions, value)
const getWarehouseTypeTag = value => {
  if (value === 'LEASE') return 'warning'
  if (value === 'TEMP') return 'info'
  return 'success'
}

const formatCapacity = value => {
  if (value === null || value === undefined || value === '') return '-'
  return `${value}`
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await listWarehouseManage({
      ...filters,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })
    if (res.code === 200 && res.data) {
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    console.error('Failed to load warehouse list:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.pageNum = 1
  loadData()
}

const handleReset = () => {
  filters.warehouseCode = ''
  filters.warehouseName = ''
  filters.type = ''
  filters.status = ''
  pagination.pageNum = 1
  loadData()
}

const handleSizeChange = () => {
  pagination.pageNum = 1
  loadData()
}

const handlePageChange = () => {
  loadData()
}

const handleAdd = () => {
  router.push('/input/inventory/warehouse-manage/add')
}

const handleView = row => {
  router.push(`/input/inventory/warehouse-manage/detail/${row.id}`)
}

const handleEdit = row => {
  router.push(`/input/inventory/warehouse-manage/edit/${row.id}`)
}

const handleDelete = row => {
  ElMessageBox.confirm(
    t('input.inventory.warehouseManage.deleteConfirm'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await deleteWarehouseManage(row.id)
      if (res.code === 200) {
        ElMessage.success(t('input.inventory.warehouseManage.deleteSuccess'))
        if (tableData.value.length === 1 && pagination.pageNum > 1) {
          pagination.pageNum -= 1
        }
        loadData()
      }
    } catch (error) {
      console.error('Failed to delete warehouse:', error)
      ElMessage.error(t('common.failed'))
    }
  }).catch(() => {})
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/table-enhanced.scss';

.warehouse-card {
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.warehouse-name {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.warehouse-code {
  color: #909399;
  font-size: 13px;
}

.card-tags {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.info-label {
  color: #606266;
  flex-shrink: 0;
}

.info-value {
  color: #303133;
  text-align: right;
  word-break: break-all;
}

.card-footer {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.empty-state {
  text-align: center;
  padding: 48px 0;
  color: #909399;
}

.empty-state i {
  display: block;
  font-size: 48px;
  margin-bottom: 12px;
}

.mobile-pagination {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
</style>
