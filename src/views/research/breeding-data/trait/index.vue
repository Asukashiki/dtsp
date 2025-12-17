<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-leaf-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.trait.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.breedingData.trait.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('research.breedingData.trait.list') }}</span>
            </div>
            <div class="header-actions">
              <el-button type="danger" :disabled="selectedIds.length === 0" @click="handleBatchDelete">
                <i class="ri-delete-bin-line"></i>
                {{ $t('common.batchDelete') }}
              </el-button>
              <el-button type="primary" @click="handleAdd">
                <i class="ri-add-line"></i>
                {{ $t('research.breedingData.trait.add') }}
              </el-button>
            </div>
          </div>

          <div class="card-body">
            <!-- 搜索筛选区 -->
            <div class="search-section">
              <div class="search-item">
                <span class="search-label">Batch ID:</span>
                <el-select
                  v-model="queryParams.batchId"
                  placeholder="Please select Batch ID"
                  clearable
                  class="filter-select"
                >
                  <el-option v-for="item in batchOptions" :key="item.batchId" :label="item.batchId" :value="item.batchId" />
                </el-select>
              </div>
              <div class="search-item">
                <span class="search-label">Status:</span>
                <el-select
                  v-model="queryParams.status"
                  placeholder="Select Status"
                  clearable
                  class="filter-select"
                >
                  <el-option label="submit" value="submit" />
                  <el-option label="approve" value="approve" />
                </el-select>
              </div>
              <div class="search-item">
                <span class="search-label">Workflow:</span>
                <el-select
                  v-model="queryParams.workflowStatus"
                  placeholder="Select Workflow Status"
                  clearable
                  class="filter-select"
                >
                  <el-option
                    v-for="opt in options.flow_status || []"
                    :key="opt.value"
                    :label="opt.label"
                    :value="opt.value"
                  />
                </el-select>
              </div>
              <div class="search-item">
                <span class="search-label">Trial ID:</span>
                <el-select
                  v-model="queryParams.trialId"
                  placeholder="Please select Trial ID"
                  clearable
                  class="filter-select"
                >
                  <el-option v-for="item in trialOptions" :key="item.trialId" :label="item.trialId" :value="item.trialId" />
                </el-select>
              </div>
              <div class="search-item">
                <span class="search-label">Observation Date:</span>
                <el-date-picker
                  v-model="queryParams.observationDate"
                  type="date"
                  placeholder="Select Observation Date"
                  clearable
                  value-format="YYYY-MM-DD"
                  class="filter-select"
                />
              </div>
              <div class="search-actions">
                <el-button type="primary" @click="handleQuery">
                  <i class="ri-search-line"></i>{{ $t('common.search') }}
                </el-button>
                <el-button @click="handleReset">
                  <i class="ri-refresh-line"></i>{{ $t('common.reset') }}
                </el-button>
              </div>
            </div>

            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table :data="dataList" stripe v-loading="loading" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" />
                <el-table-column prop="traitRecordId" label="Trait Record ID" min-width="160" show-overflow-tooltip />
                <el-table-column prop="plotId" label="Plot ID" min-width="140" show-overflow-tooltip />
                <el-table-column prop="trialId" label="Trial ID" min-width="140" show-overflow-tooltip />
                <el-table-column prop="batchId" label="Batch ID" min-width="140" show-overflow-tooltip />
                <el-table-column prop="observationDate" label="Observation Date" min-width="120" />
                <el-table-column prop="growthStage" label="Growth Stage" min-width="120" />
                <el-table-column prop="traitCode" label="Trait Code" min-width="100" />
                <el-table-column prop="traitName" label="Trait Name" min-width="120" show-overflow-tooltip />
                <el-table-column prop="traitValue" label="Trait Value" min-width="100" />
                <el-table-column prop="unit" label="Unit" min-width="80" />
                <el-table-column prop="status" label="Status" min-width="120" />
                <el-table-column label="Audit Status" min-width="140">
                  <template #default="{ row }">
                    <el-tag type="info">{{ getLabelByValue('flow_status', row.workflowStatus) || row.workflowStatus }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="createBy" label="Create By" min-width="120" show-overflow-tooltip />
                <el-table-column prop="createTime" label="Create Time" min-width="160" />
                <el-table-column prop="updateBy" label="Update By" min-width="120" show-overflow-tooltip />
                <el-table-column prop="updateTime" label="Update Time" min-width="160" />
                <el-table-column prop="auditBy" label="Audit By" min-width="120" show-overflow-tooltip />
                <el-table-column prop="auditTime" label="Audit Time" min-width="160" />
                <el-table-column :label="$t('research.breedingData.trait.columns.actions')" width="200" fixed="right">
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
              <div v-for="item in dataList" :key="item.traitId" class="mobile-card">
                <div class="mobile-card-header">
                  <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
                  <div class="mobile-card-title">
                    <i class="ri-plant-line"></i>
                    <span>{{ item.traitRecordId || item.plotId }}</span>
                  </div>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">Plot ID:</span>
                    <span class="value">{{ item.plotId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">Trial ID:</span>
                    <span class="value">{{ item.trialId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">Batch ID:</span>
                    <span class="value">{{ item.batchId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">Observation Date:</span>
                    <span class="value">{{ item.observationDate }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">Trait Name:</span>
                    <span class="value">{{ item.traitName }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">Trait Value:</span>
                    <span class="value">{{ item.traitValue }} {{ item.unit }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">Status:</span>
                    <span class="value">{{ item.status }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">Workflow:</span>
                    <span class="value">{{ getLabelByValue('flow_status', item.workflowStatus) || item.workflowStatus }}</span>
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
import { getAgronomicTraitList, deleteAgronomicTrait, getBatchOptions, getTrialOptions } from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const { t } = useI18n()
const { options, getLabelByValue } = useDict(['flow_status'])

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
  observationDate: '',
  status: '',
  workflowStatus: '',
  createBy: '',
  updateBy: '',
  auditBy: '',
  createTimeRange: [],
  updateTimeRange: [],
  auditTimeRange: []
})

// 列表查询参数构建（将时间范围拆分为 begin/end 字段）
const buildListParams = () => {
  const p = { ...queryParams }
  if (Array.isArray(p.createTimeRange) && p.createTimeRange.length === 2) {
    p.createTimeBegin = p.createTimeRange[0]
    p.createTimeEnd = p.createTimeRange[1]
  }
  if (Array.isArray(p.updateTimeRange) && p.updateTimeRange.length === 2) {
    p.updateTimeBegin = p.updateTimeRange[0]
    p.updateTimeEnd = p.updateTimeRange[1]
  }
  if (Array.isArray(p.auditTimeRange) && p.auditTimeRange.length === 2) {
    p.auditTimeBegin = p.auditTimeRange[0]
    p.auditTimeEnd = p.auditTimeRange[1]
  }
  delete p.createTimeRange
  delete p.updateTimeRange
  delete p.auditTimeRange
  return p
}

const getList = async () => {
  loading.value = true
  try {
    const res = await getAgronomicTraitList(buildListParams())
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

const loadTrialOptions = async () => {
  try {
    const res = await getTrialOptions()
    trialOptions.value = res.data || []
  } catch (error) {
    console.error('获取试验选项失败:', error)
  }
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleReset = () => {
  queryParams.pageNum = 1
  queryParams.pageSize = 10
  queryParams.batchId = ''
  queryParams.trialId = ''
  queryParams.observationDate = ''
  queryParams.status = ''
  queryParams.workflowStatus = ''
  queryParams.createBy = ''
  queryParams.updateBy = ''
  queryParams.auditBy = ''
  queryParams.createTimeRange = []
  queryParams.updateTimeRange = []
  queryParams.auditTimeRange = []
  getList()
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.traitId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.traitId)) {
      selectedIds.value.push(item.traitId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.traitId)
  }
}

const handleAdd = () => {
  router.push('/research/breeding-data/trait/add')
}

const handleView = (row) => {
  router.push(`/research/breeding-data/trait/detail/${row.traitId}`)
}

const handleEdit = (row) => {
  router.push(`/research/breeding-data/trait/edit/${row.traitId}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(t('research.breedingData.trait.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deleteAgronomicTrait(row.traitId)
    ElMessage.success(t('research.breedingData.trait.deleteSuccess'))
    getList()
  }).catch(() => {})
}

const handleBatchDelete = () => {
  ElMessageBox.confirm(t('research.breedingData.trait.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deleteAgronomicTrait(selectedIds.value.join(','))
    ElMessage.success(t('research.breedingData.trait.deleteSuccess'))
    selectedIds.value = []
    getList()
  }).catch(() => {})
}

onMounted(() => {
  loadBatchOptions()
  loadTrialOptions()
  getList()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.search-section {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;

  .search-item {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 0 0 auto;

    .search-label {
      font-size: 14px;
      color: #606266;
      white-space: nowrap;
      font-weight: 500;
    }

    .search-input {
      width: 200px;
    }

    .filter-select {
      width: 180px;
    }
  }

  .search-actions {
    display: flex;
    gap: 8px;
    margin-left: auto;
  }
}

@media (max-width: 768px) {
  .search-section {
    .search-item {
      width: 100%;

      .search-label {
        min-width: 80px;
      }

      .search-input,
      .filter-select {
        flex: 1;
        width: auto;
      }
    }

    .search-actions {
      margin-left: 0;
      width: 100%;

      .el-button {
        flex: 1;
      }
    }
  }
}
</style>
