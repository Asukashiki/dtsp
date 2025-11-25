<template>
  <div class="variety-registration-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon-wrapper">
        <i class="ri-plant-line"></i>
      </div>
      <div class="header-text">
        <h1 class="page-title">{{ $t('research.variety.registration.title') }}</h1>
        <p class="page-subtitle">{{ $t('research.variety.registration.subtitle') }}</p>
      </div>
      <div class="header-actions">
        <el-button type="primary" @click="handleAdd">
          <i class="ri-add-line"></i>
          <span>{{ $t('research.variety.registration.add') }}</span>
        </el-button>
      </div>
    </div>

    <!-- 列表视图 -->
    <div v-if="!showForm" class="list-section">
      <!-- 搜索筛选区 -->
      <div class="search-section">
        <el-input
          v-model="searchQuery"
          :placeholder="$t('research.variety.registration.searchPlaceholder')"
          clearable
          class="search-input"
        >
          <template #prefix>
            <i class="ri-search-line"></i>
          </template>
        </el-input>
        <el-select
          v-model="filterCrop"
          :placeholder="$t('research.variety.registration.filterByCrop')"
          clearable
          class="filter-select"
        >
          <el-option :label="$t('research.variety.registration.allCrops')" value="" />
          <el-option label="Wheat" value="wheat" />
          <el-option label="Maize" value="maize" />
          <el-option label="Barley" value="barley" />
        </el-select>
        <el-select
          v-model="filterStatus"
          :placeholder="$t('research.variety.registration.filterByStatus')"
          clearable
          class="filter-select"
        >
          <el-option :label="$t('research.variety.registration.allStatus')" value="" />
          <el-option :label="$t('research.variety.registration.status.draft')" value="draft" />
          <el-option :label="$t('research.variety.registration.status.pending')" value="pending" />
          <el-option :label="$t('research.variety.registration.status.approved')" value="approved" />
          <el-option :label="$t('research.variety.registration.status.published')" value="published" />
          <el-option :label="$t('research.variety.registration.status.rejected')" value="rejected" />
        </el-select>
      </div>

      <!-- PC端表格 -->
      <div class="table-container pc-only">
        <el-table :data="filteredList" stripe style="width: 100%" :empty-text="$t('home.noData')">
          <el-table-column prop="registrationNo" :label="$t('research.variety.registration.columns.registrationNo')" min-width="150" />
          <el-table-column prop="varietyName" :label="$t('research.variety.registration.columns.varietyName')" min-width="150" />
          <el-table-column prop="varietyCode" :label="$t('research.variety.registration.columns.varietyCode')" width="120" />
          <el-table-column prop="cropType" :label="$t('research.variety.registration.columns.cropType')" width="120" />
          <el-table-column prop="submittingUnit" :label="$t('research.variety.registration.columns.submittingUnit')" min-width="180" />
          <el-table-column prop="submitDate" :label="$t('research.variety.registration.columns.submitDate')" width="120" />
          <el-table-column prop="registrationStatus" :label="$t('research.variety.registration.columns.registrationStatus')" width="120">
            <template #default="{ row }">
              <el-tag :type="getStatusTagType(row.registrationStatus)">
                {{ getStatusLabel(row.registrationStatus) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('research.variety.registration.columns.actions')" width="180" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleView(row)">
                <i class="ri-eye-line"></i>
              </el-button>
              <el-button v-if="row.registrationStatus === 'draft' || row.registrationStatus === 'rejected'" link type="primary" @click="handleEdit(row)">
                <i class="ri-edit-line"></i>
              </el-button>
              <el-button v-if="row.registrationStatus === 'draft'" link type="danger" @click="handleDelete(row)">
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
        <div v-for="item in filteredList" :key="item.registrationNo" class="variety-card" @click="handleView(item)">
          <div class="card-header">
            <div class="variety-name">{{ item.varietyName }}</div>
            <el-tag :type="getStatusTagType(item.registrationStatus)" size="small">
              {{ getStatusLabel(item.registrationStatus) }}
            </el-tag>
          </div>
          <div class="card-body">
            <div class="card-row">
              <span class="label">{{ $t('research.variety.registration.columns.varietyCode') }}:</span>
              <span class="value">{{ item.varietyCode }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.variety.registration.columns.cropType') }}:</span>
              <span class="value">{{ item.cropType }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.variety.registration.columns.submitDate') }}:</span>
              <span class="value">{{ item.submitDate }}</span>
            </div>
          </div>
          <div class="card-actions" @click.stop>
            <el-button v-if="item.registrationStatus === 'draft' || item.registrationStatus === 'rejected'" link type="primary" size="small" @click="handleEdit(item)">
              <i class="ri-edit-line"></i> {{ $t('common.edit') }}
            </el-button>
            <el-button v-if="item.registrationStatus === 'draft'" link type="danger" size="small" @click="handleDelete(item)">
              <i class="ri-delete-bin-line"></i> {{ $t('common.delete') }}
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 表单视图 -->
    <div v-else class="form-section">
      <div class="form-header">
        <el-button @click="handleCancelForm">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
      </div>

      <el-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="variety-form">
        <!-- 备案实体信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-building-2-line"></i>
            <h3>{{ $t('research.variety.registration.sections.enterpriseInfo') }}</h3>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('research.enterprise.form.enterpriseName') }}</span>
              <span class="value">{{ enterpriseInfo.enterpriseName }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.enterprise.form.enterpriseId') }}</span>
              <span class="value">{{ enterpriseInfo.enterpriseId }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.enterprise.form.unifiedSocialCreditCode') }}</span>
              <span class="value">{{ enterpriseInfo.unifiedSocialCreditCode }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.enterprise.form.seedLicenseNo') }}</span>
              <span class="value">{{ enterpriseInfo.seedLicenseNo }}</span>
            </div>
          </div>
        </div>

        <!-- 品种标识信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-seedling-line"></i>
            <h3>{{ $t('research.variety.registration.sections.identificationInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('research.variety.registration.form.varietyName')" prop="varietyName">
              <el-input v-model="formData.varietyName" :placeholder="$t('research.variety.registration.placeholder.varietyName')" clearable />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.varietyCode')" prop="varietyCode">
              <el-input v-model="formData.varietyCode" :placeholder="$t('research.variety.registration.placeholder.varietyCode')" clearable />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.cropType')" prop="cropType">
              <el-select v-model="formData.cropType" :placeholder="$t('research.variety.registration.placeholder.cropType')" class="full-width">
                <el-option label="Wheat" value="wheat" />
                <el-option label="Maize" value="maize" />
                <el-option label="Barley" value="barley" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.species')" prop="species">
              <el-input v-model="formData.species" :placeholder="$t('research.variety.registration.placeholder.species')" clearable />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.genus')" prop="genus">
              <el-input v-model="formData.genus" :placeholder="$t('research.variety.registration.placeholder.genus')" clearable />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.family')" prop="family">
              <el-input v-model="formData.family" :placeholder="$t('research.variety.registration.placeholder.family')" clearable />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.breedingMethod')" prop="breedingMethod">
              <el-select v-model="formData.breedingMethod" :placeholder="$t('research.variety.registration.placeholder.breedingMethod')" class="full-width">
                <el-option label="Hybrid" value="hybrid" />
                <el-option label="Selection" value="selection" />
                <el-option label="Mutation" value="mutation" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.cultivationYear')" prop="cultivationYear">
              <el-date-picker v-model="formData.cultivationYear" type="year" :placeholder="$t('research.variety.registration.placeholder.cultivationYear')" class="full-width" />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.methodPedigree')" prop="methodPedigree" class="full-width-item">
              <el-input v-model="formData.methodPedigree" :placeholder="$t('research.variety.registration.placeholder.methodPedigree')" type="textarea" :rows="2" />
            </el-form-item>
          </div>
        </div>

        <!-- 技术性状信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-bar-chart-line"></i>
            <h3>{{ $t('research.variety.registration.sections.technicalInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('research.variety.registration.form.minYieldPotential')" prop="minYieldPotential">
              <el-input v-model.number="formData.minYieldPotential" :placeholder="$t('research.variety.registration.placeholder.minYieldPotential')" type="number" />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.maxYieldPotential')" prop="maxYieldPotential">
              <el-input v-model.number="formData.maxYieldPotential" :placeholder="$t('research.variety.registration.placeholder.maxYieldPotential')" type="number" />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.growthPeriod')" prop="growthPeriod">
              <el-input v-model.number="formData.growthPeriod" :placeholder="$t('research.variety.registration.placeholder.growthPeriod')" type="number" />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.plantHeight')" prop="plantHeight">
              <el-input v-model.number="formData.plantHeight" :placeholder="$t('research.variety.registration.placeholder.plantHeight')" type="number" />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.diseaseResistance')" prop="diseaseResistance" class="full-width-item">
              <el-input v-model="formData.diseaseResistance" :placeholder="$t('research.variety.registration.placeholder.diseaseResistance')" type="textarea" :rows="2" />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.stressResistance')" prop="stressResistance" class="full-width-item">
              <el-input v-model="formData.stressResistance" :placeholder="$t('research.variety.registration.placeholder.stressResistance')" type="textarea" :rows="2" />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.grainQuality')" prop="grainQuality" class="full-width-item">
              <el-input v-model="formData.grainQuality" :placeholder="$t('research.variety.registration.placeholder.grainQuality')" type="textarea" :rows="2" />
            </el-form-item>
          </div>
        </div>

        <!-- 试验和性能信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-flask-line"></i>
            <h3>{{ $t('research.variety.registration.sections.trialInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('research.variety.registration.form.trialLocation')" prop="trialLocation">
              <el-input v-model="formData.trialLocation" :placeholder="$t('research.variety.registration.placeholder.trialLocation')" clearable />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.trialYear')" prop="trialYear">
              <el-date-picker v-model="formData.trialYear" type="year" :placeholder="$t('research.variety.registration.placeholder.trialYear')" class="full-width" />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.averageYield')" prop="averageYield">
              <el-input v-model.number="formData.averageYield" :placeholder="$t('research.variety.registration.placeholder.averageYield')" type="number" />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.stabilityScore')" prop="stabilityScore">
              <el-input v-model.number="formData.stabilityScore" :placeholder="$t('research.variety.registration.placeholder.stabilityScore')" type="number" />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.trialReport')" prop="trialReport" class="full-width-item upload-item">
              <el-upload v-model:file-list="formData.trialReport" :auto-upload="false" :limit="5" accept=".pdf,.jpg,.jpeg,.png" list-type="picture-card">
                <i class="ri-upload-2-line"></i>
                <div class="upload-text">{{ $t('common.submit') }}</div>
              </el-upload>
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.photos')" prop="photos" class="full-width-item upload-item">
              <el-upload v-model:file-list="formData.photos" :auto-upload="false" :limit="10" accept=".jpg,.jpeg,.png" list-type="picture-card">
                <i class="ri-upload-2-line"></i>
                <div class="upload-text">{{ $t('common.submit') }}</div>
              </el-upload>
            </el-form-item>
          </div>
        </div>

        <!-- 监管信息 -->
        <div class="form-block">
          <div class="block-header">
            <i class="ri-shield-check-line"></i>
            <h3>{{ $t('research.variety.registration.sections.regulatoryInfo') }}</h3>
          </div>
          <div class="form-grid">
            <el-form-item :label="$t('research.variety.registration.form.approvalDocumentNo')" prop="approvalDocumentNo">
              <el-input v-model="formData.approvalDocumentNo" :placeholder="$t('research.variety.registration.placeholder.approvalDocumentNo')" clearable />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.approvalAgency')" prop="approvalAgency">
              <el-input v-model="formData.approvalAgency" :placeholder="$t('research.variety.registration.placeholder.approvalAgency')" clearable />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.approvalDate')" prop="approvalDate">
              <el-date-picker v-model="formData.approvalDate" type="date" :placeholder="$t('research.variety.registration.placeholder.approvalDate')" class="full-width" />
            </el-form-item>
            <el-form-item :label="$t('research.variety.registration.form.certificationDocument')" prop="certificationDocument" class="upload-item">
              <el-upload v-model:file-list="formData.certificationDocument" :auto-upload="false" :limit="5" accept=".pdf,.jpg,.jpeg,.png" list-type="picture-card">
                <i class="ri-upload-2-line"></i>
                <div class="upload-text">{{ $t('common.submit') }}</div>
              </el-upload>
            </el-form-item>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button @click="handleReset">{{ $t('common.reset') }}</el-button>
          <el-button @click="handleSaveDraft">{{ $t('research.variety.registration.actions.saveDraft') }}</el-button>
          <el-button type="primary" @click="handleSubmit">{{ $t('research.variety.registration.actions.submit') }}</el-button>
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

// 视图切换
const showForm = ref(false)
const isEdit = ref(false)

// 搜索和筛选
const searchQuery = ref('')
const filterCrop = ref('')
const filterStatus = ref('')

// 模拟企业信息
const enterpriseInfo = reactive({
  enterpriseName: 'Oromia Seeds Production Enterprise',
  enterpriseId: 'ENT001',
  unifiedSocialCreditCode: '123456789012345678',
  seedLicenseNo: 'SL-2024-001'
})

// 模拟数据
const mockData = ref([
  {
    registrationNo: 'VR-2024-001',
    varietyName: 'Oromia Wheat-1',
    varietyCode: 'OW-001',
    cropType: 'wheat',
    submittingUnit: 'Oromia Seeds Production Enterprise',
    submitDate: '2024-01-15',
    registrationStatus: 'approved'
  },
  {
    registrationNo: 'VR-2024-002',
    varietyName: 'High-Yield Maize-A',
    varietyCode: 'HYM-A',
    cropType: 'maize',
    submittingUnit: 'Green Valley Agri Trade',
    submitDate: '2024-01-16',
    registrationStatus: 'pending'
  },
  {
    registrationNo: 'VR-2024-003',
    varietyName: 'Drought-Resistant Barley',
    varietyCode: 'DRB-01',
    cropType: 'barley',
    submittingUnit: 'Ethiopian Hybrid Seeds Ltd',
    submitDate: '2024-01-17',
    registrationStatus: 'draft'
  }
])

// 表单数据
const formData = reactive({
  varietyName: '',
  varietyCode: '',
  cropType: '',
  species: '',
  genus: '',
  family: '',
  breedingMethod: '',
  methodPedigree: '',
  cultivationYear: '',
  minYieldPotential: null,
  maxYieldPotential: null,
  diseaseResistance: '',
  stressResistance: '',
  growthPeriod: null,
  plantHeight: null,
  grainQuality: '',
  trialLocation: '',
  trialYear: '',
  averageYield: null,
  stabilityScore: null,
  trialReport: [],
  photos: [],
  approvalDocumentNo: '',
  approvalAgency: '',
  approvalDate: '',
  certificationDocument: []
})

// 表单验证规则
const rules = computed(() => ({
  varietyName: [{ required: true, message: t('research.variety.registration.rules.varietyNameRequired'), trigger: 'blur' }],
  varietyCode: [{ required: true, message: t('research.variety.registration.rules.varietyCodeRequired'), trigger: 'blur' }],
  cropType: [{ required: true, message: t('research.variety.registration.rules.cropTypeRequired'), trigger: 'change' }],
  species: [{ required: true, message: t('research.variety.registration.rules.speciesRequired'), trigger: 'blur' }],
  breedingMethod: [{ required: true, message: t('research.variety.registration.rules.breedingMethodRequired'), trigger: 'change' }],
  cultivationYear: [{ required: true, message: t('research.variety.registration.rules.cultivationYearRequired'), trigger: 'change' }]
}))

// 筛选后的列表
const filteredList = computed(() => {
  let list = mockData.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    list = list.filter(item =>
      item.varietyName.toLowerCase().includes(query) ||
      item.varietyCode.toLowerCase().includes(query) ||
      item.cropType.toLowerCase().includes(query)
    )
  }

  if (filterCrop.value) {
    list = list.filter(item => item.cropType === filterCrop.value)
  }

  if (filterStatus.value) {
    list = list.filter(item => item.registrationStatus === filterStatus.value)
  }

  return list
})

// 获取状态标签样式
const getStatusTagType = (status) => {
  const tagMap = {
    draft: 'info',
    pending: 'warning',
    approved: 'success',
    published: '',
    rejected: 'danger'
  }
  return tagMap[status] || 'info'
}

// 获取状态标签文本
const getStatusLabel = (status) => {
  return t(`research.variety.registration.status.${status}`)
}

// 新增
const handleAdd = () => {
  isEdit.value = false
  showForm.value = true
}

// 查看
const handleView = (row) => {
  console.log('View:', row)
  // TODO: 实现查看详情逻辑
}

// 编辑
const handleEdit = (row) => {
  console.log('Edit:', row)
  isEdit.value = true
  showForm.value = true
  // TODO: 加载数据到表单
}

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm(
    t('research.variety.registration.messages.deleteConfirm'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(() => {
    // TODO: 调用删除API
    ElMessage.success(t('research.variety.registration.messages.deleteSuccess'))
  })
}

// 取消表单
const handleCancelForm = () => {
  showForm.value = false
  isEdit.value = false
  formRef.value?.resetFields()
}

// 重置表单
const handleReset = () => {
  formRef.value?.resetFields()
}

// 保存草稿
const handleSaveDraft = async () => {
  try {
    // TODO: 调用保存草稿API
    console.log('Save draft:', formData)
    ElMessage.success(t('research.variety.registration.messages.saveDraftSuccess'))
  } catch (error) {
    ElMessage.error(t('common.failed'))
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    // TODO: 调用提交API
    console.log('Submit form:', formData)
    ElMessage.success(t('research.variety.registration.messages.submitSuccess'))
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
.variety-registration-page {
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

/* 列表区域 */
.list-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

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

.table-container {
  overflow: auto;
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
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
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
  border-bottom: 1px solid #e4e7ed;
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
  margin-bottom: 12px;
}

.card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.card-row .label {
  color: #909399;
  flex-shrink: 0;
}

.card-row .value {
  color: #303133;
  text-align: right;
}

.card-actions {
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #e4e7ed;
}

/* 表单区域 */
.form-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
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
  color: #009A44;
}

.block-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 20px;
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

.upload-item {
  grid-column: 1 / -1;
}

.upload-text {
  margin-top: 8px;
  font-size: 12px;
  color: #606266;
}

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
@media screen and (max-width: 1024px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 768px) {
  .variety-registration-page {
    padding: 16px;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
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
    width: 100%;
  }

  .pc-only {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions .el-button {
    width: 100%;
  }
}
</style>
