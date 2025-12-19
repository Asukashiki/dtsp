<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-checkbox-circle-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('orgRegistration.form.title.audit') }}</h1>
            <p class="page-subtitle">{{ $t('orgRegistration.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 基本信息（只读显示） -->
        <div class="form-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('orgRegistration.form.basicInfo') }}
          </div>
          
          <!-- PC 端 -->
          <div class="info-grid pc-only">
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
              <span class="label">{{ $t('research.variety.cropType') }}</span>
              <span class="value">{{ getCropTypesLabel(registrationData.cropTypes) }}</span>
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
          <div class="info-list mobile-only">
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
              <span class="label">{{ $t('research.variety.cropType') }}:</span>
              <span class="value">{{ getCropTypesLabel(registrationData.cropTypes) }}</span>
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

          <!-- 证照图片区域 -->
          <div class="certificate-section">
            <div class="section-title">
              <i class="ri-image-line"></i>
              {{ $t('orgRegistration.form.certificateInfo') }}
            </div>
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
        <div class="form-section">
          <div class="section-title">
            <i class="ri-checkbox-multiple-line"></i>
            {{ $t('orgRegistration.form.auditInfo') }}
          </div>
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

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const formRef = ref(null)
const submitting = ref(false)
const registrationData = ref({})

// 初始化字典
const { getLabelByValue } = useDict(['crop_type'], {
  immediate: true,
  cache: true
})

// 证照图片预览 URL
const businessLicensePreviewUrl = ref('')
const taxCertPreviewUrl = ref('')

// 获取种子/作物类型标签
const getCropTypesLabel = (cropTypes) => {
  if (!cropTypes) return '-'
  const types = cropTypes.split(',').filter(Boolean)
  return types.map(type => getLabelByValue('crop_type', type) || type).join(', ')
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
      router.push({ name: 'InstitutionRegistration' })
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

<style scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 24px;
}

.page-wrapper {
  margin: 0 auto;
}

.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  flex-shrink: 0;
}

.header-content {
  color: white;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

.content-wrapper {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.form-section {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e8f5e9;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  font-size: 22px;
}

/* PC 端信息网格 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-item {
  display: flex;
  padding: 12px 16px;
  background: #f5f7fa;
  border-radius: 8px;
}

.info-item .label {
  color: #666;
  min-width: 120px;
  flex-shrink: 0;
}

.info-item .value {
  color: #333;
  font-weight: 500;
}

/* 移动端信息列表 */
.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 8px;
}

.info-row .label {
  color: #666;
  min-width: 80px;
  flex-shrink: 0;
  font-size: 14px;
}

.info-row .value {
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e8f5e9;
}

/* 响应式 */
.pc-only {
  display: grid;
}

.mobile-only {
  display: none;
}

/* 证照图片区域 */
.certificate-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e8f5e9;
}

.certificate-grid {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.certificate-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.certificate-label {
  font-size: 14px;
  color: #666;
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
  .page-container {
    padding: 12px;
  }

  .page-header {
    padding: 20px;
    border-radius: 12px;
  }

  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }

  .page-title {
    font-size: 24px;
  }

  .content-wrapper {
    padding: 20px;
    border-radius: 12px;
  }

  .pc-only {
    display: none;
  }

  .mobile-only {
    display: flex;
  }
}
</style>
