<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon"><i class="ri-global-line"></i></div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.environment.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.breedingData.environment.subtitle') }}</p>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-file-list-3-line"></i><span>{{ $t('research.breedingData.environment.list') }}</span></div>
            <div class="header-actions">
              <el-button type="danger" :disabled="selectedIds.length === 0" @click="handleBatchDelete">
                <i class="ri-delete-bin-line"></i>{{ $t('common.batchDelete') }}
              </el-button>
              <el-button type="primary" @click="handleAdd">
                <i class="ri-add-line"></i>{{ $t('research.breedingData.environment.add') }}
              </el-button>
            </div>
          </div>

          <div class="card-body">
            <div class="search-section">
              <el-select v-model="queryParams.batchId" :placeholder="$t('research.breedingData.environment.placeholder.batchId')" clearable class="filter-select" @change="handleBatchChange">
                <el-option v-for="item in batchOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-select v-model="queryParams.trialId" :placeholder="$t('research.breedingData.environment.placeholder.trialId')" clearable class="filter-select" @change="handleQuery">
                <el-option v-for="item in trialOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-select v-model="queryParams.dataType" :placeholder="$t('research.breedingData.environment.placeholder.dataType')" clearable class="filter-select" @change="handleQuery">
                <el-option label="土壤数据" value="soil" />
                <el-option label="气候数据" value="climate" />
                <el-option label="水文数据" value="water" />
              </el-select>
              <el-date-picker v-model="queryParams.collectTime" type="date" :placeholder="$t('research.breedingData.environment.placeholder.collectTime')" clearable value-format="YYYY-MM-DD" class="filter-select" @change="handleQuery" />
            </div>

            <div class="table-wrapper pc-only">
              <el-table :data="dataList" stripe v-loading="loading" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" />
                <el-table-column prop="batchId" :label="$t('research.breedingData.environment.columns.batchId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="trialId" :label="$t('research.breedingData.environment.columns.trialId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="groundId" :label="$t('research.breedingData.environment.columns.groundId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="dataType" :label="$t('research.breedingData.environment.columns.dataType')" min-width="100" />
                <el-table-column prop="collectTime" :label="$t('research.breedingData.environment.columns.collectTime')" min-width="120" />
                <el-table-column prop="dataSource" :label="$t('research.breedingData.environment.columns.dataSource')" min-width="120" />
                <el-table-column prop="createTime" :label="$t('common.createTime')" min-width="160" />
                <el-table-column :label="$t('research.breedingData.environment.columns.actions')" width="200" fixed="right">
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
              <div v-for="item in dataList" :key="item.envId" class="mobile-card">
                <div class="mobile-card-header">
                  <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
                  <div class="mobile-card-title"><i class="ri-temp-hot-line"></i><span>{{ item.dataType }} - {{ item.collectTime }}</span></div>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row"><span class="label">{{ $t('research.breedingData.environment.columns.batchId') }}:</span><span class="value">{{ item.batchId }}</span></div>
                  <div class="mobile-card-row"><span class="label">{{ $t('research.breedingData.environment.columns.trialId') }}:</span><span class="value">{{ item.trialId }}</span></div>
                  <div class="mobile-card-row"><span class="label">{{ $t('research.breedingData.environment.columns.groundId') }}:</span><span class="value">{{ item.groundId }}</span></div>
                  <div class="mobile-card-row"><span class="label">{{ $t('research.breedingData.environment.columns.dataSource') }}:</span><span class="value">{{ item.dataSource }}</span></div>
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
import { getEnvironmentDataList, deleteEnvironmentData, getBatchOptions, getTrialOptions } from '@/api/breedingData'

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
  dataType: '',
  collectTime: ''
})

const getList = async () => {
  loading.value = true
  try {
    const res = await getEnvironmentDataList(queryParams)
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
  selectedIds.value = selection.map(item => item.envId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.envId)) {
      selectedIds.value.push(item.envId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.envId)
  }
}

const handleAdd = () => router.push('/research/breeding-data/environment/add')
const handleView = (row) => router.push(`/research/breeding-data/environment/detail/${row.envId}`)
const handleEdit = (row) => router.push(`/research/breeding-data/environment/edit/${row.envId}`)

const handleDelete = (row) => {
  ElMessageBox.confirm(t('research.breedingData.environment.deleteConfirm'), t('common.warning'), { type: 'warning' }).then(async () => {
    await deleteEnvironmentData(row.envId)
    ElMessage.success(t('research.breedingData.environment.deleteSuccess'))
    getList()
  }).catch(() => {})
}

const handleBatchDelete = () => {
  ElMessageBox.confirm(t('research.breedingData.environment.deleteConfirm'), t('common.warning'), { type: 'warning' }).then(async () => {
    await deleteEnvironmentData(selectedIds.value.join(','))
    ElMessage.success(t('research.breedingData.environment.deleteSuccess'))
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
