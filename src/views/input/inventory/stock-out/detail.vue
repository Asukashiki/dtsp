<template>
  <div class="stock-out-detail-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <el-button link @click="goBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </div>
        <div class="header-center">
          <h1 class="page-title">{{ $t('input.inventory.stockOut.detail') }}</h1>
        </div>
      </div>
    </div>

    <!-- 详情区域 -->
    <div v-loading="loading" class="detail-wrapper">
      <template v-if="detailData">
        <!-- 基本信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('input.catalog.form.basicInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.outboundOrderId') }}:</span>
              <span class="value">{{ detailData.outbound_order_id }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.outboundBatchId') }}:</span>
              <span class="value">{{ detailData.outbound_batch_id || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.type') }}:</span>
              <el-tag :type="getTypeTag(detailData.outbound_type)">
                {{ getTypeText(detailData.outbound_type) }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.status') }}:</span>
              <el-tag :type="getStatusTag(detailData.outbound_status)">
                {{ getStatusText(detailData.outbound_status) }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.warehouseId') }}:</span>
              <span class="value">{{ detailData.warehouse_name }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.relatedOrderNo') }}:</span>
              <span class="value">{{ detailData.related_order_no || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.outboundUser') }}:</span>
              <span class="value">{{ detailData.outbound_user || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.outboundDept') }}:</span>
              <span class="value">{{ detailData.outbound_dept || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.operator') }}:</span>
              <span class="value">{{ detailData.operator }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.createTime') }}:</span>
              <span class="value">{{ detailData.created_at }}</span>
            </div>
            <div class="detail-item" v-if="detailData.outbound_time">
              <span class="label">{{ $t('input.inventory.stockOut.form.outboundTime') }}:</span>
              <span class="value">{{ detailData.outbound_time }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('input.inventory.stockOut.form.remark') }}:</span>
              <span class="value">{{ detailData.remark || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 审核信息 -->
        <div class="detail-section" v-if="detailData.audit_user || detailData.audit_time">
          <div class="section-title">
            <i class="ri-file-list-line"></i>
            {{ $t('input.inventory.stockIn.auditInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.auditUser') }}:</span>
              <span class="value">{{ detailData.audit_user || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.auditTime') }}:</span>
              <span class="value">{{ detailData.audit_time || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 出库明细 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-archive-line"></i>
            {{ $t('input.inventory.stockOut.form.details') }}
          </div>

          <!-- PC端表格 -->
          <div class="pc-view">
            <el-table :data="detailData.details || []" stripe style="width: 100%">
              <el-table-column type="index" label="#" width="60" />
              <el-table-column prop="material_name" :label="$t('input.inventory.stockOut.form.inputName')" min-width="150" />
              <el-table-column prop="material_type" :label="$t('input.inventory.stockOut.form.inputType')" width="120" />
              <el-table-column prop="agricultural_input_type" :label="$t('input.inventory.stockOut.form.agriculturalInputType')" width="120" />
              <el-table-column prop="variety" :label="$t('input.inventory.stockOut.form.variety')" width="120" />
              <el-table-column prop="material_batch_id" :label="$t('input.inventory.stockOut.form.batchNo')" width="150" />
              <el-table-column prop="quantity" :label="$t('input.inventory.stockOut.form.quantity')" width="120" align="center" />
              <el-table-column prop="spec_model" :label="$t('input.inventory.stockOut.form.specModel')" width="140" />
              <el-table-column prop="unit_of_measure" :label="$t('input.inventory.stockOut.form.unitOfMeasure')" width="100" />
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
                  <span class="label">{{ $t('input.inventory.stockOut.form.inputType') }}:</span>
                  <span class="value">{{ item.material_type || '-' }}</span>
                </div>
                <div v-if="item.agricultural_input_type" class="info-row">
                  <span class="label">{{ $t('input.inventory.stockOut.form.agriculturalInputType') }}:</span>
                  <span class="value">{{ item.agricultural_input_type }}</span>
                </div>
                <div v-if="item.variety" class="info-row">
                  <span class="label">{{ $t('input.inventory.stockOut.form.variety') }}:</span>
                  <span class="value">{{ item.variety }}</span>
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
                  <span class="value">{{ item.unit_of_measure }}</span>
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getOutboundOrderDetail } from '@/api/outbound'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref(null)
const outboundOrderId = route.params.id

// 批次拆分弹窗
const batchSplitsDialogVisible = ref(false)
const currentBatchSplits = ref([])

// 检查是否有批次拆分数据
const hasBatchSplits = computed(() => {
  if (!detailData.value || !detailData.value.details) return false
  return detailData.value.details.some(detail => detail.batch_splits && detail.batch_splits.length > 0)
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

<style scoped>
.stock-out-detail-page {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: white;
  padding: 16px 0;
  margin: -24px 0 24px 0;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.header-right {
  justify-content: flex-end;
}

.header-center {
  text-align: center;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

/* 详情区域 */
.detail-wrapper {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.detail-section {
  margin-bottom: 32px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f2f5;
}

.section-title i {
  font-size: 20px;
  color: #009A44;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-item .label {
  font-size: 14px;
  color: #909399;
  flex-shrink: 0;
  min-width: 120px;
}

.detail-item .value {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
  flex: 1;
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
