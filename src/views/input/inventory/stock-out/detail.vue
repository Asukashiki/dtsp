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
        <div class="header-right">
          <el-button v-if="detailData && detailData.status === '0'" type="success" @click="handleConfirm">
            <i class="ri-check-line"></i>
            <span class="btn-text">{{ $t('input.inventory.stockOut.confirm') }}</span>
          </el-button>
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
              <span class="label">{{ $t('input.inventory.stockOut.form.stockOutId') }}:</span>
              <span class="value">{{ detailData.stock_out_id }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.batchNo') }}:</span>
              <span class="value">{{ detailData.batch_no }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.warehouseId') }}:</span>
              <span class="value">{{ detailData.warehouse_name }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.customer') }}:</span>
              <span class="value">{{ detailData.customer }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.type') }}:</span>
              <el-tag type="success">
                {{ $t('input.inventory.stockOut.type.sale') }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.operator') }}:</span>
              <span class="value">{{ detailData.operator }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.totalQuantity') }}:</span>
              <span class="value">{{ detailData.total_quantity }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.status') }}:</span>
              <el-tag :type="getStatusTag(detailData.status)">
                {{ getStatusText(detailData.status) }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stockOut.form.createTime') }}:</span>
              <span class="value">{{ detailData.create_time }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('input.inventory.stockOut.form.remark') }}:</span>
              <span class="value">{{ detailData.remark || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 出库商品明细 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-archive-line"></i>
            {{ $t('input.inventory.stockOut.form.items') }}
          </div>

          <!-- PC端表格 -->
          <div class="pc-view">
            <el-table :data="detailData.items || []" stripe style="width: 100%">
              <el-table-column type="index" label="#" width="60" />
              <el-table-column prop="input_name" :label="$t('input.inventory.stockOut.form.inputId')" min-width="150" />
              <el-table-column prop="batch_no" :label="$t('input.inventory.stockOut.form.batchNo')" width="180" />
              <el-table-column prop="quantity" :label="$t('input.inventory.stockOut.form.quantity')" width="140" align="center" />
              <el-table-column prop="remarks" :label="$t('input.inventory.stockOut.form.itemRemarks')" min-width="150" show-overflow-tooltip />
            </el-table>
          </div>

          <!-- 移动端卡片 -->
          <div class="mobile-view">
            <div v-if="!detailData.items || detailData.items.length === 0" class="empty-state">
              <p>{{ $t('input.inventory.stockOut.messages.noItems') }}</p>
            </div>
            <div v-for="(item, index) in detailData.items" :key="index" class="item-card">
              <div class="item-header">
                <span class="item-index">#{{ index + 1 }}</span>
                <h4 class="item-name">{{ item.input_name }}</h4>
              </div>
              <div class="item-info">
                <div class="info-row">
                  <span class="label">{{ $t('input.inventory.stockOut.form.batchNo') }}:</span>
                  <span class="value">{{ item.batch_no }}</span>
                </div>
                <div class="info-row">
                  <span class="label">{{ $t('input.inventory.stockOut.form.quantity') }}:</span>
                  <span class="value">{{ item.quantity }}</span>
                </div>
                <div v-if="item.remarks" class="info-row full-width">
                  <span class="label">{{ $t('input.inventory.stockOut.form.itemRemarks') }}:</span>
                  <span class="value">{{ item.remarks }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- QR Code (if available) -->
        <!-- <div v-if="detailData.qr_code" class="detail-section">
          <div class="section-title">
            <i class="ri-qr-code-line"></i>
            {{ $t('input.inventory.stockOut.qrCode') }}
          </div>
          <div class="qr-code-wrapper">
            <img :src="detailData.qr_code" alt="QR Code" class="qr-code-image" />
          </div>
        </div> -->
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getStockOutDetail, confirmStockOut } from '@/api/inventory'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref(null)
const stockOutId = route.params.id

// 获取状态标签
const getStatusTag = (status) => {
  const statusMap = {
    '0': 'warning',
    '1': 'success',
    '2': 'info'
  }
  return statusMap[status] || 'info'
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    '0': t('input.inventory.stockOut.status.pending'),
    '1': t('input.inventory.stockOut.status.confirmed'),
    '2': t('input.inventory.stockOut.status.cancelled')
  }
  return statusMap[status] || '-'
}

// 返回
const goBack = () => {
  router.back()
}

// 确认出库
const handleConfirm = () => {
  ElMessageBox.confirm(
    t('input.inventory.stockOut.confirmConfirm'),
    t('common.tips'),
    {
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel'),
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await confirmStockOut(stockOutId)
      if (res.code === 200) {
        ElMessage.success(t('input.inventory.stockOut.confirmSuccess'))
        loadData()
      }
    } catch (error) {
      console.error('Failed to confirm stock out:', error)
      ElMessage.error(t('common.failed'))
    }
  }).catch(() => {})
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getStockOutDetail(stockOutId)
    if (res.code === 200) {
      detailData.value = res.data
    }
  } catch (error) {
    console.error('Failed to load stock out detail:', error)
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
  min-width: 100px;
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

/* QR Code */
.qr-code-wrapper {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.qr-code-image {
  max-width: 200px;
  height: auto;
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
