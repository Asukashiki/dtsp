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
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.detection.batchId')">
                  <el-input :value="detail.batchId || '-'" disabled />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.detection.seedClass')">
                  <el-input :value="detail.seedClass || '-'" disabled />
                </el-form-item>
              </el-col>

              <template v-if="isFieldType">
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.tracking.trackingId')">
                    <el-input :value="detail.trackingId || '-'" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.tracking.result')">
                    <el-input :value="getFieldResultText(detail.trackingResult)" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.tracking.location')">
                    <el-input :value="detail.location || '-'" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.tracking.startDate')">
                    <el-input :value="detail.startDate || '-'" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24">
                  <el-form-item :label="$t('research.c1BreedingBatch.tracking.trackingDesc')">
                    <el-input :value="detail.trackingDesc || '-'" type="textarea" :rows="3" disabled />
                  </el-form-item>
                </el-col>
              </template>

              <template v-else>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.test.testId')">
                    <el-input :value="detail.testId || '-'" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.test.testType')">
                    <el-input :value="detail.testType || '-'" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.test.testValue')">
                    <el-input :value="formatTestValue(detail)" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.test.passStatus')">
                    <el-input :value="detail.passStatus === 'TRUE' ? $t('research.c1BreedingBatch.test.passed') : $t('research.c1BreedingBatch.test.failed')" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.test.testDate')">
                    <el-input :value="detail.testDate || '-'" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item :label="$t('research.c1BreedingBatch.test.tester')">
                    <el-input :value="detail.tester || '-'" disabled />
                  </el-form-item>
                </el-col>
                <el-col :xs="24">
                  <el-form-item :label="$t('research.c1BreedingBatch.test.testDesc')">
                    <el-input :value="detail.testDesc || '-'" type="textarea" :rows="3" disabled />
                  </el-form-item>
                </el-col>
              </template>
            </el-row>
          </div>
        </div>

        <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
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
import { approveTest, approveTracking, getTestById, getTrackingById, rejectTest, rejectTracking } from '@/api/detection'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const submitting = ref(false)
const detail = ref({})

const formData = reactive({
  result: 'approved',
  comment: ''
})

const auditType = computed(() => route.query.type === 'lab' ? 'lab' : 'field')
const isFieldType = computed(() => auditType.value === 'field')
const pageTitle = computed(() => isFieldType.value ? t('research.menu.fieldDetection') + t('common.audit') : t('research.menu.labTesting') + t('common.audit'))

const rules = computed(() => ({
  result: [{ required: true, message: t('common.pleaseSelect'), trigger: 'change' }],
  comment: [{ required: true, message: t('common.pleaseInput'), trigger: 'blur' }]
}))

const loadDetail = async () => {
  loading.value = true
  try {
    const id = route.params.id
    const res = isFieldType.value ? await getTrackingById(id) : await getTestById(id)
    if (res.code === 200 && res.data) {
      detail.value = res.data
    } else {
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
    submitting.value = true
    const payload = { id: route.params.id, auditComment: formData.comment }
    const res = isFieldType.value
      ? (formData.result === 'approved' ? await approveTracking(payload) : await rejectTracking(payload))
      : (formData.result === 'approved' ? await approveTest(payload) : await rejectTest(payload))
    if (res.code === 200) {
      ElMessage.success(formData.result === 'approved' ? t('research.detection.auditSuccessApproved') : t('research.detection.auditSuccessRejected'))
      router.push('/research/detection-audit')
    }
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

onMounted(() => {
  loadDetail()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
