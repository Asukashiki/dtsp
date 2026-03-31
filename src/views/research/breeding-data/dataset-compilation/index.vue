<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-database-2-line"
        :title="$t('research.datasetCompilation.title')"
        :subtitle="$t('research.datasetCompilation.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('research.datasetCompilation.columns.varietyName')">
              <el-input
                v-model="searchForm.keyword"
                :placeholder="$t('research.datasetCompilation.searchPlaceholder')"
                clearable
                class="search-input">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('research.datasetCompilation.columns.datasetStatus')">
              <el-select
                v-model="searchForm.datasetStatus"
                :placeholder="$t('research.datasetCompilation.filterByStatus')"
                clearable
                class="filter-select">
                <el-option :label="$t('research.datasetCompilation.status.draft')" value="draft" />
                <el-option :label="$t('research.datasetCompilation.status.submitted')" value="submitted" />
                <el-option :label="$t('research.datasetCompilation.status.reviewing')" value="reviewing" />
                <el-option :label="$t('research.datasetCompilation.status.approved')" value="approved" />
                <el-option :label="$t('research.datasetCompilation.status.rejected')" value="rejected" />
                <el-option :label="$t('research.datasetCompilation.status.needs_revision')" value="needs_revision" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard
          :title="$t('research.datasetCompilation.list')"
          icon="ri-file-list-3-line">
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
                prop="datasetCode"
                :label="$t('research.datasetCompilation.columns.datasetCode')"
                min-width="180"
                show-overflow-tooltip>
                  <template #default="{ row }">
                    <template v-if="row.datasetCode">
                      <span class="dataset-code">{{ row.datasetCode }}</span>
                    </template>
                    <template v-else>
                      <el-tooltip :content="$t('research.datasetCompilation.tooltip.codeAfterApproval')"
                        placement="top">
                        <span class="temp-tag">
                          <i class="ri-time-line"></i>
                          {{ $t('research.datasetCompilation.pendingCode') }}
                        </span>
                      </el-tooltip>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="trialId"
                  :label="$t('research.datasetCompilation.columns.trialId')"
                  min-width="120"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="batchId"
                  :label="$t('research.datasetCompilation.columns.batchId')"
                  min-width="150"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="versionNo"
                  :label="$t('research.datasetCompilation.columns.versionNo')"
                  min-width="100"
                />
                <el-table-column
                  prop="cropType"
                  :label="$t('research.datasetCompilation.columns.cropType')"
                  min-width="120"
                >
                  <template #default="{ row }">
                    {{ getCropTypeDisplay(row.cropType) }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="varietyName"
                  :label="$t('research.datasetCompilation.columns.varietyName')"
                  min-width="120"
                />
                <el-table-column
                  prop="recordCount"
                  :label="$t('research.datasetCompilation.columns.recordCount')"
                   min-width="100"
                />
                <el-table-column
                  prop="labTestCount"
                  :label="$t('research.datasetCompilation.columns.labTestCount')"
                   min-width="100"
                />
                <el-table-column
                  prop="yieldDataCount"
                  :label="$t('research.datasetCompilation.columns.yieldDataCount')"
                   min-width="100"
                />
                <el-table-column
                  prop="datasetStatus"
                  :label="$t('research.datasetCompilation.columns.datasetStatus')"
                   min-width="100"
                >
                  <template #default="{ row }">
                    <el-tag :type="getStatusType(row.datasetStatus)">
                      {{ getStatusLabel(row.datasetStatus) }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createdTime"
                  :label="$t('research.datasetCompilation.columns.createTime')"
                   min-width="180"
                />
                <el-table-column :label="$t('common.actions')" fixed="right" width="240">
                  <template #default="{ row }">
                    <ActionButtons
                      :workflow-status="mapDatasetStatusToWorkflow(row.datasetStatus)"
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
            <div v-for="item in tableData" :key="item.id" class="mobile-card">
              <div class="mobile-card-header">
                <div class="mobile-card-title">
                  <i class="ri-database-2-line"></i>
                  <span>{{ item.varietyName }}</span>
                </div>
                <el-tag :type="getStatusType(item.datasetStatus)" size="small">
                  {{ getStatusLabel(item.datasetStatus) }}
                </el-tag>
              </div>
              <div class="mobile-card-body">
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.datasetCompilation.columns.datasetCode') }}:</span>
                  <span class="value">{{ item.datasetCode || '-' }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.datasetCompilation.columns.trialId') }}:</span>
                  <span class="value">{{ item.trialId || '-' }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.datasetCompilation.columns.batchId') }}:</span>
                  <span class="value">{{ item.batchId }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.datasetCompilation.columns.versionNo') }}:</span>
                  <span class="value">{{ item.versionNo || '1.0' }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.datasetCompilation.columns.cropType') }}:</span>
                  <span class="value">{{ getCropTypeDisplay(item.cropType) }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.datasetCompilation.columns.varietyName') }}:</span>
                  <span class="value">{{ item.varietyName }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.datasetCompilation.columns.recordCount') }}:</span>
                  <span class="value">{{ item.recordCount || 0 }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.datasetCompilation.columns.labTestCount') }}:</span>
                  <span class="value">{{ item.labTestCount || 0 }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.datasetCompilation.columns.yieldDataCount') }}:</span>
                  <span class="value">{{ item.yieldDataCount || 0 }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.datasetCompilation.columns.createTime') }}:</span>
                  <span class="value">{{ item.createdTime || '-' }}</span>
                </div>
              </div>
              <div class="mobile-card-footer">
                <ActionButtons
                  :workflow-status="mapDatasetStatusToWorkflow(item.datasetStatus)"
                  mode="list"
                  :show-audit="false"
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
import { getDatasetList, deleteDataset, submitDataset } from '@/api/dataset'
import { useDict } from '@/hooks/useDict'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const router = useRouter()
const { t } = useI18n()
const { getLabelByValue } = useDict(['crop_type'])
const getCropTypeDisplay = (value) => getLabelByValue('crop_type', value) || value || '-'

const loading = ref(false)
const tableData = ref([])

const searchForm = reactive({
  keyword: '',
  datasetStatus: ''
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 将数据集状态映射为工作流状态
const mapDatasetStatusToWorkflow = (datasetStatus) => {
  const statusMap = {
    'draft': 'S0',           // 草稿
    'submitted': 'S1',       // 待审批
    'reviewing': 'S1',       // 待审批
    'approved': 'S2',        // 审核通过
    'rejected': 'S3',        // 审核驳回
    'needs_revision': 'S3'   // 需要修订（视为驳回）
  }
  return statusMap[datasetStatus] || 'S0'
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getDatasetList({
      varietyName: searchForm.keyword,
      datasetStatus: searchForm.datasetStatus,
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

// 获取状态类型
const getStatusType = (status) => {
  const typeMap = {
    draft: '',
    submitted: 'info',
    reviewing: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return typeMap[status] || ''
}

// 获取状态标签
const getStatusLabel = (status) => {
  return t(`research.datasetCompilation.status.${status}`)
}

// 搜索
const handleSearch = () => {
  pagination.currentPage = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.keyword = ''
  searchForm.datasetStatus = ''
  handleSearch()
}

// 新增
const handleAdd = () => {
  router.push({ name: 'DatasetCompilationAdd' })
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
    case 'cancelBatch':
      handleDelete(row)
      break
  }
}

// 查看
const handleView = (row) => {
  router.push({ name: 'DatasetCompilationDetail', params: { id: row.id } })
}

// 编辑
const handleEdit = (row) => {
  router.push({ name: 'DatasetCompilationEdit', params: { id: row.id } })
}

// 提交审核
const handleSubmit = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('research.datasetCompilation.submitConfirm'),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )
    const res = await submitDataset(row.id)
    if (res.code === 200) {
      ElMessage.success(t('research.datasetCompilation.submitSuccess'))
      loadData()
    } else {
      ElMessage.error(res.msg || t('common.submitFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to submit:', error)
      ElMessage.error(t('common.submitFailed'))
    }
  }
}

// 删除
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('research.datasetCompilation.deleteConfirm'),
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )
    const res = await deleteDataset([row.id])
    if (res.code === 200) {
      ElMessage.success(t('research.datasetCompilation.deleteSuccess'))
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

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';

/* Dataset Code 样式 */
.dataset-code {
  color: #009A44;
  font-weight: 600;
}

.temp-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background: #f5f5f5;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  color: #999;
  font-size: 12px;
  cursor: help;
}

.temp-tag i {
  font-size: 14px;
  color: #faad14;
}
</style>
