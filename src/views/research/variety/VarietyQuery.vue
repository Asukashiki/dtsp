<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader icon="ri-search-eye-line" :title="$t('research.variety.query.title')"
        :subtitle="$t('research.variety.query.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索区域 -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleSearch">
            <SearchItem :label="$t('research.variety.query.columns.varietyName')">
              <el-input v-model="searchQuery" :placeholder="$t('research.variety.query.searchPlaceholder')" clearable
                @input="handleSearch">
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('research.variety.query.filterByYear')">
              <el-select v-model="filterYear" :placeholder="$t('research.variety.query.filterByYear')" clearable
                class="filter-select" @change="handleSearch">
                <el-option :label="$t('research.variety.query.allYears')" value="" />
                <el-option v-for="year in yearOptions" :key="year" :label="year" :value="year" />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('research.variety.query.filterByCrop')">
              <el-select v-model="filterCrop" :placeholder="$t('research.variety.query.filterByCrop')" clearable
                class="filter-select" v-loading="dictLoading" @change="handleSearch">
                <el-option :label="$t('research.variety.query.allCrops')" value="" />
                <el-option v-for="item in options.crop_type" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('research.variety.query.filterByDataType')">
              <el-select v-model="filterDataType" :placeholder="$t('research.variety.query.filterByDataType')" clearable
                class="filter-select" @change="handleSearch">
                <el-option :label="$t('research.variety.query.allDataTypes')" value="" />
                <el-option :label="$t('research.variety.query.autoPublish')" value="license" />
                <el-option :label="$t('research.variety.query.registrationPublish')" value="registration" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('research.variety.query.title')" icon="ri-file-list-3-line">
          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table v-loading="loading" :data="varietyList" stripe style="width: 100%"
              :empty-text="$t('home.noData')">
              <el-table-column :label="$t('research.variety.query.columns.dataType')" width="140" align="center">
                <template #default="{ row }">
                  <el-tag v-if="row.dataType === 'license'" type="warning" size="small" effect="plain">
                    <i class="ri-checkbox-circle-line"></i>
                    {{ $t('research.variety.query.autoPublish') }}
                  </el-tag>
                  <el-tag v-else type="success" size="small" effect="plain">
                    <i class="ri-file-list-line"></i>
                    {{ $t('research.variety.query.registrationPublish') }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="registerNo" :label="$t('research.variety.query.columns.registerNo')"
                min-width="150" show-overflow-tooltip />
              <el-table-column prop="varietyName" :label="$t('research.variety.query.columns.varietyName')"
                min-width="150" show-overflow-tooltip />
              <el-table-column :label="$t('research.variety.query.columns.cropType')" min-width="120">
                <template #default="{ row }">
                  {{ getLabelByValue('crop_type', row.varietyType) || row.varietyType || '-' }}
                </template>
              </el-table-column>
              <el-table-column prop="enterpriseName" :label="$t('research.variety.query.columns.enterprise')"
                min-width="160" show-overflow-tooltip />
              <el-table-column :label="$t('research.variety.query.columns.approvalOrg')" min-width="150"
                show-overflow-tooltip>
                <template #default="{ row }">
                  {{ row.approvalOrg || '-' }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('research.variety.query.columns.validPeriod')" min-width="180">
                <template #default="{ row }">
                  <span v-if="row.validStartDate && row.validEndDate">
                    {{ row.validStartDate }} ~ {{ row.validEndDate }}
                  </span>
                  <span v-else>-</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('common.actions')" width="120" fixed="right">
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button link type="primary" @click="handleView(row)">
                      <i class="ri-eye-line"></i>
                      {{ $t('common.view') }}
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="pagination-wrapper">
              <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[10, 20, 50, 100]" :total="total" layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange" @current-change="handlePageChange" />
            </div>
          </div>

          <!-- 移动端卡片 -->
          <div class="mobile-card-list mobile-only">
            <div v-if="varietyList.length === 0 && !loading" class="empty-status">
              <i class="ri-inbox-line"></i>
              <p>{{ $t('home.noData') }}</p>
            </div>
            <div v-for="item in varietyList" :key="item.publishId" class="mobile-card" @click="handleView(item)">
              <div class="mobile-card-header">
                <div class="mobile-card-title">{{ item.varietyName }}</div>
                <div class="card-tags">
                  <el-tag v-if="item.dataType === 'license'" type="warning" size="small" effect="plain">
                    {{ $t('research.variety.query.autoPublish') }}
                  </el-tag>
                  <el-tag v-else type="success" size="small" effect="plain">
                    {{ $t('research.variety.query.registrationPublish') }}
                  </el-tag>
                </div>
              </div>
              <div class="mobile-card-body">
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.variety.query.columns.registerNo') }}:</span>
                  <span class="value">{{ item.registerNo }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.variety.query.columns.cropType') }}:</span>
                  <span class="value">{{ getLabelByValue('crop_type', item.varietyType) || item.varietyType || '-'
                  }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('research.variety.query.columns.enterprise') }}:</span>
                  <span class="value">{{ item.enterpriseName }}</span>
                </div>
              </div>
              <div class="mobile-card-footer">
                <el-button link type="primary" size="small">
                  <i class="ri-eye-line"></i> {{ $t('common.view') }}
                </el-button>
              </div>
            </div>

            <!-- 移动端分页 -->
            <div v-if="total > 0" class="pagination-wrapper">
              <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total"
                layout="prev, pager, next" small @current-change="handlePageChange" />
            </div>
          </div>
        </InfoCard>
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
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import { useDict } from '@/hooks/useDict'

const { options, loading: dictLoading, getLabelByValue } = useDict(['crop_type'])

const yearOptions = computed(() => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let y = currentYear; y >= 2020; y--) {
    years.push(y.toString())
  }
  return years
})

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
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';

.filter-select {
  width: 100%;
}

.card-tags {
  display: flex;
  gap: 8px;
}
</style>
