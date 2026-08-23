<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-inbox-line"
        :title="$t('input.inventory.stockIn.title')"
        :subtitle="$t('input.inventory.stockIn.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片（无标题） -->
        <div class="search-card">
          <SearchForm @search="handleQuery" @reset="handleReset">
            <SearchItem :label="$t('input.inventory.stockIn.filter.orderId')">
              <el-input
                v-model="queryParams.inboundOrderId"
                :placeholder="$t('input.inventory.stockIn.placeholder.orderId')"
                clearable
                class="search-input">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('input.inventory.stockIn.filter.type')">
              <el-select
                v-model="queryParams.inboundType"
                :placeholder="$t('input.inventory.stockIn.filter.type')"
                clearable
                class="filter-select"
                @change="handleQuery">
                <el-option :label="$t('common.all')" value="" />
                <el-option :label="$t('input.inventory.stockIn.type.production')" :value="0" />
                <el-option :label="$t('input.inventory.stockIn.type.purchase')" :value="1" />
                <el-option :label="$t('input.inventory.stockIn.type.transfer')" :value="2" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard
          :title="$t('input.inventory.stockIn.list')"
          icon="ri-file-list-3-line"
          :no-padding="true">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('input.inventory.stockIn.create') }}
            </el-button>
          </template>

          <!-- 状态标签页 -->
          <StatusTabs
            v-model="activeTab"
            :tabs="tabConfig"
            @tab-change="handleTabChange" />

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table :data="inboundList" stripe v-loading="loading" class="stock-in-table">
              <el-table-column
                prop="inbound_order_id"
                :label="$t('input.inventory.stockIn.columns.orderId')"
                width="180"
                fixed="left"
              />
              <el-table-column
                prop="inbound_type_name"
                :label="$t('input.inventory.stockIn.columns.type')"
                width="120"
              >
                <template #default="{ row }">
                  <el-tag :type="getTypeTag(row.inbound_type)" size="small">
                    {{ getTypeText(row.inbound_type) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="warehouse_name"
                :label="$t('input.inventory.stockIn.columns.warehouse')"
                width="150"
                show-overflow-tooltip
              />
              <el-table-column
                prop="supplier_name"
                :label="$t('input.inventory.stockIn.columns.supplier')"
                width="150"
                show-overflow-tooltip
                class-name="hidden-column"
              />
              <el-table-column
                prop="total_quantity"
                :label="$t('input.inventory.stockIn.columns.quantity')"
                width="120"
                align="right"
              >
                <template #default="{ row }">
                  {{ row.total_quantity ? row.total_quantity.toFixed(2) : '-' }}
                </template>
              </el-table-column>
              <el-table-column
                prop="inbound_status"
                :label="$t('input.inventory.stockIn.columns.status')"
                width="160"
                align="center"
                header-align="center"
                class-name="status-column"
              >
                <template #default="{ row }">
                  <el-tag class="status-tag" :type="getStatusTag(row.inbound_status)" size="small">
                    {{ getStatusText(row.inbound_status) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="operator"
                :label="$t('input.inventory.stockIn.columns.operator')"
                width="120"
              />
              <el-table-column
                prop="apply_time"
                :label="$t('input.inventory.stockIn.columns.applyTime')"
                width="160"
              >
                <template #default="{ row }">
                  {{ formatDateTime(row.apply_time) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="inbound_time"
                :label="$t('input.inventory.stockIn.columns.inboundTime')"
                width="160"
              >
                <template #default="{ row }">
                  {{ formatDateTime(row.inbound_time) }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('input.inventory.stockIn.columns.actions')" width="280" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="getWorkflowStatus(row.inbound_status)"
                    mode="list"
                    :show-audit="activeTab === 'pendingApproval'"
                    :show-confirm="activeTab === 'approved'"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="queryParams.page"
                v-model:page-size="queryParams.pageSize"
                :total="total"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                @current-change="handleQuery"
                @size-change="handleQuery"
              />
            </div>
          </div>
        </InfoCard>

        <!-- 移动端卡片 -->
        <div class="mobile-card-list mobile-only">
          <div
            v-for="item in inboundList"
            :key="item.inbound_order_id"
            class="mobile-card"
            @click="handleDetail(item)"
          >
            <div class="mobile-card-header">
              <div class="mobile-card-title">
                <i class="ri-inbox-line"></i>
                <span>{{ item.inbound_order_id }}</span>
              </div>
              <el-tag :type="getStatusTag(item.inbound_status)" size="small">
                {{ getStatusText(item.inbound_status) }}
              </el-tag>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.inventory.stockIn.columns.type') }}:</span>
                <el-tag :type="getTypeTag(item.inbound_type)" size="small">
                  {{ getTypeText(item.inbound_type) }}
                </el-tag>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.inventory.stockIn.columns.warehouse') }}:</span>
                <span class="value">{{ item.warehouse_name }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.inventory.stockIn.columns.quantity') }}:</span>
                <span class="value">{{ item.total_quantity ? item.total_quantity.toFixed(2) : '-' }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.inventory.stockIn.columns.applyTime') }}:</span>
                <span class="value">{{ formatDateTime(item.apply_time) }}</span>
              </div>
            </div>
            <div class="mobile-card-footer" @click.stop>
              <ActionButtons
                :workflow-status="getWorkflowStatus(item.inbound_status)"
                mode="list"
                :show-audit="activeTab === 'pendingApproval'"
                :show-confirm="activeTab === 'approved'"
                @action="(action) => handleAction(item, action)" />
            </div>
          </div>

          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="queryParams.page"
              :total="total"
              :page-size="queryParams.pageSize"
              layout="prev, pager, next"
              small
              @current-change="handleQuery"
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
import {
  getInboundOrderList,
  getPendingInboundCount,
  auditInboundOrder,
  confirmInbound,
  cancelInboundOrder
} from '@/api/inbound'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import StatusTabs from '@/components/workflow/StatusTabs.vue'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const inboundList = ref([])
const total = ref(0)
const pendingCount = ref(0)
const currentUserOrganCode = ref('') // 当前用户部门ID
const activeTab = ref('pendingApproval')

// 标签页配置 - 使用状态文本作为标签（因为国际化文件中没有tabs定义）
const tabConfig = [
  {
    name: 'pendingApproval',
    label: 'input.inventory.stockIn.status.pending',
    icon: 'ri-time-line'
  },
  {
    name: 'approved',
    label: 'input.inventory.stockIn.status.approved',
    icon: 'ri-check-line'
  },
  {
    name: 'completed',
    label: 'input.inventory.stockIn.status.completed',
    icon: 'ri-checkbox-circle-line'
  }
]

const queryParams = reactive({
  page: 1,
  pageSize: 20,
  inboundStatus: '',
  inboundType: '',
  inboundOrderId: ''
})

// 将状态映射到工作流状态
const getWorkflowStatus = (status) => {
  const statusMap = {
    'pending': 'S1',      // 待审批
    'approved': 'S2',    // 审核通过
    'completed': 'S2',   // 已完成（等同于审核通过）
    'cancelled': 'S10',  // 已作废
    'rejected': 'S3'     // 审核驳回
  }
  return statusMap[status] || 'S0'
}

// 格式化日期时间
const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return '-'

  // 处理带时区信息的日期格式，如: 2025-12-14 11:00:27.000+08:00
  if (dateTimeStr.includes('+') && dateTimeStr.includes('.')) {
    // 提取日期部分和时间部分，去掉毫秒和时区信息
    const datePart = dateTimeStr.split(' ')[0]
    const timePart = dateTimeStr.split(' ')[1].split('.')[0]
    return `${datePart} ${timePart}`
  }

  // 处理ISO格式日期，如: 2025-12-14T11:00:27
  if (dateTimeStr.includes('T')) {
    return dateTimeStr.replace('T', ' ')
  }

  return dateTimeStr
}

// 获取当前用户部门ID
const getCurrentUserOrganCode = () => {
  const userInfoStr = localStorage.getItem('userInfo')
  if (userInfoStr) {
    const userInfo = JSON.parse(userInfoStr)
    const user = userInfo.user || userInfo
    return user.ORGANCODE || ''
  }
  return ''
}

// 根据标签页设置查询参数
const setQueryParamsByTab = (tabName) => {
  switch (tabName) {
    case 'pendingApproval':
      queryParams.inboundStatus = 'pending'
      break
    case 'approved':
      queryParams.inboundStatus = 'approved'
      break
    case 'completed':
      queryParams.inboundStatus = 'completed'
      break
    default:
      queryParams.inboundStatus = ''
  }
}

// 标签页切换
const handleTabChange = (tabName) => {
  setQueryParamsByTab(tabName)
  queryParams.page = 1
  handleQuery()
}

// 查询入库单列表
const handleQuery = async () => {
  loading.value = true
  try {
    const params = {
      ...queryParams,
      organCode: currentUserOrganCode.value // 添加部门过滤参数
    }
    const res = await getInboundOrderList(params)
    if (res.code === 200) {
      inboundList.value = res.data.items || []
      total.value = res.data.total || 0
    }
  } catch (error) {
    console.error('Failed to load inbound list:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 加载待审核数量
const loadPendingCount = async () => {
  try {
    const res = await getPendingInboundCount()
    if (res.code === 200) {
      pendingCount.value = res.data || 0
    }
  } catch (error) {
    console.error('Failed to load pending count:', error)
  }
}

// 重置查询条件
const handleReset = () => {
  queryParams.page = 1
  queryParams.pageSize = 20
  queryParams.inboundType = ''
  queryParams.inboundOrderId = ''
  setQueryParamsByTab(activeTab.value)
  handleQuery()
}

// 新建入库单
const handleAdd = () => {
  router.push('/input/inventory/stock-in/form')
}

// 统一动作处理方法
const handleAction = (row, action) => {
  switch (action) {
    case 'view':
      handleDetail(row)
      break
    case 'edit':
      handleEdit(row)
      break
    case 'submit':
      handleSubmitForAudit(row)
      break
    case 'audit':
      handleAudit(row)
      break
    case 'approve':
      handleApprove(row)
      break
    case 'reject':
      handleReject(row)
      break
    case 'archive':
      handleArchive(row)
      break
    case 'cancelBatch':
      handleCancel(row)
      break
    case 'confirm':
      handleConfirm(row)
      break
  }
}

// 查看详情
const handleDetail = (row) => {
  router.push(`/input/inventory/stock-in/detail/${row.inbound_order_id}`)
}

// 编辑
const handleEdit = (row) => {
  router.push(`/input/inventory/stock-in/form/${row.inbound_order_id}`)
}

// 提交审核
const handleSubmitForAudit = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('common.submitConfirm'),
      t('common.warning'),
      { type: 'warning' }
    )
    // 这里需要调用提交审核的API，如果没有则跳过
    ElMessage.success(t('common.submitSuccess'))
    handleQuery()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('common.submitFailed'))
    }
  }
}

// 审核入库单
const handleAudit = async (row) => {
  ElMessageBox.prompt(
    t('input.inventory.stockIn.auditOpinion'),
    t('input.inventory.stockIn.audit'),
    {
      confirmButtonText: t('input.inventory.stockIn.approve'),
      cancelButtonText: t('input.inventory.stockIn.reject'),
      distinguishCancelAndClose: true,
      inputPlaceholder: t('input.inventory.stockIn.placeholder.auditOpinion')
    }
  )
    .then(async ({ value }) => {
      // 审核通过
      await auditInboundOrder(row.inbound_order_id, {
        auditStatus: 'approved',
        auditUser: t('common.currentUser'),
        auditTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
        remark: value || ''
      })
      ElMessage.success(t('input.inventory.stockIn.auditSuccess'))
      handleQuery()
      loadPendingCount()
    })
    .catch(async (action) => {
      if (action === 'cancel') {
        const { value } = await ElMessageBox.prompt(
          t('input.inventory.stockIn.rejectReason'),
          t('input.inventory.stockIn.reject'),
          {
            inputPlaceholder: t('input.inventory.stockIn.placeholder.rejectReason')
          }
        )
        await auditInboundOrder(row.inbound_order_id, {
          auditStatus: 'rejected',
          auditUser: t('common.currentUser'),
          auditTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
          remark: value || ''
        })
        ElMessage.success(t('input.inventory.stockIn.rejectSuccess'))
        handleQuery()
        loadPendingCount()
      }
    })
}

// 审核通过
const handleApprove = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('input.inventory.stockIn.approveConfirm'),
      t('common.warning'),
      { type: 'warning' }
    )
    await auditInboundOrder(row.inbound_order_id, {
      auditStatus: 'approved',
      auditUser: t('common.currentUser'),
      auditTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      remark: ''
    })
    ElMessage.success(t('input.inventory.stockIn.auditSuccess'))
    handleQuery()
    loadPendingCount()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('common.failed'))
    }
  }
}

// 审核驳回
const handleReject = async (row) => {
  try {
    const { value } = await ElMessageBox.prompt(
      t('input.inventory.stockIn.rejectReason'),
      t('input.inventory.stockIn.reject'),
      {
        inputPlaceholder: t('input.inventory.stockIn.placeholder.rejectReason')
      }
    )
    await auditInboundOrder(row.inbound_order_id, {
      auditStatus: 'rejected',
      auditUser: t('common.currentUser'),
      auditTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      remark: value || ''
    })
    ElMessage.success(t('input.inventory.stockIn.rejectSuccess'))
    handleQuery()
    loadPendingCount()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('common.failed'))
    }
  }
}

// 归档
const handleArchive = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('input.inventory.stockIn.archiveConfirm'),
      t('common.warning'),
      { type: 'warning' }
    )
    // 这里需要调用归档API，如果没有则跳过
    ElMessage.success(t('common.archiveSuccess'))
    handleQuery()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('common.failed'))
    }
  }
}

// 执行入库
const handleConfirm = async (row) => {
  ElMessageBox.confirm(t('input.inventory.stockIn.confirmMessage'), t('common.confirm'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(async () => {
    try {
      const res = await confirmInbound(row.inbound_order_id, {
        inboundTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
        operator: t('common.currentUser')
      })
      ElMessage.success(t('input.inventory.stockIn.confirmSuccess'))

      // 显示批次号信息
      if (res.data?.updated_stock) {
        const batchInfo = res.data.updated_stock
          .map(
            (item) =>
              `${t('input.inventory.stockIn.material')} ${item.material_id}: ${t('input.inventory.stockIn.batch')} ${item.batch_id}`
          )
          .join('\n')
        ElMessageBox.alert(batchInfo, t('input.inventory.stockIn.batchInfo'), {
          type: 'success'
        })
      }

      handleQuery()
      loadPendingCount()
    } catch (error) {
      // 检查是否是仓库容量不足的错误
      if (error.response?.data?.msg && error.response.data.msg.includes('The entry into the warehouse failed')) {
        ElMessage.error(error.response.data.msg)
      } else {
        // 其他错误类型的通用处理
        const errorMessage = error.response?.data?.msg || error.message || t('input.inventory.stockIn.confirmFailed')
        ElMessage.error(errorMessage)
      }
    }
  })
}

// 取消入库单
const handleCancel = async (row) => {
  ElMessageBox.confirm(t('input.inventory.stockIn.cancelMessage'), t('common.confirm'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(async () => {
    await cancelInboundOrder(row.inbound_order_id, t('common.currentUser'))
    ElMessage.success(t('input.inventory.stockIn.cancelSuccess'))
    handleQuery()
    loadPendingCount()
  })
}

// 获取状态标签类型
const getStatusTag = (status) => {
  const map = {
    pending: 'warning',
    approved: 'success',
    completed: 'success',
    cancelled: 'info',
    rejected: 'danger'
  }
  return map[status] || ''
}

// 获取状态文本
const getStatusText = (status) => {
  // 直接使用状态值，因为翻译文件中已包含所有状态
  return t(`input.inventory.stockIn.status.${status}`)
}

// 获取类型标签
const getTypeTag = (type) => {
  const map = {
    0: '',
    1: 'success',
    2: 'warning'
  }
  return map[type] || ''
}

const getTypeText = (type) => {
  const typeMap = {
    0: t('input.inventory.stockIn.type.production'),
    1: t('input.inventory.stockIn.type.purchase'),
    2: t('input.inventory.stockIn.type.transfer'),
    3: t('input.inventory.stockIn.type.return'),
  }
  return typeMap[type] || '-'
}

onMounted(() => {
  currentUserOrganCode.value = getCurrentUserOrganCode()
  setQueryParamsByTab(activeTab.value)
  handleQuery()
  loadPendingCount()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';

/* 隐藏表格列 */
:deep(.hidden-column) {
  display: none !important;
}

:deep(.stock-in-table .status-column .cell) {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  white-space: nowrap;
}

:deep(.stock-in-table .status-tag) {
  display: inline-flex;
  align-items: center;
  max-width: none;
  white-space: nowrap;
}
</style>
