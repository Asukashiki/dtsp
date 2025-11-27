<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import * as echarts from 'echarts'
import {
  getOverview,
  getTopSuppliers,
  getWarehouseStats,
  getStockTrend,
  getInputTypeDistribution,
  getWarnings,
  getTodayStock,
  getExpiringSoon,
  getStockStatusDistribution
} from '@/api/dashboard'

const { t, locale } = useI18n()

// 数据状态
const overview = ref({})
const topSuppliers = ref([])
const warehouseStats = ref([])
const stockTrendData = ref([])
const inputDistribution = ref([])
const warnings = ref([])
const loading = ref(false)
const lastUpdateTime = ref('')
const currentTime = ref('')

// 模拟的额外数据
const recentRecords = ref([])
const expiringItems = ref([])
const stockAlertStats = ref({ expired: 0, nearExpiry: 0, lowStock: 0, normal: 0 })

// 全屏控制
const isFullscreen = ref(false)
const dashboardRef = ref(null)

// 自动刷新控制
const autoRefreshEnabled = ref(true)
const refreshInterval = ref(null)
const timeInterval = ref(null)
const trendDays = ref(7)

// Chart实例
let stockTrendChart = null
let inputDistChart = null
let warehouseChart = null
let supplierChart = null
let alertStatsChart = null

// 更新当前时间
const updateCurrentTime = () => {
  const now = new Date()
  const options = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }
  currentTime.value = now.toLocaleString('zh-CN', options)
}

// 格式化时间
const formatTime = (date) => {
  const d = date || new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 格式化数字
const formatNumber = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num?.toLocaleString() || '0'
}

// 切换全屏
const toggleFullscreen = async () => {
  if (!document.fullscreenElement) {
    await dashboardRef.value?.requestFullscreen()
    isFullscreen.value = true
  } else {
    await document.exitFullscreen()
    isFullscreen.value = false
  }
}

// 监听全屏变化
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
  setTimeout(() => {
    handleResize()
  }, 100)
}


// 获取所有数据
const fetchAllData = async () => {
  try {
    loading.value = true

    const [
      overviewRes,
      suppliersRes,
      warehouseRes,
      trendRes,
      distributionRes,
      warningsRes,
      todayStockRes,
      expiringRes,
      stockStatusRes
    ] = await Promise.all([
      getOverview(),
      getTopSuppliers(10),
      getWarehouseStats(),
      getStockTrend(trendDays.value),
      getInputTypeDistribution(),
      getWarnings(20),
      getTodayStock(),
      getExpiringSoon(20),
      getStockStatusDistribution()
    ])

    if (overviewRes.code === 200) overview.value = overviewRes.data
    if (suppliersRes.code === 200) topSuppliers.value = suppliersRes.data
    if (warehouseRes.code === 200) warehouseStats.value = warehouseRes.data
    if (trendRes.code === 200) stockTrendData.value = trendRes.data
    if (distributionRes.code === 200) inputDistribution.value = distributionRes.data
    if (warningsRes.code === 200) warnings.value = warningsRes.data

    // 处理今日出入库数据
    if (todayStockRes.code === 200) {
      recentRecords.value = todayStockRes.data || []
    }

    // 处理即将过期数据
    if (expiringRes.code === 200) {
      expiringItems.value = expiringRes.data || []
    }

    // 处理库存状态分布数据
    if (stockStatusRes.code === 200 && stockStatusRes.data) {
      const statusData = stockStatusRes.data
      // 根据stockStatus字段映射：0-正常, 1-临期, 2-已过期
      stockAlertStats.value = {
        expired: statusData.find(s => s.stockStatus === '2')?.productCount || 0,
        nearExpiry: statusData.find(s => s.stockStatus === '1')?.productCount || 0,
        lowStock: 0, // 如果API没有提供，保持为0
        normal: statusData.find(s => s.stockStatus === '0')?.productCount || 0
      }
    }

    lastUpdateTime.value = formatTime()
    updateCharts()
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  } finally {
    loading.value = false
  }
}

// 初始化入库出库趋势图表
const initStockTrendChart = () => {
  const chartDom = document.getElementById('stockTrendChart')
  if (!chartDom) return

  stockTrendChart = echarts.init(chartDom)
  updateStockTrendChart()
}

// 更新入库出库趋势图表
const updateStockTrendChart = () => {
  if (!stockTrendChart || !stockTrendData.value.length) return

  const dates = stockTrendData.value.map(item => item.date)
  const stockInData = stockTrendData.value.map(item => item.stockInQuantity)
  const stockOutData = stockTrendData.value.map(item => item.stockOutQuantity)

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.5)',
      borderWidth: 1,
      textStyle: { color: '#fff', fontSize: 12 }
    },
    legend: {
      data: [t('input.dashboard.stockTrend.stockIn'), t('input.dashboard.stockTrend.stockOut')],
      textStyle: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 11 },
      top: 0,
      itemGap: 20
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '8%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dates,
      boundaryGap: false,
      axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
      axisLabel: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 10, rotate: 30 },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.1)' } }
    },
    series: [
      {
        name: t('input.dashboard.stockTrend.stockIn'),
        type: 'line',
        data: stockInData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        itemStyle: { color: '#00d4ff' },
        lineStyle: { width: 2, color: '#00d4ff' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 212, 255, 0.4)' },
            { offset: 1, color: 'rgba(0, 212, 255, 0.05)' }
          ])
        }
      },
      {
        name: t('input.dashboard.stockTrend.stockOut'),
        type: 'line',
        data: stockOutData,
        smooth: true,
        symbol: 'circle',
        symbolSize: 4,
        itemStyle: { color: '#ffd700' },
        lineStyle: { width: 2, color: '#ffd700' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(255, 215, 0, 0.4)' },
            { offset: 1, color: 'rgba(255, 215, 0, 0.05)' }
          ])
        }
      }
    ]
  }

  stockTrendChart.setOption(option)
}

// 初始化投入品分布图表
const initInputDistChart = () => {
  const chartDom = document.getElementById('inputDistChart')
  if (!chartDom) return

  inputDistChart = echarts.init(chartDom)
  updateInputDistChart()
}

// 更新投入品分布图表
const updateInputDistChart = () => {
  if (!inputDistChart || !inputDistribution.value.length) return

  const data = inputDistribution.value.map(item => ({
    name: item.typeName,
    value: item.count
  }))

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.5)',
      textStyle: { color: '#fff' }
    },
    legend: {
      orient: 'vertical',
      right: '2%',
      top: 'center',
      textStyle: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 10 },
      itemGap: 8,
      itemWidth: 10,
      itemHeight: 10
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '65%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: 'rgba(0, 20, 40, 0.8)',
          borderWidth: 2
        },
        label: {
          show: false
        },
        emphasis: {
          label: { show: true, fontSize: 12, fontWeight: 'bold', color: '#fff' },
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(0, 212, 255, 0.5)'
          }
        },
        data: data,
        color: ['#00d4ff', '#ffd700', '#ff6b6b', '#4ade80', '#a78bfa', '#fb923c']
      }
    ]
  }

  inputDistChart.setOption(option)
}

// 初始化仓库统计图表
const initWarehouseChart = () => {
  const chartDom = document.getElementById('warehouseChart')
  if (!chartDom) return

  warehouseChart = echarts.init(chartDom)
  updateWarehouseChart()
}

// 更新仓库统计图表
const updateWarehouseChart = () => {
  if (!warehouseChart || !warehouseStats.value.length) return

  const names = warehouseStats.value.map(item => item.warehouseName)
  const usageRates = warehouseStats.value.map(item => Number(item.usageRate || 0))

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.5)',
      textStyle: { color: '#fff' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      top: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: names,
      axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
      axisLabel: { 
        color: 'rgba(255, 255, 255, 0.6)', 
        fontSize: 9, 
        rotate: 30,
        interval: 0
      }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLine: { show: false },
      axisLabel: { 
        color: 'rgba(255, 255, 255, 0.6)', 
        fontSize: 9,
        formatter: '{value}%'
      },
      splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.1)' } }
    },
    series: [
      {
        type: 'bar',
        data: usageRates,
        barWidth: '50%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00d4ff' },
            { offset: 1, color: 'rgba(0, 212, 255, 0.3)' }
          ])
        }
      }
    ]
  }

  warehouseChart.setOption(option)
}

// 初始化供应商图表
const initSupplierChart = () => {
  const chartDom = document.getElementById('supplierChart')
  if (!chartDom) return

  supplierChart = echarts.init(chartDom)
  updateSupplierChart()
}

// 更新供应商图表
const updateSupplierChart = () => {
  if (!supplierChart || !topSuppliers.value.length) return

  const data = topSuppliers.value.slice(0, 6).map(item => ({
    name: item.orgName?.length > 6 ? item.orgName.slice(0, 6) + '...' : item.orgName,
    value: item.monthStockInQuantity || 0
  }))

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.5)',
      textStyle: { color: '#fff' }
    },
    grid: {
      left: '3%',
      right: '12%',
      bottom: '3%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 9 },
      splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.1)' } }
    },
    yAxis: {
      type: 'category',
      data: data.map(d => d.name).reverse(),
      axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } },
      axisLabel: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 9 }
    },
    series: [
      {
        type: 'bar',
        data: data.map(d => d.value).reverse(),
        barWidth: '55%',
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(251, 146, 60, 0.3)' },
            { offset: 1, color: '#fb923c' }
          ])
        },
        label: {
          show: true,
          position: 'right',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: 9
        }
      }
    ]
  }

  supplierChart.setOption(option)
}

// 初始化预警统计图表
const initAlertStatsChart = () => {
  const chartDom = document.getElementById('alertStatsChart')
  if (!chartDom) return

  alertStatsChart = echarts.init(chartDom)
  updateAlertStatsChart()
}

// 更新预警统计图表
const updateAlertStatsChart = () => {
  if (!alertStatsChart) return

  const data = [
    { value: stockAlertStats.value.expired, name: t('input.dashboard.stockStatus.expired'), itemStyle: { color: '#ef4444' } },
    { value: stockAlertStats.value.nearExpiry, name: t('input.dashboard.stockStatus.nearExpiry'), itemStyle: { color: '#f59e0b' } },
    { value: stockAlertStats.value.lowStock, name: t('input.dashboard.stockStatus.lowStock'), itemStyle: { color: '#8b5cf6' } },
    { value: stockAlertStats.value.normal, name: t('input.dashboard.stockStatus.normal'), itemStyle: { color: '#22c55e' } }
  ]

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.5)',
      textStyle: { color: '#fff' }
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '75%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: 'rgba(0, 20, 40, 0.8)',
          borderWidth: 2
        },
        label: {
          show: false
        },
        emphasis: {
          label: { show: true, fontSize: 11, fontWeight: 'bold', color: '#fff' }
        },
        data: data
      }
    ]
  }

  alertStatsChart.setOption(option)
}

// 更新所有图表
const updateCharts = () => {
  updateStockTrendChart()
  updateInputDistChart()
  updateWarehouseChart()
  updateSupplierChart()
  updateAlertStatsChart()
}

// 切换趋势天数
const changeTrendDays = async (days) => {
  trendDays.value = days
  try {
    const res = await getStockTrend(days)
    if (res.code === 200) {
      stockTrendData.value = res.data
      updateStockTrendChart()
    }
  } catch (error) {
    console.error('Failed to fetch stock trend:', error)
  }
}

// 窗口大小变化时重新渲染图表
const handleResize = () => {
  stockTrendChart?.resize()
  inputDistChart?.resize()
  warehouseChart?.resize()
  supplierChart?.resize()
  alertStatsChart?.resize()
}

// 切换自动刷新
const toggleAutoRefresh = () => {
  autoRefreshEnabled.value = !autoRefreshEnabled.value
  if (autoRefreshEnabled.value) {
    startAutoRefresh()
  } else {
    stopAutoRefresh()
  }
}

// 启动自动刷新
const startAutoRefresh = () => {
  stopAutoRefresh()
  refreshInterval.value = setInterval(() => {
    fetchAllData()
  }, 30000)
}

// 停止自动刷新
const stopAutoRefresh = () => {
  if (refreshInterval.value) {
    clearInterval(refreshInterval.value)
    refreshInterval.value = null
  }
}

// 预警级别样式
const getWarningLevelClass = (level) => {
  switch (level) {
    case 3: return 'border-l-red-500 bg-red-500/10'
    case 2: return 'border-l-yellow-500 bg-yellow-500/10'
    case 1: return 'border-l-green-500 bg-green-500/10'
    default: return 'border-l-gray-500 bg-gray-500/10'
  }
}

// 预警级别文本
const getWarningLevelText = (level) => {
  switch (level) {
    case 3: return t('input.dashboard.warnings.levels.high')
    case 2: return t('input.dashboard.warnings.levels.medium')
    case 1: return t('input.dashboard.warnings.levels.low')
    default: return ''
  }
}

// 预警类型文本
const getWarningTypeText = (type) => {
  const typeMap = {
    '1': t('input.dashboard.warnings.types.nearExpiry'),
    '2': t('input.dashboard.warnings.types.expired'),
    '3': t('input.dashboard.warnings.types.lowStock'),
    '4': t('input.dashboard.warnings.types.overCapacity')
  }
  return typeMap[type] || ''
}

// 预警级别颜色
const getWarningLevelColor = (level) => {
  switch (level) {
    case 3: return 'text-red-400 bg-red-500/20'
    case 2: return 'text-yellow-400 bg-yellow-500/20'
    case 1: return 'text-green-400 bg-green-500/20'
    default: return 'text-gray-400 bg-gray-500/20'
  }
}

// 监听语言切换，重新渲染图表
watch(locale, () => {
  // 当语言切换时，延迟更新图表以确保 DOM 已更新
  setTimeout(() => {
    updateCharts()
  }, 100)
})

// 生命周期
onMounted(() => {
  updateCurrentTime()
  timeInterval.value = setInterval(updateCurrentTime, 1000)

  fetchAllData()

  setTimeout(() => {
    initStockTrendChart()
    initInputDistChart()
    initWarehouseChart()
    initSupplierChart()
    initAlertStatsChart()
  }, 100)

  window.addEventListener('resize', handleResize)
  document.addEventListener('fullscreenchange', handleFullscreenChange)

  if (autoRefreshEnabled.value) {
    startAutoRefresh()
  }
})

onBeforeUnmount(() => {
  stockTrendChart?.dispose()
  inputDistChart?.dispose()
  warehouseChart?.dispose()
  supplierChart?.dispose()
  alertStatsChart?.dispose()

  window.removeEventListener('resize', handleResize)
  document.removeEventListener('fullscreenchange', handleFullscreenChange)

  stopAutoRefresh()
  if (timeInterval.value) {
    clearInterval(timeInterval.value)
  }
})
</script>

<template>
  <div 
    ref="dashboardRef"
    class="dashboard-container"
  >
    <!-- 背景装饰 -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl"></div>
    </div>

    <!-- 网格背景 -->
    <div class="fixed inset-0 pointer-events-none opacity-20">
      <div class="w-full h-full" style="background-image: linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
    </div>

    <div class="dashboard-content" v-loading="loading">
      <!-- 顶部标题栏 -->
      <header class="dashboard-header">
        <div class="header-inner">
          <!-- 左侧标题 -->
          <div class="header-left">
            <div class="header-icon">
              <div class="icon-box">
                <i class="ri-dashboard-3-line text-xl text-white"></i>
              </div>
              <div class="status-dot"></div>
            </div>
            <div>
              <h1 class="header-title">{{ t('input.dashboard.title') }}</h1>
              <p class="header-subtitle">{{ t('input.dashboard.subtitle') }}</p>
            </div>
          </div>

          <!-- 右侧信息 -->
          <div class="header-right">
            <!-- 当前时间 -->
            <div class="time-box">
              <i class="ri-time-line text-cyan-400"></i>
              <span class="time-text">{{ currentTime }}</span>
            </div>

            <!-- 自动刷新按钮 -->
            <button 
              @click="toggleAutoRefresh"
              class="action-btn"
              :class="autoRefreshEnabled ? 'active' : ''"
            >
              <i :class="autoRefreshEnabled ? 'ri-refresh-line animate-spin' : 'ri-pause-circle-line'"></i>
              <span class="hidden sm:inline">
                {{ autoRefreshEnabled ? t('input.dashboard.autoRefreshOn') : t('input.dashboard.autoRefreshOff') }}
              </span>
            </button>

            <!-- 全屏按钮 -->
            <button 
              @click="toggleFullscreen"
              class="action-btn"
            >
              <i :class="isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'"></i>
            </button>
          </div>
        </div>
      </header>

      <!-- 数据概览卡片 -->
      <section class="stats-grid">
        <!-- 供应商 -->
        <div class="stat-card cyan">
          <div class="stat-header">
            <div class="stat-icon cyan">
              <i class="ri-building-4-line"></i>
            </div>
            <span class="stat-badge green">
              <i class="ri-checkbox-circle-fill"></i>
              {{ overview.certifiedSuppliers || 0 }}
            </span>
          </div>
          <div class="stat-value">{{ formatNumber(overview.totalSuppliers || 0) }}</div>
          <div class="stat-label">{{ t('input.dashboard.overview.totalSuppliers') }}</div>
        </div>

        <!-- 投入品 -->
        <div class="stat-card yellow">
          <div class="stat-header">
            <div class="stat-icon yellow">
              <i class="ri-seedling-line"></i>
            </div>
            <div class="stat-badges">
              <span class="mini-badge yellow">{{ overview.seedInputs || 0 }}</span>
              <span class="mini-badge green">{{ overview.fertilizerInputs || 0 }}</span>
            </div>
          </div>
          <div class="stat-value">{{ formatNumber(overview.totalInputs || 0) }}</div>
          <div class="stat-label">{{ t('input.dashboard.overview.totalInputs') }}</div>
        </div>

        <!-- 仓库 -->
        <div class="stat-card purple">
          <div class="stat-header">
            <div class="stat-icon purple">
              <i class="ri-store-3-line"></i>
            </div>
            <span class="stat-percent">{{ (overview.capacityUsageRate || 0).toFixed(1) }}%</span>
          </div>
          <div class="stat-value">{{ overview.totalWarehouses || 0 }}</div>
          <div class="stat-label">{{ t('input.dashboard.overview.totalWarehouses') }}</div>
        </div>

        <!-- 库存 -->
        <div class="stat-card blue">
          <div class="stat-header">
            <div class="stat-icon blue">
              <i class="ri-archive-line"></i>
            </div>
            <div class="status-dots">
              <span class="dot green" :title="t('input.dashboard.overview.normalStock')"></span>
              <span class="dot yellow" :title="t('input.dashboard.overview.nearExpiryStock')"></span>
              <span class="dot red" :title="t('input.dashboard.overview.expiredStock')"></span>
            </div>
          </div>
          <div class="stat-value">{{ formatNumber(overview.totalStockQuantity || 0) }}</div>
          <div class="stat-label">{{ t('input.dashboard.overview.totalStockQuantity') }}</div>
        </div>

        <!-- 今日业务 -->
        <div class="stat-card emerald">
          <div class="stat-header">
            <div class="stat-icon emerald">
              <i class="ri-calendar-check-line"></i>
            </div>
          </div>
          <div class="stat-value">{{ (overview.todayStockInCount || 0) + (overview.todayStockOutCount || 0) }}</div>
          <div class="stat-label">{{ t('input.dashboard.overview.todayBusiness') }}</div>
          <div class="stat-sub">
            <span class="text-cyan-400">↓{{ overview.todayStockInCount || 0 }}</span>
            <span class="text-yellow-400">↑{{ overview.todayStockOutCount || 0 }}</span>
          </div>
        </div>

        <!-- 预警 -->
        <div class="stat-card red">
          <div class="stat-header">
            <div class="stat-icon red">
              <i class="ri-alarm-warning-line"></i>
            </div>
            <span v-if="overview.pendingWarnings > 0" class="pulse-dot">
              <span class="ping"></span>
              <span class="dot"></span>
            </span>
          </div>
          <div class="stat-value">{{ overview.pendingWarnings || 0 }}</div>
          <div class="stat-label">{{ t('input.dashboard.overview.pendingWarnings') }}</div>
        </div>
      </section>

      <!-- 主内容区域 -->
      <div class="main-grid">
        <!-- 左侧主区域 -->
        <div class="main-left">
          <!-- 趋势图 -->
          <div class="chart-card trend-chart">
            <div class="chart-header">
              <div class="chart-title">
                <div class="title-icon cyan">
                  <i class="ri-line-chart-line"></i>
                </div>
                <h3>{{ t('input.dashboard.stockTrend.title') }}</h3>
              </div>
              <div class="chart-actions">
                <button 
                  @click="changeTrendDays(7)"
                  class="period-btn"
                  :class="{ active: trendDays === 7 }"
                >
                  {{ t('input.dashboard.stockTrend.last7Days') }}
                </button>
                <button 
                  @click="changeTrendDays(30)"
                  class="period-btn"
                  :class="{ active: trendDays === 30 }"
                >
                  {{ t('input.dashboard.stockTrend.last30Days') }}
                </button>
              </div>
            </div>
            <div id="stockTrendChart" class="chart-body"></div>
          </div>

          <!-- 中间四个图表 -->
          <div class="charts-grid">
            <!-- 仓库利用率 -->
            <div class="chart-card">
              <div class="chart-header compact">
                <div class="chart-title small">
                  <div class="title-icon purple small">
                    <i class="ri-bar-chart-box-line"></i>
                  </div>
                  <h3>{{ t('input.dashboard.warehouse.title') }}</h3>
                </div>
              </div>
              <div id="warehouseChart" class="chart-body small"></div>
            </div>

            <!-- 投入品分布 -->
            <div class="chart-card">
              <div class="chart-header compact">
                <div class="chart-title small">
                  <div class="title-icon yellow small">
                    <i class="ri-pie-chart-line"></i>
                  </div>
                  <h3>{{ t('input.dashboard.inputDistribution.title') }}</h3>
                </div>
              </div>
              <div id="inputDistChart" class="chart-body small"></div>
            </div>

            <!-- 供应商排行 -->
            <div class="chart-card">
              <div class="chart-header compact">
                <div class="chart-title small">
                  <div class="title-icon orange small">
                    <i class="ri-trophy-line"></i>
                  </div>
                  <h3>{{ t('input.dashboard.topSuppliers.title') }}</h3>
                </div>
              </div>
              <div id="supplierChart" class="chart-body small"></div>
            </div>

            <!-- 库存预警统计 -->
            <div class="chart-card">
              <div class="chart-header compact">
                <div class="chart-title small">
                  <div class="title-icon red small">
                    <i class="ri-pie-chart-2-line"></i>
                  </div>
                  <h3>{{ t('input.dashboard.stockStatus.title') }}</h3>
                </div>
              </div>
              <div class="chart-body small flex items-center">
                <div id="alertStatsChart" class="w-1/2 h-full"></div>
                <div class="w-1/2 space-y-2 pr-2">
                  <div class="flex items-center justify-between text-xs">
                    <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-red-500"></span>{{ t('input.dashboard.stockStatus.expired') }}</span>
                    <span class="text-red-400 font-medium">{{ stockAlertStats.expired }}</span>
                  </div>
                  <div class="flex items-center justify-between text-xs">
                    <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-amber-500"></span>{{ t('input.dashboard.stockStatus.nearExpiry') }}</span>
                    <span class="text-amber-400 font-medium">{{ stockAlertStats.nearExpiry }}</span>
                  </div>
                  <div class="flex items-center justify-between text-xs">
                    <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-violet-500"></span>{{ t('input.dashboard.stockStatus.lowStock') }}</span>
                    <span class="text-violet-400 font-medium">{{ stockAlertStats.lowStock }}</span>
                  </div>
                  <div class="flex items-center justify-between text-xs">
                    <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-green-500"></span>{{ t('input.dashboard.stockStatus.normal') }}</span>
                    <span class="text-green-400 font-medium">{{ stockAlertStats.normal }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧边栏 -->
        <div class="main-right">
          <!-- 今日出入库记录 -->
          <div class="side-card">
            <div class="side-header">
              <div class="side-title">
                <div class="title-icon emerald small">
                  <i class="ri-exchange-line"></i>
                </div>
                <h3>{{ t('input.dashboard.todayStock.title') }}</h3>
              </div>
              <span class="record-count">{{ recentRecords.length }}</span>
            </div>
            <div class="record-list">
              <div
                v-if="recentRecords.length === 0"
                class="empty-warning"
              >
                <i class="ri-inbox-line"></i>
                <p>{{ t('input.dashboard.todayStock.noData') }}</p>
              </div>
              <div
                v-for="record in recentRecords"
                :key="record.stockRecordId"
                class="record-item"
              >
                <div class="record-type" :class="record.stockType === '1' ? 'in' : 'out'">
                  <i :class="record.stockType === '1' ? 'ri-arrow-down-line' : 'ri-arrow-up-line'"></i>
                </div>
                <div class="record-info">
                  <div class="record-name">{{ record.inputName }}</div>
                  <div class="record-meta">
                    <span>{{ record.warehouseName }}</span>
                    <span>{{ record.stockTime }}</span>
                  </div>
                </div>
                <div class="record-qty" :class="record.stockType === '1' ? 'in' : 'out'">
                  {{ record.stockType === '1' ? '+' : '-' }}{{ record.quantity }}{{ record.unit }}
                </div>
              </div>
            </div>
          </div>

          <!-- 即将过期 -->
          <div class="side-card">
            <div class="side-header">
              <div class="side-title">
                <div class="title-icon amber small">
                  <i class="ri-timer-flash-line"></i>
                </div>
                <h3>{{ t('input.dashboard.expiring.title') }}</h3>
              </div>
              <span class="expire-count">{{ expiringItems.length }}</span>
            </div>
            <div class="expire-list">
              <div
                v-if="expiringItems.length === 0"
                class="empty-warning"
              >
                <i class="ri-check-double-line"></i>
                <p>{{ t('input.dashboard.expiring.noData') }}</p>
              </div>
              <div
                v-for="item in expiringItems"
                :key="item.inputStockId"
                class="expire-item"
              >
                <div class="expire-days" :class="{ urgent: item.daysUntilExpiry <= 5 }">
                  <span v-if="item.daysUntilExpiry < 0">{{ t('input.dashboard.expiring.expired') }}</span>
                  <span v-else>{{ item.daysUntilExpiry }}{{ t('input.dashboard.expiring.days') }}</span>
                </div>
                <div class="expire-info">
                  <div class="expire-name">{{ item.inputName }}</div>
                  <div class="expire-meta">{{ item.warehouseName }} · {{ item.quantity }}{{ item.unit }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 预警列表 -->
          <div class="side-card flex-1">
            <div class="side-header">
              <div class="side-title">
                <div class="title-icon red small">
                  <i class="ri-alarm-warning-line"></i>
                </div>
                <h3>{{ t('input.dashboard.warnings.title') }}</h3>
              </div>
              <span class="warning-count">{{ warnings.length }}</span>
            </div>
            
            <div class="warning-list">
              <div
                v-for="warning in warnings.slice(0, 6)"
                :key="warning.warningId"
                class="warning-item"
                :class="getWarningLevelClass(warning.warningLevel)"
              >
                <div class="warning-header">
                  <span class="warning-type">{{ getWarningTypeText(warning.warningType) }}</span>
                  <span 
                    class="warning-level"
                    :class="getWarningLevelColor(warning.warningLevel)"
                  >
                    {{ getWarningLevelText(warning.warningLevel) }}
                  </span>
                </div>
                <p class="warning-content">{{ warning.warningContent }}</p>
                <div class="warning-footer">
                  <span><i class="ri-store-3-line"></i>{{ warning.warehouseName }}</span>
                  <span>{{ warning.warningTime }}</span>
                </div>
              </div>
              
              <div v-if="warnings.length === 0" class="empty-warning">
                <i class="ri-checkbox-circle-line"></i>
                <p>{{ t('input.dashboard.warnings.noWarnings') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部状态栏 -->
      <footer class="dashboard-footer">
        <div class="footer-left">
          <span><i class="ri-refresh-line text-cyan-400"></i>{{ t('input.dashboard.lastUpdate') }}: {{ lastUpdateTime }}</span>
          <span class="hidden sm:flex"><i class="ri-timer-line text-yellow-400"></i>{{ t('input.dashboard.refreshInterval') }}: 30s</span>
        </div>
        <div class="footer-right">
          <span class="status-indicator">
            <span class="status-dot-small"></span>
            {{ t('input.dashboard.systemStatus') }}
          </span>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%);
  color: white;
  overflow: hidden;
}

.dashboard-content {
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  gap: 12px;
}

/* 头部样式 */
.dashboard-header {
  flex-shrink: 0;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-radius: 12px;
  background: linear-gradient(90deg, rgba(30, 41, 59, 0.5), rgba(30, 41, 59, 0.3), rgba(30, 41, 59, 0.5));
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 212, 255, 0.2);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon {
  position: relative;
}

.icon-box {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: linear-gradient(135deg, #22d3ee, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(34, 211, 238, 0.3);
}

.status-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 10px;
  height: 10px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.header-title {
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(90deg, #22d3ee, #3b82f6, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-subtitle {
  font-size: 12px;
  color: rgba(148, 163, 184, 0.8);
  margin-top: 2px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.time-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 10px;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(51, 65, 85, 0.5);
}

.time-text {
  font-size: 13px;
  font-family: 'JetBrains Mono', monospace;
  color: rgba(203, 213, 225, 0.9);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(51, 65, 85, 0.5);
  color: rgba(148, 163, 184, 0.9);
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:hover {
  background: rgba(51, 65, 85, 0.5);
  border-color: rgba(0, 212, 255, 0.5);
  color: #22d3ee;
}

.action-btn.active {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2));
  border-color: rgba(34, 197, 94, 0.5);
  color: #22c55e;
}

/* 统计卡片网格 */
.stats-grid {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
}

.stat-card {
  position: relative;
  padding: 14px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(30, 41, 59, 0.3));
  backdrop-filter: blur(12px);
  border: 1px solid rgba(51, 65, 85, 0.5);
  transition: all 0.3s;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.3s;
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-card.cyan::before { background: linear-gradient(135deg, rgba(34, 211, 238, 0.1), transparent); }
.stat-card.yellow::before { background: linear-gradient(135deg, rgba(250, 204, 21, 0.1), transparent); }
.stat-card.purple::before { background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), transparent); }
.stat-card.blue::before { background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent); }
.stat-card.emerald::before { background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), transparent); }
.stat-card.red::before { background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), transparent); }

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.3);
}

.stat-card.cyan:hover { border-color: rgba(34, 211, 238, 0.5); }
.stat-card.yellow:hover { border-color: rgba(250, 204, 21, 0.5); }
.stat-card.purple:hover { border-color: rgba(168, 85, 247, 0.5); }
.stat-card.blue:hover { border-color: rgba(59, 130, 246, 0.5); }
.stat-card.emerald:hover { border-color: rgba(16, 185, 129, 0.5); }
.stat-card.red:hover { border-color: rgba(239, 68, 68, 0.5); }

.stat-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.stat-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.stat-icon.cyan { background: rgba(34, 211, 238, 0.2); color: #22d3ee; }
.stat-icon.yellow { background: rgba(250, 204, 21, 0.2); color: #facc15; }
.stat-icon.purple { background: rgba(168, 85, 247, 0.2); color: #a855f7; }
.stat-icon.blue { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
.stat-icon.emerald { background: rgba(16, 185, 129, 0.2); color: #10b981; }
.stat-icon.red { background: rgba(239, 68, 68, 0.2); color: #ef4444; }

.stat-badge {
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 3px;
}

.stat-badge.green { color: #22c55e; }

.stat-badges {
  display: flex;
  gap: 4px;
}

.mini-badge {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
}

.mini-badge.yellow { background: rgba(250, 204, 21, 0.2); color: #facc15; }
.mini-badge.green { background: rgba(34, 197, 94, 0.2); color: #22c55e; }

.stat-percent {
  font-size: 11px;
  color: #a855f7;
}

.status-dots {
  display: flex;
  gap: 4px;
}

.status-dots .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot.green { background: #22c55e; }
.dot.yellow { background: #facc15; }
.dot.red { background: #ef4444; }

.stat-value {
  position: relative;
  font-size: 26px;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
}

.stat-label {
  position: relative;
  font-size: 11px;
  color: rgba(148, 163, 184, 0.8);
}

.stat-sub {
  position: relative;
  display: flex;
  gap: 10px;
  margin-top: 6px;
  font-size: 11px;
}

.pulse-dot {
  position: relative;
  width: 8px;
  height: 8px;
}

.pulse-dot .ping {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #ef4444;
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.pulse-dot .dot {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
}

/* 主内容区域 */
.main-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 12px;
  min-height: 0;
}

.main-left {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
}

.main-right {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
}

/* 图表卡片 */
.chart-card {
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(30, 41, 59, 0.3));
  backdrop-filter: blur(12px);
  border: 1px solid rgba(51, 65, 85, 0.5);
  overflow: hidden;
}

.trend-chart {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  padding: 14px;
}

.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  flex-shrink: 0;
}

.chart-header.compact {
  padding: 10px 14px;
  margin-bottom: 0;
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
}

.chart-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chart-title h3 {
  font-size: 14px;
  font-weight: 600;
  color: white;
}

.chart-title.small h3 {
  font-size: 12px;
}

.title-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.title-icon.small {
  width: 26px;
  height: 26px;
  font-size: 13px;
}

.title-icon.cyan { background: linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(59, 130, 246, 0.2)); color: #22d3ee; }
.title-icon.purple { background: rgba(168, 85, 247, 0.2); color: #a855f7; }
.title-icon.yellow { background: rgba(250, 204, 21, 0.2); color: #facc15; }
.title-icon.orange { background: rgba(251, 146, 60, 0.2); color: #fb923c; }
.title-icon.red { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
.title-icon.emerald { background: rgba(16, 185, 129, 0.2); color: #10b981; }
.title-icon.amber { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }

.chart-actions {
  display: flex;
  gap: 6px;
}

.period-btn {
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  background: rgba(51, 65, 85, 0.5);
  color: rgba(148, 163, 184, 0.9);
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.period-btn:hover {
  background: rgba(51, 65, 85, 0.8);
  color: white;
}

.period-btn.active {
  background: linear-gradient(135deg, #22d3ee, #3b82f6);
  color: white;
  box-shadow: 0 4px 12px rgba(34, 211, 238, 0.3);
}

.chart-body {
  flex: 1;
  min-height: 0;
}

.chart-body.small {
  height: 100%;
  padding: 8px;
}

/* 图表网格 */
.charts-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  min-height: 0;
}

.charts-grid .chart-card {
  display: flex;
  flex-direction: column;
}

.charts-grid .chart-body {
  flex: 1;
}

/* 侧边卡片 */
.side-card {
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(30, 41, 59, 0.3));
  backdrop-filter: blur(12px);
  border: 1px solid rgba(51, 65, 85, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.side-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
  flex-shrink: 0;
}

.side-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.side-title h3 {
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.record-count, .expire-count, .warning-count {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
}

.record-count {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.expire-count {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.warning-count {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

/* 记录列表 */
.record-list {
  padding: 8px;
  overflow-y: auto;
  flex: 1;
}

.record-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 8px;
  background: rgba(30, 41, 59, 0.3);
  margin-bottom: 6px;
  transition: all 0.2s;
}

.record-item:hover {
  background: rgba(30, 41, 59, 0.5);
}

.record-type {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

.record-type.in {
  background: rgba(34, 211, 238, 0.2);
  color: #22d3ee;
}

.record-type.out {
  background: rgba(250, 204, 21, 0.2);
  color: #facc15;
}

.record-info {
  flex: 1;
  min-width: 0;
}

.record-name {
  font-size: 11px;
  font-weight: 500;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.record-meta {
  display: flex;
  gap: 8px;
  font-size: 10px;
  color: rgba(148, 163, 184, 0.7);
  margin-top: 2px;
}

.record-qty {
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
}

.record-qty.in { color: #22d3ee; }
.record-qty.out { color: #facc15; }

/* 过期列表 */
.expire-list {
  padding: 8px;
  overflow-y: auto;
  flex: 1;
}

.expire-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 8px;
  background: rgba(30, 41, 59, 0.3);
  margin-bottom: 6px;
}

.expire-days {
  width: 40px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
  flex-shrink: 0;
}

.expire-days.urgent {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  animation: pulse 2s infinite;
}

.expire-info {
  flex: 1;
  min-width: 0;
}

.expire-name {
  font-size: 11px;
  font-weight: 500;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.expire-meta {
  font-size: 10px;
  color: rgba(148, 163, 184, 0.7);
  margin-top: 2px;
}

/* 预警列表 */
.warning-list {
  padding: 8px;
  overflow-y: auto;
  flex: 1;
}

.warning-item {
  padding: 10px;
  border-radius: 8px;
  border-left: 3px solid;
  margin-bottom: 8px;
  transition: all 0.2s;
}

.warning-item:hover {
  transform: translateX(2px);
}

.warning-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.warning-type {
  font-size: 11px;
  font-weight: 500;
  color: white;
}

.warning-level {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.warning-content {
  font-size: 10px;
  color: rgba(148, 163, 184, 0.8);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 6px;
  line-height: 1.4;
}

.warning-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  color: rgba(100, 116, 139, 0.8);
}

.warning-footer i {
  margin-right: 3px;
}

.empty-warning {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  color: rgba(100, 116, 139, 0.6);
}

.empty-warning i {
  font-size: 36px;
  margin-bottom: 8px;
  color: rgba(34, 197, 94, 0.3);
}

.empty-warning p {
  font-size: 12px;
}

/* 底部状态栏 */
.dashboard-footer {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-radius: 10px;
  background: rgba(30, 41, 59, 0.3);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(51, 65, 85, 0.3);
}

.footer-left, .footer-right {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 11px;
  color: rgba(100, 116, 139, 0.8);
}

.footer-left span, .footer-right span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot-small {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 2s infinite;
}

/* 自定义滚动条 */
.record-list::-webkit-scrollbar,
.expire-list::-webkit-scrollbar,
.warning-list::-webkit-scrollbar {
  width: 4px;
}

.record-list::-webkit-scrollbar-track,
.expire-list::-webkit-scrollbar-track,
.warning-list::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

.record-list::-webkit-scrollbar-thumb,
.expire-list::-webkit-scrollbar-thumb,
.warning-list::-webkit-scrollbar-thumb {
  background: rgba(0, 212, 255, 0.3);
  border-radius: 2px;
}

.record-list::-webkit-scrollbar-thumb:hover,
.expire-list::-webkit-scrollbar-thumb:hover,
.warning-list::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 212, 255, 0.5);
}

/* 动画 */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* 响应式适配 */
@media (max-width: 1400px) {
  .charts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .main-grid {
    grid-template-columns: 1fr 280px;
  }
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .main-grid {
    grid-template-columns: 1fr;
  }
  
  .main-right {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: auto;
  }
  
  .side-card {
    max-height: 250px;
  }
}

@media (max-width: 768px) {
  .dashboard-content {
    padding: 8px;
    gap: 8px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .main-right {
    grid-template-columns: 1fr;
  }
}

/* 全屏样式 */
:fullscreen .dashboard-container {
  background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%);
    width: 100vw;
  height: 100vh;
}
</style>