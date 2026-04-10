<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleCancel">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ pageTitle }}</h1>
          </div>
        </div>
      </div>

      <div class="content-wrapper" v-loading="loading">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>{{ $t('common.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item :label="$t('research.detection.batchId')">{{ summary.batchId || '-' }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.detection.seedClass')">
                <span v-if="summary.seedClasses.length === 0">-</span>
                <span v-else>{{ summary.seedClasses.join(' / ') }}</span>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.menu.fieldDetection')">{{ summary.fieldCount }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.menu.labTesting')">{{ summary.labCount }}</el-descriptions-item>
              <el-descriptions-item :label="$t('research.detection.statusSubmitted')">{{ summary.submittedCount }}</el-descriptions-item>
              <el-descriptions-item :label="$t('common.submitTime')">{{ formatDateTime(summary.latestSubmitTime) }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-table-line"></i>
              <span>{{ $t('common.detail') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-tabs v-model="activeTab">
              <el-tab-pane :label="`${$t('research.menu.fieldDetection')} (${fieldList.length})`" name="field">
                <el-table :data="fieldList" stripe table-layout="fixed">
                  <el-table-column prop="trackingId" :label="$t('research.c1BreedingBatch.tracking.trackingId')" min-width="170" show-overflow-tooltip />
                  <el-table-column prop="stage" :label="$t('research.c1BreedingBatch.tracking.stage')" min-width="110" align="center" />
                  <el-table-column prop="inspectionValue" :label="$t('research.c1BreedingBatch.tracking.inspectionValue')" min-width="110" align="center" />
                  <el-table-column prop="trackingResult" :label="$t('research.c1BreedingBatch.tracking.result')" min-width="110" align="center">
                    <template #default="{ row }">
                      <el-tag :type="getFieldResultTagType(row.trackingResult)" size="small">{{ getFieldResultText(row.trackingResult) }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="auditStatus" :label="$t('research.detection.auditStatus')" min-width="110" align="center">
                    <template #default="{ row }">
                      <el-tag :type="getAuditStatusType(row.auditStatus)" size="small">{{ getAuditStatusText(row.auditStatus) }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="submitTime" :label="$t('common.submitTime')" min-width="160" align="center">
                    <template #default="{ row }">{{ formatDateTime(row.submitTime) }}</template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>

              <el-tab-pane :label="`${$t('research.menu.labTesting')} (${labList.length})`" name="lab">
                <el-table :data="labList" stripe table-layout="fixed">
                  <el-table-column prop="testId" :label="$t('research.c1BreedingBatch.test.testId')" min-width="170" show-overflow-tooltip />
                  <el-table-column prop="testType" :label="$t('research.c1BreedingBatch.test.testType')" min-width="120" align="center" />
                  <el-table-column prop="testValue" :label="$t('research.c1BreedingBatch.test.testValue')" min-width="120" align="center">
                    <template #default="{ row }">{{ formatTestValue(row) }}</template>
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
                  <el-table-column prop="auditStatus" :label="$t('research.detection.auditStatus')" min-width="110" align="center">
                    <template #default="{ row }">
                      <el-tag :type="getAuditStatusType(row.auditStatus)" size="small">{{ getAuditStatusText(row.auditStatus) }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="submitTime" :label="$t('common.submitTime')" min-width="160" align="center">
                    <template #default="{ row }">{{ formatDateTime(row.submitTime) }}</template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>

        <el-form v-if="!isViewMode" ref="formRef" :model="formData" :rules="rules" label-width="120px">
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-checkbox-circle-line"></i>
                <span>{{ $t('common.audit') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.detection.auditResult')" prop="result">
                    <el-radio-group v-model="formData.result">
                      <el-radio value="approved">{{ $t('research.detection.auditApproved') }}</el-radio>
                      <el-radio value="rejected">{{ $t('research.detection.auditRejected') }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :xs="24">
                  <el-form-item :label="$t('research.detection.auditComment')" prop="comment">
                    <el-input v-model="formData.comment" type="textarea" :rows="4" maxlength="500" show-word-limit />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="form-actions">
            <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" :loading="submitting" @click="handleSubmit">{{ $t('common.submit') }}</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { approveTest, approveTracking, getTestList, getTrackingList, rejectTest, rejectTracking } from '@/api/detection'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const submitting = ref(false)
const activeTab = ref('field')
const fieldList = ref([])
const labList = ref([])

const formData = reactive({
  result: 'approved',
  comment: ''
})

const isViewMode = computed(() => route.query.mode === 'view')
const fromPage = computed(() => route.query.from || '')
const pageTitle = computed(() => isViewMode.value ? `${t('research.menu.detectionAudit')}${t('common.view')}` : `${t('research.menu.detectionAudit')}${t('common.audit')}`)
const batchId = computed(() => route.params.id)
const summary = computed(() => {
  const allRecords = [...fieldList.value, ...labList.value]
  const seedClassSet = new Set(allRecords.map(item => item.seedClass).filter(Boolean))
  const submitTimes = allRecords.map(item => item.submitTime).filter(Boolean)
  const latestSubmitTime = submitTimes.length === 0
    ? ''
    : submitTimes.reduce((latest, current) => (
      !latest || new Date(current).getTime() > new Date(latest).getTime() ? current : latest
    ), '')
  const submittedCount = allRecords.filter(item => item.auditStatus === 'submitted').length
  return {
    batchId: batchId.value,
    seedClasses: Array.from(seedClassSet),
    fieldCount: fieldList.value.length,
    labCount: labList.value.length,
    submittedCount,
    latestSubmitTime
  }
})

const rules = computed(() => ({
  result: [{ required: true, message: t('common.pleaseSelect'), trigger: 'change' }],
  comment: [{ required: true, message: t('common.pleaseInput'), trigger: 'blur' }]
}))

const loadDetail = async () => {
  loading.value = true
  try {
    const params = { pageNum: 1, pageSize: 1000, batchId: batchId.value }
    const [fieldRes, labRes] = await Promise.all([getTrackingList(params), getTestList(params)])
    fieldList.value = fieldRes.code === 200 ? (fieldRes.data?.records || []) : []
    labList.value = labRes.code === 200 ? (labRes.data?.records || []) : []
    if (fieldList.value.length === 0 && labList.value.length === 0) {
      ElMessage.error(t('common.loadFailed'))
      router.push('/research/detection-audit')
    }
  } catch (error) {
    console.error('Load detection audit detail error:', error)
    ElMessage.error(t('common.loadFailed'))
    router.push('/research/detection-audit')
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    const submittedField = fieldList.value.filter(item => item.auditStatus === 'submitted')
    const submittedLab = labList.value.filter(item => item.auditStatus === 'submitted')
    if (submittedField.length === 0 && submittedLab.length === 0) {
      ElMessage.warning(t('common.noData'))
      return
    }

    submitting.value = true
    const fieldFn = formData.result === 'approved' ? approveTracking : rejectTracking
    const labFn = formData.result === 'approved' ? approveTest : rejectTest
    const requests = [
      ...submittedField.map(item => fieldFn({ id: item.id, auditComment: formData.comment })),
      ...submittedLab.map(item => labFn({ id: item.id, auditComment: formData.comment }))
    ]
    const results = await Promise.all(requests)
    const failed = results.find(item => item.code !== 200)
    if (failed) {
      ElMessage.error(failed.msg || t('common.submitFailed'))
      return
    }
    ElMessage.success(formData.result === 'approved' ? t('research.detection.auditSuccessApproved') : t('research.detection.auditSuccessRejected'))
    router.push('/research/detection-audit')
  } catch (error) {
    if (error !== false) {
      console.error('Submit detection audit form error:', error)
      ElMessage.error(t('common.submitFailed'))
    }
  } finally {
    submitting.value = false
  }
}

const handleCancel = () => {
  if (fromPage.value === 'certificate') {
    router.push('/research/c1-breeding-certificate')
    return
  }
  router.push('/research/detection-audit')
}

const getFieldResultText = (result) => ({
  '01': t('research.c1BreedingBatch.tracking.resultNormal'),
  '02': t('research.c1BreedingBatch.tracking.resultAbnormal'),
  '03': t('research.c1BreedingBatch.tracking.resultObserving')
}[result] || result || '-')

const formatTestValue = (row) => {
  if (!row) return '-'
  return `${row.testValue || '-'}${row.unit || ''}`
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

const getFieldResultTagType = (result) => ({
  '01': 'success',
  '02': 'danger',
  '03': 'warning'
}[result] || 'info')

const formatDateTime = (value) => {
  if (!value) return '-'
  if (typeof value !== 'string') return value
  return value.includes('T') ? value.replace('T', ' ') : value
}

onMounted(() => {
  loadDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
