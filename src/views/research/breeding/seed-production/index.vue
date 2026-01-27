<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 列表视图 -->
      <template v-if="!showForm && !showDetail">
        <!-- 页面头部 -->
        <PageHeader
          icon="ri-seedling-line"
          :title="$t('research.breeding.seed.production.title')"
          :subtitle="$t('research.breeding.seed.production.subtitle')" />

        <!-- 内容区域 -->
        <div class="content-wrapper">
          <!-- 搜索卡片 -->
          <div class="search-card">
            <SearchForm @search="loadData" @reset="handleReset">
              <SearchItem :label="$t('research.breeding.seed.production.columns.varietyName')">
                <el-input
                  v-model="searchQuery"
                  :placeholder="$t('research.breeding.seed.production.columns.varietyName')"
                  clearable
                  class="search-input">
                  <template #prefix><i class="ri-search-line"></i></template>
                </el-input>
              </SearchItem>

              <SearchItem :label="$t('research.breeding.seed.production.columns.time')">
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
          <InfoCard :title="$t('research.breeding.seed.production.list')" icon="ri-file-list-3-line">
            <template #actions>
              <el-button type="primary" @click="handleAdd">
                <i class="ri-add-line"></i>
                {{ $t('research.breeding.seed.production.add') }}
              </el-button>
            </template>

            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table :data="filteredList" stripe v-loading="loading">
                <el-table-column type="selection" width="55" align="center" />
            <el-table-column
              prop="produceBatchId"
              :label="$t('research.breeding.seed.production.columns.produceBatchId')"
              min-width="260"
              show-overflow-tooltip
            />
            <el-table-column
              prop="produceBatchName"
              :label="$t('research.breeding.seed.production.columns.produceBatchName')"
              min-width="210"
              show-overflow-tooltip
            />
            <el-table-column
              prop="breedBatchName"
              :label="$t('research.breeding.seed.production.columns.breedBatchName')"
              min-width="200"
              show-overflow-tooltip
            />
            <el-table-column
              prop="varietyName"
              :label="$t('research.breeding.seed.production.columns.varietyName')"
              min-width="150"
              show-overflow-tooltip
            />
            <el-table-column
              prop="cropType"
              :label="$t('research.breeding.seed.production.columns.cropType')"
              min-width="120"
              align="center"
            >
              <template #default="{ row }">
                {{ getLabelByValue('crop_type', row.cropType) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="time"
              :label="$t('research.breeding.seed.production.columns.time')"
              min-width="150"
            />
            <el-table-column
              prop="landName"
              :label="$t('research.breeding.seed.production.columns.landName')"
              min-width="120"
            />
            <el-table-column
              prop="inputSeedQuantity"
              :label="$t('research.breeding.seed.production.columns.inputSeedQuantity')"
              min-width="180"
              align="right"
            >
              <template #default="{ row }">
                {{ row.inputSeedQuantity }} kg
              </template>
            </el-table-column>
            <el-table-column
              prop="fromSeedLevel"
              :label="$t('research.breeding.seed.production.columns.fromSeedLevel')"
              min-width="120"
              align="center"
            />
            <el-table-column
              prop="toSeedLevel"
              :label="$t('research.breeding.seed.production.columns.toSeedLevel')"
              min-width="120"
              align="center"
            />
            <el-table-column
              prop="operatorName"
              :label="$t('research.breeding.seed.production.columns.operatorName')"
              min-width="110"
            />
            <el-table-column
              prop="produceStatus"
              :label="$t('research.breeding.seed.production.columns.produceStatus')"
              min-width="180"
              align="center"
            >
              <template #default="{ row }">
                <el-tag type="success" size="small">
                  {{ row.produceStatus }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('common.actions')"
              width="240"
              fixed="right"
            >
              <template #default="{ row }">
                <div class="action-buttons">
                  <el-button type="primary" size="small" @click="handleView(row)">
                    <i class="ri-eye-line"></i>
                    <span class="btn-text">{{ $t('common.view') }}</span>
                  </el-button>
                  <!-- <el-button type="danger" size="small" @click="handleDelete(row)">
                    <i class="ri-delete-bin-line"></i>
                    <span class="btn-text">{{ $t('common.delete') }}</span>
                  </el-button> -->
                </div>
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
              @current-change="handleCurrentChange"
            />
          </div>
        </div>

        <!-- 移动端卡片 -->
        <div class="mobile-card-list mobile-only">
          <div
            v-for="item in filteredList"
            :key="item.produceBatchName"
            class="mobile-card"
            @click="handleView(item)"
          >
            <div class="mobile-card-header">
              <div class="mobile-card-title">
                <i class="ri-seedling-line"></i>
                <span>{{ item.varietyName }}</span>
              </div>
              <el-tag type="success" size="small">{{ item.produceStatus }}</el-tag>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breeding.seed.production.columns.produceBatchId') }}:</span>
                <span class="value">{{ item.produceBatchId }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breeding.seed.production.columns.produceBatchName') }}:</span>
                <span class="value">{{ item.produceBatchName }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breeding.seed.production.columns.cropType') }}:</span>
                <span class="value">{{ getLabelByValue('crop_type', item.cropType) }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breeding.seed.production.columns.time') }}:</span>
                <span class="value">{{ item.time }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breeding.seed.production.columns.inputSeedQuantity') }}:</span>
                <span class="value">{{ item.inputSeedQuantity }} kg</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breeding.seed.production.columns.fromSeedLevel') }}:</span>
                <span class="value">{{ item.fromSeedLevel }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.breeding.seed.production.columns.toSeedLevel') }}:</span>
                <span class="value">{{ item.toSeedLevel }}</span>
              </div>
            </div>
            <div class="mobile-card-footer">
              <span class="create-time">{{ item.createTime }}</span>
              <div class="card-actions" @click.stop>
                <el-button link type="danger" size="small" @click="handleDelete(item)">
                  <i class="ri-delete-bin-line"></i> {{ $t('common.delete') }}
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
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </InfoCard>
        </div>
      </template>

      <!-- 新增表单视图 -->
      <ProductionForm
        v-if="showForm"
        :is-edit="false"
        @cancel="showForm = false"
        @success="handleFormSuccess"
      />

      <!-- 详情视图 -->
      <ProductionDetail
        v-if="showDetail"
        :data="currentRow"
        @back="showDetail = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBreedSeedProduceList, deleteBreedSeedProduce } from '@/api/breedSeed'
import { useDict } from '@/hooks/useDict'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import ProductionForm from './form.vue'
import ProductionDetail from './detail.vue'

const { t } = useI18n()

// 使用 useDict hook 获取字典数据
const { options, getLabelByValue, loading: dictLoading } = useDict(['crop_type'])

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
      item.cropType?.toLowerCase().includes(query)
    )
  }

  // 日期范围过滤
  if (dateRange.value && dateRange.value.length === 2) {
    const [start, end] = dateRange.value
    list = list.filter(item => {
      const itemDate = new Date(item.time)
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
    const res = await getBreedSeedProduceList(params)
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

// CRUD 操作
const handleAdd = () => {
  showForm.value = true
  showDetail.value = false
}

const handleEdit = (row) => {
  // 编辑功能暂未实现
  ElMessage.info('编辑功能开发中')
}

const handleView = (row) => {
  currentRow.value = row
  showDetail.value = true
  showForm.value = false
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    t('research.breeding.seed.production.deleteConfirm'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  )
    .then(async () => {
      try {
        const res = await deleteBreedSeedProduce(row.produceBatchId)
        if (res.code === 200) {
          ElMessage.success(t('research.breeding.seed.production.deleteSuccess'))
          loadData()
        } else {
          ElMessage.error(res.msg || t('common.deleteFailed'))
        }
      } catch (error) {
        console.error('Failed to delete production:', error)
        ElMessage.error(t('common.deleteFailed'))
      }
    })
    .catch(() => {})
}

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
