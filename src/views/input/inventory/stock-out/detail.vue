<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('input.inventory.stockOut.detail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <template v-if="detailData">
          <!-- 基本信息卡片 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('input.catalog.form.basicInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <!-- 使用 el-descriptions 两列布局展示 -->
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('input.inventory.stockOut.form.outboundOrderId')">
                  {{ detailData.outbound_order_id }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockOut.form.outboundBatchId')">
                  {{ detailData.outbound_batch_id || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockOut.form.type')">
                  <el-tag :type="getTypeTag(detailData.outbound_type)">
                    {{ getTypeText(detailData.outbound_type) }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockOut.form.status')">
                  <el-tag :type="getStatusTag(detailData.outbound_status)">
                    {{ getStatusText(detailData.outbound_status) }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockOut.form.warehouseId')">
                  {{ detailData.warehouse_name }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockOut.form.relatedOrderNo')">
                  {{ detailData.related_order_no || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockOut.form.outboundUser')">
                  {{ detailData.outbound_user || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockOut.form.outboundDept')">
                  {{ detailData.outbound_dept || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockOut.form.operator')">
                  {{ detailData.operator }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockOut.form.createTime')">
                  {{ formatDateTime(detailData.created_at) }}
                </el-descriptions-item>
                <el-descriptions-item v-if="detailData.outbound_time" :label="$t('input.inventory.stockOut.form.outboundTime')">
                  {{ formatDateTime(detailData.outbound_time) }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockOut.form.remark')" :span="2">
                  {{ detailData.remark || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 工作流信息（使用 WorkflowInfo 组件） -->
          <WorkflowInfo
            :workflow-status="getWorkflowStatus(detailData.outbound_status)"
            mode="view"
            :approval-history="approvalHistory"
            :hide-for-states="['S0', 'S10']" />

          <!-- 出库明细 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-archive-line"></i>
                <span>{{ $t('input.inventory.stockOut.form.details') }}</span>
              </div>
            </div>
            <div class="card-body">
              <!-- PC端表格 -->
              <div class="pc-view">
                <el-table :data="detailData.details || []" stripe style="width: 100%">
                  <el-table-column type="index" label="#" width="60" />
                  <el-table-column prop="material_name" :label="$t('input.inventory.stockOut.form.inputName')" min-width="150" />
                  <el-table-column prop="material_type" :label="$t('input.inventory.stockIn.form.inputType')" width="120">
                    <template #default="scope">
                      {{ getLabelByValue('input_type', scope.row.material_type) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="agricultural_input_type" :label="$t('input.inventory.stockOut.form.inputCategory')" width="120">
                    <template #default="scope">
                      {{ getLabelByValue('input_category', scope.row.agricultural_input_type) || scope.row.agricultural_input_type }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="material_batch_id" :label="$t('input.inventory.stockOut.form.batchNo')" width="150" />
                  <el-table-column prop="quantity" :label="$t('input.inventory.stockOut.form.quantity')" width="120" align="center" />
                  <el-table-column prop="spec_model" :label="$t('input.inventory.stockOut.form.specModel')" width="140" />
                  <el-table-column prop="unit_of_measure" :label="$t('input.inventory.stockOut.form.unitOfMeasure')" width="100">
                    <template #default="scope">
                      {{ getLabelByValue('input_material_unit', scope.row.unit_of_measure) || scope.row.unit_of_measure }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('common.actions')" width="100" v-if="hasBatchSplits">
                    <template #default="{ row }">
                      <el-button link type="primary" @click="showBatchSplits(row)" v-if="row.batch_splits && row.batch_splits.length > 0">
                        <i class="ri-list-check"></i> {{ $t('input.inventory.stockOut.form.batchSplits') }}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <!-- 移动端卡片 -->
              <div class="mobile-view">
                <div v-if="!detailData.details || detailData.details.length === 0" class="empty-state">
                  <p>{{ $t('input.inventory.stockOut.messages.noItems') }}</p>
                </div>
                <div v-for="(item, index) in detailData.details" :key="index" class="item-card">
                  <div class="item-header">
                    <span class="item-index">#{{ index + 1 }}</span>
                    <h4 class="item-name">{{ item.material_name }}</h4>
                  </div>
                  <div class="item-info">
                    <div class="info-row">
                      <span class="label">{{ $t('input.inventory.stockOut.form.materialType') }}:</span>
                      <span class="value">{{ getLabelByValue('input_type', item.material_type) || item.material_type || '-' }}</span>
                    </div>
                    <div v-if="item.agricultural_input_type" class="info-row">
                      <span class="label">{{ $t('input.inventory.stockOut.form.inputCategory') }}:</span>
                      <span class="value">{{ getLabelByValue('input_category', item.agricultural_input_type) || item.agricultural_input_type }}</span>
                    </div>
                    <div v-if="item.material_batch_id" class="info-row">
                      <span class="label">{{ $t('input.inventory.stockOut.form.batchNo') }}:</span>
                      <span class="value">{{ item.material_batch_id }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">{{ $t('input.inventory.stockOut.form.quantity') }}:</span>
                      <span class="value">{{ item.quantity }}</span>
                    </div>
                    <div v-if="item.spec_model" class="info-row">
                      <span class="label">{{ $t('input.inventory.stockOut.form.specModel') }}:</span>
                      <span class="value">{{ item.spec_model }}</span>
                    </div>
                    <div v-if="item.unit_of_measure" class="info-row">
                      <span class="label">{{ $t('input.inventory.stockOut.form.unitOfMeasure') }}:</span>
                      <span class="value">{{ getLabelByValue('input_material_unit', item.unit_of_measure) || item.unit_of_measure }}</span>
                    </div>
                  </div>
                  <div v-if="item.batch_splits && item.batch_splits.length > 0" class="item-footer">
                    <el-button link type="primary" size="small" @click="showBatchSplits(item)">
                      <i class="ri-list-check"></i> {{ $t('input.inventory.stockOut.form.batchSplits') }}
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
    </div>

    <!-- 批次拆分弹窗 -->
    <el-dialog
      v-model="batchSplitsDialogVisible"
      :title="$t('input.inventory.stockOut.form.batchSplits')"
      width="90%"
      max-width="800px"
    >
      <el-table :data="currentBatchSplits" stripe>
        <el-table-column type="index" label="#" width="60" />
        <el-table-column prop="inbound_batch_id" :label="$t('input.inventory.stockOut.form.inboundBatchId')" min-width="200" />
        <el-table-column prop="split_quantity" :label="$t('input.inventory.stockOut.form.splitQuantity')" width="120" align="center" />
        <el-table-column prop="remaining_quantity" :label="$t('input.inventory.stockOut.form.remainingQuantity')" width="120" align="center" />
      </el-table>
      <template #footer>
        <el-button @click="batchSplitsDialogVisible = false">{{ $t('common.close') }}</el-button>
      </template>
    </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getOutboundOrderDetail } from '@/api/outbound'
import { useDict } from '@/hooks/useDict'
import WorkflowInfo from '@/components/workflow/WorkflowInfo.vue'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

// 初始化字典
const { getLabelByValue, options, loadAllDicts } = useDict(['input_type', 'input_category', 'input_material_unit'])

const loading = ref(false)
const detailData = ref(null)
const outboundOrderId = route.params.id

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

// 审批历史记录
const approvalHistory = ref([])

// 批次拆分弹窗
const batchSplitsDialogVisible = ref(false)
const currentBatchSplits = ref([])

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

// 检查是否有批次拆分数据
const hasBatchSplits = computed(() => {
  if (!detailData.value || !detailData.value.details) return false
  return detailData.value.details.some(detail => detail.batch_splits && detail.batch_splits.length > 0)
})

// 获取出库类型标签
const getTypeTag = (type) => {
  const typeMap = {
    1: 'success',
    2: 'warning',
    'sale': 'success',
    'transfer': 'warning',
    'cancelled': 'info',
    'rejected': 'danger'
  }
  return typeMap[type] || 'info'
}

// 获取出库类型文本
const getTypeText = (type) => {
  const typeMap = {
    1: t('input.inventory.stockOut.type.sale'),
    2: t('input.inventory.stockOut.type.transfer'),
    'sale': t('input.inventory.stockOut.type.sale'),
    'transfer': t('input.inventory.stockOut.type.transfer'),
    'cancelled': t('input.inventory.stockOut.status.cancelled'),
    'rejected': t('input.inventory.stockOut.status.rejected')
  }
  return typeMap[type] || type
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

// 返回
const goBack = () => {
  router.back()
}

// 显示批次拆分明细
const showBatchSplits = (detail) => {
  currentBatchSplits.value = detail.batch_splits || []
  batchSplitsDialogVisible.value = true
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getOutboundOrderDetail(outboundOrderId)
    if (res.code === 200) {
      detailData.value = res.data

      // 设置审批历史记录
      if (res.data.audit_user) {
        approvalHistory.value = [{
          approver: res.data.audit_user,
          approvalTime: res.data.audit_time,
          comment: res.data.remark || ''
        }]
      }
    }
  } catch (error) {
    console.error('Failed to load outbound order detail:', error)
    ElMessage.error(t('common.failed'))
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';

/* 移动端默认隐藏 */
.mobile-view {
  display: none;
}

/* 移动端卡片 */
.item-card {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  background: #fafafa;
}

.item-card:last-child {
  margin-bottom: 0;
}

.item-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e4e7ed;
}

.item-index {
  font-size: 14px;
  font-weight: 600;
  color: #009A44;
}

.item-name {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0;
  flex: 1;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.info-row.full-width {
  flex-direction: column;
  align-items: flex-start;
}

.info-row .label {
  color: #909399;
  flex-shrink: 0;
}

.info-row .value {
  color: #303133;
  font-weight: 500;
}

.item-footer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e4e7ed;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #909399;
}

/* 响应式设计 */
@media screen and (max-width: 1024px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .detail-item.full-width {
    grid-column: auto;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    margin: -16px -16px 16px -16px;
  }

  .header-content {
    padding: 0 16px;
    grid-template-columns: auto 1fr;
    gap: 16px;
  }

  .header-right {
    display: none;
  }

  .header-center {
    text-align: left;
  }

  .page-title {
    font-size: 18px;
  }

  .detail-wrapper {
    padding: 16px;
  }

  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .detail-item .label {
    min-width: auto;
  }

  .pc-view {
    display: none;
  }

  .mobile-view {
    display: block;
  }

  .btn-text {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    margin: -12px -12px 12px -12px;
  }

  .header-content {
    padding: 0 12px;
  }

  .page-title {
    font-size: 16px;
  }

  .detail-wrapper {
    padding: 12px;
  }

  .item-card {
    padding: 12px;
  }
}
</style>
