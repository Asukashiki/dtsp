<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader icon="ri-bar-chart-box-line" :title="$t('research.detection.fieldDetection.title')"
        :subtitle="$t('research.detection.fieldDetection.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('research.detection.batchId')">
              <el-select v-model="filterForm.batchId" :placeholder="$t('research.detection.allBatches')" clearable
                filterable>
                <el-option-group :label="$t('research.detection.batchSelector.basicBatches')">
                  <el-option v-for="batch in basicBatches" :key="batch.batchId" :label="batch.batchId"
                    :value="batch.batchId" />
                </el-option-group>
                <el-option-group :label="$t('research.detection.batchSelector.c1Batches')">
                  <el-option v-for="batch in c1Batches" :key="batch.batchId" :label="batch.batchId"
                    :value="batch.batchId" />
                </el-option-group>
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('research.detection.seedClass')">
              <el-select v-model="filterForm.seedClass" :placeholder="$t('research.detection.allSeedClasses')"
                clearable>
                <el-option label="Basic" value="Basic" />
                <el-option label="C1" value="C1" />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('research.c1BreedingBatch.tracking.result')">
              <el-select v-model="filterForm.trackingResult" :placeholder="$t('research.detection.allResults')"
                clearable>
                <el-option :label="$t('research.c1BreedingBatch.tracking.resultNormal')" value="01" />
                <el-option :label="$t('research.c1BreedingBatch.tracking.resultAbnormal')" value="02" />
                <el-option :label="$t('research.c1BreedingBatch.tracking.resultObserving')" value="03" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('research.detection.fieldDetection.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('research.detection.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="tableData" stripe v-loading="loading">
              <el-table-column prop="trackingId" :label="$t('research.c1BreedingBatch.tracking.trackingId')"
                min-width="180" show-overflow-tooltip />
              <el-table-column prop="batchId" :label="$t('research.detection.batchId')" min-width="160"
                show-overflow-tooltip />
              <el-table-column prop="seedClass" :label="$t('research.detection.seedClass')" min-width="100"
                align="center">
                <template #default="{ row }">
                  <el-tag :type="row.seedClass === 'Basic' ? 'success' : 'warning'" size="small">
                    {{ row.seedClass }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="lotId" :label="$t('research.c1BreedingBatch.tracking.lotId')" min-width="140"
                show-overflow-tooltip />
              <el-table-column prop="stage" :label="$t('research.c1BreedingBatch.tracking.stage')" min-width="120"
                align="center" />
              <el-table-column prop="inspectionValue" :label="$t('research.c1BreedingBatch.tracking.inspectionValue')"
                min-width="100" align="center" />
              <el-table-column prop="location" :label="$t('research.c1BreedingBatch.tracking.location')" min-width="150"
                show-overflow-tooltip />
              <el-table-column prop="trackingResult" :label="$t('research.c1BreedingBatch.tracking.result')"
                min-width="100" align="center">
                <template #default="{ row }">
                  <el-tag :type="getResultTagType(row.trackingResult)" size="small">
                    {{ getResultText(row.trackingResult) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="startDate" :label="$t('research.c1BreedingBatch.tracking.startDate')"
                min-width="120" align="center" />
              <el-table-column :label="$t('common.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <el-button link type="primary" @click="handleView(row)">{{ $t('common.view') }}</el-button>
                  <el-button link type="primary" @click="handleEdit(row)">{{ $t('common.edit') }}</el-button>
                  <el-button link type="danger" @click="handleDelete(row.id)">{{ $t('common.delete') }}</el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination v-model:current-page="pagination.pageNum" v-model:page-size="pagination.pageSize"
                :page-sizes="[10, 20, 50, 100]" :total="pagination.total"
                layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                @current-change="handlePageChange" />
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getTrackingList, deleteTracking, getBatchesForDetection } from '@/api/detection'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const tableData = ref([])
const allBatches = ref([])

// 筛选表单
const filterForm = ref({
  batchId: '',
  seedClass: '',
  trackingResult: ''
})

// 分页
const pagination = ref({
  pageNum: 1,
  pageSize: 20,
  total: 0
})

// 分组批次
const basicBatches = computed(() => allBatches.value.filter(b => b.seedClass === 'Basic'))
const c1Batches = computed(() => allBatches.value.filter(b => b.seedClass === 'C1'))

// 加载批次列表
const loadBatches = async () => {
  try {
    const res = await getBatchesForDetection()
    if (res.code === 200 && res.data) {
      allBatches.value = res.data
    }
  } catch (error) {
    console.error('Load batches error:', error)
  }
}

// 加载列表数据
const loadList = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: pagination.value.pageNum,
      pageSize: pagination.value.pageSize
    }

    // 添加筛选条件
    if (filterForm.value.batchId) {
      params.batchId = filterForm.value.batchId
    }
    if (filterForm.value.seedClass) {
      params.seedClass = filterForm.value.seedClass
    }
    if (filterForm.value.trackingResult) {
      params.trackingResult = filterForm.value.trackingResult
    }

    const response = await getTrackingList(params)
    if (response.code === 200) {
      tableData.value = response.data?.records || []
      pagination.value.total = response.data?.total || 0
    }
  } catch (error) {
    console.error('Load list error:', error)
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.value.pageNum = 1
  loadList()
}

// 重置
const handleReset = () => {
  filterForm.value = {
    batchId: '',
    seedClass: '',
    trackingResult: ''
  }
  pagination.value.pageNum = 1
  loadList()
}

// 新增 - 跳转到新增页面
const handleAdd = () => {
  router.push('/research/field-detection/add')
}

// 查看 - 跳转到详情页面
const handleView = (row) => {
  router.push(`/research/field-detection/detail/${row.id}`)
}

// 编辑 - 跳转到编辑页面
const handleEdit = (row) => {
  router.push({
    path: '/research/field-detection/add',
    query: { id: row.id, batchId: row.batchId, seedClass: row.seedClass }
  })
}

// 删除
const handleDelete = (id) => {
  ElMessageBox.confirm(t('research.c1BreedingBatch.tracking.deleteConfirm'), t('common.warning'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(async () => {
    const response = await deleteTracking([id])
    if (response.code === 200) {
      ElMessage.success(t('common.deleteSuccess'))
      loadList()
    }
  }).catch(() => { })
}

// 分页
const handleSizeChange = () => {
  pagination.value.pageNum = 1
  loadList()
}

const handlePageChange = () => {
  loadList()
}

// 结果标签
const getResultText = (result) => ({
  '01': t('research.c1BreedingBatch.tracking.resultNormal'),
  '02': t('research.c1BreedingBatch.tracking.resultAbnormal'),
  '03': t('research.c1BreedingBatch.tracking.resultObserving')
}[result] || result)

const getResultTagType = (result) => ({
  '01': 'success',
  '02': 'danger',
  '03': 'warning'
}[result] || 'info')

onMounted(() => {
  loadBatches()
  loadList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
