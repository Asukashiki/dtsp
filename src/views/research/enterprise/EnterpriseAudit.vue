<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-icon">
          <i class="ri-checkbox-circle-line"></i>
        </div>
        <div class="header-content">
          <h1 class="page-title">{{ $t('research.audit.title') }}</h1>
          <p class="page-subtitle">{{ $t('research.audit.subtitle') }}</p>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 列表视图 -->
        <div v-if="!showDetail" class="list-view">
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-list-3-line"></i>
                <span>{{ $t('research.audit.taskList') }}</span>
              </div>
            </div>
            <div class="card-body">
              <!-- 搜索筛选区 -->
              <div class="search-section">
                <el-input
                  v-model="searchQuery"
                  :placeholder="$t('research.audit.search.placeholder')"
                  clearable
                  class="search-input"
                >
                  <template #prefix>
                    <i class="ri-search-line"></i>
                  </template>
                </el-input>
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

              <!-- 表格 -->
              <div class="table-wrapper">
                <el-table
                  :data="filteredList"
                  style="width: 100%"
                  v-loading="loading"
                >
                  <el-table-column
                    prop="enterpriseName"
                    :label="$t('research.audit.columns.enterpriseName')"
                    min-width="200"
                  />
                  <el-table-column
                    prop="unifiedSocialCreditCode"
                    :label="$t('research.audit.columns.unifiedSocialCreditCode')"
                    min-width="180"
                  />
                  <el-table-column
                    prop="seedLicenseNo"
                    :label="$t('research.audit.columns.seedLicenseNo')"
                    min-width="160"
                  />
                  <el-table-column
                    prop="applicationDate"
                    :label="$t('research.audit.columns.applicationDate')"
                    width="120"
                  >
                    <template #default="{ row }">
                      {{ row.createTime }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="auditStage"
                    :label="$t('research.audit.columns.currentStage')"
                    width="120"
                  >
                    <template #default="{ row }">
                      <el-tag :type="getStageTagType(row.auditStage)" size="small">
                        {{ getStageLabel(row.auditStage) }}
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="assignedAuditor"
                    :label="$t('research.audit.columns.assignedAuditor')"
                    width="120"
                  />
                  <el-table-column
                    prop="auditResult"
                    :label="$t('research.audit.columns.auditStatus')"
                    width="120"
                  >
                    <template #default="{ row }">
                      <el-tag :type="getStatusTagType(row.auditStatus)">
                        {{ getStatusLabel(row.auditStatus) }}
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('research.audit.columns.actions')"
                    width="150"
                    fixed="right"
                  >
                    <template #default="{ row }">
                      <el-button
                        v-if="row.auditStatus === 'pending'"
                        type="primary"
                        link
                        @click="handleAudit(row)"
                      >
                        <i class="ri-file-edit-line"></i>
                        {{ $t('research.audit.actions.audit') }}
                      </el-button>
                      <el-button
                        v-else
                        type="primary"
                        link
                        @click="handleView(row)"
                      >
                        <i class="ri-eye-line"></i>
                        {{ $t('common.viewDetails') }}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>

                <!-- 分页 -->
                <div class="pagination-wrapper">
                  <el-pagination
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-sizes="[10, 20, 50, 100]"
                    :total="total"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handlePageChange"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 详情视图 -->
        <div v-else class="detail-view">
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-text-line"></i>
                <span>{{ $t('research.audit.detailTitle') }}</span>
              </div>
              <el-button @click="handleBack">
                <i class="ri-arrow-left-line"></i>
                {{ $t('research.audit.actions.backToList') }}
              </el-button>
            </div>
            <div class="card-body detail-body-scrollable">
              <!-- 企业基础信息 -->
              <div class="detail-section">
                <div class="section-header">
                  <i class="ri-building-2-line"></i>
                  <h3>{{ $t('research.audit.sections.basicInfo') }}</h3>
                </div>
                <div class="detail-grid">
                  <div class="detail-item">
                    <span class="item-label">{{ $t('research.enterprise.form.enterpriseName') }}</span>
                    <span class="item-value">{{ currentEnterprise.enterpriseName }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="item-label">{{ $t('research.enterprise.form.unifiedSocialCreditCode') }}</span>
                    <span class="item-value">{{ currentEnterprise.unifiedSocialCreditCode }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="item-label">{{ $t('research.audit.columns.seedLicenseNo') }}</span>
                    <span class="item-value">{{ currentEnterprise.seedLicenseNo }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="item-label">{{ $t('research.enterprise.form.enterpriseType') }}</span>
                    <span class="item-value">{{ getTypeLabel(currentEnterprise.enterpriseType) }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="item-label">{{ $t('research.enterprise.form.licenseStartDate') }}</span>
                    <span class="item-value">{{ formatDate(currentEnterprise.licenseStartDate) }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="item-label">{{ $t('research.enterprise.form.licenseEndDate') }}</span>
                    <span class="item-value">{{ formatDate(currentEnterprise.licenseEndDate) }}</span>
                  </div>
                  <div class="detail-item full-width">
                    <span class="item-label">{{ $t('research.enterprise.form.detailedAddress') }}</span>
                    <span class="item-value">{{ currentEnterprise.detailedAddress }}</span>
                  </div>
                  <div class="detail-item full-width">
                    <span class="item-label">{{ $t('research.enterprise.form.businessScope') }}</span>
                    <span class="item-value">{{ currentEnterprise.businessScope }}</span>
                  </div>
                </div>
              </div>

              <!-- 企业额外信息 -->
              <div class="detail-section">
                <div class="section-header">
                  <i class="ri-information-line"></i>
                  <h3>{{ $t('research.audit.sections.extraInfo') }}</h3>
                </div>
                <div class="detail-grid">
                  <div class="detail-item">
                    <span class="item-label">{{ $t('research.audit.extraInfo.establishmentDate') }}</span>
                    <span class="item-value">{{ formatDate(currentEnterprise.establishmentDate) }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="item-label">{{ $t('research.audit.extraInfo.legalPersonName') }}</span>
                    <span class="item-value">{{ currentEnterprise.legalPersonName }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="item-label">{{ $t('research.audit.extraInfo.legalPersonId') }}</span>
                    <span class="item-value">{{ currentEnterprise.legalPersonId }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="item-label">{{ $t('research.audit.extraInfo.contactPersonName') }}</span>
                    <span class="item-value">{{ currentEnterprise.contactPerson }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="item-label">{{ $t('research.audit.extraInfo.contactPhone') }}</span>
                    <span class="item-value">{{ currentEnterprise.contactPhone }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="item-label">{{ $t('research.audit.extraInfo.email') }}</span>
                    <span class="item-value">{{ currentEnterprise.email || '-' }}</span>
                  </div>
                </div>
              </div>

              <!-- 所需文件 -->
              <div class="detail-section">
                <div class="section-header">
                  <i class="ri-folder-open-line"></i>
                  <h3>{{ $t('research.audit.sections.documents') }}</h3>
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
              <div v-if="currentEnterprise.auditStatus === 'pending'" class="audit-section">
                <div class="section-header">
                  <i class="ri-file-edit-line"></i>
                  <h3>{{ $t('research.audit.sections.auditOperation') }}</h3>
                </div>
                <el-form
                  ref="formRef"
                  :model="formData"
                  :rules="rules"
                  label-position="top"
                  class="audit-form"
                >
                  <el-row :gutter="24">
                    <el-col :span="24">
                      <el-form-item
                        :label="$t('research.audit.form.auditResult')"
                        prop="auditResult"
                      >
                        <el-radio-group v-model="formData.auditResult" size="large">
                          <el-radio value="pass">
                            <i class="ri-checkbox-circle-line"></i>
                            {{ $t('research.audit.result.pass') }}
                          </el-radio>
                          <el-radio value="reject">
                            <i class="ri-close-circle-line"></i>
                            {{ $t('research.audit.result.reject') }}
                          </el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item
                        :label="$t('research.audit.form.auditOpinion')"
                        prop="auditOpinion"
                      >
                        <el-input
                          v-model="formData.auditOpinion"
                          type="textarea"
                          :rows="4"
                          :placeholder="$t('research.audit.placeholder.auditOpinion')"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col v-if="formData.auditResult === 'reject'" :span="24">
                      <el-form-item
                        :label="$t('research.audit.form.rejectReason')"
                        prop="rejectReason"
                      >
                        <el-input
                          v-model="formData.rejectReason"
                          type="textarea"
                          :rows="3"
                          :placeholder="$t('research.audit.placeholder.rejectReason')"
                          size="large"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <div class="form-actions">
                    <el-button @click="handleBack" size="large">
                      {{ $t('common.cancel') }}
                    </el-button>
                    <el-button
                      type="primary"
                      @click="handleSubmit"
                      :loading="submitLoading"
                      class="submit-btn"
                      size="large"
                    >
                      <i class="ri-send-plane-line"></i>
                      {{ $t('research.audit.actions.submit') }}
                    </el-button>
                  </div>
                </el-form>
              </div>

              <!-- 已审核的审核信息 -->
              <div v-else class="audit-result-section">
                <div class="section-header">
                  <i class="ri-file-check-line"></i>
                  <h3>{{ $t('research.audit.sections.auditOperation') }}</h3>
                </div>
                <div class="detail-grid">
                  <div class="detail-item">
                    <span class="item-label">{{ $t('research.audit.form.auditResult') }}</span>
                    <el-tag :type="currentEnterprise.auditStatus === 'approved' ? 'success' : 'danger'">
                      {{ getStatusLabel(currentEnterprise.auditStatus) }}
                    </el-tag>
                  </div>
                  <div class="detail-item">
                    <span class="item-label">{{ $t('research.audit.form.auditor') }}</span>
                    <span class="item-value">{{ currentEnterprise.auditor || '-' }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="item-label">{{ $t('research.audit.form.auditTime') }}</span>
                    <span class="item-value">{{ formatDate(currentEnterprise.auditTime) }}</span>
                  </div>
                  <div class="detail-item full-width">
                    <span class="item-label">{{ $t('research.audit.form.auditOpinion') }}</span>
                    <span class="item-value">{{ currentEnterprise.auditOpinion || '-' }}</span>
                  </div>
                  <div v-if="currentEnterprise.rejectReason" class="detail-item full-width">
                    <span class="item-label">{{ $t('research.audit.form.rejectReason') }}</span>
                    <span class="item-value">{{ currentEnterprise.rejectReason }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/store'
import { handleEnterpriseAudit, getEnterpriseAuditList } from '@/api/enterprise'

const { t } = useI18n()
const userStore = useUserStore()

// 页面状态
const showDetail = ref(false)
const loading = ref(false)
const submitLoading = ref(false)
const currentEnterprise = ref({})

// 表单引用
const formRef = ref(null)

// 搜索筛选
const searchQuery = ref('')
const filterStatus = ref('')

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 表单数据
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
      validator: (_rule, value, callback) => {
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

// 审核列表数据
const auditList = ref([])

// 状态映射（API 返回的审核状态转换为前端使用的审核状态）
const mapAuditResult = (auditResult) => {
  // 0-待审核, 1-通过, 2-驳回
  const statusMap = { 0: 'pending', 1: 'approved', 2: 'rejected' }
  return statusMap[auditResult] || 'pending'
}

// 筛选后的列表（后端分页，直接返回列表）
const filteredList = computed(() => {
  return auditList.value
})

// 处理页码变化
const handlePageChange = (page) => {
  currentPage.value = page
  loadData()
}

// 处理每页条数变化
const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
  loadData()
}

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

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}

// 查看（已审核的企业）
const handleView = (row) => {
  currentEnterprise.value = { ...row }
  showDetail.value = true
}

// 审核
const handleAudit = (row) => {
  currentEnterprise.value = { ...row }
  showDetail.value = true
  // 重置表单
  formData.auditResult = ''
  formData.auditOpinion = ''
  formData.rejectReason = ''
  formRef.value?.clearValidate()
}

// 返回列表
const handleBack = () => {
  showDetail.value = false
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

    submitLoading.value = true

    try {
      // 构建请求参数，匹配API文档格式
      const requestData = {
        enterpriseId: currentEnterprise.value.enterpriseId,
        auditResult: formData.auditResult === 'pass' ? 1 : 2, // 1-通过/2-驳回
        auditOpinion: formData.auditOpinion,
        auditor: userStore.userInfo?.userName || 'System Admin',
        auditStage: currentEnterprise.value.auditStage,
        auditId: currentEnterprise.value.auditId
      }

      // 驳回时添加驳回原因
      if (formData.auditResult === 'reject') {
        requestData.rejectReason = formData.rejectReason
      }

      const res = await handleEnterpriseAudit(requestData)

      if (res.code === 200) {
        ElMessage.success(t('research.audit.messages.submitSuccess'))

        // 重新加载列表数据
        await loadData()

        // 延迟返回列表
        setTimeout(() => {
          handleBack()
        }, 1000)
      }
    } catch (error) {
      console.error('Audit error:', error)
      ElMessage.error(error.msg || t('research.audit.messages.submitFailed'))
    } finally {
      submitLoading.value = false
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Validation failed:', error)
    }
  }
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      PageNum: currentPage.value,
      PageSize: pageSize.value
    }

    // 添加搜索条件
    if (searchQuery.value) {
      params.enterpriseName = searchQuery.value
    }

    // 添加状态筛选（需要转换为后端审核状态）
    if (filterStatus.value) {
      const statusMap = { pending: 0, approved: 1, rejected: 2 }
      params.auditResult = statusMap[filterStatus.value]
    }

    const res = await getEnterpriseAuditList(params)
    if (res.code === 200 && res.rows) {
      // 转换数据格式，匹配前端展示需求
      auditList.value = (res.rows || []).map(item => ({
        ...item,
        auditStatus: mapAuditResult(item.auditResult)
      }))

      // 设置总数（如果后端返回了total字段）
      if (res.total !== undefined) {
        total.value = res.total
      }
    }
  } catch (error) {
    console.error('Load data error:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 监听搜索和筛选条件变化
watch([searchQuery, filterStatus], () => {
  currentPage.value = 1
  loadData()
})

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.page-container {
  min-height: 100%;
  background: linear-gradient(to bottom, #f8fafb 0%, #ffffff 100%);
}

.page-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

/* 页面头部 */
.page-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
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

/* 内容区域 */
.content-wrapper {
  padding-bottom: 40px;
}

.info-card {
  background: white;
  border-radius: 16px;
  border: 2px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.card-header {
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
  border-bottom: 2px solid rgba(0, 154, 68, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #009A44;
}

.card-title i {
  font-size: 22px;
}

.card-body {
  padding: 24px;
}

.detail-body-scrollable {
  max-height: calc(100vh - 320px);
  overflow-y: auto;
  padding-right: 12px;
}

.detail-body-scrollable::-webkit-scrollbar {
  width: 8px;
}

.detail-body-scrollable::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.detail-body-scrollable::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.detail-body-scrollable::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 搜索区域 */
.search-section {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.filter-select {
  width: 200px;
}

/* 表格 */
.table-wrapper :deep(.el-table) {
  border-radius: 8px;
}

.table-wrapper :deep(.el-table__header th) {
  background-color: rgba(0, 154, 68, 0.05);
  color: #009A44;
  font-weight: 600;
}

/* 分页 */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e8f5e9;
}

/* 详情区域 */
.detail-section,
.audit-section,
.audit-result-section {
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

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-item:last-child {
  border-bottom: none;
}

.item-label {
  font-weight: 600;
  color: #606266;
  font-size: 14px;
}

.item-value {
  color: #303133;
  font-size: 15px;
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

/* 审核表单 */
.audit-form :deep(.el-form-item__label) {
  font-size: 15px;
  font-weight: 600;
  color: #606266;
  padding-bottom: 10px;
}

.audit-form :deep(.el-radio) {
  margin-right: 24px;
  font-size: 15px;
}

.audit-form :deep(.el-radio i) {
  margin-right: 4px;
}

.audit-form :deep(.el-textarea__inner) {
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.audit-form :deep(.el-textarea__inner:hover) {
  border-color: #009A44;
}

.audit-form :deep(.el-textarea__inner:focus) {
  border-color: #009A44;
}

/* 表单操作 */
.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  margin-bottom: 24px;
  padding-top: 24px;
  padding-bottom: 24px;
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
    padding: 24px 20px;
    gap: 16px;
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

  .card-header {
    flex-direction: column;
    gap: 16px;
    padding: 16px 20px;
  }

  .card-header .el-button {
    width: 100%;
  }

  .card-body {
    padding: 16px;
  }

  .search-section {
    flex-direction: column;
  }

  .search-input,
  .filter-select {
    width: 100%;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .documents-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions :deep(.el-button) {
    width: 100%;
  }
}
</style>
