<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader icon="ri-checkbox-circle-line" :title="$t('orgRegistration.form.title.audit')"
        :subtitle="$t('orgRegistration.subtitle')" shadow show-back @back="handleCancel" />

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 基本信息（只读） -->
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
            <el-descriptions-item :label="$t('orgRegistration.form.regionCode')">
              {{ formatRegionName(registrationData.regionName) }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.variety.cropType')">
              {{ getCropTypesLabel(registrationData.cropTypes) }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('orgRegistration.form.applyUsername')">
              {{ registrationData.applyUsername || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('orgRegistration.form.contactMobile')">
              {{ registrationData.contactMobile || '-' }}
            </el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <!-- 证照预览 -->
        <InfoCard :title="$t('orgRegistration.form.certificateInfo')" icon="ri-image-line">
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

        <!-- 审核操作 -->
        <InfoCard :title="$t('orgRegistration.form.auditInfo')" icon="ri-checkbox-multiple-line">
          <el-form ref="formRef" :model="auditForm" :rules="rules" label-width="160px" class="audit-form-content">
            <el-form-item :label="$t('orgRegistration.form.auditResult')" prop="auditResult">
              <el-radio-group v-model="auditForm.auditResult">
                <el-radio :label="1">
                  <el-tag type="success" effect="plain">{{ $t('orgRegistration.auditResultOptions.approve') }}</el-tag>
                </el-radio>
                <el-radio :label="2">
                  <el-tag type="danger" effect="plain">{{ $t('orgRegistration.auditResultOptions.reject') }}</el-tag>
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('orgRegistration.form.auditComment')" prop="auditComment">
              <el-input v-model="auditForm.auditComment" type="textarea" :rows="4"
                :placeholder="$t('orgRegistration.placeholder.auditComment')" />
            </el-form-item>
          </el-form>
        </InfoCard>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitting">
            {{ $t('common.submit') }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getRegistrationDetail, auditRegistration } from '@/api/breedingOrgRegistration'
import { useDict } from '@/hooks/useDict'
import { getFilePreviewUrl } from '@/api/file'
import { PageHeader, InfoCard } from '@/components/common'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const submitting = ref(false)
const registrationData = ref({})

// 证照预览
const businessLicensePreviewUrl = ref('')
const taxCertPreviewUrl = ref('')

// 字典逻辑
const { getLabelByValue } = useDict(['crop_type'], {
  immediate: true,
  cache: true
})

const getCropTypesLabel = (cropTypes) => {
  if (!cropTypes) return '-'
  return cropTypes.split(',')
    .filter(Boolean)
    .map(type => getLabelByValue('crop_type', type) || type)
    .join(', ')
}

const formatRegionName = (regionName) => {
  if (!regionName) return '-'
  return regionName.split('#').join(' > ')
}

// 审核表单
const auditForm = reactive({
  registrationId: null,
  auditResult: null,
  auditComment: ''
})

const rules = reactive({
  auditResult: [{ required: true, message: t('orgRegistration.rules.auditResultRequired'), trigger: 'change' }]
})

const loadData = async () => {
  const id = route.params.id
  if (!id) return

  loading.value = true
  try {
    const res = await getRegistrationDetail(id)
    if (res.code === 200 && res.data) {
      registrationData.value = res.data.baseInfo || {}
      auditForm.registrationId = registrationData.value.id

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
    console.error('Load detail failed:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()

    await ElMessageBox.confirm(
      auditForm.auditResult === 1 ? t('orgRegistration.messages.confirmApprove') : t('orgRegistration.messages.confirmReject'),
      t('common.tip'),
      { type: 'warning' }
    )

    submitting.value = true
    const res = await auditRegistration(auditForm)
    if (res.code === 200) {
      ElMessage.success(t('orgRegistration.messages.auditSuccess'))
      router.back()
    } else {
      ElMessage.error(res.msg || t('orgRegistration.messages.auditFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Audit failed:', error)
    }
  } finally {
    submitting.value = false
  }
}

const handleCancel = () => {
  router.back()
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
  gap: 32px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 16px 0;
}

.cert-item {
  text-align: center;

  .cert-label {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
  }

  .cert-image {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    border: 1px solid #ebeef5;
  }

  .no-cert {
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
    border: 1px dashed #dcdfe6;
    border-radius: 8px;
    color: #909399;
  }
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 24px 0;
}
</style>
