<template>
  <div class="variety-info-card">
    <div class="info-grid">
      <div class="info-item">
        <span class="label">{{ $t('research.variety.registration.form.varietyName') }}</span>
        <span class="value">{{ variety.varietyName || '-' }}</span>
      </div>
      <div class="info-item">
        <span class="label">{{ $t('research.variety.registration.form.varietyCode') }}</span>
        <span class="value">{{ variety.varietyCode || '-' }}</span>
      </div>
      <div class="info-item">
        <span class="label">{{ $t('research.variety.registration.form.cropType') }}</span>
        <span class="value">{{ variety.cropType || '-' }}</span>
      </div>
      <div class="info-item">
        <span class="label">{{ $t('research.variety.registration.form.species') }}</span>
        <span class="value">{{ variety.species || '-' }}</span>
      </div>
      <div class="info-item">
        <span class="label">{{ $t('research.variety.registration.form.genus') }}</span>
        <span class="value">{{ variety.genus || '-' }}</span>
      </div>
      <div class="info-item">
        <span class="label">{{ $t('research.variety.registration.form.family') }}</span>
        <span class="value">{{ variety.family || '-' }}</span>
      </div>
      <div class="info-item">
        <span class="label">{{ $t('research.variety.registration.form.breedingMethod') }}</span>
        <span class="value">{{ variety.breedingMethod || '-' }}</span>
      </div>
      <div class="info-item">
        <span class="label">{{ $t('research.variety.registration.form.cultivationYear') }}</span>
        <span class="value">{{ formatYear(variety.cultivationYear) }}</span>
      </div>
      <div class="info-item full-width">
        <span class="label">{{ $t('research.variety.registration.form.methodPedigree') }}</span>
        <span class="value">{{ variety.methodPedigree || '-' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  variety: {
    type: Object,
    default: () => ({})
  }
})

const formatYear = (year) => {
  if (!year) return '-'
  return new Date(year).getFullYear()
}
</script>

<style scoped>
.variety-info-card {
  background: #fafafa;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #ebeef5;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: 600;
  color: #606266;
  font-size: 14px;
}

.value {
  color: #303133;
  font-size: 15px;
}

@media screen and (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
