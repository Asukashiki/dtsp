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
              <div class="search-item">
                <span class="search-label">Plot ID:</span>
                <el-select v-model="queryParams.plotId" placeholder="Please select Plot ID" clearable filterable class="filter-select">
                  <el-option v-for="item in plotOptions" :key="item.plotId" :label="item.plotId" :value="item.plotId" />
                </el-select>
              </div>
              <div class="search-item">
                <span class="search-label">Activity Type:</span>
                <el-select v-model="queryParams.activityType" placeholder="Please select Activity Type" clearable class="filter-select">
                  <el-option v-for="item in activityTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
              <div class="search-item">
                <span class="search-label">Activity Date:</span>
                <el-date-picker v-model="queryParams.activityDate" type="date" placeholder="Select Activity Date" clearable value-format="YYYY-MM-DD" class="filter-select" />
              </div>
              <div class="search-item">
                <span class="search-label">Audit Status:</span>
                <el-select v-model="queryParams.auditStatus" placeholder="Please select Audit Status" clearable class="filter-select">
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
                  <i class="ri-search-line"></i>{{ $t('common.search') }}
                </el-button>
                <el-button @click="handleReset">
                  <i class="ri-refresh-line"></i>{{ $t('common.reset') }}
                </el-button>
              </div>
            </div>

            <div class="table-wrapper pc-only">
              <el-table :data="dataList" stripe v-loading="loading" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" />
                <el-table-column prop="farmingRecordId" label="Farming Record ID" min-width="160" show-overflow-tooltip />
                <el-table-column prop="plotId" label="Plot ID" min-width="140" show-overflow-tooltip />
                <el-table-column prop="trialId" label="Trial ID" min-width="140" show-overflow-tooltip />
                <el-table-column prop="batchId" label="Batch ID" min-width="140" show-overflow-tooltip />
                <el-table-column prop="activityDate" label="Activity Date" min-width="160">
                  <template #default="{ row }">
                    {{ formatDateTime(row.activityDate) }}
                  </template>
                </el-table-column>
                <el-table-column prop="activityType" label="Activity Type" min-width="120" />
                <el-table-column prop="inputName" label="Input Name" min-width="140" show-overflow-tooltip />
                <el-table-column prop="quantity" label="Quantity" min-width="100" />
                <el-table-column prop="unit" label="Unit" min-width="80" />
                <!-- 新增的审计字段 -->
                <el-table-column prop="auditStatus" label="Audit Status" min-width="120">
                  <template #default="{ row }">
                    <dict-tag :options="dictOptions.flow_status" :value="row.auditStatus" />
                  </template>
                </el-table-column>
                <el-table-column prop="creator" label="Creator" min-width="120" />
                      <el-table-column prop="createTime" label="Created Time" min-width="160">
                  <template #default="{ row }">
                    {{ formatDateTime(row.createTime) }}
                  </template>
                </el-table-column>
                <el-table-column prop="modifier" label="Modifier" min-width="120" />
                 <el-table-column prop="updateTime" label="Modified Time" min-width="160">
                  <template #default="{ row }">
                    {{ formatDateTime(row.updateTime) }}
                  </template>
                </el-table-column>
                <el-table-column prop="auditor" label="Auditor" min-width="120" />
                <el-table-column prop="auditedDatetime" label="Audited Time" min-width="160">
                  <template #default="{ row }">
                    {{ formatDateTime(row.auditedDatetime) }}
                  </template>
                </el-table-column>
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
                    <div class="mobile-card-title"><i class="ri-seedling-line"></i><span>{{ item.activityType }} - {{ formatDateTime(item.activityDate) }}</span></div>
                  </div>
                  <div class="mobile-card-body">
                    <div class="mobile-card-row"><span class="label">Farming Record ID:</span><span class="value">{{ item.farmingRecordId }}</span></div>
                    <div class="mobile-card-row"><span class="label">Plot ID:</span><span class="value">{{ item.plotId }}</span></div>
                    <div class="mobile-card-row"><span class="label">Trial ID:</span><span class="value">{{ item.trialId }}</span></div>
                    <div class="mobile-card-row"><span class="label">Batch ID:</span><span class="value">{{ item.batchId }}</span></div>
                    <div class="mobile-card-row"><span class="label">Input Name:</span><span class="value">{{ item.inputName }}</span></div>
                    <div class="mobile-card-row"><span class="label">Quantity:</span><span class="value">{{ item.quantity }} {{ item.unit }}</span></div>
                    <!-- 新增的审计字段 -->
                    <div class="mobile-card-row"><span class="label">Audit Status:</span><span class="value"><dict-tag :options="dictOptions.flow_status" :value="item.auditStatus" /></span></div>
                    <div class="mobile-card-row"><span class="label">Creator:</span><span class="value">{{ item.creator }}</span></div>
                    <div class="mobile-card-row"><span class="label">Modifier:</span><span class="value">{{ item.modifier }}</span></div>
                    <div class="mobile-card-row"><span class="label">Auditor:</span><span class="value">{{ item.auditor }}</span></div>
                    <div class="mobile-card-row"><span class="label">Created Time:</span><span class="value">{{ formatDateTime(item.createTime) }}</span></div>
                    <div class="mobile-card-row"><span class="label">Modified Time:</span><span class="value">{{ formatDateTime(item.updateTime) }}</span></div>
                    <div class="mobile-card-row"><span class="label">Audited Time:</span><span class="value">{{ formatDateTime(item.auditedDatetime) }}</span></div>
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
import { getFarmingRecordList, deleteFarmingRecord, getPlotOptions } from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const selectedIds = ref([])
const plotOptions = ref([])
const { options: dictOptions } = useDict('flow_status')

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  plotId: '',
  activityType: '',
  activityDate: '',
  auditStatus: ''
})

// 格式化日期时间为 'YYYY-MM-DD HH:mm:ss'
const formatDateTime = (val) => {
  if (!val) return '-'
  // 若已是符合格式的字符串，直接返回
  if (typeof val === 'string') {
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(val)) return val
    // 纯日期字符串：保持原样返回（后端若未存时分秒，避免误导显示固定的 00:00:00）
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val
  }
  // 其它情况（时间戳、ISO、Date对象）按本地时区格式化
  const d = new Date(val)
  if (isNaN(d.getTime())) return val || '-'
  const pad = (n) => (n < 10 ? `0${n}` : `${n}`)
  const Y = d.getFullYear()
  const M = pad(d.getMonth() + 1)
  const D = pad(d.getDate())
  const h = pad(d.getHours())
  const m = pad(d.getMinutes())
  const s = pad(d.getSeconds())
  return `${Y}-${M}-${D} ${h}:${m}:${s}`
}

const activityTypeOptions = [
  { label: 'Fertilizer', value: 'fertilizer' },
  { label: 'Irrigation', value: 'irrigation' },
  { label: 'Pest Control', value: 'pest_control' },
  { label: 'Weeding', value: 'weeding' },
  { label: 'Tillage', value: 'tillage' },
  { label: 'Harvest', value: 'harvest' }
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

const loadPlotOptions = async () => {
  try {
    const res = await getPlotOptions()
    plotOptions.value = res.data || []
  } catch (error) {
    console.error('获取地块选项失败:', error)
  }
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleReset = () => {
  queryParams.plotId = ''
  queryParams.activityType = ''
  queryParams.activityDate = ''
  queryParams.auditStatus = ''
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
  loadPlotOptions()
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
