<template>
  <div class="enterprise-auth-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon-wrapper">
        <i class="ri-shield-check-line"></i>
      </div>
      <div class="header-text">
        <h1 class="page-title">{{ $t('research.enterprise.title') }}</h1>
        <p class="page-subtitle">{{ $t('research.enterprise.subtitle') }}</p>
      </div>
      <div class="header-actions">
        <el-button type="primary" @click="showForm = true">
          <i class="ri-add-line"></i>
          <span>{{ $t('research.enterprise.add') }}</span>
        </el-button>
      </div>
    </div>

    <!-- 列表区域 -->
    <div v-if="!showForm" class="list-section">
      <!-- 搜索筛选区 -->
      <div class="search-section">
        <el-input
          v-model="searchQuery"
          :placeholder="$t('research.enterprise.searchPlaceholder')"
          clearable
          class="search-input"
        >
          <template #prefix>
            <i class="ri-search-line"></i>
          </template>
        </el-input>
        <el-select
          v-model="filterType"
          :placeholder="$t('research.enterprise.filterByType')"
          clearable
          class="filter-select"
        >
          <el-option :label="$t('research.enterprise.allTypes')" value="" />
          <el-option :label="$t('research.enterprise.type.production')" value="production" />
          <el-option :label="$t('research.enterprise.type.trade')" value="trade" />
          <el-option :label="$t('research.enterprise.type.integrated')" value="integrated" />
        </el-select>
        <el-select
          v-model="filterStatus"
          :placeholder="$t('research.enterprise.filterByStatus')"
          clearable
          class="filter-select"
        >
          <el-option :label="$t('research.enterprise.allStatus')" value="" />
          <el-option :label="$t('research.enterprise.status.pending')" value="pending" />
          <el-option :label="$t('research.enterprise.status.approved')" value="approved" />
          <el-option :label="$t('research.enterprise.status.rejected')" value="rejected" />
          <el-option :label="$t('research.enterprise.status.draft')" value="draft" />
        </el-select>
      </div>

      <!-- PC端表格 -->
      <div class="table-container pc-only">
        <el-table :data="filteredList" stripe style="width: 100%" :empty-text="$t('home.noData')">
          <el-table-column prop="enterpriseName" :label="$t('research.enterprise.columns.enterpriseName')" min-width="200" />
          <el-table-column prop="unifiedSocialCreditCode" :label="$t('research.enterprise.columns.unifiedSocialCreditCode')" min-width="180" />
          <el-table-column prop="enterpriseType" :label="$t('research.enterprise.columns.enterpriseType')" width="120">
            <template #default="{ row }">
              <el-tag :type="getTypeTag(row.enterpriseType)">
                {{ getTypeLabel(row.enterpriseType) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="seedLicenseNo" :label="$t('research.enterprise.columns.seedLicenseNo')" min-width="160" />
          <el-table-column prop="certificationStatus" :label="$t('research.enterprise.columns.certificationStatus')" width="120">
            <template #default="{ row }">
              <el-tag :type="getStatusTag(row.certificationStatus)">
                {{ getStatusLabel(row.certificationStatus) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('research.enterprise.columns.actions')" width="180" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleView(row)">
                <i class="ri-eye-line"></i>
              </el-button>
              <el-button v-if="row.certificationStatus === 'rejected'" link type="primary" @click="handleEdit(row)">
                <i class="ri-edit-line"></i>
              </el-button>
              <el-button link type="danger" @click="handleDelete(row)">
                <i class="ri-delete-bin-line"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 移动端卡片 -->
      <div class="card-container mobile-only">
        <div v-if="filteredList.length === 0" class="empty-state">
          <i class="ri-inbox-line"></i>
          <p>{{ $t('home.noData') }}</p>
        </div>
        <div v-for="item in filteredList" :key="item.enterpriseId" class="enterprise-card" @click="handleView(item)">
          <div class="card-header">
            <div class="enterprise-name">{{ item.enterpriseName }}</div>
            <el-tag :type="getStatusTag(item.certificationStatus)" size="small">
              {{ getStatusLabel(item.certificationStatus) }}
            </el-tag>
          </div>
          <div class="card-body">
            <div class="card-row">
              <span class="label">{{ $t('research.enterprise.columns.unifiedSocialCreditCode') }}:</span>
              <span class="value">{{ item.unifiedSocialCreditCode }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.enterprise.columns.enterpriseType') }}:</span>
              <el-tag :type="getTypeTag(item.enterpriseType)" size="small">
                {{ getTypeLabel(item.enterpriseType) }}
              </el-tag>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.enterprise.columns.seedLicenseNo') }}:</span>
              <span class="value">{{ item.seedLicenseNo }}</span>
            </div>
          </div>
          <div class="card-actions" @click.stop>
            <el-button v-if="item.certificationStatus === 'rejected'" link type="primary" size="small" @click="handleEdit(item)">
              <i class="ri-edit-line"></i> {{ $t('common.edit') }}
            </el-button>
            <el-button link type="danger" size="small" @click="handleDelete(item)">
              <i class="ri-delete-bin-line"></i> {{ $t('common.delete') }}
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 表单区域 -->
    <div v-else class="form-section">
      <div class="form-header">
        <el-button @click="handleCancelForm">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
      </div>

      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="enterprise-form">
        <!-- 企业身份信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-building-2-line"></i>
            <h3>{{ $t('research.enterprise.form.identityInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('research.enterprise.form.enterpriseName')" prop="enterpriseName">
              <el-input v-model="formData.enterpriseName" :placeholder="$t('research.enterprise.placeholder.enterpriseName')" clearable />
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.unifiedSocialCreditCode')" prop="unifiedSocialCreditCode">
              <el-input v-model="formData.unifiedSocialCreditCode" :placeholder="$t('research.enterprise.placeholder.unifiedSocialCreditCode')" maxlength="18" clearable />
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.enterpriseType')" prop="enterpriseType">
              <el-select v-model="formData.enterpriseType" :placeholder="$t('research.enterprise.placeholder.enterpriseType')" class="full-width">
                <el-option :label="$t('research.enterprise.type.production')" value="production" />
                <el-option :label="$t('research.enterprise.type.trade')" value="trade" />
                <el-option :label="$t('research.enterprise.type.integrated')" value="integrated" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.seedLicenseNo')" prop="seedLicenseNo">
              <el-input v-model="formData.seedLicenseNo" :placeholder="$t('research.enterprise.placeholder.seedLicenseNo')" clearable />
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.licenseStartDate')" prop="licenseStartDate">
              <el-date-picker v-model="formData.licenseStartDate" type="date" :placeholder="$t('research.enterprise.placeholder.licenseStartDate')" class="full-width" />
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.licenseEndDate')" prop="licenseEndDate">
              <el-date-picker v-model="formData.licenseEndDate" type="date" :placeholder="$t('research.enterprise.placeholder.licenseEndDate')" class="full-width" />
            </el-form-item>
          </div>
        </div>

        <!-- 位置与运营信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-map-pin-line"></i>
            <h3>{{ $t('research.enterprise.form.locationInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('research.enterprise.form.region')" prop="region">
              <el-select v-model="formData.region" :placeholder="$t('research.enterprise.placeholder.region')" class="full-width">
                <el-option label="Oromia" value="Oromia" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.zone')" prop="zone">
              <el-select v-model="formData.zone" :placeholder="$t('research.enterprise.placeholder.zone')" class="full-width">
                <el-option label="Zone 1" value="zone1" />
                <el-option label="Zone 2" value="zone2" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.county')" prop="county">
              <el-select v-model="formData.county" :placeholder="$t('research.enterprise.placeholder.county')" class="full-width">
                <el-option label="County 1" value="county1" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.township')" prop="township">
              <el-select v-model="formData.township" :placeholder="$t('research.enterprise.placeholder.township')" class="full-width">
                <el-option label="Township 1" value="township1" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.detailedAddress')" prop="detailedAddress" class="full-width-item">
              <el-input v-model="formData.detailedAddress" :placeholder="$t('research.enterprise.placeholder.detailedAddress')" type="textarea" :rows="2" />
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.businessScope')" prop="businessScope" class="full-width-item">
              <el-input v-model="formData.businessScope" :placeholder="$t('research.enterprise.placeholder.businessScope')" type="textarea" :rows="2" />
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.annualProductionCapacity')" prop="annualProductionCapacity">
              <el-input v-model.number="formData.annualProductionCapacity" :placeholder="$t('research.enterprise.placeholder.annualProductionCapacity')" type="number">
                <template #append>{{ $t('research.enterprise.form.annualProductionCapacity').includes('吨') ? '吨/年' : 'tons/year' }}</template>
              </el-input>
            </el-form-item>
          </div>
        </div>

        <!-- 企业额外信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-information-line"></i>
            <h3>{{ $t('research.enterprise.form.extraInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('research.enterprise.form.establishmentDate')" prop="establishmentDate">
              <el-date-picker v-model="formData.establishmentDate" type="date" :placeholder="$t('research.enterprise.placeholder.establishmentDate')" class="full-width" />
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.legalPersonName')" prop="legalPersonName">
              <el-input v-model="formData.legalPersonName" :placeholder="$t('research.enterprise.placeholder.legalPersonName')" clearable />
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.legalPersonId')" prop="legalPersonId">
              <el-input v-model="formData.legalPersonId" :placeholder="$t('research.enterprise.placeholder.legalPersonId')" clearable />
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.contactPerson')" prop="contactPerson">
              <el-input v-model="formData.contactPerson" :placeholder="$t('research.enterprise.placeholder.contactPerson')" clearable />
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.contactPhone')" prop="contactPhone">
              <el-input v-model="formData.contactPhone" :placeholder="$t('research.enterprise.placeholder.contactPhone')" clearable />
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.contactEmail')" prop="contactEmail">
              <el-input v-model="formData.contactEmail" :placeholder="$t('research.enterprise.placeholder.contactEmail')" clearable />
            </el-form-item>
          </div>
        </div>

        <!-- 所需文件 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-file-text-line"></i>
            <h3>{{ $t('research.enterprise.form.documentsInfo') }}</h3>
          </div>
          <div class="upload-tip">
            <i class="ri-information-line"></i>
            <span>{{ $t('research.enterprise.messages.uploadTip') }}</span>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('research.enterprise.form.businessLicense')" prop="businessLicense" class="upload-item">
              <el-upload v-model:file-list="formData.businessLicense" :auto-upload="false" :limit="1" accept=".pdf,.jpg,.jpeg,.png" list-type="picture-card">
                <i class="ri-upload-2-line"></i>
                <div class="upload-text">{{ $t('common.submit') || '上传' }}</div>
              </el-upload>
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.seedLicense')" prop="seedLicense" class="upload-item">
              <el-upload v-model:file-list="formData.seedLicense" :auto-upload="false" :limit="1" accept=".pdf,.jpg,.jpeg,.png" list-type="picture-card">
                <i class="ri-upload-2-line"></i>
                <div class="upload-text">{{ $t('common.submit') || '上传' }}</div>
              </el-upload>
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.taxRegistration')" prop="taxRegistration" class="upload-item">
              <el-upload v-model:file-list="formData.taxRegistration" :auto-upload="false" :limit="1" accept=".pdf,.jpg,.jpeg,.png" list-type="picture-card">
                <i class="ri-upload-2-line"></i>
                <div class="upload-text">{{ $t('common.submit') || '上传' }}</div>
              </el-upload>
            </el-form-item>
            <el-form-item :label="$t('research.enterprise.form.factoryLicense')" prop="factoryLicense" class="upload-item">
              <el-upload v-model:file-list="formData.factoryLicense" :auto-upload="false" :limit="1" accept=".pdf,.jpg,.jpeg,.png" list-type="picture-card">
                <i class="ri-upload-2-line"></i>
                <div class="upload-text">{{ $t('common.submit') || '上传' }}</div>
              </el-upload>
            </el-form-item>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="handleReset">{{ $t('common.reset') }}</el-button>
          <el-button @click="handleSaveDraft">{{ $t('research.enterprise.actions.saveDraft') }}</el-button>
          <el-button type="primary" @click="handleSubmit">{{ $t('research.enterprise.actions.submit') }}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'

const { t } = useI18n()
const formRef = ref(null)

// 显示表单或列表
const showForm = ref(false)

// 搜索和筛选
const searchQuery = ref('')
const filterType = ref('')
const filterStatus = ref('')

// 模拟数据
const mockData = ref([
  {
    enterpriseId: 'ENT001',
    enterpriseName: 'Oromia Seeds Production Enterprise',
    unifiedSocialCreditCode: '123456789012345678',
    enterpriseType: 'production',
    seedLicenseNo: 'SL-2024-001',
    certificationStatus: 'approved'
  },
  {
    enterpriseId: 'ENT002',
    enterpriseName: 'Green Valley Agri Trade',
    unifiedSocialCreditCode: '987654321098765432',
    enterpriseType: 'trade',
    seedLicenseNo: 'SL-2024-002',
    certificationStatus: 'pending'
  },
  {
    enterpriseId: 'ENT003',
    enterpriseName: 'Ethiopian Seed Company',
    unifiedSocialCreditCode: '456789123456789123',
    enterpriseType: 'integrated',
    seedLicenseNo: 'SL-2024-003',
    certificationStatus: 'draft'
  }
])

// 表单数据
const formData = reactive({
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
  enterpriseName: [{ required: true, message: t('research.enterprise.rules.enterpriseNameRequired'), trigger: 'blur' }],
  unifiedSocialCreditCode: [
    { required: true, message: t('research.enterprise.rules.unifiedSocialCreditCodeRequired'), trigger: 'blur' },
    { len: 18, message: t('research.enterprise.rules.unifiedSocialCreditCodeLength'), trigger: 'blur' }
  ],
  enterpriseType: [{ required: true, message: t('research.enterprise.rules.enterpriseTypeRequired'), trigger: 'change' }],
  seedLicenseNo: [{ required: true, message: t('research.enterprise.rules.seedLicenseNoRequired'), trigger: 'blur' }],
  licenseStartDate: [{ required: true, message: t('research.enterprise.rules.licenseStartDateRequired'), trigger: 'change' }],
  licenseEndDate: [{ required: true, message: t('research.enterprise.rules.licenseEndDateRequired'), trigger: 'change' }],
  region: [{ required: true, message: t('research.enterprise.rules.regionRequired'), trigger: 'change' }],
  zone: [{ required: true, message: t('research.enterprise.rules.zoneRequired'), trigger: 'change' }],
  county: [{ required: true, message: t('research.enterprise.rules.countyRequired'), trigger: 'change' }],
  township: [{ required: true, message: t('research.enterprise.rules.townshipRequired'), trigger: 'change' }],
  detailedAddress: [{ required: true, message: t('research.enterprise.rules.detailedAddressRequired'), trigger: 'blur' }],
  businessScope: [{ required: true, message: t('research.enterprise.rules.businessScopeRequired'), trigger: 'blur' }],
  annualProductionCapacity: [{ required: true, message: t('research.enterprise.rules.annualProductionCapacityRequired'), trigger: 'blur' }],
  establishmentDate: [{ required: true, message: t('research.enterprise.rules.establishmentDateRequired'), trigger: 'change' }],
  legalPersonName: [{ required: true, message: t('research.enterprise.rules.legalPersonNameRequired'), trigger: 'blur' }],
  legalPersonId: [{ required: true, message: t('research.enterprise.rules.legalPersonIdRequired'), trigger: 'blur' }],
  contactPerson: [{ required: true, message: t('research.enterprise.rules.contactPersonRequired'), trigger: 'blur' }],
  contactPhone: [
    { required: true, message: t('research.enterprise.rules.contactPhoneRequired'), trigger: 'blur' },
    { pattern: /^[0-9+\-\s()]+$/, message: t('research.enterprise.rules.contactPhoneFormat'), trigger: 'blur' }
  ],
  contactEmail: [{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('research.enterprise.rules.contactEmailFormat'), trigger: 'blur' }]
}))

// 筛选后的列表
const filteredList = computed(() => {
  let list = mockData.value
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    list = list.filter(item =>
      item.enterpriseName.toLowerCase().includes(query) ||
      item.unifiedSocialCreditCode.includes(query) ||
      item.seedLicenseNo.toLowerCase().includes(query)
    )
  }
  if (filterType.value) {
    list = list.filter(item => item.enterpriseType === filterType.value)
  }
  if (filterStatus.value) {
    list = list.filter(item => item.certificationStatus === filterStatus.value)
  }
  return list
})

const getTypeTag = (type) => {
  const tagMap = { production: '', trade: 'success', integrated: 'warning' }
  return tagMap[type] || ''
}

const getTypeLabel = (type) => t(`research.enterprise.type.${type}`)

const getStatusTag = (status) => {
  const tagMap = { draft: 'info', pending: 'warning', approved: 'success', rejected: 'danger' }
  return tagMap[status] || 'info'
}

const getStatusLabel = (status) => t(`research.enterprise.status.${status}`)

const handleView = (row) => {
  console.log('View:', row)
}

const handleEdit = (row) => {
  console.log('Edit:', row)
  showForm.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm(t('research.enterprise.messages.deleteConfirm'), t('common.tips'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(() => {
    ElMessage.success(t('research.enterprise.messages.deleteSuccess'))
  })
}

const handleCancelForm = () => {
  showForm.value = false
  formRef.value?.resetFields()
}

const handleReset = () => {
  formRef.value?.resetFields()
}

const handleSaveDraft = async () => {
  try {
    console.log('Save draft:', formData)
    ElMessage.success(t('research.enterprise.messages.saveDraftSuccess'))
  } catch (error) {
    ElMessage.error(t('common.failed'))
  }
}

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    console.log('Submit form:', formData)
    ElMessage.success(t('research.enterprise.messages.submitSuccess'))
    setTimeout(() => {
      showForm.value = false
      formRef.value?.resetFields()
    }, 1500)
  } catch (error) {
    console.error('Form validation error:', error)
  }
}
</script>

<style scoped>
.enterprise-auth-page {
  padding: 24px;
  background: #f0f2f5;
  min-height: 100%;
}

/* 页面头部 */
.page-header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px;
  background: white;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.header-icon-wrapper {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #FEDD00 0%, #FFE94D 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-icon-wrapper i {
  font-size: 32px;
  color: #303133;
}

.header-text {
  flex: 1;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #303133;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 14px;
  color: #606266;
  margin: 0;
}

/* 列表区域 */
.list-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.search-section {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.search-input {
  flex: 1;
  max-width: 400px;
}

.filter-select {
  width: 200px;
}

.table-container {
  overflow: auto;
}

/* 移动端卡片 */
.card-container {
  display: none;
}

.mobile-only {
  display: none !important;
}

.enterprise-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.enterprise-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e4e7ed;
}

.enterprise-name {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  flex: 1;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.card-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.card-row .label {
  color: #909399;
}

.card-row .value {
  color: #606266;
}

.card-actions {
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #e4e7ed;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #C0C4CC;
}

.empty-state i {
  font-size: 64px;
  margin-bottom: 16px;
}

/* 表单区域 */
.form-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.form-header {
  margin-bottom: 24px;
}

.form-block {
  margin-bottom: 32px;
}

.block-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f2f5;
}

.block-header i {
  font-size: 20px;
  color: #FEDD00;
}

.block-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.full-width-item {
  grid-column: 1 / -1;
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

.upload-item {
  grid-column: span 1;
}

.upload-text {
  margin-top: 8px;
  font-size: 12px;
  color: #606266;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid #f0f2f5;
}

/* 响应式设计 */
@media screen and (max-width: 1024px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 768px) {
  .enterprise-auth-page {
    padding: 16px;
  }

  .page-header {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }

  .header-actions {
    width: 100%;
  }

  .header-actions .el-button {
    width: 100%;
  }

  .list-section,
  .form-section {
    padding: 16px;
  }

  .search-section {
    flex-direction: column;
  }

  .search-input,
  .filter-select {
    max-width: 100%;
    width: 100%;
  }

  .pc-only {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
    flex-direction: column;
  }

  .card-container {
    display: flex;
    flex-direction: column;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions .el-button {
    width: 100%;
  }
}
</style>
