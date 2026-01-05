<template>
  <div class="breeding-detail-page">
    <!-- 页面头部 -->
    <div class="page-header">
        <div class="header-left">
          <el-button @click="handleBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </div>
        <div class="header-content">
          <h1 class="page-title">{{ $t('batchCollection.detail') }}</h1>
          <p class="batch-id" v-if="data.batchId">{{ data.batchId }}</p>
        </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper" v-loading="loading">
      <div class="tab-content" v-if="!loading && data.id">
        <!-- 状态概览卡片 -->
        <div class="status-overview-card">
          <div class="overview-item">
            <i class="ri-seedling-line"></i>
            <div class="overview-content">
              <span class="overview-label">{{ $t('batchCollection.form.varietyName') }}</span>
              <span class="overview-value">{{ data.varietyName || '-' }}</span>
            </div>
          </div>
          <div class="overview-divider"></div>
          <div class="overview-item">
            <i class="ri-plant-line"></i>
            <div class="overview-content">
              <span class="overview-label">{{ $t('batchCollection.form.cropType') }}</span>
              <span class="overview-value">
                <el-tag size="small">{{ cropTypeLabel || '-' }}</el-tag>
              </span>
            </div>
          </div>
          <div class="overview-divider"></div>
          <div class="overview-item">
            <i class="ri-checkbox-circle-line"></i>
            <div class="overview-content">
              <span class="overview-label">{{ $t('batchCollection.form.breedingLevel') }}</span>
              <span class="overview-value">
                <el-tag type="success">{{ data.breedingLevel || '-' }}</el-tag>
              </span>
            </div>
          </div>
        </div>

        <!-- 批次基本信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            <span>{{ $t('batchCollection.form.batchInfo') }}</span>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('batchCollection.columns.batchId') }}</span>
              <span class="value">{{ data.batchId || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('batchCollection.form.breedingBatchId') }}</span>
              <span class="value">{{ data.breedingBatchId || '-' }}</span>
            </div>
            <div class="info-item full-width">
              <span class="label">{{ $t('batchCollection.form.parentalSeedSource') }}</span>
              <span class="value">{{ data.parentalSeedSource || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 采集数据信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-bar-chart-box-line"></i>
            <span>{{ $t('batchCollection.form.collectionInfo') }}</span>
          </div>
          <div class="info-grid">
            <div class="info-item highlight">
              <span class="label">{{ $t('batchCollection.form.toMultiplyQuantity') }}</span>
              <span class="value metric">
                <span class="number">{{ data.toMultiplyQuantity || '-' }}</span>
                <span class="unit" v-if="data.toMultiplyQuantity">kg</span>
              </span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('batchCollection.form.collectionDate') }}</span>
              <span class="value">{{ data.collectionDate || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('batchCollection.form.operator') }}</span>
              <span class="value">{{ data.operator || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 登记信息 -->
        <div class="detail-section" v-if="data.createBy || data.createTime">
          <div class="section-title">
            <i class="ri-user-line"></i>
            <span>{{ $t('common.registrationInfo') }}</span>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">{{ $t('common.createBy') }}</span>
              <span class="value">{{ data.createBy || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('common.createTime') }}</span>
              <span class="value">{{ data.createTime || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 备注 -->
        <div class="detail-section" v-if="data.remark">
          <div class="section-title">
            <i class="ri-file-text-line"></i>
            <span>{{ $t('common.remarks') }}</span>
          </div>
          <div class="remark-content">
            {{ data.remark }}
          </div>
        </div>
      </div>

      <div v-else-if="!loading" class="empty-state">
        <i class="ri-inbox-line"></i>
        <p>{{ $t('common.noData') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getOseBatchCollectionDetail } from '@/api/breeding'
import { useDict } from '@/hooks/useDict'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const data = ref({})
const loading = ref(false)

// 使用字典获取作物类型
const { getLabelByValue } = useDict(['crop_type'])

// 计算属性：作物类型显示 label
const cropTypeLabel = computed(() => {
  return data.value.cropType ? getLabelByValue('crop_type', data.value.cropType) : ''
})

// 加载详情数据
const loadDetail = async () => {
  const id = route.params.id
  if (!id) {
    ElMessage.error(t('common.paramError'))
    router.back()
    return
  }

  loading.value = true
  try {
    const res = await getOseBatchCollectionDetail(id)
    if (res.code === 200) {
      data.value = res.data || {}
    } else {
      ElMessage.error(res.msg || t('common.loadFailed'))
    }
  } catch (error) {
    console.error('Failed to load detail:', error)
    ElMessage.error(t('common.loadFailed'))
  } finally {
    loading.value = false
  }
}

const handleBack = () => {
  router.back()
}

onMounted(() => {
  loadDetail()
})
</script>

<style scoped>

/* ========== 状态概览卡片 ========== */
.status-overview-card {
  display: flex;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.03) 0%, rgba(254, 221, 0, 0.03) 100%);
  border: 1px solid rgba(0, 154, 68, 0.1);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  gap: 24px;
}

.overview-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 16px;
}

.overview-item > i {
  font-size: 32px;
  color: #009A44;
  flex-shrink: 0;
}

.overview-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.overview-label {
  font-size: 13px;
  color: #909399;
  white-space: nowrap;
}

.overview-value {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  overflow: hidden;
  text-overflow: ellipsis;
}

.overview-divider {
  width: 1px;
  height: 48px;
  background: rgba(0, 0, 0, 0.06);
  flex-shrink: 0;
}

/* ========== 详情区块 ========== */
.detail-section {
  margin-bottom: 32px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.05) 100%);
  border-left: 4px solid #009A44;
  margin-bottom: 20px;
  border-radius: 4px;
}

.section-title i {
  font-size: 18px;
  color: #009A44;
}

/* ========== 信息网格 ========== */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-item.highlight {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.02) 0%, rgba(254, 221, 0, 0.02) 100%);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid rgba(0, 154, 68, 0.1);
}

.info-item .label {
  font-size: 13px;
  color: #909399;
  font-weight: 500;
}

.info-item .value {
  font-size: 15px;
  color: #303133;
  word-break: break-word;
}

.info-item .value.metric {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.info-item .value.metric .number {
  font-size: 24px;
  font-weight: 600;
  color: #009A44;
}

.info-item .value.metric .unit {
  font-size: 14px;
  color: #606266;
}

/* ========== 备注内容 ========== */
.remark-content {
  padding: 16px;
  background: #f5f7fa;
  border-radius: 8px;
  color: #606266;
  line-height: 1.6;
  white-space: pre-wrap;
}

/* ========== 空状态 ========== */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #909399;
}

.empty-state i {
  font-size: 64px;
  margin-bottom: 16px;
  display: block;
  opacity: 0.5;
}

/* ========== 响应式设计 ========== */
@media screen and (max-width: 768px) {
  .page-header {
    padding: 16px;
    margin-bottom: 16px;
  }

  .header-content {
    flex-direction: column;
    gap: 12px;
  }

  .header-left,
  .header-right {
    width: 100%;
  }

  .header-center {
    padding: 0;
    order: -1;
  }

  .page-title {
    font-size: 20px;
  }

  .content-wrapper {
    padding: 0 16px 16px;
  }

  .tab-content {
    padding: 20px;
    border-radius: 12px;
  }

  .status-overview-card {
    flex-direction: column;
    gap: 16px;
    padding: 20px;
  }

  .overview-divider {
    display: none;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .detail-section {
    margin-bottom: 24px;
  }

  .section-title {
    font-size: 15px;
    padding: 10px 12px;
  }
}
</style>
