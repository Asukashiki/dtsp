<template>
  <div class="stock-dashboard-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="icon-wrapper">
          <i class="ri-dashboard-line"></i>
        </div>
        <div class="header-text">
          <h1>{{ $t('input.inventory.stock.dashboard') }}</h1>
          <p>{{ $t('input.inventory.stock.dashboardSubtitle') }}</p>
        </div>
      </div>
      <div class="header-actions">
        <el-button @click="handleRefresh" :loading="loading">
          <i class="ri-refresh-line"></i>
          {{ $t('common.refresh') }}
        </el-button>
      </div>
    </div>

    <!-- 指标卡片区域 -->
    <div v-loading="loading" class="metrics-wrapper">
      <!-- 总库存总量 -->
      <div class="metric-card">
        <div class="metric-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <i class="ri-database-2-line"></i>
        </div>
        <div class="metric-content">
          <div class="metric-label">{{ $t('input.inventory.stock.metrics.totalStock') }}</div>
          <div class="metric-value">{{ formatNumber(dashboardData.totalStock) }}</div>
          <div class="metric-desc">{{ $t('input.inventory.stock.unit') || 'units' }}</div>
        </div>
      </div>

      <!-- 临期商品数量 -->
      <div class="metric-card" :class="{ 'metric-warning': dashboardData.nearExpiryCount > 0 }">
        <div class="metric-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
          <i class="ri-time-line"></i>
        </div>
        <div class="metric-content">
          <div class="metric-label">{{ $t('input.inventory.stock.metrics.nearExpiryCount') }}</div>
          <div class="metric-value" :class="{ 'value-danger': dashboardData.nearExpiryCount > 0 }">
            {{ dashboardData.nearExpiryCount }}
          </div>
          <div class="metric-desc">{{ $t('input.inventory.stock.status.nearExpiry') }}</div>
        </div>
      </div>

      <!-- 超容量仓库数 -->
      <div class="metric-card" :class="{ 'metric-danger': dashboardData.overCapacityWarehouses > 0 }">
        <div class="metric-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
          <i class="ri-alert-line"></i>
        </div>
        <div class="metric-content">
          <div class="metric-label">{{ $t('input.inventory.stock.metrics.overCapacityWarehouses') }}</div>
          <div class="metric-value" :class="{ 'value-danger': dashboardData.overCapacityWarehouses > 0 }">
            {{ dashboardData.overCapacityWarehouses }}
          </div>
          <div class="metric-desc">{{ $t('input.inventory.warehouse.title') }}</div>
        </div>
      </div>

      <!-- 待处理预警数 -->
      <div class="metric-card" :class="{ 'metric-warning': dashboardData.pendingAlerts > 0 }">
        <div class="metric-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
          <i class="ri-notification-3-line"></i>
        </div>
        <div class="metric-content">
          <div class="metric-label">{{ $t('input.inventory.stock.metrics.pendingAlerts') }}</div>
          <div class="metric-value" :class="{ 'value-danger': dashboardData.pendingAlerts > 0 }">
            {{ dashboardData.pendingAlerts }}
          </div>
          <div class="metric-desc">{{ $t('input.inventory.stock.warning') }}</div>
        </div>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="quick-actions">
      <h3 class="section-title">{{ $t('common.actions') || 'Quick Actions' }}</h3>
      <div class="action-grid">
        <div class="action-card" @click="handleViewStock">
          <i class="ri-database-line"></i>
          <span>{{ $t('input.inventory.stock.list') }}</span>
        </div>
        <div class="action-card" @click="handleViewWarnings">
          <i class="ri-alarm-warning-line"></i>
          <span>{{ $t('input.inventory.stock.warning') }}</span>
        </div>
        <div class="action-card" @click="handleViewLogs">
          <i class="ri-file-list-line"></i>
          <span>{{ $t('input.inventory.stock.logs') }}</span>
        </div>
        <div class="action-card" @click="handleViewStockIn">
          <i class="ri-inbox-line"></i>
          <span>{{ $t('input.inventory.stockIn.title') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getStockDashboard } from '@/api/stock'

const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const dashboardData = ref({
  totalStock: 0,
  nearExpiryCount: 0,
  overCapacityWarehouses: 0,
  pendingAlerts: 0,
  totalValue: 0,
  warehouseUsage: 0
})

// 格式化数字
const formatNumber = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(2) + 'w'
  }
  return num?.toLocaleString() || 0
}

// 加载仪表盘数据
const loadDashboardData = async () => {
  loading.value = true
  try {
    const res = await getStockDashboard()
    if (res.code === 200 || res.code === 0) {
      dashboardData.value = res.data || {
        totalStock: 0,
        nearExpiryCount: 0,
        overCapacityWarehouses: 0,
        pendingAlerts: 0
      }
    }
  } catch (error) {
    console.error('Failed to load dashboard data:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 刷新数据
const handleRefresh = () => {
  loadDashboardData()
}

// 查看库存列表
const handleViewStock = () => {
  router.push('/input/inventory/stock')
}

// 查看预警
const handleViewWarnings = () => {
  router.push('/input/inventory/stock?tab=warning')
}

// 查看日志
const handleViewLogs = () => {
  router.push('/input/inventory/stock/logs')
}

// 查看入库
const handleViewStockIn = () => {
  router.push('/input/inventory/stock-in')
}

onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
.stock-dashboard-page {
  min-height: calc(100vh - 120px);
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 32px;
  border-radius: 16px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  border-radius: 20px;
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

.header-actions .el-button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.header-actions .el-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 指标卡片区域 */
.metrics-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.metric-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.metric-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  opacity: 0;
  transition: opacity 0.3s;
}

.metric-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.metric-card:hover::before {
  opacity: 1;
}

.metric-card.metric-warning {
  border: 2px solid #f5576c;
}

.metric-card.metric-danger {
  border: 2px solid #da121a;
}

.metric-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
  flex-shrink: 0;
}

.metric-content {
  flex: 1;
}

.metric-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}

.metric-value {
  font-size: 32px;
  font-weight: 700;
  color: #303133;
  line-height: 1;
  margin-bottom: 8px;
}

.metric-value.value-danger {
  color: #da121a;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.metric-desc {
  font-size: 12px;
  color: #c0c4cc;
}

/* 快捷入口 */
.quick-actions {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 20px 0;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.action-card {
  background: linear-gradient(135deg, #f5f7fa 0%, #f0f2f5 100%);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.action-card:hover {
  background: linear-gradient(135deg, #009a44 0%, #00b350 100%);
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 154, 68, 0.3);
}

.action-card i {
  font-size: 32px;
  color: #009a44;
  transition: color 0.3s;
}

.action-card:hover i {
  color: white;
}

.action-card span {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  transition: color 0.3s;
}

.action-card:hover span {
  color: white;
}

/* 响应式设计 */
@media screen and (max-width: 1440px) {
  .metrics-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }

  .action-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }

  .header-text h1 {
    font-size: 22px;
  }

  .metrics-wrapper {
    grid-template-columns: 1fr;
  }

  .metric-card {
    padding: 20px;
  }

  .metric-icon {
    width: 56px;
    height: 56px;
    font-size: 28px;
  }

  .metric-value {
    font-size: 28px;
  }

  .action-grid {
    grid-template-columns: 1fr;
  }
}
</style>
