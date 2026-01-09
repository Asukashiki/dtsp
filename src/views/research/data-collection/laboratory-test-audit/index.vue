<template>
  <div class="page-container">
    <div v-if="!showDetailPage" class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-file-check-line"
        :title="$t('research.dataCollection.laboratoryTest.auditTitle')"
        :subtitle="$t('research.dataCollection.laboratoryTest.auditSubtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('research.dataCollection.laboratoryTest.form.sampleId')">
              <el-input
                v-model="queryParams.sampleId"
                :placeholder="$t('research.dataCollection.laboratoryTest.form.sampleId')"
                clearable
                class="search-input">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('research.dataCollection.laboratoryTest.form.batchId')">
              <el-select
                v-model="queryParams.batchId"
                :placeholder="$t('research.dataCollection.laboratoryTest.form.batchId')"
                filterable
                clearable
                class="search-input">
                <el-option
                  v-for="item in batchOptions"
                  :key="item.batchId"
                  :label="item.batchId"
                  :value="item.batchId" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard
          :title="$t('research.dataCollection.laboratoryTest.auditList')"
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
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column
                prop="sampleId"
                :label="$t('research.dataCollection.laboratoryTest.form.sampleId')"
                min-width="150"
                show-overflow-tooltip />
              <el-table-column
                prop="batchId"
                :label="$t('research.dataCollection.laboratoryTest.form.batchId')"
                min-width="150"
                show-overflow-tooltip />
              <el-table-column
                prop="trialId"
                :label="$t('research.dataCollection.laboratoryTest.form.trialId')"
                min-width="150"
                show-overflow-tooltip />
              <el-table-column
                prop="sampleType"
                :label="$t('research.dataCollection.laboratoryTest.form.sampleType')"
                min-width="120" />
              <el-table-column
                prop="testDate"
                :label="$t('research.dataCollection.laboratoryTest.form.testDate')"
                min-width="120" />
              <el-table-column
                prop="passFailFlag"
                :label="$t('research.dataCollection.laboratoryTest.form.testStatus')"
                min-width="100">
                <template #default="{ row }">
                  <el-tag v-if="row.passFailFlag === 'true' || row.passFailFlag === true" type="success">Pass</el-tag>
                  <el-tag v-else-if="row.passFailFlag === 'false' || row.passFailFlag === false" type="danger">Fail</el-tag>
                  <span v-else>-</span>
                </template>
              </el-table-column>
              <el-table-column
                v-if="activeTab === 'pendingApproval'"
                prop="createdByName"
                :label="$t('common.createdBy')"
                min-width="100" />
              <el-table-column
                v-if="activeTab === 'pendingApproval'"
                prop="createdTime"
                :label="$t('common.createdTime')"
                min-width="160" />
              <el-table-column
                v-if="activeTab !== 'pendingApproval'"
                prop="approveByName"
                :label="$t('common.approver')"
                min-width="100" />
              <el-table-column
                v-if="activeTab !== 'pendingApproval'"
                prop="approveTime"
                :label="$t('common.approveTime')"
                min-width="160" />
              <el-table-column :label="$t('common.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="row.workflowStatus || 'S1'"
                    mode="list"
                    :show-audit="activeTab === 'pendingApproval'"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="queryParams.pageNum"
                v-model:page-size="queryParams.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="getList"
                @current-change="getList" />
            </div>
          </div>

          <!-- 移动端卡片 -->
          <div class="mobile-card-list mobile-only">
            <div v-for="item in dataList" :key="item.dataId" class="mobile-card">
              <div class="mobile-card-header">
                <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
                <div class="mobile-card-title">
                  <i class="ri-test-tube-line"></i>
                  <span>{{ item.sampleId }}</span>
                </div>
              </div>
              <div class="mobile-card-body">
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.batchId') }}:</span>
                  <span class="value">{{ item.batchId }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.trialId') }}:</span>
                  <span class="value">{{ item.trialId }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.dataCollection.laboratoryTest.form.testStatus') }}:</span>
                  <el-tag v-if="item.passFailFlag === 'true' || item.passFailFlag === true" type="success" size="small">Pass</el-tag>
                  <el-tag v-else-if="item.passFailFlag === 'false' || item.passFailFlag === false" type="danger" size="small">Fail</el-tag>
                  <span v-else>-</span>
                </div>
              </div>
              <div class="mobile-card-footer">
                <ActionButtons
                  :workflow-status="item.workflowStatus || 'S1'"
                  mode="list"
                  :show-audit="activeTab === 'pendingApproval'"
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
                @current-change="getList" />
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
    <AuditDetailPage v-else :detailData="currentRow" :activeTab="activeTab" :isAudit="isAuditAction"
      @back="showDetailPage = false" @approve="handleApprove" @reject="handleReject" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import StatusTabs from '@/components/workflow/StatusTabs.vue'
import ActionButtons from '@/components/workflow/ActionButtons.vue'
import { getLabTestAuditList, approveLabTest, rejectLabTest, cancelLabTestAudit } from '@/api/labTest'
import { getBatchOptions } from '@/api/breedingData'
import AuditDetailPage from './detail.vue'

const { t } = useI18n()

const activeTab = ref('pendingApproval')
const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const batchOptions = ref([])
const currentRow = ref(null)
const selectedIds = ref([])

const showDetailPage = ref(false)
const isAuditAction = ref(false)

// Tab configuration
const tabConfig = [
  {
    name: 'pendingApproval',
    label: 'research.dataCollection.laboratoryTest.pendingAudit',
    icon: 'ri-time-line'
  },
  {
    name: 'approved',
    label: 'research.dataCollection.laboratoryTest.audited',
    icon: 'ri-check-line'
  },
  {
    name: 'voided',
    label: 'research.dataCollection.laboratoryTest.canceled',
    icon: 'ri-forbid-line'
  }
]

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  sampleId: '',
  batchId: '',
  workflowStatus: 'S1',
  auditCanceled: 0
})

const getList = async () => {
  loading.value = true
  try {
    const res = await getLabTestAuditList(queryParams)
    // 支持多种返回格式：rows(TableDataInfo), list, 或直接data数组
    const rows = res.rows || res.data?.rows || res.data?.list || res.data || []
    dataList.value = rows
    total.value = res.total || res.data?.total || rows.length || 0
  } finally {
    loading.value = false
  }
}

const getBatchOptionsList = async () => {
  const res = await getBatchOptions()
  batchOptions.value = res.data || []
}

const setQueryParamsByTab = (tabName) => {
  switch (tabName) {
    case 'pendingApproval':
      queryParams.workflowStatus = 'S1'
      queryParams.auditCanceled = 0
      break
    case 'approved':
      queryParams.workflowStatus = 'S2'
      queryParams.auditCanceled = 0
      break
    case 'voided':
      queryParams.workflowStatus = 'S2'
      queryParams.auditCanceled = 1
      break
  }
}

const handleTabChange = (tabName) => {
  setQueryParamsByTab(tabName)
  queryParams.pageNum = 1
  getList()
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleReset = () => {
  queryParams.sampleId = ''
  queryParams.batchId = ''
  queryParams.pageNum = 1
  getList()
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

const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
    case 'audit':
      handleAudit(row)
      break
  }
}

const handleAudit = (row) => {
  currentRow.value = row
  isAuditAction.value = true
  showDetailPage.value = true
}

const handleView = (row) => {
  currentRow.value = row
  isAuditAction.value = false
  showDetailPage.value = true
}

const handleApprove = async ({ dataId, auditOpinion }) => {
  try {
    await approveLabTest({ dataId, auditOpinion })
    ElMessage.success(t('research.dataCollection.laboratoryTest.approveSuccess'))
    showDetailPage.value = false
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || t('common.operationFailed'))
    }
  }
}

const handleReject = async ({ dataId, auditOpinion }) => {
  try {
    await rejectLabTest({ dataId, auditOpinion })
    ElMessage.success(t('research.dataCollection.laboratoryTest.rejectSuccess'))
    showDetailPage.value = false
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || t('common.operationFailed'))
    }
  }
}

const handleCancelAuditRecord = async (row) => {
  try {
    await ElMessageBox.confirm(t('research.dataCollection.laboratoryTest.cancelConfirm'), t('common.confirm'), {
      type: 'warning'
    })
    await cancelLabTestAudit({ dataId: row.dataId })
    ElMessage.success(t('research.dataCollection.laboratoryTest.cancelSuccess'))
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || t('common.operationFailed'))
    }
  }
}

onMounted(() => {
  setQueryParamsByTab(activeTab.value)
  getList()
  getBatchOptionsList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
