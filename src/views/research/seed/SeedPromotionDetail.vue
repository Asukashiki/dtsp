<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <PageHeader icon="ri-movie-line" :title="detailData.title || $t('research.seedPromotion.detail.title')" shadow
        show-back @back="handleBack">
        <template #subtitle>
          <div class="header-subtitle">{{ detailData.enterpriseName }}</div>
        </template>
      </PageHeader>

      <!-- 详情内容 -->
      <div class="content-wrapper" v-loading="loading">
        <!-- 基本信息 -->
        <InfoCard :title="$t('research.seedPromotion.detail.basicInfo')" icon="ri-information-line">
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('research.seedPromotion.columns.promotionId')">
              {{ detailData.promotionId || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.seedPromotion.columns.title')">
              <span class="highlight-text">{{ detailData.title || '-' }}</span>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.seedPromotion.columns.recommendedVarieties')">
              {{ detailData.recommendedVarieties || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.seedPromotion.columns.publishTime')">
              {{ detailData.publishTime || '-' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.seedPromotion.columns.validPeriod')">
              {{ detailData.validPeriod }} {{ $t('common.days') }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.seedPromotion.card.validUntil')">
              {{ formatValidUntil(detailData.publishTime, detailData.validPeriod) }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('research.seedPromotion.form.promotionSummary')" :span="2">
              <div class="summary-box">{{ detailData.promotionSummary || '-' }}</div>
            </el-descriptions-item>
          </el-descriptions>
        </InfoCard>

        <!-- 统计与分享 -->
        <el-row :gutter="20">
          <el-col :md="12" :sm="24">
            <InfoCard :title="$t('research.seedPromotion.detail.statistics')" icon="ri-bar-chart-line">
              <div class="statistics-grid">
                <div class="stat-item">
                  <div class="stat-icon-box blue">
                    <i class="ri-eye-line"></i>
                  </div>
                  <div class="stat-info">
                    <div class="stat-label">{{ $t('research.seedPromotion.columns.visitCount') }}</div>
                    <div class="stat-value">{{ detailData.visitCount || 0 }}</div>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon-box green">
                    <i class="ri-calendar-event-line"></i>
                  </div>
                  <div class="stat-info">
                    <div class="stat-label">{{ $t('research.seedPromotion.columns.publishTime') }}</div>
                    <div class="stat-value small">{{ detailData.publishTime || '-' }}</div>
                  </div>
                </div>
              </div>
            </InfoCard>
          </el-col>
          <el-col :md="12" :sm="24">
            <InfoCard :title="$t('research.seedPromotion.shareLink')" icon="ri-share-line" v-if="detailData.shareLink">
              <div class="share-container">
                <el-input :model-value="detailData.shareLink" readonly class="share-input">
                  <template #append>
                    <el-button type="primary" @click="handleCopyLink(detailData.shareLink)">
                      <i class="ri-file-copy-line"></i> {{ $t('research.seedPromotion.copyLink') }}
                    </el-button>
                  </template>
                </el-input>
                <div class="share-tip">{{ $t('research.seedPromotion.shareTip') }}</div>
              </div>
            </InfoCard>
          </el-col>
        </el-row>

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
import { getPromotionDetail, updateVisitCount } from '@/api/seedPromotion'
import { PageHeader, InfoCard } from '@/components/common'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const loading = ref(false)
const detailData = ref({})

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

<script>
// For i18n detection if needed
export default {
  name: 'SeedPromotionDetail'
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/page-common.scss';

.header-subtitle {
  margin-top: 4px;
  font-size: 15px;
  color: var(--el-text-color-regular);
}

.highlight-text {
  color: var(--el-color-primary);
  font-weight: 600;
}

.summary-box {
  padding: 12px 16px;
  background-color: #f8fafc;
  border-radius: 8px;
  line-height: 1.8;
  color: #475569;
}

.statistics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;

  .stat-icon-box {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: white;

    &.blue {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    }

    &.green {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }
  }

  .stat-info {
    .stat-label {
      font-size: 12px;
      color: #94a3b8;
      margin-bottom: 4px;
    }

    .stat-value {
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;

      &.small {
        font-size: 14px;
      }
    }
  }
}

.share-container {
  .share-input {
    :deep(.el-input-group__append) {
      background-color: var(--el-color-primary);
      color: white;
      border: none;
      padding: 0 20px;
      cursor: pointer;

      &:hover {
        opacity: 0.9;
      }
    }
  }

  .share-tip {
    margin-top: 12px;
    font-size: 13px;
    color: #94a3b8;
    display: flex;
    align-items: center;
    gap: 4px;

    &::before {
      content: 'ℹ';
      display: inline-block;
    }
  }
}

.form-actions {
  display: flex;
  justify-content: center;
  padding: 24px 0;
}
</style>
