<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-shield-check-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.datasetAudit.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.datasetAudit.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('research.datasetAudit.list') }}</span>
            </div>
          </div>

          <div class="card-body">
            <!-- 搜索区域 -->
            <div class="search-section">
              <el-input
                v-model="searchParams.keyword"
                :placeholder="$t('research.datasetAudit.searchPlaceholder')"
                clearable
                class="search-input"
              >
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
              <el-select
                v-model="searchParams.auditStatus"
                :placeholder="$t('research.datasetAudit.filterByAuditStatus')"
                clearable
                class="search-select"
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
                class="search-select"
              >
                <el-option :label="$t('research.datasetAudit.allDatasetStatus')" value="" />
                <el-option
                  v-for="(label, key) in $t('research.datasetAudit.datasetStatus')"
                  :key="key"
                  :label="label"
                  :value="key"
                />
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
              <el-table v-loading="loading" :data="dataList" stripe>
                <el-table-column
                  prop="id"
                  :label="$t('research.datasetAudit.columns.auditId')"
                  min-width="120"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="datasetId"
                  :label="$t('research.datasetAudit.columns.datasetId')"
                  min-width="120"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="datasetCode"
                  :label="$t('research.datasetAudit.columns.datasetCode')"
                  min-width="150"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="auditorId"
                  :label="$t('research.datasetAudit.columns.reviewerId')"
                  min-width="120"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="trialId"
                  :label="$t('research.datasetAudit.columns.trialId')"
                  min-width="120"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="batchId"
                  :label="$t('research.datasetAudit.columns.batchId')"
                  min-width="150"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="versionNo"
                  :label="$t('research.datasetAudit.columns.versionNo')"
                  min-width="100"
                />
                <el-table-column
                  prop="varietyName"
                  :label="$t('research.datasetAudit.columns.varietyName')"
                  min-width="120"
                />
                <el-table-column
                  prop="recordCount"
                  :label="$t('research.datasetAudit.columns.recordCount')"
                  min-width="100"
                  align="center"
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
                  prop="auditorName"
                  :label="$t('research.datasetAudit.columns.auditorName')"
                  min-width="100"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="auditTime"
                  :label="$t('research.datasetAudit.columns.auditTime')"
                  min-width="150"
                />
                <el-table-column
                  prop="auditOpinion"
                  :label="$t('research.datasetAudit.columns.auditOpinion')"
                  min-width="150"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="lockedFlag"
                  :label="$t('research.datasetAudit.columns.lockedFlag')"
                  min-width="100"
                  align="center"
                >
                  <template #default="{ row }">
                    <el-tag v-if="row.lockedFlag !== null && row.lockedFlag !== undefined" :type="row.lockedFlag === 1 ? 'danger' : 'success'" size="small">
                      <i :class="row.lockedFlag === 1 ? 'ri-lock-line' : 'ri-lock-unlock-line'"></i>
                      {{ row.lockedFlag === 1 ? $t('research.datasetAudit.form.locked') : $t('research.datasetAudit.form.unlocked') }}
                    </el-tag>
                    <span v-else>-</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="submitTime"
                  :label="$t('research.datasetAudit.columns.submitTime')"
                  min-width="150"
                />
                <el-table-column :label="$t('common.actions')" fixed="right" width="250">
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button link type="primary" @click="handleView(row)">
                        <i class="ri-eye-line"></i>
                        {{ $t('common.view') }}
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
                    </div>
                  </template>
                </el-table-column>
              </el-table>

              <!-- 分页 -->
              <div class="pagination-wrapper">
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

            <!-- 移动端卡片 -->
            <div class="mobile-card-list mobile-only">
              <div v-for="item in dataList" :key="item.id" class="mobile-card">
                <div class="mobile-card-header">
                  <div class="mobile-card-title">
                    <i class="ri-database-2-line"></i>
                    <span>{{ item.datasetCode || '-' }}</span>
                  </div>
                  <el-tag :type="getAuditStatusType(item.auditStatus)" size="small">
                    {{ $t(`research.datasetAudit.auditStatus.${item.auditStatus}`) }}
                  </el-tag>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetAudit.columns.auditId') }}:</span>
                    <span class="value">{{ item.id || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetAudit.columns.datasetId') }}:</span>
                    <span class="value">{{ item.datasetId || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetAudit.columns.reviewerId') }}:</span>
                    <span class="value">{{ item.auditorId || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetAudit.columns.trialId') }}:</span>
                    <span class="value">{{ item.trialId || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetAudit.columns.batchId') }}:</span>
                    <span class="value">{{ item.batchId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetAudit.columns.batchName') }}:</span>
                    <span class="value">{{ item.batchName }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetAudit.columns.versionNo') }}:</span>
                    <span class="value">{{ item.versionNo || '1.0' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetAudit.columns.varietyName') }}:</span>
                    <span class="value">{{ item.varietyName }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetAudit.columns.recordCount') }}:</span>
                    <span class="value">{{ item.recordCount || 0 }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetAudit.columns.datasetStatus') }}:</span>
                    <span class="value">
                      <el-tag :type="getDatasetStatusType(item.datasetStatus)" size="small">
                        {{ $t(`research.datasetCompilation.status.${item.datasetStatus}`) }}
                      </el-tag>
                    </span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetAudit.columns.labTestCount') }}:</span>
                    <span class="value">{{ item.labTestCount || 0 }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetAudit.columns.yieldDataCount') }}:</span>
                    <span class="value">{{ item.yieldDataCount || 0 }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetAudit.columns.submitTime') }}:</span>
                    <span class="value">{{ item.submitTime || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetAudit.columns.auditorName') }}:</span>
                    <span class="value">{{ item.auditorName || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetAudit.columns.auditTime') }}:</span>
                    <span class="value">{{ item.auditTime || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetAudit.columns.auditOpinion') }}:</span>
                    <span class="value">{{ item.auditOpinion || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.datasetAudit.columns.lockedFlag') }}:</span>
                    <span class="value">
                      <el-tag v-if="item.lockedFlag !== null && item.lockedFlag !== undefined" :type="item.lockedFlag === 1 ? 'danger' : 'success'" size="small">
                        <i :class="item.lockedFlag === 1 ? 'ri-lock-line' : 'ri-lock-unlock-line'"></i>
                        {{ item.lockedFlag === 1 ? $t('research.datasetAudit.form.locked') : $t('research.datasetAudit.form.unlocked') }}
                      </el-tag>
                      <span v-else>-</span>
                    </span>
                  </div>
                </div>
                <div class="mobile-card-actions">
                  <el-button type="primary" size="small" @click="handleView(item)">
                    {{ $t('common.view') }}
                  </el-button>
                  <el-button
                    v-if="item.auditStatus === 'pending'"
                    type="success"
                    size="small"
                    @click="handleAudit(item)"
                  >
                    {{ $t('research.datasetAudit.actions.audit') }}
                  </el-button>
                </div>
              </div>

              <!-- 移动端分页 -->
              <div class="pagination-wrapper mobile-pagination">
                <el-pagination
                  v-model:current-page="searchParams.pageNum"
                  v-model:page-size="searchParams.pageSize"
                  :page-sizes="[10, 20, 50]"
                  :total="total"
                  layout="total, prev, pager, next"
                  small
                  @size-change="handleSearch"
                  @current-change="handleSearch"
                />
              </div>
            </div>

            <!-- 空状态 -->
            <el-empty v-if="dataList.length === 0 && !loading" :description="$t('home.noData')" />
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
    rejected: 'danger',
    needs_revision: 'warning'
  }
  return typeMap[status] || ''
}

// 加载数据列表
const loadDataList = async () => {
  loading.value = true
  try {
    const res = await getAuditList(searchParams)
    if (res.code === 200) {
      const originalList = res.data.list || [];
      const filteredList = originalList.filter(item =>
          item.datasetStatus === "approved" || item.datasetStatus === "submitted"
      );


      dataList.value = filteredList;
      total.value = filteredList.length;
    } else {
      ElMessage.error(res.msg || t('common.loadFailed'));
    }
  } catch (error) { // 补充catch捕获请求异常，避免loading一直转圈
    console.error('加载数据列表失败：', error);
    ElMessage.error(t('common.loadFailed'));
    loading.value = false;
  } finally { // 无论成功失败，都关闭loading
    loading.value = false;
  }
}

// 搜索
const handleSearch = () => {
  searchParams.pageNum = 1
  loadDataList()
}

// 重置
const handleReset = () => {
  searchParams.keyword = ''
  searchParams.auditStatus = ''
  searchParams.datasetStatus = ''
  handleSearch()
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
}

.mobile-card-actions .el-button {
  flex: 1;
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
