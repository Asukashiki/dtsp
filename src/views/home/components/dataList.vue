<template>
  <div class="announcement-container">
 
    <div class="announcement-content-wrapper">
      <div class="back-bar">
        <el-button text @click="goBack" class="back-btn">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') || 'Back' }}
        </el-button>
      </div>
      <!-- Header -->
      <div class="announcement-header">
        <div class="header-icon">
          <i :class="getPageIcon()"></i>
        </div>
        <div class="page-title-wrapper">
          <h1 class="page-title">{{ getPageTitle() }}</h1>
          <p class="page-subtitle">{{ getPageSubtitle() }}</p>
        </div>
      </div>

      <!-- Content -->
      <div class="announcement-content" v-loading="loading">
        <div class="announcement-list">
          <div
            v-for="(item, index) in announcementList"
            :key="item.noticeId || index"
            class="announcement-item"
            :class="{'unread': !item.isRead}"
            @click="handleAnnouncementClick(item)"
          >
            <div class="item-icon">
              <i :class="getItemIcon()"></i>
              <div v-if="!item.isRead" class="unread-dot"></div>
            </div>
            <div class="item-content">
              <div class="item-header">
                <div class="item-title">{{ parseI18nValue(item.noticeTitle, locale, item.noticeTitle) }}</div>
                <div v-if="!item.isRead" class="unread-badge">
                  {{ $t('dataList.unread') }}
                </div>
              </div>
              <div class="item-desc" v-html="stripHtml(parseI18nValue(item.noticeContent, locale, item.noticeContent))"></div>
            </div>
            <div class="item-time">
              <i class="ri-time-line"></i>
              <span>{{ item.createTime }}</span>
            </div>
          </div>
        </div>

        <el-empty
          v-if="announcementList.length === 0 && !loading"
          :description="$t('dataList.noData', { type: getPageTitle() })"
          :image-size="120"
        >
          <template #image>
            <i class="ri-inbox-line empty-icon"></i>
          </template>
        </el-empty>
      </div>

      <!-- Pagination -->
      <div class="pagination-container" v-if="totalItems > 0">
        <div class="total-count">
          {{ $t('dataList.totalCount', { count: totalItems }) }}
        </div>
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { listPublicNotice } from '@/api/publicNotice'
import { postProcessList } from '@/api/home'
import { parseI18nValue } from '@/utils/i18nHelper'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store'

const { t, locale } = useI18n()
const router = useRouter()
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)
const announcementList = ref([])
const loading = ref(false)
const route = useRoute()
const name = route.query.name
const userStore = useUserStore()

// 移除 HTML 标签用于列表预览
const stripHtml = (html) => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').substring(0, 100)
}

const configName = computed(() => ({
  systemAnnouncement: t('dataList.systemAnnouncement'),
  alreadyDone: t('dataList.myDone'),
  representative: t('dataList.myTodo')
}))

const getPageTitle = () => {
  return configName.value[name] || t('dataList.systemAnnouncement')
}

const getPageSubtitle = () => {
  const subtitles = {
    systemAnnouncement: t('dataList.clickToView'),
    alreadyDone: t('dataList.clickToView'),
    representative: t('dataList.clickToView')
  }
  return subtitles[name] || ''
}

const getPageIcon = () => {
  const icons = {
    systemAnnouncement: 'ri-notification-3-line',
    alreadyDone: 'ri-checkbox-circle-line',
    representative: 'ri-time-line'
  }
  return icons[name] || 'ri-notification-3-line'
}

const getItemIcon = () => {
  const icons = {
    systemAnnouncement: 'ri-megaphone-line',
    alreadyDone: 'ri-file-text-line',
    representative: 'ri-file-list-line'
  }
  return icons[name] || 'ri-megaphone-line'
}

const getNoticeData = async () => {
  loading.value = true
  try {
    if (name === 'systemAnnouncement') {
      // 使用公开公告 API
      const res = await listPublicNotice({
        pageNum: currentPage.value,
        pageSize: pageSize.value
      })
      if (res.code === 200) {
        announcementList.value = res.rows || []
        totalItems.value = res.total || 0
      }
    } else {
      // 使用流程 API
      const res = await postProcessList({
        processorId: userStore.userInfo?.userId || '',
        pageNum: currentPage.value,
        pageSize: pageSize.value,
        status: name === 'alreadyDone' ? '0' : '1'
      })
      if (res.code === 200 && res.data) {
        announcementList.value = res.data.data || []
        totalItems.value = res.data.total || 0
      }
    }
  } catch (error) {
    console.log('error', error)
  } finally {
    loading.value = false
  }
}

const handleAnnouncementClick = (item) => {
  item.isRead = true
  router.push(`/notice/${item.noticeId}`)
}

const handlePageChange = async (page) => {
  currentPage.value = page
  await getNoticeData()
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  getNoticeData()
})
</script>

<style scoped>
.announcement-container {
  background: linear-gradient(to bottom, #f8fafb 0%, #ffffff 100%);
  min-height: calc(100vh - 63px - 194px);
  padding: 24px;
}


.back-bar {
  margin: 20px 0;
}


.announcement-content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  min-height: calc(100vh - 63px - 194px - 48px);
  display: flex;
  flex-direction: column;
}

/* Header */
.announcement-header {
  padding: 32px 40px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
  border-bottom: 2px solid rgba(0, 154, 68, 0.1);
  display: flex;
  align-items: center;
  gap: 24px;
}

.header-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0, 154, 68, 0.25);
  flex-shrink: 0;
}

.header-icon i {
  font-size: 32px;
  color: white;
}

.page-title-wrapper {
  flex: 1;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #009A44;
  margin: 0 0 6px 0;
}

.page-subtitle {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

/* Content */
.announcement-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px 40px;
}

.announcement-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Announcement Item */
.announcement-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 24px;
  border-radius: 12px;
  background: white;
  border: 2px solid rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;
}

.announcement-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 154, 68, 0.12);
  border-color: rgba(0, 154, 68, 0.2);
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.02) 0%, rgba(254, 221, 0, 0.01) 100%);
}

.announcement-item.unread {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.03) 0%, rgba(254, 221, 0, 0.02) 100%);
  border-color: rgba(0, 154, 68, 0.15);
}

.announcement-item.unread:hover {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
}

/* Item Icon */
.item-icon {
  position: relative;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.1) 0%, rgba(254, 221, 0, 0.1) 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.item-icon i {
  font-size: 24px;
  color: #009A44;
}

.unread-dot {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 12px;
  height: 12px;
  background: #DA121A;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(218, 18, 26, 0.3);
}

/* Item Content */
.item-content {
  flex: 1;
  min-width: 0;
}

.item-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.item-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.unread .item-title {
  font-weight: 700;
  color: #009A44;
}

.unread-badge {
  padding: 2px 8px;
  background: linear-gradient(135deg, #DA121A 0%, #FF3D47 100%);
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 10px;
  flex-shrink: 0;
}

.item-desc {
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Item Time */
.item-time {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #909399;
  min-width: 140px;
  justify-content: flex-end;
  flex-shrink: 0;
}

.item-time i {
  font-size: 16px;
}

/* Empty State */
.empty-icon {
  font-size: 120px;
  color: #C0C4CC;
}

:deep(.el-empty__description) {
  color: #909399;
  font-size: 14px;
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  border-top: 2px solid rgba(0, 0, 0, 0.06);
  background: rgba(0, 154, 68, 0.02);
}

.total-count {
  font-size: 14px;
  font-weight: 500;
  color: #606266;
}

/* Custom Element Plus Pagination Styles */
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  color: white;
  border-radius: 6px;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled):hover) {
  color: #009A44;
}

:deep(.el-pagination .btn-next),
:deep(.el-pagination .btn-prev) {
  background: rgba(0, 154, 68, 0.08);
  border-radius: 6px;
}

:deep(.el-pagination .btn-next:hover),
:deep(.el-pagination .btn-prev:hover) {
  color: #009A44;
  background: rgba(0, 154, 68, 0.15);
}

:deep(.el-pagination.is-background .el-pager li) {
  border-radius: 6px;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .announcement-container {
    padding: 16px;
  }

  .announcement-header {
    padding: 24px 20px;
    gap: 16px;
  }

  .header-icon {
    width: 52px;
    height: 52px;
  }

  .header-icon i {
    font-size: 26px;
  }

  .page-title {
    font-size: 22px;
  }

  .announcement-content {
    padding: 16px 20px;
  }

  .announcement-item {
    flex-direction: column;
    padding: 16px;
  }

  .item-time {
    align-self: flex-end;
    min-width: auto;
  }

  .pagination-container {
    padding: 16px 20px;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}
</style>
