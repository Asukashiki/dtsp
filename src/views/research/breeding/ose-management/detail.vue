<template>
  <div class="ose-detail-container">
    <div class="detail-header">
      <div class="header-left">
        <el-button link @click="handleBack">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
      </div>
      <h2 class="detail-title">{{ $t('research.breeding.seed.ose.detail') }}</h2>
    </div>

    <div class="detail-content">
      <div class="info-section">
        <div class="section-title">
          <i class="ri-information-line"></i>
          {{ $t('research.breeding.seed.ose.form.basicInfo') }}
        </div>

        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">{{ $t('research.breeding.seed.ose.columns.oseId') }}:</span>
            <span class="info-value">{{ data.oseId }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t('research.breeding.seed.ose.columns.oseCode') }}:</span>
            <span class="info-value highlight">{{ data.oseCode }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t('research.breeding.seed.ose.columns.oseName') }}:</span>
            <span class="info-value">{{ data.oseName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t('research.breeding.seed.ose.columns.regionName') }}:</span>
            <span class="info-value">{{ data.regionName }}</span>
          </div>
          <div class="info-item full-width">
            <span class="info-label">{{ $t('research.breeding.seed.ose.columns.location') }}:</span>
            <span class="info-value">{{ data.location }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t('research.breeding.seed.ose.columns.oseStatus') }}:</span>
            <span class="info-value">
              <el-tag :type="data.oseStatus === 'ENABLED' ? 'success' : 'info'" size="small">
                {{ $t(`research.breeding.seed.ose.status.${data.oseStatus}`) }}
              </el-tag>
            </span>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">
          <i class="ri-contacts-line"></i>
          {{ $t('research.breeding.seed.ose.form.contactInfo') }}
        </div>

        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">{{ $t('research.breeding.seed.ose.columns.contactName') }}:</span>
            <span class="info-value">{{ data.contactName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t('research.breeding.seed.ose.columns.contactNumber') }}:</span>
            <span class="info-value">+{{ data.contactNumber }}</span>
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
.ose-detail-container {
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

  .detail-footer {
    padding: 12px 16px;
  }

  .detail-footer .el-button {
    width: 100%;
  }
}
</style>
