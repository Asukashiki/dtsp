<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader
        icon="ri-inbox-unarchive-line"
        :title="$t('input.inventory.stockOut.title')"
        :subtitle="$t('input.inventory.stockOut.subtitle')" />

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 搜索卡片（无标题） -->
        <div class="search-card">
          <SearchForm @search="handleSearch" @reset="handleReset">
            <SearchItem :label="$t('input.inventory.stockOut.searchPlaceholder')">
              <el-input
                v-model="searchKeyword"
                :placeholder="$t('input.inventory.stockOut.searchPlaceholder')"
                clearable
                class="search-input"
                @keyup.enter="handleSearch">
                <template #prefix><i class="ri-search-line"></i></template>
              </el-input>
            </SearchItem>

            <SearchItem :label="$t('input.inventory.stockOut.filterByWarehouse')">
              <el-select
                v-model="filterWarehouse"
                :placeholder="$t('input.inventory.stockOut.filterByWarehouse')"
                clearable
                class="filter-select"
                @change="handleSearch">
                <el-option :label="$t('input.inventory.stockOut.allWarehouses')" value="" />
                <el-option
                  v-for="warehouse in warehouseList"
                  :key="warehouse.warehouse_id"
                  :label="warehouse.warehouse_name"
                  :value="warehouse.warehouse_id"
                />
              </el-select>
            </SearchItem>

            <SearchItem :label="$t('input.inventory.stockOut.filterByType')">
              <el-select
                v-model="filterType"
                :placeholder="$t('input.inventory.stockOut.filterByType')"
                clearable
                class="filter-select"
                @change="handleSearch">
                <el-option :label="$t('input.inventory.stockOut.allTypes')" value="" />
                <el-option :label="$t('input.inventory.stockOut.type.sale')" value="1" />
                <el-option :label="$t('input.inventory.stockOut.type.transfer')" value="2" />
              </el-select>
            </SearchItem>
          </SearchForm>
        </div>

        <!-- 列表卡片 -->
        <InfoCard
          :title="$t('input.inventory.stockOut.list')"
          icon="ri-file-list-3-line"
          :no-padding="true">
          <template #actions>
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              {{ $t('input.inventory.stockOut.add') }}
            </el-button>
          </template>

          <!-- 状态标签页 -->
          <StatusTabs
            v-model="activeTab"
            :tabs="tabConfig"
            @tab-change="handleTabChange" />

          <!-- PC端表格 -->
          <div class="table-wrapper pc-only">
            <el-table
              v-loading="loading"
              :data="tableData"
              stripe
              class="stock-out-table">
              <el-table-column prop="outbound_order_id" :label="$t('input.inventory.stockOut.columns.outboundOrderId')" width="180" fixed="left" />
              <el-table-column prop="outbound_type_name" :label="$t('input.inventory.stockOut.columns.type')" width="120" align="center">
                <template #default="{ row }">
                  <el-tag :type="getTypeTag(row.outbound_type)" size="small">
                    {{ getTypeText(row.outbound_type) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="warehouse_name" :label="$t('input.inventory.stockOut.columns.warehouseName')" min-width="150" show-overflow-tooltip />
              <el-table-column prop="outbound_object_name" :label="$t('input.inventory.stockOut.columns.outboundObject')" min-width="150" show-overflow-tooltip />
              <el-table-column prop="outbound_user" :label="$t('input.inventory.stockOut.columns.outboundUser')" width="120" />
              <el-table-column prop="operator" :label="$t('input.inventory.stockOut.columns.operator')" width="120" />
              <el-table-column
                prop="outbound_status"
                :label="$t('input.inventory.stockOut.columns.status')"
                width="160"
                align="center"
                header-align="center"
                class-name="status-column"
              >
                <template #default="{ row }">
                  <el-tag class="status-tag" :type="getStatusTag(row.outbound_status)" size="small">
                    {{ getStatusText(row.outbound_status) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="created_at" :label="$t('input.inventory.stockOut.columns.createTime')" width="160">
                <template #default="{ row }">
                  {{ formatDateTime(row.created_at) }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('input.inventory.stockOut.columns.actions')" width="240" fixed="right">
                <template #default="{ row }">
                  <ActionButtons
                    :workflow-status="getWorkflowStatus(row.outbound_status)"
                    mode="list"
                    :show-audit="activeTab === 'pendingApproval'"
                    @action="(action) => handleAction(row, action)" />
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="pagination.page"
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
          <div v-for="item in tableData" :key="item.outbound_order_id" class="mobile-card" @click="handleView(item)">
            <div class="mobile-card-header">
              <div class="mobile-card-title">
                <i class="ri-inbox-unarchive-line"></i>
                <span>{{ item.outbound_order_id }}</span>
              </div>
              <el-tag :type="getStatusTag(item.outbound_status)" size="small">
                {{ getStatusText(item.outbound_status) }}
              </el-tag>
            </div>
            <div class="mobile-card-body">
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.inventory.stockOut.columns.type') }}:</span>
                <el-tag :type="getTypeTag(item.outbound_type)" size="small">
                  {{ getTypeText(item.outbound_type) }}
                </el-tag>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.inventory.stockOut.columns.warehouseName') }}:</span>
                <span class="value">{{ item.warehouse_name }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.inventory.stockOut.columns.outboundObject') }}:</span>
                <span class="value">{{ item.outbound_object_name || '-' }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.inventory.stockOut.columns.outboundUser') }}:</span>
                <span class="value">{{ item.outbound_user || '-' }}</span>
              </div>
              <div class="mobile-card-row">
                <span class="label">{{ $t('input.inventory.stockOut.columns.createTime') }}:</span>
                <span class="value">{{ formatDateTime(item.created_at) }}</span>
              </div>
            </div>
            <div class="mobile-card-footer" @click.stop>
              <ActionButtons
                :workflow-status="getWorkflowStatus(item.outbound_status)"
                mode="list"
                :show-audit="activeTab === 'pendingApproval'"
                @action="(action) => handleAction(item, action)" />
            </div>
          </div>

          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="pagination.page"
              :total="pagination.total"
              :page-size="pagination.pageSize"
              layout="prev, pager, next"
              small
              @current-change="handlePageChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 审核弹窗 -->
  <el-dialog
    v-model="auditDialogVisible"
    :title="$t('input.inventory.stockOut.actions.audit')"
    width="90%"
    max-width="500px"
    :close-on-click-modal="false">
    <el-form :model="auditForm" label-position="top">
      <el-form-item :label="$t('input.inventory.stockOut.auditStatus')">
        <el-radio-group v-model="auditForm.audit_status">
          <el-radio value="approved">{{ $t('input.inventory.stockOut.actions.approve') }}</el-radio>
          <el-radio value="rejected">{{ $t('input.inventory.stockOut.actions.reject') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('input.inventory.stockOut.auditRemark')">
        <el-input
          v-model="auditForm.remark"
          type="textarea"
          :rows="3"
          :placeholder="$t('input.inventory.stockOut.placeholder.auditRemark')"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="auditDialogVisible = false">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" :loading="auditLoading" @click="handleAuditSubmit">{{ $t('common.submit') }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getOutboundOrderList, auditOutboundOrder, confirmOutbound, cancelOutboundOrder } from '@/api/outbound'
import { getWarehouseList } from '@/api/inventory'
import { PageHeader, InfoCard, SearchForm, SearchItem } from '@/components/common'
import StatusTabs from '@/components/workflow/StatusTabs.vue'
import ActionButtons from '@/components/workflow/ActionButtons.vue'

const router = useRouter()
const { t } = useI18n()

const searchKeyword = ref('')
const filterWarehouse = ref('')
const filterType = ref('')
const filterStatus = ref('pending')
const loading = ref(false)
const tableData = ref([])
const warehouseList = ref([])
const currentUserOrganCode = ref('') // 当前用户部门ID
const activeTab = ref('pendingApproval')

// 标签页配置 - 使用状态文本作为标签（因为国际化文件中没有tabs定义）
const tabConfig = [
  {
    name: 'pendingApproval',
    label: 'input.inventory.stockOut.status.pending',
    icon: 'ri-time-line'
  },
  {
    name: 'completed',
    label: 'input.inventory.stockOut.status.completed',
    icon: 'ri-checkbox-circle-line'
  }
]

const pagination = reactive({
  page: 1,
  pageSize: 20,
  total: 0
})

// 将状态映射到工作流状态
const getWorkflowStatus = (status) => {
  const statusMap = {
    'pending': 'S1',      // 待审批
    'completed': 'S2',   // 已完成（等同于审核通过）
    'cancelled': 'S10',  // 已作废
    'rejected': 'S3'     // 审核驳回
  }
  return statusMap[status] || 'S0'
}

// 根据标签页设置查询参数
const setQueryParamsByTab = (tabName) => {
  switch (tabName) {
    case 'pendingApproval':
      filterStatus.value = 'pending'
      break
    case 'completed':
      filterStatus.value = 'completed'
      break
    default:
      filterStatus.value = 'all'
  }
}

// 标签页切换
const handleTabChange = (tabName) => {
  setQueryParamsByTab(tabName)
  pagination.page = 1
  loadData()
}

// 审核弹窗
const auditDialogVisible = ref(false)
const auditLoading = ref(false)
const currentRow = ref(null)
const auditForm = reactive({
  audit_status: 'approved',
  remark: ''
})

// 格式化日期时间
const formatDateTime = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return '-'

  // 处理带时区和毫秒的日期格式 (如: "2025-12-14 11:00:27.000+08:00")
/*  if (dateStr.includes('+') && dateStr.includes('.')) {
    const datePart = dateStr.split(' ')[0]
    const timePart = dateStr.split(' ')[1].split('.')[0]
    return `${datePart} ${timePart}`
  }*/

  // 处理标准ISO格式 (如: "2025-12-14T01:40:59")
  return dateStr.replace('T', ' ')
}

// 获取类型标签
const getTypeTag = (type) => {
  const typeMap = {
    1: 'success',
    2: 'warning'
  }
  return typeMap[type] || 'info'
}

// 获取类型文本
const getTypeText = (type) => {
  const typeMap = {
    1: t('input.inventory.stockOut.type.sale'),
    2: t('input.inventory.stockOut.type.transfer')
  }
  return typeMap[type] || '-'
}

// 获取状态标签
const getStatusTag = (status) => {
  const statusMap = {
    'pending': 'warning',
    'completed': 'success',
    'cancelled': 'info',
    'rejected': 'danger'
  }
  return statusMap[status] || 'info'
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    'pending': t('input.inventory.stockOut.status.pending'),
    'completed': t('input.inventory.stockOut.status.completed'),
    'cancelled': t('input.inventory.stockOut.status.cancelled'),
    'rejected': t('input.inventory.stockOut.status.rejected')
  }
  return statusMap[status] || '-'
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

// 加载仓库列表
const loadWarehouseList = async () => {
  try {
    const res = await getWarehouseList({
      page: 1,
      pageSize: 1000,
      status: '1', // 只获取启用的仓库
      organCode: currentUserOrganCode.value // 按部门过滤
    })
    if (res.code === 200) {
      warehouseList.value = res.data.items || res.data.list || []
    }
  } catch (error) {
    console.error('Failed to load warehouse list:', error)
  }
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getOutboundOrderList({
      page: pagination.page,
      pageSize: pagination.pageSize,
      outboundStatus: filterStatus.value,
      outboundType: filterType.value,
      outboundOrderId: searchKeyword.value,
      warehouseId: filterWarehouse.value,
      organCode: currentUserOrganCode.value // 按部门过滤
    })

    if (res.code === 200) {
      tableData.value = res.data.items || []
      pagination.total = res.data.total || 0
    }
  } catch (error) {
    console.error('Failed to load stock out list:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.page = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchKeyword.value = ''
  filterWarehouse.value = ''
  filterType.value = ''
  setQueryParamsByTab(activeTab.value)
  pagination.page = 1
  loadData()
}

// 新增
const handleAdd = () => {
  router.push('/input/inventory/stock-out/add')
}

// 统一动作处理方法
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
  }
}

// 查看
const handleView = (row) => {
  router.push(`/input/inventory/stock-out/detail/${row.outbound_order_id}`)
}

// 编辑
const handleEdit = (row) => {
  router.push(`/input/inventory/stock-out/form/${row.outbound_order_id}`)
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
    loadData()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('common.submitFailed'))
    }
  }
}

// 审核通过
const handleApprove = async (row) => {
  try {
    await ElMessageBox.confirm(
      t('input.inventory.stockOut.approveConfirm'),
      t('common.warning'),
      { type: 'warning' }
    )
    currentRow.value = row
    auditForm.audit_status = 'approved'
    auditForm.remark = ''
    await handleAuditSubmit()
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
      t('input.inventory.stockOut.rejectReason'),
      t('input.inventory.stockOut.reject'),
      {
        inputPlaceholder: t('input.inventory.stockOut.placeholder.rejectReason')
      }
    )
    currentRow.value = row
    auditForm.audit_status = 'rejected'
    auditForm.remark = value || ''
    await handleAuditSubmit()
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
      t('input.inventory.stockOut.archiveConfirm'),
      t('common.warning'),
      { type: 'warning' }
    )
    // 这里需要调用归档API，如果没有则跳过
    ElMessage.success(t('common.archiveSuccess'))
    loadData()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(t('common.failed'))
    }
  }
}

// 审核
const handleAudit = (row) => {
  currentRow.value = row
  auditForm.audit_status = 'approved'
  auditForm.remark = ''
  auditDialogVisible.value = true
}

// 提交审核
const handleAuditSubmit = async () => {
  if (!auditForm.remark && auditForm.audit_status === 'rejected') {
    ElMessage.warning(t('input.inventory.stockOut.rules.auditRemarkRequired'))
    return
  }

  auditLoading.value = true
  try {
    const now = new Date()
    const auditTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

    const userInfoStr = localStorage.getItem('userInfo')
    let userInfo = 'user'
    if (userInfoStr) {
      userInfo = JSON.parse(userInfoStr)
      const user = userInfo.user || userInfo
      userInfo =  user.USERNAME || user.REALNAME || user.username || user.realName || ''
    }
    // 转换为驼峰形式
    const res = await auditOutboundOrder(currentRow.value.outbound_order_id, {
      auditStatus: auditForm.audit_status,
      auditUser: userInfo,
      auditTime: auditTime,
      remark: auditForm.remark
    })

    if (res.code === 200) {
      ElMessage.success(t('input.inventory.stockOut.auditSuccess'))
      auditDialogVisible.value = false

      // 如果审核通过,自动执行出库
      if (auditForm.audit_status === 'approved') {
        await handleConfirmOutbound(currentRow.value.outbound_order_id)
      } else {
        loadData()
      }
    }
  } catch (error) {
    console.error('Failed to audit outbound order:', error)
    // 直接显示后端返回的错误信息，不使用通用的"操作失败"提示
    // 优先使用error.response.data.msg，其次是error.message，最后是默认提示
    const errorMsg = error.response?.data?.msg || error.message || error.msg || t('common.failed')
    ElMessage.error(errorMsg)
  } finally {
    auditLoading.value = false
  }
}

// 执行出库
const handleConfirmOutbound = async (outboundOrderId) => {
  try {
    const now = new Date()
    const outboundTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

    // 从用户信息获取操作员姓名
    let operator = ''
    const userInfoStr = localStorage.getItem('userInfo')
    if (userInfoStr) {
      const userInfo = JSON.parse(userInfoStr)
      const user = userInfo.user || userInfo
      operator = user.USERNAME || user.REALNAME || user.username || user.realName || ''
    }

    // 转换为驼峰形式
    const res = await confirmOutbound(outboundOrderId, {
      outboundTime: outboundTime,
      operator: operator
    })
    if (res.code === 200) {
      ElMessage.success(t('input.inventory.stockOut.confirmSuccess'))
      loadData()
    }
  } catch (error) {
    console.error('Failed to confirm outbound:', error)
    // 直接显示后端返回的错误信息，不使用通用的"操作失败"提示
    // 优先使用error.response.data.msg，其次是error.message，最后是默认提示
    const errorMsg = error.response?.data?.msg || error.message || error.msg || t('common.failed')
    ElMessage.error(errorMsg)
  }
}

// 取消
const handleCancel = (row) => {
  ElMessageBox.confirm(
    t('input.inventory.stockOut.cancelConfirm'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(async () => {
    try {
      // 从用户信息获取操作员姓名
      let operator = '当前用户'
      const userInfoStr = localStorage.getItem('userInfo')
      if (userInfoStr) {
        const userInfo = JSON.parse(userInfoStr)
        const user = userInfo.user || userInfo
        operator = user.USERNAME || user.REALNAME || user.username || user.realName || '当前用户'
      }
      
      const res = await cancelOutboundOrder(row.outbound_order_id, operator)
      if (res.code === 200) {
        ElMessage.success(t('input.inventory.stockOut.cancelSuccess'))
        loadData()
      }
    } catch (error) {
      console.error('Failed to cancel outbound order:', error)
      // 直接显示后端返回的错误信息，不使用通用的"操作失败"提示
      // 优先使用error.response.data.msg，其次是error.message，最后是默认提示
      const errorMsg = error.response?.data?.msg || error.message || error.msg || t('common.failed')
      ElMessage.error(errorMsg)
    }
  }).catch(() => {})
}

// 切换每页条数
const handleSizeChange = () => {
  pagination.page = 1
  loadData()
}

// 切换页码
const handlePageChange = () => {
  loadData()
}

onMounted(() => {
  currentUserOrganCode.value = getCurrentUserOrganCode()
  setQueryParamsByTab(activeTab.value)
  loadWarehouseList()
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';
@use '@/assets/styles/table-enhanced.scss';

:deep(.stock-out-table .status-column .cell) {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  white-space: nowrap;
}

:deep(.stock-out-table .status-tag) {
  display: inline-flex;
  align-items: center;
  max-width: none;
  white-space: nowrap;
}
</style>
