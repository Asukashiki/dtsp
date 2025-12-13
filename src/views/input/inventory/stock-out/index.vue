<template>
  <div class="stock-out-management-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-icon-wrapper">
        <i class="ri-inbox-unarchive-line"></i>
      </div>
      <div class="header-text">
        <h1 class="page-title">{{ $t('input.inventory.stockOut.title') }}</h1>
        <p class="page-subtitle">{{ $t('input.inventory.stockOut.subtitle') }}</p>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 搜索和筛选栏 -->
      <div class="search-bar">
        <div class="search-row">
          <el-input
            v-model="searchKeyword"
            :placeholder="$t('input.inventory.stockOut.searchPlaceholder')"
            class="search-input"
            clearable
            @clear="handleSearch"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <i class="ri-search-line"></i>
            </template>
          </el-input>

          <el-select
            v-model="filterWarehouse"
            :placeholder="$t('input.inventory.stockOut.filterByWarehouse')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('input.inventory.stockOut.allWarehouses')" value="" />
            <el-option
              v-for="warehouse in warehouseList"
              :key="warehouse.warehouse_id"
              :label="warehouse.warehouse_name"
              :value="warehouse.warehouse_id"
            />
          </el-select>

          <el-select
            v-model="filterType"
            :placeholder="$t('input.inventory.stockOut.filterByType')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('input.inventory.stockOut.allTypes')" value="" />
            <el-option :label="$t('input.inventory.stockOut.type.sale')" value="1" />
            <el-option :label="$t('input.inventory.stockOut.type.transfer')" value="2" />
          </el-select>

          <el-select
            v-model="filterStatus"
            :placeholder="$t('input.inventory.stockOut.filterByStatus')"
            class="filter-select"
            clearable
            @change="handleSearch"
          >
            <el-option :label="$t('input.inventory.stockOut.allStatus')" value="all" />
            <el-option :label="$t('input.inventory.stockOut.status.pending')" value="pending" />
            <el-option :label="$t('input.inventory.stockOut.status.completed')" value="completed" />
            <el-option :label="$t('input.inventory.stockOut.status.cancelled')" value="cancelled" />
          </el-select>
        </div>

        <div class="action-row">
          <div class="action-left">
            <el-button type="primary" @click="handleSearch">
              <i class="ri-search-line"></i>
              <span class="btn-text">{{ $t('common.search') }}</span>
            </el-button>
            <el-button @click="handleReset">
              <i class="ri-restart-line"></i>
              <span class="btn-text">{{ $t('common.reset') }}</span>
            </el-button>
          </div>
          <div class="action-right">
            <el-button type="primary" @click="handleAdd">
              <i class="ri-add-line"></i>
              <span class="btn-text">{{ $t('input.inventory.stockOut.add') }}</span>
            </el-button>
          </div>
        </div>
      </div>

      <!-- PC端:数据表格 -->
      <div class="table-card pc-view">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
        >
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
          <el-table-column prop="outbound_status" :label="$t('input.inventory.stockOut.columns.status')" width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="getStatusTag(row.outbound_status)" size="small">
                {{ getStatusText(row.outbound_status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" :label="$t('input.inventory.stockOut.columns.createTime')" width="160" />
          <el-table-column :label="$t('input.inventory.stockOut.columns.actions')" width="280" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleView(row)">
                <i class="ri-eye-line"></i> {{ $t('input.inventory.stockOut.actions.view') }}
              </el-button>
              <el-button v-if="row.outbound_status === 'pending'" link type="success" @click="handleAudit(row)">
                <i class="ri-check-line"></i> {{ $t('input.inventory.stockOut.actions.audit') }}
              </el-button>
              <el-button v-if="row.outbound_status === 'pending'" link type="danger" @click="handleCancel(row)">
                <i class="ri-close-line"></i> {{ $t('input.inventory.stockOut.actions.cancel') }}
              </el-button>
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

      <!-- 移动端:卡片列表 -->
      <div class="mobile-view" v-loading="loading">
        <div class="card-list">
          <div v-for="item in tableData" :key="item.outbound_order_id" class="stock-out-card" @click="handleView(item)">
            <div class="card-header">
              <div class="stock-out-info">
                <h3 class="stock-out-id">{{ item.outbound_order_id }}</h3>
                <span class="batch-no">{{ item.warehouse_name }}</span>
              </div>
              <div class="card-tags">
                <el-tag :type="getTypeTag(item.outbound_type)" size="small">
                  {{ getTypeText(item.outbound_type) }}
                </el-tag>
                <el-tag :type="getStatusTag(item.outbound_status)" size="small">
                  {{ getStatusText(item.outbound_status) }}
                </el-tag>
              </div>
            </div>

            <div class="card-body">
              <div class="info-row">
                <i class="ri-user-line info-icon"></i>
                <span class="info-label">{{ $t('input.inventory.stockOut.columns.outboundObject') }}:</span>
                <span class="info-value">{{ item.outbound_object_name || '-' }}</span>
              </div>

              <div class="info-row">
                <i class="ri-user-settings-line info-icon"></i>
                <span class="info-label">{{ $t('input.inventory.stockOut.columns.outboundUser') }}:</span>
                <span class="info-value">{{ item.outbound_user || '-' }}</span>
              </div>

              <div class="info-row" v-if="item.operator">
                <i class="ri-user-3-line info-icon"></i>
                <span class="info-label">{{ $t('input.inventory.stockOut.columns.operator') }}:</span>
                <span class="info-value">{{ item.operator }}</span>
              </div>

              <div class="info-row">
                <i class="ri-time-line info-icon"></i>
                <span class="info-label">{{ $t('input.inventory.stockOut.columns.createTime') }}:</span>
                <span class="info-value">{{ item.created_at }}</span>
              </div>
            </div>

            <div class="card-footer" @click.stop>
              <el-button v-if="item.outbound_status === 'pending'" link type="success" size="small" @click="handleAudit(item)">
                <i class="ri-check-line"></i> {{ $t('input.inventory.stockOut.actions.audit') }}
              </el-button>
              <el-button v-if="item.outbound_status === 'pending'" link type="danger" size="small" @click="handleCancel(item)">
                <i class="ri-close-line"></i> {{ $t('input.inventory.stockOut.actions.cancel') }}
              </el-button>
            </div>
          </div>
        </div>

        <div v-if="tableData.length === 0 && !loading" class="empty-state">
          <i class="ri-inbox-line"></i>
          <p>{{ $t('home.noData') }}</p>
        </div>

        <div class="mobile-pagination">
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

    <!-- 移动端浮动添加按钮 -->
    <div class="mobile-fab" @click="handleAdd">
      <i class="ri-add-line"></i>
    </div>

    <!-- 审核弹窗 -->
    <el-dialog
      v-model="auditDialogVisible"
      :title="$t('input.inventory.stockOut.actions.audit')"
      width="90%"
      max-width="500px"
      :close-on-click-modal="false"
    >
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getOutboundOrderList, auditOutboundOrder, confirmOutbound, cancelOutboundOrder } from '@/api/outbound'
import { getWarehouseList } from '@/api/inventory'

const router = useRouter()
const { t } = useI18n()

const searchKeyword = ref('')
const filterWarehouse = ref('')
const filterType = ref('')
const filterStatus = ref('all')
const loading = ref(false)
const tableData = ref([])
const warehouseList = ref([])
const currentUserOrganCode = ref('') // 当前用户部门ID

const pagination = reactive({
  page: 1,
  pageSize: 20,
  total: 0
})

// 审核弹窗
const auditDialogVisible = ref(false)
const auditLoading = ref(false)
const currentRow = ref(null)
const auditForm = reactive({
  audit_status: 'approved',
  remark: ''
})

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
    'cancelled': 'info'
  }
  return statusMap[status] || 'info'
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    'pending': t('input.inventory.stockOut.status.pending'),
    'completed': t('input.inventory.stockOut.status.completed'),
    'cancelled': t('input.inventory.stockOut.status.cancelled')
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
  filterStatus.value = 'all'
  pagination.page = 1
  loadData()
}

// 新增
const handleAdd = () => {
  router.push('/input/inventory/stock-out/add')
}

// 查看
const handleView = (row) => {
  router.push(`/input/inventory/stock-out/detail/${row.outbound_order_id}`)
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

    // 转换为驼峰形式
    const res = await auditOutboundOrder(currentRow.value.outbound_order_id, {
      auditStatus: auditForm.audit_status,
      auditUser: '当前用户', // TODO: 从用户信息获取
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
    ElMessage.error(t('common.failed'))
  } finally {
    auditLoading.value = false
  }
}

// 执行出库
const handleConfirmOutbound = async (outboundOrderId) => {
  try {
    const now = new Date()
    const outboundTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

    // 转换为驼峰形式
    const res = await confirmOutbound(outboundOrderId, {
      outboundTime: outboundTime,
      operator: '当前用户' // TODO: 从用户信息获取
    })

    if (res.code === 200) {
      ElMessage.success(t('input.inventory.stockOut.confirmSuccess'))
      loadData()
    }
  } catch (error) {
    console.error('Failed to confirm outbound:', error)
    ElMessage.error(t('common.failed'))
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
      const res = await cancelOutboundOrder(row.outbound_order_id, '当前用户') // TODO: 从用户信息获取
      if (res.code === 200) {
        ElMessage.success(t('input.inventory.stockOut.cancelSuccess'))
        loadData()
      }
    } catch (error) {
      console.error('Failed to cancel outbound order:', error)
      ElMessage.error(t('common.failed'))
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
  loadWarehouseList()
  loadData()
})
</script>

<style scoped>
.stock-out-management-page {
  min-height: calc(100vh - 120px);
  position: relative;
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  padding: 32px;
  margin: -24px 0 24px 0;
  border-radius: 0 0 16px 16px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.header-icon-wrapper {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  flex-shrink: 0;
}

.header-icon-wrapper i {
  font-size: 40px;
  color: white;
}

.header-text {
  flex: 1;
  color: white;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 15px;
  opacity: 0.9;
  margin: 0;
}

/* 内容区域 */
.content-wrapper {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 搜索栏 */
.search-bar {
  margin-bottom: 24px;
}

.search-row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.filter-select {
  width: 160px;
  flex-shrink: 0;
}

.action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.action-left,
.action-right {
  display: flex;
  gap: 8px;
}

/* PC端表格 */
.table-card {
  background: white;
}

.pagination-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

/* 移动端默认隐藏 */
.mobile-view,
.mobile-fab {
  display: none;
}

/* 移动端卡片样式 */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stock-out-card {
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.stock-out-card:active {
  transform: scale(0.98);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f2f5;
}

.stock-out-info {
  flex: 1;
  min-width: 0;
}

.stock-out-id {
  font-size: 17px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.batch-no {
  font-size: 13px;
  color: #909399;
}

.card-tags {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
  flex-shrink: 0;
  margin-left: 12px;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.info-icon {
  font-size: 16px;
  color: #909399;
  flex-shrink: 0;
}

.info-label {
  color: #606266;
  flex-shrink: 0;
}

.info-value {
  color: #303133;
  font-weight: 500;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-footer {
  display: flex;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f2f5;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #909399;
}

.empty-state i {
  font-size: 64px;
  margin-bottom: 12px;
  display: block;
  opacity: 0.5;
}

.mobile-pagination {
  display: flex;
  justify-content: center;
  padding: 16px 0;
  margin-top: 16px;
}

/* ==================== 响应式设计 ==================== */
@media screen and (max-width: 1024px) {
  .page-header {
    margin: -16px -16px 16px -16px;
    padding: 24px;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -12px -12px 12px -12px;
    padding: 20px 16px;
    gap: 16px;
  }

  .header-icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 12px;
  }

  .header-icon-wrapper i {
    font-size: 32px;
  }

  .page-title {
    font-size: 20px;
  }

  .page-subtitle {
    font-size: 13px;
  }

  .content-wrapper {
    padding: 16px;
  }

  .search-row {
    flex-direction: column;
  }

  .search-input,
  .filter-select {
    width: 100%;
  }

  .action-row {
    flex-direction: column;
    align-items: stretch;
  }

  .action-left,
  .action-right {
    justify-content: stretch;
  }

  .action-left .el-button,
  .action-right .el-button {
    flex: 1;
  }

  .action-right {
    display: none;
  }

  .pc-view {
    display: none;
  }

  .mobile-view {
    display: block;
  }

  .mobile-fab {
    display: flex;
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    box-shadow: 0 4px 16px rgba(0, 154, 68, 0.3);
    cursor: pointer;
    z-index: 50;
    transition: all 0.3s ease;
  }

  .mobile-fab:active {
    transform: scale(0.9);
  }

  .btn-text {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    padding: 16px 12px;
  }

  .header-icon-wrapper {
    width: 56px;
    height: 56px;
  }

  .header-icon-wrapper i {
    font-size: 28px;
  }

  .page-title {
    font-size: 18px;
  }

  .stock-out-card {
    padding: 14px;
  }

  .stock-out-id {
    font-size: 16px;
  }

  .mobile-fab {
    bottom: 16px;
    right: 16px;
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
}
</style>
