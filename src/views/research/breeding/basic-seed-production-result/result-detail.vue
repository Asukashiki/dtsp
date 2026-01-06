<template>
  <div class="detail-container">
    <div class="info-card">
      <div class="card-header">
        <div class="card-title">
          <i class="ri-file-info-line"></i>
          <span>{{ $t('basicSeedProductionResult.detail') }}</span>
        </div>
        <el-button @click="handleBack">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
      </div>

      <div class="card-body">
        <!-- 批次信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('basicSeedProductionResult.section.batchInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProductionResult.columns.resultId') }}:</span>
              <span class="value">{{ data.resultId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProductionResult.columns.produceBatchId') }}:</span>
              <span class="value">{{ data.produceBatchId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProductionResult.columns.produceBatchName') }}:</span>
              <span class="value">{{ data.produceBatchName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProductionResult.columns.varietyName') }}:</span>
              <span class="value">{{ data.varietyName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProductionResult.form.breedBatchName') }}:</span>
              <span class="value">{{ data.breedBatchName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProductionResult.form.trialName') }}:</span>
              <span class="value">{{ data.trialName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProductionResult.form.fromSeedLevel') }}:</span>
              <span class="value">{{ data.fromSeedLevel }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProductionResult.form.toSeedLevel') }}:</span>
              <span class="value">{{ data.toSeedLevel }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProductionResult.columns.collectionDate') }}:</span>
              <span class="value">{{ data.collectionDate }}</span>
            </div>
          </div>
        </div>

        <!-- 生产结果数据 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-bar-chart-line"></i>
            {{ $t('basicSeedProductionResult.form.resultInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProductionResult.form.outputQuantity') }}:</span>
              <span class="value">{{ data.outputQuantity }} kg</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('basicSeedProductionResult.form.operator') }}:</span>
              <span class="value">{{ data.operator }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back'])

const handleBack = () => {
  emit('back')
}
</script>

<style scoped>
.detail-container {
  padding: 20px 0;
}

.info-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.03) 0%, rgba(254, 221, 0, 0.03) 100%);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
}

.card-title i {
  font-size: 20px;
}

.card-body {
  padding: 30px 24px;
}

.detail-section {
  margin-bottom: 30px;
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

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item .label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.detail-item .value {
  font-size: 15px;
  color: #333;
}

.remarks-content {
  padding: 16px;
  background: #f5f7fa;
  border-radius: 8px;
  color: #606266;
  line-height: 1.6;
  white-space: pre-wrap;
}

@media screen and (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
