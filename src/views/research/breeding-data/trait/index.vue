<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-leaf-line"
        :title="$t('trait.title')"
        :subtitle="$t('trait.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片 -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('trait.growthStage')">
              <el-select
                v-model="queryParams.growthStage"
                :placeholder="$t('common.pleaseSelect')"
                clearable
                class="filter-select">
                <el-option v-for="item in options.growth_cycle || []" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('trait.columns.status')">
              <el-select
                v-model="queryParams.workflowStatus"
                :placeholder="$t('common.pleaseSelect')"
                clearable
                class="filter-select">
                <el-option
                  v-for="opt in options.flow_status || []"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard :title="$t('trait.list')" icon="ri-file-list-3-line">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('trait.add') }}
            </el-button>
          </template>

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="dataList" stripe v-loading="loading" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center" />
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
              <el-table-column :label="$t('trait.columns.status')" min-width="140">
                <template #default="{ row }">
                  <el-tag type="info">{{ getLabelByValue('flow_status', row.workflowStatus || row.status) || row.workflowStatus || row.status || '-' }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="createBy" :label="$t('trait.columns.createBy')" min-width="120" show-overflow-tooltip />
              <el-table-column prop="createTime" :label="$t('trait.columns.createTime')" min-width="160" />
              <el-table-column :label="$t('trait.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="mapStatusToWorkflowStatus(row.workflowStatus || row.status || 'S0')"
                    mode="list"
                    :show-audit="false"
                    @action="(action) => handleAction(row, action)" />
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
                @current-change="getList" />
            </div>
          </div>
        </InfoCard>

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
                <span class="label">{{ $t('trait.columns.status') }}:</span>
                <span class="value">{{ getLabelByValue('flow_status', item.workflowStatus || item.status) || item.workflowStatus || item.status || '-' }}</span>
              </div>
            </div>
            <div class="mobile-card-footer">
              <ActionButtons
                :workflow-status="mapStatusToWorkflowStatus(item.workflowStatus || item.status || 'S0')"
                mode="list"
                :show-audit="false"
                @action="(action) => handleAction(item, action)" />
            </div>
          </div>

          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="queryParams.pageNum"
              v-model:page-size="queryParams.pageSize"
              :total="total"
              layout="prev, pager, next"
              small
              @current-change="getList" />
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
import {
  getTraitRecordList,
  getBatchOptions,
  getTrialOptions,
  submitTraitRecordAudit,
  deleteTraitRecord
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
    const params = { ...queryParams }
    
    // 使用字典获取后端存储值
    if (params.workflowStatus) {
      const actualValue = getLabelByValue('flow_status', params.workflowStatus)
      if (actualValue) {
        params.workflowStatus = actualValue
      }
    }

    const res = await getTraitRecordList(params)
    // 兼容后端返回格式，和数据集页面保持一致
    dataList.value = res.data?.list || res.rows || []
    total.value = res.data?.total || res.total || 0
    
    // 调试：查看第一条数据的状态字段
    if (dataList.value.length > 0) {
      console.log('🔍 Trait 数据状态字段调试:', {
        workflowStatus: dataList.value[0].workflowStatus,
        status: dataList.value[0].status,
        mapped: mapStatusToWorkflowStatus(dataList.value[0].workflowStatus || dataList.value[0].status)
      })
    }
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

// 核心修改：替换为deleteTraitRecord方法
const handleDelete = (row) => {
  ElMessageBox.confirm(t('trait.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deleteTraitRecord(row.recordId) // 替换为deleteTraitRecord
    ElMessage.success(t('trait.deleteSuccess'))
    getList()
  }).catch(() => {})
}

// 核心修改：批量删除也替换为deleteTraitRecord方法
const handleBatchDelete = () => {
  ElMessageBox.confirm(t('trait.deleteConfirm'), t('common.warning'), {
    type: 'warning'
  }).then(async () => {
    await deleteTraitRecord(selectedIds.value.join(',')) // 替换为deleteTraitRecord
    ElMessage.success(t('trait.deleteSuccess'))
    selectedIds.value = []
    getList()
  }).catch(() => {})
}

// 新增：作废方法（逻辑可根据业务需求调整，当前为标准确认流程）
const handleInvalid = async (row) => {
  try {
    // 弹窗确认作废操作
    await ElMessageBox.confirm(
        t('trait.invalidConfirm'), // 需在国际化文件中配置该文案，如“确定要作废该性状记录吗？”
        t('common.confirm'),
        {
          confirmButtonText: t('common.confirm'),
          cancelButtonText: t('common.cancel'),
          type: 'warning'
        }
    )
    // 此处可调用作废接口（若有单独作废接口，替换为实际接口；若无，可暂时预留或复用逻辑）
    // 示例：若作废接口为invalidAgronomicTrait，可改为 await invalidAgronomicTrait(row.recordId)
    await deleteTraitRecord(row.recordId) // 临时复用删除接口，可根据实际业务替换
    ElMessage.success(t('trait.invalidSuccess')) // 国际化文案：“性状记录作废成功”
    getList() // 刷新列表
  } catch (error) {
    // 取消操作不提示错误
    if (error !== 'cancel') {
      console.error('作废性状记录失败:', error)
      ElMessage.error(t('trait.invalidFailed')) // 国际化文案：“性状记录作废失败”
    }
  }
}

// 发起性状审核方法
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

// 统一动作处理
// 状态映射：将字符串状态转换为标准工作流状态码
// 兼容两种情况：1. 后端返回标准状态码（S0-S10）2. 后端返回字符串状态（draft, pending等）
const mapStatusToWorkflowStatus = (status) => {
  if (!status) return 'S0'
  
  // 如果已经是标准状态码（S0-S10），直接返回
  if (/^S\d+$/.test(status)) {
    return status
  }
  
  // 字符串状态映射表
  const statusMap = {
    'draft': 'S0',           // 草稿
    'pending': 'S1',         // 待审批
    'submitted': 'S1',       // 已提交（待审批）
    'approved': 'S2',        // 审核通过
    'rejected': 'S3',        // 审核驳回
    'archived': 'S9',        // 已归档
    'voided': 'S10',         // 已作废
    'invalid': 'S10',        // 已作废
    'cancelled': 'S10'       // 已作废
  }
  
  // 转换为小写进行匹配
  const lowerStatus = status.toLowerCase()
  return statusMap[lowerStatus] || 'S0'
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
      handleSubmitAudit(row)
      break
    case 'cancelBatch':
      handleInvalid(row)
      break
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
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';
</style>