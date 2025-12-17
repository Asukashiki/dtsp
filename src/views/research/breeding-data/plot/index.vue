<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-map-2-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.plot.title') }}</h1>
            <p class="page-subtitle">{{ $t('research.breedingData.plot.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('research.breedingData.plot.list') }}</span>
            </div>
            <div class="header-actions">
              <el-button type="danger" :disabled="selectedIds.length === 0" @click="handleBatchDelete">
                <i class="ri-delete-bin-line"></i>
                {{ $t('common.batchDelete') }}
              </el-button>
              <el-button type="primary" @click="handleAdd">
                <i class="ri-add-line"></i>
                {{ $t('research.breedingData.plot.add') }}
              </el-button>
            </div>
          </div>

          <div class="card-body">
            <!-- 搜索筛选区 -->
            <div class="search-section">
              <div class="search-item">
                <span class="search-label">Trial ID:</span>
                <el-input
                  v-model="queryParams.trialId"
                  placeholder="Please enter Trial ID"
                  clearable
                  class="search-input"
                >
                  <template #prefix><i class="ri-search-line"></i></template>
                </el-input>
              </div>
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
                <span class="search-label">Variety Code:</span>
                <el-input
                  v-model="queryParams.varietyCode"
                  placeholder="Please enter Variety Code"
                  clearable
                  class="search-input"
                />
              </div>
              <div class="search-item">
                <span class="search-label">{{ $t('research.breedingData.plot.columns.auditStatus') }}:</span>
                <el-select
                  v-model="queryParams.auditStatus"
                  :placeholder="$t('research.breedingData.trial.placeholder.auditStatus')"
                  clearable
                  class="filter-select"
                >
                  <el-option
                    v-for="dict in dictOptions.flow_status"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </div>
              <div class="search-actions">
                <el-button type="primary" @click="handleQuery">
                  <i class="ri-search-line"></i>Search
                </el-button>
                <el-button @click="handleReset">
                  <i class="ri-refresh-line"></i>Reset
                </el-button>
              </div>
            </div>

            <!-- PC端表格 -->
            <div class="table-wrapper pc-only">
              <el-table :data="dataList" stripe v-loading="loading" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" />
                <el-table-column prop="plotId" label="Plot ID" min-width="180" show-overflow-tooltip />
                <el-table-column prop="trialId" label="Trial ID" min-width="160" show-overflow-tooltip />
                <el-table-column prop="batchId" label="Batch ID" min-width="160" show-overflow-tooltip />
                <el-table-column prop="replicationNo" label="Replication No" min-width="120" />
                <el-table-column prop="rowNo" label="Row No" min-width="100" />
                <el-table-column prop="columnNo" label="Column No" min-width="110" />
                <el-table-column prop="varietyCode" label="Variety Code" min-width="130" show-overflow-tooltip />
                <el-table-column prop="sowingDate" label="Sowing Date" min-width="120" />
                <el-table-column prop="auditStatus" :label="$t('research.breedingData.plot.columns.auditStatus')" min-width="120">
                  <template #default="{ row }">
                    <dict-tag :options="dictOptions.flow_status" :value="row.auditStatus" />
                  </template>
                </el-table-column>
                <el-table-column prop="createdName" :label="$t('research.breedingData.plot.columns.createdBy')" min-width="120" />
                <el-table-column prop="createTime" :label="$t('research.breedingData.plot.columns.createTime')" min-width="120" />
                <el-table-column prop="modifiedName" :label="$t('research.breedingData.plot.columns.modifiedBy')" min-width="120" />
                <el-table-column prop="updateTime" :label="$t('research.breedingData.plot.columns.updateTime')" min-width="120" />
                <el-table-column prop="auditedName" :label="$t('research.breedingData.plot.columns.auditedBy')" min-width="120" />
                <el-table-column prop="auditTime" :label="$t('research.breedingData.plot.columns.auditTime')" min-width="120" />
                <el-table-column :label="$t('research.breedingData.plot.columns.actions')" width="200" fixed="right">
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
              <div v-for="item in dataList" :key="item.plotId" class="mobile-card">
                <div class="mobile-card-header">
                  <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
                  <div class="mobile-card-title">
                    <i class="ri-map-pin-line"></i>
                    <span>{{ item.plotId }}</span>
                  </div>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">Trial ID:</span>
                    <span class="value">{{ item.trialId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">Batch ID:</span>
                    <span class="value">{{ item.batchId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">Replication No:</span>
                    <span class="value">{{ item.replicationNo }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">Variety Code:</span>
                    <span class="value">{{ item.varietyCode }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">Sowing Date:</span>
                    <span class="value">{{ item.sowingDate }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.plot.columns.auditStatus') }}:</span>
                    <span class="value">
                      <dict-tag :options="dictOptions.flow_status" :value="item.auditStatus" />
                    </span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.plot.columns.createdBy') }}:</span>
                    <span class="value">{{ item.createdName }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.plot.columns.modifiedBy') }}:</span>
                    <span class="value">{{ item.modifiedName }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.plot.columns.auditedBy') }}:</span>
                    <span class="value">{{ item.auditedName }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.plot.columns.createTime') }}:</span>
                    <span class="value">{{ item.createTime }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.plot.columns.updateTime') }}:</span>
                    <span class="value">{{ item.updateTime }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('research.breedingData.plot.columns.auditTime') }}:</span>
                    <span class="value">{{ item.auditTime }}</span>
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
import { getPlotInfoList, deletePlotInfo, getBatchOptions } from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const selectedIds = ref([])
const batchOptions = ref([])
const { options: dictOptions  } = useDict('flow_status')

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  trialId: '',
  batchId: '',
  varietyCode: '',
  auditStatus: ''
})

const getList = async () => {
  loading.value = true
  try {
    const res = await getPlotInfoList(queryParams)
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

const handleReset = () => {
  queryParams.pageNum = 1
  queryParams.pageSize = 10
  queryParams.trialId = ''
  queryParams.batchId = ''
  queryParams.varietyCode = ''
  queryParams.auditStatus = ''
  getList()
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.plotId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.plotId)) {
      selectedIds.value.push(item.plotId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.plotId)
  }
}

const handleAdd = () => {
  router.push('/research/breeding-data/plot/add')
}

const handleView = (row) => {
  router.push(`/research/breeding-data/plot/detail/${row.plotId}`)
}

const handleEdit = (row) => {
  router.push(`/research/breeding-data/plot/edit/${row.plotId}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(t('research.breedingData.plot.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deletePlotInfo(row.plotId)
    ElMessage.success(t('research.breedingData.plot.deleteSuccess'))
    getList()
  }).catch(() => {})
}

const handleBatchDelete = () => {
  ElMessageBox.confirm(t('research.breedingData.plot.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deletePlotInfo(selectedIds.value.join(','))
    ElMessage.success(t('research.breedingData.plot.deleteSuccess'))
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
