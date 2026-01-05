<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-list-check-2"
        :title="$t('research.breedingData.batch.audit.title')"
        :subtitle="$t('research.breedingData.batch.audit.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 - 无标题 -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('research.breedingData.batch.columns.batchId')">
              <el-input
                v-model="queryParams.batchId"
                :placeholder="$t('research.breedingData.batch.columns.batchId')"
                clearable
                class="search-input">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('research.breedingData.batch.columns.batchName')">
              <el-input
                v-model="queryParams.batchName"
                :placeholder="$t('research.breedingData.batch.placeholder.batchName')"
                clearable
                class="search-input" />
            </SearchItem>

            <SearchItem :label="$t('research.breedingData.batch.columns.cropType')">
              <el-select
                v-model="queryParams.cropType"
                :placeholder="$t('research.breedingData.batch.placeholder.cropType')"
                clearable
                class="filter-select"
                :loading="dictLoading">
                <el-option v-for="item in options.crop_type" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('research.breedingData.batch.columns.varietyName')">
              <el-input
                v-model="queryParams.varietyName"
                :placeholder="$t('research.breedingData.batch.placeholder.varietyName')"
                clearable
                class="search-input" />
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard
          :title="$t('research.breedingData.batch.list')"
          icon="ri-file-list-3-line"
          :no-padding="true">
          <!-- 状态标签页 -->
          <StatusTabs
            v-model="activeTab"
            :tabs="tabConfig"
            @tab-change="handleTabChange" />

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="dataList" stripe v-loading="loading" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" />
              <el-table-column prop="batchName" :label="$t('research.breedingData.batch.columns.batchName')" min-width="160" show-overflow-tooltip />
              <el-table-column prop="batchId" :label="$t('research.breedingData.batch.columns.batchId')" min-width="140" show-overflow-tooltip />
              <el-table-column prop="cropType" :label="$t('research.breedingData.batch.columns.cropType')" min-width="100">
                <template #default="{ row }">
                  {{ getLabelByValue('crop_type', row.cropType) }}
                </template>
              </el-table-column>
              <el-table-column prop="varietyName" :label="$t('research.breedingData.batch.columns.varietyName')" min-width="120" show-overflow-tooltip />
              <el-table-column prop="objective" :label="$t('research.breedingData.batch.columns.objective')" min-width="120" show-overflow-tooltip />
              <el-table-column prop="breedingMethod" :label="$t('research.breedingData.batch.columns.breedingMethod')" min-width="100" />
              <el-table-column prop="year" :label="$t('research.breedingData.batch.columns.year')" min-width="80" />
              <el-table-column prop="workflowStatus" :label="$t('research.breedingData.batch.columns.workflowStatus')" min-width="120">
                <template #default="{ row }">
                  <el-tag :type="getWorkflowStatusType(row.workflowStatus)" effect="plain">
                    {{ getLabelByValue('flow_status', row.workflowStatus) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('research.breedingData.batch.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="row.workflowStatus"
                    mode="list"
                    :is-voided-tab="activeTab === 'voided'"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="queryParams.pageNum"
                v-model:page-size="queryParams.pageSize"
                :page-sizes="[10, 20, 50]"
                :total="total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="getList"
                @current-change="getList"
              />
            </div>
          </div>
        </InfoCard>

        <!-- 移动端卡片 -->
        <div class="mobile-card-list mobile-only">
          <div v-for="item in dataList" :key="item.dataId" class="mobile-card">
            <div class="mobile-card-header">
              <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
              <div class="mobile-card-title">
                <i class="ri-seedling-line"></i>
                <span>{{ item.batchName }}</span>
              </div>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.batch.columns.batchId') }}:</span>
                <span class="value">{{ item.batchId }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.batch.columns.cropType') }}:</span>
                <span class="value">{{ getLabelByValue('crop_type', item.cropType) }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.batch.columns.varietyName') }}:</span>
                <span class="value">{{ item.varietyName }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.batch.columns.workflowStatus') }}:</span>
                <el-tag :type="getWorkflowStatusType(item.workflowStatus)" effect="plain" size="small">
                  {{ getLabelByValue('flow_status', item.workflowStatus) }}
                </el-tag>
              </div>
            </div>
            <div class="mobile-card-footer">
              <ActionButtons
                :workflow-status="item.workflowStatus"
                mode="list"
                :is-voided-tab="activeTab === 'voided'"
                @action="(action) => handleAction(item, action)" />
            </div>
          </div>

          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="queryParams.pageNum"
              v-model:page-size="queryParams.pageSize"
              :total="total"
              layout="prev, pager, next"
              small
              @current-change="getList"
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store'
import { useDict } from '@/hooks/useDict'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import StatusTabs from '@/components/workflow/StatusTabs.vue'
import ActionButtons from '@/components/workflow/ActionButtons.vue'
import {
  getBreedingBatchList,
  getBreedingBatchVoidedList,
  deleteBreedingBatch,
  submitForAudit,
  approveBatch,
  rejectBatch,
  archiveBatch,
  cancelBatch
} from '@/api/breedingData'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const userStore = useUserStore()

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const selectedIds = ref([])
const activeTab = ref('pendingApproval')

// Tab configuration
const tabConfig = [
  {
    name: 'pendingApproval',
    label: 'research.breedingData.batch.tabs.pendingApproval',
    icon: 'ri-time-line'
  },
  {
    name: 'voided',
    label: 'research.breedingData.batch.tabs.voided',
    icon: 'ri-forbid-line'
  },
  {
    name: 'approved',
    label: 'research.breedingData.batch.tabs.approved',
    icon: 'ri-check-line'
  }
]

// 使用 useDict hook 获取字典数据
const { options, getLabelByValue, loading: dictLoading } = useDict([
  'crop_type',
  'flow_status'
])

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  batchId: '',
  batchName: '',
  cropType: '',
  varietyName: '',
  workflowStatus: ''
})

const getList = async () => {
  loading.value = true
  try {
    let res
    if (activeTab.value === 'voided') {
      res = await getBreedingBatchVoidedList(queryParams)
    } else {
      res = await getBreedingBatchList(queryParams)
    }
    dataList.value = res.rows || []
    total.value = res.total || 0
  } catch (error) {
    console.error('Failed to fetch list:', error)
  } finally {
    loading.value = false
  }
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleReset = () => {
  queryParams.pageNum = 1
  queryParams.pageSize = 10
  queryParams.batchId = ''
  queryParams.batchName = ''
  queryParams.cropType = ''
  queryParams.varietyName = ''
  setQueryParamsByTab(activeTab.value)
  getList()
}

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

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.dataId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.dataId)) {
      selectedIds.value.push(item.dataId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.dataId)
  }
}

const handleView = (row) => {
  router.push({
    path: `/research/breeding-data/batch/detail/${row.dataId}`,
    query: { from: '/research/breeding-data/batch/approve', tab: activeTab.value }
  })
}

const handleEdit = (row) => {
  router.push({
    path: `/research/breeding-data/batch/edit/${row.dataId}`,
    query: { from: '/research/breeding-data/batch/approve', tab: activeTab.value }
  })
}

const setQueryParamsByTab = (tabName) => {
  switch (tabName) {
    case 'pendingApproval':
      queryParams.workflowStatus = 'S1'
      break
    case 'approved':
      queryParams.workflowStatus = 'S2'
      break
    case 'voided':
      queryParams.workflowStatus = ''
      break
  }
}

const handleTabChange = (tabName) => {
  setQueryParamsByTab(tabName)
  getList()
}

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
    case 'archive':
      handleArchive(row)
      break
    case 'cancelBatch':
      handleCancelBatch(row)
      break
  }
}

const handleSubmitForAudit = async (row) => {
  try {
    if (!userStore.hasWorkflowStatusPermission('submit')) {
      ElMessage.error(t('common.noPermission'))
      return
    }
    await ElMessageBox.confirm(t('research.breedingData.batch.submitConfirm'), t('common.warning'), { type: 'warning' })
    await submitForAudit(row.dataId)
    ElMessage.success(t('research.breedingData.batch.submitSuccess'))
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('research.breedingData.batch.submitFailed'))
    }
  }
}

const handleApprove = async (row) => {
  try {
    if (!userStore.hasWorkflowStatusPermission('approve')) {
      ElMessage.error(t('common.noPermission'))
      return
    }
    await ElMessageBox.confirm(t('research.breedingData.batch.approveConfirm'), t('common.warning'), { type: 'warning' })
    await approveBatch(row.dataId)
    ElMessage.success(t('research.breedingData.batch.approveSuccess'))
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('research.breedingData.batch.approveFailed'))
    }
  }
}

const handleReject = async (row) => {
  try {
    if (!userStore.hasWorkflowStatusPermission('reject')) {
      ElMessage.error(t('common.noPermission'))
      return
    }
    await ElMessageBox.confirm(t('research.breedingData.batch.rejectConfirm'), t('common.warning'), { type: 'warning' })
    await rejectBatch(row.dataId)
    ElMessage.success(t('research.breedingData.batch.rejectSuccess'))
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('research.breedingData.batch.rejectFailed'))
    }
  }
}

const handleArchive = async (row) => {
  try {
    if (!userStore.hasWorkflowStatusPermission('archive')) {
      ElMessage.error(t('common.noPermission'))
      return
    }
    await ElMessageBox.confirm(t('research.breedingData.batch.archiveConfirm'), t('common.warning'), { type: 'warning' })
    await archiveBatch(row.dataId)
    ElMessage.success(t('research.breedingData.batch.archiveSuccess'))
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('research.breedingData.batch.archiveFailed'))
    }
  }
}

const handleCancelBatch = async (row) => {
  try {
    if (!userStore.hasWorkflowStatusPermission('cancel')) {
      ElMessage.error(t('common.noPermission'))
      return
    }
    await ElMessageBox.confirm(t('research.breedingData.batch.cancelConfirm'), t('common.warning'), { type: 'warning' })
    await cancelBatch(row.dataId)
    ElMessage.success(t('research.breedingData.batch.cancelSuccess'))
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('research.breedingData.batch.cancelFailed'))
    }
  }
}

const handleAudit = (row) => {
  router.push({
    path: `/research/breeding-data/batch/audit/${row.dataId}`,
    query: { mode: 'audit', from: '/research/breeding-data/batch/approve', tab: activeTab.value }
  })
}

onMounted(() => {
  if (route.query.tab) {
    activeTab.value = route.query.tab
  }
  setQueryParamsByTab(activeTab.value)
  getList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
