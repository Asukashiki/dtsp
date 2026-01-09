<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <el-button class="back-btn" @click="handleBack">
            <i class="ri-arrow-left-line"></i>
          </el-button>
          <div class="header-content">
            <h1 class="page-title">{{ $t('research.breeding.seed.distribution.detail') }}</h1>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 基本信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-information-line"></i>
              <span>{{ $t('research.breeding.seed.distribution.form.basicInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="isMobile ? 1 : 2" border>
              <el-descriptions-item :label="$t('research.breeding.seed.distribution.columns.distributeId')">
                {{ data.distributeId }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.distribution.columns.distributeName')">
                {{ data.distributeName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.distribution.columns.oseName')">
                {{ data.oseName }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.distribution.columns.time')">
                {{ data.time }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.distribution.columns.people')">
                {{ data.people }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.distribution.columns.organ')">
                {{ data.organ }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.distribution.columns.fromSeedLevel')">
                {{ data.fromSeedLevel }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.distribution.columns.toSeedLevel')">
                {{ data.toSeedLevel }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.distribution.columns.totalDistributeQuantity')">
                <span class="font-bold text-primary">{{ data.totalDistributeQuantity }} kg</span>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.distribution.columns.distributeStatus')">
                <el-tag type="success" size="small">{{ data.distributeStatus }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('research.breeding.seed.distribution.form.remark')" :span="isMobile ? 1 : 2" v-if="data.remark">
                {{ data.remark }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <!-- 详情列表 -->
        <div class="info-card" v-if="data.detailList && data.detailList.length > 0">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-list-check"></i>
              <span>{{ $t('research.breeding.seed.distribution.form.detailList') }}</span>
            </div>
          </div>
          <div class="card-body">
            <!-- PC端表格 -->
            <div class="pc-only">
              <el-table :data="data.detailList" stripe border>
                <el-table-column type="index" :label="$t('common.index')" width="60" align="center" />
                <el-table-column
                  prop="produceBatchId"
                  :label="$t('research.breeding.seed.distribution.form.produceBatchId')"
                  min-width="150"
                  show-overflow-tooltip />
                <el-table-column
                  prop="varietyName"
                  :label="$t('research.breeding.seed.distribution.detailColumns.varietyName')"
                  min-width="150"
                  show-overflow-tooltip />
                <el-table-column
                  prop="breedBatchName"
                  :label="$t('research.breeding.seed.distribution.detailColumns.breedBatchName')"
                  min-width="150"
                  show-overflow-tooltip />
                <el-table-column
                  prop="parentalSeedSource"
                  :label="$t('research.breeding.seed.distribution.detailColumns.parentalSeedSource')"
                  min-width="150"
                  show-overflow-tooltip />
                <el-table-column
                  prop="distributeQuantity"
                  :label="$t('research.breeding.seed.distribution.detailColumns.distributeQuantity')"
                  width="130"
                  align="right">
                  <template #default="{ row }">
                    <span class="font-bold text-primary">{{ row.distributeQuantity }} kg</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  :label="$t('common.createTime')"
                  width="180"
                  align="center" />
              </el-table>
            </div>

            <!-- 移动端列表 -->
            <div class="mobile-only">
              <div v-for="(item, index) in data.detailList" :key="index" class="mobile-detail-card">
                <div class="card-header-item">
                  <span class="index-badge">{{ index + 1 }}</span>
                  <span class="batch-id">{{ item.produceBatchId }}</span>
                </div>
                <div class="card-body-item">
                  <div class="info-row">
                    <span class="label">{{ $t('research.breeding.seed.distribution.detailColumns.varietyName') }}:</span>
                    <span class="value">{{ item.varietyName }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('research.breeding.seed.distribution.detailColumns.distributeQuantity') }}:</span>
                    <span class="value font-bold text-primary">{{ item.distributeQuantity }} kg</span>
                  </div>
                  <div class="info-row">
                    <span class="label">{{ $t('common.createTime') }}:</span>
                    <span class="value">{{ item.createTime }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 系统信息 -->
        <div class="info-card">
          <div class="card-header">
            <div class="card-title">
              <i class="ri-time-line"></i>
              <span>{{ $t('common.systemInfo') }}</span>
            </div>
          </div>
          <div class="card-body">
            <el-descriptions :column="isMobile ? 1 : 2" border>
              <el-descriptions-item :label="$t('common.createTime')">
                {{ data.createTime || '-' }}
              </el-descriptions-item>
              <el-descriptions-item :label="$t('common.updateTime')">
                {{ data.updateTime || '-' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useResponsive } from '@/hooks/useResponsive'

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const emit = defineEmits(['back'])
const { isMobile } = useResponsive()

const handleBack = () => {
  emit('back')
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/page-common.scss';

.font-bold {
  font-weight: 600;
}

.text-primary {
  color: #009A44;
}

:deep(.el-descriptions__label) {
  width: 150px;
  word-break: break-word;
  white-space: normal;
}

.mobile-detail-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid #e9ecef;

  .card-header-item {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e9ecef;

    .index-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      background: #009A44;
      color: white;
      border-radius: 4px;
      font-size: 12px;
    }

    .batch-id {
      font-weight: 600;
      color: #303133;
    }
  }

  .card-body-item {
    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      font-size: 14px;

      &:last-child {
        margin-bottom: 0;
      }

      .label {
        color: #909399;
      }

      .value {
        color: #606266;
      }
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
