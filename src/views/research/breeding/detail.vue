<template>
  <div class="breeding-detail-page">
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
          <h1 class="page-title">{{ $t('research.breeding.detail.title') }}</h1>
          <p class="batch-id" v-if="batchInfo">{{ batchInfo.batchId }}</p>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="handleEdit" v-if="batchInfo">
            <i class="ri-edit-line"></i>
            {{ $t('common.edit') }}
          </el-button>
        </div>
      </div>
    </div>

    <!-- Tab标签页 -->
    <div class="content-wrapper">
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
            <div class="detail-section">
              <div class="section-title">
                <i class="ri-information-line"></i>
                <span>{{ $t('research.breeding.detail.basicInfo') }}</span>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">{{ $t('research.breeding.batch.form.batchId') }}</span>
                  <span class="value">{{ batchInfo.batchId }}</span>
                </div>
                <div class="info-item">
                  <span class="label">{{ $t('research.breeding.batch.form.breedingLevel') }}</span>
                  <span class="value">
                    <el-tag size="small">{{ getBreedingLevelName(batchInfo.breedingLevel) }}</el-tag>
                  </span>
                </div>
                <div class="info-item full-width">
                  <span class="label">{{ $t('research.breeding.batch.form.parentSeedSource') }}</span>
                  <span class="value">{{ batchInfo.parentSeedSource || '-' }}</span>
                </div>
              </div>
            </div>

            <!-- 时间节点 -->
            <div class="detail-section">
              <div class="section-title">
                <i class="ri-calendar-line"></i>
                <span>{{ $t('research.breeding.detail.timeline') }}</span>
              </div>
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

            <!-- 产量数据 -->
            <div class="detail-section">
              <div class="section-title">
                <i class="ri-bar-chart-box-line"></i>
                <span>{{ $t('research.breeding.detail.yieldData') }}</span>
              </div>
              <div class="info-grid">
                <div class="info-item highlight">
                  <span class="label">{{ $t('research.breeding.batch.form.expectedYield') }}</span>
                  <span class="value metric">
                    <span class="number">{{ batchInfo.expectedYield || '-' }}</span>
                    <span class="unit" v-if="batchInfo.expectedYield">kg</span>
                  </span>
                </div>
                <div class="info-item highlight">
                  <span class="label">{{ $t('research.breeding.batch.form.actualYield') }}</span>
                  <span class="value metric">
                    <span class="number">{{ batchInfo.actualYield || '-' }}</span>
                    <span class="unit" v-if="batchInfo.actualYield">kg</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- 统计信息 -->
            <div class="detail-section">
              <div class="section-title">
                <i class="ri-file-list-line"></i>
                <span>{{ $t('research.breeding.detail.relatedRecords') }}</span>
              </div>
              <div class="stats-grid">
                <div class="stat-card" @click="activeTab = 'tracking'">
                  <div class="stat-icon tracking">
                    <i class="ri-map-pin-line"></i>
                  </div>
                  <div class="stat-content">
                    <div class="stat-value">{{ batchInfo.trackingCount || 0 }}</div>
                    <div class="stat-label">{{ $t('research.breeding.detail.trackingCount') }}</div>
                  </div>
                  <i class="ri-arrow-right-s-line stat-arrow"></i>
                </div>
                <div class="stat-card" @click="activeTab = 'test'">
                  <div class="stat-icon test">
                    <i class="ri-test-tube-line"></i>
                  </div>
                  <div class="stat-content">
                    <div class="stat-value">{{ batchInfo.testCount || 0 }}</div>
                    <div class="stat-label">{{ $t('research.breeding.detail.testCount') }}</div>
                  </div>
                  <i class="ri-arrow-right-s-line stat-arrow"></i>
                </div>
              </div>
            </div>

            <!-- 机构信息 -->
            <div class="detail-section" v-if="batchInfo.orgId || batchInfo.orgName">
              <div class="section-title">
                <i class="ri-building-line"></i>
                <span>{{ $t('research.breeding.detail.orgInfo') }}</span>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">{{ $t('research.breeding.batch.form.orgId') }}</span>
                  <span class="value">{{ batchInfo.orgId || '-' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">{{ $t('research.breeding.batch.form.orgName') }}</span>
                  <span class="value">{{ batchInfo.orgName || '-' }}</span>
                </div>
              </div>
            </div>

            <!-- 登记信息 -->
            <div class="detail-section" v-if="batchInfo.createBy || batchInfo.createTime">
              <div class="section-title">
                <i class="ri-user-line"></i>
                <span>{{ $t('common.registrationInfo') }}</span>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">{{ $t('common.createBy') }}</span>
                  <span class="value">{{ batchInfo.createBy || '-' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">{{ $t('common.createTime') }}</span>
                  <span class="value">{{ batchInfo.createTime || '-' }}</span>
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
        <el-tab-pane :label="$t('research.breeding.detail.tabs.trackingRecords')" name="tracking">
          <TrackingList
            v-if="batchInfo"
            :batch-id="batchInfo.batchId"
            @refresh="loadBatchDetail"
          />
        </el-tab-pane>

        <!-- Tab 3: 检测记录 -->
        <el-tab-pane :label="$t('research.breeding.detail.tabs.testRecords')" name="test">
          <TestList
            v-if="batchInfo"
            :batch-id="batchInfo.batchId"
            @refresh="loadBatchDetail"
          />
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
import { getBreedingBatchPageDetail } from '@/api/breeding'
import TrackingList from './components/TrackingList.vue'
import TestList from './components/TestList.vue'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const activeTab = ref('basic')
const batchInfo = ref(null)

// 作物类型映射
const cropTypeMap = computed(() => ({
  'WHEAT': t('research.breeding.cropType.wheat'),
  'CORN': t('research.breeding.cropType.corn'),
  'RICE': t('research.breeding.cropType.rice'),
  'SOYBEAN': t('research.breeding.cropType.soybean'),
  'COTTON': t('research.breeding.cropType.cotton')
}))

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
  return cropTypeMap.value[type] || type
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
.breeding-detail-page {
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

    .header-left {
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
      min-width: 80px;
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

  .breeding-tabs {
    :deep(.el-tabs__header) {
      margin-bottom: 20px;
    }

    :deep(.el-tabs__item) {
      font-size: 16px;
      font-weight: 500;
    }

    .tab-content {
      // 状态概览卡片
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

      // 详情区块
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
              font-weight: 500;
            }

            .value {
              font-size: 15px;
              color: #303133;
              font-weight: 500;
              word-break: break-all;

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

        // 时间线样式
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

        // 统计卡片
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;

          .stat-card {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px;
            background: #f8f9fa;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            border: 1px solid #e9ecef;

            &:hover {
              background: #fff;
              box-shadow: 0 4px 12px rgba(0, 154, 68, 0.15);
              transform: translateY(-2px);
            }

            .stat-icon {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;

              &.tracking {
                background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
              }

              &.test {
                background: linear-gradient(135deg, #FEDD00 0%, #ffc107 100%);
              }

              i {
                font-size: 24px;
                color: #fff;
              }
            }

            .stat-content {
              flex: 1;

              .stat-value {
                font-size: 24px;
                font-weight: 700;
                color: #303133;
                line-height: 1;
                margin-bottom: 4px;
              }

              .stat-label {
                font-size: 13px;
                color: #606266;
              }
            }

            .stat-arrow {
              font-size: 20px;
              color: #909399;
              flex-shrink: 0;
            }
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
    }
  }
}

.loading-wrapper {
  padding: 20px;
}

// 移动端适配
@media screen and (max-width: 768px) {
  .breeding-detail-page {
    padding: 12px;
  }

  .page-header {
    padding: 16px;
    margin-bottom: 16px;

    .header-content {
      flex-direction: column;
      gap: 12px;

      .header-left,
      .header-right {
        width: 100%;
        min-width: auto;
      }

      .header-left {
        display: flex;
        justify-content: flex-start;
      }

      .header-right {
        justify-content: stretch;

        .el-button {
          width: 100%;
        }
      }

      .header-center {
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

        .detail-section {
          padding: 16px;
          margin-bottom: 12px;

          .section-title {
            margin-bottom: 12px;
            padding-bottom: 10px;

            i {
              font-size: 18px;
            }

            span {
              font-size: 15px;
            }
          }

          .info-grid {
            grid-template-columns: 1fr;
            gap: 12px;

            .info-item {
              &.highlight {
                padding: 10px;
              }

              .label {
                font-size: 12px;
              }

              .value {
                font-size: 14px;

                &.metric {
                  .number {
                    font-size: 20px;
                  }

                  .unit {
                    font-size: 13px;
                  }
                }
              }
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

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 12px;

            .stat-card {
              padding: 14px;

              .stat-icon {
                width: 44px;
                height: 44px;

                i {
                  font-size: 22px;
                }
              }

              .stat-content {
                .stat-value {
                  font-size: 20px;
                }

                .stat-label {
                  font-size: 12px;
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
}
</style>
