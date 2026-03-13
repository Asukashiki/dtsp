<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader
        icon="ri-price-tag-3-line"
        :title="$t('input.inventory.productManage.title')"
        :subtitle="$t('input.inventory.productManage.subtitle')" />

      <div class="content-wrapper">
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('input.inventory.productManage.form.productCode')">
              <el-input v-model="filters.productCode" :placeholder="$t('input.inventory.productManage.placeholder.productCode')" clearable class="search-input" @keyup.enter="handleSearch">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('input.inventory.productManage.form.productName')">
              <el-input v-model="filters.productName" :placeholder="$t('input.inventory.productManage.placeholder.productName')" clearable class="search-input" @keyup.enter="handleSearch" />
            </SearchItem>

            <SearchItem :label="$t('input.inventory.productManage.form.mainCategory')">
              <el-select v-model="filters.mainCategory" :placeholder="$t('input.inventory.productManage.placeholder.mainCategory')" clearable class="search-input">
                <el-option v-for="item in mainCategoryOptions" :key="item.value" :label="$t(item.label)" :value="item.value" />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('input.inventory.productManage.form.status')">
              <el-select v-model="filters.status" :placeholder="$t('input.inventory.productManage.placeholder.status')" clearable class="search-input">
                <el-option v-for="item in statusOptions" :key="item.value" :label="$t(item.label)" :value="item.value" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <InfoCard :title="$t('input.inventory.productManage.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('common.add') }}
            </el-button>
          </template>

          <div class="table-wrapper pc-only">
            <el-table v-loading="loading" :data="tableData" stripe>
              <el-table-column prop="product_code" :label="$t('input.inventory.productManage.columns.productCode')" min-width="150" fixed="left" show-overflow-tooltip />
              <el-table-column prop="product_name" :label="$t('input.inventory.productManage.columns.productName')" min-width="180" show-overflow-tooltip />
              <el-table-column :label="$t('input.inventory.productManage.columns.mainCategory')" min-width="130" align="center">
                <template #default="{ row }">
                  <el-tag :type="getMainCategoryTag(row.main_category)" size="small">{{ getMainCategoryLabel(row.main_category) }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="category_name" :label="$t('input.inventory.productManage.columns.categoryName')" min-width="140" show-overflow-tooltip />
              <el-table-column prop="sub_category" :label="$t('input.inventory.productManage.columns.subCategory')" min-width="140" show-overflow-tooltip />
              <el-table-column prop="brand" :label="$t('input.inventory.productManage.columns.brand')" min-width="130" show-overflow-tooltip />
              <el-table-column prop="model" :label="$t('input.inventory.productManage.columns.model')" min-width="150" show-overflow-tooltip />
              <el-table-column prop="unit" :label="$t('input.inventory.productManage.columns.unit')" min-width="90" align="center" />
              <el-table-column :label="$t('input.inventory.productManage.columns.price')" min-width="120" align="right">
                <template #default="{ row }">{{ formatPrice(row.price) }}</template>
              </el-table-column>
              <el-table-column prop="license_no" :label="$t('input.inventory.productManage.columns.licenseNo')" min-width="180" show-overflow-tooltip />
              <el-table-column :label="$t('input.inventory.productManage.columns.status')" min-width="110" align="center">
                <template #default="{ row }">
                  <el-tag :type="row.status === '0' ? 'success' : 'info'" size="small">
                    {{ row.status === '0' ? $t('input.inventory.productManage.status.enabled') : $t('input.inventory.productManage.status.disabled') }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="update_time" :label="$t('input.inventory.productManage.columns.updateTime')" min-width="170" show-overflow-tooltip />
              <el-table-column :label="$t('input.inventory.productManage.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button class="action-btn action-btn-view" size="small" @click="handleView(row)"><i class="ri-eye-line"></i><span class="btn-text">{{ $t('common.view') }}</span></el-button>
                    <el-button class="action-btn action-btn-edit" type="primary" size="small" @click="handleEdit(row)"><i class="ri-edit-line"></i><span class="btn-text">{{ $t('common.edit') }}</span></el-button>
                    <el-button class="action-btn action-btn-delete" type="danger" size="small" @click="handleDelete(row)"><i class="ri-delete-bin-line"></i><span class="btn-text">{{ $t('common.delete') }}</span></el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination v-model:current-page="pagination.pageNum" v-model:page-size="pagination.pageSize" :page-sizes="[10, 20, 50, 100]" :total="pagination.total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handlePageChange" />
            </div>
          </div>
        </InfoCard>

        <div class="mobile-card-list mobile-only" v-loading="loading">
          <div v-for="item in tableData" :key="item.id" class="product-card">
            <div class="card-header">
              <div class="product-info">
                <h3 class="product-name">{{ item.product_name }}</h3>
                <div class="product-code">{{ item.product_code }}</div>
              </div>
              <div class="card-tags">
                <el-tag :type="getMainCategoryTag(item.main_category)" size="small">{{ getMainCategoryLabel(item.main_category) }}</el-tag>
                <el-tag :type="item.status === '0' ? 'success' : 'info'" size="small">{{ item.status === '0' ? $t('input.inventory.productManage.status.enabled') : $t('input.inventory.productManage.status.disabled') }}</el-tag>
              </div>
            </div>

            <div class="card-body">
              <div class="info-row"><span class="info-label">{{ $t('input.inventory.productManage.columns.brand') }}</span><span class="info-value">{{ item.brand || '-' }}</span></div>
              <div class="info-row"><span class="info-label">{{ $t('input.inventory.productManage.columns.model') }}</span><span class="info-value">{{ item.model || '-' }}</span></div>
              <div class="info-row"><span class="info-label">{{ $t('input.inventory.productManage.columns.price') }}</span><span class="info-value">{{ formatPrice(item.price) }}</span></div>
            </div>

            <div class="card-footer">
              <el-button class="action-btn action-btn-view" size="small" @click="handleView(item)"><i class="ri-eye-line"></i><span class="btn-text">{{ $t('common.view') }}</span></el-button>
              <el-button class="action-btn action-btn-edit" type="primary" size="small" @click="handleEdit(item)"><i class="ri-edit-line"></i><span class="btn-text">{{ $t('common.edit') }}</span></el-button>
              <el-button class="action-btn action-btn-delete" type="danger" size="small" @click="handleDelete(item)"><i class="ri-delete-bin-line"></i><span class="btn-text">{{ $t('common.delete') }}</span></el-button>
            </div>
          </div>

          <div v-if="tableData.length === 0 && !loading" class="empty-state">
            <i class="ri-inbox-line"></i>
            <p>{{ $t('home.noData') }}</p>
          </div>

          <div class="mobile-pagination">
            <el-pagination v-model:current-page="pagination.pageNum" :total="pagination.total" :page-size="pagination.pageSize" layout="prev, pager, next" small @current-change="handlePageChange" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { deleteProductManage, listProductManage } from '@/api/productManage'
import { InfoCard, PageHeader, SearchForm, SearchItem } from '@/components/common'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])

const filters = reactive({ productCode: '', productName: '', mainCategory: '', status: '' })
const pagination = reactive({ pageNum: 1, pageSize: 10, total: 0 })

const mainCategoryOptions = [
  { value: 'FERTILIZER', label: 'input.inventory.productManage.mainCategoryOptions.fertilizer' },
  { value: 'SEED', label: 'input.inventory.productManage.mainCategoryOptions.seed' },
  { value: 'AGRICULTURAL_PRODUCT', label: 'input.inventory.productManage.mainCategoryOptions.agriculturalProduct' },
  { value: 'PESTICIDE', label: 'input.inventory.productManage.mainCategoryOptions.pesticide' },
  { value: 'OTHER', label: 'input.inventory.productManage.mainCategoryOptions.other' }
]

const statusOptions = [
  { value: '0', label: 'input.inventory.productManage.status.enabled' },
  { value: '1', label: 'input.inventory.productManage.status.disabled' }
]

const findLabel = (options, value) => {
  const match = options.find(item => item.value === value)
  return match ? t(match.label) : value || '-'
}

const getMainCategoryLabel = value => findLabel(mainCategoryOptions, value)
const getMainCategoryTag = value => {
  if (value === 'SEED') return 'success'
  if (value === 'FERTILIZER') return 'warning'
  if (value === 'PESTICIDE') return 'danger'
  if (value === 'AGRICULTURAL_PRODUCT') return 'info'
  return ''
}

const formatPrice = value => {
  if (value === null || value === undefined || value === '') return '-'
  return Number(value).toFixed(2)
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await listProductManage({ ...filters, pageNum: pagination.pageNum, pageSize: pagination.pageSize })
    if (res.code === 200 && res.data) {
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    console.error('Failed to load product list:', error)
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
  filters.productCode = ''
  filters.productName = ''
  filters.mainCategory = ''
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
  router.push('/inventory/product-manage/add')
}

const handleView = row => {
  router.push(`/inventory/product-manage/detail/${row.id}`)
}

const handleEdit = row => {
  router.push(`/inventory/product-manage/edit/${row.id}`)
}

const handleDelete = row => {
  ElMessageBox.confirm(t('input.inventory.productManage.deleteConfirm'), t('common.tips'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(async () => {
    try {
      const res = await deleteProductManage(row.id)
      if (res.code === 200) {
        ElMessage.success(t('input.inventory.productManage.deleteSuccess'))
        if (tableData.value.length === 1 && pagination.pageNum > 1) {
          pagination.pageNum -= 1
        }
        loadData()
      }
    } catch (error) {
      console.error('Failed to delete product:', error)
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

.product-card {
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

.product-name {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.product-code {
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
