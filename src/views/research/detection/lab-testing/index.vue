<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader icon="ri-flask-line" :title="$t('research.menu.labTesting')"
        :subtitle="$t('research.menu.labTestingSubtitle')" />

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

            <SearchItem :label="$t('research.c1BreedingBatch.test.testType')">
              <el-select v-model="filterForm.testType" :placeholder="$t('research.detection.allResults')" clearable>
                <el-option label="Germination" value="GERMINATION" />
                <el-option label="Purity" value="PURITY" />
                <el-option label="Moisture" value="MOISTURE" />
                <el-option label="Vigor" value="VIGOR" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('research.detection.labTesting.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('research.detection.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="tableData" stripe v-loading="loading">
              <el-table-column prop="testId" :label="$t('research.c1BreedingBatch.test.testId')" min-width="180"
                show-overflow-tooltip />
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
              <el-table-column prop="lotId" :label="$t('research.c1BreedingBatch.test.lotId')" min-width="140"
                show-overflow-tooltip />
              <el-table-column prop="testType" :label="$t('research.c1BreedingBatch.test.testType')" min-width="120"
                align="center" />
              <el-table-column prop="testValue" :label="$t('research.c1BreedingBatch.test.testValue')" min-width="100"
                align="center">
                <template #default="{ row }">
                  {{ row.testValue }}{{ row.unit || '' }}
                </template>
              </el-table-column>
              <el-table-column prop="passStatus" :label="$t('research.c1BreedingBatch.test.passStatus')" min-width="100"
                align="center">
                <template #default="{ row }">
                  <el-tag :type="row.passStatus === 'TRUE' ? 'success' : 'danger'" size="small">
                    {{ row.passStatus === 'TRUE' ? $t('research.c1BreedingBatch.test.passed') :
                      $t('research.c1BreedingBatch.test.failed') }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="testDate" :label="$t('research.c1BreedingBatch.test.testDate')" min-width="120"
                align="center" />
              <el-table-column prop="tester" :label="$t('research.c1BreedingBatch.test.tester')" min-width="120"
                show-overflow-tooltip />
              <el-table-column :label="$t('common.actions')" width="300" fixed="right" align="center">
                <template #default="{ row }">
                  <div class="action-buttons">
                    <el-button size="small" type="primary" @click="handleView(row)">
                      <i class="ri-eye-line"></i>
                      <span class="btn-text">{{ $t('common.view') }}</span>
                    </el-button>
                    <el-button size="small" type="primary" @click="handleEdit(row)">
                      <i class="ri-edit-line"></i>
                      <span class="btn-text">{{ $t('common.edit') }}</span>
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(row.id)">
                      <i class="ri-delete-bin-line"></i>
                      <span class="btn-text">{{ $t('common.delete') }}</span>
                    </el-button>
                  </div>
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
import { getTestList, deleteTest, getBatchesForDetection } from '@/api/detection'
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
  testType: ''
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
    if (filterForm.value.testType) {
      params.testType = filterForm.value.testType
    }

    const response = await getTestList(params)
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
    testType: ''
  }
  pagination.value.pageNum = 1
  loadList()
}

// 新增 - 跳转到新增页面
const handleAdd = () => {
  router.push('/research/lab-testing/add')
}

// 查看 - 跳转到详情页面
const handleView = (row) => {
  router.push(`/research/lab-testing/detail/${row.id}`)
}

// 编辑 - 跳转到编辑页面
const handleEdit = (row) => {
  router.push({
    path: '/research/lab-testing/add',
    query: { id: row.id, batchId: row.batchId, seedClass: row.seedClass }
  })
}

// 删除
const handleDelete = (id) => {
  ElMessageBox.confirm(t('research.c1BreedingBatch.test.deleteConfirm'), t('common.warning'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(async () => {
    const response = await deleteTest([id])
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

onMounted(() => {
  loadBatches()
  loadList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';

/* 操作按钮样式 */
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
