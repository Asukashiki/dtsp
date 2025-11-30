<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon"><i class="ri-plant-line"></i></div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.farming.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.breedingData.farming.subtitle') }}</p>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-file-list-3-line"></i><span>{{ $t('research.breedingData.farming.list') }}</span></div>
            <div class="header-actions">
              <el-button type="danger" :disabled="selectedIds.length === 0" @click="handleBatchDelete">
                <i class="ri-delete-bin-line"></i>{{ $t('common.batchDelete') }}
              </el-button>
              <el-button type="primary" @click="handleAdd">
                <i class="ri-add-line"></i>{{ $t('research.breedingData.farming.add') }}
              </el-button>
            </div>
          </div>

          <div class="card-body">
            <div class="search-section">
              <el-select v-model="queryParams.batchId" :placeholder="$t('research.breedingData.farming.placeholder.batchId')" clearable class="filter-select" @change="handleBatchChange">
                <el-option v-for="item in batchOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-select v-model="queryParams.trialId" :placeholder="$t('research.breedingData.farming.placeholder.trialId')" clearable class="filter-select" @change="handleQuery">
                <el-option v-for="item in trialOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-select v-model="queryParams.operationType" :placeholder="$t('research.breedingData.farming.placeholder.operationType')" clearable class="filter-select" @change="handleQuery">
                <el-option v-for="item in operationTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-date-picker v-model="queryParams.operationTime" type="date" :placeholder="$t('research.breedingData.farming.placeholder.operationTime')" clearable value-format="YYYY-MM-DD" class="filter-select" @change="handleQuery" />
            </div>

            <div class="table-wrapper pc-only">
              <el-table :data="dataList" stripe v-loading="loading" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" />
                <el-table-column prop="batchId" :label="$t('research.breedingData.farming.columns.batchId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="trialId" :label="$t('research.breedingData.farming.columns.trialId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="operationType" :label="$t('research.breedingData.farming.columns.operationType')" min-width="120" />
                <el-table-column prop="operationTime" :label="$t('research.breedingData.farming.columns.operationTime')" min-width="120" />
                <el-table-column prop="operationDesc" :label="$t('research.breedingData.farming.columns.operationDesc')" min-width="200" show-overflow-tooltip />
                <el-table-column prop="createTime" :label="$t('common.createTime')" min-width="160" />
                <el-table-column :label="$t('research.breedingData.farming.columns.actions')" width="200" fixed="right">
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button link type="primary" @click="handleView(row)"><i class="ri-eye-line"></i>{{ $t('common.view') }}</el-button>
                      <el-button link type="primary" @click="handleEdit(row)"><i class="ri-edit-line"></i>{{ $t('common.edit') }}</el-button>
                      <el-button link type="danger" @click="handleDelete(row)"><i class="ri-delete-bin-line"></i>{{ $t('common.delete') }}</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>

              <div class="pagination-wrapper">
                <el-pagination v-model:current-page="queryParams.pageNum" v-model:page-size="queryParams.pageSize" :page-sizes="[10, 20, 50]" :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="getList" @current-change="getList" />
              </div>
            </div>

            <div class="mobile-card-list mobile-only">
              <div v-for="item in dataList" :key="item.farmingId" class="mobile-card">
                <div class="mobile-card-header">
                  <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
                  <div class="mobile-card-title"><i class="ri-seedling-line"></i><span>{{ item.operationType }} - {{ item.operationTime }}</span></div>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row"><span class="label">{{ $t('research.breedingData.farming.columns.batchId') }}:</span><span class="value">{{ item.batchId }}</span></div>
                  <div class="mobile-card-row"><span class="label">{{ $t('research.breedingData.farming.columns.trialId') }}:</span><span class="value">{{ item.trialId }}</span></div>
                  <div class="mobile-card-row"><span class="label">{{ $t('research.breedingData.farming.columns.operationDesc') }}:</span><span class="value">{{ item.operationDesc }}</span></div>
                </div>
                <div class="mobile-card-footer">
                  <el-button size="small" @click="handleView(item)"><i class="ri-eye-line"></i>{{ $t('common.view') }}</el-button>
                  <el-button size="small" type="primary" @click="handleEdit(item)"><i class="ri-edit-line"></i>{{ $t('common.edit') }}</el-button>
                  <el-button size="small" type="danger" @click="handleDelete(item)"><i class="ri-delete-bin-line"></i>{{ $t('common.delete') }}</el-button>
                </div>
              </div>
              <div class="pagination-wrapper">
                <el-pagination v-model:current-page="queryParams.pageNum" v-model:page-size="queryParams.pageSize" :total="total" layout="prev, pager, next" small @current-change="getList" />
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
import { getFarmingRecordList, deleteFarmingRecord, getBatchOptions, getTrialOptions } from '@/api/breedingData'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const selectedIds = ref([])
const batchOptions = ref([])
const trialOptions = ref([])

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  batchId: '',
  trialId: '',
  operationType: '',
  operationTime: ''
})

const operationTypeOptions = [
  { label: '施肥', value: 'fertilizer' },
  { label: '灌溉', value: 'irrigation' },
  { label: '病虫害防治', value: 'pest_control' },
  { label: '除草', value: 'weeding' },
  { label: '整地', value: 'tillage' },
  { label: '收获', value: 'harvest' }
]

const getList = async () => {
  loading.value = true
  try {
    const res = await getFarmingRecordList(queryParams)
    dataList.value = res.rows || []
    total.value = res.total || 0
  } catch (error) {
    console.error('获取列表失败:', error)
  } finally {
    loading.value = false
  }
}

const loadBatchOptions = async () => {
  try {
    const res = await getBatchOptions()
    batchOptions.value = res.data || []
  } catch (error) {
    console.error('获取批次选项失败:', error)
  }
}

const loadTrialOptions = async (batchId) => {
  if (!batchId) {
    trialOptions.value = []
    return
  }
  try {
    const res = await getTrialOptions(batchId)
    trialOptions.value = res.data || []
  } catch (error) {
    console.error('获取试验选项失败:', error)
  }
}

const handleBatchChange = (value) => {
  queryParams.trialId = ''
  loadTrialOptions(value)
  handleQuery()
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.farmingId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.farmingId)) {
      selectedIds.value.push(item.farmingId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.farmingId)
  }
}

const handleAdd = () => router.push('/research/breeding-data/farming/add')
const handleView = (row) => router.push(`/research/breeding-data/farming/detail/${row.farmingId}`)
const handleEdit = (row) => router.push(`/research/breeding-data/farming/edit/${row.farmingId}`)

const handleDelete = (row) => {
  ElMessageBox.confirm(t('research.breedingData.farming.deleteConfirm'), t('common.warning'), { type: 'warning' }).then(async () => {
    await deleteFarmingRecord(row.farmingId)
    ElMessage.success(t('research.breedingData.farming.deleteSuccess'))
    getList()
  }).catch(() => {})
}

const handleBatchDelete = () => {
  ElMessageBox.confirm(t('research.breedingData.farming.deleteConfirm'), t('common.warning'), { type: 'warning' }).then(async () => {
    await deleteFarmingRecord(selectedIds.value.join(','))
    ElMessage.success(t('research.breedingData.farming.deleteSuccess'))
    selectedIds.value = []
    getList()
  }).catch(() => {})
}

onMounted(() => {
  loadBatchOptions()
  getList()
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/page-common.scss';
</style>
