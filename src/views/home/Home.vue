<template>
  <div class="home-container">
    <div class="content-container" v-loading="loading" >
      <div class="top-section-layout">
        <!-- 系统公告部分 -->
        <div class="section-container announcement-section">
          <div class="section-header">
            <div class="section-title">
              <img src="../../assets/Title.svg" alt="Title" class="title-icon">
              <span>系统公告</span>
            </div>
            <div class="more-link" @click="handleMoreAnnouncements('systemAnnouncement')">查看更多 ></div>
          </div>
          <div class="announcement-list">
            <div 
              v-for="(item, index) in announcementList" 
              :key="index" 
              class="announcement-item"
              @click="handleAnnouncementClick(item)"
            >
              <div class="item-icon">
                <i class="ri-notification-3-line"></i>
              </div>
              <div class="item-content">
                <div class="item-title">{{ item.name }}</div>
                <div class="item-desc">{{ item.content }}</div>
              </div>
              <div class="item-time">{{ item.publicTime }}</div>
            </div>
          </div>
        </div>
      
        <!-- 常用系统部分 -->
        <div class="section-container common-systems-section">
          <div class="section-header common-systems-header">
            <div class="section-title">
              <img src="../../assets/Title_white.svg" alt="Title" class="title-icon">
              <span>常用系统</span>
            </div>
          </div>
          <div class="common-system-content">
            <div 
              v-for="(entry, index) in systemEntries.slice(0, 6)" 
              :key="index" 
              class="common-system-item"
              @click="handleSystemEntryClick(entry)"
            >
              <div class="common-system-icon" :style="{ backgroundColor: entry.iconBg || '#1c59e2' }">
                <i :class="getIconClass(entry.icon)"></i>
              </div>
              <div class="common-system-name">{{ entry.name }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 系统入口部分 -->
      <div class="section-container system-entries-section">
        <div class="section-header">
          <div class="section-title">
            <img src="../../assets/Title.svg" alt="Title" class="title-icon">
            <span>系统入口</span>
          </div>
        </div>
        <div class="entry-grid system-entries-grid">
          <div 
            v-for="(entry, index) in systemEntries" 
            :key="index" 
            class="entry-item"
            @click="handleSystemEntryClick(entry)"
          >
            <div class="entry-icon" :style="{ backgroundColor: entry.iconBg || '#1c59e2' }">
              <i :class="getIconClass(entry.icon)"></i>
            </div>
            <div class="entry-name">{{ entry.name }}</div>
          </div>
        </div>
      </div>
      
      <!-- 操作指南部分 -->
      <div class="section-container guide-section">
        <div class="section-header">
          <div class="section-title">
            <img src="../../assets/Title.svg" alt="Title" class="title-icon">
            <span>操作指南</span>
          </div>
        </div>
        <div class="guide-content">
          <div class="guide-items-row">
            <div 
              v-for="(item, index) in guideItems" 
              :key="index" 
              class="guide-item" 
              @click="handleGuideClick(item)"
            >
              <div class="guide-item-icon" :style="{ color: item.color }">
                <i :class="getGuideIconClass(item.icon)"></i>
              </div>
              <div class="guide-item-content">
                <div class="guide-item-title">{{ item.title }}</div>
                <div class="guide-item-desc">{{ item.desc }}</div>
                <!-- <div class="guide-item-stats">{{ item.viewCount }} · {{ item.downloadCount }}</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 我的已办和待办部分 -->
      <div class="two-column-layout">
        <div class="column">
          <CommonTable
            title="我的已办"
            :data="todoData"
            :columns="todoColumns"
            @row-click="handleTodoRowClick"
            @more-click="handleMoreTodo"
          />
        </div>
        <div class="column">
          <CommonTable
            title="我的待办"
            :data="pendingData"
            :columns="pendingColumns"
            @row-click="handlePendingRowClick"
            @more-click="handleMorePending"
          />
        </div>
      </div>
      
      <!-- 图表部分 -->
      <div class="two-column-layout">
        <div class="column">
          <div class="section-container">
            <div class="section-header">
              <div class="section-title">
                <img src="../../assets/Title.svg" alt="Title" class="title-icon">
                <span>各系统访问总量</span>
              </div>
            </div>
            <div id="system-visits-chart" style="height: 400px;"></div>
          </div>
        </div>
        <div class="column">
          <div class="section-container">
            <div class="section-header">
              <div class="section-title">
                <img src="../../assets/Title.svg" alt="Title" class="title-icon">
                <span>近期访问趋势</span>
              </div>
            </div>
            <div id="recent-visits-chart" style="height: 400px;"></div>
          </div>
        </div>
      </div>
    </div>

    <announcement-detail 
      v-model:visible="detailDialogVisible" 
      :announcement="currentAnnouncement"
    />
  </div>
</template>

<script setup>
import { reactive, onMounted, toRefs, onUnmounted, ref, watchEffect, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import CommonTable from '@/components/CommonTable.vue'
import * as echarts from 'echarts'
import { useUserStore } from '@/store'
import { getNoticeList, postProcessList,postHistoryList,postHistoryListWeek } from '@/api/home'
import AnnouncementDetail from './components/AnnouncementDetail.vue'

const router = useRouter()
const userStore = useUserStore()
const detailDialogVisible = ref(false)
const currentAnnouncement = ref({})
const pages = ref({
  pageNum:1,
  pageSize: 4
})

// 添加loading状态
const loading = ref(false)

// 图表数据ref
const xAxisData = ref()
const seriesData = ref([])
// 折线图数据
const lineChartLegend = ref()
const lineChartSeries = ref([])

const userId = ref(userStore.userInfo?.user?.ID ||  '')

const state = reactive({
  // 系统公告数据
  announcementList: [],
  
  // 常用系统数据
  // commonSystems: [
  //   { name: '统一用户管理平台', icon: 'UserFilled', iconBg: '#1c59e2', path: '/user-mgmt' },
  //   { name: '营销管理系统', icon: 'Promotion', iconBg: '#1c59e2', path: '/marketing' },
  //   { name: '一体化平台', icon: 'Connection', iconBg: '#1c59e2', path: '/integrated' },
  //   { name: '运营管理系统', icon: 'Setting', iconBg: '#1c59e2', path: '/operation' },
  //   { name: '知涌', icon: 'Collection', iconBg: '#1c59e2', path: '/knowledge' },
  //   { name: '低代码平台', icon: 'Edit', iconBg: '#1c59e2', path: '/icd/' }
  // ],
  
  // 系统入口数据
  systemEntries: [
    { name: '统一用户管理平台', icon: 'UserFilled', iconBg: '#1c59e2', path: '/user-mgmt' },
    { name: '营销管理系统', icon: 'Promotion', iconBg: '#1c59e2', path: '/marketing' },
    { name: '一体化平台', icon: 'Connection', iconBg: '#1c59e2', path: '/integrated' },
    { name: '运营管理系统', icon: 'Setting', iconBg: '#1c59e2', path: '/operation' },
    { name: '知涌', icon: 'Collection', iconBg: '#1c59e2', path: '/knowledge' },
    { name: '低代码平台', icon: 'Edit', iconBg: '#1c59e2', path: '/icd/' }
  ],
  
  // 表格列定义
  todoColumns: [
    { prop: 'title', label: '事项名称', width: '300' },
    { prop: 'createTime', label: '日期' },
    { prop: 'sourceSystem', label: '系统' }
  ],
  
  pendingColumns: [
    { prop: 'title', label: '事项名称', width: '300' },
    { prop: 'createTime', label: '日期' },
    { prop: 'sourceSystem', label: '系统' }
  ],
  
  // 表格数据
  todoData: [],
  
  pendingData: [
  ],
  
  // 操作指南数据
  guideItems: [
    {
      title: '新手指南',
      desc: '系统使用指南和常见问题解答',
      icon: 'Document',
      color: '#1c59e2',
      viewCount: '2398次查看',
      downloadCount: '1234次下载'
    },
    {
      title: '技术文档',
      desc: '集成文档，开发指南和API接口',
      icon: 'Setting',
      color: '#67C23A',
      viewCount: '678次查看',
      downloadCount: '215次下载'
    },
    {
      title: '安全规范',
      desc: '信息安全、防护和审计措施',
      icon: 'Warning',
      color: '#E6A23C',
      viewCount: '1580次查看',
      downloadCount: '876次下载'
    },
    {
      title: '运维手册',
      desc: '系统部署、运维和使用指南',
      icon: 'Connection',
      color: '#F56C6C',
      viewCount: '523次查看',
      downloadCount: '195次下载'
    }
  ]
})

const {
  announcementList,
  commonSystems,
  systemEntries,
  todoColumns,
  pendingColumns,
  todoData,
  pendingData,
  guideItems
} = toRefs(state)

// 封装初始化数据的方法
const initPageData = async () => {
  try {
    // 设置loading状态为true
    loading.value = true
    
    // 并行请求数据以提高加载速度
    await Promise.all([
      getNoticeData(),
      getTodoList(),
      getHistoryList(),
      gettHistoryListWeek()
    ])
    
    
    // 使用nextTick确保DOM已经渲染完成后再初始化图表
    nextTick(() => {
      initCharts()
    })
  } catch (error) {
    console.error('error', error)
    // loading.value = false
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // 初始化页面数据
  initPageData()
  
  // 监听折线图数据变化并更新图表
  watchEffect(() => {
    // 确保图表数据和DOM都已准备好
    if (!lineChartLegend.value || !lineChartSeries.value) return
    
    // 使用nextTick确保DOM已渲染
    nextTick(() => {
      try {
        const chartElement = document.getElementById('recent-visits-chart')
        if (!chartElement) {
          console.warn('折线图DOM元素不存在，无法更新图表')
          return
        }
        
        // 获取图表实例前先检查DOM元素
        const lineChart = echarts.getInstanceByDom(chartElement)
        if (lineChart) {
          lineChart.setOption({
            legend: {
              data: lineChartLegend.value
            },
            series: lineChartSeries.value
          })
        }
      } catch (error) {
        console.error('更新折线图出错:', error)
      }
    })
  })
})

// 获取公告数据
const getNoticeData = async () => {
  try {
    const res = await getNoticeList(pages.value)
    if(res.code === 200 && res.data) {
      state.announcementList = res.data?.data ||[]
    }
  } catch (error) {
    console.log('error',error)
  }
}

const getTodoList = async () => {
  const todoList = await dodoList('0')
  const pendingList = await dodoList('1')
  state.todoData = todoList
  state.pendingData = pendingList
}



const getHistoryList = async () => {
  try {
    const res = await postHistoryList();
    if (res.code === 200 && res.data) {
      const appNames = [];
      const accessCounts = [];
      
      // 遍历数据
      res.data.forEach(item => {
        // 检查是否同时包含app_name和access_count
        if (item.app_name && item.access_count !== undefined) {
          appNames.push(item.app_name);
          accessCounts.push(item.access_count);
        }
      });
      
      // 使用ref存储图表数据
      xAxisData.value = appNames;
      seriesData.value = accessCounts;
      
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log('error', error);
    return [];
  }
}

const gettHistoryListWeek = async () => {
  try {
    const res = await postHistoryListWeek()
    console.log('res.data',res.data)
    if (res.code === 200 && res.data) {
      const processedData = processWeeklyData(res.data)
      // 更新ref变量
      lineChartLegend.value = processedData.legendData
      lineChartSeries.value = processedData.seriesData
    }
  } catch (error) {
    console.log('error',error)
  }
}

// 处理每周访问数据
const processWeeklyData = (data) => {
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const appNames = new Set()
  
  days.forEach(day => {
    if (data[day] && Array.isArray(data[day])) {
      data[day].forEach(item => {
        if (item.app_name) {
          appNames.add(item.app_name)
        }
      })
    }
  })
  
  const legendData = Array.from(appNames)
  const seriesData = legendData.map(appName => {
    const dayData = days.map(day => {
      if (data[day] && Array.isArray(data[day])) {
        const appData = data[day].find(item => item.app_name === appName)
        return appData ? appData.access_count : 0
      }
      return 0
    })
    
    const colors = ['#1c59e2', '#36CFC9', '#52C41A', '#F5222D', '#FAAD14']
    const colorIndex = Math.floor(Math.random() * colors.length)
    
    return {
      name: appName,
      type: 'line',
      data: dayData,
      itemStyle: {
        color: colors[colorIndex]
      }
    }
  })
  
  return {
    legendData,
    seriesData
  }
}

const dodoList = async (state) => {
  try {
    const params = {
      processorId: userId.value,
      ...pages.value,
      status: state
    }
    const res = await postProcessList(params)
    if(res.code === 200 && res.data) {
      return res.data.data
    } else {
      return []
    }
  } catch (error) {
    console.log('error',error)
  }
}

// 初始化图表
const initCharts = () => {
  try {
    // 确保DOM元素存在后再初始化图表
    const systemVisitsEl = document.getElementById('system-visits-chart')
    const recentVisitsEl = document.getElementById('recent-visits-chart')
    
    if (!systemVisitsEl || !recentVisitsEl) {
      console.error('图表DOM元素不存在，跳过图表初始化')
      return
    }
    
    // 确保数据已准备好
    if (!xAxisData.value || !seriesData.value || !lineChartLegend.value || !lineChartSeries.value) {
      console.error('图表数据未准备好，跳过图表初始化')
      return
    }
    
    let barChart = null
    let lineChart = null
    
    try {
      // 初始化柱状图
      barChart = echarts.init(systemVisitsEl)
      barChart.setOption({
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: xAxisData.value,
          axisLabel: {
            interval: 0,
            rotate: 0
          }
        },
        yAxis: {
          type: 'value',
          name: '访问次数'
        },
        series: [
          {
            data: seriesData.value,
            type: 'bar',
            barWidth: '30%',
            itemStyle: {
              color: '#1c59e2'
            }
          }
        ]
      })
    } catch (barError) {
      console.error('初始化柱状图失败:', barError)
    }

    try {
      // 初始化折线图
      lineChart = echarts.init(recentVisitsEl)
      lineChart.setOption({
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: lineChartLegend.value || []
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          name: '访问次数'
        },
        series: lineChartSeries.value || []
      })
    } catch (lineError) {
      console.error('初始化折线图失败:', lineError)
    }
    
    // 监听窗口大小变化，重绘图表
    const resizeHandler = () => {
      if (barChart && barChart.resize) {
        try {
          barChart.resize()
        } catch (err) {
          console.error('柱状图调整大小失败:', err)
        }
      }
      if (lineChart && lineChart.resize) {
        try {
          lineChart.resize()
        } catch (err) {
          console.error('折线图调整大小失败:', err)
        }
      }
    }
    
    window.addEventListener('resize', resizeHandler)
    
    // 确保组件卸载时移除事件监听
    onUnmounted(() => {
      window.removeEventListener('resize', resizeHandler)
      // 销毁图表实例
      if (barChart && barChart.dispose) {
        try {
          barChart.dispose()
        } catch (err) {}
      }
      if (lineChart && lineChart.dispose) {
        try {
          lineChart.dispose()
        } catch (err) {}
      }
    })
  } catch (error) {
    console.error('图表初始化过程中发生错误:', error)
  }
}

// 事件处理函数
const handleNavChange = (index, path) => {
  console.log('导航切换:', index, path)
}


const handleAnnouncementClick = (item) => {
  currentAnnouncement.value = {...item}
  detailDialogVisible.value = true
}

const handleMoreAnnouncements = (name) => {
  router.push({
    path: '/dataList',
    query: {name}
  })
}

const handleSystemEntryClick = (entry) => {
  const isDev = import.meta.env.DEV
  const url = isDev? `${import.meta.env.VITE_APP_API_URL}${entry.path}` : `${window.origin}${entry.path}`
  window.open(url, '_blank')
}

const handleTodoRowClick = (row) => {
  console.log('点击已办事项:', row)
}

const handleMoreTodo = () => {
  handleMoreAnnouncements('alreadyDone')
}

const handlePendingRowClick = (row) => {
  console.log('点击待办事项:', row)
}

const handleMorePending = () => {
  handleMoreAnnouncements('representative')
}

const handleGuideClick = (item) => {
  console.log('点击操作指南:', item)
}

const getGuideIconClass = (icon) => {
  const iconMap = {
    'Document': 'ri-file-text-line',
    'Setting': 'ri-settings-3-line',
    'Warning': 'ri-shield-keyhole-line',
    'Connection': 'ri-terminal-box-line'
  }
  return iconMap[icon] || 'ri-file-text-line'
}

const getIconClass = (icon) => {
  const iconMap = {
    'UserFilled': 'ri-user-3-fill',
    'Promotion': 'ri-advertisement-line',
    'Connection': 'ri-link-m',
    'Setting': 'ri-settings-3-line',
    'Collection': 'ri-book-2-line',
    'Edit': 'ri-code-box-line'
  }
  return iconMap[icon] || 'ri-app-line'
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  /* background-color: #f0f2f5; */
  display: flex;
  flex-direction: column;
  width: 100%;
}
.content-container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  /* padding-top: 84px; 添加顶部边距，防止内容被固定导航栏遮挡 */
  box-sizing: border-box;
  flex: 1;
  position: relative;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
}

.top-section-layout {
  display: flex;
  gap: 16px;
  position: relative;
  z-index: 1;
  margin-bottom: 16px;
}

.announcement-section {
  flex: 2;
  background: rgba(255, 255, 255, 0.8); /* 增加不透明度 */
  backdrop-filter: blur(10px); /* 增加模糊效果 */
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* 增加阴影 */
}

.common-systems-section {
  flex: 1;
  background: rgba(248, 250, 252, 0.85) !important; /* 增加不透明度 */
  backdrop-filter: blur(10px); /* 增加模糊效果 */
  /* PanelShadow */
  box-shadow: 0px 4px 8px -3px rgba(0, 0, 0, 0.15) !important; /* 增强阴影 */
}

.section-container {
  background-color: rgba(255, 255, 255, 0.9); /* 增加不透明度 */
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* 增强阴影 */
  /* height: 100%; */
  /* margin-bottom: 16px; */
}

.system-entries-section, .guide-section {
  margin-bottom: 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  height: 52px;
  box-sizing: border-box;
  border-bottom: 1px solid #f0f0f0;
}

.common-systems-header {
  background: linear-gradient(97deg, #0D48CE 0%, #3381FF 100%);
  border-radius: 4px 4px 0 0;
  backdrop-filter: blur(5px);
}

.common-systems-header .section-title {
  color: #fff;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  display: flex;
  align-items: center;
}

.title-icon {
  width: 11px;
  height: 12px;
  margin-right: 8px;
}

.more-link {
  font-size: 14px;
  color: #909399;
  cursor: pointer;
}

.more-link:hover {
  color: #1c59e2;
}

/* 系统公告样式 */
.announcement-list {
  padding: 0;
  height: calc(100% - 52px); /* 减去header高度 */
  overflow: auto;
}

.announcement-item {
  display: flex;
  padding: 15px 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.announcement-item:hover {
  background-color: #f5f7fa;
}

.announcement-item:last-child {
  border-bottom: none;
}

.item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  color: #1c59e2;
}

.item-icon i {
  font-size: 18px;
}

.item-content {
  flex: 1;
  margin: 0 10px;
  overflow: hidden;
}

.item-title {
  font-size: 14px;
  color: #303133;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-desc {
  font-size: 12px;
  color: #909399;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-time {
  font-size: 12px;
  color: #909399;
  min-width: 80px;
  text-align: right;
}

/* 常用系统样式 */
.common-system-content {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  /* height: calc(100% - 52px); 确保高度与系统公告一致 */
}

.common-system-item {
  flex: 1 0 calc(50% - 8px);
  display: flex;
  align-items: center;
  min-width: 0;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.3s;
  background: #FFFFFF;
  box-sizing: border-box;
  /* Color Light/浅色边框色 */
  border: 1px solid #F2F3F5;
  box-shadow: inset 0px -2px 0px 0px #C8D5E2;
}

.common-system-item:hover {
  background-color: #f5f7fa;
}

.common-system-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: #fff;
  flex-shrink: 0;
}

.common-system-icon i {
  font-size: 20px;
  color: #fff; /* 确保图标是白色 */
}

.common-system-name {
  font-size: 14px;
  color: #303133;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 系统入口样式 */
.system-entries-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  padding: 16px;
}

.entry-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s;
  padding: 16px;
}

.entry-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.entry-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: #fff;
}

.entry-icon i {
  font-size: 28px;
}

.entry-name {
  font-size: 14px;
  color: #606266;
  text-align: center;
}

/* 操作指南样式 - 横向排列 */
.guide-content {
  padding: 16px;
}

.guide-items-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.guide-item {
  flex: 1 0 calc(25% - 12px);
  min-width: 250px;
  display: flex;
  background: linear-gradient(109deg, #F1F7FE 0%, #FFFFFF 100%);
  border-radius: 4px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.guide-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.guide-item-icon {
  font-size: 32px;
  margin-right: 16px;
}

.guide-item-content {
  flex: 1;
}

.guide-item-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

.guide-item-desc {
  font-size: 14px;
  color: #606266;
  margin-bottom: 12px;
}

.guide-item-stats {
  font-size: 12px;
  color: #909399;
}

/* 两列布局 */
.two-column-layout {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  width: 100%;
  overflow: hidden;
}

.two-column-layout:last-child {
  margin-bottom: 0;
  flex: 1;
  min-height: 400px;
}

.column {
  flex: 1;
}

/* 响应式调整 */
@media screen and (max-width: 1440px) {
  .content-container {
    max-width: 1200px;
  }
}

@media screen and (max-width: 1200px) {
  .top-section-layout {
    flex-direction: column;
  }
  
  .system-entries-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .two-column-layout {
    flex-direction: column;
  }
  
  .two-column-layout:last-child {
    min-height: auto;
  }
  
  .two-column-layout:last-child .column {
    min-height: 400px;
  }
}

@media screen and (max-width: 768px) {
  .system-entries-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .guide-items-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .guide-item {
    min-width: 100%;
  }
}

@media screen and (max-width: 576px) {
  .guide-items-row {
    grid-template-columns: 1fr;
  }
}

#system-visits-chart, #recent-visits-chart {
  height: 400px;
  width: 100%;
}

@media screen and (max-width: 768px) {
  #system-visits-chart, #recent-visits-chart {
    height: 300px;
  }
  
  .system-entries-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .guide-items-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .guide-item {
    min-width: 100%;
  }
}
</style> 