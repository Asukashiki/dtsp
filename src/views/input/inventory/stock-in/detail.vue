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
            <h1 class="page-title">{{ $t('input.inventory.stockIn.detail') }}</h1>
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
                <el-descriptions-item :label="$t('input.inventory.stockIn.columns.orderId')">
                  {{ detailData.inbound_order_id }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockIn.batchId')">
                  {{ detailData.inbound_batch_id || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockIn.columns.type')">
                  <el-tag :type="getTypeTag(detailData.inbound_type)">
                    {{ getTypeText(detailData.inbound_type) }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockIn.columns.status')">
                  <el-tag :type="getStatusTag(detailData.inbound_status)">
                    {{ getStatusText(detailData.inbound_status) }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockIn.columns.warehouse')">
                  {{ detailData.warehouse_name || detailData.warehouse_id }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockIn.relatedOrderNo')">
                  {{ detailData.related_order_no || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockIn.columns.operator')">
                  {{ detailData.operator }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockIn.columns.applyTime')">
                  {{ formatDateTime(detailData.apply_time) }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockIn.columns.inboundTime')">
                  {{ formatDateTime(detailData.inbound_time) }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stockIn.remark')" :span="2">
                  {{ detailData.form_remark || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 工作流信息（使用 WorkflowInfo 组件） -->
          <WorkflowInfo
            :workflow-status="getWorkflowStatus(detailData.inbound_status)"
            mode="view"
            :approval-history="approvalHistory"
            :hide-for-states="['S0', 'S10']" />

          <!-- 入库物料明细 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-archive-line"></i>
                <span>{{ $t('input.inventory.stockIn.materialDetails') }}</span>
              </div>
            </div>
            <div class="card-body">
              <!-- PC端表格 -->
              <div class="pc-view">
                <el-table :data="detailData.details || []" stripe style="width: 100%">
                  <el-table-column type="index" label="#" width="60" />
                  <el-table-column prop="material_name" :label="$t('input.inventory.stockIn.inputName')" min-width="150" />
                  <el-table-column prop="material_id" :label="$t('input.inventory.stockIn.inputId')" width="150" />
                  <el-table-column prop="batch_no" :label="$t('input.inventory.stockIn.form.inboundBatch')" width="180" show-overflow-tooltip />
                  <el-table-column prop="production_batch_no" :label="$t('input.inventory.stockIn.form.productionBatch')" width="180" show-overflow-tooltip />
                  <el-table-column prop="material_type" :label="$t('input.inventory.stockIn.inputType')" width="120">
                    <template #default="scope">
                      {{ getLabelByValue('input_type', scope.row.material_type) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="agricultural_input_type" :label="$t('input.inventory.stockIn.form.agriculturalInputType')" width="120">
                    <template #default="scope">
                      {{ getLabelByValue('input_category', scope.row.agricultural_input_type) || scope.row.agricultural_input_type }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="spec_model" :label="$t('input.inventory.stockIn.specification')" width="120" />
                  <el-table-column prop="quantity" :label="$t('input.inventory.stockIn.columns.quantity')" width="100" align="center" />
                  <el-table-column prop="unit_of_measure" :label="$t('input.inventory.stockIn.unit')" width="80" align="center">
                    <template #default="scope">
                      {{ getLabelByValue('input_material_unit', scope.row.unit_of_measure) || scope.row.unit_of_measure }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="expiry_date" :label="$t('input.inventory.stockIn.expiryDate')" width="120">
                    <template #default="scope">
                      {{ formatDate(scope.row.expiry_date) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="qr_code" :label="$t('input.inventory.stockIn.qrCode')" width="150" show-overflow-tooltip class-name="hidden-column" />
                </el-table>
              </div>

              <!-- 移动端卡片 -->
              <div class="mobile-view">
                <div v-if="!detailData.details || detailData.details.length === 0" class="empty-state">
                  <p>{{ $t('input.inventory.stockIn.noMaterials') }}</p>
                </div>
                <div v-for="(item, index) in detailData.details" :key="index" class="item-card">
                  <div class="item-header">
                    <span class="item-index">#{{ index + 1 }}</span>
                    <h4 class="item-name">{{ item.material_name }}</h4>
                  </div>
                  <div class="item-info">
                    <div class="info-row">
                      <span class="label">{{ $t('input.inventory.stockIn.inputId') }}:</span>
                      <span class="value">{{ item.material_id }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">{{ $t('input.inventory.stockIn.inboundBatch') }}:</span>
                      <span class="value">{{ item.batch_no || '-' }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">{{ $t('input.inventory.stockIn.productionBatch') }}:</span>
                      <span class="value">{{ item.production_batch_no || '-' }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">{{ $t('input.inventory.stockIn.inputType') }}:</span>
                      <span class="value">{{ getLabelByValue('input_type', item.material_type) }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">{{ $t('input.inventory.stockIn.agriculturalInputType') }}:</span>
                      <span class="value">{{ getLabelByValue('input_category', item.agricultural_input_type) || item.agricultural_input_type }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">{{ $t('input.inventory.stockIn.specification') }}:</span>
                      <span class="value">{{ item.spec_model || '-' }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">{{ $t('input.inventory.stockIn.columns.quantity') }}:</span>
                      <span class="value">{{ item.quantity }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">{{ $t('input.inventory.stockIn.unit') }}:</span>
                      <span class="value">{{ getLabelByValue('input_material_unit', item.unit_of_measure) || item.unit_of_measure }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">{{ $t('input.inventory.stockIn.expiryDate') }}:</span>
                      <span class="value">{{ formatDate(item.expiry_date) }}</span>
                    </div>
                    <div v-if="item.qr_code" class="info-row full-width hidden-field">
                      <span class="label">{{ $t('input.inventory.stockIn.qrCode') }}:</span>
                      <span class="value">{{ item.qr_code }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getInboundOrderDetail } from '@/api/inbound'
import { useDict } from '@/hooks/useDict'
import WorkflowInfo from '@/components/workflow/WorkflowInfo.vue'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

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

// 审批历史记录
const approvalHistory = ref([])

// 初始化字典
const { getLabelByValue, options, loadAllDicts } = useDict(['input_type', 'input_category', 'input_material_unit'])

const loading = ref(false)
const detailData = ref(null)
const inboundOrderId = route.params.id

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

  // 处理ISO格式日期时间 (2025-12-14T01:40:59)
  if (dateTimeStr.includes('T')) {
    return dateTimeStr.replace('T', ' ')
  }

  return dateTimeStr
}

// 格式化日期（仅日期部分）
const formatDate = (dateStr) => {
  if (!dateStr) return '-'

  // 处理ISO格式日期 (2025-12-14T01:40:59)
  if (dateStr.includes('T')) {
    return dateStr.split('T')[0]
  }

  return dateStr
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
    'pending': t('input.inventory.stockIn.status.pending'),
    'completed': t('input.inventory.stockIn.status.completed'),
    'cancelled': t('input.inventory.stockIn.status.cancelled')
  }
  return statusMap[status] || '-'
}

// 获取类型标签
const getTypeTag = (type) => {
  const typeMap = {
    0: 'success',
    1: 'primary',
    2: 'warning'
  }
  return typeMap[type] || 'info'
}

// 获取类型文本
const getTypeText = (type) => {
  const typeMap = {
    0: t('input.inventory.stockIn.type.production'),
    1: t('input.inventory.stockIn.type.purchase'),
    2: t('input.inventory.stockIn.type.transfer')
  }
  return typeMap[type] || '-'
}

// 返回
const goBack = () => {
  router.back()
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    // 先加载字典数据
    await loadAllDicts()

    const res = await getInboundOrderDetail(inboundOrderId)
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

      // 调试信息：检查字典数据是否正确加载
      console.log('字典数据:', {
        input_type: options.value.input_type,
        input_category: options.value.input_category
      })

      // 调试信息：检查agricultural_input_type字段的值
      if (res.data.details && res.data.details.length > 0) {
        console.log('投入品品类值:', res.data.details[0].agricultural_input_type)
      }
    }
  } catch (error) {
    console.error('Failed to load inbound order detail:', error)
    ElMessage.error(t('common.loadFailed'))
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

/* 隐藏表格列 */
:deep(.hidden-column) {
  display: none !important;
}

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
