<template>
  <div class="page-container">
    <div class="page-wrapper" v-if="!showForm && !showDetail">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-bar-chart-line"
        :title="$t('basicSeedProductionResult.title')"
        :subtitle="$t('basicSeedProductionResult.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索区域 -->
        <div class="search-card">
          <SearchForm @search="loadData" @reset="handleReset">
            <SearchItem :label="$t('basicSeedProductionResult.searchPlaceholder')">
              <el-input
                v-model="searchQuery"
                :placeholder="$t('basicSeedProductionResult.searchPlaceholder')"
                clearable
                @clear="loadData"
                @keyup.enter="loadData" />
            </SearchItem>
            <SearchItem :label="$t('common.dateRange')">
              <el-date-picker
                v-model="dateRange"
                type="daterange"
                range-separator="-"
                :start-placeholder="$t('common.startDate')"
                :end-placeholder="$t('common.endDate')"
                clearable
                @change="loadData" />
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('basicSeedProductionResult.title')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('Add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="filteredList" stripe v-loading="loading">
              <el-table-column type="index" width="60" align="center" />
              <el-table-column
                prop="produceBatchId"
                :label="$t('basicSeedProductionResult.columns.produceBatchId')"
                min-width="150"
                show-overflow-tooltip />
              <el-table-column
                prop="produceBatchName"
                :label="$t('basicSeedProductionResult.columns.produceBatchName')"
                min-width="150"
                show-overflow-tooltip />
              <el-table-column
                prop="varietyName"
                :label="$t('basicSeedProductionResult.columns.varietyName')"
                min-width="120"
                show-overflow-tooltip />
              <el-table-column
                prop="outputQuantity"
                :label="$t('basicSeedProductionResult.columns.outputQuantity')"
                min-width="120"
                align="right">
                <template #default="{ row }">
                  {{ row.outputQuantity }} kg
                </template>
              </el-table-column>
              <el-table-column
                prop="collectionDate"
                :label="$t('basicSeedProductionResult.columns.collectionDate')"
                width="160"
                align="center" />
              <el-table-column
                prop="operator"
                :label="$t('basicSeedProductionResult.form.operator')"
                min-width="120"
                show-overflow-tooltip />
              <el-table-column
                prop="createTime"
                :label="$t('common.createTime')"
                width="160"
                align="center" />
              <el-table-column
                :label="$t('common.actions')"
                width="150"
                fixed="right"
                align="center">
                <template #default="{ row }">
                  <ActionButtons
                    mode="list"
                    :workflow-status="'S2'"
                    :show-audit="false"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
            </div>
          </div>

          <!-- 移动端视图 -->
          <div class="mobile-card-list mobile-only">
            <div
              v-for="item in filteredList"
              :key="item.resultId"
              class="mobile-card"
              @click="handleView(item)">
              <div class="mobile-card-header">
                <div class="variety-tag">
                  <el-tag type="success" size="small">{{ item.varietyName }}</el-tag>
                </div>
              </div>
              <div class="mobile-card-body">
                <h3 class="card-title">{{ item.produceBatchName }}</h3>
                <div class="info-grid">
                  <div class="info-row">
                    <span class="label">{{ $t('basicSeedProductionResult.columns.resultId') }}:</span>
                    <span class="value">{{ item.resultId }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('basicSeedProductionResult.columns.collectionDate') }}:</span>
                    <span class="value">{{ item.collectionDate }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('basicSeedProductionResult.columns.outputQuantity') }}:</span>
                    <span class="value font-bold text-primary">{{ item.outputQuantity }} kg</span>
                  </div>
                </div>
              </div>
              <div class="mobile-card-footer">
                <ActionButtons
                  mode="list"
                  :workflow-status="'S2'"
                  :show-audit="false"
                  @action="(action) => handleAction(item, action)" />
              </div>
            </div>

            <div v-if="filteredList.length === 0 && !loading" class="empty-state">
              <el-empty :description="$t('common.noData')" />
            </div>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="currentPage"
                :total="total"
                :page-size="pageSize"
                layout="prev, pager, next"
                small
                @current-change="handleCurrentChange" />
            </div>
          </div>
        </InfoCard>
      </div>
    </div>

    <!-- 子表单和详情视图 -->
    <ResultForm
      v-if="showForm"
      @cancel="showForm = false"
      @success="handleFormSuccess" />

    <ResultDetail
      v-if="showDetail"
      :data="currentRow"
      @back="showDetail = false" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getBasicSeedProduceResultList } from '@/api/basicSeed'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import ActionButtons from '@/components/workflow/ActionButtons.vue'
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
    const res = await getBasicSeedProduceResultList(params)
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

// 统一动作处理
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
  }
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

.font-bold {
  font-weight: 600;
}

.text-primary {
  color: #009A44;
}

@media screen and (max-width: 768px) {
  .mobile-card {
    background: white;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .card-title {
      font-size: 16px;
      font-weight: 600;
      margin: 8px 0;
      color: #303133;
    }

    .info-grid {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .info-row {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        
        .label {
          color: #909399;
        }
        
        .value {
          color: #606266;
        }
      }
    }

    .mobile-card-footer {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #f0f0f0;
    }
  }
}
</style>

