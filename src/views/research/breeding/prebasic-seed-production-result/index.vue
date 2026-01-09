<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 列表视图 -->
      <template v-if="!showForm && !showDetail">
        <!-- 页面头部 -->
        <PageHeader
          icon="ri-bar-chart-line"
          :title="$t('prebasicSeedProductionResult.title')"
          :subtitle="$t('prebasicSeedProductionResult.subtitle')" />

        <!-- 内容区域 -->
        <div class="content-wrapper">
          <!-- 搜索卡片 -->
          <div class="search-card">
            <SearchForm @search="loadData" @reset="handleReset">
              <SearchItem :label="$t('prebasicSeedProductionResult.columns.varietyName')">
                <el-input
                  v-model="searchQuery"
                  :placeholder="$t('prebasicSeedProductionResult.searchPlaceholder')"
                  clearable
                  class="search-input">
                  <template #prefix><i class="ri-search-line"></i></template>
                </el-input>
              </SearchItem>

              <SearchItem :label="$t('prebasicSeedProductionResult.columns.collectionDate')">
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  range-separator="-"
                  :start-placeholder="$t('common.startDate')"
                  :end-placeholder="$t('common.endDate')"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  clearable
                  style="width: 100%" />
              </SearchItem>
            </SearchForm>
          </div>

          <!-- 列表卡片 -->
          <InfoCard :title="$t('prebasicSeedProductionResult.list')" icon="ri-file-list-3-line">
            <template #actions>
              <el-button type="primary" @click="handleAdd">
                <i class="ri-add-line"></i>
                {{ $t('prebasicSeedProductionResult.add') }}
              </el-button>
            </template>

            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table :data="filteredList" stripe v-loading="loading">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column
                  prop="produceBatchId"
                  :label="$t('prebasicSeedProductionResult.columns.produceBatchId')"
                  min-width="180"
                  show-overflow-tooltip />
                <el-table-column
                  prop="produceBatchName"
                  :label="$t('prebasicSeedProductionResult.columns.produceBatchName')"
                  min-width="180"
                  show-overflow-tooltip />
                <el-table-column
                  prop="varietyName"
                  :label="$t('prebasicSeedProductionResult.columns.varietyName')"
                  min-width="140"
                  show-overflow-tooltip />
                <el-table-column
                  prop="outputQuantity"
                  :label="$t('prebasicSeedProductionResult.columns.outputQuantity')"
                  min-width="140"
                  align="right">
                  <template #default="{ row }">
                    {{ row.outputQuantity }} kg
                  </template>
                </el-table-column>
                <el-table-column
                  prop="collectionDate"
                  :label="$t('prebasicSeedProductionResult.columns.collectionDate')"
                  min-width="160" />
                <el-table-column
                  prop="operator"
                  :label="$t('prebasicSeedProductionResult.form.operator')"
                  min-width="120"
                  show-overflow-tooltip />
                <el-table-column
                  prop="createTime"
                  :label="$t('common.createTime')"
                  min-width="160" />
                <el-table-column :label="$t('common.actions')" width="240" fixed="right">
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button type="primary" size="small" @click="handleView(row)">
                        <i class="ri-eye-line"></i>
                        <span class="btn-text">{{ $t('common.view') }}</span>
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>

              <div class="pagination-wrapper">
                <el-pagination
                  v-model:current-page="currentPage"
                  v-model:page-size="pageSize"
                  :total="total"
                  :page-sizes="[10, 20, 50, 100]"
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange" />
              </div>
            </div>

            <!-- 移动端卡片 -->
            <div class="mobile-card-list mobile-only">
              <div
                v-for="item in filteredList"
                :key="item.resultId"
                class="mobile-card">
                <div class="mobile-card-header">
                  <div class="mobile-card-title">
                    <i class="ri-bar-chart-line"></i>
                    <span>{{ item.varietyName }}</span>
                  </div>
                  <el-tag type="success" size="small">{{ item.produceBatchName }}</el-tag>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('prebasicSeedProductionResult.columns.produceBatchId') }}:</span>
                    <span class="value">{{ item.produceBatchId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('prebasicSeedProductionResult.columns.outputQuantity') }}:</span>
                    <span class="value">{{ item.outputQuantity }} kg</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('prebasicSeedProductionResult.columns.collectionDate') }}:</span>
                    <span class="value">{{ item.collectionDate }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('prebasicSeedProductionResult.form.operator') }}:</span>
                    <span class="value">{{ item.operator }}</span>
                  </div>
                </div>
                <div class="mobile-card-footer">
                  <div class="action-buttons">
                    <el-button type="primary" size="small" @click="handleView(item)">
                      <i class="ri-eye-line"></i>
                      <span class="btn-text">{{ $t('common.view') }}</span>
                    </el-button>
                  </div>
                </div>
              </div>

              <div class="pagination-wrapper">
                <el-pagination
                  v-model:current-page="currentPage"
                  v-model:page-size="pageSize"
                  :page-sizes="[10, 20, 50]"
                  :total="total"
                  layout="total, prev, pager, next"
                  small
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange" />
              </div>
            </div>
          </InfoCard>
        </div>
      </template>

      <!-- 新增表单视图 -->
      <ResultForm
        v-if="showForm"
        @cancel="showForm = false"
        @success="handleFormSuccess" />

      <!-- 详情视图 -->
      <ResultDetail
        v-if="showDetail"
        :data="currentRow"
        @back="showDetail = false" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import { getPrebasicSeedProduceResultList } from '@/api/prebasicSeed'
import ResultDetail from './result-detail.vue'
import ResultForm from './result-form.vue'

const { t } = useI18n()

// 数据状态
const loading = ref(false)
const dataList = ref([])
const searchQuery = ref('')
const dateRange = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 视图控制
const showForm = ref(false)
const showDetail = ref(false)
const currentRow = ref(null)

// 计算属性 - 过滤列表
const filteredList = computed(() => {
  let list = dataList.value

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    list = list.filter(item =>
      item.varietyName?.toLowerCase().includes(query) ||
      item.produceBatchName?.toLowerCase().includes(query) ||
      item.produceBatchId?.toLowerCase().includes(query)
    )
  }

  // 日期范围过滤
  if (dateRange.value && dateRange.value.length === 2) {
    const [start, end] = dateRange.value
    list = list.filter(item => {
      const itemDate = new Date(item.collectionDate)
      return itemDate >= start && itemDate <= end
    })
  }

  return list
})

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: currentPage.value,
      pageSize: pageSize.value
    }
    const res = await getPrebasicSeedProduceResultList(params)
    if (res.code === 200) {
      dataList.value = res.rows || []
      total.value = res.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 处理重置
const handleReset = () => {
  searchQuery.value = ''
  dateRange.value = []
  currentPage.value = 1
  loadData()
}

// 处理分页
const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
  loadData()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  loadData()
}

// 查看详情
const handleView = (row) => {
  currentRow.value = row
  showDetail.value = true
  showForm.value = false
}

// 新增
const handleAdd = () => {
  showForm.value = true
  showDetail.value = false
}

// 表单提交成功
const handleFormSuccess = () => {
  showForm.value = false
  loadData()
}

// 初始化
onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';

// 操作按钮样式 - 匹配 ActionButtons 组件的样式
.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  justify-content: flex-start;

  :deep(.el-button) {
    min-width: auto;
    padding: 4px 10px;
    font-size: 12px;
    font-weight: 500;
    margin: 0 !important;

    i {
      margin-right: 4px;
      font-size: 13px;
      vertical-align: middle;
    }

    .btn-text {
      white-space: nowrap;
    }
  }
}
</style>
