<template>
  <div class="announcement-container">
    <div class="announcement-content-wrapper">
      <div class="announcement-header">
        <div class="page-title">
          <img src="../../../assets/Title.svg" alt="Title" class="title-icon">
          <span>{{ configName[name] }}</span>
        </div>
      </div>
      
      <div class="announcement-content" v-loading="loading">
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
            <div class="item-title">{{ item.name || item.title}}</div>
            <div class="item-desc">{{ item.content }}</div>
          </div>
          <div class="item-time">{{ item.publicTime || item.createTime }}</div>
        </div>
        
        <el-empty v-if="announcementList.length === 0 && !loading" :description="`暂无${configName[name]}数据`" />
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
import { ref, onMounted } from 'vue'
import AnnouncementDetail from './AnnouncementDetail.vue'
import { getNoticeList, postProcessList } from '@/api/home'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store'
const detailDialogVisible = ref(false)
const currentAnnouncement = ref({})
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(17) // 假设总共有17条公告
const announcementList = ref([])
const loading = ref(false)
const route = useRoute()
const name = route.query.name
const userStore = useUserStore()

const configUrl = ref({
  systemAnnouncement: () => getNoticeList({
      pageNum: currentPage.value,
      pageSize: pageSize.value
    }),
    alreadyDone: () => postProcessList({
      processorId: userStore.userInfo?.user?.ID ||  '',
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      status: '0'
    }),
    representative: () => postProcessList({
      processorId: userStore.userInfo?.user?.ID ||  '',
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      status: '1'
    })
})

const configName = ref({
  systemAnnouncement: '系统公告',
  alreadyDone: '我的已办',
  representative: '我的待办'
})




const getNoticeData = async () => {
  loading.value = true
  try {
    const res = await configUrl.value[name]()
    if(res.code === 200 && res.data) {
      announcementList.value = res.data.data
      totalItems.value = res.data.total || 0
    }
  } catch (error) {
    console.log('error',error)
  } finally {
    loading.value = false
  }
}



const handleAnnouncementClick = (item) => {
  item.isRead = true
  currentAnnouncement.value = {...item}
  detailDialogVisible.value = true
}

const handlePageChange = async (page) => {
  currentPage.value = page
  await getNoticeData()
}

onMounted(() => {
  getNoticeData()
})


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
  height: calc(100vh - 63px - 194px);
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
