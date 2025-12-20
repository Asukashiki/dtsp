<template>
  <div class="distribution-detail-container">
    <div class="detail-header">
      <div class="header-left">
        <el-button link @click="handleBack">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
      </div>
      <h2 class="detail-title">{{ $t('research.breeding.seed.distribution.detail') }}</h2>
    </div>

    <div class="detail-content">
      <div class="info-section">
        <div class="section-title">
          <i class="ri-information-line"></i>
          {{ $t('research.breeding.seed.distribution.form.basicInfo') }}
        </div>

        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">{{ $t('research.breeding.seed.distribution.columns.distributeId') }}:</span>
            <span class="info-value">{{ data.distributeId }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t('research.breeding.seed.distribution.columns.oseName') }}:</span>
            <span class="info-value">{{ data.oseName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t('research.breeding.seed.distribution.columns.time') }}:</span>
            <span class="info-value">{{ data.time }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t('research.breeding.seed.distribution.columns.people') }}:</span>
            <span class="info-value">{{ data.people }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t('research.breeding.seed.distribution.columns.organ') }}:</span>
            <span class="info-value">{{ data.organ }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t('research.breeding.seed.distribution.columns.distributeName') }}:</span>
            <span class="info-value">{{ data.distributeName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t('research.breeding.seed.distribution.columns.fromSeedLevel') }}:</span>
            <span class="info-value">{{ data.fromSeedLevel }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t('research.breeding.seed.distribution.columns.toSeedLevel') }}:</span>
            <span class="info-value">{{ data.toSeedLevel }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t('research.breeding.seed.distribution.columns.totalDistributeQuantity') }}:</span>
            <span class="info-value highlight">{{ data.totalDistributeQuantity }} kg</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t('research.breeding.seed.distribution.columns.distributeStatus') }}:</span>
            <span class="info-value">
              <el-tag type="success" size="small">{{ data.distributeStatus }}</el-tag>
            </span>
          </div>
          <div class="info-item full-width" v-if="data.remark">
            <span class="info-label">{{ $t('research.breeding.seed.distribution.form.remark') }}:</span>
            <span class="info-value">{{ data.remark }}</span>
          </div>
        </div>
      </div>

      <div class="info-section" v-if="data.detailList && data.detailList.length > 0">
        <div class="section-title">
          <i class="ri-list-check"></i>
          {{ $t('research.breeding.seed.distribution.form.detailList') }}
        </div>

        <div class="detail-table">
          <el-table :data="data.detailList" stripe border style="width: 100%">
            <el-table-column type="index" :label="$t('common.index')" width="60" align="center" />
            
            <el-table-column
              prop="produceBatchName"
              :label="$t('research.breeding.seed.distribution.detailColumns.produceBatchName')"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column
              prop="breedBatchName"
              :label="$t('research.breeding.seed.distribution.detailColumns.breedBatchName')"
              min-width="150"
              show-overflow-tooltip
            />
            <el-table-column
              prop="parentalSeedSource"
              :label="$t('research.breeding.seed.distribution.detailColumns.parentalSeedSource')"
              min-width="150"
              show-overflow-tooltip
            />
            <el-table-column
              prop="varietyName"
              :label="$t('research.breeding.seed.distribution.detailColumns.varietyName')"
              min-width="150"
              show-overflow-tooltip
            />
            <el-table-column
              prop="distributeQuantity"
              :label="$t('research.breeding.seed.distribution.detailColumns.distributeQuantity')"
              width="130"
              align="right"
            >
              <template #default="{ row }">
                {{ row.distributeQuantity }} kg
              </template>
            </el-table-column>
            <el-table-column
              prop="produceBatchRemaining"
              :label="$t('research.breeding.seed.distribution.detailColumns.produceBatchRemaining')"
              width="150"
              align="right"
            >
              <template #default="{ row }">
                {{ row.produceBatchRemaining }} kg
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              :label="$t('research.breeding.seed.distribution.detailColumns.createTime')"
              width="180"
            />
          </el-table>
        </div>

        <!-- 移动端卡片视图 -->
        <div class="mobile-detail-list">
          <div v-for="(item, index) in data.detailList" :key="item.distributeDetailId" class="mobile-detail-card">
            <div class="card-header">
              <el-tag type="primary" size="small">{{ $t('common.index') }} {{ index + 1 }}</el-tag>
              <el-tag type="success" size="small">{{ item.cropType }}</el-tag>
            </div>
            <h4 class="card-title">{{ item.varietyName }}</h4>
            <div class="card-info">
              <div class="info-row">
                <span class="label">{{ $t('research.breeding.seed.distribution.detailColumns.produceBatchId') }}:</span>
                <span class="value">{{ item.produceBatchId }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('research.breeding.seed.distribution.detailColumns.produceBatchName') }}:</span>
                <span class="value">{{ item.produceBatchName }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('research.breeding.seed.distribution.detailColumns.breedBatchName') }}:</span>
                <span class="value">{{ item.breedBatchName }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('research.breeding.seed.distribution.detailColumns.parentalSeedSource') }}:</span>
                <span class="value">{{ item.parentalSeedSource }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('research.breeding.seed.distribution.detailColumns.distributeQuantity') }}:</span>
                <span class="value highlight">{{ item.distributeQuantity }} kg</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('research.breeding.seed.distribution.detailColumns.produceBatchRemaining') }}:</span>
                <span class="value">{{ item.produceBatchRemaining }} kg</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('research.breeding.seed.distribution.detailColumns.createTime') }}:</span>
                <span class="value">{{ item.createTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">
          <i class="ri-time-line"></i>
          {{ $t('common.systemInfo') }}
        </div>

        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">{{ $t('common.createTime') }}:</span>
            <span class="info-value">{{ data.createTime }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t('common.updateTime') }}:</span>
            <span class="info-value">{{ data.updateTime }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="detail-footer">
      <el-button @click="handleBack">{{ $t('common.back') }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const emit = defineEmits(['back'])

const handleBack = () => {
  emit('back')
}
</script>

<style scoped>
.distribution-detail-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.detail-header {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.05) 100%);
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.header-left {
  margin-bottom: 8px;
}

.detail-title {
  font-size: 20px;
  font-weight: 600;
  color: #009A44;
  margin: 0;
}

.detail-content {
  padding: 24px;
}

.info-section {
  margin-bottom: 32px;
}

.info-section:last-child {
  margin-bottom: 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #009A44;
}

.section-title i {
  font-size: 18px;
  color: #009A44;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-label {
  font-size: 13px;
  color: #909399;
  font-weight: 500;
}

.info-value {
  font-size: 15px;
  color: #303133;
}

.info-value.highlight {
  color: #009A44;
  font-weight: 600;
  font-size: 16px;
}

.detail-table {
  display: block;
}

.mobile-detail-list {
  display: none;
}

.mobile-detail-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid #e9ecef;
}

.mobile-detail-card:last-child {
  margin-bottom: 0;
}

.card-header {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 12px 0;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  padding: 6px 0;
  border-bottom: 1px solid #e9ecef;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row .label {
  font-size: 12px;
  color: #909399;
  flex-shrink: 0;
}

.info-row .value {
  font-size: 14px;
  color: #606266;
  text-align: right;
  word-break: break-all;
}

.info-row .value.highlight {
  color: #009A44;
  font-weight: 600;
}

.detail-footer {
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
}

@media screen and (max-width: 768px) {
  .detail-content {
    padding: 16px;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .detail-table {
    display: none;
  }

  .mobile-detail-list {
    display: block;
  }

  .detail-footer {
    padding: 12px 16px;
  }

  .detail-footer .el-button {
    width: 100%;
  }
}
</style>
