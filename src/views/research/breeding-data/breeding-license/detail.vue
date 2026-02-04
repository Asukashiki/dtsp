<template>
  <div class="page-container">
    <div class="page-wrapper">
    <!-- Page Header -->
    <PageHeader
      icon="ri-shield-check-line"
      :title="$t('research.breedingLicense.detail')"
      :subtitle="licenseDetail.licenseNo"
      showBack
      @back="handleBack"
    >
      <!-- <template #actions>
        <el-button type="primary" @click="handleEdit">
          <i class="ri-edit-line"></i>
          {{ $t('research.breedingLicense.actions.edit') }}
        </el-button>
      </template> -->
    </PageHeader>

    <div class="content-wrapper">
    <!-- Basic Information -->
    <InfoCard :title="$t('research.breedingLicense.sections.basicInfo')" icon="ri-information-line">
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('research.breedingLicense.form.batchName')">
          {{ licenseDetail.batchName }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.datasetCode')">
          {{ licenseDetail.datasetCode || '-' }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.cropType')">
          {{ getLabelByValue('crop_type', licenseDetail.cropType) || licenseDetail.cropType }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.varietyName')">
          {{ licenseDetail.varietyName }}
        </el-descriptions-item>
      </el-descriptions>
    </InfoCard>

    <!-- License Information -->
    <InfoCard :title="$t('research.breedingLicense.sections.licenseInfo')" icon="ri-file-shield-line">
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('research.breedingLicense.form.licenseNo')">
          {{ licenseDetail.licenseNo }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.approvalOrg')">
          {{ licenseDetail.approvalOrg }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.approvalDate')">
          {{ licenseDetail.approvalDate }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.validStartDate')">
          {{ licenseDetail.validStartDate }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.validEndDate')">
          {{ licenseDetail.validEndDate }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.licenseStatus')">
          <el-tag :type="getStatusType(licenseDetail.licenseStatus)" effect="dark">
            {{ getStatusText(licenseDetail.licenseStatus) }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.certificateFile')" :span="2">
          <span v-if="licenseDetail.certificateFile" class="file-link" @click="handlePreviewFile(licenseDetail.certificateFile)">
            <i class="ri-file-pdf-line"></i>
            {{ licenseDetail.certificateFileName || $t('research.breedingLicense.form.certificateFile') }}
          </span>
          <span v-else>-</span>
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.remark')" :span="2">
          {{ licenseDetail.remark || '-' }}
        </el-descriptions-item>
      </el-descriptions>
    </InfoCard>

    <!-- Variety Traits -->
    <InfoCard :title="$t('research.breedingLicense.sections.varietyTraits')" icon="ri-plant-line">
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('research.breedingLicense.form.minYieldPotential')">
          {{ licenseDetail.minYieldPotential || '-' }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.maxYieldPotential')">
          {{ licenseDetail.maxYieldPotential || '-' }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.maturityDays')">
          {{ licenseDetail.maturityDays || '-' }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.plantHeight')">
          {{ licenseDetail.plantHeight || '-' }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.diseaseResistance')" :span="2">
          {{ licenseDetail.diseaseResistance || '-' }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.stressTolerance')" :span="2">
          {{ licenseDetail.stressTolerance || '-' }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.grainQualityTraits')" :span="2">
          {{ licenseDetail.grainQualityTraits || '-' }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.otherTraits')" :span="2">
          {{ licenseDetail.otherTraits || '-' }}
        </el-descriptions-item>
      </el-descriptions>
    </InfoCard>

    <!-- Operation Information -->
    <InfoCard :title="$t('research.breedingLicense.form.operationInfo')" icon="ri-time-line">
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('research.breedingLicense.form.createTime')">
          {{ licenseDetail.createdTime }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.createBy')">
          {{ licenseDetail.createdByName || '-' }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.updateTime')" v-if="licenseDetail.updatedTime">
          {{ licenseDetail.updatedTime }}
        </el-descriptions-item>
        <el-descriptions-item :label="$t('research.breedingLicense.form.updateBy')" v-if="licenseDetail.updatedByName">
          {{ licenseDetail.updatedByName }}
        </el-descriptions-item>
      </el-descriptions>
    </InfoCard>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import PageHeader from '@/components/common/PageHeader.vue'
import InfoCard from '@/components/common/InfoCard.vue'
import { getLicenseById } from '@/api/breedingLicense'
import { getFilePreviewUrl } from '@/api/file'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

// 字典数据
const { getLabelByValue } = useDict(['crop_type', 'license_status', 'approval_org'])

// Back Handler
const handleBack = () => {
  router.back()
}

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
  return getLabelByValue('license_status', status) || status
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

<style scoped lang="scss">
@use '@/assets/styles/page-common.scss' as *;

.file-link {
  color: var(--el-color-primary) !important;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s;
  
  &:hover {
    color: var(--el-color-primary-dark-2) !important;
    text-decoration: underline;
  }
  
  i {
    font-size: 16px;
  }
}
</style>
