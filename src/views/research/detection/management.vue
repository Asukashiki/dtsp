<template>
  <div class="page-container">
    <div class="page-wrapper">
      <PageHeader icon="ri-microscope-line" :title="$t('research.menu.detectionManagement')"
        :subtitle="$t('research.menu.detectionManagementSubtitle')" />

      <div class="content-wrapper">
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('research.detection.batchId')">
              <el-select v-model="filterForm.batchId" :placeholder="$t('research.detection.allBatches')" clearable filterable>
                <el-option-group :label="$t('research.detection.batchSelector.basicBatches')">
                  <el-option v-for="batch in basicBatches" :key="batch.batchId" :label="batch.batchId" :value="batch.batchId" />
                </el-option-group>
                <el-option-group :label="$t('research.detection.batchSelector.c1Batches')">
                  <el-option v-for="batch in c1Batches" :key="batch.batchId" :label="batch.batchId" :value="batch.batchId" />
                </el-option-group>
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('research.detection.seedClass')">
              <el-select v-model="filterForm.seedClass" :placeholder="$t('research.detection.allSeedClasses')" clearable>
                <el-option label="Basic" value="Basic" />
                <el-option label="C1" value="C1" />
              </el-select>
            </SearchItem>

            <SearchItem :label="activeTab === 'field' ? $t('research.c1BreedingBatch.tracking.result') : $t('research.c1BreedingBatch.test.testType')">
              <el-select v-model="filterForm.extraFilter" :placeholder="$t('research.detection.allResults')" clearable>
                <template v-if="activeTab === 'field'">
                  <el-option :label="$t('research.c1BreedingBatch.tracking.resultNormal')" value="01" />
                  <el-option :label="$t('research.c1BreedingBatch.tracking.resultAbnormal')" value="02" />
                  <el-option :label="$t('research.c1BreedingBatch.tracking.resultObserving')" value="03" />
                </template>
                <template v-else>
                  <el-option label="Germination" value="GERMINATION" />
                  <el-option label="Purity" value="PURITY" />
                  <el-option label="Moisture" value="MOISTURE" />
                  <el-option label="Vigor" value="VIGOR" />
                </template>
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <InfoCard :title="$t('research.menu.detectionManagement')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('research.detection.add') }}
            </el-button>
          </template>

          <StatusTabs v-model="activeTab" :tabs="tabs" @tab-change="handleTabChange" />

          <div class="table-wrapper pc-only">
            <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" table-layout="fixed">
              <template v-if="activeTab === 'field'">
                <el-table-column prop="trackingId" :label="$t('research.c1BreedingBatch.tracking.trackingId')" min-width="180" show-overflow-tooltip />
                <el-table-column prop="batchId" :label="$t('research.detection.batchId')" min-width="160" show-overflow-tooltip />
                <el-table-column prop="seedClass" :label="$t('research.detection.seedClass')" min-width="100" align="center">
                  <template #default="{ row }">
                    <el-tag :type="row.seedClass === 'Basic' ? 'success' : 'warning'" size="small">{{ row.seedClass }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="lotId" :label="$t('research.c1BreedingBatch.tracking.lotId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="stage" :label="$t('research.c1BreedingBatch.tracking.stage')" min-width="120" align="center" />
                <el-table-column prop="inspectionValue" :label="$t('research.c1BreedingBatch.tracking.inspectionValue')" min-width="100" align="center" />
                <el-table-column prop="location" :label="$t('research.c1BreedingBatch.tracking.location')" min-width="150" show-overflow-tooltip />
                <el-table-column prop="trackingResult" :label="$t('research.c1BreedingBatch.tracking.result')" min-width="100" align="center">
                  <template #default="{ row }">
                    <el-tag :type="getFieldResultTagType(row)" size="small">{{ getFieldResultText(row) }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="auditStatus" :label="$t('research.detection.auditStatus')" min-width="120" align="center">
                  <template #default="{ row }">
                    <el-tag :type="getAuditStatusType(row.auditStatus)" size="small">{{ getAuditStatusText(row.auditStatus) }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="startDate" :label="$t('research.c1BreedingBatch.tracking.startDate')" min-width="120" align="center" />
              </template>

              <template v-else>
                <el-table-column prop="testId" :label="$t('research.c1BreedingBatch.test.testId')" min-width="180" show-overflow-tooltip />
                <el-table-column prop="batchId" :label="$t('research.detection.batchId')" min-width="160" show-overflow-tooltip />
                <el-table-column prop="seedClass" :label="$t('research.detection.seedClass')" min-width="100" align="center">
                  <template #default="{ row }">
                    <el-tag :type="row.seedClass === 'Basic' ? 'success' : 'warning'" size="small">{{ row.seedClass }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="lotId" :label="$t('research.c1BreedingBatch.test.lotId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="testType" :label="$t('research.c1BreedingBatch.test.testType')" min-width="120" align="center" />
                <el-table-column prop="testValue" :label="$t('research.c1BreedingBatch.test.testValue')" min-width="100" align="center">
                  <template #default="{ row }">{{ row.testValue }}{{ row.unit || '' }}</template>
                </el-table-column>
                <el-table-column prop="passStatus" :label="$t('research.c1BreedingBatch.test.passStatus')" min-width="100" align="center">
                  <template #default="{ row }">
                    <el-tag v-if="row.passStatus === 'TRUE' || row.passStatus === 'FALSE'"
                      :type="row.passStatus === 'TRUE' ? 'success' : 'danger'" size="small">
                      {{ row.passStatus === 'TRUE' ? $t('research.c1BreedingBatch.test.passed') : $t('research.c1BreedingBatch.test.failed') }}
                    </el-tag>
                    <span v-else>-</span>
                  </template>
                </el-table-column>
                <el-table-column prop="auditStatus" :label="$t('research.detection.auditStatus')" min-width="120" align="center">
                  <template #default="{ row }">
                    <el-tag :type="getAuditStatusType(row.auditStatus)" size="small">{{ getAuditStatusText(row.auditStatus) }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="testDate" :label="$t('research.c1BreedingBatch.test.testDate')" min-width="120" align="center" />
                <el-table-column prop="tester" :label="$t('research.c1BreedingBatch.test.tester')" min-width="120" show-overflow-tooltip />
              </template>

              <el-table-column :label="$t('common.actions')" width="300" fixed="right" align="center">
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button size="small" type="primary" @click="handleView(row)">
                      <i class="ri-eye-line"></i>
                      <span class="btn-text">{{ $t('common.view') }}</span>
                    </el-button>
                    <el-button v-if="canEdit(row)" size="small" type="primary" @click="handleEdit(row)">
                      <i class="ri-edit-line"></i>
                      <span class="btn-text">{{ $t('common.edit') }}</span>
                    </el-button>
                    <el-button v-if="canSubmit(row)" size="small" type="success" @click="handleSubmitAudit(row.id)">
                      <i class="ri-send-plane-line"></i>
                      <span class="btn-text">{{ $t('common.submit') }}</span>
                    </el-button>
                    <el-button v-if="canDelete(row)" size="small" type="danger" @click="handleDelete(row.id)">
                      <i class="ri-delete-bin-line"></i>
                      <span class="btn-text">{{ $t('common.delete') }}</span>
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination v-model:current-page="pagination.pageNum" v-model:page-size="pagination.pageSize"
                :page-sizes="[10, 20, 50, 100]" :total="pagination.total" layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange" @current-change="handlePageChange" />
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import StatusTabs from '@/components/workflow/StatusTabs.vue'
import {
  deleteTest,
  deleteTracking,
  getBatchesForDetection,
  getTestList,
  getTrackingList,
  submitTest,
  submitTracking
} from '@/api/detection'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const activeTab = ref('field')
const tabs = [
  { name: 'field', label: 'research.menu.fieldDetection', icon: 'ri-bar-chart-box-line' },
  { name: 'lab', label: 'research.menu.labTesting', icon: 'ri-flask-line' }
]

const loading = ref(false)
const tableData = ref([])
const allBatches = ref([])

const filterForm = ref({
  batchId: '',
  seedClass: '',
  extraFilter: ''
})

const pagination = ref({
  pageNum: 1,
  pageSize: 20,
  total: 0
})

const basicBatches = computed(() => allBatches.value.filter(b => b.seedClass === 'Basic'))
const c1Batches = computed(() => allBatches.value.filter(b => b.seedClass === 'C1'))

const loadBatches = async () => {
  const res = await getBatchesForDetection()
  if (res.code === 200 && res.data) {
    allBatches.value = res.data
  }
}

const loadList = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: pagination.value.pageNum,
      pageSize: pagination.value.pageSize
    }
    if (filterForm.value.batchId) params.batchId = filterForm.value.batchId
    if (filterForm.value.seedClass) params.seedClass = filterForm.value.seedClass
    if (filterForm.value.extraFilter) {
      if (activeTab.value === 'field') {
        params.trackingResult = filterForm.value.extraFilter
      } else {
        params.testType = filterForm.value.extraFilter
      }
    }

    const res = activeTab.value === 'field' ? await getTrackingList(params) : await getTestList(params)
    if (res.code === 200) {
      tableData.value = res.data?.records || []
      pagination.value.total = res.data?.total || 0
    }
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.value.pageNum = 1
  loadList()
}

const handleReset = () => {
  filterForm.value = { batchId: '', seedClass: '', extraFilter: '' }
  pagination.value.pageNum = 1
  loadList()
}

const handleTabChange = () => {
  filterForm.value.extraFilter = ''
  pagination.value.pageNum = 1
  loadList()
}

const handleAdd = () => {
  router.push(activeTab.value === 'field' ? '/research/field-detection/add' : '/research/lab-testing/add')
}

const handleView = (row) => {
  router.push(activeTab.value === 'field' ? `/research/field-detection/detail/${row.id}` : `/research/lab-testing/detail/${row.id}`)
}

const handleEdit = (row) => {
  router.push({
    path: activeTab.value === 'field' ? '/research/field-detection/add' : '/research/lab-testing/add',
    query: { id: row.id, batchId: row.batchId, seedClass: row.seedClass }
  })
}

const handleDelete = (id) => {
  ElMessageBox.confirm(
    activeTab.value === 'field' ? t('research.c1BreedingBatch.tracking.deleteConfirm') : t('research.c1BreedingBatch.test.deleteConfirm'),
    t('common.warning'),
    { confirmButtonText: t('common.confirm'), cancelButtonText: t('common.cancel'), type: 'warning' }
  ).then(async () => {
    const res = activeTab.value === 'field' ? await deleteTracking([id]) : await deleteTest([id])
    if (res.code === 200) {
      ElMessage.success(t('common.deleteSuccess'))
      loadList()
    }
  }).catch(() => {})
}

const handleSubmitAudit = async (id) => {
  const res = activeTab.value === 'field' ? await submitTracking(id) : await submitTest(id)
  if (res.code === 200) {
    ElMessage.success(t('common.submitSuccess'))
    loadList()
  }
}

const handleSizeChange = (size) => {
  pagination.value.pageSize = size
  pagination.value.pageNum = 1
  loadList()
}

const handlePageChange = (page) => {
  pagination.value.pageNum = page
  loadList()
}

const getDisplayTrackingResult = (row) => {
  if (row?.auditStatus === 'approved' && row?.trackingResult === '02') {
    return '01'
  }
  return row?.trackingResult
}

const getFieldResultText = (row) => ({
  '01': t('research.c1BreedingBatch.tracking.resultNormal'),
  '02': t('research.c1BreedingBatch.tracking.resultAbnormal'),
  '03': t('research.c1BreedingBatch.tracking.resultObserving')
}[getDisplayTrackingResult(row)] || getDisplayTrackingResult(row))

const getFieldResultTagType = (row) => ({
  '01': 'success',
  '02': 'danger',
  '03': 'warning'
}[getDisplayTrackingResult(row)] || 'info')

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

const canEdit = (row) => row?.auditStatus !== 'approved'
const canDelete = (row) => row?.auditStatus !== 'approved'

const canSubmit = (row) => ['draft', 'rejected', '', null, undefined].includes(row.auditStatus)

onMounted(async () => {
  if (route.query.tab === 'lab') {
    activeTab.value = 'lab'
  }
  await loadBatches()
  await loadList()
})

watch(() => route.query.tab, (tab) => {
  if (tab === 'field' || tab === 'lab') {
    activeTab.value = tab
    filterForm.value.extraFilter = ''
    pagination.value.pageNum = 1
    loadList()
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';

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
