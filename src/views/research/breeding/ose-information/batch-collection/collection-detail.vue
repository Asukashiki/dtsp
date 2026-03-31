<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('batchCollection.detail') }}</h1>
            <p class="batch-id" v-if="data.batchId">{{ data.batchId }}</p>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="loading">
        <div v-if="!loading && data.id">
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
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('batchCollection.form.batchInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('batchCollection.columns.batchId')">
                  {{ data.batchId || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('batchCollection.form.breedingBatchId')">
                  {{ data.breedingBatchId || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('batchCollection.form.parentalSeedSource')">
                  {{ data.parentalSeedSource || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 采集数据信息 -->
          <div class="info-card">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-bar-chart-box-line"></i>
                <span>{{ $t('batchCollection.form.collectionInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('batchCollection.form.toMultiplyQuantity')" :span="1">
                  <span v-if="data.toMultiplyQuantity">{{ data.toMultiplyQuantity }} kg</span>
                  <span v-else>-</span>
                </el-descriptions-item>
                <el-descriptions-item :label="$t('batchCollection.form.collectionDate')">
                  {{ data.collectionDate || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('batchCollection.form.operator')">
                  {{ data.operator || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 登记信息 -->
          <div class="info-card" v-if="data.createBy || data.createTime">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-user-line"></i>
                <span>{{ $t('common.registrationInfo') }}</span>
              </div>
            </div>
            <div class="card-body">
              <el-descriptions :column="2" border>
                <el-descriptions-item :label="$t('common.createBy')">
                  {{ data.createBy || '-' }}
                </el-descriptions-item>
                <el-descriptions-item :label="$t('common.createTime')">
                  {{ data.createTime || '-' }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <!-- 备注 -->
          <div class="info-card" v-if="data.remark">
            <div class="card-header">
              <div class="card-title">
                <i class="ri-file-text-line"></i>
                <span>{{ $t('common.remarks') }}</span>
              </div>
            </div>
            <div class="card-body">
              <div class="remark-content">
                {{ data.remark }}
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="!loading" class="empty-state">
          <i class="ri-inbox-line"></i>
          <p>{{ $t('common.noData') }}</p>
        </div>
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
  return data.value.cropType ? (getLabelByValue('crop_type', data.value.cropType) || data.value.cropType) : ''
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

<style scoped lang="scss">
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';

.content-wrapper {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin: 20px;

  .status-overview-card {
    display: flex;
    background: linear-gradient(135deg, #f0f9f4 0%, #e6f7ed 100%);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #d0ebd9;
    gap: 20px;

    .overview-item {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 12px;

      i {
        font-size: 32px;
        color: #009A44;
      }

      .overview-content {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .overview-label {
          font-size: 13px;
          color: #606266;
        }

        .overview-value {
          font-size: 16px;
          font-weight: 600;
          color: #303133;
        }
      }
    }

    .overview-divider {
      width: 1px;
      background: #d0ebd9;
    }
  }

  .remark-content {
    padding: 16px;
    background: #f8f9fa;
    border-radius: 8px;
    line-height: 1.6;
    color: #606266;
    font-size: 14px;
    white-space: pre-wrap;
    word-break: break-word;
  }
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #909399;

  i {
    font-size: 64px;
    margin-bottom: 16px;
    display: block;
    opacity: 0.5;
  }
}

// 移动端适配
@media screen and (max-width: 768px) {
  .page-header {
    padding: 16px;
    flex-direction: column;
    gap: 12px;

    .header-left {
      width: 100%;

      .header-content {
        .page-title {
          font-size: 20px;
        }

        .batch-id {
          font-size: 13px;
        }
      }
    }
  }

  .content-wrapper {
    padding: 16px;

    .status-overview-card {
      flex-direction: column;
      gap: 12px;
      padding: 16px;

      .overview-item {
        i {
          font-size: 28px;
        }

        .overview-content {
          .overview-label {
            font-size: 12px;
          }

          .overview-value {
            font-size: 15px;
          }
        }
      }

      .overview-divider {
        display: none;
      }
    }

    .remark-content {
      padding: 12px;
      font-size: 13px;
    }
  }

  .empty-state {
    padding: 60px 20px;

    i {
      font-size: 48px;
    }
  }
}
</style>
