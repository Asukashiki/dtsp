<template>
  <div class="home-container">
    <div class="content-container">
      <div class="top-section-layout">
        <!-- 系统公告部分 -->
        <div class="section-container announcement-section">
          <div class="section-header">
            <div class="section-title">
              <img src="../../assets/Title.svg" alt="Title" class="title-icon">
              <span>系统公告</span>
            </div>
            <div class="more-link" @click="handleMoreAnnouncements">查看更多 ></div>
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
                <div class="item-title">{{ item.title }}</div>
                <div class="item-desc">{{ item.content }}</div>
              </div>
              <div class="item-time">{{ item.time }}</div>
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
              v-for="(entry, index) in commonSystems.slice(0, 6)" 
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
                <div class="guide-item-stats">{{ item.viewCount }} · {{ item.downloadCount }}</div>
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
  </div>
</template>

<script setup>
import { reactive, onMounted, toRefs, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../../components/Header.vue'
import CommonTable from '../../components/CommonTable.vue'
import * as echarts from 'echarts'
import { useUserStore } from '../../store'

const router = useRouter()
const userStore = useUserStore()

const state = reactive({
  // 系统公告数据
  announcementList: [
    {
      title: '系统升级通知',
      content: '系统将于 23:00 至次日凌晨 2:00 进行升级维护，期间服务将不可用，请提前做好准备。',
      time: '10:30'
    },
    {
      title: '新功能发布',
      content: '数据分析模块增加自定义表单功能，欢迎体验使用。',
      time: '2025-06-11'
    },
    {
      title: '数智化转型支撑平台升级通知',
      content: '系统将于本周六凌晨 2 点进行升级维护，预计耗时 2 小时。',
      time: '2025-06-13'
    },
    {
      title: '系统升级通知',
      content: '系统将于本周六凌晨 2 点进行升级维护，预计耗时 2 小时。',
      time: '2025-06-16'
    }
  ],
  
  // 常用系统数据
  commonSystems: [
    { name: '统一用户管理平台', icon: 'UserFilled', iconBg: '#1c59e2', path: '/user-mgmt' },
    { name: '营销管理系统', icon: 'Promotion', iconBg: '#1c59e2', path: '/marketing' },
    { name: '一体化平台', icon: 'Connection', iconBg: '#1c59e2', path: '/integrated' },
    { name: '运营管理系统', icon: 'Setting', iconBg: '#1c59e2', path: '/operation' },
    { name: '知涌', icon: 'Collection', iconBg: '#1c59e2', path: '/knowledge' },
    { name: '低代码平台', icon: 'Edit', iconBg: '#1c59e2', path: '/low-code' }
  ],
  
  // 系统入口数据
  systemEntries: [
    { name: '统一用户管理平台', icon: 'UserFilled', iconBg: '#1c59e2', path: '/user-mgmt' },
    { name: '营销管理系统', icon: 'Promotion', iconBg: '#1c59e2', path: '/marketing' },
    { name: '一体化平台', icon: 'Connection', iconBg: '#1c59e2', path: '/integrated' },
    { name: '运营管理系统', icon: 'Setting', iconBg: '#1c59e2', path: '/operation' },
    { name: '知涌', icon: 'Collection', iconBg: '#1c59e2', path: '/knowledge' },
    { name: '低代码平台', icon: 'Edit', iconBg: '#1c59e2', path: '/low-code' }
  ],
  
  // 表格列定义
  todoColumns: [
    { prop: 'name', label: '事项名称', width: '400' },
    { prop: 'time', label: '日期' },
    { prop: 'system', label: '系统' }
  ],
  
  pendingColumns: [
    { prop: 'name', label: '事项名称', width: '400' },
    { prop: 'time', label: '日期' },
    { prop: 'system', label: '系统' }
  ],
  
  // 表格数据
  todoData: [
    {
      name: '请假申请单【2025年6月BO-资源科技】提交',
      time: '2025-05-26',
      system: 'HCM'
    },
    {
      name: '请假申请单【2025年6月BO-资源科技】提交',
      time: '2025-05-26',
      system: 'HCM'
    },
    {
      name: '请假申请单【2025年6月BO-资源科技】提交',
      time: '2025-05-26',
      system: 'HCM'
    },
    {
      name: '请假申请单【2025年6月BO-资源科技】提交',
      time: '2025-05-26',
      system: 'HCM'
    }
  ],
  
  pendingData: [
    {
      name: '请假申请单【2025年6月BO-资源科技】提交',
      time: '2025-05-26',
      system: 'HCM'
    },
    {
      name: '请假申请单【2025年6月BO-资源科技】提交',
      time: '2025-05-26',
      system: 'HCM'
    },
    {
      name: '请假申请单【2025年6月BO-资源科技】提交',
      time: '2025-05-26',
      system: 'HCM'
    },
    {
      name: '请假申请单【2025年6月BO-资源科技】提交',
      time: '2025-05-26',
      system: 'HCM'
    }
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

onMounted(async () => {
  // 初始化图表
  initCharts()
})

// 初始化图表
const initCharts = () => {
  // 初始化柱状图
  const barChart = echarts.init(document.getElementById('system-visits-chart'))
  barChart.setOption({
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['OA系统', 'CRM系统', 'ERP系统', 'HR系统', '财务系统'],
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
        data: [60000, 220000, 90000, 120000, 60000],
        type: 'bar',
        barWidth: '30%',
        itemStyle: {
          color: '#1c59e2'
        }
      }
    ]
  })
  
  // 初始化折线图
  const lineChart = echarts.init(document.getElementById('recent-visits-chart'))
  lineChart.setOption({
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    legend: {
      data: ['OA系统', 'CRM系统', 'ERP系统', 'HR系统', '财务系统']
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
    series: [
      {
        name: 'OA系统',
        type: 'line',
        data: [5000, 6000, 10000, 8000, 7000, 6000, 9000],
        itemStyle: {
          color: '#1c59e2'
        }
      },
      {
        name: 'CRM系统',
        type: 'line',
        data: [15000, 14000, 18000, 20000, 19000, 19000, 21000],
        itemStyle: {
          color: '#36CFC9'
        }
      },
      {
        name: 'ERP系统',
        type: 'line',
        data: [10000, 12000, 10000, 8000, 10000, 9000, 11000],
        itemStyle: {
          color: '#52C41A'
        }
      },
      {
        name: 'HR系统',
        type: 'line',
        data: [3000, 5000, 8000, 4000, 2000, 3000, 5000],
        itemStyle: {
          color: '#F5222D'
        }
      },
      {
        name: '财务系统',
        type: 'line',
        data: [12000, 15000, 16000, 14000, 15000, 14000, 17000],
        itemStyle: {
          color: '#FAAD14'
        }
      }
    ]
  })
  
  // 监听窗口大小变化，重绘图表
  const resizeHandler = () => {
    barChart.resize()
    lineChart.resize()
  }
  
  window.addEventListener('resize', resizeHandler)
  
  // 确保组件卸载时移除事件监听
  onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler)
  })
}

// 事件处理函数
const handleNavChange = (index, path) => {
  console.log('导航切换:', index, path)
}

const handleAnnouncementClick = (item) => {
  console.log('点击公告:', item)
}

const handleMoreAnnouncements = () => {
  router.push('/system-announcement')
}

const handleSystemEntryClick = (entry) => {
  console.log('点击系统入口:', entry)
  if (entry.path) {
    router.push(entry.path)
  }
}

const handleTodoRowClick = (row) => {
  console.log('点击已办事项:', row)
}

const handleMoreTodo = () => {
  console.log('查看更多已办')
}

const handlePendingRowClick = (row) => {
  console.log('点击待办事项:', row)
}

const handleMorePending = () => {
  console.log('查看更多待办')
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