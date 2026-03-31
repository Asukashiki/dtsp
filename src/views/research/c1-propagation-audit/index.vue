<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader icon="ri-checkbox-circle-line" :title="$t('research.menu.c1SeedPropagationApplicationAudit')"
        :subtitle="$t('research.menu.c1SeedPropagationApplicationAuditSubtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="loadData" @reset="handleReset">
            <SearchItem :label="$t('research.c1Propagation.searchPlaceholder')">
              <el-input v-model="searchQuery" :placeholder="$t('research.c1Propagation.searchPlaceholder')" clearable
                @clear="loadData"
@keyup.enter="loadData">
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('research.c1Propagation.form.applyStatus')">
              <el-select v-model="statusFilter" :placeholder="$t('research.c1Propagation.form.applyStatus')" clearable
                @change="loadData">
                <el-option label="All" value="" />
                <el-option label="Pending" value="pending" />
                <el-option label="Approved" value="approved" />
                <el-option label="Rejected" value="rejected" />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('common.dateRange')">
              <el-date-picker v-model="dateRange" type="daterange" range-separator="-"
                :start-placeholder="$t('common.startDate')" :end-placeholder="$t('common.endDate')" clearable
                value-format="YYYY-MM-DD"
@change="loadData" />
            </SearchItem>
          </SearchForm>
          </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('research.c1Propagation.list')" icon="ri-file-list-3-line" :no-padding="true">



          <!-- 状态标签页 -->
          <StatusTabs v-model="activeTab" :tabs="tabConfig" @tab-change="handleTabChange" />

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="dataList" stripe v-loading="loading">
              <el-table-column prop="applicantOrgName" :label="$t('research.c1Propagation.columns.applicantOrgName')"
                min-width="160" show-overflow-tooltip />
              <el-table-column prop="authId" :label="$t('research.c1Propagation.columns.authId')" min-width="140"
                show-overflow-tooltip>
                <template #default="{ row }">
                  {{ row.authId || '-' }}
                </template>
              </el-table-column>
              <el-table-column prop="cropType" :label="$t('research.c1Propagation.columns.cropType')" min-width="160"
                align="center">
                <template #default="{ row }">
                  {{ getCropTypeDisplay(row.cropType) }}
                </template>
              </el-table-column>
              <el-table-column prop="varietyName" :label="$t('research.c1Propagation.columns.varietyName')"
                min-width="120" show-overflow-tooltip />
              <el-table-column prop="demandQuantity" :label="$t('research.c1Propagation.form.demandQuantity')"
                min-width="120" align="center">
                <template #default="{ row }">
                  <span style="font-weight: 500; color: #009A44;">{{ row.demandQuantity || '-' }}</span>
                  <span v-if="row.demandQuantity" style="margin-left: 4px; color: #909399; font-size: 12px;">kg</span>
                </template>
              </el-table-column>
              <el-table-column prop="sourceType" :label="$t('research.c1Propagation.sourceType')" min-width="140"
                align="center">
                <template #default="{ row }">
                  <el-tag v-if="row.sourceType" :type="row.sourceType === 'OSE_RECEIVE' ? 'success' : 'primary'"
                    size="small">
                    {{ row.sourceType === 'OSE_RECEIVE' ? $t('research.c1Propagation.sourceOseReceive') :
                      $t('research.c1Propagation.sourceOseBatch') }}
                  </el-tag>
                  <span v-else style="color: #909399;">-</span>
                </template>
              </el-table-column>
              <el-table-column prop="applyDate" :label="$t('research.c1Propagation.columns.applyDate')" min-width="160"
                align="center" />
              <el-table-column prop="applyStatus" :label="$t('research.c1Propagation.columns.applyStatus')"
                min-width="160" align="center">
                <template #default="{ row }">
                  <el-tag :type="getStatusType(row.applyStatus)" size="small">
                    {{ $t(`research.c1Propagation.status.${row.applyStatus}`) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="auditor" :label="$t('research.c1Propagation.columns.auditor')" min-width="160"
                align="center" show-overflow-tooltip />
              <el-table-column prop="auditTime" :label="$t('research.c1Propagation.columns.auditTime')" min-width="150"
                align="center" />
              <el-table-column :label="$t('research.c1Propagation.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons workflow-status="S0" mode="list" :custom-buttons="getActionButtons(row)"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
          </div>
        </InfoCard>

        <!-- 移动端卡片 -->
        <div class="mobile-card-list mobile-only" v-loading="loading">
          <div v-for="item in dataList" :key="item.id" class="mobile-card" @click="handleView(item)">
            <div class="mobile-card-header">
              <el-tag :type="getStatusType(item.applyStatus)" size="small">
                {{ $t(`research.c1Propagation.status.${item.applyStatus}`) }}
              </el-tag>
              <el-tag type="info" size="small">{{ getCropTypeDisplay(item.cropType) }}</el-tag>
              <el-tag v-if="item.sourceType" :type="item.sourceType === 'OSE_RECEIVE' ? 'success' : 'primary'"
                size="small">
                {{ item.sourceType === 'OSE_RECEIVE' ? $t('research.c1Propagation.sourceOseReceive') :
                  $t('research.c1Propagation.sourceOseBatch') }}
              </el-tag>
              <el-tag v-if="item.authId" type="success" size="small">{{ item.authId }}</el-tag>
            </div>
            <div class="mobile-card-title">
              <i class="ri-building-line"></i>
              <span>{{ item.applicantOrgName }}</span>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.c1Propagation.columns.varietyName') }}</span>
                <span class="value">{{ item.varietyName }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.c1Propagation.form.demandQuantity') }}</span>
                <span class="value" style="color: #009A44; font-weight: 500;">
                  {{ item.demandQuantity || '-' }}<span v-if="item.demandQuantity"
                    style="color: #909399; font-size: 12px;"> kg</span>
                </span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.c1Propagation.columns.applyDate') }}</span>
                <span class="value">{{ item.applyDate }}</span>
              </div>
            </div>
            <div class="mobile-card-footer">
              <span class="create-time">{{ item.createdTime }}</span>
              <div class="card-actions" @click.stop v-if="item.applyStatus === 'pending'">
                <el-button type="primary" size="small" @click="handleAudit(item)">
                  <i class="ri-checkbox-circle-line"></i> {{ $t('research.c1Propagation.audit') }}
                </el-button>
              </div>
            </div>
          </div>

          <div v-if="dataList.length === 0 && !loading" class="empty-state">
            <i class="ri-inbox-line"></i>
            <p>{{ $t('home.noData') }}</p>
          </div>

          <div class="pagination-wrapper">
            <el-pagination v-model:current-page="currentPage" :total="total" :page-size="pageSize"
              layout="prev, pager, next" small @current-change="handleCurrentChange" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getC1PropagationAllList } from '@/api/c1Propagation'
import { useDict } from '@/hooks/useDict'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import StatusTabs from '@/components/workflow/StatusTabs.vue'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const router = useRouter()
const { t } = useI18n()

// 使用 useDict hook 获取字典数据
const { getLabelByValue } = useDict(['crop_type'])
const getCropTypeDisplay = (value) => getLabelByValue('crop_type', value) || value || '-'

// 数据状态
const loading = ref(false)
const dataList = ref([])
const searchQuery = ref('')
const statusFilter = ref('')
const dateRange = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const activeTab = ref('pending')

// Tab configuration
const tabConfig = [
  {
    name: 'pending',
    label: 'research.c1Propagation.tabs.pending',
    icon: 'ri-time-line'
  },
  {
    name: 'approved',
    label: 'research.c1Propagation.tabs.approved',
    icon: 'ri-check-line'
  },
  {
    name: 'rejected',
    label: 'research.c1Propagation.tabs.rejected',
    icon: 'ri-close-line'
  }
]

// 统计数据
const pendingCount = computed(() => dataList.value.filter(item => item.applyStatus === 'pending').length)
const approvedCount = computed(() => dataList.value.filter(item => item.applyStatus === 'approved').length)
const rejectedCount = computed(() => dataList.value.filter(item => item.applyStatus === 'rejected').length)

// 获取状态类型
const getStatusType = (status) => {
  const types = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return types[status] || 'info'
}

// 获取操作按钮配置
const getActionButtons = (row) => {
  const buttons = []

  switch (row.applyStatus) {
    case 'pending':
      // 待审核:显示审核和查看按钮
      buttons.push({ type: 'primary', action: 'audit', label: 'audit', icon: 'ri-check-line' })
      buttons.push({ type: '', action: 'view', label: 'view', icon: 'ri-eye-line' })
      break

    case 'approved':
    case 'rejected':
      // 已审核:只显示查看按钮
      buttons.push({ type: 'primary', action: 'view', label: 'view', icon: 'ri-eye-line' })
      break
  }

  return buttons
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchQuery.value,
      applyStatus: statusFilter.value || (activeTab.value !== 'all' ? activeTab.value : '')
    }
    
    if (dateRange.value && dateRange.value.length === 2) {
      params.queryDateStart = dateRange.value[0]
      params.queryDateEnd = dateRange.value[1]
    }

    const res = await getC1PropagationAllList(params)
    if (res.code === 200) {
      dataList.value = res.data?.list || []
      total.value = res.data?.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 处理重置
const handleReset = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  dateRange.value = []
  currentPage.value = 1
  loadData()
}

// 处理分页
const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
  loadData()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  loadData()
}

// 处理标签页切换
const handleTabChange = (tabName) => {
  activeTab.value = tabName
  currentPage.value = 1
  loadData()
}

// 操作处理
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

const handleView = (row) => {
  router.push(`/research/c1-propagation-audit/detail/${row.id}`)
}

const handleAudit = (row) => {
  router.push(`/research/c1-propagation-audit/audit/${row.id}`)
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

.mobile-card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 12px 0;
  
    i {
      color: #009A44;
    }
}

.mobile-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.create-time {
  font-size: 12px;
  color: #909399;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #909399;
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 12px;
  display: block;
}
</style>
