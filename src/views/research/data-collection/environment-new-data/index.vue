<template>
  <div class="environment-new-data-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon-wrapper">
        <i class="ri-cloud-line"></i>
      </div>
      <div class="header-text">
        <h1 class="page-title">{{ $t('research.environmentNewData.title') }}</h1>
        <p class="page-subtitle">{{ $t('research.environmentNewData.subtitle') }}</p>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 搜索和筛选栏 -->
      <div class="search-bar">
        <div class="search-row">
          <el-input
            v-model="searchForm.stationId"
            :placeholder="$t('research.environmentNewData.searchPlaceholder')"
            class="search-input"
            clearable
            @clear="handleSearch"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <i class="ri-search-line"></i>
            </template>
          </el-input>

          <el-select
            v-model="searchForm.parameterCode"
            :placeholder="$t('research.environmentNewData.filterByParameter')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('research.environmentNewData.allParameters')" value="" />
            <el-option
              v-for="item in options.env_parameter_code || []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-select
            v-model="searchForm.batchId"
            :placeholder="$t('research.environmentNewData.filterByBatch')"
            class="filter-select"
            filterable
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('research.environmentNewData.allBatches')" value="" />
            <el-option
              v-for="item in batchOptions"
              :key="item.batchId"
              :label="item.batchName || item.batchId"
              :value="item.batchId"
            />
          </el-select>

          <!-- Audit Status -->
          <el-select
            v-model="searchForm.workflowStatus"
            :placeholder="$t('research.environmentNewData.columns.auditStatus')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('common.all')" value="" />
            <el-option
              v-for="opt in options.flow_status || []"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
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
          </div>
          <div class="action-right">
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              <span class="btn-text">{{ $t('research.environmentNewData.add') }}</span>
            </el-button>
          </div>
        </div>
      </div>

      <!-- PC端：数据表格 -->
      <div class="table-card pc-view">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="stationId" :label="$t('research.environmentNewData.columns.stationId')" min-width="120" fixed="left" />
          <el-table-column prop="parameterCode" :label="$t('research.environmentNewData.columns.parameterCode')" min-width="140" align="center">
            <template #default="{ row }">
              <el-tag :type="getParameterTag(row.parameterCode)" size="small">
                {{ getParameterName(row.parameterCode) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="value" :label="$t('research.environmentNewData.columns.value')" min-width="100" align="right" />
          <el-table-column prop="unit" :label="$t('research.environmentNewData.columns.unit')" min-width="80" align="center" />
          <el-table-column prop="timestamp" :label="$t('research.environmentNewData.columns.timestamp')" min-width="160" align="center" />
          <el-table-column prop="source" :label="$t('research.environmentNewData.columns.source')" min-width="100" align="center" />
          <el-table-column :label="$t('research.environmentNewData.columns.auditStatus')" min-width="140" align="center">
            <template #default="{ row }">
              <el-tag type="info">{{ getLabelByValue('flow_status', row.workflowStatus) || row.workflowStatus || '-' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('research.environmentNewData.columns.actions')" width="200" fixed="right">
            <template #default="{ row }">
              <el-button 
                v-for="button in getActionButtons(row)" 
                :key="button.action"
                link 
                :type="button.type" 
                @click="handleAction(row, button.action)">
                <i :class="button.icon"></i>
                {{ button.label }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-wrapper">
          <el-pagination
            v-model:current-page="pagination.pageNum"
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
          <div v-for="item in tableData" :key="item.envRecordId" class="data-card" @click="handleView(item)">
            <div class="card-header">
              <div class="data-info">
                <h3 class="station-name">{{ item.stationId }}</h3>
                <span class="timestamp">{{ item.timestamp }}</span>
              </div>
              <div class="card-tags">
                <el-tag :type="getParameterTag(item.parameterCode)" size="small">
                  {{ getParameterName(item.parameterCode) }}
                </el-tag>
              </div>
            </div>

            <div class="card-body">
              <div class="value-display">
                <span class="value">{{ item.value }}</span>
                <span class="unit">{{ item.unit }}</span>
              </div>

              <div class="info-row">
                <i class="ri-folder-line info-icon"></i>
                <span class="info-label">{{ $t('research.environmentNewData.columns.batchName') }}:</span>
                <span class="info-value">{{ item.batchName || item.batchId || '-' }}</span>
              </div>

              <div class="info-row">
                <i class="ri-database-2-line info-icon"></i>
                <span class="info-label">{{ $t('research.environmentNewData.columns.source') }}:</span>
                <span class="info-value">{{ item.source || '-' }}</span>
              </div>
            </div>

            <div class="card-footer" @click.stop>
              <el-button 
                v-for="button in getActionButtons(item)" 
                :key="button.action"
                size="small"
                :type="button.type === 'primary' ? 'primary' : ''" 
                @click="handleAction(item, button.action)">
                <i :class="button.icon"></i> {{ button.label }}
              </el-button>
            </div>
          </div>
        </div>

        <div v-if="tableData.length === 0 && !loading" class="empty-state">
          <i class="ri-cloud-line"></i>
          <p>{{ $t('home.noData') }}</p>
        </div>

        <div class="mobile-pagination">
          <el-pagination
            v-model:current-page="pagination.pageNum"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            layout="prev, pager, next"
            small
            @current-change="handlePageChange"
          />
        </div>
      </div>
    </div>

    <!-- 移动端浮动添加按钮 -->
    <div class="mobile-fab" @click="handleAdd">
      <i class="ri-add-line"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getEnvironmentNewDataPage, deleteEnvironmentNewData, submitEnvironmentNewDataForAudit } from '@/api/environment-new-data'
import { getBreedingBatchList } from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'
import { useUserStore } from '@/store'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()
const { options, getLabelByValue } = useDict(['flow_status', 'env_parameter_code'])

const loading = ref(false)
const tableData = ref([])
const batchOptions = ref([])

// 获取工作流状态标签类型
const getWorkflowStatusType = (workflowStatus) => {
  const workflowStatusMap = {
    'S0': 'info',      // 草稿 - 灰色
    'S1': 'warning',   // 待审批 - 橙色
    'S2': 'primary',   // 审核通过 - 蓝色
    'S3': 'danger',    // 审核驳回 - 红色
    'S9': 'danger',    // 已作废 - 深红色
    'S10': 'danger'    // 异常 - 深红色
  }
  return workflowStatusMap[workflowStatus] || 'info'
}

const searchForm = reactive({
  stationId: '',
  parameterCode: '',
  batchId: '',
  workflowStatus: ''
})

const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

// 获取参数类型标签
const getParameterTag = (code) => {
  const tagMap = {
    'RAIN_DAILY': 'primary',
    'TMAX': 'danger',
    'TMIN': 'info',
    'HUMIDITY': '',
    'WIND_SPEED': 'warning',
    'SOLAR_RAD': 'success'
  }
  return tagMap[code] || ''
}

// 获取参数名称（使用字典）
const getParameterName = (code) => {
  return getLabelByValue('env_parameter_code', code) || code || '-'
}

// 获取操作按钮
const getActionButtons = (row) => {
  const workflowStatus = row.workflowStatus
  const buttons = []
  
  // 根据状态显示不同的操作按钮，并检查用户权限
  switch (workflowStatus) {
    case 'S0': // 草稿
      if (userStore.hasWorkflowStatusPermission('edit')) {
        buttons.push({ type: 'primary', action: 'edit', label: t('common.edit'), icon: 'ri-edit-line' })
      }
      if (userStore.hasWorkflowStatusPermission('submit')) {
        buttons.push({ type: 'success', action: 'submit', label: t('research.environmentNewData.actions.submit'), icon: 'ri-send-plane-line' })
      }
      break
    case 'S1': // 待审批
      if (userStore.hasWorkflowStatusPermission('approve')) {
        buttons.push({ type: 'primary', action: 'view', label: t('common.view'), icon: 'ri-eye-line' })
      }
      break
    case 'S2': // 审核通过
      buttons.push({ type: 'primary', action: 'view', label: t('common.view'), icon: 'ri-eye-line' })
      break
    case 'S3': // 审核驳回
      if (userStore.hasWorkflowStatusPermission('edit')) {
        buttons.push({ type: 'primary', action: 'edit', label: t('common.edit'), icon: 'ri-edit-line' })
      }
      if (userStore.hasWorkflowStatusPermission('submit')) {
        buttons.push({ type: 'success', action: 'submit', label: t('research.environmentNewData.actions.submit'), icon: 'ri-send-plane-line' })
      }
      break
    case 'S9': // 已归档
      buttons.push({ type: 'primary', action: 'view', label: t('common.view'), icon: 'ri-eye-line' })
      break
    case 'S10': // 已作废
      buttons.push({ type: 'primary', action: 'view', label: t('common.view'), icon: 'ri-eye-line' })
      break
  }
  
  return buttons
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getEnvironmentNewDataPage({
      ...searchForm,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })

    if (res.code === 200) {
      tableData.value = res.rows || []
      pagination.total = res.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

// 加载批次选项
const loadBatchOptions = async () => {
  try {
    const res = await getBreedingBatchList({ pageNum: 1, pageSize: 500 })
    if (res.code === 200) {
      batchOptions.value = res.rows || []
    }
  } catch (error) {
    console.error('Failed to load batch options:', error)
  }
}

// 搜索
const handleSearch = () => {
  pagination.pageNum = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.stationId = ''
  searchForm.parameterCode = ''
  searchForm.batchId = ''
  searchForm.workflowStatus = ''
  pagination.pageNum = 1
  loadData()
}

// 新增
const handleAdd = () => {
  router.push('/research/data-collection/environment-new-data/add')
}

// 查看
const handleView = (row) => {
  router.push(`/research/data-collection/environment-new-data/detail/${row.envRecordId}`)
}

// 编辑
const handleEdit = (row) => {
  router.push(`/research/data-collection/environment-new-data/edit/${row.envRecordId}`)
}

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm(
    t('research.environmentNewData.deleteConfirm'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await deleteEnvironmentNewData([row.envRecordId])
      if (res.code === 200) {
        ElMessage.success(t('research.environmentNewData.deleteSuccess'))
        loadData()
      }
    } catch (error) {
      console.error('Failed to delete:', error)
      ElMessage.error(t('common.failed'))
    }
  }).catch(() => {})
}

// 处理操作按钮点击
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
    case 'edit':
      handleEdit(row)
      break
    case 'submit':
      handleSubmitForAudit(row)
      break
  }
}

// 提交审核
const handleSubmitForAudit = async (row) => {
  try {
    // 检查权限
    if (!userStore.hasWorkflowStatusPermission('submit')) {
      ElMessage.error(t('common.noPermission'))
      return
    }

    await ElMessageBox.confirm(
      t('research.environmentNewData.submitForAuditConfirm'),
      t('common.prompt'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )
    const res = await submitEnvironmentNewDataForAudit(row.envRecordId)
    if (res.code === 200) {
      ElMessage.success(t('research.environmentNewData.submitForAuditSuccess'))
      loadData()
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to submit for audit:', error)
      ElMessage.error(t('research.environmentNewData.submitForAuditFailed'))
    }
  }
}

// 切换每页条数
const handleSizeChange = () => {
  pagination.pageNum = 1
  loadData()
}

// 切换页码
const handlePageChange = () => {
  loadData()
}

onMounted(() => {
  loadBatchOptions()
  loadData()
})
</script>

<style scoped>
.environment-new-data-page {
  min-height: calc(100vh - 120px);
  position: relative;
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  padding: 32px;
  margin: -24px 0 24px 0;
  border-radius: 0 0 16px 16px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.header-icon-wrapper {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  flex-shrink: 0;
}

.header-icon-wrapper i {
  font-size: 40px;
  color: white;
}

.header-text {
  flex: 1;
  color: white;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 15px;
  opacity: 0.9;
  margin: 0;
}

/* 内容区域 */
.content-wrapper {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 搜索栏 */
.search-bar {
  margin-bottom: 24px;
}

.search-row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.filter-select {
  width: 180px;
  flex-shrink: 0;
}

.action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.action-left,
.action-right {
  display: flex;
  gap: 8px;
}

/* PC端表格 */
.table-card {
  background: white;
}

.pagination-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

/* 移动端默认隐藏 */
.mobile-view,
.mobile-fab {
  display: none;
}

/* 移动端卡片样式 */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.data-card {
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.data-card:active {
  transform: scale(0.98);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f2f5;
}

.data-info {
  flex: 1;
  min-width: 0;
}

.station-name {
  font-size: 17px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.timestamp {
  font-size: 13px;
  color: #909399;
}

.card-tags {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
  flex-shrink: 0;
  margin-left: 12px;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.value-display {
  display: flex;
  align-items: baseline;
  gap: 4px;
  padding: 12px;
  background: linear-gradient(135deg, #f0f7f4 0%, #e8f5e9 100%);
  border-radius: 8px;
}

.value-display .value {
  font-size: 28px;
  font-weight: 700;
  color: #009A44;
}

.value-display .unit {
  font-size: 14px;
  color: #606266;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.info-icon {
  font-size: 16px;
  color: #909399;
  flex-shrink: 0;
}

.info-label {
  color: #606266;
  flex-shrink: 0;
}

.info-value {
  color: #303133;
  font-weight: 500;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-footer {
  display: flex;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f2f5;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #909399;
}

.empty-state i {
  font-size: 64px;
  margin-bottom: 12px;
  display: block;
  opacity: 0.5;
}

.mobile-pagination {
  display: flex;
  justify-content: center;
  padding: 16px 0;
  margin-top: 16px;
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .page-header {
    margin: -16px -16px 16px -16px;
    padding: 24px;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
    padding: 20px 16px;
    gap: 16px;
  }

  .header-icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 12px;
  }

  .header-icon-wrapper i {
    font-size: 32px;
  }

  .page-title {
    font-size: 20px;
  }

  .page-subtitle {
    font-size: 13px;
  }

  .content-wrapper {
    padding: 16px;
  }

  .search-row {
    flex-direction: column;
  }

  .search-input,
  .filter-select {
    width: 100%;
  }

  .action-row {
    flex-direction: column;
    align-items: stretch;
  }

  .action-left,
  .action-right {
    justify-content: stretch;
  }

  .action-left .el-button,
  .action-right .el-button {
    flex: 1;
  }

  .action-right {
    display: none;
  }

  .pc-view {
    display: none;
  }

  .mobile-view {
    display: block;
  }

  .mobile-fab {
    display: flex;
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    box-shadow: 0 4px 16px rgba(0, 154, 68, 0.3);
    cursor: pointer;
    z-index: 50;
    transition: all 0.3s ease;
  }

  .mobile-fab:active {
    transform: scale(0.9);
  }

  .btn-text {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    padding: 16px 12px;
  }

  .header-icon-wrapper {
    width: 56px;
    height: 56px;
  }

  .header-icon-wrapper i {
    font-size: 28px;
  }

  .page-title {
    font-size: 18px;
  }

  .data-card {
    padding: 14px;
  }

  .station-name {
    font-size: 16px;
  }

  .value-display .value {
    font-size: 24px;
  }

  .mobile-fab {
    bottom: 16px;
    right: 16px;
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
}
</style>
