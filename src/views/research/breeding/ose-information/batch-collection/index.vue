<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-bar-chart-line"
        :title="$t('research.menu.oseBatchCollection')"
        :subtitle="$t('research.menu.oseBatchCollectionSubtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="loadData" @reset="handleReset">
            <SearchItem :label="$t('batchCollection.searchPlaceholder')">
              <el-input
                v-model="searchQuery"
                :placeholder="$t('batchCollection.searchPlaceholder')"
                clearable
                @keyup.enter="loadData">
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('common.dateRange')">
              <el-date-picker
                v-model="dateRange"
                type="daterange"
                range-separator="-"
                :start-placeholder="$t('common.startDate')"
                :end-placeholder="$t('common.endDate')"
                style="width: 100%"
                clearable
                @change="loadData"
              />
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('batchCollection.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('batchCollection.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="filteredList" stripe style="width: 100%" v-loading="loading">
              <el-table-column type="index" width="50" align="center" />
              <el-table-column
                prop="breedingBatchId"
                :label="$t('batchCollection.columns.breedingBatchId')"
                min-width="150"
                show-overflow-tooltip
              />
              <el-table-column
                prop="varietyName"
                :label="$t('batchCollection.columns.varietyName')"
                min-width="120"
                show-overflow-tooltip
              />
              <el-table-column
                prop="toMultiplyQuantity"
                :label="$t('batchCollection.columns.toMultiplyQuantity')"
                min-width="120"
                align="right"
              >
                <template #default="{ row }">
                  {{ row.toMultiplyQuantity }} kg
                </template>
              </el-table-column>
              <el-table-column
                prop="collectionDate"
                :label="$t('batchCollection.columns.collectionDate')"
                width="160"
                align="center"
              />
              <el-table-column
                prop="operator"
                :label="$t('batchCollection.form.operator')"
                min-width="120"
                show-overflow-tooltip
              />
              <el-table-column
                prop="createTime"
                :label="$t('common.createTime')"
                width="160"
                align="center"
              />
              <el-table-column
                :label="$t('common.actions')"
                width="150"
                fixed="right"
                align="center"
              >
                <template #default="{ row }">
                 <div class="action-buttons"> 
                  <el-button size="small" type="primary" @click="handleView(row)">
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
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>

          <!-- 移动端卡片列表 -->
          <div class="mobile-card-list mobile-only">
            <div v-if="filteredList.length === 0 && !loading" class="empty-state">
              <i class="ri-inbox-line"></i>
              <p>{{ $t('common.noData') }}</p>
            </div>
            <div v-for="item in filteredList" :key="item.id" class="card">
              <div class="card-header">
                <div class="card-title">{{ item.breedingBatchId }}</div>
                <el-tag type="success" size="small">{{ item.varietyName }}</el-tag>
              </div>
              <div class="card-body">
                <div class="card-row">
                  <span class="label">{{ $t('batchCollection.columns.varietyName') }}:</span>
                  <span class="value">{{ item.varietyName }}</span>
                </div>
                <div class="card-row">
                  <span class="label">{{ $t('batchCollection.columns.toMultiplyQuantity') }}:</span>
                  <span class="value">{{ item.toMultiplyQuantity }} kg</span>
                </div>
                <div class="card-row">
                  <span class="label">{{ $t('batchCollection.columns.collectionDate') }}:</span>
                  <span class="value">{{ item.collectionDate }}</span>
                </div>
                <div class="card-row">
                  <span class="label">{{ $t('batchCollection.form.operator') }}:</span>
                  <span class="value">{{ item.operator }}</span>
                </div>
              </div>
              <div class="card-footer">
                <el-button text type="primary" @click="handleView(item)">{{ $t('common.view') }}</el-button>
              </div>
            </div>

            <!-- 移动端分页 -->
            <div v-if="total > pageSize" class="mobile-pagination">
              <el-pagination
                v-model:current-page="currentPage"
                :total="total"
                :page-size="pageSize"
                layout="prev, pager, next"
                small
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </InfoCard>
      </div>
    </div>

    <!-- 移动端添加按钮 -->
    <div class="mobile-fab" @click="handleAdd">
      <i class="ri-add-line"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getOseBatchCollectionList } from '@/api/breeding'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'

const { t } = useI18n()
const router = useRouter()

// 数据状态
const loading = ref(false)
const dataList = ref([])
const searchQuery = ref('')
const dateRange = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 计算属性 - 过滤列表
const filteredList = computed(() => {
  let list = dataList.value

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    list = list.filter(item =>
      item.varietyName?.toLowerCase().includes(query) ||
      item.batchId?.toLowerCase().includes(query) ||
      item.distributionId?.toLowerCase().includes(query)
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
    const res = await getOseBatchCollectionList(params)
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
  router.push({
    name: 'OseBatchCollectionDetail',
    params: { id: row.id }
  })
}

// 新增
const handleAdd = () => {
  router.push({
    name: 'OseBatchCollectionAdd'
  })
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

.mobile-fab {
  display: none;
}

@media screen and (max-width: 768px) {
  .mobile-fab {
    display: flex;
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    box-shadow: 0 4px 16px rgba(0, 154, 68, 0.3);
    cursor: pointer;
    z-index: 50;
    transition: all 0.3s ease;

    &:active {
      transform: scale(0.9);
    }
  }
}

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
