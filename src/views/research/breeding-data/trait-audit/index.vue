<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-leaf-line"
        :title="$t('trait-audit.title')"
        :subtitle="$t('trait-audit.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('trait.growthStage')">
              <el-select
                v-model="queryParams.growthStage"
                :placeholder="$t('trait-audit.pleaseSelect')"
                clearable
                class="filter-select">
                <el-option v-for="item in options.growth_cycle || []" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard
          :title="$t('trait-audit.listName')"
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
              <el-table-column prop="plotId" :label="$t('trait-audit.plotId')" min-width="140" show-overflow-tooltip />
              <el-table-column prop="trialId" :label="$t('trait-audit.trialId')" min-width="140" show-overflow-tooltip />
              <el-table-column prop="batchId" :label="$t('trait-audit.batchId')" min-width="140" show-overflow-tooltip />
              <el-table-column prop="observationDate" :label="$t('trait-audit.observationDate')" min-width="160" />
              <el-table-column prop="growthStage" :label="$t('trait-audit.growthStage')" min-width="120">
                <template #default="{ row }">
                  {{ getLabelByValue('growth_cycle', row.growthStage) || row.growthStage }}
                </template>
              </el-table-column>
              <!-- 性状数量列 -->
              <el-table-column :label="$t('trait-audit.traitCount')" min-width="100" align="center">
                <template #default="{ row }">
                  <el-tag type="success" v-loading="detailLoading[row.recordId || row.traitId]">
                    {{ row.traitDetailLength || 0 }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('trait-audit.auditStatus')" min-width="140">
                <template #default="{ row }">
                  <el-tag :type="getWorkflowStatusType(mapStatusToWorkflowStatus(row.auditStatus))" effect="plain">
                    {{ getLabelByValue('flow_status', mapStatusToWorkflowStatus(row.auditStatus)) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="createBy" :label="$t('trait-audit.submitter')" min-width="120" show-overflow-tooltip />
              <el-table-column prop="createTime" :label="$t('trait-audit.submitTime')" min-width="160" />
              <el-table-column :label="$t('trait-audit.operations')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="mapStatusToWorkflowStatus(row.auditStatus)"
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

          <!-- 移动端卡片 -->
          <div class="mobile-card-list mobile-only">
            <div v-for="item in dataList" :key="item.recordId" class="mobile-card">
              <div class="mobile-card-header">
                <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
                <div class="mobile-card-title">
                  <i class="ri-plant-line"></i>
                  <span>{{ item.recordId }}</span>
                </div>
              </div>
              <div class="mobile-card-body">
                <div class="mobile-card-row">
                  <span class="label">{{ $t('trait-audit.mobileLabels.plotId') }}:</span>
                  <span class="value">{{ item.plotId }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('trait-audit.mobileLabels.observationDate') }}:</span>
                  <span class="value">{{ item.observationDate }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('trait-audit.mobileLabels.growthStage') }}:</span>
                  <span class="value">{{ getLabelByValue('growth_cycle', item.growthStage) || item.growthStage }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('trait-audit.mobileLabels.traitCount') }}:</span>
                  <span class="value" v-loading="detailLoading[item.recordId || item.traitId]">
                    {{ item.traitDetailLength || 0 }}
                  </span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('trait-audit.auditStatus') }}:</span>
                  <el-tag :type="getWorkflowStatusType(mapStatusToWorkflowStatus(item.auditStatus))" effect="plain" size="small">
                    {{ getLabelByValue('flow_status', mapStatusToWorkflowStatus(item.auditStatus)) }}
                  </el-tag>
                </div>
              </div>
              <div class="mobile-card-footer">
                <ActionButtons
                  :workflow-status="mapStatusToWorkflowStatus(item.auditStatus)"
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
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { getAgronomicTraitAuditList, getBatchOptions, getTrialOptions, getTraitRecordInfo } from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import StatusTabs from '@/components/workflow/StatusTabs.vue'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const { options, getLabelByValue } = useDict(['growth_cycle', 'flow_status'])

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const batchOptions = ref([])
const trialOptions = ref([])
const detailLoading = ref({})
const traitDetailLengthCache = ref({})
const selectedIds = ref([])
const activeTab = ref('pendingApproval')

// Tab configuration
const tabConfig = [
  {
    name: 'pendingApproval',
    label: 'trait-audit.tabs.pendingApproval',
    icon: 'ri-time-line'
  },
  {
    name: 'approved',
    label: 'trait-audit.tabs.approved',
    icon: 'ri-check-line'
  },
  {
    name: 'voided',
    label: 'trait-audit.tabs.voided',
    icon: 'ri-forbid-line'
  }
]

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  batchId: '',
  trialId: '',
  growthStage: '',
  auditStatus: ''
})

/**
 * 将后端返回的字符串状态映射为标准工作流状态码
 * @param {string} status - 后端返回的状态（pending, approved, rejected, voided 等）
 * @returns {string} 标准状态码（S0-S10）
 */
const mapStatusToWorkflowStatus = (status) => {
  const statusMap = {
    'pending': 'S1',      // 待审批
    'submitted': 'S1',    // 已提交（待审批）
    'approved': 'S2',     // 已审批
    'rejected': 'S3',     // 已驳回
    'voided': 'S10',      // 已作废
    'invalid': 'S10',     // 已作废
    'cancelled': 'S10'    // 已作废
  }
  return statusMap[status] || 'S1'
}

// 工作流状态标签类型映射
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

// 获取性状审核列表
const getList = async () => {
  // 已作废标签页暂不对接接口
  if (activeTab.value === 'voided') {
    dataList.value = []
    total.value = 0
    loading.value = false
    return
  }

  loading.value = true
  try {
    const res = await getAgronomicTraitAuditList(queryParams)
    dataList.value = res.data?.list || [];
    total.value = res.data?.total || 0;

    for (const item of dataList.value) {
      const recordUniqueId = item.recordId || item.traitId
      if (traitDetailLengthCache.value[recordUniqueId] !== undefined) {
        item.traitDetailLength = traitDetailLengthCache.value[recordUniqueId]
        continue
      }

      detailLoading.value[recordUniqueId] = true
      try {
        const traitDetailRes = await getTraitRecordInfo(recordUniqueId)
        if (traitDetailRes.code === 200 && traitDetailRes.data) {
          item.traitDetailLength = traitDetailRes.data.detailList?.length || 0
          traitDetailLengthCache.value[recordUniqueId] = item.traitDetailLength
        } else {
          item.traitDetailLength = 0
          traitDetailLengthCache.value[recordUniqueId] = 0
        }
      } catch (error) {
        console.error(`加载性状记录【${recordUniqueId}】明细失败:`, error)
        item.traitDetailLength = 0
        traitDetailLengthCache.value[recordUniqueId] = 0
      } finally {
        detailLoading.value[recordUniqueId] = false
      }
    }
  } catch (error) {
    console.error('获取性状审核列表失败:', error)
    ElMessage.error(t('trait-audit.message.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 获取批次选项
const loadBatchOptions = async () => {
  try {
    const res = await getBatchOptions()
    batchOptions.value = res.data || []
  } catch (error) {
    console.error('获取批次选项失败:', error)
  }
}

// 获取试验选项
const loadTrialOptions = async () => {
  try {
    const res = await getTrialOptions()
    trialOptions.value = res.data || []
  } catch (error) {
    console.error('获取试验选项失败:', error)
  }
}

// 搜索查询
const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

// 重置筛选条件
const handleReset = () => {
  queryParams.pageNum = 1
  queryParams.pageSize = 10
  queryParams.batchId = ''
  queryParams.trialId = ''
  queryParams.growthStage = ''
  setQueryParamsByTab(activeTab.value)
  getList()
}

// 根据标签页设置查询参数
const setQueryParamsByTab = (tabName) => {
  switch (tabName) {
    case 'pendingApproval':
      queryParams.auditStatus = 'pending'
      break
    case 'approved':
      queryParams.auditStatus = 'approved'
      break
    case 'voided':
      // 已作废标签页：暂不对接接口，保留UI结构
      queryParams.auditStatus = 'voided'
      break
  }
}

// 标签页切换
const handleTabChange = (tabName) => {
  setQueryParamsByTab(tabName)
  getList()
}

// 表格选择变化
const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.recordId || item.traitId)
}

// 移动端选择
const handleMobileSelect = (item) => {
  const id = item.recordId || item.traitId
  if (item.checked) {
    if (!selectedIds.value.includes(id)) {
      selectedIds.value.push(id)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(selectedId => selectedId !== id)
  }
}

// 统一动作处理
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

// 进入审核页面
const handleAudit = (row) => {
  router.push({
    name: 'AgronomicTraitDataAuditReview',
    params: { traitId: row.traitId || row.recordId },
    query: { from: '/research/breeding-data/trait-audit', tab: activeTab.value }
  })
}

// 查看详情
const handleView = (row) => {
  router.push({
    name: 'AgronomicTraitDataAuditReview',
    params: { traitId: row.traitId || row.recordId },
    query: { from: '/research/breeding-data/trait-audit', tab: activeTab.value }
  })
}

onMounted(() => {
  if (route.query.tab) {
    activeTab.value = route.query.tab
  }
  setQueryParamsByTab(activeTab.value)
  loadBatchOptions()
  loadTrialOptions()
  getList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>