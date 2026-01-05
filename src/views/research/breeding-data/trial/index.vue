<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-test-tube-line"
        :title="$t('research.breedingData.trial.title')"
        :subtitle="$t('research.breedingData.trial.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片（无标题） -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('research.breedingData.trial.columns.trialId')">
              <el-input
                v-model="queryParams.trialId"
                :placeholder="$t('research.breedingData.trial.placeholder.trialId')"
                clearable
                class="search-input">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('research.breedingData.trial.columns.batchId')">
              <el-select
                v-model="queryParams.batchId"
                :placeholder="$t('research.breedingData.trial.placeholder.batchId')"
                clearable
                class="filter-select">
                <el-option v-for="item in batchOptions" :key="item.batchId" :label="item.batchId" :value="item.batchId" />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('research.breedingData.trial.columns.trialName')">
              <el-input
                v-model="queryParams.trialName"
                :placeholder="$t('research.breedingData.trial.placeholder.trialName')"
                clearable
                class="search-input" />
            </SearchItem>

            <SearchItem :label="$t('research.breedingData.trial.columns.season')">
              <el-select
                v-model="queryParams.season"
                :placeholder="$t('research.breedingData.trial.placeholder.season')"
                clearable
                class="filter-select">
                <el-option v-for="item in seasonOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('research.breedingData.trial.columns.auditStatus')">
              <el-select
                v-model="queryParams.auditStatus"
                :placeholder="$t('research.breedingData.trial.placeholder.auditStatus')"
                clearable
                class="filter-select">
                <el-option 
                  v-for="item in dictOptions.flow_status" 
                  :key="item.value" 
                  :label="item.label" 
                  :value="item.value" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('research.breedingData.trial.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('research.breedingData.trial.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="dataList" stripe v-loading="loading" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" />
              <el-table-column prop="trialId" :label="$t('research.breedingData.trial.columns.trialId')" min-width="140" show-overflow-tooltip />
              <el-table-column prop="trialName" :label="$t('research.breedingData.trial.columns.trialName')" min-width="160" show-overflow-tooltip />
              <el-table-column prop="batchId" :label="$t('research.breedingData.trial.columns.batchId')" min-width="140" show-overflow-tooltip />
              <el-table-column prop="locationId" show-overflow-tooltip :label="$t('research.breedingData.trial.columns.locationId')" min-width="120" />
              <el-table-column prop="year" :label="$t('research.breedingData.trial.columns.year')" min-width="100" />
              <el-table-column prop="season" :label="$t('research.breedingData.trial.columns.season')" min-width="100" />
              <el-table-column prop="designType" :label="$t('research.breedingData.trial.columns.designType')" min-width="140" />
              <el-table-column prop="replications" :label="$t('research.breedingData.trial.columns.replications')" min-width="100" />
              <el-table-column prop="trialStatus" :label="$t('research.breedingData.trial.columns.workflowStatus')" width="120" align="center">
                <template #default="{ row }">
                  <StatusTag :status="row.trialStatus || row.workflowStatus || 'S0'" type="workflow" />
                </template>
              </el-table-column>
              <el-table-column :label="$t('research.breedingData.trial.columns.status')" width="120" align="center">
                <template #default="{ row }">
                  <StatusTag :status="row.status || '01'" type="business" />
                </template>
              </el-table-column>
              <el-table-column prop="createdName" :label="$t('research.breedingData.trial.columns.createdName')" min-width="120" show-overflow-tooltip />
              <el-table-column prop="createTime" :label="$t('research.breedingData.trial.columns.createTime')" min-width="160" show-overflow-tooltip />
              <el-table-column :label="$t('research.breedingData.trial.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons :trial="row" @edit="handleEdit" @view="handleView" @submit="handleSubmit" @cancel="handleCancel" />
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
          <div v-for="item in dataList" :key="item.trialId" class="mobile-card">
            <div class="mobile-card-header">
              <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
              <div class="mobile-card-title">
                <i class="ri-flask-line"></i>
                <span>{{ item.trialName }}</span>
              </div>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.trial.columns.trialId') }}:</span>
                <span class="value">{{ item.trialId }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.trial.columns.batchId') }}:</span>
                <span class="value">{{ item.batchId }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.trial.columns.locationId') }}:</span>
                <span class="value">{{ item.locationId }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.trial.columns.year') }}:</span>
                <span class="value">{{ item.year }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.trial.columns.season') }}:</span>
                <span class="value">{{ item.season }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.trial.columns.designType') }}:</span>
                <span class="value">{{ item.designType }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.trial.columns.replications') }}:</span>
                <span class="value">{{ item.replications }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.trial.columns.workflowStatus') }}:</span>
                <span class="value">
                  <StatusTag :status="item.trialStatus || item.workflowStatus || 'S0'" type="workflow" />
                </span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.trial.columns.status') }}:</span>
                <span class="value">
                  <StatusTag :status="item.status || '01'" type="business" />
                </span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.trial.columns.createdName') }}:</span>
                <span class="value">{{ item.createdName || '-' }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breedingData.trial.columns.createTime') }}:</span>
                <span class="value">{{ item.createTime || '-' }}</span>
              </div>
            </div>
            <div class="mobile-card-footer">
              <ActionButtons :trial="item" @edit="handleEdit" @view="handleView" @submit="handleSubmit" @cancel="handleCancel" />
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

    <!-- 作废原因对话框 -->
    <ReasonDialog
      v-model="reasonDialogVisible"
      :title="t('research.trialBasicAudit.action.cancelReason')"
      :label="t('research.trialBasicAudit.form.cancelReason')"
      :placeholder="t('research.trialBasicAudit.form.cancelReasonPlaceholder')"
      @confirm="handleCancelConfirm"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import { getTrialBasicList, deleteTrialBasic, getBatchOptions } from '@/api/breedingData'
import { submitTrial, cancelTrial } from '@/api/research/trialBasicAudit'
import { useDict } from '@/hooks/useDict'
import StatusTag from './components/StatusTag.vue'
import ActionButtons from './components/ActionButtons.vue'
import ReasonDialog from './components/ReasonDialog.vue'

const router = useRouter()
const { t } = useI18n()

// 获取审核状态字典数据
const { options: dictOptions } = useDict(['flow_status'], {})

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const selectedIds = ref([])
const batchOptions = ref([])

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  trialId: '',
  batchId: '',
  trialName: '',
  season: '',
  auditStatus: ''
})

const seasonOptions = [
  { label: 'Spring', value: 'spring' },
  { label: 'Summer', value: 'summer' },
  { label: 'Autumn', value: 'autumn' },
  { label: 'Winter', value: 'winter' }
]

const getList = async () => {
  loading.value = true
  try {
    const res = await getTrialBasicList(queryParams)
    dataList.value = res.rows || []
    total.value = res.total || 0
  } catch (error) {
    console.error('获取列表失败:', error)
  } finally {
    loading.value = false
  }
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
  queryParams.trialName = ''
  queryParams.season = ''
  queryParams.auditStatus = ''
  getList()
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.trialId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.trialId)) {
      selectedIds.value.push(item.trialId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.trialId)
  }
}

const handleAdd = () => {
  router.push('/research/breeding-data/trial/add')
}

const handleView = (row) => {
  router.push(`/research/breeding-data/trial/detail/${row.trialId}`)
}

const handleEdit = (row) => {
  router.push(`/research/breeding-data/trial/edit/${row.trialId}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(t('research.breedingData.trial.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deleteTrialBasic(row.trialId)
    ElMessage.success(t('research.breedingData.trial.deleteSuccess'))
    getList()
  }).catch(() => {})
}

const handleBatchDelete = () => {
  ElMessageBox.confirm(t('research.breedingData.trial.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deleteTrialBasic(selectedIds.value.join(','))
    ElMessage.success(t('research.breedingData.trial.deleteSuccess'))
    selectedIds.value = []
    getList()
  }).catch(() => {})
}

// 提交审核
const handleSubmit = async (row) => {
  ElMessageBox.confirm(
    t('research.trialBasicAudit.action.submitConfirm'),
    t('common.warning'),
    {
      type: 'warning',
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel')
    }
  ).then(async () => {
    try {
      await submitTrial(row.trialId)
      ElMessage.success(t('research.trialBasicAudit.action.submitSuccess'))
      getList()
    } catch (error) {
      console.error('提交审核失败:', error)
    }
  }).catch(() => {})
}

// 作废
const reasonDialogVisible = ref(false)
const currentTrialId = ref('')

const handleCancel = (row) => {
  currentTrialId.value = row.trialId
  reasonDialogVisible.value = true
}

const handleCancelConfirm = async (reason) => {
  try {
    await cancelTrial(currentTrialId.value, reason)
    ElMessage.success(t('research.trialBasicAudit.action.cancelSuccess'))
    reasonDialogVisible.value = false
    getList()
  } catch (error) {
    console.error('作废失败:', error)
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
