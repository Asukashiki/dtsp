<template>
  <div class="seed-promotion-detail-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <i class="ri-movie-line"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">{{ detailData.title || $t('research.seedPromotion.detail.title') }}</h1>
          <p class="page-subtitle">{{ detailData.enterpriseName }}</p>
        </div>
      </div>
      <div class="header-actions">
        <el-button @click="handleBack">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
      </div>
    </div>

    <!-- 详情内容 -->
    <div class="detail-content" v-loading="loading">
      <!-- 视频预览区 -->
      <!-- <div class="detail-section video-section">
        <h2 class="section-title">
          <i class="ri-play-circle-line"></i>
          {{ $t('research.seedPromotion.detail.videoPreview') }}
        </h2>
        <div class="video-container">
          <video
            v-if="videoPreviewUrl"
            :src="videoPreviewUrl"
            controls
            class="video-player"
            @error="handleVideoError"
          >
            Your browser does not support the video tag.
          </video>
          <div v-else class="no-video">
            <i class="ri-video-off-line"></i>
            <p>{{ $t('research.seedPromotion.detail.noVideo') }}</p>
          </div>
        </div>
      </div> -->

      <!-- 基本信息 -->
      <div class="detail-section">
        <h2 class="section-title">
          <i class="ri-information-line"></i>
          {{ $t('research.seedPromotion.detail.basicInfo') }}
        </h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">{{ $t('research.seedPromotion.columns.promotionId') }}</span>
            <span class="value">{{ detailData.promotionId || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.seedPromotion.columns.title') }}</span>
            <span class="value">{{ detailData.title || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.seedPromotion.columns.recommendedVarieties') }}</span>
            <span class="value">{{ detailData.recommendedVarieties || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.seedPromotion.columns.publishTime') }}</span>
            <span class="value">{{ detailData.publishTime || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.seedPromotion.columns.validPeriod') }}</span>
            <span class="value">{{ detailData.validPeriod }} {{ $t('research.seedPromotion.columns.validPeriod') }}</span>
          </div>
          <div class="info-item full-width" v-if="detailData.promotionSummary">
            <span class="label">{{ $t('research.seedPromotion.form.promotionSummary') }}</span>
            <span class="value description">{{ detailData.promotionSummary }}</span>
          </div>
        </div>
      </div>

      <!-- 统计信息 -->
      <div class="detail-section">
        <h2 class="section-title">
          <i class="ri-bar-chart-line"></i>
          {{ $t('research.seedPromotion.detail.statistics') }}
        </h2>
        <div class="statistics-cards">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="ri-eye-line"></i>
            </div>
            <div class="stat-content">
              <div class="stat-label">{{ $t('research.seedPromotion.columns.visitCount') }}</div>
              <div class="stat-value">{{ detailData.visitCount || 0 }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="ri-calendar-line"></i>
            </div>
            <div class="stat-content">
              <div class="stat-label">{{ $t('research.seedPromotion.card.validUntil') }}</div>
              <div class="stat-value">{{ formatValidUntil(detailData.publishTime, detailData.validPeriod) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分享链接 -->
      <div class="detail-section" v-if="detailData.shareLink">
        <h2 class="section-title">
          <i class="ri-share-line"></i>
          {{ $t('research.seedPromotion.shareLink') }}
        </h2>
        <div class="share-link-box">
          <el-input
            :model-value="detailData.shareLink"
            readonly
            class="share-input"
          />
          <el-button type="primary" @click="handleCopyLink(detailData.shareLink)">
            <i class="ri-file-copy-line"></i>
            {{ $t('research.seedPromotion.copyLink') }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getPromotionDetail, updateVisitCount } from '@/api/seedPromotion'
import { getFilePreviewUrl } from '@/api/file'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref({})
const videoPreviewUrl = ref('')

// 获取详情
const fetchDetail = async () => {
  const promotionId = route.params.promotionId
  if (!promotionId) {
    ElMessage.error(t('common.invalidParams'))
    router.back()
    return
  }

  loading.value = true
  try {
    const response = await getPromotionDetail(promotionId)
    if (response.code === 200 && response.data) {
      detailData.value = response.data

      // 获取视频预览URL
      if (detailData.value.videoUrl) {
        await loadVideoPreviewUrl(detailData.value.videoUrl)
      }

      // 更新访问次数
      updateVisitCount(promotionId).catch(err => {
        console.error('Failed to update visit count:', err)
      })
    } else {
      ElMessage.error(response.msg || t('common.loadFailed'))
      router.back()
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
    router.back()
  } finally {
    loading.value = false
  }
}

// 加载视频预览URL
const loadVideoPreviewUrl = async (fileId) => {
  // try {
  //   const res = await getFilePreviewUrl(fileId)
  //   if (res.code === 200 && res.msg) {
  //     videoPreviewUrl.value = res.msg
  //   } else {
  //     console.error('Failed to get video preview URL:', res.msg)
  //   }
  // } catch (error) {
  //   console.error('Failed to get video preview URL:', error)
  // }
}

// 处理视频加载错误
const handleVideoError = () => {
  ElMessage.warning(t('common.videoLoadFailed'))
}

// 返回
const handleBack = () => {
  router.back()
}

// 复制链接
const handleCopyLink = async (link) => {
  try {
    await navigator.clipboard.writeText(link)
    ElMessage.success(t('research.seedPromotion.linkCopied'))
  } catch (error) {
    console.error('Failed to copy link:', error)
    // 降级方案
    const textarea = document.createElement('textarea')
    textarea.value = link
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
      ElMessage.success(t('research.seedPromotion.linkCopied'))
    } catch (err) {
      ElMessage.error(t('common.failed'))
    }
    document.body.removeChild(textarea)
  }
}

// 格式化有效期至日期
const formatValidUntil = (publishTime, validPeriod) => {
  if (!publishTime || !validPeriod) return '-'
  const date = new Date(publishTime)
  date.setDate(date.getDate() + validPeriod)
  return date.toISOString().split('T')[0]
}

onMounted(() => {
  fetchDetail()
})
</script>

<style scoped lang="scss">
.seed-promotion-detail-page {
  padding: 24px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  min-height: calc(100vh - 60px);
}

/* 页面头部 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 32px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 154, 68, 0.2);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.header-icon-wrapper {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 40px;
    color: white;
  }
}

.header-text {
  color: white;
  flex: 1;

  .page-title {
    font-size: 28px;
    font-weight: 600;
    margin: 0 0 8px 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .page-subtitle {
    font-size: 16px;
    opacity: 0.95;
    margin: 0;
  }
}

.header-actions {
  display: flex;
  gap: 12px;
}

/* 详情内容 */
.detail-content {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.detail-section {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e4e7ed;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  &.video-section {
    .video-container {
      width: 100%;
      background: #000;
      border-radius: 12px;
      overflow: hidden;
      position: relative;

      .video-player {
        width: 100%;
        max-height: 600px;
        display: block;
      }

      .no-video {
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #909399;

        i {
          font-size: 80px;
          margin-bottom: 16px;
        }

        p {
          font-size: 16px;
          margin: 0;
        }
      }
    }
  }
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #e8f5e9;

  i {
    font-size: 22px;
    color: #009A44;
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &.full-width {
    grid-column: 1 / -1;
  }

  .label {
    font-size: 13px;
    color: #909399;
    font-weight: 500;
  }

  .value {
    font-size: 15px;
    color: #303133;
    font-weight: 500;
    word-break: break-word;

    &.description {
      line-height: 1.8;
      padding: 12px;
      background: #f5f7fa;
      border-radius: 8px;
    }
  }
}

/* 统计卡片 */
.statistics-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%);
  border-radius: 12px;
  border: 1px solid #e4e7ed;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 154, 68, 0.15);
    transform: translateY(-2px);
  }

  .stat-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 32px;
      color: white;
    }
  }

  .stat-content {
    flex: 1;

    .stat-label {
      font-size: 13px;
      color: #909399;
      margin-bottom: 8px;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 600;
      color: #303133;
    }
  }
}

/* 分享链接 */
.share-link-box {
  display: flex;
  gap: 12px;
  align-items: center;

  .share-input {
    flex: 1;
  }
}

/* 响应式 */
@media screen and (max-width: 768px) {
  .seed-promotion-detail-page {
    padding: 16px;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
  }

  .header-content {
    gap: 12px;
  }

  .header-icon-wrapper {
    width: 60px;
    height: 60px;

    i {
      font-size: 32px;
    }
  }

  .header-text .page-title {
    font-size: 22px;
  }

  .header-actions {
    width: 100%;

    .el-button {
      flex: 1;
    }
  }

  .detail-content {
    padding: 20px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .statistics-cards {
    grid-template-columns: 1fr;
  }

  .share-link-box {
    flex-direction: column;

    .share-input {
      width: 100%;
    }

    .el-button {
      width: 100%;
    }
  }

  .video-container .no-video {
    height: 300px;

    i {
      font-size: 60px;
    }
  }
}
</style>
