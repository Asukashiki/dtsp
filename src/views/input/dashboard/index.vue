<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import * as echarts from 'echarts'
import {
  getAllDashboardData,
  getDashboardOverview,
  getDemandSummary,
  getAllocationProgress,
  getCirculationStatus,
  getTopSuppliers,
  getRecentActivities
} from '@/api/inputDashboard'

const { t, locale } = useI18n()

// 数据状态
const overview = ref({})
const demandByType = ref([])
const demandByRegion = ref([])
const allocationProgress = ref({})
const circulationStatus = ref({})
const topSuppliers = ref([])
const recentActivities = ref([])
const loading = ref(false)
const lastUpdateTime = ref('')
const currentTime = ref('')
const selectedYear = ref(new Date().getFullYear().toString())

// 年份选项
const yearOptions = computed(() => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 5 }, (_, i) => (currentYear - i).toString())
})

// 全屏控制
const isFullscreen = ref(false)
const dashboardRef = ref(null)

// 自动刷新控制
const autoRefreshEnabled = ref(true)
const refreshInterval = ref(null)
const timeInterval = ref(null)

// Chart实例
let demandTypeChart = null
let demandRegionChart = null
let allocationChart = null
let circulationChart = null
let supplierChart = null

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
  if (num === null || num === undefined) return '0'
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toLocaleString()
}

// 格式化百分比
const formatPercent = (num) => {
  if (num === null || num === undefined) return '0%'
  return Number(num).toFixed(1) + '%'
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

    const res = await getAllDashboardData(selectedYear.value)
    
    if (res.code === 200 && res.data) {
      overview.value = res.data.overview || {}
      demandByType.value = res.data.demandSummaryByType || []
      demandByRegion.value = res.data.demandSummaryByRegion || []
      allocationProgress.value = res.data.allocationProgress || {}
      circulationStatus.value = res.data.circulationStatus || {}
      topSuppliers.value = res.data.topSuppliers || []
      recentActivities.value = res.data.recentActivities || []
    }

    lastUpdateTime.value = formatTime()
    updateCharts()
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  } finally {
    loading.value = false
  }
}

// 初始化需求类型分布图表
const initDemandTypeChart = () => {
  const chartDom = document.getElementById('demandTypeChart')
  if (!chartDom) return

  demandTypeChart = echarts.init(chartDom)
  updateDemandTypeChart()
}

// 更新需求类型分布图表
const updateDemandTypeChart = () => {
  if (!demandTypeChart || !demandByType.value.length) return

  const data = demandByType.value.map(item => ({
    name: item.inputTypeDesc || item.inputType,
    value: Number(item.demandQuantity) || 0
  }))

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: 'rgba(0, 154, 68, 0.5)',
      textStyle: { color: '#fff' }
    },
    legend: {
      orient: 'vertical',
      right: '2%',
      top: 'center',
      textStyle: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 11 },
      itemGap: 10,
      itemWidth: 12,
      itemHeight: 12
    },
    series: [
      {
        type: 'pie',
        radius: ['35%', '60%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: 'rgba(0, 20, 40, 0.8)',
          borderWidth: 2
        },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 12, fontWeight: 'bold', color: '#fff' },
          itemStyle: { shadowBlur: 20, shadowColor: 'rgba(0, 154, 68, 0.5)' }
        },
        data: data,
        color: ['#009A44', '#FEDD00', '#DA121A', '#3b82f6', '#a855f7', '#f59e0b']
      }
    ]
  }

  demandTypeChart.setOption(option)
}

// 初始化需求地区分布图表
const initDemandRegionChart = () => {
  const chartDom = document.getElementById('demandRegionChart')
  if (!chartDom) return

  demandRegionChart = echarts.init(chartDom)
  updateDemandRegionChart()
}

// 更新需求地区分布图表
const updateDemandRegionChart = () => {
  if (!demandRegionChart || !demandByRegion.value.length) return

  const names = demandByRegion.value.slice(0, 8).map(item => 
    (item.regionName || '').length > 10 ? (item.regionName || '').slice(0, 10) + '...' : (item.regionName || '')
  )
  const quantities = demandByRegion.value.slice(0, 8).map(item => Number(item.demandQuantity) || 0)

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: 'rgba(0, 154, 68, 0.5)',
      textStyle: { color: '#fff' }
    },
    grid: {
      left: '3%',
      right: '10%',
      bottom: '3%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(0, 154, 68, 0.1)' } }
    },
    yAxis: {
      type: 'category',
      data: names.reverse(),
      axisLine: { lineStyle: { color: 'rgba(0, 154, 68, 0.3)' } },
      axisLabel: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 10 }
    },
    series: [
      {
        type: 'bar',
        data: quantities.reverse(),
        barWidth: '50%',
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(0, 154, 68, 0.3)' },
            { offset: 1, color: '#009A44' }
          ])
        },
        label: {
          show: true,
          position: 'right',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: 10
        }
      }
    ]
  }

  demandRegionChart.setOption(option)
}

// 初始化分配进度图表
const initAllocationChart = () => {
  const chartDom = document.getElementById('allocationChart')
  if (!chartDom) return

  allocationChart = echarts.init(chartDom)
  updateAllocationChart()
}

// 更新分配进度图表
const updateAllocationChart = () => {
  if (!allocationChart) return

  const data = [
    { name: 'Zone', value: Number(allocationProgress.value.zoneCompletionRate) || 0 },
    { name: 'Woreda', value: Number(allocationProgress.value.woredaCompletionRate) || 0 },
    { name: 'Kebele', value: Number(allocationProgress.value.kebeleCompletionRate) || 0 },
    { name: 'Farmer', value: Number(allocationProgress.value.farmerCompletionRate) || 0 }
  ]

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c}%',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: 'rgba(254, 221, 0, 0.5)',
      textStyle: { color: '#fff' }
    },
    grid: {
      left: '3%',
      right: '6%',
      bottom: '12%',
      top: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(d => d.name),
      axisLine: { lineStyle: { color: 'rgba(254, 221, 0, 0.3)' } },
      axisLabel: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLine: { show: false },
      axisLabel: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 10, formatter: '{value}%' },
      splitLine: { lineStyle: { color: 'rgba(254, 221, 0, 0.1)' } }
    },
    series: [
      {
        type: 'bar',
        data: data.map(d => d.value),
        barWidth: '45%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#FEDD00' },
            { offset: 1, color: 'rgba(254, 221, 0, 0.3)' }
          ])
        },
        label: {
          show: true,
          position: 'top',
          color: '#FEDD00',
          fontSize: 11,
          formatter: '{c}%'
        }
      }
    ]
  }

  allocationChart.setOption(option)
}

// 初始化流通状态图表
const initCirculationChart = () => {
  const chartDom = document.getElementById('circulationChart')
  if (!chartDom) return

  circulationChart = echarts.init(chartDom)
  updateCirculationChart()
}

// 更新流通状态图表
const updateCirculationChart = () => {
  if (!circulationChart) return

  const cs = circulationStatus.value
  const data = [
    { name: 'OSE Distributed', value: Number(cs.oseDistributedQuantity) || 0, color: '#009A44' },
    { name: 'Union Received', value: Number(cs.unionReceivedQuantity) || 0, color: '#10b981' },
    { name: 'Woreda Received', value: Number(cs.woredaReceivedQuantity) || 0, color: '#FEDD00' },
    { name: 'Farmer Received', value: Number(cs.farmerReceivedQuantity) || 0, color: '#DA121A' }
  ]

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: 'rgba(218, 18, 26, 0.5)',
      textStyle: { color: '#fff' }
    },
    legend: {
      data: data.map(d => d.name),
      textStyle: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 10 },
      top: 0,
      itemGap: 15
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '18%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Flow Status'],
      axisLine: { show: false },
      axisLabel: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(218, 18, 26, 0.1)' } }
    },
    series: data.map(d => ({
      name: d.name,
      type: 'bar',
      data: [d.value],
      barWidth: 35,
      itemStyle: {
        color: d.color,
        borderRadius: [4, 4, 0, 0]
      }
    }))
  }

  circulationChart.setOption(option)
}

// 初始化供应商排行图表
const initSupplierChart = () => {
  const chartDom = document.getElementById('supplierChart')
  if (!chartDom) return

  supplierChart = echarts.init(chartDom)
  updateSupplierChart()
}

// 更新供应商排行图表
const updateSupplierChart = () => {
  if (!supplierChart || !topSuppliers.value.length) return

  const data = topSuppliers.value.slice(0, 6).map(item => ({
    name: (item.orgName || '').length > 12 ? (item.orgName || '').slice(0, 12) + '...' : (item.orgName || ''),
    value: Number(item.totalDistributed) || 0
  }))

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: 'rgba(0, 154, 68, 0.5)',
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
      splitLine: { lineStyle: { color: 'rgba(0, 154, 68, 0.1)' } }
    },
    yAxis: {
      type: 'category',
      data: data.map(d => d.name).reverse(),
      axisLine: { lineStyle: { color: 'rgba(0, 154, 68, 0.3)' } },
      axisLabel: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 10 }
    },
    series: [
      {
        type: 'bar',
        data: data.map(d => d.value).reverse(),
        barWidth: '50%',
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(0, 154, 68, 0.3)' },
            { offset: 1, color: '#009A44' }
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

// 更新所有图表
const updateCharts = () => {
  updateDemandTypeChart()
  updateDemandRegionChart()
  updateAllocationChart()
  updateCirculationChart()
  updateSupplierChart()
}

// 窗口大小变化时重新渲染图表
const handleResize = () => {
  demandTypeChart?.resize()
  demandRegionChart?.resize()
  allocationChart?.resize()
  circulationChart?.resize()
  supplierChart?.resize()
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
  }, 60000) // 每分钟刷新
}

// 停止自动刷新
const stopAutoRefresh = () => {
  if (refreshInterval.value) {
    clearInterval(refreshInterval.value)
    refreshInterval.value = null
  }
}

// 年份变化
const handleYearChange = () => {
  fetchAllData()
}

// 获取活动类型样式
const getActivityTypeClass = (type) => {
  switch (type) {
    case 'allocation': return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'distribution': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    case 'receive': return 'bg-red-500/20 text-red-400 border-red-500/30'
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}

// 格式化活动时间
const formatActivityTime = (time) => {
  if (!time) return ''
  const d = new Date(time)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${month}-${day} ${hours}:${minutes}`
}

// 监听语言切换，重新渲染图表
watch(locale, () => {
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
    initDemandTypeChart()
    initDemandRegionChart()
    initAllocationChart()
    initCirculationChart()
    initSupplierChart()
  }, 100)

  window.addEventListener('resize', handleResize)
  document.addEventListener('fullscreenchange', handleFullscreenChange)

  if (autoRefreshEnabled.value) {
    startAutoRefresh()
  }
})

onBeforeUnmount(() => {
  demandTypeChart?.dispose()
  demandRegionChart?.dispose()
  allocationChart?.dispose()
  circulationChart?.dispose()
  supplierChart?.dispose()

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
    <div class="overflow-hidden fixed inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl bg-green-500/10"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl bg-yellow-500/10"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-3xl"></div>
    </div>

    <!-- 网格背景 -->
    <div class="fixed inset-0 opacity-20 pointer-events-none">
      <div class="w-full h-full" style="background-image: linear-gradient(rgba(0, 154, 68, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 154, 68, 0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
    </div>

    <div class="dashboard-content" v-loading="loading">
      <!-- 顶部标题栏 -->
      <header class="dashboard-header">
        <div class="header-inner">
          <!-- 左侧标题 -->
          <div class="header-left">
            <div class="header-icon">
              <div class="icon-box">
                <i class="text-xl text-white ri-dashboard-3-line"></i>
              </div>
              <div class="status-dot"></div>
            </div>
            <div>
              <h1 class="header-title">{{ t('input.dashboard.title') }}</h1>
              <p class="header-subtitle">{{ t('input.dashboard.subtitle') }}</p>
            </div>
          </div>

          <!-- 右侧控制 -->
          <div class="header-right">
            <!-- 年份选择 -->
            <el-select 
              v-model="selectedYear" 
              @change="handleYearChange"
              class="year-select"
              size="small"
            >
              <el-option 
                v-for="year in yearOptions" 
                :key="year" 
                :label="year" 
                :value="year" 
              />
            </el-select>

            <!-- 当前时间 -->
            <div class="time-box">
              <i class="text-green-400 ri-time-line"></i>
              <span class="time-text">{{ currentTime }}</span>
            </div>

            <!-- 自动刷新按钮 -->
            <button 
              @click="toggleAutoRefresh"
              class="action-btn"
              :class="autoRefreshEnabled ? 'active' : ''"
            >
              <i :class="autoRefreshEnabled ? 'ri-refresh-line animate-spin' : 'ri-pause-circle-line'"></i>
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
        <!-- 需求总数 -->
        <div class="stat-card green">
          <div class="stat-header">
            <div class="stat-icon green">
              <i class="ri-file-list-3-line"></i>
            </div>
          </div>
          <div class="stat-value">{{ formatNumber(overview.totalDemands || 0) }}</div>
          <div class="stat-label">{{ t('input.dashboard.overview.totalDemands') }}</div>
          <div class="stat-sub">
            <span class="text-green-400">{{ t('input.dashboard.overview.allocated') }}: {{ overview.allocatedDemands || 0 }}</span>
          </div>
        </div>

        <!-- 需求满足率 -->
        <div class="stat-card yellow">
          <div class="stat-header">
            <div class="stat-icon yellow">
              <i class="ri-checkbox-circle-line"></i>
            </div>
          </div>
          <div class="stat-value">{{ formatPercent(overview.demandSatisfactionRate) }}</div>
          <div class="stat-label">{{ t('input.dashboard.overview.satisfactionRate') }}</div>
        </div>

        <!-- 分配完成率 -->
        <div class="stat-card blue">
          <div class="stat-header">
            <div class="stat-icon blue">
              <i class="ri-git-branch-line"></i>
            </div>
          </div>
          <div class="stat-value">{{ formatPercent(overview.allocationCompletionRate) }}</div>
          <div class="stat-label">{{ t('input.dashboard.overview.allocationRate') }}</div>
        </div>

        <!-- 流通到达率 -->
        <div class="stat-card red">
          <div class="stat-header">
            <div class="stat-icon red">
              <i class="ri-truck-line"></i>
            </div>
          </div>
          <div class="stat-value">{{ formatPercent(overview.circulationArrivalRate) }}</div>
          <div class="stat-label">{{ t('input.dashboard.overview.arrivalRate') }}</div>
        </div>

        <!-- 认证供应商 -->
        <div class="stat-card purple">
          <div class="stat-header">
            <div class="stat-icon purple">
              <i class="ri-building-4-line"></i>
            </div>
            <span class="stat-badge">
              <i class="ri-time-line"></i>
              {{ overview.pendingSuppliers || 0 }}
            </span>
          </div>
          <div class="stat-value">{{ overview.certifiedSuppliers || 0 }}</div>
          <div class="stat-label">{{ t('input.dashboard.overview.certifiedSuppliers') }}</div>
        </div>

        <!-- 活跃仓库 -->
        <div class="stat-card emerald">
          <div class="stat-header">
            <div class="stat-icon emerald">
              <i class="ri-store-3-line"></i>
            </div>
          </div>
          <div class="stat-value">{{ overview.activeWarehouses || 0 }}</div>
          <div class="stat-label">{{ t('input.dashboard.overview.activeWarehouses') }}</div>
        </div>
      </section>

      <!-- 主内容区域 -->
      <div class="main-grid">
        <!-- 左侧主区域 -->
        <div class="main-left">
          <!-- 上面两个图表 -->
          <div class="charts-row">
            <!-- 需求类型分布 -->
            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-title">
                  <div class="title-icon green">
                    <i class="ri-pie-chart-line"></i>
                  </div>
                  <h3>{{ t('input.dashboard.demandByType.title') }}</h3>
                </div>
              </div>
              <div id="demandTypeChart" class="chart-body"></div>
            </div>

            <!-- 分配进度 -->
            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-title">
                  <div class="title-icon yellow">
                    <i class="ri-bar-chart-grouped-line"></i>
                  </div>
                  <h3>{{ t('input.dashboard.allocationProgress.title') }}</h3>
                </div>
                <span class="overall-rate">
                  {{ t('input.dashboard.allocationProgress.overall') }}: {{ formatPercent(allocationProgress.overallCompletionRate) }}
                </span>
              </div>
              <div id="allocationChart" class="chart-body"></div>
            </div>
          </div>

          <!-- 下面两个图表 -->
          <div class="charts-row">
            <!-- 需求地区分布 -->
            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-title">
                  <div class="title-icon blue">
                    <i class="ri-bar-chart-horizontal-line"></i>
                  </div>
                  <h3>{{ t('input.dashboard.demandByRegion.title') }}</h3>
                </div>
              </div>
              <div id="demandRegionChart" class="chart-body"></div>
            </div>

            <!-- 流通状态 -->
            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-title">
                  <div class="title-icon red">
                    <i class="ri-flow-chart"></i>
                  </div>
                  <h3>{{ t('input.dashboard.circulation.title') }}</h3>
                </div>
              </div>
              <div id="circulationChart" class="chart-body"></div>
            </div>
          </div>
        </div>

        <!-- 右侧边栏 -->
        <div class="main-right">
          <!-- 供应商排行 -->
          <div class="side-card">
            <div class="side-header">
              <div class="side-title">
                <div class="title-icon green small">
                  <i class="ri-trophy-line"></i>
                </div>
                <h3>{{ t('input.dashboard.topSuppliers.title') }}</h3>
              </div>
              <span class="record-count">{{ topSuppliers.length }}</span>
            </div>
            <div id="supplierChart" class="chart-body-side"></div>
          </div>

          <!-- 最新动态 -->
          <div class="side-card flex-1">
            <div class="side-header">
              <div class="side-title">
                <div class="title-icon yellow small">
                  <i class="ri-history-line"></i>
                </div>
                <h3>{{ t('input.dashboard.recentActivities.title') }}</h3>
              </div>
              <span class="record-count">{{ recentActivities.length }}</span>
            </div>
            <div class="activity-list">
              <div
                v-if="recentActivities.length === 0"
                class="empty-state"
              >
                <i class="ri-inbox-line"></i>
                <p>{{ t('input.dashboard.recentActivities.noData') }}</p>
              </div>
              <div
                v-for="activity in recentActivities.slice(0, 8)"
                :key="activity.id"
                class="activity-item"
              >
                <div class="activity-type" :class="getActivityTypeClass(activity.activityType)">
                  {{ activity.activityTypeDesc }}
                </div>
                <div class="activity-info">
                  <div class="activity-name">{{ activity.inputName || '-' }}</div>
                  <div class="activity-meta">
                    <span>{{ activity.source }} → {{ activity.target }}</span>
                    <span>{{ activity.quantity }} {{ activity.unit }}</span>
                  </div>
                </div>
                <div class="activity-time">{{ formatActivityTime(activity.activityTime) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部状态栏 -->
      <footer class="dashboard-footer">
        <div class="footer-left">
          <span><i class="text-green-400 ri-refresh-line"></i>{{ t('input.dashboard.lastUpdate') }}: {{ lastUpdateTime }}</span>
          <span class="hidden sm:flex"><i class="text-yellow-400 ri-timer-line"></i>{{ t('input.dashboard.refreshInterval') }}: 60s</span>
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
  border: 1px solid rgba(0, 154, 68, 0.2);
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
  background: linear-gradient(135deg, #009A44, #10b981);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 154, 68, 0.3);
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
  background: linear-gradient(90deg, #009A44, #FEDD00, #DA121A);
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

.year-select {
  width: 100px;
}

.year-select :deep(.el-input__wrapper) {
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 8px;
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
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(51, 65, 85, 0.5);
  color: rgba(148, 163, 184, 0.9);
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:hover {
  background: rgba(51, 65, 85, 0.5);
  border-color: rgba(0, 154, 68, 0.5);
  color: #009A44;
}

.action-btn.active {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.2), rgba(16, 185, 129, 0.2));
  border-color: rgba(0, 154, 68, 0.5);
  color: #009A44;
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

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.3);
}

.stat-card.green:hover { border-color: rgba(0, 154, 68, 0.5); }
.stat-card.yellow:hover { border-color: rgba(254, 221, 0, 0.5); }
.stat-card.blue:hover { border-color: rgba(59, 130, 246, 0.5); }
.stat-card.red:hover { border-color: rgba(218, 18, 26, 0.5); }
.stat-card.purple:hover { border-color: rgba(168, 85, 247, 0.5); }
.stat-card.emerald:hover { border-color: rgba(16, 185, 129, 0.5); }

.stat-header {
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

.stat-icon.green { background: rgba(0, 154, 68, 0.2); color: #009A44; }
.stat-icon.yellow { background: rgba(254, 221, 0, 0.2); color: #FEDD00; }
.stat-icon.blue { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
.stat-icon.red { background: rgba(218, 18, 26, 0.2); color: #DA121A; }
.stat-icon.purple { background: rgba(168, 85, 247, 0.2); color: #a855f7; }
.stat-icon.emerald { background: rgba(16, 185, 129, 0.2); color: #10b981; }

.stat-badge {
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 3px;
  color: #f59e0b;
}

.stat-value {
  font-size: 26px;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 11px;
  color: rgba(148, 163, 184, 0.8);
}

.stat-sub {
  display: flex;
  gap: 10px;
  margin-top: 6px;
  font-size: 11px;
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

.charts-row {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  display: flex;
  flex-direction: column;
  padding: 12px;
}

.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  flex-shrink: 0;
}

.chart-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chart-title h3 {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.title-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.title-icon.green { background: rgba(0, 154, 68, 0.2); color: #009A44; }
.title-icon.yellow { background: rgba(254, 221, 0, 0.2); color: #FEDD00; }
.title-icon.blue { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
.title-icon.red { background: rgba(218, 18, 26, 0.2); color: #DA121A; }
.title-icon.small {
  width: 24px;
  height: 24px;
  font-size: 12px;
}

.overall-rate {
  font-size: 11px;
  color: #FEDD00;
  padding: 4px 8px;
  background: rgba(254, 221, 0, 0.1);
  border-radius: 4px;
}

.chart-body {
  flex: 1;
  min-height: 150px;
}

/* 侧边卡片 */
.side-card {
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(30, 41, 59, 0.3));
  backdrop-filter: blur(12px);
  border: 1px solid rgba(51, 65, 85, 0.5);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 12px;
}

.side-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
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
  color: rgba(255, 255, 255, 0.9);
}

.record-count {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(0, 154, 68, 0.2);
  color: #009A44;
}

.chart-body-side {
  height: 160px;
}

/* 活动列表 */
.activity-list {
  flex: 1;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-type {
  font-size: 9px;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid;
  white-space: nowrap;
}

.activity-info {
  flex: 1;
  min-width: 0;
}

.activity-name {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.activity-meta {
  font-size: 10px;
  color: rgba(148, 163, 184, 0.7);
  display: flex;
  gap: 6px;
}

.activity-time {
  font-size: 10px;
  color: rgba(148, 163, 184, 0.6);
  white-space: nowrap;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  color: rgba(148, 163, 184, 0.5);
}

.empty-state i {
  font-size: 32px;
  margin-bottom: 10px;
}

.empty-state p {
  font-size: 12px;
}

/* 底部状态栏 */
.dashboard-footer {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: rgba(30, 41, 59, 0.3);
  border-radius: 8px;
  font-size: 11px;
  color: rgba(148, 163, 184, 0.7);
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.footer-left span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.footer-right {
  display: flex;
  align-items: center;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot-small {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 2s linear infinite;
}

/* 响应式 */
@media (max-width: 1280px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .main-grid {
    grid-template-columns: 1fr;
  }
  
  .main-right {
    flex-direction: row;
  }
  
  .side-card {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .charts-row {
    grid-template-columns: 1fr;
  }
  
  .main-right {
    flex-direction: column;
  }
}
</style>