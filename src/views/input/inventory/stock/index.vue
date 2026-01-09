<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-database-2-line"
        :title="$t('input.inventory.stock.title')"
        :subtitle="$t('input.inventory.stock.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片（无标题） -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('input.inventory.stock.filterByWarehouse')">
              <el-select
                v-model="filterWarehouse"
                :placeholder="$t('input.inventory.stock.filterByWarehouse')"
                clearable
                class="search-input">
                <el-option :label="$t('input.inventory.stock.allWarehouses')" value="" />
                <el-option
                  v-for="warehouse in warehouseList"
                  :key="warehouse.warehouse_id"
                  :label="warehouse.warehouse_name"
                  :value="warehouse.warehouse_id" />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('input.catalog.form.inputType')">
              <el-select
                v-model="filterMaterialType"
                :placeholder="$t('input.catalog.form.inputType')"
                clearable
                class="search-input"
                @change="handleMaterialTypeFilterChange">
                <el-option :label="$t('input.catalog.type.all')" value="" />
                <el-option
                  v-for="item in materialTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('input.catalog.form.agriculturalInputType')">
              <el-select
                v-model="filterAgriculturalInputType"
                :placeholder="$t('input.catalog.form.agriculturalInputType')"
                clearable
                class="search-input">
                <el-option :label="$t('common.all')" value="" />
                <el-option
                  v-for="item in agriculturalInputTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('input.inventory.stock.list')" icon="ri-file-list-3-line">
          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table
              v-loading="loading"
              :data="tableData"
              stripe>
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
          <el-table-column prop="capacity" :label="$t('input.inventory.warehouse.columns.capacity') + ' (KG)'" min-width="140" align="center" />
          <el-table-column prop="warehouse_area" :label="$t('input.inventory.warehouse.columns.usedWarehouseArea')+ ' (L)'"  min-width="140" align="center" />
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
<!--          <el-table-column prop="status" :label="$t('input.inventory.stock.columns.stockStatus')" width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="getStatusTag(row.status)" size="small">
                {{ getStatusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>-->
          <el-table-column :label="$t('input.inventory.stock.columns.actions')" width="240" fixed="right">
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
              <div class="statistics-summary">
                <span v-for="(item, index) in typeStatistics" :key="index" class="stat-item">
                  ({{ getLabelByValue('input_type', item.materialType) }}) {{ $t('input.inventory.stock.summary.total') }}{{ item.total }}{{ index < typeStatistics.length - 1 ? ',    ' : '' }}
                </span>
              </div>
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
          <div v-for="item in tableData" :key="item.inventory_id" class="mobile-card">
            <div class="mobile-card-header">
              <div class="mobile-card-title">
                <i class="ri-database-line"></i>
                <span>{{ item.material_name || item.input_name }}</span>
              </div>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.inventory.stock.columns.batchNo') }}:</span>
                <span class="value">{{ item.material_batch_id || item.batch_no }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.inventory.stock.columns.warehouseName') }}:</span>
                <span class="value">{{ item.warehouse_name }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.inventory.stock.columns.currentQuantity') }}:</span>
                <span class="value">{{ item.quantity || item.current_quantity }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.inventory.stock.columns.inDate') }}:</span>
                <span class="value">{{ formatDateTime(item.created_at || item.in_date) }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.inventory.stock.columns.expiredDate') }}:</span>
                <span class="value">{{ formatDate(item.expiry_date || item.expired_date) }}</span>
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

          <div class="mobile-statistics">
            <div class="statistics-summary">
              <span v-for="(item, index) in typeStatistics" :key="index" class="stat-item">
                ({{ getLabelByValue('input_type', item.materialType) }}) {{ $t('input.inventory.stock.summary.total') }}{{ item.total }}{{ index < typeStatistics.length - 1 ? ', ' : '' }}
              </span>
            </div>
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
import { ElMessage } from 'element-plus'
import { getStockList, getStockSummary } from '@/api/stock'
import { getWarehouseList } from '@/api/inventory'
import { getInputList } from '@/api/input'
import { useDict } from '@/hooks/useDict'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const { getLabelByValue } = useDict(['input_type', 'input_category'])


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
const typeStatistics = ref([]) // 投入品类型统计数据

// 投入品类型选项（从库存中动态获取）
const materialTypeOptions = ref([])
// 投入品品类选项（从库存中动态获取）
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


// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return '-'

  // 处理带时区和毫秒的日期格式 (如: "2025-12-14 11:00:27.000+08:00")
/*  if (dateStr.includes('+') && dateStr.includes('.')) {
    const datePart = dateStr.split(' ')[0]
    const timePart = dateStr.split(' ')[1].split('.')[0]
    return `${datePart} ${timePart}`
  }*/

  // 处理标准ISO格式 (如: "2025-12-14T01:40:59")
  return dateStr.replace('T', ' ')
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

// 加载投入品类型选项（从库存中获取）
const loadMaterialTypes = async () => {
  try {
    const res = await getStockList({
      page: 1,
      pageSize: 10000,
      organCode: currentUserOrganCode.value,
      minQuantity: 0.01 // 只显示库存大于0的记录
    });

    if (res.code === 200 && res.data && res.data.items) {
      // 提取所有不重复的materialType值
      const types = new Set()
      res.data.items.forEach(item => {
        if (item.material_type) {
          types.add(item.material_type)
        }
      })

      // 添加农药选项，确保即使库存中没有农药记录也能显示
      //types.add('pesticide')

      materialTypeOptions.value = Array.from(types).map(type => ({
        label: getLabelByValue('input_type', type) || type,
        value: type
      }))
    }
  } catch (error) {
    console.error('Failed to load material types from stock:', error)
    // 即使加载失败，也提供基本的投入品类型选项
    materialTypeOptions.value = [
      { label: t('input.catalog.type.seed'), value: 'seed' },
      { label: t('input.catalog.type.fertilizer'), value: 'fertilizer' },
      { label: t('input.catalog.type.pesticide'), value: 'pesticide' },
      { label: t('input.catalog.type.other'), value: 'other' }
    ]
  }
}

// 加载投入品品类选项（从库存中获取）
const loadAgriculturalInputTypes = async () => {
  try {
    const res = await getStockList({
      page: 1,
      pageSize: 10000,
      materialType: filterMaterialType.value, // 根据当前选择的类型筛选
      organCode: currentUserOrganCode.value,
      minQuantity: 0.01 // 只显示库存大于0的记录
    })
    if (res.code === 200 && res.data && res.data.items) {
      // 提取所有不重复的agriculturalInputType值
      const types = new Set()
      res.data.items.forEach(item => {
        if (item.agricultural_input_type) {
          types.add(item.agricultural_input_type)
        }
      })
      agriculturalInputTypeOptions.value = Array.from(types).map(type => ({
        label: getLabelByValue('input_category', type) || type,
        value: type
      }))
    }
  } catch (error) {
    console.error('Failed to load agricultural input types from stock:', error)
    agriculturalInputTypeOptions.value = []
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
      organCode: currentUserOrganCode.value, // 按部门过滤
      minQuantity: 0.01 // 只统计库存大于0的记录，与列表查询保持一致
    })

    if (res.code === 200 && res.data && Array.isArray(res.data) && res.data.length > 0) {
      summaryData.value = res.data
      // 计算投入品类型统计
      calculateTypeStatistics()
    } else {
      // 没有数据时清空统计
      summaryData.value = []
      typeStatistics.value = []
    }
  } catch (error) {
    console.error('Failed to load summary data:', error)
    summaryData.value = []
    typeStatistics.value = []
  }
}

// 计算投入品类型统计
const calculateTypeStatistics = () => {
  // 严格检查数据是否存在
  if (!summaryData.value || !Array.isArray(summaryData.value) || summaryData.value.length === 0) {
    typeStatistics.value = []
    return
  }

  // 按投入品类型分组统计
  const typeMap = new Map()
  summaryData.value.forEach(item => {
    const materialType = item.material_type
    const totalQuantity = Number(item.total_quantity || 0)

    // 只统计有效的数据（类型存在且数量大于0）
    if (materialType && totalQuantity > 0) {
      if (typeMap.has(materialType)) {
        typeMap.set(materialType, typeMap.get(materialType) + totalQuantity)
      } else {
        typeMap.set(materialType, totalQuantity)
      }
    }
  })

  // 如果没有有效的统计数据，清空结果
  if (typeMap.size === 0) {
    typeStatistics.value = []
    return
  }

  // 转换为数组格式
  typeStatistics.value = Array.from(typeMap.entries()).map(([materialType, total]) => ({
    materialType,
    total: Math.round(total) // 四舍五入到整数
  }))
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
      minQuantity: 0.01, // 只显示库存大于0的记录
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

// 投入品类型筛选变化
const handleMaterialTypeFilterChange = () => {
  // 清空品类筛选
  filterAgriculturalInputType.value = ''
  // 重新加载品类选项
  loadAgriculturalInputTypes()
  // 触发搜索
  handleSearch()
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
  loadMaterialTypes()
  loadAgriculturalInputTypes()
}

// 查看
const handleView = (row) => {
  router.push(`/input/inventory/stock/detail/${row.stock_id || row.id}`)
}

// 统一的动作处理方法
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
  }
}

// 获取自定义按钮配置
const getCustomButtons = (row) => {
  return [
    { type: 'primary', action: 'view', label: 'view', icon: 'ri-eye-line' }
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
  loadWarehouses()
  loadMaterialTypes()
  loadAgriculturalInputTypes()
  loadData()
  loadSummaryData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';

.statistics-summary {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #606266;
  flex-shrink: 0;
}

.stat-item {
  white-space: nowrap;
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

.mobile-statistics {
  padding: 12px 0;
  border-top: 1px solid #e4e7ed;
  margin-top: 16px;
}

.mobile-pagination {
  display: flex;
  justify-content: center;
  padding: 16px 0;
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

  .pagination-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }

  .statistics-summary {
    flex-wrap: wrap;
    font-size: 13px;
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
