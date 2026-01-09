<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.farming.detailAudit') }}</h1>
          </div>
        </div>
        <div class="header-actions">
          <!-- Show "Approval" button when status is empty or pending approval -->
          <el-button
            v-if="!detailData.workflowStatus || detailData.workflowStatus === 'S1' || detailData.auditStatus === 'S1'"
            type="success"
            @click="handleAudit"
          >
            <i class="ri-check-line"></i>Approval
          </el-button>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- Farming Record Information -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>Farming Record Information</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="Farming Record ID">{{ detailData.farmingRecordId || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Plot ID">{{ detailData.plotId || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Trial ID">{{ detailData.trialId || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Batch ID">{{ detailData.batchId || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Activity Date">{{ formatDateTime(detailData.activityDate) }}</el-descriptions-item>
              <el-descriptions-item label="Activity Type">{{ detailData.activityType || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Input Name">{{ detailData.inputName || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Quantity">{{ detailData.quantity ? `${detailData.quantity} ${detailData.unit || ''}` : '-' }}</el-descriptions-item>
              <el-descriptions-item label="Operator ID">{{ detailData.operatorId || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Operation Description" :span="2">{{ detailData.operationDesc || '-' }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- Audit Information -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-info-line"></i>
              <span>Audit Information</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="Workflow Status">
                <el-tag :type="getStatusType(detailData.workflowStatus || detailData.auditStatus || 'S1')">
                  {{ getLabelByValue('flow_status', detailData.workflowStatus || detailData.auditStatus || 'S1') }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="Auditor (audit_by)">{{ detailData.auditBy || detailData.auditor || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Audit Time (audit_time)">{{ formatDateTime(detailData.auditTime || detailData.auditedDatetime) }}</el-descriptions-item>
              <el-descriptions-item label="Audit Remark (audit_remark)" :span="2">{{ detailData.auditRemark || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Creator">{{ detailData.creator || detailData.createBy || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Created Time">{{ formatDateTime(detailData.createTime) }}</el-descriptions-item>
              <el-descriptions-item label="Modifier">{{ detailData.modifier || detailData.updateBy || '-' }}</el-descriptions-item>
              <el-descriptions-item label="Modified Time">{{ formatDateTime(detailData.updateTime) }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getFarmingRecordInfo } from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const detailData = ref({})
const { options: dictOptions, getLabelByValue } = useDict('flow_status')

// Determine tag type based on status value
const getStatusType = (status) => {
  const typeMap = {
    'S0': 'info',     // Draft
    'S1': 'warning',  // Pending Approval
    'S2': 'success',  // Approved
    'S3': 'danger',   // Rejected
    'S10': 'info'     // Invalid
  }
  return typeMap[status] || 'warning'
}

// Format date time to 'YYYY-MM-DD HH:mm:ss'
const formatDateTime = (date) => {
  if (!date) return '-'
  if (typeof date === 'string') {
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(date)) return date
    // Pure date string: return as is (to avoid misleading display of fixed 00:00:00 if backend doesn't store time)
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date
  }
  const d = new Date(date)
  if (isNaN(d.getTime())) return date || '-'
  const pad = (n) => (n < 10 ? `0${n}` : `${n}`)
  const Y = d.getFullYear()
  const M = pad(d.getMonth() + 1)
  const D = pad(d.getDate())
  const h = pad(d.getHours())
  const m = pad(d.getMinutes())
  const s = pad(d.getSeconds())
  return `${Y}-${M}-${D} ${h}:${m}:${s}`
}

const getInfo = async () => {
  loading.value = true
  try {
    const res = await getFarmingRecordInfo(route.params.farmingId)
    detailData.value = res.data || {}
  } finally {
    loading.value = false
  }
}

const handleEdit = () => router.push(`/research/breeding-data/farming/edit/${route.params.farmingId}`)
const handleAudit = () => router.push(`/research/breeding-data/farming/farming-form/${route.params.farmingId}`)
const goBack = () => router.push('/research/breeding-data/farming/farming-index')

onMounted(() => getInfo())
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
