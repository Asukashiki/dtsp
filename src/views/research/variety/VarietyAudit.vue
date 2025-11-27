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
      <!-- PC端表格 -->
      <div class="table-container pc-only">
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
          <el-table-column :label="$t('research.variety.audit.columns.actions')" width="160" fixed="right" align="center">
            <template #default="{ row }">
              <div class="action-buttons">
                <el-button
                  v-if="row.auditStatus === 'pending'"
                  type="primary"
                  link
                  @click="handleAudit(row)"
                >
                  <i class="ri-file-edit-line"></i>
                  {{ $t('research.variety.audit.actions.audit') }}
                </el-button>
                <el-button
                  v-else
                  type="primary"
                  link
                  @click="handleView(row)"
                >
                  <i class="ri-eye-line"></i>
                  {{ $t('common.view') }}
                </el-button>
              </div>
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

        <!-- 移动端分页 -->
        <div class="pagination-wrapper mobile-pagination">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50]"
            :total="total"
            layout="total, prev, pager, next"
            small
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
          />
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

      <!-- 详情内容区域 - 添加滚动条 -->
      <div class="detail-content-scrollable">
        <!-- 品种基础信息 -->
        <div class="info-section">
          <div class="section-header">
            <i class="ri-information-line"></i>
            <h2>{{ $t('research.variety.audit.sections.basicInfo') }}</h2>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('research.variety.audit.columns.applicationNo') }}</span>
              <span class="value">{{ currentVariety.applicationNo || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.varietyName') }}</span>
              <span class="value">{{ currentVariety.varietyName || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.varietyCode') }}</span>
              <span class="value">{{ currentVariety.varietyCode || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.cropType') }}</span>
              <span class="value">{{ currentVariety.cropType || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.audit.columns.submittingUnit') }}</span>
              <span class="value">{{ currentVariety.submittingUnit || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.audit.columns.submitDate') }}</span>
              <span class="value">{{ currentVariety.submitDate || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 品种标识信息 -->
        <div class="info-section">
          <div class="section-header">
            <i class="ri-plant-line"></i>
            <h2>{{ $t('research.variety.registration.sections.identificationInfo') }}</h2>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.species') }}</span>
              <span class="value">{{ currentVariety.species || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.genus') }}</span>
              <span class="value">{{ currentVariety.genus || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.family') }}</span>
              <span class="value">{{ currentVariety.family || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.breedingMethod') }}</span>
              <span class="value">{{ currentVariety.breedingMethod || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.cultivationYear') }}</span>
              <span class="value">{{ formatYear(currentVariety.cultivationYear) }}</span>
            </div>
            <div class="info-item full-width">
              <span class="label">{{ $t('research.variety.registration.form.methodPedigree') }}</span>
              <span class="value">{{ currentVariety.methodPedigree || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 技术性状信息 -->
        <div class="info-section">
          <div class="section-header">
            <i class="ri-flask-line"></i>
            <h2>{{ $t('research.variety.registration.sections.technicalInfo') }}</h2>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.yieldPotential') }}</span>
              <span class="value">
                {{ currentVariety.minYieldPotential || '-' }} - {{ currentVariety.maxYieldPotential || '-' }} kg/ha
              </span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.growthPeriod') }}</span>
              <span class="value">{{ currentVariety.growthPeriod ? currentVariety.growthPeriod + ' ' + $t('research.variety.registration.placeholder.days') : '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.plantHeight') }}</span>
              <span class="value">{{ currentVariety.plantHeight ? currentVariety.plantHeight + ' cm' : '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.grainQuality') }}</span>
              <span class="value">{{ currentVariety.grainQuality || '-' }}</span>
            </div>
            <div class="info-item full-width">
              <span class="label">{{ $t('research.variety.registration.form.diseaseResistance') }}</span>
              <span class="value">{{ currentVariety.diseaseResistance || '-' }}</span>
            </div>
            <div class="info-item full-width">
              <span class="label">{{ $t('research.variety.registration.form.stressResistance') }}</span>
              <span class="value">{{ currentVariety.stressResistance || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 试验和性能信息 -->
        <div class="info-section">
          <div class="section-header">
            <i class="ri-line-chart-line"></i>
            <h2>{{ $t('research.variety.registration.sections.trialInfo') }}</h2>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.trialLocation') }}</span>
              <span class="value">{{ currentVariety.trialLocation || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.trialYear') }}</span>
              <span class="value">{{ currentVariety.trialYear || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.averageYield') }}</span>
              <span class="value">{{ currentVariety.averageYield ? currentVariety.averageYield + ' kg/ha' : '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.stabilityScore') }}</span>
              <span class="value">{{ currentVariety.stabilityScore || '-' }}</span>
            </div>
          </div>
          <div v-if="currentVariety.trialReport && currentVariety.trialReport.length > 0" class="file-list">
            <div class="file-list-title">{{ $t('research.variety.registration.form.trialReport') }}</div>
            <div v-for="(file, index) in currentVariety.trialReport" :key="index" class="file-item">
              <i class="ri-file-text-line"></i>
              <span>{{ file.name }}</span>
            </div>
          </div>
          <div v-if="currentVariety.photos && currentVariety.photos.length > 0" class="file-list">
            <div class="file-list-title">{{ $t('research.variety.registration.form.photos') }}</div>
            <div v-for="(file, index) in currentVariety.photos" :key="index" class="file-item">
              <i class="ri-image-line"></i>
              <span>{{ file.name }}</span>
            </div>
          </div>
        </div>

        <!-- 监管信息 -->
        <div class="info-section">
          <div class="section-header">
            <i class="ri-shield-check-line"></i>
            <h2>{{ $t('research.variety.registration.sections.regulatoryInfo') }}</h2>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.approvalDocumentNo') }}</span>
              <span class="value">{{ currentVariety.approvalDocumentNo || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.approvalAgency') }}</span>
              <span class="value">{{ currentVariety.approvalAgency || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.approvalDate') }}</span>
              <span class="value">{{ currentVariety.approvalDate || '-' }}</span>
            </div>
          </div>
          <div v-if="currentVariety.certificationDocument && currentVariety.certificationDocument.length > 0" class="file-list">
            <div class="file-list-title">{{ $t('research.variety.registration.form.certificationDocument') }}</div>
            <div v-for="(file, index) in currentVariety.certificationDocument" :key="index" class="file-item">
              <i class="ri-file-shield-line"></i>
              <span>{{ file.name }}</span>
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

        <!-- 已审核信息显示 -->
        <div v-else class="audit-result-section">
          <div class="section-header">
            <i class="ri-check-double-line"></i>
            <h2>{{ $t('research.variety.audit.sections.auditResult') }}</h2>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('research.variety.audit.form.auditResult') }}</span>
              <span class="value">
                <el-tag :type="getStatusTagType(currentVariety.auditStatus)">
                  {{ getStatusLabel(currentVariety.auditStatus) }}
                </el-tag>
              </span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.audit.columns.auditor') }}</span>
              <span class="value">{{ currentVariety.auditor || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.audit.form.auditTime') }}</span>
              <span class="value">{{ currentVariety.auditTime || '-' }}</span>
            </div>
            <div class="info-item full-width">
              <span class="label">{{ $t('research.variety.audit.form.auditOpinion') }}</span>
              <span class="value">{{ currentVariety.auditOpinion || '-' }}</span>
            </div>
          </div>
        </div>
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

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

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
    auditor: '',
    species: 'Triticum aestivum',
    genus: 'Triticum',
    family: 'Poaceae',
    breedingMethod: 'Crossbreeding',
    cultivationYear: '2023',
    methodPedigree: 'Cross between variety A and variety B, selected for drought tolerance',
    minYieldPotential: 3500,
    maxYieldPotential: 4500,
    diseaseResistance: 'Resistant to rust diseases',
    stressResistance: 'High drought tolerance',
    growthPeriod: 120,
    plantHeight: 90,
    grainQuality: 'High protein content, suitable for bread making',
    trialLocation: 'Oromia Agricultural Research Center',
    trialYear: '2022-2023',
    averageYield: 4200,
    stabilityScore: 8.5,
    trialReport: [{ name: 'Trial_Report_2023.pdf' }],
    photos: [{ name: 'wheat_field.jpg' }, { name: 'grain_quality.jpg' }],
    approvalDocumentNo: 'MoA-2024-001',
    approvalAgency: 'Ministry of Agriculture',
    approvalDate: '2024-01-10',
    certificationDocument: [{ name: 'Certification_2024.pdf' }]
  },
  {
    applicationNo: 'VR-2024-002',
    varietyName: 'High-Yield Maize-A',
    varietyCode: 'HYM-A',
    cropType: 'Maize',
    submittingUnit: 'Green Valley Agri Trade',
    submitDate: '2024-01-16',
    auditStatus: 'approved',
    auditor: 'John Doe',
    auditTime: '2024-01-20 14:30',
    auditOpinion: 'All documentation is complete and meets the requirements. Approved for release.',
    species: 'Zea mays',
    genus: 'Zea',
    family: 'Poaceae',
    breedingMethod: 'Hybridization',
    cultivationYear: '2022',
    methodPedigree: 'Hybrid of inbred lines X123 and Y456',
    minYieldPotential: 6000,
    maxYieldPotential: 8000,
    diseaseResistance: 'Resistant to common leaf blight',
    stressResistance: 'Moderate drought tolerance',
    growthPeriod: 135,
    plantHeight: 220,
    grainQuality: 'Yellow dent corn, high starch content',
    trialLocation: 'Multiple locations across Oromia',
    trialYear: '2022-2023',
    averageYield: 7200,
    stabilityScore: 9.0,
    trialReport: [{ name: 'Maize_Trial_2023.pdf' }],
    photos: [{ name: 'maize_plant.jpg' }],
    approvalDocumentNo: 'MoA-2024-002',
    approvalAgency: 'Ministry of Agriculture',
    approvalDate: '2024-01-12',
    certificationDocument: [{ name: 'Maize_Cert.pdf' }]
  },
  {
    applicationNo: 'VR-2024-003',
    varietyName: 'Drought-Resistant Barley',
    varietyCode: 'DRB-01',
    cropType: 'Barley',
    submittingUnit: 'Ethiopian Hybrid Seeds Ltd',
    submitDate: '2024-01-17',
    auditStatus: 'rejected',
    auditor: 'Jane Smith',
    auditTime: '2024-01-22 10:15',
    auditOpinion: 'Trial data is insufficient. Please conduct additional trials in more diverse locations.',
    species: 'Hordeum vulgare',
    genus: 'Hordeum',
    family: 'Poaceae',
    breedingMethod: 'Selection',
    cultivationYear: '2023',
    methodPedigree: 'Selected from local landrace populations',
    minYieldPotential: 2000,
    maxYieldPotential: 3000,
    diseaseResistance: 'Moderate resistance to powdery mildew',
    stressResistance: 'Excellent drought tolerance',
    growthPeriod: 90,
    plantHeight: 70,
    grainQuality: 'Suitable for malt production',
    trialLocation: 'Single site trial',
    trialYear: '2023',
    averageYield: 2500,
    stabilityScore: 6.5,
    trialReport: [{ name: 'Barley_Trial_2023.pdf' }],
    photos: [{ name: 'barley_field.jpg' }],
    approvalDocumentNo: '',
    approvalAgency: 'Ministry of Agriculture',
    approvalDate: '',
    certificationDocument: []
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

  total.value = list.length

  // 分页
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return list.slice(start, end)
})

// 处理页码变化
const handlePageChange = (page) => {
  currentPage.value = page
}

// 处理每页条数变化
const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
}

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

// 格式化年份
const formatYear = (year) => {
  if (!year) return '-'
  return year
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
      mockData.value[index].auditor = 'Current User' // TODO: 从用户store获取
      mockData.value[index].auditTime = new Date().toLocaleString('zh-CN')
      mockData.value[index].auditOpinion = formData.auditOpinion
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
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
  margin-bottom: 24px;
}

.header-icon-wrapper {
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

.header-icon-wrapper i {
  font-size: 40px;
  color: #fff;
}

.header-text {
  flex: 1;
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

/* 审核详情区域 */
.audit-detail-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

/* 详情页返回按钮 */
.detail-header {
  margin-bottom: 24px;
}

.detail-content-scrollable {
  max-height: calc(100vh - 320px);
  overflow-y: auto;
  padding-right: 12px;
}

.detail-content-scrollable::-webkit-scrollbar {
  width: 8px;
}

.detail-content-scrollable::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.detail-content-scrollable::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.detail-content-scrollable::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 搜索区域 */
.search-section {
  display: flex;
  gap: 16px;
  padding: 20px;
  /* background: white; */
  /* border-radius: 12px; */
  /* box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04); */
  flex-wrap: wrap;
  margin-bottom: 24px;
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

/* 操作按钮容器 */
.action-buttons {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.action-buttons .el-button {
  margin: 0;
}

/* 分页 */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e8f5e9;
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
.audit-form-section,
.audit-result-section {
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
  font-weight: 700;
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
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-item .label {
  font-size: 14px;
  color: #909399;
  font-weight: 600;
}

.info-item .value {
  font-size: 15px;
  color: #303133;
}

/* 文件列表 */
.file-list {
  margin-top: 24px;
}

.file-list-title {
  font-size: 14px;
  color: #909399;
  font-weight: 600;
  margin-bottom: 12px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 8px;
  margin-bottom: 8px;
}

.file-item i {
  font-size: 18px;
  color: #009A44;
}

.file-item span {
  font-size: 14px;
  color: #303133;
}

/* 操作按钮 */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 24px;
  padding-bottom: 24px;
  border-top: 1px solid #f0f2f5;
  margin-top: 24px;
  margin-bottom: 24px;
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
    flex-direction: column;
    padding: 24px;
    gap: 16px;
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
  .audit-form-section,
  .audit-result-section {
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
