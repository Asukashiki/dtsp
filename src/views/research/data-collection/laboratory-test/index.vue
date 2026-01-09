<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-microscope-line"
        :title="$t('research.dataCollection.laboratoryTest.title')"
        :subtitle="$t('research.dataCollection.laboratoryTest.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('research.dataCollection.laboratoryTest.form.batchId')">
              <el-select
                v-model="searchForm.batchId"
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
            </SearchItem>
            <SearchItem :label="$t('research.dataCollection.laboratoryTest.form.auditStatus')">
              <el-select
                v-model="searchForm.workflowStatus"
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
            </SearchItem>
            <SearchItem :label="$t('research.dataCollection.laboratoryTest.form.sampleType')">
              <el-input
                v-model="searchForm.sampleType"
                clearable
                class="search-input"
              >
                <template #prefix>
                  <i class="ri-test-tube-line"></i>
                </template>
              </el-input>
            </SearchItem>
            <SearchItem :label="$t('research.dataCollection.laboratoryTest.form.testStatus')">
              <el-select
                v-model="searchForm.passFailFlag"
                clearable
                class="search-input"
              >
                <el-option label="Pass" value="true" />
                <el-option label="Fail" value="false" />
              </el-select>
            </SearchItem>
            <SearchItem :label="$t('research.dataCollection.laboratoryTest.form.sampleId')">
              <el-input
                v-model="searchForm.sampleId"
                clearable
                class="search-input"
              >
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('research.dataCollection.laboratoryTest.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('common.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table v-loading="loading" :data="tableData" stripe>
              <el-table-column type="selection" width="55" align="center" />
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
                  :label="$t('research.dataCollection.laboratoryTest.form.testStatus')"
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
                  prop="updateBy"
                  :label="$t('common.updateBy')"
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
                <el-table-column :label="$t('common.actions')" fixed="right" width="240">
                  <template #default="{ row }">
                    <ActionButtons
                      :workflow-status="row.workflowStatus || 'S0'"
                      mode="list"
                      :show-audit="false"
                      @action="(action) => handleAction(row, action)" />
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
                    <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.testStatus') }}:</span>
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
                    <span class="label">{{ $t('common.updateBy') }}:</span>
                    <span class="value">{{ item.updateBy || '-' }}</span>
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
                  <ActionButtons
                    :workflow-status="item.workflowStatus || 'S0'"
                    mode="list"
                    :show-audit="false"
                    size="small"
                    @action="(action) => handleAction(item, action)" />
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
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import ActionButtons from '@/components/workflow/ActionButtons.vue'
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
      // 支持多种返回格式：rows(TableDataInfo), list, 或直接data数组
      tableData.value = res.rows || res.data?.rows || res.data?.list || res.data || []
      pagination.total = res.total || res.data?.total || 0
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

// 统一动作处理
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
    case 'edit':
      handleEdit(row)
      break
    case 'submit':
      handleSubmit(row)
      break
    case 'archive':
      handleArchive(row)
      break
    case 'cancelBatch':
      handleCancel(row)
      break
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

<style scoped lang="scss">
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
