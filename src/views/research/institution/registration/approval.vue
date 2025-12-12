<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-file-check-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('registration.approval.title') }}</h1>
            <p class="page-subtitle">{{ $t('registration.approval.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-line"></i>
              <span>{{ $t('registration.approval.list') }}</span>
            </div>
          </div>

          <div class="card-body">
            <!-- 搜索区域 -->
            <div class="search-section">
              <el-input
                v-model="searchForm.enterpriseName"
                :placeholder="$t('registration.approval.searchPlaceholder')"
                clearable
                class="search-input"
              >
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>

              <el-select
                v-model="searchForm.orgType"
                :placeholder="$t('registration.approval.filterByOrgType')"
                clearable
                class="search-input"
              >
                <el-option value="" :label="$t('registration.application.allOrgTypes')"></el-option>
                <el-option value="union" :label="$t('registration.application.orgType.union')"></el-option>
                <el-option value="cooperative" :label="$t('registration.application.orgType.cooperative')"></el-option>
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
                  prop="enterpriseName"
                  :label="$t('registration.application.columns.enterpriseName')"
                  min-width="200"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="orgType"
                  :label="$t('registration.application.columns.orgType')"
                  min-width="150"
                >
                  <template #default="{ row }">
                    <el-tag :type="row.orgType === 'union' ? 'success' : 'info'">
                      {{ $t(`registration.application.orgType.${row.orgType}`) }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="inputTypes"
                  :label="$t('registration.application.columns.inputTypes')"
                  min-width="150"
                >
                  <template #default="{ row }">
                    {{ formatInputTypes(row.inputTypes) }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="seedEnterpriseLicenseNumber"
                  :label="$t('registration.application.columns.seedEnterpriseLicenseNumber')"
                  min-width="180"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="zone"
                  :label="$t('registration.application.columns.zone')"
                  min-width="120"
                />
                <el-table-column
                  prop="woreda"
                  :label="$t('registration.application.columns.woreda')"
                  min-width="120"
                />
                <el-table-column
                  prop="createdTime"
                  :label="$t('registration.application.columns.createdTime')"
                  min-width="160"
                />
                <el-table-column :label="$t('common.actions')" fixed="right" width="220">
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button link type="primary" @click="handleView(row)">
                        <i class="ri-eye-line"></i>
                        {{ $t('common.view') }}
                      </el-button>
                      <el-button link type="success" @click="handleApprove(row)">
                        <i class="ri-check-line"></i>
                        {{ $t('registration.approval.approve') }}
                      </el-button>
                      <el-button link type="danger" @click="handleReject(row)">
                        <i class="ri-close-line"></i>
                        {{ $t('registration.approval.reject') }}
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
                    <i class="ri-building-line"></i>
                    <span>{{ item.enterpriseName }}</span>
                  </div>
                  <el-tag :type="item.orgType === 'union' ? 'success' : 'info'" size="small">
                    {{ $t(`registration.application.orgType.${item.orgType}`) }}
                  </el-tag>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('registration.application.columns.inputTypes') }}:</span>
                    <span class="value">{{ formatInputTypes(item.inputTypes) }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('registration.application.columns.seedEnterpriseLicenseNumber') }}:</span>
                    <span class="value">{{ item.seedEnterpriseLicenseNumber }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('registration.application.columns.zone') }}:</span>
                    <span class="value">{{ item.zone || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('registration.application.columns.woreda') }}:</span>
                    <span class="value">{{ item.woreda }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('registration.application.columns.createdTime') }}:</span>
                    <span class="value">{{ item.createdTime }}</span>
                  </div>
                </div>
                <div class="mobile-card-actions">
                  <el-button type="primary" size="small" @click="handleView(item)">
                    {{ $t('common.view') }}
                  </el-button>
                  <el-button type="success" size="small" @click="handleApprove(item)">
                    {{ $t('registration.approval.approve') }}
                  </el-button>
                  <el-button type="danger" size="small" @click="handleReject(item)">
                    {{ $t('registration.approval.reject') }}
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
            <el-empty v-if="tableData.length === 0 && !loading" :description="$t('registration.application.messages.noData')" />
          </div>
        </div>
      </div>
    </div>

    <!-- 审核对话框 -->
    <el-dialog
      v-model="auditDialogVisible"
      :title="auditType === 'approve' ? $t('registration.approval.approve') : $t('registration.approval.reject')"
      width="600px"
    >
      <el-form ref="auditFormRef" :model="auditForm" :rules="auditRules" label-width="120px">
        <el-form-item :label="$t('registration.approval.form.auditOpinion')" prop="auditOpinion">
          <el-input
            v-model="auditForm.auditOpinion"
            type="textarea"
            :rows="4"
            :placeholder="$t('registration.approval.placeholder.auditOpinion')"
            maxlength="1000"
            show-word-limit
          />
        </el-form-item>
        <el-form-item :label="$t('registration.approval.form.remark')" prop="remark">
          <el-input
            v-model="auditForm.remark"
            type="textarea"
            :rows="3"
            :placeholder="$t('registration.approval.placeholder.remark')"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="auditDialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" :loading="submitting" @click="handleAuditSubmit">
          {{ $t('common.confirm') }}
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
import { getRegistrationAuditPage, approveRegistration, rejectRegistration } from '@/api/registration'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const submitting = ref(false)
const tableData = ref([])
const auditDialogVisible = ref(false)
const auditFormRef = ref(null)
const auditType = ref('approve')
const currentRow = ref(null)

const searchForm = reactive({
  enterpriseName: '',
  orgType: ''
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

const auditForm = reactive({
  auditOpinion: '',
  remark: ''
})

// 审核表单验证规则
const auditRules = computed(() => ({
  auditOpinion: auditType.value === 'reject' ? [
    { required: true, message: t('registration.approval.rules.auditOpinionRequired'), trigger: 'blur' }
  ] : []
}))

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: pagination.currentPage,
      pageSize: pagination.pageSize,
      enterpriseName: searchForm.enterpriseName || undefined,
      orgType: searchForm.orgType || undefined
    }

    const res = await getRegistrationAuditPage(params)
    if (res.code === 200) {
      tableData.value = res.data?.records || []
      pagination.total = res.data?.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
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
  searchForm.enterpriseName = ''
  searchForm.orgType = ''
  handleSearch()
}

// 查看
const handleView = (row) => {
  router.push({ name: 'RegistrationDetail', params: { id: row.id } })
}

// 通过
const handleApprove = async (row) => {
  currentRow.value = row
  auditType.value = 'approve'
  auditForm.auditOpinion = ''
  auditForm.remark = ''
  auditDialogVisible.value = true
}

// 驳回
const handleReject = (row) => {
  currentRow.value = row
  auditType.value = 'reject'
  auditForm.auditOpinion = ''
  auditForm.remark = ''
  auditDialogVisible.value = true
}

// 提交审核
const handleAuditSubmit = async () => {
  try {
    const valid = await auditFormRef.value.validate()
    if (!valid) return

    const confirmMsg = auditType.value === 'approve'
      ? t('registration.approval.messages.approveConfirm')
      : t('registration.approval.messages.rejectConfirm')

    await ElMessageBox.confirm(confirmMsg, t('common.warning'), {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    })

    submitting.value = true

    const res = auditType.value === 'approve'
      ? await approveRegistration(currentRow.value.id, currentRow.value.version, auditForm.remark)
      : await rejectRegistration(currentRow.value.id, currentRow.value.version, auditForm.auditOpinion, auditForm.remark)

    if (res.code === 200) {
      ElMessage.success(
        auditType.value === 'approve'
          ? t('registration.approval.approveSuccess')
          : t('registration.approval.rejectSuccess')
      )
      auditDialogVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.msg || t('common.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel' && error !== false) {
      console.error('Failed to audit:', error)
      ElMessage.error(t('common.operationFailed'))
    }
  } finally {
    submitting.value = false
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

// 格式化投入品类型
const formatInputTypes = (types) => {
  if (!types) return '-'
  const typeArray = typeof types === 'string' ? types.split(',') : types
  return typeArray.map(type => t(`registration.application.inputType.${type}`)).join(', ')
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
  max-width: 300px;
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
  align-items: center;
  gap: 8px;
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
  min-width: calc(33.33% - 6px);
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
  }

  .card-body {
    padding: 16px;
  }

  .search-section {
    flex-direction: column;
  }

  .search-input {
    width: 100%;
    max-width: 100%;
  }

  .pc-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }

  :deep(.el-dialog) {
    width: 90% !important;
  }
}
</style>
