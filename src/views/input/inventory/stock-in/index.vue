<template>
  <div class="inbound-list-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="icon-wrapper">
          <i class="ri-inbox-line"></i>
        </div>
        <div class="header-text">
          <h1>{{ $t('input.inventory.stockIn.title') }}</h1>
          <p>{{ $t('input.inventory.stockIn.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- 筛选条件 -->
    <div class="filter-wrapper">
      <el-form :inline="true" :model="queryParams" class="filter-form">
        <el-form-item :label="$t('input.inventory.stockIn.filter.status')">
          <el-select v-model="queryParams.inboundStatus" @change="handleQuery" clearable>
            <el-option :label="$t('common.all')" value="" />
            <el-option :label="$t('input.inventory.stockIn.status.pending')" value="pending" />
            <el-option :label="$t('input.inventory.stockIn.status.completed')" value="completed" />
            <el-option :label="$t('input.inventory.stockIn.status.cancelled')" value="cancelled" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('input.inventory.stockIn.filter.type')">
          <el-select v-model="queryParams.inboundType" @change="handleQuery" clearable>
            <el-option :label="$t('common.all')" value="" />
            <el-option :label="$t('input.inventory.stockIn.type.production')" :value="0" />
            <el-option :label="$t('input.inventory.stockIn.type.purchase')" :value="1" />
            <el-option :label="$t('input.inventory.stockIn.type.transfer')" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('input.inventory.stockIn.filter.orderId')">
          <el-input
            v-model="queryParams.inboundOrderId"
            :placeholder="$t('input.inventory.stockIn.placeholder.orderId')"
            clearable
            @clear="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">
            <i class="ri-search-line"></i>
            {{ $t('common.search') }}
          </el-button>
          <el-button @click="handleReset">
            <i class="ri-refresh-line"></i>
            {{ $t('common.reset') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 操作按钮和统计 -->
    <div class="action-bar">
      <el-button type="primary" @click="handleAdd">
        <i class="ri-add-line"></i>
        {{ $t('input.inventory.stockIn.create') }}
      </el-button>
      <div class="stats">
        <el-tag type="warning" size="large">
          <i class="ri-time-line"></i>
          {{ $t('input.inventory.stockIn.pendingCount') }}: {{ pendingCount }}
        </el-tag>
        <el-tag type="info" size="large">
          <i class="ri-file-list-line"></i>
          {{ $t('input.inventory.stockIn.totalCount') }}: {{ total }}
        </el-tag>
      </div>
    </div>

    <!-- PC端表格 -->
    <div class="table-wrapper pc-view">
      <el-table :data="inboundList" v-loading="loading" stripe>
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
          width="100"
        >
          <template #default="{ row }">
            <el-tag :type="getStatusTag(row.inbound_status)" size="small">
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
        />
        <el-table-column
          prop="inbound_time"
          :label="$t('input.inventory.stockIn.columns.inboundTime')"
          width="160"
        />
        <el-table-column :label="$t('common.actions')" fixed="right" width="250" align="right">
          <template #default="{ row }">
            <div class="action-buttons">
              <!-- Always show Detail button -->
              <el-button link type="primary" @click="handleDetail(row)">
                <i class="ri-eye-line"></i>
                {{ $t('common.detail') }}
              </el-button>

              <!-- Show Audit button only when status is 'pending' -->
              <el-button
                link
                type="success"
                v-if="row.inbound_status === 'pending'"
                @click="handleAudit(row)"
              >
                <i class="ri-check-line"></i>
                {{ $t('input.inventory.stockIn.audit') }}
              </el-button>

              <!-- Show Confirm button only when status is 'approved' -->
              <el-button
                link
                type="warning"
                v-if="row.inbound_status === 'approved'"
                @click="handleConfirm(row)"
              >
                <i class="ri-inbox-archive-line"></i>
                {{ $t('input.inventory.stockIn.confirm') }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="queryParams.page"
        v-model:page-size="queryParams.pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleQuery"
        @size-change="handleQuery"
        class="pagination"
      />
    </div>

    <!-- 移动端卡片 -->
    <div class="mobile-view">
      <div class="card-list">
        <div
          v-for="item in inboundList"
          :key="item.id"
          class="inbound-card"
          @click="handleDetail(item)"
        >
          <div class="card-header">
            <div class="order-id">
              <i class="ri-file-list-line"></i>
              {{ item.inbound_order_id }}
            </div>
            <el-tag :type="getStatusTag(item.inbound_status)" size="small">
              {{ getStatusText(item.inbound_status) }}
            </el-tag>
          </div>
          <div class="card-body">
            <div class="info-row">
              <i class="ri-price-tag-3-line"></i>
              <span class="label">{{ $t('input.inventory.stockIn.columns.type') }}:</span>
              <el-tag :type="getTypeTag(item.inbound_type)" size="small">
                {{ item.inbound_type_name }}
              </el-tag>
            </div>
            <div class="info-row">
              <i class="ri-building-line"></i>
              <span class="label">{{ $t('input.inventory.stockIn.columns.warehouse') }}:</span>
              <span class="value">{{ item.warehouse_name }}</span>
            </div>
            <div class="info-row">
              <i class="ri-shopping-bag-line"></i>
              <span class="label">{{ $t('input.inventory.stockIn.columns.quantity') }}:</span>
              <span class="value">{{ item.total_quantity ? item.total_quantity.toFixed(2) : '-' }}</span>
            </div>
            <div class="info-row">
              <i class="ri-time-line"></i>
              <span class="label">{{ $t('input.inventory.stockIn.columns.applyTime') }}:</span>
              <span class="value">{{ item.apply_time }}</span>
            </div>
          </div>
          <div class="card-actions" @click.stop>
            <el-button size="small" type="primary" @click="handleDetail(item)">
              {{ $t('common.detail') }}
            </el-button>
            <el-button
              size="small"
              type="success"
              v-if="item.inbound_status === 'pending'"
              @click="handleAudit(item)"
            >
              {{ $t('input.inventory.stockIn.audit') }}
            </el-button>
            <el-button
              size="small"
              type="warning"
              v-if="item.inbound_status === 'pending'"
              @click="handleConfirm(item)"
            >
              {{ $t('input.inventory.stockIn.confirm') }}
            </el-button>
          </div>
        </div>
      </div>

      <!-- 移动端分页 -->
      <el-pagination
        v-model:current-page="queryParams.page"
        :total="total"
        :page-size="queryParams.pageSize"
        layout="prev, pager, next"
        @current-change="handleQuery"
        class="mobile-pagination"
      />
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

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const inboundList = ref([])
const total = ref(0)
const pendingCount = ref(0)
const currentUserOrganCode = ref('') // 当前用户部门ID

const queryParams = reactive({
  page: 1,
  pageSize: 20,
  inboundStatus: '',
  inboundType: '',
  inboundOrderId: ''
})

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
  queryParams.inboundStatus = ''
  queryParams.inboundType = ''
  queryParams.inboundOrderId = ''
  handleQuery()
}

// 新建入库单
const handleAdd = () => {
  router.push('/input/inventory/stock-in/form')
}

// 查看详情
const handleDetail = (row) => {
  router.push(`/input/inventory/stock-in/detail/${row.inbound_order_id}`)
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

// 执行入库
const handleConfirm = async (row) => {
  ElMessageBox.confirm(t('input.inventory.stockIn.confirmMessage'), t('common.confirm'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(async () => {
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
  handleQuery()
  loadPendingCount()
})
</script>

<style scoped>
.inbound-list-page {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, #009a44 0%, #00b350 100%);
  padding: 24px 32px;
  border-radius: 16px 16px 0 0;
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
}

.header-text h1 {
  font-size: 28px;
  font-weight: 600;
  color: white;
  margin: 0 0 8px 0;
}

.header-text p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

/* 筛选区域 */
.filter-wrapper {
  background: white;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.filter-form {
  margin: 0;
}

/* 操作栏 */
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 4px;
}

.stats {
  display: flex;
  gap: 16px;
}

.stats .el-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 14px;
}

/* 表格 */
.table-wrapper {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.table-wrapper :deep(.el-table) {
  font-size: 14px;
}

.table-wrapper :deep(.el-table td),
.table-wrapper :deep(.el-table th) {
  padding: 14px 0;
}

.table-wrapper :deep(.el-table__row) {
  transition: background-color 0.2s;
}

.table-wrapper :deep(.el-table__row:hover) {
  background-color: #f5f7fa;
}

.pagination {
  margin-top: 24px;
  justify-content: flex-end;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.action-buttons .el-button {
  margin: 0 !important;
  padding: 8px 12px;
  font-size: 14px;
}

.action-buttons .el-button i {
  margin-right: 4px;
}

/* 移动端卡片 */
.mobile-view {
  display: none;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.inbound-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.inbound-card:active {
  transform: scale(0.98);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e4e7ed;
}

.order-id {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  display: flex;
  align-items: center;
  gap: 6px;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
}

.info-row i {
  color: #009a44;
  font-size: 16px;
}

.info-row .label {
  color: #909399;
}

.info-row .value {
  color: #303133;
  font-weight: 500;
}

.card-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 1px solid #e4e7ed;
}

.mobile-pagination {
  margin-top: 20px;
  justify-content: center;
}

/* 响应式 */
@media screen and (max-width: 768px) {
  .pc-view {
    display: none !important;
  }

  .mobile-view {
    display: block !important;
  }

  .page-header {
    padding: 16px;
    margin: 0 0 16px 0;
    border-radius: 0;
  }

  .header-content {
    gap: 12px;
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }

  .header-text h1 {
    font-size: 20px;
  }

  .filter-wrapper {
    padding: 12px;
    border-radius: 0;
    margin: 0 0 12px 0;
  }

  .filter-form :deep(.el-form-item) {
    margin: 0 0 12px 0;
    display: block;
  }

  .filter-form :deep(.el-form-item__label) {
    display: block;
    margin-bottom: 4px;
  }

  .filter-form :deep(.el-form-item__content) {
    display: block;
  }

  .action-bar {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .stats {
    justify-content: space-between;
  }
}
</style>
