<template>
  <div class="inbound-detail-page">
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
          <h1 class="page-title">{{ $t('input.inventory.stockIn.detail') }}</h1>
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
              <span class="label">{{ $t('input.inventory.stockIn.columns.orderId') }}:</span>
              <span class="value">{{ detailData.inbound_order_id }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockIn.batchId') }}:</span>
              <span class="value">{{ detailData.inbound_batch_id || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockIn.columns.type') }}:</span>
              <el-tag :type="getTypeTag(detailData.inbound_type)">
                {{ getTypeText(detailData.inbound_type) }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockIn.columns.status') }}:</span>
              <el-tag :type="getStatusTag(detailData.inbound_status)">
                {{ getStatusText(detailData.inbound_status) }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockIn.columns.warehouse') }}:</span>
              <span class="value">{{ detailData.warehouse_name || detailData.warehouse_id }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockIn.relatedOrderNo') }}:</span>
              <span class="value">{{ detailData.related_order_no || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockIn.supplierName') }}:</span>
              <span class="value">{{ detailData.supplier_name || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockIn.supplierContact') }}:</span>
              <span class="value">{{ detailData.supplier_contact || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockIn.supplierPhone') }}:</span>
              <span class="value">{{ detailData.supplier_phone || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockIn.columns.operator') }}:</span>
              <span class="value">{{ detailData.operator }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockIn.columns.applyTime') }}:</span>
              <span class="value">{{ detailData.apply_time }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockIn.columns.inboundTime') }}:</span>
              <span class="value">{{ detailData.inbound_time || '-' }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('input.inventory.stockIn.remark') }}:</span>
              <span class="value">{{ detailData.remark || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 审核信息（如果有） -->
        <div v-if="detailData.audit_user" class="detail-section">
          <div class="section-title">
            <i class="ri-shield-check-line"></i>
            {{ $t('input.inventory.stockIn.auditInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockIn.auditUser') }}:</span>
              <span class="value">{{ detailData.audit_user }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockIn.auditTime') }}:</span>
              <span class="value">{{ detailData.audit_time || '-' }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('input.inventory.stockIn.auditRemark') }}:</span>
              <span class="value">{{ detailData.audit_remark || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 入库物料明细 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-archive-line"></i>
            {{ $t('input.inventory.stockIn.materialDetails') }}
          </div>

          <!-- PC端表格 -->
          <div class="pc-view">
            <el-table :data="detailData.details || []" stripe style="width: 100%">
              <el-table-column type="index" label="#" width="60" />
              <el-table-column prop="material_id" :label="$t('input.inventory.stockIn.materialId')" width="150" />
              <el-table-column prop="material_name" :label="$t('input.inventory.stockIn.materialName')" min-width="150" />
              <el-table-column prop="spec_model" :label="$t('input.inventory.stockIn.specification')" width="120" />
              <el-table-column prop="unit_of_measure" :label="$t('input.inventory.stockIn.unit')" width="80" align="center" />
              <el-table-column prop="quantity" :label="$t('input.inventory.stockIn.columns.quantity')" width="100" align="center" />
              <el-table-column prop="expiry_date" :label="$t('input.inventory.stockIn.expiryDate')" width="120" />
              <el-table-column prop="material_batch_id" :label="$t('input.inventory.stockIn.materialBatchId')" min-width="200" show-overflow-tooltip />
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
                  <span class="label">{{ $t('input.inventory.stockIn.materialId') }}:</span>
                  <span class="value">{{ item.material_id }}</span>
                </div>
                <div class="info-row">
                  <span class="label">{{ $t('input.inventory.stockIn.specification') }}:</span>
                  <span class="value">{{ item.spec_model }}</span>
                </div>
                <div class="info-row">
                  <span class="label">{{ $t('input.inventory.stockIn.unit_of_measure') }}:</span>
                  <span class="value">{{ item.unit_of_measure }}</span>
                </div>
                <div class="info-row">
                  <span class="label">{{ $t('input.inventory.stockIn.columns.quantity') }}:</span>
                  <span class="value">{{ item.quantity }}</span>
                </div>
                <div class="info-row">
                  <span class="label">{{ $t('input.inventory.stockIn.expiryDate') }}:</span>
                  <span class="value">{{ item.expiry_date }}</span>
                </div>
                <div v-if="item.material_batch_id" class="info-row full-width">
                  <span class="label">{{ $t('input.inventory.stockIn.materialBatchId') }}:</span>
                  <span class="value">{{ item.material_batch_id }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getInboundOrderDetail } from '@/api/inbound'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref(null)
const inboundOrderId = route.params.id

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
    const res = await getInboundOrderDetail(inboundOrderId)
    if (res.code === 200) {
      detailData.value = res.data
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

<style scoped>
.inbound-detail-page {
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

.header-left {
  display: flex;
  align-items: center;
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
