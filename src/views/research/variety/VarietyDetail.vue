<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader icon="ri-plant-line" :title="detailData.varietyName || $t('research.variety.detail.title')" shadow
        show-back @back="handleBack">
        <template #subtitle>
          <div class="header-tags">
            <el-tag v-if="detailData.dataType === 'license'" type="warning" effect="dark" size="small">
              <i class="ri-checkbox-circle-line"></i>
              {{ $t('research.variety.query.autoPublish') }}
            </el-tag>
            <el-tag v-else-if="detailData.dataType === 'registration'" type="success" effect="dark" size="small">
              <i class="ri-file-list-line"></i>
              {{ $t('research.variety.query.registrationPublish') }}
            </el-tag>
          </div>
        </template>
      </PageHeader>

      <!-- 详情内容 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 基本信息 -->
        <InfoCard :title="$t('common.basicInfo')" icon="ri-information-line">
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('research.variety.query.columns.varietyName')">
              <span class="highlight-text">{{ detailData.varietyName || '-' }}</span>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.variety.query.columns.cropType')">
              {{ getLabelByValue('crop_type', detailData.varietyType) || detailData.varietyType || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.variety.query.columns.registerNo')">
              {{ detailData.registerNo || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.variety.query.columns.enterprise')">
              {{ detailData.enterpriseName || '-' }}
            </el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <!-- 许可信息（仅许可数据显示） -->
        <InfoCard v-if="detailData.dataType === 'license'" :title="$t('research.breedingLicense.form.licenseInfo')"
          icon="ri-shield-check-line">
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('research.variety.query.columns.licenseNo')">
              {{ detailData.licenseNo || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.variety.query.columns.approvalOrg')">
              {{ getLabelByValue('approval_org', detailData.approvalOrg) || detailData.approvalOrg || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.variety.query.columns.approvalDate')">
              {{ detailData.approvalDate || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.variety.query.columns.validPeriod')">
              {{ detailData.validStartDate || '-' }} ~ {{ detailData.validEndDate || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.breedingLicense.form.batchName')">
              {{ detailData.batchName || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.breedingLicense.form.datasetCode')">
              {{ detailData.datasetCode || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.breedingLicense.form.licenseStatus')" :span="2">
              <el-tag v-if="detailData.licenseStatus"
                :type="detailData.licenseStatus === 'valid' ? 'success' : detailData.licenseStatus === 'expired' ? 'warning' : 'danger'">
                {{ getLabelByValue('license_status', detailData.licenseStatus) || detailData.licenseStatus }}
              </el-tag>
              <span v-else>-</span>
            </el-descriptions-item>
            <el-descriptions-item v-if="detailData.certificateFile"
              :label="$t('research.breedingLicense.form.certificateFile')" :span="2">
              <div class="file-link" @click="handlePreviewFile(detailData.certificateFile)">
                <i class="ri-file-pdf-line"></i>
                {{ detailData.certificateFileName || $t('research.breedingLicense.form.certificateFile') }}
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <!-- 发布信息（仅登记数据显示） -->
        <InfoCard v-if="detailData.dataType === 'registration'" :title="$t('research.variety.detail.publishInfo')"
          icon="ri-calendar-check-line">
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('research.variety.detail.publishDate')">
              {{ detailData.publishDate || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.variety.detail.publishDept')">
              {{ detailData.publishDept || '-' }}
            </el-descriptions-item>
            <el-descriptions-item v-if="detailData.recommendedRegion"
              :label="$t('research.variety.detail.recommendedRegion')" :span="2">
              {{ detailData.recommendedRegion }}
            </el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <!-- 描述信息 -->
        <InfoCard v-if="detailData.baseInfo || detailData.sowingGuide || detailData.decisionExplanation"
          :title="$t('research.variety.query.detail.description')" icon="ri-file-text-line">
          <div class="description-content">
            <div v-if="detailData.baseInfo" class="description-block">
              <h4>{{ $t('research.variety.query.detail.publicDescription') }}</h4>
              <p>{{ detailData.baseInfo }}</p>
            </div>
            <div v-if="detailData.sowingGuide" class="description-block">
              <h4>{{ $t('research.variety.query.detail.sowingGuide') }}</h4>
              <p>{{ detailData.sowingGuide }}</p>
            </div>
            <div v-if="detailData.decisionExplanation" class="description-block">
              <h4>{{ $t('research.variety.query.detail.decisionExplanation') }}</h4>
              <p>{{ detailData.decisionExplanation }}</p>
            </div>
          </div>
        </InfoCard>

        <!-- 图片区域 -->
        <InfoCard v-if="detailData.photoUrl" :title="$t('research.variety.detail.photo')" icon="ri-image-line">
          <div class="photo-container">
            <el-image :src="detailData.photoUrl" :preview-src-list="[detailData.photoUrl]" fit="contain"
              class="variety-image" />
          </div>
        </InfoCard>

        <!-- 推广视频区域 -->
        <InfoCard :title="$t('research.variety.query.detail.promotionVideos')" icon="ri-movie-line">
          <div v-if="promotionVideos.length > 0" class="promotion-videos-grid">
            <div v-for="video in promotionVideos" :key="video.promotionId" class="video-card"
              @click="handleViewPromotion(video)">
              <div class="video-thumbnail">
                <i class="ri-play-circle-line play-icon"></i>
                <div class="video-duration">{{ video.validPeriod }} {{ $t('common.days') }}</div>
              </div>
              <div class="video-info">
                <div class="video-title" :title="video.title">{{ video.title }}</div>
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
          <div v-else class="empty-status mini">
            <i class="ri-movie-off-line"></i>
            <p>{{ $t('research.variety.query.detail.noPromotionVideos') }}</p>
          </div>
        </InfoCard>

        <!--系统信息 -->
        <InfoCard v-if="detailData.dataType === 'license' && detailData.createdTime" :title="$t('common.systemInfo')"
          icon="ri-time-line">
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('research.breedingLicense.form.createTime')">
              {{ detailData.createdTime || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.breedingLicense.form.createBy')">
              {{ detailData.createdByName || '-' }}
            </el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <div class="form-actions">
          <el-button @click="handleBack">{{ $t('common.back') }}</el-button>
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
import { getVarietyPublicDetail, getPromotionByVariety } from '@/api/seedPromotion'
import { getFilePreviewUrl } from '@/api/file'
import { useDict } from '@/hooks/useDict'
import { PageHeader, InfoCard } from '@/components/common'

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
@use '@/assets/styles/page-common.scss';

.header-tags {
  margin-top: 8px;
}

.highlight-text {
  color: var(--el-color-primary);
  font-weight: 600;
}

.file-link {
  color: var(--el-color-primary);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
}

.description-content {
  .description-block {
    margin-bottom: 24px;
    padding: 20px;
    background: #f8fafc;
    border-radius: 12px;
    border-left: 4px solid var(--el-color-primary);

    &:last-child {
      margin-bottom: 0;
    }

    h4 {
      margin: 0 0 12px 0;
      font-size: 15px;
      font-weight: 600;
      color: #374151;
    }

    p {
      margin: 0;
      font-size: 14px;
      color: #4b5563;
      line-height: 1.8;
    }
  }
}

.photo-container {
  display: flex;
  justify-content: center;

  .variety-image {
    width: 100%;
    max-width: 800px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.promotion-videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.video-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
    border-color: var(--el-color-primary);

    .play-icon {
      transform: scale(1.15);
      opacity: 1;
    }
  }

  .video-thumbnail {
    position: relative;
    height: 160px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    display: flex;
    align-items: center;
    justify-content: center;

    .play-icon {
      font-size: 48px;
      color: white;
      transition: all 0.3s;
      opacity: 0.8;
    }

    .video-duration {
      position: absolute;
      bottom: 10px;
      right: 10px;
      padding: 2px 10px;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      font-size: 11px;
      border-radius: 4px;
      backdrop-filter: blur(4px);
    }
  }

  .video-info {
    padding: 16px;

    .video-title {
      font-size: 15px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .video-meta {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #6b7280;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }
  }
}

.empty-status.mini {
  padding: 40px 0;

  i {
    font-size: 48px;
  }
}

.form-actions {
  display: flex;
  justify-content: center;
  padding: 24px 0;
}
</style>
