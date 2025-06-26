<template>
  <div class="announcement-container">
    <div class="announcement-content-wrapper">
      <div class="announcement-header">
        <div class="page-title">
          <img src="../../../assets/Title.svg" alt="Title" class="title-icon">
          <span>系统公告</span>
        </div>
      </div>
      
      <div class="announcement-content">
        <div 
          v-for="(item, index) in announcementList" 
          :key="index" 
          class="announcement-item"
          :class="{'unread': !item.isRead}"
          @click="handleAnnouncementClick(item)"
        >
          <div class="item-icon">
            <i class="ri-notification-3-line"></i>
            <div v-if="!item.isRead" class="unread-dot"></div>
          </div>
          <div class="item-content">
            <div class="item-title">{{ item.title }}</div>
            <div class="item-desc">{{ item.content }}</div>
          </div>
          <div class="item-time">{{ item.time }}</div>
        </div>
      </div>
      
      <div class="pagination-container">
        <div class="total-count">共 {{ totalItems }} 条</div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalItems"
          :page-size="pageSize"
          v-model:current-page="currentPage"
          @current-change="handlePageChange"
        />
      </div>
    </div>

    <!-- 引入公告详情弹窗组件 -->
    <announcement-detail 
      v-model:visible="detailDialogVisible" 
      :announcement="currentAnnouncement"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import AnnouncementDetail from './AnnouncementDetail.vue'

const detailDialogVisible = ref(false)
const currentAnnouncement = ref({})
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(17) // 假设总共有17条公告

const announcementList = reactive([
  {
    title: '系统升级通知',
    content: '系统将于今晚 23:00 至次日凌晨 2:00 进行升级维护，期间服务将不可用，请提前做好准备。\n\n升级内容：\n1. 修复已知问题\n2. 优化性能表现\n3. 增加新的数据分析功能',
    time: '10:30',
    isRead: false,
    publisher: '系统管理员',
    important: true
  },
  {
    title: '国庆节放假通知',
    content: '集团国庆放假通知:10月1日-10月7日放假，10月8-9日上班，10月10日休息。放假期间审核中心与工作人员均不在线，有问题可留言。\n\n我们将在上班后尽快回复。如有任何问题，可于今日(9月30日)工作时间通过设计师微信群或工作上方联系我们处理。祝大家国庆快乐！',
    time: '2025-06-11',
    isRead: true,
    publisher: 'HCM',
    important: true,
    attachments: [
      { name: '国庆节放假安排表.xlsx', url: '#' }
    ]
  },
  {
    title: '数智化转型支撑平台升级通知',
    content: '系统将于本周六凌晨 2 点进行升级维护，预计耗时 2 小时。请相关人员做好准备工作。',
    time: '2025-06-13',
    isRead: false,
    publisher: '系统管理员'
  },
  {
    title: '系统升级通知',
    content: '系统将于今晚 23:00 至次日凌晨 2:00 进行升级维护，期间服务将不可用，请提前做好准备。',
    time: '2025-06-16',
    isRead: true,
    publisher: '系统管理员'
  },
  {
    title: '新功能发布',
    content: '数据分析模块增加自定义表单功能，欢迎体验使用。\n\n主要功能包括：\n1. 自定义表单字段\n2. 拖拽式表单设计\n3. 数据验证规则配置\n4. 工作流集成',
    time: '2025-06-09',
    isRead: false,
    publisher: '产品团队',
    attachments: [
      { name: '新功能使用说明.pdf', url: '#' },
      { name: '功能演示视频.mp4', url: '#' }
    ]
  },
  {
    title: '数智化转型支撑平台升级通知',
    content: '系统将于本周六凌晨 2 点进行升级维护，预计耗时 2 小时。',
    time: '2025-06-07',
    isRead: true,
    publisher: '系统管理员'
  },
  {
    title: '系统升级通知',
    content: '系统将于今晚 23:00 至次日凌晨 2:00 进行升级维护，期间服务将不可用，请提前做好准备。',
    time: '2025-06-05',
    isRead: true,
    publisher: '系统管理员'
  }
])

const handleAnnouncementClick = (item) => {
  // 标记为已读
  item.isRead = true
  
  // 设置当前选中的公告并打开详情弹窗
  currentAnnouncement.value = {...item}
  detailDialogVisible.value = true
}

const handlePageChange = (page) => {
  currentPage.value = page
  // 在实际应用中，这里应该调用API获取对应页的数据
  console.log('切换到页码:', page)
}
</script>

<style scoped>
.announcement-container {
  /* padding: 24px; */
  background-color: #f0f2f5;
  min-height: calc(100vh - 63px - 194px);
}

.announcement-content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  height: calc(100vh - 63px - 194px - 48px);
  display: flex;
  flex-direction: column;
}

.announcement-header {
  height: 60px;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  padding: 0 24px;
  flex-shrink: 0;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  display: flex;
  align-items: center;
}

.title-icon {
  width: 14px;
  height: 16px;
  margin-right: 8px;
}

.announcement-content {
  background-color: #fff;
  padding: 0;
  flex: 1;
  overflow-y: auto;
}

.announcement-item {
  display: flex;
  padding: 20px 24px;
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

.announcement-item.unread {
  /* background-color: #f0f7ff; */
}

.announcement-item.unread:hover {
  background-color: #e6f1ff;
}

.item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  color: #1c59e2;
  position: relative;
}

.item-icon i {
  font-size: 22px;
}

.unread-dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  background-color: #f56c6c;
  border-radius: 50%;
}

.item-content {
  flex: 1;
  margin: 0 16px;
  overflow: hidden;
}

.item-title {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 8px;
}

.unread .item-title {
  font-weight: 600;
  color: #1c59e2;
}

.item-desc {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}

.item-time {
  font-size: 14px;
  color: #909399;
  min-width: 100px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #e4e7ed;
  flex-shrink: 0;
}

.total-count {
  font-size: 14px;
  color: #606266;
}

/* 自定义Element Plus分页样式 */
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #1c59e2;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled):hover) {
  color: #1c59e2;
}

:deep(.el-pagination .btn-next, .el-pagination .btn-prev) {
  background-color: #f4f4f5;
}
</style>
