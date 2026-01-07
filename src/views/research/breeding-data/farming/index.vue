<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-plant-line"
        :title="$t('research.breedingData.farming.title')"
        :subtitle="$t('research.breedingData.farming.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem label="Plot ID">
              <el-select v-model="queryParams.plotId" placeholder="Please select Plot ID" clearable filterable class="filter-select">
                <el-option v-for="item in plotOptions" :key="item.plotId" :label="item.plotId" :value="item.plotId" />
              </el-select>
            </SearchItem>
            <SearchItem label="Activity Type">
              <el-select v-model="queryParams.activityType" placeholder="Please select Activity Type" clearable class="filter-select">
                <el-option v-for="item in activityTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </SearchItem>
            <SearchItem label="Activity Date">
              <el-date-picker v-model="queryParams.activityDate" type="date" placeholder="Select Activity Date" clearable value-format="YYYY-MM-DD" style="width: 100%" />
            </SearchItem>
            <SearchItem label="Audit Status">
              <el-select v-model="queryParams.auditStatus" placeholder="Please select Audit Status" clearable class="filter-select">
                <el-option
                  v-for="dict in dictOptions.flow_status"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('research.breedingData.farming.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('research.breedingData.farming.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="dataList" stripe v-loading="loading" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column prop="farmingRecordId" label="Farming Record ID" min-width="180" show-overflow-tooltip />
              <el-table-column prop="plotId" label="Plot ID" min-width="140" show-overflow-tooltip />
              <el-table-column prop="trialId" label="Trial ID" min-width="140" show-overflow-tooltip />
              <el-table-column prop="batchId" label="Batch ID" min-width="140" show-overflow-tooltip />
              <el-table-column prop="activityDate" label="Activity Date" min-width="160">
                <template #default="{ row }">
                  {{ formatDateTime(row.activityDate) }}
                </template>
              </el-table-column>
              <el-table-column prop="activityType" label="Activity Type" min-width="160" />
              <el-table-column prop="inputName" label="Input Name" min-width="140" show-overflow-tooltip />
              <el-table-column prop="quantity" label="Quantity" min-width="160" />
              <el-table-column prop="unit" label="Unit" min-width="80" />
              <el-table-column prop="auditStatus" label="Audit Status" min-width="160">
                <template #default="{ row }">
                  <dict-tag :options="dictOptions.flow_status" :value="row.workflowStatus || row.auditStatus" />
                </template>
              </el-table-column>
              <el-table-column prop="creator" label="Creator" min-width="120" />
              <el-table-column prop="createTime" label="Created Time" min-width="160">
                <template #default="{ row }">
                  {{ formatDateTime(row.createTime) }}
                </template>
              </el-table-column>
              <el-table-column prop="modifier" label="Modifier" min-width="120" />
              <el-table-column prop="updateTime" label="Modified Time" min-width="160">
                <template #default="{ row }">
                  {{ formatDateTime(row.updateTime) }}
                </template>
              </el-table-column>
              <el-table-column prop="auditor" label="Auditor" min-width="120" />
              <el-table-column prop="auditedDatetime" label="Audited Time" min-width="160">
                <template #default="{ row }">
                  {{ formatDateTime(row.auditedDatetime) }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('research.breedingData.farming.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="row.workflowStatus || row.auditStatus || 'S0'"
                    mode="list"
                    :show-audit="false"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination v-model:current-page="queryParams.pageNum" v-model:page-size="queryParams.pageSize" :page-sizes="[10, 20, 50]" :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="getList" @current-change="getList" />
            </div>
          </div>
        </InfoCard>

        <!-- 移动端卡片 -->
        <div class="mobile-card-list mobile-only">
          <div v-for="item in dataList" :key="item.farmingId" class="mobile-card">
            <div class="mobile-card-header">
              <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
              <div class="mobile-card-title"><i class="ri-seedling-line"></i><span>{{ item.activityType }} - {{ formatDateTime(item.activityDate) }}</span></div>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row"><span class="label">Farming Record ID:</span><span class="value">{{ item.farmingRecordId }}</span></div>
              <div class="mobile-card-row"><span class="label">Plot ID:</span><span class="value">{{ item.plotId }}</span></div>
              <div class="mobile-card-row"><span class="label">Trial ID:</span><span class="value">{{ item.trialId }}</span></div>
              <div class="mobile-card-row"><span class="label">Batch ID:</span><span class="value">{{ item.batchId }}</span></div>
              <div class="mobile-card-row"><span class="label">Input Name:</span><span class="value">{{ item.inputName }}</span></div>
              <div class="mobile-card-row"><span class="label">Quantity:</span><span class="value">{{ item.quantity }} {{ item.unit }}</span></div>
              <div class="mobile-card-row"><span class="label">Audit Status:</span><span class="value"><dict-tag :options="dictOptions.flow_status" :value="item.workflowStatus || item.auditStatus" /></span></div>
              <div class="mobile-card-row"><span class="label">Creator:</span><span class="value">{{ item.creator }}</span></div>
              <div class="mobile-card-row"><span class="label">Modifier:</span><span class="value">{{ item.modifier }}</span></div>
              <div class="mobile-card-row"><span class="label">Auditor:</span><span class="value">{{ item.auditor }}</span></div>
              <div class="mobile-card-row"><span class="label">Created Time:</span><span class="value">{{ formatDateTime(item.createTime) }}</span></div>
              <div class="mobile-card-row"><span class="label">Modified Time:</span><span class="value">{{ formatDateTime(item.updateTime) }}</span></div>
              <div class="mobile-card-row"><span class="label">Audited Time:</span><span class="value">{{ formatDateTime(item.auditedDatetime) }}</span></div>
            </div>
            <div class="mobile-card-footer">
              <ActionButtons
                :workflow-status="item.workflowStatus || item.auditStatus || 'S0'"
                mode="list"
                :show-audit="false"
                @action="(action) => handleAction(item, action)" />
            </div>
          </div>
          <div class="pagination-wrapper">
            <el-pagination v-model:current-page="queryParams.pageNum" v-model:page-size="queryParams.pageSize" :total="total" layout="prev, pager, next" small @current-change="getList" />
          </div>
        </div>
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
import { getFarmingRecordList, deleteFarmingRecord, getPlotOptions, submitFarmingRecordForReview } from '@/api/breedingData'
import { cancelFarmingRecord } from '@/api/farmingRecordAudit'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const selectedIds = ref([])
const plotOptions = ref([])
const { options: dictOptions } = useDict('flow_status')

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  plotId: '',
  activityType: '',
  activityDate: '',
  auditStatus: ''
})

// 格式化日期时间为 'YYYY-MM-DD HH:mm:ss'
const formatDateTime = (val) => {
  if (!val) return '-'
  // 若已是符合格式的字符串，直接返回
  if (typeof val === 'string') {
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(val)) return val
    // 纯日期字符串：保持原样返回（后端若未存时分秒，避免误导显示固定的 00:00:00）
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val
  }
  // 其它情况（时间戳、ISO、Date对象）按本地时区格式化
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

const activityTypeOptions = [
  { label: 'Fertilizer', value: 'fertilizer' },
  { label: 'Irrigation', value: 'irrigation' },
  { label: 'Pest Control', value: 'pest_control' },
  { label: 'Weeding', value: 'weeding' },
  { label: 'Tillage', value: 'tillage' },
  { label: 'Harvest', value: 'harvest' }
]

const getList = async () => {
  loading.value = true
  try {
    const res = await getFarmingRecordList(queryParams)
    dataList.value = res.rows || []
    total.value = res.total || 0
  } catch (error) {
    console.error('获取列表失败:', error)
  } finally {
    loading.value = false
  }
}

const loadPlotOptions = async () => {
  try {
    const res = await getPlotOptions()
    plotOptions.value = res.data || []
  } catch (error) {
    console.error('获取地块选项失败:', error)
  }
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleReset = () => {
  queryParams.plotId = ''
  queryParams.activityType = ''
  queryParams.activityDate = ''
  queryParams.auditStatus = ''
  queryParams.pageNum = 1
  getList()
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.farmingId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.farmingId)) {
      selectedIds.value.push(item.farmingId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.farmingId)
  }
}

const handleAdd = () => router.push('/research/breeding-data/farming/add')
const handleView = (row) => router.push(`/research/breeding-data/farming/detail/${row.farmingId}`)
const handleEdit = (row) => router.push(`/research/breeding-data/farming/edit/${row.farmingId}`)

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
      handleSubmitForReview(row)
      break
    case 'cancelBatch':
      handleCancel(row)
      break
  }
}

// 提交审核
const handleSubmitForReview = async (row) => {
  try {
    await ElMessageBox.confirm(
      'Are you sure you want to submit this record for review?',
      'Confirm',
      {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }
    )

    const res = await submitFarmingRecordForReview({ farmingId: row.farmingId })
    if (res.code === 200) {
      ElMessage.success('Submit for review successfully')
      getList()
    } else {
      ElMessage.error(res.msg || 'Submit failed')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to submit for review:', error)
      ElMessage.error('Submit failed')
    }
  }
}

const handleDelete = (row) => {
  ElMessageBox.confirm(t('research.breedingData.farming.deleteConfirm'), t('common.warning'), { type: 'warning' }).then(async () => {
    await deleteFarmingRecord(row.farmingId)
    ElMessage.success(t('research.breedingData.farming.deleteSuccess'))
    getList()
  }).catch(() => {})
}

const handleCancel = (row) => {
  ElMessageBox.confirm('Are you sure you want to invalidate this farming record?', 'Warning', {
    type: 'warning',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel'
  }).then(async () => {
    try {
      await cancelFarmingRecord(row.farmingId)
      ElMessage.success('Invalidated successfully')
      getList()
    } catch (error) {
      console.error('Failed to invalidate:', error)
      ElMessage.error('Failed to invalidate')
    }
  }).catch(() => {})
}

const handleBatchDelete = () => {
  ElMessageBox.confirm(t('research.breedingData.farming.deleteConfirm'), t('common.warning'), { type: 'warning' }).then(async () => {
    await deleteFarmingRecord(selectedIds.value.join(','))
    ElMessage.success(t('research.breedingData.farming.deleteSuccess'))
    selectedIds.value = []
    getList()
  }).catch(() => {})
}

onMounted(() => {
  loadPlotOptions()
  getList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
