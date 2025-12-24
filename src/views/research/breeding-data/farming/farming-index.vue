<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon"><i class="ri-plant-line"></i></div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.farming.titleAudit') }}</h1>
            <p class="page-subtitle">{{ $t('research.breedingData.farming.subtitle') }}</p>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title"><i class="ri-file-list-3-line"></i><span>{{ $t('research.breedingData.farming.list') }}</span></div>
<!--            <div class="header-actions">
              <el-button type="primary" @click="handleAdd">
                <i class="ri-add-line"></i>{{ $t('research.breedingData.farming.add') }}
              </el-button>
            </div>-->
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
                    v-for="item in auditStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
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
                <el-table-column prop="farmingRecordId" label="Farming Record ID" min-width="180" show-overflow-tooltip />
                <el-table-column prop="auditStatus" label="auditStatus" align="center" width="120">
                  <template #default="{ row }">
                    <el-tag :type="getStatusType(row.workflowStatus || row.auditStatus || 'S1')">
                      {{ getLabelByValue('flow_status', row.workflowStatus || row.auditStatus || 'S1') }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="plotId" label="Plot ID" min-width="140" show-overflow-tooltip />
                <el-table-column prop="trialId" label="Trial ID" min-width="140" show-overflow-tooltip />
                <el-table-column prop="batchId" label="Batch ID" min-width="140" show-overflow-tooltip />
                <el-table-column prop="activityDate" label="Activity Date" min-width="160">
                  <template #default="{ row }">
                    {{ formatDateTime(row.activityDate) }}
                  </template>
                </el-table-column>
                <el-table-column prop="activityType" label="Activity Type" min-width="160" />
                <el-table-column prop="inputName" label="Input Name" min-width="140" show-overflow-tooltip />
                <el-table-column prop="quantity" label="Quantity" min-width="160" />
                <el-table-column prop="unit" label="Unit" min-width="80" />
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
                <el-table-column :label="$t('research.breedingData.farming.columns.actions')" width="250" fixed="right">
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button link type="primary" @click="handleView(row)">
                        <i class="ri-eye-line"></i>{{ $t('common.view') }}
                      </el-button>

                      <!-- Show "Approval" button for S1 and S0 status -->
                      <el-button
                        v-if="row.workflowStatus === 'S1' || row.workflowStatus === 'S0' || row.auditStatus === 'S1' || row.auditStatus === 'S0'"
                        link type="success"
                        @click="handleAudit(row)"
                      >
                        <i class="ri-check-line"></i>audit
                      </el-button>

                      <!-- Show "Invalid" button for S2 and S10 status -->
                      <el-button
                        v-if="row.workflowStatus === 'S2' || row.workflowStatus === 'S3' || row.auditStatus === 'S2' || row.auditStatus === 'S3'"
                        link type="warning"
                        @click="handleCancel(row)"
                      >
                        <i class="ri-close-line"></i>void
                      </el-button>

                      <!-- Show "Edit" button for editable status -->
<!--                      <el-button
                        v-if="!row.workflowStatus || row.workflowStatus === 'S1' || row.workflowStatus === 'S3' || row.auditStatus === 'S1' || row.auditStatus === 'S3'"
                        link type="primary"
                        @click="handleEdit(row)"
                      >
                        <i class="ri-edit-line"></i>{{ $t('common.edit') }}
                      </el-button>-->
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
                    <div class="mobile-card-row">
                    <span class="label">Audit Status:</span>
                    <span class="value">
                      <el-tag :type="getStatusType(item.workflowStatus || item.auditStatus || 'S1')">
                        {{ getLabelByValue('flow_status', item.workflowStatus || item.auditStatus || 'S1') }}
                      </el-tag>
                    </span>
                  </div>
                    <div class="mobile-card-row"><span class="label">Plot ID:</span><span class="value">{{ item.plotId }}</span></div>
                    <div class="mobile-card-row"><span class="label">Trial ID:</span><span class="value">{{ item.trialId }}</span></div>
                    <div class="mobile-card-row"><span class="label">Batch ID:</span><span class="value">{{ item.batchId }}</span></div>
                    <div class="mobile-card-row"><span class="label">Input Name:</span><span class="value">{{ item.inputName }}</span></div>
                    <div class="mobile-card-row"><span class="label">Quantity:</span><span class="value">{{ item.quantity }} {{ item.unit }}</span></div>
                    <div class="mobile-card-row"><span class="label">Creator:</span><span class="value">{{ item.creator }}</span></div>
                    <div class="mobile-card-row"><span class="label">Modifier:</span><span class="value">{{ item.modifier }}</span></div>
                    <div class="mobile-card-row"><span class="label">Auditor:</span><span class="value">{{ item.auditor }}</span></div>
                    <div class="mobile-card-row"><span class="label">Created Time:</span><span class="value">{{ formatDateTime(item.createTime) }}</span></div>
                    <div class="mobile-card-row"><span class="label">Modified Time:</span><span class="value">{{ formatDateTime(item.updateTime) }}</span></div>
                    <div class="mobile-card-row"><span class="label">Audited Time:</span><span class="value">{{ formatDateTime(item.auditedDatetime) }}</span></div>
                  </div>
                  <div class="mobile-card-footer">
                    <el-button size="small" @click="handleView(item)">
                      <i class="ri-eye-line"></i>{{ $t('common.view') }}
                    </el-button>

                    <!-- Show "Approval" button for S1 and S0 status -->
                    <el-button
                      v-if="item.workflowStatus === 'S1' || item.workflowStatus === 'S0' || item.auditStatus === 'S1' || item.auditStatus === 'S0'"
                      size="small"
                      type="success"
                      @click="handleAudit(item)"
                    >
                      <i class="ri-check-line"></i>Approval
                    </el-button>

                    <!-- Show "Invalid" button for S2 and S10 status -->
                    <el-button
                      v-if="item.workflowStatus === 'S2' || item.workflowStatus === 'S10' || item.auditStatus === 'S2' || item.auditStatus === 'S10'"
                      size="small"
                      type="warning"
                      @click="handleCancel(item)"
                    >
                      <i class="ri-close-line"></i>Invalid
                    </el-button>

                    <!-- Show "Edit" button for editable status -->
<!--                    <el-button
                      v-if="!item.workflowStatus || item.workflowStatus === 'S1' || item.workflowStatus === 'S3' || item.auditStatus === 'S1' || item.auditStatus === 'S3'"
                      size="small"
                      type="primary"
                      @click="handleEdit(item)"
                    >
                      <i class="ri-edit-line"></i>{{ $t('common.edit') }}
                    </el-button>-->
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
import { cancelFarmingRecord } from '@/api/farmingRecordAudit'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const { t } = useI18n()

// Determine tag type based on status value
const getStatusType = (status) => {
  const typeMap = {
    'S0': 'info',     // Draft
    'S1': 'warning',  // Pending Approval
    'S2': 'success',  // Approved
    'S3': 'danger',   // Rejected
    'S10': 'info'     // Invalid
  }
  return typeMap[status] || 'warning'
}

const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const selectedIds = ref([])
const plotOptions = ref([])
const { options: dictOptions, getLabelByValue } = useDict('flow_status')

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  plotId: '',
  activityType: '',
  activityDate: '',
  auditStatus: ''
})

// Format date time to 'YYYY-MM-DD HH:mm:ss'
const formatDateTime = (val) => {
  if (!val) return '-'
  // If it's already a formatted string, return directly
  if (typeof val === 'string') {
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(val)) return val
    // Pure date string: return as is (to avoid misleading display of fixed 00:00:00 if backend doesn't store time)
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val
  }
  // Other cases (timestamp, ISO, Date object) format according to local timezone
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
    // 添加过滤条件：不显示S0和S3状态的单子
    const params = {
      ...queryParams,
      excludeStatuses: 'S0,S3' // 排除S0和S3状态
    }
    
    const res = await getFarmingRecordList(params)
    
    // 前端再次过滤，确保不显示S0和S3状态的数据
    const filteredData = (res.rows || []).filter(item => {
      const status = item.workflowStatus || item.auditStatus
      return status !== 'S0' && status !== 'S3'
    })
    
    dataList.value = filteredData.map(item => ({
      ...item,
      checked: false // Ensure each item has checked property
    }))
    total.value = res.total || 0

    // Debug: View dictionary options and data
    console.log('Dictionary options dictOptions.flow_status:', dictOptions.flow_status)
    console.log('First 3 items of data list:', dataList.value.slice(0, 3))
  } catch (error) {
    console.error('Failed to get list:', error)
  } finally {
    loading.value = false
  }
}

const loadPlotOptions = async () => {
  try {
    const res = await getPlotOptions()
    plotOptions.value = res.data || []
  } catch (error) {
    console.error('Failed to get plot options:', error)
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
  // Ensure item.checked property exists
  if (item.checked === undefined) {
    item.checked = true
  }

  if (item.checked) {
    if (!selectedIds.value.includes(item.farmingId)) {
      selectedIds.value.push(item.farmingId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.farmingId)
  }
}

const handleAdd = () => router.push('/research/breeding-data/farming/add')
const handleView = (row) => router.push(`/research/breeding-data/farming/farming-detail/${row.farmingId}`)
const handleEdit = (row) => router.push(`/research/breeding-data/farming/edit/${row.farmingId}`)
const handleAudit = (row) => router.push(`/research/breeding-data/farming/farming-form/${row.farmingId}`)

const handleCancel = (row) => {
  ElMessageBox.confirm('Are you sure you want to invalidate this farming record?', 'Warning', {
    type: 'warning',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel'
  }).then(async () => {
    try {
      await cancelFarmingRecord(row.farmingId)
      ElMessage.success('Invalidated successfully')
      getList()
    } catch (error) {
      console.error('Failed to invalidate:', error)
      ElMessage.error('Failed to invalidate')
    }
  }).catch(() => {})
}

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
