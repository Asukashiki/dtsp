<template>
  <div class="page-container">
    <div class="page-wrapper">
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
                <div class="search-section">
                  <div class="search-item">
                    <span class="search-label">{{ $t('research.dataCollection.laboratoryTest.form.sampleId') }}:</span>
                    <el-input v-model="queryParams.sampleId" :placeholder="$t('research.dataCollection.laboratoryTest.form.sampleId')" clearable class="search-input">
                      <template #prefix><i class="ri-search-line"></i></template>
                    </el-input>
                  </div>
                  <div class="search-item">
                    <span class="search-label">{{ $t('research.dataCollection.laboratoryTest.form.batchId') }}:</span>
                    <el-select v-model="queryParams.batchId" :placeholder="$t('research.dataCollection.laboratoryTest.form.batchId')" clearable class="filter-select">
                      <el-option v-for="item in batchOptions" :key="item.batchId" :label="item.batchId" :value="item.batchId" />
                    </el-select>
                  </div>
                  <div class="search-actions">
                    <el-button type="primary" @click="handleQuery"><i class="ri-search-line"></i>{{ $t('common.search') }}</el-button>
                    <el-button @click="handleReset"><i class="ri-refresh-line"></i>{{ $t('common.reset') }}</el-button>
                  </div>
                </div>

                <div class="table-wrapper">
                  <el-table :data="dataList" stripe v-loading="loading">
                    <el-table-column prop="sampleId" :label="$t('research.dataCollection.laboratoryTest.form.sampleId')" min-width="150" show-overflow-tooltip />
                    <el-table-column prop="batchId" :label="$t('research.dataCollection.laboratoryTest.form.batchId')" min-width="150" show-overflow-tooltip />
                    <el-table-column prop="trialId" :label="$t('research.dataCollection.laboratoryTest.form.trialId')" min-width="150" show-overflow-tooltip />
                    <el-table-column prop="sampleType" :label="$t('research.dataCollection.laboratoryTest.form.sampleType')" min-width="120" />
                    <el-table-column prop="testDate" :label="$t('research.dataCollection.laboratoryTest.form.testDate')" min-width="120" />
                    <el-table-column prop="passFailFlag" :label="$t('research.dataCollection.laboratoryTest.form.passFailFlag')" min-width="100">
                      <template #default="{ row }">
                        <el-tag v-if="row.passFailFlag === 'true' || row.passFailFlag === true" type="success">Pass</el-tag>
                        <el-tag v-else-if="row.passFailFlag === 'false' || row.passFailFlag === false" type="danger">Fail</el-tag>
                        <span v-else>-</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="createdByName" :label="$t('common.createdBy')" min-width="100" />
                    <el-table-column prop="createdTime" :label="$t('common.createdTime')" min-width="160" />
                    <el-table-column :label="$t('common.actions')" width="120" fixed="right">
                      <template #default="{ row }">
                        <el-button link type="primary" @click="handleAudit(row)">
                          <i class="ri-eye-line"></i>{{ $t('research.dataCollection.laboratoryTest.audit') }}
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
              <el-tab-pane :label="$t('research.dataCollection.laboratoryTest.canceled')" name="S10">
                <div class="search-section">
                  <div class="search-item">
                    <span class="search-label">{{ $t('research.dataCollection.laboratoryTest.form.sampleId') }}:</span>
                    <el-input v-model="queryParams.sampleId" :placeholder="$t('research.dataCollection.laboratoryTest.form.sampleId')" clearable class="search-input">
                      <template #prefix><i class="ri-search-line"></i></template>
                    </el-input>
                  </div>
                  <div class="search-item">
                    <span class="search-label">{{ $t('research.dataCollection.laboratoryTest.form.batchId') }}:</span>
                    <el-select v-model="queryParams.batchId" :placeholder="$t('research.dataCollection.laboratoryTest.form.batchId')" clearable class="filter-select">
                      <el-option v-for="item in batchOptions" :key="item.batchId" :label="item.batchId" :value="item.batchId" />
                    </el-select>
                  </div>
                  <div class="search-actions">
                    <el-button type="primary" @click="handleQuery"><i class="ri-search-line"></i>{{ $t('common.search') }}</el-button>
                    <el-button @click="handleReset"><i class="ri-refresh-line"></i>{{ $t('common.reset') }}</el-button>
                  </div>
                </div>

                <div class="table-wrapper">
                  <el-table :data="dataList" stripe v-loading="loading">
                    <el-table-column prop="sampleId" :label="$t('research.dataCollection.laboratoryTest.form.sampleId')" min-width="150" show-overflow-tooltip />
                    <el-table-column prop="batchId" :label="$t('research.dataCollection.laboratoryTest.form.batchId')" min-width="150" show-overflow-tooltip />
                    <el-table-column prop="trialId" :label="$t('research.dataCollection.laboratoryTest.form.trialId')" min-width="150" show-overflow-tooltip />
                    <el-table-column prop="sampleType" :label="$t('research.dataCollection.laboratoryTest.form.sampleType')" min-width="120" />
                    <el-table-column prop="testDate" :label="$t('research.dataCollection.laboratoryTest.form.testDate')" min-width="120" />
                    <el-table-column :label="$t('research.dataCollection.laboratoryTest.cancelType')" min-width="140">
                      <template #default="{ row }">
                        <el-tag type="warning">
                          <i class="ri-file-forbid-line"></i> {{ $t('research.dataCollection.laboratoryTest.auditCanceled') }}
                        </el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="approveByName" :label="$t('common.approver')" min-width="100" />
                    <el-table-column prop="approveTime" :label="$t('common.approveTime')" min-width="160" />
                    <el-table-column :label="$t('common.actions')" width="120" fixed="right">
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

              <!-- 已审核 -->
              <el-tab-pane :label="$t('research.dataCollection.laboratoryTest.audited')" name="S2">
                <div class="search-section">
                  <div class="search-item">
                    <span class="search-label">{{ $t('research.dataCollection.laboratoryTest.form.sampleId') }}:</span>
                    <el-input v-model="queryParams.sampleId" :placeholder="$t('research.dataCollection.laboratoryTest.form.sampleId')" clearable class="search-input">
                      <template #prefix><i class="ri-search-line"></i></template>
                    </el-input>
                  </div>
                  <div class="search-item">
                    <span class="search-label">{{ $t('research.dataCollection.laboratoryTest.form.batchId') }}:</span>
                    <el-select v-model="queryParams.batchId" :placeholder="$t('research.dataCollection.laboratoryTest.form.batchId')" clearable class="filter-select">
                      <el-option v-for="item in batchOptions" :key="item.batchId" :label="item.batchId" :value="item.batchId" />
                    </el-select>
                  </div>
                  <div class="search-actions">
                    <el-button type="primary" @click="handleQuery"><i class="ri-search-line"></i>{{ $t('common.search') }}</el-button>
                    <el-button @click="handleReset"><i class="ri-refresh-line"></i>{{ $t('common.reset') }}</el-button>
                  </div>
                </div>

                <div class="table-wrapper">
                  <el-table :data="dataList" stripe v-loading="loading">
                    <el-table-column prop="sampleId" :label="$t('research.dataCollection.laboratoryTest.form.sampleId')" min-width="150" show-overflow-tooltip />
                    <el-table-column prop="batchId" :label="$t('research.dataCollection.laboratoryTest.form.batchId')" min-width="150" show-overflow-tooltip />
                    <el-table-column prop="trialId" :label="$t('research.dataCollection.laboratoryTest.form.trialId')" min-width="150" show-overflow-tooltip />
                    <el-table-column prop="sampleType" :label="$t('research.dataCollection.laboratoryTest.form.sampleType')" min-width="120" />
                    <el-table-column prop="testDate" :label="$t('research.dataCollection.laboratoryTest.form.testDate')" min-width="120" />
                    <el-table-column prop="passFailFlag" :label="$t('research.dataCollection.laboratoryTest.form.passFailFlag')" min-width="100">
                      <template #default="{ row }">
                        <el-tag v-if="row.passFailFlag === 'true' || row.passFailFlag === true" type="success">Pass</el-tag>
                        <el-tag v-else-if="row.passFailFlag === 'false' || row.passFailFlag === false" type="danger">Fail</el-tag>
                        <span v-else>-</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="approveByName" :label="$t('common.approver')" min-width="100" />
                    <el-table-column prop="approveTime" :label="$t('common.approveTime')" min-width="160" />
                    <el-table-column :label="$t('common.actions')" width="200" fixed="right">
                      <template #default="{ row }">
                        <el-button link type="primary" @click="handleView(row)">
                          <i class="ri-eye-line"></i>{{ $t('common.view') }}
                        </el-button>
                        <el-button link type="danger" @click="handleCancelAuditRecord(row)">
                          <i class="ri-close-circle-line"></i>{{ $t('research.dataCollection.laboratoryTest.cancel') }}
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
    <el-dialog v-model="auditDialogVisible" :title="$t('research.dataCollection.laboratoryTest.detail')" width="80%" top="5vh">
      <div v-if="currentRow" class="audit-detail">
        <el-descriptions :column="2" border>
          <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.sampleId')">{{ currentRow.sampleId }}</el-descriptions-item>
          <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.batchId')">{{ currentRow.batchId }}</el-descriptions-item>
          <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.trialId')">{{ currentRow.trialId }}</el-descriptions-item>
          <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.sampleCondition')">{{ currentRow.sampleCondition }}</el-descriptions-item>
          <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.sampleType')">{{ currentRow.sampleType }}</el-descriptions-item>
          <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.testDate')">{{ currentRow.testDate }}</el-descriptions-item>
          <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.germinationRate')">{{ currentRow.germinationRate }}%</el-descriptions-item>
          <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.purityPercent')">{{ currentRow.purityPercent }}%</el-descriptions-item>
          <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.moistureContentPercent')">{{ currentRow.moistureContentPercent }}%</el-descriptions-item>
          <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.proteinPercent')">{{ currentRow.proteinPercent }}%</el-descriptions-item>
          <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.form.passFailFlag')">
            <el-tag v-if="currentRow.passFailFlag === 'true' || currentRow.passFailFlag === true" type="success">Pass</el-tag>
            <el-tag v-else-if="currentRow.passFailFlag === 'false' || currentRow.passFailFlag === false" type="danger">Fail</el-tag>
            <span v-else>-</span>
          </el-descriptions-item>
          <el-descriptions-item :label="$t('common.createdBy')">{{ currentRow.createdByName }}</el-descriptions-item>
          <el-descriptions-item :label="$t('common.createdTime')">{{ currentRow.createdTime }}</el-descriptions-item>
        </el-descriptions>

        <!-- 待审核：显示审核意见输入框 -->
        <div v-if="activeTab === 'S1'" style="margin-top: 20px;">
          <el-form :model="auditForm" label-width="120px">
            <el-form-item :label="$t('research.dataCollection.laboratoryTest.auditOpinion')">
              <el-input v-model="auditForm.auditOpinion" type="textarea" :rows="3" :placeholder="$t('research.dataCollection.laboratoryTest.placeholder.auditOpinion')" />
            </el-form-item>
          </el-form>
        </div>

        <!-- 已审核/已作废：显示审核意见（只读） -->
        <div v-else style="margin-top: 20px;">
          <el-descriptions :column="1" border>
            <el-descriptions-item :label="$t('research.dataCollection.laboratoryTest.auditOpinion')">
              {{ currentRow.auditOpinion || '-' }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>

      <template #footer>
        <div v-if="activeTab === 'S1'">
          <el-button @click="auditDialogVisible = false">{{ $t('research.dataCollection.laboratoryTest.return') }}</el-button>
          <el-button type="danger" @click="handleReject">{{ $t('research.dataCollection.laboratoryTest.reject') }}</el-button>
          <el-button type="success" @click="handleApprove">{{ $t('research.dataCollection.laboratoryTest.approve') }}</el-button>
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
import { getLabTestAuditList, approveLabTest, rejectLabTest, cancelLabTestAudit } from '@/api/labTest'
import { getBatchOptions } from '@/api/breedingData'

const { t } = useI18n()

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
  sampleId: '',
  batchId: '',
  workflowStatus: 'S1',
  auditCanceled: 0
})

const auditForm = reactive({
  auditOpinion: ''
})

const getList = async () => {
  loading.value = true
  try {
    const res = await getLabTestAuditList(queryParams)
    const rows = res.data || []
    dataList.value = rows
    total.value = rows.length || 0
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
  auditForm.auditOpinion = ''
  auditDialogVisible.value = true
}

const handleView = (row) => {
  currentRow.value = row
  auditDialogVisible.value = true
}

const handleApprove = async () => {
  try {
    await ElMessageBox.confirm(t('research.dataCollection.laboratoryTest.approveConfirm'), t('common.confirm'), {
      type: 'warning'
    })
    await approveLabTest({ dataId: currentRow.value.dataId, auditOpinion: auditForm.auditOpinion })
    ElMessage.success(t('research.dataCollection.laboratoryTest.approveSuccess'))
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
    ElMessage.warning(t('research.dataCollection.laboratoryTest.rejectOpinionRequired'))
    return
  }
  try {
    await ElMessageBox.confirm(t('research.dataCollection.laboratoryTest.rejectConfirm'), t('common.confirm'), {
      type: 'warning'
    })
    await rejectLabTest({ dataId: currentRow.value.dataId, auditOpinion: auditForm.auditOpinion })
    ElMessage.success(t('research.dataCollection.laboratoryTest.rejectSuccess'))
    auditDialogVisible.value = false
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

<style scoped lang="scss">
@import '@/assets/styles/page-common.scss';

.audit-detail {
  max-height: 60vh;
  overflow-y: auto;
}

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
