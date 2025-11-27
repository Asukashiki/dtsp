<template>
  <div class="variety-query-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon-wrapper">
        <i class="ri-search-eye-line"></i>
      </div>
      <div class="header-text">
        <h1 class="page-title">{{ $t('research.variety.query.title') }}</h1>
        <p class="page-subtitle">{{ $t('research.variety.query.subtitle') }}</p>
      </div>
    </div>

    <!-- 列表区域 -->
    <div class="list-section">
      <!-- 搜索筛选区 -->
      <div class="search-section">
        <el-input
          v-model="searchQuery"
          :placeholder="$t('research.variety.query.searchPlaceholder')"
          clearable
          class="search-input"
        >
          <template #prefix>
            <i class="ri-search-line"></i>
          </template>
        </el-input>
        <el-select
          v-model="filterYear"
          :placeholder="$t('research.variety.query.filterByYear')"
          clearable
          class="filter-select"
        >
          <el-option :label="$t('research.variety.query.allYears')" value="" />
          <el-option label="2024" value="2024" />
          <el-option label="2023" value="2023" />
          <el-option label="2022" value="2022" />
        </el-select>
        <el-select
          v-model="filterCrop"
          :placeholder="$t('research.variety.query.filterByCrop')"
          clearable
          class="filter-select"
        >
          <el-option :label="$t('research.variety.query.allCrops')" value="" />
          <el-option label="Wheat" value="wheat" />
          <el-option label="Maize" value="maize" />
          <el-option label="Barley" value="barley" />
        </el-select>
      </div>

      <!-- PC端表格 -->
      <div class="table-container pc-only">
        <el-table :data="filteredList" stripe style="width: 100%" :empty-text="$t('home.noData')">
          <el-table-column prop="publishNo" :label="$t('research.variety.query.columns.publishNo')" min-width="150" />
          <el-table-column prop="varietyName" :label="$t('research.variety.query.columns.varietyName')" min-width="150" />
          <el-table-column prop="cropType" :label="$t('research.variety.query.columns.cropType')" width="120" />
          <el-table-column prop="publishDate" :label="$t('research.variety.query.columns.publishDate')" width="120" />
          <el-table-column prop="publishDept" :label="$t('research.variety.query.columns.publishDept')" min-width="180" />
          <el-table-column :label="$t('research.variety.query.columns.actions')" width="120" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleView(row)">
                <i class="ri-eye-line"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination-wrapper">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
          />
        </div>
      </div>

      <!-- 移动端卡片 -->
      <div class="card-container mobile-only">
        <div v-if="filteredList.length === 0" class="empty-state">
          <i class="ri-inbox-line"></i>
          <p>{{ $t('home.noData') }}</p>
        </div>
        <div v-for="item in filteredList" :key="item.publishNo" class="variety-card" @click="handleView(item)">
          <div class="card-header">
            <div class="variety-name">{{ item.varietyName }}</div>
            <el-tag type="success" size="small">{{ item.cropType }}</el-tag>
          </div>
          <div class="card-body">
            <div class="card-row">
              <span class="label">{{ $t('research.variety.query.columns.publishNo') }}:</span>
              <span class="value">{{ item.publishNo }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.variety.query.columns.publishDate') }}:</span>
              <span class="value">{{ item.publishDate }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.variety.query.columns.publishDept') }}:</span>
              <span class="value">{{ item.publishDept }}</span>
            </div>
          </div>
          <div class="card-footer">
            <el-button link type="primary" size="small">
              <i class="ri-arrow-right-line"></i> {{ $t('research.variety.query.actions.viewDetail') }}
            </el-button>
          </div>
        </div>

        <!-- 移动端分页 -->
        <div class="pagination-wrapper mobile-pagination">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50]"
            :total="total"
            layout="total, prev, pager, next"
            small
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 搜索和筛选
const searchQuery = ref('')
const filterYear = ref('')
const filterCrop = ref('')

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 模拟数据
const mockData = ref([
  {
    publishNo: 'PUB-2024-001',
    varietyName: 'Oromia Wheat-1',
    cropType: 'Wheat',
    publishDate: '2024-01-25',
    publishDept: 'Oromia Agricultural Bureau'
  },
  {
    publishNo: 'PUB-2024-002',
    varietyName: 'Golden Maize-Supreme',
    cropType: 'Maize',
    publishDate: '2024-01-20',
    publishDept: 'Oromia Agricultural Bureau'
  },
  {
    publishNo: 'PUB-2023-015',
    varietyName: 'Highland Barley-Pro',
    cropType: 'Barley',
    publishDate: '2023-12-15',
    publishDept: 'Oromia Agricultural Bureau'
  },
  {
    publishNo: 'PUB-2023-012',
    varietyName: 'Drought-Resistant Wheat-3',
    cropType: 'Wheat',
    publishDate: '2023-11-20',
    publishDept: 'Oromia Agricultural Bureau'
  }
])

// 筛选后的列表
const filteredList = computed(() => {
  let list = mockData.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    list = list.filter(item =>
      item.varietyName.toLowerCase().includes(query)
    )
  }

  if (filterYear.value) {
    list = list.filter(item => item.publishDate.startsWith(filterYear.value))
  }

  if (filterCrop.value) {
    list = list.filter(item => item.cropType.toLowerCase() === filterCrop.value)
  }

  total.value = list.length

  // 分页
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return list.slice(start, end)
})

// 处理页码变化
const handlePageChange = (page) => {
  currentPage.value = page
}

// 处理每页条数变化
const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
}

// 查看详情
const handleView = (row) => {
  console.log('View detail:', row)
  // TODO: 实现查看详情逻辑（可以跳转到详情页或弹出对话框）
}
</script>

<style scoped>
.variety-query-page {
  min-height: 100%;
  padding: 24px;
}

/* 页面头部 */
.page-header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px;
  background: #fff;
  border-radius: 16px;
  margin-bottom: 24px;
}

.header-icon-wrapper {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #FEDD00 0%, #FFE94D 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 154, 68, 0.2);
  flex-shrink: 0;
}

.header-icon-wrapper i {
  font-size: 40px;
  color: #fff;
}

.header-text {
  flex: 1;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #303133;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 14px;
  color: #606266;
  margin: 0;
}

/* 列表区域 */
.list-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.search-section {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.filter-select {
  width: 200px;
}

.table-container {
  overflow: auto;
}

/* 分页 */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e8f5e9;
}

/* 移动端卡片 */
.card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.empty-state {
  background: white;
  border-radius: 12px;
  padding: 60px 20px;
  text-align: center;
}

.empty-state i {
  font-size: 64px;
  color: #dcdfe6;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

.variety-card {
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #e4e7ed;
}

.variety-card:hover {
  box-shadow: 0 4px 16px rgba(0, 154, 68, 0.15);
  transform: translateY(-2px);
  border-color: #009A44;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e4e7ed;
}

.variety-name {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  flex: 1;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.card-row .label {
  color: #909399;
  flex-shrink: 0;
}

.card-row .value {
  color: #303133;
  text-align: right;
  font-weight: 500;
}

.card-footer {
  padding-top: 12px;
  border-top: 1px solid #e4e7ed;
  text-align: right;
}

/* 响应式控制 */
.pc-only {
  display: block;
}

.mobile-only {
  display: none !important;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .variety-query-page {
    padding: 16px;
  }

  .page-header {
    flex-wrap: wrap;
    padding: 24px;
  }

  .header-icon-wrapper {
    width: 64px;
    height: 64px;
  }

  .header-icon-wrapper i {
    font-size: 32px;
  }

  .page-title {
    font-size: 24px;
  }

  .page-subtitle {
    font-size: 14px;
  }

  .list-section {
    padding: 16px;
  }

  .search-section {
    flex-direction: column;
  }

  .search-input,
  .filter-select {
    width: 100%;
  }

  /* 移动端显示卡片 */
  .pc-only {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
  }
}
</style>
