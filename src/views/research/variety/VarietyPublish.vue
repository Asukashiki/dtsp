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

    <!-- 列表区域 -->
    <div class="list-section">
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
          <el-option label="Wheat" value="wheat" />
          <el-option label="Maize" value="maize" />
          <el-option label="Barley" value="barley" />
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
          <el-table-column prop="publishDate" :label="$t('research.variety.publish.columns.publishDate')" width="120" />
          <el-table-column prop="publishDept" :label="$t('research.variety.publish.columns.publishDept')" min-width="180" />
          <el-table-column prop="publishStatus" :label="$t('research.variety.publish.columns.publishStatus')" width="120">
            <template #default="{ row }">
              <el-tag :type="getStatusTagType(row.publishStatus)">
                {{ getStatusLabel(row.publishStatus) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('research.variety.publish.columns.actions')" width="180" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleView(row)">
                <i class="ri-eye-line"></i>
              </el-button>
              <el-button v-if="row.publishStatus === 'pending'" link type="primary" @click="handlePublish(row)">
                <i class="ri-send-plane-line"></i>
              </el-button>
              <el-button v-if="row.publishStatus === 'published'" link type="danger" @click="handleOffline(row)">
                <i class="ri-close-circle-line"></i>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'

const { t } = useI18n()

// 搜索和筛选
const searchQuery = ref('')
const filterCrop = ref('')
const filterStatus = ref('')

// 模拟数据
const mockData = ref([
  {
    publishNo: 'PUB-2024-001',
    varietyName: 'Oromia Wheat-1',
    cropType: 'Wheat',
    approvalDate: '2024-01-20',
    publishDate: '2024-01-25',
    publishDept: 'Oromia Agricultural Bureau',
    publishStatus: 'published'
  },
  {
    publishNo: 'PUB-2024-002',
    varietyName: 'High-Yield Maize-A',
    cropType: 'Maize',
    approvalDate: '2024-01-22',
    publishDate: '',
    publishDept: 'Oromia Agricultural Bureau',
    publishStatus: 'pending'
  },
  {
    publishNo: 'PUB-2024-003',
    varietyName: 'Golden Barley-B',
    cropType: 'Barley',
    approvalDate: '2024-01-18',
    publishDate: '2024-01-23',
    publishDept: 'Oromia Agricultural Bureau',
    publishStatus: 'offline'
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
    list = list.filter(item => item.cropType.toLowerCase() === filterCrop.value)
  }

  if (filterStatus.value) {
    list = list.filter(item => item.publishStatus === filterStatus.value)
  }

  return list
})

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

// 查看
const handleView = (row) => {
  console.log('View:', row)
  // TODO: 实现查看详情逻辑
}

// 发布
const handlePublish = (row) => {
  ElMessageBox.confirm(
    t('research.variety.publish.messages.confirmPublish'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(() => {
    // TODO: 调用发布API
    console.log('Publish:', row)
    ElMessage.success(t('research.variety.publish.messages.publishSuccess'))

    // 更新状态
    const index = mockData.value.findIndex(item => item.publishNo === row.publishNo)
    if (index !== -1) {
      mockData.value[index].publishStatus = 'published'
      mockData.value[index].publishDate = new Date().toISOString().split('T')[0]
    }
  }).catch(() => {})
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

  .list-section {
    padding: 16px;
  }

  .search-section {
    flex-direction: column;
  }

  .search-input,
  .filter-select {
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
