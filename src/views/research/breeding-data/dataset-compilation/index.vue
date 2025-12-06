<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-database-2-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.datasetCompilation.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.datasetCompilation.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('research.datasetCompilation.list') }}</span>
            </div>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('common.add') }}
            </el-button>
          </div>

          <div class="card-body">
            <!-- 搜索区域 -->
            <div class="search-section">
              <el-input
                v-model="searchForm.keyword"
                :placeholder="$t('research.datasetCompilation.searchPlaceholder')"
                clearable
                class="search-input"
              >
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
              <el-select
                v-model="searchForm.datasetStatus"
                :placeholder="$t('research.datasetCompilation.filterByStatus')"
                clearable
                class="search-select"
              >
                <el-option :label="$t('research.datasetCompilation.allStatus')" value="" />
                <el-option :label="$t('research.datasetCompilation.status.draft')" value="draft" />
                <el-option :label="$t('research.datasetCompilation.status.submitted')" value="submitted" />
                <el-option :label="$t('research.datasetCompilation.status.reviewing')" value="reviewing" />
                <el-option :label="$t('research.datasetCompilation.status.approved')" value="approved" />
                <el-option :label="$t('research.datasetCompilation.status.rejected')" value="rejected" />
              </el-select>
              <el-button type="primary" @click="handleSearch">
                <i class="ri-search-line"></i>
                {{ $t('common.search') }}
              </el-button>
              <el-button @click="handleReset">
                <i class="ri-refresh-line"></i>
                {{ $t('common.reset') }}
              </el-button>
            </div>

            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table v-loading="loading" :data="tableData" stripe>
                <el-table-column
                  prop="datasetCode"
                  :label="$t('research.datasetCompilation.columns.datasetCode')"
                  min-width="150"
                />
                <el-table-column
                  prop="trialId"
                  :label="$t('research.datasetCompilation.columns.trialId')"
                  min-width="120"
                />
                <el-table-column
                  prop="batchId"
                  :label="$t('research.datasetCompilation.columns.batchId')"
                  min-width="150"
                />
                <el-table-column
                  prop="batchName"
                  :label="$t('research.datasetCompilation.columns.batchName')"
                  min-width="150"
                />
                <el-table-column
                  prop="versionNo"
                  :label="$t('research.datasetCompilation.columns.versionNo')"
                  width="100"
                />
                <el-table-column
                  prop="cropType"
                  :label="$t('research.datasetCompilation.columns.cropType')"
                  min-width="120"
                />
                <el-table-column
                  prop="varietyName"
                  :label="$t('research.datasetCompilation.columns.varietyName')"
                  min-width="120"
                />
                <el-table-column
                  prop="recordCount"
                  :label="$t('research.datasetCompilation.columns.recordCount')"
                  width="100"
                />
                <el-table-column
                  prop="labTestCount"
                  :label="$t('research.datasetCompilation.columns.labTestCount')"
                  width="100"
                />
                <el-table-column
                  prop="yieldDataCount"
                  :label="$t('research.datasetCompilation.columns.yieldDataCount')"
                  width="100"
                />
                <el-table-column
                  prop="datasetStatus"
                  :label="$t('research.datasetCompilation.columns.datasetStatus')"
                  width="100"
                >
                  <template #default="{ row }">
                    <el-tag :type="getStatusType(row.datasetStatus)">
                      {{ getStatusLabel(row.datasetStatus) }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createdTime"
                  :label="$t('research.datasetCompilation.columns.createTime')"
                  width="180"
                />
                <el-table-column :label="$t('common.actions')" fixed="right" width="300">
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button link type="primary" @click="handleView(row)">
                        <i class="ri-eye-line"></i>
                        {{ $t('common.view') }}
                      </el-button>
                      <el-button
                        v-if="row.datasetStatus === 'draft' || row.datasetStatus === 'rejected'"
                        link
                        type="primary"
                        @click="handleEdit(row)"
                      >
                        <i class="ri-edit-line"></i>
                        {{ $t('common.edit') }}
                      </el-button>
                      <el-button
                        v-if="row.datasetStatus === 'draft' || row.datasetStatus === 'rejected'"
                        link
                        type="success"
                        @click="handleSubmit(row)"
                      >
                        <i class="ri-send-plane-line"></i>
                        {{ $t('research.datasetCompilation.actions.submit') }}
                      </el-button>
                      <el-button
                        v-if="row.datasetStatus === 'draft' || row.datasetStatus === 'rejected'"
                        link
                        type="danger"
                        @click="handleDelete(row)"
                      >
                        <i class="ri-delete-bin-line"></i>
                        {{ $t('common.delete') }}
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>

              <!-- 分页 -->
              <div class="pagination-wrapper">
                <el-pagination
                  v-model:current-page="pagination.currentPage"
                  v-model:page-size="pagination.pageSize"
                  :total="pagination.total"
                  :page-sizes="[10, 20, 50, 100]"
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </div>
            </div>

            <!-- 移动端卡片 -->
            <div class="mobile-card-list mobile-only">
              <div v-for="item in tableData" :key="item.id" class="mobile-card">
                <div class="mobile-card-header">
                  <div class="mobile-card-title">
                    <i class="ri-database-2-line"></i>
                    <span>{{ item.batchName }}</span>
                  </div>
                  <el-tag :type="getStatusType(item.datasetStatus)" size="small">
                    {{ getStatusLabel(item.datasetStatus) }}
                  </el-tag>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetCompilation.columns.datasetCode') }}:</span>
                    <span class="value">{{ item.datasetCode || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetCompilation.columns.trialId') }}:</span>
                    <span class="value">{{ item.trialId || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetCompilation.columns.batchId') }}:</span>
                    <span class="value">{{ item.batchId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetCompilation.columns.versionNo') }}:</span>
                    <span class="value">{{ item.versionNo || '1.0' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetCompilation.columns.cropType') }}:</span>
                    <span class="value">{{ item.cropType }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetCompilation.columns.varietyName') }}:</span>
                    <span class="value">{{ item.varietyName }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetCompilation.columns.recordCount') }}:</span>
                    <span class="value">{{ item.recordCount || 0 }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetCompilation.columns.labTestCount') }}:</span>
                    <span class="value">{{ item.labTestCount || 0 }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetCompilation.columns.yieldDataCount') }}:</span>
                    <span class="value">{{ item.yieldDataCount || 0 }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetCompilation.columns.createTime') }}:</span>
                    <span class="value">{{ item.createdTime || '-' }}</span>
                  </div>
                </div>
                <div class="mobile-card-actions">
                  <el-button type="primary" size="small" @click="handleView(item)">
                    {{ $t('common.view') }}
                  </el-button>
                  <el-button v-if="item.datasetStatus === 'draft' || item.datasetStatus === 'rejected'" size="small" @click="handleEdit(item)">
                    {{ $t('common.edit') }}
                  </el-button>
                  <el-button
                    v-if="item.datasetStatus === 'draft' || item.datasetStatus === 'rejected'"
                    type="success"
                    size="small"
                    @click="handleSubmit(item)"
                  >
                    {{ $t('research.datasetCompilation.actions.submit') }}
                  </el-button>
                  <el-button
                    v-if="item.datasetStatus === 'draft' || item.datasetStatus === 'rejected'"
                    type="danger"
                    size="small"
                    @click="handleDelete(item)"
                  >
                    {{ $t('common.delete') }}
                  </el-button>
                </div>
              </div>

              <!-- 移动端分页 -->
              <div class="pagination-wrapper mobile-pagination">
                <el-pagination
                  v-model:current-page="pagination.currentPage"
                  v-model:page-size="pagination.pageSize"
                  :page-sizes="[10, 20, 50]"
                  :total="pagination.total"
                  layout="total, prev, pager, next"
                  small
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </div>
            </div>

            <!-- 空状态 -->
            <el-empty v-if="tableData.length === 0 && !loading" :description="$t('home.noData')" />
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
import { getDatasetList, deleteDataset, submitDataset } from '@/api/dataset'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])

const searchForm = reactive({
  keyword: '',
  datasetStatus: ''
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getDatasetList({
      batchName: searchForm.keyword,
      datasetStatus: searchForm.datasetStatus,
      pageNum: pagination.currentPage,
      pageSize: pagination.pageSize
    })
    if (res.code === 200) {
      tableData.value = res.data?.list || res.data || []
      pagination.total = res.data?.total || res.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 获取状态类型
const getStatusType = (status) => {
  const typeMap = {
    draft: '',
    submitted: 'info',
    reviewing: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return typeMap[status] || ''
}

// 获取状态标签
const getStatusLabel = (status) => {
  return t(`research.datasetCompilation.status.${status}`)
}

// 搜索
const handleSearch = () => {
  pagination.currentPage = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.keyword = ''
  searchForm.datasetStatus = ''
  handleSearch()
}

// 新增
const handleAdd = () => {
  router.push({ name: 'DatasetCompilationAdd' })
}

// 查看
const handleView = (row) => {
  router.push({ name: 'DatasetCompilationDetail', params: { id: row.id } })
}

// 编辑
const handleEdit = (row) => {
  router.push({ name: 'DatasetCompilationEdit', params: { id: row.id } })
}

// 提交审核
const handleSubmit = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('research.datasetCompilation.submitConfirm'),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )
    const res = await submitDataset(row.id)
    if (res.code === 200) {
      ElMessage.success(t('research.datasetCompilation.submitSuccess'))
      loadData()
    } else {
      ElMessage.error(res.msg || t('common.submitFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to submit:', error)
      ElMessage.error(t('common.submitFailed'))
    }
  }
}

// 删除
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('research.datasetCompilation.deleteConfirm'),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )
    const res = await deleteDataset([row.id])
    if (res.code === 200) {
      ElMessage.success(t('research.datasetCompilation.deleteSuccess'))
      loadData()
    } else {
      ElMessage.error(res.msg || t('common.deleteFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete:', error)
      ElMessage.error(t('common.deleteFailed'))
    }
  }
}

// 分页
const handleSizeChange = () => {
  pagination.currentPage = 1
  loadData()
}

const handleCurrentChange = () => {
  loadData()
}

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style scoped>
/* 页面容器 */
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 24px;
}

.page-wrapper {
  margin: 0 auto;
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  flex-shrink: 0;
}

.header-content {
  color: white;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

/* 内容区域 */
.content-wrapper {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* 卡片 */
.info-card {
  background: white;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e8f5e9;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-title i {
  font-size: 22px;
}

.card-body {
  padding: 24px;
}

/* 搜索区域 */
.search-section {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.search-select {
  width: 200px;
  flex-shrink: 0;
}

.search-section .el-button {
  flex-shrink: 0;
}

/* 表格 */
.table-wrapper {
  margin-top: 16px;
}

.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* 分页 */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e8f5e9;
}

/* 移动端卡片列表 */
.mobile-card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mobile-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.mobile-card:active {
  transform: scale(0.98);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.mobile-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.mobile-card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #009A44;
  flex: 1;
}

.mobile-card-title i {
  font-size: 20px;
  flex-shrink: 0;
}

.mobile-card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-card-row {
  display: flex;
  font-size: 14px;
  line-height: 1.6;
}

.mobile-card-row .label {
  color: #666;
  min-width: 100px;
  flex-shrink: 0;
}

.mobile-card-row .value {
  color: #333;
  font-weight: 500;
}

.mobile-card-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
  flex-wrap: wrap;
}

.mobile-card-actions .el-button {
  flex: 1;
  min-width: 70px;
}

/* 响应式 */
.pc-only {
  display: block;
}

.mobile-only {
  display: none;
}

@media screen and (max-width: 768px) {
  .page-container {
    padding: 12px;
  }

  .page-header {
    padding: 20px;
    border-radius: 12px;
  }

  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }

  .page-title {
    font-size: 24px;
  }

  .page-subtitle {
    font-size: 14px;
  }

  .content-wrapper {
    border-radius: 12px;
  }

  .card-header {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .card-body {
    padding: 16px;
  }

  .search-section {
    flex-direction: column;
  }

  .search-input,
  .search-select {
    width: 100%;
  }

  .pc-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }
}
</style>
