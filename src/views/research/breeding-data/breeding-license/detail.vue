<template>
  <div class="breeding-license-detail-container">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="icon-wrapper">
          <i class="ri-shield-check-line"></i>
        </div>
        <div class="header-text">
          <h1>{{ $t('research.breedingLicense.detail') }}</h1>
          <p class="subtitle">{{ licenseDetail.licenseNo }}</p>
        </div>
      </div>
      <div class="header-actions">
        <el-button @click="handleBack">
          <i class="ri-arrow-left-line"></i>
          {{ $t('research.breedingLicense.actions.backToList') }}
        </el-button>
        <el-button type="primary" @click="handleEdit">
          <i class="ri-edit-line"></i>
          {{ $t('research.breedingLicense.actions.edit') }}
        </el-button>
      </div>
    </div>

    <!-- License Detail Content -->
    <div class="detail-content" v-loading="loading">
      <!-- Basic Information -->
      <div class="detail-section">
        <h2 class="section-title">
          <i class="ri-information-line"></i>
          {{ $t('research.breedingLicense.sections.basicInfo') }}
        </h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.batchName') }}</span>
            <span class="value">{{ licenseDetail.batchName }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.datasetCode') }}</span>
            <span class="value">{{ licenseDetail.datasetCode || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.cropType') }}</span>
            <span class="value">{{ licenseDetail.cropType }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.varietyName') }}</span>
            <span class="value">{{ licenseDetail.varietyName }}</span>
          </div>
        </div>
      </div>

      <!-- License Information -->
      <div class="detail-section">
        <h2 class="section-title">
          <i class="ri-file-shield-line"></i>
          {{ $t('research.breedingLicense.sections.licenseInfo') }}
        </h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.licenseNo') }}</span>
            <span class="value">{{ licenseDetail.licenseNo }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.approvalOrg') }}</span>
            <span class="value">{{ licenseDetail.approvalOrg }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.approvalDate') }}</span>
            <span class="value">{{ licenseDetail.approvalDate }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.validStartDate') }}</span>
            <span class="value">{{ licenseDetail.validStartDate }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.validEndDate') }}</span>
            <span class="value">{{ licenseDetail.validEndDate }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.licenseStatus') }}</span>
            <span class="value">
              <el-tag :type="getStatusType(licenseDetail.licenseStatus)" effect="dark">
                {{ getStatusText(licenseDetail.licenseStatus) }}
              </el-tag>
            </span>
          </div>
          <div class="info-item full-width">
            <span class="label">{{ $t('research.breedingLicense.form.certificateFile') }}</span>
            <span v-if="licenseDetail.certificateFile" class="value file-link" @click="handlePreviewFile(licenseDetail.certificateFile)">
              <i class="ri-file-pdf-line"></i>
              {{ licenseDetail.certificateFileName || $t('research.breedingLicense.form.certificateFile') }}
            </span>
            <span v-else class="value">-</span>
          </div>
          <div class="info-item full-width" v-if="licenseDetail.remark">
            <span class="label">{{ $t('research.breedingLicense.form.remark') }}</span>
            <span class="value">{{ licenseDetail.remark }}</span>
          </div>
        </div>
      </div>

      <!-- Variety Traits -->
      <div class="detail-section">
        <h2 class="section-title">
          <i class="ri-plant-line"></i>
          {{ $t('research.breedingLicense.sections.varietyTraits') }}
        </h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.minYieldPotential') }}</span>
            <span class="value">{{ licenseDetail.minYieldPotential || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.maxYieldPotential') }}</span>
            <span class="value">{{ licenseDetail.maxYieldPotential || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.maturityDays') }}</span>
            <span class="value">{{ licenseDetail.maturityDays || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.plantHeight') }}</span>
            <span class="value">{{ licenseDetail.plantHeight || '-' }}</span>
          </div>
          <div class="info-item full-width" v-if="licenseDetail.diseaseResistance">
            <span class="label">{{ $t('research.breedingLicense.form.diseaseResistance') }}</span>
            <span class="value">
              <pre class="json-display">{{ formatJson(licenseDetail.diseaseResistance) }}</pre>
            </span>
          </div>
          <div class="info-item full-width" v-if="licenseDetail.stressTolerance">
            <span class="label">{{ $t('research.breedingLicense.form.stressTolerance') }}</span>
            <span class="value">
              <pre class="json-display">{{ formatJson(licenseDetail.stressTolerance) }}</pre>
            </span>
          </div>
          <div class="info-item full-width" v-if="licenseDetail.grainQualityTraits">
            <span class="label">{{ $t('research.breedingLicense.form.grainQualityTraits') }}</span>
            <span class="value">{{ licenseDetail.grainQualityTraits }}</span>
          </div>
          <div class="info-item full-width" v-if="licenseDetail.otherTraits">
            <span class="label">{{ $t('research.breedingLicense.form.otherTraits') }}</span>
            <span class="value">
              <pre class="json-display">{{ formatJson(licenseDetail.otherTraits) }}</pre>
            </span>
          </div>
        </div>
      </div>

      <!-- Operation Information -->
      <div class="detail-section">
        <h2 class="section-title">
          <i class="ri-time-line"></i>
          {{ $t('research.breedingLicense.form.operationInfo') }}
        </h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.createTime') }}</span>
            <span class="value">{{ licenseDetail.createdTime }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.createBy') }}</span>
            <span class="value">{{ licenseDetail.createdByName || '-' }}</span>
          </div>
          <div class="info-item" v-if="licenseDetail.updatedTime">
            <span class="label">{{ $t('research.breedingLicense.form.updateTime') }}</span>
            <span class="value">{{ licenseDetail.updatedTime }}</span>
          </div>
          <div class="info-item" v-if="licenseDetail.updatedByName">
            <span class="label">{{ $t('research.breedingLicense.form.updateBy') }}</span>
            <span class="value">{{ licenseDetail.updatedByName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getLicenseById } from '@/api/breedingLicense'
import { getFilePreviewUrl } from '@/api/file'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

// State
const loading = ref(false)
const licenseDetail = ref({})

// Get Status Type
const getStatusType = (status) => {
  const typeMap = {
    valid: 'success',
    expired: 'warning',
    revoked: 'danger'
  }
  return typeMap[status] || 'info'
}

// Get Status Text
const getStatusText = (status) => {
  return t(`research.breedingLicense.status.${status}`) || status
}

// Format JSON
const formatJson = (jsonStr) => {
  try {
    const obj = typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr
    return JSON.stringify(obj, null, 2)
  } catch (e) {
    return jsonStr
  }
}

// Fetch License Detail
const fetchLicenseDetail = async () => {
  loading.value = true
  try {
    const res = await getLicenseById(route.params.id)
    if (res.code === 200) {
      licenseDetail.value = res.data
    } else {
      ElMessage.error(res.msg || t('common.loadFailed'))
    }
  } catch (error) {
    console.error('Failed to fetch license detail:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// Handle Back
const handleBack = () => {
  router.back()
}

// Handle Preview File
const handlePreviewFile = async (fileId) => {
  if (!fileId) return

  try {
    const res = await getFilePreviewUrl(fileId)
    if (res.code === 200 && res.msg) {
      window.open(res.msg, '_blank')
    } else {
      ElMessage.error(t('common.previewFailed'))
    }
  } catch (error) {
    console.error('Failed to preview file:', error)
    ElMessage.error(t('common.failed'))
  }
}

// Handle Edit
const handleEdit = () => {
  router.push({ name: 'BreedingLicenseEdit', params: { id: route.params.id } })
}

// Initialize
onMounted(() => {
  fetchLicenseDetail()
})
</script>

<style scoped>
.breeding-license-detail-container {
  padding: 24px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

/* Page Header */
.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 50%, #FEDD00 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.icon-wrapper i {
  font-size: 48px;
  color: white;
}

.header-text h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  margin: 8px 0 0 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.95);
}

.header-actions {
  display: flex;
  gap: 12px;
}

/* Detail Content */
.detail-content {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.detail-section {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e4e7ed;
}

.detail-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 24px 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.section-title i {
  font-size: 24px;
  color: #009A44;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-item .label {
  font-size: 14px;
  font-weight: 500;
  color: #909399;
}

.info-item .value {
  font-size: 15px;
  color: #303133;
  word-break: break-word;
}

.json-display {
  background: #f5f7fa;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 12px;
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #606266;
  overflow-x: auto;
}

/* 文件链接样式 */
.file-link {
  color: #009A44 !important;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s;
}

.file-link:hover {
  color: #007a36 !important;
  text-decoration: underline;
}

.file-link i {
  font-size: 16px;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .breeding-license-detail-container {
    padding: 16px;
  }

  .page-header {
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .header-content {
    gap: 12px;
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
  }

  .icon-wrapper i {
    font-size: 32px;
  }

  .header-text h1 {
    font-size: 24px;
  }

  .subtitle {
    font-size: 14px;
  }

  .header-actions {
    width: 100%;
    flex-direction: column;
  }

  .header-actions .el-button {
    width: 100%;
  }

  .detail-content {
    padding: 20px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
