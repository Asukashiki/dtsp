<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-test-tube-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.trial.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.breedingData.trial.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('research.breedingData.trial.list') }}</span>
            </div>
            <div class="header-actions">
              <el-button type="danger" :disabled="selectedIds.length === 0" @click="handleBatchDelete">
                <i class="ri-delete-bin-line"></i>
                {{ $t('common.batchDelete') }}
              </el-button>
              <el-button type="primary" @click="handleAdd">
                <i class="ri-add-line"></i>
                {{ $t('research.breedingData.trial.add') }}
              </el-button>
            </div>
          </div>

          <div class="card-body">
            <!-- 搜索筛选区 -->
            <div class="search-section">
              <el-select
                v-model="queryParams.batchId"
                :placeholder="$t('research.breedingData.trial.placeholder.batchId')"
                clearable
                class="filter-select"
                @change="handleQuery"
              >
                <el-option v-for="item in batchOptions" :key="item.batchId" :label="item.batchName" :value="item.batchId" />
              </el-select>
              <el-input
                v-model="queryParams.trialName"
                :placeholder="$t('research.breedingData.trial.placeholder.trialName')"
                clearable
                class="search-input"
                @change="handleQuery"
              >
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
              <el-select
                v-model="queryParams.cropType"
                :placeholder="$t('research.breedingData.trial.placeholder.cropType')"
                clearable
                class="filter-select"
                @change="handleQuery"
              >
                <el-option v-for="item in cropTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-input
                v-model="queryParams.varietyName"
                :placeholder="$t('research.breedingData.trial.placeholder.varietyName')"
                clearable
                class="search-input"
                @change="handleQuery"
              />
            </div>

            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table :data="dataList" stripe v-loading="loading" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" />
                <el-table-column prop="batchId" :label="$t('research.breedingData.trial.columns.batchId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="trialName" :label="$t('research.breedingData.trial.columns.trialName')" min-width="160" show-overflow-tooltip />
                <el-table-column prop="cropType" :label="$t('research.breedingData.trial.columns.cropType')" min-width="100" />
                <el-table-column prop="varietyName" :label="$t('research.breedingData.trial.columns.varietyName')" min-width="120" show-overflow-tooltip />
                <el-table-column prop="startDate" :label="$t('research.breedingData.trial.columns.startDate')" min-width="120" />
                <el-table-column prop="season" :label="$t('research.breedingData.trial.columns.season')" min-width="100" />
                <el-table-column prop="plotCount" :label="$t('research.breedingData.trial.columns.plotCount')" min-width="100" />
                <el-table-column prop="createTime" :label="$t('common.createTime')" min-width="160" />
                <el-table-column :label="$t('research.breedingData.trial.columns.actions')" width="200" fixed="right">
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
              <div v-for="item in dataList" :key="item.trialId" class="mobile-card">
                <div class="mobile-card-header">
                  <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
                  <div class="mobile-card-title">
                    <i class="ri-flask-line"></i>
                    <span>{{ item.trialName }}</span>
                  </div>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.trial.columns.batchId') }}:</span>
                    <span class="value">{{ item.batchId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.trial.columns.cropType') }}:</span>
                    <span class="value">{{ item.cropType }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.trial.columns.varietyName') }}:</span>
                    <span class="value">{{ item.varietyName }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.trial.columns.startDate') }}:</span>
                    <span class="value">{{ item.startDate }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.trial.columns.season') }}:</span>
                    <span class="value">{{ item.season }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.trial.columns.plotCount') }}:</span>
                    <span class="value">{{ item.plotCount }}</span>
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
import { getTrialBasicList, deleteTrialBasic, getBatchOptions } from '@/api/breedingData'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const selectedIds = ref([])
const batchOptions = ref([])

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  batchId: '',
  trialName: '',
  cropType: '',
  varietyName: ''
})

const cropTypeOptions = [
  { label: 'rice', value: 'rice' },
  { label: 'wheat', value: 'wheat' },
  { label: 'corn', value: 'corn' },
  { label: 'soybean', value: 'soybean' },
  { label: 'cotton', value: 'cotton' }
]

const getList = async () => {
  loading.value = true
  try {
    const res = await getTrialBasicList(queryParams)
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

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.trialId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.trialId)) {
      selectedIds.value.push(item.trialId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.trialId)
  }
}

const handleAdd = () => {
  router.push('/research/breeding-data/trial/add')
}

const handleView = (row) => {
  router.push(`/research/breeding-data/trial/detail/${row.trialId}`)
}

const handleEdit = (row) => {
  router.push(`/research/breeding-data/trial/edit/${row.trialId}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(t('research.breedingData.trial.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deleteTrialBasic(row.trialId)
    ElMessage.success(t('research.breedingData.trial.deleteSuccess'))
    getList()
  }).catch(() => {})
}

const handleBatchDelete = () => {
  ElMessageBox.confirm(t('research.breedingData.trial.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deleteTrialBasic(selectedIds.value.join(','))
    ElMessage.success(t('research.breedingData.trial.deleteSuccess'))
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
@use '@/assets/styles/page-common.scss';
</style>
