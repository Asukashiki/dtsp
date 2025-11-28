<template>
  <div class="variety-query-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon-wrapper">
        <i class="ri-search-eye-line"></i>
      </div>
      <div class="header-text">
        <h1 class="page-title">{{ $t('research.variety.query.title') }}</h1>
        <p class="page-subtitle">{{ $t('research.variety.query.subtitle') }}</p>
      </div>
    </div>

    <!-- 列表区域 -->
    <div class="list-section">
      <!-- 搜索筛选区 -->
      <div class="search-section">
        <el-input
          v-model="searchQuery"
          :placeholder="$t('research.variety.query.searchPlaceholder')"
          clearable
          class="search-input"
          @input="handleSearch"
        >
          <template #prefix>
            <i class="ri-search-line"></i>
          </template>
        </el-input>
        <el-select
          v-model="filterYear"
          :placeholder="$t('research.variety.query.filterByYear')"
          clearable
          class="filter-select"
          @change="handleSearch"
        >
          <el-option :label="$t('research.variety.query.allYears')" value="" />
          <el-option label="2025" value="2025" />
          <el-option label="2024" value="2024" />
          <el-option label="2023" value="2023" />
          <el-option label="2022" value="2022" />
        </el-select>
        <el-select
          v-model="filterCrop"
          :placeholder="$t('research.variety.query.filterByCrop')"
          clearable
          class="filter-select"
          @change="handleSearch"
        >
          <el-option :label="$t('research.variety.query.allCrops')" value="" />
          <el-option label="Wheat" value="Wheat" />
          <el-option label="Maize" value="Maize" />
          <el-option label="Barley" value="Barley" />
          <el-option label="Teff" value="Teff" />
          <el-option label="Sorghum" value="Sorghum" />
        </el-select>
      </div>

      <!-- PC端表格 -->
      <div class="table-container pc-only">
        <el-table
          v-loading="loading"
          :data="varietyList"
          stripe
          style="width: 100%"
          :empty-text="$t('home.noData')"
        >
          <el-table-column
            prop="registerNo"
            :label="$t('research.variety.query.columns.registerNo')"
            min-width="150"
          />
          <el-table-column
            prop="varietyName"
            :label="$t('research.variety.query.columns.varietyName')"
            min-width="150"
          />
          <el-table-column
            prop="varietyType"
            :label="$t('research.variety.query.columns.cropType')"
            min-width="120"
          />
          <el-table-column
            prop="enterpriseName"
            :label="$t('research.variety.query.columns.enterprise')"
            min-width="180"
          />
          <el-table-column
            :label="$t('research.variety.query.columns.actions')"
            width="120"
            fixed="right"
          >
            <template #default="{ row }">
              <el-button link type="primary" @click="handleView(row)">
                <i class="ri-eye-line"></i>
                {{ $t('common.view') }}
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

      <!-- 移动端卡片 -->
      <div class="card-container mobile-only">
        <div v-if="varietyList.length === 0 && !loading" class="empty-state">
          <i class="ri-inbox-line"></i>
          <p>{{ $t('home.noData') }}</p>
        </div>
        <div
          v-for="item in varietyList"
          :key="item.publishId"
          class="variety-card"
          @click="handleView(item)"
        >
          <div class="card-header">
            <div class="variety-name">{{ item.varietyName }}</div>
            <el-tag type="success" size="small">{{ item.varietyType }}</el-tag>
          </div>
          <div class="card-body">
            <div class="card-row">
              <span class="label">{{ $t('research.variety.query.columns.registerNo') }}:</span>
              <span class="value">{{ item.registerNo }}</span>
            </div>
            <div class="card-row">
              <span class="label">{{ $t('research.variety.query.columns.enterprise') }}:</span>
              <span class="value">{{ item.enterpriseName }}</span>
            </div>
          </div>
          <div class="card-footer">
            <el-button link type="primary" size="small">
              <i class="ri-arrow-right-line"></i> {{ $t('research.variety.query.actions.viewDetail') }}
            </el-button>
          </div>
        </div>

        <!-- 移动端分页 -->
        <div v-if="total > 0" class="pagination-wrapper mobile-pagination">
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

    <!-- 详情对话框 -->
    <el-dialog
      v-model="showDetailDialog"
      :title="currentVariety.varietyName"
      width="800px"
      class="variety-detail-dialog"
    >
      <div v-loading="detailLoading" class="detail-content">
        <div class="detail-section">
          <h3 class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.variety.query.detail.basicInfo') }}
          </h3>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">{{ $t('research.variety.query.columns.registerNo') }}:</span>
              <span class="detail-value">{{ currentVariety.registerNo }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">{{ $t('research.variety.query.columns.varietyName') }}:</span>
              <span class="detail-value">{{ currentVariety.varietyName }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">{{ $t('research.variety.query.columns.cropType') }}:</span>
              <span class="detail-value">{{ currentVariety.varietyType }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">{{ $t('research.variety.query.columns.enterprise') }}:</span>
              <span class="detail-value">{{ currentVariety.enterpriseName }}</span>
            </div>
          </div>
        </div>

        <div v-if="currentVariety.baseInfo" class="detail-section">
          <h3 class="section-title">
            <i class="ri-file-text-line"></i>
            {{ $t('research.variety.query.detail.description') }}
          </h3>
          <div class="detail-description">
            {{ currentVariety.baseInfo }}
          </div>
        </div>

        <div v-if="currentVariety.photoUrl" class="detail-section">
          <h3 class="section-title">
            <i class="ri-image-line"></i>
            {{ $t('research.variety.query.detail.photo') }}
          </h3>
          <div class="detail-photo">
            <el-image
              :src="currentVariety.photoUrl"
              :preview-src-list="[currentVariety.photoUrl]"
              fit="cover"
              class="variety-image"
            />
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getVarietyPublicList, getVarietyPublicDetail, recordQueryBehavior } from '@/api/seedPromotion'

const { t } = useI18n()

// 防抖定时器
let searchDebounceTimer = null

// 列表数据
const loading = ref(false)
const varietyList = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

// 搜索和筛选
const searchQuery = ref('')
const filterYear = ref('')
const filterCrop = ref('')

// 详情对话框
const showDetailDialog = ref(false)
const detailLoading = ref(false)
const currentVariety = ref({})

// 加载品种列表
const loadVarietyList = async () => {
  loading.value = true
  try {
    const params = {
      varietyName: searchQuery.value,
      year: filterYear.value,
      cropType: filterCrop.value,
      pageNum: currentPage.value,
      pageSize: pageSize.value
    }

    const response = await getVarietyPublicList(params)
    // 处理新的响应格式 { code: 0, msg: "", rows: [], total: 10 }
    if (response.code === 200) {
      varietyList.value = response.rows || []
      total.value = response.total || 0

      // 记录查询行为
      // recordQuery()
    } else {
      ElMessage.error(response.msg || t('research.variety.query.messages.loadFailed'))
    }
  } catch (error) {
    console.error('Failed to load variety list:', error)
    ElMessage.error(t('research.variety.query.messages.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 记录查询行为
const recordQuery = async () => {
  try {
    // await recordQueryBehavior({
    //   queryKeyword: searchQuery.value || filterYear.value || filterCrop.value || 'all',
    //   ipAddress: '', // 后端可以从请求中获取
    //   queryResultCount: varietyList.value.length,
    //   viewedPublishId: null
    // })
  } catch (error) {
    console.error('Failed to record query behavior:', error)
  }
}

// 搜索处理（带防抖）
const handleSearch = () => {
  // 清除之前的定时器
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
  }

  // 设置新的定时器（500ms 防抖）
  searchDebounceTimer = setTimeout(() => {
    currentPage.value = 1
    loadVarietyList()
  }, 500)
}

// 分页处理
const handleSizeChange = (newSize) => {
  pageSize.value = newSize
  currentPage.value = 1
  loadVarietyList()
}

const handlePageChange = (newPage) => {
  currentPage.value = newPage
  loadVarietyList()
}

// 查看详情
const handleView = async (row) => {
  showDetailDialog.value = true
  detailLoading.value = true
  currentVariety.value = { ...row }

  try {
    const response = await getVarietyPublicDetail(row.publishId)
    // 统一使用 code: 0 表示成功
    if (response.code === 200 && response.data) {
      currentVariety.value = response.data

    } else if (response.code !== 200) {
      ElMessage.error(response.msg || t('research.variety.query.messages.loadDetailFailed'))
    }
  } catch (error) {
    console.error('Failed to load variety detail:', error)
    ElMessage.error(t('research.variety.query.messages.loadDetailFailed'))
  } finally {
    detailLoading.value = false
  }
}

// 页面加载时获取数据
onMounted(() => {
  loadVarietyList()
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
  }
})
</script>

<style scoped lang="scss">
.variety-query-page {
  padding: 24px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  min-height: calc(100vh - 60px);
}

/* 页面头部 */
.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  padding: 32px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(254, 221, 0, 0.3);

  .header-icon-wrapper {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 24px;

    i {
      font-size: 40px;
      color: white;
    }
  }

  .header-text {
    flex: 1;
    color: white;

    .page-title {
      font-size: 28px;
      font-weight: 600;
      margin: 0 0 8px 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .page-subtitle {
      font-size: 16px;
      opacity: 0.95;
      margin: 0;
    }
  }
}

/* 列表区域 */
.list-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.search-section {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  .search-input {
    flex: 1;
    min-width: 250px;
  }

  .filter-select {
    width: 200px;
  }
}

.table-container {
  overflow: auto;
}

/* 分页 */
.pagination-wrapper {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;

  &.mobile-pagination {
    justify-content: center;
  }
}

/* 移动端卡片 */
.card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #909399;

    i {
      font-size: 64px;
      margin-bottom: 16px;
      display: block;
    }

    p {
      font-size: 16px;
      margin: 0;
    }
  }

  .variety-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid #e4e7ed;

    &:hover {
      box-shadow: 0 4px 16px rgba(254, 221, 0, 0.2);
      transform: translateY(-2px);
      border-color: #FEDD00;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e4e7ed;

      .variety-name {
        font-size: 18px;
        font-weight: 600;
        color: #303133;
        flex: 1;
      }
    }

    .card-body {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 16px;

      .card-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        font-size: 14px;

        .label {
          color: #909399;
          flex-shrink: 0;
        }

        .value {
          color: #303133;
          text-align: right;
          font-weight: 500;
        }
      }
    }

    .card-footer {
      padding-top: 12px;
      border-top: 1px solid #e4e7ed;
      text-align: right;
    }
  }
}

/* 详情对话框 */
.variety-detail-dialog {
  .detail-content {
    min-height: 200px;
  }

  .detail-section {
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      margin: 0 0 16px 0;
      padding-bottom: 12px;
      border-bottom: 2px solid #e8f5e9;

      i {
        font-size: 20px;
        color: #FEDD00;
      }
    }

    .detail-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;

      .detail-item {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .detail-label {
          font-size: 12px;
          color: #909399;
        }

        .detail-value {
          font-size: 14px;
          color: #303133;
          font-weight: 500;
        }
      }
    }

    .detail-description {
      font-size: 14px;
      color: #606266;
      line-height: 1.8;
      background: #F5F7FA;
      padding: 16px;
      border-radius: 8px;
    }

    .detail-photo {
      .variety-image {
        width: 100%;
        max-height: 400px;
        border-radius: 8px;
        overflow: hidden;
      }
    }
  }
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
  .variety-query-page {
    padding: 16px;
  }

  .page-header {
    padding: 20px;
    flex-direction: column;
    text-align: center;

    .header-icon-wrapper {
      margin-right: 0;
      margin-bottom: 16px;
    }

    .header-text {
      .page-title {
        font-size: 22px;
      }

      .page-subtitle {
        font-size: 14px;
      }
    }
  }

  .list-section {
    padding: 16px;
  }

  .search-section {
    flex-direction: column;

    .search-input,
    .filter-select {
      width: 100%;
    }
  }

  /* 移动端显示卡片 */
  .pc-only {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
  }

  .variety-detail-dialog {
    :deep(.el-dialog) {
      width: 95% !important;
      margin: 0 auto;
    }

    .detail-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
