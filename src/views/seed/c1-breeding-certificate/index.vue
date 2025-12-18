<template>
  <div class="c1-certificate-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <i class="ri-award-line header-icon"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">{{ $t('seed.c1Certificate.title') }}</h1>
          <p class="page-subtitle">{{ $t('seed.c1Certificate.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- PC端视图 -->
    <div class="pc-view">
      <!-- 搜索区域 -->
      <el-card shadow="never" class="search-card">
        <el-form :model="searchParams" label-width="100px" class="search-form">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="$t('seed.c1Certificate.columns.batchId')">
                <el-input
                  v-model="searchParams.keyword"
                  :placeholder="$t('common.pleaseInput')"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('seed.c1Certificate.columns.varietyName')">
                <el-input
                  v-model="searchParams.varietyName"
                  :placeholder="$t('common.pleaseInput')"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('seed.c1Certificate.columns.cropType')">
                <el-select
                  v-model="searchParams.cropType"
                  :placeholder="$t('common.pleaseSelect')"
                  clearable
                  style="width: 100%"
                >
                  <el-option label="Wheat" value="Wheat" />
                  <el-option label="Maize" value="Maize" />
                  <el-option label="Teff" value="Teff" />
                  <el-option label="Sorghum" value="Sorghum" />
                  <el-option label="Barley" value="Barley" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('seed.c1Certificate.columns.startDate')">
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  :range-separator="$t('common.to')"
                  :start-placeholder="$t('common.startDate')"
                  :end-placeholder="$t('common.endDate')"
                  style="width: 100%"
                  value-format="YYYY-MM-DD"
                  @change="handleDateChange"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="search-actions">
              <el-button type="primary" @click="handleSearch">
                <i class="ri-search-line"></i>
                {{ $t('common.search') }}
              </el-button>
              <el-button @click="handleReset">
                <i class="ri-refresh-line"></i>
                {{ $t('common.reset') }}
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <!-- 表格区域 -->
      <el-card shadow="never" class="table-card">
        <template #header>
          <div class="card-header">
            <span class="card-title">
              <i class="ri-award-line"></i>
              {{ $t('seed.c1Certificate.title') }}
            </span>
            <div class="header-actions">
              <el-tag type="success">
                {{ $t('common.total') }}: {{ total }}
              </el-tag>
            </div>
          </div>
        </template>

        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          border
          style="width: 100%"
          :empty-text="$t('common.noData')"
        >
          <el-table-column type="index" :label="$t('common.index')" width="60" align="center" />
          <el-table-column prop="batchId" :label="$t('seed.c1Certificate.columns.batchId')" min-width="180" show-overflow-tooltip />
          <el-table-column prop="orgName" :label="$t('seed.c1Certificate.columns.orgName')" min-width="180" show-overflow-tooltip />
          <el-table-column prop="varietyName" :label="$t('seed.c1Certificate.columns.varietyName')" min-width="120" />
          <el-table-column prop="cropType" :label="$t('seed.c1Certificate.columns.cropType')" width="120" align="center">
            <template #default="{ row }">
              <el-tag type="success" size="small">{{ row.cropType }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="startDate" :label="$t('seed.c1Certificate.columns.startDate')" width="120" align="center" />
          <el-table-column prop="auditor" :label="$t('seed.c1Certificate.columns.auditor')" width="120" align="center" />
          <el-table-column prop="auditorOrgName" :label="$t('seed.c1Certificate.columns.auditorOrg')" min-width="150" show-overflow-tooltip />
          <el-table-column prop="auditTime" :label="$t('seed.c1Certificate.columns.auditTime')" width="160" align="center" />
          <el-table-column prop="printCount" :label="$t('seed.c1Certificate.columns.printCount')" width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="row.printCount > 0 ? 'info' : 'success'" size="small">
                {{ row.printCount || 0 }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="lastPrintTime" :label="$t('seed.c1Certificate.columns.lastPrintTime')" width="160" align="center" />
          <el-table-column :label="$t('common.action')" width="200" align="center" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleView(row)">
                <i class="ri-eye-line"></i>
                {{ $t('common.view') }}
              </el-button>
              <el-button link type="success" @click="handlePrint(row)">
                <i class="ri-printer-line"></i>
                {{ $t('seed.c1Certificate.print') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          :current-page="pagination.current"
          :page-size="pagination.size"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          class="pagination"
        />
      </el-card>
    </div>

    <!-- 移动端视图 -->
    <div class="mobile-view">
      <!-- 搜索栏 -->
      <div class="mobile-search">
        <el-input
          v-model="searchParams.keyword"
          :placeholder="$t('seed.c1Certificate.searchPlaceholder')"
          clearable
          @clear="handleSearch"
        >
          <template #prefix>
            <i class="ri-search-line"></i>
          </template>
          <template #suffix>
            <el-button link @click="showFilter = !showFilter">
              <i class="ri-filter-line"></i>
            </el-button>
          </template>
        </el-input>
      </div>

      <!-- 筛选面板 -->
      <el-drawer
        v-model="showFilter"
        :title="$t('common.filter')"
        direction="rtl"
        size="80%"
      >
        <el-form :model="searchParams" label-position="top">
          <el-form-item :label="$t('seed.c1Certificate.columns.varietyName')">
            <el-input v-model="searchParams.varietyName" clearable />
          </el-form-item>
          <el-form-item :label="$t('seed.c1Certificate.columns.cropType')">
            <el-select v-model="searchParams.cropType" clearable style="width: 100%">
              <el-option label="Wheat" value="Wheat" />
              <el-option label="Maize" value="Maize" />
              <el-option label="Teff" value="Teff" />
              <el-option label="Sorghum" value="Sorghum" />
              <el-option label="Barley" value="Barley" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('seed.c1Certificate.columns.startDate')">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              style="width: 100%"
              value-format="YYYY-MM-DD"
              @change="handleDateChange"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="handleReset">{{ $t('common.reset') }}</el-button>
          <el-button type="primary" @click="handleSearch">{{ $t('common.search') }}</el-button>
        </template>
      </el-drawer>

      <!-- 统计信息 -->
      <div class="mobile-stats">
        <el-tag type="success" size="large">
          {{ $t('common.total') }}: {{ total }}
        </el-tag>
      </div>

      <!-- 列表 -->
      <div v-loading="loading" class="mobile-list">
        <div v-for="item in tableData" :key="item.id" class="mobile-card">
          <div class="card-header">
            <div class="header-left">
              <div class="batch-id">{{ item.batchId }}</div>
              <el-tag type="success" size="small">{{ item.cropType }}</el-tag>
            </div>
            <div class="header-right">
              <el-tag :type="item.printCount > 0 ? 'info' : 'success'" size="small">
                {{ $t('seed.c1Certificate.columns.printCount') }}: {{ item.printCount || 0 }}
              </el-tag>
            </div>
          </div>

          <div class="card-content">
            <div class="info-row">
              <span class="label">{{ $t('seed.c1Certificate.columns.orgName') }}:</span>
              <span class="value">{{ item.orgName }}</span>
            </div>
            <div class="info-row">
              <span class="label">{{ $t('seed.c1Certificate.columns.varietyName') }}:</span>
              <span class="value">{{ item.varietyName }}</span>
            </div>
            <div class="info-row">
              <span class="label">{{ $t('seed.c1Certificate.columns.startDate') }}:</span>
              <span class="value">{{ item.startDate }}</span>
            </div>
            <div class="info-row">
              <span class="label">{{ $t('seed.c1Certificate.columns.auditor') }}:</span>
              <span class="value">{{ item.auditor || '-' }}</span>
            </div>
            <div class="info-row">
              <span class="label">{{ $t('seed.c1Certificate.columns.auditorOrg') }}:</span>
              <span class="value">{{ item.auditorOrgName || '-' }}</span>
            </div>
            <div class="info-row">
              <span class="label">{{ $t('seed.c1Certificate.columns.auditTime') }}:</span>
              <span class="value">{{ item.auditTime || '-' }}</span>
            </div>
            <div v-if="item.lastPrintTime" class="info-row">
              <span class="label">{{ $t('seed.c1Certificate.columns.lastPrintTime') }}:</span>
              <span class="value">{{ item.lastPrintTime }}</span>
            </div>
          </div>

          <div class="card-actions">
            <el-button type="primary" size="small" @click="handleView(item)">
              <i class="ri-eye-line"></i>
              {{ $t('common.view') }}
            </el-button>
            <el-button type="success" size="small" @click="handlePrint(item)">
              <i class="ri-printer-line"></i>
              {{ $t('seed.c1Certificate.print') }}
            </el-button>
          </div>
        </div>

        <!-- 加载更多 -->
        <div v-if="hasMore" class="load-more">
          <el-button @click="loadMore" :loading="loading">
            {{ $t('common.loadMore') }}
          </el-button>
        </div>

        <!-- 空状态 -->
        <el-empty v-if="!loading && tableData.length === 0" :description="$t('common.noData')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getApprovedC1BatchList, recordC1BatchPrint } from '@/api/c1BreedingBatch'

const router = useRouter()
const { t } = useI18n()

// 搜索参数
const searchParams = reactive({
  keyword: '',
  varietyName: '',
  cropType: '',
  startDateBegin: '',
  startDateEnd: ''
})

// 日期范围
const dateRange = ref([])

// 分页参数
const pagination = reactive({
  current: 1,
  size: 10
})

// 表格数据
const tableData = ref([])
const total = ref(0)
const loading = ref(false)

// 移动端筛选面板
const showFilter = ref(false)

// 是否有更多数据
const hasMore = computed(() => {
  return tableData.value.length < total.value
})

// 处理日期范围变化
const handleDateChange = (value) => {
  if (value && value.length === 2) {
    searchParams.startDateBegin = value[0]
    searchParams.startDateEnd = value[1]
  } else {
    searchParams.startDateBegin = ''
    searchParams.startDateEnd = ''
  }
}

// 加载列表数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      ...searchParams,
      pageNum: pagination.current,
      pageSize: pagination.size
    }
    const res = await getApprovedC1BatchList(params)
    if (res.code === 200) {
      tableData.value = res.data?.list || []
      total.value = res.data?.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.current = 1
  loadData()
  showFilter.value = false
}

// 重置
const handleReset = () => {
  searchParams.keyword = ''
  searchParams.varietyName = ''
  searchParams.cropType = ''
  searchParams.startDateBegin = ''
  searchParams.startDateEnd = ''
  dateRange.value = []
  handleSearch()
}

// 分页
const handleSizeChange = (size) => {
  pagination.size = size
  loadData()
}

const handleCurrentChange = (current) => {
  pagination.current = current
  loadData()
}

// 加载更多（移动端）
const loadMore = () => {
  pagination.current++
  loadData()
}

// 查看详情
const handleView = (row) => {
  router.push(`/research/c1-breeding-batch/detail/${row.id}?readonly=true`)
}

// 打印证书
const handlePrint = async (row) => {
  try {
    // 记录打印次数
    await recordC1BatchPrint(row.id)
    
    // 在新窗口打开打印页面
    const isDev = import.meta.env.DEV
    const printUrlDev = `${window.location.origin}/#/print/seed/c1-breeding-certificate/${row.id}`
    const printUrl = `${window.location.origin}${import.meta.env.VITE_APP_AGRICULTURE_BASE_URL}/#/print/seed/c1-breeding-certificate/${row.id}`
    window.open(isDev ? printUrlDev : printUrl, '_blank', 'width=900,height=800')
    
    // 刷新列表更新打印次数
    loadData()
  } catch (error) {
    console.error('Print error:', error)
  }
}

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.c1-certificate-container {
  min-height: calc(100vh - 120px);
  position: relative;
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  padding: 24px 0;
  margin: -24px 0 24px 0;
  border-radius: 0 0 16px 16px;
}

.header-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-icon-wrapper {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  flex-shrink: 0;
}

.header-icon {
  font-size: 32px;
  color: white;
}

.header-text {
  flex: 1;
  color: white;
  min-width: 0;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.page-subtitle {
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
}

/* PC端视图 */
.pc-view {
  display: block;
  padding: 0 24px;
}

.mobile-view {
  display: none;
}

.search-card {
  margin-bottom: 16px;
}

.search-form {
  margin-bottom: -18px;
}

.search-actions {
  text-align: right;
}

.table-card {
  margin-bottom: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #10b981;
}

.card-title i {
  font-size: 20px;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.pagination {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

/* 移动端视图 */
@media screen and (max-width: 768px) {
  .c1-certificate-container {
    min-height: calc(100vh - 100px);
  }

  .page-header {
    margin: -24px -12px 16px -12px;
    padding: 20px 0;
  }

  .header-content {
    padding: 0 16px;
    gap: 16px;
  }

  .header-icon-wrapper {
    width: 48px;
    height: 48px;
  }

  .header-icon {
    font-size: 24px;
  }

  .page-title {
    font-size: 20px;
  }

  .page-subtitle {
    font-size: 13px;
  }

  .pc-view {
    display: none;
  }

  .mobile-view {
    display: block;
    padding: 0 12px;
  }

  .mobile-search {
    margin-bottom: 12px;
  }

  .mobile-stats {
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .mobile-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .mobile-card {
    background: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-left: 4px solid #10b981;
  }

  .mobile-card .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f3f4f6;
  }

  .mobile-card .header-left {
    flex: 1;
  }

  .mobile-card .batch-id {
    font-size: 14px;
    font-weight: 600;
    color: #10b981;
    margin-bottom: 6px;
  }

  .mobile-card .card-content {
    margin-bottom: 12px;
  }

  .mobile-card .info-row {
    display: flex;
    margin-bottom: 8px;
    font-size: 13px;
    line-height: 1.5;
  }

  .mobile-card .info-row:last-child {
    margin-bottom: 0;
  }

  .mobile-card .label {
    min-width: 90px;
    color: #6b7280;
    flex-shrink: 0;
  }

  .mobile-card .value {
    color: #1f2937;
    flex: 1;
  }

  .mobile-card .card-actions {
    display: flex;
    gap: 8px;
    padding-top: 12px;
    border-top: 1px solid #f3f4f6;
  }

  .mobile-card .card-actions .el-button {
    flex: 1;
  }

  .load-more {
    text-align: center;
    padding: 16px 0;
  }

  .load-more .el-button {
    width: 100%;
  }
}

/* 响应式调整 */
@media screen and (max-width: 1200px) {
  .c1-certificate-container {
    padding: 16px;
  }
}
</style>
