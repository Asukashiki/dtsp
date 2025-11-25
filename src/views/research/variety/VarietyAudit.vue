<template>
  <div class="variety-audit-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon-wrapper">
        <i class="ri-checkbox-circle-line"></i>
      </div>
      <div class="header-text">
        <h1 class="page-title">{{ $t('research.variety.audit.title') }}</h1>
        <p class="page-subtitle">{{ $t('research.variety.audit.subtitle') }}</p>
      </div>
    </div>

    <!-- 列表视图 -->
    <div v-if="!showDetail" class="list-section">
      <!-- 搜索筛选区 -->
      <div class="search-section">
        <el-input
          v-model="searchQuery"
          :placeholder="$t('research.variety.audit.searchPlaceholder')"
          clearable
          class="search-input"
        >
          <template #prefix>
            <i class="ri-search-line"></i>
          </template>
        </el-input>
        <el-select
          v-model="filterStatus"
          :placeholder="$t('research.variety.audit.filterByStatus')"
          clearable
          class="filter-select"
        >
          <el-option :label="$t('research.variety.audit.allStatus')" value="" />
          <el-option :label="$t('research.variety.audit.status.pending')" value="pending" />
          <el-option :label="$t('research.variety.audit.status.approved')" value="approved" />
          <el-option :label="$t('research.variety.audit.status.rejected')" value="rejected" />
        </el-select>
      </div>

      <!-- PC端表格 -->
      <div class="table-container pc-only">
        <el-table :data="filteredList" stripe style="width: 100%" :empty-text="$t('home.noData')">
          <el-table-column prop="applicationNo" :label="$t('research.variety.audit.columns.applicationNo')" min-width="150" />
          <el-table-column prop="varietyName" :label="$t('research.variety.audit.columns.varietyName')" min-width="150" />
          <el-table-column prop="cropType" :label="$t('research.variety.audit.columns.cropType')" width="120" />
          <el-table-column prop="submittingUnit" :label="$t('research.variety.audit.columns.submittingUnit')" min-width="180" />
          <el-table-column prop="submitDate" :label="$t('research.variety.audit.columns.submitDate')" width="120" />
          <el-table-column prop="auditStatus" :label="$t('research.variety.audit.columns.auditStatus')" width="120">
            <template #default="{ row }">
              <el-tag :type="getStatusTagType(row.auditStatus)">
                {{ getStatusLabel(row.auditStatus) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="auditor" :label="$t('research.variety.audit.columns.auditor')" width="120" />
          <el-table-column :label="$t('research.variety.audit.columns.actions')" width="120" fixed="right">
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
        <div v-for="item in filteredList" :key="item.applicationNo" class="variety-card" @click="item.auditStatus === 'pending' ? handleAudit(item) : handleView(item)">
          <div class="card-header">
            <div class="variety-name">{{ item.varietyName }}</div>
            <el-tag :type="getStatusTagType(item.auditStatus)" size="small">
              {{ getStatusLabel(item.auditStatus) }}
            </el-tag>
          </div>
          <div class="card-body">
            <div class="card-row">
              <span class="label">{{ $t('research.variety.audit.columns.cropType') }}:</span>
              <span class="value">{{ item.cropType }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.variety.audit.columns.submittingUnit') }}:</span>
              <span class="value">{{ item.submittingUnit }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.variety.audit.columns.submitDate') }}:</span>
              <span class="value">{{ item.submitDate }}</span>
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
          <span>{{ $t('research.variety.audit.actions.backToList') }}</span>
        </el-button>
      </div>

      <!-- 品种基础信息 -->
      <div class="info-section">
        <div class="section-header">
          <i class="ri-information-line"></i>
          <h2>{{ $t('research.variety.audit.sections.basicInfo') }}</h2>
        </div>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">{{ $t('research.variety.registration.columns.varietyName') }}</span>
            <span class="value">{{ currentVariety.varietyName }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.variety.registration.columns.varietyCode') }}</span>
            <span class="value">{{ currentVariety.varietyCode }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.variety.registration.columns.cropType') }}</span>
            <span class="value">{{ currentVariety.cropType }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.variety.registration.columns.submittingUnit') }}</span>
            <span class="value">{{ currentVariety.submittingUnit }}</span>
          </div>
        </div>
      </div>

      <!-- 审核操作区 - 只在待审核状态显示 -->
      <div v-if="currentVariety.auditStatus === 'pending'" class="audit-form-section">
        <div class="section-header">
          <i class="ri-file-edit-line"></i>
          <h2>{{ $t('research.variety.audit.sections.auditOperation') }}</h2>
        </div>
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-position="top"
        >
          <el-form-item
            :label="$t('research.variety.audit.form.auditResult')"
            prop="auditResult"
          >
            <el-radio-group v-model="formData.auditResult">
              <el-radio value="pass">{{ $t('research.variety.audit.result.pass') }}</el-radio>
              <el-radio value="reject">{{ $t('research.variety.audit.result.reject') }}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            :label="$t('research.variety.audit.form.auditOpinion')"
            prop="auditOpinion"
          >
            <el-input
              v-model="formData.auditOpinion"
              type="textarea"
              :rows="4"
              :placeholder="$t('research.variety.audit.placeholder.auditOpinion')"
            />
          </el-form-item>

          <div class="form-actions">
            <el-button @click="handleBackToList">
              {{ $t('common.cancel') }}
            </el-button>
            <el-button type="primary" @click="handleSubmit">
              {{ $t('research.variety.audit.actions.submit') }}
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
import { ElMessage, ElMessageBox } from 'element-plus'

const { t } = useI18n()
const formRef = ref(null)

// 视图切换
const showDetail = ref(false)
const currentVariety = ref({})

// 搜索和筛选
const searchQuery = ref('')
const filterStatus = ref('')

// 模拟数据
const mockData = ref([
  {
    applicationNo: 'VR-2024-001',
    varietyName: 'Oromia Wheat-1',
    varietyCode: 'OW-001',
    cropType: 'Wheat',
    submittingUnit: 'Oromia Seeds Production Enterprise',
    submitDate: '2024-01-15',
    auditStatus: 'pending',
    auditor: ''
  },
  {
    applicationNo: 'VR-2024-002',
    varietyName: 'High-Yield Maize-A',
    varietyCode: 'HYM-A',
    cropType: 'Maize',
    submittingUnit: 'Green Valley Agri Trade',
    submitDate: '2024-01-16',
    auditStatus: 'approved',
    auditor: 'John Doe'
  },
  {
    applicationNo: 'VR-2024-003',
    varietyName: 'Drought-Resistant Barley',
    varietyCode: 'DRB-01',
    cropType: 'Barley',
    submittingUnit: 'Ethiopian Hybrid Seeds Ltd',
    submitDate: '2024-01-17',
    auditStatus: 'rejected',
    auditor: 'Jane Smith'
  }
])

// 审核表单数据
const formData = reactive({
  auditResult: '',
  auditOpinion: ''
})

// 表单验证规则
const rules = computed(() => ({
  auditResult: [
    { required: true, message: t('research.variety.audit.rules.auditResultRequired'), trigger: 'change' }
  ],
  auditOpinion: [
    { required: true, message: t('research.variety.audit.rules.auditOpinionRequired'), trigger: 'blur' }
  ]
}))

// 筛选后的列表
const filteredList = computed(() => {
  let list = mockData.value

  if (searchQuery.value) {
    const keyword = searchQuery.value.toLowerCase()
    list = list.filter(item =>
      item.varietyName.toLowerCase().includes(keyword) ||
      item.submittingUnit.toLowerCase().includes(keyword)
    )
  }

  if (filterStatus.value) {
    list = list.filter(item => item.auditStatus === filterStatus.value)
  }

  return list
})

// 获取状态标签样式
const getStatusTagType = (status) => {
  const statusMap = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return statusMap[status] || ''
}

// 获取状态标签文本
const getStatusLabel = (status) => {
  return t(`research.variety.audit.status.${status}`)
}

// 查看（已审核的品种）
const handleView = (row) => {
  currentVariety.value = { ...row }
  showDetail.value = true
}

// 审核
const handleAudit = (row) => {
  currentVariety.value = { ...row }
  showDetail.value = true
  // 重置表单
  formData.auditResult = ''
  formData.auditOpinion = ''
  formRef.value?.clearValidate()
}

// 返回列表
const handleBackToList = () => {
  showDetail.value = false
  currentVariety.value = {}
  // 重置表单
  formData.auditResult = ''
  formData.auditOpinion = ''
  formRef.value?.clearValidate()
}

// 提交审核
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()

    await ElMessageBox.confirm(
      t('research.variety.audit.messages.confirmSubmit'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    // TODO: 调用审核API
    console.log('Submit audit:', {
      applicationNo: currentVariety.value.applicationNo,
      ...formData
    })

    ElMessage.success(t('research.variety.audit.messages.submitSuccess'))

    // 更新列表中的审核状态
    const index = mockData.value.findIndex(
      item => item.applicationNo === currentVariety.value.applicationNo
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
.variety-audit-page {
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
  box-shadow: 0 8px 24px rgba(0, 154, 68, 0.2);
  flex-shrink: 0;
}

.header-icon-wrapper i {
  font-size: 40px;
  color: #fff;
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

.variety-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s;
  cursor: pointer;
}

.variety-card:hover {
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

.variety-name {
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
  color: #009A44;
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
  .variety-audit-page {
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
</style>
