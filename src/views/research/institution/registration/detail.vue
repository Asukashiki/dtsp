<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader :title="$t('orgRegistration.form.title.view')" :subtitle="$t('orgRegistration.subtitle')" shadow
        show-back @back="handleBack" />

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 基本信息 -->
        <InfoCard :title="$t('orgRegistration.form.basicInfo')" icon="ri-information-line">
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('orgRegistration.form.orgType')">
              <el-tag :type="registrationData.orgType === 'UNION' ? 'primary' : 'success'">
                {{ $t(`orgRegistration.orgType.${registrationData.orgType}`) }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('orgRegistration.form.orgName')">
              {{ registrationData.orgName || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('orgRegistration.form.unifiedCode')">
              {{ registrationData.unifiedCode || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('orgRegistration.form.licenseNumber')">
              {{ registrationData.licenseNumber || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('orgRegistration.form.licenseStart')">
              {{ registrationData.licenseStart || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('orgRegistration.form.licenseEnd')">
              {{ registrationData.licenseEnd || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.variety.cropType')" :span="2">
              {{ getCropTypesLabel(registrationData.cropTypes) }}
            </el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <!-- 位置及联系信息 -->
        <InfoCard :title="$t('orgRegistration.form.locationInfo')" icon="ri-map-pin-line">
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('orgRegistration.form.regionCode')">
              {{ formatRegionName(registrationData.regionName) }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('orgRegistration.form.fullAddress')">
              {{ registrationData.fullAddress || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('orgRegistration.form.gpsLat')">
              {{ registrationData.gpsLat || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('orgRegistration.form.gpsLng')">
              {{ registrationData.gpsLng || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('orgRegistration.form.contactName')">
              {{ registrationData.contactName || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('orgRegistration.form.contactMobile')">
              {{ registrationData.contactMobile || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('orgRegistration.form.contactEmail')">
              {{ registrationData.contactEmail || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('orgRegistration.form.applyUsername')">
              {{ registrationData.applyUsername || '-' }}
            </el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <!-- 证照信息 -->
        <InfoCard :title="$t('orgRegistration.form.certificateInfo')" icon="ri-file-text-line">
          <div class="certificate-display">
            <div class="cert-item">
              <div class="cert-label">{{ $t('orgRegistration.form.businessLicenseUrl') }}</div>
              <el-image v-if="businessLicensePreviewUrl" :src="businessLicensePreviewUrl"
                :preview-src-list="[businessLicensePreviewUrl]" fit="contain" class="cert-image" />
              <div v-else class="no-cert">{{ $t('common.noImage') }}</div>
            </div>
            <div class="cert-item">
              <div class="cert-label">{{ $t('orgRegistration.form.taxCertUrl') }}</div>
              <el-image v-if="taxCertPreviewUrl" :src="taxCertPreviewUrl" :preview-src-list="[taxCertPreviewUrl]"
                fit="contain" class="cert-image" />
              <div v-else class="no-cert">{{ $t('common.noImage') }}</div>
            </div>
          </div>
        </InfoCard>

        <!-- 审核历史 -->
        <InfoCard v-if="auditLogs.length > 0" :title="$t('orgRegistration.form.auditHistory')" icon="ri-history-line">
          <el-timeline>
            <el-timeline-item v-for="(log, index) in auditLogs" :key="index"
              :type="log.auditResult === 1 ? 'success' : 'danger'" :timestamp="log.auditTime" placement="top">
              <el-card shadow="hover" class="audit-log-card">
                <div class="audit-log-header">
                  <el-tag :type="log.auditResult === 1 ? 'success' : 'danger'">
                    {{ log.auditResult === 1 ? $t('orgRegistration.status.approved') :
                      $t('orgRegistration.status.rejected') }}
                  </el-tag>
                  <span class="auditor-name">{{ $t('orgRegistration.form.auditorName') }}: {{ log.auditorName || '-'
                  }}</span>
                </div>
                <div class="audit-comment" v-if="log.auditComment">
                  {{ log.auditComment }}
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </InfoCard>

        <div class="form-actions">
          <el-button @click="handleBack">{{ $t('common.back') }}</el-button>
          <el-button type="primary" v-if="registrationData.auditStatus === 2" @click="handleEdit">
            {{ $t('common.edit') }}
          </el-button>
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
import { getRegistrationDetail } from '@/api/breedingOrgRegistration'
import { useDict } from '@/hooks/useDict'
import { getFilePreviewUrl } from '@/api/file'
import { PageHeader, InfoCard } from '@/components/common'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const registrationData = ref({})
const auditLogs = ref([])

// 证照预览 URL
const businessLicensePreviewUrl = ref('')
const taxCertPreviewUrl = ref('')

// 获取种子/作物类型字典
const { getLabelByValue } = useDict(['crop_type'], {
  immediate: true,
  cache: true
})

// 格式化作物类型
const getCropTypesLabel = (cropTypes) => {
  if (!cropTypes) return '-'
  return cropTypes.split(',')
    .filter(Boolean)
    .map(type => getLabelByValue('crop_type', type) || type)
    .join(', ')
}

// 格式化区域名称
const formatRegionName = (regionName) => {
  if (!regionName) return '-'
  return regionName.split('#').join(' > ')
}

const loadData = async () => {
  const id = route.params.id
  if (!id) return

  loading.value = true
  try {
    const res = await getRegistrationDetail(id)
    if (res.code === 200 && res.data) {
      registrationData.value = res.data.baseInfo || {}
      auditLogs.value = res.data.auditLogs || []

      // 加载图片预览
      if (registrationData.value.businessLicenseUrl) {
        getFilePreviewUrl(registrationData.value.businessLicenseUrl).then(pres => {
          if (pres.code === 200) businessLicensePreviewUrl.value = pres.msg
        })
      }
      if (registrationData.value.taxCertUrl) {
        getFilePreviewUrl(registrationData.value.taxCertUrl).then(pres => {
          if (pres.code === 200) taxCertPreviewUrl.value = pres.msg
        })
      }
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleBack = () => {
  router.back()
}

const handleEdit = () => {
  router.push({ name: 'RegistrationEdit', params: { id: registrationData.value.id } })
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';

.certificate-display {
  display: flex;
  gap: 48px;
  flex-wrap: wrap;
  padding: 16px 0;
}

.cert-item {
  text-align: center;

  .cert-label {
    font-size: 14px;
    color: #666;
    margin-bottom: 12px;
    font-weight: 500;
  }

  .cert-image {
    width: 240px;
    height: 240px;
    border-radius: 8px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  }

  .no-cert {
    width: 240px;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
    border: 1px dashed #dcdfe6;
    border-radius: 8px;
    color: #909399;
  }
}

.audit-log-card {
  margin-bottom: 8px;

  .audit-log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    .auditor-name {
      font-size: 14px;
      color: #666;
    }
  }

  .audit-comment {
    font-size: 14px;
    color: #333;
    line-height: 1.6;
    background: #f8f9fa;
    padding: 10px 14px;
    border-radius: 6px;
    margin-top: 8px;
  }
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 32px 0 16px;
}
</style>
