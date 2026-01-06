<template>
  <div class="page-container">
    <div v-if="!showDetailPage" class="page-wrapper">
      <div class="page-header">
        <div class="header-left">
          <div class="header-icon">
            <i class="ri-file-check-line"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.dataCollection.laboratoryTest.auditTitle') }}</h1>
            <p class="page-subtitle">{{ $t('research.dataCollection.laboratoryTest.auditSubtitle') }}</p>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('research.dataCollection.laboratoryTest.auditList') }}</span>
            </div>
          </div>

          <div class="card-body">
            <el-tabs v-model="activeTab" @tab-change="handleTabChange">
              <!-- 待审核 -->
              <el-tab-pane :label="$t('research.dataCollection.laboratoryTest.pendingAudit')" name="S1">
                <!-- 搜索区域 -->
                <div class="search-section">
                  <el-input
                    v-model="queryParams.sampleId"
                    :placeholder="$t('research.dataCollection.laboratoryTest.form.sampleId')"
                    clearable
                    class="search-input"
                  >
                    <template #prefix>
                      <i class="ri-search-line"></i>
                    </template>
                  </el-input>
                  <el-select
                    v-model="queryParams.batchId"
                    :placeholder="$t('research.dataCollection.laboratoryTest.form.batchId')"
                    filterable
                    clearable
                    class="search-input"
                  >
                    <el-option
                      v-for="item in batchOptions"
                      :key="item.batchId"
                      :label="item.batchId"
                      :value="item.batchId"
                    />
                  </el-select>
                  <el-button type="primary" @click="handleQuery">
                    <i class="ri-search-line"></i>
                    {{ $t('common.search') }}
                  </el-button>
                  <el-button @click="handleReset">
                    <i class="ri-refresh-line"></i>
                    {{ $t('common.reset') }}
                  </el-button>
                </div>

                <!-- PC端表格 -->
                <div class="table-wrapper pc-only">
                  <el-table :data="dataList" stripe v-loading="loading">
                    <el-table-column
                      prop="sampleId"
                      :label="$t('research.dataCollection.laboratoryTest.form.sampleId')"
                      min-width="150"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="batchId"
                      :label="$t('research.dataCollection.laboratoryTest.form.batchId')"
                      min-width="150"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="trialId"
                      :label="$t('research.dataCollection.laboratoryTest.form.trialId')"
                      min-width="150"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="sampleType"
                      :label="$t('research.dataCollection.laboratoryTest.form.sampleType')"
                      min-width="120"
                    />
                    <el-table-column
                      prop="testDate"
                      :label="$t('research.dataCollection.laboratoryTest.form.testDate')"
                      min-width="120"
                    />
                    <el-table-column
                      prop="passFailFlag"
                      :label="$t('research.dataCollection.laboratoryTest.form.testStatus')"
                      min-width="100"
                    >
                      <template #default="{ row }">
                        <el-tag v-if="row.passFailFlag === 'true' || row.passFailFlag === true" type="success">Pass</el-tag>
                        <el-tag v-else-if="row.passFailFlag === 'false' || row.passFailFlag === false" type="danger">Fail</el-tag>
                        <span v-else>-</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="createdByName"
                      :label="$t('common.createdBy')"
                      min-width="100"
                    />
                    <el-table-column
                      prop="createdTime"
                      :label="$t('common.createdTime')"
                      min-width="160"
                    />
                    <el-table-column :label="$t('common.actions')" width="120" fixed="right">
                      <template #default="{ row }">
                        <el-button link type="primary" @click="handleAudit(row)">
                          <i class="ri-eye-line"></i>
                          {{ $t('research.dataCollection.laboratoryTest.audit') }}
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>

                  <div class="pagination-wrapper">
                    <el-pagination
                      v-model:current-page="queryParams.pageNum"
                      v-model:page-size="queryParams.pageSize"
                      :page-sizes="[10, 20, 50, 100]"
                      :total="total"
                      layout="total, sizes, prev, pager, next, jumper"
                      @size-change="getList"
                      @current-change="getList"
                    />
                  </div>
                </div>

                <!-- 空状态 -->
                <el-empty v-if="dataList.length === 0 && !loading" :description="$t('home.noData')" />
              </el-tab-pane>

              <!-- 已作废
              <el-tab-pane :label="$t('research.dataCollection.laboratoryTest.canceled')" name="S10">
                <!-- 搜索区域 -->
                <!-- <div class="search-section">
                  <el-input
                    v-model="queryParams.sampleId"
                    :placeholder="$t('research.dataCollection.laboratoryTest.form.sampleId')"
                    clearable
                    class="search-input"
                  >
                    <template #prefix>
                      <i class="ri-search-line"></i>
                    </template>
                  </el-input>
                  <el-select
                    v-model="queryParams.batchId"
                    :placeholder="$t('research.dataCollection.laboratoryTest.form.batchId')"
                    filterable
                    clearable
                    class="search-input"
                  >
                    <el-option
                      v-for="item in batchOptions"
                      :key="item.batchId"
                      :label="item.batchId"
                      :value="item.batchId"
                    />
                  </el-select>
                  <el-button type="primary" @click="handleQuery">
                    <i class="ri-search-line"></i>
                    {{ $t('common.search') }}
                  </el-button>
                  <el-button @click="handleReset">
                    <i class="ri-refresh-line"></i>
                    {{ $t('common.reset') }}
                  </el-button>
                </div> -->

                <!-- PC端表格 -->
                <!-- <div class="table-wrapper pc-only">
                  <el-table :data="dataList" stripe v-loading="loading">
                    <el-table-column
                      prop="sampleId"
                      :label="$t('research.dataCollection.laboratoryTest.form.sampleId')"
                      min-width="150"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="batchId"
                      :label="$t('research.dataCollection.laboratoryTest.form.batchId')"
                      min-width="150"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="trialId"
                      :label="$t('research.dataCollection.laboratoryTest.form.trialId')"
                      min-width="150"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="sampleType"
                      :label="$t('research.dataCollection.laboratoryTest.form.sampleType')"
                      min-width="120"
                    />
                    <el-table-column
                      prop="testDate"
                      :label="$t('research.dataCollection.laboratoryTest.form.testDate')"
                      min-width="120"
                    />
                    <el-table-column :label="$t('research.dataCollection.laboratoryTest.cancelType')" min-width="140">
                      <template #default="{ row }">
                        <el-tag type="warning">
                          <i class="ri-file-forbid-line"></i> {{ $t('research.dataCollection.laboratoryTest.auditCanceled') }}
                        </el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="approveByName"
                      :label="$t('common.approver')"
                      min-width="100"
                    />
                    <el-table-column
                      prop="approveTime"
                      :label="$t('common.approveTime')"
                      min-width="160"
                    />
                    <el-table-column :label="$t('common.actions')" width="120" fixed="right">
                      <template #default="{ row }">
                        <el-button link type="primary" @click="handleView(row)">
                          <i class="ri-eye-line"></i>
                          {{ $t('common.view') }}
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>

                  <div class="pagination-wrapper">
                    <el-pagination
                      v-model:current-page="queryParams.pageNum"
                      v-model:page-size="queryParams.pageSize"
                      :page-sizes="[10, 20, 50, 100]"
                      :total="total"
                      layout="total, sizes, prev, pager, next, jumper"
                      @size-change="getList"
                      @current-change="getList"
                    />
                  </div>
                </div> -->

                <!-- 空状态 -->
                <!-- <el-empty v-if="dataList.length === 0 && !loading" :description="$t('home.noData')" />
              </el-tab-pane> -->

              <!-- 已审核 -->
              <el-tab-pane :label="$t('research.dataCollection.laboratoryTest.audited')" name="S2">
                <!-- 搜索区域 -->
                <div class="search-section">
                  <el-input
                    v-model="queryParams.sampleId"
                    :placeholder="$t('research.dataCollection.laboratoryTest.form.sampleId')"
                    clearable
                    class="search-input"
                  >
                    <template #prefix>
                      <i class="ri-search-line"></i>
                    </template>
                  </el-input>
                  <el-select
                    v-model="queryParams.batchId"
                    :placeholder="$t('research.dataCollection.laboratoryTest.form.batchId')"
                    filterable
                    clearable
                    class="search-input"
                  >
                    <el-option
                      v-for="item in batchOptions"
                      :key="item.batchId"
                      :label="item.batchId"
                      :value="item.batchId"
                    />
                  </el-select>
                  <el-button type="primary" @click="handleQuery">
                    <i class="ri-search-line"></i>
                    {{ $t('common.search') }}
                  </el-button>
                  <el-button @click="handleReset">
                    <i class="ri-refresh-line"></i>
                    {{ $t('common.reset') }}
                  </el-button>
                </div>

                <!-- PC端表格 -->
                <div class="table-wrapper pc-only">
                  <el-table :data="dataList" stripe v-loading="loading">
                    <el-table-column
                      prop="sampleId"
                      :label="$t('research.dataCollection.laboratoryTest.form.sampleId')"
                      min-width="150"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="batchId"
                      :label="$t('research.dataCollection.laboratoryTest.form.batchId')"
                      min-width="150"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="trialId"
                      :label="$t('research.dataCollection.laboratoryTest.form.trialId')"
                      min-width="150"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="sampleType"
                      :label="$t('research.dataCollection.laboratoryTest.form.sampleType')"
                      min-width="120"
                    />
                    <el-table-column
                      prop="testDate"
                      :label="$t('research.dataCollection.laboratoryTest.form.testDate')"
                      min-width="120"
                    />
                    <el-table-column
                      prop="passFailFlag"
                      :label="$t('research.dataCollection.laboratoryTest.form.testStatus')"
                      min-width="100"
                    >
                      <template #default="{ row }">
                        <el-tag v-if="row.passFailFlag === 'true' || row.passFailFlag === true" type="success">Pass</el-tag>
                        <el-tag v-else-if="row.passFailFlag === 'false' || row.passFailFlag === false" type="danger">Fail</el-tag>
                        <span v-else>-</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="approveByName"
                      :label="$t('common.approver')"
                      min-width="100"
                    />
                    <el-table-column
                      prop="approveTime"
                      :label="$t('common.approveTime')"
                      min-width="160"
                    />
                    <el-table-column :label="$t('common.actions')" width="100" fixed="right">
                      <template #default="{ row }">
                        <el-button link type="primary" @click="handleView(row)">
                          <i class="ri-eye-line"></i>
                          {{ $t('common.view') }}
                        </el-button>
                        <!-- <el-button link type="danger" @click="handleCancelAuditRecord(row)">
                          <i class="ri-close-circle-line"></i>
                          {{ $t('research.dataCollection.laboratoryTest.cancel') }}
                        </el-button> -->
                      </template>
                    </el-table-column>
                  </el-table>

                  <div class="pagination-wrapper">
                    <el-pagination
                      v-model:current-page="queryParams.pageNum"
                      v-model:page-size="queryParams.pageSize"
                      :page-sizes="[10, 20, 50, 100]"
                      :total="total"
                      layout="total, sizes, prev, pager, next, jumper"
                      @size-change="getList"
                      @current-change="getList"
                    />
                  </div>
                </div>

                <!-- 空状态 -->
                <el-empty v-if="dataList.length === 0 && !loading" :description="$t('home.noData')" />
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
    <AuditDetailPage v-else :detailData="currentRow" :activeTab="activeTab" :isAudit="isAuditAction"
      @back="showDetailPage = false" @approve="handleApprove" @reject="handleReject" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getLabTestAuditList, approveLabTest, rejectLabTest, cancelLabTestAudit } from '@/api/labTest'
import { getBatchOptions } from '@/api/breedingData'
import AuditDetailPage from './detail.vue'

const { t } = useI18n()

const activeTab = ref('S1')
const loading = ref(false)
const dataList = ref([])
const total = ref(0)
const batchOptions = ref([])
const currentRow = ref(null)

const showDetailPage = ref(false)
const isAuditAction = ref(false)

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  sampleId: '',
  batchId: '',
  workflowStatus: 'S1',
  auditCanceled: 0
})

const getList = async () => {
  loading.value = true
  try {
    const res = await getLabTestAuditList(queryParams)
    // 支持多种返回格式：rows(TableDataInfo), list, 或直接data数组
    const rows = res.rows || res.data?.rows || res.data?.list || res.data || []
    dataList.value = rows
    total.value = res.total || res.data?.total || rows.length || 0
  } finally {
    loading.value = false
  }
}

const getBatchOptionsList = async () => {
  const res = await getBatchOptions()
  batchOptions.value = res.data || []
}

const handleTabChange = (tab) => {
  queryParams.workflowStatus = tab
  // 已作废标签页：查询 S2 状态且 audit_canceled = 1
  if (tab === 'S10') {
    queryParams.workflowStatus = 'S2'
    queryParams.auditCanceled = 1
  } else {
    queryParams.auditCanceled = 0
  }
  queryParams.pageNum = 1
  getList()
}

const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}

const handleReset = () => {
  queryParams.sampleId = ''
  queryParams.batchId = ''
  queryParams.pageNum = 1
  getList()
}

const handleAudit = (row) => {
  currentRow.value = row
  isAuditAction.value = true
  showDetailPage.value = true
}

const handleView = (row) => {
  currentRow.value = row
  isAuditAction.value = false
  showDetailPage.value = true
}

const handleApprove = async ({ dataId, auditOpinion }) => {
  try {
    await approveLabTest({ dataId, auditOpinion })
    ElMessage.success(t('research.dataCollection.laboratoryTest.approveSuccess'))
    showDetailPage.value = false
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || t('common.operationFailed'))
    }
  }
}

const handleReject = async ({ dataId, auditOpinion }) => {
  try {
    await rejectLabTest({ dataId, auditOpinion })
    ElMessage.success(t('research.dataCollection.laboratoryTest.rejectSuccess'))
    showDetailPage.value = false
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || t('common.operationFailed'))
    }
  }
}

const handleCancelAuditRecord = async (row) => {
  try {
    await ElMessageBox.confirm(t('research.dataCollection.laboratoryTest.cancelConfirm'), t('common.confirm'), {
      type: 'warning'
    })
    await cancelLabTestAudit({ dataId: row.dataId })
    ElMessage.success(t('research.dataCollection.laboratoryTest.cancelSuccess'))
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || t('common.operationFailed'))
    }
  }
}

onMounted(() => {
  getList()
  getBatchOptionsList()
})
</script>

<style scoped>
/* 卡片 */
.info-card {
  background: white;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e8f5e9;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-title i {
  font-size: 22px;
}

.card-body {
  padding: 24px;
}

/* 搜索区域 */
.search-section {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.search-section .el-button {
  flex-shrink: 0;
}

/* 表格 */
.table-wrapper {
  margin-top: 16px;
}

.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* 分页 */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e8f5e9;
}
</style>
