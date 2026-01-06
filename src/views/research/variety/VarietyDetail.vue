<template>
  <div class="variety-detail-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <i class="ri-plant-line"></i>
        </div>
        <div class="header-text">
          <h1 class="page-title">{{ detailData.varietyName || $t('research.variety.detail.title') }}</h1>
          <p class="page-subtitle">
            <el-tag v-if="detailData.dataType === 'license'" type="warning" effect="dark" size="small">
              <i class="ri-checkbox-circle-line"></i>
              {{ $t('research.variety.query.autoPublish') }}
            </el-tag>
            <el-tag v-else type="success" effect="dark" size="small">
              <i class="ri-file-list-line"></i>
              {{ $t('research.variety.query.registrationPublish') }}
            </el-tag>
          </p>
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
      <!-- 基本信息 -->
      <div class="detail-section">
        <h2 class="section-title">
          <i class="ri-information-line"></i>
          Basic Info
        </h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">{{ $t('research.variety.query.columns.varietyName') }}</span>
            <span class="value">{{ detailData.varietyName || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.variety.query.columns.cropType') }}</span>
            <span class="value">{{ getLabelByValue('crop_type', detailData.varietyType) || detailData.varietyType || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.variety.query.columns.registerNo') }}</span>
            <span class="value">{{ detailData.registerNo || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.variety.query.columns.enterprise') }}</span>
            <span class="value">{{ detailData.enterpriseName || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- 许可信息（仅许可数据显示） -->
      <div v-if="detailData.dataType === 'license'" class="detail-section">
        <h2 class="section-title">
          <i class="ri-shield-check-line"></i>
          License Info
        </h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">{{ $t('research.variety.query.columns.licenseNo') }}</span>
            <span class="value">{{ detailData.licenseNo || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.variety.query.columns.approvalOrg') }}</span>
            <span class="value">{{ getLabelByValue('approval_org', detailData.approvalOrg) || detailData.approvalOrg || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.variety.query.columns.approvalDate') }}</span>
            <span class="value">{{ detailData.approvalDate || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.variety.query.columns.validPeriod') }}</span>
            <span class="value">
              {{ detailData.validStartDate || '-' }} ~ {{ detailData.validEndDate || '-' }}
            </span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.batchName') }}</span>
            <span class="value">{{ detailData.batchName || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.datasetCode') }}</span>
            <span class="value">{{ detailData.datasetCode || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.licenseStatus') }}</span>
            <span class="value">
              <el-tag
                v-if="detailData.licenseStatus"
                :type="detailData.licenseStatus === 'valid' ? 'success' : detailData.licenseStatus === 'expired' ? 'warning' : 'danger'"
              >
                {{ getLabelByValue('license_status', detailData.licenseStatus) || detailData.licenseStatus }}
              </el-tag>
              <span v-else>-</span>
            </span>
          </div>
          <div v-if="detailData.certificateFile" class="info-item full-width">
            <span class="label">{{ $t('research.breedingLicense.form.certificateFile') }}</span>
            <span class="value file-link" @click="handlePreviewFile(detailData.certificateFile)">
              <i class="ri-file-pdf-line"></i>
              {{ detailData.certificateFileName || $t('research.breedingLicense.form.certificateFile') }}
            </span>
          </div>
        </div>
      </div>

      <!-- 发布信息（仅登记数据显示） -->
      <div v-if="detailData.dataType === 'registration'" class="detail-section">
        <h2 class="section-title">
          <i class="ri-calendar-check-line"></i>
          {{ $t('research.variety.detail.publishInfo') }}
        </h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">{{ $t('research.variety.detail.publishDate') }}</span>
            <span class="value">{{ detailData.publishDate || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.variety.detail.publishDept') }}</span>
            <span class="value">{{ detailData.publishDept || '-' }}</span>
          </div>
          <div class="info-item full-width" v-if="detailData.recommendedRegion">
            <span class="label">{{ $t('research.variety.detail.recommendedRegion') }}</span>
            <span class="value">{{ detailData.recommendedRegion }}</span>
          </div>
        </div>
      </div>

      <!-- 描述信息 -->
      <div v-if="detailData.baseInfo || detailData.sowingGuide" class="detail-section">
        <h2 class="section-title">
          <i class="ri-file-text-line"></i>
          {{ $t('research.variety.detail.description') }}
        </h2>
        <div class="description-content">
          <div v-if="detailData.baseInfo" class="description-block">
            <h4>{{ $t('research.variety.detail.publicDescription') }}</h4>
            <p>{{ detailData.baseInfo }}</p>
          </div>
          <div v-if="detailData.sowingGuide" class="description-block">
            <h4>{{ $t('research.variety.detail.sowingGuide') }}</h4>
            <p>{{ detailData.sowingGuide }}</p>
          </div>
          <div v-if="detailData.decisionExplanation" class="description-block">
            <h4>{{ $t('research.variety.detail.decisionExplanation') }}</h4>
            <p>{{ detailData.decisionExplanation }}</p>
          </div>
        </div>
      </div>

      <!-- 操作信息（许可数据） -->
      <div v-if="detailData.dataType === 'license' && detailData.createdTime" class="detail-section">
        <h2 class="section-title">
          <i class="ri-time-line"></i>
          {{ $t('research.breedingLicense.form.operationInfo') }}
        </h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.createTime') }}</span>
            <span class="value">{{ detailData.createdTime || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breedingLicense.form.createBy') }}</span>
            <span class="value">{{ detailData.createdByName || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- 图片区域 -->
      <div v-if="detailData.photoUrl" class="detail-section">
        <h2 class="section-title">
          <i class="ri-image-line"></i>
          {{ $t('research.variety.detail.photo') }}
        </h2>
        <div class="photo-container">
          <el-image
            :src="detailData.photoUrl"
            :preview-src-list="[detailData.photoUrl]"
            fit="cover"
            class="variety-image"
          />
        </div>
      </div>

      <!-- 推广视频区域 -->
      <div v-if="promotionVideos.length > 0" class="detail-section">
        <h2 class="section-title">
          <i class="ri-movie-line"></i>
          {{ $t('research.variety.detail.promotionVideos') }}
        </h2>
        <div class="promotion-videos-grid">
          <div
            v-for="video in promotionVideos"
            :key="video.promotionId"
            class="video-card"
            @click="handleViewPromotion(video)"
          >
            <div class="video-thumbnail">
              <i class="ri-play-circle-line play-icon"></i>
              <div class="video-duration">{{ video.validPeriod }} {{ $t('common.days') }}</div>
            </div>
            <div class="video-info">
              <div class="video-title">{{ video.title }}</div>
              <div class="video-meta">
                <span class="meta-item">
                  <i class="ri-calendar-line"></i>
                  {{ formatDate(video.publishTime) }}
                </span>
                <span class="meta-item">
                  <i class="ri-eye-line"></i>
                  {{ video.visitCount || 0 }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="promotionVideos.length === 0" class="no-videos">
          <i class="ri-movie-off-line"></i>
          <p>{{ $t('research.variety.detail.noPromotionVideos') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getVarietyPublicDetail } from '@/api/seedPromotion'
import { getPromotionByVariety } from '@/api/seedPromotion'
import { getFilePreviewUrl } from '@/api/file'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

// 字典数据
const { getLabelByValue } = useDict(['crop_type', 'license_status', 'approval_org'])

const loading = ref(false)
const detailData = ref({})
const promotionVideos = ref([])

// 获取详情
const fetchDetail = async () => {
  const publishId = route.params.publishId
  if (!publishId) {
    ElMessage.error(t('common.invalidParams'))
    router.back()
    return
  }

  loading.value = true
  try {
    const response = await getVarietyPublicDetail(publishId)
    if (response.code === 200 && response.data) {
      detailData.value = response.data

      // 加载关联的推广视频
      if (detailData.value.varietyName) {
        fetchPromotionVideos(detailData.value.varietyName)
      }
    } else {
      ElMessage.error(response.msg || t('common.loadFailed'))
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

// 获取推广视频
const fetchPromotionVideos = async (varietyName) => {
  try {
    const response = await getPromotionByVariety(varietyName)
    if (response.code === 200) {
      promotionVideos.value = response.data || []
    }
  } catch (error) {
    console.error('Failed to load promotion videos:', error)
  }
}

// 查看推广视频详情
const handleViewPromotion = (video) => {
  router.push({
    name: 'SeedPromotionDetail',
    params: { promotionId: video.promotionId }
  })
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toISOString().split('T')[0]
}

// 返回
const handleBack = () => {
  router.back()
}

// 预览文件
const handlePreviewFile = async (fileId) => {
  if (!fileId) return

  try {
    const res = await getFilePreviewUrl(fileId)
    if (res.code === 200 && res.msg) {
      window.open(res.msg, '_blank')
    } else {
      ElMessage.error(t('common.previewFailed'))
    }
  } catch (error) {
    console.error('Failed to preview file:', error)
    ElMessage.error(t('common.failed'))
  }
}

onMounted(() => {
  fetchDetail()
})
</script>

<style scoped lang="scss">
.variety-detail-page {
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
  box-shadow: 0 4px 16px rgba(254, 221, 0, 0.3);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
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

  .page-title {
    font-size: 28px;
    font-weight: 600;
    margin: 0 0 8px 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .page-subtitle {
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
  }
}

.file-link {
  color: #009A44 !important;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s;

  &:hover {
    color: #007a36 !important;
    text-decoration: underline;
  }

  i {
    font-size: 16px;
  }
}

/* 描述内容 */
.description-content {
  .description-block {
    margin-bottom: 20px;
    padding: 16px;
    background: #f5f7fa;
    border-radius: 8px;

    &:last-child {
      margin-bottom: 0;
    }

    h4 {
      margin: 0 0 12px 0;
      font-size: 14px;
      font-weight: 600;
      color: #606266;
    }

    p {
      margin: 0;
      font-size: 14px;
      color: #303133;
      line-height: 1.8;
    }
  }
}

/* 图片区域 */
.photo-container {
  .variety-image {
    width: 100%;
    max-height: 400px;
    border-radius: 8px;
    overflow: hidden;
  }
}

/* 推广视频区域 */
.promotion-videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.video-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e4e7ed;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 154, 68, 0.15);
    transform: translateY(-2px);
    border-color: #009A44;

    .play-icon {
      transform: scale(1.1);
    }
  }

  .video-thumbnail {
    position: relative;
    height: 180px;
    background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
    display: flex;
    align-items: center;
    justify-content: center;

    .play-icon {
      font-size: 64px;
      color: white;
      transition: all 0.3s;
      opacity: 0.9;
    }

    .video-duration {
      position: absolute;
      bottom: 12px;
      right: 12px;
      padding: 4px 12px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      font-size: 12px;
      border-radius: 4px;
    }
  }

  .video-info {
    padding: 16px;

    .video-title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      margin-bottom: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .video-meta {
      display: flex;
      gap: 16px;
      font-size: 13px;
      color: #909399;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 4px;

        i {
          font-size: 14px;
        }
      }
    }
  }
}

.no-videos {
  text-align: center;
  padding: 60px 20px;
  color: #909399;

  i {
    font-size: 64px;
    margin-bottom: 16px;
    display: block;
  }

  p {
    font-size: 16px;
    margin: 0;
  }
}

/* 响应式 */
@media screen and (max-width: 768px) {
  .variety-detail-page {
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

  .promotion-videos-grid {
    grid-template-columns: 1fr;
  }
}
</style>
