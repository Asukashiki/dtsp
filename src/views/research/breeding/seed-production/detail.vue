<template>
  <div class="detail-container">
    <div class="info-card">
      <div class="card-header">
        <div class="card-title">
          <i class="ri-file-info-line"></i>
          <span>{{ $t('research.breeding.seed.production.detail') }}</span>
        </div>
        <el-button @click="handleBack">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
      </div>

      <div class="card-body">
        <!-- 基础信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-information-line"></i>
            {{ $t('research.breeding.seed.production.form.basicInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.seed.production.form.produceBatchName') }}:</span>
              <span class="value">{{ data.produceBatchName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.seed.production.form.breedBatchName') }}:</span>
              <span class="value">{{ data.breedBatchName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.seed.production.form.varietyName') }}:</span>
              <span class="value">{{ data.varietyName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.seed.production.form.cropType') }}:</span>
              <span class="value">{{ data.cropType }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.seed.production.form.time') }}:</span>
              <span class="value">{{ data.time }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.seed.production.form.landName') }}:</span>
              <span class="value">{{ data.landName }}</span>
            </div>
          </div>
        </div>

        <!-- 生产信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-plant-line"></i>
            {{ $t('research.breeding.seed.production.form.productionInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.seed.production.form.inputSeedQuantity') }}:</span>
              <span class="value">{{ data.inputSeedQuantity }} kg</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.seed.production.form.produceSeedQuantrity') }}:</span>
              <span class="value">{{ data.produceSeedQuantrity }} kg</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.seed.production.form.fromSeedLevel') }}:</span>
              <span class="value">{{ data.fromSeedLevel }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.seed.production.form.toSeedLevel') }}:</span>
              <span class="value">{{ data.toSeedLevel }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.seed.production.form.operatorName') }}:</span>
              <span class="value">{{ data.operatorName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.seed.production.form.produceStatus') }}:</span>
              <el-tag type="success">
                {{ data.produceStatus }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.seed.production.form.createTime') }}:</span>
              <span class="value">{{ data.createTime }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.breeding.seed.production.form.updateTime') }}:</span>
              <span class="value">{{ data.updateTime }}</span>
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

@media screen and (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
