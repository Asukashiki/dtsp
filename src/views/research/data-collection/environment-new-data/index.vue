<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-cloud-line"
        :title="$t('research.environmentNewData.title')"
        :subtitle="$t('research.environmentNewData.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('research.environmentNewData.columns.stationId')">
              <el-input
                v-model="searchForm.stationId"
                :placeholder="$t('research.environmentNewData.searchPlaceholder')"
                class="search-input"
                clearable>
                <template #prefix>
                  <i class="ri-search-line"></i>
                </template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('research.environmentNewData.columns.parameterCode')">
              <el-select
                v-model="searchForm.parameterCode"
                :placeholder="$t('research.environmentNewData.filterByParameter')"
                class="filter-select"
                clearable>
                <el-option
                  v-for="item in options.env_parameter_code || []"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('research.environmentNewData.columns.batchId')">
              <el-select
                v-model="searchForm.batchId"
                :placeholder="$t('research.environmentNewData.filterByBatch')"
                class="filter-select"
                filterable
                clearable>
                <el-option
                  v-for="item in batchOptions"
                  :key="item.batchId"
                  :label="item.batchName || item.batchId"
                  :value="item.batchId"
                />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('research.environmentNewData.columns.auditStatus')">
              <el-select
                v-model="searchForm.workflowStatus"
                :placeholder="$t('common.pleaseSelect')"
                class="filter-select"
                clearable>
                <el-option
                  v-for="opt in options.flow_status || []"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard
          :title="$t('research.environmentNewData.list')"
          icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('common.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="tableData" stripe v-loading="loading" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column prop="plotId" :label="$t('research.environmentNewData.columns.plotId')" min-width="120" />
              <el-table-column prop="batchId" :label="$t('research.environmentNewData.columns.batchId')" min-width="120" />
              <el-table-column prop="trialId" :label="$t('research.environmentNewData.columns.trialId')" min-width="120" />
              <el-table-column prop="stationId" :label="$t('research.environmentNewData.columns.stationId')" min-width="120" />
              <el-table-column prop="parameterCode" :label="$t('research.environmentNewData.columns.parameterCode')" min-width="140" align="center">
                <template #default="{ row }">
                  <el-tag :type="getParameterTag(row.parameterCode)" size="small">
                    {{ getParameterName(row.parameterCode) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="value" :label="$t('research.environmentNewData.columns.value')" min-width="100" align="right" />
              <el-table-column prop="unit" :label="$t('research.environmentNewData.columns.unit')" min-width="80" align="center" />
              <el-table-column prop="timestamp" :label="$t('research.environmentNewData.columns.timestamp')" min-width="160" align="center" />
              <el-table-column prop="source" :label="$t('research.environmentNewData.columns.source')" min-width="100" align="center" />
              <el-table-column :label="$t('research.environmentNewData.columns.auditStatus')" min-width="140" align="center">
                <template #default="{ row }">
                  <el-tag :type="getWorkflowStatusType(row.workflowStatus)" effect="plain">
                    {{ getLabelByValue('flow_status', row.workflowStatus) || row.workflowStatus || '-' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column :label="$t('research.environmentNewData.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="row.workflowStatus || 'S0'"
                    mode="list"
                    :show-audit="false"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="pagination.pageNum"
                v-model:page-size="pagination.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="pagination.total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handlePageChange"
              />
            </div>
          </div>
        </InfoCard>

        <!-- 移动端卡片 -->
        <div class="mobile-card-list mobile-only">
          <div v-for="item in tableData" :key="item.envRecordId" class="mobile-card">
            <div class="mobile-card-header">
              <el-checkbox v-model="item.checked" @change="handleMobileSelect(item)" />
              <div class="mobile-card-title">
                <i class="ri-cloud-line"></i>
                <span>{{ item.stationId }}</span>
              </div>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.environmentNewData.columns.parameterCode') }}:</span>
                <el-tag :type="getParameterTag(item.parameterCode)" size="small">
                  {{ getParameterName(item.parameterCode) }}
                </el-tag>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.environmentNewData.columns.value') }}:</span>
                <span class="value">{{ item.value }} {{ item.unit }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.environmentNewData.columns.timestamp') }}:</span>
                <span class="value">{{ item.timestamp }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.environmentNewData.columns.batchId') }}:</span>
                <span class="value">{{ item.batchName || item.batchId || '-' }}</span>
              </div>
            </div>
            <div class="mobile-card-footer">
              <ActionButtons
                :workflow-status="item.workflowStatus || 'S0'"
                mode="list"
                :show-audit="false"
                @action="(action) => handleAction(item, action)" />
            </div>
          </div>

          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="pagination.pageNum"
              v-model:page-size="pagination.pageSize"
              :total="pagination.total"
              layout="prev, pager, next"
              small
              @current-change="handlePageChange"
            />
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
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import ActionButtons from '@/components/workflow/ActionButtons.vue'
import { getEnvironmentNewDataPage, deleteEnvironmentNewData, submitEnvironmentNewDataForAudit } from '@/api/environment-new-data'
import { getBreedingBatchList } from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'
import { useUserStore } from '@/store'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()
const { options, getLabelByValue } = useDict(['flow_status', 'env_parameter_code'])

const loading = ref(false)
const tableData = ref([])
const batchOptions = ref([])
const selectedIds = ref([])

// 获取工作流状态标签类型
const getWorkflowStatusType = (workflowStatus) => {
  const workflowStatusMap = {
    'S0': 'info',      // 草稿 - 灰色
    'S1': 'warning',   // 待审批 - 橙色
    'S2': 'primary',   // 审核通过 - 蓝色
    'S3': 'danger',    // 审核驳回 - 红色
    'S9': 'danger',    // 已作废 - 深红色
    'S10': 'danger'    // 异常 - 深红色
  }
  return workflowStatusMap[workflowStatus] || 'info'
}

const searchForm = reactive({
  stationId: '',
  parameterCode: '',
  batchId: '',
  workflowStatus: ''
})

const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

// 获取参数类型标签
const getParameterTag = (code) => {
  const tagMap = {
    'RAIN_DAILY': 'primary',
    'TMAX': 'danger',
    'TMIN': 'info',
    'HUMIDITY': '',
    'WIND_SPEED': 'warning',
    'SOLAR_RAD': 'success'
  }
  return tagMap[code] || ''
}

// 获取参数名称（使用字典）
const getParameterName = (code) => {
  return getLabelByValue('env_parameter_code', code) || code || '-'
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.envRecordId)
}

const handleMobileSelect = (item) => {
  if (item.checked) {
    if (!selectedIds.value.includes(item.envRecordId)) {
      selectedIds.value.push(item.envRecordId)
    }
  } else {
    selectedIds.value = selectedIds.value.filter(id => id !== item.envRecordId)
  }
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getEnvironmentNewDataPage({
      ...searchForm,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })

    if (res.code === 200) {
      tableData.value = res.rows || []
      pagination.total = res.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

// 加载批次选项
const loadBatchOptions = async () => {
  try {
    const res = await getBreedingBatchList({ pageNum: 1, pageSize: 500 })
    if (res.code === 200) {
      batchOptions.value = res.rows || []
    }
  } catch (error) {
    console.error('Failed to load batch options:', error)
  }
}

// 搜索
const handleQuery = () => {
  pagination.pageNum = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.stationId = ''
  searchForm.parameterCode = ''
  searchForm.batchId = ''
  searchForm.workflowStatus = ''
  pagination.pageNum = 1
  loadData()
}

// 新增
const handleAdd = () => {
  router.push('/research/data-collection/environment-new-data/add')
}

// 查看
const handleView = (row) => {
  router.push(`/research/data-collection/environment-new-data/detail/${row.envRecordId}`)
}

// 编辑
const handleEdit = (row) => {
  router.push(`/research/data-collection/environment-new-data/edit/${row.envRecordId}`)
}

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm(
    t('research.environmentNewData.deleteConfirm'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await deleteEnvironmentNewData([row.envRecordId])
      if (res.code === 200) {
        ElMessage.success(t('research.environmentNewData.deleteSuccess'))
        loadData()
      }
    } catch (error) {
      console.error('Failed to delete:', error)
      ElMessage.error(t('common.failed'))
    }
  }).catch(() => {})
}

// 处理操作按钮点击
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleView(row)
      break
    case 'edit':
      handleEdit(row)
      break
    case 'submit':
      handleSubmitForAudit(row)
      break
    case 'cancelBatch':
      handleDelete(row)
      break
  }
}

// 提交审核
const handleSubmitForAudit = async (row) => {
  try {
    // 检查权限
    if (!userStore.hasWorkflowStatusPermission('submit')) {
      ElMessage.error(t('common.noPermission'))
      return
    }

    await ElMessageBox.confirm(
      t('research.environmentNewData.submitForAuditConfirm'),
      t('common.prompt'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )
    const res = await submitEnvironmentNewDataForAudit(row.envRecordId)
    if (res.code === 200) {
      ElMessage.success(t('research.environmentNewData.submitForAuditSuccess'))
      loadData()
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to submit for audit:', error)
      ElMessage.error(t('research.environmentNewData.submitForAuditFailed'))
    }
  }
}

// 切换每页条数
const handleSizeChange = () => {
  pagination.pageNum = 1
  loadData()
}

// 切换页码
const handlePageChange = () => {
  loadData()
}

onMounted(() => {
  loadBatchOptions()
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
