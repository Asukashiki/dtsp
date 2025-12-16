<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-building-2-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('orgRegistration.title') }}</h1>
            <p class="page-subtitle">{{ $t('orgRegistration.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-list-check"></i>
              <span>{{ $t('orgRegistration.list.title') }}</span>
            </div>
            <div class="header-actions">
              <el-button type="primary" @click="handleAdd">
                <i class="ri-add-line"></i>
                {{ $t('common.add') }}
              </el-button>
            </div>
          </div>

          <div class="card-body">
            <!-- 搜索区域 -->
            <div class="search-section">
              <el-input
                v-model="searchForm.keyword"
                :placeholder="$t('orgRegistration.list.searchPlaceholder')"
                clearable
                class="search-input"
              >
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>

              <el-select
                v-model="searchForm.orgType"
                :placeholder="$t('orgRegistration.list.filterByType')"
                clearable
                class="search-select"
              >
                <el-option value="" :label="$t('orgRegistration.list.allTypes')"></el-option>
                <el-option value="UNION" :label="$t('orgRegistration.orgType.UNION')"></el-option>
                <el-option value="COOPERATIVE" :label="$t('orgRegistration.orgType.COOPERATIVE')"></el-option>
              </el-select>

              <el-select
                v-model="searchForm.auditStatus"
                :placeholder="$t('orgRegistration.list.filterByStatus')"
                clearable
                class="search-select"
              >
                <el-option value="" :label="$t('orgRegistration.list.allStatus')"></el-option>
                <el-option :value="0" :label="$t('orgRegistration.status.pending')"></el-option>
                <el-option :value="1" :label="$t('orgRegistration.status.approved')"></el-option>
                <el-option :value="2" :label="$t('orgRegistration.status.rejected')"></el-option>
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
                  prop="orgName"
                  :label="$t('orgRegistration.columns.orgName')"
                  min-width="180"
                />
                <el-table-column
                  prop="orgType"
                  :label="$t('orgRegistration.columns.orgType')"
                  min-width="140"
                >
                  <template #default="{ row }">
                    <el-tag :type="row.orgType === 'UNION' ? 'primary' : 'success'">
                      {{ $t(`orgRegistration.orgType.${row.orgType}`) }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="licenseNumber"
                  :label="$t('orgRegistration.columns.licenseNumber')"
                  min-width="150"
                />
                <el-table-column
                  :label="$t('orgRegistration.columns.regionCode')"
                  min-width="200"
                >
                  <template #default="{ row }">
                    <span class="region-path">{{ formatRegionName(row.regionName) }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="applyUsername"
                  :label="$t('orgRegistration.columns.applyUsername')"
                  min-width="130"
                />
                <el-table-column
                  prop="auditStatus"
                  :label="$t('orgRegistration.columns.auditStatus')"
                  min-width="120"
                >
                  <template #default="{ row }">
                    <el-tag :type="getStatusType(row.auditStatus)">
                      {{ getStatusLabel(row.auditStatus) }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  :label="$t('orgRegistration.columns.createTime')"
                  min-width="160"
                />
                <el-table-column :label="$t('common.actions')" fixed="right" width="180">
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button link type="primary" @click="handleView(row)">
                        <i class="ri-eye-line"></i>
                        {{ $t('orgRegistration.actions.view') }}
                      </el-button>
                      <el-button
                        link
                        type="primary"
                        @click="handleEdit(row)"
                        v-if="row.auditStatus === 2"
                      >
                        <i class="ri-edit-line"></i>
                        {{ $t('orgRegistration.actions.resubmit') }}
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
                    <i class="ri-building-2-line"></i>
                    <span>{{ item.orgName }}</span>
                  </div>
                  <el-tag :type="getStatusType(item.auditStatus)" size="small">
                    {{ getStatusLabel(item.auditStatus) }}
                  </el-tag>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('orgRegistration.columns.orgType') }}:</span>
                    <span class="value">
                      <el-tag :type="item.orgType === 'UNION' ? 'primary' : 'success'" size="small">
                        {{ $t(`orgRegistration.orgType.${item.orgType}`) }}
                      </el-tag>
                    </span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('orgRegistration.columns.licenseNumber') }}:</span>
                    <span class="value">{{ item.licenseNumber }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('orgRegistration.columns.regionCode') }}:</span>
                    <span class="value">{{ formatRegionName(item.regionName) }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('orgRegistration.columns.applyUsername') }}:</span>
                    <span class="value">{{ item.applyUsername }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('orgRegistration.columns.createTime') }}:</span>
                    <span class="value">{{ item.createTime || '-' }}</span>
                  </div>
                </div>
                <div class="mobile-card-actions">
                  <el-button type="primary" size="small" @click="handleView(item)">
                    {{ $t('orgRegistration.actions.view') }}
                  </el-button>
                  <el-button
                    size="small"
                    @click="handleEdit(item)"
                    v-if="item.auditStatus === 2"
                  >
                    {{ $t('orgRegistration.actions.resubmit') }}
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
            <el-empty v-if="tableData.length === 0 && !loading" :description="$t('orgRegistration.list.noData')" />
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
import { getRegistrationList } from '@/api/orgRegistration'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])

const searchForm = reactive({
  keyword: '',
  orgType: '',
  auditStatus: ''
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 获取状态标签
const getStatusLabel = (status) => {
  const statusMap = {
    0: t('orgRegistration.status.pending'),
    1: t('orgRegistration.status.approved'),
    2: t('orgRegistration.status.rejected')
  }
  return statusMap[status] || status
}

// 获取状态类型
const getStatusType = (status) => {
  const typeMap = {
    0: 'warning',
    1: 'success',
    2: 'danger'
  }
  return typeMap[status] || 'info'
}

// 格式化区域名称（将 # 分隔转为 > 分隔，只显示最后两级）
const formatRegionName = (regionName) => {
  if (!regionName) return '-'
  const parts = regionName.split('#')
  // 只显示最后两级，避免过长
  if (parts.length > 2) {
    return parts.slice(-2).join(' > ')
  }
  return parts.join(' > ')
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getRegistrationList({
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      orgName: searchForm.keyword,
      orgType: searchForm.orgType,
      auditStatus: searchForm.auditStatus !== '' ? searchForm.auditStatus : undefined
    })
    if (res.code === 200) {
      tableData.value = res.data?.list || []
      pagination.total = res.data?.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('orgRegistration.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.currentPage = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.keyword = ''
  searchForm.orgType = ''
  searchForm.auditStatus = ''
  handleSearch()
}

// 新增
const handleAdd = () => {
  router.push({ name: 'OrgRegistrationAdd' })
}

// 查看
const handleView = (row) => {
  router.push({ name: 'OrgRegistrationDetail', params: { id: row.id } })
}

// 编辑（驳回后重新提交）
const handleEdit = (row) => {
  router.push({ name: 'OrgRegistrationEdit', params: { id: row.id } })
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

.header-actions {
  display: flex;
  gap: 12px;
}

.card-body {
  padding: 24px;
}

/* 搜索区域 */
.search-section {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: nowrap;
  align-items: center;
}

.search-input {
  flex: 1;
  flex-shrink: 0;
}

.search-select {
  flex: 1;
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
  flex-wrap: wrap;
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

  .card-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .header-actions {
    width: 100%;
  }

  .header-actions .el-button {
    flex: 1;
  }

  .search-section {
    /* 保持横向排列 */
    flex-wrap: wrap;
    gap: 8px;
  }

  .search-input {
    flex: 1;
    min-width: 120px;
  }

  .search-select {
    flex: 0 0 auto;
    width: auto;
    min-width: 100px;
  }

  .search-section .el-button {
    flex: 0 0 auto;
    padding: 8px 12px;
  }

  .pc-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }
}
</style>
