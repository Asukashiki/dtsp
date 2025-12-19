<template>
  <div class="c1-audit-container">
    <div class="page-header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <i class="ri-checkbox-circle-line header-icon"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">{{ $t('research.c1Propagation.auditTitle') }}</h1>
          <p class="page-subtitle">{{ $t('research.c1Propagation.auditSubtitle') }}</p>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <!-- 列表视图 -->
      <div v-if="!showAuditForm && !showDetail" class="list-view">
        <div class="search-bar">
          <div class="search-row">
            <el-input
              v-model="searchQuery"
              :placeholder="$t('research.c1Propagation.searchPlaceholder')"
              class="search-input"
              clearable
              @clear="loadData"
              @keyup.enter="loadData"
            >
              <template #prefix>
                <i class="ri-search-line"></i>
              </template>
            </el-input>

            <el-select
              v-model="statusFilter"
              :placeholder="$t('research.c1Propagation.form.applyStatus')"
              clearable
              class="status-filter"
              @change="loadData"
            >
              <el-option label="All" value="" />
              <el-option label="Pending" value="pending" />
              <el-option label="Approved" value="approved" />
              <el-option label="Rejected" value="rejected" />
            </el-select>

            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="-"
              :start-placeholder="$t('common.startDate')"
              :end-placeholder="$t('common.endDate')"
              class="date-filter"
              clearable
              value-format="YYYY-MM-DD"
              @change="loadData"
            />
          </div>

          <div class="action-row">
            <div class="action-left">
              <el-button type="primary" @click="loadData">
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

        <!-- 统计卡片 -->
        <div class="stats-row">
          <div class="stat-card pending">
            <div class="stat-icon"><i class="ri-time-line"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ pendingCount }}</div>
              <div class="stat-label">{{ $t('research.c1Propagation.status.pending') }}</div>
            </div>
          </div>
          <div class="stat-card approved">
            <div class="stat-icon"><i class="ri-checkbox-circle-line"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ approvedCount }}</div>
              <div class="stat-label">{{ $t('research.c1Propagation.status.approved') }}</div>
            </div>
          </div>
          <div class="stat-card rejected">
            <div class="stat-icon"><i class="ri-close-circle-line"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ rejectedCount }}</div>
              <div class="stat-label">{{ $t('research.c1Propagation.status.rejected') }}</div>
            </div>
          </div>
        </div>

        <!-- PC端表格 -->
        <div class="table-card pc-view">
          <el-table :data="dataList" stripe style="width: 100%" v-loading="loading" table-layout="fixed">
            <el-table-column
              prop="applicantOrgName"
              :label="$t('research.c1Propagation.columns.applicantOrgName')"
              min-width="160"
              show-overflow-tooltip
            />
            <el-table-column
              prop="authId"
              :label="$t('research.c1Propagation.columns.authId')"
              min-width="140"
              show-overflow-tooltip
            >
              <template #default="{ row }">
                {{ row.authId || '-' }}
              </template>
            </el-table-column>
            <el-table-column
              prop="cropType"
              :label="$t('research.c1Propagation.columns.cropType')"
              min-width="160"
              align="center"
            />
            <el-table-column
              prop="varietyName"
              :label="$t('research.c1Propagation.columns.varietyName')"
              min-width="120"
              show-overflow-tooltip
            />
            <el-table-column
              prop="applyDate"
              :label="$t('research.c1Propagation.columns.applyDate')"
              min-width="160"
              align="center"
            />
            <el-table-column
              prop="applyStatus"
              :label="$t('research.c1Propagation.columns.applyStatus')"
              min-width="160"
              align="center"
            >
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.applyStatus)" size="small">
                  {{ $t(`research.c1Propagation.status.${row.applyStatus}`) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="auditor"
              :label="$t('research.c1Propagation.columns.auditor')"
              min-width="160"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="auditTime"
              :label="$t('research.c1Propagation.columns.auditTime')"
              min-width="150"
              align="center"
            />
            <el-table-column
              :label="$t('research.c1Propagation.columns.actions')"
              width="180"
              fixed="right"
              align="center"
            >
              <template #default="{ row }">
                <el-button link type="primary" @click="handleView(row)">
                  <i class="ri-eye-line"></i> {{ $t('common.view') }}
                </el-button>
                <el-button link type="success" @click="handleAudit(row)" v-if="row.applyStatus === 'pending'">
                  <i class="ri-checkbox-circle-line"></i> {{ $t('research.c1Propagation.audit') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[10, 20, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>

        <!-- 移动端卡片 -->
        <div class="mobile-view" v-loading="loading">
          <div class="card-list">
            <div
              v-for="item in dataList"
              :key="item.id"
              class="audit-card"
              @click="handleView(item)"
            >
              <div class="card-header">
                <el-tag :type="getStatusType(item.applyStatus)" size="small">
                  {{ $t(`research.c1Propagation.status.${item.applyStatus}`) }}
                </el-tag>
                <el-tag type="info" size="small">{{ item.cropType }}</el-tag>
                <el-tag v-if="item.authId" type="success" size="small">{{ item.authId }}</el-tag>
              </div>
              <h3 class="card-title">{{ item.applicantOrgName }}</h3>
              <div class="card-info">
                <div class="info-item">
                  <span class="info-label">{{ $t('research.c1Propagation.columns.varietyName') }}</span>
                  <span class="info-value">{{ item.varietyName }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">{{ $t('research.c1Propagation.columns.applyDate') }}</span>
                  <span class="info-value">{{ item.applyDate }}</span>
                </div>
              </div>
              <div class="card-footer">
                <span class="create-time">{{ item.createdTime }}</span>
                <div class="card-actions" @click.stop v-if="item.applyStatus === 'pending'">
                  <el-button type="primary" size="small" @click="handleAudit(item)">
                    <i class="ri-checkbox-circle-line"></i> {{ $t('research.c1Propagation.audit') }}
                  </el-button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="dataList.length === 0 && !loading" class="empty-state">
            <i class="ri-inbox-line"></i>
            <p>{{ $t('home.noData') }}</p>
          </div>

          <div class="mobile-pagination">
            <el-pagination
              v-model:current-page="currentPage"
              :total="total"
              :page-size="pageSize"
              layout="prev, pager, next"
              small
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>

      <!-- 审核表单视图 -->
      <AuditForm
        v-if="showAuditForm"
        :data="currentRow"
        @cancel="showAuditForm = false"
        @success="handleAuditSuccess"
      />

      <!-- 详情视图 -->
      <AuditDetail
        v-if="showDetail"
        :data="currentRow"
        @back="showDetail = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getC1PropagationAllList } from '@/api/c1Propagation'
import AuditForm from './audit-form.vue'
import AuditDetail from './detail.vue'

const { t } = useI18n()

// 数据状态
const loading = ref(false)
const dataList = ref([])
const searchQuery = ref('')
const statusFilter = ref('')
const dateRange = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 视图控制
const showAuditForm = ref(false)
const showDetail = ref(false)
const currentRow = ref(null)

// 统计数据
const pendingCount = computed(() => dataList.value.filter(item => item.applyStatus === 'pending').length)
const approvedCount = computed(() => dataList.value.filter(item => item.applyStatus === 'approved').length)
const rejectedCount = computed(() => dataList.value.filter(item => item.applyStatus === 'rejected').length)

// 获取状态类型
const getStatusType = (status) => {
  const types = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return types[status] || 'info'
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchQuery.value,
      applyStatus: statusFilter.value
    }
    
    if (dateRange.value && dateRange.value.length === 2) {
      params.queryDateStart = dateRange.value[0]
      params.queryDateEnd = dateRange.value[1]
    }

    const res = await getC1PropagationAllList(params)
    if (res.code === 200) {
      dataList.value = res.data?.list || []
      total.value = res.data?.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 处理重置
const handleReset = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  dateRange.value = []
  currentPage.value = 1
  loadData()
}

// 处理分页
const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
  loadData()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  loadData()
}

// 操作
const handleView = (row) => {
  currentRow.value = row
  showDetail.value = true
  showAuditForm.value = false
}

const handleAudit = (row) => {
  currentRow.value = row
  showAuditForm.value = true
  showDetail.value = false
}

const handleAuditSuccess = () => {
  showAuditForm.value = false
  loadData()
}

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.c1-audit-container {
  min-height: calc(100vh - 120px);
  position: relative;
}

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

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-card.pending .stat-icon {
  background: rgba(230, 162, 60, 0.1);
  color: #e6a23c;
}

.stat-card.approved .stat-icon {
  background: rgba(0, 154, 68, 0.1);
  color: #009A44;
}

.stat-card.rejected .stat-icon {
  background: rgba(245, 108, 108, 0.1);
  color: #f56c6c;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.search-bar {
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
}

.search-row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.search-input {
  flex: 1;
  min-width: 0;
}

.status-filter {
  width: 150px;
  flex-shrink: 0;
}

.date-filter {
  width: 300px;
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

.table-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
}

.pagination-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

.mobile-view {
  display: none;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.audit-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.audit-card:active {
  transform: scale(0.98);
}

.card-header {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 12px 0;
}

.card-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 12px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-label {
  font-size: 12px;
  color: #909399;
}

.info-value {
  font-size: 14px;
  color: #606266;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.create-time {
  font-size: 12px;
  color: #909399;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #909399;
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 12px;
  display: block;
}

.mobile-pagination {
  display: flex;
  justify-content: center;
  padding: 16px 0;
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
    padding: 16px 0;
  }
  .header-content {
    padding: 0 12px;
    gap: 12px;
  }
  .header-icon-wrapper {
    width: 48px;
    height: 48px;
  }
  .header-icon {
    font-size: 24px;
  }
  .page-title {
    font-size: 18px;
  }
  .page-subtitle {
    display: none;
  }

  .stats-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .stat-card {
    padding: 12px 16px;
  }

  .stat-icon {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .stat-value {
    font-size: 20px;
  }

  .search-row {
    flex-direction: column;
  }
  .status-filter,
  .date-filter {
    width: 100%;
  }

  .pc-view {
    display: none;
  }
  .mobile-view {
    display: block;
  }
}
</style>
