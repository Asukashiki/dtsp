<template>
  <div class="tracking-detail-component">
    <!-- 顶部概览卡片 -->
    <div class="detail-header-card">
      <div class="header-icon">
        <i class="ri-map-pin-fill"></i>
      </div>
      <div class="header-info">
        <h3 class="tracking-id">{{ trackingData.trackingId }}</h3>
        <div class="header-tags">
          <el-tag type="info" size="large">{{ trackingData.stageNameText }}</el-tag>
          <el-tag :type="getResultTagType(trackingData.trackingResult)" size="large">
            {{ trackingData.trackingResultName }}
          </el-tag>
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
          <span class="label">{{ $t('research.breeding.tracking.form.batchId') }}</span>
          <span class="value">{{ trackingData.batchId }}</span>
        </div>
        <div class="info-item">
          <span class="label">{{ $t('research.breeding.tracking.form.cropType') }}</span>
          <span class="value">{{ getCropTypeName(trackingData.cropType) }}</span>
        </div>
        <div class="info-item full-width">
          <span class="label">{{ $t('research.breeding.tracking.form.location') }}</span>
          <span class="value location">
            <i class="ri-map-pin-2-line"></i>
            {{ trackingData.location || '-' }}
          </span>
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
            <span class="timeline-label">{{ $t('research.breeding.tracking.form.startDate') }}</span>
            <span class="timeline-value">{{ trackingData.startDate || '-' }}</span>
          </div>
        </div>
        <div class="timeline-connector"></div>
        <div class="timeline-item">
          <div class="timeline-dot end"></div>
          <div class="timeline-content">
            <span class="timeline-label">{{ $t('research.breeding.tracking.form.completeDate') }}</span>
            <span class="timeline-value">{{ trackingData.completeDate || '-' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 产量数据 -->
    <div class="detail-section">
      <div class="section-title">
        <i class="ri-plant-line"></i>
        <span>{{ $t('research.breeding.detail.yieldData') }}</span>
      </div>
      <div class="info-grid">
        <div class="info-item highlight">
          <span class="label">{{ $t('research.breeding.tracking.form.expectedYield') }}</span>
          <span class="value metric">
            <span class="number">{{ trackingData.expectedYield || '-' }}</span>
            <span class="unit" v-if="trackingData.expectedYield">kg</span>
          </span>
        </div>
        <div class="info-item highlight">
          <span class="label">{{ $t('research.breeding.tracking.form.actualYield') }}</span>
          <span class="value metric">
            <span class="number">{{ trackingData.actualYield || '-' }}</span>
            <span class="unit" v-if="trackingData.actualYield">kg</span>
          </span>
        </div>
        <div class="info-item highlight full-width">
          <span class="label">{{ $t('research.breeding.tracking.form.fieldInspectionScore') }}</span>
          <span class="value metric">
            <span class="number">{{ trackingData.fieldInspectionScore || '-' }}</span>
            <span class="unit" v-if="trackingData.fieldInspectionScore">分</span>
          </span>
        </div>
      </div>
    </div>

    <!-- GPS位置 -->
    <div class="detail-section" v-if="trackingData.gpsLongitude || trackingData.gpsLatitude">
      <div class="section-title">
        <i class="ri-map-pin-range-line"></i>
        <span>{{ $t('research.breeding.detail.gpsLocation') }}</span>
      </div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">{{ $t('research.breeding.tracking.form.gpsLongitude') }}</span>
          <span class="value">{{ trackingData.gpsLongitude || '-' }}</span>
        </div>
        <div class="info-item">
          <span class="label">{{ $t('research.breeding.tracking.form.gpsLatitude') }}</span>
          <span class="value">{{ trackingData.gpsLatitude || '-' }}</span>
        </div>
      </div>
    </div>

    <!-- 病害观察 -->
    <div class="detail-section" v-if="trackingData.diseaseObservation">
      <div class="section-title">
        <i class="ri-bug-line"></i>
        <span>{{ $t('research.breeding.tracking.form.diseaseObservation') }}</span>
      </div>
      <div class="remark-content disease">
        {{ trackingData.diseaseObservation }}
      </div>
    </div>

    <!-- 机构信息 -->
    <div class="detail-section" v-if="trackingData.orgId || trackingData.orgName">
      <div class="section-title">
        <i class="ri-building-line"></i>
        <span>{{ $t('research.breeding.detail.orgInfo') }}</span>
      </div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">{{ $t('research.breeding.tracking.form.orgId') }}</span>
          <span class="value">{{ trackingData.orgId || '-' }}</span>
        </div>
        <div class="info-item">
          <span class="label">{{ $t('research.breeding.tracking.form.orgName') }}</span>
          <span class="value">{{ trackingData.orgName || '-' }}</span>
        </div>
      </div>
    </div>

    <!-- 登记信息 -->
    <div class="detail-section" v-if="trackingData.createBy || trackingData.createTime">
      <div class="section-title">
        <i class="ri-user-line"></i>
        <span>{{ $t('common.registrationInfo') }}</span>
      </div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">{{ $t('common.createBy') }}</span>
          <span class="value">{{ trackingData.createBy || '-' }}</span>
        </div>
        <div class="info-item">
          <span class="label">{{ $t('common.createTime') }}</span>
          <span class="value">{{ trackingData.createTime || '-' }}</span>
        </div>
      </div>
    </div>

    <!-- 备注 -->
    <div class="detail-section" v-if="trackingData.remark">
      <div class="section-title">
        <i class="ri-file-text-line"></i>
        <span>{{ $t('common.remarks') }}</span>
      </div>
      <div class="remark-content">
        {{ trackingData.remark }}
      </div>
    </div>

    <!-- 关联的检测记录 -->
    <div class="related-tests-section" v-if="trackingData.trackingId">
      <div class="section-title">
        <i class="ri-test-tube-line"></i>
        <span>{{ $t('research.breeding.detail.relatedTests') }}</span>
      </div>
      <TestList
        :tracking-id="trackingData.trackingId"
        :batch-id="trackingData.batchId"
        :compact="true"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TestList from './TestList.vue'

const props = defineProps({
  trackingData: {
    type: Object,
    required: true
  }
})

const { t } = useI18n()

// 作物类型映射
const cropTypeMap = computed(() => ({
  'WHEAT': t('research.breeding.cropType.wheat'),
  'CORN': t('research.breeding.cropType.corn'),
  'RICE': t('research.breeding.cropType.rice'),
  'SOYBEAN': t('research.breeding.cropType.soybean'),
  'COTTON': t('research.breeding.cropType.cotton')
}))

const getCropTypeName = (type) => {
  return cropTypeMap.value[type] || type
}

const getResultTagType = (result) => {
  const map = {
    '01': 'success',
    '02': 'danger',
    '03': 'warning'
  }
  return map[result] || 'info'
}
</script>

<style scoped lang="scss">
.tracking-detail-component {
  // 顶部概览卡片
  .detail-header-card {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px;
    background: linear-gradient(135deg, #009A44 0%, #00b350 100%);
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 4px 12px rgba(0, 154, 68, 0.2);

    .header-icon {
      width: 64px;
      height: 64px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      i {
        font-size: 32px;
        color: #fff;
      }
    }

    .header-info {
      flex: 1;
      min-width: 0;

      .tracking-id {
        margin: 0 0 10px 0;
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        word-break: break-all;
      }

      .header-tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;

        .el-tag {
          font-weight: 500;
        }
      }
    }
  }

  // 详情区块
  .detail-section {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

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

          &.location {
            display: flex;
            align-items: center;
            gap: 6px;

            i {
              color: #009A44;
              font-size: 16px;
            }
          }

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

    .remark-content {
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
      line-height: 1.6;
      color: #606266;
      font-size: 14px;
      white-space: pre-wrap;
      word-break: break-word;

      &.disease {
        background: #fff7e6;
        border-left: 3px solid #FEDD00;
      }
    }
  }

  // 关联测试区块
  .related-tests-section {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

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
  }

  // 移动端适配
  @media screen and (max-width: 768px) {
    .detail-header-card {
      padding: 20px 16px;
      gap: 16px;

      .header-icon {
        width: 56px;
        height: 56px;

        i {
          font-size: 28px;
        }
      }

      .header-info {
        .tracking-id {
          font-size: 16px;
          margin-bottom: 8px;
        }
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

      .remark-content {
        padding: 12px;
        font-size: 13px;
      }
    }

    .related-tests-section {
      padding: 16px;

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
    }
  }
}
</style>
