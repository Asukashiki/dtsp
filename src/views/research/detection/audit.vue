<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader icon="ri-audit-line" :title="$t('research.menu.detectionAudit')"
        :subtitle="$t('research.menu.detectionAuditSubtitle')" />

      <div class="content-wrapper">
        <InfoCard :title="$t('research.menu.detectionAudit')" icon="ri-file-list-3-line">
          <StatusTabs v-model="activeStatus" :tabs="statusTabs" @tab-change="handleStatusChange" />

          <div class="table-wrapper pc-only">
            <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" table-layout="fixed">
              <el-table-column prop="batchId" :label="$t('research.detection.batchId')" min-width="180" show-overflow-tooltip />
              <el-table-column :label="$t('research.detection.seedClass')" min-width="180" align="center">
                <template #default="{ row }">
                  <div class="seed-class-tags">
                    <el-tag v-for="seedClass in row.seedClasses" :key="seedClass"
                      :type="seedClass === 'Basic' ? 'success' : 'warning'" size="small">
                      {{ seedClass }}
                    </el-tag>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="fieldCount" :label="$t('research.menu.fieldDetection')" min-width="140" align="center" />
              <el-table-column prop="labCount" :label="$t('research.menu.labTesting')" min-width="140" align="center" />
              <el-table-column prop="totalCount" :label="$t('common.total')" min-width="100" align="center" />
              <el-table-column prop="latestSubmitTime" :label="$t('common.submitTime')" min-width="180" align="center" show-overflow-tooltip>
                <template #default="{ row }">{{ formatDateTime(row.latestSubmitTime) }}</template>
              </el-table-column>

              <el-table-column prop="auditStatus" :label="$t('research.detection.auditStatus')" min-width="120" align="center">
                <template #default="{ row }">
                  <el-tag :type="getAuditStatusType(row.auditStatus)" size="small">{{ getAuditStatusText(row.auditStatus) }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('common.actions')" width="240" fixed="right" align="center">
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button size="small" type="primary" @click="handleView(row)">
                      <i class="ri-eye-line"></i>
                      <span class="btn-text">{{ $t('common.view') }}</span>
                    </el-button>
                    <el-button v-if="activeStatus === 'submitted'" size="small" type="success" @click="handleAudit(row)">
                      <i class="ri-audit-line"></i>
                      <span class="btn-text">{{ $t('common.audit') }}</span>
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </InfoCard>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { PageHeader, InfoCard } from '@/components/common'
import StatusTabs from '@/components/workflow/StatusTabs.vue'
import { getTestList, getTrackingList } from '@/api/detection'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])
const activeStatus = ref('submitted')

const statusTabs = [
  { name: 'submitted', label: 'research.detection.statusSubmitted', icon: 'ri-time-line' },
  { name: 'approved', label: 'research.detection.statusApproved', icon: 'ri-check-line' },
  { name: 'rejected', label: 'research.detection.statusRejected', icon: 'ri-close-circle-line' }
]

const toSeedClassArray = (record) => {
  if (!record?.seedClass) {
    return []
  }
  return [record.seedClass]
}

const mergeByBatchId = (trackingList, testList) => {
  const mergedMap = new Map()

  const ensureRow = (batchId) => {
    if (!mergedMap.has(batchId)) {
      mergedMap.set(batchId, {
        batchId,
        seedClasses: [],
        fieldCount: 0,
        labCount: 0,
        totalCount: 0,
        latestSubmitTime: '',
        auditStatus: activeStatus.value
      })
    }
    return mergedMap.get(batchId)
  }

  const pushSeedClass = (row, seedClass) => {
    if (!seedClass) return
    if (!row.seedClasses.includes(seedClass)) {
      row.seedClasses.push(seedClass)
    }
  }

  const updateSubmitTime = (row, submitTime) => {
    if (!submitTime) return
    if (!row.latestSubmitTime || new Date(submitTime).getTime() > new Date(row.latestSubmitTime).getTime()) {
      row.latestSubmitTime = submitTime
    }
  }

  trackingList.forEach((record) => {
    if (!record?.batchId) return
    const row = ensureRow(record.batchId)
    row.fieldCount += 1
    toSeedClassArray(record).forEach(seedClass => pushSeedClass(row, seedClass))
    updateSubmitTime(row, record.submitTime)
  })

  testList.forEach((record) => {
    if (!record?.batchId) return
    const row = ensureRow(record.batchId)
    row.labCount += 1
    toSeedClassArray(record).forEach(seedClass => pushSeedClass(row, seedClass))
    updateSubmitTime(row, record.submitTime)
  })

  return Array.from(mergedMap.values()).map(item => ({
    ...item,
    totalCount: item.fieldCount + item.labCount
  }))
}

const loadData = async () => {
  loading.value = true
  try {
    const params = { pageNum: 1, pageSize: 1000, auditStatus: activeStatus.value }
    const [trackingRes, testRes] = await Promise.all([getTrackingList(params), getTestList(params)])
    const trackingList = trackingRes.code === 200 ? (trackingRes.data?.records || []) : []
    const testList = testRes.code === 200 ? (testRes.data?.records || []) : []
    tableData.value = mergeByBatchId(trackingList, testList)
  } catch (error) {
    console.error('Load detection audit list error:', error)
    tableData.value = []
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleStatusChange = () => {
  loadData()
}

const handleView = (row) => {
  router.push(`/research/detection-audit/form/${row.batchId}?mode=view`)
}

const handleAudit = (row) => {
  router.push(`/research/detection-audit/form/${row.batchId}?mode=audit`)
}

const getAuditStatusText = (status) => ({
  draft: t('research.detection.statusDraft'),
  submitted: t('research.detection.statusSubmitted'),
  approved: t('research.detection.statusApproved'),
  rejected: t('research.detection.statusRejected')
}[status] || status)

const getAuditStatusType = (status) => ({
  draft: 'info',
  submitted: 'warning',
  approved: 'success',
  rejected: 'danger'
}[status] || 'info')

const formatDateTime = (value) => {
  if (!value) return '-'
  if (typeof value !== 'string') return value
  return value.includes('T') ? value.replace('T', ' ') : value
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  justify-content: flex-start;
  
  :deep(.el-button) {
    min-width: auto;
    padding: 4px 10px;
    font-size: 12px;
    font-weight: 500;
    margin: 0 !important;
  }
}

.btn-text {
  margin-left: 4px;
}

.seed-class-tags {
  display: flex;
  gap: 6px;
  justify-content: center;
}
</style>
