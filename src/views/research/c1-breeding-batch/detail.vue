<template>
  <div class="batch-detail-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <el-button @click="goBack">
            <i class="ri-arrow-left-line"></i>
            {{ $t('common.back') }}
          </el-button>
        </div>
        <div class="header-center">
          <h1 class="page-title">{{ $t('research.c1BreedingBatch.detail.title') }}</h1>
          <p class="batch-id" v-if="batchInfo">{{ batchInfo.batchId }}</p>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="handleEdit" v-if="batchInfo && !isReadonly">
            <i class="ri-edit-line"></i>
            {{ $t('common.edit') }}
          </el-button>
        </div>
      </div>
    </div>

    <!-- Tab标签页 -->
    <div class="content-wrapper">
      <el-tabs v-model="activeTab" class="batch-tabs">
        <!-- Tab 1: 基本信息 -->
        <el-tab-pane :label="$t('research.c1BreedingBatch.detail.tabs.basicInfo')" name="basic">
          <div class="tab-content" v-if="batchInfo">
            <!-- 状态概览卡片 -->
            <div class="status-overview-card">
              <div class="overview-item">
                <i class="ri-seedling-line"></i>
                <div class="overview-content">
                  <span class="overview-label">{{ $t('research.c1BreedingBatch.form.varietyName') }}</span>
                  <span class="overview-value">{{ batchInfo.varietyName }}</span>
                </div>
              </div>
              <div class="overview-divider"></div>
              <div class="overview-item">
                <i class="ri-plant-line"></i>
                <div class="overview-content">
                  <span class="overview-label">{{ $t('research.c1BreedingBatch.form.cropType') }}</span>
                  <span class="overview-value">
                    <el-tag size="small">{{ batchInfo.cropType }}</el-tag>
                  </span>
                </div>
              </div>
              <div class="overview-divider"></div>
              <div class="overview-item">
                <i class="ri-checkbox-circle-line"></i>
                <div class="overview-content">
                  <span class="overview-label">{{ $t('research.c1BreedingBatch.columns.status') }}</span>
                  <span class="overview-value">
                    <el-tag :type="getStatusTagType(batchInfo.batchStatus)">
                      {{ getStatusName(batchInfo.batchStatus) }}
                    </el-tag>
                  </span>
                </div>
              </div>
            </div>

            <!-- 基本信息 -->
            <div class="detail-section">
              <div class="section-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.c1BreedingBatch.detail.basicInfo') }}</span>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">{{ $t('research.c1BreedingBatch.form.batchId') }}</span>
                  <span class="value">{{ batchInfo.batchId }}</span>
                </div>
                <!-- <div class="info-item">
                  <span class="label">{{ $t('research.c1BreedingBatch.form.breedingLevel') }}</span>
                  <span class="value">
                    <el-tag size="small">{{ getBreedingLevelName(batchInfo.breedingLevel) }}</el-tag>
                  </span>
                </div>
                <div class="info-item full-width">
                  <span class="label">{{ $t('research.c1BreedingBatch.form.parentSeedSource') }}</span>
                  <span class="value">{{ batchInfo.parentSeedSource || '-' }}</span>
                </div> -->
                <div class="info-item full-width">
                  <span class="label">{{ $t('research.c1BreedingBatch.form.location') }}</span>
                  <span class="value">{{ batchInfo.location || '-' }}</span>
                </div>
              </div>
            </div>

            <!-- 时间节点 -->
            <div class="detail-section">
              <div class="section-title">
                <i class="ri-calendar-line"></i>
                <span>{{ $t('research.c1BreedingBatch.detail.timeline') }}</span>
              </div>
              <div class="timeline-grid">
                <div class="timeline-item">
                  <div class="timeline-dot start"></div>
                  <div class="timeline-content">
                    <span class="timeline-label">{{ $t('research.c1BreedingBatch.form.startDate') }}</span>
                    <span class="timeline-value">{{ batchInfo.startDate || '-' }}</span>
                  </div>
                </div>
                <div class="timeline-connector"></div>
                <div class="timeline-item">
                  <div class="timeline-dot end"></div>
                  <div class="timeline-content">
                    <span class="timeline-label">{{ $t('research.c1BreedingBatch.form.endDate') }}</span>
                    <span class="timeline-value">{{ batchInfo.endDate || '-' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 产量数据 -->
            <div class="detail-section">
              <div class="section-title">
                <i class="ri-bar-chart-box-line"></i>
                <span>{{ $t('research.c1BreedingBatch.detail.yieldData') }}</span>
              </div>
              <div class="info-grid">
                <div class="info-item highlight">
                  <span class="label">{{ $t('research.c1BreedingBatch.form.expectedYield') }}</span>
                  <span class="value metric">
                    <span class="number">{{ batchInfo.expectedYield || '-' }}</span>
                    <span class="unit" v-if="batchInfo.expectedYield">kg</span>
                  </span>
                </div>
                <div class="info-item highlight">
                  <span class="label">{{ $t('research.c1BreedingBatch.form.actualYield') }}</span>
                  <span class="value metric">
                    <span class="number">{{ batchInfo.actualYield || '-' }}</span>
                    <span class="unit" v-if="batchInfo.actualYield">kg</span>
                  </span>
                </div>
                <div class="info-item">
                  <span class="label">{{ $t('research.c1BreedingBatch.form.plantingArea') }}</span>
                  <span class="value">{{ batchInfo.plantingArea || '-' }} ha</span>
                </div>
              </div>
            </div>

            <!-- 机构信息 -->
            <div class="detail-section" v-if="batchInfo.orgId || batchInfo.orgName">
              <div class="section-title">
                <i class="ri-building-line"></i>
                <span>{{ $t('research.c1BreedingBatch.detail.orgInfo') }}</span>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">{{ $t('research.c1BreedingBatch.form.orgType') }}</span>
                  <span class="value">{{ batchInfo.orgType || '-' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">{{ $t('research.c1BreedingBatch.form.orgName') }}</span>
                  <span class="value">{{ batchInfo.orgName || '-' }}</span>
                </div>
              </div>
            </div>

            <!-- 备注 -->
            <div class="detail-section" v-if="batchInfo.remark">
              <div class="section-title">
                <i class="ri-file-text-line"></i>
                <span>{{ $t('common.remarks') }}</span>
              </div>
              <div class="remark-content">
                {{ batchInfo.remark }}
              </div>
            </div>
          </div>
          <div v-else class="loading-wrapper">
            <el-skeleton :rows="5" animated />
          </div>
        </el-tab-pane>

        <!-- Tab 2: 跟踪记录 -->
        <el-tab-pane :label="$t('research.c1BreedingBatch.detail.tabs.trackingRecords')" name="tracking">
          <div class="tab-content">
            <TrackingList v-if="batchInfo" :batch-id="batchInfo.batchId" :readonly="isReadonly" @refresh="loadBatchDetail" />
          </div>
        </el-tab-pane>

        <!-- Tab 3: 检测记录 -->
        <el-tab-pane :label="$t('research.c1BreedingBatch.detail.tabs.testRecords')" name="test">
          <div class="tab-content">
            <TestList v-if="batchInfo" :batch-id="batchInfo.batchId" :readonly="isReadonly" @refresh="loadBatchDetail" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { getC1BreedingBatchById } from '@/api/c1BreedingBatch'
import TrackingList from './components/TrackingList.vue'
import TestList from './components/TestList.vue'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const activeTab = ref('basic')
const batchInfo = ref(null)

// 是否只读模式（从审核页面进入）
const isReadonly = computed(() => route.query.readonly === 'true')

// 繁殖级别映射
const breedingLevelMap = computed(() => ({
  '01': t('research.c1BreedingBatch.breedingLevel.parentPrep'),
  '02': t('research.c1BreedingBatch.breedingLevel.original'),
  '03': t('research.c1BreedingBatch.breedingLevel.foundation'),
  '04': t('research.c1BreedingBatch.breedingLevel.certified')
}))

// 状态映射
const statusMap = computed(() => ({
  '01': t('research.c1BreedingBatch.status.ongoing'),
  '02': t('research.c1BreedingBatch.status.completed'),
  '03': t('research.c1BreedingBatch.status.terminated')
}))

// 初始化
onMounted(async () => {
  await loadBatchDetail()
})

// 加载批次详情
const loadBatchDetail = async () => {
  try {
    const response = await getC1BreedingBatchById(route.params.id)
    if (response.code === 200 && response.data) {
      batchInfo.value = response.data
    } else {
      ElMessage.error(t('research.c1BreedingBatch.messages.loadError'))
    }
  } catch (error) {
    ElMessage.error(t('research.c1BreedingBatch.messages.loadError'))
    console.error(error)
  }
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
    '01': 'primary',
    '02': 'success',
    '03': 'info'
  }
  return map[status] || 'info'
}

// 编辑
const handleEdit = () => {
  router.push(`/research/c1-breeding-batch/edit/${route.params.id}`)
}

// 返回
const goBack = () => {
  router.back()
}
</script>

<style scoped lang="scss">
.batch-detail-page {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 154, 68, 0.2);

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header-left, .header-right {
      min-width: 80px;
    }

    .header-center {
      flex: 1;
      text-align: center;

      .page-title {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
      }

      .batch-id {
        margin: 5px 0 0 0;
        font-size: 14px;
        opacity: 0.9;
      }
    }

    .header-right {
      display: flex;
      justify-content: flex-end;
    }
  }
}

.content-wrapper {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  .batch-tabs {
    :deep(.el-tabs__header) {
      margin-bottom: 20px;
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

      .detail-section {
        background: #fff;
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 16px;
        border: 1px solid #f0f0f0;

        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 2px solid #f0f0f0;

          i {
            font-size: 20px;
            color: #009A44;
          }

          span {
            font-size: 16px;
            font-weight: 600;
            color: #303133;
          }
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;

          .info-item {
            display: flex;
            flex-direction: column;
            gap: 6px;

            &.full-width {
              grid-column: 1 / -1;
            }

            &.highlight {
              background: linear-gradient(135deg, #f0f9f4 0%, #e6f7ed 100%);
              padding: 12px;
              border-radius: 8px;
              border-left: 3px solid #009A44;
            }

            .label {
              font-size: 13px;
              color: #909399;
            }

            .value {
              font-size: 15px;
              color: #303133;
              font-weight: 500;

              &.metric {
                display: flex;
                align-items: baseline;
                gap: 4px;

                .number {
                  font-size: 24px;
                  font-weight: 600;
                  color: #009A44;
                }

                .unit {
                  font-size: 14px;
                  color: #606266;
                }
              }
            }
          }
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

              .timeline-label {
                display: block;
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

        .remark-content {
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
          line-height: 1.6;
          color: #606266;
        }
      }

      .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #909399;

        i {
          font-size: 48px;
          margin-bottom: 12px;
          display: block;
        }
      }
    }
  }
}

.loading-wrapper {
  padding: 20px;
}

@media (max-width: 768px) {
  .page-header .header-content {
    flex-direction: column;
    gap: 12px;

    .header-left, .header-right {
      width: 100%;
      min-width: auto;
    }
  }

  .content-wrapper .batch-tabs .tab-content {
    .status-overview-card {
      flex-direction: column;
      gap: 12px;

      .overview-divider {
        width: 100%;
        height: 1px;
        margin: 0;
      }
    }

    .detail-section .info-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
