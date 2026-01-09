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
            <h1 class="page-title">{{ $t('input.inventory.stock.detail') }}</h1>
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
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('input.inventory.stock.form.inputName')">
                  {{ detailData.material_name || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stock.form.batchNo')">
                  {{ detailData.material_batch_id || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stock.form.warehouseName')">
                  {{ detailData.warehouse_name || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stock.form.currentQuantity')">
                  {{ detailData.quantity || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stock.form.inDate')">
                  {{ formatDateTime(detailData.created_at) }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stock.form.expiredDate')">
                  {{ formatDate(detailData.expiry_date) }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stock.form.stockStatus')">
                  <el-tag :type="getStatusTag(detailData.status)">
                    {{ getStatusText(detailData.status) }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('input.inventory.stock.form.daysToExpire')" v-if="detailData.days_to_expire !== undefined">
                  {{ detailData.days_to_expire }} {{ $t('common.days') }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- QR Code 卡片 -->
          <div v-if="detailData.qr_code" class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-qr-code-line"></i>
                <span>{{ $t('input.inventory.stock.qrCode.title') }}</span>
              </div>
            </div>
            <div class="card-body">
              <div class="qr-code-wrapper">
                <img :src="detailData.qr_code" alt="QR Code" class="qr-code-image" />
                <p class="qr-code-hint">{{ $t('input.inventory.stock.qrCode.hint') }}</p>
              </div>
            </div>
          </div>
        </template>
      </div>
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

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

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
</style>
