<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-home-3-line"
        :title="$t('input.inventory.warehouse.title')"
        :subtitle="$t('input.inventory.warehouse.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片（无标题） -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('input.inventory.warehouse.searchPlaceholder')">
              <el-input
                v-model="searchKeyword"
                :placeholder="$t('input.inventory.warehouse.searchPlaceholder')"
                clearable
                class="search-input">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('input.inventory.warehouse.filterByType')">
              <el-select
                v-model="filterType"
                :placeholder="$t('input.inventory.warehouse.filterByType')"
                clearable
                class="search-input">
                <el-option :label="$t('input.inventory.warehouse.allTypes')" value="" />
                <el-option :label="$t('input.inventory.warehouse.type.normal')" value="normal" />
                <el-option :label="$t('input.inventory.warehouse.type.cold')" value="cold" />
                <el-option :label="$t('input.inventory.warehouse.type.dangerous')" value="dangerous" />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('input.inventory.warehouse.filterByStatus')">
              <el-select
                v-model="filterStatus"
                :placeholder="$t('input.inventory.warehouse.filterByStatus')"
                clearable
                class="search-input">
                <el-option :label="$t('input.inventory.warehouse.allStatus')" value="" />
                <el-option :label="$t('input.inventory.warehouse.status.enabled')" value="1" />
                <el-option :label="$t('input.inventory.warehouse.status.disabled')" value="0" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('input.inventory.warehouse.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('input.inventory.warehouse.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table
              v-loading="loading"
              :data="tableData"
              stripe>
          <el-table-column prop="warehouse_code" :label="$t('input.inventory.warehouse.columns.warehouseCode')" width="200" fixed="left" show-overflow-tooltip />
          <el-table-column prop="warehouse_name" :label="$t('input.inventory.warehouse.columns.warehouseName')" min-width="180" show-overflow-tooltip />
          <el-table-column prop="warehouse_type" :label="$t('input.inventory.warehouse.columns.warehouseType')" min-width="140" align="center">
            <template #default="{ row }">
              <el-tag :type="getTypeTag(row.warehouse_type)" size="small">
                {{ $t(`input.inventory.warehouse.type.${row.warehouse_type}`) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="location" :label="$t('input.inventory.warehouse.columns.location')" min-width="200" show-overflow-tooltip />
          <el-table-column prop="warehouse_area" :label="$t('input.inventory.warehouse.columns.warehouseArea')" min-width="120" align="right">
            <template #default="{ row }">
              {{ row.warehouse_area ? row.warehouse_area + ' L' : '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="organ_name" :label="$t('input.inventory.warehouse.columns.organName')" min-width="160" show-overflow-tooltip />
          <el-table-column :label="$t('input.inventory.warehouse.columns.capacity')" min-width="150" align="center">
            <template #default="{ row }">
              {{ row.used_capacity || 0 }} / {{ row.capacity || 0 }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('input.inventory.warehouse.columns.usageRate')" min-width="140" align="center">
            <template #default="{ row }">
              <el-progress :percentage="getUsageRate(row)" :color="getProgressColor(row)" />
            </template>
          </el-table-column>
          <el-table-column :label="$t('input.inventory.warehouse.columns.usedWarehouseArea')" min-width="150" align="center">
            <template #default="{ row }">
              {{ row.used_warehouse_area || 0 }} / {{ row.warehouse_area || 0 }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('input.inventory.warehouse.columns.usageRate')" min-width="140" align="center">
            <template #default="{ row }">
              <el-progress :percentage="getWarehouseArea(row)" :color="getWarehouseAreaColor(row)" />
            </template>
          </el-table-column>
          <el-table-column prop="contact_person" :label="$t('input.inventory.warehouse.columns.contactPerson')" min-width="140" />
          <el-table-column prop="contact_phone" :label="$t('input.inventory.warehouse.columns.contactPhone')" min-width="140" />
          <el-table-column prop="status" :label="$t('input.inventory.warehouse.columns.status')" min-width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="row.status === '1' ? 'success' : 'info'" size="small">
                {{ row.status === '1' ? $t('input.inventory.warehouse.status.enabled') : $t('input.inventory.warehouse.status.disabled') }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('input.inventory.warehouse.columns.actions')" width="240" fixed="right">
            <template #default="{ row }">
              <ActionButtons
                :workflow-status="row.workflowStatus || 'S0'"
                mode="list"
                :show-audit="false"
                :custom-buttons="getCustomButtons(row)"
                @action="(action) => handleAction(row, action)" />
            </template>
          </el-table-column>
        </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="pagination.page"
                v-model:page-size="pagination.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="pagination.total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handlePageChange"
              />
            </div>
          </div>
        </InfoCard>

        <!-- 移动端卡片 -->
        <div class="mobile-card-list mobile-only">
          <div v-for="item in tableData" :key="item.warehouse_id" class="mobile-card">
            <div class="mobile-card-header">
              <div class="mobile-card-title">
                <i class="ri-home-3-line"></i>
                <span>{{ item.warehouse_name }}</span>
              </div>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.inventory.warehouse.columns.warehouseCode') }}:</span>
                <span class="value">{{ item.warehouse_code }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.inventory.warehouse.columns.location') }}:</span>
                <span class="value">{{ item.location || '-' }}</span>
              </div>
              <div class="mobile-card-row" v-if="item.warehouse_area">
                <span class="label">{{ $t('input.inventory.warehouse.columns.warehouseArea') }}:</span>
                <span class="value">{{ item.warehouse_area }} L</span>
              </div>
              <div class="mobile-card-row" v-if="item.organ_name">
                <span class="label">{{ $t('input.inventory.warehouse.columns.organName') }}:</span>
                <span class="value">{{ item.organ_name }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.inventory.warehouse.columns.capacity') }}:</span>
                <span class="value">{{ item.used_capacity || 0 }} / {{ item.capacity || 0 }}</span>
              </div>
              <div class="mobile-card-row" v-if="item.contact_person">
                <span class="label">{{ $t('input.inventory.warehouse.columns.contactPerson') }}:</span>
                <span class="value">{{ item.contact_person }} - {{ item.contact_phone }}</span>
              </div>
            </div>

            <div class="mobile-card-footer">
              <ActionButtons
                :workflow-status="item.workflowStatus || 'S0'"
                mode="list"
                :show-audit="false"
                :custom-buttons="getCustomButtons(item)"
                @action="(action) => handleAction(item, action)" />
            </div>
          </div>

          <div v-if="tableData.length === 0 && !loading" class="empty-state">
            <i class="ri-inbox-line"></i>
            <p>{{ $t('home.noData') }}</p>
          </div>

          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="pagination.page"
              :total="pagination.total"
              :page-size="pagination.pageSize"
              layout="prev, pager, next"
              small
              @current-change="handlePageChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getWarehouseList, deleteWarehouse } from '@/api/inventory'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const router = useRouter()
const { t } = useI18n()

const searchKeyword = ref('')
const filterType = ref('')
const filterStatus = ref('')
const loading = ref(false)
const tableData = ref([])
const currentUserOrganCode = ref('') // 当前用户部门ID

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

// 获取仓库类型标签
const getTypeTag = (type) => {
  const typeMap = {
    normal: '',
    cold: 'info',
    dangerous: 'danger'
  }
  return typeMap[type] || ''
}

// 计算使用率
const getUsageRate = (row) => {
  if (!row.capacity || row.capacity === 0) return 0
  // 确保转换为数字类型
  const capacity = parseFloat(row.capacity) || 0
  const usedCapacity = parseFloat(row.used_capacity) || 0
  return Math.round((usedCapacity / capacity) * 100)
}
// 获取进度条颜色
const getProgressColor = (row) => {
  const rate = getUsageRate(row)
  if (rate >= 90) return '#f56c6c'
  if (rate >= 70) return '#e6a23c'
  return '#67c23a'
}

// 计算使用率
const getWarehouseArea = (row) => {
  if (!row.warehouse_area || row.warehouse_area === 0) return 0
  return Math.round(((row.used_warehouse_area || 0) / row.warehouse_area) * 100)
}
// 获取进度条颜色
const getWarehouseAreaColor = (row) => {
  const rate = getWarehouseArea(row)
  if (rate >= 90) return '#f56c6c'
  if (rate >= 70) return '#e6a23c'
  return '#67c23a'
}



// 获取当前用户部门ID
const getCurrentUserOrganCode = () => {
  const userInfoStr = localStorage.getItem('userInfo')
  if (userInfoStr) {
    const userInfo = JSON.parse(userInfoStr)
    const user = userInfo.user || userInfo
    return user.ORGANCODE || ''
  }
  return ''
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getWarehouseList({
      warehouseName: searchKeyword.value,
      warehouseType: filterType.value,
      status: filterStatus.value,
      organCode: currentUserOrganCode.value, // 按部门过滤
      page: pagination.page,
      pageSize: pagination.pageSize
    })

    if (res.code === 200) {
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

// 搜索
const handleSearch = () => {
  pagination.page = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchKeyword.value = ''
  filterType.value = ''
  filterStatus.value = ''
  pagination.page = 1
  loadData()
}

// 新增
const handleAdd = () => {
  router.push('/input/inventory/warehouse/add')
}

// 查看
const handleView = (row) => {
  router.push(`/input/inventory/warehouse/detail/${row.warehouse_id}`)
}

// 编辑
const handleEdit = (row) => {
  router.push(`/input/inventory/warehouse/edit/${row.warehouse_id}`)
}

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm(
    t('input.inventory.warehouse.deleteConfirm'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await deleteWarehouse(row.warehouse_id)
      if (res.code === 200) {
        ElMessage.success(t('input.inventory.warehouse.deleteSuccess'))
        loadData()
      }
    } catch (error) {
      console.error('Failed to delete warehouse:', error)
      ElMessage.error(t('common.failed'))
    }
  }).catch(() => {})
}

// 统一的动作处理方法
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
    case 'edit':
      handleEdit(row)
      break
    case 'delete':
      handleDelete(row)
      break
  }
}

// 获取自定义按钮配置
const getCustomButtons = (row) => {
  return [
    { type: 'primary', action: 'view', label: 'view', icon: 'ri-eye-line' },
    { type: 'primary', action: 'edit', label: 'edit', icon: 'ri-edit-line' },
    { type: 'danger', action: 'delete', label: 'delete', icon: 'ri-delete-bin-line' }
  ]
}

// 切换每页条数
const handleSizeChange = () => {
  pagination.page = 1
  loadData()
}

// 切换页码
const handlePageChange = () => {
  loadData()
}

onMounted(() => {
  currentUserOrganCode.value = getCurrentUserOrganCode()
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';

/* 移动端卡片样式 */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.warehouse-card {
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.warehouse-card:active {
  transform: scale(0.98);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f2f5;
}

.warehouse-info {
  flex: 1;
  min-width: 0;
}

.warehouse-name {
  font-size: 17px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.warehouse-code {
  font-size: 13px;
  color: #909399;
}

.card-tags {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
  flex-shrink: 0;
  margin-left: 12px;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.info-icon {
  font-size: 16px;
  color: #909399;
  flex-shrink: 0;
}

.info-label {
  color: #606266;
  flex-shrink: 0;
}

.info-value {
  color: #303133;
  font-weight: 500;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-footer {
  display: flex;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f2f5;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #909399;
}

.empty-state i {
  font-size: 64px;
  margin-bottom: 12px;
  display: block;
  opacity: 0.5;
}

.mobile-pagination {
  display: flex;
  justify-content: center;
  padding: 16px 0;
  margin-top: 16px;
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .page-header {
    margin: -16px -16px 16px -16px;
    padding: 24px;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
    padding: 20px 16px;
    gap: 16px;
  }

  .header-icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 12px;
  }

  .header-icon-wrapper i {
    font-size: 32px;
  }

  .page-title {
    font-size: 20px;
  }

  .page-subtitle {
    font-size: 13px;
  }

  .content-wrapper {
    padding: 16px;
  }

  .search-row {
    flex-direction: column;
  }

  .search-input,
  .filter-select {
    width: 100%;
  }

  .action-row {
    flex-direction: column;
    align-items: stretch;
  }

  .action-left,
  .action-right {
    justify-content: stretch;
  }

  .action-left .el-button,
  .action-right .el-button {
    flex: 1;
  }

  .action-right {
    display: none;
  }

  .pc-view {
    display: none;
  }

  .mobile-view {
    display: block;
  }

  .mobile-fab {
    display: flex;
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    box-shadow: 0 4px 16px rgba(0, 154, 68, 0.3);
    cursor: pointer;
    z-index: 50;
    transition: all 0.3s ease;
  }

  .mobile-fab:active {
    transform: scale(0.9);
  }

  .btn-text {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    padding: 16px 12px;
  }

  .header-icon-wrapper {
    width: 56px;
    height: 56px;
  }

  .header-icon-wrapper i {
    font-size: 28px;
  }

  .page-title {
    font-size: 18px;
  }

  .warehouse-card {
    padding: 14px;
  }

  .warehouse-name {
    font-size: 16px;
  }

  .mobile-fab {
    bottom: 16px;
    right: 16px;
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
}
</style>
