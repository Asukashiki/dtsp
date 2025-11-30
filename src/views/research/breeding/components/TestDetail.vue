<template>
  <div class="test-detail-component">
    <!-- 顶部概览卡片 -->
    <div class="detail-header-card">
      <div class="header-icon">
        <i class="ri-test-tube-fill"></i>
      </div>
      <div class="header-info">
        <h3 class="test-id">{{ testData.testId }}</h3>
        <el-tag :type="getResultTagType(testData.testResult)" size="large">
          {{ testData.testResultName }}
        </el-tag>
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
          <span class="label">{{ $t('research.breeding.test.form.trackingId') }}</span>
          <span class="value">{{ testData.trackingId }}</span>
        </div>
        <div class="info-item">
          <span class="label">{{ $t('research.breeding.test.form.batchId') }}</span>
          <span class="value">{{ testData.batchId }}</span>
        </div>
        <div class="info-item">
          <span class="label">{{ $t('research.breeding.test.form.cropType') }}</span>
          <span class="value">{{ testData.cropTypeName }}</span>
        </div>
        <div class="info-item">
          <span class="label">{{ $t('research.breeding.test.form.testDate') }}</span>
          <span class="value">{{ testData.testDate || '-' }}</span>
        </div>
      </div>
    </div>

    <!-- 检测数据 -->
    <div class="detail-section">
      <div class="section-title">
        <i class="ri-flask-line"></i>
        <span>{{ $t('research.breeding.detail.testData') }}</span>
      </div>
      <div class="info-grid">
        <div class="info-item highlight">
          <span class="label">{{ $t('research.breeding.test.form.germinationRate') }}</span>
          <span class="value metric">
            <span class="number">{{ testData.germinationRate || '-' }}</span>
            <span class="unit" v-if="testData.germinationRate">%</span>
          </span>
        </div>
        <div class="info-item highlight">
          <span class="label">{{ $t('research.breeding.test.form.purity') }}</span>
          <span class="value metric">
            <span class="number">{{ testData.purity || '-' }}</span>
            <span class="unit" v-if="testData.purity">%</span>
          </span>
        </div>
        <div class="info-item highlight">
          <span class="label">{{ $t('research.breeding.test.form.moistureContent') }}</span>
          <span class="value metric">
            <span class="number">{{ testData.moistureContent || '-' }}</span>
            <span class="unit" v-if="testData.moistureContent">%</span>
          </span>
        </div>
        <div class="info-item full-width">
          <span class="label">{{ $t('research.breeding.test.form.pestDetection') }}</span>
          <span class="value">{{ testData.pestDetection || '-' }}</span>
        </div>
      </div>
    </div>

    <!-- 登记信息 -->
    <div class="detail-section" v-if="testData.createBy || testData.createTime">
      <div class="section-title">
        <i class="ri-user-line"></i>
        <span>{{ $t('common.registrationInfo') }}</span>
      </div>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">{{ $t('common.createBy') }}</span>
          <span class="value">{{ testData.createBy || '-' }}</span>
        </div>
        <div class="info-item">
          <span class="label">{{ $t('common.createTime') }}</span>
          <span class="value">{{ testData.createTime || '-' }}</span>
        </div>
      </div>
    </div>

    <!-- 备注 -->
    <div class="detail-section" v-if="testData.remark">
      <div class="section-title">
        <i class="ri-file-text-line"></i>
        <span>{{ $t('common.remarks') }}</span>
      </div>
      <div class="remark-content">
        {{ testData.remark }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  testData: {
    type: Object,
    required: true
  }
})

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
.test-detail-component {
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

      .test-id {
        margin: 0 0 8px 0;
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        word-break: break-all;
      }

      .el-tag {
        font-weight: 500;
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
      grid-template-columns: repeat(3, 1fr);
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
        .test-id {
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

      .remark-content {
        padding: 12px;
        font-size: 13px;
      }
    }
  }
}
</style>
