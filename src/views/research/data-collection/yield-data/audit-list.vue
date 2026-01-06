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
            <h1 class="page-title">{{ $t('research.menu.fieldInspectionAudit') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('research.dataCollection.fieldInspectionAudit.list') }}</span>
            </div>
          </div>

          <div class="card-body">
            <!-- 搜索区域 -->
            <div class="search-section">
              <el-select
                v-model="searchForm.batchId"
                :placeholder="$t('research.dataCollection.yieldData.placeholder.batchId')"
                filterable
                clearable
                class="search-input"
                :loading="plotLoading"
                @change="handleSearch"
              >
                <el-option
                  v-for="item in batchOptions"
                  :key="item.value || item.batchId"
                  :label="item.label || item.batchId"
                  :value="item.value || item.batchId"
                />
              </el-select>
              <el-select
                v-model="searchForm.plotId"
                :placeholder="$t('research.dataCollection.yieldData.placeholder.plotId')"
                filterable
                clearable
                class="search-input"
                :loading="plotLoading"
                @change="handleSearch"
              >
                <el-option
                  v-for="item in plotOptions"
                  :key="item.value || item.plotId"
                  :label="item.label || item.plotId"
                  :value="item.value || item.plotId"
                />
              </el-select>
              <!-- 状态 -->
              <el-select
                v-model="searchForm.status"
                :placeholder="$t('research.dataCollection.yieldData.columns.status')"
                clearable
                class="search-input"
                @change="handleSearch"
              >
                <el-option :label="$t('common.all')" value="" />
                <el-option label="submit" value="submit" />
                <el-option label="approve" value="approve" />
              </el-select>
              <!-- 审核状态（字典 flow_status） -->
              <el-select
                v-model="searchForm.workflowStatus"
                :placeholder="$t('research.dataCollection.yieldData.columns.auditStatus')"
                clearable
                class="search-input"
                @change="handleSearch"
              >
                <el-option :label="$t('common.all')" value="" />
                <el-option v-for="opt in options.flow_status || []" :key="opt.value" :label="opt.label" :value="opt.value" />
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
                  prop="batchId"
                  show-overflow-tooltip
                  :label="$t('research.dataCollection.yieldData.columns.batchId')"
                  min-width="150"
                />
                <el-table-column
                  prop="trialId"
                  show-overflow-tooltip
                  :label="$t('research.dataCollection.yieldData.columns.trialId')"
                  min-width="150"
                />
                <el-table-column
                  prop="plotId"
                  show-overflow-tooltip
                  :label="$t('research.dataCollection.yieldData.columns.plotId')"
                  min-width="120"
                />
                <el-table-column
                  prop="inspectionDate"
                  :label="$t('research.dataCollection.yieldData.columns.inspectionDate')"
                  min-width="120"
                />
                <el-table-column
                  prop="inspectionType"
                  :label="$t('research.dataCollection.yieldData.columns.inspectionType')"
                  min-width="120"
                />
                <el-table-column
                  prop="scoreCode"
                  :label="$t('research.dataCollection.yieldData.columns.scoreCode')"
                  min-width="120"
                />
                <el-table-column
                  prop="scoreValue"
                  :label="$t('research.dataCollection.yieldData.columns.scoreValue')"
                  min-width="120"
                />
                <el-table-column
                  prop="status"
                  :label="$t('research.dataCollection.yieldData.columns.status')"
                  min-width="120"
                >
                  <template #default="{ row }">
                    <el-tag type="info">{{ mapStatus(row.status) }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('research.dataCollection.yieldData.columns.auditStatus')"
                  min-width="140"
                >
                  <template #default="{ row }">
                    <el-tag type="info">{{ getLabelByValue('flow_status', row.workflowStatus) || row.workflowStatus || '-' }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('common.actions')"
                  fixed="right"
                  width="200"
                >
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button link type="primary" @click="handleView(row)">
                        <i class="ri-eye-line"></i>
                        {{ $t('common.view') }}
                      </el-button>
                      <el-button
                        v-if="shouldShowAuditButton(row)"
                        link
                        type="warning"
                        @click="handleAudit(row)"
                      >
                        <i class="ri-file-check-line"></i>
                        {{ $t('common.audit') }}
                      </el-button>
                      <el-button
                        v-if="shouldShowVoidButton(row)"
                        link
                        type="danger"
                        @click="handleVoid(row)"
                      >
                        <i class="ri-close-circle-line"></i>
                        {{ $t('research.dataCollection.fieldInspectionAudit.void') }}
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
                  :page-sizes="[10, 20, 50, 100]"
                  :total="pagination.total"
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
                    <i class="ri-file-check-line"></i>
                    <span>{{ item.plotId }}</span>
                  </div>
                  <div class="mobile-card-actions">
                    <el-button link type="primary" @click="handleView(item)">
                      <i class="ri-eye-line"></i>
                      {{ $t('common.view') }}
                    </el-button>
                    <el-button
                      v-if="shouldShowAuditButton(item)"
                      link
                      type="warning"
                      @click="handleAudit(item)"
                    >
                      <i class="ri-file-check-line"></i>
                      {{ $t('common.audit') }}
                    </el-button>
                    <el-button
                      v-if="shouldShowVoidButton(item)"
                      link
                      type="danger"
                      @click="handleVoid(item)"
                    >
                      <i class="ri-close-circle-line"></i>
                      {{ $t('research.dataCollection.fieldInspectionAudit.void') }}
                    </el-button>
                  </div>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.yieldData.columns.inspectionDate') }}:</span>
                    <span class="value">{{ item.inspectionDate || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.yieldData.columns.inspectionType') }}:</span>
                    <span class="value">{{ item.inspectionType || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.yieldData.columns.scoreValue') }}:</span>
                    <span class="value">{{ item.scoreValue || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.yieldData.columns.status') }}:</span>
                    <span class="value">{{ mapStatus(item.status) || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.yieldData.columns.auditStatus') }}:</span>
                    <span class="value">{{ getLabelByValue('flow_status', item.workflowStatus) || item.workflowStatus || '-' }}</span>
                  </div>
                </div>
              </div>

              <!-- 移动端分页 -->
              <div class="mobile-pagination-wrapper">
                <el-pagination
                  small
                  layout="prev, pager, next"
                  v-model:current-page="pagination.currentPage"
                  v-model:page-size="pagination.pageSize"
                  :total="pagination.total"
                  @current-change="handleCurrentChange"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getFieldInspectionAuditList, getPlotSelectList, getBatchSelectList, voidFieldInspection } from '@/api/fieldInspectionAudit'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const { t } = useI18n()
const { options, getLabelByValue } = useDict(['flow_status'])

// 将后端可能返回的 0/1 状态映射为 submit/approve，若已为英文状态则原样返回
const mapStatus = (val) => {
  if (val === '0' || val === 0) return 'submit'
  if (val === '1' || val === 1) return 'approve'
  if (val === 'submit' || val === 'approve') return val
  return val || '-'
}

const loading = ref(false)
const tableData = ref([])
const plotLoading = ref(false)
const plotOptions = ref([])
const batchOptions = ref([])

const searchForm = reactive({
  batchId: '',
  plotId: '',
  status: '',
  workflowStatus: '' // 默认查询所有状态
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 查询列表
const handleSearch = async () => {
  loading.value = true
  try {
    // 构建查询参数
    const params = {
      pageNum: pagination.currentPage,
      pageSize: pagination.pageSize,
      status: '1' // 只展示Status为'1'的数据
    }

    // 只添加非空的搜索条件
    if (searchForm.batchId) {
      params.batchId = searchForm.batchId
    }
    if (searchForm.plotId) {
      params.plotId = searchForm.plotId
    }
    if (searchForm.status) {
      params.status = searchForm.status
    }
    // workflowStatus为空字符串时，后端会查询所有状态
    // 如果有值，则按该值筛选
    if (searchForm.workflowStatus !== '') {
      params.workflowStatus = searchForm.workflowStatus
    }

    const res = await getFieldInspectionAuditList(params)
    if (res.code === 200) {
      // 处理BaseController.getDataTable()返回的TableDataInfo格式
      if (res.rows && res.total !== undefined) {
        // 直接分页格式
        tableData.value = res.rows || []
        pagination.total = res.total || 0
      } else if (res.data && res.data.rows && res.data.total !== undefined) {
        // TableDataInfo标准格式：{code: 200, data: {rows: [], total: 100}}
        tableData.value = res.data.rows || []
        pagination.total = res.data.total || 0
      } else if (res.data) {
        // 其他嵌套data格式
        tableData.value = res.data.list || res.data || []
        pagination.total = res.data.total || res.total || 0
      } else {
        // 直接返回数据列表
        tableData.value = res || []
        pagination.total = Array.isArray(res) ? res.length : 0
      }
    } else {
      ElMessage.error(res.msg || '查询失败')
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 重置
const handleReset = () => {
  searchForm.batchId = ''
  searchForm.plotId = ''
  searchForm.status = ''
  searchForm.workflowStatus = '' // 默认查询所有状态
  pagination.currentPage = 1
  handleSearch()
}

// 分页处理
const handleSizeChange = () => {
  pagination.currentPage = 1
  handleSearch()
}

const handleCurrentChange = () => {
  handleSearch()
}

// 查看详情
const handleView = (row) => {
  router.push({ name: 'FieldInspectionAuditDetail', params: { id: row.id } })
}

// 判断是否显示审核按钮（只在审批状态为S1时显示）
const shouldShowAuditButton = (row) => {
  const status = row.workflowStatus
  return status === 'S1'
}

// 判断是否显示作废按钮（只在审批状态为S0、S1或S3时显示）
const shouldShowVoidButton = (row) => {
  const status = row.workflowStatus
  return status === 'S0' || status === 'S1' || status === 'S3'
}

// 审核操作
const handleAudit = async (row) => {
  // 跳转到审核页面
  router.push({ name: 'FieldInspectionAudit', params: { id: row.id } })
}

// 作废操作
const handleVoid = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('research.dataCollection.fieldInspectionAudit.confirmVoid'),
      t('common.confirm'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    // 弹出输入框让用户输入作废原因
    const { value: reason } = await ElMessageBox.prompt(
      t('research.dataCollection.fieldInspectionAudit.placeholder.voidReason'),
      t('research.dataCollection.fieldInspectionAudit.voidReason'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        inputType: 'textarea',
        inputPlaceholder: t('research.dataCollection.fieldInspectionAudit.placeholder.voidReason'),
        inputValidator: (value) => {
          if (!value || value.trim() === '') {
            return t('research.dataCollection.fieldInspectionAudit.rules.voidReasonRequired')
          }
          return true
        }
      }
    )

    // 调用作废接口
    const submitData = {
      id: row.id,
      remark: reason,
      workflowStatus: 'S4' // 作废后状态应为S4
    }

    const res = await voidFieldInspection(submitData)
    if (res.code === 200) {
      ElMessage.success(t('research.dataCollection.fieldInspectionAudit.voidSuccess'))
      // 刷新列表
      handleSearch()
    } else {
      ElMessage.error(res.msg || t('common.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel' && error !== 'close') {
      console.error('Failed to void:', error)
      ElMessage.error(t('common.operationFailed'))
    }
  }
}

// 加载地块选项
const loadPlotOptions = async () => {
  plotLoading.value = true
  try {
    const res = await getPlotSelectList()
    if (res.code === 200) {
      plotOptions.value = res.data || []
    }
  } catch (error) {
    console.error('Failed to load plot options:', error)
  } finally {
    plotLoading.value = false
  }
}

// 加载批次选项
const loadBatchOptions = async () => {
  try {
    const res = await getBatchSelectList()
    if (res.code === 200) {
      batchOptions.value = res.data || []
    }
  } catch (error) {
    console.error('Failed to load batch options:', error)
  }
}

onMounted(() => {
  loadPlotOptions()
  loadBatchOptions()
  handleSearch()
})
</script>

<style scoped>

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
}

.search-input {
  flex: 1;
  min-width: 200px;
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

.mobile-card-header .mobile-card-actions {
  display: flex;
  gap: 8px;
  border-top: none;
  padding-top: 0;
  margin-top: 0;
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
