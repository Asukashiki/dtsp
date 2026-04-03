<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader icon="ri-audit-line" :title="$t('research.menu.detectionAudit')"
        :subtitle="$t('research.menu.detectionAuditSubtitle')" />

      <div class="content-wrapper">
        <InfoCard :title="$t('research.menu.detectionAudit')" icon="ri-file-list-3-line">
          <StatusTabs v-model="activeType" :tabs="typeTabs" @tab-change="handleTypeChange" />
          <StatusTabs v-model="activeStatus" :tabs="statusTabs" @tab-change="handleStatusChange" />

          <div class="table-wrapper pc-only">
            <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" table-layout="fixed">
              <template v-if="activeType === 'field'">
                <el-table-column prop="trackingId" :label="$t('research.c1BreedingBatch.tracking.trackingId')" min-width="180" show-overflow-tooltip />
                <el-table-column prop="batchId" :label="$t('research.detection.batchId')" min-width="160" show-overflow-tooltip />
                <el-table-column prop="seedClass" :label="$t('research.detection.seedClass')" min-width="100" align="center">
                  <template #default="{ row }">
                    <el-tag :type="row.seedClass === 'Basic' ? 'success' : 'warning'" size="small">{{ row.seedClass }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="trackingResult" :label="$t('research.c1BreedingBatch.tracking.result')" min-width="120" align="center">
                  <template #default="{ row }">
                    <el-tag :type="getFieldResultTagType(row.trackingResult)" size="small">{{ getFieldResultText(row.trackingResult) }}</el-tag>
                  </template>
                </el-table-column>
              </template>

              <template v-else>
                <el-table-column prop="testId" :label="$t('research.c1BreedingBatch.test.testId')" min-width="180" show-overflow-tooltip />
                <el-table-column prop="batchId" :label="$t('research.detection.batchId')" min-width="160" show-overflow-tooltip />
                <el-table-column prop="seedClass" :label="$t('research.detection.seedClass')" min-width="100" align="center">
                  <template #default="{ row }">
                    <el-tag :type="row.seedClass === 'Basic' ? 'success' : 'warning'" size="small">{{ row.seedClass }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="testType" :label="$t('research.c1BreedingBatch.test.testType')" min-width="120" align="center" />
                <el-table-column prop="passStatus" :label="$t('research.c1BreedingBatch.test.passStatus')" min-width="100" align="center">
                  <template #default="{ row }">
                    <el-tag :type="row.passStatus === 'TRUE' ? 'success' : 'danger'" size="small">
                      {{ row.passStatus === 'TRUE' ? $t('research.c1BreedingBatch.test.passed') : $t('research.c1BreedingBatch.test.failed') }}
                    </el-tag>
                  </template>
                </el-table-column>
              </template>

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
const activeType = ref('field')
const activeStatus = ref('submitted')

const typeTabs = [
  { name: 'field', label: 'research.menu.fieldDetection', icon: 'ri-bar-chart-box-line' },
  { name: 'lab', label: 'research.menu.labTesting', icon: 'ri-flask-line' }
]

const statusTabs = [
  { name: 'submitted', label: 'research.detection.statusSubmitted', icon: 'ri-time-line' },
  { name: 'approved', label: 'research.detection.statusApproved', icon: 'ri-check-line' },
  { name: 'rejected', label: 'research.detection.statusRejected', icon: 'ri-close-circle-line' }
]

const loadData = async () => {
  loading.value = true
  try {
    const params = { pageNum: 1, pageSize: 1000, auditStatus: activeStatus.value }
    const res = activeType.value === 'field' ? await getTrackingList(params) : await getTestList(params)
    if (res.code === 200) {
      tableData.value = res.data?.records || []
    } else {
      tableData.value = []
    }
  } catch (error) {
    console.error('Load detection audit list error:', error)
    tableData.value = []
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleTypeChange = () => {
  loadData()
}

const handleStatusChange = () => {
  loadData()
}

const handleView = (row) => {
  router.push(activeType.value === 'field' ? `/research/field-detection/detail/${row.id}` : `/research/lab-testing/detail/${row.id}`)
}

const handleAudit = (row) => {
  router.push(`/research/detection-audit/form/${row.id}?type=${activeType.value}`)
}

const getFieldResultText = (result) => ({
  '01': t('research.c1BreedingBatch.tracking.resultNormal'),
  '02': t('research.c1BreedingBatch.tracking.resultAbnormal'),
  '03': t('research.c1BreedingBatch.tracking.resultObserving')
}[result] || result)

const getFieldResultTagType = (result) => ({
  '01': 'success',
  '02': 'danger',
  '03': 'warning'
}[result] || 'info')

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
</style>
