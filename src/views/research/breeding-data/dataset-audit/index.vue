<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-shield-check-line"
        :title="$t('research.datasetAudit.title')"
        :subtitle="$t('research.datasetAudit.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('research.datasetAudit.columns.varietyName')">
              <el-input
                v-model="searchParams.keyword"
                :placeholder="$t('research.datasetAudit.searchPlaceholder')"
                clearable
                class="search-input">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('research.datasetAudit.columns.datasetStatus')">
              <el-select
                v-model="searchParams.datasetStatus"
                :placeholder="$t('research.datasetAudit.filterByDatasetStatus')"
                clearable
                class="filter-select">
                <el-option :label="$t('research.datasetCompilation.status.draft')" value="draft" />
                <el-option :label="$t('research.datasetCompilation.status.submitted')" value="submitted" />
                <el-option :label="$t('research.datasetCompilation.status.reviewing')" value="reviewing" />
                <el-option :label="$t('research.datasetCompilation.status.approved')" value="approved" />
                <el-option :label="$t('research.datasetCompilation.status.rejected')" value="rejected" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard
          :title="$t('research.datasetAudit.list')"
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
                prop="datasetCode"
                :label="$t('research.datasetAudit.columns.datasetCode')"
                min-width="150"
                show-overflow-tooltip />
              <el-table-column
                prop="datasetId"
                :label="$t('research.datasetAudit.columns.datasetId')"
                min-width="120"
                show-overflow-tooltip />
              <el-table-column
                prop="trialId"
                :label="$t('research.datasetAudit.columns.trialId')"
                min-width="120"
                show-overflow-tooltip />
              <el-table-column
                prop="batchId"
                :label="$t('research.datasetAudit.columns.batchId')"
                min-width="150"
                show-overflow-tooltip />
              <el-table-column
                prop="varietyName"
                :label="$t('research.datasetAudit.columns.varietyName')"
                min-width="120" />
              <el-table-column
                prop="versionNo"
                :label="$t('research.datasetAudit.columns.versionNo')"
                min-width="100" />
              <el-table-column
                prop="recordCount"
                :label="$t('research.datasetAudit.columns.recordCount')"
                min-width="100"
                align="center" />
              <el-table-column
                prop="datasetStatus"
                :label="$t('research.datasetAudit.columns.datasetStatus')"
                min-width="110"
                align="center">
                <template #default="{ row }">
                  <el-tag :type="getDatasetStatusType(row.datasetStatus)">
                    {{ $t(`research.datasetCompilation.status.${row.datasetStatus}`) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="auditStatus"
                :label="$t('research.datasetAudit.columns.auditStatus')"
                min-width="110"
                align="center">
                <template #default="{ row }">
                  <el-tag :type="getAuditStatusType(row.auditStatus)">
                    {{ $t(`research.datasetAudit.auditStatus.${row.auditStatus}`) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="auditorName"
                :label="$t('research.datasetAudit.columns.auditorName')"
                min-width="100"
                show-overflow-tooltip />
              <el-table-column
                prop="auditTime"
                :label="$t('research.datasetAudit.columns.auditTime')"
                min-width="150" />
              <el-table-column
                prop="submitTime"
                :label="$t('research.datasetAudit.columns.submitTime')"
                min-width="150" />
              <el-table-column :label="$t('common.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="mapAuditStatusToWorkflow(row.auditStatus)"
                    mode="list"
                    :show-audit="activeTab === 'pendingApproval'"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="searchParams.pageNum"
                v-model:page-size="searchParams.pageSize"
                :total="total"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSearch"
                @current-change="handleSearch" />
            </div>
          </div>

          <!-- 移动端卡片 -->
          <div class="mobile-card-list mobile-only">
          <div v-for="item in dataList" :key="item.id" class="mobile-card">
            <div class="mobile-card-header">
              <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
              <div class="mobile-card-title">
                <i class="ri-database-2-line"></i>
                <span>{{ item.datasetCode || '-' }}</span>
              </div>
              <el-tag :type="getAuditStatusType(item.auditStatus)" size="small">
                {{ $t(`research.datasetAudit.auditStatus.${item.auditStatus}`) }}
              </el-tag>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.datasetAudit.columns.datasetId') }}:</span>
                <span class="value">{{ item.datasetId || '-' }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.datasetAudit.columns.varietyName') }}:</span>
                <span class="value">{{ item.varietyName }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.datasetAudit.columns.datasetStatus') }}:</span>
                <span class="value">
                  <el-tag :type="getDatasetStatusType(item.datasetStatus)" size="small">
                    {{ $t(`research.datasetCompilation.status.${item.datasetStatus}`) }}
                  </el-tag>
                </span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.datasetAudit.columns.submitTime') }}:</span>
                <span class="value">{{ item.submitTime || '-' }}</span>
              </div>
            </div>
            <div class="mobile-card-footer">
              <ActionButtons
                :workflow-status="mapAuditStatusToWorkflow(item.auditStatus)"
                mode="list"
                :show-audit="activeTab === 'pendingApproval'"
                @action="(action) => handleAction(item, action)" />
            </div>
          </div>

          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="searchParams.pageNum"
              v-model:page-size="searchParams.pageSize"
              :page-sizes="[10, 20, 50]"
              :total="total"
              layout="total, prev, pager, next"
              small
              @size-change="handleSearch"
              @current-change="handleSearch" />
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
import { ElMessage } from 'element-plus'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import StatusTabs from '@/components/workflow/StatusTabs.vue'
import ActionButtons from '@/components/workflow/ActionButtons.vue'
import { getAuditList } from '@/api/datasetAudit'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const selectedIds = ref([])
const activeTab = ref('pendingApproval')

// Tab configuration
const tabConfig = [
  {
    name: 'pendingApproval',
    label: 'research.datasetAudit.tabs.pendingApproval',
    icon: 'ri-time-line'
  },
  {
    name: 'approved',
    label: 'research.datasetAudit.tabs.approved',
    icon: 'ri-check-line'
  },
  {
    name: 'voided',
    label: 'research.datasetAudit.tabs.voided',
    icon: 'ri-forbid-line'
  }
]

const searchParams = reactive({
  pageNum: 1,
  pageSize: 10,
  keyword: '',
  auditStatus: '',
  datasetStatus: ''
})

const getDatasetStatusType = (status) => {
  const typeMap = {
    draft: '',
    submitted: 'info',
    reviewing: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return typeMap[status] || ''
}

const getAuditStatusType = (status) => {
  const typeMap = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
    needs_revision: 'warning'
  }
  return typeMap[status] || ''
}

// 将审核状态映射为工作流状态
const mapAuditStatusToWorkflow = (auditStatus) => {
  const statusMap = {
    'pending': 'S1',      // 待审批
    'approved': 'S2',     // 审核通过
    'rejected': 'S3',     // 审核驳回
    'needs_revision': 'S3' // 需要修订
  }
  return statusMap[auditStatus] || 'S0'
}

const setQueryParamsByTab = (tabName) => {
  switch (tabName) {
    case 'pendingApproval':
      searchParams.auditStatus = 'pending'
      break
    case 'approved':
      searchParams.auditStatus = 'approved'
      break
    case 'voided':
      searchParams.auditStatus = 'rejected'
      break
  }
}

const loadDataList = async () => {
  loading.value = true
  try {
    const res = await getAuditList(searchParams)
    if (res.code === 200) {
      const originalList = res.data.list || []
      let filteredList = originalList

      const keyword = searchParams.keyword.trim().toLowerCase()
      if (keyword) {
        filteredList = filteredList.filter(item => {
          const varietyName = (item.varietyName || '').toLowerCase()
          return varietyName.includes(keyword)
        })
      }

      if (searchParams.datasetStatus) {
        filteredList = filteredList.filter(item =>
          item.datasetStatus === searchParams.datasetStatus
        )
      }

      if (searchParams.auditStatus) {
        filteredList = filteredList.filter(item =>
          item.auditStatus === searchParams.auditStatus
        )
      }

      dataList.value = filteredList
      total.value = res.data.total || 0
    } else {
      ElMessage.error(res.msg || t('common.loadFailed'))
    }
  } catch (error) {
    console.error('加载数据列表失败：', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  searchParams.pageNum = 1
  loadDataList()
}

const handleReset = () => {
  searchParams.keyword = ''
  searchParams.datasetStatus = ''
  // auditStatus 由标签页控制，不在这里重置
  handleSearch()
}

const handleTabChange = (tabName) => {
  setQueryParamsByTab(tabName)
  loadDataList()
}

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

const handleView = (row) => {
  router.push({
    name: 'DatasetAuditReview',
    params: { id: row.datasetId }
  })
}

const handleAudit = (row) => {
  router.push({
    name: 'DatasetAuditReview',
    params: { id: row.datasetId }
  })
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

onMounted(() => {
  setQueryParamsByTab(activeTab.value)
  loadDataList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
