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
          <el-option :label="$t('common.cropTypes.wheat')" value="Wheat" />
          <el-option :label="$t('common.cropTypes.maize')" value="Maize" />
          <el-option :label="$t('common.cropTypes.barley')" value="Barley" />
          <el-option :label="$t('common.cropTypes.teff')" value="Teff" />
          <el-option :label="$t('common.cropTypes.sorghum')" value="Sorghum" />
        </el-select>
        <el-select
          v-model="filterDataType"
          :placeholder="$t('research.variety.query.filterByDataType')"
          clearable
          class="filter-select"
          @change="handleSearch"
        >
          <el-option :label="$t('research.variety.query.allDataTypes')" value="" />
          <el-option :label="$t('research.variety.query.autoPublish')" value="license" />
          <el-option :label="$t('research.variety.query.registrationPublish')" value="registration" />
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
            :label="$t('research.variety.query.columns.dataType')"
            width="120"
            align="center"
          >
            <template #default="{ row }">
              <el-tag v-if="row.dataType === 'license'" type="warning" size="small" effect="dark">
                <i class="ri-checkbox-circle-line"></i>
                {{ $t('research.variety.query.autoPublish') }}
              </el-tag>
              <el-tag v-else type="success" size="small" effect="dark">
                <i class="ri-file-list-line"></i>
                {{ $t('research.variety.query.registrationPublish') }}
              </el-tag>
            </template>
          </el-table-column>
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
            min-width="100"
          />
          <el-table-column
            prop="enterpriseName"
            :label="$t('research.variety.query.columns.enterprise')"
            min-width="160"
          />
          <el-table-column
            :label="$t('research.variety.query.columns.approvalOrg')"
            min-width="150"
          >
            <template #default="{ row }">
              {{ row.approvalOrg || '-' }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('research.variety.query.columns.validPeriod')"
            min-width="180"
          >
            <template #default="{ row }">
              <span v-if="row.validStartDate && row.validEndDate">
                {{ row.validStartDate }} ~ {{ row.validEndDate }}
              </span>
              <span v-else>-</span>
            </template>
          </el-table-column>
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
            <div class="card-tags">
              <el-tag v-if="item.dataType === 'license'" type="warning" size="small">
                {{ $t('research.variety.query.autoPublish') }}
              </el-tag>
              <el-tag v-else type="success" size="small">
                {{ $t('research.variety.query.registrationPublish') }}
              </el-tag>
              <el-tag type="info" size="small">{{ item.varietyType }}</el-tag>
            </div>
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
            <div v-if="item.approvalOrg" class="card-row">
              <span class="label">{{ $t('research.variety.query.columns.approvalOrg') }}:</span>
              <span class="value">{{ item.approvalOrg }}</span>
            </div>
            <div v-if="item.validStartDate && item.validEndDate" class="card-row">
              <span class="label">{{ $t('research.variety.query.columns.validPeriod') }}:</span>
              <span class="value">{{ item.validStartDate }} ~ {{ item.validEndDate }}</span>
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
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getVarietyPublicList } from '@/api/seedPromotion'

const router = useRouter()
const { t } = useI18n()

// 防抖定时器
let searchDebounceTimer = null

// 列表数据
const loading = ref(false)
const rawVarietyList = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

// 搜索和筛选
const searchQuery = ref('')
const filterYear = ref('')
const filterCrop = ref('')
const filterDataType = ref('')

// 前端过滤后的列表
const varietyList = computed(() => {
  if (!filterDataType.value) {
    return rawVarietyList.value
  }
  return rawVarietyList.value.filter(item => item.dataType === filterDataType.value)
})

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
    // 处理响应格式 { code: 200, msg: "", rows: [], total: 10 }
    if (response.code === 200) {
      rawVarietyList.value = response.rows || []
      total.value = response.total || 0
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

// 查看详情 - 跳转到详情页面
const handleView = (row) => {
  router.push({
    name: 'VarietyDetailPage',
    params: { publishId: row.publishId }
  })
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
    min-width: 200px;
  }

  .filter-select {
    width: 180px;
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

      .card-tags {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
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
}
</style>
