<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-building-4-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('union.title') }}</h1>
            <p class="page-subtitle">{{ $t('union.subtitle') }}</p>
          </div>
        </div>
        <div class="header-right">
          <el-tag
            :type="getStatusTag(unionData.certificationStatus)"
            size="large"
            class="status-tag"
          >
            {{ getStatusLabel(unionData.certificationStatus) }}
          </el-tag>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-body">
            <!-- 驳回原因提示 -->
            <el-alert
              v-if="unionData.certificationStatus === 2 && unionData.rejectReason"
              type="error"
              :closable="false"
              class="reject-alert"
            >
              <template #title>
                <div class="alert-title">
                  <i class="ri-error-warning-line"></i>
                  <span>{{ $t('union.messages.rejectedTitle') }}</span>
                </div>
              </template>
              <div class="alert-content">
                <p><strong>{{ $t('union.messages.rejectReason') }}：</strong></p>
                <p>{{ unionData.rejectReason }}</p>
              </div>
            </el-alert>

            <el-form
              ref="formRef"
              :model="formData"
              :rules="rules"
              :disabled="isFormDisabled"
              label-position="top"
              class="union-form"
            >
              <!-- 1. 企业身份信息 -->
              <div class="form-section">
                <div class="section-header">
                  <i class="ri-building-2-line"></i>
                  <h3>{{ $t('union.form.identityInfo') }}</h3>
                </div>
                <el-row :gutter="24">
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.enterpriseName')" 
                      prop="unionInfo.enterpriseName"
                    >
                      <el-input
                        v-model="formData.unionInfo.enterpriseName"
                        :placeholder="$t('union.placeholder.enterpriseName')"
                        size="large"
                      >
                        <template #prefix>
                          <i class="ri-building-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.seedEnterpriseLicenseNumber')" 
                      prop="unionInfo.seedEnterpriseLicenseNumber"
                    >
                      <el-input
                        v-model="formData.unionInfo.seedEnterpriseLicenseNumber"
                        :placeholder="$t('union.placeholder.seedEnterpriseLicenseNumber')"
                        size="large"
                      >
                        <template #prefix>
                          <i class="ri-file-shield-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.enterpriseType')" 
                      prop="unionInfo.enterpriseType"
                    >
                      <el-select
                        v-model="formData.unionInfo.enterpriseType"
                        :placeholder="$t('union.placeholder.enterpriseType')"
                        size="large"
                        class="full-width"
                      >
                        <el-option 
                          :label="$t('union.type.production')" 
                          value="production" 
                        />
                        <el-option 
                          :label="$t('union.type.trade')" 
                          value="trade" 
                        />
                        <el-option 
                          :label="$t('union.type.integrated')" 
                          value="integrated" 
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.enterpriseRegistrationId')" 
                      prop="unionInfo.enterpriseRegistrationId"
                    >
                      <el-input
                        v-model="formData.unionInfo.enterpriseRegistrationId"
                        :placeholder="$t('union.placeholder.enterpriseRegistrationId')"
                        size="large"
                      >
                        <template #prefix>
                          <i class="ri-file-list-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.unifiedSocialCreditCode')" 
                      prop="unionInfo.unifiedSocialCreditCode"
                    >
                      <el-input
                        v-model="formData.unionInfo.unifiedSocialCreditCode"
                        :placeholder="$t('union.placeholder.unifiedSocialCreditCode')"
                        size="large"
                      >
                        <template #prefix>
                          <i class="ri-barcode-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.licenseValidityStart')" 
                      prop="unionInfo.licenseValidityStart"
                    >
                      <el-date-picker
                        v-model="formData.unionInfo.licenseValidityStart"
                        type="date"
                        :placeholder="$t('union.placeholder.licenseValidityStart')"
                        size="large"
                        class="full-width"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.licenseValidityEnd')" 
                      prop="unionInfo.licenseValidityEnd"
                    >
                      <el-date-picker
                        v-model="formData.unionInfo.licenseValidityEnd"
                        type="date"
                        :placeholder="$t('union.placeholder.licenseValidityEnd')"
                        size="large"
                        class="full-width"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <!-- 2. 位置与运营信息 -->
              <div class="form-section">
                <div class="section-header">
                  <i class="ri-map-pin-line"></i>
                  <h3>{{ $t('union.form.operationInfo') }}</h3>
                </div>
                <el-row :gutter="24">
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.region')" 
                      prop="unionInfo.region"
                    >
                      <el-input
                        v-model="formData.unionInfo.region"
                        :placeholder="$t('union.placeholder.region')"
                        size="large"
                      >
                        <template #prefix>
                          <i class="ri-map-2-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.zone')" 
                      prop="unionInfo.zone"
                    >
                      <el-input
                        v-model="formData.unionInfo.zone"
                        :placeholder="$t('union.placeholder.zone')"
                        size="large"
                      >
                        <template #prefix>
                          <i class="ri-road-map-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.woreda')" 
                      prop="unionInfo.woreda"
                    >
                      <el-input
                        v-model="formData.unionInfo.woreda"
                        :placeholder="$t('union.placeholder.woreda')"
                        size="large"
                      >
                        <template #prefix>
                          <i class="ri-building-3-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.kebele')" 
                      prop="unionInfo.kebele"
                    >
                      <el-input
                        v-model="formData.unionInfo.kebele"
                        :placeholder="$t('union.placeholder.kebele')"
                        size="large"
                      >
                        <template #prefix>
                          <i class="ri-home-4-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24">
                    <el-form-item 
                      :label="$t('union.form.fullAddress')" 
                      prop="unionInfo.fullAddress"
                    >
                      <el-input
                        v-model="formData.unionInfo.fullAddress"
                        :placeholder="$t('union.placeholder.fullAddress')"
                        type="textarea"
                        :rows="2"
                        size="large"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.gpsLatitude')" 
                      prop="unionInfo.gpsLatitude"
                    >
                      <el-input
                        v-model="formData.unionInfo.gpsLatitude"
                        :placeholder="$t('union.placeholder.gpsLatitude')"
                        size="large"
                        type="number"
                        step="0.000001"
                      >
                        <template #prefix>
                          <i class="ri-map-pin-2-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.gpsLongitude')" 
                      prop="unionInfo.gpsLongitude"
                    >
                      <el-input
                        v-model="formData.unionInfo.gpsLongitude"
                        :placeholder="$t('union.placeholder.gpsLongitude')"
                        size="large"
                        type="number"
                        step="0.000001"
                      >
                        <template #prefix>
                          <i class="ri-map-pin-3-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.businessScope')" 
                      prop="unionInfo.businessScope"
                    >
                      <el-input
                        v-model="formData.unionInfo.businessScope"
                        :placeholder="$t('union.placeholder.businessScope')"
                        size="large"
                      >
                        <template #prefix>
                          <i class="ri-briefcase-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.annualProductionCapacity')" 
                      prop="unionInfo.annualProductionCapacity"
                    >
                      <el-input
                        v-model="formData.unionInfo.annualProductionCapacity"
                        :placeholder="$t('union.placeholder.annualProductionCapacity')"
                        size="large"
                        type="number"
                      >
                        <template #prefix>
                          <i class="ri-scales-line"></i>
                        </template>
                        <template #suffix>
                          <span class="input-unit">吨/年</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <!-- 3. 许可信息 -->
              <div class="form-section">
                <div class="section-header">
                  <i class="ri-file-shield-2-line"></i>
                  <h3>{{ $t('union.form.licenseInfo') }}</h3>
                </div>
                <el-row :gutter="24">
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.businessLicense')" 
                      prop="unionLicenseInfo.businessLicense"
                    >
                      <el-input
                        v-model="formData.unionLicenseInfo.businessLicense"
                        :placeholder="$t('union.placeholder.businessLicense')"
                        size="large"
                        readonly
                      >
                        <template #prefix>
                          <i class="ri-file-text-line"></i>
                        </template>
                        <template #append>
                          <el-button 
                            @click="handleUpload('businessLicense')"
                            :loading="uploadingFields.businessLicense"
                          >
                            <i class="ri-upload-2-line"></i>
                            {{ $t('union.actions.uploadFile') }}
                          </el-button>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.seedLicense')" 
                      prop="unionLicenseInfo.seedLicense"
                    >
                      <el-input
                        v-model="formData.unionLicenseInfo.seedLicense"
                        :placeholder="$t('union.placeholder.seedLicense')"
                        size="large"
                        readonly
                      >
                        <template #prefix>
                          <i class="ri-file-text-line"></i>
                        </template>
                        <template #append>
                          <el-button 
                            @click="handleUpload('seedLicense')"
                            :loading="uploadingFields.seedLicense"
                          >
                            <i class="ri-upload-2-line"></i>
                            {{ $t('union.actions.uploadFile') }}
                          </el-button>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.taxCertificate')" 
                      prop="unionLicenseInfo.taxCertificate"
                    >
                      <el-input
                        v-model="formData.unionLicenseInfo.taxCertificate"
                        :placeholder="$t('union.placeholder.taxCertificate')"
                        size="large"
                        readonly
                      >
                        <template #prefix>
                          <i class="ri-file-text-line"></i>
                        </template>
                        <template #append>
                          <el-button 
                            @click="handleUpload('taxCertificate')"
                            :loading="uploadingFields.taxCertificate"
                          >
                            <i class="ri-upload-2-line"></i>
                            {{ $t('union.actions.uploadFile') }}
                          </el-button>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.factoryPermit')" 
                      prop="unionLicenseInfo.factoryPermit"
                    >
                      <el-input
                        v-model="formData.unionLicenseInfo.factoryPermit"
                        :placeholder="$t('union.placeholder.factoryPermit')"
                        size="large"
                        readonly
                      >
                        <template #prefix>
                          <i class="ri-file-text-line"></i>
                        </template>
                        <template #append>
                          <el-button 
                            @click="handleUpload('factoryPermit')"
                            :loading="uploadingFields.factoryPermit"
                          >
                            <i class="ri-upload-2-line"></i>
                            {{ $t('union.actions.uploadFile') }}
                          </el-button>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <!-- 4. 操作人信息 -->
              <div class="form-section">
                <div class="section-header">
                  <i class="ri-user-settings-line"></i>
                  <h3>{{ $t('union.form.operatorInfo') }}</h3>
                </div>
                <el-row :gutter="24">
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.operator')" 
                      prop="unionInfo.operator"
                    >
                      <el-input
                        v-model="formData.unionInfo.operator"
                        :placeholder="$t('union.placeholder.operator')"
                        size="large"
                      >
                        <template #prefix>
                          <i class="ri-user-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item 
                      :label="$t('union.form.operationOrg')" 
                      prop="unionInfo.operationOrg"
                    >
                      <el-input
                        v-model="formData.unionInfo.operationOrg"
                        :placeholder="$t('union.placeholder.operationOrg')"
                        size="large"
                        disabled
                      >
                        <template #prefix>
                          <i class="ri-building-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <!-- 表单操作按钮 -->
              <div class="form-actions">
                <el-button 
                  size="large" 
                  @click="handleSaveDraft"
                  :disabled="isFormDisabled"
                  :loading="loading"
                >
                  <i class="ri-save-line"></i>
                  {{ $t('union.actions.saveDraft') }}
                </el-button>
                <el-button 
                  size="large" 
                  type="primary"
                  @click="handleSubmit"
                  :loading="loading"
                >
                  <i class="ri-send-plane-line"></i>
                  {{ $t('union.actions.submit') }}
                </el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import {
  submitUnionRegistration,
  saveUnionRegistrationDraft,
  getUnionRegistrationByUser,
  uploadFile
} from '@/api/union'

const router = useRouter()
const { t } = useI18n()

const formRef = ref(null)
const loading = ref(false)
const uploadingFields = reactive({
  businessLicense: false,
  seedLicense: false,
  taxCertificate: false,
  factoryPermit: false
})

const unionData = reactive({
  certificationStatus: null,
  rejectReason: ''
})

const formData = reactive({
  unionInfo: {
    enterpriseId: null,
    dataId: null,
    enterpriseName: '',
    enterpriseRegistrationId: '',
    unifiedSocialCreditCode: '',
    seedEnterpriseLicenseNumber: '',
    enterpriseType: '',
    licenseValidityStart: '',
    licenseValidityEnd: '',
    region: '',
    zone: '',
    woreda: '',
    kebele: '',
    fullAddress: '',
    gpsLatitude: '',
    gpsLongitude: '',
    businessScope: '',
    annualProductionCapacity: '',
    operator: '',
    operationOrg: '',
    certificationStatus: -1
  },
  unionLicenseInfo: {
    businessLicense: '',
    seedLicense: '',
    taxCertificate: '',
    factoryPermit: ''
  }
})

const rules = computed(() => ({
  'unionInfo.enterpriseName': [
    { required: true, message: t('union.rules.enterpriseNameRequired'), trigger: 'blur' }
  ],
  'unionInfo.seedEnterpriseLicenseNumber': [
    { required: true, message: t('union.rules.seedEnterpriseLicenseNumberRequired'), trigger: 'blur' }
  ],
  'unionInfo.enterpriseType': [
    { required: true, message: t('union.rules.enterpriseTypeRequired'), trigger: 'change' }
  ],
  'unionInfo.licenseValidityStart': [
    { required: true, message: t('union.rules.licenseValidityStartRequired'), trigger: 'change' }
  ],
  'unionInfo.licenseValidityEnd': [
    { required: true, message: t('union.rules.licenseValidityEndRequired'), trigger: 'change' }
  ],
  'unionInfo.woreda': [
    { required: true, message: t('union.rules.woredaRequired'), trigger: 'blur' }
  ],
  'unionInfo.kebele': [
    { required: true, message: t('union.rules.kebeleRequired'), trigger: 'blur' }
  ],
  'unionInfo.fullAddress': [
    { required: true, message: t('union.rules.fullAddressRequired'), trigger: 'blur' }
  ],
  'unionInfo.gpsLatitude': [
    { required: true, message: t('union.rules.gpsLatitudeRequired'), trigger: 'blur' }
  ],
  'unionInfo.operator': [
    { required: true, message: t('union.rules.operatorRequired'), trigger: 'blur' }
  ],
  'unionLicenseInfo.businessLicense': [
    { required: true, message: t('union.rules.businessLicenseRequired'), trigger: 'change' }
  ],
  'unionLicenseInfo.factoryPermit': [
    { required: true, message: t('union.rules.factoryPermitRequired'), trigger: 'change' }
  ]
}))

const isFormDisabled = computed(() => {
  return unionData.certificationStatus === 0 || unionData.certificationStatus === 1
})

// 获取状态标签样式 (-1=草稿, 0=待审核, 1=审核通过, 2=审核驳回)
const getStatusTag = (status) => {
  const tagMap = { '-1': 'info', 0: 'warning', 1: 'success', 2: 'danger' }
  return tagMap[status] || 'info'
}

// 获取状态标签文本
const getStatusLabel = (status) => {
  const labelMap = {
    '-1': t('union.status.draft'),
    0: t('union.status.pending'),
    1: t('union.status.approved'),
    2: t('union.status.rejected')
  }
  return labelMap[status] || t('union.status.notApplied')
}

// 准备提交数据 - 清理空字段
const prepareSubmitData = (status) => {
  const submitData = {
    unionInfo: {
      ...formData.unionInfo,
      certificationStatus: status
    },
    unionLicenseInfo: { ...formData.unionLicenseInfo }
  }
  
  // 如果enterpriseId为空、null或空字符串，删除该字段让后端自动生成
  if (!submitData.unionInfo.enterpriseId || 
      (typeof submitData.unionInfo.enterpriseId === 'string' && submitData.unionInfo.enterpriseId.trim() === '')) {
    delete submitData.unionInfo.enterpriseId
  }
  
  // 如果dataId为空、null或空字符串，也删除
  if (!submitData.unionInfo.dataId || 
      (typeof submitData.unionInfo.dataId === 'string' && submitData.unionInfo.dataId.trim() === '')) {
    delete submitData.unionInfo.dataId
  }
  
  return submitData
}

const handleSaveDraft = async () => {
  loading.value = true
  try {
    const submitData = prepareSubmitData(-1)
    const response = await saveUnionRegistrationDraft(submitData)
    if (response.code === 200) {
      ElMessage.success(t('union.messages.saveDraftSuccess'))
      // 保存返回的enterpriseId
      if (response.data && response.data.enterpriseId) {
        formData.unionInfo.enterpriseId = response.data.enterpriseId
      }
      await loadUnionData()
    } else {
      ElMessage.error(response.msg || t('common.operationFailed'))
    }
  } catch (error) {
    ElMessage.error(t('common.operationFailed'))
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const submitData = prepareSubmitData(1) // 1=已注册（直接通过）
        const response = await submitUnionRegistration(submitData)
        if (response.code === 200) {
          ElMessage.success(t('union.messages.submitSuccess'))
          // 保存返回的enterpriseId和状态
          if (response.data && response.data.enterpriseId) {
            formData.unionInfo.enterpriseId = response.data.enterpriseId
          }
          if (response.data && response.data.certificationStatus !== undefined) {
            unionData.certificationStatus = response.data.certificationStatus
          }
          await loadUnionData()
        } else {
          ElMessage.error(response.msg || t('common.operationFailed'))
        }
      } catch (error) {
        ElMessage.error(t('common.operationFailed'))
      } finally {
        loading.value = false
      }
    }
  })
}

const handleCancel = () => {
  router.back()
}

const handleUpload = (fieldName) => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.pdf,.jpg,.jpeg,.png'
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    // 文件大小验证（10MB）
    if (file.size > 10 * 1024 * 1024) {
      ElMessage.error(t('union.messages.fileSizeLimit'))
      return
    }
    
    // 设置当前字段的loading状态
    uploadingFields[fieldName] = true
    
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      
      const response = await uploadFile(uploadFormData)
      
      if (response.code === 200) {
        // 保存文件路径到表单数据
        formData.unionLicenseInfo[fieldName] = response.data.filePath || response.data.url || file.name
        ElMessage.success(t('union.messages.uploadSuccess'))
      } else {
        ElMessage.error(response.msg || t('union.messages.uploadFailed'))
      }
    } catch (error) {
      console.error('Upload error:', error)
      ElMessage.error(t('union.messages.uploadFailed'))
    } finally {
      // 重置当前字段的loading状态
      uploadingFields[fieldName] = false
    }
  }
  input.click()
}

const loadUnionData = async () => {
  try {
    // const response = await getUnionRegistrationByUser()
    // if (response.code === 200 && response.data) {
    //   const { unionInfo, unionLicenseInfo } = response.data
    //   if (unionInfo) {
    //     Object.assign(formData.unionInfo, unionInfo)
    //     unionData.certificationStatus = unionInfo.certificationStatus
    //     unionData.rejectReason = unionInfo.rejectReason || ''
    //   }
    //   if (unionLicenseInfo) {
    //     Object.assign(formData.unionLicenseInfo, unionLicenseInfo)
    //   }
    // }
  } catch (error) {
    console.error('Load error:', error)
  }
}

onMounted(() => {
  loadUnionData()
})
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  padding: 24px;
}

.page-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  box-shadow: 0 8px 16px rgba(0, 154, 68, 0.3);
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #303133;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  color: #606266;
  margin: 0;
}

.status-tag {
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
}

.content-wrapper {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.info-card {
  padding: 32px;
}

.reject-alert {
  margin-bottom: 24px;
  border-radius: 12px;
}

.alert-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
}

.form-section {
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #009A44;
}

.section-header i {
  font-size: 24px;
  color: #009A44;
}

.section-header h3 {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.full-width {
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-top: 32px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.form-actions .el-button {
  min-width: 140px;
}
</style>
