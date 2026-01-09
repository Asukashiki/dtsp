<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-list-check-2"
        :title="$t('research.breedingData.plot.auditTitle')"
        :subtitle="$t('research.breedingData.plot.auditSubtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem label="Trial ID">
              <el-input
                v-model="queryParams.trialId"
                placeholder="Please enter Trial ID"
                clearable
                class="search-input">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem label="Batch ID">
              <el-select
                v-model="queryParams.batchId"
                placeholder="Please select Batch ID"
                clearable
                class="filter-select">
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
          :title="$t('research.breedingData.plot.auditList')"
          icon="ri-file-list-3-line"
          :no-padding="true">
          
          <!-- 状态标签页 -->
          <StatusTabs
            v-model="activeTab"
            :tabs="tabConfig"
            @tab-change="handleTabChange" />

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="dataList" stripe v-loading="loading">
              <!-- 复选框列 -->
              <el-table-column type="selection" width="55" align="center" />
              
              <el-table-column prop="plotId" label="Plot ID" min-width="180" show-overflow-tooltip />
              <el-table-column prop="trialId" label="Trial ID" min-width="160" show-overflow-tooltip />
              <el-table-column prop="batchId" label="Batch ID" min-width="160" show-overflow-tooltip />
              <el-table-column prop="replicationNo" label="Replication No" min-width="120" />
              <el-table-column prop="rowNo" label="Row No" min-width="100" />
              <el-table-column prop="columnNo" label="Column No" min-width="110" />
              <el-table-column prop="varietyCode" label="Variety Code" min-width="130" show-overflow-tooltip />
              <el-table-column prop="sowingTime" label="Sowing Date" min-width="140">
                <template #default="{ row }">
                  {{ formatDateTime(row.sowingTime) }}
                </template>
              </el-table-column>
              <el-table-column prop="auditStatus" :label="$t('research.breedingData.plot.columns.auditStatus')" min-width="120">
                <template #default="{ row }">
                  <el-tag :type="row.auditStatus === 'S2' ? 'success' : (row.auditStatus === 'S10' ? 'danger' : 'warning')">
                    {{ getStatusLabel(row.auditStatus) }}
                  </el-tag>
                </template>
              </el-table-column>
              
              <!-- 待审核标签页显示创建人和创建时间 -->
              <template v-if="activeTab === 'pendingApproval'">
                <el-table-column prop="createdName" :label="$t('research.breedingData.plot.columns.createdBy')" min-width="100" />
                <el-table-column prop="createTime" :label="$t('research.breedingData.plot.columns.createTime')" min-width="120" />
              </template>
              
              <!-- 已审核标签页显示审核人和审核时间 -->
              <template v-else>
                <el-table-column prop="auditedName" :label="$t('research.breedingData.plot.columns.auditedBy')" min-width="100" />
                <el-table-column prop="auditTime" :label="$t('research.breedingData.plot.columns.auditTime')" min-width="120" />
              </template>
              
              <el-table-column :label="$t('research.breedingData.plot.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="row.auditStatus"
                    mode="list"
                    :show-audit="activeTab === 'pendingApproval'"
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
import StatusTabs from '@/components/workflow/StatusTabs.vue'
import ActionButtons from '@/components/workflow/ActionButtons.vue'
import { getPlotInfoList, getBreedingBatchOptions, cancelPlotAuditRecord } from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'

const { t } = useI18n()
const router = useRouter()
const { options: dictOptions } = useDict('flow_status')

const activeTab = ref('pendingApproval')
const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const batchOptions = ref([])

// Tab configuration
const tabConfig = [
  {
    name: 'pendingApproval',
    label: 'research.breedingData.plot.pendingAudit',
    icon: 'ri-time-line'
  },
  {
    name: 'approved',
    label: 'research.breedingData.plot.audited',
    icon: 'ri-check-line'
  },
  {
    name: 'voided',
    label: 'research.breedingData.plot.voided',
    icon: 'ri-forbid-line'
  }
]

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  trialId: '',
  batchId: '',
  auditStatus: 'S1'
})

// 统一日期时间格式化，兼容字符串/时间戳/ISO
const formatDateTime = (val) => {
  if (!val) return '-'
  if (typeof val === 'string') {
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(val)) return val
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val
  }
  const d = new Date(val)
  if (isNaN(d.getTime())) return val || '-'
  const pad = (n) => (n < 10 ? `0${n}` : `${n}`)
  const Y = d.getFullYear()
  const M = pad(d.getMonth() + 1)
  const D = pad(d.getDate())
  const h = pad(d.getHours())
  const m = pad(d.getMinutes())
  const s = pad(d.getSeconds())
  return `${Y}-${M}-${D} ${h}:${m}:${s}`
}

const getList = async () => {
  loading.value = true
  try {
    // 由服务端根据 auditStatus 精确筛选（S1/S2/S10）
    const res = await getPlotInfoList(queryParams)
    const rows = res.rows || []
    dataList.value = rows
    total.value = res.total || rows.length || 0
  } finally {
    loading.value = false
  }
}

const getBatchOptions = async () => {
  const res = await getBreedingBatchOptions()
  batchOptions.value = res.data || []
}

const handleTabChange = (tabName) => {
  // 根据标签页名称设置审核状态
  if (tabName === 'pendingApproval') {
    queryParams.auditStatus = 'S1'
  } else if (tabName === 'approved') {
    queryParams.auditStatus = 'S2'
  } else if (tabName === 'voided') {
    queryParams.auditStatus = 'S10'
  }
  queryParams.pageNum = 1
  getList()
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleReset = () => {
  queryParams.trialId = ''
  queryParams.batchId = ''
  queryParams.pageNum = 1
  getList()
}

// 统一的动作处理方法
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
  router.push({
    name: 'PlotAuditReview',
    params: { plotId: row.plotId }
  })
}

const handleView = (row) => {
  router.push({
    name: 'PlotAuditReview',
    params: { plotId: row.plotId },
    query: { readonly: 'true' }
  })
}

const getStatusLabel = (status) => {
  const list = (dictOptions.value && dictOptions.value.flow_status) ? dictOptions.value.flow_status : []
  const dict = list.find(d => String(d.value) === String(status))
  return dict ? dict.label : status
}

const handleCancelAuditRecord = async (row) => {
  try {
    await ElMessageBox.confirm(t('research.breedingData.plot.cancelConfirm'), t('common.confirm'), {
      type: 'warning'
    })
    await cancelPlotAuditRecord({ plotId: row.plotId })
    // 标记当前行，以便回到 S2 也能识别已作废审核记录
    row._auditCanceled = true
    ElMessage.success(t('research.breedingData.plot.cancelSuccess'))
    // 保持在当前"已审核(S2)"列表，刷新后被作废的记录将不再出现（后端已将状态改为 S10）
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || t('common.operationFailed'))
    }
  }
}

onMounted(() => {
  getList()
  getBatchOptions()
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
