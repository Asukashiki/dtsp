<template>
  <div class="notice-detail-page">
    <div class="content-wrapper">
      <!-- Back button -->
      <div class="back-bar">
        <el-button text @click="goBack" class="back-btn">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') || 'Back' }}
        </el-button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="10" animated />
      </div>

      <!-- Notice Content -->
      <div v-else class="notice-card">
        <!-- Header -->
        <div class="notice-header">
          <h1 class="notice-title">{{ parsedTitle }}</h1>
          <div class="notice-meta">
            <span class="meta-item">
              <i class="ri-time-line"></i>
              {{ notice.createTime }}
            </span>
            <span v-if="notice.createBy" class="meta-item">
              <i class="ri-user-line"></i>
              {{ notice.createBy }}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="notice-body">
          <div class="rich-text-content" v-html="parsedContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getPublicNotice } from '@/api/publicNotice'
import { parseI18nValue } from '@/utils/i18nHelper'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()

const loading = ref(false)
const notice = ref({
  noticeId: '',
  noticeTitle: '',
  noticeContent: '',
  noticeType: '1',
  createBy: '',
  createTime: ''
})

// 解析国际化标题
const parsedTitle = computed(() => {
  return parseI18nValue(notice.value.noticeTitle, locale.value, notice.value.noticeTitle || '')
})

// 解析国际化内容（富文本）
const parsedContent = computed(() => {
  return parseI18nValue(notice.value.noticeContent, locale.value, notice.value.noticeContent || '')
})

const goBack = () => {
  router.back()
}

const fetchNotice = async () => {
  const noticeId = route.params.id
  if (!noticeId) {
    router.push('/home')
    return
  }
  
  loading.value = true
  try {
    const res = await getPublicNotice(noticeId)
    if (res.code === 200 && res.data) {
      notice.value = res.data
    }
  } catch (error) {
    console.error('Failed to fetch notice:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchNotice()
})
</script>

<style scoped>
.notice-detail-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8fafb 0%, #ffffff 100%);
  padding: 24px;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

.back-bar {
  margin-bottom: 20px;
}

.back-btn {
  font-size: 15px;
  font-weight: 500;
  color: #606266;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(0, 154, 68, 0.08);
  color: #009A44;
}

.back-btn i {
  margin-right: 6px;
  font-size: 18px;
}

.loading-container {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.notice-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

/* Header */
.notice-header {
  padding: 30px 40px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.03) 100%);
  border-bottom: 2px solid rgba(0, 154, 68, 0.1);
  text-align: center;
}

.notice-type-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
}

.notice-type-tag.type-notice {
  background: linear-gradient(135deg, #FA8C16 0%, #FFA940 100%);
  color: white;
}

.notice-type-tag.type-announcement {
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  color: white;
}

.notice-title {
  font-size: 28px;
  font-weight: 700;
  color: #303133;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.notice-meta {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #606266;
  background: rgba(0, 154, 68, 0.06);
  padding: 8px 16px;
  border-radius: 20px;
}

.meta-item i {
  color: #009A44;
}

/* Body */
.notice-body {
  padding: 40px;
}

/* Rich Text Content Styles - Override global reset */
.rich-text-content {
  font-size: 16px;
  line-height: 1.8;
  color: #303133;
}

.rich-text-content :deep(h1) {
  font-size: 28px;
  font-weight: 700;
  margin: 24px 0 16px;
  color: #303133;
}

.rich-text-content :deep(h2) {
  font-size: 24px;
  font-weight: 700;
  margin: 20px 0 14px;
  color: #303133;
}

.rich-text-content :deep(h3) {
  font-size: 20px;
  font-weight: 600;
  margin: 18px 0 12px;
  color: #303133;
}

.rich-text-content :deep(h4) {
  font-size: 18px;
  font-weight: 600;
  margin: 16px 0 10px;
  color: #303133;
}

.rich-text-content :deep(h5),
.rich-text-content :deep(h6) {
  font-size: 16px;
  font-weight: 600;
  margin: 14px 0 8px;
  color: #303133;
}

.rich-text-content :deep(p) {
  margin: 0 0 16px;
  line-height: 1.8;
}

.rich-text-content :deep(ul),
.rich-text-content :deep(ol) {
  margin: 0 0 16px;
  padding-left: 24px;
}

.rich-text-content :deep(li) {
  margin-bottom: 8px;
  line-height: 1.6;
}

.rich-text-content :deep(ul) {
  list-style-type: disc;
}

.rich-text-content :deep(ol) {
  list-style-type: decimal;
}

.rich-text-content :deep(strong),
.rich-text-content :deep(b) {
  font-weight: 700;
}

.rich-text-content :deep(em),
.rich-text-content :deep(i:not([class])) {
  font-style: italic;
}

.rich-text-content :deep(u) {
  text-decoration: underline;
}

.rich-text-content :deep(a) {
  color: #009A44;
  text-decoration: none;
}

.rich-text-content :deep(a:hover) {
  text-decoration: underline;
}

.rich-text-content :deep(blockquote) {
  margin: 16px 0;
  padding: 12px 20px;
  border-left: 4px solid #009A44;
  background: rgba(0, 154, 68, 0.05);
  color: #606266;
}

.rich-text-content :deep(pre) {
  margin: 16px 0;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 8px;
  overflow-x: auto;
}

.rich-text-content :deep(code) {
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: 14px;
  background: #f5f7fa;
  padding: 2px 6px;
  border-radius: 4px;
}

.rich-text-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 16px 0;
}

.rich-text-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}

.rich-text-content :deep(th),
.rich-text-content :deep(td) {
  border: 1px solid #dcdfe6;
  padding: 12px;
  text-align: left;
}

.rich-text-content :deep(th) {
  background: #f5f7fa;
  font-weight: 600;
}

.rich-text-content :deep(hr) {
  border: none;
  border-top: 1px solid #dcdfe6;
  margin: 24px 0;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .notice-detail-page {
    padding: 16px;
  }

  .notice-header {
    padding: 24px 20px;
  }

  .notice-title {
    font-size: 22px;
  }

  .notice-body {
    padding: 24px 20px;
  }

  .rich-text-content {
    font-size: 15px;
  }
}
</style>
