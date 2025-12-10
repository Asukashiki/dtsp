<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-user-add-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('farmerDemand.title') }}</h1>
            <p class="page-subtitle">{{ $t('farmerDemand.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-list-check"></i>
              <span>{{ $t('farmerDemand.list') }}</span>
            </div>
            <div class="header-actions">
              <el-button
                type="success"
                @click="handleBatchSubmit"
                :disabled="selectedRows.length === 0"
                v-if="selectedRows.length > 0"
              >
                <i class="ri-send-plane-line"></i>
                {{ $t('farmerDemand.submitForAudit') }} ({{ selectedRows.length }})
              </el-button>
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
                :placeholder="$t('farmerDemand.searchPlaceholder')"
                clearable
                class="search-input"
              >
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>

              <el-select
                v-model="searchForm.status"
                :placeholder="$t('farmerDemand.filterByStatus')"
                clearable
                class="search-input"
              >
                <el-option value="" :label="$t('farmerDemand.allStatus')"></el-option>
                <el-option
                  v-for="(label, value) in statusOptions"
                  :key="value"
                  :label="label"
                  :value="value"
                ></el-option>
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
              <el-table v-loading="loading" :data="tableData" stripe @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55"
                  :selectable="rowSelectable"
                />
                <el-table-column
                  prop="batchNo"
                  :label="$t('farmerDemand.columns.batchNo')"
                  min-width="150"
                />
                <el-table-column
                  prop="farmerName"
                  :label="$t('farmerDemand.columns.farmerName')"
                  min-width="120"
                />
                <el-table-column
                  prop="farmerIdNumber"
                  :label="$t('farmerDemand.columns.farmerIdNumber')"
                  min-width="150"
                />
                <el-table-column
                  prop="kebele"
                  :label="$t('farmerDemand.columns.kebele')"
                  min-width="120"
                />
                <el-table-column
                  prop="village"
                  :label="$t('farmerDemand.columns.village')"
                  min-width="120"
                />
                <el-table-column
                  prop="landArea"
                  :label="$t('farmerDemand.columns.landArea')"
                  min-width="120"
                >
                  <template #default="{ row }">
                    {{ row.landArea || '-' }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="statusName"
                  :label="$t('farmerDemand.columns.status')"
                  min-width="100"
                >
                  <template #default="{ row }">
                    <el-tag :type="getStatusType(row.status)">
                      {{ row.statusName || getStatusLabel(row.status) }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="daUserName"
                  :label="$t('farmerDemand.columns.daUserName')"
                  min-width="120"
                />
                <el-table-column
                  prop="createdTime"
                  :label="$t('farmerDemand.columns.createdTime')"
                  min-width="160"
                />
                <el-table-column :label="$t('common.actions')" fixed="right" width="320">
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button link type="primary" @click="handleView(row)">
                        <i class="ri-eye-line"></i>
                        {{ $t('common.view') }}
                      </el-button>
                      <el-button
                        link
                        type="success"
                        @click="handleSubmit(row)"
                        v-if="row.status === '0' || row.status === '3'"
                      >
                        <i class="ri-send-plane-line"></i>
                        {{ $t('farmerDemand.submit') }}
                      </el-button>
                      <el-button
                        link
                        type="primary"
                        @click="handleEdit(row)"
                        v-if="row.status === '0' || row.status === '3'"
                      >
                        <i class="ri-edit-line"></i>
                        {{ $t('common.edit') }}
                      </el-button>
                      <el-button
                        link
                        type="danger"
                        @click="handleDelete(row)"
                        v-if="row.status === '0'"
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
                  <el-checkbox
                    v-model="item.checked"
                    @change="handleMobileCheckChange(item)"
                    :disabled="!rowSelectable(item)"
                  ></el-checkbox>
                  <div class="mobile-card-title">
                    <i class="ri-user-line"></i>
                    <span>{{ item.farmerName }}</span>
                  </div>
                  <el-tag :type="getStatusType(item.status)" size="small">
                    {{ item.statusName || getStatusLabel(item.status) }}
                  </el-tag>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('farmerDemand.columns.batchNo') }}:</span>
                    <span class="value">{{ item.batchNo }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('farmerDemand.columns.farmerIdNumber') }}:</span>
                    <span class="value">{{ item.farmerIdNumber }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('farmerDemand.columns.kebele') }}:</span>
                    <span class="value">{{ item.kebele }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('farmerDemand.columns.village') }}:</span>
                    <span class="value">{{ item.village }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('farmerDemand.columns.landArea') }}:</span>
                    <span class="value">{{ item.landArea || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('farmerDemand.columns.daUserName') }}:</span>
                    <span class="value">{{ item.daUserName }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('farmerDemand.columns.createdTime') }}:</span>
                    <span class="value">{{ item.createdTime || '-' }}</span>
                  </div>
                </div>
                <div class="mobile-card-actions">
                  <el-button type="primary" size="small" @click="handleView(item)">
                    {{ $t('common.view') }}
                  </el-button>
                  <el-button
                    type="success"
                    size="small"
                    @click="handleSubmit(item)"
                    v-if="item.status === '0' || item.status === '3'"
                  >
                    {{ $t('farmerDemand.submit') }}
                  </el-button>
                  <el-button
                    size="small"
                    @click="handleEdit(item)"
                    v-if="item.status === '0' || item.status === '3'"
                  >
                    {{ $t('common.edit') }}
                  </el-button>
                  <el-button
                    type="danger"
                    size="small"
                    @click="handleDelete(item)"
                    v-if="item.status === '0'"
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
            <el-empty v-if="tableData.length === 0 && !loading" :description="$t('farmerDemand.messages.noData')" />
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
import { getFarmerDemandPage, deleteFarmerDemand, submitForAudit } from '@/api/farmerDemand'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])
const selectedRows = ref([])

const searchForm = reactive({
  keyword: '',
  status: ''
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 状态选项（0: 草稿, 1: 已提交, 2: 已通过, 3: 驳回, 4: 已锁定）
const statusOptions = computed(() => ({
  '0': t('farmerDemand.status.draft'),
  '1': t('farmerDemand.status.submitted'),
  '2': t('farmerDemand.status.approved'),
  '3': t('farmerDemand.status.rejected'),
  '4': t('farmerDemand.status.locked'),
}))

// 获取状态标签
const getStatusLabel = (status) => {
  return statusOptions.value[status] || status
}

// 获取状态类型
const getStatusType = (status) => {
  const typeMap = {
    '0': 'info', // draft
    '1': 'warning', // submitted
    '2': 'success', // approved
    '3': 'danger', // rejected
    '4': '', // locked
  }
  return typeMap[status] || 'info'
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getFarmerDemandPage({
      pageNum: pagination.currentPage,
      pageSize: pagination.pageSize,
      farmerName: searchForm.keyword,
      farmerIdNumber: searchForm.keyword,
      village: searchForm.keyword,
      status: searchForm.status
    })
    if (res.code === 200) {
      tableData.value = res.data?.records || res.data?.list || []
      pagination.total = res.data?.total || 0
      // 初始化移动端复选框状态
      tableData.value.forEach(item => {
        item.checked = selectedRows.value.some(r => r.id === item.id)
      })
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
  searchForm.keyword = ''
  searchForm.status = ''
  handleSearch()
}

// 新增
const handleAdd = () => {
  router.push({ name: 'FarmerDemandAdd' })
}

// 查看
const handleView = (row) => {
  router.push({ name: 'FarmerDemandDetail', params: { id: row.id } })
}

// 编辑
const handleEdit = (row) => {
  router.push({ name: 'FarmerDemandEdit', params: { id: row.id } })
}

// 判断行是否可选择（只有草稿(0)和驳回(3)状态可以提交审核）
const rowSelectable = (row) => {
  return row.status === '0' || row.status === '3'
}

// 表格选择变化
const handleSelectionChange = (selection) => {
  selectedRows.value = selection
}

// 移动端复选框变化
const handleMobileCheckChange = (item) => {
  if (item.checked) {
    if (!selectedRows.value.find(r => r.id === item.id)) {
      selectedRows.value.push(item)
    }
  } else {
    selectedRows.value = selectedRows.value.filter(r => r.id !== item.id)
  }
}

// 单条提交审核
const handleSubmit = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('farmerDemand.submitConfirm'),
      t('common.tip'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )
    const res = await submitForAudit([row.id])
    if (res.code === 200) {
      const result = res.data
      if (result.successCount > 0) {
        ElMessage.success(t('farmerDemand.submitSuccess'))
        loadData()
      } else {
        ElMessage.error(t('farmerDemand.submitFailed'))
      }
    } else {
      ElMessage.error(res.msg || t('farmerDemand.submitFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to submit:', error)
      ElMessage.error(t('farmerDemand.submitFailed'))
    }
  }
}

// 批量提交审核
const handleBatchSubmit = async () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning(t('farmerDemand.pleaseSelectData'))
    return
  }

  try {
    await ElMessageBox.confirm(
      t('farmerDemand.batchSubmitConfirm', { count: selectedRows.value.length }),
      t('common.tip'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const ids = selectedRows.value.map(row => row.id)
    const res = await submitForAudit(ids)

    if (res.code === 200) {
      const result = res.data
      if (result.successCount > 0) {
        ElMessage.success(
          t('farmerDemand.batchSubmitResult', {
            success: result.successCount,
            fail: result.failCount
          })
        )
        selectedRows.value = []
        loadData()
      } else {
        ElMessage.error(t('farmerDemand.submitFailed'))
      }
    } else {
      ElMessage.error(res.msg || t('farmerDemand.submitFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to batch submit:', error)
      ElMessage.error(t('farmerDemand.submitFailed'))
    }
  }
}


// 删除
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('farmerDemand.deleteConfirm'),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )
    const res = await deleteFarmerDemand(row.id)
    if (res.code === 200) {
      ElMessage.success(t('farmerDemand.deleteSuccess'))
      loadData()
    } else {
      ElMessage.error(res.msg || t('farmerDemand.messages.deleteFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete:', error)
      ElMessage.error(t('farmerDemand.messages.deleteFailed'))
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
n.header-actions {
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
  flex-wrap: wrap;
  align-items: center;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.search-select {
  min-width: 150px;
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
  min-width: 80px;

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
n  .header-actions {
    width: 100%;
    flex-direction: column;
  }

  .header-actions .el-button {
    width: 100%;
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
