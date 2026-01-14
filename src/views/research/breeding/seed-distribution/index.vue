<template>
  <div class="page-container">
    <div class="page-wrapper" v-if="!showForm && !showDetail">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-share-forward-line"
        :title="$t('research.breeding.seed.distribution.title')"
        :subtitle="$t('research.breeding.seed.distribution.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索区域 -->
        <div class="search-card">
          <SearchForm @search="loadData" @reset="handleReset">
            <SearchItem :label="$t('research.breeding.seed.distribution.searchPlaceholder')">
              <el-input
                v-model="searchQuery"
                :placeholder="$t('research.breeding.seed.distribution.searchPlaceholder')"
                clearable
                @clear="loadData"
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
                clearable
                @change="loadData" />
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('research.breeding.seed.distribution.title')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('Add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="filteredList" stripe v-loading="loading">
              <el-table-column
                prop="distributeId"
                :label="$t('research.breeding.seed.distribution.columns.distributeId')"
                min-width="150"
                show-overflow-tooltip />
              <el-table-column
                prop="distributeName"
                :label="$t('research.breeding.seed.distribution.columns.distributeName')"
                min-width="150"
                show-overflow-tooltip />
              <el-table-column
                prop="oseName"
                :label="$t('research.breeding.seed.distribution.columns.oseName')"
                min-width="150"
                show-overflow-tooltip />
              <el-table-column
                prop="fromSeedLevel"
                :label="$t('research.breeding.seed.distribution.columns.fromSeedLevel')"
                min-width="120"
                show-overflow-tooltip />
              <el-table-column
                prop="toSeedLevel"
                :label="$t('research.breeding.seed.distribution.columns.toSeedLevel')"
                min-width="120"
                show-overflow-tooltip />
              <el-table-column
                prop="time"
                :label="$t('research.breeding.seed.distribution.columns.time')"
                width="160"
                align="center" />
              <el-table-column
                prop="totalDistributeQuantity"
                :label="$t('research.breeding.seed.distribution.columns.totalDistributeQuantity')"
                width="150"
                align="right">
                <template #default="{ row }">
                  <span class="font-bold text-primary">{{ row.totalDistributeQuantity }} kg</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="distributeStatus"
                :label="$t('research.breeding.seed.distribution.columns.distributeStatus')"
                width="120"
                align="center">
                <template #default="{ row }">
                  <el-tag type="success" size="small">{{ row.distributeStatus }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('common.actions')"
                width="180"
                fixed="right"
                align="center">
                <template #default="{ row }">
                  <ActionButtons
                    class="table-actions"
                    mode="list"
                    :workflow-status="row.distributeStatus === 'Finalized' ? 'S2' : 'S0'"
                    :show-audit="false"
                    :exclude-actions="getExcludeActions(row)"
                    :force-view="true"
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
              :key="item.distributeId"
              class="mobile-card"
              @click="handleView(item)">
              <div class="mobile-card-header">
                <el-tag type="success" size="small">{{ item.distributeStatus }}</el-tag>
                <div class="time-tag">
                   <i class="ri-time-line"></i>
                   <span>{{ item.time }}</span>
                </div>
              </div>
              <div class="mobile-card-body">
                <h3 class="card-title">{{ item.distributeName }}</h3>
                <div class="info-grid">
                  <div class="info-row">
                    <span class="label">{{ $t('research.breeding.seed.distribution.columns.oseName') }}:</span>
                    <span class="value">{{ item.oseName }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('research.breeding.seed.distribution.columns.fromSeedLevel') }}:</span>
                    <span class="value">{{ item.fromSeedLevel }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('research.breeding.seed.distribution.columns.toSeedLevel') }}:</span>
                    <span class="value">{{ item.toSeedLevel }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('research.breeding.seed.distribution.columns.totalDistributeQuantity') }}:</span>
                    <span class="value font-bold text-primary">{{ item.totalDistributeQuantity }} kg</span>
                  </div>
                </div>
              </div>
              <div class="mobile-card-footer">
                <ActionButtons
                  class="table-actions"
                  mode="list"
                  :workflow-status="item.distributeStatus === 'Finalized' ? 'S2' : 'S0'"
                  :show-audit="false"
                  :exclude-actions="getExcludeActions(item)"
                  :force-view="true"
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

    <!-- 子视图内容 -->
    <DistributionForm
      v-if="showForm"
      @cancel="showForm = false"
      @success="handleFormSuccess" />

    <DistributionDetail
      v-if="showDetail"
      :data="currentRow"
      @back="showDetail = false" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBreedSeedDistributeList } from '@/api/breedSeed'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import ActionButtons from '@/components/workflow/ActionButtons.vue'
import DistributionForm from './form.vue'
import DistributionDetail from './detail.vue'

const { t } = useI18n()

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

const filteredList = computed(() => {
  let list = dataList.value
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    list = list.filter(item =>
      item.distributeName?.toLowerCase().includes(query) ||
      item.oseName?.toLowerCase().includes(query) ||
      item.fromSeedLevel?.toLowerCase().includes(query) ||
      item.toSeedLevel?.toLowerCase().includes(query)
    )
  }
  return list
})

const loadData = async () => {
  loading.value = true
  try {
    const params = { pageNum: currentPage.value, pageSize: pageSize.value }
    const res = await getBreedSeedDistributeList(params)
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

const handleReset = () => {
  searchQuery.value = ''
  dateRange.value = []
  currentPage.value = 1
  loadData()
}

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
  loadData()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  loadData()
}

const handleAdd = () => {
  showForm.value = true
  showDetail.value = false
}

const handleView = (row) => {
  currentRow.value = row
  showDetail.value = true
  showForm.value = false
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    t('research.breeding.seed.distribution.deleteConfirm'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  )
    .then(() => {
      ElMessage.success(t('research.breeding.seed.distribution.deleteSuccess'))
      loadData()
    })
    .catch(() => {})
}

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
    case 'cancelBatch':
      handleDelete(row)
      break
  }
}

// 根据分发状态获取需要排除的操作
const getExcludeActions = (row) => {
  console.log('row',row);
  const excludeList = ['submit', 'edit']
  // 当分发状态为"已收到的"时，隐藏"作废"按钮
  if (row.distributeStatus === 'Received') {
    excludeList.push('cancelBatch')
  }
  return excludeList
}

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

.table-actions {
  flex-wrap: nowrap !important;
  justify-content: center !important;
}

@media screen and (max-width: 768px) {
  .mobile-card {
    background: white;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .mobile-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      .time-tag {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: #909399;
      }
    }

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

