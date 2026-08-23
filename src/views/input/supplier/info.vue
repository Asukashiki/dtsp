<template>
  <div class="supplier-info-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <i class="ri-team-line header-icon"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">{{ $t('input.supplier.info.title') }}</h1>
          <p class="page-subtitle">{{ $t('input.supplier.info.subtitle') }}</p>
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
            :placeholder="$t('input.supplier.info.searchPlaceholder')"
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
            <el-button type="primary" @click="handleSearch">
              <i class="ri-search-line"></i>
              <span class="btn-text">{{ $t('common.search') }}</span>
            </el-button>
            <el-button @click="handleReset">
              <i class="ri-restart-line"></i>
              <span class="btn-text">{{ $t('common.reset') }}</span>
            </el-button>
            <el-button @click="showAdvanced = !showAdvanced">
              <i :class="showAdvanced ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'"></i>
              <span class="btn-text">{{ showAdvanced ? $t('input.supplier.info.hideAdvanced') : $t('input.supplier.info.showAdvanced') }}</span>
            </el-button>
          </div>
        </div>

        <!-- 高级筛选 -->
        <transition name="slide-fade">
          <div v-show="showAdvanced" class="advanced-filters">
            <el-row :gutter="16">
              <el-col :xs="24" :sm="12" :md="8" :lg="6">
                <div class="filter-item">
                  <label class="filter-label">{{ $t('input.supplier.info.filter.status') }}</label>
                  <el-select
                    v-model="searchFilters.status"
                    :placeholder="$t('input.supplier.info.filter.allStatus')"
                    clearable
                    style="width: 100%"
                  >
                    <el-option :label="$t('input.supplier.info.status.pending')" :value="1" />
                    <el-option :label="$t('input.supplier.info.status.approved')" :value="2" />
                    <el-option :label="$t('input.supplier.info.status.rejected')" :value="0" />
                  </el-select>
                </div>
              </el-col>

              <el-col :xs="24" :sm="12" :md="8" :lg="6">
                <div class="filter-item">
                  <label class="filter-label">{{ $t('input.supplier.info.filter.adCode') }}</label>
                  <el-cascader
                    v-model="searchFilters.adCodePath"
                    :options="adCodeOptions"
                    :placeholder="$t('input.supplier.info.filter.allRegion')"
                    :props="{ checkStrictly: true, emitPath: false }"
                    filterable
                    clearable
                    style="width: 100%"
                    @change="handleAdCodeChange"
                  />
                </div>
              </el-col>

              <el-col :xs="24" :sm="12" :md="8" :lg="6">
                <div class="filter-item">
                  <label class="filter-label">{{ $t('input.supplier.info.filter.applyTime') }}</label>
                  <el-date-picker
                    v-model="applyTimeRange"
                    type="daterange"
                    :start-placeholder="$t('common.startDate')"
                    :end-placeholder="$t('common.endDate')"
                    value-format="YYYY-MM-DD"
                    style="width: 100%"
                  />
                </div>
              </el-col>

              <el-col :xs="24" :sm="12" :md="8" :lg="6">
                <div class="filter-item">
                  <label class="filter-label">{{ $t('input.supplier.info.filter.approveTime') }}</label>
                  <el-date-picker
                    v-model="approveTimeRange"
                    type="daterange"
                    :start-placeholder="$t('common.startDate')"
                    :end-placeholder="$t('common.endDate')"
                    value-format="YYYY-MM-DD"
                    style="width: 100%"
                  />
                </div>
              </el-col>
            </el-row>

            <div class="filter-actions">
              <el-button type="primary" @click="handleSearch">
                <i class="ri-check-line"></i>
                {{ $t('input.supplier.info.applyFilters') }}
              </el-button>
              <el-button @click="handleResetFilters">
                <i class="ri-close-line"></i>
                {{ $t('input.supplier.info.resetFilters') }}
              </el-button>
            </div>
          </div>
        </transition>
      </div>

      <!-- PC端：数据表格 -->
      <div class="table-card pc-view">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
          class="supplier-info-table"
        >
          <el-table-column prop="org_name" :label="$t('input.supplier.info.columns.orgName')" min-width="200" show-overflow-tooltip />
          <el-table-column prop="credit_code" :label="$t('input.supplier.info.columns.creditCode')" min-width="180" show-overflow-tooltip />
          <el-table-column prop="legal_person" :label="$t('input.supplier.info.columns.legalPerson')" min-width="120" show-overflow-tooltip />
          <el-table-column prop="contact_name" :label="$t('input.supplier.info.columns.contactName')" min-width="120" show-overflow-tooltip />
          <el-table-column prop="contact_phone" :label="$t('input.supplier.info.columns.contactPhone')" min-width="140" />
          <el-table-column prop="ad_code" :label="$t('input.supplier.info.columns.adCode')" min-width="140" show-overflow-tooltip />
          <el-table-column
            prop="status"
            :label="$t('input.supplier.info.columns.status')"
            min-width="160"
            align="center"
            header-align="center"
            class-name="status-column"
          >
            <template #default="{ row }">
              <el-tag class="status-tag" :type="getStatusTag(row.status)" size="small">{{ getStatusText(row.status) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('input.supplier.info.columns.actions')" min-width="160" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleView(row)">
                <i class="ri-eye-line"></i> {{ $t('input.supplier.info.actions.view') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-wrapper">
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

      <!-- 移动端：卡片列表 -->
      <div class="mobile-view" v-loading="loading">
        <div class="card-list">
          <div v-for="item in tableData" :key="item.cert_id" class="supplier-card" @click="handleView(item)">
            <div class="card-header">
              <el-tag :type="getStatusTag(item.status)" size="small">{{ getStatusText(item.status) }}</el-tag>
            </div>
            <h3 class="card-title">{{ item.org_name }}</h3>
            <div class="card-info">
              <div class="info-item">
                <span class="info-label">{{ $t('input.supplier.info.columns.creditCode') }}</span>
                <span class="info-value">{{ item.credit_code }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">{{ $t('input.supplier.info.columns.legalPerson') }}</span>
                <span class="info-value">{{ item.legal_person }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">{{ $t('input.supplier.info.columns.contactName') }}</span>
                <span class="info-value">{{ item.contact_name }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">{{ $t('input.supplier.info.columns.contactPhone') }}</span>
                <span class="info-value">{{ item.contact_phone }}</span>
              </div>
            </div>
            <div class="card-footer">
              <span class="apply-time">{{ item.apply_time }}</span>
              <div class="card-action">
                <el-icon><i class="ri-eye-line"></i></el-icon>
              </div>
            </div>
          </div>
        </div>

        <div v-if="tableData.length === 0 && !loading" class="empty-state">
          <i class="ri-inbox-line"></i>
          <p>{{ $t('home.noData') }}</p>
        </div>

        <div class="mobile-pagination">
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

    <!-- 详情对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="$t('input.supplier.info.detail')"
      :width="isMobile ? '100%' : '800px'"
      :fullscreen="isMobile"
      :close-on-click-modal="false"
    >
      <div v-if="currentRow" class="dialog-content">
        <!-- 企业信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-building-line"></i>
            {{ $t('research.enterprise.form.identityInfo') }}
          </div>
          <el-descriptions :column="isMobile ? 1 : 2" border>
            <el-descriptions-item :label="$t('input.supplier.auth.form.orgName')">{{ currentRow.org_name }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.auth.form.creditCode')">{{ currentRow.credit_code }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.auth.form.legalPerson')">{{ currentRow.legal_person }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.auth.form.legalId')">{{ currentRow.legal_id }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.auth.form.adCode')">{{ currentRow.ad_code }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.info.columns.status')">
              <el-tag :type="getStatusTag(currentRow.status)" size="small">{{ getStatusText(currentRow.status) }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.auth.form.businessScope')" :span="isMobile ? 1 : 2">{{ currentRow.business_scope }}</el-descriptions-item>
          </el-descriptions>
        </div>

        <!-- 联系信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-contacts-line"></i>
            {{ $t('identity.form.contactName') }}
          </div>
          <el-descriptions :column="isMobile ? 1 : 2" border>
            <el-descriptions-item :label="$t('input.supplier.auth.form.contactName')">{{ currentRow.contact_name }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.auth.form.contactPhone')">{{ currentRow.contact_phone }}</el-descriptions-item>
          </el-descriptions>
        </div>

        <!-- 认证信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-file-text-line"></i>
            {{ $t('input.supplier.approval.form.certInfo') }}
          </div>
          <el-descriptions :column="isMobile ? 1 : 2" border>
            <el-descriptions-item :label="$t('input.supplier.info.columns.applyTime')">{{ currentRow.apply_time }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.info.columns.approveTime')">{{ currentRow.approve_time || '-' }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.auth.form.licensePath')" :span="isMobile ? 1 : 2">
              <el-link v-if="licensePreviewUrl" :href="licensePreviewUrl" target="_blank" type="primary">
                <i class="ri-file-line"></i> {{ $t('common.viewDetails') }}
              </el-link>
              <span v-else-if="currentRow.license_path">{{ currentRow.license_path }}</span>
              <span v-else>-</span>
            </el-descriptions-item>
            <el-descriptions-item v-if="currentRow.audit_opinion" :label="$t('input.supplier.approval.form.auditOpinion')" :span="isMobile ? 1 : 2">
              {{ currentRow.audit_opinion }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>

      <template #footer>
        <el-button @click="dialogVisible = false">{{ $t('common.close') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getSupplierCertList, getAdCodeList } from '@/api/supplier'
import { getFilePreviewUrl } from '@/api/file'

const router = useRouter()
const { t } = useI18n()

const showAdvanced = ref(false)
const loading = ref(false)
const tableData = ref([])
const dialogVisible = ref(false)
const currentRow = ref(null)
const licensePreviewUrl = ref('')

// 检测是否为移动端
const isMobile = ref(window.innerWidth <= 768)
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth <= 768
})

// 行政区划选项
const adCodeOptions = ref([])

// 搜索筛选条件
const searchFilters = reactive({
  keyword: '',
  status: '',
  adCode: '',
  adCodePath: null
})

// 时间范围
const applyTimeRange = ref([])
const approveTimeRange = ref([])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

// 获取状态标签类型
const getStatusTag = (status) => {
  const map = { 0: 'danger', 1: 'warning', 2: 'success' }
  return map[status] || ''
}

// 获取状态文本
const getStatusText = (status) => {
  const map = { 0: 'rejected', 1: 'pending', 2: 'approved' }
  return t(`input.supplier.info.status.${map[status]}`)
}

// 加载行政区划数据
const loadAdCodeList = async () => {
  try {
    const res = await getAdCodeList()
    if (res.code === 200 && res.data) {
      adCodeOptions.value = res.data
    }
  } catch (error) {
    console.error('Failed to load ad code list:', error)
  }
}

// 处理行政区划选择变化
const handleAdCodeChange = (value) => {
  searchFilters.adCode = value || ''
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.page,
      pageSize: pagination.pageSize
    }

    // 添加筛选条件
    if (searchFilters.keyword) params.keyword = searchFilters.keyword
    if (searchFilters.status !== '' && searchFilters.status !== null && searchFilters.status !== undefined) {
      params.status = searchFilters.status
    }
    if (searchFilters.adCode) params.adCode = searchFilters.adCode

    // 添加时间范围筛选
    if (applyTimeRange.value && applyTimeRange.value.length === 2) {
      params.applyTimeStart = applyTimeRange.value[0]
      params.applyTimeEnd = applyTimeRange.value[1]
    }
    if (approveTimeRange.value && approveTimeRange.value.length === 2) {
      params.approveTimeStart = approveTimeRange.value[0]
      params.approveTimeEnd = approveTimeRange.value[1]
    }

    const res = await getSupplierCertList(params)
    if (res.code === 200) {
      tableData.value = res.data.list || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.page = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchFilters.keyword = ''
  searchFilters.status = ''
  searchFilters.adCode = ''
  searchFilters.adCodePath = null
  applyTimeRange.value = []
  approveTimeRange.value = []
  pagination.page = 1
  loadData()
}

// 重置高级筛选
const handleResetFilters = () => {
  searchFilters.status = ''
  searchFilters.adCode = ''
  searchFilters.adCodePath = null
  applyTimeRange.value = []
  approveTimeRange.value = []
}

// 获取文件预览URL
const loadLicensePreview = async (licensePath) => {
  if (!licensePath) {
    licensePreviewUrl.value = ''
    return
  }

  try {
    const res = await getFilePreviewUrl(licensePath)
    licensePreviewUrl.value = res.code === 200 ? res.msg : ''
  } catch (error) {
    console.error('Failed to load license preview:', error)
    licensePreviewUrl.value = ''
  }
}

// 查看详情
const handleView = async (row) => {
  currentRow.value = { ...row }
  dialogVisible.value = true

  // 加载文件预览
  await loadLicensePreview(row.license_path)
}

const handleSizeChange = () => {
  pagination.page = 1
  loadData()
}

const handlePageChange = () => {
  loadData()
}

onMounted(() => {
  loadAdCodeList()
  loadData()
})
</script>

<style scoped>
:deep(.supplier-info-table .status-column .cell) {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  white-space: nowrap;
}

:deep(.supplier-info-table .status-tag) {
  display: inline-flex;
  align-items: center;
  max-width: none;
  white-space: nowrap;
}
.supplier-info-container {
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

/* 搜索栏 */
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

/* 高级筛选 */
.advanced-filters {
  margin-top: 16px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.filter-item {
  margin-bottom: 16px;
}

.filter-label {
  display: block;
  font-size: 14px;
  color: #606266;
  margin-bottom: 8px;
  font-weight: 500;
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #e9ecef;
}

/* 高级筛选动画 */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* PC端表格 */
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

.pc-view {
  display: block;
}

.mobile-view {
  display: none;
}

/* 移动端卡片 */
.card-list {
  display: grid;
  gap: 16px;
}

.supplier-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.supplier-card:hover {
  box-shadow: 0 4px 16px rgba(0, 154, 68, 0.15);
  border-color: #009A44;
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  gap: 8px;
  margin-bottom: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.info-label {
  color: #909399;
  flex-shrink: 0;
}

.info-value {
  color: #606266;
  text-align: right;
  word-break: break-all;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.apply-time {
  font-size: 12px;
  color: #909399;
}

.card-action {
  color: #009A44;
  font-size: 18px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #909399;
}

.empty-state i {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  font-size: 14px;
  margin: 0;
}

.mobile-pagination {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

/* 对话框内容 */
.dialog-content {
  max-height: 60vh;
  overflow-y: auto;
}

.detail-section {
  margin-bottom: 24px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 18px;
  color: #009A44;
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .page-header {
    margin: -16px -16px 16px -16px;
    padding: 20px 0;
  }

  .header-content {
    padding: 0 16px;
  }
}

@media screen and (max-width: 768px) {
  .pc-view {
    display: none;
  }

  .mobile-view {
    display: block;
  }

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
    border-radius: 10px;
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

  .search-bar {
    padding: 12px;
  }

  .action-row {
    flex-direction: column;
    align-items: stretch;
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

  .advanced-filters {
    padding: 16px 12px;
  }

  .filter-actions {
    flex-direction: column;
  }

  .filter-actions .el-button {
    width: 100%;
  }
}
</style>
