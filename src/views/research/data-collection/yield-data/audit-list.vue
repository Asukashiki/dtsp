<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-list-check-2"
        :title="$t('research.menu.fieldInspectionAudit')"
        :subtitle="$t('research.dataCollection.fieldInspectionAudit.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('research.dataCollection.yieldData.columns.batchId')">
              <el-select
                v-model="searchForm.batchId"
                :placeholder="$t('research.dataCollection.yieldData.placeholder.batchId')"
                filterable
                clearable
                class="search-input"
                :loading="plotLoading">
                <el-option
                  v-for="item in batchOptions"
                  :key="item.value || item.batchId"
                  :label="item.label || item.batchId"
                  :value="item.value || item.batchId"
                />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('research.dataCollection.yieldData.columns.plotId')">
              <el-select
                v-model="searchForm.plotId"
                :placeholder="$t('research.dataCollection.yieldData.placeholder.plotId')"
                filterable
                clearable
                class="search-input"
                :loading="plotLoading">
                <el-option
                  v-for="item in plotOptions"
                  :key="item.value || item.plotId"
                  :label="item.label || item.plotId"
                  :value="item.value || item.plotId"
                />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard
          :title="$t('research.dataCollection.fieldInspectionAudit.list')"
          icon="ri-file-list-3-line"
          :no-padding="true">
          <!-- 状态标签页 -->
          <StatusTabs
            v-model="activeTab"
            :tabs="tabConfig"
            @tab-change="handleTabChange" />

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table v-loading="loading" :data="tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center" />
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
                :label="$t('research.dataCollection.yieldData.columns.auditStatus')"
                min-width="140"
                align="center"
              >
                <template #default="{ row }">
                  <el-tag :type="getWorkflowStatusType(row.workflowStatus)" effect="plain">
                    {{ getLabelByValue('flow_status', row.workflowStatus) || row.workflowStatus || '-' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('common.actions')"
                fixed="right"
                width="240"
              >
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
        </InfoCard>

        <!-- 移动端卡片 -->
        <div class="mobile-card-list mobile-only">
          <div v-for="item in tableData" :key="item.id" class="mobile-card">
            <div class="mobile-card-header">
              <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
              <div class="mobile-card-title">
                <i class="ri-bar-chart-box-line"></i>
                <span>{{ item.plotId }}</span>
              </div>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.dataCollection.yieldData.columns.batchId') }}:</span>
                <span class="value">{{ item.batchId }}</span>
              </div>
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
                <span class="label">{{ $t('research.dataCollection.yieldData.columns.auditStatus') }}:</span>
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
              v-model:current-page="pagination.currentPage"
              v-model:page-size="pagination.pageSize"
              :total="pagination.total"
              layout="prev, pager, next"
              small
              @current-change="handleCurrentChange"
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
import { getFieldInspectionAuditList, getPlotSelectList, getBatchSelectList, voidFieldInspection } from '@/api/fieldInspectionAudit'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const { options, getLabelByValue } = useDict(['flow_status'])

const loading = ref(false)
const tableData = ref([])
const plotLoading = ref(false)
const plotOptions = ref([])
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

const searchForm = reactive({
  batchId: '',
  plotId: '',
  workflowStatus: ''
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 处理选择变化
const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.id)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.id)) {
      selectedIds.value.push(item.id)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.id)
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
      searchForm.workflowStatus = 'S10'
      break
  }
}

// 查询列表
const handleSearch = async () => {
  loading.value = true
  try {
    // 已作废标签页暂不查询数据，等待接口就绪
    if (activeTab.value === 'voided') {
      tableData.value = []
      pagination.total = 0
      loading.value = false
      return
    }

    const params = {
      pageNum: pagination.currentPage,
      pageSize: pagination.pageSize,
      status: '1' // 只展示Status为'1'的数据
    }

    if (searchForm.batchId) {
      params.batchId = searchForm.batchId
    }
    if (searchForm.plotId) {
      params.plotId = searchForm.plotId
    }
    if (searchForm.workflowStatus) {
      params.workflowStatus = searchForm.workflowStatus
    }

    const res = await getFieldInspectionAuditList(params)
    if (res.code === 200) {
      if (res.rows && res.total !== undefined) {
        tableData.value = res.rows || []
        pagination.total = res.total || 0
      } else if (res.data && res.data.rows && res.data.total !== undefined) {
        tableData.value = res.data.rows || []
        pagination.total = res.data.total || 0
      } else if (res.data) {
        tableData.value = res.data.list || res.data || []
        pagination.total = res.data.total || res.total || 0
      } else {
        tableData.value = res || []
        pagination.total = Array.isArray(res) ? res.length : 0
      }
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 搜索
const handleQuery = () => {
  pagination.currentPage = 1
  handleSearch()
}

// 重置
const handleReset = () => {
  searchForm.batchId = ''
  searchForm.plotId = ''
  setQueryParamsByTab(activeTab.value)
  pagination.currentPage = 1
  handleSearch()
}

// 切换标签页
const handleTabChange = (tabName) => {
  setQueryParamsByTab(tabName)
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

// 编辑
const handleEdit = (row) => {
  router.push({ name: 'FieldInspectionEdit', params: { id: row.id } })
}

// 审核操作
const handleAudit = (row) => {
  router.push({ name: 'FieldInspectionAudit', params: { id: row.id } })
}

// 提交审核
const handleSubmitForAudit = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('research.dataCollection.yieldData.submitForAuditConfirm') || 'Are you sure you want to submit this record for review?',
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )
    // 调用提交审核接口
    ElMessage.success(t('research.dataCollection.yieldData.submitForAuditSuccess') || 'Submit for review successfully')
    handleSearch()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to submit for review:', error)
      ElMessage.error(t('common.failed'))
    }
  }
}

// 作废操作
const handleVoid = async (row) => {
  try {
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

    const submitData = {
      id: row.id,
      remark: reason,
      workflowStatus: 'S10'
    }

    const res = await voidFieldInspection(submitData)
    if (res.code === 200) {
      ElMessage.success(t('research.dataCollection.fieldInspectionAudit.voidSuccess'))
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
    case 'cancelBatch':
      handleVoid(row)
      break
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
  if (route.query.tab) {
    activeTab.value = route.query.tab
  }
  setQueryParamsByTab(activeTab.value)
  loadPlotOptions()
  loadBatchOptions()
  handleSearch()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
