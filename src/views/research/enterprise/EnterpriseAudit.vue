<template>
  <div class="enterprise-audit-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon-wrapper">
        <i class="ri-checkbox-circle-line"></i>
      </div>
      <div class="header-text">
        <h1 class="page-title">{{ $t('research.audit.title') }}</h1>
        <p class="page-subtitle">{{ $t('research.audit.subtitle') }}</p>
      </div>
    </div>

    <!-- 列表视图 -->
    <div v-if="!showAuditForm" class="list-section">
      <!-- 搜索筛选区 - 与认证页面保持一致 -->
     
      <!-- PC端表格 -->
      <div class="table-container pc-only"> 

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
        <!-- <el-select
          v-model="filterType"
          :placeholder="$t('research.enterprise.filterByType')"
          clearable
          class="filter-select"
        >
          <el-option :label="$t('research.enterprise.allTypes')" value="" />
          <el-option :label="$t('research.enterprise.type.production')" value="production" />
          <el-option :label="$t('research.enterprise.type.trade')" value="trade" />
          <el-option :label="$t('research.enterprise.type.integrated')" value="integrated" />
        </el-select> -->
        <el-select
          v-model="filterStatus"
          :placeholder="$t('research.enterprise.filterByStatus')"
          clearable
          class="filter-select"
        >
          <el-option :label="$t('research.enterprise.allStatus')" value="" />
          <el-option :label="$t('research.audit.status.pending')" value="pending" />
          <el-option :label="$t('research.audit.status.approved')" value="approved" />
          <el-option :label="$t('research.audit.status.rejected')" value="rejected" />
        </el-select>
      </div>

        <el-table :data="filteredList" stripe style="width: 100%" :empty-text="$t('home.noData')">
          <el-table-column prop="enterpriseName" :label="$t('research.audit.columns.enterpriseName')" min-width="150" />
          <el-table-column prop="unifiedSocialCreditCode" :label="$t('research.audit.columns.unifiedSocialCreditCode')" min-width="150" />
          <el-table-column prop="seedLicenseNo" :label="$t('research.audit.columns.seedLicenseNo')" min-width="150" />
          <el-table-column prop="applicationDate" :label="$t('research.audit.columns.applicationDate')" width="120" />
          <el-table-column prop="currentStage" :label="$t('research.audit.columns.currentStage')" width="150">
            <template #default="{ row }">
              <el-tag :type="getStageTagType(row.currentStage)" size="small">
                {{ getStageLabel(row.currentStage) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="assignedAuditor" :label="$t('research.audit.columns.assignedAuditor')" width="120" />
          <el-table-column prop="auditStatus" :label="$t('research.audit.columns.auditStatus')" width="120">
            <template #default="{ row }">
              <el-tag :type="getStatusTagType(row.auditStatus)">
                {{ getStatusLabel(row.auditStatus) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('research.audit.columns.actions')" width="120" fixed="right">
            <template #default="{ row }">
              <el-button
                v-if="row.auditStatus === 'pending'"
                type="primary"
                link
                @click="handleAudit(row)"
              >
                <i class="ri-file-edit-line"></i>
              </el-button>
              <el-button
                v-else
                type="primary"
                link
                @click="handleView(row)"
              >
                <i class="ri-eye-line"></i>
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
        <div v-for="item in filteredList" :key="item.enterpriseId" class="enterprise-card" @click="item.auditStatus === 'pending' ? handleAudit(item) : handleView(item)">
          <div class="card-header">
            <div class="enterprise-name">{{ item.enterpriseName }}</div>
            <el-tag :type="getStatusTagType(item.auditStatus)" size="small">
              {{ getStatusLabel(item.auditStatus) }}
            </el-tag>
          </div>
          <div class="card-body">
            <div class="card-row">
              <span class="label">{{ $t('research.audit.columns.unifiedSocialCreditCode') }}:</span>
              <span class="value">{{ item.unifiedSocialCreditCode }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.audit.columns.currentStage') }}:</span>
              <el-tag :type="getStageTagType(item.currentStage)" size="small">
                {{ getStageLabel(item.currentStage) }}
              </el-tag>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.audit.columns.assignedAuditor') }}:</span>
              <span class="value">{{ item.assignedAuditor }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 审核详情视图 -->
    <div v-else class="audit-detail-section">
      <!-- 返回按钮 -->
      <div class="detail-header">
        <el-button @click="handleBackToList">
          <i class="ri-arrow-left-line"></i>
          <span>{{ $t('research.audit.actions.backToList') }}</span>
        </el-button>
      </div>

      <!-- 企业基础信息 -->
      <div class="info-section">
        <div class="section-header">
          <i class="ri-information-line"></i>
          <h2>{{ $t('research.audit.sections.basicInfo') }}</h2>
        </div>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">{{ $t('research.enterprise.form.enterpriseName') }}</span>
            <span class="value">{{ currentEnterprise.enterpriseName }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.enterprise.form.unifiedSocialCreditCode') }}</span>
            <span class="value">{{ currentEnterprise.unifiedSocialCreditCode }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.audit.columns.seedLicenseNo') }}</span>
            <span class="value">{{ currentEnterprise.seedLicenseNo }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.enterprise.form.enterpriseType') }}</span>
            <span class="value">{{ getTypeLabel(currentEnterprise.enterpriseType) }}</span>
          </div>
        </div>
      </div>

      <!-- 企业额外信息 -->
      <div class="info-section">
        <div class="section-header">
          <i class="ri-file-list-line"></i>
          <h2>{{ $t('research.audit.sections.extraInfo') }}</h2>
        </div>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">{{ $t('research.audit.extraInfo.establishmentDate') }}</span>
            <span class="value">{{ currentEnterprise.establishmentDate }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.audit.extraInfo.legalPersonName') }}</span>
            <span class="value">{{ currentEnterprise.legalPersonName }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.audit.extraInfo.legalPersonId') }}</span>
            <span class="value">{{ currentEnterprise.legalPersonId }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.audit.extraInfo.contactPersonName') }}</span>
            <span class="value">{{ currentEnterprise.contactPerson }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.audit.extraInfo.contactPhone') }}</span>
            <span class="value">{{ currentEnterprise.contactPhone }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.audit.extraInfo.email') }}</span>
            <span class="value">{{ currentEnterprise.email }}</span>
          </div>
        </div>
      </div>

      <!-- 所需文件 -->
      <div class="info-section">
        <div class="section-header">
          <i class="ri-folder-open-line"></i>
          <h2>{{ $t('research.audit.sections.documents') }}</h2>
        </div>
        <div class="documents-grid">
          <div class="document-item">
            <div class="document-icon">
              <i class="ri-file-text-line"></i>
            </div>
            <div class="document-info">
              <div class="document-name">{{ $t('research.audit.documents.businessLicense') }}</div>
              <div class="document-actions">
                <el-button link type="primary" size="small">
                  <i class="ri-eye-line"></i> {{ $t('research.audit.documents.viewDocument') }}
                </el-button>
                <el-button link type="primary" size="small">
                  <i class="ri-download-line"></i> {{ $t('research.audit.documents.download') }}
                </el-button>
              </div>
            </div>
          </div>
          <div class="document-item">
            <div class="document-icon">
              <i class="ri-file-text-line"></i>
            </div>
            <div class="document-info">
              <div class="document-name">{{ $t('research.audit.documents.seedLicense') }}</div>
              <div class="document-actions">
                <el-button link type="primary" size="small">
                  <i class="ri-eye-line"></i> {{ $t('research.audit.documents.viewDocument') }}
                </el-button>
                <el-button link type="primary" size="small">
                  <i class="ri-download-line"></i> {{ $t('research.audit.documents.download') }}
                </el-button>
              </div>
            </div>
          </div>
          <div class="document-item">
            <div class="document-icon">
              <i class="ri-file-text-line"></i>
            </div>
            <div class="document-info">
              <div class="document-name">{{ $t('research.audit.documents.taxRegistration') }}</div>
              <div class="document-actions">
                <el-button link type="primary" size="small">
                  <i class="ri-eye-line"></i> {{ $t('research.audit.documents.viewDocument') }}
                </el-button>
                <el-button link type="primary" size="small">
                  <i class="ri-download-line"></i> {{ $t('research.audit.documents.download') }}
                </el-button>
              </div>
            </div>
          </div>
          <div class="document-item">
            <div class="document-icon">
              <i class="ri-file-text-line"></i>
            </div>
            <div class="document-info">
              <div class="document-name">{{ $t('research.audit.documents.factoryPermit') }}</div>
              <div class="document-actions">
                <el-button link type="primary" size="small">
                  <i class="ri-eye-line"></i> {{ $t('research.audit.documents.viewDocument') }}
                </el-button>
                <el-button link type="primary" size="small">
                  <i class="ri-download-line"></i> {{ $t('research.audit.documents.download') }}
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 审核操作区 - 只在待审核状态显示 -->
      <div v-if="currentEnterprise.auditStatus === 'pending'" class="audit-form-section">
        <div class="section-header">
          <i class="ri-file-edit-line"></i>
          <h2>{{ $t('research.audit.sections.auditOperation') }}</h2>
        </div>
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-position="top"
        >
          <el-form-item
            :label="$t('research.audit.form.auditResult')"
            prop="auditResult"
          >
            <el-radio-group v-model="formData.auditResult">
              <el-radio value="pass">{{ $t('research.audit.result.pass') }}</el-radio>
              <el-radio value="reject">{{ $t('research.audit.result.reject') }}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            :label="$t('research.audit.form.auditOpinion')"
            prop="auditOpinion"
          >
            <el-input
              v-model="formData.auditOpinion"
              type="textarea"
              :rows="4"
              :placeholder="$t('research.audit.placeholder.auditOpinion')"
            />
          </el-form-item>

          <el-form-item
            v-if="formData.auditResult === 'reject'"
            :label="$t('research.audit.form.rejectReason')"
            prop="rejectReason"
          >
            <el-input
              v-model="formData.rejectReason"
              type="textarea"
              :rows="3"
              :placeholder="$t('research.audit.placeholder.rejectReason')"
            />
          </el-form-item>

          <div class="form-actions">
            <el-button @click="handleBackToList">
              {{ $t('common.cancel') }}
            </el-button>
            <el-button type="primary" @click="handleSubmit">
              {{ $t('research.audit.actions.submit') }}
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

const { t } = useI18n()
const router = useRouter()
const formRef = ref(null)

// 视图切换
const showAuditForm = ref(false)
const currentEnterprise = ref({})

// 模拟审核数据
const mockData = ref([
  {
    enterpriseId: 'ENT001',
    enterpriseName: 'Oromia Seeds Production Enterprise',
    unifiedSocialCreditCode: '123456789012345678',
    enterpriseType: 'production',
    seedLicenseNo: 'SL-2024-001',
    applicationDate: '2024-01-15',
    currentStage: 'initial',
    assignedAuditor: 'John Doe',
    auditStatus: 'pending',
    contactPerson: 'Abebe Kebede',
    contactPhone: '+251-911-123456',
    email: 'abebe@example.com',
    establishmentDate: '2020-03-15',
    legalPersonName: 'Abebe Kebede',
    legalPersonId: 'ID123456789'
  },
  {
    enterpriseId: 'ENT002',
    enterpriseName: 'Green Valley Agri Trade',
    unifiedSocialCreditCode: '987654321098765432',
    enterpriseType: 'trade',
    seedLicenseNo: 'SL-2024-002',
    applicationDate: '2024-01-16',
    currentStage: 'final',
    assignedAuditor: 'Jane Smith',
    auditStatus: 'approved',
    contactPerson: 'Tigist Ahmed',
    contactPhone: '+251-922-234567',
    email: 'tigist@example.com',
    establishmentDate: '2019-06-20',
    legalPersonName: 'Tigist Ahmed',
    legalPersonId: 'ID987654321'
  },
  {
    enterpriseId: 'ENT003',
    enterpriseName: 'Ethiopian Hybrid Seeds Ltd',
    unifiedSocialCreditCode: '456789012345678901',
    enterpriseType: 'integrated',
    seedLicenseNo: 'SL-2024-003',
    applicationDate: '2024-01-17',
    currentStage: 'recheck',
    assignedAuditor: 'Mike Wilson',
    auditStatus: 'pending',
    contactPerson: 'Alemayehu Desta',
    contactPhone: '+251-933-345678',
    email: 'alemayehu@example.com',
    establishmentDate: '2018-09-10',
    legalPersonName: 'Alemayehu Desta',
    legalPersonId: 'ID456789012'
  },
  {
    enterpriseId: 'ENT004',
    enterpriseName: 'Oromia Quality Seeds Processing',
    unifiedSocialCreditCode: '234567890123456789',
    enterpriseType: 'production',
    seedLicenseNo: 'SL-2024-004',
    applicationDate: '2024-01-18',
    currentStage: 'initial',
    assignedAuditor: 'Sarah Johnson',
    auditStatus: 'rejected',
    contactPerson: 'Mohammed Hassan',
    contactPhone: '+251-944-456789',
    email: 'mohammed@example.com',
    establishmentDate: '2021-01-25',
    legalPersonName: 'Mohammed Hassan',
    legalPersonId: 'ID234567890'
  }
])

// 搜索和筛选
const searchQuery = ref('')
const filterType = ref('')
const filterStatus = ref('')

// 审核表单数据
const formData = reactive({
  auditResult: '',
  auditOpinion: '',
  rejectReason: ''
})

// 表单验证规则
const rules = computed(() => ({
  auditResult: [
    { required: true, message: t('research.audit.rules.auditResultRequired'), trigger: 'change' }
  ],
  auditOpinion: [
    { required: true, message: t('research.audit.rules.auditOpinionRequired'), trigger: 'blur' }
  ],
  rejectReason: [
    {
      validator: (rule, value, callback) => {
        if (formData.auditResult === 'reject' && !value) {
          callback(new Error(t('research.audit.rules.rejectReasonRequired')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}))

// 筛选后的列表
const filteredList = computed(() => {
  let list = mockData.value

  // 关键词搜索
  if (searchQuery.value) {
    const keyword = searchQuery.value.toLowerCase()
    list = list.filter(item =>
      item.enterpriseName.toLowerCase().includes(keyword) ||
      item.unifiedSocialCreditCode.includes(keyword) ||
      item.seedLicenseNo.includes(keyword)
    )
  }

  // 类型筛选
  if (filterType.value) {
    list = list.filter(item => item.enterpriseType === filterType.value)
  }

  // 状态筛选
  if (filterStatus.value) {
    list = list.filter(item => item.auditStatus === filterStatus.value)
  }

  return list
})

// 获取类型标签文本
const getTypeLabel = (type) => {
  return t(`research.enterprise.type.${type}`)
}

// 获取审核阶段标签文本
const getStageLabel = (stage) => {
  return t(`research.audit.stage.${stage}`)
}

// 获取审核阶段标签样式
const getStageTagType = (stage) => {
  const stageMap = {
    initial: '',
    recheck: 'warning',
    final: 'success'
  }
  return stageMap[stage] || ''
}

// 获取审核状态标签文本
const getStatusLabel = (status) => {
  return t(`research.audit.status.${status}`)
}

// 获取审核状态标签样式
const getStatusTagType = (status) => {
  const statusMap = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return statusMap[status] || ''
}

// 查看（已审核的企业）
const handleView = (row) => {
  currentEnterprise.value = { ...row }
  showAuditForm.value = true
}

// 审核
const handleAudit = (row) => {
  currentEnterprise.value = { ...row }
  showAuditForm.value = true
  // 重置表单
  formData.auditResult = ''
  formData.auditOpinion = ''
  formData.rejectReason = ''
  formRef.value?.clearValidate()
}

// 返回列表
const handleBackToList = () => {
  showAuditForm.value = false
  currentEnterprise.value = {}
  // 重置表单
  formData.auditResult = ''
  formData.auditOpinion = ''
  formData.rejectReason = ''
  formRef.value?.clearValidate()
}

// 提交审核
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()

    await ElMessageBox.confirm(
      t('research.audit.messages.confirmSubmit'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    // TODO: 调用审核API
    console.log('Submit audit:', {
      enterpriseId: currentEnterprise.value.enterpriseId,
      ...formData
    })

    ElMessage.success(t('research.audit.messages.submitSuccess'))

    // 更新列表中的审核状态
    const index = mockData.value.findIndex(
      item => item.enterpriseId === currentEnterprise.value.enterpriseId
    )
    if (index !== -1) {
      mockData.value[index].auditStatus = formData.auditResult === 'pass' ? 'approved' : 'rejected'
    }

    // 返回列表
    setTimeout(() => {
      handleBackToList()
    }, 1500)
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Audit error:', error)
    }
  }
}
</script>

<style scoped>
.enterprise-audit-page {
  min-height: 100%;
  padding: 24px;
}

/* 页面头部 */
.page-header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px;
  background: #fff;
  border-radius: 16px;
  margin-bottom: 24px;
}

.header-icon-wrapper {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #FEDD00 0%, #FFE94D 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(254, 221, 0, 0.2);
  flex-shrink: 0;
}

.header-icon-wrapper i {
  font-size: 40px;
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

/* 详情页返回按钮 */
.detail-header {
  margin-bottom: 24px;
}

/* 搜索区域 */
.search-section {
  display: flex;
  gap: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.filter-select {
  width: 200px;
}

/* 表格区域 */
.table-container {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

/* 移动端卡片 */
.card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.empty-state {
  background: white;
  border-radius: 12px;
  padding: 60px 20px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.empty-state i {
  font-size: 64px;
  color: #dcdfe6;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

.enterprise-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s;
  cursor: pointer;
}

.enterprise-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f2f5;
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
  gap: 12px;
}

.card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.card-row .label {
  font-size: 14px;
  color: #909399;
  flex-shrink: 0;
}

.card-row .value {
  font-size: 14px;
  color: #303133;
  text-align: right;
}

/* 信息区域 */
.info-section,
.audit-form-section {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f2f5;
}

.section-header i {
  font-size: 24px;
  color: #FEDD00;
}

.section-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item .label {
  font-size: 14px;
  color: #909399;
}

.info-item .value {
  font-size: 16px;
  color: #303133;
  font-weight: 500;
}

/* 文件区域 */
.documents-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.document-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #ebeef5;
}

.document-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #FEDD00 0%, #FFE94D 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.document-icon i {
  font-size: 24px;
  color: #303133;
}

.document-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.document-name {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.document-actions {
  display: flex;
  gap: 12px;
}

/* 操作按钮 */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #f0f2f5;
  margin-top: 24px;
}

/* 响应式控制 */
.pc-only {
  display: block;
}

.mobile-only {
  display: none !important;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .enterprise-audit-page {
    padding: 16px;
  }

  .page-header {
    flex-wrap: wrap;
    padding: 24px;
  }

  .header-icon-wrapper {
    width: 64px;
    height: 64px;
  }

  .header-icon-wrapper i {
    font-size: 32px;
  }

  .page-title {
    font-size: 24px;
  }

  .page-subtitle {
    font-size: 14px;
  }

  .search-section {
    padding: 16px;
  }

  .search-input,
  .filter-select {
    width: 100%;
  }

  .info-section,
  .audit-form-section {
    padding: 20px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .documents-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions .el-button {
    width: 100%;
  }

  /* 移动端显示卡片 */
  .pc-only {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
  }
}

@media screen and (max-width: 480px) {
  .enterprise-audit-page {
    padding: 12px;
  }

  .page-header {
    padding: 16px;
  }

  .search-section {
    padding: 12px;
  }

  .info-section,
  .audit-form-section {
    padding: 16px;
  }
}
</style>
