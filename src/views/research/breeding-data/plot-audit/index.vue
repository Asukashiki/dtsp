<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-file-check-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breedingData.plot.auditTitle') }}</h1>
            <p class="page-subtitle">{{ $t('research.breedingData.plot.auditSubtitle') }}</p>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('research.breedingData.plot.auditList') }}</span>
            </div>
          </div>

          <div class="card-body">
            <el-tabs v-model="activeTab" @tab-change="handleTabChange">
              <el-tab-pane :label="$t('research.breedingData.plot.pendingAudit')" name="S1">
                <div class="search-section">
                  <div class="search-item">
                    <span class="search-label">Trial ID:</span>
                    <el-input v-model="queryParams.trialId" placeholder="Please enter Trial ID" clearable class="search-input">
                      <template #prefix><i class="ri-search-line"></i></template>
                    </el-input>
                  </div>
                  <div class="search-item">
                    <span class="search-label">Batch ID:</span>
                    <el-select v-model="queryParams.batchId" placeholder="Please select Batch ID" clearable class="filter-select">
                      <el-option v-for="item in batchOptions" :key="item.batchId" :label="item.batchId" :value="item.batchId" />
                    </el-select>
                  </div>
                  <div class="search-actions">
                    <el-button type="primary" @click="handleQuery"><i class="ri-search-line"></i>Search</el-button>
                    <el-button @click="handleReset"><i class="ri-refresh-line"></i>Reset</el-button>
                  </div>
                </div>

                <div class="table-wrapper">
                  <el-table :data="dataList" stripe v-loading="loading">
                    <el-table-column prop="plotId" label="Plot ID" min-width="180" show-overflow-tooltip />
                    <el-table-column prop="trialId" label="Trial ID" min-width="160" show-overflow-tooltip />
                    <el-table-column prop="batchId" label="Batch ID" min-width="160" show-overflow-tooltip />
                    <el-table-column prop="replicationNo" label="Replication No" min-width="120" />
                    <el-table-column prop="rowNo" label="Row No" min-width="100" />
                    <el-table-column prop="columnNo" label="Column No" min-width="110" />
                    <el-table-column prop="varietyCode" label="Variety Code" min-width="130" show-overflow-tooltip />
                    <el-table-column prop="sowingTime" label="Sowing Date" min-width="140">
                      <template #default="{ row }">
                        {{ formatDateTime(row.sowingTime) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="auditStatus" :label="$t('research.breedingData.plot.columns.auditStatus')" min-width="120">
                      <template #default="{ row }">
                        <el-tag :type="row.auditStatus === 'S2' ? 'success' : (row.auditStatus === 'S10' ? 'danger' : 'warning')">
                          {{ getStatusLabel(row.auditStatus) }}
                        </el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="createdName" :label="$t('research.breedingData.plot.columns.createdBy')" min-width="100" />
                    <el-table-column prop="createTime" :label="$t('research.breedingData.plot.columns.createTime')" min-width="120" />
                    <el-table-column :label="$t('research.breedingData.plot.columns.actions')" width="120" fixed="right">
                      <template #default="{ row }">
                        <el-button link type="primary" @click="handleAudit(row)">
                          <i class="ri-eye-line"></i>{{ $t('common.audit') }}
                        </el-button>
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
              </el-tab-pane>

              <!-- 已作废 -->
              <el-tab-pane :label="$t('research.breedingData.plot.canceled')" name="S10">
                <div class="search-section">
                  <div class="search-item">
                    <span class="search-label">Trial ID:</span>
                    <el-input v-model="queryParams.trialId" placeholder="Please enter Trial ID" clearable class="search-input">
                      <template #prefix><i class="ri-search-line"></i></template>
                    </el-input>
                  </div>
                  <div class="search-item">
                    <span class="search-label">Batch ID:</span>
                    <el-select v-model="queryParams.batchId" placeholder="Please select Batch ID" clearable class="filter-select">
                      <el-option v-for="item in batchOptions" :key="item.batchId" :label="item.batchId" :value="item.batchId" />
                    </el-select>
                  </div>
                  <div class="search-actions">
                    <el-button type="primary" @click="handleQuery"><i class="ri-search-line"></i>Search</el-button>
                    <el-button @click="handleReset"><i class="ri-refresh-line"></i>Reset</el-button>
                  </div>
                </div>

                <div class="table-wrapper">
                  <el-table :data="dataList" stripe v-loading="loading">
                    <el-table-column prop="plotId" label="Plot ID" min-width="180" show-overflow-tooltip />
                    <el-table-column prop="trialId" label="Trial ID" min-width="160" show-overflow-tooltip />
                    <el-table-column prop="batchId" label="Batch ID" min-width="160" show-overflow-tooltip />
                    <el-table-column prop="replicationNo" label="Replication No" min-width="120" />
                    <el-table-column prop="rowNo" label="Row No" min-width="100" />
                    <el-table-column prop="columnNo" label="Column No" min-width="110" />
                    <el-table-column prop="varietyCode" label="Variety Code" min-width="130" show-overflow-tooltip />
                    <el-table-column prop="sowingTime" label="Sowing Date" min-width="140">
                      <template #default="{ row }">
                        {{ formatDateTime(row.sowingTime) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="auditStatus" :label="$t('research.breedingData.plot.columns.auditStatus')" min-width="120">
                      <template #default="{ row }">
                        <el-tag :type="row.auditStatus === 'S2' ? 'success' : (row.auditStatus === 'S10' ? 'danger' : 'warning')">
                          {{ getStatusLabel(row.auditStatus) }}
                        </el-tag>
                      </template>
                    </el-table-column>
                     <!-- 作废类型列 - 只在已作废标签页显示  -->
                    <el-table-column :label="$t('research.breedingData.plot.cancelType')" min-width="140">
                      <template #default="{ row }">
                        <el-tag v-if="row.auditCanceled && row.auditCanceled > 0" type="warning">
                          <i class="ri-file-forbid-line"></i> {{ $t('research.breedingData.plot.auditCanceled') }}
                        </el-tag>
                        <el-tag v-else type="info">
                          <i class="ri-close-circle-line"></i> {{ $t('research.breedingData.plot.dataCanceled') }}
                        </el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="auditedName" :label="$t('research.breedingData.plot.columns.auditedBy')" min-width="100" />
                    <el-table-column prop="auditTime" :label="$t('research.breedingData.plot.columns.auditTime')" min-width="120" />
                    <el-table-column :label="$t('research.breedingData.plot.columns.actions')" width="140" fixed="right">
                      <template #default="{ row }">
                        <el-button link type="primary" @click="handleView(row)">
                          <i class="ri-eye-line"></i>{{ $t('common.view') }}
                        </el-button>
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
              </el-tab-pane>

              <el-tab-pane :label="$t('research.breedingData.plot.audited')" name="S2">
                <div class="search-section">
                  <div class="search-item">
                    <span class="search-label">Trial ID:</span>
                    <el-input v-model="queryParams.trialId" placeholder="Please enter Trial ID" clearable class="search-input">
                      <template #prefix><i class="ri-search-line"></i></template>
                    </el-input>
                  </div>
                  <div class="search-item">
                    <span class="search-label">Batch ID:</span>
                    <el-select v-model="queryParams.batchId" placeholder="Please select Batch ID" clearable class="filter-select">
                      <el-option v-for="item in batchOptions" :key="item.batchId" :label="item.batchId" :value="item.batchId" />
                    </el-select>
                  </div>
                  <div class="search-actions">
                    <el-button type="primary" @click="handleQuery"><i class="ri-search-line"></i>Search</el-button>
                    <el-button @click="handleReset"><i class="ri-refresh-line"></i>Reset</el-button>
                  </div>
                </div>

                <div class="table-wrapper">
                  <el-table :data="dataList" stripe v-loading="loading">
                    <el-table-column prop="plotId" label="Plot ID" min-width="180" show-overflow-tooltip />
                    <el-table-column prop="trialId" label="Trial ID" min-width="160" show-overflow-tooltip />
                    <el-table-column prop="batchId" label="Batch ID" min-width="160" show-overflow-tooltip />
                    <el-table-column prop="replicationNo" label="Replication No" min-width="120" />
                    <el-table-column prop="rowNo" label="Row No" min-width="100" />
                    <el-table-column prop="columnNo" label="Column No" min-width="110" />
                    <el-table-column prop="varietyCode" label="Variety Code" min-width="130" show-overflow-tooltip />
                    <el-table-column prop="sowingTime" label="Sowing Date" min-width="140">
                      <template #default="{ row }">
                        {{ formatDateTime(row.sowingTime) }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="auditStatus" :label="$t('research.breedingData.plot.columns.auditStatus')" min-width="120">
                      <template #default="{ row }">
                        <el-tag :type="row.auditStatus === 'S2' ? 'success' : (row.auditStatus === 'S10' ? 'danger' : 'warning')">
                          {{ getStatusLabel(row.auditStatus) }}
                        </el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="auditedName" :label="$t('research.breedingData.plot.columns.auditedBy')" min-width="100" />
                    <el-table-column prop="auditTime" :label="$t('research.breedingData.plot.columns.auditTime')" min-width="120" />
                    <el-table-column :label="$t('research.breedingData.plot.columns.actions')" width="200" fixed="right">
                      <template #default="{ row }">
                        <el-button link type="primary" @click="handleView(row)">
                          <i class="ri-eye-line"></i>{{ $t('common.view') }}
                        </el-button>
                        <el-button v-if="row.auditStatus === 'S2'" link type="danger" @click="handleCancelAuditRecord(row)">
                          <i class="ri-close-circle-line"></i>{{ $t('research.breedingData.plot.cancel') }}
                        </el-button>
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
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>

    <!-- 审核弹窗 -->
    <el-dialog v-model="auditDialogVisible" :title="$t('research.breedingData.plot.detail')" width="80%" top="5vh">
      <div v-if="currentRow" class="audit-detail">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="Plot ID">{{ currentRow.plotId }}</el-descriptions-item>
          <el-descriptions-item label="Trial ID">{{ currentRow.trialId }}</el-descriptions-item>
          <el-descriptions-item label="Batch ID">{{ currentRow.batchId }}</el-descriptions-item>
          <el-descriptions-item label="Variety Code">{{ currentRow.varietyCode }}</el-descriptions-item>
          <el-descriptions-item label="Replication No">{{ currentRow.replicationNo }}</el-descriptions-item>
          <el-descriptions-item label="Row No">{{ currentRow.rowNo }}</el-descriptions-item>
          <el-descriptions-item label="Column No">{{ currentRow.columnNo }}</el-descriptions-item>
          <el-descriptions-item label="Sowing Date">{{ formatDateTime(currentRow.sowingTime) }}</el-descriptions-item>
          <el-descriptions-item label="Seed Quantity">{{ currentRow.seedQuantity }} kg</el-descriptions-item>
          <el-descriptions-item label="Region">{{ currentRow.region }}</el-descriptions-item>
          <el-descriptions-item label="Zone">{{ currentRow.zone }}</el-descriptions-item>
          <el-descriptions-item label="Woreda">{{ currentRow.woreda }}</el-descriptions-item>
          <el-descriptions-item label="Kebele">{{ currentRow.kebele }}</el-descriptions-item>
          <el-descriptions-item label="Created By">{{ currentRow.createdName }}</el-descriptions-item>
          <el-descriptions-item label="Create Time">{{ currentRow.createTime }}</el-descriptions-item>
        </el-descriptions>

        <!-- 待审核：显示审核意见输入框 -->
        <div v-if="activeTab === 'S1'" style="margin-top: 20px;">
          <el-form :model="auditForm" label-width="120px">
            <el-form-item :label="$t('research.breedingData.plot.auditOpinion')">
              <el-input v-model="auditForm.auditOpinion" type="textarea" :rows="3" :placeholder="$t('research.breedingData.plot.placeholder.auditOpinion')" />
            </el-form-item>
          </el-form>
        </div>

        <!-- 已审核：显示审核意见（只读） -->
        <div v-else style="margin-top: 20px;">
          <el-descriptions :column="1" border>
            <el-descriptions-item :label="$t('research.breedingData.plot.auditOpinion')">
              {{ currentRow.auditOpinion || '-' }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>

      <template #footer>
        <div v-if="activeTab === 'S1'">
          <el-button @click="auditDialogVisible = false">{{ $t('common.cancel') }}</el-button>
          <el-button type="danger" @click="handleReject">{{ $t('research.breedingData.plot.reject') }}</el-button>
          <el-button type="success" @click="handleApprove">{{ $t('research.breedingData.plot.approve') }}</el-button>
        </div>
        <div v-else>
          <el-button @click="auditDialogVisible = false">{{ $t('common.close') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getPlotInfoList, approvePlot, rejectPlot, getBreedingBatchOptions, cancelPlotAuditRecord } from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'

const { t } = useI18n()
const { options: dictOptions } = useDict('flow_status')

const activeTab = ref('S1')
const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const batchOptions = ref([])
const auditDialogVisible = ref(false)
const currentRow = ref(null)

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  trialId: '',
  batchId: '',
  auditStatus: 'S1'
})

const auditForm = reactive({
  auditOpinion: ''
})

// 统一日期时间格式化，兼容字符串/时间戳/ISO
const formatDateTime = (val) => {
  if (!val) return '-'
  if (typeof val === 'string') {
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(val)) return val
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val
  }
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

const getList = async () => {
  loading.value = true
  try {
    // 由服务端根据 auditStatus 精确筛选（S1/S2/S10）
    const res = await getPlotInfoList(queryParams)
    const rows = res.rows || []
    dataList.value = rows
    total.value = res.total || rows.length || 0
  } finally {
    loading.value = false
  }
}

const getBatchOptions = async () => {
  const res = await getBreedingBatchOptions()
  batchOptions.value = res.data || []
}

const handleTabChange = (tab) => {
  queryParams.auditStatus = tab
  queryParams.pageNum = 1
  getList()
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleReset = () => {
  queryParams.trialId = ''
  queryParams.batchId = ''
  queryParams.pageNum = 1
  getList()
}

const handleAudit = (row) => {
  currentRow.value = row
  auditForm.auditOpinion = ''
  auditDialogVisible.value = true
}

const handleView = (row) => {
  currentRow.value = row
  auditDialogVisible.value = true
}

const handleApprove = async () => {
  try {
    await ElMessageBox.confirm(t('research.breedingData.plot.approveConfirm'), t('common.confirm'), {
      type: 'warning'
    })
    await approvePlot({ plotId: currentRow.value.plotId, auditOpinion: auditForm.auditOpinion })
    ElMessage.success(t('research.breedingData.plot.approveSuccess'))
    auditDialogVisible.value = false
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || t('common.operationFailed'))
    }
  }
}

const handleReject = async () => {
  if (!auditForm.auditOpinion || !auditForm.auditOpinion.trim()) {
    ElMessage.warning(t('research.breedingData.plot.rejectOpinionRequired'))
    return
  }
  try {
    await ElMessageBox.confirm(t('research.breedingData.plot.rejectConfirm'), t('common.confirm'), {
      type: 'warning'
    })
    await rejectPlot({ plotId: currentRow.value.plotId, auditOpinion: auditForm.auditOpinion })
    ElMessage.success(t('research.breedingData.plot.rejectSuccess'))
    auditDialogVisible.value = false
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || t('common.operationFailed'))
    }
  }
}

const getStatusLabel = (status) => {
  const list = (dictOptions.value && dictOptions.value.flow_status) ? dictOptions.value.flow_status : []
  const dict = list.find(d => String(d.value) === String(status))
  return dict ? dict.label : status
}

const handleCancelAuditRecord = async (row) => {
  try {
    await ElMessageBox.confirm(t('research.breedingData.plot.cancelConfirm'), t('common.confirm'), {
      type: 'warning'
    })
    await cancelPlotAuditRecord({ plotId: row.plotId })
    // 标记当前行，以便回到 S2 也能识别已作废审核记录
    row._auditCanceled = true
    ElMessage.success(t('research.breedingData.plot.cancelSuccess'))
    // 保持在当前“已审核(S2)”列表，刷新后被作废的记录将不再出现（后端已将状态改为 S10）
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || t('common.operationFailed'))
    }
  }
}

onMounted(() => {
  getList()
  getBatchOptions()
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/page-common.scss';

.audit-detail {
  max-height: 60vh;
  overflow-y: auto;
}

/* 对齐搜索项为一排显示（与 plot/index.vue 保持一致） */
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
