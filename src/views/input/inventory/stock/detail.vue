<template>
  <div class="stock-detail-page">
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
          <h1 class="page-title">{{ $t('input.inventory.stock.detail') }}</h1>
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
              <span class="label">{{ $t('input.inventory.stock.form.inputName') }}:</span>
              <span class="value">{{ detailData.material_name }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stock.form.batchNo') }}:</span>
              <span class="value">{{ detailData.material_batch_id }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stock.form.warehouseName') }}:</span>
              <span class="value">{{ detailData.warehouse_name }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stock.form.currentQuantity') }}:</span>
              <span class="value">{{ detailData.quantity }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stock.form.inDate') }}:</span>
              <span class="value">{{ detailData.created_at }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stock.form.expiredDate') }}:</span>
              <span class="value">{{ detailData.expiry_date }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stock.form.stockStatus') }}:</span>
              <el-tag :type="getStatusTag(detailData.status)">
                {{ getStatusText(detailData.status) }}
              </el-tag>
            </div>
            <div class="detail-item" v-if="detailData.days_to_expire !== undefined">
              <span class="label">{{ $t('input.inventory.stock.form.daysToExpire') }}:</span>
              <span class="value">{{ detailData.days_to_expire }} {{ t('common.days') }}</span>
            </div>
          </div>
        </div>

        <!-- QR Code (if available) -->
        <div v-if="detailData.qr_code" class="detail-section">
          <div class="section-title">
            <i class="ri-qr-code-line"></i>
            {{ $t('input.inventory.stock.columns.qrCode') }}
          </div>
          <div class="qr-code-wrapper">
            <img :src="detailData.qr_code" alt="QR Code" class="qr-code-image" />
            <p class="qr-code-hint">{{ $t('input.inventory.stock.columns.qrCodeHint') }}</p>
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
import { getInventoryDetail } from '@/api/inventory'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref(null)
const inventoryId = route.params.id

// 获取状态标签
const getStatusTag = (status) => {
  const statusMap = {
    '0': 'success',
    '1': 'warning',
    '2': 'danger'
  }
  return statusMap[status] || 'info'
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    '0': t('input.inventory.stock.status.normal'),
    '1': t('input.inventory.stock.status.nearExpiry'),
    '2': t('input.inventory.stock.status.expired')
  }
  return statusMap[status] || '-'
}

// 返回
const goBack = () => {
  router.back()
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const res = await getInventoryDetail(inventoryId)
    if (res.code === 200) {
      detailData.value = res.data
    }
  } catch (error) {
    console.error('Failed to load inventory detail:', error)
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
.stock-detail-page {
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

/* QR Code */
.qr-code-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.qr-code-image {
  max-width: 200px;
  height: auto;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 8px;
  background: white;
}

.qr-code-hint {
  margin-top: 12px;
  font-size: 14px;
  color: #909399;
  text-align: center;
}

/* 响应式设计 */
@media screen and (max-width: 1024px) {
  .detail-grid {
    grid-template-columns: 1fr;
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
}
</style>
