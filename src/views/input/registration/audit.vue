<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-checkbox-circle-line"
        :title="$t('orgRegistration.form.title.audit')"
        :subtitle="$t('orgRegistration.subtitle')"
        :show-back="true"
        @back="handleCancel" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 基本信息（只读显示） -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>{{ $t('orgRegistration.form.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <!-- PC 端 -->
            <div class="info-grid pc-only">
              <div class="info-item">
                <span class="label">{{ $t('orgRegistration.columns.auditStatus') }}</span>
                <span class="value">
                  <el-tag :type="getStatusType(registrationData.auditStatus)">
                    {{ getStatusLabel(registrationData.auditStatus) }}
                  </el-tag>
                </span>
              </div>
              <div class="info-item">
                <span class="label">{{ $t('orgRegistration.form.orgType') }}</span>
                <span class="value">
                  <el-tag :type="registrationData.orgType === 'UNION' ? 'primary' : 'success'">
                    {{ $t(`orgRegistration.orgType.${registrationData.orgType}`) }}
                  </el-tag>
                </span>
              </div>
              <div class="info-item">
                <span class="label">{{ $t('orgRegistration.form.orgName') }}</span>
                <span class="value">{{ registrationData.orgName }}</span>
              </div>
              <div class="info-item">
                <span class="label">{{ $t('orgRegistration.form.licenseNumber') }}</span>
                <span class="value">{{ registrationData.licenseNumber }}</span>
              </div>
              <div class="info-item">
                <span class="label">{{ $t('orgRegistration.form.regionCode') }}</span>
                <span class="value">{{ formatRegionName(registrationData.regionName) }}</span>
              </div>
              <div class="info-item">
                <span class="label">{{ $t('orgRegistration.form.fullAddress') }}</span>
                <span class="value">{{ registrationData.fullAddress || '-' }}</span>
              </div>
              <div class="info-item">
                <span class="label">{{ $t('orgRegistration.form.inputTypes') }}</span>
                <span class="value">{{ getInputTypesLabel(registrationData.inputTypes) }}</span>
              </div>
              <div class="info-item">
                <span class="label">{{ $t('orgRegistration.form.applyUsername') }}</span>
                <span class="value">{{ registrationData.applyUsername }}</span>
              </div>
              <div class="info-item">
                <span class="label">{{ $t('orgRegistration.form.contactName') }}</span>
                <span class="value">{{ registrationData.contactName || '-' }}</span>
              </div>
              <div class="info-item">
                <span class="label">{{ $t('orgRegistration.form.contactMobile') }}</span>
                <span class="value">{{ registrationData.contactMobile || '-' }}</span>
              </div>
              <div class="info-item">
                <span class="label">{{ $t('orgRegistration.columns.createTime') }}</span>
                <span class="value">{{ registrationData.createTime }}</span>
              </div>
            </div>

            <!-- 移动端 -->
            <div class="info-list mobile-only mb-4">
              <div class="info-row">
                <span class="label">{{ $t('orgRegistration.columns.auditStatus') }}:</span>
                <span class="value">
                   <el-tag :type="getStatusType(registrationData.auditStatus)" size="small">
                    {{ getStatusLabel(registrationData.auditStatus) }}
                  </el-tag>
                </span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('orgRegistration.form.orgType') }}:</span>
                <span class="value">
                  <el-tag :type="registrationData.orgType === 'UNION' ? 'primary' : 'success'" size="small">
                    {{ $t(`orgRegistration.orgType.${registrationData.orgType}`) }}
                  </el-tag>
                </span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('orgRegistration.form.orgName') }}:</span>
                <span class="value">{{ registrationData.orgName }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('orgRegistration.form.licenseNumber') }}:</span>
                <span class="value">{{ registrationData.licenseNumber }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('orgRegistration.form.regionCode') }}:</span>
                <span class="value">{{ formatRegionName(registrationData.regionName) }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('orgRegistration.form.fullAddress') }}:</span>
                <span class="value">{{ registrationData.fullAddress || '-' }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('orgRegistration.form.inputTypes') }}:</span>
                <span class="value">{{ getInputTypesLabel(registrationData.inputTypes) }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('orgRegistration.form.applyUsername') }}:</span>
                <span class="value">{{ registrationData.applyUsername }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('orgRegistration.form.contactName') }}:</span>
                <span class="value">{{ registrationData.contactName || '-' }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('orgRegistration.form.contactMobile') }}:</span>
                <span class="value">{{ registrationData.contactMobile || '-' }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('orgRegistration.columns.createTime') }}:</span>
                <span class="value">{{ registrationData.createTime }}</span>
              </div>
            </div>

            <!-- 证照图片区域 (Inside the same card or separate? Guide suggests grouping. Let's keep inside basic info card for better grouping or separate. Existing code had separate section. I'll make it separate card for cleaner look) -->
           </div>
        </div>

          <!-- 证照图片区域 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-image-line"></i>
              <span>{{ $t('orgRegistration.form.certificateInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <div class="certificate-grid">
              <div class="certificate-item">
                <div class="certificate-label">{{ $t('orgRegistration.form.businessLicenseUrl') }}</div>
                <el-image
                  v-if="businessLicensePreviewUrl"
                  :src="businessLicensePreviewUrl"
                  :preview-src-list="[businessLicensePreviewUrl]"
                  fit="contain"
                  style="width: 150px; height: 150px; border-radius: 8px; border: 1px solid #e8f5e9"
                />
                <span v-else class="no-image">{{ $t('common.noImage') }}</span>
              </div>
              <div class="certificate-item">
                <div class="certificate-label">{{ $t('orgRegistration.form.taxCertUrl') }}</div>
                <el-image
                  v-if="taxCertPreviewUrl"
                  :src="taxCertPreviewUrl"
                  :preview-src-list="[taxCertPreviewUrl]"
                  fit="contain"
                  style="width: 150px; height: 150px; border-radius: 8px; border: 1px solid #e8f5e9"
                />
                <span v-else class="no-image">{{ $t('common.noImage') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 审核操作 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-checkbox-multiple-line"></i>
              <span>{{ $t('orgRegistration.form.auditInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-form ref="formRef" :model="auditForm" :rules="rules" label-width="120px">
              <el-form-item :label="$t('orgRegistration.form.auditResult')" prop="auditResult">
                <el-radio-group v-model="auditForm.auditResult">
                  <el-radio :value="1">
                    <el-tag type="success">{{ $t('orgRegistration.auditResultOptions.approve') }}</el-tag>
                  </el-radio>
                  <el-radio :value="2">
                    <el-tag type="danger">{{ $t('orgRegistration.auditResultOptions.reject') }}</el-tag>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item :label="$t('orgRegistration.form.auditComment')" prop="auditComment">
                <el-input
                  v-model="auditForm.auditComment"
                  type="textarea"
                  :rows="4"
                  :placeholder="$t('orgRegistration.placeholder.auditComment')"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>

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
import { getRegistrationDetail, auditRegistration } from '@/api/orgRegistration'
import { useDict } from '@/hooks/useDict'
import { getFilePreviewUrl } from '@/api/file'
import { PageHeader } from '@/components/common'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const submitting = ref(false)
const registrationData = ref({})

// 初始化字典
const { getLabelByValue } = useDict(['input_type'], {
  immediate: true,
  cache: true
})

// 证照图片预览 URL
const businessLicensePreviewUrl = ref('')
const taxCertPreviewUrl = ref('')

// 获取状态标签
const getStatusLabel = (status) => {
  const statusMap = {
    0: t('orgRegistration.status.pending'),
    1: t('orgRegistration.status.approved'),
    2: t('orgRegistration.status.rejected')
  }
  return statusMap[status] || status
}

// 获取状态类型
const getStatusType = (status) => {
  const typeMap = {
    0: 'warning',
    1: 'success',
    2: 'danger'
  }
  return typeMap[status] || 'info'
}

// 获取投入品类型标签
const getInputTypesLabel = (inputTypes) => {
  if (!inputTypes) return '-'
  const types = inputTypes.split(',').filter(Boolean)
  return types.map(type => getLabelByValue('input_type', type) || type).join(', ')
}

// 格式化区域名称（将 # 分隔转为 > 分隔）
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

// 验证规则
const rules = reactive({
  auditResult: [{ required: true, message: t('orgRegistration.rules.auditResultRequired'), trigger: 'change' }]
})

// 加载申请详情
const loadData = async () => {
  const id = route.params.id
  if (!id) return
  
  try {
    const res = await getRegistrationDetail(id)
    if (res.code === 200 && res.data) {
      registrationData.value = res.data.baseInfo || {}
      auditForm.registrationId = res.data.baseInfo?.id
      
      // 加载营业执照预览
      if (res.data.baseInfo?.businessLicenseUrl) {
        try {
          const previewRes = await getFilePreviewUrl(res.data.baseInfo.businessLicenseUrl)
          businessLicensePreviewUrl.value = previewRes.code === 200 ? previewRes.msg : ''
        } catch (error) {
          console.error('Failed to load business license preview:', error)
        }
      }
      
      // 加载税务证预览
      if (res.data.baseInfo?.taxCertUrl) {
        try {
          const previewRes = await getFilePreviewUrl(res.data.baseInfo.taxCertUrl)
          taxCertPreviewUrl.value = previewRes.code === 200 ? previewRes.msg : ''
        } catch (error) {
          console.error('Failed to load tax cert preview:', error)
        }
      }
    }
  } catch (error) {
    console.error('Load data failed:', error)
    ElMessage.error(t('orgRegistration.messages.loadFailed'))
  }
}

// 提交审核
const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    
    const confirmMsg = auditForm.auditResult === 1
      ? t('orgRegistration.messages.confirmApprove')
      : t('orgRegistration.messages.confirmReject')
    
    await ElMessageBox.confirm(confirmMsg, t('common.tip'), {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    })
    
    submitting.value = true
    const res = await auditRegistration(auditForm)
    
    if (res.code === 200) {
      ElMessage.success(t('orgRegistration.messages.auditSuccess'))
      router.push({ name: 'OrgRegistration' })
    } else {
      ElMessage.error(res.msg || t('orgRegistration.messages.auditFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Audit failed:', error)
      ElMessage.error(t('orgRegistration.messages.auditFailed'))
    }
  } finally {
    submitting.value = false
  }
}

// 取消
const handleCancel = () => {
  router.back()
}

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

/* Info Grid Styles */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-item {
  display: flex;
  padding: 12px 16px;
  background: var(--bg-secondary, #f8fafb);
  border-radius: 8px;
  align-items: flex-start;
}

.info-item .label {
  color: var(--text-secondary, #909399);
  min-width: 120px;
  flex-shrink: 0;
}

.info-item .value {
  color: var(--text-primary, #303133);
  font-weight: 500;
  word-break: break-word;
}

/* Info List Mobile */
.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  padding: 12px;
  background: var(--bg-secondary, #f8fafb);
  border-radius: 8px;
}

.info-row .label {
  color: var(--text-secondary, #909399);
  min-width: 90px;
  flex-shrink: 0;
  font-size: 14px;
}

.info-row .value {
  color: var(--text-primary, #303133);
  font-weight: 500;
  font-size: 14px;
  word-break: break-word;
}

/* Certificate Styles */
.certificate-grid {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.certificate-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.certificate-label {
  font-size: 14px;
  color: var(--text-secondary, #909399);
  font-weight: 500;
}

.no-image {
  width: 150px;
  height: 150px;
  border: 1px dashed #dcdfe6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
  font-size: 14px;
  background: #f5f7fa;
}

@media screen and (max-width: 768px) {
  .pc-only {
    display: none;
  }
  .mobile-only {
    display: flex;
  }
}
</style>
