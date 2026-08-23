<template>
  <div class="supplier-product-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <i class="ri-stack-line header-icon"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">{{ $t('input.supplier.product.title') }}</h1>
          <p class="page-subtitle">{{ $t('input.supplier.product.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 搜索栏 -->
      <div class="search-bar">
        <div class="search-row">
          <el-input
            v-model="searchFilters.keyword"
            :placeholder="$t('input.supplier.product.searchPlaceholder')"
            class="search-input"
            clearable
            @clear="handleSearch"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <i class="ri-search-line"></i>
            </template>
          </el-input>
        </div>

        <div class="action-row">
          <div class="action-left">
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              <span class="btn-text">{{ $t('common.add') }}</span>
            </el-button>
            <el-button type="primary" plain @click="handleSearch">
              <i class="ri-search-line"></i>
              <span class="btn-text">{{ $t('common.search') }}</span>
            </el-button>
            <el-button @click="handleReset">
              <i class="ri-restart-line"></i>
              <span class="btn-text">{{ $t('common.reset') }}</span>
            </el-button>
          </div>
        </div>

        <!-- 筛选条件 -->
        <div class="filter-row">
          <el-row :gutter="16">
            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('input.supplier.product.form.inputType') }}</label>
                <el-radio-group v-model="searchFilters.inputType" @change="handleSearch">
                  <el-radio-button label="">{{ $t('input.supplier.product.inputType.all') }}</el-radio-button>
                  <el-radio-button label="pesticide">{{ $t('input.supplier.product.inputType.pesticide') }}</el-radio-button>
                  <el-radio-button label="fertilizer">{{ $t('input.supplier.product.inputType.fertilizer') }}</el-radio-button>
                  <el-radio-button label="seed">{{ $t('input.supplier.product.inputType.seed') }}</el-radio-button>
                  <el-radio-button label="other">{{ $t('input.supplier.product.inputType.other') }}</el-radio-button>
                </el-radio-group>
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('input.supplier.product.form.inputName') }}</label>
                <el-input
                  v-model="searchFilters.inputName"
                  :placeholder="$t('input.supplier.product.placeholder.inputName')"
                  clearable
                  @clear="handleSearch"
                />
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('input.supplier.product.form.inputSku') }}</label>
                <el-input
                  v-model="searchFilters.inputSku"
                  :placeholder="$t('input.supplier.product.placeholder.inputSku')"
                  clearable
                  @clear="handleSearch"
                />
              </div>
            </el-col>

            <el-col :xs="24" :sm="12" :md="6">
              <div class="filter-item">
                <label class="filter-label">{{ $t('input.supplier.product.form.qualityRating') }}</label>
                <el-select
                  v-model="searchFilters.qualityRating"
                  :placeholder="$t('input.supplier.product.filterByQuality')"
                  clearable
                  style="width: 100%"
                  @change="handleSearch"
                >
                  <el-option label="A" value="A" />
                  <el-option label="B" value="B" />
                  <el-option label="C" value="C" />
                  <el-option label="D" value="D" />
                </el-select>
              </div>
            </el-col>
          </el-row>
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
          <el-table-column prop="input_name" :label="$t('input.supplier.product.columns.inputName')" min-width="180" show-overflow-tooltip />
          <el-table-column prop="input_type" :label="$t('input.supplier.product.columns.inputType')" min-width="120">
            <template #default="{ row }">
              <el-tag v-if="row.input_type" size="small">
                {{ $t(`input.supplier.product.inputType.${row.input_type}`) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="supplier_name" :label="$t('input.supplier.product.columns.supplierName')" min-width="180" show-overflow-tooltip />
          <el-table-column prop="supplier_product_code" :label="$t('input.supplier.product.columns.supplierProductCode')" min-width="150" show-overflow-tooltip />
          <el-table-column prop="current_price" :label="$t('input.supplier.product.columns.currentPrice')" min-width="120" align="right">
            <template #default="{ row }">
              <span v-if="row.current_price">{{ formatPrice(row.current_price) }}</span>
              <span v-else class="text-muted">-</span>
            </template>
          </el-table-column>
          <el-table-column prop="quality_rating" :label="$t('input.supplier.product.columns.qualityRating')" min-width="100" align="center">
            <template #default="{ row }">
              <el-tag v-if="row.quality_rating" :type="getQualityTagType(row.quality_rating)" size="small">
                {{ row.quality_rating }}
              </el-tag>
              <span v-else class="text-muted">-</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('input.supplier.product.columns.actions')" min-width="300" align="center" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleView(row)">
                <i class="ri-eye-line"></i>
                {{ $t('input.supplier.product.actions.view') }}
              </el-button>
              <el-button link type="primary" @click="handleEdit(row)">
                <i class="ri-edit-line"></i>
                {{ $t('input.supplier.product.actions.edit') }}
              </el-button>
              <el-button link type="danger" @click="handleDelete(row)">
                <i class="ri-delete-bin-line"></i>
                {{ $t('input.supplier.product.actions.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination-wrapper">
          <el-pagination
            v-model:current-page="pagination.page"
            v-model:page-size="pagination.pageSize"
            :total="pagination.total"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>

      <!-- 移动端：卡片列表 -->
      <div class="mobile-view">
        <div class="mobile-add-btn">
          <el-button type="primary" @click="handleAdd" style="width: 100%">
            <i class="ri-add-line"></i>
            {{ $t('common.add') }}
          </el-button>
        </div>

        <div v-loading="loading" class="card-list">
          <div v-if="tableData.length === 0" class="empty-state">
            <i class="ri-inbox-line empty-icon"></i>
            <p class="empty-text">{{ $t('input.supplier.product.messages.noData') }}</p>
          </div>

          <div v-for="item in tableData" :key="item.supplier_product_id" class="product-card">
            <div class="card-header">
              <div class="product-name">
                <i class="ri-product-hunt-line"></i>
                {{ item.input_name }}
              </div>
              <el-tag v-if="item.input_type" size="small">
                {{ $t(`input.supplier.product.inputType.${item.input_type}`) }}
              </el-tag>
            </div>

            <div class="card-body">
              <div class="info-row">
                <span class="label">{{ $t('input.supplier.product.columns.supplierName') }}:</span>
                <span class="value">{{ item.supplier_name }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('input.supplier.product.columns.supplierProductCode') }}:</span>
                <span class="value">{{ item.supplier_product_code || '-' }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('input.supplier.product.columns.currentPrice') }}:</span>
                <span class="value price">{{ item.current_price ? formatPrice(item.current_price) : '-' }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('input.supplier.product.columns.qualityRating') }}:</span>
                <el-tag v-if="item.quality_rating" :type="getQualityTagType(item.quality_rating)" size="small">
                  {{ item.quality_rating }}
                </el-tag>
                <span v-else class="value">-</span>
              </div>
            </div>

            <div class="card-footer">
              <el-button size="small" @click="handleView(item)">
                <i class="ri-eye-line"></i>
                {{ $t('input.supplier.product.actions.view') }}
              </el-button>
              <el-button size="small" type="primary" @click="handleEdit(item)">
                <i class="ri-edit-line"></i>
                {{ $t('input.supplier.product.actions.edit') }}
              </el-button>
              <el-button size="small" type="danger" plain @click="handleDelete(item)">
                <i class="ri-delete-bin-line"></i>
                {{ $t('input.supplier.product.actions.delete') }}
              </el-button>
            </div>
          </div>
        </div>

        <!-- 移动端分页 -->
        <div class="mobile-pagination">
          <el-pagination
            v-model:current-page="pagination.page"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
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
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getSupplierProductList,
  deleteSupplierProduct
} from '@/api/supplier'

const router = useRouter()
const { t } = useI18n()

// 搜索筛选条件
const searchFilters = reactive({
  keyword: '',
  inputType: '',
  inputName: '',
  inputSku: '',
  qualityRating: ''
})

// 分页
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

// 表格数据
const tableData = ref([])
const loading = ref(false)

// 获取列表数据
const fetchData = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...searchFilters
    }

    const res = await getSupplierProductList(params)
    if (res.code === 200 && res.data) {
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    console.error('Failed to fetch data:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.page = 1
  fetchData()
}

// 重置
const handleReset = () => {
  searchFilters.keyword = ''
  searchFilters.inputType = ''
  searchFilters.inputName = ''
  searchFilters.inputSku = ''
  searchFilters.qualityRating = ''
  handleSearch()
}

// 分页变化
const handleSizeChange = (val) => {
  pagination.pageSize = val
  pagination.page = 1
  fetchData()
}

const handleCurrentChange = (val) => {
  pagination.page = val
  fetchData()
}

// 新增
const handleAdd = () => {
  router.push('/input/supplier/product/add')
}

// 查看详情
const handleView = (row) => {
  router.push(`/input/supplier/product/detail/${row.supplier_product_id}`)
}

// 编辑
const handleEdit = (row) => {
  router.push(`/input/supplier/product/edit/${row.supplier_product_id}`)
}

// 删除
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('input.supplier.product.deleteConfirm'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const res = await deleteSupplierProduct(row.supplier_product_id)
    if (res.code === 200) {
      ElMessage.success(t('input.supplier.product.deleteSuccess'))
      fetchData()
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete:', error)
      ElMessage.error(t('common.failed'))
    }
  }
}

// 格式化价格
const formatPrice = (price) => {
  return `ETB ${parseFloat(price).toFixed(2)}`
}

// 获取质量评级标签类型
const getQualityTagType = (rating) => {
  const typeMap = {
    A: 'success',
    B: 'primary',
    C: 'warning',
    D: 'danger'
  }
  return typeMap[rating] || 'info'
}

// 初始化
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.supplier-product-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding-bottom: 2rem;
}

.page-header { background: linear-gradient(135deg, #009A44 0%, #00b350 100%); padding: 24px 0; margin: -24px 0 24px 0; border-radius: 0 0 16px 16px; }
.header-content { max-width: 100%; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; gap: 20px; }
.header-icon-wrapper { width: 64px; height: 64px; background: rgba(255, 255, 255, 0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); flex-shrink: 0; }
.header-icon { font-size: 32px; color: white; }
.header-text { flex: 1; color: white; min-width: 0; }
.page-title { font-size: 24px; font-weight: 600; margin: 0 0 4px 0; }
.page-subtitle { font-size: 14px; opacity: 0.9; margin: 0; }

/* 内容区域 */
.content-wrapper {
  margin: 0 auto;
  padding: 0 1rem;
}

/* 搜索栏 */
.search-bar {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.search-row {
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
}

.action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.action-left {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-row {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e8f5e9;
}

.filter-item {
  margin-bottom: 1rem;
}

.filter-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #606266;
  font-size: 0.875rem;
}

/* 表格卡片 */
.table-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.pagination-wrapper {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

/* 移动端 */
.mobile-view {
  display: none;
}

.mobile-add-btn {
  margin-bottom: 1rem;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 16px rgba(0, 154, 68, 0.15);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e8f5e9;
}

.product-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #009A44;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-body {
  margin-bottom: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f5f7fa;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row .label {
  font-weight: 500;
  color: #606266;
  font-size: 0.875rem;
}

.info-row .value {
  color: #303133;
  text-align: right;
}

.info-row .price {
  color: #009A44;
  font-weight: 600;
}

.card-footer {
  display: flex;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f5f7fa;
}

.card-footer .el-button {
  flex: 1;
}

.mobile-pagination {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
}

.empty-icon {
  font-size: 4rem;
  color: #dcdfe6;
  margin-bottom: 1rem;
}

.empty-text {
  color: #909399;
  font-size: 0.875rem;
}

/* 响应式 - 平板 */
@media screen and (max-width: 1024px) {
  .page-title {
    font-size: 1.5rem;
  }

  .header-icon-wrapper {
    width: 60px;
    height: 60px;
  }

  .header-icon {
    font-size: 30px;
  }
}

/* 响应式 - 移动端 */
@media screen and (max-width: 768px) {
  .pc-view {
    display: none !important;
  }

  .mobile-view {
    display: block;
  }

  .page-header {
    padding: 1.5rem 1rem;
  }

  .header-content {
    gap: 1rem;
  }

  .header-icon-wrapper {
    width: 50px;
    height: 50px;
  }

  .header-icon {
    font-size: 24px;
  }

  .page-title {
    font-size: 1.25rem;
  }

  .page-subtitle {
    font-size: 0.875rem;
  }

  .search-bar {
    padding: 1rem;
  }

  .action-left {
    width: 100%;
  }

  .action-left .el-button {
    flex: 1;
  }

  .btn-text {
    display: none;
  }

  .filter-row :deep(.el-radio-group) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .filter-row :deep(.el-radio-button) {
    flex: 0 0 auto;
  }
}

.text-muted {
  color: #909399;
}
</style>
