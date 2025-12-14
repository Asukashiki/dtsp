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
              <span class="label">{{ $t('input.catalog.form.inputType') }}:</span>
              <span class="value">{{ getLabelByValue('input_type', detailData.material_type) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.catalog.form.agriculturalInputType') }}:</span>
              <span class="value">{{ getLabelByValue('input_category', detailData.agricultural_input_type) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stock.form.currentQuantity') }}:</span>
              <span class="value">{{ detailData.quantity }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stock.form.inDate') }}:</span>
              <span class="value">{{ formatDateTime(detailData.created_at) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stock.form.expiredDate') }}:</span>
              <span class="value">{{ formatDate(detailData.expiry_date) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('input.inventory.stock.form.stockStatus') }}:</span>
              <el-tag :type="getStatusTag(detailData.status)">
                {{ getStatusText(detailData.status) }}
              </el-tag>
            </div>
            <div class="detail-item" v-if="detailData.days_to_expire !== undefined">
              <span class="label">{{ $t('input.inventory.stock.form.daysToExpire') }}:</span>
              <span class="value">{{ detailData.days_to_expire }} {{ $t('common.days') }}</span>
            </div>
          </div>
        </div>

        <!-- QR Code / Traceability Info -->
        <div v-if="detailData.qr_code" class="detail-section">
          <div class="section-title">
            <i class="ri-qr-code-line"></i>
            {{ $t('input.inventory.stock.qrCode.title') }}
          </div>
          <div class="qr-code-wrapper">
            <VueQrcode :value="detailData.qr_code" :size="200" level="M" class="qr-code-image" />
            <!-- <p class="qr-code-hint">{{ $t('input.inventory.stock.columns.qrCodeHint') }}</p> -->
            <div class="qr-info-grid">
              <div v-for="(value, key) in parsedQrCode" :key="key" class="qr-info-item">
                <span class="qr-label">{{ formatQrKey(key) }}:</span>
                <span class="qr-value">{{ value }}</span>
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
import { getInventoryDetail } from '@/api/inventory'
import { useDict } from '@/hooks/useDict'
import VueQrcode from 'vue-qrcode'

const { getLabelByValue } = useDict(['input_type', 'input_category'])

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref(null)
const inventoryId = route.params.id

// 格式化日期时间
const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return '-'

  // 处理带时区和毫秒的日期格式 (如: "2025-12-14 11:00:27.000+08:00")
/*  if (dateTimeStr.includes('+') && dateTimeStr.includes('.')) {
    const datePart = dateTimeStr.split(' ')[0]
    const timePart = dateTimeStr.split(' ')[1].split('.')[0]
    return `${datePart} ${timePart}`
  }*/

  // 处理标准ISO格式 (如: "2025-12-14T01:40:59")
  return dateTimeStr.replace('T', ' ')
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

// 解析QR码JSON
import { computed } from 'vue'
const parsedQrCode = computed(() => {
  if (!detailData.value?.qr_code) return {}
  try {
    return JSON.parse(detailData.value.qr_code)
  } catch (e) {
    return { data: detailData.value.qr_code }
  }
})

// 格式化QR码字段名
const formatQrKey = (key) => {
  const keyMap = {
    materialId: t('input.inventory.stockIn.materialId'),
    batchId: t('input.inventory.stockIn.batchId'),
    warehouseId: t('input.inventory.warehouse.form.warehouseCode'),
    expiryDate: t('input.inventory.stockIn.expiryDate'),
    quantity: t('input.inventory.stock.form.currentQuantity')
  }
  return keyMap[key] || key
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
  background: #f5f7fa;
  border-radius: 8px;
}

.qr-code-image {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 8px;
  background: white;
}

.qr-code-hint {
  margin: 12px 0 16px;
  font-size: 13px;
  color: #909399;
  text-align: center;
}

.qr-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
  max-width: 1000px;
  background: white;
  padding: 16px;
  border-radius: 8px;
}

.qr-info-item {
  display: flex;
  gap: 8px;
}

.qr-label {
  font-size: 13px;
  color: #909399;
  flex-shrink: 0;
}

.qr-value {
  font-size: 13px;
  color: #303133;
  font-weight: 500;
  word-break: break-all;
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
