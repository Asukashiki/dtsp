<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 - 固定 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-shield-check-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.enterprise.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.enterprise.subtitle') }}</p>
          </div>
        </div>
        <!-- 右侧状态显示 -->
        <div class="header-right">
          <el-tag
            :type="getStatusTag(enterpriseData.certificationStatus)"
            size="large"
            class="status-tag"
          >
            {{ getStatusLabel(enterpriseData.certificationStatus) }}
          </el-tag>
        </div>
      </div>

      <!-- 内容区域 - 可滚动 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-body">
            <!-- 驳回原因提示 -->
            <el-alert
              v-if="enterpriseData.certificationStatus === 2 && enterpriseData.rejectReason"
              type="error"
              :closable="false"
              class="reject-alert"
            >
              <template #title>
                <div class="alert-title">
                  <i class="ri-error-warning-line"></i>
                  <span>{{ $t('research.enterprise.messages.rejectedTitle') || '审核未通过' }}</span>
                </div>
              </template>
              <div class="alert-content">
                <p><strong>{{ $t('research.audit.form.rejectReason') }}：</strong></p>
                <p>{{ enterpriseData.rejectReason }}</p>
              </div>
            </el-alert>

            <el-form
              ref="formRef"
              :model="formData"
              :rules="rules"
              :disabled="isFormDisabled"
              label-position="top"
              class="enterprise-form"
            >
              <!-- 1. 企业身份信息 -->
              <div class="form-section">
                <div class="section-header">
                  <i class="ri-building-2-line"></i>
                  <h3>{{ $t('research.enterprise.form.identityInfo') }}</h3>
                </div>
                <el-row :gutter="24">
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.enterpriseName')" prop="enterpriseName">
                      <el-input
                        v-model="formData.enterpriseName"
                        :placeholder="$t('research.enterprise.placeholder.enterpriseName')"
                        size="large"
                      >
                        <template #prefix>
                          <i class="ri-building-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.unifiedSocialCreditCode')" prop="unifiedSocialCreditCode">
                      <el-input
                        v-model="formData.unifiedSocialCreditCode"
                        :placeholder="$t('research.enterprise.placeholder.unifiedSocialCreditCode')"
                        maxlength="18"
                        size="large"
                      >
                        <template #prefix>
                          <i class="ri-bank-card-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.enterpriseType')" prop="enterpriseType">
                      <el-select
                        v-model="formData.enterpriseType"
                        :placeholder="$t('research.enterprise.placeholder.enterpriseType')"
                        size="large"
                        class="full-width"
                      >
                        <el-option :label="$t('research.enterprise.type.production')" value="production" />
                        <el-option :label="$t('research.enterprise.type.trade')" value="trade" />
                        <el-option :label="$t('research.enterprise.type.integrated')" value="integrated" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.seedLicenseNo')" prop="seedLicenseNo">
                      <el-input
                        v-model="formData.seedLicenseNo"
                        :placeholder="$t('research.enterprise.placeholder.seedLicenseNo')"
                        size="large"
                      >
                        <template #prefix>
                          <i class="ri-file-shield-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.licenseStartDate')" prop="licenseStartDate">
                      <el-date-picker
                        v-model="formData.licenseStartDate"
                        type="date"
                        :placeholder="$t('research.enterprise.placeholder.licenseStartDate')"
                        size="large"
                        class="full-width"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.licenseEndDate')" prop="licenseEndDate">
                      <el-date-picker
                        v-model="formData.licenseEndDate"
                        type="date"
                        :placeholder="$t('research.enterprise.placeholder.licenseEndDate')"
                        size="large"
                        class="full-width"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <!-- 2. 位置与运营信息 -->
              <div class="form-section">
                <div class="section-header">
                  <i class="ri-map-pin-line"></i>
                  <h3>{{ $t('research.enterprise.form.locationInfo') }}</h3>
                </div>
                <el-row :gutter="24">
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.region')" prop="region">
                      <el-select
                        v-model="formData.region"
                        :placeholder="$t('research.enterprise.placeholder.region')"
                        size="large"
                        class="full-width"
                      >
                        <el-option label="Oromia" value="Oromia" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.zone')" prop="zone">
                      <el-select
                        v-model="formData.zone"
                        :placeholder="$t('research.enterprise.placeholder.zone')"
                        size="large"
                        class="full-width"
                      >
                        <el-option label="Zone 1" value="zone1" />
                        <el-option label="Zone 2" value="zone2" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.county')" prop="county">
                      <el-select
                        v-model="formData.county"
                        :placeholder="$t('research.enterprise.placeholder.county')"
                        size="large"
                        class="full-width"
                      >
                        <el-option label="County 1" value="county1" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.township')" prop="township">
                      <el-select
                        v-model="formData.township"
                        :placeholder="$t('research.enterprise.placeholder.township')"
                        size="large"
                        class="full-width"
                      >
                        <el-option label="Township 1" value="township1" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item :label="$t('research.enterprise.form.detailedAddress')" prop="detailedAddress">
                      <el-input
                        v-model="formData.detailedAddress"
                        :placeholder="$t('research.enterprise.placeholder.detailedAddress')"
                        type="textarea"
                        :rows="3"
                        size="large"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item :label="$t('research.enterprise.form.businessScope')" prop="businessScope">
                      <el-input
                        v-model="formData.businessScope"
                        :placeholder="$t('research.enterprise.placeholder.businessScope')"
                        type="textarea"
                        :rows="2"
                        size="large"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.annualProductionCapacity')" prop="annualProductionCapacity">
                      <el-input
                        v-model.number="formData.annualProductionCapacity"
                        :placeholder="$t('research.enterprise.placeholder.annualProductionCapacity')"
                        type="number"
                        size="large"
                      >
                        <template #append>{{ $t('research.enterprise.form.annualProductionCapacity').includes('吨') ? '吨/年' : 'tons/year' }}</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <!-- 3. 企业额外信息 -->
              <div class="form-section">
                <div class="section-header">
                  <i class="ri-information-line"></i>
                  <h3>{{ $t('research.enterprise.form.extraInfo') }}</h3>
                </div>
                <el-row :gutter="24">
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.establishmentDate')" prop="establishmentDate">
                      <el-date-picker
                        v-model="formData.establishmentDate"
                        type="date"
                        :placeholder="$t('research.enterprise.placeholder.establishmentDate')"
                        size="large"
                        class="full-width"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.legalPersonName')" prop="legalPersonName">
                      <el-input
                        v-model="formData.legalPersonName"
                        :placeholder="$t('research.enterprise.placeholder.legalPersonName')"
                        size="large"
                      >
                        <template #prefix>
                          <i class="ri-user-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.legalPersonId')" prop="legalPersonId">
                      <el-input
                        v-model="formData.legalPersonId"
                        :placeholder="$t('research.enterprise.placeholder.legalPersonId')"
                        size="large"
                      >
                        <template #prefix>
                          <i class="ri-id-card-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.contactPerson')" prop="contactPerson">
                      <el-input
                        v-model="formData.contactPerson"
                        :placeholder="$t('research.enterprise.placeholder.contactPerson')"
                        size="large"
                      >
                        <template #prefix>
                          <i class="ri-contacts-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.contactPhone')" prop="contactPhone">
                      <el-input
                        v-model="formData.contactPhone"
                        :placeholder="$t('research.enterprise.placeholder.contactPhone')"
                        size="large"
                      >
                        <template #prefix>
                          <i class="ri-phone-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.contactEmail')" prop="contactEmail">
                      <el-input
                        v-model="formData.contactEmail"
                        :placeholder="$t('research.enterprise.placeholder.contactEmail')"
                        size="large"
                      >
                        <template #prefix>
                          <i class="ri-mail-line"></i>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <!-- 4. 所需文件 -->
              <div class="form-section">
                <div class="section-header">
                  <i class="ri-file-text-line"></i>
                  <h3>{{ $t('research.enterprise.form.documentsInfo') }}</h3>
                </div>
                <div v-if="!isFormDisabled" class="upload-tip">
                  <i class="ri-information-line"></i>
                  <span>{{ $t('research.enterprise.messages.uploadTip') }}</span>
                </div>
                <el-row :gutter="24">
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.businessLicense')" prop="businessLicense">
                      <el-upload
                        v-if="!isFormDisabled"
                        class="doc-upload"
                        :http-request="(options) => handleUploadFile(options, 'businessLicense')"
                        :file-list="formData.businessLicense"
                        :on-remove="() => handleRemove('businessLicense')"
                        :limit="1"
                        accept=".pdf,.jpg,.jpeg,.png"
                      >
                        <el-button type="primary" plain size="large">
                          <i class="ri-upload-2-line"></i>
                          {{ $t('common.upload') }}
                        </el-button>
                      </el-upload>
                      <div v-else class="file-display">
                        <div class="file-info">
                          <i class="ri-file-text-line"></i>
                          <span>{{ formData.businessLicense[0]?.name || '-' }}</span>
                        </div>
                        <div v-if="formData.businessLicense[0]?.fileId" class="file-actions">
                          <el-button link type="primary" size="small" @click="handlePreview(formData.businessLicense[0]?.fileId)">
                            <i class="ri-eye-line"></i>
                            {{ $t('common.preview') }}
                          </el-button>
                          <el-button link type="primary" size="small" @click="handleDownload(formData.businessLicense[0]?.fileId, formData.businessLicense[0]?.name)">
                            <i class="ri-download-line"></i>
                            {{ $t('common.download') }}
                          </el-button>
                        </div>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.seedLicense')" prop="seedLicense">
                      <el-upload
                        v-if="!isFormDisabled"
                        class="doc-upload"
                        :http-request="(options) => handleUploadFile(options, 'seedLicense')"
                        :file-list="formData.seedLicense"
                        :on-remove="() => handleRemove('seedLicense')"
                        :limit="1"
                        accept=".pdf,.jpg,.jpeg,.png"
                      >
                        <el-button type="primary" plain size="large">
                          <i class="ri-upload-2-line"></i>
                          {{ $t('common.upload') }}
                        </el-button>
                      </el-upload>
                      <div v-else class="file-display">
                        <div class="file-info">
                          <i class="ri-file-text-line"></i>
                          <span>{{ formData.seedLicense[0]?.name || '-' }}</span>
                        </div>
                        <div v-if="formData.seedLicense[0]?.fileId" class="file-actions">
                          <el-button link type="primary" size="small" @click="handlePreview(formData.seedLicense[0]?.fileId)">
                            <i class="ri-eye-line"></i>
                            {{ $t('common.preview') }}
                          </el-button>
                          <el-button link type="primary" size="small" @click="handleDownload(formData.seedLicense[0]?.fileId, formData.seedLicense[0]?.name)">
                            <i class="ri-download-line"></i>
                            {{ $t('common.download') }}
                          </el-button>
                        </div>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.taxRegistration')" prop="taxRegistration">
                      <el-upload
                        v-if="!isFormDisabled"
                        class="doc-upload"
                        :http-request="(options) => handleUploadFile(options, 'taxRegistration')"
                        :file-list="formData.taxRegistration"
                        :on-remove="() => handleRemove('taxRegistration')"
                        :limit="1"
                        accept=".pdf,.jpg,.jpeg,.png"
                      >
                        <el-button type="primary" plain size="large">
                          <i class="ri-upload-2-line"></i>
                          {{ $t('common.upload') }}
                        </el-button>
                      </el-upload>
                      <div v-else class="file-display">
                        <div class="file-info">
                          <i class="ri-file-text-line"></i>
                          <span>{{ formData.taxRegistration[0]?.name || '-' }}</span>
                        </div>
                        <div v-if="formData.taxRegistration[0]?.fileId" class="file-actions">
                          <el-button link type="primary" size="small" @click="handlePreview(formData.taxRegistration[0]?.fileId)">
                            <i class="ri-eye-line"></i>
                            {{ $t('common.preview') }}
                          </el-button>
                          <el-button link type="primary" size="small" @click="handleDownload(formData.taxRegistration[0]?.fileId, formData.taxRegistration[0]?.name)">
                            <i class="ri-download-line"></i>
                            {{ $t('common.download') }}
                          </el-button>
                        </div>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item :label="$t('research.enterprise.form.factoryLicense')" prop="factoryLicense">
                      <el-upload
                        v-if="!isFormDisabled"
                        class="doc-upload"
                        :http-request="(options) => handleUploadFile(options, 'factoryLicense')"
                        :file-list="formData.factoryLicense"
                        :on-remove="() => handleRemove('factoryLicense')"
                        :limit="1"
                        accept=".pdf,.jpg,.jpeg,.png"
                      >
                        <el-button type="primary" plain size="large">
                          <i class="ri-upload-2-line"></i>
                          {{ $t('common.upload') }}
                        </el-button>
                      </el-upload>
                      <div v-else class="file-display">
                        <div class="file-info">
                          <i class="ri-file-text-line"></i>
                          <span>{{ formData.factoryLicense[0]?.name || '-' }}</span>
                        </div>
                        <div v-if="formData.factoryLicense[0]?.fileId" class="file-actions">
                          <el-button link type="primary" size="small" @click="handlePreview(formData.factoryLicense[0]?.fileId)">
                            <i class="ri-eye-line"></i>
                            {{ $t('common.preview') }}
                          </el-button>
                          <el-button link type="primary" size="small" @click="handleDownload(formData.factoryLicense[0]?.fileId, formData.factoryLicense[0]?.name)">
                            <i class="ri-download-line"></i>
                            {{ $t('common.download') }}
                          </el-button>
                        </div>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <!-- 表单操作按钮 - 只在未审核通过时显示 -->
              <div v-if="!isFormDisabled" class="form-actions">
                <el-button @click="handleReset" size="large">
                  {{ $t('common.reset') }}
                </el-button>
                <el-button @click="handleSaveDraft" :loading="draftLoading" size="large">
                  {{ $t('research.enterprise.actions.saveDraft') }}
                </el-button>
                <el-button
                  type="primary"
                  @click="handleSubmit"
                  :loading="submitLoading"
                  class="submit-btn"
                  size="large"
                >
                  <i class="ri-send-plane-line"></i>
                  {{ $t('research.enterprise.actions.submit') }}
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
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'
import {
  submitEnterpriseCertify,
  saveEnterpriseCertifyDraft,
  getEnterpriseCertifyDetail,
  uploadFile
} from '@/api/enterprise'

const { t } = useI18n()
const userStore = useUserStore()

// 表单引用
const formRef = ref(null)

// 加载状态
const loading = ref(false)
const submitLoading = ref(false)
const draftLoading = ref(false)

// 企业数据（从后端获取）
// certificationStatus: -1=草稿, 0=待审核, 1=审核通过, 2=审核驳回
const enterpriseData = ref({
  certificationStatus: null,
  rejectReason: ''
})

// 表单是否禁用（审核通过后不可编辑）
const isFormDisabled = computed(() => {
  return enterpriseData.value.certificationStatus === 1 // 1=审核通过
})

// 表单数据
const formData = reactive({
  enterpriseId: '',
  enterpriseName: '',
  unifiedSocialCreditCode: '',
  enterpriseType: '',
  seedLicenseNo: '',
  licenseStartDate: '',
  licenseEndDate: '',
  region: '',
  zone: '',
  county: '',
  township: '',
  detailedAddress: '',
  businessScope: '',
  annualProductionCapacity: null,
  establishmentDate: '',
  legalPersonName: '',
  legalPersonId: '',
  contactPerson: '',
  contactPhone: '',
  contactEmail: '',
  businessLicense: [],
  seedLicense: [],
  taxRegistration: [],
  factoryLicense: []
})

// 表单验证规则
const rules = computed(() => ({
  enterpriseName: [
    { required: true, message: t('research.enterprise.rules.enterpriseNameRequired'), trigger: 'blur' }
  ],
  unifiedSocialCreditCode: [
    { required: true, message: t('research.enterprise.rules.unifiedSocialCreditCodeRequired'), trigger: 'blur' },
    { len: 18, message: t('research.enterprise.rules.unifiedSocialCreditCodeLength'), trigger: 'blur' }
  ],
  enterpriseType: [
    { required: true, message: t('research.enterprise.rules.enterpriseTypeRequired'), trigger: 'change' }
  ],
  seedLicenseNo: [
    { required: true, message: t('research.enterprise.rules.seedLicenseNoRequired'), trigger: 'blur' }
  ],
  licenseStartDate: [
    { required: true, message: t('research.enterprise.rules.licenseStartDateRequired'), trigger: 'change' }
  ],
  licenseEndDate: [
    { required: true, message: t('research.enterprise.rules.licenseEndDateRequired'), trigger: 'change' }
  ],
  region: [
    { required: true, message: t('research.enterprise.rules.regionRequired'), trigger: 'change' }
  ],
  zone: [
    { required: true, message: t('research.enterprise.rules.zoneRequired'), trigger: 'change' }
  ],
  county: [
    { required: true, message: t('research.enterprise.rules.countyRequired'), trigger: 'change' }
  ],
  township: [
    { required: true, message: t('research.enterprise.rules.townshipRequired'), trigger: 'change' }
  ],
  detailedAddress: [
    { required: true, message: t('research.enterprise.rules.detailedAddressRequired'), trigger: 'blur' }
  ],
  businessScope: [
    { required: true, message: t('research.enterprise.rules.businessScopeRequired'), trigger: 'blur' }
  ],
  annualProductionCapacity: [
    { required: true, message: t('research.enterprise.rules.annualProductionCapacityRequired'), trigger: 'blur' }
  ],
  establishmentDate: [
    { required: true, message: t('research.enterprise.rules.establishmentDateRequired'), trigger: 'change' }
  ],
  legalPersonName: [
    { required: true, message: t('research.enterprise.rules.legalPersonNameRequired'), trigger: 'blur' }
  ],
  legalPersonId: [
    { required: true, message: t('research.enterprise.rules.legalPersonIdRequired'), trigger: 'blur' }
  ],
  contactPerson: [
    { required: true, message: t('research.enterprise.rules.contactPersonRequired'), trigger: 'blur' }
  ],
  contactPhone: [
    { required: true, message: t('research.enterprise.rules.contactPhoneRequired'), trigger: 'blur' },
    { pattern: /^[0-9+\-\s()]+$/, message: t('research.enterprise.rules.contactPhoneFormat'), trigger: 'blur' }
  ],
  contactEmail: [
    { pattern: /^\S+@\S+\.\S+$/, message: t('research.enterprise.rules.contactEmailFormat'), trigger: 'blur' }
  ]
}))

// 获取状态标签样式 (-1=草稿, 0=待审核, 1=审核通过, 2=审核驳回)
const getStatusTag = (status) => {
  console.log(status,'status')
  const tagMap = { '-1': 'info', 0: 'warning', 1: 'success', 2: 'danger' }
  return tagMap[status] || 'info'
}

// 获取状态标签文本
const getStatusLabel = (status) => {
  const labelMap = {
    '-1': t('research.enterprise.status.draft'),
    0: t('research.enterprise.status.pending'),
    1: t('research.enterprise.status.approved'),
    2: t('research.enterprise.status.rejected')
  }
  return labelMap[status] || '未申请'
}

// 重置表单
const handleReset = () => {
  formRef.value?.resetFields()
}

// 文件上传 - 自定义上传方法
const handleUploadFile = async (options, field) => {
  const formDataObj = new FormData()
  formDataObj.append('file', options.file)

  try {
    const response = await uploadFile(formDataObj)

    if (response.code === 200) {
      // 使用API返回的数据构建文件对象
      formData[field] = [{
        name: response.data.originalFileName || options.file.name,
        url: response.data.filePath,
        fileId: response.data.id,
        uid: options.file.uid // 保留Element Plus需要的uid
      }]
      ElMessage.success(t('common.uploadSuccess'))
      // 通知Element Plus上传成功
      options.onSuccess(response.data)
    } else {
      const errorMsg = response.msg || t('common.uploadFailed')
      ElMessage.error(errorMsg)
      // 通知Element Plus上传失败
      options.onError(new Error(errorMsg))
    }
  } catch (error) {
    const errorMsg = error.message || t('common.uploadFailed')
    ElMessage.error(errorMsg)
    // 通知Element Plus上传失败
    options.onError(error)
  }
}

// 文件移除
const handleRemove = (field) => {
  formData[field] = []
}

// 文件预览
const handlePreview = (fileId) => {
  if (!fileId) {
    ElMessage.warning(t('common.noFile'))
    return
  }
  const previewUrl = `/auth/doc/preview/${fileId}`
  window.open(previewUrl, '_blank')
}

// 文件下载
const handleDownload = (fileId, fileName) => {
  if (!fileId) {
    ElMessage.warning(t('common.noFile'))
    return
  }
  const downloadUrl = `/auth/doc/download?fileId=${fileId}`
  const link = document.createElement('a')
  link.href = downloadUrl
  link.download = fileName || 'document'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 保存草稿
const handleSaveDraft = async () => {
  if (!formRef.value) return
  draftLoading.value = true
  try {
    const submitData = prepareSubmitData()
    const response = await saveEnterpriseCertifyDraft(submitData)

    if (response.code === 200) {
      ElMessage.success(t('research.enterprise.messages.saveDraftSuccess'))
      enterpriseData.value.certificationStatus = -1 // -1=草稿
      if (response.data?.enterpriseId) {
        formData.enterpriseId = response.data.enterpriseId
      }
    } else {
      throw new Error(response.msg || t('common.saveFailed'))
    }
  } catch (error) {
    ElMessage.error(error.message || t('common.saveFailed'))
  } finally {
    draftLoading.value = false
  }
}

// 格式化日期为 YYYY-MM-DD 格式
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toISOString().split('T')[0]
}

// 准备提交数据
const prepareSubmitData = () => {
  return {
    enterpriseName: formData.enterpriseName,
    unifiedSocialCreditCode: formData.unifiedSocialCreditCode,
    enterpriseType: formData.enterpriseType,
    seedLicenseNo: formData.seedLicenseNo,
    licenseStartDate: formatDate(formData.licenseStartDate),
    licenseEndDate: formatDate(formData.licenseEndDate),
    region: formData.region,
    zone: formData.zone,
    county: formData.county,
    township: formData.township,
    detailedAddress: formData.detailedAddress,
    businessScope: formData.businessScope,
    annualProductionCapacity: formData.annualProductionCapacity,
    establishmentDate: formatDate(formData.establishmentDate),
    legalPersonName: formData.legalPersonName,
    legalPersonId: formData.legalPersonId,
    contactPerson: formData.contactPerson,
    contactPhone: formData.contactPhone,
    contactEmail: formData.contactEmail,
    // 文件ID和文件名
    businessLicenseUrl: formData.businessLicense[0]?.fileId || '',
    businessLicenseName: formData.businessLicense[0]?.name || '',
    seedLicenseUrl: formData.seedLicense[0]?.fileId || '',
    seedLicenseName: formData.seedLicense[0]?.name || '',
    taxRegistrationUrl: formData.taxRegistration[0]?.fileId || '',
    taxRegistrationName: formData.taxRegistration[0]?.name || '',
    factoryLicenseUrl: formData.factoryLicense[0]?.fileId || '',
    factoryLicenseName: formData.factoryLicense[0]?.name || '',
    operator: userStore.userInfo?.userName || formData.contactPerson,
    operationOrg: formData.enterpriseName
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    submitLoading.value = true

    const submitData = prepareSubmitData()
    const response = await submitEnterpriseCertify(submitData)

    if (response.code === 200) {
      ElMessage.success(t('research.enterprise.messages.submitSuccess'))
      enterpriseData.value.certificationStatus = 0 // 0=待审核
      formData.enterpriseId = response.data.enterpriseId
    } else {
      throw new Error(response.msg || t('common.submitFailed'))
    }
  } catch (error) {
    if (error.message) {
      ElMessage.error(error.message)
    }
  } finally {
    submitLoading.value = false
  }
}

// 创建文件列表对象 - 根据fileId创建文件项用于回显
const createFileItem = (fileId, fileName) => {
  if (!fileId) return []

  // 构建预览URL
  const previewUrl = `/auth/doc/preview/${fileId}`

  return [{
    name: fileName || 'document', // 使用真实文件名或默认名称
    url: previewUrl,
    fileId: fileId,
    uid: Date.now() // 为Element Plus生成唯一uid
  }]
}

// 加载企业数据
const loadEnterpriseData = async () => {

  loading.value = true
  try {

    const response = await getEnterpriseCertifyDetail();

    if (response.code === 200 && response.data) {
      const data = response.data

      // 更新企业状态数据
      enterpriseData.value.certificationStatus = data.certificationStatus
      enterpriseData.value.rejectReason = data.rejectReason

      // 填充表单数据 - 从后端获取的文件名应该保存在字段中
      // 如果后端没有返回文件名，可以从 originalFileName 或其他字段获取
      Object.assign(formData, {
        ...data,
        businessLicense: createFileItem(data.businessLicenseUrl, data.businessLicenseName || 'Business License'),
        seedLicense: createFileItem(data.seedLicenseUrl, data.seedLicenseName || 'Seed License'),
        taxRegistration: createFileItem(data.taxRegistrationUrl, data.taxRegistrationName || 'Tax Registration'),
        factoryLicense: createFileItem(data.factoryLicenseUrl, data.factoryLicenseName || 'Factory License')
      })


    } else if (response.code === 500 && response.msg === '企业信息不存在') {
      console.info('企业信息不存在，用户首次填写')
      enterpriseData.value.certificationStatus = null
    }
  } catch (error) {
    // 404 或企业不存在的错误不显示提示（首次进入是正常的）
    const isNotFound = error.response?.status === 404 || error.message?.includes('企业信息不存在')
    if (isNotFound) {
      console.info('企业信息不存在，用户首次填写')
      enterpriseData.value.certificationStatus = null
    } else {
      console.error('加载企业数据失败:', error)
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadEnterpriseData()
})
</script>

<style scoped>
.page-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #f8fafb 0%, #ffffff 100%);
  overflow: hidden;
}

.page-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  min-height: 0;
}

/* 页面头部 - 固定不滚动 */
.page-header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin: 0 0 24px 0;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 154, 68, 0.25);
  flex-shrink: 0;
}

.header-icon i {
  font-size: 40px;
  color: white;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  color: #009A44;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 15px;
  color: #909399;
  margin: 0;
}

.header-right {
  flex-shrink: 0;
}

.status-tag {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
}

/* 内容区域 - 可滚动 */
.content-wrapper {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  min-height: 0;
}

.info-card {
  background: white;
  border-radius: 16px;
  border: 2px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.card-body {
  padding: 32px;
  margin-bottom: 24px;
}

/* 驳回提示 */
.reject-alert {
  margin-bottom: 24px;
}

.alert-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
}

.alert-title i {
  font-size: 20px;
}

.alert-content {
  margin-top: 8px;
  line-height: 1.6;
}

.alert-content p {
  margin: 4px 0;
}

/* 表单 */
.enterprise-form {
  margin-top: 0;
}

.form-section {
  margin-bottom: 32px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(0, 154, 68, 0.1);
}

.section-header i {
  font-size: 24px;
  color: #009A44;
}

.section-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: #303133;
  margin: 0;
}

.enterprise-form :deep(.el-form-item__label) {
  font-size: 15px;
  font-weight: 600;
  color: #606266;
  padding-bottom: 10px;
}

.enterprise-form :deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1) inset;
  transition: all 0.3s ease;
}

.enterprise-form :deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #009A44 inset;
}

.enterprise-form :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #009A44 inset;
}

.enterprise-form :deep(.el-input.is-disabled .el-input__wrapper) {
  background-color: #f5f7fa;
  box-shadow: 0 0 0 1px #e4e7ed inset;
}

.enterprise-form :deep(.el-input__prefix) {
  color: #009A44;
  font-size: 18px;
}

.enterprise-form :deep(.el-textarea__inner) {
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.enterprise-form :deep(.el-textarea__inner:hover) {
  border-color: #009A44;
}

.enterprise-form :deep(.el-textarea__inner:focus) {
  border-color: #009A44;
}

.enterprise-form :deep(.el-textarea.is-disabled .el-textarea__inner) {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
}

.full-width {
  width: 100%;
}

.upload-tip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: rgba(254, 221, 0, 0.05);
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #606266;
}

.upload-tip i {
  color: #FEDD00;
  font-size: 16px;
}

.doc-upload {
  width: 100%;
}

/* 文件显示（禁用状态） */
.file-display {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  color: #606266;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.file-info i {
  font-size: 20px;
  color: #909399;
  flex-shrink: 0;
}

.file-info span {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-actions {
  display: flex;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid #e4e7ed;
}

.file-actions .el-button {
  padding: 4px 8px;
}

/* 表单操作 */
.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.form-actions :deep(.el-button) {
  min-width: 140px;
  border-radius: 8px;
  font-weight: 600;
}

.submit-btn {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border: none;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #008038 0%, #009A44 100%);
}

.submit-btn i {
  margin-right: 4px;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .page-header {
    flex-direction: column;
    padding: 24px 20px;
    gap: 16px;
    margin: 0 0 16px 0;
  }

  .header-left {
    width: 100%;
  }

  .header-icon {
    width: 64px;
    height: 64px;
  }

  .header-icon i {
    font-size: 32px;
  }

  .page-title {
    font-size: 24px;
  }

  .header-right {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .status-tag {
    width: 100%;
    justify-content: center;
  }

  .card-body {
    padding: 20px;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions :deep(.el-button) {
    width: 100%;
  }
}
</style>
