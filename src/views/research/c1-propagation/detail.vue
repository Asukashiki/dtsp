<template>
  <div class="detail-container">
    <div class="info-card">
      <div class="card-header">
        <div class="card-title">
          <i class="ri-file-info-line"></i>
          <span>{{ $t('research.c1Propagation.detail') }}</span>
        </div>
        <el-button @click="handleBack">
          <i class="ri-arrow-left-line"></i>
          {{ $t('common.back') }}
        </el-button>
      </div>

      <div class="card-body">
        <!-- 状态标签 -->
        <div class="status-banner" :class="`status-${data.applyStatus}`">
          <el-tag :type="getStatusType(data.applyStatus)" size="large">
            {{ $t(`research.c1Propagation.status.${data.applyStatus}`) }}
          </el-tag>
        </div>

        <!-- 机构信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-building-line"></i>
            {{ $t('research.c1Propagation.form.basicInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.applicantOrgType') }}:</span>
              <span class="value">{{ $t(`research.c1Propagation.orgType.${data.applicantOrgType}`) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.applicantOrgName') }}:</span>
              <span class="value">{{ data.applicantOrgName }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.applicantOrgId') }}:</span>
              <span class="value">{{ data.applicantOrgId }}</span>
            </div>
            <div class="detail-item" v-if="data.authId">
              <span class="label">{{ $t('research.c1Propagation.columns.authId') }}:</span>
              <span class="value">{{ data.authId }}</span>
            </div>
          </div>
        </div>

        <!-- 繁殖信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-plant-line"></i>
            {{ $t('research.c1Propagation.form.propagationInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.propagationBatchId') }}:</span>
              <span class="value">{{ data.propagationBatchId }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.cropType') }}:</span>
              <span class="value">{{ getLabelByValue('crop_type', data.cropType) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.varietyName') }}:</span>
              <span class="value">{{ data.varietyName }}</span>
            </div>
            <!-- <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.varietyCode') }}:</span>
              <span class="value">{{ data.varietyCode || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.species') }}:</span>
              <span class="value">{{ data.species || '-' }}</span>
            </div> -->
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.applyDate') }}:</span>
              <span class="value">{{ data.applyDate }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.demandQuantity') }}:</span>
              <span class="value">{{ data.demandQuantity || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.fromSeedType') }}:</span>
              <span class="value">{{ data.fromSeedType || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.toSeedType') }}:</span>
              <span class="value">{{ data.toSeedType || '-' }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('research.c1Propagation.form.applyDescription') }}:</span>
              <span class="value">{{ data.applyDescription || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 审核信息（如果已审核） -->
        <div class="detail-section" v-if="data.applyStatus !== 'pending'">
          <div class="section-title">
            <i class="ri-checkbox-circle-line"></i>
            {{ $t('research.c1Propagation.form.auditInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.auditResult') }}:</span>
              <el-tag :type="data.auditResult === 'approved' ? 'success' : 'danger'">
                {{ $t(`research.c1Propagation.auditResult.${data.auditResult}`) }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.auditor') }}:</span>
              <span class="value">{{ data.auditor || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.auditOrg') }}:</span>
              <span class="value">{{ data.auditOrg || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.auditTime') }}:</span>
              <span class="value">{{ data.auditTime || '-' }}</span>
            </div>
            <div class="detail-item full-width">
              <span class="label">{{ $t('research.c1Propagation.form.auditOpinion') }}:</span>
              <span class="value">{{ data.auditOpinion || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 操作人信息 -->
        <div class="detail-section">
          <div class="section-title">
            <i class="ri-user-line"></i>
            {{ $t('research.c1Propagation.form.operatorInfo') }}
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.operator') }}:</span>
              <span class="value">{{ data.operator || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.operationOrg') }}:</span>
              <span class="value">{{ data.operationOrg || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.operationTime') }}:</span>
              <span class="value">{{ data.operationTime || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">{{ $t('research.c1Propagation.form.createdTime') }}:</span>
              <span class="value">{{ data.createdTime || '-' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useDict } from '@/hooks/useDict'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back'])

// 使用 useDict hook 获取字典数据
const { getLabelByValue } = useDict(['crop_type'])

// 获取状态类型
const getStatusType = (status) => {
  const types = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return types[status] || 'info'
}

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

.status-banner {
  display: flex;
  justify-content: center;
  padding: 16px;
  margin-bottom: 24px;
  border-radius: 8px;
  background: #f5f5f5;
}

.status-banner.status-pending {
  background: linear-gradient(135deg, rgba(230, 162, 60, 0.1) 0%, rgba(230, 162, 60, 0.05) 100%);
}

.status-banner.status-approved {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.1) 0%, rgba(0, 154, 68, 0.05) 100%);
}

.status-banner.status-rejected {
  background: linear-gradient(135deg, rgba(245, 108, 108, 0.1) 0%, rgba(245, 108, 108, 0.05) 100%);
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

.detail-item.full-width {
  grid-column: 1 / -1;
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
