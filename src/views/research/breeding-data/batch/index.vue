<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-list-check-2"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.batch.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.breedingData.batch.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('research.breedingData.batch.list') }}</span>
            </div>
            <div class="header-actions">
              <el-button type="danger" :disabled="selectedIds.length === 0" @click="handleBatchDelete">
                <i class="ri-delete-bin-line"></i>
                {{ $t('common.batchDelete') }}
              </el-button>
              <el-button type="primary" @click="handleAdd">
                <i class="ri-add-line"></i>
                {{ $t('research.breedingData.batch.add') }}
              </el-button>
            </div>
          </div>

          <div class="card-body">
            <!-- 搜索筛选区 -->
            <div class="search-section">
              <el-input
                v-model="queryParams.batchId"
                :placeholder="$t('research.breedingData.batch.columns.batchId')"
                clearable
                class="search-input"
                @change="handleQuery"
              >
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
              <el-input
                v-model="queryParams.batchName"
                :placeholder="$t('research.breedingData.batch.placeholder.batchName')"
                clearable
                class="search-input"
                @change="handleQuery"
              />
              <el-select
                v-model="queryParams.cropType"
                :placeholder="$t('research.breedingData.batch.placeholder.cropType')"
                clearable
                class="filter-select"
                @change="handleQuery"
              >
                <el-option v-for="item in cropTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-input
                v-model="queryParams.varietyName"
                :placeholder="$t('research.breedingData.batch.placeholder.varietyName')"
                clearable
                class="search-input"
                @change="handleQuery"
              />
            </div>

            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table :data="dataList" stripe v-loading="loading" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" />
                <el-table-column prop="batchId" :label="$t('research.breedingData.batch.columns.batchId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="batchName" :label="$t('research.breedingData.batch.columns.batchName')" min-width="160" show-overflow-tooltip />
                <el-table-column prop="cropType" :label="$t('research.breedingData.batch.columns.cropType')" min-width="100" />
                <el-table-column prop="varietyName" :label="$t('research.breedingData.batch.columns.varietyName')" min-width="120" show-overflow-tooltip />
                <el-table-column prop="breedingMethod" :label="$t('research.breedingData.batch.columns.breedingMethod')" min-width="100" />
                <el-table-column prop="personInCharge" :label="$t('research.breedingData.batch.columns.personInCharge')" min-width="100" />
                <el-table-column prop="startDate" :label="$t('research.breedingData.batch.columns.startDate')" min-width="110" />
                <el-table-column prop="endDate" :label="$t('research.breedingData.batch.columns.endDate')" min-width="110" />
                <el-table-column :label="$t('research.breedingData.batch.columns.actions')" width="200" fixed="right">
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button link type="primary" @click="handleView(row)">
                        <i class="ri-eye-line"></i>{{ $t('common.view') }}
                      </el-button>
                      <el-button link type="primary" @click="handleEdit(row)">
                        <i class="ri-edit-line"></i>{{ $t('common.edit') }}
                      </el-button>
                      <el-button link type="danger" @click="handleDelete(row)">
                        <i class="ri-delete-bin-line"></i>{{ $t('common.delete') }}
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>

              <div class="pagination-wrapper">
                <el-pagination
                  v-model:current-page="queryParams.pageNum"
                  v-model:page-size="queryParams.pageSize"
                  :page-sizes="[10, 20, 50]"
                  :total="total"
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="getList"
                  @current-change="getList"
                />
              </div>
            </div>

            <!-- 移动端卡片 -->
            <div class="mobile-card-list mobile-only">
              <div v-for="item in dataList" :key="item.dataId" class="mobile-card">
                <div class="mobile-card-header">
                  <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
                  <div class="mobile-card-title">
                    <i class="ri-seedling-line"></i>
                    <span>{{ item.batchName }}</span>
                  </div>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.batch.columns.batchId') }}:</span>
                    <span class="value">{{ item.batchId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.batch.columns.cropType') }}:</span>
                    <span class="value">{{ item.cropType }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.batch.columns.varietyName') }}:</span>
                    <span class="value">{{ item.varietyName }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.batch.columns.personInCharge') }}:</span>
                    <span class="value">{{ item.personInCharge }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.batch.columns.startDate') }}:</span>
                    <span class="value">{{ item.startDate }} ~ {{ item.endDate }}</span>
                  </div>
                </div>
                <div class="mobile-card-footer">
                  <el-button size="small" @click="handleView(item)">
                    <i class="ri-eye-line"></i>{{ $t('common.view') }}
                  </el-button>
                  <el-button size="small" type="primary" @click="handleEdit(item)">
                    <i class="ri-edit-line"></i>{{ $t('common.edit') }}
                  </el-button>
                  <el-button size="small" type="danger" @click="handleDelete(item)">
                    <i class="ri-delete-bin-line"></i>{{ $t('common.delete') }}
                  </el-button>
                </div>
              </div>

              <div class="pagination-wrapper">
                <el-pagination
                  v-model:current-page="queryParams.pageNum"
                  v-model:page-size="queryParams.pageSize"
                  :total="total"
                  layout="prev, pager, next"
                  small
                  @current-change="getList"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBreedingBatchList, deleteBreedingBatch } from '@/api/breedingData'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const selectedIds = ref([])

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  batchId: '',
  batchName: '',
  cropType: '',
  varietyName: ''
})

const cropTypeOptions = [
  { label: '水稻', value: 'rice' },
  { label: '小麦', value: 'wheat' },
  { label: '玉米', value: 'corn' },
  { label: '大豆', value: 'soybean' },
  { label: '棉花', value: 'cotton' }
]

const getList = async () => {
  loading.value = true
  try {
    const res = await getBreedingBatchList(queryParams)
    dataList.value = res.rows || []
    total.value = res.total || 0
  } catch (error) {
    console.error('获取列表失败:', error)
  } finally {
    loading.value = false
  }
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.dataId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.dataId)) {
      selectedIds.value.push(item.dataId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.dataId)
  }
}

const handleAdd = () => {
  router.push('/research/breeding-data/batch/add')
}

const handleView = (row) => {
  router.push(`/research/breeding-data/batch/detail/${row.dataId}`)
}

const handleEdit = (row) => {
  router.push(`/research/breeding-data/batch/edit/${row.dataId}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(t('research.breedingData.batch.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deleteBreedingBatch(row.dataId)
    ElMessage.success(t('research.breedingData.batch.deleteSuccess'))
    getList()
  }).catch(() => {})
}

const handleBatchDelete = () => {
  ElMessageBox.confirm(t('research.breedingData.batch.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deleteBreedingBatch(selectedIds.value.join(','))
    ElMessage.success(t('research.breedingData.batch.deleteSuccess'))
    selectedIds.value = []
    getList()
  }).catch(() => {})
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
</style>
