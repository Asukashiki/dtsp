<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-list-check-2"
        :title="$t('research.environmentNewData.titleAuth')"
        :subtitle="$t('research.environmentNewData.subtitleAuth')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('research.environmentNewData.columns.stationId')">
              <el-input
                v-model="searchForm.stationId"
                :placeholder="$t('research.environmentNewData.searchPlaceholder')"
                class="search-input"
                clearable>
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('research.environmentNewData.columns.parameterCode')">
              <el-select
                v-model="searchForm.parameterCode"
                :placeholder="$t('research.environmentNewData.filterByParameter')"
                class="filter-select"
                clearable>
                <el-option
                  v-for="item in options.env_parameter_code || []"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('research.environmentNewData.columns.batchId')">
              <el-select
                v-model="searchForm.batchId"
                :placeholder="$t('research.environmentNewData.filterByBatch')"
                class="filter-select"
                filterable
                clearable>
                <el-option
                  v-for="item in batchOptions"
                  :key="item.batchId"
                  :label="item.batchName || item.batchId"
                  :value="item.batchId"
                />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard
          :title="$t('research.environmentNewData.list')"
          icon="ri-file-list-3-line"
          :no-padding="true">
          <!-- 状态标签页 -->
          <StatusTabs
            v-model="activeTab"
            :tabs="tabConfig"
            @tab-change="handleTabChange" />

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="tableData" stripe v-loading="loading" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column prop="plotId" :label="$t('research.environmentNewData.columns.plotId')" min-width="120" />
              <el-table-column prop="batchId" :label="$t('research.environmentNewData.columns.batchId')" min-width="120" />
              <el-table-column prop="trialId" :label="$t('research.environmentNewData.columns.trialId')" min-width="120" />
              <el-table-column prop="stationId" :label="$t('research.environmentNewData.columns.stationId')" min-width="120" />
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
                  <el-tag :type="getWorkflowStatusType(row.workflowStatus)" effect="plain">
                    {{ getLabelByValue('flow_status', row.workflowStatus) || row.workflowStatus || '-' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('research.environmentNewData.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="row.workflowStatus"
                    mode="list"
                    :show-audit="activeTab === 'pendingApproval'"
                    :is-voided-tab="activeTab === 'voided'"
                    @action="(action) => handleAction(row, action)" />
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
        </InfoCard>

        <!-- 移动端卡片 -->
        <div class="mobile-card-list mobile-only">
          <div v-for="item in tableData" :key="item.envRecordId" class="mobile-card">
            <div class="mobile-card-header">
              <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
              <div class="mobile-card-title">
                <i class="ri-cloud-line"></i>
                <span>{{ item.stationId }}</span>
              </div>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.environmentNewData.columns.parameterCode') }}:</span>
                <el-tag :type="getParameterTag(item.parameterCode)" size="small">
                  {{ getParameterName(item.parameterCode) }}
                </el-tag>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.environmentNewData.columns.value') }}:</span>
                <span class="value">{{ item.value }} {{ item.unit }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.environmentNewData.columns.timestamp') }}:</span>
                <span class="value">{{ item.timestamp }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.environmentNewData.columns.batchId') }}:</span>
                <span class="value">{{ item.batchName || item.batchId || '-' }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.environmentNewData.columns.auditStatus') }}:</span>
                <el-tag :type="getWorkflowStatusType(item.workflowStatus)" effect="plain" size="small">
                  {{ getLabelByValue('flow_status', item.workflowStatus) || item.workflowStatus || '-' }}
                </el-tag>
              </div>
            </div>
            <div class="mobile-card-footer">
              <ActionButtons
                :workflow-status="item.workflowStatus"
                mode="list"
                :show-audit="activeTab === 'pendingApproval'"
                :is-voided-tab="activeTab === 'voided'"
                @action="(action) => handleAction(item, action)" />
            </div>
          </div>

          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="pagination.pageNum"
              v-model:page-size="pagination.pageSize"
              :total="pagination.total"
              layout="prev, pager, next"
              small
              @current-change="handlePageChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import StatusTabs from '@/components/workflow/StatusTabs.vue'
import ActionButtons from '@/components/workflow/ActionButtons.vue'
import { getEnvironmentNewDataPage, deleteEnvironmentNewData, submitEnvironmentNewDataForAudit, approveEnvironmentNewData, rejectEnvironmentNewData } from '@/api/environment-new-data'
import { getBreedingBatchList } from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'
import { useUserStore } from '@/store'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const userStore = useUserStore()

const loading = ref(false)
const tableData = ref([])
const batchOptions = ref([])
const activeTab = ref('pendingApproval')
const selectedIds = ref([])

// Tab configuration
const tabConfig = [
  {
    name: 'pendingApproval',
    label: 'research.breedingData.batch.tabs.pendingApproval',
    icon: 'ri-time-line'
  },
  {
    name: 'approved',
    label: 'research.breedingData.batch.tabs.approved',
    icon: 'ri-check-line'
  },
  {
    name: 'voided',
    label: 'research.breedingData.batch.tabs.voided',
    icon: 'ri-forbid-line'
  }
]

// 使用 useDict hook 获取字典数据
const { options, getLabelByValue } = useDict(['flow_status', 'env_parameter_code'])

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

// 获取工作流状态标签类型
const getWorkflowStatusType = (workflowStatus) => {
  const workflowStatusMap = {
    'S0': 'info',
    'S1': 'warning',
    'S2': 'primary',
    'S3': 'danger',
    'S9': 'danger',
    'S10': 'danger'
  }
  return workflowStatusMap[workflowStatus] || 'info'
}

// 处理选择变化
const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.envRecordId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.envRecordId)) {
      selectedIds.value.push(item.envRecordId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.envRecordId)
  }
}

// 设置查询参数根据标签页
const setQueryParamsByTab = (tabName) => {
  switch (tabName) {
    case 'pendingApproval':
      searchForm.workflowStatus = 'S1'
      break
    case 'approved':
      searchForm.workflowStatus = 'S2'
      break
    case 'voided':
      searchForm.workflowStatus = ''
      break
  }
}

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

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    // 已作废标签页暂不查询数据，等待接口就绪
    if (activeTab.value === 'voided') {
      tableData.value = []
      pagination.total = 0
      loading.value = false
      return
    }

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
const handleQuery = () => {
  pagination.pageNum = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.stationId = ''
  searchForm.parameterCode = ''
  searchForm.batchId = ''
  setQueryParamsByTab(activeTab.value)
  pagination.pageNum = 1
  loadData()
}

// 查看
const handleView = (row) => {
  router.push({
    path: `/research/data-collection/environment-new-data/detail/${row.envRecordId}`,
    query: { from: '/research/data-collection/environment-new-data/approve', tab: activeTab.value }
  })
}

// 编辑
const handleEdit = (row) => {
  router.push({
    path: `/research/data-collection/environment-new-data/edit/${row.envRecordId}`,
    query: { from: '/research/data-collection/environment-new-data/approve', tab: activeTab.value }
  })
}

// 切换标签页
const handleTabChange = (tabName) => {
  setQueryParamsByTab(tabName)
  pagination.pageNum = 1
  loadData()
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
    case 'audit':
      handleAudit(row)
      break
    case 'submit':
      handleSubmitForAudit(row)
      break
    case 'approve':
      handleApprove(row)
      break
    case 'reject':
      handleReject(row)
      break
  }
}

// 审核
const handleAudit = (row) => {
  router.push({
    path: `/research/data-collection/environment-new-data/audit/${row.envRecordId}`,
    query: { mode: 'audit', from: '/research/data-collection/environment-new-data/approve', tab: activeTab.value }
  })
}

// 提交审核
const handleSubmitForAudit = async (row) => {
  try {
    if (!userStore.hasWorkflowStatusPermission('submit')) {
      ElMessage.error(t('common.noPermission'))
      return
    }

    await ElMessageBox.confirm(
      t('research.environmentNewData.submitForAuditConfirm'),
      t('common.warning'),
      { type: 'warning' }
    )

    const res = await submitEnvironmentNewDataForAudit(row.envRecordId)
    if (res.code === 200) {
      ElMessage.success(t('research.environmentNewData.submitForAuditSuccess'))
      loadData()
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('research.environmentNewData.submitForAuditFailed'))
    }
  }
}

// 审核通过
const handleApprove = async (row) => {
  try {
    if (!userStore.hasWorkflowStatusPermission('approve')) {
      ElMessage.error(t('common.noPermission'))
      return
    }

    const { value: auditComment } = await ElMessageBox.prompt(
      t('research.environmentNewData.approveCommentPrompt'),
      t('research.environmentNewData.approveCommentTitle'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        inputPlaceholder: t('research.environmentNewData.approveCommentPlaceholder'),
        inputType: 'textarea',
        inputRows: 4
      }
    )

    const res = await approveEnvironmentNewData(row.envRecordId, auditComment)
    if (res.code === 200) {
      ElMessage.success(t('research.environmentNewData.approveSuccess'))
      loadData()
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('research.environmentNewData.approveFailed'))
    }
  }
}

// 驳回
const handleReject = async (row) => {
  try {
    if (!userStore.hasWorkflowStatusPermission('reject')) {
      ElMessage.error(t('common.noPermission'))
      return
    }

    const { value: auditComment } = await ElMessageBox.prompt(
      t('research.environmentNewData.rejectCommentPrompt'),
      t('research.environmentNewData.rejectCommentTitle'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        inputPlaceholder: t('research.environmentNewData.rejectCommentPlaceholder'),
        inputType: 'textarea',
        inputRows: 4,
        inputValidator: (value) => {
          if (!value || value.trim() === '') {
            return t('research.environmentNewData.rules.approvalCommentRequired') || '驳回时必须填写审批意见'
          }
          return true
        }
      }
    )

    const res = await rejectEnvironmentNewData(row.envRecordId, auditComment)
    if (res.code === 200) {
      ElMessage.success(t('research.environmentNewData.rejectSuccess'))
      loadData()
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('research.environmentNewData.rejectFailed'))
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
  if (route.query.tab) {
    activeTab.value = route.query.tab
  }
  setQueryParamsByTab(activeTab.value)
  loadBatchOptions()
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
