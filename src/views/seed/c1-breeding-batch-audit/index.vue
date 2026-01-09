<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader icon="ri-checkbox-circle-line" :title="$t('research.menu.c1BatchAudit')"
        :subtitle="$t('research.menu.c1BatchAuditSubtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索区域 -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('seed.c1BatchAudit.columns.batchId')">
              <el-input v-model="searchParams.keyword" :placeholder="$t('seed.c1BatchAudit.searchPlaceholder')"
                clearable @clear="handleSearch" @keyup.enter="handleSearch" />
            </SearchItem>

            <SearchItem :label="$t('seed.c1BatchAudit.filterByCrop')">
              <el-select v-model="searchParams.cropType" :placeholder="$t('seed.c1BatchAudit.filterByCrop')" clearable
                v-loading="dictLoading" @change="handleSearch">
                <el-option v-for="item in options.crop_type" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('seed.c1BatchAudit.columns.startDate')">
              <el-date-picker v-model="dateRange" type="daterange" :range-separator="$t('common.to')"
                :start-placeholder="$t('common.startDate')" :end-placeholder="$t('common.endDate')" clearable
                value-format="YYYY-MM-DD" @change="handleDateChange" />
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表区域 -->
        <InfoCard :title="$t('seed.c1BatchAudit.list')" icon="ri-list-check" :no-padding="true">
          <!-- 状态标签页 -->
          <StatusTabs v-model="activeTab" :tabs="tabConfig" @tab-change="handleTabChange" />

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table v-loading="loading" :data="tableData" stripe>
              <el-table-column prop="batchId" :label="$t('seed.c1BatchAudit.columns.batchId')" min-width="180"
                fixed="left" show-overflow-tooltip />
              <el-table-column prop="varietyName" :label="$t('seed.c1BatchAudit.columns.varietyName')" min-width="140"
                show-overflow-tooltip />
              <el-table-column prop="cropType" :label="$t('seed.c1BatchAudit.columns.cropType')" min-width="120"
                align="center">
                <template #default="{ row }">
                  {{ getLabelByValue('crop_type', row.cropType) || row.cropType || '-' }}
                </template>
              </el-table-column>
              <el-table-column prop="orgName" :label="$t('seed.c1BatchAudit.columns.orgName')" min-width="180"
                show-overflow-tooltip />
              <el-table-column prop="startDate" :label="$t('seed.c1BatchAudit.columns.startDate')" min-width="120"
                align="center" />
              <el-table-column prop="batchStatus" :label="$t('seed.c1BatchAudit.columns.batchStatus')" min-width="100"
                align="center">
                <template #default="{ row }">
                  <el-tag :type="getStatusTagType(row.batchStatus)" size="small">
                    {{ getStatusName(row.batchStatus) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('common.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons :workflow-status="mapToWorkflowStatus(row.auditStatus)" mode="list" :show-audit="true"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination v-model:current-page="pagination.pageNum" v-model:page-size="pagination.pageSize"
                :page-sizes="[10, 20, 50, 100]" :total="pagination.total"
                layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                @current-change="handlePageChange" />
            </div>
          </div>

          <!-- 移动端列表 -->
          <div class="mobile-card-list mobile-only">
            <div v-loading="loading">
              <div v-for="item in tableData" :key="item.id" class="mobile-card" @click="handleView(item)">
                <div class="mobile-card-header">
                  <span class="mobile-card-title">{{ item.batchId }}</span>
                  <el-tag :type="getStatusTagType(item.batchStatus)" size="small">
                    {{ getStatusName(item.batchStatus) }}
                  </el-tag>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('seed.c1BatchAudit.columns.varietyName') }}:</span>
                    <span class="value">{{ item.varietyName }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('seed.c1BatchAudit.columns.cropType') }}:</span>
                    <span class="value">{{ getLabelByValue('crop_type', item.cropType) || item.cropType }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('seed.c1BatchAudit.columns.orgName') }}:</span>
                    <span class="value">{{ item.orgName }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('seed.c1BatchAudit.columns.auditStatus') }}:</span>
                    <el-tag
                      :type="item.auditStatus === 'pending' ? 'warning' : item.auditStatus === 'approved' ? 'success' : 'danger'"
                      size="small">
                      {{ $t(`seed.c1BatchAudit.auditStatus.${item.auditStatus}`) }}
                    </el-tag>
                  </div>
                </div>
                <div class="mobile-card-footer">
                  <ActionButtons :workflow-status="mapToWorkflowStatus(item.auditStatus)" mode="list"
                    @action="(action) => handleAction(item, action)" />
                </div>
              </div>
              <div v-if="tableData.length === 0 && !loading" class="empty-status">
                <i class="ri-inbox-line"></i>
                <p>{{ $t('seed.c1BatchAudit.noData') }}</p>
              </div>
            </div>
            <div v-if="pagination.total > 0" class="pagination-wrapper">
              <el-pagination v-model:current-page="pagination.pageNum" :total="pagination.total"
                :page-size="pagination.pageSize" layout="prev, pager, next" small @current-change="handlePageChange" />
            </div>
          </div>
        </InfoCard>
      </div>
    </div>

    <!-- 审核弹窗 -->
    <el-dialog v-model="auditDialogVisible" :title="$t('seed.c1BatchAudit.auditDialog')" width="600px"
      :close-on-click-modal="false">
      <el-form ref="auditFormRef" :model="auditForm" :rules="auditRules" label-width="100px">
        <el-form-item :label="$t('seed.c1BatchAudit.auditResult')" prop="result">
          <el-radio-group v-model="auditForm.result">
            <el-radio value="approved">{{ $t('seed.c1BatchAudit.approve') }}</el-radio>
            <el-radio value="rejected">{{ $t('seed.c1BatchAudit.reject') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('seed.c1BatchAudit.auditComment')" prop="comment">
          <el-input v-model="auditForm.comment" type="textarea" :rows="4"
            :placeholder="$t('seed.c1BatchAudit.auditCommentPlaceholder')" maxlength="500" show-word-limit />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="auditDialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" :loading="auditSubmitting" @click="handleAuditSubmit">
          {{ $t('common.confirm') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import {
  getC1BreedingBatchList,
  approveC1Batch,
  rejectC1Batch,
  getC1TrackingList,
  getC1TestList
} from '@/api/c1BreedingBatch'
import { useDict } from '@/hooks/useDict'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import StatusTabs from '@/components/workflow/StatusTabs.vue'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const router = useRouter()
const { t } = useI18n()

// 使用 useDict hook 获取字典数据
const { options, getLabelByValue, loading: dictLoading } = useDict(['crop_type'])

const searchParams = reactive({
  keyword: '',
  cropType: '',
  auditStatus: 'pending',
  startDateBegin: '',
  startDateEnd: ''
})

// 标签页配置
const activeTab = ref('pending')
const tabConfig = [
  { name: 'pending', label: 'seed.c1BatchAudit.auditStatus.pending', icon: 'ri-time-line' },
  { name: 'approved', label: 'seed.c1BatchAudit.auditStatus.approved', icon: 'ri-check-line' },
  { name: 'rejected', label: 'seed.c1BatchAudit.auditStatus.rejected', icon: 'ri-close-circle-line' }
]

const handleTabChange = (tabName) => {
  searchParams.auditStatus = tabName
  handleSearch()
}

const mapToWorkflowStatus = (auditStatus) => {
  const map = {
    'pending': 'S1',
    'approved': 'S2',
    'rejected': 'S3'
  }
  return map[auditStatus] || 'S0'
}

const dateRange = ref([])

const loading = ref(false)
const tableData = ref([])

const pagination = reactive({ pageNum: 1, pageSize: 10, total: 0 })

// 审核弹窗相关
const auditDialogVisible = ref(false)
const auditFormRef = ref()
const auditSubmitting = ref(false)
const currentAuditRow = ref(null)
const auditForm = reactive({
  result: 'approved',
  comment: ''
})

const auditRules = computed(() => ({
  result: [
    { required: true, message: t('seed.c1BatchAudit.resultRequired'), trigger: 'change' }
  ],
  comment: [
    { required: true, message: t('seed.c1BatchAudit.commentRequired'), trigger: 'blur' }
  ]
}))

// 状态映射
const statusMap = computed(() => ({
  '01': t('seed.c1BatchAudit.status.ongoing'),
  '02': t('seed.c1BatchAudit.status.completed'),
  '03': t('seed.c1BatchAudit.status.terminated')
}))

const loadData = async () => {
  loading.value = true
  try {
    const res = await getC1BreedingBatchList({
      ...searchParams,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })
    if (res.code === 200) {
      tableData.value = res.data?.list || []
      pagination.total = res.data?.total || 0
    }
  } catch (error) {
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

const handleDateChange = (dates) => {
  if (dates && dates.length === 2) {
    searchParams.startDateBegin = dates[0]
    searchParams.startDateEnd = dates[1]
  } else {
    searchParams.startDateBegin = ''
    searchParams.startDateEnd = ''
  }
  handleSearch()
}

const handleSearch = () => { pagination.pageNum = 1; loadData() }
const handleReset = () => {
  Object.assign(searchParams, {
    keyword: '',
    cropType: '',
    auditStatus: 'pending',
    startDateBegin: '',
    startDateEnd: ''
  })
  dateRange.value = []
  pagination.pageNum = 1
  loadData()
}

const handleView = (row) => router.push(`/research/c1-breeding-batch/detail/${row.id}?readonly=true`)

const handleAction = (row, action) => {
  if (action === 'view') {
    handleView(row)
  } else if (action === 'audit') {
    handleAudit(row)
  } else if (action === 'edit') {
    // Audit module edit usually means re-audit or view if not allowed to edit
    handleView(row)
  }
}

const handleSizeChange = () => { pagination.pageNum = 1; loadData() }
const handlePageChange = () => { loadData() }

// 获取状态名称
const getStatusName = (status) => statusMap.value[status] || status

// 获取状态标签类型
const getStatusTagType = (status) => {
  const map = { '01': 'primary', '02': 'success', '03': 'info' }
  return map[status] || 'info'
}

// 打开审核弹窗
const handleAudit = (row) => {
  currentAuditRow.value = row
  auditForm.result = 'approved'
  auditForm.comment = ''
  auditDialogVisible.value = true
}

// 提交审核结果
const handleAuditSubmit = async () => {
  try {
    await auditFormRef.value.validate()

    // 只有在审核通过时才需要校验跟踪记录和检测记录
    if (auditForm.result === 'approved') {
      const isValid = await validateBatchData(currentAuditRow.value.batchId)
      if (!isValid) {
        return
      }
    }

    auditSubmitting.value = true

    const data = {
      id: currentAuditRow.value.id,
      auditComment: auditForm.comment
    }

    let res
    if (auditForm.result === 'approved') {
      res = await approveC1Batch(data)
    } else {
      res = await rejectC1Batch(data)
    }

    if (res.code === 200) {
      ElMessage.success(t('seed.c1BatchAudit.auditSuccess'))
      auditDialogVisible.value = false
      loadData()
    }
  } catch (error) {
    console.error('Audit validation failed:', error)
  } finally {
    auditSubmitting.value = false
  }
}

// 校验批次数据：跟踪记录和检测记录
const validateBatchData = async (batchId) => {
  try {
    // 获取跟踪记录列表
    const trackingRes = await getC1TrackingList({
      batchId: batchId,
      pageNum: 1,
      pageSize: 1000
    })

    // 获取检测记录列表
    const testRes = await getC1TestList({
      batchId: batchId,
      pageNum: 1,
      pageSize: 1000
    })

    // 校验跟踪记录
    if (!trackingRes.data || trackingRes.data.total === 0) {
      ElMessage.error(t('seed.c1BatchAudit.error.noTrackingRecord'))
      return false
    }

    // 校验每条记录的 trackingResult 是否为 '01'
    const hasInvalidTracking = trackingRes.data.records.some(item => item.trackingResult !== '01')
    if (hasInvalidTracking) {
      ElMessage.error(t('seed.c1BatchAudit.error.invalidTrackingResult'))
      return false
    }

    // 校验检测记录
    if (!testRes.data || testRes.data.total === 0) {
      ElMessage.error(t('seed.c1BatchAudit.error.noTestRecord'))
      return false
    }

    // 校验每条记录的 testResult 是否为 '01'
    const hasInvalidTest = testRes.data.records.some(item => item.testResult !== '01')
    if (hasInvalidTest) {
      ElMessage.error(t('seed.c1BatchAudit.error.invalidTestResult'))
      return false
    }

    return true
  } catch (error) {
    console.error('Data validation error:', error)
    ElMessage.error(t('seed.c1BatchAudit.error.validationFailed'))
    return false
  }
}

onMounted(() => loadData())
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';

.pagination-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>
