<template>
  <div class="stock-management-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon-wrapper">
        <i class="ri-database-2-line"></i>
      </div>
      <div class="header-text">
        <h1 class="page-title">{{ $t('input.inventory.stock.title') }}</h1>
        <p class="page-subtitle">{{ $t('input.inventory.stock.subtitle') }}</p>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 搜索和筛选栏 -->
      <div class="search-bar">
        <div class="search-row">
          <el-select
            v-model="filterWarehouse"
            :placeholder="$t('input.inventory.stock.filterByWarehouse')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('input.inventory.stock.allWarehouses')" value="" />
            <el-option
              v-for="warehouse in warehouseList"
              :key="warehouse.warehouse_id"
              :label="warehouse.warehouse_name"
              :value="warehouse.warehouse_id"
            />
          </el-select>

          <el-select
            v-model="filterMaterialType"
            :placeholder="$t('input.catalog.form.inputType')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('input.catalog.type.all')" value="" />
            <el-option :label="$t('input.catalog.type.seed')" value="seed" />
            <el-option :label="$t('input.catalog.type.fertilizer')" value="fertilizer" />
            <el-option :label="$t('input.catalog.type.pesticide')" value="pesticide" />
            <el-option :label="$t('input.catalog.type.other')" value="other" />
          </el-select>

          <el-select
            v-model="filterAgriculturalInputType"
            :placeholder="$t('input.catalog.form.agriculturalInputType')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('common.all')" value="" />
            <el-option
              v-for="item in agriculturalInputTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-select
            v-model="filterStatus"
            :placeholder="$t('input.inventory.stock.filterByStatus')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('input.inventory.stock.allStatus')" value="" />
            <el-option :label="$t('input.inventory.stock.status.normal')" value="0" />
            <el-option :label="$t('input.inventory.stock.status.nearExpiry')" value="1" />
            <el-option :label="$t('input.inventory.stock.status.expired')" value="2" />
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
        </div>
      </div>

      <!-- 合计统计展示 -->
      <div v-if="summaryData && summaryData.length > 0" class="summary-section">
        <div class="summary-title">{{ $t('input.inventory.stock.summary.title') }}</div>
        <div class="summary-content">
          <span v-for="(item, index) in summaryData" :key="index" class="summary-item">
            {{ getMaterialTypeText(item.material_type) }}: {{ $t('input.inventory.stock.summary.total') }} {{ item.total_quantity }} {{ item.unit }}
          </span>
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
          <el-table-column prop="material_name" :label="$t('input.inventory.stock.columns.inputName')" min-width="150" fixed="left" show-overflow-tooltip />
          <el-table-column prop="material_type" :label="$t('input.catalog.form.inputType')" min-width="120">
            <template #default="{ row }">
              {{ getLabelByValue('input_type', row.material_type) }}
            </template>
          </el-table-column>
          <el-table-column prop="agricultural_input_type" :label="$t('input.catalog.form.agriculturalInputType')" min-width="120">
            <template #default="{ row }">
              {{ getLabelByValue('input_category', row.agricultural_input_type) }}
            </template>
          </el-table-column>
          <el-table-column prop="material_batch_id" :label="$t('input.inventory.stock.columns.batchNo')" min-width="180" />
          <el-table-column prop="warehouse_name" :label="$t('input.inventory.stock.columns.warehouseName')" min-width="150" show-overflow-tooltip />
          <el-table-column prop="quantity" :label="$t('input.inventory.stock.columns.currentQuantity')" min-width="140" align="center" />
          <el-table-column prop="created_at" :label="$t('input.inventory.stock.columns.inDate')" width="120">
            <template #default="{ row }">
              {{ formatDateTime(row.created_at) }}
            </template>
          </el-table-column>
          <el-table-column prop="expiry_date" :label="$t('input.inventory.stock.columns.expiredDate')" width="140">
            <template #default="{ row }">
              {{ formatDate(row.expiry_date) }}
            </template>
          </el-table-column>
          <el-table-column prop="status" :label="$t('input.inventory.stock.columns.stockStatus')" width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="getStatusTag(row.status)" size="small">
                {{ getStatusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('input.inventory.stock.columns.actions')" width="120" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleView(row)">
                <i class="ri-eye-line"></i>
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
          <div v-for="item in tableData" :key="item.inventory_id" class="stock-card" @click="handleView(item)">
            <div class="card-header">
              <div class="stock-info">
                <h3 class="stock-name">{{ item.input_name }}</h3>
                <span class="batch-no">{{ $t('input.inventory.stock.columns.batchNo') }}: {{ item.batch_no }}</span>
              </div>
              <div class="card-tags">
                <el-tag :type="getStatusTag(item.stock_status)" size="small">
                  {{ getStatusText(item.stock_status) }}
                </el-tag>
              </div>
            </div>

            <div class="card-body">
              <div class="info-row">
                <i class="ri-home-3-line info-icon"></i>
                <span class="info-label">{{ $t('input.inventory.stock.columns.warehouseName') }}:</span>
                <span class="info-value">{{ item.warehouse_name }}</span>
              </div>

              <div class="info-row">
                <i class="ri-archive-line info-icon"></i>
                <span class="info-label">{{ $t('input.inventory.stock.columns.currentQuantity') }}:</span>
                <span class="info-value">{{ item.current_quantity }}</span>
              </div>

              <div class="info-row">
                <i class="ri-calendar-line info-icon"></i>
                <span class="info-label">{{ $t('input.inventory.stock.columns.inDate') }}:</span>
                <span class="info-value">{{ formatDateTime(item.in_date) }}</span>
              </div>

              <div class="info-row">
                <i class="ri-calendar-check-line info-icon"></i>
                <span class="info-label">{{ $t('input.inventory.stock.columns.expiredDate') }}:</span>
                <span class="info-value">{{ formatDate(item.expired_date) }}</span>
              </div>
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getStockList, getStockSummary } from '@/api/stock'
import { getWarehouseList } from '@/api/inventory'
import { getInputList } from '@/api/input'
import { useDict } from '@/hooks/useDict'

const { getLabelByValue, options } = useDict(['input_type', 'input_category'])

const router = useRouter()
const { t } = useI18n()

const filterWarehouse = ref('')
const filterMaterialType = ref('')
const filterAgriculturalInputType = ref('')
const filterStatus = ref('')
const loading = ref(false)
const tableData = ref([])
const warehouseList = ref([])
const currentUserOrganCode = ref('') // 当前用户部门ID
const summaryData = ref([]) // 合计统计数据

// 投入品品类选项（动态获取）
const agriculturalInputTypeOptions = ref([])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

// 格式化日期时间
const formatDateTime = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 获取状态标签
const getStatusTag = (status) => {
  const statusMap = {
    '0': 'success',
    '1': 'warning',
    '2': 'danger'
  }
  return statusMap[status] || 'info'
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    '0': t('input.inventory.stock.status.normal'),
    '1': t('input.inventory.stock.status.nearExpiry'),
    '2': t('input.inventory.stock.status.expired')
  }
  return statusMap[status] || '-'
}

// 获取投入品类型文本
const getMaterialTypeText = (type) => {
  const typeMap = {
    'seed': t('input.catalog.type.seed'),
    'fertilizer': t('input.catalog.type.fertilizer'),
    'pesticide': t('input.catalog.type.pesticide'),
    'other': t('input.catalog.type.other')
  }
  return typeMap[type] || type
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

// 加载投入品品类选项
const loadAgriculturalInputTypes = async () => {
  try {
    const res = await getInputList({
      page: 1,
      pageSize: 1000,
      status: 'active'
    })
    if (res.code === 200 && res.data && res.data.list) {
      // 提取所有不重复的agriculturalInputType值
      const types = new Set()
      res.data.list.forEach(item => {
        if (item.agriculturalInputType) {
          types.add(item.agriculturalInputType)
        }
      })
      agriculturalInputTypeOptions.value = Array.from(types).map(type => ({
        label: type,
        value: type
      }))
    }
  } catch (error) {
    console.error('Failed to load agricultural input types:', error)
    // 如果获取失败，使用默认选项
    agriculturalInputTypeOptions.value = [
      { label: '杀虫剂', value: '杀虫剂' },
      { label: '杀菌剂', value: '杀菌剂' },
      { label: '除草剂', value: '除草剂' },
      { label: '复合肥', value: '复合肥' },
      { label: '氮肥', value: '氮肥' },
      { label: '磷肥', value: '磷肥' },
      { label: '钾肥', value: '钾肥' },
      { label: '玉米种子', value: '玉米种子' },
      { label: '小麦种子', value: '小麦种子' },
      { label: '水稻种子', value: '水稻种子' }
    ]
  }
}

// 加载仓库列表
const loadWarehouses = async () => {
  try {
    const res = await getWarehouseList({
      page: 1,
      pageSize: 100,
      organCode: currentUserOrganCode.value // 按部门过滤
    })
    if (res.code === 200 && res.data) {
      warehouseList.value = res.data.list || []
    }
  } catch (error) {
    console.error('Failed to load warehouses:', error)
  }
}

// 加载合计统计数据
const loadSummaryData = async () => {
  try {
    const res = await getStockSummary({
      warehouseId: filterWarehouse.value,
      materialType: filterMaterialType.value,
      agriculturalInputType: filterAgriculturalInputType.value,
      organCode: currentUserOrganCode.value // 按部门过滤
    })

    if (res.code === 200 && res.data) {
      summaryData.value = res.data
    } else {
      summaryData.value = []
    }
  } catch (error) {
    console.error('Failed to load summary data:', error)
    summaryData.value = []
  }
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getStockList({
      warehouseId: filterWarehouse.value,
      materialType: filterMaterialType.value,
      agriculturalInputType: filterAgriculturalInputType.value,
      organCode: currentUserOrganCode.value, // 按部门过滤
      page: pagination.page,
      pageSize: pagination.pageSize
    })

    if (res.code === 200 && res.data) {
      tableData.value = res.data.items || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    console.error('Failed to load stock list:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.page = 1
  loadData()
  loadSummaryData()
}

// 重置
const handleReset = () => {
  filterWarehouse.value = ''
  filterMaterialType.value = ''
  filterAgriculturalInputType.value = ''
  filterStatus.value = ''
  pagination.page = 1
  loadData()
  loadSummaryData()
}

// 查看
const handleView = (row) => {
  router.push(`/input/inventory/stock/detail/${row.stock_id || row.id}`)
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
  loadWarehouses()
  loadAgriculturalInputTypes()
  loadData()
  loadSummaryData()
})
</script>

<style scoped>
.stock-management-page {
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

.action-left {
  display: flex;
  gap: 8px;
}

/* 合计统计 */
.summary-section {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}

.summary-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 12px;
}

.summary-content {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.summary-item {
  background: white;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  color: #606266;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
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
.mobile-view {
  display: none;
}

/* 移动端卡片样式 */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stock-card {
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.stock-card:active {
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

.stock-info {
  flex: 1;
  min-width: 0;
}

.stock-name {
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

  .action-left {
    justify-content: stretch;
  }

  .action-left .el-button {
    flex: 1;
  }

  .pc-view {
    display: none;
  }

  .mobile-view {
    display: block;
  }

  .btn-text {
    display: none;
  }

  .summary-content {
    flex-direction: column;
    gap: 8px;
  }

  .summary-item {
    width: 100%;
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

  .stock-card {
    padding: 14px;
  }

  .stock-name {
    font-size: 16px;
  }
}
</style>
