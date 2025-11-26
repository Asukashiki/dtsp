<template>
  <div class="stock-out-management-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon-wrapper">
        <i class="ri-inbox-unarchive-line"></i>
      </div>
      <div class="header-text">
        <h1 class="page-title">{{ $t('input.inventory.stockOut.title') }}</h1>
        <p class="page-subtitle">{{ $t('input.inventory.stockOut.subtitle') }}</p>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 搜索和筛选栏 -->
      <div class="search-bar">
        <div class="search-row">
          <el-input
            v-model="searchKeyword"
            :placeholder="$t('input.inventory.stockOut.searchPlaceholder')"
            class="search-input"
            clearable
            @clear="handleSearch"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <i class="ri-search-line"></i>
            </template>
          </el-input>

          <el-select
            v-model="filterWarehouse"
            :placeholder="$t('input.inventory.stockOut.filterByWarehouse')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('input.inventory.stockOut.allWarehouses')" value="" />
          </el-select>

          <el-select
            v-model="filterType"
            :placeholder="$t('input.inventory.stockOut.filterByType')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('input.inventory.stockOut.allTypes')" value="" />
            <el-option :label="$t('input.inventory.stockOut.type.sale')" value="0" />
          </el-select>

          <el-select
            v-model="filterStatus"
            :placeholder="$t('input.inventory.stockOut.filterByStatus')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('input.inventory.stockOut.allStatus')" value="" />
            <el-option :label="$t('input.inventory.stockOut.status.pending')" value="0" />
            <el-option :label="$t('input.inventory.stockOut.status.confirmed')" value="1" />
            <el-option :label="$t('input.inventory.stockOut.status.cancelled')" value="2" />
          </el-select>
        </div>

        <div class="action-row">
          <div class="action-left">
            <el-button type="primary" @click="handleSearch">
              <i class="ri-search-line"></i>
              <span class="btn-text">{{ $t('common.search') }}</span>
            </el-button>
            <el-button @click="handleReset">
              <i class="ri-restart-line"></i>
              <span class="btn-text">{{ $t('common.reset') }}</span>
            </el-button>
          </div>
          <div class="action-right">
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              <span class="btn-text">{{ $t('input.inventory.stockOut.add') }}</span>
            </el-button>
          </div>
        </div>
      </div>

      <!-- PC端：数据表格 -->
      <div class="table-card pc-view">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="stock_out_id" :label="$t('input.inventory.stockOut.columns.stockOutId')" width="180" fixed="left" />
          <el-table-column prop="warehouse_name" :label="$t('input.inventory.stockOut.columns.warehouseName')" min-width="150" show-overflow-tooltip />
          <el-table-column prop="customer" :label="$t('input.inventory.stockOut.columns.customer')" min-width="150" show-overflow-tooltip />
          <el-table-column prop="type" :label="$t('input.inventory.stockOut.columns.type')" width="120" align="center">
            <template #default="{ row }">
              <el-tag type="success" size="small">
                {{ $t('input.inventory.stockOut.type.sale') }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="batch_no" :label="$t('input.inventory.stockOut.columns.batchNo')" min-width="180" />
          <el-table-column prop="total_quantity" :label="$t('input.inventory.stockOut.columns.totalQuantity')" width="160" align="center" />
          <el-table-column prop="operator" :label="$t('input.inventory.stockOut.columns.operator')" width="120" />
          <el-table-column prop="status" :label="$t('input.inventory.stockOut.columns.status')" width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="getStatusTag(row.status)" size="small">
                {{ getStatusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" :label="$t('input.inventory.stockOut.columns.createTime')" width="160" />
          <el-table-column :label="$t('input.inventory.stockOut.columns.actions')" width="240" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleView(row)">
                <i class="ri-eye-line"></i>
              </el-button>
              <el-button v-if="row.status === '0'" link type="success" @click="handleConfirm(row)">
                <i class="ri-check-line"></i>
              </el-button>
              <el-button v-if="row.status === '0'" link type="danger" @click="handleDelete(row)">
                <i class="ri-delete-bin-line"></i>
              </el-button>
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

      <!-- 移动端：卡片列表 -->
      <div class="mobile-view" v-loading="loading">
        <div class="card-list">
          <div v-for="item in tableData" :key="item.stock_out_id" class="stock-out-card" @click="handleView(item)">
            <div class="card-header">
              <div class="stock-out-info">
                <h3 class="stock-out-id">{{ item.stock_out_id }}</h3>
                <span class="batch-no">{{ $t('input.inventory.stockOut.columns.batchNo') }}: {{ item.batch_no }}</span>
              </div>
              <div class="card-tags">
                <el-tag type="success" size="small">
                  {{ $t('input.inventory.stockOut.type.sale') }}
                </el-tag>
                <el-tag :type="getStatusTag(item.status)" size="small">
                  {{ getStatusText(item.status) }}
                </el-tag>
              </div>
            </div>

            <div class="card-body">
              <div class="info-row">
                <i class="ri-home-3-line info-icon"></i>
                <span class="info-label">{{ $t('input.inventory.stockOut.columns.warehouseName') }}:</span>
                <span class="info-value">{{ item.warehouse_name || '-' }}</span>
              </div>

              <div class="info-row">
                <i class="ri-user-line info-icon"></i>
                <span class="info-label">{{ $t('input.inventory.stockOut.columns.customer') }}:</span>
                <span class="info-value">{{ item.customer || '-' }}</span>
              </div>

              <div class="info-row">
                <i class="ri-archive-line info-icon"></i>
                <span class="info-label">{{ $t('input.inventory.stockOut.columns.totalQuantity') }}:</span>
                <span class="info-value">{{ item.total_quantity }}</span>
              </div>

              <div class="info-row" v-if="item.operator">
                <i class="ri-user-settings-line info-icon"></i>
                <span class="info-label">{{ $t('input.inventory.stockOut.columns.operator') }}:</span>
                <span class="info-value">{{ item.operator }}</span>
              </div>

              <div class="info-row">
                <i class="ri-time-line info-icon"></i>
                <span class="info-label">{{ $t('input.inventory.stockOut.columns.createTime') }}:</span>
                <span class="info-value">{{ item.create_time }}</span>
              </div>
            </div>

            <div class="card-footer" @click.stop>
              <el-button v-if="item.status === '0'" link type="success" size="small" @click="handleConfirm(item)">
                <i class="ri-check-line"></i> {{ $t('input.inventory.stockOut.confirm') }}
              </el-button>
              <el-button v-if="item.status === '0'" link type="danger" size="small" @click="handleDelete(item)">
                <i class="ri-delete-bin-line"></i> {{ $t('common.delete') }}
              </el-button>
            </div>
          </div>
        </div>

        <div v-if="tableData.length === 0 && !loading" class="empty-state">
          <i class="ri-inbox-line"></i>
          <p>{{ $t('home.noData') }}</p>
        </div>

        <div class="mobile-pagination">
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

    <!-- 移动端浮动添加按钮 -->
    <div class="mobile-fab" @click="handleAdd">
      <i class="ri-add-line"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getStockOutList, deleteStockOut, confirmStockOut } from '@/api/inventory'

const router = useRouter()
const { t } = useI18n()

const searchKeyword = ref('')
const filterWarehouse = ref('')
const filterType = ref('')
const filterStatus = ref('')
const loading = ref(false)
const tableData = ref([])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

// 获取状态标签
const getStatusTag = (status) => {
  const statusMap = {
    '0': 'warning',
    '1': 'success',
    '2': 'info'
  }
  return statusMap[status] || 'info'
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    '0': t('input.inventory.stockOut.status.pending'),
    '1': t('input.inventory.stockOut.status.confirmed'),
    '2': t('input.inventory.stockOut.status.cancelled')
  }
  return statusMap[status] || '-'
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getStockOutList({
      warehouseId: filterWarehouse.value,
      customer: searchKeyword.value,
      type: filterType.value,
      status: filterStatus.value,
      page: pagination.page,
      pageSize: pagination.pageSize
    })

    if (res.code === 200) {
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    console.error('Failed to load stock out list:', error)
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
  filterWarehouse.value = ''
  filterType.value = ''
  filterStatus.value = ''
  pagination.page = 1
  loadData()
}

// 新增
const handleAdd = () => {
  router.push('/input/inventory/stock-out/add')
}

// 查看
const handleView = (row) => {
  router.push(`/input/inventory/stock-out/detail/${row.stock_out_id}`)
}

// 确认出库
const handleConfirm = (row) => {
  ElMessageBox.confirm(
    t('input.inventory.stockOut.confirmConfirm'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await confirmStockOut(row.stock_out_id)
      if (res.code === 200) {
        ElMessage.success(t('input.inventory.stockOut.confirmSuccess'))
        loadData()
      }
    } catch (error) {
      console.error('Failed to confirm stock out:', error)
      ElMessage.error(t('common.failed'))
    }
  }).catch(() => {})
}

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm(
    t('input.inventory.stockOut.deleteConfirm'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await deleteStockOut(row.stock_out_id)
      if (res.code === 200) {
        ElMessage.success(t('input.inventory.stockOut.deleteSuccess'))
        loadData()
      }
    } catch (error) {
      console.error('Failed to delete stock out:', error)
      ElMessage.error(t('common.failed'))
    }
  }).catch(() => {})
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
  loadData()
})
</script>

<style scoped>
.stock-out-management-page {
  min-height: calc(100vh - 120px);
  position: relative;
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  padding: 32px;
  margin: -24px 0 24px 0;
  border-radius: 0 0 16px 16px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.header-icon-wrapper {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  flex-shrink: 0;
}

.header-icon-wrapper i {
  font-size: 40px;
  color: white;
}

.header-text {
  flex: 1;
  color: white;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 15px;
  opacity: 0.9;
  margin: 0;
}

/* 内容区域 */
.content-wrapper {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 搜索栏 */
.search-bar {
  margin-bottom: 24px;
}

.search-row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.filter-select {
  width: 160px;
  flex-shrink: 0;
}

.action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.action-left,
.action-right {
  display: flex;
  gap: 8px;
}

/* PC端表格 */
.table-card {
  background: white;
}

.pagination-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

/* 移动端默认隐藏 */
.mobile-view,
.mobile-fab {
  display: none;
}

/* 移动端卡片样式 */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stock-out-card {
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.stock-out-card:active {
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

.stock-out-info {
  flex: 1;
  min-width: 0;
}

.stock-out-id {
  font-size: 17px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.batch-no {
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

  .stock-out-card {
    padding: 14px;
  }

  .stock-out-id {
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
