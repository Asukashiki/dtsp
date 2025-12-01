<template>
  <div class="dataset-audit-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon">
        <i class="ri-shield-check-line"></i>
      </div>
      <div class="header-text">
        <h1 class="page-title">{{ $t('research.datasetAudit.title') }}</h1>
        <p class="page-subtitle">{{ $t('research.datasetAudit.subtitle') }}</p>
      </div>
    </div>

    <!-- 搜索和筛选 -->
    <div class="search-filter-bar">
      <div class="search-box">
        <el-input
          v-model="searchParams.keyword"
          :placeholder="$t('research.datasetAudit.searchPlaceholder')"
          clearable
          @clear="handleSearch"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <i class="ri-search-line"></i>
          </template>
        </el-input>
        <el-button type="primary" @click="handleSearch">
          <i class="ri-search-line"></i>
          {{ $t('common.search') }}
        </el-button>
      </div>

      <div class="filter-box">
        <el-select
          v-model="searchParams.auditStatus"
          :placeholder="$t('research.datasetAudit.filterByAuditStatus')"
          clearable
          @change="handleSearch"
        >
          <el-option :label="$t('research.datasetAudit.allAuditStatus')" value="" />
          <el-option
            v-for="(label, key) in $t('research.datasetAudit.auditStatus')"
            :key="key"
            :label="label"
            :value="key"
          />
        </el-select>

        <el-select
          v-model="searchParams.datasetStatus"
          :placeholder="$t('research.datasetAudit.filterByDatasetStatus')"
          clearable
          @change="handleSearch"
        >
          <el-option :label="$t('research.datasetAudit.allDatasetStatus')" value="" />
          <el-option
            v-for="(label, key) in $t('research.datasetAudit.datasetStatus')"
            :key="key"
            :label="label"
            :value="key"
          />
        </el-select>
      </div>
    </div>

    <!-- PC端表格视图 -->
    <div class="table-container pc-only">
      <el-table
        v-loading="loading"
        :data="dataList"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="datasetCode"
          :label="$t('research.datasetAudit.columns.datasetCode')"
          min-width="140"
        />
        <el-table-column
          prop="batchName"
          :label="$t('research.datasetAudit.columns.batchName')"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="varietyName"
          :label="$t('research.datasetAudit.columns.varietyName')"
          min-width="120"
          show-overflow-tooltip
        />
        <el-table-column
          prop="labTestCount"
          :label="$t('research.datasetAudit.columns.labTestCount')"
          min-width="100"
          align="center"
        />
        <el-table-column
          prop="yieldDataCount"
          :label="$t('research.datasetAudit.columns.yieldDataCount')"
          min-width="100"
          align="center"
        />
        <el-table-column
          prop="datasetStatus"
          :label="$t('research.datasetAudit.columns.datasetStatus')"
          min-width="110"
          align="center"
        >
          <template #default="{ row }">
            <el-tag :type="getDatasetStatusType(row.datasetStatus)">
              {{ $t(`research.datasetCompilation.status.${row.datasetStatus}`) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="auditStatus"
          :label="$t('research.datasetAudit.columns.auditStatus')"
          min-width="110"
          align="center"
        >
          <template #default="{ row }">
            <el-tag :type="getAuditStatusType(row.auditStatus)">
              {{ $t(`research.datasetAudit.auditStatus.${row.auditStatus}`) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="submitTime"
          :label="$t('research.datasetAudit.columns.submitTime')"
          min-width="160"
        />
        <el-table-column
          :label="$t('research.datasetAudit.columns.actions')"
          width="200"
          fixed="right"
          align="center"
        >
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              @click="handleView(row)"
            >
              <i class="ri-eye-line"></i>
              {{ $t('research.datasetAudit.actions.view') }}
            </el-button>
            <el-button
              v-if="row.auditStatus === 'pending'"
              link
              type="success"
              @click="handleAudit(row)"
            >
              <i class="ri-check-line"></i>
              {{ $t('research.datasetAudit.actions.audit') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="searchParams.pageNum"
          v-model:page-size="searchParams.pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSearch"
          @current-change="handleSearch"
        />
      </div>
    </div>

    <!-- 移动端卡片视图 -->
    <div class="mobile-only">
      <div v-loading="loading" class="card-list">
        <div
          v-for="item in dataList"
          :key="item.id"
          class="data-card"
          @click="handleView(item)"
        >
          <!-- 卡片头部 -->
          <div class="card-header">
            <div class="card-title">
              <i class="ri-database-2-line"></i>
              {{ item.datasetCode || '-' }}
            </div>
            <div class="card-status">
              <el-tag :type="getDatasetStatusType(item.datasetStatus)" size="small">
                {{ $t(`research.datasetCompilation.status.${item.datasetStatus}`) }}
              </el-tag>
              <el-tag :type="getAuditStatusType(item.auditStatus)" size="small">
                {{ $t(`research.datasetAudit.auditStatus.${item.auditStatus}`) }}
              </el-tag>
            </div>
          </div>

          <!-- 卡片内容 -->
          <div class="card-content">
            <div class="card-row">
              <span class="label">{{ $t('research.datasetAudit.columns.batchName') }}:</span>
              <span class="value">{{ item.batchName }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.datasetAudit.columns.varietyName') }}:</span>
              <span class="value">{{ item.varietyName }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.datasetAudit.columns.submitTime') }}:</span>
              <span class="value">{{ item.submitTime }}</span>
            </div>

            <!-- 数据统计 -->
            <div class="card-stats">
              <div class="stat-item">
                <span class="stat-label">{{ $t('research.datasetAudit.columns.labTestCount') }}</span>
                <span class="stat-value">{{ item.labTestCount || 0 }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">{{ $t('research.datasetAudit.columns.yieldDataCount') }}</span>
                <span class="stat-value">{{ item.yieldDataCount || 0 }}</span>
              </div>
            </div>
          </div>

          <!-- 卡片操作按钮 -->
          <div class="card-actions">
            <el-button size="small" @click.stop="handleView(item)">
              <i class="ri-eye-line"></i>
              {{ $t('research.datasetAudit.actions.view') }}
            </el-button>
            <el-button
              v-if="item.auditStatus === 'pending'"
              type="success"
              size="small"
              @click.stop="handleAudit(item)"
            >
              <i class="ri-check-line"></i>
              {{ $t('research.datasetAudit.actions.audit') }}
            </el-button>
          </div>
        </div>

        <!-- 空状态 -->
        <el-empty v-if="!loading && dataList.length === 0" :description="$t('common.noData')" />
      </div>

      <!-- 移动端分页 -->
      <div v-if="total > 0" class="mobile-pagination">
        <el-pagination
          v-model:current-page="searchParams.pageNum"
          :total="total"
          :page-size="searchParams.pageSize"
          layout="prev, pager, next"
          small
          @current-change="handleSearch"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getAuditList } from '@/api/datasetAudit'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const dataList = ref([])
const total = ref(0)

const searchParams = reactive({
  pageNum: 1,
  pageSize: 10,
  keyword: '',
  auditStatus: '',
  datasetStatus: ''
})

// 获取数据集状态类型
const getDatasetStatusType = (status) => {
  const typeMap = {
    draft: '',
    submitted: 'info',
    reviewing: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return typeMap[status] || ''
}

// 获取审核状态类型
const getAuditStatusType = (status) => {
  const typeMap = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return typeMap[status] || ''
}

// 加载数据列表
const loadDataList = async () => {
  loading.value = true
  try {
    const res = await getAuditList(searchParams)
    if (res.code === 200) {
      dataList.value = res.data.list || []
      total.value = res.data.total || 0
    } else {
      ElMessage.error(res.msg || t('common.loadFailed'))
    }
  } catch (error) {
    console.error('Failed to load audit list:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  searchParams.pageNum = 1
  loadDataList()
}

// 查看详情
const handleView = (row) => {
  router.push({
    name: 'DatasetAuditReview',
    params: { id: row.datasetId }
  })
}

// 审核
const handleAudit = (row) => {
  router.push({
    name: 'DatasetAuditReview',
    params: { id: row.datasetId }
  })
}

// 初始化
onMounted(() => {
  loadDataList()
})
</script>

<style scoped>
.dataset-audit-container {
  padding: 24px;
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
  padding: 24px;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border-radius: 16px;
  border: 1px solid #86efac;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.3);
}

.header-icon i {
  font-size: 40px;
  color: white;
}

.header-text {
  flex: 1;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #009A44;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

/* 搜索筛选栏 */
.search-filter-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 300px;
  display: flex;
  gap: 12px;
}

.search-box .el-input {
  flex: 1;
}

.filter-box {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-box .el-select {
  width: 200px;
}

/* 表格容器 */
.table-container {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 分页 */
.pagination-container {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

/* 移动端卡片列表 */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.data-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #e5e7eb;
}

.data-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 154, 68, 0.15);
  border-color: #009A44;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f3f4f6;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-title i {
  font-size: 20px;
}

.card-status {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.card-content {
  margin-bottom: 12px;
}

.card-row {
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
}

.card-row:last-child {
  border-bottom: none;
}

.card-row .label {
  font-weight: 500;
  color: #6b7280;
  min-width: 100px;
  flex-shrink: 0;
}

.card-row .value {
  color: #1f2937;
  flex: 1;
  word-break: break-all;
}

.card-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 2px solid #f3f4f6;
}

.stat-item {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #86efac;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
}

.stat-value {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: #009A44;
}

.card-actions {
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
}

.card-actions .el-button {
  flex: 1;
}

.mobile-pagination {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

/* 响应式 */
.pc-only {
  display: block;
}

.mobile-only {
  display: none;
}

@media screen and (max-width: 1024px) {
  .dataset-audit-container {
    padding: 16px;
  }

  .filter-box .el-select {
    width: 160px;
  }
}

@media screen and (max-width: 768px) {
  .pc-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }

  .dataset-audit-container {
    padding: 12px;
  }

  .page-header {
    flex-direction: column;
    text-align: center;
    padding: 20px;
    margin-bottom: 24px;
  }

  .header-icon {
    width: 64px;
    height: 64px;
  }

  .header-icon i {
    font-size: 32px;
  }

  .page-title {
    font-size: 22px;
  }

  .page-subtitle {
    font-size: 14px;
  }

  .search-filter-bar {
    flex-direction: column;
    gap: 12px;
  }

  .search-box {
    min-width: auto;
    width: 100%;
  }

  .filter-box {
    width: 100%;
  }

  .filter-box .el-select {
    flex: 1;
    width: auto;
  }
}

@media screen and (max-width: 480px) {
  .dataset-audit-container {
    padding: 8px;
  }

  .page-header {
    padding: 16px;
    margin-bottom: 16px;
  }

  .header-icon {
    width: 56px;
    height: 56px;
  }

  .header-icon i {
    font-size: 28px;
  }

  .page-title {
    font-size: 20px;
  }

  .page-subtitle {
    font-size: 13px;
  }

  .card-stats {
    grid-template-columns: 1fr;
  }
}
</style>
