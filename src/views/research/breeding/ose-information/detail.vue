<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部（带返回按钮） -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="goBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breeding.detail.title') }}</h1>
            <p class="batch-id" v-if="batchInfo">{{ batchInfo.batchId }}</p>
          </div>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="handleEdit" v-if="batchInfo">
            <i class="ri-edit-line"></i>
            {{ $t('common.edit') }}
          </el-button>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper" v-loading="!batchInfo">
        <!-- Tab标签页 -->
        <el-tabs v-model="activeTab" class="breeding-tabs">
          <!-- Tab 1: 基本信息 -->
          <el-tab-pane :label="$t('research.breeding.detail.tabs.basicInfo')" name="basic">
            <div class="tab-content" v-if="batchInfo">
              <!-- 状态概览卡片 -->
              <div class="status-overview-card">
                <div class="overview-item">
                  <i class="ri-seedling-line"></i>
                  <div class="overview-content">
                    <span class="overview-label">{{ $t('research.breeding.batch.form.varietyName') }}</span>
                    <span class="overview-value">{{ batchInfo.varietyName }}</span>
                  </div>
                </div>
                <div class="overview-divider"></div>
                <div class="overview-item">
                  <i class="ri-plant-line"></i>
                  <div class="overview-content">
                    <span class="overview-label">{{ $t('research.breeding.batch.form.cropType') }}</span>
                    <span class="overview-value">
                      <el-tag size="small">{{ getCropTypeName(batchInfo.cropType) }}</el-tag>
                    </span>
                  </div>
                </div>
                <div class="overview-divider"></div>
                <div class="overview-item">
                  <i class="ri-checkbox-circle-line"></i>
                  <div class="overview-content">
                    <span class="overview-label">{{ $t('research.breeding.batch.form.status') }}</span>
                    <span class="overview-value">
                      <el-tag :type="getStatusTagType(batchInfo.batchStatus)">
                        {{ getStatusName(batchInfo.batchStatus) }}
                      </el-tag>
                    </span>
                  </div>
                </div>
              </div>

              <!-- 基本信息 -->
              <div class="info-card">
                <div class="card-header">
                  <div class="card-title">
                    <i class="ri-information-line"></i>
                    <span>{{ $t('research.breeding.detail.basicInfo') }}</span>
                  </div>
                </div>
                <div class="card-body">
                  <el-descriptions :column="2" border>
                    <el-descriptions-item :label="$t('research.breeding.batch.form.batchId')">
                      {{ batchInfo.batchId }}
                    </el-descriptions-item>
                    <el-descriptions-item :label="$t('research.breeding.breedingBatch.form.distributionId')">
                      {{ batchInfo.distributionId || '-' }}
                    </el-descriptions-item>
                    <el-descriptions-item :label="$t('research.breeding.breedingBatch.form.breedingLevel')">
                      <el-tag size="small">{{ getBreedingLevelName(batchInfo.breedingLevel) }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item :label="$t('research.breeding.breedingBatch.form.parentalSeedSource')">
                      {{ batchInfo.parentSeedSource || '-' }}
                    </el-descriptions-item>
                  </el-descriptions>
                </div>
              </div>

              <!-- 时间节点 -->
              <div class="info-card">
                <div class="card-header">
                  <div class="card-title">
                    <i class="ri-calendar-line"></i>
                    <span>{{ $t('research.breeding.detail.timeline') }}</span>
                  </div>
                </div>
                <div class="card-body">
                  <div class="timeline-grid">
                    <div class="timeline-item">
                      <div class="timeline-dot start"></div>
                      <div class="timeline-content">
                        <span class="timeline-label">{{ $t('research.breeding.batch.form.startDate') }}</span>
                        <span class="timeline-value">{{ batchInfo.startDate || '-' }}</span>
                      </div>
                    </div>
                    <div class="timeline-connector"></div>
                    <div class="timeline-item">
                      <div class="timeline-dot end"></div>
                      <div class="timeline-content">
                        <span class="timeline-label">{{ $t('research.breeding.batch.form.endDate') }}</span>
                        <span class="timeline-value">{{ batchInfo.endDate || '-' }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 产量数据 -->
              <div class="info-card">
                <div class="card-header">
                  <div class="card-title">
                    <i class="ri-bar-chart-box-line"></i>
                    <span>{{ $t('research.breeding.detail.yieldData') }}</span>
                  </div>
                </div>
                <div class="card-body">
                  <el-descriptions :column="2" border>
                    <el-descriptions-item :label="$t('research.breeding.batch.form.expectedYield')">
                      <span v-if="batchInfo.expectedYield">{{ batchInfo.expectedYield }} kg</span>
                      <span v-else>-</span>
                    </el-descriptions-item>
                    <el-descriptions-item :label="$t('research.breeding.batch.form.toMultiplyQuantity')">
                      <span v-if="batchInfo.toMultiplyQuantity">{{ batchInfo.toMultiplyQuantity }} kg</span>
                      <span v-else>-</span>
                    </el-descriptions-item>
                  </el-descriptions>
                </div>
              </div>

              <!-- 机构信息 -->
              <div class="info-card" v-if="batchInfo.orgId || batchInfo.orgName">
                <div class="card-header">
                  <div class="card-title">
                    <i class="ri-building-line"></i>
                    <span>{{ $t('research.breeding.detail.orgInfo') }}</span>
                  </div>
                </div>
                <div class="card-body">
                  <el-descriptions :column="2" border>
                    <el-descriptions-item :label="$t('research.breeding.batch.form.orgId')">
                      {{ batchInfo.orgId || '-' }}
                    </el-descriptions-item>
                    <el-descriptions-item :label="$t('research.breeding.batch.form.orgName')">
                      {{ batchInfo.orgName || '-' }}
                    </el-descriptions-item>
                  </el-descriptions>
                </div>
              </div>

              <!-- 登记信息 -->
              <div class="info-card" v-if="batchInfo.createBy || batchInfo.createTime">
                <div class="card-header">
                  <div class="card-title">
                    <i class="ri-user-line"></i>
                    <span>{{ $t('common.registrationInfo') }}</span>
                  </div>
                </div>
                <div class="card-body">
                  <el-descriptions :column="2" border>
                    <el-descriptions-item :label="$t('common.createBy')">
                      {{ batchInfo.createBy || '-' }}
                    </el-descriptions-item>
                    <el-descriptions-item :label="$t('common.createTime')">
                      {{ batchInfo.createTime || '-' }}
                    </el-descriptions-item>
                  </el-descriptions>
                </div>
              </div>

              <!-- 备注 -->
              <div class="info-card" v-if="batchInfo.remark">
                <div class="card-header">
                  <div class="card-title">
                    <i class="ri-file-text-line"></i>
                    <span>{{ $t('common.remarks') }}</span>
                  </div>
                </div>
                <div class="card-body">
                  <div class="remark-content">
                    {{ batchInfo.remark }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="loading-wrapper">
              <el-skeleton :rows="5" animated />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getBreedingBatchPageDetail } from '@/api/breeding'
import { useDict } from '@/hooks/useDict'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const activeTab = ref('basic')
const batchInfo = ref(null)

// 使用字典获取作物类型
const { getLabelByValue } = useDict(['crop_type'])

// 繁殖级别映射
const breedingLevelMap = computed(() => ({
  '01': t('research.breeding.breedingLevel.parentPrep'),
  '02': t('research.breeding.breedingLevel.original'),
  '03': t('research.breeding.breedingLevel.foundation'),
  '04': t('research.breeding.breedingLevel.certified')
}))

// 状态映射
const statusMap = computed(() => ({
  '01': t('research.breeding.status.ongoing'),
  '02': t('research.breeding.status.completed'),
  '03': t('research.breeding.status.terminated')
}))

// 初始化
onMounted(async () => {
  await loadBatchDetail()
})

// 加载批次详情
const loadBatchDetail = async () => {
  try {
    const response = await getBreedingBatchPageDetail(route.params.id)
    if (response.code === 200 && response.data) {
      batchInfo.value = response.data
    } else {
      ElMessage.error(t('research.breeding.messages.loadError'))
    }
  } catch (error) {
    ElMessage.error(t('research.breeding.messages.loadError'))
    console.error(error)
  }
}

// 获取作物类型名称
const getCropTypeName = (type) => {
  return getLabelByValue('crop_type', type) || type || '-'
}

// 获取繁殖级别名称
const getBreedingLevelName = (level) => {
  return breedingLevelMap.value[level] || level
}

// 获取状态名称
const getStatusName = (status) => {
  return statusMap.value[status] || status
}

// 获取状态标签类型
const getStatusTagType = (status) => {
  const map = {
    '01': 'primary',    // 进行中
    '02': 'success',    // 已完成
    '03': 'info'        // 已中止
  }
  return map[status] || 'info'
}

// 编辑
const handleEdit = () => {
  router.push(`/research/breeding/batch/edit/${route.params.id}`)
}

// 返回
const goBack = () => {
  router.back()
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/page-common.scss';
@use '@/assets/styles/workflow-common.scss';

.content-wrapper {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  .breeding-tabs {
    :deep(.el-tabs__header) {
      margin-bottom: 20px;
    }

    :deep(.el-tabs__item) {
      font-size: 16px;
      font-weight: 500;
    }

    .tab-content {
      .status-overview-card {
        display: flex;
        background: linear-gradient(135deg, #f0f9f4 0%, #e6f7ed 100%);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 20px;
        border: 1px solid #d0ebd9;

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
          margin: 0 16px;
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

      .timeline-grid {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 16px;
        align-items: center;

        .timeline-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;

          .timeline-dot {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 3px solid #009A44;
            background: #fff;

            &.start {
              background: #009A44;
            }

            &.end {
              background: #FEDD00;
              border-color: #FEDD00;
            }
          }

          .timeline-content {
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 4px;

            .timeline-label {
              font-size: 12px;
              color: #909399;
            }

            .timeline-value {
              font-size: 14px;
              font-weight: 600;
              color: #303133;
            }
          }
        }

        .timeline-connector {
          height: 2px;
          background: linear-gradient(90deg, #009A44 0%, #FEDD00 100%);
          min-width: 60px;
        }
      }
    }
  }
}

.loading-wrapper {
  padding: 20px;
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

    .header-right {
      width: 100%;

      .el-button {
        width: 100%;
      }
    }
  }

  .content-wrapper {
    padding: 16px;

    .breeding-tabs {
      :deep(.el-tabs__header) {
        margin-bottom: 16px;
      }

      :deep(.el-tabs__item) {
        font-size: 14px;
        padding: 0 12px;
      }

      .tab-content {
        .status-overview-card {
          flex-direction: column;
          padding: 16px;
          gap: 12px;

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
            width: 100%;
            height: 1px;
            margin: 0;
          }
        }

        .timeline-grid {
          grid-template-columns: 1fr;
          gap: 12px;

          .timeline-connector {
            width: 2px;
            height: 40px;
            min-width: auto;
            justify-self: center;
            background: linear-gradient(180deg, #009A44 0%, #FEDD00 100%);
          }

          .timeline-item {
            .timeline-content {
              .timeline-label {
                font-size: 11px;
              }

              .timeline-value {
                font-size: 13px;
              }
            }
          }
        }

        .remark-content {
          padding: 12px;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
