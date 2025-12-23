<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-microscope-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.dataCollection.laboratoryTest.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.dataCollection.laboratoryTest.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('research.dataCollection.laboratoryTest.list') }}</span>
            </div>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('common.add') }}
            </el-button>
          </div>

          <div class="card-body">
            <!-- 搜索区域 -->
            <div class="search-section">
              <el-select
                v-model="searchForm.batchId"
                :placeholder="$t('research.dataCollection.laboratoryTest.form.batchId')"
                filterable
                clearable
                class="search-input"
              >
                <el-option
                  v-for="item in batchOptions"
                  :key="item.dataId"
                  :label="item.batchName"
                  :value="item.batchId"
                />
              </el-select>
              <el-select
                v-model="searchForm.workflowStatus"
                :placeholder="$t('research.dataCollection.laboratoryTest.form.auditStatus')"
                clearable
                class="search-input"
              >
                <el-option
                  v-for="opt in options.flow_status"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                />
              </el-select>
              <el-input
                v-model="searchForm.sampleType"
                :placeholder="$t('research.dataCollection.laboratoryTest.form.sampleType')"
                clearable
                class="search-input"
              >
                <template #prefix>
                  <i class="ri-test-tube-line"></i>
                </template>
              </el-input>
              <el-select
                v-model="searchForm.passFailFlag"
                :placeholder="$t('research.dataCollection.laboratoryTest.form.passFailFlag')"
                clearable
                class="search-input"
              >
                <el-option label="Pass" value="true" />
                <el-option label="Fail" value="false" />
              </el-select>
              <el-input
                v-model="searchForm.sampleId"
                :placeholder="$t('research.dataCollection.laboratoryTest.form.sampleId')"
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
                  :label="$t('research.dataCollection.laboratoryTest.form.batchId')"
                  min-width="150"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="trialId"
                  :label="$t('research.dataCollection.laboratoryTest.form.trialId')"
                  min-width="150"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="workflowStatus"
                  :label="$t('research.dataCollection.laboratoryTest.form.auditStatus')"
                  min-width="140"
                >
                  <template #default="{ row }">
                    <el-tag>{{ getLabelByValue('flow_status', row.workflowStatus) || '-' }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                 show-overflow-tooltip
                  prop="sampleId"
                  :label="$t('research.dataCollection.laboratoryTest.form.sampleId')"
                  min-width="120"
                />
                <el-table-column
                  prop="sampleCondition"
                  :label="$t('research.dataCollection.laboratoryTest.form.sampleCondition')"
                  min-width="120"
                />
                <el-table-column
                  prop="sampleType"
                  :label="$t('research.dataCollection.laboratoryTest.form.sampleType')"
                  min-width="120"
                />
                <el-table-column
                  prop="labParameter"
                  :label="$t('research.dataCollection.laboratoryTest.form.labParameter')"
                  min-width="140"
                />
                <el-table-column
                  prop="resultValue"
                  :label="$t('research.dataCollection.laboratoryTest.form.resultValue')"
                  min-width="120"
                />
                <el-table-column
                  prop="passFailFlag"
                  :label="$t('research.dataCollection.laboratoryTest.form.passFailFlag')"
                  min-width="120"
                >
                  <template #default="{ row }">
                    <el-tag v-if="row.passFailFlag === 'true' || row.passFailFlag === true" type="success">Pass</el-tag>
                    <el-tag v-else-if="row.passFailFlag === 'false' || row.passFailFlag === false" type="danger">Fail</el-tag>
                    <span v-else>-</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="germinationRate"
                  :label="$t('research.dataCollection.laboratoryTest.form.germinationRate')"
                  min-width="120"
                >
                  <template #default="{ row }">
                    {{ row.germinationRate }}%
                  </template>
                </el-table-column>
                <el-table-column
                  prop="purityPercent"
                  :label="$t('research.dataCollection.laboratoryTest.form.purityPercent')"
                  min-width="110"
                >
                  <template #default="{ row }">
                    {{ row.purityPercent }}%
                  </template>
                </el-table-column>
                <el-table-column
                  prop="moistureContentPercent"
                  :label="$t('research.dataCollection.laboratoryTest.form.moistureContentPercent')"
                  min-width="120"
                >
                  <template #default="{ row }">
                    {{ row.moistureContentPercent }}%
                  </template>
                </el-table-column>
                <el-table-column
                  prop="proteinPercent"
                  :label="$t('research.dataCollection.laboratoryTest.form.proteinPercent')"
                  min-width="120"
                >
                  <template #default="{ row }">
                    {{ row.proteinPercent }}%
                  </template>
                </el-table-column>
                <el-table-column
                  prop="testDate"
                  :label="$t('research.dataCollection.laboratoryTest.form.testDate')"
                  min-width="120"
                />
                <el-table-column
                  prop="createdByName"
                  :label="$t('common.createdBy')"
                  min-width="120"
                />
                <el-table-column
                  prop="createdTime"
                  :label="$t('common.createdTime')"
                  min-width="160"
                />
                <el-table-column
                  prop="updatedBy"
                  :label="$t('common.updatedBy')"
                  min-width="120"
                />
                <el-table-column
                  prop="updatedTime"
                  :label="$t('common.updatedTime')"
                  min-width="160"
                />
                <el-table-column
                  prop="approveByName"
                  :label="$t('common.approver')"
                  min-width="120"
                />
                <el-table-column
                  prop="approveTime"
                  :label="$t('common.approveTime')"
                  min-width="160"
                />
                <el-table-column :label="$t('common.actions')" fixed="right" width="300">
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <!-- 查看按钮 - 非草稿状态显示 -->
                      <el-button 
                        v-if="row.workflowStatus !== 'S0'"
                        link 
                        type="primary" 
                        @click="handleView(row)"
                      >
                        <i class="ri-eye-line"></i>
                        {{ $t('common.view') }}
                      </el-button>
                      
                      <!-- 编辑按钮 - 草稿(S0)和已退回(S3)状态显示 -->
                      <el-button 
                        v-if="row.workflowStatus === 'S0' || row.workflowStatus === 'S3'"
                        link 
                        type="primary" 
                        @click="handleEdit(row)"
                      >
                        <i class="ri-edit-line"></i>
                        {{ $t('common.edit') }}
                      </el-button>
                      
                      <!-- 提交审核按钮 - 草稿(S0)和已退回(S3)状态显示 -->
                      <el-button 
                        v-if="row.workflowStatus === 'S0' || row.workflowStatus === 'S3'"
                        link 
                        type="success" 
                        @click="handleSubmit(row)"
                      >
                        <i class="ri-send-plane-line"></i>
                        {{ $t('research.dataCollection.laboratoryTest.submit') }}
                      </el-button>
                      
                      <!-- 归档按钮 - 仅已审批(S2)状态显示 -->
                      <el-button 
                        v-if="row.workflowStatus === 'S2'"
                        link 
                        type="warning" 
                        @click="handleArchive(row)"
                      >
                        <i class="ri-archive-line"></i>
                        {{ $t('research.dataCollection.laboratoryTest.archive') }}
                      </el-button>
                      
                      <!-- 作废按钮 - 仅草稿(S0)状态显示 -->
                      <el-button 
                        v-if="row.workflowStatus === 'S0'"
                        link 
                        type="danger" 
                        @click="handleCancel(row)"
                      >
                        <i class="ri-close-circle-line"></i>
                        {{ $t('research.dataCollection.laboratoryTest.cancel') }}
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
              <div v-for="item in tableData" :key="item.dataId" class="mobile-card">
                <div class="mobile-card-header">
                  <div class="mobile-card-title">
                    <i class="ri-microscope-line"></i>
                    <span>{{ item.sampleId }}</span>
                  </div>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.batchId') }}:</span>
                    <span class="value">{{ item.batchId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.auditStatus') }}:</span>
                    <span class="value">
                      {{ getLabelByValue('flow_status', item.workflowStatus) || '-' }}
                    </span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.trialId') }}:</span>
                    <span class="value">{{ item.trialId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.sampleCondition') }}:</span>
                    <span class="value">{{ item.sampleCondition }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.sampleType') }}:</span>
                    <span class="value">{{ item.sampleType || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.labParameter') }}:</span>
                    <span class="value">{{ item.labParameter || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.resultValue') }}:</span>
                    <span class="value">{{ item.resultValue || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.passFailFlag') }}:</span>
                    <span class="value">
                      <el-tag v-if="item.passFailFlag === 'true' || item.passFailFlag === true" type="success" size="small">Pass</el-tag>
                      <el-tag v-else-if="item.passFailFlag === 'false' || item.passFailFlag === false" type="danger" size="small">Fail</el-tag>
                      <span v-else>-</span>
                    </span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.germinationRate') }}:</span>
                    <span class="value">{{ item.germinationRate }}%</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.purityPercent') }}:</span>
                    <span class="value">{{ item.purityPercent }}%</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.moistureContentPercent') }}:</span>
                    <span class="value">{{ item.moistureContentPercent }}%</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.testDate') }}:</span>
                    <span class="value">{{ item.testDate || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('common.createdBy') }}:</span>
                    <span class="value">{{ item.createdByName || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('common.createdTime') }}:</span>
                    <span class="value">{{ item.createdTime || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('common.updatedBy') }}:</span>
                    <span class="value">{{ item.updatedBy || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('common.updatedTime') }}:</span>
                    <span class="value">{{ item.updatedTime || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('common.approver') }}:</span>
                    <span class="value">{{ item.approveByName || '-' }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('common.approveTime') }}:</span>
                    <span class="value">{{ item.approveTime || '-' }}</span>
                  </div>
                </div>
                <div class="mobile-card-actions">
                  <!-- 查看按钮 - 非草稿状态显示 -->
                  <el-button 
                    v-if="item.workflowStatus !== 'S0'"
                    type="primary" 
                    size="small" 
                    @click="handleView(item)"
                  >
                    {{ $t('common.view') }}
                  </el-button>
                  
                  <!-- 编辑按钮 - 草稿(S0)和已退回(S3)状态显示 -->
                  <el-button 
                    v-if="item.workflowStatus === 'S0' || item.workflowStatus === 'S3'"
                    size="small" 
                    @click="handleEdit(item)"
                  >
                    {{ $t('common.edit') }}
                  </el-button>
                  
                  <!-- 提交审核按钮 - 草稿(S0)和已退回(S3)状态显示 -->
                  <el-button 
                    v-if="item.workflowStatus === 'S0' || item.workflowStatus === 'S3'"
                    type="success" 
                    size="small" 
                    @click="handleSubmit(item)"
                  >
                    {{ $t('research.dataCollection.laboratoryTest.submit') }}
                  </el-button>
                  
                  <!-- 归档按钮 - 仅已审批(S2)状态显示 -->
                  <el-button 
                    v-if="item.workflowStatus === 'S2'"
                    type="warning" 
                    size="small" 
                    @click="handleArchive(item)"
                  >
                    {{ $t('research.dataCollection.laboratoryTest.archive') }}
                  </el-button>
                  
                  <!-- 作废按钮 - 仅草稿(S0)状态显示 -->
                  <el-button 
                    v-if="item.workflowStatus === 'S0'"
                    type="danger" 
                    size="small" 
                    @click="handleCancel(item)"
                  >
                    {{ $t('research.dataCollection.laboratoryTest.cancel') }}
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
            <el-empty v-if="tableData.length === 0 && !loading" :description="$t('home.noData')" />
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { getLabTestList, deleteLabTest, submitLabTest, archiveLabTest, cancelLabTest } from '@/api/labTest'
import { getBatchOptions } from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])
const batchOptions = ref([])
// 字典：流程状态
const { options, getLabelByValue } = useDict(['flow_status'])

const searchForm = reactive({
  batchId: '',
  workflowStatus: '',
  sampleType: '',
  passFailFlag: null,
  sampleId: ''
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 加载批次选项
const loadBatchOptions = async () => {
  try {
    const res = await getBatchOptions()
    if (res.code === 200) {
      batchOptions.value = res.data || []
    }
  } catch (error) {
    console.error('Failed to load batch options:', error)
  }
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getLabTestList({
      batchId: searchForm.batchId,
      workflowStatus: searchForm.workflowStatus,
      sampleType: searchForm.sampleType,
      passFailFlag: searchForm.passFailFlag,
      sampleId: searchForm.sampleId,
      pageNum: pagination.currentPage,
      pageSize: pagination.pageSize
    })
    if (res.code === 200) {
      tableData.value = res.data?.list || res.data || []
      pagination.total = res.data?.total || res.total || 0
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
  searchForm.batchId = ''
  searchForm.workflowStatus = ''
  searchForm.sampleType = ''
  searchForm.passFailFlag = null
  searchForm.sampleId = ''
  handleSearch()
}

// 新增
const handleAdd = () => {
  router.push({ name: 'BreedingLabTestAdd' })
}

// 查看
const handleView = (row) => {
  router.push({ name: 'BreedingLabTestDetail', params: { id: row.dataId } })
}

// 编辑
const handleEdit = (row) => {
  router.push({ name: 'BreedingLabTestEdit', params: { id: row.dataId } })
}

// 删除
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('common.deleteConfirm'),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )
    const res = await deleteLabTest([row.dataId])
    if (res.code === 200) {
      ElMessage.success(t('common.deleteSuccess'))
      loadData()
    } else {
      ElMessage.error(res.msg || t('common.deleteFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete:', error)
      ElMessage.error(t('common.deleteFailed'))
    }
  }
}

// 提交审核
const handleSubmit = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('research.dataCollection.laboratoryTest.submitConfirm'),
      t('common.confirm'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )
    const res = await submitLabTest({ dataId: row.dataId })
    if (res.code === 200) {
      ElMessage.success(t('research.dataCollection.laboratoryTest.submitSuccess'))
      loadData()
    } else {
      ElMessage.error(res.msg || t('common.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to submit:', error)
      ElMessage.error(t('common.operationFailed'))
    }
  }
}

// 归档
const handleArchive = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('research.dataCollection.laboratoryTest.archiveConfirm'),
      t('common.confirm'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )
    const res = await archiveLabTest({ dataId: row.dataId })
    if (res.code === 200) {
      ElMessage.success(t('research.dataCollection.laboratoryTest.archiveSuccess'))
      loadData()
    } else {
      ElMessage.error(res.msg || t('common.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to archive:', error)
      ElMessage.error(t('common.operationFailed'))
    }
  }
}

// 作废
const handleCancel = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('research.dataCollection.laboratoryTest.cancelDataConfirm'),
      t('common.confirm'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )
    const res = await cancelLabTest({ dataId: row.dataId })
    if (res.code === 200) {
      ElMessage.success(t('research.dataCollection.laboratoryTest.cancelSuccess'))
      loadData()
    } else {
      ElMessage.error(res.msg || t('common.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to cancel:', error)
      ElMessage.error(t('common.operationFailed'))
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
  loadBatchOptions()
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
