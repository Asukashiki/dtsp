<template>
  <div class="supplier-approval-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <i class="ri-shield-check-line header-icon"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">{{ $t('input.supplier.approval.title') }}</h1>
          <p class="page-subtitle">{{ $t('input.supplier.approval.subtitle') }}</p>
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
            :placeholder="$t('input.supplier.approval.searchPlaceholder')"
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
              <span class="btn-text">{{ showAdvanced ? $t('input.supplier.approval.hideAdvanced') : $t('input.supplier.approval.showAdvanced') }}</span>
            </el-button>
          </div>
        </div>

        <!-- 高级筛选 -->
        <transition name="slide-fade">
          <div v-show="showAdvanced" class="advanced-filters">
            <el-row :gutter="16">
              <el-col :xs="24" :sm="12" :md="8" :lg="6">
                <div class="filter-item">
                  <label class="filter-label">{{ $t('input.supplier.approval.filter.status') }}</label>
                  <el-select
                    v-model="searchFilters.status"
                    :placeholder="$t('input.supplier.approval.filter.allStatus')"
                    clearable
                    style="width: 100%"
                  >
                    <el-option :label="$t('input.supplier.approval.status.pending')" :value="1" />
                    <el-option :label="$t('input.supplier.approval.status.approved')" :value="2" />
                    <el-option :label="$t('input.supplier.approval.status.rejected')" :value="0" />
                  </el-select>
                </div>
              </el-col>

              <el-col :xs="24" :sm="12" :md="8" :lg="6">
                <div class="filter-item">
                  <label class="filter-label">{{ $t('input.supplier.approval.filter.adCode') }}</label>
                  <el-select
                    v-model="searchFilters.adCode"
                    :placeholder="$t('input.supplier.approval.filter.allRegion')"
                    filterable
                    clearable
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in adCodeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
              </el-col>

              <el-col :xs="24" :sm="12" :md="8" :lg="6">
                <div class="filter-item">
                  <label class="filter-label">{{ $t('input.supplier.approval.filter.applyTime') }}</label>
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
                  <label class="filter-label">{{ $t('input.supplier.approval.filter.approveTime') }}</label>
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
                {{ $t('input.supplier.approval.applyFilters') }}
              </el-button>
              <el-button @click="handleResetFilters">
                <i class="ri-close-line"></i>
                {{ $t('input.supplier.approval.resetFilters') }}
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
        >
          <el-table-column prop="org_name" :label="$t('input.supplier.approval.columns.orgName')" min-width="200" show-overflow-tooltip />
          <el-table-column prop="credit_code" :label="$t('input.supplier.approval.columns.creditCode')" min-width="180" show-overflow-tooltip />
          <el-table-column prop="legal_person" :label="$t('input.supplier.approval.columns.legalPerson')" min-width="120" show-overflow-tooltip />
          <el-table-column prop="contact_name" :label="$t('input.supplier.approval.columns.contactName')" min-width="120" show-overflow-tooltip />
          <el-table-column prop="contact_phone" :label="$t('input.supplier.approval.columns.contactPhone')" min-width="140" />
          <el-table-column prop="apply_time" :label="$t('input.supplier.approval.columns.applyTime')" min-width="180" />
          <el-table-column prop="status" :label="$t('input.supplier.approval.columns.status')" min-width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="getStatusTag(row.status)" size="small">{{ getStatusText(row.status) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('input.supplier.approval.columns.actions')" min-width="140" fixed="right">
            <template #default="{ row }">
              <el-button v-if="row.status === 1" link type="primary" @click="handleAudit(row)">
                <i class="ri-shield-check-line"></i> {{ $t('input.supplier.approval.actions.audit') }}
              </el-button>
              <el-button v-else link type="primary" @click="handleView(row)">
                <i class="ri-eye-line"></i> {{ $t('input.supplier.approval.actions.view') }}
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
          <div v-for="item in tableData" :key="item.cert_id" class="approval-card" @click="item.status === 1 ? handleAudit(item) : handleView(item)">
            <div class="card-header">
              <el-tag :type="getStatusTag(item.status)" size="small">{{ getStatusText(item.status) }}</el-tag>
            </div>
            <h3 class="card-title">{{ item.org_name }}</h3>
            <div class="card-info">
              <div class="info-item">
                <span class="info-label">{{ $t('input.supplier.approval.columns.creditCode') }}</span>
                <span class="info-value">{{ item.credit_code }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">{{ $t('input.supplier.approval.columns.legalPerson') }}</span>
                <span class="info-value">{{ item.legal_person }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">{{ $t('input.supplier.approval.columns.contactName') }}</span>
                <span class="info-value">{{ item.contact_name }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">{{ $t('input.supplier.approval.columns.contactPhone') }}</span>
                <span class="info-value">{{ item.contact_phone }}</span>
              </div>
            </div>
            <div class="card-footer">
              <span class="apply-time">{{ item.apply_time }}</span>
              <div class="card-action">
                <el-icon v-if="item.status === 1" color="#009A44"><i class="ri-shield-check-line"></i></el-icon>
                <el-icon v-else><i class="ri-eye-line"></i></el-icon>
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

    <!-- 审核详情对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentRow?.status === 1 ? $t('input.supplier.approval.detail') : $t('common.viewDetails')"
      :width="isMobile ? '100%' : '800px'"
      :fullscreen="isMobile"
      :close-on-click-modal="false"
    >
      <div v-if="currentRow" class="dialog-content">
        <!-- 申请人信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('input.supplier.approval.form.applicantInfo') }}
          </div>
          <el-descriptions :column="isMobile ? 1 : 2" border>
            <el-descriptions-item :label="$t('input.supplier.auth.form.orgName')">{{ currentRow.org_name }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.auth.form.creditCode')">{{ currentRow.credit_code }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.auth.form.legalPerson')">{{ currentRow.legal_person }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.auth.form.legalId')">{{ currentRow.legal_id }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.auth.form.adCode')">{{ currentRow.ad_code }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.approval.columns.applyTime')">{{ currentRow.apply_time }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.auth.form.businessScope')" :span="isMobile ? 1 : 2">{{ currentRow.business_scope }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.auth.form.contactName')">{{ currentRow.contact_name }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.auth.form.contactPhone')">{{ currentRow.contact_phone }}</el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.auth.form.licensePath')" :span="isMobile ? 1 : 2">
              <el-link v-if="currentRow.license_path" :href="currentRow.license_path" target="_blank" type="primary">
                <i class="ri-file-line"></i> {{ $t('common.viewDetails') }}
              </el-link>
            </el-descriptions-item>
          </el-descriptions>
        </div>

        <!-- 审核操作 -->
        <div v-if="currentRow.status === 1" class="detail-section">
          <div class="section-title">
            <i class="ri-check-line"></i>
            {{ $t('input.supplier.approval.form.auditInfo') }}
          </div>
          <el-form
            ref="auditFormRef"
            :model="auditForm"
            :rules="auditRules"
            label-width="120px"
          >
            <el-form-item :label="$t('input.supplier.approval.form.auditResult')" prop="auditResult">
              <el-radio-group v-model="auditForm.auditResult">
                <el-radio :value="1">{{ $t('input.supplier.approval.form.pass') }}</el-radio>
                <el-radio :value="0">{{ $t('input.supplier.approval.form.reject') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('input.supplier.approval.form.auditOpinion')" prop="auditOpinion">
              <el-input
                v-model="auditForm.auditOpinion"
                type="textarea"
                :placeholder="$t('input.supplier.approval.placeholder.auditOpinion')"
                :rows="4"
                maxlength="255"
                show-word-limit
              />
            </el-form-item>
          </el-form>
        </div>

        <!-- 已审核信息 -->
        <div v-else class="detail-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('input.supplier.approval.form.auditInfo') }}
          </div>
          <el-descriptions :column="1" border>
            <el-descriptions-item :label="$t('input.supplier.approval.columns.status')">
              <el-tag :type="getStatusTag(currentRow.status)" size="small">{{ getStatusText(currentRow.status) }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('input.supplier.approval.form.auditOpinion')">{{ currentRow.audit_opinion || '-' }}</el-descriptions-item>
            <el-descriptions-item :label="$t('identity.form.auditResult')">{{ currentRow.reject_reason || '-' }}</el-descriptions-item>
            <el-descriptions-item :label="$t('research.audit.columns.auditor')">{{ currentRow.approver_id }}</el-descriptions-item>
            <el-descriptions-item :label="$t('research.audit.form.auditTime')">{{ currentRow.approve_time || '-' }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>

      <template #footer v-if="currentRow?.status === 1">
        <el-button @click="dialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmitAudit">
          {{ $t('input.supplier.approval.actions.submit') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getSupplierCertList, approveSupplierCert, getAdCodeList } from '@/api/supplier'
import { useUserStore } from '@/store'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const showAdvanced = ref(false)
const loading = ref(false)
const tableData = ref([])
const dialogVisible = ref(false)
const currentRow = ref(null)
const auditFormRef = ref(null)
const submitting = ref(false)

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
  adCode: ''
})

// 时间范围
const applyTimeRange = ref([])
const approveTimeRange = ref([])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const auditForm = reactive({
  auditResult: 1,
  auditOpinion: ''
})

const auditRules = computed(() => ({
  auditResult: [
    { required: true, message: t('input.supplier.approval.rules.auditResultRequired'), trigger: 'change' }
  ],
  auditOpinion: [
    { required: true, message: t('input.supplier.approval.rules.auditOpinionRequired'), trigger: 'blur' }
  ]
}))

// 获取状态标签类型
const getStatusTag = (status) => {
  const map = { 0: 'danger', 1: 'warning', 2: 'success' }
  return map[status] || ''
}

// 获取状态文本
const getStatusText = (status) => {
  const map = { 0: 'rejected', 1: 'pending', 2: 'approved' }
  return t(`input.supplier.approval.status.${map[status]}`)
}

// 加载行政区划数据
const loadAdCodeList = async () => {
  try {
    const res = await getAdCodeList()
    if (res.code === 200 && res.data) {
      adCodeOptions.value = res.data.map(item => ({
        value: item.code,
        label: `${item.name} (${item.code})`
      }))
    }
  } catch (error) {
    console.error('Failed to load ad code list:', error)
  }
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

    // 添加时间范围筛选（添加时分秒）
    if (applyTimeRange.value && applyTimeRange.value.length === 2) {
      params.applyTimeStart = `${applyTimeRange.value[0]} 00:00:00`
      params.applyTimeEnd = `${applyTimeRange.value[1]} 23:59:59`
    }
    if (approveTimeRange.value && approveTimeRange.value.length === 2) {
      params.approveTimeStart = `${approveTimeRange.value[0]} 00:00:00`
      params.approveTimeEnd = `${approveTimeRange.value[1]} 23:59:59`
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
  applyTimeRange.value = []
  approveTimeRange.value = []
  pagination.page = 1
  loadData()
}

// 重置高级筛选
const handleResetFilters = () => {
  searchFilters.status = ''
  searchFilters.adCode = ''
  applyTimeRange.value = []
  approveTimeRange.value = []
}

// 审核
const handleAudit = (row) => {
  currentRow.value = { ...row }
  auditForm.auditResult = 1
  auditForm.auditOpinion = ''
  dialogVisible.value = true
}

// 查看
const handleView = (row) => {
  currentRow.value = { ...row }
  dialogVisible.value = true
}

// 提交审核
const handleSubmitAudit = async () => {
  if (!auditFormRef.value) return

  try {
    await auditFormRef.value.validate()

    await ElMessageBox.confirm(
      t('input.supplier.approval.messages.confirmSubmit'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    submitting.value = true

    const res = await approveSupplierCert(currentRow.value.cert_id, {
      approverId: userStore.userInfo?.userId || 0,
      auditResult: auditForm.auditResult,
      auditOpinion: auditForm.auditOpinion
    })

    if (res.code === 200) {
      ElMessage.success(
        auditForm.auditResult === 1
          ? t('input.supplier.approval.approveSuccess')
          : t('input.supplier.approval.rejectSuccess')
      )
      dialogVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Audit failed:', error)
    }
  } finally {
    submitting.value = false
  }
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
.supplier-approval-container {
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

/* 移动端默认隐藏 */
.mobile-view {
  display: none;
}

/* 移动端卡片样式 */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.approval-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.approval-card:active {
  transform: scale(0.98);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 12px 0;
  line-height: 1.4;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.apply-time {
  font-size: 12px;
  color: #909399;
}

.card-action {
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #009A44;
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

/* 对话框 */
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
  padding-bottom: 8px;
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

  .action-row {
    flex-direction: column;
    align-items: stretch;
  }

  .action-left {
    justify-content: stretch;
  }

  .action-left .el-button {
    flex: 1;
  }

  .pc-view {
    display: none;
  }

  .mobile-view {
    display: block;
  }
}
</style>
