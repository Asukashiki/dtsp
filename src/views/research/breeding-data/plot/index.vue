<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-map-2-line"
        :title="$t('research.breedingData.plot.title')"
        :subtitle="$t('research.breedingData.plot.subtitle')" />

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
                <el-option v-for="item in batchOptions" :key="item.batchId" :label="item.batchId" :value="item.batchId" />
              </el-select>
            </SearchItem>

            <SearchItem label="Variety Code">
              <el-input
                v-model="queryParams.varietyCode"
                placeholder="Please enter Variety Code"
                clearable
                class="search-input" />
            </SearchItem>

            <SearchItem :label="$t('research.breedingData.plot.columns.auditStatus')">
              <el-select
                v-model="queryParams.auditStatus"
                :placeholder="$t('research.breedingData.trial.placeholder.auditStatus')"
                clearable
                class="filter-select">
                <el-option
                  v-for="dict in dictOptions.flow_status"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('research.breedingData.plot.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('research.breedingData.plot.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="dataList" stripe v-loading="loading" @selection-change="handleSelectionChange">
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
                  <el-tag :type="getWorkflowStatusType(row.auditStatus)" effect="plain">
                    {{ getLabelByValue('flow_status', row.auditStatus) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="createdName" :label="$t('research.breedingData.plot.columns.createdBy')" min-width="120" />
              <el-table-column prop="createTime" :label="$t('research.breedingData.plot.columns.createTime')" min-width="120" />
              <el-table-column prop="modifiedName" :label="$t('research.breedingData.plot.columns.modifiedBy')" min-width="120" />
              <el-table-column prop="updateTime" :label="$t('research.breedingData.plot.columns.updateTime')" min-width="120" />
              <el-table-column prop="auditedName" :label="$t('research.breedingData.plot.columns.auditedBy')" min-width="120" />
              <el-table-column prop="auditTime" :label="$t('research.breedingData.plot.columns.auditTime')" min-width="120" />
              <el-table-column prop="auditOpinion" :label="$t('research.breedingData.plot.auditOpinion')" min-width="150" show-overflow-tooltip />
              <el-table-column :label="$t('research.breedingData.plot.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="row.auditStatus"
                    mode="list"
                    :show-audit="false"
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
          <div v-for="item in dataList" :key="item.plotId" class="mobile-card">
            <div class="mobile-card-header">
              <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
              <div class="mobile-card-title">
                <i class="ri-map-pin-line"></i>
                <span>{{ item.plotId }}</span>
              </div>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">Trial ID:</span>
                <span class="value">{{ item.trialId }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">Batch ID:</span>
                <span class="value">{{ item.batchId }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">Replication No:</span>
                <span class="value">{{ item.replicationNo }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">Variety Code:</span>
                <span class="value">{{ item.varietyCode }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">Sowing Date:</span>
                <span class="value">{{ formatDateTime(item.sowingTime) }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.plot.columns.auditStatus') }}:</span>
                <span class="value">
                  <el-tag :type="getWorkflowStatusType(item.auditStatus)" effect="plain">
                    {{ getLabelByValue('flow_status', String(item.auditStatus).toUpperCase()) }}
                  </el-tag>
                </span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.plot.columns.createdBy') }}:</span>
                <span class="value">{{ item.createdName }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.plot.columns.modifiedBy') }}:</span>
                <span class="value">{{ item.modifiedName }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.plot.columns.auditedBy') }}:</span>
                <span class="value">{{ item.auditedName }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.plot.columns.createTime') }}:</span>
                <span class="value">{{ item.createTime }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.plot.columns.updateTime') }}:</span>
                <span class="value">{{ item.updateTime }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.plot.columns.auditTime') }}:</span>
                <span class="value">{{ item.auditTime }}</span>
              </div>
              <div class="mobile-card-row" v-if="item.auditOpinion">
                <span class="label">{{ $t('research.breedingData.plot.auditOpinion') }}:</span>
                <span class="value">{{ item.auditOpinion }}</span>
              </div>
            </div>
            <div class="mobile-card-footer">
              <ActionButtons
                :workflow-status="item.auditStatus"
                mode="list"
                :show-audit="false"
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
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import ActionButtons from '@/components/workflow/ActionButtons.vue'
import { getWorkflowStatusType } from '@/utils/workflow'
import { getPlotInfoList, deletePlotInfo, getBatchOptions, submitPlotAudit, archivePlot, cancelPlot, getIrrigationCount } from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const selectedIds = ref([])
const batchOptions = ref([])
const irrigationCountMap = ref({})
const { options: dictOptions, getLabelByValue  } = useDict('flow_status')

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  trialId: '',
  batchId: '',
  varietyCode: '',
  auditStatus: ''
})

// 格式化日期时间为 'YYYY-MM-DD HH:mm:ss'
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
    const res = await getPlotInfoList(queryParams)
    dataList.value = res.rows || []
    total.value = res.total || 0
    // 获取灌溉次数统计
    await loadIrrigationCount()
  } catch (error) {
    console.error('获取列表失败:', error)
  } finally {
    loading.value = false
  }
}

const loadIrrigationCount = async () => {
  try {
    const res = await getIrrigationCount()
    irrigationCountMap.value = res.data || {}
  } catch (error) {
    console.error('获取灌溉次数失败:', error)
  }
}

const getIrrigationCountForPlot = (plotId) => {
  return irrigationCountMap.value[plotId] || 0
}

const loadBatchOptions = async () => {
  try {
    const res = await getBatchOptions()
    batchOptions.value = res.data || []
  } catch (error) {
    console.error('获取批次选项失败:', error)
  }
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleReset = () => {
  queryParams.pageNum = 1
  queryParams.pageSize = 10
  queryParams.trialId = ''
  queryParams.batchId = ''
  queryParams.varietyCode = ''
  queryParams.auditStatus = ''
  getList()
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.plotId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.plotId)) {
      selectedIds.value.push(item.plotId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.plotId)
  }
}

// 统一的动作处理方法
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
    case 'edit':
      handleEdit(row)
      break
    case 'submit':
      handleSubmitAudit(row)
      break
    case 'archive':
      handleArchive(row)
      break
    case 'cancelBatch':
      handleCancel(row)
      break
  }
}

const handleAdd = () => {
  router.push('/research/breeding-data/plot/add')
}

const handleView = (row) => {
  router.push(`/research/breeding-data/plot/detail/${row.plotId}`)
}

const handleEdit = (row) => {
  router.push(`/research/breeding-data/plot/edit/${row.plotId}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(t('research.breedingData.plot.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deletePlotInfo(row.plotId)
    ElMessage.success(t('research.breedingData.plot.deleteSuccess'))
    getList()
  }).catch(() => {})
}

const handleBatchDelete = () => {
  ElMessageBox.confirm(t('research.breedingData.plot.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deletePlotInfo(selectedIds.value.join(','))
    ElMessage.success(t('research.breedingData.plot.deleteSuccess'))
    selectedIds.value = []
    getList()
  }).catch(() => {})
}

const handleSubmitAudit = async (row) => {
  try {
    await ElMessageBox.confirm(t('research.breedingData.plot.submitConfirm'), t('common.confirm'), {
      type: 'warning'
    })
    await submitPlotAudit(row.plotId)
    ElMessage.success(t('research.breedingData.plot.submitSuccess'))
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || t('common.operationFailed'))
    }
  }
}

const handleArchive = async (row) => {
  try {
    await ElMessageBox.confirm(t('research.breedingData.plot.archiveConfirm'), t('common.confirm'), {
      type: 'warning'
    })
    await archivePlot(row.plotId)
    ElMessage.success(t('research.breedingData.plot.archiveSuccess'))
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || t('common.operationFailed'))
    }
  }
}

const handleCancel = async (row) => {
  try {
    await ElMessageBox.confirm(t('research.breedingData.plot.cancelConfirm'), t('common.confirm'), {
      type: 'warning'
    })
    await cancelPlot(row.plotId)
    ElMessage.success(t('research.breedingData.plot.cancelSuccess'))
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || t('common.operationFailed'))
    }
  }
}

onMounted(() => {
  loadBatchOptions()
  getList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
