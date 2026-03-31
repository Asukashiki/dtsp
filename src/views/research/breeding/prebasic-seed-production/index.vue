<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-seedling-line"
        :title="$t('prebasicSeedProduction.title')"
        :subtitle="$t('prebasicSeedProduction.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="loadData" @reset="handleReset">
            <SearchItem :label="$t('prebasicSeedProduction.columns.varietyName')">
              <el-input
                v-model="searchQuery"
                :placeholder="$t('prebasicSeedProduction.searchPlaceholder')"
                clearable
                class="search-input">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('prebasicSeedProduction.columns.time')">
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
        <InfoCard :title="$t('prebasicSeedProduction.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('prebasicSeedProduction.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="filteredList" stripe v-loading="loading" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column
                prop="produceBatchId"
                :label="$t('prebasicSeedProduction.columns.produceBatchId')"
                min-width="260"
                show-overflow-tooltip />
              <el-table-column
                prop="produceBatchName"
                :label="$t('prebasicSeedProduction.columns.produceBatchName')"
                min-width="210"
                show-overflow-tooltip />
              <el-table-column
                prop="breedBatchName"
                :label="$t('prebasicSeedProduction.columns.breedBatchName')"
                min-width="200"
                show-overflow-tooltip />
              <el-table-column
                prop="varietyName"
                :label="$t('prebasicSeedProduction.columns.varietyName')"
                min-width="150"
                show-overflow-tooltip />
              <el-table-column
                prop="cropType"
                :label="$t('prebasicSeedProduction.columns.cropType')"
                min-width="120"
                align="center">
                <template #default="{ row }">
                  {{ getCropTypeDisplay(row.cropType) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="time"
                :label="$t('prebasicSeedProduction.columns.time')"
                min-width="150" />
              <el-table-column
                prop="landName"
                :label="$t('prebasicSeedProduction.columns.landName')"
                min-width="120" />
              <el-table-column
                prop="inputSeedQuantity"
                :label="$t('prebasicSeedProduction.columns.inputSeedQuantity')"
                min-width="180"
                align="right">
                <template #default="{ row }">
                  {{ row.inputSeedQuantity }} kg
                </template>
              </el-table-column>
              <el-table-column
                prop="fromSeedLevel"
                :label="$t('prebasicSeedProduction.columns.fromSeedLevel')"
                min-width="120"
                align="center" />
              <el-table-column
                prop="toSeedLevel"
                :label="$t('prebasicSeedProduction.columns.toSeedLevel')"
                min-width="120"
                align="center" />
              <el-table-column
                prop="operatorName"
                :label="$t('prebasicSeedProduction.columns.operatorName')"
                min-width="110" />
              <el-table-column
                prop="flowStatus"
                :label="$t('prebasicSeedProduction.columns.flowStatus')"
                min-width="120"
                align="center">
                <template #default="{ row }">
                  <el-tag 
                    :type="row.flowStatus === 'S2' ? 'success' : row.flowStatus === 'S10' ? 'danger' : row.flowStatus === 'S3' ? 'warning' : 'primary'" 
                    size="small">
                    {{ getLabelByValue('flow_status', row.flowStatus) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="produceStatus"
                :label="$t('prebasicSeedProduction.columns.produceStatus')"
                min-width="180"
                align="center">
                <template #default="{ row }">
                  <el-tag type="success" size="small">
                    {{ row.produceStatus }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('common.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="row.flowStatus || 'S0'"
                    mode="list"
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

          <!-- 移动端卡片 -->
          <div class="mobile-card-list mobile-only">
            <div
              v-for="item in filteredList"
              :key="item.produceBatchName"
              class="mobile-card">
              <div class="mobile-card-header">
                <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
                <div class="mobile-card-title">
                  <i class="ri-seedling-line"></i>
                  <span>{{ item.varietyName }}</span>
                </div>
                <el-tag 
                  :type="item.flowStatus === 'S2' ? 'success' : item.flowStatus === 'S10' ? 'danger' : item.flowStatus === 'S3' ? 'warning' : 'primary'" 
                  size="small">
                  {{ getLabelByValue('flow_status', item.flowStatus) }}
                </el-tag>
              </div>
              <div class="mobile-card-body">
                <div class="mobile-card-row">
                  <span class="label">{{ $t('prebasicSeedProduction.columns.produceBatchId') }}:</span>
                  <span class="value">{{ item.produceBatchId }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('prebasicSeedProduction.columns.produceBatchName') }}:</span>
                  <span class="value">{{ item.produceBatchName }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('prebasicSeedProduction.columns.cropType') }}:</span>
                  <span class="value">{{ getCropTypeDisplay(item.cropType) }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('prebasicSeedProduction.columns.time') }}:</span>
                  <span class="value">{{ item.time }}</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('prebasicSeedProduction.columns.inputSeedQuantity') }}:</span>
                  <span class="value">{{ item.inputSeedQuantity }} kg</span>
                </div>
                <div class="mobile-card-row">
                  <span class="label">{{ $t('prebasicSeedProduction.columns.produceStatus') }}:</span>
                  <span class="value">
                    <el-tag type="success" size="small">{{ item.produceStatus }}</el-tag>
                  </span>
                </div>
              </div>
              <div class="mobile-card-footer">
                <ActionButtons
                  :workflow-status="item.flowStatus || 'S0'"
                  mode="list"
                  :show-audit="false"
                  @action="(action) => handleAction(item, action)" />
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import ActionButtons from '@/components/workflow/ActionButtons.vue'
import { getPrebasicSeedProduceList, voidPrebasicSeedProduce } from '@/api/prebasicSeed'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const { t } = useI18n()

// 使用 useDict hook 获取字典数据
const { getLabelByValue } = useDict(['crop_type', 'flow_status'])
const getCropTypeDisplay = (value) => getLabelByValue('crop_type', value) || value || '-'

// 数据状态
const loading = ref(false)
const dataList = ref([])
const searchQuery = ref('')
const dateRange = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const selectedIds = ref([])

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
    const res = await getPrebasicSeedProduceList(params)
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

// 选择变化
const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.produceBatchId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.produceBatchId)) {
      selectedIds.value.push(item.produceBatchId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.produceBatchId)
  }
}

// CRUD 操作
const handleAdd = () => {
  router.push('/research/breeding/prebasic-seed-production/add')
}

const handleView = (row) => {
  router.push(`/research/breeding/prebasic-seed-production/detail/${row.produceBatchId}`)
}

const handleEdit = (row) => {
  router.push(`/research/breeding/prebasic-seed-production/edit/${row.produceBatchId}`)
}

const handleVoid = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('prebasicSeedProduction.voidConfirm'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )

    const res = await voidPrebasicSeedProduce(row.produceBatchId)
    if (res.code === 200) {
      ElMessage.success(t('prebasicSeedProduction.voidSuccess'))
      loadData()
    } else {
      ElMessage.error(res.msg || t('common.operationFailed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to void production:', error)
      ElMessage.error(t('common.operationFailed'))
    }
  }
}

// 统一动作处理
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
    case 'edit':
      handleEdit(row)
      break
    case 'cancelBatch':
      handleVoid(row)
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
</style>
