<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-task-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('input.menu.DistrictAudit') }}</h1>
            <p class="page-subtitle">{{ $t('districtDemandAudit.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-list-check"></i>
              <span>{{ $t(activeTab === 'pending' ? 'districtDemandAudit.list' : 'districtDemandAudit.summary.list') }}</span>
            </div>
            <div class="header-actions">
              <el-button
                type="primary"
                @click="handleBatchApprove"
                :disabled="selectedRows.length === 0"
                v-if="activeTab === 'pending'"
              >
                <i class="ri-check-line"></i>
                {{ $t('districtDemandAudit.actions.batchApprove') }}
              </el-button>
              <el-button
                type="danger"
                @click="handleBatchReject"
                :disabled="selectedRows.length === 0"
                v-if="activeTab === 'pending'"
              >
                <i class="ri-close-line"></i>
                {{ $t('districtDemandAudit.actions.batchReject') }}
              </el-button>
              <el-button
                type="primary"
                @click="handleSummarySubmit"
                v-if="activeTab === 'summary'"
              >
                <i class="ri-upload-cloud-line"></i>
                {{ $t('districtDemandAudit.actions.summarySubmit') }}
              </el-button>
            </div>
          </div>

          <div class="card-body">
            <el-tabs v-model="activeTab">
              <el-tab-pane :label="$t('districtDemandAudit.tabs.pending')" name="pending" />
              <el-tab-pane :label="$t('districtDemandAudit.tabs.summary')" name="summary" />
            </el-tabs>

            <div v-if="activeTab === 'pending'">
              <!-- 搜索区域 -->
              <div class="search-section">
                <el-input
                  v-model="searchForm.keyword"
                  :placeholder="$t('districtDemandAudit.searchPlaceholder')"
                  clearable
                  class="search-input"
                >
                  <template #prefix>
                    <i class="ri-search-line"></i>
                  </template>
                </el-input>

                <el-button type="primary" @click="handleSearch">
                  <i class="ri-search-line"></i>
                  {{ $t('common.search') }}
                </el-button>
                <el-button @click="handleReset" style="margin-left: 0px;">
                  <i class="ri-refresh-line"></i>
                  {{ $t('common.reset') }}
                </el-button>
              </div>

              <!-- PC端表格 -->
              <div class="table-wrapper pc-only">
                <el-table
                  v-loading="loading"
                  :data="tableData"
                  stripe
                  @selection-change="handleSelectionChange"
                  empty-text=""
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column
                    prop="source"
                    :label="$t('districtDemandAudit.columns.source')"
                    min-width="140"
                  />
                  <el-table-column
                    prop="inputCategory"
                    :label="$t('districtDemandAudit.columns.inputCategory')"
                    min-width="140"
                  />
                  <el-table-column
                    prop="inputType"
                    :label="$t('districtDemandAudit.columns.inputType')"
                    min-width="160"
                  />
                  <el-table-column
                    prop="totalQuantity"
                    :label="$t('districtDemandAudit.columns.totalQuantity')"
                    min-width="140"
                  />
                  <el-table-column :label="$t('common.actions')" fixed="right" width="280">
                    <template #default="{ row }">
                      <div class="action-buttons">
                        <el-button link type="primary" @click="handleView(row)">
                          <i class="ri-eye-line"></i>
                          {{ $t('common.view') }}
                        </el-button>
                        <el-button link type="success" @click="handleApprove(row)">
                          <i class="ri-check-line"></i>
                          {{ $t('districtDemandAudit.actions.approve') }}
                        </el-button>
                        <el-button link type="danger" @click="handleReject(row)">
                          <i class="ri-close-line"></i>
                          {{ $t('districtDemandAudit.actions.reject') }}
                        </el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <!-- 移动端卡片 -->
              <div class="mobile-cards mobile-only">
                <div v-for="item in tableData" :key="item.id" class="mobile-card">
                  <div class="mobile-card-header">
                    <el-checkbox
                      v-model="item.checked"
                      @change="handleMobileCheck(item)"
                    />
                    <div class="farmer-name">
                      <i class="ri-user-line"></i>
                      <span>{{ item.source }}</span>
                    </div>
                  </div>
                  <div class="mobile-card-body">
                    <div class="mobile-card-row">
                      <span class="label">{{ $t('districtDemandAudit.columns.inputCategory') }}:</span>
                      <span class="value">{{ item.inputCategory }}</span>
                    </div>
                    <div class="mobile-card-row">
                      <span class="label">{{ $t('districtDemandAudit.columns.inputType') }}:</span>
                      <span class="value">{{ item.inputType }}</span>
                    </div>
                    <div class="mobile-card-row">
                      <span class="label">{{ $t('districtDemandAudit.columns.totalQuantity') }}:</span>
                      <span class="value">{{ item.totalQuantity }}</span>
                    </div>
                  </div>
                  <div class="mobile-card-actions">
                    <el-button type="primary" size="small" @click="handleView(item)">
                      {{ $t('common.view') }}
                    </el-button>
                    <el-button type="success" size="small" @click="handleApprove(item)">
                      {{ $t('districtDemandAudit.actions.approve') }}
                    </el-button>
                    <el-button type="danger" size="small" @click="handleReject(item)">
                      {{ $t('districtDemandAudit.actions.reject') }}
                    </el-button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 分页 -->
            <div v-if="activeTab === 'pending' && pagination.total > 0" class="pagination-wrapper">
              <el-pagination
                v-model:current-page="pagination.currentPage"
                v-model:page-size="pagination.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="pagination.total"
                layout="total, sizes, prev, pager, next, jumper"
                background
                small
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>

            <!-- 空状态 -->
            <el-empty
              v-if="activeTab === 'pending' && tableData.length === 0 && !loading"
              :description="$t('districtDemandAudit.messages.noData')"
            />

            <!-- 数据汇聚 Tab 内容 -->
            <div v-if="activeTab === 'summary'">
              <div class="table-wrapper pc-only">
                <el-table :data="summaryData" v-loading="summaryLoading" stripe>
                  <el-table-column
                    prop="inputCategory"
                    :label="$t('districtDemandAudit.summary.inputCategory')"
                    min-width="140"
                  />
                  <el-table-column
                    prop="inputType"
                    :label="$t('districtDemandAudit.summary.inputType')"
                    min-width="160"
                  />
                  <el-table-column
                    prop="totalQuantity"
                    :label="$t('districtDemandAudit.summary.totalQuantity')"
                    min-width="140"
                  />
                </el-table>
              </div>

              <!-- 移动端汇聚卡片 -->
              <div class="mobile-cards mobile-only">
                <div
                  v-for="item in summaryData"
                  :key="item.id || item.inputCategory + '-' + item.inputType"
                  class="mobile-card"
                >
                  <div class="mobile-card-body">
                    <div class="mobile-card-row">
                      <span class="label">{{ $t('districtDemandAudit.summary.inputCategory') }}:</span>
                      <span class="value">{{ item.inputCategory }}</span>
                    </div>
                    <div class="mobile-card-row">
                      <span class="label">{{ $t('districtDemandAudit.summary.inputType') }}:</span>
                      <span class="value">{{ item.inputType }}</span>
                    </div>
                    <div class="mobile-card-row">
                      <span class="label">{{ $t('districtDemandAudit.summary.totalQuantity') }}:</span>
                      <span class="value">{{ item.totalQuantity }}</span>
                    </div>
                  </div>
                </div>
                <el-empty
                  v-if="!summaryLoading && (!summaryData || summaryData.length === 0)"
                  :description="$t('districtDemandAudit.messages.noData')"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 审核通过对话框 -->
    <el-dialog
      v-model="approveDialogVisible"
      :title="$t('districtDemandAudit.approveDialog.title')"
      width="500px"
    >
      <el-form :model="approveForm" label-width="100px">
        <el-form-item :label="$t('districtDemandAudit.approveDialog.remark')">
          <el-input
            v-model="approveForm.remark"
            type="textarea"
            :rows="3"
            :placeholder="$t('districtDemandAudit.approveDialog.remarkPlaceholder')"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="approveDialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="confirmApprove" :loading="submitting">
          {{ $t('common.confirm') }}
        </el-button>
      </template>
    </el-dialog>

    <!-- 审核驳回对话框 -->
    <el-dialog
      v-model="rejectDialogVisible"
      :title="$t('districtDemandAudit.rejectDialog.title')"
      width="500px"
    >
      <el-form :model="rejectForm" :rules="rejectRules" ref="rejectFormRef" label-width="100px">
        <el-form-item :label="$t('districtDemandAudit.rejectDialog.auditOpinion')" prop="auditOpinion">
          <el-input
            v-model="rejectForm.auditOpinion"
            type="textarea"
            :rows="3"
            :placeholder="$t('districtDemandAudit.rejectDialog.auditOpinionPlaceholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('districtDemandAudit.rejectDialog.remark')">
          <el-input
            v-model="rejectForm.remark"
            type="textarea"
            :rows="3"
            :placeholder="$t('districtDemandAudit.rejectDialog.remarkPlaceholder')"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="rejectDialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="danger" @click="confirmReject" :loading="submitting">
          {{ $t('common.confirm') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getPendingDemandPage, approveDemand, rejectDemand, getApprovedDemandSummary } from '@/api/demandAudit'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const submitting = ref(false)
const tableData = ref([])
const selectedRows = ref([])

// Tab
const activeTab = ref('pending')

// 数据汇聚
const summaryLoading = ref(false)
const summaryData = ref([])

// 搜索表单
const searchForm = reactive({
  keyword: '',
})

// 分页
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
})

// 加载待审核数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: pagination.currentPage,
      pageSize: pagination.pageSize,
      keyword: searchForm.keyword || undefined,
      level: 'district',
    }
    const res = await getPendingDemandPage(params)
    if (res.code === 200) {
      tableData.value = (res.data.records || []).map((item) => ({
        ...item,
        checked: false,
      }))
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('districtDemandAudit.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 加载已通过需求汇聚数据
const loadSummary = async () => {
  summaryLoading.value = true
  try {
    const res = await getApprovedDemandSummary({ level: 'district' })
    if (res.code === 200) {
      summaryData.value = res.data || []
    }
  } catch (error) {
    console.error('Failed to load summary:', error)
    ElMessage.error(t('districtDemandAudit.messages.loadFailed'))
  } finally {
    summaryLoading.value = false
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
  pagination.currentPage = 1
  loadData()
}

// 选择变化
const handleSelectionChange = (selection) => {
  selectedRows.value = selection
}

// 移动端复选框变化
const handleMobileCheck = (item) => {
  if (item.checked) {
    if (!selectedRows.value.find((row) => row.id === item.id)) {
      selectedRows.value.push(item)
    }
  } else {
    selectedRows.value = selectedRows.value.filter((row) => row.id !== item.id)
  }
}

// 查看详情
const handleView = (row) => {
  router.push({ name: 'DemandAuditDetail', params: { id: row.id } })
}

// 单个审核通过
const handleApprove = (row) => {
  approveForm.ids = [row.id]
  approveForm.remark = ''
  approveDialogVisible.value = true
}

// 批量审核通过
const handleBatchApprove = () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning(t('districtDemandAudit.messages.selectItems'))
    return
  }
  approveForm.ids = selectedRows.value.map((row) => row.id)
  approveForm.remark = ''
  approveDialogVisible.value = true
}

// 确认审核通过
const confirmApprove = async () => {
  try {
    await ElMessageBox.confirm(
      t('districtDemandAudit.approveDialog.confirmMessage', { count: approveForm.ids.length }),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning',
      },
    )

    submitting.value = true
    const res = await approveDemand({
      ids: approveForm.ids,
      remark: approveForm.remark || undefined,
      level: 'district',
    })

    if (res.code === 200) {
      ElMessage.success(t('districtDemandAudit.approveDialog.success'))
      approveDialogVisible.value = false
      selectedRows.value = []
      loadData()
    } else {
      ElMessage.error(res.msg || t('districtDemandAudit.messages.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to approve:', error)
      ElMessage.error(t('districtDemandAudit.messages.operationFailed'))
    }
  } finally {
    submitting.value = false
  }
}

// 单个审核驳回
const handleReject = (row) => {
  rejectForm.ids = [row.id]
  rejectForm.auditOpinion = ''
  rejectForm.remark = ''
  rejectDialogVisible.value = true
}

// 批量审核驳回
const handleBatchReject = () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning(t('districtDemandAudit.messages.selectItems'))
    return
  }
  rejectForm.ids = selectedRows.value.map((row) => row.id)
  rejectForm.auditOpinion = ''
  rejectForm.remark = ''
  rejectDialogVisible.value = true
}

// 数据汇聚提交（预留）
const handleSummarySubmit = () => {
  console.log('district summary submit clicked')
}

// 确认审核驳回
const rejectFormRef = ref(null)
const rejectDialogVisible = ref(false)
const approveDialogVisible = ref(false)

const approveForm = reactive({
  ids: [],
  remark: '',
})

const rejectForm = reactive({
  ids: [],
  auditOpinion: '',
  remark: '',
})

const rejectRules = reactive({
  auditOpinion: [
    { required: true, message: t('districtDemandAudit.rejectDialog.auditOpinionRequired'), trigger: 'blur' },
  ],
})

const confirmReject = async () => {
  if (!rejectFormRef.value) return

  try {
    await rejectFormRef.value.validate()

    await ElMessageBox.confirm(
      t('districtDemandAudit.rejectDialog.confirmMessage', { count: rejectForm.ids.length }),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning',
      },
    )

    submitting.value = true
    const res = await rejectDemand({
      ids: rejectForm.ids,
      auditOpinion: rejectForm.auditOpinion,
      remark: rejectForm.remark || undefined,
      level: 'district',
    })

    if (res.code === 200) {
      ElMessage.success(t('districtDemandAudit.rejectDialog.success'))
      rejectDialogVisible.value = false
      selectedRows.value = []
      loadData()
    } else {
      ElMessage.error(res.msg || t('districtDemandAudit.messages.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel' && error !== false) {
      console.error('Failed to reject:', error)
      ElMessage.error(t('districtDemandAudit.messages.operationFailed'))
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

// 监听 Tab 切换
watch(activeTab, (val) => {
  if (val === 'pending') {
    loadData()
  } else if (val === 'summary' && summaryData.value.length === 0) {
    loadSummary()
  }
})

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style scoped>
 .page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 24px;
 }

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

 .content-wrapper {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
 }

 .info-card {
  background: white;
 }

 .card-header {
  padding: 24px;
  border-bottom: 1px solid #e8f5e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
 }

 .card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
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

 .search-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
 }

 .search-input {
  width: 300px;
 }

 .table-wrapper {
  margin-bottom: 16px;
 }

 .action-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
 }

 .mobile-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
 }

 .mobile-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
 }

 .mobile-card-header {
  padding: 16px;
  background: linear-gradient(135deg, #f0f9f4 0%, #e8f5e9 100%);
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 12px;
 }

 .farmer-name {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  font-weight: 600;
  color: #333;
 }

 .mobile-card-body {
  padding: 16px;
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
  min-width: 120px;
  flex-shrink: 0;
 }

 .mobile-card-row .value {
  color: #333;
  font-weight: 500;
 }

 .mobile-card-actions {
  padding: 12px 16px;
  background: #fafafa;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
 }

 .pagination-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: center;
 }

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
    align-items: flex-start;
    gap: 16px;
  }

  .header-actions {
    width: 100%;
  }

  .header-actions .el-button {
    flex: 1;
  }

  .card-body {
    padding: 16px;
  }

  .search-section {
    flex-direction: column;
  }

  .search-input {
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