<template>
  <div class="variety-publish-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon-wrapper">
        <i class="ri-send-plane-line"></i>
      </div>
      <div class="header-text">
        <h1 class="page-title">{{ $t('research.variety.publish.title') }}</h1>
        <p class="page-subtitle">{{ $t('research.variety.publish.subtitle') }}</p>
      </div>
    </div>

    <!-- 列表视图 -->
    <div v-if="!showDetail" class="list-section">
      <!-- 搜索筛选区 -->
      <div class="search-section">
        <el-input
          v-model="searchQuery"
          :placeholder="$t('research.variety.publish.searchPlaceholder')"
          clearable
          class="search-input"
        >
          <template #prefix>
            <i class="ri-search-line"></i>
          </template>
        </el-input>
        <el-select
          v-model="filterCrop"
          :placeholder="$t('research.variety.publish.filterByCrop')"
          clearable
          class="filter-select"
        >
          <el-option :label="$t('research.variety.publish.allCrops')" value="" />
          <el-option label="Wheat" value="Wheat" />
          <el-option label="Maize" value="Maize" />
          <el-option label="Barley" value="Barley" />
        </el-select>
        <el-select
          v-model="filterStatus"
          :placeholder="$t('research.variety.publish.filterByStatus')"
          clearable
          class="filter-select"
        >
          <el-option :label="$t('research.variety.publish.allStatus')" value="" />
          <el-option :label="$t('research.variety.publish.status.pending')" value="pending" />
          <el-option :label="$t('research.variety.publish.status.published')" value="published" />
          <el-option :label="$t('research.variety.publish.status.offline')" value="offline" />
        </el-select>
      </div>

      <!-- PC端表格 -->
      <div class="table-container pc-only">
        <el-table :data="filteredList" stripe style="width: 100%" :empty-text="$t('home.noData')">
          <el-table-column prop="publishNo" :label="$t('research.variety.publish.columns.publishNo')" min-width="150" />
          <el-table-column prop="varietyName" :label="$t('research.variety.publish.columns.varietyName')" min-width="150" />
          <el-table-column prop="cropType" :label="$t('research.variety.publish.columns.cropType')" width="120" />
          <el-table-column prop="approvalDate" :label="$t('research.variety.publish.columns.approvalDate')" width="120" />
          <el-table-column prop="publishDate" :label="$t('research.variety.publish.columns.publishDate')" width="120">
            <template #default="{ row }">
              {{ row.publishDate || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="publishDept" :label="$t('research.variety.publish.columns.publishDept')" min-width="180" />
          <el-table-column prop="publishStatus" :label="$t('research.variety.publish.columns.publishStatus')" width="120">
            <template #default="{ row }">
              <el-tag :type="getStatusTagType(row.publishStatus)">
                {{ getStatusLabel(row.publishStatus) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('research.variety.publish.columns.actions')" width="260" fixed="right">
            <template #default="{ row }">
              <div class="action-buttons">
                <el-button link type="primary" @click="handleView(row)">
                  <i class="ri-eye-line"></i>
                  {{ $t('common.view') }}
                </el-button>
                <el-button v-if="row.publishStatus === 'pending'" link type="primary" @click="handlePublish(row)">
                  <i class="ri-send-plane-line"></i>
                  {{ $t('research.variety.publish.actions.publish') }}
                </el-button>
                <el-button v-if="row.publishStatus === 'published'" link type="danger" @click="handleOffline(row)">
                  <i class="ri-close-circle-line"></i>
                  {{ $t('research.variety.publish.actions.offline') }}
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
        <div v-for="item in filteredList" :key="item.publishNo" class="variety-card" @click="handleView(item)">
          <div class="card-header">
            <div class="variety-name">{{ item.varietyName }}</div>
            <el-tag :type="getStatusTagType(item.publishStatus)" size="small">
              {{ getStatusLabel(item.publishStatus) }}
            </el-tag>
          </div>
          <div class="card-body">
            <div class="card-row">
              <span class="label">{{ $t('research.variety.publish.columns.cropType') }}:</span>
              <span class="value">{{ item.cropType }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.variety.publish.columns.publishDept') }}:</span>
              <span class="value">{{ item.publishDept }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.variety.publish.columns.publishDate') }}:</span>
              <span class="value">{{ item.publishDate || '-' }}</span>
            </div>
          </div>
          <div class="card-actions" @click.stop>
            <el-button v-if="item.publishStatus === 'pending'" link type="primary" size="small" @click="handlePublish(item)">
              <i class="ri-send-plane-line"></i> {{ $t('research.variety.publish.actions.publish') }}
            </el-button>
            <el-button v-if="item.publishStatus === 'published'" link type="danger" size="small" @click="handleOffline(item)">
              <i class="ri-close-circle-line"></i> {{ $t('research.variety.publish.actions.offline') }}
            </el-button>
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

    <!-- 详情视图 -->
    <div v-else class="detail-section">
      <div class="detail-header">
        <el-button @click="handleBackToList">
          <i class="ri-arrow-left-line"></i>
          {{ $t('research.variety.publish.actions.backToList') }}
        </el-button>
      </div>

      <!-- 详情内容区域 - 添加滚动条 -->
      <div class="detail-content-scrollable">
        <!-- 品种基础信息 -->
        <div class="info-section">
          <div class="section-header">
            <i class="ri-information-line"></i>
            <h2>{{ $t('research.variety.publish.sections.basicInfo') }}</h2>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('research.variety.publish.columns.publishNo') }}</span>
              <span class="value">{{ currentVariety.publishNo || '-' }}</span>
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
              <span class="label">{{ $t('research.variety.publish.columns.approvalDate') }}</span>
              <span class="value">{{ currentVariety.approvalDate || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.publish.columns.publishStatus') }}</span>
              <span class="value">
                <el-tag :type="getStatusTagType(currentVariety.publishStatus)">
                  {{ getStatusLabel(currentVariety.publishStatus) }}
                </el-tag>
              </span>
            </div>
          </div>
        </div>

        <!-- 品种详细信息 -->
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
              <span class="label">{{ $t('research.variety.registration.form.yieldPotential') }}</span>
              <span class="value">
                {{ currentVariety.minYieldPotential || '-' }} - {{ currentVariety.maxYieldPotential || '-' }} kg/ha
              </span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.registration.form.growthPeriod') }}</span>
              <span class="value">{{ currentVariety.growthPeriod ? currentVariety.growthPeriod + ' days' : '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 发布信息 - 待发布状态显示表单,已发布显示信息 -->
        <div v-if="currentVariety.publishStatus === 'pending'" class="publish-form-section">
          <div class="section-header">
            <i class="ri-file-edit-line"></i>
            <h2>{{ $t('research.variety.publish.sections.publishInfo') }}</h2>
          </div>
          <el-form
            ref="formRef"
            :model="formData"
            :rules="rules"
            label-position="top"
          >
            <el-row :gutter="24">
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.variety.publish.form.publishDept')" prop="publishDept">
                  <el-input
                    v-model="formData.publishDept"
                    :placeholder="$t('research.variety.publish.placeholder.publishDept')"
                    size="large"
                  />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item :label="$t('research.variety.publish.form.recommendedRegion')" prop="recommendedRegion">
                  <el-input
                    v-model="formData.recommendedRegion"
                    :placeholder="$t('research.variety.publish.placeholder.recommendedRegion')"
                    size="large"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('research.variety.publish.form.publicDescription')" prop="publicDescription">
                  <el-input
                    v-model="formData.publicDescription"
                    type="textarea"
                    :rows="3"
                    :placeholder="$t('research.variety.publish.placeholder.publicDescription')"
                    size="large"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('research.variety.publish.form.decisionExplanation')" prop="decisionExplanation">
                  <el-input
                    v-model="formData.decisionExplanation"
                    type="textarea"
                    :rows="3"
                    :placeholder="$t('research.variety.publish.placeholder.decisionExplanation')"
                    size="large"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="$t('research.variety.publish.form.sowingGuide')" prop="sowingGuide">
                  <el-input
                    v-model="formData.sowingGuide"
                    type="textarea"
                    :rows="4"
                    :placeholder="$t('research.variety.publish.placeholder.sowingGuide')"
                    size="large"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <div class="form-actions">
              <el-button @click="handleBackToList" size="large">
                {{ $t('common.cancel') }}
              </el-button>
              <el-button type="primary" @click="handleSubmitPublish" :loading="submitLoading" size="large">
                <i class="ri-send-plane-line"></i>
                {{ $t('research.variety.publish.actions.publish') }}
              </el-button>
            </div>
          </el-form>
        </div>

        <!-- 已发布信息显示 -->
        <div v-else class="publish-info-section">
          <div class="section-header">
            <i class="ri-article-line"></i>
            <h2>{{ $t('research.variety.publish.sections.publishInfo') }}</h2>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('research.variety.publish.columns.publishDept') }}</span>
              <span class="value">{{ currentVariety.publishDept || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.publish.columns.publishDate') }}</span>
              <span class="value">{{ currentVariety.publishDate || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.publish.form.publisher') }}</span>
              <span class="value">{{ currentVariety.publisher || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.publish.form.publishTime') }}</span>
              <span class="value">{{ currentVariety.publishTime || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('research.variety.publish.form.recommendedRegion') }}</span>
              <span class="value">{{ currentVariety.recommendedRegion || '-' }}</span>
            </div>
            <div class="info-item full-width">
              <span class="label">{{ $t('research.variety.publish.form.publicDescription') }}</span>
              <span class="value">{{ currentVariety.publicDescription || '-' }}</span>
            </div>
            <div class="info-item full-width">
              <span class="label">{{ $t('research.variety.publish.form.decisionExplanation') }}</span>
              <span class="value">{{ currentVariety.decisionExplanation || '-' }}</span>
            </div>
            <div class="info-item full-width">
              <span class="label">{{ $t('research.variety.publish.form.sowingGuide') }}</span>
              <span class="value">{{ currentVariety.sowingGuide || '-' }}</span>
            </div>
          </div>

          <!-- 下架操作 -->
          <div v-if="currentVariety.publishStatus === 'published'" class="offline-actions">
            <el-button type="danger" @click="handleOffline(currentVariety)" size="large">
              <i class="ri-close-circle-line"></i>
              {{ $t('research.variety.publish.actions.offline') }}
            </el-button>
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

// 视图控制
const showDetail = ref(false)
const currentVariety = ref({})
const submitLoading = ref(false)

// 搜索和筛选
const searchQuery = ref('')
const filterCrop = ref('')
const filterStatus = ref('')

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 发布表单数据
const formData = reactive({
  publishDept: '',
  publicDescription: '',
  decisionExplanation: '',
  recommendedRegion: '',
  sowingGuide: ''
})

// 表单验证规则
const rules = computed(() => ({
  publishDept: [
    { required: true, message: t('research.variety.publish.rules.publishDeptRequired'), trigger: 'blur' }
  ],
  publicDescription: [
    { required: true, message: t('research.variety.publish.rules.publicDescriptionRequired'), trigger: 'blur' }
  ],
  decisionExplanation: [
    { required: true, message: t('research.variety.publish.rules.decisionExplanationRequired'), trigger: 'blur' }
  ]
}))

// 模拟数据
const mockData = ref([
  {
    publishNo: 'PUB-2024-001',
    varietyName: 'Oromia Wheat-1',
    varietyCode: 'OW-001',
    cropType: 'Wheat',
    species: 'Triticum aestivum',
    genus: 'Triticum',
    family: 'Poaceae',
    breedingMethod: 'Crossbreeding',
    minYieldPotential: 3500,
    maxYieldPotential: 4500,
    growthPeriod: 120,
    approvalDate: '2024-01-20',
    publishDate: '2024-01-25',
    publishDept: 'Oromia Agricultural Bureau',
    publishStatus: 'published',
    publisher: 'Admin User',
    publishTime: '2024-01-25 10:30',
    publicDescription: 'High-yielding wheat variety suitable for highland regions with good drought tolerance.',
    decisionExplanation: 'Approved based on successful field trials and demonstrated performance in target regions.',
    recommendedRegion: 'Oromia Highland Zones, Arsi, Bale',
    sowingGuide: 'Sow in June-July at 100-125 kg/ha seed rate. Apply 100 kg DAP and 50 kg Urea per hectare.'
  },
  {
    publishNo: 'PUB-2024-002',
    varietyName: 'High-Yield Maize-A',
    varietyCode: 'HYM-A',
    cropType: 'Maize',
    species: 'Zea mays',
    genus: 'Zea',
    family: 'Poaceae',
    breedingMethod: 'Hybridization',
    minYieldPotential: 6000,
    maxYieldPotential: 8000,
    growthPeriod: 135,
    approvalDate: '2024-01-22',
    publishDate: '',
    publishDept: 'Oromia Agricultural Bureau',
    publishStatus: 'pending'
  },
  {
    publishNo: 'PUB-2024-003',
    varietyName: 'Golden Barley-B',
    varietyCode: 'GBB-01',
    cropType: 'Barley',
    species: 'Hordeum vulgare',
    genus: 'Hordeum',
    family: 'Poaceae',
    breedingMethod: 'Selection',
    minYieldPotential: 2500,
    maxYieldPotential: 3500,
    growthPeriod: 95,
    approvalDate: '2024-01-18',
    publishDate: '2024-01-23',
    publishDept: 'Oromia Agricultural Bureau',
    publishStatus: 'offline',
    publisher: 'Admin User',
    publishTime: '2024-01-23 14:20',
    publicDescription: 'Barley variety with excellent malting quality.',
    decisionExplanation: 'Variety taken offline for quality reassessment.',
    recommendedRegion: 'Oromia Midland Zones',
    sowingGuide: 'Sow in July-August at 80-100 kg/ha seed rate.'
  }
])

// 筛选后的列表
const filteredList = computed(() => {
  let list = mockData.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    list = list.filter(item =>
      item.varietyName.toLowerCase().includes(query) ||
      item.cropType.toLowerCase().includes(query)
    )
  }

  if (filterCrop.value) {
    list = list.filter(item => item.cropType === filterCrop.value)
  }

  if (filterStatus.value) {
    list = list.filter(item => item.publishStatus === filterStatus.value)
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
  const tagMap = {
    pending: 'warning',
    published: 'success',
    offline: 'info'
  }
  return tagMap[status] || ''
}

// 获取状态标签文本
const getStatusLabel = (status) => {
  return t(`research.variety.publish.status.${status}`)
}

// 查看详情
const handleView = (row) => {
  currentVariety.value = { ...row }
  showDetail.value = true

  // 如果是待发布状态,初始化表单数据
  if (row.publishStatus === 'pending') {
    formData.publishDept = row.publishDept || 'Oromia Agricultural Bureau'
    formData.publicDescription = ''
    formData.decisionExplanation = ''
    formData.recommendedRegion = ''
    formData.sowingGuide = ''
  }
}

// 返回列表
const handleBackToList = () => {
  showDetail.value = false
  currentVariety.value = {}
  formRef.value?.clearValidate()
}

// 发布
const handlePublish = async (row) => {
  // 直接跳转到详情页进行发布
  handleView(row)
}

// 提交发布
const handleSubmitPublish = async () => {
  try {
    await formRef.value?.validate()

    await ElMessageBox.confirm(
      t('research.variety.publish.messages.confirmPublish'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    submitLoading.value = true

    // TODO: 调用发布API
    console.log('Publish:', {
      publishNo: currentVariety.value.publishNo,
      ...formData
    })

    ElMessage.success(t('research.variety.publish.messages.publishSuccess'))

    // 更新状态
    const index = mockData.value.findIndex(item => item.publishNo === currentVariety.value.publishNo)
    if (index !== -1) {
      mockData.value[index].publishStatus = 'published'
      mockData.value[index].publishDate = new Date().toISOString().split('T')[0]
      mockData.value[index].publisher = 'Current User'
      mockData.value[index].publishTime = new Date().toLocaleString('zh-CN')
      mockData.value[index].publicDescription = formData.publicDescription
      mockData.value[index].decisionExplanation = formData.decisionExplanation
      mockData.value[index].recommendedRegion = formData.recommendedRegion
      mockData.value[index].sowingGuide = formData.sowingGuide
    }

    setTimeout(() => {
      submitLoading.value = false
      handleBackToList()
    }, 1500)
  } catch (error) {
    submitLoading.value = false
    if (error !== 'cancel') {
      console.error('Publish error:', error)
    }
  }
}

// 下架
const handleOffline = (row) => {
  ElMessageBox.confirm(
    t('research.variety.publish.messages.confirmOffline'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(() => {
    // TODO: 调用下架API
    console.log('Offline:', row)
    ElMessage.success(t('research.variety.publish.messages.offlineSuccess'))

    // 更新状态
    const index = mockData.value.findIndex(item => item.publishNo === row.publishNo)
    if (index !== -1) {
      mockData.value[index].publishStatus = 'offline'
    }

    // 如果在详情页,返回列表
    if (showDetail.value) {
      setTimeout(() => {
        handleBackToList()
      }, 1500)
    }
  }).catch(() => {})
}
</script>

<style scoped>
.variety-publish-page {
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

/* 操作按钮容器 */
.action-buttons {
  display: flex;
  gap: 8px;
  align-items: center;
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
  border-top: 1px solid #f0f2f5;
}

/* 详情区域 */
.detail-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

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

.info-section,
.publish-form-section,
.publish-info-section {
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

/* 表单操作 */
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

.offline-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
  margin-bottom: 24px;
  padding-top: 24px;
  padding-bottom: 24px;
  border-top: 1px solid #f0f2f5;
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
  .variety-publish-page {
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

  .list-section,
  .detail-section {
    padding: 16px;
  }

  .search-section {
    flex-direction: column;
  }

  .search-input,
  .filter-select {
    width: 100%;
  }

  .info-section,
  .publish-form-section,
  .publish-info-section {
    padding: 20px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .form-actions,
  .offline-actions {
    flex-direction: column;
  }

  .form-actions .el-button,
  .offline-actions .el-button {
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
