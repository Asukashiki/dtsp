<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-bar-chart-box-line"
        :title="$t('research.menu.fieldInspection')"
        :subtitle="$t('research.dataCollection.yieldData.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('research.dataCollection.yieldData.columns.batchId')">
              <el-select
                v-model="searchForm.batchId"
                :placeholder="$t('research.dataCollection.yieldData.placeholder.batchId')"
                filterable
                clearable
                class="search-input"
                :loading="plotLoading"
              >
                <el-option
                  v-for="item in batchOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('research.dataCollection.yieldData.columns.plotId')">
              <el-select
                v-model="searchForm.plotId"
                :placeholder="$t('research.dataCollection.yieldData.placeholder.plotId')"
                filterable
                clearable
                class="search-input"
                :loading="plotLoading"
              >
                <el-option
                  v-for="item in plotOptions"
                  :key="item.plotId"
                  :label="item.plotId"
                  :value="item.plotId"
                />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('research.dataCollection.yieldData.columns.auditStatus')">
              <el-select
                v-model="searchForm.workflowStatus"
                :placeholder="$t('research.dataCollection.yieldData.columns.auditStatus')"
                clearable
                class="search-input"
              >
                <el-option v-for="opt in options.flow_status || []" :key="opt.value" :label="opt.label" :value="opt.value" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard
          :title="$t('research.dataCollection.yieldData.list')"
          icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('research.dataCollection.yieldData.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table v-loading="loading" :data="tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column
                prop="batchId"
                show-overflow-tooltip
                :label="$t('research.dataCollection.yieldData.columns.batchId')"
                min-width="150"
              />
              <el-table-column
                prop="trialId"
                show-overflow-tooltip
                :label="$t('research.dataCollection.yieldData.columns.trialId')"
                min-width="150"
              />
              <el-table-column
                prop="plotId"
                show-overflow-tooltip
                :label="$t('research.dataCollection.yieldData.columns.plotId')"
                min-width="120"
              />
              <el-table-column
                prop="inspectionDate"
                :label="$t('research.dataCollection.yieldData.columns.inspectionDate')"
                min-width="120"
              />
              <el-table-column
                prop="inspectionType"
                :label="$t('research.dataCollection.yieldData.columns.inspectionType')"
                min-width="120"
              />
              <el-table-column
                prop="scoreCode"
                :label="$t('research.dataCollection.yieldData.columns.scoreCode')"
                min-width="120"
              />
              <el-table-column
                prop="scoreValue"
                :label="$t('research.dataCollection.yieldData.columns.scoreValue')"
                min-width="120"
              />
              <el-table-column
                :label="$t('research.dataCollection.yieldData.columns.auditStatus')"
                min-width="140"
                align="center"
              >
                <template #default="{ row }">
                  <el-tag :type="getWorkflowStatusType(row.workflowStatus)" effect="plain">
                    {{ getLabelByValue('flow_status', row.workflowStatus) || row.workflowStatus || '-' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('common.actions')"
                fixed="right"
                width="240"
              >
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
                v-model:current-page="pagination.currentPage"
                v-model:page-size="pagination.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="pagination.total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </InfoCard>

        <!-- 移动端卡片 -->
        <div class="mobile-card-list mobile-only">
          <div v-for="item in tableData" :key="item.id" class="mobile-card">
            <div class="mobile-card-header">
              <div class="mobile-card-title">
                <i class="ri-bar-chart-box-line"></i>
                <span>{{ item.plotId }}</span>
              </div>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.dataCollection.yieldData.columns.batchId') }}:</span>
                <span class="value">{{ item.batchId }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.dataCollection.yieldData.columns.inspectionDate') }}:</span>
                <span class="value">{{ item.inspectionDate || '-' }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.dataCollection.yieldData.columns.inspectionType') }}:</span>
                <span class="value">{{ item.inspectionType || '-' }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('research.dataCollection.yieldData.columns.scoreValue') }}:</span>
                <span class="value">{{ item.scoreValue || '-' }}</span>
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
              v-model:current-page="pagination.currentPage"
              v-model:page-size="pagination.pageSize"
              :total="pagination.total"
              layout="prev, pager, next"
              small
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getYieldDataList, deleteYieldData, submitYieldDataForReview, voidYieldData } from '@/api/yieldData'
import { getPlotInfoList } from '@/api/breedingData'
import { useDict } from '@/hooks/useDict'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const router = useRouter()
const { t } = useI18n()
const { options, getLabelByValue } = useDict(['flow_status'])

const loading = ref(false)
const tableData = ref([])
const plotLoading = ref(false)
const plotOptions = ref([])
const selectedIds = ref([])

// 获取工作流状态标签类型
const getWorkflowStatusType = (workflowStatus) => {
  const workflowStatusMap = {
    'S0': 'info',
    'S1': 'warning',
    'S2': 'primary',
    'S3': 'danger',
    'S9': 'danger',
    'S10': 'danger'
  }
  return workflowStatusMap[workflowStatus] || 'info'
}

// 从地块选项中提取唯一的批次ID
const batchOptions = computed(() => {
  const batchSet = new Set()
  plotOptions.value.forEach(item => {
    if (item.batchId) {
      batchSet.add(item.batchId)
    }
  })
  return Array.from(batchSet).map(batchId => ({ value: batchId, label: batchId }))
})

const searchForm = reactive({
  batchId: '',
  plotId: '',
  workflowStatus: ''
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 查询列表
const handleSearch = async () => {
  loading.value = true
  try {
    const res = await getYieldDataList({
      ...searchForm,
      pageNum: pagination.currentPage,
      pageSize: pagination.pageSize
    })
    if (res.code === 200) {
      tableData.value = res.data?.list || res.data || []
      pagination.total = res.data?.total || res.total || 0
    }
  } catch (error) {
    console.error('Failed to load data:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 重置
const handleReset = () => {
  searchForm.batchId = ''
  searchForm.plotId = ''
  searchForm.workflowStatus = ''
  pagination.currentPage = 1
  handleSearch()
}

// 分页处理
const handleSizeChange = () => {
  pagination.currentPage = 1
  handleSearch()
}

const handleCurrentChange = () => {
  handleSearch()
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.id)
}

// 新增
const handleAdd = () => {
  router.push({ name: 'FieldInspectionAdd' })
}

// 查看
const handleView = (row) => {
  router.push({ name: 'FieldInspectionDetail', params: { id: row.id } })
}

// 编辑
const handleEdit = (row) => {
  router.push({ name: 'FieldInspectionEdit', params: { id: row.id } })
}

// 统一动作处理
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
      handleVoid(row)
      break
  }
}

// 提交审核
const handleSubmitForAudit = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('research.dataCollection.yieldData.submitForAuditConfirm') || 'Are you sure you want to submit this record for review?',
      t('common.warning'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      }
    )
    const res = await submitYieldDataForReview({
      id: row.id,
      workflowStatus: 'S1'
    })
    if (res.code === 200) {
      ElMessage.success(t('research.dataCollection.yieldData.submitForAuditSuccess') || 'Submit for review successfully')
      handleSearch()
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to submit for review:', error)
      ElMessage.error(t('common.failed'))
    }
  }
}

// 作废
const handleVoid = async (row) => {
  try {
    const { value: reason } = await ElMessageBox.prompt(
      t('research.dataCollection.yieldData.voidReasonPrompt') || 'Please enter the reason for voiding',
      t('research.dataCollection.yieldData.voidReasonTitle') || 'Void Reason',
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        inputType: 'textarea',
        inputPlaceholder: t('research.dataCollection.yieldData.voidReasonPlaceholder') || 'Please enter the reason for voiding',
        inputValidator: (value) => {
          if (!value || value.trim() === '') {
            return t('research.dataCollection.yieldData.voidReasonRequired') || 'Void reason is required'
          }
          return true
        }
      }
    )

    const submitData = {
      id: row.id,
      remark: reason,
      workflowStatus: 'S10'
    }

    const res = await voidYieldData(submitData)
    if (res.code === 200) {
      ElMessage.success(t('research.dataCollection.yieldData.voidSuccess') || 'Void successfully')
      handleSearch()
    } else {
      ElMessage.error(res.msg || t('common.failed'))
    }
  } catch (error) {
    if (error !== 'cancel' && error !== 'close') {
      console.error('Failed to void:', error)
      ElMessage.error(t('common.failed'))
    }
  }
}

// 加载地块选项
const loadPlotOptions = async () => {
  plotLoading.value = true
  try {
    const res = await getPlotInfoList({ pageNum: 1, pageSize: 1000 })
    if (res.code === 200) {
      plotOptions.value = res.rows || []
    }
  } catch (error) {
    console.error('Failed to load plot options:', error)
  } finally {
    plotLoading.value = false
  }
}

onMounted(() => {
  loadPlotOptions()
  handleSearch()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>
