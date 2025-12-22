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
            <h1 class="page-title">{{ $t('trait.title') }}</h1>
            <p class="page-subtitle">{{ $t('trait.subtitle') }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-file-list-3-line"></i>
              <span>{{ $t('trait.list') }}</span>
            </div>
            <div class="header-actions">
              <el-button type="primary" @click="handleAdd">
                <i class="ri-add-line"></i>
                {{ $t('trait.add') }}
              </el-button>
            </div>
          </div>

          <div class="card-body">
            <!-- 搜索筛选区 -->
            <div class="search-section">
              <div class="search-item">
                <span class="search-label">{{ $t('trait.batchId') }}:</span>
                <el-select
                    v-model="queryParams.batchId"
                    :placeholder="$t('common.pleaseSelect')"
                    clearable
                    class="filter-select"
                >
                  <el-option v-for="item in batchOptions" :key="item.batchId" :label="item.batchId" :value="item.batchId" />
                </el-select>
              </div>
              <div class="search-item">
                <span class="search-label">{{ $t('trait.trialId') }}:</span>
                <el-select
                    v-model="queryParams.trialId"
                    :placeholder="$t('common.pleaseSelect')"
                    clearable
                    class="filter-select"
                >
                  <el-option v-for="item in trialOptions" :key="item.trialId" :label="item.trialId" :value="item.trialId" />
                </el-select>
              </div>
              <div class="search-item">
                <span class="search-label">{{ $t('trait.growthStage') }}:</span>
                <el-select
                    v-model="queryParams.growthStage"
                    :placeholder="$t('common.pleaseSelect')"
                    clearable
                    class="filter-select"
                >
                  <el-option v-for="item in options.growth_cycle || []" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
              <div class="search-item">
                <span class="search-label">{{ $t('trait.columns.workflowStatus') }}:</span>
                <el-select
                    v-model="queryParams.workflowStatus"
                    :placeholder="$t('common.pleaseSelect')"
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
                <el-table-column prop="recordId" :label="$t('trait.columns.recordId')" min-width="160" show-overflow-tooltip />
                <el-table-column prop="plotId" :label="$t('trait.columns.plotId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="trialId" :label="$t('trait.columns.trialId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="batchId" :label="$t('trait.columns.batchId')" min-width="140" show-overflow-tooltip />
                <el-table-column prop="observationDate" :label="$t('trait.columns.observationDate')" min-width="160" />
                <el-table-column prop="growthStage" :label="$t('trait.columns.growthStage')" min-width="120">
                  <template #default="{ row }">
                    {{ getLabelByValue('growth_cycle', row.growthStage) || row.growthStage }}
                  </template>
                </el-table-column>
                <el-table-column prop="traitCount" :label="$t('trait.columns.traitCount')" min-width="100" align="center">
                  <template #default="{ row }">
                    <el-tag type="success">{{ row.traitCount || 0 }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('trait.columns.workflowStatus')" min-width="140">
                  <template #default="{ row }">
                    <el-tag type="info">{{ getLabelByValue('flow_status', row.workflowStatus) || row.workflowStatus }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="createBy" :label="$t('trait.columns.createBy')" min-width="120" show-overflow-tooltip />
                <el-table-column prop="createTime" :label="$t('trait.columns.createTime')" min-width="160" />
                <el-table-column :label="$t('trait.columns.actions')" width="280" fixed="right">
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <el-button link type="primary" @click="handleView(row)">
                        <i class="ri-eye-line"></i>{{ $t('common.view') }}
                      </el-button>
                      <el-button link type="primary" @click="handleEdit(row)">
                        <i class="ri-edit-line"></i>{{ $t('common.edit') }}
                      </el-button>
                      <!-- 新增：发起审核按钮（仅草稿/驳回状态可见） -->
                      <el-button
                          v-if="row.status === 'draft' || row.status === 'rejected'"
                          link
                          type="success"
                          @click="handleSubmitAudit(row)"
                      >
                        <i class="ri-send-plane-line"></i>{{ $t('trait.submitAudit') }}
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
              <div v-for="item in dataList" :key="item.recordId" class="mobile-card">
                <div class="mobile-card-header">
                  <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
                  <div class="mobile-card-title">
                    <i class="ri-plant-line"></i>
                    <span>{{ item.recordId }}</span>
                  </div>
                  <el-tag type="success" size="small">{{ item.traitCount || 0 }} {{ $t('trait.traitDetails') }}</el-tag>
                </div>
                <div class="mobile-card-body">
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('trait.plotId') }}:</span>
                    <span class="value">{{ item.plotId }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('trait.observationDate') }}:</span>
                    <span class="value">{{ item.observationDate }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('trait.growthStage') }}:</span>
                    <span class="value">{{ getLabelByValue('growth_cycle', item.growthStage) || item.growthStage }}</span>
                  </div>
                  <div class="mobile-card-row">
                    <span class="label">{{ $t('trait.columns.workflowStatus') }}:</span>
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
                  <!-- 新增：发起审核按钮（仅草稿/驳回状态可见） -->
                  <el-button
                      v-if="item.workflowStatus === 'draft' || item.workflowStatus === 'rejected'"
                      size="small"
                      type="success"
                      @click="handleSubmitAudit(item)"
                  >
                    <i class="ri-send-plane-line"></i>{{ $t('trait.submitAudit') }}
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
import {
  getTraitRecordList,
  deleteTraitRecord,
  getBatchOptions,
  getTrialOptions,
  submitTraitRecordAudit
} from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const { t } = useI18n()
const { options, getLabelByValue } = useDict(['flow_status', 'growth_cycle'])

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
  growthStage: '',
  workflowStatus: ''
})

const getList = async () => {
  loading.value = true
  try {
    const res = await getTraitRecordList(queryParams)
    // 兼容后端返回格式，和数据集页面保持一致
    debugger;
    dataList.value = res.data?.list || res.rows || []
    total.value = res.data?.total || res.total || 0
  } catch (error) {
    console.error('获取列表失败:', error)
    ElMessage.error(t('common.loadFailed'))
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
  queryParams.growthStage = ''
  queryParams.workflowStatus = ''
  getList()
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.recordId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.recordId)) {
      selectedIds.value.push(item.recordId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.recordId)
  }
}

const handleAdd = () => {
  router.push('/research/breeding-data/trait/add')
}

const handleView = (row) => {
  router.push(`/research/breeding-data/trait/detail/${row.recordId}`)
}

const handleEdit = (row) => {
  router.push(`/research/breeding-data/trait/edit/${row.recordId}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(t('trait.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deleteTraitRecord(row.recordId)
    ElMessage.success(t('trait.deleteSuccess'))
    getList()
  }).catch(() => {})
}

const handleBatchDelete = () => {
  ElMessageBox.confirm(t('trait.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deleteTraitRecord(selectedIds.value.join(','))
    ElMessage.success(t('trait.deleteSuccess'))
    selectedIds.value = []
    getList()
  }).catch(() => {})
}

// 新增：发起性状审核方法（仿照数据集页面逻辑）
const handleSubmitAudit = async (row) => {
  try {
    // 弹窗确认提交
    await ElMessageBox.confirm(
        t('trait.submitAuditConfirm'),
        t('common.warning'),
        {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        }
    )
    // 调用审核接口
    const res = await submitTraitRecordAudit(row.recordId)
    if (res.code === 200) {
      ElMessage.success(t('trait.submitAuditSuccess'))
      getList() // 刷新列表
    } else {
      ElMessage.error(res.msg || t('common.submitFailed'))
    }
  } catch (error) {
    // 取消操作不提示错误
    if (error !== 'cancel') {
      console.error('提交审核失败:', error)
      ElMessage.error(t('common.submitFailed'))
    }
  }
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

.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .search-section {
    .search-item {
      width: 100%;

      .search-label {
        min-width: 80px;
      }

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

  .mobile-card-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .mobile-card {
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 16px;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .mobile-card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;
  }

  .mobile-card-title {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #009A44;
    font-weight: 600;
  }

  .mobile-card-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
  }

  .mobile-card-row {
    display: flex;
    font-size: 14px;
    line-height: 1.6;
  }

  .mobile-card-row .label {
    color: #666;
    min-width: 80px;
    flex-shrink: 0;
  }

  .mobile-card-footer {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .mobile-card-footer .el-button {
    flex: 1;
    min-width: 70px;
  }
}

.pc-only {
  display: block;
}

.mobile-only {
  display: none;
}

@media screen and (max-width: 768px) {
  .pc-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }
}
</style>