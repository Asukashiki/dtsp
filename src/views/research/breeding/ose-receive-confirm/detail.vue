<template>
  <el-dialog
    v-model="dialogVisible"
    :title="$t('research.breeding.seed.receiveConfirm.detail')"
    width="80%"
    :close-on-click-modal="false"
    @close="handleClose"
    class="detail-dialog"
  >
    <div class="detail-content">
      <!-- 基础信息 -->
      <div class="info-section">
        <div class="section-title">
          <i class="ri-information-line"></i>
          {{ $t('research.breeding.seed.receiveConfirm.form.basicInfo') }}
        </div>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">{{ $t('research.breeding.seed.receiveConfirm.columns.distributeId') }}</span>
            <span class="value">{{ data.distributeId }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breeding.seed.receiveConfirm.columns.oseName') }}</span>
            <span class="value">{{ data.oseName }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breeding.seed.receiveConfirm.columns.receiveStatus') }}</span>
            <el-tag :type="data.receiveStatus === 'CONFIRMED' ? 'success' : 'warning'">
              {{ $t(`research.breeding.seed.receiveConfirm.status.${data.receiveStatus}`) }}
            </el-tag>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breeding.seed.receiveConfirm.form.totalDistributeQuantity') }}</span>
            <span class="value">{{ data.distributeDetail?.totalDistributeQuantity || 0 }} kg</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breeding.seed.receiveConfirm.columns.confirmTime') }}</span>
            <span class="value">{{ data.confirmTime || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breeding.seed.receiveConfirm.columns.confirmPeople') }}</span>
            <span class="value">{{ data.confirmPeople || '-' }}</span>
          </div>
          <div class="info-item full-width">
            <span class="label">{{ $t('research.breeding.seed.receiveConfirm.form.remark') }}</span>
            <span class="value">{{ data.remark || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- 育种家种子信息 -->
      <div class="info-section">
        <div class="section-title">
          <i class="ri-seedling-line"></i>
          {{ $t('research.breeding.seed.receiveConfirm.form.breedSeedDetail') }}
        </div>
        <div class="table-container" v-if="breedSeedList && breedSeedList.length > 0">
          <el-table :data="breedSeedList" stripe border style="width: 100%">
            <el-table-column type="index" label="#" width="60" align="center" />
            <el-table-column
              prop="varietyName"
              :label="$t('research.breeding.seed.receiveConfirm.form.varietyName')"
              min-width="180"
              show-overflow-tooltip
            />
            <el-table-column
              prop="cropType"
              :label="$t('research.breeding.seed.receiveConfirm.form.cropType')"
              min-width="140"
            />
            <el-table-column
                prop="seedType"
                :label="$t('research.breeding.seed.receiveConfirm.form.seedType')"
                min-width="140"
            />
            <el-table-column
              prop="breedSeedProduceBatchId"
              :label="$t('research.breeding.seed.receiveConfirm.columns.seedId')"
              min-width="220"
              show-overflow-tooltip
            />
            <el-table-column
                prop="produceBatchName"
                :label="$t('research.breeding.seed.receiveConfirm.form.breedSeedProduceBatchId')"
                min-width="220"
                show-overflow-tooltip
            />
            <el-table-column
              prop="distributeQuantity"
              :label="$t('research.breeding.seed.receiveConfirm.form.distributeQuantity')"
              width="180"
              align="right"
            >
              <template #default="{ row }">
                {{ row.distributeQuantity }} kg
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-else class="empty-state">
          <i class="ri-inbox-line"></i>
          <p>{{ $t('research.breeding.seed.receiveConfirm.messages.noSeedData') }}</p>
        </div>
      </div>

      <!-- 系统信息 -->
      <div class="info-section">
        <div class="section-title">
          <i class="ri-time-line"></i>
          {{ $t('research.breeding.seed.receiveConfirm.form.systemInfo') }}
        </div>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">{{ $t('research.breeding.seed.receiveConfirm.columns.createTime') }}</span>
            <span class="value">{{ data.createTime }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('research.breeding.seed.receiveConfirm.form.updateTime') }}</span>
            <span class="value">{{ data.updateTime || '-' }}</span>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

// 获取 breeder seed 列表
const breedSeedList = computed(() => {
  return props.data.distributeDetail?.detailList || []
})
</script>

<style scoped>
.detail-dialog :deep(.el-dialog__header) {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.03) 0%, rgba(254, 221, 0, 0.03) 100%);
  border-bottom: 1px solid #f0f0f0;
}

.detail-dialog :deep(.el-dialog__title) {
  font-size: 18px;
  font-weight: 600;
  color: #009A44;
}

.detail-dialog :deep(.el-dialog__body) {
  padding: 0;
}

.detail-content {
  padding: 24px;
  max-height: 70vh;
  overflow-y: auto;
}

.info-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
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
  color: #009A44;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #009A44;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.value {
  font-size: 15px;
  color: #333;
  word-break: break-word;
}

.table-container {
  margin-top: 12px;
  overflow-x: auto;
}

.table-container :deep(.el-table) {
  font-size: 14px;
}

.table-container :deep(.el-table th) {
  background: linear-gradient(135deg, rgba(0, 154, 68, 0.05) 0%, rgba(254, 221, 0, 0.05) 100%);
  color: #009A44;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.empty-state i {
  font-size: 48px;
  color: #ddd;
  margin-bottom: 16px;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

@media screen and (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .detail-header {
    padding: 16px;
  }

  .detail-content {
    padding: 16px;
  }

  .table-container {
    margin-left: -20px;
    margin-right: -20px;
  }
}
</style>
